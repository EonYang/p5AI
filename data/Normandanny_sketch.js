var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
	function setup()
	{
		// graphics stuff:
		createCanvas(800, 400);
		background(255, 255, 255);
		fill(0, 0, 0, 255);
		// instructions:
		textSize(32);
		textAlign(CENTER);
		text("say something", width/2, height/2);
		myRec.onResult = showResult;
		myRec.start();
	}
	function draw()
	{
		// why draw when you can talk?
	}
	function showResult()
	{
		if(myRec.resultValue==true) {
			background(192, 255, 192);
			text(myRec.resultString, width/2, height/2);
			console.log(myRec.resultString);
		}
	}var myRec = new p5.SpeechRec('en-US', parseResult); // new P5.SpeechRec object
	myRec.continuous = true; // do continuous recognition
	myRec.interimResults = true; // allow partial recognition (faster, less accurate)

	var x, y;
	var dx, dy;

	function setup()
	{
		// graphics stuff:
		createCanvas(800, 600);
		background(255, 255, 255);
		fill(0, 0, 0, 255);
		x = width/2;
		y = height/2;
		dx = 0;
		dy = 0;

		// instructions:
		textSize(20);
		textAlign(LEFT);
		text("draw: up, down, left, right, clear", 20, 20);

		//myRec.onResult = parseResult; // now in the constructor
		myRec.start(); // start engine
	}

	function draw()
	{
		ellipse(x, y, 5, 5);
		x+=dx;
		y+=dy;
		if(x<0) x = width;
		if(y<0) y = height;
		if(x>width) x = 0;
		if(y>height) y = 0;
	}

	function parseResult()
	{
		// recognition system will often append words into phrases.
		// so hack here is to only use the last word:
		var mostrecentword = myRec.resultString.split(' ').pop();
		if(mostrecentword.indexOf("left")!==-1) { dx=-1;dy=0; }
		else if(mostrecentword.indexOf("right")!==-1) { dx=1;dy=0; }
		else if(mostrecentword.indexOf("up")!==-1) { dx=0;dy=-1; }
		else if(mostrecentword.indexOf("down")!==-1) { dx=0;dy=1; }
		else if(mostrecentword.indexOf("clear")!==-1) { background(255); }
		console.log(mostrecentword);
	}var animation = bodymovin.loadAnimation({
  container: document.getElementById('bm'), // Required
  path: 'data.json', // Required
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true, // Optional
  name: "Hello World", // Name for future reference. Optional.
})function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder');
}

function draw() {
  background(220);
}// Stage detection
let choiceStage;
let visualStage;

let wordHolder = [];
let bubbles = [];

// // ES Modules syntax
// import Unsplash from 'unsplash-js';

// // require syntax
// const Unsplash = require('unsplash-js').default;

// const unsplash = new Unsplash({
//   applicationId: "{25547}",
//   secret: "{2b25453fe1451b7b2ef4e27d04a0aba01d4cd6b7e650ef2678c66bddf56c1d19}",
//   callbackUrl: "{CALLBACK_URL}"
// });

// function preload() {
//     wordHolder = loadJSON("words.json");

//     // pkmlogo = loadImage("Assets/International_Pokémon_logo.png");
// }

function setup() {
    createCanvas(800, 800);

    // Pass the JSON values into constructors
    bubbles[1] = new bubble(100, 100);
}

function draw() {
    background(200);

    fill("#F1DEDE");
    ellipse(100, 100, 100, 100);
    bubbles[1].show;
} function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  fill(50);
  text("Please descirbe your dream", 20, 50);
  text("blue", 20, 100);
  text("magical", 80, 100);
  text("blurry", 150, 100);

  
  if (mouseIsPressed) {
    alert("Your dream is like this!");
  }
  
}// ---
// your mission: change the definition of the myRandom() function
// to return a random number---without using random() or
// Math.random(). The random number should be between 0 and 1.
//
// this function will be called to determine the brightness of
// pixels on the screen (continually displayed in order from
// left to right, top to bottom, several pixels per frame.)
//
// define other variables if you need to.
var state = 1;

var seed1;
var seed2;
var randomness;


function myRandom() {
   var seed1 = millis() + year();
  
   function random(seed) {
     seed2 = (seed * 9301 +49297) % 233280;
     return seed2/233280.0;
   }
  

  randomness = random(seed1);
  
  return randomness;
}

// ---
// try to keep the code below unchanged (unless you have a really
// clever idea).
// ---
var pos = 0;
var step = 8;
var randomCanvas;
function setup() { 
  pixelDensity(1);
  createCanvas(200, 200);
  randomCanvas = createGraphics(40, 40);
} 

function draw() {
  background(0);
  noSmooth();
  randomCanvas.loadPixels();
  for (var i = 0; i < step; i++) {
  	var pxval = myRandom() * 255;
  	for (var j = 0; j < 4; j++) {
    	randomCanvas.pixels[pos+j] = pxval;
  	}
  	pos += 4;
	}

  if (pos > randomCanvas.width * randomCanvas.height * 4) {
    pos = 0;
  }
  randomCanvas.updatePixels();
  scale(5);
  image(randomCanvas, 0, 0);
  console.log(myRandom());
}// ---
// your mission: change the definition of the myRandom() function
// to return a random number---without using random() or
// Math.random(). The random number should be between 0 and 1.
//
// this function will be called to determine the brightness of
// pixels on the screen (continually displayed in order from
// left to right, top to bottom, several pixels per frame.)
//
// define other variables if you need to.
var state = 1;

var seed1;
var seed2;
var randomness;


function myRandom() {
   var seed1 = millis() + year();
  
   function random(seed) {
     seed2 = (seed * 9301 +49297) % 233280
     return seed2/233280.0;
   }
  

  randomness = random(seed1);
  
  return randomness;
}

// ---
// try to keep the code below unchanged (unless you have a really
// clever idea).
// ---
var pos = 0;
var step = 8;
var randomCanvas;
function setup() { 
  pixelDensity(1);
  createCanvas(200, 200);
  randomCanvas = createGraphics(40, 40);
} 

function draw() {
  background(0);
  noSmooth();
  randomCanvas.loadPixels();
  for (var i = 0; i < step; i++) {
  	var pxval = myRandom() * 255;
  	for (var j = 0; j < 4; j++) {
    	randomCanvas.pixels[pos+j] = pxval;
  	}
  	pos += 4;
	}

  if (pos > randomCanvas.width * randomCanvas.height * 4) {
    pos = 0;
  }
  randomCanvas.updatePixels();
  scale(5);
  image(randomCanvas, 0, 0);
  console.log(myRandom());
}// ---
// your mission: change the definition of the myRandom() function
// to return a random number---without using random() or
// Math.random(). The random number should be between 0 and 1.
//
// this function will be called to determine the brightness of
// pixels on the screen (continually displayed in order from
// left to right, top to bottom, several pixels per frame.)
//
// define other variables if you need to.
var state = 1;

var seed1;
var seed2;
var randomness;


function myRandom() {
   var seed1 = millis() + year();
  
   function random(seed) {
     seed2 = (seed * 9301 +49297) % 233280;
     return seed2/233280.0;
   }
  

  randomness = random(seed1);
  
  return randomness;
}

// ---
// try to keep the code below unchanged (unless you have a really
// clever idea).
// ---
var pos = 0;
var step = 8;
var randomCanvas;
function setup() { 
  pixelDensity(1);
  createCanvas(200, 200);
  randomCanvas = createGraphics(40, 40);
} 

function draw() {
  background(0);
  noSmooth();
  randomCanvas.loadPixels();
  for (var i = 0; i < step; i++) {
  	var pxval = myRandom() * 255;
  	for (var j = 0; j < 4; j++) {
    	randomCanvas.pixels[pos+j] = pxval;
  	}
  	pos += 4;
	}

  if (pos > randomCanvas.width * randomCanvas.height * 4) {
    pos = 0;
  }
  randomCanvas.updatePixels();
  scale(5);
  image(randomCanvas, 0, 0);
  console.log(myRandom());
}// Color palette
var Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  brown: 0x59332e,
  pink: 0xF5986E,
  brownDark: 0x23190f,
  blue: "#2DCDB3",

};

var palette = {
  black: "#0c1b29",
  blue: "#31EFE7",
  yellow: "#FFEF2F",
  orange: "#FCC303",
  white: "#FAF9F9",
  star: "#E59620",
  planet: "#7C0B2B",
  ambient: "#E6C2B0",
  shadow: "#ffffff",
  rocketLeg: "#759EB8",
  rocket: "#DDF0FF",
  fog: "#43405B",
};

var game;
var deltaTime = 0;
var newTime = new Date().getTime();
var oldTime = new Date().getTime();
var particlesPool = [];
var particlesInUse = [];

// Scene related variables
var scene, camera;

// Camera related variables
var camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH;

// Renderer related variables
var renderer, container;


function createScene() {
  // Set up scene related parameters
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  // Create the scene
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(palette.fog, 100, 950);
}

function createCamera() {
  // Set up camera related parameters
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;

  // Create the camera
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );

  // Camera position
  camera.position.x = 0;
  camera.position.z = 200;
  camera.position.y = 100;
}

function createRenderer() {
  renderer = new THREE.WebGLRenderer({
    // Allow transparency to show the gradient background we defined in the CSS
    alpha: true,
    antialias: true
  });

  // Define the size of the renderer; in this case, it will fill the entire screen
  renderer.setSize(WIDTH, HEIGHT);

  // Enable shadow rendering
  renderer.shadowMap.enabled = true;

  // Add the DOM element of the renderer to the container we created in the HTML
  container = document.getElementById('space');
  container.appendChild(renderer.domElement);

  // Listen to the screen: if the user resizes it we have to update the camera and the renderer size
  window.addEventListener('resize', handleWindowResize, false);
}

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}


// Lights related variables
var ambientLight, hemisphereLight, shadowLight;

function createLights() {
  hemisphereLight = new THREE.HemisphereLight("#85b7b8", "#000000", 0.9)

  ambientLight = new THREE.AmbientLight(palette.ambient, 0.5);

  shadowLight = new THREE.DirectionalLight(palette.shadow, 0.9);
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = 4096;
  shadowLight.shadow.mapSize.height = 4096;

  scene.add(hemisphereLight);
  scene.add(shadowLight);
  scene.add(ambientLight);
}

Planet = function () {
  var geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
  geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

  geom.mergeVertices();

  var l = geom.vertices.length;

  this.waves = [];

  for (var i = 0; i < l; i++) {
    // get each vertex
    var v = geom.vertices[i];

    // store some data associated to it
    this.waves.push({
      y: v.y,
      x: v.x,
      z: v.z,
      // a random angle
      ang: Math.random() * Math.PI * 2,
      // a random distance
      amp: 5 + Math.random() * 15,
      // a random speed between 0.016 and 0.048 radians / frame
      speed: 0.016 + Math.random() * 0.032
    });
  };

  var mat = new THREE.MeshPhongMaterial({
    color: palette.planet,
    transparent: true,
    opacity: 0.85,
    shading: THREE.FlatShading,
  });

  this.mesh = new THREE.Mesh(geom, mat);
  this.mesh.receiveShadow = true;

}

Planet.prototype.moveWaves = function () {

  var verts = this.mesh.geometry.vertices;
  var l = verts.length;

  for (var i = 0; i < l; i++) {
    var v = verts[i];

    var vprops = this.waves[i];

    v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
    v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;
    vprops.ang += vprops.speed;

  }

  this.mesh.geometry.verticesNeedUpdate = true;

  planet.mesh.rotation.z += .005;
}

Cloud = function () {
  this.mesh = new THREE.Object3D();

  var geom = new THREE.BoxGeometry(20, 20, 20);

  var mat = new THREE.MeshPhongMaterial({
    color: Colors.white,
  });

  var nBlocs = 3 + Math.floor(Math.random() * 3);
  for (var i = 0; i < nBlocs; i++) {

    var m = new THREE.Mesh(geom, mat);

    m.position.x = i * 15;
    m.position.y = Math.random() * 10;
    m.position.z = Math.random() * 10;
    m.rotation.z = Math.random() * Math.PI * 2;
    m.rotation.y = Math.random() * Math.PI * 2;

    var s = .1 + Math.random() * .9;
    m.scale.set(s, s, s);

    m.castShadow = true;
    m.receiveShadow = true;

    this.mesh.add(m);
  }
}






var sky;
var planet;
var rocket;

function createPlanet() {
  planet = new Planet();
  planet.mesh.position.y = -600;
  scene.add(planet.mesh);
}



var particleCount = 2000;
var pMaterial = new THREE.PointCloudMaterial({
color: 0xFFFFFF,
size: 4,
blending: THREE.AdditiveBlending,
depthTest: false,
transparent: true
});
var particles = new THREE.Geometry;

for (var i = 0; i < particleCount; i++) {
var pX = Math.random()*1000 - 500,
pY = Math.random()*500 - 250,
pZ = Math.random()*1000 - 500,
particle = new THREE.Vector3(pX, pY, pZ);
particle.velocity = [];
particle.velocity.y = -1;
particles.vertices.push(particle);
}

var particleSystem;

function createPart() {
  var particleSystem = new THREE.PointCloud(particles, pMaterial);
  particleSystem.position.y = 100;
  scene.add(particleSystem);
}


var simulateRain = function(){
var pCount = particleCount;
while (pCount, pCount > 0, pCount--) {
var particle = particles.vertices[pCount];
if (particle.y < -200) {
  particle.y = 200;
  particle.velocity.y = -1;
}

particle.velocity.y -= Math.random() * .001;

particle.y += particle.velocity.y;
}

particles.verticesNeedUpdate = true;
};

function animate() {
  newTime = new Date().getTime();
  deltaTime = newTime - oldTime;
  oldTime = newTime;

  planet.mesh.rotation.z += .005;
  // sky.mesh.rotation.z += .002;
  planet.moveWaves();

  ambientLight.intensity += (0.5 - ambientLight.intensity) * deltaTime * 0.003;

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
  
  createPart();
  simulateRain();
}

var fieldDistance, energyBar, replayMessage, fieldLevel, levelCircle, lifeLeft;

var heart5, heart4, heart3, heart2, heart1;

function sketch(event) {

  // Set up the scene, the camera and the renderer
  createScene();
  createCamera();
  createRenderer();

  // Set up the lights
  createLights();

  // Set up the objects
  createPlanet();
  // createSky();

  // Animate the scene
  animate();
}

window.addEventListener('load', sketch, false);let box;
let position;


function setup() { 
  createCanvas(400, 400);
  position = createVector(35, 115);
  box = new Box(position.x, position.y);
} 

function draw() { 
  background(255);
  settings();
  let gravity = (0, 0.01);
  box.applyForce(gravity);
  box.update();
  box.display();
}

function settings() {
  fill("#FFD24D");
  noStroke();
  rect(0, 350, 400, 100);
  fill("#8B73CA");
  triangle(0, 150, 0, 350, 200, 350);
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let walker1;
let walker2;
let walker3;
let walker4;
let walker5;
let walker6;
let walker7;

function setup() {
  createCanvas(500, 500);
  walker1 = new Walker1();
  walker2 = new Walker2();
  walker3 = new Walker3();
  walker4 = new Walker4();
  walker5 = new Walker5();
  walker6 = new Walker6();
  walker7 = new Walker7();
  background(0);
}

function draw() {
  walker1.step();
  walker1.render();
  walker2.step();
  walker2.render();
  walker3.step();
  walker3.render();
  walker4.step();
  walker4.render();
  walker5.step();
  walker5.render();
  walker6.step();
  walker6.render();
  walker7.step();
  walker7.render();
}function setup() { 
  createCanvas(windowWidth, windowHeight);
} 

function draw() { 
  background(220);
  

  fill(255, 0, 0);
  ellipse(width/2, height/2, 100, 100);
}var videoScale = 16;
var cols, rows;

var pmp;

function preload() {
 pmp = loadImage("Pumpkin1.png"); 
}

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

function draw() {
  background(255);
  video.loadPixels();

  for (var x = 0; x < cols; x++) {
    for (var y = 0; y < rows; y++) {
      var index = ((cols - x - 1) + y * cols) * 4;
      var r = video.pixels[index + 0]; 
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];

      var sz = map((r+g+b)/3, 0, 255, 0, videoScale);
      // rectMode(CENTER);
      // fill(255);
      // noStroke();
      
      var m = x*videoScale;
      var n = y*videoScale;
      // rect(m + videoScale/2, n + videoScale/2, sz, sz);
      // ellipse(m + videoScale/2, n + videoScale/2, sz);
      image(pmp, m + videoScale/2, n + videoScale/2, sz, sz, 0, 0);
      
    }
  }
}

var videoScale = 16;
var cols, rows;

var pmp;

function preload() {
 pmp = loadImage("Pumpkin1.png"); 
}

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

function draw() {
  background(255);
  video.loadPixels();

  for (var x = 0; x < cols; x++) {
    for (var y = 0; y < rows; y++) {
      var index = ((cols - x - 1) + y * cols) * 4;
      var r = video.pixels[index + 0]; 
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];

      var sz = map((r+g+b)/3, 0, 255, 0, videoScale);
      // rectMode(CENTER);
      // fill(255);
      // noStroke();
      
      var m = x*videoScale;
      var n = y*videoScale;
      // rect(m + videoScale/2, n + videoScale/2, sz, sz);
      // ellipse(m + videoScale/2, n + videoScale/2, sz);
      image(pmp, m + videoScale/2, n + videoScale/2, sz, sz, 0, 0);
      
    }
  }
}

let audio;

function preload() {
  audio = loadSound(".mp3");
}

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.wchusbserial1430';  // fill in your serial port name here
var fromSerial = 0;

var m;
var r = [];
var g = [];
var b = [];
var balls = [];
var num = 200;

function setup() {

  createCanvas(400, 400)
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  
  for (let m = 0; m <= 1000; m++) {
    r[m] = random(0, 255);
    g[m] = random(0, 0);
    b[m] = random(0, 255);
  }
  m = 0;
}

function mouseReleased() {

  let ball1 = new Ball(mouseX, mouseY, 15);
  balls.push(ball1);
  m += 1;

}

function draw() {
  // background(fromSerial);
  // text(fromSerial, 100, 100);
  
   bg();


  // ball2.show();
  // ball2.expand();
  for (let i = 0; i < balls.length; i++) {
    fill(r[m], g[m], b[m]);
    balls[i].show();
    balls[i].expand();
  }
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
  // read a string from the serial port:
  var inString = serial.readLine();
  // check to see that there's actually a string there:
  if (inString.length > 0 ) {
  // convert it to a number:
  fromSerial = Number(inString);
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
}

class Ball {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.speed = 0.05;
  }

  show() {

    noStroke();
    
    // col2.r = random(0, 255);
    // col2.g = random(0, 0);
    // col2.b = random(0, 255);
    fill(r[m], g[m], b[m]);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.w);

  }

  expand() {
    
    this.y = this.y + this.speed;
    this.speed += fromSerial/500;

  }


}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.wchusbserial1410';  // fill in your serial port name here
var fromSerial = 0;

function setup() {

  createCanvas(500, 500)
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
  background(fromSerial);
  text(fromSerial, 100, 100);
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
  // read a string from the serial port:
  var inString = serial.readLine();
  // check to see that there's actually a string there:
  if (inString.length > 0 ) {
  // convert it to a number:
  fromSerial = Number(inString);
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
}var m;
var r = [];
var g = [];
var b = [];
var balls = [];
var num = 200;

function setup() {
  createCanvas(400, 400);
  for (let m = 0; m <= 1000; m++) {
    r[m] = random(0, 255);
    g[m] = random(0, 0);
    b[m] = random(0, 255);
  }
  m = 0;
  

}


function mouseReleased() {

  let ball1 = new Ball(mouseX, mouseY, 15);
  balls.push(ball1);
  m += 1;

}

function draw() {

  bg();


  // ball2.show();
  // ball2.expand();
  for (let i = 0; i < balls.length; i++) {
    fill(r[m], g[m], b[m]);
    balls[i].show();
    balls[i].expand();
  }

}var x = 0;
var y = 0;
var mx1 = 30;
var my1 = 410
var mx2 = 30;
var my2 = 410 + 30;
var mx3 = 30;
var my3 = 410 + 30 + 30;

var sliderStart = 30;
var sliderEnd = 470;
var offsetmx1 = 0;
var offsetmx2 = 0;
var offsetmx3 = 0;
var dragging1 = false;
var dragging2 = false;
var dragging3 = false;
var rollover1 = false;
var rollover2 = false;
var rollover3 = false;

var r = 158;
var g = 180;
var b = 148;

function setup() {
  createCanvas(500, 500);
  background(255);
}

function draw() {

  if (dragging1) {
    mx1 = mouseX + offsetmx1;

  }

  if (dragging2) {
    mx2 = mouseX + offsetmx2;

  }

  if (dragging3) {
    mx3 = mouseX + offsetmx3;

  }

  mx1 = constrain(mx1, sliderStart, sliderEnd);
  mx2 = constrain(mx2, sliderStart, sliderEnd);
  mx3 = constrain(mx3, sliderStart, sliderEnd);

  var r = map(mx1, sliderStart, sliderEnd, 158, 255);
  var g = map(mx2, sliderStart, sliderEnd, 180, 255);
  var b = map(mx3, sliderStart, sliderEnd, 143, 255);

  threeSahpes(r, g, b);
  
  sliders();

}

// Dragging and release
function mousePressed() {
  // Did I click on slider?
  if (mouseX > mx1 - 10 && mouseX < mx1 + 10 && mouseY > my1 - 7.5 && mouseY < my1 + 7.5) {
    dragging1 = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetmx1 = mx1 - mouseX;
  }

  if (mouseX > mx2 - 10 && mouseX < mx2 + 10 && mouseY > my2 - 7.5 && mouseY < my2 + 7.5) {
    dragging2 = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetmx2 = mx2 - mouseX;
  }

  if (mouseX > mx3 - 10 && mouseX < mx3 + 10 && mouseY > my3 - 7.5 && mouseY < my3 + 7.5) {
    dragging3 = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetmx3 = mx3 - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging1 = false;
  dragging2 = false;
  dragging3 = false;
}


function threeSahpes(r, g, b) {
  noStroke();
  strokeWeight(1)
  if (random(3) < 1) {
    fill(r, 100, 80);
    triangle(x + 10, y + 3, x + 3, y + 17, x + 17, y + 17);
  } else if (random(3) > 1 && random(3) < 2) {
    fill(129, g, 99)
    ellipseMode(CENTER)
    ellipse(x + 10, y + 10, 14);
  } else {
    rectMode(CENTER)
    fill(69, 141, b)
    rect(x + 10, y + 10, 14, 14)
  }

  // Slow down the motion
  frameRate(10)

  // Loop
  x += 20
  if (x > width) {
    x = 0;
    y += 20;
  }


  if (y > 380) {
    background(255);
    x = 0;
    y = 0;
  }

}

function sliders() {
  noStroke()

  fill(255)
  rectMode(CORNER)
  rect(0, 380, 500, 120)

  // Lines
  stroke(100)
  strokeWeight(1)
  line(0 + 30, 380 + 30, width - 30, 380 + 30)

  strokeWeight(1)
  line(0 + 30, 380 + 30 + 30, width - 30, 380 + 30 + 30)

  strokeWeight(1)
  line(0 + 30, 380 + 30 + 30 + 30, width - 30, 380 + 30 + 30 + 30)



  // Sliders
  noStroke()
  if (dragging1) {
    fill('#a01700')
  } else {
    fill('#DC615F');
  }
  rectMode(CENTER)
  rect(mx1, my1, 20, 15, 5)

  if (dragging2) {
    fill('#2d600f')
  } else {
    fill('#81B463');
  }
  rectMode(CENTER)
  rect(mx2, my2, 20, 15, 5)

  if (dragging3) {
    fill('#0a4961')
  } else {
    fill('#458DA8');
  }
  rectMode(CENTER)
  rect(mx3, my3, 20, 15, 5)
}var x = 0;
var y = 0;
var mx1 = 30;
var my1 = 410
var mx2 = 30;
var my2 = 410+30;
var mx3 = 30;
var my3 = 410+30+30;

var sliderStart = 30;
var sliderEnd = 470;
var offsetmx1 = 0;
var offsetmx2 = 0;
var offsetmx3 = 0;
var dragging1 = false;
var dragging2 = false;
var dragging3 = false;
var rollover1 = false;
var rollover2 = false;
var rollover3 = false;

var r = 158;
var g = 180;
var b = 148;

function setup() {
  createCanvas(500, 500);
  background(255);
}

function draw() {
  
  if (dragging1) {
    mx1 = mouseX + offsetmx1;

  }
  
  if (dragging2) {
    mx2 = mouseX + offsetmx2;

  }
  
  if (dragging3) {
    mx3 = mouseX + offsetmx3;

  }
  
  mx1 = constrain(mx1, sliderStart, sliderEnd);
  mx2 = constrain(mx2, sliderStart, sliderEnd);
  mx3 = constrain(mx3, sliderStart, sliderEnd);

  var r = map(mx1,sliderStart,sliderEnd,158,255);
  var g = map(mx2,sliderStart,sliderEnd,180,255);
  var b = map(mx3,sliderStart,sliderEnd,143,255);
  
  noStroke();
  strokeWeight(1)
  if (random(3) < 1) {
    fill(r,100,80);
    triangle(x+10, y+3, x+3, y+17,x+17,y+17 );
  } 
  else if (random(3) > 1 && random(3) < 2 ) {
    fill(129,g, 99)
    ellipseMode(CENTER)
    ellipse(x+10, y+10, 14);
  } else  {
    rectMode(CENTER)
    fill(69,141,b)
    rect(x+10,y+10,14,14)  
  }
  
  // Slow down the motion
  frameRate(10)
  
  // Loop
  x+=20
   if (x > width) {
    x = 0;
    y += 20;
  }
  
  
  if (y > 380) {
  background(255);
    x = 0;
    y = 0;
  }

  
  noStroke()

  fill(255)
  rectMode(CORNER)
  rect(0,380,500,120)

 // Lines
  stroke(100)
  strokeWeight(1)
  line(0+30,380+30,width-30,380+30)
  
  strokeWeight(1)
  line(0+30,380+30+30,width-30,380+30+30)
  
  strokeWeight(1)
  line(0+30,380+30+30+30,width-30,380+30+30+30)
  
  
 
  // Sliders
  noStroke()
  if (dragging1) {
    fill('#a01700')
  } else {
    fill('#DC615F');
  }
  rectMode(CENTER)
  rect(mx1, my1,20, 15,5)
  
  if (dragging2) {
    fill('#2d600f')
  } else {
    fill('#81B463');
  }
  rectMode(CENTER)
  rect(mx2, my2, 20, 15,5)
  
  if (dragging3) {
    fill('#0a4961')
  } else {
    fill('#458DA8');
  }
  rectMode(CENTER)
  rect(mx3, my3,20, 15,5)
  
  
  
}

// Dragging and release
function mousePressed() {
  // Did I click on slider?
  if (mouseX > mx1 -10 && mouseX < mx1 + 10 && mouseY > my1-7.5 && mouseY < my1 + 7.5) {
    dragging1 = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetmx1 = mx1-mouseX;
  }
  
  if (mouseX > mx2 - 10 && mouseX < mx2 + 10 && mouseY > my2 - 7.5 && mouseY < my2 + 7.5) {
    dragging2 = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetmx2 = mx2-mouseX;
  }
  
  if (mouseX > mx3 - 10 && mouseX < mx3 + 10 && mouseY > my3 - 7.5 && mouseY < my3 + 7.5) {
    dragging3 = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetmx3 = mx3-mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging1 = false;
  dragging2 = false;
  dragging3 = false;
}var x = 0;
var y = 0;
var z = 1;  // Row counter

function setup() { 
  createCanvas(500, 500);
  background(235);
} 

function draw() { 
  for (y = 0; y <= 500; y +=50) {
    for (x == 0; x <= 500; x += 50) {
    shape(x, y);
    }
  }
  
}

function shape(x, y) {
  push();
  translate(x, y);
  ellipseMode(CENTER)
  noStroke();
  fill('#E06450');
  quad(0, 0, 6, 0, 28, 37, 24, 42);
  fill('#97CFD8');
  quad(6, 0, 12, 0, 31, 32, 28, 37);
  fill('#458DA8');
  arc(37, 0, 30, 30, 0, PI);
  fill('#ECA59D');
  arc(37, 0, 15, 15, 0, PI);
  pop();
}var x = 0;
var y = 0;
var z = 1;  // Row counter

function setup() { 
  createCanvas(400, 400);
  background(235);
} 

function draw() { 
  
  noFill();
  
  for (y = 0; y <= 400; y +=20) {
    if (z % 2 == 1) {
      for (x = 0; x <= 400; x += 40) {
        arc(x, y, 20, 20, 0, HALF_PI);
        arc(x + 20, y, 20, 20, HALF_PI, PI);
        z ++;
      }
    } else if (z % 2 == 0) {
        for (x = 0; x <= 400; x += 40) {
          arc(x, y, 20, 20, PI, PI+HALF_PI);
          arc(x + 20, y, 20, 20, PI+HALF_PI, TWO_PI);
          z ++;
        }
      }
    
  }
  
}var angle = 0.0;
var offset = 60;
var scalar = 40;
var speed = 0.05;

function setup() {
  createCanvas(240, 120);
}

function draw() {
  background(0);
  var y1 = offset + sin(angle) * scalar;
  var y2 = offset + sin(angle + 0.4) * scalar;
  var y3 = offset + sin(angle + 0.8) * scalar;
  ellipse( 80, y1, 40, 40);
  ellipse(120, y2, 40, 40);
  ellipse(160, y3, 40, 40);
  angle += speed;
}var x = 200;
var y = 365;
var speed = 0.75;
var col = {
  r: 129,
  g: 180,
  b: 99
}
var col2 = {
  r: 0,
  g: 0,
  b:0

}

function setup() { 
  createCanvas(400, 400);
  
  col2.r = random(0, 255);
  col2.g = random(0, 0);
  col2.b = random(0, 255);
  
} 

function draw() { 
  background('#4F813E');
  fill(col.r, col.g, col.b);
  noStroke();
  rect(200, 75, 400, 50);
  rect(200, 75 + 100, 400, 50);
  rect(200, 75 + 100*2, 400, 50);
  rect(200, 75 + 100*3, 400, 50);
  
  // Pitch
  rectMode(CENTER);
  noFill();
  stroke(255);
  strokeWeight(4)
  rect(200, 200, 380, 380);
  rect(200, 352, 175, 75);
  ellipse(200, 200, 100, 100);
  arc(200, 312, 50, 50, PI, TWO_PI);
  
  noStroke();
  fill(255);
  rect(200, 200, 380, 4);
  
  
  // Prompt
  fill(255);
  textAlign(CENTER);
  textSize(12)
  textStyle(NORMAL);
  text('Move you curser to shoot the ball into the net!\nHURRY!', 200, 25);
  
  // Ball
  fill(col2.r, col2.g, col2.b);
  ellipse(mouseX, mouseY, 20, 20);
  
  if (mouseX-10 <= x - speed +50 && mouseX+10 >= x - speed - 50 && mouseY - 10 <= y + 25 && mouseY + 10 >= y - 25) {
    textSize(30);
    fill(255);
    textStyle(BOLD);
    text('GOOOOOOOOOOOOOAL', 200, 125);
    col.r = random(100, 255);
    col.g = random(100, 255);
    col.b = random(0, 1);
  } else {
      col.r = 129;
      col.g = 180;
      col.b = 99;
  }
  
  // Moving Goal
  noFill();
  stroke(255);
  rect(x, y, 100, 50);
  if (x >= width - 60 || x <= 60) {

    speed = speed * -1;
      }
  x = x + speed;
  
  }function setup() { 
  createCanvas(400, 400);

} 

function draw() { 

  background(255);
  

  translate(mouseX+random(0, 5), random(-20, 20));
  
  // A little setup
  rectMode(RADIUS);
  ellipseMode(RADIUS);
  noStroke();


  // Body
  fill('#911B19');
  rect(200, 200, 50, 100, 20, 20, 10, 10);
  triangle(200, 75, 158, 104, 242, 104);

  fill('#EC575A');
  rect(200, 200, 48, 98, 20, 20, 8, 8);
  triangle(200, 78, 160, 106, 241, 106);
  
  // Handle
  stroke('#911B19');
  strokeWeight(2);
  fill('#EC575A');
  triangle(180, 58, 180, 70, 230, 40);
  triangle(185, 65, 185, 75, 238, 70);
  
  // Circle
  noStroke();
  fill('#911B19');
  ellipse(200, 75, 19, 19);
  
  fill('#ffffff');
  ellipse(200, 75, 17, 17);
  
  // Hose
  fill('#911B19');
  rect(172, 75, 10, 8, 1, 1, 1, 1);
  
  noFill();
  stroke('#911B19');
  strokeWeight(4);
  strokeCap(ROUND);
  bezier(180, 75, 50, 75, 170, 200, 100, 250);
  
  // Text
  strokeWeight(2);
  fill('#ffffff');
  rect(200, 200, 30, 50);
  
  noStroke();
  fill('#EC575A');
  textSize(20);
  text("FIRE", 177, 180);
   
}function setup() {
  createCanvas(400, 400);

  background(255);

  // A little setup
  rectMode(RADIUS);
  ellipseMode(RADIUS);
  noStroke();


  // Body
  fill('#911B19');
  rect(200, 200, 50, 100, 20, 20, 10, 10);
  triangle(200, 75, 158, 104, 242, 104);

  fill('#EC575A');
  rect(200, 200, 48, 98, 20, 20, 8, 8);
  triangle(200, 78, 160, 106, 241, 106);
  
  // Handle
  stroke('#911B19');
  strokeWeight(2);
  fill('#EC575A');
  triangle(180, 58, 180, 70, 230, 40);
  triangle(185, 65, 185, 75, 238, 70);
  
  // Circle
  noStroke();
  fill('#911B19');
  ellipse(200, 75, 19, 19);
  
  fill('#ffffff');
  ellipse(200, 75, 17, 17);
  
  // Hose
  fill('#911B19');
  rect(172, 75, 10, 8, 1, 1, 1, 1);
  
  noFill();
  stroke('#911B19');
  strokeWeight(4);
  strokeCap(ROUND);
  bezier(180, 75, 50, 75, 170, 200, 100, 250);
  
  // Text
  strokeWeight(2);
  fill('#ffffff');
  rect(200, 200, 30, 50);
  
  noStroke();
  fill('#EC575A');
  textSize(20);
  text("FIRE", 177, 180);
  
}