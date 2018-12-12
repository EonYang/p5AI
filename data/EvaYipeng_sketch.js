var weather;
let r = 0;
let g = 0;
let b = 0;
var api = 'https://api.apixu.com/v1/current.json?key=513d8003c8b348f1a2461629162106&q=';
var input;
let condition;
let time;
//let rtime;


function setup() {
  createCanvas(800, 800);

  //  var button = select('#submit');
  //   button.mousePressed(weatherAsk);

  //  input = select('#city');
}

function weatherAsk() {

  try{
      var url = api + input.value();
    // when the url is not valid, it throw out an err that cannot be catched outside LoadJson.
  		loadJSON(url, gotData);//loadJSON doesn't do err handling 
  }catch(err){}

}

function gotData(data) {
  try{
  weather = data;
  time = weather.location.localtime;
  conditionCode = weather.current.condition.code;
  conditionText = weather.current.condition.text;
  var splittime = split(time, ' ');
  var realtime = split(splittime[1], ':');
  print(weather);
  print(time);
  print(realtime[0]);
  var rtime = Number(realtime[0]);
  print(rtime);
  print(conditionText);
  print(conditionCode);
  timeColor(rtime);
  }catch(err){
  	console.log(err);
  }
}

function timeColor(rtime) {
    // if (conditionCode == 1003 || conditionCode == 1009|| conditionCode == 1030 || conditionCode == 1006 && 6 <rtime < 17) {  //cloudyDay
  if (conditionCode == 1003 || conditionCode == 1009|| conditionCode == 1030 || conditionCode == 1006) {
    if(6< rtime < 17){
    r = 213;
    g= 210;
    b = 205;
    }
    else if(17<= rtime <= 24 || 0<= rtime <= 6){
       r= 67;
    g = 75;
    b= 99;
    }
      
      
  } else if (conditionCode == 1000 ) {   //sunnyDay
   if(6< rtime < 17){
    r= 255;
    g = 252;
    b= 240;
  }
    else if(17<= rtime <= 24 || 0<= rtime <= 6){
       r= 67;
    g = 75;
    b= 99;
    }
  }
// else if (conditionCode == 1003 || conditionCode == 1009|| conditionCode == 1030 || conditionCode == 1006 && 16 <= rtime <= 17 ){   //cloudySunset
//     r= 191;
//     g = 157;
//     b= 123;
//   }
//   else if ( conditionCode == 1000 && 16 <= rtime <= 17 ){   //sunnySunset
//     r= 251;
//     g = 145;
//     b= 42;
//   }
  //   else if ( 17< rtime <24 ){   //clearNight
  //   r= 67;
  //   g = 75;
  //   b= 99;
  // }
}

function draw() {
  background(0);

  if (weather) {
    var condition = weather.current.condition.code;
    //var humidity = weather.main.humidity;
    // ellipse(100, 100, temp, temp);
    // ellipse(300, 100, humidity, humidity);
  }
  noStroke();
  fill(r,g,b);
  rect(0, 0, 800, 800);
}

function keyPressed() {
  if (keyCode == RETURN) {
    //var button = select('#submit');
    input = select('#city');
    weatherAsk();
    document.getElementById("city").value = "";
    //colorValue=255;
  }
  return 0;


}var weather;

var api = 'https://api.apixu.com/v1/current.json?key=513d8003c8b348f1a2461629162106&q=';
var input;

function setup() {
  createCanvas(800, 800);

  var button = select('#submit');
  keyPressed(weatherAsk);

  input = select('#city');
}

function weatherAsk() {
  var url = api + input.value();
  loadJSON(url, gotData);
}

function gotData(data) {
  weather = data;
  print (weather);
}

function draw() {
  background(0);
  noFill();
  if (weather) {
    //var temp = weather.main.temp;
    var condition = weather.current.condition.code;
    var time = weather.location.localtime
    textSize(32);
text(condition, 10, 30);
  
   // ellipse(100, 100, temp, temp);
    // ellipse(300, 100, condition/3, condition/3);

//     if (condition=1003){
//       fill(255,0,0);
//       ellipse(100,100,100);
//     }
    
//     else if(condition=1000) {
//       fill(0,255,0);
//       ellipse(200,200,100);
//     }
  }
}

function keyPressed() {
    if(keyCode == RETURN) {
        buttonPressed=true;
    } 
    return 0;
}// A wind direction vector
let weather;
var wind;
let conditionText;
let conditionCode;
let time;
// Circle position
var position;
let angle;

function setup() {
  createCanvas(800, 800);
  // Request the data from apixu.com
  var url = 'https://api.apixu.com/v1/current.json?key=513d8003c8b348f1a2461629162106&q=NYC';
  loadJSON(url, gotWeather);
  
  // Circle starts in the middle
  //position = createVector(width/2, height/2);
  // wind starts as (0,0)
  //wind = createVector();
  // print(time, conditionText);
}

function gotWeather(weather) {

  // Get the angle (convert to radians)
  var angle = radians(Number(weather.current.wind_degree));
  // Get the wind speed
  var windmag = Number(weather.current.wind_mph);

  // Display as HTML elements

  time = weather.location.localtime;
  conditionCode = weather.current.condition.code;
  conditionText= weather.current.condition.text;
  var temperatureDiv = createDiv(conditionText);
  var windDiv = createDiv(time);
  
  //print(time, condition);
  // Make a vector
  // wind = p5.Vector.fromAngle(angle);
  //println ();
  //print(weather);
}

function draw() {
  background(200);
   if (weather) {
    fill(255);
    ellipse(100,100, time, time);
    ellipse(300,100, conditionText, conditionText);
      
  }
  //print(time, condition);

  // This section draws an arrow pointing in the direction of wind
  //push();

  //pop();

  //   // Move in the wind's direction
  //   //position.add(wind);

  //   stroke(0);
  //   fill(51);
  //   ellipse(position.x, position.y, 16, 16);

  //   if (position.x > width)  position.x = 0;
  //   if (position.x < 0)      position.x = width;
  //   if (position.y > height) position.y = 0;
  //   if (position.y < 0)      position.y = height;



}

// A wind direction vector
var wind;
// Circle position
var position;

function setup() {
  createCanvas(720, 200);
  // Request the data from apixu.com
  var url = 'https://api.apixu.com/v1/current.json?key=bdda71137dc343da91122937181012&q=beijing';
  loadJSON(url, gotWeather);
  // Circle starts in the middle
  position = createVector(width/2, height/2);
  // wind starts as (0,0)
  wind = createVector();
}

function draw() {
  background(200);

  // This section draws an arrow pointing in the direction of wind
  push();
  translate(32, height - 32);
  // Rotate by the wind's angle
  rotate(wind.heading() + PI/2);
  noStroke();
  fill(255);
  ellipse(0, 0, 48, 48);

  stroke(45, 123, 182);
  strokeWeight(3);
  line(0, -16, 0, 16);

  noStroke();
  fill(45, 123, 182);
  triangle(0, -18, -6, -10, 6, -10);
  pop();
  
  // Move in the wind's direction
  position.add(wind);
  
  stroke(0);
  fill(51);
  ellipse(position.x, position.y, 16, 16);

  if (position.x > width)  position.x = 0;
  if (position.x < 0)      position.x = width;
  if (position.y > height) position.y = 0;
  if (position.y < 0)      position.y = height;


}

function gotWeather(weather) {
  
  // Get the angle (convert to radians)
  var angle = radians(Number(weather.current.wind_degree));
  // Get the wind speed
  var windmag = Number(weather.current.wind_mph);
  
  // Display as HTML elements
  var temperatureDiv = createDiv(floor(weather.current.temp_f) + '&deg;');
  var windDiv = createDiv("WIND " + windmag + " <small>MPH</small>");
  
  // Make a vector
  wind = p5.Vector.fromAngle(angle);
}function setup() { 
  createCanvas(800, 800);
  background(255);
  textAlign(LEFT, TOP);
  textSize(15);
} 

function mousePressed() {
  var grammar = tracery.createGrammar(grammarSource);
  grammar.addModifiers(tracery.baseEngModifiers);

	var output = grammar.flatten("#origin#");

  
  text(output, mouseX, mouseY, mouseX+90, mouseY+90);
}

var grammarSource = {

  
   "origin": [
     "my #nouns# #verbs# for your #adjs# #nouns#,",
     "my #names#,",
     "Yours #advs#,",
     "my #sals#,",
     "You are my #adjs# #nouns#,",
     "My #nouns# #advs# #verbs# your #nouns#.",
     "My #adjs# #nouns#,",
     "How #advs# #adjs# are you!",
     ],
  
"sals" : ["Beloved", "Darling", "Dear", "Dearest", "Fanciful", "Honey"],

"names":["Chickpea", "Dear", "Duck", "Jewel", "Love", "Moppet", "Sweetheart"],

"adjs" :["affectionate", "amorous", "anxious", "avid", "beautiful", "breathless", "burning", "covetous", "craving", "curious", "eager", "fervent", "fondest", "loveable", "lovesick", "loving", "passionate", "precious", "seductive", "sweet", "sympathetic", "tender", "unsatisfied", "winning", "wistful"],

"nouns" :["adoration", "affection", "ambition", "appetite", "ardour", "being", "burning", "charm", "craving", "desire", "devotion", "eagerness", "enchantment", "enthusiasm", "fancy", "fellow feeling", "fervour", "fondness", "heart", "hunger", "infatuation", "little liking", "longing", "love", "lust", "passion", "rapture", "sympathy", "thirst", "wish", "yearning"],

"advs":["affectionately", "ardently", "anxiously", "beautifully", "burningly", "covetously", "curiously", "eagerly", "fervently", "fondly", "impatiently", "keenly", "lovingly", "passionately", "seductively", "tenderly", "wistfully"],

"verbs" :["adores", "attracts", "clings to", "holds dear", "hopes for", "hungers for", "likes", "longs for", "loves", "lusts after", "pants for", "pines for", "sighs for", "tempts", "thirsts for", "treasures", "yearns for", "woos"],

}
function setup(){
  
  createCanvas(800,800);
}

function mousePressed() {
  var grammar = tracery.createGrammar(grammarSource);
  grammar.addModifiers(tracery.baseEngModifiers);
  var output1 = grammar.flatten("#origin1#");
   var output2 = grammar.flatten("#origin2#");
   var output3 = grammar.flatten("#origin3#");
   var output4 = grammar.flatten("#origin4#");
  
  var output="output"+floor(random(1,5));
  
  text(output, mouseX, mouseY, mouseX+40, mouseY+40);
}

var grammarSource = {
  
   "origin1": "my #sals2#,",
  
  "origin2": "my #sals1#,",
  
  "origin3": "my love #verbs# for your #adjs# #nouns#,",
  
  "origin4": "Yours #advs#,",
  
"sals1" : ["Beloved", "Darling", "Dear", "Dearest", "Fanciful", "Honey"],

"sals2 ":["Chickpea", "Dear", "Duck", "Jewel", "Love", "Moppet", "Sweetheart"],

"adjs" :["affectionate", "amorous", "anxious", "avid", "beautiful", "breathless", "burning", "covetous", "craving", "curious", "eager", "fervent", "fondest", "loveable", "lovesick", "loving", "passionate", "precious", "seductive", "sweet", "sympathetic", "tender", "unsatisfied", "winning", "wistful"],

"nouns" :["adoration", "affection", "ambition", "appetite", "ardour", "being", "burning", "charm", "craving", "desire", "devotion", "eagerness", "enchantment", "enthusiasm", "fancy", "fellow feeling", "fervour", "fondness", "heart", "hunger", "infatuation", "little liking", "longing", "love", "lust", "passion", "rapture", "sympathy", "thirst", "wish", "yearning"],

"advs":["affectionately", "ardently", "anxiously", "beautifully", "burningly", "covetously", "curiously", "eagerly", "fervently", "fondly", "impatiently", "keenly", "lovingly", "passionately", "seductively", "tenderly", "wistfully"],

"verbs" :["adores", "attracts", "clings to", "holds dear", "hopes for", "hungers for", "likes", "longs for", "loves", "lusts after", "pants for", "pines for", "sighs for", "tempts", "thirsts for", "treasures", "yearns for", "woos"],

}

/* 	ORIGINAL CODE
// function mousePressed() {
//   var grammar = tracery.createGrammar(grammarSource);
//   grammar.addModifiers(tracery.baseEngModifiers);
//   var output = grammar.flatten("#origin#");
//   background(255);
//   text(output, 20, 20, width-40, height-40);
// }

// var grammarSource = {
//   "origin": "#interjection.capitalize#, #name#! I'm #profession.a#, not #profession.a#!",
//   "interjection": ["alas", "congratulations", "eureka", "fiddlesticks",
//     "good grief", "hallelujah", "oops", "rats", "thanks", "whoa", "yes"],
//   "name": ["Jim", "John", "Tom", "Steve", "Kevin", "Gary", "George", "Larry"],
//   "profession": [
//         "accountant",
//         "actor",
//         "archeologist",
//         "astronomer",
//         "audiologist",
//         "bartender",
//         "butcher",
//         "carpenter",
//         "composer",
//         "crossing guard",
//         "curator",
//         "detective",
//         "economist",
//         "editor",
//         "engineer",
//         "epidemiologist",
//         "farmer",
//         "flight attendant",
//         "forest fire prevention specialist",
//         "graphic designer",
//         "hydrologist",
//         "librarian",
//         "lifeguard",
//         "locksmith",
//         "mathematician",
//         "middle school teacher",
//         "nutritionist",
//         "painter",
//         "physical therapist",
//         "priest",
//         "proofreader",
//         "rancher",
//         "referee",
//         "reporter",
//         "sailor",
//         "sculptor",
//         "singer",
//         "sociologist",
//         "stonemason",
//         "surgeon",
//         "tailor",
//         "taxi driver",
//         "teacher assistant",
//         "teacher",
//         "teller",
//         "therapist",
//         "tour guide",
//         "translator",
//         "travel agent",
//         "umpire",
//         "undertaker",
//         "urban planner",
//         "veterinarian",
//         "web developer",
//         "weigher",
//         "welder",
//         "woodworker",
//         "writer",
//         "zoologist"
//   ]
// };
*/let cards = [];


function preload() {
  // for (var i = 0; i< 24; i++){
  //       cardimg[i] = loadImage("cards/" + i + ".png"); 
  //   }
  quescard = loadImage('cards/ques.png');

  cardimg1 = loadImage('cards/1.png');
  cardimg2 = loadImage('cards/2.png');
  cardimg3 = loadImage('cards/3.png');
  cardimg4 = loadImage('cards/4.png');
  cardimg5 = loadImage('cards/5.png');
  cardimg6 = loadImage('cards/6.png');
  cardimg7 = loadImage('cards/7.png');
  cardimg8 = loadImage('cards/8.png');
  cardimg9 = loadImage('cards/9.png');
  cardimg10 = loadImage('cards/10.png');
  cardimg11 = loadImage('cards/11.png');
  cardimg12 = loadImage('cards/12.png');
  cardimg13 = loadImage('cards/13.png');
  cardimg14 = loadImage('cards/14.png');
  cardimg15 = loadImage('cards/15.png');
  cardimg16 = loadImage('cards/16.png');
  cardimg17 = loadImage('cards/17.png');
  cardimg18 = loadImage('cards/18.png');
  cardimg19 = loadImage('cards/19.png');
  cardimg20 = loadImage('cards/20.png');
  cardimg21 = loadImage('cards/21.png');
  cardimg22 = loadImage('cards/22.png');
  cardimg23 = loadImage('cards/23.png');
  cardimg24 = loadImage('cards/24.png');

  cards.push(cardimg1);
  cards.push(cardimg2);
  cards.push(cardimg3);
  cards.push(cardimg4);
  cards.push(cardimg5);
  cards.push(cardimg6);
  cards.push(cardimg7);
  cards.push(cardimg8);
  cards.push(cardimg9);
  cards.push(cardimg10);
  cards.push(cardimg11);
  cards.push(cardimg12);
  cards.push(cardimg13);
  cards.push(cardimg14);
  cards.push(cardimg15);
  cards.push(cardimg16);
  cards.push(cardimg17);
  cards.push(cardimg18);
  cards.push(cardimg19);
  cards.push(cardimg20);
  cards.push(cardimg21);
  cards.push(cardimg22);
  cards.push(cardimg23);
  cards.push(cardimg24);


}

function setup() {
  imageMode(CENTER);
  // buttonMode(CENTER);
  createCanvas(500, 500);
  img=image(quescard, width / 2, height / 2, 150, 250);

  button = createButton('Tell me');
  button.parent("tellMe");
  button.position(width, height);
  button.mousePressed(changePic);
}

function changePic() {
let rand = round(random(1, 24));
  background(random(100,255),random(100,255),random(100,255));
  image(cards[rand], width / 2, height / 2, 150, 250);
}

function draw() {
  // background(220);
}function preload(){
  img= loadImage('Peace.gif');
}

function setup() { 
  createCanvas(400, 400); 
  background(220);
  image(img,0,0);
  frameRate(20);
  
  
} 

function draw() { 
  
  
}

function mouseDragged(){
 noStroke();
  fill(20,150,150);
  r= map(mouseX-pmouseX, 0,20,20,5);
  ellipse(mouseX, mouseY, r)
  
}

function keyPressed(){
  background(220);
  image(img,0,0); 
}//to do list//
//add a "add" button
//new window 


// arrays for mounts
let mounts = [];
let mountsImages = [];

// arrays for buttons 
let buttons = [];
let buttonImages = [];

//array for display
let currentDisplayings = [];

// arrays for stamps 
let stamps = [];
let stampsImages = [];

//arrays for calligraphy
let calligraphy = [];
let calImages = [];


//let birds = [];

//boolean for mountain
let drawMt = false;
let drawMtPerm = false;

//boolean for stamp
let drawSt = false;
let drawStPerm = false;

//boolean for calligraphy
let drawCa = false;
let drawCaPerm = false;

let imgIdx, range;
let i;

//load mountain image
//error:loading forever
// function preload() {
//     for (var i = 0; i< 3; i++){
//         mount[i] = loadImage("images/mount" + i + ".png"); 
//     }
// }
let imgtest;

function preload() {
  //button images loading
  buttonimg1 = loadImage('buttons/button1.png');
  buttonimg2 = loadImage('buttons/button2.png');
  buttonimg3 = loadImage('buttons/button3.png');
  buttonimg4 = loadImage('buttons/button4.png');
  buttonimg5 = loadImage('buttons/button5.png');
  


  //button image pushing
  buttonImages.push(buttonimg1);
  buttonImages.push(buttonimg2);
  buttonImages.push(buttonimg3);
  buttonImages.push(buttonimg4);
  buttonImages.push(buttonimg5);



  //mountain images loading
  mountimg1 = loadImage('images/mount1.png');
  mountimg2 = loadImage('images/mount2.png');
  mountimg3 = loadImage('images/mount3.png');
  mountimg4 = loadImage('images/mount4.png');
  mountimg5 = loadImage('images/mount5.png');
  mountimg6 = loadImage('images/mount6.png');
  mountimg7 = loadImage('images/mount7.png');
  mountimg8 = loadImage('images/mount8.png');


  //stamps images loading
  stampimg1 = loadImage('stamps/stamp1.png');
  stampimg2 = loadImage('stamps/stamp2.png');
  stampimg3 = loadImage('stamps/stamp3.png');
  stampimg4 = loadImage('stamps/stamp4.png');
  stampimg5 = loadImage('stamps/stamp5.png');
  stampimg6 = loadImage('stamps/stamp6.png', loaded2);


  //calligraphy images loading
  calimg1 = loadImage('calligraphy/calligraphy1.png');
  calimg2 = loadImage('calligraphy/calligraphy2.png', loaded);
  calimg3 = loadImage('calligraphy/calligraphy3.png');
  calimg4 = loadImage('calligraphy/calligraphy4.png');



  //mountain image pushing
  mountsImages.push(mountimg1);
  mountsImages.push(mountimg2);
  mountsImages.push(mountimg3);
  mountsImages.push(mountimg4);
  mountsImages.push(mountimg5);
  mountsImages.push(mountimg6);
  mountsImages.push(mountimg7);
  mountsImages.push(mountimg8);

  //stamps images pushing
  stampsImages.push(stampimg1);
  stampsImages.push(stampimg2);
  stampsImages.push(stampimg3);
  stampsImages.push(stampimg4);
  stampsImages.push(stampimg5);
  stampsImages.push(stampimg6);


  //calligraphy images pushing
  calImages.push(calimg1);
  calImages.push(calimg2);
  calImages.push(calimg3);
  calImages.push(calimg4);



}

function loaded() {
  console.log("loaded");
}

function loaded2() {
  console.log("loaded2");
}

//define the canvas id
let canvas;
function setup() {
  canvas = createCanvas(900, 450);
  canvas.id("thecanvas");
  imageMode(CENTER);

  //load button image

  //load mountain image
  // mount.push(loadImage('images/mount1.png'));
  // mount.push(loadImage('images/mount2.png'));
  // mount.push(loadImage('images/mount3.png'));
  // mount.push(loadImage('images/mount4.png'));
  // mount.push(loadImage('images/mount5.png'));
  // mount.push(loadImage('images/mount6.png'));
  // mount.push(loadImage('images/mount7.png'));
  // mount.push(loadImage('images/mount8.png'));


  //put button
  for (let i = 0; i < buttonImages.length; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }

}

function draw() {

  // let index=0;
  //background
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);

  //display buttons
  buttons[0].display();
  buttons[1].display();
  buttons[2].display();
  buttons[3].display();
  buttons[4].display();
  
  

  //for (let index = 0; index < mountsImages.length; index++) {
  for (let i = 0; i < currentDisplayings.length; i++) {
    image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y, currentDisplayings[i].size, currentDisplayings[i].size);
    //try to use scale instead of size
    //     scale(range, range);

    //     image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y);

  }

  //draw mountains
  if (drawMt) drawMount();
  if (drawMtPerm) {
    drawMountFixed();
  }
  //draw stamps
  if (drawSt) drawStamp();
  if (drawStPerm) {
    drawStampFixed();
  }
  //draw calligraphy
  if (drawCa) drawCalli();
  if (drawCaPerm) {
    drawCalliFixed();
  }

}

//---1.function to draw mountains---//
function drawMount() {
  // if (mouseY < 500 && mouseY > 50)
  image(mountsImages[imgIdx], mouseX, mouseY, range, range);
  drawSt = false;
  drawCa = false;
  //try to use scale instead of size 
  // scale(range, range);
  // image(mountsImages[imgIdx], mouseX, mouseY);
}

function drawMountFixed() {
  let newMountain = {
    img: mountsImages[imgIdx],
    x: mtPosX,
    y: mtPosY,
    size: range
  };
  currentDisplayings.push(newMountain);
  drawMtPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}
//---1.function to draw mountains---end//


//---2.function to draw stamps--//
function drawStamp() {
  // if (mouseY < 500 && mouseY > 50)
  image(stampsImages[imgIdx], mouseX, mouseY, range, range);
  drawMt = false;
  drawCa = false;
  //try to use scale instead of size 
  // scale(range, range);
  // image(mountsImages[imgIdx], mouseX, mouseY);
}

function drawStampFixed() {
  let newStamp = {
    img: stampsImages[imgIdx],
    x: stPosX,
    y: stPosY,
    size: range
  };
  currentDisplayings.push(newStamp);
  drawStPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}
//---2.function to draw stamps---end//

//---3.function to draw calligraphy--//
function drawCalli() {
  // if (mouseY < 500 && mouseY > 50)
  image(calImages[imgIdx], mouseX, mouseY, range, range);
  drawMt = false;
  drawSt = false;
  //try to use scale instead of size 
  // scale(range, range);
  // image(mountsImages[imgIdx], mouseX, mouseY);
}

function drawCalliFixed() {
  let newCalli = {
    img: calImages[imgIdx],
    x: caPosX,
    y: caPosY,
    size: range
  };
  currentDisplayings.push(newCalli);
  drawCaPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}
//---3.function to draw calligraphy---end//


let currentButtonIndex = null;

function mousePressed() {
  // let imgIdx, range;
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].state == 1) {
      buttons[i].state = 2;
    }
  }
  for (let i = 0; i < buttons.length; i++) {

    // ---i=0; Mountain--- //
    if (buttons[i].isTouch() && i == 0) {
      buttons[i].state = 1;
      // mtIdx = round(random(0, 8));
      // stIdx = round(random(0, 8)); 
      imgIdx = round(random(0, 7));
      range = round(random(75, 300));
      // range = round(random(0.1, 0.8));
      // range = round(random(75, 300));
      // rangeSt = round(random(75, 300));
      currentButtonIndex = buttons[i].getIndex();
    }
    // ---Index =0; Mountain---end //

    // ---i=1; Stamp--- //  
    else if (buttons[i].isTouch() && i == 1) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 5));
      range = round(random(20, 40));
      currentButtonIndex = buttons[i].getIndex();
    }
    // ---Index =1; Stamp---end //  

    // ---i=2; Calligraphy--- //  
    else if (buttons[i].isTouch() && i == 2) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 3));
      range = round(random(75, 150));
      currentButtonIndex = buttons[i].getIndex();
    }
    // ---Index =2; Calligraphy---end // 
    
    
    // ---i=3; Clear--- //
    else if (buttons[i].isTouch() && i == 3) {
      currentDisplayings = [];
    }
       // ---Index =3; Clear---end // 
 
    // ---i=4; Add--- //
    else if (buttons[i].isTouch() && i == 4) {
      
       print("send");
  
  //create a new canvas 
  // let canvastosend = createCanvas(900, 450);
  //   canvastosend.id("canvastosend");

  //PROBLEM!!!!!crop the canvas to the proper size
  // canvastosend.image(canvas,0,-100,200,200);

  
  let theCanvas = document.getElementById('thecanvas');
   // document.getElementById('canvas');
	let dataurl = theCanvas.toDataURL();
  // console.log(dataurl);
	sendCanvas(dataurl);
  
  setTimeout(function(){
    // collectng the image data from the local server
//     httpGet('http://localhost:3000/imagetest', function(data) {
//       // data looks like ' ["shdjhsa","askjdnas","sadasd"]  '
//       data = data.slice(2, data.length-2); // data looks like ' shdjhsa","askjdnas","sadasd   '
//       data = data.split('","'); // now data is a real array:  ["shdjhsa","askjdnas","sadasd"]

//       print(data);    

//       window.open("http://localhost:3000/images/"+data[data.length-1]);
//     })
    window.open("http://localhost:3000/");
  }, 1500);
      
      //open a new window with the path of the route of the images
  // window.open("http://localhost:3000/");
 
    }
    // ---Index =4; Add---end // 
    
  }

  //-------CHECK BUTTON STATUS------//
  // Index =0; Mountain //
  if (currentButtonIndex == 0) {
    print("clicking mountain");
    if (buttons[0].state == 1) {
      print("mountain is moving");
      drawMt = true;
    }
    if (buttons[0].state == 2) {
      // dropping,fixing
      print("Mountain Fixed");
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
      // imgIdx = round(random(0, 8));

      //range = round(random(75, 300));

      buttons[0].state = 0;
    }
  }
  // end --- Index =0; Mountain // 

  // Index =1; Stamp //
  if (currentButtonIndex == 1) {
    print("clicking stamp");
    if (buttons[1].state == 1) {
      print("stamp is moving");
      drawSt = true;
    }
    if (buttons[1].state == 2) {
      // dropping,fixing
      print("Stamp Fixed");
      drawSt = false;
      drawStPerm = true;
      stPosX = mouseX;
      stPosY = mouseY;
      //range = round(random(10, 30));
      buttons[1].state = 0;
    }
  }
  // end --- Index =1; Stamp // 

  // Index =2; Calligraphy //
  if (currentButtonIndex == 2) {
    print("clicking calligraphy");
    if (buttons[2].state == 1) {
      print("calligraphy is moving");
      drawCa = true;
    }
    if (buttons[2].state == 2) {
      // dropping,fixing
      print("calligraphy Fixed");
      drawCa = false;
      drawCaPerm = true;
      caPosX = mouseX;
      caPosY = mouseY;
      //range = round(random(10, 30));
      buttons[2].state = 0;
    }
  }
  // end --- Index =2; Calligraphy // 
  
  // Index=3; Clear//
  
  // Index=4; Add//

}



function sendCanvas(data){
  var url = 'http://localhost:3000/sendingImage';
  
  httpPost(url, 'json',
           {"content": data},
     function (result) {
       print(result);
     });
}

// function keyPressed() {
//   print("send");
  
//   //create a new canvas 
//   let canvastosend = createCanvas(900, 450);
//     canvastosend.id("canvastosend");

//   //PROBLEM!!!!!crop the canvas to the proper size
//   canvastosend.image(canvas,0,0,200,200);

  
//   let theCanvas = document.getElementById('canvastosend');
//    // document.getElementById('canvas');
// 	let dataurl = theCanvas.toDataURL();
//   console.log(dataurl);
// 	sendCanvas(dataurl);
  
//   // collectng the image data from the local server
//   httpGet('http://localhost:3000/imagetest', function(data) {
//   print(data);})
  
  
  //open a new window with the path of the route of the images
  //window.open("http://www.google.com");
 
// }

//}var sp = 0;
var current;
var sensorVal=510;
var sensorValSp = 0;
var flag = false;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
	current = millis();
	if(current - sp>=3000 && flag){
		endSensor();
	}
	
	text(current,100,100);

}

function startSensor(){
	flag = true;
	sp = millis();
	console.log("set", sp);
	sensorValSp = 1;
}

function endSensor(){
	console.log("call end sensor");
	var diff = sensorVal - sensorValSp;
	if(diff>=500){
		console.log("love!");
	}
	flag = false;
	
}

function mousePressed(){
	startSensor();
}

function setup() { 
  createCanvas(400, 400);
  

} 

function draw() { 
  background(220);
}

function mousePressed(){
  httpGet('http://localhost:3000/imagetest', function(data) {
    print(data);
  });
}//to do list//
//add a "add" button
//new window 


// arrays for mounts
let mounts = [];
let mountsImages = [];

// arrays for buttons 
let buttons = [];
let buttonImages = [];

//array for display
let currentDisplayings = [];

// arrays for stamps 
let stamps = [];
let stampsImages = [];

//arrays for calligraphy
let calligraphy = [];
let calImages = [];


//let birds = [];

//boolean for mountain
let drawMt = false;
let drawMtPerm = false;

//boolean for stamp
let drawSt = false;
let drawStPerm = false;

//boolean for calligraphy
let drawCa = false;
let drawCaPerm = false;

let imgIdx, range;
let i;

//load mountain image
//error:loading forever
// function preload() {
//     for (var i = 0; i< 3; i++){
//         mount[i] = loadImage("images/mount" + i + ".png"); 
//     }
// }
let imgtest;

function preload() {
  //button images loading
  buttonimg1 = loadImage('buttons/button1.png');
  buttonimg2 = loadImage('buttons/button2.png');
  buttonimg3 = loadImage('buttons/button3.png');
  buttonimg4 = loadImage('buttons/button4.png');
  buttonimg5 = loadImage('buttons/button5.png');
  


  //button image pushing
  buttonImages.push(buttonimg1);
  buttonImages.push(buttonimg2);
  buttonImages.push(buttonimg3);
  buttonImages.push(buttonimg4);
  buttonImages.push(buttonimg5);



  //mountain images loading
  mountimg1 = loadImage('images/mount1.png');
  mountimg2 = loadImage('images/mount2.png');
  mountimg3 = loadImage('images/mount3.png');
  mountimg4 = loadImage('images/mount4.png');
  mountimg5 = loadImage('images/mount5.png');
  mountimg6 = loadImage('images/mount6.png');
  mountimg7 = loadImage('images/mount7.png');
  mountimg8 = loadImage('images/mount8.png');


  //stamps images loading
  stampimg1 = loadImage('stamps/stamp1.png');
  stampimg2 = loadImage('stamps/stamp2.png');
  stampimg3 = loadImage('stamps/stamp3.png');
  stampimg4 = loadImage('stamps/stamp4.png');
  stampimg5 = loadImage('stamps/stamp5.png');
  stampimg6 = loadImage('stamps/stamp6.png', loaded2);


  //calligraphy images loading
  calimg1 = loadImage('calligraphy/calligraphy1.png');
  calimg2 = loadImage('calligraphy/calligraphy2.png', loaded);
  calimg3 = loadImage('calligraphy/calligraphy3.png');
  calimg4 = loadImage('calligraphy/calligraphy4.png');



  //mountain image pushing
  mountsImages.push(mountimg1);
  mountsImages.push(mountimg2);
  mountsImages.push(mountimg3);
  mountsImages.push(mountimg4);
  mountsImages.push(mountimg5);
  mountsImages.push(mountimg6);
  mountsImages.push(mountimg7);
  mountsImages.push(mountimg8);

  //stamps images pushing
  stampsImages.push(stampimg1);
  stampsImages.push(stampimg2);
  stampsImages.push(stampimg3);
  stampsImages.push(stampimg4);
  stampsImages.push(stampimg5);
  stampsImages.push(stampimg6);


  //calligraphy images pushing
  calImages.push(calimg1);
  calImages.push(calimg2);
  calImages.push(calimg3);
  calImages.push(calimg4);



}

function loaded() {
  console.log("loaded");
}

function loaded2() {
  console.log("loaded2");
}

//define the canvas id
let canvas;
function setup() {
  canvas = createCanvas(900, 450);
  canvas.id("thecanvas");
  imageMode(CENTER);

  //load button image

  //load mountain image
  // mount.push(loadImage('images/mount1.png'));
  // mount.push(loadImage('images/mount2.png'));
  // mount.push(loadImage('images/mount3.png'));
  // mount.push(loadImage('images/mount4.png'));
  // mount.push(loadImage('images/mount5.png'));
  // mount.push(loadImage('images/mount6.png'));
  // mount.push(loadImage('images/mount7.png'));
  // mount.push(loadImage('images/mount8.png'));


  //put button
  for (let i = 0; i < buttonImages.length; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }

}

function draw() {

  // let index=0;
  //background
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);

  //display buttons
  buttons[0].display();
  buttons[1].display();
  buttons[2].display();
  buttons[3].display();
  buttons[4].display();
  
  

  //for (let index = 0; index < mountsImages.length; index++) {
  for (let i = 0; i < currentDisplayings.length; i++) {
    image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y, currentDisplayings[i].size, currentDisplayings[i].size);
    //try to use scale instead of size
    //     scale(range, range);

    //     image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y);

  }

  //draw mountains
  if (drawMt) drawMount();
  if (drawMtPerm) {
    drawMountFixed();
  }
  //draw stamps
  if (drawSt) drawStamp();
  if (drawStPerm) {
    drawStampFixed();
  }
  //draw calligraphy
  if (drawCa) drawCalli();
  if (drawCaPerm) {
    drawCalliFixed();
  }

}

//---1.function to draw mountains---//
function drawMount() {
  // if (mouseY < 500 && mouseY > 50)
  image(mountsImages[imgIdx], mouseX, mouseY, range, range);
  //try to use scale instead of size 
  // scale(range, range);
  // image(mountsImages[imgIdx], mouseX, mouseY);
}

function drawMountFixed() {
  let newMountain = {
    img: mountsImages[imgIdx],
    x: mtPosX,
    y: mtPosY,
    size: range
  };
  currentDisplayings.push(newMountain);
  drawMtPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}
//---1.function to draw mountains---end//


//---2.function to draw stamps--//
function drawStamp() {
  // if (mouseY < 500 && mouseY > 50)
  image(stampsImages[imgIdx], mouseX, mouseY, range, range);
  //try to use scale instead of size 
  // scale(range, range);
  // image(mountsImages[imgIdx], mouseX, mouseY);
}

function drawStampFixed() {
  let newStamp = {
    img: stampsImages[imgIdx],
    x: stPosX,
    y: stPosY,
    size: range
  };
  currentDisplayings.push(newStamp);
  drawStPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}
//---2.function to draw stamps---end//

//---3.function to draw calligraphy--//
function drawCalli() {
  // if (mouseY < 500 && mouseY > 50)
  image(calImages[imgIdx], mouseX, mouseY, range, range);
  //try to use scale instead of size 
  // scale(range, range);
  // image(mountsImages[imgIdx], mouseX, mouseY);
}

function drawCalliFixed() {
  let newCalli = {
    img: calImages[imgIdx],
    x: caPosX,
    y: caPosY,
    size: range
  };
  currentDisplayings.push(newCalli);
  drawCaPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}
//---3.function to draw calligraphy---end//


let currentButtonIndex = null;

function mouseClicked() {
  // let imgIdx, range;
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].state == 1) {
      buttons[i].state = 2;
    }
  }
  for (let i = 0; i < buttons.length; i++) {

    // ---i=0; Mountain--- //
    if (buttons[i].isTouch() && i == 0) {
      buttons[i].state = 1;
      // mtIdx = round(random(0, 8));
      // stIdx = round(random(0, 8)); 
      imgIdx = round(random(0, 7));
      range = round(random(75, 300));
      // range = round(random(0.1, 0.8));
      // range = round(random(75, 300));
      // rangeSt = round(random(75, 300));
      currentButtonIndex = buttons[i].getIndex();
    }
    // ---Index =0; Mountain---end //

    // ---i=1; Stamp--- //  
    else if (buttons[i].isTouch() && i == 1) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 5));
      range = round(random(20, 40));
      currentButtonIndex = buttons[i].getIndex();
    }
    // ---Index =1; Stamp---end //  

    // ---i=2; Calligraphy--- //  
    else if (buttons[i].isTouch() && i == 2) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 3));
      range = round(random(75, 150));
      currentButtonIndex = buttons[i].getIndex();
    }
    // ---Index =2; Calligraphy---end // 
    
    
    // ---i=3; Clear--- //
    else if (buttons[i].isTouch() && i == 3) {
      currentDisplayings = [];
    }
       // ---Index =3; Clear---end // 
 
    // ---i=4; Add--- //
    else if (buttons[i].isTouch() && i == 4) {
      
       print("send");
  
  //create a new canvas 
  // let canvastosend = createCanvas(900, 450);
  //   canvastosend.id("canvastosend");

  //PROBLEM!!!!!crop the canvas to the proper size
  // canvastosend.image(canvas,0,-100,200,200);

  
  let theCanvas = document.getElementById('thecanvas');
   // document.getElementById('canvas');
	let dataurl = theCanvas.toDataURL();
  // console.log(dataurl);
	sendCanvas(dataurl);
  
  setTimeout(function(){
    // collectng the image data from the local server
//     httpGet('http://localhost:3000/imagetest', function(data) {
//       // data looks like ' ["shdjhsa","askjdnas","sadasd"]  '
//       data = data.slice(2, data.length-2); // data looks like ' shdjhsa","askjdnas","sadasd   '
//       data = data.split('","'); // now data is a real array:  ["shdjhsa","askjdnas","sadasd"]

//       print(data);    

//       window.open("http://localhost:3000/images/"+data[data.length-1]);
//     })
    window.open("http://localhost:3000/");
  }, 1500);
      
      //open a new window with the path of the route of the images
  // window.open("http://localhost:3000/");
 
    }
    // ---Index =4; Add---end // 
    
  }

  //-------CHECK BUTTON STATUS------//
  // Index =0; Mountain //
  if (currentButtonIndex == 0) {
    print("clicking mountain");
    if (buttons[0].state == 1) {
      print("mountain is moving");
      drawMt = true;
    }
    if (buttons[0].state == 2) {
      // dropping,fixing
      print("Mountain Fixed");
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
      // imgIdx = round(random(0, 8));

      //range = round(random(75, 300));

      buttons[0].state = 0;
    }
  }
  // end --- Index =0; Mountain // 

  // Index =1; Stamp //
  if (currentButtonIndex == 1) {
    print("clicking stamp");
    if (buttons[1].state == 1) {
      print("stamp is moving");
      drawSt = true;
    }
    if (buttons[1].state == 2) {
      // dropping,fixing
      print("Stamp Fixed");
      drawSt = false;
      drawStPerm = true;
      stPosX = mouseX;
      stPosY = mouseY;
      //range = round(random(10, 30));
      buttons[1].state = 0;
    }
  }
  // end --- Index =1; Stamp // 

  // Index =2; Calligraphy //
  if (currentButtonIndex == 2) {
    print("clicking calligraphy");
    if (buttons[2].state == 1) {
      print("calligraphy is moving");
      drawCa = true;
    }
    if (buttons[2].state == 2) {
      // dropping,fixing
      print("calligraphy Fixed");
      drawCa = false;
      drawCaPerm = true;
      caPosX = mouseX;
      caPosY = mouseY;
      //range = round(random(10, 30));
      buttons[2].state = 0;
    }
  }
  // end --- Index =2; Calligraphy // 
  
  // Index=3; Clear//
  
  // Index=4; Add//

}



function sendCanvas(data){
  var url = 'http://localhost:3000/sendingImage';
  
  httpPost(url, 'json',
           {"content": data},
     function (result) {
       print(result);
     });
}

// function keyPressed() {
//   print("send");
  
//   //create a new canvas 
//   let canvastosend = createCanvas(900, 450);
//     canvastosend.id("canvastosend");

//   //PROBLEM!!!!!crop the canvas to the proper size
//   canvastosend.image(canvas,0,0,200,200);

  
//   let theCanvas = document.getElementById('canvastosend');
//    // document.getElementById('canvas');
// 	let dataurl = theCanvas.toDataURL();
//   console.log(dataurl);
// 	sendCanvas(dataurl);
  
//   // collectng the image data from the local server
//   httpGet('http://localhost:3000/imagetest', function(data) {
//   print(data);})
  
  
  //open a new window with the path of the route of the images
  //window.open("http://www.google.com");
 
// }

//}//to do list//
//add a "add" button
//new window 


// arrays for mounts
let mounts = [];
let mountsImages = [];

// arrays for buttons 
let buttons = [];
let buttonImages = [];

//array for display
let currentDisplayings = [];

// arrays for stamps 
let stamps = [];
let stampsImages = [];

//arrays for calligraphy
let calligraphy = [];
let calImages = [];


//let birds = [];

//boolean for mountain
let drawMt = false;
let drawMtPerm = false;

//boolean for stamp
let drawSt = false;
let drawStPerm = false;

//boolean for calligraphy
let drawCa = false;
let drawCaPerm = false;

let imgIdx, range;
let i;

//load mountain image
//error:loading forever
// function preload() {
//     for (var i = 0; i< 3; i++){
//         mount[i] = loadImage("images/mount" + i + ".png"); 
//     }
// }
let imgtest;

function preload() {
  //button images loading
  buttonimg1 = loadImage('buttons/button1.png');
  buttonimg2 = loadImage('buttons/button2.png');
  buttonimg3 = loadImage('buttons/button3.png');
  buttonimg4 = loadImage('buttons/button4.png');
  buttonimg5 = loadImage('buttons/button5.png');
  


  //button image pushing
  buttonImages.push(buttonimg1);
  buttonImages.push(buttonimg2);
  buttonImages.push(buttonimg3);
  buttonImages.push(buttonimg4);
  buttonImages.push(buttonimg5);



  //mountain images loading
  mountimg1 = loadImage('images/mount1.png');
  mountimg2 = loadImage('images/mount2.png');
  mountimg3 = loadImage('images/mount3.png');
  mountimg4 = loadImage('images/mount4.png');
  mountimg5 = loadImage('images/mount5.png');
  mountimg6 = loadImage('images/mount6.png');
  mountimg7 = loadImage('images/mount7.png');
  mountimg8 = loadImage('images/mount8.png');


  //stamps images loading
  stampimg1 = loadImage('stamps/stamp1.png');
  stampimg2 = loadImage('stamps/stamp2.png');
  stampimg3 = loadImage('stamps/stamp3.png');
  stampimg4 = loadImage('stamps/stamp4.png');
  stampimg5 = loadImage('stamps/stamp5.png');
  stampimg6 = loadImage('stamps/stamp6.png', loaded2);


  //calligraphy images loading
  calimg1 = loadImage('calligraphy/calligraphy1.png');
  calimg2 = loadImage('calligraphy/calligraphy2.png', loaded);
  calimg3 = loadImage('calligraphy/calligraphy3.png');
  calimg4 = loadImage('calligraphy/calligraphy4.png');



  //mountain image pushing
  mountsImages.push(mountimg1);
  mountsImages.push(mountimg2);
  mountsImages.push(mountimg3);
  mountsImages.push(mountimg4);
  mountsImages.push(mountimg5);
  mountsImages.push(mountimg6);
  mountsImages.push(mountimg7);
  mountsImages.push(mountimg8);

  //stamps images pushing
  stampsImages.push(stampimg1);
  stampsImages.push(stampimg2);
  stampsImages.push(stampimg3);
  stampsImages.push(stampimg4);
  stampsImages.push(stampimg5);
  stampsImages.push(stampimg6);


  //calligraphy images pushing
  calImages.push(calimg1);
  calImages.push(calimg2);
  calImages.push(calimg3);
  calImages.push(calimg4);



}

function loaded() {
  console.log("loaded");
}

function loaded2() {
  console.log("loaded2");
}

//define the canvas id
let canvas;
function setup() {
  canvas = createCanvas(900, 450);
  canvas.id("canvas");
  imageMode(CENTER);

  //load button image

  //load mountain image
  // mount.push(loadImage('images/mount1.png'));
  // mount.push(loadImage('images/mount2.png'));
  // mount.push(loadImage('images/mount3.png'));
  // mount.push(loadImage('images/mount4.png'));
  // mount.push(loadImage('images/mount5.png'));
  // mount.push(loadImage('images/mount6.png'));
  // mount.push(loadImage('images/mount7.png'));
  // mount.push(loadImage('images/mount8.png'));


  //put button
  for (let i = 0; i < buttonImages.length; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }

}

function draw() {

  // let index=0;
  //background
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);

  //display buttons
  buttons[0].display();
  buttons[1].display();
  buttons[2].display();
  buttons[3].display();
  buttons[4].display();
  
  

  //for (let index = 0; index < mountsImages.length; index++) {
  for (let i = 0; i < currentDisplayings.length; i++) {
    image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y, currentDisplayings[i].size, currentDisplayings[i].size);
    //try to use scale instead of size
    //     scale(range, range);

    //     image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y);

  }

  //draw mountains
  if (drawMt) drawMount();
  if (drawMtPerm) {
    drawMountFixed();
  }
  //draw stamps
  if (drawSt) drawStamp();
  if (drawStPerm) {
    drawStampFixed();
  }
  //draw calligraphy
  if (drawCa) drawCalli();
  if (drawCaPerm) {
    drawCalliFixed();
  }
  //}
}

//---1.function to draw mountains---//
function drawMount() {
  // if (mouseY < 500 && mouseY > 50)
  image(mountsImages[imgIdx], mouseX, mouseY, range, range);
  //try to use scale instead of size 
  // scale(range, range);
  // image(mountsImages[imgIdx], mouseX, mouseY);
}

function drawMountFixed() {
  let newMountain = {
    img: mountsImages[imgIdx],
    x: mtPosX,
    y: mtPosY,
    size: range
  };
  currentDisplayings.push(newMountain);
  drawMtPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}
//---1.function to draw mountains---end//


//---2.function to draw stamps--//
function drawStamp() {
  // if (mouseY < 500 && mouseY > 50)
  image(stampsImages[imgIdx], mouseX, mouseY, range, range);
  //try to use scale instead of size 
  // scale(range, range);
  // image(mountsImages[imgIdx], mouseX, mouseY);
}

function drawStampFixed() {
  let newStamp = {
    img: stampsImages[imgIdx],
    x: stPosX,
    y: stPosY,
    size: range
  };
  currentDisplayings.push(newStamp);
  drawStPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}
//---2.function to draw stamps---end//

//---3.function to draw calligraphy--//
function drawCalli() {
  // if (mouseY < 500 && mouseY > 50)
  image(calImages[imgIdx], mouseX, mouseY, range, range);
  //try to use scale instead of size 
  // scale(range, range);
  // image(mountsImages[imgIdx], mouseX, mouseY);
}

function drawCalliFixed() {
  let newCalli = {
    img: calImages[imgIdx],
    x: caPosX,
    y: caPosY,
    size: range
  };
  currentDisplayings.push(newCalli);
  drawCaPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}
//---3.function to draw calligraphy---end//


let currentButtonIndex = null;

function mouseClicked() {
  // let imgIdx, range;
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].state == 1) {
      buttons[i].state = 2;
    }
  }
  for (let i = 0; i < buttons.length; i++) {

    // ---i=0; Mountain--- //
    if (buttons[i].isTouch() && i == 0) {
      buttons[i].state = 1;
      // mtIdx = round(random(0, 8));
      // stIdx = round(random(0, 8)); 
      imgIdx = round(random(0, 7));
      range = round(random(75, 300));
      // range = round(random(0.1, 0.8));
      // range = round(random(75, 300));
      // rangeSt = round(random(75, 300));
      currentButtonIndex = buttons[i].getIndex();
    }
    // ---Index =0; Mountain---end //

    // ---i=1; Stamp--- //  
    else if (buttons[i].isTouch() && i == 1) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 5));
      range = round(random(20, 40));
      currentButtonIndex = buttons[i].getIndex();
    }
    // ---Index =1; Stamp---end //  

    // ---i=2; Calligraphy--- //  
    else if (buttons[i].isTouch() && i == 2) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 3));
      range = round(random(75, 150));
      currentButtonIndex = buttons[i].getIndex();
    }
    // ---Index =2; Calligraphy---end // 
    
    
    // ---i=3; Clear--- //
    else if (buttons[i].isTouch() && i == 3) {
      currentDisplayings = [];
    }
       // ---Index =3; Clear---end // 
 
    // ---i=4; Add--- //
    else if (buttons[i].isTouch() && i == 4) {
      //open a new window with the path of the route of the images
  window.open("http://www.google.com");
 
    }
    // ---Index =4; Clear---end // 
    
  }

  //-------CHECK BUTTON STATUS------//
  // Index =0; Mountain //
  if (currentButtonIndex == 0) {
    print("clicking mountain");
    if (buttons[0].state == 1) {
      print("mountain is moving");
      drawMt = true;
    }
    if (buttons[0].state == 2) {
      // dropping,fixing
      print("Mountain Fixed");
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
      // imgIdx = round(random(0, 8));

      //range = round(random(75, 300));

      buttons[0].state = 0;
    }
  }
  // end --- Index =0; Mountain // 

  // Index =1; Stamp //
  if (currentButtonIndex == 1) {
    print("clicking stamp");
    if (buttons[1].state == 1) {
      print("stamp is moving");
      drawSt = true;
    }
    if (buttons[1].state == 2) {
      // dropping,fixing
      print("Stamp Fixed");
      drawSt = false;
      drawStPerm = true;
      stPosX = mouseX;
      stPosY = mouseY;
      //range = round(random(10, 30));
      buttons[1].state = 0;
    }
  }
  // end --- Index =1; Stamp // 

  // Index =2; Calligraphy //
  if (currentButtonIndex == 2) {
    print("clicking calligraphy");
    if (buttons[2].state == 1) {
      print("calligraphy is moving");
      drawCa = true;
    }
    if (buttons[2].state == 2) {
      // dropping,fixing
      print("calligraphy Fixed");
      drawCa = false;
      drawCaPerm = true;
      caPosX = mouseX;
      caPosY = mouseY;
      //range = round(random(10, 30));
      buttons[2].state = 0;
    }
  }
  // end --- Index =2; Calligraphy // 
  
  // Index=3; Clear//
  
  // Index=4; Add//

}



function sendCanvas(data){
  var url = 'http://localhost:3000/';
  
  httpPost(url, 'json',
           {"content": data},
     function (result) {
       print("sent!");
     });
}

function keyPressed() {
  print("send");
  
  //create a new canvas 
  let canvastosend = createCanvas(900, 450);
    canvastosend.id("canvastosend");

  //PROBLEM!!!!!crop the canvas to the proper size
  canvastosend.image(canvas,0,0,200,200);

  
  let theCanvas = document.getElementById('canvastosend');
   // document.getElementById('canvas');
	let dataurl = theCanvas.toDataURL();
  console.log(dataurl);
	sendCanvas(dataurl);
  
  // collectng the image data from the local server
  httpGet('http://localhost:3000/imagetest', function(data) {
  print(data);})
  
  
  //open a new window with the path of the route of the images
  //window.open("http://www.google.com");
 
}

//}//to do list
//把save做到button里
//解决新窗口显示问题


// arrays for mounts
let mounts = [];
let mountsImages = [];

// arrays for buttons 
let buttons = [];
let buttonImages = [];

//array for display
let currentDisplayings = [];

// arrays for stamps 
let stamps = [];
let stampsImages = [];

//arrays for calligraphy
let calligraphy = [];
let calImages = [];


//let birds = [];

//boolean for mountain
let drawMt = false;
let drawMtPerm = false;

//boolean for stamp
let drawSt = false;
let drawStPerm = false;

//boolean for calligraphy
let drawCa = false;
let drawCaPerm = false;

let imgIdx, range;
let i;

//load mountain image
//error:loading forever
// function preload() {
//     for (var i = 0; i< 3; i++){
//         mount[i] = loadImage("images/mount" + i + ".png"); 
//     }
// }
let imgtest;

function preload() {
  //button images loading
  buttonimg1 = loadImage('buttons/button1.png');
  buttonimg2 = loadImage('buttons/button2.png');
  buttonimg3 = loadImage('buttons/button3.png');
  buttonimg4 = loadImage('buttons/button4.png');


  //button image pushing
  buttonImages.push(buttonimg1);
  buttonImages.push(buttonimg2);
  buttonImages.push(buttonimg3);
  buttonImages.push(buttonimg4);



  //mountain images loading
  mountimg1 = loadImage('images/mount1.png');
  mountimg2 = loadImage('images/mount2.png');
  mountimg3 = loadImage('images/mount3.png');
  mountimg4 = loadImage('images/mount4.png');
  mountimg5 = loadImage('images/mount5.png');
  mountimg6 = loadImage('images/mount6.png');
  mountimg7 = loadImage('images/mount7.png');
  mountimg8 = loadImage('images/mount8.png');


  //stamps images loading
  stampimg1 = loadImage('stamps/stamp1.png');
  stampimg2 = loadImage('stamps/stamp2.png');
  stampimg3 = loadImage('stamps/stamp3.png');
  stampimg4 = loadImage('stamps/stamp4.png');
  stampimg5 = loadImage('stamps/stamp5.png');
  stampimg6 = loadImage('stamps/stamp6.png', loaded2);


  //calligraphy images loading
  calimg1 = loadImage('calligraphy/calligraphy1.png');
  calimg2 = loadImage('calligraphy/calligraphy2.png', loaded);
  calimg3 = loadImage('calligraphy/calligraphy3.png');
  calimg4 = loadImage('calligraphy/calligraphy4.png');



  //mountain image pushing
  mountsImages.push(mountimg1);
  mountsImages.push(mountimg2);
  mountsImages.push(mountimg3);
  mountsImages.push(mountimg4);
  mountsImages.push(mountimg5);
  mountsImages.push(mountimg6);
  mountsImages.push(mountimg7);
  mountsImages.push(mountimg8);

  //stamps images pushing
  stampsImages.push(stampimg1);
  stampsImages.push(stampimg2);
  stampsImages.push(stampimg3);
  stampsImages.push(stampimg4);
  stampsImages.push(stampimg5);
  stampsImages.push(stampimg6);


  //calligraphy images pushing
  calImages.push(calimg1);
  calImages.push(calimg2);
  calImages.push(calimg3);
  calImages.push(calimg4);



}

function loaded() {
  console.log("loaded");
}

function loaded2() {
  console.log("loaded2");
}

//define the canvas id
let canvas;
function setup() {
  canvas = createCanvas(900, 450);
  canvas.id("canvas");
  imageMode(CENTER);

  //load button image

  //load mountain image
  // mount.push(loadImage('images/mount1.png'));
  // mount.push(loadImage('images/mount2.png'));
  // mount.push(loadImage('images/mount3.png'));
  // mount.push(loadImage('images/mount4.png'));
  // mount.push(loadImage('images/mount5.png'));
  // mount.push(loadImage('images/mount6.png'));
  // mount.push(loadImage('images/mount7.png'));
  // mount.push(loadImage('images/mount8.png'));


  //put button
  for (let i = 0; i < buttonImages.length; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }

}

function draw() {

  // let index=0;
  //background
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);

  //display buttons
  buttons[0].display();
  buttons[1].display();
  buttons[2].display();
  buttons[3].display();
  

  //for (let index = 0; index < mountsImages.length; index++) {
  for (let i = 0; i < currentDisplayings.length; i++) {
    image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y, currentDisplayings[i].size, currentDisplayings[i].size);
    //try to use scale instead of size
    //     scale(range, range);

    //     image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y);

  }

  //draw mountains
  if (drawMt) drawMount();
  if (drawMtPerm) {
    drawMountFixed();
  }
  //draw stamps
  if (drawSt) drawStamp();
  if (drawStPerm) {
    drawStampFixed();
  }
  //draw calligraphy
  if (drawCa) drawCalli();
  if (drawCaPerm) {
    drawCalliFixed();
  }
  //}
}

//---1.function to draw mountains---//
function drawMount() {
  // if (mouseY < 500 && mouseY > 50)
  image(mountsImages[imgIdx], mouseX, mouseY, range, range);
  //try to use scale instead of size 
  // scale(range, range);
  // image(mountsImages[imgIdx], mouseX, mouseY);
}

function drawMountFixed() {
  let newMountain = {
    img: mountsImages[imgIdx],
    x: mtPosX,
    y: mtPosY,
    size: range
  };
  currentDisplayings.push(newMountain);
  drawMtPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}
//---1.function to draw mountains---end//


//---2.function to draw stamps--//
function drawStamp() {
  // if (mouseY < 500 && mouseY > 50)
  image(stampsImages[imgIdx], mouseX, mouseY, range, range);
  //try to use scale instead of size 
  // scale(range, range);
  // image(mountsImages[imgIdx], mouseX, mouseY);
}

function drawStampFixed() {
  let newStamp = {
    img: stampsImages[imgIdx],
    x: stPosX,
    y: stPosY,
    size: range
  };
  currentDisplayings.push(newStamp);
  drawStPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}
//---2.function to draw stamps---end//

//---3.function to draw calligraphy--//
function drawCalli() {
  // if (mouseY < 500 && mouseY > 50)
  image(calImages[imgIdx], mouseX, mouseY, range, range);
  //try to use scale instead of size 
  // scale(range, range);
  // image(mountsImages[imgIdx], mouseX, mouseY);
}

function drawCalliFixed() {
  let newCalli = {
    img: calImages[imgIdx],
    x: caPosX,
    y: caPosY,
    size: range
  };
  currentDisplayings.push(newCalli);
  drawCaPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}
//---3.function to draw calligraphy---end//


let currentButtonIndex = null;

function mouseClicked() {
  // let imgIdx, range;
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].state == 1) {
      buttons[i].state = 2;
    }
  }
  for (let i = 0; i < buttons.length; i++) {

    // ---i=0; Mountain--- //
    if (buttons[i].isTouch() && i == 0) {
      buttons[i].state = 1;
      // mtIdx = round(random(0, 8));
      // stIdx = round(random(0, 8)); 
      imgIdx = round(random(0, 7));
      range = round(random(75, 300));
      // range = round(random(0.1, 0.8));
      // range = round(random(75, 300));
      // rangeSt = round(random(75, 300));
      currentButtonIndex = buttons[i].getIndex();
    }
    // ---Index =0; Mountain---end //

    // ---i=1; Stamp--- //  
    else if (buttons[i].isTouch() && i == 1) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 5));
      range = round(random(20, 40));
      currentButtonIndex = buttons[i].getIndex();
    }
    // ---Index =1; Stamp---end //  

    // ---i=2; Calligraphy--- //  
    else if (buttons[i].isTouch() && i == 2) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 3));
      range = round(random(75, 150));
      currentButtonIndex = buttons[i].getIndex();
    }
    // ---Index =2; Calligraphy---end // 
    
    else if (buttons[i].isTouch() && i == 3) {
      currentDisplayings = [];
    }
  }

  //-------CHECK BUTTON STATUS------//
  // Index =0; Mountain //
  if (currentButtonIndex == 0) {
    print("clicking mountain");
    if (buttons[0].state == 1) {
      print("mountain is moving");
      drawMt = true;
    }
    if (buttons[0].state == 2) {
      // dropping,fixing
      print("Mountain Fixed");
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
      // imgIdx = round(random(0, 8));

      //range = round(random(75, 300));

      buttons[0].state = 0;
    }
  }
  // end --- Index =0; Mountain // 

  // Index =1; Stamp //
  if (currentButtonIndex == 1) {
    print("clicking stamp");
    if (buttons[1].state == 1) {
      print("stamp is moving");
      drawSt = true;
    }
    if (buttons[1].state == 2) {
      // dropping,fixing
      print("Stamp Fixed");
      drawSt = false;
      drawStPerm = true;
      stPosX = mouseX;
      stPosY = mouseY;
      //range = round(random(10, 30));
      buttons[1].state = 0;
    }
  }
  // end --- Index =1; Stamp // 

  // Index =2; Calligraphy //
  if (currentButtonIndex == 2) {
    print("clicking calligraphy");
    if (buttons[2].state == 1) {
      print("calligraphy is moving");
      drawCa = true;
    }
    if (buttons[2].state == 2) {
      // dropping,fixing
      print("calligraphy Fixed");
      drawCa = false;
      drawCaPerm = true;
      caPosX = mouseX;
      caPosY = mouseY;
      //range = round(random(10, 30));
      buttons[2].state = 0;
    }
  }
  // end --- Index =2; Calligraphy // 
  
  // Index=3; Clear//

}



function sendCanvas(data){
  var url = 'http://localhost:3000/';
  
  httpPost(url, 'json',
           {"content": data},
     function (result) {
       print("sent!");
     });
}

function keyPressed() {
  print("send");
  
  //create a new canvas 
  let canvastosend = createCanvas(900, 450);
    canvastosend.id("canvastosend");

  //PROBLEM!!!!!crop the canvas to the proper size
  canvastosend.image(canvas,0,0,200,200);

  
  let theCanvas = document.getElementById('canvastosend');
   // document.getElementById('canvas');
	let dataurl = theCanvas.toDataURL();
  console.log(dataurl);
	sendCanvas(dataurl);
  
  // collectng the image data from the local server
  httpGet('http://localhost:3000/imagetest', function(data) {
  print(data);})
  
  
  //open a new window with the path of the route of the images
  //window.open("http://www.google.com");
 
}

//}//to do list
//把save做到button里
//解决新窗口显示问题


// arrays for mounts
let mounts = [];
let mountsImages = [];

// arrays for buttons 
let buttons = [];
let buttonImages = [];

//array for display
let currentDisplayings = [];

// arrays for stamps 
let stamps = [];
let stampsImages = [];

//arrays for calligraphy
let calligraphy = [];
let calImages = [];


//let birds = [];

//boolean for mountain
let drawMt = false;
let drawMtPerm = false;

//boolean for stamp
let drawSt = false;
let drawStPerm = false;

//boolean for calligraphy
let drawCa = false;
let drawCaPerm = false;

let imgIdx, range;
let i;

//load mountain image
//error:loading forever
// function preload() {
//     for (var i = 0; i< 3; i++){
//         mount[i] = loadImage("images/mount" + i + ".png"); 
//     }
// }
let imgtest;

function preload() {
  //button images loading
  buttonimg1 = loadImage('buttons/button1.png');
  buttonimg2 = loadImage('buttons/button2.png');
  buttonimg3 = loadImage('buttons/button3.png');
  buttonimg4 = loadImage('buttons/button4.png');


  //button image pushing
  buttonImages.push(buttonimg1);
  buttonImages.push(buttonimg2);
  buttonImages.push(buttonimg3);
  buttonImages.push(buttonimg4);



  //mountain images loading
  mountimg1 = loadImage('images/mount1.png');
  mountimg2 = loadImage('images/mount2.png');
  mountimg3 = loadImage('images/mount3.png');
  mountimg4 = loadImage('images/mount4.png');
  mountimg5 = loadImage('images/mount5.png');
  mountimg6 = loadImage('images/mount6.png');
  mountimg7 = loadImage('images/mount7.png');
  mountimg8 = loadImage('images/mount8.png');


  //stamps images loading
  stampimg1 = loadImage('stamps/stamp1.png');
  stampimg2 = loadImage('stamps/stamp2.png');
  stampimg3 = loadImage('stamps/stamp3.png');
  stampimg4 = loadImage('stamps/stamp4.png');
  stampimg5 = loadImage('stamps/stamp5.png');
  stampimg6 = loadImage('stamps/stamp6.png', loaded2);


  //calligraphy images loading
  calimg1 = loadImage('calligraphy/calligraphy1.png');
  calimg2 = loadImage('calligraphy/calligraphy2.png', loaded);
  calimg3 = loadImage('calligraphy/calligraphy3.png');
  calimg4 = loadImage('calligraphy/calligraphy4.png');



  //mountain image pushing
  mountsImages.push(mountimg1);
  mountsImages.push(mountimg2);
  mountsImages.push(mountimg3);
  mountsImages.push(mountimg4);
  mountsImages.push(mountimg5);
  mountsImages.push(mountimg6);
  mountsImages.push(mountimg7);
  mountsImages.push(mountimg8);

  //stamps images pushing
  stampsImages.push(stampimg1);
  stampsImages.push(stampimg2);
  stampsImages.push(stampimg3);
  stampsImages.push(stampimg4);
  stampsImages.push(stampimg5);
  stampsImages.push(stampimg6);


  //calligraphy images pushing
  calImages.push(calimg1);
  calImages.push(calimg2);
  calImages.push(calimg3);
  calImages.push(calimg4);



}

function loaded() {
  console.log("loaded");
}

function loaded2() {
  console.log("loaded2");
}

//define the canvas id
let canvas;
function setup() {
  canvas = createCanvas(900, 450);
  canvas.id("canvas");
  imageMode(CENTER);

  //load button image

  //load mountain image
  // mount.push(loadImage('images/mount1.png'));
  // mount.push(loadImage('images/mount2.png'));
  // mount.push(loadImage('images/mount3.png'));
  // mount.push(loadImage('images/mount4.png'));
  // mount.push(loadImage('images/mount5.png'));
  // mount.push(loadImage('images/mount6.png'));
  // mount.push(loadImage('images/mount7.png'));
  // mount.push(loadImage('images/mount8.png'));


  //put button
  for (let i = 0; i < buttonImages.length; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }

}

function draw() {

  // let index=0;
  //background
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);

  //display buttons
  buttons[0].display();
  buttons[1].display();
  buttons[2].display();
  buttons[3].display();
  

  //for (let index = 0; index < mountsImages.length; index++) {
  for (let i = 0; i < currentDisplayings.length; i++) {
    image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y, currentDisplayings[i].size, currentDisplayings[i].size);
    //try to use scale instead of size
    //     scale(range, range);

    //     image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y);

  }

  //draw mountains
  if (drawMt) drawMount();
  if (drawMtPerm) {
    drawMountFixed();
  }
  //draw stamps
  if (drawSt) drawStamp();
  if (drawStPerm) {
    drawStampFixed();
  }
  //draw calligraphy
  if (drawCa) drawCalli();
  if (drawCaPerm) {
    drawCalliFixed();
  }
  //}
}

//---1.function to draw mountains---//
function drawMount() {
  // if (mouseY < 500 && mouseY > 50)
  image(mountsImages[imgIdx], mouseX, mouseY, range, range);
  //try to use scale instead of size 
  // scale(range, range);
  // image(mountsImages[imgIdx], mouseX, mouseY);
}

function drawMountFixed() {
  let newMountain = {
    img: mountsImages[imgIdx],
    x: mtPosX,
    y: mtPosY,
    size: range
  };
  currentDisplayings.push(newMountain);
  drawMtPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}
//---1.function to draw mountains---end//


//---2.function to draw stamps--//
function drawStamp() {
  // if (mouseY < 500 && mouseY > 50)
  image(stampsImages[imgIdx], mouseX, mouseY, range, range);
  //try to use scale instead of size 
  // scale(range, range);
  // image(mountsImages[imgIdx], mouseX, mouseY);
}

function drawStampFixed() {
  let newStamp = {
    img: stampsImages[imgIdx],
    x: stPosX,
    y: stPosY,
    size: range
  };
  currentDisplayings.push(newStamp);
  drawStPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}
//---2.function to draw stamps---end//

//---3.function to draw calligraphy--//
function drawCalli() {
  // if (mouseY < 500 && mouseY > 50)
  image(calImages[imgIdx], mouseX, mouseY, range, range);
  //try to use scale instead of size 
  // scale(range, range);
  // image(mountsImages[imgIdx], mouseX, mouseY);
}

function drawCalliFixed() {
  let newCalli = {
    img: calImages[imgIdx],
    x: caPosX,
    y: caPosY,
    size: range
  };
  currentDisplayings.push(newCalli);
  drawCaPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}
//---3.function to draw calligraphy---end//


let currentButtonIndex = null;

function mouseClicked() {
  // let imgIdx, range;
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].state == 1) {
      buttons[i].state = 2;
    }
  }
  for (let i = 0; i < buttons.length; i++) {

    // ---i=0; Mountain--- //
    if (buttons[i].isTouch() && i == 0) {
      buttons[i].state = 1;
      // mtIdx = round(random(0, 8));
      // stIdx = round(random(0, 8)); 
      imgIdx = round(random(0, 7));
      range = round(random(75, 300));
      // range = round(random(0.1, 0.8));
      // range = round(random(75, 300));
      // rangeSt = round(random(75, 300));
      currentButtonIndex = buttons[i].getIndex();
    }
    // ---Index =0; Mountain---end //

    // ---i=1; Stamp--- //  
    else if (buttons[i].isTouch() && i == 1) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 5));
      range = round(random(20, 40));
      currentButtonIndex = buttons[i].getIndex();
    }
    // ---Index =1; Stamp---end //  

    // ---i=2; Calligraphy--- //  
    else if (buttons[i].isTouch() && i == 2) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 3));
      range = round(random(75, 150));
      currentButtonIndex = buttons[i].getIndex();
    }
    // ---Index =2; Calligraphy---end // 
    
    else if (buttons[i].isTouch() && i == 3) {
      currentDisplayings = [];
    }
  }

  //-------CHECK BUTTON STATUS------//
  // Index =0; Mountain //
  if (currentButtonIndex == 0) {
    print("clicking mountain");
    if (buttons[0].state == 1) {
      print("mountain is moving");
      drawMt = true;
    }
    if (buttons[0].state == 2) {
      // dropping,fixing
      print("Mountain Fixed");
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
      // imgIdx = round(random(0, 8));

      //range = round(random(75, 300));

      buttons[0].state = 0;
    }
  }
  // end --- Index =0; Mountain // 

  // Index =1; Stamp //
  if (currentButtonIndex == 1) {
    print("clicking stamp");
    if (buttons[1].state == 1) {
      print("stamp is moving");
      drawSt = true;
    }
    if (buttons[1].state == 2) {
      // dropping,fixing
      print("Stamp Fixed");
      drawSt = false;
      drawStPerm = true;
      stPosX = mouseX;
      stPosY = mouseY;
      //range = round(random(10, 30));
      buttons[1].state = 0;
    }
  }
  // end --- Index =1; Stamp // 

  // Index =2; Calligraphy //
  if (currentButtonIndex == 2) {
    print("clicking calligraphy");
    if (buttons[2].state == 1) {
      print("calligraphy is moving");
      drawCa = true;
    }
    if (buttons[2].state == 2) {
      // dropping,fixing
      print("calligraphy Fixed");
      drawCa = false;
      drawCaPerm = true;
      caPosX = mouseX;
      caPosY = mouseY;
      //range = round(random(10, 30));
      buttons[2].state = 0;
    }
  }
  // end --- Index =2; Calligraphy // 
  
  // Index=3; Clear//

}



function sendCanvas(data){
  var url = 'http://localhost:3000/';
  
  httpPost(url, 'json',
           {"content": data},
     function (result) {
       print("sent!");
     });
}

function keyPressed() {
  print("send");
  
  //create a new canvas 
  var canvastosend = createCanvas(900, 450);
    canvastosend.id("canvastosend");

  //PROBLEM!!!!!crop the canvas to the proper size
  //
  canvastosend.image(canvas);

  
  //var theCanvas = document.getElementById('canvastosend');
  var theCanvas = document.getElementById('canvastosend');
	let dataurl = theCanvas.toDataURL();
  console.log(dataurl);
	sendCanvas(dataurl);
  
  // collectng the image data from the local server
  httpGet('http://localhost:3000/imagetest', function(data) {
  print(data);})
  
  
  //open a new window with the path of the route of the images
  //window.open("http://www.google.com");
 
}

//}
let canvas;

function setup() {
  canvas = createCanvas(500, 500);
  canvas.id("canvas");
  
  
}

function draw(){
  background(255);
  fill(map(mouseX, 0, width, 0, 255), 0, 0);
	ellipse(mouseX, mouseY, 50, 50);
}

function sendCanvas(data){
  var url = 'http://localhost:3000/';
  
  httpPost(url, 'json',
           {"content": data},
     function (result) {
       print("sent!");
     });
}

function mousePressed() {
  var theCanvas = document.getElementById('canvas');
	let dataurl = theCanvas.toDataURL();
  console.log(dataurl);
	sendCanvas(dataurl)
 
}

// arrays for mounts
let mounts = [];
let mountsImages = [];

// arrays for buttons 
let buttons = [];
let buttonImages = [];

//array for display
let currentDisplayings = [];

// arrays for stamps 
let stamps = [];
let stampsImages = [];

//arrays for calligraphy
let calligraphy = [];
let calImages = [];


//let birds = [];

//boolean for mountain
let drawMt = false;
let drawMtPerm = false;

//boolean for stamp
let drawSt = false;
let drawStPerm = false;

//boolean for calligraphy
let drawCa = false;
let drawCaPerm = false;

let imgIdx, range;
let i;

//load mountain image
//error:loading forever
// function preload() {
//     for (var i = 0; i< 3; i++){
//         mount[i] = loadImage("images/mount" + i + ".png"); 
//     }
// }
let imgtest;

function preload() {
  //button images loading
  buttonimg1 = loadImage('buttons/button1.png');
  buttonimg2 = loadImage('buttons/button2.png');
  buttonimg3 = loadImage('buttons/button3.png');
  buttonimg4 = loadImage('buttons/button4.png');


  //button image pushing
  buttonImages.push(buttonimg1);
  buttonImages.push(buttonimg2);
  buttonImages.push(buttonimg3);
  buttonImages.push(buttonimg4);



  //mountain images loading
  mountimg1 = loadImage('images/mount1.png');
  mountimg2 = loadImage('images/mount2.png');
  mountimg3 = loadImage('images/mount3.png');
  mountimg4 = loadImage('images/mount4.png');
  mountimg5 = loadImage('images/mount5.png');
  mountimg6 = loadImage('images/mount6.png');
  mountimg7 = loadImage('images/mount7.png');
  mountimg8 = loadImage('images/mount8.png');


  //stamps images loading
  stampimg1 = loadImage('stamps/stamp1.png');
  stampimg2 = loadImage('stamps/stamp2.png');
  stampimg3 = loadImage('stamps/stamp3.png');
  stampimg4 = loadImage('stamps/stamp4.png');
  stampimg5 = loadImage('stamps/stamp5.png');
  stampimg6 = loadImage('stamps/stamp6.png', loaded2);


  //calligraphy images loading
  calimg1 = loadImage('calligraphy/calligraphy1.png');
  calimg2 = loadImage('calligraphy/calligraphy2.png', loaded);
  calimg3 = loadImage('calligraphy/calligraphy3.png');
  calimg4 = loadImage('calligraphy/calligraphy4.png');



  //mountain image pushing
  mountsImages.push(mountimg1);
  mountsImages.push(mountimg2);
  mountsImages.push(mountimg3);
  mountsImages.push(mountimg4);
  mountsImages.push(mountimg5);
  mountsImages.push(mountimg6);
  mountsImages.push(mountimg7);
  mountsImages.push(mountimg8);

  //stamps images pushing
  stampsImages.push(stampimg1);
  stampsImages.push(stampimg2);
  stampsImages.push(stampimg3);
  stampsImages.push(stampimg4);
  stampsImages.push(stampimg5);
  stampsImages.push(stampimg6);


  //calligraphy images pushing
  calImages.push(calimg1);
  calImages.push(calimg2);
  calImages.push(calimg3);
  calImages.push(calimg4);



}

function loaded() {
  console.log("loaded");
}

function loaded2() {
  console.log("loaded2");
}
let canvas;
function setup() {
  canvas = createCanvas(900, 450);
  canvas.id("canvas");
  imageMode(CENTER);

  //load button image

  //load mountain image
  // mount.push(loadImage('images/mount1.png'));
  // mount.push(loadImage('images/mount2.png'));
  // mount.push(loadImage('images/mount3.png'));
  // mount.push(loadImage('images/mount4.png'));
  // mount.push(loadImage('images/mount5.png'));
  // mount.push(loadImage('images/mount6.png'));
  // mount.push(loadImage('images/mount7.png'));
  // mount.push(loadImage('images/mount8.png'));


  //put button
  for (let i = 0; i < buttonImages.length; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }

}

function draw() {

  // let index=0;
  //background
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);

  //display buttons
  buttons[0].display();
  buttons[1].display();
  buttons[2].display();
  buttons[3].display();
  

  //for (let index = 0; index < mountsImages.length; index++) {
  for (let i = 0; i < currentDisplayings.length; i++) {
    image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y, currentDisplayings[i].size, currentDisplayings[i].size);
    //try to use scale instead of size
    //     scale(range, range);

    //     image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y);

  }

  //draw mountains
  if (drawMt) drawMount();
  if (drawMtPerm) {
    drawMountFixed();
  }
  //draw stamps
  if (drawSt) drawStamp();
  if (drawStPerm) {
    drawStampFixed();
  }
  //draw calligraphy
  if (drawCa) drawCalli();
  if (drawCaPerm) {
    drawCalliFixed();
  }
  //}
}

//---1.function to draw mountains---//
function drawMount() {
  // if (mouseY < 500 && mouseY > 50)
  image(mountsImages[imgIdx], mouseX, mouseY, range, range);
  //try to use scale instead of size 
  // scale(range, range);
  // image(mountsImages[imgIdx], mouseX, mouseY);
}

function drawMountFixed() {
  let newMountain = {
    img: mountsImages[imgIdx],
    x: mtPosX,
    y: mtPosY,
    size: range
  };
  currentDisplayings.push(newMountain);
  drawMtPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}
//---1.function to draw mountains---end//


//---2.function to draw stamps--//
function drawStamp() {
  // if (mouseY < 500 && mouseY > 50)
  image(stampsImages[imgIdx], mouseX, mouseY, range, range);
  //try to use scale instead of size 
  // scale(range, range);
  // image(mountsImages[imgIdx], mouseX, mouseY);
}

function drawStampFixed() {
  let newStamp = {
    img: stampsImages[imgIdx],
    x: stPosX,
    y: stPosY,
    size: range
  };
  currentDisplayings.push(newStamp);
  drawStPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}
//---2.function to draw stamps---end//

//---3.function to draw calligraphy--//
function drawCalli() {
  // if (mouseY < 500 && mouseY > 50)
  image(calImages[imgIdx], mouseX, mouseY, range, range);
  //try to use scale instead of size 
  // scale(range, range);
  // image(mountsImages[imgIdx], mouseX, mouseY);
}

function drawCalliFixed() {
  let newCalli = {
    img: calImages[imgIdx],
    x: caPosX,
    y: caPosY,
    size: range
  };
  currentDisplayings.push(newCalli);
  drawCaPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}
//---3.function to draw calligraphy---end//


let currentButtonIndex = null;

function mouseClicked() {
  // let imgIdx, range;
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].state == 1) {
      buttons[i].state = 2;
    }
  }
  for (let i = 0; i < buttons.length; i++) {

    // ---i=0; Mountain--- //
    if (buttons[i].isTouch() && i == 0) {
      buttons[i].state = 1;
      // mtIdx = round(random(0, 8));
      // stIdx = round(random(0, 8)); 
      imgIdx = round(random(0, 7));
      range = round(random(75, 300));
      // range = round(random(0.1, 0.8));
      // range = round(random(75, 300));
      // rangeSt = round(random(75, 300));
      currentButtonIndex = buttons[i].getIndex();
    }
    // ---Index =0; Mountain---end //

    // ---i=1; Stamp--- //  
    else if (buttons[i].isTouch() && i == 1) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 5));
      range = round(random(20, 40));
      currentButtonIndex = buttons[i].getIndex();
    }
    // ---Index =1; Stamp---end //  

    // ---i=2; Calligraphy--- //  
    else if (buttons[i].isTouch() && i == 2) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 3));
      range = round(random(75, 150));
      currentButtonIndex = buttons[i].getIndex();
    }
    // ---Index =2; Calligraphy---end // 
    
    else if (buttons[i].isTouch() && i == 3) {
      currentDisplayings = [];
    }
  }

  //-------CHECK BUTTON STATUS------//
  // Index =0; Mountain //
  if (currentButtonIndex == 0) {
    print("clicking mountain");
    if (buttons[0].state == 1) {
      print("mountain is moving");
      drawMt = true;
    }
    if (buttons[0].state == 2) {
      // dropping,fixing
      print("Mountain Fixed");
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
      // imgIdx = round(random(0, 8));

      //range = round(random(75, 300));

      buttons[0].state = 0;
    }
  }
  // end --- Index =0; Mountain // 

  // Index =1; Stamp //
  if (currentButtonIndex == 1) {
    print("clicking stamp");
    if (buttons[1].state == 1) {
      print("stamp is moving");
      drawSt = true;
    }
    if (buttons[1].state == 2) {
      // dropping,fixing
      print("Stamp Fixed");
      drawSt = false;
      drawStPerm = true;
      stPosX = mouseX;
      stPosY = mouseY;
      //range = round(random(10, 30));
      buttons[1].state = 0;
    }
  }
  // end --- Index =1; Stamp // 

  // Index =2; Calligraphy //
  if (currentButtonIndex == 2) {
    print("clicking calligraphy");
    if (buttons[2].state == 1) {
      print("calligraphy is moving");
      drawCa = true;
    }
    if (buttons[2].state == 2) {
      // dropping,fixing
      print("calligraphy Fixed");
      drawCa = false;
      drawCaPerm = true;
      caPosX = mouseX;
      caPosY = mouseY;
      //range = round(random(10, 30));
      buttons[2].state = 0;
    }
  }
  // end --- Index =2; Calligraphy // 
  
  // Index=3; Clear//

}



function sendCanvas(data){
  var url = 'http://localhost:3000/';
  
  httpPost(url, 'json',
           {"content": data},
     function (result) {
       print("sent!");
     });
}

function keyPressed() {
  print("send");
  var theCanvas = document.getElementById('canvas');
	let dataurl = theCanvas.toDataURL();
  console.log(dataurl);
	sendCanvas(dataurl)
 
}

//}// arrays for mounts
let mounts = [];
let mountsImages = [];

// arrays for buttons 
let buttons = [];
let buttonImages = [];
let currentDisplayings = [];

let stamps = [];
let birds = [];

let drawMt = false;
let drawMtPerm = false;

let imgIdx, range;
let i;

//load mountain image
//error:loading forever
// function preload() {
//     for (var i = 0; i< 3; i++){
//         mount[i] = loadImage("images/mount" + i + ".png"); 
//     }
// }
let imgtest;

function preload() {
  //button images loading
  buttonimg1 = loadImage('buttons/button1.png');
  buttonimg2 = loadImage('buttons/button2.png');
  buttonimg3 = loadImage('buttons/button3.png');


  //button image pushing
  buttonImages.push(buttonimg1);
  buttonImages.push(buttonimg2);
  buttonImages.push(buttonimg3);



  //mountain images loading
  mountimg1 = loadImage('images/mount1.png', loaded);
  mountimg2 = loadImage('images/mount2.png', loaded2);
  mountimg3 = loadImage('images/mount3.png');
  mountimg4 = loadImage('images/mount4.png');
  mountimg5 = loadImage('images/mount5.png');
  mountimg6 = loadImage('images/mount6.png');
  mountimg7 = loadImage('images/mount7.png');
  mountimg8 = loadImage('images/mount8.png');


  // img3 = loadImage('images/mount2.png');


  //mountain image pushing
  mountsImages.push(mountimg1);
  mountsImages.push(mountimg2);
  mountsImages.push(mountimg3);
  mountsImages.push(mountimg4);
  mountsImages.push(mountimg5);
  mountsImages.push(mountimg6);
  mountsImages.push(mountimg7);
  mountsImages.push(mountimg8);

  //buttonImages.push(img3);



}

function loaded() {
  console.log("loaded");
}

function loaded2() {
  console.log("loaded2");
}

function setup() {
  createCanvas(900, 450);
  imageMode(CENTER);

  //load button image

  //load mountain image
  // mount.push(loadImage('images/mount1.png'));
  // mount.push(loadImage('images/mount2.png'));
  // mount.push(loadImage('images/mount3.png'));
  // mount.push(loadImage('images/mount4.png'));
  // mount.push(loadImage('images/mount5.png'));
  // mount.push(loadImage('images/mount6.png'));
  // mount.push(loadImage('images/mount7.png'));
  // mount.push(loadImage('images/mount8.png'));


  //put button
  for (let i = 0; i < buttonImages.length; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }

}

function draw() {

  // let index=0;
  //background
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);

  //display buttons
  buttons[0].display();
  buttons[1].display();
  buttons[2].display();

  //for (let index = 0; index < mountsImages.length; index++) {
    for (let i = 0; i < currentDisplayings.length; i++) {
      image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y, currentDisplayings[i].size, currentDisplayings[i].size);
    }
    if (drawMt) drawMount();
    if (drawMtPerm) {
      drawMountFixed();
    }
  //}
}

function drawMount() {
  if (mouseY < 500 && mouseY > 50)
    image(mountsImages[0], mouseX, mouseY, range, range);
}


function drawMountFixed() {
  let newMountain = {
    img: mountsImages[0],
    x: mtPosX,
    y: mtPosY,
    size: range
  };
  currentDisplayings.push(newMountain);
  drawMtPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}

let currentButtonIndex = null;

function mouseClicked() {
  // let imgIdx, range;
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].state == 1) {
      buttons[i].state = 2;
    }
  }
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].isTouch()) {
      buttons[i].state = 1;
      range = round(random(75, 300));
      currentButtonIndex = buttons[i].getIndex();
    }
  }

  // Index =0; Mountain //
  if (currentButtonIndex == 0) {
    print("clicking mountain");
    if (buttons[0].state == 1) {
      print("mountain is moving");
      drawMt = true;
    }
    if (buttons[0].state == 2) {
      // dropping,fixing
      print("Mountain Fixed");
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
      buttons[0].state = 0;
    }
  }
  // end --- Index =0; Mountain // 


}
//}// arrays for mounts
let mounts = [];
let mountsImages = [];

// arrays for buttons 
let buttons = [];
let buttonImages = [];
let currentDisplayings = [];

let stamps = [];
let birds = [];

let drawMt = false;
let drawMtPerm = false;

let imgIdx, range;
let i;

//load mountain image
//error:loading forever
// function preload() {
//     for (var i = 0; i< 3; i++){
//         mount[i] = loadImage("images/mount" + i + ".png"); 
//     }
// }
let imgtest;

function preload() {
  //button images loading
  buttonimg1 = loadImage('buttons/button1.png');
  buttonimg2 = loadImage('buttons/button2.png');
  buttonimg3 = loadImage('buttons/button3.png');
  

  //button image pushing
  buttonImages.push(buttonimg1);
  buttonImages.push(buttonimg2);
  buttonImages.push(buttonimg3);
  


  //mountain images loading
  mountimg1 = loadImage('images/mount1.png', loaded);
 mountimg2 = loadImage('images/mount2.png', loaded2);
  mountimg3 = loadImage('images/mount3.png');
  mountimg4 = loadImage('images/mount4.png');
  mountimg5 = loadImage('images/mount5.png');
  mountimg6 = loadImage('images/mount6.png');
  mountimg7 = loadImage('images/mount7.png');
  mountimg8 = loadImage('images/mount8.png');
  
  
  // img3 = loadImage('images/mount2.png');


  //mountain image pushing
  mountsImages.push(mountimg1);
  mountsImages.push(mountimg2);
  mountsImages.push(mountimg3);
  mountsImages.push(mountimg4);
  mountsImages.push(mountimg5);
  mountsImages.push(mountimg6);
  mountsImages.push(mountimg7);
  mountsImages.push(mountimg8);
  
  //buttonImages.push(img3);



}

function loaded() {
  console.log("loaded");
}

function loaded2() {
  console.log("loaded2");
}

function setup() {
  createCanvas(900, 450);
  imageMode(CENTER);

  //load button image

  //load mountain image
  // mount.push(loadImage('images/mount1.png'));
  // mount.push(loadImage('images/mount2.png'));
  // mount.push(loadImage('images/mount3.png'));
  // mount.push(loadImage('images/mount4.png'));
  // mount.push(loadImage('images/mount5.png'));
  // mount.push(loadImage('images/mount6.png'));
  // mount.push(loadImage('images/mount7.png'));
  // mount.push(loadImage('images/mount8.png'));


  //put button
  for (let i = 0; i < buttonImages.length; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }

}

function draw() {

  //background
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);

  //display buttons
  buttons[0].display();
  buttons[1].display();
  buttons[2].display();
  

  for (let i = 0; i < currentDisplayings.length; i++) {
    image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y, currentDisplayings[i].size, currentDisplayings[i].size);
  }
  if (drawMt) drawMount(index);
  if (drawMtPerm) {
    drawMountFixed(0);
  }
}

function drawMount(index) {
  if (mouseY < 500 && mouseY > 50)
    image(mountsImages[index], mouseX, mouseY, range, range);
}


function drawMountFixed(index) {
  let newMountain = {
    img: mountsImages[index],
    x: mtPosX,
    y: mtPosY,
    size: range
  };
  currentDisplayings.push(newMountain);
  drawMtPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}

let currentButtonIndex = null;

function mouseClicked() {
  // let imgIdx, range;
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].state == 1) {
      buttons[i].state = 2;
    }
  }
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].isTouch()) {
      buttons[i].state = 1;
      range = round(random(75, 300));
      currentButtonIndex = buttons[i].getIndex();
    }
  }

  // Index =0; Mountain //
  if (currentButtonIndex == 0) {
    print("clicking mountain");
    if (buttons[0].state == 1) {
      print("mountain is moving");
      drawMt = true;
    }
    if (buttons[0].state == 2) {
      // dropping,fixing
      print("Mountain Fixed");
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
      buttons[0].state = 0;
    }
  }
  // end --- Index =0; Mountain // 


}
//}// arrays for mounts
let mounts = [];
let mountsImages = [];

// arrays for buttons 
let buttons = [];
let buttonImages = [];
let currentDisplayings = [];

let stamps = [];
let birds = [];

let drawMt = false;
let drawMtPerm = false;

let imgIdx, range;
let i;

//load mountain image
//error:loading forever
// function preload() {
//     for (var i = 0; i< 3; i++){
//         mount[i] = loadImage("images/mount" + i + ".png"); 
//     }
// }
let imgtest;

function preload() {
  //button images loading
  buttonimg1 = loadImage('buttons/button1.png');
  buttonimg2 = loadImage('buttons/button2.png');
  buttonimg3 = loadImage('buttons/button3.png');


  //button image pushing
  buttonImages.push(buttonimg1);
  buttonImages.push(buttonimg2);
  buttonImages.push(buttonimg3);



  //mountain images loading
  mountimg1 = loadImage('images/mount1.png', loaded);
  mountimg2 = loadImage('images/mount2.png', loaded2);
  mountimg3 = loadImage('images/mount3.png');
  mountimg4 = loadImage('images/mount4.png');
  mountimg5 = loadImage('images/mount5.png');
  mountimg6 = loadImage('images/mount6.png');
  mountimg7 = loadImage('images/mount7.png');
  mountimg8 = loadImage('images/mount8.png');


  // img3 = loadImage('images/mount2.png');


  //mountain image pushing
  mountsImages.push(mountimg1);
  mountsImages.push(mountimg2);
  mountsImages.push(mountimg3);
  mountsImages.push(mountimg4);
  mountsImages.push(mountimg5);
  mountsImages.push(mountimg6);
  mountsImages.push(mountimg7);
  mountsImages.push(mountimg8);

  //buttonImages.push(img3);



}

function loaded() {
  console.log("loaded");
}

function loaded2() {
  console.log("loaded2");
}

function setup() {
  createCanvas(900, 450);
  imageMode(CENTER);

  //load button image

  //load mountain image
  // mount.push(loadImage('images/mount1.png'));
  // mount.push(loadImage('images/mount2.png'));
  // mount.push(loadImage('images/mount3.png'));
  // mount.push(loadImage('images/mount4.png'));
  // mount.push(loadImage('images/mount5.png'));
  // mount.push(loadImage('images/mount6.png'));
  // mount.push(loadImage('images/mount7.png'));
  // mount.push(loadImage('images/mount8.png'));


  //put button
  for (let i = 0; i < buttonImages.length; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }

}

function draw() {

  // let index=0;
  //background
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);

  //display buttons
  buttons[0].display();
  buttons[1].display();
  buttons[2].display();

  //for (let index = 0; index < mountsImages.length; index++) {
    for (let i = 0; i < currentDisplayings.length; i++) {
      image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y, currentDisplayings[i].size, currentDisplayings[i].size);
    }
    if (drawMt) drawMount();
    if (drawMtPerm) {
      drawMountFixed(index);
    }
  //}
}

function drawMount(index) {
  if (mouseY < 500 && mouseY > 50)
    image(mountsImages[index], mouseX, mouseY, range, range);
}


function drawMountFixed(index) {
  let newMountain = {
    img: mountsImages[index],
    x: mtPosX,
    y: mtPosY,
    size: range
  };
  currentDisplayings.push(newMountain);
  drawMtPerm = false;
  // image(mountsImages[index], mtPosX, mtPosY, 80, 80);
  // fill(255);
  // rect(0, 300, width, height);
}

let currentButtonIndex = null;

function mouseClicked() {
  // let imgIdx, range;
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].state == 1) {
      buttons[i].state = 2;
    }
  }
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].isTouch()) {
      buttons[i].state = 1;
      range = round(random(75, 300));
      currentButtonIndex = buttons[i].getIndex();
    }
  }

  // Index =0; Mountain //
  if (currentButtonIndex == 0) {
    print("clicking mountain");
    if (buttons[0].state == 1) {
      print("mountain is moving");
      drawMt = true;
    }
    if (buttons[0].state == 2) {
      // dropping,fixing
      print("Mountain Fixed");
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
      buttons[0].state = 0;
    }
  }
  // end --- Index =0; Mountain // 


}
//}let img_tree = [];
let img_leaf = [];
let trees = [];
let leaves = [];

function setup() { 
  createCanvas(600, 600);
  
  // I tried to load the image files using for loops like below but failed. I don't know why.
//   for(let i=0; i<9; i++) {
//     img_leaf.push(loadImage('images/autumn_leaf0' + i+1 + '.png'));
//   }
  
//   for(let i=0; i<2; i++) {
//     img_leaf.push(loadImage('images/autumn_leaf1' + i + '.png'));
//     img_tree.push(loadImage('images/autumn_tree0' + i+1 + '.png'));
//   }
  
  // so I manually load and put them into arrays
  
  // load tree and leaf images
  img_tree.push(loadImage('images/autumn_tree01.png'));
  img_tree.push(loadImage('images/autumn_tree02.png'));
  img_leaf.push(loadImage('images/autumn_leaf01.png'));
  img_leaf.push(loadImage('images/autumn_leaf02.png'));
  img_leaf.push(loadImage('images/autumn_leaf03.png'));
  img_leaf.push(loadImage('images/autumn_leaf04.png'));
  img_leaf.push(loadImage('images/autumn_leaf05.png'));
  img_leaf.push(loadImage('images/autumn_leaf06.png'));
  img_leaf.push(loadImage('images/autumn_leaf07.png'));
  img_leaf.push(loadImage('images/autumn_leaf08.png'));
  img_leaf.push(loadImage('images/autumn_leaf09.png'));
  img_leaf.push(loadImage('images/autumn_leaf10.png'));
  img_leaf.push(loadImage('images/autumn_leaf11.png'));
  
  // put two tree images into the img_tree array
  trees.push(new Tree(img_tree[0], 0, 0, 400, 166));
  trees.push(new Tree(img_tree[1], 210, 50, 400, 179));
//  leaves.push(new Leaf(img_leaf[0], width/2, height/2, 40));
  background(255);
  
} 

function draw() { 

	setSky();	// set the background colour 
  
  // show the tree images 
  trees[0].display();
  trees[1].display();
//  leaves[0].display();
//  leaves[0].fall();
  
  // if(trees[0].isTouch() || trees[1].isTouch()) {
  //   console.log("touch");
  //   leaves.push(new Leaf(img_leaf[round(random(0, 6))], mouseX, mouseY, round(random(30, 70))));
  // }
//  console.log(leaves.length);
  
  // show or remove the leaves in the leaves array
  if(leaves.length > 0) {
  	for(let i=0; i<leaves.length; i++) {
    	leaves[i].fall();		// animate the leaves 
      
      if(leaves[i].isGone()) leaves.splice(i,1);	// if a leaf has totally disappeared, remove it from the leaves array
  	}
  }
  
  for(let i=0; i<leaves.length; i++) {
    for(let j=i+1; j<leaves.length; j++) {
      if(leaves[i].isStacked(leaves[j])) leaves[i].disappear();	// if a leaf is blocked by other leaf, make it gradually disappear 
    }
  }
  
  console.log(leaves.length);
}



function mousePressed() {
  
  let imgIdx, range;
  
  // if the mouse is pressed on either tree, create a leaf randomly
  if(trees[0].isTouch() || trees[1].isTouch()) {		
    imgIdx = round(random(0, 10));
    range = round(random(30, 70));
//    console.log(imgIdx, " ", range);
    leaves.push(new Leaf(img_leaf[imgIdx], mouseX, mouseY, range));
  }
}
  
function setSky() {
  
  let h, s;
  
  noStroke();
  push();
  colorMode(HSB);
  
  // gradation
  for(let i=0; i<height; i++) {
    h = map(i, 0, height-1, 50, 10);
    s = map(i, 0, height-1, 20, 80);
    fill(h,s,100);
    rect(0, i, width, 1);
  }
  pop();
}
  // arrays for mounts
let mounts = [];
let mountsImages = [];

// arrays for buttons 
let buttons = [];
let buttonImages = [];

let stamps = [];
let birds = [];

let drawMt = false;
let drawMtPerm = false;

let imgIdx, range;
let i;

//load mountain image
//error:loading forever
// function preload() {
//     for (var i = 0; i< 3; i++){
//         mount[i] = loadImage("images/mount" + i + ".png"); 
//     }
// }
let imgtest;

function preload() {
  img1 = loadImage('buttons/button1.png');

  img2 = loadImage('images/mount1.png');
  // img3 = loadImage('images/mount2.png');

  buttonImages.push(img1);


  mountsImages.push(img2);
  //buttonImages.push(img3);



}

function setup() {
  createCanvas(900, 450);
  imageMode(CENTER);

  //load button image

  //load mountain image
  // mount.push(loadImage('images/mount1.png'));
  // mount.push(loadImage('images/mount2.png'));
  // mount.push(loadImage('images/mount3.png'));
  // mount.push(loadImage('images/mount4.png'));
  // mount.push(loadImage('images/mount5.png'));
  // mount.push(loadImage('images/mount6.png'));
  // mount.push(loadImage('images/mount7.png'));
  // mount.push(loadImage('images/mount8.png'));


  //put button
  for (let i = 0; i < 1; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }




}

function draw() {

  //background
  background(220);


  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);

  buttons[0].display();
  // buttons[1].display();

  if (drawMt) drawMount();
  if (drawMtPerm) drawMountFixed();
}

function drawMount() {

  if (mouseY < 500 && mouseY > 50)
    image(mountsImages[0], mouseX, mouseY, range, range);
}

function drawMountFixed(index) {

  image(mountsImages[index], mtPosX, mtPosY, range, range);
  fill(255);
  rect(0, 300, width, height);
}

function mouseClicked() {
  let mountainPicked = false;
  // let imgIdx, range;
  let currentButtonIndex = null;
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].isTouch()) {
      currentButtonIndex = buttons[i].getIndex();
    }
  }

  if (currentButtonIndex == 0) {
    range = round(random(75, 300));
    if (drawMt && mountainPicked==false) {
      print("picking");
      // picking
      mountainPicked = true;
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
    }
    if (!drawMt && mountainPicked) {
      drawMt = true;
    }
    // if the mouse is pressed on buttons, a picture randomly appear
    // button mountain
    // if (buttons[0].isTouch()) {
    //   imgIdx = round(random(0, 10));
    //   range = round(random(75, 300));
    //   if (!drawMt) {
    //     drawMt = true;
    //   }
    //   //mounts.push(new Item(mounts[imgIdx], mouseX, mouseY, range,range));
    // }
  }


  // button stamp
  // if(buttons[1].isTouch()) {		
  //   imgIdx = round(random(0, 10));
  //   range = round(random(50, 200));
  //   stamps.push(new Item(stamps[imgIdx], mouseX, mouseY, range,range));
  // }


}
//}let video;
let vScale=16;
let button1;
let button2;
var snapshots = [];

function setup() {
  createCanvas(400, 400);

  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  button1 = createButton('Scale');
  button2 = createButton('Reset');
  button1.mousePressed(sc);
  button2.mousePressed(redo);
  video.hide();
}

function sc() {
  //background(random(255),0,0);
  vScale ++;
}

function redo(){
  vScale=16;
}

function draw() {
  let bg= map(mouseX, 0, width,0,255);
  background(bg,random(1,100));

  video.loadPixels();
  loadPixels();
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      
      let bright = (r+g+b)/2;
      
      let w = map(bright,0,255,0,vScale);
      
      noStroke();
       let fil= map (mouseX, 0,width,255,0);
      fill(fil);
      
      ellipse(x*vScale, y*vScale, w, w);
      }
  }
}let video;
let vScale=16;
let button1;
let button2;
let snapshots = [];
//let slider;

function setup() {
  createCanvas(400, 400);

  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);

  button1 = createButton('Scale');
  button2 = createButton('Reset');
  button1.mousePressed(sc);
  button2.mousePressed(redo);
  //slider=createSlider(
  video.hide();
}

function sc() {
  background(0,0,0);
  vScale ++;
}

function redo(){
  vScale=16;
}


function draw() {
  let bg= map(mouseX, 0, width,0,255);
  background(bg,random(1,100));

  video.loadPixels();
  loadPixels();
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      
      let bright = (r+g+b)/2;
      
      let w = map(bright,0,255,0,vScale);
      
      noStroke();
      let fil= map (mouseX, 0,width,255,0);
      fill(fil);
      
      ellipse(x*vScale, y*vScale, w, w);
      }
  }
}let video;
let vScale=16;
var button;
var snapshots = [];

function setup() {
  createCanvas(400, 400);

  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);

  button = createButton('Scale');
  
  button.mousePressed(takesnap);
  video.hide();
}

function takesnap() {

  let bg= map(mouseX, 0, width,0,255);
  background(bg);
  vScale ++;
}


function draw() {
  background(random(255), random(255), random(255),random(1,100));

  video.loadPixels();
  loadPixels();
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      
      let bright = (r+g+b)/2;
      
      let w = map(bright,0,255,0,vScale);
      
      noStroke();
      fill(255);
      rectMode(CENTER);
      rect(x*vScale, y*vScale, w, w);
      }
  }
}let video;
let vScale=16;

function setup() {
  createCanvas(640, 480);

  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
}

function draw() {
  background(220);

  video.loadPixels();
  loadPixels();
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      
      let bright = (r+g+b)/3;
      
      let w = map(bright,0,255,0,vScale);
      
      fill(bright);
      rect(x*vScale,y*vScale,vScale,vScale);
      
      // pixels[index + 0] = bright;
      // pixels[index + 1] = bright;
      // pixels[index + 2] = bright;
      // pixels[index + 3] = 255;
    }
  }
  //updatePixels();

}// Declare a "SerialPort" object
let serial;
//let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
var Humi;
var Pulse;

//data name from sensor
let pulse1;
let humi1;
let pulse2;
let humi2;

//beat1=(pulse1+humi1)*sth
let beat1;
let beat2;

let pic1, pic2;

//heartrain
let rain = [];

//font
let myFont;

function preload() {
  heart = loadImage('heart.png');
  myFont = loadFont('Barkentina 1.otf');
}

function setup() {
  createCanvas(1000, 600);
  
  //font
  
  textFont(myFont);
  textSize(36);

  //heart rain
  for (let i = 0; i < 150; i++) {
    rain.push(new Rain(heart));
  }

    // Instantiate our SerialPort object
    serial = new p5.SerialPort();
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing

    serial.list(); // list the serial ports

    serial.open("/dev/cu.usbmodem1441");

    // let col= map(humi1, 0,width, 0,255);
  }

  function draw() {
    background(255);
    imageMode(CENTER);

    //bar();


    //let col= map(humi1,0,width, 0,255);
    //tint(col,50);
    //println(humi1);
    
  	//falling heart
    //if (humi1 > width / 3 && humi2 > width / 3)

    if (humi1 > width / 3 && humi2 > width / 3 ) {
      for (let i = 0; i < rain.length; i++) {
        rain[i].fall();
        rain[i].display();
      }
      fill(250,0,0);
      text('You are in Love!', width / 3, height *6/ 7);
      
    }
  	scale(random(0.99, 1));

    pic1 = image(heart, width / 4, height / 2, humi1, humi1);
  	//scale(random(0.95, 1));

    pic2 = image(heart, width * 3 / 4, height / 2, humi2, humi2);
  	//scale(random(0.95, 1));

  }




  // get the list of ports:
  function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
      // Display the list the console:
      println(i + " " + portList[i]);
    }
  }

  function serverConnected() {
    println('connected to server.');
  }

  function portOpen() {
    println('the serial port opened.')
  }

  function serialError(err) {
    println('Something went wrong with the serial port. ' + err);
  }

  function portClose() {
    println('The serial port closed.');
  }

  function serialEvent() {
    // read a string from the serial port
    // until you get carriage return and newline:
    var inString = serial.readStringUntil('\r\n');
 //print(inString);
    //check to see that there's actually a string there:
    if (inString.length > 0) {
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length >1) { // if there are three elements
        humi1 = map(sensors[0], 40, 100, 0, width / 2);
        humi2 = map(sensors[1], 10, 50, 0, width / 2);
        print(humi1);
        print(humi2);
       
        // element 0 is the boardx
        //wh = map(sensors[1], 0, 1023, 0, height/2); // element 1 is the wall's height
        //circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
      }
    }


  }

  function bar() {
    noFill();
    stroke(255);
    strokeWeight(1);

    fill(255, 233, 138);
    Humi = rect(100, 600, 50, -frameCount / 2);
    Pulse = rect(200, 600, 50, -frameCount / 2);
  }// Declare a "SerialPort" object
let serial;
//let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
var Humi;
var Pulse;

//data name from sensor
let pulse1;
let humi1;
let pulse2;
let humi2;

//beat1=(pulse1+humi1)*sth
let beat1;
let beat2;

let pic1, pic2;

//heartrain
let rain = [];

function preload() {
  heart = loadImage('heart.png');
}

function setup() {
  createCanvas(1000, 600);

  //heart rain
  for (let i = 0; i < 150; i++) {
    rain.push(new Rain(heart));
  }

    // Instantiate our SerialPort object
    serial = new p5.SerialPort();
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing

    serial.list(); // list the serial ports

    serial.open("/dev/cu.usbmodem1411");

    // let col= map(humi1, 0,width, 0,255);
  }

  function draw() {
    background(255);
    imageMode(CENTER);

    //bar();


    //let col= map(humi1,0,width, 0,255);
    //tint(col,50);
    //println(humi1);
    
  	//falling heart
    //if (humi1 > width / 3 && humi2 > width / 3)

    if (humi1 > width / 4 ) {
      for (let i = 0; i < rain.length; i++) {
        rain[i].fall();
        rain[i].display();
      }
      
    }
  	scale(random(0.99, 1));

    pic1 = image(heart, width / 4, height / 2, humi1, humi1);
  	//scale(random(0.95, 1));

    pic2 = image(heart, width * 3 / 4, height / 2, humi2, humi2);
  	//scale(random(0.95, 1));

  }




  // get the list of ports:
  function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
      // Display the list the console:
      println(i + " " + portList[i]);
    }
  }

  function serverConnected() {
    println('connected to server.');
  }

  function portOpen() {
    println('the serial port opened.')
  }

  function serialError(err) {
    println('Something went wrong with the serial port. ' + err);
  }

  function portClose() {
    println('The serial port closed.');
  }

  function serialEvent() {
    // read a string from the serial port
    // until you get carriage return and newline:
    var inString = serial.readStringUntil('\r\n');

    //check to see that there's actually a string there:
    if (inString.length > 0) {
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length > 2) { // if there are three elements
        humi1 = map(sensors[1], 40, 100, 0, width / 2);
        humi2 = map(sensors[3], 40, 100, 0, width / 2);
        // element 0 is the boardx
        //wh = map(sensors[1], 0, 1023, 0, height/2); // element 1 is the wall's height
        //circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
      }
    }


  }

  function bar() {
    noFill();
    stroke(255);
    strokeWeight(1);

    fill(255, 233, 138);
    Humi = rect(100, 600, 50, -frameCount / 2);
    Pulse = rect(200, 600, 50, -frameCount / 2);
  }// Declare a "SerialPort" object
let serial;
//let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
var Humi;
var Pulse;

//data name from sensor
let pulse1;
let humi1;
let pulse2;
let humi2;

//beat1=(pulse1+humi1)*sth
let beat1;
let beat2;

let pic1, pic2;

//heartrain
//let rain[];

function preload() {
  heart = loadImage('heart.png');
}

function setup() {
  createCanvas(1000, 600);

  //heart rain
  // for (let i = 0; i < 150; i++) {
  //   rain[i] = new Rain();
  // }

    // Instantiate our SerialPort object
    serial = new p5.SerialPort();
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing

    serial.list(); // list the serial ports

    serial.open("/dev/cu.usbmodem1411");

    // let col= map(humi1, 0,width, 0,255);
  }

  function draw() {
    background(255);
    imageMode(CENTER);

    //bar();


    //let col= map(humi1,0,width, 0,255);
    //tint(col,50);
    //println(humi1);

    pic1 = image(heart, width / 4, height / 2, humi1, humi1);

    pic2 = image(heart, width * 3 / 4, height / 2, humi2, humi2);

    //falling heart
    // if (humi1 > width / 3 && humi2 > width / 3) {
    //   for (let i = 0; i < rain.length; i++) {
    //     rain[i].fall();
    //     rain[i].display();
    //   }
    // }
  }




  // get the list of ports:
  function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
      // Display the list the console:
      println(i + " " + portList[i]);
    }
  }

  function serverConnected() {
    println('connected to server.');
  }

  function portOpen() {
    println('the serial port opened.')
  }

  function serialError(err) {
    println('Something went wrong with the serial port. ' + err);
  }

  function portClose() {
    println('The serial port closed.');
  }

  function serialEvent() {
    // read a string from the serial port
    // until you get carriage return and newline:
    var inString = serial.readStringUntil('\r\n');

    //check to see that there's actually a string there:
    if (inString.length > 0) {
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length > 2) { // if there are three elements
        humi1 = map(sensors[1], 40, 100, 0, width / 2);
        humi2 = map(sensors[3], 40, 100, 0, width / 2);
        // element 0 is the boardx
        //wh = map(sensors[1], 0, 1023, 0, height/2); // element 1 is the wall's height
        //circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
      }
    }


  }

  function bar() {
    noFill();
    stroke(255);
    strokeWeight(1);

    fill(255, 233, 138);
    Humi = rect(100, 600, 50, -frameCount / 2);
    Pulse = rect(200, 600, 50, -frameCount / 2);
  }var myMap;
var canvas;
var mappa = new Mappa('Leaflet');

// Lets change the map tiles to something with more contrast
var options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
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
}/*
Questions:

1.Follow the exact steps of Dan's video but can not successfully load the map below:
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/-122.4241,37.78,0.0,0,0/600x600?access_token=pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA');

but if I devide the url into two parts it can be loaded perfectly


#. This editor is super easy to be crushed.
*/

let api='https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=';
let token= 'pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA';
let mapimg;

let clat=0;
let clon=0;
//40.7128° N, 74.0060° W NYC

let lat=40.7128;
let lon=-74.0060;

let meteo;

let zoom=1;

function preload() {
  mapimg = loadImage(api+ token);
  //mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,1,0,0/600x600?access_token=pk.eyJ1IjoieWVvbnkxMDIiLCJhIjoiY2o4emkxdjNpMTc3bDMybnJidHowNnU4ayJ9.L7ZFrDdJVYx1ZjXvUrAqnA', gotImage);
//meteo=loadStrings('https://github.com/cvalenzuela/Mappa/blob/master/tutorials/basic/Meteorite_Landings.csv');
meteo=loadStrings('Meteo.csv', databack);
}

function databack(e){
  console.log(e);
}

function mercX(lon){
  lon = radians(lon);
  let a= (256/PI)* pow(2,zoom);
  let b= lon + PI;
  return a*b;
}


function mercY(lat){
  lat= radians(lat);
  let a=(256/PI)*pow(2,zoom);
  let b=tan(PI/4+lat/2);
  let c=PI-log(b);
  return a*c;
}

  
  

function setup() {
  createCanvas(1024, 512);
  translate(width/2,height/2);
  imageMode(CENTER);
  image(mapimg,0,0);
  
  let cx= mercX(clon);
  let cy= mercY(clat);
  
  for(let i=0; i< meteo.length; i++){
    let data=meteo[i]. split(/,/);
    //console.log(data);
    let lat= data[8];
    let lon= data[9];
    let mass= data[5];
    let r= map(mass,558,60000000,5,25);
    
    
      let x= mercX(lon)-cx;
  let y= mercY(lat)-cy;
  
  fill(200,150,50,150);
  noStroke();
  ellipse(x,y,r);
  }
  

  
}

function draw() {

  //background(220);

//image(mapimg, 0, 0);
  
  
  
}/*
Questions:

1.Follow the exact steps of Dan's video but can not successfully load the map below:
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/-122.4241,37.78,0.0,0,0/600x600?access_token=pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA');

but if I devide the url into two parts it can be loaded perfectly


#. This editor is super easy to be crushed.
*/

let api='https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/0,0,1,0,0/1024x512?access_token=';
let token= 'pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA';
let mapimg;

let clat=0;
let clon=0;
//40.7128° N, 74.0060° W NYC

let lat=40.7128;
let lon=-74.0060;

let meteo;

let zoom=1;

function preload() {
  mapimg = loadImage(api+ token);
  //mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,1,0,0/600x600?access_token=pk.eyJ1IjoieWVvbnkxMDIiLCJhIjoiY2o4emkxdjNpMTc3bDMybnJidHowNnU4ayJ9.L7ZFrDdJVYx1ZjXvUrAqnA', gotImage);
//meteo=loadStrings('https://github.com/cvalenzuela/Mappa/blob/master/tutorials/basic/Meteorite_Landings.csv');
meteo=loadStrings('Meteorite_Landing.csv', databack');
}

function mercX(lon){
  lon = radians(lon);
  let a= (256/PI)* pow(2,zoom);
  let b= lon + PI;
  return a*b;
}


function mercY(lat){
  lat= radians(lat);
  let a=(256/PI)*pow(2,zoom);
  let b=tan(PI/4+lat/2);
  let c=PI-log(b);
  return a*c;
}

  
  

function setup() {
  createCanvas(1024, 512);
  translate(width/2,height/2);
  imageMode(CENTER);
  image(mapimg,0,0);
  
  let cx= mercX(clon);
  let cy= mercY(clat);
  
  for(let i=0; i< meteo.length; i++){
    let data=meteo[i]. split(/,/);
    console.log(data);
  }
  
  let x= mercX(lon)-cx;
  let y= mercY(lat)-cy;
  
  fill(255,100,100,200);
  noStroke();
  ellipse(x,y,10);
  
}

function draw() {

  //background(220);

//image(mapimg, 0, 0);
  
  
  
}/*
Questions:

1.Follow the exact steps of Dan's video but can not successfully load the map below:
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/-122.4241,37.78,0.0,0,0/600x600?access_token=pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA');

but if I devide the url into two parts it can be loaded perfectly


#. This editor is super easy to be crushed.
*/

let api='https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/0,0,1,0,0/1024x512?access_token=';
let token= 'pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA';
let mapimg;

let clat=0;
let clon=0;
//40.7128° N, 74.0060° W NYC

let lat=40.7128;
let lon=-74.0060;

let meteo;

let zoom=1;

function preload() {
  mapimg = loadImage(api+ token);
  //mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,1,0,0/600x600?access_token=pk.eyJ1IjoieWVvbnkxMDIiLCJhIjoiY2o4emkxdjNpMTc3bDMybnJidHowNnU4ayJ9.L7ZFrDdJVYx1ZjXvUrAqnA', gotImage);
//meteo=loadStrings('https://github.com/cvalenzuela/Mappa/blob/master/tutorials/basic/Meteorite_Landings.csv');
meteo=loadStrings('
}

function mercX(lon){
  lon = radians(lon);
  let a= (256/PI)* pow(2,zoom);
  let b= lon + PI;
  return a*b;
}


function mercY(lat){
  lat= radians(lat);
  let a=(256/PI)*pow(2,zoom);
  let b=tan(PI/4+lat/2);
  let c=PI-log(b);
  return a*c;
}

  
  

function setup() {
  createCanvas(1024, 512);
  translate(width/2,height/2);
  imageMode(CENTER);
  image(mapimg,0,0);
  
  let cx= mercX(clon);
  let cy= mercY(clat);
  
  let x= mercX(lon)-cx;
  let y= mercY(lat)-cy;
  
  fill(255,100,100,200);
  noStroke();
  ellipse(x,y,10);
  
}

function draw() {

  //background(220);

//image(mapimg, 0, 0);
  
  
  
}/*
Questions:

1.Follow the exact steps of Dan's video but can not successfully load the map below:
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/-122.4241,37.78,0.0,0,0/600x600?access_token=pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA');

but if I devide the url into two parts it can be loaded perfectly


#. This editor is super easy to be crushed.
*/

let api='https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/0,0,1,0,0/1024x512?access_token=';
let token= 'pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA';
let mapimg;

let clat=0;
let clon=0;
//40.7128° N, 74.0060° W NYC

let lat=40.7128;
let lon=-74.0060;

let meteo;

let zoom=1;

function preload() {
  mapimg = loadImage(api+ token);
  //mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,1,0,0/600x600?access_token=pk.eyJ1IjoieWVvbnkxMDIiLCJhIjoiY2o4emkxdjNpMTc3bDMybnJidHowNnU4ayJ9.L7ZFrDdJVYx1ZjXvUrAqnA', gotImage);
meteo=loadString('
}

function mercX(lon){
  lon = radians(lon);
  let a= (256/PI)* pow(2,zoom);
  let b= lon + PI;
  return a*b;
}


function mercY(lat){
  lat= radians(lat);
  let a=(256/PI)*pow(2,zoom);
  let b=tan(PI/4+lat/2);
  let c=PI-log(b);
  return a*c;
}

  
  

function setup() {
  createCanvas(1024, 512);
  translate(width/2,height/2);
  imageMode(CENTER);
  image(mapimg,0,0);
  
  let cx= mercX(clon);
  let cy= mercY(clat);
  
  let x= mercX(lon)-cx;
  let y= mercY(lat)-cy;
  
  fill(255,100,100,200);
  noStroke();
  ellipse(x,y,10);
  
}

function draw() {

  //background(220);

//image(mapimg, 0, 0);
  
  
  
}/*
Questions:

1.Follow the exact steps of Dan's video but can not successfully load the map below:
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/-122.4241,37.78,0.0,0,0/600x600?access_token=pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA');

but if I devide the url into two parts it can be loaded perfectly

2. Follow the exact steps of video but cannot put the ellipse on te correct position

*/

let api='https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/0,0,1,0,0/1024x512?access_token=';
let token= 'pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA';
let mapimg;

let clat=0;
let clon=0;
//40.7128° N, 74.0060° W NYC

let lat=40.7128;
let lon=-74.0060;

let zoom=1

function preload() {
  mapimg = loadImage(api+ token);
  //mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,1,0,0/600x600?access_token=pk.eyJ1IjoieWVvbnkxMDIiLCJhIjoiY2o4emkxdjNpMTc3bDMybnJidHowNnU4ayJ9.L7ZFrDdJVYx1ZjXvUrAqnA', gotImage);

}

function mercX(lon){
  lon = radians(lon);
  let a= (256/PI)* pow(2,zoom);
  let b= lon + PI;
  return a*b;
}


function mercY(lat){
  lat= radians(lat);
  let a=(/PI)*pow(2,zoom);
  let b=(PI/4+lat/2);
  let c=PI-log(b);
  return a*c;
}

  
  

function setup() {
  createCanvas(1024, 512);
  translate(width/2,height/2);
  imageMode(CENTER);
  image(mapimg,0,0);
  
  let cx= mercX(clon);
  let cy= mercY(clat);
  
  let x= mercX(lon)-cx;
  let y= mercY(lat)-cy;
  
  fill(255,100,100,200);
  noStroke();
  ellipse(x,y,20);
  
}

function draw() {

  //background(220);

//image(mapimg, 0, 0);
  
  
  
}/*
1.Follow the exact steps of Dan's video but can not successfully load the map below:
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/-122.4241,37.78,0.0,0,0/600x600?access_token=pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA');

but if I devide the url into two parts it can be loaded perfectly


*/

let api='https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/0,0,0,0,0/1024x512?access_token=';
let token= 'pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA';
let mapimg;

let clat=0;
let clon=0;
//40.7128° N, 74.0060° W NYC

let lat=40.7128° N, 74.0060° W;
let lon=0;

function preload() {
  mapimg = loadImage(api+ token);
  //mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,1,0,0/600x600?access_token=pk.eyJ1IjoieWVvbnkxMDIiLCJhIjoiY2o4emkxdjNpMTc3bDMybnJidHowNnU4ayJ9.L7ZFrDdJVYx1ZjXvUrAqnA', gotImage);

}

function setup() {
  createCanvas(1024, 512);
  //imageMode(CENTER);
  
}

function draw() {

  background(220);

image(mapimg, 0, 0);
  
}*/


let mapimg;

function preload() {
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/-122.4241,37.78,0.0,0,0/600x600?access_token=pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA');
  //mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,1,0,0/600x600?access_token=pk.eyJ1IjoieWVvbnkxMDIiLCJhIjoiY2o4emkxdjNpMTc3bDMybnJidHowNnU4ayJ9.L7ZFrDdJVYx1ZjXvUrAqnA', gotImage);

}

function setup() {
  createCanvas(600, 600);
  image(mapimg, 0, 0);
}

function draw() {
  background(220);
}// Declare a "SerialPort" object
let serial;
//let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

//data name from sensor
let pulse1;
let humi1;
let pulse2;
let humi2;

//beat1=(pulse1+humi1)*sth
let beat1;
let beat2;

//heart
let heart1;

function preload(){
  heart1=loadImage('heart.png');
}

function setup() { 
  createCanvas(400, 400);
  //heart1=new Heart(20,200,5);
  
   // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.on('list', printList);    // set a callback function for the serialport list event
 serial.on('connected', serverConnected); // callback for connecting to the server
 serial.on('open', portOpen);     // callback for the port opening
 serial.on('data', serialEvent);  // callback for when new data arrives
 serial.on('error', serialError); // callback for errors
 serial.on('close', portClose);   // callback for the port closing
 
 serial.list();                   // list the serial ports
  serial.open("/dev/cu.usbmodem1451");
} 

function draw() { 
  //background(220);
 // heart1.display();
}




// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 println(i + " " + portList[i]);
 }
}
 
function serverConnected() {
 println('connected to server.');
}
 
function portOpen() {
 println('the serial port opened.')
}
 
function serialError(err) {
 println('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
 println('The serial port closed.');
}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
 
  //check to see that there's actually a string there:
  if (inString.length > 0 ) {
    var sensors = split(inString, ',');            // split the string on the commas
    if (sensors.length > 2) {                      // if there are three elements
      //bx = map(sensors[0], 0, 1023, 0,width);   // element 0 is the boardx
      //wh = map(sensors[1], 0, 1023, 0, height/2); // element 1 is the wall's height
      //circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
    }
  }
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
}let x;
let xspeed;
let y;
let yspeed;
let radium;
let rectwidth;
let rectheight;
let a = false;
let t = "press to start";
//variables for slider
let drag = false;
let offset;
//button
let b;
let c;
let d;

//variables for the wall
let wh;

//variables for the board
let bx;

// Declare a "SerialPort" object
let serial;
//let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas


function setup() {
  createCanvas(550, 500);
  x = (width - 50) / 3;
  xspeed = random(5);
  y = height / 3;
  yspeed = random(8);
  radium = 30;
  rectwidth = 100;
  rectheight = 10;
  // b = width - 25;
  // c = height / 3;
  // d = 15;
  
   // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.on('list', printList);    // set a callback function for the serialport list event
 serial.on('connected', serverConnected); // callback for connecting to the server
 serial.on('open', portOpen);     // callback for the port opening
 serial.on('data', serialEvent);  // callback for when new data arrives
 serial.on('error', serialError); // callback for errors
 serial.on('close', portClose);   // callback for the port closing
 
 serial.list();                   // list the serial ports
  serial.open("/dev/cu.usbmodem14521");
}

function draw() {
  background(250);
  noStroke();
  
  serialEvent()

  print(wh);
  
  //wall
  rect(0, 0, width , wh);
  
  //button(sensor[2]);

  //bounce & text
  if (a == true) {

    bounce(0, width , wh, height);

    y += yspeed;
    x += xspeed;
    ellipse(x, y, radium, radium);
  }
  if (a == false) {
    words(t);
  }
  //board
  rect(bx - rectwidth / 2, height - rectheight, rectwidth, rectheight)
}




//bounce
function bounce(w1, w2, h1, h2) {
  if (x < w1 || x > w2) {
    xspeed *= -1;
  }
  if (y < h1) {
    yspeed *= -1;
  }

  if (y > h2 - rectheight) {
    if (abs(bx - x) < rectwidth / 2) {
      yspeed *= -1
      print(y + "and mouseX:" + bx + "and X:" + x)
    } else {
      y = wh;
      a = false;

    }

  }

}

// //buttonpressed
// function button(p) {
//   p=true;
//   a = !a;
// }

//mousepressed
function mousePressed() {
   a = !a;
  fill(random(250), 0, random(250));

  //slider
  if (mouseX > b && mouseX < b + d && mouseY > c && mouseY < c + d) {
    drag = true;

    offset = y - mouseY;
  }
}

function mouseReleased() {
  // Stop dragging
  drag = false;
}

//text
function words(t) {
  fill(0);
  textSize(30);
  text(t, width /3, height / 3);
}

//slider
function slider() {
  //slider
  // Is it being dragged?
  if (drag) {
    c = mouseY + offset;
  }
  // Keep rectangle within limits of slider
  c = constrain(c, height / 3, height * 2 / 3);
  //map wall
  //wh = map(c, height / 3, height * 2 / 3, 0, height * 3 / 4);

  


  rect(width - 50, 0, 50, height);
  stroke(255);
  line(width - 25, height / 3, width - 25, height * 2 / 3);

  rect(b, c, d, d);
}

// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 println(i + " " + portList[i]);
 }
}
 
function serverConnected() {
 println('connected to server.');
}
 
function portOpen() {
 println('the serial port opened.')
}
 
function serialError(err) {
 println('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
 println('The serial port closed.');
}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
 
  //check to see that there's actually a string there:
  if (inString.length > 0 ) {
    var sensors = split(inString, ',');            // split the string on the commas
    if (sensors.length > 2) {                      // if there are three elements
      bx = map(sensors[0], 0, 1023, 0,width);   // element 0 is the boardx
      wh = map(sensors[1], 0, 1023, 0, height/2); // element 1 is the wall's height
      //circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
    }
  }
}let x;
let xspeed;
let y;
let yspeed;
let radium;
let rectwidth;
let rectheight;
let a = false;
let t = "press to start";


//variables for the wall
let wh;

//variables for the board
let bx;

// Declare a "SerialPort" object
let serial;
/let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas


function setup() {
  createCanvas(550, 500);
  x = (width - 50) / 3;
  xspeed = random(8);
  y = height / 3;
  yspeed = random(12);
  radium = 30;
  rectwidth = 100;
  rectheight = 10;
  b = width - 25;
  c = height / 3;
  d = 15;
  
    // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.on('list', printList);    // set a callback function for the serialport list event
 serial.on('connected', serverConnected); // callback for connecting to the server
 serial.on('open', portOpen);     // callback for the port opening
 serial.on('data', serialEvent);  // callback for when new data arrives
 serial.on('error', serialError); // callback for errors
 serial.on('close', portClose);   // callback for the port closing
 
 serial.list();                   // list the serial ports
  serial.open("/dev/cu.usbmodem14131");
}

function draw() {
  background(250);
  noStroke();
  
  serialEvent()

  //wall
  rect(0, 0, width , wh);

  print(wh);

  //bounce & text
  if (a == true) {

    bounce(0, width - 50, wh, height);

    y += yspeed;
    x += xspeed;
    ellipse(x, y, radium, radium);
  }
  if (a == false) {
    words(t);
  }
  //board
  rect(bx - rectwidth / 2, height - rectheight, rectwidth, rectheight)
}




//bounce
function bounce(w1, w2, h1, h2) {
  if (x < w1 || x > w2) {
    xspeed *= -1;
  }
  if (y < h1) {
    yspeed *= -1;
  }

  if (y > h2 - rectheight) { 
    if (abs(bx - x) < rectwidth / 2) {
      yspeed *= -1
      print(y + "and mouseX:" + bx + "and X:" + x)
    } else {
      y = wh;
      a = false;

    }

  }

}

//mousepressed
function mousePressed() {
  a = !a;
  fill(random(250), 0, random(250));

  //slider
  if (mouseX > b && mouseX < b + d && mouseY > c && mouseY < c + d) {
    drag = true;

    offset = y - mouseY;
  }
}

function mouseReleased() {
  // Stop dragging
  drag = false;
}

//text
function words(t) {
  fill(0);
  textSize(30);
  text(t, width /3, height / 3);
}


// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 println(i + " " + portList[i]);
 }
}
 
function serverConnected() {
 println('connected to server.');
}
 
function portOpen() {
 println('the serial port opened.')
}
 
function serialError(err) {
 println('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
 println('The serial port closed.');
}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
 
  //check to see that there's actually a string there:
  if (inString.length > 0 ) {
    var sensors = split(inString, ',');            // split the string on the commas
    if (sensors.length > 2) {                      // if there are three elements
      bx = map(sensors[0], 0, 1023, 0,width);   // element 0 is the boardx
      wh = map(sensors[1], 0, 1023, 0, height/2); // element 1 is the wall's height
      //circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
    }
  }
}// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas


function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
  
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem14131");
  serial.on('data', gotData);

} 

function draw() { 
  background(127, 0, 127);
  
  var v = map(latestData,0,1023,50,500); 
  var origV = v;

  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  // Nose
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);

  // Mouth

  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}


// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log(currentString); // println the string
  latestData = currentString; // save it for the draw method
}
#

let x;
let xspeed;

let y;
let yspeed;

let d;

//html
let h1;
let button1;
let button2;
let slider1;
let slider2;
let slider3;
let bcolor;
let bgcolor;

function setup() { 
  createCanvas(400, 400);
  
  //html
  h1=createElement('h1', 'Style the Ball');
  
  bcolor = color(0);
  bgcolor= color(200);
  button1=createButton("change ball color");
  button1.mousePressed(changeBallColor);
  
  button2=createButton("change Background color");
  button2.mousePressed(changeBgColor);
  
  createP("change the size");
  slider1= createSlider(10,100,50);
  createP("change the xspeed");
  slider2= createSlider(5,20,10);
  createP("change the yspeed");
  slider3= createSlider(5,20,10);
   
    x=width/2;
  xspeed=slider2.value();
  
  y=height/2;
  yspeed=slider3.value();
  

} 

function draw() { 
  background(bgcolor);
  

  bounce(0,width,0,height);
  fill(bcolor);
  display(x,y,d);
  move();
  noStroke();
  //ellipse(x,y,50,50);

}

function bounce(w1,w2,h1,h2){
  
  if(x<w1 || x>w2){
  xspeed*=-1;
}
  if(y<h1 || y>h2){
  yspeed*=-1;
  
}
 
  
  
}

function move(){
   y+=yspeed;
  x+=xspeed;
}

function display(x,y){
  //fill(bcolor);
  ellipse(x,y,slider1.value());
}

function changeBallColor(){
  bcolor=color(random(100,255),0,random(255));
}

function changeBgColor(){
  bgcolor=color(0,random(255),random(255));
}
//Question: I set two sliders to change the xspeed &yspeed
//but it doesn't work
//wanna know why


let x;
let xspeed;

let y;
let yspeed;

let d;

//html
let h1;
let button1;
let button2;
let slider1;
let slider2;
let slider3;
let bcolor;
let bgcolor;

function setup() { 
  createCanvas(400, 400);
  
  //html
  h1=createElement('h1', 'Style the Ball');
  
  bcolor = color(0);
  bgcolor= color(200);
  button1=createButton("change ball color");
  button1.mousePressed(changeBallColor);
  
  button2=createButton("change Background color");
  button2.mousePressed(changeBgColor);
  
  createP("change the size");
  slider1= createSlider(10,100,50);
  createP("change the xspeed");
  slider2= createSlider(5,20,10);
  createP("change the yspeed");
  slider3= createSlider(5,20,10);
   
    x=width/2;
  xspeed=slider2.value();
  
  y=height/2;
  yspeed=slider3.value();
  

} 

function draw() { 
  background(bgcolor);
  
  bounce(0,width,0,height);
  fill(bcolor);
  display(x,y,d);
  move();
  noStroke();
  //ellipse(x,y,50,50);

}

function bounce(w1,w2,h1,h2){
  
  if(x<w1 || x>w2){
  xspeed*=-1;
}
  if(y<h1 || y>h2){
  yspeed*=-1;
  
}
 
  
  
}

function move(){
   y+=yspeed;
  x+=xspeed;
}

function display(x,y){
  //fill(bcolor);
  ellipse(x,y,slider1.value());
}

function changeBallColor(){
  bcolor=color(random(100,255),0,random(255));
}

function changeBgColor(){
  bgcolor=color(0,random(255),random(255));
}
#

let x;
let xspeed;

let y;
let yspeed;

let d;

//html
let h1;
let button1;
let button2;
let slider1;
let slider2;
let slider3;
let bcolor;
let bgcolor;

function setup() { 
  createCanvas(400, 400);
  
  //html
  h1=createElement('h1', 'Style the Ball');
  
  bcolor = color(0);
  bgcolor= color(200);
  button1=createButton("change ball color");
  button1.mousePressed(changeBallColor);
  
  button2=createButton("change Background color");
  button2.mousePressed(changeBgColor);
  
  createP("change the size");
  slider1= createSlider(10,100,50);
  createP("change the xspeed");
  slider2= createSlider(5,20,10);
  createP("change the yspeed");
  slider3= createSlider(5,20,10);
   
    x=width/2;
  xspeed=slider2.value();
  
  y=height/2;
  yspeed=slider3.value();
  

} 

function draw() { 
  background(bgcolor);
  

  bounce(0,width,0,height);
  fill(bcolor);
  display(x,y,d);
  move();
  noStroke();
  //ellipse(x,y,50,50);

}

function bounce(w1,w2,h1,h2){
  
  if(x<w1 || x>w2){
  xspeed*=-1;
}
  if(y<h1 || y>h2){
  yspeed*=-1;
  
}
 
  
  
}

function move(){
   y+=yspeed;
  x+=xspeed;
}

function display(x,y){
  //fill(bcolor);
  ellipse(x,y,slider1.value());
}

function changeBallColor(){
  bcolor=color(random(100,255),0,random(255));
}

function changeBgColor(){
  bgcolor=color(0,random(255),random(255));
}
#

let x;
let xspeed;

let y;
let yspeed;

let d;

//html
let h1;
let button1;
let button2;
let slider1;
let slider2;
let slider3;
let bcolor;
let bgcolor;

function setup() { 
  createCanvas(400, 400);
  
  //html
  h1=createElement('h1', 'Style the Ball');
  
  bcolor = color(0);
  bgcolor= color(200);
  button1=createButton("change ball color");
  button1.mousePressed(changeBallColor);
  
  button2=createButton("change Background color");
  button2.mousePressed(changeBgColor);
  
  createP("change the size");
  slider1= createSlider(10,100,50);
  createP("change the xspeed");
  slider2= createSlider(5,20,10);
  createP("change the yspeed");
  slider3= createSlider(5,20,10);
   
    x=width/2;
  xspeed=slider2.value();
  
  y=height/2;
  yspeed=slider3.value();
  

} 

function draw() { 
  background(bgcolor);
  

  bounce(0,width,0,height);
  fill(bcolor);
  display(x,y,d);
  move();
  noStroke();
  //ellipse(x,y,50,50);

}

function bounce(w1,w2,h1,h2){
  
  if(x<w1 || x>w2){
  xspeed*=-1;
}
  if(y<h1 || y>h2){
  yspeed*=-1;
  
}
 
  
  
}

function move(){
   y+=yspeed;
  x+=xspeed;
}

function display(x,y){
  //fill(bcolor);
  ellipse(x,y,slider1.value());
}

function changeBallColor(){
  bcolor=color(random(100,255),0,random(255));
}

function changeBgColor(){
  bgcolor=color(0,random(255),random(255));
}
#

let x;
let xspeed;

let y;
let yspeed;

let d;

//html
let h1;
let button1;
let button2;
let slider1;
let slider2;
let slider3;
let bcolor;
let bgcolor;

function setup() { 
  createCanvas(400, 400);
  
  //html
  h1=createElement('h1', 'Style the Ball');
  
  bcolor = color(0);
  bgcolor= color(200);
  button1=createButton("change ball color");
  button1.mousePressed(changeBallColor);
  
  button2=createButton("change Background color");
  button2.mousePressed(changeBgColor);
  
  createP("change the size");
  slider1= createSlider(10,100,50);
  createP("change the xspeed");
  slider2= createSlider(5,20,10);
  createP("change the yspeed");
  slider3= createSlider(5,20,10);
   
    x=width/2;
  xspeed=slider2.value();
  
  y=height/2;
  yspeed=slider3.value();
  

} 

function draw() { 
  background(bgcolor);
  

  bounce(0,width,0,height);
  fill(bcolor);
  display(x,y,d);
  move();
  noStroke();
  //ellipse(x,y,50,50);

}

function bounce(w1,w2,h1,h2){
  
  if(x<w1 || x>w2){
  xspeed*=-1;
}
  if(y<h1 || y>h2){
  yspeed*=-1;
  
}
 
  
  
}

function move(){
   y+=yspeed;
  x+=xspeed;
}

function display(x,y){
  //fill(bcolor);
  ellipse(x,y,slider1.value());
}

function changeBallColor(){
  bcolor=color(random(100,255),0,random(255));
}

function changeBgColor(){
  bgcolor=color(0,random(255),random(255));
}
let nums = [];
let x, y;

function setup() {
  createCanvas(400, 400);

  //the first exp:
  // for (let i=0;i<100;i++){
  //   nums.push(i++);
  //   print(i+":"+nums[i]);
  //                }

}

function draw() {
  background(0);
  noStroke();

  if (nums.length > 50) nums.shift();

  //the 2nd exp:
  //every frame of animation
  //every mouse position, store in the array
  nums.push({
    x: mouseX,
    y: mouseY
  });

  for (let i = 0; i < nums.length; i++) {
    x = nums[i].x;
    y = nums[i].y;
    ellipse(x, y, i / 5);
  }
}let balls=[];


function setup() { 
  createCanvas(400, 400);
  d=20;
  
  for(let i=0; i<50; i++){
    balls.push(new Ball(random(width), random(height),random(1,3),2random));
  }
 
} 

function draw() { 
  background(220);
  for (let i=0; i< balls.length; i++){
    
  balls[i].run();
  }
 
  
//   ball1.update();
//   ball1.display();
  
//   ball2.update();
//   ball2.display();
}let ball1;
let ball2;

function setup() { 
  createCanvas(400, 400);
  d=50
  
  ball1=new Ball(width/2,height/2,3,2);
  ball2=new Ball(width,height/2,3,5);
} 

function draw() { 
  background(220);
  
  ball1.run();
  ball2.run();
  
//   ball1.update();
//   ball1.display();
  
//   ball2.update();
//   ball2.display();
}let x;
let xspeed;

let y;
let yspeed;

let d;

function setup() { 
  createCanvas(400, 400);
   
  x=width/2;
  xspeed=random(10);
  
  y=height/2;
  yspeed=random(20);
  
  d=50;
} 

function draw() { 
  background(220);
 
  
// if(x<0 || x>width){
//   xspeed*=-1;
// }
//   if(y<0 || y>height){
//   yspeed*=-1;
  
// }
//   xspeed= bounce(x,xspeed,0,width);
//     yspeed= bounce(y,yspeed, 0, height);
  
//   y+=yspeed;
//   x+=xspeed;
  bounce(0,width,0,height);
  display(x,y,d);
  move();
  noStroke();
  //ellipse(x,y,50,50);

}

function bounce(w1,w2,h1,h2){
  
  if(x<w1 || x>w2){
  xspeed*=-1;
}
  if(y<h1 || y>h2){
  yspeed*=-1;
  
}
 
  
  
}

function move(){
   y+=yspeed;
  x+=xspeed;
}

function display(x,y,d){
  ellipse(x,y,d);
}

// function bounce(loc,speed,bottom,top){
  
//   if(loc< bottom || loc> top){
//   speed*=-1;

  
// }
//   return speed;
  // y+=yspeed;
  // x+=xspeed;
let x;
let xspeed;
let y;
let yspeed;
let radium;
let rectwidth;
let rectheight;
let a = false;
let t = "click to start";
//variables for slider
let drag = false;
let offset;
//button
let b;
let c;
let d;

//variables for the wall
let wh;

function setup() {
  createCanvas(450, 400);
  x = (width - 50) / 3;
  xspeed = random(8);
  y = height / 3;
  yspeed = random(12);
  radium = 30;
  rectwidth = 100;
  rectheight = 10;
  b = width - 25;
  c = height / 3;
  d = 15;
}

function draw() {
  background(250);
  noStroke();

  //slider
  slider();
  wh = map(c, height / 3, height * 2 / 3, 0, height * 3 / 4);
  print(wh);

  //bounce & text
  if (a == true) {

    bounce(0, width - 50, wh, height);

    y += yspeed;
    x += xspeed;
    ellipse(x, y, radium, radium);
  }
  if (a == false) {
    words(t);
  }
  //board
  rect(mouseX - rectwidth / 2, height - rectheight, rectwidth, rectheight)
}




//bounce
function bounce(w1, w2, h1, h2) {
  if (x < w1 || x > w2) {
    xspeed *= -1;
  }
  if (y < h1) {
    yspeed *= -1;
  }

  if (y > h2 - rectheight) {
    if (abs(mouseX - x) < rectwidth / 2) {
      yspeed *= -1
      print(y + "and mouseX:" + mouseX + "and X:" + x)
    } else {
      y = wh;
      a = false;

    }

  }

}

//mousepressed
function mousePressed() {
  a = !a;
  fill(random(250), 0, random(250));

  //slider
  if (mouseX > b && mouseX < b + d && mouseY > c && mouseY < c + d) {
    drag = true;

    offset = y - mouseY;
  }
}

function mouseReleased() {
  // Stop dragging
  drag = false;
}

//text
function words(t) {
  fill(0);
  textSize(30);
  text(t, width * 2 / 7, height / 3);
}

//slider
function slider() {
  //slider
  // Is it being dragged?
  if (drag) {
    c = mouseY + offset;
  }
  // Keep rectangle within limits of slider
  c = constrain(c, height / 3, height * 2 / 3);
  //map wall
  //wh = map(c, height / 3, height * 2 / 3, 0, height * 3 / 4);

  rect(0, 0, width - 50, wh);


  rect(width - 50, 0, 50, height);
  stroke(255);
  line(width - 25, height / 3, width - 25, height * 2 / 3);

  rect(b, c, d, d);
}//doesn't really work...

let x;
let y;

let h = 10;
let v = 5;

let cw;
let ch;

let cols;
let rows;
let indexc;
let indexr;

let click = false;

function setup() {
  createCanvas(400, 400);
   background(220);

  cw = width / h;
  ch = height / v;

  cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  rows = [1, 2, 3, 4, 5];
  indexc = 0;
  indexr = 0;
}

function draw() {
 

  for (x = 0; x <= width; x += width / h) {
    line(x, 0, x, height);
    for (y = 0; y <= height; y += height / v) {
      line(0, y, width, y);
    }
  }

  if (click) {


    noStroke();
    fill(0, 0, 100);
    rect(cw * cols[indexc], ch * rows[indexr], cw, ch);

  }
}

function mousePressed() {
  click = !click;

  indexc = floor(random(h));
  indexr = floor(random(v));
  print(indexc,"...", indexr);



}let x;
let xspeed;
let y;
let yspeed;
let radium;
let rectwidth;
let rectheight;
let a = false;
let t="click to start";
//variables for slider
let drag=false;
//button
let b=width-25;
let c=height/3;
let d=15;

//variables for the wall
let wh=0;

function setup() {
  createCanvas(450, 400);
  x = (width-50) / 3;
  xspeed = random(8);
  y = height / 3;
  yspeed = random(12);
  radium = 30;
  rectwidth = 100;
  rectheight = 10;
}

function draw() {
  background(220);
  noStroke();
  
  //slider
 
  rect(width-50,0,50,height);
  stroke(255);
  line(width-25, height/3,width-25,height*2/3);
  ellipse(width-25,height/3,d);
  
  if (a == true) {

    bounce(0, width-50, 0, height);

    y += yspeed;
    x += xspeed;
    ellipse(x, y, radium, radium);
  }
  if (a == false) {
    
    words(t);

  }
  rect(mouseX - rectwidth / 2, height - rectheight, rectwidth, rectheight)
}

//bounce
function bounce(w1, w2, h1, h2) {
  if (x < w1 || x > w2) {
    xspeed *= -1;
  }
  if (y < h1) {
    yspeed *= -1;
  }

  if (y > h2 - rectheight) {
    if (abs(mouseX - x) < rectwidth / 2) {
      yspeed *= -1
      print(y + "and mouseX:" + mouseX + "and X:" + x)
    } else {
      y = random(height / 3)
      a = false;

    }

  }

}

//mousepressed
function mousePressed() {
  a = !a;
  fill(random(250), 0, random(250));

}

//text
function words(t){
      fill(0);
    textSize(30);
    text(t, width*2/7, height/3);
}let x;
let xspeed;
let y;
let yspeed;
let radium;
let rectwidth;
let rectheight;
let a = false;

function setup() { 
  createCanvas(400, 400);   
  x=width/3;
  xspeed=random(5);  
  y=height/3;
  yspeed=random(10);
 radium=30
 rectwidth=100
 rectheight=10
} 

function draw() { 
  background(220);
  noStroke(); 
  if (a == true) {

  bounce(0,width,0,height);
  
 y+=yspeed;
  x+=xspeed;  
  ellipse(x,y,radium,radium);
}
 rect(mouseX-rectwidth/2,height-rectheight,rectwidth,rectheight)
}

//bounce
function bounce(w1,w2,h1,h2){  
  if(x<w1 || x>w2){
  xspeed*=-1;
}
  if(y<h1){
  yspeed*=-1;}
 
 if(y>h2-rectheight){
  if(abs(mouseX-x)<rectwidth/2){
  yspeed*=-1
 print(y+"and mouseX:"+mouseX+"and X:"+x)}
  else{
   y=random(height/3)
  a= false;
    textSize(30);
    text("
  }
   
 }
  
}

//mousepressed
function mousePressed(){
  a = !a;
  fill(random(250), 0, random(250));
  
}let x;
let xspeed;

let y;
let yspeed;

let a = false;

function setup() {
  createCanvas(400, 600);

  x = width / 2;
  xspeed = random(10);

  y = height / 2;

  yspeed = random(20);
}

function draw() {
  background(220);
  
  //board
  noStroke();
  rect(mouseX, 500, 100,10);

  if (a == true) {

    bounce(0, width, 0, height);
    

  }

}

function bounce(w1, w2, h1, h2) {

  if (x < w1 || x > w2) {
    xspeed *= -1;
  }
  if (y < h1 || y > h2) {
    yspeed *= -1;

  }
  y += yspeed;
  x += xspeed;


  ellipse(x, y, 50, 50);
}

function mousePressed(){
  a = !a;
}let x;
let xspeed;

let y;
let yspeed;

function setup() { 
  createCanvas(400, 400);
   
  x=width/2;
  xspeed=random(10);
  
  y=height/2;

  yspeed=random(20);
} 

function draw() { 
  background(220);
 
  
// if(x<0 || x>width){
//   xspeed*=-1;
// }
//   if(y<0 || y>height){
//   yspeed*=-1;
  
// }
//   xspeed= bounce(x,xspeed,0,width);
//     yspeed= bounce(y,yspeed, 0, height);
  
//   y+=yspeed;
//   x+=xspeed;
  bounce(0,width,0,height);
  noStroke();
  //ellipse(x,y,50,50);

}

function bounce(w1,w2,h1,h2){
  
  if(x<w1 || x>w2){
  xspeed*=-1;
}
  if(y<h1 || y>h2){
  yspeed*=-1;
  
}
  y+=yspeed;
  x+=xspeed;
  
  
  ellipse(x,y,50,50);
}

// function bounce(loc,speed,bottom,top){
  
//   if(loc< bottom || loc> top){
//   speed*=-1;

  
// }
//   return speed;
  // y+=yspeed;
  // x+=xspeed;
let nums= [ 25,100,75,80];
let num= 23;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  ellipse(100,100,num,num);
  
  ellipse(200,200,nums[2],nums[2]);
}let x;
let xspeed;

let y;
let yspeed;

function setup() { 
  createCanvas(400, 400);
   
//   x=width/2;
//   xspeed=random(10);
  
//   y=height/2;

//   yspeed=random(20);
} 

function draw() { 
  background(220);
 
  
// if(x<0 || x>width){
//   xspeed*=-1;
// }
//   if(y<0 || y>height){
//   yspeed*=-1;
  
// }
  xspeed= bounce(x,xspeed,0,width);
    yspeed= bounce(y,yspeed, 0, height);
  
  y+=yspeed;
  x+=xspeed;
  // bounce();
  noStroke();
  ellipse(x,y,50,50);


// function bounce(w1,w2,h1,h2){
  
//   if(x<w1 || x>w2){
//   xspeed*=-1;
// }
//   if(y<h1 || y>h2){
//   yspeed*=-1;
  
// }
//   y+=yspeed;
//   x+=xspeed;
  
  
  //ellipse(x,y,50,50);
}

function bounce(loc,speed,bottom,top){
  
  if(loc< bottom || loc> top){
  speed*=-1;

  
}
  return speed;
  // y+=yspeed;
  // x+=xspeed;
  
}let x, y, cw, ch, rw, rh;
let nc = 50;
let nr = 50;
let speed;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  cw = width / nc;
  rh = height / nr;
  noStroke();

  for (let i = 0; i < nc; i++) {
    for (let u = 0; u < nr; u++) {
      let d = dist(mouseX, mouseY, i * cw, u * rh);
      d = map(d, 0, 100, 255, 0);
      let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
      speed = map(speed, 0, 500, 0, 10);

      fill(speed * d);
      rect(i * cw, u * rh, cw, rh);
    }
  }

}let x;
let y;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  for( x=0; x<= width; x+=width/10){
    line(x, 0, x, height);
    for(y=0; y<= height; y+=height/10){
    line(0, y, width, y);
  }
  } 
}let button = false;
let x = 250;
let y = 250;
let d = 100;

// let a = 0.0;
// let inc = TWO_PI / 25.0;
// let speed = 0.1;
let i = 0;
let c = 0;
let offset=0;


function setup() {
  createCanvas(600, 600);

}

function draw() {
  background(220);

  if (mouseX > x && mouseX < x + 100 && mouseY < y + 100 && mouseY > y && mouseIsPressed) {
    button = true;



  } else {
    button = false;



  }


  if (button) {
    background(150, 30, 0);

    for (let i = 0; i <= width; i += 40) {
      for (let c = 0; c <= height; c += 40) {
        noStroke();
        fill(random(150), random(150), 0);
        ellipse(i+offset, c+offset, 20);
      }
      
      // noStroke();
      // fill(0, random(150), random(150));
      // rect(x - 10, y - 10, d + 20, d + 20);
    }

offset++;
    // draw lines-fail
    // let i = 0;
    // line(i * 4, height / 4, i * 4, 50 + sin(a) * 40.0);
    // a = a + inc;
    // i++

    // for (let i = 0; i < 25; i++) {
    //   line(i*4, 50, i*4, 50+sin(a)*40.0);
    //   a = a + inc;}



  } else {
    background(0);
    fill(255);
    noStroke();
    rect(x, y, d, d);
    
    offset=0;
  }


  //    fill(255);
  // noStroke();
  // rect(x,y,d,d);

}let x=0;
let y=0;


function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(0);
   
   if(mouseIsPressed){
      background(0,0,random(150));
      for(let x=mouseX; x<= width;x+=40){
        for(let y=mouseY; y<= height; y+=40){
          noStroke();
        fill(random(150),random(150),0);
        ellipse(x,y,20);
      }
    
      }
  }
    
}function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);

  for (let i = 0; i < 10; i++) {

    if (mouseX > width / 10 * i && mouseX < width / 10 * (i + 1)) {
      //change color
      fill(25 * i, 25 * i, 0);
      noStroke();
      rect(width / 10 * i, 0, width / 10, height); 

    } else {

      fill(220);
    }
  }
}let a=0;
function setup() { 
  createCanvas(400, 400);
  angleMode(DEGREES);
} 

function draw() { 
  background(220);
  push();
  translate(200,200);
  //scale number???
  scale(2,20);

  rotate(a++);
  
  rect(0,0,100,200);
  pop(0);






  
}
function setup() { 
  createCanvas(400, 400);
} 


function draw() { 
  background(100);
  for(let i=0; i<11; i++){
    rect(i*10,i*10,10, 10);
  }
}let x;
let inOn=false;

let isEntered=false;

let inOn=false;
// let red2;
// let red3;

function setup() { 
  createCanvas600, 400);
} 

function draw() { 
  background(220);
  fill(255,0,0);
    noStroke();
  
  // if the rect is on, draw it.
  isOn=true;
  if (isOn){
  
  if (mouseX < width/3) red1=true;
  
  {
    
    rect(0, 0, width/3, height);
  }

  else if (width/3 < mouseX && mouseX < width*2/3) {
  
    rect(width/3, 0, width/3, height);
  }
  
  
  //else if (mouseX>=2*width/3 && mouseX< width) {
  else{
    rect(2*width/3, 0, width/3, height);
  }
}let x;
let xspeed;
//let justHitRightWall=true;

function setup() {
  createCanvas(600, 400);
  ellipseMode(CENTER);
  x = width / 2;
  xspeed=3;
}

function draw() {
  background(220);
  //if (x > width) justHitRightWall = true;
  //else if (x < 0) justHitRightWall = false;

  //move to the right
  //x++

  //come back whenx is >width
  //if (justHitRightWall) {

  //  x--;
  //} else {
   // x++;
  //}

if(x>width || x<0){
  xspeed *=-1;
}
  //move

  // console.log(x);
  x+=xspeed;

  ellipse(x, height / 2, 50);
}var col={
  r:0,
  g:0,
  b:0
};
var sw=5;
let bodyr=125;
let headr=75;
let spot={
  x:0,
  y:0
};
let snowr;
let spped;



function setup() { 
  createCanvas(500, 700);
} 

function draw() {
  
  //backgroundSky
  r=map(mouseX,0,500,184,81);
  g=map(mouseX,0,500,208,97);
  b=map(mouseX,0,500,218,129);
  background(r,g,b);
  
   //click
  if(mouseIsPressed){
    noStroke();
    fill(255,245,180);
    ellipse(mouseX-100, mouseY,100);
  }  
  //snow
  spot.x = random(0,width);
  snowr = random(5,25);
  speed=2
  fill(255,255,255,100)
  noStroke();
  //for (var y=0; y<= height; y+=4){
  ellipse(spot.x,spot.y,snowr);
  if (spot.y>height-100){
    speed=-2;
  }
  spot.y= spot.y+speed
  //}
  
  //snowman
  ellipseMode(CENTER);
  noStroke();
  fill(245);
  //body
  ellipse(mouseX,height-150,bodyr);
  //head
  fill(250);
  noStroke();
  ellipse(mouseX,height-230,headr);
  //eyes
  fill(0);
  ellipse(mouseX-20,height-235,10);
  ellipse(mouseX+16,height-233,12);
  //nose
  //noStroke();
  fill(239,165,78);
  //beginShape(POINTS);
  //vertex(mouseX-10,height-240);
  //vertex(mouseX+5,height-245);
  //vertex(mouseX-5,height-275);
  //endShape
  triangle(mouseX-10,height-225,mouseX+5,height-218,mouseX-25,height-180);
  //hands
  stroke(70,56,40);
  strokeWeight(sw);
  line(mouseX-bodyr/1.2,height-150,mouseX-bodyr/3.2,height-190); 
  line(mouseX+bodyr/1.2,height-150,mouseX+bodyr/3.2,height-190);  
 


  
  
  //ground
  rectMode(CORNER);
  fill(240);
  noStroke();
  rect(0,height-100,width,100);
  
}let snow=[];
let col={
  r:0,
  g:0,
  b:0
};
let sw=5;
let bodyr=125;
let headr=75;
let spot={
  x:0,
  y:0
};

function setup() { 
  createCanvas(500, 700);
  for( let i=0;i<150;i++){
    snow[i]=new Snow();
  }
} 

function draw() {
  backgroundSky();
  
  for( let i=0;i<snow.length;i++){
    snow[i].fall();
    snow[i].display();
  
  }  
  sun();
  snowman();
  ground();
}














function backgroundSky(){
  r=map(mouseX,0,500,184,81);
  g=map(mouseX,0,500,208,97);
  b=map(mouseX,0,500,218,129);
  background(r,g,b);
}
  
function sun(){
  if(mouseIsPressed){
    noStroke();
    fill(255,245,180);
    ellipse(mouseX-100, mouseY,100);
  }  
}
  
function snowman(){
  ellipseMode(CENTER);
  noStroke();
  fill(245);
  //body
  ellipse(mouseX,height-150,bodyr);
  //head
  fill(250);
  noStroke();
  ellipse(mouseX,height-230,headr);
  //eyes
  fill(0);
  ellipse(mouseX-20,height-235,10);
  ellipse(mouseX+16,height-233,12);
  //nose
  //noStroke();
  fill(239,165,78);
  //beginShape(POINTS);
  //vertex(mouseX-10,height-240);
  //vertex(mouseX+5,height-245);
  //vertex(mouseX-5,height-275);
  //endShape
  triangle(mouseX-10,height-225,mouseX+5,height-218,mouseX-25,height-180);
  //hands
  stroke(70,56,40);
  strokeWeight(sw);
  line(mouseX-bodyr/1.2,height-150,mouseX-bodyr/3.2,height-190); 
  line(mouseX+bodyr/1.2,height-150,mouseX+bodyr/3.2,height-190);  
}


  
  
function ground(){
  rectMode(CORNER);
  fill(240);
  noStroke();
  rect(0,height-100,width,100);
}function setup() { 


  createCanvas(windowWidth, windowHeight);
  var x=width/2
} 

function draw() { 
  //background(220);
  let speed=dist(mouseX,mouseY,pmouseX,pmouseY);
  let sw=map(speed,0,500,0,50);

  strokeWeight(sw);
  stroke(0,50);
  line(mouseX,mouseY,pmouseX,pmouseY);
  
}

function mousePressed(){
  background(255);
}function setup() { 
  createCanvas(400, 400);
  let z=8;
  z=9;
  if (width > 200) {
    z=5;
    z=6;
  }
console.log(z);
} 



  
function draw() { 
  background(220);
}

function setup() { 
  createCanvas(400, 400);
  print(width,height);
} 

function draw() { 
  background(220);
  fill(100);
  line(width/4,height/4,width*3/4, height/4);
  line(width/4,height/4,width/4, height*3/4);
  line(width/4,height*3/4,width*3/4, height*3/4);
  line(width*3/4,height/4,width*3/4, height*3/4);
} //var rect={
  // x:200,
   //y:200,
   //d:200
// };

function setup() { 
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  //console.log(width, height)
  print(width,height);
} ;

function draw() { 
  background(100);
  fill(50);
  noStroke();
  rect(width/2,height/2,width/2,height/2);
}function setup() { 
  createCanvas(700, 500);
} 

function draw() { 
  background(109,252,255);
  ellipseMode(CENTER);
  rectMode(CENTER);
  
  //line
  stroke(237,48,19);
  strokeWeight(35)
  line(0,0,700,500)
  
  //ellipse
  noStroke();
  fill(87,197,46);
  ellipse(350,250,350,250);
  
  //rectangle
  noStroke();
  fill(0,0,125);
  rect(510,240,30,30)
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  //R=0
	fill(0, 255, 255);
	ellipse(200, 200, 100, 100);
}function setup() { 
  //createCanvas should go right after setup()
  createCanvas(500.500);
} 

function draw() { 
  background(100);
}function setup() { 
  createCanvas(750, 375);
} 

function draw() { 
  background(239,212,224);
  ellipseMode(CENTER);
  rectMode(CENTER);
  
  
  //Tiles
  stroke(242,231,205);
  strokeWeight(2);
  line(25,0,25,375);
  line(50,0,50,375);
  line(75,0,75,375);
  line(100,0,100,375);
  line(125,0,125,375);
  line(150,0,150,375);
  line(175,0,175,375);
  
  line(0,25,750,25);
  line(0,50,750,50);
  line(0,75,750,75);
  line(0,100,750,100);
  line(0,125,750,125);
  line(0,150,750,150);
  line(0,175,750,175);
  line(0,200,750,200);
  line(0,225,750,225);
  line(0,250,750,250);
  
  //table
  fill(200,230,231);
  noStroke();
  ellipse(750,375,1500,1300);
  
  //Shadow
  fill(215,215,215,100);
  noStroke();
  ellipse(775,375,700,725);
  
  //plate
  fill(245);
  noStroke();
  ellipse(750,375,700,650);
  fill(240);
  ellipse(750,375,600,550);
  
  //pizza
  fill(212,161,81);
  noStroke();
  arc(725, 350, 700, 700, 9.6, PI+QUARTER_PI, PIE);
  
  fill(241,215,161);
  noStroke();
  arc(725, 350, 600, 600, 9.6, PI+QUARTER_PI, PIE);
  
  //Salami
  fill(194,102,77);
  noStroke();
  ellipse(525,270,50,50);
  ellipse(660,320,20,20);
  
  
  fill(220,118,91);
  noStroke();
  ellipse(619,290,35,35);
  ellipse(500,200,45,45);

  
  
  
  
  

  
}function setup() { 
  createCanvas(750, 375);
} 

function draw() { 
  background(239,212,224);
  ellipseMode(CENTER);
  rectMode(CENTER);
  
  
  //Tiles
  stroke(242,231,205);
  strokeWeight(2);
  line(25,0,25,375);
  line(50,0,50,375);
  line(75,0,75,375);
  line(100,0,100,375);
  line(125,0,125,375);
  line(150,0,150,375);
  line(175,0,175,375);
  
  line(0,25,750,25);
  line(0,50,750,50);
  line(0,75,750,75);
  line(0,100,750,100);
  line(0,125,750,125);
  line(0,150,750,150);
  line(0,175,750,175);
  line(0,200,750,200);
  line(0,225,750,225);
  line(0,250,750,250);
  
  //table
  fill(200,230,231);
  noStroke();
  ellipse(750,375,1500,1300);
  
  //Shadow
  fill(215,215,215,100);
  noStroke();
  ellipse(775,375,700,725);
  
  //plate
  fill(245);
  noStroke();
  ellipse(750,375,700,650);
  fill(240);
  ellipse(750,375,600,550);
  
  //pizza
  fill(212,161,81);
  noStroke();
  arc(725, 350, 700, 700, 9.6, PI+QUARTER_PI, PIE);
  
  fill(241,215,161);
  noStroke();
  arc(725, 350, 600, 600, 9.6, PI+QUARTER_PI, PIE);
  
  //Salami
  fill(194,102,77);
  noStroke();
  ellipse(525,270,50,50);
  ellipse(660,320,20,20);
  
  
  fill(220,118,91);
  noStroke();
  ellipse(619,290,35,35);
  ellipse(500,200,45,45);

  
  
  
  
  

  
}