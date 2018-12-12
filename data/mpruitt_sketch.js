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

  //Artistic decisions button
  fill(255, 89, 0);
  noStroke();
  ellipse(400, 300, 30, 30);

  //Lower Level Features button
  fill(115, 194, 251);
  noStroke();
  ellipse(400, 350, 30, 30);

  //next button
  // fill(0);
  // rectMode(CENTER);
  // rect(350, 250, 20, 20);
  image(Rarrow, 250, 200);

  //back button
  
  // rectMode(CENTER);
  // rect(50, 250, 20, 20);
  image(Larrow, 75, 200);
  
  

  rollOver();
  //console.log(state);
  fill(0);
  textAlign(CENTER);
  text("expert", 200, 220);
  
  textAlign(CENTER);
  text("novice", 600, 220);
  
  //text("Going to make some lines a little bit more loose, so it doesn't look to strangely cropped. And also the center of the drawing is pretty messy so I'm trying to keep that feeling.", 180, 375, 250, 200);
  

}


function eEArtRegions() {
  //artisitc decisions invisible bowl
  noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse(179, 113, 62, 62);
  //rect(225, 160, 160, 45);
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
  let pA = dist(mouseX, mouseY, 400, 300); //position over art decision button
  let pL = dist(mouseX, mouseY, 400, 350); //position over lower level features button
  let pN = dist(mouseX, mouseY, 250, 200); //position over "next button"
  let pB = dist(mouseX, mouseY, 75, 200); // position over "back" button

  //next 
  if (pN <40) {
    if (expertstate < 2) {
      expertstate += 1;
    }
  }

  //back
  if (pB < 40) {
    if (expertstate > 1.2) {
      expertstate -= 1;
    }
  }

  //artistic decisions category
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

  //low level features category
  if (pL < 30) {
    if (expertstate == 1 || expertstate == 1.1) {
      expertstate = 1.2;
    }
     if (novicestate == 1 || novicestate == 1.1) {
      novicestate = 1.2;
    }
  }


  //can these be elses??
  //If click anywhere else, return to orig current image
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

  //Artistic decisions button
  fill(255, 89, 0);
  noStroke();
  ellipse(400, 300, 30, 30);
  //text("Artistic Decisions", 400 , 280);

  //Lower Level Features button
  fill(115, 194, 251);
  noStroke();
  ellipse(400, 350, 30, 30);
  //text("Lower level features", 400, 333);

  //next button
  // fill(0);
  // rectMode(CENTER);
  // rect(350, 250, 20, 20);
  //image(Rarrow, 250, 200);

  //back button

  // rectMode(CENTER);
  // rect(50, 250, 20, 20);
  //image(Larrow, 75, 200);



  rollOver();
  //console.log(state);
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text("EXPERT", 180, 220);

  textAlign(CENTER);
  text("NOVICE", 600, 220);


}


function eEArtRegions() {
  //artisitc decisions invisible bowl
  noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse(179, 113, 62, 62);
  //rect(225, 160, 160, 45);
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
  //artisitc decisions invisible bowl
  noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse(165, 95, 40); //edges
  ellipse(152, 155, 50); //shadows
}

function nGlowRegions() {
  //artisitc decisions invisible bowl
  noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse(615, 135, 65); //shadows in bowl
  ellipse(550, 150, 40); //black stripe
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
  let pA = dist(mouseX, mouseY, 400, 300); //position over art decision button
  let pL = dist(mouseX, mouseY, 400, 350); //position over lower level features button
  //let pN = dist(mouseX, mouseY, 250, 200); //position over "next button"
  //let pB = dist(mouseX, mouseY, 75, 200); // position over "back" button

  //next 
//   if (pN < 40) {
//     if (expertstate < 2) {
//       expertstate += 1;
//     }
//   }

//   //back
//   if (pB < 40) {
//     if (expertstate > 1.2) {
//       expertstate -= 1;
//     }
//   }

  //artistic decisions category
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

  //low level features category
  if (pL < 30) {
    if (expertstate == 1 || expertstate == 1.1) {
      expertstate = 1.2;
    }
    if (novicestate == 1 || novicestate == 1.1) {
      novicestate = 1.2;
    }
  }


  //can these be elses??
  //If click anywhere else, return to orig current image
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

  //Artistic decisions button
  fill(255, 89, 0);
  noStroke();
  ellipse(400, 300, 30, 30);

  //Lower Level Features button
  fill(115, 194, 251);
  noStroke();
  ellipse(400, 350, 30, 30);

  //next button
  // fill(0);
  // rectMode(CENTER);
  // rect(350, 250, 20, 20);
  image(Rarrow, 250, 200);

  //back button
  // fill(0);
  // rectMode(CENTER);
  // rect(50, 250, 20, 20);
  image(Larrow, 75, 200);
  
  

  rollOver();
  //console.log(state);
  
  textAlign(CENTER);
  text("expert", 200, 220);
  
  textAlign(CENTER);
  text("novice", 600, 220);
  
  //text("Going to make some lines a little bit more loose, so it doesn't look to strangely cropped. And also the center of the drawing is pretty messy so I'm trying to keep that feeling.", 180, 375, 250, 200);
  

}


function eEArtRegions() {
  //artisitc decisions invisible bowl
  noFill();
  noStroke();
  ellipseMode(CENTER);
  ellipse(179, 113, 62, 62);
  //rect(225, 160, 160, 45);
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
  let pA = dist(mouseX, mouseY, 400, 300); //position over art decision button
  let pL = dist(mouseX, mouseY, 400, 350); //position over lower level features button
  let pN = dist(mouseX, mouseY, 250, 200); //position over "next button"
  let pB = dist(mouseX, mouseY, 50, 250); // position over "back" button

  //next 
  if (pN <40) {
    if (expertstate < 2) {
      expertstate += 1;
    }
  }

  //back
  if (pB < 20) {
    if (expertstate > 1.2) {
      expertstate -= 1;
    }
  }

  //artistic decisions category
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

  //low level features category
  if (pL < 30) {
    if (expertstate == 1 || expertstate == 1.1) {
      expertstate = 1.2;
    }
     if (novicestate == 1 || novicestate == 1.1) {
      novicestate = 1.2;
    }
  }


  //can these be elses??
  //If click anywhere else, return to orig current image
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
  // specify multiple formats for different browsers
  fingers = createVideo('E_fast_small.m4v');
  button = createButton('play');
  button.mousePressed(toggleVid); // attach button listener
}

// plays or pauses the video depending on current state
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
  //button.mousePressed(Evid.play());


}

function draw() {

  background(255);
  //image(expertE, 0, 0);
  display();

  //Artistic decisions button
  fill(255, 89, 0);
  noStroke();
  ellipse(200, 300, 30, 30);

  //Lower Level Features button
  fill(115, 194, 251);
  noStroke();
  ellipse(200, 350, 30, 30);

  //next button
  fill(0);
  rectMode(CENTER);
  rect(350, 250, 20, 20);

  //back button
  fill(0);
  rectMode(CENTER);
  rect(50, 250, 20, 20);

  rollOver();
  //console.log(state);

}


function regionBorders() {
  //artisitc decisions invisible bowl
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
  let pA = dist(mouseX, mouseY, 200, 300); //position over art decision button
  let pL = dist(mouseX, mouseY, 200, 350); //position over lower level features button
  let pN = dist(mouseX, mouseY, 350, 250); //position over "next button"
  let pB = dist(mouseX, mouseY, 50, 250); // position over "back" button

  //next 
  if (pN < 20) {
    if (expertstate < 2) {
      expertstate += 1;
    }
  }

  //back
  if (pB < 20) {
    if (expertstate > 1.2) {
      expertstate -= 1;
    }
  }

  //artistic decisions category
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

  //low level features category
  if (pL < 30) {
    if (expertstate == 1 || expertstate == 1.1) {
      expertstate = 1.2;
    }
     if (novicestate == 1 || novicestate == 1.1) {
      novicestate = 1.2;
    }
  }


  //can these be elses??
  //If click anywhere else, return to orig current image
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
  //image(expertE, 0, 0);
  display();

  //Artistic decisions button
  fill(255, 89, 0);
  noStroke();
  ellipse(200, 300, 30, 30);

  //Lower Level Features button
  fill(115, 194, 251);
  noStroke();
  ellipse(200, 350, 30, 30);

  //next button
  fill(0);
  rectMode(CENTER);
  rect(350, 250, 20, 20);

  //back button
  fill(0);
  rectMode(CENTER);
  rect(50, 250, 20, 20);

  rollOver();
  //console.log(state);

}


function regionBorders() {
  //artisitc decisions invisible bowl
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
  let pA = dist(mouseX, mouseY, 200, 300); //position over art decision button
  let pL = dist(mouseX, mouseY, 200, 350); //position over lower level features button
  let pN = dist(mouseX, mouseY, 350, 250); //position over "next button"
  let pB = dist(mouseX, mouseY, 50, 250); // position over "back" button

  //next 
  if (pN < 20) {
    if (expertstate < 2) {
      expertstate += 1;
    }
  }

  //back
  if (pB < 20) {
    if (expertstate > 1.2) {
      expertstate -= 1;
    }
  }

  //artistic decisions category
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

  //low level features category
  if (pL < 30) {
    if (expertstate == 1 || expertstate == 1.1) {
      expertstate = 1.2;
    }
     if (novicestate == 1 || novicestate == 1.1) {
      novicestate = 1.2;
    }
  }


  //can these be elses??
  //If click anywhere else, return to orig current image
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
  //image(expertE, 0, 0);
  display();

  //Artistic decisions button
  fill(255, 89, 0);
  noStroke();
  ellipse(200, 300, 30, 30);

  //Lower Level Features button
  fill(115, 194, 251);
  noStroke();
  ellipse(200, 350, 30, 30);

  //next button
  fill(0);
  rectMode(CENTER);
  rect(350, 250, 20, 20);

  //back button
  fill(0);
  rectMode(CENTER);
  rect(50, 250, 20, 20);

  rollOver();
  //console.log(state);

}


function regionBorders() {
  //artisitc decisions invisible bowl
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
  let pA = dist(mouseX, mouseY, 200, 300); //position over art decision button
  let pL = dist(mouseX, mouseY, 200, 350); //position over lower level features button
  let pN = dist(mouseX, mouseY, 350, 250); //position over "next button"
  let pB = dist(mouseX, mouseY, 50, 250); // position over "back" button

  //next 
  if (pN < 20) {
    if (state < 2) {
      state += 1;
    }
  }

  //back
  if (pB < 20) {
    if (state > 1.2) {
      state -= 1;
    }
  }

  //artistic decisions category
  if (pA < 30) {
    if (state == 1 || state == 1.2) {
      state = 1.1;
    }
    if (state == 2) {
      state = 2.1;
    }
  }

  //low level features category
  if (pL < 30) {
    if (state == 1 || state == 1.1) {
      state = 1.2;
    }
  }


  //can these be elses??
  //If click anywhere else, return to orig current image
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

  //image(expertE, 0, 0);

  // //Artistic Decisions Button
  // fill(255, 89, 0);
  // noStroke();
  // ellipse(200, 300, 30, 30);

  // //Lower Level Features Button
  // fill(115, 194, 251);
  // noStroke();
  // ellipse(200, 350, 30, 30);


  // fill(0);
  // rectMode(CENTER);
  // rect(350, 150, 20, 20);

}

function draw() {

  background(255);
  //image(expertE, 0, 0);
  display();

  //Artistic decisions button
  fill(255, 89, 0);
  noStroke();
  ellipse(200, 300, 30, 30);

  // fill(115, 194, 251);
  // noStroke();
  // ellipse(200, 350, 30, 30);

  //next button
  fill(0);
  rectMode(CENTER);
  rect(350, 250, 20, 20);

  //back button
  fill(0);
  rectMode(CENTER);
  rect(50, 250, 20, 20);



  //   //text("Now I’m going back to the bowl, trying to capture the value.", 0, 250);
  //   noFill();
  //   //strokeWeight(4);
  //   noStroke();
  //   ellipseMode(CENTER);
  //   ellipse(179, 113, 62, 62);
  //   rollOver();
  console.log(state);
  // }
}


function displayArt() {
  image(expertEart, 0, 0);
}
//   // if (state == 3) {
//   //   image(expertDart, 0, 0);
//   // }

// }

// function displayLowLev() {
//   image(expertElow, 0, 0);
// }

// function displayExpertD() {
//   image(expertD, 0, 0);
// }


// function rollOver() {
//   let d = dist(mouseX, mouseY, 179, 113);
//   if (d < 62 && state == 1) {
//     fill(0);
//     textSize(16);
//     text("Now I’m going back to the bowl, trying to capture the value.", 0, 250, 400, 400);
//     //console.log("mouse is over bowl");
//   }
//   //else{
//   //   fill(0);
//   //   text(" ");
//   // }
// }



function mousePressed() {
  let pA = dist(mouseX, mouseY, 200, 300); //position over art decision button
  // let pL = dist(mouseX, mouseY, 200, 350);
  let pN = dist(mouseX, mouseY, 350, 250); //position over "next button"
  let pB = dist(mouseX, mouseY, 50, 250);

  //next & back conditions
  if (pN < 20) {
    state += 1;
  }

  if (pB < 20) {
    state -= 1;
  }

  //artistic decisions category
  if (pA < 30) {
    if (state == 1) {
      state = 1.1;
    }
    if (state == 2) {
      state = 2.1;
    }
  }



  //can these be elses??
  if (pA > 30 && state == 1.1) {
    state = 1;
  }
  if (pA > 30 && state == 2.1) {
    state = 2;
  }





}

// if (pL < 30) {
//   displayLowLev();
//   state = 2;
// }



// // if (state == 3 && pA < 30) {
// //   image(expertDart, 0, 0);
// // }


// }

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
  
  //image(expertE, 0, 0);
  reload();
  
  fill(255, 89, 0);
  noStroke();
  ellipse(200, 300, 30, 30);
  
  fill(115, 194, 251);
  noStroke();
  ellipse(200, 350, 30, 30);
  
  
  //text("Now I’m going back to the bowl, trying to capture the value.", 0, 250);
  noFill();
  //strokeWeight(4);
  noStroke();
  ellipseMode(CENTER);
  ellipse (179, 113, 62, 62);
  rollOver(); 
  //console.log(state);
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
    //console.log("mouse is over bowl");
   } 
    //else{
  //   fill(0);
  //   text(" ");
  // }
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
  //text("Now I’m going back to the bowl, trying to capture the value.", 0, 250);
  noFill();
  //strokeWeight(4);
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

// function displayText(){
//  text("Now I’m going back to the bowl, trying to capture the value.", 0, 300); 
// }
  


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
  //buttonA = createButton("artistic decisions");
  //buttonL = createButton("lower level features");
  image(expertE, 0, 0);
  //buttonA.mousePressed(displayArt);
  //buttonL.mousePressed(displayLowLev);
  
  fill(255, 89, 0);
  noStroke();
  buttonA = ellipse(200, 300, 30, 30);
  
  fill(115, 194, 251);
  noStroke();
  ellipse(200, 350, 30, 30);
  
  
  
} 

function draw(){
  //text("Now I’m going back to the bowl, trying to capture the value.", 0, 250);
  noFill();
  //strokeWeight(4);
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

// function displayText(){
//  text("Now I’m going back to the bowl, trying to capture the value.", 0, 300); 
// }
  


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
  //buttonA = createButton("artistic decisions");
  //buttonL = createButton("lower level features");
  image(expertE, 0, 0);
  //buttonA.mousePressed(displayArt);
  //buttonL.mousePressed(displayLowLev);
  
  fill(255, 89, 0);
  noStroke();
  buttonA = ellipse(200, 300, 30, 30);
  
  fill(115, 194, 251);
  noStroke();
  ellipse(200, 350, 30, 30);
  
  
  
} 

function draw(){
  noFill();
  //strokeWeight(4);
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

// function displayText(){
//  text("Now I’m going back to the bowl, trying to capture the value.", 0, 300); 
// }
  


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
  //buttonA = createButton("artistic decisions");
  //buttonL = createButton("lower level features");
  image(expertE, 0, 0);
  //buttonA.mousePressed(displayArt);
  //buttonL.mousePressed(displayLowLev);
  
  fill(255, 89, 0);
  noStroke();
  buttonA = ellipse(200, 300, 30, 30);
  
  fill(115, 194, 251);
  noStroke();
  ellipse(200, 350, 30, 30);
  
  
  
} 

function draw(){
  noFill();
  //strokeWeight(4);
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
  // if (mouseX > 200) {
  //   background(10);
  // } else {
  //   background(220);
  // }
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
  //strokeWeight(4);
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
}// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/RPMYV-eb6ll

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
}// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/unm0BLor8aE

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
      //console.log(word);
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
  //background(img);
  
  for (let y = 0; y < height; y += 10){
    for (let x = 0; x < width; x += 10) { 
      noStroke();
      col = img.get(x, y);
      fill(col);
      rect(x, y, 10, 10);
    }
  }
  img.updatePixels();
  
}//let ball;
let balls = []; //declaring array!
let sound;

function preload(){
  sound = loadSound("Cartoon_Boing.mp3");
}

function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  /* upon a mouse press a new ball object of random position and speed is created
  and added to the end of the array */
  let b = new Ball(random(width), random(height), random(-5, 5), random(-5, 5));
  balls.push(b);
}

function draw() {
  background(220);
  //runs the ball's display, move, and bounce functions in a loop
  for (let i = 0; i < balls.length; i++) {
    balls[i].run()
  }
}let x;
let xspeed = 10;

function setup() {
  createCanvas(400, 400);
  // Initialize the ball at the left edge and middle height
  x = 0;
}

function draw() {
  background(220);
  
  //Draw the ball
  ellipse(x, height/2, 50, 50);
  
  // Move the ball
  x+=xspeed;
  
  // Turn around when you cross a border
  if(x > width || x < 0) xspeed *=-1;
  
  //Move the ball
	// When you get to the opposite edge stop and turn around
  // Start to go back to original spot
  // And then turn around and go back to the other edge
  // Forever
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
  //console.log(mouth);
  translate(width / 2, height / 2);
  rotate(-5 * (PI / 180));
  scale(3);
  texture(teeth);
  ellipse(-130, -80, 250, teeth.height + mouth);
  //this distortion is not quite right. It's on an angle.
  //how can I fix this?

}// Get your own API Key @http://developer.nytimes.com
let allWords = [];
let ts = 16;
let i = 0;

function preload() {
  //your query, searching for "trump" in the NYT API
  let q = "trump";
  let apikey = "Get your own API from http://developer.nytimes.com";
  let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + q + "&api-key=" + apikey;
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

//looping through the document objects (the articles)
  for (let doc of docs) {
    //take snippet for article
    //split into array of words
    //store the words in an array called "words"
    let words = splitTokens(doc.snippet);
    //loop through the indices of the words array
    for (let w in words) {
      //store the word at position w, in a variable called word
      let word = words[w];
      //for every trump in the trumps array
      for (let trump of trumps) {
        //does the word equal to trump
        if (match(word, trump)) {
          //if true, replace trump word, with a random word from the putin array
          words[w] = putins[floor(random(putins.length))];
          //exit the trump of trumps loop because a match was made
          break;
        }
      }
      //shuffle words so that they are not in coherent sentences
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
  serial = new p5.SerialPort();
  var portlist = serial.list();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('connected', serverConnected);
  serial.on('list', gotList);
  serial.on('data', gotData);
  serial.on('error', gotError);
  serial.on('open', gotOpen);
  fft = new p5.FFT();
  frameRate(100);
  fft.setInput(song);

}

function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is open!");
}

function gotError(theerror) {
  print(theerror);
}

function gotData() {
  //var currentString = serial.readStringUntil("\r\n");
  photoVal = serial.read();
  // if (currentString) {
  //console.log(photoVal);

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

    // if (hmidVal < 200) {
    //   hmidVal = 0;
    // }

    if (trebVal < 25) {
      trebVal = 0;
      //console.log(trebVal);
    }
  

    serial.write('B');
    serial.write(bassVal);
  
  	serial.write('L');
  	serial.write(lmidVal);
  	//console.log(lmidVal);
  
  	serial.write('M');
  	serial.write(midVal);

    serial.write('H');
    serial.write(hmidVal);

    serial.write('T');
    serial.write(trebVal);
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
  // mic = new p5.AudioIn();
  // fft.setInput(mic);
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
var serial;

function preload(){
	song = loadSound("thriller.mp3");
}
function setup() {
  createCanvas(400, 400);
  
  serial = new p5.SerialPort();
	serial.open(portName);
  
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

  serial.write('B');
  serial.write(bassVal);
  
  serial.write('M');
  serial.write(midVal);
  
  serial.write('T');
  serial.write(trebVal);
}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var inData; // for incoming serial data
var outByte = 0; // for outgoing data
var fft, song;
function preload(){
    song = loadSound("icon.mp3");

  
}
function setup() {
  createCanvas(400, 300); // make the canvas
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName); // open a serial port
    fft = new p5.FFT();
  frameRate(100);
  song.play();
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  //var currentString = serial.readStringUntil("\r\n");
  var currentString = serial.read();
  console.log(currentString);
}

function serialEvent() {
  // read a byte from the serial port:
  var inByte = serial.read();
  // store it in a global variable:
  inData = inByte;
}

function serialError(err) {
  console.log('Something went wrong with the serial port.' + err);
}

function draw() {
  // black background, white text:
  background(0);
  fill(255);
  // display the incoming serial data as a string:
  text("incoming value: " + inData, 30, 30);
}

function mouseDragged() {
 // map the mouseY to a range from 0 to 255:
 outByte = int(map(mouseY, 0, height, 0, 255));
 // send it out the serial port:
 serial.write(outByte);
}

function keyPressed() {
 if (key >=0 && key >=9) { // if the user presses 0 through 9
 outByte = byte(key * 25); // map the key to a range from 0 to 225
 }
 serial.write(outByte); // send it out the serial port
}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var inData; // for incoming serial data
var outByte = 0; // for outgoing data
var fft, song;
function preload(){
    song = loadSound("icon.mp3");

  
}
function setup() {
  createCanvas(400, 300); // make the canvas
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName); // open a serial port
    fft = new p5.FFT();
  frameRate(100);
  song.play();
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  //var currentString = serial.readStringUntil("\r\n");
  var currentString = serial.read();
  console.log(currentString);
}

function serialEvent() {
  // read a byte from the serial port:
  var inByte = serial.read();
  // store it in a global variable:
  inData = inByte;
}

function serialError(err) {
  console.log('Something went wrong with the serial port.' + err);
}

function draw() {
  // black background, white text:
  background(0);
  fill(255);
  // display the incoming serial data as a string:
  text("incoming value: " + inData, 30, 30);
}

function mouseDragged() {
 // map the mouseY to a range from 0 to 255:
 outByte = int(map(mouseY, 0, height, 0, 255));
 // send it out the serial port:
 serial.write(outByte);
}

function keyPressed() {
 if (key >=0 && key >=9) { // if the user presses 0 through 9
 outByte = byte(key * 25); // map the key to a range from 0 to 225
 }
 serial.write(outByte); // send it out the serial port
}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var inData; // for incoming serial data
var outByte = 0; // for outgoing data
var fft, song;

function preload(){
    song = loadSound("YDKM.mp3");
}
function setup() {
  createCanvas(400, 300); // make the canvas
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.open(portName); // open a serial port
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
  serial.write(bassVal);
  serial.write(trebVal);
}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var inData; // for incoming serial data
var outByte = 0; // for outgoing data
var fft, song;
function preload(){
    song = loadSound("icon.mp3");

  
}
function setup() {
  createCanvas(400, 300); // make the canvas
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName); // open a serial port
    fft = new p5.FFT();
  frameRate(100);
  song.play();
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  //var currentString = serial.readStringUntil("\r\n");
  var currentString = serial.read();
  console.log(currentString);
}

function serialEvent() {
  // read a byte from the serial port:
  var inByte = serial.read();
  // store it in a global variable:
  inData = inByte;
}

function serialError(err) {
  console.log('Something went wrong with the serial port.' + err);
}

function draw() {
  // black background, white text:
  background(0);
  fill(255);
  // display the incoming serial data as a string:
  text("incoming value: " + inData, 30, 30);
}

function mouseDragged() {
 // map the mouseY to a range from 0 to 255:
 outByte = int(map(mouseY, 0, height, 0, 255));
 // send it out the serial port:
 serial.write(outByte);
}

function keyPressed() {
 if (key >=0 && key >=9) { // if the user presses 0 through 9
 outByte = byte(key * 25); // map the key to a range from 0 to 225
 }
 serial.write(outByte); // send it out the serial port
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
  serial = new p5.SerialPort();
  var portlist = serial.list();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('connected', serverConnected);
  serial.on('list', gotList);
  serial.on('data', gotData);
  serial.on('error', gotError);
  serial.on('open', gotOpen);

}

function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is open!");
}

function gotError(theerror) {
  print(theerror);
}

function gotData() {
  //var currentString = serial.readStringUntil("\r\n");
  photoVal = serial.read();
  // if (currentString) {
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
  //song = loadSound("Thriller_3mb.mp3", loaded);
  //song = loadSound("Thrill_3mb.mp3");
  slider = createSlider(0, 1, 0.5, 0.01);
  //song.play();

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();


  serial.open("/dev/cu.usbmodem1411");
  serial.on('connected', serverConnected);
  serial.on('list', gotList);
  serial.on('data', gotData);
  serial.on('error', gotError);
  serial.on('open', gotOpen);

}

//callback to this if you want an animation to start 
//covers "loading..." screen
// function loaded(){
//   song.play()
// }  


// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is open!");
}

function gotError(theerror) {
  print(theerror);
}

function gotData() {
  //var currentString = serial.readStringUntil("\r\n");
  photoVal = serial.read();
  // if (currentString) {
  //console.log(photoVal);

  if (photoVal > 10) {
    startParty = false;
  } else {
    startParty = true;
  }


  if (startParty == true && asp == true) {
    //do nothing, just chill
  }
  else if(startParty == true && asp == false){
    //trigger
    song.play();
    asp = true;
  }
  else if(asp == true && startParty == false){
    // stop the music
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

// function preload(){
// 	song = loadSound("Thriller_3mb.mp3");
// }

function setup() {
  createCanvas(400, 400);
  song = loadSound("Thriller_3mb.mp3", loaded);
  slider = createSlider(0,1,0.5, 0.01);
	//song.play();
									 
}

//callback to this if you want an animation to start 
//covers "loading..." screen
function loaded(){
  song.play()
}  

function draw() {
  background(220);
  song.setVolume(slider.value());
}// Get your own API Key @http://developer.nytimes.com
let allWords = [];
let ts = 16;
let i = 0;

//what am i asking the NYT for?
function preload() {
  let q = "trump";
  let apikey = "5fcc7b03d74d15972346cf84719ad5e5:13:68130021";
  let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + q + "&api-key=" + apikey; //sending NYT this
  //a query to search this URL (article archive) identifying me as the apikey
  loadJSON(url, processSnippets); //callback function
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


//size of words are changing
//words are fading
//words are drawn to the screen
//random position (one at a time)
// small to big to small againlet txt;
let tokens = [];

function preload() {
  txt = loadStrings('quiz7_text.txt');
  console.log(txt);
}

function setup() {
  createCanvas(400, 400);
  //this loop will create an array of each word in an index if there are line breaks/carriage returns
  //in the original text file
  for (let l of txt) {
    tokens = concat(tokens, splitTokens(l));
  }
  console.log(tokens);


  //tokens = splitTokens(txt[0]);
  //this function takes strings, so you have to tell it what the string is within the array
  //will put each word into a diff index of the array

}

function draw() {
  background(220);
  //how do we display text?
  //loop to display one word at a time
  let x = 0;
  let y = 50; //declare these outside the loop so they don't get reset every loop
  for (let token of tokens) {
    text(token, x, y);
    x = x + textWidth(token) + textWidth('a'); //make the space proportional to text size
    if (x > width - 30) { //provides padding
      y += textAscent(token);
      x = 0;
    }
  }
}// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log("DATA: " + currentString); // println the string
  latestData = currentString; // save it for the draw method
}

function draw() {
  background(127, 0, 127);

  //var v = mouseX
  var v = map(latestData, 0, 1023, 0, width);

  // Left Eye
  ellipse(width * .4, height * .4, v * .25 + 10, v * .25 + 10);

  // Right Eye
  ellipse(width * .6, height * .4, (2500 / v) + 10, (2500 / v) + 10);

  // Mouth
  bezier(width * .3, v * .6 + height / 2, width * .4, height * .8, width * .6, height * .8, width * .7, v * .55 + height / 2);

  v += random(-5, 5);
  // Nose
  bezier(width * .5, height * .5, v * .6, height * .6, v * .6, height * .8, width * .45, height * .67);

}// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log("DATA: " + currentString); // println the string
  latestData = currentString; // save it for the draw method
}

function draw() {
  background(127, 0, 127);

  //var v = mouseX
  var v = map(latestData, 0, 1023, 0, width);

  // Left Eye
  ellipse(width * .4, height * .4, v * .25 + 10, v * .25 + 10);

  // Right Eye
  ellipse(width * .6, height * .4, (2500 / v) + 10, (2500 / v) + 10);

  // Mouth
  bezier(width * .3, v * .6 + height / 2, width * .4, height * .8, width * .6, height * .8, width * .7, v * .55 + height / 2);

  v += random(-5, 5);
  // Nose
  bezier(width * .5, height * .5, v * .6, height * .6, v * .6, height * .8, width * .45, height * .67);

}// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

function setup() {
   createCanvas(600, 600);
  noFill();
  strokeWeight(10);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);
  setInterval(function() {
    console.log("HELLO");
    serial.write(1);
  }, 1000);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log("DATA: " + currentString); // println the string
  latestData = currentString; // save it for the draw method
}
function draw() { 
  background(127, 0, 127);
  
  var v = mouseX; 

  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  // Mouth
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
  
  v+=random(-5, 5);
  // Nose
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

//this is only correct if the browser window is positioned a
//certain way, because the elements have relative sizing?function setup() {
  noCanvas();
}

function draw() {
  background(220);
}let ripples = [];
let bkr; //background red value
let bkg; //background green value

function setup() {
  createCanvas(600, 400);
  //changes the background color with each run of the program:
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
//For each mouse click, create a new ripple object at the mouse x & y position
//Add each new ripple to the end of the array
// function mouseClicked() {
//   let ripple = new Ripple(mouseX, mouseY, 0, 0);
//   ripples.push(ripple);
// }

//redraw the background each loop
//for each array index run the ripple display and grow functions
//this allows each object to animate independently
function draw() {
  background(bkr, bkg, 255);
  for (let i = 0; i < ripples.length; i++) {
    ripples[i].run();
  }
}let ripples = [];
let bkr; //background red value
let bkg; //background green value

function setup() {
  createCanvas(600, 400);
  //changes the background color with each run of the program:
  bkr = random(0, 255);
  bkg = random(0, 255);
  background(bkr, bkg, 255);
}

//For each mouse click, create a new ripple object at the mouse x & y position
//Add each new ripple to the end of the array
function mouseClicked() {
  let ripple = new Ripple(mouseX, mouseY, 0, 0);
  ripples.push(ripple);
}

//redraw the background each loop
//for each array index run the ripple display and grow functions
//this allows each object to animate independently
function draw() {
  background(bkr, bkg, 255);
  for (let i = 0; i < ripples.length; i++) {
    ripples[i].run()
  }
}var serial;
let bg = 0;

function setup() {
  createCanvas(600, 600);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1421");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  //var currentString = serial.readStringUntil("\r\n");
var currentString = serial.read();
  // if (currentString) {
     console.log(currentString);
     bg = int(currentString);
  // }
}

function draw() {
  background(bg);
  // Polling method
  /*
    if (serial.available() > 0) {
      var data = serial.read();
      ellipse(50,50,data,data);
    }
  */
}//let ball;
let balls = []; //declaring array!

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++) {
    let b = new Ball(random(width), random(height), random(-5, 5), random(-5, 5));
    balls.push(b);
  }
}

function mousePressed() {
  /* upon a mouse press a new ball object of random position and speed is created
  and added to the end of the array */

}

function draw() {
  background(220);
  //runs the ball's display, move, and bounce functions in a loop
  for(let ball in balls){
    balls[ball].run();
    if (balls[ball].isNear(mouseX, mouseY)) {
      balls.splice(ball, 1);
    }
}
} //let ball;
let balls = []; //declaring array!

function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  /* upon a mouse press a new ball object of random position and speed is created
  and added to the end of the array */
  let b = new Ball(random(width), random(height), random(-5, 5), random(-5, 5));
  balls.push(b);
}

function draw() {
  background(220);
  //runs the ball's display, move, and bounce functions in a loop
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
let bkr; //background red value
let bkg; //background green value

function setup() {
  createCanvas(600, 400);
  //changes the background color with each run of the program:
  bkr = random(0, 255);
  bkg = random(0, 255);
  background(bkr, bkg, 255);
}

//For each mouse click, create a new ripple object at the mouse x & y position
//Add each new ripple to the end of the array
function mouseClicked() {
  let ripple = new Ripple(mouseX, mouseY, 0, 0);
  ripples.push(ripple);
}

//redraw the background each loop
//for each array index run the ripple display and grow functions
//this allows each object to animate independently
function draw() {
  background(bkr, bkg, 255);
  for (let i = 0; i < ripples.length; i++) {
    ripples[i].run()
  }
}//let ball;
let balls = []; //declaring array!

function setup() {
  createCanvas(400, 400);
  x = 0;
  for (let i = 0; i < 10; i++) {
    //create a ball
    //store each ball in an array spot labled with i sequentially
    //balls [i] = new Ball(random(width), random(height), random(-5, 5), random(-5, 5));
    //^placing i into is more useful if you need to affect certain index numbers like
    //make every other object do something, make just the one at index 7, etc.
    balls.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
  }
}


function draw() {
  background(220);
  // for(let i = 0; i < balls.length; i++){
  //   balls[i].run();
  // }
  for (let b in balls) {
    balls[b].run();
    //if mouse is in the ball, then delete it 
    //remove ball that has been moused over
    // if (dist(mouseX, mouseY, balls[b].x, balls[b].y) <25) {
    //   balls.splice(b, 1); //at bth ball, remove one item in array
    if (balls[b].isNear(mouseX, mouseY)) {
      balls.splce(b, 1);
    }
  }
}let ripple0;
let ripple1;

let bkr; //background red value
let bkg; //background green value
let clicked = false;

function setup() {
  createCanvas(600, 400);
  //changes the background with each run of the program:
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
  //ripple1 = new Ripple(clickX*2, clickY*2, 0, 0); //for 2 ripples in diff positions
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
    this.w = w; //size
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
let xspeed = 11; //ball hits all 4 sides when xspeed and yspeeds differ
let yspeed = 6; //how would we make this more random and not in a set pattern? Can we?

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
}//Create a grid of 10 columns and 5 rows. 
//(EXTRA-CHALLENGE: When you mouseover a cell, fill that cell with a shade of gray that is related in some way to its column and row.)

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
      //The dots are solely to help visualize the (x, y) of each rect
      fill('red');
      ellipse(x, y, 3, 3);
	}
 }
}
//This program creates a growing ellipse upon a mouse click:
//UPDATE 10/1:
//Modified to include a created function grow

var rw = 0; //ripple width
var rh = 0; //ripple height
var clickX; //mouse X position when clicked
var clickY; //mouse Y position when clicked
var bkr; //background red value
var bkg; //backgrount green value
//var bkb; //background blue value

function setup() {
  createCanvas(600, 400);
  bkr = random(0, 255);
  bkg = random(0, 255);
  //bkb = random(0,255);
  background(bkr, bkg, 255);

}

function draw() {
  background(bkr, bkg, 255);
  noFill();
  ellipse(clickX, clickY, rw, rh);
  
  //grow can now be used with any shape and it will grow in the same way
  //Try the line, it has a quirky movement!
  //rect(clickX, clickY, rw, rh);
  //line(clickX, clickY, rw, rh);
  grow();
}


function mouseClicked() {
  //reseting the width and height to 0 with each mouse click,
  //so that a ripple will start over its small to larger growth cycle
  rw = 0;
  rh = 0; 
  clickX = mouseX;
  clickY = mouseY;

}

//does not take parameters because it is specifically setting growth a certain way
//does not return a value
function grow(){
  rw = rw + 2;
  rh = rh + 1;
  
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  //loop draws columns
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
}//Checkerboard switch

var num = 10; //change this to create a diff number of squares in the grid of num x num
var Switch = false;

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  noStroke();
  //for loops create the rows and columns of squares 
  for (var row = 0; row < num; row++) {
    
    for (var col = 0; col < num; col++) {
      var ver = row * height / num;
      var hor = col * width / num;
      //if (Switch == true) { //turns the filling of squares into a switch
        if (row % 2 == 0 && col % 2 == 0) { //if row and column are even, fill black 
          fill('black')
          rect(hor, ver, width / num, height / num);
        } else if (row % 2 == 1 && col % 2 == 1) { //if row and column are odd, fill black 
          fill('black')
          rect(hor, ver, width / num, height / num);
        } else {
          fill('white')
          rect(hor, ver, width / num, height / num);
        }
      
      
      //}
      //fills in squares differently if the switch is in a diff state
      /*if (Switch == false) {
        if (row % 2 == 0 && col % 2 == 0) { //if row and column are even, fill white 
          fill('white')
          rect(hor, ver, width / num, height / num);
        } else if (row % 2 == 1 && col % 2 == 1) { //if row and column are odd, fill white
          fill('white')
          rect(hor, ver, width / num, height / num);
        } else {
          fill('black')
          rect(hor, ver, width / num, height / num);
        }
      }*/
      //turns top left square into a mouse roll over (to indicate it's a button)
      if (mouseX < width / num && mouseY < height / num && row == 0 && col == 0) { 
        fill(0,128,128);
        rect(hor, ver, width / num, height / num);
      	noStroke();
      }
      
    }

  }


// turns the top left square into a button to toggle switching of the checkboard
/*function mousePressed() {  
  if (mouseX < width / num && mouseY < height / num) {
    Switch = !Switch;
  }*/
}//Checkerboard switch

var num = 10; //change this to create a diff number of squares in the grid of num x num
var Switch = false;
var x = 0;
var xspeed = .01;

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  noStroke();

  //for loops create the rows and columns of squares 
  for (var row = 0; row < num; row++) {
    for (var col = 0; col < num; col++) {
      var ver = row * height / num;
      var hor = col * width / num;
      if (Switch == true) {
        //turns the filling of squares into a switch
        if (row % 2 == 0 && col % 2 == 0) { //if row and column are even, fill black 
          fill('black')
          rect(hor, ver, width / num, height / num);
        } else if (row % 2 == 1 && col % 2 == 1) { //if row and column are odd, fill black 
          fill('black')
          rect(hor, ver, width / num, height / num);
        } else {
          fill('white')
          rect(hor, ver, width / num, height / num);
        }

      }
      //fills in squares differently if the switch is in a diff state
      if (Switch == false) {
        //bouncing ball
        fill('teal');
        rect(x, x, width / num, height / num);
        x += xspeed;
        if (x > width || x < 0) xspeed *= -1;

        //turns the filling of squares into a switch
        if (row % 2 == 0 && col % 2 == 0) { //if row and column are even, fill white 
          fill('white')
          rect(hor, ver, width / num, height / num);
        } else if (row % 2 == 1 && col % 2 == 1) { //if row and column are odd, fill white
          fill('white')
          rect(hor, ver, width / num, height / num);
        } else {
          fill('black')
          rect(hor, ver, width / num, height / num);
        }
      }
      //turns top left square into a mouse roll over (to indicate it's a button)
      if (mouseX < width / num && mouseY < height / num && row == 0 && col == 0) {
        fill(0, 128, 128);
        rect(hor, ver, width / num, height / num);
        noStroke();
      }
    }

  }
}

// turns the top left square into a button to toggle switching of the checkboard
function mousePressed() {
  if (mouseX < width / num && mouseY < height / num) {
    Switch = !Switch;
  }

}//Checkerboard switch

var num = 10; //change this to create a diff number of squares in the grid of num x num
var Switch = false;

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  noStroke();
  //for loops create the rows and columns of squares 
  for (var row = 0; row < num; row++) {
    for (var col = 0; col < num; col++) {
      var ver = row * height / num;
      var hor = col * width / num;
      if (Switch == true) { //turns the filling of squares into a switch
        if (row % 2 == 0 && col % 2 == 0) { //if row and column are even, fill black 
          fill('black')
          rect(hor, ver, width / num, height / num);
        } else if (row % 2 == 1 && col % 2 == 1) { //if row and column are odd, fill black 
          fill('black')
          rect(hor, ver, width / num, height / num);
        } else {
          fill('white')
          rect(hor, ver, width / num, height / num);
        }
      }
      //fills in squares differently if the switch is in a diff state
      if (Switch == false) {
        if (row % 2 == 0 && col % 2 == 0) { //if row and column are even, fill white 
          fill('white')
          rect(hor, ver, width / num, height / num);
        } else if (row % 2 == 1 && col % 2 == 1) { //if row and column are odd, fill white
          fill('white')
          rect(hor, ver, width / num, height / num);
        } else {
          fill('black')
          rect(hor, ver, width / num, height / num);
        }
      }
      //turns top left square into a mouse roll over (to indicate it's a button)
      if (mouseX < width / num && mouseY < height / num && row == 0 && col == 0) { 
        fill(0,128,128);
        rect(hor, ver, width / num, height / num);
      	noStroke();
      }
    }

  }
}

// turns the top left square into a button to toggle switching of the checkboard
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

}//Divide the canvas into 3 vertical areas. 
//Hovering over each area changes that area to red.
//Challenge: Change the behavior so that if you click the mouse when you’re inside one of the areas, 
//it changes the background of that area to red and keeps it red until you mouse over it again. 
//Just try to get the right-most area working.


//create a toggle switch 
let panelOn = false;
let alreadyRed = true;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  //draw 3 rectangles, each one a third of the width of the canvas

  if (panelOn) { //if mouse is in the 3rd third, fill red on click
    fill('red');
    rect(2 * width / 3, 0, width / 3, height);
  }
}
 

function mousePressed() {
  if (mouseX > 2 * width / 3) {
    panelOn = true;
  }

}//Write pseudo-code to move a circle back and forth across the middle of the canvas. 
x = 0;
xSpeed = 1;

function setup() {
  createCanvas(400, 400);
  x = 0;
}

function draw() {
  background(220);
  //draw an ellipse (circle)
  //positon it at the left edge and @ 1/2 the height of canvas, so it is in the middle
  ellipse(x, height / 2, 50, 50);

  //move the circle by incrementing it's x position by a speed variable
  x += xSpeed;

  //create conditional so that the circle will reverse its direction:
  //if the circle is at an x position greater than the width of the canvas
  //then reverse its direction by changing the speed
  //OR if the circle's x position is back to zero
  //also then change the direction

  if (x > width || x < 0) {
    xSpeed *= -1; //by multiplying by negative one the direction changes
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
//In-Class exercise/Quiz 002 EC Question 3
//make the ball rise to the top in the same amt of time 
//no matter how TALL the canvas size is
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
  //yspeed = height/300; 
  //y decreases the height/# of frames
	//this will be 5 seconds
	//the speed is changing to reach the top in 5 seconds
	//if super tall it will have to move fast
	//if short it will have to move more slowly
  yspeed = (y-mouseY)/50; //follows mouse
  //whereever y is, find the distance from mouseY and
  //move to it 

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
//var bkb;

function setup(){
  createCanvas(600, 400);
  bkr = random(0,255);
  bkg = random(0,255);
  //bkb = random(0,255);
  background(bkr, bkg, 255);
  
}

function draw(){
    background(bkr, bkg, 255);
    noFill();
    ellipse(clickX, clickY, cw, ch);
    cw = cw+2;
    ch = ch+1;
  //}
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
}//This program creates a growing ellipse upon a mouse click:

var rw = 0; //ripple width
var rh = 0; //ripple height
var clickX; //mouse X position when clicked
var clickY; //mouse Y position when clicked
var bkr; //background red value
var bkg; //backgrount green value
//var bkb; //background blue value

function setup() {
  createCanvas(600, 400);
  bkr = random(0, 255);
  bkg = random(0, 255);
  //bkb = random(0,255);
  background(bkr, bkg, 255);

}

function draw() {
  background(bkr, bkg, 255);
  noFill();
  ellipse(clickX, clickY, rw, rh);
  rw = rw + 2;
  rh = rh + 1;
  //}
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


  //top left
  //x = x - 1;
  //y = y - 1;

  //top right
  //x = x+1;
  //y = y - 1;

  //bottom left
  //x = x-1;
  //y = y + 1;

  //bottom right
  //x = x + 1;
  //y = y + 1;


  //10x faster
  x = x - speed;
  y = y - speed;

}//Use mouseX + mouseY and the dist() function.

//variables for Part a:
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
  //console.log(width);
  x += mouseX-x*.03;
  y += mouseY-y *.03//why this multiplier
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

}//Coding Train vid 2.4
//var col = 0;
var r = 0;
var b = 255;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  //background
  r = map(mouseX, 0, 600, 0, 255);
  b = map(mouseX, 0, 600, 255, 0)
  background(r, 0, b);
  //col = map(mouseX, 0, 600, 0, 255);
  //col = mouseX;//not a perfect mapping, gets white at 255
  //ellipse
  fill(250, 118, 222);
  ellipse(mouseX, 200, 64, 64);
}var rw = 0; //ripple width
var rh = 0; //ripple height
var clickX; //X position of the mouse click
var clickY; //Y position of the mouse click

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
}/*var recWidth = 400;
var recHeight = 400;


function setup() {
  createCanvas(recWidth, recHeight);
  rectMode(CENTER, CENTER);
}

function draw() {
  background(220);
  //use translate so the origin is always at half 
  //the width and height
  translate(recWidth / 2, recHeight / 2) 
  rect(0, 0, recWidth * .1, recHeight * .1);

}*/

//below uses variables given to us by p5
//we do not need to declare or initialize
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
  //background(220);
}

function draw() {
  background(fillColor);
  noStroke();
  fill(fillColor);
  ellipse(200, 200, w, h);

  /*circleX = circleX +1;
  circleY = circleY +2;
  w = w +1;
  h = h + 1;*/
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

  //dog body  
  fill(139, 69, 19);
  ellipse(200, 340, 155, 240);

  //cat body
  fill(105, 105, 105);
  ellipse(200, 150, 90, 120);

  //dog ears
  fill(139, 69, 19);
  quad(140, 140, 160, 150, 140, 190, 100, 190); //left
  quad(260, 140, 300, 190, 260, 190, 240, 150); //right

  //dog mouth
  fill('tan');
  rectMode(CENTER);
  rect(200, 300, 40, 15);

  //dog face
  fill('tan');
  quad(160, 140, 240, 140, 280, 200, 120, 200); //top half
  quad(120, 200, 280, 200, 240, 260, 160, 260); //bottom half

  // cat paws  
  fill('gray');
  ellipse(175, 150, 25, 20);
  ellipse(225, 150, 25, 20);

  //dog eyes
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

  //dog snout
  fill('white');
  quad(185, 190, 215, 190, 235, 300, 160, 300);

  //nose
  fill('black');
  rectMode(CENTER);
  rect(200, 275, 30, 25, 5);

  //cat ears
  fill('gray');
  triangle(160, 70, 200, 100, 165, 100)
  triangle(240, 70, 200, 100, 235, 100)
  fill('pink');
  triangle(160, 70, 190, 100, 165, 100); //left
  triangle(240, 70, 210, 100, 235, 100); //right

  //cat face
  //ellipseMode(CENTER);
  fill('gray');
  ellipse(200, 115, 82, 62);

  //cat mouth
  ellipse(200, 145, 23, 12);
  fill(169, 169, 169);
  ellipse(187, 140, 25, 15);
  ellipse(213, 140, 25, 15);

  //cat nose
  fill('pink');
  triangle(190, 132, 210, 132, 200, 142);

  //cat eyes
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

  noStroke(); //for no outline
  fill('turquoise');
  
  
  //fill(8, 232, 222);
  /* according to https://www.beautycolorcode.com/08e8de
  this is an RGB value for 'bright turquoise'*/
  
  ellipseMode(CENTER);//creates ellipse with (x,y) as its center
  ellipse(200, 200, 100, 100);
}/* Place createCanvas within the setup() function
to be callaed at the start of the program and executed only once */

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(100);



}