let populations
var items = []
var count = 0

let centerPoint = {
	x: 450,
	y: 450
}

let radius = 10.0

function preload() {
	populations = loadTable("nyc-data.csv", "csv", "header")
}

function setup() {
	createCanvas(900, 900)
	noFill()
	smooth(50)
	// background(0, 0 ,0)

	for (let i = 0; i < populations.getRowCount(); i++) {

		let obj = populations.getRow(i).obj

		let item = new CountryItem(obj.country, parseInt(obj.estimate), parseInt(obj.marginOfError))

		items.push(item)

		// graph 1
		
		// item.drawLine(i)

		// graph 2

		item.drawRectangle()
	}



}

function draw() {

	// graphy 3

	// background(255, 10)
	// if (frameCount % 60 == 0) {
	// 	items[count].drawWave()
	// 	count++
	// 	if (count == populations.getRowCount() - 1) {
	// 		count = 0
	// 	}
	// }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}/*
Mimi Yin NYU-ITP
Drawing 2D body.
*/

// Declare kinectron
var kinectron = null;
var mode = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.17.76.228");

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

  fill(255, 64);
  stroke(255);

  switch(mode) {
    case 0:
      // Draw  shape
      strokeWeight(2);
      beginShape();
        vertex(hipLeft.x, hipLeft.y);
        vertex(thumbRight.x, thumbRight.y);
        vertex(head.x, head.y);
        vertex(footRight.x, footRight.y);
        vertex(shoulderLeft.x, shoulderLeft.y);
        vertex(hipLeft.x, hipLeft.y);
      endShape(CLOSE);
      break;
    case 1:
      // Draw curved shape
      strokeWeight(2);
      beginShape();
        curveVertex(hipLeft.x, hipLeft.y);
        curveVertex(thumbRight.x, thumbRight.y);
        curveVertex(head.x, head.y);
        curveVertex(footRight.x, footRight.y);
        curveVertex(shoulderLeft.x, shoulderLeft.y);
      endShape(CLOSE);
      break;
    }

  textSize(18);
  stroke(255);
  fill(255);
  text("Press key to change modes.", 10, 20);
}

// Scale the data to fit the screen
// Move it to the center of the screen
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
}

function keyPressed(){
  mode++;
  mode%=2;
}



/*
Mimi Yin NYU-ITP
Drawing skeleton joints and bones.
 */

// Declare kinectron
var kinectron = null;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.17.76.228");

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
}let canvas;
let myMap;

var key = 'AIzaSyBHiExLDyBVehYKMJOSw2PdtDmDf2h-HFY';
const style = [{
    "elementType": "geometry",
    "stylers": [{
      "color": "#1c2541"
    }]
  },
  {
    "elementType": "labels",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#8ec3b9"
    }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#1a3646"
    }]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [{
      "color": "#4b6878"
    }]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#64779e"
    }]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [{
      "color": "#4b6878"
    }]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [{
      "color": "#334e87"
    }]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
      "color": "#283d6a"
    }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#6f9ba5"
    }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#1d2c4d"
    }]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#539aab"
      },
      {
        "lightness": -50
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#3c7680"
    }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{
      "color": "#304a7d"
    }]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#98a5be"
    }]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#1d2c4d"
    }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
        "color": "#3d8180"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#255763"
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#b0d5ce"
    }]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#023e58"
    }]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#98a5be"
    }]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#1d2c4d"
    }]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#3a506b"
      },
      {
        "weight": 0.5
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
      "color": "#0b132b"
    }]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#4e6d70"
    }]
  }
]

const options = {
  lat: 40.7128,
  lng: 74.0060,
  zoom: 3,
  styles: style
};
const mappa = new Mappa('Google', key);

// let meteorites;

function setup() {
  // put setup code here

  canvas = createCanvas(800, 800);

  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  fill(0);
  noStroke();
}

function draw() {
  // put drawing code here
}
/*
Mimi Yin NYU-ITP
Same as kinect_skeleton_draw_lines but supports multiple bodies.
Drawing lines with the selected joint in 4 modes.
Use LEFT/RIGHT arrow keys to change selected joint.
Use UP/DOWN arrow keys to change mode.
Press ENTER to erase.
*/

// Declare kinectron
let kinectron = null;
// Keep track of selected joint
let j;
// Which drawing mode
let mode;
// Store current and previous positions of selected joint for all bodies
let bodies = {};

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.17.45.85");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  // Initialize values
  mode = 0;

  // Start drawing with left hand
  j = kinectron.HANDLEFT;

  // Draw white background
  background(0);
}

function draw() {}

function bodyTracked(body) {
  // Get id of body
  let id = body.trackingId;

  // Get the left hand joint
  let joint = body.joints[j];

  // Create a record for the body if body is new
  if(!(id in bodies)) {
    bodies[id] = {};
  }

  // Calculate its x,y,z coordinates
  bodies[id].pos = scaleJoint(joint);
  drawJoint(joint);

  // If there is a previous position
  if (bodies[id].ppos) {

    let px = bodies[id].ppos.x;
    let py = bodies[id].ppos.y;
    let pz = bodies[id].ppos.z;
    let x = bodies[id].ppos.x;
    let y = bodies[id].ppos.y;
    let z = bodies[id].ppos.z;

    // Calculate speed of joint
    let speed = dist(px, py, pz, x,y,z);
    let sw = 1;

    // 3 ways to set strokeweight according to speed.
    switch (mode) {
      case 1:
        sw = speed / 10;
        break;
      case 2:
        sw = 100 / speed;
        break;
      case 3:
        sw = map(speed, 0, 100, 10, 0);
        break;
    }

    // Draw the line
    stroke(0);
    strokeWeight(sw);
    line(px, py, x, y);
  }

  // Store current location for next frame
  body.ppos = body.pos;
}

// Draw each joint
function drawJoint(joint) {
  let pos = scaleJoint(joint);
  noStroke();
  fill(255);
  ellipse(pos.x, pos.y, 10, 10);
}

function keyPressed() {
  // Use RIGHT/LEFT arrow keys to change selected joint
  // ENTER to erase
  switch (keyCode) {
    case UP_ARROW:
      mode++;
      mode %= 4;
      break;
    case LEFT_ARROW:
      j--;
    case RIGHT_ARROW:
      j++;
      break;
    case ENTER:
      background(255);
      break;
  }

  // There are only 25 joints
  j = constrain(j, 0, 24);
}

// Scale the joint position data to fit the screen
// 1. Move it to the center of the screen
// 2. Flip the y-value upside down
// 3. Return it as an object literal
function scaleJoint(joint) {
  return {
    x: (joint.cameraX * width / 2) + width / 2,
    y: (-joint.cameraY * width / 2) + height / 2,
    z: joint.cameraZ * 100
  }
}/*
Mimi Yin NYU-ITP
Affect noisy pathways with the selected joint.
Use LEFT/RIGHT arrow keys to change selected joint.
Use UP/DOWN arrow keys to change mode.
Press ENTER to erase.
*/

// Declare kinectron
let kinectron = null;
// Keep track of selected joint
let j;
// Which drawing mode
let mode;
// Store current and previous positions of selected joint
let pos, ppos;

// Store x,y coordinates of current location
let x, y;
// Store x,y coordinates of previous location
let px, py;
// Store current xspeed and yspeed
let xspeed, yspeed;
// Current position in noise graph
let t;
// How quickly we skip along noise graph
let tspeed;

// Range of random, relative range of vertical random
let range, yscl;
// How much to shift right/left, up/down
let xshift, yshift;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.17.45.85");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  // Initialize values
  mode = 0;

  // Start drawing with left hand
  j = kinectron.HANDLEFT;

  // Draw white background
  background(255);

  // Initialize noisy pathway variables
  x = width / 2;
  y = height / 2;
  px = x;
  py = y;
  xspeed = 0;
  yspeed = 0;
  t = 0;
  tspeed = 0.01;

  range = 4;
  yscl = 1;
  xshift = .5;
  yshift = .5;
}

function draw() {
  background(0, 5);

  // Move forward along noise graph
  t += tspeed;

  xspeed = (noise(t) - xshift) * range; //shift median to right/left
  yspeed = (noise(t + 100) - yshift) * range * yscl //shift median to up/down


  // Move
  x += xspeed;
  y += yspeed;

  // Draw a line from the previous loc to this loc
  // stroke(255);
  // strokeWeight(3);
  // line(px, py, x, y);

  // Remember current location for next frame
  px = x;
  py = y;

  // Wrap around screen
  if (x < 0 || x > width || y < 0 || y > height) {
    if (x < 0) x = width;
    else if (x > width) x = 0;
    if (y < 0) y = height;
    else if (y > height) y = 0;

    // Don't draw line when wrapping around
    px = x;
    py = y;
  }
  
  // drawJoint(j);
}

function bodyTracked(body) {
  // Get the left hand joint
  let joint = body.joints[j];
  
  drawJoint(joint);

  // Calculate its x,y,z coordinates
  pos = scaleJoint(joint);

  // If there is a previous position
  // Calculate range (speed) of noisy pathway
  // Based on speed of selected joint
  if (ppos) {
    // The faster the motion, the faster the noisy pathway
    range = dist(ppos.x, ppos.y, ppos.z, pos.x, pos.y, pos.z);
    // The faster the motion, the less random the pathway
    tspeed = 10/range;

    // Inverse of the above
    // The faster the motion, the slower the noisy pathway
    //range = 100/dist(ppos.x, ppos.y, ppos.z, pos.x, pos.y, pos.z);
    // The slower the motion the more random the pathway
    //tspeed = range/10;
  }

  // Store current location for next frame
  ppos = pos;
}

// Draw each joint
function drawJoint(joint) {
  let pos = scaleJoint(joint);
  noStroke();
  fill(255);
  ellipse(pos.x, pos.y, 10, 10);
}

function keyPressed() {
  // Use RIGHT/LEFT arrow keys to change selected joint
  // ENTER to erase
  switch (keyCode) {
    case UP_ARROW:
      mode++;
      mode %= 4;
      break;
    case LEFT_ARROW:
      j--;
    case RIGHT_ARROW:
      j++;
      break;
    case ENTER:
      background(255);
      break;
  }

  // There are only 25 joints
  j = constrain(j, 0, 24);
}

// Scale the joint position data to fit the screen
// 1. Move it to the center of the screen
// 2. Flip the y-value upside down
// 3. Return it as an object literal
function scaleJoint(joint) {
  return {
    x: (joint.cameraX * width / 2) + width / 2,
    y: (-joint.cameraY * width / 2) + height / 2,
    z: joint.cameraZ * 100
  }
}/*
Mimi Yin NYU-ITP
Drawing lines with the selected joint in 4 modes.
Use LEFT/RIGHT arrow keys to change selected joint.
Use UP/DOWN arrow keys to change mode.
Press ENTER to erase.
*/

// Declare kinectron
let kinectron = null;
// Keep track of selected joint
let j;
// Which drawing mode
let mode;
// Store current and previous positions of selected joint
let pos, ppos;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.17.45.85");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  // Initialize values
  mode = 0;

  // Start drawing with left hand
  j = kinectron.HANDLEFT;

  // Draw white background
  background(255);
}

function draw() {}

function bodyTracked(body) {
  // Get the left hand joint
  let joint = body.joints[j];

  // Calculate its x,y,z coordinates
  pos = scaleJoint(joint);

  // If there is a previous position
  if (ppos) {
    let speed = dist(ppos.x, ppos.y, ppos.z, pos.x, pos.y, pos.z);
    let sw = 1;

    // 3 ways to set strokeweight according to speed.
    switch (mode) {
      case 1:
        sw = speed / 10;
        break;
      case 2:
        sw = 100 / speed;
        break;
      case 3:
        sw = map(speed, 0, 100, 10, 0);
        break;
    }

    // Draw the line
    stroke(0);
    strokeWeight(sw);
    line(ppos.x, ppos.y, pos.x, pos.y);
  }

  // Store current location for next frame
  ppos = pos;
}

// Draw each joint
function drawJoint(joint) {
  let pos = scaleJoint(joint);
  noStroke();
  fill(255);
  ellipse(pos.x, pos.y, 10, 10);
}

function keyPressed() {
  // Use RIGHT/LEFT arrow keys to change selected joint
  // ENTER to erase
  switch (keyCode) {
    case UP_ARROW:
      mode++;
      mode %= 4;
      break;
    case LEFT_ARROW:
      j--;
    case RIGHT_ARROW:
      j++;
      break;
    case ENTER:
      background(255);
      break;
  }

  // There are only 25 joints
  j = constrain(j, 0, 24);
}

// Scale the joint position data to fit the screen
// 1. Move it to the center of the screen
// 2. Flip the y-value upside down
// 3. Return it as an object literal
function scaleJoint(joint) {
  return {
    x: (joint.cameraX * width / 2) + width / 2,
    y: (-joint.cameraY * width / 2) + height / 2,
    z: joint.cameraZ * 100
  }
}var count = 0;
var col = 255;
var radius = 0;
var rotation = 0;

let clicked = false;

var pg;

// let x, y;
// let px, py;

// Angle
let a;
// Angle speed: How quickly we're circling
let aspeed;

// How quickly we're circling vertically versus horizontally
let yfreq;

// Size of circle (radius)
let range;

// Verticality of circle
let yscl;

// Center of circle
let centerX, centerY;

// Store current x,y coordinates
let x, y;
// Store previous x,y coordinates
let px, py;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  // strokeCap(ROUND);
  strokeWeight(2);
  // frameRate(6);

  x = 100;
  y = 100;
  px = x;
  py = y;

  angle = 0;
  aspeed = 0.01;
  yfreq = 1;

  range = width / 4;
  yscl = 1;

  centerX = 100;
  centerY = 100;
  
	pg = createGraphics(1200, 1200);
	pg.pixelDensity(1);
}

function draw() {

  // Draw a line from the previous loc to this loc  

  //   if (clicked) {

  //   x += random(-50, 50);
  //   y += random(-50, 50);
    // image(pg, 150, 75);

  //   if (frameCount % 10 == 0) {
  //   rotate(rotation);
  //   // push();
  //   translate(width / 2 + 100, 0);
  //   stroke(col, col / 10, 180);
  //   var lengthX = randomGaussian() * 250;
  //   var centerDistance = randomGaussian() * 1;
  //   line(centerDistance, count, lengthX, count);
  //   // pop();
  //   count++;
  //   col -= 1;
  //   rotation += PI / 900.0;
  //   // console.log(col);
  // }
  
  // pgbackground(0,5);
  
  if(clicked) {
  
  if (frameCount % 2 == 0) {

  push();

  angle += aspeed;

  //Move
  x = cos(angle) * range + centerX;
  y = sin(angle * yfreq) * range * yscl + centerY;

  x = cos(sin(angle) * angle) * range * sin(angle) + centerX;
  y = sin(cos(angle) * angle * yfreq) * range * yscl * cos(angle) + centerY;

  stroke(255);
  strokeWeight(2);
  line(px, py, x, y);

  // if (x > width)
  //   x = width - (x - width);
  // if (y > height)
  //   y = height - (y - height);
  // if (x < 0)
  //   x = -x;
  // if (y < 0)
  //   y = -y;

  // Remember current location as previous position
  // for the next frame of animation
  px = x;
  py = y;
  pop();
  // image(pg, 150, 75);
  // }
  }
  }
  if (frameCount % 10 == 0) {
    rotate(rotation);
    push();
    translate(width / 2 + 100, 0);
    stroke(col, col / 10, 180);
    var lengthX = randomGaussian() * 250;
    var centerDistance = randomGaussian() * 1;
    line(centerDistance, count, lengthX, count);
    pop();
    count++;
    col -= 1;
    rotation += PI / 900.0;
    // console.log(col);
  }

}

function mousePressed() {
  if (clicked)
    clicked = false;
  else
    clicked = true;
}// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

var particles = [];

var vehicles = [];
var points = [];
var img;


function preload() {
  img = loadImage("heart-3.png");
}


function setup() {
  createCanvas(600, 400);
  background(30, 40, 50);
  
  
  for(i = 0; i<1000; i++){
  particles.push(new Particle(0, 0));
  }

  img.loadPixels();
  for (var x = 0; x < img.width; x+=10) {
    for (var y = 0; y < img.height; y+=10) {
      var index = x + y * img.width;
      var c = img.pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        points.push(createVector(x, y));
      }
    }
  }


  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);

  }
}

function draw() {
  background(51);
  clear();
  blendMode(ADD);
  fill(0);
  rect(0, 0, windowWidth, windowHeight);
 
  for(i = 0; i < particles.length;i++){
    particles[i].update();
    particles[i].display();
  }

  
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show(particles[i].display); 
    
  }
  }



var particles = [];

var vehicles = [];
var points = [];
var img;
var beat = false;


function preload() {
  img = loadImage("heart-3.png");
}


function setup() {
  createCanvas(600, 400);
  background(30, 40, 50);


  for (i = 0; i < 1000; i++) {
    particles.push(new Particle(0, 0));
  }

  img.loadPixels();
  for (var x = 0; x < img.width; x += 10) {
    for (var y = 0; y < img.height; y += 10) {
      var index = x + y * img.width;
      var c = img.pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        points.push(createVector(x, y));
      }
    }
  }


  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
  if (frameCount % 60 == 1) {
    beat = true;
  } else {
    beat = false;
  }
  background(51);
  clear();
  blendMode(ADD);
  fill(0);
  rect(0, 0, windowWidth, windowHeight);

  for (i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }

  setTimeout(function() {
    for (var i = 0; i < vehicles.length; i++) {
      var v = vehicles[i];
      v.behaviors();
    }
  }, 9000);


  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    // v.behaviors();
    v.update();
    v.show(particles[i].display);

  }
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Separation
// Via Reynolds: http://www.red3d.com/cwr/steer/

// A list of vehicles
var vehicles = [];

var slider1;
var slider2;
var slider3;

function setup() {
  var text = createP("Drag the mouse to generate new vehicles.");
  text.position(10,400);

  createCanvas(640,360);
  // We are now making random vehicles and storing them in an array
  for (var i = 0; i < 20; i++) {
    vehicles.push(new Vehicle(random(width),random(height)));
  }

  slider1 = createSlider(0,8,4);
  slider2 = createSlider(0,8,4);
  slider3 = createSlider(10,160,24);

}

function draw() {
  background(51);

  
  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].applyBehaviors(vehicles);
    vehicles[i].update();
    vehicles[i].borders();
    vehicles[i].display(); 
  }

}


function mouseDragged() {
  //vehicles.push(new Vehicle(mouseX,mouseY));
}

function Vehicle(x, y) {
  // All the usual stuff
  this.position = createVector(x, y);
  this.r = 12;
  this.maxspeed = 3;    // Maximum speed
  this.maxforce = 0.2;  // Maximum steering force
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0);

  this.applyBehaviors = function(vehicles) {

     var separateForce = this.separate(vehicles);
     var seekForce = this.seek(createVector(mouseX,mouseY));

     separateForce.mult(slider1.value());
     seekForce.mult(slider2.value());

     this.applyForce(separateForce);
     this.applyForce(seekForce);
  };

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  };

  // Separation
  // Method checks for nearby vehicles and steers away
  this.separate = function(vehicles) {
    var desiredseparation = slider3.value();
    var sum = createVector();
    var count = 0;
    // For every boid in the system, check if it's too close
    for (var i = 0; i < vehicles.length; i++) {
      var d = p5.Vector.dist(this.position, vehicles[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        var diff = p5.Vector.sub(this.position, vehicles[i].position);
        diff.normalize();
        diff.div(d);        // Weight by distance
        sum.add(diff);
        count++;            // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      sum.div(count);
      // Our desired vector is the average scaled to maximum speed
      sum.normalize();
      sum.mult(this.maxspeed);
      // Implement Reynolds: Steering = Desired - Velocity
      sum.sub(this.velocity);
      sum.limit(this.maxforce);
    }
    return sum;
  };

      // A method that calculates a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
  this.seek = function(target) {
    var desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired,this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    return steer;
  };

  // Method to update location
  this.update = function() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  };

  this.display = function() {
    fill(127);
    stroke(200);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    ellipse(0, 0, this.r, this.r);
    pop();
  };

  // Wraparound
  this.borders = function() {
    if (this.position.x < -this.r) this.position.x =  width+this.r;
    if (this.position.y < -this.r) this.position.y = height+this.r;
    if (this.position.x >  width+this.r) this.position.x = -this.r;
    if (this.position.y > height+this.r) this.position.y = -this.r;
  };
}
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Seeking "vehicle" follows the mouse position

// Implements Craig Reynold's autonomous steering behaviors
// One vehicle "seeks"
// See: http://www.red3d.com/cwr/

var v;

function setup() {
  createCanvas(640,360);
  v = new Vehicle(width/2, height/2);
}

function draw() {
  background(51);

  var mouse = createVector(mouseX, mouseY);

  // Draw an ellipse at the mouse position
  fill(127);
  stroke(200);
  strokeWeight(2);
  ellipse(mouse.x, mouse.y, 48, 48);

  // Call the appropriate steering behaviors for our agents
  v.seek(mouse);
  v.update();
  v.display();

}var pathPoints = []

function setup() {
  createCanvas(500, 500); 
  background(0);
} 

function draw() {
  //create the path
  pathPoints = circlePoints();
  
  for(var j=0;j<6;j++){
	pathPoints = complexifyPath(pathPoints);
  }

  //draw the path
  stroke(255,15);
  for(var i=0;i<pathPoints.length -1;i++){
    var v1 = pathPoints[i];
    var v2 = pathPoints[i+1];
    line(v1.x,v1.y,v2.x,v2.y);
  }
}

function complexifyPath(pathPoints){
  //create a new path array from the old one by adding new points inbetween the old points
  var newPath = [];
  
  for(var i=0;i<pathPoints.length -1;i++){
    var v1 = pathPoints[i];
    var v2 = pathPoints[i+1];
    var midPoint = p5.Vector.add(v1, v2).mult(0.5);
    var distance =  v1.dist(v2);
    
    //the new point is halfway between the old points, with some gaussian variation
    var standardDeviation = 0.125*distance;
    var v = createVector(randomGaussian(midPoint.x,standardDeviation),randomGaussian(midPoint.y,standardDeviation))
   	append(newPath,v1);
    append(newPath,v);
  }
  
  //don't forget the last point!
  append(newPath,pathPoints[pathPoints.length-1]);
  return newPath;  
}

function circlePoints() {
  //two points somewhere on a circle
  var r = width/2.1;
  //var theta1 = random(TWO_PI);
  var theta1 = randomGaussian(0,PI/4);
  var theta2 = theta1 + randomGaussian(0,PI/3);
  var v1 = createVector(width/2 + r*cos(theta1),width/2 + r*sin(theta1));
  var v2 = createVector(width/2 + r*cos(theta2),width/2 + r*sin(theta2));
  
  return [v1,v2];
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}var filter, filterFreq, filterRes;

var birdSound, waterSound, treeSound;

function preload() {
  soundFormats('mp3');
  //waterSound = loadSound("/sound/water.mp3");

  //load sound file
  waterSound = loadSound("/sound/water.mp3");
  birdSound = loadSound("/sound/bird.mp3");
  treeSound = loadSound("/sound/tree.mp3");
}

//kinect
var kinectron = null;

//water
var incr1 = 0;
var incr2 = 0;
var incr3 = 0;
var h = 0;
var a = 0;

var pg;

var t = 0;

var wavingTree = false;

var myTree;
var startPoint;
var direction;
var count;

var mapX, mapY, mapZ;

//force for water
var acc, waterPos, waterV;
var tempAcc;

//varibles for the birds
var flock;

var separationWeight = 1.5;
var cohesionWeight = 1.0;
var alignmentWeight = 1.0;
var maxSpeed = 3.0;
var maxForce = 0.05;

var yrotate1 = 0;
var yrotate2 = 0;
var change = 0.05;

//birds number
var birdNum = 400;
var birdIsScared = false;
var wavingCount;

var tempAccX = 0;

//starting point for the birds
var startX;
var startY;

var handRO = false;

//starsystem
var starsystem;

var address = {
  host: '192.168.1.2',
  port: 9001,
  path: '/'
};

function setup() {

  kinectron = new Kinectron('kinectron', address);
  kinectron.makeConnection();

  kinectron.startBodies(trackBody);

  wavingCount = 0;

  createCanvas(900, 900);

  //for the projection mapping
  // Maptastic("defaultCanvas0");

  background(0);
  frameRate(60);

  //sound playing
  waterSound.loop();

  birdSound.loop();
  birdSound.setVolume(0);

  filter = new p5.LowPass();

  // Disconnect waterSound from master output.
  // Then, connect it to the filter, so that we only hear the filtered sound
  waterSound.disconnect();
  waterSound.connect(filter);

  fft = new p5.FFT();

  //background for the water
  // pg = createGraphics(900, 260);
  pg = createGraphics(900, 260);
  pg.pixelDensity(1);
  pg.background(0);

  //start point for the tree
  startPoint = createVector(width / 3, 650);
  direction = createVector(0, -height);

  myTree = new Tree(startPoint, direction);

  count = myTree.treeSize;

  acc = createVector(0, 0);

  tempAcc = createVector(0, 0);

  //waterPos = createVector(width / 2, height / 2);
  waterPos = createVector(450, 450);

  waterV = createVector(0, 0);

  //starting point for the birds based on the tree location
  startX = myTree.twig[parseInt(myTree.map[parseInt(count / 2)].x)].location[parseInt(myTree.map[parseInt(count / 2)].y)].x;
  startY = myTree.twig[parseInt(myTree.map[parseInt(count / 2)].x)].location[parseInt(myTree.map[parseInt(count / 2)].y)].y;

  //setup for birds
  flock = new Flock();

  //stars setup
  starsystem = new StarParticleSystem(createVector(0, 0));

}

function draw() {

  // console.log(mouseX, mouseY);

  ellipseMode(CENTER);
  noStroke();
  smooth();

  background(0);

  starsystem.addParticle();
  starsystem.run();

  var mX = mouseX,
    mY = mouseY;

  // if (mapX > 0 && mapX < width && mapZ < height && mapZ > 710) {

  // if (mapX > 0 && mapX < 940 && mapZ < 1000 && mapZ > 700) {
    // filterFreq = map(mapX, 70, 935, 20, 10000);
    if (mouseX > 0 && mouseX < width && mouseY < height && mouseY > 610) {
    filterFreq = map(mouseX, 0, width, 20, 10000);
    // Map mouseY to resonance (volume boost) at the cutoff frequency
    // filterRes = map(mouseY, 610, height, 0, 20);
    filterRes = 10;

  }
  // set filter parameters
  filter.set(filterFreq, filterRes);

  if (handRO) {
    var panValue = map(mouseX, 0, width, -1, 1);

    // var panValue = map(mapX, 70, 935, -1, 1);
    birdSound.pan(panValue);

    // var speed = map(mouseY, 0, height, 0, 4);
    // birdSound.rate(speed);
    var birdV = map(flock.boids.length, 0, birdNum / 15, 0, 1.2);

    // var vol = map(mapZ, 0, 1200, 0.01, 1.5);
    //birdSound.amp(vol);

    birdSound.amp(birdV);
    //birdSound.playMode('sustain');
  }
  //birdSound.play();
  else {
    birdSound.setVolume(0, 2);
  }

  //console.log("volume", birdV);

  //birdSound.setVolume(birdV);

  // Draw every value in the FFT spectrum analysis where
  // x = lowest (10Hz) to highest (22050Hz) frequencies,
  // h = energy (amplitude / volume) at that frequency
  // var spectrum = fft.analyze();

  //---------------------- drawing out the tree -------------------------------
  // if (mouseY > 350 && mouseY < 550 && mouseX < 500 && mouseX > 150) {
  if (dist(mouseX, mouseY, startX, startY) < 200) {
  // if (dist(mapX, mapZ, startX, startY) < 200) {

    handRO = true;

    // if (birdSound.isPlaying()) {
    //   birdSound.pause();
    // } else {
    //   birdSound.play();
    // }
    //birdSound.setVolume(1, 3);
    // if (treeSound.isPlaying()) {
    //   treeSound.stop();
    // } else {
    //   treeSound.play('sustain');
    // }
    //  birdSound.play();
    myTree.swing(acc.x);
    //console.log(acc.x);
    if (abs(acc.x) > 0.4) {
      birdIsScared = true;
      wavingCount++;
      var startPosition = createVector(startX, startY);

      //birds less then 200
      if (wavingCount < birdNum) {
        flock.addBoid(new Boid(startX, startY));
      }
    }
  } else {
    handRO = false;
    myTree.swing(0);
  }
  stroke(255);
  var tempIndex;
  var i;
  //console.log(count);

  for (i = 1; i < count; i++) {
    strokeWeight(myTree.twig[parseInt(myTree.map[i].x)].thickness[parseInt(myTree.map[i].y)]);
    line(myTree.twig[parseInt(myTree.map[i].x)].location[parseInt(myTree.map[i].y) - 1].x,
      myTree.twig[parseInt(myTree.map[i].x)].location[parseInt(myTree.map[i].y) - 1].y,
      myTree.twig[parseInt(myTree.map[i].x)].location[parseInt(myTree.map[i].y)].x,
      myTree.twig[parseInt(myTree.map[i].x)].location[parseInt(myTree.map[i].y)].y);
  }

  //drawing for the leaves
  // noStroke();
  // for (i = 0; i < myTree.twig.length; i++) {
  //   var num = myTree.twig[i].location.length - 1;
  //   ellipse(myTree.twig[i].location[num].x, myTree.twig[i].location[num].y, 4, 4);
  // }
  //------------------------------ finish -------------------------------------

  // console.log(myTree.twig.length);
  drawWater();

  //control the bird fly;
  if (birdIsScared) {
    flock.run();
    flock.cleanTheDead();
  }
  //
  // push();
  // fill(255, 0, 0);
  // ellipse(mapX, mapZ, 20, 20);
  // pop();
}

//--------------------------- kinect tracking ---------------------------------

var tracking = false;
var playerID = null;
// var playerID;
var playerInRange = false;

function trackBody(allbodies) {
  // console.log('bodies found');

  var bodies = allbodies.bodies;

  for (var i = 0; i < bodies.length; i++) {
    // console.log('hi');
    // if ((!tracking && bodies[i].tracked) == false) window.location.reload(false);
    if (!tracking && bodies[i].tracked == true) {
      console.log("getting player");
      // console.log(bodies[i]);
      // debugger;
      playerID = bodies[i].trackingId;

      // if (!playerID) window.location.reload(false);

      if (bodies[i].joints[1].depthX > 0.40 && bodies[i].joints[1].depthX < 0.70 &&
        bodies[i].joints[1].cameraZ < 1.80) {
        playerInRange = true;
        tracking = true;
        console.log("player is in range");
        // setup();
      }
      // window.location.reload(false);
    }


    if (bodies[i].trackingId == playerID) {
      // draw the wrist
      console.log("drawing", playerID);

      if (tracking == true && playerInRange == true) {

        var bodyx = bodies[i].joints[10].depthX;
        var bodyz = bodies[i].joints[10].cameraZ;

        mapY = bodies[i].joints[10].cameraY;

        //using the cooradinate X as the mouseX
        //using the cooradinate Z as the mouseY
        mapX = map(bodyx, 0.345, 0.735, 70, 935);
        mapZ = map(bodyz, 0.68, 1.60, 15, 950);

        console.log(bodyx, bodyz);

        // var m = 0.05;
        // var f = createVector(mapX, mapZ);
        //
        // acc = (f.sub(waterPos)).div(m);
        //
        // acc.normalize();
        //
        // tempAcc.set(0, acc.y);
        //
        // acc.set(acc.x, 0);
        //
        // if (bodies[i].joints[1].depthX > 0.8 || bodies[i].joints[1].depthX < 0.3 ||
        //   bodies[i].joints[1].cameraZ > 1.8) {
        //   tracking = false;
        //   playerInRange = false;
        //   window.location.reload(false);
        // }
      }
    }
  }
}

//------------------------------- finish --------------------------------------


// using the mouse to control the acceleration
function mouseMoved() {
  var m = 0.05;
  var f = createVector(mouseX, mouseY);

  acc = (f.sub(waterPos)).div(m);

  acc.normalize();

  //setting the acceleration for the waterY;
  tempAcc.set(0, acc.y);

  //acc.set(acc.x, 0);

  //console.log(acc.y, mapZ);


  // tempAcc.sub(acc.x, 0);
  // acc.x = tempX;

  // console.log(acc, tempAcc);
  //console.log(acc.x);
}


//----------------------- drawing out the water -------------------------------
function drawWater() {

  push();
  fill(0);
  stroke(255);
  strokeWeight(2);
  bezier(0, 660, 400, 660, 600, 600, 900, 660);
  pop();

  //transparency 5;
  pg.fill(0, 5);
  pg.noStroke();
  //setting reflashing rectangle background for the wave
  pg.rect(0, 0, width, 350);

  incr2 = 300;
  incr3 = -250;
  h = 0;
  a = 100;

  pg.strokeWeight(random(1.3, 2));

  //adding force to the water rather then using the mouseX,Y.
  waterV.add(acc);
  waterPos.add(waterV);

  //slow down the speed;
  waterV.x *= 0.95;
  //waterV.x *= 0.99;
  waterV.y *= 0.99;


  if (tempAcc.y > 0.3) {
    tempAcc.mult(0.90);
  } else {
    tempAcc = createVector(0, 0);
  }


  //clear out the acceleration
  acc = createVector(0, 0);

  //console.log(waterV.x, waterV.y);
  // console.log(waterPos.x, waterPos.y);

  //drawing the lines(water)
  for (var w = 0; w < 7; w++) {
    pg.beginShape();
    for (var x = 0; x <= width + 500; x = x + 100) {
      pg.stroke(255, a);

      // if (mapZ > 630 && mapZ < 945) {
        if (mouseY > 610 && mouseY < 900) {

        if (x == 100) {
          pg.curveVertex(x - 100,
            (height - 610 + incr3) * noise(incr1, x / incr2 - 100));

        } else {
          //waving X
          pg.curveVertex(x - 100 + waterV.x * 10,
            (height - 610 + incr3) * noise(incr1, x / incr2 - 100));
        }
      } else {
        pg.curveVertex(x - 100,
          (height - 610 + incr3) * noise(incr1, x / incr2 - 100));
      }
    }
    pg.endShape();

    console.log(tempAcc.y);
    // incr1 += .0004;
    var ySpeed = map(abs(tempAcc.y), 0, 1.0, 0.0004, 0.003);
    
    // if (abs(tempAcc.y) > 0.8 && mouseY > 650 && mouseY < 945) {
      if (abs(tempAcc.y) > 0.3 && mouseY > 550 && mouseY < 900) {
      incr1 += ySpeed;
    } else {
      incr1 += .0004;
    }
    
    
    //control the waving speed

    //incr1 += .0004;
    //
    incr2 -= 127;
    //control the distance between each line
    incr3 += 70;

    h += 5;
    //transparency
    a -= 10;
  }

  image(pg, 0, height - 240);
}

window.onload = () => {
  console.log(document.getElementById('defaultCanvas0'));
}
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  translate(200,200);
  background(220);
  var deg = mouseX;
  var rad = radians(deg);
  noFill();
  scale(mouseY/300);
  beginShape();
  bezier(85, 20, 10, 10, 90, 90, 15, 80);
  endShape();
}function setup() {
  createCanvas(400, 400);
}

function draw() {

  background(220);
  noFill();
  translate(200, 200);
  push();
  scale(20);
  strokeWeight(0.05);
  beginShape();
  // curve(0,-6,0,-3,-1,1 ,1,5);
  bezier(0, -6, 1, -1, -3, -1, 1, 5);
  bezier(0, -6, 1, -5, 2, -4, 2, -3);
  endShape();
  beginShape();
  translate(1, 0);

  bezier(0, -3, 1, -2, 4, -2, 5, 0);

  bezier(0, -3, -1, -2, -4, -2, -5, 0);

  bezier(1, 0, 1, 0, 4, -1, 5, 0);

  bezier(-1, 0, -1, 0, -4, -1, -5, 0);

  endShape();
  pop();
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

	filter = new p5.LowPass();
	//(connect sound to filter) 
	mySound3.disconnect();
	mySound3.connect(filter);
	fft = new p5.FFT();

	//panning volume for bird//

	level = new p5.Amplitude();
}

function draw() {
	background(220, 230, 233);
	line(200, 0, 200, 250);
	line(0, 250, 640, 250);


	//change the freq range of the lowpass filter
	var freq = map(mouseX, 0, width, 20, 8000);
	filter.freq(freq);

	// give the filter a narrow band (lower res = wider bandpass)
	filter.res(10);


}
//filter mouse over for water sound
function isMouseOverCanvas() {
	var mX = mouseX,
		mY = mouseY;
	if (mX > 0 && mX < width && mY < height && mY > 0) {
		mySound3.amp(0.5, 0.2);
	} else {
		mySound3.amp(0, 0.2);
	}
}



// mouse over for 3 sound

function mouseMoved() {
	//play tree music


	if (mouseX > 0 &&
		mouseX < 200 &&
		mouseY > 0 &&
		mouseY < 250) {



		if (mySound.isPlaying() == true) {
			mySound.pause();
		} else {

			mySound.play();


		}

		//play bird music
	} else {

		if (mouseX > 200 &&
			mouseX < 640 &&
			mouseY > 0 &&
			mouseY < 250) {

			//panning function for bird music
			var panValue = map(mouseX, 0, width, -1, 1);
			print(panValue);
			mySound2.pan(panValue);

			var speed = map(mouseY, 0, height, 0, 4);
			mySound2.rate(speed);

			var vol = map(mouseY, 0, height, 0, 1);
			mySound2.amp(vol);


			if (mySound2.isPlaying() == true) {
				mySound2.pause();
			} else {

				mySound2.play();

			}
			//play  water music
		} else {



			if (mouseX > 0 &&
				mouseX < 640 &&
				mouseY > 250 &&
				mouseY < 360) {

				filterFreq = map(mouseX, 0, width, 20, 20000);
				filterRes = map(mouseY, 710, height, 15, 5)


				if (mySound3.isPlaying() == true) {
					mySound3.pause();
				} else {

					mySound3.play();




				}
			}

		}
	}
}//kinect
var kinectron = null;

// var paths = [];
// var pathss = [];
// var pathsss = [];
var largePath = [];

var ellipses = [];

var waters = [];

var incr1 = 0;
var incr2 = 0;
var incr3 = 0;
var h = 0;
var a = 0;

var pg;

var t = 0;

var wavingTree = false;

var myTree;
var startPoint;
var direction;
var count;

//force for water
var acc, waterPos, waterV;

function setup() {

  createCanvas(900, 900);
  background(0);

  pg = createGraphics(900, 260);
  pg.pixelDensity(1);
  pg.background(0);

  var address = {
    host: '172.16.216.97',
    port: 9001,
    path: '/'
  };

  // kinectron = new Kinectron('kinectron', address);
  // kinectron.makeConnection();
  // kinectron.startTrackedBodies(trackBody);
  //LargeTree
  //largePath[0] = new LargeTree();

  // paths[0] = new Tree();
  // pathss[0] = new Tree();
  // pathsss[0] = new Tree();

  startPoint = createVector(width / 4, 700);
  direction = createVector(0, -height);
  myTree = new Tree(startPoint, direction);
  count = myTree.treeSize;

  acc = createVector(0, 0);
  //waterPos = createVector(width / 2, height / 2);
  waterPos = createVector(0, 0);

  waterV = createVector(0, 0);

}

function draw() {

  frameRate(30);
  ellipseMode(CENTER);
  noStroke();
  smooth();

  background(0);

  //---------------------- drawing out the tree -------------------------------
  // if(mouseY > 400 && mouseY < 600) {
  //   myTree.swing(waterV.x);
  //   console.log(acc.x);
  // }else{
  //   myTree.swing(2);
  // }
  if (mouseY > 400 && mouseY < 600) {
    myTree.swing(acc.x);
  } else {
    myTree.swing(0);
  }
  stroke(255);
  var tempIndex;
  var i;
  for (i = 1; i < count; i++) {
    strokeWeight(myTree.twig[parseInt(myTree.map[i].x)].thickness[parseInt(myTree.map[i].y)]);
    line(myTree.twig[parseInt(myTree.map[i].x)].location[parseInt(myTree.map[i].y) - 1].x,
      myTree.twig[parseInt(myTree.map[i].x)].location[parseInt(myTree.map[i].y) - 1].y,
      myTree.twig[parseInt(myTree.map[i].x)].location[parseInt(myTree.map[i].y)].x,
      myTree.twig[parseInt(myTree.map[i].x)].location[parseInt(myTree.map[i].y)].y);
  }

  noStroke();
  for (i = 0; i < myTree.twig.length; i++) {
    var num = myTree.twig[i].location.length - 1;
    ellipse(myTree.twig[i].location[num].x, myTree.twig[i].location[num].y, 1, 1);
  }
  //------------------------------ finish -------------------------------------


  //---------------------- drawing out the tree -------------------------------
  // for (var m = 0; m < largePath.length; m++) {
  //   largePath[m].drawTree();
  //   largePath[m].update(largePath);
  // }
  //
  // if(largePath.length == 1024)
  // {
  //   wavingTree = true;
  // }

  // if (wavingTree) {
  //   //console.log(largePath[1000].diameter);
  //   for (var n = 0; n < largePath.length; n++) {
  //     console.log(largePath[n].diameter);
  //   }
  // }

  //------------------------------ finish -------------------------------------



  //---------------------- drawing out the water -------------------------------
  push();
  fill(0);
  stroke(255);
  strokeWeight(2);
  bezier(0, 710, 400, 710, 600, 650, 900, 710);
  pop();

  //transparency 5;
  pg.fill(0, 5);
  pg.noStroke();
  //setting reflashing rectangle background for the wave
  pg.rect(0, 0, width, 350);

  incr2 = 300;
  incr3 = -250;
  h = 0;
  a = 100;

  pg.strokeWeight(random(1.3, 2));

  //adding force to the water rather then using the mouseX,Y.
  waterV.add(acc);
  waterPos.add(waterV);

  push();
  fill(255, 0, 0);

  ellipse(waterPos.x, waterPos.y, 10, 10);

  //slow down the speed;
  waterV.x *= 0.99;
  waterV.y *= 0.99;
  //clear out the acceleration
  acc = createVector(0, 0);

  //console.log(waterV.x);
  pop();

  // console.log(waterPos.x, waterPos.y);


  //drawing the lines(water)
  for (var w = 0; w < 7; w++) {
    pg.beginShape();
    for (var x = 0; x <= width + 500; x = x + 150) {
      pg.stroke(255, a);

      if (mouseY > 710 && mouseX < 900) {

        if (x == 150) {
          pg.curveVertex(x - 200,
            (height - 600 + incr3) * noise(incr1, x / incr2 - 100 + waterV.y / 30));

        } else {
          //waving X
          pg.curveVertex(x - 200 + waterV.x * 10,
            (height - 600 + incr3) * noise(incr1, x / incr2 - 100 + waterV.y / 30));

        }
      } else {
        pg.curveVertex(x - 200,
          (height - 600 + incr3) * noise(incr1, x / incr2 - 100));
      }
    }
    pg.endShape();
    //incr1 += .0004;
    //control the waving speed
    incr1 += .0004;
    //
    incr2 -= 87;
    //control the distance between each line
    incr3 += 50;
    h += 5;
    //transparency
    a -= 10;
  }

  image(pg, 0, height - 190);
  //------------------------------ finish -------------------------------------
}

//kinect tracking
// function trackBody(body) {
//   var bodyx = body.joints[kinectron.HANDRIGHT].cameraX;
//   var bodyy = body.joints[kinectron.HANDRIGHT].cameraY;
//
//   var mapX = map(bodyx, -1, 1, 0, 900);
//   var mapY = map(bodyy, -1, 1, 900, 0);
//
//   ellipses[0] = new Ellipse(mapX, mapY);
//
//   ellipses[0].drawEllipse();
//
//   //console.log(mapX);
// }
//
function mouseMoved() {
  var m = 0.05;
  var f = createVector(mouseX, mouseY);
  acc = (f.sub(waterPos)).div(m);
  acc.normalize();
  //console.log(acc.x);
}


function applyForceNew() {
  var m = 0.1;
  var f = createVector(mouseX, mouseY);
  acc = (f.sub(waterPos)).div(m);
  acc.normalize();
  console.log(acc.x);
}
var kinectron = null;
var mySound;

function preload(){
  mySound = loadSound("Taylor Swift - Shake It Off.mp3");
}

function setup() {
	createCanvas(500, 500);
  var address = {host: '172.16.216.97', port: 9001, path: '/'};
	kinectron = new Kinectron('kinectron',address);
	kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
  mySound.play();
  
  //set the callback function name to be called when stuff comes from kinect
}

function draw() {

}

function trackBody(body) {
  background(0);
  var val = body.joints[kinectron.HANDRIGHT].cameraZ;
  //println(val);
  var vol = map(val,0,4,0,1);

  console.log(vol);
  console.log(vol);
  mySound.amp(vol);
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
}
var branches = [];//holds a list of p5.Vectors
var trunkSize = 10.4;
var currentBranchLocL = null;
var currentBranchLocR = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  //translate(width/2, height/2);
  //if we have at least 2 items in our array
}

/**
 * when the user clicks the mouse,
 * add the mouse position as a vector to our branches
 * list
 * */
function mouseClicked(){
  // branchRecursive(mouseX, mouseY, -90, 10);
  superSimpleTreeDraw(mouseX,mouseY,-90,10);
}


function branchRecursive(x, y, angle, numBranches){
  //we want to stop recursing if our iterator is below 0
  if (numBranches <= 0) return;
  
  //try replacing random with noise
  //not comfortable with sin and cos yet? No problem! Try using rotate()
  //instead.
  var x2 = x + (cos(radians(angle)) * numBranches * 10.0) + random(-10,10);
  var y2 = y + (sin(radians(angle)) * numBranches * 10.0) + random(-10,10);
  console.log(x,y,x2,y2);
  line(x, y, x2, y2);
  
  //we recurse on both side so that we have an even number of
  //branches.  What if we didn't have a symmetrical tree?
  branchRecursive(x2, y2, angle - 20, numBranches - 1);
  branchRecursive(x2, y2, angle + 20, numBranches - 1);
}

/**
 * This function does not produce the same result as the recursive example
 * It's meant to demonstrate another way one can draw generative tree-like shapes
 * Note: there is no 1 correct answer to this problem.
 */
function superSimpleTreeDraw(x,y,angle, numBranches){
  var xL2, yL2;
  var xR2, yR2;
  var branchSize = 1.0;
  
  //we create an angleL and angleR so our tree can start
  //its growth vertically
  var angleL = angleR = angle;
  
  for(var i=0; i < numBranches; i++){
    if(i === 0){
      currentBranchLocL = createVector(x,y);
      currentBranchLocR = createVector(x,y);
      
      xL2 = currentBranchLocL.x;
      yL2 = currentBranchLocL.y;
      
      xR2 = currentBranchLocR.x;
      yR2 = currentBranchLocR.y;
    }
    else {
      //all branches other than the trunk lean in a direction
      angleL = angleL - 20.0;
      angleR = angleR + 20.0;
      
      // algorithm explanation:
      // take our branch location, and rotate by a given angle + a little random sway from-10 to 10
      xL2 = currentBranchLocL.x + (cos(radians(angleL)) * numBranches * branchSize * 20.0) + random(-10,10);
      yL2 = currentBranchLocL.y + (sin(radians(angleL)) * numBranches * branchSize * 20.0) + random(-10,10);
      xR2 = currentBranchLocR.x + (cos(radians(angleR)) * numBranches * branchSize *20.0) + random(-10,10); 
      yR2 = currentBranchLocR.y + (sin(radians(angleR)) * numBranches * branchSize * 20.0) + random(-10,10);
    }
    //draw our left branch
    line(currentBranchLocL.x, currentBranchLocL.y, xL2, yL2);
    //draw our right branch
    line(currentBranchLocR.x, currentBranchLocR.y, xR2, yR2);
    branchSize *= 0.66; //make each subsequent branch 2/3rds of the previous 
    currentBranchLocL = createVector(xL2, yL2);
    currentBranchLocR = createVector(xR2, yR2);
  }
}

/**
 * What if you chose a random branch left or right?
 * based on the random boolean example in class.
 * See week04 example as reference.
 * this function returns either our right side or left side coords
 * as a vector.  It should be randomly choosing which side;
 */
function randomLeftOrRight(x1,y1, x2, y2){
  var bTruth = Math.round(random(1));
  if(bTruth == 1){
    var vecLeft = createVector(x1,y1);
    return vecLeft;
  } else {
    var vecRight = createVector(x2,y2);
    return vecRight;
  }
}var paths = [];
var pathss = [];
var pathsss = [];

function setup() {
  createCanvas(800, 800);
  background(0);
  paths[0] = new Tree();
  pathss[0] = new Tree();
  //var Loc = createVector(random(width / 4, 3 * width / 4), height);
  //pathss[0] = new Tree(, Loc);
}

function draw() {
  ellipseMode(CENTER);
  noStroke();
  smooth();
  for (var i = 0; i < paths.length; i++) {
    paths[i].drawTree();
    paths[i].update(paths);

    // pathss[i].drawTree();
    // pathss[i].update(pathss);
  }
  
  for (var j = 0; j < pathss.length; j++) {

    pathss[j].drawTree();
    pathss[j].update(pathss);
  }
}

// function mousePressed() {
//   background(0);
//   paths = [];
//   console.log(paths);
//   paths[0] = new Tree();
// }
var balls = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
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

function touchStarted() {
  
  for( var j = 0; j < touches.length; j++)
  {
    for (var i = 0; i < 150; i++) {
      balls.push(new Ball((mouseX + random(-30, 30)), mouseY + random(-30, 30)));
    }
  }
}

function touchMoved() {
  return false;
}// Jiashan Wu
// https://github.com/OhJia/p5MobileWebExamples
// Revised Daniel Shiffman

// Position Variables
var x = 0;
var y = 0;

// Speed - Velocity
var vx = 0;
var vy = 0;

// Acceleration
var ax = 0;
var ay = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log('gravity');
}

function draw() {
  background(255);

  ax = map(rotationY, -90, 90, -1, 1);
  ay = map(rotationX, -90, 90, -1, 1);

  vx = vx + ax;
  vy = vy + ay;
  y = y + vy;
  x = x + vx;
  
  // dampening
  vx = vx * 0.99;
  vy = vy * 0.99;

  // Bounce when touch the edge of the canvas
  if (x < 0) {
    x = 0;
    vx = -vx;
  }
  if (y < 0) {
    y = 0;
    vy = -vy;
  }
  if (x > width) {
    x = width;
    vx = -vx;
  }
  if (y > height) {
    y = height;
    vy = -vy;
  }
  fill(0);
  ellipse(x, y, 30, 30);

}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 16-14: Overall motion

// Variable for capture device
var videoScale = 16;

// Number of columns and rows in our system
var cols, rows;

var video;

// Previous Frame
var prevFrame;

var sz;
// How different must a pixel be to be a "motion" pixel
var threshold = 50;

var wave;

function setup() {
  createCanvas(640, 480);
  //pixelDensity(1);
  wave = new p5.Oscillator();

  wave.setType('sine');
  wave.start();
  wave.freq(440);
  wave.amp(0.3);

  cols = width / videoScale;
  rows = height / videoScale;

  video = createCapture(VIDEO);
  video.size(cols, rows);
  video.hide();
  // Create an empty image the same size as the video
  prevFrame = createImage(video.width, video.height, RGB);
}

function draw() {
  background(0);

  video.loadPixels();
  prevFrame.loadPixels();

  var totalMotion = 0;

  // Begin loop to walk through every pixel
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {

      // Step 1, what is the location into the array
      var loc = (i + j * video.width) * 4;

      var temp = ((cols - i - 1) + j * cols) * 4;

      // Step 2, what is the previous color
      var r1 = prevFrame.pixels[loc];
      var g1 = prevFrame.pixels[loc + 1];
      var b1 = prevFrame.pixels[loc + 2];

      // Step 3, what is the current color
      var r2 = video.pixels[loc];
      var g2 = video.pixels[loc + 1];
      var b2 = video.pixels[loc + 2];

      var r = video.pixels[temp];
      var g = video.pixels[temp + 1];
      var b = video.pixels[temp + 2];

      // A rectangle size is calculated as a function of the pixel's brightness.
      // A bright pixel is a large rectangle, and a dark pixel is a small one.
      sz = map((r + g + b) / 3, 0, 255, 0, videoScale);

      rectMode(CENTER);
      fill(255);
      noStroke();
      // For every column and row, a rectangle is drawn at an (x,y) location scaled and sized by videoScale.
      var x = i * videoScale;
      var y = j * videoScale;
      ellipse(x + videoScale / 2, y + videoScale / 2, sz, sz);
      // Step 4, compare colors (previous vs. current)
      var diff = dist(r1, g1, b1, r2, g2, b2);

      totalMotion += diff;
    }
  }

  // Save frame for the next cycle
  if (video.canvas) {
    prevFrame.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height); // Before we read the new frame, we always save the previous frame for comparison!
  }


  // averageMotion is total motion divided by the number of pixels analyzed.
  var avgMotion = totalMotion / (video.width * video.height);

  // Draw a circle based on average motion
  var temp1 = map(avgMotion, 0, 50, 40, 880);
  console.log(temp1);
  wave.freq(temp1);
}
// Declare a "SerialPort" object
let serial;
//let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
var Humi;
var Pulse;

//data name from sensor
let pulse1;
let humi1;
let pulse2;
let humi2;

//beat1=(pulse1+humi1)*sth
let beat1;
let beat2;

let pic1, pic2;

//heartrain
let rain = [];

function preload() {
  heart = loadImage('heart.png');
}

function setup() {
  createCanvas(1000, 600);

  //heart rain
  for (let i = 0; i < 150; i++) {
    rain.push(new Rain(heart));
  }

    // Instantiate our SerialPort object
    serial = new p5.SerialPort();
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing

    serial.list(); // list the serial ports

    serial.open("/dev/cu.usbmodem1411");

    // let col= map(humi1, 0,width, 0,255);
  }

  function draw() {
    background(255);
    imageMode(CENTER);

    //bar();


    //let col= map(humi1,0,width, 0,255);
    //tint(col,50);
    //println(humi1);
    
  	//falling heart

    if (1) {
      for (let i = 0; i < rain.length; i++) {
        rain[i].fall();
        rain[i].display();
      }
    }
  	scale(random(0.95, 1));

    pic1 = image(heart, width / 4, height / 2, humi1, humi1);
  	//scale(random(0.95, 1));

    pic2 = image(heart, width * 3 / 4, height / 2, humi2, humi2);
  	//scale(random(0.95, 1));

  }




  // get the list of ports:
  function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
      // Display the list the console:
      println(i + " " + portList[i]);
    }
  }

  function serverConnected() {
    println('connected to server.');
  }

  function portOpen() {
    println('the serial port opened.')
  }

  function serialError(err) {
    println('Something went wrong with the serial port. ' + err);
  }

  function portClose() {
    println('The serial port closed.');
  }

  function serialEvent() {
    // read a string from the serial port
    // until you get carriage return and newline:
    var inString = serial.readStringUntil('\r\n');

    //check to see that there's actually a string there:
    if (inString.length > 0) {
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length > 2) { // if there are three elements
        humi1 = map(sensors[1], 40, 100, 0, width / 2);
        humi2 = map(sensors[3], 40, 100, 0, width / 2);
        // element 0 is the boardx
        //wh = map(sensors[1], 0, 1023, 0, height/2); // element 1 is the wall's height
        //circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
      }
    }


  }

  function bar() {
    noFill();
    stroke(255);
    strokeWeight(1);

    fill(255, 233, 138);
    Humi = rect(100, 600, 50, -frameCount / 2);
    Pulse = rect(200, 600, 50, -frameCount / 2);
  }var data;
var img;
var ww = 800;
var hh = 800;
var sec = 0;
//var slider;

var startTime = 0;

var key = 'pk.eyJ1IjoibWFwcGF1c2VyIiwiYSI6ImNqNXNrbXIyZDE2a2cyd3J4Ym53YWxieXgifQ.JENDJqKE1SLISxL3Q_T22w'

var mappa = new Mappa('Mapbox', key);

var options = {
  lat: 0,
  lng: 0,
  zoom: 1,
  width: 800,
  height: 800,
  scale: 1,
  pitch: 0,
  style: 'dark-v9'
}

var myMap = mappa.staticMap(options);

function preload() {
  img = loadImage(myMap.imgUrl);
  data = loadTable("https://data.nasa.gov/resource/y77d-th95.csv")
  //data = loadJSON('https://data.nasa.gov/resource/y77d-th95.json');
}

function setup() {
  
  startTime = millis();

  createCanvas(ww, hh);
  //  angleMode(RADIANS);
  //translate(width / 2, height / 2);
  //imageMode(CENTER);
  image(img, 0, 0);
  //print(data.getRowCount());
  //background(0);

  // slider = createSlider(1880, 2017, 1880, 1);
  // slider.position(300, 800);
  // slider.style('width', '200px');
}

function draw() {
  
  var currentTime = millis() - startTime;

  //var millisecond = millis();

  for (var i = 0; i < data.getRowCount(); i++) {

    var time = data.getString(i, 15).split('-');
    fill(255);

    sec = currentTime / 1000 + 1880;

    if (time[0] == int(sec).toString()) {

      var tempLat = float(data.getString(i, 13));
      var tempLng = float(data.getString(i, 14));
      var pos = myMap.latLngToPixel(tempLat, tempLng);
      noStroke();
      ellipse(pos.x, pos.y, 2);
    }
  }
  
  if(sec > 2015)
  {
    setup();
    redraw();
  }

  //console.log(data);
}var serial;

function setup() {
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1421");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
    println("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    println(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  println("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  println(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  console.log(currentString);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer

function draw() {
  // Polling method
/*
  if (serial.available() > 0) {
    var data = serial.read();
    ellipse(50,50,data,data);
  }
*/
}
var MAX_PARTICLES = 170;
var COLORS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];

var wander1 = 0.5;
var wander2 = 2.0;
var drag1 = 0.9;
var drag2 = 0.99;
var force1 = 2;
var force2 = 8;
var theta1 = -0.5;
var theta2 = 0.5;
var size1 = 5;
var size2 = 180;
var sizeScalar = 0.97;

var particles = [];
var pool = [];

function setup() { 
  createCanvas(800, 800);
} 

function draw() { 
  	update();
    drawingContext.globalCompositeOperation = 'normal';
  	background(0);
 	drawingContext.globalCompositeOperation = 'lighter';
	for (var i = particles.length - 1; i >= 0; i--) {
    	particles[i].show();
    }
}

function mouseMoved() {
   moved();
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
}var Trgles = [];

var angle;

var spring = 0.05;
var friction = -0.9;
var gravity = 0.03;


function setup() {
  createCanvas(800, 600);
  collideDebug(true) //enable debug mode

  angle = TWO_PI / 6;

  for (var i = 0; i < 50; i++) {
    Trgles.push(new myTriangle(i));
  }

}

function draw() {
  background(255);

  // 	for(var j = 0; j < Trgles.length; j++)
  // 	{
  //     Trgles[j].collide(Trgles);
  // 	}

  for (var i = 0; i < Trgles.length; i++) {

    push();
    Trgles[i].move();
    //translate(Trgles[i].x, Trgles[i].y);
    //rotate(frameCount / 100);
    Trgles[i].display();
    //rotate(radians(frameCount));
    pop();

    //print(Trgles[20].y);
  }

}var offset=0;
var button={
  w:50,
  h:50,
}

var pressed = false;

var count = 0;

function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(237, 34, 93);
  //draw a button
  noStroke();
  fill(0);
  rectMode(CENTER);
  rect(width/2,height/2,button.w+offset,button.h+offset);

  //button flickers

  
  //if mouse is over the button, button pops
  if (mouseX>width/2-button.w/2 && mouseX<width/2+button.w/2) {
    rect(width/2,height/2,button.w+15,button.h+15);
  

  //if button is pressed, button disappears and pattern shows
  if(mouseIsPressed) {
    
    
    background(237, 34, 93);
    
    let x=width/2;
    let y=height/2;
    
    stroke(0);
    noFill();
      	
  	pressed = true;
    if(count%2 ==0)
    {
    	for (w=20;w<=width;w+=20) {
      	for (h=20;h<=height;h+=20) {
        
        	var rad = frameCount * 0.1;
        	var oscillation = sin(rad); //sin of anything -1 and 1 
        	var oscMapped = map(oscillation, -1, 1, 0, 0.6);
  	// //var offSet = random(-50, 50);
  	// offset=offset+speed;
  	// if (offset>=0 && offset<=5) {
  	// speed=1;
  	// }
  	// else {
  	// speed=speed*-1;
  	// }
        	ellipse(x,y,w ,h );
      }
    }    
  }

  }
      
  }
}

function mouseReleased()
{ 
  if(pressed)
  {
  count++;
  print(count);
  }
  pressed = false;
}var dragging = false; 
var rollover = false;

var balls = [];
var spring = 0.05;
var friction = -0.9;

var gravity = 0.03;

var tempDia = 0;

var colours = ['#247BA0', '#70C1B3', '#B2DBBF', '#F3FFBD', '#FF1654'];

function setup() {
    createCanvas(600, 400);

    for (var i = 0; i < 64; i++) {
        balls.push(new Ball(i));
    }
      	tempDia = balls[20].diameter;

}

function draw() {
    background(255);
  
  	//rollover the mouse to the black ball
  	if(dist(mouseX, mouseY, balls[20].x, balls[20].y) < balls[20].diameter/2)
  	{
      rollover = true;
      balls[20].diameter = 50;
    }else{
      rollover = false;
      balls[20].diameter = tempDia;
    }

    for (var j = 0; j < balls.length; j++) {
        balls[j].collide(balls);
    }
    for (var i = 0; i < balls.length; i++) {
        balls[i].move();
        if (dragging) {
  	  balls[20].x = mouseX + balls[20].offsetX;
  	  balls[20].y = mouseY + balls[20].offsetY;
  	  //balls[20].move();
  	  //balls[20].display();
  	  }
        balls[i].display();
      	//if
      	//balls[i].deRoll();
    }
  	
  
}

// Ball class
function Ball(id) {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(10, 30);
    this.vx = 0;
    this.vy = 0;

    this.colour = random(colours);
    
    //print(this.colour);
  
  	this.offsetX = 0;
  	this.offsetY = 0;

    this.id = id;

  	//move the balls
    this.move = function() {
        this.vy += gravity;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x + this.diameter / 2 > width) {
            this.x = width - this.diameter / 2;
            this.vx *= friction;
        } else if (this.x - this.diameter / 2 < 0) {
            this.x = this.diameter / 2;
            this.vx *= friction;
        }
        if (this.y + this.diameter / 2 > height) {
            this.y = height - this.diameter / 2;
            this.vy *= friction;
        } else if (this.y - this.diameter / 2 < 0) {
            this.y = this.diameter / 2;
            this.vy *= friction;
        }
    };

    //collide here
    this.collide = function(objArray) {
        for (i = 0; i < objArray.length; i++) {
          
            var dx = objArray[i].x - this.x;
            var dy = objArray[i].y - this.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            var minDist = objArray[i].diameter / 2 + this.diameter / 2;
            if (distance < minDist) {
              
                var angle = Math.atan2(dy, dx);
                var targetX = this.x + Math.cos(angle) * minDist;
                var targetY = this.y + Math.sin(angle) * minDist;
                var ax = (targetX - objArray[i].x) * spring;
                var ay = (targetY - objArray[i].y) * spring;
         
                this.vx -= ax;
                this.vy -= ay;
                objArray[i].vx += ax;
                objArray[i].vy += ay;

            }
        }
    };
  
//   	this.deRoll = function()
//     {
//       if(this.id == 20)
//       {
//         if(dist(mouseX, mouseY, this.x, this.y) < this. diameter/2){
//           this.x = this.x * random(-10,10);
//           this.y = this.y * random(-5,5);
//           background(0);
//         }
//       }
//     };
		
		//display the balls
    this.display = function() {

      if(this.id == 20)
      {
        noStroke();
        //strokeWeight(2);
        fill(0);
      }else{
        noStroke();
        
        fill(this.colour);}
      
        ellipse(this.x, this.y, this.diameter, this.diameter);
    };
}

//when the mouse is pressed
function mousePressed()
{
  if(dist(mouseX, mouseY, balls[20].x, balls[20].y) < balls[20].diameter/2)
  {
    dragging = true;
    balls[20].diameter = 50;
    // If so, keep track of relative location of click to corner of rectangle
    balls[20].offsetX = balls[20].x - mouseX;
    balls[20].offsetY = balls[20].y - mouseY;  
  }
    
}

function mouseReleased() {
  // Quit dragging
  dragging = false;
  balls[20].diameter = tempDia;
}var balls = [];
var spring = 0.05;
var friction = -0.9;
var gravity = 0.03;

function setup() {
    createCanvas(600, 400);

    for (var i = 0; i < 50; i++) {
        balls.push(new Ball(i));
    }
}

function draw() {
    background(255);

    for (var j = 0; j < balls.length; j++) {
        balls[j].collide(balls);
    }
    for (var i = 0; i < balls.length; i++) {
        balls[i].move();
        balls[i].display();
    }
}

// Ball class
function Ball(id) {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(10, 30);
    this.vx = 0;
    this.vy = 0;

    this.r = random(255);
    this.g = random(255);
    this.b = random(255);

    this.id = id;

    this.move = function() {
        this.vy += gravity;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x + this.diameter / 2 > width) {
            this.x = width - this.diameter / 2;
            this.vx *= friction;
        } else if (this.x - this.diameter / 2 < 0) {
            this.x = this.diameter / 2;
            this.vx *= friction;
        }
        if (this.y + this.diameter / 2 > height) {
            this.y = height - this.diameter / 2;
            this.vy *= friction;
        } else if (this.y - this.diameter / 2 < 0) {
            this.y = this.diameter / 2;
            this.vy *= friction;
        }
    };

    //collide here
    this.collide = function(objArray) {
        for (i = 0; i < objArray.length; i++) {
            var dx = objArray[i].x - this.x;
            var dy = objArray[i].y - this.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            var minDist = objArray[i].diameter / 2 + this.diameter / 2;
            if (distance < minDist) {
                var angle = Math.atan2(dy, dx);
                var targetX = this.x + Math.cos(angle) * minDist;
                var targetY = this.y + Math.sin(angle) * minDist;
                var ax = (targetX - objArray[i].x) * spring;
                var ay = (targetY - objArray[i].y) * spring;
                this.vx -= ax;
                this.vy -= ay;
                objArray[i].vx += ax;
                objArray[i].vy += ay;
            }
        }
    };

    this.display = function() {

        noStroke();
        fill(this.r, this.g, this.b);

        ellipse(this.x, this.y, this.diameter, this.diameter);
    };
}
var centreX = 200;
var centreY = 300;

var xPos = 0;

var speed = 0.3;

var Alpha = 30;

var starX = 220;


var nostril1;
var nostril2;

function setup() {

  createCanvas(600, 600);
  fill(0);

}

function draw() {

  background(220);
  
  nostril1 = new Jitter(292, 400, mouseX, mouseY);
	nostril2 = new Jitter(308, 400, mouseX, mouseY);
	//nose

  nostril1.move();
  nostril1.display();

	nostril2.move();
  nostril2.display();
  //ellipse(292, 400, 10, 10);
  //ellipse(308, 400, 10, 10);

  noFill();
  stroke(0, 0, 0);

  //head
  strokeWeight(4);

  rect(200, 252, 200, 210, 30, 30, 50, 50);
  rect(200, 248, 200, 214, 35, 35, 50, 50);
  rect(200, 244, 200, 218, 30, 30, 50, 50);
  rect(200, 240, 200, 222, 30, 30, 50, 50);
  rect(200, 236, 200, 226, 35, 35, 50, 50);

  //glasses
  stroke(0);
  strokeWeight(8);
  line(220, 350, 200, 330);
  line(380, 350, 400, 330);

  line(290, 350, 310, 350);
  //fill(255);
  rect(220, 320, 70, 68, 20, 20, 30, 20);
  //fill(255);
  rect(310, 320, 70, 68, 20, 20, 20, 30);

  //mouth
  noFill();
  strokeWeight(4);
  line(270, 422, 330, 422);
  //curve(300, 450, 270, 422, 330, 422, 300, 450);
  curve(500, 300, 270, 422, 330, 422, 100, 300);

  line(300, 422, 300, 435);
  line(280, 422, 280, 432);
  line(320, 422, 320, 432);

  //ears
  strokeWeight(4);
  curve(300, 400, 200, 330, 200, 380, 320, 400);
  curve(300, 400, 400, 330, 400, 380, 280, 400);

  fill(0);

	//moving star

  var m = map((290-starX), 70, 0, 20, -2);

  push();
  //starting point
  translate(starX, height*0.534);
  rotate(frameCount /50.0);
  star(0, 0, 6, m, 4);
  pop();

  starX = starX + speed;

  if (starX > 285)
  	starX = 220;

  if(Alpha > 255)
    Alpha = 30;
}

//stars
function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;

  //fill(random(20));
  fill(255);
  beginShape();
  noStroke();
  //fill(0,0,100,sin(millisecond/1000)*80);
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

//moving balls
function Jitter(nX, nY)
{
  //this.x = random(width);
  //this.y = random(height);
  this.diameter = 10;
  this.speed = 1;
  
  var directionX = mouseX - 300;
  var directionY = mouseY - 300;
  
  this.move = function()
  {
    nX += random(-this.speed, this.speed);
    nY += random(-this.speed, this.speed);

    nX = directionX/40 + nX;
  	nY = directionY/40 + nY;
  }

  this.display = function()
  {
    ellipse(nX, nY, this.diameter, this.diameter);
  }
}
