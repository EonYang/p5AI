let api = "http://magicseaweed.com/api/85bc951491c11073bd7724cf10ade967/forecast/?";
let oceansideID = "664";
let steamerID = "163";
let spotID = oceansideID;
let units = "&units=us";
let url = api + spotID + units;



function setup() {

  createCanvas(400, 400);
  fill(120,204,204);
  noStroke();
  scene = new wave(20,6,1,1);
	
  
  let buttonO = select("#Oceanside");
  let buttonS = select("#Steamer Lane");
 
  buttonO.mousePressed(spotCheckOceanside);  
  buttonS.mousePressed(spotCheckSteamer);
                       
}

function gotData(data) {
  spotData = data;
}

function spotCheckOceanside(){
  spotID = oceansideID;
  url = api + spotID + units;
  loadJSON(url, gotData);
}

function spotCheckSteamer(){
  spotID = steamerID;
  url = api + spotID + units;
  loadJSON(url,gotData)
}
  


function draw() {
  
  let tempSlider = document.getElementById("tempSlider");
	let output = document.getElementById("temp");
  output.innerHTML = tempSlider.value;
  
  let perSlider = document.getElementById("perSlider");
	let perOutput = document.getElementById("per");
  perOutput.innerHTML = perSlider.value;

  let htSlider = document.getElementById("htSlider");
	let htOutput = document.getElementById("ht");
  htOutput.innerHTML = htSlider.value;
  background(0);
  
  scene.createArrays(perSlider.value,htSlider.value);
  scene.drawWaves(tempSlider.value);
  
  
}let serial;
let portName = "/dev/cu.usbmodem162";
let video;
let poseNet;
let poses = [];
let mouseWidth = 0, mouseHeight = 0;
let leftEyeX;
let rightEyeX;
let avgEyeX;
let type = 'single';
let isPlaying = 0;
let laugh;
let distance;
let counter=0;
let jawAngle = 90;
let headAngle = 0;
let jawArray = [20,20,10,10];
let outData = [];

function preload() {
  soundFormats('mp3', 'ogg');
  laugh = loadSound('/Assets/ScaryLaughShort.mp3')
}



function setup() {
  createCanvas(400, 400);
// Instantiate our SerialPort object
  serial = new p5.SerialPort();
	// Let's list the ports available
  var portlist = serial.list();

  	// serial.open("/dev/cu.usbmodem1421"); // open a port

  serial.open(portName);
  serial.on('connected', serverConnected);
  serial.on('list', gotList);
  serial.on('data', serialEvent);
  serial.on('error', gotError);
  serial.on('open', gotOpen);
  
  //posenet video SetUp
  video =   createCapture(VIDEO);

  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, type, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
  poses = results;
  });
  // Hide the video element, and just show the canvas
  //video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}


// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  //for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
  if (poses.length > 0){
    
    let pose = poses[0].pose;
    let nose;
    let leftEye;
    let rightEye;
    let leftShoulder;
    let rightShoulder;
    
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        switch (j) {
          case 0:
            nose = keypoint;
            break;
          case 1:
            leftEye = keypoint;
            break;
          case 2:
            rightEye = keypoint;
            break;
          case 5:
            leftShoulder = keypoint;
            break;
          case 6:
            rightShoulder = keypoint;
            break;
        }
          
        
        if (leftEye) {
          
          leftEyeX = leftEye.position.x;
          
          
        	fill(255);
          noStroke();  
          ellipse(leftEye.position.x, leftEye.position.y, 30, 30);
          fill(0);
          ellipse(leftEye.position.x, leftEye.position.y, 10, 13);
      	}
      	if (rightEye) {
          
          rightEyeX = rightEye.position.x;
         
          fill(255);
          noStroke();  
          ellipse(rightEye.position.x, rightEye.position.y, 30, 30);
          fill(0);
          ellipse(rightEye.position.x, rightEye.position.y, 10, 13);

        }
        if (leftEye && rightEye)   avgEyeX = int((rightEyeX + leftEyeX)/2);
        headAngle = avgEyeX;
      }
    }
  }
  
}



// We are connected and ready to go
function serverConnected() {
    print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
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


function serialEvent() {
  
  outData = [jawAngle, headAngle];

   // read a string from the serial port
  // until you get carriage return and newline:
  let inString = serial.readStringUntil('\r\n');
  //check to see that there's actually a string there:
  if (inString.length > 0) {
    if (inString !== 'hello') {           // if you get hello, ignore it
			distance = inString;
    }
  }
  print(distance)
  

  //if (!laugh.isPlaying) isPlaying = 0;//checks to see is laugh track is playing
  if (distance < 40 && !laugh.isPlaying()) {// checks to see if somethign close
    laugh.play();
    let i = 0;
    if(counter < jawArray[i]) {
      if( i %2 ==0) {
        jawAngle =0;
      } else jawAngle = 90;
      counter++;
      serial.write(outData);
    } else if (counter == jawArray[i]) {
      i++;
      counter = 0;
    }
    
  }
  serial.write(outData);
  //print(outData);
}



function draw() {
  background(220);
  drawKeypoints();
  if (avgEyeX > 0) {
  	// serial.write(avgEyeX, isPlaying + "\n");
  	// print(avgEyeX, isPlaying + "\n");
  }

}// API key d3709836286fd09bb96c4a4870a59a7f
//http://api.openweathermap.org/data/2.5/weather?q=new%20york,us&appid=d3709836286fd09bb96c4a4870a59a7f

function setup() {
  createCanvas(400, 400);
  loadJSON("https://api.openweathermap.org/data/2.5/weather?q=new%20york,us&appid=d3709836286fd09bb96c4a4870a59a7f",drawWeather);
}

function drawWeather(data){
  //console.log(data);
  console.log(data.main.temp)
}

function draw() {
  //background(220);
  
}let api = "https://magicseaweed.com/api/85bc951491c11073bd7724cf10ade967/forecast/?spot_id=";
let oceansideID = "664";
let steamerID = "163";
let spotID = oceansideID;
let units = "&units=us";
let fields = "&fields=timestamp,swell.components.combined.*,condition.temperature";
let spotData;
let url = api + spotID + fields;
let temp = 10;
let ht = 10;
let period = 10;
htScale = 4;



function setup() {

  createCanvas(windowWidth, windowHeight);
  fill(120,204,204);
  noStroke();
  scene = new wave(20,6,1,1);
	
  
  let buttonO = select("#Oceanside");
  let buttonS = select("#Steamer Lane");
 
  buttonO.mousePressed(spotCheckOceanside);  
  buttonS.mousePressed(spotCheckSteamer);
                       
}

function gotData(data) {
  spotData = data;
  print("gotData")
}

function spotCheckOceanside(){
  spotID = oceansideID;
  url = api + spotID + fields;
  loadJSON(url, gotData);
}

function spotCheckSteamer(){
  spotID = steamerID;
  url = api + spotID + fields;
  print(url);
  loadJSON(url,gotData);
}
  


function draw() {
  background(0);
  if(spotData){
    temp = floor((spotData[0].condition.temperature -32) * (5/9)); // converts to celcuis
    ht = spotData[0].swell.components.combined.height * htScale;
    period = spotData[0].swell.components.combined.period;
   
  }
  scene.createArrays(period,ht);
  scene.drawWaves(temp);
  
  
}let serial;
let portName = "/dev/cu.usbmodem14641";
let inData;
let fromSerial;

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  //Wave Generator Setup Code
  scene = new wave(20,6,1,1);
  //scene.createArrays();
  fill(120,204,204);
  noStroke()
  
 	// Instantiate our SerialPort object
  serial = new p5.SerialPort();
	// Let's list the ports available
  var portlist = serial.list();

  	// serial.open("/dev/cu.usbmodem1421"); // open a port

  serial.open(portName);
  serial.on('connected', serverConnected);
  serial.on('list', gotList);
  serial.on('data', serialEvent);
  serial.on('error', gotError);
  serial.on('open', gotOpen);
}


function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  //image(video, 0, 0, width, height);
  background (220);
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  //drawSkeleton();
}



// We are connected and ready to go
function serverConnected() {
    print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  console.log(currentString);
}


function serialEvent() {
	// this is called when data is recieved, data will then live in fromSerial	
	fromSerial = serial.read();
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
  background(0);
  fill(255);
  //text("sensor value: " + fromSerial, 30, 30);
  
  // Wave generator info
  
  let tempSlider = document.getElementById("tempSlider");
	let output = document.getElementById("temp");
  output.innerHTML = tempSlider.value;
  
  let perSlider = document.getElementById("perSlider");
	let perOutput = document.getElementById("per");
  perOutput.innerHTML = perSlider.value;
  
	let potMapped = map(fromSerial, 0, 255, 0,30); 

  background(0);
  
  
  scene.createArrays(perSlider.value,potMapped);
  scene.drawWaves(tempSlider.value);
  
}let x=0;
let y=0;
let theta = 0;
let r=10;
let array = [1,2,3];
let bigA = [];

function setup() {
  createCanvas(400, 400);
  for(let j = 0; j<5; j++){
      array.unshift(array[array.length-1]);
  		array.pop();
    	bigA[j] =  new Array(3);
    	for(i=0;i<array.length;i++){
        bigA[j][i] = array[i];
      }
  }
  print(bigA);

}

function draw() {

  
}let dis = 60;

function setup() {
  createCanvas(500, 500);
  frameRate(60);
  scene=new circle(width/2,100,0,0,2*PI/5,20);
  scene2 =new circle(width/2+dis,100,0,0,PI/5,10);
  scene3 =new circle(width/2+dis*2,100,0,0,0,0);
  scene4 =new circle(width/2-dis,100,0,0,3*PI/5,30);
  scene5 =new circle(width/2-dis*2,100,0,0,4*PI/5,40);
  scene.storeCircles();
  //scene2.storeCircles();
		
}

function draw() {
  background(51,48,71);
  scene.drawCircles();
  scene2.drawCircles();
  scene3.drawCircles();
  scene4.drawCircles();
  scene5.drawCircles();
}let maxDS=50;
let counter =0;
let big = true;// whether growing or shrinking
let cArray =[];

class circle {
  constructor(xx, yy, xxCtr, yyCtr) {
    this.x = xx;
    this.y = yy;
    this.xCtr = xxCtr;
    this.yCtr = yyCtr;
  }
  storeCircles(){
    noStroke();
		let scaleOne = 2; 
    let size;//starting size
		let deltaS=0;//size increment
  	for(i = 1; i <= maxDS; i++){
    	deltaS = deltaS + 1 / i;
    	size = deltaS*deltaS*scaleOne;
    	cArray.push(size);
    }
  }
  drawCircles(){
  this.x = this.xCtr+(r*Math.sin(theta));
	this.y = this.yCtr+(r*Math.cos(theta));
  
  fill(255,255,238);
  ellipse(x,y,cArray[counter]);
  if(counter >= maxDS-1){
    if(big){
      big = false;
    }
  }
  if(counter <= 0){
    if(!big){
      big = true;
    }
  }
    if(big){
    counter++;
  } else if (!big){
    counter--;
  }
  theta += 0.1;
  print(Math.sin(theta));
  }

}
 let myArray= [];
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  if(mouseIsPressed){
  	for(let i = 20; i>=0 ;i--){
    	myArray[i] = i;
    }
    print(myArray);
    print(myArray.length);
  }
  if(keyIsPressed){
    var newLength = myArray.unshift(myArray[20])
    newLength = myArray.pop()
    //myArray[12] = 12;
    print(myArray);
  }
}class bg {
  constructor(xx, yy, xxdir, yydir) {
    this.x = xx;
    this.y = yy;
    this.xdir = xxdir;
    this.ydir = yydir;
  }
  sky() {
    let h = 25;
    noStroke();
    fill(56, 43, 117);
    rect(width / 2, h, width, h*2);
    fill(76, 44, 123);
    rect(width / 2, h*3, width, h*2);
    fill(128, 52, 144);
    rect(width / 2, h*5, width, h*2);
    fill(148, 60, 146);
    rect(width / 2, h*7, width, h*2);
    fill(165, 65, 127);
    rect(width / 2, h*9, width, h*2);
    fill(114, 62, 95);
    rect(width / 2, height-h*3, width, h*6);
  }

}


function setup() {
  createCanvas(500, 400);
  rectMode(CENTER)
  background(0);
  scene = new bg(1,0,0,0);
  scene.starData();
  scene.buildingsData();
 
}

function draw() {
  scene.sky();
  scene.stars();
  //scene.shootingStars();
  scene.buildings();
  scene.move();

}let nkey;// most recent key pressed
let up = 'w';
let down = 's' ;
let left = 'a';
let right = 'd';

function keyTyped() {
  nkey = key;
  print(nkey);
}

class Car {
  constructor(xx,yy,xxdir, yydir, rr){
    this.x = xx;
    this.y = yy;
    this.xdir = xxdir;
    this.ydir = yydir;
    this.r = rr;
  }
  start(){
    fill(255);
		text('Click anywhere on the the canvas to start', 10,20,100);
    if(mouseIsPressed && mouseX>=0 && mouseX<=width && mouseY>=0 && mouseY<=height){
      background(0);
      
    }
    
  }
  display(){
    ellipse(this.x,this.y,this.r)
  }
 	move() {
    let movement =[nkey];
    
   	if(nkey == up){
      this.y-=1.5;
    }
    if(nkey == down){
      this.y+=1.5;
    }
   	if(nkey == left){
      this.x-=1.5;
    }
   	if(nkey == right){
      this.x+=1.5;
    }
  }

}
function setup() {
  createCanvas(400, 400);
  background(0);
	car = new Car(width/2, height-100,1,1, 20);

}

function draw() {
  background(0)
  //car.start();
  car.display();
  car.move();
}


    
    let mx;
let my;
let sat = [];// color value
let d;//distance
let r,g,b;
let counter;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  background(0);
  noStroke();
  frameRate(30);
 
  
}

function draw() {
  background(0);
  if (mouseIsPressed) {

    mx = mouseX;//Stores where the click was made
    my = mouseY;
    r = random(0,255);
 		g = random(0,255);
    b = random(0,255);
    counter=0;//counter
  
  }

  //Draws all the circles within a certain radius
    for (let x = 0; x < width; x += 10) {
      for (let y = 0; y < height; y += 10) {
        d = dist(mx,my,x,y);// calculates distance between a circle and where the mose is pressed
        let itR= r/4;
        let itG= g/4;
        let itB= b/4;
        if (d < 10) { //Below are the different radii for fireworks
          fill(r,g,b);
          ellipse(x, y, 5, 5);
          print(counter)
        }else if(10 < d && d < 20 && counter >= 2) {
          fill(r,g,b);
          ellipse(x, y, 5, 5);
        }else if(20 < d && d < 40 && counter >=4) {
          fill(r-itR,g-itG,b-itB);
          ellipse(x, y, 5, 5);
        }else if(40 < d && d < 60 && counter>=6) {
          fill(r-itR*2,g-itG*2,b-itB*2);
          ellipse(x, y, 5, 5);
        }else if(60 < d && d < 80 && counter>=8) {
          fill(r-itR*3,g-itG*3,b-itB*3);
          ellipse(x, y, 5, 5);
        }
      }
    }
  	counter++;
    r-=4;
  	g-=4;
  	b-=4;
    if (r<=0) {// Keeps color values from going negative
      r=0;
    } else if(g<=0) {
      g=0;
    }else if(b <=0) {
      b=0;
    }
}
let circles = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  
  
  for(let x = 0; x<=400;x+=10){
    for(let y=0; y<=400; y+=10){
      ellipse(x,y,5);
  	}
	}
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  var circle1 = {radius: 20, x: 5, y: 5};
	var circle2 = {radius: 12, x: 10, y: 5};
	ellipse(circle1.x,circle1.y,circle1.radius,circle1.radius);
	var dx = circle1.x - circle2.x;
	var dy = circle1.y - circle2.y;
	var distance = Math.sqrt(dx * dx + dy * dy);

if (distance < circle1.radius + circle2.radius) {

}
}  let p1 = {x: 10, y:10, ht:20, wd:80, s:0};
	let p2 = {x: 570, y:10, ht:20, wd:80, s:0};
	let ball = {x:100, y:100, r: 12, v: 4};
	let dirX;
	let dirY;
function setup() {
  createCanvas(600, 400);
  noStroke();
  ball.x = width/2;
  ball.y = height/2;
  dirY = random(-2,2);
  dirX = sqrt((ball.v*ball.v)-(dirY*dirY));
  if (dirY<0) dirX = -dirX;
    //score tally
}

function draw() {
  background(0);
  
	//Player01 Detail
  let player01 = rect(p1.x, p1.y, p1.ht,p1.wd);
  if (mouseY >= (p1.wd/2) && mouseY <= height-(p1.wd/2)) {
    p1.y = mouseY-(p1.wd/2);
  } else if (mouseY < p1.wd/2) {
    p1.y = 0;
  } else if (mouseY >height-(p1.wd/2)) {
    p1.y = height-(p1.wd);
  }
  //Player02 Detail
  let player02 = rect(p2.x,p2.y,p1.ht,p2.wd);
  let up = keyIsDown(UP_ARROW);
  let down = keyIsDown(DOWN_ARROW);
  if (up && p2.y > 0) {
    p2.y -= 5; //Move up
  } else if (down && p2.y < height-p2.wd) {
    p2.y += 5; //Move down
  }
  //Ball Detail
  ellipse(ball.x, ball.y, ball.r*2,ball.r*2);
  //Ball Velocity
  if (ball.x+ball.r >= 0 && ball.x-ball.r <= width){
    ball.x += dirX;
  	ball.y +=dirY;
  }
  // Ball Wall Collision
  if (ball.y+(ball.r) >= height || ball.y-(ball.r) <= 0) {
    dirY = -dirY;
  }
  //Ball Player one Collision
  	//Face Collision

  if (ball.x-ball.r <= p1.x+p1.ht && ball.x > p1.x) {
    if(ball.y >= p1.y && ball.y <= p1.y+(p1.wd) ){
    	ball.x = p1.x+p1.ht+ball.r;
    	dirX = -dirX;
    } else if (ball.y > p1.y && p1.y == height-(p1.wd)){
      ball.x = p1.x+p1.ht+ball.r;
    	dirX = -dirX;
    }
  } 
  	//Side Collision
  /*if(ball.y+ball.r >= p1.y -(p1.wd/2) &&  p1.x <= ball.y && ball.y <= p1.x+p1.ht) {
    dirY = -dirY;
  }*/
  //Ball Player two Collision
  if (ball.x+ball.r >= p2.x && ball.y >= p2.y && ball.y <= p2.y+p2.wd) {
    ball.x= p2.x-ball.r; 
    dirX = -dirX;
  }
  //speedup
  if (frameCount%200 == 0) {
    dirX = dirX*1.1;
    dirY = dirY*1.2;
  }
  
  //Score and reset
  fill(255)
  text(p2.s, width/2 -20, 20);
  text(p1.s, width/2 +20, 20);
  if(ball.x <= 0 || ball.x >= width) {
    if (ball.x <= 0) {
      p1.s += 1;
    } else if (ball.x >= width) p2.s += 1;
    ball.x = width/2;
    ball.y = height/2;
    dirY = random(-2,2);
    dirX = sqrt((ball.v*ball.v)-(dirY*dirY));
    if (dirY<0) dirX = -dirX;
  }
  

  
}function setup() {
  createCanvas(400, 400);
}

function draw() {
	background(220);
  fill(64,224,208);
  noStroke();
  ellipse(width/2,width/2,100,100);
}function setup() {
  createCanvas(400, 400);
}

function draw() {

}function setup() {
  createCanvas(400, 400);
	
}

function draw() {
  	var hair = color(66,63,50);
	var s01 = color(188,136,59);
	var s02 = color(153,112,58);
	var s03 = color(216,171,100);
	var s04 = color(232,188,197);
	var j01 = color(181);
	var j02 = color(204);
	var j03 = color(228);
	var j04 = color(102);
	var j05 = color(153);
	var p01 = color(109,47,59);
	var p02 = color(71,31,41);
	var sh01 = color(255,0,0);
	var sh02 = color(201,0,0);
	var sh03 = color(255,159,159);
	var sh04 = color(237);
  var eyeL = rect(192.7, 70.1, 2.8,3.4,1.4);
	var eyeR = rect(208.7, 70.1, 2.8,3.4,1.4);
  var eyeLX = 192.7;
  var eyeRX = 208.7;
  
  //Eye Direction
  if (mouseX >= 200 && mouseX <=400) {
    eyeLX = (mouseX-200)/74 + 192.7;
  } else if (mouseX <=200 && mouseX > 10) {
    eyeLX = 192.7 - (200-mouseX)/66.7;
  } else eyeLX = 192.7;
  
   if (mouseX >= 200 && mouseX <=400) {
    eyeRX = (mouseX-200)/74 + 208.7;
  } else if (mouseX <=200 && mouseX >10) {
    eyeRX = 208.7 - (200-mouseX)/66.7;
  } else eyeRX = 208.7;
	 print(mouseX);
	angleMode(DEGREES);
	
	//
	background(255);
	noStroke();
	fill(hair);
	//Shadow
	ellipse(200,362,158,24);
	
	//Jacket Hood
	rectMode(CENTER);
	fill(j02);
	rect(202,99,58,18,8);
	rectMode(CENTER);
	fill(j04);
	rect(200,100,51,16,8)
	
	//Head + Neck
	fill(hair);
	ellipse(200,60,39,39);
	fill(s02);
	rect(200,98,12,11);
	rect(217,70,4,8,1.7);
	triangle(200,96,173,117,227,117);
	fill(s01);
	rect(200,74.7,32,35,12);
	rect(200,61,32,19,9.37);
	
	//Hair
	fill(hair);
	ellipse(177,67,20,20);
	ellipse(176,50,20,20);
	ellipse(186,38,20,20);
	ellipse(200,35,20,20);
	ellipse(211,38,20,20);
	
	//Face
	fill(hair);
	rect(192.7,66.5, 10.2,3.4,1.7);
	rect(208.6,66.5, 10.2,3.4,1.7);
	rect(eyeLX, 70.1, 2.8,3.4,1.4);
	rect(eyeRX, 70.1, 2.8,3.4,1.4);
	rect(200,92.3,23,3.4,1.7);
	fill(hair);
	
	push();
	translate(198,80.5);
	rotate(-30);
	rect(0,0,4.9,1.4,0.7);
	pop();
	
	push();
	translate(202,80.5);
	rotate(30);
	rect(0,0,4.9,1.4,0.7);
	pop();
	
	fill(s02);
	ellipse(198,76.4,4,4);
	ellipse(202,76.4,4,4);
	ellipse(200,75.5, 5.7,5.7);
	rect(200,83.4,7.4,2,1);
	fill(s04);
	rect(200, 85.4,9.5,2.5,1.25);
	fill(s03);
	rect(205,57.5,12,3,1.5);
	
		//Pants
	fill(p01);
	rect(182,261,13.3,140,3.7);
	rect(218,261,13.3,140,3.7);
	fill(p02);
	rect(185.5,261,7,140,3.5);
	fill(p01);
	rect(200,195,50,38,11.5);
	fill(p02);
	rect(200,204.5,50,3);
	
	
	//Jacket
		//Arm(L)
	fill(j05);
	push();
	translate(164.5,139.5);
	rotate(9);
	rect(0,0,19,61,12);
	pop();
	
	push();
	translate(147.5,143.5);
	rotate(-206);
	rect(0,0,19,61,12);
	pop();
	
		//Torso
	fill(j01);
	rect(200,153,70,96,12);
	rect(200,190,83,26,12);
	fill(j04);
	rect(191.5,119,3,28,1.5);
	rect(208.5,119,3,28,1.5);
	
	
		//Hand(L)
	fill(s01);
	push();
	translate(133,115);
	rotate(-26.7);
	rect(0,0,11,20);
	pop();
	
	fill(s02);
	push();
	translate(136.5,113.5);
	rotate(-26.7);
	rect(0,0,5.5,20);
	pop();
	
	fill(s01);
	push();
	translate(127,100);
	rect(0,0,18,20,5.5);
	pop();
	rect(132.5,83.5,5,21,2.5);
	
	push();
	translate(126.5,83.5);
	rotate(-13.4);
	rect(0,0,5,21,2.5);
	pop();
	

	
		//Hand(R)
	push();
	translate(221.5,181.7);
	rotate(-296);
	rect(0,0,10,12.2);
	pop();
	
	
		//Arm(R)
	fill(j02);
	push();
	translate(233.5,133.5);
	rotate(-206);
	rect(0,0,19,61,12);
	pop();
	
	fill(j02);
	push();
	translate(239,166);
	rotate(-45);
	rect(0,0,40,18,7.6);
	pop();
	
	fill(j03);
	push();
	translate(233.2,120.7);
	rotate(-206);
	rect(0,0,4.7,22.5,2.3);
	pop();
	
		//Pockets
	fill(j04);
	push();
	translate(183.5,183.5)
	rotate(12);
	rect(0,0,7,21);
	pop();
	
	push();
	translate(218.5,183.5)
	rotate(-12);
	rect(0,0,7,21);
	pop();
	
		//Shoes
	push();
	translate(200,342);
	fill(sh01);
	rect(-18,.5,12,27);
	rect(18,.5,12,27);
	triangle(12,8,34,8,24,-10);
	triangle(-12,8,-34,8,-24,-10);
	rect(34.5,13,45,10,3);
	rect(-34.5,13,45,10,3);
	fill(sh02);
	rect(-15,.5,6,27);
	fill(j03);
	rect(-34.5,20,50,6);
	rect(34.5,20,50,6);
	pop();
	
		//Laces
	push();
	fill(j03);
	translate(225,339);
	rotate(-30);
	rect(0,0,10,2,1);
	pop();
	
	push();
	fill(j03);
	translate(227,341);
	rotate(-30);
	rect(0,0,10,2,1);
	pop();
	
	push();
	fill(j03);
	translate(229,343);
	rotate(-30);
	rect(0,0,10,2,1);
	pop();

		push();
	fill(j03);
	translate(176,339);
	rotate(30);
	rect(0,0,10,2,1);
	pop();
	
	push();
	fill(j03);
	translate(174,341);
	rotate(30);
	rect(0,0,10,2,1);
	pop();
	
	push();
	fill(j03);
	translate(172,343);
	rotate(30);
	rect(0,0,10,2,1);
	pop();

}

