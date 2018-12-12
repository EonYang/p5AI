let output;
let fanMove;
let system;
let pVelocity;
let pVelocityY;
let degree;
let xtime
let GREEN
let BLUE
let RED
let arcRing;
let alphaMap;
let latestData = "waiting for data";
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(40);
  angleMode(DEGREES);
  
  pVelocity = degree
  fanMove = 1;
  GREEN = 60;
  BLUE = 120;
  RED = 100;
 let data = map(latestData, 0, 1023, 0, height);
  
}
function gotData() {
function draw() {
  background(0);
  
  fanMove = mouseX;
  pVelocity = map(degree, 180, 360, 0, 20);
  pVelocityY = map(degree, 180, 360, 0, -20);
  arcRing = map(degree, 280, 360, 0, windowWidth);
  noStroke();
  output = map(fanMove, 0, width, 0, 255);
  degree = map(output, 0, 255, 180, 360);
  
  
	fanSegment();
  background_grad();
  
}
  
  
function fanSegment(){
  for (let d = 180; d > -180; d -= 5) {
    fill(255);
    arc(width / 2, height / 2, arcRing, arcRing, degree + d, -degree + d, PIE);
  }
  for (let d = 90; d > -90; d -= 20) {
    fill(200, 0, 0);
    arc(width / 2, height / 2, arcRing, arcRing, degree + d, -degree + d, PIE);
  }
 
  for (let d = 360; d > -360; d -= 60) {
 
    fill(BLUE, 0, 200, (-15, output));
    arc(width / 2, height / 2, arcRing, arcRing, degree + d, -degree + d, PIE);
  }
  
  
 
  
  
  fill(0, GREEN, BLUE);
  arc(width / 2, height / 2, 400, 400, degree - 90, -degree - 90, PIE);
  noFill();
  strokeWeight(5);
  stroke(BLUE, 150, 50);
  arc(width / 2, height / 2, 400, 400, -degree - 80, degree - 100);
  strokeWeight(5);
  stroke(0, 100, BLUE);
  arc(width / 2, height / 2, arcRing, arcRing, -degree - 80, degree - 100);
  stroke(0, 100, BLUE);
  arc(width / 2, height / 2, arcRing - 20, arcRing - 20, -degree - 80, degree - 100);
}
    
    
  
var Particle = function(position) {
  this.pVelocityYmin = 0;
  this.acceleration = createVector(0, -0.0001);
  this.velocity = createVector(random(-pVelocity, pVelocity), random(pVelocityY, this.pVelocityYmin));
  
  this.position = position.copy();
  this.lifespan = 60;
};
Particle.prototype.run = function() {
  this.update();
  this.display();
};
Particle.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(0);
  fill(0,GREEN, BLUE, this.lifespan);
  arc(width / 2, height / 2, 400, 400, this.position.x, this.position.y, PIE);
  
};
Particle.prototype.isDead = function() {
  return this.lifespan < 0;
};
var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};
ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};
ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
function background_grad() {
  xtime += 10
  if (xtime > 0 && xtime <= 50) {
    GREEN++
  } else if (xtime > 50 && xtime <= 100) {
    GREEN--
    BLUE += 5
  } else if (xtime > 100 && xtime <= 150) {
    GREEN += 5
    BLUE--
  } else if (xtime > 150 && xtime <= 255) {
    GREEN--
  } else {
    xtime = 1;
  }
  let output;
let fanMove;
let system;
let pVelocity;
let pVelocityY;
let degree;
let xtime
let GREEN
let BLUE
let RED
let arcRing;
let alphaMap;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(80);
  angleMode(DEGREES);
  pVelocity = degree
  fanMove = 1;
  GREEN = 60;
  BLUE = 120;
  RED = 100;
}
function draw() {
  background(0);
  
  fanMove = mouseX;
  pVelocity = map(degree, 180, 360, 0, 20);
  pVelocityY = map(degree, 180, 360, 0, -20);
  arcRing = map(degree, 280, 360, 0, windowWidth);
  noStroke();
console.log(pVelocityY);
  output = map(fanMove, 0, width, 0, 255);
  degree = map(output, 0, 255, 180, 360);
  
  
	fanSegment();
  background_grad();
  
}
  
  
function fanSegment(){
  for (let d = 180; d > -180; d -= 5) {
    fill(255);
    arc(width / 2, height / 2, arcRing, arcRing, degree + d, -degree + d, PIE);
  }
  for (let d = 90; d > -90; d -= 20) {
    fill(200, 0, 0);
    arc(width / 2, height / 2, arcRing, arcRing, degree + d, -degree + d, PIE);
  }
 
  for (let d = 360; d > -360; d -= 60) {
 
    fill(BLUE, 0, 200, (-15, output));
    arc(width / 2, height / 2, arcRing, arcRing, degree + d, -degree + d, PIE);
  }
  
  
 
  
  
  fill(0, GREEN, BLUE);
  arc(width / 2, height / 2, 400, 400, degree - 90, -degree - 90, PIE);
  noFill();
  strokeWeight(5);
  stroke(BLUE, 150, 50);
  arc(width / 2, height / 2, 400, 400, -degree - 80, degree - 100);
  strokeWeight(5);
  stroke(0, 100, BLUE);
  arc(width / 2, height / 2, arcRing, arcRing, -degree - 80, degree - 100);
  stroke(0, 100, BLUE);
  arc(width / 2, height / 2, arcRing - 20, arcRing - 20, -degree - 80, degree - 100);
}
    
    
  
var Particle = function(position) {
  this.pVelocityYmin = 0;
  this.acceleration = createVector(0, -0.0001);
  this.velocity = createVector(random(-pVelocity, pVelocity), random(pVelocityY, this.pVelocityYmin));
  
  this.position = position.copy();
  this.lifespan = 60;
};
Particle.prototype.run = function() {
  this.update();
  this.display();
};
Particle.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(0);
  fill(0,GREEN, BLUE, this.lifespan);
  arc(width / 2, height / 2, 400, 400, this.position.x, this.position.y, PIE);
  
};
Particle.prototype.isDead = function() {
  return this.lifespan < 0;
};
var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};
ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};
ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
function background_grad() {
  xtime += 10
  if (xtime > 0 && xtime <= 50) {
    GREEN++
  } else if (xtime > 50 && xtime <= 100) {
    GREEN--
    BLUE += 5
  } else if (xtime > 100 && xtime <= 150) {
    GREEN += 5
    BLUE--
  } else if (xtime > 150 && xtime <= 255) {
    GREEN--
  } else {
    xtime = 1;
  }
}let output;
let fanMove;
let system;
let pVelocity;
let pVelocityY;
let degree;
let xtime
let GREEN
let BLUE
let RED
let arcRing;
let alphaMap;
let fanAngle;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(80);
  angleMode(DEGREES);
  pVelocity = degree
  fanMove = 1;
  GREEN = 60;
  BLUE = 120;
  RED = 100;
}
function draw() {
  background(0);
  
  fanMove = mouseX;
  pVelocity = map(degree, 180, 360, 0, 20);
  pVelocityY = map(degree, 180, 360, 0, -20);
  arcRing = map(degree, 280, 360, 0, windowWidth);
  noStroke();
  output = map(fanMove, 0, windowWidth*2, 0, 255);
  degree = map(output, 0, 255, 180, 360);
  fanAngle = map(mouseX, 0, width*2, 0, 255);
  
  console.log(fanAngle);
	fanSegment();
  background_grad();
  
}
  
  
function fanSegment(){
  for (let d = 180; d > -180; d -= 5) {
    fill(255);
    arc(width / 2, height / 2, arcRing, arcRing, degree + d, -degree + d, PIE);
  }
  for (let d = 90; d > -90; d -= 20) {
    fill(200, 0, 0);
    arc(width / 2, height / 2, arcRing, arcRing, degree + d, -degree + d, PIE);
  }
 
  for (let d = 360; d > -360; d -= 60) {
 
    fill(BLUE, 0, 200, (-15, output));
    arc(width / 2, height / 2, arcRing, arcRing, degree + d, -degree + d, PIE);
  }
  
  
 
  
  
  fill(0, GREEN, BLUE);
  arc(width / 2, height / 2, 400, 400, degree - 90, -degree - 90, PIE);
  noFill();
  strokeWeight(5);
  stroke(BLUE, 150, 50);
  arc(width / 2, height / 2, 400, 400, -degree - 80, degree - 100);
  strokeWeight(5);
  stroke(0, 100, BLUE);
  arc(width / 2, height / 2, arcRing, arcRing, -degree - 80, degree - 100);
  stroke(0, 100, BLUE);
  arc(width / 2, height / 2, arcRing - 20, arcRing - 20, -degree - 80, degree - 100);
}
    
    
  
var Particle = function(position) {
  this.pVelocityYmin = 0;
  this.acceleration = createVector(0, -0.0001);
  this.velocity = createVector(random(-pVelocity, pVelocity), random(pVelocityY, this.pVelocityYmin));
  
  this.position = position.copy();
  this.lifespan = 60;
};
Particle.prototype.run = function() {
  this.update();
  this.display();
};
Particle.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(0);
  fill(0,GREEN, BLUE, this.lifespan);
  arc(width / 2, height / 2, 400, 400, this.position.x, this.position.y, PIE);
  
};
Particle.prototype.isDead = function() {
  return this.lifespan < 0;
};
var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};
ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};
ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
function background_grad() {
  xtime += 10
  if (xtime > 0 && xtime <= 50) {
    GREEN++
  } else if (xtime > 50 && xtime <= 100) {
    GREEN--
    BLUE += 5
  } else if (xtime > 100 && xtime <= 150) {
    GREEN += 5
    BLUE--
  } else if (xtime > 150 && xtime <= 255) {
    GREEN--
  } else {
    xtime = 1;
  }
}let output;
let fanMove;
let system;
let pVelocity;
let pVelocityY;
let degree;
let xtime
let GREEN
let BLUE
let RED
let arcRing;
let alphaMap;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15);
  angleMode(DEGREES);
  system = new ParticleSystem(createVector(width / 2, height/2));
  pVelocity = degree
  fanMove = 1;
  GREEN = 60;
  BLUE = 120;
  RED = 100;
}
function draw() {
  background(0);
   system.addParticle();
   system.run();
  
  fanMove = mouseX;
  pVelocity = map(degree, 280, 360, 0, 20);
  pVelocityY = map(degree, 280, 360, 0, -20);
  arcRing = map(degree, 280, 360, 0, windowWidth);
  noStroke();
  output = map(fanMove, 0, width, 0, 255);
  degree = map(output, 0, 255, 180, 360);
  
  
  background_grad();
  
  
  
  
function fanSegment(){
  for (let d = 180; d > -180; d -= 5) {
    fill(255);
    arc(width / 2, height / 2, arcRing, arcRing, degree + d, -degree + d, PIE);
  }
  for (let d = 90; d > -90; d -= 20) {
    fill(200, 0, 0);
    arc(width / 2, height / 2, arcRing, arcRing, degree + d, -degree + d, PIE);
  }
 
  for (let d = 360; d > -360; d -= 60) {
 
    fill(BLUE, 0, 200, (-15, output));
    arc(width / 2, height / 2, arcRing, arcRing, degree + d, -degree + d, PIE);
  }
  
  
 
  
  
  fill(0, GREEN, BLUE);
  arc(width / 2, height / 2, 400, 400, degree - 90, -degree - 90, PIE);
  noFill();
  strokeWeight(5);
  stroke(BLUE, 150, 50);
  arc(width / 2, height / 2, 400, 400, -degree - 80, degree - 100);
  strokeWeight(5);
  stroke(0, 100, BLUE);
  arc(width / 2, height / 2, arcRing, arcRing, -degree - 80, degree - 100);
  stroke(0, 100, BLUE);
  arc(width / 2, height / 2, arcRing - 20, arcRing - 20, -degree - 80, degree - 100);
}
    
    
  
}
var Particle = function(position) {
  this.pVelocityYmin = 0;
  this.acceleration = createVector(0, -0.0001);
  this.velocity = createVector(random(-pVelocity, pVelocity), random(pVelocityY, this.pVelocityYmin));
  this.position = position.copy();
  this.lifespan = 50;
};
Particle.prototype.run = function() {
  this.update();
  this.display();
};
Particle.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 5;
};
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(0);
  fill(0,GREEN, BLUE, this.lifespan);
  arc(width / 2, height / 2, 400, 400, this.position.x, this.position.y, PIE);
  
};
Particle.prototype.isDead = function() {
  return this.lifespan < 0;
};
var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};
ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};
ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
function background_grad() {
  xtime += 10
  if (xtime > 0 && xtime <= 50) {
    GREEN++
  } else if (xtime > 50 && xtime <= 100) {
    GREEN--
    BLUE += 5
  } else if (xtime > 100 && xtime <= 150) {
    GREEN += 5
    BLUE--
  } else if (xtime > 150 && xtime <= 255) {
    GREEN--
  } else {
    xtime = 1;
  }
} var ctracker;
 function setup() {
   var videoInput = createCapture();
   videoInput.size(400, 300);
   videoInput.position(0, 0);
   var cnv = createCanvas(400, 300);
   cnv.position(0, 0);
   ctracker = new clm.tracker();
   ctracker.init(pModel);
   ctracker.start(videoInput.elt);
   noStroke();
 }
 function draw() {
   clear();
   var positions = ctracker.getCurrentPosition();
   for (var i = 0; i < positions.length; i++) {
     fill(map(positions[i][0], width * 0.33, width * 0.66, 0, 255), map(positions[i][1], height * 0.33, height * 0.66, 0, 255), 255);
     ellipse(positions[i][0], positions[i][1], 8, 8);
   }
var video;
var prevFrame;
var threshold = 50;
function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  prevFrame = createImage(video.width, video.height, RGB);
}
function draw() {
  image(prevFrame, 0, 0);
  loadPixels();
  video.loadPixels();
  prevFrame.loadPixels();
  for (var x = 0; x < video.width; x++) {
    for (var y = 0; y < video.height; y++) {
      var loc = (x + y * video.width) * 4;
      
      var r1 = prevFrame.pixels[loc   ]; 
      var g1 = prevFrame.pixels[loc + 1];
      var b1 = prevFrame.pixels[loc + 2];
      var r2 = video.pixels[loc   ]; 
      var g2 = video.pixels[loc + 1];
      var b2 = video.pixels[loc + 2];
      var diff = dist(r1, g1, b1, r2, g2, b2);
      if (diff > threshold) { 
        pixels[loc+3] = 255;
      } else {
        pixels[loc] = 255;
        pixels[loc+1] = 255;
        pixels[loc+2] = 255;
        pixels[loc+3] = 255;
      }
    }
  }
  updatePixels();
}
let fanMove;
let system;
let pVelocity;
let pVelocityY;
let degree;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
  angleMode(DEGREES);
	pVelocity = degree
}
function draw() {
  background(0);
  
  
  fanMove = mouseX;
	pVelocity = map(degree, 270, 450, -40,40); 
  pVelocityY = map(degree, 270, 450, -40, 0); 
  noStroke();
  
  output = map(fanMove, 0, width, 0, 255);
  degree = map(output, 0, 255, 270, 450);
  
  
        
          
          
  
  
  
  
  
  fill(0,255,0);
  arc(width / 2, height / 2, width, height, 180, degree - 90, PIE);
  fill(0,255,0);
  arc(width / 2, height / 2, width, height, 180, -degree - 90, PIE);
  arc(width / 2, height / 2, width, height, 180, -degree - 90, PIE);
  text(degree, width / 2, height / 1.8);
  
  
}
function fanSegment() {
      for (let f = 255; f>0; f-=25){
        
        for(let d = 90; d>-75; d-=15){
          
          fill(f);
  arc(width / 2, height / 2, 400, 400, 180, degree + d, PIE);
          
        }
      }
      
      
    }
var Particle = function(position) {
  this.pVelocityYmin = 0;
  this.acceleration = createVector(0, -0.0001);
  this.velocity = createVector(random(pVelocity, 40), random(pVelocityY, this.pVelocityYmin));
  this.position = position.copy();
  this.lifespan = 150;
  
  console.log(this.velocity);
};
Particle.prototype.run = function() {
  this.update();
  this.display();
};
Particle.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(0);
  fill(255, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};
Particle.prototype.isDead = function() {
  return this.lifespan < 0;
};
var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};
ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};
ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
 function setup() {
   createCanvas(400, 400);
   angleMode(DEGREES);
 }
 function draw() {
   background(0);
   translate(200, 200);
   rotate(-90);
   let hr = hour();
   let mn = minute();
   let sc = second();
   strokeWeight(8);
   stroke(255, 100, 150);
   noFill();
   let secondAngle = map(sc, 0, 60, 0, 360);
   stroke(150, 100, 255);
   let minuteAngle = map(mn, 0, 60, 0, 360);
   stroke(150, 255, 100);
   let hourAngle = map(hr % 12, 0, 12, 0, 360);
   push();
   rotate(secondAngle);
   stroke(255, 100, 150);
   line(0, 0, 100, 0);
   pop();
   push();
   rotate(minuteAngle);
   stroke(150, 100, 255);
   line(0, 0, 75, 0);
   pop();
   push();
   rotate(hourAngle);
   stroke(150, 255, 100);
   line(0, 0, 50, 0);
   pop();
   stroke(255);
   point(0, 0);
}var system;
function setup() {
  createCanvas(720, 400);
  system = new ParticleSystem(createVector(width/2, 50));
}
function draw() {
  background(51);
  system.addParticle();
  system.run();
}
var Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255;
};
Particle.prototype.run = function() {
  this.update();
  this.display();
};
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};
var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};
ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};
ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
let data = 0;
let fanSpeed
let fanAngle
let output;
let fanMove;
let xtime;
let GREEN;
let BLUE;
let RED;
function setup() {
  frameRate(1);
  createCanvas(400, 400);
  angleMode(DEGREES);
  fanMove = 1;
  xtime = 1;
  GREEN = 80;
  BLUE = 150;
}
function draw() {
  background(0);
  background_grad();
  console.log(GREEN);
  noStroke();
  output = map(fanMove += 2 + 180, 0, width, 0, 255);
  var degree = map(output, 0, 255, 180, 360);
  fill(255);
  if (degree >= 540) {
    fill(100, GREEN, BLUE);
    fanMove = 0;
  } else if (degree < 180) {
    fill(255);
  }
  arc(width / 2, height / 2, 400, 400, 180, degree, PIE);
  fill(0, GREEN, BLUE);
  arc(width / 2, height / 2, 400, 400, 180, -degree, PIE);
  text(degree - 180, width / 2, height / 1.8);
}
function background_grad() {
  xtime = xtime + 1
  if (xtime > 0 && xtime <= 50) {
    GREEN++
  } else if (xtime > 50 && xtime <= 100) {
    GREEN--
    BLUE++
  } else if (xtime > 100 && xtime <= 150) {
    GREEN++
    BLUE--
  } else if (xtime > 150 && xtime <= 200) {
    GREEN--
  } else {
    xtime = 1;
    GREEN = 80
    BLUE = 150
  }
ml5 Example
Style Transfer Mirror Example using p5.js
This uses a pre-trained model of The Great Wave off Kanagawa and Udnie (Young American Girl, The Dance)
let style;
let video;
let isTransferring = false;
let resultImg;
function setup() {
  createCanvas(320, 240).parent('canvasContainer');
  video = createCapture(VIDEO);
  video.hide();
  resultImg = createImg('');
  resultImg.hide();
  select('#startStop').mousePressed(startStop);
  style = ml5.styleTransfer('models/udnie', video, modelLoaded);
}
function draw(){
  if (isTransferring) {
    image(resultImg, 0, 0, 320, 240);
  } else {
    image(video, 0, 0, 320, 240);
  }
}
function modelLoaded() {
  select('#status').html('Model Loaded');
}
function startStop() {
  if (isTransferring) {
    select('#startStop').html('Start');
  } else {
    select('#startStop').html('Stop');
    style.transfer(gotResult); 
		console.log(gotResult);
		
  }
  isTransferring = !isTransferring;
  console.log(isTransferring);
}
function gotResult(err, img) {
  resultImg.attribute('src', img.src);
  if (isTransferring) {
    style.transfer(gotResult); 
		
  }
	
}
let mClassifier;
let mCanvas;
let mImage;
let img
function setup() {
  mCanvas = createCanvas(400, 400);
  mCanvas.drop(gotFile);
  mClassifier = ml5.imageClassifier('MobileNet', gotModel);
}
  
  
}
function gotModel(){
  console.log("got model");
}
function imageReady(){
	classifier.predict(img,gotResult);
}
  
  
function draw() {
}
var video;
var vScale = 16;
var particles = [];
var slider;
function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  for (var i = 0; i < 200; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
  slider = createSlider(0, 255, 127);
  background(51);
}
function draw() {
  background(51);
  video.loadPixels();
  for(var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
}
function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
}
function draw() {
  background(51);
  loadPixels();
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var index = (x + y * width)*4;
      pixels[index+0] = x;
      pixels[index+1] = random(255) ;
      pixels[index+2] = y;
      pixels[index+3] = 255;      
    }
  }
  updatePixels();
 
}
 * @name Video Pixels
 * @frame 320,240
 * @description <p>Load a video, manipulate its pixels and draw to canvas.
 * <p><em><span class="small"> To run this example locally, you will need the
var fingers;
function setup() {
  createCanvas(320, 240);
  fingers = createVideo(['assets/fingers.mov',
                         'assets/fingers.webm']);
  fingers.loop();
  fingers.hide();
  noStroke();
  fill(0);
}
function draw() {
  fingers.loadPixels();
  var stepSize = round(constrain(mouseX / 8, 6, 32));
  for (var y=0; y<height; y+=stepSize) {
    for (var x=0; x<width; x+=stepSize) {
      var i = y * width + x;
      var darkness = (255 - fingers.pixels[i*4]) / 255;
      var radius = stepSize * darkness;
      ellipse(x, y, radius, radius);
    }
  }
}
function preload(){
  sound = loadSound('assets/Wavess_solo.mp3');
}
function setup(){
  var cnv = createCanvas(100,100);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT();
  sound.amp(0.2);
}
function draw(){
  background(0,0,0);
  var spectrum = fft.analyze();
  noStroke();
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }
  var waveform = fft.waveform();
  noFill();
  beginShape();
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();
  text('click to play/pause', 4, 10);
}
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}var cnv, soundFile, fft, peakDetect;
var ellipseWidth = 10;
var h_ellipseWidth = -10;
function preload() {
  soundFile = loadSound('assets/Wavess_solo.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  fill(255);
  textAlign(CENTER);
  angleMode(DEGREES);
  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect(100, 200, .1);
 	h_peakDetect = new p5.PeakDetect(1500, 2500, .4);
}
function draw() {
  background(0);
  text('click to play/pause', width / 2, height / 2);
  fft.analyze();
  peakDetect.update(fft);
  h_peakDetect.update(fft);
  
    if ( h_peakDetect.isDetected ) {
    h_ellipseWidth = 180;
    
  } else {
    h_ellipseWidth *= .95;
  }
  fill(255,0,0);
arc(windowWidth/2,windowHeight/2 , 400, 400, 180, h_ellipseWidth, PI);
  
  
  if (peakDetect.isDetected) {
    ellipseWidth = 360;
  } else {
    ellipseWidth *= .95;
  }
  fill(255);
  arc(windowWidth / 2, windowHeight / 2, 400, 400, 180, ellipseWidth);
  
  
  
}
function mouseClicked() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (soundFile.isPlaying()) {
      soundFile.pause();
    } else {
      soundFile.play();
    }
  }
let mMic
let mNY;
let mTY0;
let mCity;
let weather;
function setup() {
  let mNY = 5128638
  let mTYO = 1850147
  let mCity = mNY
  angleMode(DEGREES);
  
  mic = new p5.AudioIn()
  mic.start();
  
  console.log(url);
  createCanvas(400, 400);
}
function errorMoo(error) {
  console.log(error);
  console.log(url);
}
function gotData(data) {
  console.log("here");
  console.log(data);
  weather = data;
}
function draw() {
  background(220);
    micLevel = mic.getLevel();
  arc(width / 2, height / 2, 400, 400, 0, micLevel*180);
  
  fill(255,50,50);
    
    
    console.log(degree);
  
  
  
  if (weather) {
    let testDegree = map(mouseX, 0, windowWidth, 180, 360);
    output = map(mouseX, 0, windowWidth, 0, 255);
    text(weather.wind.deg - 180, width / 2, height / 1.8);
    text('NY', width / 2, height / 1.7);
		
    
  }
}
let mThreshold
let mtargetColor = (255,0,0);
function reload(){
  
}
function setup() {
  createCanvas(640, 480);
  mVideo = createCapture(VIDEO);
  mVideo.size(width, height);
  mVideo.hide();
}
function draw() {
  background(220);
  image(mVideo, 0, 0)
  let allThatQualified = 0;
  let winningX = 0;
  let winningY = 0;
  for (let y = 0; y < mVideo.height; y++) {
    for (let x = 0; x < mVideo.width; x++) {
      let thisPixel = mVideo.get(x, y);
      let diffBetweenColors = dist(thisPixel[0],thisPixel[1],thisPixel[2],mtargetColor[0],mtargetColor[1],mtargetColor[2])
				if(diffBetweenColors < mThreshold);
      	winningX += x;
      	winningY += y;
      	allThatQualified++;
      	worldRecord = diffBetweenColors;
    }
  }
  
}
ellipse(winningX,winningY, 20, 20)
function mousePressed(){
  mtargetColor = get (mouseX, mouseY);
  
}function testSunCalc() {
  var sun = new SunCalc.SunCalc();
  var times = sun.getTimes(new Date(), 40.7484, 73.9857);
  Logger.log(JSON.stringify(times));
  Logger.log(times.sunrise.toLocaleString());
  Logger.log(times.sunset.toLocaleString());
  console.log(sun);
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  
let mNY;
let mTY0;
let mCity;
let weather;
function setup() {
  let mNY = 5128638
  let mTYO = 1850147
  let mCity = mNY
  angleMode(DEGREES);
  console.log(url);
  createCanvas(400, 400);
  loadJSON(url, gotData, errorMoo);
}
function errorMoo(error) {
  console.log(error);
  console.log(url);
}
function gotData(data) {
  console.log("here");
  console.log(data);
  weather = data;
}
function draw() {
  background(220);
  if (weather) {
    let testDegree = map(mouseX, 0, windowWidth, 180, 360);
    output = map(mouseX, 0, windowWidth, 0, 255);
    var degree = map(output, 0, 255, 180, 360);
    arc(width / 2, height / 2, 400, 400, 180, weather.wind.deg, PIE);
    text(weather.wind.deg - 180, width / 2, height / 1.8);
    text('NY', width / 2, height / 1.7);
  }
}
var data = 0;
var fanSpeed
var fanAngle
var output;
var mjsonData
var sunrisePos = SunCalc.getPosition(times.sunrise, 51.5, -0.1);
function preload() {
  data = loadJSON('assets/package.json');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  
    
  var data = map(latestData, 0, 1023, 0, height);
  
  fanSpeed = 100;
  fanAngle = 90;
  
  
}
function gotData() {
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  if (arrayOfValues.length == 3) {
}
  
  
  
  
    if (currentString.length > 0){
    }
      
  
  
    
    
 
  output = map(mouseX,0,windowWidth,0,255);
  
  
  
  
}
function draw() {
  background(70, 200, 110);
  fill(0,0,0);
  var data = map(latestData, 0, 1023, 0, height);
  fill(random(data),0,random(data));
  var degree = map(output, 0, 255, 180, 360);
  
	fill(0);
  var testDegree = map (mouseX, 0, windowWidth, 180, 360);
  arc(width/2, height/2, 400, 400, 180, testDegree, PIE);
  text(degree-180, width/2, height/1.8);
   
  
}
  
  
  createCanvas(400, 400);
  loadJSON(url, gotData);
  
  
  
}
function draw() {
  background(220);
  console.log(gotData);
}
function gotData(data){
  
var data = 0;
var fanSpeed
var fanAngle
var output;
var autoplayfan;
var xtime;
var AngleTime;
var fanDirA;
var fanDirB;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(100);
  angleMode(DEGREES);
  var data = map(latestData, 0, 1023, 0, height);
  fanSpeed = 100;
  fanAngle = 90;
  autoplayfan = 1;
  xtime = 1;
  AngleTime = 1;
  fanDirA = 1;
  fanDirB = -0.5;
}
function gotData() {
  console.log(output);
  output = int(map(mouseX, 0, windowWidth, 0, 1023));
  
}
function draw() {
  xtime ++;
  AngleTime = (253 / fanDirA); 
  
  background(70, 200, 110);
  fill(0, 0, 0);
  var data = map(latestData, 0, 1023, 0, height);
  fill(random(data), 0, random(data));
  var degree = map(output, 0, 255, 280, 440);
  fill(0);
  arc(width / 2, height / 2, 400, 400, degree-90, -degree-90, PIE);
  text(degree - 180, width / 2, height / 1.8);
  
}
  
  
  
  
    
  
  
  
    
  createCanvas(400, 400);
  frameRate(1);
  
}
function draw() {
  background(0);
  
  for(w=1; w < width; w++){
  	for (let i=0;i<11;i=i+5){
    	rect(0, i, w, 3);
  }
  }
  
  
}var xArc
var moveArc
var PointFanX
var PointFanY
function setup() {
  createCanvas(800, 800);
  
  xArc = 1
 moveArc = 1
  
  
  
}
function draw() {
  background(220);
  moveArc = moveArc + (xArc+PI)
  
 triangle(moveArc, (height/2)-moveArc, width/2, height, 375, height/2);
  
  if
  
console.log(moveArc)
var data = 0;
var fanSpeed
var fanAngle
var output;
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  
    
  var data = map(latestData, 0, 1023, 0, height);
  
  fanSpeed = 100;
  fanAngle = 90;
  
  
}
function gotData() {
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  if (arrayOfValues.length == 3) {
}
  
  
  
  
    if (currentString.length > 0){
    }
      
  
  
    
    
 
  output = map(mouseX,0,windowWidth,0,255);
  
  
  
  
}
function draw() {
  background(70, 200, 110);
  fill(0,0,0);
  var data = map(latestData, 0, 1023, 0, height);
  fill(random(data),0,random(data));
  var degree = map(output, 0, 255, 180, 360);
  
	fill(0);
	arc(width/2, height/2, 400, 400, 180, degree, PIE);
  text(degree-180, width/2, height/1.8);
   
  
}
let BumbleBee;
let FlowerImage;
let FlowerGrow = [];
let FlowerSize = 150;
let data = 0;
function preload(){
  FlowerImage = loadImage('sakura.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  BumbleBee = new Bee();
  
  for (var i = 0; i < 8; i++) {
    FlowerGrow.push(new Flower(i));
    
  var data = map(latestData, 0, 1023, 0, height);
  }
  
}
function gotData() {
  var output = map(mouseX,0,width,0,255);
}
function draw() {
background(70, 200, 110);
  fill(0,0,0);
  var data = map(latestData, 0, 1023, 0, height);
  fill(random(data),0,random(data));
  text(data, 10, 10);
   
  BumbleBee.fly();
  for (var i = 0; i < FlowerGrow.length; i++)
    FlowerGrow[i].grow();
  
  
}
function mousePressed() {
  for (var i = FlowerGrow.length - 1; i > -1; i--) {
    if (FlowerGrow[i].imPregnant() < FlowerSize) {
      FlowerGrow.splice(i, 1);
      FlowerGrow.push(new Flower(i));
      FlowerGrow.push(new Flower(i));
      FlowerGrow.push(new Flower(i));
      
    }
  }
}
class Bee {
  constructor() {
    this.BeeWidth = 80;
    this.x = mouseX
    this.y = mouseY
    this.R = 240
    this.G = 210
    this.B = 0
    this.Xwing = 60
    this.Ywing = 30
    this.LwingPos = -70
    this.RwingPos = 70
    this.WingFlap = -10
  }
  fly() {
    this.RwingPos = this.RwingPos + this.WingFlap
    this.LwingPos = this.LwingPos - this.WingFlap
    this.Xwing = this.Xwing + this.WingFlap
    this.data = map(latestData, 0, 1023, 0, height);
    fill(this.R, this.G, this.B);
ellipse(this.x + mouseX, this.data, this.BeeWidth, 120);
    fill(0);
    rectMode(CENTER);
    rect(this.x + mouseX,this.data, this.BeeWidth - 3, 38);
    fill(255);
    ellipse((this.RwingPos) + this.x + mouseX, this.data, this.Xwing, this.Ywing);
    ellipse((this.LwingPos) + this.x + mouseX, this.data, this.Xwing, this.Ywing);
    if (this.RwingPos < 40) {
      this.WingFlap = this.WingFlap * -1;
    } else if (this.RwingPos > 60) {
      this.WingFlap = this.WingFlap * -1;
    }
  }
}
class Flower {
  constructor() {
    noStroke();
    this.x = random(width);
    this.y = random(height);
    this.R = 200;
    this.G = 10;
    this.B = 150;
  }
  grow() {
    imageMode(CENTER);
    image(FlowerImage, this.x, this. y, FlowerSize, FlowerSize);
  }
  imPregnant() {
    return dist(this.x, this.y, mouseX, mouseY);
  }
var tenData = [];
function setup() {
  createCanvas(500, 300);
 
 
  
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
function draw() {
  background(255,255,255);
  fill(0,0,0);
  var avData = 0;
  var totData = 0;
  for (var i = 0; i < tenData.length; i++) {
    totData = totData + tenData[i];
	}
  avData = totData/tenData.length;
  
  var data = map(avData, 0, 255, 0, height);
  ellipse(50, data, 50, 50);
  text(data, 10, 10);
}let BumbleBee;
let FlowerImage;
let FlowerGrow = [];
let FlowerSize = 150;
function preload(){
  FlowerImage = loadImage('sakura.png');
}
  
function setup() {
  createCanvas(windowWidth, windowHeight);
  BumbleBee = new Bee();
  for (var i = 0; i < 8; i++) {
    FlowerGrow.push(new Flower(i));
  }
}
function draw() {
  background(70, 200, 110);
  BumbleBee.fly();
  for (var i = 0; i < FlowerGrow.length; i++)
    FlowerGrow[i].grow();
}
function mousePressed() {
  for (var i = FlowerGrow.length - 1; i > -1; i--) {
    if (FlowerGrow[i].imPregnant() < FlowerSize) {
      FlowerGrow.splice(i, 1);
      FlowerGrow.push(new Flower(i));
      FlowerGrow.push(new Flower(i));
      FlowerGrow.push(new Flower(i));
    
  }
  }
}
class Bee {
  constructor() {
    this.BeeWidth = 80;
    this.x = mouseX
    this.y = mouseY
    this.R = 240
    this.G = 210
    this.B = 0
    this.Xwing = 60
    this.Ywing = 30
    this.LwingPos = -70
    this.RwingPos = 70
    this.WingFlap = -10
  }
  fly() {
    this.RwingPos = this.RwingPos + this.WingFlap
    this.LwingPos = this.LwingPos - this.WingFlap
    this.Xwing = this.Xwing + this.WingFlap
    fill(this.R, this.G, this.B);
    ellipse(this.x + mouseX, this.y + mouseY, this.BeeWidth, 120);
    fill(0);
    rectMode(CENTER);
    rect(this.x + mouseX, this.y + mouseY, this.BeeWidth - 3, 38);
    fill(255);
    ellipse((this.RwingPos) + this.x + mouseX, this.y + mouseY, this.Xwing, this.Ywing);
    ellipse((this.LwingPos) + this.x + mouseX, this.y + mouseY, this.Xwing, this.Ywing);
    if (this.RwingPos < 40) {
      this.WingFlap = this.WingFlap * -1;
    } else if (this.RwingPos > 60) {
      this.WingFlap = this.WingFlap * -1;
    }
  }
}
class Flower {
  constructor() {
    noStroke();
    this.x = random(width);
    this.y = random(height);
    this.R = 200;
    this.G = 10;
    this.B = 150;
  }
  grow() {
    imageMode(CENTER);
    image(FlowerImage, this.x, this. y, FlowerSize, FlowerSize);
  }
  imPregnant() {
    return dist(this.x, this.y, mouseX, mouseY);
  }
let myCircles = [ ];
function setup() {
  createCanvas(400, 400);
  for(var i = 0; i < 1000; i++){
  myCircles.push(new Circle());
  }
}
function draw() {
    for(var i = 0; i < 100; i++){
      myCircles[i].displayIt();
}
}
class Circle {
  
 constructor(){
   this.radius = random(20);
   this.x = random (width)
   this.y = random(height)
   
   
   
   
 }
  
  displayIt(){
    ellipse(this.x,this.y,this.radius,this.radius)
     this.x += random(-2,2);
    this.y += random(-2,2);
  }
  
}let ButtonDelay;
let Delay;
let Noise;
let Env;
let slider;
function setup() {
  createCanvas(400, 400);
  
  SliderThing();
  IncreaseBrightness();
  
  
  
}
 function draw() {
  
}
  
  
  function IncreaseBrightness(){
    
    var val = slider.value();
  background(val);
  }
  
function SliderThing(){
  slider = createSlider(0,200, 10)
 slider.position(200,200)
  slider.style('width', '150px');
 slider.changed(IncreaseBrightness)
}
function DelayButton(){
  
  ButtonDelay = createButton("Delay");
  ButtonDelay.position(200,380) 
  ButtonDelay.mousePressed(DelayButton);
  
  
}
  
  
  
  
  
let GREEN
let BLUE
let RED
let x_motion
let y_motion
let FillRedRandom
let FillBlueRandom
let FillGreenRandom
let noise
let env
let delay
function preload() {
  soundFormats('mp3');
  mySound = loadSound('assets/relax_cut.mp3');
}
function setup() {
  createCanvas(400, 400, WEBGL);
  frameRate(20);
  ellipseMode(CENTER);
  rectMode(CENTER);
  x_motion = 0
  y_motion = 0
  xtime = 1
  GREEN = 80
  BLUE = 150
  angle = PI
  RED = 0
  FillRedRandom = random(50)
  FillGreenRandom = random(50)
  FillBlueRandom = random(50)
}
function draw() {
background(RED, GREEN, BLUE);
  xtime = xtime + 1
  y_motion = mouseY - 200
  x_motion = mouseX - 200
  fish_turnaround();
  background_grad();
  fish_touch_sand();
  
  noStroke();
  function fish_turnaround() {
    xtime = xtime + 1
    y_motion = mouseY - 200
    x_motion = mouseX - 200
    if (x_motion >= 160) {
      fill(BLUE, RED, GREEN)
      rotateY(angle);
      ellipse(x_motion, y_motion, 60, 30);
      angle = angle + PI / 6;
      console.log(angle)
    } else if (x_motion <= -160) {
      rotateX(angle);
      ellipse(x_motion, y_motion, 60, 30);
      ellipse(y_motion, x_motion, 80, 50)
      angle = angle + PI / 6;
    } else {
      ellipse(x_motion, y_motion, 60, 30);
      angle = PI
    }
  }
  function background_grad() {
    xtime = xtime + 1
    if (xtime > 0 && xtime <= 50) {
      GREEN++
    } else if (xtime > 50 && xtime <= 100) {
      GREEN--
      BLUE++
    } else if (xtime > 100 && xtime <= 150) {
      GREEN++
      BLUE--
    } else if (xtime > 150 && xtime <= 200) {
      GREEN--
    } else {
      xtime = 1;
      GREEN = 80
      BLUE = 150
    }
  }
  function fish_touch_sand() {
    xtime = xtime + 1
    y_motion = mouseY - 200
    x_motion = mouseX - 200
    if (y_motion > 137) {
      RED++
      fill(BLUE, GREEN, RED)
      ellipse(x_motion, y_motion, 60, 30);
      rotateY(angle);
      angle = angle + PI / 6;
    } else if (y_motion <= 137) {
      RED--
      rect(-100, 200, 800, 100)
      rotateX(angle);
      ellipse(x_motion, y_motion, 60, 30);
      ellipse(y_motion, x_motion, 80, 50)
      angle = angle + PI / 6;
      mySound.stop();
    } else {
      RED = 0
      rect(-100, 200, 800, 100)
    }
    if (RED >= 180) {
      RED--
      fill(BLUE, GREEN, RED);
      ellipse(0, 0, 200, 200);
      mySound.setVolume(0.1);
      mySound.play();
    } else if (RED <= 0) {
      RED++
    }
  }
}let x;
let direction;
let y_direction;
let speed;
let y;
function setup() {
  createCanvas(400, 400);
  frameRate(80)
  x = width / 2
  y = width / 2
  direction = 1
  y_direction = 1
  speed = 2;
}
function draw() {
  background(220);
for (var i = 0; i <width; i = i + 30){
  if (x > i && x < 100 && y > 0 && y < 100) {
    fill(255)
    
  } else {
    fill(0, 255, 0)
  }
}
  
  rect(0, 0, 100, 100)
  fill(50, 80, 30)
  ellipse(x, y, 20, 20);
  y = y + y_direction * 3;
  x = x + direction * 3;
  if (x > 400) {
    direction = -3
  }
  if (x < 0) {
    direction = 1
  }
  if (y > 400) {
    y_direction = -3
  }
  if (y < 0) {
    y_direction = 3
  }
}var i
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  
  
  for (var i = 0; i < 10; i++)
  
  
  
  
}let xy_half_page
let r_colorize
let g_colorize
let b_colorize
let speed
function setup() {
  createCanvas(400, 400, WEBGL);
      frameRate(50);
}
function draw() {
  background(220);
  rect(CENTER)
  r_colorize = 50
  
  
  
  
  
  colorize = colorize + random (50)
  xy_half_page = width/2
  
  
  
  }
function draw() {
  xy_half_page = width/2
  
  background(200);
  r_colorize =  1
  fill(r_colorize, 50, 50)
  box(xy_half_page);
  
  
  console.log(r_colorize)
  
  
  
  
   
  
  
}let x_color_change;
let y_go_down;
let y_go_up;
let y_go_down_even_faster;
let y_slow;
let a_unpredictable;
let b_unpredictable;
let c_unpredictable;
let x_go_up_too;
let x_go_left;
let x_do_something;
function setup() {
  createCanvas(600, 600, WEBGL);
  fr = 5;
      frameRate(fr);
	x_color_change = 1;
	a_unpredictable = 20;
  x_do_something = 1
  x_go_up_too = 1
  x_go_left = 1
  angle = PI;
}
function draw() {
	y_go_down_even_faster = y_go_down_even_faster + 3
	y_go_up = y_go_up - 2
	y_go_down ++
	y_slow = y_slow + 0.7
  x_do_something = width/2
  x_color_change ++
  x_go_up_too = x_go_up_too + 2
  x_go_left --
  a_unpredictable = random (100)
  b_unpredictable = random (30)
  c_unpredictable = random (60)
  
		noStroke();
	fill(40,mouseX, mouseY);
  
  
  
  
  rotateZ(angle);
  ellipse(b_unpredictable, 0, 30, 30);
  angle = angle + 2 * PI / b_unpredictable;
  ellipse(100, 100, 30, b_unpredictable);
  
  rotateZ(angle);
  ellipse(b_unpredictable, a_unpredictable, 30, 30);
  angle = angle + 2 * PI / b_unpredictable;
  ellipse(100, 100, a_unpredictable, b_unpredictable);
  
  
  rotateZ(angle);
  rect(b_unpredictable, a_unpredictable, b_unpredictable, a_unpredictable);
  angle = angle + 4 * PI / b_unpredictable;
  rect(a_unpredictable, b_unpredictable, a_unpredictable, b_unpredictable);
  
   rotateZ(angle);
  rect(b_unpredictable, a_unpredictable, b_unpredictable, a_unpredictable);
  angle = angle + 10 * PI / b_unpredictable;
  rect(a_unpredictable, b_unpredictable, a_unpredictable, b_unpredictable);
  
  
  
  
}
  
function mouseDragged(){
	x_color_change ++
	noStroke();
	fill(x_color_change,0,0);
	ellipse(x_color_change, a_unpredictable, 40, 40)
	
}
function mousePressed(){
	
	x_color_change ++
	noStroke();
	fill(x_color_change,0,0);
	ellipse(x_color_change, b_unpredictable, 40, a_unpredictable)
	
  if (b_unpredictable >400){
    
  }
	
	
}function setup() {
	createCanvas(400, 400);
}
function draw() {
	background(150, 150, 200);
 noStroke();
colorMode(RGB, 255);
for (var i = 0; i < 400; i++) {
  for (var j = 0; j < 200; j++) {
   stroke(i, j, 0);
   point(i, j);
}
}
	var c = color(0)
  stroke(1);
  strokeWeight(3);
	rectMode(CENTER)
	rect(200, 200, 60, 50);
  line(150, 150 , 50, 50 )
  line(150, 150 , 50, 300 )
  line(250, 150 , 350, 50 )
  line(250, 150 , 350, 300 )
  
  ellipseMode(CENTER)
  arc(200, 300, 280, 80, 0, PI, PIE);
  
noFill();
  stroke(250,250,50)
curve(325, 325, 250, 200, 350, 215, 215, 15);
  curve(75, 75, 150, 200, 50, 185, 185, 385)
  
  point(190, 200)
  point(210, 200)
  
  quad(190, 200, 210, 200, 210, 220, 190, 220);
	
	c = color(255);
  fill(1);
  stroke(0)
	triangle(100, 25, 150, 50, 40, 40);
  
  triangle(300, 25, 250, 50, 360, 40);
  
		fill(c);
		ellipse(100, 100, 100, 40);
		c = color(0)
		fill(c);
		ellipse(100, 100, 50, 40);
		c = color (255)
		fill (c)
		ellipse(300, 100, 100, 40);
		c = color(0);
		
		fill(c);
		ellipse(300, 100, 50, 40);
}