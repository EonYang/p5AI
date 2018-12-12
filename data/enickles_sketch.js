
// words.length > 0
// for (let i = 0; i < words.length; i++)
// displayWord(words[i]);

let allWords = [];
let words = [];
let input;
let button;


function setup() {
  createCanvas(400, 400);
  input = createInput();
  button = createButton('submit');
  button.mouseReleased(addWords);
}


function draw() {
  background(220);

  for (var i = 0; i < words.length; i++) {
    displayWord(allWords[i]);
  }

}


function addWords() {
  let sourceText = input.value();
  words = sourceText.split(" ");
  console.log(words);
}


function displayWord(string) {
 text(string, random(width), random(height)); 
}

let words = [];
let input;
let button;

function setup() {
  createCanvas(400, 400);
  input = createInput();
  button = createButton('submit');
  button.mouseReleased(submitWords);
}


function draw() {
  background(0);

  for (let i = 0; i < words.length; i++) {
    words[i].display();
    words[i].update();
    for (let j = 0; j < words.length; j++) {
      if (i != j && words[i].collides(words[j]));
    }
  }
}


function submitWords() {
  string = input.value();
  words.push(new Word(string));
  
  // let inputText = input.value();
  // let strings = inputText.split(" ");s
  // for (i = 0; i < strings.length; i++) {
  //   let myWord = strings[i]
  //   console.log(myWord);
  // 	words.push(new Word(myWord));
  // }
}


class Word {
  constructor(word) {
    this.x = random(width/2);
    this.y = height;
    this.w = 24; // should be dynamic, based width of characters
    this.h = 24;
    this.hit = false;
    this.freeze = false;
    this.word = word;
  }

  display() {
    fill(255, 0, 0, 50);
    stroke(255);
    textSize(24); 
    text(this.word, this.x, this.y, this.w, this.h);
  }

  update() {
    if (this.freeze == false && this.y > 0) {
      // this.x+= random(-5, 5);
      this.y--;
    } else if (this.freeze == true) {
      this.x = this.x;
      this.y = this.y;
    }
  }

  collides(other) {
    this.hit = collideRectRect(this.x, this.y, this.w, this.h, other.x, other.y, other.w, other.h);
    if (this.hit) {
      this.freeze = true;  
    }
  }
}let words = [];
let input;
let button;


function setup() {
  createCanvas(400, 400);
  input = createInput();
  button = createButton('submit');
  button.mouseReleased(submitWords);
}


function draw() {
  background(0);

  for (let i = 0; i < words.length; i++) {
    words[i].display();
    words[i].update();
    for (let j = 0; j < words.length; j++) {
      if (i != j && words[i].collides(words[j]));
    }
  }
}


function submitWords() {
  string = input.value();
  words.push(new Word(string));
}


class Word {
  constructor(word) {
    this.x = width / 2;
    this.y = height;
    this.w = 24; // should be dynamic, based width of characters
    this.h = 24;
    this.hit = false;
    this.freeze = false;
    this.word = word;
  }

  display() {
    fill(255, 0, 0, 50);
    stroke(255);
    textSize(24); 
    text(this.word, this.x, this.y, this.w, this.h);
  }

  update() {
    if (this.freeze == false && this.y > 0) {
      this.x+= random(-5, 5);
      this.y--;
    } else if (this.freeze == true) {
      this.x = this.x;
      this.y = this.y;
    }
  }

  collides(other) {
    this.hit = collideRectRect(this.x, this.y, this.w, this.h, other.x, other.y, other.w, other.h);
    if (this.hit) {
      this.freeze = true;  
    }
  }
}let words = [];

function setup() {
  createCanvas(400, 400);
}


function draw() {
  background(0);

  for (let i = 0; i < words.length; i++) {
    words[i].display();
    words[i].update();
    for (let j = 0; j < words.length; j++) {
      if (i != j && words[i].collides(words[j])); 
    }
  }
}


function mouseReleased() {
  words.push(new Word());
}


class Word {
  constructor() {
    this.x = width/2;
    this.y = height;
    this.w = 24; // should be dynamic, based width of characters
    this.h = 24;
    this.hit = false;
    this.freeze = false;
  }

  display() {
    fill(255, 0, 0, 50);
    stroke(255);
    textSize(24);
    text('hello', this.x, this.y, this.w, this.h);
  }

  update() {
    if (this.freeze == false && this.y > 0) {
      this.x+= random(-5,5);
      this.y--;
    } else if (this.freeze == true) {
    	this.x = this.x;
     	this.y = this.y; 
    }
  }

  collides(other) {
      this.hit = collideRectRect(this.x, this.y, this.w, this.h, other.x, other.y, other.w, other.h);
      if (this.hit) {
        this.freeze = true;
      }
    }
}var circs = [];
var numCircs = 60;
var cir;
function setup() {
	createCanvas(1000,300);

	for(i=0;i<numCircs;i++){
		c = new circObj(random(30,60), i ) // generate a random sized circObj and store it's ID for later
		circs.push(c); //add it to the array.
	}
}

function draw(){
	background(255);

	for(j=0;j<numCircs;j++){
		circs[j].place(circs); //try to place a circObj on the screen
	}

	for(k=0;k<numCircs;k++){ // display the objects
		circs[k].disp();
	}
}

function circObj(d, id){
	this.x = random(width)
	this.y = random(height)
	this.d = d
	this.id = id;
	this.color = color(random(255),random(255),random(255))
	this.hit = true;

	this.place = function(objArray){

			for(i=0;i<objArray.length;i++){
				if(this.id != i){ //dont do the check if it is looking at itself

					this.hit = collideCircleCircle(this.x, this.y, this.d, objArray[i].x, objArray[i].y, objArray[i].d); //colliding with anything?

					if(this.hit == true){ // if we ever get a true we have to try again, this works since we iterate down through the objects one by one.
						//try again:
						this.x = random(width)
						this.y = random(height)
					}
				}
			}
	}

	this.disp = function(){
		noStroke();
		fill(this.color);
		ellipse(this.x,this.y,this.d,this.d);

	}

}var hit = false;

function setup() {
 createCanvas(800, 800); 
}

function draw() {
  background(255);
  
  text("boo", 200, 200, 50, 50);
	// rect(200,200,100,150);
	rect(mouseX,mouseY,50,50);

	hit = collideRectRect(200,200,50,50,mouseX,mouseY, 50, 50);

	print("colliding? " + hit);
}//Sprite creation
//Click to create a new sprite with random speed

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(255, 255, 255);

  fill(0);
  textAlign(CENTER);
  text('Click to create a new sprite', width/2, height/2);
  //draw all the sprites added to the sketch so far
  //the positions will be updated automatically at every cycle
  drawSprites();
}

function mousePressed() {

  //create a sprite at the mouse position and store it in a temporary variable
  var s = createSprite(mouseX, mouseY, 30, 30);
  //if no image or animation is associated it will be a rectancle of the specified size
  //and a random color

  //now you can use the variable to set properties
  //e.g. a random velocity on the x and y coordinates
  s.velocity.x = random(-5, 5);
  s.velocity.y = random(-5, 5);
}//Collision detection - Bouncing behavior

var circles;
var boxes;

function setup() {
  createCanvas(800, 400);

  circles = new Group();
}


function mouseReleased() {
   var circle = createSprite(width / 2, height);
    circle.setCollider('circle', -2, 2, 55);
    circle.setSpeed(random(2, 3), random(0, 360));

    //scale affects the size of the collider
    circle.scale = (0.5, 0.5);
    
    //mass determines the force exchange in case of bounce
    circle.mass = circle.scale;
    circle.restitution = 0.3;
    circles.add(circle);
}


function draw() {
  background(255, 255, 255);

  circles.bounce(circles);


  //all sprites bounce at the screen edges
  for(var i=0; i<allSprites.length; i++) {
    var s = allSprites[i];
    if(s.position.x<0) {
      s.position.x = 1;
      s.velocity.x = abs(s.velocity.x);
    }

    if(s.position.x>width) {
      s.position.x = width-1;
      s.velocity.x = -abs(s.velocity.x);
    }

    if(s.position.y<0) {
      s.position.y = 1;
      s.velocity.y = abs(s.velocity.y);
    }

    if(s.position.y>height) {
      s.position.y = height-1;
      s.velocity.y = -abs(s.velocity.y);
    }
  }

  drawSprites();

}
let words = [];

function setup() {
  createCanvas(400, 400);
}


function draw() {
  background(0);

  for (let i = 0; i < words.length; i++) {
    words[i].move()
    words[i].show();
  }
}


function mouseReleased() {
  words.push(new Word(mouseX, mouseY));
}


class Word {
  constructor() {
    this.x = width / 2;
    this.y = height;
  }

  show() {
    fill(255, 0, 0, 50);
    stroke(255);
    // rect(this.x, this.y, 40, 40);
    textSize(24);
    text('hello', this.x, this.y, 24, 24);
  }

  move() {
    if (this.y > 0 ) {
    	this.x += random(-5, 5);
    	this.y--;
    } else {
     this.y = 0;
    }
  }
}// var string = "ha";
var flock;
var input;
var button;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  createCanvas(720, 400);
  flock = new Flock();
  input = createInput();
  button = createButton('submit');
  button.mouseReleased(addWords);

}


function draw() {
  background(250);
  flock.run();
}


function addWords() {
  let source = input.value();
  var b = new Boid(width / 2, height / 2, source);
  flock.addBoid(b);
  console.log(source);
}


// Add a new boid into the System
// function mouseDragged() {
//   flock.addBoid(new Boid(mouseX, mouseY));
// }


// Flock object manages the array of all the boids
function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.run = function() {
  for (var i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids); // Passing the entire list of boids to each boid individually
  }
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}


// Boid class
// Methods for Separation, Cohesion, Alignment added
function Boid(x, y, string) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 3; // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
  this.string = string;
}

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
  var sep = this.separate(boids); // Separation
  var ali = this.align(boids); // Alignment
  var coh = this.cohesion(boids); // Cohesion
  // Arbitrarily weight these forces
  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce); // Limit to maximum steering force
  return steer;
}

Boid.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  var theta = this.velocity.heading() + radians(90);
  fill(127);
  // stroke(200);
  push();
  translate(this.position.x, this.position.y);
  rotate(theta);
  textSize(20);
  text(this.string, this.r, this.r * 2);
  pop();
}

// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -this.r) this.position.x = width + this.r;
  if (this.position.y < -this.r) this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  var desiredseparation = 25.0;
  var steer = createVector(0, 0);
  var count = 0;
  // For every boid in the system, check if it's too close
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position, boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      var diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d); // Weight by distance
      steer.add(diff);
      count++; // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0, 0);
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position, boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    var steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0, 0); // Start with empty vector to accumulate all locations
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position, boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum); // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}var mic;
var grow = 200;

function setup() {
  createCanvas(710, 200);

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

function draw() {
  background(200);

  // Get the overall volume (between 0 and 1.0)
  var vol = mic.getLevel();
  fill(127);
  stroke(0);

  // Draw an ellipse with height based on volume
  // var h = map(vol, 0, 1, height, 0);
  ellipse(width/2, h - 25, 50, 50);
  
  // console.log(vol);
  // console.log(h);
  
  var h = map(vol, 0, 1, 0, 10); // testing for another sketch
  grow = grow - h;
  console.log(grow);
}// modified from Oren's sketch: 
// https://editor.p5js.org/oshoham/sketches/SJ162ddAm
// Converting TTF font paths to points on polygons with Rune.js


const s = 'Comptypo';
const polygonSamplingResolution = 1;
const fontSize = 96;

let fontData;
let font;
let path;
let polygons;
let pathWidth;
let pathHeight;
let poly;


let amount = 100;  // can also be reversed!
let timeCheck = 0;
let interval = 100;


function preload() {
  fontData = loadBytes('Roboto-Black.ttf');
}


function setup() {
  createCanvas(640, 360);
  font = opentype.parse(fontData.bytes.buffer);
  path = font.getPath(s, 0, 0, fontSize);

  const boundingBox = path.getBoundingBox();
  pathWidth = boundingBox.x2 - boundingBox.x1;
  pathHeight = boundingBox.y2 - boundingBox.y1;

  polygons = pathToPolygons(path, polygonSamplingResolution);
  
	timeCheck = millis();
}


function draw() {
  background(250);
  
  push();
  noFill();
  stroke(5);
  strokeWeight(1);
  translate(width / 2 - pathWidth / 2, height / 2 + pathHeight / 2);

  for (let i = 0; i < polygons.length; i++) {
    poly = polygons[i];
    beginShape();
    
    for (let j = 0; j < poly.length; j+= amount) {
      let p = poly[j];
      let x = p[0];
      let y = p[1];
      vertex(x, y);
    }
    endShape();
  }
  pop();
  
  if ((millis() - timeCheck) > interval) {
  	if (amount > 1) {
      amount--;
    	timeCheck = millis();
    } else {
      noLoop();
    }
    console.log(amount);
  }
  
  
}


function pathToPolygons(path, thisSpacing = 1) {
  // https://github.com/runemadsen/rune.font.js/blob/master/src/font.js
  const runePath = new Rune.Path(0, 0);

  for (let i = 0; i < path.commands.length; i++) {
    const cmd = path.commands[i];
    if (cmd.type == 'M') {
      runePath.moveTo(cmd.x, cmd.y);
    } else if (cmd.type == 'L') {
      runePath.lineTo(cmd.x, cmd.y);
    } else if (cmd.type == 'Q' && typeof cmd.x2 === 'undefined') {
      runePath.curveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
    } else if (cmd.type == 'Q') {
      runePath.curveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
    } else if (cmd.type == 'Z') {
      runePath.closePath();
    }
  }

  const polys = runePath.toPolygons({
    spacing: thisSpacing
  });

  return polys.map(function(poly) {
    return poly.state.vectors.map(function(vector) {
      return [vector.x, vector.y];
    });
  });

}let string = "surly";
let size = 50



function setup() {
  createCanvas(400, 400);
}

function draw() {
  // background(220);
  noStroke();
  fill(255, 100, 0, 30);
  textSize(size);
  text(string, mouseX, mouseY, size, size);
  // ellipse(mouseX, mouseY, 30, 30);
  
  
}var value = 0;

function draw() {
  fill(value);
  rect(25, 25, 50, 50);
}

function deviceShaken() {
  value = value + 5;
  if (value > 255) {
    value = 0;
  }
}var value = 0;

function draw() {
  fill(value);
  rect(25, 25, 50, 50);
}

function deviceTurned() {
  if (turnAxis === 'X') {
    if (value === 0) {
      value = 255;
    } else if (value === 255) {
      value = 0;
    }
  }
}var value = 0;

function draw() {
  fill(value);
  rect(25, 25, 50, 50);
}

function deviceMoved() {
  value = value + 5;
  if (value > 255) {
    value = 0;
  }
}// Run this example on a mobile device
// You will need to shake the device more firmly
// the closer the box's fill gets to white in order to change the value.

var value = 0;
var threshold = 30;

function setup() {
  setShakeThreshold(threshold);
}

function draw() {
  fill(value);
  rect(25, 25, 50, 50);
}

function deviceMoved() {
  value = value + 5;
  threshold = threshold + 5;
  if (value > 255) {
    value = 0;
    threshold = 30;
  }
  setShakeThreshold(threshold);
}var value = 0;
var threshold = 0.5;

function setup() {
  setMoveThreshold(threshold);
}

function draw() {
  fill(value);
  rect(25, 25, 50, 50);
}

function deviceMoved() {
  value = value + 5;
  threshold = threshold + 0.1;
  if (value > 255) {
    value = 0;
    threshold = 30;
  }
  setMoveThreshold(threshold);
}// modified from Oren's sketch: 
// https://editor.p5js.org/oshoham/sketches/SJ162ddAm
// Converting TTF font paths to points on polygons with Rune.js


const s = 'Comptypo';
const polygonSamplingResolution = 1;
const fontSize = 96;

let fontData;
let font;
let path;
let polygons;
let pathWidth;
let pathHeight;
let poly;


let decay = 1;  // can also be reversed!
let timeCheck = 0;
let interval = 3000;


function preload() {
  fontData = loadBytes('Roboto-Black.ttf');
}


function setup() {
  createCanvas(640, 360);
  font = opentype.parse(fontData.bytes.buffer);
  path = font.getPath(s, 0, 0, fontSize);

  const boundingBox = path.getBoundingBox();
  pathWidth = boundingBox.x2 - boundingBox.x1;
  pathHeight = boundingBox.y2 - boundingBox.y1;

  polygons = pathToPolygons(path, polygonSamplingResolution);
  
	timeCheck = millis();
}


function draw() {
  background(250);
  
  push();
  noFill();
  stroke(5);
  strokeWeight(1);
  translate(width / 2 - pathWidth / 2, height / 2 + pathHeight / 2);

  for (let i = 0; i < polygons.length; i++) {
    poly = polygons[i];
    beginShape();
    
    for (let j = 0; j < poly.length; j+= decay) {
      let p = poly[j];
      let x = p[0];
      let y = p[1];
      vertex(x, y);
    }
    endShape();
  }
  pop();
  
  if ((millis() - timeCheck) > interval) {
  	decay++;
    timeCheck = millis();
  }
  
  
}


function pathToPolygons(path, thisSpacing = 1) {
  // https://github.com/runemadsen/rune.font.js/blob/master/src/font.js
  const runePath = new Rune.Path(0, 0);

  for (let i = 0; i < path.commands.length; i++) {
    const cmd = path.commands[i];
    if (cmd.type == 'M') {
      runePath.moveTo(cmd.x, cmd.y);
    } else if (cmd.type == 'L') {
      runePath.lineTo(cmd.x, cmd.y);
    } else if (cmd.type == 'Q' && typeof cmd.x2 === 'undefined') {
      runePath.curveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
    } else if (cmd.type == 'Q') {
      runePath.curveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
    } else if (cmd.type == 'Z') {
      runePath.closePath();
    }
  }

  const polys = runePath.toPolygons({
    spacing: thisSpacing
  });

  return polys.map(function(poly) {
    return poly.state.vectors.map(function(vector) {
      return [vector.x, vector.y];
    });
  });

}// The Flocking Sketch from The Nature of Code
// from Daniel Shiffman, http://natureofcode.com
// https://p5js.org/examples/simulate-flocking.html

// Drag the mouse to generate new ha has


var string = "ha";
var flock;


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  createCanvas(720, 400);
  
  flock = new Flock();
  // Add an initial set of boids into the system
  for (var i = 0; i < 100; i++) {
    var b = new Boid(width/2,height/2);
    flock.addBoid(b);
  }
}

function draw() {
  background(250);
  flock.run();
}

// Add a new boid into the System
function mouseDragged() {
  flock.addBoid(new Boid(mouseX,mouseY));
}



// Flock object manages the array of all the boids
function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.run = function() {
  for (var i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
  }
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}


// Boid class
// Methods for Separation, Cohesion, Alignment added
function Boid(x,y) {
  this.acceleration = createVector(0,0);
  this.velocity = createVector(random(-1,1),random(-1,1));
  this.position = createVector(x,y);
  this.r = 3.0;
  this.maxspeed = 3;    // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
}

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
  var sep = this.separate(boids);   // Separation
  var ali = this.align(boids);      // Alignment
  var coh = this.cohesion(boids);   // Cohesion
  // Arbitrarily weight these forces
  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

Boid.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  var theta = this.velocity.heading() + radians(90);
  fill(127);
  stroke(200);
  push();
  translate(this.position.x,this.position.y);
  rotate(theta);
  textSize(20);
  text(string, this.r, this.r*2);
  pop();
}

// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -this.r)  this.position.x = width +this.r;
  if (this.position.y < -this.r)  this.position.y = height+this.r;
  if (this.position.x > width +this.r) this.position.x = -this.r;
  if (this.position.y > height+this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  var desiredseparation = 25.0;
  var steer = createVector(0,0);
  var count = 0;
  // For every boid in the system, check if it's too close
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position,boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      var diff = p5.Vector.sub(this.position,boids[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0,0);
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    var steer = p5.Vector.sub(sum,this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0,0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0,0);   // Start with empty vector to accumulate all locations
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Steer towards the location
  } else {
    return createVector(0,0);
  }
}


// let sourceText = "pop pop pop pop pop pop pop pop pop"; 

// above is too predictable, better to work for it
// these are shaped more like corn kernels anyway
// let sourceText = "P P P P P P P P O O O O O O O O O";
let sourceText = "p p p p p p p p p p p p o o o o o o o o o o o o";


let words = sourceText.split(" ");


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(250);

  textSize(72);
  textAlign(CENTER, CENTER);

  for (var i = 0; i < words.length; i++) {
    let rW = random(width);
    let rH = random(height);
    fill(random(200));
    text(words[i], rW, rH);
  }
}// https://p5js.org/examples/input-easing.html

let string = "buzz";
let string1 = "bizz";

let x = 1;
let y = 1;
let easing = 0.05;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  let rW = random(width);
  let rH = random(height);
  
  let targetX = mouseX;
  let dx = targetX - x;
  x += dx * easing;
  
  let targetY = mouseY;
  let dy = targetY - y;
  y += dy * easing;
  
	
 text(string, x, y, rW, rH);
 text(string1, y, y, rW, rH);
  
}// https://github.com/mourner/rbush
// Converting TTF font paths to points on polygons with Rune.js

const s = 'Comptypo';
const polygonSamplingResolution = 1;
const fontSize = 150;

let fontData;
let font;
let path;
let polygons;
let pathWidth;
let pathHeight;
let poly;


function preload() {
  fontData = loadBytes('Roboto-Black.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  font = opentype.parse(fontData.bytes.buffer);
  path = font.getPath(s, 0, 0, fontSize);

  const boundingBox = path.getBoundingBox();
  pathWidth = boundingBox.x2 - boundingBox.x1;
  pathHeight = boundingBox.y2 - boundingBox.y1;

  polygons = pathToPolygons(path, polygonSamplingResolution);
}


function draw() {
  background(255);

  push();
  noFill();
  stroke(0);
  // strokeWeight(2);
  translate(width / 2 - pathWidth / 2, height / 4 + pathHeight / 2);

  for (let i = 0; i < polygons.length; i++) {
    poly = polygons[i];
    beginShape();
    
    for (let j = 0; j < poly.length; j+= 10) {
    // for (let j = 0; j < poly.length; j++) {
      let p = poly[j];
      let x = p[0];
      let y = p[1];
      vertex(x, y);
      
      
      // crazy fuzzy
      // let r0 = random(-10, 10);
      // let r1 = random(-10, 10);
      // vertex(x + r0, y + r1);
      

      // drawing ellipses
      // if (j % 40 == 0) {
      //   vertex(x, y);
      // } else {
      //   vertex(x, y);
      // }

      // if (j % 40 == 0) {
      //   noFill();
      //   ellipse(x, y, 4, 4);
      // }
    }
    endShape();
  }
  pop();
}


function pathToPolygons(path, thisSpacing = 1) {
  // https://github.com/runemadsen/rune.font.js/blob/master/src/font.js
  const runePath = new Rune.Path(0, 0);

  for (let i = 0; i < path.commands.length; i++) {
    const cmd = path.commands[i];
    if (cmd.type == 'M') {
      runePath.moveTo(cmd.x, cmd.y);
    } else if (cmd.type == 'L') {
      runePath.lineTo(cmd.x, cmd.y);
    } else if (cmd.type == 'Q' && typeof cmd.x2 === 'undefined') {
      runePath.curveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
    } else if (cmd.type == 'Q') {
      runePath.curveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
    } else if (cmd.type == 'Z') {
      runePath.closePath();
    }
  }

  const polys = runePath.toPolygons({
    spacing: thisSpacing
  });

  return polys.map(function(poly) {
    return poly.state.vectors.map(function(vector) {
      return [vector.x, vector.y];
    });
  });

}



//   var polys = path.toPolygons({ spacing:25 });

//   // loop through the points and change them a little bit
//   for(var i = 0; i < polys.length; i++) {

//     var poly = polys[i];
//     poly.move(0, 200, true);

//     for(var j = 0; j < poly.state.vectors.length; j++) {
//       var vec = poly.state.vectors[j];
//       vec.x += Rune.random(-3, 3);
//       vec.y += Rune.random(-3, 3);
//       r.circle(poly.state.x + vec.x, poly.state.y + vec.y, 3, 3);
//     }

//   }var r = new Rune ({
  container: "body",
  width: 500,
  height: 400
});

r.rect(0, 0, 200, 200)
  .fill(0, 0, 255);

r.draw();







// // quick example showing how to load a font, with opentypejs, create a path
// // from the font, then draw it to the canvas (both with the draw() method in
// // opentype and by interpreting the path commands "by hand" with p5js drawing
// // commands.)

// let font;
// let fontData;

// function drawPathOutline(cmds) {
//   // current pen position
//   let cx = 0;
//   let cy = 0;
//   // start position of current contour
//   let startX = 0;
//   let startY = 0;
//   for (let cmd of cmds) {
//     switch (cmd.type) {
//       case 'M':
//         startX = cmd.x;
//         startY = cmd.y;
//         cx = cmd.x;
//         cy = cmd.y;
//         break;
//       case 'L':
//         line(cx, cy, cmd.x, cmd.y);
//         cx = cmd.x;
//         cy = cmd.y;
//         break;
//       case 'C':
//         bezier(cx, cy, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
//         cx = cmd.x;
//         cy = cmd.y;
//         break;
//       case 'Q':
//         beginShape();
//         vertex(cx, cy);
//         quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
//         endShape();
//         cx = cmd.x;
//         cy = cmd.y;
//         break;
//       case 'Z':
//         // to complete path
//         line(cx, cy, startX, startY);
//         break;
// 		}
//   }
// }

// function preload() {
//   fontData = loadBytes('Roboto-Black.ttf');
// }

// let path;

// function setup() {
// 	createCanvas(400, 400);
//   font = opentype.parse(fontData.bytes.buffer);
//   path = font.getPath("Comptypo", 0, 0, 72);
// }

// function draw() {
  
//   background(255);
  
//   push();
//   translate(50, 125);
//   path.draw(drawingContext); // opentype.js
//   pop();
  
//   push();
// 	noFill();
//   stroke(0);
//   strokeWeight(2);
//   translate(50, 225);
//   drawPathOutline(path.commands); // p5js
//   pop();
  
// }// Converting TTF font paths to points on polygons with Rune.js
// and using that data to interpolate between two fonts using flubber.js.

const s = 'Comptypo';
const polygonSamplingResolution = 1;
const fontSize = 100;
const animationSpeed = 0.035;

let fontData;
let fontData2;
let font;
let font2;
let path;
let path2;
let polygons;
let polygons2;

let interpolators;

let pathWidth;
let pathHeight;

let ease;

function preload() {
  fontData = loadBytes('Orbitron-Light.ttf');
  fontData2 = loadBytes('Roboto-Black.ttf');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
  
  ease = new p5.Ease();
  
  font = opentype.parse(fontData.bytes.buffer);
  font2 = opentype.parse(fontData2.bytes.buffer);
  path = font.getPath(s, 0, 0, fontSize);
  path2 = font2.getPath(s, 0, 0, fontSize);
  
  const boundingBox = path.getBoundingBox();
  pathWidth = boundingBox.x2 - boundingBox.x1;
  pathHeight = boundingBox.y2 - boundingBox.y1;
  
  polygons = pathToPolygons(path, polygonSamplingResolution);
  polygons2 = pathToPolygons(path2, polygonSamplingResolution);
  
  if (polygons.length === polygons2.length) {
  	interpolators = flubber.interpolateAll(polygons, polygons2, { string: false });
  } else if (polygons.length < polygons2.length) {
    interpolators = flubber.interpolateAll(polygons.slice(0, polygons.length - 1), polygons2.slice(0, polygons.length - 1), { string: false });
		interpolators = interpolators.concat(flubber.separate(polygons[polygons.length - 1], polygons2.slice(polygons.length, polygons2.length), { string: false }));
  } else {
    interpolators = flubber.interpolateAll(polygons.slice(0, polygons2.length - 1), polygons2.slice(0, polygons2.length - 1), { string: false });
		interpolators = interpolators.concat(flubber.combine(polygons.slice(polygons2.length, polygons.length), polygons2[polygons2.length - 1], { string: false }));
  }
}

function draw() {
  background(255);

  push();
	noFill();
  stroke(0);
  strokeWeight(2);
  translate(width / 2 - pathWidth / 2, height / 2 + pathHeight / 2);
  
  const t = map(sin(frameCount * animationSpeed), -1, 1, 0, 1);
  const interpolation = ease.quarticInOut(t);
  
  const currentPolygons = interpolators.map(interpolator => interpolator(interpolation));
  
  for (let i = 0; i < currentPolygons.length; i++) {
    let poly = currentPolygons[i];
    beginShape();
    for (let j = 0; j < poly.length; j++) {
      let p = poly[j];
      let x = p[0];
      let y = p[1];
      vertex(x, y);
    }
    endShape();
  }

  pop();
}

function pathToPolygons(path, spacing = 1) {
  // https://github.com/runemadsen/rune.font.js/blob/master/src/font.js
  const runePath = new Rune.Path(0, 0);

  for(let i = 0; i < path.commands.length; i++) {
    const cmd = path.commands[i];
    if(cmd.type == 'M') {
      runePath.moveTo(cmd.x, cmd.y);
    } else if(cmd.type == 'L') {
      runePath.lineTo(cmd.x, cmd.y);
    } else if(cmd.type == 'Q' && typeof cmd.x2 === 'undefined') {
      runePath.curveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
    } else if(cmd.type == 'Q') {
      runePath.curveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
    } else if(cmd.type == 'Z') {
      runePath.closePath();
    }
  }
  
  const polys = runePath.toPolygons({ spacing: spacing });
	return polys.map(function(poly) {
    return poly.state.vectors.map(function (vector) {
    	return [vector.x, vector.y];
    });
  });
}function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  stroke(255);
  noFill();

  let x = width * 0.1;
  let y = height * 0.1;

  for (let o1 = x * 2; o1 < width - x; o1 += x) {
    for (let o2 = y * 2; o2 < height - y; o2 += y) {
      let newX = map(sin(frameCount * 0.05), -1, 1, 0, x * 2);
      let newY = map(sin(frameCount * 0.02), -1, 1, 0, y * 2);
      push();
      translate(o1, o2);
      strokeWeight(newX/20);
      beginShape();
      vertex(-x + newX, newY)
      bezierVertex(-newX, newY, x, newY, newX, 0);
      endShape();
      pop();
    }
  }

  for (let o1 = x * 2; o1 < width - x; o1 += x) {
    for (let o2 = y * 2; o2 < height - y; o2 += y) {
      let newX = map(sin(frameCount * 0.02), -1, 1, 0, x * 2);
      let newY = map(sin(frameCount * 0.05), -1, 1, 0, y * 2);
      push();
      translate(o1, o2);
      beginShape();
      vertex(-newX, newY)
      bezierVertex(-x, -newY, x, -newY, x, 0);
      endShape();
      pop();
    }
  }

}

// strokeWeight(2 + (frameCount % 16));

// let newY = map(sin(frameCount * 0.1), -1, 1, 0, y * 2);

// arc(newX, y, 50, 25, PI / 2, 3 * PI / 2, OPEN);function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  stroke(255, 0, 0);
  noFill();
  
  let x = width * 0.1;
  let y = height * 0.1;
  
  for (let o1 = x * 2; o1 < width - x; o1 += x) {
    for (let o2 = y * 2; o2 < height - y; o2 += y) {
   		push();
      translate(o1, o2);
      let newX = map(sin(frameCount * 0.1), -1, 1, 0, x * 2);      
      beginShape();
    	vertex(-newX, 0)
    	bezierVertex(-newX, -y, newX, y, newX, 0);
  		endShape();
      pop();
    }
  }
}

  // strokeWeight(2 + (frameCount % 16));

     // let newY = map(sin(frameCount * 0.1), -1, 1, 0, y * 2);
      
      // arc(newX, y, 50, 25, PI / 2, 3 * PI / 2, OPEN);// inspired by: https://creative-coding.decontextualize.com/changes-over-time/
// also from: https://p5js.org/learn/curves.html

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  stroke(255);
  noFill();
  strokeWeight(2 + (frameCount % 16));
  
  let x = width * 0.1;
  let y = height * 0.1;
  
  for (let o1 = 0; o1 < width - x; o1 += x) {
    for (let o2 = 0; o2 < height - y; o2 += y) {
   		push();
      translate(o1, o2);
      let newX = map(sin(frameCount * 0.1), -1, 1, 0, x * 2);
      arc(newX, y, 50, 25, PI / 2, 3 * PI / 2, OPEN);
      pop();
      
    }
  }

}// make sure you can pull out the value of the result - can you find it?
// two setups and two canvases
// you need a canvas for the animation
// but you need to hide the video dom element and redraw it thru image constructor


let featureExtractor;
let classifier;
let video;
let loss;
let smileImages = 0;
let cryImages = 0;
let myResult;

var acceleration = 0.0098;
var nDrops = 1000;
var drops = [];

function setup() {
  // noCanvas();
  
  createCanvas(640, 480);
  // canvas.position(0, 0);
  // canvas.style('z-index', "-1");
  
  // Create a video element
  video = createCapture(VIDEO);
  // Append it to the videoContainer DOM element
  video.parent('videoContainer');
  video.hide();
  // Extract the already learned features from MobileNet
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  // Create a new classifier using those features and give the video we want to use
  classifier = featureExtractor.classification(video, videoReady);
  // Create the UI buttons
  setupButtons();
  
  for (i = 0; i < nDrops; i++) {
     drops.push(new Drop());
   }
}


function draw() {
  image(video, 0, 0)
  
  if (myResult == 'cry'){
  // console.log('do something'); 
  drawRain();
 } else if (myResult == 'smile'){
   clear(); 
   console.log('or do something else');
 }
}


// A function to be called when the model has been loaded
function modelReady() {
  select('#modelStatus').html('Base Model (MobileNet) loaded!');
}

// A function to be called when the video has loaded
function videoReady () {
  select('#videoStatus').html('Video ready!');
}


// Classify the current frame.
function classify() {
  classifier.classify(gotResults);
}

// A util function to create UI buttons
function setupButtons() {
  // When the Cat button is pressed, add the current frame
  // from the video with a label of "cat" to the classifier
  buttonA = select('#cryButton');
  buttonA.mousePressed(function() {
    classifier.addImage('cry');
    select('#amountOfCryImages').html(cryImages++);
  });

  // When the Dog button is pressed, add the current frame
  // from the video with a label of "dog" to the classifier
  buttonB = select('#smileButton');
  buttonB.mousePressed(function() {
    classifier.addImage('smile');
    select('#amountOfSmileImages').html(smileImages++);
  });

    // Train Button
  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Done Training! Final Loss: ' + loss);
      }
    });
  });

  // Predict Button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);
}

// Show the results
function gotResults(err, result) {
  if (err) {
    console.error(err);
  }
  select('#result').html(result);
  classify();
  myResult = result;
}

function drawRain() {
   clear();
   drops.forEach(function(d) {
    d.drawAndDrop();
  });
}


function Drop() {
  this.initX = function() {
    this.x = random() * width;
  };
  this.initY = function() {
    this.y = -random() * height / 3; // Initialise rain somewhat off the screen
  };

  this.initX();
  this.y = random() * height;

  this.length = random() * 10;
  this.speed = random();

  this.drawAndDrop = function() {
    this.draw();
    this.drop();
  };

  this.draw = function() {
    stroke(0,191,255);
    line(this.x, this.y, this.x, this.y + this.length);
  };

  this.drop = function() {
    if (this.y < height) {
      this.y += this.speed;
      this.speed += acceleration;
    } else {
      this.speed = random();
      this.initY();
      this.initX();
    }
  };
}
function setup() {
  createCanvas(800, 800);
}


function draw() {
  background(220);

  let x = width * 0.05;
  let y = height * 0.04;
  let x1 = x * 2;
  let x2 = x * 3;
  let y1 = y * 3;
  let speed = frameCount * 5 % height;
  let speed1 = frameCount * 7 % height;
  

  for (let o1 = x; o1 <= width - x2; o1 += x2 * 1.5) {
    for (let o2 = y; o2 <= height - y1; o2 += x2 * 1.5) {
      push();
      translate(o1, o2);
      triangle(x, y + speed, x1, y1 + speed, x2, y + speed);
      pop();
    }
  }

  for (let o1 = x; o1 <= width - x2; o1 += x2 * 1.5) {
    for (let o2 = y; o2 <= height - y1; o2 += x2 * 1.5) {
      push();
      translate(o1, o2);
      triangle(x, y - speed1, x1, y1 - speed1, x2, y - speed1);
      pop();
    }
  }
}let triangles = [];

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < 20; i++) {
    triangles[i] = new Triangle();
  }
}


function draw() {
  background(220);
  for (let i = 0; i < triangles.length; i++) {
    triangles[i].show();
    triangles[i].animate();
  }
}


class Triangle {
  constructor() {
    this.x = width * 0.05;
    this.y = height * 0.04;
    this.x1 = this.x * 2;
    this.x2 = this.x * 3;
    this.y1 = this.y * 3;
    this.o1 = random(0, width - this.x2);
    this.o2 = random(0, height - this.y1);
    this.speed = frameCount % height;
  }

  show() {
    push();
    translate(this.o1, this.o2);
    // triangle(this.x, this.y + speed, this.x * 2, this.y * 3 + speed, this.x * 3, this.y + speed);
    triangle(this.x, this.y, this.x1, this.y1, this.x2, this.y);
    pop();
  }
  
  animate() {
    this.y = this.y + this.speed;
    this.y1 = this.y1 + this.speed;
  } 
}function setup() {
  createCanvas(500, 500);
}


function draw() {
  background(220);

  let minSize = width * 0.0625;
  let maxSize = width * 0.125;

  for (let o1 = 0; o1 <= width - minSize; o1 += minSize) {
    for (let o2 = 0; o2 <= height - minSize; o2 += minSize) {
      push();
      translate(o1, o2);
      let speed = 0.04;
      let size = map(sin(frameCount * speed), -1.0, 1.0, minSize, maxSize);
      ellipse(o1, o2, size);
      pop();
    }
  }
}function setup() {
  createCanvas(400, 400);
}


function draw() {
  background(220);

  let size = width * 0.0625;

  for (let o1 = size; o1 <= width - size; o1 += size * 2) {
    for (let o2 = size; o2 <= height - size; o2 += size * 2) {
      push();
      rectMode(CENTER);
      translate(o1, o2);
      rotate(frameCount * 0.03);
      rect(0, 0, size, size);
      pop();
    }
  }

}var gif;

function setup() {
  cnv = createCanvas(400,400)
  
  // you can also do this in preload
  gif = createImg('assets/cat.gif')

  // change position
  gif.position(50,50);
  
  //gif width & height
  gif_width = gif.width;
  gif_height = gif.height;
  print("gif width: " + gif_width) ;
  print("gif height: " + gif_height);
  
  // change size
  gif.size(gif_width/2, gif_height/2);
  
  // change canvas location
  cnv.position(20, 20);

}

function draw(){
  background(200);
}

let input;
let button;
var capture;
let apikey = 'KxcW0Jg0MMlRG5HNa16oWJFRuzShgvNS';
let url = 'https://api.giphy.com/v1/stickers/search?&api_key=KxcW0Jg0MMlRG5HNa16oWJFRuzShgvNS&limit=10&q=';
let term1;
var firstgif;
// let newurl;


function setup() {
  createCanvas(700, 600);
  //video feed
  capture = createCapture(VIDEO);
  capture.hide();
  
  //user input
  input = createInput();
  button = createButton('submit');
  button.mousePressed(makeRequest);
}

function draw() {
  background(250);
  textSize(18);
  fill(12, 90, 214);
	text ("Welcome to the Sticker Generator!", 0,570);
  text ("What is your favorite thing?", 0,590);
  push(0);
  translate(width,0);
  scale(-1,1);
  image(capture, 0,0, 700,500);
  pop();
}

function makeRequest(){
  term1 = input.value();
  //console.log(url + term1);
  let newurl = url + term1;
 // console.log(newurl);
  loadJSON(newurl, gotGiphy);
}

function gotGiphy(giphy) {
	let number= int(random(0,10));
 let createGif = giphy.data[number].images.original.url;
	firstgif = createImg(createGif);
  firstgif.position(50,50);
  createGif_width =  firstgif.width;
  createGif_height= firstgif.height;
  firstgif.size(createGif_width/2,createGif_height/2);
  
}// only works with opentype fonts

let font;
let fontData;

function preload() {
  fontData = loadBytes('LeagueGothic-Regular.otf');
}

function modifyPath(p) {
  let newCommands = [];
  for (let cmd of p.commands) {    
    let newC = Object.assign({}, cmd);
    if (newC.hasOwnProperty('x')) {
      newC.x += int(random(-50, 50));
      newC.y += int(random(-50, 50));
    }
    //console.log(cmd, newC);
    newCommands.push(newC);
  }
  let newPath = new opentype.Path();
  newPath.extend(newCommands);
  return newPath;
} 

let path;

function setup() {
	createCanvas(400, 400);
  font = opentype.parse(fontData.bytes.buffer);
  font.draw(drawingContext, "abcdefgABCDEFG", 0, 100, 48);
  
  console.log("modifying glyphs");
  for (let i = 0; i < font.glyphs.length; i++) {
  //for (let i = 0; i < 100; i++) {
    let glyph = font.glyphs.glyphs[i];
    glyph.path = modifyPath(glyph.path);
    // this is needed by getPath but is usually set when loading from a file...
    glyph.path.unitsPerEm = font.unitsPerEm;
    //console.log("glyph.path", glyph.path, glyph.path.commands, glyph.path.unitsPerEm);
    //console.log("getpath", glyph.getPath(0, 0, 72, {hinting: false}, font));
  }
  console.log("done");
  // set this to what you want the name of the font to be...
  font.names.fontFamily.en = 'Messed up font nice';
  font.draw(drawingContext, "abcdefgABCDEFG", 0, 200, 48);
  font.download();
  
  noLoop();
}

// based on an example by Allison Parrish
// here: http://comptypo.decontextualize.com/fonts-as-data/
// showing how to load a font, with opentypejs, create a path
// from the font, then draw it to the canvas (both with the draw() method in
// opentype and by interpreting the path commands "by hand" with p5js drawing
// commands.)

let font;
let fontData;

let userInput;
let submitButton;
let string = 'write something';


function drawPathOutline(cmds) {
  let cx = 0;
  let cy = 0;
  let startX = 0;
  let startY = 0;
  for (let cmd of cmds) {
    switch (cmd.type) {
      case 'M':
        startX = cmd.x;
        startY = cmd.y;
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'L':
        line(cx, cy, cmd.x, cmd.y);
        // cx = cmd.x;
        // cy = cmd.y;
        break;
      case 'Q':
        beginShape();
        vertex(cx, cy);
        quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
        endShape();
        // cx = cmd.x;
        // cy = cmd.y;
        break;
      case 'Z':
        line(cx, cy, startX, startY);
        break;
		}
  }
}


let path;

function preload() {
  fontData = loadBytes('Roboto-Black.ttf');
}


function setup() {
	createCanvas(675, 600);
  userInput = createInput();
  submitButton = createButton('submit new text');
  submitButton.mouseReleased(fontify);
  font = opentype.parse(fontData.bytes.buffer);
  
}


function fontify() {
  string = userInput.value();
}


function draw() {
  background(255);
  path = font.getPath(string, 0, 0, 80);
  
  push();
  translate(50, 125);
  path.draw(drawingContext); // opentype.js
  pop();
  
  push();
	noFill();
  stroke(0);
  strokeWeight(2);
  translate(50, 225);
  drawPathOutline(path.commands); // p5js
  pop();
}function setup() {
  createCanvas(400, 400);
}



function draw() {
  background(250);

  noFill();
  bezier(85, 20, 10, 10, 90, 90, 15, 80);
  stroke(255, 102, 0);
  
  var steps = 16;
  
  for (var i = 0; i <= steps; i++) {
    var t = i / steps;
    var x = bezierPoint(85, 10, 90, 15, t);
    var y = bezierPoint(20, 10, 90, 80, t);
    var tx = bezierTangent(85, 10, 90, 15, t);
    var ty = bezierTangent(20, 10, 90, 80, t);
    var a = atan2(ty, tx);
    a -= HALF_PI;
    line(x, y, cos(a) * 8 + x, sin(a) * 8 + y);
  }

}// drawing ttf fonts with opentype.js and p5js commands.
// note that this ONLY works with ttf fonts, which provide
// the shapes of counters (i.e., the hole in 'O') in
// counter-clockwise order. I use this in the code below
// with the beginContour()/endContour() functions in p5js
// to draw the shapes accordingly.

let font;
let fontData;

// groups a list of opentype.js vector commands by contour
function groupByContour(cmds) {
  contours = [];
  current = [];
  for (let cmd of cmds) {
    current.push(cmd);
    if (cmd.type == 'Z') {
      contours.push(current);
      current = [];
    }
  }
  return contours;
}

// determines if a list of commands specify a path in clockwise
// or counter-clockwise order
function clockwise(cmds) {
  let sum = 0;
  for (let i = 0; i < cmds.length - 1; i++) {
    let a = cmds[i];
    let b = cmds[i+1];
    if (!(a.hasOwnProperty('x') && b.hasOwnProperty('x'))) {
      continue;
    }
    sum += (b.x - a.x) * (b.y + a.y);
  }
  return sum < 0;
}

// draws contours grouped by groupByContour(). uses clockwise()
// to determine if this contour should be a p5js shape or a p5js
// contour (i.e., cutout of a shape)
function drawContours(contours) {
  let inShape = false;
  for (let i = 0; i < contours.length; i++) {
    if (clockwise(contours[i])) {
      if (inShape) {
        endShape(CLOSE);
      }
      beginShape();
      inShape = true;
      drawContour(contours[i]);
    }
    else {
      beginContour();
      drawContour(contours[i]);
      endContour();
    }
  }
  if (inShape) {
    endShape(CLOSE);
  }
}

// draws an individual contour
function drawContour(cmds) {
  for (let i = 0; i < cmds.length; i++) {
    cmd = cmds[i];
    switch (cmd.type) {
      case 'M':
      case 'Z':
        break;
      case 'L':
        vertex(cmd.x, cmd.y);
        break;
      case 'C':
        bezierVertex(
          cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        break;
      case 'Q':
        quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
        break;
		}    
  }
}

function preload() {
  fontData = loadBytes('Roboto-Black.ttf');
}

let path;

function setup() {
	createCanvas(400, 400);
  font = opentype.parse(fontData.bytes.buffer);
  path = font.getPath("Comptypo", 0, 0, 72);
}

// applies a transformation to the x/y coordinates of each opentypejs
// command you pass to it, according to the callback, which will be
// given the x/y coordinates as parameters and should return an array
// in the form of [x, y]
function commandTransform(cmds, callback) {
  let transformed = [];
	for (let cmd of cmds) {
    let newCmd = {type: cmd.type}
    for (let pair of [['x', 'y'], ['x1', 'y1'], ['x2', 'y2']]) {
      if (cmd.hasOwnProperty(pair[0]) && cmd.hasOwnProperty(pair[1])) {
        let result = callback(cmd[pair[0]], cmd[pair[1]]);
        newCmd[pair[0]] = result[0];
        newCmd[pair[1]] = result[1];
      }
    }
    transformed.push(newCmd);
  }
  return transformed;
}

function draw() {
  background(255);
  fill(40);
  // stroke(128);
  // push();
  // translate(25, 150);
  // drawContours(
  //   groupByContour(
  //     commandTransform(path.commands, function(x, y) {
  //       let newX = x + sin((x*0.15) + (frameCount*0.11));
  //       let newY = y + cos((y*0.35) + (frameCount*0.17));
  //       return [newX, newY];
  //     })
  //   )
  // );
  // pop();
  
  // push();
  // translate(25, 250);
  // drawContours(
  //   groupByContour(
  //     commandTransform(path.commands, function(x, y) {
  //       let newX, newY;
  //       newX = x;
  //       if (y < map(sin(frameCount*0.04), -1, 1, 0, -100)) {
  //         newY = y - 50;
  //       }
  //       else {
  //         newY = y;
  //       }
  //       return [newX, newY];
  //     })
  //   )
  // );
  // pop();
  
//   push();
//   translate(25, 350);
//   drawContours(
//     groupByContour(
//       commandTransform(path.commands, function(x, y) {
//         let newX, newY;
//         newY = y;
//         newX = x * map(cos(map(x, 0, 550, 0, TWO_PI)), -1, 1, 1,
//           map(sin(frameCount*0.07), -1, 1, 0.1, 2));
//         return [newX, newY];
//       })
//     )
//   );
//   pop();


}// based on an example by Allison Parrish
// here: http://comptypo.decontextualize.com/fonts-as-data/
// showing how to load a font, with opentypejs, create a path
// from the font, then draw it to the canvas (both with the draw() method in
// opentype and by interpreting the path commands "by hand" with p5js drawing
// commands.)

// and using https://p5js.org/reference/#/p5/bezierTangent

let font;
let fontData;

let userInput;
let submitButton;
let stepsSlider;
let sizeSlider;
let toggleButton;
let string = 'yep yep yep';

let steps;
let size;
let bright = true;

function drawPathOutline(cmds) {
  // current pen position
  let cx = 0;
  let cy = 0;
  // start position of current contour
  let startX = 0;
  let startY = 0;
  for (let cmd of cmds) {
    switch (cmd.type) {
      case 'M':
        startX = cmd.x;
        startY = cmd.y;
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'L':
        line(cx, cy, cmd.x, cmd.y);
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'C':
        // bezier(cx, cy, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        // var steps = 3;

        for (var i = 0; i <= steps; i++) {
          var t = i / steps;
          
          if (!bright) {
          	var x = bezierPoint(cmd.x, cmd.x1, cmd.x2, cx, t);	// spazz
          	var y = bezierPoint(cmd.y, cmd.y1, cmd.y2, cy, t);
          }

          if (bright) {
          	var x = bezierPoint(cx, cmd.x1, cmd.x2, cmd.x, t); // bright
          	var y = bezierPoint(cy, cmd.y1, cmd.y2, cmd.y, t);
          }
          
          // var tx = bezierTangent(cmd.x, cmd.x1, cmd.x2, cx, t); // do not like
          // var ty = bezierTangent(cmd.y, cmd.y1, cmd.y2, cy, t); 
          
          var tx = bezierTangent(cx, cmd.x1, cmd.x2, cmd.x, t);
          var ty = bezierTangent(cy, cmd.y1, cmd.y2, cmd.y, t);
          var a = atan2(ty, tx);
          a -= HALF_PI;
          line(x, y, cos(a) * 8 + x, sin(a) * 8 + y);
        }

        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'Z':
        // to complete path
        line(cx, cy, startX, startY);
        break;
    }
  }
}

function preload() {
  fontData = loadBytes('LeagueGothic-Regular.otf');
}

let path;

function setup() {
  createCanvas(600, 600);
  userInput = createInput();
  submitButton = createButton('submit new text');
  submitButton.mouseReleased(fontify);
  stepsSlider = createSlider(1, 10, 3);
  sizeSlider = createSlider(12, 144, 144);
  toggleButton = createButton('toggle style');
  toggleButton.mouseReleased(toggleStyle);
  font = opentype.parse(fontData.bytes.buffer);
}


function fontify() {
  string = userInput.value();
}

function toggleStyle(){
	bright = !bright;
}

function draw() {
  background(255);
  path = font.getPath(string, 0, 0, size);
  steps = stepsSlider.value();
  size = sizeSlider.value();

  push();
  translate(50, 125);
  path.draw(drawingContext); // opentype.js
  pop();

  push();
  noFill();
  stroke(0);
  strokeWeight(2);
  translate(50, 275);
  drawPathOutline(path.commands); // p5js
  pop();
}// quick example showing how to load a font, with opentypejs, create a path
// from the font, then draw it to the canvas (both with the draw() method in
// opentype and by interpreting the path commands "by hand" with p5js drawing
// commands.)

let font;
let fontData;
let path;


// in these cmds, there are many objects and each object is a different type: L, M, C Q or Z
function drawPathOutline(cmds) {
  console.log(cmds);
  // current pen position
  let cx = 0;
  let cy = 0;
  // start position of current contour
  let startX = 0;
  let startY = 0;
  for (let cmd of cmds) {
    switch (cmd.type) {
      case 'M': // move the pen
        // the pen position and contour start in the same place
        startX = cmd.x;
        startY = cmd.y;
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'L':
        stroke(255, 0, 0);
        line(cx, cy, cmd.x, cmd.y); // draw a line
        cx = cmd.x; // set the next contour "starting position"
        cy = cmd.y;
        break;
      // case 'C':
      //   // stroke(0, 255, 0);
      //   bezier(cx, cy, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y); // bezier
      //   cx = cmd.x;
      //   cy = cmd.y;
      //   break;
      case 'Q': // quadratic
      	stroke(0, 0, 255);
        beginShape();
        // vertex(cx, cy);
        // quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
        triangle(cx, cy, cmd.x1, cmd.y1, cmd.x, cmd.y);
        endShape();
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'Z':
        // to complete path
        line(cx, cy, startX, startY);
        break;
    }
  }
}

function preload() {
  fontData = loadBytes('Roboto-Black.ttf'); // load the font
  // ttfs use quadratic curves
  // otfs use bezier curves
}


function setup() {
  createCanvas(400, 400);
  font = opentype.parse(fontData.bytes.buffer); // use opentype.js to parse the data
  path = font.getPath("GHIJK", 0, 0, 72); // now we can the path information for this string of text
}

function draw() {

  background(255);

  push();
  translate(50, 125);
  // draw that string on the canvas using that path information
  path.draw(drawingContext); // opentype.js
  pop();

  push();
  noFill();
  stroke(0);
  strokeWeight(2);
  translate(50, 225);
  drawPathOutline(path.commands); // p5js
  pop();

}// quick example showing how to load a font, with opentypejs, create a path
// from the font, then draw it to the canvas (both with the draw() method in
// opentype and by interpreting the path commands "by hand" with p5js drawing
// commands.)

let font;
let fontData;
let path;


// in these cmds, there are many objects and each object is a different type: L, M, C Q or Z
function drawPathOutline(cmds) {
  // console.log(cmds);
  // current pen position
  let cx = 0;
  let cy = 0;
  // start position of current contour
  let startX = 0;
  let startY = 0;
  for (let cmd of cmds) {
    switch (cmd.type) {
      case 'M': // move the pen
        // the pen position and contour start in the same place
        startX = cmd.x;
        startY = cmd.y;
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'L':
        stroke(255, 0, 0);
        line(cx, cy, cmd.x, cmd.y); // draw a line
        cx = cmd.x; // set the next contour "starting position"
        cy = cmd.y;
        break;
      case 'C':
        stroke(0, 255, 0);
        bezier(cx, cy, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y); // bezier
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'Q': // quadratic
        stroke(0, 0, 255);
        beginShape();
        vertex(cx, cy);
        quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
        endShape();
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'Z':
        // to complete path
        line(cx, cy, startX, startY);
        break;
    }
  }
}

function preload() {
  fontData = loadBytes('Roboto-Black.ttf'); // load the font
  // ttfs use quadratic curves
  // otfs use bezier curves
}


function setup() {
  createCanvas(400, 400);
  font = opentype.parse(fontData.bytes.buffer); // use opentype.js to parse the data
  path = font.getPath("ABCDE", 0, 0, 72); // now we can the path information for this string of text
}

function draw() {

  background(255);

  push();
  translate(50, 125);

  // draw that string on the canvas using that path information
  path.draw(drawingContext); // opentype.js
  pop();

  push();
  noFill();
  stroke(0);
  strokeWeight(2);
  translate(50, 225);

  drawPathOutline(path.commands); // p5js
  pop();

}// from: https://stackoverflow.com/questions/35156661/how-to-make-the-size-of-ellipse-to-get-smaller-and-bigger-in-processing-automati


let size = 18;
let minSize = 48;
let maxSize = 36;
let sizeSpeed = 0.04;

function setup() {
  createCanvas(640, 480);
}

function draw() {  
  size = map(sin(frameCount * sizeSpeed),-1.0,1.0,minSize,maxSize);

  background(255); 
  fill(0);
  textSize(size)
  // textSize(24 + (sin(frameCount/50)*50));
  text('Waiting', 50, 200);
}// from: https://stackoverflow.com/questions/35156661/how-to-make-the-size-of-ellipse-to-get-smaller-and-bigger-in-processing-automati


//current size - continuously updated
let size = 10;
//minimum size
let minSize = 10;
//maximum size
let maxSize = 240;
//change speed for size (how much will the size increase/decrease each frame)
let sizeSpeed = 0.025;

function setup()
{
  createCanvas(640, 480);
}

function draw()
{  
  size = map(sin(frameCount * sizeSpeed),-1.0,1.0,minSize,maxSize);

  background(255); 
  // fill(random(255), random(255), random(255));
  ellipse(width/2, height/2, size,size);

}var x = 220;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(x);
}var url;
var movies;

	var api= "https://api.giphy.com/v1/gifs/search?";
	var apiKey = "&api_key=vqNGp28kX6dUub94HzBbAtbOiywlKNdh";
	var query = "&q=love";



function preload() {
	url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=love&opening-date=1930-01-01;2000-01-01&api-key=f6d0e6b88f1c4cbea017ccd1b91f42c4";
	loadJSON(url, gotData);
  
  var giphyurl =  api + apiKey + query;
  loadJSON(giphyurl, gotGiphy);
  
}

function setup() {
	createCanvas(1500,1000);
	background(255, 105, 180);
	fill(0);
	textFont('Times New Roman');
	for (var i = 0; i < movies.length; i++) {
		textSize(18);
		textStyle(BOLD);
		text(movies[i].display_title, 10, 20+i*30);
		textSize(12);
		textStyle(NORMAL);
		text(movies[i].summary_short, 10, 33+i*30);
	}
  
}

function gotData(data) {
	movies = data.results;	

}

function gotGiphy(giphy){
  for (var j = 0; j<giphy.data.length; j++){
    createImg(giphy.data[j].images.original.url);
  }
}var gif;

function setup() {
  cnv = createCanvas(400,400)
  
  // you can also do this in preload
  gif = createImg('assets/cat.gif')

  // change position
  gif.position(50,50);
  
  //gif width & height
  gif_width = gif.width;
  gif_height = gif.height;
  print("gif width: " + gif_width) ;
  print("gif height: " + gif_height);
  
  // change size
  gif.size(gif_width/2, gif_height/2);
  
  // change canvas location
  cnv.position(20, 20);

}

function draw(){
  background(200);
}

let domain = 'http://api.giphy.com/v1/stickers/search?q=';
// let search = 'pizza';
let apiKey = '&api_key=KxcW0Jg0MMlRG5HNa16oWJFRuzShgvNS';
// let url = domain + search + apiKey;

var capture;

function setup() {
  createCanvas(320, 240);
  capture = createCapture(VIDEO);
  capture.hide();
  
  userInput = createInput();
  button = createButton('submit');
  button.mousePressed(makeRequest);
  
  console.log(url);
}

function draw() {  
  push();
  translate(width,0);
  scale(-1, 1);
  image(capture, 0, 0, 320, 240);
  pop();
}


function makeRequest(){
 let searchTerm = userInput.value();
 let url = domain + searchTerm + apiKey;
 console.log(url);
 loadJSON(url, getData);
}

function getData(data){
 console.log(data); 
}// https://api.openweathermap.org/data/2.5/find?q=Taipei&units=imperial&appid=898bc6b7a643ea26eac53e031a7cb5cf
// https://home.openweathermap.org/
// https://openweathermap.org/current

let domain = 'https://api.openweathermap.org/data/2.5/find?q=';
// let city = 'London';
let units = '&units=imperial';
let apiKey = '&appid=898bc6b7a643ea26eac53e031a7cb5cf';

// concatentate the variables together into one long string
// remember not to call this in draw or you'll likely hit your limit of calls
// let url = domain + city + units + apiKey;
let userInput;
let button;

let weatherData;
let size;

function setup() {
  createCanvas(400, 400);
  userInput = createInput();
  button = createButton('submit');
  // console.log(url);
  
  button.mousePressed(makeRequest);
}

function draw() {
  background(0);
  
  // if I have any data
  if (weatherData){
    
    let cityName = weatherData.list[0].name;
    let temp = weatherData.list[0].main.temp;
    
    text('The temperature in ' + cityName + ' is ' + temp + ' degrees.', 20, 20);
    fill(255);
    ellipse(width/2, height/2, temp, temp);
  }
  
}

function makeRequest(){
  let city = userInput.value();
  let url = domain + city + units + apiKey;
  // console.log(url);
  
  // load the data and make a callback to something with that data
  loadJSON(url, getData);
}


// data is the variable that holds that info when it comes in from the call
function getData(data){
  console.log(data);
  
  // swapping from local variable to global one to use in your sketch
  weatherData = data;
}var words = 'shawl';

function setup() {
  noCanvas();
  for (let i = 10; i < 100; i += 10){
   let startX = windowWidth * 0.3;
    let startY = windowHeight * 0.3;
    let div = createDiv(words);
    div.position(startX + i*2, startY + i*2);
    div.size(200, 200);
    div.style('font-family', 'monospace');
    div.style('font-size', '30px');
    div.style('letter-sapcing', '3.0em');
    div.style('transform', 'rotate(-10' + i + 'deg)');
    div.style('transform-origin', 'top left');
    div.style('color:white');
  }
}

function draw() {
  background(220);
}var words = 'brains';
var words1 = 'crunchychewy';
var words2 = 'chewycrunchy';


function setup() {
  noCanvas();
  for (let i = 0; i < (windowHeight * 0.3); i += 8) {
    let startX = windowWidth * 0.22;
    let startY = windowHeight * 0.2;
    let div = createDiv(words);
    div.position(startX, startY + i);
    div.size(200, 20);
    div.style('font-family', 'monospace');
    div.style('font-size', '21px');
    div.style('letter-spacing', '0.05em');
    div.style('transform', 'rotate(0deg)');
    div.style('transform-origin', 'top left');
    div.style('color:black');
  }
  
    for (let i = 0; i < (windowHeight * 0.15); i += 19) {
    let startX = windowWidth * 0.3;
    let startY = windowHeight * 0.2;
    let div = createDiv(words1);
    div.position(startX, startY + i);
    div.size(200, 20);
    div.style('font-family', 'monospace');
    div.style('font-size', '24px');
    div.style('letter-spacing', '0.2em');
    div.style('transform', 'rotate(0deg)');
    div.style('transform-origin', 'top left');
    div.style('color:black');
  }
  
    for (let i = (windowHeight * 0.155); i < (windowHeight * 0.3); i += 19) {
    let startX = windowWidth * 0.3;
    let startY = windowHeight * 0.2;
    let div = createDiv(words2);
    div.position(startX, startY + i);
    div.size(200, 20);
    div.style('font-family', 'monospace');
    div.style('font-size', '24px');
    div.style('letter-spacing', '0.2em');
    div.style('transform', 'rotate(0deg)');
    div.style('transform-origin', 'top left');
    div.style('color:black');
  }
  
  
  for (let i = 0; i < (windowHeight * 0.3); i += 8) {
    let startX = windowWidth * 0.52;
    let startY = windowHeight * 0.2;
    let div = createDiv(words);
    div.position(startX, startY + i);
    div.size(200, 20);
    div.style('font-family', 'monospace');
    div.style('font-size', '21px');
    div.style('letter-spacing', '0.05em');
    div.style('transform', 'rotate(0deg)');
    div.style('transform-origin', 'top left');
    div.style('color:black');
  }

}var words = 'overheard';

function setup() {
  noCanvas();
  for (let i = 10; i < 400; i += 5) {
    let startX = windowWidth * 0.1;
    let startY = windowHeight * 0.3;
    let div = createDiv(words);
    div.position(startX + i * 2, startY + i);
    div.size(200, 20);
    div.style('font-family', 'monospace');
    div.style('font-size', '20px');
    div.style('letter-spacing', '0.1em');
    div.style('transform', 'rotate(10' + i + 'deg)');
    div.style('transform-origin', 'left');
    div.style('color:black');
  }
}var words = 'obsessed';

function setup() {
  noCanvas();
   for (let i = 0; i < 400; i += 20) {
    let startX = windowWidth * 0.3;
    let startY = windowHeight * 0.2;
    let div = createDiv(words);
    div.position(startX, startY + i);
    div.size(200, 200);
    div.style('font-family', 'monospace');
    div.style('font-size', '32px');
    div.style('letter-spacing', '0.1' + i/4 + 'em');
    div.style('transform', 'rotate(0' - i + 'deg)');
    div.style('color:black');
  }
}

let comments = ['You got this!',
  'My hero!',
  'Marry me!',
  'Can I have your autograph?'
]

// elements
let vid;
let play;
let faster;
let slower;
let cheer;

let playing = false;
let rate = 1.0;
let myCheer;


function setup() {
  createCanvas(400, 400);
  vid = createVideo('fingers.mov');
  vid.speed(rate);
  vid.hide();

  play = createButton('play / pause');
  play.position(20, 300);
  play.mousePressed(playPauseVid);

  faster = createButton('faster')
  faster.position(110, 300);
  faster.mousePressed(speedVid);

  slower = createButton('slower')
  slower.position(160, 300);
  slower.mousePressed(slowVid);

  cheer = createButton('cheer');
  cheer.position(210, 300);
  cheer.mousePressed(randomCheer);
}

function draw() {
  background(220);
  image(vid, 20, 20);

  textSize(20);
  text(myCheer, 30, 100);
  fill(255, 255, 0);
}


function playPauseVid() {
  if (!playing) {
    vid.loop();
    playing = true;
  } else if (playing) {
    vid.pause();
    playing = false;
  }
}


function speedVid() {
  if (playing) {
    rate += 0.5;
    vid.speed(rate);
    // console.log(rate);
  }
}

function slowVid() {
  if (playing) {
    rate = rate * 0.5;
    vid.speed(rate);
  }
  // console.log(rate);
}

function randomCheer() {
  myCheer = random(comments);
  // console.log(myCheer);
}let comments = ['You got this!',
  'My hero!',
  'Marry me!',
  'Can I have your autograph?'
]

let vid;
let playing = false;

let play;
let pause;
let faster;
let slower;
let rate = 1.0
let cheer;
let myCheer;

let slider;
let speed = 0;
let newSpeed = 0;


function setup() {
  createCanvas(400, 400);
  vid = createVideo('fingers.mov');
  vid.speed(rate);
  vid.hide();

  play = createButton('play');
  play.position(20, 300);
  play.mousePressed(playVid);

  pause = createButton('pause');
  pause.position(60, 300);
  pause.mousePressed(pauseVid);

  faster = createButton('faster')
  faster.position(110, 300);
  faster.mousePressed(speedVid);

  slower = createButton('slower')
  slower.position(160, 300);
  slower.mousePressed(slowVid);

  cheer = createButton('random cheer');
  cheer.position(210, 300);
  cheer.mousePressed(randomCheer);
  
  // slider = createSlider(0, 3, 0.5);
  // slider.position(20, 340);                     
}

function draw() {
  background(220);
  image(vid, 20, 20);

  textSize(20);
  text(myCheer, 30, 100);
  fill(255, 255, 0); 
  
  // speed = slider.value()
  
  // if (speed != newSpeed){
  //  newSpeed = speed;
  //  console.log(newSpeed);
  // changeRate();
  // }
}

// function changeRate(){
//   if (playing) {
//     vid.speed(newSpeed);
//   }
// }


function playVid() {
  if (!playing) {
    vid.loop();
    playing = true;
  }
}

function pauseVid() {
  if (playing) {
    vid.pause();
    playing = false;
  }
}

function speedVid() {
  if (playing) {
    rate += 0.5;
    vid.speed(rate);
    // console.log(rate);
  }
}

function slowVid() {
  if (playing) {
    rate = rate * 0.5;
    vid.speed(rate);
  }
  // console.log(rate);
}

function randomCheer() {
  myCheer = random(comments);
  // console.log(myCheer);
}var words = 'brains';

function setup() {
  noCanvas();
  
  
  // swing down left and around
  for (let i = 0; i < 200; i += 10) {
    let startX = windowWidth * 0.3;
    let startY = windowHeight * 0.5;
    let div = createDiv(words);
    div.position(startX, startY + i);
    div.size(200, 20);
    div.style('font-family', 'monospace');
    div.style('font-size', '20px');
    div.style('letter-spacing', '0.2em');
    div.style('transform', 'rotate(0' + i + 'deg)');
    // div.style('transform', 'rotate(0' - i + 'deg)');
    div.style('transform-origin', 'left');
    div.style('color:white');
  }
  
	// slant down and right
    for (let i = 0; i < 250; i += 20) {
    let startX = windowWidth * 0.4;
    let startY = windowHeight * 0.2;
    let div = createDiv(words);
    div.position(startX + i / 2, startY + i);
    div.size(200, 20);
    div.style('font-family', 'monospace');
    div.style('font-size', '20px');
    div.style('letter-spacing', '0.2em');
    div.style('transform', 'rotate(-5deg)');
    div.style('transform-origin', 'top left');
    div.style('color:white');
  }
    
  // // straight column
  //   for (let i = 0; i < 250; i += 20) {
  //   let startX = windowWidth * 0.3;
  //   let startY = windowHeight * 0.26;
  //   let div = createDiv(words);
  //   div.position(startX, startY + i);
  //   div.size(200, 20);
  //   div.style('font-family', 'monospace');
  //   div.style('font-size', '20px');
  //   div.style('letter-spacing', '0.2em');
  //   // div.style('transform', 'rotate(10deg)');
  //   div.style('transform-origin', 'top left');
  //   div.style('color:white');
  // }

    // slant left up
  for (let i = 0; i < 140; i += 20) {
    let startX = windowWidth * 0.6;
    let startY = windowHeight * 0.4;
    let div = createDiv(words);
    div.position(startX - i, startY + i);
    div.size(200, 20);
    div.style('font-family', 'monospace');
    div.style('font-size', '20px');
    div.style('letter-spacing', '0.1em');
    div.style('transform', 'rotate(50deg)');
    div.style('transform-origin', 'top left');
    div.style('color:white');
  }

  
  
}

var words = 'brains';

function setup() {
  noCanvas();

  // slant right down
  for (let i = 0; i < 200; i += 20) {
    let startX = windowWidth * 0.1;
    let startY = windowHeight * 0.1;
    let div = createDiv(words);
    div.position(startX + i / 2, startY + i);
    div.size(200, 20);
    div.style('font-family', 'monospace');
    div.style('font-size', '20px');
    div.style('letter-spacing', '0.1em');
    div.style('transform', 'rotate(-10deg)');
    div.style('transform-origin', 'top left');
    div.style('color:white');
  }


  // slant left up
  for (let i = 0; i < 200; i += 20) {
    let startX = windowWidth * 0.6;
    let startY = windowHeight * 0.1;
    let div = createDiv(words);
    div.position(startX - i / 2, startY + i);
    div.size(200, 20);
    div.style('font-family', 'monospace');
    div.style('font-size', '20px');
    div.style('letter-spacing', '0.1em');
    div.style('transform', 'rotate(-10deg)');
    div.style('transform-origin', 'top left');
    div.style('color:white');
  }

  // swing down left and around
  for (let i = 0; i < 200; i += 10) {
    let startX = windowWidth * 0.2 - 10;
    let startY = windowHeight * 0.4 + 10;
    let div = createDiv(words);
    div.position(startX, startY + i);
    div.size(200, 20);
    div.style('font-family', 'monospace');
    div.style('font-size', '20px');
    div.style('letter-spacing', '0.1em');
    div.style('transform', 'rotate(0' + i + 'deg)');
    // div.style('transform', 'rotate(0' - i + 'deg)');
    div.style('transform-origin', 'left');
    div.style('color:white');
  }

  // slant left up
  for (let i = 0; i < 160; i += 20) {
    let startX = windowWidth * 0.6;
    let startY = windowHeight * 0.4;
    let div = createDiv(words);
    div.position(startX - i, startY + i);
    div.size(200, 20);
    div.style('font-family', 'monospace');
    div.style('font-size', '20px');
    div.style('letter-spacing', '0.1em');
    div.style('transform', 'rotate(50deg)');
    div.style('transform-origin', 'top left');
    div.style('color:white');
  }

  // down 90 deg, up 270 degrees, mirrored over vertical axis 180 deg
   for (let i = 0; i < 100; i += 20) {
    let startX = windowWidth * 0.7;
    let startY = windowHeight * 0.4;
    let div = createDiv(words);
    div.position(startX - i, startY + i);
    div.size(200, 20);
    div.style('font-family', 'monospace');
    div.style('font-size', '20px');
    div.style('letter-spacing', '0.1em');
    div.style('transform', 'rotate(90deg)');
    div.style('transform-origin', 'top left');
    div.style('color:white');
  }

  // down 90 deg, up 270 degrees, mirrored over vertical axis 180 deg
  for (let i = 0; i < 100; i += 10) {
    let startX = windowWidth * 0.9;
    let startY = windowHeight * 0.4;
    let div = createDiv(words);
    div.position(startX - i, startY + i * 2);
    div.size(200, 20);
    div.style('font-family', 'monospace');
    div.style('font-size', '20px');
    div.style('letter-spacing', '0.1em');
    div.style('transform', 'rotate(250deg)');
    div.style('transform-origin', 'top left');
    div.style('color:white');
  }

  // face up and scrunched
  for (let i = 0; i < 100; i += 10) {
    let startX = windowWidth * 0.9;
    let startY = windowHeight * 0.1;
    let div = createDiv(words);
    div.position(startX - i, startY + i / 2);
    div.size(200, 20);
    div.style('font-family', 'monospace');
    div.style('font-size', '20px');
    div.style('letter-spacing', '0.1em');
    div.style('transform', 'rotate(250deg)');
    div.style('transform-origin', 'top left');
    div.style('color:white');
  }

  // mohawk
  for (let i = 10; i < 100; i += 10) {
    let startX = windowWidth * 0.3;
    let startY = windowHeight * 0.8;
    let div = createDiv(words);
    div.position(startX - i, startY + i);
    div.size(200, 20);
    div.style('font-family', 'monospace');
    div.style('font-size', '20px');
    div.style('letter-spacing', '0.1em');
    div.style('transform', 'rotate(-15' +i+ 'deg)');
    div.style('transform-origin', 'top left');
    div.style('color:white');
  }
  
  // new turn option
    for (let i = 10; i < 100; i += 10) {
    let startX = windowWidth * 0.4;
    let startY = windowHeight * 0.7;
    let div = createDiv(words);
    div.position(startX - i, startY + i);
    div.size(200, 20);
    div.style('font-family', 'monospace');
    div.style('font-size', '20px');
    div.style('letter-spacing', '0.1em');
    div.style('transform', 'rotate(0.25turn)');
    div.style('transform-origin', 'top left');
    div.style('color:white');
  }
  
  // curve up base of neck
   for (let i = 10; i < 100; i += 10) {
    let startX = windowWidth * 0.5;
    let startY = windowHeight * 0.7;
    let div = createDiv(words);
    div.position(startX + i*2, startY + i);
    div.size(200, 20);
    div.style('font-family', 'monospace');
    div.style('font-size', '20px');
    div.style('letter-spacing', '0.1em');
    div.style('transform', 'rotate(-10' +i+ 'deg)');
    div.style('transform-origin', 'top left');
    div.style('color:white');
  }
}// translateZ is a type of transformation for 3D layout
// rotateX & rotateY transforms
// select random fonts from Google fonts to use
// things that require you use code for you to make them
// this assignment should be static, not interactive

let src = "hello friends";

function setup() {
  noCanvas();
  // let d = createDiv(src);
  // d.position(windowWidth * 0.5, windowHeight * 0.5);
  // d.style("font-size", "72px");
  // d.size(500, 50);
  // d.style("transform", "rotate(0.125rad)"); // or in degrees, e.g. 45deg

  // create a div for each letter

  for (let i = 0; i < src.length; i++) {
    let ch = src.charAt(i);
    let angle = TWO_PI * (i / src.length);
    let d = createDiv(ch);
    d.style("font-size", "72px");
    d.size(300, 50);
    d.position(windowWidth * 0.5, windowHeight * 0.5);
    d.style("transform", "rotate(" + angle + "rad)");
    d.style("transform-origin", "left center");
    d.style("text-align", "right");
    d.style("border", "1px black solid");
  }
}let vid;
let targetColor;
let threshold = 20;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  vid = createCapture(VIDEO);
  vid.hide(); // hide the DOM element but still use all 
  //the info you're getting and put it it into the canvas
  targetColor = color(255, 0, 0); // set as a placeholder
}

function draw() {
  // background(220);
  image(vid, 0, 0);

  // pixels closest to target
  let winningX = 0;
  let winningY = 0;
  let qualifiedPix = 1; // set a default
  let record;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // look at every pixel and tell me the color value
      let pix = vid.get(x, y);

      // see which pixels are closest to my target
      // then draw something there
      // by usting distance function to compare values
      // ignore 4th param unless you're changing alpha
      let closeness = dist(targetColor[0], targetColor[1], targetColor[2], pix[0], pix[1], pix[2]);

      if (closeness < threshold) {
        winningX = x;
        wintingY = y;
        qualifiedPix++;
        // redefine which pixel cluster is actually the closest
        record = closeness; // keep track of what is the closest
      }
    }
  }

  let xx = winningX / qualifiedPix;
  let yy = winningY / qualifiedPix;

  fill(targetColor);
  ellipse(xx, yy, 20, 20);

  // draw at the average location

}


function mouseReleased() {
  // let thisPix = vid.get(mouseX, mouseY);
  // console.log(thisPix);

  targetColor = vid.get(mouseX, mouseY);
  // console.log(targetColor);
}

let song;
let vol;

function preload() {
  song = loadSound(“funky.mp3”);
}


function setup() {
  createCanvas(400, 400);
  // song.play();	// only plays through one
  // song.loop();
  // song.amp(0.0); // to control volume from 0-1…values are normalized
}

function draw() {
  background(220);
  // vol = map(mouseY, height, 0, 0.0, 0.9);
  // song.amp(vol);

  song.amp(0.7);
}

function mousePressed() {
  // song.play();

  if (song.isPlaying()) {
		song.stop();
  } else {
   // song.play(); 
    song.loop();
  }
}function drawLetter() {
  let scale = 0.1;
  let y;
  let pts = [];
  pts.push([0, height * scale]); // first vertex

  // interior vertices
  for (let i = 0; i < int(random(3, 14)); i++) {

    if (i % 2 == 0) {
      // if even 
      y = height * scale;
    } else {
      // if odd 
      y = int(random(15, height * scale));
    }

    let val = i * 0.1 + 0.1;
    let x = int(width * scale * val);

    pts.push([pts[i][0] + x, y]);
  }

  beginShape();
  for (let i = 0; i < pts.length; i++) {
    curveVertex(pts[i][0], pts[i][1]);
  }
  curveVertex(width * scale, height * scale); // last vertex
  endShape();
}


function setup() {
  createCanvas(600, 600);
}

function draw() {
  // background(0,153,250);
  background(230);

  push();
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      push();
      translate(i * width / 10, j * height / 10);
      strokeWeight(3);
      stroke(40);
      noFill();
      drawLetter();
      pop();
      noLoop();
    }
  }
  pop();
}

function mouseReleased() {
  draw();
}function drawLetter() {
  let scale = 0.1;
  let y;
  let pts = [];
  pts.push([0, height * scale]); // first vertex

  // interior vertices
  for (let i = 0; i < int(random(3, 6)); i++) {

    if (i % 2 == 0) {
      // if even 
      y = height * scale;
    } else {
      // if odd 
      y = int(random(15, height * scale));
    }

    let val = i * 0.1 + 0.1;
    let x = int(width * scale * val);

    pts.push([pts[i][0] + x, y]);
  }

  beginShape();
  for (let i = 0; i < pts.length; i++) {
    vertex(pts[i][0], pts[i][1]);
  }
  vertex(width * scale, height * scale); // last vertex
  endShape();
}


function setup() {
  createCanvas(600, 600);
}

function draw() {
  // background(0,153,250);
  background(230);

  push();
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      push();
      translate(i * width / 10, j * height / 10);
      strokeWeight(3);
      stroke(40);
      noFill();
      drawLetter();
      pop();
      noLoop();
    }
  }
  pop();
}

function mouseReleased() {
  draw();
}function drawLetter() {
  let scale = 0.1;
  let y;
  let pts = [];
  pts.push([0, height * scale]); // first vertex

  // interior vertices
  for (let i = 0; i < int(random(4, 6)); i++) {

    if (i % 2 == 0) {
      // if i is even 
      y = height * scale;
    } else {
      // if i is odd 
      y = int(random(10, height * scale));
    }

    let val = i * 0.1 + 0.1;
    let x = int(width * scale * val);

    pts.push([pts[i][0] + x, y]);
  }

  beginShape();
  for (let i = 0; i < pts.length; i++) {
    vertex(pts[i][0], pts[i][1]);
  }
  vertex(width * scale, height * scale); // last vertex
  endShape();
}


function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);

  push();
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      push();
      translate(i * width / 10, j * height / 10);
      fill(0);
      drawLetter();
      pop();
      noLoop();
    }
  }
  pop();
}

function mouseReleased() {
  draw();
}let scale = 0.1;

function drawLetter() {
  let pts = [];
  pts.push([0, height * scale]); // first vertex
  
  // get a random int to determine num of interior vertices 
  for (let i = 0; i < int(random(3, 10)); i++) {
   let val = i * 0.1 + 0.1;
   let x = int(random(width*scale*val));
   let y = int(random(height*scale));
   pts.push([pts[i][0] + x, y]); 
  }
  
  beginShape();
   for (let i = 0; i < pts.length; i++) {
    vertex(pts[i][0], pts[i][1]);
  }
  vertex(width * 0.1, height* 0.1); // last vertex
  endShape(CLOSE);
}


function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
 
  push();
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
  		push();
  		translate(i * width/10, j * height/10);
  		fill(0);
  		drawLetter();
  		pop();
      noLoop(); 
    }
  }
  pop(); 
}

function mouseReleased() {
 draw(); 
}
function drawLetter() {
  let pts = [];
  pts.push([0, height]); // first vertex
  
  // get a random number to determine # of interior vertices 
  for (let i = 0; i < int(random(3, 10)); i++) {
   let val = i * 0.1 + 0.1;
   pts.push([pts[i][0] + int(random(width*val)), int(random(height))]); 
  }
  
  beginShape();
   for (let i = 0; i < pts.length; i++) {
    vertex(pts[i][0], pts[i][1]);
  }
  vertex(width, height); // last vertex
  endShape(CLOSE);
}


function setup() {
  createCanvas(600, 600);
}


function draw() {
  background(220);
  
  fill(0);
  drawLetter();
  noLoop();  
}

function mouseReleased() {
 draw(); 
}
// 9x9 grid
function drawLetter() {
  let pts = [];
  for (let i = 0; i < int(random(5, 15)); i++) {
    pts.push([int(random(-2, 2))*30, int(random(-2, 2))*30]);
  }
  beginShape();
  for (let i = 0; i < pts.length; i++) {
    // try changing this to curveVertex
    vertex(pts[i][0], pts[i][1]);
  }
  endShape();
}

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  push();
  translate(width/20, height/20);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
  		push();
  		translate(i * (width/10), j * (height/10));
      scale(0.5);
      strokeWeight(2);
  		stroke(0);
  		noFill();
  		drawLetter();
  		pop();
  		noLoop();
    }
  }
  pop();
}

function mousePressed() {
  draw();
}function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  
  fill(40);
  noStroke();

  beginShape();
  vertex(20, height);
  vertex(width * 0.2, height * 0.4);
  vertex(width * 0.35, height);
  vertex(width * 0.50, height * 0.2);
  vertex(width * 0.70, height);
  vertex(width * 0.85, height * 0.3);
  vertex(width-20, height);
  endShape();

  noLoop();
  
}

function drawLetter(){
 let pts = [];
  // [[-1,0], [   ], [  ]]
  for (let i = 0; i < 5; i++){
   let coord = [int(random(-2, 2)), int(random(-2,2))];
    pts.push(coord);
  }
  
  beginShape();
  for (let i = 0; i < pts.length; i++){
    curveVertex(pts[i][0], pts[i][1]);
  }  
}


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  noFill();
  push();
  //nested loop here to draw these in a grid
  // for i
  // for j
  // push
  // translate
  // scale
  // strokeweight
  // drawLetter
  // pop
  translate(width/2, height/2);
  scale(50);
  strokeWeight(0.2);
  drawLetter();
  pop();
  noLoop();  
}

function mousePressed(){
 draw(); 
}let size = 30;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  // let i = 0;
  // while (i < 4){
  //  ellipse(i*50, 200, 20, 20);
  //   i++;
  // }

  for (let i = 0; i < width; i+=size) {
    for (let j = 0; j < height; j+=size) {
      if (dist(mouseX, mouseY, i, j) < size/2) {
        fill(255, 0, 0);
      } else {
        fill(255);
      }
      ellipse(i, j, size, size);
    }
  }
}function setup() {
  noCanvas();
  frameRate(8);
}


function draw() {
  breakUp();
  breakDown();
  breakOut();
  breakDance()
  breakThrough();
  breakAway();
  breakApart();
}



function deleteNum(amt) {
  if (amt == 1) {
    term.write("\b \b");
  }

  if (amt == 3) {
    term.write("\b \b" + "\b \b" + "\b \b");
  }
  
  if (amt == 4) {
    term.write("\b \b" + "\b \b" + "\b \b" + "\b \b");
  }
  
  if (amt == 5) {
    term.write("\b \b" + "\b \b" + "\b \b" + "\b \b" + "\b \b");
  }
}
let break1 = "break";
let break2 = "break";
let break3 = "break";
let break4 = "break";
let break5 = "break";
let break6 = "break";
let break7 = "break";
let upPos = 20;
let downPos = 20;
let dancePos = 30
let break4Pos = 25;
let break5Pos = 17;
let thrPos = 42;
let oughPos = 45;
let break6Row = 33;
let break6Col = 40;
let awayRow = 33
let awayCol = 46


function setup() {
  noCanvas();
  frameRate(8);
}


function draw() {
  breakUp();
  breakDown();
  breakOut();
  breakDance()
  breakThrough();
  breakAway();
  // breakApart();
}

function breakAway() {
  writeAway();
  writeBreak6();

  if (frameCount % 2 == 0) {
    if (break6Row > 29) {
      // deleteDance();
      break6Row--;
      break6Col--;
    }
    if (awayRow < 37) {
      // deleteAway();
      awayRow++;
      awayCol+=2;
    }
  }
}

function writeAway() {
  term.write(ansi.cursor.position(awayRow, awayCol));
  term.write("away");
}

function deleteAway(){
  term.write("\b \b" + "\b \b" + "\b \b");
}

function writeBreak6() {
  term.write(ansi.cursor.position(break6Row, break6Col));
  term.write(break6);
}


function breakThrough() {
  writeThr();
  writeOugh();
  writeBreak5();

  // if (frameCount % 2 == 0 && break5Pos < 21) {
  //   deleteDance();
  //   break5Pos++
  // }

  if (frameCount % 3 == 0) {
    if (break5Pos < 21) {
      deleteDance();
      break5Pos++
    }
    if (thrPos > 40) {
      deleteThr();
      thrPos--;
    }
    if (oughPos < 47) {
      deleteOugh();
      oughPos++;
    }
  }

}

function writeBreak5() {
  term.write(ansi.cursor.position(break5Pos, 43));
  term.write(break5);
}

function writeThr() {
  term.write(ansi.cursor.position(18, thrPos));
  term.write("thr");
}

function deleteThr() {
  term.write("\b \b" + "\b \b" + "\b \b");
}

function writeOugh() {
  term.write(ansi.cursor.position(18, oughPos));
  term.write("ough");
}

function deleteOugh() {
  term.write("\b \b" + "\b \b" + "\b \b" + "\b \b");
}


function breakDance() {
  term.write(ansi.cursor.position(10, break4Pos));
  term.write(break4);
  writeDance();

  if (frameCount % 2 == 0) {
    deleteDance();
    if (dancePos == 30) {
      dancePos += 3;
    } else if (dancePos == 33) {
      dancePos = 30;
    }
    writeDance();
  }

}


function writeDance() {
  term.write(ansi.cursor.position(10, dancePos));
  term.write("dance");
}

function deleteDance() {
  term.write("\b \b" + "\b \b" + "\b \b" + "\b \b" + "\b \b");
}


function breakOut() {
  term.write(ansi.cursor.position(10, 60));
  term.write(break3);
  writeOut(10, 65);

  if (frameCount % 2 == 0) {
    writeOut(int(random(0, 20)), int(random(65, 100)));
  }
}


function writeOut(r, c) {
  term.write(ansi.cursor.position(r, c));
  term.write("out");
}


function breakDown() {
  term.write(ansi.cursor.position(20, 18));
  term.write(break2);
  writeDown();
  if (frameCount % 2 == 0 && upPos < term.rows) {
    deleteDown()
    downPos++
    writeDown();
  }
}


function writeDown() {
  term.write(ansi.cursor.position(downPos, 23));
  term.write("down");
}


function deleteDown() {
  term.write("\b \b" + "\b \b" + "\b \b");
}


function breakUp() {
  term.write(ansi.cursor.position(20, 5));
  term.write(break1);
  writeUp();
  if (frameCount % 2 == 0 && upPos > 0) {
    // if (frameCount % 2 == 0 && upPos > 0) {
    deleteUp()
    upPos--
    writeUp();
    // if (upPos == 0) {
    //   deleteUp()
    //   upPos = 19;
    // }
  }
}

function writeUp() {
  term.write(ansi.cursor.position(upPos, break1.length * 2));
  term.write("up");
}

function deleteUp() {
  // term.write("\b \b" + "\b \b");
  term.write("\b \b");
}function setup() {
  noCanvas();
  frameRate(4);
}

function draw() {
  
	if (frameCount % 2 ==0) {
  term.write("Hello\r");
	}
	else {
		term.write("Goodbye\r");
		
	}

	// term.write("\x1b[17Chello");
	term.write("\x1b[17C");
	term.write("hello");
	
	// this row and this column
	term.write("\x1b[5;15H");
	
	let randRows = int(random(term.rows));
	let randCols = int(random(term.rows));
	// term.cols;
	// term.rows;
	
	// term.write("\xb1["+randRow+" ...see line 21
						 
	term.write(ansi.cursor.position(randRow, randCol);
	term.write("hello");
	
	
	let myCols = ["red", "yellow"]
	let randCol = random(myCols);
	term.write(ansi.styles([randCol, 'bold']));
	term.write(ansi.cursor.position(randRow, randCol);
}let info;
let textbox;
let button;
let slider;
let fontSize;
let div;

function setup() {
  createCanvas(300, 300);
  textbox = createInput("Type your name here");
  textbox.position(10, 10);
  
  button = createButton("Submit");
  button.mousePressed(gatherUserName);
  button.position(10, 30);
  
  slider = createSlider(8, 120, 12);
  slider.changed(changeFontSize);
  slider.position(10, 50);
  
  div = createDiv("12");
  div.position(150, 50);
  
  // anonymous function
  // slider.changed(function() {fontSize = slider.value()});
}


function draw() {
  background(220);
  textSize(fontSize);
	text(info, width/2, height/2);
  
  // print(slider.value());
  
  // info = textbox.value();
  // print(info);

  // if (textbox != null) {
  //   text(info, 20, 20);
  // }
  
  // if (mouseIsPressed) {
  //   text(info, 20, 20)
  // }
}/* ===
Blog Post: https://ellennickles.com/itpblog/2018/9/17/week-2-feature-extraction-photo-booth

Based on these examples:
https://github.com/ml4a/ml4a-demos/tree/master/examples/classification-simple
https://github.com/ml4a/ml4a-demos/tree/master/examples/classification-guitar
https://github.com/ml5js/ml5-examples/blob/master/p5js/FeatureExtractor/FeatureExtractor_Image_Classification/sketch.js
=== */

let featureExtractor;
let classifier;
let video;
let loss;
let facesA_Images = 0;
let facesB_Images = 0;
let facesC_Images = 0;
let numClasses = 3;

let snaps0 = [];
let snaps1 = [];
let snaps2 = [];
let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;
let sourceX;
let sourceY;
let sourceWidth;
let sourceHeight;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', "-1");

  video = createCapture(VIDEO);
  video.parent('videoContainer');
  video.hide();

  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  featureExtractor.numClasses = numClasses;
  classifier = featureExtractor.classification(video, videoReady);
  createButtons();
}


function modelReady() {
  select('#modelStatus').html('Base Model (MobileNet) loaded!');
}


function videoReady() {
  select('#videoStatus').html('Video ready!');
}


function classify() {
  classifier.classify(gotResults);
}


function createButtons() {
  buttonA = select('#faceA');
  buttonA.mouseReleased(function() {
    classifier.addImage('A');
    select('#numFacesA').html(facesA_Images++);
  });

  buttonB = select('#faceB');
  buttonB.mouseReleased(function() {
    classifier.addImage('B');
    select('#numFacesB').html(facesB_Images++);
  });

  buttonC = select('#faceC');
  buttonC.mouseReleased(function() {
    classifier.addImage('C');
    select('#numFacesC').html(facesC_Images++);
  });


  train = select('#train');
  train.mouseReleased(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Finished Training! Final Loss: ' + loss);
      }
    });
  });

  buttonPredict = select('#buttonPredict');
  buttonPredict.mouseReleased(classify);
}


function gotResults(err, result) {
  if (err) {
    console.error(err);
  }
  select('#result').html("I see face " + result);
  // console.log(result);

  if (result == 'A') {
    takeSnap0();
  } else if (result == 'B') {
    takeSnap1();
  } else if (result == 'C') {
    takeSnap2();
  }

  setTimeout(classify, 500);
}


function draw() {
  background(255);

  frameStartX = 0;
  frameStartY = 0;
  frameWidth = windowWidth / 2;
  frameHeight = windowHeight;

  sourceX = video.width / 4;
  sourceY = 0;
  sourceWidth = video.width / 2;
  sourceHeight = video.height;

  image(video, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);

  noFill();
  stroke(2);
  rect(frameStartX, frameStartY, frameWidth, frameHeight);

  stroke(1);
  rect(windowWidth / 2, frameStartY, frameWidth, frameHeight);

  if (snaps0.length > 0) {
    for (let i = 0; i < snaps0.length; i++) {
      snaps0[i].show();
    }
  }

  if (snaps1.length > 0) {
    for (let i = 0; i < snaps1.length; i++) {
      snaps1[i].show();
    }
  }

  if (snaps2.length > 0) {
    for (let i = 0; i < snaps2.length; i++) {
      snaps2[i].show();
    }
  }
}


function takeSnap0() {
  let startX = frameStartX;
  let startY = frameStartY;
  let startW = frameWidth / 3; 
  let startH = frameHeight; 
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps0.push(new Segment0(snap));
}


function takeSnap1() {
  let startX = frameWidth / 3;
  let startY = frameStartY;
  let startW = frameWidth / 3; 
  let startH = frameHeight; 
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps1.push(new Segment1(snap));
}


function takeSnap2() {
  let startX = frameWidth - frameWidth / 3;
  let startY = frameStartY;
  let startW = frameWidth / 3;
  let startH = frameHeight;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps2.push(new Segment2(snap));
}


class Segment0 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth / 2;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}


class Segment1 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth / 2 + frameWidth / 3;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}


class Segment2 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth - frameWidth / 3;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}/* ===
Blog Post: https://ellennickles.com/itpblog/2018/9/17/week-2-feature-extraction-photo-booth

Based on these examples:
https://github.com/ml4a/ml4a-demos/tree/master/examples/classification-simple
https://github.com/ml4a/ml4a-demos/tree/master/examples/classification-guitar
https://github.com/ml5js/ml5-examples/blob/master/p5js/FeatureExtractor/FeatureExtractor_Image_Classification/sketch.js
=== */

let featureExtractor;
let classifier;
let video;
let loss;
let facesA_Images = 0;
let facesB_Images = 0;
let facesC_Images = 0;
let numClasses = 3;
let isStopped = false;

let snaps0 = [];
let snaps1 = [];
let snaps2 = [];
let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;
let sourceX;
let sourceY;
let sourceWidth;
let sourceHeight;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', "-1");

  video = createCapture(VIDEO);
  video.parent('videoContainer');
  video.hide();

  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  featureExtractor.numClasses = numClasses;
  classifier = featureExtractor.classification(video, videoReady);
  createButtons();
}


function modelReady() {
  select('#modelStatus').html('Base Model (MobileNet) loaded!');
}


function videoReady() {
  select('#videoStatus').html('Video ready!');
}


function classify() {
  // as soon as .classify is called, isPredicting == true;
  if (isStopped == false) {
    classifier.classify(gotResults);
  } else if (isStopped == true) {}
}

function clearModel() {
  classifier.customModel = null;
  classifier.isPredicting = false;
  classifier.hasAnyTrainedClass = false;
  isStopped = true;
  facesA_Images = 0;
  facesB_Images = 0;
  facesC_Images = 0;
  select('#numFacesA').html(' ');
  select('#numFacesB').html(' ');
  select('#numFacesC').html(' ');
  select('#loss').html(' ');
  select('#result').html(' ');
}


function createButtons() {
  buttonA = select('#faceA');
  buttonA.mouseReleased(function() {
    classifier.addImage('A');
    select('#numFacesA').html(facesA_Images++);
  });

  buttonB = select('#faceB');
  buttonB.mouseReleased(function() {
    classifier.addImage('B');
    select('#numFacesB').html(facesB_Images++);
  });

  buttonC = select('#faceC');
  buttonC.mouseReleased(function() {
    classifier.addImage('C');
    select('#numFacesC').html(facesC_Images++);
  });


  train = select('#train');
  train.mouseReleased(function() {
    isStopped = false;
    classifier.hasAnyTrainedClass = true;
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Finished Training! Final Loss: ' + loss);
      }
    });
  });

  buttonPredict = select('#buttonPredict');
  buttonPredict.mouseReleased(classify);



  buttonReset = select('#buttonReset');
  buttonReset.mouseReleased(clearModel);
}


function gotResults(err, result) {
  if (err) {
    console.error(err);
  }
  select('#result').html("I see face " + result);
  // console.log(result);

  if (result == 'A') {
    takeSnap0();
  } else if (result == 'B') {
    takeSnap1();
  } else if (result == 'C') {
    takeSnap2();
  }

  setTimeout(classify, 500);

}


function draw() {
  background(255);

  frameStartX = 0;
  frameStartY = 0;
  frameWidth = windowWidth / 2;
  frameHeight = windowHeight;

  sourceX = video.width / 4;
  sourceY = 0;
  sourceWidth = video.width / 2;
  sourceHeight = video.height;

  image(video, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);

  noFill();
  stroke(2);
  rect(frameStartX, frameStartY, frameWidth, frameHeight);

  stroke(1);
  rect(windowWidth / 2, frameStartY, frameWidth, frameHeight);

  if (snaps0.length > 0) {
    for (let i = 0; i < snaps0.length; i++) {
      snaps0[i].show();
    }
  }

  if (snaps1.length > 0) {
    for (let i = 0; i < snaps1.length; i++) {
      snaps1[i].show();
    }
  }

  if (snaps2.length > 0) {
    for (let i = 0; i < snaps2.length; i++) {
      snaps2[i].show();
    }
  }
}


function takeSnap0() {
  let startX = frameStartX;
  let startY = frameStartY;
  let startW = frameWidth / 3;
  let startH = frameHeight;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps0.push(new Segment0(snap));
}


function takeSnap1() {
  let startX = frameWidth / 3;
  let startY = frameStartY;
  let startW = frameWidth / 3;
  let startH = frameHeight;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps1.push(new Segment1(snap));
}


function takeSnap2() {
  let startX = frameWidth - frameWidth / 3;
  let startY = frameStartY;
  let startW = frameWidth / 3;
  let startH = frameHeight;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps2.push(new Segment2(snap));
}


class Segment0 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth / 2;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}


class Segment1 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth / 2 + frameWidth / 3;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}


class Segment2 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth - frameWidth / 3;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}/* ===
Blog Post: https://ellennickles.com/itpblog/2018/9/17/week-2-feature-extraction-photo-booth

Based on these examples:
https://github.com/ml4a/ml4a-demos/tree/master/examples/classification-simple
https://github.com/ml4a/ml4a-demos/tree/master/examples/classification-guitar
https://github.com/ml5js/ml5-examples/blob/master/p5js/FeatureExtractor/FeatureExtractor_Image_Classification/sketch.js
=== */

let featureExtractor;
let classifier;
let video;
let loss;
let facesA_Images = 0;
let facesB_Images = 0;
let facesC_Images = 0;
let numClasses = 3;

let snaps0 = [];
let snaps1 = [];
let snaps2 = [];
let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;
let sourceX;
let sourceY;
let sourceWidth;
let sourceHeight;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', "-1");

  video = createCapture(VIDEO);
  video.parent('videoContainer');
  video.hide();

  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  featureExtractor.numClasses = numClasses;
  classifier = featureExtractor.classification(video, videoReady);
  createButtons();
}


function modelReady() {
  select('#modelStatus').html('Base Model (MobileNet) loaded!');
}


function videoReady() {
  select('#videoStatus').html('Video ready!');
}


function classify() {
  classifier.classify(gotResults);
}


function createButtons() {
  
  // buttonA = createButton("Add Funny Face A");
  buttonA = select('#faceA');
  buttonA.mousePressed(function() {
    console.log(1)
    classifier.addImage('A');
    console.log(2)
    select('#numFacesA').html(facesA_Images++);
    console.log(3)
    console.log("Button A Pressed");
  });

  buttonB = select('#faceB');
  buttonB.mousePressed(function() {
    classifier.addImage('B');
    select('#numFacesB').html(facesB_Images++);
  });

  buttonC = select('#faceC');
  buttonC.mousePressed(function() {
    classifier.addImage('C');
    select('#numFacesC').html(facesC_Images++);
  });


  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Finished Training! Final Loss: ' + loss);
      }
    });
  });

  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);
}


function gotResults(err, result) {
  if (err) {
    console.error(err);
  }
  select('#result').html("I see face " + result);
  // console.log(result);

  if (result == 'A') {
    takeSnap0();
  } else if (result == 'B') {
    takeSnap1();
  } else if (result == 'C') {
    takeSnap2();
  }

  setTimeout(classify, 500);
}


function draw() {
  background(255);

  frameStartX = 0;
  frameStartY = 0;
  frameWidth = windowWidth / 2;
  frameHeight = windowHeight;

  sourceX = video.width / 4;
  sourceY = 0;
  sourceWidth = video.width / 2;
  sourceHeight = video.height;

  image(video, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);

  noFill();
  stroke(2);
  rect(frameStartX, frameStartY, frameWidth, frameHeight);

  stroke(1);
  rect(windowWidth / 2, frameStartY, frameWidth, frameHeight);

  if (snaps0.length > 0) {
    for (let i = 0; i < snaps0.length; i++) {
      snaps0[i].show();
    }
  }

  if (snaps1.length > 0) {
    for (let i = 0; i < snaps1.length; i++) {
      snaps1[i].show();
    }
  }

  if (snaps2.length > 0) {
    for (let i = 0; i < snaps2.length; i++) {
      snaps2[i].show();
    }
  }
}


function takeSnap0() {
  let startX = frameStartX;
  let startY = frameStartY;
  // let startW = frameWidth / 2; // P5 v0.7.1
  let startW = frameWidth / 3;  
  // let startH = frameHeight; // P5 v0.7.1
  let startH = frameHeight * 2;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;
	console.log('here')
  //let snap = createGraphics(targetW, targetH);
  //snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  //snaps0.push(new Segment0(snap));
}


function takeSnap1() {
  let startX = frameWidth / 3;
  let startY = frameStartY;
  // let startW = frameWidth / 2; // P5 v0.7.1
  let startW = frameWidth / 3;
  // let startH = frameHeight; // P5 v0.7.1
  let startH = frameHeight * 2;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps1.push(new Segment1(snap));
}


function takeSnap2() {
  let startX = frameWidth - frameWidth / 3;
  let startY = frameStartY;
  // let startW = frameWidth / 2; // P5 v0.7.1
  let startW = frameWidth / 3;
  // let startH = frameHeight; // P5 v0.7.1
  let startH = frameHeight * 2;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps2.push(new Segment2(snap));
}


class Segment0 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth / 2;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}


class Segment1 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth / 2 + frameWidth / 3;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}


class Segment2 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth - frameWidth / 3;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}// modifying P5 library to earlier version distorts the copies into the portrait

let video;

let snaps0 = [];
let snaps1 = [];
let snaps2 = [];

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let sourceX;
let sourceY;
let sourceWidth;
let sourceHeight;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  video = createCapture(VIDEO);
  video.hide();

  button = createButton('snap0');
  button.position(0, 0);
  button.mouseReleased(takeSnap0);

  button = createButton('snap1');
  button.position(0, 20);
  button.mouseReleased(takeSnap1);

  button = createButton('snap2');
  button.position(0, 40);
  button.mouseReleased(takeSnap2);

  button = createButton('clear');
  button.position(0, 60);
  button.mouseReleased(clearSnaps);

}


function draw() {
  background(255);

  frameStartX = 0;
  frameStartY = 0;
  frameWidth = windowWidth / 2;
  frameHeight = windowHeight;

  sourceX = video.width / 4;
  sourceY = 0;
  sourceWidth = video.width / 2;
  sourceHeight = video.height;

  image(video, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);

  rect(windowWidth / 2, frameStartY, frameWidth, frameHeight);

  if (snaps0.length > 0) {
    for (let i = 0; i < snaps0.length; i++) {
      snaps0[i].show();
    }
  }

  if (snaps1.length > 0) {
    for (let i = 0; i < snaps1.length; i++) {
      snaps1[i].show();
    }
  }

  if (snaps2.length > 0) {
    for (let i = 0; i < snaps2.length; i++) {
      snaps2[i].show();
    }
  }

}


function takeSnap0() {
  let startX = frameStartX;
  let startY = frameStartY;
  let startW = frameWidth / 3;
  let startH = frameHeight;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap0 = createGraphics(targetW, targetH);
  snap0.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps0.push(new Segment0(snap0));
}


function takeSnap1() {
  let startX = frameWidth / 3;
  let startY = frameStartY;
  let startW = frameWidth / 3;
  let startH = frameHeight;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps1.push(new Segment1(snap));
}


function takeSnap2() {
  let startX = frameWidth - frameWidth / 3;
  let startY = frameStartY;
  let startW = frameWidth / 3;
  let startH = frameHeight;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps2.push(new Segment2(snap));
}

function clearSnaps() {
  snaps0.splice([0], snaps0.length);
  snaps1.splice([0], snaps1.length);
  snaps2.splice([0], snaps2.length);
}


class Segment0 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth / 2;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}


class Segment1 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth / 2 + frameWidth / 3;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}


class Segment2 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth - frameWidth / 3;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}let video;

let snaps0 = [];
let snaps1 = [];
let snaps2 = [];

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let sourceX;
let sourceY;
let sourceWidth;
let sourceHeight;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
  
  video = createCapture(VIDEO);
  video.hide();

  button = createButton('snap0');
  button.position(0, 0);
  button.mouseReleased(takeSnap0);

  button = createButton('snap1');
  button.position(0, 20);
  button.mouseReleased(takeSnap1);

  button = createButton('snap2');
  button.position(0, 40);
  button.mouseReleased(takeSnap2);

  button = createButton('clear');
  button.position(0, 60);
  button.mouseReleased(clearSnaps);

}


function draw() {
  background(255);

  frameStartX = 0;
  frameStartY = 0;
  frameWidth = windowWidth / 2;
  frameHeight = windowHeight;

  sourceX = video.width / 4;
  sourceY = 0;
  sourceWidth = video.width / 2;
  sourceHeight = video.height;

  image(video, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);

  rect(windowWidth / 2, frameStartY, frameWidth, frameHeight);

  if (snaps0.length > 0) {
    for (let i = 0; i < snaps0.length; i++) {
      snaps0[i].show();
    }
  }

  if (snaps1.length > 0) {
    for (let i = 0; i < snaps1.length; i++) {
      snaps1[i].show();
    }
  }

  if (snaps2.length > 0) {
    for (let i = 0; i < snaps2.length; i++) {
      snaps2[i].show();
    }
  }

}


function takeSnap0() {
  let startX = frameStartX;
  let startY = frameStartY;
  let startW = frameWidth / 2;
  let startH = frameHeight * 2;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap0 = createGraphics(targetW, targetH);
  snap0.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps0.push(new Segment0(snap0));
}


function takeSnap1() {
  let startX = frameWidth / 3;
  let startY = frameStartY;
  let startW = frameWidth / 2;
  let startH = frameHeight * 2;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps1.push(new Segment1(snap));
}


function takeSnap2() {
  let startX = frameWidth - frameWidth / 3;
  let startY = frameStartY;
  let startW = frameWidth / 2;
  let startH = frameHeight * 2;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps2.push(new Segment2(snap));
}

function clearSnaps() {
  snaps0.splice([0], snaps0.length);
  snaps1.splice([0], snaps1.length);
  snaps2.splice([0], snaps2.length);
}


class Segment0 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth / 2;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}


class Segment1 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth / 2 + frameWidth / 3;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}


class Segment2 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth - frameWidth / 3;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}/* ===
Blog Post: https://ellennickles.com/itpblog/2018/9/17/week-2-feature-extraction-photo-booth

Based on these examples:
https://github.com/ml4a/ml4a-demos/tree/master/examples/classification-simple
https://github.com/ml4a/ml4a-demos/tree/master/examples/classification-guitar
https://github.com/ml5js/ml5-examples/blob/master/p5js/FeatureExtractor/FeatureExtractor_Image_Classification/sketch.js
=== */

let featureExtractor;
let classifier;
let video;
let loss;
let facesA_Images = 0;
let facesB_Images = 0;
let facesC_Images = 0;
let numClasses = 3;

let snaps0 = [];
let snaps1 = [];
let snaps2 = [];
let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;
let sourceX;
let sourceY;
let sourceWidth;
let sourceHeight;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', "-1");

  video = createCapture(VIDEO);
  video.parent('videoContainer');
  video.hide();

  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  featureExtractor.numClasses = numClasses;
  classifier = featureExtractor.classification(video, videoReady);
  createButtons();
}


function modelReady() {
  select('#modelStatus').html('Base Model (MobileNet) loaded!');
}


function videoReady() {
  select('#videoStatus').html('Video ready!');
}


function classify() {
  classifier.classify(gotResults);
}


function createButtons() {
  buttonA = select('#faceA');
  buttonA.mousePressed(function() {
    classifier.addImage('A');
    select('#numFacesA').html(facesA_Images++);
  });

  buttonB = select('#faceB');
  buttonB.mousePressed(function() {
    classifier.addImage('B');
    select('#numFacesB').html(facesB_Images++);
  });

  buttonC = select('#faceC');
  buttonC.mousePressed(function() {
    classifier.addImage('C');
    select('#numFacesC').html(facesC_Images++);
  });


  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Finished Training! Final Loss: ' + loss);
      }
    });
  });

  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);
}


function gotResults(err, result) {
  if (err) {
    console.error(err);
  }
  select('#result').html("I see face " + result);
  // console.log(result);

  if (result == 'A') {
    takeSnap0();
  } else if (result == 'B') {
    takeSnap1();
  } else if (result == 'C') {
    takeSnap2();
  }

  setTimeout(classify, 500);
}


function draw() {
  background(255);

  frameStartX = 0;
  frameStartY = 0;
  frameWidth = windowWidth / 2;
  frameHeight = windowHeight;

  sourceX = video.width / 4;
  sourceY = 0;
  sourceWidth = video.width / 2;
  sourceHeight = video.height;

  image(video, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);

  noFill();
  stroke(2);
  rect(frameStartX, frameStartY, frameWidth, frameHeight);

  stroke(1);
  rect(windowWidth / 2, frameStartY, frameWidth, frameHeight);

  if (snaps0.length > 0) {
    for (let i = 0; i < snaps0.length; i++) {
      snaps0[i].show();
    }
  }

  if (snaps1.length > 0) {
    for (let i = 0; i < snaps1.length; i++) {
      snaps1[i].show();
    }
  }

  if (snaps2.length > 0) {
    for (let i = 0; i < snaps2.length; i++) {
      snaps2[i].show();
    }
  }
}


function takeSnap0() {
  let startX = frameStartX;
  let startY = frameStartY;
  // let startW = frameWidth / 2; // P5 v0.7.1
  let startW = frameWidth / 3;  
  // let startH = frameHeight; // P5 v0.7.1
  let startH = frameHeight * 2;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps0.push(new Segment0(snap));
}


function takeSnap1() {
  let startX = frameWidth / 3;
  let startY = frameStartY;
  // let startW = frameWidth / 2; // P5 v0.7.1
  let startW = frameWidth / 3;
  // let startH = frameHeight; // P5 v0.7.1
  let startH = frameHeight * 2;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps1.push(new Segment1(snap));
}


function takeSnap2() {
  let startX = frameWidth - frameWidth / 3;
  let startY = frameStartY;
  // let startW = frameWidth / 2; // P5 v0.7.1
  let startW = frameWidth / 3;
  // let startH = frameHeight; // P5 v0.7.1
  let startH = frameHeight * 2;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps2.push(new Segment2(snap));
}


class Segment0 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth / 2;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}


class Segment1 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth / 2 + frameWidth / 3;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}


class Segment2 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth - frameWidth / 3;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}/* ===
Based on these examples:
https://github.com/ml4a/ml4a-demos/tree/master/examples/classification-simple
https://github.com/ml4a/ml4a-demos/tree/master/examples/classification-guitar
https://github.com/ml5js/ml5-examples/blob/master/p5js/FeatureExtractor/FeatureExtractor_Image_Classification/sketch.js
=== */

let featureExtractor;
let classifier;
let video;
let loss;
let facesA_Images = 0;
let facesB_Images = 0;
let facesC_Images = 0;
let numClasses = 3;
let snaps = [];
let label = 0;

let currentTime = 0;
let interval = 1500;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', "-1");

  video = createCapture(VIDEO);
  video.parent('videoContainer');
  video.hide();

  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  featureExtractor.numClasses = numClasses;
  classifier = featureExtractor.classification(video, videoReady);
  createButtons();
}


function modelReady() {
  select('#modelStatus').html('Base Model (MobileNet) loaded!');
}


function videoReady() {
  select('#videoStatus').html('Video ready!');
}


function classify() {
  classifier.classify(gotResults);
}


function createButtons() {
  buttonA = select('#faceA');
  buttonA.mousePressed(function() {
    classifier.addImage('A');
    select('#numFacesA').html(facesA_Images++);
  });

  buttonB = select('#faceB');
  buttonB.mousePressed(function() {
    classifier.addImage('B');
    select('#numFacesB').html(facesB_Images++);
  });

  buttonC = select('#faceC');
  buttonC.mousePressed(function() {
    classifier.addImage('C');
    select('#numFacesC').html(facesC_Images++);
  });


  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Finished Training! Final Loss: ' + loss);
      }
    });
  });

  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);

  // Clear Snaps
  // buttonClear = select('#buttonClear');
  // buttonClear.mousePressed(clearSnaps);
}


function gotResults(err, result) {
  if (err) {
    console.error(err);
  }
  select('#result').html("I see face " + result);
  // console.log(result);

  if (result == 'A') {
    takeSnap0();
  } else if (result == 'B') {
    takeSnap1();
  } else if (result == 'C') {
    takeSnap2();
  }

  setTimeout(classify, 1000);

}


function draw() {
  background(255);

  frameStartX = 0;
  frameStartY = 0;
  frameWidth = windowWidth / 2;
  frameHeight = windowHeight;

  sourceX = video.width / 4;
  sourceY = 0;
  sourceWidth = video.width / 2;
  sourceHeight = video.height;


  image(video, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);
  
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);

  rect(windowWidth / 2, frameStartY, frameWidth, frameHeight);

  if (snaps.length > 0) {
    for (let i = 0; i < snaps.length; i++) {
      snaps[i].show();
    }
  }

}


function takeSnap0() {
  let startX = frameWidth * 0.25;
  let startY = frameHeight * 0.3;
  let startW = frameWidth / 2;
  let startH = frameHeight / 4;
  let targetW = frameWidth / 2;
  let targetH = frameHeight / 4;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps.push(new Segment(snap));
}

function takeSnap1() {
  let startX = frameWidth * 0.25;
  let startY = frameHeight * 0.5;
  let startW = frameWidth / 2;
  let startH = frameHeight / 4;
  let targetW = frameWidth / 2;
  let targetH = frameHeight / 4;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps.push(new Segment(snap));
}


function takeSnap2() {
  let startX = frameWidth * 0.25;
  let startY = frameHeight * 0.75;
  let startW = frameWidth / 2;
  let startH = frameHeight / 4;
  let targetW = frameWidth / 2;
  let targetH = frameHeight / 4;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps.push(new Segment(snap));
}

// function clearSnaps() {
//   snaps.splice([0], snaps.length);
// }


class Segment {
  constructor(img) {
    this.img = img;
    this.x = random(windowWidth / 2 - this.img.width);
    this.y = random(windowHeight) - this.img.height;
  }

  show() {
    image(this.img, (windowWidth / 2 + this.x), this.y, this.img.width, this.img.height);
  }
}function theLoop (i) {
  setTimeout(function () {
    alert("Cheese!");
    if (--i) {          // If i > 0, keep going
      theLoop(i);       // Call the loop again, and pass it the current value of i
    }
  }, 1000);
}


function setup() {
  createCanvas(400, 400);
  
  button = createButton("start");
  button.mousePressed(theLoop(10));
}

function draw() {
  background(220);
}// how many classes
let numClasses = 3;

let featureExtractor;
let classifier;
let video;
let loss;
let numImages;
let label;
let buttons;
let counter = 0;
let numClassifications = 10;

function setup() {
  noCanvas();

  label = 0;
  numImages = Array(numClasses).fill(0);

  video = createCapture(VIDEO);
  video.parent('videoContainer');

  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  featureExtractor.numClasses = numClasses;
  classifier = featureExtractor.classification(video);

  createButtons();
}

function modelReady() {
  select('#loading').html('Base Model (MobileNet) loaded!');
}

function addImage(label) {
  classifier.addImage(label);
}

function classify() {
  console.log("CLASSIFY!")
  classifier.classify(gotResults);
}


function createButtons() {
  buttons = [];
  for (var i = 0; i < numClasses; i++) {
    var button = createButton('class ' + i);
    button.parent('buttons');
    button.id('class' + i);
    buttons.push(button);
    ! function outer(i) {
      button.mousePressed(function() {
        addImage(i);
        numImages[i]++;
        select('#class' + i).html('class ' + i + ': ' + numImages[i]);
      });
    }(i)
  }

  // Train Button
  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Done Training! Final Loss: ' + loss);
      }
    });
  });

  // Predict Button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
  }
  console.log(results);
  select('#result').html(results);
  // label = nextLabel;

  // classify();
  if (counter < numClassifications) {
    setTimeout(classify, 1000);
    counter++;
  }
}// how many classes
let numClasses = 3;

let featureExtractor;
let classifier;
let video;
let loss;
let numImages;
let label;
let buttons;

function setup() {
  noCanvas();

  label = 0;
  numImages = Array(numClasses).fill(0);

  video = createCapture(VIDEO);
  video.parent('videoContainer');
  
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  featureExtractor.numClasses = numClasses;
  classifier = featureExtractor.classification(video);
  
  createButtons();
}

function modelReady() {
  select('#loading').html('Base Model (MobileNet) loaded!');
}

function addImage(label) {
  classifier.addImage(label);
}

function classify() {
  console.log("CLASSIFY!")
  classifier.classify(gotResults);
}

function createButtons() {
  buttons = [];
  for (var i=0; i<numClasses; i++) {
    var button = createButton('class '+i);
    button.parent('buttons');
    button.id('class'+i);
    buttons.push(button);
    !function outer(i){
      button.mousePressed(function() {
        addImage(i);
        numImages[i]++;
        select('#class'+i).html('class '+i+': '+numImages[i]);
      });
    }(i)
  }

  // Train Button
  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Done Training! Final Loss: ' + loss);
      }
    });
  });

  // Predict Button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);
}

function gotResults(err, nextLabel) {
  if (err) {
    console.error(err);
  }
  select('#result').html(nextLabel);
  label = nextLabel;
}
// modifying P5 library to earlier version distorts the copies into the portrait

let video;

let snaps0 = [];
let snaps1 = [];
let snaps2 = [];

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let sourceX;
let sourceY;
let sourceWidth;
let sourceHeight;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  video = createCapture(VIDEO);
  video.hide();

  button = createButton('snap0');
  button.position(0, 0);
  button.mouseReleased(takeSnap0);

  button = createButton('snap1');
  button.position(0, 20);
  button.mouseReleased(takeSnap1);

  button = createButton('snap2');
  button.position(0, 40);
  button.mouseReleased(takeSnap2);

  button = createButton('clear');
  button.position(0, 60);
  button.mouseReleased(clearSnaps);

}


function draw() {
  background(255);

  frameStartX = 0;
  frameStartY = 0;
  frameWidth = windowWidth / 2;
  frameHeight = windowHeight;

  sourceX = video.width / 4;
  sourceY = 0;
  sourceWidth = video.width / 2;
  sourceHeight = video.height;

  image(video, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);

  rect(windowWidth / 2, frameStartY, frameWidth, frameHeight);

  if (snaps0.length > 0) {
    for (let i = 0; i < snaps0.length; i++) {
      snaps0[i].show();
    }
  }

  if (snaps1.length > 0) {
    for (let i = 0; i < snaps1.length; i++) {
      snaps1[i].show();
    }
  }

  if (snaps2.length > 0) {
    for (let i = 0; i < snaps2.length; i++) {
      snaps2[i].show();
    }
  }

}


function takeSnap0() {
  let startX = frameStartX;
  let startY = frameStartY;
  let startW = frameWidth / 3;
  let startH = frameHeight;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap0 = createGraphics(targetW, targetH);
  snap0.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps0.push(new Segment0(snap0));
}


function takeSnap1() {
  let startX = frameWidth / 3;
  let startY = frameStartY;
  let startW = frameWidth / 3;
  let startH = frameHeight;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps1.push(new Segment1(snap));
}


function takeSnap2() {
  let startX = frameWidth - frameWidth / 3;
  let startY = frameStartY;
  let startW = frameWidth / 3;
  let startH = frameHeight;
  let targetW = frameWidth / 3;
  let targetH = frameHeight;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps2.push(new Segment2(snap));
}

function clearSnaps() {
  snaps0.splice([0], snaps0.length);
  snaps1.splice([0], snaps1.length);
  snaps2.splice([0], snaps2.length);
}


class Segment0 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth / 2;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}


class Segment1 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth / 2 + frameWidth / 3;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}


class Segment2 {
  constructor(img) {
    this.img = img;
    this.x = windowWidth - frameWidth / 3;
    this.y = frameStartY;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}

/* ===
Based on this ml5 Example:
Image Classification using Feature Extraction with MobileNet 
Built with p5.js
This example uses a callback pattern to create the classifier
=== */

let featureExtractor;
let classifier;
let video;
let loss;
let facesA_Images = 0;
let facesB_Images = 0;
let facesC_Images = 0;
let numClasses = 3;
let snaps = [];
let label = 0;

let currentTime = 0;
let interval = 1500;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', "-1");

  video = createCapture(VIDEO); // Create a video element
  video.parent('videoContainer'); // Append it to the videoContainer DOM element
  video.hide();

  featureExtractor = ml5.featureExtractor('MobileNet', modelReady); // Extract the already learned features from MobileNet
  featureExtractor.numClasses = numClasses;
  classifier = featureExtractor.classification(video, videoReady); // Create a new classifier using those features and give the video we want to use
  createButtons(); // Set up the UI buttons
}

// A function to be called when the model has been loaded
function modelReady() {
  select('#modelStatus').html('Base Model (MobileNet) loaded!');
}

// A function to be called when the video has loaded
function videoReady() {
  select('#videoStatus').html('Video ready!');
}

// Classify the current frame
function classify() {
    classifier.classify(gotResults);
}

// A util function to create UI buttons
function createButtons() {
  buttonA = select('#faceA');
  buttonA.mousePressed(function() {
    classifier.addImage('A');
    select('#numFacesA').html(facesA_Images++);
  });

  buttonB = select('#faceB');
  buttonB.mousePressed(function() {
    classifier.addImage('B');
    select('#numFacesB').html(facesB_Images++);
  });

  buttonC = select('#faceC');
  buttonC.mousePressed(function() {
    classifier.addImage('C');
    select('#numFacesC').html(facesC_Images++);
  });


  // Train Button
  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Finished Training! Final Loss: ' + loss);
      }
    });
  });

  // Predict Button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);

  // Clear Snaps
  buttonClear = select('#buttonClear');
  buttonClear.mousePressed(clearSnaps);
}

// Show the results
function gotResults(err, result) {
  // Display any error
  if (err) {
    console.error(err);
  }
  select('#result').html(result);
  // console.log(result);

  if (result == 'A') {
    takeSnap0();
  } else if (result == 'B') {
    takeSnap1();
  } else if (result == 'C') {
    takeSnap2();
  }

  setTimeout(classify, 1000);

}


function draw() {
  background(255);

  frameStartX = 0;
  frameStartY = 0;
  frameWidth = windowWidth / 2;
  frameHeight = windowHeight;

  sourceX = video.width / 4;
  sourceY = 0;
  sourceWidth = video.width / 2;
  sourceHeight = video.height;

  image(video, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);

  // fill(255);
  // rect(windowWidth / 2, frameStartY, frameWidth, frameHeight);

  if (snaps.length > 0) {
    for (let i = 0; i < snaps.length; i++) {
      snaps[i].show();
    }
  }

}


function takeSnap0() {
  let startX = frameWidth * 0.25;
  let startY = frameHeight * 0.3;
  let startW = frameWidth / 2;
  let startH = frameHeight / 4;
  let targetW = frameWidth / 2;
  let targetH = frameHeight / 4;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps.push(new Segment(snap));
}

function takeSnap1() {
  let startX = frameWidth * 0.25;
  let startY = frameHeight * 0.5;
  let startW = frameWidth / 2;
  let startH = frameHeight / 4;
  let targetW = frameWidth / 2;
  let targetH = frameHeight / 4;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps.push(new Segment(snap));
}


function takeSnap2() {
  let startX = frameWidth * 0.25;
  let startY = frameHeight * 0.75;
  let startW = frameWidth / 2;
  let startH = frameHeight / 4;
  let targetW = frameWidth / 2;
  let targetH = frameHeight / 4;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps.push(new Segment(snap));
}

function clearSnaps() {
  snaps.splice([0], snaps.length);
}


class Segment {
  constructor(img) {
    this.img = img;
    this.x = random(windowWidth / 2 - this.img.width);
    this.y = random(windowHeight) - this.img.height;
  }

  show() {
    image(this.img, (windowWidth / 2 + this.x), this.y, this.img.width, this.img.height);
  }
}/* ===
Based on this ml5 Example:
Image Classification using Feature Extraction with MobileNet 
Built with p5.js
This example uses a callback pattern to create the classifier
=== */

let featureExtractor;
let classifier;
let video;
let loss;
// let facesA_Images = 0;
// let facesB_Images = 0;
// let facesC_Images = 0;
let numClasses = 3;
let buttons;
let numImages;

function setup() {
  createCanvas(400, 400);

  video = createCapture(VIDEO); // Create a video element
  video.parent('videoContainer'); // Append it to the videoContainer DOM element
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady); // Extract the already learned features from MobileNet
  featureExtractor.numClasses = numClasses;
  classifier = featureExtractor.classification(video, videoReady); // Create a new classifier using those features and give the video we want to use
  createButtons(); // Set up the UI buttons

  numImages = Array(numClasses).fill(0);
}

// A function to be called when the model has been loaded
function modelReady() {
  select('#modelStatus').html('Base Model (MobileNet) loaded!');
}

// A function to be called when the video has loaded
function videoReady() {
  select('#videoStatus').html('Video ready!');
}


function addImage(label) {
  classifier.addImage(label);
}

// Classify the current frame.
function classify() {
  classifier.classify(gotResults);
}



// A util function to create UI buttons
function createButtons() {

  //   buttonA = select('#faceA');
  //   buttonA.mousePressed(function() {
  //     classifier.addImage('Face A');
  //     select('#numFacesA').html(facesA_Images++);
  //   });

  //   buttonB = select('#faceB');
  //   buttonB.mousePressed(function() {
  //     classifier.addImage('Face B');
  //     select('#numFacesB').html(facesB_Images++);
  //   });

  //   buttonC = select('#faceC');
  //   buttonC.mousePressed(function() {
  //     classifier.addImage('Face C');
  //     select('#numFacesC').html(facesC_Images++);
  //   });

  buttons = [];
  for (var i = 0; i < numClasses; i++) {
    var button = createButton('class ' + i);
    button.parent('buttons');
    button.id('class' + i);
    buttons.push(button);
    ! function outer(i) {
      button.mousePressed(function() {
        addImage(i);
        numImages[i]++;
        select('#class' + i).html('class ' + i + ': ' + numImages[i]);
      });
    }(i)
  }



  // Train Button
  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Finished Training! Final Loss: ' + loss);
      }
    });
  });

  // Predict Button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);
}

// Show the results
function gotResults(err, result) {
  // Display any error
  if (err) {
    console.error(err);
  }
  select('#result').html(result);
  classify();
  console.log(result);

  // if (result == 'Face A') {
  //   drawRect(100);
  // } else if (result == 'Face B') {
  //   drawRect(175);
  // } else if (result == 'Face C') {
  //   drawRect(255);
  // }

}


function draw() {
  background(0);
}


// function drawRect(num) {
//   fill(0, 0, num);
//   rect(0, 0, 200, 200);
// }/* ===
Based on this ml5 Example:
Image Classification using Feature Extraction with MobileNet 
Built with p5.js
This example uses a callback pattern to create the classifier
=== */

let featureExtractor;
let classifier;
let video;
let loss;
let facesA_Images = 0;
let facesB_Images = 0;
let facesC_Images = 0;
let numClasses = 3;

function setup() {
  createCanvas(400, 400);

  video = createCapture(VIDEO); // Create a video element
  video.parent('videoContainer'); // Append it to the videoContainer DOM element
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady); // Extract the already learned features from MobileNet
  featureExtractor.numClasses = numClasses;
  classifier = featureExtractor.classification(video, videoReady); // Create a new classifier using those features and give the video we want to use
  createButtons(); // Set up the UI buttons
}

// A function to be called when the model has been loaded
function modelReady() {
  select('#modelStatus').html('Base Model (MobileNet) loaded!');
}

// A function to be called when the video has loaded
function videoReady() {
  select('#videoStatus').html('Video ready!');
}


// Classify the current frame.
function classify() {
  classifier.classify(gotResults);
}

// A util function to create UI buttons
function createButtons() {

  buttonA = select('#faceA');
  buttonA.mousePressed(function() {
    classifier.addImage('A');
    select('#numFacesA').html(facesA_Images++);
  });

  buttonB = select('#faceB');
  buttonB.mousePressed(function() {
    classifier.addImage('B');
    select('#numFacesB').html(facesB_Images++);
  });

  buttonC = select('#faceC');
  buttonC.mousePressed(function() {
    classifier.addImage('C');
    select('#numFacesC').html(facesC_Images++);
  });


  // Train Button
  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Finished Training! Final Loss: ' + loss);
      }
    });
  });

  // Predict Button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);

  // buttonNew = select('#buttonNew');
  // buttonNew.mousePressed(clearAll);
}


// need a way to zero out the classifier
// function clearAll() {
//   facesA_Images = 0;
//   facesB_Images = 0;
//   facesC_Images = 0;
//   select('#numFacesA').html('');
//   select('#numFacesB').html('');
//   select('#numFacesC').html('');
//   select('#loss').html('');
// }

// Show the results
function gotResults(err, result) {
  // Display any error
  if (err) {
    console.error(err);
  }
  select('#result').html(result);
  classify();
  console.log(result);

  if (result == 'A') {
    drawRect(100);
  } else if (result == 'B') {
    drawRect(175);
  } else if (result == 'C') {
    drawRect(255);
  }
}


function draw() {
  background(0);
}


function drawRect(num) {
  fill(0, 0, num);
  rect(0, 0, 200, 200);
}// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image Classification using Feature Extraction with MobileNet. Built with p5.js
This example uses a callback pattern to create the classifier
=== */

let featureExtractor;
let classifier;
let video;
let loss;
let dogImages = 0;
let catImages = 0;

function setup() {
  noCanvas();
  // Create a video element
  video = createCapture(VIDEO);
  // Append it to the videoContainer DOM element
  video.parent('videoContainer');
  // Extract the already learned features from MobileNet
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  // Create a new classifier using those features and give the video we want to use
  classifier = featureExtractor.classification(video, videoReady);
  // Set up the UI buttons
  setupButtons();
}

// A function to be called when the model has been loaded
function modelReady() {
  select('#modelStatus').html('Base Model (MobileNet) loaded!');
}

// A function to be called when the video has loaded
function videoReady () {
  select('#videoStatus').html('Video ready!');
}


// Classify the current frame.
function classify() {
  classifier.classify(gotResults);
}

// A util function to create UI buttons
function setupButtons() {
  // When the Cat button is pressed, add the current frame
  // from the video with a label of "cat" to the classifier
  buttonA = select('#catButton');
  buttonA.mousePressed(function() {
    classifier.addImage('cat');
    select('#amountOfCatImages').html(catImages++);
  });

  // When the Dog button is pressed, add the current frame
  // from the video with a label of "dog" to the classifier
  buttonB = select('#dogButton');
  buttonB.mousePressed(function() {
    classifier.addImage('dog');
    select('#amountOfDogImages').html(dogImages++);
  });

  // Train Button
  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Done Training! Final Loss: ' + loss);
      }
    });
  });

  // Predict Button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);
}

// Show the results
function gotResults(err, result) {
  // Display any error
  if (err) {
    console.error(err);
  }
  select('#result').html(result);
  classify();
}// how many classes
let numClasses = 6;

let featureExtractor;
let classifier;
let video;
let loss;
// let img;
let numImages;
// let samples;
let label;
let buttons;

function setup() {
  createCanvas(500, 500);

  img = loadImage("./assets/guitar.png");

  // samples = [];
  // samples[0] = loadSound('./assets/C.mp3')
  // samples[1] = loadSound('./assets/F.mp3')
  // samples[2] = loadSound('./assets/G.mp3')
  // samples[3] = loadSound('./assets/Am.mp3')
  // samples[4] = loadSound('./assets/Dm.mp3')
  // samples[5] = loadSound('./assets/Em.mp3')

  label = 0;

  numImages = Array(numClasses).fill(0);

  video = createCapture(VIDEO);
  video.parent('videoContainer');
  
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  featureExtractor.numClasses = numClasses;
  classifier = featureExtractor.classification(video);
  
  createButtons();

}

function modelReady() {
  select('#loading').html('Base Model (MobileNet) loaded!');
}

function addImage(label) {
  classifier.addImage(label);
}

function classify() {
  classifier.classify(gotResults);
}

function createButtons() {
  buttons = [];
  for (var i=0; i<numClasses; i++) {
    var button = createButton('class '+i);
    button.parent('buttons');
    button.id('class'+i);
    buttons.push(button);
    !function outer(i){
      button.mousePressed(function() {
        addImage(i);
        numImages[i]++;
        select('#class'+i).html('class '+i+': '+numImages[i]);
      });
    }(i)
  }

  // Train Button
  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Done Training! Final Loss: ' + loss);
      }
    });
  });

  // Predict Button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);
}

function gotResults(err, nextLabel) {
  if (err) {
    console.error(err);
  }
  select('#result').html(nextLabel);
  if (label != nextLabel) {
    label = nextLabel;
    // samples[int(label)].play(); 
    console.log(label);
  }
  classify();
}

// function draw() {
//   background(0);
//   // image(img, 50, 50);
// }let img;
let snap;

function setup() {
  createCanvas(400, 400, WEBGL);

	img = loadImage("beach.jpg");
}

function draw() {
  background(220);

  // image(img, 0, 0, 400, 400);
  
  snap = createGraphics(100, 100);
  snap.copy(img, 300, 300, 50, 50, 0, 0, 100, 100);
  
  
  noStroke();
  texture(snap);
  push();
  translate(-100,-100,0);
  quad(58, 51, 106, 40, 89, 83, 50, 96);
  pop();
}let video;
// let snap;
let snaps = [];

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let sourceX;
let sourceY;
let sourceWidth;
let sourceHeight;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  video = createCapture(VIDEO);
  video.hide();
  console.log(video.height);
  
  button = createButton('snap0');
  button.position(0, 0);
  button.mouseReleased(takeSnap0);

  button = createButton('snap1');
  button.position(0, 20);
  button.mouseReleased(takeSnap1);

  button = createButton('snap2');
  button.position(0, 40);
  button.mouseReleased(takeSnap2);

  button = createButton('clear');
  button.position(0, 60);
  button.mouseReleased(clearSnaps);

}


function draw() {
  background(200);

  frameStartX = 0;
  frameStartY = 0;
  frameWidth = windowWidth / 2;
  frameHeight = windowHeight;

  sourceX = video.width / 4;
  sourceY = 0;
  sourceWidth = video.width / 2;
  sourceHeight = video.height;

  image(video, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);

  fill(255);
  rect(windowWidth / 2, frameStartY, frameWidth, frameHeight);




  if (snaps.length > 0) {
    for (let i = 0; i < snaps.length; i++) {
      snaps[i].show();
    }
  }
}


function takeSnap0() {
  let startX = frameWidth * 0.25;
  let startY = frameHeight * 0.3;
  let startW = frameWidth / 2;
  let startH = frameHeight / 4;
  let targetW = frameWidth / 2;
  let targetH = frameHeight / 4;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps.push(new Segment(snap));
}

function takeSnap1() {
  let startX = frameWidth * 0.25;
  let startY = frameHeight * 0.5;
  let startW = frameWidth / 2;
  let startH = frameHeight / 4;
  let targetW = frameWidth / 2;
  let targetH = frameHeight / 4;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps.push(new Segment(snap));
}


function takeSnap2() {
  let startX = frameWidth * 0.25;
  let startY = frameHeight * 0.75;
  let startW = frameWidth / 2;
  let startH = frameHeight / 4;
  let targetW = frameWidth / 2;
  let targetH = frameHeight / 4;

  let snap = createGraphics(targetW, targetH);
  snap.copy(canvas, startX, startY, startW, startH, 0, 0, targetW, targetH);
  snaps.push(new Segment(snap));
}

function clearSnaps() {
  snaps.splice([0], snaps.length);
}


class Segment {
  constructor(img) {
    this.img = img;
    this.x = random(windowWidth / 2 - this.img.width);
    this.y = random(height) - this.img.height;
  }

  show() {
    image(this.img, (windowWidth / 2 + this.x), this.y, this.img.width, this.img.height);
  }
}let video;
let snap;
let snaps = [];

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let sourceX;
let sourceY;
let sourceWidth;
let sourceHeight;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  video = createCapture(VIDEO);
  video.hide();
  console.log(video.width);

  button = createButton('snap');
  button.position(0, 0);
  button.mouseReleased(takeSnap);

  button = createButton('clear');
  button.position(0, 20);
  button.mouseReleased(clearSnaps);

}


function draw() {
  background(200);


  push();
  translate(width, 0);
  scale(-1, 1);

  // live video
  frameStartX = windowWidth / 2;
  frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  frameWidth = windowWidth / 3;
  frameHeight = 4 * windowWidth / 9;

  sourceX = video.width / 3;
  sourceY = (video.height - 4 * camera.width / 9) / 2;
  sourceWidth = video.width / 3;
  sourceHeight = 4 * video.width / 9;

  // image(video, windowWidth-video.width, 0, 640, 480);
  image(video, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);

  stroke(1);
  noFill();
  // frame around live video
  rect(frameStartX, frameStartY, frameWidth, frameHeight);

  
  // empty frame
  rect((frameStartX / 3), frameStartY, frameWidth, frameHeight);

  rect(frameStartX + 100, frameStartY + 100, frameWidth/2, frameHeight/2);
  

  pop();




  if (snaps.length > 0) {
    for (let i = 0; i < snaps.length; i++) {
      snaps[i].show();
      snaps[i].move();
      // console.log(snaps.length);
    }
  }
}


function takeSnap() {
  push();
  translate(width, 0);
  scale(-1, 1);
  snap = createGraphics(160, 120);
  snap.copy(canvas, frameStartX + 100, frameStartY + 100, frameWidth/2, frameHeight/2, 0, 0, 200, 400);
  snaps.push(new Segment(snap));
  pop();
}


function clearSnaps() {
  snaps.splice([0], snaps.length);
}


class Segment {
  constructor(img) {
    this.img = img;
    this.x = random(width) - this.img.width;
    this.y = random(height) - this.img.height;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }

  move() {
    if (this.y < (height - this.img.height)) {
      this.y += 0.1;
    }
  }

}function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


function setup() { 
  createCanvas(windowWidth, windowHeight);
} 


function draw() { 
  background(255,0,255);
  noStroke();
  ellipse(width/2 , height/2 ,100,100);
}

let capture;
let snap;
let snaps = [];


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  capture = createCapture(VIDEO);
  capture.hide();
  console.log(capture.width);

  button = createButton('snap');
  button.position(0, 0);
  button.mouseReleased(takeSnap);

  button = createButton('clear');
  button.position(0, 20);
  button.mouseReleased(clearSnaps);

}


function draw() {
  background(200);

  push();
  translate(width, 0);
  scale(-1, 1);
  image(capture, windowWidth-capture.width, 0, 640, 480);
  pop();

  if (snaps.length > 0) {
    for (let i = 0; i < snaps.length; i++) {
      snaps[i].show();
      snaps[i].move();
      // console.log(snaps.length);
    }
  }
}


function takeSnap() {
  push();
  snap = createGraphics(160, 120);
  snap.copy(canvas, 0, 0, width, height, 0, 0, 200, 400);
  snaps.push(new Segment(snap));
  pop();
}


function clearSnaps() {
  snaps.splice([0], snaps.length);
}


class Segment {
  constructor(img) {
    this.img = img;
    this.x = random(width) - this.img.width;
    this.y = random(height) - this.img.height;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }

  move() {
    if (this.y < (height - this.img.height)) {
      this.y += 0.1;
    }
  }

}// ICM practice quiz: https://itpnyu.github.io/ICM-Quizzes/week7-dom/

var paragraphs = [];

function setup() {  
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 4; j++) {
      var par = createP('😂');
      par.position(10 + i*40, 10 + j*40);
      paragraphs.push(par);
    }
  }
  
  for (var n = 0; n < paragraphs.length; n++) {
    paragraphs[n].mouseOver(highlight);
    paragraphs[n].mouseOut(unhighlight);
  }
}

function highlight() {
  this.style('font-size', '18pt');
  this.style('background-color', 'lightblue');
}

function unhighlight() {
  this.style('font-size', '12pt');
  this.style('background-color', 'white');
}// ICM practice quiz: https://itpnyu.github.io/ICM-Quizzes/week7-dom/

// check index.html for rest of code

var itemInput;
var button;

function setup() {
  noCanvas();
  itemInput = createInput('Type a todo item here');
  button = createButton('Add one todo');
  button.mousePressed(addItem);
}

function addItem() {
  var li = createElement('li', itemInput.value());
  li.parent("todolist");
}// ICM practice quiz: https://itpnyu.github.io/ICM-Quizzes/week7-dom/

// check index.html for paragraph with id = apple

var apple;
var x = 0;

function setup() {
  noCanvas();
  apple = select("#apple");
}

function draw() {
  apple.position(x, 80);
  updateX();
}

function updateX() {
  x++;
  if (x > 150) {
    x = 0;
  }
}// ICM practice quiz: https://itpnyu.github.io/ICM-Quizzes/week7-dom/

var nameP;

function setup() {
  noCanvas();
  
  nameP = createP('Move your mouse here');
  nameP.mouseOver(overpara);
  nameP.mouseOut(outpara);
}

function overpara() {
  nameP.html('your mouse is over me');
}

function outpara() {
  nameP.html('your mouse is out');
}// ICM practice quiz: https://itpnyu.github.io/ICM-Quizzes/week7-dom/

var nameInput;
var nameP;

function setup() {
  noCanvas();
  
  // Create a p element
  nameP = createP('Your name!');
  
  // Create an input element
  nameInput = createInput('type your name');

  // Attach a callback function called updateText to the input's input event
  nameInput.input(updateText);
}

function updateText() {
  // change p element's html content
  nameP.html(nameInput.value());
}// ICM practice quiz: https://itpnyu.github.io/ICM-Quizzes/week7-dom/

// original code from source also not working!

var bgcolor;
var button;

function setup() {
  canvas = createCanvas(200, 200);
  bgcolor = color(200);
  
  // Create a button element
  button = createButton("change color");
  // Attach a callback function called changeColor to the button's mousePressed event
  button.mousePressed(changeColor);
}

// Callback function for the button's mousePressed event
function changeColor() {
  bgcolor = color(random(150, 255), random(150, 255), random(150, 255));
}

function draw() {
  background(bgcolor);
}// ICM practice quiz: https://itpnyu.github.io/ICM-Quizzes/week7-dom/

var slider;
var d;

function setup() {
  canvas = createCanvas(200, 200);
  bgcolor = color(200);
  
  // Create a slider element
  slider = createSlider(0, 190, d);
  slider.position(0, 220);
}

function draw() {
  background(200);
  noStroke(); 
  fill(255, 50, 150);

  // Draw an ellipse according to the slider's value
  d = slider.value();
  ellipse(100, 100, d, d);
}// trying to redo midterm and write text over images

// 8.3: Manipulating DOM Elements with html() and position() - p5.js Tutorial
// https://www.youtube.com/watch?v=YfaJ20vXcK8

// https://p5js.org/reference/#/p5.Element/style

// Combining Wordnik & Pixabay queries
// Hit the PLAY button to clear the page and restart the sketch

let w_url1 = "https://api.wordnik.com/v4/word.json/";
let w_url2 = "/definitions?limit=4&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false";
let w_apikey = "&api_key=f6c7d6bc71e905476a0020c6bec02769426fde0eb7cf6d8d0"; // my personal key

let p_url1 = "https://pixabay.com/";
let p_apikey = "api/?key=2988351-464bf892e4c899da187da08ea&q=" // appended &q= for start of keyword query
let p_url2 = "&image_type=photo";
let p_limit = 4; // number of images to return

let myString;
let img;

function setup() {
  noCanvas();
  // canvas = createCanvas(400,400);

  let button = select('#submit');
  button.mousePressed(submitWord);

  input = select('#word'); // select the user input
}


function gotData(data) {
  // create a paragraph with definitions for the word based on limite above
  // for (i = 0; i < data.length; i++) {
  //   createP(data[i].text);
  // }
  myString = createDiv(data[0].text);
  myString.position(10, 50);
  myString.style('color', '#ffffff');
  myString.style('width', '380px');
  myString.style('height', '380px');

  myString = createDiv(data[1].text);
  myString.position(410, 50);
  myString.style('color', '#ffffff');
  myString.style('width', '380px');
  myString.style('height', '380px');

  myString = createDiv(data[2].text);
  myString.position(10, 450);
  myString.style('color', '#ffffff');
  myString.style('width', '380px');
  myString.style('height', '380px');

  myString = createDiv(data[3].text);
  myString.position(410, 450);
  myString.style('color', '#ffffff');
  myString.style('width', '380px');
  myString.style('height', '380px');

}


function gotInfo(info) {
  // for (let i = 0; i < p_limit; i++) {
  //   img = createImg(info.hits[i].webformatURL);
  //   img.size(250, 250);
  // }

  img = createImg(info.hits[0].webformatURL);
  img.size(400, 400);
  img.position(0, 40);

  img = createImg(info.hits[1].webformatURL);
  img.size(400, 400);
  img.position(400, 40);

  img = createImg(info.hits[2].webformatURL);
  img.size(400, 400);
  img.position(0, 440);

  img = createImg(info.hits[3].webformatURL);
  img.size(400, 400);
  img.position(400, 440);
}


function submitWord() {
  let w_fullUrl = w_url1 + input.value() + w_url2 + w_apikey;
  loadJSON(w_fullUrl, gotData); // query Wordnik API with user input word

  let p_fullUrl = p_url1 + p_apikey + input.value() + p_url2;
  info = loadJSON(p_fullUrl, gotInfo); // query Pixabay API with user input word
}


// function draw() {
//   // createCanvas(400,400);
//   background(220);
// }// Combining Wordnik & Pixabay queries
// Hit the PLAY button to clear the page and restart the sketch

let w_url1 = "https://api.wordnik.com/v4/word.json/";
let w_url2 = "/definitions?limit=8&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false";
let w_apikey = "&api_key=f6c7d6bc71e905476a0020c6bec02769426fde0eb7cf6d8d0"; // my personal key

let p_url1 = "https://pixabay.com/";
let p_apikey = "api/?key=2988351-464bf892e4c899da187da08ea&q=" // appended &q= for start of keyword query
let p_url2 = "&image_type=photo";
let p_limit = 8; // number of images to return

function setup() {
  noCanvas();

  let button = select('#submit');
  button.mousePressed(submitWord);

  input = select('#word'); // select the user input
}


function gotData(data) {
  // create a paragraph with eight definitions for the word
  for (i = 0; i < data.length; i++) {
    createP(data[i].text);
  }
}


function gotInfo(info) {
  for (let i = 0; i < p_limit; i++) {
    let img = createImg(info.hits[i].webformatURL);
    img.size(250, 250);
  }
}


function submitWord() {
  let w_fullUrl = w_url1 + input.value() + w_url2 + w_apikey;
  loadJSON(w_fullUrl, gotData); // query Wordnik API with user input word

  let p_fullUrl = p_url1 + p_apikey + input.value() + p_url2;
  info = loadJSON(p_fullUrl, gotInfo); // query Pixabay API with user input word
}


// function draw() {
//   //background(220);
// }// video 10.6 to set up user input
// got this to work except that I must restart the sketch to clear out the previous word
// how do I do this with code?

let url1 = "https://api.wordnik.com/v4/word.json/";
// let word = "yellow";
let url2 = "/definitions?limit=10&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false";
let apikey = "&api_key=f6c7d6bc71e905476a0020c6bec02769426fde0eb7cf6d8d0"; // update with my personal key when it arrives


function setup() {
  //createCanvas(400, 400);
  noCanvas();

  let button = select('#submit');
  button.mousePressed(submitWord);

  input = select('#word'); // select the user input
}

function gotData(data) {
  // create a paragraph with ten definitions for the word
  for (i = 0; i < data.length; i++) {
    createP(data[i].text);
  }
}

function submitWord() {
  let fullUrl = url1 + input.value() + url2 + apikey;
  loadJSON(fullUrl, gotData); // query Wordnik API with user input word
}


// function draw() {
//   //background(220);
// }// this sketch does not work if the DOM library is listed in the index.html file...hmmm?


let data;
// let definition;

let url1 = "https://api.wordnik.com/v4/word.json/";
let query = "yellow";
let url2 = "/definitions?limit=10&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false";
let apikey = "&api_key=f6c7d6bc71e905476a0020c6bec02769426fde0eb7cf6d8d0"; 
let request = url1 + query + url2 + apikey;

// function preload() {
//   data = loadJSON(request, gotData);
// }

function setup() {
  //createCanvas(400, 400);
  noCanvas();
  loadJSON(request, gotData);
}


function gotData(data) {
  //print(data); // print all data for this specific request - works! 
  //print(data[0].text); // print the first definition in the array - works!

  // for (i = 0; i < data.length; i++) {
  //   print(data[i].text);
  // }

  // let definition = data[0].text; // print one definition to screen
  // createP(definition);

  for (i = 0; i < data.length; i++) {
    createP(data[i].text);
  }

}

function draw() {
  //background(220);
}// wordnik developer tools: https://developer.wordnik.com/docs
// specific tool for this example: https://developer.wordnik.com/docs#!/word/getDefinitions

// use api
let url1 = "https://api.wordnik.com/v4/word.json/";
let word = "red";
let url2 = "/definitions?limit=10";
let apikey = "&api_key=f6c7d6bc71e905476a0020c6bec02769426fde0eb7cf6d8d0"; // update with personal key
let request = url1 + word + url2 + apikey; // combine all the strings above


function setup() { 
  createCanvas(400, 400);
  loadJSON(request, gotData);
} 


function gotData(data){
  print(data);
}

function draw() { 
  background(220);
}
// https://itp.nyu.edu/classes/cc-f18/data/

var kingLear;
var counter = 0;
var words = [];
var delimiters = " ,./()!;:?-_+=[]";
var wordCounter = 0;
var search = "king";


function preload() {
  //load our text into a variable
  
  // kingLear = loadStrings('kinglear.txt');
  kingLear = loadStrings("https://raw.githubusercontent.com/cs109/2015/master/Lectures/Lecture15b/sparklect/shakes/kinglear.txt");
}

function setup() {
  createCanvas(800, 600);
// use joing to merge all the text into one giant string
  var everything = join(kingLear).toLowerCase();

// then take that super long string and divide it into words separated by our delimiters
  words = splitTokens(everything, delimiters);

// use a new js function to time our animation
  setInterval(updateCounter, 100);

// search through the entire corpus for instances of the same word and count them
  for (var i = 0; i < words.length; i++) {
    if (words[i] == search) {
      wordCounter++;
    }
  }
}

function draw() {
  background(0);
  fill(255);
  // animate the corpus text
  for (var i = 0; i < height / 20; i++) {
    text(words[counter + i], 10, i * 20);
  }
  // show how many time our searched word shows up
  text("the word " +search +" appears " + wordCounter+ " times",width/2,height-10);
}

//function to update the counter
function updateCounter() {
  counter++;
}// rotate through items in an array using modulo

var words = ["ಥ_ಥ", "(ง'̀-'́)ง", "(°ロ°)☝", "(｡◕‿‿◕｡)", "( ͡° ͜ʖ ͡°)", "(ᵔᴥᵔ)", "༼ つ ◕_◕ ༽つ"];

var index = 0;

function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(0);

  fill(255);
  textSize(32);
  text(words[index % words.length], 10, 100);
}

function mousePressed() {
  index++;
}
/*
Two-Way Communication
Example 2: Read and interpret ASCII-encoded strings
use with: 29_P5js_to_LED_TwoWay_ASCII
https://create.arduino.cc/editor/enickles/3ee1f382-cd4d-48c1-b1c8-1b868f291ca4/preview

Map mouseY to brightness of LED
*/

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421'; // my serial port name
let inData; 	// for incoming data to P5
let outData; // for outgoing ASCII-encoded data to Arduino

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
	serial.open(portName); // open a serial port
  serial.on('data', serialEvent);
}

function draw() {
  background(0);
  fill(255)
  text(inData, 10, 30);
}

function mouseDragged() {
  let outByte = int(map(mouseY, height, 0, 0, 255)); // map the mouseY to a range from 0 to 255  
  outData = constrain(outByte, 0, 255);
  serial.write(outData + '\n'); // Convert it to a string with a newline at the end,
															// and send it out the serial port
}

function serialEvent() {
  let inString = serial.readLine()
  if (inString.length > 0) {
    inData = Number(inString);
    console.log(inData);
  }
}/*
Two-Way Communication
Example 1: Map mouseY to LED & print brightness
use with: 28_P5js_to_LED_TwoWay_Binary
https://create.arduino.cc/editor/enickles/2bb3753f-de03-462b-8a3c-7f2eb4946168/preview

Map mouseY to brightness of LED, print brightness value (from Arduino) on P5 screen
*/

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421'; // my serial port name
let inByte; 	// for incoming serial data from Arduino
let outByte; // for outgoing serial data to Arduino

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
	serial.open(portName); // open a serial port
  serial.on('data', serialEvent);
}

function draw() {
  background(0);
  fill(255)
  text(inByte, 10, 30);
}

function mouseDragged() {
  outByte = int(map(mouseY, height, 0, 0, 255)); // map the mouseY to a range from 0 to 255
  serial.write(outByte); // send it out to the serial port
	// console.log(outByte);
}

function serialEvent() {
  inByte = serial.read();
}// not sure if this is necessary!!!

/*
Two-Way Communication
Example 4: Map mouseY to LED brightness
use with: 31_P5js_to_LED_Handshake (my attempt)
https://create.arduino.cc/editor/enickles/773ab07c-ef43-44cd-857b-22440f84d6f6/preview

Map mouseY to brightness of LED
*/

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421'; // my serial port name
let inByte; // for incoming serial data
let outByte; // for outgoing serial data

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
	serial.open(portName); // open a serial port
  serial.on('data', serialEvent);
  
  if (inByte == null) {
   serial.write('x') 
   console.log('x');
  }

}

function draw() {
  background(0);
  fill(255);
  text(outByte, 10, 30);
}

function serialEvent() {

  inByte = serial.read()
  // console.log(inData);
  
  let outData = int(map(mouseY, height, 0, 0, 255)); // map the mouseY to a range from 0 to 255
  outByte = constrain(outData, 0, height);
  serial.write(outByte); // send it out to the serial port
  console.log(outByte);
}
/*
Two-Way Communication
Example 3: Using 2 Pots & 1 Button with P5
use with: 30_Arduino_P5js_Handshaking
https://create.arduino.cc/editor/enickles/43ba6913-cfa1-4124-9878-b0b78d666da1/preview

Original:
Use with this Arduino sketch: InClass_Wk7_Lab2_Exercise1a
https://create.arduino.cc/editor/enickles/236df200-b9f0-44bb-b69b-c7dd81a74a70/preview
using 3 pots
*/

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var xLoc; // location of the circle
var yLoc; // location of the circle
var circleColor = 255; // color of the circle

function setup() {
  createCanvas(640, 480);
  smooth(); // antialias drawing lines
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.open(portName); // open the serial port
}

function draw() {
  background(200);
  fill(circleColor); // fill color depends on the sensor input value (either 255 or 0);
  ellipse(xLoc, yLoc, 50, 50); // xLoc & yLoc depend on the sensors' input values
}

function serialEvent() {
  var inString = serial.readStringUntil('\r\n');
  // var inString = serial.readLine();	  // another option
  print(inString);

  if (inString.length > 0) { //check to see that there's actually a string there
    if (inString !== 'hello') {	// if there's something other in the 
      var sensors = split(inString, ','); // split the string on the commas, variable is an array 
      if (sensors.length > 2) { // if there are three elements
        xLoc = map(sensors[0], 0, 1023, 0, width); // element 0 - pot0 - is stored in the x location
        yLoc = map(sensors[1], 0, 1023, 0, height); // element 1 - pot1 - is stored in the the y location
        circleColor = 255 - (sensors[2] * 255); // element 2 - button - is stored in the circleColor
      }
    }
    serial.write('x'); // send a byte requesting more serial data
    print('x');
  }
}/*
Serial Output from P5.js
Example 4: Read and interpret ASCII-encoded strings in Arduino
use with: 27_P5js_to_LED_Brightness_parseInt (ASCII)
https://create.arduino.cc/editor/enickles/3ee1f382-cd4d-48c1-b1c8-1b868f291ca4/preview

Map mouseY to brightness of LED
*/

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421'; // my serial port name
let outData; // for outgoing serial data

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
	serial.open(portName); // open a serial port
}

function draw() {
  background(0);
}

function mouseDragged() {
  let outByte = int(map(mouseY, height, 0, 0, 255)); // map the mouseY to a range from 0 to 255
  
  serial.write(outByte + '\n'); // Convert it to a string with a newline at the end,
  															// and send it out the serial port
}

/*
The serial.write() function is versatile. 
If you give it a variable or literal that’s a numeric data type, 
it will send it as its raw binary value. 
In the code above, note how you’re converting the output of the map() function
to a number using the int() function.  

If you give it a string, however, it will send out that ASCII string.
So be aware of the difference, and make sure you know whether your 
serial receiving device wants raw binary or ASCII-encoded data.
*//*
Serial Output from P5.js
Example 3: Send letters to turn LED on & off
use with: 25_P5js_to_LED_Brightness_ASCII
https://create.arduino.cc/editor/enickles/362ced19-a140-4f1d-a4f9-106bab053fe0/preview

Map numbers 1-9 to LED brightness
*/

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421'; // my serial port name
let outData; // for outgoing serial data

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.open(portName); // open a serial port
}

// function draw() {  // not needed for this example
//   background(0);
// }

function keyPressed() {
 if (key ==='H' || key ==='L') { // if the user presses H or L
 serial.write(key);              // send it out the serial port
 }
}

/*
The serial.write() function is versatile. 
If you give it a variable or literal that’s a numeric data type, 
it will send it as its raw binary value. 
In the code above, note how you’re converting the output of the map() function
to a number using the int() function.  

If you give it a string, however, it will send out that ASCII string.
So be aware of the difference, and make sure you know whether your 
serial receiving device wants raw binary or ASCII-encoded data.
*//*
Serial Output from P5.js
Example 2: Map numeric key presses to LED brightness	
use with: 25_P5js_to_LED_Brightness_Binary
https://create.arduino.cc/editor/enickles/0f4293e9-94ae-4f9c-a5ce-7a1575578e32/preview

Map numbers 1-9 to LED brightness
*/

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421'; // my serial port name
let outData; // for outgoing serial data

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.open(portName); // open a serial port
}

// function draw() {  // not needed for this example
//   background(0);
// }

function keyPressed() {
  if (key >= 0 && key <= 9) { // if the user presses 0 through 9
    outByte = byte(key * 25); // map the key to a range from 0 to 225
  }
  serial.write(outByte); // send it out the serial port
}


/*
The serial.write() function is versatile. 
If you give it a variable or literal that’s a numeric data type, 
it will send it as its raw binary value. 
In the code above, note how you’re converting the output of the map() function
to a number using the int() function.  

If you give it a string, however, it will send out that ASCII string.
So be aware of the difference, and make sure you know whether your 
serial receiving device wants raw binary or ASCII-encoded data.
*//*
Serial Output from P5.js
Example 1: Map mouseY to LED brightness
use with: 25_P5js_to_LED_Brightness_Binary
https://create.arduino.cc/editor/enickles/0f4293e9-94ae-4f9c-a5ce-7a1575578e32/preview

Map mouseY to brightness of LED
*/

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421'; // my serial port name
let outData; // for outgoing serial data

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
	serial.open(portName); // open a serial port
}

function draw() {
  background(0);
}

function mouseDragged() {
  outByte = int(map(mouseY, height, 0, 0, 255)); // map the mouseY to a range from 0 to 255
  serial.write(outByte); // send it out to the serial port
}

/*
The serial.write() function is versatile. 
If you give it a variable or literal that’s a numeric data type, 
it will send it as its raw binary value. 
In the code above, note how you’re converting the output of the map() function
to a number using the int() function.  

If you give it a string, however, it will send out that ASCII string.
So be aware of the difference, and make sure you know whether your 
serial receiving device wants raw binary or ASCII-encoded data.
*//*
Serial Output from Arduino
Example 6: Update P5 sketch with 3 pots
use with: 24_2Pots_to_P5js_ASCII_B
https://create.arduino.cc/editor/enickles/c28b9748-a267-4091-883d-6c6c92a49ab4/preview

Original:
Use with this Arduino sketch: InClass_Wk7_Lab2_Exercise1a
https://create.arduino.cc/editor/enickles/236df200-b9f0-44bb-b69b-c7dd81a74a70/preview
using 3 pots
*/

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var xLoc; // location of the circle
var yLoc; // location of the circle
var circleColor = 255; // color of the circle

function setup() {
  createCanvas(640, 480); 
  smooth(); 											// antialias drawing lines
  serial = new p5.SerialPort(); 	// make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.open(portName); 					// open the serial port
}

function draw() {
  background(0); 								
  fill(circleColor); 						// fill color depends on the sensor input value
  ellipse(xLoc, yLoc, 50, 50); 	// xLoc & yLoc depend on the sensors' input values
}

function serialEvent() {
  // read a string from the serial port until you get carriage return and newline
  // here is also where you change what you want to see, 
  // you can also change how you end the line in the Arduino code
  var inString = serial.readStringUntil('z');
  
  // var inString = serial.readLine();	  // can't use this option here, would need \r\n
  print(inString);
					
  if (inString.length > 0) {													//check to see that there's actually a string there
    var sensors = split(inString, '#');	 							// split the string on the hashtags, variable is an array 
    if (sensors.length > 2) { 												// if there are three elements
      xLoc = map(sensors[0], 0, 1023, 0, width); 			// element 0 is stored in the x location
      yLoc = map(sensors[1], 0, 1023, 0, height); 		// element 1 is stored in the the y location
      circleColor = map(sensors[2], 0, 1023, 0, 255); // element 2 is stored in the circleColor
    }
  }
}
/*
Serial Output from Arduino
Example 6: Update P5 sketch with 3 pots
use with: 24_2Pots_to_P5js_ASCII_A
https://create.arduino.cc/editor/enickles/c28b9748-a267-4091-883d-6c6c92a49ab4/preview

Original:
Use with this Arduino sketch: InClass_Wk7_Lab2_Exercise1a
https://create.arduino.cc/editor/enickles/236df200-b9f0-44bb-b69b-c7dd81a74a70/preview
using 3 pots
*/

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var xLoc; // location of the circle
var yLoc; // location of the circle
var circleColor = 255; // color of the circle

function setup() {
  createCanvas(640, 480); 
  smooth(); 											// antialias drawing lines
  serial = new p5.SerialPort(); 	// make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.open(portName); 					// open the serial port
}

function draw() {
  background(0); 								
  fill(circleColor); 						// fill color depends on the sensor input value
  ellipse(xLoc, yLoc, 50, 50); 	// xLoc & yLoc depend on the sensors' input values
}

function serialEvent() {
  // read a string from the serial port until you get carriage return and newline
  // here is also where you change what you want to see, 
  // you can also change how you end the line in the Arduino code
  var inString = serial.readStringUntil('\r\n');
  
  // var inString = serial.readLine();	  // another option
  print(inString);
					
  if (inString.length > 0) {													//check to see that there's actually a string there
    var sensors = split(inString, ',');	 							// split the string on the commas, variable is an array 
    if (sensors.length > 2) { 												// if there are three elements
      xLoc = map(sensors[0], 0, 1023, 0, width); 			// element 0 is stored in the x location
      yLoc = map(sensors[1], 0, 1023, 0, height); 		// element 1 is stored in the the y location
      circleColor = map(sensors[2], 0, 1023, 0, 255); // element 2 is stored in the circleColor
    }
  }
}
/* 
Serial Output from Arduino
Example 5: Move an ellipse in all directions with 2 pots
use with: 23_2Pots_to_P5js_ASCII
https://create.arduino.cc/editor/enickles/11cb7092-8c82-43c7-887d-69a69d53b4e3
*/

let serial;
let portName = '/dev/cu.usbmodem1421';
let inData;
let xData;
let yData;

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.open(portName);
  serial.on('data', serialEvent); // callback for when new data arrives
}

function draw() {
  background(200);
  moveEllipse(inData);
}

function serialEvent() {
  
  // separate out multiple values of inData which contains values from our two pots
  inData = serial.readLine() // use readLine with println
  if (inData.length > 0) {
    let values = inData.split(','); // create a new variable, which is an array
    																// also note: can change this delimiter in the Arduino and here
    																// just make sure the delimiter is the same in both sketches
    xData = int(values[0]);
    yData = int(values[1]);
    print(values);
  }
  
}

function moveEllipse() {
	let x = map(xData, 0, 1023, 0, width); 	// map potValue0 to width of canvas
  let y = map(yData, 0, 1023, 0, height);	// map potValue1 to height of canvas
  fill(255);
  ellipse(x, y, 55, 55);
}
// Bare bones version of serial communications since most of the
// callbacks trigger data to print in the console
// which is helpful, until you get used to troubleshooting

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421'; // my serial port name
let inData; // for incoming serial data

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
	serial.open(portName); // open a serial port
}

function draw() {
  
  // do something with the data here
  background(0);
  fill(255);
  text("sensor value: " + inData, 30, 30);
}

function serialEvent() {
  // receive and then maybe parse your inData here
}/*
Serial Output from Arduino
Example 4: Display pot values in P5 sketch (0-1023)
use with: 22_Pot_to_P5js_ASCII_String
https://create.arduino.cc/editor/enickles/04fe7b5f-91c0-478f-b7d2-947b126518c3

Reference: https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
*/

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421'; // my serial port name
let inData; // for incoming serial data

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
}

function draw() {
  background(220);
  background(0);
  fill(255);
  text("sensor value: " + inData, 30, 30);
}

function serialEvent() {
  
  let inString = serial.readLine();		// read a string from the serial port
  if (inString.length > 0 ) {					// check to see that there's actually a string there
  
  inData = Number(inString);						// convert it to a number
    print(inData);		
  }
}/*
Serial Output from Arduino
Example 3: Display pot values in P5 sketch (0-255)
use with: 21_Pot_to_P5js_ASCII_String_0_255
https://create.arduino.cc/editor/enickles/04fe7b5f-91c0-478f-b7d2-947b126518c3

Reference: https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
*/

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421'; // my serial port name
let inData; // for incoming serial data

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
}

function draw() {
  background(220);
  background(0);
  fill(255);
  text("sensor value: " + inData, 30, 30);
}


// option #0 - reads all data as bytes
// function serialEvent() {
//   inData = Number(serial.read()); // reads one byte at a time, use with Serial.write() on Arduino side
//   print(inData) 									 // notice what prints out in the console:
																		 // even though you see numbers, 
																		 // they are the ASCII representation of each individual character in our data
  																	 // the Arduino sketch is sending data as ASCII-encoded string!
  																	 // what happens when our sensor value is a 10 or 13?
  																	 // that's why we send it as an ASCII string to knock out the \r and \n
// }


// option #1 - not great
// function serialEvent() {
//   inData = serial.readLine(); // use readLine with println() on the Arduino side
																 // this command reads the incoming serial data as a string, 
//   														 // and when that string happens to be all-numeric, 
//   														 // it converts the string to a number
//   														 // but notice how jumpy this is! see below
//
// }

/*
Remember, the ‘data’ event occurs every time a new byte comes in the serial port.
Now that you’re sending an ASCII-encoded string, every potentiometer reading is several bytes long.
So you only get a complete string every three to six bytes (three for “0\r\n” and six for “1023\r\n”).
Sometimes, when the serialEvent() function calls serial.readLine(); it gets nothing, and
you might get gaps in your data on the P5 side.
You need to change your function to check that the resulting string is actually a valid number 
before you put the string into inData. See option #2 below.
*/

// option #2 - better, use this!
function serialEvent() {
  
  let inString = serial.readLine();		// read a string from the serial port
  if (inString.length > 0 ) {					// check to see that there's actually a string there
  
  inData = Number(inString);						// convert it to a number
    print(inData);		
  }
}/* 

one input, binary data

Original: 
// still playing with my 10print-inspired design
// one input from a potentiometer, binary data
// use with this Arduino sketch: 1Pot_to_P5js_Binary
// https://create.arduino.cc/editor/enickles/4677f92b-ab08-47c0-9efd-8896e6b5d983/preview
*/

let serial;
let portName = '/dev/cu.usbmodem1421';
let inData;

let design;
let y1 = 0;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.open(portName); // open a port
  serial.on('data', serialEvent); // callback for when new data arrives

  design = new Design();
}

function draw() {
  background(255);
  changeY1(inData); // probably don't need to send inData as a parameter because it's a global variable
  design.show();
  design.animate();

}

function serialEvent() {
  inData = Number(serial.read()); // inData is a global variable
  print(inData)
}

function changeY1() { // I can't remember where I got this but there was content in the () that matched the first variable in map and it still worked..?
  y1 = map(inData, 0, 255, 0, 100);
  serial.write("x");
}/* 
Serial Output from Arduino
Example 2: Move an ellipse with a pot
use with: 20_Pot_to_P5js_Binary_A
https://create.arduino.cc/editor/enickles/7221d60e-3d35-442f-adfc-57c77c2a209f

one input, binary data (bytes!)
*/

let serial;
let portName = '/dev/cu.usbmodem1421';
let inData;

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.open(portName);
  serial.on('data', serialEvent); // callback for when new data arrives
}

function draw() {
  background(200);
  moveEllipse(inData);
}

function serialEvent() {
  inData = Number(serial.read());
  print(inData)
}

function moveEllipse() {
  let y = map(inData, 0, 255, 0, height) // incoming pot values mapped to height of canvas, the y axis
  fill(255);
  ellipse(200, y, 55, 55);
}/*
Serial Output from Arduino
Example 1: Display pot values in P5 sketch
use with: 20_Pot_to_P5js_Binary_A
https://create.arduino.cc/editor/enickles/7221d60e-3d35-442f-adfc-57c77c2a209f

original from here:
https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/#Program_P5js_to_list_the_available_serial_ports
connect Pot to A0 (and make sure sketch is running on the Arduino)
Arduino sketch: Pot_to_P5js_Binary
*/

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421'; // my serial port name
let inData; // for incoming serial data

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
}

function draw() {
  background(220);
  background(0);
  fill(255);
  text("sensor value: " + inData, 30, 30);
}


function serialEvent() {
  inData = Number(serial.read());
  print(inData)
}/*
Serial Output from Arduino
Example 1
use with: 20_Pot_to_P5js_Binary_A
https://create.arduino.cc/editor/enickles/7221d60e-3d35-442f-adfc-57c77c2a209f

original notes:
https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/#Program_P5js_to_list_the_available_serial_ports
connect Pot to A0 (and make sure sketch is running on the Arduino)
Arduino sketch: Pot_to_P5js_Binary
*/

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
let inData; // for incoming serial data

function setup() {
  createCanvas(400, 400);
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
  background(220);
  background(0);
  fill(255);
  text("sensor value: " + inData, 30, 30);
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

function serialEvent() {
  inData = Number(serial.read());
  print(inData)
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(500, 300);

  serial = new p5.SerialPort();   // Instantiate our SerialPort object
  serial.list(); 									// Get a list the ports available
  																// You should have a callback defined to see the results
  serial.open("/dev/cu.usbmodem1411"); // Open a connection to your connected Arduino
  																		 // change to name of your serial port from the list in the console

  // Here are the callbacks that you can register:
  serial.on('connected', serverConnected);   // When we connect to the underlying server
  serial.on('list', gotList);	// When we get a list of serial ports that are available
  serial.on('data', gotData);   // When we some data from the serial port
  serial.on('error', gotError); // When or if we get an error
  serial.on('open', gotOpen); // When our serial port is opened and ready for read/write
  serial.onRawData(gotRawData);  // Callback to get the raw data, as it comes in for handling yourself
} 

function serverConnected() {					// We are connected and ready to go
  println("Connected to Server");
}

function gotList(thelist) {						// Got the list of ports
  println("List of Serial Ports:");
  for (var i = 0; i < thelist.length; i++) {    // theList is an array of their names
    println(i + " " + thelist[i]);						  // Display in the console
  }
}

function gotOpen() {									// Connected to our serial device
  println("Serial Port is Open");
}

function gotError(theerror) {					// Uh oh, here is an error, let's log it
  println(theerror);	
}

function gotData() {											// There is data available to work with from the serial port
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log(currentString);             // println the string
  latestData = currentString;            // save it for the draw method
}


function gotRawData(thedata) {					// We got raw from the serial port
  println("gotRawData" + thedata);
}

function draw() {
  background(255,255,255);
  fill(0,0,0);
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(50, data, 50, 50);
  text(data, 10, 10);
}


// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() returns all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

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
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(50, data, 50, 50);
  text(data, 10, 10);
}// Create a class with multiple objects (no array)

let bubble1;
let bubble2;
let bubble3;
let bubble4;

function setup() {
  createCanvas(200, 200);
  bubble1 = new Bubble();
  bubble2 = new Bubble();
  bubble3 = new Bubble();
  bubble4 = new Bubble();
}

function draw() {
  background(0);
  bubble1.move();
  bubble1.display();

  bubble2.move();
  bubble2.display();

  bubble3.move();
  bubble3.display();

  bubble4.move();
  bubble4.display();
}

class Bubble {

  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
  }

  display() {
    stroke(255);
    noFill();
    ellipse(this.x, this.y, 24, 24);
  }

  move() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }
}// Click on objects of array to change a property (or many!)

let bubbles = [];

function setup() {
  createCanvas(400, 400);

  for (i = 0; i < 10; i++) {
    bubbles[i] = new Bubble();
  }
}

function draw() {
  background(0);

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move()
    bubbles[i].show();
  }

}


function mouseClicked() {
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked();
  }
}


class Bubble {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.w = 40;
    this.color = (150, 150, 150);
  }

  show() {
    fill(this.color);
    stroke(255);
    ellipse(this.x, this.y, this.w);
  }

  move() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  clicked() {
    let diameter = this.w / 2;
    let distance = dist(this.x, this.y, mouseX, mouseY)
    if (distance < diameter) {
      this.color = color(random(255), random(255), random(255));
      this.w += 10
      if (this.w > 100) {
       this.w = 40;  
      }
    }
  }

}// Push and slice objects of array

let bubbles = [];

function setup() {
  createCanvas(400, 400);
}

function mouseDragged() {
  bubbles.push(new Bubble(mouseX, mouseY));
}

// remove bubbles with keyPressed function
function keyPressed() {
  if (key == 'd' || key == 'D') {
    // bubbles.splice(0, 1); // delete one bubble at a time
    bubbles.splice(0, bubbles.length); // delete all bubbles
  }
}

function draw() {
  background(0);

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move()
    bubbles[i].show();
  }

  if (bubbles.length > 20) {
    // bubbles.splice(bubbles[0]);
    
    // variation: 
    // for splice, first number is the index of what to remove
    // the second argument is how many
    bubbles.splice(bubbles[0],1);
  }

}

class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    fill(255, 0, 150, 50);
    stroke(255);
    ellipse(this.x, this.y, 40, 40);
  }

  move() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }
}// Create an array of objects

let bubbles = [];
let total = 100;

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < total; i++) {
    bubbles[i] = new Bubble();
  }
}

function draw() {
  background(0);

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move()
    bubbles[i].show();
  }
}


class Bubble {
  constructor() {
    this.x = random(width);
    this.y = random(height)
  }

  show() {
    noFill();
    stroke(255);
    ellipse(this.x, this.y, 40, 40);
  }

  move() {
    // this.x += 0.07;
    // this.y += 0.07;
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }
}// create a class with one object

let bubble;

function setup() {
  createCanvas(400, 400);

  bubble = new Bubble();
}

function draw() {
  background(0);
  
  bubble.move();
  bubble.show();
}


class Bubble {
  constructor() {
    this.x = random(width);
    this.y = random(height)
  }

  show() {
    noFill();
    stroke(255);
    ellipse(this.x, this.y, 40, 40);
  }

  move() {
    // this.x += 0.07;
    // this.y += 0.07;
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }
}var nums = [5, 4, 2, 7, 6, 8, 5, 2, 8, 14];

function setup() {
  createCanvas(300, 200);
  background(255);

  // Square each number (i.e., multiply each by itself )
  for (var i = 0; i < nums.length; i++) {
    nums[i] = nums[i] * nums[i];
    text(nums[i] + ',', i * 25 + 10, 50);
  }

  // Add a random number between zero and 10 to each number.
  for (var j = 0; j < nums.length; j++) {
    nums[j] += int(random(10));
    text(nums[j] + ',', j * 25 + 10, 80);
  }

  // Add to each number the number that follows in the array. 
  // Skip the last value in the array. 
  for (var k = 0; k < nums.length - 1; k++) {
    nums[k] += nums[k + 1];
    text(nums[k] + ',', k * 25 + 10, 110);
  }

  // Calculate the sum of all the numbers.
  var sum = 0;
  for (var m = 0; m < nums.length - 1; m++) {
    sum += nums[m + 1]
  }
  text('sum: ' + sum, 10, 140);
  console.log(sum)
}// rotate through items in an array

var words = ["ಥ_ಥ", "(ง'̀-'́)ง", "(°ロ°)☝", "(｡◕‿‿◕｡)", "( ͡° ͜ʖ ͡°)", "(ᵔᴥᵔ)", "༼ つ ◕_◕ ༽つ"];

var index = 0;

function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(0);

  fill(255);
  textSize(32);
  text(words[index], 10, 100);
}

function mousePressed() {
  index = index + 1;

  if (index == words.length) {
    index = 0;
  }
}// basic slider example, function call with parameters

var x = 0;
var y = 0;

var s1 = 100; // if I take these out of global scope then mousePressed cannot see
var s2 = 300;
var w = 10;
var h = 20;

var rollover = false;
var dragging = false;


function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}


function draw() {
  background(225);
  displayDesign();
  // slider(100, 300, 10, 20, 100, 300, 0);
  slider(100, 300, 0);
}


function displayDesign() {
  push();
  translate(200, 200);
  for (var a = 0; a <= 360; a += 45) {
    rotate(a)
    line(x, y, 20, 20);
  }
  pop();
}


function slider(sliderStart, sliderEnd, offsetS) {
  line(sliderStart, s2 + h / 2, sliderEnd, s2 + h / 2);
  fill(255);
  rect(s1, s2, w, h);
  
  if (dragging) {
    s1 = mouseX + offsetS;
  }

  s1 = constrain(s1, sliderStart, sliderEnd - w);

  //change starting point for line in my Design
  x = map(s1, sliderStart, sliderEnd - w, 0, 60);

}


function mousePressed() {
  if (mouseX > s1 && mouseX < s1 + w && mouseY > s2 && mouseY < s2 + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetS = s1 - mouseX;
  }
}


function mouseReleased() {
  dragging = false; // Stop dragging
}// create multiple objects (array & loop)

let total = 10;
let balls = [];

function setup() {
  createCanvas(200, 200);
  let ball = new Ball();

  for (let i = 0; i < total; i++) {
    let x = random(width);
    let y = random(height);
    let b = new Ball(x, y);
    balls.push(b);
  }
}


function draw() {
  background(0);

  for (let ball of balls) {
    ball.move();
    ball.show();
    ball.bounce();
  }

  // for (let i = 0; i < total; i++) {
  //   balls[i].show();
  //   balls[i].move();
  //   balls[i].bounce();
  // }
}


class Ball {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.xspeed = 5;
    this.yspeed = 2;
  }

  show() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  }

  move() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  bounce() {
    if (this.x > width - this.r || this.x < this.r) {
      this.xspeed = -this.xspeed;
    }
    if (this.y > height - this.r || this.y < this.r) {
      this.yspeed = -this.yspeed;
    }
  }
}// create a class for an object

var ball;

function setup() {
  createCanvas(200, 200);
  ball = new Ball();
}

function draw() {
  background(0);
  ball.display();
  ball.move();
  ball.bounce();
}


class Ball {
  
  constructor() {
	this.x = 100;
  this.y = 180;
	this.r = 10;
  this.xspeed = 5;
  this.yspeed = 2;
  }

  display() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  }

  move() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  bounce() {
    if (this.x > width - this.r || this.x < this.r) {
      this.xspeed = -this.xspeed;
    }
    if (this.y > height - this.r || this.y < this.r) {
      this.yspeed = -this.yspeed;
    }
  }
}// call a function that returns a value

/* Complete function CtoF() that receives a temperature 
in Celsius (°C) as an arguement, 
and returns the temperture back Fahrenheit (°F). 
The forumula is F° = (C° × 1.8) + 32.
*/

function setup() {
  createCanvas(200, 200);
  background(255);
  text('Temperature in °C: 25', 0, 50);
  var temp = CtoF(25);
  text('Temperature in °F: ' + temp, 0, 100);
}

function CtoF(celDegrees) {
  var farDegrees = (celDegrees * 1.8) + 32;
  return farDegrees;
}// call a function with parameters

function setup() {
  createCanvas(200, 200);
  background(255);
  noStroke();
  colorMode(HSB, 255);
  for (let i = 1; i < 4; i++) {
    let x = (i * 30) + (10*i);
    let y = height/2;
  	let diameter = random(30,35);
    iceCream(x, y, diameter);
  }
}

function iceCream(x, y, diameter) {
  fill(random(360), 112, 331);
  arc(x, y, diameter, diameter, -PI, 0);
  fill('#d7c38e');
  triangle(x - diameter / 2, y + 5, x + diameter / 2, y + 5, x, y + diameter * 1.3);
}// make noise grid by pressing mouse

function setup() {
  createCanvas(200, 200);
  background(255);
  getGrid();
}

function draw() {
  // for (let x = 0; x < width; x += 10) {
  //   for (let y = 0; y < height; y += 10) {
  //     fill(random(255));
  //     rect(x, y, 20, 20);
  //   }
  // }

}

function mousePressed() {
  getGrid();
}

function getGrid() {
    for (let x = 0; x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      noStroke();
      fill(random(255));
      rect(x, y, 20, 20);
    }
  }
}// loop concentric circles back to front

function setup() {
  createCanvas(220, 220);
  background(255);
}

function draw() {
	let x = width/2;
  let y = height/2;
  let circles = 10;
  let diameter;
  
  ellipseMode(CENTER);
  stroke(0);
  
  for (let total = 0; total < circles; total+=1) {
   diameter =  (circles - total) * 20;
    fill(diameter);
    ellipse(x, y, diameter); // drop 4th parameter if creating circle
  }

}// rollover and fade, cleaner version

let r1 = 0;
let r2 = 0;
let r3 = 0;
let r4 = 0;

function setup() {
  createCanvas(200, 200);
  background(150);
}

function draw() {
  noStroke();

  //rect1
  if (mouseX < width / 2 && mouseY < height / 2) {
    r1 = 255;
  } else if (mouseX > width / 2 && mouseY < height /2) {
    r2 = 255;
  } else if (mouseX < width / 2 && mouseY > height / 2) {
    r3 = 255;
    console.log("rect3");
  } else if (mouseX > width / 2 && mouseY < height) {
    r4 = 255;
  }

  r1 -= 5;
  r2 -= 5;
  r3 -= 5;
  r4 -= 5;

  fill(r1)
  rect(0, 0, width / 2, height / 2);
  fill(r2)
  rect(width / 2, 0, width, height);
  fill(r3)
  rect(0, height / 2, width / 2, height / 2);
  fill(r4)
  rect(width / 2, height / 2, width, height);


}// rollover and fade

let r1 = 0;
let r2 = 0;
let r3 = 0;
let r4 = 0;

function setup() {
  createCanvas(200, 200);
  background(150);
}

function draw() {
  noStroke();

  //rect1
  if (mouseX > 0 && mouseX < width / 2 && mouseY > 0 && mouseY < height / 2) {
    r1 = 255;
  } else {
    r1--;
  }
  fill(r1)
  rect(0, 0, width / 2, height / 2);

  //rect2
  if (mouseX > width / 2 && mouseX < width && mouseY > 0 && mouseY < height / 2) {
    r2 = 255;
  } else {
    r2--
  }
  fill(r2)
  rect(width / 2, 0, width, height);

  //rect3
  if (mouseX > 0 && mouseX < width / 2 && mouseY > height / 2 && mouseY < height) {
    r3 = 255;
  } else {
    r3--;
  }
  fill(r3)
  rect(0, height / 2, width / 2, height / 2);

  //rect4
  if (mouseX > width / 2 && mouseX < width && mouseY > height / 3 && mouseY < height) {
    r4 = 255;
  } else {
    r4--
  }
  fill(r4)
  rect(width / 2, height / 2, width, height);


}// rollover a rect

var x = 50;
var y = 50;
var w = 100;
var h = 75;

function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(240);

  stroke(0);

  if (mouseX > 50 && mouseX < 150 && mouseY > 50 && mouseY < 125) {
    fill(255);
  } else {
    fill(0);
  }

  rect(x, y, w, h);
}// animate back and forth

var x = 0;
var speed = 1;

function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(255);
  
  rectMode(CORNER);
  fill (200);
  rect(100, height/2, 100, 100)
  
  fill(0);
  rect(x, 100, 20, 20);
   
  if (x > 100 || x < 0) { 
   speed = -speed;
  } 
  
  x = x + speed;
}// animate with constrain

var x = 0;
var xc;

function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(255);

  rectMode(CORNER);
  fill(200);
  rect(100, height / 2, 100, 100)

  fill(0);
  rect(xc, 100, 20, 20);
  xc = constrain(x, 0, 100);

  x = x + 1

}// boolean expression

function setup() {
  let grade = random(0, 100);
  print(floor(grade));

  if (grade >= 90) {
    text("Grade: A", 10, 50);
  } else if (grade >= 80 && grade < 90) {
    text("Grade: B", 10, 50);
  } else if (grade >= 70 && grade < 80) {
    text("Grade: C", 10, 50);
  } else if (grade >= 60 && grade < 70) {
    text("Grade: D", 10, 50);
  } else {
    text("FAIL!", 10, 50);
  }
}

function draw() {

}var x = 0;
var speed = 1;

function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(255);
  
  rectMode(CORNER);
  fill (200);
  rect(100, height/2, 100, 100)
  
  fill(0);
  rect(x, 100, 20, 20);
  // xc = constrain(x, 0, 100);
  
  // Increment x
   
  if (x > 100 || x < 0) { 
   speed = -speed;
  } 
  
  x = x + speed;
}var x = 180;
var y = 180;
var xspeed = 9;
var yspeed = 10;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background (25);

}

function draw() {

	//distance from center of the screen
	var d = dist(windowWidth/2, windowHeight/2, mouseX, mouseY);

  	fill (random(200, 250), random(200, 250), random(200, 250));
  	ellipse (x, y, d, d);

  	//bouncing horizontally
 	 x = x + xspeed;
  	
  	 if (x > windowWidth || x < 0)  {
     	xspeed = -xspeed;
  	}

  	//bouncing veritcally
  	y = y + yspeed;

  	if (y > windowHeight || y < 0) {
	 	  yspeed = -yspeed;
  	}

}// smooth out gradient of shape

let timer = 0;
let duration = 50;
let discard;
let backFill = [];
let centerFill = [];
let next = [];
let counter = 0;
let bf, cf;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);


  for (i = 0; i < 3; i++) {
    backFill[i] = floor(random(150, 245));
    next[i] = floor(random(150, 245));
  }

  discard = floor(random(0, 3));
  backFill[discard] = 0;
  next[discard] = 0;

  for (i = 0; i < 3; i++) {
    centerFill.push(backFill[i]);
  }
  
	bf = color(backFill[0], backFill[1], backFill[2]);
	cf = color(centerFill[0], centerFill[1], centerFill[2]);
}


function draw() {
  background(backFill);
  translate(-width/2,-height/2,0);
  
  bf = color(backFill[0], backFill[1], backFill[2]);
	cf = color(centerFill[0], centerFill[1], centerFill[2]);

  let x = width * 0.5;
  let y = height * 0.5;
  let w = width * 0.8;
  let h = height * 0.7;

  rectMode(CENTER);
  stroke(centerFill, 255);
  fill(centerFill, 100);
  rect(x, y, w, h);

//   a = 255;
//   for (s = 1; s < 50; s++) {
//   strokeWeight(1);
//   stroke(centerFill[0], centerFill[1], centerFill[2], a);
//   noFill();
//   rect(width/2, height/2, w + s, w + s);
//   a -= 1;
//   }
  
//   for (s = 0; s < 50; s++) {
//     let inter = map(s, 0, 50, 0, 1);
//     let newColor = lerpColor(cf, bf, inter);
//     stroke(newColor);
//     noFill();
//     // rect(width/2, height/2, s, height);
//     rect(width / 2, height / 2, w + s, h + s);
//   }
  
  if (counter == 0) {
    transition(centerFill, next);

  } else if (counter == 1) {
    transition(backFill, centerFill);

  } else if (counter == 2) {
    transition(backFill, next);

  } else if (counter == 3) {
    transition(centerFill, backFill);
  }
}


function transition(source, target) {

  if (millis() - timer > duration) {

    for (i = 0; i < 3; i++) {
      if (source[i] > target[i]) {
        source[i]--
      } else if (source[i] < target[i]) {
        source[i]++
      } else {
        source[i] = target[i];
      }
      timer = millis();
    }

    if (source[0] === target[0] && source[1] === target[1] && source[2] === target[2]) {
      getNext();

      counter++
      if (counter > 3) {
        counter = 0;
      }

      console.log("completed" + " " + counter);
    }

  }
}


function getNext() {
  for (i = 0; i < 3; i++) {
    next[i] = floor(random(150, 250));
  }
  discard = floor(random(0, 3));
  next[discard] = 0
}// smooth out gradient of shape

let timer = 0;
let duration = 500;
let discard;
let backFill = [];
let centerFill = [];
let next = [];
let counter = 0;
let bf, cf;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  createCanvas(windowWidth, windowHeight);


  for (i = 0; i < 3; i++) {
    backFill[i] = floor(random(150, 245));
    next[i] = floor(random(150, 245));
  }

  discard = floor(random(0, 3));
  backFill[discard] = 0;
  next[discard] = 0;

  for (i = 0; i < 3; i++) {
    centerFill.push(backFill[i]);
  }
  
	bf = color(backFill[0], backFill[1], backFill[2]);
	cf = color(centerFill[0], centerFill[1], centerFill[2]);
}


function draw() {
  background(backFill);
  
  bf = color(backFill[0], backFill[1], backFill[2]);
	cf = color(centerFill[0], centerFill[1], centerFill[2]);

  let x = width / 2;
  let y = height / 2;
  let w = width * 0.8;
  let h = height * 0.7;

  rectMode(CENTER);
  stroke(centerFill, 255);
  fill(centerFill, 100);
  rect(x, y, w, h);


  for (s = 0; s < 50; s++) {
    let inter = map(s, 0, 50, 0, 1);
    let newColor = lerpColor(cf, bf, inter);
    stroke(newColor);
    noFill();
    // rect(width/2, height/2, s, height);
    rect(width / 2, height / 2, w + s, h + s);
  }

  if (counter == 0) {
    transition(centerFill, next);

  } else if (counter == 1) {
    transition(backFill, centerFill);

  } else if (counter == 2) {
    transition(backFill, next);

  } else if (counter == 3) {
    transition(centerFill, backFill);
  }
}


function transition(source, target) {

  if (millis() - timer > duration) {

    for (i = 0; i < 3; i++) {
      if (source[i] > target[i]) {
        source[i]--
      } else if (source[i] < target[i]) {
        source[i]++
      } else {
        source[i] = target[i];
      }
      timer = millis();
    }

    if (source[0] === target[0] && source[1] === target[1] && source[2] === target[2]) {
      getNext();

      counter++
      if (counter > 3) {
        counter = 0;
      }

      console.log("completed" + " " + counter);
    }

  }
}


function getNext() {
  for (i = 0; i < 3; i++) {
    next[i] = floor(random(150, 250));
  }
  discard = floor(random(0, 3));
  next[discard] = 0
}// let backFill;
// let centerFill; 

let bf;
let cf;

let backFill = [255, 255, 0];
let centerFill = [250, 0, 250];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
	bf = color(backFill[0], backFill[1], backFill[2]);
	cf = color(centerFill[0], centerFill[1], centerFill[2]);

}

function draw() {
  background(backFill);
	rectMode(CENTER);
  
  // with stroke alpha changes
  // let w = height / 4;
  // let w = 2;
  // stroke(250, 0, 250, 255);
  // fill(centerFill);
  // rect(width / 2, height / 2, w, w);

  // a = 255;
  // for (s = 1; s < height/2; s++) {
  // strokeWeight(1);
  // stroke(centerFill[0], centerFill[1], centerFill[2], a);
  // noFill();
  // rect(width/2, height/2, w + 2*s, w + 2*s);
  // a -= 1;
  // }

  let newColor;
  
	for (s = 0; s < height; s++) {
  	let inter = map(s, 0, height, 0, 1);
  	newColor = lerpColor(cf, bf, inter);
  	stroke(newColor);
  	noFill();
  	// rect(width/2, height/2, s, height);
    rect(width/2, height/2, s, s);
  }

  noLoop();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}let timer = 0;
let duration = 25;
let discard;
let backFill = [];
let centerFill = [];
let next = [];
let counter = 0;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  createCanvas(windowWidth, windowHeight);


  for (i = 0; i < 3; i++) {
    backFill[i] = floor(random(150, 250));
    next[i] = floor(random(150, 250));
  }

  discard = floor(random(0, 3));
  backFill[discard] = 0;
  next[discard] = 0;

  for (i = 0; i < 3; i++) {
    centerFill.push(backFill[i]);
  }
}


function draw() {
  background(backFill);

  let x = width / 2;
  let y = height / 2;
  let w = height * 0.5;

  rectMode(CENTER);
  stroke(centerFill, 255);
  fill(centerFill, 100);
  rect(x, y, w, w);
  
  // gradient stroke
	a = 255;
	for (s = 1; s < 256; s++) {
  strokeWeight(1);
	stroke(centerFill[0], centerFill[1], centerFill[2], a);
	noFill();
	rect(width/2, height/2, w + 2 * s, w + 2 * s);
	a -= 1;
	}

  if (counter == 0) {
    transition(centerFill, next);

  } else if (counter == 1) {
    transition(backFill, centerFill);

  } else if (counter == 2) {
    transition(backFill, next);

  } else if (counter == 3) {
    transition(centerFill, backFill);
  }
}


function transition(source, target) {

  if (millis() - timer > duration) {

    for (i = 0; i < 3; i++) {
      if (source[i] > target[i]) {
        source[i]--
      } else if (source[i] < target[i]) {
        source[i]++
      } else {
        source[i] = target[i];
      }
      timer = millis();
    }

    if (source[0] === target[0] && source[1] === target[1] && source[2] === target[2]) {
      getNext();

      counter++
      if (counter > 3) {
        counter = 0;
      }

      console.log("completed" + " " + counter);
    }

  }
}


function getNext() {
  for (i = 0; i < 3; i++) {
    next[i] = floor(random(150, 250));
  }
  discard = floor(random(0, 3));
  next[discard] = 0
}// figure out to how write this by calling a function with parameters

let duration = 50;
let timer = 0;
let d;
let backFill = [];
let centerFill = [];
let next = [];

function setup() {
  createCanvas(600, 600);

  for (i = 0; i < 3; i++) {
    backFill[i] = floor(random(150, 250));
    next[i] = floor(random(150, 250));
  }

  d = floor(random(0, 3));
  backFill[d] = 0;
  next[d] = 0;

  for (i = 0; i < 3; i++) {
    centerFill.push(backFill[i]);
  }
}


function draw() {
  background(backFill);

  rectMode(CENTER);
  noStroke();
  fill(centerFill, 100);
  rect(width / 2, height / 2, 200, 200);

  transition(centerFill, next);
  
}


function transition(source, target) {
  if (millis() - timer > duration) {
    for (i = 0; i < 3; i++) {
      if (source[i] > target[i]) {
        source[i]--
      } else if (source[i] < target[i]) {
        source[i]++
      } else {
        source[i] = target[i];
      }
      timer = millis();
    }
    if (source[0] === target[0] && source[1] === target[1] && source[2] === target[2]) {
      getNext();
      console.log("bingo!");
    }
  }
}


function getNext() {
  for (i = 0; i < 3; i++) {
    next[i] = floor(random(150, 250));
  }
  d = floor(random(0, 3));
  next[d] = 0
}// refactor this? send arguments to function: source, destination, boolean?

// combine the two sketches:
// all red
// 0: backFill (red) === centerFill (red)
// 1: centerFill (red) transisios to next (blue)
// 2: backFill (red) transitions to centerFill (blue)
// all blue
// 3: backFill (blue) transitions to next (yellow)
// 4: centerFill (blue) transisions to backfill (yellow)
// all yellow

let timer = 0;
let duration = 25;
let discard;
let backFill = [];
let centerFill = [];
let next = [];

let backReady = false;
let backReadyAgain = false;
let centerReady = false;

function setup() {
  createCanvas(600, 600);

  for (i = 0; i < 3; i++) {
    backFill[i] = floor(random(150, 250));
    next[i] = floor(random(150, 250));
  }

  discard = floor(random(0, 3));
  backFill[discard] = 0;
  next[discard] = 0;

  for (i = 0; i < 3; i++) {
    centerFill.push(backFill[i]);
  }
}


function draw() {
  background(backFill);

  rectMode(CENTER);
  noStroke();
  fill(centerFill, 100);
  rect(width / 2, height / 2, 200, 200);

  // changeCenterFill();

  if (backReady) {
    backToCenter();
  } else if (backReadyAgain) {
    backToNext();
  } else if (centerReady) {
    centerToBack();
  } else {
    centerToNext();
  }

}


function transition() {
  if (millis() - timer > duration) {
    for (i = 0; i < 3; i++) {
      if (source[i] > target[i]) {
        source[i]--
      } else if (source[i] < target[i]) {
        source[i]++
      } else {
        source[i] = target[i];
      }
      timer = millis();
    }
    if (source[0] === target[0] && source[1] === target[1] && source[2] === target[2]) {
      getNext();
      
      // how to write theses? turn off above?
      backReady = false;
      backReadyAgain = true;
    }
  }  
}

function centerToNext() {
  console.log("1 centerFill > next color");
  if (millis() - timer > duration) {
    for (i = 0; i < 3; i++) {
      if (centerFill[i] > next[i]) {
        centerFill[i]--
      } else if (centerFill[i] < next[i]) {
        centerFill[i]++
      } else {
        centerFill[i] = next[i];
      }
      timer = millis();
    }
    if (centerFill[0] === next[0] && centerFill[1] === next[1] && centerFill[2] === next[2]) {
      // getNext();
      backReady = true;
    }

  }

}





function backToCenter() {
  console.log("2 backFill > centerFill");
  if (millis() - timer > duration) {
    for (i = 0; i < 3; i++) {
      if (backFill[i] > centerFill[i]) {
        backFill[i]--
      } else if (backFill[i] < centerFill[i]) {
        backFill[i]++
      } else {
        backFill[i] = centerFill[i];
      }
      timer = millis();
    }
    if (backFill[0] === centerFill[0] && backFill[1] === centerFill[1] && backFill[2] === centerFill[2]) {
      getNext();
      backReady = false;
      backReadyAgain = true;
    }
  }
}


function backToNext() {
  console.log("3 backFill > next color");
  if (millis() - timer > duration) {
    for (i = 0; i < 3; i++) {
      if (backFill[i] > next[i]) {
        backFill[i]--
      } else if (backFill[i] < next[i]) {
        backFill[i]++
      } else {
        backFill[i] = next[i];
      }
      timer = millis();
    }
    if (backFill[0] === next[0] && backFill[1] === next[1] && backFill[2] === next[2]) {
      // getNext();
      backReadyAgain = false;
      centerReady = true;
    }
  } 
}


function centerToBack() {
  console.log("4 centerFill to backFill");
  if (millis() - timer > duration) {
    for (i = 0; i < 3; i++) {
      if (centerFill[i] > backFill[i]) {
        centerFill[i]--
      } else if (centerFill[i] < backFill[i]) {
        centerFill[i]++
      } else {
        centerFill[i] = backFill[i];
      }
      timer = millis();
    }
    if (centerFill[0] === backFill[0] && centerFill[1] === backFill[1] && centerFill[2] === backFill[2]) {
      getNext();
      centerReady = false;

    }
  } 
}



function getNext() {
  for (i = 0; i < 3; i++) {
    next[i] = floor(random(150, 250));
  }
  discard = floor(random(0, 3));
  next[discard] = 0
}// change squares automatically - by seconds or framerate
// set background instead of squares

let timer = 0;
let d;
let current = [];
let next = [];

let w = 200;

function setup() {
  createCanvas(600, 600);

  for (i = 0; i < 3; i++) {
    current[i] = floor(random(150, 250));
    next[i] = floor(random(150, 250));
  }

  // discard one of the RGB values to prevent gray results
  d = floor(random(0, 3));
  current[d] = 0;
  next[d] = 0;
}


function draw() {
  background(0);

  rectMode(CENTER);
  // noStroke();

  // for (i = 20; i <= 100; i += 20) {
  //   fill(next[0], next[1], next[2], i);
  //   rect(width / 2, height / 2, i * 25, i * 25);
  // }

//   fill(next[0], next[1], next[2], 25);
//   rect(width / 2, height / 2, 500, 500);

//   fill(next[0], next[1], next[2], 50);
//   rect(width / 2, height / 2, 400, 400);

//   fill(next[0], next[1], next[2], 75);
//   rect(width / 2, height / 2, 300, 300);

	// let a = 100;
  
//   fill(next, a);
//   rect(width / 2, height / 2, 200, 200);
  
//   stroke(255, 0, 255, 100);
//   strokeWeight(10);
//   noFill();
//   rect(width / 2, height / 2, 210, 210);
  
//   stroke(255, 0, 255, 50);
//   strokeWeight(10);
//   noFill();
//   rect(width / 2, height / 2, 240, 240);
  
  
  for (i = 100; i < 0; i--) {
    stroke(255, 0, 255, i);
    strokeWeight(10);
  	noFill();
  	rect(width / 2, height / 2, w, w);
    w--;
  }
  


  if (millis() - timer > 300) {
    for (i = 0; i < 3; i++) {
      if (current[i] > next[i]) {
        current[i]--
      } else if (current[i] < next[i]) {
        current[i]++
      } else {
        current[i] = next[i];
      }
      timer = millis();
    }
    if (current[0] === next[0] && current[1] === next[1] && current[2] === next[2]) {
      getNext();
    }
  }
}

// function mouseClicked() {
//   for (i = 0; i < 3; i++) {
//     if (current[i] > next[i]) {
//       current[i]--
//     } else if (current[i] < next[i]) {
//       current[i]++
//     } else {
//       current[i] = next[i];
//     }
//   }

//   // console.log("r1: " + rect1[0] + " r2: " + rect2[0] + " g1: " + rect1[1] + " g2: " + rect2[1]);
//   if (current[0] === next[0] && current[1] === next[1] && current[2] === next[2]) {
//     getNew();
//   }
// }


function getNext() {
  for (i = 0; i < 3; i++) {
    next[i] = floor(random(150, 250));
  }
  d = floor(random(0, 3));
  next[d] = 0;

  a = 0;
}// combine the two sketches:
// all red
// 0: backFill (red) === centerFill (red)
// 1: centerFill (red) transisios to next (blue)
// 2: backFill (red) transitions to centerFill (blue)
// all blue
// 3: backFill (blue) transitions to next (yellow)
// 4: centerFill (blue) transisions to backfill (yellow)
// all yellow

let timer = 0;
let duration = 50;
let discard;
let backFill = [];
let centerFill = [];
let next = [];

let backReady = false;
let backReadyAgain = false;
let centerReady = false;

function setup() {
  createCanvas(600, 600);

  for (i = 0; i < 3; i++) {
    backFill[i] = floor(random(150, 250));
    next[i] = floor(random(150, 250));
  }

  discard = floor(random(0, 3));
  backFill[discard] = 0;
  next[discard] = 0;

  for (i = 0; i < 3; i++) {
    centerFill.push(backFill[i]);
  }
}


function draw() {
  background(backFill);

  rectMode(CENTER);
  noStroke();
  fill(centerFill, 100);
  rect(width / 2, height / 2, 200, 200);

  // changeCenterFill();

  if (backReady) {
    backToCenter();
  } else if (backReadyAgain) {
    backToNext();
  } else if (centerReady) {
    centerToBack();
  } else {
    centerToNext();
  }

}


function centerToNext() {
  console.log("1 centerFill > next color");
  if (millis() - timer > duration) {
    for (i = 0; i < 3; i++) {
      if (centerFill[i] > next[i]) {
        centerFill[i]--
      } else if (centerFill[i] < next[i]) {
        centerFill[i]++
      } else {
        centerFill[i] = next[i];
      }
      timer = millis();
    }
    if (centerFill[0] === next[0] && centerFill[1] === next[1] && centerFill[2] === next[2]) {
      // getNext();
      backReady = true;
    }

  }

}

function backToCenter() {
  console.log("2 backFill > centerFill");
  if (millis() - timer > duration) {
    for (i = 0; i < 3; i++) {
      if (backFill[i] > centerFill[i]) {
        backFill[i]--
      } else if (backFill[i] < centerFill[i]) {
        backFill[i]++
      } else {
        backFill[i] = centerFill[i];
      }
      timer = millis();
    }
    if (backFill[0] === centerFill[0] && backFill[1] === centerFill[1] && backFill[2] === centerFill[2]) {
      getNext();
      backReady = false;
      backReadyAgain = true;
    }
  }
}


function backToNext() {
  console.log("3 backFill > next color");
  if (millis() - timer > duration) {
    for (i = 0; i < 3; i++) {
      if (backFill[i] > next[i]) {
        backFill[i]--
      } else if (backFill[i] < next[i]) {
        backFill[i]++
      } else {
        backFill[i] = next[i];
      }
      timer = millis();
    }
    if (backFill[0] === next[0] && backFill[1] === next[1] && backFill[2] === next[2]) {
      getNext();
      backReadyAgain = false;
      // centerReady = true;
    }
  } 
}


// function centerToBack() {
//   console.log("4 centerFill to backFill");
//   if (millis() - timer > duration) {
//     for (i = 0; i < 3; i++) {
//       if (centerFill[i] > backFill[i]) {
//         centerFill[i]--
//       } else if (centerFill[i] < backFill[i]) {
//         centerFill[i]++
//       } else {
//         centerFill[i] = backFill[i];
//       }
//       timer = millis();
//     }
//     if (centerFill[0] === backFill[0] && centerFill[1] === backFill[1] && centerFill[2] === backFill[2]) {
//       getNext();
//       centerReady = false;

//     }
//   } 
// }



function getNext() {
  for (i = 0; i < 3; i++) {
    next[i] = floor(random(150, 250));
  }
  discard = floor(random(0, 3));
  next[discard] = 0
}// refactor this? send arguments to function: source, destination, boolean?

// combine the two sketches:
// all red
// 0: backFill (red) === centerFill (red)
// 1: centerFill (red) transisios to next (blue)
// 2: backFill (red) transitions to centerFill (blue)
// all blue
// 3: backFill (blue) transitions to next (yellow)
// 4: centerFill (blue) transisions to backfill (yellow)
// all yellow

let timer = 0;
let duration = 25;
let discard;
let backFill = [];
let centerFill = [];
let next = [];

let backReady = false;
let backReadyAgain = false;
let centerReady = false;

function setup() {
  createCanvas(600, 600);

  for (i = 0; i < 3; i++) {
    backFill[i] = floor(random(150, 250));
    next[i] = floor(random(150, 250));
  }

  discard = floor(random(0, 3));
  backFill[discard] = 0;
  next[discard] = 0;

  for (i = 0; i < 3; i++) {
    centerFill.push(backFill[i]);
  }
}


function draw() {
  background(backFill);

  rectMode(CENTER);
  noStroke();
  fill(centerFill, 100);
  rect(width / 2, height / 2, 200, 200);

  // changeCenterFill();

  if (backReady) {
    backToCenter();
  } else if (backReadyAgain) {
    backToNext();
  } else if (centerReady) {
    centerToBack();
  } else {
    centerToNext();
  }

}


function transition() {
  if (millis() - timer > duration) {
    for (i = 0; i < 3; i++) {
      if (source[i] > target[i]) {
        source[i]--
      } else if (source[i] < target[i]) {
        source[i]++
      } else {
        source[i] = target[i];
      }
      timer = millis();
    }
    if (source[0] === target[0] && source[1] === target[1] && source[2] === target[2]) {
      getNext();
      
      // how to write theses? turn off above?
      backReady = false;
      backReadyAgain = true;
    }
  }  
}

function centerToNext() {
  console.log("1 centerFill > next color");
  if (millis() - timer > duration) {
    for (i = 0; i < 3; i++) {
      if (centerFill[i] > next[i]) {
        centerFill[i]--
      } else if (centerFill[i] < next[i]) {
        centerFill[i]++
      } else {
        centerFill[i] = next[i];
      }
      timer = millis();
    }
    if (centerFill[0] === next[0] && centerFill[1] === next[1] && centerFill[2] === next[2]) {
      // getNext();
      backReady = true;
    }

  }

}





function backToCenter() {
  console.log("2 backFill > centerFill");
  if (millis() - timer > duration) {
    for (i = 0; i < 3; i++) {
      if (backFill[i] > centerFill[i]) {
        backFill[i]--
      } else if (backFill[i] < centerFill[i]) {
        backFill[i]++
      } else {
        backFill[i] = centerFill[i];
      }
      timer = millis();
    }
    if (backFill[0] === centerFill[0] && backFill[1] === centerFill[1] && backFill[2] === centerFill[2]) {
      getNext();
      backReady = false;
      backReadyAgain = true;
    }
  }
}


function backToNext() {
  console.log("3 backFill > next color");
  if (millis() - timer > duration) {
    for (i = 0; i < 3; i++) {
      if (backFill[i] > next[i]) {
        backFill[i]--
      } else if (backFill[i] < next[i]) {
        backFill[i]++
      } else {
        backFill[i] = next[i];
      }
      timer = millis();
    }
    if (backFill[0] === next[0] && backFill[1] === next[1] && backFill[2] === next[2]) {
      // getNext();
      backReadyAgain = false;
      centerReady = true;
    }
  } 
}


function centerToBack() {
  console.log("4 centerFill to backFill");
  if (millis() - timer > duration) {
    for (i = 0; i < 3; i++) {
      if (centerFill[i] > backFill[i]) {
        centerFill[i]--
      } else if (centerFill[i] < backFill[i]) {
        centerFill[i]++
      } else {
        centerFill[i] = backFill[i];
      }
      timer = millis();
    }
    if (centerFill[0] === backFill[0] && centerFill[1] === backFill[1] && centerFill[2] === backFill[2]) {
      getNext();
      centerReady = false;

    }
  } 
}



function getNext() {
  for (i = 0; i < 3; i++) {
    next[i] = floor(random(150, 250));
  }
  discard = floor(random(0, 3));
  next[discard] = 0
}// combine the two sketches:
// start: backFill === centerFill
// next: centerFill transisios to next
// then: backFill transitions to centerFill

let timer = 0;
let duration = 50;
let discard;
let backFill = [];
let centerFill = [];
let next = [];

let backReady = false;

function setup() {
  createCanvas(600, 600);

  for (i = 0; i < 3; i++) {
    backFill[i] = floor(random(150, 250));
    next[i] = floor(random(150, 250));
  }

  discard = floor(random(0, 3));
  backFill[discard] = 0;
  next[discard] = 0;

  for (i = 0; i < 3; i++) {
    centerFill.push(backFill[i]);
  }
}


function draw() {
  background(backFill);

  rectMode(CENTER);
  noStroke();
  fill(centerFill, 100);
  rect(width / 2, height / 2, 200, 200);

  // changeCenterFill();

  if (backReady) {
    changeBackFill();
  } else {
    changeCenterFill();
  }

}


function changeCenterFill() {
  if (millis() - timer > duration) {
    for (i = 0; i < 3; i++) {
      if (centerFill[i] > next[i]) {
        centerFill[i]--
      } else if (centerFill[i] < next[i]) {
        centerFill[i]++
      } else {
        centerFill[i] = next[i];
      }
      timer = millis();
    }
    if (centerFill[0] === next[0] && centerFill[1] === next[1] && centerFill[2] === next[2]) {
      getNext();
      backReady = true;
      console.log("bingo!");
    }

  }

}


function changeBackFill() {
  if (millis() - timer > duration) {
    for (i = 0; i < 3; i++) {
      if (backFill[i] > centerFill[i]) {
        backFill[i]--
      } else if (backFill[i] < centerFill[i]) {
        backFill[i]++
      } else {
        backFill[i] = centerFill[i];
      }
      timer = millis();
    }
    if (backFill[0] === centerFill[0] && backFill[1] === centerFill[1] && backFill[2] === centerFill[2]) {
      // getNext();
      backReady = false;
    }
  }
}



function getNext() {
  for (i = 0; i < 3; i++) {
    next[i] = floor(random(150, 250));
  }
  discard = floor(random(0, 3));
  next[discard] = 0
}// figure out how to gradually pump up square to next color
// so middle square should start same color as background

let timer = 0;
let d;
let backFill = [];
let centerFill = [];
let next = [];

function setup() {
  createCanvas(600, 600);

  for (i = 0; i < 3; i++) {
    backFill[i] = floor(random(150, 250));
    next[i] = floor(random(150, 250));
  }

  d = floor(random(0, 3));
  backFill[d] = 0;
  next[d] = 0;
  
  for (i = 0; i < 3; i++) {
   centerFill.push(backFill[i]); 
  }
}


function draw() {
  // background(250, 0, 150);
  background(backFill);

  rectMode(CENTER);
  noStroke();
  fill(centerFill, 100);
  rect(width / 2, height / 2, 200, 200);

  if (millis() - timer > 300) {
    for (i = 0; i < 3; i++) {
      if (centerFill[i] > next[i]) {
        centerFill[i]--
      } else if (centerFill[i] < next[i]) {
        centerFill[i]++
      } else {
        centerFill[i] = next[i];
      }
      timer = millis();
    }
    if (centerFill[0] === next[0] && centerFill[1] === next[1] && centerFill[2] === next[2]) {
      getNext();
			console.log("bingo!");
    }

  }

    // for (i = 0; i < 3; i++) {
    //   if (current[i] > next[i]) {
    //     current[i]--
    //   } else if (current[i] < next[i]) {
    //     current[i]++
    //   } else {
    //     current[i] = next[i];
    //   }
    //   timer = millis();
    // }
    // if (current[0] === next[0] && current[1] === next[1] && current[2] === next[2]) {
    //   getNext();
    // }
  }


  function getNext() {
    for (i = 0; i < 3; i++) {
      // centerFill[i] = floor(random(150, 250));
      next[i] = floor(random(150, 250));
    }
    d = floor(random(0, 3));
    // centerFill[d] = 0;
    next[d] = 0
  }// change squares automatically - by seconds or framerate
// set background instead of squares

let timer = 0;
let d;
let a = 100;
let current = [];
let next = [];


function setup() {
  createCanvas(600, 600);

  for (i = 0; i < 3; i++) {
    current[i] = floor(random(150, 250));
    next[i] = floor(random(150, 250));
  }

  // discard one of the RGB values to prevent gray results
  d = floor(random(0, 3));
  current[d] = 0;
  next[d] = 0;
}


function draw() {
  background(current);

  rectMode(CENTER);
  noStroke();

  // for (i = 20; i <= 100; i += 20) {
  //   fill(next[0], next[1], next[2], i);
  //   rect(width / 2, height / 2, i * 25, i * 25);
  // }

  fill(next[0], next[1], next[2], 25);
  rect(width / 2, height / 2, 500, 500);

  fill(next[0], next[1], next[2], 50);
  rect(width / 2, height / 2, 400, 400);

  fill(next[0], next[1], next[2], 75);
  rect(width / 2, height / 2, 300, 300);

  fill(next, a);
  rect(width / 2, height / 2, 200, 200);


  if (millis() - timer > 300) {
    for (i = 0; i < 3; i++) {
      if (current[i] > next[i]) {
        current[i]--
      } else if (current[i] < next[i]) {
        current[i]++
      } else {
        current[i] = next[i];
      }
      timer = millis();
    }
    if (current[0] === next[0] && current[1] === next[1] && current[2] === next[2]) {
      getNext();
    }
  }
}

// function mouseClicked() {
//   for (i = 0; i < 3; i++) {
//     if (current[i] > next[i]) {
//       current[i]--
//     } else if (current[i] < next[i]) {
//       current[i]++
//     } else {
//       current[i] = next[i];
//     }
//   }

//   // console.log("r1: " + rect1[0] + " r2: " + rect2[0] + " g1: " + rect1[1] + " g2: " + rect2[1]);
//   if (current[0] === next[0] && current[1] === next[1] && current[2] === next[2]) {
//     getNew();
//   }
// }


function getNext() {
  for (i = 0; i < 3; i++) {
    next[i] = floor(random(150, 250));
  }
  d = floor(random(0, 3));
  next[d] = 0;

  a = 0;
}let duration = 700;
let timer = 0;
let discard;
let current = [];
let next = [];


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // get random values for current and next RGB arrays
  for (i = 0; i < 3; i++) {
    current[i] = floor(random(150, 250));
    next[i] = floor(random(150, 250));
  }

  // discard one of the RGB values to prevent gray results
  discard = floor(random(0, 3));
  current[discard] = 0;
  next[discard] = 0;
}


function draw() {
  background(current);

  if (millis() - timer > duration) {
    for (i = 0; i < 3; i++) {
      if (current[i] > next[i]) {
        current[i]--
      } else if (current[i] < next[i]) {
        current[i]++
      } else {
        current[i] = next[i];
      }
      timer = millis();
    }
    if (current[0] === next[0] && current[1] === next[1] && current[2] === next[2]) {
      getNext();
    }
  }

}


function getNext() {
  for (i = 0; i < 3; i++) {
    next[i] = floor(random(150, 250));
  }
  discard = floor(random(0, 3));
  next[discard] = 0;
}


function windowResized() {
 resizeCanvas(windowWidth, windowHeight);
}// change squares automatically - by seconds or framerate
// set background instead of squares

let timer = 0;
let d;
let backFill = [];
let centerFill = [];


function setup() {
  createCanvas(800, 800);

  for (i = 0; i < 3; i++) {
    backFill[i] = floor(random(150, 250));
    centerFill[i] = floor(random(150, 250));
  }

  // discard one of the RGB values to prevent gray results
  d = floor(random(0, 3));
  backFill[d] = 0;
  centerFill[d] = 0;
}


function draw() {
  background(backFill);

  noStroke();
  // fill(backFill[0], backFill[1], backFill[2]);
  // rect(200, height / 2, 200, 200);

  fill(centerFill);
  rect(400, height / 2, 200, 200);

  if (millis() - timer > 300) {
    for (i = 0; i < 3; i++) {
      if (backFill[i] > centerFill[i]) {
        backFill[i]--
      } else if (backFill[i] < centerFill[i]) {
        backFill[i]++
      } else {
        backFill[i] = centerFill[i];
      }
      timer = millis();
    }
    if (backFill[0] === centerFill[0] && backFill[1] === centerFill[1] && backFill[2] === centerFill[2]) {
      getNext();
    }
  }

}

// function mouseClicked() {
//   for (i = 0; i < 3; i++) {
//     if (backFill[i] > centerFill[i]) {
//       backFill[i]--
//     } else if (backFill[i] < centerFill[i]) {
//       backFill[i]++
//     } else {
//       backFill[i] = centerFill[i];
//     }
//   }

//   // console.log("r1: " + rect1[0] + " r2: " + rect2[0] + " g1: " + rect1[1] + " g2: " + rect2[1]);
//   if (backFill[0] === centerFill[0] && backFill[1] === centerFill[1] && backFill[2] === centerFill[2]) {
//     getNew();
//   }
// }


function getNext() {
  for (i = 0; i < 3; i++) {
    centerFill[i] = floor(random(150, 250));
  }
  d = floor(random(0, 3));
  centerFill[d] = 0;
}// turn into an index
// throw out one
// compare with is left
// change accordingly

let d;
rect1 = [];
rect2 = [];


function setup() {
  createCanvas(800, 800);

  for (i = 0; i < 3; i++) {
    rect1[i] = floor(random(150, 255));
    rect2[i] = floor(random(150, 255));
  }

  // discard one of the RGB values to prevent gray results
  d = floor(random(0, 3));
  rect1[d] = 0;
  rect2[d] = 0;
}


function draw() {
  background(255);

  fill(rect1[0], rect1[1], rect1[2]);
  rect(200, height / 2, 200, 200);

  fill(rect2[0], rect2[1], rect2[2]);
  rect(400, height / 2, 200, 200);
}


function mouseClicked() {
  for (i = 0; i < 3; i++) {
    if (rect1[i] > rect2[i]) {
      rect1[i]--
    } else if (rect1[i] < rect2[i]) {
      rect1[i]++
    } else {
      rect1[i] = rect2[i];
    }
  }

  // console.log("r1: " + rect1[0] + " r2: " + rect2[0] + " g1: " + rect1[1] + " g2: " + rect2[1]);

  if (rect1[0] === rect2[0] && rect1[1] === rect2[1] && rect1[2] === rect2[2]) {
    getNew();
  }
}


function getNew() {
  for (i = 0; i < 3; i++) {
    rect2[i] = floor(random(150, 255));

    d = floor(random(0, 3));
    rect2[d] = 0;
  }
}
// turn into an index
// throw out one
// compare with is left
// change accordingly

let s = 1;
rect1 = [];
rect2 = [];


function setup() {
  createCanvas(800, 800);

  for (i = 0; i < 3; i++) {
    rect1[i] = floor(random(175, 255));
    rect2[i] = floor(random(175, 255));
  }
  
  

}

function draw() {
  background(255);

  strokeWeight(s);
  fill(rect1[0], rect1[1], rect1[2]);
  rect(200, height / 2, 200, 200);

  fill(rect2[0], rect2[1], rect2[2]);
  rect(400, height / 2, 200, 200);
}


function mouseClicked() {
  for (i = 0; i < 3; i++) {
    if (rect1[i] > rect2[i]) {
      rect1[i]--
    } else if (rect1[i] < rect2[i]) {
      rect1[i]++
    } else {
      rect1[i] = rect2[i];
    }
  }

  console.log("r1: " + rect1[0] + " r2: " + rect2[0] + " g1: " + rect1[1] + " g2: " + rect2[1]);

  if (rect1[0] === rect2[0] && rect1[1] === rect2[1] && rect1[2] === rect2[2]) {
    s = 4;
  }
}// turn into an index
// throw out one
// compare with is left
// change accordingly

let r1, g1, b1;
let r2, g2, b2;

function setup() {
  createCanvas(800, 800);

  r1 = floor(random(200, 225));
  g1 = floor(random(200, 255));
  b1 = floor(random(200, 255));

  r2 = 240;
  g2 = 255;
  b2 = 245;
  // r2 = floor(random(175,255));

}

function draw() {
  background(255);


  fill(r1, g1, b1);
  rect(200, height / 2, 200, 200);

  fill(r2, g2, b2);
  rect(400, height / 2, 200, 200);

  if (r1 === r2 && g1 === g2) {
    console.log("change complete");
  }
}


function mouseClicked() {
  // if (r1 != r2) {
  //   r1++;
  // } else {
  //  r1 = r2; 
  // }

  if (r1 > r2) {
    r1--
  } else if (r1 < r2) {
    r1++
  } else {
    r1 = r2;
  }

  if (g1 > g2) {
    g1--
  } else if (g1 < g2) {
    g1++
  } else {
    g1 = g2;
  }


  // console.log("r1: " + r1 + " r2: " + r2 + " b1: " + b1 + " b2: " + b2);
}let timer = 0;
let col;

function setup() {
  createCanvas(windowWidth, windowHeight);
  col = random(0, 360);
}

function draw() {
  colorMode(HSB, 360, 100, 100);
  background(col, 75, 100);

  if (millis() - timer > 60000) {
    if (col === 361) {
      col = 0
    } else {
      col++;
    }
    timer = millis();
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}let timer = 0;
let col = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  colorMode(HSB, 360, 100, 100);
  background(col, 75, 100);

  if (millis() - timer > 60000) {
    if (col === 361) {
      col = 0
    } else {
      col++;
    }
    timer = millis();
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}let timer = 0;
let col = 0;

function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  colorMode(HSB, 360, 100, 100);
  background(col, 75, 100);

//   noStroke();
//   fill(50, 50, 100);
//   rect(width / 2, height / 2, 200, 200);

//   let s = second();
//   text('Current second:\n' + s, 5, 50);

  if (millis() - timer > 60000) {
    if (col === 361) {
      col = 0
    } else {
      col++;
    }
    timer = millis();
  }
}

// function mouseClicked() {
//   if (col === 361) {
//     col = 0
//   } else {
//     col++;
//   }
// }// let col = 0;

function setup() {
  frameRate(30);
  createCanvas(800, 800);
}

function draw() {
  frameRate(1);
  colorMode(HSB, 360, 100, 100);
  background(frameCount % 360, 50, 100);

  console.log(frameCount % 360);

  fill(50, 50, 100);
  rect(width / 2, height / 2, 200, 200);		
}

// function mouseClicked() {
//   if (col === 361) {
//     col = 0
//   } else {
//     col++;
//   }
// }
// need to add in copy from camera into rects

var capture;

var polygons = []
var amount = 10;

var x, y, a;


function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide();

  //   for (int i = 0; i < polygons0.length; i++) {
  //   getValues();
  //   polygons0[i] = new Polygon0(x, y, a);
  // }

  polygons = new Polygon([amount]);

  for (let i = 0; i < polygons.length; i++) {
    getValues();
    polygons[i] = new Polygon(x, y, a);
  }


}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  background(255);


  push();
  translate(width, 0);
  scale(-1, 1);
  // imageMode(CENTER);
  image(capture, 0, 0, width, height);
  pop();

  for (let i = 0; i < polygons.length; i++) {
    if (polygons[i].dragging == true) {
      polygons[i].update(mouseX, mouseY);
    }
    polygons[i].display();
  }

  // noCursor();
}


function getValues() {
  x = int(random(width * (0.95)));
  y = int(random(height * (0.95)));
  a = int(random(160, 255));
}


function mousePressed() {
  for (let i = 0; i < polygons0.length; i++) {
    polygons0[i].pressed(mouseX, mouseY);
  }

  for (let i = 0; i < polygons1.length; i++) {
    polygons1[i].pressed(mouseX, mouseY);
  }
}


function mouseReleased() {
  for (let i = 0; i < polygons0.length; i++) {
    polygons0[i].notPressed();
  }

  for (let i = 0; i < polygons1.length; i++) {
    polygons1[i].notPressed();
  }
}


function Polygon(x, y, a) {
  this.x = x;
  this.y = y;
  this.a = a;
  this.w = 50;
  this.h = 50;
  this.offsetX = 0;
  this.offsetY = 0;
  this.dragging = false;
  this.rollover = false;

  this.update = function() {
    this.x = px + this.offsetX;
    this.y = py + this.offsetY;
  }

  this.display = function() {
    noStroke();
    fill(this.c, 90, 80, this.a);
    rect(this.x, this.y, this.w, this.h);
  }

  this.pressed = function(i, px, py) {
    if (px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h) {
      this.dragging = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      return true;
    } else {
      return false;
    }
  }

  this.notPressed = function() {
    this.dragging = false;
  }

}

// class Polgyon {
//   constructor(x, y, a) {
//     this.x = x;
//     this.y = y;
// 		this.a = a;
//     this.offsetX = 0;
//     this.offsetY = 0;
//     this.dragging = false;
//     this.rollover = false;
//   }

// 	update(px,py) {
// 		this.x = px + this.offsetX;
//     this.y = py + this.offsetY;
// 	}

//   show() {
// 		noStroke();
// 		fill(this.c,90,80,this.a);
//     rect(this.x, this.y, this.w, this.h);
//   }

//   pressed(i, px, py) {
//     if (px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h) {
//       this.dragging = true;
// 			this.offsetX = this.x - mouseX;
// 			this.offsetY = this.y - mouseY;
// 			return true;
//     } else {
// 		  return false;
// 		}
//   }

//   notPressed() {
//       this.dragging = false;
//   }
// }let totalImages = 20;
let images = [];
let imageIndex = 0
let loading = true;
let counter = 0;

let rectangles = [];
let margin = 20

let rows = 10;
let cols = 5;

let outer;


function myImages(index, filename) {
  loadImage(filename, imageLoaded, error);

  function imageLoaded(img) {
    // console.log(index + ' ' + filename);
    images[index] = img;

    counter++;
    if (counter == totalImages) {
      loading = false;
      // console.log(floor(millis()) + ' milliseconds');
    }
  }

  function error(err) {
    console.log(err);
  }
}


function setup() {
  createCanvas(4000, 4000);

  for (var i = 0; i < totalImages; i++) {
    images[i] = myImages(i, "assets/" + i + ".jpg");
  }

  outer = loadImage("assets/outer.jpg");

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      let w = 244;  //488
      let h = 357;  //713
      let rectX = x * w + margin + margin * x;
      let rectY = y * h + margin + margin * y;
      if (imageIndex < totalImages) {
        // rectangles[imageIndex] = new Rectangle(rectX, rectY, w, h, images[imageIndex]);
        rectangles[imageIndex] = new Rectangle(rectX, rectY, w, h, imageIndex);
        imageIndex++
      }
    }
  }

  // for (let i = 0; i < total; i++) {
  //   let x = 50;
  //   let y = 50;
  //   let w = 50;
  //   let h = 50;
  //   rectangles[i] = new Rectangle(x + i * 50, y, w, h);
  // }
}


function draw() {
  background(50);

  if (loading) {
    background(50);

    stroke(100);
    noFill();
    rect(20, 20, windowWidth / 2, 40);

    noStroke();
    fill(200);
    let w = (windowWidth / 2) * counter / totalImages;
    rect(20, 20, w, 40);

  } else {
    for (i = 0; i < totalImages; i++) {
      rectangles[i].display();
      // rectangles[0].show();
    }
  }
}


class Rectangle {
  constructor(x, y, w, h, index) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.index = index;
    this.face = false;
  }

  display() {
    noFill();
    noStroke();
    // stroke(255);
    // rect(this.x, this.y, this.w, this.h);
    // image(images[this.index], this.x, this.y, this.w, this.h);

    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.face = true;
    } else {
      image(outer, this.x, this.y, this.w, this.h);
    }

    if (this.face) {
      image(images[this.index], this.x, this.y, this.w, this.h);
    }

  }

}let totalImages = 10;
let images = [];
let imageIndex = 0
let loading = true;
let counter = 0;

let rectangles = [];
let margin = 20

let rows = 10;
let cols = 5;

let outer;


function myImages(index, filename) {
  loadImage(filename, imageLoaded, error);

  function imageLoaded(img) {
    // console.log(index + ' ' + filename);
    images[index] = img;

    counter++;
    if (counter == totalImages) {
      loading = false;
      // console.log(floor(millis()) + ' milliseconds');
    }
  }

  function error(err) {
    console.log(err);
  }
}


function setup() {
  createCanvas(3000, 3000);

  for (var i = 0; i < totalImages; i++) {
    images[i] = myImages(i, "assets/" + i + ".jpg");
  }

  outer = loadImage("assets/testCover.jpg");

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      let w = 488;
      let h = 713;
      let rectX = x * w + margin + margin * x;
      let rectY = y * h + margin + margin * y;
      if (imageIndex < totalImages) {
        // rectangles[imageIndex] = new Rectangle(rectX, rectY, w, h, images[imageIndex]);
        rectangles[imageIndex] = new Rectangle(rectX, rectY, w, h, imageIndex);
        imageIndex++
      }
    }
  }

  // for (let i = 0; i < total; i++) {
  //   let x = 50;
  //   let y = 50;
  //   let w = 50;
  //   let h = 50;
  //   rectangles[i] = new Rectangle(x + i * 50, y, w, h);
  // }
}


function draw() {
  background(50);

  if (loading) {
    background(50);

    stroke(100);
    noFill();
    rect(20, 20, width / 2, 40);

    noStroke();
    fill(200);
    let w = (width / 2) * counter / totalImages;
    rect(20, 20, w, 40);

  } else {
    for (i = 0; i < totalImages; i++) {
      rectangles[i].display();
      // rectangles[0].show();
    }
  }
}


class Rectangle {
  constructor(x, y, w, h, index) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.index = index;
    this.face = false;
  }

  display() {
    noFill();
    noStroke();
    // stroke(255);
    // rect(this.x, this.y, this.w, this.h);
    // image(images[this.index], this.x, this.y, this.w, this.h);

    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.face = true;
    } else {
      image(outer, this.x, this.y, this.w, this.h);
    }

    if (this.face) {
      image(images[this.index], this.x, this.y, this.w, this.h);
    }

  }

}let rectangles = [];
let index = 0
let total = 10;
let margin = 20

let rows = 4;
let cols = 3;


function setup() {
  createCanvas(2000, 2000);

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      let w = 50;
      let h = 50;
      let rectX = x * w + margin + margin * x;
      let rectY = y * h + margin + margin * y;
      if (index < total) {
        rectangles[index] = new Rectangle(rectX, rectY, w, h)
        index++
      }
    }
  }

  // for (let i = 0; i < total; i++) {
  //   let x = 50;
  //   let y = 50;
  //   let w = 50;
  //   let h = 50;
  //   rectangles[i] = new Rectangle(x + i * 50, y, w, h);
  // }
}



function draw() {
  background(50);

  for (i = 0; i < rectangles.length; i++) {
    rectangles[i].show();
  }
}


class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show() {
    noFill();
    stroke(255);
    rect(this.x, this.y, this.w, this.h);
  }
}// ref: https://forum.processing.org/two/discussion/22996/repeat-an-image-as-a-background

let totalImages = 10;
let images = [];
let imageIndex = 0
let loading = true;
let counter = 0;

let cols = 4;
let rows = 5;

let imageWidth;
let imageHeight;
let margin = 20;

function myImages(index, filename) {
  loadImage(filename, imageLoaded, error);

  function imageLoaded(img) {
    console.log(index + ' ' + filename);
    images[index] = img;

    counter++;
    if (counter == totalImages) {
      loading = false;
      console.log(floor(millis()) + ' milliseconds');
    }
  }

  function error(err) {
    console.log(err);
  }
}


function setup() {
  createCanvas(4000, 4000);

  for (var i = 0; i < totalImages; i++) {
    images[i] = myImages(i, "assets/" + i + ".jpg");
  }
}


function draw() {
  background(50);

  if (loading) {
    background(50);

    stroke(102, 204, 204);
    noFill();
    rect(20, 20, width / 2, 40);

    noStroke();
    fill(102, 204, 204, 100);
    let w = (width / 2) * counter / totalImages;
    rect(20, 20, w, 40);

  } else {
    displayImages();
  }
}


function displayImages() {

  imageWidth = images[imageIndex].width;
  imageHeight = images[imageIndex].height;

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      image(images[imageIndex], (x * imageWidth + margin + margin * x), (y * imageHeight + margin + margin * y), imageWidth, imageHeight);
      // image(images[imageIndex], (LRmargin + x * imageWidth), (y * imageHeight + TBmargin + TBmargin * y), imageWidth, imageHeight);
      imageIndex++;
    }
  }

}
let img;
let tileW;
let tileH;

function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage("assets/7.jpg");
}

function draw() {
  background(220);
  
  let tileW = img.width/4;
  let tileH = img.height/4
  
	imageMode(CORNER);
  image(img, 100, 100, img.width/4, img.height/4);
  
  imageMode(CENTER);
  if (mouseX > 100 && mouseX < tileW +100 && mouseY > 100 && mouseY < tileH + 100) {
    image(img, (tileW/2)+100, (tileH/2)+100, img.width/3, img.height/3);
  }
 
  
  // display larger image at this.x, thix.y
}// references: https://forum.processing.org/two/discussion/22996/repeat-an-image-as-a-background

let cols = 5;
let rows = 5;
 
let img;
 
function setup (){
  createCanvas(1800,1800);
  img = loadImage("0.jpg");
  // cols = 5;
  // rows = 5;
  //if (width%backimage.width > 0) {cols++;}
  //if (height%backimage.height > 0) {rows++;}
  //println (cols);
}

function draw (){
  for (var y=0; y < rows; y++){
    for (var x = 0; x < cols; x++){
      image (img, x*img.width, y*img.height);
    }
  }
}


// ref: https://forum.processing.org/two/discussion/22996/repeat-an-image-as-a-background

let totalImages = 20;
let images = [];
let imageIndex = 0
let loading = true;
let counter = 0;

let cols = 10;
let rows = 5;

let imageWidth = 200;
let imageHeight = 320;
let LRmargin = 20;
let TBmargin = 20;
// let imageX;
// let imageY;

function myImages(index, filename) {
  loadImage(filename, imageLoaded, error);

  function imageLoaded(img) {
    // console.log(index + ' ' + filename);
    images[index] = img;

    counter++;
    if (counter == totalImages) {
      loading = false;
      // console.log(floor(millis()) + ' milliseconds');
    }
  }

  function error(err) {
    console.log(err);
  }
}


function setup() {
  createCanvas(2000, 2000);

  for (var i = 0; i < totalImages; i++) {
    images[i] = myImages(i, "assets/" + i + ".jpg");
  }
}


function draw() {
  background(50);

  if (loading) {
    background(50);

    stroke(102, 204, 204);
    noFill();
    rect(20, 20, width / 2, 40);

    noStroke();
    fill(102, 204, 204, 100);
    let w = (width / 2) * counter / totalImages;
    rect(20, 20, w, 40);

  } else {
    displayImages();
  }
}


function displayImages() {

  imageWidth = images[imageIndex].width;
  imageHeight = images[imageIndex].height;
  
  // imageX = x * imageWidth + LRmargin + LRmargin*x;
  // imageY = y * imageHeight + TBmargin + TBmargin*y;

  // for (var y = 0; y < rows; y++) {
  //   for (var x = 0; x < cols; x++) {
  //     image(images[imageIndex], (x * imageWidth), (y * imageHeight), imageWidth, imageHeight);
  //     imageIndex++;
  //   }
  // }

  // trying margin
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      // image(images[imageIndex], (LRmargin + x * imageWidth), (y * imageHeight + TBmargin + TBmargin*y), imageWidth, imageHeight);
      image(images[imageIndex], (x * imageWidth + LRmargin + LRmargin*x), (y * imageHeight + TBmargin + TBmargin*y), imageWidth, imageHeight);
      // image(images[imageIndex], imageX, imageY, imageWidth, imageHeight);
      imageIndex++;
      // LRmargin += 20;
      // if (LRmargin == 120) {
      //   LRmargin = 20;
      // }
    }
  }

}// the answers
// Ellen Nickles
// ellenickles.com

// References:
// Jeremey Douglass: https://forum.processing.org/two/discussion/18924/image-sequence-mousex
// Daniel Shiffman: https://www.youtube.com/watch?v=UWgDKtvnjIU
// xna: https://forum.processing.org/two/discussion/24149/scale-an-image-according-to-the-adaptive-canvas-size


let totalImages = 152;
let images = [];
let imageIndex = 0
let indexValue = 0;
let loading = true;
let counter = 0;

let fullResolutionWidth = 1280;
let imageWidth;
let imageHeight;
let imageStartWidth;
let imageEndWidth;
let imageStartHeight;
let imageEndHeight;
let imageRatio;
let centerX;
let centerY;
let sound;


function myImages(index, filename) {
  loadImage(filename, imageLoaded, error);

  function imageLoaded(img) {
    // console.log(index + ' ' + filename);
    images[index] = img;

    counter++;
    if (counter == totalImages) {
      loading = false;
      // console.log(floor(millis()) + ' milliseconds');
    }
  }

  function error(err) {
    console.log(err);
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  soundFormats('mp3', 'ogg');
  sound = loadSound("assets/pageFlip.mp3");

  for (var i = 0; i < totalImages; i++) {
    images[i] = myImages(i, "assets/" + i + ".jpg");
  }
}


function draw() {
  background(255);

  if (loading) {
    background(255);

    stroke(102, 204, 204);
    noFill();
    rect(width / 4, height / 2, width / 2, 40);

    noStroke();
    fill(102, 204, 204, 100);
    let w = (width / 2) * counter / totalImages;
    rect(width / 4, height / 2, w, 40);

  } else {
    displayImages();
  }
}


function displayImages() {

  centerX = windowWidth / 2;
  centerY = windowHeight / 2;
  
  imageWidth = images[imageIndex].width;
  imageHeight = images[imageIndex].height;
  imageRatio = imageWidth / imageHeight;
  updateImageStartEndWidth();
  updateImageStartEndHeight()

  if (windowWidth < fullResolutionWidth) {
    imageWidth = windowWidth;
    imageHeight = imageWidth / imageRatio;
    updateImageStartEndWidth();
    updateImageStartEndHeight();
  }
  
  imageMode(CENTER);
  if (mouseX > imageStartWidth && mouseX < imageEndWidth && mouseY > imageStartHeight && mouseY < imageEndHeight) {
    imageIndex = floor(map(mouseX, imageStartWidth, imageEndWidth, 0, images.length));
    
  }
  image(images[imageIndex], centerX, centerY, imageWidth, imageHeight);

  if (indexValue != imageIndex) {
    sound.playMode('restart');
    sound.play();
    indexValue = imageIndex;
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateImageStartEndWidth();
}


function updateImageStartEndWidth() {
  imageStartWidth = (windowWidth - imageWidth) / 2;
  imageEndWidth = imageStartWidth + imageWidth;
}


function updateImageStartEndHeight() {
  imageStartHeight = (windowHeight - imageHeight) / 2;
  imageEndHeight = imageStartHeight + imageHeight;
}// the answers
// Ellen Nickles
// ellenickles.com

// References:
// Jeremey Douglass: https://forum.processing.org/two/discussion/18924/image-sequence-mousex
// Daniel Shiffman: https://www.youtube.com/watch?v=UWgDKtvnjIU
// xna: https://forum.processing.org/two/discussion/24149/scale-an-image-according-to-the-adaptive-canvas-size

// figure out Mobile!

let totalImages = 152;
let images = [];
let imageIndex = 0
let indexValue = 0;
let loading = true;
let counter = 0;

let fullResolutionWidth = 1280;
let imageWidth;
let imageHeight;
let imageStartWidth;
let imageEndWidth;
let imageStartHeight;
let imageEndHeight;
let imageRatio;
let centerX;
let centerY;
let sound;

function myImages(index, filename) {
  loadImage(filename, imageLoaded, error);

  function imageLoaded(img) {
    // console.log(index + ' ' + filename);
    images[index] = img;

    counter++;
    if (counter == totalImages) {
      loading = false;
      // console.log(floor(millis()) + ' milliseconds');
    }
  }

  function error(err) {
    console.log(err);
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  if (windowWidth > fullResolutionWidth) {
    // imageEndWidth = imageStartWidth + imageWidth; // repeated below in displayImages()
    updateImageEndWidth();
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  soundFormats('mp3', 'ogg');
  sound = loadSound("assets/pageFlip.mp3");

  for (var i = 0; i < totalImages; i++) {
    images[i] = myImages(i, "assets/" + i + ".jpg");
  }
}


function draw() {
  background(255);

  if (loading) {
    background(255);

    stroke(102, 204, 204);
    noFill();
    rect(width / 4, height / 2, width / 2, 40);

    noStroke();
    fill(102, 204, 204, 100);
    let w = (width / 2) * counter / totalImages;
    rect(width / 4, height / 2, w, 40);

  } else {
    displayImages();
  }
}


function displayImages() {

  imageWidth = images[imageIndex].width;
  imageHeight = images[imageIndex].height;
  imageRatio = imageWidth / imageHeight;
  imageStartWidth = (windowWidth - imageWidth) / 2;
  // imageEndWidth = imageStartWidth + imageWidth; // >>>>>>> duplicate
  updateImageEndWidth();
  // imageStartHeight = (windowHeight - imageHeight) / 2; // >>>>>>> duplicate
  // imageEndHeight = imageStartHeight + imageHeight; // >>>>>>> duplicate
  updateImageHeight()
  centerX = windowWidth / 2;
  centerY = windowHeight / 2;

  if (windowWidth < imageWidth) {
    imageWidth = windowWidth;
    imageHeight = imageWidth / imageRatio;
    // updateImageHeight();
    imageStartHeight = (windowHeight - imageHeight) / 2; // repeated above
    imageEndHeight = imageStartHeight + imageHeight; // repeated above
  }

  imageMode(CENTER);

  // only display pages when mouse is inside images...
  // if (mouseX > imageEndWidth && mouseY > imageStartHeight && mouseY < imageEndHeight) {
  //   image(images[images.length - 1], centerX, centerY, imageWidth, imageHeight);
  // } else if (mouseX < imageStartWidth && mouseY > imageStartHeight && mouseY < imageEndHeight) {
  //   image(images[images.length - totalImages], centerX, centerY, imageWidth, imageHeight);
  // } else {
  //   if (mouseY > imageStartHeight && mouseY < imageEndHeight) {
  //     imageIndex = int(map(mouseX, 0, imageEndWidth, 0, images.length));
  //   }
  //   image(images[imageIndex], centerX, centerY, imageWidth, imageHeight);
  // }

  if (mouseX > imageStartWidth && mouseX < imageEndWidth && mouseY > imageStartHeight && mouseY < imageEndHeight) {
    imageIndex = int(map(mouseX, imageStartWidth, imageEndWidth, 0, images.length));
  }
  image(images[imageIndex], centerX, centerY, imageWidth, imageHeight);


  if (indexValue != imageIndex) {
    sound.playMode('restart');
    sound.play();
    indexValue = imageIndex;
  }
}


function updateImageEndWidth() {
  imageEndWidth = imageStartWidth + imageWidth
}

function updateImageHeight() {
  imageStartHeight = (windowHeight - imageHeight) / 2; // repeated above
  imageEndHeight = imageStartHeight + imageHeight; // repeated above
}// interact with "the answers"
// by Ellen Nickles
// ellenickles.com

// With help from:
// Jeremey Douglass: https://forum.processing.org/two/discussion/18924/image-sequence-mousex
// Daniel Shiffman: https://www.youtube.com/watch?v=UWgDKtvnjIU
// xna: https://forum.processing.org/two/discussion/24149/scale-an-image-according-to-the-adaptive-canvas-size

let totalImages = 152;
let images = [];
let imageIndex = 0
let indexValue = 0;
let loading = true;
let counter = 0;

let fullResolutionWidth = 1280;
let imageWidth;
let imageHeight;
let imageStartWidth;
let imageEndWidth;
let imageRatio;
let centerW;
let centerH;
let sound;

function myImages(index, filename) {
  loadImage(filename, imageLoaded, error);

  function imageLoaded(img) {
    // console.log(index + ' ' + filename);
    images[index] = img;

    counter++;
    if (counter == totalImages) {
      loading = false;
      // console.log(floor(millis()) + ' milliseconds');
    }
  }

  function error(err) {
    console.log(err);
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  if (windowWidth > fullResolutionWidth) {
    imageEndWidth = imageStartWidth + imageWidth; // repeated below in displayImages()
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  soundFormats('mp3', 'ogg');
  sound = loadSound("assets/pageFlip.mp3");

  for (var i = 0; i < totalImages; i++) {
    images[i] = myImages(i, "assets/" + i + ".jpg");
  }
}


function draw() {
  background(255);

  if (loading) {
    background(255);

    stroke(102, 204, 204);
    noFill();
    rect(width / 4, height / 2, width / 2, 40);

    noStroke();
    fill(102, 204, 204, 100);
    let w = (width / 2) * counter / totalImages;
    rect(width / 4, height / 2, w, 40);

  } else {
    displayImages();
  }
}


function displayImages() {
  
  imageWidth = images[imageIndex].width;
  imageHeight = images[imageIndex].height;
  imageRatio = imageWidth / imageHeight;
  imageStartWidth = (windowWidth - imageWidth) / 2;
  imageEndWidth = imageStartWidth + imageWidth; // >>>>>>> duplicate
  imageStartHeight = (windowHeight - imageHeight) / 2; // >>>>>>> duplicate
  imageEndHeight = imageStartHeight + imageHeight; // >>>>>>> duplicate
  centerX = windowWidth / 2;
  centerY = windowHeight / 2;

  if (windowWidth < imageWidth) {
    imageWidth = windowWidth;
    imageHeight = imageWidth / imageRatio;
    imageStartHeight = (windowHeight - imageHeight) / 2; // repeated above
    imageEndHeight = imageStartHeight + imageHeight; // repeated above
    // imageSettings();
  }

  imageMode(CENTER);

  if (mouseX > imageEndWidth) {
    image(images[images.length - 1], centerX, centerY, imageWidth, imageHeight);
  } else if (mouseX < imageStartWidth && mouseY > imageStartHeight) {
    image(images[images.length - totalImages], centerX, centerY, imageWidth, imageHeight);
  } else {
    if (mouseY > imageStartHeight && mouseY < imageEndHeight) {
      imageIndex = int(map(mouseX, 0, imageEndWidth, 0, images.length));
    }
    image(images[imageIndex], centerX, centerY, imageWidth, imageHeight);
  }

  if (indexValue != imageIndex) {
    sound.playMode('restart');
    sound.play();
    indexValue = imageIndex;
  }
}

// function imageSettings() {

// }// https://forum.processing.org/two/discussion/24149/scale-an-image-according-to-the-adaptive-canvas-size

let answer; //image 
let moonCopy; //resized image of the image (visible)
let imageRatio; //ratio of the image w/h    

function preload() {
  answer = loadImage("0.jpg", img => answerCopy = img.get());
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageRatio = answer.width / answer.height;
  print("imageRatio: " + imageRatio);
  print(answer.width + " " + answer.height);
}

function draw() {
  background(255);
  imageMode(CENTER);
  image(answerCopy, windowWidth/2, windowHeight/2);
  // if (windowWidth < moon.width) {
  //   moonCopy = moon.get();
  //   moonCopy.resize(windowWidth, 0);
  // }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  print("resizing to: " + windowWidth + " " + windowHeight);
  if (windowWidth < answer.width){
        answerCopy = answer.get();
        answerCopy.resize(windowWidth,0);
    }
}let img;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage("0.jpg", img => moonCopy = img.get());
}

function draw() {
  background(220);
  // rectMode(CENTER);
  // fill(0);
  // rect(windowWidth / 2, windowHeight / 2, windowWidth / 5, windowHeight / 5);
	
  imageMode(CENTER);
  image(img, windowWidth / 2, windowHeight / 2, windowWidth / 2, windowHeight / 3);
}// https://forum.processing.org/two/discussion/18924/image-sequence-mousex

/** Mouse Animation
 *  2016-11-08 Jeremy Douglass - Processing 3.2.2
 *  move mouse left and right to change image
 *  t
 **/

// + Shiffman loading animation

let totalImages = 152;
let images = [];
let imageIndex = 0
let indexValue = 0;
let loading = true;
let counter = 0;
let sound;


function myImages(index, filename) {
  loadImage(filename, imageLoaded, error);

  function imageLoaded(img) {
    // console.log(index + ' ' + filename);
    images[index] = img;

    counter++;
    if (counter == totalImages) {
      loading = false;
      console.log(floor(millis()) + ' milliseconds');
    }
  }

  function error(err) {
    console.log(err);
  }
}


// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }


function setup() {
  let canvas = createCanvas(1280, 800);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);

  soundFormats('ogg', 'mp3');
  sound = loadSound("assets/pageFlip.mp3");

  for (var i = 0; i < totalImages; i++) {
    images[i] = myImages(i, "assets/" + i + ".jpg");
  }
}


function draw() {
  if (loading) {
    background(255);

    stroke(102, 204, 204);
    noFill();
    rect(width / 4, height / 2, width / 2, 40);

    noStroke();
    fill(102, 204, 204, 100);
    let w = (width / 2) * counter / totalImages;
    rect(width / 4, height / 2, w, 40);

  } else {
    displayImages();
  }
}

function displayImages() {
  if (mouseX > width) {
    image(images[images.length - 1], 0, 0);
  } else if (mouseX < 0) {
    image(images[images.length - totalImages], 0, 0);
  } else {
    imageIndex = int(map(mouseX, 0, width, 0, images.length));
    image(images[imageIndex], 0, 0, 1280, 800);
  }

  if (indexValue != imageIndex) {
    sound.playMode('restart');
    sound.play();
    indexValue = imageIndex;
  }
}// https://forum.processing.org/two/discussion/18924/image-sequence-mousex

/** Mouse Animation
 *  2016-11-08 Jeremy Douglass - Processing 3.2.2
 *  move mouse left and right to change image
 *  t
 **/

// + Shiffman loading animation

let totalImages = 152;
let images = [];
let imageIndex = 0
let loading = true;
let counter = 0;


function myImages(index, filename) {
  loadImage(filename, imageLoaded, error);

  function imageLoaded(img) {
    console.log(index + ' ' + filename);
    images[index] = img;

    counter++;
    if (counter == totalImages) {
      loading = false;
      console.log(floor(millis()) + ' milliseconds');
    }
  }

  function error(err) {
    console.log(err);
  }
}

function setup() {
  canvas = createCanvas(1280, 800);
  canvas.position(0, 0);

  for (var i = 0; i < totalImages; i++) {
    images[i] = myImages(i, "assets/" + i + ".jpg");
  }
}


function draw() {
  if (loading) {
    background(255);

    stroke(102, 204, 204);
    noFill();
    rect(width / 4, height / 2, width / 2, 40);

    noStroke();
    fill(102, 204, 204, 100);
    let w = (width / 2) * counter / totalImages;
    rect(width / 4, height / 2, w, 40);

  } else {
    displayImages();
  }
  // console.log(mouseX);
}

function displayImages() {
  if (mouseX > width) {
    image(images[images.length - 1], 0, 0);
  } else {
    imageIndex = int(map(mouseX, 0, width, 0, images.length));
    image(images[imageIndex], 0, 0);
  }
}function setup() {
  createCanvas(1280, 800);
}

function draw() {
  background(220);
  
  stroke(0);
  noFill();
  rect(width/4, height/2, width/2, 40);
  
  noStroke();
  fill(255,100);
  let w = mouseX;
  rect(width/4, height/2, w, 40);
  
}// https://forum.processing.org/two/discussion/18924/image-sequence-mousex

/** Mouse Animation
 *  2016-11-08 Jeremy Douglass - Processing 3.2.2
 *  move mouse left and right to change image
 *  https:// forum.processing.org/two/discussion/18924/image-sequence-mousex
 **/

// + Shiffman loading animation

let totalImages = 152;
let images = [];
let imageIndex = 0
let loading = true;
let counter = 0;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function myImages(index, filename) {
  loadImage(filename, imageLoaded, error);

  function imageLoaded(img) {
    console.log(index + ' ' + filename);
    images[index] = img;

    counter++;
    if (counter == totalImages) {
      loading = false;
      console.log(floor(millis()) + ' milliseconds');
    }
  }

  function error(err) {
    console.log(err);
  }
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);

  for (var i = 0; i < totalImages; i++) {
    images[i] = myImages(i, "assets/" + i + ".jpg");
  }
}


function draw() {

  if (loading) {
    background(255);

    stroke(102, 204, 204);
    noFill();
    rect(width / 4, height / 2, width / 2, 40);

    noStroke();
    fill(102, 204, 204, 100);
    let w = (width / 2) * counter / totalImages;
    rect(width / 4, height / 2, w, 40);
    
  } else {
    imageIndex = int(map(mouseX, 0, windowWidth, 0, images.length));
    image(images[imageIndex], 0, 0);
  }
}// https://forum.processing.org/two/discussion/18924/image-sequence-mousex

/** Mouse Animation
 *  2016-11-08 Jeremy Douglass - Processing 3.2.2
 *  move mouse left and right to change image
 *  https:// forum.processing.org/two/discussion/18924/image-sequence-mousex
 **/
 
let maxImages = 152;
let images = [];
let imageIndex = 0
 
function preload() {
  for (var i = 0; i < maxImages; i++) {
    images[i] = loadImage("assets/" + i + ".jpg");
  }
}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  // canvas.style('z-index', "-1");
  // createCanvas(1280, 800);
}
 

function draw(){
	imageIndex = int(map(mouseX, 0, windowWidth, 0, images.length));
  image( images[imageIndex], 0, 0 );
}var vid;

function setup() {
  createCanvas(1280, 720);

  vid = createVideo("rhs.mp4");
  vid.size(1280, 720);
  vid.hide();
}

function draw() {
  image(vid,0,0); 	
  
  // vid.time((mouseX/width) * vid.duration());

	// ?
  // vid.time = int(map(mouseX, 0, width, 0, vid.duration()));
  
  vid.time(mouseX / width);

  // print(mouseX);

  print(vid.time);
}

var capture;

function setup() {
  createCanvas(320, 240);
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {  
  push();
  translate(width,0);
  scale(-1, 1);
  image(capture, 0, 0, 320, 240);
  pop();
}
var value = 0;
function draw() {
  fill(value);
  rect(25, 25, 50, 50);
}
function deviceShaken() {
  value = value + 5;
  if (value > 255) {
    value = 0;
  }
}// adapted from: http://alpha.editor.p5js.org/ivymeadows/sketches/Byoo6tl2b

function setup(){
  createCanvas(400,400);
  noStroke();
  background(255);

  
  var x = 200;
  var y = 200;
  //number of circles
  var circles = 9;
  //for each circle
  for (var total = 0; total < circles; total = total+1) {
    //compute circle diameter based on reverse index (circles-total) (or max-current)
    var diameter = (circles-total) * 30;
    // fill(total * 30);
		noFill();
    fill(diameter * 0.7);
		stroke(0);
    //render the circle
    ellipse(x,y, diameter, diameter);
		// ellipse(x-100,y, diameter, diameter);
		// ellipse(x+100,y, diameter, diameter);
    
  }
  
}
// for red, green, and blue color values
var r, g, b, diameter, choices = 2;
var button = [[180,300],[540,300]]

function setup() {
    canv = createCanvas(700,500);
    canv.parent("sketcher");
    
    ColorRandomizer();

    
    diameter = 200;
}

function draw() {
    background(0);
    
    textSize(30);
    textAlign(CENTER, CENTER);
    fill(255);
    text("Does White or Black look better over this color?", 350,50);

    DrawDisplayer(0);
    DrawDisplayer(1);

}

function DrawDisplayer(loc)
{
    fill(r, g, b);
    ellipse(button[loc][0], button[loc][1], diameter, diameter);
    fill(loc*255);
    textSize(48);
    textAlign(CENTER, CENTER);
    var t = (loc==0) ? "BLACK" : "WHITE";
    text(t,button[loc][0], button[loc][1]);
 } 

function ColorRandomizer()
{
          // Pick colors randomly
            r = random(255);
            g = random(255);
            b = random(255);
}

  // When the user clicks the mouse
  function mousePressed() {
    // Check if mouse is inside the circle
    var d = [];

    for ( var i = 0; i < choices; i++)
    {    
    d[i] = dist(mouseX, mouseY, button[i][0], button[i][1]);
    }

    if (d[0] < diameter/2) {
        print("FUNCTION FOR BLACK");
      // Pick new random color values
ColorRandomizer();
    }
    else if (d[1] < diameter/2) {
        print("FUNCTION FOR WHITE");
      // Pick new random color values
ColorRandomizer();
    }
  }
let maxImages = 1;
let images = [];
let imageIndex = 0;

let camera;
// let camera2;
let buttonStart;
let buttonAdjust;

let time = 0;
let reactionTime = 1500;
let reviewTime = 2000;

let isSnapTime = false;
let isAdjustTime = false;

let portrait;
let snap;
let diptych;

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let sourceX;
let sourceY;
let sourceWidth;
let sourceHeight;

let frameStroke = 1;


function preload() {
  for (var i = 0; i < maxImages; i++) {
    images[i] = loadImage("assets/" + i + ".jpg");
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', "-1");
  preload();
  background(255);

  camera = createCapture(VIDEO);
  camera.hide();
  
  // camera2 = createCapture(VIDEO);
  // camera2.hide();

//   textFont("monospace");
//   textSize(32);
//   text("Welcome to the photo booth", windowWidth * 0.1, windowHeight / 3);
  
//   textFont("monospace");
//   textSize(16);
//   text("By entering you agree to have your portrait taken and displayed in a gallery shared with other participants", windowWidth * 0.1, windowHeight / 3 + (windowHeight / 20));
  
//   textFont("monospace");
//   textSize(16);
//   text("Ready to enter?", windowWidth * 0.1, (windowHeight / 2)-(windowHeight / 40));
  
  // buttonAdjust = createButton("Position Yourself")
  // buttonAdjust.style("font-style", "monospace");
  // buttonAdjust.position( windowWidth * 0.1, windowHeight / 2);
  // buttonAdjust.mousePressed(adjustYourself);
  
  // let buttonCenterPos = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 4);
  // buttonStart = createButton("I'm ready!");
  // buttonStart.position(windowWidth / 2, buttonCenterPos);
  // buttonStart.mousePressed(startProcess);
  // buttonStart.hide()
}

function draw() {
  if (isAdjustTime) {
      adjustYourself(); 
    }

  if (isSnapTime) {
    if ((millis() - time) > reactionTime) {
      takeSnap();
      isSnapTime = !isSnapTime;
      createDiptych();
      imageIndex++;
      
      if (imageIndex < maxImages) {
        startProcess();
    	} else noLoop();
    }
  } 
}



function adjustYourself() {
  isAdjustTime = true;
  // buttonStart.show();
  // buttonAdjust.hide();
  document.getElementById("welcome").style.display = "none";
  document.getElementById("adjust").style.display = "block";

  background(255);

  frameStartX = windowWidth / 3;
  frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  frameWidth = windowWidth / 3;
  frameHeight = 4 * windowWidth / 9;

  sourceX = camera.width / 3;
  sourceY = (camera.height - 4 * camera.width / 9) / 2;
  sourceWidth = camera.width / 3;
  sourceHeight = 4 * camera.width / 9;

  // try to mirror camera feed
	// push();
	// translate(camera.width,0);
	// scale(-1.0,1.0);
	// image(camera,frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);
	// pop();
	// filter('gray');
  
  // crop camera and draw within frame
  image(camera, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);
	filter('gray');
  
  // frame  
  stroke(1);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function startProcess() {
  isAdjustTime = false;
  background(255);
  // buttonStart.hide();
  document.getElementById("adjust").style.display = "none";

  time = millis();
  isSnapTime = true;
  
  images[imageIndex].filter('gray');
  image(images[imageIndex], frameStartX, frameStartY, frameWidth, frameHeight);

  portrait = createImage(frameWidth, frameHeight);
  portrait.copy(images[imageIndex], 0, 0, images[imageIndex].width, images[imageIndex].height, 0, 0, frameWidth, frameHeight);

  stroke(frameStroke);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function takeSnap() {
  snap = createImage(frameWidth, frameHeight);
  snap.copy(camera, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, frameWidth, frameHeight);
  snap.filter('gray');
  print(imageIndex);
}

function createDiptych() {
  let doubleFrameX = windowWidth / 6;
  let doubleFrameY = (windowHeight - 4 * windowWidth / 9) / 2; // same as frameStartY
  let doubleWidth = windowWidth * 2 / 3;
  let doubleHeight = 4 * windowWidth / 9; // same as frameHeight

  diptych = createGraphics(doubleWidth, doubleHeight);
  diptych.background(255);
  diptych.image(portrait, 0, 0);
  diptych.image(snap, doubleWidth/2, 0);
  
  // diptych.stroke(frameStroke);
  // diptych.noFill();
  // diptych.rect(0, 0, doubleWidth, doubleHeight);

  diptych.stroke(frameStroke);
  diptych.line(doubleWidth/2, 0, doubleWidth/2, doubleHeight);
  
  save(diptych, 'diptych.jpg');
}function setup() {
  createCanvas(windowWidth, windowHeight);
  buttonGallery = createButton("Gallery");
  buttonGallery.position(windowWidth / 2, windowHeight / 2);
  buttonGallery.mousePressed(goToGallery);
}

function draw() {
  background(220);
}

function goToGallery() {
 window.open("https://localhost.itp.io:1337/gallery", "_self"); 
}let maxImages = 5;
let images = [];
let imageIndex = 0;

let camera;
let camera2;
let buttonStart;
let buttonAdjust;

let time = 0;
let reactionTime = 1500;
let reviewTime = 2000;

let isSnapTime = false;
let isAdjustTime = false;

let portrait;
let snap;
let diptych;

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let sourceX;
let sourceY;
let sourceWidth;
let sourceHeight;

let frameStroke = 1;


function preload() {
  for (var i = 0; i < maxImages; i++) {
    images[i] = loadImage("assets/" + i + ".jpg");
  }
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  preload();
  background(255);

  camera = createCapture(VIDEO);
  camera.hide();
  
  camera2 = createCapture(VIDEO);
  camera2.hide();

  textFont("monospace");
  textSize(32);
  text("Welcome to the photo booth", windowWidth * 0.1, windowHeight / 3);
  
  textFont("monospace");
  textSize(16);
  text("By entering you agree to have your portrait taken and displayed in a gallery shared with other participants", windowWidth * 0.1, windowHeight / 3 + (windowHeight / 20));
  
  textFont("monospace");
  textSize(16);
  text("Ready to enter?", windowWidth * 0.1, (windowHeight / 2)-(windowHeight / 40));
  
  buttonAdjust = createButton("Position Yourself")
  buttonAdjust.style("font-style", "monospace");
  buttonAdjust.position( windowWidth * 0.1, windowHeight / 2);
  buttonAdjust.mousePressed(adjustYourself);
  
  let buttonCenterPos = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 4);
  buttonStart = createButton("I'm ready!");
  buttonStart.position(windowWidth / 2, buttonCenterPos);
  buttonStart.mousePressed(startProcess);
  buttonStart.hide()
}

function draw() {
  if (isAdjustTime) {
      adjustYourself(); 
    }

  if (isSnapTime) {
    if ((millis() - time) > reactionTime) {
      takeSnap();
      isSnapTime = !isSnapTime;
      createDiptych();
      imageIndex++;
      
      if (imageIndex < maxImages) {
        startProcess();
    	} else noLoop();
    }
  } 
}


function adjustYourself() {
  isAdjustTime = true;
  buttonStart.show();
  buttonAdjust.hide();
  
  background(255);

  frameStartX = windowWidth / 3;
  frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  frameWidth = windowWidth / 3;
  frameHeight = 4 * windowWidth / 9;

  sourceX = camera.width / 3;
  sourceY = (camera.height - 4 * camera.width / 9) / 2;
  sourceWidth = camera.width / 3;
  sourceHeight = 4 * camera.width / 9;

  // crop camera and draw within frame
  image(camera, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);
	filter('gray');
  
  // frame  
  stroke(1);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function startProcess() {
  isAdjustTime = false;
  background(255);
  buttonStart.hide();

  time = millis();
  isSnapTime = true;
  
  images[imageIndex].filter('gray');
  image(images[imageIndex], frameStartX, frameStartY, frameWidth, frameHeight);

  portrait = createImage(frameWidth, frameHeight);
  portrait.copy(images[imageIndex], 0, 0, images[imageIndex].width, images[imageIndex].height, 0, 0, frameWidth, frameHeight);

  stroke(frameStroke);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function takeSnap() {
  snap = createImage(frameWidth, frameHeight);
  snap.copy(camera2, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, frameWidth, frameHeight);
  snap.filter('gray');
  // save(snap, 'snap.jpg');
  print(imageIndex);
}

function createDiptych() {
  let doubleFrameX = windowWidth / 6;
  let doubleFrameY = (windowHeight - 4 * windowWidth / 9) / 2; // same as frameStartY
  let doubleWidth = windowWidth * 2 / 3;
  let doubleHeight = 4 * windowWidth / 9; // same as frameHeight

  diptych = createGraphics(doubleWidth, doubleHeight);
  diptych.background(255);
  diptych.image(portrait, 0, 0);
  diptych.image(snap, doubleWidth/2, 0);
  
  // diptych.stroke(frameStroke);
  // diptych.noFill();
  // diptych.rect(0, 0, doubleWidth, doubleHeight);

  diptych.stroke(frameStroke);
  diptych.line(doubleWidth/2, 0, doubleWidth/2, doubleHeight);
  
  save(diptych, 'diptych.jpg');
}let maxImages = 3;
let images = [];

let camera;
let camera2;
let buttonStart;
let buttonReset;
let buttonAdjust;

let time = 0;
let reactionTime = 1500;

let isSnapTime = false;
let isAdjustTime = false;

let portrait;
let snap;
let diptych;

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let s = 1; // frame stroke


function preload() {
  for (var i = 0; i < maxImages; i++) {
    images[i] = loadImage("assets/" + i + ".jpg");
  }
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  preload();
  background(255);

  camera = createCapture(VIDEO);
  camera.hide();
  
  camera2 = createCapture(VIDEO);
  camera2.hide();

  textFont("monospace");
  textSize(32);
  text("Welcome to the photo booth", windowWidth * 0.1, windowHeight / 3);
  
  textFont("monospace");
  textSize(16);
  text("By entering you agree to have your portrait taken and displayed in a gallery shared with other participants", windowWidth * 0.1, windowHeight / 3 + (windowHeight / 20));
  
  textFont("monospace");
  textSize(16);
  text("Ready to enter?", windowWidth * 0.1, (windowHeight / 2)-(windowHeight / 40));
  
  buttonAdjust = createButton("Position Yourself")
  buttonAdjust.style("font-style", "monospace");
  buttonAdjust.position( windowWidth * 0.1, windowHeight / 2);
  buttonAdjust.mousePressed(adjustYourself);
  
  let buttonCenterPos = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 4);
  buttonStart = createButton("I'm ready!");
  buttonStart.position(windowWidth / 2, buttonCenterPos);
  buttonStart.mousePressed(startProcess);
  buttonStart.hide()

  buttonReset = createButton("reset");
  buttonReset.position(windowWidth / 2, buttonCenterPos);
  buttonReset.mousePressed(resetSketch);
  buttonReset.hide();
}

function draw() {
  if (isAdjustTime) {
      adjustYourself(); 
    }

  if (isSnapTime) {
    if ((millis() - time) > reactionTime) {
      takeSnap();
      isSnapTime = !isSnapTime;
      displayDiptych();
    }
  }
}


function adjustYourself() {
  isAdjustTime = true;
  buttonStart.show();
  buttonAdjust.hide();
  
  background(255);

  let frameStartX = windowWidth / 3;
  let frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  let frameWidth = windowWidth / 3;
  let frameHeight = 4 * windowWidth / 9;

  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;

  // crop camera and draw within frame
  image(camera, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);
	filter('gray');
  
  // frame  
  stroke(1);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function startProcess() {
  isAdjustTime = false;
  background(255);
  buttonStart.hide();
  buttonReset.hide();

  time = millis();
  isSnapTime = true;

  frameStartX = windowWidth / 3;
  frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  frameWidth = windowWidth / 3;
  frameHeight = 4 * windowWidth / 9;

  r = floor(random(0, images.length));
  images[r].filter('gray');
  image(images[r], frameStartX, frameStartY, frameWidth, frameHeight);

  portrait = createImage(frameWidth, frameHeight);
  portrait.copy(images[r], 0, 0, images[r].width, images[r].height, 0, 0, frameWidth, frameHeight);
  // save(portrait, 'portrait.jpg');

  stroke(s);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function takeSnap() {
  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;

  snap = createImage(frameWidth, frameHeight);
  snap.copy(camera2, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, frameWidth, frameHeight);
  snap.filter('gray');
  // save(snap, 'snap.jpg');
}

function displayDiptych() {
  let doubleFrameX = windowWidth / 6;
  let doubleFrameY = (windowHeight - 4 * windowWidth / 9) / 2; // same as frameStartY
  let doubleWidth = windowWidth * 2 / 3;
  let doubleHeight = 4 * windowWidth / 9; // same as frameHeight

  image(portrait, doubleFrameX, doubleFrameY);
  image(snap, windowWidth / 2, doubleFrameY);

  // draw double frame with center line for diptych
  stroke(s);
  noFill();
  rect(doubleFrameX, doubleFrameY, doubleWidth, doubleHeight);
  let centerLineEndY = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 2);
  stroke(s);
  line(windowWidth / 2, doubleFrameY, windowWidth / 2, centerLineEndY);

  diptych = createGraphics(doubleWidth, doubleHeight);
  diptych.copy(canvas, doubleFrameX, doubleFrameY, doubleWidth, doubleHeight, 0, 0, doubleWidth, doubleHeight);
  save(diptych, 'diptych.jpg');
  
  // buttonReset.show();
}


function resetSketch() {
  isAdjustTime = false;
  background(255);
  buttonReset.hide();
  buttonAdjust.show();
  buttonStart.show();
}let maxImages = 3;
let images = [];

let camera;
let buttonStart;
let buttonReset;

let time = 0;
let reactionTime = 1500;

let isSnapTime = false;

let portrait;
let snap;
let diptych;

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let frameStroke = 1;


function preload() {
  for (var i = 0; i < maxImages; i++) {
    images[i] = loadImage("assets/" + i + ".jpg");
  }
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  preload();
  background(255);

  camera = createCapture(VIDEO);
  camera.hide();

  buttonStart = createButton("start");
  buttonStart.position(windowWidth / 2, windowHeight / 2);
  buttonStart.mousePressed(startProcess);

  let buttonResetPos = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 4);

  buttonReset = createButton("reset");
  buttonReset.position(windowWidth / 2, buttonResetPos);
  buttonReset.mousePressed(resetSketch);
  buttonReset.hide();
}

function draw() {

  if (isSnapTime) {
    if ((millis() - time) > reactionTime) {
      takeSnap();
      isSnapTime = !isSnapTime;
      // displayDiptych();
      createDiptych();
    }
  }
}

function startProcess() {
  background(255);
  buttonStart.hide();
  buttonReset.hide();

  time = millis();
  isSnapTime = true;

  frameStartX = windowWidth / 3;
  frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  frameWidth = windowWidth / 3;
  frameHeight = 4 * windowWidth / 9;

  r = floor(random(0, images.length));
  images[r].filter('gray');
  image(images[r], frameStartX, frameStartY, frameWidth, frameHeight);

  portrait = createImage(frameWidth, frameHeight);
  portrait.copy(images[r], 0, 0, images[r].width, images[r].height, 0, 0, frameWidth, frameHeight);
  // save(portrait, 'portrait.jpg');

  stroke(frameStroke);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function takeSnap() {
  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;

  snap = createImage(frameWidth, frameHeight);
  snap.copy(camera, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, frameWidth, frameHeight);
  snap.filter('gray');
  // save(snap, 'snap.jpg');

  buttonReset.show();
}
// function displayDiptych() {
//   let doubleFrameX = windowWidth / 6;
//   let doubleFrameY = (windowHeight - 4 * windowWidth / 9) / 2; // same as frameStartY
//   let doubleWidth = windowWidth * 2 / 3;
//   let doubleHeight = 4 * windowWidth / 9; // same as frameHeight

//   image(portrait, doubleFrameX, doubleFrameY);
//   image(snap, windowWidth / 2, doubleFrameY);

//   // double frame for diptych
//   stroke(frameStroke);
//   noFill();
//   rect(doubleFrameX, doubleFrameY, doubleWidth, doubleHeight);

//   let centerLineEndY = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 2);
//   stroke(frameStroke);
//   line(windowWidth / 2, doubleFrameY, windowWidth / 2, centerLineEndY);

//   buttonReset.show();

//   diptych = createGraphics(doubleWidth, doubleHeight);
//   diptych.copy(canvas, doubleFrameX, doubleFrameY, doubleWidth, doubleHeight, 0, 0, doubleWidth, doubleHeight);
// 	save(diptych, 'diptych.jpg');
// }


function createDiptych() {
  let doubleFrameX = windowWidth / 6;
  let doubleFrameY = (windowHeight - 4 * windowWidth / 9) / 2; // same as frameStartY
  let doubleWidth = windowWidth * 2 / 3;
  let doubleHeight = 4 * windowWidth / 9; // same as frameHeight

  diptych = createGraphics(doubleWidth, doubleHeight);
  diptych.background(255);
  diptych.image(portrait, 0, 0);
  diptych.image(snap, doubleWidth/2, 0);
  
  diptych.stroke(frameStroke);
  diptych.noFill();
  diptych.rect(0, 0, doubleWidth, doubleHeight);

  diptych.stroke(frameStroke);
  diptych.line(doubleWidth/2, 0, doubleWidth/2, doubleHeight);
  
  save(diptych, 'diptych.jpg');
}

function resetSketch() {
  background(255);
  buttonReset.hide();
  buttonStart.show();
}let maxImages = 3;
let images = [];

let camera;
let camera2;
let buttonStart;
let buttonReset;
let buttonAdjust;

let time = 0;
let reactionTime = 1500;

let isSnapTime = false;
let isAdjustTime = false;

let portrait;
let snap;
let diptych;

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let s = 1; // frame stroke


function preload() {
  for (var i = 0; i < maxImages; i++) {
    images[i] = loadImage("assets/" + i + ".jpg");
  }
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  preload();
  background(255);

  camera = createCapture(VIDEO);
  camera.hide();
  
  camera2 = createCapture(VIDEO);
  camera2.hide();

  buttonAdjust = createButton("position yourself")
  buttonAdjust.position(windowWidth / 3, windowHeight / 2);
  buttonAdjust.mousePressed(adjustYourself);
  
  buttonStart = createButton("start");
  buttonStart.position(windowWidth / 2, windowHeight / 2);
  buttonStart.mousePressed(startProcess);

  let buttonResetPos = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 4);
  buttonReset = createButton("reset");
  buttonReset.position(windowWidth / 2, buttonResetPos);
  buttonReset.mousePressed(resetSketch);
  buttonReset.hide();
}

function draw() {
  if (isAdjustTime) {
      adjustYourself(); 
    }

  if (isSnapTime) {
    if ((millis() - time) > reactionTime) {
      takeSnap();
      isSnapTime = !isSnapTime;
      displayDiptych();
    }
  }
}


function adjustYourself() {
  isAdjustTime = true;
  buttonStart.hide();
  buttonAdjust.hide();
  buttonReset.show();
  
  background(255);

  let frameStartX = windowWidth / 3;
  let frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  let frameWidth = windowWidth / 3;
  let frameHeight = 4 * windowWidth / 9;

  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;

  // crop camera and draw within frame
  image(camera, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);
	filter('gray');
  
  // frame  
  stroke(1);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function startProcess() {
  background(255);
  buttonStart.hide();
  buttonReset.hide();
  buttonAdjust.hide();

  time = millis();
  isSnapTime = true;

  frameStartX = windowWidth / 3;
  frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  frameWidth = windowWidth / 3;
  frameHeight = 4 * windowWidth / 9;

  r = floor(random(0, images.length));
  images[r].filter('gray');
  image(images[r], frameStartX, frameStartY, frameWidth, frameHeight);

  portrait = createImage(frameWidth, frameHeight);
  portrait.copy(images[r], 0, 0, images[r].width, images[r].height, 0, 0, frameWidth, frameHeight);
  // save(portrait, 'portrait.jpg');

  stroke(s);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function takeSnap() {
  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;

  snap = createImage(frameWidth, frameHeight);
  snap.copy(camera2, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, frameWidth, frameHeight);
  snap.filter('gray');
  // save(snap, 'snap.jpg');
}

function displayDiptych() {
  let doubleFrameX = windowWidth / 6;
  let doubleFrameY = (windowHeight - 4 * windowWidth / 9) / 2; // same as frameStartY
  let doubleWidth = windowWidth * 2 / 3;
  let doubleHeight = 4 * windowWidth / 9; // same as frameHeight

  image(portrait, doubleFrameX, doubleFrameY);
  image(snap, windowWidth / 2, doubleFrameY);

  // draw double frame with center line for diptych
  stroke(s);
  noFill();
  rect(doubleFrameX, doubleFrameY, doubleWidth, doubleHeight);
  let centerLineEndY = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 2);
  stroke(s);
  line(windowWidth / 2, doubleFrameY, windowWidth / 2, centerLineEndY);

  buttonReset.show();

  diptych = createGraphics(doubleWidth, doubleHeight);
  diptych.copy(canvas, doubleFrameX, doubleFrameY, doubleWidth, doubleHeight, 0, 0, doubleWidth, doubleHeight);
  save(diptych, 'diptych.jpg');
}


function resetSketch() {
  isAdjustTime = false;
  background(255);
  buttonReset.hide();
  buttonAdjust.show();
  buttonStart.show();
}// Notes & Questions:
// fullscreen doesn't work, use localhost for fullscreen
// doesn't work in Firefox for me
// how to turn camera off other than stopping sketch?
// add an option to set camera view (adjust yourself)
// how do I save images back to a database for display in a gallery?

let maxImages = 3;
let images = [];

let camera;
let buttonStart;
let buttonReset;
let buttonAdjust;

let time = 0;
let reactionTime = 1500;

let isSnapTime = false;
let isAdjustTime = false;

let portrait;
let snap;
let diptych;

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let s = 1; // frame stroke


function preload() {
  for (var i = 0; i < maxImages; i++) {
    images[i] = loadImage("assets/" + i + ".jpg");
  }
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  preload();
  background(255);

  camera = createCapture(VIDEO);
  camera.hide();

  buttonAdjust = createButton("hold mouse to check position")
  buttonAdjust.position(windowWidth / 2, windowHeight / 4);
  buttonAdjust.mousePressed(adjustYourself);
  
  buttonStart = createButton("start");
  buttonStart.position(windowWidth / 2, windowHeight / 2);
  buttonStart.mousePressed(startProcess);
  buttonStart.hide();

  let buttonResetPos = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 4);
  buttonReset = createButton("reset");
  buttonReset.position(windowWidth / 2, buttonResetPos);
  buttonReset.mousePressed(resetSketch);
  buttonReset.hide();
}

function draw() {
  if (isAdjustTime) {
    if (mouseIsPressed) {
      adjustYourself(); 
    } else {
     isAdjustTime = false;
     resetSketch(); 
    }
  }

  if (isSnapTime) {
    if ((millis() - time) > reactionTime) {
      takeSnap();
      isSnapTime = !isSnapTime;
      displayDiptych();
    }
  }
}


function adjustYourself() {
  isAdjustTime = true;
  buttonStart.hide();

  background(255);

  let frameStartX = windowWidth / 3;
  let frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  let frameWidth = windowWidth / 3;
  let frameHeight = 4 * windowWidth / 9;

  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;

  // crop camera and draw within frame
  image(camera, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);
	filter('gray');
  
  // frame  
  stroke(1);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function startProcess() {
  background(255);
  buttonStart.hide();
  buttonReset.hide();
  buttonAdjust.hide();

  time = millis();
  isSnapTime = true;

  frameStartX = windowWidth / 3;
  frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  frameWidth = windowWidth / 3;
  frameHeight = 4 * windowWidth / 9;

  r = floor(random(0, images.length));
  images[r].filter('gray');
  image(images[r], frameStartX, frameStartY, frameWidth, frameHeight);

  portrait = createImage(frameWidth, frameHeight);
  portrait.copy(images[r], 0, 0, images[r].width, images[r].height, 0, 0, frameWidth, frameHeight);
  // save(portrait, 'portrait.jpg');

  stroke(s);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function takeSnap() {
  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;

  snap = createImage(frameWidth, frameHeight);
  snap.copy(camera, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, frameWidth, frameHeight);
  snap.filter('gray');
  // save(snap, 'snap.jpg');
}

function displayDiptych() {
  let doubleFrameX = windowWidth / 6;
  let doubleFrameY = (windowHeight - 4 * windowWidth / 9) / 2; // same as frameStartY
  let doubleWidth = windowWidth * 2 / 3;
  let doubleHeight = 4 * windowWidth / 9; // same as frameHeight

  image(portrait, doubleFrameX, doubleFrameY);
  image(snap, windowWidth / 2, doubleFrameY);

  // draw double frame with center line for diptych
  stroke(s);
  noFill();
  rect(doubleFrameX, doubleFrameY, doubleWidth, doubleHeight);
  let centerLineEndY = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 2);
  stroke(s);
  line(windowWidth / 2, doubleFrameY, windowWidth / 2, centerLineEndY);

  buttonReset.show();

  diptych = createGraphics(doubleWidth, doubleHeight);
  diptych.copy(canvas, doubleFrameX, doubleFrameY, doubleWidth, doubleHeight, 0, 0, doubleWidth, doubleHeight);
  save(diptych, 'diptych.jpg');
}


function resetSketch() {
  background(255);
  buttonReset.hide();
  buttonAdjust.hide();
  buttonStart.show();
}  // Notes & Questions:
// fullscreen doesn't work, use localhost for fullscreen
// doesn't work in Firefox for me
// how to turn camera off other than stopping sketch?
// add an option to set camera view (adjust yourself)
// how do I save images back to a database for display in a gallery?

let maxImages = 3;
let images = [];

let camera;
let buttonStart;
let buttonReset;

let time = 0;
let reactionTime = 1500;

let isSnapTime = false;

let portrait;
let snap;
let diptych;

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let frameStroke = 1; 


function preload() {
  for (var i = 0; i < maxImages; i++) {
    images[i] = loadImage("assets/" + i + ".jpg");
  }
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  preload();
  background(255);

  camera = createCapture(VIDEO);
  camera.hide();

  buttonStart = createButton("start");
  buttonStart.position(windowWidth / 2, windowHeight / 2);
  buttonStart.mousePressed(startProcess);

  let buttonResetPos = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 4);

  buttonReset = createButton("reset");
  buttonReset.position(windowWidth / 2, buttonResetPos);
  buttonReset.mousePressed(resetSketch);
  buttonReset.hide();
}

function draw() {

  if (isSnapTime) {
    if ((millis() - time) > reactionTime) {
      takeSnap();
      isSnapTime = !isSnapTime;
      displayDiptych();
    }
  }
}

function startProcess() {
  background(255);
  buttonStart.hide();
  buttonReset.hide();

  time = millis();
  isSnapTime = true;

  frameStartX = windowWidth / 3;
  frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  frameWidth = windowWidth / 3;
  frameHeight = 4 * windowWidth / 9;

  r = floor(random(0, images.length));
  images[r].filter('gray');
  image(images[r], frameStartX, frameStartY, frameWidth, frameHeight);

  portrait = createImage(frameWidth, frameHeight);
  portrait.copy(images[r], 0, 0, images[r].width, images[r].height, 0, 0, frameWidth, frameHeight);
  // save(portrait, 'portrait.jpg');

  stroke(frameStroke);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function takeSnap() {
  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;

  snap = createImage(frameWidth, frameHeight);
  snap.copy(camera, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, frameWidth, frameHeight);
  snap.filter('gray');
  // save(snap, 'snap.jpg');
}

function displayDiptych() {
  let doubleFrameX = windowWidth / 6;
  let doubleFrameY = (windowHeight - 4 * windowWidth / 9) / 2; // same as frameStartY
  let doubleWidth = windowWidth * 2 / 3;
  let doubleHeight = 4 * windowWidth / 9; // same as frameHeight

  image(portrait, doubleFrameX, doubleFrameY);
  image(snap, windowWidth / 2, doubleFrameY);

  // double frame for diptych
  stroke(frameStroke);
  noFill();
  rect(doubleFrameX, doubleFrameY, doubleWidth, doubleHeight);

  let centerLineEndY = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 2);
  stroke(frameStroke);
  line(windowWidth / 2, doubleFrameY, windowWidth / 2, centerLineEndY);

  buttonReset.show();
  
  diptych = createGraphics(doubleWidth, doubleHeight);
  diptych.copy(canvas, doubleFrameX, doubleFrameY, doubleWidth, doubleHeight, 0, 0, doubleWidth, doubleHeight);
	save(diptych, 'diptych.jpg');
}


function resetSketch() {
  background(255);
  buttonReset.hide();
  buttonStart.show();
}let camera;
let buttonSnapshot;

let portrait;

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let s = 1; // frame stroke

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  camera = createCapture(VIDEO);
  camera.hide();

  buttonSnapshot = createButton("snap");
  buttonSnapshot.position(windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 4));
  buttonSnapshot.mousePressed(snap);
}

function draw() {
  background(255);

  frameStartX = windowWidth / 3;
  frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  frameWidth = windowWidth / 3;
  frameHeight = 4 * windowWidth / 9;

  let sourceX = int(camera.width / 3);
  let sourceY = int((camera.height - 4 * camera.width / 9) / 2);
  let sourceWidth = int(camera.width / 3);
  let sourceHeight = int(4 * camera.width / 9);

  image(camera, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);
  
  portrait = createGraphics(frameWidth, frameHeight);
  portrait.copy(canvas, frameStartX, frameStartY, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
  
  stroke(s);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}

function snap() {
  save(portrait);
}let camera;
let buttonSnapshot;

let portrait;

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let s = 1; // frame stroke

let videoScale = 16;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  camera = createCapture(VIDEO);
  camera.size(width / videoScale, height / videoScale);
  camera.hide();

  buttonSnapshot = createButton("snap");
  buttonSnapshot.position(windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 4));
  buttonSnapshot.mousePressed(snap);
}

function draw() {
  background(255);

  frameStartX = windowWidth / 3;
  frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  frameWidth = windowWidth / 3;
  frameHeight = 4 * windowWidth / 9;

  let sourceX = int(camera.width / 3);
  let sourceY = int((camera.height - 4 * camera.width / 9) / 2);
  let sourceWidth = int(camera.width / 3);
  let sourceHeight = int(4 * camera.width / 9);

  image(camera, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);

  camera.loadPixels();
  for (let y = 0; y < camera.height; y++) {
    for (let x = 0; x < camera.width; x++) {
      let index = (x + y * camera.width) * 4;
      let r = camera.pixels[index + 0];
      let g = camera.pixels[index + 1];
      let b = camera.pixels[index + 2];

      // r = 255;
      // g = 255;
      // b = 255;
      
      noStroke();
      fill(r, g, b);
      ellipse(x * videoScale, y * videoScale, videoScale, videoScale);
    }
  }
  
  portrait = createGraphics(frameWidth, frameHeight);
  portrait.copy(canvas, frameStartX, frameStartY, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
  
  stroke(s);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}

function snap() {
  save(portrait);
}let camera;
let buttonSnapshot;

let portrait;

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let s = 1; // frame stroke

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  camera = createCapture(VIDEO);
  camera.hide();

  buttonSnapshot = createButton("snap");
  buttonSnapshot.position(windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 4));
  buttonSnapshot.mousePressed(snap);
}

function draw() {
  background(255);

  frameStartX = windowWidth / 3;
  frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  frameWidth = windowWidth / 3;
  frameHeight = 4 * windowWidth / 9;

  let sourceX = int(camera.width / 3);
  let sourceY = int((camera.height - 4 * camera.width / 9) / 2);
  let sourceWidth = int(camera.width / 3);
  let sourceHeight = int(4 * camera.width / 9);

  // drawing image from camera feed into the frame on canvas
  image(camera, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);

  portrait = createGraphics(frameWidth, frameHeight);
  portrait.copy(canvas, frameStartX, frameStartY, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

  portrait.loadPixels();
  for (let x = 0; x < portrait.width; x++) {
    for (let y = 0; y < portrait.height; y++) {
      let index = (x + y * portrait.width) * 4;
      let r = portrait.pixels[index + 0];
      let g = portrait.pixels[index + 1];
      let b = portrait.pixels[index + 2];

      r = g;
      g = b;
      b = r;
    }
  }
  portrait.updatePixels();

  stroke(s);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}

function snap() {
  save(portrait);
}let camera;
let buttonSnapshot;

let portrait;

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let s = 1; // frame stroke

let videoScale = 16;

function setup() {
  createCanvas(windowWidth, windowHeight);

  camera = createCapture(VIDEO);
  camera.size(width / videoScale, height / videoScale);
  camera.hide();

  buttonSnapshot = createButton("snap");
  buttonSnapshot.position(windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 4));
  buttonSnapshot.mousePressed(snap);
}

function draw() {
  background(255);

  frameStartX = windowWidth / 3;
  frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  frameWidth = windowWidth / 3;
  frameHeight = 4 * windowWidth / 9;

  let sourceX = int(camera.width / 3);
  let sourceY = int((camera.height - 4 * camera.width / 9) / 2);
  let sourceWidth = int(camera.width / 3);
  let sourceHeight = int(4 * camera.width / 9);

  // drawing image from camera feed into the frame on canvas
  // image(camera, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);

  // creating a new image buffer with this width & height
  // portrait = createImage(frameWidth, frameHeight);
  // copyint into this image buffer from the camera feed
  // portrait.copy(camera, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, frameWidth, frameHeight);

  // portrait.loadPixels();
  camera.loadPixels();
  for (let y = sourceY; y < camera.height; y++) {
    for (let x = sourceX; x < camera.width; x++) {
      let index = (x + y * camera.width) * 4;

      // for (let y = 0; y < camera.height; y++) {
      //   for (let x = 0; x < camera.width; x++) {
      //     let index = (x + y * camera.width) * 4;
      let r = camera.pixels[index + 0];
      let g = camera.pixels[index + 1];
      let b = camera.pixels[index + 2];

     	// r = ;
     	// b = ;
     	// g = ;

      noStroke();
      fill(r, g, b);
      ellipse(x * videoScale, y * videoScale, videoScale, videoScale);
    }
  }

  stroke(s);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}

function snap() {
  save(portrait);
}/*
this sketch was created for The World: Pixel by Pixel, NYU ITP, Spring 2018
for more info, visit: https://ellennickles.com/itpblog/2018/2/15/week-3-pixel-pavaring-app
*/


// createCanvas of brush
var brushSize = 100;

// related to brush shape
var lastX, lastY;

// color of paint
var redColor = 255;
var greenColor = 0;
var blueColor = 0;

// increment value
var inc = 20;


function setup() {
  createCanvas(screen.width, screen.height);
  background(240, 240, 240);
}

function draw() {
  if (mouseIsPressed == true) {
    for (var i = 0; i< brushSize; i+=1) {
      var thisX= mouseX + random(-i, i); 
      var thisY= mouseY + random(-i, i); 
      noStroke();
      fill(redColor, greenColor, blueColor, 5);
      beginShape();
      vertex(mouseX, mouseY);
      bezierVertex(lastX, lastY, thisX, thisY, thisX, thisY);
      bezierVertex(mouseX, mouseY, mouseX, mouseY, mouseX, mouseY);
      lastX = thisX;
      lastY = thisY;
      endShape();
    }
  }
  print(redColor);
  print(greenColor);
  print(blueColor);
}

function keyPressed() {
  // change brush createCanvas
  if (keyCode == UP_ARROW) {
    brushSize += inc;
		brushSize = constrain(brushSize,20,500);
  }
  if (keyCode == DOWN_ARROW) {
    brushSize -= inc;
		brushSize = constrain(brushSize,20,500);
  }
} 
	
function keyTyped() {
  // change paint color
  if (key == 'r') {
    redColor -= inc;
    redColor = constrain(redColor, 0, 255);
  } 
  if (key == 'R') {
    redColor += inc;
    redColor = constrain(redColor, 0, 255);
  } 
  if (key == 'g') {
    greenColor -= inc;
    greenColor = constrain(greenColor, 0, 255);
  } 
  if (key == 'G') {
    greenColor += inc;
    greenColor = constrain(greenColor, 0, 255);
  }
  if (key == 'b') {
    blueColor -= inc;
    blueColor = constrain(blueColor, 0, 255);
  } 
  if (key == 'B') {
    blueColor += inc;
    blueColor = constrain(blueColor, 0, 255);
  }
}// Notes & Questions:
// fullscreen doesn't work, use localhost for fullscreen
// doesn't work in Firefox for me
// how to turn camera off other than stopping sketch?
// add an option to set camera view (adjust yourself)
// how do I save images back to a database for display in a gallery?

let maxImages = 3;
let images = [];

let camera;
let buttonStart;
let buttonReset;

let time = 0;
let reactionTime = 1500;

let isSnapTime = false;

let portrait;
let snap;
let diptych;

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let s = 1; // frame stroke


function preload() {
  for (var i = 0; i < maxImages; i++) {
    images[i] = loadImage("assets/" + i + ".jpg");
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  preload();
  background(255);

  camera = createCapture(VIDEO);
  camera.hide();

  buttonStart = createButton("start");
  buttonStart.position(windowWidth / 2, windowHeight / 2);
  buttonStart.mousePressed(startProcess);

  let buttonResetPos = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 4);

  buttonReset = createButton("reset");
  buttonReset.position(windowWidth / 2, buttonResetPos);
  buttonReset.mousePressed(resetSketch);
  buttonReset.hide();
}

function draw() {

  if (isSnapTime) {
    if ((millis() - time) > reactionTime) {
      takeSnap();
      isSnapTime = !isSnapTime;
      displayDiptych();
    }
  }
}

function startProcess() {
  background(255);
  buttonStart.hide();
  buttonReset.hide();

  time = millis();
  isSnapTime = true;

  frameStartX = windowWidth / 3;
  frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  frameWidth = windowWidth / 3;
  frameHeight = 4 * windowWidth / 9;

  r = floor(random(0, images.length));
  images[r].filter('gray');
  image(images[r], frameStartX, frameStartY, frameWidth, frameHeight);

  portrait = createImage(frameWidth, frameHeight);
  portrait.copy(images[r], 0, 0, images[r].width, images[r].height, 0, 0, frameWidth, frameHeight);
  // save(portrait, 'portrait.jpg');

  stroke(s);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function takeSnap() {
  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;

  snap = createImage(frameWidth, frameHeight);
  snap.copy(camera, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, frameWidth, frameHeight);
  snap.filter('gray');
  // save(snap, 'snap.jpg');
}

function displayDiptych() {
  let doubleFrameX = windowWidth / 6;
  let doubleFrameY = (windowHeight - 4 * windowWidth / 9) / 2; // same as frameStartY
  let doubleWidth = windowWidth * 2 / 3;
  let doubleHeight = 4 * windowWidth / 9; // same as frameHeight

  image(portrait, doubleFrameX, doubleFrameY);
  image(snap, windowWidth / 2, doubleFrameY);

  // double frame for diptych
  stroke(s);
  noFill();
  rect(doubleFrameX, doubleFrameY, doubleWidth, doubleHeight);

  let centerLineEndY = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 2);
  stroke(s);
  line(windowWidth / 2, doubleFrameY, windowWidth / 2, centerLineEndY);

  buttonReset.show();
}


function resetSketch() {
  background(255);
  buttonReset.hide();
  buttonStart.show();
}let maxImages = 3;
let images = [];

let camera;
let buttonStart;
let buttonReset;
let buttonAdjust;

let time = 0;
let reactionTime = 1500;

let isSnapTime = false;
let isAdjustTime = false;

let portrait;
let snap;
let diptych;

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let s = 1; // frame stroke

let sourceX;
let sourceY;
let sourceWidth;
let sourceHeight;


function preload() {
  for (var i = 0; i < maxImages; i++) {
    images[i] = loadImage("assets/" + i + ".jpg");
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  preload();
  background(255);

  camera = createCapture(VIDEO);
  camera.hide();

  buttonStart = createButton("start");
  buttonStart.position(windowWidth / 2, windowHeight / 2);
  buttonStart.mousePressed(startProcess);

  buttonAdjust = createButton("adjust yourself");
  buttonAdjust.position(windowWidth / 3, windowHeight / 2);
  buttonAdjust.mousePressed(adjustYourself);

  let buttonResetPos = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 4);
  buttonReset = createButton("return to start");
  buttonReset.position(windowWidth / 2, buttonResetPos);
  buttonReset.mousePressed(resetSketch);
  buttonReset.hide();
}


function draw() {
  if (isAdjustTime) {
    adjustYourself();
  }

  if (isSnapTime) {
    if ((millis() - time) > reactionTime) {
      takeSnap();
      isSnapTime = !isSnapTime;
      displayDiptych();
    }
  }
}


function adjustYourself() {
  background(255);
  
  buttonAdjust.hide();
  buttonStart.hide();
  buttonReset.show();

  isAdjustTime = true;
  
  frameStartX = windowWidth / 3;
  frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  frameWidth = windowWidth / 3;
  frameHeight = 4 * windowWidth / 9;

  sourceX = camera.width / 3;
  sourceY = (camera.height - 4 * camera.width / 9) / 2;
  sourceWidth = camera.width / 3;
  sourceHeight = 4 * camera.width / 9;

  // crop camera and draw within frame
  image(camera, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);

  // frame  
  stroke(1);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);

}


function startProcess() {
  background(255);
  buttonStart.hide();
  buttonReset.hide();
  buttonAdjust.hide();

  time = millis();
  isSnapTime = true;

  // frameStartX = windowWidth / 3;
  // frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  // frameWidth = windowWidth / 3;
  // frameHeight = 4 * windowWidth / 9;

  r = floor(random(0, images.length));
  image(images[r], frameStartX, frameStartY, frameWidth, frameHeight);

  portrait = createImage(frameWidth, frameHeight);
  portrait.copy(images[r], 0, 0, images[r].width, images[r].height, 0, 0, frameWidth, frameHeight);
  // save(portrait, 'portrait.jpg');

  stroke(s);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function takeSnap() {
  // sourceX = camera.width / 3;
  // sourceY = (camera.height - 4 * camera.width / 9) / 2;
  // sourceWidth = camera.width / 3;
  // sourceHeight = 4 * camera.width / 9;

  snap = createImage(frameWidth, frameHeight);
  snap.copy(camera, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, frameWidth, frameHeight);
  // save(snap, 'snap.jpg');
}


function displayDiptych() {
  let doubleFrameX = windowWidth / 6;
  let doubleFrameY = (windowHeight - 4 * windowWidth / 9) / 2; // same as frameStartY
  let doubleWidth = windowWidth * 2 / 3;
  let doubleHeight = 4 * windowWidth / 9; // same as frameHeight

  image(portrait, doubleFrameX, doubleFrameY);
  image(snap, windowWidth / 2, doubleFrameY);

  // double frame for diptych
  stroke(s);
  noFill();
  rect(doubleFrameX, doubleFrameY, doubleWidth, doubleHeight);

  let centerLineEndY = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 2);
  stroke(s);
  line(windowWidth / 2, doubleFrameY, windowWidth / 2, centerLineEndY);

  buttonReset.show();
}


function resetSketch() {
  background(255);
  isAdjustTime = false;
  buttonReset.hide();
  buttonStart.show();
  buttonAdjust.show();
}// Notes
// fullscreen doesn't work, use localhost
// how to turn camera off other than stopping sketch?
// add option to set camera view, adjust yourself

let maxImages = 3;
let images = [];

let camera;
let buttonStart;
let buttonReset;

let time = 0;
let reactionTime = 1500;

let isSnapTime = false;

let portrait;
let snap;
let diptych;

let frameStartX;
let frameStartY;
let frameWidth;
let frameHeight;

let s = 1; // frame stroke


function preload() {
  for (var i = 0; i < maxImages; i++) {
    images[i] = loadImage("assets/" + i + ".jpg");
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  preload();
  background(255);

  camera = createCapture(VIDEO);
  camera.hide();

  buttonStart = createButton("start");
  buttonStart.position(windowWidth / 2, windowHeight / 2);
  buttonStart.mousePressed(startProcess);

  let buttonResetPos = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 4);

  buttonReset = createButton("reset");
  buttonReset.position(windowWidth / 2, buttonResetPos);
  buttonReset.mousePressed(resetSketch);
  buttonReset.hide();
}

function draw() {

  if (isSnapTime) {
    if ((millis() - time) > reactionTime) {
      takeSnap();
      isSnapTime = !isSnapTime;
      displayDiptych();
    }
  }
}

function startProcess() {
  background(255);
  buttonStart.hide();
  buttonReset.hide();

  time = millis();
  isSnapTime = true;

  frameStartX = windowWidth / 3;
  frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  frameWidth = windowWidth / 3;
  frameHeight = 4 * windowWidth / 9;

  r = floor(random(0, images.length));
  images[r].filter('gray');
  image(images[r], frameStartX, frameStartY, frameWidth, frameHeight);

  portrait = createImage(frameWidth, frameHeight);
  portrait.copy(images[r], 0, 0, images[r].width, images[r].height, 0, 0, frameWidth, frameHeight);
  // save(portrait, 'portrait.jpg');

  stroke(s);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function takeSnap() {
  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;

  snap = createImage(frameWidth, frameHeight);
  snap.copy(camera, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, frameWidth, frameHeight);
  snap.filter('gray');
  // save(snap, 'snap.jpg');
}

function displayDiptych() {
  let doubleFrameX = windowWidth / 6;
  let doubleFrameY = (windowHeight - 4 * windowWidth / 9) / 2; // same as frameStartY
  let doubleWidth = windowWidth * 2 / 3;
  let doubleHeight = 4 * windowWidth / 9; // same as frameHeight

  image(portrait, doubleFrameX, doubleFrameY);
  image(snap, windowWidth / 2, doubleFrameY);

  // double frame for diptych
  stroke(s);
  noFill();
  rect(doubleFrameX, doubleFrameY, doubleWidth, doubleHeight);

  let centerLineEndY = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 2);
  stroke(s);
  line(windowWidth / 2, doubleFrameY, windowWidth / 2, centerLineEndY);

  buttonReset.show();
}


function resetSketch() {
  background(255);
  buttonReset.hide();
  buttonStart.show();
}let maxImages = 3;
let images = [];

let camera;
let buttonStart;
let buttonReset;

let time = 0;
let reactionTime = 1500;

let isSnapTime = false;

let portrait;
let snap;
let diptych;


function preload() {
  for (var i = 0; i < maxImages; i++) {
    images[i] = loadImage("assets/" + i + ".jpg");
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  preload();
  background(255);

  camera = createCapture(VIDEO);
  camera.hide();

  buttonStart = createButton("start");
  buttonStart.position(windowWidth / 2, windowHeight / 2);
  buttonStart.mousePressed(startProcess);

  let buttonResetPos = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 4);

  buttonReset = createButton("again");
  buttonReset.position(windowWidth / 2, buttonResetPos);
  buttonReset.mousePressed(resetSketch);
  buttonReset.hide();
}

function draw() {

  if (isSnapTime) {
    if ((millis() - time) > reactionTime) {
      takeSnap();
      isSnapTime = !isSnapTime;
      displayDiptych();
    }
  }
}

function startProcess() {
  background(255);
  buttonStart.hide();
  buttonReset.hide();

  time = millis();
  isSnapTime = true;

  let frameStartX = windowWidth / 3;
  let frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  let frameWidth = windowWidth / 3;
  let frameHeight = 4 * windowWidth / 9;

  r = floor(random(0, images.length));
  image(images[r], frameStartX, frameStartY, frameWidth, frameHeight);

  portrait = createImage(frameWidth, frameHeight);
  portrait.copy(images[r], 0, 0, images[r].width, images[r].height, 0, 0, frameWidth, frameHeight);
  // save(portrait, 'portrait.jpg');

  stroke(1);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function takeSnap() {
  let frameStartX = windowWidth / 3;
  let frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  let frameWidth = windowWidth / 3;
  let frameHeight = 4 * windowWidth / 9;

  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;

  snap = createImage(frameWidth, frameHeight);
  snap.copy(camera, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, frameWidth, frameHeight);
  // save(snap, 'snap.jpg');

  // let snap = camera.get(sourceX, sourceY, sourceWidth, sourceHeight);
  // save(snap, 'snap.jpg');
}

function displayDiptych() {
  let doubleFrameX = windowWidth / 6;
  let doubleFrameY = (windowHeight - 4 * windowWidth / 9) / 2; // same as frameStartY
  let doubleWidth = windowWidth * 2 / 3;
  let doubleHeight = 4 * windowWidth / 9; // same as frameHeight

  image(portrait, doubleFrameX, doubleFrameY);
  image(snap, windowWidth / 2, doubleFrameY);

  // double frame for diptych
  stroke(1);
  noFill();
  rect(doubleFrameX, doubleFrameY, doubleWidth, doubleHeight);

  let centerLineEndY = windowHeight - ((windowHeight - (4 * windowWidth / 9)) / 2);
  stroke(1);
  line(windowWidth / 2, doubleFrameY, windowWidth / 2, centerLineEndY);

  buttonReset.show();
}


function resetSketch() {
  background(255);
  buttonReset.hide();
  buttonStart.show();
}var cameraFeed;
var myImage;
var button;

function takeSnapshot() {
  	//myImage.copy(src,sx,sy,sw,sh,dx,dy,dw,dh);
    myImage.copy(cameraFeed,250,0,250,470,0,0,240,320);
  	save(myImage);
}

function setup() {
    cameraFeed = createCapture(VIDEO);
  	// cameraFeed.hide();
//     cameraFeed.size(320,240);
//     cameraFeed.canvas = {width: 320, height: 240};
//     console.log(cameraFeed);
    button = createButton('SNAP');
    button.mousePressed(takeSnapshot);

    myImage = createImage(320,240);
}

function draw() {
    // image(myImage,0,245,320,240);
}let maxImages = 3;
let images = [];

let camera;
let buttonStart;

let time = 0;
let reactionTime = 1500;

let isSnapTime = false;

let portrait;
let snap;
let diptych;


function preload() {
  for (var i = 0; i < maxImages; i++) {
    images[i] = loadImage("assets/" + i + ".jpg");
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  preload();
  background(255);

  camera = createCapture(VIDEO);
  camera.hide();

  buttonStart = createButton("start");
  buttonStart.position(windowWidth / 2, windowHeight / 2);
  buttonStart.mousePressed(startProcess);
}

function draw() {

  if (isSnapTime) {
    if ((millis() - time) > reactionTime) {
      takeSnap();
      isSnapTime = !isSnapTime;
      resetSketch();
    }
  }
}

function startProcess() {
  background(255);
  buttonStart.hide();

  time = millis();
  isSnapTime = true;

  let frameStartX = windowWidth / 3;
  let frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  let frameWidth = windowWidth / 3;
  let frameHeight = 4 * windowWidth / 9;

  r = floor(random(0, images.length));
  image(images[r], frameStartX, frameStartY, frameWidth, frameHeight);
  
  portrait = createImage(frameWidth, frameHeight);
  portrait.copy(images[r], 0, 0, images[r].width, images[r].height, 0, 0, frameWidth, frameHeight);
  // save(portrait, 'portrait.jpg');
  
  stroke(1);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function takeSnap() {
  let frameStartX = windowWidth / 3;
  let frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  let frameWidth = windowWidth / 3;
  let frameHeight = 4 * windowWidth / 9;
  
  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;

  snap = createImage(frameWidth, frameHeight);
  snap.copy(camera, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, frameWidth, frameHeight);
  save(snap, 'snap.jpg');

  // let snap = camera.get(sourceX, sourceY, sourceWidth, sourceHeight);
  // save(snap, 'snap.jpg');
}


function resetSketch() {
  background(255);
  buttonStart.show();
}let maxImages = 3;
let images = [];

let camera;
let buttonStart;

let time = 0;
let reactionTime = 1500;

let isSnapTime = false;


function preload() {
  for (var i = 0; i < maxImages; i++) {
    images[i] = loadImage("assets/" + i + ".jpg");
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  preload();
  background(255);

  camera = createCapture(VIDEO);
  camera.hide();

  buttonStart = createButton("start");
  buttonStart.position(windowWidth / 2, windowHeight / 2);
  buttonStart.mousePressed(startProcess);
}


function draw() {

  if (isSnapTime) {
    if ((millis() - time) > reactionTime) {
      takeSnap();
      isSnapTime = !isSnapTime;
      resetSketch();
    }
  }
}


function startProcess() {
  background(255);
  buttonStart.hide();

  time = millis();
  isSnapTime = true;

  let frameStartX = windowWidth / 3;
  let frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  let frameWidth = windowWidth / 3;
  let frameHeight = 4 * windowWidth / 9;

  r = floor(random(0, images.length));
  image(images[r], frameStartX, frameStartY, frameWidth, frameHeight);

  stroke(1);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function takeSnap() {
  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;

  let snap = camera.get(sourceX, sourceY, sourceWidth, sourceHeight);
  save(snap, 'portrait.jpg');
}


function resetSketch() {
  background(255);
  buttonStart.show();
}let maxImages = 3; // pool of potraits to flash at user
let images = []; // array for those images

let camera;
let buttonStart;

let time = 0;		
let reactionTime = 1500; // amt of time before snap taken

let isSnapTime = false;

// preload portrait images into that array
function preload() {
  for (var i = 0; i < maxImages; i++) {
    images[i] = loadImage("assets/" + i + ".jpg");
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  preload();
  background(255);

  camera = createCapture(VIDEO);	// start the camera
  camera.hide();									// but hide its display

  buttonStart = createButton("start"); 
  buttonStart.position(windowWidth / 2, windowHeight / 2);
  buttonStart.mousePressed(startProcess); // a button to get it going
}

function draw() {

  // this boolean is set to true when start button pressed	
  if (isSnapTime) {
    if ((millis() - time) > reactionTime) { // millis set when start button pressed
      takeSnap(); // calls the function in which user portrait is taken
      isSnapTime = !isSnapTime; // turns the flag off
      resetSketch(); // redraws background and start button
    }
  }
}

function startProcess() {
  background(255);
  buttonStart.hide();

  time = millis();
  isSnapTime = true;

  // variables for setting the frame programmatically
  let frameStartX = windowWidth / 3;
  let frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  let frameWidth = windowWidth / 3;
  let frameHeight = 4 * windowWidth / 9;

  // get a random number and round it down
  r = floor(random(0, images.length));
  // pull a random image from the array and draw it to the frame
  image(images[r], frameStartX, frameStartY, frameWidth, frameHeight);
  
  // draw an actual frame
  stroke(1);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}


function takeSnap() {
  // variables for getting crop from camera/video feed
  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;

  // get the pixels from that specific area of the camera feed
  let snap = camera.get(sourceX, sourceY, sourceWidth, sourceHeight);
  
  // save a picture of those pixels to disk
  save(snap, 'portrait.jpg');
}

function resetSketch() {
  background(255);
  buttonStart.show();
}let camera;
let button;

function setup() {
  createCanvas(windowWidth, windowHeight);
  camera = createCapture(VIDEO);
  camera.hide();
  
  button = createButton("snap");
	button.position(windowWidth/3, windowHeight-windowHeight/12);
  button.mousePressed(takeSnapshot);
}

function takeSnapshot() {
  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;
  
  let snap = camera.get(sourceX, sourceY, sourceWidth, sourceHeight); 
  save(snap, 'myCanvas.jpg');
}


function draw() {
  background(255);

  let frameStartX = windowWidth / 3;
  let frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  let frameWidth = windowWidth / 3;
  let frameHeight = 4 * windowWidth / 9;

  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;

  image(camera, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);
  // frame  
  stroke(1);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);

  // eye line   
  // line(frameStartX, (windowHeight * 0.4), (frameStartX * 2), (windowHeight * 0.4));
}let maxImages = 3;
let images = [];

function preload() {
  for (var i = 0; i < maxImages; i++) {
    images[i] = loadImage("assets/" + i + ".jpg");
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  preload();
  background(255);
}

function draw() {
  
}

function mousePressed() {
  let frameStartX = windowWidth / 3;
  let frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  let frameWidth = windowWidth / 3;
  let frameHeight = 4 * windowWidth / 9;

  r = floor(random(0, images.length));
  image(images[r], frameStartX, frameStartY, frameWidth, frameHeight);

  stroke(1);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
}let camera;

let videoScale = 16;

function setup() {
  pixelDensity(1);
  createCanvas(640, 480);
  camera = createCapture(VIDEO);
  camera.size(width / videoScale, height / videoScale);
  // camera.hide();
}

function draw() {
  background(255);

  camera.loadPixels()
  loadPixels();
  for (let y = 0; y < camera.height; y++) {
    for (let x = 0; x < camera.width; x++) {
      let index = (x + y * camera.width) * 4;
      let r = camera.pixels[index + 0];
      let g = camera.pixels[index + 1];
      let b = camera.pixels[index + 2];

      // pixels[index+0] = b;
      // pixels[index+1] = r; 
      // pixels[index+2] = g;
      // pixels[index+3] = 255;
      
      noStroke();
			fill(r, g, b);
      rect(x * videoScale, y * videoScale, videoScale, videoScale);

    }
  }
  // updatePixels();

  // displays camera
  // image(camera, 0,0, 320, 240);

}let camera;

function setup() {
  createCanvas(windowWidth, windowHeight);
  camera = createCapture(VIDEO);
  camera.hide();
  // background(255);

}

function draw() {
  background(255);

  if (mouseIsPressed) {
    adjustYoSelf();
  }
}


function adjustYoSelf() {
  let frameStartX = windowWidth / 3;
  let frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  let frameWidth = windowWidth / 3;
  let frameHeight = 4 * windowWidth / 9;

  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;
  
  // crop camera and draw within frame
  image(camera, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);

  // frame  
  stroke(1);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);

  // eye line   
  // line(frameStartX, (windowHeight * 0.4), (frameStartX * 2), (windowHeight * 0.4));
}let camera;

function setup() {
  let density = displayDensity();
  pixelDensity(density);
  createCanvas(windowWidth, windowHeight);
  camera = createCapture(VIDEO);
  camera.hide();

}

function draw() {
  background(255);

  let frameStartX = windowWidth / 3;
  let frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  let frameWidth = windowWidth / 3;
  let frameHeight = 4 * windowWidth / 9;

  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;

  image(camera, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);
  // frame  
  stroke(1);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);

  // eye line   
  // line(frameStartX, (windowHeight * 0.4), (frameStartX * 2), (windowHeight * 0.4));

}let camera;

function setup() {
  let density = displayDensity();
  pixelDensity(density);
  createCanvas(windowWidth, windowHeight);
  background(255);
  camera = createCapture(VIDEO);
  camera.hide();
}

function draw() {
  background(255);

//   let frameStartX = windowWidth / 3;
//   let frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
//   let frameWidth = windowWidth / 3;
//   let frameHeight = 4 * windowWidth / 9;

//   let sourceX = camera.width / 3;
//   let sourceY = (camera.height - 4 * camera.width / 9) / 2;
//   let sourceWidth = camera.width / 3;
//   let sourceHeight = 4 * camera.width / 9;

  if (mouseIsPressed) {
    adjustYoSelf();
  }
}

function adjustYoSelf() {
  let frameStartX = windowWidth / 3;
  let frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  let frameWidth = windowWidth / 3;
  let frameHeight = 4 * windowWidth / 9;

  let sourceX = camera.width / 3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width / 3;
  let sourceHeight = 4 * camera.width / 9;

  // crop camera feed and draw within frame
  image(camera, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);

  // frame
  stroke(1);
  noFill();
  rect(frameStartX, frameStartY, frameWidth, frameHeight);
  // eye line   
  line(frameStartX, (windowHeight * 0.4), (frameStartX * 2), (windowHeight * 0.4));
}let camera;




function setup() {
  let density = displayDensity();
  pixelDensity(density);
  createCanvas(windowWidth, windowHeight);
  background(255);
  camera = createCapture(VIDEO);
  camera.hide();
}

function draw() {
  background(255);
  
  let frameStartX = windowWidth / 3;
  let frameStartY = (windowHeight - 4 * windowWidth / 9) / 2;
  let frameWidth = windowWidth / 3;
  let frameHeight = 4 * windowWidth / 9;
  
  let sourceX = camera.width/3;
  let sourceY = (camera.height - 4 * camera.width / 9) / 2;
  let sourceWidth = camera.width/3;
  let sourceHeight = 4 * camera.width / 9;
  
  // displays camera capture at full screen
  // image(camera, 0,0, windowWidth, windowWidth * camera.height / camera.width);
  
  if (mouseIsPressed) {
  // dislpays camera capture within rectangle
  // image(camera, windowWidth/3, ((windowHeight - ((4 * windowWidth) / 9)) / 2), windowWidth/3, ((4 * windowWidth)/9), camera.width/3, ((camera.height - ((4 * camera.width) / 9)) / 2), camera.width/3, ((4 * camera.width)/9));
  image(camera, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);  
    
  stroke(1);
  noFill();
  // rect(windowWidth/3, ((windowHeight - ((4 * windowWidth) / 9)) / 2), windowWidth/3, ((4 * windowWidth)/9));

  rect(frameStartX, frameStartY, frameWidth, frameHeight);
    
  // line(windowWidth/3, ((windowHeight - ((4 * windowWidth) / 9)) * 1), (windowWidth/3 + windowWidth/3), ((windowHeight - ((4 * windowWidth) / 9))));
  }
  
}

// function mousePressed() {

// }var c = null;

function setup() {
  c = createCanvas(400, 400);
  getData();
}

function getData() {
  httpGet("http://emn200.itp.io:9000/send", 'json', false,

    function(response) {
      for (var i = 0; i < response.length; i++) {
        ellipse(response[i].x, response[i].y, 20, 20);
      }
      setTimeout(getData, 100);
    });

}

function draw() {
  //background(220);
  fill(0, 0, 0);
}

function mousePressed() {
  ellipse(mouseX, mouseY, 20, 20);
  httpGet("http://emn200.itp.io:9000/save?x=" + mouseX + "&y=" + mouseY, 'json', false, function(response) {});
}var mic;
var fft;

function setup() {
  createCanvas(500, 500);
  
  mic = new p5.AudioIn()
  mic.start();
  
  fft = new p5.FFT();
  fft.setInput(mic);
}


function draw() {
  background(0);
  
  // amplitude or volume
  micLevel = mic.getLevel();
  noStroke();
  fill(0,255,0);
  ellipse(width / 4, constrain(height - micLevel * height * 5, 0, height), 10, 10);
	
  // freqency...maybe?
  var spectrum = fft.analyze();
  // console.log(spectrum); // spectrum is an array
  
  // let's try to get the average of the array
  // https://stackoverflow.com/questions/29544371/finding-the-average-of-an-array-using-js
	var total = 0;
	for (var i = 0; i < spectrum.length; i++) {
	total += spectrum[i];
	}
	var average = total / spectrum.length;
	console.log("spectrum_average " + average);
  
  noStroke();
  fill(255,255,0);
  mappedAverage = map(average, 0, 100, 0, height);
  ellipse(width - width / 4, constrain(height - mappedAverage, 0, height), 10, 10);
}
let h; // Define variable for hue
let a; // Define variable for alpha

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 100);
  background(220);
}

function draw() {
  // h = random(100);
  // a = random(100);
}

function mouseClicked() {
  h = random(100);
  a = random(100);
  fill(h, 100, 100, a);
  noStroke();
  ellipse(mouseX, mouseY, 100, 100);
}// Define alpha value
let value = 10;

function setup() { 
  createCanvas(400, 400);
  colorMode(HSB, 100);
} 

function draw() { 
  background(220);
  rectMode(CENTER);
  noStroke();
  fill(60, 100, 100, value);
  rect(width/2,width/2, 100, 100); 
}

function mouseClicked() {
  if (value < 100) {
    value = value + 10;
  } else {
    value = 10; 
  }
}function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 100, 200);
	rectMode(CENTER);
  rect(windowWidth/2,windowHeight/2,100,100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log(windowWidth, " and ", windowHeight);
}// reference example: https://cvalenzuela.github.io/p5-deeplearn-js/docs/knn-image-example.html

let knn;
let video;
let buttonA;
let buttonB;
let guessButton;

function preload() {
 knn = new p5ml.KNNImageClassifier(modelloaded, 2, 1);
}

function modelloaded() {
 console.log('loaded'); 
}

function setup() { 
  createCanvas(320, 240).parent('canvas');
  video = createCapture(VIDEO);
  background(0);
  video.size(227,227);
  video.hide();
  
  buttonA = select('#buttonA');
  buttonB = select('#buttonB');
  guessButton = select('#buttonPredict');
  
  buttonA.mousePressed(() => {
    train(1); // train class one
    console.log('train a');
  });
  
  buttonB.mousePressed(() => {
    train(2); // train class two
    console.log('train b');
  });
  
  guessButton.mousePressed(() => {
		predict();
	});
} 

function train(index) {
  knn.addImage(video.elt, index);
}

function predict() {
 knn.predict(video.elt, gotResult) 
}

function gotResult(res) {
  if (res.classIndex) console.log(res.classIndex);
}

function draw() { 
  background(0);
  image(video, 0, 0, width, height);
}//create a synth and connect it to the master output (your speakers)
let synth = new Tone.Synth().toMaster();


function setup() { 
  createCanvas(400, 400);
} 


function keyPressed() {
  if (keyCode === 65) { // 'a'
    playNoteA();
  }

  if (keyCode === 66) { // 'b'
    playNoteB();
  }

  if (keyCode === 67) { // 'c'
    playNoteC();
  }

  if (keyCode === 68) { // 'd'
    playNoteD();
  }

  if (keyCode === 71) { // 'g'
    playNoteG();
  }
}


function playNoteA() { 
	synth.triggerAttackRelease("A4", "8n");
}
  
function playNoteB() {
	synth.triggerAttackRelease("B4", "8n");
}

function playNoteC() {
  //play a middle 'C' for the duration of an 8th note
	synth.triggerAttackRelease("C4", "8n");
}
  
function playNoteD() {
	synth.triggerAttackRelease("D4", "8n");
}
 

function playNoteG() {
	synth.triggerAttackRelease("G4", "8n");
}
  
// function draw() { 
//   background(220);d
// }




// CSPen Interation 3
// Use with Arduino Sketch: 

let noteA;
let noteB;
let noteC;
let noteD;
let noteG;


function preload() {
  noteA = loadSound('assets/oct-a.mp3');
  noteB = loadSound('assets/oct-b.mp3');
  noteC = loadSound('assets/oct-c.mp3');
  noteD = loadSound('assets/oct-d.mp3');
  noteG = loadSound('assets/oct-g.mp3');
}

function setup() {
  // createCanvas(400, 400);
  // background(200);
  createP("press the button of the note you want to hear: a, b, c, d, g");
}


function keyPressed() {
  if (keyCode === 65) { // 'a'
    playNoteA();
  }

  if (keyCode === 66) { // 'b'
    playNoteB();
  }

  if (keyCode === 67) { // 'c'
    playNoteC();
  }

  if (keyCode === 68) { // 'd'
    playNoteD();
  }

  if (keyCode === 71) { // 'g'
    playNoteG();
  }
}


function playNoteA() {
  if (!noteA.isPlaying()) {
    noteA.play();
  }
}

function playNoteB() {
  if (!noteB.isPlaying()) {
    noteB.play();
  }
}
g
function playNoteC() {
  if (!noteC.isPlaying()) {
    noteC.play();
  }
}

function playNoteD() {
  if (!noteD.isPlaying()) {
    noteD.play();
  }
}

function playNoteG() {
  if (!noteG.isPlaying()) {
    noteG.play();
  }
}


// function draw() {
//   background(220);
// }function setup() { 
  createCanvas(windowWidth, windowHeight);
} 

function draw() { 
  background(220);
}

// Turn off browser elements for true fullscreen
// https://www.lifewire.com/activate-and-deactivate-full-screen-mode-in-google-chrome-4129251// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Simple Particle System
// Edited Video: https://www.youtube.com/watch?v=UcdigVaIYAk

particles = [];

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      // remove this particle
      particles.splice(i, 1);
    }
  }
}

function mousePressed(){
 		let p = new Particle();
    particles.push(p); 
}


class Particle {

  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.r = 10;
    this.w = 10; 
    this.alpha = 255;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.r += 10; 
    this.alpha -= 5;
  }

  show() {
    stroke(255, this.alpha);
    strokeWeight(this.w);
    noFill();
    // fill(255, this.alpha);
    ellipse(this.x, this.y, this.r);
  }

}
let rectangles = [];
let emojis = [];

function preload() {
  for (var i = 0; i < 10; i++) {
    emojis[i] = loadImage("images/emoji" + i + ".png");
  }
}

function setup() {
  createCanvas(800, 800);

  for (let i = 0; i < 10; i++) {
    let x = random(width - 50);
    let y = random(height - 50);
    let w = random(50,200);
    let h = random(50,200);
    rectangles[i] = new Rectangle(x, y, w, h, emojis[i]);
  }
}

function draw() {
  background(0);

  for (i = 0; i < rectangles.length; i++) {
    rectangles[i].show(mouseX, mouseY);
  }
}

function mousePressed() {
  for (i = 0; i < rectangles.length; i++) {
    rectangles[i].pressed(mouseX, mouseY);
  }
}

function mouseReleased() {
  for (i = 0; i < rectangles.length; i++) {
    rectangles[i].notPressed();
  }
}

class Rectangle {
  constructor(x, y, w, h, emoji) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = emoji;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
    this.rollover = false;
  }

  show(px, py) {
    if (this.dragging) {
      this.x = px + this.offsetX;
      this.y = py + this.offsetY;
    }

    stroke(255);
    noFill();
    image(this.img, this.x, this.y, this.w, this.h);
    // rect(this.x, this.y, this.w, this.h);
  }

  pressed(px, py) {
    if (px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h) {
      // print("clicked on rect");
      this.dragging = true;
      this.offsetX = this.x - px;
      this.offsetY = this.y - py;
    }
  }

  notPressed() {
    // print("mouse was released");
    this.dragging = false;
  }
}let rectangles = [];

function setup() {
  createCanvas(600, 400);

  for (let i = 0; i < 10; i++) {
  	let x = random(width);
  	let y = random(height);
  	let w = random(10,40); 
  	let h = random(10,40);
  	rectangles[i] = new Rectangle(x,y,w,h);
  }
}

function draw() {
  background(0);

  for (i = 0; i < rectangles.length; i++) {
  	rectangles[i].show(mouseX,mouseY);
  }
}

function mousePressed() {
  for (i = 0; i < rectangles.length; i++) {
  rectangles[i].pressed(mouseX,mouseY);
  }
}

function mouseReleased() {
  for (i = 0; i < rectangles.length; i++) {
  rectangles[i].notPressed();
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
    this.rollover = false;
  }

  show(px, py) {
    if (this.dragging) {
      this.x = px + this.offsetX;
      this.y = py + this.offsetY;
    }

    stroke(255);
    noFill();
    rect(this.x, this.y, this.w, this.h);
  }

  pressed(px, py) {
    if (px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h) {
      // print("clicked on rect");
      this.dragging = true;
      this.offsetX = this.x - px;
      this.offsetY = this.y - py;
    }
  }

  notPressed() {
    	// print("mouse was released");
      this.dragging = false;
  }
}let rectangles = [];

function setup() {
  createCanvas(600, 400);

  for (let i = 0; i < 10; i++) {
  	let x = random(width);
  	let y = random(height);
  	let w = random(10,40); 
  	let h = random(10,40);
  	rectangles[i] = new Rectangle(x,y,w,h);
  }
}

function draw() {
  background(0);

  for (i = 0; i < rectangles.length; i++) {
  	rectangles[i].show(mouseX,mouseY);
  }
}


function mousePressed() {
  for (i = 0; i < rectangles.length; i++) {
  rectangles[i].pressed(mouseX,mouseY);
  }
}

function mouseReleased() {
  for (i = 0; i < rectangles.length; i++) {
  rectangles[i].notPressed();
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
    this.rollover = false;
  }

  show(px, py) {
    if (this.dragging) {
      this.x = px + this.offsetX;
      this.y = py + this.offsetY;
    }

    stroke(255);
    noFill();
    rect(this.x, this.y, this.w, this.h);
  }

  pressed(px, py) {
    if (px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h) {
      // print("clicked on rect");
      this.dragging = true;
      this.offsetX = this.x - px;
      this.offsetY = this.y - py;
    }
  }

  notPressed() {
    	// print("mouse was released");
      this.dragging = false;
  }
}let rectangle;

function setup() {
  createCanvas(600, 400);

  let x = random(width);
  let y = random(height);
  let w = random(10, 40);
  let h = random(10, 40);
  rectangle = new Rectangle(x, y, w, h);
}

function draw() {
  background(0);
  rectangle.show(mouseX, mouseY);
}


function mousePressed() {
  rectangle.pressed(mouseX, mouseY);
}

function mouseReleased() {
  rectangle.notPressed();
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
    this.rollover = false;
  }

  show(px, py) {
    if (this.dragging) {
      this.x = px + this.offsetX;
      this.y = py + this.offsetY;
    }

    stroke(255);
    noFill();
    rect(this.x, this.y, this.w, this.h);
  }

  pressed(px, py) {
    if (px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h) {
      print("clicked on rect");
      this.dragging = true;
      this.offsetX = this.x - px;
      // print(this.offsetX);
      this.offsetY = this.y - py;
      // print(this.offsetY);
    }
  }

  notPressed(px, py) {
    	print("mouse was released");
      this.dragging = false;
  }
}var dragging = false;
var rollover = false;

var x, y, w, h;
var offsetX, offsetY;

var max;


function preload() {
  max = loadImage("maxheadroom.png");
}


function setup() { 
  createCanvas(600, 600);
  
  x = 0;
  y = 0;
  w = 150;
  h = 100;
} 

function draw() { 
  background(240);
  drawMax();
}


function drawMax() {
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    rollover = true;
  } else {
    rollover = false;
  }

  if (dragging) {
    x = mouseX + offsetX;
    y = mouseY + offsetY;
  }

  image(max, x, y, w, h);
}

function mousePressed() {
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    offsetX = x - mouseX;
    offsetY = y - mouseY;
  }
}

function mouseReleased() {
  dragging = false;
}function preload() {
  max = loadImage("maxheadroom.png");
}


function setup() { 
  createCanvas(600, 600);
  
  x = 0;
  y = 0;
  w = 150;
  h = 100;
} 

function draw() { 
  background(240);
  drawMax();
}function preload() {
  max = loadImage("maxheadroom.png");
}


function setup() { 
  createCanvas(600, 600);
  
  x = 0;
  y = 0;
  w = 150;
  h = 100;
} 

function draw() { 
  background(240);
  drawMax();
}saveCount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  fill(200, 200, 200, 20);
  noStroke();
  ellipse(mouseX, mouseY, 30, 30);
}

function keyPressed() {
  if (key == 'x') {
    save("screenshot" + saveCount + ".png");
    saveCount++;
  }
}// not representative of actual functionality, just an illustration

let pulse1 = 100;
let isGrowing1 = true;
let x1 = 150;
let speed1 = 4;

let pulse2 = 100;
let isGrowing2 = true;
let x2 = 450;
let speed2 = 1;

function setup() {
  createCanvas(600, 600);
  ellipseMode(CENTER);

  slider1 = createSlider(150, 300, x1);
  slider1.position(150, 650);

  slider2 = createSlider(300, 450, x2);
  slider2.position(325, 650);
}

function draw() {
  background(240);

  x1 = slider1.value();
  x2 = slider2.value();

  // heart beat 1
  if (pulse1 > 200) {
    isGrowing1 = false;
  } else if (pulse1 < 100) {
    isGrowing1 = true;
  }

  if (isGrowing1 == true) {
    pulse1 += speed1;
  } else if (isGrowing1 == false) {
    pulse1 -= speed1;
  }

  // change speed1 at center, when x1 = 300
  if (x1 == 300) {
    speed1 = 2.5
  } else if (x1 < 300) {
    speed1 = 3;
  }

  // noStroke();
  stroke(250, 255, 0, 255)
  strokeWeight(8);
  fill(250, 255, 0, 100)
  ellipse(x1, 300, pulse1, pulse1);


  // heart beat 2
  if (pulse2 > 200) {
    isGrowing2 = false;
  } else if (pulse2 < 100) {
    isGrowing2 = true;
  }

  if (isGrowing2 == true) {
    pulse2 += speed2;
  } else if (isGrowing2 == false) {
    pulse2 -= speed2;
  }

  // change speed2 at center, when x2 = 300
  if (x2 == 300) {
    speed2 = 2.5
  } else if (x2 < 300) {
    speed2 = 1;
  }

  // noStroke();
  stroke(0, 50, 250, 255);
  strokeWeight(8);
  fill(0, 50, 250, 135)
  ellipse(x2, 300, pulse2, pulse2);
}// not representative of actual functionality, just an illustration

y = 600;
b = 600;

function setup() {
  createCanvas(600, 600);
  ellipseMode(CENTER);

}

function draw() {
  background(240);


  ellipse(300, y, 20, 20)
  y = y - 1;


  ellipse(200, b, 20, 20)
  b = b - 1;

}let a = 0

function setup() { 
  createCanvas(400, 400, WEBGL);
} 

function draw() { 
  background(220);
  fill(0);
  rotateX(a);
  rectMode(CENTER)
  rect(0,0,100,100);
  
  a += 0.05;
}// not representative of actual functionality, just an illustration

let pulse1 = 100;
let isGrowing1 = true;
let x1 = 150;
let speed1 = 4;

let pulse2 = 100;
let isGrowing2 = true;
let x2 = 450;
let speed2 = 1;

function setup() {
  createCanvas(600, 600);
  ellipseMode(CENTER);

  slider1 = createSlider(150, 300, x1);
  slider1.position(150, 650);

  slider2 = createSlider(300, 450, x2);
  slider2.position(325, 650);
}

function draw() {
  background(240);

  x1 = slider1.value();
  x2 = slider2.value();

  // heart beat 1
  if (pulse1 > 200) {
    isGrowing1 = false;
  } else if (pulse1 < 100) {
    isGrowing1 = true;
  }

  if (isGrowing1 == true) {
    pulse1 += speed1;
  } else if (isGrowing1 == false) {
    pulse1 -= speed1;
  }

  // change speed1 at center, when x1 = 300
  if (x1 == 300) {
    speed1 = 2.5
  } else if (x1 < 300) {
    speed1 = 3;
  }

  noStroke();
  fill(250, 255, 0, 200)
  ellipse(x1, 300, pulse1, pulse1);


  // heart beat 2
  if (pulse2 > 200) {
    isGrowing2 = false;
  } else if (pulse2 < 100) {
    isGrowing2 = true;
  }

  if (isGrowing2 == true) {
    pulse2 += speed2;
  } else if (isGrowing2 == false) {
    pulse2 -= speed2;
  }

  // change speed2 at center, when x2 = 300
  if (x2 == 300) {
    speed2 = 2.5
  } else if (x2 < 300) {
    speed2 = 1;
  }

  noStroke();
  fill(0, 50, 250, 135)
  ellipse(x2, 300, pulse2, pulse2);
}// not representative of actual functionality, just an illustration

// as you move the sliders the position of ellipse && the speed of growing equal

let pulse1 = 100;
let isGrowing1 = true;
let x1 = 150;

let pulse2 = 100;
let isGrowing2 = true;
let x2 = 450;

function setup() {
  createCanvas(600, 600);
  ellipseMode(CENTER);

  slider1 = createSlider(150, 300, x1);
  slider1.position(150, 650);

  slider2 = createSlider(300, 450, x2);
  slider2.position(325, 650);
}

function draw() {
  background(240);

  x1 = slider1.value();
  x2 = slider2.value();

  // heart beat 1
  if (pulse1 > 225) {
    isGrowing1 = false;
  } else if (pulse1 < 100) {
    isGrowing1 = true;
  }

  if (isGrowing1 == true) {
    pulse1 += 1.2;
  } else if (isGrowing1 == false) {
    pulse1 -= 1.2;
  }

  noStroke();
  fill(250, 255, 0, 200)
  ellipse(x1, 300, pulse1, pulse1);


  // heart beat 2
  if (pulse2 > 200) {
    isGrowing2 = false;
  } else if (pulse2 < 100) {
    isGrowing2 = true;
  }

  if (isGrowing2 == true) {
    pulse2 += 1.2;
  } else if (isGrowing2 == false) {
    pulse2 -= 1.2;
  }

  noStroke();
  fill(0, 50, 250,100)
  ellipse(x2, 300, pulse2, pulse2);
}let pulse1 = 50;
let isGrowing1 = true;

let pulse2 = 50;
let isGrowing2 = true;

function setup() {
  createCanvas(600, 600);
  ellipseMode(CENTER);
}

function draw() {
  background(240);
  
  // heart beat 1
  if (pulse1 > 100) {
    isGrowing1 = false;
  } else if (pulse1 < 50) {
    isGrowing1 = true;
  }

  if (isGrowing1 == true) {
    pulse1 += 1;
    // otherwise if size1 equals 1, then decrease pulse1 by 1 until it is less than 55
  } else if (isGrowing1 == false) {
    pulse1 -= 1;
  }

  noStroke();
  fill(250, 255, 0)
  ellipse(150, 300, pulse1, pulse1);


  // heart beat 2
  if (pulse2 > 100) {
    isGrowing2 = false;
  } else if (pulse2 < 50) {
    isGrowing2 = true;
  }

  if (isGrowing2 == true) {
    pulse2 += 1;
    // otherwise if size1 equals 1, then decrease pulse1 by 1 until it is less than 55
  } else if (isGrowing2 == false) {
    pulse2 -= 1;
  }

  noStroke();
  fill(0, 50, 250)
  ellipse(450, 300, pulse2, pulse2);
}// example from https://forum.processing.org/two/discussion/8291/rollover-for-animation
// retrieved from  https://forum.processing.org/two/discussion/10761/#Comment_41846


let pulse = 100;
let bigsmall = 1;
 
function setup()
{
  createCanvas(420, 420);
  ellipseMode(CENTER);
  frameRate(30);
  noStroke();
  fill(0);
  smooth();
}
 
function draw()
{
  if (pulse > 199) {
    bigsmall = 0;
    print("pulse: " + pulse + " bigsmall " + bigsmall);
  } else if (pulse < 101) {
    bigsmall = 1;
    print("pulse: " + pulse + " bigsmall " + bigsmall);
  }
 
  if (bigsmall == 1) {
    pulse += 2;
  } else if (bigsmall == 0) {
    pulse -= 2;  
  }
 
  background(255);
  ellipse(width / 2, height / 2, pulse, pulse);
 
}let pulse1 = 50;
let size1 = 1;

let pulse2 = 50;
let growing2 = true;

function setup() {
  createCanvas(600, 600);
  ellipseMode(CENTER);
}

function draw() {
  background(240);

  // heart beat 1
  // if pulse1 value is great than 110, set size1 to 1
  if (pulse1 > 100) {
    size1 = 1;
    // print("pulse: " + pulse1 + " size " + size1);
    // if pulse1 value is less than 55, set size1 to 0
  } else if (pulse1 < 50) {
    size1 = 0;
    // print("pulse: " + pulse1 + " size " + size1);
  }

  // if size1 equals 0, then increment pulse1 by 1 until it is greater than 110
  if (size1 == 0) {
    pulse1 += 1;
    // otherwise if size1 equals 1, then decrease pulse1 by 1 until it is less than 55
  } else if (size1 == 1) {
    pulse1 -= 1;
  }

  noStroke();
  fill(250, 255, 0)
  ellipse(150, 300, pulse1, pulse1);


  // heart beat 2
  if (pulse2 > 100) {
    growing2 = false;
  } else if (pulse2 < 50) {
    growing2 = true;
  }

  if (growing2 == true) {
    pulse2 += 1;
    // otherwise if size1 equals 1, then decrease pulse1 by 1 until it is less than 55
  } else if (growing2 == false) {
    pulse2 -= 1;
  }

  noStroke();
  fill(0, 50, 250)
  ellipse(450, 300, pulse2, pulse2);

}var kinectron = null;

function preload(){

}

function setup() {
	createCanvas(500, 500);
  var address = {host: '172.16.219.19', port: 9001, path: '/'};
	kinectron = new Kinectron('kinectron',address);
	kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
  //set the callback function name to be called when stuff comes from kinect
}

function draw() {

}

function trackBody(body) {
  background(0);
  var val = body.joints[kinectron.HANDRIGHT].cameraZ;
  var brightness = map(val,0,3,0,255);
  println(brightness);
  background(brightness);
}var kinectron = null;
var myImage;

var rightHandX;  //have to mention them here 
var rightHandY;  //because they are shared between draw and trackBody



function preload(){
  myImage = loadImage("cute.jpg");
}


function setup() {
	createCanvas(640, 480);
  var address = {host: '172.16.219.19', port: 9001, path: '/'};
	kinectron = new Kinectron('kinectron',address);
	kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
  //set the callback function name to be called when stuff comes from kinect
}

function draw() {
    background(255);
  	image(myImage,rightHandX,rightHandY, 100,100);
}

function trackBody(body) {
  if (body.rightHandState == 3){  //look in console at the bottom for users. 
    //only works if for a particular user with hand in a fist.
    var val;
  	val = body.joints[kinectron.HANDRIGHT].depthX;
  	rightHandX =  map(val,0,1,0,width);
  	val = body.joints[kinectron.HANDRIGHT].depthY;
  	rightHandY = map(val,0,1,0,height); //height numbers bigger at the bottom
  }
   println(body.bodyIndex +  " "  + body.leftHandState + "  " + body.rightHandState + " " +val );
  
}
// all sounds from Freesound.org
// full reference: https://ellennickles.com/itpblog/2017/10/29/week-8-color-sound-pen-iteration-3

let noteRed;
let noteOrange;
let noteYellow;
let noteGreen;
let noteLightBlue;
let noteDarkBlue;
let noteDarkestBlue;
let noteViolet;


function preload() {
  noteRed = loadSound('assets/Red_tuba.mp3');
  noteOrange = loadSound('assets/Orange_churchbell.mp3');
  noteYellow = loadSound('assets/Yellow_trumpet.mp3');
  noteGreen = loadSound('assets/Green_violin.mp3');
  noteLightBlue = loadSound('assets/LightBlue_flute.mp3');
  noteDarkerBlue = loadSound('assets/DarkerBlue_cello.mp3');
  noteDarkestBlue = loadSound('assets/DarkestBlue_organ.mp3');
  noteViolet = loadSound('assets/Violet_bassoon.mp3');
}

function setup() {
  noCanvas();
  // createCanvas(400, 400);

  createP("Press the key for the instrument:");
  createP("Red = r");
  createP("Orange = o");
  createP("Yellow = y");
  createP("Green = g");
  createP("Light Blue = l");
  createP("Darker Blue = d");
  createP("Darkest Blue = b");
  createP("Violet = v");
  
}

function keyPressed() {
  if (keyCode === 82) { // 'r'
    playNoteRed();
  }

  if (keyCode === 79) { // 'o'
    playNoteOrange();
  }

  if (keyCode === 89) { // 'y'
    playNoteYellow();
  }

  if (keyCode === 71) { // 'g'
    playNoteGreen();
  }

  if (keyCode === 76) { // 'l'
    playNoteLightBlue();
  }

  if (keyCode === 68) { // 'd'
    playNoteDarkerBlue();
  }

  if (keyCode === 66) { // 'b'
    playNoteDarkestBlue();
  }

  if (keyCode === 86) { // 'v'
    playNoteViolet();
  }
}



function playNoteRed() {
  if (!noteRed.isPlaying()) {
    noteRed.play();
  }
}

function playNoteOrange() {
  if (!noteOrange.isPlaying()) {
    noteOrange.play();
  }
}

function playNoteYellow() {
  if (!noteYellow.isPlaying()) {
    noteYellow.play();
  }
}

function playNoteGreen() {
  if (!noteGreen.isPlaying()) {
    noteGreen.play();
  }
}

function playNoteLightBlue() {
  if (!noteLightBlue.isPlaying()) {
    noteLightBlue.play();
  }
}

function playNoteDarkerBlue() {
  if (!noteDarkerBlue.isPlaying()) {
    noteDarkerBlue.play();
  }
}

function playNoteDarkestBlue() {
  if (!noteDarkestBlue.isPlaying()) {
    noteDarkestBlue.play();
  }
}

function playNoteViolet() {
  if (!noteViolet.isPlaying()) {
    noteViolet.play();
  }
}



// function draw() {
//   background(220);
// }let noteRed;
let noteOrange;
let noteYellow;
let noteGreen;
let noteLightBlue;
let noteDarkBlue;
let noteDarkestBlue;
let noteViolet;

let buttonRed;
let buttonOrange;
let buttonYellow;
let buttonGreen;
let buttonLightBlue;
let buttonDarkerBlue;
let buttonDarkestBlue;
let buttonViolet;

function preload() {
  noteRed = loadSound('assets/Red_tuba.mp3');
  noteOrange = loadSound('assets/Orange_churchbell.mp3');
  noteYellow = loadSound('assets/Yellow_trumpet.mp3');
  noteGreen = loadSound('assets/Green_violin.mp3');
  noteLightBlue = loadSound('assets/LightBlue_flute.mp3');
  noteDarkerBlue = loadSound('assets/DarkerBlue_cello.mp3');
  noteDarkestBlue = loadSound('assets/DarkestBlue_organ.mp3');
  noteViolet = loadSound('assets/Violet_bassoon.mp3');
}
   
function setup() {
  noCanvas();
  // createCanvas(400, 400);
  
  buttonRed = createButton("Red");
  buttonRed.position(0,0);
  buttonRed.mousePressed(playNoteRed); 
  
  buttonOrange = createButton("Orange");
  buttonOrange.position(0,20);
  buttonOrange.mousePressed(playNoteOrange); 
  
  buttonYellow = createButton("Yellow");
  buttonYellow.position(0,40);
  buttonYellow.mousePressed(playNoteYellow); 
  
  buttonGreen = createButton("Green");
  buttonGreen.position(0,60);
  buttonGreen.mousePressed(playNoteGreen); 
  
  buttonLightBlue = createButton("Light Blue");
  buttonLightBlue.position(0,80);
  buttonLightBlue.mousePressed(playNoteLightBlue); 
  
  buttonDarkerBlue = createButton("Darker Blue");
  buttonDarkerBlue.position(0,100);
  buttonDarkerBlue.mousePressed(playNoteDarkerBlue); 
  
  buttonDarkestBlue = createButton("Darkest Blue");
  buttonDarkestBlue.position(0,120);
  buttonDarkestBlue.mousePressed(playNoteDarkestBlue); 
  
  buttonViolet = createButton("Violet");
  buttonViolet.position(0,140);
  buttonViolet.mousePressed(playNoteViolet); 
}


function playNoteRed(){
  if (!noteRed.isPlaying()) {
    noteRed.play();
  }
}

function playNoteOrange(){
  if (!noteOrange.isPlaying()) {
    noteOrange.play();
  }
}

function playNoteYellow(){
  if (!noteYellow.isPlaying()) {
    noteYellow.play();
  }
}

function playNoteGreen(){
  if (!noteGreen.isPlaying()) {
    noteGreen.play();
  }
}

function playNoteLightBlue(){
  if (!noteLightBlue.isPlaying()) {
    noteLightBlue.play();
  }
}

function playNoteDarkerBlue(){
  if (!noteDarkerBlue.isPlaying()) {
    noteDarkerBlue.play();
  }
}

function playNoteDarkestBlue(){
  if (!noteDarkestBlue.isPlaying()) {
    noteDarkestBlue.play();
  }
}

function playNoteViolet(){
  if (!noteViolet.isPlaying()) {
    noteViolet.play();
  }
}



// function draw() {
//   background(220);
// }var imgs = [];

 let topColor = [90, 205, 55];

let bottomColor = [255, 5, 5];

function setup() { 
  var c = createCanvas(530, 530);
  c.position(0,0);
  c.style("z-index","-1");
  
  imgs.push(loadImage("1.png"));
  imgs.push(loadImage("2.png"));
  imgs.push(loadImage("3.png"));
  imgs.push(loadImage("4.png"));
  imgs.push(loadImage("5.png"));
  imgs.push(loadImage("6.png"));
  imgs.push(loadImage("7.png"));
  imgs.push(loadImage("8.png"));
  imgs.push(loadImage("9.png"));
  imgs.push(loadImage("10.png"));
  imgs.push(loadImage("11.png"));
  imgs.push(loadImage("12.png"));
  imgs.push(loadImage("13.png"));
  imgs.push(loadImage("14.png"));
  imgs.push(loadImage("15.png"));
  imgs.push(loadImage("16.png"));
  imgs.push(loadImage("17.png"));
  imgs.push(loadImage("18.png"));


  paragraphs = selectAll('p');
  print(paragraphs.length);
  copy = select("#copy");
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].hide();
  }
}

let x = 0;
let changeRate = 0.1;


function draw() { 
  // background(220);
  image(imgs[int(x)], 0, 0, width, height);
  /*for( var i = 1; i < imgs.length; i++) {
 		image(imgs[i], 0, 0, width, height);
  
  }*/
  x += changeRate;
  if (x > imgs.length - 1) {
    x = 0;
  }
  //console.log(x);
  
  
    for (var i=0; i<width; i+=50){
				let r = map(i, 0, height,
                    topColor[0],
                    bottomColor[0]);
     		let g = map(i, 0, height,
                    topColor[1],
                    bottomColor[1]);
     		let b = map(i, 0, height,
                    topColor[2],
                    bottomColor[2]);

    		fill(r+205, g-10, b, 10);

				noStroke();
        rect(i,0,width,height);   
    	
      
      for (var j = 0; j < paragraphs.length; j++) {
        paragraphs[j].show();
      }
    
    
    
    }
}// CSPen Interation 2
// CSPen_ArduinoButtonsPlayNote_Binary
// use with https://create.arduino.cc/editor/enickles/d1ed1c87-8436-49ac-a34d-8fd4af82ac01/preview
// p5.js sound tutorial: https://www.youtube.com/watch?v=40Me1-yAtTc&list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW&index=5
// sounds from: http://freesound.org/people/Kyster/packs/7398/?page=1#sound

// a = 97
// b = 98
// c = 99
// d = 100
// g = 103;

let noteA;
let noteB;
let noteC;
let noteD;
let noteG;

function preload() {
  noteA = loadSound('assets/oct-a.mp3');
  noteB = loadSound('assets/oct-b.mp3');
  noteC = loadSound('assets/oct-c.mp3');
  noteD = loadSound('assets/oct-d.mp3');
  noteG = loadSound('assets/oct-g.mp3');
}

function setup() {
  // createCanvas(400, 400);
  // background(200);
  createP("press the button of the note you want to hear");
}


function keyPressed() {
  if (keyCode === 65) { // 'a'
    playNoteA();
  }

  if (keyCode === 66) { // 'b'
    playNoteB();
  }

  if (keyCode === 67) { // 'c'
    playNoteC();
  }

  if (keyCode === 68) { // 'd'
    playNoteD();
  }

  if (keyCode === 71) { // 'g'
    playNoteG();
  }
}


function playNoteA() {
  if (!noteA.isPlaying()) {
    noteA.play();
  }
}

function playNoteB() {
  if (!noteB.isPlaying()) {
    noteB.play();
  }
}

function playNoteC() {
  if (!noteC.isPlaying()) {
    noteC.play();
  }
}

function playNoteD() {
  if (!noteD.isPlaying()) {
    noteD.play();
  }
}

function playNoteG() {
  if (!noteG.isPlaying()) {
    noteG.play();
  }
}


// function draw() {
//   background(220);
// }// CSPen Interation 3
// Use with Arduino Sketch: 

let noteA;
let noteB;
let noteC;
let noteD;
let noteG;


function preload() {
  noteA = loadSound('assets/oct-a.mp3');
  noteB = loadSound('assets/oct-b.mp3');
  noteC = loadSound('assets/oct-c.mp3');
  noteD = loadSound('assets/oct-d.mp3');
  noteG = loadSound('assets/oct-g.mp3');
}

function setup() {
  // createCanvas(400, 400);
  // background(200);
  createP("press the button of the note you want to hear: a, b, c, d, g");
}


function keyPressed() {
  if (keyCode === 65) { // 'a'
    playNoteA();
  }

  if (keyCode === 66) { // 'b'
    playNoteB();
  }

  if (keyCode === 67) { // 'c'
    playNoteC();
  }

  if (keyCode === 68) { // 'd'
    playNoteD();
  }

  if (keyCode === 71) { // 'g'
    playNoteG();
  }
}


function playNoteA() {
  if (!noteA.isPlaying()) {
    noteA.play();
  }
}

function playNoteB() {
  if (!noteB.isPlaying()) {
    noteB.play();
  }
}
g
function playNoteC() {
  if (!noteC.isPlaying()) {
    noteC.play();
  }
}

function playNoteD() {
  if (!noteD.isPlaying()) {
    noteD.play();
  }
}

function playNoteG() {
  if (!noteG.isPlaying()) {
    noteG.play();
  }
}


// function draw() {
//   background(220);
// }// Combining Wordnik & Pixabay queries
// Hit the PLAY button to clear the page and restart the sketch

let w_url1 = "http://api.wordnik.com/v4/word.json/";
let w_url2 = "/definitions?limit=8&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false";
let w_apikey = "&api_key=f6c7d6bc71e905476a0020c6bec02769426fde0eb7cf6d8d0"; // my personal key

let p_url1 = "https://pixabay.com/";
let p_apikey = "api/?key=2988351-464bf892e4c899da187da08ea&q=" // appended &q= for start of keyword query
let p_url2 = "&image_type=photo";
let p_limit = 8; // number of images to return


function setup() {
  noCanvas();

  let button = select('#submit');
  button.mousePressed(submitWord);

  input = select('#word'); // select the user input
}


function gotData(data) {
  // create a paragraph with eight definitions for the word
  for (i = 0; i < data.length; i++) {
    createP(data[i].text);
  }
}


function gotInfo(info) {
  for (let i = 0; i < p_limit; i++) {
    let img = createImg(info.hits[i].webformatURL);
    img.size(250, 250);
  }
}


function submitWord() {
  let w_fullUrl = w_url1 + input.value() + w_url2 + w_apikey;
  loadJSON(w_fullUrl, gotData); // query Wordnik API with user input word

  let p_fullUrl = p_url1 + p_apikey + input.value() + p_url2;
  info = loadJSON(p_fullUrl, gotInfo); // query Pixabay API with user input word
}


// function draw() {
//   //background(220);
// }// Combining Wordnik & Giphy queries
// Giphy example sketch from the homework wiki:
// http://alpha.editor.p5js.org/icm/sketches/BJZXWSLp-

let w_url1 = "http://api.wordnik.com/v4/word.json/";
let w_url2 = "/definitions?limit=8&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false";
let w_apikey = "&api_key=f6c7d6bc71e905476a0020c6bec02769426fde0eb7cf6d8d0"; // my personal key

// full giphy request url: http://api.giphy.com/v1/gifs/search?&api_key=dc6zaTOxFJmzC&q=
var g_api = "http://api.giphy.com/v1/gifs/search?";
var g_apiKey = "&api_key=dc6zaTOxFJmzC";
var g_url = "&q=";

function setup() {
  //createCanvas(400, 400);
  noCanvas();

  let button = select('#submit');
  button.mousePressed(submitWord);

  input = select('#word'); // select the user input
}


function gotData(data) {
  // create a paragraph with eight definitions for the word
  for (i = 0; i < data.length; i++) {
    createP(data[i].text);
  }
}


function moreData(giphy) {
  for (let i = 0; i < 8; i++) {
    let img = createImg(giphy.data[i].images.original.url);
    img.size(200, 200);
  }
}


function submitWord() {
  let w_fullUrl = w_url1 + input.value() + w_url2 + w_apikey;
  loadJSON(w_fullUrl, gotData); // query Wordnik API with user input word
	
  let g_fullUrl = g_api + g_apiKey + g_url + input.value();
  loadJSON(g_fullUrl, moreData) // query Giphy API with user input word
}


function draw() {
  //background(220);
}// Combining Wordnik & Giphy queries
// Giphy example sketch from the homework wiki:
// http://alpha.editor.p5js.org/icm/sketches/BJZXWSLp-

let w_url1 = "http://api.wordnik.com/v4/word.json/";
let w_url2 = "/definitions?limit=8&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false";
let w_apikey = "&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"; // update with my personal key when it arrives

// full giphy request url: http://api.giphy.com/v1/gifs/search?&api_key=dc6zaTOxFJmzC&q=
var g_api = "http://api.giphy.com/v1/gifs/search?";
var g_apiKey = "&api_key=dc6zaTOxFJmzC";
var g_url = "&q=";

function setup() {
  //createCanvas(400, 400);
  noCanvas();

  let button = select('#submit');
  button.mousePressed(submitWord);

  input = select('#word'); // select the user input
}


function gotData(data) {
  // create a paragraph with ten definitions for the word
  for (i = 0; i < data.length; i++) {
    createP(data[i].text);
  }
}


function moreData(giphy) {
  for (let i = 0; i < 8; i++) {
    let img = createImg(giphy.data[i].images.original.url);
    img.size(200, 200);
  }
}


function submitWord() {
  let w_fullUrl = w_url1 + input.value() + w_url2 + w_apikey;
  loadJSON(w_fullUrl, gotData); // query Wordnik API with user input word
	
  let g_fullUrl = g_api + g_apiKey + g_url + input.value();
  loadJSON(g_fullUrl, moreData) // query Giphy API with user input word
}


function draw() {
  //background(220);
}// CSPen_ArduinoButtonsPlay_Binary_HAND
// use with https://create.arduino.cc/editor/enickles/2f38bbe1-5102-4ef5-8cdd-6548d2e36162
// p5.js sound tutorial: https://www.youtube.com/watch?v=40Me1-yAtTc&list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW&index=5
// sounds from: http://freesound.org/people/Kyster/packs/7398/?page=1#sound

// a = 97
// b = 98
// c = 99
// d = 100
// g = 103;

let noteA;
let noteB;
let noteC;
let noteD;
let noteG;


let buttonA;
let buttonB;
let buttonC;
let buttonD;
let buttonG;

let serial;
let portName = '/dev/cu.usbmodem1421';
let inData;


function preload() {
  noteA = loadSound('assets/oct_a.mp3');
  noteB = loadSound('assets/oct_b.mp3');
  noteC = loadSound('assets/oct_c.mp3');
  noteD = loadSound('assets/oct_d.mp3');
  noteG = loadSound('assets/oct_g.mp3');
}

function setup() {
  noCanvas();
  // createCanvas(400, 400);

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.open(portName);
  serial.on('data', serialEvent); // callback for when new data arrives

  //   buttonA = createButton("Note A");
  //   buttonA.position(0, 0);
  //   buttonA.mousePressed(playNoteA);

  //   buttonB = createButton("Note B");
  //   buttonB.position(0, 20);
  //   buttonB.mousePressed(playNoteB);

  //   buttonC = createButton("Note C");
  //   buttonC.position(0, 40);
  //   buttonC.mousePressed(playNoteC);

  //   buttonD = createButton("Note D");
  //   buttonD.position(0, 60);
  //   buttonD.mousePressed(playNoteD);

  //   buttonG = createButton("Note G");
  //   buttonG.position(0, 80);
  //   buttonG.mousePressed(playNoteG);
}

function serialEvent() {
  inData = serial.read();
  print(inData)

  if (inData == 97) {
    playNoteA();
    serial.write(1);
  }
  if (inData == 98) {
    playNoteB();
  }
  if (inData == 99) {
    playNoteC();

  }
  if (inData == 100) {
    playNoteD();
  }
  if (inData == 103) {
    playNoteG();
  }

}


function playNoteA() {
  if (!noteA.isPlaying()) {
    noteA.play();
  }

}

function playNoteB() {
  if (!noteB.isPlaying()) {
    noteB.play();
  }
}

function playNoteC() {
  if (!noteC.isPlaying()) {
    noteC.play();
  }
}

function playNoteD() {
  if (!noteD.isPlaying()) {
    noteD.play();
  }
}

function playNoteG() {
  if (!noteG.isPlaying()) {
    noteG.play();
  }
}



// function draw() {
//   background(220);
// }// CSPen Interation 2
// CSPen_ArduinoButtonsPlayNote_Binary
// use with https://create.arduino.cc/editor/enickles/d1ed1c87-8436-49ac-a34d-8fd4af82ac01/preview
// p5.js sound tutorial: https://www.youtube.com/watch?v=40Me1-yAtTc&list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW&index=5
// sounds from: http://freesound.org/people/Kyster/packs/7398/?page=1#sound

// a = 97
// b = 98
// c = 99
// d = 100
// g = 103;

let noteA;
let noteB;
let noteC;
let noteD;
let noteG;

let buttonA;
let buttonB;
let buttonC;
let buttonD;
let buttonG;

let serial;
let portName = '/dev/cu.usbmodem1421';
let inData;


function preload() {
  noteA = loadSound('assets/oct-a.mp3');
  noteB = loadSound('assets/oct-b.mp3');
  noteC = loadSound('assets/oct-c.mp3');
  noteD = loadSound('assets/oct-d.mp3');
  noteG = loadSound('assets/oct-g.mp3');
}

function setup() {
  noCanvas();
  // createCanvas(400, 400);

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.open(portName);
  serial.on('data', serialEvent); // callback for when new data arrives

//   buttonA = createButton("Note A");
//   buttonA.position(0, 0);
//   buttonA.mousePressed(playNoteA);

//   buttonB = createButton("Note B");
//   buttonB.position(0, 20);
//   buttonB.mousePressed(playNoteB);

//   buttonC = createButton("Note C");
//   buttonC.position(0, 40);
//   buttonC.mousePressed(playNoteC);

//   buttonD = createButton("Note D");
//   buttonD.position(0, 60);
//   buttonD.mousePressed(playNoteD);

//   buttonG = createButton("Note G");
//   buttonG.position(0, 80);
//   buttonG.mousePressed(playNoteG);
}

function serialEvent() {
  inData = serial.read();
  print(inData)

  if (inData == 97) {
    playNoteA();
  }
  if (inData == 98) {
    playNoteB();
  }
  if (inData == 99) {
    playNoteC();
  }
  if (inData == 100) {
    playNoteD();
  }
  if (inData == 103) {
    playNoteG();
  }
}


function playNoteA() {
  if (!noteA.isPlaying()) {
    noteA.play();
  }
}

function playNoteB() {
  if (!noteB.isPlaying()) {
      noteB.play();
    }
  }

  function playNoteC() {
  if (!noteC.isPlaying()) {
      noteC.play();
    }
  }

  function playNoteD() {
  if (!noteD.isPlaying()) {
      noteD.play();
    }
  }

  function playNoteG() {
  if (!noteG.isPlaying()) {
      noteG.play();
    }
  }



  // function draw() {
  //   background(220);
  // }let noteA;
let noteB;
let noteC;
let noteD;
let noteG;


let buttonA;
let buttonB;
let buttonC;
let buttonD;
let buttonG;


function preload() {
  noteA = loadSound('assets/oct_a.mp3');
  noteB = loadSound('assets/oct_b.mp3');
  noteC = loadSound('assets/oct_c.mp3');
  noteD = loadSound('assets/oct_d.mp3');
  noteG = loadSound('assets/oct_g.mp3');
}
   
function setup() {
  noCanvas();
  // createCanvas(400, 400);
  
  buttonA = createButton("Note A");
  buttonA.position(0,0);
  buttonA.mousePressed(playNoteA); 
  
  buttonB = createButton("Note B");
  buttonB.position(0,20);
  buttonB.mousePressed(playNoteB); 
  
  buttonC = createButton("Note C");
  buttonC.position(0,40);
  buttonC.mousePressed(playNoteC); 
  
  buttonD = createButton("Note D");
  buttonD.position(0,60);
  buttonD.mousePressed(playNoteD); 
  
  buttonG = createButton("Note G");
  buttonG.position(0,80);
  buttonG.mousePressed(playNoteG); 
}


function playNoteA(){
  noteA.play();
}

function playNoteB(){
  noteB.play();
}

function playNoteC(){
  noteC.play();
}

function playNoteD(){
  noteD.play();
}

function playNoteG(){
  noteG.play();
}



// function draw() {
//   background(220);
// }// full URL = https://pixabay.com/api/?key=2988351-464bf892e4c899da187da08ea&q=yellow+flowers&image_type=photo

let info;
let img;

let url1 = "https://pixabay.com/";
let apikey = "api/?key=2988351-464bf892e4c899da187da08ea&q=" // appended &q= for start of keyword query
// let tag = "smile";
let url2 = "&image_type=photo";
let limit = 8; // number of images to return

// function preload() {
//   info = loadJSON(url1 + apikey + tag + url2, gotInfo);
// }


function setup() {
  noCanvas();
  
  let button = select('#submit');
  button.mousePressed(submitWord);

  input = select('#word'); // select the user input
}

function gotInfo(info) {
  // print(info);

  // display 8 images from the query
  for (let i = 0; i < limit; i++) {
    let img = createImg(info.hits[i].webformatURL);
    img.size(250, 250);
  }
}

function submitWord() {
  let fullUrl = url1 + apikey + input.value() + url2;
  info = loadJSON(fullUrl, gotInfo); // query Pixabay API with user input word
}


// function draw() {
//   // background(220);
// }// full URL = https://pixabay.com/api/?key=2988351-464bf892e4c899da187da08ea&q=yellow+flowers&image_type=photo&per_page=10
// see giphy example on homework page for reference

let info;
let img;

let url1 = "https://pixabay.com/";
let apikey = "api/?key=2988351-464bf892e4c899da187da08ea&q=" // appended &q= for start of keyword query
let tag = "smile";
let url2 = "&image_type=photo&per_page=10";


function preload() {
  info = loadJSON(url1 + apikey + tag + url2, gotInfo);
}

function setup() {
  noCanvas();
}

function gotInfo(info) {
  print(info);

  for (let i = 0; i < 8; i++) {
    let img = createImg(info.hits[i].webformatURL);
    img.size(250, 250);
  }

}

// for (let i = 0; i < giphy.data.length; i++) {
//     let img = createImg(giphy.data[i].images.original.url);
//     img.size(200, 200);
// }


// function draw() {
//   // background(220);
// }let url1 = "https://pixabay.com/";
let apikey = "api/?key=2988351-464bf892e4c899da187da08ea&q=" // appended &q= for start of keyword query
let tag = "yellow+flowers";
let url2 = "&image_type=photo";


function setup() { 
  createCanvas(400, 400);
  loadJSON(url1 + apikey + tag + url2, gotData);
} 


function gotData(data){
  print(data);
}

function draw() { 
  background(220);
}let data;
let definition;

let url1 = "http://api.wordnik.com/v4/word.json/";
let query = "yellow";
let url2 = "/definitions?limit=10&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false";
let apikey = "&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"; // update with my personal key when it arrives

function preload() {
  data = loadJSON(url1 + query + url2 + apikey, gotData);
}


function setup() {
  createCanvas(600, 600);
}


function gotData(data) {
  //print(data); // print all data for this specific request - works! 
  //print(data[0].text); // print the first definition in the array - works!

  for (i = 0; i < data.length; i++) {
    print(data[i].text);
  }

  // let definition = data[0].text; // print one definition to screen
  // createP(definition);

  for (i = 0; i < data.length; i++) {
    createP(data[i].text);
  }

}

function draw() {
  background(220);

  textSize(12);
  text(data[0].text, 10, 30, 580, 60);
  fill(0);
  
   textSize(12);
  text(data[1].text, 20, 50, 580, 110);
  fill(0);

}// video 10.6 to set up user input
// got this to work except that I must restart the sketch to clear out the previous word
// how do I do this with code?

let url1 = "http://api.wordnik.com/v4/word.json/";
// let word = "yellow";
let url2 = "/definitions?limit=10&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false";
let apikey = "&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"; // update with my personal key when it arrives


function setup() {
  //createCanvas(400, 400);
  noCanvas();

  let button = select('#submit');
  button.mousePressed(submitWord);

  input = select('#word'); // select the user input
}

function gotData(data) {
  // create a paragraph with ten definitions for the word
  for (i = 0; i < data.length; i++) {
    createP(data[i].text);
  }
}

function submitWord() {
  let fullUrl = url1 + input.value() + url2 + apikey;
  loadJSON(fullUrl, gotData); // query Wordnik API with user input word
}


// function draw() {
//   //background(220);
// }// this sketch does not work if the DOM library is listed in the index.html file...hmmm?


let data;
// let definition;

let url1 = "http://api.wordnik.com/v4/word.json/";
let query = "yellow";
let url2 = "/definitions?limit=10&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false";
let apikey = "&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"; // update with my personal key when it arrives

function preload() {
  data = loadJSON(url1 + query + url2 + apikey, gotData);
}


function setup() {
  //createCanvas(400, 400);
  noCanvas();
  // loadJSON(url1 + word + url2 + apikey, gotData);
}


function gotData(data) {
  //print(data); // print all data for this specific request - works! 
  //print(data[0].text); // print the first definition in the array - works!

  for (i = 0; i < data.length; i++) {
    print(data[i].text);
  }

  // let definition = data[0].text; // print one definition to screen
  // createP(definition);

  for (i = 0; i < data.length; i++) {
    createP(data[i].text);
  }

}

function draw() {
  //background(220);
}let url1 = "http://api.wordnik.com/v4/word.json/";
let word = "red";
let url2 = "/definitions?limit=10&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false";
let apikey = "&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"; // update with my personal key when it arrives


function setup() { 
  createCanvas(400, 400);
  loadJSON(url1 + word + url2 + apikey, gotData);
} 


function gotData(data){
  print(data);
}

function draw() { 
  background(220);
}let data;
let c = 0;
let button;

function preload() {
  data = loadJSON("crayola.json"); // there are objects with properties in this file
}

function setup() {
  createCanvas(400, 400);
  // print(data.description);
  // print(data.colors);
  background(255);

  button = createButton("New Crayon");
  button.position(100, 300);
  button.mousePressed(changeColor);
}

function draw() {
  background(255);

  fill(0)
  textSize(20);

  text(data.colors[c].color, 100, 100);
  text(data.colors[c].hex, 100, 200); // { } in json file means that these are properties of objects
  
  col = data.colors[c].hex
  fill(col);
  ellipse(300, 200, 100, 100);
}

function changeColor() {
  c = int(random(0,100));
}// Use with this Arduino sketch: InClass_Wk7_Lab2_Exercise1c_Handshaking
// https://create.arduino.cc/editor/enickles/236df200-b9f0-44bb-b69b-c7dd81a74a70/preview
// using 3 pots

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var locH; // location of the circle
var locV; // location of the circle
var circleColor = 255; // color of the circle

function setup() {
  createCanvas(640, 480); // make canvas
  smooth(); // antialias drawing lines
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName); // open a serial port
}

function draw() {
  background(0); // black background
  fill(circleColor); // fill depends on the button
  ellipse(locH, locV, 50, 50); // draw the circle
}


function serialEvent() {
  // read a string from the serial port until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
  print(inString);

  if (inString.length > 0) { //check to see that there's actually a string there:
    if (inString !== 'hello') { // if you get hello, ignore it
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length > 2) { // if there are three elements
        locH = map(sensors[0], 0, 1023, 0, width); // element 0 is the locH
        locV = map(sensors[1], 0, 1023, 0, height); // element 1 is the locV
        circleColor = map(sensors[2], 0, 1023, 0, 255); // element 2 is the circleColor
      }
    }
    serial.write('x'); // send a byte requesting more serial data 
  }
}


function portOpen() {
  print('the serial port opened.')
}


function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}
// Use with this Arduino sketch: InClass_Wk7_Lab2_Exercise1b
// https://create.arduino.cc/editor/enickles/236df200-b9f0-44bb-b69b-c7dd81a74a70/preview
// using 3 pots

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var locH; // location of the circle
var locV; // location of the circle
var circleColor = 255; // color of the circle

function setup() {
  createCanvas(640, 480); // make canvas
  smooth(); // antialias drawing lines
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName); // open a serial port
}

function draw() {
  background(0); // black background
  fill(circleColor); // fill depends on the button
  ellipse(locH, locV, 50, 50); // draw the circle
}

function serialEvent() {
  // read a string from the serial port until you get the letter z:
  // here is also where you change what you want to see, 
  // you can change how you end the line in the Arduino code
  var inString = serial.readStringUntil('z');
  print(inString);

  //check to see that there's actually a string there:
  if (inString.length > 0) {
    var sensors = split(inString, '#'); // split the string on the pound sign
    if (sensors.length > 2) { // if there are three elements
      locH = map(sensors[0], 0, 1023, 0, width); // element 0 is the locH
      locV = map(sensors[1], 0, 1023, 0, height); // element 1 is the locV
      circleColor = map(sensors[2], 0, 1023, 0, 255); // element 2 is the circleColor
    }
  }
}


function portOpen() {
  print('the serial port opened.')
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
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

var serial;
var portName = '/dev/cu.usbmodem1421';

/*
  These variables must be global so we can update
  them in our parseData() function and access
  them in our draw() function. I initialize them
  with placeholder values until I receive serial
  data to update them.
*/
var potValue = 50;
var lightValue = 255;


function setup() {
  createCanvas(400, 400);

  serial = new p5.SerialPort();
  serial.open(portName);

  /*
    Whenever data is received, the parseData()
    function defined below will run.
  */
  serial.on('data', parseData);
}

function draw() {
  background(potValue);
  noStroke();
  fill(lightValue);
  ellipse(200, 200, 100, 100);
}

function parseData() {
  /*
    If sending single value between 0-255
    using Serial.write() on Arduino
  */
  // var inData = serial.read();
  // print(inData);
  // potValue = inData;

  var inData = serial.readLine();

  /*
    parseData() will run every time data
    is received on p5's serial connection.
    serial.readLine() will return empty
    strings until p5 receives a carriage return
    - Serial.println() in Arduino. The if
    statement below filters these out and only
    updates our potValue and lightValue variables
    when we receive a complete batch of data - 
    in our case, the two sensor values.
  */
  if (inData.length > 0) {

    /*
      Here I'm using the native js version of split.
      Below that you can see the p5 version 
      of split, which is commented out.
    */
    var values = inData.split(',');
    // var values = splitTokens(values, ',');
    // print(values);

    /*
      Once we split the received data into
      individual values, we still need to convert
      them from strings to integers.
    */
    potValue = int(values[0]);
    lightValue = int(values[1]);

    // print(potValue + ',' + lightValue);
  }
}function setup() {
  createCanvas(450, 460);
  noStroke();
}

function draw() {
  background(240);
  //row 2
  fill(223);
  ellipse(160, 20, 20, 20);
  fill(194);
  ellipse(180, 20, 20, 20);
  fill(185);
  ellipse(200, 20, 20, 20);
  fill(134);
  ellipse(220, 20, 20, 20);
  fill(94);
  ellipse(240, 20, 20, 20);
  fill(109);
  ellipse(260, 20, 20, 20);
  fill(193);
  ellipse(280, 20, 20, 20);
  fill(243);
  ellipse(300, 20, 20, 20); //8 total ellipses on row 2
  //row 3
  fill(193);
  ellipse(140, 40, 20, 20);
  fill(141);
  ellipse(160, 40, 20, 20);
  fill(167);
  ellipse(180, 40, 20, 20);
  fill(164);
  ellipse(200, 40, 20, 20);
  fill(134);
  ellipse(220, 40, 20, 20);
  fill(85);
  ellipse(240, 40, 20, 20);
  fill(61);
  ellipse(260, 40, 20, 20);
  fill(58);
  ellipse(280, 40, 20, 20);
  fill(156);
  ellipse(300, 40, 20, 20);
  fill(233);
  ellipse(320, 40, 20, 20); //10 total ellipses on row 3
  //row 4
  fill(192);
  ellipse(120, 60, 20, 20);
  fill(120);
  ellipse(140, 60, 20, 20);
  fill(127);
  ellipse(160, 60, 20, 20);
  fill(151);
  ellipse(180, 60, 20, 20);
  fill(149);
  ellipse(200, 60, 20, 20);
  fill(141);
  ellipse(220, 60, 20, 20);
  fill(130);
  ellipse(240, 60, 20, 20);
  fill(85);
  ellipse(260, 60, 20, 20);
  fill(71);
  ellipse(280, 60, 20, 20);
  fill(106);
  ellipse(300, 60, 20, 20);
  fill(149);
  ellipse(320, 60, 20, 20);
  fill(233);
  ellipse(340, 60, 20, 20); //12 total ellipses on row 4
  //row 5
  fill(217);
  ellipse(100, 80, 20, 20);
  fill(112);
  ellipse(120, 80, 20, 20);
  fill(84);
  ellipse(140, 80, 20, 20);
  fill(80);
  ellipse(160, 80, 20, 20);
  fill(80);
  ellipse(180, 80, 20, 20);
  fill(120);
  ellipse(200, 80, 20, 20);
  fill(124);
  ellipse(220, 80, 20, 20);
  fill(110);
  ellipse(240, 80, 20, 20);
  fill(131);
  ellipse(260, 80, 20, 20);
  fill(98);
  ellipse(280, 80, 20, 20);
  fill(116);
  ellipse(300, 80, 20, 20);
  fill(100);
  ellipse(320, 80, 20, 20);
  fill(151);
  ellipse(340, 80, 20, 20); //13 total ellipses on row 5
  //row 6
  fill(239);
  ellipse(80, 100, 20, 20);
  fill(125);
  ellipse(100, 100, 20, 20);
  fill(66);
  ellipse(120, 100, 20, 20);
  fill(54);
  ellipse(140, 100, 20, 20);
  fill(36);
  ellipse(160, 100, 20, 20);
  fill(61);
  ellipse(180, 100, 20, 20);
  fill(50);
  ellipse(200, 100, 20, 20);
  fill(46);
  ellipse(220, 100, 20, 20);
  fill(86);
  ellipse(240, 100, 20, 20);
  fill(107);
  ellipse(260, 100, 20, 20);
  fill(99);
  ellipse(280, 100, 20, 20);
  fill(81);
  ellipse(300, 100, 20, 20);
  fill(62);
  ellipse(320, 100, 20, 20);
  fill(62);
  ellipse(340, 100, 20, 20);
  fill(240);
  ellipse(360, 100, 20, 20); //15 total ellipses on row 6
  //row 7
  fill(200);
  ellipse(80, 120, 20, 20);
  fill(71);
  ellipse(100, 120, 20, 20);
  fill(42);
  ellipse(120, 120, 20, 20);
  fill(18);
  ellipse(140, 120, 20, 20);
  fill(34);
  ellipse(160, 120, 20, 20);
  fill(24);
  ellipse(180, 120, 20, 20);
  fill(11);
  ellipse(200, 120, 20, 20);
  fill(23);
  ellipse(220, 120, 20, 20);
  fill(22);
  ellipse(240, 120, 20, 20);
  fill(52);
  ellipse(260, 120, 20, 20);
  fill(90);
  ellipse(280, 120, 20, 20);
  fill(61);
  ellipse(300, 120, 20, 20);
  fill(22);
  ellipse(320, 120, 20, 20);
  fill(28);
  ellipse(340, 120, 20, 20);
  fill(192);
  ellipse(360, 120, 20, 20); //15 total ellipses on row 7
  //row 8
  fill(128);
  ellipse(80, 140, 20, 20);
  fill(46);
  ellipse(100, 140, 20, 20);
  fill(30);
  ellipse(120, 140, 20, 20);
  fill(27);
  ellipse(140, 140, 20, 20);
  fill(17);
  ellipse(160, 140, 20, 20);
  fill(12);
  ellipse(180, 140, 20, 20);
  fill(14);
  ellipse(200, 140, 20, 20);
  fill(14);
  ellipse(220, 140, 20, 20);
  fill(41);
  ellipse(240, 140, 20, 20);
  fill(80);
  ellipse(260, 140, 20, 20);
  fill(132);
  ellipse(280, 140, 20, 20);
  fill(97);
  ellipse(300, 140, 20, 20);
  fill(18);
  ellipse(320, 140, 20, 20);
  fill(15);
  ellipse(340, 140, 20, 20);
  fill(129);
  ellipse(360, 140, 20, 20); //15 total ellipses on row 8
  //row 9
  fill(228);
  ellipse(60, 160, 20, 20);
  fill(82);
  ellipse(80, 160, 20, 20);
  fill(46);
  ellipse(100, 160, 20, 20);
  fill(24);
  ellipse(120, 160, 20, 20);
  fill(20);
  ellipse(140, 160, 20, 20);
  fill(65);
  ellipse(160, 160, 20, 20);
  fill(130);
  ellipse(180, 160, 20, 20);
  fill(172);
  ellipse(200, 160, 20, 20);
  fill(170);
  ellipse(220, 160, 20, 20);
  fill(156);
  ellipse(240, 160, 20, 20);
  fill(153);
  ellipse(260, 160, 20, 20);
  fill(171);
  ellipse(280, 160, 20, 20);
  fill(144);
  ellipse(300, 160, 20, 20);
  fill(32);
  ellipse(320, 160, 20, 20);
  fill(12);
  ellipse(340, 160, 20, 20);
  fill(66);
  ellipse(360, 160, 20, 20);
  fill(240);
  ellipse(380, 160, 20, 20); //17 total ellipses on row 9
  //row 10
  fill(175);
  ellipse(60, 180, 20, 20);
  fill(46);
  ellipse(80, 180, 20, 20);
  fill(58);
  ellipse(100, 180, 20, 20);
  fill(21);
  ellipse(120, 180, 20, 20);
  fill(88);
  ellipse(140, 180, 20, 20);
  fill(129);
  ellipse(160, 180, 20, 20);
  fill(111);
  ellipse(180, 180, 20, 20);
  fill(64);
  ellipse(200, 180, 20, 20);
  fill(107);
  ellipse(220, 180, 20, 20);
  fill(172);
  ellipse(240, 180, 20, 20);
  fill(147);
  ellipse(260, 180, 20, 20);
  fill(95);
  ellipse(280, 180, 20, 20);
  fill(96);
  ellipse(300, 180, 20, 20);
  fill(108);
  ellipse(320, 180, 20, 20);
  fill(22);
  ellipse(340, 180, 20, 20);
  fill(28);
  ellipse(360, 180, 20, 20);
  fill(177);
  ellipse(380, 180, 20, 20); //17 total ellipses on row 10
  //row 11
  fill(113);
  ellipse(60, 200, 20, 20);
  fill(45);
  ellipse(80, 200, 20, 20);
  fill(49);
  ellipse(100, 200, 20, 20);
  fill(44);
  ellipse(120, 200, 20, 20);
  fill(142);
  ellipse(140, 200, 20, 20);
  fill(87);
  ellipse(160, 200, 20, 20);
  fill(62);
  ellipse(180, 200, 20, 20);
  fill(95);
  ellipse(200, 200, 20, 20);
  fill(102);
  ellipse(220, 200, 20, 20);
  fill(195);
  ellipse(240, 200, 20, 20);
  fill(112);
  ellipse(260, 200, 20, 20);
  fill(56);
  ellipse(280, 200, 20, 20);
  fill(61);
  ellipse(300, 200, 20, 20);
  fill(81);
  ellipse(320, 200, 20, 20);
  fill(41);
  ellipse(340, 200, 20, 20);
  fill(33);
  ellipse(360, 200, 20, 20);
  fill(117);
  ellipse(380, 200, 20, 20);
  fill(242);
  ellipse(400, 200, 20, 20); //18 total ellipses on row 11
  //row 12
  fill(234);
  ellipse(40, 220, 20, 20);
  fill(68);
  ellipse(60, 220, 20, 20);
  fill(36);
  ellipse(80, 220, 20, 20);
  fill(39);
  ellipse(100, 220, 20, 20);
  fill(86);
  ellipse(120, 220, 20, 20);
  fill(189);
  ellipse(140, 220, 20, 20);
  fill(176);
  ellipse(160, 220, 20, 20);
  fill(138);
  ellipse(180, 220, 20, 20);
  fill(174);
  ellipse(200, 220, 20, 20);
  fill(204);
  ellipse(220, 220, 20, 20);
  fill(212);
  ellipse(240, 220, 20, 20);
  fill(179);
  ellipse(260, 220, 20, 20);
  fill(150);
  ellipse(280, 220, 20, 20);
  fill(109);
  ellipse(300, 220, 20, 20);
  fill(120);
  ellipse(320, 220, 20, 20);
  fill(77);
  ellipse(340, 220, 20, 20);
  fill(75);
  ellipse(360, 220, 20, 20);
  fill(89);
  ellipse(380, 220, 20, 20);
  fill(234);
  ellipse(400, 220, 20, 20); //19 total ellipses on row 12
  //row 13
  fill(212);
  ellipse(40, 240, 20, 20);
  fill(48);
  ellipse(60, 240, 20, 20);
  fill(22);
  ellipse(80, 240, 20, 20);
  fill(32);
  ellipse(100, 240, 20, 20);
  fill(59);
  ellipse(120, 240, 20, 20);
  fill(173);
  ellipse(140, 240, 20, 20);
  fill(217);
  ellipse(160, 240, 20, 20);
  fill(226);
  ellipse(180, 240, 20, 20);
  fill(221);
  ellipse(200, 240, 20, 20);
  fill(200);
  ellipse(220, 240, 20, 20);
  fill(226);
  ellipse(240, 240, 20, 20);
  fill(199);
  ellipse(260, 240, 20, 20);
  fill(205);
  ellipse(280, 240, 20, 20);
  fill(200);
  ellipse(300, 240, 20, 20);
  fill(189);
  ellipse(320, 240, 20, 20);
  fill(86);
  ellipse(340, 240, 20, 20);
  fill(57);
  ellipse(360, 240, 20, 20);
  fill(65);
  ellipse(380, 240, 20, 20);
  fill(217);
  ellipse(400, 240, 20, 20); //19 total ellipses on row 13
  //row 14
  fill(203);
  ellipse(40, 260, 20, 20);
  fill(27);
  ellipse(60, 260, 20, 20);
  fill(16);
  ellipse(80, 260, 20, 20);
  fill(26);
  ellipse(100, 260, 20, 20);
  fill(29);
  ellipse(120, 260, 20, 20);
  fill(132);
  ellipse(140, 260, 20, 20);
  fill(193);
  ellipse(160, 260, 20, 20);
  fill(206);
  ellipse(180, 260, 20, 20);
  fill(184);
  ellipse(200, 260, 20, 20);
  fill(156);
  ellipse(220, 260, 20, 20);
  fill(168);
  ellipse(240, 260, 20, 20);
  fill(149);
  ellipse(260, 260, 20, 20);
  fill(182);
  ellipse(280, 260, 20, 20);
  fill(200);
  ellipse(300, 260, 20, 20);
  fill(174);
  ellipse(320, 260, 20, 20);
  fill(61);
  ellipse(340, 260, 20, 20);
  fill(31);
  ellipse(360, 260, 20, 20);
  fill(37);
  ellipse(380, 260, 20, 20);
  fill(194);
  ellipse(400, 260, 20, 20); //19 total ellipses on row 14
  //row 15
  ellipse(40, 280, 20, 20);
  fill(22);
  ellipse(60, 280, 20, 20);
  fill(24);
  ellipse(80, 280, 20, 20);
  fill(25);
  ellipse(100, 280, 20, 20);
  fill(23);
  ellipse(120, 280, 20, 20);
  fill(106);
  ellipse(140, 280, 20, 20);
  fill(160);
  ellipse(160, 280, 20, 20);
  fill(171);
  ellipse(180, 280, 20, 20);
  fill(203);
  ellipse(200, 280, 20, 20);
  fill(155);
  ellipse(220, 280, 20, 20);
  fill(93);
  ellipse(240, 280, 20, 20);
  fill(92);
  ellipse(260, 280, 20, 20);
  fill(179);
  ellipse(280, 280, 20, 20);
  fill(160);
  ellipse(300, 280, 20, 20);
  fill(119);
  ellipse(320, 280, 20, 20);
  fill(31);
  ellipse(340, 280, 20, 20);
  fill(24);
  ellipse(360, 280, 20, 20);
  fill(34);
  ellipse(380, 280, 20, 20);
  fill(180);
  ellipse(400, 280, 20, 20); //19 total ellipses on row 15
  //row 16
  fill(159);
  ellipse(40, 300, 20, 20);
  fill(26);
  ellipse(60, 300, 20, 20);
  fill(31);
  ellipse(80, 300, 20, 20);
  fill(26);
  ellipse(100, 300, 20, 20);
  fill(25);
  ellipse(120, 300, 20, 20);
  fill(115);
  ellipse(140, 300, 20, 20);
  fill(143);
  ellipse(160, 300, 20, 20);
  fill(157);
  ellipse(180, 300, 20, 20);
  fill(151);
  ellipse(200, 300, 20, 20);
  fill(128);
  ellipse(220, 300, 20, 20);
  fill(112);
  ellipse(240, 300, 20, 20);
  fill(109);
  ellipse(260, 300, 20, 20);
  fill(141);
  ellipse(280, 300, 20, 20);
  fill(132);
  ellipse(300, 300, 20, 20);
  fill(76);
  ellipse(320, 300, 20, 20);
  fill(29);
  ellipse(340, 300, 20, 20);
  fill(17);
  ellipse(360, 300, 20, 20);
  fill(31);
  ellipse(380, 300, 20, 20);
  fill(170);
  ellipse(400, 300, 20, 20); //19 total ellipses on row 16
  //row 17
  fill(157);
  ellipse(40, 320, 20, 20);
  fill(40);
  ellipse(60, 320, 20, 20);
  fill(38);
  ellipse(80, 320, 20, 20);
  fill(22);
  ellipse(100, 320, 20, 20);
  fill(24);
  ellipse(120, 320, 20, 20);
  fill(85);
  ellipse(140, 320, 20, 20);
  fill(142);
  ellipse(160, 320, 20, 20);
  fill(151);
  ellipse(180, 320, 20, 20);
  fill(110);
  ellipse(200, 320, 20, 20);
  fill(118);
  ellipse(220, 320, 20, 20);
  fill(138);
  ellipse(240, 320, 20, 20);
  fill(107);
  ellipse(260, 320, 20, 20);
  fill(97);
  ellipse(280, 320, 20, 20);
  fill(126);
  ellipse(300, 320, 20, 20);
  fill(50);
  ellipse(320, 320, 20, 20);
  fill(22);
  ellipse(340, 320, 20, 20);
  fill(16);
  ellipse(360, 320, 20, 20);
  fill(28);
  ellipse(380, 320, 20, 20);
  fill(157);
  ellipse(400, 320, 20, 20); //19 total ellipses on row 17
  //row 18
  fill(171);
  ellipse(40, 340, 20, 20);
  fill(50);
  ellipse(60, 340, 20, 20);
  fill(24);
  ellipse(80, 340, 20, 20);
  fill(24);
  ellipse(100, 340, 20, 20);
  fill(19);
  ellipse(120, 340, 20, 20);
  fill(27);
  ellipse(140, 340, 20, 20);
  fill(114);
  ellipse(160, 340, 20, 20);
  fill(146);
  ellipse(180, 340, 20, 20);
  fill(138);
  ellipse(200, 340, 20, 20);
  fill(104);
  ellipse(220, 340, 20, 20);
  fill(99);
  ellipse(240, 340, 20, 20);
  fill(94);
  ellipse(260, 340, 20, 20);
  fill(130);
  ellipse(280, 340, 20, 20);
  fill(105);
  ellipse(300, 340, 20, 20);
  fill(26);
  ellipse(320, 340, 20, 20);
  fill(19);
  ellipse(340, 340, 20, 20);
  fill(24);
  ellipse(360, 340, 20, 20);
  fill(45);
  ellipse(380, 340, 20, 20);
  fill(218);
  ellipse(400, 340, 20, 20); //19 total ellipses on row 18
  //row 19
  fill(145);
  ellipse(40, 360, 20, 20);
  fill(44);
  ellipse(60, 360, 20, 20);
  fill(20);
  ellipse(80, 360, 20, 20);
  fill(18);
  ellipse(100, 360, 20, 20);
  fill(19);
  ellipse(120, 360, 20, 20);
  fill(24);
  ellipse(140, 360, 20, 20);
  fill(58);
  ellipse(160, 360, 20, 20);
  fill(115);
  ellipse(180, 360, 20, 20);
  fill(169);
  ellipse(200, 360, 20, 20);
  fill(173);
  ellipse(220, 360, 20, 20);
  fill(170);
  ellipse(240, 360, 20, 20);
  fill(152);
  ellipse(260, 360, 20, 20);
  fill(123);
  ellipse(280, 360, 20, 20);
  fill(34);
  ellipse(300, 360, 20, 20);
  fill(18);
  ellipse(320, 360, 20, 20);
  fill(19);
  ellipse(340, 360, 20, 20);
  fill(31);
  ellipse(360, 360, 20, 20);
  fill(119);
  ellipse(380, 360, 20, 20);
  fill(234);
  ellipse(400, 360, 20, 20); //19 total ellipses on row 19
  //row 20
  fill(209);
  ellipse(40, 380, 20, 20);
  fill(93);
  ellipse(60, 380, 20, 20);
  fill(20);
  ellipse(80, 380, 20, 20);
  fill(17);
  ellipse(100, 380, 20, 20);
  fill(31);
  ellipse(120, 380, 20, 20);
  fill(37);
  ellipse(140, 380, 20, 20);
  fill(63);
  ellipse(160, 380, 20, 20);
  fill(66);
  ellipse(180, 380, 20, 20);
  fill(93);
  ellipse(200, 380, 20, 20);
  fill(113);
  ellipse(220, 380, 20, 20);
  fill(109);
  ellipse(240, 380, 20, 20);
  fill(101);
  ellipse(260, 380, 20, 20);
  fill(67);
  ellipse(280, 380, 20, 20);
  fill(17);
  ellipse(300, 380, 20, 20);
  fill(17);
  ellipse(320, 380, 20, 20);
  fill(28);
  ellipse(340, 380, 20, 20);
  fill(41);
  ellipse(360, 380, 20, 20);
  fill(140);
  ellipse(380, 380, 20, 20);
  fill(241);
  ellipse(400, 380, 20, 20); //19 total ellipses on row 20
  //row 21
  fill(219);
  ellipse(60, 400, 20, 20);
  fill(121);
  ellipse(80, 400, 20, 20);
  fill(48);
  ellipse(100, 400, 20, 20);
  fill(35);
  ellipse(120, 400, 20, 20);
  fill(50);
  ellipse(140, 400, 20, 20);
  fill(72);
  ellipse(160, 400, 20, 20);
  fill(80);
  ellipse(180, 400, 20, 20);
  fill(82);
  ellipse(200, 400, 20, 20);
  fill(88);
  ellipse(220, 400, 20, 20);
  fill(89);
  ellipse(240, 400, 20, 20);
  fill(86);
  ellipse(260, 400, 20, 20);
  fill(73);
  ellipse(280, 400, 20, 20);
  fill(24);
  ellipse(300, 400, 20, 20);
  fill(18);
  ellipse(320, 400, 20, 20);
  fill(35);
  ellipse(340, 400, 20, 20);
  fill(42);
  ellipse(360, 400, 20, 20);
  fill(193);
  ellipse(380, 400, 20, 20); //17 total ellipses on row 21
  //row 22
  fill(197);
  ellipse(60, 420, 20, 20);
  fill(112);
  ellipse(80, 420, 20, 20);
  fill(94);
  ellipse(100, 420, 20, 20);
  fill(70);
  ellipse(120, 420, 20, 20);
  fill(66);
  ellipse(140, 420, 20, 20);
  fill(85);
  ellipse(160, 420, 20, 20);
  fill(93);
  ellipse(180, 420, 20, 20);
  fill(100);
  ellipse(200, 420, 20, 20);
  fill(98);
  ellipse(220, 420, 20, 20);
  fill(93);
  ellipse(240, 420, 20, 20);
  fill(95);
  ellipse(260, 420, 20, 20);
  fill(85);
  ellipse(280, 420, 20, 20);
  fill(52);
  ellipse(300, 420, 20, 20);
  fill(53);
  ellipse(320, 420, 20, 20);
  fill(17);
  ellipse(340, 420, 20, 20);
  fill(20);
  ellipse(360, 420, 20, 20);
  fill(51);
  ellipse(380, 420, 20, 20);
  fill(141);
  ellipse(400, 420, 20, 20);
  // fill(204);
  // ellipse(420, 420, 20, 20);
  // fill(240);
  // ellipse(440, 420, 20, 20); //20 total ellipses on row 22
  //row 23
  fill(235);
  ellipse(0, 440, 20, 20);
  fill(181);
  ellipse(20, 440, 20, 20);
  fill(102);
  ellipse(40, 440, 20, 20);
  fill(47);
  ellipse(60, 440, 20, 20);
  fill(33);
  ellipse(80, 440, 20, 20);
  fill(128);
  ellipse(100, 440, 20, 20);
  fill(92);
  ellipse(120, 440, 20, 20);
  fill(91);
  ellipse(140, 440, 20, 20);
  fill(96);
  ellipse(160, 440, 20, 20);
  fill(107);
  ellipse(180, 440, 20, 20);
  fill(107);
  ellipse(200, 440, 20, 20);
  fill(105);
  ellipse(220, 440, 20, 20);
  fill(105);
  ellipse(240, 440, 20, 20);
  fill(105);
  ellipse(260, 440, 20, 20);
  fill(111);
  ellipse(280, 440, 20, 20);
  fill(128);
  ellipse(300, 440, 20, 20);
  fill(138);
  ellipse(320, 440, 20, 20);
  fill(46);
  ellipse(340, 440, 20, 20);
  fill(34);
  ellipse(360, 440, 20, 20);
  fill(42);
  ellipse(380, 440, 20, 20);
  fill(60);
  ellipse(400, 440, 20, 20);
  fill(74);
  ellipse(420, 440, 20, 20);
  // fill(108);
  // ellipse(440, 440, 20, 20); //23 total ellipses on row 23 
  // 371 ellipses total!
}var myMap;
var canvas;
var mappa = new Mappa('Leaflet');

// Lets change the map tiles to something with more contrast
var options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  style: "http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
}

function setup(){
  canvas = createCanvas(640,640);
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas) 

  // Load the data
  meteorites = loadTable('Meteorite_Landings.csv', 'csv', 'header');

  // Only redraw the meteorites when the map change and not every frame.
  myMap.onChange(drawMeteorites);

  fill(70, 203,31);	
  stroke(100);
}

function draw(){
}

// Draw the meteorites
function drawMeteorites() {
  // Clear the canvas
  clear();

  for (var i = 0; i < meteorites.getRowCount(); i++) {
    // Get the lat/lng of each meteorite 
    var latitude = Number(meteorites.getString(i, 'reclat'));
    var longitude = Number(meteorites.getString(i, 'reclong'));

    // Only draw them if the position is inside the current map bounds. We use a
    // Leaflet method to check if the lat and lng are contain inside the current
    // map. This way we draw just what we are going to see and not everything. See
    // getBounds() in http://leafletjs.com/reference-1.1.0.html
    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      // Transform lat/lng to pixel position
      var pos = myMap.latLngToPixel(latitude, longitude);
      // Get the size of the meteorite and map it. 60000000 is the mass of the largest
      // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
      var size = meteorites.getString(i, 'mass (g)');
      size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
      ellipse(pos.x, pos.y, size, size);
    }
  }
}// still playing with my 10print-inspired design
// business card design?

let o1 = 0; // new origin, x-coordinate
let o2 = 0; // new origin, y-coordinate
let y1 = 0; // change this and replay the sketch to see updated animation
let y2 = 15;

let designs = [];

function setup() {
  createCanvas(350,600);
  angleMode(DEGREES);

  for (var i = 0; i < 5; i++) {
    designs[i] = new Design();
  }

  slider1 = createSlider(0, 100, y1);
  slider1.position(150, 650);
  
  slider2 = createSlider(0, 100, y2);
  slider2.position(325, 650);
}

function draw() {
  background(255);

  y1 = slider1.value();
  y2 = slider2.value();
  
  for (o1 = 50; o1 <= 300 && o1 >= 50; o1 += 50) {
    for (o2 = 50; o2 <= 550 && o2 >= 50; o2 += 50) {
      for (var i = 0; i < designs.length; i++) {
        designs[i].show();
        designs[i].animate();
      }
    }
  }
}

let data;

// function preload() {
//   data = loadJSON("monsters.json");
// }

function preload() {
  data = loadJSON("crayola.json"); // there are object with properties in this file
}

function setup() {
  createCanvas(400, 400);
  // print(data.description);
  // print(data.colors);
  background(255);
  fill(0)
  textSize(20);

  text(data.colors[4].color, 100, 100);
  text(data.colors[4].hex, 200, 200); // { } in json file means that these are properties

  col = data.colors[4].hex
  fill(col);
  ellipse(300, 200, 20, 20);

  // for monsters.json
  // for (let i = 0; i < data.names.length; i++) {
  //     textAlign(CENTER);
  //     text(data.names[i], random(width), random(height));
  //     createP(data.names[i]); // DOM element to display text below the canvas
  //   }
}

// function draw() {
//   background(220);
// }// Use with this Arduino sketch: InClass_Wk7_Lab2_Exercise1a
// https://create.arduino.cc/editor/enickles/236df200-b9f0-44bb-b69b-c7dd81a74a70/preview
// using 3 pots

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var locH; // location of the circle
var locV; // location of the circle
var circleColor = 255; // color of the circle

function setup() {
  createCanvas(640, 480); // make canvas
  smooth(); // antialias drawing lines
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName); // open a serial port
}

function draw() {
  background(0); // black background
  fill(circleColor); // fill depends on the button
  ellipse(locH, locV, 50, 50); // draw the circle
}

function serialEvent() {
  // read a string from the serial port until you get carriage return and newline:
  // here is also where you change what you want to see, 
  // you can change how you end the line in the Arduino code
  var inString = serial.readStringUntil('\r\n');
  //print(inString);

  //check to see that there's actually a string there:
  if (inString.length > 0) {
    var sensors = split(inString, ','); // split the string on the commas
    if (sensors.length > 2) { // if there are three elements
      locH = map(sensors[0], 0, 1023, 0, width); // element 0 is the locH
      locV = map(sensors[1], 0, 1023, 0, height); // element 1 is the locV
      circleColor = map(sensors[2], 0, 1023, 0, 255); // element 2 is the circleColor
    }
  }
}


function portOpen() {
  print('the serial port opened.')
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}// Use with this Arduino sketch: Wk7_PComp_Lab1_Exercise3
// https://create.arduino.cc/editor/enickles/10d2fd9e-b31a-4fa2-9e07-ac96cd58deb5/preview

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var inData; // for incoming serial data
var outByte = 0; // for outgoing data

function setup() {
  createCanvas(400, 300); // make the canvas
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName); // open a serial port
}

function draw() {
  background(0); // black background, white text:
  fill(255);
  text("incoming value: " + inData, 30, 30); // display the incoming serial data as a string:
}

function serialEvent() {
  var inByte = serial.read();   // read a byte from the serial port:
  inData = inByte;   // store it in a global variable:
}


function mouseDragged() {
  outByte = int(map(mouseY, 0, height, 0, 255)); // map the mouseY to a range from 0 to 255:
  // send it out the serial port:
  serial.write(outByte + '\n'); // my microcontroller is expecting a string 
	// When the command encounters the two different elements, 
	// the number and the string (‘\n’)
	// it will convert the number into a string in order 
	// to concatenate the two. 
	// In addition, the newline on the end will is useful on the Arduino side. S
	// Since it’s a non-numeric character, the Serial.parseInt() function 
	// will see it and parse the string, not waiting for the timeout.
}

function keyPressed() {
  if (key >= 0 && key <= 9) { // if the user presses 0 through 9
    outByte = byte(key * 25); // map the key to a range from 0 to 225
  }
  serial.write(outByte); // send it out the serial port
}



function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}// Use with this Arduino sketch: InClass_Wk7_Lab1_Exercise2
// https://create.arduino.cc/editor/enickles/0f3f2a18-702e-455f-9386-bf98d24213a8/preview

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var inData; // for incoming serial data
var outByte = 0; // for outgoing data

function setup() {
  createCanvas(400, 300); // make the canvas
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on();
  // serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName); // open a serial port
}

function draw() {
  background(0); // black background, white text:
  fill(255);
  text("Press H or L", 30, 30); // display the incoming serial data as a string:
  // text("incoming value: " + inData, 30, 60); // display the incoming serial 
}

// function serialEvent() {
// var inByte = serial.read();   // read a byte from the serial port:
// inData = inByte;   // store it in a global variable:
// }

function keyPressed() {
 if (key ==='H' || key ==='L') { // if the user presses H or L
 serial.write(key);              // send it out the serial port
 print(key);
 }
}

// function mouseDragged() {
//  outByte = int(map(mouseY, 0, height, 0, 255));  // map the mouseY to a range from 0 to 255:
//  serial.write(outByte);  // send it out the serial port:
// }

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}// Use with this Arduino sketch: Wk7_PComp_Lab1_Exercise1
// https://create.arduino.cc/editor/enickles/0c61e465-dfa1-4c0e-a639-da7e17a23cf8/preview

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var inData; // for incoming serial data
var outByte = 0; // for outgoing data

function setup() {
  createCanvas(400, 300); // make the canvas
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName); // open a serial port
}

function draw() {
  background(0); // black background, white text:
  fill(255);
  text("incoming value: " + inData, 30, 30); // display the incoming serial data as a string:
}

function serialEvent() {
  var inByte = serial.read();   // read a byte from the serial port:
  inData = inByte;   // store it in a global variable:
}


function mouseDragged() {
  outByte = int(map(mouseY, 0, height, 0, 255)); // map the mouseY to a range from 0 to 255:
  serial.write(outByte); // send it out the serial port:
}

function keyPressed() {
  if (key >= 0 && key <= 9) { // if the user presses 0 through 9
    outByte = byte(key * 25); // map the key to a range from 0 to 225
  }
  serial.write(outByte); // send it out the serial port
}



function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}let serial;
let portName = '/dev/cu.usbmodem1421';
let inData;
let bg;
let col;

function setup() {
  createCanvas(400, 400);

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  // serial.open(portName); // open a port
  serial.on('data', parseData()); // callback for when new data
}

function draw() {
  background(bg);

  noStroke();
  fill(col);
  ellipse(200, 200, 100);
}

function parseData() {
  //let inData = serial.read(); // reads one byte at a time, use with serial.Write

  let inData = serial.readLine() // use readLine with println
  if (inData.length > 0) {
    bg = int(inData); // convert all values back to integers
  }
  print(inData);

  //separating out multiple values
//   let inData = serial.readLine() // use readLine with println
//   if (inData.length > 0) {
//     let values = inData.split(','); //can change this delimiter in the Arduino and here
//     print(values);

//     bg = int(values[0]);
//     col = int(values[1]);
//   }
}let serial;
let portName = '/dev/cu.usbmodem1421';
let bg;
let col;

function setup() {
  createCanvas(400, 400);

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.open(portName); // open a port
  serial.on('data', parseData()); // callback for when new data
}

function draw() {
  background(bg);
  
  noStroke();
  fill(col);
  ellipse(200,200,100);
}

function parseData() {
  //let inData = serial.read(); // reads one byte at a time, use with serial.Write

  // let inData = serial.readLine() // use readLine with println
  // if (inData.length > 0) {
  //   bg = int(inData); // convert all values back to integers
  // }
  //print(inData);

  //separating out multiple values
  let inData = serial.readLine() // use readLine with println
  if (inData.length > 0) {
    let values = inData.split(','); //can change this delimiter in the Arduino and here
    print(values);
    
    bg = int(values[0]);
    col = int(values[1]);
  }



}// still playing with my 10print-inspired design
// one input from a potentiometer, ASCII data read string
// with handshaking method
// works with Arduino sketch: 1Pot_to_P5js_ASCII
// https://create.arduino.cc/editor/enickles/6989e0db-d697-4f27-9c04-febc66adb3d6/preview

let serial;
let portName = '/dev/cu.usbmodem1421';
let inData;

let design;
let y1 = 0;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
	serial.open(portName);
  serial.on('data', serialEvent); // callback for when new data arrives

  design = new Design();
}

function draw() {
  background(255);
  changeY1(inData);
  design.show();
  design.animate();

}

function serialEvent() {
  let inString = serial.readLine();  // read a string from the serial port:
    if (inString.length > 0) { 	  // check to see that there's actually a string there:
    inData = Number(inString);  // convert it to a number
  }
  
  // is the above the same as: ?????
  //inData = Number(serial.read());
  
  print(inData)
}

function changeY1() {					// I can't remember where I got this but there was content in the () that matched the first variable in map and it still worked..?
  y1 = map(inData, 0, 1023, 0, 100);
  serial.write("x");
}// still playing with my 10print-inspired design
// two inputs as pots, values sent as ASCII encoded-strings
// use with Arduino sketch: 2Pots_to_P5js_ASCII
// https://create.arduino.cc/editor/enickles/3e3147fb-6a3a-4b71-a3b3-92231320c4ca/preview

// I found this Danny Rozin ArduinotoP5AsciiMultiple sketch for help with reading a string
// and splitting its values into an array
// http://alpha.editor.p5js.org/projects/HkNSDuf1e

// ? with 2 input values, do I have the serial.write back to Arduino for handshaking set up right?

let serial;
let portName = '/dev/cu.usbmodem1421';
let inData1;
let inData2;

let o1 = 0; // new origin, x-coordinate
let o2 = 0; // new origin, y-coordinate
let y1 = 0;
let y2 = 0;

let designs = [];

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.open("/dev/cu.usbmodem14111"); // open a port
  serial.on('data', serialEvent); // callback for when new data

  for (var i = 0; i < 5; i++) {
    designs[i] = new Design();
  }
}

function draw() {
  background(255);
  changeY1(inData1);
  changeY2(inData2);

  for (o1 = 50; o1 <= 550 && o1 >= 50; o1 += 50) {
    for (o2 = 50; o2 <= 550 && o2 >= 50; o2 += 50) {
      for (var i = 0; i < designs.length; i++) {
        designs[i].show();
        designs[i].animate();
      }
    }
  }
}

function serialEvent() {
  // modified from Danny Rozin's sketch
  // let stringFromSerial = serial.readLine();
  // if (stringFromSerial.length > 0) {
  //   var trimmedString = trim(stringFromSerial);
  //   var myArray = split(trimmedString, ",")
  //   inData1 = Number(myArray[0]);
  //   inData2 = Number(myArray[1]);
  // }
  // print(stringFromSerial);

  // another version from PComp help session with Chino
  let stringFromSerial = serial.readLine() // use readLine with println
  if (stringFromSerial.length > 0) {
    let values = stringFromSerial.split(','); //can change this delimiter in the Arduino and here
    print(values);
    inData1 = int(values[0]);
    inData2 = int(values[1]);
  }
}


function changeY1(inData1) {
  y1 = map(inData1, 0, 1023, 0, 100);
  serial.write("x");
}

function changeY2(inData2) {
  y2 = map(inData2, 0, 1023, 0, 100);
  serial.write("x");
}// still playing with my 10print-inspired design
// one input from a potentiometer, binary data
// with handshaking method
// use with this Arduino sketch: 1Pot_to_P5js_Binary
// https://create.arduino.cc/editor/enickles/4677f92b-ab08-47c0-9efd-8896e6b5d983/preview

let serial;
let portName = '/dev/cu.usbmodem1421';
let inData;

let design;
let y1 = 0;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.open(portName); // open a port
  serial.on('data', serialEvent); // callback for when new data arrives

  design = new Design();
}

function draw() {
  background(255);
  changeY1(inData); // probably don't need to send inData as a parameter because it's a global variable
  design.show();
  design.animate();

}

function serialEvent() {
  inData = Number(serial.read()); // inData is a global variable
  print(inData)
}

function changeY1() { // I can't remember where I got this but there was content in the () that matched the first variable in map and it still worked..?
  y1 = map(inData, 0, 255, 0, 100);
  serial.write("x");
}// one input, binary data
// with hardware handshaking method

let serial;
let portName = '/dev/cu.usbmodem1421';
let inData;

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.open(portName);
  serial.on('data', serialEvent); // callback for when new data arrives
}

function draw() {
  background(200);
  moveEllipse(inData);
}

function serialEvent() {
  inData = Number(serial.read());
  print(inData)
}

function moveEllipse() {
  let y = map(inData, 0, 255, 0, height)
  fill(255);
  ellipse(200, y, 55, 55);
  serial.write("x");
}// still playing with my 10print-inspired design

let o1 = 0; // new origin, x-coordinate
let o2 = 0; // new origin, y-coordinate
let y1 = 0; // change this and replay the sketch to see updated animation
let y2 = 15;

let designs = [];

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);

  for (var i = 0; i < 5; i++) {
    designs[i] = new Design();
  }

  slider1 = createSlider(0, 100, y1);
  slider1.position(150, 650);
  
  slider2 = createSlider(0, 100, y2);
  slider2.position(325, 650);
}

function draw() {
  background(255);

  y1 = slider1.value();
  y2 = slider2.value();
  
  for (o1 = 50; o1 <= 550 && o1 >= 50; o1 += 50) {
    for (o2 = 50; o2 <= 550 && o2 >= 50; o2 += 50) {
      for (var i = 0; i < designs.length; i++) {
        designs[i].show();
        designs[i].animate();
      }
    }
  }
}

// still playing with my 10print-inspired design

let o1 = 0; // new origin, x-coordinate
let o2 = 0; // new origin, y-coordinate

let designs = [];
let speed = 0.5; // change this and replay the sketch to see updated animation

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);

  for (var i = 0; i < 5; i++) {
  designs[i] = new Design();
  }
  
  slider = createSlider(0, 100, speed);
  slider.position(250, 625);
}

function draw() {
  background(255);

  print(slider.value());
	speed = slider.value();
  
  for (o1 = 50; o1 <= 550 && o1 >= 50; o1 += 50) {
    for (o2 = 50; o2 <= 550 && o2 >= 50; o2 += 50) {
      for (var i = 0; i < designs.length; i++) {
        designs[i].show();
        designs[i].animate();
      }
    }
  }

}let o1 = 0
let o2 = 0
let x = 0
let y = 0
let e = 20
let d = 20
let i = 45
let t = 360

let xSlider;
let ySlider;
let eSlider;
let dSlider;
let iSlider;
let tSlider;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);

  xSlider = createSlider(0, 100, 0, 0);
  xSlider.position(20, 500);

  ySlider = createSlider(0, 100, 0, 0);
  ySlider.position(20, 540);

  eSlider = createSlider(0, 360, 20, 0);
  eSlider.position(240, 500);

  dSlider = createSlider(0, 100, 20, 0);
  dSlider.position(240, 540);
  
  iSlider = createSlider(0, 90, 45, 5);
  iSlider.position(440, 500);

  tSlider = createSlider(180, 360, 360, 10);
  tSlider.position(440, 540);
}

function draw() {
  background(255);

  // draw sliders
  let x = xSlider.value();
  let y = ySlider.value();
  let e = eSlider.value();
  let d = dSlider.value();
  let i = iSlider.value();
  let t = tSlider.value();
  
  for (o1 = 50; o1 <= 550 && o1 >= 50; o1 += 50) {
    for (o2 = 50; o2 <= 450 && o2 >= 50; o2 += 50) {
      push();
      translate(o1, o2);
      for (var a = 0; a <= t; a += i) {
        rotate(a)
        line(x, y, e, d);
      }
      pop();
    }
  }

}// still playing with my 10print-inspired design

let design;
let y1 = 0;
let button;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  design = new Design();
  button = createButton("What happens?");
  button.position(250,675);
  button.mousePressed(changeY1); 
  
}

function draw() {
  background(255);
  design.show();
  design.animate();

}


// function mousePressed() {
//   changeY1();
// }

function changeY1() {
  y1 = random(0, 200);
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

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
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(50, data, 50, 50);
  text(data, 10, 10);
}// from here:
// https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/#Program_P5js_to_list_the_available_serial_ports
// connect Pot to A0 (and make sure sketch is running on the Arduino)
// Arduino sketch: Pot_to_P5js_ASCII_0_1023:
// https://create.arduino.cc/editor/enickles/17c1fa46-0b72-4fa4-b4bb-6c053bbd72bc/preview

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
let inData; // for incoming serial data
let xPos = 0; // x position of the graph

function setup() {
  createCanvas(400, 400);
  background(0x08, 0x16, 0x40);
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
  graphData(inData);
}


function graphData(newData) {
  // map the range of the input to the window height:
  let yPos = map(newData, 0, 1023, 0, height); // ***notice change in mapped values***
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

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialEvent() {
  let inString = serial.readLine();  // read a string from the serial port:
    if (inString.length > 0) { 	  // check to see that there's actually a string there:
    inData = Number(inString);  // convert it to a number
  }
  
  print(inData)
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
}// from here:
// https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/#Program_P5js_to_list_the_available_serial_ports
// connect Pot to A0 (and make sure sketch is running on the Arduino)
// Arduino sketch: Pot_to_P5js_ASCII_String

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
let inData; // for incoming serial data
let xPos = 0; // x position of the graph

function setup() {
  createCanvas(400, 400);
  background(0x08, 0x16, 0x40);
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
  graphData(inData);
}


function graphData(newData) {
  // map the range of the input to the window height:
  var yPos = map(newData, 0, 255, 0, height);
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

function serialEvent() {
  print(inData)
  // read a string from the serial port:
  let inString = serial.readLine();
  // check to see that there's actually a string there:
  if (inString.length > 0) {
    // convert it to a number:
    inData = Number(inString);
  }
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}// from here:
// https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/#Program_P5js_to_list_the_available_serial_ports
// connect Pot to A0 (and make sure sketch is running on the Arduino)
// Arduino sketch: Pot_to_P5js_ASCII_String

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
let inData; // for incoming serial data
let xPos = 0; // x position of the graph

function setup() {
  createCanvas(400, 400);
  background(0x08, 0x16, 0x40);
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
  graphData(inData);
}


function graphData(newData) {
  // map the range of the input to the window height:
  var yPos = map(newData, 0, 255, 0, height);
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

function serialEvent() {
  // inData = Number(serial.read()); // from Binary sketch
  print(inData)
  // read a byte from the serial port, convert it to a number:
  inData = serial.readLine();
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}// from here:
// https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/#Program_P5js_to_list_the_available_serial_ports
// connect Pot to A0 (and make sure sketch is running on the Arduino)
// Arduino sketch: Pot_to_P5js_Binary

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
let inData; // for incoming serial data
let xPos = 0; // x position of the graph

function setup() {
  createCanvas(400, 400);
  background(0x08, 0x16, 0x40);
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
  graphData(inData);
}


function graphData(newData) {
  // map the range of the input to the window height:
  var yPos = map(newData, 0, 255, 0, height);
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

function serialEvent() {
  inData = Number(serial.read());
  print(inData)
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}// from here:
// https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/#Program_P5js_to_list_the_available_serial_ports
// connect Pot to A0 (and make sure sketch is running on the Arduino)
// Arduino sketch: Pot_to_P5js_Binary

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
let inData; // for incoming serial data

function setup() {
  createCanvas(400, 400);
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
  background(220);
  background(0);
  fill(255);
  text("sensor value: " + inData, 30, 30);
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

function serialEvent() {
  inData = Number(serial.read());
  print(inData)
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}// from here:
// https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/#Program_P5js_to_list_the_available_serial_ports
// When you run this P5 sketch in a browser, you’ll get a list of the available serial ports in the console. 
// This list will look just like the list of serial ports you see in the Arduino Tools menu. 
// Find the name of your port in the list. 
// Later, you’ll assign that name to a global variable called portName.
// No Arduino sketch yet for this P5 sketch

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here

function setup() {
  createCanvas(400, 400);
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

function draw() {
  background(220);
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
 
function serialEvent() {
 
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}// from here:
// https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/#Program_P5js_to_list_the_available_serial_ports
// When you run this P5 sketch in a browser, you’ll get a list of the available serial ports in the console. 
// This list will look just like the list of serial ports you see in the Arduino Tools menu. 
// Find the name of your port in the list. 
// Later, you’ll assign that name to a global variable called portName.
// No Arduino sketch yet for this P5 sketch

let serial; // variable to hold an instance of the serialport library

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event

  serial.list(); // list the serial ports
}

function draw() {
  background(220);
}


// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}var bubbles = [];

function setup() {
  createCanvas(200, 200);
}

function mouseDragged() {
  // push adds objects to end of array index
  bubbles.push(new Bubble(mouseX, mouseY));
}

// remove bubbles with keyPressed function
function keyPressed() {
  if (key == 'd' || key == 'D') {
    // bubbles.splice(0, 1); // delete one bubble at a time
    bubbles.splice(0, bubbles.length); // delete all bubbles
  }
}

function draw() {
  background(0);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();

    // remove bubbles if list (or array) 
    // if (bubbles.length > 20) {
    //   // for splice, first number is the index of what to remove
    //   // the second argument is how many
    //   bubbles.splice(0, 1);
    // }

  }
}

class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    stroke(255);
    fill(255, 0, 150, 50);
    ellipse(this.x, this.y, 24, 24);
  }

  move() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }
}let bubbles = [];

function setup() {
  createCanvas(200, 200);
  for (var i = 0; i < 100; i++) {
    bubbles[i] = new Bubble();
  }
}

function draw() {
  background(0);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
}

class Bubble {
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
  }

  display() {
    stroke(255);
    noFill();
    ellipse(this.x, this.y, 24, 24);
  }

  move() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }
}let bubble1;
let bubble2;
let bubble3;
let bubble4;

function setup() {
  createCanvas(200, 200);
  bubble1 = new Bubble();
  bubble2 = new Bubble();
  bubble3 = new Bubble();
  bubble4 = new Bubble();
}

function draw() {
  background(0);
  bubble1.move();
  bubble1.display();

  bubble2.move();
  bubble2.display();

  bubble3.move();
  bubble3.display();

  bubble4.move();
  bubble4.display();
}

class Bubble {

  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
  }

  display() {
    stroke(255);
    noFill();
    ellipse(this.x, this.y, 24, 24);
  }

  move() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }
}// still playing with my 10print-inspired design

o1 = 0; // new origin, x-coordinate
o2 = 0; // new origin, y-coordinate

let designs = [];

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  
  for (var i = 0; i < 5; i++) {
    designs[i] = new Design();
  }
}

function draw() {
  background(255);

  for (o1 = 50; o1 <= 550 && o1 >= 50; o1 += 50) {
    for (o2 = 50; o2 <= 550 && o2 >= 50; o2 += 50) {
      for (var i = 0; i < designs.length; i++) {
        designs[i].show();
        designs[i].animate();
      }
    }
  }
}// still playing with my 10print-inspired design

let design;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  design = new Design();
}

function draw() {
  background(255);
  design.show();
  design.animate();
}


var words = ["ಥ_ಥ", "(ง'̀-'́)ง", "(°ロ°)☝", "(｡◕‿‿◕｡)", "( ͡° ͜ʖ ͡°)", "(ᵔᴥᵔ)", "༼ つ ◕_◕ ༽つ"];

var index = 0;

function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(0);

  fill(255);
  textSize(32);
  text(words[index], 10, 100);
}

function mousePressed() {
  index = index + 1;

  if (index == words.length) {
    index = 0;
  }
}// still playing with my 10print-inspired design


let designs = [];

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  for (var i = 0; i < 40; i++) {
    designs[i] = new Design(i*0.1);
  }

}

function draw() {
  background(255);

  for (var i = 0; i < designs.length; i++) {
		designs[i].show();
    designs[i].animate();
  }
}// still playing with my 10print-inspired design
// leaving old code from my multiple objects sketch to document 
// my progression to arrays

let designs = [];

// let design1;
// let design2;
// let design3;
// let design4;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  for (var i = 0; i < 4; i++) {
    designs[i] = new Design();
  }

  // design1 = new Design(0, 0, 40, 40, 3, 200, 200, 0.4);
  // design2 = new Design(40, 90, 80, 50, 6, 200, 200, 0.8);
  // design3 = new Design(80, 90, 100, 100, 3, 200, 200, 1.2);
  // design4 = new Design(100, 100, 140, 140, 6, 200, 200, 1.4); 

}

function draw() {
  background(255);

  for (var i = 0; i < designs.length; i++) {
		designs[i].show();
    designs[i].animate();
  }

  //   design1.show();
  //   design1.animate();

  //   design2.show();
  //   design2.animate();

  //   design3.show();
  //   design3.animate();

  //   design4.show();
  //   design4.animate();
}// call a function that returns a value, update to change input temp

// Write a program that implements the above sketch. 
// Complete function CtoF() that receives a temperature in Celsius (°C) as an arguement, 
// and returns the temperture back Fahrenheit (°F). 
// The forumula is F° = (C° × 1.8) + 32.


var input = 20;

function setup() {
  createCanvas(200, 200);
  background(255);

  var temp = CtoF(input);
  text('Temperature in °C: ' + ((temp-32)*(5/9)), 0, 50);
  text('Temperature in °F: ' + temp, 0, 100);
}

function CtoF(temp) {
  var f = (temp * 1.8) + 32;
  return f;
}let ball;


function setup() {
  createCanvas(200, 200);
  ball = new Ball();
}


function draw() {
  background(0);
  ball.display();
  ball.move();
  ball.bounce();
}


class Ball {
  constructor() {
    this.x = 100;
    this.y = 180;
    this.xspeed = 5;
    this.yspeed = 2;
    this.r = 10;
  }

  display() {
    ellipse(this.x, this.y, this.r * 2, this.r * 2)
  }

  move() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  bounce() {
    if (this.x > width - this.r || this.x < this.r) {
      this.xspeed = -this.xspeed;
    }
    if (this.y > height - this.r || this.y < this.r) {
      this.yspeed = -this.yspeed;
    }
  }
}// call a function with parameters, cleaner version

function setup() {
  createCanvas(200, 200);
  background(255);
  noStroke();
  colorMode(HSB, 255);

  // what I want to do in the for loop
  // iceCream(70, 100, random(20,30));
  // iceCream(100, 100, random(20,30));
  // iceCream(130, 100, random(20,30));

  // set position of ice cream cones
  // for (let x = 50; x <= 150; x += 50) {
  //   iceCream(x, 100, 20);
  // }

  // add changing size of cones by adjusting diameter
  for (let x = 70; x <= 130; x += 30) {
    iceCream(x, 100, random(20, 30));
  }
}

function iceCream(x, y, diameter) {
  fill(random(360), 112, 331);
  arc(x, y, diameter, diameter, -PI, 0);
  fill('#d7c38e');
  triangle(x - diameter / 2, y + 5, x + diameter / 2, y + 5, x, y + diameter * 1.3);
}// still playing with my 10print-inspired design

let design1;
let design2;
let design3;
let design4;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  design1 = new Design(0, 0, 40, 40, 3, 200, 200);
  design2 = new Design(40, 90, 80, 50, 6, 200, 200);
  design3 = new Design(80, 90, 100, 100, 3, 200, 200);
  design4 = new Design(100, 100, 140, 140, 6, 200, 200); 
}

function draw() {
  background(255);

  design1.show();
  design1.animate(1);

  design2.show();
  design2.animate(2);

  design3.show();
  design3.animate(3);

  design4.show();
  design4.animate(4);
}// still playing with my 10print-inspired design

let design1;
let design2;
let design3;
let design4;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  design1 = new Design(0, 0, 40, 40, 3, 200, 200, 0.4);
  design2 = new Design(40, 90, 80, 50, 6, 200, 200, 0.8);
  design3 = new Design(80, 90, 100, 100, 3, 200, 200, 1.2);
  design4 = new Design(100, 100, 140, 140, 6, 200, 200, 1.4); 
  
  // another variation
  // design1 = new Design(0, 0, 40, 40, 3, 200, 200, 0.4);
  // design2 = new Design(40, 40, 80, 80, 6, 200, 200, 0.6);
  // design3 = new Design(80, 80, 120, 120, 9, 200, 200, 0.8);
  // design4 = new Design(120, 120, 160, 160, 12, 200, 200, 1);
}

function draw() {
  background(255);

  design1.show();
  design1.animate();

  design2.show();
  design2.animate();

  design3.show();
  design3.animate();

  design4.show();
  design4.animate();
}// still playing with my 10print-inspired design

let design;


function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  design = new Design();
}

function draw() {
  background(255);
  design.show();
  design.animate();
}

// Bouncing ball
// no objects to having objects

// let x = 200;
// let y = 20;
// let speed = 0;
let gravity = 0.1;
let bouncer1;
let bouncer2;
console.log(bouncer);

function setup() {
  createCanvas(400, 400);
  bouncer1 = new Ball(20);
  bouncer2 = new Ball(60);
}

function draw() {
  background(220);
  bouncer1.move();
  bouncer1.show();
  bouncer2.move();
  bouncer2.show();
  
//   fill(0);
//   ellipse(x, y, 24, 24);

//   y = y + speed;
//   speed = speed + gravity;
//   if (y > height) {
//     y = height;
//     speed = -.95 * speed;
//   }
}

// Bouncing ball
// no objects to having objects

// let x = 200;
// let y = 20;
// let speed = 0;
let gravity = 0.1;
let bouncer;
console.log(bouncer);

function setup() {
  createCanvas(400, 400);
  bouncer = new Ball();
}

function draw() {
  background(220);
  bouncer.move();
  bouncer.show();
  
//   fill(0);
//   ellipse(x, y, 24, 24);

//   y = y + speed;
//   speed = speed + gravity;
//   if (y > height) {
//     y = height;
//     speed = -.95 * speed;
//   }
}

// still playing with my 10print-inspired design

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(255);

  displayDesign(0, 0, 20, 20, 30, 360, 200, 200); // center
  displayDesign(30, 30, 50, 80, 15, 360, 200, 200); // ring1
  displayDesign(80, 90, 80, 50, 2, 360, 200, 200); // ring2
  displayDesign(100, 110, 110, 10, 6, 360, 200, 200); // ring3
  displayDesign(120, 130, 100, 100, 3, 360, 200, 200); // ring4
  displayDesign(0, 10, 40, 50, 20, 360, 50, 50); // top left
  displayDesign(10, 10, 30, 30, 15, 360, 50, 50); // top left2
  displayDesign(0, 10, 40, 50, 20, 360, 350, 50); // top right
  displayDesign(10, 10, 30, 30, 15, 360, 350, 50); // top right2
  displayDesign(0, 10, 40, 50, 20, 360, 50, 350); // bottom left
  displayDesign(10, 10, 30, 30, 15, 360, 50, 350); // bottom left2
  displayDesign(0, 10, 40, 50, 20, 360, 350, 350); // bottom right
  displayDesign(10, 10, 30, 30, 15, 360, 350, 350); // bottom right
}

function displayDesign(x, y, e, d, i, t, o1, o2) {
  push();
  translate(o1, o2);
  for (var a = 0; a <= t; a += i) {
    rotate(a)
    line(x, y, e, d);
  }
  pop();
}var x = 0;
var y = 0;
var a = 0;
var b = 0;

var xSlider;
var ySlider;
var aSlider;
var bSlider;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);

  // create sliders
  xSlider = createSlider(0, 100, 0, 0);
  xSlider.position(20, 20);

  ySlider = createSlider(0, 100, 0, 0);
  ySlider.position(240, 20);

  aSlider = createSlider(0, 360, 20, 0);
  aSlider.position(20, 365);

  bSlider = createSlider(0, 100, 20, 0);
  bSlider.position(240, 365);

}

function draw() {
  background(225);

  // draw sliders
  var x = xSlider.value(); // x coordinate start of line
  var y = ySlider.value(); // y coordinate start of line
  var a = aSlider.value(); // a -- x coordinate end of line
  var b = bSlider.value(); // b -- y coordinate end of line

  // base shape
  push();
  translate(200, 200);
  for (var i = 0; i <= 360; i += 45) {
    rotate(i)
    line(x, y, a, b);
  }
  pop();


}var x = 0;
var y = 0;

// var s1 = 100; // if I take these out of global scope then mousePressed cannot see
// var s2 = 300;
// var w = 10;
// var h = 20;

var rollover = false;
var dragging = false;


function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}


function draw() {
  background(225);
  displayDesign();
  slider(100, 300, 10, 20, 100, 300, 0);
}


function displayDesign() {
  push();
  translate(200, 200);
  for (var a = 0; a <= 360; a += 45) {
    rotate(a)
    line(x, y, 20, 20);
  }
  pop();
}


function slider(s1, s2, w, h, sliderStart, sliderEnd, offsetS) {
  line(sliderStart, s2 + h / 2, sliderEnd, s2 + h / 2);
  fill(255);
  rect(s1, s2, w, h);

  if (dragging) {
    s1 = mouseX + offsetS;
  }

  s1 = constrain(s1, sliderStart, sliderEnd - w);

  //change starting point for line
  x = map(s1, sliderStart, sliderEnd - w, 0, 60);

}


function mousePressed() {
  if (mouseX > s1 && mouseX < s1 + w && mouseY > s2 && mouseY < s2 + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetS = s1 - mouseX;
  }
}


function mouseReleased() {
  dragging = false; // Stop dragging
}// basic slider example, calling functions only
// see here for calling functions with parameters: 
// https://editor.p5js.org/enickles/sketches/B1NlWDwSm

var x = 0;
var y = 0;

var s1 = 100;
var s2 = 300;
var w = 10;
var h = 20;
var sliderStart = 100;
var sliderEnd = 300;
var offsetS = 0;

var rollover = false;
var dragging = false;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);

}

function draw() {
  background(225);
  displayDesign();
  displaySlider();
  sliderBehaviors();
}

function mousePressed() {
  if (mouseX > s1 && mouseX < s1 + w && mouseY > s2 && mouseY < s2 + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetS = s1 - mouseX;
  }
}

function mouseReleased() {
  dragging = false; // Stop dragging
}

function displayDesign() {
  push();
  translate(200, 200);
  for (var a = 0; a <= 360; a += 45) {
    rotate(a)
    line(x, y, 20, 20);
  }
  pop();
}

function displaySlider() {
  line(sliderStart, s2 + h / 2, sliderEnd, s2 + h / 2);
  fill(255);
  rect(s1, s2, w, h);
}

function sliderBehaviors() {
  if (dragging) {
    s1 = mouseX + offsetS;
  }

  s1 = constrain(s1, sliderStart, sliderEnd - w);

  //change starting point for line
  x = map(s1, sliderStart, sliderEnd - w, 0, 60);
}let o1 = 0
let o2 = 0
let x = 0
let y = 0
let e = 20
let d = 20
let i = 45
let t = 360

let xSlider;
let ySlider;
let eSlider;
let dSlider;
let iSlider;
let tSlider;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);

  xSlider = createSlider(0, 100, 0, 0);
  xSlider.position(20, 500);

  ySlider = createSlider(0, 100, 0, 0);
  ySlider.position(20, 540);

  eSlider = createSlider(0, 360, 20, 0);
  eSlider.position(240, 500);

  dSlider = createSlider(0, 100, 20, 0);
  dSlider.position(240, 540);
  
  iSlider = createSlider(0, 90, 45, 5);
  iSlider.position(440, 500);

  tSlider = createSlider(180, 360, 360, 10);
  tSlider.position(440, 540);
}

function draw() {
  background(255);

  // draw sliders
  var x = xSlider.value();
  var y = ySlider.value();
  var e = eSlider.value();
  var d = dSlider.value();
  var i = iSlider.value();
  var t = tSlider.value();
  
  for (o1 = 50; o1 <= 550 && o1 >= 50; o1 += 50) {
    for (o2 = 50; o2 <= 450 && o2 >= 50; o2 += 50) {
      push();
      translate(o1, o2);
      for (var a = 0; a <= t; a += i) {
        rotate(a)
        line(x, y, e, d);
      }
      pop();
    }
  }

}var x = 0;
var y = 0;

var s1 = 100;
var s2 = 300;
var w = 10;
var h = 20;

var sliderStart = 100; //slider start
var sliderEnd = 300; //slider end
var offsetS = 0; //Offset for dragging slider - what is this???

var rollover = false;
var dragging = false;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);

}

function draw() {
  background(225);

  //base shape
  push();
  translate(200, 200);
  for (var a = 0; a <= 360; a += 45) {
    rotate(a)
    line(x, y, 20, 20);
  }
  pop();

  line(sliderStart, s2 + h / 2, sliderEnd, s2 + h / 2); //line for slider
  fill(255);
  rect(s1, s2, w, h); //rectangle for slider

  //if dragging the mouse, redraw s1 to new mouse location?
  //I know I need offset, but I still can't see why...
  if (dragging) {
    s1 = mouseX + offsetS;
  }

  //make sure s1 does not go beyond the end of the line
  s1 = constrain(s1, sliderStart, sliderEnd - w);

	//change starting point for line
  x = map(s1, sliderStart, sliderEnd - w, 0, 60);

}

function mousePressed() {
  if (mouseX > s1 && mouseX < s1 + w && mouseY > s2 && mouseY < s2 + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetS = s1 - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}var s1 = 100;
var s2 = 300;
var w = 10;
var h = 20;

var sliderStart = 100; //slider start
var sliderEnd = 300; //slider end
var offsetS = 0; //Offset for dragging slider - what is this???

var rollover = false;
var dragging = false;

function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(225);

  //line for slider
  stroke(0);
  line(sliderStart, s2 + h / 2, sliderEnd, s2 + h / 2);

  //rectangle for slider
  fill(255);
  rect(s1, s2, w, h);

  //if dragging the mouse, change s1 to new mouse location?
  //So I know I need offset, but I still can't see why...
  if (dragging) {
    s1 = mouseX + offsetS;
  }

  //make sure s1 does not go beyond the end of the line
  s1 = constrain(s1, sliderStart, sliderEnd - w);

}

function mousePressed() {
  if (mouseX > s1 && mouseX < s1 + w && mouseY > s2 && mouseY < s2 + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetS = s1 - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}//4- Rectangle variables for slider
var x = 100;
var y = 475;
var w = 10;
var h = 100;

//5 - create variable states for where mouse is and what it's doing
var rollover = false; // Is the mouse over the slider?
var dragging = false; // Is the slider being dragged?

//6 - create variables for slider
var sliderStart = 100; //slider start
var sliderEnd = 500; //slider end
var offsetX = 0; //Offset for dragging slider - I know I need it, but what is this???


function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);

  //7- Is it being dragged?
  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd-w);
  
	//Fill according to state
  if (dragging) {
    fill(255);
  } else {
    fill(0);
  }

  //1 - my shape, fill of which will change with slider;
  //rect(100, 50, 400, 400);
  //8 - Here we take the slider's range and map it to a value between 0 and 255
  var b = map(x,sliderStart,sliderEnd-w,255,0);
  fill(b);
  rect(sliderStart, 50, sliderEnd-sliderStart, 400);

  //2- line for slider beneath shape
  //line(100, 525, 500, 525);
  line(sliderStart, y + h / 2, sliderEnd, y + h / 2);

  //3- rectangle for slider
  fill(255);
  rect(x, y, w, h);
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
}let x = 0 //x coordinate where the line starts
let y = 0 //y coordinate where the line starts
let r = 30 //increment in angle increase

let o1 = 0
let o2 = 0

let buttonX = 150; //x coordinte of button square
let draggingX = false;
let offsetX = 0;

let buttonR = 150 // x coordinate for R button
let draggingR = false;
let offsetR = 0;



function setup() {
  createCanvas(600, 550);
  angleMode(DEGREES);

}
//Did I click on the button
function mousePressed() {
  if (mouseX > 150 && mouseX < 450 && mouseY > 420 && mouseY < 440) {
    draggingX = true;
    offsetX = buttonX - mouseX;
  }

  if (mouseX > 150 && mouseX < 450 && mouseY > 490 && mouseY < 510) {
    draggingR = true;
    offsetR = buttonR - mouseX;
  }
}

function mouseReleased() {
  draggingX = false;
  draggingR = false;
}

function draw() {
  background(255);

  line(150, 430, 450, 430); //slider line for x
  fill(0);
  rect(buttonX, 420, 20, 20); //slider button for x


  line(150, 500, 450, 500); //slider line for r
  fill(0);
  rect(buttonR, 490, 20, 20); //slider button for r

  //to ensure nothing happens when mouse is pressed and it goes beyond the range of slider
  if (mouseX > 450 || mouseX < 150) {
    draggingX = false;
  }

  if (mouseX > 450 || mouseX < 150) {
    draggingR = false;
  }

  if (draggingX) {
    buttonX = mouseX + offsetX;
  }
  if (draggingR) {
    buttonR = mouseX + offsetR;
  }

  var x = map(buttonX, 150, 430, 0, 40);
  var y = map(buttonX, 150, 430, 0, 40);
  var r = map(buttonR, 150, 430, 45, 90);

  buttonX = constrain(buttonX, 150, 430);
  buttonR = constrain(buttonR, 150, 430);

  // after Week 4 lesson, insert "let" before o1 and o2 here
  // then I don't have to declare up above as a global variable, right?
  for (o1 = 50; o1 <= 550 && o1 >= 50; o1 += 50) {
    for (o2 = 50; o2 <= 350 && o2 >= 50; o2 += 50) {
      push();
      translate(o1, o2);
      for (var a = 0; a <= 360; a += r) {
        rotate(a)
        line(x, y, 20, 20);

      }
      pop();
    }
  }
}




// amount of degrees
// amount of angle increment
// increasing and decreasing x and y
// length of line

// create a slider to adjust values x, y and end point of lines
// find out if (x,y) and (x1, y1) could be controlled using one slider?
// click on buttons to change line strokes of the design to random (within a given range)
//the whole canvas acting as a knob?let x = 0 //x coordinate where the line starts
let y = 0 //y coordinate where the line starts


let o1 = 0
let o2 = 0

let buttonX = 150; //x coordinte of button square
let dragging = false;
let offsetX = 0;



function setup() {
  createCanvas(600, 550);
  angleMode(DEGREES);

}
//Did I click on the button
function mousePressed() {
  if (mouseX > 150 && mouseX < 450 && mouseY > 420 && mouseY < 440) {
    dragging = true;
    offsetX = buttonX - mouseX;
  }
}

function mouseReleased() {
  dragging = false;
}

function draw() {
  background(255);

  line(150, 430, 450, 430); //slider line for x
  fill(0);
  rect(buttonX, 420, 20, 20); //slider button for x

  //to ensure nothing happens when mouse is pressed and it goes beyond the range of slider
  if (mouseX > 450 || mouseX < 150) { 
    dragging = false;
  }

  if (dragging) {
    buttonX = mouseX + offsetX;
  }

  var x = map(buttonX, 150, 430, 0, 28);
  var y = map(buttonX, 150, 430, 0, 28);

  buttonX = constrain(buttonX, 150, 430);

  for (o1 = 50; o1 <= 550 && o1 >= 50; o1 += 50) {
    for (o2 = 50; o2 <= 350 && o2 >= 50; o2 += 50) {
      push();
      translate(o1, o2);
      for (var a = 0; a <= 360; a += 45) {
        rotate(a)
			line(x, y, 20, 20);

      }
      pop();
    }
  }
}




// amount of degrees
// amount of angle rotation
// increasing and decreasing x and y
// length of line

// create a slider to adjust values x, y and end point of lines
// find out if (x,y) and (x1, y1) could be controlled using one slider?
// click on buttons to change line strokes of the design to random (within a given range)
//the whole canvas acting as a knob?let x = 0
let y = 0

let o1 = 0
let o2 = 0

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(255);

  for (o1 = 50; o1 <= 350 && o1 >= 50; o1 += 50) {
    for (o2 = 50; o2 <= 350 && o2 >= 50; o2 += 50) {
      push();
      translate(o1, o2);
      for (var a = 0; a <= 360; a += 45) {
        rotate(a)
        line(x, y, 20, 20);
      }
      pop();
    }
  }

  // amount of degrees
  // amount of angle rotation
  // increasing and decreasing x and y
  // length of line

  // create a slider to adjust values
  // click on buttons to change a value to random (within a given range)
}let x = 0
let y = 0

let o1 = 0
let o2 = 0


function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(255);

  // base shape
  //   translate(200, 200);
  //   for (var a = 0; a <= 360; a += 45) {
  //     rotate(a)
  //     line(x, y, 20, 20);
  //   }

  // can I write it out first?
  // how do I build a concentric ring of a group of radiating lines?
  // what if I build a nested loop with translate loop inside?
  // nested nested!

  for (o1 = 50; o1 <= 350 && o1 >= 50; o1 += 50) {
    for (o2 = 50; o2 <= 350 && o2 >= 50; o2 += 50) {
      push();
      translate(o1, o2);
      for (var a = 0; a <= 360; a += 45) {
        rotate(a)
        line(x, y, 20, 20);
      }
      pop();
    }
  }

  // woo hoo!
  // items to adjust: 
  // *amount of angle rotation
  // *adding to x and y
  // *length of line
  // *total degrees around which lines are radiating

}let x = 200;
let y = 200;

function setup() {
  createCanvas(400, 400);
  stroke(255);
}

function draw() {
  background(0, 0, 255);

  // origin circles
  for (var d = 0; d <= width/4; d = d + 25) {
    noFill();
    ellipse(x, y, d, d);
  }

  // second layer
  for (var d = 0; d < width / 2; d = d + 25) {
    noFill();
    ellipse(x - 50, y - 50, d, d);
  }

  for (var d = 0; d < width / 2; d = d + 25) {
    noFill();
    ellipse(x + 50, y + 50, d, d);
  }

  for (var d = 0; d < width / 2; d = d + 25) {
    noFill();
    ellipse(x + 50, y - 50, d, d);
  }

  for (var d = 0; d < width / 2; d = d + 25) {
    noFill();
    ellipse(x - 50, y + 50, d, d);
  }

  // third layer
  for (var d = 0; d < width / 4; d = d + 25) {
    noFill();
    ellipse(x, y + 125, d, d);
  }

  for (var d = 0; d < width / 4; d = d + 25) {
    noFill();
    ellipse(x + 125, y, d, d);
  }

  for (var d = 0; d < width / 4; d = d + 25) {
    noFill();
    ellipse(x, y - 125, d, d);
  }

  for (var d = 0; d < width / 4; d = d + 25) {
    noFill();
    ellipse(x - 125, y, d, d);
  }
}// grid with random colors

// a nested for loop

// ? how do I add an "exit condition" so that draw only draws once? 
// A: put it in a different function such as setup() or your own


function setup() {
  createCanvas(400, 400);

  for (var x = 0; x <= width; x = x + 20) {
    for (var y = 0; y <= height; y = y + 20) {
      fill(random(255), random(255), random(255));
      rect(x, y, 20, 20);
    }
  }
}

function draw() {
  //background(220);

  // for (var x = 0; x <= width; x = x+20) {
  //  for (var y = 0; y <= height-20; y = y+20) {
  //    fill(random(255), random(255), random(255));
  //    rect(x,y,20,20);
  //  }
  // }

}// Rectangle starts at location x
var x = 0;

function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(255);
  // Display object
  fill(0);
  rect(x, 100, 20, 20);

  // Increment x
  x = x+1;

 // if (x>100) {
 //   x = 100
 // }
   x = constrain(x, 0, 100);
}let r = 0
let b = 0
let g = 0

function setup() {
  createCanvas(600, 600);
  background(255);
}

function mousePressed() {
  r = random(0,255);
  b = random(0,255);
  g = random(0,255);
}

function draw() {
  fill(r,b,g);
  ellipse(mouseX,mouseY,30,30);

}let x = 0;
let y = 0;

let L1 = 50;
let L2 = 65

function setup() {
  createCanvas(400, 400);
  strokeWeight(2);
  stroke(0);
}

function draw() {
  background(255);

  //pinwheel
  push();
  translate(200, 200);
  for (var L1 = 50; L1 < width; L1 = L1 + 20) {
    fill(0, 5);
    triangle(x, y, x + L1, y, x + L1, y - L1); //small
    triangle(x, y, x, y - L1, x - L1, y - L1);
    triangle(x, y, x - L1, y, x - L1, y + L1);
    triangle(x, y, x, y + L1, x + L1, y + L1);
  }
  for (var L2 = 50; L2 < width; L2 = L2 + 20) {
    fill(40, 5);
    triangle(x, y, x + L2, y - L2, x, y - L2); //large
    triangle(x, y, x - L2, y - L2, x - L2, y);
    triangle(x, y, x - L2, y + L2, x, y + L2);
    triangle(x, y, x + L2, y + L2, x + L2, y);
  }
  pop();

  //pinwheel increase in size
  // L1=L1+.01;
  // L2=L2+.03;
}// loop concentric circles

let x = 200
let y = 200

function setup() {
  createCanvas(400, 400);
  strokeWeight(2);
  stroke(0);
}

function draw() {
  background(255);
  
  for (var d = 0; d < width; d = d + 40) {
  fill(0,40);
  ellipse(x, y, d, d);
  }
}// rollover and boolean

let x = 200
let y = 200
let s = 50
let state = false

function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (state) {
    background(0);
  } else {
    background(255);
  }
  rect(x, y, s, s);
}

function mousePressed() {
  if ((mouseX > x) && (mouseX < x + s) && (mouseY > y) && (mouseY < y + s)) {
    state = !state;
  }
}// rollover a square

let x = 200
let y = 200
let s = 50

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  // if ((mouseX > 200 && mouseX < 250) && (mouseY > 200 && mouseY < 250)) {
  if ((mouseX > x) && (mouseX < x+s) && (mouseY > y) && (mouseY < y+s)) {
    fill(0);
  } else {
    fill(255);
  }

  rect(x, y, s, s);

}let x = 0;
let y = 0;

let L1 = 50;
let L2 = 65

angle = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);

  //pinwheel
  push();
  translate(200, 200);
  rotate(angle);
  triangle(x, y, x + L1, y, x + L1, y - L1); //small
  triangle(x, y, x, y - L1, x - L1, y - L1); 
  triangle(x, y, x - L1, y, x - L1, y + L1); 
  triangle(x, y, x, y + L1, x + L1, y + L1); 
  
  triangle(x, y, x + L2, y - L2, x, y - L2); //large
  triangle(x, y, x - L2, y - L2, x - L2, y);
  triangle(x, y, x - L2, y + L2, x, y + L2);
  triangle(x, y, x + L2, y + L2, x + L2, y);
  pop();

  //pinwheel increase in size
  // L1=L1+.01;
  // L2=L2+.03;

  //rotate clockwhise
  angle = angle + .1;



}// From: http://10print.org/

var x = 0;
var y = 0;

function setup() {
  createCanvas(400, 400);
  background(255);
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
    y = 0;
  }
}let y = 0;
let speed = 0;
let gravity = 0.2; //not an actual real life measurement
let bouncing = false;

function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  bouncing = !bouncing;
} 

function draw() {
  background(220);

  ellipse(200, y, 20, 20);
  
  if (bouncing){
  y = y + speed;
  speed = speed + gravity;
  }

  //with gravity - NOT WORKING!
	if (y > 400){
		speed = -0.95 * speed;
	}
  
  //intial programming
  //if (y > 400) {
    //print("Y is at bottom"); 
    //background(255,0,0);
  //  speed = -5;
 // }

  //if (y < 0) {
  //  speed = 5;
  //}
  
  // more efficient programming
  // if(y > 400 || y < 0){
  //   // reverse the speed
  //   speed = -speed;     // same as speed = -1 * speed;
  }function setup() { 
  createCanvas(400, 400);
  
  noStroke();
  
  r = random(0,255);
  g = random(0,255);
  b = random(0,255);
  
  //transparency
  t1 = 200;

	//ellipse properties
	x = 20; //width & height
  t2 = 200;
  
} 

function draw() { 
  background(255);

  //draw rectangle on top of background
  fill(r, g, b, t1);
  rect(0, 0, 400, 400);
  t1 = map(mouseX, 0, 400, 50, 255);
  
	//draw growing ellipse
  t2 = map(mouseY, 0, 400, 50, 255);
  fill(r, g, b, t2);
  ellipse (200, 200, x, x);
  x = x+1;
  
}function setup() {
  createCanvas(460, 460);
  
  r1 = random(0,255);
  g1 = random(0,255);
  b1 = random(0,255);
  
  r2 = random(0,255);
  g2 = random(0,255);
  b2 = random(0,255);
  
  //portrait ellipses' properties
  w = 20
  h = 20
  t = 100 // transparency
  
  //center animated ellipse properties
  x = 20; // width & height
  t2 = 100; // transparency
  
  noStroke();
}

function draw() {
  background(r1, g1, b1);
  t = map(mouseX, 0, 400, 50, 255);
  
  //row 2
  fill(223, t);
  ellipse(160, 20, w, h);
  fill(194, t);
  ellipse(180, 20, w, h);
  fill(185, t);
  ellipse(200, 20, w, h);
  fill(134, t);
  ellipse(220, 20, w, h);
  fill(94, t);
  ellipse(240, 20, w, h);
  fill(109, t);
  ellipse(260, 20, w, h);
  fill(193, t);
  ellipse(280, 20, w, h);
  fill(243, t);
  ellipse(300, 20, w, h); //8 total ellipses on row 2
  //row 3
  fill(193, t);
  ellipse(140, 40, w, h);
  fill(141, t);
  ellipse(160, 40, w, h);
  fill(167, t);
  ellipse(180, 40, w, h);
  fill(164, t);
  ellipse(200, 40, w, h);
  fill(134, t);
  ellipse(220, 40, w, h);
  fill(85, t);
  ellipse(240, 40, w, h);
  fill(61, t);
  ellipse(260, 40, w, h);
  fill(58, t);
  ellipse(280, 40, w, h);
  fill(156, t);
  ellipse(300, 40, w, h);
  fill(233, t);
  ellipse(320, 40, w, h); //10 total ellipses on row 3
  //row 4
  fill(192, t);
  ellipse(120, 60, w, h);
  fill(120, t);
  ellipse(140, 60, w, h);
  fill(127, t);
  ellipse(160, 60, w, h);
  fill(151, t);
  ellipse(180, 60, w, h);
  fill(149, t);
  ellipse(200, 60, w, h);
  fill(141, t);
  ellipse(220, 60, w, h);
  fill(130, t);
  ellipse(240, 60, w, h);
  fill(85, t);
  ellipse(260, 60, w, h);
  fill(71, t);
  ellipse(280, 60, w, h);
  fill(106, t);
  ellipse(300, 60, w, h);
  fill(149, t);
  ellipse(320, 60, w, h);
  fill(233, t);
  ellipse(340, 60, w, h); //12 total ellipses on row 4
  //row 5
  fill(217, t);
  ellipse(100, 80, w, h);
  fill(112, t);
  ellipse(120, 80, w, h);
  fill(84, t);
  ellipse(140, 80, w, h);
  fill(80, t);
  ellipse(160, 80, w, h);
  fill(80, t);
  ellipse(180, 80, w, h);
  fill(120, t);
  ellipse(200, 80, w, h);
  fill(124, t);
  ellipse(220, 80, w, h);
  fill(110, t);
  ellipse(240, 80, w, h);
  fill(131, t);
  ellipse(260, 80, w, h);
  fill(98, t);
  ellipse(280, 80, w, h);
  fill(116, t);
  ellipse(300, 80, w, h);
  fill(100, t);
  ellipse(320, 80, w, h);
  fill(151, t);
  ellipse(340, 80, w, h); //13 total ellipses on row 5
  //row 6
  fill(239, t);
  ellipse(80, 100, w, h);
  fill(125, t);
  ellipse(100, 100, w, h);
  fill(66, t);
  ellipse(120, 100, w, h);
  fill(54, t);
  ellipse(140, 100, w, h);
  fill(36, t);
  ellipse(160, 100, w, h);
  fill(61, t);
  ellipse(180, 100, w, h);
  fill(50, t);
  ellipse(200, 100, w, h);
  fill(46, t);
  ellipse(220, 100, w, h);
  fill(86, t);
  ellipse(240, 100, w, h);
  fill(107, t);
  ellipse(260, 100, w, h);
  fill(99, t);
  ellipse(280, 100, w, h);
  fill(81, t);
  ellipse(300, 100, w, h);
  fill(62, t);
  ellipse(320, 100, w, h);
  fill(62, t);
  ellipse(340, 100, w, h);
  fill(240, t);
  ellipse(360, 100, w, h); //15 total ellipses on row 6
  //row 7
  fill(200, t);
  ellipse(80, 120, w, h);
  fill(71, t);
  ellipse(100, 120, w, h);
  fill(42, t);
  ellipse(120, 120, w, h);
  fill(18, t);
  ellipse(140, 120, w, h);
  fill(34, t);
  ellipse(160, 120, w, h);
  fill(24, t);
  ellipse(180, 120, w, h);
  fill(11, t);
  ellipse(200, 120, w, h);
  fill(23, t);
  ellipse(220, 120, w, h);
  fill(22, t);
  ellipse(240, 120, w, h);
  fill(52, t);
  ellipse(260, 120, w, h);
  fill(90, t);
  ellipse(280, 120, w, h);
  fill(61, t);
  ellipse(300, 120, w, h);
  fill(22, t);
  ellipse(320, 120, w, h);
  fill(28, t);
  ellipse(340, 120, w, h);
  fill(192, t);
  ellipse(360, 120, w, h); //15 total ellipses on row 7
  //row 8
  fill(128, t);
  ellipse(80, 140, w, h);
  fill(46, t);
  ellipse(100, 140, w, h);
  fill(30, t);
  ellipse(120, 140, w, h);
  fill(27, t);
  ellipse(140, 140, w, h);
  fill(17, t);
  ellipse(160, 140, w, h);
  fill(12, t);
  ellipse(180, 140, w, h);
  fill(14, t);
  ellipse(200, 140, w, h);
  fill(14, t);
  ellipse(220, 140, w, h);
  fill(41, t);
  ellipse(240, 140, w, h);
  fill(80, t);
  ellipse(260, 140, w, h);
  fill(132, t);
  ellipse(280, 140, w, h);
  fill(97, t);
  ellipse(300, 140, w, h);
  fill(18, t);
  ellipse(320, 140, w, h);
  fill(15, t);
  ellipse(340, 140, w, h);
  fill(129, t);
  ellipse(360, 140, w, h); //15 total ellipses on row 8
  //row 9
  fill(228, t);
  ellipse(60, 160, w, h);
  fill(82, t);
  ellipse(80, 160, w, h);
  fill(46, t);
  ellipse(100, 160, w, h);
  fill(24, t);
  ellipse(120, 160, w, h);
  fill(20, t);
  ellipse(140, 160, w, h);
  fill(65, t);
  ellipse(160, 160, w, h);
  fill(130, t);
  ellipse(180, 160, w, h);
  fill(172, t);
  ellipse(200, 160, w, h);
  fill(170, t);
  ellipse(220, 160, w, h);
  fill(156, t);
  ellipse(240, 160, w, h);
  fill(153, t);
  ellipse(260, 160, w, h);
  fill(171, t);
  ellipse(280, 160, w, h);
  fill(144, t);
  ellipse(300, 160, w, h);
  fill(32, t);
  ellipse(320, 160, w, h);
  fill(12, t);
  ellipse(340, 160, w, h);
  fill(66, t);
  ellipse(360, 160, w, h);
  fill(240, t);
  ellipse(380, 160, w, h); //17 total ellipses on row 9
  //row 10
  fill(175, t);
  ellipse(60, 180, w, h);
  fill(46, t);
  ellipse(80, 180, w, h);
  fill(58, t);
  ellipse(100, 180, w, h);
  fill(21, t);
  ellipse(120, 180, w, h);
  fill(88, t);
  ellipse(140, 180, w, h);
  fill(129, t);
  ellipse(160, 180, w, h);
  fill(111, t);
  ellipse(180, 180, w, h);
  fill(64, t);
  ellipse(200, 180, w, h);
  fill(107, t);
  ellipse(220, 180, w, h);
  fill(172, t);
  ellipse(240, 180, w, h);
  fill(147, t);
  ellipse(260, 180, w, h);
  fill(95, t);
  ellipse(280, 180, w, h);
  fill(96, t);
  ellipse(300, 180, w, h);
  fill(108, t);
  ellipse(320, 180, w, h);
  fill(22, t);
  ellipse(340, 180, w, h);
  fill(28, t);
  ellipse(360, 180, w, h);
  fill(177, t);
  ellipse(380, 180, w, h); //17 total ellipses on row 10
  //row 11
  fill(113, t);
  ellipse(60, 200, w, h);
  fill(45, t);
  ellipse(80, 200, w, h);
  fill(49, t);
  ellipse(100, 200, w, h);
  fill(44, t);
  ellipse(120, 200, w, h);
  fill(142, t);
  ellipse(140, 200, w, h);
  fill(87, t);
  ellipse(160, 200, w, h);
  fill(62, t);
  ellipse(180, 200, w, h);
  fill(95, t);
  ellipse(200, 200, w, h);
  fill(102, t);
  ellipse(220, 200, w, h);
  fill(195, t);
  ellipse(240, 200, w, h);
  fill(112, t);
  ellipse(260, 200, w, h);
  fill(56, t);
  ellipse(280, 200, w, h);
  fill(61, t);
  ellipse(300, 200, w, h);
  fill(81, t);
  ellipse(320, 200, w, h);
  fill(41, t);
  ellipse(340, 200, w, h);
  fill(33, t);
  ellipse(360, 200, w, h);
  fill(117, t);
  ellipse(380, 200, w, h);
  fill(242, t);
  ellipse(400, 200, w, h); //18 total ellipses on row 11
  //row 12
  fill(234, t);
  ellipse(40, 220, w, h);
  fill(68, t);
  ellipse(60, 220, w, h);
  fill(36, t);
  ellipse(80, 220, w, h);
  fill(39, t);
  ellipse(100, 220, w, h);
  fill(86, t);
  ellipse(120, 220, w, h);
  fill(189, t);
  ellipse(140, 220, w, h);
  fill(176, t);
  ellipse(160, 220, w, h);
  fill(138, t);
  ellipse(180, 220, w, h);
  fill(174, t);
  ellipse(200, 220, w, h);
  fill(204, t);
  ellipse(220, 220, w, h);
  fill(212, t);
  ellipse(240, 220, w, h);
  fill(179, t);
  ellipse(260, 220, w, h);
  fill(150, t);
  ellipse(280, 220, w, h);
  fill(109, t);
  ellipse(300, 220, w, h);
  fill(120, t);
  ellipse(320, 220, w, h);
  fill(77, t);
  ellipse(340, 220, w, h);
  fill(75, t);
  ellipse(360, 220, w, h);
  fill(89, t);
  ellipse(380, 220, w, h);
  fill(234, t);
  ellipse(400, 220, w, h); //19 total ellipses on row 12
  //row 13
  fill(212, t);
  ellipse(40, 240, w, h);
  fill(48, t);
  ellipse(60, 240, w, h);
  fill(22, t);
  ellipse(80, 240, w, h);
  fill(32, t);
  ellipse(100, 240, w, h);
  fill(59, t);
  ellipse(120, 240, w, h);
  fill(173, t);
  ellipse(140, 240, w, h);
  fill(217, t);
  ellipse(160, 240, w, h);
  fill(226, t);
  ellipse(180, 240, w, h);
  fill(221, t);
  ellipse(200, 240, w, h);
  fill(200, t);
  ellipse(220, 240, w, h);
  fill(226, t);
  ellipse(240, 240, w, h);
  fill(199, t);
  ellipse(260, 240, w, h);
  fill(205, t);
  ellipse(280, 240, w, h);
  fill(200, t);
  ellipse(300, 240, w, h);
  fill(189, t);
  ellipse(320, 240, w, h);
  fill(86, t);
  ellipse(340, 240, w, h);
  fill(57, t);
  ellipse(360, 240, w, h);
  fill(65, t);
  ellipse(380, 240, w, h);
  fill(217, t);
  ellipse(400, 240, w, h); //19 total ellipses on row 13
  //row 14
  fill(203, t);
  ellipse(40, 260, w, h);
  fill(27, t);
  ellipse(60, 260, w, h);
  fill(16, t);
  ellipse(80, 260, w, h);
  fill(26, t);
  ellipse(100, 260, w, h);
  fill(29, t);
  ellipse(120, 260, w, h);
  fill(132, t);
  ellipse(140, 260, w, h);
  fill(193, t);
  ellipse(160, 260, w, h);
  fill(206, t);
  ellipse(180, 260, w, h);
  fill(184, t);
  ellipse(200, 260, w, h);
  fill(156, t);
  ellipse(220, 260, w, h);
  fill(168, t);
  ellipse(240, 260, w, h);
  fill(149, t);
  ellipse(260, 260, w, h);
  fill(182, t);
  ellipse(280, 260, w, h);
  fill(200, t);
  ellipse(300, 260, w, h);
  fill(174, t);
  ellipse(320, 260, w, h);
  fill(61, t);
  ellipse(340, 260, w, h);
  fill(31, t);
  ellipse(360, 260, w, h);
  fill(37, t);
  ellipse(380, 260, w, h);
  fill(194, t);
  ellipse(400, 260, w, h); //19 total ellipses on row 14
  //row 15
  fill (168, t);
  ellipse(40, 280, w, h);
  fill(22, t);
  ellipse(60, 280, w, h);
  fill(24, t);
  ellipse(80, 280, w, h);
  fill(25, t);
  ellipse(100, 280, w, h);
  fill(23, t);
  ellipse(120, 280, w, h);
  fill(106, t);
  ellipse(140, 280, w, h);
  fill(160, t);
  ellipse(160, 280, w, h);
  fill(171, t);
  ellipse(180, 280, w, h);
  fill(203, t);
  ellipse(200, 280, w, h);
  fill(155, t);
  ellipse(220, 280, w, h);
  fill(93, t);
  ellipse(240, 280, w, h);
  fill(92, t);
  ellipse(260, 280, w, h);
  fill(179, t);
  ellipse(280, 280, w, h);
  fill(160, t);
  ellipse(300, 280, w, h);
  fill(119, t);
  ellipse(320, 280, w, h);
  fill(31, t);
  ellipse(340, 280, w, h);
  fill(24, t);
  ellipse(360, 280, w, h);
  fill(34, t);
  ellipse(380, 280, w, h);
  fill(180, t);
  ellipse(400, 280, w, h); //19 total ellipses on row 15
  //row 16
  fill(159, t);
  ellipse(40, 300, w, h);
  fill(26, t);
  ellipse(60, 300, w, h);
  fill(31, t);
  ellipse(80, 300, w, h);
  fill(26, t);
  ellipse(100, 300, w, h);
  fill(25, t);
  ellipse(120, 300, w, h);
  fill(115, t);
  ellipse(140, 300, w, h);
  fill(143, t);
  ellipse(160, 300, w, h);
  fill(157, t);
  ellipse(180, 300, w, h);
  fill(151, t);
  ellipse(200, 300, w, h);
  fill(128, t);
  ellipse(220, 300, w, h);
  fill(112, t);
  ellipse(240, 300, w, h);
  fill(109, t);
  ellipse(260, 300, w, h);
  fill(141, t);
  ellipse(280, 300, w, h);
  fill(132, t);
  ellipse(300, 300, w, h);
  fill(76, t);
  ellipse(320, 300, w, h);
  fill(29, t);
  ellipse(340, 300, w, h);
  fill(17, t);
  ellipse(360, 300, w, h);
  fill(31, t);
  ellipse(380, 300, w, h);
  fill(170, t);
  ellipse(400, 300, w, h); //19 total ellipses on row 16
  //row 17
  fill(157, t);
  ellipse(40, 320, w, h);
  fill(40, t);
  ellipse(60, 320, w, h);
  fill(38, t);
  ellipse(80, 320, w, h);
  fill(22, t);
  ellipse(100, 320, w, h);
  fill(24, t);
  ellipse(120, 320, w, h);
  fill(85, t);
  ellipse(140, 320, w, h);
  fill(142, t);
  ellipse(160, 320, w, h);
  fill(151, t);
  ellipse(180, 320, w, h);
  fill(110, t);
  ellipse(200, 320, w, h);
  fill(118, t);
  ellipse(220, 320, w, h);
  fill(138, t);
  ellipse(240, 320, w, h);
  fill(107, t);
  ellipse(260, 320, w, h);
  fill(97, t);
  ellipse(280, 320, w, h);
  fill(126, t);
  ellipse(300, 320, w, h);
  fill(50, t);
  ellipse(320, 320, w, h);
  fill(22, t);
  ellipse(340, 320, w, h);
  fill(16, t);
  ellipse(360, 320, w, h);
  fill(28, t);
  ellipse(380, 320, w, h);
  fill(157, t);
  ellipse(400, 320, w, h); //19 total ellipses on row 17
  //row 18
  fill(171, t);
  ellipse(40, 340, w, h);
  fill(50, t);
  ellipse(60, 340, w, h);
  fill(24, t);
  ellipse(80, 340, w, h);
  fill(24, t);
  ellipse(100, 340, w, h);
  fill(19, t);
  ellipse(120, 340, w, h);
  fill(27, t);
  ellipse(140, 340, w, h);
  fill(114, t);
  ellipse(160, 340, w, h);
  fill(146, t);
  ellipse(180, 340, w, h);
  fill(138, t);
  ellipse(200, 340, w, h);
  fill(104, t);
  ellipse(220, 340, w, h);
  fill(99, t);
  ellipse(240, 340, w, h);
  fill(94, t);
  ellipse(260, 340, w, h);
  fill(130, t);
  ellipse(280, 340, w, h);
  fill(105, t);
  ellipse(300, 340, w, h);
  fill(26, t);
  ellipse(320, 340, w, h);
  fill(19, t);
  ellipse(340, 340, w, h);
  fill(24, t);
  ellipse(360, 340, w, h);
  fill(45, t);
  ellipse(380, 340, w, h);
  fill(218, t);
  ellipse(400, 340, w, h); //19 total ellipses on row 18
  //row 19
  fill(145, t);
  ellipse(40, 360, w, h);
  fill(44, t);
  ellipse(60, 360, w, h);
  fill(20, t);
  ellipse(80, 360, w, h);
  fill(18, t);
  ellipse(100, 360, w, h);
  fill(19, t);
  ellipse(120, 360, w, h);
  fill(24, t);
  ellipse(140, 360, w, h);
  fill(58, t);
  ellipse(160, 360, w, h);
  fill(115, t);
  ellipse(180, 360, w, h);
  fill(169, t);
  ellipse(200, 360, w, h);
  fill(173, t);
  ellipse(220, 360, w, h);
  fill(170, t);
  ellipse(240, 360, w, h);
  fill(152, t);
  ellipse(260, 360, w, h);
  fill(123, t);
  ellipse(280, 360, w, h);
  fill(34, t);
  ellipse(300, 360, w, h);
  fill(18, t);
  ellipse(320, 360, w, h);
  fill(19, t);
  ellipse(340, 360, w, h);
  fill(31, t);
  ellipse(360, 360, w, h);
  fill(119, t);
  ellipse(380, 360, w, h);
  fill(234, t);
  ellipse(400, 360, w, h); //19 total ellipses on row 19
  //row 20
  fill(209, t);
  ellipse(40, 380, w, h);
  fill(93, t);
  ellipse(60, 380, w, h);
  fill(20, t);
  ellipse(80, 380, w, h);
  fill(17, t);
  ellipse(100, 380, w, h);
  fill(31, t);
  ellipse(120, 380, w, h);
  fill(37, t);
  ellipse(140, 380, w, h);
  fill(63, t);
  ellipse(160, 380, w, h);
  fill(66, t);
  ellipse(180, 380, w, h);
  fill(93, t);
  ellipse(200, 380, w, h);
  fill(113, t);
  ellipse(220, 380, w, h);
  fill(109, t);
  ellipse(240, 380, w, h);
  fill(101, t);
  ellipse(260, 380, w, h);
  fill(67, t);
  ellipse(280, 380, w, h);
  fill(17, t);
  ellipse(300, 380, w, h);
  fill(17, t);
  ellipse(320, 380, w, h);
  fill(28, t);
  ellipse(340, 380, w, h);
  fill(41, t);
  ellipse(360, 380, w, h);
  fill(140, t);
  ellipse(380, 380, w, h);
  fill(241, t);
  ellipse(400, 380, w, h); //19 total ellipses on row 20
  //row 21
  fill(219, t);
  ellipse(60, 400, w, h);
  fill(121, t);
  ellipse(80, 400, w, h);
  fill(48, t);
  ellipse(100, 400, w, h);
  fill(35, t);
  ellipse(120, 400, w, h);
  fill(50, t);
  ellipse(140, 400, w, h);
  fill(72, t);
  ellipse(160, 400, w, h);
  fill(80, t);
  ellipse(180, 400, w, h);
  fill(82, t);
  ellipse(200, 400, w, h);
  fill(88, t);
  ellipse(220, 400, w, h);
  fill(89, t);
  ellipse(240, 400, w, h);
  fill(86, t);
  ellipse(260, 400, w, h);
  fill(73, t);
  ellipse(280, 400, w, h);
  fill(24, t);
  ellipse(300, 400, w, h);
  fill(18, t);
  ellipse(320, 400, w, h);
  fill(35, t);
  ellipse(340, 400, w, h);
  fill(42, t);
  ellipse(360, 400, w, h);
  fill(193, t);
  ellipse(380, 400, w, h); //17 total ellipses on row 21
  //row 22
  fill(197, t);
  ellipse(60, 420, w, h);
  fill(112, t);
  ellipse(80, 420, w, h);
  fill(94, t);
  ellipse(100, 420, w, h);
  fill(70, t);
  ellipse(120, 420, w, h);
  fill(66, t);
  ellipse(140, 420, w, h);
  fill(85, t);
  ellipse(160, 420, w, h);
  fill(93, t);
  ellipse(180, 420, w, h);
  fill(100, t);
  ellipse(200, 420, w, h);
  fill(98, t);
  ellipse(220, 420, w, h);
  fill(93, t);
  ellipse(240, 420, w, h);
  fill(95, t);
  ellipse(260, 420, w, h);
  fill(85, t);
  ellipse(280, 420, w, h);
  fill(52, t);
  ellipse(300, 420, w, h);
  fill(53, t);
  ellipse(320, 420, w, h);
  fill(17, t);
  ellipse(340, 420, w, h);
  fill(20, t);
  ellipse(360, 420, w, h);
  fill(51, t);
  ellipse(380, 420, w, h);
  fill(141, t);
  ellipse(400, 420, w, h);
  fill(204, t);
  ellipse(420, 420, w, h);
  fill(240, t);
  ellipse(440, 420, w, h); //20 total ellipses on row 22
  //row 23
  fill(235, t);
  ellipse(0, 440, w, h);
  fill(181, t);
  ellipse(20, 440, w, h);
  fill(102, t);
  ellipse(40, 440, w, h);
  fill(47, t);
  ellipse(60, 440, w, h);
  fill(33, t);
  ellipse(80, 440, w, h);
  fill(128, t);
  ellipse(100, 440, w, h);
  fill(92, t);
  ellipse(120, 440, w, h);
  fill(91, t);
  ellipse(140, 440, w, h);
  fill(96, t);
  ellipse(160, 440, w, h);
  fill(107, t);
  ellipse(180, 440, w, h);
  fill(107, t);
  ellipse(200, 440, w, h);
  fill(105, t);
  ellipse(220, 440, w, h);
  fill(105, t);
  ellipse(240, 440, w, h);
  fill(105, t);
  ellipse(260, 440, w, h);
  fill(111, t);
  ellipse(280, 440, w, h);
  fill(128, t);
  ellipse(300, 440, w, h);
  fill(138, t);
  ellipse(320, 440, w, h);
  fill(46, t);
  ellipse(340, 440, w, h);
  fill(34, t);
  ellipse(360, 440, w, h);
  fill(42, t);
  ellipse(380, 440, w, h);
  fill(60, t);
  ellipse(400, 440, w, h);
  fill(74, t);
  ellipse(420, 440, w, h);
  fill(108, t);
  ellipse(440, 440, w, h); //23 total ellipses on row 23 
  // 371 ellipses total!
  
  //growing ellipse
  fill (r2, g2, b2, t2);
  ellipse (230, 230, x, x);
  t2 = map(mouseY, 0, 400, 50, 255);
  
  x = x+1;
}function setup() {
  createCanvas(460, 460);
  noStroke();
}

function draw() {
  background(240);
  //row 2
  fill(223);
  ellipse(160, 20, 20, 20);
  fill(194);
  ellipse(180, 20, 20, 20);
  fill(185);
  ellipse(200, 20, 20, 20);
  fill(134);
  ellipse(220, 20, 20, 20);
  fill(94);
  ellipse(240, 20, 20, 20);
  fill(109);
  ellipse(260, 20, 20, 20);
  fill(193);
  ellipse(280, 20, 20, 20);
  fill(243);
  ellipse(300, 20, 20, 20); //8 total ellipses on row 2
  //row 3
  fill(193);
  ellipse(140, 40, 20, 20);
  fill(141);
  ellipse(160, 40, 20, 20);
  fill(167);
  ellipse(180, 40, 20, 20);
  fill(164);
  ellipse(200, 40, 20, 20);
  fill(134);
  ellipse(220, 40, 20, 20);
  fill(85);
  ellipse(240, 40, 20, 20);
  fill(61);
  ellipse(260, 40, 20, 20);
  fill(58);
  ellipse(280, 40, 20, 20);
  fill(156);
  ellipse(300, 40, 20, 20);
  fill(233);
  ellipse(320, 40, 20, 20); //10 total ellipses on row 3
  //row 4
  fill(192);
  ellipse(120, 60, 20, 20);
  fill(120);
  ellipse(140, 60, 20, 20);
  fill(127);
  ellipse(160, 60, 20, 20);
  fill(151);
  ellipse(180, 60, 20, 20);
  fill(149);
  ellipse(200, 60, 20, 20);
  fill(141);
  ellipse(220, 60, 20, 20);
  fill(130);
  ellipse(240, 60, 20, 20);
  fill(85);
  ellipse(260, 60, 20, 20);
  fill(71);
  ellipse(280, 60, 20, 20);
  fill(106);
  ellipse(300, 60, 20, 20);
  fill(149);
  ellipse(320, 60, 20, 20);
  fill(233);
  ellipse(340, 60, 20, 20); //12 total ellipses on row 4
  //row 5
  fill(217);
  ellipse(100, 80, 20, 20);
  fill(112);
  ellipse(120, 80, 20, 20);
  fill(84);
  ellipse(140, 80, 20, 20);
  fill(80);
  ellipse(160, 80, 20, 20);
  fill(80);
  ellipse(180, 80, 20, 20);
  fill(120);
  ellipse(200, 80, 20, 20);
  fill(124);
  ellipse(220, 80, 20, 20);
  fill(110);
  ellipse(240, 80, 20, 20);
  fill(131);
  ellipse(260, 80, 20, 20);
  fill(98);
  ellipse(280, 80, 20, 20);
  fill(116);
  ellipse(300, 80, 20, 20);
  fill(100);
  ellipse(320, 80, 20, 20);
  fill(151);
  ellipse(340, 80, 20, 20); //13 total ellipses on row 5
  //row 6
  fill(239);
  ellipse(80, 100, 20, 20);
  fill(125);
  ellipse(100, 100, 20, 20);
  fill(66);
  ellipse(120, 100, 20, 20);
  fill(54);
  ellipse(140, 100, 20, 20);
  fill(36);
  ellipse(160, 100, 20, 20);
  fill(61);
  ellipse(180, 100, 20, 20);
  fill(50);
  ellipse(200, 100, 20, 20);
  fill(46);
  ellipse(220, 100, 20, 20);
  fill(86);
  ellipse(240, 100, 20, 20);
  fill(107);
  ellipse(260, 100, 20, 20);
  fill(99);
  ellipse(280, 100, 20, 20);
  fill(81);
  ellipse(300, 100, 20, 20);
  fill(62);
  ellipse(320, 100, 20, 20);
  fill(62);
  ellipse(340, 100, 20, 20);
  fill(240);
  ellipse(360, 100, 20, 20); //15 total ellipses on row 6
  //row 7
  fill(200);
  ellipse(80, 120, 20, 20);
  fill(71);
  ellipse(100, 120, 20, 20);
  fill(42);
  ellipse(120, 120, 20, 20);
  fill(18);
  ellipse(140, 120, 20, 20);
  fill(34);
  ellipse(160, 120, 20, 20);
  fill(24);
  ellipse(180, 120, 20, 20);
  fill(11);
  ellipse(200, 120, 20, 20);
  fill(23);
  ellipse(220, 120, 20, 20);
  fill(22);
  ellipse(240, 120, 20, 20);
  fill(52);
  ellipse(260, 120, 20, 20);
  fill(90);
  ellipse(280, 120, 20, 20);
  fill(61);
  ellipse(300, 120, 20, 20);
  fill(22);
  ellipse(320, 120, 20, 20);
  fill(28);
  ellipse(340, 120, 20, 20);
  fill(192);
  ellipse(360, 120, 20, 20); //15 total ellipses on row 7
  //row 8
  fill(128);
  ellipse(80, 140, 20, 20);
  fill(46);
  ellipse(100, 140, 20, 20);
  fill(30);
  ellipse(120, 140, 20, 20);
  fill(27);
  ellipse(140, 140, 20, 20);
  fill(17);
  ellipse(160, 140, 20, 20);
  fill(12);
  ellipse(180, 140, 20, 20);
  fill(14);
  ellipse(200, 140, 20, 20);
  fill(14);
  ellipse(220, 140, 20, 20);
  fill(41);
  ellipse(240, 140, 20, 20);
  fill(80);
  ellipse(260, 140, 20, 20);
  fill(132);
  ellipse(280, 140, 20, 20);
  fill(97);
  ellipse(300, 140, 20, 20);
  fill(18);
  ellipse(320, 140, 20, 20);
  fill(15);
  ellipse(340, 140, 20, 20);
  fill(129);
  ellipse(360, 140, 20, 20); //15 total ellipses on row 8
  //row 9
  fill(228);
  ellipse(60, 160, 20, 20);
  fill(82);
  ellipse(80, 160, 20, 20);
  fill(46);
  ellipse(100, 160, 20, 20);
  fill(24);
  ellipse(120, 160, 20, 20);
  fill(20);
  ellipse(140, 160, 20, 20);
  fill(65);
  ellipse(160, 160, 20, 20);
  fill(130);
  ellipse(180, 160, 20, 20);
  fill(172);
  ellipse(200, 160, 20, 20);
  fill(170);
  ellipse(220, 160, 20, 20);
  fill(156);
  ellipse(240, 160, 20, 20);
  fill(153);
  ellipse(260, 160, 20, 20);
  fill(171);
  ellipse(280, 160, 20, 20);
  fill(144);
  ellipse(300, 160, 20, 20);
  fill(32);
  ellipse(320, 160, 20, 20);
  fill(12);
  ellipse(340, 160, 20, 20);
  fill(66);
  ellipse(360, 160, 20, 20);
  fill(240);
  ellipse(380, 160, 20, 20); //17 total ellipses on row 9
  //row 10
  fill(175);
  ellipse(60, 180, 20, 20);
  fill(46);
  ellipse(80, 180, 20, 20);
  fill(58);
  ellipse(100, 180, 20, 20);
  fill(21);
  ellipse(120, 180, 20, 20);
  fill(88);
  ellipse(140, 180, 20, 20);
  fill(129);
  ellipse(160, 180, 20, 20);
  fill(111);
  ellipse(180, 180, 20, 20);
  fill(64);
  ellipse(200, 180, 20, 20);
  fill(107);
  ellipse(220, 180, 20, 20);
  fill(172);
  ellipse(240, 180, 20, 20);
  fill(147);
  ellipse(260, 180, 20, 20);
  fill(95);
  ellipse(280, 180, 20, 20);
  fill(96);
  ellipse(300, 180, 20, 20);
  fill(108);
  ellipse(320, 180, 20, 20);
  fill(22);
  ellipse(340, 180, 20, 20);
  fill(28);
  ellipse(360, 180, 20, 20);
  fill(177);
  ellipse(380, 180, 20, 20); //17 total ellipses on row 10
  //row 11
  fill(113);
  ellipse(60, 200, 20, 20);
  fill(45);
  ellipse(80, 200, 20, 20);
  fill(49);
  ellipse(100, 200, 20, 20);
  fill(44);
  ellipse(120, 200, 20, 20);
  fill(142);
  ellipse(140, 200, 20, 20);
  fill(87);
  ellipse(160, 200, 20, 20);
  fill(62);
  ellipse(180, 200, 20, 20);
  fill(95);
  ellipse(200, 200, 20, 20);
  fill(102);
  ellipse(220, 200, 20, 20);
  fill(195);
  ellipse(240, 200, 20, 20);
  fill(112);
  ellipse(260, 200, 20, 20);
  fill(56);
  ellipse(280, 200, 20, 20);
  fill(61);
  ellipse(300, 200, 20, 20);
  fill(81);
  ellipse(320, 200, 20, 20);
  fill(41);
  ellipse(340, 200, 20, 20);
  fill(33);
  ellipse(360, 200, 20, 20);
  fill(117);
  ellipse(380, 200, 20, 20);
  fill(242);
  ellipse(400, 200, 20, 20); //18 total ellipses on row 11
  //row 12
  fill(234);
  ellipse(40, 220, 20, 20);
  fill(68);
  ellipse(60, 220, 20, 20);
  fill(36);
  ellipse(80, 220, 20, 20);
  fill(39);
  ellipse(100, 220, 20, 20);
  fill(86);
  ellipse(120, 220, 20, 20);
  fill(189);
  ellipse(140, 220, 20, 20);
  fill(176);
  ellipse(160, 220, 20, 20);
  fill(138);
  ellipse(180, 220, 20, 20);
  fill(174);
  ellipse(200, 220, 20, 20);
  fill(204);
  ellipse(220, 220, 20, 20);
  fill(212);
  ellipse(240, 220, 20, 20);
  fill(179);
  ellipse(260, 220, 20, 20);
  fill(150);
  ellipse(280, 220, 20, 20);
  fill(109);
  ellipse(300, 220, 20, 20);
  fill(120);
  ellipse(320, 220, 20, 20);
  fill(77);
  ellipse(340, 220, 20, 20);
  fill(75);
  ellipse(360, 220, 20, 20);
  fill(89);
  ellipse(380, 220, 20, 20);
  fill(234);
  ellipse(400, 220, 20, 20); //19 total ellipses on row 12
  //row 13
  fill(212);
  ellipse(40, 240, 20, 20);
  fill(48);
  ellipse(60, 240, 20, 20);
  fill(22);
  ellipse(80, 240, 20, 20);
  fill(32);
  ellipse(100, 240, 20, 20);
  fill(59);
  ellipse(120, 240, 20, 20);
  fill(173);
  ellipse(140, 240, 20, 20);
  fill(217);
  ellipse(160, 240, 20, 20);
  fill(226);
  ellipse(180, 240, 20, 20);
  fill(221);
  ellipse(200, 240, 20, 20);
  fill(200);
  ellipse(220, 240, 20, 20);
  fill(226);
  ellipse(240, 240, 20, 20);
  fill(199);
  ellipse(260, 240, 20, 20);
  fill(205);
  ellipse(280, 240, 20, 20);
  fill(200);
  ellipse(300, 240, 20, 20);
  fill(189);
  ellipse(320, 240, 20, 20);
  fill(86);
  ellipse(340, 240, 20, 20);
  fill(57);
  ellipse(360, 240, 20, 20);
  fill(65);
  ellipse(380, 240, 20, 20);
  fill(217);
  ellipse(400, 240, 20, 20); //19 total ellipses on row 13
  //row 14
  fill(203);
  ellipse(40, 260, 20, 20);
  fill(27);
  ellipse(60, 260, 20, 20);
  fill(16);
  ellipse(80, 260, 20, 20);
  fill(26);
  ellipse(100, 260, 20, 20);
  fill(29);
  ellipse(120, 260, 20, 20);
  fill(132);
  ellipse(140, 260, 20, 20);
  fill(193);
  ellipse(160, 260, 20, 20);
  fill(206);
  ellipse(180, 260, 20, 20);
  fill(184);
  ellipse(200, 260, 20, 20);
  fill(156);
  ellipse(220, 260, 20, 20);
  fill(168);
  ellipse(240, 260, 20, 20);
  fill(149);
  ellipse(260, 260, 20, 20);
  fill(182);
  ellipse(280, 260, 20, 20);
  fill(200);
  ellipse(300, 260, 20, 20);
  fill(174);
  ellipse(320, 260, 20, 20);
  fill(61);
  ellipse(340, 260, 20, 20);
  fill(31);
  ellipse(360, 260, 20, 20);
  fill(37);
  ellipse(380, 260, 20, 20);
  fill(194);
  ellipse(400, 260, 20, 20); //19 total ellipses on row 14
  //row 15
  ellipse(40, 280, 20, 20);
  fill(22);
  ellipse(60, 280, 20, 20);
  fill(24);
  ellipse(80, 280, 20, 20);
  fill(25);
  ellipse(100, 280, 20, 20);
  fill(23);
  ellipse(120, 280, 20, 20);
  fill(106);
  ellipse(140, 280, 20, 20);
  fill(160);
  ellipse(160, 280, 20, 20);
  fill(171);
  ellipse(180, 280, 20, 20);
  fill(203);
  ellipse(200, 280, 20, 20);
  fill(155);
  ellipse(220, 280, 20, 20);
  fill(93);
  ellipse(240, 280, 20, 20);
  fill(92);
  ellipse(260, 280, 20, 20);
  fill(179);
  ellipse(280, 280, 20, 20);
  fill(160);
  ellipse(300, 280, 20, 20);
  fill(119);
  ellipse(320, 280, 20, 20);
  fill(31);
  ellipse(340, 280, 20, 20);
  fill(24);
  ellipse(360, 280, 20, 20);
  fill(34);
  ellipse(380, 280, 20, 20);
  fill(180);
  ellipse(400, 280, 20, 20); //19 total ellipses on row 15
  //row 16
  fill(159);
  ellipse(40, 300, 20, 20);
  fill(26);
  ellipse(60, 300, 20, 20);
  fill(31);
  ellipse(80, 300, 20, 20);
  fill(26);
  ellipse(100, 300, 20, 20);
  fill(25);
  ellipse(120, 300, 20, 20);
  fill(115);
  ellipse(140, 300, 20, 20);
  fill(143);
  ellipse(160, 300, 20, 20);
  fill(157);
  ellipse(180, 300, 20, 20);
  fill(151);
  ellipse(200, 300, 20, 20);
  fill(128);
  ellipse(220, 300, 20, 20);
  fill(112);
  ellipse(240, 300, 20, 20);
  fill(109);
  ellipse(260, 300, 20, 20);
  fill(141);
  ellipse(280, 300, 20, 20);
  fill(132);
  ellipse(300, 300, 20, 20);
  fill(76);
  ellipse(320, 300, 20, 20);
  fill(29);
  ellipse(340, 300, 20, 20);
  fill(17);
  ellipse(360, 300, 20, 20);
  fill(31);
  ellipse(380, 300, 20, 20);
  fill(170);
  ellipse(400, 300, 20, 20); //19 total ellipses on row 16
  //row 17
  fill(157);
  ellipse(40, 320, 20, 20);
  fill(40);
  ellipse(60, 320, 20, 20);
  fill(38);
  ellipse(80, 320, 20, 20);
  fill(22);
  ellipse(100, 320, 20, 20);
  fill(24);
  ellipse(120, 320, 20, 20);
  fill(85);
  ellipse(140, 320, 20, 20);
  fill(142);
  ellipse(160, 320, 20, 20);
  fill(151);
  ellipse(180, 320, 20, 20);
  fill(110);
  ellipse(200, 320, 20, 20);
  fill(118);
  ellipse(220, 320, 20, 20);
  fill(138);
  ellipse(240, 320, 20, 20);
  fill(107);
  ellipse(260, 320, 20, 20);
  fill(97);
  ellipse(280, 320, 20, 20);
  fill(126);
  ellipse(300, 320, 20, 20);
  fill(50);
  ellipse(320, 320, 20, 20);
  fill(22);
  ellipse(340, 320, 20, 20);
  fill(16);
  ellipse(360, 320, 20, 20);
  fill(28);
  ellipse(380, 320, 20, 20);
  fill(157);
  ellipse(400, 320, 20, 20); //19 total ellipses on row 17
  //row 18
  fill(171);
  ellipse(40, 340, 20, 20);
  fill(50);
  ellipse(60, 340, 20, 20);
  fill(24);
  ellipse(80, 340, 20, 20);
  fill(24);
  ellipse(100, 340, 20, 20);
  fill(19);
  ellipse(120, 340, 20, 20);
  fill(27);
  ellipse(140, 340, 20, 20);
  fill(114);
  ellipse(160, 340, 20, 20);
  fill(146);
  ellipse(180, 340, 20, 20);
  fill(138);
  ellipse(200, 340, 20, 20);
  fill(104);
  ellipse(220, 340, 20, 20);
  fill(99);
  ellipse(240, 340, 20, 20);
  fill(94);
  ellipse(260, 340, 20, 20);
  fill(130);
  ellipse(280, 340, 20, 20);
  fill(105);
  ellipse(300, 340, 20, 20);
  fill(26);
  ellipse(320, 340, 20, 20);
  fill(19);
  ellipse(340, 340, 20, 20);
  fill(24);
  ellipse(360, 340, 20, 20);
  fill(45);
  ellipse(380, 340, 20, 20);
  fill(218);
  ellipse(400, 340, 20, 20); //19 total ellipses on row 18
  //row 19
  fill(145);
  ellipse(40, 360, 20, 20);
  fill(44);
  ellipse(60, 360, 20, 20);
  fill(20);
  ellipse(80, 360, 20, 20);
  fill(18);
  ellipse(100, 360, 20, 20);
  fill(19);
  ellipse(120, 360, 20, 20);
  fill(24);
  ellipse(140, 360, 20, 20);
  fill(58);
  ellipse(160, 360, 20, 20);
  fill(115);
  ellipse(180, 360, 20, 20);
  fill(169);
  ellipse(200, 360, 20, 20);
  fill(173);
  ellipse(220, 360, 20, 20);
  fill(170);
  ellipse(240, 360, 20, 20);
  fill(152);
  ellipse(260, 360, 20, 20);
  fill(123);
  ellipse(280, 360, 20, 20);
  fill(34);
  ellipse(300, 360, 20, 20);
  fill(18);
  ellipse(320, 360, 20, 20);
  fill(19);
  ellipse(340, 360, 20, 20);
  fill(31);
  ellipse(360, 360, 20, 20);
  fill(119);
  ellipse(380, 360, 20, 20);
  fill(234);
  ellipse(400, 360, 20, 20); //19 total ellipses on row 19
  //row 20
  fill(209);
  ellipse(40, 380, 20, 20);
  fill(93);
  ellipse(60, 380, 20, 20);
  fill(20);
  ellipse(80, 380, 20, 20);
  fill(17);
  ellipse(100, 380, 20, 20);
  fill(31);
  ellipse(120, 380, 20, 20);
  fill(37);
  ellipse(140, 380, 20, 20);
  fill(63);
  ellipse(160, 380, 20, 20);
  fill(66);
  ellipse(180, 380, 20, 20);
  fill(93);
  ellipse(200, 380, 20, 20);
  fill(113);
  ellipse(220, 380, 20, 20);
  fill(109);
  ellipse(240, 380, 20, 20);
  fill(101);
  ellipse(260, 380, 20, 20);
  fill(67);
  ellipse(280, 380, 20, 20);
  fill(17);
  ellipse(300, 380, 20, 20);
  fill(17);
  ellipse(320, 380, 20, 20);
  fill(28);
  ellipse(340, 380, 20, 20);
  fill(41);
  ellipse(360, 380, 20, 20);
  fill(140);
  ellipse(380, 380, 20, 20);
  fill(241);
  ellipse(400, 380, 20, 20); //19 total ellipses on row 20
  //row 21
  fill(219);
  ellipse(60, 400, 20, 20);
  fill(121);
  ellipse(80, 400, 20, 20);
  fill(48);
  ellipse(100, 400, 20, 20);
  fill(35);
  ellipse(120, 400, 20, 20);
  fill(50);
  ellipse(140, 400, 20, 20);
  fill(72);
  ellipse(160, 400, 20, 20);
  fill(80);
  ellipse(180, 400, 20, 20);
  fill(82);
  ellipse(200, 400, 20, 20);
  fill(88);
  ellipse(220, 400, 20, 20);
  fill(89);
  ellipse(240, 400, 20, 20);
  fill(86);
  ellipse(260, 400, 20, 20);
  fill(73);
  ellipse(280, 400, 20, 20);
  fill(24);
  ellipse(300, 400, 20, 20);
  fill(18);
  ellipse(320, 400, 20, 20);
  fill(35);
  ellipse(340, 400, 20, 20);
  fill(42);
  ellipse(360, 400, 20, 20);
  fill(193);
  ellipse(380, 400, 20, 20); //17 total ellipses on row 21
  //row 22
  fill(197);
  ellipse(60, 420, 20, 20);
  fill(112);
  ellipse(80, 420, 20, 20);
  fill(94);
  ellipse(100, 420, 20, 20);
  fill(70);
  ellipse(120, 420, 20, 20);
  fill(66);
  ellipse(140, 420, 20, 20);
  fill(85);
  ellipse(160, 420, 20, 20);
  fill(93);
  ellipse(180, 420, 20, 20);
  fill(100);
  ellipse(200, 420, 20, 20);
  fill(98);
  ellipse(220, 420, 20, 20);
  fill(93);
  ellipse(240, 420, 20, 20);
  fill(95);
  ellipse(260, 420, 20, 20);
  fill(85);
  ellipse(280, 420, 20, 20);
  fill(52);
  ellipse(300, 420, 20, 20);
  fill(53);
  ellipse(320, 420, 20, 20);
  fill(17);
  ellipse(340, 420, 20, 20);
  fill(20);
  ellipse(360, 420, 20, 20);
  fill(51);
  ellipse(380, 420, 20, 20);
  fill(141);
  ellipse(400, 420, 20, 20);
  fill(204);
  ellipse(420, 420, 20, 20);
  fill(240);
  ellipse(440, 420, 20, 20); //20 total ellipses on row 22
  //row 23
  fill(235);
  ellipse(0, 440, 20, 20);
  fill(181);
  ellipse(20, 440, 20, 20);
  fill(102);
  ellipse(40, 440, 20, 20);
  fill(47);
  ellipse(60, 440, 20, 20);
  fill(33);
  ellipse(80, 440, 20, 20);
  fill(128);
  ellipse(100, 440, 20, 20);
  fill(92);
  ellipse(120, 440, 20, 20);
  fill(91);
  ellipse(140, 440, 20, 20);
  fill(96);
  ellipse(160, 440, 20, 20);
  fill(107);
  ellipse(180, 440, 20, 20);
  fill(107);
  ellipse(200, 440, 20, 20);
  fill(105);
  ellipse(220, 440, 20, 20);
  fill(105);
  ellipse(240, 440, 20, 20);
  fill(105);
  ellipse(260, 440, 20, 20);
  fill(111);
  ellipse(280, 440, 20, 20);
  fill(128);
  ellipse(300, 440, 20, 20);
  fill(138);
  ellipse(320, 440, 20, 20);
  fill(46);
  ellipse(340, 440, 20, 20);
  fill(34);
  ellipse(360, 440, 20, 20);
  fill(42);
  ellipse(380, 440, 20, 20);
  fill(60);
  ellipse(400, 440, 20, 20);
  fill(74);
  ellipse(420, 440, 20, 20);
  fill(108);
  ellipse(440, 440, 20, 20); //23 total ellipses on row 23 
  // 371 ellipses total!
}function setup() { 
  createCanvas(460, 460);
  noStroke();
} 

function draw() { 
  background(240);
  //row 2
  fill(223);
  rect(160,20,20,20);
  fill(194);
  rect(180,20,20,20);
  fill(185);
  rect(200,20,20,20);
  fill(134);
  rect(220,20,20,20);
  fill(94);
  rect(240,20,20,20);
  fill(109);
  rect(260,20,20,20);
  fill(193);
  rect(280,20,20,20);
  fill(243);
  rect(300,20,20,20); //8 total rects on row 2
  //row 3
  fill(193);
  rect(140,40,20,20);
  fill(141);
  rect(160,40,20,20);
  fill(167);  
  rect(180,40,20,20);
  fill(164);
  rect(200,40,20,20);
  fill(134);
  rect(220,40,20,20);
  fill(85);
  rect(240,40,20,20);
  fill(61);
  rect(260,40,20,20);
  fill(58);
  rect(280,40,20,20);
  fill(156);
  rect(300,40,20,20);
  fill(233);
  rect(320,40,20,20); //10 total rects on row 3
  //row 4
  fill(192);
  rect(120,60,20,20);
  fill(120);
  rect(140,60,20,20);
  fill(127);
  rect(160,60,20,20);
  fill(151);
  rect(180,60,20,20);
  fill(149);
  rect(200,60,20,20);
  fill(141);
  rect(220,60,20,20);
  fill(130);
  rect(240,60,20,20);
  fill(85);
  rect(260,60,20,20);
  fill(71);
  rect(280,60,20,20);
  fill(106);
  rect(300,60,20,20);
  fill(149);
  rect(320,60,20,20);
  fill(233);
  rect(340,60,20,20); //12 total rects on row 4
  //row 5
  fill(217);
  rect(100,80,20,20);
  fill(112);
  rect(120,80,20,20);
  fill(84);
  rect(140,80,20,20);
  fill(80);
  rect(160,80,20,20);
  fill(80);
  rect(180,80,20,20);
  fill(120);
  rect(200,80,20,20);
  fill(124);
  rect(220,80,20,20);
  fill(110);
  rect(240,80,20,20);
  fill(131);
  rect(260,80,20,20);
  fill(98);
  rect(280,80,20,20);
  fill(116);
  rect(300,80,20,20);
  fill(100);
  rect(320,80,20,20);
  fill(151);
  rect(340,80,20,20); //13 total rects on row 5
  //row 6
  fill(239);
  rect(80,100,20,20);
  fill(125);
  rect(100,100,20,20);
  fill(66);
  rect(120,100,20,20);
  fill(54);
  rect(140,100,20,20);
  fill(36);
  rect(160,100,20,20);
  fill(61);
  rect(180,100,20,20);
  fill(50);
  rect(200,100,20,20);
  fill(46);
  rect(220,100,20,20);
  fill(86);
  rect(240,100,20,20);
  fill(107);
  rect(260,100,20,20);
  fill(99);
  rect(280,100,20,20);
  fill(81);
  rect(300,100,20,20);
  fill(62);
  rect(320,100,20,20);
  fill(62);
  rect(340,100,20,20);
  fill(240);
  rect(360,100,20,20); //15 total ellipses on row 6
  //row 7
  fill(200);
  rect(80,120,20,20);
  fill(71);
  rect(100,120,20,20);
  fill(42);
  rect(120,120,20,20);
  fill(18);
  rect(140,120,20,20);
  fill(34);
  rect(160,120,20,20);
  fill(24);
  rect(180,120,20,20);
  fill(11);
  rect(200,120,20,20);
  fill(23);
  rect(220,120,20,20);
  fill(22);
  rect(240,120,20,20);
  fill(52);
  rect(260,120,20,20);
  fill(90);
  rect(280,120,20,20);
  fill(61);
  rect(300,120,20,20);
  fill(22);
  rect(320,120,20,20);
  fill(28);
  rect(340,120,20,20);
  fill(192);
  rect(360,120,20,20); //15 total rects on row 7
  //row 8
  fill(128);
  rect(80,140,20,20);
  fill(46);
  rect(100,140,20,20);
  fill(30);
  rect(120,140,20,20);
  fill(27);
  rect(140,140,20,20);
  fill(17);
  rect(160,140,20,20);
  fill(12);
  rect(180,140,20,20);
  fill(14);
  rect(200,140,20,20);
  fill(14);
  rect(220,140,20,20);
  fill(41);
  rect(240,140,20,20);
  fill(80);
  rect(260,140,20,20);
  fill(132);
  rect(280,140,20,20);
  fill(97);
  rect(300,140,20,20);
  fill(18);
  rect(320,140,20,20);
  fill(15);
  rect(340,140,20,20);
  fill(129);
  rect(360,140,20,20); //15 total rects on row 8
  //row 9
  fill(228);
  rect(60,160,20,20);
  fill(82);
  rect(80,160,20,20);
  fill(46);
  rect(100,160,20,20);
  fill(24);
  rect(120,160,20,20);
  fill(20);
  rect(140,160,20,20);
  fill(65);
  rect(160,160,20,20);
  fill(130);
  rect(180,160,20,20);
  fill(172);
  rect(200,160,20,20);
  fill(170);
  rect(220,160,20,20);
  fill(156);
  rect(240,160,20,20);
  fill(153);
  rect(260,160,20,20);
  fill(171);
  rect(280,160,20,20);
  fill(144);
  rect(300,160,20,20);
  fill(32);
  rect(320,160,20,20);
  fill(12);
  rect(340,160,20,20);
  fill(66);
  rect(360,160,20,20);
  fill(240);
  rect(380,160,20,20); //17 total rects on row 9
  //row 10
  fill(175);
  rect(60,180,20,20);
  fill(46);
  rect(80,180,20,20);
  fill(58);
  rect(100,180,20,20);
  fill(21);
  rect(120,180,20,20);
  fill(88);
  rect(140,180,20,20);
  fill(129);
  rect(160,180,20,20);
  fill(111);
  rect(180,180,20,20);
  fill(64);
  rect(200,180,20,20);
  fill(107);
  rect(220,180,20,20);
  fill(172);
  rect(240,180,20,20);
  fill(147);
  rect(260,180,20,20);
  fill(95);
  rect(280,180,20,20);
  fill(96);
  rect(300,180,20,20);
  fill(108);
  rect(320,180,20,20);
  fill(22);
  rect(340,180,20,20);
  fill(28);
  rect(360,180,20,20);
  fill(177);
  rect(380,180,20,20); //17 total rects on row 10
  //row 11
  fill(113);
  rect(60,200,20,20);
  fill(45);
  rect(80,200,20,20);
  fill(49);
  rect(100,200,20,20);
  fill(44);
  rect(120,200,20,20);
  fill(142);
  rect(140,200,20,20);
  fill(87);
  rect(160,200,20,20);
  fill(62);
  rect(180,200,20,20);
  fill(95);
  rect(200,200,20,20);
  fill(102);
  rect(220,200,20,20);
  fill(195);
  rect(240,200,20,20);
  fill(112);
  rect(260,200,20,20);
  fill(56);
  rect(280,200,20,20);
  fill(61);
  rect(300,200,20,20);
  fill(81);
  rect(320,200,20,20);
  fill(41);
  rect(340,200,20,20);
  fill(33);
  rect(360,200,20,20);
  fill(117);
  rect(380,200,20,20);
  fill(242);
  rect(400,200,20,20); //18 total rects on row 11
  //row 12
  fill(234);
  rect(40,220,20,20);
  fill(68);
  rect(60,220,20,20);
  fill(36);
  rect(80,220,20,20);
  fill(39);
  rect(100,220,20,20);
  fill(86);
  rect(120,220,20,20);
  fill(189);
  rect(140,220,20,20);
  fill(176);
  rect(160,220,20,20);
  fill(138);
  rect(180,220,20,20);
  fill(174);
  rect(200,220,20,20);
  fill(204);
  rect(220,220,20,20);
  fill(212);
  rect(240,220,20,20);
  fill(179);
  rect(260,220,20,20);
  fill(150);
  rect(280,220,20,20);
  fill(109);
  rect(300,220,20,20);
  fill(120);
  rect(320,220,20,20);
  fill(77);
  rect(340,220,20,20);
  fill(75);
  rect(360,220,20,20);
  fill(89);
  rect(380,220,20,20);
  fill(234);
  rect(400,220,20,20); //19 total rects on row 12
  //row 13
  fill(212);
  rect(40,240,20,20);
  fill(48);
  rect(60,240,20,20);
  fill(22);
  rect(80,240,20,20);
  fill(32);
  rect(100,240,20,20);
  fill(59);
  rect(120,240,20,20);
  fill(173);
  rect(140,240,20,20);
  fill(217);
  rect(160,240,20,20);
  fill(226);
  rect(180,240,20,20);
  fill(221);
  rect(200,240,20,20);
  fill(200);
  rect(220,240,20,20);
  fill(226);
  rect(240,240,20,20);
  fill(199);
  rect(260,240,20,20);
  fill(205);
  rect(280,240,20,20);
  fill(200);
  rect(300,240,20,20);
  fill(189);
  rect(320,240,20,20);
  fill(86);
  rect(340,240,20,20);
  fill(57);
  rect(360,240,20,20);
  fill(65);
  rect(380,240,20,20);
  fill(217);
  rect(400,240,20,20); //19 total rects on row 13
  //row 14
  fill(203);
  rect(40,260,20,20);
  fill(27);
  rect(60,260,20,20);
  fill(16);
  rect(80,260,20,20);
  fill(26);
  rect(100,260,20,20);
  fill(29);
  rect(120,260,20,20);
  fill(132);
  rect(140,260,20,20);
  fill(193);
  rect(160,260,20,20);
  fill(206);
  rect(180,260,20,20);
  fill(184);
  rect(200,260,20,20);
  fill(156);
  rect(220,260,20,20);
  fill(168);
  rect(240,260,20,20);
  fill(149);
  rect(260,260,20,20);
  fill(182);
  rect(280,260,20,20);
  fill(200);
  rect(300,260,20,20);
  fill(174);
  rect(320,260,20,20);
  fill(61);
  rect(340,260,20,20);
  fill(31);
  rect(360,260,20,20);
  fill(37);
  rect(380,260,20,20);
  fill(194);
  rect(400,260,20,20); //19 total rects on row 14
  //row 15
  rect(40,280,20,20);
  fill(22);
  rect(60,280,20,20);
  fill(24);
  rect(80,280,20,20);
  fill(25);
  rect(100,280,20,20);
  fill(23);
  rect(120,280,20,20);
  fill(106);
  rect(140,280,20,20);
  fill(160);
  rect(160,280,20,20);
  fill(171);
  rect(180,280,20,20);
  fill(203);
  rect(200,280,20,20);
  fill(155);
  rect(220,280,20,20);
  fill(93);
  rect(240,280,20,20);
  fill(92);
  rect(260,280,20,20);
  fill(179);
  rect(280,280,20,20);
  fill(160);
  rect(300,280,20,20);
  fill(119);
  rect(320,280,20,20);
  fill(31);
  rect(340,280,20,20);
  fill(24);
  rect(360,280,20,20);
  fill(34);
  rect(380,280,20,20);
  fill(180);
  rect(400,280,20,20); //19 total rects on row 15
  //row 16
  fill(159);
  rect(40,300,20,20);
  fill(26);
  rect(60,300,20,20);
  fill(31);
  rect(80,300,20,20);
  fill(26);
  rect(100,300,20,20);
  fill(25);
  rect(120,300,20,20);
  fill(115);
  rect(140,300,20,20);
  fill(143);
  rect(160,300,20,20);
  fill(157);
  rect(180,300,20,20);
  fill(151);
  rect(200,300,20,20);
  fill(128);
  rect(220,300,20,20);
  fill(112);
  rect(240,300,20,20);
  fill(109);
  rect(260,300,20,20);
  fill(141);
  rect(280,300,20,20);
  fill(132);
  rect(300,300,20,20);
  fill(76);
  rect(320,300,20,20);
  fill(29);
  rect(340,300,20,20);
  fill(17);
  rect(360,300,20,20);
  fill(31);
  rect(380,300,20,20);
  fill(170);
  rect(400,300,20,20); //19 total rects on row 16
  //row 17
  fill(157);
  rect(40,320,20,20);
  fill(40);
  rect(60,320,20,20);
  fill(38);
  rect(80,320,20,20);
  fill(22);
  rect(100,320,20,20);
  fill(24);
  rect(120,320,20,20);
  fill(85);
  rect(140,320,20,20);
  fill(142);
  rect(160,320,20,20);
  fill(151);
  rect(180,320,20,20);
  fill(110);
  rect(200,320,20,20);
  fill(118);
  rect(220,320,20,20);
  fill(138);
  rect(240,320,20,20);
  fill(107);
  rect(260,320,20,20);
  fill(97);
  rect(280,320,20,20);
  fill(126);
  rect(300,320,20,20);
  fill(50);
  rect(320,320,20,20);
  fill(22);
  rect(340,320,20,20);
  fill(16);
  rect(360,320,20,20);
  fill(28);
  rect(380,320,20,20);
  fill(157);
  rect(400,320,20,20); //19 total rects on row 17
  //row 18
  fill(171);
  rect(40,340,20,20);
  fill(50);
  rect(60,340,20,20);
  fill(24);
  rect(80,340,20,20);
  fill(24);
  rect(100,340,20,20);
  fill(19);
  rect(120,340,20,20);
  fill(27);
  rect(140,340,20,20);
  fill(114);
  rect(160,340,20,20);
  fill(146);
  rect(180,340,20,20);
  fill(138);
  rect(200,340,20,20);
  fill(104);
  rect(220,340,20,20);
  fill(99);
  rect(240,340,20,20);
  fill(94);
  rect(260,340,20,20);
  fill(130);
  rect(280,340,20,20);
  fill(105);
  rect(300,340,20,20);
  fill(26);
  rect(320,340,20,20);
  fill(19);
  rect(340,340,20,20);
  fill(24);
  rect(360,340,20,20);
  fill(45);
  rect(380,340,20,20);
  fill(218);
  rect(400,340,20,20); //19 total rects on row 18
  //row 19
  fill(145);
  rect(40,360,20,20);
  fill(44);
  rect(60,360,20,20);
  fill(20);
  rect(80,360,20,20);
  fill(18);
  rect(100,360,20,20);
  fill(19);
  rect(120,360,20,20);
  fill(24);
  rect(140,360,20,20);
  fill(58);
  rect(160,360,20,20);
  fill(115);
  rect(180,360,20,20);
  fill(169);
  rect(200,360,20,20);
  fill(173);
  rect(220,360,20,20);
  fill(170);
  rect(240,360,20,20);
  fill(152);
  rect(260,360,20,20);
  fill(123);
  rect(280,360,20,20);
  fill(34);
  rect(300,360,20,20);
  fill(18);
  rect(320,360,20,20);
  fill(19);
  rect(340,360,20,20);
  fill(31);
  rect(360,360,20,20);
  fill(119);
  rect(380,360,20,20);
  fill(234);
  rect(400,360,20,20); //19 total rects on row 19
  //row 20
  fill(209);
  rect(40,380,20,20);
  fill(93);
  rect(60,380,20,20);
  fill(20);
  rect(80,380,20,20);
  fill(17);
  rect(100,380,20,20);
  fill(31);
  rect(120,380,20,20);
  fill(37);
  rect(140,380,20,20);
  fill(63);
  rect(160,380,20,20);
  fill(66);
  rect(180,380,20,20);
  fill(93);
  rect(200,380,20,20);
  fill(113);
  rect(220,380,20,20);
  fill(109);
  rect(240,380,20,20);
  fill(101);
  rect(260,380,20,20);
  fill(67);
  rect(280,380,20,20);
  fill(17);
  rect(300,380,20,20);
  fill(17);
  rect(320,380,20,20);
  fill(28);
  rect(340,380,20,20);
  fill(41);
  rect(360,380,20,20);
  fill(140);
  rect(380,380,20,20);
  fill(241);
  rect(400,380,20,20); //19 total rects on row 20
  //row 21
  fill(219);
  rect(60,400,20,20);
  fill(121);
  rect(80,400,20,20);
  fill(48);
  rect(100,400,20,20);
  fill(35);
  rect(120,400,20,20);
  fill(50);
  rect(140,400,20,20);
  fill(72);
  rect(160,400,20,20);
  fill(80);
  rect(180,400,20,20);
  fill(82);
  rect(200,400,20,20);
  fill(88);
  rect(220,400,20,20);
  fill(89);
  rect(240,400,20,20);
  fill(86);
  rect(260,400,20,20);
  fill(73);
  rect(280,400,20,20);
  fill(24);
  rect(300,400,20,20);
  fill(18);
  rect(320,400,20,20);
  fill(35);
  rect(340,400,20,20);
  fill(42);
  rect(360,400,20,20);
  fill(193);
  rect(380,400,20,20); //17 total rects on row 21
  //row 22
  fill(197);
  rect(60,420,20,20);
  fill(112);
  rect(80,420,20,20);
  fill(94);
  rect(100,420,20,20);
  fill(70);
  rect(120,420,20,20);
  fill(66);
  rect(140,420,20,20);
  fill(85);
  rect(160,420,20,20);
  fill(93);
  rect(180,420,20,20);
  fill(100);
  rect(200,420,20,20);
  fill(98);
  rect(220,420,20,20);
  fill(93);
  rect(240,420,20,20);
  fill(95);
  rect(260,420,20,20);
  fill(85);
  rect(280,420,20,20);
  fill(52);
  rect(300,420,20,20);
  fill(53);
  rect(320,420,20,20);
  fill(17);
  rect(340,420,20,20);
  fill(20);
  rect(360,420,20,20);
  fill(51);
  rect(380,420,20,20);
  fill(141);
  rect(400,420,20,20);
  fill(204);
  rect(420,420,20,20);
  fill(240);
  rect(440,420,20,20); //20 total rects on row 22
  //row 23
    fill(235);
  rect(0,440,20,20);
  fill(181);
  rect(20,440,20,20);
  fill(102);
  rect(40,440,20,20);
  fill(47);
  rect(60,440,20,20);
  fill(33);
  rect(80,440,20,20);
  fill(128);
  rect(100,440,20,20);
  fill(92);
  rect(120,440,20,20);
  fill(91);
  rect(140,440,20,20);
  fill(96);
  rect(160,440,20,20);
  fill(107);
  rect(180,440,20,20);
  fill(107);
  rect(200,440,20,20);
  fill(105);
  rect(220,440,20,20);
  fill(105);
  rect(240,440,20,20);
  fill(105);
  rect(260,440,20,20);
  fill(111);
  rect(280,440,20,20);
  fill(128);
  rect(300,440,20,20);
  fill(138);
  rect(320,440,20,20);
  fill(46);
  rect(340,440,20,20);
  fill(34);
  rect(360,440,20,20);
  fill(42);
  rect(380,440,20,20);
  fill(60);
  rect(400,440,20,20);
  fill(74);
  rect(420,440,20,20);
  fill(108);
  rect(440,440,20,20); //23 total rects on row 23 
  // 371 rects total!
}