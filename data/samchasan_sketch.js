let song;
let xpos = 0;
let ypos = 0;
let timeStamp;
let vals = []
let input = {}
let startMillis;
let fft;
let amplitude;
let vertices;
let ampLvl;



function preload(){
  song = loadSound('beat.mp4');
}

// dont allow draw to loop more than once
function setup() {
    createCanvas(400, 400);
    background(20);
	    noLoop();
    textSize(16);
    noStroke();

// music visualizations for mapping
    fft = new p5.FFT();
    song.amp(0.2);
    amplitude = new p5.Amplitude();

}

function draw() {
    background(20);
    instructions()
    getVals()
    waveForm();
    showLevels()
}

// various key methods for program control

$(document).keydown(function(e){

// S for Save --- save JSON file of position data to fs
	if(e.key == "s"){
saveVals()
   }

// R for Record --- set stop watch & begin cycle
	if(e.key == "r"){
  recordVals()
        }

// T for sTop --- stop recording position data
if(e.key == "t"){
stopVals()
}

// C for Clear --- clear previous position values
if(e.key == "c"){
clearVals()
}

})


function saveVals(){
   saveJSON(vals, 'positions.json');
}

function recordVals(){
if ( !song.isPlaying() ) { 
    startMillis = millis();
    song.play();
    loop();
}  
}

function clearVals(){
vals = [];
loop();
noLoop();
}

function stopVals(){
if(song.isPlaying()){
   song.stop()
   noLoop();
}
}

function waveForm(){
vertices = []
let vertexPt = {}
let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(120,200,255); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i+=10){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  vertexPt = {
  "xpos" : x,
  "ypos" : y
  }
    vertices.push(vertexPt)
  }
  endShape();

}

function showLevels(){
  var level = amplitude.getLevel();
  ampLvl = map(level, 0, 0.04, 0, 50);
stroke(244,140,100)
strokeWeight(2)
noFill()
  ellipse(width/2, height/2, ampLvl, ampLvl);

}


function instructions(){
    noStroke()
    fill(150);
    text("Press buttons or keys to control",10,20);
	    rect(11,25,(vals.length/10)+2,18)
}

function getVals(){

    	// At every frame read position and write to variables
    xpos = mouseX;
    ypos = mouseY;
    fill(250,250,140);
    ellipse(xpos,ypos,10,10);

    // get timestamp of each frame recorded 
    // to nearest whole millisecond
    let timeStamp = round(millis() - startMillis);
    
	    // create position object for this frame 
    input = {
        "xpos": xpos,
        "ypos": ypos,
        "timeStamp": timeStamp,
    	    "amplitude": ampLvl,
        "frequency spectrum": vertices
    }

    vals.push(input)
}let avasong = 'https://www.youtube.com/watch?v=n-7DyOhbs6Q'
let gilsong = 'https://www.youtube.com/watch?v=xtzlFO19m3k'

function setup() {
  createCanvas(400, 400);
			
	}

function draw() {
  background(220);
}let textInput
let link

function setup() {
    noCanvas();
			    textInput = select('#textInput');
	  link = createP('text input')
	  textInput.changed(updateText)

}


function updateText(){
  link.html(textInput.value());
}

let messages = []
let message = {}
let img

function preload(){
img = loadImage("DYM.png")

}

function setup() {
  // createCanvas(400, 400);
  setInterval(newMessageTest, 2000);
  console.log("hello")
			  image(img,0,0,height,width)

}

function newMessageTest(){
  message = {
      "id" : "10a9sndamlksa0",
      "phone" : "xxx-1010",
      "message" : "We had a great time, didn't we"
  }
		  let h2 = createElement('h2', `${message.message}`)
  let metadata = createP(`${message.phone}` + ", " + `${message.id}`)
  let div = createElement('hr')
  
  messages.push(message)
}
// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}function preload() {
    connectKinect();
}

function setup() {
    createCanvas(1280, 720);
    background(0);
    // makeMovers();
   }


function draw() {
   background(0)

    strokeWeight(3)
    stroke(255, 0, 0, 15)
    line(rightHandX, rightHandY, rightElbowX, rightElbowY);
    line(rightShoulderX, rightShoulderY, rightElbowX, rightElbowY);
    line(rightShoulderX, rightShoulderY, leftShoulderX, leftShoulderY);
    line(leftHandX, leftHandY, leftElbowX, leftElbowY);
    line(leftShoulderX, leftShoulderY, leftElbowX, leftElbowY);
    line(LxHip, LyHip, RxHip, RyHip)
    line(LkneeX, LkneeY, LxHip, LyHip)
    line(RkneeX, RkneeY, RxHip, RyHip)
    line(LkneeX, LkneeY, LxAnkle, LyAnkle)
    line(RkneeX, RkneeY, RxAnkle, RyAnkle)

    console.log(rightHandX, rightHandY);

}

function connectKinect() {
    var address = {
        host: '172.29.220.83',
        port: 9001,
        path: '/'
    };
    kinectron = new Kinectron('kinectron', address);
    kinectron.makeConnection();
    kinectron.startTrackedBodies(trackBody);
}


// A2Z F17
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F17
// http://shiffman.net/a2z

// Variable for array of lines
let lines;
// Variable where we'll join all the text together
let txt;

// Anything in preload will finish before setup() is triggered
function preload() {
  lines = loadStrings('dt.txt');
}

// Now we can do stuff with the text
function setup() {
  noCanvas();
  // join() joins the elements of an array
  // Here we pass in a line break to retain formatting
  txt = join(lines, '<br/>');
  let par = createP(txt);
  par.id('text');
}function preload() {
    connectKinect();
}


function setup() {
    createCanvas(800, 600);
    background(0);
    makeParticles();
    makeYoyos();
}


function draw() {
   background(0, 15)
   drawSprings();
   // drawBodylines();
   drawParticles()
   
}


let countryArray = [];
let country;
let estimate;
let error;
let xpos;
let ypos;
let objectArray = [];
let USA

function preload() {
    populations = loadTable("/simpleData_noRegions.csv", "csv", "header");
    USA = loadImage("/map.png");
}

function setup() {
    createCanvas(700, 700)

    for (let i = 0; i < populations.getRowCount(); i++) {
        let oldObj = populations.getRow(i).obj;
        let newObj = {};
        newObj.country = oldObj.country;
        newObj.estimate = parseInt(oldObj.estimate);
        newObj.error = parseInt(oldObj.marginOfError);
        countryArray.push(newObj);
    }

    for (let i = 0; i < countryArray.length; i++) {

        if (i < countryArray.length * 0.5) {

            xpos = 50
            ypos = 10 * i + 10
            xdir = 5

        } else {
            ypos = 10 * i - 660
            xpos = 500
            xdir = -5
        }
        country = countryArray[i].country
        estimate = countryArray[i].estimate
        error = countryArray[i].error


        objectArray.push(new Particles(country, estimate, error, xpos, ypos, xdir))
    }
}


function makeDots() {
    let xdir
    let origin = createVector(300, 300);

    for (var i = 0; i < objectArray.length; i++) {
        if (i < objectArray.length * 0.5) {


            xdir = 5

        } else {

            xdir = -5
        }
        objectArray[i].createParticles(xdir)
        objectArray[i].display(origin)
        // console.log(objectArray[i].particles.length)

    }

}

function draw() {
    background(220, 100);
    textSize(24)
    textAlign(CENTER)
    text("Immigrants to the US", 280, 100)
    textSize(18)
    text("As if everyone immigrated in a minute, \n one dot = approx 12,500 people", 300, 120)

    for (let i = 0; i < countryArray.length; i++) {
        country = countryArray[i].country
        estimate = countryArray[i].estimate
        if (i < countryArray.length * 0.5) {

            xpos = 50
            ypos = 10 * i + 10
            textAlign(LEFT)

        } else {
            ypos = 10 * i - 660
            xpos = 500
        }
      
      let textS = estimate*0.00001

      
      if(textS >= 18){
        textS = 18
        fill(255,80,80)
      } if (textS > 5 && textS < 18){
        fill(220,120,120)
      }  if (textS <= 8){
        fill(0)
        textS = 8
      } 

        textSize(textS)
        textAlign(LEFT)
        text(country + ", " + estimate, xpos - 40, ypos)
    }
    makeDots();
    image(USA, 150, 180, USA.width / 2, USA.height / 2)
console.log(frameRate())
}let populations;
let objArray = [];

function preload() {
    populations = loadTable("/simpleData_noRegions.csv", "csv", "header");
}

function setup() {
    createCanvas(1000, 2800)
    for (let i = 0; i < populations.getRowCount(); i++) {
        let oldObj = populations.getRow(i).obj;
        let newObj = {};
        newObj.country = oldObj.country;
        newObj.estimate = parseInt(oldObj.estimate);
        newObj.error = parseInt(oldObj.marginOfError);
        objArray.push(newObj);
    }
}

let country
let countryTitle
let countryEstimate
let countryEstimateAdjPreFixed
let countryEstimateAdj
let countryError
let countryErrorAdj
let multiplier = 0.00002
let yposPrev = 0
let xpos = 0
let ypos = 0

function draw() {


    for (let i = 0; i < objArray.length; i++) {
        noStroke();


        country = objArray[i]
        countryTitle = country.country;
        countryEstimate = country.estimate;
        countryEstimateAdjPreFixed = countryEstimate * multiplier

        countryEstimateAdj = countryEstimateAdjPreFixed.toFixed(2);

        countryEstimateAdjStroke = int(countryEstimate * multiplier )

        countryError = country.error;
        countryErrorAdj = int(countryError * multiplier /10)
      
      
        xpos = 30
        yPos = i *20 + 20

        strokeWeight(countryEstimateAdjStroke)
        //color
        stroke(i, i+50, i *2, 30)
        line(xpos+40, yPos-5, 700, 700)  
        fill(0)


      noStroke()
      if (countryEstimateAdjStroke < 12) {
        countryEstimateAdjStroke = 12 
      } else if (countryEstimateAdjStroke > 24) {
               countryEstimateAdjStroke = 24
      } else {
 countryEstimateAdjStroke = countryEstimateAdjStroke
               }
      
      if (i <= 37 ) {
       fill(100,80,100) 
      } else if ( i > 37 && i <=63){
          fill(80,130,80)
      } else if(i>74 && i <= 94){
            fill(140,40,120)
      } else if (i > 94 && i <= 97){
            fill(20,100,40)
      } else if (i > 97 && i < 131){
        fill(60,90,90)
      }

textSize(countryEstimateAdjStroke)
      text(countryEstimateAdj + " - " + countryTitle, xpos, yPos)

      console.log(countryTitle + " - " + i)
      
    }
  
    textSize(26)
    text("Immigrants to New York * 20,000", 220, 80)
    fill(255) 
    textSize(30)
   textAlign(CENTER)
    text("NEW YORK", 700, 720)

    noLoop()

}let populations;
let objArray = [];

function preload() {
    populations = loadTable("/simpleData_noRegions.csv", "csv", "header");
}

function setup() {
    createCanvas(1500, 1500)
    for (let i = 0; i < populations.getRowCount(); i++) {
        let oldObj = populations.getRow(i).obj;
        let newObj = {};
        newObj.country = oldObj.country;
        newObj.estimate = parseInt(oldObj.estimate);
        newObj.error = parseInt(oldObj.marginOfError);
        objArray.push(newObj);
    }
    console.log(objArray.length);
}

let country
let countryTitle
let countryEstimate
let countryEstimateAdjPreFixed
let countryEstimateAdj
let countryError
let countryErrorAdj
let multiplier = 0.00002
let yposPrev = 0
let xpos = 0
let ypos = 0

function draw() {
    textAlign(CENTER)


    for (let i = 0; i < objArray.length; i++) {
        noStroke();


        country = objArray[i]
        countryTitle = country.country;
        countryEstimate = country.estimate;
        countryEstimateAdjPreFixed = countryEstimate * multiplier

        countryEstimateAdj = countryEstimateAdjPreFixed.toFixed(2);

        countryEstimateAdjStroke = int(countryEstimate * multiplier )

        countryError = country.error;
        countryErrorAdj = int(countryError * multiplier /10)
      
        let angle = i / 21.18;
      
      // let angle = i *2
      
      let wave = cos(angle)*10

        let rx = 500+wave
        let ry = 700+wave

        xpos = rx * cos(angle)
        yPos = ry * sin(angle)

        let shift = 700

        text(countryTitle + ", " + countryEstimateAdj, xpos +  shift, yPos + shift)


        strokeWeight(countryEstimateAdjStroke)
        //color
        stroke(i, i+50, i *2, 60)
        line(xpos + shift, yPos + shift, 700, 700)  
        fill(0)

    }

    textSize(16)
    text("Immigrants to New York * 20,000", 120, 80)
    fill(255) 
    textSize(24)

    text("NEW YORK", 700, 700)

    noLoop()

}let populations;
let objArray = [];

function preload() {
    populations = loadTable("/simpleData_noRegions.csv", "csv", "header");
}

function setup() {
    createCanvas(400, 3000)
    // put setup code here
    //   console.log(populations.getRowCount() + " total rows in table");
    //   console.log(populations.getColumnCount() + " total columns in table");

    //   // how do we want to work with our Table Data?
    //   console.log(populations.getObject());

    //   console.log(populations.getArray());

    //   console.log(populations.getRows());

    // What if we want to work with an Array of Objects - let's create that
    // Create an array of objects - declare it globally to access it in draw function too

    for (let i = 0; i < populations.getRowCount(); i++) {

        // get the object from each CSV row - country, estimate, margin of error
        //console.log(populations.getRow(i));
        let oldObj = populations.getRow(i).obj;

        let newObj = {};
        newObj.country = oldObj.country;
        // interpret as a number instead of a string with parseInt
        newObj.estimate = parseInt(oldObj.estimate);
        newObj.error = parseInt(oldObj.marginOfError);
        // put the object into the array
        objArray.push(newObj);
    }

    console.log(objArray);
}

let country
let countryTitle
let countryEstimate
let countryEstimateAdj
let countryError
let countryErrorAdj

function draw() {
    for (let i = 0; i < objArray.length; i++) {
        country = objArray[i]
        countryTitle = country.country;
        countryEstimate = country.estimate;
        countryEstimateAdj = int(countryEstimate / 10000)

        countryError = country.error;
        countryErrorAdj = int(countryError / 10000)
        //   fill(100,200,255)
        yPos = (i * 15) + 20
        text(countryEstimateAdj, 30, yPos)
              text(countryTitle, 60, yPos)

      
        fill(255, 0, 0,100)
      
        ellipse(0, yPos, countryEstimateAdj, countryEstimateAdj)
      
      strokeWeight(2)
      stroke(0)
      fill(0,0,0,0)
              ellipse(0, yPos, countryErrorAdj, countryErrorAdj)
        fill(0)
            noStroke()

        // strokeWeight(10)
        //   stroke(0)
        //   fill(0,0,0,0)
        //   ellipse(countryError, countryError, 100, i*15)
        //         noStroke()

    }
  
  noLoop()
    
    // put drawing code here

    // How might you sort the countries by population estimate?

    // How might you visually represent the population estimates?
    // Try a few different ways
    // Think about shape, color, text
    // Once you feel comfortable with drawing a static representation, think about adding interactivity
}var img;

function preload() {
    // connectKinect();
  img = loadImage("bluepx.png")

}


function setup() {
    createCanvas(1280, 720);
    background(0);
    makeParticles();
    // makeYoyos();
}


function draw() {
   background(0, 15)
   // drawSprings();
   // drawBodylines();
   drawParticles()
   
}


function preload() {
    connectKinect();
}


function setup() {
    createCanvas(800, 600);
    background(0);
    makeParticles();
    makeYoyos();
}


function draw() {
   background(0, 15)
   drawSprings();
   // drawBodylines();
   drawParticles()
   
}


function preload() {
    connectKinect();
}


function setup() {
    createCanvas(1280, 720);
    background(0);
    makeParticles();
    makeYoyos();
}


function draw() {
   background(0, 15)
   drawSprings();
   drawBodylines();
   drawParticles()
   
}


//spring
let origin
let bob;
let gravity;
let springForce = 0.1
let x;
let y;

// attractor/mover
let movers = [];
let attractor;
let pAmount = 100

function preload() {
    connectKinect();
}

function setup() {
    createCanvas(1280, 720);
    background(0);
    makeMovers();
    // setupVerlet()
    bobRhand = new Mover()
    bobRhand2 = new Mover()
    bobHead = new Mover()
    bobLhand = new Mover()
    bobLhand2 = new Mover()
    bobLknee = new Mover()
    bobRknee = new Mover()
    bobLankle = new Mover()
    bobRankle = new Mover()

}


function draw() {
    Rhand = createVector(rightHandX, rightHandY)
    Lhand = createVector(leftHandX, leftHandY)
    Neck = createVector(xNeck, yNeck)
    Mhip = createVector(MxHip, MyHip)
    Lhip = createVector(LxHip, LyHip)
    Rhip = createVector(RxHip, RyHip)
    Lknee = createVector(LkneeX, LkneeY)
    Rknee = createVector(RkneeX, RkneeY)
    Rankle = createVector(RxAnkle, RyAnkle)
    Lankle = createVector(LxAnkle, LyAnkle)
    
    // Update the physics world  
    // physics.update();
    background(0, 15)

    springVisuals(Rhand, bobRhand, 0.02, 10, 0.2);
    springVisuals(Lhand, bobLhand, 0.02, 10, 0.2);
    springVisuals(Neck, bobHead, 0.01, 12, 0)
    springVisuals(Rhand, bobRhand2, 0.04, 6, 0.2)
    springVisuals(Lhand, bobLhand2, 0.04, 6, 0.2);

    springVisuals(Lankle, bobLankle, 0.02, 5, 0.2)
    springVisuals(Rankle, bobRankle, 0.02, 5, 0.2)

    strokeWeight(3)
    stroke(255, 0, 0, 15)
    line(rightHandX, rightHandY, rightElbowX, rightElbowY);
    line(rightShoulderX, rightShoulderY, rightElbowX, rightElbowY);
    line(rightShoulderX, rightShoulderY, leftShoulderX, leftShoulderY);
    line(leftHandX, leftHandY, leftElbowX, leftElbowY);
    line(leftShoulderX, leftShoulderY, leftElbowX, leftElbowY);
    line(LxHip, LyHip, RxHip, RyHip)
    line(LkneeX, LkneeY, LxHip, LyHip)
    line(RkneeX, RkneeY, RxHip, RyHip)
    line(LkneeX, LkneeY, LxAnkle, LyAnkle)
    line(RkneeX, RkneeY, RxAnkle, RyAnkle)

    // verletVisuals();
    moversVisuals()
    console.log(rightHandX, rightHandY);
    // console.log(xHead,yHead);

}

function moversVisuals() {
    for (i = 0; i < pAmount; i++) {
        if (i < 50) {
            let forceL = attractorLhand.calculateAttraction(movers[i]);
            // movers[i].arrive(attractorLhand);
            movers[i].applyForce(forceL);
        } else {
            let forceR = attractorRhand.calculateAttraction(movers[i]);
            // movers[i].arrive(attractorRhand);
            movers[i].applyForce(forceR);
            // movers[i].update();
            // movers[i].display();
        }
        movers[i].update();
        movers[i].display();
    }
    // attractor.display();
    attractorRhand.update(rightHandX, rightHandY);
    attractorLhand.update(leftHandX, leftHandY);
}

// Relbow = createVector(rightElbowX, rightElbowY);
// Rshoulder = createVector(rightShoulderX,rightShoulderY);

// var rightHandX;
// var rightHandY;
// var rightElbowX;
// var rightElbowY;
// var rightShoulderX;
// var rightShoulderY;


function springVisuals(Origin, Bob, K, rest, G) {
    let restLen = rest;

    var origin = Origin
    var bob = Bob
    // x = rightHandX
    // y = rightHandY
    // origin = createVector(x, y);


    // console.log(x, ' ' ,y)
    stroke(255, 0, 0, 15)
    line(origin.x, origin.y, bob.pos.x, bob.pos.y)
    let spring = new p5.Vector.sub(bob.pos, origin)
    let currentLen = spring.mag()
    spring.normalize();
    let k = K
    let stretch = currentLen - restLen
    spring.mult(-k * stretch)
    bob.applyForce(spring)
    gravity = new p5.Vector(0, G)
    bob.applyForce(gravity);
    bob.update()
    bob.display()
}

function connectKinect() {
    var address = {
        host: '172.29.220.83',
        port: 9001,
        path: '/'
    };
    kinectron = new Kinectron('kinectron', address);
    kinectron.makeConnection();
    kinectron.startTrackedBodies(trackBody);
}

function makeMovers() {

    for (i = 0; i < pAmount; i++) {
        movers.push(new Mover2(random(width), random(height),
        random(0.01, 0.6), random(150), random(50), random(250)));
    }
    attractorLhand = new Attractor(leftHandX, leftHandY);
    attractorRhand = new Attractor(rightHandX, rightHandY);
}


//spring
let origin
let bob;
let restLen = 20;
let gravity;
let springForce = 0.1
let x;
let y;

// attractor/mover
let movers = [];
let attractor;
let pAmount = 100

function setup() {
    createCanvas(400, 400);
    background(0);
    connectKinect();
    makeMovers();
    setupVerlet()
}


function draw() {
    // Update the physics world
    physics.update();
    background(220, 10)
    // springVisuals();
    verletVisuals();
    // moversVisuals()
}

function moversVisuals() {
    for (i = 0; i < pAmount; i++) {
        if (i < 50) {
            let forceL = attractorLhand.calculateAttraction(movers[i]);
            // movers[i].arrive(attractorLhand);
            movers[i].applyForce(forceL);
        } else {
            let forceR = attractorRhand.calculateAttraction(movers[i]);
            // movers[i].arrive(attractorRhand);
            movers[i].applyForce(forceR);
            // movers[i].update();
            // movers[i].display();
        }
        movers[i].update();
        movers[i].display();
    }
    // attractor.display();
    attractorRhand.update(rightHandX, rightHandY);
    attractorLhand.update(leftHandX, leftHandY);
}


function springVisuals() {
    x = rightHandX
    y = rightHandY
    origin = createVector(x, y);
    stroke(255, 0, 0, 75)
    line(origin.x, origin.y, bob.pos.x, bob.pos.y)
    let spring = new p5.Vector.sub(bob.pos, origin)
    let currentLen = spring.mag()
    spring.normalize();
    let k = 0.02
    let stretch = currentLen - restLen
    spring.mult(-k * stretch)
    bob.applyForce(spring)
    gravity = new p5.Vector(0, 0.3)
    bob.applyForce(gravity);
    bob.update()
    bob.display()
}


function serialCommands() {
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing
    serial.open(portName, options);
    serial.list(); // list the serial ports
    serial.open(portName); // open a serial port
}

function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.')
}

function serialEvent() {
    serial.write(outByte + '\n')

    var inByte = serial.read();
    // store it in a global variable:
    inData = inByte;
}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}


// get the list of ports:
function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
        // Display the list the console:
        console.log(i + " " + portList[i]);
    }
}

function connectKinect() {
    var address = {
        host: '172.16.224.154',
        port: 9001,
        path: '/'
    };
    kinectron = new Kinectron('kinectron', address);
    kinectron.makeConnection();
    kinectron.startTrackedBodies(trackBody);
}

function makeMovers() {
    bob = new Mover(width / 2, 20)

    for (i = 0; i < pAmount; i++) {
        movers.push(new Mover2(random(width), random(height),
            random(0.2, 1), random(150), random(50), random(250)));
    }
    attractorLhand = new Attractor(leftHandX, leftHandY);
    attractorRhand = new Attractor(rightHandX, rightHandY);
}//spring
let origin
let bob;
let restLen = 20;
let gravity;
let springForce = 0.1
let x;
let y;

// attractor/mover
let movers = [];
let attractor;
let pAmount = 100

function setup() {
    createCanvas(400, 400);
    background(0);
    connectKinect();
    makeMovers();
    setupVerlet()
}


function draw() {
    // Update the physics world
    physics.update();
    background(0, 10)
    // springVisuals();
    verletVisuals();
    // moversVisuals()
}

function moversVisuals() {
    for (i = 0; i < pAmount; i++) {
        if (i < 50) {
            let forceL = attractorLhand.calculateAttraction(movers[i]);
            // movers[i].arrive(attractorLhand);
            movers[i].applyForce(forceL);
        } else {
            let forceR = attractorRhand.calculateAttraction(movers[i]);
            // movers[i].arrive(attractorRhand);
            movers[i].applyForce(forceR);
            // movers[i].update();
            // movers[i].display();
        }
        movers[i].update();
        movers[i].display();
    }
    // attractor.display();
    attractorRhand.update(rightHandX, rightHandY);
    attractorLhand.update(leftHandX, leftHandY);
}


function springVisuals() {
    x = rightHandX
    y = rightHandY
    origin = createVector(x, y);
    stroke(255, 0, 0, 75)
    line(origin.x, origin.y, bob.pos.x, bob.pos.y)
    let spring = new p5.Vector.sub(bob.pos, origin)
    let currentLen = spring.mag()
    spring.normalize();
    let k = 0.02
    let stretch = currentLen - restLen
    spring.mult(-k * stretch)
    bob.applyForce(spring)
    gravity = new p5.Vector(0, 0.3)
    bob.applyForce(gravity);
    bob.update()
    bob.display()
}


function serialCommands() {
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing
    serial.open(portName, options);
    serial.list(); // list the serial ports
    serial.open(portName); // open a serial port
}

function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.')
}

function serialEvent() {
    serial.write(outByte + '\n')

    var inByte = serial.read();
    // store it in a global variable:
    inData = inByte;
}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}


// get the list of ports:
function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
        // Display the list the console:
        console.log(i + " " + portList[i]);
    }
}

function connectKinect() {
    var address = {
        host: '172.16.224.154',
        port: 9001,
        path: '/'
    };
    kinectron = new Kinectron('kinectron', address);
    kinectron.makeConnection();
    kinectron.startTrackedBodies(trackBody);
}

function makeMovers() {
    bob = new Mover(width / 2, 20)

    for (i = 0; i < pAmount; i++) {
        movers.push(new Mover2(random(width), random(height),
            random(0.2, 1), random(150), random(50), random(250)));
    }
    attractorLhand = new Attractor(leftHandX, leftHandY);
    attractorRhand = new Attractor(rightHandX, rightHandY);
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Reference to physics world
var physics;

var p1;
var p2;
var p3;

function setup() {
    createCanvas(400, 400);

    // Initialize the physics
    physics = new VerletPhysics2D();
    physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.1)));

    // Set the world's bounding box
    physics.setWorldBounds(new Rect(0, 0, width, height));

    // Make two particles
    p1 = new Particle(new Vec2D(width / 2, 20));
    p2 = new Particle(new Vec2D(width / 2 + 160, 20));
    p3 = new Particle(new Vec2D(width / 2 + 160, 80));

    // Lock one in place
    p1.lock();

    // Make a spring connecting both Particles
    var spring = new VerletSpring2D(p1, p2, 60, 0.02);
    var spring2 = new VerletSpring2D(p2, p3, 60, 0.02);

    // Anything we make, we have to add into the physics world
    physics.addParticle(p1);
    physics.addParticle(p2);
    physics.addParticle(p3);
    physics.addSpring(spring);
    physics.addSpring(spring2);
}

var mousePosition;

function draw() {
  
    // Update the physics world
    physics.update();

    background(51);

    // Draw a line between the particles
    stroke(200);
    strokeWeight(1);
  // i = 0 i < particles.length -1
  // line p[i]
    line(p1.x, p1.y, p2.x, p2.y);
    line(p2.x, p2.y, p3.x, p3.y);

    // Display the particles
    p1.display();
    p2.display();
    p3.display();

    // Move the second one according to the mouse
    if (mouseIsPressed) {
        p3.lock();
        p3.x = mouseX;
        p3.y = mouseY;
        p3.unlock();
    }
}//spring
let origin
let bob;
let restLen = 20;
let gravity;
let springForce = 0.1
let x;
let y;

// attractor/mover
let movers = [];
let attractor;
let pAmount = 100

function setup() {
    createCanvas(400, 400);
    background(0);
    connectKinect();
    bob = new Mover(width / 2, 20)
    for (i = 0; i < pAmount; i++) {
        movers.push(new Mover2(random(width), random(height),
        random(0.2, 1), random(150), random(50), random(250)));
    }
    attractorLhand = new Attractor(leftHandX, leftHandY);
    attractorRhand = new Attractor(rightHandX, rightHandY);
}



function draw() {

    background(250, 15)
    springVisuals();
    for (i = 0; i < pAmount; i++) {

        if (i < 50) {
            let forceL = attractorLhand.calculateAttraction(movers[i]);
           
            movers[i].arrive(attractorLhand);
            movers[i].applyForce(forceL);

        } else {
            let forceR = attractorRhand.calculateAttraction(movers[i]);
            movers[i].arrive(attractorRhand);
                      movers[i].applyForce(forceR);

            // movers[i].update();
            // movers[i].display();

        }

        movers[i].update();
        movers[i].display();


    }
    // attractor.display();
    attractorRhand.update(rightHandX, rightHandY);
    attractorLhand.update(leftHandX, leftHandY);


}

function springVisuals() {
    x = rightHandX
    y = rightHandY
    origin = createVector(x, y);
    stroke(255, 0, 0, 75)
    line(origin.x, origin.y, bob.pos.x, bob.pos.y)
    let spring = new p5.Vector.sub(bob.pos, origin)
    let currentLen = spring.mag()
    spring.normalize();
    let k = 0.02
    let stretch = currentLen - restLen
    spring.mult(-k * stretch)
    bob.applyForce(spring)
    gravity = new p5.Vector(0, 0.3)
    bob.applyForce(gravity);
    bob.update()
    bob.display()
}


function serialCommands() {
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing
    serial.open(portName, options);
    serial.list(); // list the serial ports
    serial.open(portName); // open a serial port
}

function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.')
}

function serialEvent() {
    serial.write(outByte + '\n')

    var inByte = serial.read();
    // store it in a global variable:
    inData = inByte;
}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}


// get the list of ports:
function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
        // Display the list the console:
        console.log(i + " " + portList[i]);
    }
}

function connectKinect() {
    var address = {
        host: '172.16.224.154',
        port: 9001,
        path: '/'
    };
    kinectron = new Kinectron('kinectron', address);
    kinectron.makeConnection();
    kinectron.startTrackedBodies(trackBody);
}let origin
let bob

let restLen = 20;
let gravity;
let springForce = 0.1
let x;
let y;

function setup() {
    createCanvas(400, 400);
    bob = new Mover(width / 2, 20)
    background(0);
    connectKinect();


}

function draw() {
    origin = createVector(x, y);
  background(0,15)

    // background(0,50);
    x = mouseX
    y = mouseY
    stroke(255, 0, 0, 75)
    line(origin.x, origin.y, bob.pos.x, bob.pos.y)

    let spring = new p5.Vector.sub(bob.pos, origin)
    let currentLen = spring.mag()
    spring.normalize();
    let k = 0.01
    let stretch = currentLen - restLen
    spring.mult(-k * stretch)
    bob.applyForce(spring)

    if (mouseIsPressed) {

        wind = new p5.Vector(0.1, 0)
        bob.applyForce(wind);
        console.log("t")
    }

    gravity = new p5.Vector(0, 0.1)
    bob.applyForce(gravity);

    bob.update()
    bob.display()
  
  movePos()
    // drawBody()
  getSpeed()
  drawShapes()

}

/* ===
ML5 Example
ImageNet_Simple
Simple Image Classification using p5.js
=== */

// Initialize the ImageNet method with the MobileNet model.
const classifier = new ml5.ImageClassifier('MobileNet');

let img;

function setup() {
    // classifier = new ml5.ImageClassifier('MobileNet');
    noCanvas();
    // Load the image
    img = createImg('small-2.jpg', imageReady);
}

// When the image has been loaded,
// get a prediction for that image
function imageReady() {
    classifier.predict(img.elt, 10, gotResult);
}

// When we get the results
function gotResult(results) {
    // The results are in an array ordered by probability.
    select('#result').html(results[0].label);
    select('#probability').html(nf(results[0].probability, 0, 2));
}let population;
let info;
let foods = []


function setup() {
  background(0)
  noStroke()

    createCanvas(400, 400);
    let popmax = 15
    let mutationRate = 0.05
    population = new Population(mutationRate, popmax);

    for (var f = 0; f < 3; f++) {
        var foodItem = new Food(random(width), random(height), random(1, 5))
        foods.push(foodItem)

    }

}

function draw() {
    background(10,10);
    population.display();
    // population.update();

    // population.rollover(mouseX, mouseY);
    setInterval(makeFood, 100)

    for (var i = 0; i < foods.length; i++) {
        foods[i].display()
        // foods[i].update()
    }

    console.log(foods.length)

}

function makeFood() {
    if (random(100) < 0.01) {
        var newFood = new Food(random(width), random(height), random(5, 20))
        foods.push(newFood)
    } else {
        foods = foods
    }

}


function mousePressed() {
    population.selection();
    population.reproduction();
}let population;
let info;
let foods = []


function setup() {
  background(0)
  noStroke()

    createCanvas(400, 400);
    let popmax = 15
    let mutationRate = 0.05
    population = new Population(mutationRate, popmax);

    for (var f = 0; f < 3; f++) {
        var foodItem = new Food(random(width), random(height), random(1, 5))
        foods.push(foodItem)

    }

}

function draw() {
    background(10,10);
    population.display();
    // population.update();

    // population.rollover(mouseX, mouseY);
    setInterval(makeFood, 100)

    for (var i = 0; i < foods.length; i++) {
        foods[i].display()
        // foods[i].update()
    }

    console.log(foods.length)

}

function makeFood() {
    if (random(100) < 0.01) {
        var newFood = new Food(random(width), random(height), random(5, 20))
        foods.push(newFood)
    } else {
        foods = foods
    }

}


function mousePressed() {
    population.selection();
    population.reproduction();
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

let population;
let info;

function setup() {
  createCanvas(800, 124);
  colorMode(RGB, 1.0, 1.0, 1.0, 1.0);
  let popmax = 2;
  let mutationRate = 0.05; // A pretty high mutation rate here, our population is rather small we need to enforce variety
  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(mutationRate, popmax);
  // A simple button class
  button = createButton("evolve new generation");
  button.mousePressed(nextGen);
  button.position(10, 140);
  info = createDiv('');
  info.position(10, 175);
}

function draw() {
  background(100);
  // Display the faces
  population.display();
  population.rollover(mouseX, mouseY);
  info.html("Generation #:" + population.getGenerations());
}

// If the button is clicked, evolve next generation
function nextGen() {
  population.selection();
  population.reproduction();
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

let population;
let info;

function setup() {
  createCanvas(800, 124);
  colorMode(RGB, 1.0, 1.0, 1.0, 1.0);
  let popmax = 10;
  let mutationRate = 0.05; // A pretty high mutation rate here, our population is rather small we need to enforce variety
  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(mutationRate, popmax);
  // A simple button class
  button = createButton("evolve new generation");
  button.mousePressed(nextGen);
  button.position(10, 140);
  info = createDiv('');
  info.position(10, 175);
}

function draw() {
  background(1);
  // Display the faces
  population.display();
  population.rollover(mouseX, mouseY);
  info.html("Generation #:" + population.getGenerations());
}

// If the button is clicked, evolve next generation
function nextGen() {
  population.selection();
  population.reproduction();
}var result;
var dictionaries = [];
var button;


function preload() {
    result = loadStrings('words_alpha.txt');
}

function setup() {
    createCanvas(400, 600);
    background(200);

  for (var i = 0; i < result.length; i++) {
        console.log(result[i])
    }

}

function draw() {
    
}



var words = [];
var input = '';
var result = '';
var APIkey;
let dictionaryEntry = '';
let dictionaryEntryPoS = '';
let dictionaryEntryDef = '';
let dictionaryEntries = [];
// let newDictionary = [];

let partsOfspeech = [];

let nouns = [];
let verbs = [];
let pronouns = [];
let adverbs = [];
let prepositions = [];
let adjectives = [];
let interjections = [];
let conjunctions = [];
let boolean = true;
var dictLength = 0
var dictionaryEntryPrev = 'random'
var counter = 1;
var counterPrev = 0;
var loadDictionary;


function preload() {

    // load dictionary words
    words = loadStrings('words_alpha.txt');
}


function setup() {
    createCanvas(400, 400);
    background(22);

    // set dictionary to start with the first 100 words from the text file
    for (var i = 0; i < 50; i++) {
       
            if (boolean == true) {
                input = words[i];
                boolean = false
                //set API key
                APIkey = 'dict.1.1.20180327T230419Z.6d25dfde82c18d74.bec30f3a04c740e5238f879e7021177e1364d520'

                // Load the dictionary API
                var url =
                    'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=' +
                    APIkey + '&lang=en-en&text=' + input;

                // convert it to usable JSON  
                loadJSON(url, makeNewDict);

                // console.log(dictionaryEntry)

                if (dictionaryEntries.length < dictLength) {
                    boolean = false
                } else {
                    boolean = true
                }
                dictLength = dictionaryEntries.length

            

        }
    }


}


function makeNewDict(loadDictionary) {
    dictionaryEntry = loadDictionary.def[0].text;
    if (dictionaryEntry !== dictionaryEntryPrev) {
        dictionaryEntryPoS = loadDictionary.def[0].pos;
    }
    // dictionaryEntryDef = loadDictionary.def[0].tr[4].text;

    console.log(dictionaryEntry + ', ' + dictionaryEntryPoS + ', ' + dictionaryEntryDef)
    var entry = new Word(dictionaryEntry, dictionaryEntryPoS, dictionaryEntryDef)
    dictionaryEntries.push(entry);
    console.log(dictionaryEntries.length)

    dictionaryEntryPrev = dictionaryEntry

}

function draw() {
    //  phrases.display();
    // var dictionaryEntry = loadDictionary.def[0].pos;
    // console.log(dictionaryEntry)
    //  phrases.rollover();

}



function organizeWords() {
    /*
      // run through every word in the dictionary
      for (var i = 0; i < dictionary.def.length; i++) {
        
          // check the part of speech --- pos = part of speech
        
          // if the word is a noun, add it to the nouns array
          // if the word is a verb, add it to the verbs array
          // if the word is a adverb, add it to the adverbs array
          // and so on
        
          if (dictionary[i].def.pos == "noun") {
              nouns.push(dictionary[i])
          }
          if (dictionary[i].def.pos == "verb") {
              verbs.push(dictionary[i])
          }
          if (dictionary[i].def.pos == "adverb") {
              adverbs.push(dictionary[i])
          }
          if (dictionary[i].def.pos == "adjective") {
              adjective.push(dictionary[i])
          }
          if (dictionary[i].def.pos == "interjectiondef.) {
              interjections.push(dictionary[i])
          }
          if (dictionary[i].def.pos == "conjunction") {
              conjunctions.push(dictionary[i])
          }
          if (dictionary[i].def.pos == "pronoun") {
              pronouns.push(dictionary[i])
          }
          if (dictionary[i].def.pos == "preposition") {
              prepositions.push(dictionary[i])
          }
        // put all parts of speech into an array
        partsOfSpeech.push(nouns)
        partsOfSpeech.push(pronouns)
        partsOfSpeech.push(prepositions)
        partsOfSpeech.push(conjunctions)
        partsOfSpeech.push(interjections)
        partsOfSpeech.push(adjective)
        partsOfSpeech.push(adverbs)
        partsOfSpeech.push(verbs)
        
      }
      */
}let dictionary;
let nouns = []
let verbs = []
let pronouns = []
let adverbs = []
let prepositions = []
let adjectives = []
let interjections = []
let conjunctions = []
let partsOfspeech = []


function preload() {
    // Load the dictionary api
    var url =
        'https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=' +
        'dict.1.1.20180327T230419Z.6d25dfde82c18d74.bec30f3a04c740e5238f879e7021177e1364d520';
    // convert it to usable JSON  
    dictionary = loadJSON(url);

    // run through every word in the dictionary
    for (var i = 0; i < dictionary.length; i++) {
      
        // check the part of speech --- pos = part of speech
      
        // if the word is a noun, add it to the nouns array
        // if the word is a verb, add it to the verbs array
        // if the word is a adverb, add it to the adverbs array
        // and so on
      
        if (dictionary[i].pos == noun) {
            nouns.push(dictionary[i])
        }
        if (dictionary[i].pos == verb) {
            verbs.push(dictionary[i])
        }
        if (dictionary[i].pos == adverb) {
            adverbs.push(dictionary[i])
        }
        if (dictionary[i].pos == adjective) {
            adjective.push(dictionary[i])
        }
        if (dictionary[i].pos == interjection) {
            interjections.push(dictionary[i])
        }
        if (dictionary[i].pos == conjunction) {
            conjunctions.push(dictionary[i])
        }
        if (dictionary[i].pos == pronoun) {
            pronouns.push(dictionary[i])
        }
        if (dictionary[i].pos == preposition) {
            prepositions.push(dictionary[i])
        }
      // put all parts of speech into an array
      partsOfSpeech.push(nouns)
      partsOfSpeech.push(pronouns)
      partsOfSpeech.push(prepositions)
      partsOfSpeech.push(conjunctions)
      partsOfSpeech.push(interjections)
      partsOfSpeech.push(adjective)
      partsOfSpeech.push(adverbs)
      partsOfSpeech.push(verbs)
      
    }
}


function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220);
  phrases.display();
  phrases.rollover();

}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

let population;
let info;

function setup() {
  createCanvas(800, 124);
  colorMode(RGB, 1.0, 1.0, 1.0, 1.0);
  let popmax = 10;
  let mutationRate = 0.05; // A pretty high mutation rate here, our population is rather small we need to enforce variety
  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(mutationRate, popmax);
  // A simple button class
  button = createButton("evolve new generation");
  button.mousePressed(nextGen);
  button.position(10, 140);
  info = createDiv('');
  info.position(10, 175);
}

function draw() {
  background(1);
  // Display the faces
  population.display();
  population.rollover(mouseX, mouseY);
  info.html("Generation #:" + population.getGenerations());
}

// If the button is clicked, evolve next generation
function nextGen() {
  population.selection();
  population.reproduction();
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  for (var i = 0; i < population.length< i ++){
   population[i].fitness();
    population[i].selection();
    population[i].reproduction(); 
    
  }
}var result;
var dictionaries = [];
var button;


function preload() {
    result = loadStrings('words_alpha.txt');
}

function setup() {
    createCanvas(400, 600);
    background(200);
    textAlign(CENTER);
    newCombos();
    button = createButton('refresh')
    button.position(0, 0)
    button.mousePressed(refresh);

}


function refresh() {
    background(220);
    newCombos();
}

function draw() {
    c = 0
    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 5; y++) {
            // dictionaries[c] = new TwoWords(result)
            dictionaries[c].display(x, y);
            dictionaries[c].update(x, y);
            c++
        }
    }
}


///////////



function newCombos() {

    c = 0
    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 5; y++) {
            dictionaries[c] = new TwoWords(result)
            dictionaries[c].display(x, y);
            c++
        }
    }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}let img, orig;
let flowField;
let imgRow = [];
let imgPixels = [];
let particles = [];
let showEdge = false;
let resolution = 16;

function preload() {
    img = loadImage('lena_bin.bmp');
    orig = loadImage('lena.bmp');
}

function setup() {
    let text1 = createP("Keep moving your mouse to add particles!");
    let text2 = createP("Spacebar: show edges");
    let text3 = createP("Enter/Return: refresh canvas");
    text1.position(10, 520);
    text2.position(10, 560);
    text3.position(10, 580);

    createCanvas(512, 512);

    img.loadPixels();
    console.log(img.pixels);

    for (let i = 0; i < img.pixels.length; i += 4) {
        let edge = {
            "grayScale": round(0.2989 * img.pixels[i] + 0.5870 * img.pixels[i + 1] + 0.1140 * img.pixels[i + 2]),
            "isOccupied": false
        }
        if (i % resolution != 0) edge.grayScale = 0;
        imgRow.push(edge);
        if (i != 0 && (i / 4) % 512 == 511) {
            imgPixels.push(imgRow);
            imgRow = [];
        }
    }



    console.log(imgPixels);


}

function draw() {

    if (particles.length < 3000) {
        background(220);
        for (particle of particles) {
            //console.log(particle.target);
            particle.seek();
            particle.update();
            particle.show();
        }

        let cnt = 0;
        if (showEdge == true) {
            for (let i = 0; i < imgPixels.length; i += 1) {
                for (let j = 0; j < imgPixels[i].length; j += 1) {
                    if (imgPixels[i][j].grayScale != 0) {
                        strokeWeight(2)
                        stroke(255, 0, 0);
                        point(j, i);
                        cnt++;
                    }

                }
            }
            console.log("total tagets: " + cnt);
        }
    }

    if (particles.length > 2500) {
        let alpha = map(particles.length, 2500, 3000, 0, 255);
        tint(255, alpha);
        image(orig, 0, 0);

    }
}

function mouseMoved() {
    mouseX = constrain(mouseX, 0, width);
    mouseY = constrain(mouseY, 0, height);
    if (particles.length < 3000) {
        //console.log(mouseX + "  " + mouseY);
        let newParticle = new Particle(mouseX, mouseY, pmouseX, pmouseY, imgPixels);
        if (!newParticle.target.equals(0, 0)) particles.push(newParticle);
        console.log(particles.length);
    }
}

function keyPressed() {
    if (key == ' ') {
        showEdge = !showEdge;
    }
    if (keyCode == RETURN || keyCode == ENTER) {

        particles = [];
        clear();
        if (showEdge == true) showEdge = false;
    }

}// Inspired and massively helped by
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var video;
// var video2;
var vScale = 40;
var attractors = [];
let movers = [];
var boolean = true;

function setup() {
    createCanvas(400, 400);
    pixelDensity(1);
    video = createCapture(VIDEO);
    // video2 = video;
    video.size(width / vScale, height / vScale);

    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {
            attractors.push(new Attractor(x * vScale, y * vScale));
        }
        movers.push(new Mover(random(width), random(height)));
    }

    for (var i = 0; i < attractors.length; i++) {
        attractors[i].updateIndex(i)
    }

}


function draw() {
    translate(20, 20)

    background(20, 20);
    video.loadPixels();
    // createImage(video2, 0, 400)

    for (var p = 0; p < attractors.length; p++) {

        attractors[p].update();
        attractors[p].display();

        for (var i = 0; i < movers.length; i++) {
            movers[i].seek(attractors[p].pos, attractors[p].rad * 0.5);
            movers[i].checkEdges();

            movers[i].update();

            movers[i].display(attractors[i].rad);

        }
    }


}// Inspired and massively helped by
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var video;
var vScale = 10;
var attractors = [];
let movers = [];

function setup() {
    createCanvas(420, 420);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(width / vScale, height / vScale);

    for (var i = 0; i < 100; i++) {
        movers.push(new Mover(200, 200));
    }

    for (var y = 0; y < video.height; y += 4) {
        for (var x = 0; x < video.width; x += 4) {
            attractors.push(new Attractor(x * vScale, y * vScale));
        }
    }
}


function draw() {
    translate(20, 20)
    background(20,20);
    video.loadPixels();

    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {
          
            i = x + y;
            attractors[i].update(x, y);
        }
    }

    for (var i = 0; i < movers.length; i++) {
        movers[i].seek(attractors[i].pos);
        movers[i].update(attractors[i]);
        movers[i].display(attractors[i].rad);
    }

    console.log(attractors.length)

}// Inspired and massively helped by
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var video;
var vScale = 10;
var attractors = [];
let movers = [];

function setup() {
    createCanvas(420, 420);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(width / vScale, height / vScale);

    for (var i = 0; i < 100; i++) {
        movers.push(new Mover(200, 200));
    }

    for (var y = 0; y < video.height; y += 4) {
        for (var x = 0; x < video.width; x += 4) {
            attractors.push(new Attractor(x * vScale, y * vScale));
        }
    }
}


function draw() {
    translate(20, 20)
    background(20,20);
    video.loadPixels();

    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {
          
            i = x + y;
            attractors[i].update(x, y);
        }
    }

    for (var i = 0; i < movers.length; i++) {
        movers[i].seek(attractors[i].pos);
        movers[i].update(attractors[i]);
        movers[i].display(attractors[i].rad);
    }

    console.log(attractors.length)

}let movers = [];
var video;
var vScale = 40;
var attractors = [];
var videoHeight;
var videoWidth;
var origin = [];


function setup() {
    createCanvas(400, 400);
    background(0);
    noStroke()
    colorMode(HSB)
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(width / vScale, height / vScale);
    colorMode(HSB)
    makeAttractorsAndMovers();

    attractorsLength = attractors.length;

    videoHeight = video.height
    videoWidth = video.width;

}


function draw() {

    background(0, 5);
    translate(20, 20);
    video.loadPixels();

    for (var i = 0; i < movers.length; i++) {
        origin = createVector(attractors[i].pos.x, attractors[i].pos.y)

        attractors[i].update();
        attractors[i].display();
        movers[i].seek(origin)
        //  movers[i].seek(attractors[i]);

        movers[i].update();
        movers[i].display(attractors[i].rad);

        if (mouseIsPressed) {
            origin = createVector(mouseX, mouseY)
            movers[i].seek(origin)
        }
    }


}

function makeAttractorsAndMovers() {
    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {
            attractors.push(new Attractor(x * vScale, y * vScale));
        }
    }
    for (var i = 0; i < 100; i++) {
        movers.push(new Mover(random(width), random(height)));
    }
}let movers = [];
var video;
var vScale = 40;
var attractors = [];
var origin = [];


function setup() {
    createCanvas(400, 400);
    background(0);

    for (var i = 0; i < 100; i++) {
        movers.push(new Mover(200, 200));
    }

    noStroke()
    colorMode(HSB)
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(width / vScale, height / vScale);
    colorMode(HSB)
    makeAttractors();

}

function draw() {

    background(0, 5);
    translate(20, 20);
    video.loadPixels();
    //loadPixels();

    for (var i = 0; i < movers.length; i++) {
        origin = createVector(attractors[i].pos.x, attractors[i].pos.y)
        movers[i].seek(origin)
        //  movers[i].seek(attractors[i]);

        movers[i].update();
        movers[i].display();
    }

    if (mouseIsPressed) {
        for (var j = 0; j < movers.length; j++) {
            origin = createVector(mouseX, mouseY)
            movers[j].seek(origin)
        }


    }

  for 
  
    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {
            i = x + y;
            attractors[i].update(x, y);
            attractors[i].display();
        }
    }
    console.log(attractors.length);

}


function makeAttractors() {
    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {
            attractors.push(new Attractor(x * vScale, y * vScale));
        }
    }
}// Inspired and massively helped by
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var video;
var vScale = 10;
var attractors = [];
let movers = [];
let wind;
let offset = 1;

function setup() {
    createCanvas(400, 400);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(width / vScale, height / vScale);

}


function draw() {
    translate(20, 20)
    background(20);
    video.loadPixels();
    makeAttractors();
}

function makeAttractors() {
    for (var y = 0; y < video.height; y += 4) {
        for (var x = 0; x < video.width; x += 4) {
            i = x + y;
            attractors[i] = new Attractor(x * vScale, y * vScale);
            attractors[i].update(x, y);
        }
    }
}var video;
var vScale = 10;
var attractors = [];
// var Attractor;


//noprotect

function setup() {
    createCanvas(400, 400);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(width / vScale, height / vScale);
}

function draw() {
    background(20);

    video.loadPixels();
    loadPixels();
    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {
            var index = (video.width - x + 1 + (y * video.width)) * 4;
            var r = video.pixels[index + 0];
            var g = video.pixels[index + 1];
            var b = video.pixels[index + 2];

            var bright = (r + g + b) / 3;

            var w = map(bright, 0, 255, 0, vScale * 1.5);

            noStroke();
            fill(255, 150);
            push();
            ellipseMode(CENTER);
            // translate(-vScale/2,-vScale/2);

            let i = x + y
            // ellipse(x * vScale, y * vScale, w, w);
            attractors[i] = new Attractor(x * vScale, y * vScale, w, w);
            attractors[i].display();

            pop();

        }
    }

    // Attractor.checkOccupied();
    // Attractor.update();

}let img;

function setup() {
  createCanvas(400, 400);
  img = loadImage("Bat_Symbol.jpg");
  sorted = createImage(img.width, img.height,RGB)
  sorted.loadPixels();
  for(let i = 0; sorted.pixels.length; i++){
    sorted.pixels[i] = color(random(255));
  }
  
  sorted.updatePixels();
  
  
  
}

function draw() {
  background(220);
  scale(0.37)
  image(img,0,0);
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// aliasing (when you have to rename stuff from another library
// helps reduce typing and labeling issues in new code
// So "const" prevents that variable from being edited later in code

const World = Matter.World;
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Vector = Matter.Vector;

let mover;

let movers = [];


let attractor;
let engine;
let world;

let ground;


function setup() {
    let options = {
        velocityIterations: 4,
        timing: {
            timeScale: 1
        }
    }
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 0.1;


    createCanvas(640, 360);

    for (let i = 0; i < 10; i++) {
        movers[i] = new Mover(10,40);

    }


    let bOptions = {
        isStatic: true
    }

    attractor = new Attractor();
    ground = Bodies.rectangle(width / 2, height + 5, width, 10, bOptions);
    World.add(world, ground);
    Engine.run(engine);

}

function draw() {
    background(200);
  
 attractor.display(); 
    for (let mover of movers) {
        let force = attractor.calculateAttraction(mover);
        mover.applyForce(force);
        mover.display();
    }
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
}let origin;
let bobs = [];
let x;
let y;
let angle = 0;
let radius = 90

function setup() {
    createCanvas(400, 400);
    bobs[0] = new Mover(width / 2, 20)
    bobs[1] = new Brush(width / 2, 220)
    bobs[2] = new Pencil(width / 2, 120);
    background(0);
  noStroke()
  colorMode(HSB,100)

}

function draw() {
    background(0, 5);

    wind = createVector(2, 0)


      // x = mouseX
      // y = mouseY

  translate(200,200)
  
  
    x = sin(angle) * radius 
    y = cos(angle) * radius
  
  let x2 = sin(angle) * radius * 0.9
  let y2 = cos(angle) * radius * 0.9
  
 let x3 = sin(angle) * radius * 0.8
 let y3 = cos(angle) * radius * 0.8

      origin = createVector(x, y);
  let origin2 = createVector(x2,y2);
  let origin3 = createVector(x3,y3);

  
  fill(0,255,255,50)
  ellipse(origin.x, origin.y,20,20)
  fill(10,255,255,80)
  ellipse(origin2.x, origin2.y,20,20)
  fill(20,255,255,100)
  ellipse(origin3.x, origin3.y,20,20)


//     for (var i = 0; i < bobs.length; i++) {

//         bobs[i].seek(origin)
//         bobs[i].update()
//         bobs[i].display()

//         if (mouseIsPressed) {
//             bobs[i].applyForce(wind)
//         }
      
      

//     }

    angle += 0.05

    //   console.log(x)

    //   fill(220)
    //   ellipse(x,y,40,40)

}let origin;
let bobs = [];
let x;
let y;
let angle = 0;
let radius = 90

function setup() {
    createCanvas(400, 400);
    bobs[0] = new Mover(width / 2, 20)
    bobs[1] = new Brush(width / 2, 220)
    bobs[2] = new Pencil(width / 2, 120);
    background(0);
  noStroke()

  colorMode(HSB)

}

function draw() {
    background(0, 5);

    wind = createVector(2, 0)


    //   x = mouseX
    //   y = mouseY

    x = sin(angle) * radius + 200
    y = cos(angle) * radius + 200

    origin = createVector(x, y);


    for (var i = 0; i < bobs.length; i++) {

        bobs[i].seek(origin)
        bobs[i].update()
        bobs[i].display()

        if (mouseIsPressed) {
            bobs[i].applyForce(wind)
        }
      
      

    }

    angle += 0.05

      console.log(x)

      fill(220,255,255,50)
      ellipse(x,y,40,40)

}let origin;
let bobs = [];
let x;
let y;
let angle = 0;
let radius = 90

function setup() {
    createCanvas(400, 400);
    bobs[0] = new Mover(width / 2, 20)
    bobs[1] = new Brush(width / 2, 220)
    bobs[2] = new Pencil(width / 2, 120);
    background(0);
  colorMode(HSB)

}

function draw() {
    background(0, 5);

    wind = createVector(2, 0)


    //   x = mouseX
    //   y = mouseY

    x = sin(angle) * radius + 200
    y = cos(angle) * radius + 200

    origin = createVector(x, y);


    for (var i = 0; i < bobs.length; i++) {

        bobs[i].seek(origin)
        bobs[i].update()
        bobs[i].display()

        if (mouseIsPressed) {
            bobs[i].applyForce(wind)
        }
      
      

    }

    angle += 0.05

    //   console.log(x)

      fill(20,255,255,20)
      ellipse(x,y,10,10)

}let origin
let bob
// let len = 180;
// let angle = 0;
// let aVel = 0.1;
// let aAcc = 0.1;
let restLen = 20;
let gravity;
// let springForce = 0.01
let x;
let y;

function setup() {
    createCanvas(400, 400);
    bob = new Mover(width / 2, 20)
    background(0);

}

function draw() {
    origin = createVector(x, y);
  background(0,15)

    // background(0,50);
    x = mouseX
    y = mouseY
    stroke(255, 0, 0, 75)
    line(origin.x, origin.y, bob.pos.x, bob.pos.y)

    let spring = new p5.Vector.sub(bob.pos, origin)
    let currentLen = spring.mag()
    spring.normalize();
    let k = 0.01
    let stretch = currentLen - restLen
    spring.mult(-k * stretch)
    bob.applyForce(spring)

    if (mouseIsPressed) {

        wind = new p5.Vector(0.1, 0)
        bob.applyForce(wind);
        console.log("t")
    }

    gravity = new p5.Vector(0, 0.1)
    bob.applyForce(gravity);

    bob.update()
    bob.display()


}

let wind;
// function mousePressed() {

//   wind = new p5.Vector(0.1,0)
//    bob.applyForce(wind); 
//     console.log("t")


// }let origin
let bob
let len = 180;
let angle = 0;
let aVel = 0.1;
let aAcc = 0.1;

function setup() { 
  createCanvas(400, 400);
  origin = createVector(width/2,0);
  bob = createVector(width/2,len);
} 

function draw() { 
  background(220);
  
  bob.x = origin.x + len * sin(angle)
  bob.y = origin.y + len * cos(angle)
  
  line(origin.x, origin.y, bob.x, bob.y)
  ellipse(bob.x,bob.y,32,32)
  
  // angle = map(mouseX,0,400,-PI,PI)
  aAcc = -0.01 * sin(angle)
	  angle += aVel  
  aVel += aAcc
  aVel *= 0.97
  // console.log(aAcc)

}var attractors = [];
var particles = [];

function setup() {
    createCanvas(400, 400);
    background(0);
    for (var i = 0; i < 5; i++) {
        attractors.push(createVector(200 ,i*80));
    }
    for (i = 0; i < 20; i++) {
        particles.push(new Particle(200,400));
    }
}

function draw() {
    // stroke(255, 0, 0)
    strokeWeight(3)
    // background(0, 15);
    for (var i = 0; i < attractors.length; i++) {
        point(attractors[i].x, attractors[i].y);
    }


    for (var p = 0; p < particles.length; p++) {
      var particle = particles[p]
        for (var j = 0; j < attractors.length; j++) {
            particle.attracted(attractors[j]);
        }
        particle.update()
        particle.show()

    }
}let fireworks = [];
let rockets = [];
let gravity;


function setup() {
    createCanvas(400, 400);
    gravity = createVector(0, 0.2);

    // background(0)

}


function draw() {
    background(0)
  
  function showRockets() {
    for (i = 0; i < rockets.length; i++) {
        rockets[i].update()
        rockets[i].display()
        rockets[i].applyForce(gravity)
    }
}

function rocketsExplode() {
    rockets.forEach(rocket => {
        if (rocket.velocity.y > 0) {
            rockets.splice(rocket, 1)
            let f = new Firework(rocket.position.x, rocket.position.y)
            fireworks.push(f)
            fireworks.add = 3
        }
    })

    for (var i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update()
        fireworks[i].display()
        // fireworks.applyForce(gravity)
        if (fireworks[i].done()) {
            fireworks.splice(i, 1)
        }
    }

    fireworks.forEach(firework => {
        if (firework.alpha <= 0) {
            fireworks.splice(0, 1)
        }
    })

setInterval(function(){
    rockets.push(new Firework(random(width), 400))
},500)

    console.log(fireworks.length)
}
}






function showRockets() {
    for (i = 0; i < rockets.length; i++) {
        rockets[i].update()
        rockets[i].display()
        rockets[i].applyForce(gravity)
    }
}

function rocketsExplode() {
    rockets.forEach(rocket => {
        if (rocket.velocity.y > 0) {
            rockets.splice(rocket, 1)
            let f = new Firework(rocket.position.x, rocket.position.y)
            fireworks.push(f)
            fireworks.add = 3
        }
    })
}
var fireworks = [];
var rockets = [];
var gravity;


function setup() {
    createCanvas(400, 400);
  gravity = createVector(0,0.2);

  // background(0)

}


function draw() {
    background(0,25)
 for (var i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update()
        fireworks[i].display()
        // fireworks.applyForce(gravity)
        // if (fireworks[i].done()) {
        //     fireworks.splice(i, 1)
        // }
    }    showRockets();
    rocketsExplode();
    fireworksDisappear();
    if(mouseIsPressed){
    mousePressed()
    }
    console.log(fireworks.length)
}

function mousePressed() {
    rockets.push(new Rocket(mouseX,400))
}

function fireworksDisappear() {
    fireworks.forEach(firework => {
        if (firework.alpha <= 0) {
            fireworks.splice(0, 1)
        }
    })
}


function showRockets() {
    for (i = 0; i < rockets.length; i++) {
        rockets[i].update()
        rockets[i].display()
        rockets[i].applyForce(gravity)

    }
}


function rocketsExplode() {
    rockets.forEach(rocket => {
        if (rocket.velocity.y > 0) {
            rockets.splice(rocket, 1)
            let f = new Firework(rocket.position.x, rocket.position.y)
            fireworks.push(f)
            fireworks.add = 3
        }
    })
}

var fireworks = [];
var gravity;


function setup() {
    colorMode(HSB)
    createCanvas(400, 400);
    gravity = createVector(0, 0.2);
  stroke(255)
  strokeWeight(4)
    // background(0)

}


function draw() {
  colorMode(RGB)
    background(0,0,0, 20)
    if (mouseIsPressed) {
        mousePressed();
    }
    for (var i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show();

        if (fireworks[i].done()) {
            fireworks.splice(i, 1);
        }
    }
}

function mousePressed() {
    fireworks.push(new Firework())
}var particles = [];

function setup() {
    createCanvas(400, 400);
    setInterval(fireworks, 100)

}

function draw() {
    background(100,200,255)
    for (var i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].display()
        console.log(particles.length)
        if (particles.length > 20) {
            particles.splice(0, 1)
        }

    }
}

function fireworks() {
    let f = new Particle(random(50, 350), random(50, 350))
    particles.push(f)
    particles.add = 5
}var particles = [];

function setup() {
    createCanvas(400, 400);
    setInterval(fireworks, 200)

}

function draw() {
    background(0)
    for (var i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].display()
        console.log(particles.length)
        if (particles.length > 10) {
            particles.splice(0, 1)
        }

    }
}

function fireworks() {
    let f = new Particle(random(50, 350), random(50, 350))
    particles.push(f)
    // particles.add = 5
}var particles = [];
var angle = 0;
var move = 1;
var radius = 0;


function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(0)

    if (mouseIsPressed) {
        let f = new Particle(mouseX, mouseY)
        particles.push(f)
        particles.add = 2
    }
  
   for (var i = 0; i < particles.length; i++){
   particles[i].update()
   particles[i].display()
     console.log(particles[0].add)
   }
}function setup() { 
  createCanvas(400, 400);
  
      let arr = [1, 4, 5, 2];
    console.log(arr)

    arr = arr.map(doubleIt)

    // can also put function inside parenthesis: 
    // arr.map(function(x) {return x * 2} )

    console.log(arr)

    function doubleIt(x) {
        return x * 2
    }
  
    // function factory:
    let doubler = multiplier(2)
    let tripler = multiplier(3)

    function multiplier(factor) {
        return function(x) {
            return x * factor;
        }
    }

    let a = 2
  
    console.log(doubler(a))
    console.log(tripler(a))
  
} 

function draw() { 
  background(220);
  
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let particles = [];


function setup() {
    createCanvas(400, 360);
}


function draw() {
    background(51);
    particles.push(new Particle(createVector(width / 2, 20)));

    // deletes "dead" particles from array
    // uses => syntax to describe function
    particles = particles.filter(p => !p.isDead());
    
    // for -- of loop that runs everything 
    // particle = local variable 
    for (let particle of particles){
      particle.run();
    }
  
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i]
        p.run();
    }
    console.log(particles.length)
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
let mover;

let attractor;

function setup() {
  createCanvas(320, 320);
  mover = new Mover();
  attractor = new Attractor();
  noStroke();

}

function draw() { 
  background(150,100,150);
	  fill(200,100)
  triangle(0,0,0,320,320,320)
  
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
}var particles = [];
var angle = 0;
var move = 1;
var radius = 60;
var Red = 255
var Green = 255;
var Blue = 0;
var Alpha = 250;
var offset = 0


function setup() {
    createCanvas(400, 400);

    for (var i = 0; i < 1; i++) {
        var p = new Particle(angle, move, radius, Red, Green, Blue, Alpha)
        particles.push(p)
        move -= 0.01;
        radius -= offset
        offset += 1.6
        Red -= 15
        Green -= 50
        Blue += 15;
        Alpha -= 10;
    }

}

function draw() {
    background(0)
    for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
      }
}var particles = [];
var angle = 0;
var move = 1;
var radius = 60;
var Red = 255
var Green = 255;
var Blue = 0;
var Alpha = 250;
var offset = 0


function setup() {
    createCanvas(400, 400);

    for (var i = 0; i < 10; i++) {
        var p = new Particle(angle, move, radius, Red, Green, Blue, Alpha)
        particles.push(p)
        move -= 0.01;
        radius -= offset
        offset += 1.6
        Red -= 15
        Green -= 50
        Blue += 15;
        Alpha -= 10;
    }

}

function draw() {
    background(0)
    for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
      }
}var particles = [];
var angle = 0;
var move = 1;
var radius = 100;
var Red = 255
var Green = 255;
var Blue = 0;
var Alpha = 200;
var offset = 0


function setup() {
    createCanvas(400, 400);
    // particles = new Particle(angle, move, radius, Red, Green, Blue, Alpha);

    for (var i = 0; i < 30; i++) {
        var p = new Particle(angle, move, radius, Red, Green, Blue, Alpha)
        particles.push(p)

        move -= 0.01;
        radius = 150 - offset
        offset += 10
        Red -= 25
        Green -= 10
        Blue += 50;
    }

}

function draw() {
    background(0)

      for (var i = 0; i < particles.length; i++) {

    particles[i].update();
    particles[i].display();

      }
}// var particle;

function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
  
  // particle = new Particle(angle,move,radius,r,g,b,alpha);
  // particle = new Particle(0,1,100,255,255,0,100);

  
}

var angle = 0;
var angle1 = 0;
var angle2 = 0;
var move = 1;
var move1 = 0.8;
var move2 = 0.4;

function draw() {
        background(0)

    var x = 200;
    var y = 200;

    stroke(255);
    strokeWeight(8);
    // point(x, y);

    var r = 100;
    var r1 = 80;
    var r2 = 40;

    dx = r * cos(angle);
    dy = r * sin(angle);
  
    dx1 = r1 * cos(angle1);
    dy1 = r1 * sin(angle1);
  
    dx2 = r2 * cos(angle2);
    dy2 = r2 * sin(angle2);
  
    stroke(255,255,0,220);
    point(x + dx, y + dy);
  line(x + dx, y + dy, x + dx1, y + dy1)
  
    stroke(255,80,200,220);
    point(x + dx1, y + dy1);
  line(x + dx1, y + dy1,x + dx2, y + dy2)
    stroke(0,150,255,220);
    point(x + dx2, y + dy2);
  line(x + dx2, y + dy2,x + dx, y + dy)
  
  
    
  
    // line(x, y, x + dx, y + dy);

    angle += move
      angle1 += move1
    angle2 += move2


//     if (angle > 360 || angle < 0) {
//         move *= -1
//               move1 *= -1
//         move2 *= -1

//     }


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
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let movers = [];

function setup() {
  createCanvas(340, 260);
  for (let i = 0; i < 20; i++) {
    movers[i] = new Mover(random(1, 4), random(width), random(0,200));
  }
}

function draw() {
  background(51);

  for (let i = 0; i < movers.length; i++) {
    let wind = createVector(0.01, 0);
    // wouldn't multiplying the gravity.y by movers[i] mass give them each
    // different gravity force amounts?
    let gravity = createVector(0, 0.1 * movers[i].mass);
    
    
    let c = 0.01;
    let normal = 1;
    let frictionMag = c * normal;
    let friction = movers[i].velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(frictionMag);

    console.log(frictionMag)

    movers[i].applyForce(friction);  
    movers[i].applyForce(wind);
    movers[i].applyForce(gravity);
    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let movers = [];

function setup() {
  createCanvas(340, 260);
  for (let i = 0; i < 20; i++) {
    movers[i] = new Mover(random(1, 4), random(width), random(0,200));
  }
}

function draw() {
  background(51);

  for (let i = 0; i < movers.length; i++) {
    let wind = createVector(0.01, 0);
    // wouldn't multiplying the gravity.y by movers[i] mass give them each
    // different gravity force amounts?
    let gravity = createVector(0, 0.1 * movers[i].mass);
    movers[i].applyForce(wind);
    movers[i].applyForce(gravity);
    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let movers = [];

function setup() {
  createCanvas(640, 360);
  for (let i = 0; i < 20; i++) {
    movers[i] = new Mover(random(0.1, 5), 0, 0);
  }
}

function draw() {
  background(51);

  for (let i = 0; i < movers.length; i++) {
    let wind = createVector(0.01, 0);
    let gravity = createVector(0, 0.1);
    movers[i].applyForce(wind);
    movers[i].applyForce(gravity);
    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let m;
let off = 0;

function setup() {
  createCanvas(200, 160);
  m = new Mover();
  
}

function draw() {
  background(51);
  let wForce = map(noise(off),0,1,-0.01,0.01)
  let gForce = map(noise(off),0,1,-0.1,0.1)
  off+=1

  console.log(wForce)
  
  let wind = createVector(wForce, 0);
  let gravity = createVector(0, gForce);
  m.applyForce(wind);
  m.applyForce(gravity);


  m.update();
  m.display();
  m.checkEdges();

}
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Demonstration of the basics of motion with vector.
// A "Mover" object stores position, velocity, and acceleration as vectors
// The motion is controlled by affecting the acceleration (in this case towards the mouse)

let movers = [];

function setup() {
  createCanvas(640,360);
  for (var i = 0; i < 20; i++) {
     movers[i] = new Mover();
  }
}

function draw() {
  background(51);
  for (let i = 0; i < movers.length; i++) {
    movers[i].update();
    movers[i].display();
  }
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let mover;

function setup() {
  createCanvas(640,360);
  mover = new Mover();
}

function draw() {
  background(51);

  mover.update();
  mover.checkEdges();
  mover.display();
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let mover;

function setup() {
  createCanvas(240,160);
  mover = new Mover(); 
}

function draw() {
  background(51);

  mover.update();
  mover.checkEdges();
  mover.display();
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Demonstration of normalizing a vector.
// Normalizing a vector sets its length to 1.

function setup() {
  createCanvas(140,160);
}

function draw() {
  background(51);

  // A vector that points to the mouse position
  let mouse = createVector(mouseX,mouseY);
  // A vector that points to the center of the window
  let center = createVector(width/2,height/2);
  // Subtract center from mouse which results in a vector that points from center to mouse
  mouse.sub(center);

  // Normalize the vector
  mouse.normalize();

  // Multiply its length by 150
  mouse.mult(150);

  translate(width/2,height/2);
  // Draw the resulting vector
  stroke(255);
  strokeWeight(2);
  line(0,0,mouse.x,mouse.y);
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Example 1-5: Vector magnitude

function setup() {
  createCanvas(100,160);
}

function draw() {
  background(51);

  let mouse = createVector(mouseX,mouseY);
  let center = createVector(width/2,height/2);
  mouse.sub(center);

  let m = mouse.mag();
  fill(255);
  stroke(0);
  rect(0,0,m,10);

  translate(width/2,height/2);
  strokeWeight(2);
  stroke(255);
  line(0,0,mouse.x,mouse.y);
}// If I put the movement into one particle
// and apply physics to a system to move that particle
// then I can have wind move a particle around 
// that is moving in this curly fashion
// to form a swirly pattern

var offset = 1
var angle1 = 0;
var scalar = 70;
var xpos = 0;
var yoff = 200;
let Switch = true;
var ypos = 200;
 var add;
var ang1;

function setup() {
    createCanvas(500, 400);
    background(0);

}

function draw() {
    var prevXpos = xpos + noise(add)
    var prevYpos = ypos + 5
    ang1 = radians(angle1)
    add = sin(ang1) + map(noise(offset), 0, 1, -0.5, 1)

  offset++;
    ypos = yoff + (scalar * sin(ang1));
  
setInterval(pickMove(),1000)
    strokeWeight(4)
    stroke(255, 204, 0, 140);
    line(xpos, ypos, prevXpos, prevYpos);

    if (Switch == true) {
        angle1++;
        xpos += add;
        if (xpos >= width) {
            xpos = width
            Switch = false
            // yoff += 50
        }
    }
    if (Switch == false) {
        angle1++;
        xpos -= add;
        if (xpos < 0) {
            xpos = 0
            Switch = true
        }
    }
    // console.log(counter)
}

function pickMove(){
  let counter = noise(offset)
if (counter > 0.5) {
    add = cos(ang1) + map(noise(offset), 0, 1, -0.5, 1)
}
  if (counter <= 0.5) {
    add = sin(ang1) + map(noise(offset), 0, 1, -0.5, 1)
}
  console.log(add)
}
  var offset = 5
var angle1 = 0;
var scalar = 70;
var xpos = 0;
var yoff = 200;
let Switch = true;

function setup() {
    createCanvas(500, 400);
    noStroke();
    background(0);

}

function draw() {
  var add = offset
  
  if (ypos > height){
  ypos = height
  offset *= -1
}
   if (ypos < 0){
  ypos = 0
  offset *= -1
}
  

    var ang1 = radians(angle1+add)
  offset++;
    var ypos = yoff+ add + (scalar * sin(ang1));
    // Need to add height/2 in order to center the drawing
    // ang is adding by a small amount each time
    // scalar amplifies the value returned by sin()

    // console.log(int(ypos) + "," + int(yoff) + "," + int(ang1))

    fill(255, 204, 0, 40);
    ellipse(xpos, ypos, 5, 5);

    if (Switch == true) {
        angle1 += noise(offset);
        xpos += map(noise(offset),0,1,0,3);
        if (xpos >= width) {
            xpos = width
            Switch = false
            // yoff += 50
        }
    }
    if (Switch == false) {
        angle1 += noise(offset);
        xpos -= map(noise(offset),0,1,0,3);
        if (xpos < 0) {
            xpos = 0
            Switch = true
        }
    }

}var particles =[]
// let degree = 0.01745329251

function setup() {
    createCanvas(400, 400);
    for (var i = 0; i<20; i++){
        particles.push(new Particle(random(300), random(300)))
  }

}

function draw() {
    background(220);
  for (var i = 0; i < particles.length; i++){
    particles[i].update();
    particles[i].show();
  }

   
    // if (particles.history > 40){
    //   shorten(particles.history)
    // }
      // console.log(particles.history.length)

}var particle;
// let degree = 0.01745329251

function setup() {
    createCanvas(400, 400);
    background(220);
    particle = new Particle(200, 200);

}

function draw() {
    background(220);
    particle.update();
    particle.show();

}let particles = [];
let degree = 0.01745329251

function setup() {
    createCanvas(400, 400);
    background(220);
    let p = new Particle();
    for (var i = 0; i < TWO_PI; i += degree) {
        particles.push(p);
    }

}

function draw() {
    for (var i = 0; i < particles.length; i++) {
        particles[i].show();
        particles[i].update();
    }
}// THANKS TO:
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com



function setup() {
    createCanvas(400, 400);
    background(220);
  randomSeed(15);
}

function draw() {
  
  // Red += 0.1
    // Green -= 0.1
    // Blue = sin(Blue)
  
  // if Red > 255
  // Red -= 0.1
// }
  
  
    console.log(movement);

    if (mouseIsPressed) {
        movement = 0;
    } else {
        for (j = 0; j < 20; j++) {
            for (var i = 0; i < walkers.length; i++) {
                walkers[i].render();
                walkers[i].step();
            }
            movement = 1;
        }
    }

}

let range = [255]

function mousePressed() {
    walkers.push(new Walker());
    // walkers.[i].render(range[random],range[random],range[random]);
}


var inc = 0.1;
var scl = 10;
var col, rows;

var particles = [];

var flowfield;

function setup() {
      createCanvas(400, 400);

      background(1);

  fill(100)
  textAlign(CENTER)
  textSize(20)
  text("Move your cursor around",200,200)
    cols = floor(width / scl);
    rows = floor(height / scl);

    flowfield = new Array(cols * rows);

    for (var i = 0; i < 100; i++) {
        particles[i] = new Particle();
    }

}

var xoff = 0;
var zoff = 0;


function draw() {
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            var index = (x + y * cols);
            var angle = noise(xoff, yoff, zoff) * TWO_PI
            var v = p5.Vector.fromAngle(angle);
            v.setMag(0.5);
            flowfield[index] = v;
            xoff += inc;
            stroke(0, 50);

        }
        yoff += inc
        zoff += 0.002
    }
    for (var i = 0; i < particles.length; i++) {

        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].show();
        particles[i].edges();

    }
}var inc = 0.1;
var scl = 10;
var col, rows;

var particles = [];

var flowfield;

function setup() {
    createCanvas(400, 400);
    cols = floor(width / scl);
    rows = floor(height / scl);

    flowfield = new Array(cols * rows);

    for (var i = 0; i < 100; i++) {
        particles[i] = new Particle();
    }
    background(255);

}

var xoff = 0;
var zoff = 0;


function draw() {
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            var index = (x + y * cols);
            var angle = noise(xoff, yoff, zoff) * TWO_PI
            var v = p5.Vector.fromAngle(angle);
            v.setMag(0.5);
            flowfield[index] = v;
            xoff += inc;
            stroke(0, 50);

            // stroke(0,50);
            // push();
            // translate(x * scl, y * scl)
            // rotate(v.heading());
            // line(0, 0, scl, 0);
            // pop();
        }
        yoff += inc
        zoff += 0.002
    }
    for (var i = 0; i < particles.length; i++) {
        particles[i].edges();
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].show();

    }
}var inc = 0.1;
var scl = 10;
var col, rows;

var particles = [];

var flowfield;

function setup() {
    createCanvas(400, 400);
    cols = floor(width / scl);
    rows = floor(height / scl);

    flowfield = new Array(cols * rows);

    for (var i = 0; i < 100; i++) {
        particles[i] = new Particle();
    }
    background(255);

}

var xoff = 0;
var zoff = 0;


function draw() {
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            var index = (x + y * cols);
            var angle = noise(xoff, yoff, zoff) * TWO_PI
            var v = p5.Vector.fromAngle(angle);
            v.setMag(0.5);
            flowfield[index] = v;
            xoff += inc;
            stroke(0, 50);

        }
        yoff += inc
        zoff += 0.002
    }
    for (var i = 0; i < particles.length; i++) {

        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].show();
        particles[i].edges();

    }
}var inc = 0.1;
var scl = 10;
var col, rows;

function setup() {
    createCanvas(400, 400);
    cols = floor(width / scl);
    rows = floor(height / scl);

}

var xoff = 0;
var zoff = 0;

function draw() {
    background(255);
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            var index = (x + y * width) * 4;
            var angle = noise(xoff, yoff, zoff) * TWO_PI
            // var r = noise(xoff, yoff, zoff) * 255;
            var v = p5.Vector.fromAngle(angle);
            xoff += inc;
            stroke(0);
            push();
            translate(x * scl, y * scl)
            rotate(v.heading());
            line(0, 0, scl, 0);

            pop();
        }
        yoff += inc
      zoff += 0.002
    }
}var inc = 0.1;
var scl = 10;
var col, rows;

function setup() {
    createCanvas(400, 400);
    cols = floor(width / scl);
    rows = floor(height / scl);

}

var xoff = 0;

function draw() {
    background(255);
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            var index = (x + y * width) * 4;
            var angle = noise(xoff, yoff) * TWO_PI
            var r = noise(xoff, yoff) * 255;
            var v = p5.Vector.fromAngle(angle);
            xoff += inc;
            stroke(0);
            push();
            translate(x * scl, y * scl)
            rotate(v.heading());
            line(0, 0, scl, 0);

            pop();
        }
        yoff += inc
    }
}function setup() {
    createCanvas(400, 400);
    background(220);

}

var xoff = 0;
var x = 0;
var y = 0;

function draw() {



   beginShape();
    for (var i = 0; i < width; i++) {
      
        y = map(noise(xoff), 0, 1, 0, height);
        stroke(40);
        noFill();
        vertex(x, y);
      
        xoff += 0.01
        x += 1
    }
  endShape();

  noLoop();

}// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/bqF9w9TTfeo

// var x;
// var y;
var pos;
var prev;

function setup() {
  createCanvas(400, 400);
  background(51);
  pos = createVector(200, 200);
  prev = pos.copy();
  console.log(pos);
}

function draw() {
  stroke(255);
  strokeWeight(2);
  //point(pos.x, pos.y);
  line(pos.x, pos.y, prev.x, prev.y);
  prev.set(pos);

  var step = p5.Vector.random2D();

  var r = random(100);
  if (r < 1) {
    step.mult(random(25, 100));
  } else {
    step.setMag(2);
  }

  //pos = pos + step;
  pos.add(step);

}// THANKS TO:
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var pos;
var prev;

function setup() {
    createCanvas(400, 400);
    background(220);
    pos = createVector(200, 200)
    prev = pos.copy();

}

var r;
var xMouse;
var yMouse;

function draw() {
    // console.log(pos.x + ", " + pos.y);


    stroke(mouseX / 4, mouseY / 4, mouseX + mouseY)
    strokeWeight(2);
    line(pos.x, pos.y, prev.x, prev.y)
    prev.set(pos);

    // point(pos.x, pos.y);

    var step = p5.Vector.random2D();
    step.mult(random(5));
    pos.add(step);

    var R = random(100)
    if (R < 0.5) {
        step.mult(random(25, 200));
    } else {
        step.setMag(5);
    }

    xMouse = map(mouseX, 0, 500, 0, 2)
    yMouse = map(mouseY, 0, 500, 0, 2)

    r = floor(random(2.9));

    console.log(xMouse + ", " + yMouse + ", " + r)

    xMove();

    yMove();
}

function xMove() {
    if (r < xMouse) {
        pos.x = pos.x + 1;
    } else {
        pos.x = pos.x - 1;

    }
}

function yMove() {

    if (r < yMouse) {
        pos.y = pos.y + 1;
    } else {
        pos.y = pos.y - 1;
    }
}

function addPoint() {

    if (mouseIsPressed) {
        movement = 0;
    } else {
        for (j = 0; j < 20; j++) {
            for (var i = 0; i < walkers.length; i++) {
                walkers[i].render(Red, Green, Blue);
                walkers[i].step();
            }
            movement = 1;
        }
    }
}// THANKS TO:
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com



function setup() {
    createCanvas(400, 400);
    background(220); 
  instructions();

}

function draw() {  
    if (mouseIsPressed) {
        movement = 0;
      
    } else {
        for (j = 0; j < 20; j++) {
            for (var i = 0; i < walkers.length; i++) {
                walkers[i].render();
                walkers[i].step();
            }
            movement = 1;
        }
    }
}

let range = [255]

function mousePressed() {
    walkers.push(new Walker());
}

function instructions(){
   fill(20);
  textSize(18);
  textAlign(CENTER);
  text ("Click to create a walker, hold to stop walkers", 200,200)
}

let knn;
let video;
var buttonA;
var buttonB;
var buttonGuess;

function preload() {
    knn = new p5ml.KNNImageClassifier(modelLoaded, 2, 1);
}

function modelLoaded() {
    console.log('loaded');
}

function setup() {
    createCanvas(320, 240).parent('canvasContainer');
    video = createCapture(VIDEO);
    background(0);
    video.size(227, 227);
    video.hide()

    buttonA = select('#ButtonA');
    buttonB = select('#ButtonB');

    buttonA.mousePressed(() => {
        train(1);
    });

    buttonB.mousePressed(() => {
        train(2);
    });

    buttonGuess = select('#Button Predict');

    buttonGuess.mousePressed(() => {
        predict();
    });

}

function predict() {
    knn.predict(video.elt, gotResult);
}

function gotResult(res) {
   if (res.classIndex) console.log (res.classIndex);
}


function train(index) {
    knn.addImage(video.elt, index);
}


function draw() {
    background(220);
    image(video, 0, 0, width, height)
}let canvas;
let myMap;
let tripsCoordinates;
let allCoordinates = []

let delta = 0;
let coordinates = 0;
let origin;
let originVector;
let destination;
let destinationVector;
let taxiPosition;

const mappa = new Mappa('Leaflet');

const options = {
  lat: 40.73447,
  long: -74,00232,
  zoom: 13,
  style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}

function preload(){
  data = loadJSON('./data/taxiday1.geojson');
}

function setup(){
  canvas = createCanvas(800,700);
  myMap = mappa.tilemap(options);
  myMap.overlay(canvas);
  tripsCoordinates = myMap.geoJSON(data,"LineString");

  tripsCoordinates.forEach(function(trip)
    trip.forEach(function(coordinate){
      allCoordinates.push(coordinate);
    })
  )}
  myMap.onChange(drawPoints);
}


function draw(){
  clear();
if (delta <1) {
delta += 0.2;
} else {
  delta = 0;
  coordinate ++;
}
origin = myMap.letLngtoPixel(allCoordinates[coordinates][1], allCoordinates[coordinates][0]);
originVector = createVector (origin.x, origin.y);

destination = myMap.letLngtoPixel(allCoordinates[coordinates + 1][1], allCoordinates[coordinates + 1][0]);
destinationVector = createVector (destination.x, destination.y);

position = originVector.lerp(destinationVector,delta);
fill(255,255,0);
ellipse(position.x, position.y,7,7);
}

function drawPoints (){
  noStroke();
  fill (255);
    for (let i =0; i<allCoordinates.length;i++)
      let pos = myMap.latlngtoPixel(allCoordinates[i][1],allCoordinates[i],[0]);
      ellipse(pos.x, pos.y, 5, 5));
}
function setup() {
    createCanvas(400, 400);
    serialCommands();
    connectKinect();
}


function draw() {
  background(220)
  fill(0)
  text("Current outbyte: " + outByte, 30, 30);
  text("incoming value: " + inData, 30, 70);
  ellipse(posX,posY,avgSpeed,avgSpeed)
}function setup() {
    createCanvas(400, 400);
    // serialCommands();
    connectKinect();
}


function draw() {
  background(220)
  fill(0)
  text("Current outbyte: " + outByte, 30, 30);
  text("incoming value: " + inData, 30, 70);
  ellipse(posX,posY,avgSpeed,avgSpeed)
}function setup() {
    createCanvas(400, 400);
    serialCommands();
    // connectKinect();
}


function draw() {
  background(220)
  fill(0)
  text("Current outbyte: " + outByte, 30, 30);
  text("incoming value: " + inData, 30, 70);
  outByte = 25
      serial.write(outByte + ';' + '\n');

}// Serial commands to send data to Arduino
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem411'; // fill in your serial port name here
var options = {
    baudrate: 9600
}; // change the data rate to whatever you wish
var inData; // for incoming serial data
// var xPos = 0; // x position of the graph // UNNECESSARY


function setup() {
    createCanvas(1920, 1080);
    // serialCommands();
    connectKinect();
}

// var outByte;

function draw() {
    background(xpos+100,ypos+100,rightHandY+100)
  if (xpos>1000 || xpos < -1000){
    xpos = 0
  }
  if (ypos>1000 || xpos < -1000){
    ypos = 0
  }
    fill(255)
    // ellipse(xpos, ypos, 20, 20)
    movePos()
    // drawBody()
  getSpeed()
  drawShapes()
    
  // outByte = int(ypos) + ',' + int(xpos) + ',' + int(avgSpeed)
  // console.log(outByte);
  // serial.write(outByte + '\n')
  
}


function serialCommands() {
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing
    serial.open(portName, options);
    serial.list(); // list the serial ports
    // serial.open(portName); // open a serial port
}


function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.')
}

function serialEvent() {
    serial.write(outByte + '\n')

  var inByte = serial.read();
 // store it in a global variable:
 inData = inByte;
    // write data to serial port
    // serial.print(outByte)
  
  
    // // read a string from the serial port:
    // var inString = serial.readLine();
    // console.log(inString)
    // // check to see that there's actually a string there:
    // if (inString.length > 0 ) {
    // // convert it to a number:
    // inData = int(inString);
    // }
}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}


// get the list of ports:
function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
        // Display the list the console:
        console.log(i + " " + portList[i]);
    }
}

function connectKinect() {
    var address = {
        host: '172.16.221.198',
        port: 9001,
        path: '/'
    };
    kinectron = new Kinectron('kinectron', address);
    kinectron.makeConnection();
    kinectron.startTrackedBodies(trackBody);
}// Serial commands to send data to Arduino
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem411'; // fill in your serial port name here
var options = {
    baudrate: 9600
}; // change the data rate to whatever you wish
var inData; // for incoming serial data
// var xPos = 0; // x position of the graph // UNNECESSARY


function setup() {
    createCanvas(1920, 1080);
    // serialCommands();
    connectKinect();
}

// var outByte;

function draw() {
    background(xpos+100,ypos+100,rightHandY+100)
  if (xpos>1000 || xpos < -1000){
    xpos = 0
  }
  if (ypos>1000 || xpos < -1000){
    ypos = 0
  }
    fill(255)
    // ellipse(xpos, ypos, 20, 20)
    movePos()
    // drawBody()
  getSpeed()
  drawShapes()
    
  // outByte = int(ypos) + ',' + int(xpos) + ',' + int(avgSpeed)
  // console.log(outByte);
  // serial.write(outByte + '\n')
  
}


function serialCommands() {
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing
    serial.open(portName, options);
    serial.list(); // list the serial ports
    serial.open(portName); // open a serial port
}


function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.')
}

function serialEvent() {
    serial.write(outByte + '\n')

  var inByte = serial.read();
 // store it in a global variable:
 inData = inByte;
    // write data to serial port
    // serial.print(outByte)
  
  
    // // read a string from the serial port:
    // var inString = serial.readLine();
    // console.log(inString)
    // // check to see that there's actually a string there:
    // if (inString.length > 0 ) {
    // // convert it to a number:
    // inData = int(inString);
    // }
}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}


// get the list of ports:
function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
        // Display the list the console:
        console.log(i + " " + portList[i]);
    }
}

function connectKinect() {
    var address = {
        host: '172.16.221.198',
        port: 9001,
        path: '/'
    };
    kinectron = new Kinectron('kinectron', address);
    kinectron.makeConnection();
    kinectron.startTrackedBodies(trackBody);
}function setup() {
    createCanvas(400, 400);
    serialCommands();
    connectKinect();
}

  var gravity = 10;
var diminish;

function draw() {
  
  gravity= gravity-0.01
  diminish = constrain(gravity, 0, 10);
  background(220)
  fill(0)
  text("Current outbyte: " + outByte, 30, 30);
  text("incoming value: " + inData, 30, 70);
}function setup() {
    createCanvas(400, 400);
    serialCommands();
    connectKinect();
    xpos = width / 2;
    ypos = height / 2;
    radius = 50
}


function draw() {
  background(220)
  fill(0)
  ellipse(posX, posY, (avgSpeed * 3) + 10, (avgSpeed * 3) + 10)
  text("Current outbyte: " + outByte, 30, 30);
  text("incoming value: " + inData, 30, 70);
}function setup() {
    createCanvas(400, 400);
    serialCommands();
    connectKinect();
}


function draw() {
 background(120)
    fill(255)
    // ellipse(xpos, ypos, 20, 20)
    drawBird()
  // setInterval(kinectron.startTrackedBodies(trackBody),interval);
    // setInterval(serialCommands(),interval+delay+2000);


}
function setup() {
    createCanvas(400, 400);
    serialCommands();
    connectKinect();
}


function draw() {

  // setInterval(serialCommands(),interval);
  //   setInterval(connectKinect(),interval+delay);


}
// Serial commands to send data to Arduino
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem411'; // fill in your serial port name here
var options = {
    baudrate: 9600
}; // change the data rate to whatever you wish
var inData; // for incoming serial data
// var xPos = 0; // x position of the graph // UNNECESSARY


function setup() {
    createCanvas(400, 400);
    serialCommands();
    // connectKinect();
}

var outByte = '';

function draw() {
    background(120)
    fill(255)
    ellipse(xpos, ypos, 20, 20)
    movePos()
    drawBird()
    getSpeed()
  // outByte = int(ypos) + ',' + int(xpos) + ',' + int(avgSpeed)
  outByte = 25;
  console.log(outByte);
  serial.write(outByte)
  
}


function serialCommands() {
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing
    serial.open(portName, options);
    serial.list(); // list the serial ports
    serial.open(portName); // open a serial port
}


function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.')
}

function serialEvent() {
    // serial.write(outByte + '\n')

  var inByte = serial.read();
 // store it in a global variable:
 inData = inByte;
    // write data to serial port
    // serial.print(outByte)
  
  
    // // read a string from the serial port:
    // var inString = serial.readLine();
    // console.log(inString)
    // // check to see that there's actually a string there:
    // if (inString.length > 0 ) {
    // // convert it to a number:
    // inData = int(inString);
    // }
}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}


// get the list of ports:
function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
        // Display the list the console:
        console.log(i + " " + portList[i]);
    }
}

function connectKinect() {
    var address = {
        host: '172.16.216.97',
        port: 9001,
        path: '/'
    };
    kinectron = new Kinectron('kinectron', address);
    kinectron.makeConnection();
    kinectron.startTrackedBodies(trackBody);
}// Serial commands to send data to Arduino
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem411'; // fill in your serial port name here
var options = {
    baudrate: 9600
}; // change the data rate to whatever you wish
var inData; // for incoming serial data
// var xPos = 0; // x position of the graph // UNNECESSARY


function setup() {
    createCanvas(1920, 1080);
    // serialCommands();
    connectKinect();
}

// var outByte;

function draw() {
    background(xpos+100,ypos+100,rightHandY+100)
  if (xpos>1000 || xpos < -1000){
    xpos = 0
  }
  if (ypos>1000 || xpos < -1000){
    ypos = 0
  }
    fill(255)
    // ellipse(xpos, ypos, 20, 20)
    movePos()
    // drawBody()
  getSpeed()
  drawShapes()
    
  // outByte = int(ypos) + ',' + int(xpos) + ',' + int(avgSpeed)
  // console.log(outByte);
  // serial.write(outByte + '\n')
  
}


function serialCommands() {
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing
    serial.open(portName, options);
    serial.list(); // list the serial ports
    serial.open(portName); // open a serial port
}


function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.')
}

function serialEvent() {
    serial.write(outByte + '\n')

  var inByte = serial.read();
 // store it in a global variable:
 inData = inByte;
    // write data to serial port
    // serial.print(outByte)
  
  
    // // read a string from the serial port:
    // var inString = serial.readLine();
    // console.log(inString)
    // // check to see that there's actually a string there:
    // if (inString.length > 0 ) {
    // // convert it to a number:
    // inData = int(inString);
    // }
}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}


// get the list of ports:
function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
        // Display the list the console:
        console.log(i + " " + portList[i]);
    }
}

function connectKinect() {
    var address = {
        host: '172.16.221.198',
        port: 9001,
        path: '/'
    };
    kinectron = new Kinectron('kinectron', address);
    kinectron.makeConnection();
    kinectron.startTrackedBodies(trackBody);
}
var numbers = [65, 144, 2, 4];
var sum;

function getSum(total, num) {
    return total + num;
}

function setup() {
createCanvas(400,400)
background(100)
}

function draw(item) {

fill(255)
    sum = numbers.reduce(getSum);
    text(sum,20,20)
}var kinectron = null;

//have to mention them here 
var rightHandX; //because they are shared between draw and trackBody
// var rightHandZ; // track Z for velocity
var rightElbowX;
var rightElbowY;
// var rightHandY = 0; // entered below
var rightShoulderX;
var rightShoulderY;
var leftHandX;
var leftHandY;
var leftHandZ; // track Z for velocity
var leftElbowX;
var leftElbowY;
var leftShoulderX;
var leftShoulderY;
var xNeck;
var yNeck;
var xSpineShoulder;
var ySpineShoulder;
var xpos = 200; // ellipse starting in center
var ypos = 200; // ellipse starting in center
var head; // head Z for up /down
var xHead; // head X for side/side
var hip; // measured relative to head

// declare array variable 
var values = []

// variables for measuring speed
var ySpineMid; // bottom of 
var prevRightHandY = 0;  // set y position for previous frame
var rightHandY = 0;  // set y position for current frame
var rightHandSpeed = 0;  // subtract prevRight - Right
// measure acceleration
var prevrightHandSpeed = 0;  // 
var rightHandAcc = 0; 
var Velocity = 0


var prevRightHandZ = 0;
var rightHandZ = 0;
var rightHandSpeedZ = 0;
var prevrightHandSpeedZ = 0;
var rightHandAccZ = 0;
var VelocityZ = 0;

var Zdifference;

function setup() {
    createCanvas(400, 400);

    var address = {
        host: '172.16.216.97',
        port: 9001,
        path: '/'
    };
    kinectron = new Kinectron('kinectron', address);
    kinectron.makeConnection();
    kinectron.startTrackedBodies(trackBody);
}


function draw() {
    background(120)
    text(rightHandSpeed, 20, 20)
    fill(255)
    // ellipse(xpos, ypos, 20, 20)
    movePos()
    drawBird()

    var top = yNeck + 20
    var bottom = ySpineMid - 20
    line(0, top, width, top)
    line(0, bottom, width, bottom)
 
    prevRightHandY = rightHandY
  
    if (rightHandY > top && rightHandY < ySpineMid - 40) {
        rightHandSpeed = abs((0.3 * rightHandSpeed) + 0.7 * (rightHandY - prevRightHandY));
    }

    // values = new Value()
    // add new values to array
    values.push(rightHandSpeed)

    // cut earliest value from array
    if (values.length > 20) {
        values.splice(0, 1)
    }

    // take average of array
    var avg = values / values.length

}




// class Value {
//     this.number = input
// }



////////////////////////////////////////////////
function checkX() {
    if (xHead > 200) {
        xpos++
    }
    if (xHead < 200) {
        xpos--
    }
}

function movePos() {
    if (head > hip) {
        ypos--
        checkX()
    }
    if (head < hip) {
        ypos++
        checkX()
    }
}
//////////////////////////////////

function drawBird() {

    // Right wing

    triangle(rightHandX, rightHandY, rightElbowX, rightElbowY, rightElbowX, rightElbowY + 13);
    triangle(rightElbowX, rightElbowY, rightShoulderX, rightShoulderY, rightShoulderX, rightShoulderY + 30);
    triangle(rightElbowX, rightElbowY, rightElbowX, rightElbowY + 13, rightShoulderX, rightShoulderY + 30);

    // Left Wing

    triangle(leftHandX, leftHandY, leftElbowX, leftElbowY, leftElbowX, leftElbowY + 13);
    triangle(leftElbowX, leftElbowY, leftShoulderX, leftShoulderY, leftShoulderX, leftShoulderY + 30);
    triangle(leftElbowX, leftElbowY, leftElbowX, leftElbowY + 13, leftShoulderX, leftShoulderY + 30);


    // Body

    triangle(leftShoulderX, leftShoulderY, leftShoulderX, leftShoulderY + 30, xSpineShoulder, ySpineShoulder);
    triangle(leftShoulderX, leftShoulderY, leftShoulderX, leftShoulderY + 30, xNeck, yNeck);

    triangle(rightShoulderX, rightShoulderY, rightShoulderX, rightShoulderY + 30, xNeck, yNeck);
    triangle(rightShoulderX, rightShoulderY, rightShoulderX, rightShoulderY + 30, xSpineShoulder, ySpineShoulder);

    triangle(rightShoulderX, rightShoulderY, xNeck, yNeck, xSpineShoulder, ySpineShoulder + 30);
    triangle(leftShoulderX, leftShoulderY, xNeck, yNeck, xSpineShoulder, ySpineShoulder + 30);
}

function trackBody(body) {

    // RIGHT
    // Hand
    var handRx = body.joints[kinectron.HANDRIGHT].depthX;
    rightHandX = map(handRx, 0, 1, 0, width);

    prevRightHandY = rightHandY;
    var handRy = body.joints[kinectron.HANDRIGHT].depthY;
    rightHandY = map(handRy, 0, 1, 0, height);

    prevRightHandZ = rightHandZ;
    var handRz = body.joints[kinectron.HANDRIGHT].cameraZ;
    rightHandZ = map(handRx, 0, 1, 0, 200);

    Zdifference = abs((0.5 * prevRightHandZ) - (0.5 * rightHandZ));
    // console.log(Zdifference)
    if (Zdifference > 10) {

        Velocity = -Velocity
    } else {
        Velocity = Velocity
    }



    // Elbow
    var elbowRx = body.joints[kinectron.ELBOWRIGHT].depthX;
    rightElbowX = map(elbowRx, 0, 1, 0, width);
    var elbowRy = body.joints[kinectron.ELBOWRIGHT].depthY;
    rightElbowY = map(elbowRy, 0, 1, 0, height); //height numbers bigger at the bottom

    // Shoulder
    var shoulderRx = body.joints[kinectron.SHOULDERRIGHT].depthX;
    rightShoulderX = map(shoulderRx, 0, 1, 0, width);
    var shoulderRy = body.joints[kinectron.SHOULDERRIGHT].depthY;
    rightShoulderY = map(shoulderRy, 0, 1, 0, height); //height numbers bigger at the bottom

    // LEFT
    // Hand
    var handLx = body.joints[kinectron.HANDLEFT].depthX;
    leftHandX = map(handLx, 0, 1, 0, width);
    var handLy = body.joints[kinectron.HANDLEFT].depthY;
    leftHandY = map(handLy, 0, 1, 0, height); //height numbers bigger at the bottom
    var handLz = body.joints[kinectron.HANDLEFT].cameraZ;
    leftHandZ = map(handLz, 0, 1, 0, 200);

    // Elbow
    var elbowLx = body.joints[kinectron.ELBOWLEFT].depthX;
    leftElbowX = map(elbowLx, 0, 1, 0, width);
    var elbowLy = body.joints[kinectron.ELBOWLEFT].depthY;
    leftElbowY = map(elbowLy, 0, 1, 0, height); //height numbers bigger at the bottom

    // Shoulder
    var shoulderLx = body.joints[kinectron.SHOULDERLEFT].depthX;
    leftShoulderX = map(shoulderLx, 0, 1, 0, width);
    var shoulderLy = body.joints[kinectron.SHOULDERLEFT].depthY;
    leftShoulderY = map(shoulderLy, 0, 1, 0, height); //height numbers bigger at the bottom

    // CENTER
    // Neck
    var neckX = body.joints[kinectron.NECK].depthX;
    xNeck = map(neckX, 0, 1, 0, width);
    var neckY = body.joints[kinectron.NECK].depthY;
    yNeck = map(neckY, 0, 1, 0, height); //height numbers bigger at the bottom

    // Spine Shoulder
    var spineShoulderX = body.joints[kinectron.SPINESHOULDER].depthX;
    xSpineShoulder = map(spineShoulderX, 0, 1, 0, width);
    var spineShoulderY = body.joints[kinectron.SPINESHOULDER].depthY;
    ySpineShoulder = map(spineShoulderY, 0, 1, 0, height); //height numbers bigger at the bottom

    var spineMidY = body.joints[kinectron.SPINEMID].depthY;
    ySpineMid = map(spineMidY, 0, 1, 0, height);

    var headZ = body.joints[kinectron.HEAD].cameraZ;
    head = map(headZ, 0, 1, 0, 200);

    var headX = body.joints[kinectron.HEAD].depthX;
    xHead = map(headX, 0, 1, 0, width);

    var hipZ = body.joints[kinectron.HIPRIGHT].cameraZ;
    hip = map(hipZ, 0, 1, 0, 200);

}// Serial commands to send data to Arduino
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem411'; // fill in your serial port name here
var options = {
    baudrate: 9600
}; // change the data rate to whatever you wish
var inData; // for incoming serial data
// var xPos = 0; // x position of the graph // UNNECESSARY


function setup() {
    createCanvas(400, 400);
    serialCommands();
    connectKinect();
}

var outByte = '';

function draw() {
    background(120)
    fill(255)
    ellipse(xpos, ypos, 20, 20)
    movePos()
    drawBird()
    getSpeed()
  outByte = int(ypos) + ',' + int(xpos) + ',' + int(avgSpeed)
  console.log(outByte);
  serial.write(outByte)
  
}


function serialCommands() {
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing
    serial.open(portName, options);
    serial.list(); // list the serial ports
    serial.open(portName); // open a serial port
}


function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.')
}

function serialEvent() {
    serial.write(outByte + '\n')

  var inByte = serial.read();
 // store it in a global variable:
 inData = inByte;
    // write data to serial port
    // serial.print(outByte)
  
  
    // // read a string from the serial port:
    // var inString = serial.readLine();
    // console.log(inString)
    // // check to see that there's actually a string there:
    // if (inString.length > 0 ) {
    // // convert it to a number:
    // inData = int(inString);
    // }
}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}


// get the list of ports:
function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
        // Display the list the console:
        console.log(i + " " + portList[i]);
    }
}

function connectKinect() {
    var address = {
        host: '172.16.216.97',
        port: 9001,
        path: '/'
    };
    kinectron = new Kinectron('kinectron', address);
    kinectron.makeConnection();
    kinectron.startTrackedBodies(trackBody);
}var kinectron = null;

var rightHandX; //have to mention them here 
var rightHandY; //because they are shared between draw and trackBody
var rightHandZ; // track Z for velocity
var rightElbowX; 
var rightElbowY; 
var rightShoulderX; 
var rightShoulderY; 
var leftHandX; 
var leftHandY;
var leftHandZ;  // track Z for velocity
var leftElbowX; 
var leftElbowY; 
var leftShoulderX; 
var leftShoulderY; 
var xNeck; 
var yNeck; 
var xSpineShoulder;
var ySpineShoulder;
var xpos = 200; // ellipse starting in center
var ypos = 200; // ellipse starting in center
var head; // head Z for up /down
var xHead; // head X for side/side
var hip; // measured relative to head

var points = []





function setup() {
    createCanvas(400, 400);

    var address = {
        host: '172.16.216.97',
        port: 9001,
        path: '/'
    };
    kinectron = new Kinectron('kinectron', address);

    // kinectron = new Kinectron('169.254.124.102');

    kinectron.makeConnection();
    kinectron.startTrackedBodies(trackBody);

   

}

class Point {
  
  constructor(){
    // this.Rx = rightHandX
    this.Ry = rightHandY
    this.Rz = rightHandZ

    // this.Lx = leftHandX
    this.Ly = leftHandY
    this.Lz = leftHandZ
  }
  
  createPoint(){
   this.buildR = point(rightHandY, rightHandZ)
   this.buildL = point(leftHandY, leftHandZ)
  }
  
  
  
  
  
}

function draw() {
   var p = new Point()
   points.push(p)
   
   if (points.length > 20) {
     points.splice(0,1)
   }
   
   for (var i = 0; i < points.length; i++){
   
   }
     
    background(120)
    fill(255)
    // ellipse(xpos, ypos, 20, 20)
    // movePos()


    drawBird()

}



function checkX() {
    if (xHead > 200) {
        xpos++
    }
    if (xHead < 200) {
        xpos--
    }
}

function movePos() {
    if (head > hip) {
        ypos--
        checkX()
    }

    if (head < hip) {
        ypos++
        checkX()
    }
}

function drawBird() {

    // Right wing

    triangle(rightHandX, rightHandY, rightElbowX, rightElbowY, rightElbowX, rightElbowY + 13);
    triangle(rightElbowX, rightElbowY, rightShoulderX, rightShoulderY, rightShoulderX, rightShoulderY + 30);
    triangle(rightElbowX, rightElbowY, rightElbowX, rightElbowY + 13, rightShoulderX, rightShoulderY + 30);

    // Left Wing

    triangle(leftHandX, leftHandY, leftElbowX, leftElbowY, leftElbowX, leftElbowY + 13);
    triangle(leftElbowX, leftElbowY, leftShoulderX, leftShoulderY, leftShoulderX, leftShoulderY + 30);
    triangle(leftElbowX, leftElbowY, leftElbowX, leftElbowY + 13, leftShoulderX, leftShoulderY + 30);


    // Body

    triangle(leftShoulderX, leftShoulderY, leftShoulderX, leftShoulderY + 30, xSpineShoulder, ySpineShoulder);
    triangle(leftShoulderX, leftShoulderY, leftShoulderX, leftShoulderY + 30, xNeck, yNeck);

    triangle(rightShoulderX, rightShoulderY, rightShoulderX, rightShoulderY + 30, xNeck, yNeck);
    triangle(rightShoulderX, rightShoulderY, rightShoulderX, rightShoulderY + 30, xSpineShoulder, ySpineShoulder);

    triangle(rightShoulderX, rightShoulderY, xNeck, yNeck, xSpineShoulder, ySpineShoulder + 30);
    triangle(leftShoulderX, leftShoulderY, xNeck, yNeck, xSpineShoulder, ySpineShoulder + 30);
}

function trackBody(body) {

    // RIGHT
    // Hand
    var handRx = body.joints[kinectron.HANDRIGHT].depthX;
    rightHandX = map(handRx, 0, 1, 0, width);
    var handRy = body.joints[kinectron.HANDRIGHT].depthY;
    rightHandY = map(handRy, 0, 1, 0, height);
    var handRz = body.joints[kinectron.HANDRIGHT].cameraZ;
    rightHandZ = map(handRx, 0, 1, 0, 200);

    // Elbow
    var elbowRx = body.joints[kinectron.ELBOWRIGHT].depthX;
    rightElbowX = map(elbowRx, 0, 1, 0, width);
    var elbowRy = body.joints[kinectron.ELBOWRIGHT].depthY;
    rightElbowY = map(elbowRy, 0, 1, 0, height); //height numbers bigger at the bottom

    // Shoulder
    var shoulderRx = body.joints[kinectron.SHOULDERRIGHT].depthX;
    rightShoulderX = map(shoulderRx, 0, 1, 0, width);
    var shoulderRy = body.joints[kinectron.SHOULDERRIGHT].depthY;
    rightShoulderY = map(shoulderRy, 0, 1, 0, height); //height numbers bigger at the bottom

    // LEFT
    // Hand
    var handLx = body.joints[kinectron.HANDLEFT].depthX;
    leftHandX = map(handLx, 0, 1, 0, width);
    var handLy = body.joints[kinectron.HANDLEFT].depthY;
    leftHandY = map(handLy, 0, 1, 0, height); //height numbers bigger at the bottom
    var handLz = body.joints[kinectron.HANDLEFT].cameraZ;
    leftHandZ = map(handLz, 0, 1, 0, 200);

    // Elbow
    var elbowLx = body.joints[kinectron.ELBOWLEFT].depthX;
    leftElbowX = map(elbowLx, 0, 1, 0, width);
    var elbowLy = body.joints[kinectron.ELBOWLEFT].depthY;
    leftElbowY = map(elbowLy, 0, 1, 0, height); //height numbers bigger at the bottom

    // Shoulder
    var shoulderLx = body.joints[kinectron.SHOULDERLEFT].depthX;
    leftShoulderX = map(shoulderLx, 0, 1, 0, width);
    var shoulderLy = body.joints[kinectron.SHOULDERLEFT].depthY;
    leftShoulderY = map(shoulderLy, 0, 1, 0, height); //height numbers bigger at the bottom

    // CENTER
    // Neck
    var neckX = body.joints[kinectron.NECK].depthX;
    xNeck = map(neckX, 0, 1, 0, width);
    var neckY = body.joints[kinectron.NECK].depthY;
    yNeck = map(neckY, 0, 1, 0, height); //height numbers bigger at the bottom

    // Spine Shoulder
    var spineShoulderX = body.joints[kinectron.SPINESHOULDER].depthX;
    xSpineShoulder = map(spineShoulderX, 0, 1, 0, width);
    var spineShoulderY = body.joints[kinectron.SPINESHOULDER].depthY;
    ySpineShoulder = map(spineShoulderY, 0, 1, 0, height); //height numbers bigger at the bottom

    var headZ = body.joints[kinectron.HEAD].cameraZ;
    head = map(headZ, 0, 1, 0, 200);

    var headX = body.joints[kinectron.HEAD].depthX;
    xHead = map(headX, 0, 1, 0, width);

    var hipZ = body.joints[kinectron.HIPRIGHT].cameraZ;
    hip = map(hipZ, 0, 1, 0, 200);

}var kinectron = null;
var backgrnd ;

var highStateR;
var HStimeR
var lowStateR;
var LStimeR;
var velocityR;

var rightHandX;  //have to mention them here 
var rightHandY;  //because they are shared between draw and trackBody

var rightElbowX;  //have to mention them here 
var rightElbowY;  //because they are shared between draw and trackBody

var rightShoulderX;  //have to mention them here 
var rightShoulderY;  //because they are shared between draw and trackBody

var leftHandX;  //have to mention them here 
var leftHandY;  //because they are shared between draw and trackBody

var leftElbowX;  //have to mention them here 
var leftElbowY;  //because they are shared between draw and trackBody

var leftShoulderX;  //have to mention them here 
var leftShoulderY;  //because they are shared between draw and trackBody

var xNeck;  //have to mention them here 
var yNeck;  //because they are shared between draw and trackBody

var xSpineShoulder;
var ySpineShoulder;


function preload(){
   backgrnd = loadImage("beach.jpg");
}

function setup() {
	createCanvas(630, 420);
	kinectron = new Kinectron('172.16.216.141');
	kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
  // kinectron.startDepth(bodyDepth);

  // kinectron.startKey(gotData);
  //set the callback function name to be called when stuff comes from kinect
}

// function bodyDepth(body) {
  
//   ellipse(20,20,body,body);
  
// }

function trackVelocity (){
  // lastY = rightHandY
  // currentY = rightHandY
  
  var time1;
  var time2;

  // holds high state
  if (highStateR > rightHandY){
    highStateR = highStateR
    // time1 = getTime()
  }
  else{
      highStateR = rightHandY
  }
    
  // holds low state  
  if (lowStateR < rightHandY){
    lowStateR = lowStateR
    // time2 = getTime()
  }
  else {
      lowStateR = rightHandY
  }
  
    
  var timeDelta = time1 - time2
  var distanceR = highStateR - lowStateR

  var velocityR = distanceR/timeDelta
  
  console.log(lowStateR)
  
  lowStateR = 0;
  highStateR = 0;
}

function draw() {
  
  trackVelocity ();

  background(120)
 // Right wing
  
  triangle(rightHandX,rightHandY,rightElbowX,rightElbowY,rightElbowX,rightElbowY+13);      
  triangle(rightElbowX,rightElbowY,rightShoulderX,rightShoulderY,rightShoulderX,rightShoulderY+30);
  triangle(rightElbowX,rightElbowY,rightElbowX,rightElbowY+13,rightShoulderX,rightShoulderY+30);
  
  // Left Wing
  
  triangle(leftHandX,leftHandY,leftElbowX,leftElbowY,leftElbowX,leftElbowY+13);      
  triangle(leftElbowX,leftElbowY,leftShoulderX,leftShoulderY,leftShoulderX,leftShoulderY+30);
  triangle(leftElbowX,leftElbowY,leftElbowX,leftElbowY+13,leftShoulderX,leftShoulderY+30);

  
  // Body
  
  triangle(leftShoulderX,leftShoulderY,leftShoulderX,leftShoulderY+30,xSpineShoulder,ySpineShoulder);
  triangle(leftShoulderX,leftShoulderY,leftShoulderX,leftShoulderY+30,xNeck,yNeck);

  triangle(rightShoulderX,rightShoulderY,rightShoulderX,rightShoulderY+30, xNeck,yNeck);
  triangle(rightShoulderX,rightShoulderY,rightShoulderX,rightShoulderY+30,xSpineShoulder,ySpineShoulder);

  triangle(rightShoulderX,rightShoulderY,xNeck,yNeck,xSpineShoulder,ySpineShoulder+30);
  triangle(leftShoulderX,leftShoulderY,xNeck,yNeck,xSpineShoulder,ySpineShoulder+30);
  
  
  
}

function trackBody(body) {
 

  // RIGHT
  // Hand
  var handRx = body.joints[kinectron.HANDRIGHT].depthX;
  	rightHandX =  map(handRx,0,1,0,width);
  	var handRy = body.joints[kinectron.HANDRIGHT].depthY;
  	rightHandY = map(handRy,0,1,0,height); //height numbers bigger at the bottom

  // Elbow
  var elbowRx = body.joints[kinectron.ELBOWRIGHT].depthX;
  	rightElbowX =  map(elbowRx,0,1,0,width);
  	var elbowRy = body.joints[kinectron.ELBOWRIGHT].depthY;
  	rightElbowY = map(elbowRy,0,1,0,height); //height numbers bigger at the bottom

  // Shoulder
  var shoulderRx = body.joints[kinectron.SHOULDERRIGHT].depthX;
  	rightShoulderX =  map(shoulderRx,0,1,0,width);
  	var shoulderRy = body.joints[kinectron.SHOULDERRIGHT].depthY;
  	rightShoulderY = map(shoulderRy,0,1,0,height); //height numbers bigger at the bottom
  
  // LEFT
  // Hand
  var handLx = body.joints[kinectron.HANDLEFT].depthX;
  	leftHandX =  map(handLx,0,1,0,width);
  	var handLy = body.joints[kinectron.HANDLEFT].depthY;
  	leftHandY = map(handLy,0,1,0,height); //height numbers bigger at the bottom

  // Elbow
  var elbowLx = body.joints[kinectron.ELBOWLEFT].depthX;
  	leftElbowX =  map(elbowLx,0,1,0,width);
  	var elbowLy = body.joints[kinectron.ELBOWLEFT].depthY;
  	leftElbowY = map(elbowLy,0,1,0,height); //height numbers bigger at the bottom

  // Shoulder
  var shoulderLx = body.joints[kinectron.SHOULDERLEFT].depthX;
  	leftShoulderX =  map(shoulderLx,0,1,0,width);
  	var shoulderLy = body.joints[kinectron.SHOULDERLEFT].depthY;
  	leftShoulderY = map(shoulderLy,0,1,0,height); //height numbers bigger at the bottom
  
  // CENTER
  // Neck
  var neckX = body.joints[kinectron.NECK].depthX;
  	xNeck =  map(neckX,0,1,0,width);
  	var neckY = body.joints[kinectron.NECK].depthY;
  	yNeck = map(neckY,0,1,0,height); //height numbers bigger at the bottom
  
  // Spine Shoulder
  var spineShoulderX = body.joints[kinectron.SPINESHOULDER].depthX;
  	xSpineShoulder =  map(spineShoulderX,0,1,0,width);
  	var spineShoulderY = body.joints[kinectron.SPINESHOULDER].depthY;
  	ySpineShoulder = map(spineShoulderY,0,1,0,height); //height numbers bigger at the bottom
  
}

function gotData(data){
  loadImage(data.src,gotImage);
  //this is a callback that triggers another callback
}

function gotImage(img){
  image(backgrnd,0,0);
  image(img,0,0);
}


var acc = 0.01;
 var speed = 0.01;
 var yPos;
var Hline = {};

 function setup() {
     createCanvas(400, 400);
     background(220);

 }

 function draw() {
     background(220);
     strokeWeight(3)
     fill(0)

   drawLine()
   // setTimeout(drawLine(),9000000)
   
  
 }

 function drawLine() {
  
   // Hlines = new Line()
   Line(0)
   Line(200)
    

 }

function Line (startTime) {
     
     if (millis()==startTime){
    
     yPos = 200
     line(0, yPos + speed, width, yPos + speed)
     speed = speed + acc
     acc++


     if (yPos + speed > height+500) {
         yPos = 200
         speed = 0
         acc = 0
     }
}}// must be in HTTPS

var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
var lat;
var comma = ","
var long;
var radiusWords = "&radius="
var radius = 5000;
var apiKey = "&key=AIzaSyAjmC0gt_4lNK6qnlMAFOyE3zrwyGSx30w"

var api;
var Googles;
var results = [];



function setup() {
    createCanvas(windowWidth, windowHeight);

    // register event handler to position anytime it changes
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(updatePosition);
    } else {
        alert("navigator.geolocation is not available");
    }
}

function updatePosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    // background(0);
    // fill(255);
    // background(0);
    // textSize(32);
    // text(nf(lat,2,2) + " " + nf(lng,2,2), 10, 50);

    api = url + lat + comma + lng + radiusWords + radius + apiKey

    loadJSON(api, displayThings)
    console.log(api)

}

function draw() {

  
}

function displayThings(things) {
    Googles = things
    showThings()

}

function showThings(){
for (var i = 0; i < 2; i++) {
      results = Googles.results[i].name
      console.log(results)
    }
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
  ellipse(x, y, 30, 30);

}var kinectron = null;

var rightHandX;  //have to mention them here 
var rightHandY;  //because they are shared between draw and trackBody

var rightElbowX;  //have to mention them here 
var rightElbowY;  //because they are shared between draw and trackBody

var rightShoulderX;  //have to mention them here 
var rightShoulderY;  //because they are shared between draw and trackBody

var leftHandX;  //have to mention them here 
var leftHandY;  //because they are shared between draw and trackBody

var leftElbowX;  //have to mention them here 
var leftElbowY;  //because they are shared between draw and trackBody

var leftShoulderX;  //have to mention them here 
var leftShoulderY;  //because they are shared between draw and trackBody

var xNeck;  //have to mention them here 
var yNeck;  //because they are shared between draw and trackBody

var xSpineShoulder;
var ySpineShoulder;

function preload(){

}


function setup() {
	createCanvas(640, 480);
  var address = {host: '172.16.216.84', port: 9001, path: '/'};
	kinectron = new Kinectron('kinectron',address);
	kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
  //set the callback function name to be called when stuff comes from kinect
}

function draw() {
  background(255);
  
  stroke(20);
  fill(0)
  
  // Right wing
  
  triangle(rightHandX,rightHandY,rightElbowX,rightElbowY,rightElbowX,rightElbowY+13);      
  triangle(rightElbowX,rightElbowY,rightShoulderX,rightShoulderY,rightShoulderX,rightShoulderY+30);
  triangle(rightElbowX,rightElbowY,rightElbowX,rightElbowY+13,rightShoulderX,rightShoulderY+30);
  
  // Left Wing
  
  triangle(leftHandX,leftHandY,leftElbowX,leftElbowY,leftElbowX,leftElbowY+13);      
  triangle(leftElbowX,leftElbowY,leftShoulderX,leftShoulderY,leftShoulderX,leftShoulderY+30);
  triangle(leftElbowX,leftElbowY,leftElbowX,leftElbowY+13,leftShoulderX,leftShoulderY+30);

  
  // Body
  
  triangle(leftShoulderX,leftShoulderY,leftShoulderX,leftShoulderY+30,xSpineShoulder,ySpineShoulder);
  triangle(leftShoulderX,leftShoulderY,leftShoulderX,leftShoulderY+30,xNeck,yNeck);

  triangle(rightShoulderX,rightShoulderY,rightShoulderX,rightShoulderY+30, xNeck,yNeck);
  triangle(rightShoulderX,rightShoulderY,rightShoulderX,rightShoulderY+30,xSpineShoulder,ySpineShoulder);

  triangle(rightShoulderX,rightShoulderY,xNeck,yNeck,xSpineShoulder,ySpineShoulder+30);
  triangle(leftShoulderX,leftShoulderY,xNeck,yNeck,xSpineShoulder,ySpineShoulder+30);

  
}

function trackBody(body) {

  // RIGHT
  // Hand
  var handRx = body.joints[kinectron.HANDRIGHT].depthX;
  	rightHandX =  map(handRx,0,1,0,width);
  	var handRy = body.joints[kinectron.HANDRIGHT].depthY;
  	rightHandY = map(handRy,0,1,0,height); //height numbers bigger at the bottom

  // Elbow
  var elbowRx = body.joints[kinectron.ELBOWRIGHT].depthX;
  	rightElbowX =  map(elbowRx,0,1,0,width);
  	var elbowRy = body.joints[kinectron.ELBOWRIGHT].depthY;
  	rightElbowY = map(elbowRy,0,1,0,height); //height numbers bigger at the bottom

  // Shoulder
  var shoulderRx = body.joints[kinectron.SHOULDERRIGHT].depthX;
  	rightShoulderX =  map(shoulderRx,0,1,0,width);
  	var shoulderRy = body.joints[kinectron.SHOULDERRIGHT].depthY;
  	rightShoulderY = map(shoulderRy,0,1,0,height); //height numbers bigger at the bottom
  
  // LEFT
  // Hand
  var handLx = body.joints[kinectron.HANDLEFT].depthX;
  	leftHandX =  map(handLx,0,1,0,width);
  	var handLy = body.joints[kinectron.HANDLEFT].depthY;
  	leftHandY = map(handLy,0,1,0,height); //height numbers bigger at the bottom

  // Elbow
  var elbowLx = body.joints[kinectron.ELBOWLEFT].depthX;
  	leftElbowX =  map(elbowLx,0,1,0,width);
  	var elbowLy = body.joints[kinectron.ELBOWLEFT].depthY;
  	leftElbowY = map(elbowLy,0,1,0,height); //height numbers bigger at the bottom

  // Shoulder
  var shoulderLx = body.joints[kinectron.SHOULDERLEFT].depthX;
  	leftShoulderX =  map(shoulderLx,0,1,0,width);
  	var shoulderLy = body.joints[kinectron.SHOULDERLEFT].depthY;
  	leftShoulderY = map(shoulderLy,0,1,0,height); //height numbers bigger at the bottom
  
  // CENTER
  // Neck
  var neckX = body.joints[kinectron.NECK].depthX;
  	xNeck =  map(neckX,0,1,0,width);
  	var neckY = body.joints[kinectron.NECK].depthY;
  	yNeck = map(neckY,0,1,0,height); //height numbers bigger at the bottom
  
  // Spine Shoulder
  var spineShoulderX = body.joints[kinectron.SPINESHOULDER].depthX;
  	xSpineShoulder =  map(spineShoulderX,0,1,0,width);
  	var spineShoulderY = body.joints[kinectron.SPINESHOULDER].depthY;
  	ySpineShoulder = map(spineShoulderY,0,1,0,height); //height numbers bigger at the bottom
  
}
var kinectron = null;

function preload(){

}

function setup() {
	createCanvas(500, 500);
  var address = {host: '169.254.124.102', port: 9001, path: '/'};
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
}var currentWord;

// var url;
// var data;

var txt;

var nouns = new Array();
var adjectives = new Array();
var adverbs = new Array();
var prepositions = new Array();
var personalPronouns = new Array();
var possessivePronouns = new Array();
var verbs = new Array();
var determiners = new Array();

var tags;
var newSent;

function preload() {
  //loads in text file as lines of text
  txt = loadStrings('text.txt');
}

function setup() {
	createCanvas(200,3000);
  
  //allWords array holds every character as a symbol
  var allWords = txt.join("/n");
  //tokens array now contains individual words
  var tokens = allWords.toLowerCase().split(/\W+/);

  sortTags(tokens);

  print(nouns);
  print(adjectives);
  print(adverbs);
  print(prepositions);
  print(personalPronouns);
  print(possessivePronouns);
  print(verbs);
  print(determiners);

  //sortArrays();

  printNewSentence();
}

function draw(){
  
	// text(newSent,10,10);
}

function printNewSentence() {
  for (var i = 0; i<possessivePronouns.length; i++){
  newSent = possessivePronouns[i] + ' ' + nouns[i] + ' ' + verbs[i] + ' ' + adjectives[i] + '.';

  textSize(12)  
  text(newSent, 0, i*20);
  print(newSent);

  }
}

function sortArrays() {
  nouns.sort();
  adjectives.sort();
  adverbs.sort();
  prepositions.sort();
  personalPronouns.sort();
  possessivePronouns.sort();
  verbs.sort();
  determiners.sort();
}

function sortTags(tokens) {
  for (var i = 0; i < tokens.length; i++) {

    currentWord = tokens[i];
    // print(currentWord);

    tags = RiTa.getPosTags(currentWord);

    // print(tags);
    // print(tags[0]);

    // var tagStr = tags.join(" ");

    if (tags[0] == 'nn') {
      nouns.push(currentWord);
    } else if (tags[0] == 'jj' || tags[0] == 'jjr' || tags[0] == 'jjs') { //add something about null
      adjectives.push(currentWord);
    } else if (tags[0] == 'rb' || tags[0] == 'rbr' || tags[0] == 'rbs') {
      adverbs.push(currentWord);
    } else if (tags[0] == 'in') {
      prepositions.push(currentWord);
    } else if (tags[0] == 'dt') {
      determiners.push(currentWord);
    } else if (tags[0] == 'prp') {
      personalPronouns.push(currentWord);
    } else if (tags[0] == 'prp$') {
      possessivePronouns.push(currentWord);
    } else if (tags[0] == 'vb' || tags[0] == 'vbd' || tags[0] == 'vbg' || tags[0] == 'vbn' || tags[0] == 'vbp' || tags[0] == 'vbz') {
      verbs.push(currentWord);
    }
  }
} var amp; 

var col1;
var col2;
var col3;

function setup() {
  createCanvas(400, 300);
  amp = new p5.Amplitude();

}

function draw() {
  background(0);
  keyBoard();
  soundVisual();
 
}

function keyPressed() {
  if (keyCode === 65) {
    C4();
    col1=color(0);
  }
  else if (keyCode === 83) {
    D4(); 
    col2=color(255);
  } else if (keyCode === 68) {
    E4();    
    //col3=color(255);
  } else if (keyCode === 70) {
    F4();    
    //col3=color(255);
  } else if (keyCode === 74) {
    G4();    
    //col3=color(255);
  } else if (keyCode === 75) {
    A4();    
    //col3=color(255);
  } else if (keyCode === 76) {
    B4();    
    //col3=color(255);
  } else if (keyCode === 186) {
    C5();    
    //col3=color(255);
  } 
  
}

function keyReleased() {
  if (keyCode === 65) {
   col1=color(0,0,0);
  } else if (keyCode === 83) { 
   col2=color(200,200,200);
  } else if (keyCode === 68) {   
    col3=color(250,200,200);
  } 
}


function keyBoard(){
  //var offset=0;
  noStroke();
  col1=color(199,28,108);
  col2=color(200,200,200);
  col3=color(240,200,200);
  fill(col1);
  for(var i=0; i<3; i++){
  rect(i*150,250,50,50);
  //offset=offset+50;
  }
  fill(col2);
  for(var j=0;j<3;j++){
  rect(j*150+50,250,50,50);
  }
  fill(col3);
  for(var k=0;k<3;k++){
  rect(k*150+100,250,50,50);
  }
}var kinectron = null;
var lightImage;

function preload(){
  lightImage = loadImage("light.jpg");
}

function setup() {
	createCanvas(500, 500);
  var address = {host: '128.122.253.79', port: 9001, path: '/'};
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
}var kinectron = null;
var mySound;

function preload(){
  mySound = loadSound("Taylor Swift - Shake It Off.mp3");
}

function setup() {
	createCanvas(500, 500);
  var address = {host: '172.16.216.84', port: 9001, path: '/'};
	kinectron = new Kinectron('kinectron',address);
	kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
  mySound.play();
  // console.log(kinectron)
  //set the callback function name to be called when stuff comes from kinect
}

function draw() {

}

function trackBody(body) {
  background(0);
  var val = body.joints[kinectron.HANDRIGHT].cameraZ;
  console.log(val);
  var vol = map(val,0,4,0,1);

  mySound.amp(vol);
}var video;
var audio;

function setup() { 
  createCanvas(400, 400);
    background(220);

  video = createCapture(VIDEO)
  video.hide()
  

} 

function draw() { 
  loadPixels()
  
  for (var x = 0; x < width; x=x+20){
    for (var y = 0;y < height; y=y+20){
  // ellipse(x,y,20,20)
      image(video,x,y,20,20)
    }}
}var video;
var vScale = 16;

var particles = [];

var slider;

function setup() {
    createCanvas(640, 480);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(width / vScale, height / vScale);
    for (var i = 0; i < 100; i++) {
        particles[i] = new Particle(320, 240);
    }
    background(51);
}


function draw() {
    // background(220);
    video.loadPixels();
    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].show();
    }
}var video;
var button;

function setup() {
    createCanvas(400, 400);
    background(220);

    // button = createButton('button');
    // button.position(0,0)
    // button.mousePressed(takeSnap)

}

// function takeSnap() {
// image(video,x,y);
// tint(244,80,80); 
// }


function draw() {

    video = createCapture(VIDEO)

    for (var x = 0; x < width; x + 10) {
        for (var y = 0; y < height; y + 10) {
            video.size(20, 20);
            video.hide();
            image(video, x, y);
            tint(244, 80, 80);
        }
    }
}// variables to initialize the chart
var pollution;
var api = 'http://api.openweathermap.org/pollution/v1/co/'
var lat = '10'
var comma = ','
var long = +'74'
var apikey = '/current.json?appid=86b1f68187923c62492ece8193264951'

// variables to store place -> lat/long conversion
var locationAPI = 'https://maps.googleapis.com/maps/api/geocode/json?address='
var userLocation;
var locationAPIkey = '&key=AIzaSyAgTSWUqvk47Q4_USB-zV4vgNy_FifYwkQ'
var placeConvert;
var newLong;
var newLat;
var placeURL;

// load weather API to present initial data
function preload() {
   var url = api + lat + comma + long + apikey
   loadJSON(url, gotWeather)
}


function readPlace() {
    userLocation = input.value();
    placeURL = locationAPI + userLocation + locationAPIkey
    console.log(placeURL)
    loadJSON(placeURL, convertPlacetoLatLong)

}

// functions to hold API's in objects
function convertPlacetoLatLong(googAPI) {
    placeConvert = googAPI;
    // console.log(placeConvert) 
    newLat = placeConvert.results[0].geometry.bounds.northeast.lat
    // console.log(placeConvert.results[0].geometry.bounds.northeast.lat)
    newLong = placeConvert.results[0].geometry.bounds.northeast.long
    var url = api + newLat + comma + newLong + apikey
    loadJSON(url, gotWeather)
}

function gotWeather(data){
  pollution = data;
}

var input;
var button;

// change chart based on user input
function setup() {
  createCanvas(420,1200)
    input = createInput();
    input.position(0,0);

    button = createButton('submit');
    button.position(input.x + input.width,0);

    userLocation = input.value();
    button.mousePressed(readPlace);

}

function doSomething() {
    console.log(input.value())
}




// draw chart
function draw() {
    background(180, 230, 255);

    if (pollution) {
        for (var i = 0; i < pollution.data.length; i++) {

            var pressure = pollution.data[i].pressure
            var COlevel = pollution.data[i].value
            var loggedP = log(pressure)
            var Ypos = map(loggedP, -12, 7, height - 50, 10)
            var Height = map(COlevel, 0, 0.00001, 0, width / 1.5)
            line(180, Ypos, 180 + Height, Ypos);
            push()
            textSize(8)
            textAlign(LEFT)
            text("Pressure: " + pressure + "\nCO Level: " + COlevel, 20, Ypos)
            pop()

            // Find Sea Level

            if (pressure == 1) {
                push()
                fill(100, 200, 255)
                textSize(22)
                textAlign(RIGHT)
                text("Sea Level", width - 5, Ypos - 5)
                strokeWeight(3)
                stroke(100, 200, 255)
                line(width, Ypos, width - 50, Ypos, 10);
                pop();

            }


        }
    }
}


// function titles() {
//     textAlign(CENTER)

//     textAlign(RIGHT)
//     text("Carbon Monoxide mixing ratio\nof New York City", width / 1.01, 280)
//     textSize(12)

//     text("Levels of CO above\n12,800 ppm are deadly\n12,800ppm = 0.0128", width / 1.01, 330)
//     pop()
// }var api = 'http://chroniclingamerica.loc.gov/search/pages/results/?andtext='
var place = 'seattle'
var url = api + place


function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}var video;
var audio;

function setup() { 
// createCanvas(200,200)
// background(10)  
  video = createCapture(VIDEO);
  audio = createCapture(AUDIO);
  


} 

function draw() { 
  // video.size(200,200);
 image(video,0,0);
   // filter(INVERT);

}

// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 16-11: Simple color tracking

var video;

  // sum of qualifying coordinates
  var cumulativeX = 0;
  var cumulativeY = 0;
  var numberThatQualified = 0;
  

// A variable for the color we are searching for.
var trackColor; 

function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width,height);
  // The above function actually makes a separate video
  // element on the page.  The line below hides it since we are
  // drawing the video to the canvas
  video.hide();

  // Start off tracking for red
  trackColor = [255, 0, 0];
}

function draw() {
  

  // Draw the video
  image(video,0,0);

  // We are going to look at the video's pixels
  video.loadPixels();

	//Make a threshold for a group of pixels
  var threshold = 30;

  // sum of qualifying coordinates
  cumulativeX = 0;
  cumulativeY = 0;
  numberThatQualified = 0;
  

  for (var y = 0; y < video.height; y++ ) {
    for (var x = 0; x < video.width; x++ ) {
      var loc = (x + y * video.width) * 4;
      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r1 = video.pixels[loc   ]; 
      var g1 = video.pixels[loc + 1];
      var b1 = video.pixels[loc + 2];

      var r2 = trackColor[0];
      var g2 = trackColor[1];
      var b2 = trackColor[2];

      // Using euclidean distance to compare colors
      var d = dist(r1, g1, b1, r2, g2, b2); // We are using the dist( ) function to compare the current color with the color we are tracking.

      // if it close enough
      if (d < threshold) {
        numberThatQualified ++;
        cumulativeX = cumulativeX + x;
        cumulativeY = cumulativeY + y;
      }
    }
  }

  // We only consider the color found if its color distance is less than 10. 
  // This threshold of 10 is arbitrary and you can adjust this number depending on how accurate you require the tracking to be.
  if (numberThatQualified  >0 ) { 
    // Draw a circle at the tracked pixel
    fill(trackColor);
    strokeWeight(4.0);
    stroke(0);
    
    ellipse(cumulativeX/numberThatQualified , cumulativeY/numberThatQualified , 16, 16);
  }
}


function mousePressed() {
  // Save color where the mouse is clicked in trackColor variable
  trackColor = video.get(mouseX,mouseY);
  console.log(trackColor);
}
var pollution;
var latANDlong = "10,74"
var datetime = "current"

function setup() {
    createCanvas(400, 1200);
    background(100, 200, 255);
    textAlign(CENTER)
    var urlCO = 'http://api.openweathermap.org/pollution/v1/co/' + latANDlong + '/' + datetime + '.json?appid=86b1f68187923c62492ece8193264951'
    var urlO3 = 'http://api.openweathermap.org/pollution/v1/o3/' + latANDlong + '/' + datetime + '.json?appid=86b1f68187923c62492ece8193264951'
    var urlSO2 = 'http://api.openweathermap.org/pollution/v1/so2/' + latANDlong + '/' + datetime + '.json?appid=86b1f68187923c62492ece8193264951'
    var urlNO2 = 'http://api.openweathermap.org/pollution/v1/no2/' + latANDlong + '/' + datetime + '.json?appid=86b1f68187923c62492ece8193264951'

    
    
    loadJSON(urlCO, gotDataCO)
    loadJSON(urlO3,gotDataO3)
    loadJSON(urlSO2, gotDataSO2)
    loadJSON(urlNO2,gotDataNO2)
  
    textAlign(RIGHT)
    text("Carbon Monoxide mixing ratio\nof New York City", width / 1.01, 280)
    textSize(12)

    text("Levels of CO above\n12,800 ppm are deadly\n12,800ppm = 0.0128", width / 1.01, 330)
    pop()

}
function gotDataNO2(data) {
    pollution = data;
}

function gotDataCO(data) {
    pollution = data;
}

function gotDataSO2(data) {
    pollution = data;
}

function gotDataO3(data) {
    pollution = data;
}



function draw() {
    fill(0)

    if (pollution) {
        for (var i = 0; i < 45; i++) {

            // syntax for .length of string?

            var pressure = pollution.data[i].pressure
            var COlevel = pollution.data[i].value
            // var NO2level = pollution.data[i].value
            // var level = pollution.data[i].value
            // var COlevel = pollution.data[i].value

            
            var loggedP = log(pressure)
            var Ypos = map(loggedP, -12, 7, height - 50, 10)
            var Height = map(COlevel, 0, 0.0000003, 0, width / 1.5)
            line(180, Ypos, 180 + Height, Ypos);
            push()
            textSize(8)
            textAlign(LEFT)
            text("Pressure: " + pressure + "\nCO Level: " + COlevel, 20, Ypos)
            pop()

            // Find Sea Level

            if (pressure == 1) {
                push()
                fill(242, 243, 255)
                textSize(22)
                textAlign(CENTER)
                text("Sea Level", width - 70, Ypos - 5)
                strokeWeight(3)
                stroke(242, 243, 255)
                line(width, Ypos, width - 150, Ypos, 10);
                pop();

            }

        }
    }
}// variables to initialize the chart
var pollution;
var api = 'http://api.openweathermap.org/pollution/v1/co/'
var lat = '10'
var comma = ','
var long = +'74'
var apikey = '/current.json?appid=86b1f68187923c62492ece8193264951'

// variables to store place -> lat/long conversion
var locationAPI = 'https://maps.googleapis.com/maps/api/geocode/json?address='
var userLocation;
var locationAPIkey = '&key=AIzaSyAgTSWUqvk47Q4_USB-zV4vgNy_FifYwkQ'
var placeConvert;
var newLong;
var newLat;


var input;
var button;

// load weather API to present initial data
function preload() {
    var url = api + lat + comma + long + apikey
    loadJSON(url, gotWeather)
}


function pollutionAsk() {
    var placeURL = locationAPI + String(input.value()) + locationAPIkey
    console.log(placeURL)
    
    loadJSON(placeURL, gotLatFromGoogle)
}

// functions to hold API's in objects
function gotLatFromGoogle(googdata) {
    placeConvert = googdata;
    newLat = placeConvert.results[0].geometry.bounds.northeast.lat
    newLong = placeConvert.results[0].geometry.bounds.northeast.long
    console.log(newLat)
    var url = api + newLat + comma + newLong + apikey
    json2()
}

  function json2(){
  loadJSON(url, gotWeather)
}

function gotWeather(data) {
    pollution = data;
}


// change chart based on user input
function setup() {
    input = createInput();
    input.position(40, 15);

    button = createButton('submit');
    button.position(input.x + input.width + 5, 15);

    // userLocation = input.value();
    button.mousePressed(pollutionAsk);
    createCanvas(400, 1200);
}




// draw chart
function draw() {
    background(180, 230, 255);

    if (pollution) {
        for (var i = 0; i < pollution.data.length; i++) {

            var pressure = pollution.data[i].pressure
            var COlevel = pollution.data[i].value
            var loggedP = log(pressure)
            var Ypos = map(loggedP, -12, 7, height - 50, 10)
            var Height = map(COlevel, 0, 0.0000003, 0, width / 1.5)
            line(180, Ypos, 180 + Height, Ypos);
            push()
            textSize(8)
            textAlign(LEFT)
            text("Pressure: " + pressure + "\nCO Level: " + COlevel, 20, Ypos)
            pop()

            // Find Sea Level

            if (pressure == 1) {
                push()
                fill(100, 200, 255)
                textSize(22)
                textAlign(RIGHT)
                text("Sea Level", width - 5, Ypos - 5)
                strokeWeight(3)
                stroke(100, 200, 255)
                line(width, Ypos, width - 50, Ypos, 10);
                pop();

            }


        }
    }
}


function titles() {
    textAlign(CENTER)

    textAlign(RIGHT)
    text("Carbon Monoxide mixing ratio\nof New York City", width / 1.01, 280)
    textSize(12)

    text("Levels of CO above\n12,800 ppm are deadly\n12,800ppm = 0.0128", width / 1.01, 330)
    pop()
}var pollution;
var input;
var latANDlong = "10,74"

function setup() {
    createCanvas(400, 1200);
    background(100, 200, 255);
    textAlign(CENTER)
    // var url ='http://api.openweathermap.org/pollution/v1/co/'+ lat + ',' long + '/current.json?appid=86b1f68187923c62492ece8193264951'
        var url ='http://api.openweathermap.org/pollution/v1/co/' + latANDlong + '/current.json?appid=86b1f68187923c62492ece8193264951'

    loadJSON(url, gotData)
  
}

function gotData(data) {
    pollution = data;
}



function draw() {
    fill(0)
// //     textSize(8)
// //     text("Atmospheric Pressure", width / 1.2, 350)
   

//     push()
    textAlign(RIGHT)
//     textSize(18)
//     // line(width / 1.8, 355, 400, 355, 10);
    text("Carbon Monoxide mixing ratio\nof New York City", width / 1.01, 280)
    textSize(12)

    text("Levels of CO above 12,800 ppm are deadly\n12,800ppm = 0.0128", width / 1.01, 330)  
  // pop()
    if (pollution) {
        // for (var i = 0; i < pollution.data.value.length; i++) {
        for (var i = 0; i < 44; i++) {

          // syntax for .length of string?

            var pressure = pollution.data[i].pressure
            var COlevel = pollution.data[i].value
            var loggedP = log(pressure)
            var Ypos = map(loggedP, -12, 7, height - 50, 10)
            var Height = map(COlevel, 0, 0.0000003, 0, width/1.5)
            line(180, Ypos, 180+Height, Ypos);
            push()
            textSize(8)
            textAlign(LEFT)
            text("Pressure: " + pressure + "\nCO Level: " + COlevel,20, Ypos)
            pop()

        //     if(COlevel < 0) {
        //      splice(pollution.data[i].pressure)
        //      splice(pollution.data[i].value)
        // }
          
            if (pressure == 1) {
                push()
                fill(242, 243, 255)
                textSize(22)
                textAlign(CENTER)
                text("Sea Level", width - 70, Ypos - 5)
                // strokeWeight(1)
                stroke(242, 243, 255)
                line(width, Ypos, width-150, Ypos, 10);
                pop();

            }
           
        
        }
    }
}var columns = [];     // object array to hold columns
var rectHeight = [];  // hold the random height of columns
var airplane;         // object that is controlled
////
var serial;           // variable to hold an instance of the serialport library
var inData;           // variable to hold incoming data
var portName = '/dev/cu.usbmodem411'; // fill in your serial port name here
var options = { baudrate: 9600  };    // data rate

function setup() {
    createCanvas(400, 400);
    for (var i = 0; i < 20; i++) {
        columns.push(new Column());
    }
    airplane = new Airplane();
    serialCommands(); 
}

function draw() {
    background(220);
    createColumns();
    createPlane();
}


// Functions:

function createPlane() {
    mappedData = map(inData,0,1023,0,5)
    console.log(mappedData)
    airplane.movePlane(mappedData)
    airplane.createPlane()
}


function createColumns() {
    for (var i = 0; i < columns.length; i++) {
        columns[i].moveColumn();
        columns[i].displayColumn();
        columns[i].checkColumn();
    }
}



// Objects:

class Airplane {
    constructor() {
        this.xpos = 150
        this.ypos = 200
    }
    movePlane(newData) {
        if (this.xpos == 150) {
            this.ypos = this.ypos - newData
        } else {
            this.ypos = this.ypos + newData
        }
    }

    createPlane() {
        fill(0)
        ellipse(this.xpos, this.ypos, 20, 20)
    }

//     checkPlane(){
//      if(this.yposB == columns[i].yposB &&
//         this.xposB == columns[i].xposB ||
//         this.yposT == columns[i].yposT &&
//         this.xposT == columns[i].xposT) {
//        this.ypos = this.ypos
//      }
//     }

}

class Column {

    constructor() {
        for (var i = 0; i < columns.length; i++) {
            this.xposB = width + i * 60;
            this.xposT = width + 240 + i * 60;
        }

        this.yposB = height - random(125, 200);
        this.yposT = random(-80, -125)
        this.color = 150;
        this.height = 200;
        this.width = 30;
        this.speed = 5
    }

    moveColumn() {
        this.xposB = this.xposB - this.speed;
        this.xposT = this.xposT - this.speed;

    }

    displayColumn() {
        fill(0);
        rect(this.xposB, this.yposB, this.width, this.height);
        rect(this.xposT, this.yposT, this.width, this.height);
    }

    checkColumn() {
        if (this.xposB < -30) {
            this.xposB = width
        }
        if (this.xposT < -30) {
            this.xposT = width
        }

    }
}
var columns = [];
var rectHeight = [];
var airplane;

function setup() {
    createCanvas(400, 400);
    for (var i = 0; i < 20; i++) {
        columns.push(new Column());
    }
    airplane = new Airplane();

}

function draw() {
    background(220);
    createColumns();
    createPlane();
}


// Functions:

function createPlane() {
    airplane.movePlane()
    airplane.createPlane()
}


function createColumns() {
    for (var i = 0; i < columns.length; i++) {
        columns[i].moveColumn();
        columns[i].displayColumn();
        columns[i].checkColumn();
    }
}



// Objects:

class Airplane {
    constructor() {
        this.xpos = 150
        this.ypos = 200
    }
    movePlane() {
        if (mouseIsPressed) {
            this.ypos = this.ypos - 2
        } else {
            this.ypos = this.ypos + 2
        }
    }


    createPlane() {
        ellipse(this.xpos, this.ypos, 20, 20)
    }

    checkPlane(){
     if(this.yposB == columns[i].yposB &&
        this.xposB == columns[i].xposB ||
        this.yposT == columns[i].yposT &&
        this.xposT == columns[i].xposT) {
       this.ypos = this.ypos
     }
    }

}

class Column {

    constructor() {
        for (var i = 0; i < columns.length; i++) {
            this.xposB = width + i * 60;
            this.xposT = width + 240 + i * 60;
        }

        this.yposB = height - random(125, 200);
        this.yposT = random(-80, -125)
        this.color = 150;
        this.height = 200;
        this.width = 30;
        this.speed = 5
    }

    moveColumn() {
        this.xposB = this.xposB - this.speed;
        this.xposT = this.xposT - this.speed;

    }

    displayColumn() {
        fill(0);
        rect(this.xposB, this.yposB, this.width, this.height);
        rect(this.xposT, this.yposT, this.width, this.height);
    }

    checkColumn() {
        if (this.xposB < -30) {
            this.xposB = width
        }
        if (this.xposT < -30) {
            this.xposT = width
        }

    }
}
var checkboxes = [];
var label = [];
var button;
var likeCats = 1;

function setup() {
  createCanvas(400,400);
  background(220);
  textSize(24);
  text("ARE YOU A CAT?",50,50);
  
  for(var i = 1; i <=4; i++){
   label = i
    if(i == 1){
      label = "Do you like cats?"
    }
      if(i == 2){
      label = "Has a cat made you happy?"
    }
     if(i == 3){
      label = "Have you found hair in your mouth?"
    }
      if(i == 4){
      label = "Do you sleep daily?"
    }
      
    checkboxes[i] = createCheckbox(label, false);
    checkboxes[i].position(20,i*30+50);
    checkboxes[i].changed(myCheckedEvent);

  }

  button = createButton("Submit");
  button.mouseReleased(answerScreen);
  button.position(50,200);

}

function answerScreen (){
 fill(220)
 noStroke()
 rect(0,200,400,200)
 fill(0)
 if (checkboxes[likeCats].checked() && checkboxes[2].checked() &&
     checkboxes[3].checked() && checkboxes[4].checked()) {
  text("You are probably a cat",100,320) 
 }
 if (checkboxes[1].checked() && checkboxes[2].checked() &&
     checkboxes[3].checked() && !checkboxes[4].checked() ) {
  text("Seek medical attention",100,320) 
 }
 if (checkboxes[1].checked() && checkboxes[2].checked() &&
     !checkboxes[3].checked() && !checkboxes[4].checked())
 {
  text("Sorry you are so alone.",100,320) 
 }  
 if (checkboxes[1].checked() && !checkboxes[2].checked() &&
     !checkboxes[3].checked() && !checkboxes[4].checked()){
 text("Woop de friggen do",100,320) 
 }  
  
 if (!checkboxes[1].checked() && checkboxes[2].checked() &&
     checkboxes[3].checked() && checkboxes[4].checked()) {
  text("Do you make love to cats?",100,320) 
 }
 if (!checkboxes[1].checked() && !checkboxes[2].checked() &&
     checkboxes[3].checked() && checkboxes[4].checked() ) {
  text("Your hair or...",100,320) 
 }
 if (!checkboxes[1].checked() && !checkboxes[2].checked() &&
     !checkboxes[3].checked() && checkboxes[4].checked())
 {
  text("Congrats hooman",100,320) 
 }  
 if (!checkboxes[1].checked() && !checkboxes[2].checked() &&
     !checkboxes[3].checked() && !checkboxes[4].checked()){
 text("Try again",100,320) 
 }
 if (checkboxes[1].checked() && !checkboxes[2].checked() &&
     checkboxes[3].checked() && checkboxes[4].checked() ) {
  text("Try again you oxymoron",100,320) 
 }
 if (checkboxes[1].checked() && checkboxes[2].checked() &&
     !checkboxes[3].checked() && checkboxes[4].checked())
 {
  text("Call GUINNESS immediately",100,320) 
 }   
 if (!checkboxes[1].checked() && checkboxes[2].checked() &&
     checkboxes[3].checked() && !checkboxes[4].checked() ) {
  text("Do you make love to cats?",100,320) 
 }
 if (checkboxes[1].checked() && !checkboxes[2].checked() &&
     !checkboxes[3].checked() && checkboxes[4].checked())
 {
  text("Perhaps the only normal response",100,320) 
 }  
 if (checkboxes[1].checked() && !checkboxes[2].checked() &&
     checkboxes[3].checked() && !checkboxes[4].checked()){
 text("You are a cat person",100,320) 
 }  
 if (!checkboxes[1].checked() && checkboxes[2].checked() &&
     !checkboxes[3].checked() && checkboxes[4].checked()){
 text("Happiness is just a meow away",50,320) 
 }  
  
 if (!checkboxes[1].checked() && !checkboxes[2].checked() && 
 checkboxes[3].checked() && !checkboxes[4].checked()){
 text("Whose hair?",100,320) 
 }  
   
 if (!checkboxes[1].checked() && checkboxes[2].checked() && 
 !checkboxes[3].checked() && !checkboxes[4].checked()){
 text("How happy?",100,320) 
 }  
  
}

function myCheckedEvent() {
  if (this.checked()) {
    console.log("hi!");
  } else {
    console.log("Unchecking!");
  }
}var sizeslider;
var RedAmt;
var BlueAmt;
var GreenAmt;


function setup() {
    createCanvas(400, 400);
    createsliders();
}


function draw() {
    background(245);
    colorpicker(24,16);

}

////////////////////////////////////////////////



function createsliders() {
    sizeslider = createSlider(0, 1000, 250);
    sizeslider.position(20, 80);
    RedAmt = createSlider(0, 255, random(255));
    RedAmt.position(20, 120)
    GreenAmt = createSlider(0, 255, random(255));
    GreenAmt.position(20, 160)
    BlueAmt = createSlider(0, 255, random(255));
    BlueAmt.position(20, 200)

}


function colorpicker(numbersize,labelsize) {
    var size = sizeslider.value();
    var Red = RedAmt.value();
    var Green = GreenAmt.value();
    var Blue = BlueAmt.value();

    noStroke()
    fill(Red, Green, Blue)
    ellipse(width / 1.3, height / 1.3, size, size)

    push()
    textSize(numbersize)
    fill(100)
    text(Red + ',', 250, 50)
    text(Green + ',', 300, 50)
    text(Blue, 350, 50)
    pop()

    fill(90);
    textSize(labelsize);
    text('Size', 160, 90)
    fill(Red, 0, 0);
    text('Red', 160, 130)
    fill(0, Green, 0);
    text('Green', 160, 170)
    fill(0, 0, Blue);
    text('Blue', 160, 210)

}var mySlider;

function setup() {
    createCanvas(400, 400);
    mySlider = createSlider(0, 300, 111);
    mySlider.position(width / 3, height / 2)
    mySlider.changed(NoNo);

}

function draw() {
    background(220);
    var val = mySlider.value();
    No(val);
}

function No(x) {
    textAlign(CENTER);
    fill(0);
    textSize(x);
    text("No", 200, 240);
}

function NoNo(){
      print("oh no")
}var rainDrops = [];
var score = 0;
var catcher = 200;
var milliseconds;
var secondsLeft = 1;
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem411'; // fill in your serial port name here
var options = {
    baudrate: 9600
}; // change the data rate to whatever you wish
var inData; // for incoming serial data
var catcher;

function setup() {
    createCanvas(400, 400);
    beginGame();
    serialCommands();
}

function draw() {
   background(150);
   createDrops();
   rainCatcher(inData);
   growScoreKeeper();
   timer();
}
  

var rainDrops = [];
var score = 0;
var catcher = 200;
var milliseconds;
var secondsLeft = 1;

function setup() {
    createCanvas(400, 400);
    beginGame();
}

function draw() {
   background(150);
   createDrops();
   rainCatcher();
   growScoreKeeper();
   timer();
}
  

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem411'; // fill in your serial port name here
var options = {
    baudrate: 9600
}; // change the data rate to whatever you wish
var inData; // for incoming serial data
var xPos = 0; // x position of the graph


function setup() {
    createCanvas(440, 420);
    background(0x08, 0x16, 0x40);
    serialCommands();

}

function draw() {
    graphData(inData);
}


////////////////////////////////////////////////////////////////////////////////////////////////


function serialCommands(){
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing
    serial.open(portName, options);
    serial.list(); // list the serial ports
    serial.open(portName); // open a serial port
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
  console.log(inString)
  // check to see that there's actually a string there:
  if (inString.length > 0 ) {
  // convert it to a number:
  inData = int(inString);
  }
}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}


// get the list of ports:
function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
        // Display the list the console:
        console.log(i + " " + portList[i]);
    }
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
}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem641'; // fill in your serial port name here
var options = {
    baudrate: 9600
}; // change the data rate to whatever you wish
var inData; // for incoming serial data
var xPos = 0; // x position of the graph


function setup() {
    createCanvas(440, 420);
    background(0x08, 0x16, 0x40);
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing
    serial.open(portName, options);
    serial.list(); // list the serial ports
    serial.open(portName); // open a serial port
}

function serverConnected() {
    println('connected to server.');
}

function portOpen() {
    println('the serial port opened.')
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
        println(i + " " + portList[i]);
    }
}


////////////////////////////////////////////////////////////////////////////////

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
       // background(0x08, 0x16, 0x40);
    } else {
        // increment the horizontal position for the next reading:
        xPos++;
    }
}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem441'; // fill in your serial port name here
var options = {baudrate: 9600}; // change the data rate to whatever you wish
var inData; // for incoming serial data
var xPos = 0;                           // x position of the graph


function setup() {
    createCanvas(440, 420);
    background(0x08, 0x16, 0x40);
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing
    serial.open(portName, options);

    serial.list(); // list the serial ports
    serial.open(portName); // open a serial port
}

function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.')
}

function serialEvent() {
    inData = Number(serial.read());
}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}


// get the list of ports:
function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
        // Display the list the console:
        console.log(i + " " + portList[i]);
    }
}


////////////////////////////////////////////////////////////////////////////////

function draw() {
   graphData(inData)
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
}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem641'; // fill in your serial port name here
var options = {
    baudrate: 9600
}; // change the data rate to whatever you wish
var inData; // for incoming serial data
var xPos = 0; // x position of the graph


function setup() {
    createCanvas(440, 420);
    background(0x08, 0x16, 0x40);
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing
    serial.open(portName, options);
    serial.list(); // list the serial ports
    serial.open(portName); // open a serial port
}

function serverConnected() {
    println('connected to server.');
}

function portOpen() {
    println('the serial port opened.')
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
        println(i + " " + portList[i]);
    }
}


////////////////////////////////////////////////////////////////////////////////

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
       // background(0x08, 0x16, 0x40);
    } else {
        // increment the horizontal position for the next reading:
        xPos++;
    }
}var funBalls = [];


function setup() {
    createCanvas(400, 400);
        // for (var i = 0; i < 4; i++) {
        // funBalls[i] = new Ball(random(width),random(height));
        // }
}


function draw() {
    background(220);
    for (var i = 0; i < funBalls.length; i++) {
    funBalls[i].display();
    funBalls[i].move();
    }
    if(funBalls.length > 20){
     funBalls.splice(0,10) 
    }
}

function mouseDragged() {
    funBalls.push(new Ball(mouseX,mouseY));
    return false;
}

class Ball {

    constructor(x,y) {
        this.x = x
        this.y = y
        this.radius = random(10, 40)
        this.xspeed = random(-5, 5)
        this.yspeed = random(-5, 5)
    }

    display() {
        fill(random(0, 25),
        random(150, 200),
        random(230, 25));
        noStroke();
        ellipse(this.x, this.y, this.radius, this.radius);
    }

    move() {
        this.x = this.x + this.xspeed
        this.y = this.y + this.yspeed
        if (this.x > width || this.x < 0) {
            this.xspeed = -this.xspeed
        }
        if (this.y > height || this.y < 0) {
            this.yspeed = -this.yspeed
        }
    }

}var funBalls = [];

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220);
    instruction("Click and Drag", 200);

    for (var i = 0; i < funBalls.length; i++) {
        funBalls[i].display();
        funBalls[i].move();
    }
    if (funBalls.length > 20) {
        funBalls.splice(0, 10)
    }
}

function mouseDragged() {
    funBalls.push(new Ball(mouseX, mouseY));
    return false;
}// Declare rain drops as an array variable
var rainDrops = [];
var mycolor;
//var specialDrop;
var R;
var G;
var B;
var score = 0;

// Create multiple objects 
// Uses 'for loop', and '.push' to create multiple instances of that object

function setup() {
    createCanvas(400, 400);

    for (var i = 0; i < 100; i++) {
      
        mycolor = color(70, 150, 255);
        rainDrops.push(new Thedrop());
      
        for (i = 90; i < 95; i++) {
            mycolor = color(255, 230, 70);
        }
        for (i = 96; i < 100; i++) {
            mycolor = color(234, 110, 110);
        }
      
    }

}

// Construct rain drop

class Thedrop {
    constructor(x) {
        this.color = mycolor
        this.ypos = random(height);
        this.xpos = x;
        this.speed = random(4, 9);
    }

    // Movement
    drop() {
        this.ypos = this.ypos + this.speed;
    }

    // Build the rain drop
    displayDrop() {

        noStroke();
        fill(255, 255, 255);

        triangle(this.xpos - 9, this.ypos,
            this.xpos + 11, this.ypos,
            this.xpos, this.ypos - 41);

        ellipse(this.xpos + 1, this.ypos + 2, 20, 20);


        fill(this.color);

        triangle(this.xpos - 10, this.ypos,
            this.xpos + 10, this.ypos,
            this.xpos, this.ypos - 40);

        ellipse(this.xpos, this.ypos, 20, 20);
    }

    // Check the drop
    checkDrop() {
        if (this.ypos > height) {
            this.ypos = 0;
            this.xpos = random(400);
        }
    }
}

// Combine it all!
function draw() {
    background(150);

    for (var p = 0; p < rainDrops.length; p++) {
        rainDrops[p].drop();
        rainDrops[p].displayDrop();
        rainDrops[p].checkDrop();

    }

   // rainCatcher();
    stroke(234, 180, 40);
    strokeWeight(2);
    fill(230);
    rect(0, 0, 100, 50);
    noStroke();
    fill(0);
    text('Score: ' + score, 25, 25);


}




// function keyPressed() {
//     print(keyCode);
// }


//////////////////////////////////////////////////////////////////////////////////////////
//////////// CATCHER
//////////////////////////////////////////////////////////////////////////////////////////

var catcher = 200;


function happyText(HX, HY) {
    textSize(20)
    fill(0)
    text("Yay!", HX, HY)
}

/*
function rainCatcher() {

    catcher = mouseX

    rectMode(CENTER)
    fill(0)
    rect(catcher, 380, 100, 40)
  
    for (var q == 90; q < 95; q++) {
        if (catcher > rainDrops[q].xpos - 50 &&
            catcher < rainDrops[q].xpos + 50 &&
            rainDrops[q].ypos >= 395) {
            fill(230);
            score = score + 1;
            return score;
        }
    }
    for (var w == 96; w < 100; w++) {
        if (catcher > rainDrops[w].xpos - 50 &&
            catcher < rainDrops[w].xpos + 50 &&
            rainDrops[w].ypos >= 395) {
            fill(230);
            score = score - 1;
            return score;
        }
    }
}*/var myBall = [];
var r = 10;


function setup() {
  createCanvas(400, 400);
  for (var i = 0; i<43; i++){
  myBall.push(new Ball());
  }
  }

function draw() {
  background(255);
  for (var i = 0; i< myBall.length; i++){
  myBall[i].display();
  myBall[i].move();
  myBall[i].bounce();
}
  
}



class Ball{
  
  constructor() {
  this.x = random(width);
  this.y = random(height);
  this.xspeed = random(2,5);
  this.yspeed = random(2,5);
  }
  
  display() {
  var color1 = random(255);
  var color2 = random(255);
  var color3 = random(255);
  noStroke();
  fill(color1,color2,color3)  
  ellipse(this.x, this.y, r*2, r*2);
  }

  move() {
  this.x += this.xspeed;
  this.y += this.yspeed;
  }

  bounce() {
  if (this.x > width - r || this.x < r) {
    this.xspeed = -this.xspeed;
  }
    
  if (this.y > height - r || this.y < r) {
    this.yspeed = -this.yspeed;
  }
    
  }
}  function setup() {
  createCanvas(200, 200);
  background(255);
  text('Temperature in °C: 25', 0, 50);
  var temp = CtoF(45);
  text('Temperature in °F: ' + temp, 0, 100);
}

function CtoF(celc) {
  var fare = celc*1.8 + 32;
  return fare;
}function setup() {
  createCanvas(200, 200);
  background(255);
  noStroke();
  colorMode(HSB, 255);
  
  for (var i=50; i<151; i+=50) {
    iceCream(i, 100, random(30,45));
  }
}

function iceCream(x, y, diameter) {
  
  // ice cream
  // want three colors
  // want three locations
  fill(random(360), 112, 331);
  arc(x, y, diameter, diameter, -PI, 0);
  
  // cone
  fill('#d7c38e');
  triangle(x - diameter / 2, y + 5, x + diameter / 2, y + 5, x, y + diameter * 1.3);
}var rad = 10;
var myBall;
var lastTime = 0;
var placement_1;
var placement_2;

function setup() { 
  createCanvas(400, 400);
  background(0);
  myBall = new Orb();
} 

function draw() { 
  
  myBall.grow(20,20);
  myBall.random();

 
}

function Orb(){  
    
this.grow = function(X,Y){
  noStroke();
  ellipse(X,Y,rad,rad)
  rad+= 0.2
}

this.random = function(){
 if (millis() - lastTime > 1200) {
  placement_1 = random(400) ;
  placement_2 = random(400) ;
  myBall.grow(placement_1,placement_2);
  lastTime = millis(); 
}

}
}var lastTime = 0;
var millisecond = 0;
var splotches;
var counter = 0;
var strokeline = 1;

function setup() {
  createCanvas(400, 400);
  background(220);
  splotches = new Splotch();
}

function draw() {
  console.log(counter)
  loadPixels();
  for (var y = 0; y < height; y++){
    for (var x = 0; x < width; x++){
       var index = (x+y*width)*4;
    if (pixels[index]==255){
      counter = counter + 0.001
    }
    if (pixels[index]==220){
      counter = counter - 0.0001
    }
      if (x == 400 && y == 400){
        counter = 0
    }
    }}
  if (counter > 4000){
    fill(0)
    rect(0,0,400,400)
    fill(255)
    textSize(20)
    textAlign(CENTER)
    text("GAME OVER",200,200)
  }
  millisecond = millis();
  
  instructions();
  clock();
  cleaner();
  
  if (millis() - lastTime > 1200) {
    splotches.draw();  
    lastTime = millis(); 
  }
  

}

function cleaner(){
  if(mouseIsPressed){
  ellipseMode(CENTER);
  noStroke()
  fill(220)
  ellipse(mouseX,mouseY,50,50);
  }
}

function clock(){
  fill(220)
  strokeWeight(1)
  stroke(50)
  rect(300,340,110,90)
  
  fill(0) 
  noStroke()
  textSize(20)
  text("Time: \n" + millisecond, 320,370);  
  rect()
}


function instructions() {
  
  fill(50)
  noStroke()
  textSize(15)
  text("Click and drag the mouse: \n to keep the canvas clean!",120,370)
}

function Splotch() {  
          
  this.draw = function() {       
 	   // var ssize = 20
    noStroke();
    // strokeWeight(strokeline);
 	   		fill(255, 0, 0);
 			   ellipse(random(400),random(400),strokeline,strokeline);
    strokeline=strokeline+2 
          // ssize++
    }

}    var myCar;
    			
    function setup()
    {
      createCanvas(800, 400);
      
      // create the myCar (ypos, speed)
      myCar = new Car(150, 2);
      

    }
     
    function draw()
    {
      // clear background
      background(255);
      
      //////////////////////////////////
      // myCar
      //////////////////////////////////
      
      // check the xpos of myCar
      if(myCar.xpos > width)
      {
        myCar.xpos = 0;
      } 
      
      // drive myCar
      myCar.drive();
      
      // display myCar
      myCar.display();
      
  
      
    }
    // car constructor
    function Car()
    {
      this.xpos = 0;
      this.ypos = 200;
      this.speed = 2;
      this.c = color(153, 102, 51);
     
      // drive method
      this.drive = function()
      {
        if(this.xpos > width)
        {
          this.xpos = 0;
        }
        this.xpos = this.xpos + this.speed;        
      }
     
      // brake method
      this.brake = function()
      {
        if(this.speed > 0)
        {
          this.speed = this.speed - 0.05;
        } else {
          this.speed = 0;
        }        
      }
     
      // display method
      this.display = function()
      {
        // body of the car
        fill(this.c);
        rectMode(CORNER);
        rect(this.xpos, this.ypos, 100, 50);
     
        // wheels
        fill(0);
        ellipse(this.xpos + 20, this.ypos + 45, 40, 40);
        ellipse(this.xpos + 80, this.ypos + 45, 40, 40);
      }
    }var rainDrops = [];
var score = 0;
var catcher = 200;
var milliseconds;
var secondsLeft = 1;

function setup() {
    createCanvas(400, 400);
    beginGame();
}

function draw() {
   background(150);
   createDrops();
   rainCatcher();
   growScoreKeeper();
   timer();
}
  

var growBall = 0;
var lastTime = 0;
var timePiece = 1;


function setup() { 
  createCanvas(400, 400);
  background(220);
} 

function draw() { 
   
   timeKeeper();
   ellipseGrow(); 
  
}


function ellipseGrow(){
  
  if (timePiece > 0){
    noFill(0)
    stroke(255);
    ellipse(200,200, growBall, growBall);
    growBall=growBall+0.2
  }
  
  
}

function timeKeeper(){
  if (millis() - lastTime > 600) {

       timePiece = timePiece*-1
    
    if (millis() - lastTime > 1200) {
    lastTime = millis();
  }}

}var y = 0;
var M = 50;
var millisecond = 0;

function setup() { 
  createCanvas(400, 400);
  background(220);
} 

function draw() { 
  background(220);
  millisecond = millis()
  //for(A = 0; A<400; A+=random(30)){  
  fallingBall(50,200,250);
  
  
  //}
}
  
  
/* How can I make multiple raindrops?
   
  if (millisecond > 1000){
    fallingBall(50,200,90);
  }
  if (millisecond > 2000){
    fallingBall(0,255,200);
  }
  if (millisecond > 3000){
    fallingBall(255,255,0);
  }
  if (millisecond > 4000){
    fallingBall(100,120,200);
  }

*/


function fallingBall(r,g,b){
  
  noStroke()

  fill(r,g,b)

  
  triangle(M-10,y,M+10,y,M,y-40)
  ellipse(M,y,20,20);
  
  y = y + 18;
  
  if (y > 450){
  y = 0;
  M = random(400);
  }  
  
}
var yposition = 0;
var xposition = 50;
var catcher = 200;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  
  background(220);
  fallingBall(50,200,250);
  rainCatcher();
  
  if (catcher > xposition-20 && 
      catcher < xposition+20 && 
      yposition >= 380)
  {
    happyText()
  }
  
  
}

function happyText(){
    textSize(20)
    fill(0)
    text("Yay!",200,200)
}

function rainCatcher(){
  
  catcher = mouseX
  
  rectMode(CENTER)
  fill(0)
  rect(catcher,380,40,40)
  
}

function fallingBall(r,g,b){

  yposition++
  
  noStroke()
  fill(r,g,b)

  triangle(xposition-10,yposition,xposition+10,yposition,xposition,yposition-40)
  ellipse(xposition,yposition,20,20);
  
  yposition = yposition + 8;
  
  if (yposition > 450){
  yposition = 0;
  xposition = random(400);
  }  
  
}
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  target(mouseX,mouseY,50)

  
  if(mouseIsPressed){
  target(mouseX+20,mouseY-20,50)
  target(mouseX+90,mouseY+90,100)
  target(200,mouseX,mouseY)
  }
}

function target (x,y,diameter) {

  ellipseMode(CENTER)
  
  fill(200,0,0)
  ellipse(x,y,diameter,diameter)
  
  fill(255)
  ellipse(x,y,diameter/2,diameter/2)

  fill(0,14,255)
  ellipse(x,y,diameter/4,diameter/4)
  
  ellipse(random(x),random(y),diameter/4,diameter/4)
  
}
var angle = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {

  background(127)
  
/*
  Because the sin function works in radians, which are >= 6.24, 
  we have to set the starting point at 0 and let it grow slowly.
  This will allow the sin function to return a floating dot number
  between 1 and -1
  

*/
  
  
  angle = angle + 0.1;
  var y = 5 * sin(angle);

  //wave
  fill(0, 0, 255);
  arc(50, 160 + y, 70, 80, 0, PI + QUARTER_PI, CHORD);
  arc(10, 160 + y, 70, 80, 0, PI + QUARTER_PI, CHORD);



}var lastTime = 0;
var A = 0;
var B = 0;
var millisecond = 0;

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  
  fill(50)
  noStroke()
  textSize(15)
  text("Click and drag the mouse: \n to keep the canvas clean!",120,370)
  
  if (millis() - lastTime > 1200) {
     
    fill(255, 0, 0);
    ellipse(random(400),random(400),A,A);
    A+=10

  if (millis() - lastTime > 1201) {
    lastTime = millis();
   
    
  }}
  
  push();
  if(mouseIsPressed){
  ellipseMode(CENTER);
  noStroke()
  fill(220)
  ellipse(mouseX,mouseY,50,50);
  }
  
  millisecond = millis();
  
  
  fill(220)
  strokeWeight(1)
  stroke(50)
  rect(300,340,110,90)
  
  fill(0) 
  noStroke()
  textSize(20)
  text("Time: \n" + millisecond, 320,370);  
  rect()
  
  
  pop();
  

  /*
  var value;
  var I;
  
  
  
  How can I make the black marks grow in size over time,
  instead of growing from one to another?
  
  for(var C = 0; C <= 400; C++){
     I = get(C,D);
  for(var D = 0; D <= 400; D++){ 
     I = get(C,D);
  }}
  value = alpha(I)
  if (value < 100){
  
  
  if(millis()>20000){
  textSize(40)
  fill(240,10,10)
  rect (10,10,380,380)
  fill(0)
  text("GAME OVER",80,200)
  }
  }
  */

}function setup(){
  createCanvas(400,400);
}

function draw(){
  background(255);
  translate(mouseX, mouseY);
   // head
    stroke(0)
    strokeWeight(10);
    fill(51, 204, 51);
    rect(-30, 5, 165, 165);
    //face
    fill(0);
    rect(10, 40, 32, 32);
    fill(0);
    rect(60, 40, 32, 32);
    fill(0);
    rect(35, 72, 32, 16);
    fill(0);
    rect(22, 95, 64, 23);
    fill(0);
    rect(22, 108, 20, 23);
    fill(0);
    rect(22, 108, 20, 23);

    // body
    fill(51, 204, 51);
    rect(0, 165, 108, 200);
  
}
var lastTime = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
/* 
   The function millis() counts up from 0 when the program begins.
   since lastTime is established as 0, millis() - lastTime will be
   false until after 601 milliseconds, at which point, it will be 
   true, triggering the ellipse to be drawn.
   
   The second if statement establishes the length for the ellipse 
   to remain on screen, as the moment millis()-lastTime is more 
   than 1200 milliseconds, the program sets lastTime to the same
   time as millis(), setting millis()-lasttime = 1201-1201 = 0
   redrawing the background over everything for another 600 ms


*/
  if (millis() - lastTime > 600) {
    fill(255, 0, 0);
    ellipse(width / 2, height / 2, width, height);
  if (millis() - lastTime > 1200) {
    lastTime = millis();
  }}

} var x1 = 200
 var y1 = 200
 var x2
 var y2
 var Q
 var W

 
 function setup() {
     createCanvas(400, 400);
 }

 function draw() {
     x2 = mouseX
     y2 = mouseY  
     noStroke()
   
// PARTY BALLS change color in response to slider being dragged
     var music = map(y1, 100, 300, 0, 255)

// BACKGROUND changes color in response to slider being dragged    
     var B = map(y1, 100, 300, 255, 0)
     Q = random(400)
     W = random (400)

     background(B,B-40,B+30)
   
// Slider line   
     strokeWeight(20)
     stroke(145)
     line(201, 101, 201, 301)
   
     strokeWeight(20)
     stroke(30)
     line(200, 100, 200, 300)

// Slider button 
   
     noStroke()
     fill(255)
     ellipse(x1-1, y1-1, 50, 50)   
   
     noStroke()
     fill(120, 150, 240)
     ellipse(x1, y1, 50, 50)
      
     textSize(40)
     text("THE SLIDER",80,70)

// Moving the slider
     if (mouseIsPressed && dist(x1, y1, x2, y2) < 25) {
         y1 = mouseY
         if (mouseY < 100) {
             y1 = 100
         }
         if (mouseY > 300) {
             y1 = 300
         }
         
// party ellipses
       
       fill(music,music/3,music+music) 
       ellipse(Q,W,70,70)
       
       fill(music+music,music,music/3) 
       ellipse(W,Q,40,40)
       
       fill(music/6,music-100,music^2) 
       ellipse(W+20,Q/1.5,20,20)
       
     }

 }

 /////////////////////////////////////////////
 /*
 function mousePressed () {
   
   fill(100)
   rect(mouseX,mouseY,20,20)
 }

 */
 /////////////////////////////////////////////


 /*

 function draw() { 
   background(100);

   fill(0)
   stroke(0)
   strokeWeight(12)
   line(40,40,40,80)
   
   fill(255)
   noStroke()
   ellipse(40,35,20,20)
   
   if (mouseX 
   if (mouseIsPressed)

 }
 */var x = 10;
var y = 10;


function setup() {
    createCanvas(400, 400);
}

function draw() {
    B = random(200, 230)

    x++
    y++
    A = A + 100
    C = C + 100

    background(220);

    fill(R, 100, B)
    rect(100, 100, 40, 40)

    for (var R = 0; R < 105; R++ * 0.05) {
        fill(R, G, B)
        ellipse(A, C, x, y)
        
        for (var G = 0; G < 105; G++ * 0.05) {
            fill(R, G, B)
            ellipse(C, A, x, y)
        }}

        if (mouseY < 100) {
            background(100)
        }
    


}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(20);
  noStroke()
    
  for (var M = 0; M <= width; M = M +20 ){
    for (var N = 0; N <= height; N = 20 + N) {
      
    fill(200)
  ellipse(M,N,10,10)  
  }
  }
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(20);
  noStroke()
    
  for (var M = 0; M <= width; M = 20 + M ){
    for (var N = 0; N <= height; N = 20 + N) {
      fill(-100+M,-100N,M/N+100,70)
 	     ellipse(M,N,100,100)
  }
  }
}

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(20);
  noStroke()
  
// instructions  
  
  fill(240)
  text("MOUSE",355,400)
  strokeWeight(3)
  stroke(230)
  line (20,20,380,380)
  line(380,380,380,360)
  line(380,380,360,380)
  
  strokeWeight(1)
  var A = mouseX*mouseY/400  
  var G = map(A,0,400^2,0,100)
    
  for (var M = 0; M <= width; M = 20 + M ) {
      for (var N = 0; N <= height; N = 20 + N) {    
      fill(-10+M,N-10,M/N+100,70)
 	     ellipse(M,N,G,G) 
      
      fill(-10+M,N-10,M/N+100,1)  
      ellipse(400,400,9*G,9*G)  
      
      fill(-10+M,N-10,M/N+100,1)
      ellipse(400,400,3*G,3*G)  
       
      fill(-10+M,N-10,M/N+100,1)  
      ellipse(400,400,G,G)
        
    
    }
    
    
    }
  
}var x = 0
var y = 0

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(0);
  
  noStroke()
  
  for (var x = 0; x <= width; x += 50) {
    for (var y = 0; y <= height; y += 50) {
      fill (random(255), 0, random(255));
      ellipse(x, y, 25, 25);
    }
}  
  
}var millisecond
var N
// var S = 0

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  
  millisecond = millis()
  N = millis() / 5000
  background(20);
  
  
  // for (var N = S; S >= 0, S = S + 1){
  
  
  if (millisecond >=5000) {
    millisecond = millisecond - (5000*N)
  }
  
  if (millisecond >= 4000) {
    ellipse(200,200,40,40)
  }
  
  else if (millisecond >= 3000){
    rect(80,40,80,40)
  }

  else if (millisecond >= 2000) {
    ellipse(100,200,10,10)
  }
  
  else if (millisecond >= 1000){
    rect(40,40,40,40)
  }
  
  else {
    triangle(20,20,100,100,200,60)
  }
 // } 
}
var PR = 250;
var PG = 140;
var PB = 190;
var words = "scroll over box";

var rR 
var rG
var rB
var X
var Y

function setup() { 
  createCanvas(400, 400);
  background(50);
} 

function draw() { 
  	ellipseMode(CENTER);
		  rectMode(CENTER);
  background(100);
  noStroke()
  
  fill(240);
  text(words,70,40);
  
	  fill(PR,PG,PB);
  rect(100,100,50,50);
  
  if (mouseX >= 75 && mouseX <= 125&&
      mouseY >= 75 && mouseY <= 125) {
    PR = PR-2
    PB = PB-2
    PG = PG-2
    
    fill(230);
    text("click", 90, 100);
  }
  
  else {
    PR = PR+2
    PG = PG+2
    PB = PB+2
    }
  
  if (mouseIsPressed && mouseX >= 75 && 
      mouseX <= 125  && mouseY >= 75 && 
      mouseY <= 125) {
    
    rR = random (255)
    rG = random (255)
    rB = random (255)
    X = random (400)
    Y = random(400)
    
    fill(rR,rG,rB)
    ellipse(X,Y,X,X)
    
  }
}var X = 0;
var M = 0;
var P = "• Move the mouse around to make a rainbow appear.";
var Q = "• Press and hold to make the cloud appear.";

function setup() { 
  createCanvas(400, 400);
} 


function draw() { 
  background(90,130,250);
	  ellipseMode(CENTER);
  noStroke()
  
  X = mouseY-100
  
  // RAINBOW !!!!
  
  // sky 1
  fill(120,140,250)
  rect(0,200,400,50)
  fill(60,110,200)
  rect(0,0,400,120)
  
  //violet
  fill(100,0,200,X)
  ellipse(200,200,320,320)  
  //indigo
  fill(150,0,200,X)
  ellipse(200,200,310,310)
  //blue
  fill(0,150,250,X)
  ellipse(200,200,300,300)
  //green
  fill(20,250,20,X)
  ellipse(200,200,290,290)  
  //yellow
  fill(250,250,0,X)
  ellipse(200,200,280,280)
  //orange
  fill(250,150,40,X)
  ellipse(200,200,270,270)
  //red
  fill(240,20,20,X)
  ellipse(200,200,260,260)
  
  //sky 2
  fill(90,130,250)
  ellipse(200,200,250,250)
  
	  //sun
  fill(250,250,40)
  ellipse(200,200,200,200)
  
  //land
  fill(100,200,40)
  rect(0,250,400,300)
  fill(80,190,20)
  rect(0,250,400,80)
  fill(50,150,30)
  rect(0,250,400,30)
  
  textSize(13);
  fill (80,20,80);
  text(P,40,320);
  text(Q,40,350);
 
  if (mouseIsPressed) {
    
    fill(250)
    ellipse(M+20,50,80,80)
    ellipse(M,20,40,60)
    ellipse(M-80,40,30,30)
    ellipse(M-80,55,70,70)
    ellipse(M-30,40,80,80)
    rect(M-80,40,100,50)
    
    if (M > width) {
      M = 0
    }
    
  }
  
  M = M + 1          
  
}


var X
var Y
var instructions = "click the box"

function setup() { 
  createCanvas(400, 400);
  background(80,150,180)
  text(instructions, 40,20)
  
} 

function draw() { 

  if (mouseX > 300) {
    background(80,150,180)
    noStroke()
    ellipse(250,50,40,40)
      text(instructions, 40,20)

  }else if (mouseX > 200){
    background(80,150,180)
    noStroke()
    ellipse(200,50,40,40)

  }else if (mouseX > 100){
    background(80,150,180)
    noStroke()
    ellipse(150,50,40,40)    
      text(instructions, 40,20)

  }
  
  stroke(100)
  rect(40,40,40,40)

}

function mouseClicked(){
 
  X = random(50,150)
  Y = random(0,400)
  Y2 = random(0,400)
  
  if (mouseX >= 40 && mouseX <= 80 &&
      mouseY >= 40 && mouseY <= 80 ){
    ellipse(Y,Y2,X,X)
      
      }
  
}var X = 0
var speed = 10

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(120);
  
  noStroke()
  ellipse (X,200,50,50)
  
  X = X + speed
  
  if (X >= width) {
   speed = -10; 
  }
  
  if (X < 0) {
   speed = 10;
  }
  
}var X = 0
var Y = 0

var W = 0
var col = 0

var words = ["there", "are", "many", "circles","and","squares"];
var instruc = "click and drag the mouse"


function setup() { 
  createCanvas(400, 400);
  background (40,40,100)
  fill(255)
  text(instruc,100,100)
} 



function mouseDragged() { 
  background(50,20,100,20)
  
  X = random(0,400);
  Y = random(0,400);
  W = random(2,80);
  col = random(0,255);
  
  noStroke()
	  fill(col-20,col-50,col/4);
  
  var word = random(words);  // select random word
	  text(word,Y,X);   

  	fill(col+2,col+100,col/0.8,col);

  ellipse(X,Y,W,W);
  rect(X/2,Y+100,W,W) 
  
  stroke(200,200,40)
  line(mouseX,mouseY,X,Y)
  
}var whiteCircle = 250
var grayCircle = 150
var blackCircle = 0

var randomCircle = 80

// variables defined above this line

function setup() { 
  createCanvas(400, 400);
  background(220);

} 


function draw() { 
  noStroke()
  fill(whiteCircle);
  ellipse (150,200,20,20);
  
	  fill(grayCircle);
  ellipse (200,200,20,20);
  
	  fill(blackCircle);
  ellipse (250,200,20,20);
  
  whiteCircle = mouseX + 10
  blackCircle = mouseY + 10
  grayCircle = mouseX - mouseY
  
  ellipse(randomCircle*2,randomCircle*(randomCircle/2),200,200)

  
  push ()
  noStroke()
  
  fill(random(255),random(255),random(255), random(255))
  translate (mouseX,mouseY) 
  ellipse(random (400), random (400), randomCircle, randomCircle) 
  
  randomCircle = randomCircle / 1.005

  pop()
  
  

}


var Red = (255,0,0)
var Orange = (255,165,0);
var Yellow = (255,255,0);

function setup(){
createCanvas(500,500);
  background(200)
		  
}

function draw() {
noStroke();
//red
fill(255,0,0);
rect(0,0,20,20);
//orange
fill(255,165,0);
rect(0,20,20,20);
//yellow
fill(255,255,0);
rect(0,40,20,20);
  
}

function mousePressed (){
  fill(200,100,50)
  ellipse (mouseX,mouseY,50,50)
}

function mouseDragged(){
  fill(100,250,50)
  ellipse (mouseX,mouseY,20,20)
\  stroke(20,80,200)
  fill(200,150,50,170)
  ellipse(random(500), random(500), 
            random(150),random(150))
  }
  
function mousePressed () {
 background (150)
  
}


/*

if(mouseIsPressed ){
  if(mouseIsPressed && mouseX == 0 && mouseY == 0){
    strokeWeight(10);
    stroke(0);
    line(pmouseX,pmouseY,mouseX,mouseY);
  }
 }
}

function mousePressed (){
  if(collide(0, 0)){
    selected = "red";
  }else if(collide(0, 20)){
    selected = "orange";
  }else if(collide(0, 40)){
    selected = "yellow";
  }else if (collide(0,60)){
    selected = '
}

function collide ( x, y) {
//2d
if (mouseX >= x &&         // right of the left edge AND
    mouseX <= x + 20 &&    // left of the right edge AND
    mouseY >= y &&         // below the top AND
    mouseY <= y + 20) {    // above the bottom
        return true;
}
return false;
};

*/function setup() {
  createCanvas (400,400);
		  background(70,150,220);
}


function draw() {
  if (keyIsPressed === true) {
    fill(255, 200, 9);
  } else {
    fill(0,0,0,0);
  }
  noStroke();
  var x = mouseX
		  var y = mouseY
  
  ellipse(x,y, 10, 10);
  
  push()
  fill(255)
  rect (20,20,20,20)
  fill(0)
  rect(20,45a,20,20)
  pop()
  
}

var value = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (keyIsPressed === " === true) {
    fill(0);
  } else {
    fill(255);
  }
  rect(25, 25, 50, 50);
}var value = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (keyIsPressed === " === true) {
    fill(0);
  } else {
    fill(255);
  }
  rect(25, 25, 50, 50);
}var val;

function setup() { 
  createCanvas(500,500);
  val = color(mouseX,mouseY,100);

} 

function draw() { 
 				 fill(val);
  ellipse(mouseX,mouseY,100,100);  
    val = color(mouseX,mouseY,mouseX);
    
}
  function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
 				 fill(250,20,30,100)
  rect(20,20,50,50)
  
  fill(250,20,30,20)
  rect(50,50,50,75)
  
  fill(90,20,120,80)
  stroke(20,50,110)
  arc(80,150,100,200,0,2PI,[CHORD])
  
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
 				 fill(250,20,30,100)
  rect(20,20,50,50)
  
  fill(250,20,30,20)
  rect(50,50,50,75)
  
  fill(90,20,120,80)
  stroke(20,50,110)
  arc(80,150,100,200,0,2PI,[CHORD])
  
}