var weather;
let r = 0;
let g = 0;
let b = 0;
var input;
let condition;
let time;
function setup() {
  createCanvas(800, 800);
}
function weatherAsk() {
  try{
      var url = api + input.value();
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
  var rtime = Number(realtime[0]);
  timeColor(rtime);
  }catch(err){
  	console.log(err);
  }
}
function timeColor(rtime) {
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
}
function draw() {
  background(0);
  if (weather) {
    var condition = weather.current.condition.code;
  }
  noStroke();
  fill(r,g,b);
  rect(0, 0, 800, 800);
}
function keyPressed() {
  if (keyCode == RETURN) {
    input = select('#city');
    weatherAsk();
    document.getElementById("city").value = "";
  }
  return 0;
}var weather;
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
}
function draw() {
  background(0);
  noFill();
  if (weather) {
    var condition = weather.current.condition.code;
    var time = weather.location.localtime
    textSize(32);
text(condition, 10, 30);
  
    
  }
}
function keyPressed() {
    if(keyCode == RETURN) {
        buttonPressed=true;
    } 
    return 0;
let weather;
var wind;
let conditionText;
let conditionCode;
let time;
var position;
let angle;
function setup() {
  createCanvas(800, 800);
  loadJSON(url, gotWeather);
  
}
function gotWeather(weather) {
  var angle = radians(Number(weather.current.wind_degree));
  var windmag = Number(weather.current.wind_mph);
  time = weather.location.localtime;
  conditionCode = weather.current.condition.code;
  conditionText= weather.current.condition.text;
  var temperatureDiv = createDiv(conditionText);
  var windDiv = createDiv(time);
  
}
function draw() {
  background(200);
   if (weather) {
    fill(255);
    ellipse(100,100, time, time);
    ellipse(300,100, conditionText, conditionText);
      
  }
}
var wind;
var position;
function setup() {
  createCanvas(720, 200);
  loadJSON(url, gotWeather);
  position = createVector(width/2, height/2);
  wind = createVector();
}
function draw() {
  background(200);
  push();
  translate(32, height - 32);
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
  
  var angle = radians(Number(weather.current.wind_degree));
  var windmag = Number(weather.current.wind_mph);
  
  var temperatureDiv = createDiv(floor(weather.current.temp_f) + '&deg;');
  var windDiv = createDiv("WIND " + windmag + " <small>MPH</small>");
  
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
function preload() {
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
let mounts = [];
let mountsImages = [];
let buttons = [];
let buttonImages = [];
let currentDisplayings = [];
let stamps = [];
let stampsImages = [];
let calligraphy = [];
let calImages = [];
let drawMt = false;
let drawMtPerm = false;
let drawSt = false;
let drawStPerm = false;
let drawCa = false;
let drawCaPerm = false;
let imgIdx, range;
let i;
let imgtest;
function preload() {
  buttonimg1 = loadImage('buttons/button1.png');
  buttonimg2 = loadImage('buttons/button2.png');
  buttonimg3 = loadImage('buttons/button3.png');
  buttonimg4 = loadImage('buttons/button4.png');
  buttonimg5 = loadImage('buttons/button5.png');
  
  buttonImages.push(buttonimg1);
  buttonImages.push(buttonimg2);
  buttonImages.push(buttonimg3);
  buttonImages.push(buttonimg4);
  buttonImages.push(buttonimg5);
  mountimg1 = loadImage('images/mount1.png');
  mountimg2 = loadImage('images/mount2.png');
  mountimg3 = loadImage('images/mount3.png');
  mountimg4 = loadImage('images/mount4.png');
  mountimg5 = loadImage('images/mount5.png');
  mountimg6 = loadImage('images/mount6.png');
  mountimg7 = loadImage('images/mount7.png');
  mountimg8 = loadImage('images/mount8.png');
  stampimg1 = loadImage('stamps/stamp1.png');
  stampimg2 = loadImage('stamps/stamp2.png');
  stampimg3 = loadImage('stamps/stamp3.png');
  stampimg4 = loadImage('stamps/stamp4.png');
  stampimg5 = loadImage('stamps/stamp5.png');
  stampimg6 = loadImage('stamps/stamp6.png', loaded2);
  calimg1 = loadImage('calligraphy/calligraphy1.png');
  calimg2 = loadImage('calligraphy/calligraphy2.png', loaded);
  calimg3 = loadImage('calligraphy/calligraphy3.png');
  calimg4 = loadImage('calligraphy/calligraphy4.png');
  mountsImages.push(mountimg1);
  mountsImages.push(mountimg2);
  mountsImages.push(mountimg3);
  mountsImages.push(mountimg4);
  mountsImages.push(mountimg5);
  mountsImages.push(mountimg6);
  mountsImages.push(mountimg7);
  mountsImages.push(mountimg8);
  stampsImages.push(stampimg1);
  stampsImages.push(stampimg2);
  stampsImages.push(stampimg3);
  stampsImages.push(stampimg4);
  stampsImages.push(stampimg5);
  stampsImages.push(stampimg6);
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
  canvas.id("thecanvas");
  imageMode(CENTER);
  for (let i = 0; i < buttonImages.length; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }
}
function draw() {
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);
  buttons[0].display();
  buttons[1].display();
  buttons[2].display();
  buttons[3].display();
  buttons[4].display();
  
  
  for (let i = 0; i < currentDisplayings.length; i++) {
    image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y, currentDisplayings[i].size, currentDisplayings[i].size);
  }
  if (drawMt) drawMount();
  if (drawMtPerm) {
    drawMountFixed();
  }
  if (drawSt) drawStamp();
  if (drawStPerm) {
    drawStampFixed();
  }
  if (drawCa) drawCalli();
  if (drawCaPerm) {
    drawCalliFixed();
  }
}
function drawMount() {
  image(mountsImages[imgIdx], mouseX, mouseY, range, range);
  drawSt = false;
  drawCa = false;
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
}
function drawStamp() {
  image(stampsImages[imgIdx], mouseX, mouseY, range, range);
  drawMt = false;
  drawCa = false;
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
}
function drawCalli() {
  image(calImages[imgIdx], mouseX, mouseY, range, range);
  drawMt = false;
  drawSt = false;
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
}
let currentButtonIndex = null;
function mousePressed() {
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].state == 1) {
      buttons[i].state = 2;
    }
  }
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].isTouch() && i == 0) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 7));
      range = round(random(75, 300));
      currentButtonIndex = buttons[i].getIndex();
    }
    else if (buttons[i].isTouch() && i == 1) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 5));
      range = round(random(20, 40));
      currentButtonIndex = buttons[i].getIndex();
    }
    else if (buttons[i].isTouch() && i == 2) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 3));
      range = round(random(75, 150));
      currentButtonIndex = buttons[i].getIndex();
    }
    
    
    else if (buttons[i].isTouch() && i == 3) {
      currentDisplayings = [];
    }
 
    else if (buttons[i].isTouch() && i == 4) {
      
  
  
  let theCanvas = document.getElementById('thecanvas');
	let dataurl = theCanvas.toDataURL();
	sendCanvas(dataurl);
  
  setTimeout(function(){
  }, 1500);
      
 
    }
    
  }
  if (currentButtonIndex == 0) {
    if (buttons[0].state == 1) {
      drawMt = true;
    }
    if (buttons[0].state == 2) {
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
      buttons[0].state = 0;
    }
  }
  if (currentButtonIndex == 1) {
    if (buttons[1].state == 1) {
      drawSt = true;
    }
    if (buttons[1].state == 2) {
      drawSt = false;
      drawStPerm = true;
      stPosX = mouseX;
      stPosY = mouseY;
      buttons[1].state = 0;
    }
  }
  if (currentButtonIndex == 2) {
    if (buttons[2].state == 1) {
      drawCa = true;
    }
    if (buttons[2].state == 2) {
      drawCa = false;
      drawCaPerm = true;
      caPosX = mouseX;
      caPosY = mouseY;
      buttons[2].state = 0;
    }
  }
  
  
}
function sendCanvas(data){
  
  httpPost(url, 'json',
           {"content": data},
     function (result) {
     });
}
  
  
  
  
  
 
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
  });
let mounts = [];
let mountsImages = [];
let buttons = [];
let buttonImages = [];
let currentDisplayings = [];
let stamps = [];
let stampsImages = [];
let calligraphy = [];
let calImages = [];
let drawMt = false;
let drawMtPerm = false;
let drawSt = false;
let drawStPerm = false;
let drawCa = false;
let drawCaPerm = false;
let imgIdx, range;
let i;
let imgtest;
function preload() {
  buttonimg1 = loadImage('buttons/button1.png');
  buttonimg2 = loadImage('buttons/button2.png');
  buttonimg3 = loadImage('buttons/button3.png');
  buttonimg4 = loadImage('buttons/button4.png');
  buttonimg5 = loadImage('buttons/button5.png');
  
  buttonImages.push(buttonimg1);
  buttonImages.push(buttonimg2);
  buttonImages.push(buttonimg3);
  buttonImages.push(buttonimg4);
  buttonImages.push(buttonimg5);
  mountimg1 = loadImage('images/mount1.png');
  mountimg2 = loadImage('images/mount2.png');
  mountimg3 = loadImage('images/mount3.png');
  mountimg4 = loadImage('images/mount4.png');
  mountimg5 = loadImage('images/mount5.png');
  mountimg6 = loadImage('images/mount6.png');
  mountimg7 = loadImage('images/mount7.png');
  mountimg8 = loadImage('images/mount8.png');
  stampimg1 = loadImage('stamps/stamp1.png');
  stampimg2 = loadImage('stamps/stamp2.png');
  stampimg3 = loadImage('stamps/stamp3.png');
  stampimg4 = loadImage('stamps/stamp4.png');
  stampimg5 = loadImage('stamps/stamp5.png');
  stampimg6 = loadImage('stamps/stamp6.png', loaded2);
  calimg1 = loadImage('calligraphy/calligraphy1.png');
  calimg2 = loadImage('calligraphy/calligraphy2.png', loaded);
  calimg3 = loadImage('calligraphy/calligraphy3.png');
  calimg4 = loadImage('calligraphy/calligraphy4.png');
  mountsImages.push(mountimg1);
  mountsImages.push(mountimg2);
  mountsImages.push(mountimg3);
  mountsImages.push(mountimg4);
  mountsImages.push(mountimg5);
  mountsImages.push(mountimg6);
  mountsImages.push(mountimg7);
  mountsImages.push(mountimg8);
  stampsImages.push(stampimg1);
  stampsImages.push(stampimg2);
  stampsImages.push(stampimg3);
  stampsImages.push(stampimg4);
  stampsImages.push(stampimg5);
  stampsImages.push(stampimg6);
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
  canvas.id("thecanvas");
  imageMode(CENTER);
  for (let i = 0; i < buttonImages.length; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }
}
function draw() {
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);
  buttons[0].display();
  buttons[1].display();
  buttons[2].display();
  buttons[3].display();
  buttons[4].display();
  
  
  for (let i = 0; i < currentDisplayings.length; i++) {
    image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y, currentDisplayings[i].size, currentDisplayings[i].size);
  }
  if (drawMt) drawMount();
  if (drawMtPerm) {
    drawMountFixed();
  }
  if (drawSt) drawStamp();
  if (drawStPerm) {
    drawStampFixed();
  }
  if (drawCa) drawCalli();
  if (drawCaPerm) {
    drawCalliFixed();
  }
}
function drawMount() {
  image(mountsImages[imgIdx], mouseX, mouseY, range, range);
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
}
function drawStamp() {
  image(stampsImages[imgIdx], mouseX, mouseY, range, range);
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
}
function drawCalli() {
  image(calImages[imgIdx], mouseX, mouseY, range, range);
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
}
let currentButtonIndex = null;
function mouseClicked() {
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].state == 1) {
      buttons[i].state = 2;
    }
  }
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].isTouch() && i == 0) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 7));
      range = round(random(75, 300));
      currentButtonIndex = buttons[i].getIndex();
    }
    else if (buttons[i].isTouch() && i == 1) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 5));
      range = round(random(20, 40));
      currentButtonIndex = buttons[i].getIndex();
    }
    else if (buttons[i].isTouch() && i == 2) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 3));
      range = round(random(75, 150));
      currentButtonIndex = buttons[i].getIndex();
    }
    
    
    else if (buttons[i].isTouch() && i == 3) {
      currentDisplayings = [];
    }
 
    else if (buttons[i].isTouch() && i == 4) {
      
  
  
  let theCanvas = document.getElementById('thecanvas');
	let dataurl = theCanvas.toDataURL();
	sendCanvas(dataurl);
  
  setTimeout(function(){
  }, 1500);
      
 
    }
    
  }
  if (currentButtonIndex == 0) {
    if (buttons[0].state == 1) {
      drawMt = true;
    }
    if (buttons[0].state == 2) {
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
      buttons[0].state = 0;
    }
  }
  if (currentButtonIndex == 1) {
    if (buttons[1].state == 1) {
      drawSt = true;
    }
    if (buttons[1].state == 2) {
      drawSt = false;
      drawStPerm = true;
      stPosX = mouseX;
      stPosY = mouseY;
      buttons[1].state = 0;
    }
  }
  if (currentButtonIndex == 2) {
    if (buttons[2].state == 1) {
      drawCa = true;
    }
    if (buttons[2].state == 2) {
      drawCa = false;
      drawCaPerm = true;
      caPosX = mouseX;
      caPosY = mouseY;
      buttons[2].state = 0;
    }
  }
  
  
}
function sendCanvas(data){
  
  httpPost(url, 'json',
           {"content": data},
     function (result) {
     });
}
  
  
  
  
  
 
let mounts = [];
let mountsImages = [];
let buttons = [];
let buttonImages = [];
let currentDisplayings = [];
let stamps = [];
let stampsImages = [];
let calligraphy = [];
let calImages = [];
let drawMt = false;
let drawMtPerm = false;
let drawSt = false;
let drawStPerm = false;
let drawCa = false;
let drawCaPerm = false;
let imgIdx, range;
let i;
let imgtest;
function preload() {
  buttonimg1 = loadImage('buttons/button1.png');
  buttonimg2 = loadImage('buttons/button2.png');
  buttonimg3 = loadImage('buttons/button3.png');
  buttonimg4 = loadImage('buttons/button4.png');
  buttonimg5 = loadImage('buttons/button5.png');
  
  buttonImages.push(buttonimg1);
  buttonImages.push(buttonimg2);
  buttonImages.push(buttonimg3);
  buttonImages.push(buttonimg4);
  buttonImages.push(buttonimg5);
  mountimg1 = loadImage('images/mount1.png');
  mountimg2 = loadImage('images/mount2.png');
  mountimg3 = loadImage('images/mount3.png');
  mountimg4 = loadImage('images/mount4.png');
  mountimg5 = loadImage('images/mount5.png');
  mountimg6 = loadImage('images/mount6.png');
  mountimg7 = loadImage('images/mount7.png');
  mountimg8 = loadImage('images/mount8.png');
  stampimg1 = loadImage('stamps/stamp1.png');
  stampimg2 = loadImage('stamps/stamp2.png');
  stampimg3 = loadImage('stamps/stamp3.png');
  stampimg4 = loadImage('stamps/stamp4.png');
  stampimg5 = loadImage('stamps/stamp5.png');
  stampimg6 = loadImage('stamps/stamp6.png', loaded2);
  calimg1 = loadImage('calligraphy/calligraphy1.png');
  calimg2 = loadImage('calligraphy/calligraphy2.png', loaded);
  calimg3 = loadImage('calligraphy/calligraphy3.png');
  calimg4 = loadImage('calligraphy/calligraphy4.png');
  mountsImages.push(mountimg1);
  mountsImages.push(mountimg2);
  mountsImages.push(mountimg3);
  mountsImages.push(mountimg4);
  mountsImages.push(mountimg5);
  mountsImages.push(mountimg6);
  mountsImages.push(mountimg7);
  mountsImages.push(mountimg8);
  stampsImages.push(stampimg1);
  stampsImages.push(stampimg2);
  stampsImages.push(stampimg3);
  stampsImages.push(stampimg4);
  stampsImages.push(stampimg5);
  stampsImages.push(stampimg6);
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
  for (let i = 0; i < buttonImages.length; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }
}
function draw() {
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);
  buttons[0].display();
  buttons[1].display();
  buttons[2].display();
  buttons[3].display();
  buttons[4].display();
  
  
  for (let i = 0; i < currentDisplayings.length; i++) {
    image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y, currentDisplayings[i].size, currentDisplayings[i].size);
  }
  if (drawMt) drawMount();
  if (drawMtPerm) {
    drawMountFixed();
  }
  if (drawSt) drawStamp();
  if (drawStPerm) {
    drawStampFixed();
  }
  if (drawCa) drawCalli();
  if (drawCaPerm) {
    drawCalliFixed();
  }
}
function drawMount() {
  image(mountsImages[imgIdx], mouseX, mouseY, range, range);
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
}
function drawStamp() {
  image(stampsImages[imgIdx], mouseX, mouseY, range, range);
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
}
function drawCalli() {
  image(calImages[imgIdx], mouseX, mouseY, range, range);
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
}
let currentButtonIndex = null;
function mouseClicked() {
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].state == 1) {
      buttons[i].state = 2;
    }
  }
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].isTouch() && i == 0) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 7));
      range = round(random(75, 300));
      currentButtonIndex = buttons[i].getIndex();
    }
    else if (buttons[i].isTouch() && i == 1) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 5));
      range = round(random(20, 40));
      currentButtonIndex = buttons[i].getIndex();
    }
    else if (buttons[i].isTouch() && i == 2) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 3));
      range = round(random(75, 150));
      currentButtonIndex = buttons[i].getIndex();
    }
    
    
    else if (buttons[i].isTouch() && i == 3) {
      currentDisplayings = [];
    }
 
    else if (buttons[i].isTouch() && i == 4) {
 
    }
    
  }
  if (currentButtonIndex == 0) {
    if (buttons[0].state == 1) {
      drawMt = true;
    }
    if (buttons[0].state == 2) {
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
      buttons[0].state = 0;
    }
  }
  if (currentButtonIndex == 1) {
    if (buttons[1].state == 1) {
      drawSt = true;
    }
    if (buttons[1].state == 2) {
      drawSt = false;
      drawStPerm = true;
      stPosX = mouseX;
      stPosY = mouseY;
      buttons[1].state = 0;
    }
  }
  if (currentButtonIndex == 2) {
    if (buttons[2].state == 1) {
      drawCa = true;
    }
    if (buttons[2].state == 2) {
      drawCa = false;
      drawCaPerm = true;
      caPosX = mouseX;
      caPosY = mouseY;
      buttons[2].state = 0;
    }
  }
  
  
}
function sendCanvas(data){
  
  httpPost(url, 'json',
           {"content": data},
     function (result) {
     });
}
function keyPressed() {
  
  let canvastosend = createCanvas(900, 450);
    canvastosend.id("canvastosend");
  canvastosend.image(canvas,0,0,200,200);
  
  let theCanvas = document.getElementById('canvastosend');
	let dataurl = theCanvas.toDataURL();
  console.log(dataurl);
	sendCanvas(dataurl);
  
  
  
 
}
let mounts = [];
let mountsImages = [];
let buttons = [];
let buttonImages = [];
let currentDisplayings = [];
let stamps = [];
let stampsImages = [];
let calligraphy = [];
let calImages = [];
let drawMt = false;
let drawMtPerm = false;
let drawSt = false;
let drawStPerm = false;
let drawCa = false;
let drawCaPerm = false;
let imgIdx, range;
let i;
let imgtest;
function preload() {
  buttonimg1 = loadImage('buttons/button1.png');
  buttonimg2 = loadImage('buttons/button2.png');
  buttonimg3 = loadImage('buttons/button3.png');
  buttonimg4 = loadImage('buttons/button4.png');
  buttonImages.push(buttonimg1);
  buttonImages.push(buttonimg2);
  buttonImages.push(buttonimg3);
  buttonImages.push(buttonimg4);
  mountimg1 = loadImage('images/mount1.png');
  mountimg2 = loadImage('images/mount2.png');
  mountimg3 = loadImage('images/mount3.png');
  mountimg4 = loadImage('images/mount4.png');
  mountimg5 = loadImage('images/mount5.png');
  mountimg6 = loadImage('images/mount6.png');
  mountimg7 = loadImage('images/mount7.png');
  mountimg8 = loadImage('images/mount8.png');
  stampimg1 = loadImage('stamps/stamp1.png');
  stampimg2 = loadImage('stamps/stamp2.png');
  stampimg3 = loadImage('stamps/stamp3.png');
  stampimg4 = loadImage('stamps/stamp4.png');
  stampimg5 = loadImage('stamps/stamp5.png');
  stampimg6 = loadImage('stamps/stamp6.png', loaded2);
  calimg1 = loadImage('calligraphy/calligraphy1.png');
  calimg2 = loadImage('calligraphy/calligraphy2.png', loaded);
  calimg3 = loadImage('calligraphy/calligraphy3.png');
  calimg4 = loadImage('calligraphy/calligraphy4.png');
  mountsImages.push(mountimg1);
  mountsImages.push(mountimg2);
  mountsImages.push(mountimg3);
  mountsImages.push(mountimg4);
  mountsImages.push(mountimg5);
  mountsImages.push(mountimg6);
  mountsImages.push(mountimg7);
  mountsImages.push(mountimg8);
  stampsImages.push(stampimg1);
  stampsImages.push(stampimg2);
  stampsImages.push(stampimg3);
  stampsImages.push(stampimg4);
  stampsImages.push(stampimg5);
  stampsImages.push(stampimg6);
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
  for (let i = 0; i < buttonImages.length; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }
}
function draw() {
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);
  buttons[0].display();
  buttons[1].display();
  buttons[2].display();
  buttons[3].display();
  
  for (let i = 0; i < currentDisplayings.length; i++) {
    image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y, currentDisplayings[i].size, currentDisplayings[i].size);
  }
  if (drawMt) drawMount();
  if (drawMtPerm) {
    drawMountFixed();
  }
  if (drawSt) drawStamp();
  if (drawStPerm) {
    drawStampFixed();
  }
  if (drawCa) drawCalli();
  if (drawCaPerm) {
    drawCalliFixed();
  }
}
function drawMount() {
  image(mountsImages[imgIdx], mouseX, mouseY, range, range);
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
}
function drawStamp() {
  image(stampsImages[imgIdx], mouseX, mouseY, range, range);
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
}
function drawCalli() {
  image(calImages[imgIdx], mouseX, mouseY, range, range);
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
}
let currentButtonIndex = null;
function mouseClicked() {
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].state == 1) {
      buttons[i].state = 2;
    }
  }
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].isTouch() && i == 0) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 7));
      range = round(random(75, 300));
      currentButtonIndex = buttons[i].getIndex();
    }
    else if (buttons[i].isTouch() && i == 1) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 5));
      range = round(random(20, 40));
      currentButtonIndex = buttons[i].getIndex();
    }
    else if (buttons[i].isTouch() && i == 2) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 3));
      range = round(random(75, 150));
      currentButtonIndex = buttons[i].getIndex();
    }
    
    else if (buttons[i].isTouch() && i == 3) {
      currentDisplayings = [];
    }
  }
  if (currentButtonIndex == 0) {
    if (buttons[0].state == 1) {
      drawMt = true;
    }
    if (buttons[0].state == 2) {
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
      buttons[0].state = 0;
    }
  }
  if (currentButtonIndex == 1) {
    if (buttons[1].state == 1) {
      drawSt = true;
    }
    if (buttons[1].state == 2) {
      drawSt = false;
      drawStPerm = true;
      stPosX = mouseX;
      stPosY = mouseY;
      buttons[1].state = 0;
    }
  }
  if (currentButtonIndex == 2) {
    if (buttons[2].state == 1) {
      drawCa = true;
    }
    if (buttons[2].state == 2) {
      drawCa = false;
      drawCaPerm = true;
      caPosX = mouseX;
      caPosY = mouseY;
      buttons[2].state = 0;
    }
  }
  
}
function sendCanvas(data){
  
  httpPost(url, 'json',
           {"content": data},
     function (result) {
     });
}
function keyPressed() {
  
  let canvastosend = createCanvas(900, 450);
    canvastosend.id("canvastosend");
  canvastosend.image(canvas,0,0,200,200);
  
  let theCanvas = document.getElementById('canvastosend');
	let dataurl = theCanvas.toDataURL();
  console.log(dataurl);
	sendCanvas(dataurl);
  
  
  
 
}
let mounts = [];
let mountsImages = [];
let buttons = [];
let buttonImages = [];
let currentDisplayings = [];
let stamps = [];
let stampsImages = [];
let calligraphy = [];
let calImages = [];
let drawMt = false;
let drawMtPerm = false;
let drawSt = false;
let drawStPerm = false;
let drawCa = false;
let drawCaPerm = false;
let imgIdx, range;
let i;
let imgtest;
function preload() {
  buttonimg1 = loadImage('buttons/button1.png');
  buttonimg2 = loadImage('buttons/button2.png');
  buttonimg3 = loadImage('buttons/button3.png');
  buttonimg4 = loadImage('buttons/button4.png');
  buttonImages.push(buttonimg1);
  buttonImages.push(buttonimg2);
  buttonImages.push(buttonimg3);
  buttonImages.push(buttonimg4);
  mountimg1 = loadImage('images/mount1.png');
  mountimg2 = loadImage('images/mount2.png');
  mountimg3 = loadImage('images/mount3.png');
  mountimg4 = loadImage('images/mount4.png');
  mountimg5 = loadImage('images/mount5.png');
  mountimg6 = loadImage('images/mount6.png');
  mountimg7 = loadImage('images/mount7.png');
  mountimg8 = loadImage('images/mount8.png');
  stampimg1 = loadImage('stamps/stamp1.png');
  stampimg2 = loadImage('stamps/stamp2.png');
  stampimg3 = loadImage('stamps/stamp3.png');
  stampimg4 = loadImage('stamps/stamp4.png');
  stampimg5 = loadImage('stamps/stamp5.png');
  stampimg6 = loadImage('stamps/stamp6.png', loaded2);
  calimg1 = loadImage('calligraphy/calligraphy1.png');
  calimg2 = loadImage('calligraphy/calligraphy2.png', loaded);
  calimg3 = loadImage('calligraphy/calligraphy3.png');
  calimg4 = loadImage('calligraphy/calligraphy4.png');
  mountsImages.push(mountimg1);
  mountsImages.push(mountimg2);
  mountsImages.push(mountimg3);
  mountsImages.push(mountimg4);
  mountsImages.push(mountimg5);
  mountsImages.push(mountimg6);
  mountsImages.push(mountimg7);
  mountsImages.push(mountimg8);
  stampsImages.push(stampimg1);
  stampsImages.push(stampimg2);
  stampsImages.push(stampimg3);
  stampsImages.push(stampimg4);
  stampsImages.push(stampimg5);
  stampsImages.push(stampimg6);
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
  for (let i = 0; i < buttonImages.length; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }
}
function draw() {
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);
  buttons[0].display();
  buttons[1].display();
  buttons[2].display();
  buttons[3].display();
  
  for (let i = 0; i < currentDisplayings.length; i++) {
    image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y, currentDisplayings[i].size, currentDisplayings[i].size);
  }
  if (drawMt) drawMount();
  if (drawMtPerm) {
    drawMountFixed();
  }
  if (drawSt) drawStamp();
  if (drawStPerm) {
    drawStampFixed();
  }
  if (drawCa) drawCalli();
  if (drawCaPerm) {
    drawCalliFixed();
  }
}
function drawMount() {
  image(mountsImages[imgIdx], mouseX, mouseY, range, range);
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
}
function drawStamp() {
  image(stampsImages[imgIdx], mouseX, mouseY, range, range);
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
}
function drawCalli() {
  image(calImages[imgIdx], mouseX, mouseY, range, range);
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
}
let currentButtonIndex = null;
function mouseClicked() {
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].state == 1) {
      buttons[i].state = 2;
    }
  }
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].isTouch() && i == 0) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 7));
      range = round(random(75, 300));
      currentButtonIndex = buttons[i].getIndex();
    }
    else if (buttons[i].isTouch() && i == 1) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 5));
      range = round(random(20, 40));
      currentButtonIndex = buttons[i].getIndex();
    }
    else if (buttons[i].isTouch() && i == 2) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 3));
      range = round(random(75, 150));
      currentButtonIndex = buttons[i].getIndex();
    }
    
    else if (buttons[i].isTouch() && i == 3) {
      currentDisplayings = [];
    }
  }
  if (currentButtonIndex == 0) {
    if (buttons[0].state == 1) {
      drawMt = true;
    }
    if (buttons[0].state == 2) {
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
      buttons[0].state = 0;
    }
  }
  if (currentButtonIndex == 1) {
    if (buttons[1].state == 1) {
      drawSt = true;
    }
    if (buttons[1].state == 2) {
      drawSt = false;
      drawStPerm = true;
      stPosX = mouseX;
      stPosY = mouseY;
      buttons[1].state = 0;
    }
  }
  if (currentButtonIndex == 2) {
    if (buttons[2].state == 1) {
      drawCa = true;
    }
    if (buttons[2].state == 2) {
      drawCa = false;
      drawCaPerm = true;
      caPosX = mouseX;
      caPosY = mouseY;
      buttons[2].state = 0;
    }
  }
  
}
function sendCanvas(data){
  
  httpPost(url, 'json',
           {"content": data},
     function (result) {
     });
}
function keyPressed() {
  
  var canvastosend = createCanvas(900, 450);
    canvastosend.id("canvastosend");
  canvastosend.image(canvas);
  
  var theCanvas = document.getElementById('canvastosend');
	let dataurl = theCanvas.toDataURL();
  console.log(dataurl);
	sendCanvas(dataurl);
  
  
  
 
}
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
  
  httpPost(url, 'json',
           {"content": data},
     function (result) {
     });
}
function mousePressed() {
  var theCanvas = document.getElementById('canvas');
	let dataurl = theCanvas.toDataURL();
  console.log(dataurl);
	sendCanvas(dataurl)
 
}
let mounts = [];
let mountsImages = [];
let buttons = [];
let buttonImages = [];
let currentDisplayings = [];
let stamps = [];
let stampsImages = [];
let calligraphy = [];
let calImages = [];
let drawMt = false;
let drawMtPerm = false;
let drawSt = false;
let drawStPerm = false;
let drawCa = false;
let drawCaPerm = false;
let imgIdx, range;
let i;
let imgtest;
function preload() {
  buttonimg1 = loadImage('buttons/button1.png');
  buttonimg2 = loadImage('buttons/button2.png');
  buttonimg3 = loadImage('buttons/button3.png');
  buttonimg4 = loadImage('buttons/button4.png');
  buttonImages.push(buttonimg1);
  buttonImages.push(buttonimg2);
  buttonImages.push(buttonimg3);
  buttonImages.push(buttonimg4);
  mountimg1 = loadImage('images/mount1.png');
  mountimg2 = loadImage('images/mount2.png');
  mountimg3 = loadImage('images/mount3.png');
  mountimg4 = loadImage('images/mount4.png');
  mountimg5 = loadImage('images/mount5.png');
  mountimg6 = loadImage('images/mount6.png');
  mountimg7 = loadImage('images/mount7.png');
  mountimg8 = loadImage('images/mount8.png');
  stampimg1 = loadImage('stamps/stamp1.png');
  stampimg2 = loadImage('stamps/stamp2.png');
  stampimg3 = loadImage('stamps/stamp3.png');
  stampimg4 = loadImage('stamps/stamp4.png');
  stampimg5 = loadImage('stamps/stamp5.png');
  stampimg6 = loadImage('stamps/stamp6.png', loaded2);
  calimg1 = loadImage('calligraphy/calligraphy1.png');
  calimg2 = loadImage('calligraphy/calligraphy2.png', loaded);
  calimg3 = loadImage('calligraphy/calligraphy3.png');
  calimg4 = loadImage('calligraphy/calligraphy4.png');
  mountsImages.push(mountimg1);
  mountsImages.push(mountimg2);
  mountsImages.push(mountimg3);
  mountsImages.push(mountimg4);
  mountsImages.push(mountimg5);
  mountsImages.push(mountimg6);
  mountsImages.push(mountimg7);
  mountsImages.push(mountimg8);
  stampsImages.push(stampimg1);
  stampsImages.push(stampimg2);
  stampsImages.push(stampimg3);
  stampsImages.push(stampimg4);
  stampsImages.push(stampimg5);
  stampsImages.push(stampimg6);
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
  for (let i = 0; i < buttonImages.length; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }
}
function draw() {
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);
  buttons[0].display();
  buttons[1].display();
  buttons[2].display();
  buttons[3].display();
  
  for (let i = 0; i < currentDisplayings.length; i++) {
    image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y, currentDisplayings[i].size, currentDisplayings[i].size);
  }
  if (drawMt) drawMount();
  if (drawMtPerm) {
    drawMountFixed();
  }
  if (drawSt) drawStamp();
  if (drawStPerm) {
    drawStampFixed();
  }
  if (drawCa) drawCalli();
  if (drawCaPerm) {
    drawCalliFixed();
  }
}
function drawMount() {
  image(mountsImages[imgIdx], mouseX, mouseY, range, range);
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
}
function drawStamp() {
  image(stampsImages[imgIdx], mouseX, mouseY, range, range);
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
}
function drawCalli() {
  image(calImages[imgIdx], mouseX, mouseY, range, range);
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
}
let currentButtonIndex = null;
function mouseClicked() {
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].state == 1) {
      buttons[i].state = 2;
    }
  }
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].isTouch() && i == 0) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 7));
      range = round(random(75, 300));
      currentButtonIndex = buttons[i].getIndex();
    }
    else if (buttons[i].isTouch() && i == 1) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 5));
      range = round(random(20, 40));
      currentButtonIndex = buttons[i].getIndex();
    }
    else if (buttons[i].isTouch() && i == 2) {
      buttons[i].state = 1;
      imgIdx = round(random(0, 3));
      range = round(random(75, 150));
      currentButtonIndex = buttons[i].getIndex();
    }
    
    else if (buttons[i].isTouch() && i == 3) {
      currentDisplayings = [];
    }
  }
  if (currentButtonIndex == 0) {
    if (buttons[0].state == 1) {
      drawMt = true;
    }
    if (buttons[0].state == 2) {
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
      buttons[0].state = 0;
    }
  }
  if (currentButtonIndex == 1) {
    if (buttons[1].state == 1) {
      drawSt = true;
    }
    if (buttons[1].state == 2) {
      drawSt = false;
      drawStPerm = true;
      stPosX = mouseX;
      stPosY = mouseY;
      buttons[1].state = 0;
    }
  }
  if (currentButtonIndex == 2) {
    if (buttons[2].state == 1) {
      drawCa = true;
    }
    if (buttons[2].state == 2) {
      drawCa = false;
      drawCaPerm = true;
      caPosX = mouseX;
      caPosY = mouseY;
      buttons[2].state = 0;
    }
  }
  
}
function sendCanvas(data){
  
  httpPost(url, 'json',
           {"content": data},
     function (result) {
     });
}
function keyPressed() {
  var theCanvas = document.getElementById('canvas');
	let dataurl = theCanvas.toDataURL();
  console.log(dataurl);
	sendCanvas(dataurl)
 
}
let mounts = [];
let mountsImages = [];
let buttons = [];
let buttonImages = [];
let currentDisplayings = [];
let stamps = [];
let birds = [];
let drawMt = false;
let drawMtPerm = false;
let imgIdx, range;
let i;
let imgtest;
function preload() {
  buttonimg1 = loadImage('buttons/button1.png');
  buttonimg2 = loadImage('buttons/button2.png');
  buttonimg3 = loadImage('buttons/button3.png');
  buttonImages.push(buttonimg1);
  buttonImages.push(buttonimg2);
  buttonImages.push(buttonimg3);
  mountimg1 = loadImage('images/mount1.png', loaded);
  mountimg2 = loadImage('images/mount2.png', loaded2);
  mountimg3 = loadImage('images/mount3.png');
  mountimg4 = loadImage('images/mount4.png');
  mountimg5 = loadImage('images/mount5.png');
  mountimg6 = loadImage('images/mount6.png');
  mountimg7 = loadImage('images/mount7.png');
  mountimg8 = loadImage('images/mount8.png');
  mountsImages.push(mountimg1);
  mountsImages.push(mountimg2);
  mountsImages.push(mountimg3);
  mountsImages.push(mountimg4);
  mountsImages.push(mountimg5);
  mountsImages.push(mountimg6);
  mountsImages.push(mountimg7);
  mountsImages.push(mountimg8);
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
  for (let i = 0; i < buttonImages.length; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }
}
function draw() {
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);
  buttons[0].display();
  buttons[1].display();
  buttons[2].display();
    for (let i = 0; i < currentDisplayings.length; i++) {
      image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y, currentDisplayings[i].size, currentDisplayings[i].size);
    }
    if (drawMt) drawMount();
    if (drawMtPerm) {
      drawMountFixed();
    }
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
}
let currentButtonIndex = null;
function mouseClicked() {
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
  if (currentButtonIndex == 0) {
    if (buttons[0].state == 1) {
      drawMt = true;
    }
    if (buttons[0].state == 2) {
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
      buttons[0].state = 0;
    }
  }
}
let mounts = [];
let mountsImages = [];
let buttons = [];
let buttonImages = [];
let currentDisplayings = [];
let stamps = [];
let birds = [];
let drawMt = false;
let drawMtPerm = false;
let imgIdx, range;
let i;
let imgtest;
function preload() {
  buttonimg1 = loadImage('buttons/button1.png');
  buttonimg2 = loadImage('buttons/button2.png');
  buttonimg3 = loadImage('buttons/button3.png');
  
  buttonImages.push(buttonimg1);
  buttonImages.push(buttonimg2);
  buttonImages.push(buttonimg3);
  
  mountimg1 = loadImage('images/mount1.png', loaded);
 mountimg2 = loadImage('images/mount2.png', loaded2);
  mountimg3 = loadImage('images/mount3.png');
  mountimg4 = loadImage('images/mount4.png');
  mountimg5 = loadImage('images/mount5.png');
  mountimg6 = loadImage('images/mount6.png');
  mountimg7 = loadImage('images/mount7.png');
  mountimg8 = loadImage('images/mount8.png');
  
  
  mountsImages.push(mountimg1);
  mountsImages.push(mountimg2);
  mountsImages.push(mountimg3);
  mountsImages.push(mountimg4);
  mountsImages.push(mountimg5);
  mountsImages.push(mountimg6);
  mountsImages.push(mountimg7);
  mountsImages.push(mountimg8);
  
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
  for (let i = 0; i < buttonImages.length; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }
}
function draw() {
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);
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
}
let currentButtonIndex = null;
function mouseClicked() {
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
  if (currentButtonIndex == 0) {
    if (buttons[0].state == 1) {
      drawMt = true;
    }
    if (buttons[0].state == 2) {
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
      buttons[0].state = 0;
    }
  }
}
let mounts = [];
let mountsImages = [];
let buttons = [];
let buttonImages = [];
let currentDisplayings = [];
let stamps = [];
let birds = [];
let drawMt = false;
let drawMtPerm = false;
let imgIdx, range;
let i;
let imgtest;
function preload() {
  buttonimg1 = loadImage('buttons/button1.png');
  buttonimg2 = loadImage('buttons/button2.png');
  buttonimg3 = loadImage('buttons/button3.png');
  buttonImages.push(buttonimg1);
  buttonImages.push(buttonimg2);
  buttonImages.push(buttonimg3);
  mountimg1 = loadImage('images/mount1.png', loaded);
  mountimg2 = loadImage('images/mount2.png', loaded2);
  mountimg3 = loadImage('images/mount3.png');
  mountimg4 = loadImage('images/mount4.png');
  mountimg5 = loadImage('images/mount5.png');
  mountimg6 = loadImage('images/mount6.png');
  mountimg7 = loadImage('images/mount7.png');
  mountimg8 = loadImage('images/mount8.png');
  mountsImages.push(mountimg1);
  mountsImages.push(mountimg2);
  mountsImages.push(mountimg3);
  mountsImages.push(mountimg4);
  mountsImages.push(mountimg5);
  mountsImages.push(mountimg6);
  mountsImages.push(mountimg7);
  mountsImages.push(mountimg8);
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
  for (let i = 0; i < buttonImages.length; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }
}
function draw() {
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);
  buttons[0].display();
  buttons[1].display();
  buttons[2].display();
    for (let i = 0; i < currentDisplayings.length; i++) {
      image(currentDisplayings[i].img, currentDisplayings[i].x, currentDisplayings[i].y, currentDisplayings[i].size, currentDisplayings[i].size);
    }
    if (drawMt) drawMount();
    if (drawMtPerm) {
      drawMountFixed(index);
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
}
let currentButtonIndex = null;
function mouseClicked() {
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
  if (currentButtonIndex == 0) {
    if (buttons[0].state == 1) {
      drawMt = true;
    }
    if (buttons[0].state == 2) {
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
      buttons[0].state = 0;
    }
  }
}
let img_leaf = [];
let trees = [];
let leaves = [];
function setup() { 
  createCanvas(600, 600);
  
  
  
  
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
  
  trees.push(new Tree(img_tree[0], 0, 0, 400, 166));
  trees.push(new Tree(img_tree[1], 210, 50, 400, 179));
  background(255);
  
} 
function draw() { 
  
  trees[0].display();
  trees[1].display();
  
  
  if(leaves.length > 0) {
  	for(let i=0; i<leaves.length; i++) {
      
  	}
  }
  
  for(let i=0; i<leaves.length; i++) {
    for(let j=i+1; j<leaves.length; j++) {
    }
  }
  
  console.log(leaves.length);
}
function mousePressed() {
  
  let imgIdx, range;
  
  if(trees[0].isTouch() || trees[1].isTouch()) {		
    imgIdx = round(random(0, 10));
    range = round(random(30, 70));
    leaves.push(new Leaf(img_leaf[imgIdx], mouseX, mouseY, range));
  }
}
  
function setSky() {
  
  let h, s;
  
  noStroke();
  push();
  colorMode(HSB);
  
  for(let i=0; i<height; i++) {
    h = map(i, 0, height-1, 50, 10);
    s = map(i, 0, height-1, 20, 80);
    fill(h,s,100);
    rect(0, i, width, 1);
  }
  pop();
}
let mounts = [];
let mountsImages = [];
let buttons = [];
let buttonImages = [];
let stamps = [];
let birds = [];
let drawMt = false;
let drawMtPerm = false;
let imgIdx, range;
let i;
let imgtest;
function preload() {
  img1 = loadImage('buttons/button1.png');
  img2 = loadImage('images/mount1.png');
  buttonImages.push(img1);
  mountsImages.push(img2);
}
function setup() {
  createCanvas(900, 450);
  imageMode(CENTER);
  for (let i = 0; i < 1; i++) {
    let newButton = new Button(buttonImages[i], 75 + 150 * i, 385, 90, 90, i)
    buttons.push(newButton);
  }
}
function draw() {
  background(220);
  noStroke();
  fill(203, 171, 130);
  rect(0, 25, width, 300);
  buttons[0].display();
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
  let currentButtonIndex = null;
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].isTouch()) {
      currentButtonIndex = buttons[i].getIndex();
    }
  }
  if (currentButtonIndex == 0) {
    range = round(random(75, 300));
    if (drawMt && mountainPicked==false) {
      mountainPicked = true;
      drawMt = false;
      drawMtPerm = true;
      mtPosX = mouseX;
      mtPosY = mouseY;
    }
    if (!drawMt && mountainPicked) {
      drawMt = true;
    }
  }
}
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
      
    }
  }
var Humi;
var Pulse;
let pulse1;
let humi1;
let pulse2;
let humi2;
let beat1;
let beat2;
let pic1, pic2;
let rain = [];
let myFont;
function preload() {
  heart = loadImage('heart.png');
  myFont = loadFont('Barkentina 1.otf');
}
function setup() {
  createCanvas(1000, 600);
  
  
  textFont(myFont);
  textSize(36);
  for (let i = 0; i < 150; i++) {
    rain.push(new Rain(heart));
  }
  }
  function draw() {
    background(255);
    imageMode(CENTER);
    
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
    pic2 = image(heart, width * 3 / 4, height / 2, humi2, humi2);
  }
    for (var i = 0; i < portList.length; i++) {
    }
  }
  function serverConnected() {
  }
  function portOpen() {
  }
  }
  function portClose() {
  }
    if (inString.length > 0) {
        humi1 = map(sensors[0], 40, 100, 0, width / 2);
        humi2 = map(sensors[1], 10, 50, 0, width / 2);
       
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
var Humi;
var Pulse;
let pulse1;
let humi1;
let pulse2;
let humi2;
let beat1;
let beat2;
let pic1, pic2;
let rain = [];
function preload() {
  heart = loadImage('heart.png');
}
function setup() {
  createCanvas(1000, 600);
  for (let i = 0; i < 150; i++) {
    rain.push(new Rain(heart));
  }
  }
  function draw() {
    background(255);
    imageMode(CENTER);
    
    if (humi1 > width / 4 ) {
      for (let i = 0; i < rain.length; i++) {
        rain[i].fall();
        rain[i].display();
      }
      
    }
  	scale(random(0.99, 1));
    pic1 = image(heart, width / 4, height / 2, humi1, humi1);
    pic2 = image(heart, width * 3 / 4, height / 2, humi2, humi2);
  }
    for (var i = 0; i < portList.length; i++) {
    }
  }
  function serverConnected() {
  }
  function portOpen() {
  }
  }
  function portClose() {
  }
    if (inString.length > 0) {
        humi1 = map(sensors[1], 40, 100, 0, width / 2);
        humi2 = map(sensors[3], 40, 100, 0, width / 2);
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
var Humi;
var Pulse;
let pulse1;
let humi1;
let pulse2;
let humi2;
let beat1;
let beat2;
let pic1, pic2;
function preload() {
  heart = loadImage('heart.png');
}
function setup() {
  createCanvas(1000, 600);
  }
  function draw() {
    background(255);
    imageMode(CENTER);
    pic1 = image(heart, width / 4, height / 2, humi1, humi1);
    pic2 = image(heart, width * 3 / 4, height / 2, humi2, humi2);
  }
    for (var i = 0; i < portList.length; i++) {
    }
  }
  function serverConnected() {
  }
  function portOpen() {
  }
  }
  function portClose() {
  }
    if (inString.length > 0) {
        humi1 = map(sensors[1], 40, 100, 0, width / 2);
        humi2 = map(sensors[3], 40, 100, 0, width / 2);
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
var options = {
  lat: 0,
  lng: 0,
  zoom: 4,
}
function setup(){
  canvas = createCanvas(640,640);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas)
  meteorites = loadTable('Meteorite_Landings.csv', 'csv', 'header');
  myMap.onChange(drawMeteorites);
  fill(70, 203,31);
  stroke(100);
}
function draw(){
}
function drawMeteorites() {
  clear();
  for (var i = 0; i < meteorites.getRowCount(); i++) {
    var latitude = Number(meteorites.getString(i, 'reclat'));
    var longitude = Number(meteorites.getString(i, 'reclong'));
    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      var pos = myMap.latLngToPixel(latitude, longitude);
      var size = meteorites.getString(i, 'mass (g)');
      size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
      ellipse(pos.x, pos.y, size, size);
    }
  }
Questions:
1.Follow the exact steps of Dan's video but can not successfully load the map below:
but if I devide the url into two parts it can be loaded perfectly
#. This editor is super easy to be crushed.
let token= 'pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA';
let mapimg;
let clat=0;
let clon=0;
let lat=40.7128;
let lon=-74.0060;
let meteo;
let zoom=1;
function preload() {
  mapimg = loadImage(api+ token);
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
  
  
  
Questions:
1.Follow the exact steps of Dan's video but can not successfully load the map below:
but if I devide the url into two parts it can be loaded perfectly
#. This editor is super easy to be crushed.
let token= 'pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA';
let mapimg;
let clat=0;
let clon=0;
let lat=40.7128;
let lon=-74.0060;
let meteo;
let zoom=1;
function preload() {
  mapimg = loadImage(api+ token);
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
  
  
  
Questions:
1.Follow the exact steps of Dan's video but can not successfully load the map below:
but if I devide the url into two parts it can be loaded perfectly
#. This editor is super easy to be crushed.
let token= 'pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA';
let mapimg;
let clat=0;
let clon=0;
let lat=40.7128;
let lon=-74.0060;
let meteo;
let zoom=1;
function preload() {
  mapimg = loadImage(api+ token);
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
  
  
  
Questions:
1.Follow the exact steps of Dan's video but can not successfully load the map below:
but if I devide the url into two parts it can be loaded perfectly
#. This editor is super easy to be crushed.
let token= 'pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA';
let mapimg;
let clat=0;
let clon=0;
let lat=40.7128;
let lon=-74.0060;
let meteo;
let zoom=1;
function preload() {
  mapimg = loadImage(api+ token);
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
  
  
  
Questions:
1.Follow the exact steps of Dan's video but can not successfully load the map below:
but if I devide the url into two parts it can be loaded perfectly
2. Follow the exact steps of video but cannot put the ellipse on te correct position
let token= 'pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA';
let mapimg;
let clat=0;
let clon=0;
let lat=40.7128;
let lon=-74.0060;
let zoom=1
function preload() {
  mapimg = loadImage(api+ token);
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
  
  
  
1.Follow the exact steps of Dan's video but can not successfully load the map below:
but if I devide the url into two parts it can be loaded perfectly
let token= 'pk.eyJ1IjoiaHlzdGVyaWFuYSIsImEiOiJjajk0eDE4dmc0YmpqMzFtYmhjeGkwdjVyIn0.FoEMa3PDmjthhj97BMNqyA';
let mapimg;
let clat=0;
let clon=0;
let lat=40.7128° N, 74.0060° W;
let lon=0;
function preload() {
  mapimg = loadImage(api+ token);
}
function setup() {
  createCanvas(1024, 512);
  
}
function draw() {
  background(220);
image(mapimg, 0, 0);
  
let mapimg;
function preload() {
}
function setup() {
  createCanvas(600, 600);
  image(mapimg, 0, 0);
}
function draw() {
  background(220);
let pulse1;
let humi1;
let pulse2;
let humi2;
let beat1;
let beat2;
let heart1;
function preload(){
  heart1=loadImage('heart.png');
}
function setup() { 
  createCanvas(400, 400);
  
 
} 
function draw() { 
}
 for (var i = 0; i < portList.length; i++) {
 }
}
 
function serverConnected() {
}
 
function portOpen() {
}
 
}
 
function portClose() {
}
 
  if (inString.length > 0 ) {
    }
  }
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function serverConnected() {
}
function gotList(thelist) {
  for (var i = 0; i < thelist.length; i++) {
  }
}
function gotOpen() {
}
function gotError(theerror) {
}
function gotData() {
}
function gotRawData(thedata) {
}
function draw() {
  background(255,255,255);
  fill(0,0,0);
  var mappedVar = map(latestData, 0,540,0,width);
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
let drag = false;
let offset;
let b;
let c;
let d;
let wh;
let bx;
function setup() {
  createCanvas(550, 500);
  x = (width - 50) / 3;
  xspeed = random(5);
  y = height / 3;
  yspeed = random(8);
  radium = 30;
  rectwidth = 100;
  rectheight = 10;
  
 
}
function draw() {
  background(250);
  noStroke();
  
  
  rect(0, 0, width , wh);
  
  if (a == true) {
    bounce(0, width , wh, height);
    y += yspeed;
    x += xspeed;
    ellipse(x, y, radium, radium);
  }
  if (a == false) {
    words(t);
  }
  rect(bx - rectwidth / 2, height - rectheight, rectwidth, rectheight)
}
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
    } else {
      y = wh;
      a = false;
    }
  }
}
function mousePressed() {
   a = !a;
  fill(random(250), 0, random(250));
  if (mouseX > b && mouseX < b + d && mouseY > c && mouseY < c + d) {
    drag = true;
    offset = y - mouseY;
  }
}
function mouseReleased() {
  drag = false;
}
function words(t) {
  fill(0);
  textSize(30);
  text(t, width /3, height / 3);
}
function slider() {
  if (drag) {
    c = mouseY + offset;
  }
  c = constrain(c, height / 3, height * 2 / 3);
  
  rect(width - 50, 0, 50, height);
  stroke(255);
  line(width - 25, height / 3, width - 25, height * 2 / 3);
  rect(b, c, d, d);
}
 for (var i = 0; i < portList.length; i++) {
 }
}
 
function serverConnected() {
}
 
function portOpen() {
}
 
}
 
function portClose() {
}
 
  if (inString.length > 0 ) {
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
let wh;
let bx;
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
  
 
}
function draw() {
  background(250);
  noStroke();
  
  rect(0, 0, width , wh);
  if (a == true) {
    bounce(0, width - 50, wh, height);
    y += yspeed;
    x += xspeed;
    ellipse(x, y, radium, radium);
  }
  if (a == false) {
    words(t);
  }
  rect(bx - rectwidth / 2, height - rectheight, rectwidth, rectheight)
}
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
    } else {
      y = wh;
      a = false;
    }
  }
}
function mousePressed() {
  a = !a;
  fill(random(250), 0, random(250));
  if (mouseX > b && mouseX < b + d && mouseY > c && mouseY < c + d) {
    drag = true;
    offset = y - mouseY;
  }
}
function mouseReleased() {
  drag = false;
}
function words(t) {
  fill(0);
  textSize(30);
  text(t, width /3, height / 3);
}
 for (var i = 0; i < portList.length; i++) {
 }
}
 
function serverConnected() {
}
 
function portOpen() {
}
 
}
 
function portClose() {
}
 
  if (inString.length > 0 ) {
    }
  }
function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
  
} 
function draw() { 
  background(127, 0, 127);
  
  var v = map(latestData,0,1023,50,500); 
  var origV = v;
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
function gotData() {
}
#
let x;
let xspeed;
let y;
let yspeed;
let d;
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
  ellipse(x,y,slider1.value());
}
function changeBallColor(){
  bcolor=color(random(100,255),0,random(255));
}
function changeBgColor(){
  bgcolor=color(0,random(255),random(255));
}
let x;
let xspeed;
let y;
let yspeed;
let d;
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
}
function draw() {
  background(0);
  noStroke();
  if (nums.length > 50) nums.shift();
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
 
  
  
  
  bounce(0,width,0,height);
  display(x,y,d);
  move();
  noStroke();
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
  
  
let x;
let xspeed;
let y;
let yspeed;
let radium;
let rectwidth;
let rectheight;
let a = false;
let t = "click to start";
let drag = false;
let offset;
let b;
let c;
let d;
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
  slider();
  wh = map(c, height / 3, height * 2 / 3, 0, height * 3 / 4);
  if (a == true) {
    bounce(0, width - 50, wh, height);
    y += yspeed;
    x += xspeed;
    ellipse(x, y, radium, radium);
  }
  if (a == false) {
    words(t);
  }
  rect(mouseX - rectwidth / 2, height - rectheight, rectwidth, rectheight)
}
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
    } else {
      y = wh;
      a = false;
    }
  }
}
function mousePressed() {
  a = !a;
  fill(random(250), 0, random(250));
  if (mouseX > b && mouseX < b + d && mouseY > c && mouseY < c + d) {
    drag = true;
    offset = y - mouseY;
  }
}
function mouseReleased() {
  drag = false;
}
function words(t) {
  fill(0);
  textSize(30);
  text(t, width * 2 / 7, height / 3);
}
function slider() {
  if (drag) {
    c = mouseY + offset;
  }
  c = constrain(c, height / 3, height * 2 / 3);
  rect(0, 0, width - 50, wh);
  rect(width - 50, 0, 50, height);
  stroke(255);
  line(width - 25, height / 3, width - 25, height * 2 / 3);
  rect(b, c, d, d);
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
}let x;
let xspeed;
let y;
let yspeed;
let radium;
let rectwidth;
let rectheight;
let a = false;
let t="click to start";
let drag=false;
let b=width-25;
let c=height/3;
let d=15;
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
    } else {
      y = random(height / 3)
      a = false;
    }
  }
}
function mousePressed() {
  a = !a;
  fill(random(250), 0, random(250));
}
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
function bounce(w1,w2,h1,h2){  
  if(x<w1 || x>w2){
  xspeed*=-1;
}
  if(y<h1){
  yspeed*=-1;}
 
 if(y>h2-rectheight){
  if(abs(mouseX-x)<rectwidth/2){
  yspeed*=-1
  else{
   y=random(height/3)
  a= false;
    textSize(30);
    text("
  }
   
 }
  
}
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
 
  
  
  
  bounce(0,width,0,height);
  noStroke();
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
   
  
} 
function draw() { 
  background(220);
 
  
  
  xspeed= bounce(x,xspeed,0,width);
    yspeed= bounce(y,yspeed, 0, height);
  
  y+=yspeed;
  x+=xspeed;
  noStroke();
  ellipse(x,y,50,50);
  
  
  
  
}
function bounce(loc,speed,bottom,top){
  
  if(loc< bottom || loc> top){
  speed*=-1;
  
}
  return speed;
  
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
      
    }
offset++;
  } else {
    background(0);
    fill(255);
    noStroke();
    rect(x, y, d, d);
    
    offset=0;
  }
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
function setup() { 
  createCanvas600, 400);
} 
function draw() { 
  background(220);
  fill(255,0,0);
    noStroke();
  
  isOn=true;
  if (isOn){
  
  if (mouseX < width/3) red1=true;
  
  {
    
    rect(0, 0, width/3, height);
  }
  else if (width/3 < mouseX && mouseX < width*2/3) {
  
    rect(width/3, 0, width/3, height);
  }
  
  
  else{
    rect(2*width/3, 0, width/3, height);
  }
}let x;
let xspeed;
function setup() {
  createCanvas(600, 400);
  ellipseMode(CENTER);
  x = width / 2;
  xspeed=3;
}
function draw() {
  background(220);
if(x>width || x<0){
  xspeed *=-1;
}
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
  
  r=map(mouseX,0,500,184,81);
  g=map(mouseX,0,500,208,97);
  b=map(mouseX,0,500,218,129);
  background(r,g,b);
  
  if(mouseIsPressed){
    noStroke();
    fill(255,245,180);
    ellipse(mouseX-100, mouseY,100);
  }  
  spot.x = random(0,width);
  snowr = random(5,25);
  speed=2
  fill(255,255,255,100)
  noStroke();
  ellipse(spot.x,spot.y,snowr);
  if (spot.y>height-100){
    speed=-2;
  }
  spot.y= spot.y+speed
  
  ellipseMode(CENTER);
  noStroke();
  fill(245);
  ellipse(mouseX,height-150,bodyr);
  fill(250);
  noStroke();
  ellipse(mouseX,height-230,headr);
  fill(0);
  ellipse(mouseX-20,height-235,10);
  ellipse(mouseX+16,height-233,12);
  fill(239,165,78);
  triangle(mouseX-10,height-225,mouseX+5,height-218,mouseX-25,height-180);
  stroke(70,56,40);
  strokeWeight(sw);
  line(mouseX-bodyr/1.2,height-150,mouseX-bodyr/3.2,height-190); 
  line(mouseX+bodyr/1.2,height-150,mouseX+bodyr/3.2,height-190);  
 
  
  
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
  ellipse(mouseX,height-150,bodyr);
  fill(250);
  noStroke();
  ellipse(mouseX,height-230,headr);
  fill(0);
  ellipse(mouseX-20,height-235,10);
  ellipse(mouseX+16,height-233,12);
  fill(239,165,78);
  triangle(mouseX-10,height-225,mouseX+5,height-218,mouseX-25,height-180);
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
} 
function draw() { 
  background(220);
  fill(100);
  line(width/4,height/4,width*3/4, height/4);
  line(width/4,height/4,width/4, height*3/4);
  line(width/4,height*3/4,width*3/4, height*3/4);
  line(width*3/4,height/4,width*3/4, height*3/4);
function setup() { 
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
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
  
  stroke(237,48,19);
  strokeWeight(35)
  line(0,0,700,500)
  
  noStroke();
  fill(87,197,46);
  ellipse(350,250,350,250);
  
  noStroke();
  fill(0,0,125);
  rect(510,240,30,30)
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
	fill(0, 255, 255);
	ellipse(200, 200, 100, 100);
}function setup() { 
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
  
  fill(200,230,231);
  noStroke();
  ellipse(750,375,1500,1300);
  
  fill(215,215,215,100);
  noStroke();
  ellipse(775,375,700,725);
  
  fill(245);
  noStroke();
  ellipse(750,375,700,650);
  fill(240);
  ellipse(750,375,600,550);
  
  fill(212,161,81);
  noStroke();
  arc(725, 350, 700, 700, 9.6, PI+QUARTER_PI, PIE);
  
  fill(241,215,161);
  noStroke();
  arc(725, 350, 600, 600, 9.6, PI+QUARTER_PI, PIE);
  
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
  
  fill(200,230,231);
  noStroke();
  ellipse(750,375,1500,1300);
  
  fill(215,215,215,100);
  noStroke();
  ellipse(775,375,700,725);
  
  fill(245);
  noStroke();
  ellipse(750,375,700,650);
  fill(240);
  ellipse(750,375,600,550);
  
  fill(212,161,81);
  noStroke();
  arc(725, 350, 700, 700, 9.6, PI+QUARTER_PI, PIE);
  
  fill(241,215,161);
  noStroke();
  arc(725, 350, 600, 600, 9.6, PI+QUARTER_PI, PIE);
  
  fill(194,102,77);
  noStroke();
  ellipse(525,270,50,50);
  ellipse(660,320,20,20);
  
  
  fill(220,118,91);
  noStroke();
  ellipse(619,290,35,35);
  ellipse(500,200,45,45);
  
  
  
  
  
  
}