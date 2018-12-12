var gif1;
var gif2;
var button1;
var button2;
function preload() {
  gif1 = createImg("neutral-animation.gif");
}
function setup() {
  createCanvas(580, 400);
  gif1.position(0,-100);
  button1 = createButton("picture1");
   button2 = createButton("picture2");
  button1.mousePressed(picture1);
  button2.mousePressed(picture2); 
}
function picture1(){
  gif1.attribute("src","neutral-animation.gif");
}
function picture2(){
  gif1.attribute("src","sad-animation.gif");
}
function gotData() {
  var output = map(mouseX, 0, width, 0, 255);
}
function draw() {
  var data = map(latestData, 0, 250, 0, 100);
  if (data >= 0 || data <= 199) {
    gif1.attribute("src","neutral-animation.gif");
  } else if (data >= 200) {
     gif1.attribute("src","sad-animation.gif");
  }
}
  createCanvas(400, 400);
}
function draw() {
  background(220);
  fill(255,0,0);
  ellipse(30,30,50,50);
}const video = document.getElementById('video');
const poseNet = ml5.poseNet(video, modelLoaded);
function modelLoaded() {
  console.log('Model Loaded!');
}
poseNet.on('pose', function (results) {
  poses = results;
});var startDateInput;
var endDateInput;
var startDate;
var endDate;
var allEvents = [];
var output;
var numberOfReturns = 0;
var displayButton;
function setup() {
  noCanvas();
  startDateInput = createInput("9/1/2018");
  startDateInput.changed(enterDates);
  endDateInput = createInput("5/1/2019");
  endDateInput.changed(enterDates);
  var button = createButton("Read In Data");
  displayButton = createButton("Display Results");
  displayButton.mousePressed(displayResults);
  displayButton.position(20, 20);
  enterDates();
  button.mousePressed(enterDates);
  output = createDiv();
  output.position(10, 40);
}
function displayResults() {
  allEvents.sort(compare);
  for (var key in allEvents) {
    output.html(output.html() + "<BR>------" + key + "----<BR>");
    var thisDay = allEvents[key];
    console.log(thisDay);
    for (var events in thisDay) {
      var details = thisDay[events];
      output.html(output.html() + "<BR>" + events + " " + details.time);
    }
  }
}
function enterDates() {
  allEvents['Monday'] = [];
  allEvents['Tuesday'] = [];
  allEvents['Wednesday'] = [];
  allEvents['Thursday'] = [];
  allEvents['Friday'] = [];
  allEvents['Saturday'] = [];
  allEvents['Sunday'] = [];
  startDate = new Date(startDateInput.value());
  endDate = new Date(endDateInput.value());
  displayButton.hide();
  loadJSON('rm15.json', gotData);
  loadJSON('rm20.json', gotData);
  loadJSON('rmMeeting.json', gotData);
  loadJSON('rmConference.json', gotData);
  loadJSON('rm50.json', gotData);
}
function draw() {
  background(220);
}
function gotData(data) {
  console.log(data);
  var room = data.vcalendar[0]['x-wr-calname'];
  output.html("Loaded " + room + "<BR>" + output.html());
  var days = ['Sunday', 'Monday', "Tuesday", 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var cal = data.vcalendar[0].vevent;
  for (var i = 0; i < cal.length; i++) {
    var begin_date = calenDate(cal[i].dtstart);
    var end_date = calenDate(cal[i].dtend);
    if (begin_date > startDate && begin_date < endDate) {
      var summary = (cal[i].summary);
      if (summary) summary = summary.split("]")[1];
      var day = days[begin_date.getDay()];
      var time = begin_date.getHours() + ":" + pad(begin_date.getMinutes() + "", 2, "0") + " to " + end_date.getHours() + ":" + pad(end_date.getMinutes() + "", 2, "0");
      if (allEvents[day][summary] == null) {
        allEvents[day][summary] = {
          "hour": begin_date.getHours(),
          "all": cal[i],
          "summary": summary,
          "count": 1,
          "time": time,
          "room": room
        };
      } else {
        allEvents[day][summary].count++;
      }
    }
  }
  numberOfReturns++;
  console.log(numberOfReturns);
  if (numberOfReturns >= 5) {
    displayButton.show();
  }
}
function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}
function compare(a, b) {
  if (a.hour > b.hour)
    return -1;
  if (a.hour < b.hour)
    return 1;
  return 0;
}
function calenDate(icalStr) {
  if (typeof icalStr == 'object') {
    icalStr = icalStr[0];
  }
  var strYear = icalStr.substr(0, 4);
  var strMonth = parseInt(icalStr.substr(4, 2), 10) - 1;
  var strDay = icalStr.substr(6, 2);
  var strHour = icalStr.substr(9, 2);
  var strMin = icalStr.substr(11, 2);
  var strSec = icalStr.substr(13, 2);
  var oDate = new Date(strYear, strMonth, strDay, strHour, strMin, strSec)
  return oDate;
}
function pad(value, widther, padchar) {
  while (value.length < widther) {
    value += padchar;
  }
  return value;
}var video;
var target = [255,0,0];
var threshold = 20;
function setup() {
  createCanvas(400, 400);
  pixelDensity(1); 
	video = createCapture(VIDEO);
	video.hide();
	video.size(320,280);
}
function mousePressed(){
  target = video.get(mouseX,mouseY);
}
function draw() {
	video.loadPixels();
  var allx = 0;
  var ally = 0;
  var totalPixels = 1;
  for( var y = 0; y < video.height; y++){
    for (var x = 0; x < video.width; x++){
		  var thisPixel = video.get(x,y);
      var thisDist = 
          dist(thisPixel[0],thisPixel[1],thisPixel[2],target[0],target[1],target[2]);
      if (thisDist < threshold) {
        allx  = allx + x;
        ally = ally + y;
  			totalPixels++;
      }
  	}
	}
	video.updatePixels();
	image(video,0,0);
  ellipse(allx/totalPixels, ally/totalPixels, 20,20);
  
}var video;
function setup() {
  createCanvas(400, 400);
	video = createCapture(VIDEO);
	video.hide();
	video.size(320,280);
}
function draw() {
	video.loadPixels();
  var red = [255,0,0,127];
  for( var y = 0; y < video.height; y++){
    for (var x = 0; x < video.width; x++){
		  var thisPixel = video.get(x,y);
      if (thisPixel[0] > 20) {
        video.set(x,y,red);
      }
  	}
	}
	video.updatePixels();
	image(video,0,0);
  
}var classifier;
var canvas;
var img;
function setup() {
  canvas = createCanvas(400, 400);
  canvas.drop(gotFile);
  classifier = ml5.imageClassifier('MobileNet',gotModel);
}
function gotModel(){
  console.log("got model");
}
function gotFile(daFile){
 		 console.log(daFile);
  	img = createImg(daFile.data, imageReady).hide();
}
function imageReady(){
  classifier.predict(img, gotResult);
  background(0);
  image(img, 0, 0, width, height);
}
function gotResult(error, data){
	console.log(data);
	textSize(20);
  text(data[0].className, 20,20);
}
function draw() {
}var classifier;
var canvas;
var img;
function setup() {
  canvas = createCanvas(400, 400);
	canvas.drop(gotPic);
	classifier = ml5.imageClassifier('MobileNet', gotModel);
}
function gotModel(){
 	console.log("Got Model");
}
function gotPic(file){
	img = createImg(file.data, imageReady).hide();
}
function draw() {
  background(220);
}
function imageReady() {
  classifier.predict(img, gotResult);
  background(0);
  image(img, 0, 0, width, height);
}
function gotResult(err, data){
	console.log(data);
}
var circles = [ ];
function setup() {
  createCanvas(400, 400);
  for(var i = 0; i < 1000; i++){
    var newOne = new Circle(width/2, height/2, i*.02) ;
  }
	ellipseMode(CENTER);
}
function draw() {
  background(220);
  for(var i = 0; i < circles.length; i++){
  	circles[i].move();
  	circles[i].display();
  	circles[i].checkEdges();
  }
 
}
function mousePressed(){
   for(var i = circles.length-1; i > -1; i--){
  	if( circles[i].didIClickOnYou() ){
    }
   }
}
class Circle {
  	this.x = x;
  	this.y = y;
    this.width = w;
  	this.dirx = random(-1,1);
 		this.diry = random(-1,1);
  }
  
  didIClickOnYou(){
    return (dist(mouseX, mouseY, this.x, this.y)< this.width);
  }
  
  move(){
    this.x = this.x + this.dirx;
    this.y = this.y + this.diry;
  }
  
  checkEdges(){
    if(this.x > width || this.x < 0){
      this.dirx = - this.dirx;
    }
    if(this.y > height || this.y < 0){
      this.diry = - this.diry;
    }
  }
  
  display(){
    fill(255,0,0);
    ellipse(this.x,this.y, this.width, this.width);
  }
}var video;
var threshold = 10;
var targetColor = [255, 0, 0];
var mySound;
function preload() {
  mySound = loadSound("bgGame.mp3");
}
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  mySound.play();
}
function draw() {
  image(video, 0, 0);
  var winningX = 0;
  var winningY = 0;
  var allThatQualified = 1;
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var thisPixel = video.get(x, y);
      var diffBetweenColors = dist(thisPixel[0], thisPixel[1], thisPixel[2], targetColor[0], targetColor[1], targetColor[2])
      if (diffBetweenColors < threshold) {
        winningX += x;
        winningY += y;
        allThatQualified++
        worldRecord = diffBetweenColors;
      }
    }
  }
  var h = winningX / allThatQualified;
  var v = winningY / allThatQualified
  ellipse(h, v, 20, 20);
  var pan = map(h, 0, width, -1, 1);
  var rate = map(v, 0, height,0, 2);
  mySound.pan(pan);
  mySound.rate(rate);
}
function mousePressed() {
  targetColor = get(mouseX, mouseY);
}  var sound;
var video;
var trackColor; 
function preload() {
  
 sound = loadSound('Taylor Swift - Shake It Off.mp3');
}
function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width,height);
  video.hide();
  sound.play();
  trackColor = [255, 0, 0];
}
function draw() {
  
  image(video,0,0);
  video.loadPixels();
  var worldRecord = 500; 
  var closestX = 0;
  var closestY = 0;
  
  for (var y = 0; y < video.height; y++ ) {
    for (var x = 0; x < video.width; x++ ) {
      var myColor = video.get(x,y);
      if (d < worldRecord) {
        worldRecord = d;
        closestX = x;
        closestY = y;
      }
    }
  }
  if (worldRecord < 50) { 
    fill(trackColor);
    strokeWeight(4.0);
    stroke(0);
    ellipse(closestX, closestY, 16, 16);
    var rate = map(closestX, 0,width,0,1);
    sound.rate(rate);
  }
}
function mousePressed() {
  trackColor = video.get(mouseX,mouseY);
  console.log(trackColor);
}var capture;
var targetColor = [255,0,0];
function setup() {
    createCanvas(640,480);  
 pixelDensity(1);
  capture = createCapture(VIDEO)
  capture.size(width,height);
 capture.hide();
   
}
function draw() {
  capture.loadPixels();
  var worldRecord = 40000000;
  var xWinner = 0;
  var yWinner = 0
	for(var y = 0; y < capture.height; y++){
    for(var x = 0; x < capture.width; x++){
      var thisOffset = (x + y*capture.width )*4
      var r = capture.pixels[thisOffset];
      var g = capture.pixels[thisOffset+1];
      var b = capture.pixels[thisOffset+2];
      var colorDist = dist(r,g,b,targetColor[0],targetColor[1],targetColor[2]);
      
      if (colorDist < worldRecord){
      		xWinner = x;
        	yWinner = y;
          worldRecord = colorDist;
      }
    }
  }
  capture.updatePixels();
  image(capture,0,0);
  ellipse (xWinner, yWinner,20,20);
  	
function setup() {
  createCanvas(500, 300);
}
function gotData() {
  var output = map(mouseX,0,width,0,255);
}
function draw() {
  background(255,255,255);
  fill(0,0,0);
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(mouseX, data, 50, 50);
  text(data, 10, 10);
  
}function setup() {
  var myQuery = "cat";
  createCanvas(400, 400);
  loadJSON(url, gotData);
}
function draw() {
  background(220);
}
function gotData(data){
  console.log(data.response.docs[0].snippet);
    loadJSON(url, gotData)
}var query = 'dog';
var inputBox;
function setup() {
  inputBox = createInput(query);
}
function changedInput() {
  query = inputBox.value();
  loadJSON(url, gotData);
}
function gotData(data) {
  removeElements();
  for (var i = 0; i < data.response.docs.length; i++) {
    var headline = data.response.docs[i].headline.main;
    console.log(headline);
    createDiv(headline);
  }
  inputBox = createInput(query);
  inputBox.changed(changedInput);
}
function draw() {
  background(220);
}
function setup() {
	createCanvas(400, 400);
	drawText(10, 10, "LOVE", 22, "Georgia");
}
function draw() {
}
function drawText(x, y, texty, sizey, font) {
	textSize(sizey);
	textFont(font);
	text(texty, x, y);
}
function mousePressed() {
	drawText(mouseX, mouseY, "LOVE", 22, "Georgia");
}var speed;
var circlex;
var circley;
var xdirection;
var ydirection;
function setup() {
  createCanvas(769, 600);
  circlex = 0;
  circley = 100;
  xdirection = 1;
	ydirection = 1;
  speed =1;
}
function draw() {
  rect(circlex,circley,100, 100);
  circlex = circlex + xdirection*speed;
  circley = circley + ydirection*speed;
  if(circley >= height || circley < 0){
    ydirection = -ydirection;
    speed++;
  }
  if (circlex >= width || circlex < 0){
    xdirection = -xdirection;
    speed++;
  }
   if(circley<480){
    background(circley-280, circlex/3, circley-280+circlex/3);
    fill(255, 255, 255, 125);
    stroke( 255, 255, 255, 125)
    rect(circlex, circley, 80, 80);
    circlex++;
    circley++;
  }else if(circley==480){
    circley=0;
    circlex=10;
    if(circlex == 640){
      circlex=0;
    }
  }
}var el;
var v1;
var x;
var y;
var a;
var b;
var xdirection;
var ydirection;
var value1 = 255;
var value2 = 255;
var value3 = 255;
var xdirectio;
var ydirectio;
function setup() {
  createCanvas(600, 600);
  v1 = createVector(150, 100);
  init();
}
function draw() {
  background(value3,value1,value2);
  fill(value1,value2,value3);
  ellipse(x, y, 200, 200);
  ellipse(y, x, 200, 200);
  ellipse(a, b, 200, 200);
  ellipse(b, a, 200, 200);
  fill(255);
  el = ellipse(winMouseX, winMouseY, 25, 25);
  x += xdirection;
  y += ydirection;
  a += ydirectio;
  b += xdirectio;
  checkEdges();
}
function mouseMoved() {
  value1 = value1 + 3;
  if (value1 > 255) {
    value1 = 0;
  }
}
function mouseClicked() {
  if (value2 === 0) {
    value2 = 255;
  } else {
    value2 = random(255);
  }
}
function doubleClicked() {
  if (value3 === 0) {
    value3 = 255;
  } else {
    value3 = random(255);
  }
}
function checkEdges() {
  if (y >= height || y < 0) {
    ydirection = -ydirection;
  }
  if (x >= width || x < 0) {
    xdirection = -xdirection;
  }
  if (a >= height || a < 0) {
    ydirectio = -ydirectio;
  }
  if (b >= width || b < 0) {
    xdirectio = -xdirectio;
  }
  smooth();
}
function init() {
  x = 300;
  y = 150;
  a = 450;
  b = 600;
  xdirection = 3;
  ydirection = 5;
  xdirectio = -5;
  ydirectio = -3;
}var img;
function preload() {
}
function setup() {
  createCanvas(600, 500);
  noStroke();
  fill(50, 80);
}
function draw() {
  
  for (let x = 0; x <= width; x = x + 10) {
    for (let y = 0; y <= height; y = y + 30) {
      let xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      let yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      let angle = xAngle * (x / width) + yAngle * (y / height);
      let myX = x + 10 * tan(2 * PI * t + angle);
      let myY = y + 20 * sin(2 * PI * t + angle);
      
  
  
    }
  }
  
}var myButton;
function setup() {
  createCanvas(400, 400);
  myButton = createButton("Press");
  myButton.position(100,100);
  myButton.mousePressed(function(){  
    background(220);
    ellipse(random(width), random(height),20,20);
     }); 
}
function draw() {
}
var point1;
function setup() {
  createCanvas(800, 800);
  point1 = new randomPoint();
}
function draw() {
  background(0, 10);
  point1.show();
  
}var myButton;
function setup() {
  createCanvas(400, 400);
  myButton = createButton("Press Me");
  myButton.mousePressed(    function(){ellipse(random(width), random(height), 20, 20);}     );
  
}
function draw() {
  
}
function setup() {
  createCanvas(500, 300);
}
function gotData() {
  var output = map(mouseX,0,width,0,255);
}
function draw() {
  background(255,255,255);
  fill(0,0,0);
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(mouseX, data, 50, 50);
  text(data, 10, 10);
  
}var myFishes = [];
var fishImage;
function preload() {
  fishImage = loadImage('goldfish.png');
}
function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  for (var i = 0; i < 100; i++) {
    myFishes.push(new Fish(i * 20, i * 20, 20 + random(30)));
  }
}
function draw() {
  background(220);
  for (var i = 0; i < myFishes.length; i++) {
    myFishes[i].swim();
    myFishes[i].checkEdges()
  }
}
function mousePressed() {
  for (var i = myFishes.length - 1; i > -1; i--) {
    if (myFishes[i].shouldIKillTheFish()) {
      myFishes.splice(i, 1);
    }
  }
}
class Fish {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.xdirection = random(-1, 1);
    this.ydirection = random(-1, 1);
    this.fishWidth = w;
  }
  swim() {
    push();
    translate(this.x, this.y);
		if (this.xdirection < 0) {
      rotate(PI);
    }
    image(fishImage, 0, 0, this.fishWidth, this.fishWidth);
    pop();
    this.x += this.xdirection;
    this.y += this.ydirection;
  }
  checkEdges() {
    if (this.x > width || this.x < 0) {
      this.xdirection = -this.xdirection;
    }
  }
  shouldIKillTheFish() {
    return (dist(this.x, this.y, mouseX, mouseY) < this.fishWidth / 2);
  }
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
}var button;
var x;
function setup() {
  createCanvas(400, 400);
  x = 100;
  button = createButton("Please PressMe");
  button.position(100,100);
  button.mousePressed(theyPressedMe );
}
function draw() {
  background(220);
}
function theyPressedMe(){
  x = x + 30;
  button.position(x,100);
}var xLoc;
var yLoc;
var directionX;
var directionY;
var speed;
var leftWall;
var rightWall;
var topWall;
var bottomWall;
function setup() {
  createCanvas(400, 400);
  resetIt();
}
function draw() {
  background(255);
  moveIt();
  checkBoundaries(leftWall,rightWall,topWall,bottomWall);
  drawIt();
}
function mouseReleased() {
  resetIt();
}
function resetIt() {
  xLoc = 0;
  yLoc = 100;
  directionX = 0.5;
  directionY = 1;
  speed = 1.0;
  bottomWall = height;
  topWall = 0;
  leftWall = 0;
  rightWall = width;
}
function moveIt() {
  xLoc = xLoc + directionX * speed;
  yLoc = yLoc + directionY * speed;
  speed = speed + 0.1;
}
function drawIt() {
  fill(0, 255, 0);
  ellipse(xLoc, yLoc, 20, 20);
}
function checkBoundaries(l,r,t,b) {
  if (xLoc < l || xLoc > r) {
    directionX = -directionX
  }
  if (yLoc < t || yLoc > b) {
    directionY = -directionY
    shrink();
  }
}
function shrink(){
  bottomWall--;
  topWall++;
  leftWall--;
  rightWall++;
}var x = 0;
var slider;
function setup() {
  createCanvas(400, 400);
  slider = createSlider(0,100,100);
  slider.position(100,100);
  slider.value(50);
}
function draw() {
  background(220);
  slider.value(x);
  x++;
}var xLoc;
var yLoc;
var directionX;
var directionY;
function setup() {
  createCanvas(400, 400);
  xLoc = 0;
  yLoc = 100;
  directionX = 1	;
  directionY = 1	;
}
function draw() {
  background(255);
  
  xLoc = xLoc + directionX;
  if (xLoc < 0 || xLoc > width){
		directionX = -directionX
  }
  yLoc = yLoc + directionY;
  if (yLoc < 0 || yLoc > height){
		directionY = -directionY
  }
  fill(0,255,0);
  ellipse(xLoc,yLoc, 20,20);
  
  
}var shakyState = false;
var xLoc = 0;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  if (shakyState){
    xLoc = xLoc + random(-3,3);
  }else{
    xLoc = xLoc + 1;
  }
  ellipse(xLoc, 100, 20,20);
}
function mousePressed(){
  if(dist(xLoc, 100, mouseX, mouseY) < 20){
    shakyState = true;
  }
  
}var xLoc;
function setup() {
  createCanvas(400, 400);
  xLoc = 0;
 
}
function draw() {
  background(220);
  xLoc = xLoc + 1;
  if (xLoc > width){
		  xLoc = 0;
  }
  fill(0,255,0);
  ellipse(xLoc,100, 20,20);
}var xLoc;
var yLoc;
var directionX;
var directionY;
var targetSize;
function setup() {
  createCanvas(400, 400);
  xLoc =175;
  yLoc = 300;
  directionX = 1	;
  directionY = 1	;
  targetSize = 50;
}
function draw() {
  background(255);
    xLoc = xLoc + directionX;
  if (xLoc < 0 || xLoc > width){
		directionX = -directionX
  }
  yLoc = yLoc + directionY;
  if (yLoc < 0 || yLoc > height){
		directionY = -directionY
  }
  fill(0,255,0);
  ellipse(xLoc,yLoc, 20,20);
  
  for (var i = 0; i < 400; i=i+targetSize){
    if(xLoc > i && xLoc < i+targetSize && yLoc > i && yLoc < i+targetSize){
      fill(255,0,0);
    }else{
      fill(0,0,255);
    }
    rect(i,i,targetSize,targetSize);
  }
  
  
  
}var xLoc;
var yLoc;
var directionX;
var directionY;
function setup() {
  createCanvas(400, 400);
  xLoc = 0;
  yLoc = 100;
  directionX = 1	;
  directionY = 1	;
}
function draw() {
  background(255);
  
  xLoc = xLoc + directionX;
  if (xLoc < 0 || xLoc > width){
		directionX = -directionX
  }
  yLoc = yLoc + directionY;
  if (yLoc < 0 || yLoc > height){
		directionY = -directionY
  }
  fill(0,255,0);
  ellipse(xLoc,yLoc, 20,20);
  
  
}var xLoc;
var directionX;
function setup() {
  createCanvas(400, 400);
  xLoc = 0;
  directionX = 1	;
}
function draw() {
  background(220);
  xLoc = xLoc + directionX;
  if (xLoc < 0 || xLoc > width){
		directionX = -directionX
  }
  fill(0,255,0);
  ellipse(xLoc,100, 20,20);
}var x;
var y;
var directionX;
var directionY;
var speed;
function setup() {
  createCanvas(400, 400);
  x = width / 2;
  y = 10;
  directionX = 1;
  directionY = 1;
  speed = 1;
}
function draw() {
  background(220);
  x = x + directionX * speed;
  if (x <= 0) {
    directionX = 1
  }
  if (x >= width) {
    directionX = -1
  }
  y = y + directionY * speed;
  if (y <= 0) {
    directionY = 1
  }
  if (y >= height) {
    directionY = -1
  }
  for (var i = 0; i < width; i = i + 30) {
    if (x > i && x < i+10 && y > i && y < i+10) {
      fill(255,0,0);
    } else {
      fill(0, 225, 0);
    }
    rect(i, i, 10, 10);
  }
  fill(25, 10, 15);
  ellipse(x, y, 20, 20);
}let img;
let RabbitBody1;
let RabbitBody2;
let RabbitHead1;
let RabbitHead2;
let Tree=1;
let Tree2=1;
let Tree3=1;
function preload(){
  img=loadImage("carrot.png");
  img2=loadImage("cloud.png");
  head=loadImage("RHead.png");
  body=loadImage("RBody.png");
}
  
  function setup() {
  	createCanvas(600, 400);
  
  
}
function draw() {
  RabbitHead1=288+random(-3,3);
  RabbitBody1=300-random(-5,5);
  RabbitHead2=307+random(-3,3);
  RabbitBody2=330-random(-5,5);
  Tree=Tree+1;
  Tree2=Tree2+1;
  Tree3=Tree3+1;
  
  
	background(204,236,170);
  noStroke();
  fill(205,233,247);
  rect(0,0,600,300);
  strokeWeight(3);
  stroke(102,165,33)
  image(img2,320,180);
  image(img2,450,110);
  image(img2,40,60);
  
  	fill(151,118,101);
    stroke(110,97,78);
  	rect(595-Tree,210,10,90);
  	if(595-Tree<-5){Tree=1}
  	fill(102,165,33);
  	stroke(12,124,66);
  	ellipse(600-Tree,200,60,100);
  	if(600-Tree<0){Tree=1};
  
  	fill(151,118,101);
    stroke(110,97,78);
  	rect(832-Tree2,210,6,90);
  	if(832-Tree2<-3){Tree2=1};
  	fill(102,165,33);
  	stroke(12,124,66);
  	ellipse(835-Tree2,232,55,73);
  	if(835-Tree2<0){Tree2=1};
  
  	fill(151,118,101);
    stroke(110,97,78);
  	rect(1000-Tree3,210,12,90);
  	if(1000-Tree3<0){Tree3=1};
  	
  	fill(102,165,33);
  	stroke(12,124,66);
  	ellipse(1006-Tree3,200,90,120);
  	if(1006-Tree3<0){Tree3=1};
    
  	image(body,134,RabbitBody2);
		image(head,120,RabbitHead2);
  	image(body,70,RabbitBody1);
  	image(head,60,RabbitHead1);
  
   	image(img,mouseX, mouseY);
   
  	
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  for (var i = 0; i < 3; i++) {
  	fill(255);
    if (mouseX > i*150 && mouseX < i*150 + 100 && mouseY > i*150 && mouseY < i*150 + 100) {
      fill(255, 0, 0);
    }else{
      fill(0, 0, 0);
    }
    rect(i*150, i*150, 100, 100)
  }
}let angle;
function setup() {
  createCanvas(400, 400);
  angle = PI;
}
function draw() {
  background(220);
  ellipse( 100 + 100*sin(angle), 100, 20, 20);
  angle = angle + 2*PI/360;
}let angle;
function setup() {
  createCanvas(400, 400, WEBGL);
  rectMode(CENTER);
  angle = PI;
}
function draw() {
  background(220);
  rect(-100, -100, 30, 30);
  rotateZ(angle);
  rect(0, 0, 30, 30);
  angle = angle + 2 * PI / 360;
  rect(100, 100, 30, 30);
}function setup() {
  createCanvas(400, 400);
  background(220);
}
function draw() {
  ellipse(mouseX,mouseY,mouseX, mouseY);
}
function mousePressed(){
  saveFrames("findme", "jpg");
}let xOfCircle;
function setup() {
  createCanvas(400, 400);
  xOfCircle = 0;
}
function draw() {
  background(220);
  ellipse(xOfCircle,100, 20,20);
  xOfCircle += 1;
}let w;
function setup() {
  createCanvas(400, 400);
  w = 0;
}
function draw() {
  background(220);
  ellipse( 100 , 100, w,w);
  w = w + random(-10,10);
}function setup() {
  createCanvas(400, 400,WEBGL);
}
function draw() {
 
  rect(100,100, 20, 80);
  push();
  rotateZ(PI/2);
  rect(0,0,20,20);
  rotateZ(PI/2);
  pop();
  rect(20,20,20,20);
}function setup() {
  createCanvas(400, 400);
}
function draw() {
   background(255);
  stroke(0,255,0);
  fill(250,0,0);
  ellipse(120,120,100,100);
 
}var kinectron;
var stephaniePlace ;
function setup() {
  createCanvas(960, 540);
  background(0);
  noStroke();
  kinectron = new Kinectron('172.16.224.110');
  kinectron.makeConnection();
  kinectron.startKey(gotData);
  stephaniePlace= loadImage("Wakanda-1-e1519154194321.jpg");
}
function draw() {
}
function gotData(data){
  loadImage(data.src,gotImage);
}
function gotImage(img){
 image(stephaniePlace,0,0);
  image(img,0,0);
  
}
var kinectron
  
function setup() {
  createCanvas(400, 400);
  kinectron = new Kinectron("172.16.224.110");
  kinectron.startColor(myCallback);
}
function draw() {
  background(220);
}
function myCallback(data){
  console.log("hey");
var liveData = true;
var x = 0;
var kinectronIpAddress = "172.16.224.110"; 
var myCanvas = null;
var kinectron = null;
var start = 30;
var target = 100;
var diameter = start;
var light = 255;
var dark = 100;
var hueValue = light;
var lerpAmt = 0.3;
var state = 'ascending';
var sentTime = Date.now();
var currentFrame = 0;
function setup() {
  myCanvas = createCanvas(500, 500);
   background(0);
  noStroke();
  background(0);
  noStroke();
  if (liveData) initKinectron();
}
function draw() {
  if (!liveData) loopRecordedData();
}
function loopRecordedData() {
  
  if (Date.now() > sentTime + 20) {
    bodyTracked(recorded_skeleton[currentFrame])
    sentTime = Date.now();
    if (currentFrame < recorded_skeleton.length-1) {
      currentFrame++;
    } else {
      currentFrame = 0;
    }
  }
}
function initKinectron() {
  kinectron = new Kinectron(kinectronIpAddress);
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
}
function bodyTracked(body) {
  background(0, 20);
  var hands = [];
  for(var jointType in body.joints) {
    joint = body.joints[jointType];
    drawJoint(joint);
    
    if (jointType == 11) {
      hands.rightHand = joint;
      hands.rightHandState = translateHandState(body.rightHandState);
    }
    if (jointType == 7) {
      hands.leftHand = joint;
      hands.leftHandState = translateHandState(body.leftHandState);
    }
  }
  drawHands(hands);
}
function drawJoint(joint) {
  fill(100);
  ellipse(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, 15, 15);
  fill(200);
  ellipse(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, 3, 3);
}
function translateHandState(handState) {
  switch (handState) {
    case 0:
      return 'unknown';
    case 1:
      return 'notTracked';
    case 2:
      return 'open';
    case 3:
      return 'closed';
    case 4:
      return 'lasso';
  }
}
function drawHands(hands) {
  if ((Math.abs(hands.leftHand.depthX - hands.rightHand.depthX) < 0.01) && (Math.abs(hands.leftHand.depthY - hands.rightHand.depthY) < 0.01)) {
    hands.leftHandState = 'clapping';
    hands.rightHandState = 'clapping';
  }
  
  updateHandState(hands.leftHandState, hands.leftHand);
  updateHandState(hands.rightHandState, hands.rightHand);
}
function updateHandState(handState, hand) {
  switch (handState) {
    case 'closed':
      drawHand(hand, 1, 255);
      break;
    case 'open':
      drawHand(hand, 0, 255);
      break;
    case 'lasso':
      drawHand(hand, 0, 255);
      break;
    case 'clapping':
      drawHand(hand, 1, 'red');
  }
}
function drawHand(hand, handState, color) {
  if (handState === 1) {
    state = 'ascending';
  }
  if (handState === 0) {
    state = 'descending';
  }
  if (state == 'ascending') {
    diameter = lerp(diameter, target, lerpAmt);
    hueValue = lerp(hueValue, dark, lerpAmt);
  }
  if (state == 'descending') {
    diameter = lerp(diameter, start, lerpAmt);
    hueValue = lerp(hueValue, light, lerpAmt);
  }
  fill(color);
  ellipse(hand.depthX * myCanvas.width, hand.depthY * myCanvas.height, diameter, diameter);
var sequence = [{
    "video_id": "n2MtEsrcTTs",
    "start": 9,
    "end": 13
  },
  {
    "video_id": "trX6zdnXrrw",
    "start": 3,
    "end": 10
  },
  {
    "video_id": "VC_p1DzgN0U",
    "start": 3,
    "end": 10
  }
]
var tag = document.createElement('script');
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
var done = 0;
var placeInSequence = 0;
function setup() {
  createCanvas(400, 400);
  button1 = createButton('randomize');
  button1.position(100,100);
  button1.mousePressed(randomIt);
}
function randomIt() {
  for (var i = 0; i < sequence.length; i++) {
    sequence[i].start = int(random(0, 10));
    sequence[i].end = int(sequence[i].start) + int(random(0, 10));
  }
  console.log(sequence);
  placeInSequence = 0;
  playNext();
}
function draw() {
}
function playNext() {
    placeInSequence = 0;
  }
  player.loadVideoById({
    'videoId': sequence[placeInSequence].video_id,
    'startSeconds': sequence[placeInSequence].start,
    'endSeconds': sequence[placeInSequence].end,
    'suggestedQuality': 'large'
  });
  placeInSequence++;
}
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '300',
    width: '440',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}
function onPlayerReady(event) {
  event.target.playVideo();
}
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    console.log("Next " + placeInSequence);
    playNext();
  }
 
var apiKey = "COrdiz9qAt5OlZOLRyoKaaaG-60PkkxN";
var db = "icm";
var coll = "demo";
var x = 100;
var y = 100;
var inputBox;
var select;
var statusDiv;
var img;
function preload(){
  img = loadImage("quad1.jpg");
}
function setup() {
  inputBox = createInput("Joe");
  select = createSelect();
  select.changed(pickedNewPerson);
  statusDiv= createDiv("");
  listOfUsers()
  var canvas = createCanvas(345, 339);
  canvas.mouseReleased(putInfoToMLAB);
}
function draw() {
  fill(255,255,0);
    image(img,0,0)
  ellipse(x, y, 20, 20);
}
function mouseDragged() {
  x = mouseX;
  y = mouseY;
}
function putInfoToMLAB() {
  thisElementArray.x = x;
  thisElementArray.y = y;
  var user = inputBox.value();
  var data = JSON.stringify(thisElementArray);
  var query = "q=" + JSON.stringify({
    _id: user
  }) + "&"
  statusDiv.html("sending");
  $.ajax({
    url: url,
    data: data,
    type: "PUT",
    contentType: "application/json",
    
    success: function(data) {
      console.log("saved");
      statusDiv.html("");
    },
    failure: function(data) {
      console.log("didn't save");
    }
  });
}
function getInfoFromMLAB() {
  var user = inputBox.value();
  var query = JSON.stringify({
    _id: user
  });
  statusDiv.html("Asking new location...");
  $.ajax({
    url: url,
    type: "GET",
    contentType: "application/json",
      console.log(data);
      statusDiv.html("");
      if (data.length > 0) {
        x = data[0].x;
        y = data[0].y;
      }
    }
  });
}
function listOfUsers(){
  statusDiv.html("Asking for other names....");
  data: JSON.stringify( {"distinct": coll,"key": "_id"} ),
  type: "POST",
  contentType: "application/json",
  success: function(names) {
    statusDiv.html("");
    console.log(names);
    var allPeople =  names.values;
    for(var i = 0; i < allPeople.length; i++){
      select.option(allPeople[i]);
    }
  } } )
}
function pickedNewPerson() {
  var newName= select.value();
  inputBox.value(newName);
  getInfoFromMLAB();
}function setup() {
  createCanvas(400, 400);
}
function data_loaded(data){
	info = "";
  for(var i = 0; i < data.fact.length; i++){
  	info += data.fact[i].dim.COUNTRY + " " + data.fact[i].dim.GHO + ": " + data.fact[i].Value[0] + "<br>" ;
  }
  createP(info);
  
}var data;
function preload(){
  data=loadJSON ("malariadata.json");
}
function setup() { 
  createCanvas(400, 400);
  
}
function draw() { 
  background(220);
  
var video;
  var cumulativeX = 0;
  var cumulativeY = 0;
  var numberThatQualified = 0;
  
var trackColor; 
function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width,height);
  video.hide();
  trackColor = [255, 0, 0];
}
function draw() {
  
  image(video,0,0);
  video.loadPixels();
  var threshold = 30;
  cumulativeX = 0;
  cumulativeY = 0;
  numberThatQualified = 0;
  
  for (var y = 0; y < video.height; y++ ) {
    for (var x = 0; x < video.width; x++ ) {
      var loc = (x + y * video.width) * 4;
      var r1 = video.pixels[loc   ]; 
      var g1 = video.pixels[loc + 1];
      var b1 = video.pixels[loc + 2];
      var r2 = trackColor[0];
      var g2 = trackColor[1];
      var b2 = trackColor[2];
      if (d < threshold) {
        numberThatQualified ++;
        cumulativeX = cumulativeX + x;
        cumulativeY = cumulativeY + y;
      }
    }
  }
  if (numberThatQualified  >0 ) { 
    fill(trackColor);
    strokeWeight(4.0);
    stroke(0);
    
    ellipse(cumulativeX/numberThatQualified , cumulativeY/numberThatQualified , 16, 16);
  }
}
function mousePressed() {
  trackColor = video.get(mouseX,mouseY);
  console.log(trackColor);
}
var video;
var trackColor; 
function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width,height);
  video.hide();
  trackColor = [255, 0, 0];
}
function draw() {
  
  image(video,0,0);
  video.loadPixels();
  var worldRecord = 500; 
  var closestX = 0;
  var closestY = 0;
  for (var y = 0; y < video.height; y++ ) {
    for (var x = 0; x < video.width; x++ ) {
      var loc = (x + y * video.width) * 4;
      var r1 = video.pixels[loc   ]; 
      var g1 = video.pixels[loc + 1];
      var b1 = video.pixels[loc + 2];
      var r2 = trackColor[0];
      var g2 = trackColor[1];
      var b2 = trackColor[2];
      if (d < worldRecord) {
        worldRecord = d;
        closestX = x;
        closestY = y;
      }
    }
  }
  if (worldRecord < 50) { 
    fill(trackColor);
    strokeWeight(4.0);
    stroke(0);
    ellipse(closestX, closestY, 16, 16);
  }
}
function mousePressed() {
  trackColor = video.get(mouseX,mouseY);
  console.log(trackColor);
}
var k =0;
function setup() {
  createCanvas(400, 400);
   for (var i = 0; i < 400; i++) {
      for (var j = 0; j < 400; j++) {
        console.log("B");
     console.log("C");
    console.log("D");
  console.log("E");
}
function draw() {
}
   var data;
var time = 0;
var elem;
function preload() {
  data = loadJSON('newdebt.json');
}
function setup() {
  elem = createDiv();
  createCanvas(600, 600);
}
function mousePressed() {
  changeTime();
}
function draw() {
  background(200);
  var net_change = data.debt[time].net_change;
  var debt_change = data.debt[time].debt_change;
  var rad1 = sqrt(debt_change * 1500 / PI);
  var rad2 = sqrt(net_change * 1500 / PI);
  fill(20, 60, 80);
  ellipse(width / 2, height / 3, rad1 * 2);
  fill(20, 0, 80);
  ellipse(width / 10, height / 3, rad2 * 2);
  elem.html("<h1>" + data.debt[time].month + "</h1>");
}
function changeTime() {
  time++;
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
	ellipse(100,100,20,20);
var input;
function setup() {
  noCanvas();
  input = createInput('computer');
  var button = createButton('submit');
  button.mousePressed(search);
}
function search() {
  var term = input.value();
      'api-key=686c52b27721b60706a1cd86dc63e395:13:22989233' +
      '&q='+  term;
   console.log(url);
  loadJSON(url, gotData);
}
function gotData(data) {
  console.log(data);
  docs = data.response.docs;
  for (var i = 0; i < docs.length; i++) {
    var headline = createElement('h3', '');
    var link = createA(docs[i].web_url, docs[i].headline.main);
    link.parent(headline);
    var par = createP(docs[i].snippet);
  }
  
}var myButton;
function setup() { 
  createCanvas(400, 400);
  myButton = createButton("Press to Win!");
  myButton.mouseClicked(theyClicked);
  
} 
function draw() { 
}
function theyClicked(){
  background(random(255),random(255),random(255));
}var mySlider;
function setup() { 
  createCanvas(400, 400);
  mySlider = createSlider(0,255,127);
  mySlider.position(width/2, height/2);
  mySlider.changed(wakeUpSleepHead);
} 
function draw() { 
  background(220);
}
function wakeUpSleepHead(){
}
  
  var myButton;
function setup() { 
  createCanvas(400, 400);
  myButton = createButton("Press for Immediate Gratification");
  myButton.position(width/2,height/2);
  myButton.mousePressed(oppressed);
} 
function draw() { 
}
function oppressed(){
  background(random(255),random(255),random(255));
}var mySlider;
var xpos;
function setup() { 
  createCanvas(400, 400);
  mySlider = createSlider(0,width,width/2);
  mySlider.mouseMoved(gotToMoveItMoveIt);
} 
function draw() { 
  background(220);
  ellipse(xpos, 100, 20,20);
}
function gotToMoveItMoveIt(){
  xpos = mySlider.value();
var loc =  0;
var heart1 = 0 ;
var muscle = 0 ;
var heart2 = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function gotData() {
  var vals = currentString.split(',');
  if(vals.length >2){
  heart1 = int(vals[0]);
  muscle = int(vals[1]);
  heart2 = int(vals[2]);
  }
}
function draw() {
  background(127);
  fill(0,0,0);
  var mappedVar = map(heart1, 120000,140000,0,height);
  ellipse(loc, mappedVar, 10, 10);
  text("heart1: " + heart1, 10, 10);
  text("muscle: " + muscle, 10, 20);
  text("heart2: " + heart2, 10, 40);
	loc = loc + 1;
	if (loc == width) {loc = 0;background(255,255,255);}
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
  var mappedVar = map(latestData, 490,540,0,width);
  ellipse(mappedVar, 100, 50, 50);
  text(latestData, 10, 10);
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
  var mappedVar = map(latestData, 490,540,0,width);
  ellipse(mappedVar, 100, 50, 50);
  text(latestData, 10, 10);
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
  var mappedVar = map(latestData, 490,540,0,width);
  ellipse(mappedVar, 100, 50, 50);
  text(latestData, 10, 10);
}var ants = []
var circles = []
var balls = [];
var bubbles = [];
var spaces = [];
function setup() {
  createCanvas(400, 400);
}
function draw() {
  spaces.push(new space());
  background(0);
  for (let i = 0; i < ants.length; i++) {
    ants[i].antCrawl();
    ants[i].drawAnt();
  }
  for (let i = 0; i < circles.length; i++) {
    circles[i].fall();
    circles[i].bounce();
    circles[i].display();
  }
  for (let i = 0; i < balls.length; i++) {
    balls[i].drawball();
  }
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].show();
    bubbles[i].move();
    bubbles[i].mouseClicked();
  }
  for (let i = 0; i < spaces.length; i++) {
    if (spaces[i].winDone) {
      spaces[i].show();
      spaces[i].update();
    }
  }
}
function mousePressed() {
  ants.push(new Ant());
  circles.push(new circle());
  balls.push(new ball());
  bubbles.push(new bubble());
  spaces.push(new space());
}
class Ant {
  constructor() {
    this.antX = 0;
    this.antY = random(0, height);
    this.antL = this.antC * (2 / 3);
    this.whichLeg = 0;
  }
  drawAnt() {
    ellipseMode(CENTER);
    fill(255);
    line(this.antX - (this.antC * 2), this.antY + this.antC, this.antX - (this.antC * 2), this.antY - this.antC);
    line(this.antX - this.antC, this.antY + this.antC, this.antX - this.antC, this.antY - this.antC);
    noFill();
    arc(this.antX, this.antY - (this.antC / 2), this.antC * 1.5, this.antC, 5.5, 1);
    arc(this.antX, this.antY + (this.antC / 2), this.antC * 1.5, this.antC, 5.5, 0.6);
  }
  antCrawl() {
    this.antX++;
  }
}
class circle {
  constructor(x, y) {
    this.x = mouseX;
    this.y = mouseY;
    this.diameter = random(1, 10);
    this.speedx = random(-5, 5);
    this.speedy = random(-5, 5);
    this.color = color(random(255), random(255), random(255));
  }
  fall() {
    this.x += this.speedx
    this.y += this.speedy;
  }
  display() {
    fill(this.color);
    stroke(this.color);
    ellipse(this.x, this.y, this.diameter);
  }
  bounce() {
    if (this.y > width) {
      this.speedy = this.speedy * (-1);
    }
    if (this.y < 0) {
      this.speedy = this.speedy * (-1);
    }
    if (this.x > height) {
      this.speedx = this.speedx * (-1);
    }
    if (this.x < 0) {
      this.speedx = this.speedx * (-1);
    }
  }
}
class ball {
  constructor() {
    this.x = width / 2;
    this.y = height;
  }
  drawball() {
    stroke(255);
    fill(200, 0, 0);
    ellipse(this.x, this.y, 10, 10);
    this.x = this.x - this.angle;
  }
}
class bubble {
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
    } else {
      this.col = (200);
    }
  }
  mouseClicked() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 15) {
      this.on = !this.on;
    }
  }
}
class space {
  constructor() {
    this.x = 250;
    this.y = 250;
    this.vx = random(tan(this.x), -tan(this.x));
    this.vy = random(tan(this.x), -tan(this.x));
    this.alpha = 255;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha = this.alpha - 1;
  }
  winDone() {
    return this.alpha < 0;
  }
  show() {
    fill(this.x, this.y, 255, this.alpha);
    noStroke();
    ellipse(this.x, this.y, 10);
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
  var mappedVar = map(latestData, 490,540,0,width);
  ellipse(mappedVar, 100, 50, 50);
  text(latestData, 10, 10);
}let allRays = [];
let angle = 0;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  for (var i = 0; i < allRays.length; i++) {
    allRays[i].move();
    allRays[i].check();
    allRays[i].show();
  }
  translate(width / 2, height / 2);
  rotate(angle);
  ellipse(0, 0, 40, 20);
}
class Ray {
  constructor(x, y, startAngle) {
    this.origin = x;
    this.origin = y;
    this.distance = 0;
    this.angle = startAngle;
    this.stillOnScreen = true;
    this.speed = 1;
  }
  move() {
    this.distance = this.distance + this.speed;
    this.speed = this.speed + this.distance / 100;
  }
  check() {
    this.stillOnScreen = (this.distance < width / 2);
  }
  show() {
    fill(255, 0, 0, 255 - this.distance * 2);
    stroke(255, 0, 0, 255 - this.distance * 2);
    if (this.stillOnScreen) {
      for (var i = 0; i < 10; i++) {
        var x = this.origin + (this.distance + i * 10) * cos(this.angle);
        var y = this.origin + (this.distance + i * 10) * sin(this.angle);
        ellipse(x, y, 2 + i * 2, 2 + i * 2);
      }
    }
  }
}
function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    angle = angle + 0.1;
  } else if (keyCode == RIGHT_ARROW) {
    angle = angle - 0.1;
  } else if (keyCode == UP_ARROW) {
    allRays.push(new Ray(width / 2, height / 2, angle));
  }
function setup() {
  createCanvas(600, 400);
}
function draw() {
  background(0);
  stroke(255);
  strokeWeight(5);
   
  for (var x = 75; x <= width; x += 150) {
    fill(random(255),random(128), random(255));
    
    ellipse(x, cy, cd, cd);
    var distance = dist(mouseX, mouseY, x, cy);
        if (distance >=50) {
      fill(255, 0, 0);
    } else {
      fill(0, 255, 0)
           
      ellipse(x, cy, cd, cd);
      }
  
  }
  	handles();
  confetti();
 
}
function handles(){
    for (var y = 75; y <= width; y += 150) {
    rect(y, ry, rw, rh);
    
    }
}
function confetti(){
  
  for (var z= 0; z <= width; z += 10) {
   
    fill(192,192,193);
    ellipse(random (z), random (f), fd, fd);
    
      
 
    } 
}let circles = [];
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  for (var i = 0; i < circles.length; i++) {
    circles[i].move();
    circles[i].check();
    circles[i].display();
  }
}
function mousePressed() {
  circles.push(new Ball(mouseX, mouseY));
}
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xDir = -1;
  this.yDir = -1;
  }
  check() {
    if (this.x >= width || this.x <= 0) {
      this.xDir = -this.xDir;
    }
    if (this.y >= height || this.y <= 0) {
      this.yDir = -this.yDir;
    }
  }
  move() {
    this.x = this.x + this.xDir;
    this.y = this.y + this.yDir;
  }
  display() {
    ellipse(this.x, this.y, 20, 20);
  }
}var img;
function preload(){
  img = loadImage("clouds.jpg");
 
}
function setup() { 
  createCanvas(400, 400);
   pixelDensity(1);
} 
function draw() { 
  image(img, 0, 0);
  loadPixels();
  for (var x = 0; x < img.width; x++) {
    for(var y = 0; y < img.heigh; y++){
      var thisPixel = get(x,y);
      if (green(thisPixel) > 1){
    		set(x, y, color(255,0,0));
      }
    }
  }
  updatePixels();
 
}function setup(){
  createCanvas(400,400);
}
function draw(){
  background(255);
  translate(mouseX, mouseY);
    stroke(0)
    strokeWeight(10);
    fill(51, 204, 51);
    rect(-30, 5, 165, 165);
    fill(0);
    rect(10, 40, 32, 32);
    fill(0);
    rect(60, 40, 32, 32);
    fill(0);
    rect(35, 72, 32, 16);
    fill(0);
    rect(22, 95, 64, 23);
    fill(0);
    rect(22, 108, 20, 23);
    fill(0);
    rect(22, 108, 20, 23);
    fill(51, 204, 51);
    rect(0, 165, 108, 200);
  
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  for (var i = 0; i < 20; i++) {
    var yForThisDot = 100;
    var distance = dist(mouseX, mouseY, xForThisDot, yForThisDot);
    if (distance < 7) {
      fill(255, 0, 0);
    } else {
      fill(0, 255, 0);
    }
    ellipse(xForThisDot, yForThisDot, 15, 15);
  }
}var lastTime = 0;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  if (millis() - lastTime > 2000) {
    fill(255, 0, 0);
    ellipse(width / 2, height / 2, width, height);
    lastTime = millis();
  }
}var angle = 0;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(127)
  angle = angle + .1;
  var y = 5 * sin(angle);
  fill(0, 0, 255);
  arc(50, 160 + y, 70, 80, 0, PI + QUARTER_PI, CHORD);
  arc(10, 160 + y, 70, 80, 0, PI + QUARTER_PI, CHORD);
}
var xoff = 0;
var xsnow = 100;
var ysnow = 0;
function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
 
  background(127)
  var angle = atan2(mouseY - height/2,mouseX- width/2);
  var x = width/2 + 100*cos(angle);
  var y = height/2 + 100*sin(angle);
  fill(0);
  ellipse(x,y, 20,20);
  
  fill(255);
  ellipse(xsnow,ysnow, 15,15);
  xsnow = xsnow + noise(xoff)*2-1;
  xoff = xoff + 0.01;
  ysnow = ysnow + 0.5
  
  fill(255,0,0);
  for(var i =0; i < 100; i++){
    fill(255,0,0);
    ellipse(random(0,width), random(0,height), 5,5);
  }
}
  var sun = 20; 
var boat = {
   post: 20,
   bottom: 20
 };
var flag = {
  p1: 100,
  p2: 150,
  p3: 100,
};
 var ocean = {
   wave: 400,
   r: 86,
   g: 204,
   b: 190
 };
 function setup() {
   createCanvas(400, 400);
 }
 function draw() {
   background(201, 234, 237);
   
   fill(252, 180, 126)
   ellipse(sun, 25, 50, 50);
   sun = sun +.3;
   fill(232, 192, 180);
   ellipse(mouseX, 150, 76, 90);
   
   fill(232, 192, 180);
   rect(mouseX, 24, 1, 80);
   
   fill(232, 192, 180);
   triangle(mouseX, 90, mouseX+80, 90, mouseX, 25);
   fill(66, ocean.g, ocean.b);
   arc(10, 160, 70, 80, 0, PI + QUARTER_PI, CHORD);
   arc(80, 160, 70, 80, 0, PI + QUARTER_PI, CHORD);
   arc(150, 160, 70, 80, 0, PI + QUARTER_PI, CHORD);
   arc(220, 160, 70, 80, 0, PI + QUARTER_PI, CHORD);
   arc(290, 160, 70, 80, 0, PI + QUARTER_PI, CHORD);
   arc(360, 160, 70, 80, 0, PI + QUARTER_PI, CHORD);
   fill(66, ocean.g, ocean.b);
   ocean.r = ocean.r - .4;
   ocean.g = ocean.g - .4;
   ocean.b = ocean.b + .5;
   rect(-1, 160, 401, 300);
 }var img1;
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
  
  
    var angle = atan2(mouseY-height/2, mouseX-width/2);
  
  var x = width/2 + 30* cos(angle);
  var y = height/2 + 30* sin(angle);
  
  
  image(img1, 0, 0);
  
  noStroke();
  fill(104,77,35);
  ellipse(x1,y1,15,15);
  ellipse(x2,y2,15,15);
  
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
  
  
  x3=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x3,y3,d,d);
   
   if(y3 <= 330){
    y3=y3+1;
  }
   else{y3=60;}
  
  
  x4=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x4,y4,d,d);
   
   if(y4 <= 330){
    y4=y4+1;
  }
   else{y4=100;}
  
  
   x5=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x5,y5,d,d);
   
   if(y5 <= 330){
    y5=y5+1;
  }
   else{y5=140;}
  
  
    x6=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x6,y6,d,d);
   
   if(y6 <= 330){
    y6=y6+1;
  }
   else{y6=180;}
  
  
      x7=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x7,y7,d,d);
   
   if(y7 <= 330){
    y7=y7+1;
  }
   else{y7=220;}
  
  fill(255);
  h  = h-0.05;
    if(h <= -50){
    h = -50;}
  rect(55,350,495,h);
  
 image(img2, mouseX, mouseY);
ellipse(x,y, 10,10);
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
  
  
  var angle = arctan(mouseX-width/2/mouseY-height/2);
  
  
  image(img1, 0, 0);
  
  noStroke();
  fill(104,77,35);
  ellipse(x1,y1,15,15);
  ellipse(x2,y2,15,15);
  
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
  
  
  x3=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x3,y3,d,d);
   
   if(y3 <= 330){
    y3=y3+1;
  }
   else{y3=60;}
  
  
  x4=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x4,y4,d,d);
   
   if(y4 <= 330){
    y4=y4+1;
  }
   else{y4=100;}
  
  
   x5=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x5,y5,d,d);
   
   if(y5 <= 330){
    y5=y5+1;
  }
   else{y5=140;}
  
  
    x6=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x6,y6,d,d);
   
   if(y6 <= 330){
    y6=y6+1;
  }
   else{y6=180;}
  
  
      x7=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x7,y7,d,d);
   
   if(y7 <= 330){
    y7=y7+1;
  }
   else{y7=220;}
  
  fill(255);
  h  = h-0.05;
    if(h <= -50){
    h = -50;}
  rect(55,350,495,h);
  
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
  
  
  var angle = arctan(mouseX-width/2/mouseY-height/2);
  
  
  image(img1, 0, 0);
  
  noStroke();
  fill(104,77,35);
  ellipse(x1,y1,15,15);
  ellipse(x2,y2,15,15);
  
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
  
  
  x3=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x3,y3,d,d);
   
   if(y3 <= 330){
    y3=y3+1;
  }
   else{y3=60;}
  
  
  x4=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x4,y4,d,d);
   
   if(y4 <= 330){
    y4=y4+1;
  }
   else{y4=100;}
  
  
   x5=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x5,y5,d,d);
   
   if(y5 <= 330){
    y5=y5+1;
  }
   else{y5=140;}
  
  
    x6=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x6,y6,d,d);
   
   if(y6 <= 330){
    y6=y6+1;
  }
   else{y6=180;}
  
  
      x7=random(65,530);
  d= random(5,25);
  t= random(10, 220);
  fill(255,255,255,t);
  ellipse(x7,y7,d,d);
   
   if(y7 <= 330){
    y7=y7+1;
  }
   else{y7=220;}
  
  fill(255);
  h  = h-0.05;
    if(h <= -50){
    h = -50;}
  rect(55,350,495,h);
  
 image(img2, mouseX, mouseY);
}
  
  
function setup() { 
  createCanvas(400, 400);
 
} 
function draw() { 
  background(220);
  ellipse(x,100,20,20);
  x  = x + 6;
  if(x >= width){
    x = 0;
  }
}var myR;
var myB;
var myG;
var beginningX;
var beginningY;
var endX;
var endY;
function setup() {
  createCanvas(400, 400);
}
function keyPressed() {
  background(220);
}
function mousePressed() {
  beginningX = mouseX;
  beginningY = mouseY;
}
function mouseReleased() {
  endX = mouseX;
  endY = mouseY;
  line(beginningX,beginningY,endX,endY);
}
function mouseDragged() {
  fill(myR, myG, myB);
  ellipse(mouseX, mouseY, mouseX, mouseY);
  myR = random(255);
  myG = random(255);
  myB = random(255);
}
function draw() {
}function draw() {
  background(220);
  fill(255,0,0);
  translate(width / 6, height / 6);
  rotate(PI / 4);
  rect(0, 0, 20, 20);
  fill(0,255,0);
  translate(width / 3, height / 3);
  rotate(PI / 4);
  rect(0, 0, 20, 20);
}
function setup() {
  createCanvas(400, 400);
}var img;
function setup() {
  createCanvas(400, 400);
  img = loadImage("redb.jpg");
}
function draw() {
  background(220);
  point(100, 100);
  ellipse(30, 30, 30, 30)
  image(img, 0, 0);
}function setup() {
	createCanvas(400, 400);
}
function draw() {
	background(220);
	ellipse(10,10, 100,100);
}var button;
var capture;
var start;
var countDown = "";
var stillPhoto;
var timerID;
function setup() {
  createCanvas(800,600);
 
  button = createButton('take photo');
  button.position(19, 19);
  button.mousePressed(startPhoto);
  capture = createCapture(VIDEO);
  capture.size(400, 300);
  capture.hide();
  textSize(70);
  fill(0, 0, 255);
  stroke(254, 0, 0);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);
}
function startPhoto() {
  timerID = setInterval(count_down, 1000);
  countDown = 3;
  console.log("eventually this function will take a picture");
}
function count_down() {
  if (countDown == 0) {
    clearInterval(timerID);
  } else {
    countDown--;
  }
}
function draw() {
  background(0);
  image(capture, 0, 0, width, width * capture.height / capture.width);
  var positions = ctracker.getCurrentPosition();
  
  for (var i=0; i<positions.length; i++) {
    fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
    ellipse(positions[i][0], positions[i][1], 5, 5);
  }
  
  
}var arrayOfLines
function preload() {
  arrayOfLines = loadStrings('lilyDemoText.txt');
}
function loaded(result){
  console.log(result);
}
function setup() { 
  createCanvas(400, 400);
  console.log(arrayOfLines[0]);
  blobOfText = join(arrayOfLines," ");
   console.log(blobOfText);
  var my_words = split( blobOfText, " ");
  console.log(my_words.length);
  for (var i = 0; i < my_words.length; i++) {
    console.log("word " + i + " = " + my_words[i]);
  }
 
} 
function draw() { 
  background(220);
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
}var locx;
var locy;
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
	ellipse(locx,locy,20,20);
}
function mouseDragged(){
	locx = mouseX;
	locy = mouseY;
}var circles = [];
function setup() {
  createCanvas(400, 400);
  for (var i = 0; i < 10; i++) {
    circles.push(new Circle(i*40, random(height)-200));
  }
	console.log(circles);
}
function draw() {
  background(220);
  for (var i = 0; i < circles.length; i++) {
    circles[i].move();
  }
}
function Circle(x, y) {
  this.x = x;
  this.y = y;
  this.direction = 1;
  this.speed = 0.0;
  this.gravity = 0.4;
 	this.acceleration = 0.2;
 
  this.move = function() {
    this.y = min(height,this.y + this.direction * this.speed + this.gravity);
    this.speed = this.speed + this.acceleration*this.direction ;
this.x = this.x + random(-0.1,0.1);
    if (this.y >= height) {
      this.direction = -this.direction;
      
    }
    if (this.speed < 0) {
      this.direction = -this.direction;
     
    }
     ellipse(this.x,this.y, 20, 30);
  }
var clientId = '181315555475-9653d9r32lap7pdk89up9coq5ch33gn2.apps.googleusercontent.com';
var apiKey = 'AIzaSyC685JOUJ-WROBLKPIM3RChlDE2AyYERvo';
function setup() {
  createCanvas(400, 400);
  
  console.log("setup");
}
function draw() {
  background(220);
}
function displayInbox() {
  var q = $('#query').val();
  var request = gapi.client.gmail.users.messages.list({
    'userId': 'me',
    'maxResults': 2000,
    'pageToken': pageToken,
    'q': q
  });
  request.execute(function(response) {
    pageToken = response.nextPageToken;
    console.log('asked for page ' + pageToken);
    $.each(response.messages, function() {
      var messageRequest = gapi.client.gmail.users.messages.get({
        'userId': 'me',
        'id': this.id
      });
      messageRequest.execute(gotNewMessage);
    });
  });
  display();
}
function display() {
  concordance.sortByCount();
  var all = "";
  for (var i = 0; i < concordance.keys.length; i++) {
    var key = concordance.keys[i];
    all = all + key + ": " + concordance.dict[key] + "\n";
  }
  $("#show").html(all);
  console.log("display");
}
function checkAuth() {
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: true
  }, handleAuthResult);
}
function handleAuthClick() {
  console.log("handle Authclick");
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: false
  }, handleAuthResult);
  return false;
}
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    loadGmailApi();
    $('#authorize-button').remove();
    $('.table-inbox').removeClass("hidden");
  } else {
    $('#authorize-button').removeClass("hidden");
    $('#authorize-button').on('click', function() {
      handleAuthClick();
    });
  }
}
function loadGmailApi() {
  console.log("load api");
  gapi.client.load('gmail', 'v1', displayInbox);
var clientId = '181315555475-9653d9r32lap7pdk89up9coq5ch33gn2.apps.googleusercontent.com';
var apiKey = 'AIzaSyC685JOUJ-WROBLKPIM3RChlDE2AyYERvo';
var pageToken = '';
var concordance = new Concordance();
function setup() { 
    console.log("here");
  createCanvas(400, 400);
	
      console.log("next");
        displayInbox();
       
  handleClientLoad();
} 
function draw() { 
  background(220);
}
function gotNewMessage(message) {
		 var myString = getBody(message.payload);
		 myString=  myString.substr(0,  myString.indexOf("\nOn"));
  	concordance.process(myString);
 }
 function displayInbox() {
		      var q =  $('#query').val();
          var request = gapi.client.gmail.users.messages.list({
            'userId': 'me',
            'maxResults': 2000,
		          'pageToken' : pageToken,
		            'q' : q
              });
            request.execute(function(response) {
	          pageToken = response.nextPageToken;
        console.log('asked for page ' + pageToken);
          $.each(response.messages, function() {
            var messageRequest = gapi.client.gmail.users.messages.get({
              'userId': 'me',
              'id': this.id
            });
            messageRequest.execute(gotNewMessage);
          });
        });
		  display();
      }
      
function display(){
	 concordance.sortByCount();
			var all = "";
			for(var i = 0; i < concordance.keys.length; i++){
				var key = concordance.keys[i] ;
				all = all + key + ": " + concordance.dict[key] + "\n";
			}
  		$("#show").html(all);
      console.log("display");
}
function Concordance() {
  this.dict = {};
  this.keys = [];
  this.split = function(text) {
    return text.split(/\W+/);
  }
  this.validate = function(token) {
    return /\w{1,}/.test(token);
  }
  this.process = function(data) {
    var tokens = this.split(data);
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i].toLowerCase();
      if (this.validate(token)) {
        this.increment(token);
      }
    }
    console.log("finished Process");
  }
  this.getKeys = function() {
    return this.keys;
  }
  this.getCount = function(word) {
    return this.dict[word];
  }
  this.increment = function(word) {
    if (!this.dict[word]) {
      this.dict[word] = 1;
      this.keys.push(word);
    } else {
      this.dict[word]++;
    }
  }
  this.sortByCount = function() {
    var concordance = this;
    function sorter(a, b) {
      var diff = concordance.getCount(b) - concordance.getCount(a);
      return diff;
    }
    this.keys.sort(sorter);
  }
}
function getHeader(headers, index) {
        var header = '';
        $.each(headers, function(){
          if(this.name === index){
            header = this.value;
          }
        });
        return header;
 }
function getBody(message) {
        var encodedBody = '';
        if(typeof message.parts === 'undefined')
        {
          encodedBody = message.body.data;
        }
        else
        {
        }
		if (encodedBody == null) return '';
        encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
        return decodeURIComponent(escape(window.atob(encodedBody)));
}
function handleClientLoad() {
    console.log("handle Load Client")
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth, 1);
}
function checkAuth() {
        gapi.auth.authorize({
          client_id: clientId,
          scope: scopes,
          immediate: true
        }, handleAuthResult);
}
function handleAuthClick() {
  console.log("handle Authclick");
        gapi.auth.authorize({
          client_id: clientId,
          scope: scopes,
          immediate: false
        }, handleAuthResult);
        return false;
}
function handleAuthResult(authResult) {
        if(authResult && !authResult.error) {
          loadGmailApi();
          $('#authorize-button').remove();
          $('.table-inbox').removeClass("hidden");
        } else {
          $('#authorize-button').removeClass("hidden");
          $('#authorize-button').on('click', function(){
            handleAuthClick();
          });
        }
}
function loadGmailApi() {
        gapi.client.load('gmail', 'v1', displayInbox);
        console.log("load api");
}
var clientID = 'k0mXlf-mhOVhoXx7d2tu-G3jQWZCTJtEwchK7zwk';
var clientSecret = 'nv-yh-nDYmAXIndAk04YKV3vn_RYY2KQ3Fej3xsd';
var accessToken;
function setup() {
  noCanvas();
  var data = {
    'grant_type': 'client_credentials',
    'client_id': clientID,
    'client_secret': clientSecret
  }
  httpPost(baseUrl + 'token', data, "json", success_token, error);
}
function askClarifai() {
  var data = {
    access_token : accessToken.access_token,
  }
  httpGet(baseUrl + 'tag', data, "json", success_tag, error);
}
function success_token (response) {
  console.log("success_token");
  console.log(response);
  accessToken = response;
  askClarifai();
}
function success_tag (response) {
  console.log("success_tag");
  console.log(response);
  results = response["results"];
  tags = results["0"].result.tag.classes
  for (var i = 0; i < tags.length; i++) {
    createP(tags[i]);
  }
}
function error (response) {
  console.log("error");
  console.log(response);
var kinectron = null;
var canvas; 
var ctx; 
var canvas2; 
var ctx2; 
var CANVW = 512;
var CANVH = 256;
var width = window.innerWidth;
var height = window.innerHeight;
var camera, scene, renderer; 
var geometry, texture, mesh;
var geometry2, texture2, mesh2;
function changeCanvas(data) {
  var img1 = new Image;
  ctx.drawImage(img1,0,0, CANVW, CANVH);
  
  var img2 = new Image;
  ctx2.drawImage(img2,0,0, CANVW, CANVH);
}
function init() {
  kinectron = new Kinectron(kinectronIpAddress);
  kinectron.makeConnection();
  kinectron.startMultiFrame(["color", "depth"], changeCanvas);
  canvas = document.getElementById('canvas1');    
  canvas.width = CANVW;
  canvas.height = CANVH;
  ctx = canvas.getContext('2d');
  canvas2 = document.getElementById('canvas2');    
  canvas2.width = CANVW;
  canvas2.height = CANVH;
  ctx2 = canvas2.getContext('2d');
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
  camera.position.z = 500;
  scene.add(camera);
  texture = new THREE.Texture(canvas);
  var material = new THREE.MeshBasicMaterial({ map: texture });
  geometry = new THREE.BoxGeometry( 150, 150, 150 );
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 100, 0 ) );
  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  texture2 = new THREE.Texture(canvas2);
  var material2 = new THREE.MeshBasicMaterial({ map: texture2 });
  geometry2 = new THREE.BoxGeometry( 150, 150, 150 );
  geometry2.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -100, 0 ) );
  mesh2 = new THREE.Mesh( geometry2, material2 );
  scene.add( mesh2 );
  window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
  requestAnimationFrame(animate);
  texture.needsUpdate = true;
  mesh.rotation.y += 0.01;
  
  texture2.needsUpdate = true;
  mesh2.rotation.y += 0.01;
  
  renderer.render(scene, camera);
}
init();
animate();var maskingWord = "XQFBZRMQWGBX";
var words = [
  {"prime":"Tall", "option1":"Woman", "option2":"Man"},
  {"prime":"Small", "option1":"White", "option2":"Black"},
  {"prime":"Irish", "option1":"Dumb", "option2":"Smart"},
  {"prime":"Old", "option1":"Fast", "option2":"Slow"}
  ]
var timePerPrimeShowing = 60;
var timePerPrimeNotShowing = 500;
var currentInterval = 0;
var lastChange = 0;
var maskIt = true;
var whichSet= 0;
  function setup() {
    createCanvas(800, 800);
    textSize(24);
    textAlign(CENTER)
    textFont("Helvetica");
    frameRate(1000);
  }
function draw() {
 
  background(255);
   text ("Click On One of These Words", width/2,50);
  if (maskIt) {
    text(maskingWord, width/2, height/2);
    currentInterval = timePerPrimeNotShowing;
  } else {
    text(words[whichSet].prime, width/2,  height/2);
     currentInterval = timePerPrimeShowing;
  }
  
  if (millis() - lastChange > currentInterval){
    maskIt = ! maskIt;
    lastChange = millis();
  }
  
  text(words[whichSet].option1, width/4, 100);
  line(width/2,80,width/2,150);
  text(words[whichSet].option2, 3*width/4, 100);
}
function mousePressed(){
  if (mouseX > width/2){
  }else{
  }
  whichSet++;
  if (whichSet >= words.length) whichSet = 0;
}var xpos = 30;
var dir = 1;
var speed = 2;
function setup(){
 createCanvas(displayWidth, displayHeight);
 
}
function draw(){
 background(255);
 fill(0,0,0);
 strokeWeight(5);
 line(0,height/2,width,height/2);
 ellipse( 10, height/2,30,30);
 ellipse(xpos,height/2, 80,80);
 xpos = xpos + dir*speed;
}
function mousePressed(){
 xpos = 20;
}var x=0;
var y=0;
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
	x++;
	y++;
	
	ellipse(x,y, 30,30);
  if (y==height){
   x =0;
    y=0;
  }
}var myData;
var elements = [];
var goldenNumber = 100;
function preload() {
  myData = loadJSON("elements.json", gotData);
}
function gotData(data) {
  myData = data;
  for (var i = 0; i < myData.elements.length; i++) {
    elements.push(new Element(myData.elements[i], i * goldenNumber + goldenNumber / 2));
  }
}
function setup() {
  createCanvas(400, 1200);
}
function draw() {
  background(0);
  for (var i = 0; i < elements.length; i++) {
    elements[i].drawElement();
  }
}
function Element(elementInfo, offset) {
  this.nucleus = [];
  this.electrons = [];
  this.orbit = [];
  this.x = goldenNumber;
  this.y = offset;
  for (var i = 0; i < elementInfo.nucleus.length; i++) {
   this.nucleus.push(new Nucleus( ));
  }
  var ringSpacing = (goldenNumber/2)/elementInfo.electrons.length;
  for (var m = 0; m < elementInfo.electrons.length; m++) {
    for (var n = 0; n < elementInfo.electrons[m]; n++) {
      this.electrons.push(new Electron(ringSpacing+ ringSpacing * m, random(2 * PI), 0.1));
    }
  }
  this.drawElement = function() {
    for (var m = 0; m < this.electrons.length; m++) {
      push();
      translate(this.x, this.y);
      this.electrons[m].drawElectron();
      pop();
    }
    for (var i = 0; i < this.nucleus.length; i++) {
      push();
      translate(this.x, this.y);
      this.nucleus[i].drawNucleus();
      this.nucleus[i].jitter();
      pop();
    }
};
function Electron(radius, angle, speed) {
  this.radius = radius;
  this.angle = angle;
  this.speed = speed;
  this.drawElectron = function() {
    push();
    rotate(this.angle);
    fill(255);
    ellipse(this.radius, 0, goldenNumber / 20, goldenNumber / 20);
    pop();
    this.angle = this.angle + this.speed;
  };
}
function Nucleus() {
    this.x = 0;
    this.y = 0;
    this.drawNucleus = function() {
      strokeWeight(1);
      stroke(0);
      fill(255,0,0);
      ellipse(this.x, this.y, 5, 5);
    };
    this.jitter = function() {
      this.x =  min(5,max(-5,this.x + random(-1, 1)));
      this.y = min(5,max(-5,this.y + random(-1, 1)));
    };
}
}
  
  myData = loadJSON("elements.json", gotData);
}
function gotData(data) {
  for (var i = 0; i < data.elements.length; i++) {
   console.log(data.elements[i]);
	}
}
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
}function preload(){
  loadJSON("elements.json",gotData);
}
function gotData(){
}
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
}var myData;
var elements = [];
var goldenNumber = 100;
function preload() {
  myData = loadJSON("elements.json", gotData);
}
function gotData(data) {
  myData = data;
  for (var i = 0; i < myData.elements.length; i++) {
    elements.push(new Element(myData.elements[i], i * goldenNumber + goldenNumber / 2));
  }
}
function setup() {
  createCanvas(400, 1200);
}
function draw() {
  background(0);
  for (var i = 0; i < elements.length; i++) {
    elements[i].drawElement();
  }
}
function Element(elementInfo, offset) {
  this.nucleus = [];
  this.electrons = [];
  this.orbit = [];
  this.x = goldenNumber;
  this.y = offset;
  for (var i = 0; i < elementInfo.nucleus.length; i++) {
    this.nucleus.push(new Nucleus(200,200));
  }
  for (var m = 0; m < elementInfo.electrons.length; m++) {
    for (var n = 0; n < elementInfo.electrons[m]; n++) {
      this.electrons.push(new Electron(goldenNumber / 5 + goldenNumber / 5 * m, random(2 * PI), 0.1));
    }
  }
  this.drawElement = function() {
    for (var m = 0; m < this.electrons.length; m++) {
      push();
      translate(this.x, this.y);
      this.electrons[m].drawElectron();
      pop();
    }
    for (var i = 0; i < this.nucleus.length; i++) {
      push();
      translate(this.x, this.y);
      this.nucleus[i].drawNucleus();
      this.jitter();
      pop();
    }
};
function Electron(radius, angle, speed) {
  this.radius = radius;
  this.angle = angle;
  this.speed = speed;
  this.drawElectron = function() {
    push();
    rotate(this.angle);
    fill(255);
    ellipse(this.radius, 0, goldenNumber / 10, goldenNumber / 10);
    pop();
    this.angle = this.angle + this.speed;
  };
}
  function Nucleus(x,y) {
    this.x = 200;
    this.y = 200;
    this.drawNucleus = function() {
      strokeWeight(1);
      stroke(0);
      fill(255);
      ellipse(this.x, this.y, 15, 15);
    };
    this.jitter = function() {
      this.x = random(195, 210) + random(-1, 1);
      this.y = random(195, 210) + random(-1, 1);
    };
}
}
  
var elements = [];
function preload() {
  myData = loadJSON("elements.json", gotData);
}
function gotData(data) {
  for (var i = 0; i < data.elements.length; i++) {
    elements.push(new Element(data.elements[i], elementSize/2 + i*elementSize));
  }
}
function setup() {
  createCanvas(400, elementSize* elements.length);
  background(0);
}
function draw() {
  background(127);
  
  for (var i = 0; i < elements.length; i++) {
    
   elements[i].drawElement();
  }
}
function Element(elementInfo, y) {
  this.nucleus = [];
  this.electrons = [];
  this.orbit = [];
  this.elementY = y;
  console.log(elementInfo);
  for (var m = 0; m <  elementInfo.electrons.length; m++) {
    var numberOfElectrons = elementInfo.electrons[m];
    for(var j = 0; j < numberOfElectrons; j++){
    	this.electrons.push(new Electron(m*15+15, j*2*PI/numberOfElectrons, 0.01 + random(0.05)));
    }
    
  }
  this.drawElement = function() {
  push();
  translate(elementSize, this.elementY );
  for (var m = 0; m < this.electrons.length; m++) {
     this.electrons[m].drawElectron();
    }
    pop();
  };
}
function Electron(radius, angle, speed) {
  this.radius = radius;
  this.angle = angle;
  this.speed = speed;
  this.drawElectron = function() {
    push();
    rotate(this.angle);
    fill(255);
    ellipse(this.radius, 0, 5, 5);
    pop();
    this.angle = this.angle + this.speed;
  };
}
var elements = [];
function preload() {
  myData = loadJSON("elements.json", gotData);
}
function gotData(data) {
  for (var i = 0; i < data.elements.length; i++) {
    elements.push(new Element(data.elements[i]), i);
  }
}
function setup() {
  createCanvas(400, 900);
  background(0);
}
function draw() {
  for (var i = 0; i < elements.length; i++) {
    
  }
}
function Element(elementInfo, y) {
  this.nucleus = [];
  this.electrons = [];
  this.orbit = [];
  this.elementY = y*200;
  for (var m = 0; m <  elementInfo.electrons.length; m++) {
    this.electrons.push(new Electron(30, 0, 0.1));
  }
  
  this.drawElement = function() {
    for (var m = 0; m < this.electrons.length; m++) {
      this.electrons[m].drawElectron(this.elementY);
    }
  };
  
}
function Electron(radius, angle, speed) {
  this.radius = radius;
  this.angle = angle;
  this.speed = speed;
  this.drawElectron = function(yLocation) {
    push();
    translate(200, yLocation);
    rotate(this.angle);
    fill(255);
    ellipse(this.radius, 0, 20, 20);
    pop();
    this.angle = this.angle + this.speed;
  };
}
var kinectron = null;
var backgrnd ;  
var pg;
function preload(){
   backgrnd = loadImage("beach.jpg");
}
function setup() {
	createCanvas(630, 420, WEBGL);
	kinectron = new Kinectron('172.16.222.243');
	kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
}
function draw() {
}
function trackBody(body) {
  var val = body.joints[kinectron.HEAD].depthX;
	var x = map(val,0,1,0,width);
  var val  = body.joints[kinectron.HEAD].depthY;
  var y = map(val,0,1,0,height);
  var val  = body.joints[kinectron.NECK].orientationZ;
  var rot = map(val,0,1,-PI,PI);
  var words = ["occupation","race","age","gender"];
  var word = random(words);
  translate(x,y,300);
    rotateZ(rot);
     pg.background(255);
    pg.text('hello world!', 50, 50);
    texture(pg);
    plane(100);
    
  }
var kinectron = null;
function preload(){
}
function setup() {
	createCanvas(500, 500);
  var address = {host: '172.16.222.243', port: 9001, path: '/'};
	kinectron = new Kinectron('kinectron',address);
	kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
  
  
}
function draw() {
}
function trackBody(body) {
  background(0);
  var val = body.joints[kinectron.HEAD].depthX;
	var x = map(val,0,1,0,width);
  var val  = body.joints[kinectron.HEAD].depthY;
  var y = map(val,0,1,height,0);
  var val  = body.joints[kinectron.HEAD].rotationY;
  var rot = map(val,0,1,height,0);
  var words = ["occupation","race","age","gender"];
  var word = random(words);
	fill(255);
  text(word, x,y);
	fill(0);
	stroke(255);
	rect(x,y,50,100);
}
function mouseDragged(){
	  background(0);
	  var words = ["occupation","race","age","gender"];
  var word = random(words);
	fill(255);
  text(word, mouseX,50);
	fill(0);
	stroke(255);
	rect(mouseX,50,50,100);
	
}var kinectron = null;
var backgrnd ;
function preload(){
}
function setup() {
	createCanvas(630, 420);
	kinectron = new Kinectron('172.16.224.110');
	kinectron.makeConnection();
  kinectron.startKey(gotData);
}
function draw() {
}
function gotData(data){
  loadImage(data.src,gotImage);
}
function gotImage(img){
  image(backgrnd,0,0);
  image(img,0,0);
}
var kinectron = null;
var xLoc = 0;
var yLoc = 100;
var xDir = 1;
function preload(){
}
function setup() {
	createCanvas(640, 480,WEBGL);
  var address = {host: '172.16.222.243', port: 9001, path: '/'};
	kinectron = new Kinectron('kinectron',address);
	kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
}
function draw() {
}
function trackBody(body) {
    var val;
  	val = body.joints[kinectron.HANDRIGHT].cameraX;
  	rightHandX =  map(val,-1,1,0,width);
  	val = body.joints[kinectron.HANDRIGHT].cameraY;
		val = body.joints[kinectron.HANDRIGHT].cameraZ;
  	rightHandZ = map(val,0,3,0,500); 
    translate(rightHandX,rightHandY,rightHandZ);
  box(50,50,50);
}
var kinectron = null;
function preload() {
}
function setup() {
  createCanvas(640, 480, WEBGL);
  var address = {
    host: '172.16.219.19',
    port: 9001,
    path: '/'
  };
  kinectron = new Kinectron('kinectron', address);
  kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
}
function draw() {
}
function trackBody(body) {
  var val;
  var whichJoint = kinectron.HANDRIGHT;
  val = body.joints[whichJoint].cameraX;
  var jointX = map(val, -1, 1, 0, width);
  val = body.joints[whichJoint].cameraY;
  val = body.joints[whichJoint].cameraZ;
  var jointZ = map(val, 0, 3, 800, 0);
  translate(jointX - width / 2, jointY - height / 2, jointZ);
  val = body.joints[whichJoint].orientationX;
  var jointRotX = map(val, 0, 1, 0, 2 * PI);
  val = body.joints[whichJoint].orientationY;
  val = body.joints[whichJoint].orientationZ;
  var jointRotZ = map(val, -1, 1, 0, 2 * PI);
  rotateX(jointRotZ);
  rotateY(jointRotX);
  rotateZ(jointRotY);
  box(50, 100, 50);
}
var kinectron = null;
var xLoc = 0;
var yLoc = 100;
var xDir = 1;
function preload(){
}
function setup() {
	createCanvas(640, 480);
  var address = {host: '172.16.219.19', port: 9001, path: '/'};
	kinectron = new Kinectron('kinectron',address);
	kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
}
function draw() {
    background(255);
  	xLoc = xLoc + xDir;
  	if ( xLoc > width ){
      xDir = - xDir;
    }
  	fill(0,255,0);
 		ellipse(xLoc,yLoc,20,20);
  	fill(255,0,0);
  	ellipse(rightHandX,rightHandY, 20,20);
  	if(dist(xLoc,yLoc,rightHandX,rightHandY) < 20){
      xDir= xDir*1.1
    }
}
function trackBody(body) {
    var val;
  	val = body.joints[kinectron.HANDRIGHT].depthX;
  	rightHandX =  map(val,0,1,0,width);
  	val = body.joints[kinectron.HANDRIGHT].depthY;
  
}
var kinectron = null;
function preload(){
}
function setup() {
	createCanvas(640, 480);
  var address = {host: '172.16.219.19', port: 9001, path: '/'};
	kinectron = new Kinectron('kinectron',address);
	kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
}
function draw() {
}
function trackBody(body) {
  
  if (body.bodyIndex == 0){
    fill(255,0,0);
  }else if (body.bodyIndex == 1){
    fill(255,0,255);
  }else if (body.bodyIndex == 2){
    fill(255,255,0);
  }else if (body.bodyIndex == 3){
    fill(0,255,0);
  }else if (body.bodyIndex == 4){
    fill(0,255,255);
  }else if (body.bodyIndex == 5){
  	fill(0,0,255);
  }
  var val;
  val = body.joints[kinectron.HANDRIGHT].depthX;
  var rightHandX =  map(val,0,1,0,width);
  val = body.joints[kinectron.HANDRIGHT].depthY;
  ellipse(rightHandX, rightHandY, 20,20);
  
}
var kinectron = null;
var myImage;
function preload(){
  myImage = loadImage("cute.jpg");
}
function setup() {
	createCanvas(640, 480);
  var address = {host: '172.16.219.19', port: 9001, path: '/'};
	kinectron = new Kinectron('kinectron',address);
	kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
}
function draw() {
    background(255);
  	image(myImage,rightHandX,rightHandY, 100,100);
}
function trackBody(body) {
    var val;
  	val = body.joints[kinectron.HANDRIGHT].depthX;
  	rightHandX =  map(val,0,1,0,width);
  	val = body.joints[kinectron.HANDRIGHT].depthY;
  }
  
}
var kinectron = null;
var lightImage;
function preload(){
  lightImage = loadImage("light.jpg");
}
function setup() {
	createCanvas(500, 500);
  var address = {host: '172.17.47.213', port: 9001, path: '/'};
	kinectron = new Kinectron('kinectron',address);
	kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
}
function draw() {
}
function trackBody(body) {
  var val = body.joints[kinectron.HANDLEFT].depthX;
  var leftX =  map(val,0,1,0,width);
  val = body.joints[kinectron.HANDLEFT].depthY;
  var leftY = map(val,0,1,0,height);
  val = body.joints[kinectron.HANDRIGHT].depthX;
  var rightX = map(val,0,1,0,width);
  val = body.joints[kinectron.HANDRIGHT].depthY;
  var rightY = map(val,0,1,0,height);
  imageMode(CORNERS);
 	image(lightImage,leftX,leftY,rightX,rightY);
var x = 0;
var y = 0;
var vx = 0;
var vy = 0;
var ax = 0;
var ay = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log('gravity');
}
function draw() {
  background(255);
  ax = map(rotationY, -90, 90, -1, 1);
  ay = map(rotationX, -90, 90, -1, 1);
  vx = vx + ax;
  vy = vy + ay;
  y = y + vy;
  x = x + vx;
  
  vx = vx * 0.99;
  vy = vy * 0.99;
  if (x < 0) {
    x = 0;
    vx = -vx;
  }
  if (y < 0) {
    y = 0;
    vy = -vy;
  }
  if (x > width) {
    x = width;
    vx = -vx;
  }
  if (y > height) {
    y = height;
    vy = -vy;
  }
  ellipse(x, y, 30, 30);
var colors;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
  colors = [color(255,0,0), color(0,255,0), color(0,0,255), color(255, 255,0), color(0,255,255)];
}
function draw() {
  for (var i = 0; i < touches.length; i++) {
    noStroke();
    fill(colors[i]);
    ellipse(touches[i].x, touches[i].y, 24, 24);
  }
}
function touchMoved() {
  return false;
}
var colors;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
  colors = [color(255,0,0), color(0,255,0), color(0,0,255), color(255, 255,0), color(0,255,255)];
}
function draw() {
  for (var i = 0; i < touches.length; i++) {
    noStroke();
    fill(colors[i]);
    ellipse(touches[i].x, touches[i].y, 24, 24);
  }
}
function touchMoved() {
  return false;
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
}
function touchMoved() {
  strokeWeight(10);
  stroke(255,0,0);
  line(mouseX, mouseY, pmouseX, pmouseY);
  return false;
}
var kinectron = null;
function preload(){
}
function setup() {
	createCanvas(500, 500);
  var address = {host: '172.16.219.19', port: 9001, path: '/'};
	kinectron = new Kinectron('kinectron',address);
	kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
}
function draw() {
}
function trackBody(body) {
  background(0);
  var val = body.joints[kinectron.HANDRIGHT].cameraZ;
  var brightness = map(val,0,3,0,255);
  background(brightness);
}var myImage;
function preload(){
    myImage = loadImage('pumpkin.jpg');
}
function setup() { 
  createCanvas(400, 400);
	
  
}
function draw() { 
  background(255);
  image(myImage,mouseX, mouseY, 100,100);
}
function mouseDragged(){
}var mySound;
function preload(){
    mySound = loadSound('Taylor Swift - Shake It Off.mp3');
}
function setup() { 
  createCanvas(400, 400);
		mySound.play();
  
}
function draw() { 
  background(220);
}
function mouseDragged(){
  mySound.amp(mouseX/width);
}var mySound;
function preload(){
    mySound = loadSound('Taylor Swift - Shake It Off.mp3');
}
function setup() { 
  createCanvas(400, 400);
		mySound.play();
  
}
function draw() { 
  background(220);
}
function mouseDragged(){
  mySound.amp(mouseX/width);
}var mySound;
function setup() { 
  createCanvas(400, 400);
  mySound = loadSound("Taylor Swift - Shake It Off.mp3");
  mySound.play();
} 
function draw() { 
}
function mouseDragged(){
  ellipse(mouseX,mouseY,20,20);
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
		ellipse(width/2, height/2, 200,200);
}var slider;
var movie;
function preload(){
    movie = createVideo('transit.mov');
}
function setup() {
  createCanvas(640, 360);
  movie.play();
 movie.hide();
  slider = createSlider(0,1,0.5,0.1);
  slider.changed(sliderChanged);
}
function draw() {
  background(0);
  image(movie, 0, 0, width, height);
}
function sliderChanged(){
  movie.time(movie.duration()*slider.value());
}var kinectron = null;
var mySound;
function preload(){
  mySound = loadSound("Taylor Swift - Shake It Off.mp3");
}
function setup() {
	createCanvas(500, 500);
  var address = {host: '172.16.222.243', port: 9001, path: '/'};
	kinectron = new Kinectron('kinectron',address);
	kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
  mySound.play();
  
}
function draw() {
}
function trackBody(body) {
  background(0);
  var val = body.joints[kinectron.HANDRIGHT].cameraZ;
  var vol = map(val,0,4,0,1);
  mySound.amp(vol);
}var films = [];
var filmData;
function preload() {
  var url = 'karly.json';
  filmData = loadJSON(url);
}
function setup() {
  createCanvas(500, 175);
  for (var i = 0; i < filmData.length; i++) {
    var o = filmData[i];
    films[i] = new Film(o);
  }
  noStroke();
}
function draw() {
  background(0);
  for (var i = 0; i < films.length; i++) {
    var x = i * 32 + 32;
    films[i].display(x, 105);
  }
}
function Film(f) {
  this.title = f.title;
  this.month = f.month;
  this.year = f.year;
  this.rating = f.rating;
  this.budget = f.budget;
  this.display = function(x, y) {
    var ratingGray = map(this.rating, 6.5, 8.1, 102, 255);
    push();
    translate(x, y);
    rotate(-QUARTER_PI);
    fill(255);
    text(this.title, 0, 0);
    pop();
  };
}function setup() {
	createCanvas(200, 200);
}
function draw() {
	background(255);
	fill(255,0,0);
	ellipse(mouseX,mouseY, 20,20);
}function setup() {
	createCanvas(200, 200);
}
function draw() {
	if (mouseX > width / 2) {
		background(255, 0, 255);
	} else {
		background(255, 255, 0);
	}
	text("Move Mouse Across Middle", 10, height/2);
}var circleWidth = 30;
function setup() { 
  createCanvas(200, 200);
} 
function draw() { 
  var distanceFromMiddle = dist(mouseX, mouseY, width/2, height/2);
	if(distanceFromMiddle < circleWidth){
  	background(255,0,0);
	}else{
		background(0,255,255);
	}
	ellipse(width/2,height/2,circleWidth, circleWidth);
}var periodic;
function setup() { 
  createCanvas(400, 400);
  loadJSON("periodic.js", gotData);
} 
function gotData(incoming){
  periodic = incoming;
  
}
function draw() { 
  background(220);
}var kinectron = null;
var lightImage;
function preload(){
  lightImage = loadImage("light.jpg");
}
function setup() {
	createCanvas(500, 500);
  var address = {host: '172.16.219.19', port: 9001, path: '/'};
	kinectron = new Kinectron('kinectron',address);
	kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
}
function draw() {
}
function trackBody(body) {
	background(255);
  var val = body.joints[kinectron.HANDLEFT].depthX;
  var leftX =  map(val,0,1,0,width);
  val = body.joints[kinectron.HANDLEFT].depthY;
  var leftY = map(val,0,1,0,height);
  val = body.joints[kinectron.HANDRIGHT].depthX;
  var rightX = map(val,0,1,0,width);
  val = body.joints[kinectron.HANDRIGHT].depthY;
  var rightY = map(val,0,1,0,height);
  imageMode(CORNERS);
 	image(lightImage,leftX,leftY,rightX,rightY);
}var kinectron = null;
var x;
function setup() {
	createCanvas(500, 500);
  var address = {host: '172.16.216.165', port: 9001, path: '/'};
	kinectron = new Kinectron('kinectron',address);
	kinectron.makeConnection();
	kinectron.startTrackedBodies(bodyTracked);
}
function draw() {
  background(0);
 	ellipse(x,100,20,20);
}
function bodyTracked(body) {
  x = body.joints[3].colorX;
  x = map(x,0,1,0,width);
}
var xPos = 30;
var yPos = 30;
var xDir = 1;
var yDir = -1
function setup() { 
  createCanvas(200, 200);
} 
function draw() { 
  background(255,0,255);
  xPos = xPos + xDir;
  yPos = yPos + yDir;
  ellipse(xPos, yPos, 20,20);
  if (xPos < 0 || xPos > width){
     xDir = -xDir; 
  }
  if (yPos < 0 || yPos > height){
     yDir = -yDir; 
  }
}var mySound;
function preload() {
  mySound = loadSound('Taylor Swift - Shake It Off.mp3');
}
function setup() {
  createCanvas(400, 400);
  mySound.loop();
  mySound.setVolume(0);
}
function draw() {
  background(255);
  ellipse(width / 2, height / 2, 50, 50);
  text("drag to center to make louder", 100, 100);
}
function mouseDragged() {
  var distanceFromCenter = dist(mouseX, mouseY, width / 2, height / 2);
  var volume = map(distanceFromCenter, 0, 200, 1, 0);
  mySound.setVolume(volume);
}var xPoooo;
function setup() {
  createCanvas(500, 500);
  xPoooo = 200;
}
function draw() {
  background(255, 255, 0);
  if (mouseX > width / 3 && mouseX < width * 2 / 3) {
    fill(255, 0, 0);
  } else {
    fill(0, 0, 255);
  }
  ellipse(xPoooo, height/2, 50, 50);
  xPoooo = xPoooo + 1;
  
  if (xPoooo > width){
    xPoooo = 0;
  }
}var myCanvas = null;
var kinectron = null;
var start = 30;
var target = 100;
var diameter = start;
var light = 255;
var dark = 100;
var hueValue = light;
var lerpAmt = 0.3;
var state = 'ascending';
function setup() {
	myCanvas = createCanvas(500, 500);
	background(0);
	noStroke();
	kinectron = new Kinectron('kinectron',{host: '172.16.216.165', port: 9001, path: '/'});
	kinectron.makeConnection();
     kinectron.getHands(drawHands);
}
function draw() {
}
function bodyTracked(body) {
  background(0, 20);
  kinectron.getJoints(drawJoint); 
  kinectron.getHands(drawHands);
}
function drawJoint(joint) {
  fill(100);
  ellipse(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, 15, 15);
  
  fill(200);
  ellipse(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, 3, 3);
}
function drawHands(hands) {
	
  if ( (Math.abs(hands.leftHand.depthX - hands.rightHand.depthX) < 0.01) && (Math.abs(hands.leftHand.depthY - hands.rightHand.depthY) < 0.01)) {
  	hands.leftHandState = 'clapping';
  	hands.rightHandState = 'clapping';
  }
  updateHandState(hands.leftHandState, hands.leftHand);
  updateHandState(hands.rightHandState, hands.rightHand);
}
function updateHandState(handState, hand) {
  switch (handState) {
    case 'closed':
      drawHand(hand, 1, 255);
    break;
    case 'open':
      drawHand(hand, 0, 255);
    break;
    case 'lasso':
      drawHand(hand, 0, 255);
    break;
    case 'clapping':
    	drawHand(hand, 1, 'red');
	}
}
function drawHand(hand, handState, color) {
 
  if (handState === 1) {
    state = 'ascending';
  }
  
  if (handState === 0 ) {
    state = 'descending';
  }
  
  if (state == 'ascending') {
    diameter = lerp(diameter, target, lerpAmt);
    hueValue = lerp(hueValue, dark, lerpAmt);
  }
  
  if (state == 'descending') {
    diameter = lerp(diameter, start, lerpAmt);
    hueValue = lerp(hueValue, light, lerpAmt);
  }
  
  fill(color);
  ellipse(hand.depthX * myCanvas.width, hand.depthY * myCanvas.height, diameter, diameter);  
}var myCanvas = null;
var kinectron = null;
var start = 30;
var target = 100;
var diameter = start;
var light = 255;
var dark = 100;
var hueValue = light;
var lerpAmt = 0.3;
var state = 'ascending';
function setup() {
	myCanvas = createCanvas(500, 500);
	background(0);
	noStroke();
	kinectron = new Kinectron('kinectron',{host: '172.16.216.112', port: 9001, path: '/'});
	kinectron.makeConnection();
	kinectron.startTrackedBodies(bodyTracked);
}
function draw() {
}
function bodyTracked(body) {
  background(0, 20);
  kinectron.getJoints(drawJoint); 
  kinectron.getHands(drawHands);
}
function drawJoint(joint) {
  fill(100);
  ellipse(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, 15, 15);
  
  fill(200);
  ellipse(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, 3, 3);
}
function drawHands(hands) {
	
  if ( (Math.abs(hands.leftHand.depthX - hands.rightHand.depthX) < 0.01) && (Math.abs(hands.leftHand.depthY - hands.rightHand.depthY) < 0.01)) {
  	hands.leftHandState = 'clapping';
  	hands.rightHandState = 'clapping';
  }
  updateHandState(hands.leftHandState, hands.leftHand);
  updateHandState(hands.rightHandState, hands.rightHand);
}
function updateHandState(handState, hand) {
  switch (handState) {
    case 'closed':
      drawHand(hand, 1, 255);
    break;
    case 'open':
      drawHand(hand, 0, 255);
    break;
    case 'lasso':
      drawHand(hand, 0, 255);
    break;
    case 'clapping':
    	drawHand(hand, 1, 'red');
	}
}
function drawHand(hand, handState, color) {
 
  if (handState === 1) {
    state = 'ascending';
  }
  
  if (handState === 0 ) {
    state = 'descending';
  }
  
  if (state == 'ascending') {
    diameter = lerp(diameter, target, lerpAmt);
    hueValue = lerp(hueValue, dark, lerpAmt);
  }
  
  if (state == 'descending') {
    diameter = lerp(diameter, start, lerpAmt);
    hueValue = lerp(hueValue, light, lerpAmt);
  }
  
  fill(color);
  ellipse(hand.depthX * myCanvas.width, hand.depthY * myCanvas.height, diameter, diameter);  
var offset = 0;
var sliders = [];
function setup() {
  noCanvas();
  for (var i = 0; i < 200; i++) {
    var slider = createSlider(0, 100, 50);
    sliders.push(slider);
  }
}
function draw() {
  for (var i = 0; i < sliders.length; i++) {
    var angle = offset + i / 46;
    var n = map(sin(angle), -1, 1, 0, 100);
    sliders[i].value(n);
  }
  offset += 0.1;
}
var myCanvas = null;
var kinectron = null;
var start = 30;
var target = 100;
var diameter = start;
var light = 255;
var dark = 100;
var hueValue = light;
var lerpAmt = 0.3;
var state = 'ascending';
var server =  {
    "host": "172.16.216.112",
    "port": "9001",
    "path": "/"
  };
function setup() {
	myCanvas = createCanvas(500,500);
	background(0);
	noStroke();
	kinectron = new Kinectron(server);
	kinectron.makeConnection();
	kinectron.startTrackedBodies(bodyTracked);
}
function draw() {
}
function allBodies(bodies) {
  console.log(bodies);
}
function bodyTracked(body) {
  background(0, 20);
  kinectron.getJoints(drawJoint); 
  kinectron.getHands(drawHands);
}
function drawJoint(joint) {
  fill(100);
  ellipse(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, 15, 15);
  
  fill(200);
  ellipse(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, 3, 3);
}
function drawHands(hands) {
	
  if ( (Math.abs(hands.leftHand.depthX - hands.rightHand.depthX) < 0.01) && (Math.abs(hands.leftHand.depthY - hands.rightHand.depthY) < 0.01)) {
  	hands.leftHandState = 'clapping';
  	hands.rightHandState = 'clapping';
  }
  updateHandState(hands.leftHandState, hands.leftHand);
  updateHandState(hands.rightHandState, hands.rightHand);
}
function updateHandState(handState, hand) {
  switch (handState) {
    case 'closed':
      drawHand(hand, 1, 255);
    break;
    case 'open':
      drawHand(hand, 0, 255);
    break;
    case 'lasso':
      drawHand(hand, 0, 255);
    break;
    case 'clapping':
    	drawHand(hand, 1, 'red');
	}
}
function drawHand(hand, handState, color) {
 
  if (handState === 1) {
    state = 'ascending';
  }
  
  if (handState === 0 ) {
    state = 'descending';
  }
  
  if (state == 'ascending') {
    diameter = lerp(diameter, target, lerpAmt);
    hueValue = lerp(hueValue, dark, lerpAmt);
  }
  
  if (state == 'descending') {
    diameter = lerp(diameter, start, lerpAmt);
    hueValue = lerp(hueValue, light, lerpAmt);
  }
  
  fill(color);
  ellipse(hand.depthX * myCanvas.width, hand.depthY * myCanvas.height, diameter, diameter);  
var puppy ;
var lastSensorValue = 0;
var yDir = 0;
var xLoc = 0;
var yLoc = 150;
function preload(){
  puppy = loadImage("shiffman.png"); 
}
function setup() {
  createCanvas(320, 240);
  yLoc = height*2/3;
}
function draw() {
  noStroke();
  fill(100,0,0);
  rect(0,0,width/10,height);
  fill(100,0,0);
  rect(width-width/10,0,width/10,height);
  fill(100,100,255);
  rect(width/10,0,width-2*width/10,height);
	fill(255);
  xLoc = xLoc + .3;
  yLoc = yLoc + yDir;
    image(puppy,xLoc-puppy.width,yLoc-puppy.height/2);
  fill(100,100,255);
  rect(width/10,height*2/3,width-2*width/10,height);
  text(sensorValue, 20, 20);
}
 for (var i = 0; i < portList.length; i++) {
 }
}
	if (inString.length > 0) {
	  inString = inString.trim();
		sensorValue = Number(inString);
      if (lastSensorValue - sensorValue > 0)
    {
      yDir =1;
    }else if (lastSensorValue - sensorValue < 0){
      yDir = -1;
    }
    lastSensorValue = sensorValue;
	}
}
function setup() {
  createCanvas(320, 240);
}
function draw() {
  background("#2307AF");
	fill(255);
	ellipse(sensorValue, height/2, 20, 20);
  text(sensorValue, 20, 20);
}
 for (var i = 0; i < portList.length; i++) {
 }
}
	if (inString.length > 0) {
	  inString = inString.trim();
		sensorValue = Number(inString);
	}
}
var puppy ;
var lastSensorValue = 0;
var yDir = 0;
var xLoc = 0;
var yLoc = 150;
function preload(){
 puppy = loadImage("puppy.png"); 
}
function setup() {
  createCanvas(320, 240);
  yLoc = height*2/3;
}
function draw() {
  noStroke();
  fill(100,0,0);
  rect(0,0,width/10,height);
  fill(100,0,0);
  rect(width-width/10,0,width/10,height);
  fill(100,100,255);
  rect(width/10,0,width-2*width/10,height);
	fill(255);
  xLoc = xLoc + .3;
  yLoc = yLoc + yDir;
    image(puppy,xLoc-puppy.width,yLoc-puppy.height/2);
  fill(100,100,255);
  rect(width/10,height*2/3,width-2*width/10,height);
  text(sensorValue, 20, 20);
  
}
 for (var i = 0; i < portList.length; i++) {
 }
}
	if (inString.length > 0) {
	  inString = inString.trim();
		sensorValue = Number(inString);
    if (lastSensorValue - sensorValue > 0)
    {
      yDir =1;
    }else if (lastSensorValue - sensorValue < 0){
      yDir = -1;
    }
    lastSensorValue = sensorValue;
	}
}
var myBall;
var gravity = 0.1;
function setup() {
  createCanvas(400, 300);
  myBall = new Ball();
}
function draw() {
  background(0);
  myBall.display();
  myBall.move();
  myBall.bounce();
}
function Ball(){
  
  this.x = 200;
  this.y = 30;
  this.speed =  0;
  
  this.display = function() {
    fill(255);
    ellipse(this.x, this.y, 24, 24);
  };
  this.move =  function() {
    this.y = this.y + this.speed;
    this.speed = this.speed + gravity;
  };
  this.bounce =  function() {
    if (this.y > height) {
      this.speed = this.speed * -0.95;
    }
  };
}
function setup() {
	createCanvas(300, 300);
}
function draw() {
	background(220);
	for (var i = 0; i < 8; i++) {
		rect(i * 30, 0, 30, 100);
	}
}
function mousePressed() {
	for (var i = 0; i < 8; i++) {
		if (mouseX > i*30 && mouseX < i*30 + 30) {
  			
		}
	}
}var ball = {
  x: 200,
  y: 30,
  speed: 0,
  display: function() {
    fill(255);
    ellipse(this.x, this.y, 24, 24);
  },
  move: function() {
    this.y = this.y + this.speed;
    this.speed = this.speed + gravity;
  },
  bounce: function() {
    if (this.y > height) {
      this.speed = this.speed * -0.95;
    }
  }
};
var gravity = 0.1;
function setup() {
  createCanvas(400, 300);
}
function draw() {
  background(0);
  ball.display();
  ball.move();
  ball.bounce();
}
var tswiz;
function preload(){
  twiz = loadSound("Taylor Swift - Shake It Off.mp3");
}
function setup() { 
  createCanvas(400, 400);
   twiz.setVolume(0.1);
  twiz.play();
} 
function draw() { 
  background(220);
}var down_offset = 0;
var up_offset = 7;
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(127);
  moveDown();
	moveUp();
}
function moveDown(){
	  stroke(255,255,0);
	 for(var i = 0; i < height; i = i + 15){
    line(0,i+down_offset,width,i+down_offset);
  }
  down_offset++;
  if (down_offset >= height) down_offset = -height;
  
}
function moveUp(){
	  stroke(255,0,0);
  for(var j = 0; j < height; j = j + 15){
    line(0,j+up_offset,width,j+up_offset);
  }
  up_offset--;
  if (up_offset <= 0) up_offset = height+ 7;
  
}
var x = 0;
function setup() { 
  createCanvas(400, 400);
  fill(0);
  
  
} 
function draw() { 
    ellipse(mouseX,mouseY,10,10);
   ellipse(x,10,10,10);
  x = x + 1;
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  fill(255,0,0)
  ellipse(200,200,10,200);
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  for(var i = 0; i < 70; i= i+ 10){
    ellipse(i,50,20,20);
  }
}var angle = 1;
function setup() { 
  createCanvas(400, 400);
  rectMode(CENTER);
} 
function draw() { 
  background(220);
  push();
  translate(width/2,height/2);
  rotate(angle);
  rect(0,0,100,100);
  angle = angle + radians(2);
  pop();
  ellipse(10,10,100,100);
  
}var x = 0;
var dir = 1;
var speed = 3;
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  translate(x,100); 
  ellipse(20,100,20,20);
  ellipse(30,20,20)
  
  if((x > width) || (x < 0)){
    dir = - dir;
  }
   
stroke(100,0,0);
 x = x + dir*speed;
  
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  ellipse(x,y, w,h);
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
}var x = 0;
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  x = x + 1;
  translate(x,100)
  ellipse(10,100, 20,20);
  rect(20,100,20,20);
}var duckPic ;
function setup() { 
  createCanvas(400, 400);
	duckPic = loadImage("duck.jpg");
} 
function draw() { 
  background(0);
	image(duckPic, mouseX,mouseY, 100,100);
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  fill(255,0,0);
  ellipse(mouseX,mouseY, 20,20);
  
}var duck;
function setup() { 
  createCanvas(400, 400);
  duck = loadImage("duck.jpg");
} 
function draw() { 
  background(220);
  image(duck, 0,0, 100,100);
  arc(50, 55, 50, 50, 0, HALF_PI,CHORD);
}function setup() { 
  createCanvas(500, 500);
	background(127,0,0);
	ellipse(100,100,30,300);
	fill(0);
	ellipse(103,150,20,50);
	fill(255);
	ellipse(200,100,30,300);
	fill(0);
	ellipse(203,160,20,50);
} 
function draw() { 
}