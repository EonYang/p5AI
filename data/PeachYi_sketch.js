let circles = [];
let video;
let slider;
let videoScale = 8;
function setup() { 
  createCanvas (640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size (width/videoScale,height/videoScale);
  video.hide();
  
} 
function draw() { 
  background(0,250);
  
  video.loadPixels();
  loadPixels();
  
  for(let y = 0; y < video.height; y++){
    for(let x = 0; x < video.width; x++){
      let index = (x + y * video.width)*4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
     
      let bright = (r+g+b)/3;
      
      
      
      
      
      
      
      let th1 = 80;
      let indexC = new Circle(x * videoScale, y * videoScale , 50, bright);
      
      if (bright > th1) {
        
      circles.push (indexC);
       
        }
      
      
        
      pixels[index + 0] =  bright;
      pixels[index + 1] =  bright;
      pixels[index + 2] =  bright;
      pixels[index + 3] =  255;
    
    }
  
     for (let i = 0; i < circles.length; i++) {
     circles[i].show();
     circles[i].expand();
 }  
    
    
  }
  
  
 
  
}let circles = [];
let video;
let slider;
let videoScale = 18;
function setup() { 
  createCanvas (640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size (width/videoScale,height/videoScale);
  video.hide();
  
} 
function draw() { 
  background(0,200);
  
  video.loadPixels();
  loadPixels();
  
  for(let y = 0; y < video.height; y++){
    for(let x = 0; x < video.width; x++){
      let index = (x + y * video.width)*4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
     
      let bright = (r+g+b)/3;
      
      
      
      
      
      
      
      let th1 = 50;
      let indexC = new Circle(x * videoScale, y * videoScale , 50, bright);
      
      if (bright > th1) {
        
      circles.push (indexC);
       
        }
      
      if (circles.length > 100) {
        circles.splice(0,1);
      }
      
        
      pixels[index + 0] =  bright;
      pixels[index + 1] =  bright;
      pixels[index + 2] =  bright;
      pixels[index + 3] =  255;
    
    }
  
     for (let i = 0; i < circles.length; i++) {
     circles[i].show();
     circles[i].expand();
 }  
    
    
  }
  
  
 
  
}let circles = [];
let video;
let videoScale = 32;
let th1 = 200;
    
function setup() { 
  createCanvas (640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size (width/videoScale,height/videoScale);
  video.hide();
  
} 
function draw() { 
  background(0);
  
  video.loadPixels();
  loadPixels();
  
  for(let y = 0; y < video.height; y++){
    for(let x = 0; x < video.width; x++){
      let index = (x + y * video.width)*4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
     
      let bright = (r+g+b)/3;
      
      
      
      
      
      
      let circleIndex = new Circle(x * videoScale, y * videoScale , 1);
      
      
      
      if (bright > th1) {
        
      
      circles.push (circleIndex);
       
        }
        
      
      }
      
      
        
      pixels[index + 0] =  bright;
      pixels[index + 1] =  bright;
      pixels[index + 2] =  bright;
      pixels[index + 3] =  255;
    
    }
  
    for (let i = 0; i < circles.length; i++) {
    circles[i].show();
    circles[i].expand();
 }  
      
    for (let i = 0; i < circles2.length; i++) {
    circles2[i].show();
    circles2[i].expand();
      
    
  }
  
  
 
  
}
var read1;
var read2; 
var inData;
var x = 20;
var y = 20;
var dx = 5;
var dy = 5;
function setup() {
  createCanvas(500, 400);
}
function draw() {
  background(200,50);
  strokeWeight(5);
  stroke(0,220 - read1 * 1.5);
  line(read2 - read1 - 8, height - 50, read2 + read1 + 8, height - 50);
  x = x + dx;
  y = y + dy;
  ball(x, y);
  if (x < 20 || x > width - 20) {
    dx = -dx;
  }
  if (y < 20 || (x > read2 - read1 & x < read2 + read1 & y == height - 70)) {
    dy = -dy;
  }
  if ((x <= read2 - read1 & y <= height - 50 & dist(x, y, read2 - read1, height - 50) <= 20) || (x >= read2 + read1 & y <= height - 50 &
      dist(x, y, read2 + read1, height - 50) <= 20)) {
    dx = -dx;
    dy = -dy;
  }
  if (y > height + 25) {
    dy = 0;
    dx = 0;
  }
}
function ball(x, y) {
  fill(255, 0, 0);
  noStroke();
  
  ellipse(x, y, 20, 20);
}
function keyPressed() {
  x = random(20, width - 20);
  y = 20;
  dx = 5;
  dy = 5;
}
function gotData() {
  if (inData.length > 0) {
    var values = inData.split(',');
    read1 = int(values[0]);
    read1 = read1/1.5;
    read2 = int(values[1]);
    read2 = map(read2, 0,255,0,width);
  }
}let video;
let slider;
let videoScale = 32;
function setup() { 
  createCanvas (640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size (width/videoScale,height/videoScale);
  video.hide();
  
} 
function draw() { 
  background(0);
  
  video.loadPixels();
  loadPixels();
  
  for(let y = 0; y < video.height; y++){
    for(let x = 0; x < video.width; x++){
      let index = (x + y * video.width)*4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
     
      let bright = (r+g+b)/3;
      
      
      let pie = map(bright, 0,255,0,6);
      
      
      noStroke();
      fill(255,bright,bright,255);
      
      arc(x * videoScale, y * videoScale, videoScale, videoScale, 0, pie, PIE);
      
      
        
      pixels[index + 0] =  bright;
      pixels[index + 1] =  bright;
      pixels[index + 2] =  bright;
      pixels[index + 3] =  255;
    
    }
  
    
  }
  
  
 
  
}let video;
let videoScale = 16;
let slider
function setup() { 
  createCanvas (640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size (width/videoScale,height/videoScale);
  slider = createSlider(8,64,16);
} 
function draw() { 
  background(0);
  
  video.loadPixels();
  loadPixels();
  
  for(let y = 0; y < video.height; y++){
    for(let x = 0; x < video.width; x++){
      let index = (x + y * video.width)*4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      
      let bright = (r+g+b)/3;
      
      fill(bright,bright,0,200);
      ellipseMode(CENTER);
      ellipse(x * videoScale,y * videoScale,videoScale,videoScale)
      
      
        
      pixels[index + 0] =  bright;
      pixels[index + 1] =  bright;
      pixels[index + 2] =  bright;
      pixels[index + 3] =  255;
    }
   
    videoScale = slider.value();
  
  }
  
 
  
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  var p
  background(220);
  noStroke();
  a = map(mouseX,0,400,0,255);
  fill(a);
  p= map(mouseX, 0,400,0,5);
  
  arc(100, 100, 80, 80, 0, p, PIE);
let input;
function setup() {
  noCanvas();
  input = createInput('rainbow');
  button = createButton('search');
  button.mousePressed(search);
}
function search() {
  let term = input.value();
   
          + 'q=' + term;
          +'&'
          +'b8132257-3655-40df-8df9-0b92b6423e28'
          
  console.log(url);
  loadJSON(url, gotData);
}
function gotData(data) {
  console.log(data);
  docs = data.response.docs;
  for (let i = 0; i < docs.length; i++) {
    let headline = createElement('h3', '');
    let link = createA(docs[i].web_url, docs[i].headline.main);var portName = '/dev/cu.usbmodem1421';
var read1;
var read2; 
var inData;
var x = 20;
var y = 20;
var dx = 5;
var dy = 5;
function setup() {
  createCanvas(500, 400);
}
function draw() {
  background(220);
  stroke(0, 0, 255)
  line(read2 - read1 - 8, height - 50, read2 + read1 + 8, height - 50);
  x = x + dx;
  y = y + dy;
  ball(x, y);
  if (x < 20 || x > width - 20) {
    dx = -dx;
  }
  if (y < 20 || (x > read2 - read1 & x < read2 + read1 & y == height - 70)) {
    dy = -dy;
  }
  if ((x <= read2 - read1 & y <= height - 50 & dist(x, y, read2 - read1, height - 50) <= 20) || (x >= read2 + read1 & y <= height - 50 &
      dist(x, y, read2 + read1, height - 50) <= 20)) {
    dx = -dx;
    dy = -dy;
  }
  if (y > height + 25) {
    dy = 0;
    dx = 0;
  }
}
function ball(x, y) {
  fill(255, 0, 0);
  noStroke();
  strokeWeight(5);
  ellipse(x, y, 20, 20);
}
function keyPressed() {
  x = random(20, width - 20);
  y = 20;
  dx = 5;
  dy = 5;
}
function gotData() {
  if (inData.length > 0) {
    var values = inData.split(',');
    read1 = int(values[0]);
    read2 = int(values[1]);
    read2 = map(read2, 0,255,0,width);
  }
}var portName = '/dev/cu.usbmodem1421';
var read1;
var read2; 
var inData;
var x = 20;
var y = 20;
var dx = 5;
var dy = 5;
function setup() {
  createCanvas(500, 400);
}
function draw() {
  background(220);
  stroke(0, 0, 255)
  line(read2 - read1 - 8, height - 50, read2 + read1 + 8, height - 50);
  x = x + dx;
  y = y + dy;
  ball(x, y);
  if (x < 20 || x > width - 20) {
    dx = -dx;
  }
  if (y < 20 || (x > mouseX - read1 & x < mouseX + read1 & y == height - 70)) {
    dy = -dy;
  }
  if ((x <= mouseX - read1 & y <= height - 50 & dist(x, y, mouseX - read1, height - 50) <= 20) || (x >= mouseX + read1 & y <= height - 50 &
      dist(x, y, mouseX + read1, height - 50) <= 20)) {
    dx = -dx;
    dy = -dy;
  }
  if (y > height + 25) {
    dy = 0;
    dx = 0;
  }
}
function ball(x, y) {
  fill(255, 0, 0);
  noStroke();
  strokeWeight(5);
  ellipse(x, y, 20, 20);
}
function keyPressed() {
  x = random(20, width - 20);
  y = 20;
  dx = 5;
  dy = 5;
}
function gotData() {
  if (inData.length > 0) {
    var values = inData.split(',');
    read1 = int(values[0]);
    read2 = int(values[1]);
    read2 = map(read2, 0,255,0,width);
  }
}
  var x=20;
  var y=20;
  var dx=7;
  var dy=7;
function setup() { 
  createCanvas(500, 400);
} 
function draw() { 
  background(150);
  fill(255,0,0);
  noStroke();
  rectMode(CENTER);
  rect(mouseX-30,height-50,50,20);
  x=x+dx;
  y=y+dy;
  ball(x,y);
 
 
  if(x<20||x>width-20){
	  dx=-dx;
	}
  if(y<20||(x>mouseX-30 & x<mouseX+30 & y==height-70)){
	  dy=-dy;
	}
  if((x<=mouseX-30 & y<=height-50 & dist(x,y,mouseX-30,height-50)     <=20)||(x>=mouseX+30 & y<=height-50 &  
		dist(x,y,mouseX+30,height-50)<=20)){
	  dx=-dx;
		dy=-dy;
	}
  if(y>height+25){
		dy=0;
		dx=0;
  } 
}
function ball(x,y){
  fill(255,0,0);
	noStroke();
  strokeWeight(3);  
  ellipse(x,y,30,30);
}
function keyPressed(){
  x=random(20,width-20);
  y=20;
  dx=7;
  dy=7;       
}
 
var portName = '/dev/cu.usbmodem1421';
var ew = 20;
var read1;
var read2;
function setup() { 
  createCanvas(500, 500);
  
} 
function draw() { 
  background(220);
  
  
    noStroke();
    fill(255,0,0,50 + read1);
    ellipse(250,250,ew + read1);
    fill(255,50,10,50 + read2);
    ellipse(300,300,ew + read2);
}
function gotData(){
  if (inData.length > 0){
    
   
    var values = inData.split('&');
   
    
    read1 = int(values[0]);
    read2 = int(values[1]);
  }
  
}function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
  background(220);
  fill(255,0,0)
  noStroke();
  rectMode(CENTER);
  rect(mouseX,height-50,50,10);
  
  
var x = width/2;
var y = height/2;
var xspeed = 5;
var yspeed = 2;
var r = 5;
  
  ellipse(x, y, r*2, r*2);
  x += xspeed;
  y += yspeed;
  if (x > width - r || x < r) {
    xspeed = -xspeed;
  }
  if (y > height - r || y < r) {
    yspeed = -yspeed;
  }
}
function setup() { 
  createCanvas(600, 500);
} 
function draw() { 
  background(220);
  
  paddle.show();
  
  
  
}var paddle;
var ball;
var bricks = [];
var playingGame = false;
var youWin = false;
var winText;
function setup() {
  createCanvas(windowWidth, windowHeight);
  paddle = new Paddle();
  ball = new Ball();
  for (var i = 0; i < 20; i++) {
    bricks.push(new Brick());
  }
  createText();
}
function draw() {
  background(220);
  for (var i = 0; i < bricks.length; i++) {
    bricks[i].display();
    if (ball.hits(bricks[i])) {
      if (bricks[i].r >= 40) {
        bricks[i].r = bricks[i].r / 2;
      } else {
        bricks.splice(i, 1);
      }
      ball.direction.y *= -1;
    }
  }
  paddle.display();
  if (playingGame) paddle.checkEdges();
  if (ball.meets(paddle)) {
    if (ball.direction.y > 0) ball.direction.y *= -1;
  }
  ball.display();
  if (playingGame) ball.checkEdges();
  if (playingGame) ball.update();
  if (ball.pos.y > height) {
    ball.pos = createVector(width / 2, height / 2);
    playingGame = false;
  }
  if (bricks.length === 0) {
    youWin = true;
    playingGame = false;
  }
  if (youWin) {
    winText.style('display', 'block');
  } else {
    winText.style('display', 'none');
  }
}
function keyReleased() {
  paddle.isMovingRight = false;
  paddle.isMovingLeft = false;
}
function keyPressed() {
  if (key === 'a' || key === 'A') {
    paddle.isMovingLeft = true;
  } else if (key === 'd' || key === 'D') {
    paddle.isMovingRight = true;
  } else if (key === 's' || key === 'S') {
    if (bricks.length === 0) {
      for (var i = 0; i < 20; i++) {
        bricks.push(new Brick());
      }
    }
    playingGame = true;
    youWin = false;
  }
}
function createText() {
  winText = createP('YOU WIN!');
  winText.position(width / 2, 80);
}var paddle;
var ball;
var bricks = [];
var playingGame = false;
var youWin = false;
var winText;
function setup() {
  createCanvas(windowWidth, windowHeight);
  paddle = new Paddle();
  ball = new Ball();
  for (var i = 0; i < 20; i++) {
    bricks.push(new Brick());
  }
  createText();
}
function draw() {
  background(220);
  for (var i = 0; i < bricks.length; i++) {
    bricks[i].display();
    if (ball.hits(bricks[i])) {
      if (bricks[i].r >= 40) {
        bricks[i].r = bricks[i].r / 2;
      } else {
        bricks.splice(i, 1);
      }
      ball.direction.y *= -1;
    }
  }
  paddle.display();
  if (playingGame) paddle.checkEdges();
  if (playingGame) paddle.update();
  if (ball.meets(paddle)) {
    if (ball.direction.y > 0) ball.direction.y *= -1;
  }
  ball.display();
  if (playingGame) ball.checkEdges();
  if (playingGame) ball.update();
  if (ball.pos.y > height) {
    ball.pos = createVector(width / 2, height / 2);
    playingGame = false;
  }
  if (bricks.length === 0) {
    youWin = true;
    playingGame = false;
  }
  if (youWin) {
    winText.style('display', 'block');
  } else {
    winText.style('display', 'none');
  }
}
function keyReleased() {
  paddle.isMovingRight = false;
  paddle.isMovingLeft = false;
}
function keyPressed() {
  if (key === 'a' || key === 'A') {
    paddle.isMovingLeft = true;
  } else if (key === 'd' || key === 'D') {
    paddle.isMovingRight = true;
  } else if (key === 's' || key === 'S') {
    if (bricks.length === 0) {
      for (var i = 0; i < 20; i++) {
        bricks.push(new Brick());
      }
    }
    playingGame = true;
    youWin = false;
  }
}
function createText() {
  winText = createP('YOU WIN!');
  winText.position(width / 2, 80);
}let rectos = [];
let circles = [];
function setup() {
  createCanvas(500, 500);
}
  
 
function mousePressed(){
  
  let index1 = new Circle(250, 250, 5);
   circles.push (index1);
  
}
function draw() {
  background(0);
  for (let i = 0; i < circles.length; i++) {
    circles[i].show();
    circles[i].expand();
  }
}let data;
function preload() {
  data = loadJSON("lovecraft.json");
}
function setup() {
  createCanvas(500, 500);
  background(0);
  fill(255, 255, 0,255)
  textSize(10);
  for (let i = 0; i < data.deities.length; i++) {
    text(data.deities, random(width), random(height));
  }
  fill(255, 255, 255,255)
    for (let i = 0; i < data.supernatural_creatures.length; i++) {
    text(data.supernatural_creatures, random(width), random(height));
    
    }
  }
  function draw() {
  }let portName = '/dev/cu.usbmodem1421';
let rectos = [];
let circles = [];
let read1;
let read2; 
function setup() {
  createCanvas(500, 500);
 
  
  for (let i = 0; i < 30; i++) {
    rectos[i] = new Recto(250, 250, i * 15);
  }
  for (let i = 0; i < 30; i++) {
    circles[i] = new Circle(250, 250, i * 15);
  }
  
  
}
  
 
  
  
function draw() {
  background(0);
  for (let i = 0; i < rectos.length; i++) {
    rectos[i].show();
    rectos[i].expand();
  }
  for (let i = 0; i < circles.length; i++) {
    circles[i].show();
    circles[i].expand();
  }
  
}
function gotData(){
  if (inData.length > 0){
    
   
   let values = inData.split('&');
   
    
    read1 = int(values[0]);
    read2 = int(values[1]);
  }
  
 
function setup() {
}
 inData = inByte;
}
 
}
function draw() {
 background(0);
 fill(255);
 text("incoming value: " + inData, 30, 30);
}
function mouseDragged() {
 outByte = int(map(mouseY, 0, height, 0, 255));
}
function keyPressed() {
 }
}
var portName = '/dev/cu.usbmodem1421';
var ew = 20;
var read1;
var read2;
function setup() { 
  createCanvas(500, 500);
  
} 
function draw() { 
  background(220,180,150);
  
  
    noStroke();
    fill(255,220,0,50 + read1);
    ellipse(200,200,ew + read1);
    fill(255,50,10,50 + read2);
    ellipse(300,300,ew + read2);
}
function gotData(){
  if (inData.length > 0){
    
   
    var values = inData.split('&');
   
    
    read1 = int(values[0]);
    read2 = int(values[1]);
  }
  
var inData;
function setup() {
  createCanvas(500, 500);
}
function draw() {
  let ew = 10;
  let ap = 100;
  background(0);
  fill(50 + inData, inData , 0 , ap + inData/2);
  noStroke();
  ellipse(250, 250, ew + inData);
  fill(255);
  text("Read: " + inData, 50, 50);
  
}
  for (var i = 0; i < portList.length; i++) {
  }
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
let randnum;
function setup() {
createCanvas(500, 500);
}
let er = 50; 
function draw() {
  background(0);
  fill(255);
  ellipse(250, 250, er)  
  
  er = er + randnum; 
 
}
 for (var i = 0; i < portList.length; i++) {
 }
}
function serverConnected() {
}
 
function portOpen() {
}
 
 {
}
 
}
 
function portClose() {
var inData;
function setup() {
  createCanvas(500, 500);
}
function draw() {
  let ew = 10
  let ap = 50
  background(0);
  fill(255,ap + inData);
  noStroke();
  text("Ellipse Size: " + inData, 50, 50);
  ellipse(250, 250, ew + inData);
}
  for (var i = 0; i < portList.length; i++) {
  }
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
 
function setup() {
 
}
 
 for (var i = 0; i < portList.length; i++) {
 console.log(i + " " + portList[i]);
 }
}
let rectos = [];
let circles = [];
function setup() {
  createCanvas(500, 500);
  for (let i = 0; i < 60; i++) {
    rectos[i] = new Recto(250, 250, i * 5 + i);
  }
  for (let i = 0; i < 50; i++) {
    circles[i] = new Circle(250, 250, i * 5 + i);
  }
}
  
 
function mousePressed(){
  
  let index1 = new Circle(250, 250, 5);
   circles.push (index1);
  
  let index2 = new Recto(250, 250, 25);
   rectos.push (index2);
}
function draw() {
  background(0);
  for (let i = 0; i < rectos.length; i++) {
    rectos[i].show();
    rectos[i].expand();
  }
  for (let i = 0; i < circles.length; i++) {
    circles[i].show();
    circles[i].expand();
  }
}let rectos = [];
let circles = [];
let img; 
function preload(){
img = loadImage("pic.jpg");
}
function setup() {
  
  createCanvas(500, 500);
  
  
  for (let i = 0; i < 60; i++) {
    rectos[i] = new Recto(250, 250, i * 5 + i);
  }
  for (let i = 0; i < 50; i++) {
    circles[i] = new Circle(250, 250, i * 5 + i);
  }
}
  
 
function mousePressed(){
  
  let index1 = new Circle(250, 250, 5);
   circles.push (index1);
  
  let index2 = new Recto(250, 250, 50);
   rectos.push (index2);
}
function draw() {
   
  image(img,0,0);
  for (let i = 0; i < rectos.length; i++) {
    rectos[i].show();
    rectos[i].expand();
  }
  for (let i = 0; i < circles.length; i++) {
    circles[i].show();
    circles[i].expand();
  }
}let rectos = [];
let circles = [];
function setup() {
  createCanvas(500, 500);
  for (let i = 0; i < 100; i++) {
    rectos[i] = new Recto(250, 250, i * 5 + i);
  }
  for (let i = 0; i < 50; i++) {
    circles[i] = new Circle(250, 250, i * 5 + i);
  }
}
function draw() {
  background(0);
  for (let i = 0; i < 100; i++) {
    rectos[i].show();
    rectos[i].expand();
  }
  for (let i = 0; i < 50; i++) {
    circles[i].show();
    circles[i].expand();
  }
}let recto1;
let recto2;
let recto3;
let circle1;
let circle2;
function setup() {
  createCanvas(500, 500);
  recto1 = new Recto(250, 250, 10);
  recto2 = new Recto(250, 250, 15);
  recto3 = new Recto(250, 250, 20);
  circle1 = new Circle(250,250,5);
  circle2 = new Circle(250,250,10);
}
function draw() {
  background(0);
  recto1.show();
  recto1.expand();
  recto2.show();
  recto2.expand();
  recto3.show();
  recto3.expand();
  
  circle1.show();
  circle1.expand();
  circle2.show();
  circle2.expand();
}
y = 1
speed = 1
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(0);
 
  ballBounce(50, 0.2,0.85);
 
  
}
function ballBounce(x1, Acce, Deacc) {
  
   y = y + speed;
   speed = speed + Acce;
  noStroke();
  ellipse(x1, y, 5, 5);
  if (y > 400) {
    speed = -Deacc * speed;
  }
}y = 1
speed = 1
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(0);
 
  ballBounce(50, 0.2,0.85);
 
  
  ballBounce(100,0.2,0.85);
}
function ballBounce(x1, Acce, Deacc) {
  
   y = y + speed;
   speed = speed + Acce;
  noStroke();
  ellipse(x1, y, 5, 5);
  if (y > 400) {
    speed = -Deacc * speed;
  }
}y = 1
speed = 1
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(0);
  for(var a = 0; a <width; a=a+50){
  
  ballBounce(a, 0.2,0.85,1,1);
}
  
}
function ballBounce(x1, Acce, Deacc,y,speed) {
  
   y = y + speed;
   speed = speed + Acce;
  noStroke();
  ellipse(x1, y, 5, 5);
  if (y > 400) {
    speed = -Deacc * speed;
  }
}let acce = 0.8;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(0);
  ballBounce(50, 0.2,0.85);
}
function ball(x, y) {
  
  this.x = x;
	this.y = y;
  
  this.bounce = function () {
  
  
  }
  
  this.display = function () {
  noStroke();
  ellipse(x1, y, 5, 5);
  
  }
  
 
  
  y = y + speed;
  speed = speed + Acce;
  if (y > 400) {
    speed = -Deacc * speed;
  }
}function setup() { 
  createCanvas(800, 500);
} 
function draw() { 
  background(255,240,220);
	
  
  
  
  function rectBoy(x,y,hands,antena){
  
  noStroke();
  fill(150,50,80,90);
  quad(100,440,300,410,400,410,200,440);
  
	stroke(200,0,100);
  line(240,250,240,350);
	line(280,250,280,350);
  fill(255,150,150);
	ellipse(240,350,10,10);
	ellipse(280,350,10,10);
	
	
	line(250,250,250,420);
	line(270,250,270,420);
	ellipse(250,420,10,10);
	ellipse(270,420,10,10);
	
  fill(220,100,120);
  ellipse(260,250,100,60);
	
  fill(255,150,150);
  rect(100,180,100,100);
  fill(255,190,180);
	quad(100,180,300,150,400,150,200,180);
  fill(255,100,120);
	quad(200,180,400,150,400,250,200,280);
  line(120,220,140,220);
	line(160,220,180,220);
	line(160,250,170,250);
  line(150,180,150,120);
  triangle(151,120,146,115,156,115);
  fill(255,150,150);
  arc(270,220,50,50,PI+HALF_PI,HALF_PI,CHORD);
	
  
  noFill();
  arc(151,110,20,20,1.25*Math.PI,1.75*Math.PI);
  arc(151,100,40,40,1.25*Math.PI,1.75*Math.PI);
  arc(151,90,60,60,1.25*Math.PI,1.75*Math.PI);
  
  }
  
  
  
	
	
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(0);
  for(var a = 0; a <width; a=a+50){
  
  ballBounce(a, 0.2,0.85,1,1);
}
  
}
function ballBounce(x1, Acce, Deacc,y,speed) {
  this.speed = speed;
	this.y = y;
 this.y +=this.speed;	
  noStroke();
  ellipse(x1, y, 5, 5);
  if (y > 400) {
    speed = -Deacc * speed;
  }
let x = 200
let y = 200
let x3 = 250
let y3 = 250
let x1 = 400
let y1 = 400
let x2 = 270
let y2 = 300
let speed = 1
let left = 60
let right = 540
let up = 60
let bottom = 540
inputa = -4
inputb = 4
button = false
rollover = false
rollover2 = false
dragging = false
var sliderx = 100;
var slidery = 275;
var sliderw = 50;
var sliderh = 50;
var sliderStart = 100;
var sliderEnd = 500;
var offsetX = 0;
quadColor = (0, 0, 255)
function setup() {
  createCanvas(600, 600);
  background(240, 220, 200);
}
function draw() {
  background(200, 60, 50)
  noStroke()
  fill(quadColor);
quad_random(inputa, inputb);
 
  
  let rectx = 250
  let recty = 250
  let recth = 100
  if ((mouseX > rectx) && (mouseX < rectx + recth) && (mouseY > recty) &&
    (mouseY < recty + recth)) {
    rollover = true;
  } else {
    rollover = false;
  }
  if (rollover == true) {
    fill(0, 200);
    cursor(HAND);
  } else {
    fill(0, 50, 255, 220);
    cursor(ARROW);
  }
  rect(rectx, recty, recth, recth);
  if (dragging) {
    sliderx = mouseX + offsetX;
  }
  sliderx = constrain(sliderx, sliderStart, sliderEnd - sliderw);
  noStroke();
  if (dragging) {
    fill(50, 50);
  } else {
    fill(175, 50);
  }
  if (rollover2 == true) {
    fill(255);
    cursor(HAND);
  } else {
    fill(0, 100, 0, 200);
    cursor(ARROW);
  }
  rect(sliderx, slidery, sliderw, sliderh);
  inputa = map(sliderx, sliderStart, sliderEnd - sliderw, -6, -0.5);
  inputb = map(sliderx, sliderStart, sliderEnd - sliderw, 6, 0.5);
  if (
    x < left || x > right ||
    y < up || y > bottom ||
    x3 < left || x3 > right ||
    y3 < up || y3 > bottom ||
    x1 < up || x1 > right ||
    y1 < up || y1 > bottom ||
    x2 < left || x2 > right ||
    y2 < up || y2 > bottom
  )
  {
    speed = -speed
  }
}
function quad_random(rx, ry) {
  quad(x, y, x3, y3, x1, y1, x2, y2);
  x = x + random(rx, ry) - speed
  y = y + random(rx, ry) - speed
  x3 = x3 + random(rx, ry) + speed
  y3 = y3 + random(rx, ry) - speed
  x1 = x1 + random(rx, ry) + speed
  y1 = y1 + random(rx, ry) + speed
  x2 = x2 + random(rx, ry) - speed
  y2 = y2 + random(rx, ry) + speed
}
function mousePressed() {
  if (rollover == true) {
    quadColor = color(random(250), random(250), random(250));
  }
  if (mouseX > sliderx && mouseX < sliderx + sliderw &&
    mouseY > slidery && mouseY < slidery + sliderh) {
    dragging = true;
    rollover2 = true;
    offsetX = sliderx - mouseX;
  } else {
    rollover2 = false;
  }
}
function mouseReleased() {
  dragging = false;
let x = 200
let y = 200
let x3 = 250
let y3 = 250
let x1 = 400
let y1 = 400
let x2 = 270
let y2 = 300
let speed = 1
let limitx = 60
let limity = 560
button = false
rollover = false
dragging = false
var sliderx = 100;
var slidery = 25;
var sliderw = 10;
var sliderh = 50;
var sliderStart = 100;
var sliderEnd = 400;
var offsetX = 0;
quadColor = (0, 0, 255)
function setup() {
  createCanvas(600, 600);
  background(240, 220, 200);
}
function draw() {
  background(240, 220, 200)
  noStroke()
  fill(quadColor);
  quad_random(-2, 2);
  let rectx = 250
  let recty = 250
  let recth = 100
  if ((mouseX > rectx) && (mouseX < rectx + recth) && (mouseY > recty) &&
    (mouseY < recty + recth)) {
    rollover = true;
  } else {
    rollover = false;
  }
  if (rollover == true) {
    fill(200, 200);
    cursor(HAND);
  } else {
    fill(255, 100, 100, 200);
    cursor(ARROW);
  }
  
  
  rect(rectx, recty, recth, recth);
  
  
  
  
  if (dragging) {
    sliderx = mouseX + offsetX;
  }
  sliderx = constrain(sliderx, sliderStart, sliderEnd-w);
  stroke(0);
  line(sliderStart, slidery+sliderh/2, sliderEnd, slidery+sliderh/2);
  stroke(0);
  if (dragging) {
    fill (50);
  } else {
    fill(175);
  }
  rect(sliderx, slidery, sliderw, sliderh);
  var b = map(sliderx,sliderStart,sliderEnd-sliderw,0,255);
  fill(b);
  rect(sliderStart, 100, sliderEnd-sliderStart, 150);
}
  if (
    x < limitx || x > limity ||
    y < limitx || y > limity ||
    x3 < limitx || x3 > limity ||
    y3 < limitx || y3 > limity ||
    x1 < limitx || x1 > limity ||
    y1 < limitx || y1 > limity ||
    x2 < limitx || x2 > limity ||
    y2 < limitx || y2 > limity
  )
  {
    speed = -speed
  }
}
function quad_random(rx, ry) {
  quad(x, y, x3, y3, x1, y1, x2, y2);
  x = x + random(rx, ry) - speed
  y = y + random(rx, ry) - speed
  x3 = x3 + random(rx, ry) + speed
  y3 = y3 + random(rx, ry) - speed
  x1 = x1 + random(rx, ry) + speed
  y1 = y1 + random(rx, ry) + speed
  x2 = x2 + random(rx, ry) - speed
  y2 = y2 + random(rx, ry) + speed
}
function mousePressed() {
  if (rollover == true) {
    quadColor = color(random(250), random(250), random(250));
  }
  
  if (mouseX > sliderx && mouseX < sliderx + sliderw && 
      mouseY > slidery && mouseY < slidery + sliderh) {
    dragging = true;
    offsetX = x-mouseX;
  }
  
let x = 200
let y = 200
let x3 = 250
let y3 = 250
let x1 = 400
let y1 = 400
let x2 = 300
let y2 = 300
let speed = 1
button = false
rollover = false
quadColor = (0, 0, 255)
function setup() {
  createCanvas(600, 600);
  background(240, 220, 200);
}
function draw() {
  background(240, 220, 200)
  noStroke()
  
  fill(quadColor);
  
  quad_random (-4, 4);
  
  
  
  let rectx = 250
  let recty = 250
  let recth = 100
  
  if ((mouseX > rectx) && (mouseX < rectx + recth) && (mouseY > recty) && 
      (mouseY < recty + recth)) 
  {
    rollover = true;
  } else {
    rollover = false;
  }
  
  
  if(rollover == true)
  {
    fill(200,200);
    cursor(HAND);
  } else {
	fill(255,100,100,200); 
	cursor(ARROW); 
  }
  
  rect( rectx, recty, recth, recth);
  
  
  
    if (
    x < 0 || x > 600 ||
    y < 0 || y > 600 ||
    x3 < 0 || x3 > 600 ||
    y3 < 0 || y3 > 600 ||
    x1 < 0 || x1 > 600 ||
    y1 < 0 || y1 > 600 ||
    x2 < 0 || x2 > 600 ||
    y2 < 0 || y2 > 600
  )
  {
    speed = -speed
  }
}
  function quad_random (rx, ry) {
    
    
    
  quad(x, y, x3, y3, x1, y1, x2, y2);
  x = x  - speed
  y = y  - speed
  x3 = x3  + speed
  y3 = y3  - speed
  x1 = x1  + speed
  y1 = y1  + speed
  x2 = x2  - speed
  y2 = y2  + speed
    
    
  }
function mousePressed()
{
  if(rollover == true)
  {
    quadColor = color(random(250), random(250), random(250));
  }
}
let x = 200
let y = 200
let x3 = 250
let y3 = 250
let x1 = 400
let y1 = 400
let x2 = 300
let y2 = 300
let speed = 1
button = false
rollover = false
quadColor = (0, 0, 255)
function setup() {
  createCanvas(600, 600);
  background(240, 220, 200);
}
function draw() {
  background(240, 220, 200)
  noStroke()
  
  fill(quadColor);
  
  quad_random (-3, 3);
  
  
  
  let rectx = 250
  let recty = 250
  let recth = 100
  
  if ((mouseX > rectx) && (mouseX < rectx + recth) && (mouseY > recty) && 
      (mouseY < recty + recth)) 
  {
    rollover = true;
  } else {
    rollover = false;
  }
  
  
  if(rollover == true)
  {
    fill(200,200);
    cursor(HAND);
  } else {
	fill(255,100,100,200); 
	cursor(ARROW); 
  }
  
  rect( rectx, recty, recth, recth);
  
  
  
    if (
    x < 60 || x > 540 ||
    y < 60 || y > 540 ||
    x3 < 60 || x3 > 540 ||
    y3 < 60 || y3 > 540 ||
    x1 < 60 || x1 > 540 ||
    y1 < 60 || y1 > 540 ||
    x2 < 60 || x2 > 540 ||
    y2 < 60 || y2 > 540
  )
  {
    speed = -speed
  }
}
  function quad_random (rx, ry) {
    
    
    
  quad(x, y, x3, y3, x1, y1, x2, y2);
  x = x + random(rx, ry) - speed
  y = y + random(rx, ry) - speed
  x3 = x3 + random(rx, ry) + speed
  y3 = y3 + random(rx, ry) - speed
  x1 = x1 + random(rx, ry) + speed
  y1 = y1 + random(rx, ry) + speed
  x2 = x2 + random(rx, ry) - speed
  y2 = y2 + random(rx, ry) + speed
    
    
  }
function mousePressed()
{
  if(rollover == true)
  {
    quadColor = color(random(250), random(250), random(250));
  }
}
let x = 200
let y = 200
let x3 = 250
let y3 = 250
let x1 = 400
let y1 = 400
let x2 = 300
let y2 = 300
let speed = 1
button = false
rollover = false
quadColor = (0, 0, 255)
function setup() {
  createCanvas(600, 600);
  background(240, 220, 200);
}
function draw() {
  background(240, 220, 200)
  noStroke()
  
  fill(quadColor);
  
  quad_random (-4, 4);
  
  
  
  
  
  let rectx = 250
  let recty = 250
  let recth = 100
  
  if ((mouseX > rectx) && (mouseX < rectx + recth) && (mouseY > recty) && 
      (mouseY < recty + recth)) 
  {
    rollover = true;
  } else {
    rollover = false;
  }
  
  
  if(rollover == true)
  {
    fill(100);
    cursor(HAND);
  } else {
	fill(200); 
	cursor(ARROW); 
  }
  
  rect( rectx, recty, recth, recth);
  
  
  
  
  
    if (
    x < 60 || x > 540 ||
    y < 60 || y > 540 ||
    x3 < 60 || x3 > 540 ||
    y3 < 60 || y3 > 540 ||
    x1 < 60 || x1 > 540 ||
    y1 < 60 || y1 > 540 ||
    x2 < 60 || x2 > 540 ||
    y2 < 60 || y2 > 540
  )
  {
    speed = -speed
  }
}
  function quad_random (rx, ry) {
    
    
    
  quad(x, y, x3, y3, x1, y1, x2, y2);
  x = x + random(rx, ry) - speed
  y = y + random(rx, ry) - speed
  x3 = x3 + random(rx, ry) + speed
  y3 = y3 + random(rx, ry) - speed
  x1 = x1 + random(rx, ry) + speed
  y1 = y1 + random(rx, ry) + speed
  x2 = x2 + random(rx, ry) - speed
  y2 = y2 + random(rx, ry) + speed
    
    
    
  }
function mousePressed()
{
  if(rollover == true)
  {
    quadColor = color(random(255), random(255), random(255));
  }
}
let x = 200
let y = 200
let x3 = 250
let y3 = 250
let x1 = 400
let y1 = 400
let x2 = 300
let y2 = 300
let speed = 1
function setup() {
  createCanvas(600, 600);
  background(240, 220, 200);
}
function draw() {
  background(240, 220, 200)
  noStroke()
  fill(0, 0, 255);
  
  quad_random (-4, 4);
  
  if (
    x < 60 || x > 540 ||
    y < 60 || y > 540 ||
    x3 < 60 || x3 > 540 ||
    y3 < 60 || y3 > 540 ||
    x1 < 60 || x1 > 540 ||
    y1 < 60 || y1 > 540 ||
    x2 < 60 || x2 > 540 ||
    y2 < 60 || y2 > 540
  )
  {
    speed = -speed
  }
  
  
  
  
  let a = 250
  let b = 250
  let s = 100
  
  if ((mouseX > a) && (mouseX < a + s) && (mouseY > b) && 
      (mouseY < b + s)) 
  {
    fill(255);
  } else {
    fill(255,100,100);
  }
  
  rect( a, b, s, s);
  
  
  
}
  function quad_random (rx, ry) {
    
  quad(x, y, x3, y3, x1, y1, x2, y2);
  x = x + random(rx, ry) - speed
  y = y + random(rx, ry) - speed
  x3 = x3 + random(rx, ry) + speed
  y3 = y3 + random(rx, ry) - speed
  x1 = x1 + random(rx, ry) + speed
  y1 = y1 + random(rx, ry) + speed
  x2 = x2 + random(rx, ry) - speed
  y2 = y2 + random(rx, ry) + speed
    
  }let x = 200
let y = 200
let x3 = 250
let y3 = 250
let x1 = 400
let y1 = 400
let x2 = 300
let y2 = 300
let speed = 1
function setup() {
  createCanvas(600, 600);
  background(240,220,200);
}
function draw() {
  background(240,220,200)
  noStroke()
  fill(0,0,255);
  quad(x, y, x3, y3, x1, y1, x2, y2);
  x = x + random(-5, 5) + -speed
  y = y + random(-5, 5) + -speed
  x3 = x3 + random(-5, 5) + speed
  y3 = y3 + random(-5, 5) + -speed
  x1 = x1 + random(-5, 5) + speed
  y1 = y1 + random(-5, 5) + speed
  x2 = x2 + random(-5, 5) + -speed
  y2 = y2 + random(-5, 5) + speed
  if (
    x < 50 || x > 550 ||
    y < 50 || y > 550 ||
    x3 < 50 || x3 > 550 ||
    y3 < 50 || y3 > 550|| 
    x1 < 50 || x1 > 550|| 
    y1 < 50 || y1 > 550||
    x2 < 50 || x2 > 550||
    y2 < 50 || y2 > 550
     
     ) 
  
  {
    speed = -speed
  }
}function setup() {
  createCanvas(600, 400);
  background(255,200,80);
}
function draw() {
  let r = random(200,255);
  var g = random(50,200);
  let b = random(50,200);
  background(255,200,80,1);
  stroke(100,80,80);
  fill(r, g, b, 255);
  ellipse(mouseX, mouseY, 50, 50);
  
}let x = 220
let y = 200
let x1 = 400
let y1 = 200
let x2 = 300
let y2 = 300
let x3 = 250
let y3 = 400
let x4 = 350
let y4 = 400
let ex = 400
let ey = 425
let ex1 = 50
let ey1 = 20
let ex2 = 50
let ey2 = 10
function setup() {
  createCanvas(600, 600);
  background(0)
  noCursor();
}
function draw() {
  background(0, 2)
  noFill();
  stroke(mouseX, 0, mouseY, 100);
  ellipse(x, y, ex1, ey1);
  ellipse(x1, y1, ex2, ey2);
  ellipse(x2, y2, ex, ey);
  line(x3, y3, x4, y4);
  
  noStroke();
  let col1 = map(mouseX,0,255,0,width);
	let col2 = map(mouseY,0,255,0,height);
	fill(col1, 0, col2, 100);
  ellipse(mouseX, mouseY, 50, 50);
  fill(col2, 0, col1, 100);
  ellipse(mouseY, mouseX, 50, 50);
  x = x + random(-0.5, +0.5);
  y = y + random(-0.5, +0.5);
  x1 = x1 + random(-0.5, +0.5);
  y1 = y1 + random(-0.5, +0.5);
  x2 = x2 + random(-0.5, +0.5);
  y2 = y2 + random(-0.5, +0.5);
  x3 = x3 + random(-0.5, +0.5);
  y3 = y3 + random(-0.5, +0.5);
  x4 = x4 + random(-0.5, +0.5);
  y4 = y4 + random(-0.5, +0.5);
  ex = ex + random(-0.5, +0.5);
  ey = ey + random(-0.5, +0.5);
  ex1 = ex1 + random(-1, +1);
  ey1 = ey1 + random(-1, +1);
  ex2 = ex2 + random(-1, +1);
  ey2 = ey2 + random(-1, +1);
}let x = 220
let y = 200
let x1 = 400
let y1 = 200
let x2 = 300
let y2 = 300
function setup() {
  createCanvas(600, 600);
  background(0)
  noCursor();
}
function mousePressed() {
  background(0);
}
function draw() {
 
  background(0,5)
  stroke(mouseY, 200, mouseX, 255, 255);
  noFill();
  quad(mouseX, mouseY, x, y,x1,y1,x2,y2);
 
  x = x + random(-5, +5);
  y = y + random(-5, +5);
  x1 = x1 + random(-5, +5);
  y1 = y1 + random(-5, +5);
  x2 = x2 + random(-5, +5);
  y2 = y2 + random(-5, +5);
}function setup() { 
  createCanvas(500, 500);
} 
function draw() { 
  background(255,240,220);
	
  noStroke();
  fill(150,50,80,90);
  quad(100,440,300,410,400,410,200,440);
  
	stroke(200,0,100);
  line(240,250,240,350);
	line(280,250,280,350);
  fill(255,150,150);
	ellipse(240,350,10,10);
	ellipse(280,350,10,10);
	
	
	line(250,250,250,420);
	line(270,250,270,420);
	ellipse(250,420,10,10);
	ellipse(270,420,10,10);
	
  fill(220,100,120);
  ellipse(260,250,100,60);
	
  fill(255,150,150);
  rect(100,180,100,100);
  fill(255,190,180);
	quad(100,180,300,150,400,150,200,180);
  fill(255,100,120);
	quad(200,180,400,150,400,250,200,280);
  line(120,220,140,220);
	line(160,220,180,220);
	line(160,250,170,250);
  line(150,180,150,120);
  triangle(151,120,146,115,156,115);
  fill(255,150,150);
  arc(270,220,50,50,PI+HALF_PI,HALF_PI,CHORD);
	
  
  noFill();
  arc(151,110,20,20,1.25*Math.PI,1.75*Math.PI);
  arc(151,100,40,40,1.25*Math.PI,1.75*Math.PI);
  arc(151,90,60,60,1.25*Math.PI,1.75*Math.PI);
  
  
  
  
  
	
	
}function setup() { 
  createCanvas(500, 500);
} 
function draw() { 
  background(100,200,150);
	
  noStroke();
  fill(80,150,100,90);
  quad(100,440,300,410,400,410,200,440);
  
	stroke(200,0,100);
  line(240,250,240,350);
	line(280,250,280,350);
  fill(255,150,150);
	ellipse(240,350,10,10);
	ellipse(280,350,10,10);
	
	
	line(250,250,250,420);
	line(270,250,270,420);
	ellipse(250,420,10,10);
	ellipse(270,420,10,10);
	
  fill(220,100,120);
  ellipse(260,250,100,60);
	
  fill(255,150,150);
  rect(100,180,100,100);
  fill(255,190,180);
	quad(100,180,300,150,400,150,200,180);
  fill(255,100,120);
	quad(200,180,400,150,400,250,200,280);
  line(120,220,140,220);
	line(160,220,180,220);
	line(160,250,170,250);
  line(150,180,150,120);
  triangle(151,120,146,115,156,115);
  fill(255,150,150);
  arc(270,220,50,50,PI+HALF_PI,HALF_PI,CHORD);
	
  
  noFill();
  arc(151,110,20,20,1.25*Math.PI,1.75*Math.PI);
  arc(151,100,40,40,1.25*Math.PI,1.75*Math.PI);
  arc(151,90,60,60,1.25*Math.PI,1.75*Math.PI);
  
  
  
  
  
	
	
}