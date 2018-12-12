let mobilenet;
let video;
let label;

function modelReady(){
console.log('Model is ready');
  mobilenet.predict(gotResults);
}

function gotResults(error,results){
if (error){
  console.error(error);
}else{
  console.log(results);
   label = results[0].className;

}
}



// function imageReady(){
// image (puffin,0,0,width,height);
// }

function setup() {
  createCanvas(400, 400);
video = createCapture(VIDEO);
  video.hide();
  background(0);

  mobilenet = ml5.imageClassifier('MobileNet',video,modelReady)
}


function draw(){
image (video,0,0)
    fill(2550);
  textSize(24);
  text(label,10,height - 100);
    mobilenet.predict(gotResults);
}var classifier;
var canvas;

function gotFile(daFile){
console.log(daFile);
}
function gotModel(){
console.log("GOT MODEL");
}

function imageReady()

function setup() {
  createCanvas(400, 400);
  puffin = createImg('image/puffin.jpg');
  puffin.hide();
  classifier = ml5.imageClassifier('MobileNet', gotModel);
}

function draw() {
  background(220);
}var song;
var amp;
var button;

function toggleSong(){
  if (!song.isPlaying()) {
    song.play();
  }else{
song.pause();
}
}

function preload(){
  song = loadSound('TROL.mp3');
    img = loadImage('tolo.jpg');
}

function setup() {
  createCanvas(700, 400);
  button=createButton('singg');
  button.mousePressed(toggleSong);
  // song.play();
  amp = new p5.Amplitude();
}

function draw() {
  background(0);
       image(img, 0, 0);
  let vol= amp.getLevel();
  print(vol);
  
  ellipse(120,height/2,100,vol*400);
    ellipse(360,height/2,100,vol*400);
      ellipse(590,height/2,100,vol*400);
  
}var video;
var x = 0;

function setup() {
  createCanvas(800, 240);
  pixelDensity(1);
    background(51);
  video = createCapture(VIDEO);
  video.size(320,240);
}

function draw() {

  video.loadPixels();
  
  var w = video.width
  var h = video.height;
  
  copy(video,w/2,0,1,h,x,0,1,h);
  x=x+1;
  if (x>width){
  x=0;
  }
}var video;
var button;
var snapshots = [];

function setup() {
  createCanvas(320, 240);
  background(51);
  video = createCapture(VIDEO);
  video.size(320,240);
button = createButton('snap');
button.mousePressed(takesnap);
}

function takesnap(){
  snapshots.push(video.get());
  // image(video,0,0);
  }

function draw() {
  var w = 80;
    var h = 60;
    var x = 0;
    var y = 0;
  for (var i=0; i< snapshots.length;i++){
    tint(255,50);
    image(snapshots[i],x,y,w,h);
x= x + w ;
    if (x>width){
      x=0;
      y=y + h;
  }
  }
  
  
}var SUMMARIZE="https://api.nytimes.com/svc/movies/v2/reviews/search.json?q=hot&api-key=d49e10efdd554b7ba340304e4e4d9b6c"
let button;
let news;

function setup() {
  noCanvas();
  loadJSON(SUMMARIZE, gotData);
}
  
function gotData(data){
  
  news = data;
  // for(let i = 0; i < data.results.length; i++){
  // print(data.results[i].summary_short);
  // }
  
  button = createButton('SUMMARIZE');
  button.mousePressed(listNews);
  }

function listNews(){
	 for(let i = 0; i < news.results.length; i++){
  		createP(news.results[i].summary_short);
  	}

}
function draw() {

  
  
  //   button.mousePressed(SUMMARIZE);
  
}let w;

function setup() {
  createCanvas(600, 600);
  // frameRate(40);
  w = 1;
  
}

function draw() {
  background(0);
  
  w = w+frameCount/10;
  
  if (w<300){
  	for (let i=0;i<800;i=i+5){
    	rect(0, i, w, 3);
  }
  }else{
  	for (let i=0;i<800;i=i+5){
    	rect(0, i, 300, 3);
  }
  }
  
  

  
  
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(500, 300);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1421");
  serial.on('data', gotData);
}


// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  //same as readStringUntil(‘\r\n’)
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  latestData = int(currentString);            // save it for the draw method
  console.log(latestData);             // println the string
  var output = map(mouseX,0,width,0,255);
  serial.write(output);
}

function draw() {
  background(255,255,255);
  fill(0,0,0);
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(mouseX, data, 50, 50);
  text(data, 10, 10);
  
}let w;


// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(600, 600);
  w = 1;
  img = loadImage("assets/truth.png");  // Load the image
  
  
  
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);
}


// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  //same as readStringUntil(‘\r\n’)
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  latestData = int(currentString);            // save it for the draw method
  console.log(latestData);             // println the string
  var output = map(mouseX,0,width,0,255);
  serial.write(output);
}

function draw() {
  background(0);
  var data = map(latestData, 0, 1023, 0, height);
  //ellipse(mouseX, data, 50, 50);
  text(data, 10, 10);
  

   w = w+frameCount/10;
  
  
  // LINE01
  
  
  // DOUBLE IT UP
  if (w<600){
  	for (let i=0;i<1000;i=i+5){
    	rect(0, i, data, 3);
      fill(255-data,255-data,255-data);
  }
    
   // MOTION IT UP
  }else{
  	for (let i=0;i<800;i=i+5){
    	rect(0, i, data, 3);
  }
    
    
  }
      image(img, 0, 0);
  
//   CODEPART
//   if (data > 250) {
//   rect(30, 20, 55, 55);
  
//   }
  
//   else if(data < 250)
//   {
//   rect(300, 20, 55, 55, 20, 15, 10, 5);
//   }
  
  
}var myButton;

function setup() {
  createCanvas(800, 800);
  myButton = createButton ("Press");
  myButton.position(100,100);
  
  myButton.mousePressed(function(){
    background(220);
    ellipse(random(width),random(height),20,20);
  });

function draw() {
  background(220);
}
}let bubbles = [];

function setup() {
  createCanvas(600, 400);
  for (let i=0; i <10;i++){
    let x = 20 + 100*i;
  bubbles[i] = new Bubble(x,200,40);
  }
}

function draw() {
  background(0);
  for (let i=0; i < bubbles.length ;i++){
bubbles[i].move();
  bubbles[i].show();
  }
}


class Bubble {
constructor(x,y,r){
this.x =x;
this.y =y;
this.r =r;
}
  
move(){
this.x = this.x + random (-5,5);
this.y = this.y + random (-5,5);
}
  
  show(){
  ellipse(this.x,this.y,20,20);
  }
  
  
}let sushi1;

function setup() {
  createCanvas(400, 400);
  // sushi1= new sushi1();
}

function draw() {
  background(220);
  
  
  class sushi1 {
  constructor()
    {this.x=200
  		this.y=150 
  }
  
  
  }
  
  
  class sushi{
    constructor(x,y){
    this.x=x;
    this.y=y;
    }
  
  show(){
  push();
  // seaweed1
  noStroke();
  fill(0, 0, 0);
  rect(86, 170, 90, 60, 20);
  
  // red1
  noStroke();
  fill(130, 0, 0);
  rect(86, 139, 90, 60, 20);
  
  // Salmonegg1
  fill(180, 0, 0);
  ellipse(100, 140, 20, 20);
  ellipse(120, 140, 20, 20);
  ellipse(140, 140, 20, 20);
  ellipse(160, 140, 20, 20);
  ellipse(100, 160, 20, 20);
  ellipse(120, 160, 20, 20);
  ellipse(140, 160, 20, 20);
  ellipse(160, 160, 20, 20);
  ellipse(100, 180, 20, 20);
  ellipse(120, 180, 20, 20);
  ellipse(140, 180, 20, 20);
  ellipse(160, 180, 20, 20);
  }
  

	// seaweed2

  fill(0, 0, 0);
  rect(198, 198, 160, 60, 20);
  
    	// rice2
  fill(255);
  rect(200, 200, 55, 55, 20);

  // Salmon2
  fill(255, 138, 0);
  rect(206, 208, 40, 40, 220);
  
  // rice3
  fill(255);
  rect(10, 320, 100, 60, 20);
  
  
 	// egg3shadow
  noStroke();
  fill(237, 173, 16);
  rect(10, 300, 100, 55, 20);
  
  // egg3top
  fill(255, 228, 0);
  rect(10, 280, 100, 60, 20);
  
  // topweed3
  fill(0,0,0);
  rect(50, 280, 25, 100);

    pop();

  
}
}
let object1= [];


function setup() {
  createCanvas(400, 400);
  
  for (var i = 0; i< 500;i++){

  object1.push(  new circle())
  }
}

function draw() {
   for (var i = 0; i<100;i++){
  object1[i].drawCircle();
   }
}

class circle {
 constructor(){
 this.x= random(width);
  this.y=random(height);
 }

  drawCircle(){
  ellipse(this.x,this.y,10,10);
  }
  
}var myFishes = [];

function setup() {
  createCanvas(400, 400);

  for (var i = 0; i < 100; i++) {
    myFishes.push(new Fish(i * 20, i * 20));
  }
}

function draw() {
  background(220);
  for (var i = 0; i < 100; i++) {
    myFishes[i].swim();
    myFishes[i].changeMe();
  }
}

// function mousePressed(){
//   for(var i = 0 ; i <100 ; i++){
// if(myFishes[i].amINear()<10){
//   print("PUT MORE");
//   myFishes[i].changeMe()
// 	}

// }
// }


class Fish {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  changeMe() {
    if (mouseIsPressed) {
    line(this.x, this.y, 20, 20);
    this.x += random(-20, 20);
    this.y += random(-20, 20);
    }
  }



  swim() {
    ellipse(this.x, this.y, 20, 20);
    this.x += random(-2, 2);
    this.y += random(-2, 2);
  }

  amINear() {
    return dist(this.x, this.y, mouseX, mouseY);
  }
}let sushi1;


// ALL IMAGE
var buttonTrue, buttonFalse, buttonNext;
// ALL IMAGE
var photo = [];
// ALL QUESTION
var question = [];

// length
var length = 125;

// GAMMEOVER
var gameOver = false;


// INSIDE QUESTION
question[0] = " I costarred with Matthew McConaughey";
question[1] = "I use to be a drug dealer";
question[2] = " I have taken 25 shot of Teqiula with 20 minutes";
question[3] = "My first pet is a guinea pig";
question[4] = "I can hear the thoughts of squirrels";


// INSIDE ANSWER
var answers = [];
answers[0] = true;
answers[1] = false;
answers[2] = true;
answers[3] = true;
answers[4] = false;

// SONG
var song;
var greensong;
var redsong;


// SCORE&STRAGE
var stage = 0;
var score = 0;


// MAIN IMAGE
function preload() {

  // SONG
  song = loadSound('song.mp4');
  greensongplay = loadSound('greensong.mp4');
  redsongplay = loadSound('redsong.mp4');
  
  // BACKGROUND
 bg = loadImage('background.gif');

  // PHOTO1
  photo[0] = loadImage('01.png');
  // PHOTO2
  photo[1] = loadImage('02.png');
    // PHOTO3
  photo[2] = loadImage('03.png');
  // PHOTO4
  photo[3] = loadImage('04.png');
    // PHOTO4
  photo[4] = loadImage('05.png');




}

function setup() {
  createCanvas(700, 500);
  sushi1= new Sushi1();
  
{
  song.setVolume(0.8);
  song.play();
      }
  
}


function draw() {
  background(100, 167, 157);
  
  length = constrain(length,30,400);
  
  
  // BACKGROUND
	image(bg, 0, 0);  
  
  
  function endgame() {
  sushi1.show();
  sushi2.show();
}

  
  // NORSE move
  noStroke();
  fill(220,140,104);
    rect(220,300,length,30);
  fill(147,81,55);
	ellipse(220+length,315,24,30);

  if(mouseIsPressed){
  	length = length + 10;
  }
  
      // GAMEOVER
  if(10+length>width-70){
  	gameOver=true;
  }
  if(gameOver){
    textSize(30);
  	text("game over", width/2, height/2);
  }
  

  //  HEADLINE
  textSize(22);
  fill('White');
  text('CATCHERIN THE LIE', 450 ,80);
  textFont('Futura');
  textAlign(CENTER);


  //   BUTTON

  buttonTrue = createButton('True');
  buttonTrue.position(390, 350);
  buttonTrue.mousePressed(pressingtrue);

  buttonFalse = createButton('False');
  buttonFalse.position(440, 350);
  buttonFalse.mousePressed(pressingfalse);


  //BUTTON NEXT 
  buttonNext = createButton('NEXT');
  buttonNext.position(490, 350);
  buttonNext.mousePressed(nextQuestion);


  // RENDERQUESTION
  textSize(17);
  text(question[stage], 460 , 280);

  // RENDERQUESTION
  text('Point: ' + score, 580, 480)
	image(photo[stage],390,110)  


}


  function greensong(){
  greensongplay.setVolume(0.8);
  greensongplay.play();
      }

  function redsong(){
  redsongplay.setVolume(0.8);
  redsongplay.play();
  }

// FUCTION CHECK

// TRUE

function pressingtrue() {
  console.log('true was pressed')
  //correct response
  if (answers[stage] == true) {
    score++; 
    greensong() ; 
     	length = length + 50;
  }
  else {
    redsong();
    length= length-50;
  }
}

// FALSE
function pressingfalse() {
  console.log('false was pressed')
  if (answers[stage] == false) {
    score++; 
greensong();
    
  }
  else {
    redsong()
        length= length-50;
  }
    
}

function checkQuestionFalse() {
  console.log('false was pressed')

  if (question01 == false) {
    fill(255, 0, 0)
    text('You got it Right', 900 / 2, 920 / 2);
    textAlign(CENTER);
    score++
  }

  if (question01 == true) {
    fill(255, 0, 0)
    text('You got it dddd', 842 / 2, 903 / 2);
    textAlign(CENTER);
  }
}


// NEXT QUESTION
function nextQuestion() {
    console.log('next was pressed')
  stage++; 
 

  if (stage > 5) {
    endgame();
  }
}





// REWARD

class Sushi1{
constructor(s1,s2){
  this.x=200;
  this.y=200;
}

  show ()
  {   
  noStroke();
      // seaweed2
  fill(0, 0, 0);
  rect(this.x-2, this.y-2, 160, 60, 20);
    
    	// rice2
  fill(255);
  rect(this.x, this.y, 55, 55, 20);

  // Salmon2
  fill(255, 138, 0);
  rect(this.x+7, this.y+6, 40, 40, 220);
  
  }
}

// ALL IMAGE
var buttonTrue, buttonFalse, buttonNext;
// ALL IMAGE
var photo = [];
// ALL QUESTION
var question = [];

// length
var length = 125;

// GAMMEOVER
var gameOver = false;


// INSIDE QUESTION
question[0] = " I costarred with Matthew McConaughey";
question[1] = "I use to be a drug dealer";
question[2] = " I have taken 25 shot of Teqiula with 20 minutes";
question[3] = "My first pet is a guinea pig";
question[4] = "I can hear the thoughts of squirrels";


// INSIDE ANSWER
var answers = [];
answers[0] = true;
answers[1] = false;
answers[2] = true;
answers[3] = true;
answers[4] = false;

// SONG
var song;
var greensong;
var redsong;


// SCORE&STRAGE
var stage = 0;
var score = 0;


// MAIN IMAGE
function preload() {

  // SONG
  song = loadSound('song.mp4');
  greensongplay = loadSound('greensong.mp4');
  redsongplay = loadSound('redsong.mp4');
  
  // BACKGROUND
 bg = loadImage('background.gif');

  // PHOTO1
  photo[0] = loadImage('01.png');
  // PHOTO2
  photo[1] = loadImage('02.png');
    // PHOTO3
  photo[2] = loadImage('03.png');
  // PHOTO4
  photo[3] = loadImage('04.png');
    // PHOTO4
  photo[4] = loadImage('05.png');




}

function setup() {
  createCanvas(700, 500);
  
  img*photo[1(
  
{
  song.setVolume(0.8);
  song.play();
      }
  
}


function draw() {
  background(100, 167, 157);
  
  
  length = constrain(length,30,400);
  
  
  // BACKGROUND
	image(bg, 0, 0);  
  
  // NORSE move
  noStroke();
  fill(220,140,104);
    rect(220,300,length,30);
  fill(147,81,55);
	ellipse(220+length,315,24,30);

  if(mouseIsPressed){
  	length = length + 10;
  }
  
      // GAMEOVER
  if(10+length>width-70){
  	gameOver=true;
  }
  if(gameOver){
    textSize(30);
  	text("game over", width/2, height/2);
  }
  

  //  HEADLINE
  textSize(22);
  fill('White');
  text('CATCHERIN THE LIE', 450 ,80);
  textFont('Futura');
  textAlign(CENTER);


  //   BUTTON

  buttonTrue = createButton('True');
  buttonTrue.position(19, 19);
  buttonTrue.mousePressed(pressingtrue);

  buttonFalse = createButton('False');
  buttonFalse.position(775, 19);
  buttonFalse.mousePressed(pressingfalse);


  //BUTTON NEXT 
  buttonNext = createButton('NEXT');
  buttonNext.position(200, 140);
  buttonNext.mousePressed(nextQuestion);


  // RENDERQUESTION
  textSize(17);
  text(question[stage], 460 , 280);

  // RENDERQUESTION
  text('Point: ' + score, 580, 480)


}


  function greensong(){
  greensongplay.setVolume(0.8);
  greensongplay.play();
      }

  function redsong(){
  redsongplay.setVolume(0.8);
  redsongplay.play();
  }

// FUCTION CHECK

// TRUE

function pressingtrue() {
  console.log('true was pressed')
  //correct response
  if (answers[stage] == true) {
    score++; 
    greensong() ; 
     	length = length + 50;
  }
  else {
    redsong();
    length= length-50;
  }
}

// FALSE
function pressingfalse() {
  console.log('false was pressed')
  if (answers[stage] == false) {
    score++; 
greensong();
    
  }
  else {
    redsong()
        length= length-50;
  }
    
}

function checkQuestionFalse() {
  console.log('false was pressed')

  if (question01 == false) {
    fill(255, 0, 0)
    text('You got it Right', 900 / 2, 920 / 2);
    textAlign(CENTER);
    score++
  }

  if (question01 == true) {
    fill(255, 0, 0)
    text('You got it dddd', 842 / 2, 903 / 2);
    textAlign(CENTER);
  }
}


// NEXT QUESTION
function nextQuestion() {
    console.log('next was pressed')
  stage++; 
 
  
  

  if (stage > 5) {
    endgame();
  }
}

function endgame() {
  // ending story
}// ALL IMAGE
var buttonTrue, buttonFalse, buttonNext;
// ALL IMAGE
var photo = [];
// ALL QUESTION
var question = [];


// INSIDE QUESTION
question[0] = "I ran a naked Marathon";
question[1] = "I ran a in winter";
question[2] = "I ran a summer";
question[3] = "I ran a S";
question[4] = "I ran a X";
question[5] = "I ran a A";
question[6] = "I ran a E";

// SONG
var song;
var greensong;
var redsong;

  // INSIDE ANSWER
var answers = [];
answers[0] = false; 
answers[1] = true;
answers[2] = false;
answers[3] = false;

// SCORE&STRAGE
var stage = 0;
var score = 0;


// MAIN IMAGE
function preload() {
  
  // PHOTO1
  photo[0] = loadImage('detective.png');
  
    // PHOTO2
  photo[1] = loadImage('pic2.jpg');
  
  
  // SONG
  song = loadSound('song.mp4');
  greensong = loadSound('greensong.mp4');
  redsong = loadSound('redsong.mp4');
}

function setup() {
  createCanvas(800, 700);

  // PLAY SONG
  song.setVolume(0.8);
  song.play();

}

function draw() {
  background(0, 167, 157);
  image(photo[stage], 10, 0);


  textSize(43);
  fill('White');
  text('CATCHERIN THE LIE', 500 / 2, 120);
  textFont('Futura');
  textAlign(CENTER);


  //   BUTTON

  buttonTrue = createButton('True');
  buttonTrue.position(19, 19);
  buttonTrue.mousePressed(pressingtrue);



  buttonFalse = createButton('False');
  buttonFalse.position(775, 19);
  buttonFalse.mousePressed(pressingfalse);


  //BUTTON NEXT 
  buttonNext = createButton('NEXT');
  buttonNext.position(200, 140);
  buttonNext.mousePressed(nextQuestion);


// REDERQUESTION
  text(question[stage], 430, 520);


  text('Point: ' + score, 100, 222)



}

// FUCTION CHECK

// FALSE

function pressingtrue() {
  console.log('true was pressed')
  if (answers[stage] == true) {
    score++; greensong.play();
  }
}


// FALSE
function pressingfalse() {
  console.log('false was pressed')
  if (answers[stage] == false) {
    score++; greensong.play();
 }
}

function checkQuestionFalse() {
  console.log('false was pressed')

  if (question01 == false) {
    fill(255, 0, 0)
    text('You got it Right', 900 / 2, 920 / 2);
    textAlign(CENTER);
    score++
  }

  if (question01 == true) {
    fill(255, 0, 0)
    text('You got it dddd', 842 / 2, 903 / 2);
    textAlign(CENTER);
  }
}


// NEXT QUESTION
function nextQuestion() {
  stage++;
  
  
  
  if (stage > 4) {
    endgame();
  }
}

function endgame() {
  // ending story
}var domsGlobalTime;




function setup() {
  createCanvas(400, 400);
  domsGlobalTime=0;
    console.log(1+1+3*10);
  

  
}

function draw() {
  background(220);  
  
  
      //rect1
    for(var i=0; i <10 ; i++)
    {
      rect( (i*30)+domsGlobalTime,100,25,25);
    }
  
  
  
  // rect2
  
   rect(10,200 ,+domsGlobalTime,100,25,25);
  
  
    
  // domsGlobalTime++;
  domsGlobalTime = domsGlobalTime+1;
  /// these two are the same
  console.log(domsGlobalTime);
  
}//var circleX = 0;
let r=4
let t=0

function setup() {
  createCanvas(windowWidth, windowHeight);
  //circleX=250
}

function draw() {

             //circleX=circleX+1
             let x=r*cos(t)
  						let y=r*sin(t)
  r+= 0.1
  t+= 0.1
  translate(width/2,height/2)
  fill (0)
  stroke(0)
  
  ellipse(x,y,20,20);
  
  // ELIPSE
 // ellipse(circleX,200,80,80);
}let colorR = 0;
let colorG = 0;
let colorB = 0;

function setup() {
  createCanvas(640, 800);
  colorR = random(255);
  colorG = random(255);
  colorB = random(255);

  background(255);
}

function mousePressed() {
  colorR = random(255);
  colorG = random(255);
  colorB = random(255);
}


function draw() {

  fill(colorR, colorG, colorB, 100);
  noStroke();
  ellipse(mouseX, mouseY, 20, 20);

}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  console.log("resr");
}function setup() {
  createCanvas(1200, 1200);
  //noLoop();
}

function draw() {
  background(178, 219, 191);
  noStroke();



  // head
  fill(221, 192, 142);
  rect(309, 120, 100, 70, 20, 15, 10, 5);
  ellipse(359, 178, 100, 102, 10);
  ellipse(359, 222, 38, 102, 10);
  fill(0, 100, 255);
  
  // SHADOW
  ellipse(365, 670, 260, 100);
  fill(36,123,160);



  //Arm 1 LEFT
  // strokeWeight(50);
  // line(250,250,200,200);
  stroke(10, 2, 100); //stroke, arm color
  strokeWeight(40); //stroke thickness
  line(320, 260, 260, 350); // arm
  noStroke();

  //Arm 1
  // strokeWeight(50);
  // line(250,250,200,200);
  stroke(10, 2, 100); //stroke, arm color
  strokeWeight(40); //stroke thickness
  line(450, 350, 495, 244); // arm
  noStroke();

  // CAMERA
  fill(221, 192, 142);
  rect(478, 198, 40, 40, 20, 15, 10, 5)
  fill(94, 94, 91);
  rect(450, 151, 90, 55);
  rect(478, 139, 40, 12);


  ellipseMode(CENTER);
  fill(405);
  ellipse(500, 180, 35, 35);
  fill(10);
  ellipse(500, 180, 30, 30);



  // HAT
  fill(240, 200, 100);
  rect(310, 60, 100, 70, 20, 15, 10, 5);
  rect(260, 120, 190, 10);
  fill(00, 00, 100);
  rect(310, 100, 100, 21);

  //Arm 1 RIGHT
  // strokeWeight(50);
  // line(250,250,200,200);
  stroke(10, 2, 100); //stroke, arm color
  strokeWeight(40); //stroke thickness
  line(400, 260, 450, 350); // arm
  noStroke();





  // BODY
  fill(11, 10, 108);
  rect(300, 240, 120, 200, 30);

  // FACE
  push();
  translate(335, 157);
  fill(00, 00, 00);
  rect(0, 0, 15, 20);
  rect(40, 0, 15, 20);
  pop();

  //   LEG
  fill(221, 192, 142);
  rect(305, 400, 30, 200);
  rect(385, 400, 30, 200);


  // JEAN
  fill(3, 155, 230);
  rect(300, 400, 120, 40);
  rect(300, 440, 45, 100);
  rect(375, 440, 45, 100);
  rect(375, 520, 45, 20);
  rect(300, 520, 45, 20);

  //Arm 1
  // strokeWeight(50);
  // line(250,250,200,200);
  stroke(10, 2, 100); //stroke, arm color
  strokeWeight(40); //stroke thickness
  line(260, 350, 311, 452); // arm
  noStroke();

  //WINE
  // strokeWeight(50);
  // line(250,250,200,200);
  stroke(18, 79, 39); //stroke, arm color
  strokeWeight(40); //stroke thickness
  line(340, 385, 311, 452); // arm
  noStroke();

  //Arm 1
  // strokeWeight(50);
  // line(250,250,200,200);
  stroke(18, 79, 39); //stroke, arm color
  strokeWeight(20); //stroke thickness
  line(315, 452, 366, 330);
  noStroke();

  // CORK
  push();
  fill(201, 150, 107);
  angleMode(DEGREES);
  translate(368, 307);
  rotate(25);
  rect(0, 0, 15, 20);
  pop();

  // BOOT

  rect(305, 600, 30, 55);
  rect(385, 600, 30, 55);
  rect(250, 625, 70, 30);
  rect(400, 625, 70, 30);
  fill(255, 22, 100);
  
  // SHOESSOLE
  fill(238, 255, 255);
  rect(385, 654, 85, 10);
  rect(250, 654, 85, 10);

  // LOGOSHOES
  fill(222, 222, 100);
  ellipse(320, 633, 20, 20);
  ellipse(400, 633, 20, 20);

  print(mouseX, mouseY);
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}