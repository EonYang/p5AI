//big dome led, com = ground . , yellow side

// Question: When Serial data (var quantity)6 changes from one range to the other
// how to get the giphy to change without having to re-run p5
// Question: How to replace the potentiometer with 3 buttons
// WHat about joystick
var sensors = []; //array
// sky, earth, ocean
var size = 0;
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1431'; // fill in your serial port name here
var buttonValue1;
var buttonValue2;
var buttonValue3;

/// Including joystick
var joyValue1;
var joyValue2;
var joyValue3;
var joyValue4;

var quantity, inString;

//var potValue;

//giphy api
let api = "https://api.giphy.com/v1/gifs/search?"
let api_key = "api_key=59GZx8ykG5JMCrU1TJVKIUP08BjXWMYO"
let searchq = "&q="
let limit = "&limit=100"
let endURL = "&offset=0&rating=G&lang=en"
let gifs = [];
let full_qURL = api + api_key + searchq + limit + endURL;
var findV;
var executed = false;

function setup() {
  // createCanvas(windowWidth,windowHeight);
 noCanvas() // do file -> share -> full screen

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('data', serialEvent);
  serial.list(); // list the serial ports
  serial.open(portName);
}

function draw() {
 //  background(220);
  // stroke(1);
  // ellipse(200,200,size,size)
  // find()

}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}


function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  inString = serial.readStringUntil('\r\n');
  print(inString);

  // inString = serial.readLine();
  // print(inString);

  //check to see that there's actually a string there:
  if (inString.length > 0) {
    var sensors = split(inString, ','); // split the string on the commas
    if (sensors.length > 2) { // if there are three elements
      buttonValue1 = sensors[0];
      buttonValue2 = sensors[1];
      buttonValue3 = sensors[2];
      joyValue1 = sensors[3];
      joyValue2 = sensors[4];
      joyValue3 = sensors[5];
      joyValue4 = sensors[6];
      console.log("sensors =" + sensors);

      if (buttonValue1 == '1') {
        findV = 'sky'
        find(findV);
      }
      
       if (buttonValue2 == '1') {
        findV = 'earth'
        find(findV);
      }
      
       if (buttonValue3 == '1') {
        findV = 'ocean'
        find(findV);
      }
      
        if (joyValue1 == '1') {
        findV = 'Elmo'
        find(findV);
      }
      
        if (joyValue2 == '1') {
        findV = 'Big bird'
        find(findV);
      }
      
        if (joyValue3 == '1') {
        findV = 'Cookie Monster'
        find(findV);
      }
      
        if (joyValue4 == '1') {
        findV = 'monkey business'
        find(findV);
      }
    }
  }


}

//giphy functions
function find(quantity) {

  full_qURL = api + api_key + searchq + findV + limit + endURL;
  gifData = loadJSON(full_qURL, gotData);

}

function gotData(unicorn) {
  gifs = [];
  for (let i = 0; i < 100; i++) {
    gifs.push(unicorn.data[i].images.original.url);
    
  //  if (gifs.length > 3) {gifs = []}

  }

  if (gifs.length > 0) {
    removeElements(); // this will remove the div and p, not canvas
    
    // we got it from here ants
    img = createImg(random(gifs));
    img.style('width','100%')
  }
// use dom library to clear the array - so the image refreshes
  // use remove elements
  // keep track of time using miliseconds
  
  // console.log(unicorn.data);
  // console.log(unicorn.meta);
}//big dome led, com = ground . , yellow side

// Question: When Serial data (var quantity)6 changes from one range to the other
// how to get the giphy to change without having to re-run p5
// Question: How to replace the potentiometer with 3 buttons
// WHat about joystick
var sensors = []; //array
// sky, earth, ocean
var size = 0;
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem50'; // fill in your serial port name here
var buttonValue1;
var buttonValue2;
var buttonValue3;

var quantity, inString;

//var potValue;

//giphy api
let api = "https://api.giphy.com/v1/gifs/search?"
let api_key = "api_key=59GZx8ykG5JMCrU1TJVKIUP08BjXWMYO"
let searchq = "&q="
let limit = "&limit=100"
let endURL = "&offset=0&rating=G&lang=en"
let gifs = [];
let full_qURL = api + api_key + searchq + limit + endURL;
var findV;
var executed = false;

function setup() {
  
  // fullScreen();
  createCanvas(windowWidth,windowHeight);
  // noCanvas()

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('data', serialEvent);
  serial.list(); // list the serial ports
  serial.open(portName);
}

function draw() {
  // background(220);
  // stroke(1);
  // ellipse(200,200,size,size)
  // find()

}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}


function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  inString = serial.readStringUntil('\r\n');
  print(inString);

  // inString = serial.readLine();
  // print(inString);

  //check to see that there's actually a string there:
  if (inString.length > 0) {
    var sensors = split(inString, ','); // split the string on the commas
    if (sensors.length > 2) { // if there are three elements
      buttonValue1 = sensors[0];
      buttonValue2 = sensors[1];
      buttonValue3 = sensors[2];
      console.log("sensors =" + sensors);

      if (buttonValue1 == '1') {
        findV = 'sky'
        find(findV);
      }
      
       if (buttonValue2 == '1') {
        findV = 'earth'
        find(findV);
      }
      
       if (buttonValue3 == '1') {
        findV = 'ocean'
        find(findV);
      }
    }
  }


}

//giphy functions
function find(quantity) {

  full_qURL = api + api_key + searchq + findV + limit + endURL;
  gifData = loadJSON(full_qURL, gotData);

}

function gotData(unicorn) {
  gifs = [];
  for (let i = 0; i < 100; i++) {
    gifs.push(unicorn.data[i].images.original.url);
    
  //  if (gifs.length > 3) {gifs = []}

  }

  if (gifs.length > 0) {
    removeElements(); // this will remove the div and p, not canvas
    
    // we got it from here ants
    img = createImg(random(gifs));
  }
// use dom library to clear the array - so the image refreshes
  // use remove elements
  // keep track of time using miliseconds
  
  // console.log(unicorn.data);
  // console.log(unicorn.meta);
}//big dome led, com = ground . , yellow side

// Question: When Serial data (var quantity)6 changes from one range to the other
// how to get the giphy to change without having to re-run p5
// Question: How to replace the potentiometer with 3 buttons
// WHat about joystick
var sensors = []; //array
// sky, earth, ocean
var size = 0;
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem53'; // fill in your serial port name here
var buttonValue1;
var buttonValue2;
var buttonValue3;

var quantity, inString;

//var potValue;

//giphy api
let api = "https://api.giphy.com/v1/gifs/search?"
let api_key = "api_key=59GZx8ykG5JMCrU1TJVKIUP08BjXWMYO"
let searchq = "&q="
let limit = "&limit=100"
let endURL = "&offset=0&rating=G&lang=en"
let gifs = [];
let full_qURL = api + api_key + searchq + limit + endURL;
var findV;
var executed = false;

function setup() {
  // createCanvas(windowWidth,windowHeight);
 noCanvas() // do file -> share -> full screen

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('data', serialEvent);
  serial.list(); // list the serial ports
  serial.open(portName);
}

function draw() {
 //  background(220);
  // stroke(1);
  // ellipse(200,200,size,size)
  // find()

}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}


function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  inString = serial.readStringUntil('\r\n');
  print(inString);

  // inString = serial.readLine();
  // print(inString);

  //check to see that there's actually a string there:
  if (inString.length > 0) {
    var sensors = split(inString, ','); // split the string on the commas
    if (sensors.length > 2) { // if there are three elements
      buttonValue1 = sensors[0];
      buttonValue2 = sensors[1];
      buttonValue3 = sensors[2];
      console.log("sensors =" + sensors);

      if (buttonValue1 == '1') {
        findV = 'sky'
        find(findV);
      }
      
       if (buttonValue2 == '1') {
        findV = 'earth'
        find(findV);
      }
      
       if (buttonValue3 == '1') {
        findV = 'ocean'
        find(findV);
      }
    }
  }


}

//giphy functions
function find(quantity) {

  full_qURL = api + api_key + searchq + findV + limit + endURL;
  gifData = loadJSON(full_qURL, gotData);

}

function gotData(unicorn) {
  gifs = [];
  for (let i = 0; i < 100; i++) {
    gifs.push(unicorn.data[i].images.original.url);
    
  //  if (gifs.length > 3) {gifs = []}

  }

  if (gifs.length > 0) {
    removeElements(); // this will remove the div and p, not canvas
    
    // we got it from here ants
    img = createImg(random(gifs));
    img.style('width','100%')
  }
// use dom library to clear the array - so the image refreshes
  // use remove elements
  // keep track of time using miliseconds
  
  // console.log(unicorn.data);
  // console.log(unicorn.meta);
}// Question: When Serial data (var quantity)6 changes from one range to the other
// how to get the giphy to change without having to re-run p5
// Question: How to replace the potentiometer with 3 buttons
// WHat about joystick
var sensors = []; //array
// sky, earth, ocean
var size = 0;
var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem14141';  // fill in your serial port name here
var buttonValue1;
var buttonValue2;
var buttonValue3;
//var potValue;

//giphy api
let api = "https://api.giphy.com/v1/gifs/search?"
let api_key = "api_key=59GZx8ykG5JMCrU1TJVKIUP08BjXWMYO"
let searchq = "&q="
let limit = "&limit=100"
let endURL = "&offset=0&rating=G&lang=en"
let gifs = [];
let full_qURL = api + api_key + searchq + limit + endURL ;
var findV;
var executed = false;

function setup() {
  // createCanvas(400, 400);
 noCanvas()
 
 serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList); // set a callback function for the serialport list event
 serial.on('data', serialEvent);
 serial.list(); // list the serial ports
 serial.open(portName);
}

function draw() {
   // background(220);
   // stroke(1);
   // ellipse(200,200,size,size)
  // find()
 
}
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}


function serialEvent() {
  quantity = Number(serial.read());
  print(quantity);
  
  if(sensors[1]==1){
  	findV = "sky"
	find(findV);
  }

  
//   if (quantity < 15) {
//     //if (!executed) {
//      // executed = true;
//       findV = "sky"
//       find(findV);
//     }
//  // }
// else if (quantity >15 && quantity <= 128) { //(quantity == 128)
    //if (!executed) {
  //     //executed = true;
  // 		findV = "earth"
  //     find(findV);
  //   //}
  // } else if (quantity > 128) { //==255
  //   //if (!executed) {
  //     //executed = true;
  // 		findV = "ocean"
  //     find(findV);
  //  // }
  // } else {
  //   //if (!executed) {
  //     //executed = true;
  //     findV = ""
  //     find(findV);
  //   }
 // }
  
 
}

//giphy functions
function find (quantity){

          full_qURL = api + api_key + searchq + findV + limit + endURL ;
          gifData = loadJSON (full_qURL, gotData);
  
}

function gotData (unicorn) {
 for (let i = 0; i < 100; i++){
   gifs.push(unicorn.data[i].images.original.url);

 }
  
 if (gifs.length > 0) {
  	img=createImg(random(gifs));
  }     
   
  // console.log(unicorn.data);
  // console.log(unicorn.meta);
}


// Question: When Serial data (var quantity)6 changes from one range to the other
// how to get the giphy to change without having to re-run p5
// Question: How to replace the potentiometer with 3 buttons
// WHat about joystick
var sensors = []; //array
// sky, earth, ocean
var size = 0;
var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem14141';  // fill in your serial port name here
var buttonValue1;
var buttonValue2;
var buttonValue3;

//var potValue;

//giphy api
let api = "https://api.giphy.com/v1/gifs/search?"
let api_key = "api_key=59GZx8ykG5JMCrU1TJVKIUP08BjXWMYO"
let searchq = "&q="
let limit = "&limit=100"
let endURL = "&offset=0&rating=G&lang=en"
let gifs = [];
let full_qURL = api + api_key + searchq + limit + endURL ;
var findV;
var executed = false;

function setup() {
  // createCanvas(400, 400);
 noCanvas()
 
 serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList); // set a callback function for the serialport list event
 serial.on('data', serialEvent);
 serial.list(); // list the serial ports
 serial.open(portName);
}

function draw() {
   // background(220);
   // stroke(1);
   // ellipse(200,200,size,size)
  // find()
 
}
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}


function serialEvent() {
  quantity = Number(serial.read());
  print(quantity);
  
  //if(sensors[1]==1){
  //	findV = "sky"
	//find(findV);
  //}
  var inString = serial.readStringUntil('\r\n');
   if (inString.length > 0 ) {
    var sensors = split(inString, ','); // split the string on the commas
    if (sensors.length > 2){
    	buttonValue1 = sensors[0];
      buttonValue2 = sensors[1];
      buttonValue3 = sensors[2];
      console.log("sensors ="+sensors);
    }
    }

}

//giphy functions
function find (quantity){

          full_qURL = api + api_key + searchq + findV + limit + endURL ;
          gifData = loadJSON (full_qURL, gotData);
  
}

function gotData (unicorn) {
 for (let i = 0; i < 100; i++){
   gifs.push(unicorn.data[i].images.original.url);

 }
  
 if (gifs.length > 0) {
  	img=createImg(random(gifs));
  }     
   
  // console.log(unicorn.data);
  // console.log(unicorn.meta);
}



// Question: When Serial data (var quantity)6 changes from one range to the other
// how to get the giphy to change without having to re-run p5
// Question: How to replace the potentiometer with 3 buttons
// WHat about joystick

// sky, earth, ocean
var size = 0;
var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem14141';  // fill in your serial port name here

//giphy api
let api = "https://api.giphy.com/v1/gifs/search?"
let api_key = "api_key=59GZx8ykG5JMCrU1TJVKIUP08BjXWMYO"
let searchq = "&q="
let limit = "&limit=100"
let endURL = "&offset=0&rating=G&lang=en"
let gifs = [];
let full_qURL = api + api_key + searchq + limit + endURL ;
var findV;
var executed = false;

function setup() {
  // createCanvas(400, 400);
 noCanvas()
 
 serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList); // set a callback function for the serialport list event
 serial.on('data', serialEvent);
 serial.list(); // list the serial ports
 serial.open(portName);
}

function draw() {
   // background(220);
   // stroke(1);
   // ellipse(200,200,size,size)
  // find()
 
}
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}


function serialEvent() {
  quantity = Number(serial.read());
  print(quantity);
  
  if (quantity < 15) {
    if (!executed) {
      executed = true;
      findV = "sky"
      find(findV);
    }
  } else if (quantity >15 && quantity <= 128) { //(quantity == 128)
    if (!executed) {
      executed = true;
  		findV = "earth"
      find(findV);
    }
  } else if (quantity > 128) { //==255
    if (!executed) {
      executed = true;
  		findV = "ocean"
      find(findV);
    }
  } else {
    if (!executed) {
      executed = true;
      findV = ""
      find(findV);
    }
  }
  
 
}

//giphy functions
function find (quantity){

          full_qURL = api + api_key + searchq + findV + limit + endURL ;
          gifData = loadJSON (full_qURL, gotData);
  
}

function gotData (unicorn) {
 for (let i = 0; i < 100; i++){
   gifs.push(unicorn.data[i].images.original.url);

 }
  
 if (gifs.length > 0) {
  	img=createImg(random(gifs));
  }     
   
  // console.log(unicorn.data);
  // console.log(unicorn.meta);
  }


var size = 0;
var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem14141';  // fill in your serial port name here

function setup() {
  createCanvas(400, 400);
 serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList); // set a callback function for the serialport list event
 serial.on('data', serialEvent);
 serial.list(); // list the serial ports
 serial.open(portName);
}

function draw() {
  background(220);
  stroke(1);
  ellipse(200,200,size,size)
}
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}


function serialEvent() {
  size = Number(serial.read());
  print(size);
}
var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var inData;

function setup() {
  
  createCanvas (400,300);
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
  fill(255)
  text("sensor value: " + inData, 30, 30);

}
function serverConnected() {
  println('connected to server.');
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
}// Nov 13 - Revision 7.1, 7.2, 

//7.1, What is an array?
//var nums {0, 1, 2}, index value= 0, 1, 2
//ellipse (300, 300, nums[index value], nums[2])
// function mouse pressed { index = index + 1} to draw on each click


//7.2, Arrays and loops p5.js
// for (var i=0; i<4; i++) {
//1.  start with zero
//2. check to see if zero is less than 4,
//3. execute a task
//loop: go up by 1 (the i++) check to see if its still less than 4, execute the task

//https://www.youtube.com/watch?v=RXWO3mFuW-I&index=26&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA

var nums = [10,20,30,40]
var color = [40,50,60,50]

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
 
  for (i = 0; i<4; i++){
  stroke(255)
  //fill(color[i]);
  ellipse (i*100+100, 150, nums[i], nums[i])
  
  }

}// Nov 13 - 6.3
// Revision: w4 - Videos 6.1-6.3, 7.1-7.7, 16.4
// https://www.youtube.com/watch?v=rHiSsgFRgx4&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA&index=23
//

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}// Nov 13 - 6.1, 6.2 
// Revision: w4 - Videos 6.1-6.3, 7.1-7.7, 16.4
// https://www.youtube.com/watch?v=T-HGdc8L-7w&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA&index=22
// 1. Define template, that's the class
// 2. Define constructor = How the object is initialized, this.x, this.y
// 3. Add functionality, show, move
// 4. Then create many variables, let, let ,let
// Objects in a Class are a collection of Data and Functionality 
// 6.3, Naming variables: https://www.youtube.com/watch?v=rHiSsgFRgx4&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA&index=23
// 6.4, Multiple files for multiple classes(objects) https://www.youtube.com/watch?v=5nf41qLeagU&index=24&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA
// 6.4, include in index.html body <script src="OBJECT.js"></script>

let bubble1 
let bubble2

function setup() {
  createCanvas(400, 400);
  bubble1 = new bubble();
  bubble2 = new bubble();
  
  //bubble1 = bubble.new
  //bubble2 = bubble.new 
}

function draw() {
  background(0);
  bubble1.move();
  bubble1.show();
  bubble2.move();
  bubble2.show();
}

class bubble {
  
  constructor() {
    this.x = 100
    this.y = 200
  }
  
  move() {
    this.x = this.x + random(-5,5);
    this.y = this.y + random(-5,5);
  }
  
  show() {
    stroke(255);
    ellipse (this.x, this.y, 24, 24)
  }

}var weather;
var cathead;
//var url = "https://api.nutritionix.com/v1_1/search/orange?results=0%3A1&cal_min=0&cal_max=50000&fields=nf_calories%2Cnf_vitamin_c_dv&appId=e68eda4a&appKey=62cb68d5f60e2b3d25cac8c0c70fda3d"
var api = "https://api.openweathermap.org/data/2.5/weather?q=";
//var city = "New York";
var apiKey = "&APPID=55685e36d4913f761d5359206df0b999";
var units = '&units=metric';


function preload() {
          cathead = loadImage('cathead.png');

}
function setup() {
          createCanvas(600, 600);
          var button = select('#submit');
          button.mousePressed(weatherAsk);
          input = select('#city');
}

function draw() {
  background(250);
        image(cathead,200,200,200,200);
}


function weatherAsk() {
          var url = api + input.value() + apiKey + units;
          loadJSON(url, gotData);

}

function gotData(data) {
          weather = data;
          console.log(data.main.temp);}

function catjiggle () {
        

}let lines = [];
let i = 0;

function setup() {
  createCanvas(400, 400);
  
  loadStrings("test.txt", doText);
  
  i = document.cookie;
  
}

function doText(data) {
  console.log(data);
  lines = data;
} 

function draw() {
  background(255,255,255);

	//for (let i = 0; i < lines.length; i++) {
    text(lines[i], 5, 20*i+20);
  //}
  
  text(i, 20, 20, 20);
}

function mousePressed() {
 i++; 
 console.log(lines[i]);
  document.cookie("i="+i);

}let api = "https://api.giphy.com/v1/gifs/search?"
let api_key = "api_key=59GZx8ykG5JMCrU1TJVKIUP08BjXWMYO"
let searchq = "&q="
let limit = "&limit=100"
let endURL = "&offset=0&rating=G&lang=en"

//create an empty array
let gifs = [];

let full_qURL = api + api_key + searchq + limit + endURL ;
  
function setup() {
 // createCanvas(400, 400);
  
  noCanvas();
  
   p = createP('What is on your mind?');
  input = createInput('...');
  button = createButton('keep thinking');
  button.mousePressed(find);
  
 
  
}

function draw() {
  background(220);

 
}


function find (){
let findV = input.value();
 full_qURL = api + api_key + searchq + findV + limit + endURL ;
   gifData = loadJSON (full_qURL, gotData);
}

function gotData (unicorn) {
 for (let i = 0; i < 100; i++){
   gifs.push(unicorn.data[i].images.original.url);
 }
  
    if (gifs.length > 0) {
  	img=createImg(random(gifs));
  } 
   
  //console.log(unicorn.data);
  //console.log(unicorn.meta);
  }var size = 0;
var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem14141';  // fill in your serial port name here

function setup() {
  createCanvas(400, 400);
 serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList); // set a callback function for the serialport list event
 serial.on('data', serialEvent);
 serial.list(); // list the serial ports
 serial.open(portName);
}

function draw() {
  background(220);
  stroke(1);
  ellipse(200,200,size,size)
}
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}


function serialEvent() {
  size = Number(serial.read());
  print(size);
}
//Make variables nouns, and functions verbs

let theotherdiv; // creating text in js

let input;

function setup() {
  createCanvas(400, 400);
  thediv = select ('#thediv'); //creating text in html
  
  theotherdiv = createDiv("here is initial text"); //..in js
  
  h1 = createElement ("h1","Here is a headline");
  h1.mousePressed(h1Callback);
  two = select('#two');
  
  input = select('#textInput');
  input.changed(inputCallback); // DOES NOT WORK
}

function inputCallback() {
  alert(input.value());
}


function draw() {
background(220)
}

function h1Callback(){
  h1.style('color','green'); // DOES NOT WORK
  alert("Hey Stop");
}

function mousePressed() {
  thediv.html("here is new text"); // in html
  two.html("New Stuff");
}let Tom;
let Midori

function setup() {
  createCanvas(400, 400);
  Tom = new ITPer("Professor","Tom Igoe", "1997","pcomp", "male");
  Midori = new ITPer ("Staff","Midori Yasuda","2000","management","female");
  Tom.tellMeYourName();
  Midori.tellMeYourName();
  Tom.tellMeYourRole();
  Midori.tellMeYourRole();
}

function draw() {
  background(220);
}

class ITPer {
  constructor(role,name,classYear, skill, sex) {  // should have constructor to create instance
   this.role = role;
   this.name = name;
   this.classYear = classYear;
   this.skill = skill;
   this.sex = sex;
     
  }
  
  tellMeYourName() { // this is a function, i.e. method
    
    console.log("name",this.name);
  }
  
  tellMeYourRole() {
      
      console.log("role",this.role);         
  }
  
}
  
  // 1 Box by Recursion, 2nd by For-loop

// Recursion is a loop that is contained within itself

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(mouseX,mouseY/mouseX,mouseX-mouseY);
  rectMode(CENTER);
  drawSomething(mouseX, mouseY, mouseY);
  
  for (var i = mouseY; i>0; i--){
   // print("run the line inside of the for loop");
    
    fill(0,0,i);
    stroke(i);
    rect(mouseX+50,mouseY+50,i,i);
    
    print("<--- number of times this is called");
   
    ///defines max, or "ceiling"
	
  }
  
}

function drawSomething(x,y,s) {
  
	fill(s,0,0);
	
	noStroke();
	
	rect(x,y,s,s);
	
  if (s>10) {
    drawSomething(x,y,s-10);
  }
	
	//Hey 
	//Why aren't we doing this?
	//
	//s=s-10;
  
  //recursion defines the last minimum, or "floor"
  
  
  
  
  
  ///defines max, or "ceiling"
	
}
// Recursion is a loop that is contained within itself

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  rectMode(CENTER);
  drawSomething(mouseX, mouseY, mouseY);
}

function drawSomething(x,y,s) {
  
	fill(s,0,0);
	
	noStroke();
	
	rect(x,y,s,s);
	
  if (s>10) {
    drawSomething(x,y,s-10);
  }
	
	//Hey Shawn
	//Why aren't we doing this?
	//Dominic wants to know
	//s=s-10;
	
}
// class ball

class ball {
  constructor(x, y, s, xdir, ydir) {
    this.x = x
    this.y = y
    this.s = s
    this.xdir = xdir
    this.ydir = ydir
    
  }

  display() {
    strokeWeight(0);
    r = random(0, 255);
    g = random(0, 255);
    b = random(0, 255);
    fill(r, g, b)

    ellipse(this.x, this.y, this.s, this.s)
  }
  
  
  goalkeepermove() { 
    frameRate(5)
     fill(210, 180, 140)
    
    // don't display here, just do calculation, 
    //display by calling goalKeeperClass.display below
 // ellipse(200 + 100 * sin(this.x), 140, 50, 50);
  this.x = 200 + 100 * sin(this.x + 2 * PI / 360);
  }

  
  footballmove() {
  //function mouseReleased() { 

  this.xdir = this.xdir + random(-2, 2)
  this.ydir = this.ydir - random(100, 30)
    
    this.x =this.x +this.xdir
    this.y =this.y +this.ydir
   }
  





}

let football = new ball(100, 350, 40, 1, 1)
let goalkeeperClass = new ball(200, 140, 50)


let yspeed =10;
let goalkeeper;
var x = 200;
var y = 350;
var r;
var g;
var b;


function setup() {
  createCanvas(400, 400);
  goalkeeper = PI;

  print (goalkeeperClass)

}

function mouseReleased() {
  print(football.ydir)
 football.footballmove(); 
}


function draw() {

  background(25, 200, 120); // 


  // Goal Keeper //ellipse(x, y, w, [h])
 // fill(210, 180, 140)
 // ellipse(200 + 100 * sin(goalkeeper), 140, 50, 50);
 // goalkeeper = goalkeeper + 2 * PI / 360;


  strokeWeight(30); // Goal post
  line(110, 50, 280, 50);
  line(105, 50, 105, 90);
  line(280, 50, 280, 90);
  stroke(255, 255, 255);

  football.display()
  goalkeeperClass.display()
  goalkeeperClass.goalkeepermove()
  //football.footballmove()


  line(0, 300, 600, 300); // The D


  // strokeWeight(0); //The football
  // fill(r, g, b)
  // ellipse(x, y, 40, 40)

  //y+=yspeed;  //Bad attempt: ball bounces off goalkeeper
  //if (y<140) yspeed=yspeed-1;


  textSize(20);
  fill(0)
  text('Kick!', mouseX, mouseY);
  fill(0, 102, 153, 51);
  text('', 10, 90);


}


// function mouseReleased() { // Dribble

//   x = x + random(-20, 20)
//   y = y - random(100, 30)
// }// Recursion is a loop that is contained within itself

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  rectMode(CENTER);
  drawSomething(mouseX, mouseY, 200);
}

function drawSomething(x,y,s) {
  rect(x,y,s,s);
  if (s>10) {
    drawSomething(x,y,s-10);
  }
}
//class //constructor function gives birth to the object of this type
//of class

class Ball {
  constructor(xx, yy, xxdir, yydir, rr) {
    this.x = xx; //this is an instance, and instance,is new object birth
    this.y = yy;
    this.xdir = xxdir;
    this.ydir = yydir;
    this.r = rr;

    this.stopped = false; // ball stop/start
  }

  // a method inside the ball class
  move() {
    if (this.stopped == false) { // ball stop/start
      this.x = this.x + this.xdir;
      this.y = this.y + this.ydir;
    }

    // to make the balls bounce

    if (this.x <= 0 || this.x >= width) {
      this.xdir = this.xdir * -1;
    }

    if (this.y <= 0 || this.y >= height) {
      this.ydir = this.ydir * -1;
    }

  }

  // another method inside the ball class

  display() {
    ellipse(this.x, this.y, this.r, this.r);
  }

  // another method in ball class to make ball stop

  stop() {
    this.stopped = true;
  }
  
  start() {
   	this.stopped = false;
  }

  // another method in ball class to make ball start
  //Then call it later in function draw () as  if (mouseIsPressed)
  //{ b.stop();} else
  //b.start??}
 


  //another method, hover

  //hover() {
  // if (dist(mouseX, mouseY, this.x, this.y) <this.r) {

}

let b, b1;


function setup() {
  createCanvas(400, 400);

  // we give birth to the object

  b = new Ball(50, 50, 1, 2, 50);
  b1 = new Ball(90, 80, 2, 1, 40);
}

// new and constructor are in javascript, they go hand in hand

function draw() {
  background(220);

  // methods to apply on the object

  b.move();
  b1.move();
  b.display();
  b1.display();


  //if mouseIsPressed then ball stop, ball start??
  if (mouseIsPressed) {
    b.stop();
  } else {
  	b.start()
  }
  // ellipse(b.x,b.y,b.r,b.r);
  // ellipse(b1.x,b1.y,b1.r,b1.r);
}let ball = {
  x:100,
  y:100,
  d:50,
  xspeed:1,
  yspeed:1
}

//We're going to define a new ball object: 

let beachBall = {
  x:100,
  y:100,
  d:50,
  xspeed:1,
  yspeed:1
}


//goal is to keep draw clean
//have code in separate functions
//and then call those functions

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  displayBall();
  moveBall();
  bounceBall();
}

// To make the ball appear on the canvas
function displayBall(){
  ellipse(ball.x,ball.y,ball.d,ball.d);
}

// To make the ball move
function moveBall() {
  ball.x = ball.x +ball.xspeed;
  ball.y = ball.y +ball.yspeed;
}

// To get the ball to bounce from canvas walls
function bounceBall(){
  if (ball.x<=0 || ball.x >=width) {
    ball.xspeed = ball.xspeed*-1;
  }
   if (ball.y<=0 || ball.y>=height){
     ball.yspeed = ball.yspeed*-1;
   }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  drawCircle();
  
 // fill(random(0,100), random(0,255), random(0,255));
 // ellipse(mouseX, mouseY, 50, 50)
  
  //fill(random(0,100), random(0,255), random(0,255));
  //ellipse(mouseX-20, mouseY-40, 50, 50)
  
  //fill(random(0,100), random(0,255), random(0,255));
  //ellipse(mouseX+20, mouseY-80, 50, 50)
  
//a function allows you to not be so repetitive in changes
//So you make a new function called drawCircle
// and going to give a parameter "offset" so you can call multiple
//Drawcricles(offset = value 1, value 2, value 3), Here
  //we are going to introduce another parameter diameter, so that it 
  //is input in drawCircle (offset, diameter) and that inputs in ]
  //Width and height of ellipse

drawCircle(10,50);
drawCircle(0,60);
drawCircle(100,70);
drawCircle(75,80);
  
    
          
  //now we can use a for-loop to draw random ellipses, i.e. give 
  //give random inputs to parameter offset, and diameter
  
 for (let i= 0; i<8; i++){
   drawCircle(random(0,100),random(0,100));
 }
  
  //this is for code line 47 onwards
    
  // print(myDist(width/2,height/2, mouseX, mouseY)

  // [HELP]
  //let d 
  //drawCircle(d,d)
  // print d 

}

function drawCircle(offset,diameter) {
 fill(random(0,100), random(0,255), random(0,255));
 ellipse(mouseX+offset, mouseY+offset, diameter, diameter)
  
  //functions can also be used to do calculations
  //we are going to use pythogreous theorem
  //to calculate distance between two points
  //we're making our own distance function
  //it is going to return a value
  //so we say within the function return 
  //anytime we call this function its going to return a value
  //Then going to print in draw 
  //print(myDist(width/2,height/2, mouseX, mouseY)
  
  function myDist (x1, y1, x2,y2) {
 // return sqrt(((x2-x1)^2 + (y2-y1)^2)); doesnt work in js
    return sqrt(pow(x2-x1),2+pow(y2-y1),2));
  }
  
  
}var slider;

function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, 255, 0);
  slider.position(10, 10);
  slider.style('width', '80px');
}

function draw() {
  // slider();
  var val = slider.value();
  background(val);
  fill(180, 50, 80);
  rect(val, 250, 100, 50);

  // if(mouseIsPressed && mouseX > 175 && mouseX < 275 && mouseY > 250 && mouseY < 300){


  for (var i = 0; i < 400; i += 30) {
    for (var m = 0; m < 400; m += 10) {
      line(i, m, i * .5, m * .5);
      line(val, val, i * val, m * i);
      rect(i, val, 100, 50);
      rect(val, i, 100, 50);
      stroke(255, val, 25);
    }

    if (mouseIsPressed) {
      // console.log(mouseX)
      //     background(val/4);
      ellipse(200, 200, mouseX, mouseX)

    }
  }
  // function slider(){
  // fill(180,50,80);
  // line(50,300,350,300);
  // ellipse(100,300,50,50);


  // }


}var slider;

function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, 255, 100);
  slider.position(10, 10);
  slider.style('width', '80px');
}

function draw() {

  var val = slider.value();
  background(val);
  // print(val)
  fill(180, 50, 80);
  rect(175, 250, 100, 50);
  if (mouseIsPressed && mouseX > 175 && mouseX < 275 && mouseY > 250 && mouseY < 300) {


  }
  for (var i = 0; i < 400; i += val) {
    for (var m = 0; m < 400; m += 10) {
      // line(val * 2, val, i * 8, m * .5);
      // line(val * i, m, i *.5, m * .5);
        line(0,0,i,m * val)

      stroke(255, val, 25)
    }
  }
  // function slider(){
  // fill(180,50,80);
  // line(50,300,350,300);
  // ellipse(100,300,50,50);


  // }


}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(30,200,220);
 crosshairs();
 //bird();
}

  
  // a simple moving crosshairs
  function crosshairs() {
   var x3 = map(mouseX, 0, width, 0, 400);
   var x4 = map(mouseX, 0, width, 0, 400);
  
  strokeWeight(5);
  //line (x1,y1, x2, y2)
  var x3 = map(mouseX, 0, width, 0, 400);
  line(x3, 0, x3, 600);

  //line (x1,y1, x2, y2)
  var x4 = map(mouseX, 0, width, 0, 400);
  line(0, x4, 400, x4)
  
  // ellipse(x, y, w, [h])
  noFill()
  ellipse (x3,x4,100,100)
}

// A design for a simple bird

function bird() {
  
 noStroke();
  for (var i = 0; i < 10; i ++) {
   ellipse(0, 30, 20, 80);
    rotate(PI/15);
  }
}
  
let x,y;
let xdir = 1;
let ydir = 1;

function setup() {
  createCanvas(400, 400);
  x =10;
  y=10;
  
}

function draw() {
  background(220);
  ellipse(x,y,20,20);
  rect(200,200,100,100)  // button shape
  
  if (mouseIsPressed) {  //button event
    if (mouseX >200 && mouseX <300 && mouseY<300 && mouseY>200) {
    xdir = 0;
    ydir =0 ;
  }
  } 
  
   x=x + xdir;
   y=y + ydir;
  //x++;
  //y+=2;
  
  if (y ==height){
    ydir = -1;
    //y-=2
}
  
  if (x==width) {
    xdir = -1;
  }
  
   
  if (x<=0) {
    xdir = 1;
  }
  
   
  if (y<=0) {
    ydir = 1;
  }
}
  // Shawn used the OR || to join the if statements for both
  //sides of the canvass
  
  
//let yspeed =10;
let goalkeeper;
var x = 200;
var y = 350;
var r;
var g;
var b;

  
function setup() {
  createCanvas(400, 400);
  goalkeeper = PI;
 
}


function draw() {
  
  background (25, 200, 120); // 
  r = random (0,255);
  g = random (0,255);
  b = random (0,255);
  
   // Goal Keeper //ellipse(x, y, w, [h])
  fill(210, 180, 140)
  ellipse( 200 + 100*sin(goalkeeper), 140, 50, 50);
  goalkeeper= goalkeeper+ 2*PI/360;
 
  
  strokeWeight(30);         // Goal post
  line(110, 50, 280, 50);
  line(105, 50, 105, 90);
  line(280, 50, 280, 90);
  stroke(255, 255, 255);
 
  
  line(0, 300, 600, 300); // The D
  
  
  strokeWeight(0);     //The football
  fill (r,g,b)
  ellipse(x, y, 40, 40)  
  
  //y+=yspeed;  //Bad attempt: ball bounces off goalkeeper
  //if (y<140) yspeed=yspeed-1;
  

textSize(20);
fill(0)
text('Kick!', mouseX, mouseY);
fill(0, 102, 153, 51);
text('', 10, 90);


}


function mouseReleased () {   // Dribble

  x = x + random(-20,20)
  y = y - random(100,30)
}



  

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}function setup() {
  createCanvas(400, 400);
}


carriesijiawang@gmail.com

function draw() {
  background(220);
}//Global Variable
 let ball;


function setup() {
  createCanvas(400, 400);


//ball.x = 10;
//ball.y= 100;
//ball.width =50;
  
  ball = {
    x:10,
    y:100,
    width:50
  
  };
}

//let x = mouse
//ellipse(x-10)
//ellipse(x+10)

function draw() {
  background(220);

fill(mouseX);
ellipse (ball.x, ball.y, ball.width, ball.width);
ball.x = mouseY;
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255, 204, 0);
  fill(250,250,170);
  ellipse(200, 200, 380,380);
  fill(100,200,100)
  ellipse(125,100,50,50);
  fill(150,200,100)
  ellipse(275,100,50,50);
  fill(255,100,100)
  arc(180, 300, 70, 70, 0, PI + QUARTER_PI, OPEN);
  fill(350,250,350)
  ellipse(190,180,100,100)
  
  push();
  fill(200,250,255)
  translate(150,0);
  triangle(30, 75, 58, 20, 86, 75);
  pop();
  
  textSize(32);
text('Pizza', 10, 30);
fill(0, 102, 153);
text('', 10, 60);
fill(0, 102, 153, 51);
text('Media', 10, 90);
  
   textSize(25);
text('Paper', 330, 350);
fill(0, 102, 153);
text('Plates', 330, 380);
fill(0, 102, 153, 51);
text('', 330, 410);
  
  
}let s = ""
let p;

function setup() {
  createCanvas(400, 400);
  
  p =createP("");
  frameRate (1);

}

function draw() {
  //background(220);
  //print(key);
  
  let x = random (width);
  let y = random (height);
  ellipse(x,y,50,50);
  
  let c = random (96,127);
  c = round(c);
  c = char(c);
  //print (c);
  s = s +c;
  print(s);
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255, 204, 0);
  fill(250,250,170);
  ellipse(200, 200, 380,380);
  fill(100,200,100)
  ellipse(125,100,50,50);
  fill(150,200,100)
  ellipse(275,100,50,50);
  fill(255,100,100)
  arc(180, 300, 70, 70, 0, PI + QUARTER_PI, OPEN);
  fill(350,250,350)
  ellipse(190,180,100,100)
  
  push();
  fill(200,250,255)
  translate(150,0);
  triangle(30, 75, 58, 20, 86, 75);
  pop();
  
  textSize(32);
text('Pizza', 10, 30);
fill(0, 102, 153);
text('', 10, 60);
fill(0, 102, 153, 51);
text('Media', 10, 90);
  
   textSize(25);
text('Paper', 330, 350);
fill(0, 102, 153);
text('Plates', 330, 380);
fill(0, 102, 153, 51);
text('', 330, 410);
  
  
}function setup() {
  createCanvas(400, 400);
	
	background(600)
	fill(0,0,200)
	stroke (255,0,0);
  ellipse(200,200,300,300);
	
	stroke(0);
	strokeWeight(1);
	rect(250,10,50,50);
	
	stroke(0);
	strokeWeight(1);
	rect(100,10,50,50);
	
	line(30, 20, 85, 75);

	
	
	
	
	
	createP("My name is Bilal");
}

function draw() {
  //background(220);
}