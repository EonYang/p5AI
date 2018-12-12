let p, started;


function setup() {
    createCanvas(800, 800);
    // background(0);
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
        // noCursor();
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
}let serial;          // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem14111'; // fill in your serial port name here
let inData;                            // for incoming serial data
let outByte = 0;    // for outgoing data
let value1, value2 ;  

function setup() {
 createCanvas(400, 800);          // make canvas
 smooth();                        // antialias drawing lines
 serial = new p5.SerialPort();    // make a new instance of the serialport library
 serial.on('data', serialEvent);  // callback for when new data arrives
 serial.open(portName);           // open a serial port
}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  
  let inString = serial.readStringUntil('\r\n');
  //check to see that there's actually a string there:
  if (inString.length > 0) {
    if (inString !== 'hello') {           // if you get hello, ignore it
      let sensors = split(inString, ','); // split the string on the commas
      if (sensors.length > 1) {
       value1 = sensors[0]; 
       value2 = sensors[1];
     }
    }
    serial.write('x'); // send a byte requesting more serial data 
  }
  console.log(inString);
}
 

function draw() {
 background(0);
 fill(255);
}




// generating real water

// function realWater(){
//     if ( waterline is higher than point ) {
//        serial.write(H);
//         }
    		// else serial.write(L); 
// }

function keyPressed() {
 if (key ==='H' || key ==='L') { 
 serial.write(key);              // send it out the serial port
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

    
    
    // this.wrap_around();
    this.vel.limit(this.maxVel);
    
    this.flow();
    this.draw();
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.acc.mult(0);
    
    this.life = this.life - 1;
    
    // if(this.life <= 0) {
    //   this.life = random(50,150);
    //   this.pos = createVector(random(width),random(height));
    //   this.vel = createVector();
    // }
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
  
//   this.wrap_around = function() {
//     if(this.pos.x > width) {
//       this.life = random(50,150);
//       this.pos = createVector(-20,random(height));
//       this.vel = createVector();
//     } else if (this.pos.x < 0) {
//       this.life = random(50,150);
//       this.pos = createVector(width+20,random(height));
//       this.vel = createVector();
//     }
    
//     if(this.pos.y > height) {
//       this.life = random(50,150);
//       this.pos = createVector(random(width),-20);
//       this.vel = createVector();
//     } else if (this.pos.y < 0) {
//       this.life = random(50,150);
//       this.pos = createVector(random(width),random(height));
//       this.vel = createVector();
//     }

//   }

}let A = 0.03; // acceleration range
let V_MAX = 2; // velocity max
let V_MIN = -V_MAX; // velocity min
let CHARGE_SUB = 1; 
let CHARGE_MAX = 255;
let flies = [];
let num = 150 ;
let started = false ;
let canvas ; 
let standardX, standardY ;


class Fly {
  constructor(x, y, vx, vy){
  this.x = x; // position x
  this.y = y; // position y
  this.vx = vx; // velocity x
  this.vy = vy; // velocity y
  this.charge = 0; // amount of deposit
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

    // Update velocity
    this.vx += this.ax;
    this.vy += this.ay;

    this.vx = constrain(this.vx, V_MIN, V_MAX);
    this.vy = constrain(this.vy, V_MIN, V_MAX);

    // Update position
    this.x += this.vx;
    this.y += this.vy;

    this.x = constrain(this.x, 0, width-1);
    this.y = constrain(this.y, 0, height-1);
  }

  display() {        
    this.v = max((this.vx), (this.vy)); // velocity measure
    this.r = map(this.v, 0, V_MAX, 3, 10); // radius

    // Trajectory
    fill(100, 100, 255);
    ellipse(this.x, this.y, 5, 5);

    // Color
    this.alpha = map(this.charge, 0, CHARGE_MAX, 0, 255);    
    fill(255, this.alpha);
    ellipse(this.x, this.y, this.r, this.r);
  }
}

//---------------------------------------

function setup() {
  createCanvas(600, 600);
  for (i = 0; i < num; i++) {
    flies[i] = new Fly(random(width), random(height), random(-1, 1), random(-1, 1));
  }  

}

// function randomMove(){
//  standardX = random(width);
//  standardY = random(height);
// }

// function followMove(){
//  standardX = mouseX ;
//  standardY = mouseY ;
// }

function draw() {
  
  
  // Fade previous frame a bit
   // background(frameCount/30,50,20, 20);
  fill(0, 20);
  canvas = rect(0, 0, width, height);
  ellipseMode(CENTER);
  noStroke();

  // if (mouseIsPressed) {
  //   fill(255);
  //   ellipse(mouseX, mouseY, 60, 60);
  // }


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
  // setup camera capture
  var videoInput = createCapture(VIDEO);
  videoInput.size(600, 400);
  videoInput.position(0, 0);
  // videoInput.hide();

  // setup canvas
  var cnv = createCanvas(500, 400);
  cnv.position(0, 0);
  
  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init();
  ctracker.start(videoInput.elt);
  noStroke();
}

function draw() {
  clear();
  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();

  for (var i = 0; i < positions.length; i++) {
    // set the color of the ellipse based on position on screen
    fill(map(positions[i][0], width * 0.33, width * 0.66, 0, 255), map(positions[i][1], height * 0.33, height * 0.66, 0, 255), 255);
    // draw ellipse at each position point
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
  //  background(0);
  // clear();
  video.loadPixels();

  for (i = 0; i < num; i++) {
    stars[i].run();
  }
}// ArrayList<star> starArray = new ArrayList<star>();

let starArray = [];
let h2;//=height/2
let w2;//=width/2
let d2;//=diagonal/2
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

  // rect(0, 0, width, height);
  
  
	for ( i = 0; i<newStars; i++) {   // star init
    starArray.push(new Star(random(width), random(height),random(0.2, 5), 0, random(0,0.03)));
  }

	fill(map(dist(mouseX, mouseY, w2, h2), 0, d2, 255, -10));

  neuerStern.render();

  for ( i = 0; i<starArray.length; i++) {
    if (starArray[i].x<0||starArray[i].x>width||starArray[i].y<0||starArray[i].y>height) {
			starArray.splice(i);
		}
    // starArray[i].move();
    starArray[i].render();
  }

  if (starArray.length>numberOfStars) {
    for ( k = 0; k<newStars; k++) {
      starArray.splice(k);
    }
  }
}

// boolean sketchFullScreen() {// force fullscreen
//   return true;
// }
// 引力・斥力モデル
var num = 1000;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);

var magnetism = 10.0; //引力の強さ マイナスにすると斥力になる。
var radius = 1 ; //描画する円の半径
var gensoku = 0.95; // 粒子の移動を減速させる

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
    var distance = dist(mouseX, mouseY, x[i], y[i]); //dist(x1,y1,x2,y2) ２点間の距離を求める関数
    //加速度は引力の中心からの距離の二乗に反比例する。
    if(distance > 3){ //あまりマウスに近すぎる場合は加速度を更新しない
      ax[i] = magnetism * (mouseX - x[i]) / (distance * distance); 
      ay[i] = magnetism * (mouseY - y[i]) / (distance * distance);
    }
    vx[i] += ax[i]; // 1フレームあたりaxだけ速度vxを増加する。
    vy[i] += ay[i]; // 1フレームあたりayだけ速度vyを増加する.
    
    vx[i] = vx[i]*gensoku;
    vy[i] = vy[i]*gensoku;
    
    x[i] += vx[i];  // 1フレームあたりvyピクセル進ませる。
    y[i] += vy[i];  // 1フレームあたりvyピクセル進ませる。
    
    var sokudo = dist(0,0,vx[i],vy[i]); // 速度のX,Y成分から速度を求める
    var r = map(sokudo, 0, 5, 0, 255); //速度に応じた色を計算
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

// click to play and pause
function goPlay() {
  if (music.isPlaying()) {
    music.pause();
  } else {
    music.play();
  }
}

function draw() {
  background(0);
 // clear(); 
  video.loadPixels();

  for (i = 0; i < num; i++) {
    stars[i].run();
  }
}var constellation = [];
var n;
var d;

function setup() {
  createCanvas(500, 500);
  pixelDensity(1); // Set 1 because it's too slow on firefox
  //pixelDensity(displayDensity());
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
      if (i > j) { // "if (i > j)" => to check one time distance between two stars
        d = constellation[i].loc.dist(constellation[j].loc); // Distance between two stars
        if (d <= width / 10) { // if d is less than width/10 px, we draw a line between the two stars
          line(constellation[i].loc.x, constellation[i].loc.y, constellation[j].loc.x, constellation[j].loc.y)
        }
      }
    }
  }

}

function star() {

  this.a = random(5 * TAU); // "5*TAU" => render will be more homogeneous
  this.r = random(width * .2, width * .25); // first position will looks like a donut
  this.loc = createVector(width / 2 + sin(this.a) * this.r, height / 2 + cos(this.a) * this.r);
  this.speed = createVector();
  this.speed = p5.Vector.random2D();
  //this.speed.random2D();
  this.bam = createVector();
  this.m;


  this.update = function() {
      this.bam = p5.Vector.random2D(); // movement of star will be a bit erractic
      //this.bam.random2D();
      this.bam.mult(0.45);
      this.speed.add(this.bam);
      // speed is done according distance between loc and the mouse :
      this.m = constrain(map(dist(this.loc.x, this.loc.y, mouseX, mouseY), 0, width, 8, .05), .05, 8); // constrain => avoid returning "not a number"
      this.speed.normalize().mult(this.m);

      // No colision detection, instead loc is out of bound
      // it reappears on the opposite side :
      if (dist(this.loc.x, this.loc.y, width / 2, height / 2) > (width / 2) * 0.98) {
        if (this.loc.x < width / 2) {
          this.loc.x = width - this.loc.x - 4; // "-4" => avoid blinking stuff
        } else if (this.loc.x > width / 2) {
          this.loc.x = width - this.loc.x + 4; // "+4"  => avoid blinking stuff
        }
        if (this.loc.y < height / 2) {
          this.loc.y = width - this.loc.y - 4;
        } else if (this.loc.x > height / 2) {
          this.loc.y = width - this.loc.y + 4;
        }
      }
      this.loc = this.loc.add(this.speed);
    } // End of update()
} // End of classlet videoScale = 10;
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

  // Initialize columns and rows
  cols = width / videoScale;
  rows = height / videoScale;

  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(cols, rows);
  // video.hide();

  for (i = 0; i < num; i++) {
    stars.push(new Stars(random(-200, -10), random(0, 50), random(20), random(5)));
    stars2.push(new Stars(random(-200, -10), random(height - 50, height), random(20), random(5)));
  }
}


// click to play and pause
function goPlay() {
  if (music.isPlaying()) {
    music.pause();
    // speed = -1 ;   // black box to move position

  } else {
    music.play();
    // speed = 1 ; 
  }
}

function draw() {
  background(80);
  
  level = amplitude.getLevel();
  value = map(level, 0, 1, 0, 360);
  starSize = map(amplitude.getLevel(), 0, 1, 0, 0.1);
  // console.log(amplitude.getLevel());
  

  video.loadPixels();

  // Begin loop for columns
  for (var i = 0; i < cols; i++) {
    // Begin loop for rows
    for (var j = 0; j < rows; j++) {
      // Reversing x to mirror the image
      // In order to mirror the image, the column is reversed with the following formula:
      // mirrored column = width - column - 1
      var loc = ((cols - i - 1) + j * cols) * 4;

      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r = video.pixels[loc];
      var g = video.pixels[loc + 1];
      var b = video.pixels[loc + 2];

      var sz = map((r + g + b) / 3, 0, 255, 0, videoScale);

      fill(value, 220, 250);
      noStroke();

      // For every column and row, a ellipse is drawn at an (x,y) location scaled and sized by videoScale.
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
var serial, x, y; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1441';
let col = 0;
//let song1,song2,song3,song4;

// function preload(){
// song1=loadSound("small.mp3");
//   song2=loadSound("medium.mp3");
//   song3=loadSound("strong.mp3");
//   song4=loadSound("stronger.mp3");
// }

function setup() {
  //frameRate(10)
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  //colorMode(HSB,360);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  //serial.on('list', printList);  // set a callback function for the serialport list event

  serial.on('data', serialEvent); // callback for when new data arrives

  // serial.list();                      // list the serial ports
  serial.open(portName);
  // song1.play();
}

function serialEvent() {
  inData = serial.readLine();
  if (inData.length > 0) {
    // print(inData);

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

  //fill(255,120);
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
float h2;//=height/2
float w2;//=width/2
float d2;//=diagonal/2
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
  for (int i = 0; i<newStars; i++) {   // star init
    starArray.add(new star());
  }


  for (int i = 0; i<starArray.size(); i++) {
    if (starArray.get(i).x<0||starArray.get(i).x>width||starArray.get(i).y<0||starArray.get(i).y>height) starArray.remove(i);
    starArray.get(i).move();
    starArray.get(i).render();
  }
  if (starArray.size()>numberOfStars) {//
    for (int i = 0; i<newStars; i++) {
      starArray.remove(i);
    }
  }
}

boolean sketchFullScreen() {// force fullscreen
  return true;
}let movers = [];
let val;
let clr;
let input = 20;


function setup() {
  //frameRate(10)
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
  // console.log(movers.length)
}let movers=[];
let going=false;
let input ;
let horizon ; 
let globalh = 0 ;
let offsetSpeed = -1;

let serial;
let portName = '/dev/cu.usbmodem1411'; 


function setup() { 
 	//frameRate(10)
  createCanvas(600, 600);
  // horizon = new Rectangle(input);
  
  serial = new p5.SerialPort();
   serial.open(portName)
   serial.on('data', serialEvent); 
  
} 

function serialEvent() {
  let data = serial.readLine();
  if (data.length > 0) {
   input = map(data, 2, 1023, 0, 20);
  }
     // console.log(input);
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

  // horizon.display();
  
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
//let i=0;
//let going=false;
let input ;

let serial;
var portName = '/dev/cu.usbmodem1451'; 



function setup() { 
 	//frameRate(10)
  createCanvas(600, 600);
  
  for(let i=0;i<num;i++){
  movers.push(new Movers(input));
  } 
  
   serial = new p5.SerialPort();
   serial.open(portName)
   serial.on('data', serialEvent); 
} 


function serialEvent() {
  let data = serial.readLine();
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
//    console.log(movers.length)
  }
}

// function mousePressed(){
//   going=!going
// }

let bubble=[];
//let colors= {r, g, b};
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
let api = "https://api.nasa.gov/neo/rest/v1/feed?";
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
      
  // let x = earthX + earthR/2 + asteroids.near_earth_objects[input.value()][i].close_approach_data[0].miss_distance.miles/100000 ;
   // let size = asteroids.near_earth_objects[input.value()][i].estimated_diameter.miles.estimated_diameter_max*20 ;
 
      // ellipse(random(200), height/2, size)
      
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
    // noLoop();
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
}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Exercise 8-5: Rewrite the gravity example from 
// Chapter 5 using objects with a Ball class. 
// Include two instances of a Ball object.

// Two ball objects
var ball1;
var ball2;

// Global gravity variable
var gravity = 0.8;

function setup() {
	createCanvas(480, 270);

	// Create ball objects
	ball1 = new Ball(150, 0, 16);
	ball2 = new Ball(350, 50, 32);
}

function draw() {
	background(51);

	// Display ball objects
	ball1.display();
	ball2.display();

	// Move ball objects
	ball1.update();
	ball2.update();

}let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
let valX, valY ;

function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);
} 


function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log(currentString); // println the string
  latestData = currentString; // save it for the draw method
  
  let val = split(latestData, ',');
   valX = int(val[0]);
   valY = int(val[1]) ; 
  print(valX);
  
}

function draw() { 
  background(valY, 0, 127);
  
  let v = map(valX, 0, 255, 0, 1200); 
  let origV = v;

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

  bob = createImg('https://timedotcom.files.wordpress.com/2014/08/t100_tv_spongebob_free1.jpg?quality=85');
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
  uglybob = createImg('https://img.buzzfeed.com/buzzfeed-static/static/2014-12/2/14/enhanced/webdr01/enhanced-17738-1417549718-10.png?downsize=715:*&output-format=auto&output-quality=auto', true)
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
}let serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
let l = 0;
let val;
let valX, valY;

function setup() {
  createCanvas(500, 500);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  //serial.on('list', printList);  // set a callback function for the serialport list event
  // serial.on('connected', serverConnected); // callback for connecting to the server
  // serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  // serial.on('error', serialError);    // callback for errors
  //serial.on('close', portClose);      // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}

function serialEvent() {
  let data = serial.readLine();
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
  
  let img = createImg('http://static2.businessinsider.com/image/4dfc0c29ccd1d59103020000-506-253/its-official-spongebob-squarepants-is-making-our-children-stupid.jpg');
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
  
  let img = createImg('http://static2.businessinsider.com/image/4dfc0c29ccd1d59103020000-506-253/its-official-spongebob-squarepants-is-making-our-children-stupid.jpg');
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
  // clear();
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


// draw border of the bouncing area
function edge() {

  push();
  noFill();
  stroke(255);
  let edger = width - k * 50;
  ellipse(width / 2, height / 2, edger, edger);
  pop();
}

// change border size with keyboards
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

// draw caption 
function caption() {
  fill(255);
	// rect(15, height-55, 39, 20)
	// rect(15, height-35, 58, 20)
	// fill(0);
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
        // else{
        //  balls[i].backColor() ;
        //  balls[j].backColor();
        // }
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
        // else{
        //  balls[i].backColor() ;
        //  balls[j].backColor();
        // }
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
        // else{
        //  balls[i].backColor() ;
        //  balls[j].backColor();
        // }
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
  // x = width/2;
  // y = height/2;
  // xspeed = 1;
  // yspeed = 3;
  ball1 = new ball(20, 20k, );

} 

function draw() { 
  background(220);
  
  ball1.display();
  ball1.update();
  
//   // make this to bounce function
//   if(x < 0 || x > width) {
//    xspeed *= -1; 
//   }
  
//   if(y < 0 || y > height) {
//    yspeed *= -1; 
//   }
  
//   x += xspeed;
//   y += yspeed;

//   // Draw the ball -> functionize
// 	ellipse(x,y, 50, 50);
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

  // iris elements
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

  // draw iris elements
  rect1.display();
  rect2.display();
  rect3.display();
  rect4.display();
  rect5.display();
  rect6.display();
  bigRect1.display();

  // draw center part of the eue
  eyeCenter();

  // draw slider
  slider();
  slider2();
  
}

// make rectangle object
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {

  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;

  // make rectangle rotate 
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

// draw center that follows mouse
function eyeCenter() {
  // center following mouse
  push();
  strokeWeight(2);
  translate(width / 2, height / 2);
  eyeX = map(mouseX, 0, width, -20, 20);
  eyeY = map(mouseY, 0, height, -20, 20);
  colorMode(HSB);
  fill(255 - c, 100, 100);
  ellipse(eyeX, eyeY, 50, 50);
  pop();

  // outline of the eye
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
  // Stop dragging
  dragging = false;
  dragging2 = false;
}

// slider that controls curtain position
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
  // draw button of slider
  rect(btn.x, btn.y, btn.w, btn.h);
  dis = map(btn.x, sliderStart, sliderEnd - btn.w, height / 2, -height / 4);

  // draw curtain 
  rectMode(CENTER);
  rect(width / 2, dis, width, height * 2 / 3)
}

// slider that controls color
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



// function slider(sldrx, sldry, btnx) {
//   this.sldrx = sldrx ; 
//   this.sldry = sldry ; 
//   this.btnx = btnx ; 
//   this.btnx = this.sldrx ; 

//   line(this.sldrx, this.sldry, this.sldrx+100, this.sldry);
// 	rectMode(CENTER);
//   fill(150)
//   rect(this.btnx, this.sldry, 20, 20);

//   if(dragging) { 
//     fill(60);
//     this.btnx = mouseX ;     
//     this.btnx = constrain(this.btnx, this.sldrx, this.sldrx+100);
//     c = floor(map(this.btnx, this.sldrx, this.sldrx+100, 0, 250)); 
//   }
// }

// function mousePressed() {
//  if(mouseX>sldrx-10 && mouseX< sldrx+10 && mouseY>sldry-10 && mouseY<sldry+10) {
//    dragging = true ; 
//  }
// }

// function mouseReleased() {
//   dragging = false ; 
// }let rect1, rect2, rect3, rect4, rect5, rect6;
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

  // iris elements
  rect1 = new rectangle(120, 0, 10, speed + 0.5, 20);
  rect2 = new rectangle(120, 0, 10, speed + -0.2, 20);
  rect3 = new rectangle(100, 0, 10, speed + -0.5);
  rect4 = new rectangle(100, 0, 10, speed + 0.2, 20);
  rect5 = new rectangle(100, 0, 10, speed + -1, 20);
  rect6 = new rectangle(120, 0, 10, speed + 0.8, 20);
  bigRect1 = new rectangle(110, 0, 10, speed + 0.3, 40);

  // bubble elements
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


  // draw iris elements
  rect1.display();
  rect2.display();
  rect3.display();
  rect4.display();
  rect5.display();
  rect6.display();
  bigRect1.display();

  // draw center part of the eue
  eyeCenter();

  // draw slider
  slider();
  slider2();

  // draw bubbles
  bbl1.display();
  bbl2.display();
  bbl3.display();
  bbl4.display();
  bbl5.display();
  bbl6.display();
  bbl7.display();
  bbl8.display();

}

// make rectangle object
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {

  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;

  // make rectangle rotate 
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

// draw center that follows mouse
function eyeCenter() {
  // center following mouse
  push();
  strokeWeight(2);
  translate(width / 2, height / 2);
  eyeX = map(mouseX, 0, width, -20, 20);
  eyeY = map(mouseY, 0, height, -20, 20);
  colorMode(HSB);
  fill(255 - c, 100, 100);
  ellipse(eyeX, eyeY, 50, 50);
  pop();

  // outline of the eye
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
  // Stop dragging
  dragging = false;
  dragging2 = false;
}

// slider that controls curtain position
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
  // draw button of slider
  rect(btn.x, btn.y, btn.w, btn.h);
  dis = map(btn.x, sliderStart, sliderEnd - btn.w, height / 2, -height / 4);

  // draw curtain 
  rectMode(CENTER);
  rect(width / 2, dis, width, height * 2 / 3)
}

// slider that controls color
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
//  d = dist(mouseX, mouseY, this.x, this.y);
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

  // iris elements
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

  // draw iris elements
  rect1.display();
  rect2.display();
  rect3.display();
  rect4.display();
  rect5.display();
  rect6.display();
  bigRect1.display();

  // draw center part of the eue
  eyeCenter();

  // draw slider
  slider();
  slider2();
}

// make rectangle object
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {

  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;

  // make rectangle rotate 
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

// draw center that follows mouse
function eyeCenter() {
  // center following mouse
  push();
  strokeWeight(2);
  translate(width / 2, height / 2);
  eyeX = map(mouseX, 0, width, -20, 20);
  eyeY = map(mouseY, 0, height, -20, 20);
  colorMode(HSB);
  fill(255 - c, 100, 100);
  ellipse(eyeX, eyeY, 50, 50);
  pop();

  // outline of the eye
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
  // Stop dragging
  dragging = false;
  dragging2 = false;
}

// slider that controls curtain position
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
  // draw button of slider
  rect(btn.x, btn.y, btn.w, btn.h);
  dis = map(btn.x, sliderStart, sliderEnd - btn.w, height / 2, -height / 4);

  // draw curtain 
  rectMode(CENTER);
  rect(width / 2, dis, width, height * 2 / 3)
}

// slider that controls color
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


// function slider(sldrx, sldry, btnx) {
//   this.sldrx = sldrx ; 
//   this.sldry = sldry ; 
//   this.btnx = btnx ; 
//   this.btnx = this.sldrx ; 

//   line(this.sldrx, this.sldry, this.sldrx+100, this.sldry);
// 	rectMode(CENTER);
//   fill(150)
//   rect(this.btnx, this.sldry, 20, 20);

//   if(dragging) { 
//     fill(60);
//     this.btnx = mouseX ;     
//     this.btnx = constrain(this.btnx, this.sldrx, this.sldrx+100);
//     c = floor(map(this.btnx, this.sldrx, this.sldrx+100, 0, 250)); 
//   }
// }

// function mousePressed() {
//  if(mouseX>sldrx-10 && mouseX< sldrx+10 && mouseY>sldry-10 && mouseY<sldry+10) {
//    dragging = true ; 
//  }
// }

// function mouseReleased() {
//   dragging = false ; 
// }let rect1, rect2, rect3, rect4, rect5, rect6;
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

  // iris elements
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

  // iris elements
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



// make rectangle object
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {

  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;

  // make rectangle rotate 
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
  // center following mouse
  push();
  strokeWeight(2);
  translate(width / 2, height / 2);
  eyeX = map(mouseX, 0, width, -20, 20);
  eyeY = map(mouseY, 0, height, -20, 20);
  noFill();
  ellipse(eyeX, eyeY, 50, 50);
   pop();

  // outline of the eye
  push();
  strokeWeight(1)
  noFill();
  curve(-100, h / 2 + 1100, -20, h / 2, w + 20, h / 2, w + 100, h / 2 + 1100);
  curve(-100, h / 2 - 1100, -20, h / 2, w + 20, h / 2, w + 100, h / 2 - 1100);
  pop();
}


function mousePressed() {
  // Did I click on slider?
  if (mouseX > btnx - btnw / 2 && mouseX < btnx + btnw / 2 && mouseY > btny - btnh / 2 && mouseY < btny + btnh / 2) {
    dragging = true;
    offsetX = btnx - mouseX;
  }
 
}

function mouseReleased() {
  // Stop dragging
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



// function slider(sldrx, sldry, btnx) {
//   this.sldrx = sldrx ; 
//   this.sldry = sldry ; 
//   this.btnx = btnx ; 
//   this.btnx = this.sldrx ; 

//   line(this.sldrx, this.sldry, this.sldrx+100, this.sldry);
// 	rectMode(CENTER);
//   fill(150)
//   rect(this.btnx, this.sldry, 20, 20);

//   if(dragging) { 
//     fill(60);
//     this.btnx = mouseX ;     
//     this.btnx = constrain(this.btnx, this.sldrx, this.sldrx+100);
//     c = floor(map(this.btnx, this.sldrx, this.sldrx+100, 0, 250)); 
//   }
// }

// function mousePressed() {
//  if(mouseX>sldrx-10 && mouseX< sldrx+10 && mouseY>sldry-10 && mouseY<sldry+10) {
//    dragging = true ; 
//  }
// }

// function mouseReleased() {
//   dragging = false ; 
// }let rect1, rect2, rect3, rect4, rect5, rect6;
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

  // iris elements
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

  // iris elements
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



// make rectangle object
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {

  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;

  // make rectangle rotate 
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
  // center following mouse
  push();
  strokeWeight(2);
  translate(width / 2, height / 2);
  eyeX = map(mouseX, 0, width, -20, 20);
  eyeY = map(mouseY, 0, height, -20, 20);
  noFill();
  ellipse(eyeX, eyeY, 50, 50);
  pop();

  // outline of the eye
  push();
  strokeWeight(1)
  noFill();
  curve(-100, h / 2 + 1100, -20, h / 2, w + 20, h / 2, w + 100, h / 2 + 1100);
  curve(-100, h / 2 - 1100, -20, h / 2, w + 20, h / 2, w + 100, h / 2 - 1100);
  pop();
}


function mousePressed() {
  // Did I click on slider?
  if (mouseX > btnx - btnw / 2 && mouseX < btnx + btnw / 2 && mouseY > btny - btnh / 2 && mouseY < btny + btnh / 2) {
    dragging = true;
    offsetX = btnx - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
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



// function slider(sldrx, sldry, btnx) {
//   this.sldrx = sldrx ; 
//   this.sldry = sldry ; 
//   this.btnx = btnx ; 
//   this.btnx = this.sldrx ; 

//   line(this.sldrx, this.sldry, this.sldrx+100, this.sldry);
// 	rectMode(CENTER);
//   fill(150)
//   rect(this.btnx, this.sldry, 20, 20);

//   if(dragging) { 
//     fill(60);
//     this.btnx = mouseX ;     
//     this.btnx = constrain(this.btnx, this.sldrx, this.sldrx+100);
//     c = floor(map(this.btnx, this.sldrx, this.sldrx+100, 0, 250)); 
//   }
// }

// function mousePressed() {
//  if(mouseX>sldrx-10 && mouseX< sldrx+10 && mouseY>sldry-10 && mouseY<sldry+10) {
//    dragging = true ; 
//  }
// }

// function mouseReleased() {
//   dragging = false ; 
// }let rect1, rect2, rect3, rect4, rect5, rect6;
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
  
  // iris elements
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

  // iris elements
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



// make rectangle object
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {

  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;

  // make rectangle rotate 
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
  // center following mouse
  push();
  strokeWeight(2);
  translate(width/2, height/2);
  eyeX = map(mouseX, 0, width, -20, 20);
  eyeY = map(mouseY, 0, height, -20, 20);
  noFill();
  ellipse(eyeX, eyeY, 50, 50);
  pop();

  // outline of the eye
  push();
  strokeWeight(1)
  noFill();
	 curve(-100, h/2+1100, -20, h/2, w+20, h/2, w+100, h/2+1100);
  curve(-100, h/2-1100, -20, h/2, w+20, h/2, w+100, h/2-1100);
  pop();
}


function slider() {
  // color slider 
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
  
	// center following mouse
  push();
  strokeWeight(2);
  translate(width/2, height/2);
  eyeX = map(mouseX, 0, width, -20, 20);
  eyeY = map(mouseY, 0, height, -20, 20);
  noFill();
  ellipse(eyeX, eyeY, 50, 50);
  pop();
 
  // outline of the eye
  push();
  strokeWeight(1)
  noFill();
	 curve(-100, h/2+1100, -20, h/2, w+20, h/2, w+100, h/2+1100);
  curve(-100, h/2-1100, -20, h/2, w+20, h/2, w+100, h/2-1100);
  pop();
  
}



// make rectangle object
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {

  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;

  // make rectangle rotate 
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
  
  // set variables
  this.railX = paraRailX;
  this.railY = paraRailY;
  this.railL = paraRailL;
  this.handleW = paraHandleW;
  this.handleH = paraHandleH;
  this.handleR = paraHandleR;
  
  this.handleX = this.railX;
  this.handleY = this.railY;
  this.handleRightBoundary = this.railX+this.railL-this.handleW;
  
  // set constant values
  this.railColor = color(0, 0, 80);
  this.handleColor = color(0, 0, 50);
  
  // draw this slider
  // dragging is included
  this.display = function() {
    
    noStroke();
    fill(this.railColor);
    rect(this.railX, this.railY, this.railL, this.handleH, this.handleR);
    
    fill(this.handleColor);
    rect(this.handleX, this.handleY, this.handleW, this.handleH, this.handleR);
    
   if(dragging) {
     this.handleX += (mouseX - pmouseX);
        
     // limit the handle not to escape the rail
     this.handleX = constrain(this.handleX, this.railX, this.handleRightBoundary);	
     c = floor(map(this.handleX, this.railX, this.handleRightBoundary, 90, 10));
    } 
    
  } // end of display()
} // end of Slider constructor 


// When press the slider handle
function mousePressed() {
  if(mouseX >= sldr1.handleX && mouseX <= (sldr1.handleX+sldr1.handleW) && mouseY >= sldr1.handleY && mouseY <= (sldr1.handleY+sldr1.handleH)) 
    dragging = true;
}

// when release the mouse
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
  
	// center following mouse
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



// make rectangle object
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {

  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;

  // make rectangle rotate 
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



// make rectangle object
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {

  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;

  // make rectangle rotate 
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
  
	// center following mouse
  push();
  strokeWeight(2);
  translate(width/2, height/2);
  eyeX = map(mouseX, 0, width, -20, 20);
  eyeY = map(mouseY, 0, height, -20, 20);
  noFill();
  ellipse(eyeX, eyeY, 50, 50);
  pop();
 

}



// make rectangle object
function rectangle(rectX, rectY, rectNum, rectSpeed, rectSize) {

  this.x = rectX;
  this.y = rectY;
  this.n = rectNum;
  this.speed = rectSpeed;
  this.size = rectSize;

  // make rectangle rotate 
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
}//arc origin and radius
let x, y ,r;
//angle of slider
let angle;
//difference of mouse angle and slider angle
let offsetAngle;
//end of slider rotation
let stopAngle;
//colors
let h, s, l;
//brightness 
let b;
//textcolor
let c = 0;
let speed=0;

//track if user dragging the slider
let dragging = false;
//track when to change color
let changeCol = false;
//track if you've passed the stop angle
let passedStop = false;


function setup() { 
	createCanvas(550, 400);
	colorMode(HSL);
	//start color
	h = 8;
	s = 88;
	l = 58;
	//start position of slider
	angle = 0;
	//end position of slider
	stopAngle = PI*2/3;
} 

function draw() { 
	background(255);
	//arc placement
	x = width/2;
	y = 0;
	//radius to fill the screen
	r = dist(x, y, width, height);
	//slider appearance
	noStroke();
	fill(h, s, l);
  
  //lightness scale by angle
  l = map(angle, 0, stopAngle, 58, 88);

  //change in mouse position
	let dx = mouseX - x;
	let dy = mouseY - y;
	//angle of mouse from 0
	let mouseAngle = atan2(dy, dx);
	//increase the angle while dragging
	if (dragging){
		angle = mouseAngle - offsetAngle;
	}
	//if slider reaches the area after the stop angle
	if (angle > stopAngle || angle < 0){
		//reset arc rotation
		angle = 0;
		//define when to change color
		//if hasn't passed the stop angle before
		if (!passedStop){
			//flip boolean value
			changeCol = !changeCol;
			passedStop = !passedStop;
		}
	} else {
		passedStop = false;
	}
	//change color
	if (changeCol) {
			h += 20;
			//reset after changing color
			passedStop=false;
	}
	//reset color cycling
	if (h > 360) {
			h = 0;
		}
	//draw the arc
	push();
	translate(x, y);
	rotate(angle);
	arc(0, 0, 2*r, 2*r, PI/8 , PI*1.3);
	pop();
	//add text
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

//drag rotation based on knob GUI code from Dan Schiffman: 
//https://github.com/ITPNYU/ICM-2015/blob/master/03_interaction/GUI/knob/sketch.js
function mousePressed() {
	//when user is dragging mouse inside the circle
	//track angle of mouse relative to angle of slider
	if (dist(mouseX, mouseY, x, y) < r){
		dragging = true;
		let dx = mouseX - x;
		let dy = mouseY - y;
		offsetAngle = atan2(dy, dx)-angle; //
	}
}

//when mouse is released, dragging is false
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

  // // caption 
	fill(255);
  textSize(size);
	text("real world", redx-25, redy+100)	;
	text("matrix", bluex-15, bluey+100);
  
  //rollover on pills
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
  
  //draw pill
  fill(redc, 0, 0);
  ellipse(redx, redy, 50, 100);

  fill(0, 0, bluec);
  ellipse(bluex, bluey, 50, 100);

  // matrix world
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

//if click blue pill
function mousePressed() {
  if (mouseX>bluex-25 && mouseX<bluex+25 && mouseY>bluey-50 && mouseY<bluey+50) {
    background(0);
    bluestate = true;
  }
 
//if click red pill  
  if (mouseX>redx-25 && mouseX<redx+25 && mouseY>redy-50 && mouseY<redy+50) {
    background(255);
    bluestate = false;
  }
}

// I want to make text disappear when pressed on blue pill, but failed.
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
    //console.log(x, nextx);
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
  
  //line
  stroke(255,0,0);
  strokeWeight(40);
  line(0,0,600,400);
  
  //ellipse
  fill(0,200,0);
  strokeWeight(0);
  ellipse(300,200,300,200);
  
  //rectangular
  fill(0,0,80);
  rect(400,150,50,50);
  
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}∆∆