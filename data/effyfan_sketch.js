var particles = [];
var viscosity;
var c;
function setup() {
	createCanvas(600, 600);
	frameRate(60);
	noStroke();
	
	c = color(62, 255, 255, 192);
	viscosity = 0.95;
}
function draw() {
	background(55);
  
	
	handleInteractions();
	
	for (var i = 0; i < particles.length; i++) {
		particles[i].move();
		particles[i].display();
	}
}var particles = [];
var viscosity;
var c;
function setup() {
	createCanvas(800, 550);
	frameRate(60);
	noStroke();
	
	c = color(62, 255, 255, 192);
	viscosity = 0.95;
}
function draw() {
	background(32);
	
	handleInteractions();
	
	for (var i = 0; i < particles.length; i++) {
		particles[i].move();
		particles[i].display();
	}
}let capture;
let headHeight = 300;
function setup() {
  createCanvas(600, 600);
  pixelDensity(2);
  capture = createCapture(VIDEO);
  capture.size(600, 600);
  capture.hide();
}
function draw() {
  image(capture, -220, -headHeight, width*2.1, height*1.6);
}
function keyPressed() {
  if (keyCode == UP_ARROW) {
    saveCanvas("Camp2018", "png");
  }
}
  var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.lineCap = "round";
var t = 1;
var vertices = [];
vertices.push({
    x: 10,
    y: 10
});
vertices.push({
    x: 300,
    y: 100
});
vertices.push({
    x: 80,
    y: 200
});
vertices.push({
    x: 10,
    y: 100
});
vertices.push({
    x: 0,
    y: 0
});
ctx.lineWidth = 5;
ctx.strokeStyle = "blue";
var points = calcWaypoints(vertices);
animate(points);
function calcWaypoints(vertices) {
    var waypoints = [];
    for (var i = 1; i < vertices.length; i++) {
        var pt0 = vertices[i - 1];
        var pt1 = vertices[i];
        var dx = pt1.x - pt0.x;
        var dy = pt1.y - pt0.y;
        for (var j = 0; j < 100; j++) {
            var x = pt0.x + dx * j / 100;
            var y = pt0.y + dy * j / 100;
            waypoints.push({
                x: x,
                y: y
            });
        }
    }
    return (waypoints);
}
function animate() {
    if (t < points.length - 1) {
        requestAnimationFrame(animate);
    }
    ctx.beginPath();
    ctx.moveTo(points[t - 1].x, points[t - 1].y);
    ctx.lineTo(points[t].x, points[t].y);
    ctx.stroke();
    t++;
}var constellation = [];
var n;
var d;
function setup() {
  createCanvas(500, 500);
  n = 200;
  for (var i = 0; i <= n; i++) {
    constellation.push(new star());
  }
  strokeWeight(.75);
  stroke('#FFFFFF');
}
function draw() {
  background('#000000');
  for (var i = 0; i < constellation.length; i++) {
    constellation[i].update();
    for (var j = 0; j < constellation.length; j++) {
          line(constellation[i].loc.x, constellation[i].loc.y, constellation[j].loc.x, constellation[j].loc.y)
        }
      }
    }
  }
}
function star() {
  this.loc = createVector(width / 2 + sin(this.a) * this.r, height / 2 + cos(this.a) * this.r);
  this.speed = createVector();
  this.speed = p5.Vector.random2D();
  this.bam = createVector();
  this.m;
  this.update = function() {
      this.bam.mult(0.45);
      this.speed.add(this.bam);
      this.speed.normalize().mult(this.m);
      if (dist(this.loc.x, this.loc.y, width / 2, height / 2) > (width / 2) * 0.98) {
        if (this.loc.x < width / 2) {
        } else if (this.loc.x > width / 2) {
        }
        if (this.loc.y < height / 2) {
          this.loc.y = width - this.loc.y - 4;
        } else if (this.loc.x > height / 2) {
          this.loc.y = width - this.loc.y + 4;
        }
      }
      this.loc = this.loc.add(this.speed);
  createCanvas(400, 400);
}
function draw() {
  background(220);
}let kinectron = null;
let j;
let hr;
let joints = [
  "SPINEBASE",
  "SPINEMID",
  "NECK",
  "HEAD",
  "SHOULDERLEFT",
  "ELBOWLEFT",
  "WRISTLEFT",
  "HANDLEFT",
  "SHOULDERRIGHT",
  "ELBOWRIGHT",
  "WRISTRIGHT",
  "HANDRIGHT",
  "HIPLEFT",
  "KNEELEFT",
  "ANKLELEFT",
  "FOOTLEFT",
  "HIPRIGHT",
  "KNEERIGHT",
  "ANKLERIGHT",
  "FOOTRIGHT",
  "SPINESHOULDER",
  "HANDTIPLEFT",
  "THUMBLEFT",
  "HANDTIPRIGHT",
  "THUMBRIGHT"
];
let vehicle = [];
let vehicle2 = [];
let vehicle3 = [];
let headX;
let headY;
let handX;
let handY;
function setup() { 
  createCanvas(windowWidth, windowHeight);
   for (let i = 0; i < 100; i++) {
     vehicle[i] = new Vehicle(random(10, 50), random(20, 60));
     vehicle2[i] = new Vehicle(random(10, 50), random(20, 60));
     vehicle3[i] = new Vehicle(random(10, 50), random(20, 60));
   }
  kinectron = new Kinectron("172.17.66.70");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  j = kinectron.HEAD;
  hr = kinectron.HANDRIGHT;
} 
function draw() { 
  background(0);
  let target = createVector(headX, headY);
  let target2 = createVector(handX, handY);
  for (let i = 0; i < vehicle.length; i++) {
  vehicle[i].arrive(target);
  vehicle[i].update();
  vehicle[i].display();
  vehicle2[i].arrive(target);
  vehicle2[i].update();
  vehicle2[i].display();
  vehicle3[i].arrive(target);
  vehicle3[i].update();
  vehicle3[i].display();
  }
  drawJoint(hr);
}
function bodyTracked(body) {
  background(0);
  kinectron.getJoints(drawJoint);
  let joint = body.joints[j];
  let pos = scaleJoint(joint);
  
  let joint2 = body.joints[hr];
  let pos2 = scaleJoint(joint2);
  
  noStroke();
  fill(255);
  ellipse(pos.x, pos.y, 50, 50);
  headX = pos.x;
  headY = pos.y;
  
}
function drawJoint(joint) {
  let pos = scaleJoint(joint);
  noStroke();
  fill(255);
  ellipse(pos.x, pos.y, 10, 10);
}
function scaleJoint(joint) {
  return {
    x: (joint.cameraX * width / 2) + width / 2,
    y: (-joint.cameraY * width / 2) + height / 2,
  }
}let kinectron = null;
let j;
let hr;
let joints = [
  "SPINEBASE",
  "SPINEMID",
  "NECK",
  "HEAD",
  "SHOULDERLEFT",
  "ELBOWLEFT",
  "WRISTLEFT",
  "HANDLEFT",
  "SHOULDERRIGHT",
  "ELBOWRIGHT",
  "WRISTRIGHT",
  "HANDRIGHT",
  "HIPLEFT",
  "KNEELEFT",
  "ANKLELEFT",
  "FOOTLEFT",
  "HIPRIGHT",
  "KNEERIGHT",
  "ANKLERIGHT",
  "FOOTRIGHT",
  "SPINESHOULDER",
  "HANDTIPLEFT",
  "THUMBLEFT",
  "HANDTIPRIGHT",
  "THUMBRIGHT"
];
let vehicle = [];
let vehicle2 = [];
let headX;
let headY;
let handX;
let handY;
function setup() { 
  createCanvas(windowWidth, windowHeight);
   for (let i = 0; i < 100; i++) {
  vehicle[i] = new Vehicle(random(10, 50), random(20, 60));
   vehicle2[i] = new Vehicle(random(10, 50), random(20, 60));
   }
  kinectron = new Kinectron("172.16.216.72");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  j = kinectron.HEAD;
  hr = kinectron.HANDRIGHT;
} 
function draw() { 
  background(0);
  let target = createVector(headX, headY);
  let target2 = createVector(handX, handY);
  for (let i = 0; i < vehicle.length; i++) {
  vehicle[i].arrive(target);
  vehicle[i].update();
  vehicle[i].display();
  vehicle2[i].arrive(target2);
  vehicle2[i].update();
  vehicle2[i].display();
  }
  drawJoint(hr);
}
function bodyTracked(body) {
  background(0);
  kinectron.getJoints(drawJoint);
  let joint = body.joints[j];
  let pos = scaleJoint(joint);
  
  let joint2 = body.joints[hr];
  let pos2 = scaleJoint(joint2);
  
  noStroke();
  fill(255);
  ellipse(pos.x, pos.y, 50, 50);
  headX = pos.x;
  headY = pos.y;
  
  ellipse(pos2.x, pos2.y, 50, 50);
  handX = pos2.x;
  handY = pos2.y;
}
function drawJoint(joint) {
  let pos = scaleJoint(joint);
  noStroke();
  fill(255);
  ellipse(pos.x, pos.y, 10, 10);
}
function scaleJoint(joint) {
  return {
    x: (joint.cameraX * width / 2) + width / 2,
    y: (-joint.cameraY * width / 2) + height / 2,
  }
let ps = [];
let angle = 0;
function setup() {
  createCanvas(640,360);
  ps = new ParticleSystem(180,10,10);
}
function draw() {
  background(0);
  stroke(255);
  textSize(30);
  text("click mouse to shatter", 50, 50);
  ps.display();
  ps.update();
}
function mousePressed() {
  ps.shatter(); 
}var drops = [];
function setup() {
  createCanvas(640, 360);
  for (var i = 0; i < 300; i++) {
    drops[i] = new Drop();
  }
}
function draw() {
  background(0);
  for (var i = 0; i < drops.length; i++) {
    drops[i].fall();
    drops[i].update();
    drops[i].show();
    drops[i].behaviors();
  }
}const TAU = Math.PI * 2;
let canvas, ctx, width, height;
let flakes = [];
window.addEventListener('load', () => {
	canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	ctx = canvas.getContext('2d');
	resize();
	
	for(let i = 0; i < 30; i++) {
		let f = new Flake();
		f.y = Math.random() * height;
		flakes.push(f);
	}
	
	requestAnimationFrame(draw);
});
window.addEventListener('resize', resize);
function resize() {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
}
function draw() {
	requestAnimationFrame(draw);
	ctx.clearRect(0, 0, width, height);
	let flakesLength = flakes.length;
	ctx.fillStyle = 'hsl(0, 0%, 100%)';
	ctx.beginPath();
	for(let i = 0; i < flakesLength; i++) {
		flakes[i].update().draw();
	}
	ctx.fill();
}
var drops = [];
let handX;
let handY;
function setup() {
  createCanvas(800, 600);
  background(51);
  for (var i = 0; i < 200; i++) {
    drops[i] = new Drop();
  }
}
function draw() {
  background(51);
  for (var i = 0; i < drops.length; i++) {
    drops[i].fall();
    drops[i].update();
    drops[i].show();
    drops[i].behaviors();
    drops[i].constrain();
  }
}
let vehicles = [];
let points;
let handX; 
let handY;
let kinectron = null;
let j;
let joints = [
  "SPINEBASE",
  "SPINEMID",
  "NECK",
  "HEAD",
  "SHOULDERLEFT",
  "ELBOWLEFT",
  "WRISTLEFT",
  "HANDLEFT",
  "SHOULDERRIGHT",
  "ELBOWRIGHT",
  "WRISTRIGHT",
  "HANDRIGHT",
  "HIPLEFT",
  "KNEELEFT",
  "ANKLELEFT",
  "FOOTLEFT",
  "HIPRIGHT",
  "KNEERIGHT",
  "ANKLERIGHT",
  "FOOTRIGHT",
  "SPINESHOULDER",
  "HANDTIPLEFT",
  "THUMBLEFT",
  "HANDTIPRIGHT",
  "THUMBRIGHT"
];
function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf')
}
function setup() {
  createCanvas(600, 300);
  background(51);
  kinectron = new Kinectron("172.16.243.224");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  j = kinectron.HANDRIGHT;
  points = font.textToPoints('DANCE', 20, 200, 160);
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}
function draw() {
  background(51);
  for (let i = 0; i < points.length; i++) {
    let v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}
function bodyTracked(body) {
  background(0);
  kinectron.getJoints(drawJoint);
  let joint = body.joints[j];
  let pos = scaleJoint(joint);
  noStroke();
  fill(255);
  ellipse(pos.x, pos.y, 50, 50);
  handX = pos.x;
  handY = pos.y;
  stroke(255);
  textSize(18);
}
function drawJoint(joint) {
  let pos = scaleJoint(joint);
  noStroke();
  fill(255);
  ellipse(pos.x, pos.y, 10, 10);
}
function scaleJoint(joint) {
  return {
    x: (joint.cameraX * width / 2) + width / 2,
    y: (-joint.cameraY * width / 2) + height / 2,
  }
Mimi Yin NYU-ITP
Drawing skeleton joints with selected joint.
Use LEFT/RIGHT arrow keys to select joint.
let kinectron = null;
let j;
let joints = [
  "SPINEBASE",
  "SPINEMID",
  "NECK",
  "HEAD",
  "SHOULDERLEFT",
  "ELBOWLEFT",
  "WRISTLEFT",
  "HANDLEFT",
  "SHOULDERRIGHT",
  "ELBOWRIGHT",
  "WRISTRIGHT",
  "HANDRIGHT",
  "HIPLEFT",
  "KNEELEFT",
  "ANKLELEFT",
  "FOOTLEFT",
  "HIPRIGHT",
  "KNEERIGHT",
  "ANKLERIGHT",
  "FOOTRIGHT",
  "SPINESHOULDER",
  "HANDTIPLEFT",
  "THUMBLEFT",
  "HANDTIPRIGHT",
  "THUMBRIGHT"
];
function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectron = new Kinectron("172.16.243.224");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  j = kinectron.HANDRIGHT;
  background(0);
}
function draw() {
}
function bodyTracked(body) {
  background(0);
  kinectron.getJoints(drawJoint);
  let joint = body.joints[j];
  let pos = scaleJoint(joint);
  noStroke();
  fill(255);
  ellipse(pos.x, pos.y, 50, 50);
  stroke(255);
  textSize(18);
}
function drawJoint(joint) {
  let pos = scaleJoint(joint);
  noStroke();
  fill(255);
  ellipse(pos.x, pos.y, 10, 10);
}
function scaleJoint(joint) {
  return {
    x: (joint.cameraX * width / 2) + width / 2,
    y: (-joint.cameraY * width / 2) + height / 2,
  }
var particles = [];
function setup() {
  createCanvas(600, 600);
}
function mousePressed() {
  particles.push(new Particle(mouseX, mouseY));
}
function draw() {
  background(200);
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
  
  line(frameCount, 0, frameCount, height);
var cities = [];
var totalCities = 15;
var recordDistance = Infinity;
var bestEver;
var population = [];
var popTotal = 100;
function setup() {
  createCanvas(600, 600);
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(10, width - 10), random(10, height / 2 - 10));
    cities[i] = v;
  }
  for (var i = 0; i < popTotal; i++) {
    population[i] = new DNA(totalCities);
  }
}
function draw() {
  background(0);
  var minDist = Infinity;
  var maxDist = 0;
  var bestNow;
  for (var i = 0; i < population.length; i++) {
    var d = population[i].calcDistance();
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i];
    }
    if (d < minDist) {
      minDist = d;
      bestNow = population[i];
    }
    if (d > maxDist) {
      maxDist = d;
    }
  }
  bestNow.show();
  bestEver.show();
  var sum = 0;
  for (var i = 0; i < population.length; i++) {
    sum += population[i].mapFitness(minDist, maxDist);
  }
  for (var i = 0; i < population.length; i++) {
    population[i].normalizeFitness(sum);
  }
  var newPop = [];
  for (var i = 0; i < population.length; i++) {
    var index = 0;
    var r = random(1);
    while (r > 0) {
      r -= population[index].fitness;
      index += 1;
    }
    index -= 1;
    newPop[i] = new DNA(totalCities, population[index].order);
  }
  population = newPop;
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
}let img;
let debug = true;
let b;
let flowfield;
let vehicles = [];
function preload() {
  img = loadImage("starrynight.jpg");
}
function setup() {
  createCanvas(799, 633);
  console.log(img.width, img.height);
  img.loadPixels();
 
  flowfield = new FlowField(20);
  for (let i = 0; i < 300; i++) {
    vehicles.push(new Vehicle(random(width), random(height), 2, 0.3));
  }
}
function draw() {
   image(img, 0, 0);
  if (debug) flowfield.display();
  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].follow(flowfield);
    vehicles[i].run();
  }
}
function keyPressed() {
  if (key == ' ') {
    debug = !debug;
  }
}
function mousePressed() {
  flowfield.init();
}let img;
let debug = true;
let b;
let flowfield;
let vehicles = [];
function preload() {
  img = loadImage("starrynight.jpg");
}
function setup() {
  createCanvas(799, 633);
  console.log(img.width, img.height);
  img.loadPixels();
  flowfield = new FlowField(20);
  for (let i = 0; i < 100; i++) {
    vehicles.push(new Vehicle(random(width), random(height), 2, random(0.1, 0.3)));
  }
}
function draw() {
  background(51);
  image(img, 0, 0);
  if (debug) flowfield.display();
  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].follow(flowfield);
    vehicles[i].run();
  }
}
function keyPressed() {
  if (key == ' ') {
    debug = !debug;
  }
}
function mousePressed() {
  flowfield.init();
let ps = [];
let angle = 0;
function setup() {
  createCanvas(640,360, WEBGL);
  ps = new ParticleSystem(100,100,5);
}
function draw() {
  background(255);
  push();
  translate(0, -200, -300);
  rotateY(angle);
  angle +=0.1;
  ps.display();
  ps.update();
  pop();
}
function mousePressed() {
  ps.shatter(); 
}let mover;
let attractor;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Vector = Matter.vector;
let engine;
let world;
let boxes = [];
let ground;
function setup() {
  createCanvas(640, 500);
  engine = Engine.create();
  world = engine.world;
  let bOptions = {
    isStatic: true
  }
  
  world.gravity.y = 0;
  
  ground = Bodies.rectangle(width/2, height + 5, width, 100, bOptions);
  World.add(world, ground);
  let options = {
    velocityIteration: 4,
    timing: {
    timeScale: 0.1
    }
  }
  mover = new Mover();
  attractor = new Attractor();
}
function draw() {
  background(200);
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].display();
  }
  
  Engine.run(engine);
  let force = attractor.calculateAttraction(mover);
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
}
function mousePressed() {
  boxes.push(new Mover(mouseX, mouseY, random(10, 40), random(10, 40)));
Mimi Yin NYU-ITP
Connecting joints in new ways
with 2D drawing
let kinectron = null;
let mode = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectron = new Kinectron("172.17.68.134");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  background(0);
}
function draw() {}
function bodyTracked(body) {
  background(0);
  kinectron.getJoints(drawJoint);
  let head = scaleJoint(body.joints[kinectron.HEAD]);
  let neck = scaleJoint(body.joints[kinectron.NECK]);
  let spineShoulder = scaleJoint(body.joints[kinectron.SPINESHOULDER]);
  let spineMid = scaleJoint(body.joints[kinectron.SPINEMID]);
  let spineBase = scaleJoint(body.joints[kinectron.SPINEBASE]);
  let shoulderRight = scaleJoint(body.joints[kinectron.SHOULDERRIGHT]);
  let elbowRight = scaleJoint(body.joints[kinectron.ELBOWRIGHT]);
  let wristRight = scaleJoint(body.joints[kinectron.WRISTRIGHT]);
  let handRight = scaleJoint(body.joints[kinectron.HANDRIGHT]);
  let handTipRight = scaleJoint(body.joints[kinectron.HANDTIPRIGHT]);
  let thumbRight = scaleJoint(body.joints[kinectron.THUMBRIGHT]);
  let shoulderLeft = scaleJoint(body.joints[kinectron.SHOULDERLEFT]);
  let elbowLeft = scaleJoint(body.joints[kinectron.ELBOWLEFT]);
  let wristLeft = scaleJoint(body.joints[kinectron.WRISTLEFT]);
  let handLeft = scaleJoint(body.joints[kinectron.HANDLEFT]);
  let handTipLeft = scaleJoint(body.joints[kinectron.HANDTIPLEFT]);
  let thumbLeft = scaleJoint(body.joints[kinectron.THUMBLEFT]);
  let hipRight = scaleJoint(body.joints[kinectron.HIPRIGHT]);
  let kneeRight = scaleJoint(body.joints[kinectron.KNEERIGHT]);
  let ankleRight = scaleJoint(body.joints[kinectron.ANKLERIGHT]);
  let footRight = scaleJoint(body.joints[kinectron.FOOTRIGHT]);
  let hipLeft = scaleJoint(body.joints[kinectron.HIPLEFT]);
  let kneeLeft = scaleJoint(body.joints[kinectron.KNEELEFT]);
  let ankleLeft = scaleJoint(body.joints[kinectron.ANKLELEFT]);
  let footLeft = scaleJoint(body.joints[kinectron.FOOTLEFT]);
  fill(255, 64);
  noStroke();
  switch (mode) {
    case 0:
      beginShape();
      vertex(hipLeft.x, hipLeft.y);
      vertex(thumbRight.x, thumbRight.y);
      vertex(head.x, head.y);
      vertex(footRight.x, footRight.y);
      vertex(shoulderLeft.x, shoulderLeft.y);
      endShape();
      break;
    case 1:
      beginShape();
      curveVertex(hipLeft.x, hipLeft.y);
      curveVertex(footRight.x, footRight.y);
      curveVertex(thumbRight.x, thumbRight.y);
      curveVertex(head.x, head.y);
      curveVertex(kneeLeft.x, kneeLeft.y);
      curveVertex(shoulderLeft.x, shoulderLeft.y);
      endShape();
      break;
  }
  textSize(18);
  stroke(255);
  fill(255);
  text("Press any key to change modes.", 10, 20);
}
function scaleJoint(joint) {
  return createVector((joint.cameraX * width / 2) + width / 2, (-joint.cameraY * width / 2) + height / 2);
}
function drawJoint(joint) {
  let pos = scaleJoint(joint);
  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
}
function keyPressed() {
  mode++;
  mode %= 2;
Mimi Yin NYU-ITP
Drawing skeleton joints and bones.
var kinectron = null;
function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectron = new Kinectron("172.17.68.134");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  background(0);
}
function draw() {
}
function bodyTracked(body) {
  background(0);
  kinectron.getJoints(drawJoint);
  var head = getPos(body.joints[kinectron.HEAD]);
  var neck = getPos(body.joints[kinectron.NECK]);
  var spineShoulder = getPos(body.joints[kinectron.SPINESHOULDER]);
  var spineMid = getPos(body.joints[kinectron.SPINEMID]);
  var spineBase = getPos(body.joints[kinectron.SPINEBASE]);
  var shoulderRight = getPos(body.joints[kinectron.SHOULDERRIGHT]);
  var elbowRight = getPos(body.joints[kinectron.ELBOWRIGHT]);
  var wristRight = getPos(body.joints[kinectron.WRISTRIGHT]);
  var handRight = getPos(body.joints[kinectron.HANDRIGHT]);
  var handTipRight = getPos(body.joints[kinectron.HANDTIPRIGHT]);
  var thumbRight = getPos(body.joints[kinectron.THUMBRIGHT]);
  var shoulderLeft = getPos(body.joints[kinectron.SHOULDERLEFT]);
  var elbowLeft = getPos(body.joints[kinectron.ELBOWLEFT]);
  var wristLeft = getPos(body.joints[kinectron.WRISTLEFT]);
  var handLeft = getPos(body.joints[kinectron.HANDLEFT]);
  var handTipLeft = getPos(body.joints[kinectron.HANDTIPLEFT]);
  var thumbLeft = getPos(body.joints[kinectron.THUMBLEFT]);
  var hipRight = getPos(body.joints[kinectron.HIPRIGHT]);
  var kneeRight = getPos(body.joints[kinectron.KNEERIGHT]);
  var ankleRight = getPos(body.joints[kinectron.ANKLERIGHT]);
  var footRight = getPos(body.joints[kinectron.FOOTRIGHT]);
  var hipLeft = getPos(body.joints[kinectron.HIPLEFT]);
  var kneeLeft = getPos(body.joints[kinectron.KNEELEFT]);
  var ankleLeft = getPos(body.joints[kinectron.ANKLELEFT]);
  var footLeft = getPos(body.joints[kinectron.FOOTLEFT]);
  noFill();
  stroke(255);
  strokeWeight(10);
  beginShape();
  vertex(head.x, head.y);
  vertex(neck.x, neck.y);
  vertex(spineShoulder.x, spineShoulder.y);
  vertex(spineMid.x, spineMid.y);
  vertex(spineBase.x, spineBase.y);
  endShape();
  line(spineShoulder.x, spineShoulder.y, shoulderRight.x, shoulderRight.y);
  line(spineShoulder.x, spineShoulder.y, shoulderLeft.x, shoulderLeft.y);
  beginShape();
  vertex(shoulderRight.x, shoulderRight.y);
  vertex(elbowRight.x, elbowRight.y);
  vertex(wristRight.x, wristRight.y);
  vertex(handRight.x, handRight.y);
  vertex(handTipRight.x, handTipRight.y);
  endShape();
  line(handRight.x, handRight.y, thumbRight.x, thumbRight.y);
  if(keyIsPressed){
    push();
    var offset = p5.Vector.sub(head, shoulderLeft);
    translate(offset.x, offset.y);
    beginShape();
    vertex(shoulderLeft.x, shoulderLeft.y);
    vertex(elbowLeft.x, elbowLeft.y);
    vertex(wristLeft.x, wristLeft.y);
    vertex(handLeft.x, handLeft.y);
    vertex(handTipLeft.x, handTipLeft.y);
    endShape();
    pop();
  }
	else {
    beginShape();
    vertex(shoulderLeft.x, shoulderLeft.y);
    vertex(elbowLeft.x, elbowLeft.y);
    vertex(wristLeft.x, wristLeft.y);
    vertex(handLeft.x, handLeft.y);
    vertex(handTipLeft.x, handTipLeft.y);
    endShape();
  }
  line(handLeft.x, handLeft.y, thumbLeft.x, thumbLeft.y);
  line(spineBase.x, spineBase.y, hipRight.x, hipRight.y);
  line(spineBase.x, spineBase.y, hipLeft.x, hipLeft.y);
  beginShape();
  vertex(hipRight.x, hipRight.y);
  vertex(kneeRight.x, kneeRight.y);
  vertex(ankleRight.x, ankleRight.y);
  vertex(footRight.x, footRight.y);
  endShape();
  beginShape();
  vertex(hipLeft.x, hipLeft.y);
  vertex(kneeLeft.x, kneeLeft.y);
  vertex(ankleLeft.x, ankleLeft.y);
  vertex(footLeft.x, footLeft.y);
  endShape();
}
function getPos(joint) {
  return createVector((joint.cameraX * width/2) + width/2, (-joint.cameraY * width/2) + height/2);
}
function drawJoint(joint) {
  var pos = getPos(joint);
  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
}let font;
let vehicles = [];
let points;
function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf')
}
function setup() {
  createCanvas(600, 300);
  background(51);
  points = font.textToPoints('DANCE', 20, 200, 160);
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}
function draw() {
  background(51);
  for (let i = 0; i < points.length; i++) {
    let v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}
var circles;
var img;
function preload() {
  img = loadImage("starrynight.jpg");
}
function setup() {
  createCanvas(799, 633);
  var density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  circles = [];
  console.log(img.width);
  console.log(img.height);
  console.log("pixels", img.pixels.length);
  console.log(density)
}
function draw() {
  background(0);
  var total = 20;
  var count = 0;
  var attempts = 0;
  while (count < total) {
    var newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts > 1000) {
      noLoop();
      console.log("finished");
      break;
    }
  }
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
          if (circle !== other) {
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;
            if (d - 1 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }
    circle.show();
    circle.grow();
  }
}
function newCircle() {
  var x = random(0, img.width);
  var y = random(0, img.height);
  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d - 2 < circle.r - 0.1) {
      valid = false;
      break;
    }
  }
  if (valid) {
    var index = (int(x) + int(y) * img.width) * 4;
    var r = img.pixels[index];
    var g = img.pixels[index+1];
    var b = img.pixels[index+2];
    var c = color(r,g,b);
    return new Circle(x, y, color(c));
  } else {
    return null;
  }
}var circles = [];
let img;
let spots = [];
function preload() {
  img = loadImage("apple.jpg");
}
function setup() {
  createCanvas(626,  626);
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let index = x + y * img.width;
      let color = img.pixels[index*4];
      let b = brightness([color]);
      if (b < 10) {
        spots.push(createVector(x, y));
      }
    }
  }
  console.log(spots.length);
}
function draw() {
  background(0);
  frameRate(60)
  var total = 5;
  var count = 0;
  var attempts = 0;
  while (count < total) {
    var newC = newCircle();
    if (newC !== null) {
      count++;
    }
    attempts++;
    if (attempts > 30) {
      noLoop();
      console.log("finished");
      break;
    }
  }
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
          if (circle !== other) {
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;
            if (d - 2 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }
    circle.show();
    circle.grow();
  }
}
function newCircle() {
  var r = int(random(0, spots.length));
  var spot = spots[r];
  var x = spot.x;
  var y = spot.y;
  
  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    if (d < circle.r + 1) {
      valid = false;
      break;
    }
  }
  if (valid) {
  } else {
  }
}let vehicles = [];
let slider1;
let slider2;
let slider3;
function setup() {
  let text = createP("Drag the mouse to generate new vehicles.");
  text.position(10, 365);
  createCanvas(640, 360);
  for (let i = 0; i < 20; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }
  slider1 = createSlider(0, 8, 4);
  slider2 = createSlider(0, 8, 4);
  slider3 = createSlider(10, 160, 24);
}
function draw() {
  background(51);
  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].applyBehaviors(vehicles);
    vehicles[i].update();
    vehicles[i].borders();
    vehicles[i].display();
  }
}
function mouseDragged() {
}let debug = true;
let flowfield;
let vehicles = [];
function setup() {
  let text = createP("Hit space bar to toggle debugging lines.<br>Click the mouse to generate a new flow field.");
  text.position(10, 365);
  createCanvas(640, 360);
  flowfield = new FlowField(20);
  for (let i = 0; i < 50; i++) {
    vehicles.push(new Vehicle(random(width), random(height), random(2, 5), random(0.1, 0.5)));
  }
}
function draw() {
  background(51);
  if (debug) flowfield.display();
  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].follow(flowfield);
    vehicles[i].run();
  }
}
function keyPressed() {
  if (key == ' ') {
    debug = !debug;
  }
}
function mousePressed() {
  flowfield.init();
}let vehicle;
function setup() { 
  createCanvas(400, 400);
  vehicle = new Vehicle(200, 200);
} 
function draw() { 
  background(120);
  let target = createVector(mouseX, mouseY);
  vehicle.arrive(target);
  vehicle.update();
  vehicle.display();
}let vehicle;
function setup() { 
  createCanvas(400, 400);
  vehicle = new Vehicle(200, 200);
} 
function draw() { 
  background(120);
  let target = createVector(mouseX, mouseY);
  vehicle.seek(target);
  vehicle.update();
  vehicle.display();
}let systems = [];
let angle = 0;
function setup() {
  createCanvas(700, 550, WEBGL);
}
function draw() {
  background(170, 155, 255);
  translate(-width/2, -height/2);
  rotateY(angle);
  angle+=0.05;
  for (let p of systems){
    let helium = createVector(0, -0.2);
    let wind = createVector(random(-1,1),0);
    p.applyForce(wind);
    p.applyForce(helium);
    p.addBalloon();
    p.run();
  }
}
function mousePressed() {
  systems.push(new BalloonSystem(createVector(mouseX, mouseY)));
}
let system;
let nxoff = 0;
let nyoff = 10000;
function setup() {
  createCanvas(700, 550);
  system = new BalloonSystem();
}
function draw() {
  background(170, 155, 255);
  system.addBalloon();
  let helium = createVector(0, -0.2);
  system.applyForce(helium);
  nxoff += 0.01;
  let c = map(noise(nxoff), 0, 1, -0.09, 0.09);
  nyoff += 0.01;
  let d = map(noise(nyoff), 0, 1, 0.003, 0.15);
  stroke(100);
  strokeWeight(1);
  let wind = createVector(c, d);
  if(mouseIsPressed){
    for (let j = 100; j < width-100; j += 5) {
      line(j, 0, c * 1000 + j, d * 1000);
    }
    system.applyForce(wind);
  }
  system.run();
}
function mouseDragged() {
}
let systems = [];
function setup() {
  createCanvas(700, 550);
}
function draw() {
  background(170, 155, 255);
  for (let p of systems){
    let helium = createVector(0, -0.2);
    let wind = createVector(random(-1,1),0);
    p.applyForce(wind);
    p.applyForce(helium);
    p.addBalloon();
    p.run();
  }
}
function mousePressed() {
  systems.push(new BalloonSystem(createVector(mouseX, mouseY)));
}
let m = [];
let nxoff = 0;
let nyoff = 10000;
function setup() {
  createCanvas(700, 550);
  for (let i = 0; i < 5; i++) {
    m[i] = new Balloon(random(100, width - 100), height / 2);
  }
}
function draw() {
  background(170, 155, 255);
  nxoff += 0.01;
  let c = map(noise(nxoff), 0, 1, -0.09, 0.09);
  nyoff += 0.01;
  let d = map(noise(nyoff), 0, 1, 0.003, 0.15);
  stroke(100);
  point(nxoff, c)
  strokeWeight(1);
  for (let j = 100; j < width-100; j += 5) {
    line(j, 0, c * 1000 + j, d * 1000);
  }
  let wind = createVector(c, d);
  for (let i = 0; i < m.length; i++) {
    let drag = m[i].velocity.copy();
    drag.mult(-1);
    drag.normalize();
    drag.mult(0.005);
    
    m[i].applyForce(drag);
    m[i].applyForce(helium);
    m[i].applyForce(wind);
    m[i].run();
  }
}
function mouseDragged() {
    m.push(new Balloon(mouseX, mouseY));
}function setup() { 
  createCanvas(400, 400);
  getData();
} 
function getData() {
              
              function(response) {
      					for(var i = 0; i < response.length; i++) {
                 	ellipse(response[i].x, response[i].y, 20, 20); 
                }
				        setTimeout(getData, 100);
      				});
		
}
function draw() { 
  fill(0,0,0);
}
function mousePressed() {  
   ellipse(mouseX, mouseY, 20, 20); 
}function setup() {
	createCanvas(400, 400);
}
function getData(){
          function(response) {
    for(var i = 0; i <response.length; i++){
      ellipse(response[i].x, response[i].y, 20, 20)
    }
    setTimeout(getData, 100);
  });
}
function draw() {
	fill(0, 0, 0);
}
function mousePressed() {
	console.log("p");
	ellipse(mouseX, mouseY, 20, 20);
let particles = [];
function setup() {
  createCanvas(640, 360);
}
function draw() {
  background(51);
  particles.push(new Particle(createVector(width / 2, 20)));
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.run();
    if (p.isDead()) {
      p = new Particle(createVector(width / 2, 20));
    }
  }
}let angle = 0; 
let aVelocity = 0;
let a = 0;
let x;
let mouseXAction;
let mouseYAction;
let y;
function setup() {
  createCanvas(800, 600, WEBGL);
  rectMode(CENTER);
}
function draw() {
  ambientLight(200);
  
  var dirX = (mouseX / width - 0.5) * 2;
  var dirY = (mouseY / height - 0.5) * 2;
  directionalLight(255, 0, 0, dirX, -dirY, 0.25);
  
  ambientMaterial(130);
  background(250); 
  mouseXAction = map(mouseX, 0, width, -PI/2, PI/2);
  if (mouseX < width/2) {
  mouseYAction = map(mouseY, 0, height, -PI/2, PI/2);
  } else if (mouseX > width/2) {
  mouseYAction = map(mouseY, 0, height, PI/2, -PI/2); 
  }
  rotateY(mouseXAction);
  rotateZ(mouseYAction);
  for(let i = 0; i < 30; i ++) {
    push();
    rotateX(angle+i/5);
    translate(i*10-200,0);
    box(3, 5*i, 5*i);
    pop();
  }
  
  a += 0.03; 
  x = PI/15 * sin(a);
  aVelocity = tan(x);
  angle += aVelocity;
 
  if(aVelocity > 0){
  y = tan(x)
  } else {
  y = -tan(x)
  }
}let angle = 0; 
let aVelocity = 0;
let a = 0;
let x;
let mouseXAction;
let mouseYAction;
let y;
function setup() {
  createCanvas(800, 600, WEBGL);
  rectMode(CENTER);
}
function draw() {
  ambientLight(200);
  
  var dirX = (mouseX / width - 0.5) * 2;
  var dirY = (mouseY / height - 0.5) * 2;
  directionalLight(255, 0, 0, dirX, -dirY, 0.25);
  
  ambientMaterial(230);
  background(250); 
  mouseXAction = map(mouseX, 0, width, -PI/2, PI/2);
  if (mouseX < width/2) {
  mouseYAction = map(mouseY, 0, height, -PI/2, PI/2);
  } else if (mouseX > width/2) {
  mouseYAction = map(mouseY, 0, height, PI/2, -PI/2); 
  }
  rotateY(0.5);
  rotateZ(-0.2);
  push();
  rotateX(angle);
  box(30, 250, 250);
    beginShape(LINES);
    noFill();
    stroke(100, 100, 100);
    vertex(-y * 1000 - 100, 0, 0);
    vertex(y * 1000 + 100, 0, 0);
    endShape();
  pop();
  
  
  a += 0.03; 
  x = PI/15 * sin(a);
  aVelocity = tan(x);
  angle += aVelocity;
 
  if(aVelocity > 0){
  y = tan(x)
  } else {
  y = -tan(x)
  }
   console.log(y);
let particles = [];
let attractors = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);
  for(var i = 0; i< 50; i++){
    particles.push(new Particle(width/2, height, 1));
  }
}
function draw() {
  for(var i = 0; i < particles.length; i++){
    let gravity = createVector(0, 0.1*particles[i].mass);
  }
  if(mouseIsPressed){
    attractors.push(new Attractor(mouseX, mouseY, 1, 1));
	}
  for(var i = 0; i < particles.length; i++){
    let f = createVector();
    for(var j = 0; j < attractors.length; j++){
      f = attractors[j].calculateAttraction(particles[i]);
    }
    particles[i].applyForce(f);
    particles[i].update();
    particles[i].edges();
    particles[i].render();
  }
}
let movers = [];
let attractor;
function setup() {
  createCanvas(640, 360);
  for (let i = 0; i < 20; i++) {
    movers.push(new Mover(random(0.1, 2), random(width), random(height)));
  }
  attractor = new Attractor();
}
function draw() {
  background(51);
  attractor.display();
  for (let i = 0; i < movers.length; i++) {
    let force = attractor.calculateAttraction(movers[i]);
    movers[i].applyForce(force);
    movers[i].update();
    movers[i].display();
  }
}let angle = 0; 
let aVelocity = 0;
let a = 0;
let x;
function setup() {
  createCanvas(800, 600);
  rectMode(CENTER);
}
function draw() {
  background(180); 
  translate(width/2, height/2);
  rotate(angle);
  rect(0, 0, 400, 400);
  angle += aVelocity;
  
  a += 0.03; 
  x = PI/15 * sin(a);
  aVelocity = tan(x);
  console.log(aVelocity);
}let a = 0;
let angle = 0;
let aVelocity = 0;
let aAcceleration;
function setup() { 
  createCanvas(400, 400);
  rectMode(CENTER);
} 
function draw() { 
  background(220);
  translate(width/2, height/2);
  rotate(angle);
  rect(0, 0, 10, 300);
  aAcceleration = tan(a)
  a += 0.0001
  
  angle += aVelocity;
  aVelocity += aAcceleration;
var physics;
var chain;
function setup() {
  createCanvas(640,360);
  physics=new VerletPhysics2D();
  physics.addBehavior(new GravityBehavior(new Vec2D(0,0.5)));
  physics.setWorldBounds(new Rect(0,0,width,height));
  
  chain = new Chain(180, 20, 16, 0.2);
}
function draw() {
  physics.update();
  background(51);
  physics.update();
  chain.updateTail(mouseX, mouseY);
  chain.display();
}
function mousePressed() {
  chain.contains(mouseX, mouseY);
}
function mouseReleased() {
  chain.release();
}
let bob;
let spring;
function setup() {
  createCanvas(640, 360);
  setFrameRate(60);
  spring = new Spring(width / 2, 10, 100);
  bob = new Bob(width / 2, 100);
}
function draw() {
  background(51);
  let gravity = createVector(0, 2);
  bob.applyForce(gravity);
  spring.connect(bob);
  spring.constrainLength(bob, 30, 200);
  bob.update();
  bob.display();
  spring.display();
}
function mousePressed() {
  bob.handleClick(mouseX, mouseY);
}
function mouseDragged() {
  bob.handleDrag(mouseX, mouseY);
}
function mouseReleased() {
  bob.stopDragging();
Mimi Yin NYU-ITP
Circular Pathways with Controls
let x, y;
let px, py;
let a;
let aspeed;
let yfreq;
let range;
let yscl;
let centerX, centerY;
function setup() {
  createCanvas(1200, 800);
  frameRate(10);
  angle = 0;
  aspeed = 0.01;
  yfreq = 1;
  range = width/4;
  yscl = 1;
  centerX = width/2;
  centerY = height/2;
  background(0);
}
function draw() {
  background(0, 10);
  
  angle += aspeed;
  range = 400;
  x = cos(angle)*range + centerX;
  y = sin(angle*yfreq)*range*yscl + centerY;
	
	stroke(255, 64);
  strokeWeight(3);
  if(px) line(px, py, x, y);
	
  px = x;
  py = y;
  
  aspeed = pow(mouseX/(width/2+75), 2);
}
var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff = 0;
var fr;
var particles = [];
var flowfield;
function setup() {
  createCanvas(400, 400);
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
}let m = [];
let nxoff = 0;
let nyoff = 10000;
function setup() {
  createCanvas(1700, 1050);
  for (let i = 0; i < 30; i++) {
    m[i] = new Balloon(random(100, width - 100), height / 2);
  }
}
function draw() {
  background(170, 155, 255);
  nxoff += 0.01;
  let c = map(noise(nxoff), 0, 1, -0.09, 0.09);
  nyoff += 0.01;
  let d = map(noise(nyoff), 0, 1, 0.003, 0.15);
  stroke(100);
  point(nxoff, c)
  strokeWeight(1);
  for (let j = 100; j < width-100; j += 5) {
    line(j, 0, c * 1000 + j, d * 1000);
  }
  let wind = createVector(c, d);
  console.log(wind.x + " & & " + wind.y);
  for (let i = 0; i < 30; i++) {
    let drag = m[i].velocity.copy();
    drag.mult(-1);
    drag.normalize();
    drag.mult(0.005);
    m[i].applyForce(drag);
    m[i].applyForce(helium);
    m[i].applyForce(wind);
    m[i].update();
    m[i].display();
    m[i].checkEdges();
  }
let increment = 0.02;
function setup() {
  size(640,360);
  noLoop();
}
function draw() {
  background(0);
  
  
  loadPixels();
  
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      
      let bright = noise(xoff,yoff)*255;
      
      pixels[x+y*width] = color(bright);
    }
  }
  
  updatePixels();
}let walker = [];
function setup() {
  createCanvas(640, 480);
  for (let i = 0; i < 5; i++) {
    walker[i] = new Walker(0);
  }
  background(0);
}
function draw() {
  for (let j = 0; j < 100; j++) {
  for (let i = 0; i < 1; i++) {
    walker[i].walk();   
    walker[i].render();
  }
  }
Linear motion with controls
let x, y
let px, py;
function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height/2;
  background(0);
  rectMode(CENTER);
}
function draw() {
  
  x += ((width/2)-mouseX)*0.005;
  y += ((height/2)-mouseY)*0.005;
  stroke(255);
  strokeWeight(12);
  line(px, py, x, y);
  px = x;
  py = y;
  fill(255);
  rect(width/2, height/2, 10, 10);
}
function mousePressed(){
  background(0);
  x = mouseX;
  y = mouseY;
  px = x;
  py = y;
}
let walker = [];
function setup() {
  createCanvas(640, 480);
  for (let i = 0; i < 10; i++) {
    walker[i] = new Walker(0);
  }
  background(0);
}
function draw() {
  for (let i = 0; i < 10; i++) {
    walker[i].render();
    walker[i].step();   
    walker[i].constrain(); 
    
    
    
    
    
    
    
    
    
  }
}let walker = [];
let walker1 = [];
let walker2 = [];
let walker3 = [];
let walker4 = [];
let walker5 = [];
let walker6 = [];
let walker7 = [];
let walker8 = [];
function setup() {
  createCanvas(640, 480);
  for (let i = 0; i < 10; i++) {
    walker[i] = new Walker();
    walker1[i] = new Walker();
    walker2[i] = new Walker();
    walker3[i] = new Walker();
    walker4[i] = new Walker();
    walker5[i] = new Walker();
    walker6[i] = new Walker();
    walker7[i] = new Walker();
    walker8[i] = new Walker();
  }
  background(0);
}
function draw() {
  for (let i = 0; i < 10; i++) {
    walker[i].render();
    walker[i].stepRandom();   
    
    walker[i].render();
    walker[i].stepRandom();   
    
    walker1[i].render();
    walker1[i].stepUp();
    
    walker2[i].render();
    walker2[i].stepDown();
    
    walker3[i].render();
    walker3[i].stepLeft();
    
    walker4[i].render();
    walker4[i].stepRight();
    
    walker5[i].render();
    walker5[i].stepUpLeft();
    
    walker6[i].render();
    walker6[i].stepUpRight();
    
    walker7[i].render();
    walker7[i].stepDownLeft();
    
    walker8[i].render();
    walker8[i].stepDownRight();
  }
}let walker = [];
let walker1 = [];
let walker2 = [];
let walker3 = [];
let walker4 = [];
let walker5 = [];
let walker6 = [];
let walker7 = [];
let walker8 = [];
function setup() {
  createCanvas(640, 480);
  for (let i = 0; i < 10; i++) {
    walker[i] = new Walker();
    walker1[i] = new Walker();
    walker2[i] = new Walker();
    walker3[i] = new Walker();
    walker4[i] = new Walker();
    walker5[i] = new Walker();
    walker6[i] = new Walker();
    walker7[i] = new Walker();
    walker8[i] = new Walker();
  }
  background(0);
}
function draw() {
  for (let i = 0; i < 10; i++) {
    walker[i].render();
    walker[i].stepRandom();   
    walker[i].constrain(); 
    
    walker[i].render();
    walker[i].stepRandom();   
    walker[i].constrain();
    
    walker1[i].render();
    walker1[i].stepUp();
    walker1[i].constrain();
    
    walker2[i].render();
    walker2[i].stepDown();
    walker2[i].constrain();
    
    walker3[i].render();
    walker3[i].stepLeft();
    walker3[i].constrain();
    
    walker4[i].render();
    walker4[i].stepRight();
    walker4[i].constrain();
    
    walker5[i].render();
    walker5[i].stepUpLeft();
    walker5[i].constrain();
    
    walker6[i].render();
    walker6[i].stepUpRight();
    walker6[i].constrain();
    
    walker7[i].render();
    walker7[i].stepDownLeft();
    walker7[i].constrain();
    
    walker8[i].render();
    walker8[i].stepDownRight();
    walker8[i].constrain();
  }
let walker = [];
let walker1 = [];
let walker2 = [];
let walker3 = [];
let walker4 = [];
let walker5 = [];
let walker6 = [];
let walker7 = [];
let walker8 = [];
function setup() {
  createCanvas(640, 480);
  for (let i = 0; i < 10; i++) {
    walker[i] = new Walker();
    walker1[i] = new Walker();
    walker2[i] = new Walker();
    walker3[i] = new Walker();
    walker4[i] = new Walker();
    walker5[i] = new Walker();
    walker6[i] = new Walker();
    walker7[i] = new Walker();
    walker8[i] = new Walker();
  }
  background(255);
  fill(0);
  ellipse(width/2, height/2, 480, 480);
}
function draw() {
  
  for (let i = 0; i < 5; i++) {
    walker[i].render();
    walker[i].stepRandom();
    walker[i].constrain();
    
    walker1[i].render();
    walker1[i].stepUp();
    walker1[i].constrain();
    
    walker2[i].render();
    walker2[i].stepDown();
    walker2[i].constrain();
    
    walker3[i].render();
    walker3[i].stepLeft();
    walker3[i].constrain();
    
    walker4[i].render();
    walker4[i].stepRight();
    walker4[i].constrain();
    
    walker5[i].render2();
    walker5[i].stepUpLeft();
    walker5[i].constrain();
    
    walker6[i].render2();
    walker6[i].stepUpRight();
    walker6[i].constrain();
    
    walker7[i].render2();
    walker7[i].stepDownLeft();
    walker7[i].constrain();
    
    walker8[i].render2();
    walker8[i].stepDownRight();
    walker8[i].constrain();
  }
let walker = [];
function setup() {
  createCanvas(320, 240);
  for (let i = 0; i < 20; i++) {
  walker[i] = new Walker();
  }
  background(0);
}
function draw() {
  for (let i = 0; i < 20; i++) {
  walker[i].render();
  walker[i].step();
  }
let walker;
function setup() {
  createCanvas(320, 240);
  walker = new Walker();
  background(127);
}
function draw() {
  for (let i = 0; i < 2; i++) {
  walker.render();
  walker.step();
  }
let walker;
function setup() {
  createCanvas(320, 240);
  walker = new Walker();
  background(127);
}
function draw() {
  for (let i = 0; i < 200; i++) {
  walker.render();
  walker.step();
  }
let submitted = false;
let reset = false;
let dragging = false;
let hovering = false;
let sliderStart = 300;
let sliderEnd = 900;
let offsetX = 0;
let faces = [];
let eSize = 15;
let history = [6.2, 6.125, 5.81, 7.73, 7.9, 3.52, 5.8, 4.5, 5.1, 5.72, 6.69, 5.56, 4.98];
let currentMood = 5;
let currentMoodArray = [];
let averageValue;
function setup() {
  createCanvas(1200, 1400);
  rectMode(CENTER);
  textAlign(CENTER);
}
function draw() {
  background(150, 180, 230);
  noStroke();
  fill(255);
  textSize(35);
  text("Slide To Pick Your Face for Today", width / 2, 45);
  textSize(22);
  text("Submit to see previous inputs and the average face", width / 2 + 5, 70);
  rect(width / 2, newY + 150, width, 30);
  push();
  translate(0, 800);
  fill(255);
  noStroke();
  textSize(20);
  text("NOV", 80, 125);
  let startDay = 3;
  for (let date = 1; date < 31; date++) {
    dateX = (date * 1100 / 7 + 13 + (startDay - 1) * 1100 / 7 + 50);
    dateX %= 1100;
    let counter = Math.floor((date + (startDay - 1)) / 7);
    let dateY = 125 + 100 * counter;
    text(date, dateX, dateY);
  }
  stroke(255);
  strokeWeight(1);
  for (let i = 1100 / 7 - 1100; i <= 1100; i += 1100 / 7) {
    for (let j = 30; j <= 530; j += 100) {
      line(i + 50, 30, i + 50, 530);
      line(0 + 50, j, 1100 + 50, j);
    }
  }
  for (let k = 0; k < history.length; k++) {
    if (history[k] != null) {
      let oldfaceX = k * 1100 / 7 + 230;
      oldfaceX %= 1100;
      let counter2 = Math.floor((k + 20 + 2) / 7);
      let oldfaceY = 60 + 100 * counter2;
      let oldFace = new Face(oldfaceX, oldfaceY, history[k]);
      oldFace.display();
    }
  }
  pop();
  if (!submitted) {
    if (dragging) {
      x = mouseX + offsetX;
    }
    x = constrain(x, sliderStart, sliderEnd);
    stroke(255);
    ellipse(x, y, d);
    strokeWeight(3);
    line(sliderStart, y, sliderEnd, y);
    rect(x2, y2, w, h);
    fill(51);
    textSize(24);
    text("SUBMIT", x2, y3);
  } else {
    fill(51);
    textSize(30);
    noStroke();
    text("THANK FOR YOUR INPUT, PRESS FINISH", x2 + 30, y3 - 50);
  }
  if (submitted) {
  fill(255);
  rect(x2 + 120, y2, w, h);
  fill(51);
  textSize(24);
  text("FINISH", x2 + 120, y3);
}
  currentMood = round(map(x, sliderStart, sliderEnd, 0, 10));
  let f = new Face(100, refY, currentMood);
  f.display();
  f.score();
  let boxX = 125;
  if (submitted) {
    let count = 0;
    for (let i = faces.length - 1; i >= 0; i--) {
      let newX = boxX - 55 + count * 160;
      faces[i].updatePosition(newX, newY);
      faces[i].display();
      count++;
    }
  }
  noFill();
  stroke(255);
  strokeWeight(2);
  rect(boxX, newY + 45, 150, 130);
  rect(boxX + 560, newY + 45, 950, 130);
  fill(255);
  textSize(18);
  noStroke();
  text("YOUR FACE", boxX, newY + 105);
  text("OTHER'S FACES", boxX + 560, newY + 105);
  if (currentMoodArray.length > 0 && submitted) {
    let sum = 0;
    for (let i = 0; i < currentMoodArray.length; i++) {
      sum += currentMoodArray[i];
    }
    averageValue = (sum / currentMoodArray.length);
    let latestFace = new Face(3 * 1100 / 7 + 230, 900, averageValue);
    latestFace.display();
  }
  push();
  translate(100, 600);
  noStroke();
  fill(255);
  textSize(24);
  text("ITP Weekly Mood Trend", 500, -150);
  noFill();
  beginShape();
  strokeWeight(2);
  for (let i = history.length - 7; i < history.length; i++) {
    stroke(255);
    vertex(150 * (i - history.length + 7), -10 * history[i]);
  }
  vertex(150 * 7, -10 * averageValue);
  endShape();
  for (let i = history.length - 7; i < history.length; i++) {
    stroke(255);
    strokeWeight(18);
    pointX = 150 * (i - history.length + 7);
    pointY = -10 * history[i];
    let points = point(pointX, pointY);
    fill(255);
    noStroke();
    textSize(24);
    text(history[i], pointX, pointY + 40);
    if (mouseX > pointX - 13 + 100 && mouseX < pointX + 13 + 100  && mouseY > pointY - 100 + 600 && mouseY < pointY + 100 + 600){
      hovering = true;
      console.log("hovering!");
      ellipse(pointX, pointY - 50, 100, 100);
    }
  }
  stroke(100, 130, 180);
  fill(255, 0, 0);
  strokeWeight(eSize);
  eSize++;
  if(eSize > 30){eSize = 15;}
  point(150 * 7, -10 * averageValue);
  if (currentMoodArray.length > 0 && submitted) {
    fill(100, 130, 180);
    noStroke();
    textSize(33);
    text(averageValue, 150 * 7, -10 * averageValue + 45);
  }
  pop();
}
function mouseOver(){
}
function mousePressed() {
  if (mouseX > x - d / 2 && mouseX < x + d / 2 && mouseY > y - d / 2 && mouseY < y + d / 2) {
    dragging = true;
    offsetX = x - mouseX;
  }
  if (mouseX > x2 - w / 2 && mouseX < x2 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    submitted = true;
    reset = !reset;
    currentMoodArray.push(currentMood);
    console.log("submitted " + submitted);
    faces.push(new Face(120, newY, currentMood));
  }
  if (mouseX > x2 + 120 - w / 2 && mouseX < x2 + 120 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    reset = true;
    currentMood = 5;
    submitted = false;
    x = map(currentMood, 0, 10, sliderStart, sliderEnd);
    console.log("reset " + reset);
  }
}
function mouseReleased() {
  dragging = false;
}
let faces = [];
let x001 = 100;
let dragging = false;
let sliderStart = 300;
let sliderEnd = 900;
let offsetX = 0;
let submitted = false;
let reset = false;
let eye, mouth;
let history = [6.2, 6.125, 5.81, 7.73, 7.9, 3.52, 5.8, 4.5];
let currentMood = 5;
let currentMoodArray = [];
let averageValue;
function setup() {
  createCanvas(1200, 1000);
  rectMode(CENTER);
  textAlign(CENTER);
}
function draw() {
  background(150, 180, 230);
  push();
  translate(0, 30);
  fill(255);
  noStroke();
  textSize(24);
  text("Weekly Data", 155, 560);
  stroke(255);
  noFill();
  strokeWeight(10);
  for (let i = 2; i < history.length; i++) {
    let points = point(100 * i + 100, -10 * history[i] + 600);
  }
  point(100 * history.length + 100, -10 * averageValue + 600)
  beginShape();
  strokeWeight(2);
  for (let i = 2; i < history.length; i++) {
    vertex(100 * i + 100, -10 * history[i] + 600);
  }
  vertex(100 * history.length + 100, -10 * averageValue + 600);
  endShape();
  for (let i = 2; i < history.length; i++) {
    fill(255);
    noStroke();
    textSize(14);
    text(history[i], 100 * i + 100, -10 * history[i] + 620);
  }
  pop();
  fill(255);
  noStroke();
  textSize(20);
  text("NOV", 80, 125);
  let startDay = 3;
  for (let date = 1; date < 31; date++) {
    dateX = (date * 1100 / 7 + 13 + (startDay - 1) * 1100 / 7 + 50);
    dateX %= 1100;
    let counter = Math.floor((date + (startDay - 1)) / 7);
    let dateY = 125 + 100 * counter;
    text(date, dateX, dateY);
  }
  stroke(255);
  strokeWeight(1);
  for (let i = 1100 / 7 - 1100; i <= 1100; i += 1100 / 7) {
    for (let j = 30; j <= 530; j += 100) {
      line(i+50, 30, i+50, 530);
      line(0+50, j, 1100+50, j);
    }
  }
  if (!submitted) {
    if (dragging) {
      x = mouseX + offsetX;
    }
    x = constrain(x, sliderStart, sliderEnd);
    fill(255);
    ellipse(x, y, d);
    strokeWeight(3);
    line(sliderStart, y, sliderEnd, y);
    rect(x2, y2, w, h);
    fill(51);
    textSize(18);
    text("CHECK-IN", x2, y3);
  } else {
    fill(51);
    textSize(30);
    noStroke();
    text("THANK FOR YOUR INPUT, PRESS CHECK-OUT", x2, y3 - 50);
  }
  fill(255);
  rect(x2 + 120, y2, w + 20, h);
  fill(51);
  textSize(18);
  text("CHECK-OUT", x2 + 120, y3);
  for (let k = 0; k < history.length; k++) {
    if (history[k] != null) {
      let oldfaceX = k * 1100 / 7 + 230;
      oldfaceX %= 1100;
      let counter2 = Math.floor((k + 20 + 2) / 7);
      let oldfaceY = 60 + 100 * counter2;
      let oldFace = new Face(oldfaceX, oldfaceY, history[k]);
      oldFace.display();
    }
  }
  currentMood = round(map(x, sliderStart, sliderEnd, 0, 10));
  let f = new Face(100, 800, currentMood);
  f.display();
  f.score();
  if (submitted) {
    let count = 0;
    for (let i = faces.length - 1; i >= 0; i--) {
      faces[i].updatePosition(100 + count * 160, 660);
      faces[i].display();
      count++;
    }
  }
  noFill();
  stroke(255);
  strokeWeight(2);
  rect(155, 705, 150, 130);
  rect(725, 705, 960, 130);
  if (currentMoodArray.length > 0 && submitted) {
    let sum = 0;
    for (let i = 0; i < currentMoodArray.length; i++) {
      sum += currentMoodArray[i];
    }
    averageValue = (sum / currentMoodArray.length);
    console.log(averageValue);
    fill(255);
    noStroke();
    textSize(14);
    text(averageValue, 100 * history.length + 100, -10 * averageValue + 620);
    let latestFace = new Face(1100 / 7 + 230, 60 + 400, averageValue);
    latestFace.display();
  }
  fill(255);
  textSize(18);
  noStroke();
  text("YOUR FACE", 155, 755);
  text("OTHER'S FACES", 715, 755);
  textSize(20);
  text("Instructions: " + "Go aroung the room and have each person submit their mood score for today.", width / 2, 910);
  text("You can see the average face on the calendar and previous faces of today after submission.", width / 2 + 5, 930);
}
function mousePressed() {
  if (mouseX > x - d / 2 && mouseX < x + d / 2 && mouseY > y - d / 2 && mouseY < y + d / 2) {
    dragging = true;
    offsetX = x - mouseX;
  }
  if (mouseX > x2 - w / 2 && mouseX < x2 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    submitted = true;
    reset = !reset;
    currentMoodArray.push(currentMood);
    console.log("submitted " + submitted);
    faces.push(new Face(x001, 730, currentMood));
    x001 += 120;
  }
  if (mouseX > x2 + 120 - w / 2 && mouseX < x2 + 120 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    reset = true;
    currentMood = 5;
    submitted = false;
    x = map(currentMood, 0, 10, sliderStart, sliderEnd);
    console.log("reset " + reset);
  }
}
function mouseReleased() {
  dragging = false;
}
let faces = [];
let x001 = 100;
let dragging = false;
let sliderStart = 300;
let sliderEnd = 900;
let offsetX = 0;
let submitted = false;
let reset = false;
let eye, mouth;
let history = [6.2, 6.125, 5.81, 7.73, 7.9, 3.52, 5.8, 4.5];
let currentMood = 5;
let currentMoodArray = [];
let averageValue;
function setup() {
  createCanvas(1200, 1000);
  rectMode(CENTER);
  textAlign(CENTER);
}
function draw() {
  background(150, 180, 230);
  stroke(255);
  noFill();
  strokeWeight(10);
  for (let i = 0; i < history.length; i++) {
    let points = point(100 * i + 100, -10 * history[i] + 600);
  }
  point(100 * history.length + 100, -10 * averageValue + 600)
  beginShape();
  strokeWeight(2);
  for (let i = 0; i < history.length; i++) {
    vertex(100 * i + 100, -10 * history[i] + 600);
  }
  vertex(100 * history.length + 100, -10 * averageValue + 600);
  endShape();
  for (let i = 0; i < history.length; i++) {
    fill(255);
    noStroke();
    textSize(14);
    text(history[i], 100 * i + 100, -10 * history[i] + 620);
  }
  text(100 * averageValue + 100, -10 * averageValue + 620);
  fill(255);
  noStroke();
  textSize(20);
  text("NOV", 80, 95);
  let startDay = 3;
  for (let date = 1; date < 31; date++) {
    dateX = (date * 1100 / 7 + 13 + (startDay - 1) * 1100 / 7 + 50);
    dateX %= 1100;
    let counter = Math.floor((date + (startDay - 1)) / 7);
    let dateY = 95 + 100 * counter;
    text(date, dateX, dateY);
  }
  stroke(255);
  strokeWeight(1);
  for (let i = 1100 / 7 - 1100; i <= 1100; i += 1100 / 7) {
    for (let j = 100; j <= 500; j += 100) {
      line(i+50, 0, i+50, 500);
      line(0+50, j, 1100+50, j);
    }
  }
  if (!submitted) {
    if (dragging) {
      x = mouseX + offsetX;
    }
    x = constrain(x, sliderStart, sliderEnd);
    fill(255);
    ellipse(x, y, d);
    strokeWeight(3);
    line(sliderStart, y, sliderEnd, y);
    rect(x2, y2, w, h);
    fill(51);
    textSize(18);
    text("SUBMIT", x2, y3);
  } else {
    fill(51);
    textSize(18);
    noStroke();
    text("THANK FOR YOUR INPUT, PRESS RESET", x2, y3 - 50);
  }
  fill(255);
  rect(x2 + 80, y2, w, h);
  fill(51);
  textSize(18);
  text("RESET", x2 + 80, y3);
  for (let k = 0; k < history.length; k++) {
    if (history[k] != null) {
      let oldfaceX = k * 1100 / 7 + 230;
      oldfaceX %= 1100;
      let counter2 = Math.floor((k + 20 + 2) / 7);
      let oldfaceY = 30 + 100 * counter2;
      let oldFace = new Face(oldfaceX, oldfaceY, history[k]);
      oldFace.display();
    }
  }
  currentMood = round(map(x, sliderStart, sliderEnd, 0, 10));
  let f = new Face(100, 780, currentMood);
  f.display();
  f.score();
  if (submitted) {
    let count = 0;
    for (let i = faces.length - 1; i >= 0; i--) {
      faces[i].updatePosition(100 + count * 160, 630);
      faces[i].display();
      count++;
    }
  }
  noFill();
  stroke(255);
  strokeWeight(2);
  rect(155, 675, 150, 130);
  rect(725, 675, 960, 130);
  if (currentMoodArray.length > 0 && submitted) {
    let sum = 0;
    for (let i = 0; i < currentMoodArray.length; i++) {
      sum += currentMoodArray[i];
    }
    averageValue = (sum / currentMoodArray.length);
    console.log(averageValue);
    let latestFace = new Face(1100 / 7 + 230, 30 + 400, averageValue);
    latestFace.display();
  }
  fill(255);
  textSize(18);
  noStroke();
  text("YOUR FACE", 155, 725);
  text("OTHER'S FACES", 715, 725);
  textSize(20);
  text("Instructions: " + "Go aroung the room and have each person submit their mood score for today.", width / 2, 900);
  text("You can see the average face on the calendar and previous faces of today after submission.", width / 2 + 5, 920);
}
function mousePressed() {
  if (mouseX > x - d / 2 && mouseX < x + d / 2 && mouseY > y - d / 2 && mouseY < y + d / 2) {
    dragging = true;
    offsetX = x - mouseX;
  }
  if (mouseX > x2 - w / 2 && mouseX < x2 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    submitted = true;
    reset = !reset;
    currentMoodArray.push(currentMood);
    console.log("submitted " + submitted);
    faces.push(new Face(x001, 700, currentMood));
    x001 += 120;
  }
  if (mouseX > x2 + 80 - w / 2 && mouseX < x2 + 80 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    reset = true;
    currentMood = 5;
    submitted = false;
    x = map(currentMood, 0, 10, sliderStart, sliderEnd);
    console.log("reset " + reset);
  }
}
function mouseReleased() {
  dragging = false;
}
let faces = [];
let x001 = 100;
let dragging = false;
let sliderStart = 300;
let sliderEnd = 900;
let offsetX = 0;
let submitted = false;
let reset = false;
let eye, mouth;
let history = [6.2, 6.125, 5.81, 7.73, 7.9, 3.52, 5.8, 4.5];
let currentMood = 5;
let currentMoodArray = [];
let averageValue;
function setup() {
  createCanvas(1200, 1000);
  rectMode(CENTER);
  textAlign(CENTER);
}
function draw() {
  background(200);
  stroke(255);
  noFill();
  strokeWeight(10);
   for(let i = 0; i < history.length; i++) {
   let points = point(100 * i + 100, -10 * history[i] + 600);
    }
    point(100 * history.length + 100, -10 * averageValue + 600)
    console.log(10 * averageValue + 500);
  beginShape();
  strokeWeight(2);
    for(let i = 0; i < history.length; i++) {
    vertex(100 * i + 100, -10 * history[i] + 600);
    }
    vertex(100 * history.length + 100, -10 * averageValue + 600);
  endShape();
  fill(255);
  noStroke();
  textSize(20);
  text("NOV", 30, 95);
  let startDay = 3;
  for (let date = 1; date < 31; date++) {
    dateX = (date * width / 7 + 13 + (startDay - 1) * width / 7);
    dateX %= width;
    let counter = Math.floor((date + (startDay - 1)) / 7);
    let dateY = 95 + 100 * counter;
    text(date, dateX, dateY);
  }
  stroke(255);
  strokeWeight(1);
  for (let i = width / 7; i < width; i += width / 7) {
    for (let j = 100; j <= 500; j += 100) {
      line(i, 0, i, 500);
      line(0, j, width, j);
    }
  }
  if (!submitted) {
    if (dragging) {
      x = mouseX + offsetX;
    }
    x = constrain(x, sliderStart, sliderEnd);
    fill(255);
    ellipse(x, y, d);
    strokeWeight(3);
    line(sliderStart, y, sliderEnd, y);
    rect(x2, y2, w, h);
    fill(51);
    textSize(18);
    text("SUBMIT", x2, y3);
  } else {
    fill(51);
    textSize(18);
    noStroke();
    text("THANK FOR YOUR INPUT, PRESS RESET", x2, y3 - 50);
  }
  fill(255);
  rect(x2 + 80, y2, w, h);
  fill(51);
  textSize(18);
  text("RESET", x2 + 80, y3);
  for (let k = 0; k < history.length; k++) {
    if (history[k] != null) {
      let oldfaceX = k * width / 7 + 220;
      oldfaceX %= width;
      let counter2 = Math.floor((k + 20 + 2) / 7);
      let oldfaceY = 30 + 100 * counter2;
      let oldFace = new Face(oldfaceX, oldfaceY, history[k]);
      oldFace.display();
    }
  }
  currentMood = round(map(x, sliderStart, sliderEnd, 0, 10));
  let f = new Face(100, 780, currentMood);
  f.display();
  f.score();
  if (submitted) {
    let count = 0;
    for (let i = faces.length - 1; i >= 0; i--) {
      faces[i].updatePosition(100 + count * 160, 630);
      faces[i].display();
      count++;
    }
  }
  noFill();
  strokeWeight(2);
  rect(155, 675, 150, 130);
  rect(725, 675, 960, 130);
  if (currentMoodArray.length > 0 && submitted) {
    let sum = 0;
    for (let i = 0; i < currentMoodArray.length; i++) {
      sum += currentMoodArray[i];
    }
    averageValue = (sum / currentMoodArray.length);
    console.log(averageValue);
    let latestFace = new Face(width / 7 + 220, 30 + 400, averageValue);
    latestFace.display();
  }
  fill(255);
  textSize(18);
  noStroke();
  text("YOUR FACE", 155, 725);
  text("OTHERS FACES", 715, 725);
}
function mousePressed() {
  if (mouseX > x - d / 2 && mouseX < x + d / 2 && mouseY > y - d / 2 && mouseY < y + d / 2) {
    dragging = true;
    offsetX = x - mouseX;
  }
  if (mouseX > x2 - w / 2 && mouseX < x2 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    submitted = true;
    reset = !reset;
    currentMoodArray.push(currentMood);
    console.log("submitted " + submitted);
    faces.push(new Face(x001, 700, currentMood));
    x001 += 120;
  }
  if (mouseX > x2 + 80 - w / 2 && mouseX < x2 + 80 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    reset = true;
    currentMood = 5;
    submitted = false;
    x = map(currentMood, 0, 10, sliderStart, sliderEnd);
    console.log("reset " + reset);
  }
}
function mouseReleased() {
  dragging = false;
}
let faces = [];
let x001 = 100;
let dragging = false;
let over = false;
let sliderStart = 300;
let sliderEnd = 900;
let offsetX = 0;
let submitted = false;
let reset = false;
let eye, mouth;
let fNew;
let history = [6.2, 6.125, 5.81, 7.73, null, 3.52, 5.8];
let currentMood = 5;
let currentMoodArray = [];
function setup() {
  createCanvas(1200, 800);
  rectMode(CENTER);
  textAlign(CENTER);
  
}
function draw() {
  background(200);
  fill(255);
  noStroke();
  textSize(20);
  text("NOV", 30, 95);
  let startDay = 3;
  for (let date = 1; date < 31; date++) {
    dateX = (date * width / 7 + 13 + (startDay - 1) * width / 7);
    dateX %= width;
    let counter = Math.floor((date + (startDay - 1)) / 7);
    let dateY = 95 + 100 * counter;
    text(date, dateX, dateY);
  }
  stroke(255);
  for (let i = width / 7; i < width; i += width / 7) {
    for (let j = 100; j <= 500; j += 100) {
      line(i, 0, i, 500);
      line(0, j, width, j);
    }
  }
  if (reset) {
    x = map(currentMood, 0, 10, sliderStart, sliderEnd);
    reset = !reset;
  }
  if (dragging) {
    x = mouseX + offsetX;
  }
  x = constrain(x, sliderStart, sliderEnd);
  fill(255);
  ellipse(x, y, d);
  strokeWeight(1);
  line(sliderStart, y, sliderEnd, y);
  rect(x2, y2, w, h);
  rect(x2 + 80, y2, w, h);
  fill(51);
  textSize(18);
  text("SUBMIT", x2, y3);
  text("RESET", x2 + 80, y3);
  for (let k = 0; k < history.length; k++){
  let oldFace = new Face(k*width/7+15, 320, history[k]);
  oldFace.display();
  }
  currentMood = map(x, sliderStart, sliderEnd, 0,10 ) ;
  let f = new Face(200, 580, currentMood);
  f.display();
  f.score();
  
  for (let i = 0; i < faces.length; i++) {
    faces[i].display();
  }
  
  if(currentMoodArray.length > 0){
    console.log("updatE");
    	let averageValue = 4;
     let latestFace = new Face(0, 420, averageValue);
    latestFace.display();
  }
}
function mousePressed() {
  if (mouseX > x - d / 2 && mouseX < x + d / 2 && mouseY > y - d / 2 && mouseY < y + d / 2) {
    dragging = true;
    offsetX = x - mouseX;
  }
  if (mouseX > x2 - w / 2 && mouseX < x2 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    submitted = true;
    currentMoodArray.push(currentMood);
    console.log(currentMoodArray);
    console.log("submitted " + submitted);
    faces.push(new Face(x001, 700, random(0,10)));
    x001 += 120;
    console.log(x001);
  }
  if (mouseX > x2 + 80 - w / 2 && mouseX < x2 + 80 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    reset = true;
    currentMood = 5;
    console.log("reset " + reset);
  }
}
function mouseReleased() {
  dragging = false;
}let faces = [];
let submitted = false;
let eye, mouth;
let history = [6.2, 6.125, 5.81, 7.73, null, 3.52, 5.8];
function setup() {
  createCanvas(1000, 600);
  rectMode(CENTER);
  textAlign(CENTER);
}
function draw() {
  background(100);
  fill(255);
  rect(x2, y2, w, h);
  fill(51);
  textSize(18);
  text("SUBMIT", x2, y3);
  for (let k = 0; k < history.length; k++){
  let oldFace = new Face(k*width/7, 420, history[k]);
  oldFace.display();
  }
  
  let f = new Face();
  f.display();
  f.score();
  
  for (let i = 0; i < faces.length; i++) {
    faces[i].display();
    console.log(faces.length);
  }
}
function mousePressed(){
  if (mouseX > x2 - w / 2 && mouseX < x2 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    submitted = true;
    console.log("submitted " + submitted);
    faces.push(new Face(100, 100, random(1,10)));
  }
}
let faces = [];
let dragging = false;
let over = false;
let sliderStart = 300;
let sliderEnd = 900;
let offsetX = 0;
let submitted = false;
let reset = false;
let eye, mouth;
function setup() {
  createCanvas(1000, 500);
  rectMode(CENTER);
  textAlign(CENTER);
  for (let i = 0; i < 10; i++) {
    faces[i] = new Face(100, 100, 100);
  }
}
function draw() {
  background(200);
  if (reset) {
    x = 600;
    reset = !reset;
  }
  if (dragging) {
    x = mouseX + offsetX;
  }
  x = constrain(x, sliderStart, sliderEnd);
  fill(255);
  ellipse(x, y, d);
  strokeWeight(1);
  line(sliderStart, y, sliderEnd, y);
  rect(x2, y2, w, h);
  rect(x2 + 80, y2, w, h);
  fill(51);
  textSize(18);
  text("SUBMIT", x2, y3);
  text("RESET", x2 + 80, y3);
  
  let f = new Face(200, 100, 30);
  f.record(20);
}
function mousePressed() {
  if (mouseX > x - d / 2 && mouseX < x + d / 2 && mouseY > y - d / 2 && mouseY < y + d / 2) {
    dragging = true;
    offsetX = x - mouseX;
  }
  if (mouseX > x2 - w / 2 && mouseX < x2 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    submitted = true;
    console.log("submitted " + submitted);
    eye1 = map(x, sliderStart, sliderEnd, -100, 100);
    mouth1 = map(x, sliderStart, sliderEnd, 190, -110);
    faces.push(new Face());
  }
  if (mouseX > x2 + 80 - w / 2 && mouseX < x2 + 80 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    reset = true;
    console.log("reset " + reset);
  }
}
function mouseReleased() {
  dragging = false;
}
class Face {
  constructor(posX, posY, inp) {
    this.posX = posX;
    this.posY = posY;
    this.data = inp;
    this.eye = map(this.data, 0, 10, -100, 100);
    this.mouth = map(this.data, 0, 10, 190, -110);
    
  }
  record(inp) {
    this.data = inp;
    stroke(255);
    noFill();
    strokeWeight(4);
    push();
    translate(this.posX, this.posY);
    curve(0, this.eye, 0, 0, 40, 0, 40, this.eye);
    curve(70, this.eye, 70, 0, 110, 0, 110, this.eye);
    if (this.eye < -70) {
      line(20, 13, 20, 23);
      line(20, 28, 20, 38);
      line(20, 43, 20, 53);
      line(90, 13, 90, 23);
      line(90, 28, 90, 38);
      line(90, 43, 90, 53);
    }
    curve(35, this.mouth, 35, 40, 75, 40, 75, this.mouth);
    pop();
  }
  display(x) {
    this.x = x;
    this.eye = map(this.x, sliderStart, sliderEnd, -100, 100);
    this.mouth = map(this.x, sliderStart, sliderEnd, 190, -110);
    stroke(255);
    noFill();
    strokeWeight(4);
    push();
    translate(this.posX0, this.posY0);
    curve(0, this.eye, 0, 0, 40, 0, 40, this.eye);
    curve(70, this.eye, 70, 0, 110, 0, 110, this.eye);
    if (this.eye < -70) {
      line(20, 13, 20, 23);
      line(20, 28, 20, 38);
      line(20, 43, 20, 53);
      line(90, 13, 90, 23);
      line(90, 28, 90, 38);
      line(90, 43, 90, 53);
    }
    curve(35, this.mouth, 35, 40, 75, 40, 75, this.mouth);
    pop();
  }
  score(scores) {
    this.scores = scores;
    this.scores = map(this.eye, -100, 100, 0, 10);
    fill(51);
    textSize(24);
    text(round(this.scores), this.posX, this.posY + 50);
  }
  update(eye1, mouth1) {
    this.eye1 = eye1;
    this.mouth1 = mouth1;
    stroke(255);
    noFill();
    strokeWeight(4);
    push();
    translate(this.posX1, this.posY1);
    curve(0, this.eye1, 0, 0, 40, 0, 40, this.eye1);
    curve(70, this.eye1, 70, 0, 110, 0, 110, this.eye1);
    if (this.eye1 < -70) {
      line(20, 13, 20, 23);
      line(20, 28, 20, 38);
      line(20, 43, 20, 53);
      line(90, 13, 90, 23);
      line(90, 28, 90, 38);
      line(90, 43, 90, 53);
    }
    curve(35, this.mouth1, 35, 40, 75, 40, 75, this.mouth1);
    pop();
  }
  scoreUpdate(scoreUpdates) {
    this.x = x;
    this.y = y
    this.scoreUpdates = scoreUpdates;
    this.scoreUpdates = map(this.eye1, -100, 100, 0, 10);
    fill(51);
    textSize(24);
    text(round(score), this.x, this.y);
    console.log(score);
    return score;
  }
}let arr=[1,3,4,5,7,1,4,7,4,6,5];
let sum =0;
let avg = 0;
function setup() { 
  createCanvas(400, 400);
  for(let i=0;i<arr.length;i++) {
    sum += arr[i];
  }
  avg = sum/arr.length;
} 
let dragging = false;
let over = false;
let sliderStart = 300;
let sliderEnd = 900;
let offsetX = 0;
let submitted = false;
let reset = false;
let faces = [];
let eye, mouth;
function setup() {
  createCanvas(1000, 800);
  rectMode(CENTER);
  textAlign(CENTER);
}
function draw() {
  background(200);
  if (reset) {
    x = 600;
    reset = !reset;
  }
  if (dragging) {
    x = mouseX + offsetX;
  }
  x = constrain(x, sliderStart, sliderEnd);
  fill(255);
  ellipse(x, y, d);
  strokeWeight(1);
  line(sliderStart, y, sliderEnd, y);
  rect(x2, y2, w, h);
  rect(x2 + 80, y2, w, h);
  fill(51);
  textSize(18);
  text("SUBMIT", x2, y3);
  text("RESET", x2 + 80, y3);
  let oldFace = new Face();
  oldFace.record(20, 100, 6.2);
  let f = new Face();
  f.display(20, 580);
  f.score();
  if (submitted) {
    f.update(180, 580, eye1, mouth1);
  }
}
function mousePressed() {
  if (mouseX > x - d / 2 && mouseX < x + d / 2 && mouseY > y - d / 2 && mouseY < y + d / 2) {
    dragging = true;
    offsetX = x - mouseX;
  }
  if (mouseX > x2 - w / 2 && mouseX < x2 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    submitted = true;
    console.log("submitted " + submitted);
    eye1 = map(x, sliderStart, sliderEnd, -100, 100);
    mouth1 = map(x, sliderStart, sliderEnd, 190, -110);
  }
  if (mouseX > x2 + 80 - w / 2 && mouseX < x2 + 80 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    reset = true;
    console.log("reset " + reset);
  }
}
function mouseReleased() {
  dragging = false;
}
class Face {
  constructor() {
    this.eye = eye;
    this.mouth = mouth;
    this.x = x;
  }
  record(posX, posY, data) {
    this.posX = posX;
    this.posY = posY;
    this.data = data;
    this.eye = map(this.data, 0, 10, -100, 100);
    this.mouth = map(this.data, 0, 10, 190, -110);
    stroke(255);
    noFill();
    strokeWeight(4);
    push();
    translate(this.posX, this.posY);
    curve(0, this.eye, 0, 0, 40, 0, 40, this.eye);
    curve(70, this.eye, 70, 0, 110, 0, 110, this.eye);
    if (this.eye < -70) {
      line(20, 13, 20, 23);
      line(20, 28, 20, 38);
      line(20, 43, 20, 53);
      line(90, 13, 90, 23);
      line(90, 28, 90, 38);
      line(90, 43, 90, 53);
    }
    curve(35, this.mouth, 35, 40, 75, 40, 75, this.mouth);
    pop();
  }
  display(posX0, posY0) {
    this.posX0 = posX0;
    this.posY0 = posY0;
    this.eye = map(this.x, sliderStart, sliderEnd, -100, 100);
    this.mouth = map(this.x, sliderStart, sliderEnd, 190, -110);
    stroke(255);
    noFill();
    strokeWeight(4);
    push();
    translate(this.posX0, this.posY0);
    curve(0, this.eye, 0, 0, 40, 0, 40, this.eye);
    curve(70, this.eye, 70, 0, 110, 0, 110, this.eye);
    if (this.eye < -70) {
      line(20, 13, 20, 23);
      line(20, 28, 20, 38);
      line(20, 43, 20, 53);
      line(90, 13, 90, 23);
      line(90, 28, 90, 38);
      line(90, 43, 90, 53);
    }
    curve(35, this.mouth, 35, 40, 75, 40, 75, this.mouth);
    pop();
  }
  score() {
    let score = map(this.eye, -100, 100, 0, 10);
    fill(51);
    textSize(24);
    text(round(score), 75, 680);
  }
  update(posX1, posY1, eye1, mouth1) {
    this.eye1 = eye1;
    this.mouth1 = mouth1;
    this.posX1 = posX1;
    this.posY1 = posY1;
    stroke(255);
    noFill();
    strokeWeight(4);
    push();
    translate(this.posX1, this.posY1);
    curve(0, this.eye1, 0, 0, 40, 0, 40, this.eye1);
    curve(70, this.eye1, 70, 0, 110, 0, 110, this.eye1);
    if (this.eye1 < -70) {
      line(20, 13, 20, 23);
      line(20, 28, 20, 38);
      line(20, 43, 20, 53);
      line(90, 13, 90, 23);
      line(90, 28, 90, 38);
      line(90, 43, 90, 53);
    }
    curve(35, this.mouth1, 35, 40, 75, 40, 75, this.mouth1);
    pop();
  }
let dragging = false;
let rollover = false;
let over = false;
let x = 400;
let y = 600;
let d = 20;
let x2 = 400;
let y2 = y + 50;
let y3 = y + 56;
let w = 60;
let h = 20;
let sliderStart = 100;
let sliderEnd = 700;
let offsetX = 0;
let entered = false;
let submit;
function setup() {
  createCanvas(800, 700);
  rectMode(CENTER);
  textAlign(CENTER);
  
  submit = createP('SUBMIT');
  submit.id('enterButton');
  console.log(updateFace);
}
function draw() {
  background(200);
  fill(255);
  noStroke();
  textSize(24);
  text("NOV", 30, 95);
  let startDay = 3;
  for (let date = 1; date < 31; date++) {
    dateX = (date * width / 7 + 20 + (startDay - 1) * width / 7);
    dateX %= width;
    let counter = Math.floor((date + (startDay - 1)) / 7);
    let dateY = 95 + 100 * counter;
    text(date, dateX, dateY);
  }
  stroke(255);
  for (let i = width / 7; i < width; i += width / 7) {
    line(i, 0, i, 500);
    for (let j = 100; j <= 500; j += 100) {
      line(0, j, width, j);
    }
  }
  if (dragging) {
    x = mouseX + offsetX;
  }
  x = constrain(x, sliderStart, sliderEnd);
  fill(255);
  ellipse(x, y, d);
  strokeWeight(1);
  line(sliderStart, y, sliderEnd, y);
  stroke(255);
  noFill();
  strokeWeight(4);
  push();
  translate(10, 550);
  let eye = map(x, sliderStart, sliderEnd, -50, 150);
  curve(0, eye, 0, 50, 40, 50, 40, eye);
  curve(70, eye, 70, 50, 110, 50, 110, eye);
  if (eye < -30) {
    line(20, 63, 20, 73);
    line(20, 78, 20, 88);
    line(20, 93, 20, 103);
    line(90, 63, 90, 100);
    
  }
  let mouth = map(x, sliderStart, sliderEnd, 250, -50);
  curve(35, mouth, 35, 100, 75, 100, 75, mouth);
  pop();
    submit.mousePressed(updateFace);
  
}
function updateFace() {
    this.eye1 = map(x, sliderStart, sliderEnd, -50, 150);
    this.mouth1 = map(x, sliderStart, sliderEnd, 250, -50);
    stroke(255);
    noFill();
    strokeWeight(4);
    push();
    translate(200, 550);
    curve(30, this.eye1, 30, 50, 70, 50, 70, this.eye1);
    curve(100, this.eye1, 100, 50, 140, 50, 140, this.eye1);
    curve(65, this.mouth1, 65, 100, 105, 100, 105, this.mouth1);
    pop();
  console.log(this.eye1);
}
function mousePressed() {
  if (mouseX > x - d / 2 && mouseX < x + d / 2 && mouseY > y - d / 2 && mouseY < y + d / 2) {
    dragging = true;
    offsetX = x - mouseX;
  }
}
function mouseReleased() {
  dragging = false;
let dragging = false;
let over = false;
let sliderStart = 300;
let sliderEnd = 900;
let offsetX = 0;
let submitted = false;
let reset = false;
let eye, mouth;
let fNew;
function setup() {
  createCanvas(1200, 800);
  rectMode(CENTER);
  textAlign(CENTER);
  
}
function draw() {
  background(200);
  fill(255);
  noStroke();
  textSize(20);
  text("NOV", 30, 95);
  let startDay = 3;
  for (let date = 1; date < 31; date++) {
    dateX = (date * width / 7 + 13 + (startDay - 1) * width / 7);
    dateX %= width;
    let counter = Math.floor((date + (startDay - 1)) / 7);
    let dateY = 95 + 100 * counter;
    text(date, dateX, dateY);
  }
  stroke(255);
  for (let i = width / 7; i < width; i += width / 7) {
    for (let j = 100; j <= 500; j += 100) {
      line(i, 0, i, 500);
      line(0, j, width, j);
    }
  }
  if (reset) {
    x = 600;
    reset = !reset;
  }
  if (dragging) {
    x = mouseX + offsetX;
  }
  x = constrain(x, sliderStart, sliderEnd);
  fill(255);
  ellipse(x, y, d);
  strokeWeight(1);
  line(sliderStart, y, sliderEnd, y);
  rect(x2, y2, w, h);
  rect(x2 + 80, y2, w, h);
  fill(51);
  textSize(18);
  text("SUBMIT", x2, y3);
  text("RESET", x2 + 80, y3);
  let oldFace = new Face();
  oldFace.record(width / 7 + 15, 320, 6.2);
  oldFace.record(2 * width / 7 + 15, 320, 6.125);
  oldFace.record(3 * width / 7 + 15, 320, 5.81);
  oldFace.record(4 * width / 7 + 15, 320, 7.73);
  fill(51);
  textSize(18);
  text("Black Friday", 5 * width / 7 + 80, 350);
  oldFace.record(6 * width / 7 + 15, 320, 3.25);
  oldFace.record(15, 420, 5.8);
  let f = new Face();
  f.display(20, 580);
  f.score(75, 680);
  if (submitted) {
    fNew = new Face();
    fNew.update(2 * width/7 + 15, 620, eye1, mouth1);
  }
}
function mousePressed() {
  if (mouseX > x - d / 2 && mouseX < x + d / 2 && mouseY > y - d / 2 && mouseY < y + d / 2) {
    dragging = true;
    offsetX = x - mouseX;
  }
  if (mouseX > x2 - w / 2 && mouseX < x2 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    submitted = true;
    console.log("submitted " + submitted);
    eye1 = map(x, sliderStart, sliderEnd, -100, 100);
    mouth1 = map(x, sliderStart, sliderEnd, 190, -110);
  }
  if (mouseX > x2 + 80 - w / 2 && mouseX < x2 + 80 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    reset = true;
    console.log("reset " + reset);
  }
}
function mouseReleased() {
  dragging = false;
}
class Face {
  constructor() {
    this.x = x;
  }
  record(posX, posY, data) {
    this.posX = posX;
    this.posY = posY;
    this.data = data;
    this.eye = map(this.data, 0, 10, -100, 100);
    this.mouth = map(this.data, 0, 10, 190, -110);
    stroke(255);
    noFill();
    strokeWeight(4);
    push();
    translate(this.posX, this.posY);
    curve(0, this.eye, 0, 0, 40, 0, 40, this.eye);
    curve(70, this.eye, 70, 0, 110, 0, 110, this.eye);
    if (this.eye < -70) {
      line(20, 13, 20, 23);
      line(20, 28, 20, 38);
      line(20, 43, 20, 53);
      line(90, 13, 90, 23);
      line(90, 28, 90, 38);
      line(90, 43, 90, 53);
    }
    curve(35, this.mouth, 35, 40, 75, 40, 75, this.mouth);
    pop();
  }
  display(posX0, posY0) {
    this.posX0 = posX0;
    this.posY0 = posY0;
    this.eye = map(this.x, sliderStart, sliderEnd, -100, 100);
    this.mouth = map(this.x, sliderStart, sliderEnd, 190, -110);
    stroke(255);
    noFill();
    strokeWeight(4);
    push();
    translate(this.posX0, this.posY0);
    curve(0, this.eye, 0, 0, 40, 0, 40, this.eye);
    curve(70, this.eye, 70, 0, 110, 0, 110, this.eye);
    if (this.eye < -70) {
      line(20, 13, 20, 23);
      line(20, 28, 20, 38);
      line(20, 43, 20, 53);
      line(90, 13, 90, 23);
      line(90, 28, 90, 38);
      line(90, 43, 90, 53);
    }
    curve(35, this.mouth, 35, 40, 75, 40, 75, this.mouth);
    pop();
  }
  score(x, y) {
    this.x = x;
    this.y = y
    let score = map(this.eye, -100, 100, 0, 10);
    fill(51);
    textSize(24);
    text(round(score), this.x, this.y);
  }
  update(posX1, posY1, eye1, mouth1) {
    this.eye1 = eye1;
    this.mouth1 = mouth1;
    this.posX1 = posX1;
    this.posY1 = posY1;
    stroke(255);
    noFill();
    strokeWeight(4);
    push();
    translate(this.posX1, this.posY1);
    curve(0, this.eye1, 0, 0, 40, 0, 40, this.eye1);
    curve(70, this.eye1, 70, 0, 110, 0, 110, this.eye1);
    if (this.eye1 < -70) {
      line(20, 13, 20, 23);
      line(20, 28, 20, 38);
      line(20, 43, 20, 53);
      line(90, 13, 90, 23);
      line(90, 28, 90, 38);
      line(90, 43, 90, 53);
    }
    curve(35, this.mouth1, 35, 40, 75, 40, 75, this.mouth1);
    pop();
  }
  scoreUpdate(x, y, inp) {
    this.x = x;
    this.y = y
    let score = map(this.eye1, -100, 100, 0, 10);
    fill(51);
    textSize(24);
    text(round(score), this.x, this.y);
    console.log(score);
    return score;
  }
let allTokens = [];
let ts = 16;
let i = 0;
function preload() {
  let q = "happy";
  let apikey = "5fcc7b03d74d15972346cf84719ad5e5:13:68130021";
    q + "&api-key=" + apikey +
    "&begin_date=20121113";
  loadJSON(url, showSnippets);
}
function setup() {
  createCanvas(800, 800);
  fill(0);
}
function draw() {
  background(255, 5);
  ts++;
  ts %= 48;
  if (allTokens.length > 0) {
    i += 1;
    i %= allTokens.length;
    textSize(ts);
    text(allTokens[floor(i)], random(width), random(height));
  }
}
function showSnippets(data) {
  let docs = data.response.docs;
  console.log(data.response.docs.length);
  let trumps = ["happiness", "fine", "great"];
  let matchTrump = ["felling", "glad", "pleased", "nice"];
  let obamas = ["Obamamama", "Bananabama", "ObamanKenaba"];
  let matchObama = ["Barack", "Obama"];
  for (let i = 0; i < docs.length; i++) {
    let tokens = splitTokens(docs[i].snippet);
    for (var j = 0; j < tokens.length; j++) {
      for (let k = 0; k < matchTrump.length; k++) {
        let m = matchTrump[k];
        if (match(tokens[j], m)) {
          console.log(match(tokens[j], m));
          tokens[j] = trumps[floor(random(trumps.length))];
          break;
        }
        if (k < matchObama.length) {
          let m = matchObama[k];
          if (match(tokens[j], m)) {
            console.log(match(tokens[j], m));
            tokens[j] = obamas[floor(random(obamas.length))];
          }
        }
      }
      shuffle(tokens, true);
    }
    allTokens = concat(allTokens, tokens);
  }
function setup() {
}
function draw() {
}
  for (var i = 0; i < portList.length; i++) {
    console.log(i + " " + portList[i]);
  }
}
function serverConnected() {
  console.log('connected to server.');
}
function portOpen() {
}
}
function portClose() {
}
  if (inString.length > 0) {
    }
  }
function setup() {
}
  inData = inByte;
}
}
function draw() {
  background(0);
  fill(255);
  text("incoming value: " + inData, 30, 30);
}
function mouseDragged() {
  outByte = int(map(mouseY, 0, height, 0, 255));
  console.log(outByte);
}
function keyPressed() {
  }
function setup() {
  
  createCanvas(400, 300);
  background(0x08, 0x16, 0x40);
}
 
  if (inString.length > 0 ) {
  inData = Number(inString);
  }
}
function graphData(newData) {
  var yPos = map(newData, 0, 255, 0, height);
  stroke(0xA8, 0xD9, 0xA7);
  line(xPos, height, xPos, height - yPos);
  if (xPos >= width) {
    xPos = 0;
    background(0x08, 0x16, 0x40);
  } else {
    xPos++;
  }
}
function draw() {
  graphData(inData);
function setup() {
 
  
  createCanvas(400, 300);
}
function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
}
 
}
 
}
 
function portClose() {
}
 
 for (var i = 0; i < portList.length; i++) {
 console.log(i + " " + portList[i]);
 }
}
function draw() {
  background(0);
  fill(255);
  text("sensor value: " + inData, 30, 30);
}var backgroundImg;
var ghost=[];
var ghostNumberP=1;
var ghostNumber=1;
var secondBefore;
var secondNow;
var currentGhostImage;
var noiseX=0;
var noiseY=0;
var noiseSize=1;
var circle2Scale=1;
var circle;
var circle2;
var stateText;
var state=0;
var portName="/dev/cu.usbmodem1411";
var backgroundSound;
var killSound1;
var killSound2;
var xPosition=-100;
var touchBorder=false;
function preload(){
	backgroundImg = loadImage("background.png");
  for(var i=1;i<11;i++){
  	ghost[i]=loadImage(i+".png");
  }
  backgroundSound = loadSound('background2.wav');
  killSound1=loadSound('small kill.wav');
  killSound2=loadSound('big kill.wav');
}
function setup() { 
  createCanvas(600, 400);
  background(backgroundImg,100);
  
	secondBefore=minute()*60+second();
  
	backgroundSound.play();
  backgroundSound.loop();
  backgroundSound.setVolume(2);
  
 } 
function draw() {
  
     
  generateNoise();
  secondNow=minute()*60+second();
  
  if(touchBorder==false && xPosition<=100){
  	xPosition++;
  }
  if(touchBorder == true && xPosition>=-100){
  	xPosition--;
  }
  if(xPosition==100){
  	touchBorder=true;
  }
  if(xPosition==-100){
  	touchBorder=false;
  }
  
  if((secondNow-secondBefore>=5 && state!=2) || state==2){
    generateNewGhost();
  }
  
  
  clear();
  background(backgroundImg,100);
  drawGhost();
  
  if(state ==1){
  	drawCircle1();
    killSound1.play();
  }
  
  if(state==2){
    clear();
    background(backgroundImg,100);
    circle2Scale+=1;
    drawCircle2(); 
      killSound2.play();
  }else{
  	circle2Scale=1;
  }
  generateText();
  
  
}
function generateNewGhost(){
		clear();
  	xPosition=-100;
  	touchBorder=false;
  	background(backgroundImg,100);
  	generateGhostNumber();
  	secondBefore=secondNow;
}
function generateText(){
	  if(state==1){
    	text1();
    }else if(state==2){
    	text2();
    }
}
function generateGhostNumber(){
  ghostNumberP=ghostNumber;
  ghostNumber=floor(random(1,11));  
  if(ghostNumberP==ghostNumber){
  	ghostNumber=floor(random(1,11));
  }
}
function drawGhost(){
  if(ghostNumber==1){
  	currentGhostImage=image(ghost[ghostNumber],80+noiseX+xPosition,100+noiseY,ghost[ghostNumber].width/4*noiseSize,ghost[ghostNumber].height/4*noiseSize);	
  }
  else if(ghostNumber==2){
  	currentGhostImage=image(ghost[ghostNumber],80+noiseX+xPosition,100+noiseY,ghost[ghostNumber].width/2*noiseSize,ghost[ghostNumber].height/2*noiseSize);	
  }
  else if(ghostNumber==3){
  	currentGhostImage=image(ghost[ghostNumber],110+noiseX+xPosition,130+noiseY,ghost[ghostNumber].width/3*noiseSize,ghost[ghostNumber].height/3*noiseSize);	
  }
  else if(ghostNumber==4){
  	currentGhostImage=image(ghost[ghostNumber],100+noiseX+xPosition,80+noiseY,ghost[ghostNumber].width/4*noiseSize,ghost[ghostNumber].height/4*noiseSize);	
  }
  else if(ghostNumber==5){
 		currentGhostImage=image(ghost[ghostNumber],130+noiseX+xPosition,40+noiseY,ghost[ghostNumber].width/4*noiseSize,ghost[ghostNumber].height/4*noiseSize);	
  }else{
  	currentGhostImage=image(ghost[ghostNumber],190+noiseX+xPosition,100+noiseY,ghost[ghostNumber].width/4*noiseSize,ghost[ghostNumber].height/4*noiseSize);	
  }
  
 }
	for (var i=0;i<portList.length;i++){
  	console.log(i+" "+portList[i]);
  }
}
function serverConnected(){
	console.log('connected to server');
}
function portOpen(){
}
  state=data;
}
}
function portClose(){
}
function drawCircle1(){
  noStroke();
  fill(237,117,255);
	circle=ellipse(300+xPosition,250,50,50);
  
}
function drawCircle2(){
	fill(220,0,255);
  push();
  translate(300,250);
  scale(circle2Scale);
  circle2=ellipse(0,0,25,25);
  pop();
}
function generateNoise(){
	if(state==0){
  	noiseX=0;
		noiseY=0;
		noiseSize=1;
  }else if(state==1){
  	noiseX=random(-5,5);
		noiseY=random(-5,5);
		noiseSize=random(1,1.1);
  }else if(state==2){
  	noiseX=-30;
		noiseY=-60;
		noiseSize=1.3;
  }else{
  	noiseX=0;
		noiseY=0;
		noiseSize=1;
  }
}
function text2(){
	  textSize(64);
  	fill(220,0,255);
  	textFont('impact');
    stateText=text("big kill",200,100);  
  	
}
function text1(){
	  textSize(32);
  	fill(237,117,255);
  	textFont('impact');
    stateText=text("small kill",200+xPosition,100);    
}
let apiKey = 'pk.eyJ1IjoiZWZmeWZhbiIsImEiOiJjajkxdnNnZGIzZG1zMndtYmtiNTJzeXR6In0.I3-_XtcuL7WiF7eJZXIENw'
let mapImg;
let emissions;
let clat = 0;
let clng = 0;
let lat;
let lng;
let mag;
let zoom = 1;
let particles = [];
let emiinp;
function preload() {
  mapImg = loadImage(url1 + apiKey)
  emissions = loadStrings('emissions2.csv', callbackEm);
}
function callbackEm(e) {
  console.log(e);
}
function mercX(lng) {
  lng = radians(lng);
  let a = (256 / PI) * pow(2, zoom);
  let b = lng + PI;
  return a * b;
}
function mercY(lat) {
  lat = radians(lat);
  let a = (256 / PI) * pow(2, zoom);
  let b = tan(PI / 4 + lat / 2);
  let c = PI - log(b);
  return a * c;
}
function setup() {
  createCanvas(1024, 512);
  imageMode(CENTER);
}
function draw() {
  clear();
  push();
  translate(width / 2, height / 2);
  image(mapImg, 0, 0);
  let cx = mercX(clng);
  let cy = mercY(clat);
  for (let i = 0; i < emissions.length; i++) {
    let data = emissions[i].split(/,/);
    let lat = data[1];
    let lng = data[2];
    let co2 = data[3];
    let popl = data[4];
    let x = mercX(lng) - cx;
    let y = mercY(lat) - cy;
    let area = co2 * 30000 / popl;
    let d = sqrt(area / PI);
    noStroke();
    fill(255, 0, 0, 100);
    ellipse(x, y, d);
    if (area > emiinp) {
      for (let j = 0; j < 1; j++) {
        let p = new Particle(x, y, d / 5);
        particles.push(p);
      }
      for (let j = particles.length - 1; j >= 0; j--) {
        particles[j].update();
        particles[j].show();
        if (particles[j].finished()) {
          particles.splice(j, 1);
        }
      }
    }
  }
  pop();
}
class Particle {
  constructor(a, b, dia) {
    this.x = a;
    this.y = b;
    this.dia = dia;
    this.vx = random(-dia / 50, dia / 50);
    this.vy = random(-0.05, -dia / 100);
    this.alpha = 255;
  }
  finished() {
    return this.alpha < 0;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 1;
  }
  show() {
    noStroke();
    fill(100, this.alpha);
    ellipse(this.x, this.y, this.dia);
  }
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  ellipse(width / 2, height / 2, 50, 50);
  if (frameCount %= 120) {
    console.log("HI", frameCount);
  }
}let video;
let x = 0;
function setup () {
  createCanvas(800, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(320, 240);
  background(51);
}
function draw () {
  video.loadPixels();
  copy(video, video.width/2, 0, 1, video.height, x, 0, 1, video.height);
  x++;
  x %= width;
}
let apiKey = 'pk.eyJ1IjoiZWZmeWZhbiIsImEiOiJjajkxdnNnZGIzZG1zMndtYmtiNTJzeXR6In0.I3-_XtcuL7WiF7eJZXIENw'
let mapImg;
let emissions;
let clat = 0;
let clng = 0;
let lat;
let lng;
let mag;
let zoom = 1;
let particles = [];
let emiinp;
function preload() {
   mapImg = loadImage(url1 + apiKey)
  emissions = loadStrings('/emissions.csv',callback);
}
function callback(e){
  console.log(e);
}
function mercX(lng) {
  lng = radians(lng);
  let a = (256 / PI) * pow(2, zoom);
  let b = lng + PI;
  return a * b;
}
function mercY(lat) {
  lat = radians(lat);
  let a = (256 / PI) * pow(2, zoom);
  let b = tan(PI / 4 + lat / 2);
  let c = PI - log(b);
  return a * c;
}
function setup() {
  createCanvas(1024, 512);
  imageMode(CENTER);
}
function draw() {
  clear();
  push();
  translate(width / 2, height / 2);
  image(mapImg, 0, 0);
  let cx = mercX(clng);
  let cy = mercY(clat);
  for (let i = 0; i < emissions.length; i++) {
    let data = emissions[i].split(/,/);
    let lat = data[1];
    let lng = data[2];
    let co2 = data[3];
    let x = mercX(lng) - cx;
    let y = mercY(lat) - cy;
    let area = map(co2, 0, 10357, 0, 10357);
    let d = sqrt(area/PI);
    noStroke();
    fill(255, 0, 0, 100);
    ellipse(x, y, d, d);
    if (area > emiinp){
      for (let j = 0; j < 1; j++) {
      let p = new Particle(x, y, d/5);
      particles.push(p);
      }
      for (let j = particles.length - 1; j >= 0; j--) {
      particles[j].update();
      particles[j].show();
      if (particles[j].finished()) {
      particles.splice(j, 1);
      }
    }
  }
  }
  pop();
}
class Particle {
  constructor(a, b, dia) {
    this.x = a;
    this.y = b;
    this.dia = dia;
    this.vx = random(-dia/50, dia/50);
    this.vy = random(-0.05, -dia/100);
    this.alpha = 255;
  }
  finished() {
    return this.alpha < 0;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 1;
  }
  show() {
    noStroke();
    fill(100, this.alpha);
    ellipse(this.x, this.y, this.dia);
  }
}
var bgValue = 0;
function setup() {
  createCanvas(640, 480);
}
  for (var i = 0; i < portList.length; i++) {
      portName = portList[i];
    }
  }
}
  if (inData.length>0) {
    var d = split(inData, ',');
    console.log(d);
    if (d.length == 4) {
    	bgValue = parseInt(d[0]);
      switchState = parseInt(d[1]);
    	console.log("bgValue = " + bgValue);
    	console.log("switchState = " + switchState);      
    }
  }
}
function draw() {
  if (switchState == 1) { 
    background(bgValue/4);
  } else {
    background(255, 0, bgValue/4);
  }
  textSize(32);
  fill(0);
  stroke(0);
  fill(255, 0, 0);
  ellipse(100, 300, 50, 50);
  fill(0, 255, 0);
  ellipse(200, 300, 50, 50);
}
function mousePressed() {
  if (mouseX < width/2) {
  } else {
  }
}
function keyPressed() {
  if (key>=0 && key<=9) {
  }
}
host: api.giphy.com
path: /v1/gifs/search?
api key: J7vAXttU2rke18jNwgdKsm3hPQ2OWhMR
q=rainbow
let apiKey = "&api_key=J7vAXttU2rke18jNwgdKsm3hPQ2OWhMR";
let query = "&q=halloween";
function setup() { 
  noCanvas();
  let url = api + apiKey + query;
  loadJSON(url, gotData);
} 
function gotData(giphy) { 
  for (let i = 0; i < giphy.data.length; i++) {
  createImg(giphy.data[i].images.original.url);
  }
function preload() {
  let q = "happy";
  let time = "20171114"
  let apikey = "afd7f7efd16b43d9bdd3cb1cd0d4441e";
  loadJSON(url, gotData);
}
function setup() { 
  noCanvas();
} 
function gotData(data) {
  let articles = data.response.docs;
  
  for (let i = 0; i < articles.length; i++) {
    createElement('h1', articles[i].headline.main);
    createP(articles[i].snippet);
  }
}
function draw() { 
  background(220);
let url2 = "/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
let data, inp, word;
function setup() {
  noCanvas();
  inp = createInput('type your word');
  var button = createButton('enter');
  button.mousePressed(askWordnik);
}
function askWordnik() {
  let url = url1 + inp.value() + url2;
  loadJSON(url, newData);
}
function newData(data) {
  for (let i = 0; i < data.length; i++){
  createP(data[1].words[1]);
  }
let word = "rainbow"
let url2 = "/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
let data, inp, outp;
function setup() {
  noCanvas();
  
  link = createA('#', word);
  link.mousePressed(askWordnik);
}
function askWordnik() {
  let url = url1 + word + url2;
  loadJSON(url, gotData);
}
function gotData(data) {
  let index1 = floor(random(0, data.length));
  let index2 = floor(random(0, data[index1].words.length));
  word = data[index1].words[index2];
  link.html(word);
let word = "rainbow"
let url2 = "/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
let link;
function setup() {
  noCanvas();
   link = createA('#', word);
   link.mousePressed(askWordnik);
}
function askWordnik() {
  loadJSON(url1 + word + url2, gotData);
}
function gotData(data) {
  console.log(data);
}let lineX = 0;
let issX;
let issY;
function setup() {
  createCanvas(400, 400);
  setInterval(askISS, 1000);
}
function askISS() {
  loadJSON(url, gotData, 'jsonp');
}
function gotData(data) {
  console.log(data);
  let lat = data.iss_position.latitude;
  let long = data.iss_position.longitude;
  
  issX = map(lat, -90, 90, 0, width);
  issY = map(long, -180, 180, 0, height);
}
function draw() {
  background(30);
  fill(255);
  ellipse(issX, issY, 24);
  stroke(255);
  line(lineX, 0, lineX, height);
  lineX += 5;
  if (lineX > width) {
    lineX = 0;
  }
}let weather;
let button;
let city = 'Guangzhou';
let apiKey = '&APPID=f2d43e6c463d6cb45ded587e92dcf0ad';
let units = '&units=metric';
let input;
function setup() {
  createCanvas(400, 400);
  button = select('#submit');
  button.mousePressed(getCity);
  
  input = select('#city');
}
function getCity() {
  let url = api + input.value() + apiKey + units;
  loadJSON(url, gotData);
}
function gotData(data) {
  console.log(data);
  weather = data;
}
function draw() {
  background(220);
  if (weather) {
    ellipse(100, 100, weather.main.temp, weather.main.temp);
    ellipse(200, 100, weather.main.humidity, weather.main.humidity);
  }
}let x = 0;
let spaceData;
function setup() {
  createCanvas(200, 200);
}
function gotData(data) {
  spaceData = data;
}
function draw() {
  background(0);
  stroke(255);
  line(x, 0, x, height);
  x += 1;
  x %= width;
  if (spaceData) {
    randomSeed(20);
    for (let i = 0; i < spaceData.number; i++) {
      fill(255);
      ellipse(random(width), random(height), 10, 10);
    }
  }
}function preload() {
  data = loadJSON("birdsdata.json");
}
function setup() {
  noCanvas();
  let birds = data.birds;
  for (let i = 0; i < birds.length; i++) {
    let key1 = Object.keys(data.birds[i]);
    createElement('h1', key1[i] + ":" + birds[i].family);
    let members = birds[i].members;
    for (let j = 0; j < members.length; j++) {
      
      let key2 = Object.keys(data.birds[j]);
      createDiv(key2[j] + ":" + members[j]);
    }
  }
function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
  
} 
function draw() { 
  background(127, 0, 127);
  
  
  var v = map(latestData,0,1023,50,500); 
  var origV = v;
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
function gotData() {
}
let a;
let b;
let sum;
function setup() { 
  createCanvas(400, 400);
} 
function draw() {
  background(220);
  show = sumCalculator(3, 5);
  text(show, width/2, height/2);
}
function sumCalculator(a, b) { 
  string = a + " + " + b + " = " + sum;
  sum = a + b;
  return string;
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function gotData() {
}
function draw() {
  background(255, 255, 255);
  fill(0, 0, 0);
  var mappedVar = map(latestData, 400, 950, 0, width);
  ellipse(mappedVar, 100, 50, 50);
  text(latestData, 10, 10);
}let portName = '/dev/cu.usbmodem1421';
let v = 0;
function setup() {
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
  
}
function draw() {
  background(127, 0, 127);
  var origV = v;
  console.log(v);
  ellipse(width * .4, height * .4, v * .25 + 10, v * .25 + 10);
  ellipse(width * .6, height * .4, (2500 / v) + 10, (2500 / v) + 10);
  v += random(-5, 5);
  bezier(width * .5, height * .5, v * .6, height * .6, v * .6, height * .8, width * .45, height * .67);
  bezier(width * .3, v * .6 + height / 2, width * .4, height * .8, width * .6, height * .8, width * .7, v * .55 + height / 2);
}
function gotData() {
}let data;
function preload() {
  data = loadJSON("elements.json");
}
function setup() {
  noCanvas();
  
  let elements = data.elementList;
  for (i = 0; i < elements.length; i++) {
    let symbol = elements[i].symbol;
    createElement('h1', symbol);
    let keys = Object.keys(elements[i]);
    for (let j = 0; j < keys.length; j++) {
      let key = keys[j];
      
      let val = elements[i][keys[j]];
      if (key != "symbol") {
        createP(key + ":" + val);
      }
    }
  }
  noLoop();
let flower;
function preload() {
   flower = loadJSON("flowerdata.json");
}
function setup() {
  createCanvas(400, 400);
 
  
}
function draw() {
  background(0);
  
  fill(flower.r, flower.g, flower.b);
  text(flower.name, 10, 50);
let portName = '/dev/cu.usbmodem1421';
let bg = 0;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(bg);
  ellipse(width/2, height/2, bg);
}
function parseData() {
}let slider, slider2;
let angle = 0;
let darkness;
let rise, rise2;
let size, size2;
let r;
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1')
  slider = createSlider(0, 255, 0);
  slider.style('float', 'left');
  slider.position(20, 300);
  slider2 = createSlider(0, 255, 0);
  slider2.style('float', 'left');
  slider2.position(20, 200);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw() {  
  noStroke();
  rect(random(width), random(height), 40, 40);
  ellipse(random(width), random(height), 40, 40);
  
  darkness = map(sin(angle), -1, 1, 10, 255);
  angle += 0.01;
  background(darkness, 255, 255, darkness + 50);
  for (let i = 0; i < width + 50; i += 50) {
    for (let j = 0; j < height + 50; j += 50) {
      noStroke();
      fill(255, 255, 0);
      ellipse(i, j - rise, size);
    }
  }
  rise = map(slider.value(), 0, 255, 0, height);
  size = map(slider.value(), 0, 255, width / 15, 0);
  for (let i = 0; i < width + 50; i += 50) {
    for (let j = 0; j < width + 50; j += 50) {
      noStroke();
      fill(255);
      rectMode(CENTER);
      rect(i, j + rise2, size2, size2);
    }
  }
  rise2 = map(slider2.value(), 0, 255, 0, height);
  size2 = map(slider2.value(), 0, 255, 50, 0);
  
  if (mouseIsPressed) {
    stroke(255, 255, 0);
    strokeWeight(5);
  line(pmouseX, pmouseY, mouseX, mouseY);
  }
}let canvas;
let img;
let col = 200;
function setup() {
  canvas = createCanvas(400, 400);
  canvas.position(0, 0);
  canvas.style('float', 'right');
  canvas.mouseOver(changeColor);
  canvas.mouseOut(changeColorBack);
  
  link.position(400, 50);
  link.style('float', 'right');
  para = createP('Text goes in here!');
  para.position(400, 0);
  para.style('float', 'right');
  img = createImg('W6Cat.jpg');
  img.position(400, 100);
  img.style('float', 'right');
  img.size(300, 200);
}
function changeColor() {
  col = 255;
}
function changeColorBack() {
  col = 200;
}
function draw() {
  background(0);
  noStroke();
  fill(col);
  rectMode(CENTER);
  rect(width / 2, height / 2, 380, 380);
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
}let sliders = [];
let x;
let angle = 0;
function setup() {
  noCanvas();
  for (let i = 0; i < 60; i++) {
    sliders[i] = createSlider(0, 255, 100);
  }
}
function draw() {
  let offset = 0;
  for (let i = 0; i < sliders.length; i++) {
    x = map(sin(angle + offset), -1, 1, 0, 255);
    sliders[i].value(x);
    offset += 0.1;
  }
  angle += 0.05;
let dropzone;
function setup() {
  createCanvas(200, 200);
  background(0);
  
  let dropzone = select('#dropzone');
  dropzone.dragOver(highlight);
}
function highlight() {
  dropzone.style('background-color', '#ccc');
}
let p;
let images = [];
function setup() {
  noCanvas();
  for (let i = 0; i < 5; i++) {
    p = createP('This is a link: ');
    p.style('background-color', '#CCC');
    p.style('padding', '12pt')
    let a = createP('apple');
    a.mousePressed(addPhoto);
    a.parent(p);
  }
  
  let button = select('#clear');
  button.mousePressed(clearStuff);
}
function addPhoto() {
  images.push(img);
  
  img.size(50, 50);
  let paragraph = this.parent();
  img.parent(paragraph);
}
function clearStuff() {
  for(let i = 0; i < images.length; i++) {
   images[i].remove();
  }
function setup() {
  for (let i = 0; i < 10; i++) {
    let x = floor(random(windowWidth));
    let y = floor(random(windowHeight));
    p.position(x, y);
    p.class('apple');
  }
  for (let i = 0; i < 10; i++) {
    let p = createP('bananas');
    let x = floor(random(windowWidth));
    let y = floor(random(windowHeight));
    p.position(x, y);
    p.class('banana');
    p.mousePressed(becomeApple);
  }
}
function becomeApple() {
  this.class('apple');
}let happy = ['rainbow', 'unicorn', 'purple', 'bacteria']
function setup() {
  let canvas = createCanvas(200, 200);
  canvas.parent('canvasp');
  let button = select('#button');
  button.mousePressed(addItem);
}
function addItem() {
  let r = floor(random(0, happy.length));
  let li = createElement('li', happy[r]);
  li.parent('happylist');
}
function draw() {
  background(0);
  ellipse(100, 100, random(100), random(100));
let paragraph;
let paragraphs = [];
function setup() {
  for (let i = 0; i < 100; i++) {
    let crazy = createP('rainbow!');
    crazy.position(random(500), random(500));
  }
  paragraphs = selectAll('p');
  for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].mouseOver(highlight);
    paragraphs[i].mouseOut(unhighlight);
  }
}
function highlight() {
  this.style('padding', '8pt');
  this.style('background-color', '#F0F');
}
function unhighlight() {
  this.style('padding', '0pt');
  this.style('background-color', '#FFF');
}
let para, para2;
let but;
let paragraphs = [];
function setup() {
  createCanvas(400, 100);
  background(0);
  para = select('#unicorn');
  para.mouseOver(changeHighlight);
  paragraphs = selectAll('.rainbow');
  for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style('font-size', '24pt');
    paragraphs[i].mouseOver(changeHighlight);
  }
  but = select('#button');
  but.mousePressed(changeCanvasColor);
}
function changeHighlight() {
  para.style('background-color', '#F0F');
  for (let i = 0; i < paragraphs.length; i++) {
  paragraphs[i].style('background-color', '#F0F');
  }
}
function changeCanvasColor() {
  background(255, 0, 0);
}
var x = 0;
var canvas;
var par;
var slider;
function setup() {
  canvas = createCanvas(200, 200);
  par = createP("This is some text.");
  par.style("background-color", "red");
  par.style("text-decoration", "line-through")
  slider = createSlider(0, 255, 100);
}
function draw() {
  background(slider.value());
  stroke(255);
  line(x, 0, x, height);
  x = x + 3;
  if (x > width) {
    x = 0;
  }
  par.html("The slider is at: " + slider.value());
}var canvas;
var par;
var x = 0;
var button;
function setup() {
  canvas = createCanvas(200, 200);
  par = createP("This is some text.");
  par.mousePressed(changeText);
  button = createButton("change color");
  button.mousePressed(changeColor);
}
function changeText() {
  par.html("NEW TEXT!" + random(100));
  button.html("BUTTON TEXT");
}
function changeColor() {
  background(random(255), 0, random(255));
}
function draw() {
let bgcolor;
let txt;
let txt2;
let button;
function setup() {
  txt = createP('one two one two three one two three four');
  txt.mouseOver(changeStyle);
  txt.mouseOut(revertStyle);
  createCanvas(400, 400);
  bgcolor = color(51);
  txt2 = createP('some text');
  txt2.style('background-color', 'purple');
  button = createButton('go');
  button.mousePressed(changeStyle);
}
function changeStyle() {
  txt.style('padding', '24px');
  txt.style('background-color', 'pink');
}
function revertStyle() {
  txt.style('padding', '15px');
}
function draw() {
  background(220);
  ellipse(width / 2, height / 2, 50, 50);
let canvas;
let x = 100;
let y = 100;
let slider;
let nameInput;
let nameP;
let button;
function setup() {
  canvas = createCanvas(200, 200);
  canvas.mouseOver(overpara);
  canvas.mouseOut(outpara);
  canvas.mousePressed(changeColor);
  canvas.position(0, 200);
  nameP = createP('your name!');
  nameP.mouseOver(overpara);
  nameP.mouseOut(outpara);
  slider = createSlider(10, 100, 47);
  nameInput = createInput('type your name');
  button = createButton("GO");
  nameInput.changed(updateText);
  
}
function draw() {
  background(255);
  fill(255, 0, 0);
  rectMode(CENTER);
  rect(x, y, slider.value(), 20);
  text(nameInput.value(), 20, 20);
}
function updateText() {
  nameP.html(nameInput.value());
}
function changeColor() {
  fill(random(0, 255));
}
function overpara() {
  nameP.html('your mouse is over me!');
  button.html();
}
function outpara() {
  nameP.html('your mouse is out');
let canvas;
let x = 100;
let y = 100;
let slider;
let input;
let namaP;
function setup() {
  canvas = createCanvas(200, 200);
  canvas.position(0, 200);
  
  nameP = createP('your name!');
  
  slider = createSlider(10,100,47);
  
  input = createInput('type your name');
  
}
function draw() {
  background(255);
  fill(255, 0, 0);
  rectMode(CENTER);
  
  rect(x, y, slider.value(), 20);
  
  text(input.value(), 20, 20);
let canvas;
let h1;
let x = 100;
let y = 100;
let bgcolor
let button;
function setup() {
  canvas = createCanvas(200, 200);
  canvas.position(200, 200);
  h1 = createElement('h1', 'waitwaitwait');
  
  bgcolor = color(200);
  button = createButton("GOGOGO");
  
  button.mousePressed(changeColor);
}
function changeColor(){
  bgcolor = color(random(255));
}
  
function mousePressed() {
  h1.html("nownownow")
  createP("number" + round(random(0, 16)));
}
function draw() {
  background(bgcolor);
  fill(255, 0, 0);
  rect(x, y, 20, 20);
  x += random(-5, 5);
  h1.position(x, y);
}let balls = [];
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 6; i++) {
    balls[i] = new Ball(random(20, width - 20), random(20, height - 20), 50);
  }
}
function draw() {
  background(120);
  for (let i = 0; i < balls.length; i++) {
    balls[i].display();
    balls[i].move();
    balls[i].bounce();
    for (let j = 0; j < balls.length; j++) {
      if (i != j && balls[i].intersect(balls[j])){
          balls[i].state = 1;
        } else if (balls[i].state == 1 && !balls[i].intersect(balls[j])) {
          balls[i].state = 2;
        }
        if (balls[i].state == 2) {
          balls[i].changeColor();
          balls[i].state = 0;        
      }
    }
  }
}let balls = [];
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 4; i++) {
    balls[i] = new Ball(random(20, width - 20), random(20, height - 20), 20);
  }
}
function draw() {
  background(120);
  for (let i = 0; i < balls.length; i++) {
    for (let j = 0; j < balls.length; j++) {
      balls[i].display();
      balls[i].move();
      balls[i].bounce();
      if (i != j && balls[i].intersect(balls[j])) {
        balls[i].changeColor();
      }
    }
  }
}let triangles = [];
let b;
function setup() {
  createCanvas(400, 400);
  createElement('h3','Random Number');
  frameRate(10);
  let x1 = random(2 * width / 3, width);
  y1 = random(0, height / 3);
  x2 = random(2 * width / 3, width);
  y2 = random(0, height / 3);
  x3 = 0;
  y3 = height;
  for (i = 0; i < 3; i++) {
    triangles[i] = new Triangle(x1, y1, x2, y2, x3, y3);
  }
}
function mousePressed() {
  createP("just breathe" + round(random(0,16)));
  
  b = new Triangle(mouseX, mouseY, random(width / 3, 2 * width / 3), random(height / 3, 2 * height / 3), random(width / 3, 2 * width / 3), random(height / 3, 2 * height / 3));
  fill(0, random(200, 255), 0, random(10, 100));
  triangles.push(b);
  if (triangles.length > 10) {
    triangles.splice(0, 1);
    console.log(triangles.length);
  }
}
function draw() {
  background(230);
  for (i = 0; i < triangles.length; i++) {
    triangles[i].displayBlue();
    triangles[i].displayRed();
  }
}let trees;
function setup() { 
  createCanvas(500, 500);
  angleMode(DEGREES);
  trees = new Tree(200, 400, 150);
} 
function draw() { 
  background(220);
  stroke(100);
  trees.branch();
  
}
let img;
function preload() {
  img = loadImage('emoji5.jpg')
}
function setup() {
  createCanvas(600, 300);
  emojis = new Emoji(1, 1);
}
function draw() {
}
function mousePressed() {
    emojis.display(); 
}let balls = [];
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    balls[i] = new Ball(random(10, width - 10), random(10, height - 10), 20);
  }
}
function draw() {
  background(120);
  
  for (let i = balls.length - 1; i >= 0; i--) {
    	balls[i].display();
    	balls[i].move();
    	balls[i].bounce();
    }
  for (let i = balls.length - 1; i >= 0; i--) {  
    	for (let j = balls.length - 1; j >= 0; j--) {
      	if (i != j && balls[i] != null && balls[i].intersect(balls[j])) {
        	balls.splice(i, 1);
          
        	balls.splice(j, 1);
          console.log(balls.length);
          break;
        }
    	}
    }
  }let balls = [];
function setup() {
  createCanvas(400, 400);
  for (let i = 9; i >= 0; i--) {
    balls[i] = new Ball(random(20, width - 20), random(20, height - 20), 20);
  }
  
}
function draw() {
  background(120);
  for (let i = balls.length - 1; i >= 0; i--) {
    balls[i].display();
    balls[i].move();
    balls[i].bounce();
  }
   for (let i = balls.length - 1; i >= 0; i--) {
     for (let j = balls.length - 1; j >= 0; j--) {
       if (i != j && balls[i].intersect(balls[j])) {
         balls[i].changeColor();
         balls[j].changeColor();
       } else {
         balls[i].changeColorBack();
         balls[j].changeColorBack();
       }
     }
   }
}let bubbles = [];
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 20; i++) {
  bubbles[i] = new Bubble(random(width), random(height), 30);
  }
  }
function draw() {
  background(120);
  
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
    for (let j = 0; j < bubbles.length; j++) {
      if (i != j && bubbles[i].intersect(bubbles[j])) {
        bubbles[i].changeColor();
        bubbles[j].changeColor();
    }
  }
}let bubbles = [];
function setup() {
  createCanvas(400, 400);
}
function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY, random(40)));
}
function draw() {
  background(120);
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].display();
    let f = bubbles[i].finished;
    if (f) {
      bubbles.splice(i, 1);
    }
  }
}let bubbles = [];
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    bubbles[i] = new Bubble(random(width), random(height), random(20,40));
    console.log(bubbles);
  }
}
function mouseDragged() {
  bubbles.push(new Bubble(mouseX, mouseY,random(40)));
}
function mousePressed() {
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked();
  }
}
function draw() {
  background(120);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
  if (bubbles.length > 50) {
  }
}let bubbles = [];
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    bubbles[i] = new Bubble(random(width), random(height));
    console.log(bubbles);
  }
}
function mouseDragged() {
  bubbles.push(new Bubble(mouseX, mouseY));
}
function draw() {
  background(120);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
  if (bubbles.length > 50) {
  }
}
  this.x = a;
  this.y = b;
  this.display = function() {
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, 24);
  };
  this.move = function() {
    this.x += random(-1, 1);
    this.y += random(-1, 2);
  }
}
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++) {
    bubbles[i] = new Bubble();
    console.log(bubbles);
  }
}
function draw() {
  background(120);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
}
  this.x = random(0, width);
  this.y = random(0, 200);
  this.display = function() {
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, 24);
  };
  this.move = function() {
    this.x += random(-1, 1);
    this.y += random(-1, 2);
  }
}
let i;
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    bubbles[i] = {
      x: random(0, 400),
      y: random(0, 200),
      display: function() {
        stroke(255);
        strokeWeight(4);
        noFill();
        ellipse(this.x, this.y, 24);
      },
      move: function() {
        this.x += random(-1, 1);
        this.y += random(-1, 2);
      }
    }
  }
  console.log(bubbles);
}
function draw() {
  background(120);
  for (let i = 0; i < 10; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
}let bubble = {
  x: 300,
  y: 200,
  display: function() {
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, 24);
  },
  move: function() {
    this.x += random(-1, 1);
    this.y += random(-1, 2);
  }
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  bubble.display();
  bubble.move();
}var ball = {
  x: 1,
  y: 1,
  xspeed: 4,
  yspeed: -3
}
var ball2 = {
  x: 10,
  y: 10,
  xspeed: 9,
  yspeed: -5
}
var list = [ball, ball2];
console.log(list);
function setup() {
  createCanvas(600, 400);
}
function draw() {
  background(0);
  for (let i = 0; i < list.length; i++) {
    move(list[i]);
    bounce(list[i]);
    display(list[i]);
  }
}
function move(b) {
  b.x += b.xspeed;
  b.y += b.yspeed;
}
function bounce(b) {
  if (b.x > width || b.x < 0) {
    b.xspeed = b.xspeed * -1;
  }
  if (b.y < 0 || b.y > height) {
    b.yspeed = b.yspeed * -1
  }
}
function display(b) {
  stroke(255);
  strokeWeight(4);
  fill(random(255), 0, 0);
  ellipse(b.x, b.y, 24, 24);
}let balls = [];
function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 20; i++) {
    balls[i] = new Ball(1, 1, 1, random(-2, 2), random(-2, 2));
  }
}
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++) {
    balls[i].display();
  }
}
function mousePressed(){
   balls.push(new Ball(mouseX, mouseY, 1, 2, 2));
}
let pick = false;
let iRandom, uRandom;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  cw = width / nc;
  rh = height / nr;
  for (let i = 0; i < nc; i++) {
    for (let u = 0; u < nr; u++) {
      x = i * cw
      y = u * rh
      fill(255);
      rect(x, y, cw, rh);
      if (pick) {
        fill(0, 0, 255);
        rect(iRandom * cw, uRandom * rh, cw, rh);
      }
    }
  }
}
function mouseClicked() {
  pick = true;
  iRandom = floor(random(0, nc));
  uRandom = floor(random(0, nr));
}let a, b, c;
let d, e, f;
function setup() {
  createCanvas(600, 600);
  a = milesToKm(26.3);
  b = milesToKm(100);
  c = milesToKm(472);
  d = yuanToUSD(100);
  e = yuanToUSD(500);
}
function draw() {
  textSize(30);
  text("km" + a, 100, 100);
  text(b, 100, 200);
  text(c, 100, 300);
  text("USD" + d, 100, 400);
  text(e, 100, 500);
}
function milesToKm(miles) {
  let km = miles * 1.6;
  return km;
}
function yuanToUSD(yuan) {
  let USD = yuan / 6.53;
  return USD;
}let leaves = [];
function setup() {
  createCanvas(600, 300);
  for (let i = 9; i >= 0; i--) {
    leaves[i] = new Leaf();
  }
}
function draw() {
  background(255);
  frameRate(5);
  for (let i = leaves.length - 1; i >= 0; i--) {
    leaves[i].display();
    leaves[i].move();
  }
}
function mousePressed() {
  for (let i = leaves.length - 1; i >= 0; i--) {
    if (leaves[i].checkMouse()) {
      leaves.splice(i, 1);
    }
  }
}let dragging = false; 
let pressed = false;
let x = 50;
let y = 70;
let d = 60;
let sliderStart, sliderEnd, theta;
var offsetX = 0;
function setup() {
	createCanvas(600, 300);
	rectMode(CENTER);
	sliderStart = 50;
	sliderEnd = width - 50;
	theta = 270;
}
function draw() {
	background(255,150);
	frameRate(4);
	if (dragging) {
		x = mouseX + offsetX;
		x = constrain(x, sliderStart, sliderEnd);
		y = 120 - 80 * sin(map(x, 0, width, 2.65, 0.5));
	}
	noStroke();
	if (dragging) {
		fill(230, 100, 50);
	} else {
		fill(175);
	}
	ellipse(x, y, d);
	var r = map(x, sliderStart, sliderEnd, 100, 230);
	var g = map(x, sliderStart, sliderEnd, 255, 100);
	var b = map(x, sliderStart, sliderEnd, 0, 50);
	fill(r, g, b);
	for (i = 0; i < width; i += 80) {
		push();
		translate(i - 120, 80);
		fill(r, g, b);
		scale(random(0.5, 0.8), random(0.5, 0.8));
		leaf();
		pop();
	}
	fill(150);
	textSize(20);
  
	text("Spring 春", width/2 - 270, 40);
	text("Summer 夏", width / 2 - 30, 20);
	text("Fall 秋", width/2 + 220, 40);
}
function leaf() {
	noStroke();
	beginShape();
	triangle(width / 2, height / 4, 5 * width / 11, height / 2, 6 * width / 11, height / 2);
	triangle(width / 2 - 50, height / 4 + 35, 5 * width / 11 - 10, height / 2 + 30, 6 * width / 11 + 10, height / 2 + 30);
	triangle(width / 2 + 50, height / 4 + 35, 5 * width / 11 - 10, height / 2 + 30, 6 * width / 11 + 10, height / 2 + 30);
	triangle(width / 2, 2 * height / 3, 5 * width / 11 - 10, height / 2 + 30, 6 * width / 11 + 10, height / 2 + 30);
	rectMode(CENTER);
	rect(width / 2, 2 * height / 3, 3, 100);
	endShape();
}
function slider(){
}
function mousePressed() {
	pressed = true;
	if (mouseX > x - d / 2 && mouseX < x + d / 2 && mouseY > y - d / 2 && mouseY < y + d / 2) {
		dragging = true;
		offsetX = x - mouseX;
	}
}
function mouseReleased() {
	dragging = false;
}let count;
let ca = 360 / count;
let r = 100;
let theta;
let offset;
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}
function draw() {
  background(220);
  
  push();
  translate(width / 2, height / 2);
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      offset = 360 / count;
      theta1 = offset * i;
      point(radius * cos(theta1), radius * sin(theta1), 10, 10);
      theta2 = offset * j;
      point(radius * cos(theta2), radius * sin(theta2), 10, 10);
      line(radius * cos(theta1),radius * sin(theta1),radius * cos(theta2), radius * sin(theta2))   
    }
  }
  pop();
}let dragging = false;
let pressed = false;
let x = 50;
let y = 70;
let d = 60;
let sliderStart, sliderEnd, theta;
let offsetX = 0;
let leaves = [];
function setup() {
  createCanvas(600, 300);
  rectMode(CENTER);
  sliderStart = 50;
  sliderEnd = width - 50;
  theta = 270;
  for (let i = 0; i < 5; i++) {
    leaves[i] = new Leaf(1, 1, 1);
  }
}
function draw() {
  background(255, 150);
  fill(150);
  textSize(20);
  text("Spring 春", width / 2 - 270, 40);
  text("Summer 夏", width / 2 - 30, 20);
  text("Fall 秋", width / 2 + 220, 40);
  frameRate(4);
  if (dragging) {
    x = mouseX + offsetX;
    x = constrain(x, sliderStart, sliderEnd);
    y = 120 - 80 * sin(map(x, 0, width, 2.65, 0.5));
  }
  noStroke();
  if (dragging) {
    fill(230, 100, 50);
  } else {
    fill(175);
  }
  ellipse(x, y, d);
  var r = map(x, sliderStart, sliderEnd, 100, 230);
  var g = map(x, sliderStart, sliderEnd, 255, 100);
  var b = map(x, sliderStart, sliderEnd, 0, 50);
  fill(r, g, b);
  for (let i = 0; i < leaves.length; i++) {
    leaves[i].display();
  }
  translate(200, 0);
  for (let i = 0; i < leaves.length; i++) {
    leaves[i].display();
  }
  translate(400, 0);
  for (let i = 0; i < leaves.length; i++) {
    leaves[i].display();
  }
}
function Leaf(x, y, yspeed) {
  this.x = random(0, width);
  this.y = random(150, height);
  this.yspeed = 3;
  this.display = function() {
    this.x += random(-50, 50);
    this.y += this.yspeed;
    beginShape();
    push();
    scale(0.3);
    triangle(this.x, this.y - 90, this.x - 35, this.y, this.x + 35, this.y);
    triangle(this.x - 50, this.y - 60, this.x - 40, this.y, this.x, this.y);
    triangle(this.x + 50, this.y - 60, this.x, this.y, this.x + 40, this.y);
    triangle(this.x, this.y + 20, this.x - 40, this.y, this.x + 40, this.y);
    strokeWeight(2);
    line(this.x, this.y + 20, this.x, this.y + 40);
    pop();
    endShape();
  }
}
function mousePressed() {
  pressed = true;
  if (mouseX > x - d / 2 && mouseX < x + d / 2 && mouseY > y - d / 2 && mouseY < y + d / 2) {
    dragging = true;
    offsetX = x - mouseX;
  }
}
function mouseReleased() {
  dragging = false;
}function setup() {
  createCanvas(600, 400);
}
function draw() {
  background(220,30);
  noStroke();
  
  for (let i = 0; i < 10; i++) {
    if (mouseX > width / 10 * i && mouseX < width / 10 * (i + 1)) {
      fill(255,0,25.5*i);
      rect(width / 10 * i, 0, width / 10, height);
    } else {
      fill(220);
    }
  }
}let x, y, cw, ch, rw, rh;
let nc = 50;
let nr = 50;
let speed;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  cw = width / nc;
  rh = height / nr;
  noStroke();
  for (let i = 0; i < nc; i++) {
    for (let u = 0; u < nr; u++) {
      let d = dist(mouseX, mouseY, i * cw, u * rh);
      d = map(d, 0, 100, 255, 0);
      let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
      speed = map(speed, 0, 500, 0, 10);
      fill(speed * d);
      rect(i * cw, u * rh, cw, rh);
    }
  }
let w = 100;
let z = 250;
let d = 30;
let a = 100
var sliderStart = 100;
var sliderEnd = 400;
var offsetX = 0;
let x, y, px, py, xScale, yScale, precisionFactor, phaseOffset, phaseQty;
let genny = {
	x: 0,
	y: 0,
	size: 50
};
let speed, rOffset, lineLength;
function setup() {
	background(255);
    createCanvas(500, 300);
  rectMode(CENTER);
	xScale = 30;
	yScale = 50;
	precisionFactor = 1;
	phaseOffset = 2 / 3 * PI;
	phaseQty = 3;
	rectMode(CORNERS);
	fill(255);
	lineLength = 50;
	speed = 0.05;
	rOffset = 0;
}
function draw() {
	background(255);
  frameRate(10);
  
  if (dragging) {
    w = mouseX + offsetX;
  }
  w = constrain(w, sliderStart, sliderEnd);
  noStroke();
  if (dragging) {
    fill (230,100,50);
  } else {
    fill(200);
  } 
  
  ellipse(w, z, d);
  var r = map(w,sliderStart,sliderEnd,100,230);
  var g = map(w,sliderStart,sliderEnd,255,100);
  var b = map(w,sliderStart,sliderEnd,0,50);
  fill(r, g, b);
  
  for(i = 0; i < width; i += 80) {
    push();
    translate(i-120,0);
    scale(random(0.5, 0.8), random(0.5, 0.8));
  	leaf();
    pop();
  }
  
  
  fill(0);
  textSize(15);
  text("Spring 春", 70, 280);
  text("Summer 夏", 220, 280);
  text("Fall 秋", 380, 280);
  
   if (pressed){
   }
    else{
  
  if (a < 150){
  a+=3
  stroke(1);
    strokeWeight(5);
  line(a, 250, a-10, 240);
  line(a, 250, a-10, 260);
    console.log(a);
  }
  
  if (a >= 150){
    a = 105
  }
    }
	push();
	translate(width / 4, height / 2);
	for (let j = 0; j < phaseQty; j++) {
		px = 0;
		py = -sin(j * phaseOffset - rOffset) * yScale;
		for (let i = 0; i < width; i += 1 / precisionFactor) {
			x = i;
			y = -sin((x / xScale) + (j * phaseOffset) - rOffset) * yScale;
			if (j == 0) {
				stroke(255, 0, 0);
		
			}
			strokeWeight(2);
			line(x, y, px, py);
			px = x;
			py = y;
		}
	}
	pop();
	push();
	
	translate(width / 4 - lineLength, height / 2);
		
	ellipse(0, 0, lineLength * 2, lineLength * 2);
	rotate(rOffset - 1.5);
	strokeWeight(4);
	
	push();
	stroke(255, 0, 0);
  strokeWeight(3);
	line(0, 0, 0, lineLength);
	push();
	rotate(2 / 3 * PI);
	line(0, 0, 0, lineLength);
	pop();
	push();
	rotate(2 * 2 / 3 * PI);
	line(0, 0, 0, lineLength);
	pop();
	pop();
	rOffset += speed;
}
function mousePressed(){
	phaseQty++;
	if (phaseQty > 3){
		phaseQty = 0;
	}
}
 
function leaf(){
  noStroke();
  beginShape();
  triangle(width/2, height/4, 5*width/11, height/2, 6*width/11, height/2);
  triangle(width/2-50, height/4+35, 5*width/11-10, height/2+30, 6*width/11+10, height/2+30);
  triangle(width/2+50, height/4+35, 5*width/11-10, height/2+30, 6*width/11+10, height/2+30);
  triangle(width/2, 2*height/3, 5*width/11-10, height/2+30, 6*width/11+10, height/2+30);
  rect(width/2, 2*height/3, 3, 100);
  endShape();
}
  
function mousePressed() {
  
  pressed = true;
  if (mouseX > w-d/2 && mouseX < w+d/2 && mouseY > z-d/2 && mouseY < z+d/2) {
    dragging = true;
    offsetX = w-mouseX;
  }
}
function mouseReleased() {
  dragging = false;
}
let x = 100;
let y = 250;
let d = 30;
let a = 100
var sliderStart = 100;
var sliderEnd = 400;
var offsetX = 0;
function setup() {
  createCanvas(500, 300);
  rectMode(CENTER);
}
function draw() {
  background(255);
  frameRate(10);
  
  if (dragging) {
    x = mouseX + offsetX;
  }
  x = constrain(x, sliderStart, sliderEnd);
  noStroke();
  if (dragging) {
    fill (230,100,50);
  } else {
    fill(200);
  } 
  
  ellipse(x, y, d);
  var r = map(x,sliderStart,sliderEnd,100,230);
  var g = map(x,sliderStart,sliderEnd,255,100);
  var b = map(x,sliderStart,sliderEnd,0,50);
  fill(r, g, b);
  
  for(i = 0; i < width; i += 80) {
    push();
    translate(i-120,0);
    scale(random(0.5, 0.8), random(0.5, 0.8));
  	leaf();
    pop();
  }
  
  
  fill(0);
  textSize(15);
  text("Spring 春", 70, 280);
  text("Summer 夏", 220, 280);
  text("Fall 秋", 380, 280);
  
   if (pressed){
   }
    else{
  
  if (a < 150){
  a+=3
  stroke(1);
    strokeWeight(5);
  line(a, 250, a-10, 240);
  line(a, 250, a-10, 260);
    console.log(a);
  }
  
  if (a >= 150){
    a = 105
  }
    }
}
function leaf(){
  noStroke();
  beginShape();
  triangle(width/2, height/4, 5*width/11, height/2, 6*width/11, height/2);
  triangle(width/2-50, height/4+35, 5*width/11-10, height/2+30, 6*width/11+10, height/2+30);
  triangle(width/2+50, height/4+35, 5*width/11-10, height/2+30, 6*width/11+10, height/2+30);
  triangle(width/2, 2*height/3, 5*width/11-10, height/2+30, 6*width/11+10, height/2+30);
  rect(width/2, 2*height/3, 3, 100);
  endShape();
}
  
function mousePressed() {
  
  pressed = true;
  if (mouseX > x-d/2 && mouseX < x+d/2 && mouseY > y-d/2 && mouseY < y+d/2) {
    dragging = true;
    offsetX = x-mouseX;
  }
}
function mouseReleased() {
  dragging = false;
}
  let x;
let y;
function setup() {
  createCanvas(500, 500);
}
function draw() {
  background(220);
  noFill();
  for (x = 0; x < width; x += width / 10) {
    for (y = 0; y < height; y += height / 10) {
      rect(x, y, width/10, height/10)
      console.log(x);
      console.log(y);
    }
  }
let a
function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
  background(220);
  
  
  for(let a = 0; a < 10; a ++) {
    
   if(mouseX > a * width/10 && mouseX < (a+1)*width/10 && a%2==0){
     fill(0,0,255);
   }else if(mouseX > a * width/10 && mouseX < (a+1)*width/10 && a%2==1){
      fill(255,0,0);
     }
    else{
      fill(0);
    }
	  rect (a * width/10, 0, width/10, height);
    console.log(a);
  }
let a
function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
  background(220);
  
  
  for(let a = 0; a < 10; a ++) {
    
   if(mouseX > a * width/10 && mouseX < (a+1)*width/10 && a<5){
     fill(0,0,255);
   }else if(mouseX > a * width/10 && mouseX < (a+1)*width/10 && a>=5){
      fill(255,0,0);
     }
    else{
      fill(0);
    }
	  rect (a * width/10, 0, width/10, height);
     
    }
    
    
let a
function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
  background(220);
  
  
  for(let a = 0; a < 10; a ++) {
    
   if(a==6){
     fill(0);
   }else if(mouseX > a * width/10 && mouseX < (a+1)*width/10 ){
      fill(255,0,0);
     }
    else{
      fill(0);
    }
	  rect (a * width/10, 0, width/10, height);
     
    }
    
    
}let on = false
function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
  background(220);
  fill(255,0,0);
  noStroke();
  
  if(on){
    rect (0, 0, width/10, height);
  } 
  
  
    if(mouseX < width/10){
      if(pmouseX > width/10){
        on = !on
      }
    }
}let on = false
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  fill(255, 0, 0)
  noStroke();
  
  if (on) {
    rect(0, 0, width / 3, height);
  
  }
}\ 
  function mouse(){
  if (mouseX >= 0 && mouseX <= width / 3) {
    on = !on;
  }
}let on = true;
let eye = {l:165, r:235, l1:170, r1:230, y:150};
let r = {x: 0, y: 0, w: 0, h: 0};
let dx, dy;
let d, spd;
let b = {x:0, y:0, w:0, h:0};
function setup() { 
  createCanvas(400, 410);
  
  r.x = 20;
  r.y = 20
  r.w = random(100, 150);
  r.h = random(50, 100);
  
  b.x = width/2;
  b.y = height/2.3;
  b.w = 200
  b.h = 200
  
} 
function draw() { 
  background(100);
  
  noStroke();
  fill(255, random(50), 0);
  rect(b.x, 10, width, 10);
  fill(255 ,random(100), 0);
  rect(b.x, 30, width, 10);
  fill(255, random(150), 0);
  rect(b.x, 50, width, 10);
  fill(255, random(200), 0);
  rect(b.x, 70, width, 10);
  fill(255, random(255), 0);
  rect(b.x, 90, width, 10);
  fill(255, random(50,255), 0);
  rect(b.x, 110, width, 10);
  fill(255, random(100,255), 0);
  rect(b.x, 130, width, 10);
  fill(255, random(150,255), 0);
  rect(b.x, 150, width, 10);
  fill(255, random(200,255), 0);
  rect(b.x, 170, width, 10);
  fill(255, random(250,255), 0);
  rect(b.x, 190, width, 10);
  fill(255, random(10), 0);
  rect(b.x, 390, width, 10);
  fill(255, random(50), 0);
  rect(b.x, 370, width, 10);
  fill(255 ,random(100), 0);
  rect(b.x, 350, width, 10);
  fill(255, random(150), 0);
  rect(b.x, 330, width, 10);
  fill(255, random(200), 0);
  rect(b.x, 310, width, 10);
  fill(255, random(255), 0);
  rect(b.x, 290, width, 10);
  fill(255, random(50,255), 0);
  rect(b.x, 270, width, 10);
  fill(255, random(100,255), 0);
  rect(b.x, 250, width, 10);
  fill(255, random(150,255), 0);
  rect(b.x, 230, width, 10);
  fill(255, random(200,255), 0);
  rect(b.x, 210, width, 10);
  
  
  stroke(1);
  rectMode(CENTER);
  fill(255,255,0);
  rect(b.x, b.y, b.w, b.h);
  
  if(on) {
  fill(255);
  rect(187,215,18,25);
  rect(212,215,18,25);
  } else {
  }
  
  if (on) {
  stroke(0);
  fill(255,255,0);
  arc(200,140,150,150,TWO_PI+QUARTER_PI,PI-QUARTER_PI);
  arc(200,180,20,25,HALF_PI+QUARTER_PI,QUARTER_PI);
  } else {
  stroke(0);
  fill(255,255,0);
  arc(200,280,150,150,PI+QUARTER_PI,TWO_PI-QUARTER_PI);
  arc(200,180,20,25,HALF_PI+QUARTER_PI,QUARTER_PI);
  }
  
  if (on) {
  fill(255);
  ellipse(eye.l,eye.y,70);
  ellipse(eye.r,eye.y,70);
  fill(0,0,random(255),120);
  ellipse(eye.l1,eye.y,30);
  ellipse(eye.r1,eye.y,30);
  fill(0);
  ellipse(eye.l1,eye.y,15);
  ellipse(eye.r1,eye.y,15); 
  } else {
    line(140, eye.y, 190, eye.y);
    line(210, eye.y, 260, eye.y);
    line(140, eye.y-5, 190, eye.y);
    line(210, eye.y, 260, eye.y-5);
    line(140, eye.y+5, 190, eye.y);
    line(210, eye.y, 260, eye.y+5);
    
  }
  fill(255);
  rect(b.x, 260,200,20);
  fill(180,130,70);
  rect(b.x, 280,200,20);
  fill(0);
  rect(b.x-75,280,30,6);
  rect(b.x-25,280,30,6);
  rect(b.x+25,280,30,6);
  rect(b.x+75,280,30,6);
  
    
  noStroke();
  fill(0,0,random(255),120);
  
  ellipse(r.x, r.y, r.w, r.h); 
  dx = mouseX - r.x;
  dy = mouseY - r.y;
  
 	d = dist(r.x, r.y, mouseX, mouseY);
  spd = map(d, 0, width, 0, 0.05);
  
  r.x += (dx * spd);
  r.y += (dy * spd);
  
  
  
  
}
  function mousePressed() {
  on = !on;
  }
  var ball = {
  x: 1,
  y: 1,
  xspeed: 1,
  yspeed: 3
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  move();
  bounce();
  display();
}
function move() {
  ball.x = +ball.x + ball.xspeed;
  ball.y = +ball.y + ball.yspeed;
}
function bounce() {
  if (ball.x > width || ball.x < 0) {
    ball.xspeed = ball.xspeed * -1;
  }
  if (ball.y < 0 || ball.y > height) {
    ball.yspeed = ball.yspeed * -1
  }
}
function display() {
  stroke(255);
  strokeWeight(4);
  fill(random(255), 0, 0);
  ellipse(ball.x, ball.y, 50);
}function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
  background(0);
  strokeWeight(0);
  stroke(255);
  
  for (var x = 0; x <= mouseX; x += 50) {
       for (var y = 0; y <= height; y += 50) {
       fill(random(255), random(255), random(255));
  ellipse(x, y, 25, 25);
       }
  }
}var circle = {
    x: 200,
    y: 1,
    diameter: 20
};
var speed = 3;
function setup() {
  createCanvas(400, 400);
};
function draw() {
    background(0, 10, 10);
    
    fill(255, 0, 0);
    ellipse(circle.x, circle.y, circle.diameter, circle.diameter);  
    
     fill(255, 0, 0);
    ellipse(circle.x + 100, circle.y, circle.diameter, circle.diameter);
    
    fill(255, 0, 0);
    ellipse(circle.x - 100, circle.y, circle.diameter, circle.diameter);
    
if (circle.y > height){
    speed = -3;
    circle.diameter = circle.diameter + 50;
}
    
if (circle.y < 1){
    speed = 3;
    circle.diameter = circle.diameter - 50;
}
    
    circle.y = circle.y + speed;  
}var spot = {
    x: 100,
    y: 50
}
var circle = {
    d: 10
}
var col = {
    r: 255,
    g: 0,
    b: 0
}
function setup() {
  createCanvas(600, 600);
  background(255, 255, 255);
};
function draw() {
    spot.x = random(0, width);
    spot.y = random(0, height);
    col.r = random(0, 255);
    col.g = random(0, 255);
    col.b = random(0, 255);
    circle.d = random(1, 50);
    noStroke();
  fill(col.r, col.g, col.b, 50);
  ellipse(spot.x, spot.y, circle.d, circle.d)
};let x, y;
function setup() { 
  createCanvas(400, 400);
  x = width/2
  y = height/2
} 
function draw() { 
  background(220);
  ellipse(x, y, 50)
  x++;
  y+=0.5;
    
}function setup() { 
  createCanvas(windowWidth, windowHeight);
} 
function draw() { 
  let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
  
  let sw = map(speed, 0, 100, 20, 0);
  strokeWeight(sw);
  line(mouseX, mouseY, pmouseX, pmouseY);
  
}let x;
let y;
let dx, dy;
let d; 
let speed; 
function setup() { 
  createCanvas(800, 600);
  x = 0.5*width;
  y = 0.5*height;
  h = 20;
  w = 20;
} 
function draw() {
  background(0);
  rectMode(CENTER);
  fill(255,0,0);
  rect(x, y, 200, 200);
  
  dx = mouseX - x;
  dy = mouseY - y;
  
  d = dist(x, y, mouseX, mouseY);
 
 speed = map(d, 0, width, 0, 0.1);  
  
 x += (dx * speed);
 y += (dy * speed);
  
}
  createCanvas(600, 400);
} 
function draw() { 
  background(0);
  strokeWeight(4);
  stroke(255);
  
  var x = 0;
  while (x<=width) {
    fill(0,random(255),random(255));
  ellipse(x,100,25,25);
    x = x + 50;
  }
  
  for (var x = 0; x < width; x = x +50) {
    fill(random(255),random(255),200);
    ellipse(x, 300, 25, 25);
    
  }
  
  for (var y = 10; y < height; y = y + 50) {
    fill(random(255),0,random(255));
    rect(100,y,10,10);
  }
    
  
}var on = false;
function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
  if(on) {
    background(0,255,0);
  } else {
    background(0);
  }
	stroke(255);
	strokeWeight(4);
	noFill();
if (mouseX>250 && mouseX<350 && mouseY>150 && mouseY<250) {
  fill (255,0,255)
}
  
rectMode(CENTER);
rect(300,200,100,100);
	
}
function mousePressed() {
  if (mouseX>250 && mouseX<350 && mouseY>150 && mouseY<250) {
     on = !on;
    
    
  }
  
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(250);
  
  fill(255,255,0);
  rect(100,80,200,220);
  
  fill(255);
  rect(178,205,18,25);
  rect(202,205,18,25);
  
  fill(255,255,0);
  arc(200,140,150,150,TWO_PI+QUARTER_PI,PI-QUARTER_PI);
  arc(200,180,20,25,HALF_PI+QUARTER_PI,QUARTER_PI);
  
  fill(255);
  ellipse(165,150,70);
  ellipse(235,150,70);
  fill(0,200,255);
  ellipse(170,150,30);
  ellipse(230,150,30);
  fill(0);
  ellipse(170,150,15);
  ellipse(230,150,15);
  
  fill(255);
  rect(100,260,200,20);
  fill(180,130,70);
  rect(100,280,200,20);
  fill(0);
  rect(110,285,30,6);
  rect(160,285,30,6);
  rect(210,285,30,6);
  rect(260,285,30,6);
  
  stroke(0);
  fill(150,220,150);
  ellipse(121,100,13,21);
  ellipse(115,130,10,10);
  ellipse(118,200,10,10);
  ellipse(125,230,13,25);
  ellipse(280,100,18,16);
  ellipse(282,210,15,25);
  ellipse(275,240,12,11);
  
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
}function setup() { 
  createCanvas(800, 600);
} 
function draw() { 
  background(0,255,255);
  
  strokeWeight(40);
  stroke(255,0,0);
  line(0,0,800,600);
	
	fill(50,200,50);
	strokeWeight(0);
	ellipse(400,300,400,300);
	
	fill(50,50,150);
	strokeWeight(0);
	rect(550,250,50,50);
	
}