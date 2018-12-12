let expertstate = 1;
let novicestate = 1;
function preload() {
  expertE = loadImage('E_image2.png');
  expertEart = loadImage('E_decisions2.png');
  expertElow = loadImage('E_lowLev2.png');
  expertD = loadImage('D.png');
  expertDart = loadImage('D_art.png');
  noviceG = loadImage('G_image.png');
  noviceGart = loadImage('G_decisions.png');
  noviceGlow = loadImage('G_lowLev.png');
  
  Rarrow = loadImage('rightarrow.png');
  Larrow = loadImage('leftarrow.png');
}
function setup() {
  createCanvas(1366, 768);
  background(255);
}
function draw() {
  background(255);
  display();
  fill(255, 89, 0);
  noStroke();
  ellipse(400, 300, 30, 30);
  fill(115, 194, 251);
  noStroke();
  ellipse(400, 350, 30, 30);
  image(Rarrow, 250, 200);
  
  image(Larrow, 75, 200);
  
  
  rollOver();
  fill(0);
  textAlign(CENTER);
  text("expert", 200, 220);
  
  textAlign(CENTER);
  text("novice", 600, 220);
  
  
}
function eEArtRegions() {
  noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse(179, 113, 62, 62);
  ellipse(245, 160, 50, 50);
}
function nGArtRegions(){
   noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse(697, 81, 55, 55);
  
} 
function rollOver() {
  let d = dist(mouseX, mouseY, 179, 113);
  let d2 = dist(mouseX, mouseY, 245, 160);
  let d3 = dist(mouseX, mouseY, 697, 81);
  
  if (d < 62 && expertstate == 1.1) {
    fill(0);
    textAlign(LEFT);
    text("Now I’m going back to the bowl, trying to capture the value. I'm just marking in all of the dark regions through lines and crosshatching.",100, 300, 250, 200);
  } else if(d2 < 50 && expertstate ==1.1){
   fill(0);
  textAlign(LEFT);
   text("Going to make some lines a little bit more loose, so it doesn't look to strangely cropped. And also the center of the drawing is pretty messy so I'm trying to keep that feeling.", 100, 300, 250, 200);
  }else if(d3 < 55 && novicestate ==1.1){
   fill(0);
    textAlign(LEFT);
    text("Now I'm going to try to color things in. So the main color I see is red, because the perfume bottle is red and the mug is red. So I'm going to choose red.", 550, 300, 250, 200);
  }
}
function mousePressed() {
  if (pN <40) {
    if (expertstate < 2) {
      expertstate += 1;
    }
  }
  if (pB < 40) {
    if (expertstate > 1.2) {
      expertstate -= 1;
    }
  }
  if (pA < 30) {
    if (expertstate == 1 || expertstate == 1.2) {
      expertstate = 1.1;
    }
    if (expertstate == 2) {
      expertstate = 2.1;
    }
    if (novicestate == 1 || novicestate == 1.2) {
      novicestate = 1.1;
    }
    
  }
  if (pL < 30) {
    if (expertstate == 1 || expertstate == 1.1) {
      expertstate = 1.2;
    }
     if (novicestate == 1 || novicestate == 1.1) {
      novicestate = 1.2;
    }
  }
  if (pA > 30 && expertstate == 1.1) {
    expertstate = 1;
  }
  if (pA > 30 && expertstate == 2.1) {
    expertstate = 2;
  }
  if (pL > 30 && expertstate == 1.2) {
    expertstate = 1;
  }
  if (pL > 30 && expertstate == 2.2) {
    expertstate = 2;
  }
  
  if (pA > 30 && novicestate == 1.1) {
    novicestate = 1;
  }
  if (pL > 30 && novicestate == 1.2) {
    novicestate = 1;
  }
}
function display() {
  if (expertstate == 1) {
    image(expertE, 0, 0);
  }
  if (expertstate == 1.1) {
    image(expertEart, 0, 0);
    eEArtRegions();
  }
  if (expertstate == 1.2) {
    image(expertElow, 0, 0);
  }
  if (expertstate == 2 ) {
    image(expertD, 0, 0);
  }
  if (expertstate == 2.1) {
    image(expertDart, 0, 0);
  }
  
  
  if(novicestate == 1){
   image(noviceG, 450, 0); 
  }
  
  if(novicestate == 1.1){
   image(noviceGart, 450, 0); 
  }
  
   if(novicestate == 1.2){
   image(noviceGlow, 450, 0); 
  }
}let expertstate = 1;
let novicestate = 1;
function preload() {
  expertE = loadImage('E_image2.png');
  expertEart = loadImage('E_decisions2.png');
  expertElow = loadImage('E_lowLev2.png');
  expertD = loadImage('D.png');
  expertDart = loadImage('D_art-1.png');
  noviceG = loadImage('G_image.png');
  noviceGart = loadImage('G_decisions.png');
  noviceGlow = loadImage('G_lowLev.png');
  Rarrow = loadImage('rightarrow.png');
  Larrow = loadImage('leftarrow.png');
}
function setup() {
  createCanvas(800, 400);
  background(255);
}
function draw() {
  background(255);
  display();
  fill(255, 89, 0);
  noStroke();
  ellipse(400, 300, 30, 30);
  fill(115, 194, 251);
  noStroke();
  ellipse(400, 350, 30, 30);
  rollOver();
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text("EXPERT", 180, 220);
  textAlign(CENTER);
  text("NOVICE", 600, 220);
}
function eEArtRegions() {
  noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse(179, 113, 62, 62);
  ellipse(245, 160, 50, 50);
}
function nGArtRegions() {
  noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse(697, 81, 55, 55);
  ellipse(501, 145, 40);
}
function eElowRegions() {
  noFill();
  noStroke();
  ellipseMode(CENTER);
}
function nGlowRegions() {
  noFill();
  noStroke();
  ellipseMode(CENTER);
}
function rollOver() {
  let d = dist(mouseX, mouseY, 179, 113);
  let d2 = dist(mouseX, mouseY, 245, 160);
  let d3 = dist(mouseX, mouseY, 697, 81);
  let d4 = dist(mouseX, mouseY, 165, 95);
  let d5 = dist(mouseX, mouseY, 152, 155);
  let d6 = dist(mouseX, mouseY, 501, 145);
  let d7 = dist(mouseX, mouseY, 615, 135);
  let d8 = dist(mouseX, mouseY, 550, 150);
  if (d < 62 && expertstate == 1.1) {
    fill(255, 89, 0);
    text("Artistic Decisions", 400 , 280);
		fill(0);
    textAlign(LEFT);
    text("Now I’m going back to the bowl, trying to capture the value. I'm just marking in all of the dark regions through lines and crosshatching.", 50, 270, 265, 200);
  } else if (d2 < 50 && expertstate == 1.1) {
    fill(255, 89, 0);
    text("Artistic Decisions", 400 , 280);
    fill(0);
    textAlign(LEFT);
    text("Going to make some lines a little bit more loose, so it doesn't look to strangely cropped. And also the center of the drawing is pretty messy so I'm trying to keep that feeling.", 50, 270, 265, 200);
  } else if (d3 < 55 && novicestate == 1.1) {
    fill(255, 89, 0);
    text("Artistic Decisions", 400 , 280);
    fill(0);
    textAlign(LEFT);
    text("Now I'm going to try to color things in. So the main color I see is red, because the perfume bottle is red and the mug is red. So I'm going to choose red.", 480, 270, 265, 200);
  } else if (d4 < 40 && expertstate == 1.2) {
    fill(120, 198, 255);
  	text("Lower level features", 400, 280);
    fill(0);
    textAlign(LEFT);
    text("I'm just looking at the edges and how close they are to the other objects.", 50, 270, 265, 200);
  } else if (d5 < 50 && expertstate == 1.2) {
    fill(120, 198, 255);
  	text("Lower level features", 400, 280);
    fill(0);
    textAlign(LEFT);
    text("Alright now I'll go back in and try to get the value in. So I'm just looking to see where all the dark areas are and try to get it as accurate as I can.", 50, 270, 265, 200);
  } else if (d6 < 40 && novicestate == 1.1) {
    fill(255, 89, 0);
    text("Artistic Decisions", 400 , 280);
    fill(0);
    textAlign(LEFT);
    text("And now I'm just checking my work...granted this isn’t the best drawing ever, but this gets the point across.", 480, 270, 265, 200);
  } else if (d7 < 65 && novicestate == 1.2) {
    fill(120, 198, 255);
  	text("Lower level features", 400, 280);
    fill(0);
    textAlign(LEFT);
    text("So some sections due to the lighting look darker, so I’m just going to see if I can even incorporate that, let's see how good my drawing skills go.", 480, 270, 265, 200);
  } else if (d8 < 40 && novicestate == 1.2) {
    fill(120, 198, 255);
  	text("Lower level features", 400, 280);
    fill(0);
    textAlign(LEFT);
    text("There’s a black line underneath the perfume bottle. So I'm just trying to look as I go. The black line continues on underneath the bowl, then it goes up to the mug.", 480, 270, 265, 200);
  }
}
function mousePressed() {
  if (pA < 30) {
    if (expertstate == 1 || expertstate == 1.2) {
      expertstate = 1.1;
    }
    if (expertstate == 2) {
      expertstate = 2.1;
    }
    if (novicestate == 1 || novicestate == 1.2) {
      novicestate = 1.1;
    }
  }
  if (pL < 30) {
    if (expertstate == 1 || expertstate == 1.1) {
      expertstate = 1.2;
    }
    if (novicestate == 1 || novicestate == 1.1) {
      novicestate = 1.2;
    }
  }
  if (pA > 30 && expertstate == 1.1) {
    expertstate = 1;
  }
  if (pA > 30 && expertstate == 2.1) {
    expertstate = 2;
  }
  if (pL > 30 && expertstate == 1.2) {
    expertstate = 1;
  }
  if (pL > 30 && expertstate == 2.2) {
    expertstate = 2;
  }
  if (pA > 30 && novicestate == 1.1) {
    novicestate = 1;
  }
  if (pL > 30 && novicestate == 1.2) {
    novicestate = 1;
  }
}
function display() {
  if (expertstate == 1) {
    image(expertE, 0, 0);
  }
  if (expertstate == 1.1) {
    image(expertEart, 0, 0);
  }
  if (expertstate == 1.2) {
    image(expertElow, 0, 0);
  }
  if (expertstate == 2) {
    image(expertD, 0, 0);
  }
  if (expertstate == 2.1) {
    image(expertDart, 0, 0);
  }
  if (novicestate == 1) {
    image(noviceG, 450, 0);
  }
  if (novicestate == 1.1) {
    image(noviceGart, 450, 0);
  }
  if (novicestate == 1.2) {
    image(noviceGlow, 450, 0);
  }
}let expertstate = 1;
let novicestate = 1;
function preload() {
  expertE = loadImage('E_image2.png');
  expertEart = loadImage('E_decisions2.png');
  expertElow = loadImage('E_lowLev2.png');
  expertD = loadImage('D.png');
  expertDart = loadImage('D_art.png');
  noviceG = loadImage('G_image.png');
  noviceGart = loadImage('G_decisions.png');
  noviceGlow = loadImage('G_lowLev.png');
  
  Rarrow = loadImage('rightarrow.png');
  Larrow = loadImage('leftarrow.png');
}
function setup() {
  createCanvas(800, 400);
  background(255);
}
function draw() {
  background(255);
  display();
  fill(255, 89, 0);
  noStroke();
  ellipse(400, 300, 30, 30);
  fill(115, 194, 251);
  noStroke();
  ellipse(400, 350, 30, 30);
  image(Rarrow, 250, 200);
  image(Larrow, 75, 200);
  
  
  rollOver();
  
  textAlign(CENTER);
  text("expert", 200, 220);
  
  textAlign(CENTER);
  text("novice", 600, 220);
  
  
}
function eEArtRegions() {
  noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse(179, 113, 62, 62);
  ellipse(245, 160, 50, 50);
}
function nGArtRegions(){
   noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse(697, 81, 55, 55);
  
} 
function rollOver() {
  let d = dist(mouseX, mouseY, 179, 113);
  let d2 = dist(mouseX, mouseY, 245, 160);
  let d3 = dist(mouseX, mouseY, 697, 81);
  
  if (d < 62 && expertstate == 1.1) {
    fill(0);
    textAlign(LEFT);
    text("Now I’m going back to the bowl, trying to capture the value. I'm just marking in all of the dark regions through lines and crosshatching.",180, 375, 250, 200);
  } else if(d2 < 50 && expertstate ==1.1){
   fill(0);
  textAlign(LEFT);
   text("Going to make some lines a little bit more loose, so it doesn't look to strangely cropped. And also the center of the drawing is pretty messy so I'm trying to keep that feeling.", 180, 375, 250, 200);
  }else if(d3 < 55 && novicestate ==1.1){
   fill(0);
    textAlign(LEFT);
    text("Now I'm going to try to color things in. So the main color I see is red, because the perfume bottle is red and the mug is red. So I'm going to choose red.", 600, 375, 250, 200);
  }
}
function mousePressed() {
  if (pN <40) {
    if (expertstate < 2) {
      expertstate += 1;
    }
  }
  if (pB < 20) {
    if (expertstate > 1.2) {
      expertstate -= 1;
    }
  }
  if (pA < 30) {
    if (expertstate == 1 || expertstate == 1.2) {
      expertstate = 1.1;
    }
    if (expertstate == 2) {
      expertstate = 2.1;
    }
    if (novicestate == 1 || novicestate == 1.2) {
      novicestate = 1.1;
    }
    
  }
  if (pL < 30) {
    if (expertstate == 1 || expertstate == 1.1) {
      expertstate = 1.2;
    }
     if (novicestate == 1 || novicestate == 1.1) {
      novicestate = 1.2;
    }
  }
  if (pA > 30 && expertstate == 1.1) {
    expertstate = 1;
  }
  if (pA > 30 && expertstate == 2.1) {
    expertstate = 2;
  }
  if (pL > 30 && expertstate == 1.2) {
    expertstate = 1;
  }
  if (pL > 30 && expertstate == 2.2) {
    expertstate = 2;
  }
  
  if (pA > 30 && novicestate == 1.1) {
    novicestate = 1;
  }
  if (pL > 30 && novicestate == 1.2) {
    novicestate = 1;
  }
}
function display() {
  if (expertstate == 1) {
    image(expertE, 0, 0);
  }
  if (expertstate == 1.1) {
    image(expertEart, 0, 0);
    eEArtRegions();
  }
  if (expertstate == 1.2) {
    image(expertElow, 0, 0);
  }
  if (expertstate == 2 ) {
    image(expertD, 0, 0);
  }
  if (expertstate == 2.1) {
    image(expertDart, 0, 0);
  }
  
  
  if(novicestate == 1){
   image(noviceG, 450, 0); 
  }
  
  if(novicestate == 1.1){
   image(noviceGart, 450, 0); 
  }
  
   if(novicestate == 1.2){
   image(noviceGlow, 450, 0); 
  }
}var playing = false;
var fingers;
var button;
function setup() {
  fingers = createVideo('E_fast_small.m4v');
  button = createButton('play');
}
function toggleVid() {
  if (playing) {
    fingers.pause();
    button.html('play');
  } else {
    fingers.loop();
    button.html('pause');
  }
  playing = !playing;
}let expertstate = 1;
let novicestate = 1;
let Evid;
let button;
function preload() {
  expertE = loadImage('E_image2.png');
  expertEart = loadImage('E_decisions2.png');
  expertElow = loadImage('E_lowLev2.png');
  expertD = loadImage('D.png');
  expertDart = loadImage('D_art.png');
  noviceG = loadImage('G_image.png');
  noviceGart = loadImage('G_decisions.png');
  noviceGlow = loadImage('G_lowLev.png');
}
function setup() {
  createCanvas(800, 400);
  background(255);
  Evid = createVideo('E_fast_small.m4v');
  button = createButton('play');
}
function draw() {
  background(255);
  display();
  fill(255, 89, 0);
  noStroke();
  ellipse(200, 300, 30, 30);
  fill(115, 194, 251);
  noStroke();
  ellipse(200, 350, 30, 30);
  fill(0);
  rectMode(CENTER);
  rect(350, 250, 20, 20);
  fill(0);
  rectMode(CENTER);
  rect(50, 250, 20, 20);
  rollOver();
}
function regionBorders() {
  noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse(179, 113, 62, 62);
}
function rollOver() {
  let d = dist(mouseX, mouseY, 179, 113);
  if (d < 62 && expertstate == 1.1) {
    fill(0);
    text("Now I’m going back to the bowl, trying to capture the value.", 10, 350);
  }
}
function mousePressed() {
  if (pN < 20) {
    if (expertstate < 2) {
      expertstate += 1;
    }
  }
  if (pB < 20) {
    if (expertstate > 1.2) {
      expertstate -= 1;
    }
  }
  if (pA < 30) {
    if (expertstate == 1 || expertstate == 1.2) {
      expertstate = 1.1;
    }
    if (expertstate == 2) {
      expertstate = 2.1;
    }
    if (novicestate == 1 || novicestate == 1.2) {
      novicestate = 1.1;
    }
    
  }
  if (pL < 30) {
    if (expertstate == 1 || expertstate == 1.1) {
      expertstate = 1.2;
    }
     if (novicestate == 1 || novicestate == 1.1) {
      novicestate = 1.2;
    }
  }
  if (pA > 30 && expertstate == 1.1) {
    expertstate = 1;
  }
  if (pA > 30 && expertstate == 2.1) {
    expertstate = 2;
  }
  if (pL > 30 && expertstate == 1.2) {
    expertstate = 1;
  }
  if (pL > 30 && expertstate == 2.2) {
    expertstate = 2;
  }
  
  if (pA > 30 && novicestate == 1.1) {
    novicestate = 1;
  }
  if (pL > 30 && novicestate == 1.2) {
    novicestate = 1;
  }
}
function display() {
  if (expertstate == 1) {
    image(expertE, 0, 0);
  }
  if (expertstate == 1.1) {
    image(expertEart, 0, 0);
    regionBorders();
  }
  if (expertstate == 1.2) {
    image(expertElow, 0, 0);
  }
  if (expertstate == 2 ) {
    image(expertD, 0, 0);
  }
  if (expertstate == 2.1) {
    image(expertDart, 0, 0);
  }
  
  
  if(novicestate == 1){
   image(noviceG, 450, 0); 
  }
  
  if(novicestate == 1.1){
   image(noviceGart, 450, 0); 
  }
  
   if(novicestate == 1.2){
   image(noviceGlow, 450, 0); 
  }
}let expertstate = 1;
let novicestate = 1;
function preload() {
  expertE = loadImage('E_image2.png');
  expertEart = loadImage('E_decisions2.png');
  expertElow = loadImage('E_lowLev2.png');
  expertD = loadImage('D.png');
  expertDart = loadImage('D_art.png');
  noviceG = loadImage('G_image.png');
  noviceGart = loadImage('G_decisions.png');
  noviceGlow = loadImage('G_lowLev.png');
}
function setup() {
  createCanvas(800, 400);
  background(255);
}
function draw() {
  background(255);
  display();
  fill(255, 89, 0);
  noStroke();
  ellipse(200, 300, 30, 30);
  fill(115, 194, 251);
  noStroke();
  ellipse(200, 350, 30, 30);
  fill(0);
  rectMode(CENTER);
  rect(350, 250, 20, 20);
  fill(0);
  rectMode(CENTER);
  rect(50, 250, 20, 20);
  rollOver();
}
function regionBorders() {
  noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse(179, 113, 62, 62);
}
function rollOver() {
  let d = dist(mouseX, mouseY, 179, 113);
  if (d < 62 && expertstate == 1.1) {
    fill(0);
    text("Now I’m going back to the bowl, trying to capture the value.", 10, 350);
  }
}
function mousePressed() {
  if (pN < 20) {
    if (expertstate < 2) {
      expertstate += 1;
    }
  }
  if (pB < 20) {
    if (expertstate > 1.2) {
      expertstate -= 1;
    }
  }
  if (pA < 30) {
    if (expertstate == 1 || expertstate == 1.2) {
      expertstate = 1.1;
    }
    if (expertstate == 2) {
      expertstate = 2.1;
    }
    if (novicestate == 1 || novicestate == 1.2) {
      novicestate = 1.1;
    }
    
  }
  if (pL < 30) {
    if (expertstate == 1 || expertstate == 1.1) {
      expertstate = 1.2;
    }
     if (novicestate == 1 || novicestate == 1.1) {
      novicestate = 1.2;
    }
  }
  if (pA > 30 && expertstate == 1.1) {
    expertstate = 1;
  }
  if (pA > 30 && expertstate == 2.1) {
    expertstate = 2;
  }
  if (pL > 30 && expertstate == 1.2) {
    expertstate = 1;
  }
  if (pL > 30 && expertstate == 2.2) {
    expertstate = 2;
  }
  
  if (pA > 30 && novicestate == 1.1) {
    novicestate = 1;
  }
  if (pL > 30 && novicestate == 1.2) {
    novicestate = 1;
  }
}
function display() {
  if (expertstate == 1) {
    image(expertE, 0, 0);
  }
  if (expertstate == 1.1) {
    image(expertEart, 0, 0);
    regionBorders();
  }
  if (expertstate == 1.2) {
    image(expertElow, 0, 0);
  }
  if (expertstate == 2 ) {
    image(expertD, 0, 0);
  }
  if (expertstate == 2.1) {
    image(expertDart, 0, 0);
  }
  
  
  if(novicestate == 1){
   image(noviceG, 450, 0); 
  }
  
  if(novicestate == 1.1){
   image(noviceGart, 450, 0); 
  }
  
   if(novicestate == 1.2){
   image(noviceGlow, 450, 0); 
  }
}let state = 1;
function preload() {
  expertE = loadImage('E_image2.png');
  expertEart = loadImage('E_decisions2.png');
  expertElow = loadImage('E_lowLev2.png');
  expertD = loadImage('D.png');
  expertDart = loadImage('D_art.png');
}
function setup() {
  createCanvas(400, 400);
  background(255);
}
function draw() {
  background(255);
  display();
  fill(255, 89, 0);
  noStroke();
  ellipse(200, 300, 30, 30);
  fill(115, 194, 251);
  noStroke();
  ellipse(200, 350, 30, 30);
  fill(0);
  rectMode(CENTER);
  rect(350, 250, 20, 20);
  fill(0);
  rectMode(CENTER);
  rect(50, 250, 20, 20);
  rollOver();
}
function regionBorders() {
  noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse(179, 113, 62, 62);
}
function rollOver() {
  let d = dist(mouseX, mouseY, 179, 113);
  if (d < 62 && state == 1.1) {
    fill(0);
    text("Now I’m going back to the bowl, trying to capture the value.", 10, 350);
  }
}
function mousePressed() {
  if (pN < 20) {
    if (state < 2) {
      state += 1;
    }
  }
  if (pB < 20) {
    if (state > 1.2) {
      state -= 1;
    }
  }
  if (pA < 30) {
    if (state == 1 || state == 1.2) {
      state = 1.1;
    }
    if (state == 2) {
      state = 2.1;
    }
  }
  if (pL < 30) {
    if (state == 1 || state == 1.1) {
      state = 1.2;
    }
  }
  if (pA > 30 && state == 1.1) {
    state = 1;
  }
  if (pA > 30 && state == 2.1) {
    state = 2;
  }
  if (pL > 30 && state == 1.2) {
    state = 1;
  }
  if (pL > 30 && state == 2.2) {
    state = 2;
  }
}
function display() {
  if (state == 1) {
    image(expertE, 0, 0);
  }
  if (state == 1.1) {
    image(expertEart, 0, 0);
    regionBorders();
  }
  if (state == 1.2) {
    image(expertElow, 0, 0);
  }
  if (state == 2) {
    image(expertD, 0, 0);
  }
  if (state == 2.1) {
    image(expertDart, 0, 0);
  }
}let state = 1;
function preload() {
  expertE = loadImage('E_image2.png');
  expertEart = loadImage('E_decisions2.png');
  expertElow = loadImage('E_lowLev2.png');
  expertD = loadImage('D.png');
  expertDart = loadImage('D_art.png');
}
function setup() {
  createCanvas(400, 400);
  background(255);
}
function draw() {
  background(255);
  display();
  fill(255, 89, 0);
  noStroke();
  ellipse(200, 300, 30, 30);
  fill(0);
  rectMode(CENTER);
  rect(350, 250, 20, 20);
  fill(0);
  rectMode(CENTER);
  rect(50, 250, 20, 20);
  console.log(state);
}
function displayArt() {
  image(expertEart, 0, 0);
}
function mousePressed() {
  let pB = dist(mouseX, mouseY, 50, 250);
  if (pN < 20) {
    state += 1;
  }
  if (pB < 20) {
    state -= 1;
  }
  if (pA < 30) {
    if (state == 1) {
      state = 1.1;
    }
    if (state == 2) {
      state = 2.1;
    }
  }
  if (pA > 30 && state == 1.1) {
    state = 1;
  }
  if (pA > 30 && state == 2.1) {
    state = 2;
  }
}
function display() {
  if (state == 1) {
    image(expertE, 0, 0);
  }
  if (state == 1.1) {
    image(expertEart, 0, 0);
  }
  if (state == 2) {
    image(expertD, 0, 0);
  }
  if (state == 2.1) {
    image(expertDart, 0, 0);
  }
}let buttonA;
let buttonL;
let state = 0;
function preload() {
  expertE = loadImage('E_image2.png');
  expertEart = loadImage('E_decisions2.png');
  expertElow = loadImage('E_lowLev2.png');
}
function setup() {
  createCanvas(400, 400);
  background(255);
  
  image(expertE, 0, 0);
  
  fill(255, 89, 0);
  noStroke();
  ellipse(200, 300, 30, 30);
  
  fill(115, 194, 251);
  noStroke();
  ellipse(200, 350, 30, 30);
  
  
  
} 
function draw(){
  
  background(255);
  
  reload();
  
  fill(255, 89, 0);
  noStroke();
  ellipse(200, 300, 30, 30);
  
  fill(115, 194, 251);
  noStroke();
  ellipse(200, 350, 30, 30);
  
  
  noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse (179, 113, 62, 62);
  rollOver(); 
}
function displayArt() {
  image(expertEart, 0, 0);
}
function displayLowLev(){
  image(expertElow, 0, 0);
}
function rollOver(){
  let d = dist(mouseX, mouseY, 179, 113);
  if (d < 62 && state == 1) {
    fill(0);
    textSize(16);
  	text("Now I’m going back to the bowl, trying to capture the value.", 0, 250, 400, 400);
   } 
}
function mousePressed(){
  let pA = dist(mouseX, mouseY, 200, 300);
  let pL = dist(mouseX, mouseY, 200, 350);
  if (pA < 30) {
    displayArt();
    state = 1;
    } 
  else if(pL < 30){
    displayLowLev();
    state = 2;
  }
  else{
      image(expertE, 0, 0);
  } 
}
function reload(){
 if(state == 1){
 displayArt();
 }
 if(state == 2){
  displayLowLev(); 
 }
 if(state == 0){
   image(expertE, 0, 0);
 }
}
let buttonA;
let buttonL;
let state;
function preload() {
  expertE = loadImage('E_image2.png');
  expertEart = loadImage('E_decisions2.png');
  expertElow = loadImage('E_lowLev2.png');
  noviceG = loadImage('G_image.png');
  noviceGart = loadImage('G_decisions.png');
  noviceGlow = loadImage('G_lowLev.png');
}
function setup() {
  createCanvas(800, 400);
  background(255);
  image(expertE, 0, 0);
  image(noviceG, 450, 0);
  fill(255, 89, 0);
  noStroke();
  buttonA = ellipse(400, 300, 30, 30);
  
  fill(115, 194, 251);
  noStroke();
  buttonL = ellipse(400, 350, 30, 30);
  
  
  
} 
function draw(){
  noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse (179, 113, 62, 62);
  rollOver(); 
}
function displayArt() {
  image(expertEart, 0, 0);
  image(noviceGart, 450, 0);
}
function displayLowLev(){
  image(expertElow, 0, 0);
  image(noviceGlow, 450, 0);
}
function rollOver(){
  let d = dist(mouseX, mouseY, 179, 113);
  if (d < 62 && state == 1) {
  	text("Now I’m going back to the bowl, trying to capture the value.", 0, 250);
    console.log("mouse is over bowl");
  }
}
function mousePressed(){
  let pA = dist(mouseX, mouseY, 400, 300);
  let pL = dist(mouseX, mouseY, 400, 350);
  if (pA < 30) {
    displayArt();
    state = 1;
    } 
  else if(pL < 30){
    displayLowLev();
    state = 2;
  }
  else{
      image(expertE, 0, 0);
    	image(noviceG, 450, 0);
  } 
}
  
let buttonA;
let buttonL;
let state;
function preload() {
  expertE = loadImage('E_image2.png');
  expertEart = loadImage('E_decisions2.png');
  expertElow = loadImage('E_lowLev2.png');
}
function setup() {
  createCanvas(400, 400);
  background(255);
  image(expertE, 0, 0);
  
  fill(255, 89, 0);
  noStroke();
  buttonA = ellipse(200, 300, 30, 30);
  
  fill(115, 194, 251);
  noStroke();
  ellipse(200, 350, 30, 30);
  
  
  
} 
function draw(){
  noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse (179, 113, 62, 62);
  rollOver(); 
}
function displayArt() {
  image(expertEart, 0, 0);
}
function displayLowLev(){
  image(expertElow, 0, 0);
}
function rollOver(){
  let d = dist(mouseX, mouseY, 179, 113);
  if (d < 62 && state == 1) {
    fill(0);
    textSize(16);
  	text("Now I’m going back to the bowl, trying to capture the value.", 0, 250, 400, 400);
    console.log("mouse is over bowl");
  } else{
    fill(0);
    text(" ");
  }
}
function mousePressed(){
  let pA = dist(mouseX, mouseY, 200, 300);
  let pL = dist(mouseX, mouseY, 200, 350);
  if (pA < 30) {
    displayArt();
    state = 1;
    } 
  else if(pL < 30){
    displayLowLev();
    state = 2;
  }
  else{
      image(expertE, 0, 0);
  } 
}
  
let buttonA;
let buttonL;
let state;
function preload() {
  expertE = loadImage('E_image2.png');
  expertEart = loadImage('E_decisions2.png');
  expertElow = loadImage('E_lowLev2.png');
}
function setup() {
  createCanvas(400, 400);
  background(255);
  image(expertE, 0, 0);
  
  fill(255, 89, 0);
  noStroke();
  buttonA = ellipse(200, 300, 30, 30);
  
  fill(115, 194, 251);
  noStroke();
  ellipse(200, 350, 30, 30);
  
  
  
} 
function draw(){
  noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse (179, 113, 62, 62);
  rollOver(); 
}
function displayArt() {
  image(expertEart, 0, 0);
}
function displayLowLev(){
  image(expertElow, 0, 0);
}
function rollOver(){
  let d = dist(mouseX, mouseY, 179, 113);
  if (d < 62 && state == 1) {
    text("Now I’m going back to the bowl, trying to capture the value.", 0, 300);
    console.log("mouse is over bowl");
  }
}
function mousePressed(){
  let pA = dist(mouseX, mouseY, 200, 300);
  let pL = dist(mouseX, mouseY, 200, 350);
  if (pA < 30) {
    displayArt();
    state = 1;
    } 
  else if(pL < 30){
    displayLowLev();
    state = 2;
  }
  else{
      image(expertE, 0, 0);
  } 
}
  
let buttonA;
let buttonL;
function preload() {
  expertE = loadImage('E_image2.png');
  expertEart = loadImage('E_decisions2.png');
  expertElow = loadImage('E_lowLev2.png');
}
function setup() {
  createCanvas(400, 400);
  background(255);
  image(expertE, 0, 0);
  
  fill(255, 89, 0);
  noStroke();
  buttonA = ellipse(200, 300, 30, 30);
  
  fill(115, 194, 251);
  noStroke();
  ellipse(200, 350, 30, 30);
  
  
  
} 
function draw(){
  noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse (179, 113, 62, 62);
  rollOver(); 
}
function displayArt() {
  image(expertEart, 0, 0);
}
function displayLowLev(){
  image(expertElow, 0, 0);
}
function rollOver(){
  let d = dist(mouseX, mouseY, 179, 113);
  if (d < 62) {
    console.log("mouse is over bowl");
    text("Now I’m going back to the bowl, trying to capture the value.", 0, 250);
  }
}
function mousePressed(){
  let pA = dist(mouseX, mouseY, 200, 300);
  let pL = dist(mouseX, mouseY, 200, 350);
  if (pA < 30) {
    displayArt();
    } 
  else if(pL < 30){
    displayLowLev();
  }
  else{
      image(expertE, 0, 0);
  }
  
}
  
function setup() {
  createCanvas(400, 400);
  background(220);
}
function draw() {
  
  ellipse(100, 200, 50, 50);
  let d = dist(mouseX, mouseY, 100, 200);
  
  if (d < 50){
	console.log("mouse is in the cirlce");
  }
}function setup() {
  createCanvas(400, 400);
  background(220);
}
function draw() {
  if (mouseX > 200) {
    background(10);
  } else {
    background(220);
  }
}let buttonA;
let buttonL;
function preload() {
  expertE = loadImage('E_image2.png');
  expertEart = loadImage('E_decisions2.png');
  expertElow = loadImage('E_lowLev2.png');
}
function setup() {
  createCanvas(400, 400);
  background(200);
  buttonA = createButton("artistic decisions");
  buttonL = createButton("lower level features");
  image(expertE, 0, 0);
  buttonA.mousePressed(displayArt);
  buttonL.mousePressed(displayLowLev);
} 
function draw(){
  noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse (179, 113, 62, 62);
  rollOver(); 
}
function displayArt() {
  image(expertEart, 0, 0);
}
function displayLowLev(){
  image(expertElow, 0, 0);
}
function rollOver(){
  let d = dist(mouseX, mouseY, 179, 113);
  if (d < 62) {
    console.log("mouse is over bowl");
    text("Now I’m going back to the bowl, trying to capture the value.", 0, 195);
  }
}
let buttonA;
let buttonL;
function preload() {
  expertE = loadImage('E_image2.png');
  expertEart = loadImage('E_decisions2.png');
  expertElow = loadImage('E_lowLev2.png');
}
function setup() {
  createCanvas(400, 400);
  buttonA = createButton("artistic decisions");
  buttonL = createButton("lower level features");
  image(expertE, 0, 0);
  buttonA.mousePressed(displayArt);
  buttonL.mousePressed(displayLowLev);
}
function displayArt() {
  image(expertEart, 0, 0);
}
function displayLowLev(){
  image(expertElow, 0, 0);
var txt = [];
var counts = {};
var keys = [];
var allwords = [];
var files = ['A.txt','B.txt'];
function preload() {
  for (var i = 0; i < files.length; i++) {
    txt[i] = loadStrings('files/' + files[i]);
  }
}
function setup() {
  for (var i = 0; i < txt.length; i++) {
    allwords[i] = txt[i].join("\n");
  }
  var tokens = allwords[0].split(/\W+/);
  for (var i = 0; i < tokens.length; i++) {
    var word = tokens[i].toLowerCase();
    if (counts[word] === undefined) {
      counts[word] = {
        tf: 1,
        df: 1
      };
      keys.push(word);
    } else {
      counts[word].tf = counts[word].tf + 1;
    }
  }
  var othercounts = [];
  for (var j = 1; j < allwords.length; j++) {
    var tempcounts = {};
    var tokens = allwords[j].split(/\W+/);
    for (var k = 0; k < tokens.length; k++) {
      var w = tokens[k].toLowerCase();
      if (tempcounts[w] === undefined) {
        tempcounts[w] = true;
      }
    }
    othercounts.push(tempcounts);
  }
  for (var i = 0; i < keys.length; i++) {
    var word = keys[i];
    for (var j = 0; j < othercounts.length; j++) {
      var tempcounts = othercounts[j];
      if (tempcounts[word]) {
        counts[word].df++;
      }
    }
  }
  for (var i = 0; i < keys.length; i++) {
    var word = keys[i];
    var wordobj = counts[word];
    wordobj.tfidf = wordobj.tf * log(files.length / wordobj.df);
  }
  keys.sort(compare);
  function compare(a, b) {
    var countA = counts[a].tfidf;
    var countB = counts[b].tfidf;
    return countB - countA;
  }
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    createDiv(key + " " + counts[key].tfidf);
  }
  noCanvas();
var txt = [];
var counts = {};
var keys = [];
var files = ['A.txt', 'B.txt'];
function preload() {
  for (var i = 0; i < files.length; i++){
  txt[i] = loadStrings('files/' + files[i]);
    }
}
function setup() {
  var allwords = txt.join("\n");
  var tokens = allwords.split(/\W+/);
  for (var i = 0; i < tokens.length; i++) {
    var word = tokens[i].toLowerCase();
    if (!/\d+/.test(word)) {
      if (counts[word] === undefined) {
        counts[word] = 1;
        keys.push(word);
      } else {
        counts[word] = counts[word] + 1;
      }
    }
  }
  keys.sort(compare);
  function compare(a, b) {
    var countA = counts[a];
    var countB = counts[b];
    return countB - countA;
  }
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    createDiv(key + " " + counts[key]);
  }
  noCanvas();
}let img;
function preload(){
	img = loadImage("ghost.png");
}
function setup() {
  createCanvas(600, 550);
  img.loadPixels();
  }
function draw() {
  
  for (let y = 0; y < height; y += 10){
    for (let x = 0; x < width; x += 10) { 
      noStroke();
      col = img.get(x, y);
      fill(col);
      rect(x, y, 10, 10);
    }
  }
  img.updatePixels();
  
let sound;
function preload(){
  sound = loadSound("Cartoon_Boing.mp3");
}
function setup() {
  createCanvas(400, 400);
}
function mousePressed() {
  let b = new Ball(random(width), random(height), random(-5, 5), random(-5, 5));
  balls.push(b);
}
function draw() {
  background(220);
  for (let i = 0; i < balls.length; i++) {
    balls[i].run()
  }
}let x;
let xspeed = 10;
function setup() {
  createCanvas(400, 400);
  x = 0;
}
function draw() {
  background(220);
  
  ellipse(x, height/2, 50, 50);
  
  x+=xspeed;
  
  if(x > width || x < 0) xspeed *=-1;
  
}let img;
function setup() {
  createCanvas(400, 400);
  img = createImage(100, 100);
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      img.set(x, y, color(random(255), random(255), random(255)));
    }
  }
  img.updatePixels();
}
function draw() {
  background(220);
  image(img, 0, 0);
}var mic;
var img;
var mouth;
var teeth;
function preload() {
  img = loadImage("mrbubz.jpg");
  teeth = loadImage("teeth.png");
}
function setup() {
  createCanvas(800, 800, WEBGL);
  mic = new p5.AudioIn();
  mic.start();
}
function draw() {
  var vol = mic.getLevel();
  texture(img);
  rect(-width / 2, -height / 2, 800, 800);
  noStroke();
  fill(255, 0, 0);
  mouth = vol * 10000;
  translate(width / 2, height / 2);
  rotate(-5 * (PI / 180));
  scale(3);
  texture(teeth);
  ellipse(-130, -80, 250, teeth.height + mouth);
let allWords = [];
let ts = 16;
let i = 0;
function preload() {
  let q = "trump";
  loadJSON(url, processSnippets);
}
function setup() {
  createCanvas(800, 800);
  fill(0);
}
function draw() {
  background(255, 5);
  ts++;
  ts %= 48;
  if (allWords.length > 0) {
    i += 1;
    i %= allWords.length;
    textSize(ts);
    let word = allWords[floor(i)];
    text(allWords[floor(i)], random(width), random(height));
  }
}
function processSnippets(data) {
  let docs = data.response.docs;
  console.log(data);
  let putins = ["Putin", "Vladi", "Vlad", "Vova"];
  let trumps = ["Trump", "president", "President"];
  for (let doc of docs) {
    let words = splitTokens(doc.snippet);
    for (let w in words) {
      let word = words[w];
      for (let trump of trumps) {
        if (match(word, trump)) {
          words[w] = putins[floor(random(putins.length))];
          break;
        }
      }
      shuffle(words, true);
    }
    allWords = concat(allWords, words);
  }
}let song;
let slider;
let isDark = false;
let photoVal;
let threshold = 50;
function preload() {
  song = loadSound("thisishalloween.mp3");
}
function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, 1, 0.5, 0.01);
  fft = new p5.FFT();
  frameRate(100);
  fft.setInput(song);
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
  if (photoVal < threshold && isDark == false) {
    song.play();
    isDark = true;
  }
  if (photoVal > threshold && isDark == true) {
    song.pause();
    isDark = false;
  }
  
}
function draw() {
  background(220);
  song.setVolume(slider.value());
  
  if(photoVal < threshold && isDark == true){
    onBeat();
  }
}
function onBeat(){
   fft.analyze();
    bassVal = int(fft.getEnergy("bass"));
  	lmidVal = int(fft.getEnergy("lowMid"));
  	midVal = int(fft.getEnergy("mid"));
    hmidVal = int(fft.getEnergy("highMid"));
    trebVal = int(fft.getEnergy("treble"));
    if (bassVal < 200) {
      bassVal = 0;
    }
  	
  	if (lmidVal < 10){
  	lmidVal = 0;
  	}
  
  	if(midVal < 50){
  	midVal = 0;
  	}
    if (trebVal < 25) {
      trebVal = 0;
    }
  
  
  
}let menu;
function preload(){
  menu = loadJSON("menu.json");
}
function setup() {
  createCanvas(400, 400);
  console.log(menu);
}
function draw() {
  background(220);
}var song, fft;
var mic;
function preload() {
  song = loadSound("chase.mp3");
}
function setup() {
  createCanvas(800, 800);
  fft = new p5.FFT();
  song.play();
}
function draw() {
  background(0, 0, 0);
  fft.analyze();
  bassVal = (int)(fft.getEnergy("bass"));
  lMidVal = (int)(fft.getEnergy("lowMid"));
  midVal = (int)(fft.getEnergy("mid"));
  hMidVal = (int)(fft.getEnergy("highMid"));
  trebVal = (int)(fft.getEnergy("treble"));
  noStroke();
  fill(255, 186, 73);
  ellipse(width / 2, height / 2, bassVal* 2 , bassVal*2 );
  noStroke();
  fill(32, 163, 158);
  ellipse(width / 2, height / 2, lMidVal * 2, lMidVal * 2);
  noStroke();
  fill(135, 195, 143);
  ellipse(width / 2, height / 2, midVal * 2, midVal * 2);
  noStroke();
  fill(239, 91, 91);
  ellipse(width / 2, height / 2, hMidVal * 4, hMidVal * 4);
  noStroke();
  fill(79, 0, 75);
  ellipse(width / 2, height / 2, trebVal * 2, trebVal * 2);
}var song, fft;
var portName = '/dev/cu.usbmodem1421';
function preload(){
	song = loadSound("thriller.mp3");
}
function setup() {
  createCanvas(400, 400);
  
  
	fft = new p5.FFT();
	song.play();
  
  frameRate(100);
}
function draw() {
  background(220);
  fft.analyze();
  bassVal = int(fft.getEnergy("bass"));
  midVal = int(fft.getEnergy("highMid"));  
  trebVal = int(fft.getEnergy("treble"));
  if(bassVal < 200){
    bassVal = 0;
  }
  
  if(midVal < 50){
    midVal = 0;
  }
	
  if(trebVal < 25){
    trebVal = 0;
  }
  
  
var fft, song;
function preload(){
    song = loadSound("icon.mp3");
  
}
function setup() {
    fft = new p5.FFT();
  frameRate(100);
  song.play();
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
  console.log(currentString);
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
var fft, song;
function preload(){
    song = loadSound("icon.mp3");
  
}
function setup() {
    fft = new p5.FFT();
  frameRate(100);
  song.play();
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
  console.log(currentString);
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
var fft, song;
function preload(){
    song = loadSound("YDKM.mp3");
}
function setup() {
  fft = new p5.FFT();
  frameRate(100);
  song.play();
}
function draw() {
  background(0);
  fill(255);
  fft.analyze();
  bassVal = int(fft.getEnergy("bass"));
  trebVal = int(fft.getEnergy("treble"));
  if(bassVal < 200){
    bassVal = 0;
  }
  if(trebVal < 20){
    trebVal = 0;
  }
	console.log(trebVal);
var fft, song;
function preload(){
    song = loadSound("icon.mp3");
  
}
function setup() {
    fft = new p5.FFT();
  frameRate(100);
  song.play();
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
  console.log(currentString);
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
}var song, fft;
function preload() {
  song = loadSound("YDKM.mp3");
}
function setup() {
  createCanvas(400, 400);
  fft = new p5.FFT();
  frameRate(100);
  song.play();
}
function draw() {
  background(0, 0, 0);
  spectrum = fft.analyze();
  bassVal = (int)(fft.getEnergy("bass"));
  lMidVal = (int)(fft.getEnergy("lowMid"));
  midVal = (int)(fft.getEnergy("mid"));
  hMidVal = (int)(fft.getEnergy("highMid"));
  trebVal = (int)(fft.getEnergy("treble"));
  noStroke();
  fill(177, 224, 157);
  rect(0, 80, 80, bassVal);
  noStroke();
  fill(232, 136, 115);
  rect(80, 80, 80, lMidVal);
  noStroke();
  fill(163, 119, 116);
  rect(160, 80, 80, midVal);
  noStroke();
  fill(92, 109, 112);
  rect(240, 80, 80, hMidVal);
  noStroke();
  fill(72, 74, 71);
  rect(320, 80, 80, trebVal);
}var song, fft;
function preload() {
  song = loadSound("Electricity.mp3");
}
function setup() {
  createCanvas(800, 800);
  fft = new p5.FFT();
  frameRate(100);
  song.play();
}
function draw() {
  background(0, 0, 0);
  spectrum = fft.analyze();
  bassVal = (int)(fft.getEnergy("bass"));
  lMidVal = (int)(fft.getEnergy("lowMid"));
  midVal = (int)(fft.getEnergy("mid"));
  hMidVal = (int)(fft.getEnergy("highMid"));
  trebVal = (int)(fft.getEnergy("treble"));
  noStroke();
  fill(172, 243, 157);
  ellipse(width / 2, height / 2, bassVal * 3, bassVal * 3);
  noStroke();
  fill(67, 87, 173);
  ellipse(width / 2, height / 2, lMidVal * 2, lMidVal * 2);
  noStroke();
  fill(119, 51, 68);
  ellipse(width / 2, height / 2, midVal * 2, midVal * 2);
  noStroke();
  fill(242, 159, 185);
  ellipse(width / 2, height / 2, hMidVal * 2, hMidVal * 2);
  noStroke();
  fill(229, 91, 73);
  ellipse(width / 2, height / 2, trebVal * 2, trebVal * 2);
}var song, fft;
function preload(){
  song = loadSound("YDKM.mp3");
}
function setup() {
  createCanvas(400, 400);
  fft = new p5.FFT();
  frameRate(100);
  song.play();
}
function draw() {
	background(0,0,0);
  spectrum = fft.analyze();
  bassVal = (int)(fft.getEnergy("bass"));
  lMidVal = (int)(fft.getEnergy("lowMid"));
  midVal = (int)(fft.getEnergy("mid"));
  hMidVal = (int)(fft.getEnergy("highMid"));
  trebVal = (int)(fft.getEnergy("treble"));
  
  fill(255,0,255);
  ellipse(200,200,bassVal * 2, bassVal * 2);
  
  fill(0,0,255);
  ellipse(200,200,lMidVal, lMidVal);
  
	fill(255,0,0);
  ellipse(200,200,midVal, midVal);
  
	fill(0,255,0);
  ellipse(200,200,hMidVal, hMidVal);
  
	fill(255,255,0);
  ellipse(200,200,trebVal, trebVal);
  
}let song;
let slider;
let isDark = false;
let photoVal;
let threshold = 50;
function preload() {
  song = loadSound("Thriller_3mb.mp3");
}
function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, 1, 0.5, 0.01);
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
  console.log(photoVal);
  if (photoVal < threshold && isDark == false){
  	song.play();
    isDark = true;
  }
  
  if (photoVal > threshold && isDark == true){
    song.pause();
    isDark = false;
  } 
 }
function draw() {
  background(220);
  song.setVolume(slider.value());
}let song;
let slider;
let startParty = false;
let asp = false;
let photoVal;
function preload() {
  song = loadSound("Thriller_3mb.mp3");
}
function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, 1, 0.5, 0.01);
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
  if (photoVal > 10) {
    startParty = false;
  } else {
    startParty = true;
  }
  if (startParty == true && asp == true) {
  }
  else if(startParty == true && asp == false){
    song.play();
    asp = true;
  }
  else if(asp == true && startParty == false){
    asp = false;
    song.pause();
  }
}
function playMusic() {
  if (photoVal < 10) {
    song.play();
  }
}
function draw() {
  background(220);
  song.setVolume(slider.value());
}let song;
let slider;
function setup() {
  createCanvas(400, 400);
  song = loadSound("Thriller_3mb.mp3", loaded);
  slider = createSlider(0,1,0.5, 0.01);
									 
}
function loaded(){
  song.play()
}  
function draw() {
  background(220);
  song.setVolume(slider.value());
let allWords = [];
let ts = 16;
let i = 0;
function preload() {
  let q = "trump";
  let apikey = "5fcc7b03d74d15972346cf84719ad5e5:13:68130021";
}
function setup() {
  createCanvas(800, 800);
  fill(0);
}
function draw() {
  background(255, 5);
  ts++;
  ts %= 48;
  if (allWords.length > 0) {
    i += 1;
    i %= allWords.length;
    textSize(ts);
    let word = allWords[floor(i)];
    text(allWords[floor(i)], random(width), random(height));
  }
}
function processSnippets(data) { 
  let docs = data.response.docs;
  console.log(data);
  let putins = ["Putin", "Vladi", "Vlad", "Vova"];
  let trumps = ["Trump", "president", "President"];
  for (let doc of docs) { 
    let words = splitTokens(doc.snippet);
    for (let w in words) {
      let word = words[w];
      for (let trump of trumps) {
        if (match(word, trump)) {
          words[w] = putins[floor(random(putins.length))];
          break;
        }
      }
      shuffle(words, true);
    }
    allWords = concat(allWords, words);
  }
}
let tokens = [];
function preload() {
  txt = loadStrings('quiz7_text.txt');
  console.log(txt);
}
function setup() {
  createCanvas(400, 400);
  for (let l of txt) {
    tokens = concat(tokens, splitTokens(l));
  }
  console.log(tokens);
}
function draw() {
  background(220);
  let x = 0;
  for (let token of tokens) {
    text(token, x, y);
      y += textAscent(token);
      x = 0;
    }
  }
function setup() {
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
}
function gotData() {
}
function draw() {
  background(127, 0, 127);
  var v = map(latestData, 0, 1023, 0, width);
  ellipse(width * .4, height * .4, v * .25 + 10, v * .25 + 10);
  ellipse(width * .6, height * .4, (2500 / v) + 10, (2500 / v) + 10);
  bezier(width * .3, v * .6 + height / 2, width * .4, height * .8, width * .6, height * .8, width * .7, v * .55 + height / 2);
  v += random(-5, 5);
  bezier(width * .5, height * .5, v * .6, height * .6, v * .6, height * .8, width * .45, height * .67);
function setup() {
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
}
function gotData() {
}
function draw() {
  background(127, 0, 127);
  var v = map(latestData, 0, 1023, 0, width);
  ellipse(width * .4, height * .4, v * .25 + 10, v * .25 + 10);
  ellipse(width * .6, height * .4, (2500 / v) + 10, (2500 / v) + 10);
  bezier(width * .3, v * .6 + height / 2, width * .4, height * .8, width * .6, height * .8, width * .7, v * .55 + height / 2);
  v += random(-5, 5);
  bezier(width * .5, height * .5, v * .6, height * .6, v * .6, height * .8, width * .45, height * .67);
function setup() {
   createCanvas(600, 600);
  noFill();
  strokeWeight(10);
  setInterval(function() {
    console.log("HELLO");
  }, 1000);
}
function gotData() {
}
function draw() { 
  background(127, 0, 127);
  
  var v = mouseX; 
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
  
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
}
let img;
let r = 0;
let button;
let pressed = false;
function preload(){
  img = loadImage('wheel.png');
}
function setup() {
  createCanvas(700, 700);
  let button = createButton("SPIN");
  button.position(20,110);
  
  let footer = createDiv("About | Help | Contact Us");
  footer.position(275, 850);
  
  button.mousePressed(spinOn);
}
function draw() {
  background(249,244,217);
	spin();
}
function spinOn(){
  pressed = !pressed;
}  
  
function spin(){
  translate(width/2, height/2);
  if(pressed){
    r++;
  }
  rotate(radians((r % 360)));
  imageMode(CENTER)
  image(img, 0, 0, 700,700);
}function setup() {
  noCanvas();
}
function draw() {
  background(220);
}
  noCanvas();
}
function draw() {
  background(220);
}let ripples = [];
function setup() {
  createCanvas(600, 400);
  bkr = random(0, 255);
  bkg = random(0, 255);
  background(bkr, bkg, 255);
  for (let i = 0; i < 10; i++) {
    ripples.push(new Ripple(random(0, 600), random(0, 400), random(20, 100), random(20, 100)));
  }
}
function mousePressed() {
  ripples[i].clicked();
}
function draw() {
  background(bkr, bkg, 255);
  for (let i = 0; i < ripples.length; i++) {
    ripples[i].run();
  }
}let ripples = [];
function setup() {
  createCanvas(600, 400);
  bkr = random(0, 255);
  bkg = random(0, 255);
  background(bkr, bkg, 255);
}
function mouseClicked() {
  let ripple = new Ripple(mouseX, mouseY, 0, 0);
  ripples.push(ripple);
}
function draw() {
  background(bkr, bkg, 255);
  for (let i = 0; i < ripples.length; i++) {
    ripples[i].run()
  }
let bg = 0;
function setup() {
  createCanvas(600, 600);
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
     console.log(currentString);
     bg = int(currentString);
}
function draw() {
  background(bg);
      ellipse(50,50,data,data);
    }
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++) {
    let b = new Ball(random(width), random(height), random(-5, 5), random(-5, 5));
    balls.push(b);
  }
}
function mousePressed() {
}
function draw() {
  background(220);
  for(let ball in balls){
    balls[ball].run();
    if (balls[ball].isNear(mouseX, mouseY)) {
      balls.splice(ball, 1);
    }
}
function setup() {
  createCanvas(400, 400);
}
function mousePressed() {
  let b = new Ball(random(width), random(height), random(-5, 5), random(-5, 5));
  balls.push(b);
}
function draw() {
  background(220);
  for (let i = 0; i < balls.length; i++) {
    balls[i].run()
  }
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  textSize(32);
  text(add(22, 78), 175, 200);
}
function add(num1, num2) {
  let sum = num1 + num2;
  return sum;
}let ripples = [];
function setup() {
  createCanvas(600, 400);
  bkr = random(0, 255);
  bkg = random(0, 255);
  background(bkr, bkg, 255);
}
function mouseClicked() {
  let ripple = new Ripple(mouseX, mouseY, 0, 0);
  ripples.push(ripple);
}
function draw() {
  background(bkr, bkg, 255);
  for (let i = 0; i < ripples.length; i++) {
    ripples[i].run()
  }
function setup() {
  createCanvas(400, 400);
  x = 0;
  for (let i = 0; i < 10; i++) {
    balls.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
  }
}
function draw() {
  background(220);
  for (let b in balls) {
    balls[b].run();
    if (balls[b].isNear(mouseX, mouseY)) {
      balls.splce(b, 1);
    }
  }
}let ripple0;
let ripple1;
let clicked = false;
function setup() {
  createCanvas(600, 400);
  bkr = random(0, 255);
  bkg = random(0, 255);
  background(bkr, bkg, 255);
}
function draw() {
  background(bkr, bkg, 255);
  if (clicked == true) {
    ripple0.display();
    ripple0.grow();
    ripple1.display();
    ripple1.grow();
  }
}
function mouseClicked() {
  if (clicked == false) clicked = true;
  clickX = mouseX;
  clickY = mouseY;
  ripple0 = new Ripple(clickX, clickY, 10, 10);
  ripple1 = new Ripple(clickX, clickY, 0, 0);
}
let ball0;
let ball1;
function setup() {
  createCanvas(400, 400);
   ball0 = new Ball(200, 200, 20, 20, 2, 5, 0);
  ball1 = new Ball(0, 0, 40, 40, 5, 2, 150);
}
function draw() {
  background(220);
  ball0.display();
  ball0.bounce();
  ball1.display();
  ball1.bounce();
}
class Ball {
  constructor(x, y, w, h, xspeed, yspeed, col) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.col = col;
  }
  display() {
    fill(this.col);
    ellipse(this.x, this.y, this.w, this.h);
  }
  bounce() {
    this.x += this.xspeed;
    this.y += this.yspeed;
    if (this.x > width || this.x < 0) this.xspeed *= -1;
    if (this.y > height || this.y < 0) this.yspeed *= -1;
  }
}
let x = 0;
let y = 0;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  xspeed = bounce(x, 0, width, xspeed);
  yspeed = bounce(y, 0, height, yspeed);
  x += xspeed;
  y += yspeed;
  
	fill('orange');
  ellipse(x, y, 20, 20);
}
function bounce(pos, low, high, speed) {
  if (pos < low || pos > high) speed *= -1;
  return speed;
let numCols;
let numRows;
let colW;
let rowH;
function setup() {
  createCanvas(400, 400);
  numCols = 5;
  numRows = 10;
  colWidth = width / numCols;
  rowHeight = height / numRows;
}
function draw() {
  background(220);
  for (let colNum = 0; colNum < numCols; colNum++) {
    for (let rowNum = 0; rowNum < numRows; rowNum++) {
      let x = colNum * colWidth;
      let y = rowNum * rowHeight;
      let spotColor = dist(mouseX, mouseY, x, y);
      spotColor = map(spotColor, 0, dist(0, 0, width, height), 255, 0);
      fill(spotColor);
      rect(x, y, colWidth, rowHeight);
      noStroke();
      fill('red');
      ellipse(x, y, 3, 3);
	}
 }
}
function setup() {
  createCanvas(600, 400);
  bkr = random(0, 255);
  bkg = random(0, 255);
  background(bkr, bkg, 255);
}
function draw() {
  background(bkr, bkg, 255);
  noFill();
  ellipse(clickX, clickY, rw, rh);
  
  grow();
}
function mouseClicked() {
  rw = 0;
  rh = 0; 
  clickX = mouseX;
  clickY = mouseY;
}
function grow(){
  rw = rw + 2;
  rh = rh + 1;
  
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  for (let x = 0; x < width; x += width / 50) {
    for (let y = 0; y < width; y += height / 50) {
      rect(x, y, width / 50, height / 50);
    }
  }
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  for (let x = 0; x < width; x += width / 50) {
		line(x, 0, x, height);
  }
	for (let y = 0; y < width; y += height/50){
    line(0, y, width, y);
  }
var Switch = false;
function setup() {
  createCanvas(400, 400);
  background(220);
}
function draw() {
  noStroke();
  for (var row = 0; row < num; row++) {
    
    for (var col = 0; col < num; col++) {
      var ver = row * height / num;
      var hor = col * width / num;
          fill('black')
          rect(hor, ver, width / num, height / num);
          fill('black')
          rect(hor, ver, width / num, height / num);
        } else {
          fill('white')
          rect(hor, ver, width / num, height / num);
        }
      
      
          fill('white')
          rect(hor, ver, width / num, height / num);
          fill('white')
          rect(hor, ver, width / num, height / num);
        } else {
          fill('black')
          rect(hor, ver, width / num, height / num);
        }
      if (mouseX < width / num && mouseY < height / num && row == 0 && col == 0) { 
        fill(0,128,128);
        rect(hor, ver, width / num, height / num);
      	noStroke();
      }
      
    }
  }
  if (mouseX < width / num && mouseY < height / num) {
    Switch = !Switch;
var Switch = false;
var x = 0;
var xspeed = .01;
function setup() {
  createCanvas(400, 400);
  background(220);
}
function draw() {
  noStroke();
  for (var row = 0; row < num; row++) {
    for (var col = 0; col < num; col++) {
      var ver = row * height / num;
      var hor = col * width / num;
      if (Switch == true) {
          fill('black')
          rect(hor, ver, width / num, height / num);
          fill('black')
          rect(hor, ver, width / num, height / num);
        } else {
          fill('white')
          rect(hor, ver, width / num, height / num);
        }
      }
      if (Switch == false) {
        fill('teal');
        rect(x, x, width / num, height / num);
        x += xspeed;
        if (x > width || x < 0) xspeed *= -1;
          fill('white')
          rect(hor, ver, width / num, height / num);
          fill('white')
          rect(hor, ver, width / num, height / num);
        } else {
          fill('black')
          rect(hor, ver, width / num, height / num);
        }
      }
      if (mouseX < width / num && mouseY < height / num && row == 0 && col == 0) {
        fill(0, 128, 128);
        rect(hor, ver, width / num, height / num);
        noStroke();
      }
    }
  }
}
function mousePressed() {
  if (mouseX < width / num && mouseY < height / num) {
    Switch = !Switch;
  }
var Switch = false;
function setup() {
  createCanvas(400, 400);
  background(220);
}
function draw() {
  noStroke();
  for (var row = 0; row < num; row++) {
    for (var col = 0; col < num; col++) {
      var ver = row * height / num;
      var hor = col * width / num;
          fill('black')
          rect(hor, ver, width / num, height / num);
          fill('black')
          rect(hor, ver, width / num, height / num);
        } else {
          fill('white')
          rect(hor, ver, width / num, height / num);
        }
      }
      if (Switch == false) {
          fill('white')
          rect(hor, ver, width / num, height / num);
          fill('white')
          rect(hor, ver, width / num, height / num);
        } else {
          fill('black')
          rect(hor, ver, width / num, height / num);
        }
      }
      if (mouseX < width / num && mouseY < height / num && row == 0 && col == 0) { 
        fill(0,128,128);
        rect(hor, ver, width / num, height / num);
      	noStroke();
      }
    }
  }
}
function mousePressed() {  
  if (mouseX < width / num && mouseY < height / num) {
    Switch = !Switch;
  }
}var num = 10;
var Switch = false;
function setup() {
  createCanvas(400, 400);
  background(220);
}
function draw() {
  
  for (var row = 0; row < num; row++) {
    for (var col = 0; col < num; col++) {
      var ver = row * height / num;
      var hor = col * width / num;
      if (Switch == true) {
        if (row % 2 == 0 && col % 2 == 0) {
          fill('black')
          rect(hor, ver, width / num, height / num);
        } else if (row % 2 == 1 && col % 2 == 1) {
          fill('black')
          rect(hor, ver, width / num, height / num);
        } else {
          fill('white')
          rect(hor, ver, width / num, height / num);
        }
      }
      if (Switch == false) {
        if (row % 2 == 0 && col % 2 == 0) {
          fill('white')
          rect(hor, ver, width / num, height / num);
        } else if (row % 2 == 1 && col % 2 == 1) {
          fill('white')
          rect(hor, ver, width / num, height / num);
        } else {
          fill('black')
          rect(hor, ver, width / num, height / num);
        }
      }
       
    }
  }
}
function mousePressed() {
  if (mouseX < width / num && mouseY < height / num) {
    Switch = !Switch;
  }
}var num = 10;
function setup() {
  createCanvas(400, 400);
  background(220);
}
function draw() {
  for (var row = 0; row < num; row++) {
    for (var col = 0; col < num; col++) {
      var ver = row * height / num;
      var hor = col * width / num;
      rect(hor, ver, width / num, height / num);
    }
  }
let panelOn = false;
let alreadyRed = true;
function setup() {
  createCanvas(600, 600);
}
function draw() {
  background(220);
    fill('red');
    rect(2 * width / 3, 0, width / 3, height);
  }
}
 
function mousePressed() {
  if (mouseX > 2 * width / 3) {
    panelOn = true;
  }
x = 0;
xSpeed = 1;
function setup() {
  createCanvas(400, 400);
  x = 0;
}
function draw() {
  background(220);
  ellipse(x, height / 2, 50, 50);
  x += xSpeed;
  if (x > width || x < 0) {
  }
}function setup() {
	createCanvas(132, 132);
}
function draw() {
	background(220);
	for (var x = 21; x <= width; x += 45) {
		for (var y = 21; y <= height; y += 45) {
			ellipse(x, y, 27, 27);
			point(x, y);
			}
		}
	}
let y;
let yspeed = 0;
function setup() {
  createCanvas(400, 400);
	y = height;
}
function draw() {
  background(220);
	ellipse(width/2, y, 50, 50);
	y-= yspeed;
}var cw =0;
var ch =0;
var currentE;
function setup() {
  createCanvas(400, 400);
   background(220);
}
function draw() {
 	ellipse(200,200, cw, ch);
  cw = cw+1;
  ch = ch+1;
  
} 
function draw() {
  cw = cw+1;
  ch = ch+1;
}
function mousePressed(){
  ellipse (mouseX, mouseY, cw, ch);
}var cw = 0;
var ch = 0;
var start;
var clickX;
var clickY;
var bkr;
var bkg;
function setup(){
  createCanvas(600, 400);
  bkr = random(0,255);
  bkg = random(0,255);
  background(bkr, bkg, 255);
  
}
function draw(){
    background(bkr, bkg, 255);
    noFill();
    ellipse(clickX, clickY, cw, ch);
    cw = cw+2;
    ch = ch+1;
}
function mouseClicked(){
  clickX = mouseX;
  clickY = mouseY;
  
  
}var cw = 0;
var ch = 0;
var start;
var clickX;
var clickY;
function setup(){
  createCanvas(600, 400);
  background(120, 255, 255);
  
}
function draw(){
  	if (start){
    background(120, 255, 255);
    noFill();
    ellipse(mouseX, mouseY, cw, ch);
    cw = cw+2;
    ch = ch+1;
    }
}
function mouseClicked(){
	start = !start;
function setup() {
  createCanvas(600, 400);
  bkr = random(0, 255);
  bkg = random(0, 255);
  background(bkr, bkg, 255);
}
function draw() {
  background(bkr, bkg, 255);
  noFill();
  ellipse(clickX, clickY, rw, rh);
  rw = rw + 2;
  rh = rh + 1;
}
function mouseClicked() {
  clickX = mouseX;
  clickY = mouseY;
}var x;
var y;
var speed = 10;
function setup() {
  createCanvas(400, 400);
  x = width/2;
  y = height/2;
}
function draw() {
  background(220);
  ellipseMode(CENTER);
  ellipse(x, y, 50, 50);
  x = x - speed;
  y = y - speed;
var x;
var y;
var rw;
var rh;
function setup() { 
  createCanvas(400, 400);
  background(220);
  rectMode(CENTER);
  
  x = width/2;
  y = height/2;
  rw = width/2;
  rh = height/2
  
} 
function draw() {
  background(220);
	rect(x, y, rw, rh);
  x += mouseX-x*.03;
}let spot = {
  x: 100,
  y: 50
}
let col = {
  r: 255,
  g: 0,
  b: 0
}
function setup() {
  createCanvas(600, 400);
  background(255);
}
function draw() {
  col.r = random(0, 255);
  col.g = random(0, 255);
  col.b = random(0,255);
  spot.x = random(0, width);
  spot.y = random(0,height);
  noStroke()
  fill(col.r, col.g, col.b);
  ellipse(spot.x, spot.y, 24, 24);
var r = 0;
var b = 255;
function setup() {
  createCanvas(600, 400);
}
function draw() {
  r = map(mouseX, 0, 600, 0, 255);
  b = map(mouseX, 0, 600, 255, 0)
  background(r, 0, b);
  fill(250, 118, 222);
  ellipse(mouseX, 200, 64, 64);
function setup() {
  createCanvas(600, 400);
  background(121, 159, 216);
}
function draw() {
 background(121, 159, 216);
noFill();
  ellipse(clickX, clickY, rw, rh);
  cw = cw + 2;
  ch = ch + 1;
   
}
function mousePressed() {
  clickX = mouseX;
  clickY = mouseY;
var recHeight = 400;
function setup() {
  createCanvas(recWidth, recHeight);
  rectMode(CENTER, CENTER);
}
function draw() {
  background(220);
  translate(recWidth / 2, recHeight / 2) 
  rect(0, 0, recWidth * .1, recHeight * .1);
function setup(){
	rectMode(CENTER);
}
function draw(){
  console.log(frameCount);
  createCanvas(frameCount,frameCount); 
  background(220);
  rect(width/2, height/2, 0.1*width, 0.1*height);
}   var circleX = 0;
var circleY = 0;
var w = 0;
var h = 0;
var fillColor = 255;
var circle = {
  x: 0,
  y: 100,
  diameter: 50
};
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(fillColor);
  noStroke();
  fill(fillColor);
  ellipse(200, 200, w, h);
  circleY = circleY +2;
  w = w +1;
  fillColor = fillColor - 1;
}function setup() {
  createCanvas(400, 300);
}
function draw() {
  background('cyan');
  
  strokeWeight(30);
  stroke('red');
  line(0, 0, 400, 300);
  
  noStroke();
  fill(0,200,0);
  ellipseMode(CENTER);
  ellipse(200, 150, 200, 150);
  
  fill(0,0,155);
  rect(270, 120, 30, 30);
}function setup() {
  createCanvas(400, 360);
}
function draw() {
  background(176, 196, 222);
  noStroke()
  fill(139, 69, 19);
  ellipse(200, 340, 155, 240);
  fill(105, 105, 105);
  ellipse(200, 150, 90, 120);
  fill(139, 69, 19);
  fill('tan');
  rectMode(CENTER);
  rect(200, 300, 40, 15);
  fill('tan');
  fill('gray');
  ellipse(175, 150, 25, 20);
  ellipse(225, 150, 25, 20);
  fill('white');
  ellipseMode(CENTER);
  ellipse(170, 190, 25, 20);
  ellipse(230, 190, 25, 20);
  fill('black');
  ellipse(170, 190, 13, 13);
  ellipse(230, 190, 13, 13);
  fill('tan');
  rectMode(CENTER);
  rect(200, 200, 100, 12);
  fill('white');
  quad(185, 190, 215, 190, 235, 300, 160, 300);
  fill('black');
  rectMode(CENTER);
  rect(200, 275, 30, 25, 5);
  fill('gray');
  triangle(160, 70, 200, 100, 165, 100)
  triangle(240, 70, 200, 100, 235, 100)
  fill('pink');
  fill('gray');
  ellipse(200, 115, 82, 62);
  ellipse(200, 145, 23, 12);
  fill(169, 169, 169);
  ellipse(187, 140, 25, 15);
  ellipse(213, 140, 25, 15);
  fill('pink');
  triangle(190, 132, 210, 132, 200, 142);
  fill('yellow');
  ellipseMode(CENTER);
  ellipse(186, 120, 10, 10);
  ellipse(216, 120, 10, 10);
  fill('black');
  ellipseMode(CENTER);
  ellipse(186, 120, 4, 10);
  ellipse(216, 120, 4, 10);
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  fill('turquoise');
  
  
  
  ellipse(200, 200, 100, 100);
function setup() {
  createCanvas(400, 300);
}
function draw() {
  background(100);
}