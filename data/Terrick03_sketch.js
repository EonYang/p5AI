function setup() {
  createCanvas(windowWidth, windowHeight);
  background(120, 200, 220);
}
function draw() {
  keyTyped();
}
function keyTyped() {
  let x = random(width);
  let y = random(height);
  
  if (key === "c") {
    
    fill(237, 255, 122, 100);
    stroke(237, 255, 122, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
   
  } else if (key === "d") {
    fill(122, 255, 126, 100);
    stroke(122, 255, 126, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
  } else if (key === "e") {
    fill(122, 137, 255, 100);
    stroke(122, 137, 255, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
  } else if (key === "f") {
    fill(182, 122, 255, 100);
    stroke(182, 122, 255, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
  } else if (key === "g") {
    fill(255, 122, 159, 100);
    stroke(255, 122, 159, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
  } else if (key === "a") {
    fill(255, 169, 122, 100);
    stroke(255, 169, 122, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
  } else if (key === "b") {
    fill(255, 216, 122, 100);
    stroke(255, 216, 122, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
  }
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(120, 200, 220);
}
function draw() {
  keyTyped();
}
function keyTyped() {
  let x = random(width);
  let y = random(height);
  
  if (key === "c") {
    
    fill(237, 255, 122, 100);
    stroke(237, 255, 122, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
   
  } else if (key === "d") {
    fill(122, 255, 126, 100);
    stroke(122, 255, 126, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
  } else if (key === "e") {
    fill(122, 137, 255, 100);
    stroke(122, 137, 255, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
  } else if (key === "f") {
    fill(182, 122, 255, 100);
    stroke(182, 122, 255, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
  } else if (key === "g") {
    fill(255, 122, 159, 100);
    stroke(255, 122, 159, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
  } else if (key === "a") {
    fill(255, 169, 122, 100);
    stroke(255, 169, 122, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
  } else if (key === "b") {
    fill(255, 216, 122, 100);
    stroke(255, 216, 122, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
  }
let currOpacity = 100;
let boolPressed = false;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(120, 200, 220);
}
function draw() {
  keyTyped();
  
  if (boolPressed == true){
    currOpacity = currOpacity - 1;
    if (currOpacity == 0){
      currOpacity = 0;
      boolPressed = false;
    }
      
  console.log("currOpacity",currOpacity);
  }
}
function keyTyped() {
  let x = random(width);
  let y = random(height);
  let opacity = 100;
  if (key === "c") {
    
    drawEverything();
    
    boolPressed = true;
  
    fill(237, 255, 122, 100);
    stroke(237, 255, 122, currOpacity);
    ellipse(x, y, random(0, 600), random(0, 600));
    keyReleased();
  } else if (key === "d") {
    fill(122, 255, 126, 100);
    stroke(122, 255, 126, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
  } else if (key === "e") {
    fill(122, 137, 255, 100);
    stroke(122, 137, 255, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
  } else if (key === "f") {
    fill(182, 122, 255, 100);
    stroke(182, 122, 255, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
  } else if (key === "g") {
    fill(255, 122, 159, 100);
    stroke(255, 122, 159, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
  } else if (key === "a") {
    fill(255, 169, 122, 100);
    stroke(255, 169, 122, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
  } else if (key === "b") {
    fill(255, 216, 122, 100);
    stroke(255, 216, 122, 100);
    ellipse(x, y, random(0, 600), random(0, 600));
  }
}
function drawEverything(){
	console.log("put_Everything");
  
  
  
  
var s;
var scl = 20;
var food;
function preload() {
img = loadImage('trump.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  s = new Snake();
  frameRate(10);
  pickLocation();
 textAlign(CENTER);
  textSize(30);
  noStroke();
  
  
  var options = {
    preventDefault: true
  };
  var hammer = new Hammer(document.body, options);
  hammer.get('swipe').set({
    direction: Hammer.DIRECTION_ALL
  });
  hammer.on("swipe", swiped);
  
  
}
function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}
function mousePressed() {
  s.total++;
}
function draw() {
  background(0,0, random(0,60));
  
  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();
  fill(255, 0, 100);
  image(img, food.x, food.y, scl, scl);
  
  
}
function swiped(event) {
  console.log(event);
  if (event.direction == 4) {
      s.dir(1, 0);
  } else if (event.direction == 8) {
     s.dir(0, -1);
  } else if (event.direction == 16) {
    s.dir(0, 1);
  } else if (event.direction == 2) {
   s.dir(-1, 0);
  }
}
var s;
var scl = 20;
var food;
function preload() {
img = loadImage('trump.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  s = new Snake();
  frameRate(10);
  pickLocation();
 textAlign(CENTER);
  textSize(30);
  noStroke();
  
  
  var options = {
    preventDefault: true
  };
  var hammer = new Hammer(document.body, options);
  hammer.get('swipe').set({
    direction: Hammer.DIRECTION_ALL
  });
  hammer.on("swipe", swiped);
  
  
}
function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}
function mousePressed() {
  s.total++;
}
function draw() {
  background(random, random, random);
  
  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();
  fill(255, 0, 100);
  image(img, food.x, food.y, scl, scl);
  
  
}
function swiped(event) {
  console.log(event);
  if (event.direction == 4) {
      s.dir(1, 0);
  } else if (event.direction == 8) {
     s.dir(0, -1);
  } else if (event.direction == 16) {
    s.dir(0, 1);
  } else if (event.direction == 2) {
   s.dir(-1, 0);
  }
}
function setup() {
  createCanvas(960, 540);
  background(0);
  noStroke();
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
  image(img,0,0);
}
var img = [];
var mySound = [];
var durations = [];
var button;
var frameCountAtPress = 0;
var isButtonPressed = [false, false, false, false, false, false];
var showImage = [];
var text1 = "I got my finger on the. . . pistol,\n Aiming it at a pig, \n Charlotte's Web is gonna miss you" ;
var text2 = "So get off that slave ship, \n Building your own pyramids, \n Write your own hieroglyphs, \n Just call this. . .HiiiPower, \n Yeah nothing less than HiiiPower";
var text3 = "I mean the. . . is, \n Huey Newton going stupid, \n You can't resist his, \n HiiiPower, \n Throw your hands up for HiiiPower";
var text4 = "Every day we fight the system just to make our way, \n We been down for too long but that's alright, \n We was built to be strong cause it's our life, \n Na-na-nah, \n Every day we fight the system, \n We fight the system, \n We fight the system (Never liked the system), \n We been down for too long, \n But that's alright, \n Na-na-nah";
var text5 = "And I want everybody to view my autopsy, \n So you can see exactly \n Where the government had shot me";
var text6 = "Product of the late 80s, \n Trying to stay above water, \n That's why we shun the Navy, \n Pull your guns and play me, \n Let's set it off, \n Cause a riot, \n Throw a Molotov";
var showText = [text1,text2,text3,text4,text5,text6];
function preload() {
  img[0] = loadImage("gov.gif");
  img[1] = loadImage("21boombox.png");
  img[2] = loadImage("TV.png");
  img[3] = loadImage("80s/Crack.jpeg");
  img[4] = loadImage("80s/crack2.jpg");
  img[5] = loadImage("Gov/Oscar Grant.jpeg");
  img[6] = loadImage("Gov/Emmett Till.jpg");
  img[7] = loadImage("boombox1111.png");
  img[8] = loadImage("Gov/Trayvon Martin.jpg");
  img[9] = loadImage("Riots/Riot1.jpeg");
  img[10] = loadImage("Riots/Riot2.jpeg");
  img[11] = loadImage("System/black2.jpeg");
  img[12] = loadImage("System/Black1.jpeg");
  img[13] = loadImage("System/Black3.jpeg");
  img[14] = loadImage("Thug/Tupac.png");
  img[15] = loadImage("Huey Newton/Huey Newton .jpeg");
  img[16] = loadImage("pyramids/pyramids0.jpg");
  img[17] = loadImage("pyramids/pyramids1.jpg");
  img[18] = loadImage("pistol0.jpg");
  img[19] = loadImage("Dresser.png");
  img[20] = loadImage("Hat.png");
  img[21] = loadImage("Christmas photo.jpg");
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Music/pistol1.mp3');
  mySound[1] = loadSound('Music/Slave ships1.mp3');
  mySound[2] = loadSound('Music/HueyNewton1.mp3');
  mySound[3] = loadSound('Music/System.mp3');
  mySound[4] = loadSound('Music/Gov.mp3');
  mySound[5] = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  textAlign(CENTER);
  textSize(24);
  
  
  for (var i = 0; i < mySound.length; i++) {
    durations[i] = mySound.duration;
  }
  for (var j = 0; j < 19; j++) {
    showImage[j] = false;
  }
  
  displayText = false;
  displayText2 = false;
  displayText3 = false;
  displayText4 = false;
  displayText5 = false;
  displayText6 = false;
}
function draw() {
  console.log(mouseX,mouseY);
  drawBackdrop();
  drawButtons();
  drawTVImages();
  
  
  fill(0);
  if (displayText) {
    text(showText[0],1000,500);
}
  
  if (displayText2) {
    text(showText[1],1000,500);
  }
  
  if (displayText3) {
    text(showText[2],1000,500);
  }
  
  if (displayText4) {
    text(showText[3],1000,500);
  }  
  if (displayText5) {
    text(showText[4],1000,500);
  } 
  if (displayText6) {
    text(showText[5],1000,500);
  }
}
function mousePressed() {
  console.log(isButtonPressed[0]);
  
  if (mouseX > 270 &&
    mouseX < 304 &&
    mouseY > 702 &&
    mouseY < 717) {
    isButtonPressed[0] = !isButtonPressed[0];
   
    if (isButtonPressed[0]) {
      hideImages();
             
      showImage[18] = true;
      
      
      if (mySound[0].isPlaying()) {
        mySound[0].pause();
        displayText = false;
      } else {
        mySound[0].play();
        displayText = true;
      }
    }
  } else {
    if (mouseX > 304 &&
      mouseX < 338 &&
      mouseY > 702 &&
      mouseY < 717) {
      
      isButtonPressed[1] = !isButtonPressed[1];
      if (isButtonPressed[1]) {
        hideImages();
        showImage[16] = true;
        
         
        if (mySound[1].isPlaying()) {
          mySound[1].pause();
          displayText2 = false;
        } else {
          mySound[1].play();
          displayText2 = true;
        }
      }
    } else {
      if (mouseX > 338 &&
        mouseX < 372 &&
        mouseY > 702 &&
        mouseY < 717) {
        isButtonPressed[2] = !isButtonPressed[2];
        if (isButtonPressed[2]) {
          hideImages();
          showImage[15] = true;
           
          
          if (mySound[2].isPlaying()) {
            mySound[2].pause();
            displayText3 = false;
          } else {
            mySound[2].play();
            displayText3 = true;
          }
        }
      } else {
        if (mouseX > 440 &&
          mouseX < 474 &&
          mouseY > 702 &&
          mouseY < 717) {
          isButtonPressed[3] = !isButtonPressed[3];
          if (isButtonPressed[3]) {
            hideImages();
            showImage[11] = true;
             
            if (mySound[3].isPlaying()) {
              mySound[3].pause();
              displayText4 = false;
            } else {
              mySound[3].play();
              displayText4 = true;
            }
          }
        } else {
          if (mouseX > 474 &&
            mouseX < 508 &&
            mouseY > 702 &&
            mouseY < 717) {
            isButtonPressed[4] = !isButtonPressed[4];
            if (isButtonPressed[4]) {
              hideImages();
              showImage[6] = true;
              
              if (mySound[4].isPlaying()) {
                mySound[4].pause();
                displayText5 = false;
              } else {
                mySound[4].play();
                displayText5 = true;
              }
            }
          } else {
            if (mouseX > 508 &&
              mouseX < 542 &&
              mouseY > 702 &&
              mouseY < 717) {
              isButtonPressed[5] = !isButtonPressed[5];
              if (isButtonPressed[5]) {
                hideImages();
                showImage[3] = true;
                
                if (mySound[5].isPlaying()) {
                  mySound[5].pause();
                  displayText6 = false;
                } else {
                  mySound[5].play();
                  displayText6 = true;
                }
              }
            }
          }
        }
      }
    }
  }
    
  }
  function muteSounds() {
    for (var i = 0; i < mySound.length; i++) {
      mySound[i].pause();
    }
  }
  function drawBackdrop() {
    background("#FDF5E6");
    image(img[19], 30, 689, 750, 300);
    image(img[1], 100, 400);
    image(img[20], 210, 30, 700, 600);
    image(img[2], 550, 10, 800, 500);
    image(img[21],40, 50, 300, 200);
  }
  function drawButtons() {
    fill(220);
  }
  function drawTVImages() {
    for (var k = 0; k < 19; k++) {
      if (showImage[k]) {
        image(img[k], 670, 60, 560, 350);
      }
    }
  }
  function hideImages() {
    for (var i = 0; i < 19; i++) {
      showImage[i] = false;
    }
  }
 	createCanvas(displayWidth, displayHeight);
	strokeWeight(10)
	stroke(0);
}
function touchMoved() {
	line(mouseX, mouseY, pmouseX, pmouseY);
	return false;
var s;
var scl = 20;
var food;
function preload() {
img = loadImage('trump.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  s = new Snake();
  frameRate(10);
  pickLocation();
}
function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}
function mousePressed() {
  s.total++;
}
function draw() {
  background(200);
  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();
  fill(255, 0, 100);
  image(img, food.x, food.y, scl, scl);
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
var s;
var scl = 20;
var food;
function setup() {
  createCanvas(600, 600);
  s = new Snake();
  frameRate(10);
  pickLocation();
}
function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}
function mousePressed() {
  s.total++;
}
function draw() {
  background(200);
  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();
  fill(255, 0, 100);
   text('trump', food.x, food.y, scl, scl);
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
var s;
var scl = 20;
var food;
var s = 'trump';
function setup() {
  createCanvas(displayWidth, displayHeight);
  s = new Snake();
  frameRate(10);
  pickLocation();
}
function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}
function mousePressed() {
  s.total++;
}
function draw() {
  background(255);
  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();
  fill(255, 0, 100);
   text('trump', food.x, food.y, scl, scl);
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}function preload() {
  img[0] = loadImage("b/bas 1.jpg");
  img[1] = loadImage("b/bas 2.jpg");
  img[2] = loadImage("b/bas 3.jpg");
  img[3] = loadImage("b/bas 4.jpg");
  img[4] = loadImage("b/bas 5.jpg");
  img[5] = loadImage("b/bas 6.jpg");
  img[6] = loadImage("b/bas 7.jpg");
  img[7] = loadImage("b/bas 8.jpg");
  img[8] = loadImage("b/bas 9.jpg");
  img[9] = loadImage("b/bas 10.jpg");
  img[10] = loadImage("b/bas 11.jpg");
  
  img[11] = loadImage("t/Pac 1.jpg");
  img[12] = loadImage("t/Pac 2.jpg");
  img[13] = loadImage("t/Pac 3.jpg");
  img[14] = loadImage("t/Pac 4.jpg");
  img[15] = loadImage("t/Pac 5.jpg");
  img[16] = loadImage("t/Pac 6.jpg");
  img[17] = loadImage("t/Pac 7.jpg");
  img[18] = loadImage("t/Pac 8.jpg");
  img[19] = loadImage("t/Pac 9.jpg");
  img[20] = loadImage("t/Pac 10.jpg");
  img[21] = loadImage("t/Pac 11.jpg");
}
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  
  
  
}function setup() { 
  createCanvas(displayWidth, displayHeight);
  strokeWeight(10);
  background(255);
} 
function draw() { 
  stroke(0);
  }
function touchMoved() {
  line(mouseX, mouseY, pmouseX, pmouseY);
}
function keyPressed () {
  if (keyCode == UP_ARROW) {
    saveCanvas("out","png");
  } else if (keyCode == DOWN_ARROW) {
             background (255);
}
return false;
}let x = 100;
function setup() { 
  createCanvas(displayWidth, displayHeight);
  frameRate(5);
} 
function draw() { 
  
  background(255);
  fill( mouseY);
  rect(0, 0, displayWidth, displayHeight);
var s;
var scl = 20;
var food;
function setup() {
  createCanvas(600, 600);
  s = new Snake();
  frameRate(10);
  pickLocation();
}
function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}
function mousePressed() {
  s.total++;
}
function draw() {
  background(51);
  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}var buttonB = {
  x: 302,
  y: 455,
  d: 50
};
var buttonA = {
  x: 365,
  y: 425,
  d: 50
};
 power = {
x: 0,
y: 14,
w: 20,
h: 8
};
var sliderStart = 75;
var sliderEnd = 115;
var offsetX = 0; 
function gameboy () {
   
fill(219,217,208);
noStroke();
rect(30, 20, 400, 650, 20, 20, 100, 20);
stroke(180);
strokeWeight(5);
line(32,50,426,50);
line(70,22,70,50);
line(390,22,390,50);
	
fill(85,87,120);
noStroke();
rect(70, 70, 320, 250, 20, 20, 60, 20);
  
fill(0,0, 0);
rect(130, 100, 200, 180);
  
fill(17,28,118);
textSize(18);
textFont("Arial");
textStyle("bold");
text("Nintendo", 70, 350);
fill(17,28,118);
textSize(24);
textFont("Arial");
textStyle("italic");
text("GAME BOY", 152, 350);
fill(17,28,118);
textSize(8);
textFont("Arial");
textStyle("bold");
text("TM", 280, 350);
push();
translate(70, 400);
rotate(-44.4);
stroke(140);
strokeWeight(1);
noFill();
rect(98, 250, 10, 70, 20, 20, 20, 20);
rect(122, 250, 10, 70, 20, 20, 20, 20);
rect(146, 250, 10, 70, 20, 20, 20, 20);
rect(168, 250, 10, 70, 20, 20, 20, 20);
rect(192, 250, 10, 70, 20, 20, 20, 20);
rect(216, 250, 10, 70, 20, 20, 20, 20);
  
fill(140);
noStroke();
textSize(15);
rect(0, 150, 60, 12, 20, 20, 20, 20);
rect(60, 190, 60, 12, 20, 20, 20, 20);
fill(17,28,118);
text("SELECT", 2, 178);
text("START", 66, 218);
fill(140, 27, 79);
ellipse(260,150, 50, 50);
ellipse(190,150, 50, 50);
fill(17,28,118);
text("A", 255,190);
text("B", 185,192);
pop();
  
fill(0);
  rect( 70, 425, 85, 35, 5, 5, 5, 5);
 rect( 95, 400, 35, 85, 5, 5, 5, 5);
  fill(140)
rect(power.x, power.y, power.w, power.h);
  var b = map(power.x,sliderStart,sliderEnd-power.w,0,255);
}
function powerbutton() {
  fill(140)
rect(power.x, power.y, power.w, power.h);
  var b = map(power.x,sliderStart,sliderEnd-power.w,0,255);
}
function poweron () {
  if (power.x >= 95) {
    
fill(0,frameCount%260, 0);
var onScreen= rect(130, 100, 200, 180);
		
		image(img, 130, 100, 200, 180);
		
    } 
  
  
  if (dragging) {
    power.x = mouseX + offsetX;
  }
  power.x = constrain(power.x, sliderStart, sliderEnd-power.w);
}
function mousePressed() {
  if (mouseX > power.x && mouseX < power.x + power.w && mouseY > power.y && mouseY < power.y + power.h) {
    dragging = true;
    offsetX = power.x-mouseX;
  }
}
function mouseReleased() {
  dragging = false;
}
var s;
var scl = 10;
var food;
function setup() { 
  createCanvas(700, 700);
  
  
  
  s = new Snake();
  frameRate(5);
  pickLocation();
 
} 
function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}
function mousePressed() {
  s.total++;
}
function draw() { 
background(255);
gameboy(); 
powerbutton();    
poweron(); 
  
  
  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}
function setup() { 
  createCanvas(displayWidth, displayHeight);
  frameRate(5);
  
} 
var x, y;
function draw() { 
  background(220);
  rect(x,y,20,50);
  
  fill(random(255,0,0));
  rect(50, 50, 52, 52);
  rect(150, 250, 52, 52);
  fill(mouseX);
  rect(75, 75, 52, 52);
  rect(175, 25, 20, 52);
  rect(175, 500, 52, 52);
  
}
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let scoreCalculated = false;
let myFont;
let mySound = [];
let randomString0 = " ";
let randomString1 = " ";
let randomString2 = " ";
let randomString3 = " ";
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL_0.png");
  img[4] = loadImage("TSL/SL_2.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL_1.png");
  img[8] = loadImage("TSL/SL7.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  img[12] = loadImage("TSL/SL12.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Sound/Answer_Y.mp3');
  mySound[1] = loadSound('Sound/Answer_N.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(250);
  textAlign(CENTER);
  if (imageIndex > 11) {
    fill(0, 173, 231);
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7 + 25);
    fill(82, 82, 82);
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7 + 25);
  }
  noStroke();
  textAlign(LEFT);
  fill(255);
  if (imageIndex > 2 &&  imageIndex <= 11) {
    rect(windowWidth / 16 - 5, windowHeight * 3 / 5 + 2, percentage1 * 7, 25);
    rect(windowWidth * 9 / 16 + 9, windowHeight * 3 / 5 + 2, percentage2 * 7, 25);
  }
  if ( imageIndex > 1 && imageIndex < 12 ) {
    textAlign(CENTER);
    textSize(140);
    fill(58, 164, 128);
    text(randomString0, windowWidth * 1 / 4 - 5, 500);
    text(randomString2, windowWidth * 3 / 4 - 5, 500);
    
    fill(229, 32, 42);
    text(randomString1, windowWidth * 1 / 4 - 5, 500);
    text(randomString3, windowWidth * 3 / 4 - 5, 500);
  }
 
}
  console.log(data);
  if (data == "0") {
    console.log(data);
    mySound[0].play();
    randomString0 = "Yes";
  } else if (data == "1") {
    console.log(data);
    mySound[1].play();
    randomString1 = "No";
  } else if (data == "2") {
    console.log(data);
    mySound[0].play();
    randomString2 = "Yes";
  } else if (data == "3") {
    console.log(data);
    mySound[1].play();
    randomString3 = "No";
  } else if (data.length > 0) {
    console.log(data);
    if (data.length >= 2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {
        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}
function calculateScore(data) {
  if (imageIndex > 1 && data[0] == 1) {
    score[0]++;
  }
  if ( imageIndex > 1 && data[2] == 1) {
    score[1]++;
  }
  currentQuestion++;
  imageIndex++;
  scoreCalculated = false;
  randomString0 = " ";
  randomString1 = " ";
  randomString2 = " ";
  randomString3 = " ";
  if (imageIndex > 12) {
    imageIndex = 0;
    score[0] = 0;
    score[1] = 0;
   
  }
  percentage1 = score[0] * 10;
  percentage2 = score[1] * 10;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let scoreCalculated = false;
let myFont;
let mySound = [];
let randomString0 = " ";
let randomString1 = " ";
let randomString2 = " ";
let randomString3 = " ";
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL_0.png");
  img[4] = loadImage("TSL/SL_2.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL_1.png");
  img[8] = loadImage("TSL/SL7.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  img[12] = loadImage("TSL/SL12.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Sound/Answer_Y.mp3');
  mySound[1] = loadSound('Sound/Answer_N.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(250);
  textAlign(CENTER);
  if (imageIndex > 11) {
    fill(0, 173, 231);
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7 + 25);
    fill(82, 82, 82);
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7 + 25);
  }
  noStroke();
  textAlign(LEFT);
  fill(255);
  if (imageIndex > 2 &&  imageIndex <= 11) {
    rect(windowWidth / 16 - 5, windowHeight * 3 / 5 + 2, percentage1 * 7, 25);
    rect(windowWidth * 9 / 16 + 9, windowHeight * 3 / 5 + 2, percentage2 * 7, 25);
  }
  if ( imageIndex > 1 && imageIndex < 12 ) {
    textAlign(CENTER);
    textSize(140);
    fill(58, 164, 128);
    text(randomString0, windowWidth * 1 / 4 - 5, 500);
    text(randomString2, windowWidth * 3 / 4 - 5, 500);
    
    fill(229, 32, 42);
    text(randomString1, windowWidth * 1 / 4 - 5, 500);
    text(randomString3, windowWidth * 3 / 4 - 5, 500);
  }
 
}
  console.log(data);
  if (data == "0") {
    console.log(data);
    mySound[0].play();
    randomString0 = "Yes";
  } else if (data == "1") {
    console.log(data);
    mySound[1].play();
    randomString1 = "No";
  } else if (data == "2") {
    console.log(data);
    mySound[0].play();
    randomString2 = "Yes";
  } else if (data == "3") {
    console.log(data);
    mySound[1].play();
    randomString3 = "No";
  } else if (data.length > 0) {
    console.log(data);
    if (data.length >= 2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {
        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1) {
    score[0]++;
  }
  if (data[2] == 1) {
    score[1]++;
  }
  currentQuestion++;
  imageIndex++;
  scoreCalculated = false;
  randomString0 = " ";
  randomString1 = " ";
  randomString2 = " ";
  randomString3 = " ";
  if (imageIndex > 12) {
    imageIndex = 0;
    score[0] = 0;
    score[1] = 0;
   
  }
  percentage1 = score[0] * 10;
  percentage2 = score[1] * 10;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let scoreCalculated = false;
let myFont;
let mySound = [];
let randomString0 = " ";
let randomString1 = " ";
let randomString2 = " ";
let randomString3 = " ";
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  img[12] = loadImage("TSL/SL12.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Sound/Answer_Y.mp3');
  mySound[1] = loadSound('Sound/Answer_N.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(170);
  textAlign(CENTER);
  if (imageIndex > 11) {
    fill(0, 173, 231);
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7 + 25);
    fill(82, 82, 82);
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7 + 25);
  }
  noStroke();
  textAlign(LEFT);
  fill(255);
  if (imageIndex <= 11) {
    rect(windowWidth / 16 - 13, windowHeight * 3 / 5 + 2, percentage1 * 5, 15);
    rect(windowWidth * 9 / 16 - 7, windowHeight * 3 / 5 + 2, percentage2 * 5, 15);
  }
  if ( imageIndex > 1 && imageIndex < 12 ) {
    textAlign(CENTER);
    textSize(70);
    fill(58, 164, 128);
    text(randomString0, windowWidth * 1 / 4 - 5, 300);
    text(randomString2, windowWidth * 3 / 4 - 5, 300);
    
    fill(229, 32, 42);
    text(randomString1, windowWidth * 1 / 4 - 5, 300);
    text(randomString3, windowWidth * 3 / 4 - 5, 300);
  }
 
}
  console.log(data);
  if (data == "0") {
    console.log(data);
    mySound[0].play();
    randomString0 = "Yes";
  } else if (data == "1") {
    console.log(data);
    mySound[1].play();
    randomString1 = "No";
  } else if (data == "2") {
    console.log(data);
    mySound[0].play();
    randomString2 = "Yes";
  } else if (data == "3") {
    console.log(data);
    mySound[1].play();
    randomString3 = "No";
  } else if (data.length > 0) {
    console.log(data);
    if (data.length >= 2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {
        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1) {
    score[0]++;
  }
  if (data[2] == 1) {
    score[1]++;
  }
  currentQuestion++;
  imageIndex++;
  scoreCalculated = false;
  randomString0 = " ";
  randomString1 = " ";
  randomString2 = " ";
  randomString3 = " ";
  if (imageIndex > 12) {
    imageIndex = 0;
    score[0] = 0;
    score[1] = 0;
   
  }
  percentage1 = score[0] * 10;
  percentage2 = score[1] * 10;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let scoreCalculated = false;
let myFont;
let mySound = [];
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  img[12] = loadImage("TSL/SL12.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Sound/Answer_Y.mp3');
  mySound[1] = loadSound('Sound/Answer_N.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(170);
  textAlign(CENTER);
  if (imageIndex > 11) {
    fill(0, 173, 231);
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7+25);
    fill(82, 82, 82);
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7+25);
  }
  noStroke();
  textAlign(LEFT);
  fill(255);
  if (imageIndex <= 11) {
    rect(windowWidth / 16 - 13, windowHeight * 3 / 5 + 2, percentage1 * 5, 21);
    rect(windowWidth * 9 / 16 - 85, windowHeight * 3 / 5 + 2, percentage2 * 5, 21);
  }
}
  if (data == "YES") {
    console.log(data);
    mySound[0].play(); 
    
  } else if (data == "NO") {
     console.log(data);
     mySound[1].play();
  }  else if (data.length > 0) {
    console.log(data);
    if (data.length >= 2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {
        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1) {
    score[0]++;
  }
  if (data[2] == 1) {
    score[1]++;
  }
    currentQuestion++;
    imageIndex++;
 	 scoreCalculated = false;
    if (imageIndex > 12) {
      imageIndex = 0;
      score[0] = 0;
      score[1] = 0;
    }
    percentage1 = score[0] * 10;
    percentage2 = score[1] * 10;
  }
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let scoreCalculated = false;
let myFont;
let mySound = [];
let randomString0 = " ";
let randomString1 = " ";
let randomString2 = " ";
let randomString3 = " ";
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  img[12] = loadImage("TSL/SL12.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Sound/Answer_Y.mp3');
  mySound[1] = loadSound('Sound/Answer_N.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(170);
  textAlign(CENTER);
  if (imageIndex > 11) {
    fill(0, 173, 231);
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7 + 25);
    fill(82, 82, 82);
    text(percentage2 + '%', windowWidth * 3 / 4+100, windowHeight * 2 / 7 + 25);
  }
  noStroke();
  textAlign(LEFT);
  fill(255);
  if (imageIndex <= 11) {
    rect(windowWidth / 16 - 13, windowHeight * 3 / 5 + 2, percentage1 * 5, 21);
    rect(windowWidth * 9 / 16 - 85, windowHeight * 3 / 5 + 2, percentage2 * 5, 21);
  }
  if ( imageIndex > 1 && imageIndex < 12 ) {
    
    textSize(70);
    fill(58, 164, 128);
    text(randomString0, windowWidth * 1 / 5, 300);
    text(randomString2, windowWidth * 5 / 7, 300);
    
    fill(229, 32, 42);
    text(randomString1, windowWidth * 1 / 5, 300);
    text(randomString3, windowWidth * 5 / 7, 300);
  }
 
}
  console.log(data);
  if (data == "0") {
    console.log(data);
    mySound[0].play();
    randomString0 = "Yes";
  } else if (data == "1") {
    console.log(data);
    mySound[1].play();
    randomString1 = "No";
  } else if (data == "2") {
    console.log(data);
    mySound[0].play();
    randomString2 = "Yes";
  } else if (data == "3") {
    console.log(data);
    mySound[1].play();
    randomString3 = "No";
  } else if (data.length > 0) {
    console.log(data);
    if (data.length >= 2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {
        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1) {
    score[0]++;
  }
  if (data[2] == 1) {
    score[1]++;
  }
  currentQuestion++;
  imageIndex++;
  scoreCalculated = false;
  randomString0 = " ";
  randomString1 = " ";
  randomString2 = " ";
  randomString3 = " ";
  if (imageIndex > 12) {
    imageIndex = 0;
    score[0] = 0;
    score[1] = 0;
   
  }
  percentage1 = score[0] * 10;
  percentage2 = score[1] * 10;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let scoreCalculated = false;
let myFont;
let mySound = [];
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  img[12] = loadImage("TSL/SL12.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Sound/Answer_Y.mp3');
  mySound[1] = loadSound('Sound/Answer_N.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(170);
  textAlign(CENTER);
  if (imageIndex > 11) {
    fill(0, 173, 231);
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7+25);
    fill(82, 82, 82);
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7+25);
  }
  noStroke();
  textAlign(LEFT);
  fill(255);
  if (imageIndex <= 11) {
    rect(windowWidth / 16 - 13, windowHeight * 3 / 5 + 2, percentage1 * 5, 21);
    rect(windowWidth * 9 / 16 - 85, windowHeight * 3 / 5 + 2, percentage2 * 5, 21);
  }
}
  if (data == "YES") {
    console.log(data);
    mySound[0].play(); 
    
  } else if (data == "NO") {
     console.log(data);
     mySound[1].play();
  }  else if (data.length > 0) {
    console.log(data);
    if (data.length >= 2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {
        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1) {
    score[0]++;
  }
  if (data[2] == 1) {
    score[1]++;
  }
    currentQuestion++;
    imageIndex++;
 	 scoreCalculated = false;
    if (imageIndex > 12) {
      imageIndex = 0;
      score[0] = 0;
      score[1] = 0;
    }
    percentage1 = score[0] * 10;
    percentage2 = score[1] * 10;
  }
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let scoreCalculated = false;
let myFont;
let mySound = [];
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  img[12] = loadImage("TSL/SL12.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Sound/Answer_Y.mp3');
  mySound[1] = loadSound('Sound/Answer_N.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(170);
  textAlign(CENTER);
  if (imageIndex > 11) {
    fill(0, 173, 231);
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7+25);
    fill(82, 82, 82);
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7+25);
  }
  noStroke();
  textAlign(LEFT);
  fill(255);
  if (imageIndex <= 11) {
    rect(windowWidth / 16 - 13, windowHeight * 3 / 5 + 2, percentage1 * 5, 21);
    rect(windowWidth * 9 / 16 - 85, windowHeight * 3 / 5 + 2, percentage2 * 5, 21);
  }
}
  if (data == "YES") {
    console.log(data);
    mySound[0].play(); 
    
  } else if (data == "NO") {
     console.log(data);
     mySound[1].play();
  }  else if (data.length > 0) {
    console.log(data);
    if (data.length >= 2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {
        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1) {
    score[0]++;
  }
  if (data[2] == 1) {
    score[1]++;
  }
    currentQuestion++;
    imageIndex++;
 	 scoreCalculated = false;
    if (imageIndex > 12) {
      imageIndex = 0;
      score[0] = 0;
      score[1] = 0;
    }
    percentage1 = score[0] * 10;
    percentage2 = score[1] * 10;
  }
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let scoreCalculated = false;
let myFont;
let mySound = [];
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  img[12] = loadImage("TSL/SL12.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Sound/Answer_Y.mp3');
  mySound[1] = loadSound('Sound/Answer_N.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(170);
  textAlign(CENTER);
  if (imageIndex > 11) {
    fill(0, 173, 231);
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7+50);
    fill(82, 82, 82);
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7+50);
  }
  noStroke();
  textAlign(LEFT);
  fill(255);
  if (imageIndex <= 11) {
    rect(windowWidth / 16 - 13, windowHeight * 3 / 5 + 2, percentage1 * 5, 21);
    rect(windowWidth * 9 / 16 - 85, windowHeight * 3 / 5 + 2, percentage2 * 5, 21);
  }
}
  if (data == "YES") {
    console.log(data);
    mySound[0].play(); 
    
  } else if (data == "NO") {
     console.log(data);
     mySound[1].play();
  }  else if (data.length > 0) {
    console.log(data);
    if (data.length >= 2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {
        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1) {
    score[0]++;
  }
  if (data[2] == 1) {
    score[1]++;
  }
    currentQuestion++;
    imageIndex++;
 	 scoreCalculated = false;
    if (imageIndex > 12) {
      imageIndex = 0;
      score[0] = 0;
      score[1] = 0;
    }
    percentage1 = score[0] * 10;
    percentage2 = score[1] * 10;
  }
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let scoreCalculated = false;
let myFont;
let mySound = [];
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  img[12] = loadImage("TSL/SL12.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Sound/Answer_Y.mp3');
  mySound[1] = loadSound('Sound/Answer_N.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(170);
  textAlign(CENTER);
  if (imageIndex > 11) {
    fill('#00ade7ff');
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7);
    fill('#525252ff');
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7);
  }
  noStroke();
  textAlign(LEFT);
  fill(255);
  if (imageIndex <= 11) {
    rect(windowWidth / 16 - 13, windowHeight * 3 / 5 + 2, percentage1 * 5, 21);
    rect(windowWidth * 9 / 16 - 85, windowHeight * 3 / 5 + 2, percentage2 * 5, 21);
  }
}
  if (data == "YES") {
    console.log(data);
    mySound[0].play(); 
    
  } else if (data == "NO") {
     console.log(data);
     mySound[1].play();
  }  else if (data.length > 0) {
    console.log(data);
    if (data.length >= 2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {
        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1) {
    score[0]++;
  }
  if (data[2] == 1) {
    score[1]++;
  }
    currentQuestion++;
    imageIndex++;
 	 scoreCalculated = false;
    if (imageIndex > 12) {
      imageIndex = 0;
      score[0] = 0;
      score[1] = 0;
    }
    percentage1 = score[0] * 10;
    percentage2 = score[1] * 10;
  }
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let scoreCalculated = false;
let myFont;
let mySound = [];
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  img[12] = loadImage("TSL/SL12.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Sound/Answer_Y.mp3');
  mySound[1] = loadSound('Sound/Answer_N.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(200);
  textAlign(CENTER);
  if (imageIndex > 11) {
    fill('#00ade7ff');
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7);
    fill('#525252ff');
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7);
  }
  noStroke();
  textAlign(LEFT);
  fill(255);
  if (imageIndex <= 11) {
    rect(windowWidth / 16 - 13, windowHeight * 3 / 5 + 2, percentage1 * 5, 21);
    rect(windowWidth * 9 / 16 - 85, windowHeight * 3 / 5 + 2, percentage2 * 5, 21);
  }
}
  if (data == "YES") {
    console.log(data);
    mySound[0].play(); 
  } else if (data == "NO") {
     console.log(data);
     mySound[1].play();
  } else if (data.length > 0) {
    console.log(data);
    if (data.length == 2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {
        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1) {
    score[0]++;
  }
  if (data[1] == 1) {
    score[1]++;
  }
    currentQuestion++;
    imageIndex++;
 	 scoreCalculated = false;
    if (imageIndex > 12) {
      imageIndex = 0;
      score[0] = 0;
      score[1] = 0;
    }
    percentage1 = score[0] * 10;
    percentage2 = score[1] * 10;
  }
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let myFont;
let mySound = [];
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
  
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Sound/Answer_Y.mp3');
  mySound[1] = loadSound('Sound/Answer_N.mp3'); 
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(250);
  textAlign(CENTER);
  if (imageIndex > 10) {
    fill('#00ade7ff');
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7);
     fill('#525252ff');
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7);
  }
  noStroke();
  textAlign(LEFT);
  fill(255);
  
  if (imageIndex <= 10) {
      
    rect(windowWidth/16 - 13, windowHeight * 3/5 +2, percentage1 * 5, 21);
    rect(windowWidth * 9/16 - 85 , windowHeight * 3/5 +2, percentage2 * 5, 21);
  }
}
 
  if (data.length > 0) {
    data = data.split(',');
    
    if(data.length==2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {
        
      } else {  if(data.length>2) {
        
        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1)
    score[0]++;
  if (data[1] == 1)
    score[1]++;
  console.log(score);
  currentQuestion++;
  imageIndex++;
  if (imageIndex > 11) {
    imageIndex = 0;
    score[0] = 0;
    score[1] = 0;
  }
  percentage1 = score[0] * 10;
  percentage2 = score[1] * 10;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let scoreCalculated = false;
let myFont;
let mySound = [];
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Sound/Answer_Y.mp3');
  mySound[1] = loadSound('Sound/Answer_N.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(250);
  textAlign(CENTER);
  if (imageIndex > 10) {
    fill('#00ade7ff');
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7);
    fill('#525252ff');
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7);
  }
  noStroke();
  textAlign(LEFT);
  fill(255);
  if (imageIndex <= 10) {
    rect(windowWidth / 16 - 13, windowHeight * 3 / 5 + 2, percentage1 * 5, 21);
    rect(windowWidth * 9 / 16 - 85, windowHeight * 3 / 5 + 2, percentage2 * 5, 21);
  }
}
  console.log(data);
  if (data == "YES") {
    mySound[0].play(); 
  } else if (data == "NO") {
     mySound[1].play();
  } else if (data.length > 0) {
    data = data.split(',');
    if (data.length == 2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {
        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1) {
    score[0]++;
    mySound[0].play();
  } else if (data[1] == 1) {
    mySound[1].play();
  }
  if (data[2] == 1) {
    score[1]++;
    mySound[0].play();
  } else if (data[3] == 1) {
    mySound[1].play();
  }
  
    currentQuestion++;
    imageIndex++;
 	 scoreCalculated = false;
 
    if (imageIndex > 11) {
      imageIndex = 0;
      score[0] = 0;
      score[1] = 0;
    }
    percentage1 = score[0] * 10;
    percentage2 = score[1] * 10;
  }
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
var img = [];
var mySound = [];
var durations = [];
var button;
var frameCountAtPress = 0;
var isButtonPressed = [false, false, false, false, false, false];
var showImage = [];
var text1 = "I got my finger on the motherfucking pistol,\n Aiming it at a pig, \n Charlotte's Web is gonna miss you" ;
var text2 = "So get off that slave ship, \n Building your own pyramids, \n Write your own hieroglyphs, \n Just call this shit HiiiPower, \n Nigga nothing less than HiiiPower";
var text3 = "I mean the shit is, \n Huey Newton going stupid, \n You can't resist his, \n HiiiPower, \n Throw your hands up for HiiiPower";
var text4 = "Every day we fight the system just to make our way, \n We been down for too long but that's alright, \n We was built to be strong cause it's our life, \n Na-na-nah, \n Every day we fight the system, \n We fight the system, \n We fight the system (Never liked the system), \n We been down for too long, \n But that's alright, \n Na-na-nah";
var text5 = "And I want everybody to view my autopsy, \n So you can see exactly \n Where the government had shot me";
var text6 = "Product of the late 80s, \n Trying to stay above water, \n That's why we shun the Navy, \n Pull your guns and play me, \n Let's set it off, \n Cause a riot, \n Throw a Molotov";
var showText = [text1,text2,text3,text4,text5,text6];
function preload() {
  img[0] = loadImage("gov.gif");
  img[1] = loadImage("21boombox.png");
  img[2] = loadImage("TV.png");
  img[3] = loadImage("80s/Crack.jpeg");
  img[4] = loadImage("80s/crack2.jpg");
  img[5] = loadImage("Gov/Oscar Grant.jpeg");
  img[6] = loadImage("Gov/Emmett Till.jpg");
  img[7] = loadImage("boombox1111.png");
  img[8] = loadImage("Gov/Trayvon Martin.jpg");
  img[9] = loadImage("Riots/Riot1.jpeg");
  img[10] = loadImage("Riots/Riot2.jpeg");
  img[11] = loadImage("System/black2.jpeg");
  img[12] = loadImage("System/Black1.jpeg");
  img[13] = loadImage("System/Black3.jpeg");
  img[14] = loadImage("Thug/Tupac.png");
  img[15] = loadImage("Huey Newton/Huey Newton .jpeg");
  img[16] = loadImage("pyramids/pyramids0.jpg");
  img[17] = loadImage("pyramids/pyramids1.jpg");
  img[18] = loadImage("pistol0.jpg");
  img[19] = loadImage("Dresser.png");
  img[20] = loadImage("Hat.png");
  img[21] = loadImage("Christmas photo.jpg");
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Music/pistol.mp3');
  mySound[1] = loadSound('Music/Slave ships.mp3');
  mySound[2] = loadSound('Music/HueyNewton.mp3');
  mySound[3] = loadSound('Music/System.mp3');
  mySound[4] = loadSound('Music/Gov.mp3');
  mySound[5] = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  textAlign(CENTER);
  textSize(24);
  
  
  for (var i = 0; i < mySound.length; i++) {
    durations[i] = mySound.duration;
  }
  for (var j = 0; j < 19; j++) {
    showImage[j] = false;
  }
  
  displayText = false;
  displayText2 = false;
  displayText3 = false;
  displayText4 = false;
  displayText5 = false;
  displayText6 = false;
}
function draw() {
  console.log(mouseX,mouseY);
  drawBackdrop();
  drawButtons();
  drawTVImages();
  
  
  fill(0);
  if (displayText) {
    text(showText[0],1000,500);
}
  
  if (displayText2) {
    text(showText[1],1000,500);
  }
  
  if (displayText3) {
    text(showText[2],1000,500);
  }
  
  if (displayText4) {
    text(showText[3],1000,500);
  }  
  if (displayText5) {
    text(showText[4],1000,500);
  } 
  if (displayText6) {
    text(showText[5],1000,500);
  }
}
function mousePressed() {
  console.log(isButtonPressed[0]);
  
  if (mouseX > 270 &&
    mouseX < 304 &&
    mouseY > 702 &&
    mouseY < 717) {
    isButtonPressed[0] = !isButtonPressed[0];
   
    if (isButtonPressed[0]) {
      hideImages();
             
      showImage[18] = true;
      
      
      if (mySound[0].isPlaying()) {
        mySound[0].pause();
        displayText = false;
      } else {
        mySound[0].play();
        displayText = true;
      }
    }
  } else {
    if (mouseX > 304 &&
      mouseX < 338 &&
      mouseY > 702 &&
      mouseY < 717) {
      
      isButtonPressed[1] = !isButtonPressed[1];
      if (isButtonPressed[1]) {
        hideImages();
        showImage[16] = true;
        
         
        if (mySound[1].isPlaying()) {
          mySound[1].pause();
          displayText2 = false;
        } else {
          mySound[1].play();
          displayText2 = true;
        }
      }
    } else {
      if (mouseX > 338 &&
        mouseX < 372 &&
        mouseY > 702 &&
        mouseY < 717) {
        isButtonPressed[2] = !isButtonPressed[2];
        if (isButtonPressed[2]) {
          hideImages();
          showImage[15] = true;
           
          
          if (mySound[2].isPlaying()) {
            mySound[2].pause();
            displayText3 = false;
          } else {
            mySound[2].play();
            displayText3 = true;
          }
        }
      } else {
        if (mouseX > 440 &&
          mouseX < 474 &&
          mouseY > 702 &&
          mouseY < 717) {
          isButtonPressed[3] = !isButtonPressed[3];
          if (isButtonPressed[3]) {
            hideImages();
            showImage[11] = true;
             
            if (mySound[3].isPlaying()) {
              mySound[3].pause();
              displayText4 = false;
            } else {
              mySound[3].play();
              displayText4 = true;
            }
          }
        } else {
          if (mouseX > 474 &&
            mouseX < 508 &&
            mouseY > 702 &&
            mouseY < 717) {
            isButtonPressed[4] = !isButtonPressed[4];
            if (isButtonPressed[4]) {
              hideImages();
              showImage[6] = true;
              
              if (mySound[4].isPlaying()) {
                mySound[4].pause();
                displayText5 = false;
              } else {
                mySound[4].play();
                displayText5 = true;
              }
            }
          } else {
            if (mouseX > 508 &&
              mouseX < 542 &&
              mouseY > 702 &&
              mouseY < 717) {
              isButtonPressed[5] = !isButtonPressed[5];
              if (isButtonPressed[5]) {
                hideImages();
                showImage[3] = true;
                
                if (mySound[5].isPlaying()) {
                  mySound[5].pause();
                  displayText6 = false;
                } else {
                  mySound[5].play();
                  displayText6 = true;
                }
              }
            }
          }
        }
      }
    }
  }
    
  }
  function muteSounds() {
    for (var i = 0; i < mySound.length; i++) {
      mySound[i].pause();
    }
  }
  function drawBackdrop() {
    background("#FDF5E6");
    image(img[19], 30, 689, 750, 300);
    image(img[1], 100, 400);
    image(img[20], 210, 30, 700, 600);
    image(img[2], 550, 10, 800, 500);
    image(img[21],40, 50, 300, 200);
  }
  function drawButtons() {
    fill(220);
  }
  function drawTVImages() {
    for (var k = 0; k < 19; k++) {
      if (showImage[k]) {
        image(img[k], 670, 60, 560, 350);
      }
    }
  }
  function hideImages() {
    for (var i = 0; i < 19; i++) {
      showImage[i] = false;
    }
  }
var img = [];
var mySound = [];
var durations = [];
var button;
var frameCountAtPress = 0;
var isButtonPressed = [false, false, false, false, false, false];
var showImage = [];
var showText = [];
function preload() {
  img[0] = loadImage("gov.gif");
  img[1] = loadImage("21boombox.png");
  img[2] = loadImage("tv211.png");
  img[3] = loadImage("80s/Crack.jpeg");
  img[4] = loadImage("80s/crack2.jpg");
  img[5] = loadImage("Gov/Oscar Grant.jpeg");
  img[6] = loadImage("Gov/Emmett Till.jpg");
  img[7] = loadImage("boombox1111.png");
  img[8] = loadImage("Gov/Trayvon Martin.jpg");
  img[9] = loadImage("Riots/Riot1.jpeg");
  img[10] = loadImage("Riots/Riot2.jpeg");
  img[11] = loadImage("System/black2.jpeg");
  img[12] = loadImage("System/Black1.jpeg");
  img[13] = loadImage("System/Black3.jpeg");
  img[14] = loadImage("Thug/Tupac.png");
  img[15] = loadImage("Huey Newton/Huey Newton .jpeg");
  img[16] = loadImage("pyramids/pyramids0.jpg");
  img[17] = loadImage("pyramids/pyramids1.jpg");
  img[18] = loadImage("pistol0.jpg")
  img[19] = loadImage("ICM_NewImage.jpg")
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Music/pistol.mp3');
  mySound[1] = loadSound('Music/Slave ships.mp3');
  mySound[2] = loadSound('Music/HueyNewton.mp3');
  mySound[3] = loadSound('Music/System.mp3');
  mySound[4] = loadSound('Music/Gov.mp3');
  mySound[5] = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  
 
  button = createButton(" ");
  button.position(19, 19);
    fill(0);
  for (var i = 0; i < mySound.length; i++) {
    durations[i] = mySound.duration;
  }
  for (var j = 0; j < 19; j++) {
    showImage[j] = false;
  }
}
function draw() {
  drawBackdrop();
  drawButtons();
  drawTVImages();
s = "quickb";
fill(50);
}
function mousePressed() {
  console.log(isButtonPressed[0]);
  if (mouseX > 186/800*windowWidth &&
    mouseX < 286/800*windowWidth &&
    mouseY > 389 &&
    mouseY < 489) {
    
    
    isButtonPressed[0] = !isButtonPressed[0];
    if (isButtonPressed[0]) {
   
      
     
      
      hideImages();
      showImage[18] = true;
      if (mySound[0].isPlaying()) {
        mySound[0].pause();
      } else {
        mySound[0].play();
      }
    }
  } else {
    if (mouseX > 355/1533*windowWidth &&
      mouseX < 511/1533*windowWidth&&
      mouseY > 389 &&
      mouseY < 199) {
      isButtonPressed[1] = !isButtonPressed[1];
      if (isButtonPressed[1]) {
        hideImages();
        showImage[16] = true;
        if (mySound[1].isPlaying()) {
          mySound[1].pause();
        } else {
          mySound[1].play();
        }
      }
    } else {
      if (mouseX > 338 &&
        mouseX < 372 &&
        mouseY > 702 &&
        mouseY < 717) {
        isButtonPressed[2] = !isButtonPressed[2];
        if (isButtonPressed[2]) {
          hideImages();
          showImage[15] = true;
          if (mySound[2].isPlaying()) {
            mySound[2].pause();
          } else {
            mySound[2].play();
          }
        }
      } else {
        if (mouseX > 297 &&
          mouseX < 421 &&
          mouseY > 630 &&
          mouseY < 819) {
          isButtonPressed[3] = !isButtonPressed[3];
          if (isButtonPressed[3]) {
            hideImages();
            showImage[11] = true;
            if (mySound[3].isPlaying()) {
              mySound[3].pause();
            } else {
              mySound[3].play();
            }
          }
        } else {
          if (mouseX > 474 &&
            mouseX < 508 &&
            mouseY > 702 &&
            mouseY < 717) {
            isButtonPressed[4] = !isButtonPressed[4];
            if (isButtonPressed[4]) {
              hideImages();
              showImage[6] = true;
              if (mySound[4].isPlaying()) {
                mySound[4].pause();
              } else {
                mySound[4].play();
              }
            }
          } else {
            if (mouseX > 508 &&
              mouseX < 542 &&
              mouseY > 702 &&
              mouseY < 717) {
              isButtonPressed[5] = !isButtonPressed[5];
              if (isButtonPressed[5]) {
                hideImages();
                showImage[3] = true;
                if (mySound[5].isPlaying()) {
                  mySound[5].pause();
                } else {
                  mySound[5].play();
                }
              }
            }
          }
        }
      }
    }
  }
    
  }
  function muteSounds() {
    for (var i = 0; i < mySound.length; i++) {
      mySound[i].pause();
    }
  }
  function drawBackdrop() {
    image(img[19], 0, 0, windowWidth, 533);
    noStroke();
    fill("white");
    rect(484/1533 * windowWidth, 247, 263/1533*windowWidth, 100, 5, 5, 5, 5);
    fill("red");
   rect(355/1533*windowWidth, 389, 156/1533*windowWidth, 110, 5, 5, 5, 5);
      fill("blue");
    rect(320/800*windowWidth, 390, 122/800*windowWidth, 108, 5, 5, 5, 5);
  fill("green");
    rect(390/800*windowWidth, 155, 84/800*windowWidth, 70, 5, 5, 5, 5);
     fill("yellow");
    rect(886/1533*windowWidth, 242, 137/1533*windowWidth, 49, 5, 5, 5, 5);
    fill("purple");
    rect(478/800*windowWidth, 392, 136/800*windowWidth, 113, 5, 5, 5, 5);
    fill("orange");
    rect(565/800*windowWidth, 300, 72/800*windowWidth, 52, 5, 5, 5, 5);
  }
  function drawButtons() {
    fill(220);
  }
  function drawTVImages() {
    for (var k = 0; k < 19; k++) {
      if (showImage[k]) {
        
       image(img[18], 355/1533*windowWidth, 389, 66/650*windowWidth, 125/650*windowHeight);
        
       image(img[16], 320/800*windowWidth, 390, 122/800*windowWidth, 108);
         image(img[15], 478/800*windowWidth, 392, 136/800*windowWidth, 113);
         image(img[11], 390/800*windowWidth, 155, 84/800*windowWidth, 70);
       image(img[6], 886/1533*windowWidth, 242, 137/1533*windowWidth, 49);
         image(img[3], 565/800*windowWidth, 300, 72/800*windowWidth, 52);
      }
    }
  }
  function hideImages() {
    for (var i = 0; i < 19; i++) {
      showImage[i] = false;
    }
  }
  
var img = [];
var mySound = [];
var durations = [];
var button;
var frameCountAtPress = 0;
var isButtonPressed = [false, false, false, false, false, false];
var showImage = [];
function preload() {
  img[0] = loadImage("gov.gif");
  img[1] = loadImage("21boombox.png");
  img[2] = loadImage("tv211.png");
  img[3] = loadImage("80s/Crack.jpeg");
  img[4] = loadImage("80s/crack2.jpg");
  img[5] = loadImage("Gov/Oscar Grant.jpeg");
  img[6] = loadImage("Gov/Emmett Till.jpg");
  img[7] = loadImage("boombox1111.png");
  img[8] = loadImage("Gov/Trayvon Martin.jpg");
  img[9] = loadImage("Riots/Riot1.jpeg");
  img[10] = loadImage("Riots/Riot2.jpeg");
  img[11] = loadImage("System/black2.jpeg");
  img[12] = loadImage("System/Black1.jpeg");
  img[13] = loadImage("System/Black3.jpeg");
  img[14] = loadImage("Thug/Tupac.png");
  img[15] = loadImage("Huey Newton/Huey Newton .jpeg");
  img[16] = loadImage("pyramids/pyramids0.jpg");
  img[17] = loadImage("pyramids/pyramids1.jpg");
  img[18] = loadImage("pistol0.jpg")
  img[19] = loadImage("ICM_NewImage.jpg")
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Music/pistol.mp3');
  mySound[1] = loadSound('Music/Slave ships.mp3');
  mySound[2] = loadSound('Music/HueyNewton.mp3');
  mySound[3] = loadSound('Music/System.mp3');
  mySound[4] = loadSound('Music/Gov.mp3');
  mySound[5] = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < mySound.length; i++) {
    durations[i] = mySound.duration;
  }
  for (var j = 0; j < 19; j++) {
    showImage[j] = false;
  }
}
function draw() {
  drawBackdrop();
  drawButtons();
  drawTVImages();
  line(0,200,800,200);
  line(0,400,800,400);
  line(0,600,800,600);
  
  line(200,0,200,800);
  line(400,0,400,800);
  line(600,0,600,800);
}
function mousePressed() {
  console.log(isButtonPressed[0]);
  if (mouseX > 186/800*windowWidth &&
    mouseX < 286/800*windowWidth &&
    mouseY > 389 &&
    mouseY < 489) {
    
    
    isButtonPressed[0] = !isButtonPressed[0];
    if (isButtonPressed[0]) {
   
      hideImages();
      showImage[18] = true;
      if (mySound[0].isPlaying()) {
        mySound[0].pause();
      } else {
        mySound[0].play();
      }
    }
  } else {
    if (mouseX > 355/1533*windowWidth &&
      mouseX < 511/1533*windowWidth&&
      mouseY > 389 &&
      mouseY < 199) {
      isButtonPressed[1] = !isButtonPressed[1];
      if (isButtonPressed[1]) {
        hideImages();
        showImage[16] = true;
        if (mySound[1].isPlaying()) {
          mySound[1].pause();
        } else {
          mySound[1].play();
        }
      }
    } else {
      if (mouseX > 338 &&
        mouseX < 372 &&
        mouseY > 702 &&
        mouseY < 717) {
        isButtonPressed[2] = !isButtonPressed[2];
        if (isButtonPressed[2]) {
          hideImages();
          showImage[15] = true;
          if (mySound[2].isPlaying()) {
            mySound[2].pause();
          } else {
            mySound[2].play();
          }
        }
      } else {
        if (mouseX > 297 &&
          mouseX < 421 &&
          mouseY > 630 &&
          mouseY < 819) {
          isButtonPressed[3] = !isButtonPressed[3];
          if (isButtonPressed[3]) {
            hideImages();
            showImage[11] = true;
            if (mySound[3].isPlaying()) {
              mySound[3].pause();
            } else {
              mySound[3].play();
            }
          }
        } else {
          if (mouseX > 474 &&
            mouseX < 508 &&
            mouseY > 702 &&
            mouseY < 717) {
            isButtonPressed[4] = !isButtonPressed[4];
            if (isButtonPressed[4]) {
              hideImages();
              showImage[6] = true;
              if (mySound[4].isPlaying()) {
                mySound[4].pause();
              } else {
                mySound[4].play();
              }
            }
          } else {
            if (mouseX > 508 &&
              mouseX < 542 &&
              mouseY > 702 &&
              mouseY < 717) {
              isButtonPressed[5] = !isButtonPressed[5];
              if (isButtonPressed[5]) {
                hideImages();
                showImage[3] = true;
                if (mySound[5].isPlaying()) {
                  mySound[5].pause();
                } else {
                  mySound[5].play();
                }
              }
            }
          }
        }
      }
    }
  }
    
  }
  function muteSounds() {
    for (var i = 0; i < mySound.length; i++) {
      mySound[i].pause();
    }
  }
  function drawBackdrop() {
    image(img[19], 0, 0, windowWidth, 533);
    noStroke();
    fill("white");
    rect(484/1533 * windowWidth, 247, 263/1533*windowWidth, 100, 5, 5, 5, 5);
    fill("red");
   rect(355/1533*windowWidth, 389, 156/1533*windowWidth, 110, 5, 5, 5, 5);
      fill("blue");
    rect(320/800*windowWidth, 390, 122/800*windowWidth, 108, 5, 5, 5, 5);
  fill("green");
    rect(390/800*windowWidth, 155, 84/800*windowWidth, 70, 5, 5, 5, 5);
     fill("yellow");
    rect(886/1533*windowWidth, 242, 137/1533*windowWidth, 49, 5, 5, 5, 5);
    fill("purple");
    rect(478/800*windowWidth, 392, 136/800*windowWidth, 113, 5, 5, 5, 5);
    fill("orange");
    rect(565/800*windowWidth, 300, 72/800*windowWidth, 52, 5, 5, 5, 5);
  }
  function drawButtons() {
    fill(220);
  }
  function drawTVImages() {
    for (var k = 0; k < 19; k++) {
      if (showImage[k]) {
        
        
       image(img[18], 355/1533*windowWidth, 389, 66/650*windowWidth, 125/650*windowHeight);
        
       image(img[16], 320/800*windowWidth, 390, 122/800*windowWidth, 108);
         image(img[15], 478/800*windowWidth, 392, 136/800*windowWidth, 113);
         image(img[11], 390/800*windowWidth, 155, 84/800*windowWidth, 70);
       image(img[6], 886/1533*windowWidth, 242, 137/1533*windowWidth, 49);
         image(img[3], 565/800*windowWidth, 300, 72/800*windowWidth, 52);
      }
    }
  }
  function hideImages() {
    for (var i = 0; i < 19; i++) {
      showImage[i] = false;
    }
  }
  
var img = [];
var mySound = [];
var durations = [];
var button;
var frameCountAtPress = 0;
var isButtonPressed = [false, false, false, false, false, false];
var showImage = [];
function preload() {
  img[0] = loadImage("gov.gif");
  img[1] = loadImage("21boombox.png");
  img[2] = loadImage("tv211.png");
  img[3] = loadImage("80s/Crack.jpeg");
  img[4] = loadImage("80s/crack2.jpg");
  img[5] = loadImage("Gov/Oscar Grant.jpeg");
  img[6] = loadImage("Gov/Emmett Till.jpg");
  img[7] = loadImage("boombox1111.png");
  img[8] = loadImage("Gov/Trayvon Martin.jpg");
  img[9] = loadImage("Riots/Riot1.jpeg");
  img[10] = loadImage("Riots/Riot2.jpeg");
  img[11] = loadImage("System/black2.jpeg");
  img[12] = loadImage("System/Black1.jpeg");
  img[13] = loadImage("System/Black3.jpeg");
  img[14] = loadImage("Thug/Tupac.png");
  img[15] = loadImage("Huey Newton/Huey Newton .jpeg");
  img[16] = loadImage("pyramids/pyramids0.jpg");
  img[17] = loadImage("pyramids/pyramids1.jpg");
  img[18] = loadImage("pistol0.jpg")
  img[19] = loadImage("ICM_NewImage.jpg")
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Music/pistol.mp3');
  mySound[1] = loadSound('Music/Slave ships.mp3');
  mySound[2] = loadSound('Music/HueyNewton.mp3');
  mySound[3] = loadSound('Music/System.mp3');
  mySound[4] = loadSound('Music/Gov.mp3');
  mySound[5] = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < mySound.length; i++) {
    durations[i] = mySound.duration;
  }
  for (var j = 0; j < 19; j++) {
    showImage[j] = false;
  }
}
function draw() {
  drawBackdrop();
  drawButtons();
  drawTVImages();
  line(0,200,800,200);
  line(0,400,800,400);
  line(0,600,800,600);
  
  line(200,0,200,800);
  line(400,0,400,800);
  line(600,0,600,800);
}
function mousePressed() {
  console.log(isButtonPressed[0]);
  if (mouseX > 186/800*windowWidth &&
    mouseX < 286/800*windowWidth &&
    mouseY > 389 &&
    mouseY < 489) {
    
    
    isButtonPressed[0] = !isButtonPressed[0];
    if (isButtonPressed[0]) {
   
      hideImages();
      showImage[18] = true;
      if (mySound[0].isPlaying()) {
        mySound[0].pause();
      } else {
        mySound[0].play();
      }
    }
  } else {
    if (mouseX > 355/1533*windowWidth &&
      mouseX < 156/1533*windowWidth&&
      mouseY > 389 &&
      mouseY < 399) {
      isButtonPressed[1] = !isButtonPressed[1];
      if (isButtonPressed[1]) {
        hideImages();
        showImage[16] = true;
        if (mySound[1].isPlaying()) {
          mySound[1].pause();
        } else {
          mySound[1].play();
        }
      }
    } else {
      if (mouseX > 338 &&
        mouseX < 372 &&
        mouseY > 702 &&
        mouseY < 717) {
        isButtonPressed[2] = !isButtonPressed[2];
        if (isButtonPressed[2]) {
          hideImages();
          showImage[15] = true;
          if (mySound[2].isPlaying()) {
            mySound[2].pause();
          } else {
            mySound[2].play();
          }
        }
      } else {
        if (mouseX > 297 &&
          mouseX < 421 &&
          mouseY > 630 &&
          mouseY < 819) {
          isButtonPressed[3] = !isButtonPressed[3];
          if (isButtonPressed[3]) {
            hideImages();
            showImage[11] = true;
            if (mySound[3].isPlaying()) {
              mySound[3].pause();
            } else {
              mySound[3].play();
            }
          }
        } else {
          if (mouseX > 474 &&
            mouseX < 508 &&
            mouseY > 702 &&
            mouseY < 717) {
            isButtonPressed[4] = !isButtonPressed[4];
            if (isButtonPressed[4]) {
              hideImages();
              showImage[6] = true;
              if (mySound[4].isPlaying()) {
                mySound[4].pause();
              } else {
                mySound[4].play();
              }
            }
          } else {
            if (mouseX > 508 &&
              mouseX < 542 &&
              mouseY > 702 &&
              mouseY < 717) {
              isButtonPressed[5] = !isButtonPressed[5];
              if (isButtonPressed[5]) {
                hideImages();
                showImage[3] = true;
                if (mySound[5].isPlaying()) {
                  mySound[5].pause();
                } else {
                  mySound[5].play();
                }
              }
            }
          }
        }
      }
    }
  }
    
  }
  function muteSounds() {
    for (var i = 0; i < mySound.length; i++) {
      mySound[i].pause();
    }
  }
  function drawBackdrop() {
    image(img[19], 0, 0, windowWidth, 533);
    noStroke();
    fill("white");
    rect(484/1533 * windowWidth, 247, 263/1533*windowWidth, 100, 5, 5, 5, 5);
    fill("red", 0);
   rect(355/1533*windowWidth, 389, 156/1533*windowWidth, 110, 5, 5, 5, 5);
      fill("blue");
    rect(320/800*windowWidth, 390, 122/800*windowWidth, 108, 5, 5, 5, 5);
  fill("green");
    rect(390/800*windowWidth, 155, 84/800*windowWidth, 70, 5, 5, 5, 5);
     fill("yellow");
    rect(886/1533*windowWidth, 242, 137/1533*windowWidth, 49, 5, 5, 5, 5);
    fill("purple");
    rect(478/800*windowWidth, 392, 136/800*windowWidth, 113, 5, 5, 5, 5);
    fill("orange");
    rect(565/800*windowWidth, 300, 72/800*windowWidth, 52, 5, 5, 5, 5);
  }
  function drawButtons() {
    fill(220);
  }
  function drawTVImages() {
    for (var k = 0; k < 19; k++) {
      if (showImage[k]) {
        
        
       image(img[18], 355/1533*windowWidth, 389, 156/1533*windowWidth, 110, 5, 5, 5, 5);
        image(img[16], 297, 630, 124, 189);
         image(img[15], 297, 630, 124, 189);
         image(img[11], 297, 630, 124, 189);
        image(img[6], 297, 630, 124, 189);
         image(img[3], 297, 630, 124, 189);
      }
    }
  }
  function hideImages() {
    for (var i = 0; i < 19; i++) {
      showImage[i] = false;
    }
  }
  
var img = [];
var mySound = [];
var durations = [];
var button;
var frameCountAtPress = 0;
var isButtonPressed = [false, false, false, false, false, false];
var showImage = [];
function preload() {
  img[0] = loadImage("gov.gif");
  img[1] = loadImage("21boombox.png");
  img[2] = loadImage("tv211.png");
  img[3] = loadImage("80s/Crack.jpeg");
  img[4] = loadImage("80s/crack2.jpg");
  img[5] = loadImage("Gov/Oscar Grant.jpeg");
  img[6] = loadImage("Gov/Emmett Till.jpg");
  img[7] = loadImage("boombox1111.png");
  img[8] = loadImage("Gov/Trayvon Martin.jpg");
  img[9] = loadImage("Riots/Riot1.jpeg");
  img[10] = loadImage("Riots/Riot2.jpeg");
  img[11] = loadImage("System/black2.jpeg");
  img[12] = loadImage("System/Black1.jpeg");
  img[13] = loadImage("System/Black3.jpeg");
  img[14] = loadImage("Thug/Tupac.png");
  img[15] = loadImage("Huey Newton/Huey Newton .jpeg");
  img[16] = loadImage("pyramids/pyramids0.jpg");
  img[17] = loadImage("pyramids/pyramids1.jpg");
  img[18] = loadImage("pistol0.jpg")
  img[19] = loadImage("ICM_NewImage.jpg")
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Music/pistol.mp3');
  mySound[1] = loadSound('Music/Slave ships.mp3');
  mySound[2] = loadSound('Music/HueyNewton.mp3');
  mySound[3] = loadSound('Music/System.mp3');
  mySound[4] = loadSound('Music/Gov.mp3');
  mySound[5] = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < mySound.length; i++) {
    durations[i] = mySound.duration;
  }
  for (var j = 0; j < 19; j++) {
    showImage[j] = false;
  }
}
function draw() {
  drawBackdrop();
  drawButtons();
  drawTVImages();
  line(0,200,800,200);
  line(0,400,800,400);
  line(0,600,800,600);
  
  line(200,0,200,800);
  line(400,0,400,800);
  line(600,0,600,800);
}
function mousePressed() {
  console.log(isButtonPressed[0]);
  if (mouseX > 186/800*windowWidth &&
    mouseX < 286/800*windowWidth &&
    mouseY > 389 &&
    mouseY < 489) {
    
    
    isButtonPressed[0] = !isButtonPressed[0];
    if (isButtonPressed[0]) {
   
      hideImages();
      showImage[18] = true;
      if (mySound[0].isPlaying()) {
        mySound[0].pause();
      } else {
        mySound[0].play();
      }
    }
  } else {
    if (mouseX > 484/1533 * windowWidth &&
      mouseX < 263/1533*windowWidth &&
      mouseY > 247 &&
      mouseY < 300) {
      isButtonPressed[1] = !isButtonPressed[1];
      if (isButtonPressed[1]) {
        hideImages();
        showImage[16] = true;
        if (mySound[1].isPlaying()) {
          mySound[1].pause();
        } else {
          mySound[1].play();
        }
      }
    } else {
      if (mouseX > 338 &&
        mouseX < 372 &&
        mouseY > 702 &&
        mouseY < 717) {
        isButtonPressed[2] = !isButtonPressed[2];
        if (isButtonPressed[2]) {
          hideImages();
          showImage[15] = true;
          if (mySound[2].isPlaying()) {
            mySound[2].pause();
          } else {
            mySound[2].play();
          }
        }
      } else {
        if (mouseX > 297 &&
          mouseX < 421 &&
          mouseY > 630 &&
          mouseY < 819) {
          isButtonPressed[3] = !isButtonPressed[3];
          if (isButtonPressed[3]) {
            hideImages();
            showImage[11] = true;
            if (mySound[3].isPlaying()) {
              mySound[3].pause();
            } else {
              mySound[3].play();
            }
          }
        } else {
          if (mouseX > 474 &&
            mouseX < 508 &&
            mouseY > 702 &&
            mouseY < 717) {
            isButtonPressed[4] = !isButtonPressed[4];
            if (isButtonPressed[4]) {
              hideImages();
              showImage[6] = true;
              if (mySound[4].isPlaying()) {
                mySound[4].pause();
              } else {
                mySound[4].play();
              }
            }
          } else {
            if (mouseX > 508 &&
              mouseX < 542 &&
              mouseY > 702 &&
              mouseY < 717) {
              isButtonPressed[5] = !isButtonPressed[5];
              if (isButtonPressed[5]) {
                hideImages();
                showImage[3] = true;
                if (mySound[5].isPlaying()) {
                  mySound[5].pause();
                } else {
                  mySound[5].play();
                }
              }
            }
          }
        }
      }
    }
  }
    
  }
  function muteSounds() {
    for (var i = 0; i < mySound.length; i++) {
      mySound[i].pause();
    }
  }
  function drawBackdrop() {
    image(img[19], 0, 0, windowWidth, 533);
    noStroke();
    fill(255);
    rect(484/1533 * windowWidth, 247, 263/1533*windowWidth, 100, 5, 5, 5, 5);
     rect(355/1533*windowWidth, 389, 156/1533*windowWidth, 110, 5, 5, 5, 5);
     rect(320/800*windowWidth, 390, 122/800*windowWidth, 108, 5, 5, 5, 5);
    rect(390/800*windowWidth, 155, 84/800*windowWidth, 70, 5, 5, 5, 5);
     rect(886/1533*windowWidth, 242, 137/1533*windowWidth, 49, 5, 5, 5, 5);
     rect(478/800*windowWidth, 392, 136/800*windowWidth, 113, 5, 5, 5, 5);
    rect(565/800*windowWidth, 300, 72/800*windowWidth, 52, 5, 5, 5, 5);
  }
  function drawButtons() {
    fill(220);
  }
  function drawTVImages() {
    for (var k = 0; k < 19; k++) {
      if (showImage[k]) {
        
        
       image(img[18], 297, 630, 124, 189);
        image(img[16], 297, 630, 124, 189);
         image(img[15], 297, 630, 124, 189);
         image(img[11], 297, 630, 124, 189);
        image(img[6], 297, 630, 124, 189);
         image(img[3], 297, 630, 124, 189);
      }
    }
  }
  function hideImages() {
    for (var i = 0; i < 19; i++) {
      showImage[i] = false;
    }
  }
  
var img = [];
var mySound = [];
var durations = [];
var button;
var frameCountAtPress = 0;
var isButtonPressed = [false, false, false, false, false, false];
var showImage = [];
function preload() {
  img[0] = loadImage("gov.gif");
  img[1] = loadImage("21boombox.png");
  img[2] = loadImage("tv211.png");
  img[3] = loadImage("80s/Crack.jpeg");
  img[4] = loadImage("80s/crack2.jpg");
  img[5] = loadImage("Gov/Oscar Grant.jpeg");
  img[6] = loadImage("Gov/Emmett Till.jpg");
  img[7] = loadImage("boombox1111.png");
  img[8] = loadImage("Gov/Trayvon Martin.jpg");
  img[9] = loadImage("Riots/Riot1.jpeg");
  img[10] = loadImage("Riots/Riot2.jpeg");
  img[11] = loadImage("System/black2.jpeg");
  img[12] = loadImage("System/Black1.jpeg");
  img[13] = loadImage("System/Black3.jpeg");
  img[14] = loadImage("Thug/Tupac.png");
  img[15] = loadImage("Huey Newton/Huey Newton .jpeg");
  img[16] = loadImage("pyramids/pyramids0.jpg");
  img[17] = loadImage("pyramids/pyramids1.jpg");
  img[18] = loadImage("pistol0.jpg")
  img[19] = loadImage("ICM_NewImage.jpg")
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Music/pistol.mp3');
  mySound[1] = loadSound('Music/Slave ships.mp3');
  mySound[2] = loadSound('Music/HueyNewton.mp3');
  mySound[3] = loadSound('Music/System.mp3');
  mySound[4] = loadSound('Music/Gov.mp3');
  mySound[5] = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < mySound.length; i++) {
    durations[i] = mySound.duration;
  }
  for (var j = 0; j < 19; j++) {
    showImage[j] = false;
  }
}
function draw() {
  drawBackdrop();
  drawButtons();
  drawTVImages();
  line(0,200,800,200);
  line(0,400,800,400);
  line(0,600,800,600);
  
  line(200,0,200,800);
  line(400,0,400,800);
  line(600,0,600,800);
}
function mousePressed() {
  console.log(isButtonPressed[0]);
  if (mouseX > 186/800*windowWidth &&
    mouseX < 286/800*windowWidth &&
    mouseY > 389 &&
    mouseY < 489) {
    
    
    isButtonPressed[0] = !isButtonPressed[0];
    if (isButtonPressed[0]) {
   
      hideImages();
      showImage[18] = true;
      if (mySound[0].isPlaying()) {
        mySound[0].pause();
      } else {
        mySound[0].play();
      }
    }
  } else {
    if (mouseX > 304 &&
      mouseX < 338 &&
      mouseY > 702 &&
      mouseY < 717) {
      isButtonPressed[1] = !isButtonPressed[1];
      if (isButtonPressed[1]) {
        hideImages();
        showImage[16] = true;
        if (mySound[1].isPlaying()) {
          mySound[1].pause();
        } else {
          mySound[1].play();
        }
      }
    } else {
      if (mouseX > 338 &&
        mouseX < 372 &&
        mouseY > 702 &&
        mouseY < 717) {
        isButtonPressed[2] = !isButtonPressed[2];
        if (isButtonPressed[2]) {
          hideImages();
          showImage[15] = true;
          if (mySound[2].isPlaying()) {
            mySound[2].pause();
          } else {
            mySound[2].play();
          }
        }
      } else {
        if (mouseX > 297 &&
          mouseX < 421 &&
          mouseY > 630 &&
          mouseY < 819) {
          isButtonPressed[3] = !isButtonPressed[3];
          if (isButtonPressed[3]) {
            hideImages();
            showImage[11] = true;
            if (mySound[3].isPlaying()) {
              mySound[3].pause();
            } else {
              mySound[3].play();
            }
          }
        } else {
          if (mouseX > 474 &&
            mouseX < 508 &&
            mouseY > 702 &&
            mouseY < 717) {
            isButtonPressed[4] = !isButtonPressed[4];
            if (isButtonPressed[4]) {
              hideImages();
              showImage[6] = true;
              if (mySound[4].isPlaying()) {
                mySound[4].pause();
              } else {
                mySound[4].play();
              }
            }
          } else {
            if (mouseX > 508 &&
              mouseX < 542 &&
              mouseY > 702 &&
              mouseY < 717) {
              isButtonPressed[5] = !isButtonPressed[5];
              if (isButtonPressed[5]) {
                hideImages();
                showImage[3] = true;
                if (mySound[5].isPlaying()) {
                  mySound[5].pause();
                } else {
                  mySound[5].play();
                }
              }
            }
          }
        }
      }
    }
  }
    
  }
  function muteSounds() {
    for (var i = 0; i < mySound.length; i++) {
      mySound[i].pause();
    }
  }
  function drawBackdrop() {
    image(img[19], 0, 0, windowWidth, 533);
    noStroke();
    fill(255);
    rect(250, 247, 149, 100, 5, 5, 5, 5);
     rect(320/800*windowWidth, 390, 122/800*windowWidth, 108, 5, 5, 5, 5);
    rect(390/800*windowWidth, 155, 84/800*windowWidth, 70, 5, 5, 5, 5);
     rect(886/1533*windowWidth, 242, 137/1533*windowWidth, 49, 5, 5, 5, 5);
     rect(478/800*windowWidth, 392, 136/800*windowWidth, 113, 5, 5, 5, 5);
    rect(565/800*windowWidth, 300, 72/800*windowWidth, 52, 5, 5, 5, 5);
  }
  function drawButtons() {
    fill(220);
  }
  function drawTVImages() {
    for (var k = 0; k < 19; k++) {
      if (showImage[k]) {
        
        
       image(img[18], 297, 630, 124, 189);
        image(img[16], 297, 630, 124, 189);
         image(img[15], 297, 630, 124, 189);
         image(img[11], 297, 630, 124, 189);
        image(img[6], 297, 630, 124, 189);
         image(img[3], 297, 630, 124, 189);
      }
    }
  }
  function hideImages() {
    for (var i = 0; i < 19; i++) {
      showImage[i] = false;
    }
  }
  
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let myFont;
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(250);
  textAlign(CENTER);
  if (imageIndex > 10) {
    fill('#e50022');
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7);
     fill('#1c4587');
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7);
  }
  noStroke();
  textAlign(LEFT);
  fill(255);
  
  if (imageIndex <= 10) {
      
    rect(windowWidth/16 - 13, windowHeight * 3/5 +2, percentage1 * 5, 21);
    rect(windowWidth * 9/16 - 85 , windowHeight * 3/5 +2, percentage2 * 5, 21);
  }
}
 
  if (data.length > 0) {
    data = data.split(',');
    
    if(data.length==2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {
        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1)
    score[0]++;
  if (data[1] == 1)
    score[1]++;
  console.log(score);
  currentQuestion++;
  imageIndex++;
  if (imageIndex > 11) {
    imageIndex = 0;
    score[0] = 0;
    score[1] = 0;
  }
  percentage1 = score[0] * 10;
  percentage2 = score[1] * 10;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let myFont;
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(250);
  textAlign(CENTER);
  if (imageIndex > 10) {
    fill('#e50022');
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7);
     fill('#1c4587');
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7);
  }
  noStroke();
  textAlign(LEFT);
  fill(255);
  
  if (imageIndex <= 10) {
      
    rect(windowWidth/16 - 2, windowHeight * 3/5 +2, percentage1 * 5, 24);
    rect(windowWidth * 9/16 + 35, windowHeight * 3/5 +2, percentage2 * 5, 24);
  }
}
  console.log(data);
  if (data.length > 0) {
    data = data.split(',');
    if(data.length==2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {
        console.log(data)
        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1)
    score[0]++;
  if (data[1] == 1)
    score[1]++;
  console.log(score);
  currentQuestion++;
  imageIndex++;
  if (imageIndex > 11) {
    imageIndex = 0;
    score[0] = 0;
    score[1] = 0;
  }
  percentage1 = score[0] * 10;
  percentage2 = score[1] * 10;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let myFont;
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(250);
  textAlign(CENTER);
  if (imageIndex > 10) {
    fill('#e50022');
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7);
     fill('#1c4587');
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7);
  }
  noStroke();
  textAlign(LEFT);
  fill(255);
  
  if (imageIndex <= 10) {
      
    rect(windowWidth/16 - 13, windowHeight * 3/5 +2, percentage1 * 5, 21);
    rect(windowWidth * 9/16 - 85 , windowHeight * 3/5 +2, percentage2 * 5, 21);
  }
}
  if (data.length > 0) {
    data = data.split(',');
    if(data.length==2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {
        console.log(data);
        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1)
    score[0]++;
  if (data[1] == 1)
    score[1]++;
  console.log(score);
  currentQuestion++;
  imageIndex++;
  if (imageIndex > 11) {
    imageIndex = 0;
    score[0] = 0;
    score[1] = 0;
  }
  percentage1 = score[0] * 10;
  percentage2 = score[1] * 10;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let myFont;
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(250);
  textAlign(CENTER);
  if (imageIndex > 10) {
    fill('#e50022');
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7);
     fill('#1c4587');
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7);
  }
  noStroke();
  textAlign(LEFT);
  fill(0);
  
  if (imageIndex <= 10) {
      
    rect(76, windowHeight * 2/3, percentage1 * 5, 22);
    fill('#1c4587');
    rect(712, 700, percentage2 * 5, 22);
  }
}
  if (data.length > 0) {
    data = data.split(',');
    if(data.length==2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {
        console.log(data)
        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1)
    score[0]++;
  if (data[1] == 1)
    score[1]++;
  console.log(score);
  currentQuestion++;
  imageIndex++;
  if (imageIndex > 11) {
    imageIndex = 0;
    score[0] = 0;
    score[1] = 0;
  }
  percentage1 = score[0] * 10;
  percentage2 = score[1] * 10;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let myFont;
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(250);
  textAlign(CENTER);
  if (imageIndex > 10) {
    fill('#e50022');
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7);
     fill('#1c4587');
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7);
  }
  noStroke();
  textAlign(LEFT);
  fill(0);
  
  if (imageIndex <= 10) {
      
    rect(76, 424, percentage1 * 5, 14);
    fill('#1c4587');
    rect(712, 424, percentage2 * 5, 14);
  }
}
  if (data.length > 0) {
    data = data.split(',');
    if(data.length==2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {
        console.log(data)
        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1)
    score[0]++;
  if (data[1] == 1)
    score[1]++;
  console.log(score);
  currentQuestion++;
  imageIndex++;
  if (imageIndex > 11) {
    imageIndex = 0;
    score[0] = 0;
    score[1] = 0;
  }
  percentage1 = score[0] * 10;
  percentage2 = score[1] * 10;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
var img = [];
var mySound = [];
var durations = [];
var button;
var frameCountAtPress = 0;
var isButtonPressed = [false, false, false, false, false, false];
var showImage = [];
function preload() {
  img[0] = loadImage("gov.gif");
  img[1] = loadImage("21boombox.png");
  img[2] = loadImage("tv211.png");
  img[3] = loadImage("80s/Crack.jpeg");
  img[4] = loadImage("80s/crack2.jpg");
  img[5] = loadImage("Gov/Oscar Grant.jpeg");
  img[6] = loadImage("Gov/Emmett Till.jpg");
  img[7] = loadImage("boombox1111.png");
  img[8] = loadImage("Gov/Trayvon Martin.jpg");
  img[9] = loadImage("Riots/Riot1.jpeg");
  img[10] = loadImage("Riots/Riot2.jpeg");
  img[11] = loadImage("System/black2.jpeg");
  img[12] = loadImage("System/Black1.jpeg");
  img[13] = loadImage("System/Black3.jpeg");
  img[14] = loadImage("Thug/Tupac.png");
  img[15] = loadImage("Huey Newton/Huey Newton .jpeg");
  img[16] = loadImage("pyramids/pyramids0.jpg");
  img[17] = loadImage("pyramids/pyramids1.jpg");
  img[18] = loadImage("pistol0.jpg")
  img[19] = loadImage("ICM_NewImage.jpg")
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Music/pistol.mp3');
  mySound[1] = loadSound('Music/Slave ships.mp3');
  mySound[2] = loadSound('Music/HueyNewton.mp3');
  mySound[3] = loadSound('Music/System.mp3');
  mySound[4] = loadSound('Music/Gov.mp3');
  mySound[5] = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
   image(img[19], 800, 800);
  for (var i = 0; i < mySound.length; i++) {
    durations[i] = mySound.duration;
  }
  for (var j = 0; j < 19; j++) {
    showImage[j] = false;
  }
}
function draw() {
  drawBackdrop();
  drawButtons();
  drawTVImages();
  line(0,200,800,200);
  line(0,400,800,400);
  line(0,600,800,600);
  
  line(200,0,200,800);
  line(400,0,400,800);
  line(600,0,600,800);
}
function mousePressed() {
  console.log(isButtonPressed[0]);
  if (mouseX > 186/800*windowWidth &&
    mouseX < 286/800*windowWidth &&
    mouseY > 389 &&
    mouseY < 489) {
    
    
    isButtonPressed[0] = !isButtonPressed[0];
    if (isButtonPressed[0]) {
   
      hideImages();
      showImage[18] = true;
      if (mySound[0].isPlaying()) {
        mySound[0].pause();
      } else {
        mySound[0].play();
      }
    }
  } else {
    if (mouseX > 304 &&
      mouseX < 338 &&
      mouseY > 702 &&
      mouseY < 717) {
      isButtonPressed[1] = !isButtonPressed[1];
      if (isButtonPressed[1]) {
        hideImages();
        showImage[16] = true;
        if (mySound[1].isPlaying()) {
          mySound[1].pause();
        } else {
          mySound[1].play();
        }
      }
    } else {
      if (mouseX > 338 &&
        mouseX < 372 &&
        mouseY > 702 &&
        mouseY < 717) {
        isButtonPressed[2] = !isButtonPressed[2];
        if (isButtonPressed[2]) {
          hideImages();
          showImage[15] = true;
          if (mySound[2].isPlaying()) {
            mySound[2].pause();
          } else {
            mySound[2].play();
          }
        }
      } else {
        if (mouseX > 297 &&
          mouseX < 421 &&
          mouseY > 630 &&
          mouseY < 819) {
          isButtonPressed[3] = !isButtonPressed[3];
          if (isButtonPressed[3]) {
            hideImages();
            showImage[11] = true;
            if (mySound[3].isPlaying()) {
              mySound[3].pause();
            } else {
              mySound[3].play();
            }
          }
        } else {
          if (mouseX > 474 &&
            mouseX < 508 &&
            mouseY > 702 &&
            mouseY < 717) {
            isButtonPressed[4] = !isButtonPressed[4];
            if (isButtonPressed[4]) {
              hideImages();
              showImage[6] = true;
              if (mySound[4].isPlaying()) {
                mySound[4].pause();
              } else {
                mySound[4].play();
              }
            }
          } else {
            if (mouseX > 508 &&
              mouseX < 542 &&
              mouseY > 702 &&
              mouseY < 717) {
              isButtonPressed[5] = !isButtonPressed[5];
              if (isButtonPressed[5]) {
                hideImages();
                showImage[3] = true;
                if (mySound[5].isPlaying()) {
                  mySound[5].pause();
                } else {
                  mySound[5].play();
                }
              }
            }
          }
        }
      }
    }
  }
    
  }
  function muteSounds() {
    for (var i = 0; i < mySound.length; i++) {
      mySound[i].pause();
    }
  }
  function drawBackdrop() {
    image(img[19], 0, 0, windowWidth, 533);
    noStroke();
    fill(0,0);
    rect(484/1533 * windowWidth, 247, 263/1533*windowWidth, 100, 5, 5, 5, 5);
     rect(355/1533*windowWidth, 389, 156/1533*windowWidth, 110, 5, 5, 5, 5);
     rect(320/800*windowWidth, 390, 122/800*windowWidth, 108, 5, 5, 5, 5);
    rect(390/800*windowWidth, 155, 84/800*windowWidth, 70, 5, 5, 5, 5);
     rect(886/1533*windowWidth, 242, 137/1533*windowWidth, 49, 5, 5, 5, 5);
     rect(478/800*windowWidth, 392, 136/800*windowWidth, 113, 5, 5, 5, 5);
    rect(565/800*windowWidth, 300, 72/800*windowWidth, 52, 5, 5, 5, 5);
  }
  function drawButtons() {
    fill(220);
  }
  function drawTVImages() {
    for (var k = 0; k < 19; k++) {
      if (showImage[k]) {
        image(img[k], 297, 630, 124, 189);
      }
    }
  }
  function hideImages() {
    for (var i = 0; i < 19; i++) {
      showImage[i] = false;
    }
  }
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
var img = [];
var mySound = [];
var durations = [];
var button;
var frameCountAtPress = 0;
var isButtonPressed = [false, false, false, false, false, false];
var showImage = [];
function preload() {
  img[0] = loadImage("gov.gif");
  img[1] = loadImage("21boombox.png");
  img[2] = loadImage("tv211.png");
  img[3] = loadImage("80s/Crack.jpeg");
  img[4] = loadImage("80s/crack2.jpg");
  img[5] = loadImage("Gov/Oscar Grant.jpeg");
  img[6] = loadImage("Gov/Emmett Till.jpg");
  img[7] = loadImage("boombox1111.png");
  img[8] = loadImage("Gov/Trayvon Martin.jpg");
  img[9] = loadImage("Riots/Riot1.jpeg");
  img[10] = loadImage("Riots/Riot2.jpeg");
  img[11] = loadImage("System/black2.jpeg");
  img[12] = loadImage("System/Black1.jpeg");
  img[13] = loadImage("System/Black3.jpeg");
  img[14] = loadImage("Thug/Tupac.png");
  img[15] = loadImage("Huey Newton/Huey Newton .jpeg");
  img[16] = loadImage("pyramids/pyramids0.jpg");
  img[17] = loadImage("pyramids/pyramids1.jpg");
  img[18] = loadImage("pistol0.jpg")
  img[19] = loadImage("Image2.jpg")
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Music/pistol.mp3');
  mySound[1] = loadSound('Music/Slave ships.mp3');
  mySound[2] = loadSound('Music/HueyNewton.mp3');
  mySound[3] = loadSound('Music/System.mp3');
  mySound[4] = loadSound('Music/Gov.mp3');
  mySound[5] = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
   image(img[19], 800, 800);
  for (var i = 0; i < mySound.length; i++) {
    durations[i] = mySound.duration;
  }
  for (var j = 0; j < 19; j++) {
    showImage[j] = false;
  }
}
function draw() {
  drawBackdrop();
  drawButtons();
  drawTVImages();
  line(0,1*windowWidth/4,800,200);
  line(0,2*windowWidth/4,800,400);
  line(0,3*windowWidth/4,800,600);
  
  line(200,0,200,800);
  line(400,0,400,800);
  line(600,0,600,800);
}
function mousePressed() {
  console.log(isButtonPressed[0]);
  if (mouseX > 250 &&
    mouseX < 399 &&
    mouseY > 247 &&
    mouseY < 347) {
    
    
    isButtonPressed[0] = !isButtonPressed[0];
    if (isButtonPressed[0]) {
   
      hideImages();
      showImage[18] = true;
      if (mySound[0].isPlaying()) {
        mySound[0].pause();
      } else {
        mySound[0].play();
      }
    }
  } else {
    if (mouseX > 304 &&
      mouseX < 338 &&
      mouseY > 702 &&
      mouseY < 717) {
      isButtonPressed[1] = !isButtonPressed[1];
      if (isButtonPressed[1]) {
        hideImages();
        showImage[16] = true;
        if (mySound[1].isPlaying()) {
          mySound[1].pause();
        } else {
          mySound[1].play();
        }
      }
    } else {
      if (mouseX > 338 &&
        mouseX < 372 &&
        mouseY > 702 &&
        mouseY < 717) {
        isButtonPressed[2] = !isButtonPressed[2];
        if (isButtonPressed[2]) {
          hideImages();
          showImage[15] = true;
          if (mySound[2].isPlaying()) {
            mySound[2].pause();
          } else {
            mySound[2].play();
          }
        }
      } else {
        if (mouseX > 297 &&
          mouseX < 421 &&
          mouseY > 630 &&
          mouseY < 819) {
          isButtonPressed[3] = !isButtonPressed[3];
          if (isButtonPressed[3]) {
            hideImages();
            showImage[11] = true;
            if (mySound[3].isPlaying()) {
              mySound[3].pause();
            } else {
              mySound[3].play();
            }
          }
        } else {
          if (mouseX > 474 &&
            mouseX < 508 &&
            mouseY > 702 &&
            mouseY < 717) {
            isButtonPressed[4] = !isButtonPressed[4];
            if (isButtonPressed[4]) {
              hideImages();
              showImage[6] = true;
              if (mySound[4].isPlaying()) {
                mySound[4].pause();
              } else {
                mySound[4].play();
              }
            }
          } else {
            if (mouseX > 508 &&
              mouseX < 542 &&
              mouseY > 702 &&
              mouseY < 717) {
              isButtonPressed[5] = !isButtonPressed[5];
              if (isButtonPressed[5]) {
                hideImages();
                showImage[3] = true;
                if (mySound[5].isPlaying()) {
                  mySound[5].pause();
                } else {
                  mySound[5].play();
                }
              }
            }
          }
        }
      }
    }
  }
    
  }
  function muteSounds() {
    for (var i = 0; i < mySound.length; i++) {
      mySound[i].pause();
    }
  }
  function drawBackdrop() {
    image(img[19], 0, 0, windowWidth, 533);
    fill(0);
    rect(250/800 * windowWidth, 247, 149, 100, 5, 5, 5, 5);
    rect(179, 390, 100, 110, 5, 5, 5, 5);
    rect(320, 390, 122, 108, 5, 5, 5, 5);
    rect(390, 155, 84, 70, 5, 5, 5, 5);
    rect(462, 242, 73, 49, 5, 5, 5, 5);
    rect(478, 392, 136, 113, 5, 5, 5, 5);
    rect(565, 300, 72, 52, 5, 5, 5, 5);
  }
  function drawButtons() {
    fill(220);
  }
  function drawTVImages() {
    for (var k = 0; k < 19; k++) {
      if (showImage[k]) {
        image(img[k], 297, 630, 124, 189);
      }
    }
  }
  function hideImages() {
    for (var i = 0; i < 19; i++) {
      showImage[i] = false;
    }
  }
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let myFont;
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
      
  image(img[imageIndex], 0, 0, windowWidth, windowHeight);
  fill('#e50022');
  textFont(myFont);
  textSize(150);
  if (imageIndex > 10)
    text(percentage1 +'%', windowWidth * 1 / 12, windowHeight * 2 / 7);
  if (imageIndex > 10)
    text(percentage2 +'%', windowWidth * 6.98 / 12, windowHeight * 2 / 7);
noStroke();
fill(255);
rect (34,361,percentage1,13);
 rect (324,361,percentage2,13);
}
  if (data.length > 0) {
    timeNow = new Date().getTime();
    if (timeNow - timePressed > 1000) {
      console.log(data)
      data = data.split(',');
      calculateScore(data);
      timePressed = new Date().getTime();
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1)
    score[0]++;
 
	
  if (data[1] == 1)
    score[1]++;
  console.log(score);
  currentQuestion++;
  imageIndex++;
  if (imageIndex > 11) {
      imageIndex = 0;
score[0] =0;
score[1] =0;
  }
  
  percentage1 = score[0] * 10;
  percentage2 = score[1] * 10;
  
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;
let percentage1 = 0;
let percentage2 = 0;
let myFont;
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  image(img[imageIndex], 0, 0, windowWidth, windowHeight);
   fill('#e50022');
  textFont(myFont);
  textSize(150);
  text(percentage1, windowWidth * 1/12, windowHeight * 6/7);
  text(percentage2, windowWidth * 6.98/12, windowHeight * 6/7);
}
  if (data.length > 0) {
    timeNow = new Date().getTime();
    if (timeNow - timePressed > 1000) {
      console.log(data)
      data = data.split(',');
      calculateScore(data);
      timePressed = new Date().getTime();
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1)
    score[0]++;
  if (data[1] == 1)
    score[1]++;
  console.log(score);
  currentQuestion++;
  imageIndex++;
  if (imageIndex > 11)
    imageIndex = 0;
  if (imageIndex > 10) 
  percentage1 = score[0] * 10;
  percentage2 = score[1] * 10;
   
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
let img = [];
let showImage = [];
let imageIndex = 0;
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 12; i++) {
  showImage[i] = false;
   
}
}
function draw() {
  background(220);
 
image(img[imageIndex], 0, 0, windowWidth, windowHeight);
}
  if (data.length > 0) {
    timeNow = new Date().getTime();
    if (timeNow - timePressed > 1000) {
      console.log(data)
      data = data.split(',');
      calculateScore(data);
      timePressed = new Date().getTime();
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1)
    score[0]++;
  if (data[1] == 1)
    score[1]++;
  console.log(score);
  currentQuestion++;
  imageIndex++;
 
}
let portName = '/dev/cu.usbmodem1411';
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];
let timeNow = 0;
let timePressed = 0;
var img = [];
var showImage = [];
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 12; i++) {
  showImage[i] = false;
}
}
function draw() {
  background(220);
}
  if (data.length > 0) {
    timeNow = new Date().getTime();
    if (timeNow - timePressed > 1000) {
      console.log(data)
      data = data.split(',');
      calculateScore(data);
      timePressed = new Date().getTime();
    }
  }
}
function calculateScore(data) {
  if (data[0] == 1)
    score[0]++;
  if (data[1] == 1)
    score[1]++;
  console.log(score);
  currentQuestion++;
  nextQuestion++;
}
function nextQuestion(data) {
  if (currentQuestion++)
 showImage[1] = true;
}
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0,0];
let timeNow =0;
let timePressed = 0;
function setup() { 
  createCanvas(400, 400);
  
} 
function draw() { 
  background(220);
}
  if (data.length > 0) {
    timeNow = new Date().getTime(); 
    if(timeNow - timePressed > 1000) {
      
    	console.log(data)
      data = data.split(',');
      calculateScore(data);
      timePressed = new Date().getTime();
    }
  }
}
function calculateScore(data) {
  if (data[0] ==1)
    score[0]++;
  if (data[1] ==1)
    score[1]++;
  console.log (score);
  currentQuestion ++;
let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0,0];
let timeNow =0;
let timePressed = 0;
function setup() { 
  createCanvas(400, 400);
  
} 
function draw() { 
  background(220);
}
  if (data.length > 0) {
    timeNow = new Date().getTime(); 
    if(timeNow - timePressed > 1000) {
      
    	console.log(data)
      data = data.split(',');
      calculateScore(data);
      timePressed = new Date().getTime();
    }
  }
}
function calculateScore(data) {
  if (data[0] ==1)
    score[0]++;
  if (data[1] ==1)
    score[1]++;
  console.log (score);
  currentQuestion ++;
var img = [];
var mySound = [];
var durations = [];
var button;
var frameCountAtPress = 0;
var isButtonPressed = [false, false, false, false, false, false];
var showImage = [];
function preload() {
  img[0] = loadImage("gov.gif");
  img[1] = loadImage("21boombox.png");
  img[2] = loadImage("tv211.png");
  img[3] = loadImage("80s/Crack.jpeg");
  img[4] = loadImage("80s/crack2.jpg");
  img[5] = loadImage("Gov/Oscar Grant.jpeg");
  img[6] = loadImage("Gov/Emmett Till.jpg");
  img[7] = loadImage("boombox1111.png");
  img[8] = loadImage("Gov/Trayvon Martin.jpg");
  img[9] = loadImage("Riots/Riot1.jpeg");
  img[10] = loadImage("Riots/Riot2.jpeg");
  img[11] = loadImage("System/black2.jpeg");
  img[12] = loadImage("System/Black1.jpeg");
  img[13] = loadImage("System/Black3.jpeg");
  img[14] = loadImage("Thug/Tupac.png");
  img[15] = loadImage("Huey Newton/Huey Newton .jpeg");
  img[16] = loadImage("pyramids/pyramids0.jpg");
  img[17] = loadImage("pyramids/pyramids1.jpg");
  img[18] = loadImage("pistol0.jpg")
  img[19] = loadImage("Image2.jpg")
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Music/pistol.mp3');
  mySound[1] = loadSound('Music/Slave ships.mp3');
  mySound[2] = loadSound('Music/HueyNewton.mp3');
  mySound[3] = loadSound('Music/System.mp3');
  mySound[4] = loadSound('Music/Gov.mp3');
  mySound[5] = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
   image(img[19], windowWidth, windowHeight);
  for (var i = 0; i < mySound.length; i++) {
    durations[i] = mySound.duration;
  }
  for (var j = 0; j < 19; j++) {
    showImage[j] = false;
  }
}
function draw() {
  drawBackdrop();
  drawButtons();
  drawTVImages();
 
}
function mousePressed() {
  console.log(isButtonPressed[0]);
  if (mouseX > 270 &&
    mouseX < 304 &&
    mouseY > 702 &&
    mouseY < 717) {
    
    
    isButtonPressed[0] = !isButtonPressed[0];
    if (isButtonPressed[0]) {
   
      hideImages();
      showImage[18] = true;
      if (mySound[0].isPlaying()) {
        mySound[0].pause();
      } else {
        mySound[0].play();
      }
    }
  } else {
    if (mouseX > 304 &&
      mouseX < 338 &&
      mouseY > 702 &&
      mouseY < 717) {
      isButtonPressed[1] = !isButtonPressed[1];
      if (isButtonPressed[1]) {
        hideImages();
        showImage[16] = true;
        if (mySound[1].isPlaying()) {
          mySound[1].pause();
        } else {
          mySound[1].play();
        }
      }
    } else {
      if (mouseX > 338 &&
        mouseX < 372 &&
        mouseY > 702 &&
        mouseY < 717) {
        isButtonPressed[2] = !isButtonPressed[2];
        if (isButtonPressed[2]) {
          hideImages();
          showImage[15] = true;
          if (mySound[2].isPlaying()) {
            mySound[2].pause();
          } else {
            mySound[2].play();
          }
        }
      } else {
        if (mouseX > 297 &&
          mouseX < 421 &&
          mouseY > 630 &&
          mouseY < 819) {
          isButtonPressed[3] = !isButtonPressed[3];
          if (isButtonPressed[3]) {
            hideImages();
            showImage[11] = true;
            if (mySound[3].isPlaying()) {
              mySound[3].pause();
            } else {
              mySound[3].play();
            }
          }
        } else {
          if (mouseX > 474 &&
            mouseX < 508 &&
            mouseY > 702 &&
            mouseY < 717) {
            isButtonPressed[4] = !isButtonPressed[4];
            if (isButtonPressed[4]) {
              hideImages();
              showImage[6] = true;
              if (mySound[4].isPlaying()) {
                mySound[4].pause();
              } else {
                mySound[4].play();
              }
            }
          } else {
            if (mouseX > 508 &&
              mouseX < 542 &&
              mouseY > 702 &&
              mouseY < 717) {
              isButtonPressed[5] = !isButtonPressed[5];
              if (isButtonPressed[5]) {
                hideImages();
                showImage[3] = true;
                if (mySound[5].isPlaying()) {
                  mySound[5].pause();
                } else {
                  mySound[5].play();
                }
              }
            }
          }
        }
      }
    }
  }
    
  }
  function muteSounds() {
    for (var i = 0; i < mySound.length; i++) {
      mySound[i].pause();
    }
  }
  function drawBackdrop() {
    image(img[19], 0, 0, windowWidth, windowHeight);
    fill(0);
    rect(297, 630, 124, 189, 5, 5, 5, 5);
    rect(400, 400, 219, 175, 5, 5, 5, 5);
    rect(500, 630, 215, 175, 5, 5, 5, 5);
    rect(622, 252, 125, 96, 5, 5, 5, 5);
    rect(765, 630, 220, 180, 20, 20, 20, 20);
    rect(739, 385, 120, 96, 5, 5, 5, 5);
    rect(901, 485, 120, 91, 10, 10, 10, 10);
  }
  function drawButtons() {
    fill(220);
  }
  function drawTVImages() {
    for (var k = 0; k < 19; k++) {
      if (showImage[k]) {
        image(img[k], 297, 630, 124, 189);
      }
    }
  }
  function hideImages() {
    for (var i = 0; i < 19; i++) {
      showImage[i] = false;
    }
  }
  function maybe() {
  }
let portName = '/dev/cu.usbmodem1411';
let inData;
var img = [];
var showImage = [];
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
  for (var i = 0; i < portList.length; i++) {
    console.log(i + " " + portList[i]);
  }
}
function serverConnected() {
  console.log('connected to server.');
}
function portOpen() {
}
  console.log("the value is " + data);
  hedgie1.moveTo(data);
}
}
function portClose() {
}
for (var i = 0; i < 19; i++) {
  showImage[i] = false;
}
function draw() {
  background(220);
  image(img[0], 0, 0, windowWidth, windowHeight);
  image(img[1], 0, 0, windowWidth, windowHeight);
  image(img[2], 0, 0, windowWidth, windowHeight);
  image(img[3], 0, 0, windowWidth, windowHeight);
  image(img[4], 0, 0, windowWidth, windowHeight);
  image(img[5], 0, 0, windowWidth, windowHeight);
  image(img[6], 0, 0, windowWidth, windowHeight);
  image(img[7], 0, 0, windowWidth, windowHeight);
  image(img[8], 0, 0, windowWidth, windowHeight);
  image(img[9], 0, 0, windowWidth, windowHeight);
  image(img[10], 0, 0, windowWidth, windowHeight);
  image(img[12], 0, 0, windowWidth, windowHeight);
}
  if (inData.length >0); 
  
var img = [];
var showImage = [];
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
 
for (var i = 0; i < 19; i++) {
  showImage[i] = false;
}
function draw() {
  background(220);
  image(img[0], 0, 0, windowWidth, windowHeight);
var img = [];
var showImage = [];
function preload() {
   img[1] = loadImage("TSL/TSL1.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
for (var i = 0; i < 19; i++) {
  showImage[i] = false;
}
function draw() {
  background(220);
  image(img[1], 0, 0, windowWidth, windowHeight);
var img = [];
var showImage = [];
  
function preload() {
img[1]= loadImage("TSL/TSL1.png");
img[2]= loadImage("TSL/TSL2.png");
img[3]= loadImage("TSL/TSL3.png");
img[4]= loadImage("TSL/TSL4.png");
img[5]= loadImage("TSL/TSL5.png");
img[6]= loadImage("TSL/TSL6.png");
img[7]= loadImage("TSL/TSL7.png");
img[8]= loadImage("TSL/TSL8.png");
img[9]= loadImage("TSL/TSL9.png");
img[10]= loadImage("TSL/TSL10.png");
img[11]= loadImage("TSL/TSL11.png"); 
}
  
function setup() { 
  createCanvas(windowWidth, windowHeight);
  
    }
  for (var i = 0; i < 19; i++) {
    showImage[i] = false;
}
function draw() { 
  background(220);
  
  image(img[1], 0, 0, windowWidth, windowHeight);
  image(img[2], 0, 0, windowWidth, windowHeight);
  image(img[3], 0, 0, windowWidth, windowHeight);
  image(img[4], 0, 0, windowWidth, windowHeight);
  image(img[5], 0, 0, windowWidth, windowHeight);
  image(img[6], 0, 0, windowWidth, windowHeight);
  image(img[7], 0, 0, windowWidth, windowHeight);
  image(img[8], 0, 0, windowWidth, windowHeight);
  image(img[9], 0, 0, windowWidth, windowHeight);
  image(img[10], 0, 0, windowWidth, windowHeight);
  image(img[11], 0, 0, windowWidth, windowHeight);
 
}var img ;
  
function preload() {
img = loadImage("TSL/TSL1.png");
}
  
function setup() { 
  createCanvas(windowWidth, windowHeight);
} 
function draw() { 
  background(220);
  
   image(img, 0, 0, windowWidth, windowHeight);
var img = [];
var mySound = [];
var durations = [];
var button;
var frameCountAtPress = 0;
var isButtonPressed = [false, false, false, false, false, false];
var showImage = [];
function preload() {
  img[0] = loadImage("gov.gif");
  img[1] = loadImage("21boombox.png");
  img[2] = loadImage("TV.png");
  img[3] = loadImage("80s/Crack.jpeg");
  img[4] = loadImage("80s/crack2.jpg");
  img[5] = loadImage("Gov/Oscar Grant.jpeg");
  img[6] = loadImage("Gov/Emmett Till.jpg");
  img[7] = loadImage("boombox1111.png");
  img[8] = loadImage("Gov/Trayvon Martin.jpg");
  img[9] = loadImage("Riots/Riot1.jpeg");
  img[10] = loadImage("Riots/Riot2.jpeg");
  img[11] = loadImage("System/black2.jpeg");
  img[12] = loadImage("System/Black1.jpeg");
  img[13] = loadImage("System/Black3.jpeg");
  img[14] = loadImage("Thug/Tupac.png");
  img[15] = loadImage("Huey Newton/Huey Newton .jpeg");
  img[16] = loadImage("pyramids/pyramids0.jpg");
  img[17] = loadImage("pyramids/pyramids1.jpg");
  img[18] = loadImage("pistol0.jpg");
  img[19] = loadImage("Dresser.png");
  img[20] = loadImage("Hat.png");
  img[21] = loadImage("Christmas photo.jpg");
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Music/pistol.mp3');
  mySound[1] = loadSound('Music/Slave ships.mp3');
  mySound[2] = loadSound('Music/HueyNewton.mp3');
  mySound[3] = loadSound('Music/System.mp3');
  mySound[4] = loadSound('Music/Gov.mp3');
  mySound[5] = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < mySound.length; i++) {
    durations[i] = mySound.duration;
  }
  for (var j = 0; j < 19; j++) {
    showImage[j] = false;
  }
}
function draw() {
  drawBackdrop();
  drawButtons();
  drawTVImages();
}
function mousePressed() {
  console.log(isButtonPressed[0]);
  if (mouseX > 270 &&
    mouseX < 304 &&
    mouseY > 702 &&
    mouseY < 717) {
    
    
    isButtonPressed[0] = !isButtonPressed[0];
    if (isButtonPressed[0]) {
   
      hideImages();
      showImage[18] = true;
      if (mySound[0].isPlaying()) {
        mySound[0].pause();
      } else {
        mySound[0].play();
      }
    }
  } else {
    if (mouseX > 304 &&
      mouseX < 338 &&
      mouseY > 702 &&
      mouseY < 717) {
      isButtonPressed[1] = !isButtonPressed[1];
      if (isButtonPressed[1]) {
        hideImages();
        showImage[16] = true;
        if (mySound[1].isPlaying()) {
          mySound[1].pause();
        } else {
          mySound[1].play();
        }
      }
    } else {
      if (mouseX > 338 &&
        mouseX < 372 &&
        mouseY > 702 &&
        mouseY < 717) {
        isButtonPressed[2] = !isButtonPressed[2];
        if (isButtonPressed[2]) {
          hideImages();
          showImage[15] = true;
          if (mySound[2].isPlaying()) {
            mySound[2].pause();
          } else {
            mySound[2].play();
          }
        }
      } else {
        if (mouseX > 440 &&
          mouseX < 474 &&
          mouseY > 702 &&
          mouseY < 717) {
          isButtonPressed[3] = !isButtonPressed[3];
          if (isButtonPressed[3]) {
            hideImages();
            showImage[11] = true;
            if (mySound[3].isPlaying()) {
              mySound[3].pause();
            } else {
              mySound[3].play();
            }
          }
        } else {
          if (mouseX > 474 &&
            mouseX < 508 &&
            mouseY > 702 &&
            mouseY < 717) {
            isButtonPressed[4] = !isButtonPressed[4];
            if (isButtonPressed[4]) {
              hideImages();
              showImage[6] = true;
              if (mySound[4].isPlaying()) {
                mySound[4].pause();
              } else {
                mySound[4].play();
              }
            }
          } else {
            if (mouseX > 508 &&
              mouseX < 542 &&
              mouseY > 702 &&
              mouseY < 717) {
              isButtonPressed[5] = !isButtonPressed[5];
              if (isButtonPressed[5]) {
                hideImages();
                showImage[3] = true;
                if (mySound[5].isPlaying()) {
                  mySound[5].pause();
                } else {
                  mySound[5].play();
                }
              }
            }
          }
        }
      }
    }
  }
    
  }
  function muteSounds() {
    for (var i = 0; i < mySound.length; i++) {
      mySound[i].pause();
    }
  }
  function drawBackdrop() {
    background("#FDF5E6");
    image(img[19], 30, 689, 750, 300);
    image(img[1], 100, 400);
    image(img[20], 210, 30, 700, 600);
    image(img[2], 550, 10, 800, 500);
    image(img[21],40, 50, 300, 200);
  }
  function drawButtons() {
    fill(220);
  }
  function drawTVImages() {
    for (var k = 0; k < 19; k++) {
      if (showImage[k]) {
        image(img[k], 670, 60, 560, 350);
      }
    }
  }
  function hideImages() {
    for (var i = 0; i < 19; i++) {
      showImage[i] = false;
    }
  }
  function maybe() {
  }
var img = [];
var mySound = [];
var durations = [];
var button;
var frameCountAtPress = 0;
var isButtonPressed = [false, false, false, false, false, false];
var showImage = [];
function preload() {
  img[0] = loadImage("gov.gif");
  img[1] = loadImage("21boombox.png");
  img[2] = loadImage("tv211.png");
  img[3] = loadImage("80s/Crack.jpeg");
  img[4] = loadImage("80s/crack2.jpg");
  img[5] = loadImage("Gov/Oscar Grant.jpeg");
  img[6] = loadImage("Gov/Emmett Till.jpg");
  img[7] = loadImage("boombox1111.png");
  img[8] = loadImage("Gov/Trayvon Martin.jpg");
  img[9] = loadImage("Riots/Riot1.jpeg");
  img[10] = loadImage("Riots/Riot2.jpeg");
  img[11] = loadImage("System/black2.jpeg");
  img[12] = loadImage("System/Black1.jpeg");
  img[13] = loadImage("System/Black3.jpeg");
  img[14] = loadImage("Thug/Tupac.png");
  img[15] = loadImage("Huey Newton/Huey Newton .jpeg");
  img[16] = loadImage("pyramids0.jpg");
  img[17] = loadImage("pyramids1.jpg");
  img[18] = loadImage("pistol0.jpg")
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Music/pistol.mp3');
  mySound[1] = loadSound('Music/Slave ships.mp3');
  mySound[2] = loadSound('Music/HueyNewton.mp3');
  mySound[3] = loadSound('Music/System.mp3');
  mySound[4] = loadSound('Music/Gov.mp3');
  mySound[5] = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < mySound.length; i++) {
    durations[i] = mySound.duration;
  }
  for (var j = 0; j < 19; j++) {
    showImage[j] = false;
  }
}
function draw() {
  drawBackdrop();
  drawButtons();
  drawTVImages();
}
function mousePressed() {
  console.log(isButtonPressed[0]);
  if (mouseX > 270 &&
    mouseX < 304 &&
    mouseY > 702 &&
    mouseY < 717) {
    isButtonPressed[0] = !isButtonPressed[0];
    if (isButtonPressed[0]) {
      hideImages();
      showImage[18] = true;
      if (mySound[0].isPlaying()) {
        mySound[0].pause();
      } else {
        mySound[0].play();
      }
    }
  } else {
    if (mouseX > 304 &&
      mouseX < 338 &&
      mouseY > 702 &&
      mouseY < 717) {
      isButtonPressed[1] = !isButtonPressed[1];
      if (isButtonPressed[1]) {
        hideImages();
        showImage[16] = true;
        if (mySound[1].isPlaying()) {
          mySound[1].pause();
        } else {
          mySound[1].play();
        }
      }
    } else {
      if (mouseX > 338 &&
        mouseX < 372 &&
        mouseY > 702 &&
        mouseY < 717) {
        isButtonPressed[2] = !isButtonPressed[2];
        if (isButtonPressed[2]) {
          hideImages();
          showImage[15] = true;
          if (mySound[2].isPlaying()) {
            mySound[2].pause();
          } else {
            mySound[2].play();
          }
        }
      } else {
        if (mouseX > 440 &&
          mouseX < 474 &&
          mouseY > 702 &&
          mouseY < 717) {
          isButtonPressed[3] = !isButtonPressed[3];
          if (isButtonPressed[3]) {
            hideImages();
            showImage[11] = true;
            if (mySound[3].isPlaying()) {
              mySound[3].pause();
            } else {
              mySound[3].play();
            }
          }
        } else {
          if (mouseX > 474 &&
            mouseX < 508 &&
            mouseY > 702 &&
            mouseY < 717) {
            isButtonPressed[4] = !isButtonPressed[4];
            if (isButtonPressed[4]) {
              hideImages();
              showImage[6] = true;
              if (mySound[4].isPlaying()) {
                mySound[4].pause();
              } else {
                mySound[4].play();
              }
            }
          } else {
            if (mouseX > 508 &&
              mouseX < 542 &&
              mouseY > 702 &&
              mouseY < 717) {
              isButtonPressed[5] = !isButtonPressed[5];
              if (isButtonPressed[5]) {
                hideImages();
                showImage[3] = true;
                if (mySound[5].isPlaying()) {
                  mySound[5].pause();
                } else {
                  mySound[5].play();
                }
              }
            }
          }
        }
      }
    }
  }
  
  
  
  }
  function muteSounds() {
    for (var i = 0; i < mySound.length; i++) {
      mySound[i].pause();
    }
  }
  function drawBackdrop() {
    background(255, 0, 0);
    image(img[1], 100, 400);
    image(img[2], 700, 100, 500, 300);
  }
  function drawButtons() {
    fill(220);
  }
  function drawTVImages() {
    for (var k = 0; k < 19; k++) {
      if (showImage[k]) {
        image(img[k], 775, 126, 350, 209);
      }
    }
  }
  function hideImages() {
    for (var i = 0; i < 19; i++) {
      showImage[i] = false;
    }
  }
  function maybe() {
  }
var img = [];
var mySound = [];
var durations = [];
var button;
var frameCountAtPress = 0;
var isButtonPressed = [false, false, false, false, false, false];
var showImage = [];
function preload() {
  img[0] = loadImage("gov.gif");
  img[1] = loadImage("21boombox.png");
  img[2] = loadImage("tv211.png");
  img[3] = loadImage("80s/Crack.jpeg");
  img[4] = loadImage("80s/crack2.jpg");
  img[5] = loadImage("Gov/Oscar Grant.jpeg");
  img[6] = loadImage("Gov/Emmett Till.jpg");
  img[7] = loadImage("boombox1111.png");
  img[8] = loadImage("Gov/Trayvon Martin.jpg");
  img[9] = loadImage("Riots/Riot1.jpeg");
  img[10] = loadImage("Riots/Riot2.jpeg");
  img[11] = loadImage("System/black2.jpeg");
  img[12] = loadImage("System/Black1.jpeg");
  img[13] = loadImage("System/Black3.jpeg");
  img[14] = loadImage("Thug/Tupac.png");
  img[15] = loadImage("Huey Newton/Huey Newton .jpeg");
  img[16] = loadImage("pyramids0.jpg");
  img[17] = loadImage("pyramids1.jpg");
  img[18] = loadImage("pistol0.jpg")
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Music/pistol.mp3');
  mySound[1] = loadSound('Music/Slave ships.mp3');
  mySound[2] = loadSound('Music/HueyNewton.mp3');
  mySound[3] = loadSound('Music/System.mp3');
  mySound[4] = loadSound('Music/Gov.mp3');
  mySound[5] = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < mySound.length; i++) {
    durations[i] = mySound.duration;
  }
  for (var j = 0; j < 19; j++) {
    showImage[j] = false;
  }
}
function draw() {
  drawBackdrop();
  drawButtons();
  drawTVImages();
}
function mousePressed() {
  console.log(isButtonPressed[0]);
  if (mouseX > 270 &&
    mouseX < 304 &&
    mouseY > 702 &&
    mouseY < 717) {
    isButtonPressed[0] = !isButtonPressed[0];
    if (isButtonPressed[0]) {
      hideImages();
      showImage[18] = true;
      if (mySound[0].isPlaying()) {
        mySound[0].pause();
      } else {
        mySound[0].play();
      }
    }
  } else {
    if (mouseX > 304 &&
      mouseX < 338 &&
      mouseY > 702 &&
      mouseY < 717) {
      isButtonPressed[1] = !isButtonPressed[1];
      if (isButtonPressed[1]) {
        hideImages();
        showImage[16] = true;
        if (mySound[1].isPlaying()) {
          mySound[1].pause();
        } else {
          mySound[1].play();
        }
      }
    } else {
      if (mouseX > 338 &&
        mouseX < 372 &&
        mouseY > 702 &&
        mouseY < 717) {
        isButtonPressed[2] = !isButtonPressed[2];
        if (isButtonPressed[2]) {
          hideImages();
          showImage[15] = true;
          if (mySound[2].isPlaying()) {
            mySound[2].pause();
          } else {
            mySound[2].play();
          }
        }
      } else {
        if (mouseX > 440 &&
          mouseX < 474 &&
          mouseY > 702 &&
          mouseY < 717) {
          isButtonPressed[3] = !isButtonPressed[3];
          if (isButtonPressed[3]) {
            hideImages();
            showImage[11] = true;
            if (mySound[3].isPlaying()) {
              mySound[3].pause();
            } else {
              mySound[3].play();
            }
          }
        } else {
          if (mouseX > 474 &&
            mouseX < 508 &&
            mouseY > 702 &&
            mouseY < 717) {
            isButtonPressed[4] = !isButtonPressed[4];
            if (isButtonPressed[4]) {
              hideImages();
              showImage[6] = true;
              if (mySound[4].isPlaying()) {
                mySound[4].pause();
              } else {
                mySound[4].play();
              }
            }
          } else {
            if (mouseX > 508 &&
              mouseX < 542 &&
              mouseY > 702 &&
              mouseY < 717) {
              isButtonPressed[5] = !isButtonPressed[5];
              if (isButtonPressed[5]) {
                hideImages();
                showImage[3] = true;
                if (mySound[5].isPlaying()) {
                  mySound[5].pause();
                } else {
                  mySound[5].play();
                }
              }
            }
          }
        }
      }
    }
  }
  }
  function muteSounds() {
    for (var i = 0; i < mySound.length; i++) {
      mySound[i].pause();
    }
  }
  function drawBackdrop() {
    background(255, 0, 0);
    image(img[1], 100, 400);
    image(img[2], 700, 100, 500, 300);
  }
  function drawButtons() {
    fill(220);
  }
  function drawTVImages() {
    for (var k = 0; k < 19; k++) {
      if (showImage[k]) {
        image(img[k], 775, 126, 350, 209);
      }
    }
  }
  function hideImages() {
    for (var i = 0; i < 19; i++) {
      showImage[i] = false;
    }
  }
  function maybe() {
  }
var img = [];
var mySound = [];
var durations = [];
var button;
var frameCountAtPress = 0;
var isButtonPressed = [false, false, false, false, false, false];
var showImage = [];
function preload() {
  img[0] = loadImage("gov.gif");
  img[1] = loadImage("21boombox.png");
  img[2] = loadImage("tv211.png");
  img[3] = loadImage("80s/Crack.jpeg");
  img[4] = loadImage("80s/crack2.jpg");
  img[5] = loadImage("Gov/Oscar Grant.jpeg");
  img[6] = loadImage("Gov/Emmett Till.jpg");
  img[7] = loadImage("boombox1111.png");
  img[8] = loadImage("Gov/Trayvon Martin.jpg");
  img[9] = loadImage("Riots/Riot1.jpeg");
  img[10] = loadImage("Riots/Riot2.jpeg");
  img[11] = loadImage("System/black2.jpeg");
  img[12] = loadImage("System/Black1.jpeg");
  img[13] = loadImage("System/Black3.jpeg");
  img[14] = loadImage("Thug/Tupac.png");
  img[15] = loadImage("Huey Newton/Huey Newton .jpeg");
  img[16] = loadImage("pyramids0.jpg");
  img[17] = loadImage("pyramids1.jpg");
  img[18] = loadImage("pistol0.jpg")
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Music/pistol.mp3');
  mySound[1] = loadSound('Music/Slave ships.mp3');
  mySound[2] = loadSound('Music/HueyNewton.mp3');
  mySound[3] = loadSound('Music/System.mp3');
  mySound[4] = loadSound('Music/Gov.mp3');
  mySound[5] = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < mySound.length; i++) {
    durations[i] = mySound.duration;
  }
  for (var j = 0; j < 19; j++) {
    showImage[j] = false;
  }
}
function draw() {
  drawBackdrop();
  drawButtons();
  drawTVImages();
}
function mousePressed() {
  console.log(isButtonPressed[0]);
  if (mouseX > 270 &&
    mouseX < 304 &&
    mouseY > 702 &&
    mouseY < 717) {
    isButtonPressed[0] = !isButtonPressed[0];
    if (isButtonPressed[0]) {
      hideImages();
      showImage[18] = true;
      if (mySound[0].isPlaying()) {
        mySound[0].pause();
      } else {
        mySound[0].play();
      }
    }
  } else {
     if (mouseX > 304 &&
       mouseX < 338 &&
       mouseY > 702 &&
       mouseY < 717) {
       
        isButtonPressed[1] = !isButtonPressed[1];
    if (isButtonPressed[1]) {
      hideImages();
      showImage[3] = true;
      if (mySound[1].isPlaying()) {
        mySound[1].pause();
      } else {
        mySound[1].play();
      }
    }
     }
  }
}
function muteSounds() {
  for (var i = 0; i < mySound.length; i++) {
    mySound[i].pause();
  }
}
function drawBackdrop() {
  background(255, 0, 0);
  image(img[1], 100, 400);
  image(img[2], 700, 100, 500, 300);
}
function drawButtons() {
  fill(220);
}
function drawTVImages() {
  for (var k = 0; k < 19; k++) {
    if (showImage[k]) {
      image(img[k], 775, 126, 350, 209);
    }
  }
}
function hideImages() {
  for (var i = 0; i < 19; i++) {
    showImage[i] = false;
  }
}
function maybe() {
}
var img = [];
var mySound = [];
var durations = [];
var button;
var frameCountAtPress = 0;
var isButtonPressed = [false, false, false, false, false, false];
var showImage = [];
function preload() {
  img[0] = loadImage("gov.gif");
  img[1] = loadImage("21boombox.png");
  img[2] = loadImage("tv211.png");
  img[3] = loadImage("80s/Crack.jpeg");
  img[4] = loadImage("80s/crack2.jpg");
  img[5] = loadImage("Gov/Oscar Grant.jpeg");
  img[6] = loadImage("Gov/Emmett Till.jpg");
  img[7] = loadImage("boombox1111.png");
  img[8] = loadImage("Gov/Trayvon Martin.jpg");
  img[9] = loadImage("Riots/Riot1.jpeg");
  img[10] = loadImage("Riots/Riot2.jpeg");
  img[11] = loadImage("System/black2.jpeg");
  img[12] = loadImage("System/Black1.jpeg");
  img[13] = loadImage("System/Black3.jpeg");
  img[14] = loadImage("Thug/Tupac.png");
  img[15] = loadImage("Huey Newton/Huey Newton .jpeg");
  img[16] = loadImage("pyramids0.jpg");
  img[17] = loadImage("pyramids1.jpg");
  img[18] = loadImage("pistol0.jpg")
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Music/pistol.mp3');
  mySound[1] = loadSound('Music/Slave ships.mp3');
  mySound[2] = loadSound('Music/HueyNewton.mp3');
  mySound[3] = loadSound('Music/System.mp3');
  mySound[4] = loadSound('Music/Gov.mp3');
  mySound[5] = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < mySound.length; i++) {
    durations[i] = mySound.duration;
  }
  for (var j = 0; j < 19; j++) {
    showImage[j] = false;
  }
}
function draw() {
  drawBackdrop();
  drawButtons();
  drawTVImages();
}
function mousePressed() {
  console.log(isButtonPressed[0]);
  if (mouseX > 270 &&
    mouseX < 304 &&
    mouseY > 702 &&
    mouseY < 717) {
    isButtonPressed[0] = !isButtonPressed[0];
    if (isButtonPressed[0]) {
      hideImages();
      showImage[18] = true;
      if (mySound[0].isPlaying()) {
        mySound[0].pause();
      } else {
        mySound[0].play();
      }
    }
    }
  }
  function muteSounds() {
    for (var m = 0; m < mySound.length; m++) {
      mySound[m].pause();
    }
  }
  function drawBackdrop() {
    background(255, 0, 0);
    image(img[1], 100, 400);
    image(img[2], 700, 100, 500, 300);
  }
  function drawButtons() {
    fill(220);
  }
  function drawTVImages() {
    for (var k = 0; k < 19; k++) {
      if (showImage[k]) {
        image(img[k], 775, 126, 350, 209);
      }
    }
  }
  function hideImages() {
    for (var p = 0; p < 19; p++) {
      showImage[p] = false;
    }
  }
  function maybe() {
  }
var img = [];
var mySound = [];
var durations = [];
var button;
var frameCountAtPress = 0;
var isButtonPressed = [false, false, false, false, false, false];
var showImage = [];
function preload() {
  img[0] = loadImage("gov.gif");
  img[1] = loadImage("21boombox.png");
  img[2] = loadImage("tv211.png");
  img[3] = loadImage("80s/Crack.jpeg");
  img[4] = loadImage("80s/crack2.jpg");
  img[5] = loadImage("Gov/Oscar Grant.jpeg");
  img[6] = loadImage("Gov/Emmett Till.jpg");
  img[7] = loadImage("boombox1111.png");
  img[8] = loadImage("Gov/Trayvon Martin.jpg");
  img[9] = loadImage("Riots/Riot1.jpeg");
  img[10] = loadImage("Riots/Riot2.jpeg");
  img[11] = loadImage("System/black2.jpeg");
  img[12] = loadImage("System/Black1.jpeg");
  img[13] = loadImage("System/Black3.jpeg");
  img[14] = loadImage("Thug/Tupac.png");
  img[15] = loadImage("Huey Newton/Huey Newton .jpeg");
  img[16] = loadImage("pyramids0.jpg");
  img[17] = loadImage("pyramids1.jpg");
  img[18] = loadImage("pistol0.jpg")
  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Music/pistol.mp3');
  mySound[1] = loadSound('Music/Slave ships.mp3');
  mySound[2] = loadSound('Music/HueyNewton.mp3');
  mySound[3] = loadSound('Music/System.mp3');
  mySound[4] = loadSound('Music/Gov.mp3');
  mySound[5] = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < mySound.length; i++) {
    durations[i] = mySound.duration;
  }
  for (var j = 0; j < 19; j++) {
    showImage[j] = false;
  }
}
function draw() {
  drawBackdrop();
  drawButtons();
  drawTVImages();
}
function mousePressed() {
  console.log(isButtonPressed[0]);
  if (mouseX > 270 &&
    mouseX < 304 &&
    mouseY > 702 &&
    mouseY < 717) {
    isButtonPressed[0] = !isButtonPressed[0];
    if (isButtonPressed[0]) {
      hideImages();
      showImage[18] = true;
      if (mySound[0].isPlaying()) {
        mySound[0].pause();
      } else {
        mySound[0].play();
      }
    }
  }
}
function muteSounds() {
  for (var i = 0; i < mySound.length; i++) {
    mySound[i].pause();
  }
}
function drawBackdrop() {
  background(255, 0, 0);
  image(img[1], 100, 400);
  image(img[2], 700, 100, 500, 300);
}
function drawButtons() {
  fill(220);
}
function drawTVImages() {
  for (var k = 0; k < 19; k++) {
    if (showImage[k]) {
      image(img[k], 775, 126, 350, 209);
    }
  }
}
function hideImages() {
  for (var i = 0; i < 19; i++) {
    showImage[i] = false;
  }
}
function maybe() {
}
var img1;
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;
var img8;
var img9;
var img10;
var img11;
var img12;
var img13;
var img14;
var img15;
var button;
var frameCountAtPress = 0;
function preload() {
  img1 = loadImage("21boombox.png");
  img2 = loadImage("tv211.png");
  img3 = loadImage("80s/Crack.jpeg");
  img4 = loadImage("80s/crack2.jpg");
  img5 = loadImage("Gov/Oscar Grant.jpeg");
  img6 = loadImage("Gov/Emmett Till.jpg");
  img7 = loadImage("boombox1111.png");
  img8 = loadImage("Gov/Trayvon Martin.jpg");
  img9 = loadImage("Riots/Riot1.jpeg");
  img10 = loadImage("Riots/Riot2.jpeg");
  img11 = loadImage("System/black2.jpeg");
  img12 = loadImage("System/Black1.jpeg");
  img13 = loadImage("System/Black3.jpeg");
  img14 = loadImage("Thug/Tupac.png");
  img15 = loadImage("Huey Newton/Huey Newton .jpeg");
  soundFormats('mp3', 'ogg');
  mySound1 = loadSound('Music/pistol.mp3');
  mySound2 = loadSound('Music/Slave ships.mp3');
  mySound3 = loadSound('Music/HueyNewton.mp3');
  mySound4 = loadSound('Music/System.mp3');
  mySound5 = loadSound('Music/Gov.mp3');
  mySound6 = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  
    frameRate(30);
  textSize(20);
  textSize(30);
  textAlign(CENTER);
}
function draw() {
  background (255,0,0);
  text(frameCount, width/2, height/2);
  image(img1, 100, 400);
  ellipse(540, 487, 30, 30);
  
  
  image(img2, 700, 100, 500, 300);
  image(img3, 775, 126, 350, 209);
  image(img4, 775, 126, 350, 209);
  image(img5, 775, 126, 350, 209);
  image(img6, 775, 126, 350, 209);
  image(img7, 775, 126, 350, 209);
  image(img8, 775, 126, 350, 209);
  image(img9, 775, 126, 350, 209);
  image(img10, 775, 126, 350, 209);
  image(img11, 775, 126, 350, 209);
  image(img12, 775, 126, 350, 209);
  image(img13, 775, 126, 350, 209);
  image(img14, 775, 126, 350, 209);
  image(img15, 775, 126, 350, 209);
  
  
 
  
  
  
         if (frameCount - frameCountAtPress < 100) {
      fill(0);
  rect(775, 126, 350, 209);
  } else { 
         fill(0);
  rect(775, 126, 350, 209);
  }
  
  
  
  
         if (frameCount - frameCountAtPress > 100) {
     image(img15, 775, 126, 350, 209);
  } else { 
    image(img14, 775, 126, 350, 209);
    
  }
        
  fill(220);
}
function mousePressed() {
  
  if (mouseX > 270 &&
    mouseX < 304 &&
    mouseY > 702 &&
    mouseY < 717) {
    
    if (mySound1.isPlaying() == true) {
      mySound1.pause();
      songTitle = createElement('p', 'I got my finger on the motherfucking pistol, aiming it at a pig, Charlottes Web is gonna miss you');
     
    } else {
      mySound1.play();
      mySound2.pause();
      mySound3.pause();
      mySound4.pause();
      mySound5.pause();
      mySound6.pause();
    }
  } else {
    if (mouseX > 304 &&
      mouseX < 338 &&
      mouseY > 702 &&
      mouseY < 717) {
      if (mySound2.isPlaying() == true) {
        mySound2.pause();
        songTitle = createElement('p', 'I be off the slave ship, Building pyramids, writing my own hieroglyphs');
      } else {
       
        mySound2.play();
        mySound1.pause();
        mySound3.pause();
        mySound4.pause();
        mySound5.pause();
        mySound6.pause();
      }
      
      
      
      
    } else {
      if (mouseX > 338 &&
        mouseX < 372 &&
        mouseY > 702 &&
        mouseY < 717) {
        
        
        frameCountAtPress = frameCount; 
        if (mySound3.isPlaying() == true) {
          mySound3.pause();
          
              songTitle = createElement('p', 'I mean the shit is, Huey Newton going stupid, You cant resist his, HiiiPower, Throw your hands up for HiiiPower');
        } else {
          
           
          mySound3.play();
          mySound1.pause();
          mySound2.pause();
          mySound4.pause();
          mySound5.pause();
          mySound6.pause();
        }
      } else {
        if (mouseX > 440 &&
          mouseX < 474 &&
          mouseY > 702 &&
          mouseY < 717) {
          if (mySound4.isPlaying() == true) {
            mySound4.pause();
          } else {
            songTitle = createElement('p', 'Every day we fight the system just to make our way, we been down for too long  But thats alright, we was built to be strong cause its our life, na-na-nah, Every day we fight the system, We fight the system, We fight the system (Never liked the system),  We been down for too long, But thats alright, na-na-nah');
            mySound4.play();
            mySound1.pause();
            mySound2.pause();
            mySound3.pause();
            mySound5.pause();
            mySound6.pause();
          
          }
        } else {
          if (mouseX > 474 &&
            mouseX < 508 &&
            mouseY > 702 &&
            mouseY < 717) {
            if (mySound5.isPlaying() == true) {
              mySound5.pause();
              
      songTitle = createElement('p', 'And I want everybody to view my autopsy, So you can see exactly where the government had shot me');
            } else {
              mySound5.play();
              mySound1.pause();
              mySound2.pause();
              mySound3.pause();
              mySound4.pause();
              mySound6.pause();
             
            }
          } else {
            if (mouseX > 508 &&
              mouseX < 542 &&
              mouseY > 702 &&
              mouseY < 717) {
              if (mySound6.isPlaying() == true) {
                mySound6.pause();
                
        songTitle = createElement('p', 'its crazy, product of the late 80s,Trying to stay above water');
              } else {
                mySound6.play();
                mySound1.pause();
                mySound2.pause();
                mySound3.pause();
                mySound4.pause();
                mySound5.pause();
              }
            }
          }
        }
      }
    }
  }
}
var eyew = 16;
var eyeh = 16;
var pointerX = 12;
var pointerY = 260;
    
  
function setup() { 
  createCanvas(600, 600);
  
sleep = {
  
  
    "mon" : 8,
    "tue" : 6, 
    "wed" : 4,
    "sat" : 2, 
    "sun" : 5
}
  
 	button1 = createButton('tuesday');
  button1.position(25, 10);
  button1.mousePressed( function(){
    adjustEyesSize("tue", 10);
  });
  
  button2 = createButton('wednesday');
  button2.position(25, 50);
  button2.mousePressed( function(){
    adjustEyesSize("wed", 50);
  });
  
  button3 = createButton('thursday');
  button3.position(25, 90);
  button3.mousePressed( function(){
    adjustEyesSize("thu", 90);
   });
  button4 = createButton('friday');
  button4.position(25, 130);
  button4.mousePressed( function(){
    adjustEyesSize("fri", 130);
   });
  
  button5 = createButton('saturday');
  button5.position(25, 170);
  button5.mousePressed( function(){
    adjustEyesSize("thu", 170);
   });
  
  button6 = createButton('sunday');
  button6.position(25, 210);
  button6.mousePressed( function(){
    adjustEyesSize("sun", 210);
   });
  
  button7 = createButton('monday');
  button7.position(25, 250);
}
function adjustEyesSize(day, buttonHeight){
 	let hours = sleep[day];
  eyew = 2*hours;
  eyeh = 2*hours;
  pointerY = buttonHeight + 10;
}
function draw() { 
  background(220);
  
  fill("brown");
  ellipse (200,200, 100, 100);
  
   
  line (170,190, 190,190);
  line (210,190, 230,190);
  
  line (180, 220, 220, 220);
  
  fill("blue");
  rect(150, 250, 100, 100);
  fill(255);
  triangle(190, 250, 200, 270, 210, 250);
  
  
  
  
  
  
  
  
  
    
 
  ellipse (180,200, eyew, eyeh);
  ellipse (220,200, eyew, eyeh);
	fill(0);
  ellipse(pointerX, pointerY, 10, 10);
}var pointer1X = 20
var pointer1Y =500
var pointer2X = 520
var pointer2Y = 500
function setup() {
 createCanvas(windowWidth, windowHeight);
        }
function draw() {
  background(220);
  
  pointer1Y = mouseY
  pointer2Y = mouseY
  line(width / 2, 0, width / 2, 800);
  textSize(32);
  text("Player 1", 10, 60);
  fill(0, 102, 153);
  text("Player 2", width / 2 + 10, 60);
  fill(255, 0, 0);
  
  strokeWeight(5);
  line(20, 200, 20, 500);
  line(width / 2 + 20, 200, width / 2 + 20, 500);
  textSize(20);
  text("FINISH", 20, 180);
  text("FINISH", width / 2 + 20, 180);
  fill(0, 102, 153);
  text("START", 20, 530);
  text("START", width / 2 + 20, 530);
  fill(255, 0, 0);
  
  
  ellipse (pointer1X, pointer1Y, 20, 20);
  ellipse (pointer2X, pointer2Y, 20, 20);
var img1;
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;
var img8;
var img9;
var img10;
var img11;
var img12;
var img13;
var img14;
var img15;
var button;
var frameCountAtPress = 0;
function preload() {
  img1 = loadImage("21boombox.png");
  img2 = loadImage("tv211.png");
  img3 = loadImage("80s/Crack.jpeg");
  img4 = loadImage("80s/crack2.jpg");
  img5 = loadImage("Gov/Oscar Grant.jpeg");
  img6 = loadImage("Gov/Emmett Till.jpg");
  img7 = loadImage("boombox1111.png");
  img8 = loadImage("Gov/Trayvon Martin.jpg");
  img9 = loadImage("Riots/Riot1.jpeg");
  img10 = loadImage("Riots/Riot2.jpeg");
  img11 = loadImage("System/black2.jpeg");
  img12 = loadImage("System/Black1.jpeg");
  img13 = loadImage("System/Black3.jpeg");
  img14 = loadImage("Thug/Tupac.png");
  img15 = loadImage("Huey Newton/Huey Newton .jpeg");
  soundFormats('mp3', 'ogg');
  mySound1 = loadSound('Music/pistol.mp3');
  mySound2 = loadSound('Music/Slave ships.mp3');
  mySound3 = loadSound('Music/HueyNewton.mp3');
  mySound4 = loadSound('Music/System.mp3');
  mySound5 = loadSound('Music/Gov.mp3');
  mySound6 = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background (255,0,0);
  image(img1, 100, 400);
  image(img2, 700, 100, 500, 300);
  
  
         if (frameCount - frameCountAtPress < 100) {
     image(img15, 775, 126, 350, 209);
  } else { 
    image(img14, 775, 126, 350, 209);
    
  }
        
  fill(220);
}
function mousePressed() {
  
  if (mouseX > 270 &&
    mouseX < 304 &&
    mouseY > 702 &&
    mouseY < 717) {
    
    if (mySound1.isPlaying() == true) {
      mySound1.pause();
      songTitle = createElement('p', 'I got my finger on the motherfucking pistol, aiming it at a pig, Charlottes Web is gonna miss you');
     
    } else {
      mySound1.play();
      mySound2.pause();
      mySound3.pause();
      mySound4.pause();
      mySound5.pause();
      mySound6.pause();
    }
  } else {
    if (mouseX > 304 &&
      mouseX < 338 &&
      mouseY > 702 &&
      mouseY < 717) {
      if (mySound2.isPlaying() == true) {
        mySound2.pause();
        songTitle = createElement('p', 'I be off the slave ship, Building pyramids, writing my own hieroglyphs');
      } else {
       
        mySound2.play();
        mySound1.pause();
        mySound3.pause();
        mySound4.pause();
        mySound5.pause();
        mySound6.pause();
      }
      
      
      
      
    } else {
      if (mouseX > 338 &&
        mouseX < 372 &&
        mouseY > 702 &&
        mouseY < 717) {
        
        
        frameCountAtPress = frameCount; 
        if (mySound3.isPlaying() == true) {
          mySound3.pause();
          
              songTitle = createElement('p', 'I mean the shit is, Huey Newton going stupid, You cant resist his, HiiiPower, Throw your hands up for HiiiPower');
        } else {
          
           
          mySound3.play();
          mySound1.pause();
          mySound2.pause();
          mySound4.pause();
          mySound5.pause();
          mySound6.pause();
        }
      } else {
        if (mouseX > 440 &&
          mouseX < 474 &&
          mouseY > 702 &&
          mouseY < 717) {
          if (mySound4.isPlaying() == true) {
            mySound4.pause();
          } else {
            songTitle = createElement('p', 'Every day we fight the system just to make our way, we been down for too long  But thats alright, we was built to be strong cause its our life, na-na-nah, Every day we fight the system, We fight the system, We fight the system (Never liked the system),  We been down for too long, But thats alright, na-na-nah');
            mySound4.play();
            mySound1.pause();
            mySound2.pause();
            mySound3.pause();
            mySound5.pause();
            mySound6.pause();
          
          }
        } else {
          if (mouseX > 474 &&
            mouseX < 508 &&
            mouseY > 702 &&
            mouseY < 717) {
            if (mySound5.isPlaying() == true) {
              mySound5.pause();
              
      songTitle = createElement('p', 'And I want everybody to view my autopsy, So you can see exactly where the government had shot me');
            } else {
              mySound5.play();
              mySound1.pause();
              mySound2.pause();
              mySound3.pause();
              mySound4.pause();
              mySound6.pause();
             
            }
          } else {
            if (mouseX > 508 &&
              mouseX < 542 &&
              mouseY > 702 &&
              mouseY < 717) {
              if (mySound6.isPlaying() == true) {
                mySound6.pause();
                
        songTitle = createElement('p', 'its crazy, product of the late 80s,Trying to stay above water');
              } else {
                mySound6.play();
                mySound1.pause();
                mySound2.pause();
                mySound3.pause();
                mySound4.pause();
                mySound5.pause();
              }
            }
          }
        }
      }
    }
  }
}
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;
var img8;
var img9;
var img10;
var img11;
var img12;
var img13;
var img14;
var img15;
var button;
function preload() {
  img1 = loadImage("21boombox.png");
  img2 = loadImage("tv211.png");
  img3 = loadImage("80s/Crack.jpeg");
  img4 = loadImage("80s/crack2.jpg");
  img5 = loadImage("Gov/Oscar Grant.jpeg");
  img6 = loadImage("Gov/Emmett Till.jpg");
  img7 = loadImage("boombox1111.png");
  img8 = loadImage("Gov/Trayvon Martin.jpg");
  img9 = loadImage("Riots/Riot1.jpeg");
  img10 = loadImage("Riots/Riot2.jpeg");
  img11 = loadImage("System/black2.jpeg");
  img12 = loadImage("System/Black1.jpeg");
  img13 = loadImage("System/Black3.jpeg");
  img14 = loadImage("Thug/Tupac.png");
  img15 = loadImage("Huey Newton/Huey Newton .jpeg");
  soundFormats('mp3', 'ogg');
  mySound1 = loadSound('Music/pistol.mp3');
  mySound2 = loadSound('Music/Slave ships.mp3');
  mySound3 = loadSound('Music/HueyNewton.mp3');
  mySound4 = loadSound('Music/System.mp3');
  mySound5 = loadSound('Music/Gov.mp3');
  mySound6 = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  image(img1, 100, 400);
  image(img2, 700, 100, 500, 300);
  image(img3, 775, 126, 350, 209);
  image(img4, 775, 126, 350, 209);
  image(img5, 775, 126, 350, 209);
  image(img6, 775, 126, 350, 209);
  image(img7, 775, 126, 350, 209);
  image(img8, 775, 126, 350, 209);
  image(img9, 775, 126, 350, 209);
  image(img10, 775, 126, 350, 209);
  image(img11, 775, 126, 350, 209);
  image(img12, 775, 126, 350, 209);
  image(img13, 775, 126, 350, 209);
  image(img14, 775, 126, 350, 209);
  image(img15, 775, 126, 350, 209);
  fill(220);
}
function mousePressed() {
  
  if (mouseX > 270 &&
    mouseX < 304 &&
    mouseY > 702 &&
    mouseY < 717) {
    if (mySound1.isPlaying() == true) {
      mySound1.pause();
      songTitle = createElement('p', 'I got my finger on the motherfucking pistol, aiming it at a pig, Charlottes Web is gonna miss you');
     
    } else {
      mySound1.play();
      mySound2.pause();
      mySound3.pause();
      mySound4.pause();
      mySound5.pause();
      mySound6.pause();
    }
  } else {
    if (mouseX > 304 &&
      mouseX < 338 &&
      mouseY > 702 &&
      mouseY < 717) {
      if (mySound2.isPlaying() == true) {
        mySound2.pause();
        songTitle = createElement('p', 'I be off the slave ship, Building pyramids, writing my own hieroglyphs');
      } else {
       
        mySound2.play();
        mySound1.pause();
        mySound3.pause();
        mySound4.pause();
        mySound5.pause();
        mySound6.pause();
      }
      
      
      
      
    } else {
      if (mouseX > 338 &&
        mouseX < 372 &&
        mouseY > 702 &&
        mouseY < 717) {
        if (mySound3.isPlaying() == true) {
          mySound3.pause();
          
              songTitle = createElement('p', 'I mean the shit is, Huey Newton going stupid, You cant resist his, HiiiPower, Throw your hands up for HiiiPower');
        } else {
          
           
          mySound3.play();
          mySound1.pause();
          mySound2.pause();
          mySound4.pause();
          mySound5.pause();
          mySound6.pause();
        }
      } else {
        if (mouseX > 440 &&
          mouseX < 474 &&
          mouseY > 702 &&
          mouseY < 717) {
          if (mySound4.isPlaying() == true) {
            mySound4.pause();
          } else {
            songTitle = createElement('p', 'Every day we fight the system just to make our way, we been down for too long  But thats alright, we was built to be strong cause its our life, na-na-nah, Every day we fight the system, We fight the system, We fight the system (Never liked the system),  We been down for too long, But thats alright, na-na-nah');
            mySound4.play();
            mySound1.pause();
            mySound2.pause();
            mySound3.pause();
            mySound5.pause();
            mySound6.pause();
          
          }
        } else {
          if (mouseX > 474 &&
            mouseX < 508 &&
            mouseY > 702 &&
            mouseY < 717) {
            if (mySound5.isPlaying() == true) {
              mySound5.pause();
              
      songTitle = createElement('p', 'And I want everybody to view my autopsy, So you can see exactly where the government had shot me');
            } else {
              mySound5.play();
              mySound1.pause();
              mySound2.pause();
              mySound3.pause();
              mySound4.pause();
              mySound6.pause();
             
            }
          } else {
            if (mouseX > 508 &&
              mouseX < 542 &&
              mouseY > 702 &&
              mouseY < 717) {
              if (mySound6.isPlaying() == true) {
                mySound6.pause();
                
        songTitle = createElement('p', 'its crazy, product of the late 80s,Trying to stay above water');
              } else {
                mySound6.play();
                mySound1.pause();
                mySound2.pause();
                mySound3.pause();
                mySound4.pause();
                mySound5.pause();
              }
            }
          }
        }
      }
    }
  }
}
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;
var img8;
var img9;
var img10;
var img11;
var img12;
var img13;
var img14;
var img15;
var button;
function preload() {
  img1 = loadImage("21boombox.png");
  img2 = loadImage("tv211.png");
  img3 = loadImage("80s/Crack.jpeg");
  img4 = loadImage("80s/crack2.jpg");
  img5 = loadImage("Gov/Oscar Grant.jpeg");
  img6 = loadImage("Gov/Emmett Till.jpg");
  img7 = loadImage("boombox1111.png");
  img8 = loadImage("Gov/Trayvon Martin.jpg");
  img9 = loadImage("Riots/Riot1.jpeg");
  img10 = loadImage("Riots/Riot2.jpeg");
  img11 = loadImage("System/black2.jpeg");
  img12 = loadImage("System/Black1.jpeg");
  img13 = loadImage("System/Black3.jpeg");
  img14 = loadImage("Thug/Tupac.png");
  img15 = loadImage("Huey Newton/Huey Newton .jpeg");
  soundFormats('mp3', 'ogg');
  mySound1 = loadSound('Music/pistol.mp3');
  mySound2 = loadSound('Music/Slave ships.mp3');
  mySound3 = loadSound('Music/HueyNewton.mp3');
  mySound4 = loadSound('Music/System.mp3');
  mySound5 = loadSound('Music/Gov.mp3');
  mySound6 = loadSound('Music/80s.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background (255,0,0);
  image(img1, 100, 400);
  image(img2, 700, 100, 500, 300);
  image(img3, 775, 126, 350, 209);
  image(img4, 775, 126, 350, 209);
  image(img5, 775, 126, 350, 209);
  image(img6, 775, 126, 350, 209);
  image(img7, 775, 126, 350, 209);
  image(img8, 775, 126, 350, 209);
  image(img9, 775, 126, 350, 209);
  image(img10, 775, 126, 350, 209);
  image(img11, 775, 126, 350, 209);
  image(img12, 775, 126, 350, 209);
  image(img13, 775, 126, 350, 209);
  image(img14, 775, 126, 350, 209);
  image(img15, 775, 126, 350, 209);
  fill(220);
}
function mousePressed() {
  
  if (mouseX > 270 &&
    mouseX < 304 &&
    mouseY > 702 &&
    mouseY < 717) {
    if (mySound1.isPlaying() == true) {
      mySound1.pause();
      songTitle = createElement('p', 'I got my finger on the motherfucking pistol, aiming it at a pig, Charlottes Web is gonna miss you');
     
    } else {
      mySound1.play();
      mySound2.pause();
      mySound3.pause();
      mySound4.pause();
      mySound5.pause();
      mySound6.pause();
    }
  } else {
    if (mouseX > 304 &&
      mouseX < 338 &&
      mouseY > 702 &&
      mouseY < 717) {
      if (mySound2.isPlaying() == true) {
        mySound2.pause();
        songTitle = createElement('p', 'I be off the slave ship, Building pyramids, writing my own hieroglyphs');
      } else {
       
        mySound2.play();
        mySound1.pause();
        mySound3.pause();
        mySound4.pause();
        mySound5.pause();
        mySound6.pause();
      }
      
      
      
      
    } else {
      if (mouseX > 338 &&
        mouseX < 372 &&
        mouseY > 702 &&
        mouseY < 717) {
        if (mySound3.isPlaying() == true) {
          mySound3.pause();
          
              songTitle = createElement('p', 'I mean the shit is, Huey Newton going stupid, You cant resist his, HiiiPower, Throw your hands up for HiiiPower');
        } else {
          
           
          mySound3.play();
          mySound1.pause();
          mySound2.pause();
          mySound4.pause();
          mySound5.pause();
          mySound6.pause();
        }
      } else {
        if (mouseX > 440 &&
          mouseX < 474 &&
          mouseY > 702 &&
          mouseY < 717) {
          if (mySound4.isPlaying() == true) {
            mySound4.pause();
          } else {
            songTitle = createElement('p', 'Every day we fight the system just to make our way, we been down for too long  But thats alright, we was built to be strong cause its our life, na-na-nah, Every day we fight the system, We fight the system, We fight the system (Never liked the system),  We been down for too long, But thats alright, na-na-nah');
            mySound4.play();
            mySound1.pause();
            mySound2.pause();
            mySound3.pause();
            mySound5.pause();
            mySound6.pause();
          
          }
        } else {
          if (mouseX > 474 &&
            mouseX < 508 &&
            mouseY > 702 &&
            mouseY < 717) {
            if (mySound5.isPlaying() == true) {
              mySound5.pause();
              
      songTitle = createElement('p', 'And I want everybody to view my autopsy, So you can see exactly where the government had shot me');
            } else {
              mySound5.play();
              mySound1.pause();
              mySound2.pause();
              mySound3.pause();
              mySound4.pause();
              mySound6.pause();
             
            }
          } else {
            if (mouseX > 508 &&
              mouseX < 542 &&
              mouseY > 702 &&
              mouseY < 717) {
              if (mySound6.isPlaying() == true) {
                mySound6.pause();
                
        songTitle = createElement('p', 'its crazy, product of the late 80s,Trying to stay above water');
              } else {
                mySound6.play();
                mySound1.pause();
                mySound2.pause();
                mySound3.pause();
                mySound4.pause();
                mySound5.pause();
              }
            }
          }
        }
      }
    }
  }
}
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
}
var img1;
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;
var img8;
var img9;
var img10;
var img11;
var img12;
var img13;
var img14;
var img15;
var button;
function preload() {
  img1 = loadImage("21boombox.png");
  img2 = loadImage("tv211.png");
  img3 = loadImage("80s/Crack.jpeg");
  img4 = loadImage("80s/crack2.jpg");
  img5 = loadImage("Gov/Oscar Grant.jpeg");
  img6 = loadImage("Gov/Emmett Till.jpg");
  img7 = loadImage("boombox1111.png");
  img8 = loadImage("Gov/Trayvon Martin.jpg");
  img9 = loadImage("Riots/Riot1.jpeg");
  img10 = loadImage("Riots/Riot2.jpeg");
  img11 = loadImage("System/black2.jpeg");
  img12 = loadImage("System/Black1.jpeg");
  img13 = loadImage("System/Black3.jpeg");
  img14 = loadImage("Thug/Tupac.png");
  img15 = loadImage("Huey Newton/Huey Newton .jpeg");
  soundFormats('mp3', 'ogg');
  mySound1 = loadSound('Music/Gov.mp3');
  mySound2 = loadSound('Music/80s.mp3');
  mySound3 = loadSound('Music/Slave ships.mp3');
  mySound4 = loadSound('Music/System.mp3');
  mySound5 = loadSound('Music/HueyNewton.mp3');
  mySound6 = loadSound('Music/pistol.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  image(img1, 100, 400);
  image(img2, 700, 100, 500, 300);
  image(img3, 775, 126, 350, 209);
  image(img4, 775, 126, 350, 209);
  image(img5, 775, 126, 350, 209);
  image(img6, 775, 126, 350, 209);
  image(img7, 775, 126, 350, 209);
  image(img8, 775, 126, 350, 209);
  image(img9, 775, 126, 350, 209);
  image(img10, 775, 126, 350, 209);
  image(img11, 775, 126, 350, 209);
  image(img12, 775, 126, 350, 209);
  image(img13, 775, 126, 350, 209);
  image(img14, 775, 126, 350, 209);
  image(img15, 775, 126, 350, 209);
  fill(220);
}
function mousePressed() {
  if (mouseX > 270 &&
    mouseX < 304 &&
    mouseY > 702 &&
    mouseY < 717) {
    if (mySound1.isPlaying() == true) {
      mySound1.pause();
      songTitle = createElement('p', 'And I want everybody to view my autopsy, So you can see exactly where the government had shot me');
    } else {
      mySound1.play();
      mySound2.pause();
      mySound3.pause();
      mySound4.pause();
      mySound5.pause();
      mySound6.pause();
    }
  } else {
    if (mouseX > 304 &&
      mouseX < 368 &&
      mouseY > 702 &&
      mouseY < 717) {
      if (mySound2.isPlaying() == true) {
        mySound2.pause();
      } else {
        mySound2.play();
        mySound1.pause();
        mySound3.pause();
        mySound4.pause();
        mySound5.pause();
        mySound6.pause();
        songTitle = createElement('p', 'its crazy, product of the late 80s,Trying to stay above water');
        
      }
    } else {
      if (mouseX > 338 &&
        mouseX < 372 &&
        mouseY > 702 &&
        mouseY < 717) {
        if (mySound3.isPlaying() == true) {
          mySound3.pause();
        } else {
          mySound3.play();
          mySound1.pause();
          mySound2.pause();
          mySound4.pause();
          mySound5.pause();
          mySound6.pause();
          songTitle = createElement('p', 'I be off the slave ship, Building pyramids, writing my own hieroglyphs');
        }
      } else {
        if (mouseX > 440 &&
          mouseX < 474 &&
          mouseY > 702 &&
          mouseY < 717) {
          if (mySound4.isPlaying() == true) {
            mySound4.pause();
          } else {
            mySound4.play();
            mySound1.pause();
            mySound2.pause();
            mySound3.pause();
            mySound5.pause();
            mySound6.pause();
            songTitle = createElement('p', 'Every day we fight the system just to make our way, we been down for too long  But thats alright, we was built to be strong cause its our life, na-na-nah, Every day we fight the system, We fight the system, We fight the system (Never liked the system),  We been down for too long, But thats alright, na-na-nah');
          }
        } else {
          if (mouseX > 474 &&
            mouseX < 508 &&
            mouseY > 702 &&
            mouseY < 717) {
            if (mySound5.isPlaying() == true) {
              mySound5.pause();
            } else {
              mySound5.play();
              mySound1.pause();
              mySound2.pause();
              mySound3.pause();
              mySound4.pause();
              mySound6.pause();
              
              songTitle = createElement('p', 'I mean the shit is, Huey Newton going stupid, You cant resist his, HiiiPower, Throw your hands up for HiiiPower');
            }
          } else {
            if (mouseX > 508 &&
              mouseX < 542 &&
              mouseY > 702 &&
              mouseY < 717) {
              if (mySound6.isPlaying() == true) {
                mySound6.pause();
              } else {
                mySound6.play();
                mySound1.pause();
                mySound2.pause();
                mySound3.pause();
                mySound4.pause();
                mySound5.pause();
                songTitle = createElement('p', 'I got my finger on the motherfucking pistol, aiming it at a pig, Charlottes Web is gonna miss you');
              }
            }
          }
        }
      }
    }
  }
}
var img0;
var img1;
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;
var img8;
var img9;
var img10;
var img11;
var img12;
var img13;
var img14;
var img15;
var button;
function preload() {
  img1 = loadImage("21boombox.png");
  img2 = loadImage("tv211.png");
  img3 = loadImage("Crack.jpeg");
  img4 = loadImage("crack2.jpg");
  img5 = loadImage("Oscar Grant.jpeg");
  img6 = loadImage("Emmett Till.jpg");
  img7 = loadImage("boombox1111.png");
  img8 = loadImage("Trayvon Martin.jpg");
  img9 = loadImage("Riot1.jpeg");
  img10 = loadImage("Riot2.jpeg");
  img11 = loadImage("black2.jpeg");
  img12 = loadImage("Black1.jpeg");
  img13 = loadImage("Black3.jpeg");
  img14 = loadImage("Tupac.png");
  img14 = loadImage("Huey Newton .jpeg");
  
   soundFormats('mp3', 'ogg');
   mySound1 = loadSound('Gov.mp3'); 
   mySound2 = loadSound('80s.mp3');
   mySound3 = loadSound('Slave ships.mp3');
   mySound4 = loadSound('System.mp3'); 
   mySound5 = loadSound('HueyNewton.mp3');
   mySound6 = loadSound('pistol.mp3');
 }
function setup() {
  createCanvas(windowWidth, windowHeight);
  
 
}
function draw() { 
  
  
 image(img1, 100, 400);
 image(img2, 700, 100, 500, 300);
 image(img3, 775, 126, 350, 209);
 image(img4, 775, 126, 350, 209);
 image(img5, 775, 126, 350, 209);
 image(img6, 775, 126, 350, 209);
 image(img7, 775, 126, 350, 209);
 image(img8, 775, 126, 350, 209);
 image(img9, 775, 126, 350, 209);
 image(img10, 775, 126, 350, 209);
 image(img11, 775, 126, 350, 209);
 image(img12, 775, 126, 350, 209);
 image(img13, 775, 126, 350, 209);
 image(img14, 775, 126, 350, 209);
  
 
  fill(220);
  
 
}
function mousePressed() {
  if(mouseX > 270 && 
     mouseX < 304 &&
     mouseY > 702 &&
     mouseY < 717){
    
    if(mySound1.isPlaying() == true){
      mySound1.pause();
    }else{
      
   		mySound1.play();
      mySound2.pause();
      mySound3.pause();
      mySound4.pause();
      mySound5.pause();
      mySound6.pause();
      
      songTitle = createElement('p','Loyalty-Kendrick');
    }
    
 
  } else {
    if(mouseX > 304 && 
     mouseX < 368 &&
     mouseY > 702 &&
     mouseY < 717){
    
  
    if(mySound2.isPlaying() == true){
      mySound2.pause();
    }else{
      
   		mySound2.play();
      mySound1.pause();
      mySound3.pause();
      mySound4.pause();
      mySound5.pause();
      mySound6.pause();
      
      songTitle = createElement('p','Biking-Frank Ocean');
    }
     }else{
    
      if(mouseX > 338 && 
     mouseX < 372 &&
     mouseY > 702 &&
     mouseY < 717){
        
    if(mySound3.isPlaying() == true){
      mySound3.pause();
    }else{
      
   		mySound3.play();
      mySound1.pause();
      mySound2.pause();
      mySound4.pause();
      mySound5.pause();
      mySound6.pause();
      
     songTitle = createElement('p','Young Dumb and Broke-Khalid');
      
     } 
        
  
     }else{
    
      if(mouseX > 440 && 
     mouseX < 474 &&
     mouseY > 702 &&
     mouseY < 717){
        
    if(mySound4.isPlaying() == true){
      mySound4.pause();
    }else{
      
   		mySound4.play();
      mySound1.pause();
      mySound2.pause();
      mySound3.pause();
      mySound5.pause();
      mySound6.pause();
      
     songTitle = createElement('p','Young Dumb and Broke-Khalid');
      
     }        
        
       
     }else{
    
      if(mouseX > 474 && 
     mouseX < 508 &&
     mouseY > 702 &&
     mouseY < 717){
        
    if(mySound5.isPlaying() == true){
      mySound5.pause();
    }else{
      
   		mySound5.play();
      mySound1.pause();
      mySound2.pause();
      mySound3.pause();
      mySound4.pause();
      mySound6.pause();
      
     songTitle = createElement('p','Young Dumb and Broke-Khalid');
      
     }   
        
     }else{
    
      if(mouseX > 508 && 
     mouseX < 542 &&
     mouseY > 702 &&
     mouseY < 717){
        
    if(mySound6.isPlaying() == true){
      mySound6.pause();
    }else{
      
   		mySound6.play();
      mySound1.pause();
      mySound2.pause();
      mySound3.pause();
      mySound4.pause();
      mySound5.pause();
      
     songTitle = createElement('p','Young Dumb and Broke-Khalid');
      
     }    
     }
  }
    }
  }
}
}
}
var frameCountAtPress = 0;
function preload () {
  img1 = loadImage("Riot1.jpeg");
  img2 = loadImage("Riot2.jpeg")
}
function setup() { 
  createCanvas(600, 600);
} 
function draw() { 
  background(220);
  
  
 
  
  
  if (frameCount - frameCountAtPress < 100) {
   ellipse(10, 10 ,10, 10); 
     image(img1, 200, 200, 200, 200);
  } else {
   	rect(10, 10 , 10 , 10 ); 
    image(img2, 200, 200, 200);
  }
  
}
function mousePressed() {
 frameCountAtPress = frameCount; 
}var img0;
var img1;
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;
var img8;
var img9;
var img10;
var img11;
var img12;
var img13;
var img14;
var img15;
var button;
function preload() {
  img1 = loadImage("Boomb.png");
  img2 = loadImage("tv211.png");
  img3 = loadImage("Crack.jpeg");
  img4 = loadImage("crack2.jpg");
  img5 = loadImage("Oscar Grant.jpeg");
  img6 = loadImage("Emmett Till.jpg");
  img7 = loadImage("boombox1111.png");
  img8 = loadImage("Trayvon Martin.jpg");
  img9 = loadImage("Riot1.jpeg");
  img10 = loadImage("Riot2.jpeg");
  img11 = loadImage("black2.jpeg");
  img12 = loadImage("Black1.jpeg");
  img13 = loadImage("Black3.jpeg");
  img14 = loadImage("Tupac.png");
  
   soundFormats('mp3', 'ogg');
   mySound1 = loadSound('Gov.mp3'); 
   mySound2 = loadSound('80s.mp3');
   mySound3 = loadSound('Slave ships.mp3');
 }
function setup() {
  createCanvas(windowWidth, windowHeight);
  
}
function draw() { 
  
  
 image(img1, 100, 400);
 image(img2, 700, 100, 500, 300);
 image(img3, 775, 126, 350, 209);
 image(img4, 775, 126, 350, 209);
 image(img5, 775, 126, 350, 209);
 image(img6, 775, 126, 350, 209);
 image(img7, 775, 126, 350, 209);
 image(img8, 775, 126, 350, 209);
 image(img9, 775, 126, 350, 209);
 image(img10, 775, 126, 350, 209);
 image(img11, 775, 126, 350, 209);
 image(img12, 775, 126, 350, 209);
 image(img13, 775, 126, 350, 209);
 image(img14, 775, 126, 350, 209);
  
  fill(0);
  fill(220);
  fill(0);
  rect(270 +17*6, 702, 17, 15); 
  rect(270 +17*7, 702, 17, 15);
   rect(270 +17*8, 702, 17, 15);
    fill(220);
   fill (0);
   rect(270 +17*15, 702, 34, 15);
  rect(270 +17*17, 702, 34, 15);
}
function mousePressed() {
  if(mouseX > 270 && 
     mouseX < 304 &&
     mouseY > 702 &&
     mouseY < 717){
    
    if(mySound1.isPlaying() == true){
      mySound1.pause();
    }else{
      
   		mySound1.play();
      mySound2.pause();
       mySound3.pause();
      
      songTitle = createElement('p','Loyalty-Kendrick');
    }
    
  } else {
    if(mouseX > 304 && 
     mouseX < 368 &&
     mouseY > 702 &&
z     mouseY < 717){
    
  
    if(mySound2.isPlaying() == true){
      mySound2.pause();
    }else{
      
   		mySound2.play();
      mySound1.pause();
      mySound3.pause();
      
      songTitle = createElement('p','Biking-Frank Ocean');
      songTitle.html("new stuff");
    }
     }else{
    
      if(mouseX > 338 && 
     mouseX < 372 &&
     mouseY > 702 &&
     mouseY < 717){
        
    if(mySound3.isPlaying() == true){
      mySound3.pause();
    }else{
      
   		mySound3.play();
      mySound1.pause();
      mySound2.pause();
      
     songTitle = createElement('p','Young Dumb and Broke-Khalid');
      
      if (frameCount < 100) {
	      image(img0, 0, 0);
      } else if (frameCount < 200) {
       	 image(img0, 0, 0);
      }
     } 
     }
  }
    }
  }
var img0;
var img1;
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;
var img8;
var img9;
var img10;
var img11;
var img12;
var img13;
var img14;
var img15;
var button;
function preload() {
  img1 = loadImage("Boomb.png");
  img2 = loadImage("tv211.png");
  img3 = loadImage("Crack.jpeg");
  img4 = loadImage("crack2.jpg");
  img5 = loadImage("Oscar Grant.jpeg");
  img6 = loadImage("Emmett Till.jpg");
  img7 = loadImage("boombox1111.png");
  img8 = loadImage("Trayvon Martin.jpg");
  img9 = loadImage("Riot1.jpeg");
  img10 = loadImage("Riot2.jpeg");
  img11 = loadImage("black2.jpeg");
  img12 = loadImage("Black1.jpeg");
  img13 = loadImage("Black3.jpeg");
  img14 = loadImage("Tupac.png");
  
   soundFormats('mp3', 'ogg');
   mySound1 = loadSound('Gov.mp3'); 
   mySound2 = loadSound('80s.mp3');
 }
function setup() {
  createCanvas(windowWidth, windowHeight);
  
}
function draw() { 
  
  
 image(img1, 100, 400);
 image(img2, 700, 100, 500, 300);
 image(img3, 775, 126, 350, 209);
 image(img4, 775, 126, 350, 209);
 image(img5, 775, 126, 350, 209);
 image(img6, 775, 126, 350, 209);
 image(img7, 775, 126, 350, 209);
 image(img8, 775, 126, 350, 209);
 image(img9, 775, 126, 350, 209);
 image(img10, 775, 126, 350, 209);
 image(img11, 775, 126, 350, 209);
 image(img12, 775, 126, 350, 209);
 image(img13, 775, 126, 350, 209);
 image(img14, 775, 126, 350, 209);
  
  fill(0);
  rect(270-34, 702, 34, 15);
  fill(220);
  fill(0);
  rect(270 +17*6, 702, 17, 15); 
  rect(270 +17*7, 702, 17, 15);
   rect(270 +17*8, 702, 17, 15);
    fill(220);
   fill (0);
   rect(270 +17*15, 702, 34, 15);
  rect(270 +17*17, 702, 34, 15);
}
function mousePressed() {
  if(mouseX > 270 && 
     mouseX < 304 &&
     mouseY > 702 &&
     mouseY < 717){
    
    if(mySound1.isPlaying() == true){
      mySound1.pause();
    }else{
      
   		mySound1.play();
      mySound2.pause();
      
      songTitle = createElement('p','Loyalty-Kendrick');
    }
    
  } else {
    if(mouseX > 304 && 
     mouseX < 368 &&
     mouseY > 702 &&
     mouseY < 717){
    
  
    if(mySound2.isPlaying() == true){
      mySound2.pause();
    }else{
      
   		mySound2.play();
      mySound1.pause();
      
      songTitle = createElement('p','Biking-Frank Ocean');
    }
    }
  }
  }
    
    
        
      
      
var img0;
var img1;
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;
var img8;
var img9;
var img10;
var img11;
var img12;
var img13;
var img14;
var img15;
var button;
function preload() {
  img1 = loadImage("Boomb.png");
  img2 = loadImage("tv211.png");
  img3 = loadImage("Crack.jpeg");
  img4 = loadImage("crack2.jpg");
  img5 = loadImage("Oscar Grant.jpeg");
  img6 = loadImage("Emmett Till.jpg");
  img7 = loadImage("boombox1111.png");
  img8 = loadImage("Trayvon Martin.jpg");
  img9 = loadImage("Riot1.jpeg");
  img10 = loadImage("Riot2.jpeg");
  img11 = loadImage("black2.jpeg");
  img12 = loadImage("Black1.jpeg");
  img13 = loadImage("Black3.jpeg");
  img14 = loadImage("Tupac.png");
  
 }
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  button = createButton();
  button.position(170, 700);
}
function draw() { 
  
 image(img1, 100, 400);
 image(img2, 700, 100, 500, 300);
 image(img3, 775, 126, 350, 209);
 image(img4, 775, 126, 350, 209);
 image(img5, 775, 126, 350, 209);
 image(img6, 775, 126, 350, 209);
 image(img7, 775, 126, 350, 209);
 image(img8, 775, 126, 350, 209);
 image(img9, 775, 126, 350, 209);
 image(img10, 775, 126, 350, 209);
 image(img11, 775, 126, 350, 209);
 image(img12, 775, 126, 350, 209);
 image(img13, 775, 126, 350, 209);
 image(img14, 775, 126, 350, 209);
  
}
var img1;
var v;
var f;
function preload() {
  img1 = loadImage("boombox1.jpg");
  img2 = loadImage("tv21.jpg");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  
 v = createVector(10.0, 20.0, 30.0);
 f = v.array();
  
}
function draw() { 
    image(img1, 100, 500);
   image(img2, 700, 100, 500, 300);
}
var img;
function preload() {
}
function setup() {
  image(img, 100, 100, 200, 200);
}
function draw() { 
   
}
var img1;
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;
var img8;
var img9;
var img10;
var img11;
var img12;
var img13;
var img14;
function preload() {
  img1 = loadImage("boombox1111.png");
  img2 = loadImage("tv211.png");
  img3 = loadImage("Crack.jpeg");
  img4 = loadImage("crack2.jpg");
  img5 = loadImage("Oscar Grant.jpeg");
  img6 = loadImage("Emmett Till.jpg");
  img7 = loadImage("boombox1111.png");
  img8 = loadImage("Trayvon Martin.jpg");
  img9 = loadImage("Riot1.jpeg");
  img10 = loadImage("Riot2.jpeg");
  img11 = loadImage("black2.jpeg");
  img12 = loadImage("Black1.jpeg");
  img13 = loadImage("Black3.jpeg");
  img14 = loadImage("Tupac.png");
  
 }
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() { 
 image(img1, 100, 500);
 image(img2, 700, 100, 500, 300);
 image(img3, 775, 126, 350, 209);
 image(img4, 775, 126, 350, 209);
 image(img5, 775, 126, 350, 209);
 image(img6, 775, 126, 350, 209);
 image(img7, 775, 126, 350, 209);
 image(img8, 775, 126, 350, 209);
 image(img9, 775, 126, 350, 209);
 image(img10, 775, 126, 350, 209);
 image(img11, 775, 126, 350, 209);
 image(img12, 775, 126, 350, 209);
 image(img13, 775, 126, 350, 209);
 image(img14, 775, 126, 350, 209);
  
 var cars = ["Every day we fight the system", 
             "And I want everybody to view my autopsySo you can see exactly where the government had shot me"
             , "BMW"];
}
function setup() { 
  createCanvas(1000, 800);
} 
function draw() { 
  background(220);
	
	
	rect(100, 400, 340, 180);
	rect(165, 340, 20, 60);
	
}var sleep;
var eyew = 16;
var eyeh = 16;
var pointerX = 12;
var pointerY = 260;
    
function preload() {
	sleep = loadJSON("Sleep.json");
}
  
function setup() { 
  createCanvas(600, 600);
  
  
 	button1 = createButton('tuesday');
  button1.position(25, 10);
  button1.mousePressed( function(){
    adjustEyesSize("tue", 10);
  });
  
  button2 = createButton('wednesday');
  button2.position(25, 50);
  button2.mousePressed( function(){
    adjustEyesSize("wed", 50);
  });
  
  button3 = createButton('thursday');
  button3.position(25, 90);
  button3.mousePressed( function(){
    adjustEyesSize("thu", 90);
   });
  button4 = createButton('friday');
  button4.position(25, 130);
  button4.mousePressed( function(){
    adjustEyesSize("fri", 130);
   });
  
  button5 = createButton('saturday');
  button5.position(25, 170);
  button5.mousePressed( function(){
    adjustEyesSize("thu", 170);
   });
  
  button6 = createButton('sunday');
  button6.position(25, 210);
  button6.mousePressed( function(){
    adjustEyesSize("sun", 210);
   });
  
  button7 = createButton('monday');
  button7.position(25, 250);
}
function adjustEyesSize(day, buttonHeight){
 	let hours = sleep[day];
  eyew = 2*hours;
  eyeh = 2*hours;
  pointerY = buttonHeight + 10;
}
function draw() { 
  background(220);
  
  fill("brown");
  ellipse (200,200, 100, 100);
  
   
  line (170,190, 190,190);
  line (210,190, 230,190);
  
  line (180, 220, 220, 220);
  
  fill("blue");
  rect(150, 250, 100, 100);
  fill(255);
  triangle(190, 250, 200, 270, 210, 250);
  
  
  
  
  
  
  
  
  
    
 
  ellipse (180,200, eyew, eyeh);
  ellipse (220,200, eyew, eyeh);
	fill(0);
  ellipse(pointerX, pointerY, 10, 10);
}var sleep;
var eyew = 16;
var eyeh = 16;
var pointerX = 12;
var pointerY = 260;
    
function preload() {
	sleep = loadJSON("Sleep.json");
}
  
function setup() { 
  createCanvas(600, 600);
  
  
 	button1 = createButton('tuesday');
  button1.position(25, 10);
  button1.mousePressed( function(){
    adjustEyesSize("tue", 10);
  });
  
  button2 = createButton('wednesday');
  button2.position(25, 50);
  button2.mousePressed( function(){
    adjustEyesSize("wed", 50);
  });
  
  button3 = createButton('thursday');
  button3.position(25, 90);
  button3.mousePressed( function(){
    adjustEyesSize("thu", 90);
   });
  button4 = createButton('friday');
  button4.position(25, 130);
  button4.mousePressed( function(){
    adjustEyesSize("fri", 130);
   });
  
  button5 = createButton('saturday');
  button5.position(25, 170);
  button5.mousePressed( function(){
    adjustEyesSize("thu", 170);
   });
  
  button6 = createButton('sunday');
  button6.position(25, 210);
  button6.mousePressed( function(){
    adjustEyesSize("sun", 210);
   });
  
  button7 = createButton('monday');
  button7.position(25, 250);
}
function adjustEyesSize(day, buttonHeight){
 	let hours = sleep[day];
  eyew = 2*hours;
  eyeh = 2*hours;
  pointerY = buttonHeight + 10;
}
  
  
   
function draw() { 
  background(220);
  
  fill("brown");
  ellipse (200,200, 100, 100);
  
   
  line (170,190, 190,190);
  line (210,190, 230,190);
  
  line (180, 220, 220, 220);
  
  fill("blue");
  rect(150, 250, 100, 100);
  fill(255);
  triangle(190, 250, 200, 270, 210, 250);
  
  
  
  
  
  
  
  
  
    
 
  ellipse (180,200, eyew, eyeh);
  ellipse (220,200, eyew, eyeh);
	fill(0);
  ellipse(pointerX, pointerY, 10, 10);
}var wave;
var freq = 440;
let buttonValue = 0;
var slider;
var playing = false;
function setup() {
  createCanvas(100, 100);
  
 
  
  wave = new p5.Oscillator();
  
  
  slider = createSlider(100,1200,440);
  
  wave.setType('sine');
  wave.start();
  wave.freq(freq);
  wave.amp(0);
  
  button = createButton('play/pause');
  button.mousePressed(toggle);
}
function draw() {
  wave.freq(freq);
  if (playing) {
    background(255, 0, 255);
  }else{
    background(51);
  }
} 
  
function toggle() {
  if (!playing) {
    wave.start();
    wave.amp(0.5, 1);
    wave.freq(440);
    playing = true;
  } else {
    wave.stop();
    wave.amp(0.5);
    playing = false;
  }    
}
  if (data.length > 0) {
    console.log(data)
    let d1 = int(data.split(",")[0]);
    if(int(data.split(",")[1]) != buttonValue ){
       buttonValue = !buttonValue;
      	toggle();
    }
    freq = int(map(d1, 100, 600, 100, 1200));
  }
}var wave;
var freq = 440;
let buttonValue = 0;
var slider;
var playing = false;
function setup() {
  createCanvas(100, 100);
  
 
  
  wave = new p5.Oscillator();
  
  
  slider = createSlider(100,1200,440);
  
  wave.setType('sine');
  wave.start();
  wave.freq(freq);
  wave.amp(0);
  
  button = createButton('play/pause');
  button.mousePressed(toggle);
}
function draw() {
  wave.freq(freq);
  if (playing) {
    background(255, 0, 255);
  }else{
    background(51);
  }
} 
  
function toggle() {
  if (!playing) {
    wave.start();
    wave.amp(0.5, 1);
    wave.freq(440);
    playing = true;
  } else {
    wave.stop();
    wave.amp(0.5);
    playing = false;
  }    
}
  if (data.length > 0) {
    console.log(data)
    let d1 = int(data.split(",")[0]);
    if(int(data.split(",")[1]) != buttonValue ){
       buttonValue = !buttonValue;
      	toggle();
    }
    freq = int(map(d1, 100, 600, 100, 1200));
  }
}var sleep;
var eyecolor;
function preload() {
sleep = loadJSON("Sleep.json");
}
  
function preload() {
eyecolor = loadJSON("eyecolor.json");
}
function setup() { 
  createCanvas(600, 600);
 button1 = createButton('tuesday');
  button1.position(10, 10);
  
  button2 = createButton('wednesday');
  button2.position(10, 50);
  
  button3 = createButton('thursday');
  button3.position(10, 90);
  
  button4 = createButton('friday');
  button4.position(10, 130);
  
    button5 = createButton('saturday');
  button5.position(10, 170);
  
    button6 = createButton('sunday');
  button6.position(10, 210);
}
  
  
   
function draw() { 
  background(220);
  
  fill("brown");
  ellipse (200,200, 100, 100);
  
   
  line (170,190, 190,190);
  line (210,190, 230,190);
  
  line (180, 220, 220, 220);
  
  fill("blue");
  rect(150, 250, 100, 100);
  fill(255);
  triangle(190, 250, 200, 270, 210, 250);
  
  
  
  
  
  
  
  
  
    
 
  ellipse (180,200, 20, 10);
  ellipse (220,200, 20, 10);
    if (button1 == mousePressPressed) {
  fill(255)
}
  
  
var wave;
var button;
var slider;
var playing = false;
function setup() {
  createCanvas(100, 100);
  
  wave = new p5.Oscillator();
  
  slider = createSlider(100,1200,440);
  
  wave.setType('sine');
  wave.start();
  wave.freq(440);
  wave.amp(0);
  
  button = createButton('play/pause');
  button.mousePressed(toggle);
}
function draw() {
  wave.freq(slider.value());
  if (playing) {
    background(255, 0, 255);
  }else{
    background(51);
  }
} 
  
function toggle() {
  if (!playing) {
    wave.start();
    wave.amp(0.5, 1);
    wave.freq(440);
    playing = true;
  } else {
    wave.stop();
    wave.amp(0.5);
    playing = false;
  }      
}
  
  if (data.length > 0) {
    var sensors = split(data, ",");
    console.log(sensors);
    xPos = int(sensors[0]);
    yPos = int(sensors[1]);
  }
}
var wave;
var button;
var slider;
var playing = false;
function setup() {
  createCanvas(100, 100);
  
  wave = new p5.Oscillator();
  
  slider = createSlider(100,1200,440);
  
  wave.setType('sine');
  wave.start();
  wave.freq(440);
  wave.amp(0);
  
  button = createButton('play/pause');
}
function draw() {
  wave.freq(slider.value());
  if (playing) {
    background(255, 0, 255);
  }else{
    background(51);
  }
} 
  
  
  if (data.length > 0) {
    var sensors = split(data, ",");
    console.log("hi");
  }
}
    
    
var wave;
var button;
var slider;
var playing = false;
function setup() {
  createCanvas(100, 100);
  
  
  wave = new p5.Oscillator();
  
  
  wave.setType('sine');
  wave.start();
  wave.freq(440);
  wave.amp(0);
  
  button = createButton('play/pause');
  button.mousePressed(toggle);
}
    
function draw() {
  wave.freq();
  if (playing) {
    background(255, 0, 255);
  }else{
    background(51);
  }
}
 
  
  if (data.length > 0) {
    var sensors = split(data, ",");
    sens1 = int(sensors[0]);
     volume = map(sens1, 0, 1023, 0.5, 1);
    sens2 = int(sensors[1]);
    var lights = map(sens2, 0, 1023, 0, 255);
  }
}
function toggle () {
if (!playing) {
wave.start();
wave.amp(0.5,1);
wave.freq(440);
playing = true;
} else {
wave.stop ();
playing = false;
}
}
function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('DNA.mp3'); 
  mySound2 = loadSound('Biking.mp3');
  mySound3 = loadSound('YDB.mp3');
}
  
function setup() { 
  createCanvas(windowWidth, windowHeight);
  
  
  
  
} 
function draw() { 
  background(190,0,0);
  
  
  strokeWeight(50);
  fill(200);
  rect(width/2-100, height/2-100, 200, 150);
  
  strokeWeight(50);
  fill(180);
  rect(width/2-95, height/2-95, 190, 140);
  
  fill(50);
  rect (300, 400, 75, 110);
  fill(75);
  rect(330, 420, 20, 20);
  rect(330, 450, 20, 20);
  rect(330, 480, 20, 20);
  
  noStroke();
    fill(0);
  ellipse(width/2, height/2-25, 120, 120);
  
 strokeWeight(2);
  fill (100);
  ellipse (width/2, height/2-25, 100, 100); 
  
   strokeWeight(20);
  fill (80);
  ellipse (width/2, height/2-25, 80, 80); 
  
  strokeWeight(20);
  fill (60);
  ellipse (width/2, height/2-25, 60, 60); 
  
  strokeWeight(20);
  fill (0);
  ellipse (width/2, height/2-25, 40, 40); 
  
}
  
function mousePressed() {
  if(mouseX > 330 && 
     mouseX < 350 &&
     mouseY > 420 &&
     mouseY < 440){
    
    if(mySound.isPlaying() == true){
      mySound.pause();
    }else{
      
   		mySound.play();
      mySound2.pause();
      mySound3.pause();
      
      songTitle = createElement('p','Loyalty-Kendrick');
    }
    
  } else {
    if(mouseX > 330 && 
     mouseX < 350 &&
     mouseY > 450 &&
     mouseY < 470){
    
  
    if(mySound2.isPlaying() == true){
      mySound2.pause();
    }else{
      
   		mySound2.play();
      mySound.pause();
      mySound3.pause();
      songTitle = createElement('p','Biking-Frank Ocean');
    }
    }else{
    
      if(mouseX > 330 && 
     mouseX < 350 &&
     mouseY > 480 &&
     mouseY < 500){
        
    if(mySound3.isPlaying() == true){
      mySound3.pause();
    }else{
      
   		mySound3.play();
      mySound.pause();
      mySound2.pause();
      
      songTitle = createElement('p','Young Dumb and Broke-Khalid');
      } 
    }
  }
    }
}
  let vol = 1.0;
let mySound;
let mySound1;
function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('DNA.mp3'); 
  mySound2 = loadSound('Biking.mp3');
  mySound3 = loadSound('YDB.mp3');
}
  
function setup() { 
  createCanvas(600, 600);
  
  
  
  
mySound.play();
} 
function draw() { 
  background(190,0,0);
  
  if (!mySound.isPlaying()){
    mySound.play();
  }
  mySound.setVolume(vol);
  
  strokeWeight(50);
  fill(200);
  rect(width/2-100, height/2-100, 200, 150);
  
  strokeWeight(50);
  fill(180);
  rect(width/2-95, height/2-95, 190, 140);
  
  fill(50);
  rect (300, 400, 75, 110);
  fill(75);
  rect(330, 420, 20, 20);
  rect(330, 450, 20, 20);
  rect(330, 480, 20, 20);
  
  noStroke();
    fill(0);
  ellipse(width/2, height/2-25, 120, 120);
  
 strokeWeight(2);
  fill (100);
  ellipse (width/2, height/2-25, 100, 100); 
  
   strokeWeight(20);
  fill (80);
  ellipse (width/2, height/2-25, 80, 80); 
  
  strokeWeight(20);
  fill (60);
  ellipse (width/2, height/2-25, 60, 60); 
  
  strokeWeight(20);
  fill (0);
  ellipse (width/2, height/2-25, 40, 40); 
  
  
  if (mouseIsPresses) {
    play 
  }
  
  function gotData(){
  vol = map(inData, 0, 255, 0, 1);
  OR
  
  if (inData > 0){
  	vol = map(inData, 0, 1023, 0, 1);
  }
   
}
  
function mousePressed() {
  if(mouseX > 330 && 
     mouseX < 350 &&
     mouseY > 420 &&
     mouseY < 440){
    
    if(mySound.isPlaying() == true){
      mySound.pause();
    }else{
      
   		mySound.play();
      mySound2.pause();
      mySound3.pause();
      
      songTitle = createElement('p','Loyalty-Kendrick');
    }
    
  } else {
    if(mouseX > 330 && 
     mouseX < 350 &&
     mouseY > 450 &&
     mouseY < 470){
    
  
    if(mySound2.isPlaying() == true){
      mySound2.pause();
    }else{
      
   		mySound2.play();
      mySound.pause();
      mySound3.pause();
      songTitle = createElement('p','Biking-Frank Ocean');
    }
    }else{
    
      if(mouseX > 330 && 
     mouseX < 350 &&
     mouseY > 480 &&
     mouseY < 500){
        
    if(mySound3.isPlaying() == true){
      mySound3.pause();
    }else{
      
   		mySound3.play();
      mySound.pause();
      mySound2.pause();
      
      songTitle = createElement('p','Young Dumb and Broke-Khalid');
      } 
    }
  }
    }
}
let vol = 1.0;
let mySound;
function preload() {
  mySound = loadSound('Khalid_ydb.mp3');
}
function setup() {
  createCanvas(600, 600);
 
  
 
}
function draw() {
  background(220);
  
ellipse(200, 200, 100,100);
  
  if (!mySound.isPlaying()){
    mySound.play();
  }
  mySound.setVolume(vol);  
}
function gotData(){
  
  vol = map(inData, 0, 255, 0, 1);
  
  
}var whatever;
function setup() { 
  
  whatever = select("#theimage");
  console.log(whatever);
  
  whatever.mouseOver(mouseOverWhatever);
  whatever.mouseOut(mouseOutWhatever);
 	whatever.position(0,0);
  
  var cvs = createCanvas(whatever.width, whatever.height);
	cvs.position(0,0);  
} 
function mouseOverWhatever() {
  var thebody = select("body");
  thebody.style('background','purple');
}
function mouseOutWhatever() {
  var thebody = select("body");
  thebody.style('background','white');
  console.log("Here");
}
function mousePressed() {
 	whatever.hide(); 
}
function mouseReleased() {
 	whatever.show(); 
}
function draw() { 
  ellipse(mouseX, mouseY, 10, 10);
var inData;
var bg = 0;
var col = 255;
var nums = '';
function setup() { 
  createCanvas(600, 600);
  
} 
function draw() { 
  background(255);
   ellipse(nums[0],nums[1],200, 200);
  textSize(10);
  text(nums, 400,500);
}
 for (var i = 0; i < portList.length; i++) {
 console.log(i + " " + portList[i]);
 }
}
  
  
  var vals = inData.split(',');
	if (vals.length > 1){
    nums = vals;
  }
function setup() {
  createCanvas(400, 300);
 
}
function serverConnected() {
}
 
function portOpen() {
}
 
}
 
}
 
function portClose() {
}
 
 for (var i = 0; i < portList.length; i++) {
 }
}
function draw() {
  background(0);
  fill(255);
  text("sensor value:" + inData, 30, 30)
 power = {
x: 0,
y: 14,
w: 20,
h: 8
};
var sliderStart = 75;
var sliderEnd = 115;
var offsetX = 0; 
function gameboy () {
   
fill(219,217,208);
noStroke();
rect(30, 20, 400, 650, 20, 20, 100, 20);
stroke(180);
strokeWeight(5);
line(32,50,426,50);
line(70,22,70,50);
line(390,22,390,50);
	
fill(85,87,120);
noStroke();
rect(70, 70, 320, 250, 20, 20, 60, 20);
  
fill(0,0, 0);
rect(130, 100, 200, 180);
  
fill(17,28,118);
textSize(18);
textFont("Arial");
textStyle("bold");
text("Nintendo", 70, 350);
fill(17,28,118);
textSize(24);
textFont("Arial");
textStyle("italic");
text("GAME BOY", 152, 350);
fill(17,28,118);
textSize(8);
textFont("Arial");
textStyle("bold");
text("TM", 280, 350);
push();
translate(70, 400);
rotate(-44.4);
stroke(140);
strokeWeight(1);
noFill();
rect(98, 250, 10, 70, 20, 20, 20, 20);
rect(122, 250, 10, 70, 20, 20, 20, 20);
rect(146, 250, 10, 70, 20, 20, 20, 20);
rect(168, 250, 10, 70, 20, 20, 20, 20);
rect(192, 250, 10, 70, 20, 20, 20, 20);
rect(216, 250, 10, 70, 20, 20, 20, 20);
  
fill(140);
noStroke();
textSize(15);
rect(0, 150, 60, 12, 20, 20, 20, 20);
rect(60, 190, 60, 12, 20, 20, 20, 20);
fill(17,28,118);
text("SELECT", 2, 178);
text("START", 66, 218);
fill(140, 27, 79);
ellipse(260,150, 50, 50);
ellipse(190,150, 50, 50);
fill(17,28,118);
text("A", 255,190);
text("B", 185,192);
pop();
  
fill(0);
  rect( 70, 425, 85, 35, 5, 5, 5, 5);
 rect( 95, 400, 35, 85, 5, 5, 5, 5);
  fill(140)
rect(power.x, power.y, power.w, power.h);
  var b = map(power.x,sliderStart,sliderEnd-power.w,0,255);
}
function powerbutton() {
  fill(140)
rect(power.x, power.y, power.w, power.h);
  var b = map(power.x,sliderStart,sliderEnd-power.w,0,255);
}
function poweron () {
  if (power.x >= 95) {
    
fill(0,frameCount%260, 0);
var onScreen= rect(130, 100, 200, 180);
		
		image(img, 130, 100, 200, 180);
		
    } 
  
  
  if (dragging) {
    power.x = mouseX + offsetX;
  }
  power.x = constrain(power.x, sliderStart, sliderEnd-power.w);
}
function mousePressed() {
  if (mouseX > power.x && mouseX < power.x + power.w && mouseY > power.y && mouseY < power.y + power.h) {
    dragging = true;
    offsetX = power.x-mouseX;
  }
}
function mouseReleased() {
  dragging = false;
}
function setup() { 
  createCanvas(700, 700);
  
  
  
  
} 
function draw() { 
background(255);
gameboy(); 
powerbutton();    
poweron(); 
  
}
 power = {
 x: 0,
y: 14,
w: 20,
h: 8
};
var sliderStart = 75;
var sliderEnd = 115;
var offsetX = 0; 
function setup() { 
  createCanvas(700, 700);
  
  
  
  
} 
function draw() { 
background(255);
  
    
  
fill(219,217,208);
noStroke();
rect(30, 20, 400, 650, 20, 20, 100, 20);
stroke(180);
strokeWeight(5);
line(32,50,426,50);
line(70,22,70,50);
line(390,22,390,50);
	
fill(85,87,120);
noStroke();
rect(70, 70, 320, 250, 20, 20, 60, 20);
  
fill(0,0, 0);
rect(130, 100, 200, 180);
  
fill(17,28,118);
textSize(18);
textFont("Arial");
textStyle("bold");
text("Nintendo", 70, 350);
fill(17,28,118);
textSize(24);
textFont("Arial");
textStyle("italic");
text("GAME BOY", 152, 350);
fill(17,28,118);
textSize(8);
textFont("Arial");
textStyle("bold");
text("TM", 280, 350);
push();
translate(70, 400);
rotate(-44.4);
stroke(140);
strokeWeight(1);
noFill();
rect(98, 250, 10, 70, 20, 20, 20, 20);
rect(122, 250, 10, 70, 20, 20, 20, 20);
rect(146, 250, 10, 70, 20, 20, 20, 20);
rect(168, 250, 10, 70, 20, 20, 20, 20);
rect(192, 250, 10, 70, 20, 20, 20, 20);
rect(216, 250, 10, 70, 20, 20, 20, 20);
  
fill(140);
noStroke();
textSize(15);
rect(0, 150, 60, 12, 20, 20, 20, 20);
rect(60, 190, 60, 12, 20, 20, 20, 20);
fill(17,28,118);
text("SELECT", 2, 178);
text("START", 66, 218);
fill(140, 27, 79);
ellipse(260,150, 50, 50);
ellipse(190,150, 50, 50);
fill(17,28,118);
text("A", 255,190);
text("B", 185,192);
pop();
  
fill(0);
  rect( 70, 425, 85, 35, 5, 5, 5, 5);
 rect( 95, 400, 35, 85, 5, 5, 5, 5);
  
  
  if (power.x >= 95) {
    
fill(0,frameCount%260, 0);
var onScreen= rect(130, 100, 200, 180);
		
		image(img, 130, 100, 200, 180);
		
    } 
  
  
  if (dragging) {
    power.x = mouseX + offsetX;
  }
  power.x = constrain(power.x, sliderStart, sliderEnd-power.w);
  fill(140)
rect(power.x, power.y, power.w, power.h);
  var b = map(power.x,sliderStart,sliderEnd-power.w,0,255);
}
function mousePressed() {
  if (mouseX > power.x && mouseX < power.x + power.w && mouseY > power.y && mouseY < power.y + power.h) {
    dragging = true;
    offsetX = power.x-mouseX;
  }
}
function mouseReleased() {
  dragging = false;
var x = 0;
var y = 10;
var w = 10;
var h = 10;
var sliderStart = 100;
var sliderEnd = 130;
var offsetX = 0; 
function setup() { 
  createCanvas(700, 700);
  
  
  
  
  
  
} 
function draw() { 
background(255);
  
    
  
fill(219,217,208);
noStroke();
rect(30, 20, 400, 650, 20, 20, 100, 20);
stroke(180);
strokeWeight(5);
line(32,50,426,50);
line(70,22,70,50);
line(390,22,390,50);
fill(219,217,208);
line(100,19,115,19);
	
fill(85,87,120);
noStroke();
rect(70, 70, 320, 250, 20, 20, 60, 20);
  
  
fill(17,28,118);
textSize(18);
textFont("Arial");
textStyle("bold");
text("Nintendo", 70, 350);
fill(17,28,118);
textSize(24);
textFont("Arial");
textStyle("italic");
text("GAME BOY", 152, 350);
fill(17,28,118);
textSize(8);
textFont("Arial");
textStyle("bold");
text("TM", 280, 350);
push();
translate(70, 400);
rotate(-44.4);
stroke(140);
strokeWeight(1);
noFill();
rect(98, 250, 10, 70, 20, 20, 20, 20);
rect(122, 250, 10, 70, 20, 20, 20, 20);
rect(146, 250, 10, 70, 20, 20, 20, 20);
rect(168, 250, 10, 70, 20, 20, 20, 20);
rect(192, 250, 10, 70, 20, 20, 20, 20);
rect(216, 250, 10, 70, 20, 20, 20, 20);
  
fill(140);
noStroke();
textSize(15);
rect(0, 150, 60, 12, 20, 20, 20, 20);
rect(60, 190, 60, 12, 20, 20, 20, 20);
fill(17,28,118);
text("SELECT", 2, 178);
text("START", 66, 218);
fill(140, 27, 79);
ellipse(260,150, 50, 50);
ellipse(190,150, 50, 50);
fill(17,28,118);
text("A", 255,190);
text("B", 185,192);
pop();
  
fill(0);
  rect( 70, 425, 85, 35, 5, 5, 5, 5);
 rect( 95, 400, 35, 85, 5, 5, 5, 5);
  if ( sliderEnd == 130mouseIsPressed && ) {
		image(img, 130, 100, 200, 180);
    } 
  
  
    strokeWeight(1);
    stroke(0);
    stroke(44);
    strokeWeight(2);
    rect(0, -100, 150, 100);
 
  
  
  if (dragging) {
    x = mouseX + offsetX;
  }
  x = constrain(x, sliderStart, sliderEnd-w);
  stroke(0);
  stroke(0);
  if (dragging) {
    fill (50);
  } else {
    fill(175);
  }
  rect(x, y, w, h);
  var b = map(x,sliderStart,sliderEnd-w,0,255);
}
function mousePressed() {
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    offsetX = x-mouseX;
  }
}
function mouseReleased() {
  dragging = false;
  
var x = 0;
var y = 10;
var w = 10;
var h = 10;
var sliderStart = 100;
var sliderEnd = 130;
var offsetX = 0; 
function setup() { 
  createCanvas(700, 700);
  
  
  
  
  
} 
function draw() { 
background(255);
  
    
  
fill(219,217,208);
noStroke();
rect(30, 20, 400, 650, 20, 20, 100, 20);
stroke(180);
strokeWeight(5);
line(32,50,426,50);
line(70,22,70,50);
line(390,22,390,50);
fill(219,217,208);
line(100,19,115,19);
	
fill(85,87,120);
noStroke();
rect(70, 70, 320, 250, 20, 20, 60, 20);
  
  
fill(17,28,118);
textSize(18);
textFont("Arial");
textStyle("bold");
text("Nintendo", 70, 350);
fill(17,28,118);
textSize(24);
textFont("Arial");
textStyle("italic");
text("GAME BOY", 152, 350);
fill(17,28,118);
textSize(8);
textFont("Arial");
textStyle("bold");
text("TM", 280, 350);
push();
translate(70, 400);
rotate(-44.4);
stroke(140);
strokeWeight(1);
noFill();
rect(98, 250, 10, 70, 20, 20, 20, 20);
rect(122, 250, 10, 70, 20, 20, 20, 20);
rect(146, 250, 10, 70, 20, 20, 20, 20);
rect(168, 250, 10, 70, 20, 20, 20, 20);
rect(192, 250, 10, 70, 20, 20, 20, 20);
rect(216, 250, 10, 70, 20, 20, 20, 20);
  
fill(140);
noStroke();
textSize(15);
rect(0, 150, 60, 12, 20, 20, 20, 20);
rect(60, 190, 60, 12, 20, 20, 20, 20);
fill(17,28,118);
text("SELECT", 2, 178);
text("START", 66, 218);
fill(140, 27, 79);
ellipse(260,150, 50, 50);
ellipse(190,150, 50, 50);
fill(17,28,118);
text("A", 255,190);
text("B", 185,192);
pop();
  
fill(0);
  rect( 70, 425, 85, 35, 5, 5, 5, 5);
 rect( 95, 400, 35, 85, 5, 5, 5, 5);
  if ( mouseIsPressed && sliderEnd == 130) {
fill(0,frameCount%260, 0);
  rect(130, 100, 200, 180);
    } 
  
  
    strokeWeight(1);
    stroke(0);
    stroke(44);
    strokeWeight(2);
    rect(0, -100, 150, 100);
  
  
  if (dragging) {
    x = mouseX + offsetX;
  }
  x = constrain(x, sliderStart, sliderEnd-w);
  stroke(0);
  stroke(0);
  if (dragging) {
    fill (50);
  } else {
    fill(175);
  }
  rect(x, y, w, h);
  var b = map(x,sliderStart,sliderEnd-w,0,255);
}
function mousePressed() {
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    offsetX = x-mouseX;
  }
}
function mouseReleased() {
  dragging = false;
  
  
  
var x = 100;
var y = 25;
var w = 10;
var h = 50;
var sliderStart = 100;
var sliderEnd = 400;
var offsetX = 0; 
function setup() { 
  createCanvas(700, 700);
  
  
  
  
  
} 
function draw() { 
background(255);
  
    
  
fill(219,217,208);
noStroke();
rect(30, 20, 400, 650, 20, 20, 100, 20);
stroke(180);
strokeWeight(5);
line(32,50,426,50);
line(70,22,70,50);
line(390,22,390,50);
fill(219,217,208);
line(100,19,115,19);
	
fill(85,87,120);
noStroke();
rect(70, 70, 320, 250, 20, 20, 60, 20);
fill(17,28,118);
textSize(18);
textFont("Arial");
textStyle("bold");
text("Nintendo", 70, 350);
fill(17,28,118);
textSize(24);
textFont("Arial");
textStyle("italic");
text("GAME BOY", 152, 350);
fill(17,28,118);
textSize(8);
textFont("Arial");
textStyle("bold");
text("TM", 280, 350);
push();
translate(70, 400);
rotate(-44.4);
stroke(140);
strokeWeight(1);
noFill();
rect(98, 250, 10, 70, 20, 20, 20, 20);
rect(122, 250, 10, 70, 20, 20, 20, 20);
rect(146, 250, 10, 70, 20, 20, 20, 20);
rect(168, 250, 10, 70, 20, 20, 20, 20);
rect(192, 250, 10, 70, 20, 20, 20, 20);
rect(216, 250, 10, 70, 20, 20, 20, 20);
  
fill(140);
noStroke();
textSize(15);
rect(0, 150, 60, 12, 20, 20, 20, 20);
rect(60, 190, 60, 12, 20, 20, 20, 20);
fill(17,28,118);
text("SELECT", 2, 178);
text("START", 66, 218);
fill(140, 27, 79);
ellipse(260,150, 50, 50);
ellipse(190,150, 50, 50);
fill(17,28,118);
text("A", 255,190);
text("B", 185,192);
pop();
  
fill(0);
  rect( 70, 425, 85, 35, 5, 5, 5, 5);
 rect( 95, 400, 35, 85, 5, 5, 5, 5);
  
  
  
    strokeWeight(1);
    stroke(0);
    stroke(44);
    strokeWeight(2);
    rect(0, -100, 150, 100);
  
  
  if (dragging) {
    x = mouseX + offsetX;
  }
  x = constrain(x, sliderStart, sliderEnd-w);
  stroke(0);
  stroke(0);
  if (dragging) {
    fill (50);
  } else {
    fill(175);
  }
  rect(x, y, w, h);
  var b = map(x,sliderStart,sliderEnd-w,0,255);
  fill(b);
  rect(sliderStart, 100, sliderEnd-sliderStart, 150);
}
function mousePressed() {
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    offsetX = x-mouseX;
  }
}
function mouseReleased() {
  dragging = false;
  
}var x = 400;
var y = 150;
var r = 20;
function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
  background(220);
	
	
	fill(255);
rect (200, 100, 250, 250);
	
	fill (250);
	rect( 215, 115, 220, 220);
	
	fill (0);
ellipse (x, y, r*2, r*2);
	
	
	
var numCircles = 0;
function setup() { 
  createCanvas(900, 400);
} 
function mousePressed() {
 numCircles++;
}
 
function draw() { 
  background(220);
  
  
  
  
  var numCirclesDrawn = 0;
  for (var x = 0; x < width; x=x+50) {
    for (var y = 0; y < height; y=y+50) {
      if (numCirclesDrawn < numCircles) {
        fill(x, y,frameCount%256);
      ellipse(x, y, 50, 50);
        numCirclesDrawn++;
    }
  }
 }
}var ball= {
  x:0,
  y:0,
  d:0,
  xspeed:10,
  yspeed:10
}
var button = {
  x:0,
  y:0,
  d:100
}
function setup() { 
  createCanvas(400, 400);
  ball.x = random(0, width);
  ball.y = random(0, height);
  ball.d = random(10, 30);
  
  button.x = width - button.d;
  button.y = width - button.d;
} 
function draw() { 
  background(220);
  
  rect(button.x, button.y, button.d, button.d);
  
  if (mouseIsPressed && 
      mouseX > button.x && mouseX < button.x + button.d &&
     mouseY > button.y && mouseY < button.y + button.d)
  {
    fill(0); } 
  else {
    fill(255);
  }
  
  
  ellipse(ball.x, ball.y, ball.d);
  
  ball.x = ball.x +ball.xspeed;
  
  if (ball.x > width || ball.x < 0){
    ball.xspeed*= -1;
  }
  ball.y = ball.y + ball.yspeed;
  
  if (ball.y > width || ball.y < 0){
    ball.yspeed*= -1;
  }
}
  
  
  var ball= {
  x:0,
  y:0,
  d:0,
  xspeed:10,
  yspeed:10
  
}
function setup() { 
  createCanvas(400, 400);
  ball.x = random(0, width);
  ball.y = random(0, height);
  ball.d = random(10, 30);
  
} 
function draw() { 
  background(220);
  ellipse(ball.x, ball.y, ball.d);
  
  ball.x = ball.x +ball.xspeed;
  
  if (ball.x > width || ball.x < 0){
    ball.xspeed*= -1;
  }
  ball.y = ball.y + ball.yspeed;
  
  if (ball.y > width || ball.y < 0){
    ball.yspeed*= -1;
  }
}
  
  
  var x = 50;
var speed = 3
function changeBackground() {
  col= mouseX
  background(col);
  col= map(mouseX,20,600,0,255);
}
function circles() {
  
}
function setup() { 
  createCanvas(600, 600);
  frameRate(7);
} 
function draw() { 
  
  changeBackground();
 
  col= mouseY
  stroke(col);
  strokeWeight(34);
  col = map(mouseY,20,600,0,255);
  fill(random (0,200),0,0);
  ellipse(random(0,600),random(0,600),100,100);
  
  col= mouseY
  stroke(col);
  strokeWeight(34);
  col = map(mouseY,20,600,0,255);
  
  fill(random (0,200),0,0);
  ellipse(random(0,600),random(0,600),50,50);
  
  col= mouseY
  stroke(col);
  strokeWeight(34);
  col = map(mouseY,20,600,0,255);
  fill(random (0,200),0,0);
  
}var x = 50;
var speed = 3
function setup() { 
  createCanvas(600, 600);
} 
function draw() { 
  
  col= mouseX
  background(col);
  Col= map(mouseX,20,600,0,255);
  col= mouseY
  stroke(col);
  strokeWeight(34);
  col = map(mouseY,20,600,0,255);
  fill(random (0,200),0,0);
  ellipse(x,200,random(0,600),random (0,600));
  if (x>width) {
    speed = -3
  }
  x=x+speed
  if (x<0) {
    speed = 3
    
 
  }
}var x=0;
var speed = 3;
function setup() { 
  createCanvas(600, 400);
  
} 
function draw() { 
  
  col= mouseX
  col= map(mouseX,0,600,0,255);
  background(col);
  stroke (255);
  strokeWeight(4);
  
fill (random(0,200));
  ellipse(x,200,100,100);
 
  if(x > width) { 
    speed = -3;
  }
  if(x < 0) { 
    speed = +3;
  }
x=x+speed;
}
  text("*", random(50,50), random(50,50));
  text("*", random(50,50), random(50,50));
  text("*", random(50,50), random(50,50));
  text("*", random(50,50), random(50,50));
  
var x=0;
var speed = 3;
function setup() { 
  createCanvas(600, 400);
  
} 
function draw() { 
  
  col= mouseX
  col= map(mouseX,0,600,0,255);
  background(col);
  stroke (255);
  strokeWeight(4);
  
fill (random(0,200));
  ellipse(x,200,100,100);
 
  if(x > width) { 
    speed = -3;
  }
  if(x < 0) { 
    speed = +3;
  }
x=x+speed;
}
  text("*", random(50,50), random(50,50));
  text("*", random(50,50), random(50,50));
  text("*", random(50,50), random(50,50));
  text("*", random(50,50), random(50,50));
  
function setup() { 
  createCanvas(displayWidth, displayHeight);
} 
var x, y;
function draw() { 
  background(220);
  rect(x,y,20,50);
  
    
  fill(random(255,0,0));
  rect(50, 50, 52, 52);
  fill(mouseX);
  rect(75, 75, 52, 52);
  
	rect(mouseX, mouseY,20,50);
  rect(random(0,width),random(0,height),20,50);
}
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  
  
  
  push();
  translate(100,100);
  rotate(radians(-45));
  line(-100,0,100,0);
  pop();
}function setup() { 
  createCanvas(600, 600);
} 
function draw() { 
background(255);
  
  fill(255,0,0);
       ellipse(200,200,100,100);
  line(100,250,200,350);
	line(200,250,200,350);
	line(100,250,200,250);
	line(250,100,150,50);
  line(200,150,250,100);  
  
  
  
}