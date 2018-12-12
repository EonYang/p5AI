var x; 
var y; 
var trans; 
var dtrans; 
function setup() {
  createCanvas(400, 400);
  trans = 1; 
  dtrans = -0.01; 
}
function draw() {
  noStroke(); 
  background(255);
  let a = map (trans,0,1,0,255); 
  fill(0,0,255,a); 
  ellipse(100,100,150,150); 
  
  trans += dtrans; 
  
  if (trans < 0) {
    dtrans = -dtrans; 
  } else if (trans > 1) {
    dtrans = -dtrans;
  }
}
var stars = [];
var trans; 
var dtrans; 
function setup() {
  createCanvas(600, 600);
  for (var i = 0; i < 400; i++) {
    let star = new Star(random(0,width), random(0,height), random(0,5), 1, -0.01); 
    stars.push(star); 
  }
}
function draw() {
  speed = 1;
  background(0);
    
    for (var i = 0; i < stars.length; i++) {
      let star = new Star();
      stars.push(star); 
      if(star.r > 2 && star.r < 5) {
        stars[i].show(); 
        stars[i].fade(); 
        stars[i].transparancy();    
      }
      else {
        starts[i].show(); 
      }
   }  
}var greeting, button, bgcolor; 
var c; 
var img;
var isImage = false;
function preload() {
  img = loadImage('1.png');
}
function setup() {
  createCanvas(400, 400);
  bgcolor = color(220); 
  
  greeting = createElement('h2', 'Welcome, put your finger on'); 
  greeting.position(width/2-140, height/2-50); 
  
  button = createButton('Ready?'); 
  button.position(greeting.x + 120, height/2+30);
  button.mousePressed(welcome); 
  img.loadPixels(); 
  c = img.get(img.width / 2, img.height / 2); 
  
  background(bgcolor);
}
function draw() {
  
  
  if(isImage == true){
  	image(img, 25, 25, 50, 50); 
  }
}
function welcome() {
  greeting.html('Please wear the headphone'); 
  greeting.position(width/2-140, height/2 -50); 
  bgcolor = color(180); 
  
  button.mousePressed(imageLoaded); 
  
}
function imageLoaded() {
  isImage = true;
  
  console.log('tr'); 
var spots; 
function preload() {
  img = loadImage("1.png");
}
particles = [];
function setup() {
  createCanvas(600, 400);
  var density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  spots = []; 
  
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = x + y * img.width;
      var c = img.pixels[index*4];
      var b = brightness([c]);
      if (b > 1) {
        spots.push(createVector(x, y));
      }
    }
  }
  console.log(spots.length);
}
function draw() {
  background(0);
  for (let i = 0; i < 10; i++) {
    var spot = spots[i]; 
    let p = new Particle(mouseX,mouseY);
    particles.push(p);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}
class Particle {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.vx = random(0, 0.2);
    this.vy = random(-1, 0);
    this.alpha = 255;
  }
  finished() {
    return this.alpha < 0;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 3;
  }
  show() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.x, this.y, 16);
  }
var circles;
var spots;
var img;
function preload() {
  img = loadImage("1.png");
}
function setup() {
  createCanvas(900, 400);
  var density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  spots = [];
  circles = [];
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = x + y * img.width;
      var c = img.pixels[index*4];
      var b = brightness([c]);
      if (b > 1) {
        spots.push(createVector(x, y));
      }
    }
  }
  console.log(img.width);
  console.log(img.height);
  console.log("pixels", img.pixels.length);
  console.log("spots", spots.length);
  console.log(density)
}
function draw() {
  background(0);
  var total = 10;
  var count = 0;
  while (count < total) {
    var newC = newCircle();
    if (newC !== null) {
      if (circles.length < 6000) {
      circles.push(newC);}
      count++;
      
    }
  }
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    if (circle.r > 5 && circle.r < 7) {
      circle.alpha = random(150,255); 
      
    }
    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
          if (circle !== other) {
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;
            if (d - 5 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }
    circle.show();
    circle.grow();
  }
}
function newCircle() {
  var r = int(random(0, spots.length));
  var spot = spots[r];
  var x = spot.x;
  var y = spot.y;
  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}var circles;
var spots;
var img;
function preload() {
  img = loadImage('1.png');
}
function setup() {
  createCanvas(900, 400);
  var density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  circles = [];
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = x + y * img.width;
      var c = img.pixels[index*4];
      var b = brightness([c]);
      if (b > 1) {
        var circle = new Circle(x,y,r);
        circles.push(circle);
      }
    }
  }
}
function draw() {
  background(0);
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    circle.show();
   
  }
}
var circles;
var spots;
var img;
function preload() {
  img = loadImage('1.png');
}
function setup() {
  createCanvas(900, 400);
  var density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  spots = [];
  circles = [];
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = x + y * img.width;
      var c = img.pixels[index*4];
      var b = brightness([c]);
      if (b > 1) {
        spots.push(createVector(x, y));
      }
    }
  }
  console.log(img.width);
  console.log(img.height);
  console.log("pixels", img.pixels.length);
  console.log("spots", spots.length);
  console.log(density)
}
function draw() {
  background(0);
  var total = 50;
  var count = 0;
  var attempts = 0;
  while (count < total) {
    var newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts > 100) {
      noLoop();
      console.log("finished");
      break;
    }
  }
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;
            if (d - 5 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    
    circle.show();
    circle.grow();
  }
}
function newCircle() {
  var r = int(random(0, spots.length));
  
  var spot = spots[r];
  var x = spot.x;
  var y = spot.y;
  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}var circles;
var spots;
var img;
function preload() {
  img = loadImage("1.png");
}
function setup() {
  createCanvas(900, 400);
  var density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  spots = [];
  circles = [];
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = x + y * img.width;
      var c = img.pixels[index*4];
      var b = brightness([c]);
      if (b > 1) {
        spots.push(createVector(x, y));
      }
    }
  }
  console.log(img.width);
  console.log(img.height);
  console.log("pixels", img.pixels.length);
  console.log("spots", spots.length);
  console.log(density)
}
function draw() {
  background(0);
  var total = 90;
  var count = 0;
  var attempts = 0;
  while (count < total) {
    var newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts >105) {
      noLoop();
      console.log("finished");
      break;
    }
    
    console.log(attempts); 
  }
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;
            if (d < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      } 
    
    circle.show();
    circle.grow();
  }
}
function newCircle() {
  var r = int(random(0, spots.length));
  var spot = spots[r];
  var x = spot.x;
  var y = spot.y;
  var valid = true;
  
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}
let sampler = new Tone.Sampler({
	"A1": "samples/casio/A1.mp3", 
  "D2": "samples/casio/D2.mp3"
});
sampler.envelope = {
  attack: 0.2,
  decay: 0,
  sustain: 1,
  release: 0.1
}
sampler.toMaster();
function keyPressed() {
  let pitch; 
  if(key == 'a'){
  	pitch = "A1";
  }
  else if(key == 's'){
  	pitch = "B1";
  }
  else if(key == 'd'){
  	pitch = "C2";
  }
  else if(key == 'f'){
  	pitch = "D2";
  }
  else if(key == 'g'){
  	pitch = "E2";
  }
  
  if(pitch && sampler.loaded){
  	sampler.triggerAttack(pitch);
  }
}
function keyReleased() {
  sampler.triggerRelease();
}
function setup() {
}
let turkey;
function preload() {
	 turkey = loadImage("turkey.jpg");
}
function setup() {
  createCanvas(400, 400);
  
  turkey.filter(THRESHOLD);
      
  
  turkey.loadPixels();
  for (let i = 0; i < turkey.pixels.length; i+=4) {
    let r = turkey.pixels[i];
    let g = turkey.pixels[i+1];
    let b = turkey.pixels[i+2];
    
    if (r === 255 && g === 255 && b === 255) {
      turkey.pixels[i] = 0;
      turkey.pixels[i+1] = 0;
      turkey.pixels[i+2] = 0;
    } else {
      turkey.pixels[i] = 153;
      turkey.pixels[i+1] = 233;
      turkey.pixels[i+2] = 241;
    }
  }
  turkey.updatePixels();
}
function draw() {
  background(220);
  image(turkey, 25, 25);
var circles;
var img;
function preload() {
  img = loadImage("assets/kitten.jpg");
}
function setup() {
  createCanvas(600, 600);
  var density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  circles = [];
  console.log(img.width);
  console.log(img.height);
  console.log("pixels", img.pixels.length);
  console.log(density)
}
function draw() {
  background(0);
  var total = 10;
  var count = 0;
  var attempts = 0;
  while (count < total) {
    var newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts > 1000) {
      noLoop();
      console.log("finished");
      break;
    }
  }
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
          if (circle !== other) {
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;
            if (d - 1 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }
    circle.show();
    circle.grow();
  }
}
function newCircle() {
  var x = random(0, img.width);
  var y = random(0, img.height);
  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d - 2 < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    var index = (int(x) + int(y) * img.width) * 4;
    var r = img.pixels[index];
    var g = img.pixels[index+1];
    var b = img.pixels[index+2];
    var c = color(r,g,b);
    return new Circle(x, y, color(c));
  } else {
    return null;
  }
}function preload() {
}
 var realWidth;
function setup() {
  createCanvas(windowWidth, windowHeight);
imageRatio = moon.height/moon.width;
  realWidth=windowWidth
}
function draw() {
  background(225);
 	var moonWidth;
  var moonHeight;
  moonWidth = moon.width;
  moonHeight= moon.height;
  
  if (windowWidth < realWidth) {
		moonWidth = windowWidth;
  	moonHeight= moonWidth*imageRatio;
  }
  image(moon,0,0,moonWidth,moonHeight);
}
function preload() {
}
 var realWidth;
function setup() {
  createCanvas(windowWidth, windowHeight);
imageRatio = moon.height/moon.width;
  realWidth=windowWidth
}
function draw() {
  background(225);
 	var moonWidth;
  var moonHeight;
  moonWidth = moon.width;
  moonHeight= moon.height;
  
  if (windowWidth < realWidth) {
		moonWidth = windowWidth;
  	moonHeight= moonWidth*imageRatio;
  }
  image(moon,0,0,moonWidth,moonHeight);
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(0);
  
  loadPixels();
  
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
         var index = (x + y * width) * 4; 
        pixels[index+0] = 255; 
        pixels[index+1] = 0; 
        pixels[index+2] = 255; 
        pixels[index+3] = 255; 
  }
}
  
  updatePixels();
}var bgc; 
var button;
var slider; 
var input; 
var para;
function setup() {
  createCanvas(400, 400);
  button = createButton('click');
  button.position(200,350);
  bgc = color(255);
  button.mousePressed(changeColor);
  para = createP('Your name');
  slider = createSlider(10,100,20);
  input = createInput(); 
}
function changeColor() {
  bgc = color(random(255));
}
function draw() {
  background(bgc);
  fill(200,slider.value(),slider.value());
  rect(200,200,150,150);
  fill(20,30,20);
  text(input.value(), 20, 30); 
  para.html(input.value()); 
  
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
}var yearNum;
var tem;
var json;
var freq;
var res; 
function preload(){
  json = loadJSON("nasa.json", gotData);
}
function gotData(){
  console.log('data got');
}
function setup(){
  for(let i=0; i<138; i++){
    yearNum = json.data[i].column0;
    tem = json.data[i].column1;
    freq= map(tem,-0.5,1,65,1046);
    console.log(yearNum, tem);
    
    wave = new p5.Oscillator();
  	wave.setType('sine');
  	wave.amp(0.5, 0.05);
    wave.freq(freq);
  	wave.start(i/6); 
    
  }
}
  
var res; 
var wave;
var playing = false;
var species;
var input, asking; 
function setup() {
  createCanvas(400, 400);
  var button = select('#submit');
  button.mousePressed(musicPlay);
  
  wave = new p5.Oscillator();
  wave.setType('sine');
  wave.amp(0);
  wave.start();   
}
function musicPlay() {
  loadJSON("gene.json", gotData); 
  
  if (!playing) {
    playing = true; 
  } else {
    palying = false;
  }
}
function gotData(data) {
  console.log(data);
  gene = data[document.getElementById("input").value].genome
  console.log(" new gene " + gene)
  if (playing) {
    wave.start();
    playNext();
  } else {
    wave.stop();
  } 
  playNext();
}
function draw() {
 
  background(220);
}
var indexToPlayNow = 0;
function playNext() {
  res = gene.charAt(indexToPlayNow % gene.length);
  
  if (res == "C") {
    wave.freq(246.94);
    wave.amp(0.5, 0.3);
  } else if (res == "A") {
    wave.freq(277.807);
    wave.amp(0.5, 0.3);
  } else if (res == "T") {
    wave.freq(308.675);
    wave.amp(0.5, 0.3);
  } else if (res == "G") {
    wave.freq(370.41)
    wave.amp(0.5, 0.3);
  }
  indexToPlayNow++;
  setTimeout(playNext, 200)
}
var song; 
var amp;
var volhistory  = [];
function preload() {
  song = loadSound('blues.mp3');
}
function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
function setup() {
  createCanvas(400, 400);
  button = createButton('toggle');
  button.mousePressed(toggleSong); 
  song.play();
  amp = new p5.Amplitude(); 
}
function draw() {
  background(0);
  stroke(255);
  noFill();
  beginShape();
  var vol = amp.getLevel(); 
  volhistory.push(vol);
  for(var i = 0; i <volhistory.length; i++) {
    var y = map (volhistory[i], 0, 0.1, height/2, 0);
    vertex(i,y);
  }
  endShape();
  
  if (volhistory.length > width) {
    volhistory.splice(0,1);
  }
function setup() {
  noCanvas();
  loadJSON(url, gotData, err);
}
function err() {
  console.log('error')
}
function gotData (data) {
  var titles = data.results;
  for (var i = 0; i <= titles.length; i++ ) {
    console.log(titles[i])
    createP(titles[i].title);
  }
}
function draw() {
  background(220);
}
var weather;
function setup() {
  createCanvas(400, 400);
  loadJSON(URL, gotData);
}
function gotData (data) {
  console.log(data);
  weather = data;
}
function draw() {
  
  background(220);
  fill(0);
  if (weather) {
  ellipse(150,100,weather.wind.speed, weather.main.humidity);
  }
}var spaceData;
var x = 0; 
function setup() {
  loadJSON('birds.json', gotData);
}
function gotData(data) {
  spaceData = data
}
function draw() {
  background(220);
  fill(255);
  if (spaceData) {
    randomSeed(4);
  for (i = 0; i < spaceData.number; i++) {
  ellipse(random(width), random(height), 15, 15)
  }
 }
  stroke(8);
  line(x,0,x,height);
  x = x+1; 
  if (x > width) {
    x = 0;
  }
}var data;
function preload() {
  data = loadJSON("birds.json");
}
function setup() {
  noCanvas();
  var birds = data.birds;
     for (var i = 0; i < birds.length; i++) {
       createElement('h1', birds[i].family);
       var members = birds[i].members;
       for (var j = 0; j < members.length; j++) {
            createDiv(members[j]);
       }
}
}
function draw() {
}function setup() {
  createCanvas(400, 400);
  
  loadJSON("name.json", gotData);
}
function gotData(data) {
  for (let i = 0; i < data.length; i++) {
    ellipse(random(width), random(height),data[i].age);
    console.log(data[i].name);
  }
}
function draw() {
}let clock = {
  x: 0,
  y: 0,
  r: 50 
}
let a = 0; 
let c= [];
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
    
}
function draw() {
 
background(0);
  for (clock.x = 40; clock.x<=width; clock.x+=80) {
  for (clock.y = 40; clock.y<=height; clock.y+=80) {
    noFill();
    stroke(255);
    strokeWeight(1);
    ellipse(clock.x,clock.y,clock.r,clock.r);
    strokeWeight(4);
    point(clock.x, clock.y);
  
      let clock_1 = new Clock(clock.x, clock.y, random(0, 360), clock.r);
      c.push(clock_1);
  }}
  for (let i = 0; i <25; i++ ) {
      c[i].display();
      c[i].move();
  }
}let snake;
let rez = 10;
let food;
let w; 
let h;
function setup() {
  createCanvas(400, 400);
  w = floor(width/rez);
  h = floor(height/rez);
  frameRate(5);
  snake = new Snake();
  foodLocation();
}
function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x,y);
}
  
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.setDir(-1,0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDir(1,0);  
  } else if (keyCode === DOWN_ARROW) {
    snake.setDir(0,1);
  } else if (keyCode === UP_ARROW) {
    snake.setDir(0,-1);
  }
}
function draw() {
  background(220);
  scale(rez);
  if (snake.eat(food)) {
    foodLocation();
  snake.update();
  snake.show();
  
  
  noStroke();
  fill(255,0,0);
  rect(food.x, food.y, 1, 1);
var portName = "/dev/cu.usbmodem1421";
var inData;
  trim(inData);
  if (!inData) return;
  
  
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  fill(0);
  text('sensor value: ' + inData, 30, 30);
}
  for (var i = 0; i < portList.length; i++) {
  }
}
  let balls = [];
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++) {
    let ball = new Ball (random(0,width), random(0,height), random(-1,1), 1, random(1,50));
    balls.push(ball);
  }
}
function draw() {
  background(220);
  for (let b of balls) { 
    b.display();
    b.move(); 
    var ind = balls.indexOf(b);
      for (let other of balls) {
        var ind_2 = balls.indexOf(other);
        if (b != other && b.intersects(other)) {
          balls.splice(ind,1);
          balls.splice(ind_2,1);
      }
    }
  }
}
let balls = [];
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++) {
    let ball = new Ball (random(0,width), random(0,height), random(-1,1), 1, random(1,50));
    balls.push(ball);
  }
}
function draw() {
  background(220);
  for (let b of balls) { 
    b.display();
    b.move(); 
    
    var ind = balls.indexOf(b);
    
      if (dist(b.x,b.y,mouseX,mouseY) <=b.r) {
         balls.splice(ind,1); 
      }
  }
}let b = [];
function setup() {
  createCanvas(400,400);
}
  
function draw() {
  background(220);
  for (let i=0; i<b.length;  i++) {
    if (mouseIsPressed) {
      let ball = new Ball (mouseX, mouseY,random (-1,1), 1, random(10,20));
      b.push(ball);
    }
    
    b[i].display();
    b[i].move();
   }
}
let a, b, c;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  add(15,15);
  display();
}
function add(a,b) {
  c = a + b;
}
function display() {
  text(c,20,30);  
}function preload() {
  playerImg = loadImage('image/nyc.png');
} 
function setup() {
  secondSetup();
  gameSetup();
  
}
function draw() {
  ui();
  runGame();
}
  
class Ball {
  constructor (xx,yy,xdir,ydir,rr) {
    this.x = xx;
    this.y = yy;
    this.xdir = xdir;
    this.ydir = ydir;
    this.rr = rr;
  }
  
  display() {
    ellipse(this.x,this.y,this.rr,this.rr);
  }
  
  move() {
  this.x = this.x + this.xdir;
  this.y = this.y + this.ydir;
  }
  
  bounce() {
  if (this.x < 0 || this.x > width) {
    this.xdir = this.xdir * -1
  }
  if (this.y < 0 || this.y > height) {
    this.ydir = this.ydir* -1
  }
  }
}
let b,b1;
function setup() {
  createCanvas(400, 400);
  
  b = new Ball (50, 50, 1, 2, 50); 
  b1 = new Ball (90,80,2,1,40);
}
function draw() {
  background(220);
  b.display();
  b1.display();
  
  b.move();
  b1.move();
  
  b.bounce();
  b1.bounce();
}
let ball = {
  x:100,
  y:50,
  d:60,
  xspeed:1,
  yspeed:10
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  show();
  move();
  bounce();
}
function show () {
  ellipse (ball.x, ball.y, ball.d, ball.d);
  move();
  bounce();
}
  
function move () {
  ball.x = ball.x + ball.xspeed;
  ball.y = ball.y + ball.yspeed;
}
function bounce () {
  if (ball.x < 0 || ball.x > width) {
    ball.xspeed = ball.xspeed * -1
  }
  if (ball.y < 0 || ball.y > height) {
    ball.yspeed = ball.yspeed * -1
  }
}let x = 0;
let y = 0;
let d1 = 40;
let d2 = 80;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  col = map (mouseX,0,width,0,255);
  for (x=0; x<=width;x=x+d1) {
  for (y=0; y<=height;y=y+d2) {
    rect (x,y,d1,d2);
    if (mouseX > x && mouseX < x+d1 && mouseY > y && mouseY < y + d2) {
      fill (col);
    } else {
      fill (255,255,255);
    }
      rect (x,y,d1,d2);
    }
  }
  
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  
  rectMode(CENTER);
  drawSomething(width/2, height/2, 200);
}
function drawSomething(x,y,s) {
  rect(x,y,s,s);
  if (s>10) {
    drawSomething(x,y,s/2);
  }
}
let b, b1; 
function setup() {
  createCanvas(400, 400);
  b = new Ball (50, 50, 1, 2, 50); 
  b1 = new Ball (90,80,2,1,40);
  
}
function draw() {
  background(220);
  
  b.move (); 
  b1.move(); 
  
  b.display();
  b1.display(); 
  
  b.hover();
  b1.hover(); 
  
  if (mouseIsPressed) {
    b.stop();
  } else {
    b.start () ;
  }
  
}let ball = {
  x:100,
  y:100,
  d:50,
  xspeed:1,
  yspeed:1
}
 
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  
  displayBall();
  moveBall();
  bounceBall();
}
function displayBall() {
  ellipse(ball.x, ball.y, ball.d, ball.d); 
  moveBall();
  bounceBall();
}
function moveBall () {
  ball.x = ball.x + ball.xspeed; 
  ball.y = ball.y + ball.yspeed; 
}
function bounceBall() {
  if (ball.x <=0 || ball.x >= width) {
    ball.xspeed = ball.xspeed * -1; 
  }
  
  if (ball.y <=0 || ball.y >= height) {
    ball.yspeed = ball.yspeed * -1;
  }
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  
  for (let i = 0; i < 100; i ++) {
    drawCircle(random(0,100), random (0,100));
  }
  
  drawCircle(10,50);
  drawCircle(0,50);
  drawCircle(100,50);
  drawCircle(75,50);
}
function drawCircle(offset, diameter) {
  fill(random(0,100), random(0,255), random(0,255)); 
  ellipse(mouseX+offset, mouseY+offset, diameter, diameter); 
  
}let dw;
let dh;
let button = false;
let l = 20;
let c = 255;
let randomArray = [];
let color;
let x1;
let x2;
let y1;
let y2;
let p = 1;
function setup() {
  noCursor();
  dw = displayWidth;
  dh = displayHeight;
  createCanvas(dw, dh);
  let idx = 0;
  for (let w = 0; w < dw; w += l) {
    for (let h = 0; h < dh; h += l) {
      randomArray[idx] = random(1);
      idx++;
    }
  }
}
function draw() {
  color = {
    r: 0,
    g: map(mouseX, 0, dw, 50, 150),
    b: map(mouseY, 0, dh, 50, 200),
  }
  background(0);
  let idx = 0;
  for (let w = 0; w < dw; w += l) {
    for (let h = 0; h < dh; h += l) {
      if (randomArray[idx] < 0.5) {
        x1 = w;
        x2 = w + 3;
        y1 = h;
        y2 = h + 10;
        if (dist (x1, y1, mouseX, mouseY)<100)  {
          stroke(color.r, color.g, color.b, 100);
        }
        else{
        stroke(color.r, color.g, color.b, 5);}
        line(x1, y1, x2, y2)
        p = p * -1;
        x1 = w + 3;
        x2 = w + l;
        y1 = h + 10;
        y2 = h + l;
        
        if (dist (x1, y1, mouseX, mouseY)<100)  {
          stroke(color.r, color.g, color.b, 100);
        }
        else{
        stroke(color.r, color.g, color.b, 5);}
        line(x1, y1, x2, y2)
        p = p * -1;
      } else {
        x1 = w + l;
        x2 = w + 12;
        y1 = h;
        y2 = h + 12;
        if (dist (x1, y1, mouseX, mouseY)<100)  {
          stroke(color.r, color.g, color.b, 100);
        }
        else{
          stroke(color.r, color.g, color.b, 5);}
        line(x1, y1, x2, y2)
        x1 = w + 12;
        x2 = w;
        y1 = h + 12;
        y2 = h + l;
        if (dist (x1, y1, mouseX, mouseY)<100)  {
          stroke(color.r, color.g, color.b, 100);
        }
        else{
        stroke(color.r, color.g, color.b, 5);}
        line(x1, y1, x2, y2)
        p = p * -1;
      }
      idx++;
    }
  }
  noStroke();
  fill(255, 5);
  if (mouseIsPressed) {
      fill (255, 30);
      }
ellipse(mouseX, mouseY, 200, 200);
}let w = 1;
let h = 1; 
let x = 0;
let y = 0;
let d = 400/10
 
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  for (w = -1; w <=10; w++) {
  for (h = -1; h <=10; h++) {  
    x = w * d;
    y = h * d;
    rect (x,y,d,d)
    if((w+1)%2==0) {
      if((h+1)%2==0) {
        fill (0);}
       else {
        fill (255);}
    }
      else if ((h+1)%2 !=0) {
        fill (0);}
       else { 
        fill (255);}
      }
   }
}
  
  
  
let w = 1;
let h = 1; 
let x = 0;
let y = 0;
let d = 400/10
 
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  for (w = 0; w <=10; w++) {
  for (h = 0; h <=10; h++) {  
    x = w * d;
    y = h * d;
    rect (x,y,d,d)
  }
  }
}let x = 0;
let d = 400/10; 
let i = 1;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(255);
  for (i = 0; i <= width/d; i +=1 ) {
    x = i * d;
    line(x, 0, x, height);
    
     if (mouseX > x && mouseX < x + d) {
       fill(120, map (x, 0, width, 0, 200), map (x, 0, width, 0, 255));  
       rect (x, 0, d, height);
     }   
  }
}let x = 0;
let d = 400/10; 
let i = 1;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(255);
  for (i = 0; i <= width/d; i +=1 ) {
    x = i * d;
    line(x, 0, x, height);
    
     if (mouseX > x && mouseX < x + d) {
       if (i<=4) {
         fill (65,105,225); 
       } else {
         fill (255,0,0);
         
       }
     rect (x, 0, d, height);
    }   
  }
}
let x = 0;
let d = 400/10; 
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(255);
  for (x = 0; x <= width; x = x + d) { 
    line(x, 0, x, height);
    
     if (mouseX > x && mouseX < x + d) {
         fill (255,0,0); 
       } else {
         fill (255,255,255);  
       }
     rect (x, 0, d, height);
    }   
  }let colorIsRed = false; 
let colorHasChanged = false; 
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  
  if (colorIsRed) {
    fill(255,0,0);
  } else {
    fill(255)
  }
  
  rect(200, 200, 100, 100);
  if (mouseX > 200 && mouseX < 300 && mouseY < 300 && mouseY > 200 ) {
    if (!colorHasChanged) {
      colorIsRed = !colorIsRed;
      colorHasChanged = true; 
    } 
  } else {
    colorHasChanged = false; 
  }   
}let x = 150; 
let y = 150; 
let w = 50; 
let h = 50; 
let b = false;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h && mouseIsPressed) {
    b = true; 
  } else {
    b = false;
  }
  
  if (b) {
    background (255);
  } else {
      background (0);
    }
  
  fill (0);
  rect (x,y,w,h);
}
let x = 0;
let d = 400/10; 
let i = 1;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(255);
  for (i = 0; i <= width/d; i +=1 ) {
    x = i * d;
    line(x, 0, x, height);
    
     if (mouseX > x && mouseX < x + d) {
       if (i%2==0) {
         fill (65,105,225); 
       } else {
         fill (255,0,0);
         
       }
     rect (x, 0, d, height);
    }   
  }
}
let x = 0;
let y = 0;
let speed = 3;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  if (x > width || x < 0) {
     speed = speed * -1
  }
  x += speed 
  ellipse (x,200,100,100);
var button = false;
var x = 50;
var y = 50;
var w = 100;
var h = 75;
function setup() {
  createCanvas(200,200); 
}
function draw() {
  if (mouseX > x && mouseX < x+w && mouseY > y && mouseY < y+h && mouseIsPressed) {
    button = true; 
  } else {
    button = false;
  }
 if (button) {
    background(255);
    stroke(0);
  } else {
    background(0);
    stroke(255);
  }
  
  fill(175);
  rect(x,y,w,h);
var w = 16;
var h = 16;
var index = 0;
function setup() {
  createCanvas(640, 384);
  background('#0000ff');
  strokeWeight(3);
  stroke(224);
}
function draw() {
  var x1 = w*index;
  var x2 = x1 + w;
  var y1 = h*23;
  var y2 = h*24;
  if (random(2) < 1) {
    line(x2, y1, x1, y2);
  } 
  else {
    line(x1, y1, x2, y2);
  }
  
  index++;
  if (index == width/w) {
    var p = get(0, h, width, h*23);
    background('#0000ff');
    set(0, 0, p);
    index = 0;
  }
}var x = 0;
var speed = 3;
var b = 0;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  noStroke();
  fill(121,121,121);
  ellipse(x,200,100,100);
  
  if (x > width || x < 0) {
    speed = speed * -1;
  }
  x = x + speed;
  
  for (var b = 0; b<=width; b = b + 50) {
    fill(200,0,100);
    ellipse(b,300,50,50);
  }
}var spot = {
    x: 100, 
    y: 200,
    d: 20
};
var col = {
    r:255,
    g:0,
    b:0
};
function setup() {
  createCanvas(400, 400);
  background(0);
}
function draw() {
  
  col.r = random(100,255);
  col.g 
  col.b = random(100,255);
  spot.x = random(0,width);
  spot.y = random(0,height);
  noStroke()
  ellipse(spot.x,spot.y,spot.d,spot.d);
}var r = 0;
var b = 255;
var circle = {
  x:50,
  y:20,
  d:50
};
function setup() {
  createCanvas(400,400);
}
function draw() {
  noStroke();
  r = map(mouseY+mouseX, 0, 400, 0, 255);
  b = map(mouseY+mouseX, 0, 400, 255, 0);
  
  background(r,0,b);
  fill(250,200,200);
  ellipse(mouseX,mouseY,circle.d,circle.d);
  
}
  
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  fill(64, 224, 208);
  ellipse(200, 200, 110, 110);
}
function setup() {
  createCanvas(400, 300);
}
function draw() {
  background(0,255,255);
  
  stroke(255,0,0);
  strokeWeight(38);
  line(0,0,400,300);
  noStroke();
  
  fill(0, 200, 0);
  ellipse(200,150,190,140);
  
  fill(0, 0, 128);
  rect(270,125,25,25);
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  
}function setup() {
  createCanvas(500, 500);
  background(255);
  angleMode(DEGREES);
  noFill();
}
function draw() {
  background(255);
  stroke(0);
  
  fill (178,88,37)
  strokeWeight();
  
  beginShape();
  curveVertex(150,150);
  curveVertex(220,265);
  curveVertex(380,265);
  curveVertex(414,330);
  curveVertex(470,470);
  curveVertex(390,365);
  curveVertex(390,500);
  curveVertex(355,500);
  curveVertex(355,365);
  curveVertex(270,365);
  curveVertex(270,500);
  curveVertex(235,500);
  curveVertex(235,365);
  curveVertex(165,310);
  curveVertex(120,270);
  curveVertex(45,280);
  curveVertex(80,200);
  curveVertex(150,150);
  endShape(CLOSE);
  fill(255);
  stroke(25,18,12);
  ellipse(300,100,77,80);
  stroke(25,18,12);
  strokeWeight(1);
  fill(25,18,12);
  
  
  beginShape();
  curveVertex(250,80);
  curveVertex(300,35);
  curveVertex(340,50);
  curveVertex(400,100);
  curveVertex(360,180);
  curveVertex(300,90);
  endShape(CLOSE);
  fill(25,18,12);
  
  ellipse(280,100,15,15);
  strokeWeight(5);
  point(266,120);
  point(290,120);
  
  
}
var eye1 = {
  x: 280,
  y: 100
};
var eye1ending = {
  x: 128,
  y: 200
}
var eye2 = {
  x: 128,
  y: 200
};
var eye2ending = {
  x: 280,
  y: 100
}
var x = 0
function setup() {
  createCanvas(500, 500);
  background(255);
  angleMode(DEGREES);
  noFill();
}
function draw() {
  background(255);
  if (eye1.x >= eye1ending.x) {
    eye1.x -= (eye1.x-eye1ending.x)/100;
    eye1.y -= (eye1.y-eye1ending.y)/100;
  
  };
  if (eye2.x <= eye2ending.x) {
    eye2.x -= (eye2.x - eye2ending.x)/100;
    eye2.y -= (eye2.y - eye2ending.y)/100;
  };
  
  for (var x = 0; x <= mouseX; x = x + 30) {
  
  fill('#73DC69');
  triangle(x,500,x+15,470,x+30,500);
  
  };
  
  if (mouseX >= 46 && mouseX <= 479) {
     fill(0,255,100);
  }
  noStroke();
  if (mouseX >= 46 && mouseX <= 479) {
     fill('#ec98a2');
  }
    else {
     fill(178, 88, 37);
  }
  strokeWeight(2);
  beginShape();
  curveVertex(150, 150);
  curveVertex(160, 150);
  curveVertex(200, 200);
  curveVertex(260, 250);
  curveVertex(380, 250);
  curveVertex(440, 250);
  curveVertex(460, 330);
  curveVertex(490, 430);
  curveVertex(490, 440);
  curveVertex(440, 365);
  curveVertex(410, 365);
  curveVertex(389, 500);
  curveVertex(355, 500);
  curveVertex(355, 365);
  curveVertex(275, 365);
  curveVertex(275, 500);
  curveVertex(235, 500);
  curveVertex(235, 365);
  curveVertex(165, 310);
  curveVertex(120, 270);
  curveVertex(45, 280);
  curveVertex(80, 200);
  endShape(CLOSE);
  stroke(178, 88, 37);
  noStroke();
  triangle(130, 163, 140, 128, 160, 150);
 
  fill(121, 121, 109);
  noStroke();
  beginShape();
  curveVertex(280, 135);
  curveVertex(300, 180);
  curveVertex(330, 220);
  curveVertex(400, 220);
  curveVertex(380, 168);
  curveVertex(360, 135);
  endShape(CLOSE);
   
  fill(255);
  stroke(25, 18, 12);
  ellipse(300, 100, 77, 80);
  stroke(25, 18, 12);
  strokeWeight(0);
  fill(25, 18, 12);
  strokeWeight(1);
  beginShape();
  curveVertex(250, 80);
  curveVertex(300, 35);
  curveVertex(340, 50);
  curveVertex(400, 100);
  curveVertex(360, 180);
  curveVertex(300, 90);
  endShape(CLOSE);
  fill(25, 18, 12);
  ellipse(eye1.x, eye1.y, 15, 15);
  strokeWeight(3);
  noFill();
  beginShape();
  vertex(268, 120);
  bezierVertex(270, 135, 290, 135, 290, 120);
  endShape();
  
  fill(241, 242, 236)
  noStroke();
  beginShape();
  curveVertex(290, 298);
  curveVertex(280, 250);
  curveVertex(320, 213);
  curveVertex(400, 215);
  curveVertex(380, 250);
  curveVertex(330, 250);
  curveVertex(330, 298);
  endShape(CLOSE);
  fill(75, 33, 19);
  rect(290, 280, 42, 42, 15, 15, 2, 2);
  strokeWeight(30);
  arc(299, 320, 66, 42, 0, 180);
  fill(97, 97, 85);
  noStroke();
  strokeWeight(5);
  beginShape();
  curveVertex(300, 155);
  curveVertex(300, 178);
  curveVertex(235, 205);
  curveVertex(240, 220);
  curveVertex(315, 195);
  curveVertex(330, 180);
  curveVertex(330, 155);
  endShape(CLOSE);
  fill(9);
  arc(238, 213, 22, 22, 60, 240);
  stroke(66, 69, 78);
  strokeWeight(4);
  var p1 = {
      x: 230,
      y: 220
    },
    p2 = {
      x: 210,
      y: 250
    };
  var p3 = {
      x: 180,
      y: 280
    },
    p4 = {
      x: 140,
      y: 280
    };
  curve(p1.x, p1.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
  curve(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, p4.x, p4.y);
  fill(random(250),0,random(255));
  noStroke();
  ellipse(eye2.x, eye2.y, 25, 25); 
};