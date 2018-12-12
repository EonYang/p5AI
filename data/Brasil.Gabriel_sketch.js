  var brick = {
  x: 0,
  y: 20,
  sizeY: 10,
  sizeX: 30 
}
  var array = []

function setup() {
  createCanvas(400, 400);
  

}

function draw() {
  background(220);
  
  
  drawGrid();
}

function drawPlatform(){
 rect(brick.x + mouseX, brick.y, brick.sizeX, brick.sizeY); 
  
}

function drawGrid(){
  for (i=mouseX/100; i<10; i++){
    fill(203*i, 100*i, 50*i);
    rect(brick.x+(brick.sizeX*i), brick.y, brick.sizeX, brick.sizeY);
 for (j=mouseY/50; j<10; j++){
    fill(203*j, 100*j, 50*j);
   rect(brick.x, brick.y+(brick.sizeY*j*10), brick.sizeX, brick.sizeY); 
  
  }
  
  }

    
  
}

//the bouncing ball game --> Breakout!


var ball = {
  x : 200,
  y: 330 ,
  //in radius
  size: 10 ,
  xspeed: 4 ,
  yspeed: 3
  
}

var platform = {
 x:0,
  y: 340,
  xsize: 40,
  ysize: 10,
  control : false,
  visible : true
  
}


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  

  //create ellipse ball position relative to screen size (NOT WORKING)
  //ellipse ( ball.x + (width/2), ball.y + (height/2) , ball.diameter, ball.diamenter);
  
drawPlatform();
drawBall();
bounceBall();

  

  
  
 //BOUNCE
if ((ball.x < (platform.x +platform.xsize)  && 
     ball.y > platform.y) && 
     ball.x ) {
    ball.xspeed = ball.xspeed * -1;
   ball.yspeed = ball.yspeed * -1;
    
    }

print('The value of mouseX is ' + mouseX);
print('The value of platform y is ' + platform.y);
  print('The value of ball X ' + ball.x);
  print('The value of ball y ' + ball.y);

}

function drawBall(){
      //create ellipse ball relative to global value

	ellipseMode(RADIUS);
  ellipse ( ball.x , ball.y, ball.size, ball.size);
  
}

function drawPlatform(){
    //toggle platform on and off
  if (platform.visible != false){
  //create rect platform mode center and x position relative to mouseX
 	rectMode(CENTER); 
  rect(platform.x, platform.y, platform.xsize, platform.ysize);
  print('The value of platform.x is ' + platform.x);
       
}
  
  
  function bounceBall(){
    //bounce wall width
  if (ball.x >= width || ball.x <= 0){
    ball.xspeed = ball.xspeed * -1;
} 
  //bounce wall height
  if (ball.y >= height || ball.y <=0){
      ball.yspeed = ball.yspeed * -1;
      }
  
      
  //move ball
  ball.x = ball.x + ball.xspeed;
  ball.y = ball.y + ball.yspeed; 
  }
}
var circle= {
 	x: 0,
  y: 100,
  diameter: 50  
};

var col = 0;
 var speed = +5;

function setup() {
  createCanvas(400, 400);
    background(col);
  
  
}

function draw() {

  
  col = map( mouseX, 0, 600, 0, 255)*1.2;
  
  ellipse(circle.x, mouseY, circle.diameter, circle.diameter );

 
  fill(random(0,255)/2, random(0,255)/2,random(0,255)/2, 255);
  var Rectangle01 = new Rectangle(random(10,100), mouseY,(mouseX/4),(mouseY/100));
  //Rectangle;
  
   circle.x = circle.x +speed;
  if(circle.x > width || circle.x<0){
   speed = speed*-1; 
  } 
  
  rect(building.x, building.y, building.height, building.width);


  
  mousePress();

}
var building = {
  x: 300,
  y: 300,
  height: 40,
  width: 100,
};

function Rectangle(x, y, w, h){
 	this.x = "x";
  this.y = "y";
  this.w = "w";
  this.h = "h";
  this.rect = rect(x,y,w,h);
  
  }

function mousePress(){
  
  if(mouseX <=300 && mouseY <=300){
 if(mouseIsPressed){
  background(0,244,120); 
 		} else {
     background(0); 
    }
	}
}

let flower; 

function preload(){
 flower = loadJSON("flower.json"); 
	//fighter = loadJSON("streetFighter.json");
}

function setup() {
  createCanvas(400,400);


}

function draw() {
  background(0);
  fill(flower[0].r, flower[0].g, flower[0].b);
  text(flower[0].name, 10, 50);
  fill(0,0,0);
  text(fighter[0], 10, 50);
}let video; //could call whaterver I want
// let button;
let snapshots = [];
let img;
let i;
let clear;

function setup() {
  createCanvas(400, 400);
  background(51);
  video = createCapture(VIDEO);
  video.size(320, 280);
	// button = createButton('capture');
	// button.mousePressed(takecapture);
  button2 = createButton('last');
  button2.mousePressed(lastCapture);
	clear = clearArray();

}


function takeCapture() {
  //image(video, 0,0);
  // snapshots.push(video); //'push'is a function that add to array. But the variable video is not an image! So this dont work
  snapshots.push(video.get()); // this one works ho

  for (i = 0; i < snapshots.length; i++) {
   // tint(255, 50);
    image(snapshots[i], 0,0);



  }
}

function lastCapture() {
  
print(snapshots[0]);
  tint(random(50,255), 0, random(25,255));
   image(snapshots[i-2], 0, 90, 320, 50, 0, 90, 320,50);

}

function draw() {
  //tint(255,mouseX,mouseY);

  
    setTimeout(takeCapture,1000);
    setTimeout(lastCapture,2000);


  
  print([i]);

  //image(video, 0,0); //normal image function, but calls the video

}

function clearArray(){
  
  if (i>30){
  snapshots.splice(0,snapshots.length)
  }
}let video; //could call whaterver I want
let button;
let snapshots = [];
let img;
let i;

function setup() {
  createCanvas(400, 400);
  background(51);
  video = createCapture(VIDEO);
  video.size(320, 240);
	button = createButton('capture');
  button.mousePressed(takecapture);
  button2 = createButton('last');
  button2.mousePressed(lastcapture);


}


function takecapture() {
  //image(video, 0,0);
  // snapshots.push(video); //'push'is a function that add to array. But the variable video is not an image! So this dont work
  snapshots.push(video.get()); // this one worksho

  for (i = 0; i < snapshots.length; i++) {
   // tint(255, 50);
    image(snapshots[i], 0,0);



  }
}

function lastcapture() {
  
print(snapshots[0]);
  tint(random(50,255), 0, random(25,255));
   image(snapshots[i-2], 0, 90, 320, 50, 0, 90, 320,50);

}

function draw() {
  //tint(255,mouseX,mouseY);
 
  for (w =0; w < (snapshots.length); w++){
    setTimeout(lastcapture,2000);
  setTimeout(takecapture,1000);
  }
  

  //image(video, 0,0); //normal image function, but calls the video


}let video; //could call whaterver I want
let button;
let snapshots = [];
let img;
let i;

function setup() {
  createCanvas(400, 400);
  background(51);
  video = createCapture(VIDEO);
  video.size(320, 240);
/button = createButton('capture');
  button.mousePressed(takecapture);
  button2 = createButton('last');
  button2.mousePressed(lastcapture);


}


function takecapture() {
  //image(video, 0,0);
  // snapshots.push(video); //'push'is a function that add to array. But the variable video is not an image! So this dont work
  snapshots.push(video.get()); // this one worksho

  for (i = 0; i < snapshots.length; i++) {
   // tint(255, 50);
    image(snapshots[i], 0,0);



  }
}

function lastcapture() {
  
print(snapshots[0]);
  tint(random(50,255), 0, random(50,255));
   image(snapshots[i-2], 0, 90, 320, 50, 0, 90, 320,50);

}

function draw() {
  //tint(255,mouseX,mouseY);
  // image(video, 0,0); //normal image function, but calls the video


}let video; //could call whaterver I want
let button;
let snapshots = [];
let img;
let i;

function setup() {
  createCanvas(400, 400);
  background(51);
  video = createCapture(VIDEO);
  video.size(320, 240);
/button = createButton('capture');
  button.mousePressed(takecapture);
  button2 = createButton('last');
  button2.mousePressed(lastcapture);


}


function takecapture() {
  //image(video, 0,0);
  // snapshots.push(video); //'push'is a function that add to array. But the variable video is not an image! So this dont work
  snapshots.push(video.get()); // this one worksho

  for (i = 0; i < snapshots.length; i++) {
   // tint(255, 50);
    image(snapshots[i], 0,0);



  }
}

function lastcapture() {
  
print(snapshots[0]);
  tint(random(50,255), 0, random(50,255));
   image(snapshots[i-2], 0, 90, 320, 50, 0, 90, 320,50);

}

function draw() {
  //tint(255,mouseX,mouseY);
  // image(video, 0,0); //normal image function, but calls the video


}let video; //could call whaterver I want
let button;
let snapshots = [];
let img;
let i;

function setup() {
  createCanvas(400, 400);
  background(51);
  video = createCapture(VIDEO);
  video.size(320, 240);
  button = createButton('capture');
  button.mousePressed(takecapture);
  button2 = createButton('last');
  button2.mousePressed(lastcapture);


}


function takecapture() {
  //image(video, 0,0);
  // snapshots.push(video); //'push'is a function that add to array. But the variable video is not an image! So this dont work
  snapshots.push(video.get()); // this one worksho

  for (i = 0; i < snapshots.length; i++) {
   // tint(255, 50);
    image(snapshots[i], 0,0);



  }
}

function lastcapture() {
  
print(snapshots[0]);
  	tint(random(50,255),0,random(50,255));
   image(snapshots[i-2], 0, 90, 320, 50, 0, 90, 320,50);

}

function draw() {
  //tint(255,mouseX,mouseY);
  // image(video, 0,0); //normal image function, but calls the video


}let video; //could call whaterver I want
let button;
let snapshots = [];
let img;
let i;

function setup() {
  createCanvas(400, 400);
  background(51);
  video = createCapture(VIDEO);
  video.size(320, 240);
  button = createButton('capture');
  button.mousePressed(takecapture);
  button2 = createButton('last');
  button2.mousePressed(lastcapture);


}


function takecapture() {
  //image(video, 0,0);
  // snapshots.push(video); //'push'is a function that add to array. But the variable video is not an image! So this dont work
  snapshots.push(video.get()); // this one worksho

  for (i = 0; i < snapshots.length; i++) {
   // tint(255, 50);
    image(snapshots[i], 0,0);



  }
}

function lastcapture() {
print(snapshots[0]);
   image(snapshots[i-2], 0, 90, 320, 50, 0, 90, 320,50);

}

function draw() {
  //tint(255,mouseX,mouseY);
  // image(video, 0,0); //normal image function, but calls the video


}let video; //could call whaterver I want
let button;
let snapshots = [] ;
let img=[];

function setup() { 
  createCanvas(400, 400);
  background(51);
  video = createCapture(VIDEO);
  video.size(320, 240);
  button = createButton('capture');
  button.mousePressed(takecapture); 
} 


function takecapture(){
  //image(video, 0,0);
 // snapshots.push(video); //'push'is a function that add to array. But the variable video is not an image! So this dont work
  snapshots.push(video.get()); // this one worksho
}

function draw() { 
  //tint(255,mouseX,mouseY);
  // image(video, 0,0); //normal image function, but calls the video
  for (var i = 0; i < snapshots.length; i++){
  tint(255,50);
    img[i] = createImg(snapshots[i], 0,0);
    img[i].position(0,0);
  }
}
let video; //could call whaterver I want
let button;
let snapshots = [];
let img;
let i;

function setup() {
  createCanvas(400, 400);
  background(51);
  video = createCapture(VIDEO);
  video.size(320, 240);
  button = createButton('capture');
  button.mousePressed(takecapture);
  button2 = createButton('last');
  button2.mousePressed(lastcapture);


}


function takecapture() {
  //image(video, 0,0);
  // snapshots.push(video); //'push'is a function that add to array. But the variable video is not an image! So this dont work
  snapshots.push(video.get()); // this one worksho

  for (i = 0; i < snapshots.length; i++) {
   // tint(255, 50);
    image(snapshots[i], 0,0);



  }
}

function lastcapture() {
print(snapshots[0]);
   image(snapshots[i-3], 0, 150, 320, 80, 0, 150, 50, 50);

}

function draw() {
  //tint(255,mouseX,mouseY);
  // image(video, 0,0); //normal image function, but calls the video


}var video; //could call whaterver I want
var button;

function setup() { 
  createCanvas(400, 400);
  background(51);
  video = createCapture(VIDEO);
  video.size(320, 240);
  button = createButton('capture');
  button.mousePressed(takecapture); 
} 


function takecapture(){
  image(video, 0,0);
}

function draw() { 
  //tint(255,mouseX,mouseY);
  // image(video, 0,0); //normal image function, but calls the video
  
}
var video; //could call whaterver I want

function setup() { 
  createCanvas(400, 400);
  background(220);
  video = createCapture(VIDEO);
  video.size(320, 240);
} 

function draw() { 
  tint(255,mouseX,mouseY);
  image(video, mouseY,0); //normal image function, but calls the video
  
}var video; //could call whaterver I want

function setup() { 
  createCanvas(400, 400);
  background(220);
  video = createCapture(VIDEO);
  video.size(320, 240);
} 

function draw() { 
  tint(255,mouseX,mouseY);
  image(video, mouseY,0); //normal image function, but calls the video
  
}
//let w=0;
let  list=[100,200,300];
let listY=[2,50,80,50];
let dataA=0;
let dataB=0;

// function coordinates(){
//   for (let z=0; z<100; z++){
//     w=w+z;
//}
//}

function setup() {
  

	frameRate(1);
  myGraph = new graph(20,20);
  createCanvas(400, 400);
  
} 


  


function draw() { 
  
  background(220);
  myGraph.show()
  
  //loop trough the array used by "test" to change the ellpse Y size
  if (dataA<list.length){
  dataA = dataA+1
  }else{
    dataA=0;
  }
  
   if (dataB<listY.length){
  dataB = dataB+1
  }else{
    dataB=0;
  }
  
  print(dataA);
  
  test((list[dataA]),(listY[dataB]));
  
  
  
  // for(let j =0; j<4; j++){
   //   test(list[j]);
   // print(j);
   //  data = j;
  }
  
  
  
function test(myData,otherData){
 //the ellipse coordinate is controled by the list array
  for (let i=0; i<1; i++){
     x = myData;
    y=otherData;
    fill(x*1,x*3,x*10);
    //data = data +20;
    ellipse(x,y,20,20) 
  }
}

//let w=0;
let  list=[100,200,300];
let listY=[2,50,80,50];
let dataA=0;
let dataB=0;

// function coordinates(){
//   for (let z=0; z<100; z++){
//     w=w+z;
//}
//}

function setup() {
  

	frameRate(1);
  myGraph = new graph(20,20);
  createCanvas(400, 400);
  
} 


  


function draw() { 
  
  background(220);
  myGraph.show()
  
  //loop trough the array used by "test" to change the ellpse Y size
  if (dataA<list.length){
  dataA = dataA+1
  }else{
    dataA=0;
  }
  
   if (dataB<listY.length){
  dataB = dataB+1
  }else{
    dataB=0;
  }
  
  print(dataA);
  
  test((list[dataA]),(listY[dataB]));
  
  
  
  // for(let j =0; j<4; j++){
   //   test(list[j]);
   // print(j);
   //  data = j;
  }
  
  
  
function test(myData,otherData){
 //the ellipse coordinate is controled by the list array
  for (let i=0; i<1; i++){
     x = myData;
    y=otherData;
    fill(x*1,x*3,x*10);
    //data = data +20;
    ellipse(x,y,20,20) 
  }
}

let  list=[2,4,8,16];
function setup() {
  

	data = 10;
  myGraph = new graph(20,data);
  createCanvas(400, 400);
  
} 


  


function draw() { 
  background(220);
  
  for (let j=0; j > list.length; j++){
    let w = j+10;
   
  }
  
   test([2]);
 
	myGraph.show();

}

function test(myData){
  
  for (let i=0; i< 17; i++){
     y = myData;
    
    //data = data +20;
    ellipse(20+i*20,300,20+i,y+i) 
  }
}


function setup() {
  
  let data = 0;
	
  myGraph = new graph(20,data);
  createCanvas(400, 400);
  
} 

function mousePressed(){
  data = data + 10;
  
}

function draw() { 
  background(220);
  write("data
  
  myGraph.show();

}

let size =0;
function setup() {
  
  myGraph = new graph(20,20);
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  myGraph.show();
  
 
  


}let serial;
let portName = 'COM3';
let data;

function setup() {
  createCanvas(400, 400);

  //connect to the server generated by the P5 serial port program
  
  
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  
  Capture= createCapture(VIDEO);
  Capture.size(320,240);
  Capture.hide();
}



function draw() {
  
  image(Capture,0,0);
  
  background(234);
  fill(255);
  //text("sensor value: " + data, 30, 30);
  
  noStroke();
  
  fill(data,data/2,data/5 +10)
  ellipse(width/2, height/2,data,data);
  
  fill(255,0,0);
  //rect (data/2,100,40,10);
  
  beginShape(line);
vertex(width/2, width/2);
vertex(2*data+85, 20);
vertex(85, 75);
vertex(30, data +75);
endShape();
  
}

function printList(portList) {
  //portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    //Display the list on the console:
    console.log(i + " " + portList[i]);
  }
}

function serverConnected() {
  println('connected to server.');
}
 
function portOpen() {
  println('the serial port opened.')
}
 
function serialEvent() {
 data = Number(serial.read());
}
 
function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  println('The serial port closed.');
}let serial;
let portName = 'COM3';
let data;

function setup() {
  createCanvas(400, 400);

  //connect to the server generated by the P5 serial port program
  
  
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
  
  
  background(234);
  fill(255);
  //text("sensor value: " + data, 30, 30);
  
  noStroke();
  
  fill(data,data/2,data/5 +10)
  ellipse(width/2, height/2,data,data);
  
  fill(255,0,0);
  //rect (data/2,100,40,10);
  
  beginShape(line);
vertex(width/2, width/2);
vertex(2*data+85, 20);
vertex(85, 75);
vertex(30, data +75);
endShape();
  
}

function printList(portList) {
  //portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    //Display the list on the console:
    console.log(i + " " + portList[i]);
  }
}

function serverConnected() {
  println('connected to server.');
}
 
function portOpen() {
  println('the serial port opened.')
}
 
function serialEvent() {
 data = Number(serial.read());
}
 
function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  println('The serial port closed.');
}let serial;
let portName = 'COM3';
let data;

function setup() {
  createCanvas(400, 400);

  //connect to the server generated by the P5 serial port program
  
  
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

}

function draw() {
  background(220);
  
   background(0);
  fill(255);
  text("sensor value: " + data, 30, 30);
}

function printList(portList) {
  //portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    //Display the list on the console:
    console.log(i + " " + portList[i]);
  }
}

function serverConnected() {
  println('connected to server.');
}
 
function portOpen() {
  println('the serial port opened.')
}
 
function serialEvent() {
 data = Number(serial.read());
}
 
function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  println('The serial port closed.');
}let pokeData;

function preload(){
 data = loadJSON('pokemon.json');
}
  


function setup() { 
  createCanvas(400, 400);
  
  
} 

function draw() { 
  background(220);
  
  
  let i=frameCount%data.pokemon.length;

  
    print(data.pokemon[i].name);
    textSize(15);
    text(data.pokemon[i].name,200,200);
  textSize(random(100));
   text(data.pokemon[i].name_jp,10,300);
  
  mousePressed();
  
 // mousePressed();
   
}

	function mousePressed(){
    
   // textSize(100);
text("POKEMON",100,50);
  }let words = [red, blue, "farofa", "caxumba", "caramelo", "travesseiro" ];
let index=0;

let

words[0][2];



function setup() { 
  createCanvas(400, 400);
  colors = [color(255,0,0),color(0,255,0)];
  
} 

function draw() { 
  background(220);
  
  text(words[index],12,200);
}


function mousePressed(){
  index = index + 1;
  if (index == words.length){
    index = 0;
  }
}

let words = ["patati", "farofa", "caxumba", "caramelo", "travesseiro" ];
let index=0;


function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  text(words[index],12,200);
}


function mousePressed(){
  index = index + 1;
  if (index == words.length){
    index = 0;
  }
}

function setup() { 
  createCanvas(400, 400);
  ball = new Ball()
  ball2 =new Ball()
  ball3 =new Ball()
} 

function draw() { 
  background(220);
  
  ball.show(100,40);
	ball.move(mouseY/2);
  ball.bounce();
  
  ball2.show(200,20);
	ball2.move(mouseY/5);
  ball2.bounce();
  
  ball3.show(250,2);
	ball3.move(mouseY/10);
  ball3.bounce();
  
}

class Ball{
  
  constructor(){
    this.x=100;
    this.y=100;
    this.vector=1;
    
  }
  
  show(posY,size){
    ellipse(this.x,posY,size,size);
  }
  move(speed){
    this.x =this.x +speed*this.vector; 
  }
  bounce(){
   if ((this.x>400) || (this.x<0)){
     this.vector = this.vector*-1;
   }
  }
  
}function setup() { 
  createCanvas(400, 400);
  ball = new Ball()
} 

function draw() { 
  background(220);
  
  ball.show(40);
	ball.move(10);
  ball.bounce();
  
   ball.show(3);
	ball.move(10);
  ball.bounce();
  
}

class Ball{
  
  constructor(){
    this.x=100;
    this.y=100;
    this.vector=1;
    
  }
  
  show(size){
    ellipse(this.x,this.y,size,size);
  }
  move(speed){
    this.x =this.x +speed*this.vector; 
  }
  bounce(){
   if ((this.x>400) || (this.x<0)){
     this.vector = this.vector*-1;
   }
  }
  
}let offset=0;
let x=0;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
   BouncingBall(10, 10, 255, 10);
  BouncingBall(20, 1, 100, 100);
  BouncingBall(10, 50, 0, 200);


  }



function BouncingBall(ballPos, ballSpeed, ballColor, ballSize) {
  fill(ballColor);
 let x = 0;
   ellipse(x +offset , ballSize + ballPos, ballSize, ballSize);
  offset = offset + ballSpeed/10;
  
  if ((x<0) || (x>width)){
    x = offset *-1;

    
   
   offset = offset + ballSpeed/10;
    
 } 

}let ball = {
  x: 300,
  y: 200,
  xSpeed: 4,
  ySpeed: -3

}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  	fill (random(255), 0, random(255));
  noStroke();
  ellipse(100, 200, 24, 24);

  display();
  move();
  bounce();
  

}



function display(){
	fill (random(145), 50, random(125));
  noStroke();
  ellipse(ball.x, ball.y, 24, 24);
}

function bounce(){
  //bounce x
  if (ball.x < 0 || ball.x > width) {	
    ball.xSpeed = ball.xSpeed * -1;
 }

  //bounce y
 	 if (ball.y < 0 || ball.y > height) {
    ball.ySpeed = ball.ySpeed * -1;
  	}
  
  }

function move(){
  //move
  ball.x = ball.x + ball.xSpeed;
  ball.y = ball.y + ball.ySpeed;

}
//let offset = 0;
let startX = 0;
let move = 1;
let moveY=0;
let timeStart=0;
//let timeEnd=millis();
let timeDif=timeEnd - timeStart;

function setup() { 
  createCanvas(400, 600);
} 

function draw() { 
  background(0);
  
//text(timeEnd,20,20);
  
  for (var x = startX; x<=600;  x+= 25){
    for (var y=0; y<=25;y+=25){
    fill(random(255), 0 , random(255));
    ellipse(x ,y*moveY,25,25); 
      startX = startX +move;
    }
    
    if((startX<=0) || (startX>=length)){
       move=move *-1;
      moveY+=1;
      
       }
    
  }
  
}let offset=0;
let x=0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  BouncingBall(offset,200, 1,200, 50);


function BouncingBall(ballPosX,ballPosY, ballSpeed, ballColor, ballSize) {

  noStroke;
  fill(random(), ballColor, random());
  
  ellipse(ballPosX , ballPosY, ballSize, ballSize);
    offset = offset + ballSpeed;
  print(ballPosX +offset);
  
  if ((offset<0) || (offset>400));{
    offset =  offset * -1;
  }
  
  
  
  }
}let x = 0;//start X position
let y = 0;//start Y position
let speed = 1;//controls de speed of the ball
let bounce = 1;//bounces the ball
let slider = 0; //UI slider
let sliderControl = 0; //UI slider Y position
let sliderMax =40;
let sliderMin =350;
let pressed = false;


function setup() { 
  createCanvas(400, 400);
	
		x = width/2;
  
  
	
} 

function draw() { 
  background(220);
  
  //UI line : use to limit slider movement
  line (40,40,sliderMax, sliderMin);
  
  sliderControl = mouseY;
  //Slider
	rect (20,mouseY,40,20);
  
  fill (255);
  if (pressed){
    fill (40,20,255);
  }
  
  
  
  if (mouseX >= 20 && mouseX<=60) {
    pressed = !pressed;
  }
  
  //speed = map(mouseY,0,height,sliderMax,sliderMin);
  
	
//makes ball move a certaing amount after each "draw" loop, relative to MouseX postion.
	speed = (mouseY/100 * bounce);
	y = y + speed;
	
	//creates the ball
  ellipse (x,y ,20,20);
	
	//call "-bounce" when ball hits top or lower screen, inverting the y movement direction.
  if (y <=0 || y >= height){
		bounce = bounce *-1;
	}
	

	
}let on = false;

function setup() { 
  createCanvas(600, 400);
	
} 


function draw() { 
	
  
	//rect (250,150,80,80);
	
	if(on){
		background (40,150,40);
	} else {
		background (0);
	}
	
	//if ((mouseX >=250 && mouseX <=330) && (mouseY >=150 && mouseY <=230)){
	//	fill (150,40,70);
	//} else {
	//	fill (255);
	//}
	
}

function mousePressed() {
		on = !on;
}

let x = 0;//start X position
let y = 0;//start Y position
let speed = 1;//controls de speed of the ball
let bounce = 1;//bounces the ball
let slider = 0; //UI slider
let sliderControl = 0; //UI slider Y position
let sliderMax =40;
let sliderMin =350;





function setup() { 
  createCanvas(400, 400);
	
		x = width/2;
  
  
	
} 

function draw() { 
  background(220);
  
  //UI line : use to limit slider movement
  line (40,40,sliderMax, sliderMin);
  
  sliderControl = mouseY;
  //Slider
  slider = rect (20,sliderControl,40,20);
  
  /speed = map(mouseY,0,height,sliderMax,sliderMin);
  
	
//makes ball move a certaing amount after each "draw" loop, relative to MouseX postion.
	speed = (mouseY/10 * bounce)* -1;
	y= y + speed;
	
	//creates the ball
  ellipse (x,y ,20,20);
	
	//call "-bounce" when ball hits top or lower screen, inverting the y movement direction.
  if (y <=0 || y >= height){
		bounce = bounce *-1;
	}
	

	
}let x = 0;//start X position
let y = 0;//start Y position
let speed = 1;//controls de speed of the ball
let bounce = 1;//bounces the ball





function setup() { 
  createCanvas(400, 400);
	
  
		x = width/2;
	
	
} 

function draw() { 
  background(220);
	
//makes ball move a certaing amount after each "draw" loop, relative to MouseX postion.
	speed = mouseX/10 * bounce;
	y= y + speed;
	
	//creates the ball
  ellipse (x,y ,20,20);
	
	//call "-bounce" when ball hits top or lower screen, inverting the y movement direction.
  if (y <=0 || y >= height){
		bounce = bounce *-1;
	}
	

	
}let x = 0;
let y = 0;
let speedY = 1;
let speedX = 1;
let rectY =0

function setup() { 
  createCanvas(600, 400);

  x = width/2;
  	 
} 

function draw() { 
 
 background(220);
  
	

	 ellipse (x, y , 20, 20);
   ellipse (x + 20, y + 10 , 40, 10);
	y = y + speedY;
  x = x + speedX;
  noStroke();

  if (y <=0 || y >= rectY){
    speedY = speedY * -1;
    speedX = speedX + random(-0.1,0.5);
  }
  
  if (x <=0 || x >=width){
    speedX = speedX * -1;
  }
  
  rectY = mouseY;
   fill (40, y, x);
  rect (0 ,rectY,width + 100, 20); //bar
   
  
  
  for (var i =20; i <100; i +=60){
    fill (255, i+20, i + mouseY);
  }
  


	
  
	
}let positionX = 0;
let positionY = 200;
let speed = 5;


function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  
  
 positionX = positionX + speed;
	positionY = positionY + speed +5;
  
  ellipse (positionY, positionX ,20,20);
  
  if (positionX <0 || positionX > height){
    speed = speed * -1;
    
  }
  
    if (positionY <0 || positionY > width){
    speed = speed * -1;
    
  }
  
  //if (x < 0 || x > height){
  //  speed = speed * -1;
  //} 
  

  
  
}var ballPos = 0;
var ballSpeed = 5;
var acceleration = 0.8;

function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(220);
  
  
  
  stroke(100);
  
  ellipse (width/2,ballPos +20,80,80);
  ballPos = ballPos + ballSpeed;
  
  
  //why you have to create a 'ballSpeed' variable: otherwise it wouldn't update the position. If I had used '+5' as speed, 
  
  if (ballPos >= height -40   || ballPos <= 0){
    ballSpeed = ballSpeed * -1;
  }
  
  
 // if (ballPos >= height -40){
  //   ballSpeed = -10;
 // }
 // if (ballPos <= 0){
  //  ballSpeed = +10 ;
 // }
}/*Bouncing Chamber: A ball bounces up and down. Player controls
the height of the chamber by clicking and dragging the floor. 
the smaller the chamber, faster the ball bounces.*/

let floor;
let floorHeight =0;
let ball;
let ballSpeed = 0;
let ballPos = 100




function setup() { 
  createCanvas(400, 400);

  	floorHeight = mouseY;
  	ballSpeed = 0;
  
  	ballPos = width/2;
	
 
} 

function draw() { 
  
   background(220);
  		
  
  	//Floor starting parameters - NO Interaction
 	//floor = rect(0, height/2 -1, width -1, floorHeight);
   //Floor animation
  //floorHeight = floorHeight -4
  
  //fill(floorHeight,floorHeight,floorHeight,floorHeight);
  //floor= floor *2;
  
   //Floor starting parameters - With Mouse Interaction
 	floor = rect(0, mouseY, width -1, height);
  
  //Ball
 fill (20,20,20,20)
  ellipse (ballPos  ,ballSpeed +10 ,20,20);
  ballSpeed = ballSpeed +5;
  
  
  if (ballspeed > height){
      ballspeed = balspeed -3;
      }
 

  
  
  

	
 
  
  
  
  ellipse
  
}/*Bouncing Chamber: A ball bounces up and down. Player controls
the height of the chamber by clicking and dragging the floor. 
the smaller the chamber, faster the ball bounces.*/

let floor;
let floorHeight = 200;
let ball;
let ballSpeed;


function setup() { 
  createCanvas(400, 400);

	
 
} 

function draw() { 
   background(220);
  //Floor starting parameters
 rect(0, height/2, width -1, floorHeight);
  
  floorHeight = floorHeight -4;
  
}/*Bouncing Chamber: A ball bounces up and down. Player controls
the height of the chamber by clicking and dragging the floor. 
the smaller the chamber, faster the ball bounces.*/

let floor;
let floorHeight = 200;
let ball;
let ballSpeed;


function setup() { 
  createCanvas(400, 400);

	
 
} 

function draw() { 
   background(220);
  //Floor starting parameters
 rect(0, height/2, width -1, floorHeight);
  
  floorHeight = floorHeight -4;
  
}var angle = 0.0;
var offset = 60;
var scalar = 50;
var speed = 0.05;

function setup() { 
  createCanvas(400, 400);
    background(220);
  
} 

function draw() { 
noStroke();
  var x = offset + cos(angle) * scalar;
  var y = offset + sin(angle) * scalar;
  
  fill (x,y+ random(10,200),y+100);
  ellipse (x , y+ random (40, 40), x, 50);
  angle += speed;
  
  if (mouseIsPressed){
    scalar = x; 
    offset = random (20, 80);
  }
}function setup() { 
  createCanvas(400, 400);
	rectMode(CENTER);
	
	//background in the setup area makes painting possible. It never erases  
	background(0);
	
} 

function draw() { 

stroke (20,20,20,0);
}
	//rectangle
	/*
	fill (25,255,100)
	rect(200,200,20,20);*/
	

	
	//cursor painter
 
	/*if (mouseIsPressed) {
     
    fill(mouseY, mouseX, 20, mouseX/mouseY +10);
  } else {
    fill(mouseX, mouseY, mouseY/2, mouseX);
  }
  ellipse(mouseX, mouseY, 80, 80);
	}*/
  
  
	//autonomous
  
  //create and rotate 
function mouseIsPressed (){
  fill(20,20,20);
  rect (mouseX,mouseY,50,50);
  
}

 
	
	
	
	
	
function setup() { 
  createCanvas(400, 400);

	
	//background in the setup area makes painting possible. It never erases  
	background(220);
	
} 

function draw() { 
  fill(mouseX);
line(mouseY, mouseX, 10, 10);

 noStroke();

  print(mouseX);

  
  //autoline teste
  	for (var i = 20; i < 400; i += 20) {
rect(i, 20, i + 20, 20); 
    }
  translate (mouseX, mouseY);
  rect(0, 0, 30, 30);
  translate(35, 10);
  rect(0,0,15,15)/*
  
  
  
	//cursor
	if (mouseIsPressed) {
    fill(mouseY, mouseX, 20, mouseX/mouseY +10);
  } else {
    fill(mouseX, mouseY, mouseY/2, mouseX);
     
  }
  ellipse(mouseX, mouseY, 80, 80);

	
	//autonomous

    
  
	
	
	
	
}function setup() { 
  createCanvas(400, 400);
	rectMode(CENTER);
	
	//background in the setup area makes painting possible. It never erases  
	background(220);
	
} 

function draw() { 


	
	//rectangle
	stroke (20,20,20,0);
	fill (25,255,100)
	rect(200,200,20,20);
	

	
	//cursor
	if (mouseIsPressed) {
    fill(mouseY, mouseX, 20, mouseX/mouseY +10);
  } else {
    fill(mouseX, mouseY, mouseY/2, mouseX);
  }
  ellipse(mouseX, mouseY, 80, 80);
	
	//autonomous
	
	
	
	
	
}function setup() { 
  createCanvas(320, 320);
} 

function draw() { 
  background(220);
	ellipseMode(RADIUS);
	ellipse (160,90,40,50);//head
	ellipse (190,80,7,15);//right eye
	ellipse (195,78,3,6);//right pupil
	arc(180, 90, 30, 10, 5, HALF_PI);//round nose I like it!
	ellipse (160,80,10,15);//left eye
	ellipse (165,80,3,6);//left pupil

	triangle(30, 80, 150, 40, 130, 120);//pointy hat or hair
  //curve(73, 24, 73, 61, 15, 65, 15, 65);//too hard!
	ellipse (175,118,20,5)
	
	
	
}