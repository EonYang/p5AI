var img;
var peopleSlider;
var speedSlider;
var button;
var buttonXPos;
var feet =[];
var linearSound;
var val;
var peopleval;
var tc = 5;


function preload() {
  img = loadImage('feet.png');
  linearSound = loadSound('linear.ogg');
  randomSound = loadSound('fart.wav');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  buttonXPos = width - width/1.2;
  controls();

  

  /*
  buttonRandom.mouseClicked(randomDance);
  buttonLinear.mouseClicked(linearDance);
  buttonSalsa.mouseClicked(salsaDance);
  buttonBreakdance.mouseClicked(breakDance);
  */
}

function draw() {
   // image(img, 0, 0); 
  // background(220);
  fill(90, 10, 100);
  textSize(14);
  text('Number of People',width - width/1.5, height - 100);
  text('Speed',width - width/1.5, height - 150);
  fill(2, random(0, 255), 100);
  
 	tc++;
  var tsize = constrain(tc, 5, 40);
  textSize(tsize);
  text('DANCE WITH ME',width - width/1.5, 50);
  
  val = speedSlider.value();
  randomSound.rate(val);
  linearSound.rate(val);
  
  peopleval = peopleSlider.value();
  
  
}


function keyTyped() {
  if (key === 'a') {
    linearSound.stop();
    randomDance();
    randomSound.play();
    randomSound.loop();
    
  } else if (key === 's') {
    randomSound.stop();
    linearDance();
  	linearSound.play();
    linearSound.loop();
  // uncomment to prevent any default behavior
  // return false;
}
  else if(key == 'p'){
    // tc = tc + 1;
  }


}

function controls(){
  
  peopleSlider = createSlider(2, 14, 6, 1);
  peopleSlider.position(width - width/2, height - 100);
  peopleSlider.style('width', '250px');
   
  speedSlider = createSlider(1, 10, 4, 1);
  speedSlider.position(width - width/2, height - 150);
  speedSlider.style('width', '250px');
   
//   linearSound.rate(val);
//   randomSound.rate(val);
}


function randomDance(){
  feet = [];
  clear();
  for (var i = 0; i < peopleval ; i++){
    var x = random(width);
    var y = random(height - 250);
    var strokeCol = stroke('red');
    var foot = new Feet(x, y, strokeCol);
    feet.push(foot);
  }

  
    // setInterval(function(){
    //   clear();
    for (var j=0; j<feet.length; j++){
    	feet[j].display();
   		
  		// feet[i] = new Feet(random, random);
  		feet[j].randomDance();
  // }},500
  // )
  }
 
  //   for (var j=0; j<feet.length; j++){
  //   	feet[j].display();
  // 		// feet[i] = new Feet(random, random);
  // 		feet[j].randomDance();
  // }
}

function linearDance(){
  feet =[];
  clear();
   for (var i = 0; i < peopleval ; i++){
    var x = 0.7*i * width/8;
    var y = (height - 290)/2;
    var foot = new Feet(x, y);
    feet.push(foot);
  }
  
   for (var j=0; j<feet.length; j++){
    	feet[j].display();
  		// feet[i] = new Feet(random, random);
  		feet[j].linearDance();
  }
}
/*
//function salsa
function salsaDance(){
  feet =[];
  clear();
   for (var i = 0; i < peopleSlider.value() ; i++){
    var x = this.x;
    var y = this.y; 
    var foot = new Feet(x, y);
    feet.push(foot);
  }
  
   for (var j=0; j<feet.length; j++){
    	feet[j].display();
  		// feet[i] = new Feet(random, random);
  		feet[j].salsaDance();
  }
}
//function breakdance
function breakDance(){
  feet =[];
  clear();

  // Circles placed in a circle design for taphold page
var type = 1, // circle type - 1 whole, 0.5 half, 0.25 quarter
    radius = '22em', // distance from center
    start = -162, // shift start from 0
    numberOfElements = (type === 1) ?  feet.length : feet.length - 1, //adj for even distro of elements when not full circle
    slice = 360 * type / numberOfElements;

for (var i = 0; i < feet.length ; i++){ 
    var $self = $(this),
        rotate = slice * i + start,
        rotateReverse = rotate * -1;
    
    $self.css({
        'transform': 'rotate(' + rotate + 'deg) translate(' + radius + ') rotate(' + rotateReverse + 'deg)'
    });
}
  
  
}
*/

//play music


var img;
var peopleSlider;
var speedSlider;

var button;

var buttonXPos;

var feet =[];

function preload() {
  img = loadImage('feet.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  buttonXPos = width - width/1.2;
  controls();
  buttonRandom.mouseClicked(randomDance);
  buttonLinear.mouseClicked(linearDance);
  // noLoop();
}

function draw() {
  // background(220);
  text('Number of People',width - width/1.5, height - 100);
  text('Speed',width - width/1.5, height - 150);


}



function controls(){
  
  peopleSlider = createSlider(2, 14, 6, 1);
  peopleSlider.position(width - width/2, height - 100);
  peopleSlider.style('width', '250px');
   
  speedSlider = createSlider(1, 10, 4, 1);
  speedSlider.position(width - width/2, height - 150);
  speedSlider.style('width', '250px');
    
  buttonRandom = createButton('RANDOM');
  buttonRandom.position(buttonXPos + 300, height - 50);
  buttonRandom.style('background-color', '#F6483A');
  buttonRandom.size(100,50);
  
   
  buttonLinear = createButton('LINEAR');
  buttonLinear.position(buttonXPos + 200, height - 50);
  buttonLinear.style('background-color', '#F6483A');
  buttonLinear.size(100,50);
   
  /*
  button[0] = createButton('SALSA');
  button[0].position(buttonXPos, height - 50);
  button[0].style('background-color', '#F6483A');
  button[0].size(100,50);
  
  button[1] = createButton('BREAK DANCE');
  button[1].position(buttonXPos + 100, height - 50);
  button[1].style('background-color', '#F6483A');
  button[1].size(100,50);
  */
}

function randomDance(){
  feet = [];
  clear();
  for (var i = 0; i < peopleSlider.value() ; i++){
    var x = random(width);
    var y = random(height - 250);
    var foot = new Feet(x, y);
    feet.push(foot);
  }

    for (var j=0; j<feet.length; j++){
    	feet[j].display();
  		// feet[i] = new Feet(random, random);
  		feet[j].randomDance();
  }
}

function linearDance(){
  feet =[];
  clear();
   for (var i = 0; i < peopleSlider.value() ; i++){
    var x = 1.2*i * width/14;
    var y = (height - 290)/2;
    var foot = new Feet(x, y);
    feet.push(foot);
  }
  
   for (var j=0; j<feet.length; j++){
    	feet[j].display();
  		// feet[i] = new Feet(random, random);
  		feet[j].linearDance();
  }
}

//function salsa
//function breakdance
//play music


var clink;

var testubeWidth = 100;

var xl;

var tube = [];
var tubeLine = [];

var button = []; 

var x, y;

var margin = 50;

// var j = 0;
// var j = [0, 0, 0, 0, 0, 0, 0, 0];
var j = [1, 1, 1, 1, 1, 1, 1, 1];

var xL1, xL2, yL; //line coordinates of the testtube top line



var isOverRect = [false, false, false, false, false, false, false, false]
var w = 100;
var h = 400;

var w9;

var tubeColor;

var blueColor = '#01AADC';
var greenColor = '#29C34F';
var yellowColor = '#FBB701';


var liquidH =[h, h, h, h, h, h, h, h];

function preload(){
  clink = loadSound('clink.wav');
}

function setup() {

  // clink.loop(); 
  createCanvas(windowWidth, windowHeight);
  tubeColor = color('#FFFFFF');
 	elementButtons();
  w9 = windowWidth/9;
  xl = 0;
  y = 0;
 
  x = 0.5*w9;
  
  setInterval(function(){x = x + w9; }, 500); //moving the yellow rectangle
}


function draw() {
  background(220);
  
	//lower white rectangle
  fill(255);
  noStroke();
  rectMode(CENTER);
  rect(windowWidth/2, windowHeight - 150/2, windowWidth, 150);
 
  //tubes
  stroke('#404040');
  strokeWeight(3);
  for(var i = 1.5; i < 9 ; i++){
    tube[i] = rect(i*w9-w9/2, (windowHeight - 150)/2, w , h, 0, 0, 50, 50);
    tubeLine[i]= line(i*w9-xL1, yL, i*w9-xL2, yL);
  }
  
  playRectangle();
  checkMouse();
	increaseLiquid();
  
}



function playRectangle(){
  rectMode(CORNER);
  //if(frameCount % 60 == 0){
    noStroke();
    tint(255, 50);
    fill('#FBB701');
    tint(255, 127);
  // console.log(frameCount);
    rect(x ,y,w9, windowHeight - 150);
    //x = x + 0.5*w9;
  

  if(x > windowWidth || x == 8.5*w9){
    x = 0.5*w9;
  }
  if( x == 0.5*w9){
    if(!clink.isPlaying()){
      // console.log(j[0]);
      clink.play(0,0.2*j[0], 0.6, 0, 0.1);
      console.log(j[0]);
    }
  }
  if( x == 1.5*w9){
    if(!clink.isPlaying()){
   	 clink.play(0,0.2*j[1], 0.6, 0, 0.1);
    }
  }
   if( x == 2.5*w9){
    if(!clink.isPlaying()){
   	 clink.play(0,0.2*j[2], 0.6, 0, 0.1);
    }
  }
   if( x == 3.5*w9){
    if(!clink.isPlaying()){
   	 clink.play(0,0.2*j[3], 0.6, 0, 0.1);
    }
  }
   if( x == 4.5*w9){
    if(!clink.isPlaying()){
   	 clink.play(0,0.2*j[4], 0.6, 0, 0.1);
    }
  }
   if( x == 5.5*w9){
    if(!clink.isPlaying()){
   	 clink.play(0,0.2*j[5], 0.6, 0, 0.1);
    }
  }
   if( x == 6.5*w9){
    if(!clink.isPlaying()){
   	 clink.play(0,0.2*j[6], 0.6, 0, 0.1);
    }
  }
   if( x == 7.5*w9){
    if(!clink.isPlaying()){
   	 clink.play(0,0.2*j[7], 0.6, 0, 0.1);
    }
  }
   if( x == 8.5*w9){
    if(!clink.isPlaying()){
   	 clink.play(0,0.2*j[8], 0.6, 0, 0.1);
    }
  }
}

function mousePressed(){
  

  for (var i = 0; i < isOverRect.length; i++){
    if(isOverRect[i] == true){
        liquidH[i] = liquidH[i] - (j[i]*100);
      
        liquidH[i] = constrain(liquidH[i],0,h);//height would be 400, 300, 200, 100, 0  
      	j[i]++;
      }
    }
	}




function elementButtons(){
  button[4] = createButton('REMOVE');
  button[4].position(windowWidth - 300, windowHeight - 100);
  button[4].style('background-color', '#F6483A');
  button[4].size(100,50);
  button[4].mousePressed(removeLiquid);
}


function removeLiquid(){
	console.log("removed");
}

function increaseLiquid(){
  rectMode(CORNER);
 
  fill('#01AADC');
  noStroke();
 	rect(1.5*w9 - w9 + 30, ((windowHeight - 150)/2)-h/2, w , h, 0, 0, 50, 50);
 	rect(2.5*w9 - w9 + 30, ((windowHeight - 150)/2)-h/2, w , h, 0, 0, 50, 50);
 	rect(3.5*w9 - w9 + 30, ((windowHeight - 150)/2)-h/2, w , h, 0, 0, 50, 50);
 	rect(4.5*w9 - w9 + 30, ((windowHeight - 150)/2)-h/2, w , h, 0, 0, 50, 50);
 	rect(5.5*w9 - w9 + 30, ((windowHeight - 150)/2)-h/2, w , h, 0, 0, 50, 50);
 	rect(6.5*w9 - w9 + 30, ((windowHeight - 150)/2)-h/2, w , h, 0, 0, 50, 50);
 	rect(7.5*w9 - w9 + 30, ((windowHeight - 150)/2)-h/2, w , h, 0, 0, 50, 50);
 	rect(8.5*w9 - w9 + 30, ((windowHeight - 150)/2)-h/2, w , h, 0, 0, 50, 50);
  
  fill('#FFFFFF');
  rect(1.5*w9 - w9 + 30, ((windowHeight - 150)/2)-h/2, w , liquidH[0], 0, 0, 50, 50);
 	rect(2.5*w9 - w9 + 30, ((windowHeight - 150)/2)-h/2, w , liquidH[1], 0, 0, 50, 50);
 	rect(3.5*w9 - w9 + 30, ((windowHeight - 150)/2)-h/2, w , liquidH[2], 0, 0, 50, 50);
 	rect(4.5*w9 - w9 + 30, ((windowHeight - 150)/2)-h/2, w , liquidH[3], 0, 0, 50, 50);
 	rect(5.5*w9 - w9 + 30, ((windowHeight - 150)/2)-h/2, w , liquidH[4], 0, 0, 50, 50);
 	rect(6.5*w9 - w9 + 30, ((windowHeight - 150)/2)-h/2, w , liquidH[5], 0, 0, 50, 50);
 	rect(7.5*w9 - w9 + 30, ((windowHeight - 150)/2)-h/2, w , liquidH[6], 0, 0, 50, 50);
 	rect(8.5*w9 - w9 + 30, ((windowHeight - 150)/2)-h/2, w , liquidH[7], 0, 0, 50, 50);
  
  
}

function checkMouse(){
  
  // i*w9-w9/2, (windowHeight - 150)/2
  
    if(mouseX > 1.5*w9 - w9+ 30 && mouseX < 1.5*w9 - w9+ 30+ w && mouseY > ((windowHeight - 150)/2)-h/2 && mouseY < ((windowHeight - 150)/2) + h/2){
      isOverRect[0] = true;
    } else {
      isOverRect[0] = false; 
    }
  
   if(mouseX > 2.5*w9 - w9 + 30&& mouseX < 2.5*w9 - w9+ w+ 30 && mouseY > ((windowHeight - 150)/2)-h/2 && mouseY < ((windowHeight - 150)/2) + h/2){
      isOverRect[1] = true;
    } else {
      isOverRect[1] = false; 
    }
  
  if(mouseX > 3.5*w9 - w9+ 30 && mouseX < 3.5*w9 - w9+ w + 30 && mouseY > ((windowHeight - 150)/2)-h && mouseY < ((windowHeight - 150)/2) + h/2){
      isOverRect[2] = true;
    } else {
      isOverRect[2] = false; 
    }
  
   if(mouseX > 4.5*w9 - w9+ 30 && mouseX < 4.5*w9 - w9+ w + 30 && mouseY > ((windowHeight - 150)/2)-h/2 && mouseY < ((windowHeight - 150)/2) + h/2){
      isOverRect[3] = true;
    } else {
      isOverRect[3] = false; 
    }
  
   if(mouseX > 5.5*w9 - w9+ 30 && mouseX < 5.5*w9 - w9+ w+ 30 && mouseY > ((windowHeight - 150)/2)-h/2 && mouseY < ((windowHeight - 150)/2) + h/2){
      isOverRect[4] = true;
    } else {
      isOverRect[4] = false; 
    }
  
   if(mouseX > 6.5*w9 - w9+ 30 && mouseX < 6.5*w9 - w9+ w+ 30 && mouseY > ((windowHeight - 150)/2)-h/2 && mouseY < ((windowHeight - 150)/2) + h/2){
      isOverRect[5] = true;
    } else {
      isOverRect[5] = false; 
    }
  
    if(mouseX > 7.5*w9 - w9+ 30 && mouseX < 7.5*w9 - w9+ w+ 30 && mouseY > ((windowHeight - 150)/2)-h/2 && mouseY < ((windowHeight - 150)/2) + h/2){
      isOverRect[6] = true;
    } else {
      isOverRect[6] = false; 
    }
   
    if(mouseX > 8.5*w9 - w9+ 30 && mouseX < 8.5*w9 - w9+ w+ 30 && mouseY > ((windowHeight - 150)/2)-h/2 && mouseY < ((windowHeight - 150)/2) + h/2){
      isOverRect[7] = true;
    } else {
      isOverRect[7] = false; 
    }
}

//if playRectangle is on tube[i], 
//check liquidH[i]
//if liquidH[i] = n*initialliquidH, loop the song n times

 
var testubeWidth = 100;

var button = [];

var lx1, lx2, ly1, ly2;


function setup() {
  
  createCanvas(windowWidth, windowHeight);

  lx1 = 0;
  lx2 = 0;
  ly1 = 0;
  ly2 = windowHeight -150;
 	elementButtons();

}

function draw() {
  
  background(220);
  fill(255);
  noStroke();
  rect(0, windowHeight - 150, windowWidth, 150);
  stroke('red');
  strokeWeight(4);  
  point(120, 50);  
  point(120+testubeWidth, 50);  
  point(120+testubeWidth, 50+250-(testubeWidth/2));  
  point(120, 50+250-(testubeWidth/2));  
  
  beginShape();
  	// noFill();
  	fill('#404040');
  	stroke(0);
  	strokeWeight(1);
  	// noStroke();
  	
  	vertex(120+testubeWidth, 450); 	//top right
  	// vertex(120+testubeWidth, 50+250-(testubeWidth/2));
  	// noStroke();
  	curveVertex(120+testubeWidth, 50); //entry point
  	curveVertex(120+testubeWidth, 50+(windowHeight - 250)-(testubeWidth/2)); //bottom right
  	curveVertex(120, 50+(windowHeight - 250)-(testubeWidth/2)); //bottom left
  	curveVertex(120, 50); //exit point
  
 		// vertex(120, 50+250-(testubeWidth/2))
  	vertex(120, 50);	//top left
  endShape();
 
  strokeWeight(4);
	playLine();
 
  //draw a beaker
  //draw a flask
  //draw a round flask
  
}

function playLine(){
  
  line(lx1, ly1, lx2, ly2);
  
  lx1 = lx1 +1;
  lx2 = lx2 +1;
  
  if(lx1 > windowWidth || lx1 == windowWidth){
    lx1 = 0;
    lx2 = 0;
  }
 
}

function elementButtons(){
  button[1] = createButton('');
  button[1].position(100, windowHeight - 100);
  button[1].style('background-color', '#01AADC');
  button[1].size(50,50);

  button[2] = createButton('');
  button[2].position(200, windowHeight - 100);
  button[2].style('background-color', '#29C34F');
  button[2].size(50,50);
  
  
  button[3] = createButton('');
  button[3].position(300, windowHeight - 100);
  button[3].style('background-color', '#FBB701');
  button[3].size(50,50);
  
  button[3] = createButton('REMOVE');
  button[3].position(windowWidth - 300, windowHeight - 100);
  button[3].style('background-color', '#F6483A');
  button[3].size(100,50);
  
}


let outputP;
var adverbs = {};
var verbs = [];
var netflixCategories = {};
// var fortuneTelling = {};
var fortuneSentences =[];
var activity = {};
var activity_in_sentence = [];
var moods = {};

function preload(){
  adverbs = loadJSON('adverbs.json');
  verbsPast = loadJSON('verbs.json');
  netflixCategories = loadJSON('netflixCategories.json');
  fortuneTelling = loadJSON('fortuneTelling.json');
  activity = loadJSON('activities.json');
  moods = loadJSON('moods.json');
}

function setup() { 
  noCanvas();
  background(255);
  textAlign(LEFT, TOP);
  textSize(30);
  textStyle(BOLD);
  createP("Are you interested in");
  outputP = createP("");
  grammarSource.adverb_in_sentence = adverbs.adverbs;
  
  //verbs
  for(var i = 0; i<verbsPast.verbs.length; i++){
   verbs.push(verbsPast.verbs[i].past);
    grammarSource.verbsPast = verbs;
     
  }
  grammarSource.netflixCategories = netflixCategories.categories;
  grammarSource.moods = moods.moods;
  
  
  //fortune telling
  for(var i = 0; i<fortuneTelling.tarot_interpretations.length; i++){
    for(var j = 0; j<fortuneTelling.tarot_interpretations[i].meanings.light.length; j++){
    	fortuneSentences.push(fortuneTelling.tarot_interpretations[i].meanings.light[j]);
    	 // print(fortuneTelling.tarot_interpretations[i].meanings.light[j]);
      grammarSource.fortuneSentences = fortuneSentences;
     
    }
  }
  
  //activity
  for(var i = 0; i < activity.categories.length; i++){
    for(var j = 0; j < activity.categories[i].examples.length; j++){
   	 activity_in_sentence.push(activity.categories[i].examples[j]);
    	grammarSource.activity_in_sentence = activity_in_sentence;
      console.log(activity_in_sentence);
    }
  }
  
} 

function draw() { 
  }

function keyPressed() {
  mousePressed();
}

function mousePressed() {
  var grammar = tracery.createGrammar(grammarSource);
  grammar.addModifiers(tracery.baseEngModifiers);
  var output = grammar.flatten("#origin#");
  outputP.html(output);
  
}

// cut and paste your grammar below (as the value for variable "grammarSource")
var grammarSource = {


  "origin": "#[#number#][#plural_nouns#][#netflixCategories#][#verbsPast#][#adverb_in_sentence#]story#",
  "story": ["#number# #plural_nouns# that #adverb_in_sentence# #verbsPast# #fortuneSentences#",
           "Here's why #activity_in_sentence# #will# make you feel #moods#"
           ],
  
  "number":["10","14","12","3","8","6","15","5"],
  "plural_nouns":["gifs","clips","sets","pairs","sentences","articles","tricks","Youtube videos"],  //10
  "netflixCategories":netflixCategories.categories,
  "verbsPast" :verbs,
 	"adverb_in_sentence": adverbs.adverbs,
  "fortuneSentences":fortuneSentences,
  "will":["could","would","will","can"],
  "activity_in_sentence":activity_in_sentence,
  "moods":moods
};let outputP;
var adverbs = {};
var verbs = [];
var netflixCategories = {};
var fortuneTelling = {};
var fortuneSentences =[];
var activity = {};
var activity_in_sentence = [];
var moods = {};

function preload(){
  adverbs = loadJSON('adverbs.json');
  verbsPast = loadJSON('verbs.json');
  netflixCategories = loadJSON('netflixCategories.json');
  fortuneTelling = loadJSON('fortuneTelling.json');
  activity = loadJSON('activities.json');
  moods = loadJSON('moods.json');
}

function setup() { 
  noCanvas();
  background(255);
  textAlign(LEFT, TOP);
  textSize(30);
  textStyle(BOLD);
  createP("Are you interested in");
  outputP = createP("");
  grammarSource.adverb_in_sentence = adverbs.adverbs;
  
  //verbs
  for(var i = 0; i<verbsPast.verbs.length; i++){
   verbs.push(verbsPast.verbs[i].past);
    grammarSource.verbsPast = verbs;
  }
  grammarSource.netflixCategories = netflixCategories.categories;
  grammarSource.moods = moods.moods;
  
  
  //fortune telling
  for(var i = 0; i<fortuneTelling.tarot_interpretations.length; i++){
    for(var j = 0; j<fortuneTelling.tarot_interpretations[i].meanings.light.length; j++){
    	fortuneSentences.push(fortuneTelling.tarot_interpretations[i].meanings.light[j]);
    	 // print(fortuneTelling.tarot_interpretations[i].meanings.light[j]);
      grammarSource.fortuneSentences = fortuneSentences;
    }
  }
  
  //activity
  for(var i = 0; i < activity.categories.length; i++){
    for(var j = 0; j < activity.categories[i].examples.length; j++){
   	 activity_in_sentence.push(activity.categories[i].examples[j]);
    	grammarSource.activity_in_sentence = activity_in_sentence;
    }
  }
  
} 

function draw() { 
  }

function keyPressed() {
  mousePressed();
}

function mousePressed() {
  var grammar = tracery.createGrammar(grammarSource);
  grammar.addModifiers(tracery.baseEngModifiers);
  var output = grammar.flatten("#origin#");
  outputP.html(output);
  
}

// cut and paste your grammar below (as the value for variable "grammarSource")
var grammarSource = {


  "origin": "#[#number#][#plural_nouns#][#netflixCategories#][#verbsPast#][#adverb_in_sentence#]story#",
  "story": ["#number# #plural_nouns# that #adverb_in_sentence# #verbsPast# #fortuneSentences#",
           "Here's why #activity_in_sentence# #will# make you feel #moods#"
           ],
  
  "number":["10","14","12","3","8","6","15","5"],
  "plural_nouns":["gifs","clips","sets","pairs","sentences","articles","tricks","Youtube videos"],  //10
  "netflixCategories":netflixCategories.categories,
  "verbsPast" :verbs,
 	"adverb_in_sentence": adverbs.adverbs,
  "fortuneSentences":fortuneSentences,
  "will":["could","would","will","can"],
  "activity_in_sentence":activity_in_sentence,
  "moods":moods
};let outputP;

function setup() { 
  noCanvas();
  background(255);
  textAlign(LEFT, TOP);
  textSize(30);
  textStyle(BOLD);
  createP("Are you interested in");
  outputP = createP("");
 
} 

function draw() { 
 
}

function keyPressed() {
  mousePressed();
}

function mousePressed() {
  var grammar = tracery.createGrammar(grammarSource);
  grammar.addModifiers(tracery.baseEngModifiers);
  var output = grammar.flatten("#origin#");
  outputP.html(output);
}

// cut and paste your grammar below (as the value for variable "grammarSource")
var grammarSource = {
  "origin": "#[#number#][#plural#][#netflixCategories#][#verb#]story#",
  "story": "#number#\n#plural#\n#netflixCategories.a#\nshould\n#verb#",
  
  "number":["10","14","25","3"],
  "plural":["ways","gifs","clips",""],  //10
  "netflixCategories":["Action & Adventure",
    "Action Comedies",
    "Action Sci-Fi & Fantasy",
    "Action Thrillers",
    "Adult Animation",
    "Adventures",
    "African Movies",
    "Alien Sci-Fi",
    "Animal Tales",
    "Anime",
    "Anime Action",
    "Anime Comedies",
    "Anime Dramas",
    "Anime Fantasy",
    "Anime Features",
    "Anime Horror",
    "Anime Sci-Fi",
    "Anime Series",
    "Art House Movies",
    "Asian Action Movies",
    "Australian Movies",
    "B-Horror Movies",
    "Baseball Movies",
    "Basketball Movies",
    "Belgian Movies",
    "Biographical Documentaries",
    "Biographical Dramas",
    "Boxing Movies",
    "British Movies",
    "British TV Shows",
    "Campy Movies",
    "Children & Family Movies",
    "Chinese Movies",
    "Classic Action & Adventure",
    "Classic Comedies",
    "Classic Dramas",
    "Classic Foreign Movies",
    "Classic Movies",
    "Classic Musicals"],
  
  verb:[ "clear",
  				"clip",
          "close",
          "coach",
          "consist",
           "cross"]
         
  
  
         
    
};function setup() {
  noCanvas();
  createP("Click to step through the simulation.");
}

function draw() {
  background(220);
}

function keyPressed() {
  mousePressed();
}

function mousePressed() {
  let storyEvents = n.stepAndRender();
  if (storyEvents.length > 0) {
    for (let ev of storyEvents) {
      createP(ev);
    }
  }
}

let n = new seaduck.Narrative({
  "nouns": [
    {
      "name": "Chris",
      "properties": {
        "sleepiness": 0
      },
      "tags": ["person"]
    },
    {
      "name": "king-size bed",
      "properties": {
        "occupied": false
      },
      "tags": ["bed"]
    },
  ],
  "actions": [
    {
      "match": ["Chris"],
      "when": function(a) {
        return a.properties.sleepiness < 10;
      },
      "action": function*(a) {
        a.properties.sleepiness++;
        yield new seaduck.StoryEvent("moreSleepy", a);
      }
    },
    {
      "match": ["Chris"],
      "when": function(a) {
        return a.properties.sleepiness == 7;
      },
      "action": function*(a) {
        yield new seaduck.StoryEvent("reallySleepy", a);
      }
    },
    {
      "match": ["Chris", "king-size bed"],
      "when": function(a, b) {
        return a.properties.sleepiness >= 10 
          && !this.isRelated("sleepingIn", a, b)
          && !b.properties.occupied;
      },
      "action": function*(a, b) {
        this.relate("sleepingIn", a, b);
        b.properties.occupied = true;
        yield new seaduck.StoryEvent("getsInto", a, b);
      }
    },
    {
      "match": ["Chris", "king-size bed"],
      "when": function(a, b) {
        return this.isRelated("sleepingIn", a, b);
      },
      "action": function*(a, b) {
        yield new seaduck.StoryEvent("asleep", a, b);
      }
    }
  ],
  "traceryDiscourse": {
    "moreSleepy": [
      "#nounA# yawns.",
      "#nounA#'s eyelids droop.",
      "#nounA# nods off for a second, then perks up.",
      "#nounA# says, 'I could use a cup of coffee.'",
      "'I don't think I can stay awake a minute longer,' says #nounA# to no one in particular.",
      "#nounA# checks their watch."
    ],
    "adverb": ["at last", "finally", "not a moment too soon"],
    "getsInto": [
      "#adverb.capitalize#, #nounA# gets into the #nounB#.",
      "#adverb.capitalize#, #nounA# climbs into the #nounB#."
    ],
    "asleep": [
      "#nounA# is asleep in the #nounB#.",
      "#nounA# snores beneath the covers of the #nounB#.",
      "#nounA# sleep-mumbles peacefully in the #nounB#."
    ],
    "reallySleepy": [
      "#nounA# is really sleepy.",
      "'I'm just about ready to hit the hay,' says #nounA#.",
      "You can tell just by looking at them that #nounA# really needs some rest."
    ],
    "_end": [
      "Good night."
    ]
  }
});



//variable for buttons to select all Buttons on the page
//plus a i?
var buttons = document.querySelectorAll('button'),i;

//a for loop
//for each button in the array
for (i = 0; i < buttons.length; i++) {

	//for each button add an event listener with a function
  buttons[i].addEventListener('click', function() {
		//find out if the button is pressed or not
    var pressed = document.getElementById('pressed');
		//unpack the value of pressed
		//parsing?
		//add a | to each value
    pressed.value += this.value + "|";
		// pressed value is 1 2 3 
    
		
		//video card 1
		//if user presses video card 1
		//and if user types in dit
		//if pressed.value === 1
		//then correctAnswer
		//if pressed.value === 2
	
		
		if (pressed.value === '1|') {
			//do something
      alert('You unlocked it!');
    }
		//clear the string if pressed too much
    if (pressed.value.length >= 6) {
      //Start over
      pressed.value = "";
    }
		//what is false?
  }, false);
}let outputP;

function setup() { 
  noCanvas();
  background(255);
  textAlign(LEFT, TOP);
  textSize(24);
  outputP = createP("Click to generate");
} 

function draw() { 
}

function keyPressed() {
  mousePressed();
}

function mousePressed() {
  var grammar = tracery.createGrammar(grammarSource);
  grammar.addModifiers(tracery.baseEngModifiers);
  var output = grammar.flatten("#origin#");
  outputP.html(output);
}

// cut and paste your grammar below (as the value for variable "grammarSource")
var grammarSource = {
  "origin": "#[#setElements#][#setMood#][#setNothing#]story#",
  "story": "#intro#\n#feeling#\n#spotted#\n#action#\n#idea#\n#conclusion#",
  "setElements":["[day: hot day][drink: ice cream][drinkFrom: bottle][place: New York][sat: hoarding][found: candies]",
             "[day: rainy day][drink: gin and tonic][drinkFrom: flask][place: Tisch][sat: window][found: roasted peanuts]"
             ],
  
  "setMood":["[crowAdjective: drunk][crowFeeling: anti-social][crowLost: no contancts]",
             "[crowAdjective: talented][crowFeeling: excited][crowLost: all limit]"
            ],
  
  "setActions":["push his head","put his feet", "reach with this wings"],
  
  "ideaVerbs":["screamed","licked", "knocked", "smoked"],
  
  "travel":["jumped","walked", "bicycled"],
  
  "intro": ["One  #day.a# a #crowAdjective# crow #travel# all over #place# looking for #drink#. For a long time, he could not find any." ],
  
  "feeling": ["He felt very #crowFeeling#, almost lost #crowLost#."],
  
  "spotted":["Suddenly, he saw a #drinkFrom# below the #sat#. He #travel# to see if there was any #drink# inside. Yes, there was!"],
  
  "action":["The crow tried to #setActions# into the #drinkFrom#. Sadly, he found that the neck of the #drinkFrom# was too narrow."],

  "idea":["The crow #ideaVerbs# hard for a while. Then, looking around it, he saw some #found#. He suddenly had a good idea. He started picking up the #found# one by one, dropping each into the #drinkFrom#. "],
  
  "conclusion":["As more and more #found# filled the #drinkFrom#, the #drink# level kept rising. Soon it was high enough for the crow to drink. His plan had worked!"]
  
};

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
	for(var i = 0 ; i<3;i++){
	int income = map(int x, 0, 3, 0, 9);
  println(x);
	}
}let mgr;
let you;

let mask;

let race_slider;
let race;

let inc_slider;
let inc;

// let age_slider;
// let age;

let edu_slider;
let edu;

let buttonPressed;

let buttonW = 200;
let buttonH = 50;

function preload(){
  roboto = loadFont('assets/RobotoMono.ttf');

  map = loadImage('assets/island_bam.png');

  blackf = loadImage('assets/bf.jpg');
  whitef = loadImage('assets/wf.jpg');
  hispf = loadImage('assets/hf.jpg');
  asianf = loadImage('assets/af2.jpg');

  blackm = loadImage('assets/bm.jpg');
  whitem = loadImage('assets/wm.jpg');
  hispm = loadImage('assets/hm.jpg');
  asianm = loadImage('assets/am.jpg');

  mask1a = loadImage('assets/mask1a.png');
  mask1b = loadImage('assets/mask1b.png');
  mask2a = loadImage('assets/mask2a.png');
  mask2b = loadImage('assets/mask2b.png');
  mask3a = loadImage('assets/mask3a.png');
  mask3b = loadImage('assets/mask3b.png');

  you = blackf;
  mask = mask2a;

}


function setup()
{
    mgr = new SceneManager();

    createCanvas(1100, 800);

    rectMode(CENTER);
    textAlign(CENTER);

    textFont(roboto);
    textSize(16);

    race_slider = createSlider(0, 1000, 100);
    race = race_slider.value();
    race_slider.position(10, 10);

    inc_slider = createSlider(0, 1000, 100);
    inc = inc_slider.value();
    inc_slider.position(10, 50);

    edu_slider = createSlider(0, 1000, 100);
    edu = edu_slider.value();
    edu_slider.position(10, 90);

    // Preload scenes. Preloading is normally optional
    // ... but needed if showNextScene() is used.
    mgr.addScene ( Intro );
    mgr.addScene ( Profile );
    mgr.addScene ( Game );
    mgr.addScene ( Prompt );
    mgr.addScene ( Outro );

    // mgr.showNextScene();
    mgr.showScene( Intro );

}

function showNextScene() {
    mgr.showNextScene();
}

function draw()
{
    mgr.draw();
    console.log(buttonPressed);
}

function mousePressed()
{
    mgr.mousePressed();
}

function keyPressed()
{
    // You can optionaly handle the key press at global level...
    switch(key)
    {
        case '1':
        console.log("1 is pressed");
            mgr.showScene( Intro );
            break;
        case '2':
        console.log("2 is pressed");

            mgr.showScene( Profile );
            break;
        case '3':
        console.log("3 is pressed");

            mgr.showScene( Game );
            break;
        case '4':
        console.log("4 is pressed");
            mgr.showScene( Prompt );
            break;
        case '5':
        console.log("5 is pressed");
            mgr.showScene( Outro );
            break;
    }

    // ... then dispatch via the SceneManager.
    mgr.keyPressed();
}

function button(x,y, buttonText){
  push();
  fill(225,0,225);
  rect(x,y,buttonW,buttonH);
  fill(255);
  text(buttonText, x,y+5);
  pop();
}

class Intro {
  draw() {
      background(map,1);
      fill(255);
      rect(width/2,height/2,500,200);
      fill(0);
      text("Welcome to housingsearch.com!", width/2, height/2-30);
      text("We're here to help you find the perfect home. :)", width/2, height/2);
      text("TURN THE KNOBS TO START.", width/2, height/2+40);
      // button(width/2,height/2+50, "START")

  }

}

class Profile {
  draw() {
      background(0);

      button(width/2,height-100, "SEARCH");

      fill(255);
      text("First, tell us a little bit about who you are.", width/2, height/4);
      text("you are this person!", width/2, height-height/3);
      image(you, width/2-100,height/4+30,200,200);

      race = race_slider.value();
      inc = inc_slider.value();
      edu = edu_slider.value();

      push();
        textSize(14);
        text("race is " + race, 200, 25);
        text("income is " + inc, 200, 65);
        text("edu is " + edu, 200, 105);
      pop();

      if (race >= 0 && race< 250) {
        if (edu >= inc){
          you = blackf;
        }

        else if (edu < inc){
          you = blackm;
        }
      }

      if (race >= 250 && race< 500) {
        if (edu >= inc){
          you = whitef;
        }

        if (edu < inc){
          you = whitem;
        }
      }

      if (race >= 500 && race<750) {
        if (edu >= inc){
          you = asianf;
        }

        if (edu < inc){
          you = asianm;
        }
      }

      if (race >= 750 && race<1000) {
        if (edu >= inc){
          you = hispf;
        }

        if (edu < inc){
          you = hispm;
        }
      }
    }
}

class Game {

  draw() {
    background(map,1);

    if (you==hispf || you==hispm){
      if (inc > 800){
      mask = mask1b;
      }
      if (inc <= 800 && inc > 400){
      mask = mask2a;
      }
      if (inc <= 400){
      mask = mask3a;
      }
    }

    if (you==blackf || you==blackm){
      if (inc > 800){
      mask = mask1b;
      }
      if (inc <= 800 && inc > 400){
      mask = mask2b;
      }
      if (inc <= 400){
      mask = mask3b;
      }
    }

    if (you==asianf || you==asianm){
      if (inc > 800){
      mask = mask1a;
      }
      if (inc <= 800 && inc > 400){
      mask = mask2a;
      }
      if (inc <= 400){
      mask = mask3a;
      }
    }

    if (you==whitef || you==whitem){
      if (inc > 800){
      mask = mask1a;
      }
      if (inc <= 800 && inc > 400){
      mask = mask1b;
      }
      if (inc <= 400){
      mask = mask2a;
      }
    }

    image(mask, 0,0,width,height);

    // fill(255,0,0);
    // text("STUFF HAPPENS ON THE MAP!", width/2, height/2);
    image(you, width-100,0,100,100);
    // button(width/2,height-100, "TRY AGAIN");

  }
}

class Prompt {

  draw() {

    background(0);
    button(width/2,height-100, "I'M FEELING LUCKY");

    fill(255);
    text("What did you think of your results? What if you tried something different?", width/2, height/2);
  }
}


class Outro {

    draw() {
      background(0);
      button(width/2,height-100,"START OVER");

      fill(255);
      text("forcefeeding you the message of the game", width/2, height/2);
    }
}
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var options = {baudrate: 9600}; // change the data rate to whatever you wish

var serial;          // variable to hold an instance of the serialport library
var inData;   

var filters;



function setup() {
  createCanvas(600, 600);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', print);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName, options);
  
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
 var inString = serial.readLine();
  
	if (inString.length > 0 ) {
    // debugger;
  // convert it to a number:
  	inData = Number(inString);
   
  } 
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
  
}

function draw() {
  background(0);
  fill(255);
  textSize(60);
 
  if (inData >= 0 && inData < 80) {
    filters = floor(map(inData, 0, 79, 0, 5));
  } else if (inData >= 80 && inData < 160) {
    filters = floor(map(inData, 80, 159, 5, 9));
  } else if (inData >= 160 && inData < 240) {
    filters = floor(map(inData, 160, 239, 9, 14));
  }
  print(filters);
  
  if (filters == 0){
    print('black');
  	text("Black", 30, 100);
  }
  if (filters == 1){
    print('white');
  	text("White", 30, 100);
  }
  if (filters == 2){
    print('asian');
  	text("Asian", 30, 100);
  }
  if (filters == 3){
    print('hispanic');
  	text("Hispanic", 30, 100);
  }
  if (filters == 4){
    print('other');
  	text("Other", 30, 100);
  }
  
  //income filters
  
  if (filters == 5){
    print('lower class');
  	text("Lower Class", 30, 150);
  }
  
  if (filters == 6){
    print('middle class');
  	text("Middle Class", 30, 150);
  }
  
  if (filters == 7){
    print('upper middle class');
  	text("Upper Middle Class", 30, 150);
  }
   if (filters == 8){
    print('upper class');
  	text("Upper Class", 30, 150);
  }
  
  if(inData == 163){
    print('Search pressed');
  	text("Searched", 30, 300);
     }
  
  //education filters
  
  if (filters == 9){
    print('Didnt Finish H.S');
  	text("Didn't Finish H.S.", 30, 250);
  }
  
  if (filters == 10){
    print('High-school or equivalent');
  	text("High-school or equivalent", 30, 250);
  }
  
  if (filters == 11){
    print('Some college/Associates Degree');
  	text("Some college/Associates Degree", 30, 250);
  }
  
   if (filters == 12){
    print('Bachelors Degree');
  	text("Bachelor's Degree", 30, 250);
  }
  
    if (filters == 13){
    print('Advanced Degree');
  	text("Advanced Degree", 30, 250);
  }
  
}
var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var options = { baudrate: 9200};
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data

var buttons = [];
var buttonName = ["left","right"];

function setup() {
 createCanvas(400, 400);          // make the canvas
 serial = new p5.SerialPort();    // make a new instance of the serialport library
 serial.on('list', printList);  // set a callback function for the serialport list event
 serial.on('connected', serverConnected); // callback for connecting to the server
 serial.on('open', portOpen);        // callback for the port opening
 serial.on('data', serialEvent);     // callback for when new data arrives
 serial.on('error', serialError);    // callback for errors
 serial.on('close', portClose);      // callback for the port closing
 serial.list();                      // list the serial ports
 serial.open(portName, options); 
  
  for(let i = 0; i < 2; i++){
	let button = createButton(buttonName[i]);
	button.id("button"+i);
	buttons.push(button);
	}
  buttonFocused(0);
}

function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

function serialEvent() {
 // read a byte from the serial port:
 inData = Number(serial.read());
 // store it in a global variable:
 // inData = inByte;
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
function serverConnected() {
  print('connected to server.');
}

let currentlyFocused;
function buttonFocused(idx){
  	document.getElementById("button"+String(idx)).style.color = "white";
    document.getElementById("button"+String(idx)).style.backgroundColor = "red";
		currentlyFocused = idx;
  	// console.log(idx);
}

function buttonNotFocused(idx){
  	document.getElementById("button"+String(idx)).style.color = "black";
    document.getElementById("button"+String(idx)).style.backgroundColor = "white";
		currentlyNotFocused = idx;
  	// console.log(idx);
}

function buttonPress(){
  	document.getElementById("button"+String(currentlyFocused)).style.color = "white";
    document.getElementById("button"+String(currentlyFocused)).style.backgroundColor = "black";
		setTimeout(function(){
      document.getElementById("button"+String(currentlyFocused)).style.color = "black";
      document.getElementById("button"+String(currentlyFocused)).style.backgroundColor = "white";
      }, 200);
}

function draw(){
 background(220);
  // buttonFocused(0);
  if(inData == 0){
      text("button left", 100, 100);
      buttonFocused(0);
      buttonNotFocused(1);
  }
  if(inData == 1){
    text("button right", 100, 100);
    buttonFocused(1);
    buttonNotFocused(0);
  }
  
  if(inData == 2){
      ellipse(width/2, height/2, 50, 50);
      buttonPress();
  }
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;    


var buttons = [];
var buttonName = ["left","right"];
var buttonOver = [255, 125];
var x;
var y;
// var inData;

var col; 




function setup() { 
  createCanvas(400, 400);
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.list();                      // list the serial ports
  serial.open(portName); 
	// for(let i = 0; i < 2; i++){
	// let button = createButton(buttonName[i]);
	// button.id("button"+i);
	// // button.mousePressed(changeBG);
	// // button.mouseOver(mouseOver);
	// // button.mouseOut(mouseOut);
	// buttons.push(button);
	// }
}

function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

function serialEvent() {
 // read a byte from the serial port:
 inData = serial.read();
 // store it in a global variable:
 // inData = inByte;
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
function serverConnected() {
  print('connected to server.');
}


// function changeBG(event) { 
//   let buttonName = event.target.innerHTML;
//   console.log(buttonName);
//   if(buttonName == "left"){
//     	ellipse(100,100,100,100);
//   }else{
// 			rect(100,100,100,100);
//   }
//   // for (i = 0; i < 2; i++){
//   // var col = buttonOver[i];
//   // }
// }

function draw(){
  background(col);
  fill(255);
 if(inData == 0){
    // text(inData, 100, 100);
    console.log("0");
  	// buttonFocused(0);
  }
  	if(inData == 1){
       // text(inData, 200, 100);
      console.log("1");
   		// buttonFocused(1);
  	}
}



// let currentlyFocused;
// function buttonFocused(idx){
//   	document.getElementById("button"+String(idx)).style.color = "white";
//     document.getElementById("button"+String(idx)).style.backgroundColor = "red";
// 		currentlyFocused = idx;
// }

// function buttonPress(){
//   	document.getElementById("button"+String(currentlyFocused)).style.color = "white";
//     document.getElementById("button"+String(currentlyFocused)).style.backgroundColor = "black";
// 		setTimeout(function(){
//       document.getElementById("button"+String(currentlyFocused)).style.color = "black";
//       document.getElementById("button"+String(currentlyFocused)).style.backgroundColor = "white";
//       }, 200);
// }

// function mouseOut(){
//   document.getElementById("button"+String(currentlyFocused)).style.color = "black";
//   document.getElementById("button"+String(currentlyFocused)).style.backgroundColor = "white";
// }

// function hover(){
//   let buttonName = event.target.innerHTML;
//   if(inData == 0){
//     // text(inData, 100, 100);
//     console.log("0");
//   	// buttonFocused(0);
//   }
//   	if(inData == 1){
//        // text(inData, 200, 100);
//       console.log("1");
//    		// buttonFocused(1);
//   	}
//   		// else{
//   		// mouseOut();
//   		// }
// }

var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data
 
function setup() {
 createCanvas(400, 400);          // make the canvas
 serial = new p5.SerialPort();    // make a new instance of the serialport library

  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);    
}

function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

function serialEvent() {
 // read a byte from the serial port:
 var inByte = serial.read();
 // store it in a global variable:
 inData = inByte;
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
function serverConnected() {
  print('connected to server.');
}

function draw(){
 background(220);
   // if(inData == 0);
    console.log(inData);
}

// function mousePressed(){
//   if( mouseX>50 && mouseX<100 && mouseY>50 && mouseY<100){ //deflation
//     outByte = 100;
//      }
//  if( mouseX>150 && mouseX<200 && mouseY>50 && mouseY<100){ //inflation
//     outByte = 200;
//      }
// 	serial.write(outByte);
// }
 


var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;   // for outgoing data

var buttons = [];
var buttonName = ["left","right"];
var buttonOver = [255, 125];
var x;
var y;
// var inData;

var col; 

function portOpen() {
  print('the serial port opened.');
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}
function serverConnected() {
  print('connected to server.');
}
 
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

function serialEvent() {
 // read a byte from the serial port:
 inData = serial.read();
 // store it in a global variable:
 // inData = inByte;
}



function setup() { 
  createCanvas(400, 400);
  serial = new p5.SerialPort();    // make a new instance of the serialport library
 	serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
	serial.list();                      // list the serial ports
  serial.open(portName);   
   for(let i = 0; i < 2; i++){
      let button = createButton(buttonName[i]);
      button.id("button"+i);
      button.mousePressed(changeBG);
      button.mouseOver(mouseOver);
      button.mouseOut(mouseOut);
      buttons.push(button);
	}
}

function changeBG(event) { 
  let buttonName = event.target.innerHTML;
  console.log(buttonName);
  if(buttonName == "left"){
    	ellipse(100,100,100,100);
  }else{
			rect(100,100,100,100);
  }
  // for (i = 0; i < 2; i++){
  // var col = buttonOver[i];
  // }
}

function draw(){
  background(col);
  fill(255);
  ellipse(x,y, 20, 20);
}



let currentlyFocused;
function buttonFocused(idx){
  	document.getElementById("button"+String(idx)).style.color = "white";
    document.getElementById("button"+String(idx)).style.backgroundColor = "red";
		currentlyFocused = idx;
}

function buttonPress(){
  	document.getElementById("button"+String(currentlyFocused)).style.color = "white";
    document.getElementById("button"+String(currentlyFocused)).style.backgroundColor = "black";
		setTimeout(function(){
      document.getElementById("button"+String(currentlyFocused)).style.color = "black";
      document.getElementById("button"+String(currentlyFocused)).style.backgroundColor = "white";
      }, 200);
}

function mouseOut(){
  document.getElementById("button"+String(currentlyFocused)).style.color = "black";
  document.getElementById("button"+String(currentlyFocused)).style.backgroundColor = "white";
}

function mouseOver(){
  let buttonName = event.target.innerHTML;
  if(inData == 0){
    text(inData, 100, 100);
    console.log("0");
  	// buttonFocused(0);
  }
  	if(inData == 1){
       text(inData, 200, 100);
      console.log("1");
   		// buttonFocused(1);
  	}
  		// else{
  		// mouseOut();
  		// }
}

// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Exercise 9-8: Write a Button class (see Example 5-5 
// for a non-object-oriented button). The button 
// class should register when a mouse is pressed over 
// the button and change color.  Create button objects 
// of different sizes and locations using an array. 
// Before writing the main program, sketch out the 
// Button class. Assume the button is off  when it 
// first appears.  

// An array of buttons
var buttons = new Array(6);

function setup() {
  createCanvas(600, 200);
  // A loop to evenly space out the buttons along the window
  for (var i = 0; i < buttons.length; i++) {
    buttons[i] = new Button(i*100+25, height/2-25, 50, 50);
  }
}

function draw() {
  background(175);
  // Show all the buttons
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].display();
  }
}

function mousePressed() {
  // When the mouse is pressed, we must check every single button
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].click(mouseX, mouseY);
  }
}var buttons = [];
var buttonName = ["left","right"];
var buttonOver = [255, 125];
var x;
var y;
// var inData;

var col; 

function setup() { 
  createCanvas(400, 400);
  for(let i = 0; i < 2; i++){

    let button = createButton(buttonName[i]);
    button.id("button"+i);
    button.mousePressed(changeBG);
    button.mouseOver(circle);
    buttons.push(button);

  }
}

function changeBG(event) { 
  let buttonName = event.target.innerHTML;
  console.log(buttonName);
  if(buttonName == "left"){
    	ellipse(100,100,100,100);
  }else{
			rect(100,100,100,100);
  }
  // for (i = 0; i < 2; i++){
  // var col = buttonOver[i];
  // }
}

function draw(){
  background(col);
  fill(255);
  ellipse(x,y, 20, 20);
}

function serialEvent(){
  
}

let currentlyFocused;
function buttonFocused(idx){
  	document.getElementById("button"+String(idx)).style.color = "white";
    document.getElementById("button"+String(idx)).style.backgroundColor = "red";
		currentlyFocused = idx;
}
function buttonPress(){
  	
  	document.getElementById("button"+String(currentlyFocused)).style.color = "white";
    document.getElementById("button"+String(currentlyFocused)).style.backgroundColor = "black";
		setTimeout(function(){
      document.getElementById("button"+String(currentlyFocused)).style.color = "black";
      document.getElementById("button"+String(currentlyFocused)).style.backgroundColor = "white";
      
    }, 200);
}
function mousePressed(){
 	if(mouseX < width/2){
  	buttonFocused(0);
  }else{
    buttonPress();
  }
}
function circle(event){
//   let buttonName = event.target.innerHTML;
//   console.log(buttonName);
//   if(buttonName == "left"){
    	
//   }else{
// 			fill(255);
//   }
//   x = random(400);
//   y = random(400);
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data
 

function serialEvent() {
 // read a byte from the serial port:
 inData = Number(serial.read());
 // store it in a global variable:
 
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
function serverConnected() {
  print('connected to server.');
}


var button1;
var button2;
function setup() {
  createCanvas(400, 400);
  background(0);
  serial = new p5.SerialPort();    // make a new instance of the serialport library
 	serial.on('data', serialEvent);  // callback for when new data arrives
 	serial.on('error', serialError); // callback for errors
 	serial.open(portName);           // open a serial port
}

function draw(){
  background(0);
  fill(255);
  text("xaxis:" + inData, 50, 50);
  //  button1 = createButton('button1');
  // button1.position(19, 19);
  // if( inData == 0){
  // button1.mousePressed(changeBG);
  // }
  // button2 = createButton('button2');
  // button2.position(100, 19);
  // if( inData == 1){
  // button2.mousePressed(showText);
  // }
}

// function changeBG() {
  
//   var val = random(100);
//   background(val);

// }

// function showText(){
//   fill(255);
//   text("hey!!!", 50, 100);
// }let di;
let di_2;
let oldNum = 10;
let diceNumber = 0;
let newNum;
let button;

let roundCrossed = 1;

let start = 10;


function setup() { 
	button = createButton("roll the dice").mousePressed(roll);
  createCanvas(600, 600);
	di = width/ (1 + (1/4));
	di_2 = width/2;
} 

function draw() { 
  background(255);
  board();
}

function board() {
  noStroke();
	fill(204,204,255);
	ellipse(width/2, height/2, di);
	if (oldNum < newNum) {
	oldNum ++;
	}


   if( oldNum - start >= (14 * roundCrossed) ){
    console.log("crossed " + roundCrossed);
    roundCrossed++;
    // roundCrossed = 2;
  }

  
	fill(255);
	let cXval = (width/2 + (di_2/1.55) * Math.cos(2 * oldNum * (Math.PI / 14) + (Math.PI / 15))); //x coordinate of centre of small circles
	let cYval = (height/2 + (di_2/1.55) * Math.sin(2 * oldNum * (Math.PI / 14) + (Math.PI / 15)));//y coordinate of centre of small circles
	ellipse( cXval, cYval, 50, 50);
	fill(125);
	textSize(14);
	noStroke();
	textAlign(CENTER);
	text("PAYDAY", width/2, (((height/2) - (di/2)) + ((height/2) - (di_2/2)))/(1 + (9/10)));
  stroke(153, 153, 255);
	for(i = 0; i < 14; i++) {
    xVal = (width/2 + (di/2) * Math.cos(2 * Math.PI * i / 14));
    yVal = (height/2 + (di/2) * Math.sin(2 * Math.PI * i / 14));
		line(width/2, height/2, xVal, yVal);
	}
	fill(255);
	noStroke();
	ellipse(width/2, height/2, di_2);
  fill(0);
  textSize(24);
  text(diceNumber + "", 20, 80);
}

function roll() {
  diceNumber = Math.floor((Math.random() * 6) + 1);
  newNum = oldNum + diceNumber;
}
var baseRadius = 50;
 var baseCircle 


var nCircles = 7;
var startAngle = 15.0;

function setup(){
  createCanvas(400, 400);
}


var circles = new Array();

function calcCircles(n) {
    // circles.splice(0); // clear out old circles
    var angle = Math.PI / n;
    var s = Math.sin(angle);
    var r = baseRadius * s / (1-s);
    console.log(angle);
    console.log(s);
    console.log(r);


    for(var i=0;i<n;++i) {
        var phi = startAngle + angle * i * 2;
        var cx = 150+(baseRadius + r) * Math.cos(phi);
        var cy = 150+(baseRadius + r) * Math.sin(phi);
        circles.push(new Circle(cx,cy,r));
    }
}

function draw() {
  background(220);
  calcCircles(7);
  baseCircle = new Circle(150,150,50);
  baseCircle.draw();
  circles.forEach(function(ele){ele.draw()});
}

let di;
let di_2;

function setup() { 
  createCanvas(600, 600);
	di = width/ (1 + (1/4));
	di_2 = width/2;
  // angleMode(DEGREE);
  // ellipseMode(RADIUS);
} 

function draw() { 
  background(255);
  board();
}

function board() {
  noStroke();
	fill(204,204,255);
	ellipse(width/2, height/2, di);
	fill(125);
	textSize(14);
	noStroke();
	textAlign(CENTER);
	text("PAYDAY", width/2, (((height/2) - (di/2)) + ((height/2) - (di_2/2)))/(1 + (9/10)));
  stroke(153, 153, 255);
	for(i = 0; i < 14; i++) {
    var xVal = (width/2 + (di/2) * Math.cos(2 * Math.PI * (i / 14)));
    var yVal = (height/2 + (di/2) * Math.sin(2 * Math.PI * (i / 14)));
		line(width/2, height/2, xVal, yVal);
    fill(0);
    var xValc = (width/2 + (di_2/1.55) * Math.cos(2 * i * (Math.PI / 14) + (Math.PI / 15))); //x coordinate of centre of small circles
    var yValc = (height/2 + (di_2/1.55) * Math.sin(2 * i * (Math.PI / 14) + (Math.PI / 15)));//y coordinate of centre of small circles
    ellipse( xValc, yValc, 50, 50);
	}
	fill(255);
	noStroke();
	ellipse(width/2, height/2, di_2);
}

function roll() {
  let diceWidth = 100;
  let diceHeight = 100;
  let rectWidth = 100;
  let rectHeight = 40;
  stroke(0);
  rect((width/2) - (diceWidth/2), (height/(1 + (7/8))) - diceHeight, diceWidth, diceHeight);
  fill(0);
  ellipse(width/2, height/(2 + (1/5)), 20);
  rect((width/2) - (rectWidth/2), (height/(1 + (1/2))) - rectHeight, rectWidth, rectHeight);
  fill(255);
  noStroke();
  textSize(21);
  text("Roll!", (width/2), (height/(1 + (11/20))));
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  noStroke();
 fill(255, 0, 0);
  rect( 50, 50, 50, 50);
   fill(0, 255, 0);
   rect( 150, 50, 50, 50);
  }

function mousePressed(){
  if( mouseX>50 && mouseX<100 && mouseY>50 && mouseY<100){
    console.log("0");
     }
  if( mouseX>150 && mouseX<200 && mouseY>50 && mouseY<100){
    console.log("1");
     }
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data
 
function setup() {
 createCanvas(400, 400);          // make the canvas
 serial = new p5.SerialPort();    // make a new instance of the serialport library
 serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);    
}

function serialEvent() {
 // read a byte from the serial port:
 var inByte = serial.read();
 // store it in a global variable:
 inData = inByte;
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
function serverConnected() {
  print('connected to server.');
}

function draw(){
  background(220);
  noStroke();
 	fill(255, 0, 0);
  rect( 50, 50, 50, 50);
  fill(0, 255, 0);
  rect( 150, 50, 50, 50);
}

function mousePressed(){
  if( mouseX>50 && mouseX<100 && mouseY>50 && mouseY<100){ //deflation
    outByte = 100;
     }
 if( mouseX>150 && mouseX<200 && mouseY>50 && mouseY<100){ //inflation
    outByte = 200;
     }
	serial.write(outByte);
}
 
let button = {
  x: 50,
  y: 160
};

let milliseconds;

// let k = 0;

let buttonA = '#723E83';
let buttonB = '#9C5CAE';
let buttonC = '#F47DA8';
let buttonD = '#F9B3D0';

let buttonClickedA = false;
let buttonClickedB = false;
let buttonClickedC = false;
let buttonClickedD = false;


function mousePressed() {
  if (mouseX > button.x && mouseX < button.x + 500 && mouseY > button.y && mouseY < button.y + 50) {
    buttonClickedA = true;
    
  }
  
   if (mouseX > button.x && mouseX < button.x + 500 && mouseY > button.y + 70 && mouseY < button.y + 70 + 50) {
    buttonClickedB = true;
  }
  
  if (mouseX > button.x && mouseX < button.x + 500 && mouseY > button.y + 140 && mouseY < button.y + 140 + 50) {
   
    buttonClickedC = true ;
  }
  
  if (mouseX > button.x && mouseX < button.x + 500 && mouseY > button.y + 210 && mouseY < button.y + 210 + 50) {
    buttonClickedD = true;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(25);
  textFont("Avenir");
  angleMode(DEGREES);
}

function draw() {
  background(0);
  noStroke();
	
 	//Task buttons
  fill(buttonA);
  rect(button.x, button.y, 500, 50); // button A
  fill(buttonB);
  rect(button.x, button.y + 70,500, 50); //button B
  fill(buttonC);
  rect(button.x, button.y + 140, 500, 50); //button C
  fill(buttonD);
  rect(button.x, button.y + 210, 500, 50); //button D

  //button names
  fill(255);
  text("Goals", button.x, button.y - 25);
  text("Have 1 million in savings by retirement", button.x + 17, button.y + 33);
  text("Buy a Mercedes by 35years old", button.x + 17, button.y + 70 + 33);
  text("Buy a Boat", button.x + 17, button.y + 140 + 33);
  text("Be Joey", button.x + 17, button.y + 210 + 33);

  if (buttonClickedA == true) {
     text("Meet the goal: Have 1 million in savings by retirement", button.x, button.y - 100);
  }
  
  if (buttonClickedB == true) {
     text("Meet the goal: Buy a Mercedes by 35years old", button.x, button.y - 100);
  }
  
  if (buttonClickedC == true) {
     text("Meet the goal: Buy a Boat", button.x, button.y - 100);
  }
  
  if (buttonClickedD == true) {
     text("Meet the goal: Be Joey", button.x, button.y - 100);
  }
  
  //drawing the board game
  noFill();
  stroke(255);
  ellipse(width - 500, height - 450, 700, 700);
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}/*
 * @name Input and Button
 * @description You will need to include the 
 * <a href="http://p5js.org/reference/#/libraries/p5.dom">p5.dom library</a>
 * for this example to work in your own project.<br><br>
 * Input text and click the button to see it affect the the canvas.
 */
var input, button, goal_1, goal_2, goal_3, goal_4;

function setup() {

  // create canvas
  createCanvas(710, 400);

  // input = createInput();
  // input.position(20, 65);

  button = createButton('Have 1 million in savings by retirement');
  button.position(0, 65);
  button.mousePressed(goal_1mil);

  button = createButton('Buy a Mercedes by 35years old');
  button.position(0, 105);
  button.mousePressed(goal_merc);
  
  button = createButton('Buy a Boat');
  button.position(0, 145);
  button.mousePressed(goal_boat);

  button = createButton('Be Joey');
  button.position(0, 185);
  button.mousePressed(goal_joey);
  

  textAlign(CENTER);
  textSize(50);
}

function goal_1mil() {
  // var name = input.value();
  // greeting.html('hello '+name+'!');
  // input.value('');
 goal_1= createElement('h2', 'Goal: Have 1 million in savings by retirement');
  goal_1.position(20, 5);
}

function goal_merc() {
  // var name = input.value();
  // greeting.html('hello '+name+'!');
  // input.value('');
  // goal_1mil.remove();
	goal_2 = createElement('h2', 'Goal: Buy a Mercedes by 35years old');
  goal_2.position(20, 5);
}

function goal_boat() {
  // var name = input.value();
  // greeting.html('hello '+name+'!');
  // input.value('');
	goal_3 = createElement('h2', 'Goal: Buy a Boat');
  goal_3.position(20, 5);
}

function goal_joey() {
  // var name = input.value();
  // greeting.html('hello '+name+'!');
  // input.value('');
	goal_4 = createElement('h2', 'Goal: Be Joey');
  goal_4.position(20, 5);
}
let directions;
let menu;
let username;
let password;
let goal_1mil;

function setup() { 
  fields();
}

function fields() {
//   directions = createP("Select your bank");
//   let banks = ["Bank of America", "Chase", "Citi", "Wells Fargo", "PNC", "Capital One", "TD Bank"]; 
  
  menu = createSelect();
  for (i = 0; i < banks.length; i++) {
    menu.option(banks[i]);
  }
  
//   username = createInput("johnDoe");
//   password = createInput("***********");
  goal_1mil = createButton('Have 1 million in savings by retirement');
  goal_1mil.mousePressed(screen_2);
}let directions;
let menu;
let username;
let password;
let submit;

function setup() { 
  fields();
}

function fields() {
  directions = createP("Select your bank");
  let banks = ["Bank of America", "Chase", "Citi", "Wells Fargo", "PNC", "Capital One", "TD Bank"]; 
  
  menu = createSelect();
  for (i = 0; i < banks.length; i++) {
    menu.option(banks[i]);
  }
  
  username = createInput("johnDoe");
  password = createInput("***********");
  submit = createButton('submit');
  submit.mousePressed(screen_2);
}let debt = 1200;
let savings = 1200;

let years = 0;

let savingsInterest = 0;
let debtInterest = 0;

let timer = 0;

let i;

let x;

function setup(){
  createCanvas(700, 600);
  setInterval(time,1000);
  setInterval(calculations, 7000);
}

function draw(){
  background(220);
  text("Savings: " + savings.toFixed(2), 80, 80);
  text("Savings Interest: " + savingsInterest.toFixed(2), 80, 120);
  text("Debt: " + debt.toFixed(2), 80, 160);
  text("Debt Interest: " + debtInterest.toFixed(2), 80, 200);
 text("Timer: " + timer, 80, 40);
  text("Years: " + years, 200, 40); //7 secs = 1 years
  let x = map(savings, 1200, 41997.79, 0, 12);
  ellipse(400, 250, x, x);

}

function time() {
  // if (timer > 0) {
  	timer++; // subtract time by one
    
  // }
}

function calculations(){
  if (timer > 0 && timer < 210) {
    years++;
    t = 12 * years; //compounding frequency = 12
    i = (1/100) / 12; //i = r/n
    savings = 100 * (1+i)*((pow(i+1,t)-1)/i); //rate of interest = 1%, 
    savingsInterest = savings -  (100 * 12 * years);

    debtInterest = ((15/365)/100) * 1200 * 365 * years; // rate of interest = 15%
    debt = debt + debtInterest;

  }
}

// SPIROGRAPH
// http://en.wikipedia.org/wiki/Spirograph
// also (for inspiration):
// http://ensign.editme.com/t43dances
//
// this p5 sketch uses simple transformations to create a
// Spirograph-like effect with interlocking circles (called sines).  
// press the spacebar to switch between tracing and
// showing the underlying geometry.
//
// your tasks:
// (1) tweak the code to change the simulation so that it draws something you like.
// hint: you can change the underlying system, the way it gets traced when you hit the space bar,
// or both.  try to change *both*.  :)
// (2) use p5.sound or tone.js to make the simulation MAKE SOUND.
// hint: the websites for p5.sound and tone.js have lots of examples.
// try and adapt them.
// another hint: javascript isn't super efficient with a large number of audio playing at once.
// see if there's a simple way to get an effective sound, or limit the number of shapes
// you're working with.

var NUMSINES = 20; // how many of these things can we do at once?
var sines = new Array(NUMSINES); // an array to hold all the current angles
var rad; // an initial radius value for the central sine
var i; // a counter variable
var oscs = new Array(NUMSINES);

//var pitches = [40, 42];
//var pitches = [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78];

// play with these to get a sense of what's going on:
var fund = 0.05; // the speed of the central sine
var ratio = .1; // what multiplier for speed is each additional sine?
var alpha = 50; // how opaque is the tracing system

 // var trace = false; // are we tracing?

function setup()
{
  createCanvas(800, 600); // OpenGL mode

  rad = height/8; // compute radius for central circle
  background(255); // clear the screen
  
  for (i = 0; i<sines.length; i++){
    sines[i] = PI;
    oscs[i] = new p5.Oscillator();
    oscs[i].setType('sine');
    oscs[i].freq(240*(i+1));
    //oscs[i].freq(midiToFreq(pitches[i]));
    oscs[i].amp(0);
    oscs[i].start();
  }

  for (i = 0; i<sines.length; i)
  {
    sines[i] = PI; // start EVERYBODY facing NORTH
  }
}

function draw()
{
  if (!trace) {
    background(255); // clear screen if showing geometry
    stroke(1, 155, 48, 132); // black pen
    noFill(); // don't fill
  } 

  // MAIN ACTION
  push(); // start a transformation matrix
  translate(width/2, height/2); // move to middle of screen

  for (i = 0; i<sines.length; i++) // go through all the sines
  {
    oscs[i].amp((sin(sines[i])*2.-1.)*.1);
    
    var erad = 0; // radius for small "point" within circle... this is the 'pen' when tracing
    // setup for tracing
    if (trace) {
      stroke(59, 113, 155*(float(i)/sines.length), alpha); // blue
      //fill(59, 113, 155, alpha/2); // also, um, blue
      erad = 5.0*(1.0-float(i)/sines.length); // pen width will be related to which sine
    }
    var radius = rad/(i+1); // radius for circle itself
    rotate(sines[i]); // rotate circle
    if (!trace) rect(0, 0, radius*2, radius*2); // if we're simulating, draw the sine
    push(); // go up one level
    translate(0, radius); // move to sine edge
    if (!trace) rect(0, 0, 5, 5); // draw a little circle
    if (trace) rect(0, 0, erad, erad); // draw with erad if tracing
    pop(); // go down one level
    translate(0, radius); // move into position for next sine
    sines[i] = (sines[i]+(fund+(fund*i*ratio)))%TWO_PI; // update angle based on fundamental
  
    
  }
  
  pop(); // pop down final transformation
  
}

function keyReleased()
{
  if (key==' ') {
    trace = !trace; 
    background(255);
  }
}

let screen_1 = true;
let screen_2 = false;
let direction;
let dWidth;
let buttons = [];
let incomes = [46633, 58862, 79271, 83084, 67814, 44015, 51358, 33747];
let userIncome;
let categories = ["Expenses", "Emergency", "Savings"];
// let timer = 30;
// let months = 0; // months passed
// let savings = 300;
// let interest = 0;x
// let debt = 100;
// let minimum = 0; // minimum payment amount
// let showButton = false; // make min payment button not shown

class Button {
  constructor(rectX, rectY, rectWidth, rectHeight, age, textX, textY) {
    this.rectWidth = rectWidth;
    this.rectHeight = rectHeight;
    this.rectX = rectX;
    this.rectY = rectY;
    this.age = age;
    this.textX = textX;
    this.textY = textY;
  }
  
  show() {
    fill(255);
    rect(this.rectX, this.rectY, this.rectWidth, this.rectHeight);
    fill(0);
    text(this.age, this.textX, this.textY);
  }
}

class Category {
  constructor(category, initialAmount, catY) {
    this.copy = category + ": " + initialAmount + "%" ;
    this.catWidth = textWidth(this.copy);
    this.amount = initialAmount;
    this.catY = catY;
  }
  
  show() {
    textSize(20);
    fill(0);
    text(this.copy, (width/2) - (this.catWidth/2), (height/5) + this.catY);
    fill(255);
    rect(this.catWidth, this.catY + 65, 20, 20); 
    rect(width - this.catWidth, this.catY + 65, 20, 20); 
  }
}

function setup() { 
  createCanvas(400, 400);
  rectWidth = 100;
  rectHeight = 35;
  rectX = width/2 - (rectWidth + 5);
  rectY = height/3 - (rectHeight/2);
  let age = 25;
  let tWidth = textWidth(age);
  let textX = (rectX + (rectWidth/2)) - (tWidth/2);
  let textY = rectY + ((rectHeight/2) + (textAscent()/2));
  for (i = 0; i < 8; i++) {
    buttons.push(new Button(rectX, rectY, rectWidth, rectHeight, age, textX, textY));
    if (this.rectX >= width/4) {
      rectX = width/2 - (rectWidth + 5);
      rectY += rectHeight + 10;
      textX = (rectX + (rectWidth/2)) - (tWidth/2);
      textY += rectHeight + textAscent();
    } else {
      rectX += rectWidth + 10;
      textX += rectWidth + 10;
    }
    age += 9;
  }
  let catY = 80;
  for (i = 0; i < categories.length; i++) {
    categories.splice(i,1,new Category(categories[i], 0, catY));
    catY += 40;
  }
  // setInterval(time, 3000); // timer interval
  // if (timer > 0) { 
  //   setInterval(function() { // show make min payment button every 7 secs
  //   showButton = true;
  // }, 7000);
  // }
  // setInterval(function() { // increment num of months by 1 every 7 secs
  //   if (timer > 0) {
  //     months ++;
  //     debt = debt + (debt * ((13/12)/100)); // add interest to debt
  //   	minimum = (debt * ((13/12)/100)) + debt*(2/100); // calculate min payment amount
  //   	interest = interest + (savings * ((5/12)/100)); // add interest to savings
  //   }
  // }, 7000);
} 

function draw() { 
  background(220);
  if (screen_1) {
    direction = "How old are you?";
    dWidth = textWidth(direction);
    textSize(20);
    fill(0);
    text(direction, width/2 - (dWidth/2), height/5);
    for(i = 0; i < buttons.length; i++) {
      buttons[i].show();
    }
  }
  if (screen_2) {
    direction = "Split your income into the following: ";
    dWidth = textWidth(direction);
    inWidth = textWidth("Income: $" + userIncome);
    textSize(20);
    fill(0);
    text(direction, width/2 - (dWidth/2), height/5);
    text("Income: $" + userIncome, width/2 - (inWidth/2), (height/5) + 40);
    for(i = 0; i < categories.length; i++) {
      categories[i].show();
    }
  }
  // if (screen_3) {
  //   textSize(20);
  //   text("Time: " + timer, 30, 40);
  //   text("Months Passed: " + months, width - 200, 40);
  //   text("Debt: $" + debt.toFixed(2), 30, 120);
  //   text("Minimum Payment: $" + minimum.toFixed(2), 30, 160);
  //   text("Savings: $" + (savings+interest).toFixed(2), 30, 200);
  //   text("Interest: $" + interest.toFixed(2), 30, 240);
  //   if (months > 0 && months%3 == 0) { // display compound button every 3 months
  //     fill(255);
  //     rect(width - 130, height - 50 , 100, 35);
  //     fill(0);
  //     textSize(15);
  //     text("Compound", width - 117, height - 27);
  //   }
  //   if (timer > 0 && showButton && interest > minimum) { // displays make min payment button and sets showButton to false
  //     fill(255);
  //     rect(30, height - 50, 200, 35);
  //     fill(0);
  //     textSize(15);
  //     text("Make minimum Payment", 46, height - 27);
  //     setTimeout(function(){ showButton = false; }, 3500);
  //   }
  // }
}

// function time() {
//   if (timer > 0) {
//   	timer--; // subtract time by one
//   }
// }

function mouseClicked() {
  for (i = 0; i < buttons.length; i++) {
    if (screen_1) {
      if (mouseX > buttons[i].rectX && mouseX < (buttons[i].rectX + buttons[i].rectWidth) && mouseY > buttons[i].rectY && mouseY < (buttons[i].rectY + buttons[i].rectHeight)) {
        userIncome = incomes[i];
        screen_1 = false;
        screen_2 = true;
      }
    }
  }
  // if (mouseX > 30 && mouseX < 230 && mouseY > height - 50 && mouseY < height - 25) { // make min payment button clicked
  //   if (interest > minimum) {
  //   	interest = interest - minimum;
  //   	minimum = 0;
  //   }
  // } else if (mouseX > width - 130 && mouseX < width - 30 && mouseY > height - 50 && mouseY < height - 25) {
  //   if (months > 0 && months%4 == 0) { // compound button pressed
  //     savings = savings + interest;
  //     interest = 0;
  //   }
  // }
}
let timer = 120;
let months = 0; // months passed
let years = 0;
let savings = 300;
let interest = 0;
let debt = 100;
let minimum = 0; // minimum payment amount

let showButton = false; // make min payment button not shown

let debtHeight;
let savingsHeight;



function setup() { 
  createCanvas(700, 600);
	rectMode(CORNERS);
  setInterval(time, 1000); // timer interval
  if (timer > 0) { 
    setInterval(function() { // show make min payment button every 7 secs
    showButton = true;
  }, 7000);
  }
  setInterval(function() { // increment num of months by 1 every 7 secs
    if (timer > 0) {
      months ++;
      debt = debt + (debt * ((13/12)/100)); // add interest to debt
    	minimum = (debt * ((13/12)/100)) + debt*(2/100); // calculate min payment amount
    	interest = interest + (savings * ((5/12)/100)); // add interest to savings
       if ( months > 0 && months % 12 == 0){
    		years++;
      }
    }
  }, 7000);
} 

function draw() { 
 
  background(220);
  textSize(20);
  fill(0);
  text("Time: " + timer, 30, 40);
  text("Months Passed: " + months, width - 200, 40);
  text("Years Passed: " + years, width - 200, 80);
  text("Debt: $" + debt.toFixed(2), 30, 120);
  text("Minimum Payment: $" + minimum.toFixed(2), 30, 160);
  text("Savings: $" + (savings+interest).toFixed(2), 30, 200);
  text("Interest: $" + interest.toFixed(2), 30, 240);

  
  if (months > 0 && months%3 == 0) { // display compound button every 3 months
    fill(255);
    rect(width - 130, height - 15 , width - 30, height - 50);
    fill(0);
  	textSize(15);
    text("Compound", width - 117, height - 27);
    
  }
  if (showButton) { // displays make min payment button and sets showButton to false
  	fill(255);
  	rect(30, height - 15, 230, height - 50);
    fill(0);
  	textSize(15);
  	text("Make minimum Payment", 46, height - 27);
    setTimeout(function(){ showButton = false; }, 7000);
  }
  
  // visualizing debt
//    fill(255, 0, 0);
//   noStroke();
//   debtHeight = height - (150 + debt);
//   rect( width - 350, height - 150, width - 250, debtHeight );
//   // console.log(height-debt);
 


//   // visualizing savings
//   fill(50, 205, 50);
//   noStroke();
//   savingsHeight = height - (150 + savings + interest);
//   rect( width - 200, height - 150, width - 100, savingsHeight );
//   // console.log(height-debt);
 }
       

function time() {
  if (timer > 0) {
  	timer--; // subtract time by one
  }
}

function mouseClicked() {
  if (mouseX > 30 && mouseX < 230 && mouseY > height - 50 && mouseY < height - 25) { // make min payment button clicked
    interest = interest - minimum;
    minimum = 0;
  } else if (mouseX > width - 130 && mouseX < width - 30 && mouseY < height - 15 && mouseY > height - 50) {
    // console.log("clicked");
    if (months > 0 && months%4 == 0) { // compound button pressed
      savings = savings + interest;
      interest = 0;
      
    }
  }
}

let timer = 30;
let months = 0; // months passed
let savings = 300;
let interest = 0;
let debt = 100;
let minimum = 0; // minimum payment amount
let showButton = false; // make min payment button not shown

function setup() { 
  createCanvas(400, 400);
  setInterval(time, 3000); // timer interval
  if (timer > 0) { 
    setInterval(function() { // show make min payment button every 7 secs
    showButton = true;
  }, 7000);
  }
  setInterval(function() { // increment num of months by 1 every 7 secs
    if (timer > 0) {
      months ++
    }
  }, 7000);
} 

function draw() { 
 
  background(220);
  textSize(20);
  text("Time: " + timer, 30, 40);
  text("Months Passed: " + months, width - 200, 40);
  text("Debt: $" + debt.toFixed(2), 30, 120);
  text("Minimum Payment: $" + minimum.toFixed(2), 30, 160);
  text("Savings: $" + (savings+interest).toFixed(2), 30, 200);
  text("Interest: $" + interest.toFixed(2), 30, 240);
  if (months > 0 && months%3 == 0) { // display compound button every 3 months
    fill(255);
    rect(width - 130, height - 50 , 100, 35);
    fill(0);
  	textSize(15);
    text("Compound", width - 117, height - 27);
  }
  if (showButton) { // displays make min payment button and sets showButton to false
  	fill(255);
  	rect(30, height - 50, 200, 35);
    fill(0);
  	textSize(15);
  	text("Make minimum Payment", 46, height - 27);
    setTimeout(function(){ showButton = false; }, 3500);
  }
}

function time() {
  if (timer > 0) {
  	timer--; // subtract time by one
    debt = debt + (debt * ((13/12)/100)); // add interest to debt
    minimum = (debt * ((13/12)/100)) + debt*(2/100); // calculate min payment amount
    interest = interest + (savings * ((5/12)/100)); // add interest to savings
  }
}

function mouseClicked() {
  if (mouseX > 30 && mouseX < 230 && mouseY > height - 50 && mouseY < height - 25) { // make min payment button clicked
    interest = interest - minimum;
    minimum = 0;
  } else if (mouseX > width - 130 && mouseX < width - 30 && mouseY > height - 50 && mouseY < height - 25) {
    if (months > 0 && months%4 == 0) { // compound button pressed
      savings = savings + interest;
      interest = 0;
    }
  }
}var time = 1;
var r = 0;
// var rate;
var A; // Total Amount
var P = 300;
var n = 1;
var power;
let totalAmount;

function setup(){
  createCanvas(700, 600);
  textFont('Avenir');
  textSize(25);
}

function draw(){
  background(220);
  
  //Time
  text("Time Period", 55, 55);
  text (time, 75, 87);
  rect( 50, 70, 20, 20); // minus button
  text("-", 55, 87);
  rect( 100, 70, 20, 20); //plus button
  text("+", 105, 87);
  
  // //Rate of Interest
  // text("Rate of Interest", 55, 150);
  // // rate = nf(r,2,2);
  // text (r + "%", 75, 185);
  // rect( 50, 170, 20, 20); // minus button
  // text("-", 55, 185);
  // rect( 170, 170, 20, 20); //plus button
  // text("+", 175, 185);
  
  //Calculating Compound Interest
  text( "Total Amount:" + totalAmount , 200, 300);
  power = time * 12;
  A = P * pow(1.004 ,power); //interest rate = 5%
  totalAmount = nf(A, 4, 2);
  // A = nf(Amount, 3, 0);
}

function mousePressed(){
  if(mouseX > 50 && mouseX < 70 && mouseY > 70 && mouseY < 90){
    time--;
  }
  
  if(mouseX > 100 && mouseX < 120 && mouseY > 70 && mouseY < 90){
    time++;
  }
   
  
  //rate of interest button
  if(mouseX > 50 && mouseX < 70 && mouseY > 170 && mouseY < 190){
    r = r - 1;
    // rate = int(r);
  }
  
  if(mouseX > 170 && mouseX < 190 && mouseY > 170 && mouseY < 190){
  r = r + 1;
  // rate = int(r);
  }
}




//QUESTIONS
//Constrain negative numberslet rateSlider; //Rate of Interest
let tplusButton; //button to increase Time Period by 1 year
let tminusButton; // button to increase Time Period by 1 year
let time = 1;

function setup() { 
  createCanvas(400, 400);
  tplusButton = createButton('+');
  tplusButton.position(80, 50);
  tminusButton = createButton('-');
  tminusButton.position(20, 50);
} 

function draw() { 
  background(220);
  text( "Time Period", 20, 40);
  text(time, 50, 65);
  tminusButton.mousePressed(decreaseTime);
  tplusButton.mousePressed(increaseTime);
}

function decreaseTime(){
  // text(time, 50, 65);
}

function increaseTime(){
  // text(time, 50, 65);
}

function mousePressed(){
  time++;
}let button = {
  x: 420,
  y: 170
};

let milliseconds;

// let k = 0;

let buttonA = '#723E83';
let buttonB = '#9C5CAE';
let buttonC = '#F47DA8';
let buttonD = '#F9B3D0';

let buttonClicked = false;

let counterA = 0;
let counterB = 0;
let counterC = 0;
let counterD = 0;



function setup() {
  createCanvas(700, 650);
  textSize(25);
  textFont("Avenir");
  angleMode(DEGREES);
  setInterval(timeIt, 1000);
}

function mousePressed() {
  if (mouseX > 35 && mouseX < 235 && mouseY > 35 && mouseY < 85) {
    buttonClicked = true;
    print("clicked");
  }
}

function timeIt() {
  if (buttonClicked == true) {
    counterA++;
    counterB++;
    counterC++;
    counterD++;
    // console.log(counter);
  }
}

function draw() {
  background(0);
  noStroke();
	
  //main button
  fill(255);
  rect(35, 35, 200, 50);
  fill(0);
  text("CLICK TO START", 50, 66);

  //Task buttons
  fill(buttonA);
  rect(button.x, button.y, 150, 50); // button A
  fill(buttonB);
  rect(button.x, button.y + 70, 150, 50); //button B
  fill(buttonC);
  rect(button.x, button.y + 140, 150, 50); //button C
  fill(buttonD);
  rect(button.x, button.y + 210, 150, 50); //button D

  //button names
  fill(255);
  text("Task", button.x, button.y - 25);
  text("A", button.x + 17, button.y + 33);
  text("B", button.x + 17, button.y + 70 + 33);
  text("C", button.x + 17, button.y + 140 + 33);
  text("D", button.x + 17, button.y + 210 + 33);

  //button times
  fill(255);
  // text("In secs", button.x, button.y - 25 );
  textSize(20);
  text("15 sec", button.x + 65, button.y + 33);
  text("20 sec", button.x + 65, button.y + 70 + 33);
  text("25 sec", button.x + 65, button.y + 140 + 33);
  text("30 sec", button.x + 65, button.y + 210 + 33);
  // pop();

  // if (k == 0) {

    //ClockA
    if (buttonClicked == true) {
      if (counterA <= 15) {
        // timeIt();
        // console.log(counterA);
        noFill();
        stroke(buttonA);
        strokeWeight(10);
        let endA = map(counterA, 0, 15, 0, 360);
        arc(210, 325, 300, 300, 0, endA);
        // console.log(endA);
      }

      if (counterA > 15) {
        noFill();
        stroke(buttonA);
        strokeWeight(10);
        arc(210, 325, 300, 300, 0, 360); //endA would be 360 degrees anyway
      }


      if (counterB <= 20) {
        // timeIt();
        noFill();
        stroke(buttonB);
        strokeWeight(10);
        let endB = map(counterB, 0, 20, 0, 360);
        arc(210, 325, 250, 250, 0, endB);
      }

			if (counterB > 20) {
        noFill();
        stroke(buttonB);
        strokeWeight(10);
        arc(210, 325, 250, 250, 0, 360);
      }


      //ClockC

      if (counterC <= 25) {
        // timeIt();
        noFill();
        stroke(buttonC);
        strokeWeight(10);
        let endC = map(counterC, 0, 25, 0, 360);
        arc(210, 325, 200, 200, 0, endC);
      }

      if (counterC > 25) {
        noFill();
        stroke(buttonC);
        strokeWeight(10);
        arc(210, 325, 200, 200, 0, 360);
      }


      //ClockD

      if (counterD <= 30) {
        // timeIt();
        noFill();
        stroke(buttonD);
        strokeWeight(10);
        let endD = map(counterD, 0, 30, 0, 360);
        arc(210, 325, 150, 150, 0, endD);
      }

      if (counterD > 30) {
        noFill();
        stroke(buttonD);
        strokeWeight(10);
        arc(210, 325, 150, 150, 0, 360);
      }
    }
 // }
}let counter = 0;
let buttonClicked = false;

let end;

function setup() {
  createCanvas(400, 400);
  textSize(32);
  setInterval(timeIt, 1000);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  fill(255);
  rect(50, 70, 100, 50);
  noStroke();
  fill(0);
  text("GO!", 65, 110);
  text(counter, 50, 50);
  noFill();
  stroke(0);
  strokeWeight(5);
  if ( counter <= 10){
    let end = map(counter, 0, 10, 0, 360);
    arc(200, 200, 100, 100, 0, end);
    // console.log(end);
  }
  
  if ( counter > 10){
    arc(200, 200, 100, 100, 0, 360);
    // console.log(end);
    // text(10, 50, 50);
  }
}

function timeIt() {
  if (buttonClicked == true) {
    counter++;
    // console.log(counter);
  }
}

function mousePressed() {
  if (mouseX > 50 && mouseX < 150 && mouseY > 70 && mouseY < 120) {
    buttonClicked = true;
  }
}                            // for incoming serial data



let john;
let amy;
let david;
let minnie;
let sample1;
let sample2;
let sample3;
let sample4;


function preload(){
  soundFormats('mp3', 'ogg');
  sample1 = loadSound('sounds/minnie_vocal.mp3');
  sample2 = loadSound('sounds/john_vocal.mp3');
  sample3 = loadSound('sounds/amy_vocal.mp3');
 sample4 = loadSound('sounds/bowie_vocal.mp3');
}


function setup() {
  createCanvas(600, 600);
 // imageMode(CENTER);
  john = loadImage('pics/johncoltrane.png');
  amy = loadImage('pics/amyw.png');
  david = loadImage('pics/davidbowie.png');
  minnie = loadImage('pics/minnier.png');
  
}


function draw() {
  background (0);
 
    push();
    scale(0.1);
    image(john, 300, 100);
    image(amy, 2500, 300);
    image(david, 300, 3000);
    scale(0.7);
    image(minnie, 4200,4700);
    pop();
    noFill();
    stroke(255);
    rect(70, 30, 150, 250); //john
    rect(300, 30, 150, 250); //amy
    rect(70, 300, 150, 250); //david
    rect(300, 300, 150, 250); //minnie
  
}

function mousePressed(){
  if(mouseX > 70 && mouseX < 220 && mouseY > 30 && mouseY < 280){
  sample2.play();
  }
  else {
  sample2.stop();
  }
  
  if(mouseX > 300 && mouseX < 450 && mouseY > 30 && mouseY < 280){
  sample3.play();
  }
  else {
  sample3.stop();
  }
  
  
  if(mouseX >70 && mouseX < 450 && mouseY > 300 && mouseY < 550){
  sample4.play();
  }
  else {
  sample4.stop();
  }
  
  
  if(mouseX >300 && mouseX < 450 && mouseY > 300 && mouseY < 550){
  sample1.play();
  }
  else {
  sample1.stop();
  }
}


  let poop = [];
let dogImage;


let dragged = false;

function preload(){
 dogImage = loadImage('dog.jpg'); 
}

function setup(){
	createCanvas(400,400);
  let firstColor = get(width/2, height/2);
	poop.push(new Circle(width/2, height/2, 2*width/2, firstColor));
}

function draw(){
  let k = 0; 
	if (k < 1) {
  	image(dogImage, 0, 0, width, height);
 	}
   
    for (var i = 0; i < poop.length; i ++ ) {
    
    // poop[i].display();
  }
}


let x = 50;
let hitScreen = 3; 

function setup(){
  createCanvas(600,600);
}

function draw(){
  background(220);
  ellipse(x, 300, 50, 50);
  x += hitScreen;
 
  
 if ( (x >= 575) || (x < 25)){
hitScreen = - hitScreen ;
   }
  


}var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var options = { baudrate: 115200}; // change the data rate to whatever you wish

var serial;          // variable to hold an instance of the serialport library
var inData;                             // for incoming serial data

var star = 8;

let star_select;

var sample;

var inData_last;

var wait;

var frame_count = 0;

var plays = 0;

let john;
let amy;
let david;
let minnie;

function preload(){
  soundFormats('mp3', 'ogg');
  sample0 = loadSound('barack_vocal.mp3');
  sample1 = loadSound('sounds/minnie_vocal.mp3');
  sample2 = loadSound('sounds/john_vocal.mp3');
  sample3 = loadSound('sounds/amy_vocal.mp3');
  sample4 = loadSound('sounds/bowie_vocal.mp3');
  sample5 = loadSound('barack_vocal2.mp3');
}

function setup() {
  imageMode(CENTER);
  john = loadImage('pics/johncoltrane.png');
  amy = loadImage('pics/amyw.png');
  david = loadImage('pics/davidbowie.png');
  minnie = loadImage('pics/minnier.png');
  title = loadImage('pics/title.png');
  
  
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', print);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName, options);
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
 inData = Number(serial.read());
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}

function draw() {
  frame_count ++;
  background(0);
  fill(255);
  //textSize(60);
  if (star == 8){
  push();
  translate(windowWidth / 2, windowHeight / 2);
  scale(0.23);
  image(title, 0, 0)
  pop();
  }
  //text("sensor value: " + inData, 30, 30);
  inData_last = inData;
  
  if (inData == 1){
  	//text("Star: Minnie", 30, 100);
    star = 1;
    star_select = "minnie";
    frame_count = 0;
  }
  if (inData == 2){
  	//text("Star: John", 30, 100);
    star = 2;
    star_select = "john";
    frame_count = 0;
  }
  if  (inData == 3){
  	//text("Star: Amy", 30, 100);
    star = 3;
    star_select = "amy";
    frame_count = 0;
  }
  if (inData == 4){
  	//text("Star: David", 30, 100);
    star = 4;
    star_select = "david";
    frame_count = 0;
  }
  if (inData == 5){
  //text("drop", 30, 100);
  //frame_count = 0;
  }
  if (inData == 6){
    star = inData;
    //frame_count = 0;
    inData = "none"
    if (star == 6){
      sample0.play(6);
      star = "none";
      plays = 1;
    }
  }
 
  if (inData_last == inData){
  	if (frame_count > 20){
      if (star == 1){
  			sample1.play();
        //sample5.play(sample1.duration() + 2);
        print("wait");
    		star = "none";
  		}
      if (star == 2){
  			sample2.play();
				//sample5.play(sample2.duration() + 2);
        print("wait");
    		star = "none";
  		}
      if (star == 3){
  			sample3.play();
				//sample5.play(sample3.duration() + 2);
        print("wait");
    		star = "none";
  		}
      if (star == 4){
        sample4.play();
				//sample5.play(sample4.duration() + 2);
        print("wait");
    		star = "none";
  		}
    	if (star_select == "minnie" && sample1.isPlaying()){
        //push();
        translate(windowWidth / 2, windowHeight / 2);
        //scale(1.0)
        scale(0.4);
        rotate(radians(frameCount));
        image(minnie, 0, 0);
        //pop();
      }
      if (star_select == "john" && sample2.isPlaying()){
        //push();
        translate(windowWidth / 2, windowHeight / 2);
        scale(0.4);
        rotate(radians(frameCount));
        image(john, 0, 0);
        //pop();
      }
      if (star_select == "amy" && sample3.isPlaying()){
        //push();
        translate(windowWidth / 2, windowHeight / 2);
        scale(0.4);
        rotate(radians(frameCount));
        image(amy, 0, 0);
        //pop();
      }
      if (star_select == "david" && sample4.isPlaying()){
        //push();
        translate(windowWidth / 2, windowHeight / 2);
        scale(0.4);
        rotate(radians(frameCount));
        image(david, 0, 0);
        //pop();
      }
			if (sample1.isPlaying() != true && sample2.isPlaying() != true){
        if (sample3.isPlaying() != true && sample4.isPlaying() != true){
        push();
				translate(windowWidth / 2, windowHeight / 2);
        scale(0.23);
        image(title, 0, 0);
        pop();
        }
      }
  }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here
var options = { baudrate: 115200}; // change the data rate to whatever you wish

var serial;          // variable to hold an instance of the serialport library
var inData;                             // for incoming serial data

var star;

let star_select;

var sample;

var inData_last;

var wait;

var frame_count = 0;

var plays = 0;

let john;
let amy;
let david;
let minnie;

function preload(){
  soundFormats('mp3', 'ogg');
  sample0 = loadSound('barack_vocal.mp3');
  sample1 = loadSound('sounds/minnie_vocal.mp3');
  sample2 = loadSound('sounds/john_vocal.mp3');
  sample3 = loadSound('sounds/amy_vocal.mp3');
  sample4 = loadSound('sounds/bowie_vocal.mp3');
}

function setup() {
  imageMode(CENTER);
  john = loadImage('pics/johncoltrane.png');
  amy = loadImage('pics/amyw.png');
  david = loadImage('pics/davidbowie.png');
  minnie = loadImage('pics/minnier.png');
  
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', print);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName, options);
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
 inData = Number(serial.read());
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}

function draw() {
  frame_count ++;
  background(0);
  fill(255);
  textSize(60);
  //text("sensor value: " + inData, 30, 30);
  inData_last = inData;
  
  if (inData == 1){
  	//text("Star: Minnie", 30, 100);
    star = 1;
    star_select = "minnie";
    frame_count = 0;
  }
  if (inData == 2){
  	//text("Star: John", 30, 100);
    star = 2;
    star_select = "john";
    frame_count = 0;
  }
  if  (inData == 3){
  	//text("Star: Amy", 30, 100);
    star = 3;
    star_select = "amy";
    frame_count = 0;
  }
  if (inData == 4){
  	//text("Star: David", 30, 100);
    star = 4;
    star_select = "david";
    frame_count = 0;
  }
  if (inData == 5){
  //text("drop", 30, 100);
  //frame_count = 0;
  }
  if (inData == 6){
    star = inData;
    //frame_count = 0;
    inData = "none"
    if (star == 6){
      sample0.play();
      star = "none";
      plays = 1;
    }
  }
 
  if (inData_last == inData){
  	if (frame_count > 20){
      if (star == 1){
  			sample1.play();
        //wait = duration(sample1);
        print("wait");
    		star = "none";
  		}
      if (star == 2){
        // push();
        translate(windowWidth / 2, windowHeight / 2);
        scale(0.4);
        rotate(radians(frameCount));
        image(john, 0, 0);
        //pop();
  			sample2.play();
        //wait = duration(sample1);
        print("wait");
    		star = "none";
  		}
      if (star == 3){
        //push();
        translate(windowWidth / 2, windowHeight / 2);
        scale(0.4);
        rotate(radians(frameCount));
        image(amy, 0, 0);
        //pop();
  			sample3.play();
        //wait = duration(sample1);
        print("wait");
    		star = "none";
  		}
      if (star == 4){
        //push();
        translate(windowWidth / 2, windowHeight / 2);
        scale(0.4);
        rotate(radians(frameCount));
        image(david, 0, 0);
        //pop();
  			sample4.play();
        //wait = duration(sample1);
        print("wait");
    		star = "none";
  		}
    	if (star_select == "minnie"){
        //push();
        translate(windowWidth / 2, windowHeight / 2);
        scale(0.4);
        rotate(radians(frameCount));
        image(minnie, 0, 0);
        //pop();
      }
      if (star_select == "john"){
        //push();
        translate(windowWidth / 2, windowHeight / 2);
        scale(0.4);
        rotate(radians(frameCount));
        image(john, 0, 0);
        //pop();
      }
      if (star_select == "amy"){
        //push();
        translate(windowWidth / 2, windowHeight / 2);
        scale(0.4);
        rotate(radians(frameCount));
        image(amy, 0, 0);
        //pop();
      }
      if (star_select == "david"){
        //push();
        translate(windowWidth / 2, windowHeight / 2);
        scale(0.4);
        rotate(radians(frameCount));
        image(david, 0, 0);
        //pop();
      }
      if (plays == 1){
      background(0);
      plays = 0;
      }
  }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var options = { baudrate: 115200}; // change the data rate to whatever you wish

var serial;          // variable to hold an instance of the serialport library
var inData;                             // for incoming serial data

var star;

let star_select;

var sample;

var inData_last;

var wait;

var frame_count = 0;

let john;
let amy;
let david;
let minnie;

function preload(){
  soundFormats('mp3', 'ogg');
  sample1 = loadSound('sounds/minnie_vocal.mp3');
  sample2 = loadSound('sounds/john_vocal.mp3');
  sample3 = loadSound('sounds/amy_vocal.mp3');
  sample4 = loadSound('sounds/bowie_vocal.mp3');
}

function setup() {
  imageMode(CENTER);
  john = loadImage('pics/johncoltrane.png');
  amy = loadImage('pics/amyw.png');
  david = loadImage('pics/davidbowie.png');
  minnie = loadImage('pics/minnier.png');
  
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', print);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName, options);
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
 inData = Number(serial.read());
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}

function draw() {
  frame_count ++;
  background(0);
  fill(255);
  textSize(60);
  //text("sensor value: " + inData, 30, 30);
  if (inData ==6){
    barack_vocal.play();
  }
    
  inData_last = inData;
  if (inData == 1){
  	//text("Star: Minnie", 30, 100);
    star = 1;
    star_select = "minnie";
    frame_count = 0;
  }
  if (inData == 2){
  	//text("Star: John", 30, 100);
    star = 2;
    star_select = "john";
    frame_count = 0;
  }
  if  (inData == 3){
  	//text("Star: Amy", 30, 100);
    star = 3;
    star_select = "amy";
    frame_count = 0;
  }
  if (inData == 4){
  	//text("Star: David", 30, 100);
    star = 4;
    star_select = "david";
    frame_count = 0;
  }
  if (inData == 5){
  //text("drop", 30, 100);
  //frame_count = 0;
  }
  if (inData_last == inData){
  if (frame_count > 20){
      if (star == 1){
  			sample1.play();
        //wait = duration(sample1);
        print("wait");
    		star = "none";
  		}
      if (star == 2){
        // push();
        translate(windowWidth / 2, windowHeight / 2);
        scale(0.4);
        rotate(radians(frameCount));
        image(john, 0, 0);
        pop();
  			sample2.play();
        //wait = duration(sample1);
        print("wait");
    		star = "none";
  		}
      if (star == 3){
        push();
        translate(windowWidth / 2, windowHeight / 2);
        scale(0.4);
        rotate(radians(frameCount));
        image(amy, 0, 0);
        pop();
  			sample3.play();
        //wait = duration(sample1);
        print("wait");
    		star = "none";
  		}
      if (star == 4){
        push();
        translate(windowWidth / 2, windowHeight / 2);
        scale(0.4);
        rotate(radians(frameCount));
        image(david, 0, 0);
        pop();
  			sample4.play();
        //wait = duration(sample1);
        print("wait");
    		star = "none";
  		}
    	if (star_select == "minnie"){
        push();
        translate(windowWidth / 2, windowHeight / 2);
        scale(0.4);
        rotate(radians(frameCount));
        image(minnie, 0, 0);
        pop();
      }
      if (star_select == "john"){
        push();
        translate(windowWidth / 2, windowHeight / 2);
        scale(0.4);
        rotate(radians(frameCount));
        image(john, 0, 0);
        pop();
      }
      if (star_select == "amy"){
        push();
        translate(windowWidth / 2, windowHeight / 2);
        scale(0.4);
        rotate(radians(frameCount));
        image(amy, 0, 0);
        pop();
      }
      if (star_select == "david"){
        push();
        translate(windowWidth / 2, windowHeight / 2);
        scale(0.4);
        rotate(radians(frameCount));
        image(david, 0, 0);
        pop();
      }
  }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
let n = 13; // number of rectangles

let canvasWidth = 700;
let canvasHeight = 600;

let w = 50;



function setup() { 
  createCanvas(canvasWidth, canvasHeight); 
  angleMode(DEGREES);
} 

function draw() { 
	
  background(0);
  translate(canvasWidth/2, canvasHeight/2);
  
  for ( i = 0; i <= n; i++){
  rotate(45);  
  
 	frameRate(2); 
  // w = random(0, 150); // to animate the height
  noStroke();
  rect ( 50, 0, w, 30);
  }
}let w 
function setup() { 
  createCanvas(600, 600);
}

function draw(){
  background(0);
  angleMode(DEGREES); // Change the mode to DEGREES
  var a = atan2(mouseY-height/2, mouseX-width/2);
  // var a = atan2(height/2, width/2);
  translate(width/2, height/2);
  ellipse( 0, 0, 30, 30);
  angleMode(RADIANS); // Change the mode to RADIANS
  rotate(a); // var a stays the same
  noStroke();
  rect(40, -5, 200, 20); // Smaller rectangle is rotating in radians
}


// function windowResized(){
//   resizeCanvas(windowWidth, windowHeight);
// }var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here
var options = { baudrate: 115200}; // change the data rate to whatever you wish

var serial;          // variable to hold an instance of the serialport library
var inData;                             // for incoming serial data

var star;

function setup() {
  createCanvas(600, 600);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', print);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName, options);
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
 inData = Number(serial.read());
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}

function draw() {
  background(0);
  fill(255);
  textSize(60);
  //text("sensor value: " + inData, 30, 30);
  if (inData == 1){
  	text("Star: Minnie", 30, 100);
  }
  if (inData == 2){
  	text("Star: John", 30, 100);
  }
  if  (inData == 3){
  	text("Star: Amy", 30, 100);
  }
  if (inData == 4){
  	text("Star: David", 30, 100);
  }
  if (inData == 5){
  text("drop", 30, 100);
  }
}
let data;

function preload() {
   data = loadJSON('https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400');
}
function setup() { 
  createCanvas(400, 400);
  print(data);
} 

function draw() { 
  background(220);
}let data;

function preload() {
  data = loadJSON('fortune500.json');
}

function setup() {
  createCanvas(400, 400);
  background(220);
  print(data.description);
  fill(255);
  for (let i = 0; i < data.companies.length; i++) {
    textAlign(CENTER);
    text(data.companies[i], random(width), random(height));
    createP(data.companies[i]);
  }
}var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here
var options = { baudrate: 9600}; // change the data rate to whatever you wish

var serial;          // variable to hold an instance of the serialport library
var inData;                             // for incoming serial data

var race;



function setup() {
  createCanvas(600, 600);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', print);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName, options);
  
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
  
  inData = Number(serial.read());
  
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
  
}

function draw() {
  background(0);
  fill(255);
  textSize(60);
 
  race = map(inData, 1, 80, 1, 5);
  
  if (race == 1){
    print('black');
  	text("Black", 30, 100);
  }
  if (race == 2){
    print('white');
  	text("White", 30, 100);
  }
  if (race == 3){
    print('asian');
  	text("Asian", 30, 100);
  }
  if (race == 4){
    print('hispanic');
  	text("Hispanic", 30, 100);
  }
  if (race == 5){
    print('other');
  	text("Other", 30, 100);
  }
}
let button = {
  x: 420,
  y: 170
};

let milliseconds;

let k = 0;

let buttonA = '#723E83';
let buttonB = '#9C5CAE';
let buttonC = '#F47DA8';
let buttonD = '#F9B3D0';

let buttonAClicked = false;
let buttonBClicked = false;
let buttonCClicked = false;
let buttonDClicked = false;

let counterA = 0;
let counterB = 0;
let counterC = 0;
let counterD = 0;



function setup() {
  createCanvas(1000, 650);
  textSize(25);
  textFont("Avenir");
  angleMode(DEGREES);
  setInterval(timeItA, 1000);
  setInterval(timeItB, 1000);
  setInterval(timeItC, 1000);
  setInterval(timeItD, 1000);
  // textAlign(CENTER);
}

function mousePressed() {
  if (mouseX > button.x && mouseX < button.x + 50 && mouseY > button.y && mouseY < button.y + 50) {
    buttonAClicked = true;
    print("A clicked");
  }


  if (mouseX > button.x && mouseX < button.x + 50 && mouseY > button.y + 70 && mouseY < button.y + 70 + 50) {
    buttonBClicked = true;
    print("B clicked");
  }

  if (mouseX > button.x && mouseX < button.x + 50 && mouseY > button.y + 140 && mouseY < button.y + 140 + 50) {
    buttonCClicked = true;
    print("C clicked");
  }

  if (mouseX > button.x && mouseX < button.x + 50 && mouseY > button.y + 210 && mouseY < button.y + 210 + 50) {
    buttonDClicked = true;
    print("D clicked");
  }
}

function timeItA() {
  if (buttonAClicked == true) {
    counterA++;
  }
}

function timeItB() {    
  if (buttonBClicked == true) {
    counterB++;
    // console.log(counter);
  }
}

function timeItC() {
   if (buttonCClicked == true) {
    counterC++;
    // console.log(counter);
  }
}
  
   
function timeItD() {
if (buttonDClicked == true) {
    counterD++;
    // console.log(counter);
  }
}

function draw() {
  background(0);
  noStroke();

  //heading
  fill(255);
  text("Click on the buttons to see progress", 35, 35);
  
  //buttons
  fill(buttonA);
  rect(button.x, button.y, 50, 50); // button A
  fill(buttonB);
  rect(button.x, button.y + 70, 50, 50); //button B
  fill(buttonC);
  rect(button.x, button.y + 140, 50, 50); //button C
  fill(buttonD);
  rect(button.x, button.y + 210, 50, 50); //button D

  //button names
  fill(255);
  text("Task", button.x, button.y - 25 );
  text("A", button.x + 17, button.y + 33);
  text("B", button.x + 17, button.y + 70 + 33);
  text("C", button.x + 17, button.y + 140 + 33);
  text("D", button.x + 17, button.y + 210 + 33);

  //button times
  fill(255);
  // text("In secs", button.x, button.y - 25 );
  textSize(20);
  text("5 sec", button.x + 65, button.y + 33);
  text("10 sec", button.x + 65, button.y + 70 + 33);
  text("15 sec", button.x + 65, button.y + 140 + 33);
  text("20 sec", button.x + 65, button.y + 210 + 33);
  // pop();

  let sec = second();

 	if (k == 0) {

    //ClockA
    if (buttonAClicked == true) {
      if (counterA <= 5) {
        timeItA();
        // console.log(counterA);
        noFill();
        stroke(buttonA);
        strokeWeight(10);
        let endA = map(counterA, 0, 5, 0, 360);
        arc(210, 325, 300, 300, 0, endA);
        // console.log(endA);
      }

    if (counterA > 5){
      noFill();
      stroke(buttonA);
      strokeWeight(10);
      arc(210, 325, 300, 300, 0, 360); //endA would be 360 degrees anyway
    	}
    }


    //ClockB
    if (buttonBClicked == true) {
      if (counterB <= 10) {
      timeItB();
      noFill();
      stroke(buttonB);
      strokeWeight(10);
      let endB = map(counterB, 0, 10, 0, 360);
      arc(210, 325, 250, 250, 0, endB);
    	}
    
   
    if (counterB >10) {
      noFill();
      stroke(buttonB);
      strokeWeight(10);
      arc(210, 325, 250, 250, 0, 360);
      }
    }


    //ClockC
    if (buttonCClicked == true) {
      if (counterC <= 15) {
      timeItC();
      noFill();
      stroke(buttonC);
      strokeWeight(10);
      let endC = map(counterC, 0, 15, 0, 360);
      arc(210, 325, 200, 200, 0, endC);
    	}
      
    	if (counterC >15) {
      noFill();
      stroke(buttonC);
      strokeWeight(10);
      arc(210, 325, 200, 200, 0, 360);
      }
    }

    //ClockD
    if (buttonDClicked == true) {
      if (counterD <= 20) {
      timeItD();
      noFill();
      stroke(buttonD);
      strokeWeight(10);
      let endD = map(counterD, 0, 20, 0, 360);
      arc(210, 325, 150, 150, 0, endD);
    	}
      
     if (counterD > 20) {
      noFill();
      stroke(buttonD);
      strokeWeight(10);
      arc(210, 325, 150, 150, 0, 360);
     	}
    }
  }
}
let canvas = {
  x: 400,
  y: 400
};

let points = { //points on circle's circumference
  x: 200,
  y: 0
};

let xc = canvas.x / 2; //defining centre of the circle
let yc = canvas.y / 2;


function setup() {
  createCanvas(canvas.x, canvas.y);
  angleMode(DEGREES);

}

function draw() {
  background(240);

  noFill();
  ellipse(xc, yc, canvas.x - 1, canvas.y - 1);
		for (let a = 0; a <= 360; a += 22.5) {
    	line(xc, yc, xc + (((canvas.x - 1)/2) * cos (a)), xc + (((canvas.x - 1)/2) * sin (a)));
  }
}let canvas = {
  x: 500,
  y: 500
};
let dragged = false;
let dragged2 = false;

let xc = 250;
let yc = 250;
let count = 20;
let rad = 100;

let sliderx =10, slidery = 10;
let sliderx2 =canvas.x - 30, slidery2 = 10;

function setup() {
  createCanvas(canvas.x, canvas.y);
  xc = canvas.x/2;
  yc = canvas.y/2;
}

function draw() {
  background(240);
  
  
  
  
  if(dragged) {
    slidery = mouseY - offset;
    slidery = constrain(slidery, 10,canvas.y-20);
    fill("#000");
  }
  else {
    fill("#ddd");
  }
  rect(sliderx, slidery, 20, 10);
  rad = map(slidery, 10, canvas.y -20, 50,300);
  
  if(dragged2) {
    slidery2 = mouseY - offset2;
    slidery2 = constrain(slidery2, 10,canvas.y-20);
    fill("#000");
  }
  else {
    fill("#ddd");
  }
  rect(sliderx2, slidery2, 20, 10);
  count = map(slidery2, 10, canvas.y -20, 10,40);
  
  
  //circle thing  
  for (var i = 0; i < count; i++) {
    for (var j = 0; j < count; j++) {
      if (((i - j) != 1) && ((j - i) != 1)) {
        a = xc + (rad * sin((2 * (22 / 7) * i) / count));
        b = yc + (rad * cos((2 * (22 / 7) * i) / count));
        c = xc + (rad * sin((2 * (22 / 7) * j) / count));
        d = yc + (rad * cos((2 * (22 / 7) * j) / count));
        line(a, b, c, d);
      }
    }
  }
  
}

function circleDoodle() {
}


function mouseDragged() {
  if (mouseX > sliderx && mouseX < sliderx+20 && mouseY > slidery && mouseY < slidery + 10) {
    dragged = true;
    offset = mouseY - slidery;
  }
  if (mouseX > sliderx2 && mouseX < sliderx2+20 && mouseY > slidery2 && mouseY < slidery2 + 10) {
    dragged2 = true;
    offset2 = mouseY - slidery2;
  }
}

function mouseReleased() {
  dragged = false;
  dragged2 = false;
}// Bouncing ball
let gravity = 0.1;
let bouncer;

function setup() { 
  createCanvas(400, 400);
  bouncer = new Ball();
} 

function draw() {
  background(220);
  bouncer.move();
  bouncer.show();

}
let img;

function preload(){ //says loading before it should the image coz preload
  for (let i = 0; i<10000; i++){
   img = loadImage('kitten.jpg');
  }
}

function setup() { 
  createCanvas(400, 400);
  image(img, 0, 0);
} 

// function draw() { 
//   background(220);
// }
let john;
let amy;
let david;
let minnie;

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  john = loadImage('john_coltrane.png');
  amy = loadImage('amy.png');
  david = loadImage('minnie.png');
  minnie = loadImage('david_bowie.png');
}

function draw() {
  background(0);
  push();
  translate(windowWidth / 2, windowHeight / 2);
  scale(0.4);
	rotate(radians(frameCount));
  image(john, 0, 0);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}let y = 0;
let speed = 0; //initial velocity
let gravity = 0.1; //try with different values and check

function setup() {
  createCanvas(400, 400);
}

function displayBall(){
ellipse(200, y, 20, 20);  
}

function moveBall(){
  y = y + speed;
  speed = speed + gravity;
}

function bounceBall(){
 if (y > 400) {
    //reverse the speed
    speed = -0.95 * speed; //losing 5% after every bounce 
}
  
function draw() {
  background(220);
  displayBall();
   moveBall();
  bounceBall();
 
  
}



}let x = 0 //x coordinate where the line starts
let y = 0 //y coordinate where the line starts
let r = 30 //increment in angle increase

let o1 = 0
let o2 = 0

let buttonX = 150; //x coordinte of button square
let draggingX = false;
let offsetX = 0;

let buttonR = 150 // x coordinate for R button
let draggingR = false;
let offsetR = 0;



function setup() {
  createCanvas(600, 550);
  angleMode(DEGREES);

}
//Did I click on the button
function mousePressed() {
  if (mouseX > 150 && mouseX < 450 && mouseY > 420 && mouseY < 440) {
    draggingX = true;
    offsetX = buttonX - mouseX;
  }

  if (mouseX > 150 && mouseX < 450 && mouseY > 490 && mouseY < 510) {
    draggingR = true;
    offsetR = buttonR - mouseX;
  }
}

function mouseReleased() {
  draggingX = false;
  draggingR = false;
}

function draw() {
  background(255);

  line(150, 430, 450, 430); //slider line for x
  fill(0);
  rect(buttonX, 420, 20, 20); //slider button for x


  line(150, 500, 450, 500); //slider line for r
  fill(0);
  rect(buttonR, 490, 20, 20); //slider button for r

  //to ensure nothing happens when mouse is pressed and it goes beyond the range of slider
  if (mouseX > 450 || mouseX < 150) {
    draggingX = false;
  }

  if (mouseX > 450 || mouseX < 150) {
    draggingR = false;
  }

  if (draggingX) {
    buttonX = mouseX + offsetX;
  }
  if (draggingR) {
    buttonR = mouseX + offsetR;
  }

  var x = map(buttonX, 150, 430, 0, 28);
  var y = map(buttonX, 150, 430, 0, 28);
  var r = map(buttonR, 150, 430, 45, 90);

  buttonX = constrain(buttonX, 150, 430);
  buttonR = constrain(buttonR, 150, 430);

  for (o1 = 50; o1 <= 550 && o1 >= 50; o1 += 50) {
    for (o2 = 50; o2 <= 350 && o2 >= 50; o2 += 50) {
      push();
      translate(o1, o2);
      for (var a = 0; a <= 360; a += r) {
        rotate(a)
        line(x, y, 20, 20);

      }
      pop();
    }
  }
}




// amount of degrees
// amount of angle rotation
// increasing and decreasing x and y
// length of line

// create a slider to adjust values x, y and end point of lines
// find out if (x,y) and (x1, y1) could be controlled using one slider?
// click on buttons to change line strokes of the design to random (within a given range)
//the whole canvas acting as a knob?// Simple Slider

var dragging = [false,false]; // Is the slider being dragged?

// Rectangle variables for slider
var x = [100,100];
var y = [25,100];
var w = 10;
var h = 50;

// Start and end of slider
var sliderStart = 100;
var sliderEnd = 400;

// Offset for dragging slider
var offsetX = [0,0];

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(175);
	slider(0);
	slider(1);
}

function slider(which_slider)
	{
		// Is it being dragged?
  	if (dragging[which_slider]) {
    x[which_slider] = mouseX + offsetX[0];
  	}
  	// Keep rectangle within limits of slider
  	x[which_slider] = constrain(x[which_slider], sliderStart, sliderEnd-w);

  	// Draw a line for slider
 	 	stroke(0);
  	line(sliderStart, y[which_slider]+h/2, sliderEnd, y[which_slider]+h/2);
  	stroke(0);
  	// Fill according to state
  	if (dragging[which_slider]) {
    	fill (50);
  	} else {
    	fill(175);
  	}
  	// Draw rectangle for slider
  	rect(x[which_slider], y[which_slider], w, h);	
	}

	function mousePressed()
		{
  	// Did I click on slider?
  		internal_mousePressed(0);
			internal_mousePressed(1);		
		}

		
	function mouseReleased() {
  		internal_mouseReleased(0);
			internal_mouseReleased(1);
	}

	function internal_mousePressed(which_slider)
	{
		if (mouseX > x[which_slider] && mouseX < x[which_slider] + w && mouseY > y[which_slider] && mouseY < y[which_slider] + h) 
			{
   		 dragging[which_slider] = true;
    	 offsetX[which_slider] = x[which_slider]-mouseX;
  		}
	}

	function internal_mouseReleased(which_slider) {
  		dragging[which_slider] = false;
			print(x[which_slider]);
	}let x = 0 //x coordinate where the line starts
let y = 0 //y coordinate where the line starts


let o1 = 0
let o2 = 0

let buttonX = 150; //x coordinte of button square
let dragging = false;
let offsetX = 0;



function setup() {
  createCanvas(600, 550);
  angleMode(DEGREES);

}
//Did I click on the button
function mousePressed() {
  if (mouseX > 150 && mouseX < 450 && mouseY > 420 && mouseY < 440) {
    dragging = true;
    offsetX = buttonX - mouseX;
  }
}

function mouseReleased() {
  dragging = false;
}

function draw() {
  background(255);

  line(150, 430, 450, 430); //slider line for x
  fill(0);
  rect(buttonX, 420, 20, 20); //slider button for x

  //to ensure nothing happens when mouse is pressed and it goes beyond the range of slider
  if (mouseX > 450 || mouseX < 150) { 
    dragging = false;
  }

  if (dragging) {
    buttonX = mouseX + offsetX;
  }

  var x = map(buttonX, 150, 430, 0, 28);
  var y = map(buttonX, 150, 430, 0, 28);

  buttonX = constrain(buttonX, 150, 430);

  for (o1 = 50; o1 <= 550 && o1 >= 50; o1 += 50) {
    for (o2 = 50; o2 <= 350 && o2 >= 50; o2 += 50) {
      push();
      translate(o1, o2);
      for (var a = 0; a <= 360; a += 45) {
        rotate(a)
			line(x, y, 20, 20);

      }
      pop();
    }
  }
}




// amount of degrees
// amount of angle rotation
// increasing and decreasing x and y
// length of line

// create a slider to adjust values x, y and end point of lines
// find out if (x,y) and (x1, y1) could be controlled using one slider?
// click on buttons to change line strokes of the design to random (within a given range)
//the whole canvas acting as a knob?let x = 0 //x coordinate where the line starts
let y = 0 //y coordinate where the line starts

let o1 = 0
let o2 = 0


function setup() {
  createCanvas(600, 550);
  angleMode(DEGREES);

}

function draw() {
  background(255);
  

  
  
  

  for (o1 = 50; o1 <= 550 && o1 >= 50;  o1 += 50 ) {
  for (o2 = 50; o2 <= 350 && o2 >= 50; o2 += 50) {
      push();
      translate(o1, o2);
      for (var a = 0; a <= 360; a += 45) {
        rotate(a)
        line(x, y, 20, 20);
      }
      pop();
    }
  }
}


  // amount of degrees
  // amount of angle rotation
  // increasing and decreasing x and y
  // length of line

  // create a slider to adjust values x, y and end point of lines
  // find out if (x,y) and (x1, y1) could be controlled using one slider
  // click on buttons to change a value to random (within a given range)
  //the whole canvas acting as a knob
  //


// Simple Slider

var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?

// Rectangle variables for slider
var x = 100;
var y = 25;
var w = 10;
var h = 50;
// Start and end of slider
var sliderStart = 100;
var sliderEnd = 400;
// Offset for dragging slider
var offsetX = 0;

function setup() {
  createCanvas(640, 360);
}


function mousePressed() {
  // Did I click on slider?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x - mouseX; //dont understand
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}

function draw() {
  background(175);


  // Is it being dragged?
  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd-w);

  // Draw a line for slider
  stroke(0);
  line(sliderStart, y+h/2, sliderEnd, y+h/2);

  stroke(0);
  // Fill according to state
  if (dragging) {
    fill (50);
  } else {
    fill(175);
  }
  // Draw rectangle for slider
  rect(x, y, w, h);

  // Map is an amazing function that will map one range to another!
  // Here we take the slider's range and map it to a value between 0 and 255
  var b = map(x,sliderStart,sliderEnd-w,0,255);
  fill(b);
  rect(sliderStart, 100, sliderEnd-sliderStart, 150);
}
function setup() {
  createCanvas(200, 200);
}

function draw() {
  var value = map(mouseX, 0, width, 0, 255);
  background(value);
  ellipse(mouseX, mouseY, 40, 40);

}

//why is color changing on when mouse is moved on y axis as well?let Px = 0 //x coordinate where the line starts
let Py = 0 //y coordinate where the line starts

let Ox = 0
let Oy = 0


let draggingPx = false; //Is the Px slider being dragged
let hoverPx = false; //Is the mouse on the Px slider

let offsetPx = 0;// Offset for dragging Px slider
let sliderPxstart = 150;
let sliderPxend = 450;

function setup() {
  createCanvas(600, 550);
  angleMode(DEGREES);
  textSize (20);
}

function draw() {
  background(255);
  

  
  //slider for x
  text ("Px", 100, 435);
  line( 150, 430, 450, 430); //slider line for x
  fill(0);
  rect ( 150, 420, 20, 20); //slider button for x
  
  //
  

  for (Ox = 50; Ox <= 550 && Ox >= 50;  Ox += 50 ) {
  for (Oy = 50; Oy <= 350 && Oy >= 50; Oy += 50) {
      push();
      translate(Ox, Oy);
      for (var a = 0; a <= 360; a += 45) {
        rotate(a)
        line(Px, Py, 20, 20);
      }
      pop();
    }
  }
}

function mousePressed()
 if ( 
  
  // amount of degrees
  // amount of angle rotation
  // increasing and decreasing x and y
  // length of line

  // create a slider to adjust values x, y and end point of lines
  // find out if (x,y) and (x1, y1) could be controlled using one slider
  // click on buttons to change a value to random (within a given range)
  //the whole canvas acting as a knob
  //


let x = 250;
let y = 175;
let l = 100;
let w = 25;
let box = false;


function setup() {
  createCanvas(600, 400);
  background(220);
}

function draw() {
  
  if ((mouseX > x) && (mouseX < x + l) && (mouseY > y) && (mouseY < y + w)) 
    box = true;
    else{
      box = false;}

    if (box)
    { fill(0);
    
    }
  else
   fill (255);
   

    rect(250, 175, 100, 25);
  if (box && mouseIsPressed) {
  
background(255);

}
  }


let y = 0;
let speed = 0; //initial velocity
let gravity = 0.1; //try with different values and check

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(200, y, 20, 20);

  y = y + speed;
  speed = speed + gravity;

  if (y > 400) {
    //reverse the speed
    speed = -0.95 * speed; //losing 5% after every bounce
  }



}var x = 10;
var y = 10;

function setup() { 
  createCanvas(700, 700);
} 

function draw() { 
  background(220);
  fill('#64B0D0');
  noStroke();
  ellipse (x, y, 70,70);
}

function mouseMoved() {
  x = mouseX;
  y = mouseY;
}
var x = 10;
var y = 10;
var alpha = 100;

function setup() { 
  createCanvas(700, 700);
} 

function draw() { 
  background(220);
  c = color('
  fill('#64B0D0', alpha);
  noStroke();
  ellipse (x, y, 70,70);
}

function mouseMoved() {
  x = mouseX;
  y = mouseY;
  alpha = alpha + 10;
}

function setup() { 
  createCanvas(700, 650);
  
} 

function draw() { 
  background('#2E2031');
  
  //draw circle
  fill('#fffff');
  noStroke();
  ellipse(460, 230, 430, 430);
  
  //draw lines
  stroke('#ffffff');
  line(0, 613, 275, 121);
  line(25, 650, 559, 419);


 //triangles from left to right
  fill('#2E2031');
  noStroke();
  triangle(353, 162, 274, 272, 314, 263);
  triangle(353, 162, 314, 263, 360, 274);
  triangle(353, 162, 360, 274, 414, 253);
  quad(353, 162, 394, 177, 417, 172, 414, 253);
  triangle(430, 155, 417, 172, 447, 175);
  triangle(480, 155, 494, 175, 465, 175);
  quad(417, 172, 456, 172, 456, 300, 414, 253);
  quad(456, 172, 491, 172, 496, 253, 456, 300);
  quad(491, 172, 518, 177, 558, 162, 496, 253);
  triangle(558, 162, 551, 274, 496, 253);
  triangle(558, 162, 596, 263, 551, 274);
  triangle(558, 162, 636, 263, 596, 263);
        
  }