var a,b; //input for width and height
var c;
function setup() { 
  //INPUT BOX//
  var inpW = createInput('width');
  inpW.input(callEventW); //We don't need to call everytime
  var inpH = createInput('height');
  inpH.input(callEventH);
  var inpC = createInput('width+height');
  inpH.input(callEventC);
  //INPUT BOX//
  
  // button = createButton("Click");
  // button.mousePressed(getSize); //When we need to send the number
  
  createCanvas(windowWidth, windowHeight);
  // w = 100;
  // h = 100;

  
} 


function draw() { 
  background(220);
  rect(windowWidth/2,windowHeight/2, a, b, c);//starting point(x,y), width, height
}

// function getSize(){//This function will be called when I click
//   w =a;
//   h =b;
// }

function callEventW() {
  a = this.value();
  console.log('A: ', a);
}
function callEventH() {
  b = this.value();
  console.log('B: ', b);
}
function callEventC() {
  c = this.value(a+b);
  console.log('C: ', c);
}var w,h,a,b; //input for width and height
function setup() { 
  //INPUT BOX//
  var inpW = createInput('width');
  inpW.input(callEventW); //We don't need to call everytime
  var inpH = createInput('height');
  inpH.input(callEventH);
  //INPUT BOX//
  
  button = createButton("Click");
  button.mousePressed(getSize); //When we need to send the number
  
  createCanvas(windowWidth, windowHeight);
  w = 100;
  h = 100;

  
} 


function draw() { 
  background(220);
  rect(windowWidth/2,windowHeight/2,w, h); //starting point(x,y), width, height
}

function getSize(){//This function will be called when I click
  w =a;
  h =b;
}

function callEventW() {
  a = this.value();
  console.log('A: ', a);
}
function callEventH() {
  b = this.value();
  console.log('B: ', b);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(160, 200, 200);
  noFill();
  strokeWeight(2);
  ellipse(width/7,height/4*1,20,20)
  strokeWeight(2);
  ellipse(width/7,height/4*1,28,28)
  strokeWeight(2);
  ellipse(width/7,height/4*1,35,35)
  strokeWeight(1);
  ellipse(width/7,height/4*1,40,40)
  strokeWeight(1);
  ellipse(width/7,height/4*1,45,45)
  
  
}
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var circleSize = 10; // size of the circle
var xPos = 0;
var yPos = 0;

// array in which we will store ALL the important data:
let dataArray = [];

// number of datapooints we want to have appear on the
// screen at once
let maxValues = 500;

// these variables will be constantly updated
// and store the lowest and highest value in the dataArray
let max = 0;
let min = 0;


function setup() {
  createCanvas(windowWidth, 600);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
}

function draw() {
  background(0);

  // in this foor loop we will draw lines from every point in 
  // dataArray to the next point
  // that's why we only loop as often 
  // as there are values MINUS one (see below: "i < dataArray.length - 1")
  // otherwise, for the last value there wouldnt be a 'next' value
  // to draw a line too
  for(let i = 0; i < dataArray.length - 1; i++){


    stroke(0,255,0);
    
    // we are about to draw a line from one to another point
    // for that we need and x1 and y1 value for point 1
    // and x2 and y2 value for point 2.
    // lets start with point 1:
    
    // maxValues defines how many data point we want to display
    // on the canvas
    // because of that we divide the width of out canvas
    // by maxValues to know how much space 
    // each data point should get
	    // in other words where to draw the x position of each data point
    // since we loop over dataArray with i
    // we can define the x position for each point
    // by multiplying the allocated space ((width/maxValues))
    // with i:
    let x1 = i * (width/maxValues); 
    // to map the y position we use the min and max value that
    // we have (re)calculated everytime we add a new
    // datapoint to dataArray
    // we define here that no value
    // should every be drawn higher than (height/2) - 100
    // and no value should ever be drawn lower than (height/2) + 100
    // the max and min value of our dataArray will be drawn at
    // at exactly those boundaries, all the other values
    // will be somewhere in between
  	  let upperBound = (height/2) - 100;
    let lowerBound = (height/2) + 100
    let y1 = map(dataArray[i], min, max, upperBound, lowerBound);

    // same for point 2
    let x2 = (i+1) * (width/maxValues);
    let y2 = map(dataArray[i+1], min, max, upperBound, lowerBound);

    // now draw a line from point1 to point2:
    line(x1, y1, x2, y2);
  }

}

let tempArray = [];

function serialEvent() {
  // READ incoming data:
  var data = serial.readLine(); //taking data from arduino and reading them
	
  // if we actually get data, the length of the string "data" will
  // be bigger thatn 0
  // here we check:
  if (data.length > 0) {
    
    // everytime we get new data we put it into 
    // a temporary array:
    tempArray.push(int(data));   //put full (int) numbers into array

    					// ONLY if we have collected enough values
    // in the temporary array
    // will we actually takes it 'serious'
    // putting it into our actualy dataArray for display on
    // the canvas
    // in this case "enough values" means
    enough_values = 10;
    if(tempArray.length > enough_values){
			
        //once tempArray contains enough values, we 
        // take the mean value of all those, 
        // and put it into our dataArray
        // we do that to make our curve
        // smoother as sometimes values spike a little... hence
        // the average of a few consecutive measurements
        // ...to make our life's easier we use a library called d3 to 
        // quickly get the mean value
        dataArray.push( d3.mean(tempArray) );
     				   
      
      	
      		  console.log(tempArray);
      
									        // every time we add a new vaue to our MAIN 
        // dataArray, we calculate the current max and min
      	  // value inside it. So that we can 
      	  // scale our visualisation.
        // max and min are global variables (defined at the top of
        // this sketch.js - just like dataArray and tempArray) so we have access to it also in the
        // draw loop
        // to make our life's easier we use a library called d3 to 
        // quickly get the max and min value
        max = d3.max(dataArray);
        min = d3.min(dataArray);

	        // since maxValues defines how many datapoints we 
        // want to display at a time,
        // dataArray should never contain more values
        // that that (otherwise we would draw them out of frame).
        // our whole way of drawing assumes there to be maxValues data points
        // based on that we allocate space per datapoint
        // on the canvas.... thats why, when daraArray contains too
        // many vaues, the wouldn't fit onto our canvas.
        // ....... because of that
        // we make sure that dataArray nevr contains more values
        // that maxValues:
        while(dataArray.length > maxValues){
          // whenever dataArray is too big, 
          // we take away datapoints (splice())
          // from its beginning (0,1) as long (while-loop)
          // as long as it take for it to not-be-bigger than maxValues
          dataArray.splice(0,1);
        }
      
      
        // reset the temporary array
      	  // so that it is empty and we can again wait
        // for the next 3 values
      				
        tempArray = [];
    }

  }
}


function mousePressed(){
  // when we click we delet all data in dataArray 
  // /reset the visualisation
  
  dataArray=[];
}

let img;
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
  for (let i = 0; i < 50; i++) {
    let x = floor(random(width));
    let y = floor(random(height));
    let col = img.get(x, y);
    col[3] = 100;
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

function setup() { 
  createCanvas(640, 440);
  background(0);
  img = createCapture(VIDEO);
} 

function draw() { 
  
  let col = img.get(mouseX, mouseY);
  col
  fill(col);
  noStroke();
  ellipse(mouseX, mouseY, 10);
}var img;
var fortunes = [];

function preload() {
  img = loadImage("images/FT.jpg");
  loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json', gotData);
}

function setup() { 
  createCanvas(600, 400);
  button = createButton("Get your fortune!");
  button.mousePressed(getFortune);
  
  
  
  
  
  
  myDiv = createDiv('');
  myDiv.style("position", 255, 274);
  myDiv.style("width", '150px');
  myDiv.style("font-size", '11px');
}

function draw() { 
  image(img, 0, 0);
  textAlign(CENTER);
  // rect(260, 280, 150, 80);
}

function gotData(data){
  for (var i = 0; i < data['tarot_interpretations'].length; i++){
    fortunes.push(data['tarot_interpretations'][i]['fortune_telling'].join('. '));
  }
  // print(fortunes);
}

function getFortune(){
  var fortune = random(fortunes);
  // print(fortune);
  myDiv.html(fortune);
}var img;
var button;


function preload() {
  img = loadImage("images/FT.jpg");
  loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json', gotData);
}

function setup() { 
  createCanvas(600, 400);
  button = createButton("Get your fortune!");
  button.mousePressed(getFortune);
  
  
  
  
  
  myDiv = createDiv('');
  myDiv.style("position", 255, 274);
  myDiv.style("width", '150px');
  myDiv.style("font-size", '11px');
}

function draw() { 
  image(img, 0, 0);
  textAlign(CENTER);
  // rect(260, 280, 150, 80);
}

function gotData(data){
  for (var i = 0; i < data['tarot_interpretations'].length; i++){
    fortunes.push(data['tarot_interpretations'][i]['fortune_telling'].join('. '));
  }
  // print(fortunes);
}

function getFortune(){
  var fortune = random(fortunes);
  // print(fortune);
  myDiv.html(fortune);
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
}let img;
let stars = [];
let fireflies = [];

function preload() {
  img = loadImage("images/nightfield.png");
}
function setup() {
  createCanvas(600, 338);
	preload();
  
  for (let i = 0; i < 200; i++) {
    fireflies[i] = new Fireflies(random(width), random(height));
  }
  for (let i = 0; i < 50; i++){
    stars[i] = new Star(random(width), random(height-110), int(random(5, 10)), random(1,8), random(2,12), random(-100, 100));
  }
}

function draw() {
  noStroke();
  image(img, 0, 0);
  //Moon
  fill(255,200);
  ellipse(513,42,60,60);
  fill(255,30);
  ellipse(520,37,115,115);
  ellipse(515,40,143,143);

  for(let i = 0; i < stars.length; i++){
    stars[i].show();
  }
  for (let i = 0; i < fireflies.length; i++) {
    fireflies[i].update();
    fireflies[i].display();
    for (let j = 0; j < fireflies.length; j++) {
      if (i != j && fireflies[i].intersects(fireflies[j])) {
      }
    }
  }
}
var img;
var data;
var i = 0;
var button;
var fortunes = [];
var myDiv;

function preload() {
  img = loadImage("images/FT.jpg");
  loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json', gotData);
}

function setup() { 
  createCanvas(600, 400);
  button = createButton("Get your fortune!");
  button.mousePressed(getFortune);
  
  myDiv = createDiv('');
  myDiv.style("position", 255, 274);
  myDiv.style("width", '150px');
  myDiv.style("font-size", '11px');
}

function draw() { 
  image(img, 0, 0);
  textAlign(CENTER);
  // rect(260, 280, 150, 80);
}

function gotData(data){
  for (var i = 0; i < data['tarot_interpretations'].length; i++){
    fortunes.push(data['tarot_interpretations'][i]['fortune_telling'].join('. '));
  }
  // print(fortunes);
}

function getFortune(){
  var fortune = random(fortunes);
  // print(fortune);
  myDiv.html(fortune);
}let data;

function preload() { 
  data = loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json');

} 

function setup() { 
  createCanvas(500, 500);
  background(0);
    createP(data.description);
    createA(data.source,'source');
    for (let i = 0; i < data.pokemon.length; i++) {
      fill(255);
      textAlign(CENTER);
      text(data.tarot_interpretations[i].fortune_telling,random(width), random(height-100));
    }
    console.log(data);
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
}let data;

function preload() { 
  data = loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json');

} 

function setup() { 
  createCanvas(500, 500);
  background(0);
    createP(data.tarot_interpretations);
    createA(data.source,'source');
    for (let i = 0; i < data.pokemon.length; i++) {
      fill(255);
      textAlign(CENTER);
      text(data.tarot_interpretations[i].fortune_telling,random(width), random(height-100));
    }
    console.log(data);
  }var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.thisWontWorkEver';  // fill in your serial port name here, or pick during Serial list event
var searchString = "Adafruit"; //during Serial port list event, if a port containing this string is found we will attempt to open it
var logSerial = true;
var lastSerialString = "";
//var rValue, gValue;
var bgValue = 0;
var switchState = 1; //pulled high, 1 = not pressed, 0 = pressed


function setup() {
  createCanvas(640, 480);
  //background(bgValue/4, 0x16, 0x40);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event NOTE: I like to chain open from list, so I can decide which port is the arduino
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {

    // Display the list the console:
    println(i + " " + portList[i]);
    if (portList[i].indexOf(searchString) != -1) { //indexOf gives the starting position of a substring within a longer string, and returns -1 if not found.
      portName = portList[i];
      console.log("Will attempt to open Arduino on " + portName + " for serial connection");
    }
  }
  serial.open(portName); //NOTE: here is my open command.
}


function serialEvent() {
  //console.log(serial.read());
  var inData = serial.readLine();
  if (inData.length>0) {
    console.log("Got data: " + inData);
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
  text(lastSerialString, 50, 50);
  stroke(0);
  fill(255, 0, 0);
  ellipse(100, 300, 50, 50);
  fill(0, 255, 0);
  ellipse(200, 300, 50, 50);
}

function mousePressed() {
  // rValue = int(map(mouseX, 10, width-10, 0, 255));
  // gValue = int(map(mouseY, 10, height-10, 0, 255));
  // gValue = constrain(gValue, 0, 255);
  // rValue = constrain(rValue, 0, 255);
  //serial.write("L:" + rValue + "," + gValue + "\n");
  if (mouseX < width/2) {
   serial.write("beep:" + mouseX * 10 + "," + (20+mouseY/2) + "\n");
  } else {
  	serial.write("blorp" + "\n"); 
  }
}

function keyPressed() {
  if (key>=0 && key<=9) {
    //serial.write("T:" + key*40 + "\r\n");
    serial.write("whoop" + "\n");
  }
}

//function mousePressed() {
  //serial.write("255,128\r\n");
  // serial.write(13);
  // serial.write(10);
//}

function serialError(err) { println('Something went wrong with the serial port. ' + err); }
function portClose() { println('The serial port closed.'); }
function serverConnected() { println('connected to server.'); }
function portOpen() { println('the serial port opened.') }// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(500, 300);

  // STEP 1 Instantiate our SerialPort object
  serial = new p5.SerialPort();
	
  // STEP 2 Set port (Get this from p5 serial control app!)
  serial.open("/dev/cu.usbmodem1421");

  // STEP 3 set up a callback to read data
  serial.onData(gotData);

}

// Ok here comes daya!
function gotData() {
  // Step 4a: read the data
  var currentString = serial.readLine(); // read the incoming string
  if (!currentString) return; // if the string is empty, do no more
  latestData = Number(currentString); // save it for the draw method
}

function draw() {
  background(255, 255, 255);
  fill(0, 0, 0);
  // Step 4b: use the data
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(100, 100, data, data);
  text(data, 10, 10);
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(500, 300);

  // STEP 1 Instantiate our SerialPort object
  serial = new p5.SerialPort();
	
  // STEP 2 Set port (Get this from p5 serial control app!)
  serial.open("/dev/cu.usbmodem1411");

  // STEP 3 set up a callback to read data
  serial.onData(gotData);

}

// Ok here comes daya!
function gotData() {
  // Step 4a: read the data
  var currentString = serial.readLine(); // read the incoming string
  if (!currentString) return; // if the string is empty, do no more
  latestData = Number(currentString); // save it for the draw method
}

function draw() {
  background(255, 255, 255);
  fill(0, 0, 0);
  // Step 4b: use the data
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(50, data, 50, 50);
  text(data, 10, 10);
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(500, 300);

  // STEP 1 Instantiate our SerialPort object
  serial = new p5.SerialPort();
	
  // STEP 2 Set port (Get this from p5 serial control app!)
  serial.open("/dev/cu.usbmodem1411");

  // STEP 3 set up a callback to read data
  serial.onData(gotData);

}

// Ok here comes data!
function gotData() {
  // Step 4a: read the data
  var currentString = serial.readLine(); // read the incoming string
  if (!currentString) return; // if the string is empty, do no more
  latestData = Number(currentString); // save it for the draw method
}

function draw() {
  background(255, 255, 255);
  fill(0, 0, 0);
  // Step 4b: use the data
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(50, data, 50, 50);
  text(data, 10, 10);
}let img;
let stars = [];
let fireflies = [];

function preload() {
  img = loadImage("images/nightfield.png");
}
function setup() {
  createCanvas(600, 338);
	preload();
  
  for (let i = 0; i < 200; i++) {
    fireflies[i] = new Fireflies(random(width), random(height));
  }
  for (let i = 0; i < 50; i++){
    stars[i] = new Star(random(width), random(height-110), int(random(5, 10)), random(1,8), random(2,12), random(-100, 100));
  }
}

function draw() {
  noStroke();
  image(img, 0, 0);
  //Moon
  fill(255,200);
  ellipse(513,42,60,60);
  fill(255,30);
  ellipse(520,37,115,115);
  ellipse(515,40,143,143);

  for(let i = 0; i < stars.length; i++){
    stars[i].show();
  }
  for (let i = 0; i < fireflies.length; i++) {
    fireflies[i].update();
    fireflies[i].display();
    for (let j = 0; j < fireflies.length; j++) {
      if (i != j && fireflies[i].intersects(fireflies[j])) {
      }
    }
  }
}
// SHeep object
class Sheep {
	constructor(x, y){
   	this.x = x;
    this.y = y;
    this.original_y = y;
    this.speed = 5;
  }
  move(){
    // this function only changes, the x and y position of
    // the sheep, but does not display it at all
    
    // x simply goes from left to right 
    // we do that by using a speed variable
    // by which we increase the x value
    // but which we are able to change (the speed itself) 
    // later on to change the sheep's direction
    // when it gets out of bounds.
    this.x += this.speed;
    // that we do here, when x is bigger than
    // a certain threshold or smaller than another, 
    // we change the polarity of this.speed
    // it keeps the same absoute value (e.g. 10)
    // but changes from plus to minus and vice versa
    if(this.x > width || this.x < 0){
     	this.speed = this.speed * -1; 
    }
    
    // the y position depends on the x position
    // e.g. when the sheep is in the middle, 
    // it should be at its highest points
    // the sin funciton, we lossely rememeber, 
    // does something with curves
    // its a function that we can give a x value, 
    // and it returns a y value (that describes the curve)
    // we find out that values between PI and 2*PI 
    // when put into the sin function, return values 
    // between 0 and 1 (that is one arc of the sin curve)
    // 
    // our sheep moves between any range, eg 0 and width
    // so we have to map the range on which the sheep moves
    // onto the range of the sin curve/function we are
    // interested in, that is PI and 2*PI, 
    // we map it like this:
    var mapped_x_pos = map( this.x, 0, width, PI, 2*PI);
    
    // now we can put the mapped value into the sin function
    // and get back a value between 0 and 1 that describes 
    // an arc across the whole original range on which
    // the sheep moves
    // to make the curve be more visible we multiply that 
    // value by a bigger number (eg 170).
    // and add it to our original y value of the sheep
    // and assign it as its new y value
    // that is then used by the show function. 
    this.y = this.original_y + sin(mapped_x_pos) * 170;
    
    
  }
  show(){
    // this function displays the sheep, 
    // whatever its x and y values might be
    // at a time
    noStroke();
    fill(255);
   	ellipse(this.x, this.y, 50, 50);  
  }
}

// global variable for our 
// sheep copy (copy of our object/class_
var the_one_sheep_copy;

function setup() { 
  createCanvas(400, 400);
  // we create a copy of the 
  // Sheep class (with: 'new Sheep(20, 350);'
  // and store it in the the_one_sheep_copy variable
  the_one_sheep_copy = new Sheep(20, 350);
} 

function draw() { 
  background(0);
  // first we simply display the sheep copy
  // at wherver its x and y values put it
  the_one_sheep_copy.show();
  // then we modify its x and y values 
  // to be different the next time we display it
  the_one_sheep_copy.move();
}class Star {
	constructor(x, y, npoints, radius1, radius2, rotation_speed) {
    this.x = x;
    this.y = y;
    this.radius1 = radius1;
    this.radius2 = radius2;
    this.npoints = npoints;
    this.rotation_speed = rotation_speed;
  }
  show() {
    // ellipse(this.x, this.y, 20, 20, 20);
		push();
    translate(this.x, this.y);
    rotate(frameCount / this.rotation_speed);
    var angle = TWO_PI / this.npoints;
  	var halfAngle = angle/2.0;
    
  	beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
      var sx = 0 + cos(a) * this.radius2;
      var sy = 0 + sin(a) * this.radius2;
      vertex(sx, sy);
      sx = 0 + cos(a+halfAngle) * this.radius1;
      sy = 0 + sin(a+halfAngle) * this.radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
    pop();
  }
  
}


var all_our_star_copies = [];
var num_stars = 10;

function setup() { 
  createCanvas(400, 400);

  
  for(var i = 0; i < num_stars; i++){
    var x = random(width);
    var y = random(height);
    var n_points = int(random(5, 10));
    var r1 = random(1,8);
    var r2 = random(2,12);
    var rotation_speed = random(-100, 100);
    // creating copies of the Star Class/Object/Blueprint with 'new Star(x, y, n_points, r1, r2, rotation_speed )'
    // and pushing them into our star array with 'all_our_star_copies.push....'
  	all_our_star_copies.push(  new Star(x, y, n_points, r1, r2, rotation_speed )  ); 
  }
} 

function draw() { 
  background(220);

  for(var i = 0; i < all_our_star_copies.length; i++){
    all_our_star_copies[i].show();
  }
  

  
}function setup() { 
  createCanvas(400, 400);
  
  for (let i = 0; i < 200; i++) {
    star[i] = new Stars(random(width), random(height));
  }
} 

function draw() { 
  background(0);
  
	push();
  noFill();
  stroke(random(255));
  translate(width*0.8, height*0.5);
  rotate(frameCount / -100.0);
  ellipse(0, 0, 20, 20, 20);
  fill('yellow');
  star(0, 0, 10, 5, 5); 
  pop();
  
}
function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}let img;
let all_our_star_copies = [];
let num_stars = 50;
let fireflies = [];

function preload() {
  img = loadImage("images/nightfield.png");
}
function setup() {
  createCanvas(600, 338);
	preload();
  
  for (let i = 0; i < 200; i++) {
    fireflies[i] = new Fireflies(random(width), random(height));
  }
  for (let i = 0; i < num_stars; i++){
    let x = random(width);
    let y = random(height-110);
    let n_points = int(random(5, 10));
    let r1 = random(1,8);
    let r2 = random(2,12);
    let rotation_speed = random(-100, 100);
    // creating copies of the Star Class/Object/Blueprint with 'new Star(x, y, n_points, r1, r2, rotation_speed )'
    // and pushing them into our star array with 'all_our_star_copies.push....'
  	all_our_star_copies.push(new Star(x, y, n_points, r1, r2, rotation_speed )  ); 
  }
}

function draw() {
  noStroke();
  image(img, 0, 0);
  
  for(let i = 0; i < all_our_star_copies.length; i++){
    all_our_star_copies[i].show();
  }
  for (let i = 0; i < fireflies.length; i++) {
    fireflies[i].update();
    fireflies[i].display();
    for (let j = 0; j < fireflies.length; j++) {
      if (i != j && fireflies[i].intersects(fireflies[j])) {
      }
    }
  }
}
let img;
let bubbles = [];

function preload() {
  img = loadImage("images/nightfield1.png");
}

function setup() { 
  createCanvas(600, 338);
	preload();
  
  for (let i = 0; i < 230; i++) {
    bubbles[i] = new Bubble(random(width), random(height-110));
  }
} 

function draw() { 
  background(220);
  image(img, 0, 0);
  
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
    for (var j = 0; j < bubbles.length; j++) {
      if (i != j && bubbles[i].intersects(bubbles[j])) {
        bubbles[i].changeColor();
        bubbles[j].changeColor();
}let img;
let fireflies = [];

function preload() {
  img = loadImage("images/nightfield.png");
}
function setup() {
  createCanvas(600, 338);
	preload();
  
  for (let i = 0; i < 200; i++) {
    fireflies[i] = new Fireflies(random(width), random(height));
  }
}

function draw() {
  noStroke();
  image(img, 0, 0);

  for (let i = 0; i < fireflies.length; i++) {
    fireflies[i].update();
    fireflies[i].display();
    for (let j = 0; j < fireflies.length; j++) {
      if (i != j && fireflies[i].intersects(fireflies[j])) {
      }
    }
  }
}/* 
6.10 p5.js checking objects intersection part 2 (part 1 is in video 6.9)
Code for video https://vimeo.com/channels/learningp5js/141919524
*/

var bubbles = [];

function setup() {
  createCanvas(600, 400);

  for (var i = 0; i < 50; i++) {
    bubbles[i] = new Bubble(random(width), random(height));
  }
}

function draw() {
  background(0);

  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
    for (var j = 0; j < bubbles.length; j++) {
      if (i != j && bubbles[i].intersects(bubbles[j])) {
        bubbles[i].changeColor();
        bubbles[j].changeColor();
      }
    }
  }
}/* 
6.10 p5.js checking objects intersection part 2 (part 1 is in video 6.9)
Code for video https://vimeo.com/channels/learningp5js/141919524
*/

var bubbles = [];

function setup() {
  createCanvas(600, 400);

  for (var i = 0; i < 15; i++) {
    bubbles[i] = new Bubble(random(width), random(height));
  }
}

function draw() {
  background(0);

  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
    for (var j = 0; j < bubbles.length; j++) {
      if (i != j && bubbles[i].intersects(bubbles[j])) {
        bubbles[i].changeColor();
        bubbles[j].changeColor();
      }
    }
  }
}function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
//Landscape
  background(0,0,51);
  noStroke();
  fill(34, 51, 0)
  arc(200, 350, 600, 375, PI+QUARTER_PI,TWO_PI);
	fill(34, 51, 0);
  arc(500, 350, 800, 300, PI+QUARTER_PI,TWO_PI);
  rect(0, 163, 200, 187);
  rect(0, 350, 600, 50);
//Fence
  stroke(51, 26, 0);
  strokeWeight(24);
  noFill();
  arc(0, 510, 900, 700, PI+QUARTER_PI,TWO_PI);
  arc(-75, 530, 900, 700, PI+QUARTER_PI,TWO_PI);
  strokeCap(SQUARE);
  line(65,140,55,220);
  strokeWeight(28);
  line(170,153,150,260);
  strokeWeight(32);
  line(288,192,254,325);
  strokeWeight(35);
  line(400,260,350,400);
//Moon
  noStroke();
  fill('yellow');
  ellipse(500, 80, 80, 80);
  fill(0,0,51);
  ellipse(475, 80, 75, 75);

  
  
}let bouncer1;
let bouncer2;
let gravity = 0.1;

function setup() {
  createCanvas(400, 400);
  bouncer1 = new Ball(100,100);
  bouncer2 = new Ball(300,300);
}

function draw() {
  background(255);
  bouncer1.render();
  bouncer1.update();
  bouncer2.render();
  bouncer2.update();
}



// Slider 
let dragging = false; // Is the slider being dragged?
let rollover = false; // Is the mouse over the slider?
let x = 145;
let y = 365;
let w = 100;
let h = 10;
let value = 0;
let sliderStart = 114;
let sliderEnd = 287;
let offsetX = 0;

// Button State
let buttonWasClicked = false;

function setup() {
  createCanvas(400, 500);
}

function draw() {
  background = createImg("http://i67.tinypic.com/2rmqfc8.png");
  background.hide();
	iPhone();
	StartButton();
	Screen();
	LockScreen();
	SlideToUnlock();
}

function iPhone(){
  strokeWeight(3);
  stroke("silver");
  fill("white");
  rect(100, 60, 200, 380, 23);
  rect(99, 110, 0, 14)
  rect(99, 135, 0, 23)
  rect(99, 166, 0, 23)
  noStroke();
  fill(0)
  ellipse(204, 75, 5, 5);
  ellipse(176, 87, 6, 6);
  rect(189, 85, 32, 2.75, 3)
  }

function StartButton() {
  stroke("grey");
  strokeWeight(2);
  fill(255)
  ellipse(201, 413, 29, 29);
}

function Screen() {
  stroke("grey");
  strokeWeight(1);
	image(background, 115, 111, 172, 280);
}

function LockScreen() { 
  // Is it being dragged?
  if (dragging) {
  x = mouseX + offsetX;
  }
	// Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd - w);
  let b = map(x, sliderStart, sliderEnd - w, 0, 0);
  let fill_opacity = map(x, 144, 188, 255, 0);
  fill(b,fill_opacity);
  rect(sliderStart, 111, sliderEnd - sliderStart, 280);
}
  
  function SlideToUnlock() {
  noStroke();
  line(sliderStart, y + h / 2, sliderEnd, y + h / 2);
  if(buttonWasClicked == true){
  textSize(12);
  let text_opacity = map(x, 144, 188, 255, 0);
  fill(random(255),text_opacity);
  text("> slide to unlock", x + 9, y + 9);
  }
    
}
	function mousePressed() {
  // Did I click on slide to unlock?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
  dragging = true;
  // If so, keep track of relative location of click to corner of rectangle
  offsetX = x - mouseX;
  }
  // Did I click the start button?
  if (dist(mouseX,mouseY,201, 413)  < 29/2) {
  buttonWasClicked = true;
  }
}// Slider 
let dragging = false; // Is the slider being dragged?
let rollover = false; // Is the mouse over the slider?
let x = 145;
let y = 365;
let w = 100;
let h = 10;
let value = 0;
let sliderStart = 114;
let sliderEnd = 287;
let offsetX = 0;

// Button State
let buttonWasClicked = false;

function setup() {
  createCanvas(400, 500);
}

function draw() {
  background = createImg("http://i67.tinypic.com/2rmqfc8.png");
  background.hide();

  // iPhone
  strokeWeight(3);
  stroke("silver");
  fill("white");
  rect(100, 60, 200, 380, 23);
  rect(99, 110, 0, 14)
  rect(99, 135, 0, 23)
  rect(99, 166, 0, 23)
  noStroke();
  fill(0)
  ellipse(204, 75, 5, 5);
  ellipse(176, 87, 6, 6);
  rect(189, 85, 32, 2.75, 3)
  
  //Button
  stroke("grey");
  strokeWeight(2);
  fill(255)
  ellipse(201, 413, 29, 29);

  // Screen
  stroke("grey");
  strokeWeight(1);
	image(background, sliderStart, 111, 172, 280);

  // Is it being dragged?
  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd - w);

  // Lock Screen
  let b = map(x, sliderStart, sliderEnd - w, 0, 0);
  let fill_opacity = map(x, 144, 188, 255, 0);
  fill(b,fill_opacity);
  rect(sliderStart, 111, sliderEnd - sliderStart, 280);
  
  // Slide to Unlock
  noStroke();
  line(sliderStart, y + h / 2, sliderEnd, y + h / 2);
  if(buttonWasClicked == true){
    textSize(12);
    let text_opacity = map(x, 144, 188, 255, 0);
    fill(random(255),text_opacity);
    text("> slide to unlock", x + 9, y + 9);
  }
}
function mousePressed() {
  // Did I click on slider?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x - mouseX;
  }
    // Did I click the button?
  if (dist(mouseX,mouseY,201, 413)  < 29/2) {
    buttonWasClicked = true;
  }
}// Slider

let dragging = false; // Is the slider being dragged?
let rollover = false; // Is the mouse over the slider?

// Slider variables
let x = 145;
let y = 365;
let w = 100;
let h = 10;
let value = 0;

// Screen variables
let speed = 1;
let on = true;
let r = 0;
let g = 45;
let b = 0;


// Start and end of slider
let sliderStart = 114;
let sliderEnd = 288;

// Offset for dragging slider
let offsetX = 0;

// button state
let buttonWasClicked = false;

function setup() {
  createCanvas(400, 500);
}

function draw() {
  background(255);

  // iPhone
  strokeWeight(3);
  stroke("silver");
  fill("white");
  rect(100, 60, 200, 380, 23);
  rect(99, 110, 0, 14)
  rect(99, 135, 0, 23)
  rect(99, 166, 0, 23)
  noStroke();
  fill(0)
  ellipse(204, 75, 5, 5);
  ellipse(176, 87, 6, 6);
  rect(189, 85, 32, 2.75, 3)
  
  //Button
  stroke("grey");
  strokeWeight(2);
  fill(255)
  ellipse(201, 413, 29, 29);

  // Screen
  stroke("grey");
  strokeWeight(1);
  fill(value);
  rect(113, 110, 175, 280);

  // Is it being dragged?
  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd - w);

  // Slider line
  noStroke();
  line(sliderStart, y + h / 2, sliderEnd, y + h / 2);

  // Fill according to state
  if (dragging) {
    fill(0);
  } else {
    fill(0);
  }
  
  // Rectangle for slider
  if(buttonWasClicked == true){
    textSize(12);
    let text_opacity = map(x, 144, 188, 255,0);
    fill(random(255),text_opacity );
    text("> slide to unlock", x + 9, y + 9);
  }

  // Lock Screen
  let b = map(x, sliderStart, sliderEnd - w, 0, 255);
  fill(b, 130);
  rect(sliderStart, 111, sliderEnd - sliderStart, 279);
  
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x - mouseX;
  }
  // Did I click the button?
  if (dist(mouseX,mouseY,201, 413)  < 29/2) {
    buttonWasClicked = true;
  }

}// Slider

let dragging = false; // Is the slider being dragged?
let rollover = false; // Is the mouse over the slider?

// Slider variables
let x = 145;
let y = 365;
let w = 100;
let h = 10;
let value = 0;

// Start and end of slider
let sliderStart = 114;
let sliderEnd = 288;

// Offset for dragging slider
let offsetX = 0;

// Button state
let buttonWasClicked = false;

function setup() {
  createCanvas(400, 500);
}

function draw() {
  background(255);

  // iPhone
  strokeWeight(3);
  stroke("silver");
  fill("white");
  rect(100, 60, 200, 380, 23);
  rect(99, 110, 0, 14)
  rect(99, 135, 0, 23)
  rect(99, 166, 0, 23)
  noStroke();
  fill(0)
  ellipse(204, 75, 5, 5);
  ellipse(176, 87, 6, 6);
  rect(189, 85, 32, 2.75, 3)
  
  //Button
  stroke("grey");
  strokeWeight(2);
  fill(255)
  ellipse(201, 413, 29, 29);

  // Screen
  stroke("grey");
  strokeWeight(1);
  fill(value);
  rect(113, 110, 175, 280);

  // Is it being dragged?
  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd - w);

  // Slider line
  noStroke();
  line(sliderStart, y + h / 2, sliderEnd, y + h / 2);

  // Fill according to state
  if (dragging) {
    fill(0);
  } else {
    fill(0);
  }
  
  // Rectangle for slider
  if(buttonWasClicked == true){
    textSize(12);
    let text_opacity = map(x, 144, 188, 255,0);
    fill(random(255),text_opacity );
    text("> slide to unlock", x + 9, y + 9);
  }

  // Lock Screen
  let b = map(x, sliderStart, sliderEnd - w, 0, 255);
  fill(b, 130);
  rect(sliderStart, 111, sliderEnd - sliderStart, 279);
  
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x - mouseX;
  }
  // Did I click the button?
  if (dist(mouseX,mouseY,201, 413)  < 29/2) {
    buttonWasClicked = true;
  }

}// Slider

let dragging = false; // Is the slider being dragged?
let rollover = false; // Is the mouse over the slider?

// Rectangle variables for slider
let x = 145;
let y = 365;
let w = 100;
let h = 10;
let value = 0;

// Start and end of slider
let sliderStart = 114;
let sliderEnd = 288;

// Offset for dragging slider
let offsetX = 0;

// button state
let buttonWasClicked = false;

function setup() {
  createCanvas(400, 500);
}

function draw() {
  background(255);

  // iPhone
  strokeWeight(3);
  stroke("silver");
  fill("white");
  rect(100, 60, 200, 380, 23);
  rect(99, 110, 0, 14)
  rect(99, 135, 0, 23)
  rect(99, 166, 0, 23)
  noStroke();
  fill(0)
  ellipse(204, 75, 5, 5);
  ellipse(176, 87, 6, 6);
  rect(189, 85, 32, 2.75, 3)
  
  //Button
  stroke("grey");
  strokeWeight(2);
  fill(255)
  ellipse(201, 413, 29, 29);
  

  // Screen
  stroke("grey");
  strokeWeight(1);
  fill(value);
  rect(113, 110, 175, 280);

  // Is it being dragged?
  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd - w);

  // Slider line
  noStroke();
  line(sliderStart, y + h / 2, sliderEnd, y + h / 2);

  // Fill according to state
  if (dragging) {
    fill(0);
  } else {
    fill(0);
  }
  
  // Rectangle for slider
  if(buttonWasClicked == true){
    textSize(12);
    let text_opacity = map(x, 144, 188, 255,0);
    fill(random(255),text_opacity );
    text("> slide to unlock", x + 9, y + 9);
  }

  // Lock Screen
  let b = map(x, sliderStart, sliderEnd - w, 0, 255);
  fill(b, 130);
  rect(sliderStart, 111, sliderEnd - sliderStart, 278);
  
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x - mouseX;
  }
  // Did I click the button?
  if (dist(mouseX,mouseY,201, 413)  < 29/2) {
    print("clicked button");
    buttonWasClicked = true;
  }

}// Slider

let dragging = false; // Is the slider being dragged?
let rollover = false; // Is the mouse over the slider?

// Rectangle variables for slider
let x = 145;
let y = 365;
let w = 100;
let h = 10;

// Start and end of slider
let sliderStart = 114;
let sliderEnd = 288;

// Offset for dragging slider
let offsetX = 0;

function setup() {
  createCanvas(400, 500);
}

function draw() {
  background(255);

  // iPhone
  strokeWeight(3);
  stroke("silver");
  fill("white");
  rect(100, 60, 200, 380, 23);
  rect(99, 110, 0, 14)
  rect(99, 135, 0, 23)
  rect(99, 166, 0, 23)
  stroke("grey");
  strokeWeight(2);
  ellipse(201, 413, 29, 29);
  noStroke();
  fill(0)
  ellipse(204, 75, 5, 5);
  ellipse(176, 87, 6, 6);
  rect(189, 85, 32, 2.75, 3)


  // Screen
  stroke("grey");
  strokeWeight(1);
  fill(0);
  rect(113, 110, 175, 280);

  // Is it being dragged?
  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd - w);

  // Slider line
  noStroke();
  line(sliderStart, y + h / 2, sliderEnd, y + h / 2);

  // Fill according to state
  if (dragging) {
    fill(0);
  } else {
    fill(0);
  }
  
  // Draw rectangle for slider
	rect(x, y, w, h);
  textSize(12);
  fill(random(255));
  text("> slide to unlock", x + 9, y + 9);

  // Lock Screen
  var b = map(x, sliderStart, sliderEnd - w, 0, 255);
  fill(b, 130);
  rect(sliderStart, 111, sliderEnd - sliderStart, 278);
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x - mouseX;
  }

}// Slider

let dragging = false; // Is the slider being dragged?
let rollover = false; // Is the mouse over the slider?

// Rectangle variables for slider
let x = 145;
let y = 365;
let w = 100;
let h = 10;
let value = 0;

// Start and end of slider
let sliderStart = 114;
let sliderEnd = 288;

// Offset for dragging slider
let offsetX = 0;

// button state
let buttonWasClicked = false;

function setup() {
  createCanvas(400, 500);
}

function draw() {
  background(255);

  // iPhone
  strokeWeight(3);
  stroke("silver");
  fill("white");
  rect(100, 60, 200, 380, 23);
  rect(99, 110, 0, 14)
  rect(99, 135, 0, 23)
  rect(99, 166, 0, 23)
  noStroke();
  fill(0)
  ellipse(204, 75, 5, 5);
  ellipse(176, 87, 6, 6);
  rect(189, 85, 32, 2.75, 3)
  
  //Button
  stroke("grey");
  strokeWeight(2);
  fill(255)
  ellipse(201, 413, 29, 29);
  
  


  // Screen
  stroke("grey");
  strokeWeight(1);
  fill(value);
  rect(113, 110, 175, 280);
  ellipse(

  // Is it being dragged?
  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd - w);

  // Slider line
  noStroke();
  line(sliderStart, y + h / 2, sliderEnd, y + h / 2);

  // Fill according to state
  if (dragging) {
    fill(0);
  } else {
    fill(0);
  }
  
  // Rectangle for slider
  if(buttonWasClicked == true){
    textSize(12);
    let text_opacity = map(x, 144, 188, 255, 0);
    fill(random(255),text_opacity );
    text("> slide to unlock", x + 9, y + 9);
  }

  // Lock Screen
  let b = map(x, sliderStart, sliderEnd - w, 0, 255);
  fill(b, 130);
  rect(sliderStart, 111, sliderEnd - sliderStart, 278);
  
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x - mouseX;
  }
  // Did I click the button?
  if (dist(mouseX,mouseY,201, 413)  < 29/2) {
    print("clicked button");
    buttonWasClicked = true;
  }

}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
colorMode(RGB);
noStroke();
background(frameCount%360,80,100);
from = color(218, 165, 32,100);
to = color(72, 61, 139,100);
colorMode(RGB);  
interA = lerpColor(from, to, .33);
interB = lerpColor(from, to, .66);
fill(from);
rect(50, 68, 300, 300);
fill(interA);
rect(85, 123, 230, 225);
fill(interB);
rect(120, 167, 160, 160);
fill(to);
rect(mouseX, mouseY, 110, 110);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
colorMode(RGB);
noStroke();
background(frameCount%360,80,100);
from = color(218, 165, 32);
to = color(72, 61, 139);
colorMode(RGB);  
interA = lerpColor(from, to, .33);
interB = lerpColor(from, to, .66);
fill(from);
rect(50, 68, 300, 300);
fill(interA);
rect(85, 123, 230, 225);
fill(interB);
rect(120, 167, 160, 160);
fill(to);
rect(mouseX, mouseY, 110, 110);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(255);
  fill (225,255, 0)
arc (200, 200, 225, 225, PI/4, 1.75*PI, PIE);
fill (
arc (200, 200, 225, 225, radians(45), radians (-45), PIE);

}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(255);
  
//circuits
fill(255,0,0);
stroke(255,0,0)
strokeWeight(2.3);
line(130, 120, 210, 120);
line(210, 120, 230, 110);
line(300, 120, 235, 120);
line(300, 120, 300, 141);
line(130, 120, 130, 146);
line(130, 120, 160, 120);
line(109, 146, 150, 146);
line(116, 154, 143, 154);
line(109, 161, 150, 161);
line(116, 168, 143, 168);
line(130, 168, 130, 195);
line(130, 195, 300, 195);
line(300, 195, 300, 168);

//heart
triangle(300, 165, 287, 149, 312, 149);
arc(292, 147, 12, 12, PI, PI+QUARTER_PI);
arc(292, 147, 12, 12, PI+QUARTER_PI, TWO_PI);
arc(307, 147, 12, 12, PI, PI+QUARTER_PI);
arc(307, 147, 12, 12, PI+QUARTER_PI, TWO_PI);
line(287, 147, 312, 147);

//switch
ellipse(235, 120, 4, 4);
ellipse(210, 120, 4, 4);








}function setup() { 
  createCanvas(500, 500);
} 

function draw() { 
//background
background(203,200,220);
  
//center rect
noStroke();	
fill(91,81,146,130);
rect(150, 120, 130, 250);
  
//right rect
translate(width/2, height/2);
rotate(PI/7.5);
noStroke();
rect(-43, -94, 130, 245);
  
//left rect
rotate(PI/-4);
noStroke();
rect(-137, -183, 120, 260);
}