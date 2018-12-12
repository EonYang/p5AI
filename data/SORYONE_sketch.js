  var x = 50;
 var y = 50;
 var w = 10;
  var dragging=false;
  var sliderStart=50;
  var sliderEnd=150;
  var w=10;
  

function preload(){
  sound = loadSound('Jiangnan Style.mp3');
}

function setup(){
  
  createCanvas(600,600);
  var button = createButton('play');
  button.mousePressed(togglePlay);
  
  fft = new p5.FFT();// set the fft
  sound.amp(0.5);
  colorMode(HSB);
  
}

function draw(){
  background(0);
  sliderForRate();
  
  
  var spectrum = fft.analyze(); 
  
  var speed1 = map(x,sliderStart,100,0,1);
  var speed2 = map(x,sliderStart,150,1,2);
  speed1= constrain(speed1,0,4);
  speed2= constrain(speed2,0,4);
  sound.rate(speed1);
  sound.rate(speed2);
  
  push();
  for (var i = 0; i< spectrum.length; i++){
    var r = map(spectrum[i], 0, 256, 0, 500);
    strokeWeight(0.7);
    stroke(i,255,255);
    noFill();
    ellipse(300,300,r,r);
  } 
  pop();
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}


function sliderForRate(){
  
  if(dragging){
    x = mouseX;
    x=constrain(x,sliderStart,150);
  }
  push();
   stroke(255);
   strokeWeight(6);
   line(sliderStart,50, sliderEnd, 50);
   pop();
   
   push();
   noStroke();
   fill(72,73,99);
   ellipse(x,y,20,20);
  pop();
}


function mousePressed() {
  if (mouseX > x-w && mouseX < x+w && mouseY > y-w && mouseY < y+w) {
    dragging = true;
    //console.log('1');
  }
}

function mouseReleased() {
  dragging = false;
}






var weather;
var api = 'https://api.openweathermap.org/data/2.5/find?q=';
var city ='Beijing';
var unit ='&units=metric';
var userkey = '&appid=8075f0f23a9fe47353466313848609c3';
var input;

function setup(){
createCanvas(600,250);
  var button =select('#submit');
  button.mousePressed(askWeather);
  input=select('#city');

}

function askWeather(){

  var url = api+input.value()+unit+userkey;
  loadJSON(url, gotData);



}

function gotData(data){
  print(data);
  weather=data;
}
function draw(){
  background(0);
  
  if(weather){
    var temp = weather.list[0].main.temp;
    var humidity = weather.list[0].main.humidity;
    var pressure = weather.list[0].main.pressure;
    var wind = weather.list[0].wind.speed;
    comment =weather.list[0].weather.description;
    
  
  
    
    push();
    
    fill(255,162,10);
    var tempbar = rect(40,50,temp*15,10,5);
    pop();
    
    push();
    fill(69,251,0);
    var humiditybar = rect(40,100,humidity*2,10,5);
    pop();
    
    push();
    fill(0,219,216);
    var pressurebar = rect(40,150,pressure/5,10,5);
    pop();
    
    push();
    fill(248,231,28);
    var windbar=rect(40,200,wind*20,10,5);
    pop();
    
    
    
    headtext();
    
    
    

  }

}

function headtext(){
    textSize(13);
    fill(255);
    text('Temperature', 40, 40);
    text('Humidity', 40, 90);
    text('Pressure', 40, 140);
  text('WindSpeed', 40, 190);
  
}

function description(){
   textSize(10);
    fill(255);
    text('temp', 200, 40);
    text('Humidity', 40, 90);
    text('Pressure', 40, 140);
}


var weather;

function setup(){
createCanvas(200,200);
loadJSON('https://api.openweathermap.org/data/2.5/find?q=London&units=metric&appid=8075f0f23a9fe47353466313848609c3', gotData);
  //print(data);
}

function gotData(data){
  print(data);
  weather=data;
 


}
function draw(){
  background(0);
  if(weather){
  ellipse(50,50,weather.list[0].main.temp,weather.list[0].main.temp);
  
  }
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem14101';  // fill in your serial port name here
 
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
function serverConnected() {
  println('connected to server.');
}
 
function portOpen() {
  println('the serial port opened.')
}
 
function serialEvent() {
 
}
 
function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  println('The serial port closed.');
}var serial; // variable to hold an instance of the serialport library
var circlesize=10; 
function setup() {
  //createCanvas(800, 800);
 serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList); // set a callback function for the serialport list event
 
 //serial.list(); // list the serial ports
  
 
}
function draw(){
background('#004488');
  fill('#44AAFF');
  noStroke();
  ellipse(width/2,height/2,circlesize);
  

} 


// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem14101';  // fill in your serial port name here
 
function setup() {
    createCanvas(400, 400);
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


function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
 var data =serial.read();
  console.log(data);
  circlesize=data;
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}

let r=0;
let a=0.3;
let al=50;
let b=0.2;

  
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}


function draw() {
  background(0);
  tex();
  translate(200,200);
  
  push();
  rotate(-90);
  let c = new Circle(180,second(),245,33,95);
  c.createBars();
  let d = new Circle(140,minute(),69,251,0);
  d.createBars();
  hou();
  
 
  pop();
  
  let e =new lines(70,minute(),255,255,255,4);
  e.createlines();
   let g =new lines(90,second(),248,231,28,2);
  g.createlines();
  
  
  blow(); 
   line_hr();
  centerpoint(2);

}


class Circle{
  
  constructor(r,z,col_r,col_g,col_b){
  this.r=r;//radius
  this.z=z;//time control
  this.col_r=col_r;
  this.col_g=col_g;
  this.col_b=col_b;
  }
  
  createBars() {
  

  strokeWeight(15);
  stroke(this.col_r,this.col_g,this.col_b);
  noFill();
  this.end =map(this.z,0,60,0,360);
  arc(0,0,this.r,this.r,0,this.end);
  stroke(this.col_r,this.col_g,this.col_b,40);
  ellipse(0,0,this.r);
}
}



function hou(){
  var hr = hour();
  
  strokeWeight(15);
  stroke(0,219,216);
  noFill();
  let end3 =map(hr%12,0,12,-90,360);
  arc(0,0,100,100,0,end3);
  stroke(0,219,216,40);
  ellipse(0,0,100,100);

}


class lines{
  constructor(x,z,col_r,col_g,col_b,q){
  this.x=x;//the second x location
  this.z=z;//time control
    this.col_r=col_r;
    this.col_g=col_g;
    this.col_b=col_b;
    this.q=q;
      
  }

createlines(){
  
  this.end =map(this.z,0,60,0,360);
  push();
  rotate(this.end-92);
  strokeWeight(this.q);
  stroke(0,40);
  line(0,2,this.x,2);
  stroke(this.col_r,this.col_g,this.col_b);
  line(0,0,this.x,0);
  
   pop();
 
  }

}




function line_hr(){
  var hr = hour();
  let end3 =map(hr%12,0,12,-90,360);
  push();
  rotate(end3-92);
  strokeWeight(4);
  stroke(0,40);
  line(0,2,30,2);
  stroke(255,162,10);
  
  line(0,0,30,0);
  pop();
 
}



function centerpoint(p){
  this.p=p;
  strokeWeight(this.p);
  stroke(0);
  point(0,0);
}

function blow(){

  r+=a;
  al-=b;
  if(r>60){
  r=0;
  al=50;  
  }
  
  noStroke();
  fill(0,219,216,al);
  ellipse(0,0,r,r);
  
}

function tex(){
  var hr = hour();
  var mi= minute();
  var se = second();
  //draw text
  fill(255);
  noStroke();
  text(hr+':'+mi+':'+se,20,380);
  
}
let r=0;
let a=0.3;
let b =5;
let al=40;
let clicked = true;
  
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  tex();
  translate(200,200);
  
  push();
  rotate(-90);
  drawcir();
  pop();
  blow(); 
  line_hr();
  line_mi();
  line_se();
  centerpoint(2);

}

function drawcir(){
  if(clicked){
  sec();
  minu();
  hou();
  }
}

function mousePressed(){
clicked = false;
}
function mouseReleased(){
clicked = true;
}

function tex(){
  var hr = hour();
  var mi= minute();
  var se = second();
  //draw text
  fill(255);
  noStroke();
  text(hr+':'+mi+':'+se,20,380);
  text('Press to hide the bar',260,380);
}

function sec(){
  var se = second();

  strokeWeight(15);
  stroke(245,33,95);
  noFill();
  let end1 =map(se,0,60,0,360);
  arc(0,0,180,180,0,end1);
  stroke(245,33,95,40);
  ellipse(0,0,180,180);
}

function minu(){
  var mi= minute();
  
  strokeWeight(15);
  stroke(169,251,0);
  noFill();
  let end2 =map(mi,0,60,0,360);
  arc(0,0,140,140,0,end2);
  stroke(169,251,0,40);
  ellipse(0,0,140,140);

}
function hou(){
  var hr = hour();
  
  strokeWeight(15);
  stroke(0,219,216);
  noFill();
  let end3 =map(hr%12,0,12,-90,360);
  arc(0,0,100,100,0,end3);
  stroke(0,219,216,40);
  ellipse(0,0,100,100);

}

function line_mi(){
  var mi= minute();
  let end2 =map(mi,0,60,0,360);
  push();
  rotate(end2-92);
  strokeWeight(4);
  stroke(0,40);
  line(0,2,70,2);
  stroke(255);
  
  line(0,0,70,0);
  pop();
 
}

function line_hr(){
  var hr = hour();
  let end3 =map(hr%12,0,12,-90,360);
  push();
  rotate(end3-92);
  strokeWeight(4);
  stroke(0,40);
  line(0,2,30,2);
  stroke(255,162,10);
  
  line(0,0,30,0);
  pop();
 
}

function line_se(){
  var se= second();
  let end1 =map(se,0,60,0,360);
  push();
  rotate(end1-92);
  strokeWeight(2);
  stroke(0,40);
  line(0,2,90,2);
  stroke(248,231,28);
  
  line(0,0,90,0);
  pop();
 
}

function centerpoint(x){
  this.x=x,
  strokeWeight(x);
  stroke(0);
  point(0,0);
}

function blow(){

  r+=a;
  //al=al-b;
  if(r>60||r<0){
  r=0;
  al=40;  
  }
  noStroke();
  fill(0,219,216,al);
 ellipse(0,0,r,r);


}
let r=0;
let cx=200;
let cy=200;

let a=1;
let b=1;
let c =10;
let al=100;


function setup() {
  createCanvas(400, 400);
  frameRate(35);
}

function draw() {
  background(0);
  setr();
  cir1();
  //cir2();
 
}

function setr(){
 
  c+= c;
  r+=a;
  if (r>=50 || r<1){
  a=-a;
  c=-c;
  
  
  }
  fill(14,231,194,al);
  noStroke();

}

function cir1(){

  cx+=b;
  cy-=b;
  if(cx>=250 || cx<=200 ){
  b=-b;
  }
  
  ellipse(cx,cy,2*r);

  }

// function cir2(){

//   cx+=b;
  
// //   if(dx>=250 || dx<=200 ){
// //   b=-b;
// //   }
  
//   ellipse(cx,cy,2*r);

//   }

let r=0;
let a=1;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  noFill();
  stroke(255);
  ellipse(200,200,2*r);
  
  r+= a;
  if(r>40 || r<1){
  a=-a
    
  }
}let a=0;

function setup() {
  createCanvas(610, 610);
  angleMode(DEGREES);
}


function draw() {
  background(155);
  rectangle();
  
}

function rectangle(){
  
  let pointX=[];
  let pointY=[];
  
 
    for (let i=0;i<30;i++){
  
  for (let j=0;j<30;j++){
    
    pointX[i]= (2*i+1)*10+5;
    pointY[j]= (2*j+1)*10+5;
    noStroke();
    fill(233); 
    rotate(1);
    a+= 0;
    rectMode(CENTER);
    translate(pointX[i],pointY[j]);
    
    rect(pointX[i],pointY[j],10,10);
    
    // let d;
    // d = dist(pointX[i],pointY[j],mouseX,mouseY);
   
    

    
    
    
    
  }
    }
    
  
    
    
    
    
  

  
}
//   function rot(){
//     let pointX=[];
//   let pointY=[];
//   for (let i=0;i<30;i++){
  
//   for (let j=0;j<30;j++){
    
//     pointX[i]= (2*i+1)*10+5;
//     pointY[j]= (2*j+1)*10+5;
//   }
//   }
//   let d;
//     d=dist(mouseX,mouseY,pointX[i],pointY[j]);
//   if (d<10){
//   rotate(30);
  
//   }
//   }
  






//create an array,use [];
let bubbles=[];

//setup the basic settings.
function setup() {
  createCanvas(400, 400);
  //create 5 circles,give each vary a value.
  for(let i=0; i<5;i++){
  let x = random(width);
  let y = random(height);
  let r = random(10,70);
    //use the class function
  let b = new Bubble(x,y,r);
    //pass each value to the Bubble.
   		bubbles.push(b);
  }
  
//   // for (let i=0;i<10;i++){
//   // let x= random (width);
//   // let y =random (height);
//   // let r = random (10,50);
//   // bubbles[i]=new Bubble(x,y,r);
//   }

}
// 	function mousePressed(){
// 		let r = random (10,50);
// 	let b = new Bubble(mouseX,mouseY,r);
		
// 		bubbles.push(b);
		
		
		
	// }

function draw() {
  background(0);
  //draw 5 bubbles
	for (let i =0; i<bubbles.length ;i++){
	bubbles[i].move();
	bubbles[i].show();
	}
}

//mousePressed function
function mousePressed(){
  for (let i= 0 ; i <bubbles.length;i++){
    
    bubbles[i].clicked(mouseX,mouseY);
  }
 
}

//set the class
class Bubble{
 
  constructor(x,y,r){
  this.x=x;
  this.y=y;
  this.r=r;
  this.brightness = 0;
}
  //set the click
  clicked(px,py){
    let d= dist(px,py,this.x,this.y);
    if(d<this.r){
    
     this.brightness= 255;
    
    }
  
  
  }
  
  //move function
  move(){
  this.x = this.x +random (-5,5);
  this.y = this.y + random(-5,5);
}
  
  //show function
  
  show(){
    stroke(255);
    strokeWeight(2);
    fill(this.brightness,100);
    ellipse(this.x,this.y,this.r);
  }
  
  
}let xMove;
let yMove;
let pointX = [];
let pointY = [];
let r,g,b,strokeCol;
let D,d;

// ellipse variables for slider
var x = 50;
var y = 380;
var w = 10;

var dragging = false;
var sliderStart = 50;
var sliderEnd = 350;
var offsetX = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  r = map(mouseX,0,400,200,100);
  b = map(mouseX,0,400,100,20);
  g = map(mouseY,0,400,100,20);
  
  
  backCol = map(mouseX,0,width,0,255);
  strokeCol = map(mouseX,0,width,255,0);
  
  background(r,g,b);
  stroke(255);
  linePoints();
  slider();
}

function linePoints() {
  length = width /8;
  
  xMove = map(mouseX,0,width,0,length);
  yMove = map(mouseY,0,height,0,length);
  
  for (i = 0; i <= 8; i++) {
    for (let j = 0; j <= 8; j++) {
    pointX[i] = i * length;
    pointY[i] = i * length;
    pointX[j] = j * length;
    pointY[j] = j * length;
    
    d = dist(pointX[i]+xMove,pointX[j]+yMove,mouseX,mouseY);
      strokeWeight(2);
      line (pointX[i]+xMove,pointX[j]+yMove,pointY[i+1],pointY[j]);
      line (pointX[i]+xMove,pointX[j]+yMove,pointY[i],pointY[j+1]);
    
      if(d<D){
       if(d<D/2){
      push();

      strokeWeight(5);
      stroke(r,g,b);
      line (pointX[i]+xMove,pointX[j]+yMove,pointY[i+1],pointY[j]);
      line (pointX[i]+xMove,pointX[j]+yMove,pointY[i],pointY[j+1]);
      
      strokeWeight(18);
      stroke(255);
      point(pointX[i]+xMove,pointX[j]+yMove,pointY[i]+xMove,pointY[j]+yMove)
      
      pop();
      
      }else{
         
      push();
      strokeWeight(2);
      stroke(255);
      line (pointX[i]+xMove,pointX[j]+yMove,pointY[i+1],pointY[j]);
      line (pointX[i]+xMove,pointX[j]+yMove,pointY[i],pointY[j+1]);
      
      strokeWeight(10);
      point(pointX[i]+xMove,pointX[j]+yMove,pointY[i]+xMove,pointY[j]+yMove);
      
      pop();
       }
    }
    
    //strokeWeight(8); 
    //point(pointX[i]+xMove,pointX[j]+yMove,pointY[i]+xMove,pointY[j]+yMove);
        
    }
  }
}


function slider(){
  if (dragging) {
    x = mouseX ;
  }
    x = constrain(x, sliderStart, sliderEnd);
  
  if (dragging) {
    fill (0,170,238);
  } else {
    fill(248,231,28);
  }
   
  //draw the slider
   stroke(255);
   line(sliderStart,380, sliderEnd, 380);
   ellipse(x,y,1.5*w,1.5*w);
  
   D = map (x,sliderStart,sliderEnd-w,40,180);
}


function mousePressed() {
  // Did I click on slider?
  if (mouseX > x-w && mouseX < x + w && mouseY > y-w && mouseY < y + w) {
    dragging = true;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}let xMove;
let yMove;
let pointX = [];
let pointY = [];
let r,g,b,strokeCol;
// ellipse variables for slider
var x = 50;
var y = 380;
var w = 10;

var dragging = false;

var sliderStart = 50;
var sliderEnd = 350;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  r = map(mouseX,0,400,200,100);
  b = map(mouseX,0,400,100,20);
  g = map(mouseY,0,400,100,20);
  
  
  backCol = map(mouseX,0,width,0,255);
  strokeCol = map(mouseX,0,width,255,0);
  
  background(r,g,b);
  stroke(255);
  linePoints();
  
}

function linePoints() {
  length = width /8;
  
  xMove = map(mouseX,0,width,0,length);
  yMove = map(mouseY,0,height,0,length);
  
  for (i = 0; i <= 8; i++) {
    for (let j = 0; j <= 8; j++) {
    pointX[i] = i * length;
    pointY[i] = i * length;
    pointX[j] = j * length;
    pointY[j] = j * length;
    
    var d = dist(pointX[i]+xMove,pointX[j]+yMove,mouseX,mouseY);
      strokeWeight(2);
      line (pointX[i]+xMove,pointX[j]+yMove,pointY[i+1],pointY[j]);
      line (pointX[i]+xMove,pointX[j]+yMove,pointY[i],pointY[j+1]);
    
      if(d<60){
       if(d<40){
      push();
      
      strokeWeight(5);
      stroke(r,g,b);
      line (pointX[i]+xMove,pointX[j]+yMove,pointY[i+1],pointY[j]);
      line (pointX[i]+xMove,pointX[j]+yMove,pointY[i],pointY[j+1]);
      
      strokeWeight(18);
      stroke(255);
      point(pointX[i]+xMove,pointX[j]+yMove,pointY[i]+xMove,pointY[j]+yMove)
      
      pop();
      
      }else{
         
      push();
      strokeWeight(2);
      stroke(255);
      line (pointX[i]+xMove,pointX[j]+yMove,pointY[i+1],pointY[j]);
      line (pointX[i]+xMove,pointX[j]+yMove,pointY[i],pointY[j+1]);
      
      strokeWeight(10);
      point(pointX[i]+xMove,pointX[j]+yMove,pointY[i]+xMove,pointY[j]+yMove);
      
      pop();
       }
    }
    
    //strokeWeight(8); 
    //point(pointX[i]+xMove,pointX[j]+yMove,pointY[i]+xMove,pointY[j]+yMove);
    
    if (dragging) {
    x = mouseX ;
  }
      x = constrain(x, sliderStart, sliderEnd);
      
      
      
       
   stroke(255);
      
   line(sliderStart,380, sliderEnd, 380);
    
   // Fill according to state
      push();
  if (dragging) {
    fill (0,170,238);
  } else {
    fill(248,231,28);
  }  
   
  ellipse(x,y,1.5*w,1.5*w);
      
 var D =map (d,sliderStart,sliderEnd-w,40,60);
        
      
    }
  }
}


function mousePressed() {
  // Did I click on slider?
  if (mouseX > x-w && mouseX < x + w && mouseY > y-w && mouseY < y + w) {
    dragging = true;
    
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}

let xMove;
let yMove;
let pointX = [];
let pointY = [];
let backCol,strokeCol;
var r= 0;
var b= 255;
var g=255;

function setup() {
  createCanvas(400, 400);
}

function draw() {

   
  r = map(mouseX,0,600,0,255);
  b = map(mouseX,0,600,255,0);
  g = map(mouseY,0,400,0,255);
  
  
  
  strokeCol = map(mouseX,0,width,255,0);
  
  background(r,g,b);
  stroke(strokeCol);
  length = width /8;
  
  xMove = map(mouseX,0,width,0,length/2);
  yMove = map(mouseY,0,height,0,length/2);
  
  for (i = 0; i <= 8; i++) {
    for (let j = 0; j <= 8; j++) {
    pointX[i] = i * length;
    pointY[i] = i * length;
    pointX[j] = j * length;
    pointY[j] = j * length;
    strokeWeight(10);
       point(pointX[i]+xMove,pointX[j]+yMove,pointY[i]+xMove,pointY[j]+yMove);
      
      var d = dist(pointX[i]+xMove,pointX[j]+yMove,mouseX,mouseY);
     
  
    if(d<40){
       if(d<10){
      strokeWeight(20);
          point(pointX[i]+xMove,pointX[j]+yMove,pointY[i]+xMove,pointY[j]+yMove)
         
         // noFill();
         // strokeWeight(2);
         // ellipse(pointX[i]+xMove,pointX[j]+yMove,40,40);
       }else{
      
      strokeWeight(15);
        point(pointX[i]+xMove,pointX[j]+yMove,pointY[i]+xMove,pointY[j]+yMove);
     }
    }
      
    strokeWeight(2);
    line (pointX[i]+xMove,pointX[j]+yMove,pointY[i+1],pointY[j]);
    line (pointX[i]+xMove,pointX[j]+yMove,pointY[i],pointY[j+1]);
      

    }
  }
}  
  

  

  
  
var points = [];
var num = 6;
 
function setup() {
  createCanvas(600, 400);
  background(255);
 
  for (var i = 0; i < num; i++) {
    points[i] = createVector(random(width), random(height));
  }
}
 
function draw() {
  noFill();
  stroke(0);
  strokeWeight(3);
 
  beginShape();
  for (var i = 0; i < num; i++) {
      curveVertex(points[i].x, points[i].y);
  }
  endShape();
 
  
}var on = false;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  if (on){
  background(0,255,0);
  }else{
  background(0);
  }
  
  
  stroke(255);
  strokeWeight(4);
  noFill();

  rectMode (CENTER);
    rect (300,200,100,100);
}

function mousePressed(){
   if(mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250){
      on = !on;
     // if (on) {
      // on=false;
      // }else{
      //   on = true;
      // }
   }
  
}
  
var r= 0;
var b= 255;
var points=[];
var num=6;
var startpointx=[];
var endpointx=[];



function setup() {
  createCanvas(600, 400);
  //get 4 random pionts
  for (var i = 0; i < num; i++) {
    points[i] = createVector(random(width), random(height));
  }
  //get 5 top startpoints of the 5 rect
  for ( var i = 0; i < 6 ; i++){
    startpointx[i] = createVector(60+120*i,random(height)-30);
    endpointx[i] = createVector(60+120*i,random(height));
  }
  
}

function draw() {
  //background
  background(0);
   if (mouseIsPressed){
  r = map(mouseX,0,600,0,255);
  b = map(mouseX,0,600,255,0);
  g = map(mouseY,0,400,0,255);
  background(r,g,b);
  }
  
  //if: 1 line alarm
  if (mouseX > (startpointx[0].x-11) && mouseX < (startpointx[0].x +73) && mouseY < (startpointx[0].y+11) ){ 
      
      background(random(233),6,34);}
  if (mouseX > (startpointx[0].x-11) && mouseX < (startpointx[0].x +73) && mouseY > (startpointx[0].y+29)){
    background(random(233),6,34);}
  
  //if: 2 line alarm
  if (mouseX > (startpointx[1].x-11) && mouseX < (startpointx[1].x +73) && mouseY < (startpointx[1].y+11) ){ 
      
      background(random(233),6,34);}
  if (mouseX > (startpointx[1].x-11) && mouseX < (startpointx[1].x +73) && mouseY > (startpointx[1].y+29)){
    background(random(233),6,34);}
  
  //if: 3 line alarm
  if (mouseX > (startpointx[2].x-11) && mouseX < (startpointx[2].x +73) && mouseY < (startpointx[2].y+11) ){ 
      
      background(random(233),6,34);}
  if (mouseX > (startpointx[2].x-11) && mouseX < (startpointx[2].x +73) && mouseY > (startpointx[2].y+29)){
    background(random(233),6,34);}
  
  //if: 4 line alarm
  if (mouseX > (startpointx[3].x-11) && mouseX < (startpointx[3].x +73) && mouseY < (startpointx[3].y+11) ){ 
      
      background(random(233),6,34);}
  if (mouseX > (startpointx[3].x-11) && mouseX < (startpointx[3].x +73) && mouseY > (startpointx[3].y+29)){
    background(random(233),6,34);}
  
  //if: 5 line alarm
  if (mouseX > (startpointx[4].x-11) && mouseX < (startpointx[4].x +73) && mouseY < (startpointx[4].y+11) ){ 
      
      background(random(233),6,34);}
  if (mouseX > (startpointx[4].x-11) && mouseX < (startpointx[4].x +73) && mouseY > (startpointx[4].y+29)){
    background(random(233),6,34);}
  
  
  
  //ellipse
  noStroke();
  fill(255);
  ellipse(mouseX,mouseY,22,22);
  
  //lines
  noFill();
  stroke(255);
  strokeWeight(3);
  
 //draw the random curve line
  // beginShape();
  // for (var i = 0; i < num; i++) {
  //     curveVertex(points[i].x, points[i].y);
  // }
  //endShape();
  
  //draw the rect
  
//   var startpointx=[];
//   for ( var a = 0; a < 6 ; a++){
//     startpointx[a] =   60+120*a ;
  for ( var i = 0; i < 6 ; i++){
  fill(0); 
  noStroke();
  rect(startpointx[i].x,0,60,startpointx[i].y);
    rect(endpointx[i].x,startpointx[i].y+40,60,500);
  }
  
}

  
  
  

function setup() {
  createCanvas(400, 400);
	
}

function draw() {
	background(255,255,255);
	stroke(0,0,0);
	strokeWeight(4);
	noFill();
	//This is the first bezier line;
	bezier(140.59,174.55,165.19,135,326.85,107.38,313.82,272.89);
	//This is the second bezier line;
	bezier(85.43,233.84,85.43,233.84,71.27,248.69,68.41,273.44);

	fill(0);
	beginShape();
	vertex(81.82,237.35);
	quadraticVertex(74.18,214.36,86.46,191.76);
	quadraticVertex(130.28,157.79,142.26,174.77);
	quadraticVertex(157.72,222.67,124.31,226);
	endShape(CLOSE);
	
	beginShape();
	vertex(91.74,232.14);
	quadraticVertex(100.43,232.14,100.43,255.77,100.43,243.96);
	quadraticVertex(106.01,293.74,145.86,291.99);
	quadraticVertex(184.9,280.17,182.65,262.41);
	quadraticVertex(169.73,244.82,159.54,248.9);
	quadraticVertex(135.19,260.33,129.77,252.98);
	quadraticVertex(118.54,242.55,122.11,225.3);
	endShape(CLOSE);
	
	
	line(220.5,117.5,217.31,143.78);
	
	fill(254,79,78);
	stroke(0,0,0);
	beginShape();
	vertex(221.34,101.98);
	quadraticVertex(205.98,88.38,208.31,101.28);
	quadraticVertex(217.43,117.16,221.43,117.16,219.43,117.16);
	quadraticVertex(229.13,114.68,232.86,102.68);
	quadraticVertex(231.82,94.49,222.21,101.34,222.63,101.04);
	endShape(CLOSE);
	
	fill(0);

	ellipse(192,190,38,38);
	ellipse(247,190,38,38);
	
	
	frameRate(300);
	fill(255,255,random(255,121));
	ellipse(190.5,183.5,20,20);
	ellipse(245.5,182.5,20,20);
	ellipse(186,199,11,11);
	ellipse(241,198,11,11);
	ellipse(200,198,9,9);
	ellipse(255,197,9,9);
	
	noStroke();
	fill(254,79,78);
	ellipse(185,220,14,8);
	ellipse(256,220,14,8);
	
	stroke(0,0,0);
	strokeWeight(4);
	fill(242,122,122);
	ellipse(225,243,82,20);
	
	frameRate(3);
	var adjwords = ['handsome','elegent','smart','cute'];
	var word = random(adjwords);
	noStroke();
	textSize(25);
	text(word,164,335)

	strokeWeight(0.7)
	textSize(20);
	fill(0);
	text('Why you so                     today ?',44,335);
	
	text('Hi, Jasper.',60,80);
	text('I m Dora.',60,110);
	
}
	
