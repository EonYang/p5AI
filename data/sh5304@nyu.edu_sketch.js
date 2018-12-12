var portName = '/dev/cu.usbmodem145201';
var threshold = 1023; // Use the same sensor threshold value in Arduino

var phoneOn = false;
var guys = [];
var time = 0;
var inData;
var serial;
var bgTransition = 0;
var img;

function preload() {
  soundFormats('mp3', 'ogg');
  m1 = loadSound('minions1.mp3');
  m2 = loadSound('music2.mp3');
  img = loadImage('drop.png');
}

function setup() {
  

  serial = new p5.SerialPort();
  serial.on('data', serialEvent);
  serial.open(portName);

  // 颜色可调
  backgroundColorOff = 255;
  backgroundColorOn = 0;
  guysColorOff = 0;//小人黑色
	guysColorOn = 255;
  auraColorOff = color(219, 35, 89);//光环红色
  auraColorOn = color(110,17, 257);//光环蓝色
  phoneColor = 255;
  phoneHomeButtonColor = color(223, 94, 258);
  borderColorOff = color(223, 94, 258);//边框紫色
  borderColorOn = color(207, 227, 253);//边框白色
  //ButtonboarderColor=255;
  phoneX = 570; //手机位置
  phoneY = 80;
  phoneW = 350;
  phoneH = 160;

  // new Guy(index, x位置, Y位置不能一样, 小人大小, 光环大小, 小人底色黑色)
  guy0 = new Guy(0, 400, 190, 110, 300);
  guy1 = new Guy(1, 520, 375, 110, 300);
  guy2 = new Guy(2, 750, 550, 110, 300);
  guy3 = new Guy(3, 970, 374.9, 110, 300);
  guy4 = new Guy(4, 1100, 190, 110, 300);

  guys[0] = guy0;
  guys[1] = guy1;
  guys[2] = guy2;
  guys[3] = guy3;
  guys[4] = guy4;
  for (var i = 5; i < 10; i++) {
    guy = new Guy(i, phoneX + phoneW / 2, phoneY + phoneH / 2);
    guys[i] = guy;
  }

  pixelDensity(1.0);
  createCanvas(2000, 2000);
}

function serialEvent() {
  inData = Number(serial.read());
  if (inData == threshold) {
    phoneOn = true;
    // m1.setVolume(0.1);
    // m1.play();
    // m1.loop();
  } else {
    phoneOn = false;
    // m2.setVolume(0.1);
    // m2.play();
    // m2.loop();
  }
  print(inData);
}

// debug use only
function mousePressed() {
  if(phoneOn){
    phoneOn=false;
    m2.stop();
    m1.setVolume(0.1);
    m1.play();
    m1.loop();
  }else{
    phoneOn=true;
    m1.stop();
    m2.setVolume(0.1);
    m2.play();
    m2.loop();
  }
    
    
  
// if (!phoneOn) {
// m1.setVolume(0.1);
//   m1.play();
//     m1.loop();
//     } else {  
// 			m2.setVolume(0.1);
//      m2.play();
// 		m2.loop();
//     }
  
}

function draw() {
  time++;
  normTime = time / 40 % (2 * PI);

  if (!phoneOn) {
    bgTransition = lerp (bgTransition, backgroundColorOff, 0.05);//off background change speed 
	} else {
    bgTransition = lerp (bgTransition, backgroundColorOn, 0.05);//on background change speed
  }
  background(bgTransition);

  if (!phoneOn) {
    for (var i = 0; i < 5; i++) {
      guys[i].displayBubble();
    }
    for (var i = 0; i < 5; i++) {
      guys[i].display();
    }
  } else {
    for (var i = 0; i < 10; i++) {
      guys[i].displayBubble();
    }
    for (var i = 0; i < 10; i++) {
      guys[i].display();
    }
  }

  // 画手机
  if (!phoneOn) {
    stroke(borderColorOff);
  } else {
    stroke(borderColorOn);
  }
  strokeWeight(5);
  fill(phoneColor);
  rect(phoneX, phoneY, phoneW, phoneH, 20);
  if (!phoneOn) {
    image(img, 620, 150);
    // push();
    // rotate(2*PI);
    // // translate(640,150);
    // textSize(22);
    // text('drop your phone here', 640, 150);
    // pop();
    //fill(0, 102, 153);
    // stroke(ButtonboarderColor);
    // strokeWeight(3);
    // fill(phoneHomeButtonColor);
    // ellipse(phoneX + phoneW / 7, phoneY + phoneH / 2, 20);
  }

  // loadPixels();
  // for (var x = 0; x < width; x++) {
  //   for (var y = 0; y < height; y++) {
  //     var index = x + y * width;
  //     var R = 0;
  //     var G = 0;
  //     var B = 0;
  //     for (var g = 0; g < 5; g++) {
  //       var d = dist(x, y, guys[g].bubble.x, guys[g].bubble.y);
  //       R += 100 * guys[g].color.r / d;
  //       G += 100 * guys[g].color.g / d;
  //       B += 100 * guys[g].color.b / d;
  //     }
  //     pixels[index] = color(R, G, B);
  //   }
  // }
  // updatePixels();
}

class Guy {

  constructor(i, x, y, s, as) {
    this.index = i;
    this.x = x;
    this.y = y;
    this.size = s;
    this.auraSize = as;
    this.hasBubble = false;
    this.bubble = null;
    this.auras = [];
  }

  //画小人
  display() {
    strokeWeight(5);
    if (!phoneOn) {
      stroke(borderColorOff);
    } else {
      stroke(borderColorOn);
    }
    if (!phoneOn) {
      fill(guysColorOff);
      ellipse(this.x, this.y, this.size);
    } else {
      fill(guysColorOn);
      ellipse(this.x, this.y, this.size);
    }
    
  }

  //画BUBBLE
  displayBubble() {

    if (!phoneOn) {
      var randomTarget = random([0, 1, 2, 3, 4]);
      while (randomTarget == this.index) {
        randomTarget = random([0, 1, 2, 3, 4]);
      }
      if (!this.hasBubble) {
        this.bubble = new Bubble(20,//小球大小
          this.index,
          randomTarget,
          random(1, 5),
          time);
        this.hasBubble = true;

        this.addAura(0, this.x, this.y, this.auraSize, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]);
        setTimeout(this.addAura(1, this.x, this.y, this.auraSize * 1.25, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]), 0.1);
        setTimeout(this.addAura(2, this.x, this.y, this.auraSize * 1.5, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]), 0.2);
      }//光环大小
      
    } else {
      var randomTargetGuys = random([0, 1, 2, 3, 4]);
      while (randomTargetGuys == this.index) {
        randomTargetGuys = random([0, 1, 2, 3, 4]);
      }
      var randomTargetPhone = random([5, 6, 7, 8, 9]);
      while (randomTargetPhone == this.index) {
        randomTargetPhone = random([5, 6, 7, 8, 9]);
      }
      if (!this.hasBubble) {
        if (this.index < 5) {
          this.bubble = new Bubble(20,//小球大小
            this.index,
            randomTargetPhone,
            random(1, 5),
            time);
          this.hasBubble = true;
        } else {
          this.bubble = new Bubble(20,//小球大小
            this.index,
            randomTargetGuys,
            random(1, 5),
            time);
          this.hasBubble = true;
        }
        this.addAura(0, this.x, this.y, this.auraSize, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]);
        setTimeout(this.addAura(1, this.x, this.y, this.auraSize * 1.25, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]), 0.1);
        setTimeout(this.addAura(2, this.x, this.y, this.auraSize * 1.5, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]), 0.2);
      }//光环大小 在最开始调节
    }

    this.bubble.display();

    for (var i = 0; i < this.auras.length; i++) {
      if (this.auras[i].currentPhaseTime < 0.6* PI) {
        this.auras[i].display();
      } else {
        this.auras.splice(i, 1);
        i--;
      }
    }
  }

  addAura(i, x, y, s, r, g, b) {
    var newAura = new Aura(x, y, s, r, g, b);
    this.auras[i] = newAura;
  }
}

class Aura {

  constructor(x, y, s, r, g, b) {
    this.x = x;
    this.y = y;
    this.size = s;
    this.r = r;
    this.g = g;
    this.b = b;
    this.startTime = normTime;
    this.currentPhaseTime = normTime;
  }

  display() {
    this.currentPhaseTime = normTime - this.startTime;
    if (this.currentPhaseTime < 0.5 * PI) {
      noStroke();
      var transColor = color(this.r, this.g, this.b, 255 * (1 + sin(this.currentPhaseTime + PI)));
      fill(transColor);
      ellipse(this.x, this.y, this.size * sin(this.currentPhaseTime));
    }
  }
}

class Bubble {

  constructor(s, si, ei, sp, t) {
    this.size = s;
    this.startGuyIndex = si;
    this.endGuyIndex = ei;
    this.speed = sp;
    this.initTime = t;
    this.vibration = random (0, 1); //0;泡泡振动 

    var targetDistance = dist(guys[this.startGuyIndex].x,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].x,
      guys[this.endGuyIndex].y);
    this.speedX = (guys[this.endGuyIndex].x - guys[this.startGuyIndex].x) / targetDistance;
    this.speedY = (guys[this.endGuyIndex].y - guys[this.startGuyIndex].y) / targetDistance;

    this.x = 0;
    this.y = 0;
    this.particle = null;
  }

  display() {

    noStroke();
    if (!phoneOn) {
      fill(borderColorOff);
    } else {
      fill(borderColorOn);
    }
    var targetTime = dist(guys[this.startGuyIndex].x,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].x,
      guys[this.endGuyIndex].y) / this.speed;
    this.x = map(time - this.initTime,
      0,
      targetTime,
      guys[this.startGuyIndex].x,
      guys[this.endGuyIndex].x) + 5 * sin(time * this.vibration);
    this.y = map(time - this.initTime,
      0,
      targetTime,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].y) + 5 * sin(time * this.vibration);
    // this.particle = new ParticleSystem(createVector(this.x, this.y), 
    //   																 createVector(this.speedX, this.speedY));
    // this.particle.addParticle();
    // this.particle.run();
    ellipse(this.x, this.y, this.size);
    var distance = dist(this.x, this.y, guys[this.endGuyIndex].x, guys[this.endGuyIndex].y);
    if (distance < this.size) {
      guys[this.startGuyIndex].hasBubble = false;
    }
  }
}

var portName = '/dev/cu.usbmodem145201';
var threshold = 1023; // Use the same sensor threshold value in Arduino

var phoneOn = false;
var guys = [];
var time = 0;
var inData;
var serial;
var bgTransition = 0;

function preload() {
  soundFormats('mp3', 'ogg');
  m1 = loadSound('minions1.mp3');
  m2 = loadSound('music2.mp3');
  
}

function setup() {
  

  serial = new p5.SerialPort();
  serial.on('data', serialEvent);
  serial.open(portName);

  // 颜色可调
  backgroundColorOff = 255;
  backgroundColorOn = 0;
  guysColorOff = 0;//小人黑色
	guysColorOn = 255;
  auraColorOff = color(219, 35, 89);//光环红色
  auraColorOn = color(110,17, 257);//光环蓝色
  phoneColor = 0;
  phoneHomeButtonColor = color(223, 94, 258);
  borderColorOff = color(223, 94, 258);//边框紫色
  borderColorOn = color(207, 227, 253);//边框白色
  ButtonboarderColor=255;
  phoneX = 600; //手机位置
  phoneY = 3;
  phoneW = 280;
  phoneH = 120;

  // new Guy(index, x位置, Y位置不能一样, 小人大小, 光环大小, 小人底色黑色)
  guy0 = new Guy(0, 350, 150, 130, 300);
  guy1 = new Guy(1, 520, 375, 130, 300);
  guy2 = new Guy(2, 750, 550, 130, 300);
  guy3 = new Guy(3, 970, 374.9, 130, 300);
  guy4 = new Guy(4, 1150, 149.9, 130, 300);

  guys[0] = guy0;
  guys[1] = guy1;
  guys[2] = guy2;
  guys[3] = guy3;
  guys[4] = guy4;
  for (var i = 5; i < 10; i++) {
    guy = new Guy(i, phoneX + phoneW / 2, phoneY + phoneH / 2);
    guys[i] = guy;
  }

  pixelDensity(1.0);
  createCanvas(2000, 2000);
}

function serialEvent() {
  inData = Number(serial.read());
  if (inData == threshold) {
    phoneOn = true;
    // m1.setVolume(0.1);
    // m1.play();
    // m1.loop();
  } else {
    phoneOn = false;
    // m2.setVolume(0.1);
    // m2.play();
    // m2.loop();
  }
  print(inData);
}

// debug use only
function mousePressed() {
  if(phoneOn){
    phoneOn=false;
    m2.stop();
    m1.setVolume(0.1);
    m1.play();
    m1.loop();
  }else{
    phoneOn=true;
    m1.stop();
    m2.setVolume(0.1);
    m2.play();
    m2.loop();
  }
    
    
  
// if (!phoneOn) {
// m1.setVolume(0.1);
//   m1.play();
//     m1.loop();
//     } else {  
// 			m2.setVolume(0.1);
//      m2.play();
// 		m2.loop();
//     }
  
}

function draw() {
  time++;
  normTime = time / 40 % (2 * PI);

  if (!phoneOn) {
    bgTransition = lerp (bgTransition, backgroundColorOff, 0.05);//off background change speed 
	} else {
    bgTransition = lerp (bgTransition, backgroundColorOn, 0.05);//on background change speed
  }
  background(bgTransition);

  if (!phoneOn) {
    for (var i = 0; i < 5; i++) {
      guys[i].displayBubble();
    }
    for (var i = 0; i < 5; i++) {
      guys[i].display();
    }
  } else {
    for (var i = 0; i < 10; i++) {
      guys[i].displayBubble();
    }
    for (var i = 0; i < 10; i++) {
      guys[i].display();
    }
  }

  // 画手机
  if (!phoneOn) {
    stroke(borderColorOff);
  } else {
    stroke(borderColorOn);
  }
  strokeWeight(5);
  fill(phoneColor);
  rect(phoneX, phoneY, phoneW, phoneH, 20);
  if (!phoneOn) {
    stroke(ButtonboarderColor);
    strokeWeight(3);
    fill(phoneHomeButtonColor);
    ellipse(phoneX + phoneW / 7, phoneY + phoneH / 2, 20);
  }

  // loadPixels();
  // for (var x = 0; x < width; x++) {
  //   for (var y = 0; y < height; y++) {
  //     var index = x + y * width;
  //     var R = 0;
  //     var G = 0;
  //     var B = 0;
  //     for (var g = 0; g < 5; g++) {
  //       var d = dist(x, y, guys[g].bubble.x, guys[g].bubble.y);
  //       R += 100 * guys[g].color.r / d;
  //       G += 100 * guys[g].color.g / d;
  //       B += 100 * guys[g].color.b / d;
  //     }
  //     pixels[index] = color(R, G, B);
  //   }
  // }
  // updatePixels();
}

class Guy {

  constructor(i, x, y, s, as) {
    this.index = i;
    this.x = x;
    this.y = y;
    this.size = s;
    this.auraSize = as;
    this.hasBubble = false;
    this.bubble = null;
    this.auras = [];
  }

  //画小人
  display() {
    strokeWeight(5);
    if (!phoneOn) {
      stroke(borderColorOff);
    } else {
      stroke(borderColorOn);
    }
    if (!phoneOn) {
      fill(guysColorOff);
      ellipse(this.x, this.y, this.size);
    } else {
      fill(guysColorOn);
      ellipse(this.x, this.y, this.size);
    }
    
  }

  //画BUBBLE
  displayBubble() {

    if (!phoneOn) {
      var randomTarget = random([0, 1, 2, 3, 4]);
      while (randomTarget == this.index) {
        randomTarget = random([0, 1, 2, 3, 4]);
      }
      if (!this.hasBubble) {
        this.bubble = new Bubble(20,//小球大小
          this.index,
          randomTarget,
          random(1, 5),
          time);
        this.hasBubble = true;

        this.addAura(0, this.x, this.y, this.auraSize, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]);
        setTimeout(this.addAura(1, this.x, this.y, this.auraSize * 1.25, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]), 0.1);
        setTimeout(this.addAura(2, this.x, this.y, this.auraSize * 1.5, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]), 0.2);
      }//光环大小
      
    } else {
      var randomTargetGuys = random([0, 1, 2, 3, 4]);
      while (randomTargetGuys == this.index) {
        randomTargetGuys = random([0, 1, 2, 3, 4]);
      }
      var randomTargetPhone = random([5, 6, 7, 8, 9]);
      while (randomTargetPhone == this.index) {
        randomTargetPhone = random([5, 6, 7, 8, 9]);
      }
      if (!this.hasBubble) {
        if (this.index < 5) {
          this.bubble = new Bubble(20,//小球大小
            this.index,
            randomTargetPhone,
            random(1, 5),
            time);
          this.hasBubble = true;
        } else {
          this.bubble = new Bubble(20,//小球大小
            this.index,
            randomTargetGuys,
            random(1, 5),
            time);
          this.hasBubble = true;
        }
        this.addAura(0, this.x, this.y, this.auraSize, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]);
        setTimeout(this.addAura(1, this.x, this.y, this.auraSize * 1.25, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]), 0.1);
        setTimeout(this.addAura(2, this.x, this.y, this.auraSize * 1.5, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]), 0.2);
      }//光环大小 在最开始调节
    }

    this.bubble.display();

    for (var i = 0; i < this.auras.length; i++) {
      if (this.auras[i].currentPhaseTime < 0.6* PI) {
        this.auras[i].display();
      } else {
        this.auras.splice(i, 1);
        i--;
      }
    }
  }

  addAura(i, x, y, s, r, g, b) {
    var newAura = new Aura(x, y, s, r, g, b);
    this.auras[i] = newAura;
  }
}

class Aura {

  constructor(x, y, s, r, g, b) {
    this.x = x;
    this.y = y;
    this.size = s;
    this.r = r;
    this.g = g;
    this.b = b;
    this.startTime = normTime;
    this.currentPhaseTime = normTime;
  }

  display() {
    this.currentPhaseTime = normTime - this.startTime;
    if (this.currentPhaseTime < 0.5 * PI) {
      noStroke();
      var transColor = color(this.r, this.g, this.b, 255 * (1 + sin(this.currentPhaseTime + PI)));
      fill(transColor);
      ellipse(this.x, this.y, this.size * sin(this.currentPhaseTime));
    }
  }
}

class Bubble {

  constructor(s, si, ei, sp, t) {
    this.size = s;
    this.startGuyIndex = si;
    this.endGuyIndex = ei;
    this.speed = sp;
    this.initTime = t;
    this.vibration = random (0, 1); //0;泡泡振动 

    var targetDistance = dist(guys[this.startGuyIndex].x,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].x,
      guys[this.endGuyIndex].y);
    this.speedX = (guys[this.endGuyIndex].x - guys[this.startGuyIndex].x) / targetDistance;
    this.speedY = (guys[this.endGuyIndex].y - guys[this.startGuyIndex].y) / targetDistance;

    this.x = 0;
    this.y = 0;
    this.particle = null;
  }

  display() {

    noStroke();
    if (!phoneOn) {
      fill(borderColorOff);
    } else {
      fill(borderColorOn);
    }
    var targetTime = dist(guys[this.startGuyIndex].x,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].x,
      guys[this.endGuyIndex].y) / this.speed;
    this.x = map(time - this.initTime,
      0,
      targetTime,
      guys[this.startGuyIndex].x,
      guys[this.endGuyIndex].x) + 5 * sin(time * this.vibration);
    this.y = map(time - this.initTime,
      0,
      targetTime,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].y) + 5 * sin(time * this.vibration);
    // this.particle = new ParticleSystem(createVector(this.x, this.y), 
    //   																 createVector(this.speedX, this.speedY));
    // this.particle.addParticle();
    // this.particle.run();
    ellipse(this.x, this.y, this.size);
    var distance = dist(this.x, this.y, guys[this.endGuyIndex].x, guys[this.endGuyIndex].y);
    if (distance < this.size) {
      guys[this.startGuyIndex].hasBubble = false;
    }
  }
}

var portName = '/dev/cu.usbmodem145201';
var threshold = 1023; // Use the same sensor threshold value in Arduino

var phoneOn = false;
var guys = [];
var time = 0;
var inData;
var serial;
var bgTransition = 0;

function preload() {
  soundFormats('mp3', 'ogg');
  m1 = loadSound('minions1.mp3');
  m2 = loadSound('music2.mp3');
  
}

function setup() {
  

  serial = new p5.SerialPort();
  serial.on('data', serialEvent);
  serial.open(portName);

  // 颜色可调
  backgroundColorOff = 255;
  backgroundColorOn = 0;
  guysColorOff = 0;//小人黑色
	guysColorOn = 255;
  auraColorOff = color(219, 35, 89);//光环红色
  auraColorOn = color(110,17, 257);//光环蓝色
  phoneColor = 255;
  phoneHomeButtonColor = color(223, 94, 258);
  borderColorOff = color(223, 94, 258);//边框紫色
  borderColorOn = color(207, 227, 253);//边框白色
  //ButtonboarderColor=255;
  phoneX = 570; //手机位置
  phoneY = 80;
  phoneW = 360;
  phoneH = 160;

  // new Guy(index, x位置, Y位置不能一样, 小人大小, 光环大小, 小人底色黑色)
  guy0 = new Guy(0, 390, 190, 130, 300);
  guy1 = new Guy(1, 520, 375, 130, 300);
  guy2 = new Guy(2, 750, 550, 130, 300);
  guy3 = new Guy(3, 970, 374.9, 130, 300);
  guy4 = new Guy(4, 1100, 190, 130, 300);

  guys[0] = guy0;
  guys[1] = guy1;
  guys[2] = guy2;
  guys[3] = guy3;
  guys[4] = guy4;
  for (var i = 5; i < 10; i++) {
    guy = new Guy(i, phoneX + phoneW / 2, phoneY + phoneH / 2);
    guys[i] = guy;
  }

  pixelDensity(1.0);
  createCanvas(2000, 2000);
}

function serialEvent() {
  inData = Number(serial.read());
  if (inData == threshold) {
    phoneOn = true;
    // m1.setVolume(0.1);
    // m1.play();
    // m1.loop();
  } else {
    phoneOn = false;
    // m2.setVolume(0.1);
    // m2.play();
    // m2.loop();
  }
  print(inData);
}

// debug use only
function mousePressed() {
  if(phoneOn){
    phoneOn=false;
    m2.stop();
    m1.setVolume(0.1);
    m1.play();
    m1.loop();
  }else{
    phoneOn=true;
    m1.stop();
    m2.setVolume(0.1);
    m2.play();
    m2.loop();
  }
    
    
  
// if (!phoneOn) {
// m1.setVolume(0.1);
//   m1.play();
//     m1.loop();
//     } else {  
// 			m2.setVolume(0.1);
//      m2.play();
// 		m2.loop();
//     }
  
}

function draw() {
  time++;
  normTime = time / 40 % (2 * PI);

  if (!phoneOn) {
    bgTransition = lerp (bgTransition, backgroundColorOff, 0.05);//off background change speed 
	} else {
    bgTransition = lerp (bgTransition, backgroundColorOn, 0.05);//on background change speed
  }
  background(bgTransition);

  if (!phoneOn) {
    for (var i = 0; i < 5; i++) {
      guys[i].displayBubble();
    }
    for (var i = 0; i < 5; i++) {
      guys[i].display();
    }
  } else {
    for (var i = 0; i < 10; i++) {
      guys[i].displayBubble();
    }
    for (var i = 0; i < 10; i++) {
      guys[i].display();
    }
  }

  // 画手机
  if (!phoneOn) {
    stroke(borderColorOff);
  } else {
    stroke(borderColorOn);
  }
  strokeWeight(5);
  fill(phoneColor);
  rect(phoneX, phoneY, phoneW, phoneH, 20);
  if (!phoneOn) {
    //fill(0,20,50);
    //stroke(0,100,30);
    push();
    rotate(2*PI);
    // translate(640,150);
    textSize(22);
    text('drop your phone here', 640, 150);
    pop();
    //fill(0, 102, 153);
    // stroke(ButtonboarderColor);
    // strokeWeight(3);
    // fill(phoneHomeButtonColor);
    // ellipse(phoneX + phoneW / 7, phoneY + phoneH / 2, 20);
  }

  // loadPixels();
  // for (var x = 0; x < width; x++) {
  //   for (var y = 0; y < height; y++) {
  //     var index = x + y * width;
  //     var R = 0;
  //     var G = 0;
  //     var B = 0;
  //     for (var g = 0; g < 5; g++) {
  //       var d = dist(x, y, guys[g].bubble.x, guys[g].bubble.y);
  //       R += 100 * guys[g].color.r / d;
  //       G += 100 * guys[g].color.g / d;
  //       B += 100 * guys[g].color.b / d;
  //     }
  //     pixels[index] = color(R, G, B);
  //   }
  // }
  // updatePixels();
}

class Guy {

  constructor(i, x, y, s, as) {
    this.index = i;
    this.x = x;
    this.y = y;
    this.size = s;
    this.auraSize = as;
    this.hasBubble = false;
    this.bubble = null;
    this.auras = [];
  }

  //画小人
  display() {
    strokeWeight(5);
    if (!phoneOn) {
      stroke(borderColorOff);
    } else {
      stroke(borderColorOn);
    }
    if (!phoneOn) {
      fill(guysColorOff);
      ellipse(this.x, this.y, this.size);
    } else {
      fill(guysColorOn);
      ellipse(this.x, this.y, this.size);
    }
    
  }

  //画BUBBLE
  displayBubble() {

    if (!phoneOn) {
      var randomTarget = random([0, 1, 2, 3, 4]);
      while (randomTarget == this.index) {
        randomTarget = random([0, 1, 2, 3, 4]);
      }
      if (!this.hasBubble) {
        this.bubble = new Bubble(20,//小球大小
          this.index,
          randomTarget,
          random(1, 5),
          time);
        this.hasBubble = true;

        this.addAura(0, this.x, this.y, this.auraSize, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]);
        setTimeout(this.addAura(1, this.x, this.y, this.auraSize * 1.25, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]), 0.1);
        setTimeout(this.addAura(2, this.x, this.y, this.auraSize * 1.5, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]), 0.2);
      }//光环大小
      
    } else {
      var randomTargetGuys = random([0, 1, 2, 3, 4]);
      while (randomTargetGuys == this.index) {
        randomTargetGuys = random([0, 1, 2, 3, 4]);
      }
      var randomTargetPhone = random([5, 6, 7, 8, 9]);
      while (randomTargetPhone == this.index) {
        randomTargetPhone = random([5, 6, 7, 8, 9]);
      }
      if (!this.hasBubble) {
        if (this.index < 5) {
          this.bubble = new Bubble(20,//小球大小
            this.index,
            randomTargetPhone,
            random(1, 5),
            time);
          this.hasBubble = true;
        } else {
          this.bubble = new Bubble(20,//小球大小
            this.index,
            randomTargetGuys,
            random(1, 5),
            time);
          this.hasBubble = true;
        }
        this.addAura(0, this.x, this.y, this.auraSize, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]);
        setTimeout(this.addAura(1, this.x, this.y, this.auraSize * 1.25, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]), 0.1);
        setTimeout(this.addAura(2, this.x, this.y, this.auraSize * 1.5, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]), 0.2);
      }//光环大小 在最开始调节
    }

    this.bubble.display();

    for (var i = 0; i < this.auras.length; i++) {
      if (this.auras[i].currentPhaseTime < 0.6* PI) {
        this.auras[i].display();
      } else {
        this.auras.splice(i, 1);
        i--;
      }
    }
  }

  addAura(i, x, y, s, r, g, b) {
    var newAura = new Aura(x, y, s, r, g, b);
    this.auras[i] = newAura;
  }
}

class Aura {

  constructor(x, y, s, r, g, b) {
    this.x = x;
    this.y = y;
    this.size = s;
    this.r = r;
    this.g = g;
    this.b = b;
    this.startTime = normTime;
    this.currentPhaseTime = normTime;
  }

  display() {
    this.currentPhaseTime = normTime - this.startTime;
    if (this.currentPhaseTime < 0.5 * PI) {
      noStroke();
      var transColor = color(this.r, this.g, this.b, 255 * (1 + sin(this.currentPhaseTime + PI)));
      fill(transColor);
      ellipse(this.x, this.y, this.size * sin(this.currentPhaseTime));
    }
  }
}

class Bubble {

  constructor(s, si, ei, sp, t) {
    this.size = s;
    this.startGuyIndex = si;
    this.endGuyIndex = ei;
    this.speed = sp;
    this.initTime = t;
    this.vibration = random (0, 1); //0;泡泡振动 

    var targetDistance = dist(guys[this.startGuyIndex].x,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].x,
      guys[this.endGuyIndex].y);
    this.speedX = (guys[this.endGuyIndex].x - guys[this.startGuyIndex].x) / targetDistance;
    this.speedY = (guys[this.endGuyIndex].y - guys[this.startGuyIndex].y) / targetDistance;

    this.x = 0;
    this.y = 0;
    this.particle = null;
  }

  display() {

    noStroke();
    if (!phoneOn) {
      fill(borderColorOff);
    } else {
      fill(borderColorOn);
    }
    var targetTime = dist(guys[this.startGuyIndex].x,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].x,
      guys[this.endGuyIndex].y) / this.speed;
    this.x = map(time - this.initTime,
      0,
      targetTime,
      guys[this.startGuyIndex].x,
      guys[this.endGuyIndex].x) + 5 * sin(time * this.vibration);
    this.y = map(time - this.initTime,
      0,
      targetTime,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].y) + 5 * sin(time * this.vibration);
    // this.particle = new ParticleSystem(createVector(this.x, this.y), 
    //   																 createVector(this.speedX, this.speedY));
    // this.particle.addParticle();
    // this.particle.run();
    ellipse(this.x, this.y, this.size);
    var distance = dist(this.x, this.y, guys[this.endGuyIndex].x, guys[this.endGuyIndex].y);
    if (distance < this.size) {
      guys[this.startGuyIndex].hasBubble = false;
    }
  }
}

var portName = '/dev/cu.usbmodem145201';
var threshold = 1023; // Use the same sensor threshold value in Arduino

var phoneOn = false;
var guys = [];
var time = 0;
var inData;
var serial;
var bgTransition = 0;

function preload() {
  soundFormats('mp3', 'ogg');
  m1 = loadSound('minions1.mp3');
  m2 = loadSound('music2.mp3');
  
}

function setup() {
  

  serial = new p5.SerialPort();
  serial.on('data', serialEvent);
  serial.open(portName);

  // 颜色可调
  backgroundColorOff = 255;
  backgroundColorOn = 0;
  guysColorOff = 0;//小人黑色
	guysColorOn = 255;
  auraColorOff = color(219, 35, 89);//光环红色
  auraColorOn = color(110,17, 257);//光环蓝色
  phoneColor = 0;
  phoneHomeButtonColor = color(223, 94, 258);
  borderColorOff = color(223, 94, 258);//边框紫色
  borderColorOn = color(207, 227, 253);//边框白色
  ButtonboarderColor=255;
  phoneX = 600; //手机位置
  phoneY = 3;
  phoneW = 280;
  phoneH = 120;

  // new Guy(index, x位置, Y位置不能一样, 小人大小, 光环大小, 小人底色黑色)
  guy0 = new Guy(0, 350, 150, 130, 300);
  guy1 = new Guy(1, 520, 375, 130, 300);
  guy2 = new Guy(2, 750, 550, 130, 300);
  guy3 = new Guy(3, 970, 374.9, 130, 300);
  guy4 = new Guy(4, 1150, 149.9, 130, 300);

  guys[0] = guy0;
  guys[1] = guy1;
  guys[2] = guy2;
  guys[3] = guy3;
  guys[4] = guy4;
  for (var i = 5; i < 10; i++) {
    guy = new Guy(i, phoneX + phoneW / 2, phoneY + phoneH / 2);
    guys[i] = guy;
  }

  pixelDensity(1.0);
  createCanvas(2000, 2000);
}

function serialEvent() {
  inData = Number(serial.read());
  if (inData == threshold) {
    phoneOn = true;
    // m1.setVolume(0.1);
    // m1.play();
    // m1.loop();
  } else {
    phoneOn = false;
    // m2.setVolume(0.1);
    // m2.play();
    // m2.loop();
  }
  print(inData);
}

// debug use only
function mousePressed() {
  if(phoneOn){
    phoneOn=false;
    m2.stop();
    m1.setVolume(0.1);
    m1.play();
    m1.loop();
  }else{
    phoneOn=true;
    m1.stop();
    m2.setVolume(0.1);
    m2.play();
    m2.loop();
  }
    
    
  
// if (!phoneOn) {
// m1.setVolume(0.1);
//   m1.play();
//     m1.loop();
//     } else {  
// 			m2.setVolume(0.1);
//      m2.play();
// 		m2.loop();
//     }
  
}

function draw() {
  time++;
  normTime = time / 40 % (2 * PI);

  if (!phoneOn) {
    bgTransition = lerp (bgTransition, backgroundColorOff, 0.05);//off background change speed 
	} else {
    bgTransition = lerp (bgTransition, backgroundColorOn, 0.05);//on background change speed
  }
  background(bgTransition);

  if (!phoneOn) {
    for (var i = 0; i < 5; i++) {
      guys[i].displayBubble();
    }
    for (var i = 0; i < 5; i++) {
      guys[i].display();
    }
  } else {
    for (var i = 0; i < 10; i++) {
      guys[i].displayBubble();
    }
    for (var i = 0; i < 10; i++) {
      guys[i].display();
    }
  }

  // 画手机
  if (!phoneOn) {
    stroke(borderColorOff);
  } else {
    stroke(borderColorOn);
  }
  strokeWeight(5);
  fill(phoneColor);
  rect(phoneX, phoneY, phoneW, phoneH, 20);
  if (!phoneOn) {
    stroke(ButtonboarderColor);
    strokeWeight(3);
    fill(phoneHomeButtonColor);
    ellipse(phoneX + phoneW / 7, phoneY + phoneH / 2, 20);
  }

  // loadPixels();
  // for (var x = 0; x < width; x++) {
  //   for (var y = 0; y < height; y++) {
  //     var index = x + y * width;
  //     var R = 0;
  //     var G = 0;
  //     var B = 0;
  //     for (var g = 0; g < 5; g++) {
  //       var d = dist(x, y, guys[g].bubble.x, guys[g].bubble.y);
  //       R += 100 * guys[g].color.r / d;
  //       G += 100 * guys[g].color.g / d;
  //       B += 100 * guys[g].color.b / d;
  //     }
  //     pixels[index] = color(R, G, B);
  //   }
  // }
  // updatePixels();
}

class Guy {

  constructor(i, x, y, s, as) {
    this.index = i;
    this.x = x;
    this.y = y;
    this.size = s;
    this.auraSize = as;
    this.hasBubble = false;
    this.bubble = null;
    this.auras = [];
  }

  //画小人
  display() {
    strokeWeight(5);
    if (!phoneOn) {
      stroke(borderColorOff);
    } else {
      stroke(borderColorOn);
    }
    if (!phoneOn) {
      fill(guysColorOff);
      ellipse(this.x, this.y, this.size);
    } else {
      fill(guysColorOn);
      ellipse(this.x, this.y, this.size);
    }
    
  }

  //画BUBBLE
  displayBubble() {

    if (!phoneOn) {
      var randomTarget = random([0, 1, 2, 3, 4]);
      while (randomTarget == this.index) {
        randomTarget = random([0, 1, 2, 3, 4]);
      }
      if (!this.hasBubble) {
        this.bubble = new Bubble(20,//小球大小
          this.index,
          randomTarget,
          random(1, 5),
          time);
        this.hasBubble = true;

        this.addAura(0, this.x, this.y, this.auraSize, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]);
        setTimeout(this.addAura(1, this.x, this.y, this.auraSize * 1.25, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]), 0.1);
        setTimeout(this.addAura(2, this.x, this.y, this.auraSize * 1.5, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]), 0.2);
      }//光环大小
      
    } else {
      var randomTargetGuys = random([0, 1, 2, 3, 4]);
      while (randomTargetGuys == this.index) {
        randomTargetGuys = random([0, 1, 2, 3, 4]);
      }
      var randomTargetPhone = random([5, 6, 7, 8, 9]);
      while (randomTargetPhone == this.index) {
        randomTargetPhone = random([5, 6, 7, 8, 9]);
      }
      if (!this.hasBubble) {
        if (this.index < 5) {
          this.bubble = new Bubble(20,//小球大小
            this.index,
            randomTargetPhone,
            random(1, 5),
            time);
          this.hasBubble = true;
        } else {
          this.bubble = new Bubble(20,//小球大小
            this.index,
            randomTargetGuys,
            random(1, 5),
            time);
          this.hasBubble = true;
        }
        this.addAura(0, this.x, this.y, this.auraSize, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]);
        setTimeout(this.addAura(1, this.x, this.y, this.auraSize * 1.25, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]), 0.1);
        setTimeout(this.addAura(2, this.x, this.y, this.auraSize * 1.5, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]), 0.2);
      }//光环大小 在最开始调节
    }

    this.bubble.display();

    for (var i = 0; i < this.auras.length; i++) {
      if (this.auras[i].currentPhaseTime < 0.6* PI) {
        this.auras[i].display();
      } else {
        this.auras.splice(i, 1);
        i--;
      }
    }
  }

  addAura(i, x, y, s, r, g, b) {
    var newAura = new Aura(x, y, s, r, g, b);
    this.auras[i] = newAura;
  }
}

class Aura {

  constructor(x, y, s, r, g, b) {
    this.x = x;
    this.y = y;
    this.size = s;
    this.r = r;
    this.g = g;
    this.b = b;
    this.startTime = normTime;
    this.currentPhaseTime = normTime;
  }

  display() {
    this.currentPhaseTime = normTime - this.startTime;
    if (this.currentPhaseTime < 0.5 * PI) {
      noStroke();
      var transColor = color(this.r, this.g, this.b, 255 * (1 + sin(this.currentPhaseTime + PI)));
      fill(transColor);
      ellipse(this.x, this.y, this.size * sin(this.currentPhaseTime));
    }
  }
}

class Bubble {

  constructor(s, si, ei, sp, t) {
    this.size = s;
    this.startGuyIndex = si;
    this.endGuyIndex = ei;
    this.speed = sp;
    this.initTime = t;
    this.vibration = random (0, 1); //0;泡泡振动 

    var targetDistance = dist(guys[this.startGuyIndex].x,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].x,
      guys[this.endGuyIndex].y);
    this.speedX = (guys[this.endGuyIndex].x - guys[this.startGuyIndex].x) / targetDistance;
    this.speedY = (guys[this.endGuyIndex].y - guys[this.startGuyIndex].y) / targetDistance;

    this.x = 0;
    this.y = 0;
    this.particle = null;
  }

  display() {

    noStroke();
    if (!phoneOn) {
      fill(borderColorOff);
    } else {
      fill(borderColorOn);
    }
    var targetTime = dist(guys[this.startGuyIndex].x,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].x,
      guys[this.endGuyIndex].y) / this.speed;
    this.x = map(time - this.initTime,
      0,
      targetTime,
      guys[this.startGuyIndex].x,
      guys[this.endGuyIndex].x) + 5 * sin(time * this.vibration);
    this.y = map(time - this.initTime,
      0,
      targetTime,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].y) + 5 * sin(time * this.vibration);
    // this.particle = new ParticleSystem(createVector(this.x, this.y), 
    //   																 createVector(this.speedX, this.speedY));
    // this.particle.addParticle();
    // this.particle.run();
    ellipse(this.x, this.y, this.size);
    var distance = dist(this.x, this.y, guys[this.endGuyIndex].x, guys[this.endGuyIndex].y);
    if (distance < this.size) {
      guys[this.startGuyIndex].hasBubble = false;
    }
  }
}

var portName = '/dev/cu.usbmodem145201';
var threshold = 1023; // Use the same sensor threshold value in Arduino

var phoneOn = false;
var guys = [];
var time = 0;
var inData;
var serial;
var bgTransition = 0;

function preload() {
  soundFormats('mp3', 'ogg');
  m1 = loadSound('minions1.mp3');
  m2 = loadSound('music2.mp3');
  
}

function setup() {
  

  serial = new p5.SerialPort();
  serial.on('data', serialEvent);
  serial.open(portName);

  // 颜色可调
  backgroundColorOff = 255;
  backgroundColorOn = 0;
  guysColor = 0;//小人黑色
  auraColorOff = color(219, 35, 89);//光环红色
  auraColorOn = color(110,17, 257);//光环蓝色
  phoneColor = 0;
  phoneHomeButtonColor = color(223, 94, 258);
  borderColorOff = color(223, 94, 258);//边框紫色
  borderColorOn = color(207, 227, 253);//边框白色
  ButtonboarderColor=255;
  phoneX = 600; //手机位置
  phoneY = 3;
  phoneW = 280;
  phoneH = 120;

  // new Guy(index, x位置, Y位置不能一样, 小人大小, 光环大小, 小人底色黑色)
  guy0 = new Guy(0, 350, 150, 130, 300, guysColor);
  guy1 = new Guy(1, 520, 375, 130, 300, guysColor);
  guy2 = new Guy(2, 750, 550, 130, 300, guysColor);
  guy3 = new Guy(3, 970, 374.9, 130, 300, guysColor);
  guy4 = new Guy(4, 1150, 149.9, 130, 300, guysColor);

  guys[0] = guy0;
  guys[1] = guy1;
  guys[2] = guy2;
  guys[3] = guy3;
  guys[4] = guy4;
  for (var i = 5; i < 10; i++) {
    guy = new Guy(i, phoneX + phoneW / 2, phoneY + phoneH / 2, guysColor);
    guys[i] = guy;
  }

  pixelDensity(1.0);
  createCanvas(2000, 2000);
}

function serialEvent() {
  inData = Number(serial.read());
  if (inData == threshold) {
    phoneOn = true;
    // m1.setVolume(0.1);
    // m1.play();
    // m1.loop();
  } else {
    phoneOn = false;
    // m2.setVolume(0.1);
    // m2.play();
    // m2.loop();
  }
  print(inData);
}

// debug use only
function mousePressed() {
  if(phoneOn){
    phoneOn=false;
    m2.stop();
    m1.setVolume(0.1);
    m1.play();
    m1.loop();
  }else{
    phoneOn=true;
    m1.stop();
    m2.setVolume(0.1);
    m2.play();
    m2.loop();
  }
    
    
  
// if (!phoneOn) {
// m1.setVolume(0.1);
//   m1.play();
//     m1.loop();
//     } else {  
// 			m2.setVolume(0.1);
//      m2.play();
// 		m2.loop();
//     }
  
}

function draw() {
  time++;
  normTime = time / 40 % (2 * PI);

  if (!phoneOn) {
    bgTransition = lerp (bgTransition, backgroundColorOff, 0.05);//off background change speed 
	} else {
    bgTransition = lerp (bgTransition, backgroundColorOn, 0.05);//on background change speed
  }
  background(bgTransition);

  if (!phoneOn) {
    for (var i = 0; i < 5; i++) {
      guys[i].displayBubble();
    }
    for (var i = 0; i < 5; i++) {
      guys[i].display();
    }
  } else {
    for (var i = 0; i < 10; i++) {
      guys[i].displayBubble();
    }
    for (var i = 0; i < 10; i++) {
      guys[i].display();
    }
  }

  // 画手机
  if (!phoneOn) {
    stroke(borderColorOff);
  } else {
    stroke(borderColorOn);
  }
  strokeWeight(5);
  fill(phoneColor);
  rect(phoneX, phoneY, phoneW, phoneH, 20);
  if (!phoneOn) {
    stroke(ButtonboarderColor);
    strokeWeight(3);
    fill(phoneHomeButtonColor);
    ellipse(phoneX + phoneW / 7, phoneY + phoneH / 2, 20);
  }

  // loadPixels();
  // for (var x = 0; x < width; x++) {
  //   for (var y = 0; y < height; y++) {
  //     var index = x + y * width;
  //     var R = 0;
  //     var G = 0;
  //     var B = 0;
  //     for (var g = 0; g < 5; g++) {
  //       var d = dist(x, y, guys[g].bubble.x, guys[g].bubble.y);
  //       R += 100 * guys[g].color.r / d;
  //       G += 100 * guys[g].color.g / d;
  //       B += 100 * guys[g].color.b / d;
  //     }
  //     pixels[index] = color(R, G, B);
  //   }
  // }
  // updatePixels();
}

class Guy {

  constructor(i, x, y, s, as, c) {
    this.index = i;
    this.x = x;
    this.y = y;
    this.size = s;
    this.auraSize = as;
    this.hasBubble = false;
    this.bubble = null;
    this.auras = [];
  }

  //画小人
  display() {
    strokeWeight(5);
    if (!phoneOn) {
      stroke(borderColorOff);
    } else {
      stroke(borderColorOn);
    }
    fill(0);
    ellipse(this.x, this.y, this.size);
  }

  //画BUBBLE
  displayBubble() {

    if (!phoneOn) {
      var randomTarget = random([0, 1, 2, 3, 4]);
      while (randomTarget == this.index) {
        randomTarget = random([0, 1, 2, 3, 4]);
      }
      if (!this.hasBubble) {
        this.bubble = new Bubble(20,//小球大小
          this.index,
          randomTarget,
          random(1, 5),
          time);
        this.hasBubble = true;

        this.addAura(0, this.x, this.y, this.auraSize, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]);
        setTimeout(this.addAura(1, this.x, this.y, this.auraSize * 1.25, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]), 0.1);
        setTimeout(this.addAura(2, this.x, this.y, this.auraSize * 1.5, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]), 0.2);
      }//光环大小
      
    } else {
      var randomTargetGuys = random([0, 1, 2, 3, 4]);
      while (randomTargetGuys == this.index) {
        randomTargetGuys = random([0, 1, 2, 3, 4]);
      }
      var randomTargetPhone = random([5, 6, 7, 8, 9]);
      while (randomTargetPhone == this.index) {
        randomTargetPhone = random([5, 6, 7, 8, 9]);
      }
      if (!this.hasBubble) {
        if (this.index < 5) {
          this.bubble = new Bubble(20,//小球大小
            this.index,
            randomTargetPhone,
            random(1, 5),
            time);
          this.hasBubble = true;
        } else {
          this.bubble = new Bubble(20,//小球大小
            this.index,
            randomTargetGuys,
            random(1, 5),
            time);
          this.hasBubble = true;
        }
        this.addAura(0, this.x, this.y, this.auraSize, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]);
        setTimeout(this.addAura(1, this.x, this.y, this.auraSize * 1.25, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]), 0.1);
        setTimeout(this.addAura(2, this.x, this.y, this.auraSize * 1.5, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]), 0.2);
      }//光环大小 在最开始调节
    }

    this.bubble.display();

    for (var i = 0; i < this.auras.length; i++) {
      if (this.auras[i].currentPhaseTime < 0.6* PI) {
        this.auras[i].display();
      } else {
        this.auras.splice(i, 1);
        i--;
      }
    }
  }

  addAura(i, x, y, s, r, g, b) {
    var newAura = new Aura(x, y, s, r, g, b);
    this.auras[i] = newAura;
  }
}

class Aura {

  constructor(x, y, s, r, g, b) {
    this.x = x;
    this.y = y;
    this.size = s;
    this.r = r;
    this.g = g;
    this.b = b;
    this.startTime = normTime;
    this.currentPhaseTime = normTime;
  }

  display() {
    this.currentPhaseTime = normTime - this.startTime;
    if (this.currentPhaseTime < 0.5 * PI) {
      noStroke();
      var transColor = color(this.r, this.g, this.b, 255 * (1 + sin(this.currentPhaseTime + PI)));
      fill(transColor);
      ellipse(this.x, this.y, this.size * sin(this.currentPhaseTime));
    }
  }
}

class Bubble {

  constructor(s, si, ei, sp, t) {
    this.size = s;
    this.startGuyIndex = si;
    this.endGuyIndex = ei;
    this.speed = sp;
    this.initTime = t;
    this.vibration = random (0, 1); //0;泡泡振动 

    var targetDistance = dist(guys[this.startGuyIndex].x,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].x,
      guys[this.endGuyIndex].y);
    this.speedX = (guys[this.endGuyIndex].x - guys[this.startGuyIndex].x) / targetDistance;
    this.speedY = (guys[this.endGuyIndex].y - guys[this.startGuyIndex].y) / targetDistance;

    this.x = 0;
    this.y = 0;
    this.particle = null;
  }

  display() {

    noStroke();
    if (!phoneOn) {
      fill(borderColorOff);
    } else {
      fill(borderColorOn);
    }
    var targetTime = dist(guys[this.startGuyIndex].x,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].x,
      guys[this.endGuyIndex].y) / this.speed;
    this.x = map(time - this.initTime,
      0,
      targetTime,
      guys[this.startGuyIndex].x,
      guys[this.endGuyIndex].x) + 5 * sin(time * this.vibration);
    this.y = map(time - this.initTime,
      0,
      targetTime,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].y) + 5 * sin(time * this.vibration);
    // this.particle = new ParticleSystem(createVector(this.x, this.y), 
    //   																 createVector(this.speedX, this.speedY));
    // this.particle.addParticle();
    // this.particle.run();
    ellipse(this.x, this.y, this.size);
    var distance = dist(this.x, this.y, guys[this.endGuyIndex].x, guys[this.endGuyIndex].y);
    if (distance < this.size) {
      guys[this.startGuyIndex].hasBubble = false;
    }
  }
}


// function ha(n) {
//   return sin(n) * 758.5453 % 1;
// }

// function mod289(x) {
//   return x.sub(three.Vector3.floor(three.Vector3.multiplyScalar(x, 1.0 / 289.0) * 289.0));
// }

// function mod289(x) {
//   return x.sub(three.Vector4.floor(three.Vector4.multiplyScalar(x, 1.0 / 289.0) * 289.0));
// }

// function permutex(x) {
//   return mod289(three.Vector4.multiply(x, three.Vector4.addScalar(three.Vector4.multiplyScalar(x, 34.0)+1.0)));
// }

// function taylorInvSqrt(r) {
//   return three.Vector4.addScalar(three.Vector4.multiplyScalar(r, -0.85373472095314), 1.79284291400159);
// }

// function snoise(vec3 v) { 
//   var C = three.Vector2(1.0/6.0, 1.0/3.0) ;
//   var D = three.Vector4(0.0, 0.5, 1.0, 2.0);

//   THREE.Vector3.
//   i = three.Vector3.floor(v + p5.Vector3.dot(v, C.yyy) );
//   vec3 x0 =   v - i + dot(i, C.xxx) ;

//   vec3 g = step(x0.yzx, x0.xyz);
//   vec3 l = 1.0 - g;
//   vec3 i1 = min( g.xyz, l.zxy );
//   vec3 i2 = max( g.xyz, l.zxy );

//   //   x0 = x0 - 0.0 + 0.0 * C.xxx;
//   //   x1 = x0 - i1  + 1.0 * C.xxx;
//   //   x2 = x0 - i2  + 2.0 * C.xxx;
//   //   x3 = x0 - 1.0 + 3.0 * C.xxx;
//   vec3 x1 = x0 - i1 + C.xxx;
//   vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
//   vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// // Permutations
//   i = mod289(i); 
//   vec4 p = permute( permute( permute( 
//              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
//            + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
//            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// // Gradients: 7x7 points over a square, mapped onto an octahedron.
// // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
//   float n_ = 0.142857142857; // 1.0/7.0
//   vec3  ns = n_ * D.wyz - D.xzx;

//   vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

//   vec4 x_ = floor(j * ns.z);
//   vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

//   vec4 x = x_ *ns.x + ns.yyyy;
//   vec4 y = y_ *ns.x + ns.yyyy;
//   vec4 h = 1.0 - abs(x) - abs(y);

//   vec4 b0 = vec4( x.xy, y.xy );
//   vec4 b1 = vec4( x.zw, y.zw );

//   //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
//   //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
//   vec4 s0 = floor(b0)*2.0 + 1.0;
//   vec4 s1 = floor(b1)*2.0 + 1.0;
//   vec4 sh = -step(h, vec4(0.0));

//   vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
//   vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

//   vec3 p0 = vec3(a0.xy,h.x);
//   vec3 p1 = vec3(a0.zw,h.y);
//   vec3 p2 = vec3(a1.xy,h.z);
//   vec3 p3 = vec3(a1.zw,h.w);

// //normalise gradients
//   vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
//   p0 *= norm.x;
//   p1 *= norm.y;
//   p2 *= norm.z;
//   p3 *= norm.w;

// // Mix final noise value
//   vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
//   m = m * m;
//   return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
//                                 dot(p2,x2), dot(p3,x3) ) );
//   }
// float no( in vec3 x )
// {    vec3 p = floor(x);    vec3 f = fract(x); 
//     float n = p.x + p.y*57.0 + p.z*800.0;float res = mix(mix(mix( ha(n+  0.0), ha(n+  1.0),f.x), mix( ha(n+ 57.0), ha(n+ 58.0),f.x),f.y),
//     mix(mix( ha(n+800.0), ha(n+801.0),f.x), mix( ha(n+857.0), ha(n+858.0),f.x),f.y),f.z);
//     return res;}

// float fb(vec3 p){
//     float v = 1.0;
//     float w = 1.0;
//     float a = 5.0;
//     for(int i=0;i<5;i++){
//         v += a * (snoise(p) * 0.5 + 0.5);
//         w += a;
//         p *= 4.0;
//         a *= 0.7;
//     }
//     return smoothstep(0.1, 1.0, v / w);
// }

// vec3 colo = vec3(1.0);

// float f(vec3 p){
//     float a = snoise(p * 1.06 + time * 0.05);
//     colo = mix(vec3(a, -2, a), vec3(0, a, 1.0), a * a + 0.5);
//     colo = mix(colo, vec3(a, 0, a*a), pow(a * a + 0.5, 5.0));
//     return fb(p + a);
// }

// void main( void ) {

// vec2  surfacePos = (gl_FragCoord.xy - resolution.xy*.5) / resolution.y;
//     vec2 position = ( surfacePos ) * 2.0;

//     float z = f(vec3(position, 1));
//     gl_FragColor = vec4(colo * z, 1.0);

// }
var portName = '/dev/cu.usbmodem145201';
var threshold = 1023; // Use the same sensor threshold value in Arduino

var phoneOn = false;
var guys = [];
var time = 0;
var inData = 0;
var serial;
var bgTransition = 0;

function setup() {
  
  serial = new p5.SerialPort();
  serial.on('data', serialEvent);
  serial.open(portName);

  // 颜色可调
  backgroundColorOff = 255;
  backgroundColorOn = 0;
  guysColor = 0;//小人黑色
  auraColorOff = color(62, 242, 20);//光环绿色
  auraColorOn = color(243,20, 49);//光环红色
  phoneColor = 0;
  phoneHomeButtonColor = 255;
  borderColorOff = color(0, 255, 0);//边框绿色
  borderColorOn = color(254, 79, 78);//边框红色
  phoneX = 650; //手机位置
  phoneY = 15;
  phoneW = 200;
  phoneH = 370;

  // new Guy(index, x位置, Y位置不能一样, 小人大小, 光环大小, 小人底色黑色)
  guy0 = new Guy(0, 350, 150, 180, 300, guysColor);
  guy1 = new Guy(1, 520, 375, 180, 300, guysColor);
  guy2 = new Guy(2, 750, 550, 180, 300, guysColor);
  guy3 = new Guy(3, 970, 374.9, 180, 300, guysColor);
  guy4 = new Guy(4, 1150, 149.9, 180, 300, guysColor);

  guys[0] = guy0;
  guys[1] = guy1;
  guys[2] = guy2;
  guys[3] = guy3;
  guys[4] = guy4;
  for (var i = 5; i < 10; i++) {
    guy = new Guy(i, phoneX + phoneW / 2, phoneY + phoneH / 2, guysColor);
    guys[i] = guy;
  }

  pixelDensity(1.0);
  createCanvas(2000, 2000);
}

function serialEvent() {
  inData = Number(serial.read());
  if (inData > threshold) {
    phoneOn = true;
  } else {
    phoneOn = false;
  }
}

// debug use only
function mousePressed() {
  phoneOn = !phoneOn;
}

function draw() {
  time++;
  normTime = time / 40 % (2 * PI);

  if (!phoneOn) {
    bgTransition = lerp (bgTransition, backgroundColorOff, 0.05);//off background change speed 
	} else {
    bgTransition = lerp (bgTransition, backgroundColorOn, 0.05);//on background change speed
  }
  background(bgTransition);

  if (!phoneOn) {
    for (var i = 0; i < 5; i++) {
      guys[i].displayBubble();
    }
    for (var i = 0; i < 5; i++) {
      guys[i].display();
    }
  } else {
    for (var i = 0; i < 10; i++) {
      guys[i].displayBubble();
    }
    for (var i = 0; i < 10; i++) {
      guys[i].display();
    }
  }

  // 画手机
  if (!phoneOn) {
    stroke(borderColorOff);
  } else {
    stroke(borderColorOn);
  }
  strokeWeight(5);
  fill(phoneColor);
  rect(phoneX, phoneY, phoneW, phoneH, 20);
  if (!phoneOn) {
    noStroke();
    fill(phoneHomeButtonColor);
    ellipse(phoneX + phoneW / 2, phoneY + phoneW / 5, 20);
  }

  // loadPixels();
  // for (var x = 0; x < width; x++) {
  //   for (var y = 0; y < height; y++) {
  //     var index = x + y * width;
  //     var R = 0;
  //     var G = 0;
  //     var B = 0;
  //     for (var g = 0; g < 5; g++) {
  //       var d = dist(x, y, guys[g].bubble.x, guys[g].bubble.y);
  //       R += 100 * guys[g].color.r / d;
  //       G += 100 * guys[g].color.g / d;
  //       B += 100 * guys[g].color.b / d;
  //     }
  //     pixels[index] = color(R, G, B);
  //   }
  // }
  // updatePixels();
}

class Guy {

  constructor(i, x, y, s, as, c) {
    this.index = i;
    this.x = x;
    this.y = y;
    this.size = s;
    this.auraSize = as;
    this.hasBubble = false;
    this.bubble = null;
    this.auras = [];
  }

  //画小人
  display() {
    strokeWeight(5);
    if (!phoneOn) {
      stroke(borderColorOff);
    } else {
      stroke(borderColorOn);
    }
    fill(0);
    ellipse(this.x, this.y, this.size);
  }

  //画BUBBLE
  displayBubble() {

    if (!phoneOn) {
      var randomTarget = random([0, 1, 2, 3, 4]);
      while (randomTarget == this.index) {
        randomTarget = random([0, 1, 2, 3, 4]);
      }
      if (!this.hasBubble) {
        this.bubble = new Bubble(20,//小球大小
          this.index,
          randomTarget,
          random(1, 5),
          time);
        this.hasBubble = true;

        this.addAura(0, this.x, this.y, this.auraSize, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]);
        setTimeout(this.addAura(1, this.x, this.y, this.auraSize * 1.25, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]), 0.1);
        setTimeout(this.addAura(2, this.x, this.y, this.auraSize * 1.5, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]), 0.2);
      }//光环大小
      
    } else {
      var randomTargetGuys = random([0, 1, 2, 3, 4]);
      while (randomTargetGuys == this.index) {
        randomTargetGuys = random([0, 1, 2, 3, 4]);
      }
      var randomTargetPhone = random([5, 6, 7, 8, 9]);
      while (randomTargetPhone == this.index) {
        randomTargetPhone = random([5, 6, 7, 8, 9]);
      }
      if (!this.hasBubble) {
        if (this.index < 5) {
          this.bubble = new Bubble(20,//小球大小
            this.index,
            randomTargetPhone,
            random(1, 5),
            time);
          this.hasBubble = true;
        } else {
          this.bubble = new Bubble(20,//小球大小
            this.index,
            randomTargetGuys,
            random(1, 5),
            time);
          this.hasBubble = true;
        }
        this.addAura(0, this.x, this.y, this.auraSize, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]);
        setTimeout(this.addAura(1, this.x, this.y, this.auraSize * 1.25, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]), 0.1);
        setTimeout(this.addAura(2, this.x, this.y, this.auraSize * 1.5, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]), 0.2);
      }//光环大小 在最开始调节
    }

    this.bubble.display();

    for (var i = 0; i < this.auras.length; i++) {
      if (this.auras[i].currentPhaseTime < 0.6* PI) {
        this.auras[i].display();
      } else {
        this.auras.splice(i, 1);
        i--;
      }
    }
  }

  addAura(i, x, y, s, r, g, b) {
    var newAura = new Aura(x, y, s, r, g, b);
    this.auras[i] = newAura;
  }
}

class Aura {

  constructor(x, y, s, r, g, b) {
    this.x = x;
    this.y = y;
    this.size = s;
    this.r = r;
    this.g = g;
    this.b = b;
    this.startTime = normTime;
    this.currentPhaseTime = normTime;
  }

  display() {
    this.currentPhaseTime = normTime - this.startTime;
    if (this.currentPhaseTime < 0.5 * PI) {
      noStroke();
      var transColor = color(this.r, this.g, this.b, 255 * (1 + sin(this.currentPhaseTime + PI)));
      fill(transColor);
      ellipse(this.x, this.y, this.size * sin(this.currentPhaseTime));
    }
  }
}

class Bubble {

  constructor(s, si, ei, sp, t) {
    this.size = s;
    this.startGuyIndex = si;
    this.endGuyIndex = ei;
    this.speed = sp;
    this.initTime = t;
    this.vibration = 0;//random (0, 1); 泡泡振动 

    var targetDistance = dist(guys[this.startGuyIndex].x,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].x,
      guys[this.endGuyIndex].y);
    this.speedX = (guys[this.endGuyIndex].x - guys[this.startGuyIndex].x) / targetDistance;
    this.speedY = (guys[this.endGuyIndex].y - guys[this.startGuyIndex].y) / targetDistance;

    this.x = 0;
    this.y = 0;
    this.particle = null;
  }

  display() {

    noStroke();
    if (!phoneOn) {
      fill(borderColorOff);
    } else {
      fill(borderColorOn);
    }
    var targetTime = dist(guys[this.startGuyIndex].x,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].x,
      guys[this.endGuyIndex].y) / this.speed;
    this.x = map(time - this.initTime,
      0,
      targetTime,
      guys[this.startGuyIndex].x,
      guys[this.endGuyIndex].x) + 5 * sin(time * this.vibration);
    this.y = map(time - this.initTime,
      0,
      targetTime,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].y) + 5 * sin(time * this.vibration);
    // this.particle = new ParticleSystem(createVector(this.x, this.y), 
    //   																 createVector(this.speedX, this.speedY));
    // this.particle.addParticle();
    // this.particle.run();
    ellipse(this.x, this.y, this.size);
    var distance = dist(this.x, this.y, guys[this.endGuyIndex].x, guys[this.endGuyIndex].y);
    if (distance < this.size) {
      guys[this.startGuyIndex].hasBubble = false;
    }
  }
}


// function ha(n) {
//   return sin(n) * 758.5453 % 1;
// }

// function mod289(x) {
//   return x.sub(three.Vector3.floor(three.Vector3.multiplyScalar(x, 1.0 / 289.0) * 289.0));
// }

// function mod289(x) {
//   return x.sub(three.Vector4.floor(three.Vector4.multiplyScalar(x, 1.0 / 289.0) * 289.0));
// }

// function permutex(x) {
//   return mod289(three.Vector4.multiply(x, three.Vector4.addScalar(three.Vector4.multiplyScalar(x, 34.0)+1.0)));
// }

// function taylorInvSqrt(r) {
//   return three.Vector4.addScalar(three.Vector4.multiplyScalar(r, -0.85373472095314), 1.79284291400159);
// }

// function snoise(vec3 v) { 
//   var C = three.Vector2(1.0/6.0, 1.0/3.0) ;
//   var D = three.Vector4(0.0, 0.5, 1.0, 2.0);

//   THREE.Vector3.
//   i = three.Vector3.floor(v + p5.Vector3.dot(v, C.yyy) );
//   vec3 x0 =   v - i + dot(i, C.xxx) ;

//   vec3 g = step(x0.yzx, x0.xyz);
//   vec3 l = 1.0 - g;
//   vec3 i1 = min( g.xyz, l.zxy );
//   vec3 i2 = max( g.xyz, l.zxy );

//   //   x0 = x0 - 0.0 + 0.0 * C.xxx;
//   //   x1 = x0 - i1  + 1.0 * C.xxx;
//   //   x2 = x0 - i2  + 2.0 * C.xxx;
//   //   x3 = x0 - 1.0 + 3.0 * C.xxx;
//   vec3 x1 = x0 - i1 + C.xxx;
//   vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
//   vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// // Permutations
//   i = mod289(i); 
//   vec4 p = permute( permute( permute( 
//              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
//            + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
//            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// // Gradients: 7x7 points over a square, mapped onto an octahedron.
// // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
//   float n_ = 0.142857142857; // 1.0/7.0
//   vec3  ns = n_ * D.wyz - D.xzx;

//   vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

//   vec4 x_ = floor(j * ns.z);
//   vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

//   vec4 x = x_ *ns.x + ns.yyyy;
//   vec4 y = y_ *ns.x + ns.yyyy;
//   vec4 h = 1.0 - abs(x) - abs(y);

//   vec4 b0 = vec4( x.xy, y.xy );
//   vec4 b1 = vec4( x.zw, y.zw );

//   //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
//   //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
//   vec4 s0 = floor(b0)*2.0 + 1.0;
//   vec4 s1 = floor(b1)*2.0 + 1.0;
//   vec4 sh = -step(h, vec4(0.0));

//   vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
//   vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

//   vec3 p0 = vec3(a0.xy,h.x);
//   vec3 p1 = vec3(a0.zw,h.y);
//   vec3 p2 = vec3(a1.xy,h.z);
//   vec3 p3 = vec3(a1.zw,h.w);

// //normalise gradients
//   vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
//   p0 *= norm.x;
//   p1 *= norm.y;
//   p2 *= norm.z;
//   p3 *= norm.w;

// // Mix final noise value
//   vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
//   m = m * m;
//   return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
//                                 dot(p2,x2), dot(p3,x3) ) );
//   }
// float no( in vec3 x )
// {    vec3 p = floor(x);    vec3 f = fract(x); 
//     float n = p.x + p.y*57.0 + p.z*800.0;float res = mix(mix(mix( ha(n+  0.0), ha(n+  1.0),f.x), mix( ha(n+ 57.0), ha(n+ 58.0),f.x),f.y),
//     mix(mix( ha(n+800.0), ha(n+801.0),f.x), mix( ha(n+857.0), ha(n+858.0),f.x),f.y),f.z);
//     return res;}

// float fb(vec3 p){
//     float v = 1.0;
//     float w = 1.0;
//     float a = 5.0;
//     for(int i=0;i<5;i++){
//         v += a * (snoise(p) * 0.5 + 0.5);
//         w += a;
//         p *= 4.0;
//         a *= 0.7;
//     }
//     return smoothstep(0.1, 1.0, v / w);
// }

// vec3 colo = vec3(1.0);

// float f(vec3 p){
//     float a = snoise(p * 1.06 + time * 0.05);
//     colo = mix(vec3(a, -2, a), vec3(0, a, 1.0), a * a + 0.5);
//     colo = mix(colo, vec3(a, 0, a*a), pow(a * a + 0.5, 5.0));
//     return fb(p + a);
// }

// void main( void ) {

// vec2  surfacePos = (gl_FragCoord.xy - resolution.xy*.5) / resolution.y;
//     vec2 position = ( surfacePos ) * 2.0;

//     float z = f(vec3(position, 1));
//     gl_FragColor = vec4(colo * z, 1.0);

// }
/*
NDL Network Background
Author: Yuya Jeremy Ong

Derivative Work of "Virus network 3d"
Original Author: Jason Labbe
Site: jasonlabbe3d.com
*/


// Global variables
var depth = 500;

var widthOffset;
var heightOffset;
var depthOffset;

var bobCount = 350;
var bobs = [];

var cubes = [];
var cubeSize = 10;

var mouseClick;

var posStart;
var rotStart;
var zoomStart;

var cameraPos;
var cameraRot;
var cameraZoom = 100;


class Cube {

  constructor(_pos, _startFrame) {
    this.active = true;
    this.pos;
    this.startFrame = 0;
    var color1 = color(255, 255, 255, 0);
    var color2 = col
    this.pos = createVector(_pos.x, _pos.y, _pos.z);
    this.startFrame = _startFrame;
  }


  display() {
    if (!active) {
      return;
    }

    if (frameCount > this.startFrame) {
      var blendValue = sin((frameCount - startFrame) * 0.05);

      // Mark it as inactive once it fades out
      if (blendValue < 0) {
        this.active = false;
        return;
      }

      var currentColor = lerpColor(this.color1, this.color2, blendValue);

      noFill();
      stroke(currentColor);
      strokeWeight(3);

      push();
      translate(this.pos.x - widthOffset, this.pos.y - heightOffset, this.pos.z - depthOffset);
      box(cubeSize * 2);
      pop();
    }
  }
}


class Bob {

  constructor(_x, _y, _z, _speed) {
    this.pos = createVector(_x, _y, _z);
    this.dir = p5.Vector.random3D();
    this.dir.normalize();
    this.speed = _speed;
  }

  move() {
    this.pos.x += this.dir.x * this.speed;
    this.pos.y += this.dir.y * this.speed;
    this.pos.z += this.dir.z * this.speed;
  }

  keepInBounds() {
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.dir.x *= -1;
      //createCubePattern(this.pos, new var[] {"y", "z"});
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.dir.x *= -1;
      //createCubePattern(this.pos, new var[] {"y", "z"});
    }

    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.dir.y *= -1;
      //createCubePattern(this.pos, new var[] {"x", "z"});
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.dir.y *= -1;
      //createCubePattern(this.pos, new var[] {"x", "z"});
    }

    if (this.pos.z < 0) {
      this.pos.z = 0;
      this.dir.z *= -1;
      //createCubePattern(this.pos, new var[] {"x", "y"});
    } else if (this.pos.z > depth) {
      this.pos.z = depth;
      this.dir.z *= -1;
      //createCubePattern(this.pos, new var[] {"x", "y"});
    }
  }

  // Get number of close enough bobs
  getNeighbors(threshold) {
    var proximityBobs = [];

    for (var otherBob in bobs) {
      if (otherBob !== undefined && otherBob.pos !== undefined) {
        if (this == otherBob) {
          continue;
        }

        var distance = dist(this.pos.x, 
                            this.pos.y, 
                            this.pos.z,
                            otherBob.pos.x, 
                            otherBob.pos.y, 
                            otherBob.pos.z);
        if (distance < threshold) {
          proximityBobs.add(otherBob);
        }
      }

      return proximityBobs;
    }
  }

  draw() {
    proximityBobs = this.getNeighbors(120);

    if (proximityBobs.createCanvas() > 0) {
      var blendValue = constrain(map(proximityBobs.createCanvas(), 0, 6, 0.0, 1.0), 0.0, 1.0);
      var smallColor = color(0, 255, 255, 100);
      var bigColor = color(255, 52, 58, 50);
      currentColor = lerpColor(smallColor, bigColor, blendValue);

      // Draw line
      stroke(currentColor);

      for (proximityBobs in otherBobs) {
        line(this.pos.x - widthOffset, this.pos.y - heightOffset, this.pos.z - depthOffset,
          otherBob.pos.x - widthOffset, otherBob.pos.y - heightOffset, otherBob.pos.z - depthOffset);
      }

      // Draw red bob
      smooth();
      stroke(150, 150, 200, 5);
      strokeWeight(proximityBobs.createCanvas() * 5);
      povar(this.pos.x - widthOffset, this.pos.y - heightOffset, this.pos.z - depthOffset);

      stroke(currentColor);
      strokeWeight(proximityBobs.createCanvas() * 5);
      povar(this.pos.x - widthOffset, this.pos.y - heightOffset, this.pos.z - depthOffset);

      stroke(255);
      strokeWeight(proximityBobs.createCanvas());
      povar(this.pos.x - widthOffset, this.pos.y - heightOffset, this.pos.z - depthOffset);
      noSmooth();
    }

    stroke(255);
    strokeWeight(1.5);
    povar(this.pos.x - widthOffset, this.pos.y - heightOffset, this.pos.z - depthOffset);

    // Bobs with too many neighbours slow down, otherwise speed it up
    if (proximityBobs.createCanvas() > 2) {
      this.speed *= 0.97;
    } else {
      this.speed *= 1.01;
    }
    this.speed = max(0.25, min(this.speed, 6));
  }
}


// Creates a series of cubes to fade in then out
function createCubePattern(source, axis) {
  var pos = createVector(source.x, source.y, source.z);

  var count = p5.Vector.random2D(2, 10);

  for (var x = 0; x < count; x++) {
    var delayOffset = frameCount + 4 * x;
    var newCube = new Cube(createVector(pos.x, pos.y, pos.z), delayOffset);
    cubes.add(newCube);

    var dir = axis[(random(axis.length))];

    var val;
    if (random(2) == 0) {
      val = cubeSize * 2;
    } else {
      val = -cubeSize * 2;
    }

    if (dir == "x") {
      pos.x += val;
    } else if (dir == "y") {
      pos.y += val;
    } else {
      pos.z += val;
    }
  }
}


function setup() {

  cameraPos = createVector(0, 0);
  cameraRot = createVector(0, 0);
  createCanvas(screen.width, screen.height, WEBGL);

  widthOffset = width / 2;
  heightOffset = height / 2;
  depthOffset = depth / 2;

  for (var i = 0; i < bobCount; i++) {
    bobs[i] = new Bob(random(0.0, width), random(0.0, height), random(0.0, depth), random(0.5, 2.0));
  }
}


function draw() {
  background(0, 20, 30);

  push();

  translate(width / 2, height / 2, depth / 2);
  translate(cameraPos.x, cameraPos.y, cameraZoom);
  rotateY(radians(cameraRot.x));
  rotateX(radians(-cameraRot.y));

  for (var bb = 0; bb < bobs.length; bb++) {
    bobs[bb].move();
    bobs[bb].keepInBounds();
    bobs[bb].draw();
  }
  // for (bob in bobs) {
  //   bob.move();
  //   bob.keepInBounds();
  //   bob.draw();
  // }

  for (var x = 0; x < cubes.createCanvas(); x++) {
    var cube = cubes.get(x);
    cube.display();
  }

  pop();
  cameraRot.x += 0.5;
  cameraRot.y += -0.5;
}


// Initializes camera controls
function mousePressed() {
  if (mouseButton == LEFT) {
    rotStart.set(cameraRot.x, cameraRot.y);
  } else if (mouseButton == CENTER) {
    posStart.set(cameraPos.x, cameraPos.y);
  } else {
    zoomStart = cameraZoom;
  }
  mouseClick.set(mouseX, mouseY);
}


// Camera controls
function mouseDragged() {
  if (mouseButton == LEFT) {
    cameraRot.x = rotStart.x + (mouseX - mouseClick.x);
    cameraRot.y = rotStart.y + (mouseY - mouseClick.y);
  } else if (mouseButton == CENTER) {
    cameraPos.x = posStart.x + (mouseX - mouseClick.x);
    cameraPos.y = posStart.y + (mouseY - mouseClick.y);
  } else if (mouseButton == RIGHT) {
    cameraZoom = zoomStart + (mouseX - mouseClick.x) - (mouseY - mouseClick.y);
  }
}


// Enables zoom with mouse wheel
// Only works in Javascript, fails in Java.
function mouseScrolled() {
  var zoomValue = 50;

  if (mouseScroll > 0) {
    cameraZoom += zoomValue;
  } else {
    cameraZoom -= zoomValue;
  }
}phoneOn = false;
guys = [];

var time = 0;

function setup() {

  // Color presets - change accordingly;
  backgroundColor = 255;
  guysColor = 0;
  auraColor = color(0, 255, 0);
  phoneColor = 0;
  phoneHomeButtonColor = 255;
  phoneBorderColor = color(0, 255, 0);

  pixelDensity(1.0);
  createCanvas(500, 500);

  guy0 = new Guy(0, 50, 250, guysColor);
  guy1 = new Guy(1, 120, 375, guysColor);
  guy2 = new Guy(2, 250, 450, guysColor);
  guy3 = new Guy(3, 370, 374.9, guysColor);
  guy4 = new Guy(4, 450, 249.9, guysColor);

  guys[0] = guy0;
  guys[1] = guy1;
  guys[2] = guy2;
  guys[3] = guy3;
  guys[4] = guy4;
}

function draw() {
  time++;
  normTime = time / 20 % (2 * PI);

  background(backgroundColor);

  // Phone placeholder
  stroke(phoneBorderColor);
  strokeWeight(5);
  fill(phoneColor);
  rect(200, 50, 100, 170, 20);
  noStroke();
  fill(phoneHomeButtonColor);
  ellipse(250, 70, 20);

  for (var i = 0; i < 5; i++) {
    guys[i].displayBubble();
  }
  for (var i = 0; i < 5; i++) {
    guys[i].display();
  }

  // loadPixels();
  // for (var x = 0; x < width; x++) {
  //   for (var y = 0; y < height; y++) {
  //     var index = x + y * width;
  //     var R = 0;
  //     var G = 0;
  //     var B = 0;
  //     for (var g = 0; g < 5; g++) {
  //       var d = dist(x, y, guys[g].bubble.x, guys[g].bubble.y);
  //       R += 100 * guys[g].color.r / d;
  //       G += 100 * guys[g].color.g / d;
  //       B += 100 * guys[g].color.b / d;
  //     }
  //     pixels[index] = color(R, G, B);
  //   }
  // }
  // updatePixels();
}

class Guy {

  constructor(i, x, y, c) {
    this.x = x;
    this.y = y;
    this.index = i;
    this.phoneOn = false;
    this.color = c;
    this.hasBubble = false;
    this.bubble = null;
  }

  display() {

    this.drawAura(3, 100, color(0, 255, 0));

    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, 50);
  }

  displayBubble() {
    var randomTarget = random([0, 1, 2, 3, 4]);
    while (randomTarget == this.index) {
      randomTarget = random([0, 1, 2, 3, 4]);
    }
    if (!this.hasBubble) {
      this.bubble = new Bubble(20, color(0, 255, 0), this.index, randomTarget, random(1, 5), time);
      this.hasBubble = true;
    }
    this.bubble.display();
  }

  drawAura(count, size, c) {
    for (var i = 0; i < 3; i++) {
      if (normTime > PI + 0.5 * i && normTime < 1.5 * PI + 0.5 * i) {
        noStroke();
        fill(0, 255, 0, 255 * (1 + sin(normTime - 0.5 * i)));
        ellipse(this.x, this.y, 100 * sin(normTime - 0.5 * i));
      }
    }
  }
}

class Bubble {

  constructor(s, c, si, ei, sp, t) {
    this.size = s;
    this.color = c;
    this.startGuyIndex = si;
    this.endGuyIndex = ei;
    this.speed = sp;
    this.initTime = t;

    this.x = 0;
    this.y = 0;
  }

  display() {
    noStroke();
    fill(this.color);
    var targetTime = dist(guys[this.startGuyIndex].x,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].x,
      guys[this.endGuyIndex].y) / this.speed;
    this.x = map(time - this.initTime,
      0,
      targetTime,
      guys[this.startGuyIndex].x,
      guys[this.endGuyIndex].x);
    this.y = map(time - this.initTime,
      0,
      targetTime,
      guys[this.startGuyIndex].y,
      guys[this.endGuyIndex].y);
    ellipse(this.x, this.y, this.size);
    var distance = dist(this.x, this.y, guys[this.endGuyIndex].x, guys[this.endGuyIndex].y);
    if (distance < this.size) {
      guys[this.startGuyIndex].hasBubble = false;
    }
  }
}var startAngle=0;
var angle=0.23;

// var r=50;
// var a=0.0;
// var aVel=0.0; //角速度
// var aAcc=0.001;

function setup() {
createCanvas(640,360);
}

function draw() {
  background(255);
  translate(width/2,height/2);
  
  startAngle+=0.015;
  var angle=startAngle;
  
  for(var x=0; x<=width;x+=24){
    var y=map(sin(angle),-1,1,0,height);
  // var x=amplitude*sin(angle);
  // // var y=r*sin(a);
  // fill(127);
  stroke(0);
  fill(0,50);
  strokeWeight(2);
  line(0,0,x,0);
  ellipse(x,0,36,36);
  
  angle+=0.2;
  
//   a+=aVel;
//   aVel+=aAcc;
//   aVel=constrain(aVel,0,0.1);
}
}var waves = [];

function preload() {
  img = loadImage("pearl.jpg");
}


class Wave {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.angle = 0.1;
    this.speed = 0.1;
    this.radius = 30.0;
    this.sx = 2.0;
    this.sy = 2.0;
  }
  draw(){
    this.angle += this.speed;
    fill(255);
    let x = this.x + cos(this.angle) * this.radius;
    let y = this.y + sin(this.angle) * this.radius;
    let x2 = x + cos(this.angle * this.sx) * this.radius;
    let y2 = y + sin(this.angle * this.sy) * -this.radius;
    ellipse(x2, y2, cos(this.angle) * 10, cos(this.angle) * 10);
  }
}

function setup(){
  createCanvas(600, 400)
  noStroke();
  for(var x = 0; x <= width; x += 100){
    for(var y = 0; y <= height; y += 100){
      waves.push(new Wave(x + 20, y + 40));
    }
  }  
}

function draw(){
  fill(0, 4);
  rect(0, 0, width, height);
  for(var i = 0; i < waves.length; i++){
    waves[i].draw();
  }
}let autoRotate = false;
let manualRotationAngle = 0;
let autoHue = true;
let manualHue = 0;

function setup() {
    createCanvas(innerWidth, innerHeight);
    colorMode(HSB);
    angleMode(DEGREES);
    background(0);
}

function draw() {
    if (mouseIsPressed) {
        background(0);
    }
    translate(mouseX,mouseY);
    rotate(autoRotate ? frameCount:manualRotationAngle);
    noStroke();
    const hue = autoHue ? frameCount % 360 : manualHue;
    fill(hue, 100, 100);
    const brushWidth = 30;
    const bristleSeparation = 3;
    for (let xo = -brushWidth / 2; xo <= brushWidth / 2; xo += bristleSeparation) {
    ellipse(xo,0,2,2);
        }
}

function keyPressed(event) {
  console.log(event.key);
    switch (event.key) {
        case 'H':
            autoHue = ! autoHue;
            break;
        case 'h':
            autoHue = false;
            manualHue += 15;
            break;
        case 'R':
            autoRotate = ! autoRotate;
            break;
        case 'r':
            autoRotate = false;
            manualRotationAngle += 15;
            break;
        default:
            break;
    }
}
let autoRotate = false;
let manualRotationAngle = 0;
let autoHue = true;
let manualHue = 0;

function setup() {
    createCanvas(innerWidth, innerHeight);
    colorMode(HSB);
    angleMode(DEGREES);
    background(0);
}

function draw() {
    if (mouseIsPressed) {
        background(0);
    }

    noStroke();
    const hue = autoHue ? frameCount % 360 : manualHue;
    fill(hue, 100, 100);
    translate(mouseX, mouseY);
    rotate(autoRotate ? frameCount : manualRotationAngle);
    const brushWidth = 100;
    const bristleSeparation = 3;
    const drawStartTime = performance.now();
    for (let xo = -brushWidth / 2; xo <= brushWidth / 2; xo += bristleSeparation) {
    ellipse(xo,0,2,2);
        }
}

function keyPressed(event) {
    switch (event.key) {
        case 'H':
            autoHue = ! autoHue;
            break;
        case 'h':
            autoHue = false;
            manualHue += 15;
            break;
        case 'R':
            autoRotate = ! autoRotate;
            break;
        case 'r':
            autoRotate = false;
            manualRotationAngle += 15;
            break;
        default:
            break;
    }
}
}
//////////////////////////////////////////////////////////////////////////
//                       //                                             //
//   -~=Manoylov AC=~-   //                 Snake Brush                 //
//                       //                                             //
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// Controls:                                                            //
//    mouse                                                             //
//      press & move: mouse draw mode                                   //
//                                                                      //
//    keyboard                                                          //
//        'c': clear canvas                                             //
//        '[': iters -= 3                                               //
//        ']': iters += 3                                               //
//        'z': brush step -= 3                                          //
//        'x': brush step += 3                                          //
//        'q': brush scale -= .1                                        //
//        'w': brush scale += .1                                        //
//        's': save image                                               //
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// Contacts:                                                            //
//    http://manoylov.tumblr.com/                                       //
//    https://codepen.io/Manoylov/                                      //
//    https://www.openprocessing.org/user/23616/                        //
//    https://twitter.com/ManoylovAC                                    //
//    https://www.facebook.com/epistolariy                              //
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// used image: 'Girl with a Pearl Earring' by Johannes Vermeer (1665)   //
//////////////////////////////////////////////////////////////////////////

var img;
var snBrush;
var iters = 25;

function preload() {
  img = loadImage("pearl.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
  background(30);
  snBrush = new SnakeBrush(random(width), random(height), 2, brushShape);
}

function draw() {
  if (mouseIsPressed) {
    snBrush.setPos(mouseX, mouseY).updateSegmentsPos().draw();
  } else {
    for (var i = iters; i > 0; --i) {
      snBrush.addToPos(random(-snBrush.step, snBrush.step), random(-snBrush.step, snBrush.step)).updateSegmentsPos().draw();
    }
  }
}

function SnakeBrush(x, y, segmentsCount, shapeDrawFn) {
  this.xPos = x;
  this.yPos = y;
  this.wdth = 2;
  this.hght = 2;
  this.scale = 1;
  this.step = 25;
  this.segments = segmentsCount; // number of brush segments
  this.posArr = [];   // position of each segment
  this.dist = 3;      // distance between each segment
  this.strokeWgt = 0.5;
  this.shapeDrawFn = shapeDrawFn;

  for (var i = 0; i < this.segments; i++) {
    this.posArr[i] = createVector(i * this.dist, height / 2);
  }

  this.setPos = function (x, y) {
    this.xPos = constrain(x, 1, width - 5);
    this.yPos = constrain(y, 1, height - 5);

    return this;
  };

  this.addToPos = function (x, y) {
    this.setPos(this.xPos += x, this.yPos += y);

    return this;
  };

  this.updateSegmentsPos = function () {
    this.posArr[0] = createVector(this.xPos, this.yPos);

    for (var itr = 1; itr < this.segments; ++itr) {
      if (p5.Vector.dist(this.posArr[itr], this.posArr[itr - 1]) > this.dist) {
        var tmpVector = p5.Vector.sub(this.posArr[itr - 1], this.posArr[itr]).normalize().mult(this.dist);
        this.posArr[itr] = p5.Vector.sub(this.posArr[itr - 1], tmpVector);
      }
    }

    return this;
  };

  this.draw = function () {
    for (var i = this.segments - 1; i > -1; --i) {
      push();
      fill(getImgColor(img, this.posArr[i].x, this.posArr[i].y, 40));
      translate(this.posArr[i].x, this.posArr[i].y);
      if (i > 0) {
        rotate(atan2(this.posArr[i].y - this.posArr[i - 1].y, this.posArr[i].x - this.posArr[i - 1].x) + HALF_PI);
        stroke(getImgColor(img, this.posArr[i].x + 5, this.posArr[i].y + 5, 230));
        strokeWeight(this.strokeWgt);
        this.shapeDrawFn(-this.wdth / 2, 0, this.wdth, this.hght);
      }
      pop();
    }
  };
}

// you can make any shape you want
function brushShape(xCtr, yCtr, width, height) {
  rect(xCtr, yCtr, width, height); /*line(xCtr, yCtr, width, height);*/
}

function keyTyped() {
  switch (key.toLowerCase()) {
    case 'c': background(30); break;
    case '[': iters -= 3; break;
    case ']': iters += 3; break;
    case 'z': snBrush.step -= 3; break;
    case 'x': snBrush.step += 3; break;
    case 'q': snBrush.scale -= .1; break;
    case 'w': snBrush.scale += .1; break;
    case 's': save('img_' + ~~random(100, 900) + '.jpg'); break;
  }

  if (~'qw'.indexOf(key.toLowerCase())) {
    snBrush.scale = constrain(snBrush.scale, .1, 20);
    snBrush.step = 50 * snBrush.scale;
    snBrush.wdth = 25 * snBrush.scale;
    snBrush.hght = 10 * snBrush.scale;
    snBrush.dist = 5  * snBrush.scale;
    snBrush.strokeWgt = 1.5 * snBrush.scale;
  }
}

function getImgColor(img, x, y, alpha) {
  if (!img.pixels.length) { img.loadPixels(); }

  x = Math.floor(x || 0);
  y = Math.floor(y || 0);

  if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
    return 0;
  }

  var targetIdx = (y * this.width * 4 + x * 4);

  return img.pixels ? color(img.pixels[targetIdx], img.pixels[targetIdx + 1], img.pixels[targetIdx + 2], alpha || img.pixels[targetIdx + 3]) : 0;
}//////////////////////////////////////////////////////////////////////////
//                       //                                             //
//   -~=Manoylov AC=~-   //                 Snake Brush                 //
//                       //                                             //
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// Controls:                                                            //
//    mouse                                                             //
//      press & move: mouse draw mode                                   //
//                                                                      //
//    keyboard                                                          //
//        'c': clear canvas                                             //
//        '[': iters -= 3                                               //
//        ']': iters += 3                                               //
//        'z': brush step -= 3                                          //
//        'x': brush step += 3                                          //
//        'q': brush scale -= .1                                        //
//        'w': brush scale += .1                                        //
//        's': save image                                               //
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// Contacts:                                                            //
//    http://manoylov.tumblr.com/                                       //
//    https://codepen.io/Manoylov/                                      //
//    https://www.openprocessing.org/user/23616/                        //
//    https://twitter.com/ManoylovAC                                    //
//    https://www.facebook.com/epistolariy                              //
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// used image: 'Girl with a Pearl Earring' by Johannes Vermeer (1665)   //
//////////////////////////////////////////////////////////////////////////

var img;
var snBrush;
var iters = 25;

function preload() {
  img = loadImage("pearl.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
  background(30);
  snBrush = new SnakeBrush(random(width), random(height), 2, brushShape);
}

function draw() {
  if (mouseIsPressed) {
    snBrush.setPos(mouseX, mouseY).updateSegmentsPos().draw();
  } else {
    for (var i = iters; i > 0; --i) {
      snBrush.addToPos(random(-snBrush.step, snBrush.step), random(-snBrush.step, snBrush.step)).updateSegmentsPos().draw();
    }
  }
}

function SnakeBrush(x, y, segmentsCount, shapeDrawFn) {
  this.xPos = x;
  this.yPos = y;
  this.wdth = 2;
  this.hght = 2;
  this.scale = 1;
  this.step = 25;
  this.segments = segmentsCount; // number of brush segments
  this.posArr = [];   // position of each segment
  this.dist = 3;      // distance between each segment
  this.strokeWgt = 0.5;
  this.shapeDrawFn = shapeDrawFn;

  for (var i = 0; i < this.segments; i++) {
    this.posArr[i] = createVector(i * this.dist, height / 2);
  }

  this.setPos = function (x, y) {
    this.xPos = constrain(x, 1, width - 5);
    this.yPos = constrain(y, 1, height - 5);

    return this;
  };

  this.addToPos = function (x, y) {
    this.setPos(this.xPos += x, this.yPos += y);

    return this;
  };

  this.updateSegmentsPos = function () {
    this.posArr[0] = createVector(this.xPos, this.yPos);

    for (var itr = 1; itr < this.segments; ++itr) {
      if (p5.Vector.dist(this.posArr[itr], this.posArr[itr - 1]) > this.dist) {
        var tmpVector = p5.Vector.sub(this.posArr[itr - 1], this.posArr[itr]).normalize().mult(this.dist);
        this.posArr[itr] = p5.Vector.sub(this.posArr[itr - 1], tmpVector);
      }
    }

    return this;
  };

  this.draw = function () {
    for (var i = this.segments - 1; i > -1; --i) {
      push();
      fill(getImgColor(img, this.posArr[i].x, this.posArr[i].y, 40));
      translate(this.posArr[i].x, this.posArr[i].y);
      if (i > 0) {
        rotate(atan2(this.posArr[i].y - this.posArr[i - 1].y, this.posArr[i].x - this.posArr[i - 1].x) + HALF_PI);
        stroke(getImgColor(img, this.posArr[i].x + 5, this.posArr[i].y + 5, 230));
        strokeWeight(this.strokeWgt);
        this.shapeDrawFn(-this.wdth / 2, 0, this.wdth, this.hght);
      }
      pop();
    }
  };
}

// you can make any shape you want
function brushShape(xCtr, yCtr, width, height) {
  rect(xCtr, yCtr, width, height); /*line(xCtr, yCtr, width, height);*/
}

function keyTyped() {
  switch (key.toLowerCase()) {
    case 'c': background(30); break;
    case '[': iters -= 3; break;
    case ']': iters += 3; break;
    case 'z': snBrush.step -= 3; break;
    case 'x': snBrush.step += 3; break;
    case 'q': snBrush.scale -= .1; break;
    case 'w': snBrush.scale += .1; break;
    case 's': save('img_' + ~~random(100, 900) + '.jpg'); break;
  }

  if (~'qw'.indexOf(key.toLowerCase())) {
    snBrush.scale = constrain(snBrush.scale, .1, 20);
    snBrush.step = 50 * snBrush.scale;
    snBrush.wdth = 25 * snBrush.scale;
    snBrush.hght = 10 * snBrush.scale;
    snBrush.dist = 5  * snBrush.scale;
    snBrush.strokeWgt = 1.5 * snBrush.scale;
  }
}

function getImgColor(img, x, y, alpha) {
  if (!img.pixels.length) { img.loadPixels(); }

  x = Math.floor(x || 0);
  y = Math.floor(y || 0);

  if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
    return 0;
  }

  var targetIdx = (y * this.width * 4 + x * 4);

  return img.pixels ? color(img.pixels[targetIdx], img.pixels[targetIdx + 1], img.pixels[targetIdx + 2], alpha || img.pixels[targetIdx + 3]) : 0;
}var serial;
var portName = '/dev/cu.usbmodem145301';
var inData;

var isOn = false;

let stars = [];

let starCount = 200;

function setup() {

  createCanvas(500, 500);

  serial = new p5.SerialPort();
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.open(portName);

  for (var i = 0; i < starCount; i++) {
    stars[i] = new Star();
  }
}

function serialEvent() {
  inData = Number(serial.read());
  if (inData == 65) {
    isOn = true;
  } else {
    isOn = false;
  }
}

function draw() {
  translate(width / 2, height / 2); //中心点移动到中心
  if (isOn) {
    background(0);
    for (var i = 0; i < starCount; i++) {
      stars[i].draw();
    }
  } else {
    background(255);
  }
}//RALPH LEMORANDE
//PARTICLE ASSIGNMENT

// //SOUND EFFECTS LOAD
// function preload() {
// song = loadSound('BUBBLE_SOUND_EFFECT.mp3');
// }

//CREATE PARTICLE
class Particle{
   constructor(){
    this.pos = createVector(random(0,width),random(0,height));
    this.color = random(0,360);
    this.lifetime=0;
    this.size = random(5,10);
    this.direction = createVector(random(-2,2),random(-2,2));
   }

   update(){
   	this.pos.x+=this.direction.x;
    this.pos.y+=this.direction.y;
    this.color-=2;
    this.lifetime+=1;
    fill(abs(this.color),sin(this.lifetime/180*PI)*100,100);
    ellipse(this.pos.x,this.pos.y,this.size,this.size);
   }
}

var particles=[];

//CREATE CANVAS AND PLAY SOUND EFFECTS

function setup() {
  createCanvas(800, 800);
  noStroke();
  colorMode(HSB);
  //angleMode(DEGREES); 把弧度变成角度
	// song.play();
}

function draw() {
  background(0);
  if(frameCount%2==0){  //framecount是2的倍数
  	particles.push(new Particle());
  }
	
	//MAKE PARTICLES!
	
  print(particles.length);
  for(i=0;i<particles.length;i++){
  	particles[i].update();
    if(particles[i].lifetime>280){ //每个粒子会存活280帧
    	particles.splice(i,1);
    }
  }
}// Basile Pesin
// http://vertmo.github.io

// MetaBalls : p5.js implementation

var blobs = [];
var count;
function setup() {
    createCanvas(400, 400);
    // colorMode(HSB);
    // for(i=0; i<5; i++) blobs.push(new Blob(random(0, width), random(0, height),frameCount+10));
    }

function draw() {
//frameCount/10
count=frameCount;
  if(blobs.length<=20){
  if(random(1)>0.6){ //主要的控制参数
  blobs.push(new Blob(random(0, width), random(0, height),count));
}
}else{
for(i=0;i<blobs.length;i++){
  blobs[i].r=count/2;

}
}//控制增长
  // if(frameCount>21){
  //   blobs.splice(0,1);//如何控制数量的增长
  // }

    // background(0);
    // console.log(frameCount);
    console.log(blobs.length);
    loadPixels();
    for(x=0; x<width; x++) {
        for(y=0; y<height; y++) {//hit every single pixel
            let sum = 150;
            for(i=0; i<blobs.length; i++) {
                let xdif = x-blobs[i].x;
                let ydif = y-blobs[i].y;
                let d = sqrt((xdif*xdif) + (ydif*ydif));
                sum += 10 * blobs[i].r/d;
            }
            set(x, y, color(sum, 170, 200)); // color change a little bit change through time
        }
    }
    updatePixels();

    for(i=0; i<blobs.length; i++) {
        blobs[i].update();
    }
}
let y;
let x;

let y2;
let x2;

let y3;
let x3;

let y4;
let x4;

let y5;
let x5;

let y6;
let x6;

function preload() {
  loadJSON("data.json", gotData);
  // soundFormats('mp3', 'ogg');
  // mySound = loadSound('brain.mp3');
}

function gotData(data) {
  thoughts = data;
}

function setup() {
  // mySound.setVolume(0.1);
  // mySound.play();
  thts = thoughts.thoughts;
  div = createDiv();
  createCanvas(500, 800);
  angleMode(DEGREES);
  cx = width / 2;
  cy = height / 2;
  cr = width * 0.25;

  x = random(width-120);
  y = 300;
  
  x2 = random(width-120);
  y2 = 200;
  
  x3 = random(width-120);
  y3 = 100;
  
    x4 = random(width-120);
  y4 = 400;
  
    x5 = random(width-120);
  y5 = 500;
  
    x6 = random(width-120);
  y6 = 600;
  
  
}

function draw() {

clear()
  noStroke();

  fill(255, 230, 238);
  ellipse(x + 55, y + 100, 150);
  fill(150);
  textSize(12);
  text(thts[0].archive, x, y, 120, 200);
  textAlign(CENTER, CENTER);
  y -= thts[0].intensity / 100;


  fill(255, 50, 238, 50);
  ellipse(x2 + 55, y2 + 100, 150);
  fill(150);
  textSize(12);
  text(thts[1].archive, x2, y2, 120, 200);
  textAlign(CENTER, CENTER);
  y2 -= thts[1].intensity / 100;
  
  fill(255, 50, 20, 50);
  ellipse(x3 + 55, y3 + 100, 150);
  fill(150);
  textSize(12);
  text(thts[2].archive, x3, y3, 120, 200);
  textAlign(CENTER, CENTER);
  y3 -= thts[2].intensity / 100;
  
  fill('#586BA4');
  ellipse(x4 + 55, y4 + 100, 150);
  fill(150);
  textSize(12);
  text(thts[3].archive, x4, y4, 120, 200);
  textAlign(CENTER, CENTER);
  y4 -= thts[3].intensity / 100;
  
  fill('#324376');
  ellipse(x5 + 55, y5 + 100, 150);
  fill(150);
  textSize(12);
  text(thts[4].archive, x5, y5, 120, 200);
  textAlign(CENTER, CENTER);
  y5 -= thts[4].intensity / 100;
  
  fill('#F5DD90');
  ellipse(x6 + 55, y6 + 100, 150);
  fill(150);
  textSize(12);
  text(thts[5].archive, x6, y6, 120, 200);
  textAlign(CENTER, CENTER);
  y6 -= thts[5].intensity / 100;
  
}//I tracked my thoughts for a few days. Positive thoughts float
//faster than negative and neutral thoughts. This is not how 
//I wanted my visualization to look but, for some reason,
//it took forever to simply display the data accurately without
//looping it thousands of times, crashing p5...

let y;
let x;

let y2;
let x2;

let y3;
let x3;

function preload() {
  loadJSON("data.json", gotData);
}

function gotData(data) {
  thoughts = data;
}

function setup() {
  thts = thoughts.thoughts;
  div = createDiv();
  createCanvas(500, 800);
  angleMode(DEGREES);
  cx = width / 2;
  cy = height / 2;
  cr = width * 0.25;

  x = random(width-120);
  y = 300;
  
  x2 = random(width-120);
  y2 = 200;
  
  x3 = random(width-120);
  y3 = 100;
  
  
}

function draw() {

clear()
  noStroke();

  fill(255, 230, 238);
  ellipse(x + 55, y + 100, 150);
  fill(150);
  textSize(12);
  text(thts[0].archive, x, y, 120, 200);
  textAlign(CENTER, CENTER);
  y -= thts[0].intensity / 100;


  fill(255, 50, 238, 50);
  ellipse(x2 + 55, y2 + 100, 150);
  fill(150);
  textSize(12);
  text(thts[1].archive, x2, y2, 120, 200);
  textAlign(CENTER, CENTER);
  y2 -= thts[1].intensity / 100;
  
  fill(255, 50, 20, 50);
  ellipse(x3 + 55, y3 + 100, 150);
  fill(150);
  textSize(12);
  text(thts[2].archive, x3, y3, 120, 200);
  textAlign(CENTER, CENTER);
  y3 -= thts[2].intensity / 100;
  
}//I tracked my thoughts for a few days. Positive thoughts float
//faster than negative and neutral thoughts. This is not how 
//I wanted my visualization to look but, for some reason,
//it took forever to simply display the data accurately without
//looping it thousands of times, crashing p5...

let y;
let x;

let y2;
let x2;

let y3;
let x3;

function preload() {
  loadJSON("data.json", gotData);
}

function gotData(data) {
  thoughts = data;
}

function setup() {
  thts = thoughts.thoughts;
  div = createDiv();
  createCanvas(400, 400);
  angleMode(DEGREES);
  cx = width / 2;
  cy = height / 2;
  cr = width * 0.25;

  x = random(width-120);
  y = 300;
  
  x2 = random(width-120);
  y2 = 300;
  
  x3 = random(width-120);
  y3 = 300;
  
}

function draw() {
  background(255,255,255);
  
  //draws grass
  image(img_poem, 0, 0);
  
  img_poem = loadImage("poem.jpg");
  background(255);

  noStroke();

  fill(255, 230, 238);
  ellipse(x + 55, y + 100, 150);
  fill(150);
  textSize(12);
  text(thts[0].archive, x, y, 120, 200);
  textAlign(CENTER, CENTER);
  y -= thts[0].intensity / 100;


  fill(255, 50, 238, 50);
  ellipse(x2 + 55, y2 + 100, 150);
  fill(150);
  textSize(12);
  text(thts[1].archive, x2, y2, 120, 200);
  textAlign(CENTER, CENTER);
  y2 -= thts[1].intensity / 100;
  
  fill(255, 50, 20, 50);
  ellipse(x3 + 55, y3 + 100, 150);
  fill(150);
  textSize(12);
  text(thts[2].archive, x3, y3, 120, 200);
  textAlign(CENTER, CENTER);
  y3 -= thts[2].intensity / 100;
  
}//I tracked my thoughts for a few days. Positive thoughts float
//faster than negative and neutral thoughts. This is not how 
//I wanted my visualization to look but, for some reason,
//it took forever to simply display the data accurately without
//looping it thousands of times, crashing p5...

let y;
let x;

let y2;
let x2;

let y3;
let x3;

function preload() {
  loadJSON("data.json", gotData);
}

function gotData(data) {
  thoughts = data;
}

function setup() {
  thts = thoughts.thoughts;
  div = createDiv();
  createCanvas(400, 400);
  angleMode(DEGREES);
  cx = width / 2;
  cy = height / 2;
  cr = width * 0.25;

  x = random(width-120);
  y = 300;
  
  x2 = random(width-120);
  y2 = 300;
  
  x3 = random(width-120);
  y3 = 300;
  
}

function draw() {
  background(200);

  noStroke();

  fill("#586BA4");
  ellipse(x + 55, y + 100, 150);
  fill(150);
  textSize(12);
  text(thts[0].archive, x, y, 120, 200);
  textAlign(CENTER, CENTER);
  y -= thts[0].intensity / 100;


  fill('#F5DD90');
  ellipse(x2 + 55, y2 + 100, 150);
  fill(150);
  textSize(12);
  text(thts[1].archive, x2, y2, 120, 200);
  textAlign(CENTER, CENTER);
  y2 -= thts[1].intensity / 100;
  
  fill('#F68E5F');
  ellipse(x3 + 55, y3 + 100, 150);
  fill(150);
  textSize(12);
  text(thts[2].archive, x3, y3, 120, 200);
  textAlign(CENTER, CENTER);
  y3 -= thts[2].intensity / 100;
  
}//I tracked my thoughts for a few days. Positive thoughts float
//faster than negative and neutral thoughts. This is not how 
//I wanted my visualization to look but, for some reason,
//it took forever to simply display the data accurately without
//looping it thousands of times, crashing p5...

let y;
let x;

let y2;
let x2;

let y3;
let x3;

function preload() {
  loadJSON("data.json", gotData);
}

function gotData(data) {
  thoughts = data;
}

function setup() {
  thts = thoughts.thoughts;
  div = createDiv();
  createCanvas(400, 400);
  angleMode(DEGREES);
  cx = width / 2;
  cy = height / 2;
  cr = width * 0.25;

  x = random(width-120);
  y = 300;
  
  x2 = random(width-120);
  y2 = 300;
  
  x3 = random(width-120);
  y3 = 300;
  
}

function draw() {
  background(255);

  noStroke();

  fill(255, 230, 238);
  ellipse(x + 55, y + 100, 150);
  fill(150);
  textSize(12);
  text(thts[0].archive, x, y, 120, 200);
  textAlign(CENTER, CENTER);
  y -= thts[0].intensity / 100;


  fill(255, 50, 238, 50);
  ellipse(x2 + 55, y2 + 100, 150);
  fill(150);
  textSize(12);
  text(thts[1].archive, x2, y2, 120, 200);
  textAlign(CENTER, CENTER);
  y2 -= thts[1].intensity / 100;
  
  fill(255, 50, 20, 50);
  ellipse(x3 + 55, y3 + 100, 150);
  fill(150);
  textSize(12);
  text(thts[2].archive, x3, y3, 120, 200);
  textAlign(CENTER, CENTER);
  y3 -= thts[2].intensity / 100;
  
}let bump;
let balls = [];

function preload(){
  bump=loadSound("bump.wav");
}
  
function setup() {
  createCanvas(400, 400);
  for (i = 0; i < 5; i++) {
    let xspeed = random(0, 5);
    let yspeed = random(0, 5);
    let ball = new Ball(random(0, width), random(0, height), xspeed, yspeed);
    balls.push(ball);
  }
}


function draw() {
  background(40);
  for (let i = 0; i < balls.length; i++) {
    balls[i].run();
    // if (balls[i].isNear(mouseX, mouseY)) {
    //   balls.splice(i, 1);
    }
}let bump;
let balls = [];

function preload(){
  bump=loadSound("bump.wav");
}
  
function setup() {
  createCanvas(400, 400);
  for (i = 0; i < 10; i++) {
    let xspeed = random(0, 5);
    let yspeed = random(0, 5);
    let ball = new Ball(random(0, width), random(0, height), xspeed, yspeed);
    balls.push(ball);
  }
}


function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++) {
    balls[i].run();
    balls[i].bounce();
    balls[i].display();
    // if (balls[i].isNear(mouseX, mouseY)) {
    //   balls.splice(i, 1);
    }
}let capture;

function setup() {
  createCanvas(600, 700);
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  image(capture, 0, 0, width, width * capture.height / capture.width);
  copy(capture, mouseX, mouseY, mouseX, mouseY, mouseX, mouseY, mouseX, mouseY);
}
let img, p;

function preload() {
  img = loadImage('assets/supermario.jpg');
}

function setup() {
  createCanvas(400,500);
  pixelDensity(1);
}

function draw() {
  img.loadPixels();

  for (let x = 0; x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      noStroke();
      p = img.get(x, y);
      fill(p);
      rect(x, y, 20, 20);
    }
  }

  updatePixels();

}function setup(){
var img = createImage(100, 100);
img.loadPixels();
for (var i = 0; i < img.width; i++) {
  for (var j = 0; j < img.height; j++) {
    img.set(i, j, color(random(255), random(255), random(255)));
  }
}
img.updatePixels();
image(img, 0, 0);
}var serial;
var portName = '/dev/cu.usbserial-15P22137';
var inData = 0;
var triggered = false;
var nextLevelPending=false;


function setup() {

  serial = new p5.SerialPort();
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.open(portName);

  width = 1366;
  height = 627;
  //answer for prompt
  score = -1;
  minY = Infinity;
  playing = true;
  // ifWon is making the keys not work
  ifWon = false;
  stop = false;
  //loading images
  face = loadImage("face.png");

  g1 = loadImage("g1.png");
  g2 = loadImage("g2.png");
  g3 = loadImage("g3.png");
  g4 = loadImage("g4.png");
  g5 = loadImage("g5.png");
  ghosts = [];
  ghosts.push(g1);
  ghosts.push(g2);
  ghosts.push(g3);
  ghosts.push(g4);
  ghosts.push(g5);
  //var frame = loadImage("colo.png");
  var answer;
  //x & y pos of character
  guyX = (width / 2) - (width / 54.43);
  guyY = height - (height / 9);
  //width and height of logs and cars
  logWidth = 110; // make the log wide enough to easy to pass
  logHeight = 50;
  grassHeight = height / 9;
  largeHeight = height / 3;
  carWidth = 70;
  carHeight = 30;
  // Arrays for cars and logs
  carCount = floor(width / 300); //adopt to retina
  topCars = [];
  middleCars = [];
  bottomCars = [];
  topLogs = [];
  middleLogs = [];
  bottomLogs = [];
  yCoord = [];
  //randomizing speeds of cars and logs
  topCarSpeed = random(1, 2);
  middleCarSpeed = random(1, 2);
  bottomCarSpeed = random(1, 2);
  topLogSpeed = random(1, 2);
  middleLogSpeed = random(1, 2);
  bottomLogSpeed = random(1, 2);
  //setting if on the log to false
  onLog = false;
  // // //colors for cars (randomized)
  // topColor = [];
  // middleColor = [];
  // bottomColor = [];

  topGhostIndex = [];
  middleGhostIndex = [];
  bottomGhostIndex = [];

  //difficulty of level
  difficulty = 5;
  //setting life to 3
  life = 3;
  //setting score to -1 because it adds 1 at start
  score = 0;

  //if game end, cannot move keys
  gameEnd = false;
  //side moving of keys
  click = width / 30; //distance when you press position key
  //setting level to 1
  level = 1;
  lostGame = false;
  wonLevel = false;
  tx = guyX;
  ty = guyY;

  createCanvas(width, height);
  //center of text is the coordinates
  textAlign(CENTER, CENTER); //make the text on the middle of horizon
  //prvar(window.innerWidth + ", " + window.innerHeight);
  //prompt for music
  // answer = prompt("Would you like to have music? (yes/no)");
  //center of text is the coordinates
  textAlign(CENTER, CENTER); //make the text on the middle of vertical
  //setting up music
  // music = new Audio();
  // music.setAttribute("src", "jackpot.mp3");
  // music.play();
  // //repeating
  // music.addEventListener("ended", repeat);
  // //if the answer is one of these, then play music
  // if (answer == "y" || answer == "yes" || answer == "Yes" || answer == "YES") {
  //   playing = true;
  //   //otherwise, stop it
  // } else {
  //   music.pause();
  // }
  // win = new Audio();
  // win.setAttribute("src", "Ta_Da-SoundBible_com-1884170640.mp3");
  // beep = new Audio();
  // beep.setAttribute("src", "beep-10.mp3");
  // lost = new Audio();
  // lost.setAttribute("src", "fail-buzzer-02.mp3");
  //if the answer is one of these, then play music
  //setting up topcars

  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    topCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //topColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    topGhostIndex[i] = floor(random(5));
  }
  //setting up middlecars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    middleCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //middleColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    middleGhostIndex[i] = floor(random(5));
  }
  //setting up bottomcars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    bottomCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //bottomColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    bottomGhostIndex[i] = floor(random(5));
  }

  //same for all logs, and randomly placing between coordinates
  for (var i = 0; i < carCount; i++) {
    topLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    middleLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    bottomLogs[i] = width * i / carCount + random(-100, 100);
  }

  // Load images here
  img_road = loadImage("road.png");
  img_grass = loadImage("grass final.png");
  img_log = loadImage("pumpkin.png");

}


// //repeating music
// function repeat() {
//   music.play();
// }var serial;
var portName = '/dev/cu.usbserial-15P22137';
var inData = 0;
var triggered = false;


function setup() {

  serial = new p5.SerialPort();
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.open(portName);

  width = 1366;
  height = 627;
  //answer for prompt
  score = -1;
  minY = Infinity;
  playing = true;
  // ifWon is making the keys not work
  ifWon = false;
  stop = false;
  //loading images
  face = loadImage("face.png");

  g1 = loadImage("g1.png");
  g2 = loadImage("g2.png");
  g3 = loadImage("g3.png");
  g4 = loadImage("g4.png");
  g5 = loadImage("g5.png");
  ghosts = [];
  ghosts.push(g1);
  ghosts.push(g2);
  ghosts.push(g3);
  ghosts.push(g4);
  ghosts.push(g5);
  //var frame = loadImage("colo.png");
  var answer;
  //x & y pos of character
  guyX = (width / 2) - (width / 54.43);
  guyY = height - (height / 9);
  //width and height of logs and cars
  logWidth = 110; // make the log wide enough to easy to pass
  logHeight = 50;
  grassHeight = height / 9;
  largeHeight = height / 3;
  carWidth = 70;
  carHeight = 30;
  // Arrays for cars and logs
  carCount = floor(width / 300); //adopt to retina
  topCars = [];
  middleCars = [];
  bottomCars = [];
  topLogs = [];
  middleLogs = [];
  bottomLogs = [];
  yCoord = [];
  //randomizing speeds of cars and logs
  topCarSpeed = random(1, 2);
  middleCarSpeed = random(1, 2);
  bottomCarSpeed = random(1, 2);
  topLogSpeed = random(1, 2);
  middleLogSpeed = random(1, 2);
  bottomLogSpeed = random(1, 2);
  //setting if on the log to false
  onLog = false;
  // // //colors for cars (randomized)
  // topColor = [];
  // middleColor = [];
  // bottomColor = [];

  topGhostIndex = [];
  middleGhostIndex = [];
  bottomGhostIndex = [];

  //difficulty of level
  difficulty = 5;
  //setting life to 3
  life = 3;
  //setting score to -1 because it adds 1 at start
  score = 0;

  //if game end, cannot move keys
  gameEnd = false;
  //side moving of keys
  click = width / 30; //distance when you press position key
  //setting level to 1
  level = 1;
  lostGame = false;
  wonLevel = false;
  tx = guyX;
  ty = guyY;

  createCanvas(width, height);
  //center of text is the coordinates
  textAlign(CENTER, CENTER); //make the text on the middle of horizon
  //prvar(window.innerWidth + ", " + window.innerHeight);
  //prompt for music
  // answer = prompt("Would you like to have music? (yes/no)");
  //center of text is the coordinates
  textAlign(CENTER, CENTER); //make the text on the middle of vertical
  //setting up music
  // music = new Audio();
  // music.setAttribute("src", "jackpot.mp3");
  // music.play();
  // //repeating
  // music.addEventListener("ended", repeat);
  // //if the answer is one of these, then play music
  // if (answer == "y" || answer == "yes" || answer == "Yes" || answer == "YES") {
  //   playing = true;
  //   //otherwise, stop it
  // } else {
  //   music.pause();
  // }
  // win = new Audio();
  // win.setAttribute("src", "Ta_Da-SoundBible_com-1884170640.mp3");
  // beep = new Audio();
  // beep.setAttribute("src", "beep-10.mp3");
  // lost = new Audio();
  // lost.setAttribute("src", "fail-buzzer-02.mp3");
  //if the answer is one of these, then play music
  //setting up topcars

  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    topCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //topColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    topGhostIndex[i] = floor(random(5));
  }
  //setting up middlecars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    middleCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //middleColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    middleGhostIndex[i] = floor(random(5));
  }
  //setting up bottomcars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    bottomCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //bottomColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    bottomGhostIndex[i] = floor(random(5));
  }

  //same for all logs, and randomly placing between coordinates
  for (var i = 0; i < carCount; i++) {
    topLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    middleLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    bottomLogs[i] = width * i / carCount + random(-100, 100);
  }

  // Load images here
  img_road = loadImage("road.png");
  img_grass = loadImage("grass final.png");
  img_log = loadImage("pumpkin.png");

}


// //repeating music
// function repeat() {
//   music.play();
// }var fft, noise, filter;
var music;

function preload() {
  soundFormats('mp3', 'ogg');
  music = loadSound('hal.mp3');
}


function setup() {
  music.setVolume(10);
  filter = new p5.BandPass();
  music.disconnect();
  music.connect(filter);
  //music.play()
  //music.loop();
  fft = new p5.FFT();
  

  width = 1366;
  height = 627;
  //answer for prompt
  score = -1;
  minY = Infinity;
  playing = true;
  // ifWon is making the keys not work
  ifWon = false;
  stop = false;
  //loading images
  face = loadImage("face.png");
  
  G1 = loadImage("G1.png");
  G2 = loadImage("G2.png");
  G3 = loadImage("G3.png");
  G4 = loadImage("G4.png");
  G5 = loadImage("G5.png");
  G6 = loadImage("G6.png");
  ghosts = [];
  ghosts.push(G1);
  ghosts.push(G2);
  ghosts.push(G3);
  ghosts.push(G4);
  ghosts.push(G5);
  ghosts.push(G6);
  //var frame = loadImage("colo.png");
  var answer;
  //x & y pos of character
  guyX = (width / 2) - (width / 54.43);
  guyY = height - (height / 9);
  //width and height of logs and cars
  logWidth = 110;// make the log wide enough to easy to pass
  logHeight = 50;
  grassHeight = height / 9;
  largeHeight = height / 3;
  carWidth = 70;
  carHeight = 30;
  // Arrays for cars and logs
  carCount = floor(width / 300);//adopt to retina
  topCars = [];
  middleCars = [];
  bottomCars = [];
  topLogs = [];
  middleLogs = [];
  bottomLogs = [];
  yCoord = [];
  //randomizing speeds of cars and logs
  topCarSpeed = random(1, 2);
  middleCarSpeed = random(1, 2);
  bottomCarSpeed = random(1, 2);
  topLogSpeed = random(1, 2);
  middleLogSpeed = random(1, 2);
  bottomLogSpeed = random(1, 2);
  //setting if on the log to false
  onLog = false;
  // //colors for cars (randomized)
  topColor = [];
  middleColor = [];
  bottomColor = [];
  
  topGhostIndex = [];
  middleGhostIndex = [];
  bottomGhostIndex = [];
  
  //difficulty of level
  difficulty = 5;
  //setting life to 3
  life = 3;
  //setting score to -1 because it adds 1 at start
  score = 0;

  //if game end, cannot move keys
  gameEnd = false;
  //side moving of keys
  click = width / 30;//distance when you press position key
  //setting level to 1
  level = 1;
  lostGame = false;
  wonLevel = false;
  tx = guyX;
  ty = guyY;

  createCanvas(width, height);
  //center of text is the coordinates
  textAlign(CENTER, CENTER); //make the text on the middle of horizon
  //prvar(window.innerWidth + ", " + window.innerHeight);
  //prompt for music
  answer = prompt("Would you like to have music? (yes/no)");
  //center of text is the coordinates
  textAlign(CENTER, CENTER); //make the text on the middle of vertical
  //setting up music
  music = new Audio();
  music.setAttribute("src", "hal.mp3");
  music.play();
  //repeating
  music.addEventListener("ended", repeat);
  //if the answer is one of these, then play music
  if (answer == "y" || answer == "yes" || answer == "Yes" || answer == "YES") {
  playing = true;
     //otherwise, stop it
  } else {
    music.pause();
   }
  // win = new Audio();
  // win.setAttribute("src", "Ta_Da-SoundBible_com-1884170640.mp3");
  // beep = new Audio();
  // beep.setAttribute("src", "beep-10.mp3");
  // lost = new Audio();
  // lost.setAttribute("src", "fail-buzzer-02.mp3");
  //if the answer is one of these, then play music
  //setting up topcars

  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    topCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //topColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    topGhostIndex[i] = floor(random(6));
  }
  //setting up middlecars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    middleCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //middleColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    middleGhostIndex[i] = floor(random(6));
  }
  //setting up bottomcars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    bottomCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    //bottomColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    bottomGhostIndex[i] = floor(random(6));
  }

  //same for all logs, and randomly placing between coordinates
  for (var i = 0; i < carCount; i++) {
    topLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    middleLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    bottomLogs[i] = width * i / carCount + random(-100, 100);
  }
  
  // Load images here
  img_road = loadImage("road.png");
  img_grass = loadImage("grass final.png");
  img_log = loadImage("pumpkin.png");

}

 //repeating music
function repeat() {
    music.play();
 }let capture;

function setup() {
  createCanvas(320, 240);
  capture=createCapture(VIDEO);
  capture.size(320,240);
  capture.hide();
  pixelDensity(1);
}

function draw() {
  background(220);
  image(capture,0,0);
  for(let x=0;x<width;x++){
for(let y=0;y<height;y++){
  let c=capture.get(x,y);
  if(x>mouseX-10&y==mouseY+10){
    // console.log(brightness(c));
    // console.log(red(c));
   capture.set(x,y,[255,0,0,0,255]);
}
}
}
               capture.updatePixels();
}let url = "https://uinames.com/api/?amount=100&ext";
var persons = [];

function setup() {
  createCanvas(600, 600, WEBGL); // Enable 3D drawing
  setInterval(requestNames, 1000);
}

function requestNames() {
  loadJSON(url, gotData);
}

function gotData(data) {
  for (var i in data) {
    var name = data[i].name + " " + data[i].surname;
    var gender = data[i].gender == "male" ? color(147,163,177) : color(198,161,91);
    // var age = 2018 - parseInt(data[i].birthday.dmy.substring(6));
    var age = data[i].age;
    var region = data[i].region;
    var position = p5.Vector.random3D(); // random vector ON the unit sphere
    position.mult(300); // random vector on the sphere with the radius = 300
    persons[i] = new Person(name, gender, age, region, position);
  }
}

function draw() {
  background(25,23,22);
  noFill();
  stroke(192,87,70);
  translate(0, 0, -100);
  rotateZ(0.40578905); // Earth axial tilt = 23.25 degrees = 0.405 radians
  rotateY(millis() / 10000);//rotate slowly 
  sphere(300);

  //make the circle sphere
  push();
  noFill();
  //stroke(147,163,177); //grey blue
  stroke(198,161,91);//yellow
  rotateY(millis() / 5000);
  sphere(30);
  pop();

  for (var person of persons) {
    push();
    noFill();
    stroke(person.gender);
    //fill(person.gender); //make gender different color
    translate(person.position); 
    sphere(person.age / 3.0); //make sphere size change with age
    // textSize(320);
    // text(person.name, 0, 0);
    pop();
  }
}

class Person {
  constructor(name, gender, age, region, position) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.region = region;
    this.position = position;
  }
}let menu;
function preload(){
  menu=loadJSON("menu.json");
}

function setup() {
  createCanvas(400, 400);
  console.log(menu);
  
  
}

function draw() {
  background(220);
}let txt;
let padding = 40;
let words = [];

function preload() {
  txt = loadStrings("joke.txt");
  console.log(txt);
}

function setup() {
  createCanvas(400, 400);
  for (let j of txt) {
    words = concat(words, splitTokens(j));//break every string
  }
  console.log(words);
}

function draw() {
  background(215);
  let x = 10;
  let y = padding; 
  for (let i = 0; i < words.length; i++) {
    text(words[i], x, y); //write text
    x += textWidth(words[i]) + textWidth(' '); //make the space of text
    if (x > width - padding) { //return when x near in the padding distance 
      y +=textAscent() + textDescent(); 
      x = 10;
    }
  }
}// Get your own API Key @http://developer.nytimes.com
let allWords = []; //creat the variable to hold the array
let ts = 16; 
let i = 0;

function preload() {
  //make variable to search for the keyword "trump" 
  let q = "trump";
  //create a variable that holds your api key 
  let apikey = "a1b322716bf34385aa06db445fc77bc3";
  let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + q + "&api-key=" + apikey;
  loadJSON(url, processSnippets); //load the json on the website
}

function setup() {
  createCanvas(800, 800); //create a canvas with 800*800
  fill(0);// fill black
}


function draw() {
  background(255, 5);//make a background
  ts++;
  ts %= 48;  //make ts <48 
  if (allWords.length > 0) { 
    i += 1;
    i %= allWords.length; //make i< allWords.length
    textSize(ts); //make textsize between 16 and 48
    let word = allWords[floor(i)]; //make i become integer 
    text(allWords[floor(i)], random(width), random(height));
  }  //make allWords appear in the random corner of the canvas
}



function processSnippets(data) {
   //create docs variable to hold the json path data.response.docs 
  let docs = data.response.docs;
  console.log(data);

    //create an array that contains Putin, Vladi, Vlad and Vova
  let putins = ["Putin", "Vladi", "Vlad", "Vova"];
    //create an array that contains Trump, president, and President
  let trumps = ["Trump", "president", "President"];


  for (let doc of docs) {
    let words = splitTokens(doc.snippet); //split the word in doc snippet
    for (let w in words) {
      let word = words[w];   //create word variable in words array
      for (let trump of trumps) {
        if (match(word, trump)) { //if word match== trump
          words[w] = putins[floor(random(putins.length))];
          break;//exchange trump with any random word in putins array
        }
      }
      shuffle(words, true);//change the sequence of the word
    }
    allWords = concat(allWords, words); //concatenate the words array into allWords array
  }
}var lineX = 0;
var url = "http://api.open-notify.org/iss-now.json";
var issX = 0;
var issY = 0;

function setup() {
  createCanvas(400, 400);

  setInterval(askISS, 1000);
}

function askISS() {
  loadJSON(url, gotData, 'jsonp');
}


function gotData(data) {
  var lat = data.iss_position.latitude;
  var long = data.iss_position.longitude;
  issX = map(lat, -45, 50, 0, width);
  issX = map(lat, -45, 50, 0, height);
  print(data);
}

function draw() {
  background(51);

  fill(255);
  ellipse(issX, issY, 24, 24);

  stroke(255);
  line(lineX, 0, lineX, height);
  lineX = lineX + 5;
  if (lineX > width) {
    lineX = 0;
  }
}var weather;

var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = "&APPID=7de32788953e987a572457662b5d7710";
var units = "&units=metric";

var input;

function setup() {
  createCanvas(400, 400);

  var button = select('#submit');
  button.mousePressed(weatherAsk);

  input = select('#city');
}

function weatherAsk() {
  var url = api + input.value() + apiKey + units;
  loadJSON(url, gotData);
  print(url);
}

function gotData(data) {
  weather = data;
}


function draw() {
  background(0);
  if (weather) {
    ellipse(100, 100, weather.main.temp, weather.main.temp);
    ellipse(300, 100, weather.main.humidity, weather.main.humidity);
  }
}

// function draw(){
//   background(0);
//   if(spaceData){
//     randomSeed(3);
//   for(var i=0;i<spaceData.number;i++){
//     fill(255);
//     ellipse(random(width),random(height),16,16);
// }
// }
// }var x = 0, y = 0;
var stepSize = 5.0;
var letters = "A string walks into a bar and orders a drink. The bartender says we don't serve strings in here and you're a string. Nope, I'm a frayed knot.";
var fontSizeMin = 3;
var angleDistortion = 0.0;
var counter = 0;
var t;


function setup() {
  // use full screen size 
  createCanvas(780, 780);
  background(255);
  smooth();
  cursor(CROSS);
 
  x = mouseX;
  y = mouseY;

  textAlign(LEFT);
  fill(0);
  
  button = createButton("Erase it!")
  button.position(windowWidth - 320, 400)
  button.mousePressed(content);

}

function content() {
	clear();
  background(255);
}

function draw() {
  if (mouseOver) {
    var d = dist(x,y, mouseX,mouseY);
    textFont('Times New Roman');
    textSize(fontSizeMin+d/2)
    var newLetter = letters.charAt(counter);;
    stepSize = textWidth(newLetter);}

    if (d > stepSize) {
      var angle = atan2(mouseY-y, mouseX-x); 

      push();
      translate(x, y);
      rotate(angle + random(angleDistortion));
      text(newLetter, 0, 0);
      pop();

      counter++;
     if (counter > letters.length-1) counter = 0;

      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize; 
    }
  }

function mouseOver() {
  x = mouseX;
  y = mouseY;
}

// function keyTyped() {
//   if (key == 's' || key == 'S') save("P_2_3_3_01.png");
// }

// function keyPressed() {
//   // angleDistortion ctrls arrowkeys up/down 
//   if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
//   if (keyCode == UP_ARROW) angleDistortion += 0.1;
//   if (keyCode == DOWN_ARROW) angleDistortion -= 0.1; 
// }let txt;
let tokens = [];

function preload() {
  txt = loadStrings('joke.txt');
  console.log(txt);
}

function setup() {
  createCanvas(400, 400);
  for (let l of txt) {
    tokens = concat(tokens.splitTokens(l));
    //console.log(tokens);
  }
}


function draw() {
  background(220);
  let x = 0;
  let y = 50;
  for (let token of tokens) {
    //text("A string walks into a bar and orders a drink.\n The bartender says we don't serve strings in here and you're a string. Nope, I'm a frayed knot.",0,200);
    text(token, x, y);
    x = x + textWidth(token) + textWidth('a');
    if (x > width - 30) {
      y += textAscent(token);
      x = 0;
    }
  }
}function setup() {

  width = 1366;
  height = 627;
  //answer for prompt
  score = -1;
  minY = Infinity;
  playing = true;
  // ifWon is making the keys not work
  ifWon = false;
  stop = false;
  //loading images
  avatar = loadImage("avatar.png");
  G1 = loadImage("G1.png");
  G2 = loadImage("G2.png");
  G3 = loadImage("G3.png");
  G4 = loadImage("G4.png");
  G5 = loadImage("G5.png");
  G6 = loadImage("G6.png");
  ghosts = [];
  ghosts.push(G1);
  ghosts.push(G2);
  ghosts.push(G3);
  ghosts.push(G4);
  ghosts.push(G5);
  ghosts.push(G6);
  //var frame = loadImage("colo.png");
  var answer;
  //x & y pos of character
  guyX = (width / 2) - (width / 54.43);
  guyY = height - (height / 9);
  //width and height of logs and cars
  logWidth = random(100, 120);
  logHeight = 50;
  grassHeight = height / 9;
  largeHeight = height / 3;
  carWidth = 70;
  carHeight = 30;
  // Arrays for cars and logs
  carCount = floor(width / 300);
  topCars = [];
  middleCars = [];
  bottomCars = [];
  topLogs = [];
  middleLogs = [];
  bottomLogs = [];
  yCoord = [];
  //randomizing speeds of cars and logs
  topCarSpeed = random(1, 2);
  middleCarSpeed = random(1, 2);
  bottomCarSpeed = random(1, 2);
  topLogSpeed = random(1, 2);
  middleLogSpeed = random(1, 2);
  bottomLogSpeed = random(1, 2);
  //setting if on the log to false
  onLog = false;
  //colors for cars (randomized)
  topColor = [];
  middleColor = [];
  bottomColor = [];
  
  topGhostIndex = [];
  middleGhostIndex = [];
  bottomGhostIndex = [];
  
  //difficulty of level
  difficulty = 5;
  //setting life to 3
  life = 3;
  //setting score to -1 because it adds 1 at start
  score = 0;
  // var minY = Infinity;
  //if game end, cannot move keys
  gameEnd = false;
  //side moving of keys
  click = width / 30;
  //setting level to 1
  level = 1;
  lostGame = false;
  wonLevel = false;
  tx = guyX;
  ty = guyY;

  createCanvas(width, height);
  //center of text is the coordinates
  textAlign(CENTER, CENTER);
  //prvar(window.innerWidth + ", " + window.innerHeight);
  //prompt for music
  answer = prompt("Would you like to have music? (yes/no)");
  //center of text is the coordinates
  textAlign(CENTER, CENTER);
  //setting up music
  music = new Audio();
  music.setAttribute("src", "jackpot.mp3");
  music.play();
  //repeating
  music.addEventListener("ended", repeat);
  //if the answer is one of these, then play music
  if (answer == "y" || answer == "yes" || answer == "Yes" || answer == "YES") {
    playing = true;
    //otherwise, stop it
  } else {
    music.pause();
  }
  // win = new Audio();
  // win.setAttribute("src", "Ta_Da-SoundBible_com-1884170640.mp3");
  // beep = new Audio();
  // beep.setAttribute("src", "beep-10.mp3");
  // lost = new Audio();
  // lost.setAttribute("src", "fail-buzzer-02.mp3");
  //if the answer is one of these, then play music
  //setting up topcars

  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    topCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    topColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    topGhostIndex[i] = floor(random(6));
  }
  //setting up middlecars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    middleCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    middleColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    middleGhostIndex[i] = floor(random(6));
  }
  //setting up bottomcars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    bottomCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    bottomColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    bottomGhostIndex[i] = floor(random(6));
  }

  //same for all logs, and randomly placing between coordinates
  for (var i = 0; i < carCount; i++) {
    topLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    middleLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    bottomLogs[i] = width * i / carCount + random(-100, 100);
  }
}

//repeating music
function repeat() {
  music.play();
}let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log("DATA: " + currentString); // println the string
  latestData = currentString; // save it for the draw method
}

function setup() {
  createCanvas(600, 600);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);
  setInterval(function() {
    console.log("HELLO");
    serial.write(1);
  }, 1000);
  
	noFill();
  strokeWeight(10);
  
}


function draw() {
 	background(127, 0, 127);
  var v = map(latestData,50,250,600,0);

  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  // Mouth
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
  
  v+=random(-5, 5);
  // Nose
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);

  
}let serial;
let data;
// let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas


function setup() {
  createCanvas(400, 400);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', processData);
}

//   setInterval(function() {
//     console.log("HELLO");
//     serial.write(1);
//   }, 1000);
  
// 	noFill();
//   strokeWeight(10);
  
// }

// There is data available to work with from the serial port
function processData() {
  let inString = serial.readLine(); // read the incoming string
  trim(inString); // remove any trailing whitespace
  if (!inString) return; // if the string is empty, do no more
  console.log("DATA: " + inString); // println the string
  data = inString; // save it for the draw method
}

function draw() {
 	background(127, 0, 127);
  
  var v = map(data,700,900,0,width);
  var v=data;

  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  // Mouth
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
  
  v+=random(-5, 5);
  // Nose
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);

  
}function setup() {

  width = 1366;
  height = 627;
  //answer for prompt
  score = -1;
  minY = Infinity;
  playing = true;
  // ifWon is making the keys not work
  ifWon = false;
  stop = false;
  //loading images
  avatar = loadImage("avatar.png");
  G1 = loadImage("G1.png");
  G2 = loadImage("G2.png");
  G3 = loadImage("G3.png");
  G4 = loadImage("G4.png");
  G5 = loadImage("G5.png");
  G6 = loadImage("G6.png");
  ghosts = [];
  ghosts.push(G1);
  ghosts.push(G2);
  ghosts.push(G3);
  ghosts.push(G4);
  ghosts.push(G5);
  ghosts.push(G6);
  //var frame = loadImage("colo.png");
  var answer;
  //x & y pos of character
  guyX = (width / 2) - (width / 54.43);
  guyY = height - (height / 9);
  //width and height of logs and cars
  logWidth = random(100, 120);
  logHeight = 50;
  grassHeight = height / 9;
  largeHeight = height / 3;
  carWidth = 70;
  carHeight = 30;
  // Arrays for cars and logs
  carCount = floor(width / 300);
  topCars = [];
  middleCars = [];
  bottomCars = [];
  topLogs = [];
  middleLogs = [];
  bottomLogs = [];
  yCoord = [];
  //randomizing speeds of cars and logs
  topCarSpeed = random(1, 2);
  middleCarSpeed = random(1, 2);
  bottomCarSpeed = random(1, 2);
  topLogSpeed = random(1, 2);
  middleLogSpeed = random(1, 2);
  bottomLogSpeed = random(1, 2);
  //setting if on the log to false
  onLog = false;
  //colors for cars (randomized)
  topColor = [];
  middleColor = [];
  bottomColor = [];
  
  topGhostIndex = [];
  middleGhostIndex = [];
  bottomGhostIndex = [];
  
  //difficulty of level
  difficulty = 5;
  //setting life to 3
  life = 3;
  //setting score to -1 because it adds 1 at start
  score = 0;
  // var minY = Infinity;
  //if game end, cannot move keys
  gameEnd = false;
  //side moving of keys
  click = width / 30;
  //setting level to 1
  level = 1;
  lostGame = false;
  wonLevel = false;
  tx = guyX;
  ty = guyY;

  createCanvas(width, height);
  //center of text is the coordinates
  textAlign(CENTER, CENTER);
  //prvar(window.innerWidth + ", " + window.innerHeight);
  //prompt for music
  answer = prompt("Would you like to have music? (yes/no)");
  //center of text is the coordinates
  textAlign(CENTER, CENTER);
  //setting up music
  music = new Audio();
  music.setAttribute("src", "jackpot.mp3");
  music.play();
  //repeating
  music.addEventListener("ended", repeat);
  //if the answer is one of these, then play music
  if (answer == "y" || answer == "yes" || answer == "Yes" || answer == "YES") {
    playing = true;
    //otherwise, stop it
  } else {
    music.pause();
  }
  // win = new Audio();
  // win.setAttribute("src", "Ta_Da-SoundBible_com-1884170640.mp3");
  // beep = new Audio();
  // beep.setAttribute("src", "beep-10.mp3");
  // lost = new Audio();
  // lost.setAttribute("src", "fail-buzzer-02.mp3");
  //if the answer is one of these, then play music
  //setting up topcars

  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    topCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    topColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    topGhostIndex[i] = floor(random(6));
  }
  //setting up middlecars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    middleCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    middleColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    middleGhostIndex[i] = floor(random(6));
  }
  //setting up bottomcars
  for (var i = 0; i < carCount; i++) {
    //putting the cars anywhere between these coordinates
    bottomCars[i] = width * i / carCount + random(-width / 12, width / 12);
    //random colors
    bottomColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
    bottomGhostIndex[i] = floor(random(6));
  }

  //same for all logs, and randomly placing between coordinates
  for (var i = 0; i < carCount; i++) {
    topLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    middleLogs[i] = width * i / carCount + random(-100, 100);
  }

  for (var i = 0; i < carCount; i++) {
    bottomLogs[i] = width * i / carCount + random(-100, 100);
  }
}

//repeating music
function repeat() {
  music.play();
}var x = 0, y = 0;
var stepSize = 5.0;
var letters = "Let life be beautiful like summer flowers and death like autumn leaves.";
var fontSizeMin = 3;
var angleDistortion = 0.0;
var counter = 0;
var t;


function setup() {
  // use full screen size 
  createCanvas(780, 780);
  background(255);
  smooth();
  cursor(CROSS);
 
  x = mouseX;
  y = mouseY;

  textAlign(LEFT);
  fill(0);
  
  button = createButton("Erase it!")
  button.position(windowWidth - 320, 400)
  button.mousePressed(content);

}

function content() {
	clear();
  background(255);
}

function draw() {
  if (mouseOver) {
    var d = dist(x,y, mouseX,mouseY);
    textFont('Times New Roman');
    textSize(fontSizeMin+d/2)
    var newLetter = letters.charAt(counter);;
    stepSize = textWidth(newLetter);

    if (d > stepSize) {
      var angle = atan2(mouseY-y, mouseX-x); 

      push();
      translate(x, y);
      rotate(angle + random(angleDistortion));
      text(newLetter, 0, 0);
      pop();

      counter++;
     if (counter > letters.length-1) counter = 0;

      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize; 
    }
  }
}

function mouseOver() {
  x = mouseX;
  y = mouseY;
}

// function keyTyped() {
//   if (key == 's' || key == 'S') save("P_2_3_3_01.png");
// }

// function keyPressed() {
//   // angleDistortion ctrls arrowkeys up/down 
//   if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
//   if (keyCode == UP_ARROW) angleDistortion += 0.1;
//   if (keyCode == DOWN_ARROW) angleDistortion -= 0.1; 
// }var x = 0, y = 0;
var stepSize = 5.0;
var letters = "Let life be beautiful like summer flowers and death like autumn leaves.";
var fontSizeMin = 3;
var angleDistortion = 0.0;
var counter = 0;
var t;


function setup() {
  // use full screen size 
  createCanvas(780, 780);
  background(255);
  smooth();
  cursor(CROSS);
 
  x = mouseX;
  y = mouseY;

  textAlign(LEFT);
  fill(0);
  
  button = createButton("Erase it!")
  button.position(windowWidth - 320, 400)
  button.mousePressed(content);

}

function content() {
 splice[i](0,1);
}

function draw() {
  if (mouseOver) {
    var d = dist(x,y, mouseX,mouseY);
    textFont('Times New Roman');
    textSize(fontSizeMin+d/2)
    var newLetter = letters.charAt(counter);;
    stepSize = textWidth(newLetter);

    if (d > stepSize) {
      var angle = atan2(mouseY-y, mouseX-x); 

      push();
      translate(x, y);
      rotate(angle + random(angleDistortion));
      text(newLetter, 0, 0);
      pop();

      counter++;
     if (counter > letters.length-1) counter = 0;

      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize; 
    }
  }
}

function mouseOver() {
  x = mouseX;
  y = mouseY;
}

// function keyTyped() {
//   if (key == 's' || key == 'S') save("P_2_3_3_01.png");
// }

// function keyPressed() {
//   // angleDistortion ctrls arrowkeys up/down 
//   if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
//   if (keyCode == UP_ARROW) angleDistortion += 0.1;
//   if (keyCode == DOWN_ARROW) angleDistortion -= 0.1; 
// }let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log("DATA: " + currentString); // println the string
  latestData = currentString; // save it for the draw method
}

function setup() {
  createCanvas(600, 600);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);
  setInterval(function() {
    console.log("HELLO");
    serial.write(1);
  }, 1000);
  
	noFill();
  strokeWeight(10);
  
}


function draw() {
 	background(127, 0, 127);
  var v = map(latestData,50,250,600,0);

  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  // Mouth
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
  
  v+=random(-5, 5);
  // Nose
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);

  
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}function setup() {
  for(var i=0;i<100;i++){
    var p=createP('apples');
    var x=floor(random(windowWidth));
    var y=floor(random(windowHeight);
    p.position(x,y);
    p.class('apple');
}

for(var i=0;i<100;i++){
  var p=createA('http://google.com','blueberries');
  var x=floor(random(windowWidth);
  var y=floor(random(windowHeight);
  p.position(x,y);
   p.class('blueberry');
}
  // P_2_3_3_01
//
// Generative Gestaltung, ISBN: 978-3-87439-759-9
// First Edition, Hermann Schmidt, Mainz, 2009
// Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
// Copyright 2009 Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * draw tool. shows how to draw with dynamic elements. 
 * 
 * MOUSE
 * drag                : draw with text
 * 
 * KEYS
 * del, backspace      : clear screen
 * arrow up            : angle distortion +
 * arrow down          : angle distortion -
 * s                   : save png

 */

var x = 0, y = 0;
var stepSize = 5.0;
var letters = "Mon propos dans les pages qui suivent a plutôt été de décrire le reste : ce que l'on ne note généralement pas, ce qui ne se remarque pas, ce qui n'a pas d'importance : ce qui se passe quand il ne se passe rien, sinon du temps, des gens, des voitures et des nuages.";
var fontSizeMin = 3;
var angleDistortion = 0.0;
var counter = 0;


function setup() {
  // use full screen createCanvas 
  createCanvas(780, 780);
  background(255);
  smooth();
  cursor(CROSS);
 
  x = mouseX;
  y = mouseY;

  textAlign(LEFT);
  fill(0);

}

function draw() {
  if (mouseOver) {
    var d = dist(x,y, mouseX,mouseY);
    textFont('Georgia');
    textSize(fontSizeMin+d/2)
    var newLetter = letters.charAt(counter);;
    stepSize = textWidth(newLetter);

    if (d > stepSize) {
      var angle = atan2(mouseY-y, mouseX-x); 

      push();
      translate(x, y);
      rotate(angle + random(angleDistortion));
      text(newLetter, 0, 0);
      pop();

      counter++;
     if (counter > letters.length-1) counter = 0;

      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize; 
    }
  }
}

function mouseOver() {
  x = mouseX;
  y = mouseY;
}

function keyTyped() {
  if (key == 's' || key == 'S') save("P_2_3_3_01.png");
}

function keyPressed() {
  // angleDistortion ctrls arrowkeys up/down 
  if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
  if (keyCode == UP_ARROW) angleDistortion += 0.1;
  if (keyCode == DOWN_ARROW) angleDistortion -= 0.1; 
}var input;
var slider;
var paragraph;

function setup() {
  noCanvas();
  textbox=createInput('enter text');
    paragraph=createP('starting text');
  slider=createSlider(10,64,16);
  
  textbox.input(updateText);
  slider.input(updateSize);
}

function updateSize(){
  paragraph.style("font-size",slider.value()+"pt");
}

function updateText(){
  paragraph.html(textbox.value());
}
  
function doSomething(){
  paragraph.html(textbox.value());
}
			function setup() {

  width = 1366;
  height = 627;
  //answer for prompt
  score = -1;
  minY = Infinity;
  playing = true;
  // ifWon is making the keys not work
  ifWon = false;
  stop = false;
  //loading images
  avatar = loadImage("avatar.png");
  //var frame = loadImage("colo.png");
  var answer;
  //x & y pos of character
  guyX = (width / 2) - (width / 54.43);
  guyY = height - (height / 9);
  //width and height of logs and cars
  logWidth = random(100, 120);
  logHeight = 50;
  grassHeight = height / 9;
  largeHeight = height / 3;
  carWidth = 70;
  carHeight = 30;
  // Arrays for cars and logs
  topCars = [floor(width / 300)];
  middleCars = [floor(width / 300)];
  bottomCars = [floor(width / 300)];
  topLogs = [floor(width / 300)];
  middleLogs = [floor(width / 300)];
  bottomLogs = [floor(width / 300)];
  yCoord = [];
  //randomizing speeds of cars and logs
  topCarSpeed = random(1, 2);
  middleCarSpeed = random(1, 2);
  bottomCarSpeed = random(1, 2);
  topLogSpeed = random(1, 2);
  middleLogSpeed = random(1, 2);
  bottomLogSpeed = random(1, 2);
  //setting if on the log to false
  onLog = false;
  //colors for cars (randomized)
  topColor = [floor(width / 300)];
  middleColor = [floor(width / 300)];
  bottomColor = [floor(width / 300)];
  //difficulty of level
  difficulty = 5;
  //setting life to 3
  life = 3;
  //setting score to -1 because it adds 1 at start
  score = 0;
  // var minY = Infinity;
  //if game end, cannot move keys
  gameEnd = false;
  //side moving of keys
  click = width / 30;
  //setting level to 1
  level = 1;
  lostGame = false;
  wonLevel = false;
  tx = guyX;
  ty = guyY;

  createCanvas(width, height);
  //center of text is the coordinates
  textAlign(CENTER, CENTER);
  //prvar(window.innerWidth + ", " + window.innerHeight);
  //prompt for music
  answer = prompt("Would you like to have music? (yes/no)");
  //center of text is the coordinates
  textAlign(CENTER, CENTER);
  //setting up music
  music = new Audio();
  music.setAttribute("src", "jackpot.mp3");
  music.play();
  //repeating
  music.addEventListener("ended", repeat);
  //if the answer is one of these, then play music
  if (answer == "y" || answer == "yes" || answer == "Yes" || answer == "YES") {
    playing = true;
    //otherwise, stop it
  } else {
    music.pause();
  }
  // win = new Audio();
  // win.setAttribute("src", "Ta_Da-SoundBible_com-1884170640.mp3");
  // beep = new Audio();
  // beep.setAttribute("src", "beep-10.mp3");
  // lost = new Audio();
  // lost.setAttribute("src", "fail-buzzer-02.mp3");
  //if the answer is one of these, then play music
  //setting up topcars
  for (var i = 0; i < topCars.length; i++) {
    //putting the cars anywhere between these coordinates
    topCars[i] = width * i / topCars.length + random(-width / 12, width / 12);
    //random colors
    topColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
  }
  //setting up middlecars
  for (var i = 0; i < middleCars.length; i++) {
    //putting the cars anywhere between these coordinates
    middleCars[i] = width * i / middleCars.length + random(-width / 12, width / 12);
    //random colors
    middleColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
  }
  //setting up bottomcars
  for (var i = 0; i < bottomCars.length; i++) {
    //putting the cars anywhere between these coordinates
    bottomCars[i] = width * i / bottomCars.length + random(-width / 12, width / 12);
    //random colors
    bottomColor[i] = color(random(0, 255), random(0, 255), random(0, 255));
  }

  //same for all logs, and randomly placing between coordinates
  for (var i = 0; i < topLogs.length; i++) {
    topLogs[i] = width * i / topLogs.length + random(-100, 100);
  }

  for (var i = 0; i < middleLogs.length; i++) {
    middleLogs[i] = width * i / middleLogs.length + random(-100, 100);
  }

  for (var i = 0; i < bottomLogs.length; i++) {
    bottomLogs[i] = width * i / bottomLogs.length + random(-100, 100);
  }
}

//repeating music
function repeat() {
  music.play();
}var serial; // variable to hold an instance of the serialport library
 
function setup() {
 serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList); // set a callback function for the serialport list event
 
 serial.list(); // list the serial ports
}
 
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 println(i + " " + portList[i]);
 }
  
  
  function serialEvent() {
  inData = Number(serial.read());
}

function setup() {
  createCanvas(400, 300);

function draw() {
  background(0);
  fill(255);
  text("sensor value: " + inData, 30, 30);let balls = [];

function setup() {
  createCanvas(400, 400);
  for (i = 0; i < 100; i++) {
    let xspeed = random(0, 5);
    let yspeed = random(0, 5);
    let ball = new Ball(random(0, width), random(0, height), xspeed, yspeed);
    balls.push(ball);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++) {
    balls[i].run();
   for(let j=i+1;j<balls.length;j++){
     if(balls[j]!=balls[i] && balls[j].overlap(balls[i].x, balls[i].y)) {
      balls.splice(i, 1);
      balls.splice(j,1);
    }
  }
  }
}let balls = []; // create a group of balls


function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < 100; i++) { // create 100 balls
    let x = random(width);
    let y = random(height);
    let xspeed = random(0, 7);
    let yspeed = random(0, 7);
    let shade = random(255);
    balls[i] = new Ball(x, y, xspeed, yspeed, shade);
  }
}

function draw() {
  background(30);
  for (let i = 0; i < balls.length; i++) { // let 100 balls run
    balls[i].run();
    if (balls[i].isNear(mouseX, mouseY)) {
      balls.splice(i, 1);
    }
  }
}
let balls = [];

function setup() {
  createCanvas(400, 400);
  for (i = 0; i < 100; i++) {
    let xspeed = random(0, 5);
    let yspeed = random(0, 5);
    let ball = new Ball(random(0, width), random(0, height), xspeed, yspeed);
    balls.push(ball);
  }
}

function mouseClicked() {

}

function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++) {
    balls[i].run();
    if (balls[i].isNear(mouseX, mouseY)) {
      balls.splice(i, 1);
    }
  }
}let balls = [];

function setup(){
  createCanvas(400,400);
}

function mouseClicked(){
  let xspeed=random(0,5);
  let yspeed=random(0,5);
  let ball= new Ball(mouseX,mouseY,xspeed, yspeed);
  balls.push(ball);
}

function draw(){
  background(0); 
  for(let i=0; i<balls.length;i++){
  balls[i].run();}}
    let a;
let b; 
let c;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  add(10,10);
  display();
}

function add(a,b) {
  c = a + b;
}

function display() {
  text("The answer is",30,30);
  text(c,109,30);  
}let planet = [];
let blackhole;
let starCount = 50;
let canvasSize = 500;

function setup() {

    
  createCanvas(canvasSize, canvasSize); //create canvas
    
  renderBuffer = createGraphics(canvasSize, canvasSize); //create buffer

  // No retina displays
  pixelDensity(1);
  renderBuffer.pixelDensity(1);

    
  blackhole = new Blackhole(20); // size=20

  // spawn some stars
    
  for (i = 0; i < starCount; i++) {    
    let x = random(width);    
    let y = random(height);    
    let xspeed = random(-1, 1) / 2;    
    let yspeed = random(-1, 1) / 2;    
    let o = random(50, 800);    
    let p = random(200, 800);    
    let r = random(50, 255);    
    let g = random(50, 255);    
    let b = random(50, 255);    
    planet[i] = new Planet(x, y, xspeed, yspeed, o, p, r, g, b, renderBuffer);  
  }
}

function draw() {
  let bg = map(blackhole.size, 20, 120, 90, 50); // less planet darker universe
    
  renderBuffer.background(bg);  
  for (i = 0; i < planet.length; i++) {    
    planet[i].run();
    if (i > planet.length / 4) {      
      planet[i].showbelt();
      if (i > planet.length / 1.2) {        
        planet[i].show2belt()      
      }    
    }    
    if (planet[i].isNear(mouseX, mouseY, blackhole.size / 4)) {      
      planet.splice(i, 1);      
      blackhole.size += 2;    
    }  
  }

    
  loadPixels(); //canvas loadpixel 
    
  renderBuffer.loadPixels(); //buffer loadpixel
  for (i = 0; i < canvasSize; i++) { //黑洞最里面
    for (j = 0; j < canvasSize; j++) {      
      currentPixel = (i * canvasSize + j) * 4;
      distance = dist(j, i, mouseX, mouseY);      
      if (distance < blackhole.size - 20) {        
        pixels[currentPixel] = 0;        
        pixels[currentPixel + 1] = 0;        
        pixels[currentPixel + 2] = 0;        
        pixels[currentPixel + 3] = 255;
      } else if (distance < blackhole.size) { //黑洞渐变虚化
        let value = map(distance, blackhole.size, blackhole.size - 20, bg, 0);        
        pixels[currentPixel] = value;        
        pixels[currentPixel + 1] = value;        
        pixels[currentPixel + 2] = value;        
        pixels[currentPixel + 3] = 255;
      } else if (distance > blackhole.size + 20) { //黑洞最外面照搬buffer
        pixels[currentPixel] = renderBuffer.pixels[currentPixel];        
        pixels[currentPixel + 1] = renderBuffer.pixels[currentPixel + 1];        
        pixels[currentPixel + 2] = renderBuffer.pixels[currentPixel + 2];        
        pixels[currentPixel + 3] = 255;      
      } else {
        newVec = circularWarp(j, i, blackhole.size, 20); //扭曲
        newPixel = (round(newVec.y) * canvasSize + round(newVec.x)) * 4;        
        pixels[currentPixel] = renderBuffer.pixels[newPixel];        
        pixels[currentPixel + 1] = renderBuffer.pixels[newPixel + 1];        
        pixels[currentPixel + 2] = renderBuffer.pixels[newPixel + 2];        
        pixels[currentPixel + 3] = 255;      
      }    
    }  
  }  
  updatePixels();  
  blackhole.draw();

    
  if (blackhole.size >= 2 * starCount + 20) {    
    text("Universe is Destroyed", width / 2, height / 2)  
  }
}

function circularWarp(x, y, r, f) {  //扭曲坐标映射
  O = createVector(mouseX, mouseY);  
  X = createVector(x, y);  
  R = p5.Vector.add(O, p5.Vector.mult(p5.Vector.sub(X, O), r / p5.Vector.mag(p5.Vector.sub(X, O))));  
  return p5.Vector.add(p5.Vector.mult(p5.Vector.sub(X, R), 1.0 + r / f), O);
}let balls = [];


function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < 100; i++) {
    balls.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
  }

function draw() {
  background(30);
  for (let b in balls) {
    balls[b].run();
  }
}
}
  
// if(dist(mouseX, mouseY,balls[b].x,ballls[b].y<24}{
//    //if(balls[b]. isNear(mouseX,mouseY)
//        balls.splice(b,1);
//    }
// }let ball1;
let ball2;


function setup() {
  createCanvas(300,300);
  ball1 = new Ball();
  ball2 = new Ball();
  
}

function draw() {
  background(50);
  ball1.bounce();
  ball1.show();
  ball2.bounce();
  ball2.show();
}

class Ball {
  constructor(x,y,s1,s2){
   this.x = random(0,width/2);
   this.y = random(0,height/2);
    this.s1=10;
    this.s2=7;
  }
  bounce(){
   this.x = this.x+this.s1;
   this.y = this.y+this.s2;
   if(this.x>=width ||this.x<=0) {
     this.s1 = this.s1*-1;}
    
   if(this.y>=height||this.y<=0) {
     this.s2= this.s2*-1;
   }
   
  }
  show(){
   fill(255);
   ellipse(this.x,this.y,20,20);
  }
}let colW;
let colH;
let numCols;
let numRows;
let x, y;
let shade;


function setup() {
  createCanvas(400, 400);
  numCols = 10;
  numRows = 4;
  colW = width / numCols;
  rowH = height / numRows;
}

function draw() {
  background(255);
  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      x = colW * col;
      y = rowH * row;
      if (mouseX > x && mouseX < x + colW && 
          mouseY > y && mouseY < y + rowH) {
        shadeR = map(mouseX, 0, width, 100, 255);
        shadeG = map(mouseX, 0, width, 255, 0);
        shadeB = map(mouseX, 0, width, 35, 175);
        fill(shadeR, shadeG, shadeB);
        rect(x, y, colW, rowH);
      } else {
        fill(255);
        rect(x, y, colW, rowH);
      }
    }
  }
}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem14601';
var inData;

var moonSize = 68;
var col = 3;
var row = 4;
var mouseClicked;

function setup() {
 serial = new p5.SerialPort(); // make a new instance of the serialport library serial.on('open', portOpen);
 serial.on('data', serialEvent);   
 serial.list(); // list the serial ports
 serial.open(portName);
  createCanvas(430, 600);
  noStroke();
  //frameRate(20);
  // mouseClicked = false;
}

function serialEvent () {
    print ("event");
    inData = Number (serial.read());
    print(inData);
}


function draw() {
  var posX = map(inData,0,255,0,width);
  
  // Draw the frame
  background(61, 241, 216);
  fill("#1C1B2F");
  rect(10, 10, width - 20, height - 20);

  // Draw the 3x4 moons
  for (j = 0; j < row; j++) {
    for (i = 0; i < col; i++) {
      // 108 is the distance between neighbors
      var x = i * 108;
      var y = j * 108;
      push();
      translate(x, y);
      if (j == row - 1 && i == col - 1) {
        let moon = new Moon(inData / 113 + i / 1.05 + j / 1.09, moonSize, true);
        moon.drawMoon();
      } else {
        let moon = new Moon(inData / 113 + i / 1.05 + j / 1.09, moonSize, false);
        moon.drawMoon();
      }
      pop();
    }

  }

  if (mouseClicked) {
    fill(254,244,169);
    textSize(10);
    textStyle(ITALIC);
    text('HAPPY MID-AUTUMN DAY', width * 0.4, 530);
  } else {
    fill(254,244,169);
    textSize(10);
    textStyle(ITALIC);
    text('FIND THE FULL MOON AND CLICK', width * 0.35, 530);
  }
}

// function mousePressed() {
//   var d = dist(mouseX, mouseY, 323, 430);
//   if (d < 20) {
//     mouseClicked = true;
//   } else {
//     mouseClicked = false;
//   }
//}var moonSize = 68;
var col = 3;
var row = 4;
var mouseClicked;

function setup() {
  createCanvas(430, 600);
  noStroke();
  mouseClicked = false;
}

function draw() {
  
  // Draw the frame
  background(61, 241, 216);
  fill("#1C1B2F");
  rect(10, 10, width - 20, height - 20);

  // Draw the 3x4 moons
  for (j = 0; j < row; j++) {
    for (i = 0; i < col; i++) {
      // 108 is the distance between neighbors
      var x = i * 108;
      var y = j * 108;
      push();
      translate(x, y);
      if (j == row - 1 && i == col - 1) {
        let moon = new Moon(mouseX / 113 + i / 1.05 + j / 1.09, moonSize, true);
        moon.drawMoon();
      } else {
        let moon = new Moon(mouseX / 113 + i / 1.05 + j / 1.09, moonSize, false);
        moon.drawMoon();
      }
      pop();
    }
  }

  if (mouseClicked) {
    fill(254,244,169);
    textSize(10);
    textStyle(ITALIC);
    text('HAPPY MID-AUTUMN DAY', width * 0.4, 530);
  } else {
    fill(254,244,169);
    textSize(10);
    textStyle(ITALIC);
    text('FIND THE FULL MOON AND CLICK', width * 0.35, 530);
  }
}

function mousePressed() {
  var d = dist(mouseX, mouseY, 323, 430);
  if (d < 20) {
    mouseClicked = true;
  } else {
    mouseClicked = false;
  }
}let ball;

function setup() {
  createCanvas(300,300);
  ball = new Ball();
  
}

function draw() {
  background(0);
  ball.bounce();
  ball.show();
}

class Ball {
  constructor(x,y,s1,s2){
   this.x = random(0,width/2);
   this.y = random(0,height/2);
    this.s1=10;
    this.s2=7;
  }
  bounce(){
   this.x = this.x+this.s1;
   this.y = this.y+this.s2;
   if(this.x>=width ||this.x<=0) {
     this.s1 = this.s1*-1;}
    
   if(this.y>=height||this.y<=0) {
     this.s2= this.s2*-1;
   }
   
  }
  show(){
   fill(255);
   ellipse(this.x,this.y,20,20);
  }
}let colW;
let colH;
let numCols;
let numRows;
let x,y;
let shade;


function setup() {
  createCanvas(400, 400);
  numCols=10;
  numRows=5;
  colW=width/numCols;
  rowH=height/numRows;
}

function draw() {
  background(255);
  for(let col=0;col<numCols;col++){
    for(let row=0;row<numRows;row++){
    x = colW * numCols;
     y = colH * numRows;   
      if (mouseX > x && mouseX < x + colW && mouseY > colH && mouseY < y + colH) {
        shade = map(mouseX, 0, width, 0, 255);
        fill(shade);
        rect(x, y, colW, colH);
      } else {
        noFill()
  }
}
  }
}
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
let colW;
let colH;
let numCols;
let numRows;


function setup() {
  createCanvas(400, 400);
  numCols=50;
  numRows=numCols;
  colW=width/numCols;
  rowH=height/numRows;
}

function draw() {
  background(255);
  noStroke();
  colorMode();
  for(let col=0;col<numCols;col++){
    for(let row=0;row<numRows;row++){
      // if(col%2==1&& row%2==1|| col%2==0 && row%2==0)fill('black');
      // else fill('white');
      let x=col*colW;
      let y=row*rowH;
      let d=dist(mouseX, mouseY, x,y);
      let trued=map(d,0,dist(0,0,width,height),100,0)
      fill(trued,30,trued);
      rect(x,y,colW,rowH);
}
  }
}
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
var moonSize = 68;
var col = 3;
var row = 4;
var mouseClicked;

function setup() {
  createCanvas(430, 600);
  noStroke();
  mouseClicked = false;
}

function draw() {
  
  // Draw the frame
  background(61, 241, 216);
  fill("#1C1B2F");
  rect(10, 10, width - 20, height - 20);

  // Draw the 3x4 moons
  for (j = 0; j < row; j++) {
    for (i = 0; i < col; i++) {
      // 108 is the distance between neighbors
      var x = i * 108;
      var y = j * 108;
      push();
      translate(x, y);
      if (j == row - 1 && i == col - 1) {
        // fine-tune the parameters to make the 
        // moon phases look different and async
        drawMoon(mouseX / 113 + i / 1.05 + j / 1.09, true);
      } else {
        drawMoon(mouseX / 113 + i / 1.05 + j / 1.09, false);
      }
      pop();
    }
  }

  if (mouseClicked) {
    fill(254,244,169);
    textSize(10);
    textStyle(ITALIC);
    text('HAPPY MID-AUTUMN DAY', width * 0.4, 530);
  } else {
    fill(254,244,169);
    textSize(10);
    textStyle(ITALIC);
    text('FIND THE FULL MOON AND CLICK', width * 0.35, 530);
  }
}

function drawMoon(phase, glitch) {
  // Clamp the phase to be in between [0, 1) to 
  // make the moon phases morph continuously
  var t = (phase % 1);
  
  translate(108, 108);
  if (t < 0.5) {
    if (t < 0.25) { // t = 0~0.25
      var r = map(t, 0, 0.25, moonSize, 0);
      if (glitch) {
        fill(254,244,169);
      } else {
        fill('#66ffff');
      }
      arc(0, 0, moonSize, moonSize, PI / 2, PI * 1.5);
      fill("#1C1B2F");
      arc(0, 0, r, moonSize, PI / 2, PI * 1.5);
    } else { // t = 0.25~0.5
      var r = map(t, 0.25, 0.5, 0, moonSize);
      if (glitch) {
        fill(254,244,169);
      } else {
        fill('#66ffff');
      }
      arc(0, 0, r, moonSize, -PI / 2, PI / 2);
      arc(0, 0, moonSize, moonSize, PI / 2, PI * 1.5);
    }
  } else { // t = 0.5~0.75
    if (t < 0.75) {
      var r = map(t, 0.5, 0.75, moonSize, 0);
      fill("#1C1B2F");
      arc(0, 0, moonSize, moonSize, PI / 2, PI * 1.5);
      if (glitch) {
        fill(254,244,169);
      } else {
        fill('#66ffff');
      }
      arc(0, 0, moonSize, moonSize, -PI / 2, PI / 2);
      arc(0, 0, r, moonSize, PI / 2,  PI * 1.5);
    } else { // t = 0.75~1
      var r = map(t, 0.75, 1, 0, moonSize);
      if (glitch) {
        fill(254,244,169);
      } else {
        fill('#66ffff');
      }
      arc(0, 0, moonSize, moonSize, -PI / 2, PI / 2);
      fill("#1C1B2F");
      arc(0, 0, r, moonSize, -PI / 2, PI / 2);
    }
  }
}

function mousePressed() {
  var d = dist(mouseX, mouseY, 323, 430);
  if (d < 20) {
    mouseClicked = true;
  } else {
    mouseClicked = false;
  }
}function setup(){
  createCanvas(715, 300);
  background(0);
  smooth();
  stroke(0);
}
 
function draw(){ 

  k = 0;
  for(var i = 60; i < 600; i=i+(600/6)){
    
    push();
    
      fill(255);
      translate(i, height/2);
      rotate(-PI/2);
      
      arc(0, 0, 75, 75, 0, PI*4);
      arc(0, 0 ,200-i*5,200-i*5);
      fill(0);
      k=k+5;
      arc(k, k, 75, 75, 0, PI*4);

      
    pop();
  }
  
    
  fill(255);
  translate(660, height/2);
  rotate(-PI/2);
  arc(0, 0, 75, 75, 0, PI*4);
}
}var phaseNum;

function setup() {
  createCanvas(500, 500);
  noStroke();
}

function draw() {
  fill(0, random(160, 200));
  rect(0, 0, width, height);
  phaseNum = (mouseX % 87) / 10;


//   for (i = 100; i < 500; i += 100) {
//     for (j = 100; j < 500; j += 100) {
//       drawMoon(i * width / 8, j * height / 8, width / 8);
//       if (phaseNum < 4) {
//         drawShadow(i * width / 8 - (phaseNum * 35), j * height / 8, width / 8);
//       } else {
//         drawShadow(i * width / 8 + 300 - (phaseNum * 35), j * height / 8, width / 8);
//       }
//     }
//   }

  fill(255);
}

function drawMoon() {
  for (i = 1; i < 50; i++) {
     for (w = 50; w < 400; w += 100) {
    for (e = 50; e < 500; e += 80) {
    fill(245, 10);
    ellipse(w, e, size * 2 - i * 5, size * 2 - i * 5);
    ellipse(w, e, size * 1.4, size * 1.4);
  }
}
  }
}
    
function drawShadow(x, y, size) {
  for (i = 1; i < 50; i++) {
    fill(0, 80);
    ellipse(x, y, size * 2 - i * 5, size * 2 - i * 5);
  }
}
// Example from - https://editor.p5js.org/kjhollen/sketches/S1bVzeF8Z
/**
 * demonstrates how to load a GIF image using
 * createImg to create an <img> on the page
 * and to use that to update animation
 * (and illustrates how p5's loadImage loads only
 * one frame otherwise).
 */

var gif_loadImg, gif_createImg;

function preload() {
  // gif_loadImg = loadImage("agua-square.gif");
  gif_createImg = createImg("agua-square.gif");
}

function setup() {
  createCanvas(400, 400);
  background(254, 252, 254);
}

function draw() {
  // loads only first frame
  // image(gif_loadImg, 50, 50);
  
  // updates animation frames by using an html
  // img element, positioning it over top of
  // the canvas.
  gif_createImg.position(mouseX, mouseY, 100, 100);
  
  // eye1 - rectangle
  noStroke();
  fill(234, 196, 16);
  rect(150, 50, 35, 35);
  triangle(280, 100, 320, 100, 310, 50);
}
var videoFrame;
var mask;

function preload() {
  videoFrame = loadImage("processing-org.jpg");
}

function setup() {
  createCanvas(500, 500);
  mask = createGraphics(500, 500);
}

var x = 0;

function draw() {
  
  // draw the full moon
  mask.ellipse(200, 200, 200, 200);
  
  videoFrame.mask(mask);
  image(videoFrame, 0, 0);
}
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
    
  
  //Grid
  stroke(0);
  fill(0);
  x=0;
  while(x<400){
  x=x+50;
  line(x,0,x,500);
  text(x,x,20);
  }
  
  y=0;
  while(y<500){
   y=y+50;
    line(0,y,400,y);
    text(y,20,y);
  }  
 
  // Draw the full moon 
  fill(143,146,153);
  ellipse(50,50,50,50);
  
    // Draw the half moon 
  fill(193,33,39);
  arc(0, -85, 100, 100, 1.1*PI, 1.9*PI, OPEN);
  
}// 10print.org
// Ported from the book

var w = 16;
var h = 16;
var index = 0;

function setup() {
  createCanvas(640, 384);
  background(255);
  strokeWeight(3);
  stroke('red');
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
    background(255);
    set(0, 0, p);
    index = 0;
  }
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  noStroke();
	fill(140,290, 230);
	ellipse(200, 200, 200, 200);
}// This is the way One using rect:
// function setup() {
//   createCanvas(400, 400);
// }

// function draw() {
//   background(220);
//   rect(width/4,height/4,width/2,height/2); 
// }

// This is the way two using vertex:
let a;
let b;
let x;
let y;

function setup() {
  createCanvas(400, 400);
  a = width/4;
  b = height/4;
  x = width/2;
  y = height/2;
}

function draw() {
  background(220);
  beginShape();
  	vertex(x-a,y-b);
  	vertex(x+a,y-b);
  	vertex(x+a,y+b);
  	vertex(x-a,y+b);
  endShape(CLOSE);
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  noStroke();
  for(var i=0;i<10; i++){
    x=i*width/10;
    if (mouseX>x && mouseX<((i+1)*width/10)){
      if(i%2==0){
    fill('red');
    rect(x,0,width/10,height); 
    }
      else{
    fill('blue');
    rect(x,0,width/10,height); 
    }
  }
}
}function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220);
  for (var i = 0; i < 10; i++) {
    for (var e = 0; e < 10; e++) {
      var x = i * 50;
      var y = e * 50
      rect(x, y, 50, 50);
      if ((e + i) % 2 == 0) {
        fill('black');
        rect(x, y, 50, 50)
      } else {
        fill('white')
        rect(x, y, 50, 50)
      }
    }
  }
}let x;//width of the court
let y;//width count
let z;//height count


function setup() {
  createCanvas(400, 400);
  x=width/10;
}

function draw() {
  background(220);
  for(y=0; y<10; y++){
    for(z=0;z<10;z++){
      if((y+z)%2==0){
        fill(255);
        rect(y*x,z*x,x,x)}
      else{
        fill(0);
        rect(y*x,z*x,x,x)
      }
}}}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  for(var i=0;i<10;i++){
    x=i*width/10;
    line(x,0,x,height);
    line(0,x,width,x);
}
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  noStroke();
  for(var i=0;i<10; i++){
    x=i*width/10;
    if (mouseX>x && mouseX<((i+1)*width/10)){
    fill(30*i,120*i,50*i);
    rect(x,0,width/10,height); 
    }  
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  noStroke();
  for(var i=0;i<10; i++){
    x=i*width/10;
    if (mouseX>x && mouseX<((i+1)*width/10)){
    fill(30*i,120*i,50*i);
    rect(x,0,width/10,height); 
    }  
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  noStroke();
  for(var i=0;i<10; i++){
    x=i*width/10;
    if (mouseX>x && mouseX<((i+1)*width/10)){
    fill('red');
    rect(x,0,width/10,height); 
    }   
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  noStroke();
  for(var i=0;i<10; i++){
    x=i*width/10;
    if (mouseX>x && mouseX<((i+1)*width/10)&&i!=6){
    fill('red');
    rect(x,0,width/10,height);    
  }
}
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  noStroke();
  for(var i=0;i<10; i++){
    x=i*width/10;
    if (mouseX>x && mouseX<((i+1)*width/10)&&i<5){
    fill('blue');
    rect(x,0,width/10,height); 
    }
    if (mouseX>x && mouseX<((i+1)*width/10)&&i>=5){
    fill('red');
    rect(x,0,width/10,height);     
  }
}
}function setup() {
  createCanvas(300, 300);
}

function draw() {
  background(220);
  
  if(mouseX<width/3){
  fill('red'); 
  rect(0,0,width/3,height);
  }
  
  else if(mouseX<2*width/3){
  fill('red'); 
  rect(width/3,0,width/3,height);
}
	else{
  fill('red'); 
  rect(2*width/3,0,width/3,height);
}
}let ball=new Ball(0,0,10,10);

function setup(){
  createCanvas(400,400);
}

function draw(){
  background(220);
  ball.run();
}


class Ball{
  constructor(x,y,xspeed,yspeed){
this.x=x;
this.y=y;
this.yspeed=xspeed;
this.xspeed=yspeed;
}
}


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  bgspeed=bounce(bg,128,255,bgspeed);
  xspeed= bounce(x,0,width,xspeed);
  yspeed= bounce(y,0,height,yspeed);
  x+=xspeed;
  y+=yspeed;
	ellipse(x,y,50,50);
	}

function bounce(state,low,high,speed){
if (state>high||state<low) speed*=-1;
  // if (y>height||y<0) yspeed*=-1;
  return speed;
}let leftIsOn=false;
let middleIsOn=false;
let rightIsOn=false;

function setup() {
  createCanvas(300, 300);
}

function draw() {
  background(220);
  noStroke();
  if(leftIsOn){
  fill('red');
  rect(0,0,width/3,height);
  }
  
  if(middleIsOn){
  fill('red');
  rect(width/3,0,width/3,height);
  }

  if(rightIsOn){
  fill('red');
  rect(2*width/3,0,width/3,height);
  }
}

  function mousePressed(){
    if(mouseX<width/3){
    leftIsOn=!leftIsOn;
    }
    else if(width/3<mouseX && mouseX<2*width/3){
    middleIsOn=!middleIsOn;
    }
    else {
    rightIsOn=!rightIsOn;
    }
  }let x=0;
let y;
let xspeed=1;

function setup() {
  createCanvas(400, 400);
	y=height/2;
}

function draw() {
  background(220);
	ellipse(x,y,50,50);
	// y-=height/300;
	// console.log(y);
	//5s 60fps*5=300fps,300次内要到尽头，也就是每次的距离可以算好
	// y-=yspeed;
	// yspeed=(y-mouseY)/300; //算好5s走的距离
	// console.log(y);
	x+=xspeed;
		if (x>width||x<0) xspeed*=-1;
		console.log(x);
	}

let x;
let y;
let speed = 10;


function setup() {
  createCanvas(500, 500);
  x = width/2;
  y = height/2;
}

function draw() {
  background(0);
  fill(255);
  ellipse(x, y, 50, 50);

  //move to the top left
  // x--;
  // y--;

  //move to the top right 
  // x++;
  // y--;

  //move to the bottom left
  // x--;
  // y++;

  //move to the bottom right
  // x++;
  // y++;


  // 10x faster
  x = x+speed;
  y = y+speed;

}let x,y,w,h;
let dx,dy;
let speed;

function setup() {
  createCanvas(500, 500);
  x=width/2;
  y=height/2;
  w=width/2;
  h=height/2;
  speed=0.02;
  rectMode(CENTER);
  background(0);
}

function draw() {
  fill(255);
  rect(x,y,w,h);
  dx=mouseX-x;
  dy=mouseY-y;
  x=x+dx*speed;
  y=y+dy*speed;
}function setup(){
  createCanvas(400,400);
}

function draw() {
  background(255);
  
  //dog face
  noStroke(0);
  fill(255,128,0);
  triangle(200,100,100,200,300,200);
  triangle(100,200,200,300,300,200);
  fill(255,199);
  rect(200,160,50,50,100,80,20,20);
  
  //dog ears
  fill(204,238,255);
  ellipse(150,160,40,120);
  fill(128,51,0);
  ellipse(250,160,40,120);

    
  //dog eyes
  fill(128,51,0);
  noStroke();
  ellipse(180,200,10,10);
  ellipse(220,200,10,10);
  
   //dog nose
  fill(128,51,0);
  noStroke();
  triangle(190,220,210,220,200,240);
  fill(255);
  arc(190,240,20,20,0, PI);
  arc(210,240,-20,20,0, PI);
  triangle(190,220,200,240,180,240);
  triangle(200,240,210,220,220,240);
  
  //draw the red line
  push();
  line(300,0,0,300);
  strokeWeight(50);
  stroke(0);
  pop();
  
  //bird face
  fill(204,238,255);
  arc(140,140,150,170,0.75*PI, 1.75*PI);
  
  fill(0,153,153);
  arc(120,140,60,80,0.75*PI, 1.75*PI);
  
  //bird eyes
  fill(128,51,0);
  noStroke();
  ellipse(150,90,10,10);
  
  //bird nose
  fill(128,51,0);
  noStroke();
  triangle(150,40,130,55,166,60);
  
  //cat face
  fill(128,51,0);
  arc(260,135,150,170,1.25*PI, 0.25*PI);
  triangle(290,30,250,55,300,70);
  triangle(360,90,310,90,330,140);
  stroke(255,140,26);
  strokeWeight(3);
  line(230,80,250,100);
  line(220,90,245,105);
  line(290,130,316,153);
  line(285,135,305,160);
  
  //cat eyes
  fill(255,140,26);
  noStroke();
  ellipse(260,90,10,10);
  ellipse(300,120,10,10);
  
  //cat nose
  fill(0,153,153);
  noStroke();
  triangle(266,125,268,108,283,120,16);
  
  //name
  textSize(30);
  fill(128,51,0);
  textFont('Georgia');
  textStyle('bold');
  text('PET LOVER', 110, 350);

}
  
 
 function setup() {
  createCanvas(600,600);
  rot = 0;
}

function draw() {
  noStroke();
  background(207,222,231);
  translate(mouseX,mouseY)
  rotate(rot = rot +0.26*PI)
  
  // Draw the central ring 
  fill(143,146,153);
  ellipse(0,0,100,100);
  fill(223,210,151);
  ellipse(0,0,50,50);  
  
  // Draw the 4 half rings
  drawArc(0, -50, 100, 50, PI, 0, PIE);
  drawArc(50, 0, 100, 50, 1.5*PI, 0.5*PI, PIE);
  drawArc(0, 50, 100, 50, 0, PI, PIE);
  drawArc(-50, 0, 100, 50, 0.5*PI, 1.5*PI, PIE);
  
  // Draw the 4 small rings
  fill(193,33,39);
  arc(0, -85, 100, 100, 1.1*PI, 1.9*PI, OPEN);
  fill(223,210,151);
  arc(0, -85, 50, 50, 1.2*PI, 1.8*PI, OPEN);

  fill(193,33,39);
  arc(85, 0, 100, 100, 1.1*PI + PI/2, 1.9*PI + PI/2, OPEN);
  fill(223,210,151);
  arc(85, 0, 50, 50, 1.2*PI + PI/2, 1.8*PI + PI/2, OPEN);
  
  fill(193,33,39);
  arc(0, 85, 100, 100, 1.1*PI + PI, 1.9*PI + PI, OPEN);
  fill(223,210,151);
  arc(0, 85, 50, 50, 1.2*PI + PI, 1.8*PI + PI, OPEN);
  
  fill(193,33,39);
  arc(-85, 0, 100, 100, 1.1*PI + 3*PI/2, 1.9*PI + 3*PI/2, OPEN);
  fill(223,210,151);
  arc(-85, 0, 50, 50, 1.2*PI + 3*PI/2, 1.8*PI + 3*PI/2, OPEN);
  
  // Draw the 8 quarter rings
  drawArc(50, -50, 100, 50, 1.5*PI, 0, PIE);
  drawArc(50, 50, 100, 50, 0, 0.5*PI, PIE);
  drawArc(-50, 50, 100, 50, 0.5*PI, PI, PIE);
  drawArc(-50, -50, 100, 50, PI, 1.5*PI, PIE);
}

function drawArc(x, y, outer, inner, start, end, mode) {
  fill(143,146,153);
  arc(x, y, outer, outer, start, end, mode);
  fill(146,180,244);
  arc(x, y, inner, inner, start, end, mode);
}

// var barWidth = 20;
// var lastBar = -1;

// function setup() {
//   createCanvas(720, 400);
//   colorMode(HSB, height, height, height);  
//   noStroke();
//   background(0);
// }

// function draw() {
//   var whichBar = mouseX / barWidth;
//   if (whichBar !== lastBar) {
//     var barX = whichBar * barWidth;
//     fill(mouseY, height, height);
//     rect(barX, 0, barWidth, height);
//     lastBar = whichBar;
//   }
// }


function setup() {
  createCanvas(700, 500);
}

function draw() {
  background(0,255,255);
  //draw the red line
  line(0,0,700,500);
  strokeWeight(50);
  stroke(255,0,0);
  
  //draw the green shape
  push();
  noStroke();
  fill(0, 204, 0);
  ellipse(350,250,320,235);
  pop();
  
  //draw the blue shape
  push();
  noStroke();
  fill(0,0,150);
  rect(470,210,40,40);
  pop();
}function setup() {
  createCanvas(500, 500);//here is it!(Su HE)
}

function draw() {
  background(100);
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}