let charRNN;

function modelTeady(){
	console.log('get ready');
  
  let params = {
    seed:"hello my name is",
    temperature: 0.5,
    length: 100
  };
  
 charRNN.generate(params)
  .then(result =>{
   console.log(result);
   console.log(result.simple);
 });
									
}

function setup() {
  charRNN = ml5.charRNN('modelfilename',modelReady)
	
}

function draw() {
  background(220);
}function setup() {
  noCanvas();
  createP("Hello");

}

var tree;
var n;

function setup() {
  noCanvas();
  tree = new Tree();
  for (let i=0; i < 10; i++) {
    tree.addValue(floor(random(1,100)));
  }
  console.log(tree);
  tree.traverse();
}



var tree;
var max_dist = 100;
var min_dist = 10;

var url='https://api.mlab.com/api/1/databases/mashups_final/collections/userData?apiKey=RTZEqTz_6AQcWHs_C-Y19nghbsZbVW9L';

var mongoData;
var dataLength;

var img;
var img2;

function preload() {
  mongoData = loadJSON(url);
  img = loadImage('pink-sakura-md.png');
   img2 = loadImage('  pink-sakura-md2.png');

}

function setup() {
  createCanvas(400, 400);
  tree = new Tree();
  
  dataLength = Object.keys(mongoData).length;
  
  button = createButton('click me');
  button.position(19, 19);
  button.mousePressed(saveData);
  

  
   for(var i=0; i< dataLength; i++){
     var x = random(width);
     var y =random(height-100);
     var d = dist(x, y, width/2, height/2);
  if (d < 180){
    var a = x;
    var b = y;
         tint(255, 126);
    image(img, a, b,25,25);
    }
   }
 
  
}

function draw() {
    tree.show();
  tree.grow();

}

function saveData(){
    let now = new Date();
    let dateToSend = new Date(now.setDate(now.getDate()));	
    let sendData= { "timeToSend": dateToSend	}	;
  
httpPost(url,'json',sendData,function(data){
  console.log(data);
});
  
 var x = random(width);
     var y =random(height-100);
     var d = dist(x, y, width/2, height/2);
  if (d < 180){
    var a = x;
    var b = y;
    tint(255, 255);
    image(img2, a, b,40,40);
    }
  
  createDiv('<h1>Thank You!</h1><br><p>You are the No.'+dataLength+'love this page.');

}
var api = "http://api.giphy.com/v1/gifs/search?";

var apiKey = "&api_key=kBrfTNoCtX0HSeR4Rx1Wuz9QrVeomLsZ";

var query = "porzingis";


function setup() {
//noCanvas();

var inp = createInput('');
 // inp.input(myInputEvent);
 button = createButton('click me');
 button.position(0, 0);
 button.mousePressed(myInputEvent);
}

function gotData(data){
for (var i = 0; i < data.data.length; i++){
createImg(data.data[i].images.original.url);
//createImg(data.data[0].embed_url);
}
}

function myInputEvent() {
 query = this.value();
 var url = api + '&q='+query + apiKey;
 loadJSON(url,gotData);
}/*	This program lets users paint a scene of cherry blossom on a 
grassy terrian. Users can click on the terrian to add a cherry tree,
or click on the "Start over" text to empty all trees in the scene.
The trees are smaller when away from the front scene and have 
slightly different pink color and shape, providing variety to users.*/

var buttonX = 48;
var buttonY = 540;
var count = 0;
var sizeB = 0.3; // suggested range: 0 to 0.5

function setup() {
	createCanvas(600, 600);
	background(96, 196, 255);
	noStroke();

	fill(120, 250, 130); //top
	ellipse(240, 360, 400, 200);

	fill(96, 240, 120); //left
	ellipse(0, 360, 600, 200);

	fill(80, 220, 120); //right
	ellipse(500, 520, 800, 500);

	fill(80, 200, 120); //bottom
	ellipse(300, 600, 1200, 480);

	fill(200); //bar
	rect(0, 440, 600, 240);
	
  	fill(0);	
  	text("The Cherry Blossom by Alex HF.",20,580);
  	text("Click on the terrain to add a tree.",20,470);
}

function draw() {}

function mousePressed() {
	var x = random(16); // color
	var y = (mouseY - 250) / 100 + sizeB; // size
	var z = int(random(5)) - 2; // style

	if (mouseY > 260 && mouseY < 400) {
	  // trunk and shade
	  	noStroke();
		fill(32, 64);
		ellipse(mouseX + y * 2, mouseY + y * 12 - 1, y * 8, y * 4);
		fill(72 + x / 2, 48 + x / 8, 48 + x / 4);
		rect(mouseX, mouseY, y * 4, y * 12);

	  // flower
		//fill(32 + x / 4, 180 + x, 96 - x / 4); // green
		fill(252 - 2 * x, 120 + x, 136 - x, 240);
		ellipse(mouseX - y * 4, mouseY + y * 3, y * 6, y * 6);
		ellipse(mouseX + y * 8, mouseY + y * 3, y * 6, y * 6);
		if (z < 0) {
			ellipse(mouseX - y * 4, mouseY - y * 5, y * 6, y * 6);
			ellipse(mouseX + y * 8, mouseY - y * 5, y * 6, y * 6);
		}
		stroke(220, 128, 96, 116);
		ellipse(mouseX + y * 2, mouseY - y, y * 20, y * 16);
		count++;
	  // color and number indicator
	  	fill(252 - 2 * x, 120 + x, 136 - x, 255);
		rect(20, 460, 180, 100);
	  	fill(255);
		text("Number of blossoms:", 54, 500);
		text(count, 100, 514);
	  	text("Click here to Start over", buttonX, buttonY);

	} 
  	// start over
  	else if (mouseY > buttonY - 10 && mouseY < buttonY &&
		mouseX > buttonX && mouseX < buttonX + 120) {
		count = 0;
		setup();
	}
}
let particles = [];
let imgs = [];
let img1;
let img2;

function preload() {
//     for (var i=0; i<3; i++) {
//     imgs[i] = loadImage("s"+(i+1)+".png"); 
//       console.log(i);
//   }
//   console.log("finished");
  img1 = loadImage("s1.png");
  // img2 = loadImage("s2.png");
  
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index',-1);
    
  
}



function draw() {
  clear();
  push();
  frameRate(10);


// draw emission animation

      for (let j = 0; j < 1; j++) {
      let p = new Particle();
      particles.push(p);
        
        console.log(particles.length);
      }
      for (let j = 0; j < particles.length && j<3; j++) {
        
        particles[j].update();
      particles[j].show();
        if(particles.length>3){
      particles.splice(j, 1);
        }
        
    }
  pop();
  
  
}
  



class Particle {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.vx = random(-1, 5);
    this.vy = random(-1, 5);

  }


  update() {
    this.x += this.vx;
    this.y += this.vy;
  }

  show() {
    image(img1, this.x, this.y,20,20);
  //   image(img2, (this.x+random(1,30)), (this.y+random(1,30)),20,20);
   }

}
function setup() { 
  createCanvas(400, 400);
  getData();
} 

function getData() {
      httpGet("http://liveweb.itp.io:9090/send", 'json', false, 
              
              function(response) {
      					for(var i = 0; i < response.length; i++) {
                 	ellipse(response[i].x, response[i].y, 20, 20); 
                }
				        setTimeout(getData, 100);
      				});
		
}

function draw() { 
  //background(220);
  fill(0,0,0);
}

function mousePressed() {  
 	// if (mouseIsPressed) {
   ellipse(mouseX, mouseY, 20, 20); 
    httpGet("http://liveweb.itp.io:9090/save?x="+mouseX+"&y="+mouseY, 'json', false, function(response) {});

  // }
}var serial;
let img;

let user1;
let user2;
let user1_2;
let user2_2;




// function preload() {
//   img = loadImage("frontpage_design.gif");
// }


function setup() {
  createCanvas(windowWidth, windowHeight);

  serial = new p5.SerialPort(); // make a new instance of  serialport librar

  serial.on('list', printList); // set a callback function for the serialport list event
	serial.on('connected', serverConnected); // callback for connecting to the server
	//serial.on('open', portOpen); // callback for the port opening
	serial.on('data', serialEvent); // callback for when new data arrives
	serial.on('error', serialError); // callback for errors
	serial.on('close', portClose); // callback for the port closing

  // serial.on('list', printList); // callback function for serialport list event
  // serial.on('data', serialEvent); // callback for new data coming in
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1421"); // open a port



}


function draw() {
  background(0);
  // image(img, 0, 0,windowWidth,windowHeight);


  let user1_change=user1_2-user1;
  let user2_change=user2_2-user2;

  console.log(user1_change);
  console.log(user2_change);


   if (user1_change>50 && user2_change>50){
     location.replace('main.html');
     //let myLink = createA(location.href='submit_page.html','');
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


function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}


function serialEvent() {
  var stringFromSerial = serial.readLine(); // reads everything till the new line charecter
  if (stringFromSerial.length > 0) { // is the something there ?
    var trimmedString = trim(stringFromSerial); // get rid of all white space
    var myArray = split(trimmedString, ",") // splits the string into an array on commas

   user1 = Number(myArray[0]); // get the first item in the array and turn into integer
   user2 = Number(myArray[1]);
  // get the second item in the array and turn into integer
   user1_2=Number(myArray[2]);
   user2_2=Number(myArray[3]);

  }
}
var serial;
let img;

let user1;
let user2;
let user1_2;
let user2_2;




// function preload() {
//   img = loadImage("frontpage_design.gif");
// }


function setup() {
  createCanvas(windowWidth, windowHeight);

  serial = new p5.SerialPort(); // make a new instance of  serialport librar

  serial.on('list', printList); // set a callback function for the serialport list event
	serial.on('connected', serverConnected); // callback for connecting to the server
	//serial.on('open', portOpen); // callback for the port opening
	serial.on('data', serialEvent); // callback for when new data arrives
	serial.on('error', serialError); // callback for errors
	serial.on('close', portClose); // callback for the port closing

  // serial.on('list', printList); // callback function for serialport list event
  // serial.on('data', serialEvent); // callback for new data coming in
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1421"); // open a port



}


function draw() {
  background(0);
  // image(img, 0, 0,windowWidth,windowHeight);
  console.log(user1);
  console.log(user2);

  let user1_change=user1_2-user1;
  let user2_change=user2_2-user2;

  //console.log(user1_change);
  //console.log(user2_change);


   if (user1_change>50 && user2_change>50){
     location.replace('main.html');
     //let myLink = createA(location.href='submit_page.html','');
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


function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}


function serialEvent() {
  var stringFromSerial = serial.readLine(); // reads everything till the new line charecter
  if (stringFromSerial.length > 0) { // is the something there ?
    var trimmedString = trim(stringFromSerial); // get rid of all white space
    var myArray = split(trimmedString, ",") // splits the string into an array on commas

   user1 = Number(myArray[0]); // get the first item in the array and turn into integer
   user2 = Number(myArray[1]);
  // get the second item in the array and turn into integer
   user1_2=Number(myArray[2]);
   user2_2=Number(myArray[3]);

  }
}
var serial;

let canvas;

let user1;
let user2;
let user1_2;
let user2_2;




function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log("1");
  serial = new p5.SerialPort(); // make a new instance of  serialport librar
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1421"); // open a port



}


function draw() {
  background('#323232');
  //image(img, windowWidth/2, windowHeight/2-200, 200, 150);

  let user1_change=user1_2-user1;
  let user2_change=user2_2-user2;

  console.log(user1_change);

   if (user1_change>=10){
    //location.replace('1.html');
    console.log("Change");
 
    let myLink = createA(location.href='1.html','');
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
  var stringFromSerial = serial.readLine(); // reads everything till the new line charecter
  if (stringFromSerial.length > 0) { // is the something there ?
    var trimmedString = trim(stringFromSerial); // get rid of all white space
    var myArray = split(trimmedString, ",") // splits the string into an array on commas

   user1 = Number(myArray[0]); // get the first item in the array and turn into integer
   user2 = Number(myArray[1]);
  // get the second item in the array and turn into integer
   user1_2=Number(myArray[2]);
   user2_2=Number(myArray[3]);
    console.log(user1);
    console.log(user2);
    console.log(user1_2);
    console.log(user2_2);


  }
}var serial;


let user1;
let user2;
let user1_2;
let user2_2;




function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log("1");
  serial = new p5.SerialPort(); // make a new instance of  serialport librar
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1421"); // open a port



}


function draw() {
  background('#323232')
  //image(img, windowWidth/2, windowHeight/2-200, 200, 150);

  let user1_change=user1_2-user1;
  let user2_change=user2_2-user2;

  console.log(user1_change);

   if (user1_change>50 || user2_change>50){
     location.replace('1.html');
     //let myLink = createA(location.href='submit_page.html','');
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
  var stringFromSerial = serial.readLine(); // reads everything till the new line charecter
  if (stringFromSerial.length > 0) { // is the something there ?
    var trimmedString = trim(stringFromSerial); // get rid of all white space
    var myArray = split(trimmedString, ",") // splits the string into an array on commas

   user1 = Number(myArray[0]); // get the first item in the array and turn into integer
   user2 = Number(myArray[1]);
  // get the second item in the array and turn into integer
   user1_2=Number(myArray[2]);
   user2_2=Number(myArray[3]);
    console.log(user1);
    console.log(user2);
    console.log(user1_2);
    console.log(user2_2);


  }
}var serial;

//let img;

let user1;
let user2;
let user1_2;
let user2_2;



//loadimage
// function preload() {
//   img = loadImage("START_LOGO.gif");
//   soundFormats('wav');
//   mySound = loadSound('6538.wav');
// }


function setup() {
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1421"); // open a port



}


function draw() {
  background('#323232')
  //image(img, windowWidth/2, windowHeight/2-200, 200, 150);

  let user1_change=user1_2-user1;
  let user2_change=user2_2-user2;

  console.log(user1_change);

   if (user1_change>50 || user2_change>50){
     location.replace('1.html');
     //let myLink = createA(location.href='submit_page.html','');
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
  var stringFromSerial = serial.readLine(); // reads everything till the new line charecter
  if (stringFromSerial.length > 0) { // is the something there ?
    var trimmedString = trim(stringFromSerial); // get rid of all white space
    var myArray = split(trimmedString, ",") // splits the string into an array on commas

   user1 = Number(myArray[0]); // get the first item in the array and turn into integer
   user2 = Number(myArray[1]);
  // get the second item in the array and turn into integer
   user1_2=Number(myArray[2]);
   user2_2=Number(myArray[3]);
    console.log(user1);
    console.log(user2);
    console.log(user1_2);
    console.log(user2_2);


  }
}var loadC;
var loadingC;
var loginBoard;
var loginButton;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  loadC=new LoadCircle();
  loadingC=new LoadingCircle();
  loginBoard=new BoardLogin();
  loginButton=new ButtonLogin();

  
  var inp = createInput('');
  inp.input(myInputEvent);
} 

function draw() {
  smooth();
  // loadC.show();
  // loadingC.show();
  // loadingC.change();
  background('#568ea4');
  loginBoard.show();
  loginButton.show(); 
  
}

function myInputEvent(){
  console.log('you are typing: ', this.value());
}

 var amp; 

var col1;
var col2;
var col3;
var whichKey;
var allKeyColors =  [color(199,28,108),color(200,200,200),color(240,200,200)];

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
    whichKey = 0;
  }
  else if (keyCode === 83) {
    D4(); 
    col2=color(255);
    whichKey = 1;
  } else if (keyCode === 68) {
    E4();    
    //col3=color(255);
    whichKey = 2;
  } else if (keyCode === 70) {
    F4();    
    //col3=color(255);
  } else if (keyCode === 74) {
    G4();    
    whichKey = 3;
    //col3=color(255);
  } else if (keyCode === 75) {
    A4();    
    //col3=color(255);
    whichKey = 4;
  } else if (keyCode === 76) {
    B4();    
    //col3=color(255);
  } else if (keyCode === 186) {
    C5();    
    whichKey = 5;
    //col3=color(255);
  } 
  
}

// function keyReleased() {
//   if (keyCode === 65) {
//    col1=color(0,0,0);
//   } else if (keyCode === 83) { 
//    col2=color(200,200,200);
//   } else if (keyCode === 68) {   
//     col3=color(250,200,200);
//   } 
// }


function keyBoard(){
  //var offset=0;
  noStroke();
  // col1=color(199,28,108);
  // col2=color(200,200,200);
  // col3=color(240,200,200);
  for(var i=0; i<3; i++){
  rect(i*150,250,50,50);
  }
  
  for(var j=0;j<6;j++){
   if (j==whichkey) 
    {
      fill(0);
    }else{
      fill(allKeyColors[j]);
    }
  }
}

 
    
//   rect(j*150+50,250,50,50);
//   }
//   fill(col3);
//   for(var k=0;k<3;k++){
//       if (k+3==whichkey ) 
//     {
//       fill(0);
//     }else{
//       fill(col2);
//     }
//   rect(k*150+100,250,50,50);
//   }
 var amp;

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
     col1 = color(0);
   } else if (keyCode === 83) {
     D4();
     col2 = color(255);
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
     col1 = color(0, 0, 0);
   } else if (keyCode === 83) {
     col2 = color(200, 200, 200);
   } else if (keyCode === 68) {
     col3 = color(250, 200, 200);
   }
 }


 function keyBoard() {
   //var offset=0;
   noStroke();
   col1 = color(199, 28, 108);
   col2 = color(200, 200, 200);
   col3 = color(240, 200, 200);
   fill(col1);
   for (var i = 0; i < 3; i++) {
     rect(i * 150, 250, 50, 50);
     //offset=offset+50;
   }
   fill(col2);
   for (var j = 0; j < 3; j++) {
     rect(j * 150 + 50, 250, 50, 50);
   }
   fill(col3);
   for (var k = 0; k < 3; k++) {
     rect(k * 150 + 100, 250, 50, 50);
   }
 } var amp;

 var col1;
 var col2;
 var col3;
 var col;

 function setup() {
   createCanvas(300, 300);
   colorMode(HSB);
   fft = new p5.FFT(0, 64);
   amp = new p5.Amplitude();
 }

 function draw() {
   background(0);
   soundVisual();
   keyBoard();


 }

 function keyPressed() {
   if (keyCode === 65) {
     C4();
     col = 0;
   } else if (keyCode === 83) {
     D4();
     col2 = color(255);
   } else if (keyCode === 68) {
     E4();
     col3 = color(255);
   }
 }

 function keyReleased() {
   if (keyCode === 65) {
     col1 = 0;
   } else if (keyCode === 83) {
     col2 = color(200, 200, 200);
   } else if (keyCode === 68) {
     col3 = color(250, 200, 200);
   }
 }


 function keyBoard() {
   noStroke();
   // col1=color(211,34,89);
   // col2=color(200,200,200);
   // col3=color(250,200,200);
   col = 34;
   fill(212, col, 89);
   rect(0, 250, 50, 50);
   fill(170, col, 89);
   rect(50, 250, 50, 50);
   fill(50, col, 89);
   rect(100, 250, 50, 50);
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
}var col1;
var col2;
var col3;
var col;

function setup() {
  createCanvas(300, 300);
  colorMode(HSB);
}

function draw() {
  background(0);
  keyBoard();
 
}

function keyPressed() {
  if (keyCode === 65) {
    C4();
    col=0;
  }
  else if (keyCode === 83) {
    D4(); 
    col2=color(255);
  } else if (keyCode === 68) {
    E4();    
    col3=color(255);
  } 
}

function keyReleased() {
  if (keyCode === 65) {
   col1=0;
  } else if (keyCode === 83) { 
   col2=color(200,200,200);
  } else if (keyCode === 68) {     
    col3=color(250,200,200);
  } 
}


function keyBoard(){
  noStroke();
  // col1=color(211,34,89);
  // col2=color(200,200,200);
  // col3=color(250,200,200);
  col=34;
  fill(212,col,89);
  rect(0,250,50,50);
  fill(170,col,89);
  rect(50,250,50,50);
  fill(50,col,89);
  rect(100,250,50,50);
}var col1;
var col2;
var col3;
var col;

function setup() {
  createCanvas(300, 300);
  colorMode(HSB);
}

function draw() {
  background(0);
  keyBoard();
 
}

function keyPressed() {
  if (keyCode === 65) {
    C4();
    col=0;
  }
  else if (keyCode === 83) {
    D4(); 
    col2=color(255);
  } else if (keyCode === 68) {
    E4();    
    col3=color(255);
  } 
}

function keyReleased() {
  if (keyCode === 65) {
   col1=0;
  } else if (keyCode === 83) { 
   col2=color(200,200,200);
  } else if (keyCode === 68) {     
    col3=color(250,200,200);
  } 
}


function keyBoard(){
  noStroke();
  // col1=color(211,34,89);
  // col2=color(200,200,200);
  // col3=color(250,200,200);
  col=34;
  fill(212,col,89);
  rect(0,250,50,50);
  fill(170,col,89);
  rect(50,250,50,50);
  fill(50,col,89);
  rect(100,250,50,50);
}var p1;
let pulses = [];

function setup() {

  createCanvas(400, 300);

  for (var i = 0; i < 300; i++) {
    pulses[i] = new Pulse(random(width), random(height), random(10), random(2));
  }
}


function draw() {
  background(0);

  for (var i = 0; i < pulses.length; i++) {
    pulses[i].display();
  }
  
  /*if(mouseIsPressed){
  for (var j = 0; j < pulses.length; j++) {
    pulses[j].move();
  
  }
 
}*/



}var data;
var isTextShown = [false, false, false];
function preload() {
  data = loadJSON("ideas.json")
}

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER);
  ellipseMode(CENTER);
  drawCatalog();
  frameRate(5);
}

function draw() {

  showIdeas();
 
  }


function drawCatalog() {
  for (var i = 0; i < data.catalog.length; i++) {
    var x1 = 100 + i * 150;
    var y1 = 200;
    noStroke();
    fill(random(100, 200), 218, 255);
    ellipse(x1, y1, 60, 60);
    noFill();
    stroke(255);
    strokeWeight(2);
    ellipse(x1, y1, 50, 50);
    noStroke();
    fill(0);
    text(data.catalog[i].name, x1, y1 + 5);
  }
}

function drawIdeas(i) {
  if(isTextShown[i] == false){
    for (var j = 0; j < data.catalog[i].idea.length; j++) {
      var x1 = 100 + i * 150;
      var y1 = 250 + j * 15;
      fill(0);
      stroke(255);
      text(data.catalog[i].idea[j], x1, y1 + 5);
    }
    isTextShown[i] = true;
  }else{
    for (var z = 0; z < data.catalog[i].idea.length; z++) {
      var x = 100 + i * 150;
      var y = 250 + z * 15;
      fill(251);
      stroke(251);
      rect(x-50, y-10, 150, 100);
    }
    isTextShown[i] = false;
  }

}

function showIdeas() {   
  for (var k = 0; k < 3; k++) {
    var d = dist(mouseX, mouseY, 100 + k * 150, 200);
    if (d < 30&mouseIsPressed) {
      drawIdeas(k);
    }
  }  
}
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/CKeyIbT3vXI

var fireworks = [];
var gravity;

var xoff = 0.01;
var yoff = 0.005;

var x;
var y;

var i=0;

function setup() {
  createCanvas(600, 400);
  
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1411"); // open a port
  
  background(0);
  
  
  
  
}

function draw() {
 

  if (x<100) {
    background(0);
    noStroke();
    var al=[50,0]
    
    drawellipse(al[i]);
    if(i==0){
    i=1;}else{i=0;}
    
    
    
    
    }
 
    

  //stroke(255,100);
  //var circleNoise= new cN(300,random(0,10));
 // circleNoise.show();
    
   /* gravity = createVector(0, 0.2);
  //stroke(255);
  //strokeWeight(4);
    fireworks.push(new Firework());
 }
  
  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }*/
  


  
  
  if(600<y&x>100){  
    
    translate(300, 200);
     var r= random(0,25);
    var g= random(230);
    var b= random(218);
  stroke(r,g,b,100);
  var circleNoise= new cN(300,random(0,200));
  circleNoise.show();  
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
  var stringFromSerial = serial.readLine(); // reads everything till the new line charecter
  if (stringFromSerial.length > 0) { // is the something there ?
    trimmedString = trim(stringFromSerial); // get rid of all white space
    var myArray = split(trimmedString, ",") // splits the string into an array on commas
    x = Number(myArray[0]); // get the first item in the array and turn into integer
    y = Number(myArray[1]);
  
  }
}


class cN{

   constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  show(){


    noFill();
   
  angleMode(DEGREES);
  beginShape();
    for (var i = 0; i < 50; i++) 
    {
      var rad = map(noise(xoff*i*10,yoff*frameCount*2), 0, 1, 10, 200);
      var ang = map(i, 0, 50, 0, 360);
      this.x = rad * cos(ang);
      this.y = rad*sin(ang);
      curveVertex(this.x, this.y);
    }
    endShape(CLOSE);
  }


}


function drawellipse(a) {
  for (var x = 0; x <= 600; x = x + 10) {
    for (var y = 0; y <= 400; y = y + 10) {
        fill(19, 232,218,a);
      ellipse(x, y, 10, 10);
    }
  }
}

// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/CKeyIbT3vXI

var fireworks = [];
var gravity;

var xoff = 0.01;
var yoff = 0.005;

var x;
var y;

var i=0;

function setup() {
  createCanvas(screen.width, screen.height);
  
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1411"); // open a port
  
  background(0);
  
  
  
  
}

function draw() {
 

  if (x<100) {
    background(0);
    noStroke();
    var al=[100,0]
    
    drawellipse(al[i]);
    if(i==0){
    i=1;}else{i=0;}
    
    
    
    
    }
 
    

  //stroke(255,100);
  //var circleNoise= new cN(300,random(0,10));
 // circleNoise.show();
    
   /* gravity = createVector(0, 0.2);
  //stroke(255);
  //strokeWeight(4);
    fireworks.push(new Firework());
 }
  
  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }*/
  


  
  
  if(600<y&x>100){  
    

    translate(screen.width/2, screen.height/2);
     var r= random(150,255);
    var g= random(100);
    var b= random(100);
  stroke(r,g,b,100);
  var circleNoise= new cN(300,random(0,200));
  circleNoise.show();  
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
  var stringFromSerial = serial.readLine(); // reads everything till the new line charecter
  if (stringFromSerial.length > 0) { // is the something there ?
    trimmedString = trim(stringFromSerial); // get rid of all white space
    var myArray = split(trimmedString, ",") // splits the string into an array on commas
    x = Number(myArray[0]); // get the first item in the array and turn into integer
    y = Number(myArray[1]);
  
  }
}


class cN{

   constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  show(){


    noFill();
   
  angleMode(DEGREES);
  beginShape();
    for (var i = 0; i < 50; i++) 
    {
      var rad = map(noise(xoff*i*10,yoff*frameCount*2), 0, 1, 10, screen.height/2);
      var ang = map(i, 0, 50, 0, 360);
      this.x = rad * cos(ang);
      this.y = rad*sin(ang);
      curveVertex(this.x, this.y);
    }
    endShape(CLOSE);
  }


}


function drawellipse(a) {
  for (var x = 0; x <= screen.width; x = x + 10) {
    for (var y = 0; y <= screen.height; y = y + 10) {
        fill(200, 0,0,a);
      ellipse(x, y, 10, 10);
    }
  }
}

// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/CKeyIbT3vXI

var fireworks = [];
var gravity;

var xoff = 0.01;
var yoff = 0.005;

var trimmedString;


function setup() {
  createCanvas(600, 400);
  
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1411"); // open a port
  
  background(0);
  
  
  
  
}

function draw() {
 
  
  if (trimmedString<100) {

    background(0);
   /* gravity = createVector(0, 0.2);
  //stroke(255);
  //strokeWeight(4);
    fireworks.push(new Firework());
 }
  
  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }*/
  }
  
  
  
  if(480>trimmedString&trimmedString>320){
    translate(300, 200);
  var circleNoise= new cN(300,random(0,200));
  circleNoise.show();
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
  var stringFromSerial = serial.readLine(); // reads everything till the new line charecter
  if (stringFromSerial.length > 0) { // is the something there ?
    trimmedString = trim(stringFromSerial); // get rid of all white space
    //var myArray = split(trimmedString, ",") // splits the string into an array on commas
  }
}


class cN{

   constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  show(){

    noFill();
    var r= random(150,255);
    var g= random(100);
    var b= random(100);
  stroke(r,g,b,100);
  angleMode(DEGREES);
  beginShape();
    for (var i = 0; i < 50; i++) 
    {
      var rad = map(noise(xoff*i*10,yoff*frameCount*2), 0, 1, 10, 200);
      var ang = map(i, 0, 50, 0, 360);
      this.x = rad * cos(ang);
      this.y = rad*sin(ang);
      curveVertex(this.x, this.y);
    }
    endShape(CLOSE);
  }


}var xoff = 0.01;
var yoff = 0.005;



function setup() { 
  createCanvas(screen.width, screen.height);
   background(0);
 
} 

function draw() { 
 
  translate(mouseX, mouseY);
  var circleNoise= new cN(mouseX,random(100,300));
  circleNoise.show();
  
  
  
}


class cN{

   constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  show(){

    noFill();
    var r= random(0,200);
    var g= random(0,200);
    var b= random(0,200);
  stroke(r,g,b,20);
  angleMode(DEGREES);
  beginShape();
    for (var i = 0; i < 50; i++) 
    {
      var rad = map(noise(xoff*i*10,yoff*frameCount*2), 0, 1, 10, width);
      var ang = map(i, 0, 50, 0, 360);
      this.x = rad * cos(ang);
      this.y = rad;
      curveVertex(this.x, this.y);
    }
    endShape(CLOSE);
  }


}
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/CKeyIbT3vXI

var fireworks = [];
var gravity;

var trimmedString;

function setup() {
  createCanvas(600, 400);
  
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1411"); // open a port
  
  
  
  colorMode(HSB);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 25);
  
  if (trimmedString<100) {
    fireworks.push(new Firework());
  }
  
  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
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
  var stringFromSerial = serial.readLine(); // reads everything till the new line charecter
  if (stringFromSerial.length > 0) { // is the something there ?
    trimmedString = trim(stringFromSerial); // get rid of all white space
    //var myArray = split(trimmedString, ",") // splits the string into an array on commas
  }
}var data;
var on=true;

function preload() {
  data = loadJSON("ideas.json")
}

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER);
  ellipseMode(CENTER);
  drawCatalog();
}

function draw() {


  showIdeas();
 
  }





function drawCatalog() {
  for (var i = 0; i < data.catalog.length; i++) {
    var x1 = 100 + i * 150;
    var y1 = 200;
    noStroke();
    fill(random(100, 200), 218, 255);
    ellipse(x1, y1, 60, 60);
    noFill();
    stroke(255);
    strokeWeight(2);
    ellipse(x1, y1, 50, 50);
    noStroke();
    fill(0);
    text(data.catalog[i].name, x1, y1 + 5);
  }
}

function drawIdeas(i) {
  for (var j = 0; j < data.catalog[i].idea.length; j++) {
    var x1 = 100 + i * 150;
    var y1 = 250 + j * 15;
    fill(0);
    stroke(255);
    text(data.catalog[i].idea[j], x1, y1 + 5);
  }
}

function showIdeas() {   

  for (var k = 0; k < 3; k++) {
    var d = dist(mouseX, mouseY, 100 + k * 150, 200);
    if (d < 30&mouseIsPressed) {
      drawIdeas(k);
    }
  }  
}var weatherS;
var weatherN;
var api = 'https://api.openweathermap.org/data/2.5/forecast/daily?q=';
var mode = '&mode=json';
var units = '&units=metric';
var cnt = '&cnt=7';
var appid = '&APPID=001b0f58045147663b1ea518d34d88b4';


var input1;
var input2;


function setup() {
  createCanvas(400, 400);
  var button1 = select('#submit1');
  var button2 = select('#submit2');

  button1.mousePressed(weatherAsk1);
  button2.mousePressed(weatherAsk2);
  input1 = select('#city1');
  input2 = select('#city2');

  rectMode(CENTER);
  textAlign(CENTER);
}

function weatherAsk1() {
  var url1 = api + input1.value() + mode + units + cnt + appid;
  //var url2=api+input2.value()+mode+units+cnt+appid;
  loadJSON(url1, gotData1);
  //loadJSON(url2, gotData2);
}


function weatherAsk2() {
  //var url1=api+input1.value()+mode+units+cnt+appid;
  var url2 = api + input2.value() + mode + units + cnt + appid;
  //loadJSON(url1, gotData1);
  loadJSON(url2, gotData2);
}

function gotData1(data) {
  weatherS = data;
}

function gotData2(data) {
  weatherN = data;
}

function draw() {
  background(255);
  lines();
  data();
}


function data() {
  if (weatherS) {
    for (var i = 0; i < weatherS.list.length; i++) {
      fill(255, 192, 203);
      noStroke();
      ellipse(60 + i * 50, 300 - (weatherS.list[i].temp.day * 5), 10, 10);
      rect(280, 50, 30, 10);
      text(weatherS.city.name, 330, 55);
    }
    for (var h = 0; h < weatherS.list.length - 1; h++) {
      stroke(255, 192, 203);
      line(60 + h * 50, 300 - (weatherS.list[h].temp.day * 5), 60 + (h + 1) * 50, 300 - (weatherS.list[h + 1].temp.day * 5));
    }
  }

  if (weatherN) {
    for (var j = 0; j < weatherN.list.length; j++) {
      fill(139, 171, 203);
      noStroke();
      ellipse(60 + j * 50, 300 - (weatherN.list[j].temp.day * 5), 10, 10);
      rect(280, 70, 30, 10);
      text(weatherN.city.name, 330, 75);
    }
    for (var k = 0; k < weatherN.list.length - 1; k++) {
      stroke(139, 171, 203);
      line(60 + k * 50, 300 - (weatherN.list[k].temp.day * 5), 60 + (k + 1) * 50, 300 - (weatherN.list[k + 1].temp.day * 5));
    }
  }

}


function lines() {
  stroke(175);
  fill(0);
  line(40, 300, 380, 300);
  line(40, 300, 40, 100);
  for (var g = 0; g < 8; g++) {
    noStroke();
    text(g * 5, 30, 300 - g * 25);
  }
  text("Today", 60, 320);
  text("7 days before", 340, 320);
  text("Celsius", 40, 80);
}var data;

function preload(){
  data=loadJSON("color.json")
}

function setup() { 

  createCanvas(400,400);
} 

function draw() { 

  noStroke();
  for(var i=0; i<data.colors.length;i++){
  fill(data.colors[i].hex);
  var y=i*40+40;
    rectMode(CENTER);
  rect(100,y,20,20);
      textSize(10);
      text(data.colors[i].color, 150, y);
  }
}
var Capture;

var c;
var b;
var light;
var s;

function setup() { 
  createCanvas(500, 400);
  Capture= createCapture(VIDEO);
  Capture.size(500, 200);
  Capture.hide();
  colorMode(HSB, 255);
} 

function draw() { 
  image(Capture,0,0);
  c = get(80, 250);//get the pixel
  b = brightness(c);
}


var Capture;
var b;
var c;

function preload() {
  mySound = loadSound('01.mp3');
}

function setup() {
  createCanvas(600, 400);
  background(0);
  Capture = createCapture(VIDEO);
  Capture.size(600, 400);
  Capture.hide();
  mySound.setVolume(0.5);
  mySound.play();
}

function draw() {
  image(Capture, 0, 0);
  c = get(250, 100); //get the pixel
  b = brightness(c);
  drawellipse();
}

function drawellipse() {
  for (var x = 5; x <= 600; x = x + 10) {
    for (var y = 5; y <= 400; y = y + 10) {
      var s = map(b, 0, 180, 0, 5);
      strokeWeight(s);
      stroke(0)
      fill(b * 10, x + b, y, 100);
      ellipse(x, y, 10, 10);
    }
  }
}var Capture;
var s = 5;


function setup() { 
  createCanvas(500, 400);
  Capture= createCapture(VIDEO);
  Capture.size(250, 200);
  Capture.hide();
  colorMode(HSB, 255);
   ellipseMode(CENTER);
  
} 

function draw() { 
  image(Capture,250,0);
  c = get(150, 100);//get the pixel
  b = brightness(c);
  drawellipse();
  
}

/*function drawellipse() {
  for (var x = 10; x <= 250; x = x + 20) {
    for (var y = 10; y <= 200; y = y + 20) {
      strokeWeight(s);
      stroke(255)
        fill(200, x, y);
      ellipse(x, y, 20, 20);
    }
  }}8/
var Capture;

var c;
var b;
var light;
var s;

function setup() {
  createCanvas(500, 400);
  Capture = createCapture(VIDEO);
  Capture.size(500, 200);
  Capture.hide();
  colorMode(HSB, 255);
}

function draw() {
  image(Capture, 0, 0);
  c = get(80, 250); //get the pixel
  b = brightness(c);

  light = new Light;
  s = new S;

  light.on();
  light.show();
  s.show();
}


class Light {
  constructor() {
    this.x = 80;
    this.y = 80;
    this.r = 50;
    this.col = 10;
  }

  show() {
    fill(this.col);
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);
    stroke(3);
    line(this.x, 0, this.x, 55);
  }

  on() {
    if (b > 95) {
      this.col = color(40, 215, 255);
    }
  }
}


class S {
  constructor() {
    this.x = 80;
    this.y = 250;
    this.h = 20;
  }

  show() {
    fill(220);
    stroke(50);
    strokeWeight(6);
    rectMode(CENTER);
    rect(this.x, this.y, this.h, this.h);
  }




}/* Danny Rozin
Introduction to Physical Computing
ITP
/************ make sure you are in https mode for capture to work***************

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3

move mouse over live image to send pixel brightness and dim LED*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data
var Capture;


function setup() {
  createCanvas(320, 240);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1411"); // open a port
  
  Capture= createCapture(VIDEO);
  Capture.size(320, 240);
  Capture.hide();

}

function draw() {
 image(Capture,0,0);
  var c = get(mouseX, mouseY);//get the pixel
  var b = int(  brightness(c)   );
  serial.write(b);
}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available()){
  byte byteFromSerial = Serial.read();
  analogWrite(3,byteFromSerial);
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3

move mouseX to dim LED*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data



function setup() {
  createCanvas(255, 255);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1411"); // open a port
}

function draw() {
  background(255,0,0);
  var byteToSend=mouseX;
  byteToSend=constrain(byteToSend,0,255);
  serial.write(byteToSend);   // sends as byte unles iyts a string
}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available()){
  byte byteFromSerial = Serial.read();
  analogWrite(3,byteFromSerial);
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one value in ascii from arduino to P5
See arduino code in bottom, have pot connected to A0*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data

function setup() {
	createCanvas(320, 240);
	serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	serial.on('list', printList); // callback function for serialport list event
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbmodem1411"); // open a port
  frameRate(60);
}

function draw() {
	// do your drawing stuff here
	background(255);
	textSize(fromSerial);
	text(fromSerial, 0, height / 2);
}

// get the list of ports:
function printList(portList) {
	for (var i = 0; i < portList.length; i++) {
		// Display the list the console:
		println(i + " " + portList[i]);
	}
}

function serialEvent() {
	// this is called when data is recieved, data will then live in fromSerial	
	var stringFromSerial = serial.readLine();//check if it receive the line
  if (stringFromSerial.length>0){
    var trimmedString = trim(stringFromSerial);//get rid of the white space
    fromSerial= Number(trimmedString);//turn the string into a number
  }
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  int analogValue = analogRead(A0);
  Serial.println(analogValue);
  delay(50);
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from arduino to P5
See arduino code in bottom, have pot connected to A0*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data
var posX=0,posY=0, step = 10;


function setup() {
	createCanvas(320, 240);
	serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	serial.on('list', printList); // callback function for serialport list event
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbmodem1411"); // open a port

}

function draw() {
posX+=step;
  if (posX> width){
    posX= 0;
    posY+=step;
    if (posY> height)posY=0;
  }
  fill(fromSerial);
  rect(posX,posY, step, step);
}

// get the list of ports:
function printList(portList) {
	for (var i = 0; i < portList.length; i++) {
		// Display the list the console:
		println(i + " " + portList[i]);
	}
}

function serialEvent() {
	// this is called when data is recieved, data will then live in fromSerial	
	fromSerial = serial.read();//read the serial
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  int analogValue = analogRead(A0);
  byte byteToSend = map (analogValue, 0, 1023, 0, 255);
  Serial.write(byteToSend);
  delay(50);
}
*/var serial;

var star = []; //star array
var img; //image of the spaceship
var offset = 8; //offset of the Y position of each shot

var shipx;
var shipy;
var b;



//loadimage
function preload() {
  img = loadImage("spaceship1.png");
  soundFormats('wav');
  mySound = loadSound('6538.wav');
}


function setup() {
  createCanvas(600, 500);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1411"); // open a port


  for (var i = 0; i < 800; i++) {
    //make a star array, and the array is a star function.
    star[i] = new Star();
  }
}


function draw() {
  //background change
  var blue = map(shipy, 0, height, 54, 14);
  background(26, 28, blue);

  //call the star show function
  push();
  translate(width / 2, height / 2);
  for (var i = 0; i < star.length; i++) {
    star[i].show();
  }
  pop();


  //spaceship
  spaceship();

  //openfire
  openfire();

}





/*function intext() {
  fill(255, 100)
  noStroke();
  textSize(32);
  text("Press The Mouse To Open Fire", 200, 500);
}*/



function spaceship() {
  image(img, shipx - 50, shipy - 50);
}



function shot(x, y) {
  this.l = map(shipy - 300, 0, 300, 5, 30); //the length of each shot
  stroke(255, 0, 0);
  strokeWeight(4);

  if (offset < 30) {
    offset = offset + 1;
  } else {
    offset = 8;
  }
  line(x, y - offset, x, y - this.l - offset);
}


function openfire() {
  this.a = map(shipy - 300, 0, 300, 10, 50); //distance between the two shots

  //call the shot funtion
  if (b == 1) {

    mySound.setVolume(0.5);
    mySound.play();

    if (shipy <= width / 2 - 100) {
      this.b = -60;
    } else {
      this.b = 10;
    }
    shot(shipx, shipy - this.b);
    shot(shipx, shipy - this.b - this.a);
  }
}



function Star() {
  //make main variables
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);

  //this funtion draw the stars and make them move
  this.show = function() {
    //make the speed change with the mouseX
    this.speed = map(mouseY, 0, height, 30, 5);
    this.z = this.z - this.speed;

    //when stars come to the front, draw more stars.
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
    }

    //draw the stars & add its move
    fill(255);
    noStroke();
    this.sx = map(this.x / this.z, 0, 1, 0, width);
    this.sy = map(this.y / this.z, 0, 1, 0, height);
    this.r = map(this.z, 0, width, 8, 0);
    ellipse(this.sx, this.sy, this.r, this.r);
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
  var stringFromSerial = serial.readLine(); // reads everything till the new line charecter
  if (stringFromSerial.length > 0) { // is the something there ?
    var trimmedString = trim(stringFromSerial); // get rid of all white space
    var myArray = split(trimmedString, ",") // splits the string into an array on commas

    var x = Number(myArray[0]); // get the first item in the array and turn into integer
    var y = Number(myArray[1]);
    b = Number(myArray[2]); // get the second item in the array and turn into integer

    shipx = map(x, 35, 153, 100, width - 100);
    shipy = map(y, 248, 255, 50, height - 100);
  }
}// Declare a "SerialPort" object

var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

var star = [];//star array
var img;//image of the spaceship
var offset=8;//offset of the Y position of each shot




function setup() {
  createCanvas(windowWidth, windowHeight);

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
  var mappedVar = map(latestData, 0,540,0,width);
  //var mappedVar = map(latestData, 400,950,0,width);
  ellipse(mappedVar, 100, 50, 50);
  
  text(latestData, 10, 10);
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);

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
  var mappedVar = map(latestData, 0,540,0,width);
  //var mappedVar = map(latestData, 400,950,0,width);
  ellipse(mappedVar, 100, 50, 50);
  
  text(latestData, 10, 10);
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);

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
  var mappedVar = map(latestData, 490,540,0,width);
  //var mappedVar = map(latestData, 400,950,0,width);
  ellipse(mappedVar, 100, 50, 50);
  text(latestData, 10, 10);
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var fromSerial=0;



function setup() {
    createCanvas(500,500);
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
 
function draw(){
    background(255);
    text(fromSerial,100,100);
    rect(100,100,10,10)
    
    
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
  var stringFromSerial = serial.readLine();
  if(stringFromSerial.length>0){
  var trimmedSting = trim(stringFromSerial);
    fromSerial = Number(trimmedSting);
  }
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}var mySlide;

function setup() { 
  createCanvas(400, 400);
  mySlide=createSlider(0,100,20,1);
  mySlide.position(width/2-56,height/2);
  //mySlide.changed(changeCol);
   //mySlide.mousePressed(changeCol);
  mySlide.mouseClicked(changeCol)
  button = createButton('click me');
  button.position(100, 100);
} 

function draw() { 
  var col=20;
  background(col);
  
}

function changeCol(){
  print("q");
  background(random(255));
 //col=random(0,225);
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var fromSerial=0;



function setup() {
    createCanvas(500,500);
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
 
function draw(){
    background(255);
    text(fromSerial,100,100);
    rect(100,100,10,10)
    
    
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
  var stringFromSerial = serial.readLine();
  if(stringFromSerial.length>0){
  var trimmedSting = trim(stringFromSerial);
    fromSerial = Number(trimmedSting);
  }
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
 var fromSerial=0;


function setup() {
  createCanvas(500,500);
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
 
function draw(){
  background(255);
  text(fromSerial,100,100);
  
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
  
  var stringFromSerial = serial.readLine();

  if (stringFromSerial.length>0){
    var trimmedString = trim(stringFromSerial);
    fromSerial = number (trimmedString);
    
  }
 
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}
var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411;  // fill in your serial port name here
 
function setup() {
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
}let button = [];

function setup() {
  createCanvas(540, 540);
}


function draw() {
  background(0);
  for (let i = 0; i < 8; i++) {
    for (var o = 60; o <= 520; o = o + 60) {
      button[i] = new Button(i * 60 + 60, o, 30);
      if (mouseIsPressed) {
        button[i].mouseIn();
      } //This is not the ideal function I want.
      button[i].show();
    }
  }
}

//Why it can't work in this way. :(
/*function mousePressed() {
for (let i = 0; i < button.length; i++) {
for (var o = 60; o <= 520; o = o + 60) {
button[i].mouseIn();
}
}}*/


class Button {
  constructor(x, y, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.colf = color(131, 194, 213);
    this.colb = color(93, 143, 158);
  }

  show() {
    rectMode(CENTER);
    fill(this.colb);
    noStroke();
    rect(this.x, this.y, this.h, this.h);
    fill(this.colf);
    rect(this.x, this.y, this.h - 8, this.h - 8);
  }

  mouseIn() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < 15) {
      this.colf = color(155, 171, 122);
      this.colb = color(220, 246, 165);
    }
  }
}let bubble = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    bubble[i] = new Bubble();
  }
}

function draw() {
  background(0);
  for (let i = 0; i < bubble.length; i++) {
    bubble[i].show();
    bubble[i].move();
  }
}

function mousePressed() {
  for (let i = 0; i < bubble.length; i++) {
    bubble[i].mouseClicked();
  }
}

class Bubble {
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.r = 30;
    this.col = (200);
    this.on = false;
  }

  show() {
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, this.r, this.r);
  }

  move() {
    if (this.on) {
      this.x = this.x + random(-1, 1);
      this.y = this.y + random(-1, 1);
      this.col = color(200, 100, 50, 200);
    }else{
      this.col = (200);
    }
    
  }

  mouseClicked() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 15) {
      this.on = !this.on;
    }
  }
}let balls = [];

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < 10; i++) {
    balls[i] = new Ball(random(width), random(height), 80);
  }
}


function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++) {
    balls[i].show();
    balls[i].move();
    for (let j = 0; j < balls.length; j++) {
      if (j != i && balls[j].intersects_1(balls[i])) {
        balls[j].change_1();
        balls[i].change_1();
      }
        if (j != i && balls[j].intersects_2(balls[i])) {
        balls[j].change_2();
        balls[i].change_2();
      }
    }
  }
}



class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.col = (255,200);
  }
    
  show() {
    fill(this.col);
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);
  }

  move() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }

  intersects_1(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    if (50<d&&d <= 80) {
      return true;
    } else {
      return false;
    }
  }

   intersects_2(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    if (d <= 50) {
      return true;
    } else {
      return false;
    }
  }
    
  change_1() {
    this.r = 50;
    this.col = color(131,194,213,200);
    
  }
    
  change_2(){
      this.r=20;
    this.col = color(216,180,229,200);
  }
}let lines = [];
let line1;

function setup() {
  createCanvas(400, 400);
  line1= new Line1();
  
  for (let i = 0; i < 1000; i++)
    lines[i] = new Line();
}


function draw() {
  background(0);
  
  line1.show();
  line1.move();
  
  
  for (let i = 0; i < lines.length; i++) {
    lines[i].show();
    lines[i].move();
  }
}


class Line1 {
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.r = random(100, 200);
    this.g = random(100, 200);
    this.a = random(100, 200);
    this.speed = 0;
    this.gravity = 0.1;
  }

  show() {
    strokeWeight(5);
    stroke(this.r, this.g, 200, this.a);
    line(this.x, this.y, this.x, this.y + 10);
  }

  move() {
    this.y = this.y + this.speed;
    this.speed = this.speed + this.gravity;

    if (this.y > height) {
      this.speed = this.speed * -0.95;
      this.y = height;
    }
  }
}



class Line {
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.r = random(100, 200);
    this.g = random(100, 200);
    this.a = random(100, 200);
    this.speed = 0;
    this.gravity = 0.1;
  }

  show() {
    strokeWeight(2);
    stroke(this.r, this.g, 200, this.a);
    line(this.x, this.y, this.x, this.y + 10);
  }

  move() {
    this.y = this.y + this.speed;
    this.speed = this.speed + this.gravity;

    if (this.y > height) {
      this.speed = this.speed * -0.95;
      this.y = height;
    }
  }
}var star = [];//star array
var img;//image of the spaceship
var offset=8;//offset of the Y position of each shot



//loadimage
function preload() {
img = loadImage("spaceship1.png");
}


function setup() {
  createCanvas(800, 600)
    
  for (var i = 0; i < 800; i++) {
    //make a star array, and the array is a star function.
    star[i] = new Star();
  }
}


function draw() {
  //background change
  var blue = map(mouseY, 0, height, 54, 14);
  background(26, 28, blue);

  //call the star show function
  push();
  translate(width / 2, height / 2);
  for (var i = 0; i < star.length; i++) {
    star[i].show();
  }
  pop();


  //spaceship
  spaceship();

  //text
  intext();

  //openfire
  openfire();

}






function intext() {
  fill(255, 100)
  noStroke();
  textSize(32);
  text("Press The Mouse To Open Fire", 200, 500);
}



function spaceship() {
  image(img, mouseX - 50, mouseY - 50);
}



function shot(x, y) {
  this.l = map(mouseY - 300, 0, 300, 5, 30);//the length of each shot
  stroke(255);
  strokeWeight(2);

  if (offset < 30) {
    offset = offset + 1;
  } else {
    offset = 8;
  }
    line(x, y - offset, x, y - this.l - offset);
}


function openfire() {
  this.a = map(mouseY - 300, 0, 300, 10, 50); //distance between the two shots

  //call the shot funtion
  if (mouseIsPressed == true) {
    if (mouseY <= width / 2 - 100) {
      this.b = -60;
    } else {
      this.b = 10;
    }
    shot(mouseX, mouseY - this.b);
    shot(mouseX, mouseY - this.b - this.a);
  }
}



function Star() {
  //make main variables
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);

  //this funtion draw the stars and make them move
  this.show = function() {
    //make the speed change with the mouseX
    this.speed = map(mouseY, 0, height, 30, 5);
    this.z = this.z - this.speed;

    //when stars come to the front, draw more stars.
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
    }

    //draw the stars & add its move
    fill(255);
    noStroke();
    this.sx = map(this.x / this.z, 0, 1, 0, width);
    this.sy = map(this.y / this.z, 0, 1, 0, height);
    this.r = map(this.z, 0, width, 8, 0);
    ellipse(this.sx, this.sy, this.r, this.r);
  }
}var star = [];
var z;
var img;

//loadimage
function preload() {
  img = loadImage("spaceship1.png");
}


function setup() {
  createCanvas(800, 600)
  for (var i = 0; i < 800; i++) {
    //make a star array, and the array is a star function.
    star[i] = new Star();
  }
}


function draw() {
  background(0);

  push();
  translate(width / 2, height / 2);

  //loop the star show function
  for (var i = 0; i < star.length; i++) {
    star[i].show();
  }
  pop();


  //image
  image(img, mouseX - 50, mouseY - 50);

  shot();

}


function shot() {
line(100,100,200,200);
/*if (keyIsPressed == true) {
  fill(255);
  stroke(10);
  line(100,100,200,200);
  //line (mouseX-50,mouseY,mouseX-50,mouseY +50);
  
}*/



}


//the whole star funtion
function Star() {
  //make main variables
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);

  //this funtion draw the stars and make them move
  this.show = function() {
    //make the speed change with the mouseX
    this.speed = map(mouseY, 0, height, 30, 5);
    this.z = this.z - this.speed;

    //when stars come to the front, draw more stars.
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
    }

    //draw the stars & add its move
    fill(255);
    noStroke();
    this.sx = map(this.x / this.z, 0, 1, 0, width);
    this.sy = map(this.y / this.z, 0, 1, 0, height);
    this.r = map(this.z, 0, width, 8, 0);
    ellipse(this.sx, this.sy, this.r, this.r);
  }
}
//Question: How to fix the face just shaking at the same position?
//constrain, maxminimize


var x = 100;
var y = 300;
var d = 30;

var dragging = false;
var rollover = false;

var sliderStart = 100;
var sliderEnd = 300;

var offsetX = 0;

var face = {
  x: 200,
  y: 150,
  d: 100,
  r: 96,
  g: 107,
  b: 89,
  w: 5,
}

var r = 0.5;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  
  
  
  background(144, 213, 210);
  
  
//text
  fill(face.r, face.g, face.b);
  textSize(20);
  text("ME", 190, 70);
  

  noStroke();
  textSize(15);
  text("START", 80, 340);
  text("DEADLINE", 250, 340);
  
  

  if (dragging) {
    x = mouseX + offsetX;
  }
  x = constrain(x, sliderStart, sliderEnd);


  stroke(255);
  line(sliderStart, y, sliderEnd, y);

  noStroke();
  if (dragging) {
    fill(random(50, 200), random(50, 200), 200);
  } else {
    fill(255);
  }
  ellipse(x, y, d, d);

  //face
  noFill();



  /*if (dragging) {
    face.r=247;
    face.g=144;
    face.b=135;}
    */

  face.r = map(x, sliderStart, sliderEnd - d, 96, 216);
  face.g = map(x, sliderStart, sliderEnd - d, 107, 55);
  face.b = map(x, sliderStart, sliderEnd - d, 89, 97);
  face.w = map(x, sliderStart, sliderEnd - d, 5, 20);

  stroke(face.r, face.g, face.b);
  strokeWeight(5);

  ellipse(face.x, face.y, face.d, face.d);
  line(face.x - 20, face.y - 20, face.x - 20, face.y);
  line(face.x + 20, face.y - 20, face.x + 20, face.y);
  strokeWeight(2);
  ellipse(face.x, face.y + 25, 15, face.w);

  r = map(x, sliderStart, sliderEnd - d, 0.5, 2);

  face.x =  constraface.x + random(-r, r);
  face.y = face.y + random(-r, r);

}

function mousePressed() {
  if (dist(mouseX, mouseY, x, y) < d / 2) {
    dragging = true;
    offsetX = x - mouseX;
  }
}

function mouseReleased() {
  dragging = false;
  face.x = 200;
  face.y = 150;
}var buttonIsPushed = false;

function setup() {
  createCanvas(400, 400);
  background(0);
  ellipseMode(CENTER);
  rectMode(CENTER);
}


function draw() {
  translate(10, 10);

  if (buttonIsPushed) {
    printlines();
  } else {
    backgrouddraw();
  }

  drawbutton();
}



function mousePressed() {
  if ((mouseX > a) && (mouseX < a + d) && (mouseY > b) && (mouseY < b + d)) {
    buttonIsPushed = !buttonIsPushed;
  }
}


function printlines() {
  var x = 0;
  var y = 0;
  stroke(255);
  noFill();
  strokeWeight(1);

  if (random(1) > 0.5) {
    line(x, y + random(0, 20), x + random(0, 20), y);
  } else {
    line(x + random(0, 20), y, x, y + random(0, 20));
  }

  x += 25;
  if (x - 10 > width) {
    x = 0;
    y += 25;
  }

  if (y - 10 > height) {
    background(0);
    backgrouddraw();
    x = 0;
    y = 0;
  }
}



function backgrouddraw() {
  noStroke();
  for (var o = 10; o <= 380; o = o + 20) {
    for (var p = 10; p <= 380; p = p + 20) {
      fill(o, p, 200);
      rect(o, p, 5, 5);
    }
  }
}


function drawbutton() {
  var a = 200;
  var b = 200;
  var d = 30;
  noStroke();
  fill(100, 100, 100);
  rect(a, b, d, d);
}var s = 5;

function setup() {
  createCanvas(400, 400);
  ellipseMode(CENTER);
}

function draw() {
  background(0);
  drawellipse();
}

function drawellipse() {
  for (var x = 10; x <= 400; x = x + 20) {
    for (var y = 10; y <= 400; y = y + 20) {
      strokeWeight(s);
      stroke(255)
      if (dist(x, y, mouseX, mouseY) < 10) {
        fill(0);
      } else {
        fill(200, x, y);}
      ellipse(x, y, 20, 20);
    }
  }
}


function mouseDragged() {
  if (s >= 5 && s < 10) {
    s = s + 1;
  } else if (s == 10) {
    s = 5;
  }
}let o1;
let o2;
let r = 30;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(255);
  smooth();

  for (o1 = 50; o1 <= 400 && o1 >= 50; o1 += 50) {
    for (o2 = 50; o2 <= 400 && o2 >= 50; o2 += 50) {
      push();
      translate(o1, o2);
      for (var a = 0; a <= 360; a += r) {
        rotate(a)
        fill(0);
        line(x, y, 20, 20);

      }
      pop();
    }
  }
}

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);

  for(var i=0;i<10;i++){
    fill(10,10,10);
    var distance = dist(i*50,50,mouseX,mouseY);
    if (distance <10){fill(250,30,30);}
    else{fill(10,60,60);}
    ellipse(i*50,50,20,20);
    

  }
  
}var img1;
var img2;

var x1=265;
var y1=233;

var x2=345;
var y2=233;

var x3=65;
var y3=60;
var x4;
var y4=100;
var x5;
var y5=140;
var x6;
var y6=180;
var x7;
var y7=220;

var i;

var d;
var t;

var h=0;


function setup() { 
  createCanvas(600, 400);
  img1 = loadImage("background1.jpg");
  img2 = loadImage("fish1.png");

} 


function draw() { 
  print("X="+ mouseX + " " + "Y=" + mouseY)
  
  image(img1, 0, 0);
  
  //draw eyes
  noStroke();
  var col=map(mouseX,0,600,40,220);
  fill(20,col,col);
  ellipse(x1,y1,15,15);
  ellipse(x2,y2,15,15);
  
  //make eyes move
  if (mouseX >= 300){
    x1 =280;
    x2 =364;
  }
  
  if (mouseX < 300){
    x1 =245;
    x2=322;
  }
  
   if (mouseY >= 200){
    y1 =235;
    y2 =235;
  }
  
    if (mouseY < 200){
    y1 =228;
    y2 =228;
  }
  
  //draw the snows
  
  /*failure try
  while (x3<550){
  d= 2;
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x3,y3,d,d);
  x3=x3+10;}
   
   if(y3 <= 330){
    y3=y3+1;
  }
   else{y3=60;}
   */
  
  //
  
  x3=random(65,530);
  d= random(5,25);
  t= random(20,220);
  fill(255,255,255,t);
  ellipse(x3,y3,d,d);
   
   if(y3 <= 330){
    y3=y3+1;
  }
   else{y3=100;}
  
  x4=random(65,530);
  d= random(5,25);
  t= random(20,220);
  fill(255,255,255,t);
  ellipse(x4,y4,d,d);
   
   if(y4 <= 330){
    y4=y4+1;
  }
   else{y4=100;}
  
  //
  
   x5=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x5,y5,d,d);
   
   if(y5 <= 330){
    y5=y5+1;
  }
   else{y5=140;}
  
  //
  
    x6=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x6,y6,d,d);
   
   if(y6 <= 330){
    y6=y6+1;
  }
   else{y6=180;}
  
  //
  
      x7=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x7,y7,d,d);
   
   if(y7 <= 330){
    y7=y7+1;
  }
   else{y7=220;}
   
  
  //the ground snow 
  fill(255);
  h  = h-0.05;
    if(h <= -50){
    h = -50;}
  rect(55,350,495,h);
  
  //fish
 image(img2, mouseX, mouseY);

}



  var img1;
var img2;

var x1=265;
var y1=233;

var x2=345;
var y2=233;

var x3;
var y3=60;
var x4;
var y4=100;
var x5;
var y5=140;
var x6;
var y6=180;
var x7;
var y7=220;

var d;
var t;

var h=0;


function setup() { 
  createCanvas(600, 400);
  img1 = loadImage("background1.jpg");
  img2 = loadImage("fish1.png");

} 


function draw() { 
  print("X="+ mouseX + " " + "Y=" + mouseY)
  
  image(img1, 0, 0);
  
  //draw eyes
  noStroke();
  fill(104,77,35);
  ellipse(x1,y1,15,15);
  ellipse(x2,y2,15,15);
  
  //make eyes move
  if (mouseX >= 300){
    x1 =280;
    x2 =364;
  }
  
  if (mouseX < 300){
    x1 =245;
    x2=322;
  }
  
   if (mouseY >= 200){
    y1 =235;
    y2 =235;
  }
  
    if (mouseY < 200){
    y1 =228;
    y2 =228;
  }
  
  //draw the snows
  
  x3=random(65,530);
  d= map(mouseX,0,600,5,30）；
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x3,y3,d,d);
   
   if(y3 <= 330){
    y3=y3+1;
  }
   else{y3=60;}
  
  //
  
  x4=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x4,y4,d,d);
   
   if(y4 <= 330){
    y4=y4+1;
  }
   else{y4=100;}
  
  //
  
   x5=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x5,y5,d,d);
   
   if(y5 <= 330){
    y5=y5+1;
  }
   else{y5=140;}
  
  //
  
    x6=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x6,y6,d,d);
   
   if(y6 <= 330){
    y6=y6+1;
  }
   else{y6=180;}
  
  //
  
      x7=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x7,y7,d,d);
   
   if(y7 <= 330){
    y7=y7+1;
  }
   else{y7=220;}
  
  //the ground snow 
  fill(255);
  h  = h-0.05;
    if(h <= -50){
    h = -50;}
  rect(55,350,495,h);
  
  //fish
 image(img2, mouseX, mouseY);

}



  
  
function setup() { 
  createCanvas(600, 400);
  ellipseMode(CENTER);
  rectMode(CENTER); 
} 

function draw() { 
  background(249,209,111);
  ellipseMode(CENTER);
  noStroke();
  
  fill(255,246,203);
  rect(300,70,600,300)
  
    //shadow
  fill(100,100,100,100);
  rect(300,360,500,10,0,0,10,10);
  
  //laptop
  fill(200);
  quad(150, 250, 450, 250, 550, 350, 50, 350);
  fill(70);
  rect(300,150,300,200,10,10,0,0);
  fill(180);
  rect(300,355,500,10,0,0,10,10);
  
  fill(240);
  rect(300,155,270,160,5,5,5,5);
  fill(50);
  ellipse(300,64,10,10);
  
  fill(160);
  quad(160, 260, 440, 260, 480, 300, 120, 300);
  fill(180);
  quad(160, 265, 440, 265, 475, 298, 125, 298);
  
  fill(160);
  quad(230, 310, 370, 310, 390, 340, 210, 340);
  fill(180);
  quad(230, 313, 370, 313, 387, 340, 213, 340);
  
  fill(220);
  rect(300,350,60,8);
  ellipse(270,350,8,8);
  ellipse(330,350,8,8);
  

  
  
  //Here the laptop is finished!
  
  //Begin to draw the character.
  
      
  //light
  fill(255,255,255,100);
  quad(330,320,270,320,150,50,450,50);
  

  
  //hair
  fill(87,60,15); 
  arc(300,130,120,120,PI,TWO_PI);
  rect(300,180,120,100);
  
  //face skin
  fill(255,238,222);
  arc(300,150,80,80,0,PI);
  rect(300,145,80,30);
  triangle(275, 130, 290, 130, 285, 110);
  
  //ears
  ellipse(340,152,20,20);
  ellipse(260,152,20,20);
  
  
  //tshirt
  fill(168,40,160);
  rect(300,230,60,60);
  quad(330,200,350,220,340,230,330,225);
  quad(270,200,250,220,260,230,270,225);
  
  //arms and hands
  fill(255,238,222);
  quad(347,220,380,250,375,255,341,225);
  triangle(380,250,390,260,375,255);
  triangle(385,253,375,260,375,255);
  quad(253,220,220,250,225,255,259,225);
  triangle(220,250,210,260,225,255);
  triangle(215,253,225,260,225,255);
  
  //neck
  rect(300,190,20,20);
  arc(300,200,40,40,0,PI);
  
  //pants
  fill(130);
  quad(330,260,325,275,275,275,270,260);
  quad(325,275,315,310,305,310,302,275);
  quad(275,275,285,310,295,310,298,275);
  
  //shoes
  fill(255); 
  quad(315,310,330,320,305,319,305,310);
  quad(285,310,270,320,295,319,295,310);
  
  //eyes
  fill(87,60,15);
  ellipse(280,150,14,20);
  ellipse(320,150,14,20);
  ellipseMode(CORNER);
  fill(255);
  ellipse(272,140,8,10);
  ellipse(313,140,8,10);
  
  noFill();
  stroke(0);
  curve(280,200,285,145,270,148,285,200);
  curve(325,200,330,149,314,145,320,200);
  curve(300,120,280,140,270,135,270,130);
  curve(300,120,280,140,268,140,270,130);
  curve(300,130,320,140,330,135,330,130);
  curve(300,130,320,140,332,140,330,130);
  
  //nose
  line(300,158,305,162);
  line(305,162,300,165);
  
  //mouse
  curve(285,130,290,175,310,175,315,130);
  
  //cheek
  line(284,163,282,166);
  line(280,163,278,166);
  line(276,163,274,166);
  
  line(316,163,318,166);
  line(320,163,322,166);
  line(324,163,326,166);
  
  //Logo
  textSize(26);
  fill(255);
  text("ITP", 285, 253);
  

  //The character part has be done! Yeah! :D
  
  //For the next step, I'm thinking let the character disappear
  //when I use mouse to click the "laptop".
  
}