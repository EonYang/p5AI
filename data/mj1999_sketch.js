let data;

function preload() {
        data = loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/materials/gemstones.json');
}

function setup() {
        createCanvas(400, 400);
        background(0);
        // console.log(data);
        createP(data.description);
        createA(data.source, 'source');
        for (let i = 0; i < data.gemstones.length; i++) {
                fill(random(225),0,random(255))
                textAlign(CENTER);
                text(data.gemstones[i], random(width), random(height));
        }
        console.log(data);

}

function draw() {
        //background(220);
}
var cnv;

var wid = 500;
var hei = 300;

var NB_FRAMES = 500;

var frame_count = 0;

function activation(t) {
    return ((1-cos(2*PI*t))/2)*1;
}

function object(id) {
    
    this.id = id;
    
    this.draw = function() {
        var t = ((frame_count)%NB_FRAMES)/NB_FRAMES;
        
        var x0 = lerp(0,wid,this.id/NB);
        
        theta = PI/2;
        
        var xx = x0;
        var yy = 10;
        
        var Nt = 75;
        
        var step = hei/Nt;
        
        var turn = lerp(0,0.4,activation((this.id/NB+0*t)%1));
        
        stroke(255);
        strokeWeight(1);
        noFill();
        beginShape();
        
        vertex(xx,yy);

        
        for(var i=0;i<=Nt;i++){
            theta += turn*sin(100*noise(1000)+2*PI*(15*noise(0.2*this.id/NB,0.02*i)+t));
            //theta += turn*sin(100*noise(1000)+2*PI*(20*noise(0.02*i)+t + 0.1*sin(2*PI*this.id/NB)));
            xx += step*cos(theta);
            yy += step*sin(theta);
            
            var xx2 = lerp(xx,x0,(i/Nt)*(i/Nt)*(i/Nt));
            var yy2 = lerp(yy,lerp(0,hei-0,i/Nt),max((i/Nt),1-sqrt(i/Nt)));
            
            vertex(xx2,yy2);
            
            
        }
        endShape();
        
    }
}

var Objects = [];
var NB = 100;

function setup() {
  curSeed = 11;
    noiseSeed(curSeed);
    randomSeed(1);
    
    cnv = createCanvas(wid,hei);
    //cnv.parent("canvas");
    
    background(0);
    
    for(var i = 0;i<NB;i++) {
        Objects[i] = new object(i);
    }
}

function mousePressed(){
    curSeed = floor(random()*10000);
    noiseSeed(curSeed);
    console.log(curSeed);
}

function draw() {
    background(0);
    
    var t = ((frame_count)%NB_FRAMES)/NB_FRAMES;
    
    for(var i=0;i<NB;i++) Objects[i].draw();
  
  noStroke();
  fill(255);
  	text("seed : " + curSeed, 100, 10);

    frame_count++;
    if (frame_count<=200 && frame_count>80) {
        //saveCanvas('s5_'+frame_count+'.png');
    }
}/*
Mimi Yin NYU-ITP
Drawing skeleton joints and bones.
 */

// Declare kinectron
var kinectron = null;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.17.68.134");

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
  if (keyIsPressed){
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
else{

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
}
}/*
Mimi Yin NYU-ITP
Drawing skeleton joints and bones.
 */

// Declare kinectron
var kinectron = null;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.17.68.134");

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
}/*
Mimi Yin NYU-ITP
Drawing skeleton joints with selected joint.
Use LEFT/RIGHT arrow keys to select joint.
 */

// Declare kinectron
let kinectron = null;
// Keep track of selected joint
let j;
// Directory of joints
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

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.17.68.134");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  // Start by tracking left hand
  j = kinectron.HANDLEFT;

  // Draw black background
  background(0);
}

function draw() {
}

function bodyTracked(body) {
  background(0);

  // Draw all the joints
  kinectron.getJoints(drawJoint);

  // Get the selected joint
  let joint = body.joints[j];
  let pos = scaleJoint(joint);

  noStroke();
  fill(255);
  // Draw a bigger, red ellipse for the selected joint
  ellipse(pos.x, pos.y, 50, 50);

  // Print which joint is selected
  stroke(255);
  textSize(18);
  text("RT/LFT to change joints. " + j + ": " + joints[j], 10, 20);

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
  switch (keyCode) {
    case LEFT_ARROW:
    	j--;
    case RIGHT_ARROW:
    	j++;
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
  }
}/*
Mimi Yin NYU-ITP
Polar Roses
*/

// Store current and previous x,y coordinates
let x, y;
let px, py;

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

function setup() {
  createCanvas(windowWidth, windowHeight);

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
  background(0, 5);
  
  angle += aspeed;

  //Move
  x = cos(angle)*range + centerX;
  y = sin(angle*yfreq)*range*yscl + centerY;
  
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  ///////////////////////POLAR ROSES///////////////////////
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////

  // // Spiral
  // range += 0.1;
  // x = cos(angle)*range + centerX;
  // y = sin(angle*yfreq)*range*yscl + centerY;
  // 
  // // Straight line
  // x = cos(angle)*range*cos(angle) + centerX;
  // y = sin(angle*yfreq)*range*yscl*sin(angle) + centerY;
  //
  // // Circular squares
  // x = cos(sin(angle)*angle)*range + centerX;
  // y = sin(cos(angle)*angle*yfreq)*range*yscl + centerY;
  //
  // // Just a circle, sorta
  // x = cos(cos(angle)*angle)*range + centerX;
  // y = sin(cos(angle)*angle*yfreq)*range*yscl + centerY;

  // // Inny - Outy
  x = cos(sin(angle)*angle)*range*sin(angle)+ centerX;
  y = sin(cos(angle)*angle*yfreq)*range*yscl*cos(angle)+ centerY;
 // if(frameCount%60 == 0)
   
  // Bigger sweeps with tan
  // x = cos(sin(angle)*gangle)*range*tan(angle) + centerX;
  // y = sin(cos(angle)*angle*yfreq)*range*yscl*tan(angle) + centerY;

  // Traversing by tan()ing centerX
  // Alternating horizontal curves with straight darts
  // x = cos(angle)*range*sin(angle) + centerX*tan(angle);
  // y = sin(cos(angle)*angle*yfreq)*range*yscl*cos(angle) + centerY;
	
  
  
	// Draw line
	stroke(255);
  strokeWeight(3);
  if(px) line(px, py, x, y);
	
  // Remember x,y coordinates for next frame
  px = x;
  py = y;
  
}


/*
Mimi Yin NYU-ITP
Circular Pathways with Controls
*/

// Store current and previous x,y coordinates
let x, y;
let px, py;

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

function setup() {
  createCanvas(windowWidth, windowHeight);

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

  //Move
  x = cos(angle)*range + centerX;
  y = sin(angle*yfreq)*range*yscl + centerY;
	
	// Draw line
	stroke(255, 64);
  strokeWeight(3);
  if(px) line(px, py, x, y);
	
  // Remember x,y coordinates for next frame
  px = x;
  py = y;
  
  // Controls
  // Speed of travel around circle
   aspeed = pow(mouseX/(width/2), 2);
  // Size of circle
   range = dist(centerX, centerY, mouseX, mouseY);
  // Verticality of circle
  // yscl = 4*mouseY/height;
  // Ups and downs versus lefts and rights
  yfreq = 4*mouseY/height;

}/* Mimi Yin, NYU-ITP
Random pathways with controls.

- mouseX controls range (speed) of motion
- mouseY controls interval (how often there is a random change in direction)

When mouse is pressed:
- mouse position relative to center controls direction and extent of drift
When key is pressed:
- mouseY controls yscl (verticality)

*/

// Store x,y coordinates of current location
let x, y;
// Store x,y coordinates of previous location
let px, py;
// Store current xspeed and yspeed
let xspeed, yspeed;

// # of frames to wait before changing direction.
let interval;
// Range of random, relative range of vertical random
let range, yscl;
// How much to shift right/left, up/down
let xshift, yshift;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = (height / 2) + 120;
  px = x;
  py = y;

  xspeed = 0;
  yspeed = 0;

  interval = 1;
  range = 4;
  yscl = 1;
  xshift = 1;
  yshift = 1;

  background(0);
  noStroke();
}

function draw() {

  // Draw very transparent background every frame
  // to create fade-out effect
  background(0, 10);

  //Change direction
  if (frameCount % interval == 0) {
    xspeed = random(-range, range * xshift); //shift median to go right/left
    yspeed = random(-range * yscl, range * yscl * yshift); // shift median to go up/down
  }

  // Move
  x += xspeed;
  y += yspeed;

  // Draw a line from the previous loc to this loc
  stroke(255);
  line(px, py, x, y);

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

  // Draw a landmark in the center
  fill(255);
  noStroke();
  rect(width / 2, height / 2, 10, 10);

  // Controls
  if (keyIsPressed) {
    // mouseY controls yscl (verticality)
    yscl = mouseY / height;
  }
  // Mouse position relative to center sets directional drift
  else if (mouseIsPressed) {
    // Horizontal shift
    xshift = mouseX / (width / 2);
    // Vertical shift
    yshift = mouseY / (height / 2);
  }
  else {
    // mouseX controls range (speed)
    range = 100 * mouseX / width;
    // mouseY controls interval (frequency of change)
    interval = int(120*mouseY/height);
  }
}let img;
let img1;
let img2;
let song;
let sliderRate;
let sliderPan;
let button;
let singing = true;
let circle = [];
let analyzer;

function preload() {
        song = loadSound("banana.mp3");

    img = createImg("minion.jpg")
    img1= createImg("minion2.jpg")
   img2= createImg("minion3.jpg")
   img3= createImg("banana.png")


}

function setup() {
  analyzer = new p5.Amplitude();

  // Patch the input to an volume analyzer
  analyzer.setInput(song);
        createCanvas(940, 492);
        background(0);
        img.hide();
        img1.hide();
  img3.hide();
  img2.hide();
        // img2.hide();
        //  mic = new p5.AudioIn();
        // mic.start();
        sliderRate = createSlider(0, 2, 1, 0.01);
        sliderPan = createSlider(-1, 1, 0, 0.01);
  button=createButton("MoreBanana");
  button.mousePressed(togglePlaying);
  song.loop();
  
}

function togglePlaying(){
  if(!song.isPlaying()){
 song.play();
    button.html("Banana")
    singing = true;
}else{
  
  song.pause();
   button.html("MoreBanana")
  singing = false;
}
}

function loaded() {


}

function draw() {
  var rms = analyzer.getLevel();
        song.rate(sliderRate.value());
        song.pan(sliderPan.value());
        drawMini();
  push();
  for (var a = 0; a < circle.length; a++) {


    circle[a].show();
  }
  
  
}
  
  function mousePressed() {

  let c = new Circle(mouseX, mouseY);
  circle.push(c);
}



  	
  


function drawMini() {
  // var posX = random();
  if (mouseIsPressed) {
  
  }
  
    var rms = analyzer.getLevel();
  	
        image(img, 0, 0);
  	
  	if(singing){
          
        noStroke();
        fill(63, 8, 8);
        image(img1, 100, height - 300, 200, 200);
           ellipse(200, 310, 30, vol * 100);
        image(img2, 700, height - 300, 200, 200);
           ellipse(798, 305, 30, vol * 100);
        }
  
        noStroke();
        fill(63, 8, 8);
        ellipse(475, 250, 100, vol * 200);
}

class Circle{
  
  constructor(x,y){
  this.x = x;
  this.y = y;
  }  
 show(){
  fill(255);
  image(img3,this.x, this.y, 100, 100);
  
 }
}

let img;
let img1;
let img2;
let song;
let sliderRate;
let sliderPan;
let button;
let singing = true;
let circle = [];

function preload() {
        song = loadSound("banana.mp3");

    img = createImg("minion.jpg")
    img1= createImg("minion2.jpg")
   img2= createImg("minion3.jpg")
   img3= createImg("banana.png")


}

function setup() {
        createCanvas(940, 492);
        background(0);
        img.hide();
        img1.hide();
  img3.hide();
  img2.hide();
        // img2.hide();
         mic = new p5.AudioIn();
        mic.start();
        sliderRate = createSlider(0, 2, 1, 0.01);
        sliderPan = createSlider(-1, 1, 0, 0.01);
  button=createButton("MoreBanana");
  button.mousePressed(togglePlaying);
  song.loop();
  
}

function togglePlaying(){
  if(!song.isPlaying()){
 song.play();
    button.html("Banana")
    singing = true;
}else{
  
  song.pause();
   button.html("MoreBanana")
  singing = false;
}
}

function loaded() {


}

function draw() {
        song.rate(sliderRate.value());
        song.pan(sliderPan.value());
        drawMini();
  push();
  for (var a = 0; a < circle.length; a++) {


    circle[a].show();
  }
  
  
}
  
  function mousePressed() {

  let c = new Circle(mouseX, mouseY);
  circle.push(c);
}



  	
  


function drawMini() {
  // var posX = random();
  if (mouseIsPressed) {
  
  }
  
        var vol = mic.getLevel();
  	
        image(img, 0, 0);
  	
  	if(singing){
          
        noStroke();
        fill(63, 8, 8);
        image(img1, 100, height - 300, 200, 200);
           ellipse(200, 310, 30, vol * 100);
        image(img2, 700, height - 300, 200, 200);
           ellipse(798, 305, 30, vol * 100);
        }
  
        noStroke();
        fill(63, 8, 8);
        ellipse(475, 250, 100, vol * 200);
}

class Circle{
  
  constructor(x,y){
  this.x = x;
  this.y = y;
  }  
 show(){
  fill(255);
  image(img3,this.x, this.y, 100, 100);
  
 }
}

let img;
let img1;
let img2;
let song;
let sliderRate;
let sliderPan;
let button;
let singing = true;
let circle = [];

function preload() {
        song = loadSound("banana.mp3");

    img = createImg("minion.jpg")
    img1= createImg("minion2.jpg")
   img2= createImg("minion3.jpg")
   img3= createImg("banana.png")


}

function setup() {
        createCanvas(940, 492);
        background(0);
        img.hide();
        img1.hide();
  img3.hide();
  img2.hide();
        // img2.hide();
         mic = new p5.AudioIn();
        mic.start();
        sliderRate = createSlider(0, 2, 1, 0.01);
        sliderPan = createSlider(-1, 1, 0, 0.01);
  button=createButton("MoreBanana");
  button.mousePressed(togglePlaying);
  song.loop();
  
}

function togglePlaying(){
  if(!song.isPlaying()){
 song.play();
    button.html("Banana")
    singing = true;
}else{
  
  song.pause();
   button.html("MoreBanana")
  singing = false;
}
}

function loaded() {


}

function draw() {
        song.rate(sliderRate.value());
        song.pan(sliderPan.value());
        drawMini();
  push();
  for (var a = 0; a < circle.length; a++) {


    circle[a].show();
  }
  
  
}
  
  function mousePressed() {

  let c = new Circle(mouseX, mouseY);
  circle.push(c);
}



  	
  


function drawMini() {
  // var posX = random();
  if (mouseIsPressed) {
  
  }
  
        var vol = mic.getLevel();
  	
        image(img, 0, 0);
  	
  	if(singing){
          
        noStroke();
        fill(63, 8, 8);
        image(img1, 100, height - 300, 200, 200);
           ellipse(200, 310, 30, vol * 100);
        image(img2, 700, height - 300, 200, 200);
           ellipse(798, 305, 30, vol * 100);
        }
  
        noStroke();
        fill(63, 8, 8);
        ellipse(475, 250, 100, vol * 200);
}

class Circle{
  
  constructor(x,y){
  this.x = x;
  this.y = y;
  }  
 show(){
  fill(255);
  image(img3,this.x, this.y, 100, 100);
  
 }
}

var circle = [];

function preload() {
    img = createImg("banana.png")
}


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
  image(img,this.x, this.y, 100, 100);
  
 }
}var img1;


function preload() {
img1 = loadImage('banana.png');}

function setup() { 
  createCanvas(400, 400);

} 

  

function draw() { 
  background(220);
   var posX = random();
   if (mouseIsPressed)

    image(img1, mouseX, mouseY, 100, 60);
}

function setup(){
  createCanvas(100, 100, WEBGL);
  ortho(-width/2, width/2, height/2, -height/2, 0, 500);
}
function draw(){
 background(200);
 orbitControl();
 for(var i = -1; i < 2; i++){
    for(var j = -2; j < 3; j++){
      push();
      translate(i*160, 0, j*160);
      box(40, 40, 40);
      pop();
    }
  }
}function setup(){
  createCanvas(500, 500, WEBGL);
  var fov = 60 / 180 * PI;
  var cameraZ = (height/2.0) / tan(fov/2.0);
  perspective(60 / 180 * PI, width/height, cameraZ * 0.1, cameraZ * 10);
}
function draw(){
 background(200);
 orbitControl();
 for(var i = -1; i < 2; i++){
    for(var j = -2; j < 3; j++){
      push();
      translate(i*160, 0, j*160);
      box(40, 40, 40);
      pop();
    }
  }
}var img1 ;


function preload() {
img1 = loadImage('banana.png');}

function setup() { 
  createCanvas(400, 400);

} 

  

function draw() { 
  background(220);
   var posX = random();
}

function mousePressed(){
 //for (var i = 0; i<img1.length; i++){
      image(img1, mouseX, mouseY, 100, 60);
   return false;
//}
}

let img;
let img1;
let img2;
let song;
let sliderRate;
let sliderPan;
let button;
let singing = true;

function preload() {
        song = loadSound("banana.mp3");

        img = createImg("minion.jpg")
        img1 = createImg("minion2.jpg")
        img2 = createImg("minion3.jpg")



}

function setup() {
        createCanvas(940, 492);
        background(0);
        img.hide();
        img1.hide();
        img2.hide();
        // img2.hide();
        mic = new p5.AudioIn();
        mic.start();
        sliderRate = createSlider(0, 2, 1, 0.01);
        sliderPan = createSlider(-1, 1, 0, 0.01);
        button = createButton("MoreBanana");
        button.mousePressed(togglePlaying);
        song.loop();
var fov = 60 / 180 * PI;
  var cameraZ = (height/2.0) / tan(fov/2.0);
  perspective(60 / 180 * PI, width/height, cameraZ * 0.1, cameraZ * 10
}
            

function togglePlaying() {
        if (!song.isPlaying()) {
                song.play();
                button.html("Banana")
                singing = true;
        } else {

                song.pause();
                button.html("MoreBanana")
                singing = false;
        }
}

function loaded() {


}

function draw() {
        song.rate(sliderRate.value());
        song.pan(sliderPan.value());
        drawMini();
  orbitControl();
 for(var i = -1; i < 2; i++){
    for(var j = -2; j < 3; j++){
      push();
      translate(i*160, 0, j*160);
      box(40, 40, 40);
      pop();
    




}

function drawMini() {
        // var posX = random();
        if (mouseIsPressed) {

        }

        var vol = mic.getLevel();

        image(img, 0, 0);

        if (singing) {

                noStroke();
                fill(63, 8, 8);
                image(img1, 100, height - 300, 200, 200);
                ellipse(200, 310, 30, vol * 100);
                image(img2, 700, height - 300, 200, 200);
                ellipse(798, 305, 30, vol * 100);
        }

        noStroke();
        fill(63, 8, 8);
        ellipse(475, 250, 100, vol * 200);
}

function mousePressed() {
        img3 = createImage("banana.png");

        image(img3, mouseX, mouseY);
}let img;
let img1;
let img2;
let song;
let sliderRate;
let sliderPan;
let button;
let singing = true;
let circle = [];

function preload() {
        song = loadSound("banana.mp3");

    img = createImg("minion.jpg")
    img1= createImg("minion2.jpg")
   img2= createImg("minion3.jpg")
   img3= createImg("banana.png")


}

function setup() {
        createCanvas(940, 492);
        background(0);
        img.hide();
        img1.hide();
  img3.hide();
  img2.hide();
        // img2.hide();
         mic = new p5.AudioIn();
        mic.start();
        sliderRate = createSlider(0, 2, 1, 0.01);
        sliderPan = createSlider(-1, 1, 0, 0.01);
  button=createButton("MoreBanana");
  button.mousePressed(togglePlaying);
  song.loop();
  
}

function togglePlaying(){
  if(!song.isPlaying()){
 song.play();
    button.html("Banana")
    singing = true;
}else{
  
  song.pause();
   button.html("MoreBanana")
  singing = false;
}
}

function loaded() {


}

function draw() {
        song.rate(sliderRate.value());
        song.pan(sliderPan.value());
        drawMini();
  push();
  for (var a = 0; a < circle.length; a++) {


    circle[a].show();
  }
  
  
}
  
  function mousePressed() {

  let c = new Circle(mouseX, mouseY);
  circle.push(c);
}



  	
  


function drawMini() {
  // var posX = random();
  if (mouseIsPressed) {
  
  }
  
        var vol = mic.getLevel();
  	
        image(img, 0, 0);
  	
  	if(singing){
          
        noStroke();
        fill(63, 8, 8);
        image(img1, 100, height - 300, 200, 200);
           ellipse(200, 310, 30, vol * 100);
        image(img2, 700, height - 300, 200, 200);
           ellipse(798, 305, 30, vol * 100);
        }
  
        noStroke();
        fill(63, 8, 8);
        ellipse(475, 250, 100, vol * 200);
}

class Circle{
  
  constructor(x,y){
  this.x = x;
  this.y = y;
  }  
 show(){
  fill(255);
  image(img3,this.x, this.y, 100, 100);
  
 }
}

var portName = '/dev/cu.usbmodem1411';
var serial;
var rotateangle = 0;
var rotateangle1 = 0;



function setup() {
        createCanvas(800, 600);
        serial = new p5.SerialPort();
        serial.open(portName);
        serial.on('data', gotData);
}

function draw() {
        background(139, 201, 224);
  //move cloud
  
  
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


        //cheek
        fill(230, 144, 143);
        ellipse(280, 280, 35, 15);
        ellipse(490, 280, 35, 15);

        //mouth
       




        //arms

        noFill();
        stroke(255);
        strokeWeight(5);

        if (rotateangle1 > 0) {
                curve(500, 310, 150, 300, 100, 200, 220, 350);
                ellipse(110, 186, 40, 30);

                curve(100, 310, 600, 300, 680, 400, 520, 350);
                ellipse(670, 416, 40, 30);
          //eyes
        stroke(0);
        strokeWeight(8);
        line(310, 250, 350, 250)
        line(430, 250, 470, 250)
          //leg
        pop();
        push();
        noFill();
        stroke(255);
        strokeWeight(5);
        line(350, 380, 350, 520);
        line(450, 380, 450, 520)
      //shoe

        pop();
        push();
        noFill();
        stroke(255);
        strokeWeight(5);
        ellipse(330, 528, 50, 30)
        ellipse(474, 528, 50, 30)
        pop();
        //mouth
        line(380, 300, 410, 300)
        noStroke();
        fill(0);
        ellipse(340, 260, 20, 20);
        ellipse(460, 260, 20, 20);
          pop();
        } else {
                curve(500, 300, 150, 300, 50, 400, 220, 550);
                ellipse(70, 400, 40, 30);
                curve(100, 310, 600, 300, 680, 190, 520, 350);
                ellipse(665, 180, 40, 30);
          
        noStroke();
        fill(0);
        ellipse(310, 260, 22, 22);
        ellipse(460, 260, 22, 22);
        pop();
        push();
        noFill();
        strokeWeight(4);
        arc(375, 270, 20, 20, 0, PI, OPEN);
        arc(395, 270, 20, 20, 0, PI, OPEN);
           //leg

        push();
        noFill();
        stroke(255);
        strokeWeight(5);
        curve(500, 510, 350, 380, 350, 520, 520, 550);
        curve(400, 910, 450, 380, 450, 520, 220, 550);
        ellipse(330, 528, 50, 30)
        ellipse(470, 528, 50, 30)

        pop();
       
   





        }





//                 //glasses
//                 stroke(0);
//                 strokeWeight(8);
//                 line(220, 200, 300, 250);
//                 line(580, 200, 450, 250);

//                 line(290, 250, 480, 250);
//                 fill(0)
//                 rect(280, 230, 70, 68, 20, 20, 30, 20);

//                 rect(430, 230, 70, 68, 20, 20, 20, 30);


}

function gotData() {
        var inData = serial.readLine();

        var values = inData.split(' ');

        if (inData.length > 0) {


                // rotateangle = int(values[0]);

                rotateangle1 = int(values[0]);
                // print(values);
                console.log(rotateangle1);
        }
}var portName = '/dev/cu.usbmodem1411';
var serial;
var rotateangle = 0;
var rotateangle1 = 0;



function setup() {
        createCanvas(800, 600);
        serial = new p5.SerialPort();
        serial.open(portName);
        serial.on('data', gotData);
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

        if (rotateangle1 > 80) {
                curve(500, 310, 150, 300, 100, 200, 220, 350);
                ellipse(110, 186, 40, 30);

                curve(100, 310, 600, 300, 680, 400, 520, 350);
                ellipse(670, 416, 40, 30);
        } else {
                curve(500, 300, 150, 300, 50, 400, 220, 550);
                ellipse(70, 400, 40, 30);
                curve(100, 310, 600, 300, 680, 190, 520, 350);
                ellipse(665, 180, 40, 30);
        }



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

function gotData() {
        var inData = serial.readLine();

        var values = inData.split(' ');

        if (inData.length > 0) {


                // rotateangle = int(values[0]);

                rotateangle1 = int(values[1]);
                // print(values);
                console.log(rotateangle1);
        }
}var words = ["meicheng","katrina","love","coding"];
var index = 0;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(0);
  fill(255);
  textSize(32);
  text (words[index],200,200);
  
}

function mousePressed (){
  
  index = index+1;

  if (index== words.length);{
  index=0;
  }
  

}let img;
let song;
let sliderRate;
let sliderPan;
let button;
let amp;
let mic;

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
	drawMini();
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


        song.rate(sliderRate.value());
        song.pan(sliderPan.value());


        //           var vol=amp.getLevel();
        //           var diam = map(vol,0,3,10,200);
        //           fill(0);
        //           ellipse(width/2,height/2,diam*20,diam*20);

}

function mousePressed() {
        //loop();
  
  
  translate(mouseX,mouseY);
  	
  	drawMini();
  
}

function drawMini() {
        var vol = mic.getLevel();

        image(img, 750, 400);
        noStroke();
        fill(63, 8, 8);
        ellipse(935, 630, 100, vol * 200);

}let img;
let song;
let sliderRate;
let sliderPan;
let button;

function preload() {
        song = loadSound("banana.mp3");

        img = createImg("minion.jpg")


}

function setup() {
        createCanvas(940, 492);
        background(0);
       

        img.hide();
        image(img, 0, 0);
        sliderRate = createSlider(0, 2, 1, 0.01);
        sliderPan = createSlider(-1, 1, 0, 0.01);
  button=createButton("Banana");
  button.mousePressed(togglePlaying);
}

function togglePlaying(){
  if(!song.isPlaying()){
 song.play();
    button.html("NoBanana")
}else{
  
  song.pause();
   button.html("Banana")
}
}
function loaded() {


}

function draw() {
        song.rate(sliderRate.value());
        song.pan(sliderPan.value());

}

function mousePressed() {
        loop();
}let img;
let song;

function preload() {
        song = loadSound("banana.mp3");

        img = createImg("minion.jpg")

}

function setup() {
        createCanvas(940, 492);
        background(0);
        song.play();
        img.hide();
        image(img, 0, 0);

}function setup() {
        createCanvas(800, 600);
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
        curve(500, 310, 150, 300, 100, 200, 220, 350);
        curve(100, 310, 600, 300, 680, 400, 520, 350);
        ellipse(110, 186, 40, 30);
        ellipse(670, 416, 40, 30);

        //leg
        pop();
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


}// Daniel Shiffman
// Code for: https://youtu.be/q2IDNkUws-A

var mic;

function setup() {
  createCanvas(200, 200);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(0);
  var vol = mic.getLevel(); 
  stroke(255);
  fill(175);
  ellipse(100, 100, 20, 1 + vol * 500);
}
var mic;




function setup() {
        createCanvas(800, 600);
        mic = new p5.AudioIn();
        mic.start();
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

        //face

        noStroke();
        fill(0);
        ellipse(310, 260, 22, 22);
        ellipse(460, 260, 22, 22);


        fill(230, 144, 143);
        ellipse(280, 280, 35, 15);
        ellipse(490, 280, 35, 15);

        pop();
        push();
        noFill();
        strokeWeight(4);


        //         arc(375, 270, 20, 20, 0, PI, OPEN);
        //         arc(395, 270, 20, 20, 0, PI, OPEN);
        //         translate(400, 300);
        //         rotate(5);
        // arc(-190, -20, 200, 20, 0, PI, PI + QUARTER_PI);
        pop();


        //leg
        pop();
        push();
        noFill();

        stroke(255);
        strokeWeight(5);
        // arc(375, 270, 20, 20, 0, PI, OPEN);
        // arc(395, 270, 20, 20, 0, PI, OPEN);
        translate(400, 300);
        rotate(5);
        arc(-180, -20, 180, 20, 0, PI, PI + QUARTER_PI);
        arc(-165, 70, 180, 50, 0, PI, PI + QUARTER_PI);
        rotate(5);
        arc(-280, 80, 150, 50, 0, PI, PI + QUARTER_PI);
        rotate(-305);
        arc(-280, 80, 150, 50, 0, PI, PI + QUARTER_PI);
  
     var vol = mic.getLevel();
  stroke(255);
        fill(175);
        ellipse(100, 100, 20, 1 + vol * 500);

        //shoes
        pop();
        push();
        noFill();

        stroke(255);
        strokeWeight(5);
        ellipse(280, 560, 50, 30)
        ellipse(373, 570, 50, 30)



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


}function setup() {
        createCanvas(800, 600);
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

        //face

        noStroke();
        fill(0);
        ellipse(310, 260, 22, 22);
        ellipse(460, 260, 22, 22);
   
  
        fill(230, 144, 143);
        ellipse(280, 280, 35, 15);
        ellipse(490, 280, 35, 15);

        pop();
        push();
        noFill();
        strokeWeight(4);

        arc(375, 270, 20, 20, 0, PI, OPEN);
        arc(395, 270, 20, 20, 0, PI, OPEN);
        translate(400, 300);
        rotate(5);
        // arc(-190, -20, 200, 20, 0, PI, PI + QUARTER_PI);
        pop();


        //leg
        pop();
        push();
        noFill();

        stroke(255);
        strokeWeight(5);
        // arc(375, 270, 20, 20, 0, PI, OPEN);
        // arc(395, 270, 20, 20, 0, PI, OPEN);
        translate(400, 300);
        rotate(5);
        arc(-180, -20, 180, 20, 0, PI, PI + QUARTER_PI);
        arc(-165, 70, 180, 50, 0, PI, PI + QUARTER_PI);
        rotate(5);
        arc(-280, 80, 150, 50, 0, PI, PI + QUARTER_PI);
        rotate(-305);
        arc(-280, 80, 150, 50, 0, PI, PI + QUARTER_PI);
  

       //shoes
        pop();
        push();
        noFill();

        stroke(255);
        strokeWeight(5);
        ellipse(280,560,50, 30)
        ellipse(373,570,50, 30)



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
function setup() {
        createCanvas(800, 600);
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
        stroke(0);
        strokeWeight(8);
        line(310, 250, 350, 250)
        line(430, 250, 470, 250)
        //mouth
        line(380, 300, 410, 300)
        noStroke();
        fill(0);
        ellipse(340, 260, 20, 20);
        ellipse(460, 260, 20, 20);

        //cheek
        fill(230, 144, 143);
        ellipse(280, 280, 35, 15);
        ellipse(490, 280, 35, 15);



        //leg
        pop();
        push();
        noFill();
        stroke(255);
        strokeWeight(5);
        line(350, 380, 350, 520);
        line(450, 380, 450, 520)

    
        //arm
        noFill();
        curve(500, 310, 150, 300, 100, 400, 220, 350);
        curve(100, 310, 600, 300, 680, 400, 520, 350);
        ellipse(110,416,40,30);
        ellipse(670,416,40,30);

        //shoe

        pop();
        push();
        noFill();
        stroke(255);
        strokeWeight(5);
        ellipse(330, 528, 50, 30)
        ellipse(474, 528, 50, 30)
        pop();



}function setup() {
        createCanvas(800, 600);
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
        //face

        noStroke();
        fill(0);
        ellipse(310, 260, 22, 22);
        ellipse(460, 260, 22, 22);
        fill(230, 144, 143);
        ellipse(280, 280, 35, 15);
        ellipse(490, 280, 35, 15);

        pop();
        push();
        noFill();

        stroke(255);
        strokeWeight(5);
        arc(375, 270, 20, 20, 0, PI, OPEN);
        arc(395, 270, 20, 20, 0, PI, OPEN);
        translate(400, 300);
        rotate(5);
        arc(-180, -20, 150, 50, 0, PI, PI + QUARTER_PI);
        arc(-165, 70, 150, 50, 0, PI, PI + QUARTER_PI);
        rotate(5);
        arc(-280, 80, 150, 50, 0, PI, PI + QUARTER_PI);
        pop();

}function setup() { 
  createCanvas(800, 600);
} 

function draw() { 
  background(139,201,224);
  //cloud
  noStroke();
  fill(255);
  ellipse(400,200,200,200);
    ellipse(280,250,160,160);
  ellipse(520,240,150,150);
    ellipse(460,320,210,170);
      ellipse(300,330,150,150);
  ellipse(190,290,120,120);
  
  ellipse(550,300,120,15\0);
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
  
  //floor : function 5.3 truns in to 5 
  for(let i=0;i<50;i++){
    let x=floor(random(width));
    let y=floor(random(height));
    let col = img.get(x, y);
    
    // col[3]: r,g,b,transparent , number 3 is transparent 
    col[3] = 100;
  //console.log(col);
  fill(col);
  noStroke();
  ellipse(x, y, 30);

  // x += random(-50, 50);
  // y += random(-50, 50);
  // x = constrain(x, 0, width);
  // y = constrain(y, 0, height);
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

  let col = img.get(x, y);
  col[3] = 100;
  //console.log(col);
  fill(col);
  noStroke();
  ellipse(x, y, 60);

  x += random(-50, 50);
  y += random(-50, 50);
  x = constrain(x, 0, width);
  y = constrain(y, 0, height);



}

function setup() { 
  createCanvas(650, 400);
  background(0);
img=createCapture(VIDEO);
  
} 

function draw(){

// image(img,0,0)
  
  let col= img.get(mouseX,mouseY);
  fill(col);
  noStroke();
  ellipse(mouseX,mouseY,20);
      }let img;
function preload(){

img=loadImg('dog2.jpg)}
function setup() { 
  createCanvas(400, 400);
  background(0);
  // img.hide();
  
} 

function draw(){

// image(img,0,0)
  
  let col= img.get(mouseX,mouseY);
  fill(col);
  noStroke();
  ellipse(mouseX,mouseY,60);
      }let img;
function preload(){

img=createImg('http://franklincountydogs.com/adopt/assets/images/adoptable-name.jpg')}
function setup() { 
  createCanvas(400, 400);
  background(0);
  img.hide();
  image(img,0,0);
} 

var data;
var img;
var ww = 800;
var hh = 800;
var sec = 0;
//var slider;

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

  var millisecond = millis();

  for (var i = 0; i < data.getRowCount(); i++) {

    var time = data.getString(i, 15).split('-');
    fill(255);

    sec = millisecond / 1000 + 1880;

    if (time[0] == int(sec).toString()) {

      var tempLat = float(data.getString(i, 13));
      var tempLng = float(data.getString(i, 14));
      var pos = myMap.latLngToPixel(tempLat, tempLng);
      noStroke();
      ellipse(pos.x, pos.y, 2);
    }
  }

  //console.log(data);
}
let url1 = 'https://api.mapbox.com/styles/v1/mapbox/light-v9/static/0,0,1,0,0/1024x512?access_token='
/////////////////////////////////////////////////////////////////lat,long,zoom,angle,angle//////////
let apiKey = 'pk.eyJ1IjoiZWZmeWZhbiIsImEiOiJjajkxdnNnZGIzZG1zMndtYmtiNTJzeXR6In0.I3-_XtcuL7WiF7eJZXIENw'
let mapImg;
let emissions;
//https://raw.githubusercontent.com/cvalenzuela/Mappa/master/tutorials/pollutionmap/data/co2_emissions.csv

// shanghai: 31.2304 N, 121.4737 E
// vancouver: 49.2827° N, 123.1207° W
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

// draw red circles indicate emissions amount
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

// draw emission animation
    if (area > emiinp){
      for (let j = 0; j < 1; j++) {
      let p = new Particle(x, y, d/5);
      particles.push(p);
      }
      for (let j = particles.length - 1; j >= 0; j--) {
      particles[j].update();
      particles[j].show();
      if (particles[j].finished()) {
      // remove this particle
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
    //stroke(255);
    fill(100, this.alpha);
    ellipse(this.x, this.y, this.dia);
  }

}
var mapimg;

//center latitude and center longtitude
var clat = 0;
var clon = 0;

//Beijing latitude and longtitude 39.9042° N, 116.4074° E
//position of Beijing

var lat = 39.9042;
var lon = 116.4074;

var zoom = 1;
var earthquakes;


//load image from map box

function preload() {
        mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/-0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoia2F0amlhIiwiYSI6ImNqOTZkMjl0dTAzaDUycm55OGkxMGwxc3MifQ.W4jGv5A94ime_yc6OP5YtA")
earthquakes=loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv");

//Mercator X location , using  the web mercator formula
//what is pow??
}

function mercX(lon) {
  lon=radians(lon);
        var a = (256 / PI) * pow(2, zoom);
        var b = lon + PI;
        return a * b;
}

//Y location

function mercY(lat) {
  lat=radians(lat);
        var a = (256 / PI) * pow(2, zoom);
        var b = tan(PI / 4 + lat / 2);
        var c = PI - log(b);
        return a * c;
}

function setup() {
  createCanvas(1024, 512);
  translate(width/2,height/2);
  imageMode(CENTER);
  image(mapimg, 0, 0);
  
  // this i dont understand?? why -cx,-cy??
  
  var cx=mercX(clon);
  var cy=mercY(clat);
  
  //earthquakes 
  
  for (var i=0; i<earthquakes.length;i++){
    var data=earthquakes[i].split(/,/);
    console.log(data);
    var lat =data[1];
    var lon=data[2];
    
    var x=mercX(lon)-cx;
  var y=mercY(lat)-cy;
  
  fill(random(255),0,random(225));
  ellipse(x,y,8,8);
  }
    
  
  
}
var mapimg;

//center latitude and center longtitude
var clat = 0;
var clon = 0;

//Beijing latitude and longtitude 39.9042° N, 116.4074° E
//position of Beijing

var lat = 39.9042;
var lon = 116.4074;

var zoom = 1;
var earthquakes;


//load image from map box

function preload() {
        mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/-0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoia2F0amlhIiwiYSI6ImNqOTZkMjl0dTAzaDUycm55OGkxMGwxc3MifQ.W4jGv5A94ime_yc6OP5YtA")
earthquakes=loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv
                        ");

//Mercator X location , using  the web mercator formula
//what is pow??
}

function mercX(lon) {
  lon=radians(lon);
        var a = (256 / PI) * pow(2, zoom);
        var b = lon + PI;
        return a * b;
}

//Y location

function mercY(lat) {
  lat=radians(lat);
        var a = (256 / PI) * pow(2, zoom);
        var b = tan(PI / 4 + lat / 2);
        var c = PI - log(b);
        return a * c;
}

function setup() {
  createCanvas(1024, 512);
  translate(width/2,height/2);
  imageMode(CENTER);
  image(mapimg, 0, 0);
  
  // this i dont understand?? why -cx,-cy??
  
  var cx=mercX(clon);
  var cy=mercY(clat);
  
  //earthquakes 
  
  for (var i=0; i<earthquakes.length;i++){
    var data=earthquakes[i].split(/,/);
    console.log(data);
    var lat =data[1];
    var lon=data[2];
    var mag=data[3];
    
    var x=mercX(lon)-cx;
  var y=mercY(lat)-cy;
    
    //different size for the cirlce
    
    mag=pow(10,mag);
    mag = sqrt(mag);
    
    var magmax=sqrt(pow(10,10));
  
  var d=map(mag,0,magmax,0,10);
  fill(255,0,255,200);
  ellipse(x,y,d,d);
  }
    
  
  
}
var mapimg;

//center latitude and center longtitude
var clat = 0;
var clon = 0;

//Beijing latitude and longtitude 39.9042° N, 116.4074° E
//position of Beijing

var lat = 39.9042;
var lon = 116.4074;

var zoom = 1;
var earthquakes;


//load image from map box

function preload() {
        mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/-0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoia2F0amlhIiwiYSI6ImNqOTZkMjl0dTAzaDUycm55OGkxMGwxc3MifQ.W4jGv5A94ime_yc6OP5YtA")
earthquakes=loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv");

//Mercator X location , using  the web mercator formula
//what is pow??
}

function mercX(lon) {
  lon=radians(lon);
        var a = (256 / PI) * pow(2, zoom);
        var b = lon + PI;
        return a * b;
}

//Y location

function mercY(lat) {
  lat=radians(lat);
        var a = (256 / PI) * pow(2, zoom);
        var b = tan(PI / 4 + lat / 2);
        var c = PI - log(b);
        return a * c;
}

function setup() {
  createCanvas(1024, 512);
  translate(width/2,height/2);
  imageMode(CENTER);
  image(mapimg, 0, 0);
  
  // this i dont understand?? why -cx,-cy??
  
  var cx=mercX(clon);
  var cy=mercY(clat);
  
  //earthquakes 
  
  for (var i=0; i<earthquakes.length;i++){
    var data=earthquakes[i].split(/,/);
    console.log(data);
    var lat =data[1];
    var lon=data[2];
    
    var x=mercX(lon)-cx;
  var y=mercY(lat)-cy;
  
  fill(255,0,255,200);
  ellipse(x,y,8,8);
  }
    
  
  
}
var mapimg;

//center latitude and center longtitude
var clat = 0;
var clon = 0;

//Beijing latitude and longtitude 39.9042° N, 116.4074° E
//position of Beijing

var lat = 39.9042;
var lon = 116.4074;

var zoom = 1;
var earthquakes;


//load image from map box

function preload() {
        mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/-0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoia2F0amlhIiwiYSI6ImNqOTZkMjl0dTAzaDUycm55OGkxMGwxc3MifQ.W4jGv5A94ime_yc6OP5YtA")
} eearthquakes=loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv);

//Mercator X location , using  the web mercator formula
//what is pow??

function mercX(lon) {
  lon=radians(lon);
        var a = (256 / PI) * pow(2, zoom);
        var b = lon + PI;
        return a * b;
}

//Y location

function mercY(lat) {
  lat=radians(lat);
        var a = (256 / PI) * pow(2, zoom);
        var b = tan(PI / 4 + lat / 2);
        var c = PI - log(b);
        return a * c;
}

function setup() {
  createCanvas(1024, 512);
  translate(width/2,height/2);
  imageMode(CENTER);
  image(mapimg, 0, 0);
  
  // this i dont understand?? why -cx,-cy??
  
  var cx=mercX(clon);
  var cy=mercY(clat);
  
  //earthquakes 
  
  for (var i=0; i<earthquakes.length;i++){
    var data=earthquakes[i].split(/,/);
    console.log(data);
    
  
  var x=mercX(lon)-cx;
  var y=mercY(lat)-cy;
  
  fill(255,0,255,200);
  ellipse(x,y,20,20);
}var mapimg;

//center latitude and center longtitude
var clat = 0;
var clon = 0;

//Beijing latitude and longtitude 39.9042° N, 116.4074° E
//position of Beijing

var lat = 39.9042;
var lon = 116.4074;

var zoom = 1;

//load image from map box

function preload() {
        mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/-0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoia2F0amlhIiwiYSI6ImNqOTZkMjl0dTAzaDUycm55OGkxMGwxc3MifQ.W4jGv5A94ime_yc6OP5YtA")
}

//Mercator X location , using  the web mercator formula
//what is pow??

function mercX(lon) {
  lon=radians(lon);
        var a = (256 / PI) * pow(2, zoom);
        var b = lon + PI;
        return a * b;
}

//Y location

function mercY(lat) {
  lat=radians(lat);
        var a = (256 / PI) * pow(2, zoom);
        var b = tan(PI / 4 + lat / 2);
        var c = PI - log(b);
        return a * c;
}

function setup() {
  createCanvas(1024, 512);
  translate(width/2,height/2);
  imageMode(CENTER);
  image(mapimg, 0, 0);
  
  // this i dont understand?? why -cx,-cy??
  
  var cx=mercX(clon);
  var cy=mercY(clat);
  
  var x=mercX(lon)-cx;
  var y=mercY(lat)-cy;
  
  fill(255,0,255,200);
  ellipse(x,y,20,20);
}var mapimg;

var clat = 0;
var clon = 0;

var ww = 1024;
var hh = 512;

var zoom = 1;
var earthquakes;

function preload() {
  // The clon and clat in this url are edited to be in the correct order.
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1Ijoia2F0amlhIiwiYSI6ImNqOTZkMjl0dTAzaDUycm55OGkxMGwxc3MifQ.W4jGv5A94ime_yc6OP5YtA")
}');
  // earthquakes = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
  earthquakes = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}


function setup() {
  createCanvas(ww, hh);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  var cx = mercX(clon);
  var cy = mercY(clat);

  for (var i = 1; i < earthquakes.length; i++) {
    var data = earthquakes[i].split(/,/);
    //console.log(data);
    var lat = data[1];
    var lon = data[2];
    var mag = data[4];
    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;
    // This addition fixes the case where the longitude is non-zero and
    // points can go off the screen.
    if(x < - width/2) {
      x += width;
    } else if(x > width / 2) {
      x -= width;
    }
    mag = pow(10, mag);
    mag = sqrt(mag);
    var magmax = sqrt(pow(10, 10));
    var d = map(mag, 0, magmax, 0, 180);
    stroke(255, 0, 255);
    fill(255, 0, 255, 200);
    ellipse(x, y, d, d);
  }

}
var mapimg;

var clat = 0;
var clon = 0;

var ww = 1024;
var hh = 512;

var zoom = 1;
var earthquakes;

function preload() {
  // The clon and clat in this url are edited to be in the correct order.
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1Ijoia2F0amlhIiwiYSI6ImNqOTZkMjl0dTAzaDUycm55OGkxMGwxc3MifQ.W4jGv5A94ime_yc6OP5YtA")
}');
  // earthquakes = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
  earthquakes = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}


function setup() {
  createCanvas(ww, hh);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  var cx = mercX(clon);
  var cy = mercY(clat);

  for (var i = 1; i < earthquakes.length; i++) {
    var data = earthquakes[i].split(/,/);
    //console.log(data);
    var lat = data[1];
    var lon = data[2];
    var mag = data[4];
    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;
    // This addition fixes the case where the longitude is non-zero and
    // points can go off the screen.
    if(x < - width/2) {
      x += width;
    } else if(x > width / 2) {
      x -= width;
    }
    mag = pow(10, mag);
    mag = sqrt(mag);
    var magmax = sqrt(pow(10, 10));
    var d = map(mag, 0, magmax, 0, 180);
    stroke(255, 0, 255);
    fill(255, 0, 255, 200);
    ellipse(x, y, d, d);
  }

}
var mapimg;

/
var clat = 0;
var clon = 0;

//Beijing latitude and longtitude 39.9042° N, 116.4074° E

var lat=39.9042;
var lon=116.4074;
 
function preload() {
        mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/-0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoia2F0amlhIiwiYSI6ImNqOTZkMjl0dTAzaDUycm55OGkxMGwxc3MifQ.W4jGv5A94ime_yc6OP5YtA")
}

function setup() {
        createCanvas(1024, 512);
        image(mapimg, 0, 0);
}

function draw() {

}var mapimg;

function preload(){
  mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/-122.4241,37.78,14.25,0,
                     0/600x600?access_token=pk.eyJ1Ijoia2F0amlhIiwiYSI6ImNqOTZkMjl0dTAzaDUycm55OGkxMGwxc3MifQ.W4jGv5A94ime_yc6OP5YtA"
)
}
function setup() { 
  createCanvas(600, 600);
  image(mapimg,0,0);
} 

function draw() { 

}var mapimg;

function preload(){
  mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/-122.4241,37.78,14.25,0,
                     0/600x600?access_token=pk.eyJ1Ijoia2F0amlhIiwiYSI6ImNqOTZkMjl0dTAzaDUycm55OGkxMGwxc3MifQ.W4jGv5A94ime_yc6OP5YtA"
)
}
function setup() { 
  createCanvas(600, 600);
  image(mapimg,0,0);
} 

function draw() { 

}var weather;

let api = 'http://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = '&APPID=001b0f58045147663b1ea518d34d88b4';
let units = '&units=metric';

let input;

function setup() {
  createCanvas(400, 200);

  var button = select('#submit');
  button.mousePressed(weatherAsk);

  input = select('#city');
}

function weatherAsk() {
  let url = api + input.value() + apiKey + units;
  loadJSON(url, gotData);
}

function gotData(data) {
  weather = data;
}

function draw() {
  background(0);
  if (weather) {
    let temp = weather.main.temp;
    var humidity = weather.main.humidity;
    ellipse(100, 100, temp, temp);
    ellipse(300, 100, humidity, humidity);
  }
}let search;
let button;

function setup() {
  noCanvas();
  search = select('#keyword');
  button = select('#submit');
  button.mousePressed(askAPI);
}

function askAPI() {
  let url = 'https://itp.nyu.edu/ranch/api/projects-finder/' + search.value();
  console.log(url);
  loadJSON(url, gotData);
}

function gotData(data) {
  for (let i = 0; i < data.length; i++) {
    createDiv(data[i].name);
  }
}// Daniel Shiffman
// Wikipedia
// Video tutorial: https://youtu.be/RPz75gcHj18

let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';

let userInput;

let counter = 0;

function setup() {
  noCanvas();
  userInput = createInput('apple');
  let button = createButton('submit');
  button.mousePressed(startSearch);
  //goWiki(userInput.value());

  function startSearch() {
    counter = 0;
    goWiki(userInput.value());
  }

  function goWiki(term) {
    counter = counter + 1;

    if (counter < 10) {
      //let term = userInput.value();
      let url = searchUrl + term;
      loadJSON(url, gotSearch, 'jsonp');
    }
  }

  function gotSearch(data) {
    // console.log(data);
    let len = data[1].length;
    let index = floor(random(len));
    let title = data[1][index];
    // Spaces behind underscore
    title = title.replace(/ /g, '_');
    createDiv(title);
    console.log('Querying: ' + title);
    let url = contentUrl + title;
    loadJSON(url, gotContent, 'jsonp');
  }

  function gotContent(data) {
    let page = data.query.pages;
    let pageId = Object.keys(data.query.pages)[0];
    console.log(pageId);
    let content = page[pageId].revisions[0]['*'];
    console.log(content);
    let wordRegex = /\b\w{4,}\b/g;
    let words = content.match(wordRegex);
    let word = random(words);
    goWiki(word);
    console.log(word);
  }
}// Input from user
let input;

function setup() {
  noCanvas();

  // Grab the input and button from HTML
  input = createInput('rainbow');
  button = createButton('submit');
  // Attach a callback to button press
  button.mousePressed(search);
}

// Run the API call
function search() {
  let term = input.value();

  // URL for querying the times
  let url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?'
          + 'api-key=99cfea65a5bb30650b3d31eb1713233e:15:73386102'
          + '&q=' + term;

  // Query the URL, set a callback
  // 'jsonp' is needed for security
  console.log(url);
  loadJSON(url, gotData);
}

// Request is completed
function gotData(data) {
  console.log(data);
  // Go through and show some results
  docs = data.response.docs;

  // Iterate through the articles in "docs"
  for (let i = 0; i < docs.length; i++) {

    // Make each headline a link to the article
    let headline = createElement('h3', '');
    let link = createA(docs[i].web_url, docs[i].headline.main);
    // Make a <p> for "lead paragraph"
    let par = createP(docs[i].snippet);
  }
}var data;

function preload() {
  data = loadJSON("https://raw.githubusercontent.com/dariusk/corpora/master/data/animals/birds_antarctica.json");
}

function setup() {
  noCanvas();

  var birds = data.birds;

  for (var i = 0; i < birds.length; i++) {
    createElement('h1', birds[i].family);
    var members = birds[i].members;
    for (var j = 0; j < members.length; j++) {
      createDiv(members[j]);
    }
  }
}let flower;

// var flower = {
//   "name": "sunflower",
//   "r": 255,
//   "g": 200,
//   "b": 0
// }

function preload() {
  flower = loadJSON("flower.json");
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  fill(flower.r, flower.g, flower.b);
  text(flower.name, 10, 50);
}// Thank you to: https://github.com/dariusk/metaphor-a-minute/blob/master/metaphor.js

// Sign up for Wordnik here: https://www.wordnik.com/
// Developer documentation: http://developer.wordnik.com/

// Call to get a random noun
var randomNounURL = "https://api.wordnik.com/v4/words.json/randomWord?" +
  "&excludePartOfSpeech=proper-noun,proper-noun-plural,proper-noun-posessive,suffix,family-name,idiom,affix&" +
  "&includePartOfSpeech=noun" +
  "&minLength=5&maxLength=-1" +
  "&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";


// A random Adjective
var randomAdjURL = "https://api.wordnik.com/v4/words.json/randomWord?" +
  "&includePartOfSpeech=adjective" +
  "&minLength=5&maxLength=-1" +
  "&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";


// A random word
var randomWordURL = "https://api.wordnik.com/v4/words.json/randomWord?" +
  "&minLength=5&maxLength=-1" +
  "&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";

function setup() {
  noCanvas();
  // Some buttons
  var button1 = createButton('word');
  button1.mousePressed(randomWord);

  var button2 = createButton('adjective');
  button2.mousePressed(randomAdj);

  var button3 = createButton('noun');
  button3.mousePressed(randomNoun);
}

// Load the JSON for each one
function randomWord() {
  loadJSON(randomWordURL, wordLoaded);
}

function randomAdj() {
  loadJSON(randomAdjURL, wordLoaded);
}

function randomNoun() {
  loadJSON(randomNounURL, wordLoaded);
}

function wordLoaded(data) {
  createDiv(data.word);
}let data;

function preload() {
        data = loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/materials/gemstones.json');
}

function setup() {
        createCanvas(400, 400);
        background(0);
        // console.log(data);
        createP(data.description);
        createA(data.source, 'source');
        for (let i = 0; i < data.gemstones.length; i++) {
                fill(random(225),0,random(255))
                textAlign(CENTER);
                text(data.gemstones[i], random(width), random(height));
        }
        console.log(data);

}

function draw() {
        //background(220);
}

let p;
function setup() { 
  createCanvas(400, 400);
  let button=createButton('test');
  let input= createInput('name');
  button.mousePressed(press);
  

function press(){
  button.html('set'+random(10));
  input.html('name');
}
}
function draw() { 
  background(220);
}var n = 256;
var minSize = 55;
var maxSize = 300;
var moveAngle = 0.01;
var moveTime = 0.005;
var water;
var img;
// var buttonX = 30;
// var buttonY = 40;
// var div;




function setup() {
  createCanvas(screen.width, screen.height);
  background(255);
  noFill();
  stroke(0, 15);
  angleMode(DEGREES);
   img = loadImage("web2.png");
//    div = createDiv(['']);

//   h1 = createElement('h2', 'Chinese painting is one of the oldest continuous artistic traditions in the world. Painting in the traditional style is known today in Chinese as guóhuàt <a href="https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%9B%BD%E7%94%BB>);

//   p = createP(['<p>Click around .</p>']);
 

//   h1.parent(div);
//   p.parent(div);
}
  
  function mousePressed() {
  
  background(255);


}

function draw() {
   //background pics

  image(img, 0, 0);

  translate(mouseX, mouseY);
  water = (new Water(mouseX, mouseY));

  water.show();
}




// function mousePressed() {
//   changeColor();
// }var n = 256;
var minSize = 55;
var maxSize = 300;
var moveAngle = 0.01;
var moveTime = 0.005;
var water;
var img;
var buttonX = 30;
var buttonY = 40;
var div;




function setup() {
  createCanvas(screen.width, screen.height);
  background(255);
  noFill();
  stroke(0, 15);
  angleMode(DEGREES);
   img = loadImage("web2.png");
   div = createDiv(['']);

  h1 = createElement('h2', 'Chinese painting is one of the oldest continuous artistic traditions in the world. Painting in the traditional style is known today in Chinese as guóhuàt <a href="https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%9B%BD%E7%94%BB>Previously designing things <a href="https://www.ibm.com/design/language/">here</a>);

  p = createP(['<p>Click around to draw sheep.</p>']);
 

  h1.parent(div);
  p.parent(div);
}
  
  function mousePressed() {
  
  background(255);


}

function draw() {
   //background pics

  image(img, 0, 0);

  translate(mouseX, mouseY);
  water = (new Water(mouseX, mouseY));

  water.show();
}




// function mousePressed() {
//   changeColor();
// }var n = 256;
var minSize = 55;
var maxSize = 300;
var moveAngle = 0.01;
var moveTime = 0.005;
var water;
var img;


function setup() {
  createCanvas(screen.width, screen.height);
  clear();
  var img = createCanvas(0\,0);

  img.position(50, 100);
   img = createImg('web2.png');



  // background(255);
  noFill();
  stroke(0, 15);
  angleMode(DEGREES);

}

function draw() {
  translate(mouseX, mouseY);
  water = (new Water(mouseX, mouseY));

  water.show();
}

function mousePressed() {
  background(255);
}var n = 256;
var minSize = 55;
var maxSize = 300;
var moveAngle = 0.01;
var moveTime = 0.005;
var water;
var img;


function setup() {
  createCanvas(screen.width, screen.height);
  clear();
  var img = createCanvas(0\,0);

  img.position(50, 100);
   img = createImg('web2.png');



  // background(255);
  noFill();
  stroke(0, 15);
  angleMode(DEGREES);

}

function draw() {
  translate(mouseX, mouseY);
  water = (new Water(mouseX, mouseY));

  water.show();
}

function mousePressed() {
  background(255);
}var canvas;
var h1;

function setup() { 
  createCanvas(screen.width, screen.height);
} 

function draw() { 
  clear();//background is clear 
  
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data
 
function setup() {
 createCanvas(400, 300);          // make the canvas
 serial = new p5.SerialPort();    // make a new instance of the serialport library
 serial.on('data', serialEvent);  // callback for when new data arrives
 serial.on('error', serialError); // callback for errors
 serial.open(portName);           // open a serial port
}
function serialEvent() {
 // read a byte from the serial port:
 var inByte = serial.read();
 // store it in a global variable:
 inData = inByte;
}
function serialError(err) {
  }
function draw() {
 // black background, white text:
 background(0);
 fill(255);
 // display the incoming serial data as a string:
 text("incoming value: " + inData, 30, 30);
}
function draw() {
 // black background, white text:
 background(0);
 fill(255);
 // display the incoming serial data as a string:
 text("incoming value: " + inData, 30, 30);
}
  function keyPressed() {
 if (key >=0 && key <=9) { // if the user presses 0 through 9
 outByte = byte(key * 25); // map the key to a range from 0 to 225
 }
 serial.write(outByte); // send it out the serial port
}


// var inData;                             // for incoming serial data

var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var circleSize =10;

function setup() {
  createCanvas(400,400);
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
  background(0);

  
  fill(255);
  noStroke();
  ellipse(width/2,height/2,circleSize,circleSize);
  }
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
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
// inData = Number(serial.read());
 var data = serial.read();
  console.log(data);
  circleSize=data;
}
 
function serialError(err) {
 console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log ('The serial port closed.');
}
//


// var inData;                             // for incoming serial data

var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var circleSize =10;

function setup() {
  createCanvas(400,400);
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
  background(0);

  
  fill(255);
  noStroke();
  ellipse(width/2,height/2,circleSize,circleSize);
  }
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
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
// inData = Number(serial.read());
 var data = serial.read();
  console.log(data);
  circleSize=data;
}
 
function serialError(err) {
 console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log ('The serial port closed.');
}
//

var serial;

function setup() {
    serial = new p5.SerialPort();
    serial.on('list', printList);

    serial.list();
}

function printList(portList) {
    for (var i = 0; i < portList.lenghth; i++) {
        consloe.log(i + "" + portList[i]);
    }

}function setup() { 
  createCanvas(400, 400);
    createButton("word");
  createP("hihihihi")
} 

function draw() { 
  background(220);

  
}var n = 256;
var minSize = 55;
var maxSize = 300;
var moveAngle = 0.01;
var moveTime = 0.005;
var water;

function setup() {
  createCanvas(screen.width, screen.height);
  background(255);
  noFill();
  stroke(0, 15);
  angleMode(DEGREES);

}

function draw() {
  translate(mouseX, mouseY);
  water = (new Water(mouseX, mouseY));

  water.show();
}

function mousePressed() {
  background(255);
}var n = 256;
var minRad = 25;
var maxRad = 300;
var nfAng = 0.01;
var nfTime = 0.005;

function setup(){
  createCanvas(400, 400);
  background(255);
  noFill();
  stroke(0, 15);
  angleMode(DEGREES);
}

function draw() 
{
  translate(mouseX, mouseY);
  beginShape();
  for (var i=0; i<n; i++) {
    var ang = map(i, 0, n, 0, 365);
   var rad = map(noise(i*nfAng, frameCount*nfTime), 0, 1, minRad, maxRad);
   var x = rad * cos(ang);
    var y = rad * sin(ang);
    curveVertex(x, y);
  }
  endShape(CLOSE);
}

function mousePressed() {
  background(255);
}

let bouncers = [];
let bouncer2;
let gravity = 0.1;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let r = (12, 38);
    bouncers.push(new Ball(x, y, r));
    // bouncer1 = new Ball(100,100);
    // bouncer2 = new Ball(125,125);
  }
}

function draw() {
  background(220);
  // bouncer1.render();  // bouncer1.update();
  // bouncer2.render();
  // bouncer2.update();
  for (let i = 0; i < bouncers.length; i++) {
    bouncers[i].render();
    bouncers[i].update();

  }

}// Bouncing ball
// no objects
//add another file to declear Ball, and add to html.
let x = 200;
let y = 20;
let speed = 0;
let gravity = 0.1;

function setup() {
  createCanvas(400, 400);
  bouncer = new Ball();
}

function draw() {
  background(220);
  fill(0);
  ellipse(x, y, 24, 24);

  y = y + speed;
  speed = speed + gravity;
  if (y > height) {
    y = height;
    speed = -0.95 * speed;
  }
}

// Bouncing ball
// no objects
//add another file to declear Ball, and add to html.
let x = 200;
let y = 20;
let speed = 0;
let gravity = 0.1;

function setup() {
  createCanvas(400, 400);
  bouncer = new Ball();
}

function draw() {
  background(220);
  fill(0);
  ellipse(x, y, 24, 24);

  y = y + speed;
  speed = speed + gravity;
  if (y > height) {
    y = height;
    speed = -0.95 * speed;
  }
}

function setup() { 
  createCanvas(400, 400);
 background(0);
  let img=loadImage('Golden-Puppy.jpg');
  
} 

\function draw() { 
 image(img,0,0);
}function setup() { 
  createCanvas(400, 400);
 background(0);
  let img=loadImage('Golden-Puppy.jpg');
  
} 

\function draw() { 
 image(img,0,0);
}let x = 200;
let y = 335;
let width = 110;
let height = 10;
let faceX = 10;
let faceY = 200;
let faceWidth = 90;
let faceHeight = 110;

function setup() {
  createCanvas(400, 400);
}

function fatguy() {
  noStroke();
  fill(254, 214, 176);
  ellipse(faceX, faceY, faceWidth, faceHeight);
  stroke(0);
  strokeWeight(6);
  line(45, 200, 22, 200);
  line(-25, 200, -2, 200);
}

function BurgerButton() {
  noStroke();
  fill(57, 190, 101)
  ellipse(200, 325, 110, 10);
  fill(147, 61, 42)
  ellipse(200, 340, 110, 15);
  fill(220, 140, 55)
  arc(200, 350, 100, 50, 0, PI, CHORD);
  translate(200, 320);
  rotate(PI);
  arc(0, 0, 100, 85, 0, PI, CHORD);
  fill(240, 73, 62)
  ellipse(x, y, width, height);

}

function draw() {
  background(248, 244, 188);
  BurgerButton();
  fatguy();
  if (faceWidth > 120) {
    strokeWeight(3);
    arc(faceX + 30, faceY - 30, 20, 30, HALF_PI, PI + HALF_PI);
    arc(faceX - 30, faceY - 30, 20, 30, PI + HALF_PI, HALF_PI);
  }
  stroke(0);
  strokeWeight(2);
  fill(249, 166, 199);
  translate(10, 180);
  rotate(PI);
  arc(0, 0, 10, 15, 0, PI, CHORD);
}

function mousePressed() {
  if (dist(mouseX, mouseY, x, y) < width / 2) {
    faceWidth = faceWidth + 10;
    faceHeight = faceHeight + 10;
  }

  if (faceWidth >= 150) {
    faceWidth = 90;
    faceHeight = 110;
  }

}// let x = 200;
// let y = 335;
// let a = 110;
// let b = 10;
// let c = 10;
// let d = 200;
// let e = 90;
// let f = 110;
let x = 200;
let y = 335;
let width = 110;
let height = 10;
let faceX = 10;
let faceY = 200;
let faceWidth = 90;
let faceHeight = 110;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(248,244,188);

  noStroke();
  fill(240, 73, 62)
  // ellipse(x, y, a, b);
  ellipse(x, y, width, height);
  //Burger Button
  noStroke();
  fill(57, 190, 101)
  ellipse(200, 325, 110, 10);
  fill(147, 61, 42)
  ellipse(200, 340, 110, 15);
  fill(220, 140, 55)
  arc(200, 350, 100, 50, 0, PI, CHORD);
  translate(200, 320);
  rotate(PI);
  arc(0, 0, 100, 85, 0, PI, CHORD);
  //fat guy
  noStroke();
  fill(254, 214, 176);
  // ellipse(c, d, e, f);
   ellipse(faceX, faceY, faceWidth, faceHeight);
  stroke(0);
  strokeWeight(6);
  line(45, 200, 22, 200);
  line(-25, 200, -2, 200);
  
//   if(e>120){
   if(faceWidth>120){
     strokeWeight(3);
//   	arc(c+30, d-30, 20, 30, HALF_PI, PI+HALF_PI);
//     arc(c-30, d-30, 20, 30, PI+HALF_PI,HALF_PI);
//   }
  arc(faceX+30, faceY-30, 20, 30, HALF_PI, PI+HALF_PI);
    arc(faceX-30, faceY-30, 20, 30, PI+HALF_PI,HALF_PI);
  }
  stroke(0);
  strokeWeight(2);
  fill(249,166,199);
  translate(10, 180);
  rotate(PI);
  arc(0, 0, 10, 15, 0, PI, CHORD);
  
}

function mousePressed() {
 
//   if (dist(mouseX, mouseY, x, y) < a / 2) {
//     e = e + 10;
//     f = f + 10;
//   }
  
//   if(e >= 150){
//    	e = 90;
//     f = 110;
//   }

// }
  if (dist(mouseX, mouseY, x, y) <  / 2) {
    e = e + 10;
    f = f + 10;
  }
  
  if(e >= 150){
   	e = 90;
    f = 110;
  }

}// let x = 200;
// let y = 335;
// let a = 110;
// let b = 10;
// let c = 10;
// let d = 200;
// let e = 90;
// let f = 110;
let x = 200;
let y = 335;
let width = 110;
let height = 10;
let faceX = 10;
let faceY = 200;
let faceWidth = 90;
let faceHeight = 110;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(248,244,188);

  noStroke();
  fill(240, 73, 62)
  // ellipse(x, y, a, b);
  ellipse(x, y, width, height);
  //Burger Button
  noStroke();
  fill(57, 190, 101)
  ellipse(200, 325, 110, 10);
  fill(147, 61, 42)
  ellipse(200, 340, 110, 15);
  fill(220, 140, 55)
  arc(200, 350, 100, 50, 0, PI, CHORD);
  translate(200, 320);
  rotate(PI);
  arc(0, 0, 100, 85, 0, PI, CHORD);
  //fat guy
  noStroke();
  fill(254, 214, 176);
  // ellipse(c, d, e, f);
   ellipse(faceX, faceY, faceWidth, faceHeight);
  stroke(0);
  strokeWeight(6);
  line(45, 200, 22, 200);
  line(-25, 200, -2, 200);
  
//   if(e>120){
   if(faceWidth>120){
     strokeWeight(3);
//   	arc(c+30, d-30, 20, 30, HALF_PI, PI+HALF_PI);
//     arc(c-30, d-30, 20, 30, PI+HALF_PI,HALF_PI);
//   }
  arc(faceX+30, faceY-30, 20, 30, HALF_PI, PI+HALF_PI);
    arc(faceX-30, faceY-30, 20, 30, PI+HALF_PI,HALF_PI);
  }
  stroke(0);
  strokeWeight(2);
  fill(249,166,199);
  translate(10, 180);
  rotate(PI);
  arc(0, 0, 10, 15, 0, PI, CHORD);
  
}

function mousePressed() {
 
//   if (dist(mouseX, mouseY, x, y) < a / 2) {
//     e = e + 10;
//     f = f + 10;
//   }
  
//   if(e >= 150){
//    	e = 90;
//     f = 110;
//   }

// }
  if (dist(mouseX, mouseY, x, y) <  / 2) {
    e = e + 10;
    f = f + 10;
  }
  
  if(e >= 150){
   	e = 90;
    f = 110;
  }

}// let x = 200;
// let y = 335;
// let a = 110;
// let b = 10;
// let c = 10;
// let d = 200;
// let e = 90;
// let f = 110;
let x = 200;
let y = 335;
let width = 110;
let height = 10;
let faceX = 10;
let faceY = 200;
let faceWidth = 90;
let faceHeight = 110;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(248,244,188);

  noStroke();
  fill(240, 73, 62)
  // ellipse(x, y, a, b);
  ellipse(x, y, width, height);
  //Burger Button
  noStroke();
  fill(57, 190, 101)
  ellipse(200, 325, 110, 10);
  fill(147, 61, 42)
  ellipse(200, 340, 110, 15);
  fill(220, 140, 55)
  arc(200, 350, 100, 50, 0, PI, CHORD);
  translate(200, 320);
  rotate(PI);
  arc(0, 0, 100, 85, 0, PI, CHORD);
  //fat guy
  noStroke();
  fill(254, 214, 176);
  // ellipse(c, d, e, f);
   ellipse(faceX, faceY, faceWidth, faceHeight);
  stroke(0);
  strokeWeight(6);
  line(45, 200, 22, 200);
  line(-25, 200, -2, 200);
  
//   if(e>120){
   if(faceWidth>120){
     strokeWeight(3);
//   	arc(c+30, d-30, 20, 30, HALF_PI, PI+HALF_PI);
//     arc(c-30, d-30, 20, 30, PI+HALF_PI,HALF_PI);
//   }
  arc(faceX+30, faceY-30, 20, 30, HALF_PI, PI+HALF_PI);
    arc(faceX-30, faceY-30, 20, 30, PI+HALF_PI,HALF_PI);
  }
  stroke(0);
  strokeWeight(2);
  fill(249,166,199);
  translate(10, 180);
  rotate(PI);
  arc(0, 0, 10, 15, 0, PI, CHORD);
  
}

function mousePressed() {
 
//   if (dist(mouseX, mouseY, x, y) < a / 2) {
//     e = e + 10;
//     f = f + 10;
//   }
  
//   if(e >= 150){
//    	e = 90;
//     f = 110;
//   }

// }
  if (dist(mouseX, mouseY, x, y) <  / 2) {
    e = e + 10;
    f = f + 10;
  }
  
  if(e >= 150){
   	e = 90;
    f = 110;
  }

}// let x = 200;
// let y = 335;
// let a = 110;
// let b = 10;
// let c = 10;
// let d = 200;
// let e = 90;
// let f = 110;
let x = 200;
let y = 335;
let width = 110;
let height = 10;
let faceX = 10;
let faceY = 200;
let faceWidth = 90;
let faceHeight = 110;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(248,244,188);

  noStroke();
  fill(240, 73, 62)
  // ellipse(x, y, a, b);
  ellipse(x, y, width, height);
  //Burger Button
  noStroke();
  fill(57, 190, 101)
  ellipse(200, 325, 110, 10);
  fill(147, 61, 42)
  ellipse(200, 340, 110, 15);
  fill(220, 140, 55)
  arc(200, 350, 100, 50, 0, PI, CHORD);
  translate(200, 320);
  rotate(PI);
  arc(0, 0, 100, 85, 0, PI, CHORD);
  //fat guy
  noStroke();
  fill(254, 214, 176);
  // ellipse(c, d, e, f);
   ellipse(faceX, faceY, faceWidth, faceHeight);
  stroke(0);
  strokeWeight(6);
  line(45, 200, 22, 200);
  line(-25, 200, -2, 200);
  
//   if(e>120){
   if(faceWidth>120){
     strokeWeight(3);
//   	arc(c+30, d-30, 20, 30, HALF_PI, PI+HALF_PI);
//     arc(c-30, d-30, 20, 30, PI+HALF_PI,HALF_PI);
//   }
  arc(faceX+30, faceY-30, 20, 30, HALF_PI, PI+HALF_PI);
    arc(faceX-30, faceY-30, 20, 30, PI+HALF_PI,HALF_PI);
  }
  stroke(0);
  strokeWeight(2);
  fill(249,166,199);
  translate(10, 180);
  rotate(PI);
  arc(0, 0, 10, 15, 0, PI, CHORD);
  
}

function mousePressed() {
 
//   if (dist(mouseX, mouseY, x, y) < a / 2) {
//     e = e + 10;
//     f = f + 10;
//   }
  
//   if(e >= 150){
//    	e = 90;
//     f = 110;
//   }

// }
  if (dist(mouseX, mouseY, x, y) <  / 2) {
    e = e + 10;
    f = f + 10;
  }
  
  if(e >= 150){
   	e = 90;
    f = 110;
  }

}// let x = 200;
// let y = 335;
// let a = 110;
// let b = 10;
// let c = 10;
// let d = 200;
// let e = 90;
// let f = 110;

let x = 200;
let y = 335;
let width = 110;
let height = 10;
let c = 10;
let d = 200;
let e = 90;
let f = 110;



function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(248,244,188);

  noStroke();
  fill(240, 73, 62)
  ellipse(x, y, width, height);
  //Burger Button
  noStroke();
  fill(57, 190, 101)
  ellipse(200, 325, 110, 10);
  fill(147, 61, 42)
  ellipse(200, 340, 110, 15);
  fill(220, 140, 55)
  arc(200, 350, 100, 50, 0, PI, CHORD);
  translate(200, 320);
  rotate(PI);
  arc(0, 0, 100, 85, 0, PI, CHORD);
  //fat guy
  noStroke();
  fill(254, 214, 176);
  ellipse(c, d, e, f);
  stroke(0);
  strokeWeight(6);
  line(45, 200, 22, 200);
  line(-25, 200, -2, 200);
  
  if(e>120){
     strokeWeight(3);
  	arc(c+30, d-30, 20, 30, HALF_PI, PI+HALF_PI);
    arc(c-30, d-30, 20, 30, PI+HALF_PI,HALF_PI);
  }
  
  stroke(0);
  strokeWeight(2);
  fill(249,166,199);
  translate(10, 180);
  rotate(PI);
  arc(0, 0, 10, 15, 0, PI, CHORD);
  
}

function mousePressed() {
 
  if (dist(mouseX, mouseY, x, y) < width / 2) {
    e = e + 10;
    f = f + 10;
  }
  
  if(e >= 150){
   	e = 90;
    f = 110;
  }

}let birdX, birdY;
let cBeak, cBody, cWing;
let dX, speed, daySpd, birdMinY, birdMaxY;
let west, up;
let flyCnt, dayCnt, yCnt;
let skyR, skyG, skyB;
let dayR, dayG, dayB;
let ngtR, ngtG, ngtB;
let rdmNum, rdmX, rdmY, rdmRad, rdmR, rdmG, rdmB, rdmAlp;
let tempAlp;
let localF;
let dimSpd;

function setup() { 
  createCanvas(600, 600);
  west = true;
  up = true;
  flyCnt = 0;
  dayCnt = 0;
  yCnt = 0;
  birdX = width/2;
  birdY = 250;
  birdMaxY = birdY+10;
  birdMinY = birdY-10;
  daySpd = 0.4;
  dX = 1;
  cBeak = color(255, 252, 0);
  cBody = color(0, 240, 255);
  cWing = color(0, 200, 255);
  dayR = 235;
  dayG = 192;
  dayB = 215
  ngtR = 104;
  ngtG = 21;
  ngtB = 66;
  skyR = dayR;
  skyG = dayG;
  skyB = dayB
  dimSpd = 50;
} 

function draw() { 
  
  background(skyR, skyG, skyB);
  
//  drawGrid();
  
  // generating random positions, colours and alphas
  localF = frameCount%dimSpd;
  if(localF == 0 ) {
  	rdmNum = random(5, 20);
    rdmAlp = [];
  	rdmX = [];
  	rdmY = [];
  	rdmRad = [];
    rdmR = [];
    rdmG = [];
    rdmB = [];
  	for(let i=0; i<rdmNum; i++) {
    	rdmAlp.push(random(20, 100));
    	rdmX.push(random(0, width));
    	rdmY.push(random(0, height));
    	rdmRad.push(random(30, 250));
      rdmR.push(random(0, 255));
      rdmG.push(random(0, 255));
      rdmB.push(random(0, 255));
 //     console.log(i);
  	}
	}
  
//  console.log(rdmNum);
  
  // make the bubbles fade in and out during dimSpd(frames)
  for(let i=0; i<rdmNum; i++) {
    if(localF<(dimSpd/2)) tempAlp = map(localF, 0, (dimSpd/2-1), 0, rdmAlp[i]);
    else if(localF>=(dimSpd/2)) tempAlp = map(localF, (dimSpd/2), (dimSpd-1), rdmAlp[i], 0);
  	noStroke();
  	fill(rdmR[i], rdmG[i], rdmB[i], tempAlp);
  	ellipse(rdmX[i], rdmY[i], rdmRad[i], rdmRad[i]);
  }
  
  
  // flying towards west
  if(west) {	
  
  	push();
  	translate(birdX, birdY);
  	westNoWings();
  
  	// move until the bird reach the destination   
    if(birdX < mouseX) birdX += dX*speed;
    
    // fluttering wings
    if(flyCnt>=0 && flyCnt<10) {  // upwing for 10f
  	  westWingUp();  
    	flyCnt++;
    } else if(flyCnt>=10 && flyCnt <20) {	//downwing for 10f
    	westWingDown();
    	flyCnt++;
    	if(flyCnt==20) flyCnt = 0;
    }
    
    // bouncing up and down while flying
    if(birdY == birdMaxY) up = false;
    else if(birdY == birdMinY) up = true;
    if(up) {
      birdY++;
    } else if(!up) {
      birdY--;
    }
  	
  	pop();

  } // westend
  
  // flying towards east
  if(!west) {
    
    push();
  	translate(birdX, birdY);
  	eastNoWings();
    
    // move until the bird reaches the destination
    if(birdX > mouseX) birdX -= dX*speed;

      
      // fluttering wings
    if(flyCnt>=0 && flyCnt<10) {  // upwing for 10f
  	  eastWingUp();  
    	flyCnt++;
    } else if(flyCnt>=10 && flyCnt <20) {	//downwing for 10f
    	eastWingDown();
    	flyCnt++;
    	if(flyCnt==20) flyCnt = 0;
    }
    
    if(birdY == birdMaxY) up = false;
    else if(birdY == birdMinY) up = true;
    if(up) {
      birdY++;
    } else if(!up) {
      birdY--;
    }
  	
  	pop();
  } // eastend
      
    // tracking the mouse pointer and calculating bird's speed
    dX = mouseX - birdX;
  	speed = map(dX, 0, width, 0, 0.05);
    if(dX > 0) west = true;
    if(dX < 0) west = false;
  
  // if it gets totally bright, begin to get dark and vice versa
  if(((skyR >= dayR) && (skyG >= dayG) && (skyB >= dayB)) || ((skyR <= ngtR) && (skyG <=ngtG) && (skyB <= ngtB))) 
    daySpd *= -1;
  
 
  if( ((daySpd<0) && (skyR!=ngtR)) || ((daySpd>0) && (skyR!=dayR)) ) skyR += daySpd;
  if( ((daySpd<0) && (skyG!=ngtG)) || ((daySpd>0) && (skyG!=dayG)) ) skyG += daySpd;
  if( ((daySpd<0) && (skyB!=ngtB)) || ((daySpd>0) && (skyB!=dayB)) ) skyB += daySpd;
  
  console.log(mouseX, " ", mouseY);
  
}

// function mouseClicked() {
  
//     fly = true;
  
//     destX = mouseX;
//     dX = mouseX - birdX;
//   	speed = map(dX, 0, width, 0, 0.05);
//     if(dX>0) west = true;
//     if(dX<0) west = false;

// //   console.log(fly);
// //   console.log(west);
// //  console.log(destX);
// }

function westNoWings() {
  
  noStroke();
  
  // beak
  fill(cBeak);
  triangle(150, 20, 80, 15, 80, 30);
  
  // head
  fill(cBody);
  ellipse(70, 25, 60, 50);
 
  // body
  arc(0, 0, 150, 150, 0, PI);
  
  // eye
  fill(255);
  arc(75, 15, 25, 25, 0, PI);
  
  // iris
  fill(0);
  arc(75, 15, 16, 16, 0, PI);
  
}
  
function westWingUp() {

  push();
    translate(20, 20);
  
  // // current (0, 0)
  // stroke(0);
  // strokeWeight(5);
  // point(0,0);
  // noStroke();
  
  // wing up
  rotate(PI/4);
  fill(cWing);
  arc(-50, 0, 100, 100, 0, PI);
  pop();
}

function westWingDown() {
  push();
  translate(0, 20);
  
  // // current (0, 0)
  // stroke(0);
  // strokeWeight(5);
  // point(0,0);
  // noStroke();
  
  // wing down
  rotate(PI/4);
  fill(cWing);
  arc(50, 0, 100, 100, 0, PI);
  pop();
}

function eastNoWings() {
    
  // // guide point
  // stroke(0);
  // strokeWeight(5);
  // point(0,0);
  
  noStroke();
  
  // beak
  fill(cBeak);
  triangle(-150, 20, -80, 15, -80, 30);
  
  // head
  fill(cBody);
  ellipse(-70, 25, 60, 50);
 
  // body
  arc(0, 0, 150, 150, 0, PI);
  
  // eye
  fill(255);
  arc(-75, 15, 25, 25, 0, PI);
  
  // iris
  fill(0);
  arc(-75, 15, 16, 16, 0, PI);
  
}

function eastWingUp() {
  
  push();
  translate(-20, 20);
  
  // // current (0, 0)
  // stroke(0);
  // strokeWeight(5);
  // point(0,0);
  // noStroke();
  
  // wing up
  rotate(PI/-4);
  fill(cWing);
  arc(50, 0, 100, 100, 0, PI);
  pop();
  
}

function eastWingDown() {
  
  push();
  translate(0, 20);
  
  // // current (0, 0)
  // stroke(0);
  // strokeWeight(5);
  // point(0,0);
  // noStroke();
  
  // wing down
  rotate(PI/-4);
  fill(cWing);
  arc(-50, 0, 100, 100, 0, PI);
  pop();
  
}

function drawGrid() {
  
  let i, j;
  
  stroke(200);
  
  for(i=10; i<width; i+=10) {
    line(0, i, width, i);
  }
  for(i=10; i<height; i+=10) {
    line(i, 0, i, height);
  }
}
let x=0;
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  x=x+5
  line(x,0,x,height);
}
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  background(220);

  for(let x=0;x<mouseX;x=x+50){
    line(x,9,x,height);
}
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  for(let x=0;x<width;x=x+50){
    line(x,9,x,height);
}
}let eMin = 90;
let eMax = 150;

let x = 200;
let y = 335;
let a = 110;
let b = 10;
let c = 10;
let d = 200;
let e = eMin;
let f = 110;
let maxChubiness = 120;
let lineSpace = 20;




function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(248,244,188);
  
  //------  begin animation --------
   let a = (frameCount / map(e, eMin, eMax, 10, .01)) % lineSpace

   strokeWeight(3);
   stroke(255, 0, 0, map(e, eMin, eMax, 0, 255));

   let l = 0;
  
   while (l < height * 2) {
  	 line(0, l + a, l + a, 0);
    
     // increment l
     l = l + lineSpace;
   }

  
  
  // ------ end animation --------
  
 
  //Burger Button
  noStroke();
  fill(57, 190, 101)
  ellipse(200, 325, 110, 10);
  fill(147, 61, 42)
  ellipse(200, 340, 110, 15);
  fill(220, 140, 55)
  arc(200, 350, 100, 50, 0, PI, CHORD);
  translate(200, 320);
  rotate(PI);
  arc(0, 0, 100, 85, 0, PI, CHORD);
  //fat guy
  noStroke();
  fill(254, 214, 176);
  ellipse(c, d, e, f);
  stroke(0);
  strokeWeight(6);
  line(45, 200, 22, 200);
  line(-25, 200, -2, 200);
  
  if(e > maxChubiness){
     strokeWeight(3);
  	arc(c+30, d-30, 20, 30, HALF_PI, PI+HALF_PI);
    arc(c-30, d-30, 20, 30, PI+HALF_PI,HALF_PI);
  }
  
  stroke(0);
  strokeWeight(2);
  fill(249,166,199);
  translate(10, 180);
  rotate(PI);
  arc(0, 0, 10, 15, 0, PI, CHORD);
  
}

function mousePressed() {
 
  if (dist(mouseX, mouseY, x, y) < a / 2) {
    e = e + 10;
    f = f + 10;
  }
  
  if(e >= eMax){
   	e = eMin;
    f = 110;
  }
  
}let x = 200;
let y = 335;
let a = 110;
let b = 10;
let c = 10;
let d = 200;
let e = 90;
let f = 110;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(248,244,188);

  noStroke();
  fill(240, 73, 62)
  ellipse(x, y, a, b);
  //Burger Button
  noStroke();
  fill(57, 190, 101)
  ellipse(200, 325, 110, 10);
  fill(147, 61, 42)
  ellipse(200, 340, 110, 15);
  fill(220, 140, 55)
  arc(200, 350, 100, 50, 0, PI, CHORD);
  translate(200, 320);
  rotate(PI);
  arc(0, 0, 100, 85, 0, PI, CHORD);
  //fat guy
  noStroke();
  fill(254, 214, 176);
  ellipse(c, d, e, f);
  stroke(0);
  strokeWeight(6);
  line(45, 200, 22, 200);
  line(-25, 200, -2, 200);
  
  if(e>120){
     strokeWeight(3);
  	arc(c+30, d-30, 20, 30, HALF_PI, PI+HALF_PI);
    arc(c-30, d-30, 20, 30, PI+HALF_PI,HALF_PI);
  }
  
  stroke(0);
  strokeWeight(2);
  fill(249,166,199);
  translate(10, 180);
  rotate(PI);
  arc(0, 0, 10, 15, 0, PI, CHORD);
  
}

function mousePressed() {
 
  if (dist(mouseX, mouseY, x, y) < a / 2) {
    e = e + 10;
    f = f + 10;
  }
  
  if(e >= 150){
   	e = 90;
    f = 110;
  }

}let canvas={
  x:500,
  y:500
}
let slider ={
  x:10,
  y:240,
  height:20,
  width:10
}
let dragged=false;

function setup() { 
  createCanvas(canvas.x,canvas.y);
} 

function draw() { 
  background(220);
line(10,canvas.y/2,canvas.x-10,canvas.y/2);
  //the slider
  if(dragged){
  }
  rect(slider.x,slider.y,slider.width,slider.height);
  //ellipse
  ellipse(canvas.x/2,canvas.y-60,30,30);
}
function mouseDragged(){
  if(mouseX>slider.x&&mouseX<(slider.x+slider.width)&&mouseY>slider) 
  print("Yes");
  dragged=true;
  
}
function mouseReleased(){
  dragged=false;function setup() {
  createCanvas(600, 400);
}

function draw() {
background(0);
strokeWeight(4);
  stroke(225);
  
  for (var x = 0; x <= width; x += 50); {
  for (var y = 0; y <= height; y += 50); {
fill(random(255), 0, random(255));
ellipse(x, y, 25, 25);
    }
  }
}
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  frameRate(20);
  fill(random(255));
  var x = map(mouseX, mouseY, width, -300, 500);
  curveTightness(x);
  beginShape();
  curveVertex(10, 26);
  curveVertex(50, 16);
  curveVertex(63, 24);
  curveVertex(83, 61);
  curveVertex(10,105);
  curveVertex(5, 15);
  endShape();
  stroke(0);
 

   }function setup() {
  createCanvas(600, 400);
  //frameRate(20);
  //angleMode(DEGREES);
  //rectMode(CENTER);
}
function mousePressed() {
}
function draw() {
  background(255);
    var angle = random(0, 360);

noStroke();
  for (var x = 0; x <= mouseX; x += 50) {
    for (var y = 0; y <= height; y += 50) {
      fill(random(255), 0, random(255),150);
      translate(mouseX, mouseY);

      line(x, y,1,1);
        rotate(angle);
    }
  }
}function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(0);
  for (var x=0x mouseX
}let x=0;
let y=0;

function setup() { 
  createCanvas(400, 400);
} 

function draw() {
	
	let r=random(1);
	if(r < 0.5){
		fill(0);
		rect(x,y,20,20);
	}
	x=x+20;
	if(x>width)){
		x=0;
		y=y+20;

}var a=10;
var b=10;
var c=10;
var Eye;

function setup() { 
  createCanvas(600, 400);
  
} 

function draw() { 
  background(159,205,201);
  a = a +5;
  b = b -5;
  c = c -3;

  

  if (a > 600) 
	{
    a = -320;
  }
	
	if(b < -320)
	{
    b = +520;
	}
	
	if(c < -320)
	{
		c = 400;
	}
    
  //BUBBLES
  fill(205,246,243,150);
  ellipse(555,260+c,38,38);
  ellipse(250,340+c,35,35);
  ellipse(50,210+c,55,55);
  ellipse(290,170+c,23,23);
  ellipse(260,25+c,8,7);
  ellipse(255,200+c,12,10);
  ellipse(40,345+c,21,18);
  ellipse(65,485+c,12,14);
  ellipse(105,285+c,9,9);
  ellipse(435,287+c,12,11);
  ellipse(370,355+c,7,8);
  ellipse(350,380+c,9,8);
  ellipse(350,430+c,13,14);
  ellipse(36,580+c,7,9);
   ellipse(500,580+c,10,9);
  ellipse(350,600+c,13,14);
 ellipse(400,545+c,21,18);
   ellipse(200,680+c,10,9);
   ellipse(500,500+c,30,30);
    ellipse(300,550+c,10,9);
  
  //EYE 
  stroke(0);
  strokeWeight(15)
  line(335,115,300,65);
  line(380,80,360,25);
  line(440,80,435,13);
  line(495,80,505,20);
  line(550,115,575,50);
  noStroke();
  fill(244,211,222);
  ellipse(450,150, 250,160);
  fill(255);
  ellipse(435,155,225,140);
  fill(0);
  

   Eye = new movingEye(450,160);

 
  
  //MONSTER1
  noStroke();
  fill(228,161,185);
  ellipse(130+a,300,120,120);
  fill(244,211,222);
  ellipse(150+a,280,105,105);
  fill(255);
  ellipse(165+a,255,62,50);
  fill(0);
  ellipse(175+a,245,35,30);
  fill(228,161,185);
  ellipse(71+a,310,50,50);  
  fill(228,161,185);
  ellipse(90+a,347,50,50);  
  fill(228,161,185);
  ellipse(135+a,356,50,50); 
  
  //MONSTER2
  fill(0);
  ellipse(128+b,45,28,28);
  fill(255);
  ellipse(140+b,60,48,48);
  fill(228,161,185);
  ellipse(190+b,95,95,95);
  fill(244,211,222);
  ellipse(170+b,80,85,85);
  fill(228,161,185);
  ellipse(195+b,140,40,40);
  ellipse(227+b,130,40,40);
  ellipse(237+b,100,40,40);
  fill(255);
  ellipse(195+b,85,50,50);
  fill(0);
  ellipse(208+b,80,30,30);
  }  

function mousePressed() {
  noLoop();
}

function mouseReleased() {
	loop();
}

function movingEye(nX,nY)
{
  var directionX = (mouseX - 400)/5;
  var directionY = (mouseY - 300)/10;
  
  nX = directionX + nX;
  nY = directionY + nY;
  
  ellipse(nX, nY, 85, 85);
}
  



  

  

  
function setup() { 
  createCanvas(600, 400);
   background(0);
} 

function draw() { 
  
  fill(250,200,200,50);
  ellipse(mouseX,mouseY,25,25);
}function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(159,205,201);

  //EYE 
  stroke(0);
  strokeWeight(15)
  line(335,115,300,65);
  line(380,80,360,25);
  line(440,80,435,13);
  line(495,80,505,20);
  line(550,115,575,50);
  noStroke();
  fill(244,211,222);
  ellipse(450,150, 250,160);
  fill(255);
  ellipse(435,155,225,140);
  fill(0);
  ellipse(365,160,85,85);
  
  //MONSTER1
  noStroke();
  fill(228,161,185);
  ellipse(130,300,120,120);
  fill(244,211,222);
  ellipse(150,280,105,105);
  fill(255);
  ellipse(165,255,62,50);
  fill(0);
  ellipse(175,245,35,30);
  fill(228,161,185);
  ellipse(71,310,50,50);  
  fill(228,161,185);
  ellipse(90,347,50,50);  
  fill(228,161,185);
  ellipse(135,356,50,50); 
  
  //MONSTER2
  fill(0);
  ellipse(128,45,28,28);
  fill(255);
  ellipse(140,60,48,48);
  fill(228,161,185);
  ellipse(190,95,95,95);
  fill(244,211,222);
  ellipse(170,80,85,85);
  fill(228,161,185);
  ellipse(195,140,40,40);
  fill(228,161,185);
  ellipse(227,130,40,40);
  fill(228,161,185);
  ellipse(237,100,40,40);
  fill(255);
  ellipse(195,85,50,50);
  fill(0);
  ellipse(208,80,30,30);
  
  //MONSTER3
  fill(0);
  ellipse(486,278,20,20);
  fill(255);
  ellipse(475,293,40,40);
  fill(228,161,185);
  ellipse(430,315,80,80);
  fill(244,211,222);
  ellipse(450,305,70,70);
  fill(228,161,185);
  ellipse(390,310,33,33);
  fill(228,161,185);
  ellipse(395,340,33,33);
  fill(228,161,185);
  ellipse(422,350,33,33); 
  fill(255);
  ellipse(435,300,43,43);
  fill(0);
  ellipse(420,293,23,23);
  
  //BUBBLES
  fill(205,246,243);
  ellipse(555,260,38,38);
  ellipse(250,340,35,35);
  ellipse(50,110,55,55);
  ellipse(290,170,23,23);
  ellipse(260,155,8,7);
  ellipse(255,200,12,10);
  ellipse(40,345,21,18);
  ellipse(65,385,12,14);
  ellipse(105,385,9,9);
  ellipse(435,387,12,11);
  ellipse(370,355,7,8);
  ellipse(350,380,9,8);
  ellipse(350,330,13,14);
  ellipse(36,280,7,9);





  



  

  

  
}function setup() { 
 createCanvas(450,350);
  } 

function draw() { 
  background(0);
  ellipse(200,200,50,50);

}