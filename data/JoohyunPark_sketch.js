let p, started;
function setup() {
    createCanvas(800, 800);
    p = [];
    started = false;
}
function draw() {
  fill(255, 20);
  rect(0, 0, width, height);
    
        recordParticles();
        drawParticles();
        killParticles(); 
}
function recordParticles() {
    if (mouseIsPressed) {
        for ( i = 0; i < 2; i++) {
            p.push(new Particle(mouseX, mouseY));
        }
    }
}
function drawParticles() {
     p.forEach(function(i)   {
        let noise = createVector(random(-0.5, 0.5), random(-0.1, .5));
        i.applyForce(noise);
        let friction = i.vel.copy();
        friction.mult(-.015);
        i.applyForce(friction);
        i.update();
        i.show();
    }  );
}
function killParticles() {
    for ( i = p.length - 1; i >= 0; i--) {
        if (p[i].r === 0) {
            p.splice(i, 1);
        }
    }
}
function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.r = 1;
    this.maxR = random(5, 10);
    this.bl = random(122, 255);
    this.rd = 255
    this.switch = false;
    this.pos = createVector(this.x, this.y);
    this.vel = createVector(pmouseX + random(-0.1, 0.1), pmouseY + random(0.1)).sub(createVector(mouseX, mouseY));
    this.acc = createVector(0, random(1));
    this.show = function() {
        noStroke();
        fill(0);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
    this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(4);
        this.pos.add(this.vel);
        this.acc.mult(0);
        if (this.switch==false) {
            if (this.r < this.maxR) {
                this.r += 1;
            } else {
                this.switch = true;
            }
        } else {
            if (this.r > 0) {
                this.r -= .05;
                this.rd -= 6;
            } else {
                this.r = 0;
            }
        }
    }
    this.applyForce = function(f) {
        this.acc.add(f);
    }
let value1, value2 ;  
function setup() {
}
  
  if (inString.length > 0) {
      if (sensors.length > 1) {
       value1 = sensors[0]; 
       value2 = sensors[1];
     }
    }
  }
  console.log(inString);
}
 
function draw() {
 background(0);
 fill(255);
}
function keyPressed() {
 if (key ==='H' || key ==='L') { 
 }
}
let scl, spc;
let particles;
function setup() {
  createCanvas(600,600);
  scl = 600;
  spc = 10;
  particles = [];
  for( i = 0; i < 20; i++) {
    particles.push(new Particle(random(width),random(height)));
  }
  colorMode(HSB);
}
function keyPressed() {
  particles = [];
}
function draw() { 
  background(frameCount/30,50,20);
  if(mouseIsPressed) {
    particles.push(new Particle(mouseX,mouseY));
  }
  for(var i = 0; i < particles.length; i++) {
    particles[i].update();
  }
}
function get_angle(x,y) {
  return map(noise(x/scl,y/scl,frameCount/1000),0,1,0,TWO_PI*2);
}
Particle = function(x,y) {
  this.pos = createVector(x,y);  
  this.vel = createVector();
  this.maxl = 5;
  this.hist = [];
  this.c = color(random(255),100,100);
  this.life = random(50,150);
  this.fstrength = 3;
  this.maxVel = random(1,10);
    
    if (this.x <= mouseX) {
      this.xsign = 1;
    } else {
      this.xsign = -1;
    }
    if (this.y <= mouseY) {
      this.ysign = 1;
    } else {
      this.ysign = -1;
    }
  
  
 this.acc = createVector(this.xsign * random(0, 0.03), this.ysign * random(0, 0.03));
  
  
  this.update = function() {
    if(this.hist.length < this.maxl) {
      this.hist.push(createVector(this.pos.x,this.pos.y));
    } else {
      this.hist[this.maxl-1] = createVector(this.pos.x,this.pos.y);
    }
    
    for(var i = 0; i < this.hist.length-1; i++) {
      this.hist[i] = this.hist[i+1];
    }
    
    this.pos.x = constrain(this.pos.x, 0, width);
	this.pos.y = constrain(this.pos.y, 0, height);
    
    
    this.vel.limit(this.maxVel);
    
    this.flow();
    this.draw();
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.acc.mult(0);
    
    this.life = this.life - 1;
    
  }
  
  this.draw = function() {
    stroke(this.c);
    for(var i = 0; i < this.hist.length-1; i++) {
      if(p5.Vector.dist(this.hist[i],this.hist[i+1]) < 25) {
        strokeWeight(map(i,0,this.maxl-1,1,this.maxVel*2));
        line(this.hist[i].x,this.hist[i].y,this.hist[i+1].x,this.hist[i+1].y);
      }
    }
  }
  
  this.applyForce = function(f) {
    this.acc.add(f);
  }
  
  this.flow = function() {
    var a = get_angle(this.pos.x,this.pos.y);
    this.applyForce(createVector(cos(a)*this.fstrength,sin(a)*this.fstrength));
  }
  
    
let CHARGE_SUB = 1; 
let CHARGE_MAX = 255;
let flies = [];
let num = 150 ;
let started = false ;
let canvas ; 
let standardX, standardY ;
class Fly {
  constructor(x, y, vx, vy){
  }
  
  
   rand_acc() {  
      this.xmid = random(width);
    this.ymid = random(height); 
     
     if(mouseIsPressed){
       this.xmid = mouseX ;
    this.ymid = mouseY; 
    
     }
     
     console.log(this.xmid);
     
      if (this.x <= this.xmid) {
      this.xsign = 1;
    } else {
      this.xsign = -1;
    }
    if (this.y <= this.ymid) {
      this.ysign = 1;
    } else {
      this.ysign = -1;
    }
    this.ax = this.xsign * random(0, 0.05);
    this.ay = this.ysign * random(0, 0.05);
     
  }
  update() {
    if (random(3) < 1) {
      this.rand_acc();
    }
    this.vx += this.ax;
    this.vy += this.ay;
    this.vx = constrain(this.vx, V_MIN, V_MAX);
    this.vy = constrain(this.vy, V_MIN, V_MAX);
    this.x += this.vx;
    this.y += this.vy;
    this.x = constrain(this.x, 0, width-1);
    this.y = constrain(this.y, 0, height-1);
  }
  display() {        
    fill(100, 100, 255);
    ellipse(this.x, this.y, 5, 5);
    this.alpha = map(this.charge, 0, CHARGE_MAX, 0, 255);    
    fill(255, this.alpha);
    ellipse(this.x, this.y, this.r, this.r);
  }
}
function setup() {
  createCanvas(600, 600);
  for (i = 0; i < num; i++) {
    flies[i] = new Fly(random(width), random(height), random(-1, 1), random(-1, 1));
  }  
}
function draw() {
  
  
  fill(0, 20);
  canvas = rect(0, 0, width, height);
  ellipseMode(CENTER);
  noStroke();
  for (i = 0; i < num; i++) {
    flies[i].update();
    flies[i].display();
  }
}let p, started;
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    p = [];
    started = false;
}
function draw() {
    background(0, 20);
    
        recordParticles();
        drawParticles();
        killParticles(); 
}
function recordParticles() {
    if (mouseIsPressed) {
        noCursor();
        for (var i = 0; i < 5; i++) {
            p.push(new Particle(mouseX, mouseY));
        }
    }
}
function mousePressed() {
    started = true;
}
function mouseReleased() {
    cursor(ARROW);
}
function drawParticles() {
     p.forEach(function(i)   {
        let noise = createVector(random(-.5, .5), random(-.5, .5));
        i.applyForce(noise);
        let friction = i.vel.copy();
        friction.mult(-.015);
        i.applyForce(friction);
        i.update();
        i.show();
    }  );
}
function killParticles() {
    for (var i = p.length - 1; i >= 0; i--) {
        if (p[i].r === 0) {
            p.splice(i, 1);
        }
    }
}
function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.r = 1;
    this.maxR = random(5, 10);
    this.bl = random(122, 255);
    this.rd = 255
    this.switch = false;
    this.pos = createVector(this.x, this.y);
    this.vel = createVector(pmouseX + random(-5, 5), pmouseY + random(-5, 5)).sub(createVector(mouseX, mouseY));
    this.acc = createVector();
    this.show = function() {
        noStroke();
        fill(this.rd, 0, this.bl);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
    this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(5);
        this.pos.add(this.vel);
        this.acc.mult(0);
        if (this.switch==false) {
            if (this.r < this.maxR) {
                this.r += 1;
            } else {
                this.switch = true;
            }
        } else {
            if (this.r > 0) {
                this.r -= .2;
                this.rd -= 6;
            } else {
                this.r = 0;
            }
        }
    }
    this.applyForce = function(f) {
        this.acc.add(f);
    }
}var ctracker;
function setup() {
  var videoInput = createCapture(VIDEO);
  videoInput.size(600, 400);
  videoInput.position(0, 0);
  var cnv = createCanvas(500, 400);
  cnv.position(0, 0);
  
  ctracker = new clm.tracker();
  ctracker.init();
  ctracker.start(videoInput.elt);
  noStroke();
}
function draw() {
  clear();
  var positions = ctracker.getCurrentPosition();
  for (var i = 0; i < positions.length; i++) {
    fill(map(positions[i][0], width * 0.33, width * 0.66, 0, 255), map(positions[i][1], height * 0.33, height * 0.66, 0, 255), 255);
    ellipse(positions[i][0], positions[i][1], 5, 5);
  }
}let video, ambient, oriental;
let scale = 20;
let stars = [];
let num = 380;
let slider;
function preload() {
  ambient = loadSound("ambient.mp3");
  oriental = loadSound("oriental.mp3");
  video = createVideo("sequence.mp4");
}
function setup() {
  let base = createCanvas(720, 480);
  oriental.setVolume(0.1);
  oriental.loop();
  ambient.setVolume(0.05);
  ambient.loop();
  video.loop();
  video.hide();
  frameRate(200);
  slider = createSlider(0, 255, 0);
  slider.position(width / 2 - 60, 490)
  amplitude = new p5.Amplitude();
  pixelDensity(1);
  video.size(width / scale, height / scale);
  for (i = 0; i < num; i++) {
    stars.push(new Stars(random(-500, -10), random(0, height), random(5, 20), random(7), scale));
  }
}
function draw() {
  video.loadPixels();
  for (i = 0; i < num; i++) {
    stars[i].run();
  }
let starArray = [];
let numberOfStars = 2000;
let newStars =50;
function setup() {
  createCanvas(900, 900);
  w2=width/2;
  h2= height/2;
  d2 = dist(0, 0, w2, h2);
  noStroke();
  neuerStern= new Star(random(width), random(height),random(0.2, 5), 0, random(0,0.03));
 frameRate(9000);
  background(0);
}
function draw() {
  
  
    starArray.push(new Star(random(width), random(height),random(0.2, 5), 0, random(0,0.03)));
  }
	fill(map(dist(mouseX, mouseY, w2, h2), 0, d2, 255, -10));
  neuerStern.render();
  for ( i = 0; i<starArray.length; i++) {
    if (starArray[i].x<0||starArray[i].x>width||starArray[i].y<0||starArray[i].y>height) {
			starArray.splice(i);
		}
    starArray[i].render();
  }
  if (starArray.length>numberOfStars) {
    for ( k = 0; k<newStars; k++) {
      starArray.splice(k);
    }
  }
}
var num = 1000;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);
function setup(){
  createCanvas(windowWidth,windowHeight);
  noStroke(); 
  fill(0);
  ellipseMode(RADIUS);
  background(0);
  blendMode(ADD);
  
  for(var i =0; i< num; i++){
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
  }
}
function draw(){
  fill(0,0,0);
  rect(0,0,width,height);
  
  for(var i=0; i<num; i++){
      ax[i] = magnetism * (mouseX - x[i]) / (distance * distance); 
      ay[i] = magnetism * (mouseY - y[i]) / (distance * distance);
    }
    
    vx[i] = vx[i]*gensoku;
    vy[i] = vy[i]*gensoku;
    
    
    var g = map(sokudo, 0,5, 64, 255);
    var b = map(sokudo, 0,5, 128, 255);
    fill(r, g, b, 32);
    ellipse(x[i],y[i],radius,radius);
  }
  
}let video;
let scale = 20;
let stars = [];
let num = 800;
let starSize;
let music;
function preload() {
  music = loadSound("Marvel Studios Fanfare HD.mp3");
}
function setup() {
  let base = createCanvas(640, 500);
  base.mouseClicked(goPlay);
  amplitude = new p5.Amplitude();
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / scale, height / scale);
  video.hide();
  for (i = 0; i < num; i++) {
    stars.push(new Stars(random(-500, -10), random(0, height), random(5, 20), random(10), scale));
  }
}
function goPlay() {
  if (music.isPlaying()) {
    music.pause();
  } else {
    music.play();
  }
}
function draw() {
  background(0);
  video.loadPixels();
  for (i = 0; i < num; i++) {
    stars[i].run();
  }
}var constellation = [];
var n;
var d;
function setup() {
  createCanvas(500, 500);
  n = 200;
  for (var i = 0; i <= n; i++) {
    constellation.push(new star());
  }
  strokeWeight(.75);
  stroke('#FFFFFF');
}
function draw() {
  background('#000000');
  for (var i = 0; i < constellation.length; i++) {
    constellation[i].update();
    for (var j = 0; j < constellation.length; j++) {
          line(constellation[i].loc.x, constellation[i].loc.y, constellation[j].loc.x, constellation[j].loc.y)
        }
      }
    }
  }
}
function star() {
  this.loc = createVector(width / 2 + sin(this.a) * this.r, height / 2 + cos(this.a) * this.r);
  this.speed = createVector();
  this.speed = p5.Vector.random2D();
  this.bam = createVector();
  this.m;
  this.update = function() {
      this.bam.mult(0.45);
      this.speed.add(this.bam);
      this.speed.normalize().mult(this.m);
      if (dist(this.loc.x, this.loc.y, width / 2, height / 2) > (width / 2) * 0.98) {
        if (this.loc.x < width / 2) {
        } else if (this.loc.x > width / 2) {
        }
        if (this.loc.y < height / 2) {
          this.loc.y = width - this.loc.y - 4;
        } else if (this.loc.x > height / 2) {
          this.loc.y = width - this.loc.y + 4;
        }
      }
      this.loc = this.loc.add(this.speed);
var cols, rows;
let speed = 0;
let boxY = 0;
let stars = [];
let stars2 = [];
let num = 100;
let level, value, starSize;
function preload() {
  music = loadSound("Marvel Studios Fanfare HD.mp3");
}
function setup() {
  colorMode(HSB);
  let base = createCanvas(640, 480);
  base.mouseClicked(goPlay);
  amplitude = new p5.Amplitude();
  cols = width / videoScale;
  rows = height / videoScale;
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(cols, rows);
  for (i = 0; i < num; i++) {
    stars.push(new Stars(random(-200, -10), random(0, 50), random(20), random(5)));
    stars2.push(new Stars(random(-200, -10), random(height - 50, height), random(20), random(5)));
  }
}
function goPlay() {
  if (music.isPlaying()) {
    music.pause();
  } else {
    music.play();
  }
}
function draw() {
  background(80);
  
  level = amplitude.getLevel();
  value = map(level, 0, 1, 0, 360);
  starSize = map(amplitude.getLevel(), 0, 1, 0, 0.1);
  
  video.loadPixels();
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var loc = ((cols - i - 1) + j * cols) * 4;
      var r = video.pixels[loc];
      var g = video.pixels[loc + 1];
      var b = video.pixels[loc + 2];
      var sz = map((r + g + b) / 3, 0, 255, 0, videoScale);
      fill(value, 220, 250);
      noStroke();
      var x = i * videoScale;
      var y = j * videoScale;
      ellipse(x + videoScale / 2, y + videoScale / 2, sz, sz);
    }
  }
  push();
  fill(0)
  rect(0, 0, width, 50);
  rect(0, height - 50, width, 50);
  pop();
  for (j = 0; j < num; j++) {
    stars[j].display(random(5) + starSize*80);
     stars[j].move();
    stars2[j].display(random(5) + starSize*80);
		stars2[j].move();
    
  }
}let movers = [];
let input = 0;
let inData
var portName = '/dev/cu.usbmodem1441';
let col = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}
  if (inData.length > 0) {
    let values = inData.split(',');
    x = int(values[0]);
    y = int(values[1]);
  }
}
function draw() {
  background(0);
  input = int(map(x, 90, 440, 0, 15));
  console.log(input);
  col = map(y, 20, 1023, 0, 255)
  for (let i = 0; i < input; i++) {
    movers.push(new Movers(input));
  }
  for (let j = movers.length - 1; j >= 0; j--) {
    fill(col, 360, 360, 120);
    movers[j].display();
    movers[j].move();
    if (movers[j].finished()) {
      movers.splice(j, 10);
      j--;
    }
  }
}class star {
  constructor(x, y, speed, d, age,sizeIncr){
    
  this.x = random(width);
    this.y = random(height);
    this.speed = random(0.2, 5);
    this.wachsen= int(random(0, 2));
    
  }
  
  float x, y, speed, d, age,sizeIncr;
  let wachsen;
  star() {
    x = random(width);
    y = random(height);
    speed = random(0.2, 5);
    wachsen= int(random(0, 2));
    if(wachsen==1)d = 0;
    else {
      d= random(0.2, 3);
    }
    age=0;
    sizeIncr= random(0,0.03);
  }
   render() {
   age++;
     if (age<200){
       if (wachsen==1){
         d+=sizeIncr;
         if (d>3||d<-3) d=3;
       }else {
         if (d>3||d<-3) d=3;
         d= d+0.2-0.6*noise(x, y, frameCount);
       }
       
     }
     else{
       if (d>3||d<-3) d=3;
     }
    
    ellipse(x, y, d*(map(noise(x, y,0.001*frameCount),0,1,0.2,1.5)), d*(map(noise(x, y,0.001*frameCount),0,1,0.2,1.5)));
  }
  let move() {
    x =x-map(mouseX, 0, width, -0.05*speed, 0.05*speed)*(w2-x); 
    y =y-map(mouseY, 0, height, -0.05*speed, 0.05*speed)*(h2-y);
  }
}
star neuerStern;
ArrayList<star> starArray = new ArrayList<star>();
int numberOfStars = 20000;
int newStars =50;
function setup() {
  size(900, 900);
  w2=width/2;
  h2= height/2;
  d2 = dist(0, 0, w2, h2);
  noStroke();
  neuerStern= new star();
  frameRate(9000);
  background(0);
}
function draw() {
  fill(0, map(dist(mouseX, mouseY, w2, h2), 0, d2, 255, -10));
  rect(0, 0, width, height);
  fill(255);
  neuerStern.render();
    starArray.add(new star());
  }
  for (int i = 0; i<starArray.size(); i++) {
    if (starArray.get(i).x<0||starArray.get(i).x>width||starArray.get(i).y<0||starArray.get(i).y>height) starArray.remove(i);
    starArray.get(i).move();
    starArray.get(i).render();
  }
    for (int i = 0; i<newStars; i++) {
      starArray.remove(i);
    }
  }
}
  return true;
}let movers = [];
let val;
let clr;
let input = 20;
function setup() {
  createCanvas(600, 600);
  colorMode(HSB);
}
function draw() {
  fill(255, 20);
	rect(0, 0, width, height);  
  for (let i = 0; i < input; i++) {
    movers.push(new Movers(input));
  }
  for (let j = movers.length - 1; j >= 0; j--) {
    movers[j].display();
    movers[j].move();
    if (movers[j].finished()) {
      movers.splice(j, 10);
      j--;
    }
  }
}let movers=[];
let going=false;
let input ;
let horizon ; 
let globalh = 0 ;
let offsetSpeed = -1;
let portName = '/dev/cu.usbmodem1411'; 
function setup() { 
  createCanvas(600, 600);
  
  
} 
  if (data.length > 0) {
   input = map(data, 2, 1023, 0, 20);
  }
}
function draw() { 
  
  background(0);
  
  for(let i=0;i<input;i++){
  movers.push(new Movers(input));
      }
  fill(255);
    for(let j=movers.length-1;j>=0;j--){
     movers[j].display();
     movers[j].move();
      
       if(movers[j].finished()){
   movers.splice(j,input);
         j--;
  }
    }  
  console.log(movers.length)
  
   if (movers.length > 500) {
      globalh += input/5
    }
      
           if (input <= 0 && globalh>0) {
        globalh += offsetSpeed;
      }
    console.log(globalh);
  
    rectMode(CENTER);
    fill(200, 200, 255,120);
    rect(width / 2, height, width, globalh);
  
}
let movers=[];
let y=1;
let x=10;
let speedy=0,speedx=1;
let num=1;
let input ;
var portName = '/dev/cu.usbmodem1451'; 
function setup() { 
  createCanvas(600, 600);
  
  for(let i=0;i<num;i++){
  movers.push(new Movers(input));
  } 
  
} 
  if (data.length > 0) {
   input = map(data, 130, 800, 50, 0);
  }
      console.log(input);
}
function draw() { 
  background(20);
  if(input){
    for(let j=0;j<movers.length;j++){
  
     movers[j].display();
     movers[j].move();
      
    }  
     movers.push(new Movers(input));
    if(movers.length>1000){
    movers.shift();
    }
  }
}
let bubble=[];
let input = 40; 
function setup() { 
  createCanvas(600, 600);
  for(let i=0; i<5*input;i++){
  bubble[i]=new Bubble(random(width/2-input/2,width/2+input/2));
  }
} 
function draw() { 
  background(120);
  for(i=0;i<5*input;i++){
       
    for (j = 0; j <5*input; j++) {
         
         if(i !=j && bubble[i].isNear(bubble[j])) {
      		 bubble[i].bounce(bubble[j]);
         bubble[j].bounce(bubble[i]);
         }
       }
     bubble[i].run();
    }
  bubble.push(new Bubble(random(width/2-input/2,width/2+input/2)));
    }  
let apiKey = "Qrl5XEYzjfEWK3G1X3ox1As6XSmr4633V1SQb9fS";
let input;
let asteroids;
let caption, caption2;
let date ; 
let a;
function setup() {
  createCanvas(700, windowHeight);
  let button = select("#submit");
  button.mousePressed(asteriodsAsk)
  input = select("#startDate");
  input.changed(updateText);
  caption = createP(input.value());
  caption.position(20, 45);
  caption.style('color', 'white');
  caption.style('font-size', '20px')
  
  caption2 = createP("asteroids scale: x1600");
  caption2.position(20, 80);
  caption2.style('font-size', '12px');
  
	 a = random(360); 
}
function asteriodsAsk() {
  let url = api + "start_date=" + input.value() + "&end_date=" + input.value() + "&api_key=" + apiKey;
  loadJSON(url, gotData);
}
function updateText() {
  caption.html(input.value());
}
function gotData(data) {
  asteroids = data
}
function draw() {
  background(22);
  let earthX = width/2 ;
  let earthR = 8000/80;
  ellipse(earthX, height / 2, earthR);
  
  
  if (asteroids) {
    
    for(i=0; i<=asteroids.element_count; i++){
      
 
      
  let x = width/2 + asteroids.near_earth_objects[input.value()][i].close_approach_data[0].miss_distance.miles/100000*cos(a) ;
  let y = height/2 + asteroids.near_earth_objects[input.value()][i].close_approach_data[0].miss_distance.miles/100000*sin(a) ;
  let size = asteroids.near_earth_objects[input.value()][i].estimated_diameter.miles.estimated_diameter_max*20 ;
     
      if(x>0 && y>0 ){
  ellipse(x, y, size);
      }
       console.log(asteroids.element_count);
    }
  }
}var numBalls = 300;
var spring = 0.1;
var gravity = 1;
var friction = -0.5;
var balls = [];
function setup() {
    createCanvas(640, 360);
    for (var i = 0; i < numBalls; i++) {
        balls[i] = new Ball(random(width/2-10, width/2+10), 0, 10, i, balls);
    }
    noStroke();
    fill(255, 204);
}
function draw() {
    background(0);
    for (var i = 0; i < balls.length; i++) {
        balls[i].collide();
        balls[i].move();
        balls[i].display();
    }
}
function Ball(xin, yin, din, idin, oin) {
    this.x = xin;
    this.y = yin;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
    this.vx = 0;
    this.vy = 0;
    this.collide = function() {
        for (var i = this.id + 1; i < numBalls; i++) {
            var dx = this.others[i].x - this.x;
            var dy = this.others[i].y - this.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            var minDist = this.others[i].diameter / 2 + this.diameter / 2;
            if (distance < minDist) {
                var angle = atan2(dy, dx);
                var targetX = this.x + cos(angle) * minDist;
                var targetY = this.y + sin(angle) * minDist;
                var ax = (targetX - this.others[i].x) * spring;
                var ay = (targetY - this.others[i].y) * spring;
                this.vx -= ax;
                this.vy -= ay;
                this.others[i].vx += ax;
                this.others[i].vy += ay;
            }
        }
    }
    this.move = function() {
        this.vy += gravity;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x + this.diameter / 2 > width) {
            this.x = width - this.diameter / 2;
            this.vx *= friction;
        } else if (this.x - this.diameter / 2 < 0) {
            this.x = this.diameter / 2;
            this.vx *= friction;
        }
        if (this.y + this.diameter / 2 > height) {
            this.y = height - this.diameter / 2;
            this.vy *= friction;
        } else if (this.y - this.diameter / 2 < 0) {
            this.y = this.diameter / 2;
            this.vy *= friction;
        }
    }
    this.display = function() {
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }
var ball1;
var ball2;
var gravity = 0.8;
function setup() {
	createCanvas(480, 270);
	ball1 = new Ball(150, 0, 16);
	ball2 = new Ball(350, 50, 32);
}
function draw() {
	background(51);
	ball1.display();
	ball2.display();
	ball1.update();
	ball2.update();
let valX, valY ;
function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
} 
function gotData() {
  
  let val = split(latestData, ',');
   valX = int(val[0]);
   valY = int(val[1]) ; 
  
}
function draw() { 
  background(valY, 0, 127);
  
  let v = map(valX, 0, 255, 0, 1200); 
  let origV = v;
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
let bfr, bob, p, uglybob;
let input, warn;
let slider;
let button;
let popText;
let bobby ; 
function setup() {
  createCanvas(800, 800);
  p = select('#greeting');
  p.position(0, 20);
  p.style('color', 'white');
  bfr = createP("Before ITP");
  bfr.position(windowWidth / 2, 120);
  bfr.style('font-size', '2em');
  bob.position(200, 200)
  bob.size(400, 400);
  bob.mouseOver(after);
  input = createInput('What is ITP to you?')
  input.position(60, 670);
  input.changed(updateText);
  slider = createSlider(20, 300, 20);
  slider.position(30, 580)
 
}
function updateText() {
  warn.html(input.value());
  warn.style('font-size', '3em')
}
function after() {
  bfr.html('After ITP');
  bfr.style('color', 'red');
  bob.size(0, 0);
  uglybob.position(200, 200);
  uglybob.size(400, 400);
  warn = createP('You cannot go back to "before"');
  warn.position(200, 600);
  button = createButton('Reset');
  button.position(30, 530);
  button.mousePressed(popup);
  button.mouseReleased(goback);  
}
function popup() {
  popText = createP('NEVER');
  popText.position(200, 400);
  popText.style('font-size', '6em')
}
function goback() {
  popText.html('')
}
function draw() {
  background(220);
  clear();
  noStroke();
  fill(120, 0, 255);
  ellipse(mouseX, mouseY, 20, 20);
  
   bobby = select('#bobby');
  bobby.size(slider.value(), slider.value());
let l = 0;
let val;
let valX, valY;
function setup() {
  createCanvas(500, 500);
}
  if (data.length > 0) {
    val = split(data, ',');
    valX = map(Number(val[0]), 0, 255, 0, width);
    valY = map(Number(val[1]), 0, 255, 0, height);  
  }
      console.log(valX);
}
function draw() {
  background(220);
  fill(255);
  ellipse(valX, valY, 100, 100);
}let slider ; 
function setup() { 
 canvas  = createCanvas(700, 700);
  canvas.position(300, 100);
   let pp = createP("edited by Joohyun Park"); 
  pp.style('font-size', '1.8em');
  pp.position(270, 0);
	
  let caption = createP('color control')
  caption.position(70,260);
  
  slider = createSlider(0, 255, 30);
  slider.position(60, 300);
  
  img.position(50, 330) ;
  img.size('50', '50');
  img.mouseOver(changeSize);
  img.mouseOut(reset);
    
} 
function changeSize(){
 this.size('300', '300'); 
}
function reset(){
  this.size('60', '60'); 
}
function draw() { 
  background(0);
  clear();  
  fill(25, 0, slider.value());
  ellipse(mouseX, mouseY, 50, 50);
}
function setup() { 
 canvas  = createCanvas(700, 700);
  canvas.position(300, 100);
   let pp = createP("edited by Joohyun Park"); 
  pp.style('font-size', '1.8em');
  pp.position(270, 0);
	
  let caption = createP('color control')
  caption.position(70,260);
  
  let slider = createSlider(0, 255, 30);
  slider.position(60, 300);
  
  img.position(50, 330) ;
  img.size('50', '50');
  img.mouseOver();
} 
function draw() { 
  background(220);
  clear();  
  fill(25, 0, 255);
  ellipse(mouseX, mouseY, 50, 50);
}
function mouseOver(){
 this.size('300) 
}function setup() { 
  let canvas = createCanvas(200, 600);
   canvas.position(10, 730)
  
  
 let par = select('#par') ; 
  par.mouseOver(highlight) ; 
  par.mouseOut(unhighlight) ;
  img = select('#bs');
  imgOrgSize = int(img.attribute('width'));
  imgCurrentSize = imgOrgSize;
  
  img.mouseClicked(resizeImage);
  img.mouseOut(resetImage);
	let sign = creatP(
  ')
} 
function draw() { 
 background(0, 0, 255);
  fill(255, 100, 255);
  ellipse(mouseX, mouseY, 40, 40);
}
function resizeImage() {
  imgCurrentSize += 50;
  console.log(imgCurrentSize);
  this.attribute('width', imgCurrentSize);
}
function resetImage() {
  this.attribute('width', imgOrgSize);
  imgCurrentSize = imgOrgSize;
}
function highlight() {
par.style('padding', '16pt') ;
  par.style('background-color', 'pink');
}
function unhighlight() {
par.style('padding', '0pt') ;
  par.style('background-color', 'white');
}function setup() { 
  let canvas = createCanvas(800, 800);
  canvas.position(40, 0)
 let  par = createP("JOE);
} 
function draw() { 
  background(0, 0, 255);
 ellipse(mouseX, mouseY, 50, 50); 
  
}function setup() { 
  canvas = createCanvas(400, 400);
  canvas.position(0, 260);
  
  let div = select('div');
 	let p = select('p');
  let a = select('a');
  let img = select('img');
	let par = createP("Text goes in here!");
  div.style('float', 'left');
  par.style('font-size', '48');
  par.position(0, 20);
  a.position(0,80);
  img.position(0,100);
  
  input = createInput('');
  input.position(140, 35);
  
  slider = createSlider(50, 200, 70);
  slider.position(20, 280);
} 
function draw() { 
  background(220);
  push();
  rectMode(CENTER);
  textAlign(CENTER);
  rect(slider.value(), 100, 100, 100);
  text(input.value(), 100, 100);
  pop();
}function setup() { 
  canvas = createCanvas(400, 400);
  
  slider = createSlider(20, 150, 60);
} 
function draw() { 
  background(220);
  
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  
  ellipse(mouseX, mouseY, 50, 50);
}let bgcolor = 0 ; 
function setup() { 
  
  let canvas = createCanvas(400,400);
	canvas.position(110, 100);
  
  let par = createP("What's your favorite movie?");
  let button = createButton("change color");
	button.position(120, 550);
  button.mousePressed(changeColor);
	input = createInput('e.g. Inception');
  slider = createSlider(20, 150, 60);
	slider.position(210, 550);
} 
function changeColor() {
	bgcolor = color(random(255)); 
}
function draw() { 
  background(bgcolor);
  ellipse(200, 200, slider.value(), slider.value()) ;
  push();
  rectMode(CENTER);
  textAlign(CENTER);
  rect(100, 100, 100, 100);
  text(input.value(), 100, 100);
  pop();
}let balls = [];
let k = 0;
function setup() {
  createCanvas(600, 600);
  for (i = 0; i < 60; i++) {
    balls.push(new Ball(random(0, width), random(0, height), random(-5, 5), random(-5, 5), 20));
  }
}
function draw() {
  background(10);
  for (i = 0; i < balls.length; i++) {
    for (j = 0; j < balls.length; j++) {
      if (i != j) {
        if (balls[i].isNear(balls[j])) {
          balls[i].giveColor();
          balls[j].giveColor();
        }
      }
    }
    balls[i].run();
    balls[i].gathering();
  }
  edge();
  caption();
}
function edge() {
  push();
  noFill();
  stroke(255);
  let edger = width - k * 50;
  ellipse(width / 2, height / 2, edger, edger);
  pop();
}
function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    k -= 1;
  }
  if (keyCode == LEFT_ARROW) {
    k += 1;
  }
  if (k > 12 || k < -7) {
    k = 0;
  }
}
function caption() {
  fill(255);
  textSize(15);
  text("click :  gather balls" , 20, height-40);
  text("<- or -> :  change the boundary size", 20, height-20);
  
}let balls = [] ; 
let edge = [];
let k = 0  ; 
function setup() { 
  createCanvas(600, 600);
  for(i=0; i<60; i++) {    
    balls.push( new Ball(random(0, width), random(0, height), random(-5, 5), random(-5, 5), 20));
      }
  
} 
function draw() { 
  background(150);
  for(i=0; i<balls.length; i++) { 
    for(j=0; j<balls.length; j++) {
      if(i != j) {
       if(balls[i].isNear(balls[j])) {
         balls[i].giveColor() ;
         balls[j].giveColor();
       }
    }
    }
    balls[i].run();  
     balls[i].gathering();
  }
	
  edge = new Edge();
  edge.run();
}let balls = [] ; 
function setup() { 
  createCanvas(600, 600);
  for(i=0; i<30; i++) {    
    balls.push( new Ball(random(0, width), random(0, height), random(-5, 5), random(-5, 5), 20));
      }
} 
function draw() { 
  background(150);
  
  for(i=0; i<balls.length; i++) { 
    for(j=0; j<balls.length; j++) {
      if(i != j) {
       if(balls[i].isNear(balls[j])) {
         balls[i].changeColor() ;
         balls[j].changeColor();
       }
    }
    }
    balls[i].run();  
  }
  
}let balls = [] ; 
function setup() { 
  createCanvas(600, 600);
  for(i=0; i<60; i++) {    
    balls.push( new Ball(random(0, width), random(0, height), random(-5, 5), random(-5, 5), 20));
      }
} 
function draw() { 
  background(150);
  
  for(i=0; i<balls.length; i++) { 
    for(j=0; j<balls.length; j++) {
      if(i != j) {
       if(balls[i].isNear(balls[j])) {
         balls[i].giveColor() ;
         balls[j].giveColor();
       }
    }
    }
    balls[i].run();  
     balls[i].gathering();
  }
  
}let positions = [] ; 
let x, y ;
function setup() { 
  createCanvas(600, 600);
} 
function draw() { 
  background(20);
	
    positions.push({x: mouseX, y: mouseY})
  
  for(i=0; i<positions.length; i++) {
    let x = positions[i].x ; 
    let y = positions[i].y ; 
     	ellipse(x, y, i, i); 
      if(positions.length>60)  positions.shift();
  }
    
  
}
let ball1, ball2 ; 
function setup() { 
  createCanvas(400, 400);
  ball1 = new Ball(20, 20, 3, 5, 50);
	ball2 = new Ball(300, 10m)
} 
function draw() { 
  background(220);
  
  ball1.run();
}let x,y,xspeed,yspeed;
let xSpd, ySpd ; 
let ball1, ball2 ; 
function setup() { 
  createCanvas(400, 400);
  ball1 = new ball(20, 20k, );
} 
function draw() { 
  background(220);
  
  ball1.display();
  ball1.update();
  
  
  
}
function ball(x, y, r, xSpd, ySpd){
  this.x = x ; 
  this.y = y ; 
  this.r = r ; 
  this.xSpd = xSpd ; 
  this.ySpd = ySpd ; 
  
   this.x += xSpd ; 
    this.y += ySpd ; 
  
  this.display = function() {
		ellipse(this.x, this.y, this.r, this.r) ;  
  }
  
  this.update = function() {
   this.x += this.xSpd ; 
    this.y += this.ySpd ; 
    this.xSpd = bounce(this.x, this.xSpd, 0, width);
    this.ySpd = bounce(this.y, this.ySpd, 0, height);
  }
  
  }
function bounce(p, spd, min, max) {
     if(p<min || p>max ) {
   spd *= -1 ;  
    return spd ; 
  }
}let rect1, rect2, rect3, rect4, rect5, rect6;
let eyeX, eyeY;
let disY, disY2;
let d;
let w, h;
let speed = 0;
let dragging = false;
let dragging2 = false;
let btn = {
  x: 100,
  y: 550,
  w: 20,
  h: 20
}
let btn2 = {
  x: 400,
  y: 550,
  w: 20,
  h: 20
}
let sliderStart = 100;
let sliderEnd = 200;
let sliderStart2 = 400;
let sliderEnd2 = 500;
let offsetX = 0;
let offsetX2 = 0;
let dis;
let c = 0;
let bubbleX, bubbleY ; 
let bubblespd ; 
function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  angleMode(DEGREES);
  w = width;
  h = height;
  rect1 = new rectangle(120, 0, 10, speed + 0.5, 20);
  rect2 = new rectangle(120, 0, 10, speed + -0.2, 20);
  rect3 = new rectangle(100, 0, 10, speed + -0.5);
  rect4 = new rectangle(100, 0, 10, speed + 0.2, 20);
  rect5 = new rectangle(100, 0, 10, speed + -1, 20);
  rect6 = new rectangle(120, 0, 10, speed + 0.8, 20);
  bigRect1 = new rectangle(110, 0, 10, speed + 0.3, 40);
}
function draw() {
  background(200);
  rect1.display();
  rect2.display();
  rect3.display();
  rect4.display();
  rect5.display();
  rect6.display();
  bigRect1.display();
  eyeCenter();
  slider();
  slider2();
  
}
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {
  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;
  this.display = function() {
    for (let i = 0; i < this.n; i++) {
      push();
      translate(width / 2, height / 2);
      let n = 1 / this.speed;
      rotate(360 * i / this.n);
      rotate(frameCount / n);
      noFill();
      rect(this.x, this.y, this.size, this.size);
      pop();
    }
  }
}
function eyeCenter() {
  push();
  strokeWeight(2);
  translate(width / 2, height / 2);
  eyeX = map(mouseX, 0, width, -20, 20);
  eyeY = map(mouseY, 0, height, -20, 20);
  colorMode(HSB);
  fill(255 - c, 100, 100);
  ellipse(eyeX, eyeY, 50, 50);
  pop();
  push();
  strokeWeight(1)
  noFill();
  curve(-100, h / 2 + 1100, -20, h / 2, w + 20, h / 2, w + 100, h / 2 + 1100);
  curve(-100, h / 2 - 1100, -20, h / 2, w + 20, h / 2, w + 100, h / 2 - 1100);
  pop();
}
function mousePressed() {
  if (mouseX > btn.x - btn.w / 2 && mouseX < btn.x + btn.w / 2 && mouseY > btn.y - btn.h / 2 && mouseY < btn.y + btn.h / 2) {
    dragging = true;
    offsetX = btn.x - mouseX;
  }
  if (mouseX > btn2.x - btn2.w / 2 && mouseX < btn2.x + btn2.w / 2 && mouseY > btn2.y - btn2.h / 2 && mouseY < btn2.y + btn2.h / 2) {
    dragging2 = true;
    offsetX2 = btn2.x - mouseX;
  }
}
function mouseReleased() {
  dragging = false;
  dragging2 = false;
}
function slider() {
  if (dragging) {
    btn.x = mouseX + offsetX;
  }
  btn.x = constrain(btn.x, sliderStart, sliderEnd - btn.w);
  stroke(0);
  line(sliderStart - btn.w / 2, btn.y, sliderEnd - btn.w / 2, btn.y);
  stroke(0);
  if (dragging) {
    fill(50);
  } else {
    fill(175);
  }
  rect(btn.x, btn.y, btn.w, btn.h);
  dis = map(btn.x, sliderStart, sliderEnd - btn.w, height / 2, -height / 4);
  rectMode(CENTER);
  rect(width / 2, dis, width, height * 2 / 3)
}
function slider2() {
  if (dragging2) {
    btn2.x = mouseX + offsetX2;
  }
  btn2.x = constrain(btn2.x, sliderStart2, sliderEnd2 - btn2.w);
  stroke(0);
  line(sliderStart2 - btn2.w / 2, btn2.y, sliderEnd2 - btn2.w / 2, btn2.y);
  stroke(0);
  if (dragging2) {
    fill(50);
  } else {
    fill(175);
  }
  rect(btn2.x, btn2.y, btn2.w, btn2.h);
  c = map(btn2.x, sliderStart2, sliderEnd2 - btn2.w, 20, 235);
}
let eyeX, eyeY;
let disY, disY2;
let d;
let w, h;
let speed = 0;
let dragging = false;
let dragging2 = false;
let btn = {
  x: 100,
  y: 550,
  w: 20,
  h: 20
}
let btn2 = {
  x: 400,
  y: 550,
  w: 20,
  h: 20
}
let sliderStart = 100;
let sliderEnd = 200;
let sliderStart2 = 400;
let sliderEnd2 = 500;
let offsetX = 0;
let offsetX2 = 0;
let dis;
let c = 0;
let bubbles = [];
function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  angleMode(DEGREES);
  w = width;
  h = height;
  rect1 = new rectangle(120, 0, 10, speed + 0.5, 20);
  rect2 = new rectangle(120, 0, 10, speed + -0.2, 20);
  rect3 = new rectangle(100, 0, 10, speed + -0.5);
  rect4 = new rectangle(100, 0, 10, speed + 0.2, 20);
  rect5 = new rectangle(100, 0, 10, speed + -1, 20);
  rect6 = new rectangle(120, 0, 10, speed + 0.8, 20);
  bigRect1 = new rectangle(110, 0, 10, speed + 0.3, 40);
  bbl1 = new bubble(10, 10, 20, 10, 2);
  bbl2 = new bubble(50, 10, 20, 3, 3);
  bbl3 = new bubble(10, 40, 20, 5, -1);
  bbl4 = new bubble(500, 220, 20, -7, 10);
  bbl5 = new bubble(100, 310, 20, 1, 2);
  bbl6 = new bubble(104, 120, 20, 10, 10);
  bbl7 = new bubble(154, 10, 20, 3, 9);
  bbl8 = new bubble(44, 550, 20, -2, -4);
}
function draw() {
  background(200);
  rect1.display();
  rect2.display();
  rect3.display();
  rect4.display();
  rect5.display();
  rect6.display();
  bigRect1.display();
  eyeCenter();
  slider();
  slider2();
  bbl1.display();
  bbl2.display();
  bbl3.display();
  bbl4.display();
  bbl5.display();
  bbl6.display();
  bbl7.display();
  bbl8.display();
}
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {
  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;
  this.display = function() {
    for (let i = 0; i < this.n; i++) {
      push();
      translate(width / 2, height / 2);
      let n = 1 / this.speed;
      rotate(360 * i / this.n);
      rotate(frameCount / n);
      noFill();
      rect(this.x, this.y, this.size, this.size);
      pop();
    }
  }
}
function eyeCenter() {
  push();
  strokeWeight(2);
  translate(width / 2, height / 2);
  eyeX = map(mouseX, 0, width, -20, 20);
  eyeY = map(mouseY, 0, height, -20, 20);
  colorMode(HSB);
  fill(255 - c, 100, 100);
  ellipse(eyeX, eyeY, 50, 50);
  pop();
  push();
  strokeWeight(1)
  noFill();
  curve(-100, h / 2 + 1100, -20, h / 2, w + 20, h / 2, w + 100, h / 2 + 1100);
  curve(-100, h / 2 - 1100, -20, h / 2, w + 20, h / 2, w + 100, h / 2 - 1100);
  pop();
}
function mousePressed() {
  if (mouseX > btn.x - btn.w / 2 && mouseX < btn.x + btn.w / 2 && mouseY > btn.y - btn.h / 2 && mouseY < btn.y + btn.h / 2) {
    dragging = true;
    offsetX = btn.x - mouseX;
  }
  if (mouseX > btn2.x - btn2.w / 2 && mouseX < btn2.x + btn2.w / 2 && mouseY > btn2.y - btn2.h / 2 && mouseY < btn2.y + btn2.h / 2) {
    dragging2 = true;
    offsetX2 = btn2.x - mouseX;
  }
}
function mouseReleased() {
  dragging = false;
  dragging2 = false;
}
function slider() {
  if (dragging) {
    btn.x = mouseX + offsetX;
  }
  btn.x = constrain(btn.x, sliderStart, sliderEnd - btn.w);
  stroke(0);
  line(sliderStart - btn.w / 2, btn.y, sliderEnd - btn.w / 2, btn.y);
  stroke(0);
  if (dragging) {
    fill(50);
  } else {
    fill(175);
  }
  rect(btn.x, btn.y, btn.w, btn.h);
  dis = map(btn.x, sliderStart, sliderEnd - btn.w, height / 2, -height / 4);
  rectMode(CENTER);
  rect(width / 2, dis, width, height * 2 / 3)
}
function slider2() {
  if (dragging2) {
    btn2.x = mouseX + offsetX2;
  }
  btn2.x = constrain(btn2.x, sliderStart2, sliderEnd2 - btn2.w);
  stroke(0);
  line(sliderStart2 - btn2.w / 2, btn2.y, sliderEnd2 - btn2.w / 2, btn2.y);
  stroke(0);
  if (dragging2) {
    fill(50);
  } else {
    fill(175);
  }
  rect(btn2.x, btn2.y, btn2.w, btn2.h);
  c = map(btn2.x, sliderStart2, sliderEnd2 - btn2.w, 20, 235);
}
function bubble() {
  this.x = random(0, width);
  this.y = random(0, height);
  this.display = function() {
    push();
    stroke(255);
    noFill();
    ellipse(this.x, this.y, 20, 20);
    pop();
  }
  this.move = function() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }
}
function bubble(bblX, bblY, size, xSpeed, ySpeed) {
  this.x = bblX;
  this.y = bblY;
  this.size = size;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.display = function() {
    push();
    stroke(255);
    noFill();
    ellipse(this.x, this.y, this.size, this.size);
    pop();
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
    if (this.x < -50 || this.x > width + 50) {
      this.xSpeed *= -1;
    }
    if (this.y < -50 || this.y > height + 50) {
      this.ySpeed *= -1;
    }
  }
}let rect1, rect2, rect3, rect4, rect5, rect6;
let eyeX, eyeY;
let disY, disY2;
let d;
let w, h;
let speed = 0;
let dragging = false;
let dragging2 = false;
let btn = {
  x: 100,
  y: 550,
  w: 20,
  h: 20
}
let btn2 = {
  x: 400,
  y: 550,
  w: 20,
  h: 20
}
let sliderStart = 100;
let sliderEnd = 200;
let sliderStart2 = 400;
let sliderEnd2 = 500;
let offsetX = 0;
let offsetX2 = 0;
let dis;
let c = 0;
let bubbleX, bubbleY ; 
let bubblespd ; 
function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  angleMode(DEGREES);
  w = width;
  h = height;
  rect1 = new rectangle(120, 0, 10, speed + 0.5, 20);
  rect2 = new rectangle(120, 0, 10, speed + -0.2, 20);
  rect3 = new rectangle(100, 0, 10, speed + -0.5);
  rect4 = new rectangle(100, 0, 10, speed + 0.2, 20);
  rect5 = new rectangle(100, 0, 10, speed + -1, 20);
  rect6 = new rectangle(120, 0, 10, speed + 0.8, 20);
  bigRect1 = new rectangle(110, 0, 10, speed + 0.3, 40);
}
function draw() {
  background(200);
  rect1.display();
  rect2.display();
  rect3.display();
  rect4.display();
  rect5.display();
  rect6.display();
  bigRect1.display();
  eyeCenter();
  slider();
  slider2();
}
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {
  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;
  this.display = function() {
    for (let i = 0; i < this.n; i++) {
      push();
      translate(width / 2, height / 2);
      let n = 1 / this.speed;
      rotate(360 * i / this.n);
      rotate(frameCount / n);
      noFill();
      rect(this.x, this.y, this.size, this.size);
      pop();
    }
  }
}
function eyeCenter() {
  push();
  strokeWeight(2);
  translate(width / 2, height / 2);
  eyeX = map(mouseX, 0, width, -20, 20);
  eyeY = map(mouseY, 0, height, -20, 20);
  colorMode(HSB);
  fill(255 - c, 100, 100);
  ellipse(eyeX, eyeY, 50, 50);
  pop();
  push();
  strokeWeight(1)
  noFill();
  curve(-100, h / 2 + 1100, -20, h / 2, w + 20, h / 2, w + 100, h / 2 + 1100);
  curve(-100, h / 2 - 1100, -20, h / 2, w + 20, h / 2, w + 100, h / 2 - 1100);
  pop();
}
function mousePressed() {
  if (mouseX > btn.x - btn.w / 2 && mouseX < btn.x + btn.w / 2 && mouseY > btn.y - btn.h / 2 && mouseY < btn.y + btn.h / 2) {
    dragging = true;
    offsetX = btn.x - mouseX;
  }
  if (mouseX > btn2.x - btn2.w / 2 && mouseX < btn2.x + btn2.w / 2 && mouseY > btn2.y - btn2.h / 2 && mouseY < btn2.y + btn2.h / 2) {
    dragging2 = true;
    offsetX2 = btn2.x - mouseX;
  }
}
function mouseReleased() {
  dragging = false;
  dragging2 = false;
}
function slider() {
  if (dragging) {
    btn.x = mouseX + offsetX;
  }
  btn.x = constrain(btn.x, sliderStart, sliderEnd - btn.w);
  stroke(0);
  line(sliderStart - btn.w / 2, btn.y, sliderEnd - btn.w / 2, btn.y);
  stroke(0);
  if (dragging) {
    fill(50);
  } else {
    fill(175);
  }
  rect(btn.x, btn.y, btn.w, btn.h);
  dis = map(btn.x, sliderStart, sliderEnd - btn.w, height / 2, -height / 4);
  rectMode(CENTER);
  rect(width / 2, dis, width, height * 2 / 3)
}
function slider2() {
  if (dragging2) {
    btn2.x = mouseX + offsetX2;
  }
  btn2.x = constrain(btn2.x, sliderStart2, sliderEnd2 - btn2.w);
  stroke(0);
  line(sliderStart2 - btn2.w / 2, btn2.y, sliderEnd2 - btn2.w / 2, btn2.y);
  stroke(0);
  if (dragging2) {
    fill(50);
  } else {
    fill(175);
  }
  rect(btn2.x, btn2.y, btn2.w, btn2.h);
  c = map(btn2.x, sliderStart2, sliderEnd2 - btn2.w, 20, 235);
}
function bubble() {
  
  if(mouseIsPressed) {
    
    bubblespd = 1 ; 
    bubbleX += bubblespd ; 
    bubbleY += bubblespd ; 
   ellipse(mouseX, mouseY]]\, 10, 10 );
    
  }
}
let eyeX, eyeY;
let disY, disY2;
let d;
let w, h;
let sldr;
let irisc;
let speed = 0;
let dragging = false;
let btnx = 100;
let btny = 550;
let btnw = 20;
let btnh = 20;
let sliderStart = 100;
let sliderEnd = 200;
let offsetX = 0;
let c;
let coloreye = false ; 
function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  angleMode(DEGREES);
  w = width;
  h = height;
  rect1 = new rectangle(120, 0, 10, speed + 0.5, 20);
  rect2 = new rectangle(120, 0, 10, speed + -0.2, 20);
  rect3 = new rectangle(100, 0, 10, speed + -0.5, 20);
  rect4 = new rectangle(100, 0, 10, speed + 0.2, 20);
  rect5 = new rectangle(100, 0, 10, speed + -1, 20);
  rect6 = new rectangle(120, 0, 10, speed + 0.8, 20);
  bigRect1 = new rectangle(110, 0, 10, speed + 0.3, 40);
}
function draw() {
  background(200);
  rect1.display();
  rect2.display();
  rect3.display();
  rect4.display();
  rect5.display();
  rect6.display();
  bigRect1.display();
  eyeCenter();
  slider();
 
}
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {
  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;
  this.display = function() {
    for (let i = 0; i < this.n; i++) {
      push();
      translate(width / 2, height / 2);
      let n = 1 / this.speed;
      rotate(360 * i / this.n);
      rotate(frameCount / n);
      noFill();
      rect(this.x, this.y, this.size, this.size);
      pop();
    }
  }
}
function eyeCenter() {
  push();
  strokeWeight(2);
  translate(width / 2, height / 2);
  eyeX = map(mouseX, 0, width, -20, 20);
  eyeY = map(mouseY, 0, height, -20, 20);
  noFill();
  ellipse(eyeX, eyeY, 50, 50);
   pop();
  push();
  strokeWeight(1)
  noFill();
  curve(-100, h / 2 + 1100, -20, h / 2, w + 20, h / 2, w + 100, h / 2 + 1100);
  curve(-100, h / 2 - 1100, -20, h / 2, w + 20, h / 2, w + 100, h / 2 - 1100);
  pop();
}
function mousePressed() {
  if (mouseX > btnx - btnw / 2 && mouseX < btnx + btnw / 2 && mouseY > btny - btnh / 2 && mouseY < btny + btnh / 2) {
    dragging = true;
    offsetX = btnx - mouseX;
  }
 
}
function mouseReleased() {
  dragging = false;
}
function slider() {
  if (dragging) {
    btnx = mouseX + offsetX;
  }
  btnx = constrain(btnx, sliderStart, sliderEnd - btnw);
  stroke(0);
  line(sliderStart - btnw / 2, btny, sliderEnd - btnw / 2, btny);
  stroke(0);
  if (dragging) {
    fill(50);
  } else {
    fill(175);
  }
  rect(btnx, btny, btnw, btnh);
  c = map(btnx, sliderStart, sliderEnd - btnw, height / 2, -height / 4);
  rectMode(CENTER);
  rect(width / 2, c, width, height * 2 / 3)
}
let eyeX, eyeY;
let disY, disY2;
let d;
let w, h;
let sldr;
let irisc;
let speed = 0;
let dragging = false;
let btnx = 100;
let btny = 550;
let btnw = 20;
let btnh = 20;
let sliderStart = 100;
let sliderEnd = 200;
let offsetX = 0;
let c;
\let 
function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  angleMode(DEGREES);
  w = width;
  h = height;
  rect1 = new rectangle(120, 0, 10, speed + 0.5, 20);
  rect2 = new rectangle(120, 0, 10, speed + -0.2, 20);
  rect3 = new rectangle(100, 0, 10, speed + -0.5, 20);
  rect4 = new rectangle(100, 0, 10, speed + 0.2, 20);
  rect5 = new rectangle(100, 0, 10, speed + -1, 20);
  rect6 = new rectangle(120, 0, 10, speed + 0.8, 20);
  bigRect1 = new rectangle(110, 0, 10, speed + 0.3, 40);
}
function draw() {
  background(200);
  rect1.display();
  rect2.display();
  rect3.display();
  rect4.display();
  rect5.display();
  rect6.display();
  bigRect1.display();
  eyeCenter();
  slider();
}
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {
  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;
  this.display = function() {
    for (let i = 0; i < this.n; i++) {
      push();
      translate(width / 2, height / 2);
      let n = 1 / this.speed;
      rotate(360 * i / this.n);
      rotate(frameCount / n);
      noFill();
      rect(this.x, this.y, this.size, this.size);
      pop();
    }
  }
}
function eyeCenter() {
  push();
  strokeWeight(2);
  translate(width / 2, height / 2);
  eyeX = map(mouseX, 0, width, -20, 20);
  eyeY = map(mouseY, 0, height, -20, 20);
  noFill();
  ellipse(eyeX, eyeY, 50, 50);
  pop();
  push();
  strokeWeight(1)
  noFill();
  curve(-100, h / 2 + 1100, -20, h / 2, w + 20, h / 2, w + 100, h / 2 + 1100);
  curve(-100, h / 2 - 1100, -20, h / 2, w + 20, h / 2, w + 100, h / 2 - 1100);
  pop();
}
function mousePressed() {
  if (mouseX > btnx - btnw / 2 && mouseX < btnx + btnw / 2 && mouseY > btny - btnh / 2 && mouseY < btny + btnh / 2) {
    dragging = true;
    offsetX = btnx - mouseX;
  }
}
function mouseReleased() {
  dragging = false;
}
function slider() {
  if (dragging) {
    btnx = mouseX + offsetX;
  }
  btnx = constrain(btnx, sliderStart, sliderEnd - btnw);
  stroke(0);
  line(sliderStart - btnw / 2, btny, sliderEnd - btnw / 2, btny);
  stroke(0);
  if (dragging) {
    fill(50);
  } else {
    fill(175);
  }
  rect(btnx, btny, btnw, btnh);
  c = map(btnx, sliderStart, sliderEnd - btnw, height / 2, -height / 4);
  rectMode(CENTER);
  rect(width / 2, c, width, height * 2 / 3)
}
let eyeX, eyeY ; 
let disY, disY2 ; 
let d ;
let w, h ; 
let sldr ; 
let color ; 
function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  angleMode(DEGREES);
  w = width ; 
  h = height ; 
  
  rect1 = new rectangle(120, 0, 10, 0.5, 20);
  rect2 = new rectangle(120, 0, 10, -0.2, 20);
  rect3 = new rectangle(100, 0, 10, -0.5, 20);
  rect4 = new rectangle(100, 0, 10, 0.2, 20);
  rect5 = new rectangle(100, 0, 10, -1, 20);
  rect6 = new rectangle(120, 0, 10, 0.8, 20);
  bigRect1 = new rectangle(110, 0, 10, 0.3, 40);
 
}
function draw() {
  background(200);
  rect1.display();
  rect2.display();
  rect3.display();
  rect4.display();
  rect5.display();
  rect6.display();
	bigRect1.display();
  
  eyeCenter();
	slider();
  
}
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {
  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;
  this.display = function() {
    for (let i = 0; i < this.n; i++) {
      push();
      translate(width / 2, height / 2);
      let n = 1 / this.speed;
      rotate(360 * i / this.n);
      rotate(frameCount / n);
      noFill();
      rect(this.x, this.y, this.size, this.size);
      pop();
    }
  }
}
function eyeCenter () {
  push();
  strokeWeight(2);
  translate(width/2, height/2);
  eyeX = map(mouseX, 0, width, -20, 20);
  eyeY = map(mouseY, 0, height, -20, 20);
  noFill();
  ellipse(eyeX, eyeY, 50, 50);
  pop();
  push();
  strokeWeight(1)
  noFill();
	 curve(-100, h/2+1100, -20, h/2, w+20, h/2, w+100, h/2+1100);
  curve(-100, h/2-1100, -20, h/2, w+20, h/2, w+100, h/2-1100);
  pop();
}
function slider() {
  sldr = createSlider(0, 255, 100);
  color = slider.value ; 
  sldr.position(40, 520); 
  sldr.style('width)
  
}
let rect1, rect2, rect3, rect4, rect5, rect6;
let eyeX, eyeY ; 
let disY, disY2 ; 
let d ;
let w, h ; 
let dragging = false ; 
let sldr1 ; 
function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  angleMode(DEGREES);
  w = width ; 
  h = height ; 
  
  rect1 = new rectangle(120, 0, 10, 0.5, 20);
  rect2 = new rectangle(120, 0, 10, -0.2, 20);
  rect3 = new rectangle(100, 0, 10, -0.5, 20);
  rect4 = new rectangle(100, 0, 10, 0.2, 20);
  rect5 = new rectangle(100, 0, 10, -1, 20);
  rect6 = new rectangle(120, 0, 10, 0.8, 20);
  bigRect1 = new rectangle(110, 0, 10, 0.3, 40);
\dragging = false;
  
}
function draw() {
  background(200);
  rect1.display();
  rect2.display();
  rect3.display();
  rect4.display();
  rect5.display();
  rect6.display();
	bigRect1.display();
  
  push();
  strokeWeight(2);
  translate(width/2, height/2);
  eyeX = map(mouseX, 0, width, -20, 20);
  eyeY = map(mouseY, 0, height, -20, 20);
  noFill();
  ellipse(eyeX, eyeY, 50, 50);
  pop();
 
  push();
  strokeWeight(1)
  noFill();
	 curve(-100, h/2+1100, -20, h/2, w+20, h/2, w+100, h/2+1100);
  curve(-100, h/2-1100, -20, h/2, w+20, h/2, w+100, h/2-1100);
  pop();
  
}
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {
  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;
  this.display = function() {
    for (let i = 0; i < this.n; i++) {
      push();
      translate(width / 2, height / 2);
      let n = 1 / this.speed;
      rotate(360 * i / this.n);
      rotate(frameCount / n);
      noFill();
      rect(this.x, this.y, this.size, this.size);
      pop();
    }
  }
}
function Slider(paraRailX, paraRailY, paraRailL, paraHandleW, paraHandleH, paraHandleR) {
  
  this.railX = paraRailX;
  this.railY = paraRailY;
  this.railL = paraRailL;
  this.handleW = paraHandleW;
  this.handleH = paraHandleH;
  this.handleR = paraHandleR;
  
  this.handleX = this.railX;
  this.handleY = this.railY;
  this.handleRightBoundary = this.railX+this.railL-this.handleW;
  
  this.railColor = color(0, 0, 80);
  this.handleColor = color(0, 0, 50);
  
  this.display = function() {
    
    noStroke();
    fill(this.railColor);
    rect(this.railX, this.railY, this.railL, this.handleH, this.handleR);
    
    fill(this.handleColor);
    rect(this.handleX, this.handleY, this.handleW, this.handleH, this.handleR);
    
   if(dragging) {
     this.handleX += (mouseX - pmouseX);
        
     this.handleX = constrain(this.handleX, this.railX, this.handleRightBoundary);	
     c = floor(map(this.handleX, this.railX, this.handleRightBoundary, 90, 10));
    } 
    
function mousePressed() {
  if(mouseX >= sldr1.handleX && mouseX <= (sldr1.handleX+sldr1.handleW) && mouseY >= sldr1.handleY && mouseY <= (sldr1.handleY+sldr1.handleH)) 
    dragging = true;
}
function mouseReleased() {
  dragging = false;
}
let rect1, rect2, rect3, rect4, rect5, rect6;
let eyeX, eyeY ; 
let disY, disY2 ; 
let d ;p
function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  angleMode(DEGREES);
  rect1 = new rectangle(120, 0, 10, 0.5, 20);
  rect2 = new rectangle(120, 0, 10, -0.2, 20);
  rect3 = new rectangle(100, 0, 10, -0.5, 20);
  rect4 = new rectangle(100, 0, 10, 0.2, 20);
  rect5 = new rectangle(100, 0, 10, -1, 20);
  rect6 = new rectangle(120, 0, 10, 0.8, 20);
  bigRect1 = new rectangle(110, 0, 10, 0.3, 40);
}
function draw() {
  background(200);
  rect1.display();
  rect2.display();
  rect3.display();
  rect4.display();
  rect5.display();
  rect6.display();
	bigRect1.display();
  
  push();
  strokeWeight(2);
  translate(width/2, height/2);
  eyeX = map(mouseX, 0, width, -20, 20);
  eyeY = map(mouseY, 0, height, -20, 20);
  noFill();
  ellipse(eyeX, eyeY, 50, 50);
  pop();
 
  
  push();
  strokeWeight(1)
  d = dist(0, mouseY, 0, height/2) ;
	disY = map(d, 0, height/2, 80height/2);
  disY2 = map(d, 0, height/2, height/2, 520); 
  arc(width/2, disY, width*3/4, height/2, 180, 0);  
	arc(width/2, disY2, width*3/4, height/2, 0, 180);  
  pop();
}
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {
  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;
  this.display = function() {
    for (let i = 0; i < this.n; i++) {
      push();
      translate(width / 2, height / 2);
      let n = 1 / this.speed;
      rotate(360 * i / this.n);
      rotate(frameCount / n);
      noFill();
      rect(this.x, this.y, this.size, this.size);
      pop();
    }
  }
}let rect1, rect2, rect3, rect4, rect5, rect6;
let eyeX, eyeY ; 
let disX, disY ; 
function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  angleMode(DEGREES);
  rect1 = new rectangle(120, 0, 10, 0.5, 20);
  rect2 = new rectangle(120, 0, 10, -0.2, 20);
  rect3 = new rectangle(100, 0, 10, -0.5, 20);
  rect4 = new rectangle(100, 0, 10, 0.2, 20);
  rect5 = new rectangle(100, 0, 10, -1, 20);
  rect6 = new rectangle(120, 0, 10, 0.8, 20);
  bigRect1 = new rectangle(110, 0, 10, 0.3, 40);
}
function draw() {
  background(200);
  rect1.display();
  rect2.display();
  rect3.display();
  rect4.display();
  rect5.display();
  rect6.display();
	bigRect1.display();
  
  push();
  strokeWeight(2);
  translate(width/2, height/2);
  eyeX = map(mouseX, 0, width/2, -20, 10);
  eyeY = map(mouseY, 0, height/2, -20, \10);
  fill(0, 255, 255);
  ellipse(eyeX, eyeY, 60, 60);
  pop();
  
}
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {
  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;
  this.display = function() {
    for (let i = 0; i < this.n; i++) {
      push();
      translate(width / 2, height / 2);
      let n = 1 / this.speed;
      rotate(360 * i / this.n);
      rotate(frameCount / n);
      noFill();
      rect(this.x, this.y, this.size, this.size);
      pop();
    }
  }
}let rect1, rect2, rect3, rect4, rect5, rect6;
let eyeX, eyeY ; 
function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  angleMode(DEGREES);
  rect1 = new rectangle(120, 0, 10, 0.5, 20);
  rect2 = new rectangle(120, 0, 10, -0.2, 20);
  rect3 = new rectangle(100, 0, 10, -0.5, 20);
  rect4 = new rectangle(100, 0, 10, 0.2, 20);
  rect5 = new rectangle(100, 0, 10, -1, 20);
  rect6 = new rectangle(120, 0, 10, 0.8, 20);
  bigRect1 = new rectangle(110, 0, 10, 0.3, 40);
}
function draw() {
  background(200);
  rect1.display();
  rect2.display();
  rect3.display();
  rect4.display();
  rect5.display();
  rect6.display();
	bigRect1.display();
  
  push();
  strokeWeight(2);
  translate(width/2, height/2);
  eyeX = map(mouseX, 0, width, -20, 20);
  eyeY = map(mouseY, 0, height, -20, 20);
  noFill();
  ellipse(eyeX, eyeY, 50, 50);
  pop();
 
}
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {
  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;
  this.display = function() {
    for (let i = 0; i < this.n; i++) {
      push();
      translate(width / 2, height / 2);
      let n = 1 / this.speed;
      rotate(360 * i / this.n);
      rotate(frameCount / n);
      noFill();
      rect(this.x, this.y, this.size, this.size);
      pop();
    }
  }
}let w, h;
let cw, ch;
let rw, rh;
let numCols = 60;
let numRows = 60;
let d;
let x, y;
let b;
let on = false;
let wavepoint;
function setup() {
  createCanvas(600, 600);
  cw = width / numCols;
  ch = height;
  rw = width;
  rh = width / numRows;
  background(220);
}
function draw() {
  
  if(on) {
    push();
    rectMode(CENTER);
    wavepoint = translate(mouseX, mouseY);
for()
    
    pop();
    
  }
  
  push();
  for (cn = 0; cn < numCols; cn++) {
    for (rn = 0; rn < numRows; rn++) {
      let x = cn * cw;
      let y = rn * rh;
      rect(x, y, cw, rh);
      d = dist(mouseX, mouseY, x, y);
      b = map(d, 0, 60, 0, 255);
      fill(b);
    }
  }
  pop();
}
function mousePressed() {
  on = true ; 
}let x, y ; 
let s ; 
let angle;
let speed = 0.5 ;
let w, h ; 
let size ; 
let rc ; 
function setup() { 
  createCanvas(windowWidth, windowHeight);
	w = windowWidth/2 ; 
  h = windowHeight/2 ; 
  angle = 0;
  x = 0 ; 
  y = 0 ; 
  s = 1 ;
  size = 2 ; 
  rectMode(CENTER);
  background(0);
 
} 
function draw() { 
  
  
  rc = color(random(120), 100, random(255));
  noFill();
  stroke(rc);
  strokeWeight(0.8);
  translate(w, h) ;
  rotate(angle++);
  ellipse(x, y, 10, 10);
  x += speed ; 
  y += speed ;
  size += speed ; 
  
  if(x>100 || x<0) {
   speed *= -1 ;  
  }
  
  
  
  
}let ball1, ball2 ; 
let d ; 
function setup() { 
  createCanvas(600, 400);
	ball1 = {
  x: 100, 
  y: 100, 
  xspeed: 7, 
  yspeed: 5, 
  r: 70
}
 ball2 = {
  x: 420, 
  y: 120, 
   xspeed: 4, 
   yspeed: 10, 
   r:50
 }
} 
function draw() { 
  background(220);
  ball(ball1);
  ball(ball2);
  
  d = dist(ball1.x, ball1.y, ball2.x, ball2.y);
  if(d<=ball1.r/2+ball2.r/2) {
    ball1.xspeed *= -1 ;  
  	 ball1.yspeed *= -1 ;  
       ball2.xspeed *= -1 ;  
       ball2.yspeed *= -1 ;   
  }
    
}
function ball(ball){
  ball.xspeed = bounce(ball.xspeed, ball.x, 0, width, ball.r);
  ball.yspeed = bounce(ball.yspeed, ball.y, 0, height, ball.r);
  ball.x = move(ball.x, ball.xspeed); 
  ball.y = move(ball.y, ball.yspeed);
  ellipse(ball.x, ball.y, ball.r, ball.r);
  }
function move(location, speed) {
  location += speed ;   
  return location;
}
function bounce(speed, i, min, max, r) {
  if(i-r<min || i+r>max) {
   speed *= -1 ;  
  }  
  return speed ; 
}
function collapse() {
  
}let w, h;
let cw, ch;
let rw, rh;
let numCols = 60;
let numRows = 60;
let d;
let x, y;
let b;
function setup() {
  createCanvas(600, 600);
}
function draw() {
  background(220);
  cw = width / numCols;
  ch = height;
  rw = width;
  rh = width / numRows;
  for (cn = 0; cn < numCols; cn++) {
    for (rn = 0; rn < numRows; rn++) {
      let x = cn * cw;
      let y = rn * rh;
      rect(x, y, cw, rh);
      d = dist(mouseX, mouseY, x, y);
      b = map(d, 0, 70, 0, 255);
      fill(b);
    }
  }
let x, y ,r;
let angle;
let offsetAngle;
let stopAngle;
let h, s, l;
let b;
let c = 0;
let speed=0;
let dragging = false;
let changeCol = false;
let passedStop = false;
function setup() { 
	createCanvas(550, 400);
	colorMode(HSL);
	h = 8;
	s = 88;
	l = 58;
	angle = 0;
	stopAngle = PI*2/3;
} 
function draw() { 
	background(255);
	x = width/2;
	y = 0;
	r = dist(x, y, width, height);
	noStroke();
	fill(h, s, l);
  
  l = map(angle, 0, stopAngle, 58, 88);
	let dx = mouseX - x;
	let dy = mouseY - y;
	let mouseAngle = atan2(dy, dx);
	if (dragging){
		angle = mouseAngle - offsetAngle;
	}
	if (angle > stopAngle || angle < 0){
		angle = 0;
		if (!passedStop){
			changeCol = !changeCol;
			passedStop = !passedStop;
		}
	} else {
		passedStop = false;
	}
	if (changeCol) {
			h += 20;
			passedStop=false;
	}
	if (h > 360) {
			h = 0;
		}
	push();
	translate(x, y);
	rotate(angle);
	arc(0, 0, 2*r, 2*r, PI/8 , PI*1.3);
	pop();
	fill(c);
  speed++;
  if(speed>50) {
   	c = 255; 
  	speed = 0;
  }
 	else {
  c = 0; 
  } 
	textSize(13);
	text("Drag your cursor to the left!", width*0.7, height*0.08);
	console.log(angle);
}
function mousePressed() {
	if (dist(mouseX, mouseY, x, y) < r){
		dragging = true;
		let dx = mouseX - x;
		let dy = mouseY - y;
	}
}
function mouseReleased() {
	dragging = false;
	changeCol = false;
}let rectx, recty;
let w, h;
let n = 10;
function setup() {
  createCanvas(400, 400);
  strokeWeight(1);
  w = width / n;
  h = height / n
}
function draw() {
  background(220);
  for (i = 0, rectx = 0; i <= 9; i++, rectx += w) {
    for (j = 0, recty = 0; j <= 9; j++, recty += h) {
      rect(rectx, recty, w, h);
    }
  }
}let x = 0;
let y = 0;
let redx, redy;
let bluex, bluey;
let bluestate = false;
let textcolor = 220;
let redc, bluec ;
let size = 10; 
function setup() {
  createCanvas(640, 360);
  background(0);
  redx = width / 3;
  redy = height / 2;
  bluex = width / 3 * 2;
  bluey = height / 2
}
function draw() {
	fill(255);
  textSize(size);
	text("real world", redx-25, redy+100)	;
	text("matrix", bluex-15, bluey+100);
  
  if(mouseX>redx-25 && mouseX<redx+25 && mouseY>redy-50 && mouseY<redy+50) {
	redc = 255 ;    
  } else { 
    redc = 180; 
         }
  if(mouseX>bluex-25 && mouseX<bluex+25 && mouseY>bluey-50 && mouseY<bluey+50) {
	bluec = 255 ;    
  } else { 
    bluec = 180; 
         }
  
  fill(redc, 0, 0);
  ellipse(redx, redy, 50, 100);
  fill(0, 0, bluec);
  ellipse(bluex, bluey, 50, 100);
  if (bluestate) {
    fill(0, textcolor, 0);
    if (random(1) > 0.5) {
      text("1", x, y);
    } else {
      text("0", x, y);
    }
    y += 20;
    if (x > width) {
      background(0);
      x = 0;
      y = 0;
    }
    if (y > height) {
      x += 20;
      y = 0;
    }
  }
}
function mousePressed() {
  if (mouseX>bluex-25 && mouseX<bluex+25 && mouseY>bluey-50 && mouseY<bluey+50) {
    background(0);
    bluestate = true;
  }
 
  if (mouseX>redx-25 && mouseX<redx+25 && mouseY>redy-50 && mouseY<redy+50) {
    background(255);
    bluestate = false;
  }
}
function mouseReleased() {
  if (mouseX>bluex-25 && mouseX<bluex+25 && mouseY>bluey-50 && mouseY<bluey+50) {
 	size = 0 ; 
  }
 
  
}
let start = 0;
let x, nextx ;
let num = 10;
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  
  for(i=0; i<=9; i++) {
  
  x = start+i*width/num;
  nextx = x+width/num;
  if(mouseX>x && mouseX<nextx && i!=6) {
    noStroke();
    fill(255,0,0);
    rect(x, 0, width/num, height); 
  } 
  	else { 
      noFill();
    }   
  }
  
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  ellipseMode(CENTER);
  fill(0,150,150);
  noStroke();
  ellipse(200,200,200,200);
  
}function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
  background(0,255,255);
  
  stroke(255,0,0);
  strokeWeight(40);
  line(0,0,600,400);
  
  fill(0,200,0);
  strokeWeight(0);
  ellipse(300,200,300,200);
  
  fill(0,0,80);
  rect(400,150,50,50);
  
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
}∆∆