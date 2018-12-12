let c = 30;
function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  colorMode(HSB, 360, 100,100,100 );
}

function draw() {
  c ++;
  translate(width/2, height/2);
  fill(255);
  if( c < 30){

    background(color(random(360),random(40,80),random(40,80),100));
    let r = floor(random(0,100));
    textSize(20);
    textSize(120);
    text(r, 0, height*0.1);
  
  }
  if (c == 30){
  background(color(random(360),random(40,80),random(40,80),100));
    let r = floor(random(0,100));
    textSize(20);
    text(`YOU ROLLED: `, 0, -height*0.2);
    textSize(120);
    text(r, 0, height*0.1);
  }
  
}

function ran(){
  c = 0;
}

function touchStarted() {
ran();
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  translate(width / 2, height / 2);
  let r = mouseX/100;
  text(r,100,100);
rotate(r);
  
rect(-26, -26, 52, 52);
  
}let midi;  // global MIDIAccess object



function onMIDISuccess( midiAccess ) {
  console.log( "MIDI ready!" );
  midi = midiAccess;  // store in the global (in real usage, would probably keep in an object instance)
	//listInputsAndOutputs(midi);
  
}

function onMIDIFailure(msg) {
  console.log( "Failed to get MIDI access - " + msg );
}

navigator.requestMIDIAccess().then( onMIDISuccess, onMIDIFailure );

sendMiddleC(midi,"-76806496");

function listInputsAndOutputs( midiAccess ) {
  for (var entry of midiAccess.inputs) {
    var input = entry[1];
    console.log( "Input port [type:'" + input.type + "'] id:'" + input.id +
      "' manufacturer:'" + input.manufacturer + "' name:'" + input.name +
      "' version:'" + input.version + "'" );
  }

  for (var entry of midiAccess.outputs) {
    var output = entry[1];
    console.log( "Output port [type:'" + output.type + "'] id:'" + output.id +
      "' manufacturer:'" + output.manufacturer + "' name:'" + output.name +
      "' version:'" + output.version + "'" );
  }
}



function sendMiddleC( midiAccess, portID ) {
  var noteOnMessage = [0x90, 60, 0x7f];    // note on, middle C, full velocity
  var output = midiAccess.outputs.get(portID);
  output.send( noteOnMessage );  //omitting the timestamp means send immediately.
  output.send( [0x80, 60, 0x40], window.performance.now() + 1000.0 ); // Inlined array creation- note off, middle C,  
                                                                      // release velocity = 64, timestamp = now + 1000ms.
}
















function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

socket.on("note", function(data){
console.log(data);

});let balls = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++) {
    let ball = new Ball (random(0,width), random(0,height), random(-1,1), 1, random(1,50));
    balls.push(ball);
  }
}

function draw() {
  background(220);
  for (let b of balls) { 
    b.display();
    b.move(); 
      if (b.hover(mouseX, mouseY)) {
        let ind = balls.indexOf(b);
         balls.splice(ind,1); 
      }
    }
}function setup() {
  createCanvas(400, 400);
  background(255)
  frameRate(60);
}

function draw() {
  background(255,10);
  fill(random(255),random(255),random(255));
  textSize(random(10,80));
  text("Sanding!", random(-80,width),random(-30,height));
}let colorIsRed = false;
let colorHasChanged = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  if (colorIsRed) {
    fill(255, 0, 0);
  } else {
    fill(255, 255, 255);
  }

  rect(200, 200, 100, 100);
  if (mouseX > 200 && mouseX < 300 && mouseY < 300 && mouseY > 200) {
    if (!colorHasChanged) {
      colorIsRed = !colorIsRed;
      colorHasChanged = true;
    }
  } else {
    colorHasChanged = false;
  }
}let colorIsRed = false;
let colorHasChanged = false;

function setup() {
  createCanvas(400, 400);
  x = 10;
  y = 10;
}

function draw() {
  background(220);

  if (colorIsRed) {
    fill(255, 0, 0);
  } else {
    fill(255, 255, 255);
  }

  rect(200, 200, 100, 100);
  if (mouseX > 200 && mouseX < 300 && mouseY < 300 && mouseY > 200) {
    if (!colorHasChanged) {
      colorIsRed = !colorIsRed;
      colorHasChanged = true;
    }
  } else {
    colorHasChanged = false;
  }

}function setup() {
	createCanvas(400, 400);

	stroke(27, 245, 36);
	line(0, 0, 200, 100);

	noStroke();
	fill(247, 245, 36);
	rect(100, 100, 100, 200);

	noStroke();
	fill(247, 245, 36);
	ellipse(200, 100, 200, 200);


}

function draw() {
	background(80);
	  stroke(241, 254, 1)
  
  strokeWeight(2);
  line(200, 100, 380, 100);
  line(290, 15, 290, 190);
  line(220, 130, 360, 70);
  line(235, 170, 340, 30);
  line(250, 30, 330, 180);
  line(220, 65, 370, 140);
  
  
  
	noStroke();
  strokeWeight(1);
  fill(80);
  ellipse(290, 100, 108, 108);
  fill(243, 6, 96);
  ellipse(290, 100, 90, 90);
  fill(254, 186, 0);
  ellipse(290, 100, 68, 68);
  fill(5, 174, 250);
  ellipse(278, 97, 8, 8);
  ellipse(300, 97, 8, 8);
  
  stroke(0);
  strokeWeight(3);
  line(285, 110, 295, 110);
  
  stroke(0);
  strokeWeight(1);
  fill(254, 215, 0);
  rect(70, 200, 90, 105);
  fill(186, 100, 24);
  rect(70, 280, 90, 40);
  line(70, 300, 160, 300);
  
  stroke(0);
  strokeWeight(1);
  fill(255);
  ellipse(102, 235, 25, 25);
  fill(0, 210, 255);
  ellipse(104, 235, 13, 13);
  fill(0);
  ellipse(104, 235, 8, 8);
  
  stroke(0);
  strokeWeight(1);
  fill(255);
  ellipse(127, 235, 25, 25);
  fill(0, 210, 255);
  ellipse(125, 235, 13, 13);
  fill(0);
  ellipse(125, 235, 8, 8);
  
  stroke(0);
  strokeWeight(3);
  line(30, 258, 68, 235);
  
  
  

}// let IAgree = "01001001 01000001 01100111 01110010 01100101 01100101";
let Hopefully = "01001000 01101111 01110000 01100101 01100110 01110101 01101100 01101100 01111001 00101110";

let code = Hopefully;

function setup() {
  createCanvas(400, 400);
  background(220);
  let codes = code.split(" ");
  translate(50, 50);
  rect(-20,0, 10, 10);
  for (i = 0; i < codes.length; i++) {
    for (j = 0; j < codes[i].length; j++) {
      fill(0);
      if (codes[i].charAt(j) == "1") rect(i * 20, j * 20, 10, 10);
      
    }
  }
}

function draw() {
	let word = "hope";
  print(word.charCodeAt(2));
}let kin;

function setup() {
  createCanvas(400, 400);
  kin = new Kinectron('172.22.151.79');
  kin.startTrackedBodies(drawBody);
}

function draw() {
  background(220);
}

var drawBody = (body) => {

	console.log(body);

};let users = []

function setup() { 
  createCanvas(400, 400);
  // users.push({x:50, y:70});
  users.push({x:120, y:30});
  users.push({x:200, y:200})
} 



function draw() { 
  background(220);
  users[1].x = mouseX;
  users[1].y = mouseY;
  
  let middleX = 0;
  let middleY = 0;
  
  for (i = 0; i < 2; i ++) {
    middleX += users[i].x;
    middleY += users[i].y;
  }
  middleX /= 2;
  middleY /= 2;
  
  ellipse(middleX, middleY, 100,100 );
  
  for (i = 0; i < 2; i ++) {
    ellipse(users[i].x, users[i].y, 20,20 );
  }
  
  
}var cps = [];
let howMany = 15


function setup() {
  createCanvas(400, 400);
  cps = CreatePoints(30);
}

function draw() {
  background(220);
  noLoop();
  DrawCurve(cps);
}

function CP() {
  let cp = floor(random(0, width));
  return cp
}

function CreatePoints(howMany){
  let points = [];
  let x1s = [];
	let x2s = [];
  let y1s = [];
	let y2s = [];

	for (var i = 0; i < howMany/2; i++) {
		x1s.push(random(10, width-10));
		x2s.push(random(10, width-10));
		y1s.push(random(10, width-10));
		y2s.push(random(10, width-10));
	}

	x1s.sort((a, b) => a - b);
	x2s.sort((a, b) => b - a);
	y1s.sort((a, b) => a - b);
	y2s.sort((a, b) => b - a);

	for (var i = 0; i < howMany/2; i++) {
		points.push(x1s[i],y1s[i]);
	}
	for (var i = 0; i < howMany/2; i++) {
		points.push(x2s[i],y2s[i]);
	}
	return points
}

function DrawCurve(points) {
  for (let i = 0; i < points.length; i += 2) {
    let p = [];
    for (let add = 0; add < 8; add += 1) {
      if ((i + add) < points.length) {
        p.push(points[i + add]);
      } else {
        p.push(points[i + add - points.length]);
      }

    }
    curve(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7]);
    p = [];
  }
}

function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}let dots = [];
let hue;
let pd = 20;
function setup() {
	createCanvas(480, 480);
	colorMode(HSB, 360, 100,100,100);
	hue = 0;
}

function draw() {
	background(40);
  DrawCanvas();
	ShowBrush();
  if (dots.length > 0){
	for (var i = 0; i<dots.length; i++){
		let x = dots[i].x;
		let y = dots[i].y;
		let color = dots[i].color;
		push();
		fill(color);
		rect(x,y,pd,pd);
		pop();
	}
  }
}


function ShowBrush (){
	let x = Math.floor(mouseX/pd)*pd;
	let y = Math.floor(mouseY/pd)*pd;
	let c = color(hue,80,80);
	push();
	fill(c);
	rect(x,y,pd,pd);
	pop();
}

function mousePressed () {
  DrawDot ();
}


function keyPressed() {
  console.log(keyCode);
  if (keyCode === 67) {
    hue += 60;
    if (hue >=360){
      hue = 0;
    }
  } 
}

function DrawDot (){
	let x = Math.floor(mouseX/pd)*pd;
	let y = Math.floor(mouseY/pd)*pd;
	let c = color(hue,80,80);
	let dot = {
		x:x,
		y:y,
		color:c,
	}
	dots.push(dot);
}

function DrawCanvas() {
  for (i = 0; i < (width/pd)/2; i++){
    push();
    // noStroke();
    let c = color(0,0,0,2);
    fill(c);
    rect(2*i*pd, 0, pd, height);
    rect(0, 2*i*pd, width, pd);
    pop();
  }

}var system;
let color1;
function setup() {
  createCanvas(720, 400);
  colorMode(HSB, 360,100,100,1);
  color1 = color(55, 100, 100, 0.5);
  system = new ParticleSystem(createVector(mouseX, 80));
}

function draw() {
  background(51);
  system.addParticle();
  system.run();
}

// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = position.copy();
  this.lifespan = 255.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(0);
  fill(color1, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};let timeStart;
let gravity = 0.001;
let speed = 0.2;
let yyspeed = 0.1;
let y = 0;
let yy = 0;
let nextyy = 0;
function setup() { 
  rectMode(CENTER);
  createCanvas(400, 400);
  timeStart = new Date().getTime();
} 

function draw() { 
  background(220);
  let s10 = floor(frameCount / 150);
  
  nextyy = 0 + s10 * 20;

  if (y >= 0) {
    speed -= gravity;
  }
  if (y < 0) {
    speed += gravity;
  }
  
  y += speed;
  
  if (yy < nextyy) {
    yy += yyspeed;
  }
  push();
  translate(width/2, height/2 - yy);
  rect(0,y, 10, 10);  
  line(-100, 0, 100, 0);
  console.log(y);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  translate(width / 2, height / 2);
rotate(millis() / 1000,);
rect(-26, -26, 52, 52);
}/*
Mimi Yin NYU-ITP
Drawing skeleton joints and bones.
 */

// Declare kinectron
var kinectron = null;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.16.230.153");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  background(0);
}

function draw() {
  //background(0);
}

function bodyTracked(body) {
  background(0);

  // Draw all the joints
  kinectron.getJoints(drawJoint);

  // Get all the joints off the tracked body and do something with them

  // Mid-line
  var head = getPos(body.joints[kinectron.HEAD]);
  var neck = getPos(body.joints[kinectron.NECK]);
  var spineShoulder = getPos(body.joints[kinectron.SPINESHOULDER]);
  var spineMid = getPos(body.joints[kinectron.SPINEMID]);
  var spineBase = getPos(body.joints[kinectron.SPINEBASE]);

  // Right Arm
  var shoulderRight = getPos(body.joints[kinectron.SHOULDERRIGHT]);
  var elbowRight = getPos(body.joints[kinectron.ELBOWRIGHT]);
  var wristRight = getPos(body.joints[kinectron.WRISTRIGHT]);
  var handRight = getPos(body.joints[kinectron.HANDRIGHT]);
  var handTipRight = getPos(body.joints[kinectron.HANDTIPRIGHT]);
  var thumbRight = getPos(body.joints[kinectron.THUMBRIGHT]);

  // Left Arm
  var shoulderLeft = getPos(body.joints[kinectron.SHOULDERLEFT]);
  var elbowLeft = getPos(body.joints[kinectron.ELBOWLEFT]);
  var wristLeft = getPos(body.joints[kinectron.WRISTLEFT]);
  var handLeft = getPos(body.joints[kinectron.HANDLEFT]);
  var handTipLeft = getPos(body.joints[kinectron.HANDTIPLEFT]);
  var thumbLeft = getPos(body.joints[kinectron.THUMBLEFT]);

  // Right Leg
  var hipRight = getPos(body.joints[kinectron.HIPRIGHT]);
  var kneeRight = getPos(body.joints[kinectron.KNEERIGHT]);
  var ankleRight = getPos(body.joints[kinectron.ANKLERIGHT]);
  var footRight = getPos(body.joints[kinectron.FOOTRIGHT]);

  // Left Leg
  var hipLeft = getPos(body.joints[kinectron.HIPLEFT]);
  var kneeLeft = getPos(body.joints[kinectron.KNEELEFT]);
  var ankleLeft = getPos(body.joints[kinectron.ANKLELEFT]);
  var footLeft = getPos(body.joints[kinectron.FOOTLEFT]);

  noFill();
  stroke(255);
  strokeWeight(10);

  // Draw Bust
  beginShape();
  vertex(head.x, head.y);
  vertex(neck.x, neck.y);
  vertex(spineShoulder.x, spineShoulder.y);
  vertex(spineMid.x, spineMid.y);
  vertex(spineBase.x, spineBase.y);
  endShape();


  // Draw shoulders
  line(spineShoulder.x, spineShoulder.y, shoulderRight.x, shoulderRight.y);
  line(spineShoulder.x, spineShoulder.y, shoulderLeft.x, shoulderLeft.y);


  // Draw Right Arm
  beginShape();
  vertex(shoulderRight.x, shoulderRight.y);
  vertex(elbowRight.x, elbowRight.y);
  vertex(wristRight.x, wristRight.y);
  vertex(handRight.x, handRight.y);
  vertex(handTipRight.x, handTipRight.y);
  endShape();

  // Draw Right Thumb
  line(handRight.x, handRight.y, thumbRight.x, thumbRight.y);

  // Draw Left Arm (on top of head)
  // push();
  // var offset = p5.Vector.sub(head, shoulderLeft);
  // translate(offset.x, offset.y);
  // beginShape();
  // vertex(shoulderLeft.x, shoulderLeft.y);
  // vertex(elbowLeft.x, elbowLeft.y);
  // vertex(wristLeft.x, wristLeft.y);
  // vertex(handLeft.x, handLeft.y);
  // vertex(handTipLeft.x, handTipLeft.y);
  // endShape();
  // pop();


  // Draw Left Arm
  beginShape();
  vertex(shoulderLeft.x, shoulderLeft.y);
  vertex(elbowLeft.x, elbowLeft.y);
  vertex(wristLeft.x, wristLeft.y);
  vertex(handLeft.x, handLeft.y);
  vertex(handTipLeft.x, handTipLeft.y);
  endShape();

  // // Draw Left Thumb
  line(handLeft.x, handLeft.y, thumbLeft.x, thumbLeft.y);
  //
  // // Draw hips
  line(spineBase.x, spineBase.y, hipRight.x, hipRight.y);
  line(spineBase.x, spineBase.y, hipLeft.x, hipLeft.y);
  //
  // // Draw Right Leg
  beginShape();
  vertex(hipRight.x, hipRight.y);
  vertex(kneeRight.x, kneeRight.y);
  vertex(ankleRight.x, ankleRight.y);
  vertex(footRight.x, footRight.y);
  endShape();
  //
  // // Draw Left Leg
  beginShape();
  vertex(hipLeft.x, hipLeft.y);
  vertex(kneeLeft.x, kneeLeft.y);
  vertex(ankleLeft.x, ankleLeft.y);
  vertex(footLeft.x, footLeft.y);
  endShape();
}

// Scale the data to fit the screen
// Return it as a vector
function getPos(joint) {
  return createVector((joint.cameraX * width/2) + width/2, (-joint.cameraY * width/2) + height/2);
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  var pos = getPos(joint);

  //Kinect location data needs to be normalized to canvas size
  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
}var face;
var leftEye = [];
var rightEye = [];
var head = [];
var mouth = [];
var center = [];
var eyeCenter = [];
// fDS : face dots shifted
var fDS = [];

function setup() {
  createCanvas(600, 600);
  ellipseMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(255);

  if (face != undefined) {

    center = [
      face.vertices[0 * 2] + (face.vertices[16 * 2] - face.vertices[0 * 2]) / 2,
      face.vertices[1 * 2 + 1] + (face.vertices[15 * 2 + 1] - face.vertices[1 * 2 + 1]) / 2,
    ];

    for (var i = 0; i < face.vertices.length; i += 2) {
      fDS[i / 2] = [face.vertices[i] - center[0], face.vertices[i + 1] - center[1]];
    }

    head = [
      0, 0,
      fDS[16][0] - fDS[0][0],
      (fDS[8][1] - fDS[29][1]) * 2
    ];

    leftEye = [
      fDS[41][0] + (fDS[40][0] - fDS[41][0]),
      fDS[41][1],
      fDS[40][0] - fDS[41][0],
      fDS[40][1] - fDS[38][1],
    ]
    rightEye = [
      fDS[47][0] + (fDS[46][0] - fDS[47][0]) / 2,
      fDS[46][1],
      fDS[46][0] - fDS[47][0],
      fDS[47][1] - fDS[43][1],
    ]
    mouth = [
      fDS[60][0] + (fDS[64][0] - fDS[60][0]) / 2,
      fDS[62][1],
      fDS[64][0] - fDS[60][0],
      fDS[66][1] - fDS[62][1],
    ]

    var a = atan2(fDS[16][0] - fDS[0][0], fDS[16][1] - fDS[0][1]);

    push();
    translate(center[0], center[1]);
    rotate(-a + 90);
    fill(255);
    stroke(0);
    strokeWeight(4);
    ellipse(head[0], head[1], head[2] * 1.2, head[3]);
		bezier(
			fDS[48][0],fDS[48][1]*0.95,
			fDS[67][0],fDS[67][1],
			fDS[65][0],fDS[65][1],
			fDS[54][0],fDS[54][1]*0.95,
		);
		bezier(
			fDS[48][0],fDS[48][1]*0.95,
			fDS[61][0],fDS[61][1],
			fDS[63][0],fDS[63][1],
			fDS[54][0],fDS[54][1]*0.95,
		);
    pop();

    push();
    translate(center[0], center[1]);
    rotate((-a + 90) / 4);
    console.log(-a, -a + 90, (-a + 90) / 2);
    fill(0);
    ellipse(leftEye[0], leftEye[1], leftEye[2] * 1.2, leftEye[3] * 1.2);
    ellipse(rightEye[0], rightEye[1], rightEye[2] * 1.2, rightEye[3] * 1.2);

    pop();

    // for (var k = 0; k < fDS.length; k += 1) {
    //   let x = fDS[k][0];
    //   let y = fDS[k][1];
    //   noStroke();
    //   fill(200);
    // 	push();
    // 	translate(center[0],center[1]);
    //   ellipse(x, y, 2, 2);
    // 	pop();
    // }
  }
}




function initExample() {

  var webcam = document.getElementById("_webcam"); // our webcam video
  var imageData = document.getElementById("_imageData"); // image data for BRFv4

  var brfManager = null;
  var resolution = null;
  var brfv4 = null;

  startCamera();

  function startCamera() {

    // Start video playback once the camera was fetched.
    function onStreamFetched(mediaStream) {

      webcam.srcObject = mediaStream;
      webcam.play();

      // Check whether we know the video dimensions yet, if so, start BRFv4.
      function onStreamDimensionsAvailable() {

        if (webcam.videoWidth === 0) {
          setTimeout(onStreamDimensionsAvailable, 100);
        } else {
          waitForSDK();
        }
      }

      onStreamDimensionsAvailable();
    }

    window.navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          frameRate: 30
        }
      })
      .then(onStreamFetched).catch(function() {
        alert("No camera available.");
      });
  }

  function waitForSDK() {

    if (brfv4 === null) {
      brfv4 = {
        locateFile: function() {
          return "js/libs/brf/BRFv4_JS_trial.js.mem"
        }
      };
      initializeBRF(brfv4);
    }

    if (brfv4.sdkReady) {
      initSDK();
    } else {
      setTimeout(waitForSDK, 100);
    }
  }

  function initSDK() {

    // Resize the canvas to match the webcam video size.
    imageData.width = webcam.videoWidth;
    imageData.height = webcam.videoHeight;

    resolution = new brfv4.Rectangle(0, 0, imageData.width, imageData.height);

    brfManager = new brfv4.BRFManager();
    brfManager.init(resolution, resolution, "com.tastenkunst.brfv4.js.examples.minimal.webcam");

    trackFaces();
  }

  function trackFaces() {

    var imageDataCtx = imageData.getContext("2d");

    imageDataCtx.setTransform(-1.0, 0, 0, 1, resolution.width, 0); // mirrored for draw of video
    imageDataCtx.drawImage(webcam, 0, 0, resolution.width, resolution.height);
    imageDataCtx.setTransform(1.0, 0, 0, 1, 0, 0); // unmirrored for draw of results

    brfManager.update(imageDataCtx.getImageData(0, 0, resolution.width, resolution.height).data);

    var faces = brfManager.getFaces();

    for (var i = 0; i < faces.length; i++) {
      face = faces[i];
    }

    requestAnimationFrame(trackFaces);
  }
}

window.onload = initExample;function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  fill(100);
beginShape();
curveVertex(84,  91);
curveVertex(84,  91);
curveVertex(68,  19);
curveVertex(21,  17);
curveVertex(32, 100);
curveVertex(32, 100);

endShape();


}let handImg
let fingerImg
let spinnerImg

function preload() {
  handImg = loadImage("images/hand.png");
  fingerImg = loadImage("images/finget.png");
  spinnerImg = loadImage("images/spiner.png");
}

function setup() { 
  createCanvas(800, 800);
  imageMode(CENTER);
} 

function draw() { 
  background(220);
  translate(400,400);
  image(handImg,0,0,600,600);
}// ICM-2016

// Take a look at the HTML file where some things have been
// added for mobile viewing

var colors;

function setup() {
  // Make the canvas the size of the mobile device screen
  createCanvas(windowWidth, windowHeight);
  background(200);

  // An array of five colors, one for each finger
  colors = [color(255,0,0), color(0,255,0), color(0,0,255), color(255, 255,0), color(0,255,255)];
}

function draw() {
  // The touches array holds an object for each and every touch
  // The array length is dynamic and tied to the number of fingers 
  // currently touching
  for (var i = 0; i < touches.length; i++) {
    noStroke();
    // One color per finger
    fill(colors[i]);
    // Draw a circle at each finger
    ellipse(touches[i].x, touches[i].y, 24, 24);
    print(touches.length);
  }
}

// this prevents dragging screen around
function touchMoved() {
  return false;
}
var kinectron = null;



function preload() {

}


function setup() {
  createCanvas(640, 480, WEBGL);
  var address = {
    host: '172.16.216.84',
    port: 9001,
    path: '/'
  };
  kinectron = new Kinectron('kinectron', address);
  kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
  //set the callback function name to be called when stuff comes from kinect
}

function draw() {
}

function trackBody(body) {

  var val;
  var whichJoint = kinectron.HANDRIGHT;
  val = body.joints[whichJoint].cameraX;
  var jointX = map(val, -1, 1, 0, width);
  val = body.joints[whichJoint].cameraY;
  var jointY = map(val, -1, 1, height, 0); //height numbers bigger at the bottom
  val = body.joints[whichJoint].cameraZ;
  var jointZ = map(val, 0, 3, 800, 0);
  //println( "x" + round(jointX)  + "   y" + round(jointY) + "   z" +  round(jointZ));
  //in 3D land you use translate to move to a positon
  translate(jointX - width / 2, jointY - height / 2, jointZ);

  val = body.joints[whichJoint].orientationX;
  var jointRotX = map(val, 0, 1, 0, 2 * PI);
  val = body.joints[whichJoint].orientationY;
  var jointRotY = map(val, -1, 1, 0, 2 * PI); //height numbers bigger at the bottom
  val = body.joints[whichJoint].orientationZ;
  var jointRotZ = map(val, -1, 1, 0, 2 * PI);
  //	println( "x" + jointRotX  + "   y" + jointRotY + "   z" +  jointRotZ);
  rotateX(jointRotZ);
  rotateY(jointRotX);
  rotateZ(jointRotY);
  //The parameters for Box are about size rather than location.
  //location is taken care of by translate
  box(50, 100, 50);
}

var kinectron = null;
var lightImage;

function preload(){
  lightImage = loadImage("light.jpg");
}

function setup() {
	createCanvas(500, 500);
  var address = {host: '172.16.216.84', port: 9001, path: '/'};
	kinectron = new Kinectron('kinectron',address);
	kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
  //set the callback function name to be called when stuff comes from kinect
}

function draw() {

}

function trackBody(body) {
	background(255);
  var val = body.joints[kinectron.HANDLEFT].depthX;
  var leftX =  map(val,0,1,0,width);
  val = body.joints[kinectron.HANDLEFT].depthY;
  var leftY = map(val,0,1,0,height);
  val = body.joints[kinectron.HANDRIGHT].depthX;
  var rightX = map(val,0,1,0,width);
  val = body.joints[kinectron.HANDRIGHT].depthY;
  var rightY = map(val,0,1,0,height);
  imageMode(CORNERS);
 	image(lightImage,leftX,leftY,rightX,rightY);
}//PLEASE RUN IT IN FULL SCREEN

var imNotGod;
var partyOrDie;
var useOnlineData = 1;
var bgColor;
var isGoingUp = 1;
var percentChange = 0;
var ndx;
var gravity = 0.8;
var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NDX&interval=1min&apikey=CBWCNIM5UZXM6GDB&datatype=csv";

var tableNew;

var bankers = [];
var bankerCount = 0;
var building;

var bullDoze;

var screams = [];

function preload(){
  soundFormats('mp3');
  for (var i = 0; i < 12; i++) {
    screams.push(loadSound('assets/Screams/Scream'+i+'.mp3'));
  }
  // gunSound = loadSound('./assets/GunSound.mp3');
  partySound = loadSound('./assets/PartySong.mp3');
  neckSnap = loadSound('./assets/neckSnap.mp3');
  body1 = loadImage('./assets/body1.png');
  body3 = loadImage('./assets/body3.png');
  head1 = loadImage('./assets/head1.png');
  head3 = loadImage('./assets/head3.png');
  bullDozeImg = loadImage('./assets/bullDoze.png');

  road = loadImage('./assets/road.png');
  bank = loadImage('./assets/bank.png');

  tableNew = loadTable(url, "csv", "header");
}

function setup(){
  ndx = new NASDAQ();
  bullDoze = new BullDoze(windowWidth + 100, (windowHeight - 180), 250);
  // NewTableToObject();
  imageMode(CENTER);
  RadioImNotGod();
  PriceController();
  colorMode(HSB,360,100,100,100);
  rectMode(CENTER);
  createCanvas(windowWidth,windowHeight);

  bgColor = color(225, 80,30,100);
  frameRate(30);
  textAlign(CENTER);

  PartyOrDie();
  building = new Building();


}

function draw(){
  if (frameCount % 30 == 0) {
    console.log(bankers.length);
  }
  GodMode();
  background(bgColor);
  building.show();
  ndx.showText();
  bullDoze.show();
  PartyOrDie();
  if (isGoingUp == 0 && frameCount % 90 < 1 && bankers.length < 30) {
    bankers.push(new Banker(random(220,380),height - 700,random(-80,80),random(0,10)));
  }

  for (var i = 0; i < bankers.length; i++) {
    bankers[i].show();
    if (bankers[i].x < -200){
      bankers.splice(i,1);
    }
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function RefreshTable(){
  if (frameCount % 1800 == 100) {
    tableNew = loadTable(url, "csv", "header", GetNewNumbers);
  }
}

function NewTableToObject(){
  ndx.table = tableNew;
}

class NASDAQ {
  constructor() {
    this.table = tableNew;
    this.numberShown;
    this.newNumber;
    this.oldNumber;
    this.timeOfData;
    this.percentChange;
  }

  refreshNumbers() {
    this.newNumber = Number(this.table.getString(0, 'close'));
    this.oldNumber = Number(this.table.getString(1, 'close'));
    this.timeOfData = this.table.getString(0, 'timestamp');
    // print("NDX Refreshed");
  }

  showText() {
    if (useOnlineData) {
      this.numberShown = this.newNumber;
      this.percentChange = Math.round(((this.numberShown - this.oldNumber) / this.oldNumber) * 100 * 1000.0) / 100;
    } else {
      let ndxGod = priceSlider.value();
      this.percentChange = ndxGod * 10;
      this.numberShown = this.oldNumber + (this.oldNumber * this.percentChange / 1000);
    }

    this.refreshNumbers();
    fill(255);
    textSize(12);
    text("Refreshed: " + this.timeOfData, windowWidth * 3 / 4, 20);
    textSize(24);
    let ndxText = Math.round(this.numberShown * 100.0) / 100.0;

    let percentChangeText;
    if (this.percentChange < 0) {
      isGoingUp = 0;
      percentChangeText = " ↓ " + "" + this.percentChange + "‰";
    } else {
      isGoingUp = 1;
      percentChangeText = " ↑ " + "+" + this.percentChange + "‰";
    }

    text("NASDAQ: " + ndxText + "            Change: " + percentChangeText, windowWidth * 3 / 4, 120);
    textSize(36);
    text(partyOrDie, windowWidth * 3 / 4, 240);
    textSize(18)
    textAlign(CENTER);
    text(godMessage, windowWidth * 3 / 4, windowHeight - 300, );
  }
}


class Building {
  constructor() {
    this.color = color(20, 10, 95, 100);
  }

  show() {
    push();
    translate(200, height - 700);
    imageMode(CORNER);
    rectMode(CORNER);
    if (isGoingUp == 1) {
      if (frameCount % 10 == 0) {
        this.color = color(random(360), 50, 80, 100);
      }
      fill(this.color);
      rect(20, 20, 136, 416);
    }
    else {
      fill(color(0,80,20,100));
      rect(20, 20, 136, 416);
    }
    image(bank, 0, 0, 176, 456);
    image(road, -300, 456, width + 500, 150);
    pop();
  }
}

class Banker {
  constructor(x, y, deadline, angle) {
    this.x = x;
    this.y = y;
    this.phrase = 1;
    this.scale = 0.01;
    this.speed = -4;
    this.headx = 0;
    this.heady = -320;
    this.heads = -10;
    this.headFric = 0.5;
    this.blood = 1;
    this.deadline = deadline;
    this.angle = angle;
  }

  show() {
    push();
    translate(this.x, this.y);
    // console.log(this.x);
    scale(this.scale);
    if (this.phrase == 1) {
      this.p1();
    } else if (this.phrase == 2) {
      this.p2();
    } else if (this.phrase == 3) {
      this.p3();
    }
    pop();
    this.closer();
    this.drop();
  }
  closer() {
    if (this.phrase == 1) {
      this.scale += 0.001;
      this.y -= 0.4;
      this.y += sin(frameCount);
      if (this.scale >= 0.1) {
        if (this.phrase == 1) {
          screams[floor(random(screams.length))].setVolume(0.3);
          screams[floor(random(screams.length))].play();
        }
        this.phrase = 2;
      }
    }
  }

  drop() {
    if (this.phrase == 2) {


      this.y += this.speed;
      this.speed += gravity;
    }
    if (this.y >= (height - 180 + this.deadline)) {
      // scream2.stop();
      if (this.phrase == 2 && neckSnap.isPlaying() != 1) {
        neckSnap.setVolume(0.5);
        neckSnap.play();
      }
      this.phrase = 3;
    }
  }

  p1() {
    image(head1, 0, -210, );
    image(body1, 0, 110, );
  }
  p2() {

    image(head1, 0, -210, );
    image(body1, 0, 110, );
  }
  p3() {
    push();
    fill(color(0, 89, 75, 100));
    ellipse(0, 0, this.blood * 2, this.blood);
    rotate(PI * this.angle);
    image(body3, 0, 110, );
    rotate(PI / this.angle);
    image(head3, this.headx, this.heady, );
    pop();
    this.heady += this.heads;
    if (this.heads < 0) {
      this.heads += this.headFric;
    }

    if (this.blood < 300) {
      this.blood += 5;
    }

    if(this.x > bullDoze.x && (this.x - bullDoze.x) < 20)
    this.x = bullDoze.x;
  }
}

function PartyOrDie() {
  if (isGoingUp == 1) {
    bgColor = color(225, 80, 30, 100);
    partyOrDie = "STOCKS ARE GOING UP! \n LET'S PARTY!"
    if (partySound.isPlaying() != 1) {
      partySound.setVolume(0.5);
      partySound.play();
    }
  } else {
    bgColor = color(00, 80, 90, 100);
    partyOrDie = "STOCKS ARE GONNA CRASH! OH NO!! \n I LOST MY WILL TO LIVE!!"
    partySound.pause();
  }
}

function GodMode() {
  if (imNotGod.value() == 1) {
    priceSlider.hide();
    useOnlineData = 1;
    godMessage = "Using Realtime Stock Data.";
  }
  if (imNotGod.value() == 0) {
    priceSlider.show();
    useOnlineData = 0;
    godMessage = "You are the GOD! \n By the SLIDER you can control the stock market!";
  }
}

class BullDoze {
  constructor(x,y,size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = - 1;
  }
  show (){
    if (bankers.length > 0){
      imageMode(CENTER);
      image(bullDozeImg, this.x+this.size/3, this.y,this.size,this.size);
      this.x+= this.speed;
      if (this.x < - 300){
        this.x = width + this.size;
      }
    }
  }
}

function RadioImNotGod() {
  imNotGod = createRadio();
  imNotGod.option("I'm the God. \n", 0);
  imNotGod.option("No I'm not.", 1);
  imNotGod.value(1);
  imNotGod.style('width', '200px');
  imNotGod.style('color', '#ffffff')
  imNotGod.style('font-size', '24px')
  imNotGod.style('text-align', 'left');
  imNotGod.position(windowWidth * 3 / 4 - 80, 360);
}

var priceSlider;
function PriceController(){
  priceSlider = createSlider(-100,100,0,1);
  priceSlider.position(windowWidth*3/4+130, 370);
  priceSlider.style('width','120px');
}var nasdaq;
var tableTemp;
var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NDX&interval=1min&apikey=CBWCNIM5UZXM6GDB&datatype=csv";

function preload(){
  nasdaq = new NASDAQ();
  tableTemp = loadTable(url, "csv", "header");
  
}

function setup() { 
  frameRate(30);
  createCanvas(400, 400);
  nasdaq.refreshTable();
} 

function draw() { 
  // GetNewTable ();
  background(220);
  GetNewTable ();
}

function GetNewTable (){
  if (frameCount % 600 == 0){
  tableTemp = loadTable(url, "csv", "header", nasdaq.refreshTable);
  }
}

class NASDAQ {
  constructor() {
    this.table;
    // this.numberShown;
    // this.newNumber;
    // this.oldNumber;
    this.timeOfData;
    // this.percentChange;
  }

  refreshTable(){
    print("NDX Refreshing");
    this.table = tableTemp;
    print("NDX Refreshed");
    this.timeOfData = this.table.getString(0, 'timestamp');
    print("Time Refreshed");
    print(nasdaq.timeOfData);
  }
}var nasdaq;
var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NDX&interval=1min&apikey=CBWCNIM5UZXM6GDB&datatype=csv";

function preload(){
  nasdaq = new NASDAQ();
  nasdaq.loadTable();
}

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  print(nasdaq.newNumber);
}

class NASDAQ {
  
  constructor() {
    this.tableTemp;
    this.table;
    // this.table = tablePreload;
    // this.getNdxNumber();
    this.numberShown;
    this.newNumber;
    this.oldNumber;
    this.timeOfData;
    this.percentChange;
  }

  loadTable(){
    // if ((frameCount % 1800) == 100) {
      this.tableTemp = loadTable(url, "csv", "header", this.getNdxNumber);
    // }
  }

  getNdxNumber() {
    print("NDX Refreshing");
    this.table = this.tableTemp;
    print("NDX Refreshed");
    this.timeOfData = this.table.getString(0, 'timestamp');
  }
}let url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NDX&interval=1min&apikey=WTYZS928Z4H9E483&datatype=csv";


function setup() { 
  table = loadTable(url, "csv", "header", refreshTable);
  createCanvas(400, 400);
} 

function draw() { 
  
}

function refreshTable(){
  print(Number(table.getString(1, 'close')))
}let gravity = 0.5;

function setup() { 
  rectMode(CENTER);
  createCanvas(400, 400);
  banker1 = new Banker(100,100,color(150));
} 

function draw() { 
  background(220);
  banker1.show();
}


class Banker {
  constructor(x,y,color) {
    this.x = y;
    this.y = y;
    this.phrase = 1;
    this.color = color;
    this.scale = 0.1;
    this.speed = -4;
    this.size = windowHeight/20;
  }

  show(){
    push();
    translate(this.x,this.y);
    scale(this.scale);
    if (this.phrase == 1){
      this.p1();
    }
    else if (this.phrase == 2) {
      this.p2();
    }
    else if (this.phrase == 3) {
      this.p3();
    }
    pop();
    this.closer();
    this.drop();

  }
  closer (){
    if (this.phrase == 1) {
      this.scale += 0.05;
      if (this.scale >=1 ) {
        this.phrase = 2;
      }
    }
  }

  drop (){
    if (this.phrase == 2){
      this.y += this.speed;
      this.speed += gravity;
    }
    if (this.y >= (height - 100)){
      this.phrase = 3;
    }
  }

  p1 (){
    fill(this.color);
    rect(0,0,40,40);
  }
  p2 (){
    fill(100);
    rect(0,0,40,20);
    fill(this.color);
    rect(0,0,40,20);
  }
  p3 (){
    fill(0,80,80,100);
    ellipse(0,0,60,20);
  }
}
var mitoImg;
var mitoImages = [];
// var bgImg;
var imgNumber = 0;


function preload(){
  mitoImages.push(loadImage('assets/motochondria.png'));
  mitoImages.push(loadImage('assets/motochondria2.png'));
  mitoImages.push(loadImage('assets/motochondria3.png'));
  mitoImages.push(loadImage('assets/motochondria4.png'));
  mitoImages.push(loadImage('assets/motochondria5.png'));

}


function setup(){
  ChangeMito();

  // imgNumber = 0;
  
  imageMode(CENTER);
  createCanvas(windowWidth,windowHeight);
  // background(0);
  // var mito = new Mito(0,0,1,1);
  // mito.show();
}

function draw(){
  // if (frameCount % 10 == 0){
  //   ChangeMito();
  // }
  
	// image(bgImg,windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  background(255);
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text('Click Anywhere!', windowWidth/2, windowHeight/2,);

	translate(width/2, height/2);
	for (var i = 0; i < 8; i++) {
		push();
    scale(2);
		rotate((TWO_PI * i + mouseY/20)/ 8);
		var tx = 200 * noise(0.01*frameCount);
		translate(tx, 0);
		image(mitoImg, 0, 0,40,40);
		for (var j = 0; j < 6; j++) {
			push();
			rotate((TWO_PI * j + mouseX/20)/ 6);
			var rx = 60 * noise(0.01*frameCount + 10);
			// rect(rx, 0, 8, 8);
      image(mitoImg,rx, 0,16,16);
			pop();
		}
		translate()
		pop();
	}
}

function mousePressed(){
  ChangeMito();
}


function ChangeMito(){
  mitoImg = mitoImages[imgNumber % 5];
  imgNumber += 1;
}
var mitoImg;
var mitoImages = [];
// var bgImg;
var imgNumber = 0;


function preload(){
  mitoImages.push(loadImage('assets/motochondria.png'));
  mitoImages.push(loadImage('assets/motochondria2.png'));
  mitoImages.push(loadImage('assets/motochondria3.png'));
  mitoImages.push(loadImage('assets/motochondria4.png'));
  mitoImages.push(loadImage('assets/motochondria5.png'));

}


function setup(){

  // imgNumber = 0;
  ChangeMito();
  imageMode(CENTER);
  createCanvas(windowWidth,windowHeight);
  // background(0);
  // var mito = new Mito(0,0,1,1);
  // mito.show();
}

function draw(){
	// image(bgImg,windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  background(255);
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text('Click Anywhere!', windowWidth/2, windowHeight/2,);

	translate(width/2, height/2);
	for (var i = 0; i < 8; i++) {
		push();
    scale(2);
		rotate((TWO_PI * i + mouseY/20)/ 8);
		var tx = 200 * noise(0.01*frameCount);
		translate(tx, 0);
		image(mitoImg, 0, 0,40,40);
		for (var j = 0; j < 6; j++) {
			push();
			rotate((TWO_PI * j + mouseX/20)/ 6);
			var rx = 60 * noise(0.01*frameCount + 10);
			// rect(rx, 0, 8, 8);
      image(mitoImg,rx, 0,16,16);
			pop();
		}
		translate()
		pop();
	}
}

function mousePressed(){
  ChangeMito();
}


function ChangeMito(){
  mitoImg = mitoImages[imgNumber % 5];
  imgNumber += 1;
}
let url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NDX&interval=1min&apikey=CBWCNIM5UZXM6GDB&datatype=csv";
let tableNdx;
let ndxNew;
let time;

function preload() {
  tableNdx = loadTable(url, "csv", "header");
}

function setup() {

  createCanvas(400, 400);
}

function draw() {
  background(220);
  showData();
}

function showData() {
  if (frameCount % 1800 == 0) {
    tableNdx = loadTable(url, "csv", "header");
  }
  if (tableNdx != undefined) {
    ndxNew = Number(tableNdx.getString(0, 'close'));
    time = tableNdx.getString(0, 'timestamp');
  }
  fill(0);
  text(time + '----' + ndxNew, 100, 100);
}// Create a variable to hold our map
var myMap;
// Create a variable to hold our canvas
var canvas;
// Create a new Mappa instance using Leaflet.
var mappa = new Mappa('Leaflet');

var ellipses = [];

var meteorites;

var options = {
  lat: 40.729442,
  lng: -73.994904,
  zoom: 1,
  style: 'https://api.mapbox.com/styles/v1/eonyang/cj973fxh6082k2rmpmpcjwoks/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW9ueWFuZyIsImEiOiJjajh6YW9oeGQyaHZmMnptcjdmZzhvdzVpIn0.8IjtPLSSecB19lPBezfF0g'
};

function preload() {
  meteorites = loadTable("data/Meteorite_Landings.csv", "csv", "header");
}

function setup() {
  canvas = createCanvas(800, 600);
  myMap = mappa.tileMap(options); //x,y,zoom level
  myMap.overlay(canvas);
  myMap.onChange(drawMeteos);
  // console.log(meteorites);
}

// p5.js draw
function draw() {
  // clear();
  // drawMeteos();
}

// function drawDots() {
//   clear();
//   var itp = myMap.latLngToPixel(40.729442, -73.994904);
//   ellipse(itp.x, itp.y, 20, 20);
// }


function drawMeteos() {
  clear();
  for (var i = 0; i < 200; i++) {
    var lat = Number(meteorites.getString(i, 'reclat'));
    var lng = Number(meteorites.getString(i, 'reclong'));
    var pos = myMap.latLngToPixel(lat, lng);
    ellipse(pos.x, pos.y, 10, 10);

  }

}
var radio;

function setup() {
  radio = createRadio();
  radio.option("black");
  radio.option("white");
  radio.option("gray");
  radio.style('width', '120px');
  textAlign(CENTER);
  fill(255, 0, 0);
}

function draw() {
  var val = radio.value();
  background(val);
  text(val, width/2, height/2);
}// get paramters

var ndx;
var table
var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NDX&interval=1min&apikey=CBWCNIM5UZXM6GDB&datatype=csv";
var url1 ="https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=99cfea65a5bb30650b3d31eb1713233e:15:73386102&q=rainbow";
function preload(){
  table = loadTable(url, "csv", "header");
}

function setup(){
  // ndx = table.Time Series (1min);
  ndx = Number(table.getString(1, 'open'))
  print(ndx);
}
// Pre-defined HTML Elements
// Pre-defined CSS Styles
// HTML Elements generated by your p5 sketch
// Some kind of mouse interaction with an HTML Element using a callback function you write.	
// If you are feeling ambitious, try replacing a DOM element with a "physical sensor!"

var buttonPos = 1;
var button;
let pos1;
let pos2;
let btnSize;
var can;

function setup() {
  noCanvas();
  // createCanvas(400, 400);
  // can = document.getElementById('defaultCanvas0')
  // can.hide();

  pos1 = createVector(10, 200);
  pos2 = createVector(300, 200);
  btnSize = createVector(180, 48);

  button = createButton("click me")
  button.style("background-color", "#999999");
  button.style("font-size", "24px");
  button.size(btnSize.x, btnSize.y);
  button.position(pos1.x, pos1.y);
  button.mouseOver(buttonRun);
  
}

function draw() {
  background(220);

}

function buttonRun() {
  if (buttonPos == 1) {
    button.position(pos2.x, pos2.y);
    buttonPos = 2;
    button.html("┏(｀ー´)┛");
  } else if (buttonPos == 2) {
    button.position(pos1.x, pos1.y);
    buttonPos = 1;
    button.html("└｜゜ε゜｜┐");
  }



}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.SLAB_USBtoUART'; // fill in your serial port name here
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
  // black background, white text:
  background(0);
  fill(255);
  // display the incoming serial data as a string:
  text("incoming value: " + inData, 30, 30);
}

function serialEvent() {
  // read a byte from the serial port:
  var inByte = serial.read();
  // store it in a global variable:
  inData = inByte;
}

function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}




function mouseDragged() {
  // map the mouseY to a range from 0 to 255:
  outByte = int(map(mouseY, 0, height, 0, 255));
  // send it out the serial port:
  serial.write(outByte);
}

function keyPressed() {
 if (key ==='H' || key ==='L') { // if the user presses H or L

 serial.write(key);              // send it out the serial port
 }
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
}let bubbles = [];

function setup() {
  createCanvas(400, 400);
  ellipseMode(CENTER);
  for (let i = 0; i < 20; i++) {
    bubbles.push(new Bubble(random(width), random(height)));
  }

  for (let a = 0; a < bubbles.length; a++) {
    if (bubbles[a].x <= bubbles[a].dia
        || bubbles[a].x >= (width  - bubbles[a].dia)
        || bubbles[a].y <= bubbles[a].dia
        || bubbles[a].y >= (height - bubbles[a].dia)) {
      bubbles.splice(a);
    }
  }

  for (let i = 0; i < bubbles.length; i++) {
    for (let a = 0; a < bubbles.length; a++) {
      if (i != a && collideCircleCircle(bubbles[a].x, bubbles[a].y, bubbles[a].dia, bubbles[i].x, bubbles[i].y, bubbles[i].dia)) {
        bubbles.splice(i);
      }
    }
  }
  print(bubbles.length);
}

function draw() {
  background(220);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
    bubbles[i].checkboundaries();
    for (let j = 0; j < bubbles.length; j++) {
      if (j != i) {
        bubbles[i].collide(bubbles[j]);
        bubbles[i].collided(bubbles[j]);
      }
    }
  }
}


class Bubble {
  constructor(x, y) {

    this.dia = 20;
    this.x = x;
    this.y = y;
    this.color = 255;
    this.yspeed = random(-5, 5);;
    this.xspeed = random(-5, 5);
    this.hitted = true;
    this.bounced = true;
  }
  display() {
    noStroke();
    fill(random(255), 0, 0, 20);
    ellipse(this.x, this.y, this.dia, this.dia);

  }
  move() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
  checkboundaries() {
    if (this.x > width - this.dia || this.x < this.dia) {
      this.xspeed *= -1;
    }
    if (this.y > height - this.dia || this.y < this.dia) {
      this.yspeed *= -1;
    }
  }

  collide(otherBubble) {
    if (collideCircleCircle(this.x, this.y, this.dia, otherBubble.x, otherBubble.y, otherBubble.dia) == true && this.hitted == false && otherBubble.hitted == false) {
      this.xspeed *= -1;
      this.yspeed *= -1;
      otherBubble.xspeed *= -1;
      otherBubble.yspeed *= -1;
      this.hitted = true;
      otherBubble.hitted = true;
    }
  }

  collided(otherBubble) {
    if (collideCircleCircle(this.x, this.y, this.dia, otherBubble.x, otherBubble.y, otherBubble.dia) == false && this.hitted == true && otherBubble.hitted == true) {
      this.hitted = false;
      otherBubble.hitted = false;
    }
  }

}

function mousePressed() {
  for (let i = 0; i < 5; i++) {
    bubbles.push(new Bubble(mouseX, mouseY));
  }
}// var serial; // variable to hold an instance of the serialport library
 
// function setup() {
//  serial = new p5.SerialPort(); // make a new instance of the serialport library
//  serial.on('list', printList); // set a callback function for the serialport list event
 
//  serial.list(); // list the serial ports
// }
 
// // get the list of ports:
// function printList(portList) {
//  // portList is an array of serial port names
//  for (var i = 0; i < portList.length; i++) {
//  // Display the list the console:
//  print(i + " " + portList[i]);
//  }
// }

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var inData;

let speed = 3;
let rectDia = 50;
let rotateIncre = 5;

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
  
  rectMode(CENTER);
}

function draw() {
  let dataInstance = inData;
  background(0);
  fill(255);
  text("sensor value: " + inData, 30, 30);
  // // if (rectDia != inData){
  //   rectDia += (inData - rectDia)*speed/100;
  // // }
  rotateIncre -= 1;
  if (dataInstance<30){
    rotateIncre += 10;
  }
  fill(255);
  push()
  translate(200,150);
  rotate(millis()/1000+rotateIncre/100);
  fill(255);
  rect(0,0, 100 ,100);
  pop();

}

function serverConnected() {
  print('connected to server.');
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

// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

// class mill() {
//   constructor (x,y){
//     push();
//     translate(x,y);
//     fill()
//     triangle();
  
//   }
// }function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}/*
 * @name Triangle Strip
 * @description Example by Ira Greenberg. Generate a closed ring using the 
 * vertex() function and beginShape(TRIANGLE_STRIP) mode. The outsideRadius 
 * and insideRadius variables control ring's radii respectively.
 */
var x;
var y;
var outsideRadius = 150;
var insideRadius = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  colorMode(RGB,255,255,255,1)
  x = width/2;
  y = height/2;
}

function draw() {
  background(0);
  
  var numPoints = int(map(mouseX, 0, width, 6, 60));
  var angle = 0;
  var angleStep = 180.0/numPoints;
    beginShape(TRIANGLE_STRIP); 

  for (var i = 0; i <= numPoints; i++) {
    fill(RandomColor());
    var px = x + cos(radians(angle)) * outsideRadius;
    var py = y + sin(radians(angle)) * outsideRadius;
    angle += angleStep;
    vertex(px, py);
    px = x + cos(radians(angle)) * insideRadius;
    py = y + sin(radians(angle)) * insideRadius;
    vertex(px, py); 
    angle += angleStep;
  }
  endShape();
  
  push();
  translate(-windowWidth/2, -windowHeight/2);
  scale(2);
  rotate(frameRate);
  
      beginShape(TRIANGLE_STRIP); 

  for (var i = 0; i <= numPoints; i++) {
    fill(RandomColor());
    var px = x + cos(radians(angle)) * outsideRadius;
    var py = y + sin(radians(angle)) * outsideRadius;
    angle += angleStep;
    vertex(px, py);
    px = x + cos(radians(angle)) * insideRadius;
    py = y + sin(radians(angle)) * insideRadius;
    vertex(px, py); 
    angle += angleStep;
  }
  endShape();
  pop();
  
    // noLoop();

}


function RandomColor() {
  let c1 = color(142,0,157,1);
  let c2 = color(255,197,168,1);
  let c3 = color(5,2,53,1);
  let c4 = color(1,0,39,1);
  let c5 = color(0,0,0,1);
  if (random(99) >= 80) {
    return c1;
  } else if (random(99) >= 60) {
    return c2;
  } else if (random(99) >= 40) {
    return c3;
  } else if (random(99) >= 20) {
    return c4;
  } else {
    return c5;
  }
}function setup() {
  createCanvas(640, 640);
  colorMode(RGB, 255,255,255,3);
    
  frameRate(12);
}
 
function draw() {    
  background(0);

  translate(width/2, height/2,);
  scale(1);

  rotate(radians(frameCount/60 * 0.1));
  // rotateX(radians(frameCount/60 * 10));
  // rotateY(radians(frameCount/60 * 30));
 
  // blendMode(BLEND);
    
  for (let i = 0; i < 1000; i++) {
    noStroke();
    fill(RandomColor());
    triangle(cos(frameCount)*10, 50,200, 200,0, 0);
    rotate(0.1);
  }
  
  rotate(radians(frameCount/60 * 0.1));
  // if (frameCount % 30 == 0) println(frameRate);
  // noLoop();
}  


function RandomColor() {
  let c1 = color(142,0,157,1);
  let c2 = color(255,197,168,1);
  let c3 = color(5,2,53,1);
  let c4 = color(1,0,39,1);
  let c5 = color(0,0,0,1);
  if (random(99) >= 90) {
    return c1;
  } else if (random(99) >= 80) {
    return c2;
  } else if (random(99) >= 70) {
    return c3;
  } else if (random(99) >= 60) {
    return c4;
  } else {
    return c5;
  }
}function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB,255,255,255,4);
}

function draw() {
  background(0);
  for (let i = 0; i < 2000; i++) {
    let x1 = 0;
    let y1 = random(windowHeight);
    let x2 = windowWidth;
    let y2 = random(windowHeight);
    stroke(RandomColor());
    line(x1, y1, x2, y2);
  }
  noLoop();
  
}

function RandomColor() {
  let c1 = color(142,0,157,1);
  let c2 = color(255,197,168,1);
  let c3 = color(5,2,53,1);
  let c4 = color(1,0,39,1);
  let c5 = color(0,0,0,1);
  if (random(99) >= 80) {
    return c1;
  } else if (random(99) >= 60) {
    return c2;
  } else if (random(99) >= 40) {
    return c3;
  } else if (random(99) >= 20) {
    return c4;
  } else {
    return c5;
  }
}function preload() {
  playerImg = loadImage("images/PineApple.png");
}

function setup() {
  normalSetup();
  gameSetup();
}

function draw() {
  runGame();
}let dots = [];
//q is the amount the dots.
let q = 200;
// d is the distance between the dots.
let d = 120;
// w is the width of the canvas
let w = 700;
// h is the height of the canvas
let h = 600;
// thick is the initial distance between two dots
let thick = 100;
// the distance the dots move in a frame.
let jitter = 10;

function setup() {
  createCanvas(w, h);
  frameRate(10);
  background(220, 0, 100);
  ellipseMode(CENTER);
  rectMode(CENTER);
  sliderJ = new slider(350, 500, 200, jitter, 1, 100);


  for (var i = 0; i < q; i++) {
    // draw the heart
    x = 50 * (2 * cos(i) - cos(2 * i)) + random(-thick, thick);
    y = 50 * (2 * sin(i) - sin(2 * i)) + random(-thick, thick);
    dot1 = new dot(x, y);
    dots.push(dot1);
  }

}

function draw() {
  // use mouse to control the lines.
  // d = mouseY/30;

  jitter = sliderJ.dragging();

  background(100, 0, 220, 50);
  translate(350, 250);
  rotate(-1.57);

  for (var i = 0; i < dots.length; i++) {
    dots[i].x += random(-jitter, jitter);
    dots[i].y += random(-jitter, jitter);
  }

  for (var a = 0; a < dots.length; a++) {
    dota = dots[a];
    for (var b = 0; b < dots.length; b++) {
      dotb = dots[b];
      if (dist(dota.x, dota.y, dotb.x, dotb.y) < d) {
        c = random(9160);
        stroke(22, 200, 120, 100);
        line(dota.x, dota.y, dotb.x, dotb.y);
      }
    }
  }

  // print(dots.length);
}

function dot(x, y) {

  this.x = x;
  this.y = y;

}

function slider(x, y, size, thing, valueFrom, valueTo) {
  dragging = false;
  currentValue = thing;
  // new instance of rail an button
  this.rail = new rail(x, y, size);
  this.sliderButton = new sliderButton(x - size / 2 + size * (currentValue / valueTo), y, size)
  //draw everything
  this.display = function() {
    this.rail.display();
    this.sliderButton.display();
  }
  //main function
  this.dragging = function() {
    this.display();
    if (mouseIsPressed) {
      dragging = true;
    } else {
      dragging = false;

      offset = 0;
    }

    if (dragging) {
      previousPosX = this.sliderButton.x;
      this.sliderButton.x = constrain(mouseX, x - size / 2, x + size / 2);
      offset = (this.sliderButton.x - previousPosX) / size * (valueTo - valueFrom);
      currentValue = currentValue + offset;
      print(offset);
    }
    return (currentValue);
  }
  //define rail
  function rail(x, y, size) {
    railLength = size;
    railHeight = 4;
    this.x = x;
    this.y = y;
    this.display = function() {
      fill(255);
      rect(this.x, this.y, railLength, railHeight);
    }
  }

  //define button
  function sliderButton(x, y, size) {
    this.x = x;
    this.y = y;

    this.display = function() {
      stroke(1);
      fill(100, 0, 100);
      ellipse(this.x, this.y, size / 10, size / 10);
    }
  }
}let x = 50;

function setup() {
  createCanvas(400, 400);
  ellipseMode(CENTER);
  rectMode(CENTER);
  noStroke();
  colorMode(HSB, 360, 100, 100, 100);
  slider1 = new slider(200, 200, 100, x, 0, 100);

}

function draw() {
  background(1);
  text(x, 100, 100);
  x = slider1.dragging();
}

function slider(x, y, size, thing, valueFrom, valueTo) {
  dragging = false;
  currentValue = thing;
  // new instance of rail an button
  this.rail = new rail(x, y, size);
  this.sliderButton = new sliderButton(x - size / 2 + size * (currentValue / valueTo), y, size)
  //draw everything
  this.display = function() {
    this.rail.display();
    this.sliderButton.display();
  }
  //main function
  this.dragging = function() {
    slider1.display();
    if (mouseIsPressed) {
      dragging = true;
    } else {
      dragging = false;
    }

    if (dragging) {
      previousPosX = this.sliderButton.x;
      this.sliderButton.x = constrain(mouseX, x - size / 2, x + size / 2);
      offset = this.sliderButton.x - previousPosX;
      currentValue = currentValue + offset;
      print(currentValue);
    }
    return (currentValue);
  }
  //define rail
  function rail(x, y, size) {
    railLength = size;
    railHeight = 4;
    this.x = x;
    this.y = y;
    this.display = function() {
      fill(255);
      rect(this.x, this.y, railLength, railHeight);
    }
  }

  //define button
  function sliderButton(x, y, size) {
    this.x = x;
    this.y = y;

    this.display = function() {
      stroke(1);
      fill(1, 0, 100);
      ellipse(this.x, this.y, size / 5, size / 5);
    }
  }
}let dots = [];
//q is the amount the dots.
let q = 100;
// d is the distance between the dots.
let distance = 10;
// w is the width of the canvas
let w = 400;
// h is the height of the canvas
let h = 400;
// thick is the initial distance between two dots
let thick = 0;
// the distance the dots move in a frame.
let jitter = 0.5;

function setup() {
  createCanvas(w, h);
  colorMode(HSB, 360, 100, 100, 100);
  // frameRate(30);
  background(0);
  ellipseMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER);
  sliderJ = new slider(150, 350, 80, jitter, 0.1, 2, "jitter");
  sliderD = new slider(250, 350, 80, distance, 5, 50, "dist");

  for (let i = 0; i < q; i++) {
    // draw the heart
    x = 50 * (2 * cos(i) - cos(2 * i)) + random(-thick, thick);
    y = 50 * (2 * sin(i) - sin(2 * i)) + random(-thick, thick);
    dot1 = new dot(x, y);
    dots.push(dot1);
  }

}

function draw() {
  // use mouse to control the lines.
  d = mouseY/30;
  jitter = sliderJ.dragging();
  distance = sliderD.dragging();
  background(0, 0, 0, 10);
  translate(200, 150);
  rotate(-1.57);


  for (let i = 0; i < dots.length; i++) {
    dots[i].x += random(-jitter, jitter);
    dots[i].y += random(-jitter, jitter);
  }

  for (let a = 0; a < dots.length; a++) {
    dota = dots[a];
    for (let b = 0; b < dots.length; b++) {
      dotb = dots[b];
      if (dist(dota.x, dota.y, dotb.x, dotb.y) < distance) {
        c = random(360);
        stroke(c, 50, 80, 100);
        line(dota.x, dota.y, dotb.x, dotb.y);
      }
    }
  }

  print(dots.length);
}

function dot(x, y) {
  this.x = x;
  this.y = y;
}

function slider(x, y, size, thing, valueFrom, valueTo, name) {
  let dragging = false;
  let currentValue = thing;
  // new instance of rail an button
  this.rail = new rail(x, y, size);
  this.sliderButton = new sliderButton(x - size / 2 + size * (currentValue / valueTo), y, size)
  //draw everything
  this.display = function() {
    this.rail.display();
    this.sliderButton.display();
  }
  //main function
  this.dragging = function() {
    this.display();
    if (mouseX >= this.sliderButton.x - size / 4 && mouseX <= this.sliderButton.x + size / 4 && mouseY >= this.sliderButton.y - size / 4 && mouseY <= this.sliderButton.y + size / 4) {
      if (mouseIsPressed) {
        dragging = true;
      } else if (mouseIsPressed != true) {
        dragging = false;
      }
    }

    if (dragging) {
      previousPosX = this.sliderButton.x;
      this.sliderButton.x = constrain(mouseX, x - size / 2, x + size / 2);
      offset = (this.sliderButton.x - previousPosX) / size * (valueTo - valueFrom);
      currentValue = currentValue + offset;
      print(offset);
    }
    return (currentValue);
  }
  //define rail
  function rail(x, y, size) {
    let railLength = size;
    let railHeight = 4;
    this.x = x;
    this.y = y;
    this.display = function() {
      push();
      noStroke();
      fill(255);
      rect(this.x, this.y, railLength, railHeight);
      text(name, x, y + 20);
      pop();

    }
  }

  //define button
  function sliderButton(x, y, size) {
    this.x = x;
    this.y = y;

    this.display = function() {
      stroke(1);
      fill(1, 0, 100);
      ellipse(this.x, this.y, size / 5, size / 5);
    }
  }
}let dots = [];
let quantom = 200l

function setup() {
  createCanvas(400, 400);
	colorMode(HSB, 360, 100, 100, 100);
  for (var i = 0; i < 100; i++) {
    dot1 = new dot();
    dots.push(dot1);
  }
  
    for (var a = 0; a < 100; a++) {
    dota = dots[a];
    for (var b = 0; b < 100; b++) {
      dotb = dots[b];
      if (dist(dota.x, dota.y, dotb.x, dotb.y) < 100) {
        c= random(360);
        stroke(c,50,80,100);
        line(dota.x, dota.y, dotb.x, dotb.y);
      }
    }
  }

}

function draw() {

}

function dot() {
  this.x = random(windowWidth);
  this.y = random(windowHeight);
  this.display = function() {
    point(this.x, this.y);
  }
}let dots = [];
let quantom = 200l

function setup() {
  createCanvas(400, 400);
	colorMode(HSB, 360, 100, 100, 100);
  for (var i = 0; i < 100; i++) {
    dot1 = new dot();
    dots.push(dot1);
  }
  
    for (var a = 0; a < 100; a++) {
    dota = dots[a];
    for (var b = 0; b < 100; b++) {
      dotb = dots[b];
      if (dist(dota.x, dota.y, dotb.x, dotb.y) < 100) {
        c= random(360);
        stroke(c,50,80,100);
        line(dota.x, dota.y, dotb.x, dotb.y);
      }
    }
  }

}

function draw() {

}

function dot() {
  this.x = random(windowWidth);
  this.y = random(windowHeight);
  this.display = function() {
    point(this.x, this.y);
  }
}let dots = [];

function setup() {
  createCanvas(400, 400);

  for (var i = 0; i < 100; i++) {
    dot1 = new dot();
    dots.push(dot1);
  }


}

function draw() {
  background(220);
  for (var i=0; i<100; i++){
    dots[i].display();
  }

  // background(220);
  for (var a = 0; a < 100; a++) {
    dota = dots[a];
    for (var b = 0; b < 100; b++) {
      dotb = dots[b];
      if (dist(dota.x, dota.y, dotb.x, dotb.y) < 100) {
        c= randon(360);\
      
        line(dota.x, dota.y, dotb.x, dotb.y);
      }
    }
  }

}

function dot() {
  this.x = random(windowWidth);
  this.y = random(windowHeight);
  this.display = function() {
    point(this.x, this.y);
  }
}let color1 = 0;
let color2 = 0;
let color3 = 0;
let color4 = 0;
let w = 400;
let h = 300;


function setup()
{
  createCanvas(w,h);
}

function draw()
{

  if (mouseX < w/2 && mouseY < h/2)
  {
    color1 = 255;
  }
  else if (mouseX > w/2 && mouseY < h/2)
  {
    color2 = 255;
  }
  else if (mouseX < w/2 && mouseY > h/2)
  {
    color3 = 255;
  }
  else if (mouseX > w/2 && mouseY > h/2)
  {
    color4 = 255;
  }
  
  fill(color1);
  rect(0,0, w/2, h/2);
  fill(color2);
  rect(w/2,0, w/2, h/2);
  fill(color3);
  rect(0,h/2, w/2, h/2);
  fill(color4);
  rect(w/2 , h/2, w/2, h/2);
  
  color1 -= 5;
  color2 -= 5;
  color3 -= 5;
  color4 -= 5;
  
}




// Rectangle starts at location x
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
  x = x + 5;
  constrain(x, , 100, );
  text(x, 20, 20);



}let g = 0.1;

function setup() {
  createCanvas(400, 400);
  ellipseMode(CENTER);
  ball = new ball(1);
}

function draw() {
  background(220);
  ball.display();
}

function mousePressed()'

function ball(speed) {
  this.x = 200;
  this.y = 100;
  this.bouncing = false;

  this.display = function() {

    ellipse(this.x, this.y, 40, 40, )
          
  }
            
            this.bounce = function ()
    {
      if (this.bouncing)
      {
            if (this.y > 380) {
      speed = - speed;
    } 
      speed = speed + g;

    this.y += speed;
      }
    }
}

let eyeColor;
let mellonColor;
let mellons = [];
// let bullets = [];
let mellonDelay = 0;
// let bulletDelay = 0;
let mellonCounter = 0;
let stars = [];
// let bulletsCounter = 0;


  function setup()
{
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100,100);
  noStroke();
  frameRate(30);
  background(0);
  eyeColor = color(random(360), 50, 80, 100);
  eye1 = new eye(eyeColor, 10);
  for (var i = 0; i < 200; i++) {
    star1 = new star();
    stars.push(star1);
  }
}

function draw()
{
  hint = 'Dodge the mellon meteors!';
  score = 'Persevered: ' + parseInt(millis()/1000) + ' s';
  background(0);
  textAlign(LEFT);
  textSize(24);
  fill(255);
  text(hint,24,32)
  textAlign(RIGHT);
  text(score ,windowWidth-24,32);

  for (var i = 0; i < 200; i++) {
    stars[i].display();
  }

  // if (millis() - bulletDelay > 300)
  // {
  //   bullet1 = new bullet(eye1.x, eye1.y);
  //   bullets.push(bullet1);
  //   bulletsCounter += 1;
  //   bulletDelay = millis();
  // }

  // for (var i = 0; i < bulletsCounter; i++) {
  //   bullets[i].display();
  // }
  //
  if (millis() - mellonDelay > windowWidth/4)
  {
    mellon1 = new mellon(random(10));
    mellons.push(mellon1);
    mellonCounter += 1;
    mellonDelay = millis();
  }

  for (var i = 0; i < mellonCounter; i++) {
    mellons[i].display();
    mellons[i].collide(eye1);
    // mellons[i].collide(bullet1);
  }

  eye1.display();

  // print(bulletsCounter + eye1.x + eye1.y);
}


function eye (eyeColor, speed)
{
  this.dia = 120;
  this.s = 100/speed;
  this.x= windowWidth / 2;
  this.y= windowHeight-100;

  this.display = function ()
  {
    if (this.x != mouseX) {
      this.x += (mouseX-this.x)/this.s;
    }
    if (this.y != mouseY) {
      this.y += (mouseY-this.y)/this.s;
    }

  fill(20, 2, 99);
  ellipse(this.x, this.y, 120, 120,);
  fill(eyeColor);
  ellipse(this.x, this.y-47, 48, 24,);
  fill(150, 50, 0);
  ellipse(this.x, this.y-45, 24, 12,);
  }


}

function mellon (speed)
{
  this.alpha = 100;
  this.color = color(random(360), 50, 80, this.alpha),
  this.dia = 64;
  this.x = random(windowWidth);
  this.y = -100;
  this.speed = speed;
  this.display = function ()
  {
    // fill(120,50,50,30);
    // ellipse(this.x, this.y, this.dia, this. dia);
    this.y += speed;
    beginShape();
    fill(0,0,100,this.alpha);
    vertex(this.x+50, this.y-30);
    bezierVertex(this.x+50, this.y+30, this.x-10, this.y+50, this.x-40, this.y+30);
    endShape();

    beginShape();
    fill(this.color);
    vertex(this.x+45, this.y-27);
    bezierVertex(this.x+44, this.y+24, this.x-12, this.y+40, this.x-38, this.y+27);
    endShape();

    fill(0,0,0,this.alpha);
    ellipse(this.x-12,this.y+22,2,4);
    ellipse(this.x+1,this.y+22,2,4);
    ellipse(this.x-5,this.y+14,2,4);
    ellipse(this.x+5,this.y+8,2,4);
    ellipse(this.x+10,this.y+16,2,4);
    ellipse(this.x+15,this.y+4,2,4);
    ellipse(this.x+25,this.y-3,2,4);
    ellipse(this.x+25,this.y+8,2,4);

  }

  this.hit = false;

  this.collide = function (obj)
  {
    this.hit = collideCircleCircle(this.x, this.y, this.dia, obj.x, obj.y, obj.dia)
    if ((this.hit) && (obj == eye1))
    {
      gameOver();
    }

    // else if ((this.hit) && (obj == bullet1))
    // {
    //       this.dia = 0;
    //       this.alpha = 0;
    // }

    // else if ((this.hit) && (obj == eye1))
    // {
    //   for (var i = 0; i < bullets.length; i++) {
    //     if (bullets[i] == obj) {
    //       this.dia = 0;
    //       this.alpha = 0;
    //     }
    //   }
    // }

  }
}

function star()
{
  this.offsite = random(1000);
  this.dia = random(0.1,3);
  this.dim = random(10,70);
  this.x = random(windowWidth);
  this.y = random(windowHeight);
  this.display = function ()
  {
    fill(0,0,100,this.dim * sin(millis()/1000+this.offsite));
    ellipse(this.x, this.y, this.dia, this.dia);
  }
}

function gameOver()
{
  fill(0,80,100,100);
  textAlign(CENTER);
  textSize(64);
  text("YOU SUCK!", windowWidth/2, windowHeight/2);
  textSize(32);
  text('Your score: ' + parseInt(millis()/1000) + 's, refresh to retry', windowWidth/2, windowHeight/2+100);
  noLoop();
}
//
// function bullet(posX, posY)
// {
//   this.x = posX;
//   this.y = posY-20;
//   this.dia = 10;
//   this.display = function ()
//   {
//     this.y -= 15;
//     fill(255);
//     rect(this.x,this.y,6,20,3);
//   }
// }
let eyeColor;

  function setup()
{
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100,100);
  noStroke();
  background(0);
  eyeColor = color(random(360), 50, 80, 100);
}

function draw()
{
  background(0);

  eye1 = new eye(mouseX, mouseY, eyeColor);
}


function eye (posX, posY, eyeColor)
{

  this.x = posX;
  this.y = posY;
  this.color = color

  fill(20, 2, 99);
  ellipse(posX, posY, 120, 120,);
  fill(eyeColor);
  ellipse(posX, posY-47, 48, 24,);
  fill(150, 50, 0);
  ellipse(posX, posY-44, 24, 12,);
  }
          
          

let eyeColor;
let mellonColor;
let mellons = [];
let timer;

  function setup()
{
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100,100);
  noStroke();
  frameRate(30);
  background(0);
  eyeColor = color(random(360), 50, 80, 100);
  eye1 = new eye(eyeColor);
  generateMellons();
}

function draw()
{
  background(0);
  eye1.display();
  for (var i = 0; i < 50; i++) {
    mellons[i].display();
  }
}


function eye (eyeColor)
{

  this.x= windowWidth / 2;
  this.y= windowHeight-100;
  // this.color = eyeColor;
  this.display = function ()
  {
    // this.x = mouseX;
    // this.y = mouseY;
    if (this.x != mouseX) {
      this.x += (mouseX-this.x)/15;
    }
    if (this.y != mouseY) {
      this.y += (mouseY-this.y)/15;
    }

  fill(20, 2, 99);
  ellipse(this.x, this.y, 120, 120,);
  fill(eyeColor);
  ellipse(this.x, this.y-47, 48, 24,);
  fill(150, 50, 0);
  ellipse(this.x, this.y-45, 24, 12,);
  }
}

function mellon (mellonColor, speed)
{

  this.x = random(windowWidth);
  this.y = 100;
  this.speed = speed;
  this.display = function ()
  {
    this.y += speed;
    beginShape();
    fill(255);
    vertex(this.x+50, this.y-30);
    bezierVertex(this.x+50, this.y+30, this.x-10, this.y+50, this.x-40, this.y+30);
    endShape();

    beginShape();
    fill(mellonColor);
    vertex(this.x+45, this.y-27);
    bezierVertex(this.x+44, this.y+24, this.x-12, this.y+40, this.x-38, this.y+27);
    endShape();

    fill(0);
    ellipse(this.x-12,this.y+22,2,4);
    ellipse(this.x+1,this.y+22,2,4);
    ellipse(this.x-5,this.y+14,2,4);
    ellipse(this.x+5,this.y+8,2,4);
    ellipse(this.x+10,this.y+16,2,4);
    ellipse(this.x+15,this.y+4,2,4);
    ellipse(this.x+25,this.y-3,2,4);
    ellipse(this.x+25,this.y+8,2,4);

  }
}


function generateMellons()
{
  for (var i = 0; i < 200; i++)
  {
    mellon1 = new mellon(color(random(360), 50, 80, 100), random(3));
    mellons.push(mellon1);
    sleep(1000);
  }
}
