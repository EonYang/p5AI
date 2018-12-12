let data;
function preload(){
	data = loadJSON('crayola.json');
}
function setup() { 
  createCanvas(900, 900);
  background(220);
  fill(255);
  for (let i = 0; i < data.colors.length; i++){
  	textAlign(CENTER);
   fill(data.colors[i].hex);
    
    let x = random(width);
    let y = random(height);
    let r = 10;
    noStroke();
    ellipse(x,y,r*2,r*2);
    
  }
} 
function draw() { 
   
}
let data;
function preload(){
	data = loadJSON('crayola.json');
}
function setup() { 
  createCanvas(900, 900);
  background(220);
  fill(255);
  for (let i = 0; i < data.colors.length; i++){
  	textAlign(CENTER);
   fill(data.colors[i].hex);
    text(data.colors[i].color, random(width),random(height));
  }
} 
function draw() { 
  
}let a = 0;
function setup() { 
  createCanvas(400, 400, WEBGL);
} 
function draw() { 
  background(220);
  
  rotateX(a);
  torus();
  
  a += 0.091;
}
var cNote;
var dNote;
var eNote;
var fNote;
var gNote;
var aNote;
var bNote;
function preload() {
  cNote = loadSound('music_notes/c_note.mp3');
  dNote = loadSound('music_notes/d_note.mp3');
  eNote = loadSound('music_notes/e_note.mp3');
  fNote = loadSound('music_notes/f_note.mp3');
  gNote = loadSound('music_notes/g_note.mp3');
  aNote = loadSound('music_notes/a_note.mp3');
  bNote = loadSound('music_notes/b_note.mp3');
}
function setup() {
  function touchStarted() {
    createCanvas(810, 400);
    select('#c').mouseStarted(function() {
      cNote.play();
    });
    select('#d').mouseClicked(function() {
      dNote.play();
    });
    select('#e').mouseClicked(function() {
      eNote.play();
    });
    select('#f').mouseClicked(function() {
      fNote.play();
    });
    select('#g').mouseClicked(function() {
      gNote.play();
    });
    select('#a').mouseClicked(function() {
      aNote.play();
    });
    select('#b').mouseClicked(function() {
      bNote.play();
    });
  }
}
function draw() {
  background(0);
}var cNote;
var dNote;
var eNote;
var fNote;
var gNote;
var aNote;
var bNote;
function preload(){
cNote = loadSound('music_notes/c_note.mp3');
dNote = loadSound('music_notes/d_note.mp3');
eNote = loadSound('music_notes/e_note.mp3');
fNote = loadSound('music_notes/f_note.mp3');
gNote = loadSound('music_notes/g_note.mp3');
aNote = loadSound('music_notes/a_note.mp3');
bNote = loadSound('music_notes/b_note.mp3');
}
function setup() {
  createCanvas(810, 400);
  select('#c').mouseClicked(function(){
  cNote.play();
  });
  select('#d').mouseClicked(function(){
  dNote.play();
  });
  select('#e').mouseClicked(function(){
  eNote.play();
  });
  select('#f').mouseClicked(function(){
  fNote.play();
  });
  select('#g').mouseClicked(function(){
  gNote.play();
  });
  select('#a').mouseClicked(function(){
  aNote.play();
  });
  select('#b').mouseClicked(function(){
  bNote.play();
  });
  
  select('#c').mouseOver(function(){
  cNote.play();
  });
  select('#d').mouseOver(function(){
  dNote.play();
  });
  select('#e').mouseOver(function(){
  eNote.play();
  });
  select('#f').mouseOver(function(){
  fNote.play();
  });
  select('#g').mouseOver(function(){
  gNote.play();
  });
  select('#a').mouseOver(function(){
  aNote.play();
  });
  select('#b').mouseOver(function(){
  bNote.play();
  });
}
function draw() {
  background(0);
}let noiseScale = 0.01;
let rand;
let a = 0;
let pg;
function setup() {
  createCanvas(400, 400);
  frameRate(20);
  pg = createGraphics(width, height);
}
function draw() {
  
  makeNoise();
  background(0, 0, 0, a);
  
}
function makeNoise() {
  rand = random(width / 20);
  for (let x = 0; x < width; x += 2) {
    let noiseX = noise((rand + x) * noiseScale, rand * noiseScale);
    let noiseY = noise((rand + x) * noiseScale, rand * noiseScale);
    stroke(noiseX * 200);
    strokeWeight(2);
    line(x, 0, x, height);
  }
}let data;
let myFont;
let img;
let noiseScale = 0.01;
let rand;
let a = 0;
function preload(){
	data = loadJSON('prophecies.json');
  myFont = loadFont('Deutsch.ttf');
  img = loadImage('mirror.png');
}
function makeNoise() {
  rand = random(width / 20);
  for (let x = 0; x < width; x += 2) {
    let noiseX = noise((rand + x) * noiseScale, rand * noiseScale);
    let noiseY = noise((rand + x) * noiseScale, rand * noiseScale);
    stroke(noiseX * 200);
    strokeWeight(2);
    line(x, 0, x, height);
  }
}
function setup() { 
  createCanvas(600, 800);
  frameRate(20);
} 
function draw() { 
  fill(0);
  textFont(myFont);
  textSize(28);
  makeNoise();
  image(img, 0, 0,600,800);
  let p = floor(random(data.prophecies.length - 1));
   let x = text(data.prophecies[p].prophecy, 140,400);
  text(x);
}function setup() {
  createCanvas(800, 600);
  bg = loadImage('Kelsin.jpg');
  data = loadJSON('kelsin.json');
}
function draw() {
  background(bg);
	fill(0, 102, 153);
}let data;
function preload(){
}
function setup() { 
  createCanvas(400, 400);
  background(220);
  for (let i = 0; i < data.length; i++){
  	textAlign(CENTER);
    text(data.title[i], random(width),random(height));
  }
} 
function draw() { 
  
}let data;
function preload(){
	data = loadJSON('crayola.json');
}
function setup() { 
  createCanvas(900, 900);
  background(220);
  fill(255);
  for (let i = 0; i < data.colors.length; i++){
  	textAlign(CENTER);
   fill(data.colors[i].hex);
    text(data.colors[i].color, random(width),random(height));
  }
} 
function draw() { 
  
}let img;
let count = 200;
let opacity = 1;
function preload() {
  img = createImg('mole.jpg');
  img.position(10,10);
  img.size(count,count/2);
}
function setup() { 
  createCanvas(400, 400);
  background(220);
  
  
  
} 
function draw() { 
		count--;
		img.size(count, count/2);
		opacity -= 0.01;
		img.style('opacity', opacity);
}let score = 0;
let time_left = 30;
let canvas;
let img;
let mole;
let count = 200;
let opacity = 1;
let x;
let y
let x2;
function preload() {
	
}
function randomMole() {
  return (random() * 2000);
}
function beginGame() {
  select('#timer').show();
  updateTimer();
  addMole();
}
function incScore() {
  score += 1;
  select('#score').html(score + " points");
}
function updateTimer() {
  if (time_left <= 0) {
    clearTimeout(timeout);
    reloadPage();
  } else {
    select('#timer').html(time_left + " seconds left");
    time_left -= 1;
    timeout = setTimeout(updateTimer, 2000);
  }
}
function addMole() {
  x = randomMole();
  let timeout = setTimeout(addMole, x);
  if (time_left <= 0) {
    return;
  } else {
	 img = createImg('mole.jpg');
  img.position(x2, y);
  img.size(count, count/2);
    x2 = random( width,200);
    y = random(150,250);
    img.style('opacity', opacity);
    count--;
    opacity -= 0.01;
  }
}
function reloadPage() {
  location.reload();
}
function setup() {
  canvas = createCanvas(613, 370);
  canvas.id("gamecanvas");
  select("#gamespace").child(canvas);
  select('#start_button').mouseClicked(function() {
    beginGame();
  })
  background(255);
}
function draw() {
}let x;
let img;
function preload(){
	img = loadImage('mondrian.png');
}
function setup() { 
  createCanvas(640, 480);
  
} 
function draw() { 
  image(img, 0,0);
}
let gravity = 0.1;
let bouncer;
let bounces;
function setup() { 
  createCanvas(400, 400);
  bouncer = new Ball();
  bounces = new Second();
} 
function draw() { 
  background(220);
  bouncer.move();
  bouncer.show();
  bounces.move();
  bounces.show();
}var ball = {
  x: 200,
  y: 30,
  speed: 0
}
var gravity = 0.1;
function setup() {
  createCanvas(400, 300);
}
function displayBall() {
  fill(255);
  ellipse(ball.x, ball.y, 24, 24);
}
function moveBall() {
  ball.y = ball.y + ball.speed;
  ball.speed = ball.speed + gravity;
}
function bounceBall() {
  if (ball.y > height) {
    ball.speed = ball.speed * -0.95;
  }
}
function draw() {
  background(0);
  displayBall();
  moveBall();
  bounceBall();
}
var spot = {
	x: 100,
  y: 50
};
var col = {
	r: 255,
  g: 0,
  b: 0
};
function setup() { 
  createCanvas(600, 400);
  background(0);
  noStroke();
  noFill();
  stroke(300);
  rect(185,185,128,128);
} 
function draw() { 
  
  frameRate(30);
  
 
  spot.x = random(212, 288);
  spot.y = random(300, 200);
  col.r = random(0,500);
  col.g = random(0,500);
  col.b = random(0,500);
  ellipse(spot.x, spot.y,24,24);
  fill(col.r, col.g, col.b);
  
}function setup() { 
  createCanvas(400, 400);
} 
function mousePressed() {
}
function unicorn() {
  
}
function draw() { 
  background(220);
  unicorn();
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  for(let x = 0; x < width; x = x + 20) {
  	stroke(0);
    line(x, 0 , x, height);
  }
  
  
}var spot = {
	x: 100,
  y: 50
};
var col = {
	r: 255,
  g: 0,
  b: 0
};
function setup() { 
  createCanvas(600, 400);
  background(0);
  noStroke();
} 
function draw() { 
  spot.x = random(0, width);
  spot.y = random(0, height);
  col.r = random(0,500);
  col.g = random(0,500);
  col.b = random(0,500);
 fill(col.r, col.g, col.b);
  ellipse(spot.x, spot.y, 24,24);
}var speed = 5;
var x = 0;
var y = 0;
function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
  background(220);
  stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(x ,200, 100, 100);
  ellipse(x ,380, 10, 10);
  ellipse(50 , y , 100, 100);
  ellipse(600 , y , 300, 300);
  
  if (x > width || x < 0) {
  	speed = speed * -1;
  }
  
 else if (y > height || y < 0) {
  	speed = speed * -1;
  }
  
  x = x + speed;
  y = y + speed;
}var value = 0;
var angle = 0;
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  rectMode(CENTER);
}
function blurrySquares(){
	 noStroke();
    fill(255);
    push();
    translate(200, 200);
    rotate(angle);
    fill(51, 0, 51);
    rect(0, 0, 450, 450);
    pop();
    fill(255);
    push();
    translate(200, 200);
    rotate(-angle);
    fill(51, 0, 102);
    rect(0, 0, 400, 400);
    pop();
    fill(255);
    push();
    translate(200, 200);
    rotate(angle);
    fill(76, 0, 153);
    rect(0, 0, 350, 350);
    pop();
    fill(255);
    push();
    translate(200, 200);
    rotate(-angle);
    fill(102, 0, 204);
    rect(0, 0, 300, 300);
    pop();
    fill(255);
    push();
    translate(200, 200);
    rotate(angle);
    fill(127, 0, 255);
    rect(0, 0, 250, 250);
    pop();
    fill(255);
    push();
    translate(200, 200);
    rotate(-angle);
    fill(153, 51, 255);
    rect(0, 0, 200, 200);
    pop();
    fill(255);
    push();
    translate(200, 200);
    rotate(angle);
    fill(178, 102, 255);
    rect(0, 0, 150, 150);
    pop();
    fill(255);
    push();
    translate(200, 200);
    rotate(-angle);
    fill(204, 153, 255);
    rect(0, 0, 100, 100);
    pop();
    fill(255);
    push();
    translate(200, 200);
    rotate(angle);
    fill(229, 204, 255);
    rect(0, 0, 50, 50);
    pop();
}
function borderedSquares(){
	stroke(0);
    fill(255);
    push();
    translate(200, 200);
    rotate(-angle);
    fill(51, 0, 51);
    rect(0, 0, 450, 450);
    pop();
    fill(255);
    push();
    translate(200, 200);
    rotate(angle);
    fill(51, 0, 102);
    rect(0, 0, 400, 400);
    pop();
    fill(255);
    push();
    translate(200, 200);
    rotate(-angle);
    fill(76, 0, 153);
    rect(0, 0, 350, 350);
    pop();
    fill(255);
    push();
    translate(200, 200);
    rotate(angle);
    fill(102, 0, 204);
    rect(0, 0, 300, 300);
    pop();
    fill(255);
    push();
    translate(200, 200);
    rotate(-angle);
    fill(127, 0, 255);
    rect(0, 0, 250, 250);
    pop();
    fill(255);
    push();
    translate(200, 200);
    rotate(angle);
    fill(153, 51, 255);
    rect(0, 0, 200, 200);
    pop();
    fill(255);
    push();
    translate(200, 200);
    rotate(-angle);
    fill(178, 102, 255);
    rect(0, 0, 150, 150);
    pop();
    fill(255);
    push();
    translate(200, 200);
    rotate(angle);
    fill(204, 153, 255);
    rect(0, 0, 100, 100);
    pop();
    fill(255);
    push();
    translate(200, 200);
    rotate(-angle);
    fill(229, 204, 255);
    rect(0, 0, 50, 50);
    pop();
}
function draw() {
  background(64, 64, 64);
  if (mouseIsPressed) {
    
    borderedSquares();
  } 
  else {
   blurrySquares();
  }
  angle = angle + 2;
}var angle = 0;
function setup() { 
  createCanvas(800, 600);
  angleMode(DEGREES);
  ellipseMode(CENTER);
  rectMode(CENTER);
} 
function draw() { 
  background(220);
  push();
  translate(50,50);
  rotate(angle * 3);
  fill(51,0,102);
  scale(2,2);
	rect(0,0, 20, 20);
  pop();
  
  translate(300,300);
  rotate(-angle * 3);
  fill(255,100,50);
  rect(0,0,100,50);
  
  angle = angle + 3;
}
  
var skyImage, stars = []; 
var m = 501;
function setup() {
  createCanvas(800, 500);
  noCursor();   
  noStroke();   
  
  skyImage = loadImage(
    "j38/codepen/background.jpg"
  );
}
function draw() {
  image(skyImage, 0, 0);
  
  fill(224,224,255);
  ellipse(575,m, 80, 80);
  
  if (m < 100){
   m = 100;
  }
   m = m - 1;
  var position = createVector(mouseX, mouseY);
  
  fill(255, 192, 0);
  ellipse(position.x, position.y, 8, 8); 
 
  if (mouseIsPressed) {
    var target = createVector(
      random(width),
      random(height - 100)
    );    
    var star = new Star(position, target);
    stars.push(star);
    if (stars.length > 1000) stars.shift();    
  }  
  
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].draw();
  }     
  
}
function Star(position, target) {
  this.position = position;
  this.target = target;
  this.diameter = random(1, 5);
}
Star.prototype.update = function() {   
  this.position = p5.Vector.lerp(
    this.position,
    this.target,
    0.04
  );
};
Star.prototype.draw = function() { 
  var alpha = noise(
    this.target.x,
    this.target.y,
    millis() / 1000.0
  );
  
  fill(255, alpha * 255);
  
  ellipse(
    this.position.x, this.position.y,
    this.diameter, this.diameter
  );
};function setup() { 
  createCanvas(600, 600);
  background(204);
} 
function draw(){
  stroke(0,0,0);
  fill(0,0,0);
  ellipse(275,270,120,120);
  stroke(51,25,0);
  fill(51,25,0);
	ellipse(275,270,90,90);
  strokeWeight(9);
  line(275,319,275,330);
  stroke(0,0,0);
  fill(0,0,0);
  ellipse(255,270,10,10);
  ellipse(285,270,10,10);
  stroke(0,0,0);
  fill(255,255,255);
  strokeWeight(2);
  triangle(301,290,270,300,245,290);
  stroke(128,128,128);
  fill(128,128,128);
  rect(255,330,40,60);
  stroke(51,25,0);
  strokeWeight(6);
  line(330,340,295,335);
  line(255,338,220,350);
  stroke(0,0,51);
  fill(0,0,51);
  rect(255,390,40,50);
  stroke(0,0,0);
  line(275,400,275,440);
  stroke(0,0,0);
  strokeWeight(2);
  fill(224,224,224);
  ellipse(293,440,30,20);
  ellipse(260,440,30,20);
  
  
}