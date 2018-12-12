function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0, 0, 0);
  fill(0);
  spacedCircles();
}

function spacedCircles() {
  fill(255, 0, 0);
  var maxD = 1100;


  for (i = 11; i > 0; i--) {

    if (i % 2 == 0) {
      fill(0, 255, 0);
      ellipse(width/2 + (maxD/TWO_PI) + PI, height / 2, maxD, maxD);
    } else {
      fill(0, 0, 255);
      ellipse(width / 2 - (maxD / TWO_PI), height / 2, maxD, maxD);
    }

    maxD = maxD / 2;
  }
}let i = 400;
let initial_i = i;
let offset = -1;
let init_r = 255;
let init_g = 0;
let init_b = 255;
let opac;
let new_fill;
let fill2;
let rand_opac;

function setup() {
  background(0, 0, 0, 255);
  // opac = (width / 255) * ((100 / initial_i*i));
  new_fill = color(init_r, init_g, init_b, 255);
  fill2 = color(random(255), random(255), random(255), 255);

  // rand_opac = random(88);

	noFill();
  createCanvas(800, 800);
  rectMode(CENTER);

}

function draw() {
  opac = random(50) + 50;
  // background(0, 0, 0, 255);
	// frameRate(60);
  // noStroke();
  // noFill();
	// smooth();
	circles1(random(38));
	// circles4(random(40));
	// circles2();
	// circles3();
  if (i < 5) {
    i = 400;
    print(opac);
    new_fill = color(random(255), random(255), random(255), 255);
    fill2 = color(random(255), random(255), random(255), 255);
  }
  i=i-25;
  
}


function circles1(size) {

  


		
// 		if (i%2 == 0) {
// 			fill(255, 255, 255, opac);
// 		}
		
// 		else {
// 		 fill(0, 0, 0, opac);
// 		}
    // print(opac);
    stroke(new_fill);
  	var rando = random(i);
    strokeWeight(1);
		rect(sin(rando)*width, i, size, size);
		rect(width - sin(rando)*width, i, size, size);
    stroke(fill2);
    var rando1 = random(i);
		rect(cos(rando1)*(width-size), height-i, size, size)
    rect((width) - cos(rando1)*(width-size), height-i, size, size)
}


function circles2() {

	if (i>1) {  
		ellipse(i*6, sin(i)*height, i, i)
    ellipse(i*6, height - sin(i)*height, i, i)
		}
}

function circles3() {
	
	if (i>1) {	
		ellipse(width/2, cos(i)*height, i, i)

		}
}

function circles4(size) {		
  	fill(fill2);
    var rando1 = random(20);
		ellipse(cos(i)*(width-size), height-i, size, size)
    ellipse((width) - cos(i)*(width-size), height-i, size, size)
}var value = 0;

function setup() {
  createCanvas(displayWidth, displayHeight);
}

function draw() {
   background(0);
  
if (mouseIsPressed) {
  value = 255;
  fill (value);
  rect(0, 0, displayWidth, displayHeight);
  print(value);
 }
  else {
  value = 0;}
}

function touchStarted() {
  value = 255;
  fill (value);
  rect(0, 0, displayWidth, displayHeight);
}

function touchEnded() {
  value = 0;
  fill (value);
  rect(0, 0, displayWidth, displayHeight);
}
var osc;
var playing = false;
var posX;
var posY;
var frequency;
var volume;


function setup() {
  createCanvas(displayWidth, displayHeight);
  textAlign(CENTER);
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(240);
  osc.amp(0);
  osc.start();

}

function draw() {
  background(0);
  
  if (rotationX <= 90 && rotationX >= -90){
  posY = map(rotationX, -90, 90, 0, height);
  	}
  
  else if (rotationX > 90) {
  posY = height; 
  	}
  
  else if (rotationX < -90) {
  posY = 0;	
  }
  
  if (rotationY <= 90 && rotationY >= -90){
  posX = map(rotationY, -90, 90, 0, width);
  	}
  
    else if (rotationY > 90) {
  posX = width; 
  	}
  
   else if (rotationY < -90) {
  posX = 0;	
  }
  

  fill(255)
  ellipse(posX, posY, 10, 10);
  
  text("Please lock your device's orientation.", width/2, 20);
  text("Tap the screen to start.", width/2, 40);
	text("Move your device to control the tone!", width/2, 60);
  text(frequency, width/2, 80);
  stroke(255);
}

function deviceMoved() {   
  frequency = map(rotationY, -90, 90, 110, 1760);
  osc.freq(frequency);
  var volume = map(rotationX, -65, 65, 1, 0);
  osc.amp(volume, 0.05);
  print("we started");
}var canvasWidth = 400;
var canvasHeight = 400;
var cowloopi = 0;
var cowloopcolor;
cowloopdraw = false;

var kick1i = 0;
var kick1color;
kick1draw = false;

var snare1i = canvasWidth / 2;
var snare1color;
snare1draw = false;

var hati = 1;
var hatcolor;
hatdraw = false;

var hit1i = canvasWidth / 2;
var hit1color;
hit1draw = false;

var hit2i = canvasWidth / 2;
var hit2color;
hit2draw = false;

var hit3i = canvasWidth / 2;
var hit3color;
hit3draw = false;

var hit4i = 0;
var hit4color;
hit4draw = false;

var hit5i = canvasHeight / 2;
var hit5color;
hit5draw = false;

var hit6i = canvasHeight / 2;
var hit6color;
hit6draw = false;

var laseri = canvasHeight;
var lasercolor;
laserdraw = false;

var triggeri = 1;
var triggercolor;
triggerdraw = false;


function preload() {
  soundFormats('wav');
  beep = loadSound('assets/beep.wav');
  clap = loadSound('assets/clap.wav');
  click = loadSound('assets/click.wav');
  cowloop = loadSound('assets/cowloop.wav');
  hat = loadSound('assets/hat.wav');
  hit1 = loadSound('assets/hit1.wav');
  hit2 = loadSound('assets/hit2.wav');
  hit3 = loadSound('assets/hit3.wav');
  hit4 = loadSound('assets/hit4.wav');
  hit5 = loadSound('assets/hit5.wav');
  hit6 = loadSound('assets/hit6.wav');
  laser = loadSound('assets/laser.wav');
  kick1 = loadSound('assets/kick1.wav');
  kick2 = loadSound('assets/kick2.wav');
  snare1 = loadSound('assets/snare1.wav');
  snare2 = loadSound('assets/snare2.wav');
  trigger = loadSound('assets/trigger.wav');
  shake = loadSound('assets/shake.wav');
  snap = loadSound('assets/snap.wav');
}

function setup() {
  background(0);
  createCanvas(canvasWidth, canvasHeight);
  kick1.setVolume(1);
  hit2.setVolume(0.5);
  

}

function draw() {
  background(0);

  if (cowloopdraw == true) {
    cowloop_anim();
  }

  if (kick1draw == true) {
    kick1_anim();
  }

  if (snare1draw == true) {
    snare1_anim();
  }

  if (hatdraw == true) {
    hat_anim();
  }

  if (hit1draw == true) {
    hit1_anim();
  }

  if (hit2draw == true) {
    hit2_anim();
  }

  if (hit3draw == true) {
    hit3_anim();
  }

  if (hit4draw == true) {
    hit4_anim();
  }

  if (hit5draw == true) {
    hit5_anim();
  }

  if (hit6draw == true) {
    hit6_anim();
  }


  if (laserdraw == true) {
    laser_anim();
  }

  if (triggerdraw == true) {
    trigger_anim();
  }


}

function keyTyped() {
  switch (key) {
    case 'q':
      kick1.play();
      kick1draw = true;
      kick1color = color(random(100) + 155, 0, random(88) + 50, 200);
      break;

    case 'w':
      snare1.play();
      snare1draw = true;
      snare1color = color(random(100) + 155, random(88) + 50, 0, 200);
      break;

    case 'r':
      hat.play();
      hatdraw = true;
      hatcolor = color(255, 0, 0, 200);
      break;

    case 't':
      hit1.play();
      hit1draw = true;
      hit1color = color(88, random(88) + 50, random(100) + 155, 255);
      break;

    case 'y':
      hit2.play();
      hit2draw = true;
      hit2color = color(188, 0, 188, 200);
      break;

    case 'u':
      hit3.play();
      hit3draw = true;
      hit3color = color(188, 188, 0, 200);
      break;

    case 'i':
      laser.play();
      laserdraw = true;
      lasercolor = color(0, 255, 0, 200);
      break;

    case 'o':
      trigger.play();
      triggerdraw = true;
      triggercolor = color(255, 255, 255, 200);
      break;

    case 'p':
      cowloop.play();
      cowloopdraw = true;
      cowloopcolor = color(255, 255, 0, 200);
      break;

    case 'g':
      hit4.play();
      hit4draw = true;
      hit4color = color(255, 88, 0, 200);
      break;

    case 'h':
      hit5.play();
      hit5draw = true;
      hit5color = color(0, 0, 255, 200);
      break;

    case 'j':
      hit6.play();
      hit6draw = true;
      hit6color = color(0, 255, 255, 200);
      break;

    case 'p':
      value1 = 255;
      break;

    default:
      value = 255;

  }
}


function hit1_anim() {
  if (hit1draw == true) {
    fill(hit1color);
    rect(0, hit1i, width, 10);
    hit1i = hit1i - 10;
    if (hit1i < 0) {
      hit1draw = false;
      background(0);
      print("cleared");
      hit1i = canvasWidth / 2;
    }
  }
}

function hit2_anim() {
  if (hit2draw == true) {
    fill(hit2color);
    rect(0, hit2i, width, 10);
    hit2i = hit2i - 10;
    if (hit2i < 0) {
      hit2draw = false;
      background(0);
      print("cleared");
      hit2i = canvasWidth / 2;
    }
  }
}

function hit3_anim() {
  if (hit3draw == true) {
    fill(hit3color);
    rect(0, hit3i, width, 10);
    hit3i = hit3i - 10;
      if (hit3i < 0) {
      hit3draw = false;
      background(0);
      print("cleared");
      hit3i = canvasWidth / 2;
    }
  }
}

function hit4_anim() {
  if (hit4draw == true) {
    fill(hit4color);
    rect(0, hit4i, width, 10);
    hit4i = hit4i + 2.6;
    if (hit4i > canvasHeight) {
      hit4draw = false;
      background(0);
      print("cleared");
      hit4i = 0;
    }
  }
}

function hit5_anim() {
  if (hit5draw == true) {
    fill(hit5color);
    rect(0, hit5i, width, 10);
    hit5i = hit5i + 10;
    if (hit5i > canvasHeight) {
      hit5draw = false;
      background(0);
      print("cleared");
      hit5i = canvasHeight / 2;
    }
  }
}

function hit6_anim() {
  if (hit6draw == true) {
    fill(hit6color);
    rect(0, hit6i, width, 10);
    hit6i = hit6i + 2;
    if (hit6i > canvasHeight) {
      hit6draw = false;
      background(0);
      print("cleared");
      hit6i = canvasHeight / 2;
    }
  }
}


function laser_anim() {
  if (laserdraw == true) {
    fill(lasercolor);
    rect(0, laseri, width, 25);
    laseri = laseri - 1.8;
    if (laseri < 0) {
      laserdraw = false;
      background(0);
      print("cleared");
      laseri = canvasHeight;
    }
  }
}

function trigger_anim() {
  if (triggerdraw == true) {
    fill(triggercolor);
    rect(width / 2 - 25, random(height), 50, 50);
    triggeri = triggeri + 1;
    if (triggeri > 50) {
      triggerdraw = false;
      background(0);
      print("cleared");
      triggeri = 1;
    }
  }
}



function cowloop_anim() {
  if (cowloopdraw == true) {
    fill(cowloopcolor);
    rect(width / 4, height / 4, width / 2, random(100));
    cowloopi = cowloopi + 1;
    if (cowloopi > 100) {
      cowloopdraw = false;
      background(0);
      print("cleared");
      cowloopi = 0;
    }
  }
}

function kick1_anim() {
  if (kick1draw == true) {
    fill(kick1color);
    rect(width / 4, 0, width / 2, kick1i);
    kick1i = kick1i + 20;
    if (kick1i > height) {
      kick1draw = false;
      background(0);
      print("cleared");
      kick1i = 0;
    }
  }
}


function snare1_anim() {
  if (snare1draw == true) {
    fill(snare1color);
    rect(0, 0, snare1i, height);
    snare1i = snare1i - 10;
    if (snare1i < 0) {
      snare1draw = false;
      background(0);
      print("cleared");
      snare1i = canvasWidth / 2;
    }
  }
}


function hat_anim() {
  if (hatdraw == true) {
    fill(hatcolor);
    ellipse(random(width), random(height), 50, hati);
    hati = hati + 5;
    if (hati > 50) {
      hatdraw = false;
      background(0);
      print("cleared");
      hati = 1;
    }
  }
}let populations;
let objArray = [];
var up;
var textcolor;
var barcolor;
var opac;

function preload() {
  populations = loadTable("assets/simpleData_noRegions.csv", "csv", "header");
}

function setup() {
  // put setup code here
  createCanvas(1064, 640);

  console.log(populations.getRowCount() + " total rows in table");
  console.log(populations.getColumnCount() + " total columns in table");

  // how do we want to work with our Table Data?
  console.log(populations.getObject());

  console.log(populations.getArray());

  console.log(populations.getRows());



  // What if we want to work with an Array of Objects - let's create that
  // Create an array of objects - declare it globally to access it in draw function too

  for (let i = 0; i < populations.getRowCount(); i++) {

    // get the object from each CSV row - country, estimate, margin of error
    //console.log(populations.getRow(i));
    let oldObj = populations.getRow(i).obj;

    let newObj = {};
    newObj.country = oldObj.country;
    // interpret as a number instead of a string with parseInt
    newObj.estimate = parseInt(oldObj.estimate);
    newObj.error = parseInt(oldObj.marginOfError);
    // put the object into the array
    objArray.push(newObj);
  }

  console.log(objArray);



}

function draw() {
  background(0);
  noStroke();
  for (let i = 0; i < populations.getRowCount(); i++) {
    up = map(objArray[i].estimate, 0, 11643298, 0, 640);
        wide = map(objArray[i].estimate, 0, 7000000, 0, 1064);
    opac = map(objArray[i].estimate, 0, 11643298, 120, 70);


    if (i >= 0 && i < 8) {
      barcolor = color(128, 200, 255, opac);
    }
    if (i >= 8 && i < 15) {
      barcolor = color(0, 0, 255, opac);
    }

    if (i >= 15 && i < 21) {
      barcolor = color(128, 0, 255, opac);
    }

    if (i >= 21 && i < 38) {
      barcolor = color(255, 12, 0, opac);
    }

    if (i >= 38 && i < 44) {
      barcolor = color(0, 255, 0, opac);
    }

    if (i >= 44 && i < 54) {
      barcolor = color(255, 128, 0, opac);
    }
    if (i >= 54 && i < 64) {
      barcolor = color(255, 255, 0, opac);
    }
    if (i >= 64 && i < 75) {
      barcolor = color(255, 128, 255, opac);
    }

    if (i >= 75 && i < 80) {
      barcolor = color(128, 255, 0, opac);
    }
    if (i >= 80 && i < 83) {
      barcolor = color(255, 255, 128, opac);
    }
    if (i >= 83 && i < 87) {
      barcolor = color(255, 0, 255, opac);
    }

    if (i >= 87 && i < 89) {
      barcolor = color(0, 90, 255, opac);
    }
    if (i >= 89 && i < 95) {
      barcolor = color(255, 89, 90, opac);
    }

    if (i >= 95 && i < 98) {
      barcolor = color(0, 255, 255, opac);
    }

    if (i >= 98 && i < 111) {
      barcolor = color(90, 255, 128, opac);
    }

    if (i >= 111 && i < 120) {
      barcolor = color(90, 0, 90, opac);
    }
    if (i >= 120 && i < 131) {
      barcolor = color(90, 0, 255, opac);
    }

    if (i >= 131 && i < 133) {
      barcolor = color(255, 255, 255, opac);
    }

//     colorMode(HSB, 133)
    fill(barcolor);
    rectMode(CENTER);
    rect(532, i*5, wide, up);
    // colorMode(HSB, 133);
    fill(0);
    ellipse(532-wide/2, i*5, 10, up);
    ellipse(532+wide/2, i*5, 10, up);
  }

  
  
  
  var mousedivisor = int(mouseX / 8);

  if (mousedivisor <= 132) {
//     if (mousedivisor >= 0 && mousedivisor < 8) {
//       textcolor = color(128, 200, 255);
//     }

//     if (mousedivisor >= 8 && mousedivisor < 15) {
//       textcolor = color(0, 0, 255);
//     }

//     if (mousedivisor >= 15 && mousedivisor < 21) {
//       textcolor = color(128, 0, 255);
//     }

//     if (mousedivisor >= 21 && mousedivisor < 38) {
//       textcolor = color(255, 12, 0);
//     }

//     if (mousedivisor >= 38 && mousedivisor < 44) {
//       textcolor = color(0, 255, 0);
//     }

//     if (mousedivisor >= 44 && mousedivisor < 54) {
//       textcolor = color(255, 128, 0);
//     }

//     if (mousedivisor >= 54 && mousedivisor < 64) {
//       textcolor = color(255, 255, 0);
//     }

//     if (mousedivisor >= 64 && mousedivisor < 75) {
//       textcolor = color(255, 128, 255);
//     }
//     if (mousedivisor >= 75 && mousedivisor < 80) {
//       textcolor = color(128, 255, 0);
//     }

//     if (mousedivisor >= 80 && mousedivisor < 83) {
//       textcolor = color(255, 255, 128);
//     }
    
//      if (mousedivisor >= 83 && mousedivisor < 87) {
//       textcolor = color(255, 0, 255);
//     }

// 		if (mousedivisor >= 87 && mousedivisor < 89) {
//       textcolor = color(0, 90, 255);
//     }

//     if (mousedivisor >= 89 && mousedivisor < 95) {
//       textcolor = color(255, 89, 90);
//     }
    
//     if (mousedivisor >= 95 && mousedivisor < 98) {
//       textcolor = color(0, 255, 255);
//     }
    
     
//     if (mousedivisor >= 98 && mousedivisor < 111) {
//       textcolor = color(90, 255, 128);
//     }
    
//       if (mousedivisor >= 111 && mousedivisor < 120) {
//       textcolor = color(90, 0, 90);
//     }
    
//     if (mousedivisor >= 120 && mousedivisor < 131) {
//       textcolor = color(90, 0, 255);
//     }
    
//      if (mousedivisor >= 131 && mousedivisor < 133) {
//       textcolor = color(255, 255, 255);
//     }
    
  
    // fill(mousedivisor, 255, 255, 280-opac);
    // textSize(32)
    // var current_country = objArray[mousedivisor].country;
    // text(current_country, 2, 32);
    // var current_estimate = objArray[mousedivisor].estimate;
    // var current_error = objArray[mousedivisor].error;
    // text(current_estimate + " ± " + current_error, 2, 64);
  }
  // How might you sort the countries by population estimate?

  // How might you visually represent the population estimates?
  // Try a few different ways
  // Think about shape, color, text
  // Once you feel comfortable with drawing a static representation, think about adding interactivity
}let populations;
let objArray = [];
var up;
var textcolor;
var barcolor;
var opac;

function preload() {
  populations = loadTable("assets/simpleData_noRegions.csv", "csv", "header");
}

function setup() {
  // put setup code here
  createCanvas(1064, 640);

  console.log(populations.getRowCount() + " total rows in table");
  console.log(populations.getColumnCount() + " total columns in table");

  // how do we want to work with our Table Data?
  console.log(populations.getObject());

  console.log(populations.getArray());

  console.log(populations.getRows());



  // What if we want to work with an Array of Objects - let's create that
  // Create an array of objects - declare it globally to access it in draw function too

  for (let i = 0; i < populations.getRowCount(); i++) {

    // get the object from each CSV row - country, estimate, margin of error
    //console.log(populations.getRow(i));
    let oldObj = populations.getRow(i).obj;

    let newObj = {};
    newObj.country = oldObj.country;
    // interpret as a number instead of a string with parseInt
    newObj.estimate = parseInt(oldObj.estimate);
    newObj.error = parseInt(oldObj.marginOfError);
    // put the object into the array
    objArray.push(newObj);
  }

  console.log(objArray);



}

function draw() {
  background(0);
  noStroke();
  for (let i = 0; i < populations.getRowCount(); i++) {
    up = map(objArray[i].estimate, 0, 11643298, 0, 640);
        wide = map(objArray[i].estimate, 0, 7000000, 0, 1064);
    opac = map(objArray[i].estimate, 0, 11643298, 80, 30);


//     if (i >= 0 && i < 8) {
//       barcolor = color(128, 200, 255);
//     }
//     if (i >= 8 && i < 15) {
//       barcolor = color(0, 0, 255);
//     }

//     if (i >= 15 && i < 21) {
//       barcolor = color(128, 0, 255);
//     }

//     if (i >= 21 && i < 38) {
//       barcolor = color(255, 12, 0);
//     }

//     if (i >= 38 && i < 44) {
//       barcolor = color(0, 255, 0);
//     }

//     if (i >= 44 && i < 54) {
//       barcolor = color(255, 128, 0);
//     }
//     if (i >= 54 && i < 64) {
//       barcolor = color(255, 255, 0);
//     }
//     if (i >= 64 && i < 75) {
//       barcolor = color(255, 128, 255);
//     }

//     if (i >= 75 && i < 80) {
//       barcolor = color(128, 255, 0);
//     }
//     if (i >= 80 && i < 83) {
//       barcolor = color(255, 255, 128);
//     }
//     if (i >= 83 && i < 87) {
//       barcolor = color(255, 0, 255);
//     }

//     if (i >= 87 && i < 89) {
//       barcolor = color(0, 90, 255);
//     }
//     if (i >= 89 && i < 95) {
//       barcolor = color(255, 89, 90);
//     }

//     if (i >= 95 && i < 98) {
//       barcolor = color(0, 255, 255);
//     }

//     if (i >= 98 && i < 111) {
//       barcolor = color(90, 255, 128);
//     }

//     if (i >= 111 && i < 120) {
//       barcolor = color(90, 0, 90);
//     }
//     if (i >= 120 && i < 131) {
//       barcolor = color(90, 0, 255);
//     }

//     if (i >= 131 && i < 133) {
//       barcolor = color(255, 255, 255);
//     }

//     colorMode(HSB, 133)
    fill(i, 255, 255, opac);
    rectMode(CENTER);
    rect(532, i*5, wide, up);
    colorMode(HSB, 133);
    fill(i, 255, 0);
    ellipse(532-wide/2, i*5, 10, up);
    ellipse(532+wide/2, i*5, 10, up);
  }

  
  
  
  var mousedivisor = int(mouseX / 8);

  if (mousedivisor <= 132) {
//     if (mousedivisor >= 0 && mousedivisor < 8) {
//       textcolor = color(128, 200, 255);
//     }

//     if (mousedivisor >= 8 && mousedivisor < 15) {
//       textcolor = color(0, 0, 255);
//     }

//     if (mousedivisor >= 15 && mousedivisor < 21) {
//       textcolor = color(128, 0, 255);
//     }

//     if (mousedivisor >= 21 && mousedivisor < 38) {
//       textcolor = color(255, 12, 0);
//     }

//     if (mousedivisor >= 38 && mousedivisor < 44) {
//       textcolor = color(0, 255, 0);
//     }

//     if (mousedivisor >= 44 && mousedivisor < 54) {
//       textcolor = color(255, 128, 0);
//     }

//     if (mousedivisor >= 54 && mousedivisor < 64) {
//       textcolor = color(255, 255, 0);
//     }

//     if (mousedivisor >= 64 && mousedivisor < 75) {
//       textcolor = color(255, 128, 255);
//     }
//     if (mousedivisor >= 75 && mousedivisor < 80) {
//       textcolor = color(128, 255, 0);
//     }

//     if (mousedivisor >= 80 && mousedivisor < 83) {
//       textcolor = color(255, 255, 128);
//     }
    
//      if (mousedivisor >= 83 && mousedivisor < 87) {
//       textcolor = color(255, 0, 255);
//     }

// 		if (mousedivisor >= 87 && mousedivisor < 89) {
//       textcolor = color(0, 90, 255);
//     }

//     if (mousedivisor >= 89 && mousedivisor < 95) {
//       textcolor = color(255, 89, 90);
//     }
    
//     if (mousedivisor >= 95 && mousedivisor < 98) {
//       textcolor = color(0, 255, 255);
//     }
    
     
//     if (mousedivisor >= 98 && mousedivisor < 111) {
//       textcolor = color(90, 255, 128);
//     }
    
//       if (mousedivisor >= 111 && mousedivisor < 120) {
//       textcolor = color(90, 0, 90);
//     }
    
//     if (mousedivisor >= 120 && mousedivisor < 131) {
//       textcolor = color(90, 0, 255);
//     }
    
//      if (mousedivisor >= 131 && mousedivisor < 133) {
//       textcolor = color(255, 255, 255);
//     }
    
  
    // fill(mousedivisor, 255, 255, 280-opac);
    // textSize(32)
    // var current_country = objArray[mousedivisor].country;
    // text(current_country, 2, 32);
    // var current_estimate = objArray[mousedivisor].estimate;
    // var current_error = objArray[mousedivisor].error;
    // text(current_estimate + " ± " + current_error, 2, 64);
  }
  // How might you sort the countries by population estimate?

  // How might you visually represent the population estimates?
  // Try a few different ways
  // Think about shape, color, text
  // Once you feel comfortable with drawing a static representation, think about adding interactivity
}let populations;
let objArray = [];
var up;
var textcolor;
var barcolor;
var opac;

function preload() {
  populations = loadTable("assets/simpleData_noRegions.csv", "csv", "header");
}

function setup() {
  // put setup code here
  createCanvas(1064, 640);

  console.log(populations.getRowCount() + " total rows in table");
  console.log(populations.getColumnCount() + " total columns in table");

  // how do we want to work with our Table Data?
  console.log(populations.getObject());

  console.log(populations.getArray());

  console.log(populations.getRows());



  // What if we want to work with an Array of Objects - let's create that
  // Create an array of objects - declare it globally to access it in draw function too

  for (let i = 0; i < populations.getRowCount(); i++) {

    // get the object from each CSV row - country, estimate, margin of error
    //console.log(populations.getRow(i));
    let oldObj = populations.getRow(i).obj;

    let newObj = {};
    newObj.country = oldObj.country;
    // interpret as a number instead of a string with parseInt
    newObj.estimate = parseInt(oldObj.estimate);
    newObj.error = parseInt(oldObj.marginOfError);
    // put the object into the array
    objArray.push(newObj);
  }

  console.log(objArray);



}

function draw() {
  background(0);
  noStroke();
  for (let i = 0; i < populations.getRowCount(); i++) {
    up = map(objArray[i].estimate, 0, 11643298, 0, 640);
        wide = map(objArray[i].estimate, 0, 7000000, 0, 1064);
    opac = map(objArray[i].estimate, 0, 11643298, 80, 30);


//     if (i >= 0 && i < 8) {
//       barcolor = color(128, 200, 255);
//     }
//     if (i >= 8 && i < 15) {
//       barcolor = color(0, 0, 255);
//     }

//     if (i >= 15 && i < 21) {
//       barcolor = color(128, 0, 255);
//     }

//     if (i >= 21 && i < 38) {
//       barcolor = color(255, 12, 0);
//     }

//     if (i >= 38 && i < 44) {
//       barcolor = color(0, 255, 0);
//     }

//     if (i >= 44 && i < 54) {
//       barcolor = color(255, 128, 0);
//     }
//     if (i >= 54 && i < 64) {
//       barcolor = color(255, 255, 0);
//     }
//     if (i >= 64 && i < 75) {
//       barcolor = color(255, 128, 255);
//     }

//     if (i >= 75 && i < 80) {
//       barcolor = color(128, 255, 0);
//     }
//     if (i >= 80 && i < 83) {
//       barcolor = color(255, 255, 128);
//     }
//     if (i >= 83 && i < 87) {
//       barcolor = color(255, 0, 255);
//     }

//     if (i >= 87 && i < 89) {
//       barcolor = color(0, 90, 255);
//     }
//     if (i >= 89 && i < 95) {
//       barcolor = color(255, 89, 90);
//     }

//     if (i >= 95 && i < 98) {
//       barcolor = color(0, 255, 255);
//     }

//     if (i >= 98 && i < 111) {
//       barcolor = color(90, 255, 128);
//     }

//     if (i >= 111 && i < 120) {
//       barcolor = color(90, 0, 90);
//     }
//     if (i >= 120 && i < 131) {
//       barcolor = color(90, 0, 255);
//     }

//     if (i >= 131 && i < 133) {
//       barcolor = color(255, 255, 255);
//     }

    colorMode(HSB, 133)
    fill(i, 255, 255, opac);
    ellipse(8 * i, 640-(up/1.05), wide, up);
    colorMode(HSB, 133)
    fill(255, 0, 255)
    ellipse(8 * i, 640-(up/1.05), 2, 2);
  }

  
  
  
  var mousedivisor = int(mouseX / 8);

  if (mousedivisor <= 132) {
//     if (mousedivisor >= 0 && mousedivisor < 8) {
//       textcolor = color(128, 200, 255);
//     }

//     if (mousedivisor >= 8 && mousedivisor < 15) {
//       textcolor = color(0, 0, 255);
//     }

//     if (mousedivisor >= 15 && mousedivisor < 21) {
//       textcolor = color(128, 0, 255);
//     }

//     if (mousedivisor >= 21 && mousedivisor < 38) {
//       textcolor = color(255, 12, 0);
//     }

//     if (mousedivisor >= 38 && mousedivisor < 44) {
//       textcolor = color(0, 255, 0);
//     }

//     if (mousedivisor >= 44 && mousedivisor < 54) {
//       textcolor = color(255, 128, 0);
//     }

//     if (mousedivisor >= 54 && mousedivisor < 64) {
//       textcolor = color(255, 255, 0);
//     }

//     if (mousedivisor >= 64 && mousedivisor < 75) {
//       textcolor = color(255, 128, 255);
//     }
//     if (mousedivisor >= 75 && mousedivisor < 80) {
//       textcolor = color(128, 255, 0);
//     }

//     if (mousedivisor >= 80 && mousedivisor < 83) {
//       textcolor = color(255, 255, 128);
//     }
    
//      if (mousedivisor >= 83 && mousedivisor < 87) {
//       textcolor = color(255, 0, 255);
//     }

// 		if (mousedivisor >= 87 && mousedivisor < 89) {
//       textcolor = color(0, 90, 255);
//     }

//     if (mousedivisor >= 89 && mousedivisor < 95) {
//       textcolor = color(255, 89, 90);
//     }
    
//     if (mousedivisor >= 95 && mousedivisor < 98) {
//       textcolor = color(0, 255, 255);
//     }
    
     
//     if (mousedivisor >= 98 && mousedivisor < 111) {
//       textcolor = color(90, 255, 128);
//     }
    
//       if (mousedivisor >= 111 && mousedivisor < 120) {
//       textcolor = color(90, 0, 90);
//     }
    
//     if (mousedivisor >= 120 && mousedivisor < 131) {
//       textcolor = color(90, 0, 255);
//     }
    
//      if (mousedivisor >= 131 && mousedivisor < 133) {
//       textcolor = color(255, 255, 255);
//     }
    
  
    fill(mousedivisor, 255, 255, 280-opac);
    textSize(32)
    var current_country = objArray[mousedivisor].country;
    text(current_country, 2, 32);
    var current_estimate = objArray[mousedivisor].estimate;
    var current_error = objArray[mousedivisor].error;
    text(current_estimate + " ± " + current_error, 2, 64);
  }
  // How might you sort the countries by population estimate?

  // How might you visually represent the population estimates?
  // Try a few different ways
  // Think about shape, color, text
  // Once you feel comfortable with drawing a static representation, think about adding interactivity
}let populations;
let objArray = [];
var up;
var textcolor;
var barcolor;

function preload() {
  populations = loadTable("assets/simpleData_noRegions.csv", "csv", "header");
}

function setup() {
  // put setup code here
  createCanvas(1064, 640);

  console.log(populations.getRowCount() + " total rows in table");
  console.log(populations.getColumnCount() + " total columns in table");

  // how do we want to work with our Table Data?
  console.log(populations.getObject());

  console.log(populations.getArray());

  console.log(populations.getRows());



  // What if we want to work with an Array of Objects - let's create that
  // Create an array of objects - declare it globally to access it in draw function too

  for (let i = 0; i < populations.getRowCount(); i++) {

    // get the object from each CSV row - country, estimate, margin of error
    //console.log(populations.getRow(i));
    let oldObj = populations.getRow(i).obj;

    let newObj = {};
    newObj.country = oldObj.country;
    // interpret as a number instead of a string with parseInt
    newObj.estimate = parseInt(oldObj.estimate);
    newObj.error = parseInt(oldObj.marginOfError);
    // put the object into the array
    objArray.push(newObj);
  }

  console.log(objArray);



}

function draw() {
  background(128);
  noStroke();
  for (let i = 0; i < populations.getRowCount(); i++) {
    up = map(objArray[i].estimate, 0, 11643298, 0, windowHeight);

    if (i >= 0 && i < 8) {
      barcolor = color(128, 200, 255);
    }
    if (i >= 8 && i < 15) {
      barcolor = color(0, 0, 255);
    }

    if (i >= 15 && i < 21) {
      barcolor = color(128, 0, 255);
    }

    if (i >= 21 && i < 38) {
      barcolor = color(255, 12, 0);
    }

    if (i >= 38 && i < 44) {
      barcolor = color(0, 255, 0);
    }

    if (i >= 44 && i < 54) {
      barcolor = color(255, 128, 0);
    }
    if (i >= 54 && i < 64) {
      barcolor = color(255, 255, 0);
    }
    if (i >= 64 && i < 75) {
      barcolor = color(255, 128, 255);
    }

    if (i >= 75 && i < 80) {
      barcolor = color(128, 255, 0);
    }
    if (i >= 80 && i < 83) {
      barcolor = color(255, 255, 128);
    }
    if (i >= 83 && i < 87) {
      barcolor = color(255, 0, 255);
    }

    if (i >= 87 && i < 89) {
      barcolor = color(0, 90, 255);
    }
    if (i >= 89 && i < 95) {
      barcolor = color(255, 89, 90);
    }

    if (i >= 95 && i < 98) {
      barcolor = color(0, 255, 255);
    }

    if (i >= 98 && i < 111) {
      barcolor = color(90, 255, 128);
    }

    if (i >= 111 && i < 120) {
      barcolor = color(90, 0, 90);
    }
    if (i >= 120 && i < 131) {
      barcolor = color(90, 0, 255);
    }

    if (i >= 131 && i < 133) {
      barcolor = color(255, 255, 255);
    }

    fill(barcolor);
    ellipse(8 * i, 640-up/2, 8, up);
  }

  
  
  
  var mousedivisor = int(mouseX / 8);

  if (mousedivisor <= 132) {
    if (mousedivisor >= 0 && mousedivisor < 8) {
      textcolor = color(128, 200, 255);
    }

    if (mousedivisor >= 8 && mousedivisor < 15) {
      textcolor = color(0, 0, 255);
    }

    if (mousedivisor >= 15 && mousedivisor < 21) {
      textcolor = color(128, 0, 255);
    }

    if (mousedivisor >= 21 && mousedivisor < 38) {
      textcolor = color(255, 12, 0);
    }

    if (mousedivisor >= 38 && mousedivisor < 44) {
      textcolor = color(0, 255, 0);
    }

    if (mousedivisor >= 44 && mousedivisor < 54) {
      textcolor = color(255, 128, 0);
    }

    if (mousedivisor >= 54 && mousedivisor < 64) {
      textcolor = color(255, 255, 0);
    }

    if (mousedivisor >= 64 && mousedivisor < 75) {
      textcolor = color(255, 128, 255);
    }
    if (mousedivisor >= 75 && mousedivisor < 80) {
      textcolor = color(128, 255, 0);
    }

    if (mousedivisor >= 80 && mousedivisor < 83) {
      textcolor = color(255, 255, 128);
    }
    
     if (mousedivisor >= 83 && mousedivisor < 87) {
      textcolor = color(255, 0, 255);
    }

		if (mousedivisor >= 87 && mousedivisor < 89) {
      textcolor = color(0, 90, 255);
    }

    if (mousedivisor >= 89 && mousedivisor < 95) {
      textcolor = color(255, 89, 90);
    }
    
    if (mousedivisor >= 95 && mousedivisor < 98) {
      textcolor = color(0, 255, 255);
    }
    
     
    if (mousedivisor >= 98 && mousedivisor < 111) {
      textcolor = color(90, 255, 128);
    }
    
      if (mousedivisor >= 111 && mousedivisor < 120) {
      textcolor = color(90, 0, 90);
    }
    
    if (mousedivisor >= 120 && mousedivisor < 131) {
      textcolor = color(90, 0, 255);
    }
    
     if (mousedivisor >= 131 && mousedivisor < 133) {
      textcolor = color(255, 255, 255);
    }
  
    fill(textcolor);
    textSize(32)
    var current_country = objArray[mousedivisor].country;
    text(current_country, 2, 32);
    var current_estimate = objArray[mousedivisor].estimate;
    var current_error = objArray[mousedivisor].error;
    text(current_estimate + " ± " + current_error, 2, 64);
  }
  // How might you sort the countries by population estimate?

  // How might you visually represent the population estimates?
  // Try a few different ways
  // Think about shape, color, text
  // Once you feel comfortable with drawing a static representation, think about adding interactivity
}let populations;
let objArray = [];

function preload() {
  table = loadTable("assets/simpleData_noRegions.csv", "csv", "header");
}

function setup() {
  //count the columns
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');

  print(table.getColumn('name'));
  //["Goat", "Leopard", "Zebra"]

  //cycle through the table
  for (var r = 0; r < table.getRowCount(); r++)
    for (var c = 0; c < table.getColumnCount(); c++) {
      print(table.getString(r, c));
    }
}
let populations;
let objArray = [];
var up;
var textcolor;
var barcolor;

function preload() {
  populations = loadTable("simpleData_noRegions.csv", "csv", "header");
}

function setup() {
  // put setup code here
  createCanvas(1064, 640);

  console.log(populations.getRowCount() + " total rows in table");
  console.log(populations.getColumnCount() + " total columns in table");

  // how do we want to work with our Table Data?
  console.log(populations.getObject());

  console.log(populations.getArray());

  console.log(populations.getRows());



  // What if we want to work with an Array of Objects - let's create that
  // Create an array of objects - declare it globally to access it in draw function too

  for (let i = 0; i < populations.getRowCount(); i++) {

    // get the object from each CSV row - country, estimate, margin of error
    //console.log(populations.getRow(i));
    let oldObj = populations.getRow(i).obj;

    let newObj = {};
    newObj.country = oldObj.country;
    // interpret as a number instead of a string with parseInt
    newObj.estimate = parseInt(oldObj.estimate);
    newObj.error = parseInt(oldObj.marginOfError);
    // put the object into the array
    objArray.push(newObj);
  }

  console.log(objArray);



}

function draw() {
  background(0);
  noStroke();
  for (let i = 0; i < populations.getRowCount(); i++) {
    up = map(objArray[i].estimate, 0, 11643298, 0, 640);

    if (i >= 0 && i < 8) {
      barcolor = color(128, 200, 255);
    }
    if (i >= 8 && i < 15) {
      barcolor = color(0, 0, 255);
    }

    if (i >= 15 && i < 21) {
      barcolor = color(128, 0, 255);
    }

    if (i >= 21 && i < 38) {
      barcolor = color(255, 12, 0);
    }

    if (i >= 38 && i < 44) {
      barcolor = color(0, 255, 0);
    }

    if (i >= 44 && i < 54) {
      barcolor = color(255, 128, 0);
    }
    if (i >= 54 && i < 64) {
      barcolor = color(255, 255, 0);
    }
    if (i >= 64 && i < 75) {
      barcolor = color(255, 128, 255);
    }

    if (i >= 75 && i < 80) {
      barcolor = color(128, 255, 0);
    }
    if (i >= 80 && i < 83) {
      barcolor = color(255, 255, 128);
    }
    if (i >= 83 && i < 87) {
      barcolor = color(255, 0, 255);
    }

    if (i >= 87 && i < 89) {
      barcolor = color(0, 90, 255);
    }
    if (i >= 89 && i < 95) {
      barcolor = color(255, 89, 90);
    }

    if (i >= 95 && i < 98) {
      barcolor = color(0, 255, 255);
    }

    if (i >= 98 && i < 111) {
      barcolor = color(90, 255, 128);
    }

    if (i >= 111 && i < 120) {
      barcolor = color(90, 0, 90);
    }
    if (i >= 120 && i < 131) {
      barcolor = color(90, 0, 255);
    }

    if (i >= 131 && i < 133) {
      barcolor = color(255, 255, 255);
    }

    fill(barcolor);
    rect(8 * i, 640, 6, -up);
  }

  var mousedivisor = int(mouseX / 8);

  if (mousedivisor <= 132) {
    if (mousedivisor >= 0 && mousedivisor < 8) {
      textcolor = color(128, 200, 255);
    }

    if (mousedivisor >= 8 && mousedivisor < 15) {
      textcolor = color(0, 0, 255);
    }

    if (mousedivisor >= 15 && mousedivisor < 21) {
      textcolor = color(128, 0, 255);
    }

    if (mousedivisor >= 21 && mousedivisor < 38) {
      textcolor = color(255, 12, 0);
    }

    if (mousedivisor >= 38 && mousedivisor < 44) {
      textcolor = color(0, 255, 0);
    }

    if (mousedivisor >= 44 && mousedivisor < 54) {
      textcolor = color(255, 128, 0);
    }

    if (mousedivisor >= 54 && mousedivisor < 64) {
      textcolor = color(255, 255, 0);
    }

    if (mousedivisor >= 64 && mousedivisor < 75) {
      textcolor = color(255, 128, 255);
    }
    if (mousedivisor >= 75 && mousedivisor < 80) {
      textcolor = color(128, 255, 0);
    }

    if (mousedivisor >= 80 && mousedivisor < 83) {
      textcolor = color(255, 255, 128);
    }
    
     if (mousedivisor >= 83 && mousedivisor < 87) {
      textcolor = color(255, 0, 255);
    }

		if (mousedivisor >= 87 && mousedivisor < 89) {
      textcolor = color(0, 90, 255);
    }

    if (mousedivisor >= 89 && mousedivisor < 95) {
      textcolor = color(255, 89, 90);
    }
    
    if (mousedivisor >= 95 && mousedivisor < 98) {
      textcolor = color(0, 255, 255);
    }
    
     
    if (mousedivisor >= 98 && mousedivisor < 111) {
      textcolor = color(90, 255, 128);
    }
    
      if (mousedivisor >= 111 && mousedivisor < 120) {
      textcolor = color(90, 0, 90);
    }
    
    if (mousedivisor >= 120 && mousedivisor < 131) {
      textcolor = color(90, 0, 255);
    }
    
     if (mousedivisor >= 131 && mousedivisor < 133) {
      textcolor = color(255, 255, 255);
    }
  
    fill(textcolor);
    textSize(32)
    var current_country = objArray[mousedivisor].country;
    text(current_country, 0, 32);
    var current_estimate = objArray[mousedivisor].estimate;
    var current_error = objArray[mousedivisor].error;
    text(current_estimate + " ± " + current_error, 0, 64);
  }
  // How might you sort the countries by population estimate?

  // How might you visually represent the population estimates?
  // Try a few different ways
  // Think about shape, color, text
  // Once you feel comfortable with drawing a static representation, think about adding interactivity
}var osc, fft, freq, amp;

function setup() {
  createCanvas(720, 256);

  osc = new p5.TriOsc(); // set frequency and type
  osc.amp(0.5);

  fft = new p5.FFT();
  osc.start();
  freq = 200;
  amp = 0.5;
}

function draw() {
  background(255);

  var waveform = fft.waveform();  // analyze the waveform
  beginShape();
  strokeWeight(5);
  for (var i = 0; i < waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();

  // change oscillator frequency based on mouseX
  // freq = map(mouseX, 0, width, 40, 880);
  
  osc.freq(freq);

  // var amp = map(mouseY, 0, height, 1, 0.01);
  osc.amp(amp);
  console.log(rotationY);
}


function deviceMoved() {
  // b = map(rotationZ, 0, 360, 0, 255);
  freq = map(rotationX, -90.0, 90.0, 88.0, 888.0, true);
  amp = map(rotationY, -90.0, 90.0, 0.0, 0.9, true);
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Smart Rockets w/ Genetic Algorithms

// Each Rocket's DNA is an array of PVectors
// Each PVector acts as a force for each frame of animation
// Imagine an booster on the end of the rocket that can polet in any direction
// and fire at any strength every frame

// The Rocket's fitness is a function of how close it gets to the target as well as how fast it gets there

// This example is inspired by Jer Thorp's Smart Rockets
// http://www.blprnt.com/smartrockets/

let lifetime; // How long should each generation live

let population; // Population

let lifecycle; // Timer for cycle of generation
let recordtime; // Fastest time to target

let target; // Target position

//let diam = 24;          // Size of target

let obstacles = []; //an array list to keep track of all the obstacles!

function setup() {
  createCanvas(640, 360);
  background(255);

  // The number of cycles we will allow a generation to live
  lifetime = 300;

  // Initialize variables
  lifecycle = 0;
  recordtime = lifetime;

  target = new Target(random(width), random(height / 4), 12, 12);

  // Create a population with a mutation rate, and population max
  let mutationRate = 0.25;
  population = new Population(mutationRate, 50);

  // Create the obstacle course
  obstacles = [];
  obstacles.push(new Obstacle(random(width), random(height), 25, 5));
}

function draw() {
  // background(127);

  // Draw the start and target positions
  target.display();


  // If the generation hasn't ended yet
  if (lifecycle < lifetime) {
    population.live(obstacles);
    if ((population.targetReached()) && (lifecycle < recordtime)) {
      recordtime = lifecycle;
    }
    lifecycle++;
    // Otherwise a new generation
  } else {
    lifecycle = 0;
    population.calcFitness();
    population.selection();
    population.reproduction();
  }

  // Draw the obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].display();
  }

  if (population.targetReached()) {
    strokeWeight(4);
    stroke(255);
    fill(255);
    rectMode(CORNER);
    rect(target.position.x, target.position.y, target.w, target.h);
    target.position.x = random(640);
    target.position.y = random(320/2);
    obstacles.push(new Obstacle(random(width), random(height), 25, 5));
    lifecycle = 300;
    background(255);

  }

  // Display some info
  // fill(0);
  // noStroke();
  // text("Generation #: " + population.getGenerations(), 10, 18);
  // text("Cycles left: " + (lifetime - lifecycle), 10, 36);
  // text("Record cycles: " + recordtime, 10, 54);


}

// Move the target if the mouse is pressed
// System will adapt to new targetlet pnt1 = [20, 20];
let pnt2 = [40, 80];
let pnt3 = [180, 15];
let pnt4 = [80, 200];
let pnt5 = [300, 80];

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  ellipse(pnt1[0], pnt1[1], 20, 20);
  ellipse(pnt2[0], pnt2[1], 20, 20);
  ellipse(pnt3[0], pnt3[1], 20, 20);
  ellipse(pnt4[0], pnt4[1], 20, 20);
  ellipse(pnt5[0], pnt5[1], 20, 20);
  for (i = 0; i < 6; i++) {
    var point1 = "pnt" + i;
    var point2 = "pnt" + i + 1;
    line(point1[i], point1[i+1], point2[i], point2[i+1]);
    print(point1[i]);
  	}
}var painters = [];
var inital = 1;
var maxHist;

function setup() {
  createCanvas(displayWidth, displayHeight
              );
  for (var i = 0; i < inital; i++) {
    painters.push(new Liner());
  }
  background(0);
  frameRate(30);
  //dSlider = createSlider(0, 400, 400);
  //dSlider.position(20, 20);
}

function draw() {
  background(0);
  for (var i = painters.length - 1; i >= 0; i--) {
  //for (var i = 0; i < painters.length; i++) {
    	if (painters[i].opacity > 0){
      painters[i].update();
      }
      painters[i].show();
      painters[i].check();

    if (painters[i].maxHist < 0) {
      painters.splice(i, 1);
    }
  }
  var ms = Math.floor(millis() % 5000);
  print(ms);
  if (ms > 4900){
  	painters.push(new Liner());
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    painters.push(new Liner());
  }
}
// This is a template for creating a looping animation in p5.js (JavaScript). 
// When you press the 'F' key, this program will export a series of images into
// your default Downloads folder. These can then be made into an animated gif. 
// This code is known to work with p5.js version 0.6.0
// Prof. Golan Levin, 28 January 2018

// INSTRUCTIONS FOR EXPORTING FRAMES (from which to make a GIF): 
// 1. Run a local server, using instructions from here:
//    https://github.com/processing/p5.js/wiki/Local-server
// 2. Set the bEnableExport variable to true.
// 3. Set the myNickname variable to your name.
// 4. Run the program from Chrome, press 'f'. 
//    Look in your 'Downloads' folder for the generated frames.
// 5. Note: Retina screens may export frames at twice the resolution.


//===================================================
// User-modifiable global variables. 
var myNickname = "HarmonicMotion";
var nFramesInLoop = 240;
var bEnableExport = true;

// Other global variables you don't need to touch.
var nElapsedFrames;
var bRecording;
var theCanvas;
var circles = [];
var percentCompleteFraction = 0;
var offset = 0;



//===================================================
function setup() {
  frameRate(24);
  theCanvas = createCanvas(displayWidth, displayHeight);
  bRecording = false;
  nElapsedFrames = 0;
  for(i = 0; i < 10; i++){
  	circles.push(new Circle());
  }
}

//===================================================
function keyTyped() {
  if (bEnableExport) {
    if ((key === 'f') || (key === 'F')) {
      bRecording = true;
      nElapsedFrames = 0;
    }
  }
}

//===================================================
function draw() {

  // Compute a percentage (0...1) representing where we are in the loop.
  if (bRecording) {
    percentCompleteFraction = float(nElapsedFrames) / float(nFramesInLoop);
  } else {
    percentCompleteFraction = float(frameCount % nFramesInLoop) / float(nFramesInLoop);
  }

  // Render the design, based on that percentage. 
  // This function renderMyDesign() is the one for you to change. 
  renderMyDesign (percentCompleteFraction);

  // If we're recording the output, save the frame to a file. 
  // Note that the output images may be 2x large if you have a Retina mac. 
  // You can compile these frames into an animated GIF using a tool like: 
  if (bRecording && bEnableExport) {
    var frameOutputFilename = myNickname + "_frame_" + nf(nElapsedFrames, 4) + ".png";
    print("Saving output image: " + frameOutputFilename);
    saveCanvas(theCanvas, frameOutputFilename, 'png');
    nElapsedFrames++;

    if (nElapsedFrames >= nFramesInLoop) {
      bRecording = false;
    }
  }
}

//===================================================
function renderMyDesign (percent) {
  //
  // THIS IS WHERE YOUR ART GOES. 
  // This is an example of a function that renders a temporally looping design. 
  // It takes a "percent", between 0 and 1, indicating where we are in the loop. 
  // Use, modify, or delete whatever you prefer from this example. 
  // This example uses several different graphical techniques. 
  // Remember to SKETCH FIRST!

  //----------------------
  // here, I set the background and some other graphical properties
  background(0);
  //stroke(0, 0, 0);
  strokeWeight(2);
  //----------------------
  // Here, I assign some handy variables. 
  var cx = 100;
  var cy = 100;

  //----------------------
  // Here, I use trigonometry to render a rotating element.
  // var radius = 80;
  // var rotatingArmAngle = percent * TWO_PI;
  // var px = cx + radius * cos(rotatingArmAngle);
  // var py = cy + radius * sin(rotatingArmAngle);
  // fill(255);
  // line(cx, cy, px, py);
  // ellipse(px, py, 20, 20);
  for (i = circles.length - 1; i >= 0; i--){
    circles[i].update();
    circles[i].show();
    //offset = map(sin(percentCompleteFraction), -1, 1, 0, 100);
    offset += 1;
     // xoff += 0.0000001;
    //	yoff += 0.0000001;
  }

//   //----------------------
//   // Here's a pulsating ellipse
//   var ellipsePulse = sin(3.0 * percent * TWO_PI);
//   var ellipseW = map(ellipsePulse, -1, 1, 20, 50);
//   var ellipseH = map(ellipsePulse, -1, 1, 50, 30);
//   var ellipseColor = map(ellipsePulse, -1, 1, 128, 255);
//   fill(255, ellipseColor, ellipseColor);
//   ellipse(cx, cy, ellipseW, ellipseH);

  //----------------------
  //Include some visual feedback. 
  fill(255, 255, 255, 0);
  noStroke();
  var percentDisplayString = "" + nf(percent, 1, 3);
  text(percentDisplayString, 5, 15);
}
// This is a template for creating a looping animation in p5.js (JavaScript). 
// When you press the 'F' key, this program will export a series of images into
// your default Downloads folder. These can then be made into an animated gif. 
// This code is known to work with p5.js version 0.6.0
// Prof. Golan Levin, 28 January 2018

// INSTRUCTIONS FOR EXPORTING FRAMES (from which to make a GIF): 
// 1. Run a local server, using instructions from here:
//    https://github.com/processing/p5.js/wiki/Local-server
// 2. Set the bEnableExport variable to true.
// 3. Set the myNickname variable to your name.
// 4. Run the program from Chrome, press 'f'. 
//    Look in your 'Downloads' folder for the generated frames.
// 5. Note: Retina screens may export frames at twice the resolution.


//===================================================
// User-modifiable global variables. 
var myNickname = "HarmonicMotion";
var nFramesInLoop = 240;
var bEnableExport = true;

// Other global variables you don't need to touch.
var nElapsedFrames;
var bRecording;
var theCanvas;
var circles = [];
var percentCompleteFraction = 0;
var offset = 0;



//===================================================
function setup() {
  frameRate(24);
  theCanvas = createCanvas(displayWidth, displayHeight);
  bRecording = false;
  nElapsedFrames = 0;
  for(i = 0; i < 20; i++){
  	circles.push(new Circle());
  }
}

//===================================================
function keyTyped() {
  if (bEnableExport) {
    if ((key === 'f') || (key === 'F')) {
      bRecording = true;
      nElapsedFrames = 0;
    }
  }
}

//===================================================
function draw() {

  // Compute a percentage (0...1) representing where we are in the loop.
  if (bRecording) {
    percentCompleteFraction = float(nElapsedFrames) / float(nFramesInLoop);
  } else {
    percentCompleteFraction = float(frameCount % nFramesInLoop) / float(nFramesInLoop);
  }

  // Render the design, based on that percentage. 
  // This function renderMyDesign() is the one for you to change. 
  renderMyDesign (percentCompleteFraction);

  // If we're recording the output, save the frame to a file. 
  // Note that the output images may be 2x large if you have a Retina mac. 
  // You can compile these frames into an animated GIF using a tool like: 
  if (bRecording && bEnableExport) {
    var frameOutputFilename = myNickname + "_frame_" + nf(nElapsedFrames, 4) + ".png";
    print("Saving output image: " + frameOutputFilename);
    saveCanvas(theCanvas, frameOutputFilename, 'png');
    nElapsedFrames++;

    if (nElapsedFrames >= nFramesInLoop) {
      bRecording = false;
    }
  }
}

//===================================================
function renderMyDesign (percent) {
  //
  // THIS IS WHERE YOUR ART GOES. 
  // This is an example of a function that renders a temporally looping design. 
  // It takes a "percent", between 0 and 1, indicating where we are in the loop. 
  // Use, modify, or delete whatever you prefer from this example. 
  // This example uses several different graphical techniques. 
  // Remember to SKETCH FIRST!

  //----------------------
  // here, I set the background and some other graphical properties
  background(0);
  //stroke(0, 0, 0);
  strokeWeight(2);
  //----------------------
  // Here, I assign some handy variables. 
  var cx = 100;
  var cy = 100;

  //----------------------
  // Here, I use trigonometry to render a rotating element.
  // var radius = 80;
  // var rotatingArmAngle = percent * TWO_PI;
  // var px = cx + radius * cos(rotatingArmAngle);
  // var py = cy + radius * sin(rotatingArmAngle);
  // fill(255);
  // line(cx, cy, px, py);
  // ellipse(px, py, 20, 20);
  for (i = circles.length - 1; i >= 0; i--){
    circles[i].update();
    circles[i].show();
    //offset = map(sin(percentCompleteFraction), -1, 1, 0, 100);
    offset += 1;
     // xoff += 0.0000001;
    //	yoff += 0.0000001;
  }

//   //----------------------
//   // Here's a pulsating ellipse
//   var ellipsePulse = sin(3.0 * percent * TWO_PI);
//   var ellipseW = map(ellipsePulse, -1, 1, 20, 50);
//   var ellipseH = map(ellipsePulse, -1, 1, 50, 30);
//   var ellipseColor = map(ellipsePulse, -1, 1, 128, 255);
//   fill(255, ellipseColor, ellipseColor);
//   ellipse(cx, cy, ellipseW, ellipseH);

  //----------------------
  //Include some visual feedback. 
  fill(255, 255, 255, 0);
  noStroke();
  var percentDisplayString = "" + nf(percent, 1, 3);
  text(percentDisplayString, 5, 15);
}
// This is a template for creating a looping animation in p5.js (JavaScript). 
// When you press the 'F' key, this program will export a series of images into
// your default Downloads folder. These can then be made into an animated gif. 
// This code is known to work with p5.js version 0.6.0
// Prof. Golan Levin, 28 January 2018

// INSTRUCTIONS FOR EXPORTING FRAMES (from which to make a GIF): 
// 1. Run a local server, using instructions from here:
//    https://github.com/processing/p5.js/wiki/Local-server
// 2. Set the bEnableExport variable to true.
// 3. Set the myNickname variable to your name.
// 4. Run the program from Chrome, press 'f'. 
//    Look in your 'Downloads' folder for the generated frames.
// 5. Note: Retina screens may export frames at twice the resolution.


//===================================================
// User-modifiable global variables. 
var myNickname = "HarmonicMotion";
var nFramesInLoop = 240;
var bEnableExport = true;

// Other global variables you don't need to touch.
var nElapsedFrames;
var bRecording;
var theCanvas;
var circles = [];
var percentCompleteFraction = 0;
var offset = 0;
var start = 100;



//===================================================
function setup() {
  frameRate(30);
  theCanvas = createCanvas(displayWidth, displayHeight);
  bRecording = false;
  nElapsedFrames = 0;
  for(i = 0; i < start; i++){
  	circles.push(new Circle());
  }
}

//===================================================
function keyTyped() {
  if (bEnableExport) {
    if ((key === 'f') || (key === 'F')) {
      bRecording = true;
      nElapsedFrames = 0;
    }
  }
}

//===================================================
function draw() {

  // Compute a percentage (0...1) representing where we are in the loop.
  if (bRecording) {
    percentCompleteFraction = float(nElapsedFrames) / float(nFramesInLoop);
  } else {
    percentCompleteFraction = float(frameCount % nFramesInLoop) / float(nFramesInLoop);
  }

  // Render the design, based on that percentage. 
  // This function renderMyDesign() is the one for you to change. 
  renderMyDesign (percentCompleteFraction);

  // If we're recording the output, save the frame to a file. 
  // Note that the output images may be 2x large if you have a Retina mac. 
  // You can compile these frames into an animated GIF using a tool like: 
  if (bRecording && bEnableExport) {
    var frameOutputFilename = myNickname + "_frame_" + nf(nElapsedFrames, 4) + ".png";
    print("Saving output image: " + frameOutputFilename);
    saveCanvas(theCanvas, frameOutputFilename, 'png');
    nElapsedFrames++;

    if (nElapsedFrames >= nFramesInLoop) {
      bRecording = false;
    }
  }
}

//===================================================
function renderMyDesign (percent) {
  //
  // THIS IS WHERE YOUR ART GOES. 
  // This is an example of a function that renders a temporally looping design. 
  // It takes a "percent", between 0 and 1, indicating where we are in the loop. 
  // Use, modify, or delete whatever you prefer from this example. 
  // This example uses several different graphical techniques. 
  // Remember to SKETCH FIRST!

  //----------------------
  // here, I set the background and some other graphical properties
  background(0);
  //stroke(0, 0, 0);
  strokeWeight(2);
  //----------------------
  // Here, I assign some handy variables. 
  var cx = 100;
  var cy = 100;

  //----------------------
  // Here, I use trigonometry to render a rotating element.
  // var radius = 80;
  // var rotatingArmAngle = percent * TWO_PI;
  // var px = cx + radius * cos(rotatingArmAngle);
  // var py = cy + radius * sin(rotatingArmAngle);
  // fill(255);
  // line(cx, cy, px, py);
  // ellipse(px, py, 20, 20);
  for (i = circles.length - 1; i >= 0; i--){
    circles[i].update();
    circles[i].show();
    //offset = map(sin(percentCompleteFraction), -1, 1, 0, 100);
    offset += 1;
     // xoff += 0.0000001;
    //	yoff += 0.0000001;
  }

//   //----------------------
//   // Here's a pulsating ellipse
//   var ellipsePulse = sin(3.0 * percent * TWO_PI);
//   var ellipseW = map(ellipsePulse, -1, 1, 20, 50);
//   var ellipseH = map(ellipsePulse, -1, 1, 50, 30);
//   var ellipseColor = map(ellipsePulse, -1, 1, 128, 255);
//   fill(255, ellipseColor, ellipseColor);
//   ellipse(cx, cy, ellipseW, ellipseH);

  //----------------------
  //Include some visual feedback. 
  fill(255, 255, 255, 0);
  noStroke();
  var percentDisplayString = "" + nf(percent, 1, 3);
  text(percentDisplayString, 5, 15);
}var username = 'nM7kpbw91SlF8bixC-Ei1nKqG7O7S9CyIqpbY8WG'; // fill in your Hub-given username
var url = '10.0.1.183'; // the hub IP address     
var resultDiv;
var clr1, clr2, clr3;
var blbs = [25, 39, 33, 26, 36];



function setup() {
  frameRate(1);
  resultDiv = createDiv('Hub response');  // a div for the Hue hub's responses
  resultDiv.position(10, 90);             // position it
  off = createButton('Off');
  off.position(10, 10);
  off.mousePressed(offGo);
  on = createButton('On');
  on.position(50, 10);
  on.mousePressed(onGo);
  sineU = createButton('Sweep Down');
  sineU.position(90, 10);
  sineU.mousePressed(sinWaveDown);
  sineD = createButton('Sweep Up');
  sineD.position(180, 10);
  sineD.mousePressed(sinWaveUp);
  redS = createButton('Red Sweep');
  redS.position(90, 40);
  redS.mousePressed(redSweep);
  blueS = createButton('Blue Sweep');
  blueS.position(170, 40);
  blueS.mousePressed(blueSweep);
  alertS = createButton('Alert Sweep');
  alertS.position(10, 40);
  alertS.mousePressed(alertSweep);
  full = createButton('Full');
  full.position(255, 10);
  full.mousePressed(atFull);
  hslider = createSlider(0, 65280, 0);
  hslider.position(250, 40);
  hslider.changed(hueSlider);
  connect(); // connect to Hue hub; it will show all light states
}


function connect() {
  url = "http://" + url + '/api/' + username + '/lights/';
  httpDo(url, 'GET', getLights);
}

function getLights(result) {
  resultDiv.html(result);
}

function offGo() {
  var state = {
    on: false
  }
  for (i = 0; i < 5; i++) {
    go(blbs[i], state);
  }
}

function onGo() {
  var state = {
    on: true
  }
  for (i = 0; i < 5; i++) {
    go(blbs[i], state);
  }
}

function sinWaveDown() {
  var dim = 0;
    for (i = 0; i < 5; i++) {
      var time = i*10 + 8;
      var state = {
        bri: dim,
        transitiontime: time
      }
      go(blbs[i], state);
    }
}

function sinWaveUp() {
  var dim = 255;
  for (i = 0; i < 5; i++) {
    var time = i*15 + 4;
    var state = {
      bri: dim,
      transitiontime: time
    }
    go(blbs[i], state);
  }
}

function redSweep() {
  var huey = 0;
  for (i = 0; i < 5; i++) {
    var time = i*4+1;
    var state = {
      hue: huey,
      transitiontime: time
    }
    go(blbs[i], state);
  }
}

function blueSweep() {
  var huey = 46920;
  for (i = 0; i <= 4; i++) {
    var time = i*4+1;
    var state = {
      hue: huey,
      transitiontime: time
    }
    go(blbs[i], state);
  }
}

function hueSlider() {
  var huey = hslider.value();
    for (i = 5; i >= 0; i--) {
    var time = i*2+1;
    var state = {
      hue: huey,
      transitiontime: time, 
      sat: 254
    }
    go(blbs[i], state);
  }
      }


function alertSweep() {
  for (i = 0; i < 5; i++) {
    var time = i*4+1;
    var state = {
      alert: "select",
      transitiontime: time
    }
    go(blbs[i], state);
  }
}

function atFull() {
  var dim = 255;
  for (i = 0; i < 5; i++) {
    var state = {
      bri: dim
    }
    go(blbs[i], state);
  }
}


function go(blb, msg) {
  var path = url + blb + '/state/';
  var fnc = JSON.stringify(msg);
  httpDo(path, 'PUT', fnc, 'text', getLights);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}var username = 'nM7kpbw91SlF8bixC-Ei1nKqG7O7S9CyIqpbY8WG'; // fill in your Hub-given username
var url = '10.0.1.183'; // the hub IP address     
var resultDiv;
var clr1, clr2, clr3;
var blbs = [25, 39, 33, 26, 36];



function setup() {
  frameRate(1);
  resultDiv = createDiv('Hub response');  // a div for the Hue hub's responses
  resultDiv.position(10, 90);             // position it
  off = createButton('Off');
  off.position(10, 10);
  off.mousePressed(offGo);
  on = createButton('On');
  on.position(50, 10);
  on.mousePressed(onGo);
  sineU = createButton('Sweep Down');
  sineU.position(90, 10);
  sineU.mousePressed(sinWaveDown);
  sineD = createButton('Sweep Up');
  sineD.position(180, 10);
  sineD.mousePressed(sinWaveUp);
  redS = createButton('Red Sweep');
  redS.position(90, 40);
  redS.mousePressed(redSweep);
  blueS = createButton('Blue Sweep');
  blueS.position(170, 40);
  blueS.mousePressed(blueSweep);
  alertS = createButton('Alert Sweep');
  alertS.position(10, 40);
  alertS.mousePressed(alertSweep);
  full = createButton('Full');
  full.position(255, 10);
  full.mousePressed(atFull);
  hslider = createSlider(0, 65280, 0);
  hslider.position(250, 40);
  hslider.changed(hueSlider);
  connect(); // connect to Hue hub; it will show all light states
}


function connect() {
  url = "http://" + url + '/api/' + username + '/lights/';
  httpDo(url, 'GET', getLights);
}

function getLights(result) {
  resultDiv.html(result);
}

function offGo() {
  var state = {
    on: false
  }
  for (i = 0; i < 5; i++) {
    go(blbs[i], state);
  }
}

function onGo() {
  var state = {
    on: true
  }
  for (i = 0; i < 5; i++) {
    go(blbs[i], state);
  }
}

function sinWaveDown() {
  var dim = 0;
    for (i = 0; i < 5; i++) {
      var time = i*10 + 8;
      var state = {
        bri: dim,
        transitiontime: time
      }
      go(blbs[i], state);
    }
}

function sinWaveUp() {
  var dim = 255;
  for (i = 0; i < 5; i++) {
    var time = i*15 + 4;
    var state = {
      bri: dim,
      transitiontime: time
    }
    go(blbs[i], state);
  }
}

function redSweep() {
  var huey = 0;
  for (i = 0; i < 5; i++) {
    var time = i*4+1;
    var state = {
      hue: huey,
      transitiontime: time
    }
    go(blbs[i], state);
  }
}

function blueSweep() {
  var huey = 46920;
  for (i = 0; i <= 4; i++) {
    var time = i*4+1;
    var state = {
      hue: huey,
      transitiontime: time
    }
    go(blbs[i], state);
  }
}

function hueSlider() {
  var huey = hslider.value();
    for (i = 5; i >= 0; i--) {
    var time = i*2+1;
    var state = {
      hue: huey,
      transitiontime: time, 
      sat: 254
    }
    go(blbs[i], state);
  }
      }


function alertSweep() {
  for (i = 0; i < 5; i++) {
    var time = i*4+1;
    var state = {
      alert: "select",
      transitiontime: time
    }
    go(blbs[i], state);
  }
}

function atFull() {
  var dim = 255;
  for (i = 0; i < 5; i++) {
    var state = {
      bri: dim
    }
    go(blbs[i], state);
  }
}


function go(blb, msg) {
  var path = url + blb + '/state/';
  var fnc = JSON.stringify(msg);
  httpDo(path, 'PUT', fnc, 'text', getLights);
}var user = 'nM7kpbw91SlF8bixC-Ei1nKqG7O7S9CyIqpbY8WG';
var url = '10.0.1.183';

function setup() { 
  resultDiv = createDiv('Hub response');  // a div for the Hue hub's responses
  resultDiv.position(10, 50);             // position it
  offB = createButton('Off');
  offB.position(10, 10);
  offB.mousePressed(off);
  connect();
} 

function connect() {
  url = "http://" + url + '/api/' + user + '/lights/';
  httpDo(url, 'GET', getLights);
}

function getLights(result) {
  resultDiv.html(result);
}

function off() {
 var state = {             // make a JSON object with it
   on: false
 }
// make the HTTP call with the JSON object:
 go(blb3, state);
}

function go(blb, msg){
  var path = url + blb + '/state/';
  var fnc = JSON.stringify(msg);
  httpDo(path, 'PUT', fnc, 'text', getLights); //HTTP PUT the change
}



var painters = [];
var inital = 1;
var maxHist;

function setup() {
  createCanvas(1080, 720);
  for (var i = 0; i < inital; i++) {
    painters.push(new Liner());
  }
  background(0);
  frameRate(30);
  //dSlider = createSlider(0, 400, 400);
  //dSlider.position(20, 20);
}

function draw() {
  background(0);
  for (var i = painters.length - 1; i >= 0; i--) {
  //for (var i = 0; i < painters.length; i++) {
    	if (painters[i].opacity > 0){
      painters[i].update();
      }
      painters[i].show();
      painters[i].check();

    if (painters[i].maxHist < 0) {
      painters.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    painters.push(new Liner());
  }
}var painters = [];
var inital = 1;
var maxHist;

function setup() {
  createCanvas(1080, 720);
  for (var i = 0; i < inital; i++) {
    painters.push(new Liner());
  }
  background(0);
  frameRate(30);
  //dSlider = createSlider(0, 400, 400);
  //dSlider.position(20, 20);
}

function draw() {
  background(0);
  for (var i = painters.length - 1; i >= 0; i--) {
  //for (var i = 0; i < painters.length; i++) {
    	if (painters[i].opacity > 0){
      painters[i].update();
      }
      painters[i].show();
      painters[i].check();

    if (painters[i].maxHist < 0) {
      painters.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    painters.push(new Liner());
  }
}var painters = [];
var inital = 1;
var maxHist;

function setup() {
  createCanvas(1080, displayHeight);
  for (var i = 0; i < inital; i++) {
    painters.push(new Liner());
  }
  background(0);
  frameRate(30);
  //dSlider = createSlider(0, 400, 400);
  //dSlider.position(20, 20);
}

function draw() {
  background(0);
  for (var i = painters.length - 1; i >= 0; i--) {
  //for (var i = 0; i < painters.length; i++) {
    	if (painters[i].opacity > 0){
      painters[i].update();
      }
      painters[i].show();
      painters[i].check();

    if (painters[i].maxHist < 0) {
      painters.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    painters.push(new Liner());
  }
}var painters = [];
var inital = 1;
var maxHist;

function setup() {
  createCanvas(1080, 720);
  for (var i = 0; i < inital; i++) {
    painters.push(new Liner());
  }
  background(0);
  frameRate(30);
  //dSlider = createSlider(0, 400, 400);
  //dSlider.position(20, 20);
}

function draw() {
  background(0);
  for (var i = painters.length - 1; i >= 0; i--) {
    	painters[i].check();
    	if (painters[i].opacity > 0){
      painters[i].update();
      }
      painters[i].show();
    if (painters[i].maxHist < 0) {
      painters.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    painters.push(new Liner());
  }
}var painters = [];
var inital = 1;
var maxHist;

function setup() {
  createCanvas(1080, 720);
  for (var i=0; i < inital; i++){
    painters.push(new Liner());
  }
  background(0);
  frameRate(120);
  dSlider = createSlider(0, 400, );
  dSlider.position(20, 20);
}

function draw () {
  background(0);
	for (var i=0; i<painters.length; i++) {
    painters[i].update();
    painters[i].show();
  }
}

function mouseClicked() {
      painters.push(new Liner());
}var liner;

function setup() {
  createCanvas(400, 400);
  liner = new Liner();
  background(0);
}

function draw () {
  background(0);
  liner.update();
  liner.show();
}let liner;

function setup() {
  createCanvas(displayHeight, displayWidth);
  liner = new Liner();
}

function draw () {
  background (0);
  Liner.update();
  Liner.show();
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let walker;
var r, g, b;
let step = 5;

function setup() {
  createCanvas(640, 360);
  walker = new Walker();
  background(127);
}

function draw() {
  walker.walk();
  walker.display();
  walker.randomColor();
}

class Walker {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.noff = createVector(random(1000), random(1000));
    this.r = random(127);
		this.g = random(127);
		this.b = random(127);
  }

  display() {
    strokeWeight(2);
    fill(this.r, this.g, this.b);
    noStroke();
    ellipse(this.position.x, this.position.y, 48, 48);
  }

  walk() {
    this.position.x = map(noise(this.noff.x), 0, 1, 0, width);
    this.position.y = map(noise(this.noff.y), 0, 1, 0, height);
    this.noff.add(0.01, 0.01, 0);
  }
  
  randomColor() {

		var count = floor(random(2));
		switch (count) {
				

			case 0:
				
				if (this.r > -1 && this.r < 256) {
					this.r = this.r + floor(random(step));
				} else if (this.r <= 0) {
					this.r = this.r + floor(random(step));
				} else if (this.r >= 256) {
					this.r = this.r - floor(random(step));
				}


				if (this.g > -1 && this.g < 256) {
					this.g = this.g + floor(random(step));
				} else if (this.g <= 0) {
					this.g = this.g + floor(random(step));
				} else if (this.g >= 256) {
					this.g = this.g - floor(random(step));
				}

				if (this.b > -1 && this.b < 256) {
					this.b = this.b + floor(random(step));
				} else if (this.b <= 0) {
					this.b = this.b + floor(random(step));
				} else if (this.b >= 256) {
					this.b = this.b - floor(random(step));
				}

				break;

			case 1:
				if (this.r > -1 && this.r < 256) {
					this.r = this.r - floor(random(step));
				} else if (this.r <= 0) {
					this.r = this.r + floor(random(step));
				} else if (this.r >= 256) {
					this.r = this.r - floor(random(step));
				}


				if (this.g > -1 && this.g < 256) {
					this.g = this.g - floor(random(step));
				} else if (this.g <= 0) {
					this.g = this.g + floor(random(step));
				} else if (this.g >= 256) {
					this.g = this.g - floor(random(step));
				}

				if (this.b > -1 && this.b < 256) {
					this.b = this.b - floor(random(step));
				} else if (this.b <= 0) {
					this.b = this.b + floor(random(step));
				} else if (this.b >= 256) {
					this.b = this.b - floor(random(step));
				}
				break;
		}
  }
}
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let walker;
let upticker = 0;
let dir = true;


function setup() {
  noStroke();
  createCanvas(640, 360);
  walker = new Walker();
  walker2 = new Walker();
  background(0);
  smooth();
}

function uptick() {
  if (dir == true) {
  	upticker++;
  }
  
  if (dir == false) {
    upticker--;
  }
  
  if (upticker == 255) {
    dir = !dir;}
  
  if (upticker == 0) {
    dir = !dir;}
  print(upticker);
}

function draw() {
  noStroke();
  uptick();
  walker.walk();
  walker.display(255-upticker);
  walker2.walk();
  walker2.display(upticker);
}

class Walker {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.noff = createVector(random(1000), random(1000));
  }

  display(colorz) {
    strokeWeight(2);
    fill(colorz);
    ellipse(this.position.x, this.position.y, 48, 48);
  }

  walk() {
    this.position.x = map(noise(this.noff.x), 0, 1, 0, width);
    this.position.y = map(noise(this.noff.y), 0, 1, 0, height);
    this.noff.add(0.01, 0.01, 0);
  }
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var painters = []; 

var r, g, b;
let step = 5;

function setup() {
  for (var i=0; i < 9; i++){
    painters.push(new Walker());
  }
	createCanvas(1080, 720);
	background(0);
	smooth();
}

function draw() {
	for (var i=0; i<painters.length; i++) {
    painters[i].display();
    painters[i].walk();
    //painters[i].randomColor();
  }
}

function mouseClicked(){
  painters.push(new Walker());
}
  
class Walker {
	constructor() {
		this.position1 = createVector(width/2, height/2);
    this.position2 = createVector(width/2, height/2);
		this.noff1 = createVector(random(1000), random(1000));
    this.noff2 = createVector(random(1000), random(1000));
		this.r = random(127);
		this.g = 0;
		this.b = random(127);
	}

	display() {
		strokeWeight(1);
		fill(this.r, this.g, this.b, 127);
		stroke(this.r, 0, this.b, 88);
    //point(this.position.x, this.position.y);
    line(this.position1.x, this.position1.y, this.position2.x, this.position2.y);
		//ellipse(this.position.x, this.position.y, 12, 12);
	}

	walk() {
		this.position1.x = map(noise(this.noff1.x), 0, 1, 0, width);
		this.position1.y = map(noise(this.noff1.y), 0, 1, 0, height);
    this.position2.x = map(noise(this.noff2.x), 0, 1, 0, width);
    this.position2.y = map(noise(this.noff2.y), 0, 1, 0, height);
		this.noff1.add(0.001, 0.001, 0);
    this.noff2.add(0.001, 0.001, 0);

	}

	randomColor() {

		var count = floor(random(2));
		switch (count) {
				

			case 0:
				
				if (this.r > -1 && this.r < 256) {
					this.r = this.r + floor(random(step));
				} else if (this.r <= 0) {
					this.r = this.r + floor(random(step));
				} else if (this.r >= 256) {
					this.r = this.r - floor(random(step));
				}


				if (this.g > -1 && this.g < 256) {
					this.g = this.g + floor(random(step));
				} else if (this.g <= 0) {
					this.g = this.g + floor(random(step));
				} else if (this.g >= 256) {
					this.g = this.g - floor(random(step));
				}

				if (this.b > -1 && this.b < 256) {
					this.b = this.b + floor(random(step));
				} else if (this.b <= 0) {
					this.b = this.b + floor(random(step));
				} else if (this.b >= 256) {
					this.b = this.b - floor(random(step));
				}

				break;

			case 1:
				if (this.r > -1 && this.r < 256) {
					this.r = this.r - floor(random(step));
				} else if (this.r <= 0) {
					this.r = this.r + floor(random(step));
				} else if (this.r >= 256) {
					this.r = this.r - floor(random(step));
				}


				if (this.g > -1 && this.g < 256) {
					this.g = this.g - floor(random(step));
				} else if (this.g <= 0) {
					this.g = this.g + floor(random(step));
				} else if (this.g >= 256) {
					this.g = this.g - floor(random(step));
				}

				if (this.b > -1 && this.b < 256) {
					this.b = this.b - floor(random(step));
				} else if (this.b <= 0) {
					this.b = this.b + floor(random(step));
				} else if (this.b >= 256) {
					this.b = this.b - floor(random(step));
				}
				break;
		}
	}
}var liner;

function setup() {
  createCanvas(displayHeight, displayWidth);
  liner = new Liner();
  background(0);
}

function draw () {
  background(0);
  liner.update();
  liner.show();
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var painters = []; 

var r, g, b;
let step = 5;

function setup() {
  createCanvas(1080, 720);
  for (var i=0; i < 9; i++){
    painters.push(new Walker());
  }
	background(0);
	smooth();
  frameRate(60);
}


function draw() {
	for (var i=0; i<painters.length; i++) {
    painters[i].walk();
    painters[i].randomColor();
    painters[i].display();
  }
}

function mouseClicked(){
  painters.push(new Walker());
}
  
class Walker {
	constructor() {
		this.position1 = createVector(width, height);
    this.position2 = createVector(width, height);
		this.noff = createVector(random(1000), random(1000));
		this.r = random(127);
		this.g = 0;
		this.b = random(127);
    
	}

  
	display() {
		strokeWeight(1);
		//fill(this.r, this.g, this.b, 127);
		stroke(this.r, 0, this.b, 38);
    //point(this.position.x, this.position.y);
    line(this.position1.x, this.position1.y, this.position2.x, this.position2.y);
		//ellipse(this.position1.x, this.position1.y, 12, 12);
  }
	

	walk() {
		this.position1.x = map(noise(this.noff.x), 0, 1, 0, width);
		this.position1.y = map(noise(this.noff.y), 0, 1, 0, height);
    //this.position2.x = map(noise(this.noff2.x), 0, 1, 0, width);
		//this.position2.y = map(noise(this.noff2.y), 0, 1, 0, height);
    this.position2.x = map(noise(this.noff.x), 1, 0, 0, width);
    this.position2.y = map(noise(this.noff.y), 1, 0, 0, height); 
		this.noff.add(0.001, 0.001, 0);
	}

	randomColor() {
		var count = floor(random(2));
		switch (count) {
				

			case 0:
				if (this.r > -1 && this.r < 256) {
					this.r = this.r + floor(random(step));
				} else if (this.r <= 0) {
					this.r = this.r + floor(random(step));
				} else if (this.r >= 256) {
					this.r = this.r - floor(random(step));
				}

				if (this.g > -1 && this.g < 256) {
					this.g = this.g + floor(random(step));
				} else if (this.g <= 0) {
					this.g = this.g + floor(random(step));
				} else if (this.g >= 256) {
					this.g = this.g - floor(random(step));
				}

				if (this.b > -1 && this.b < 256) {
					this.b = this.b + floor(random(step));
				} else if (this.b <= 0) {
					this.b = this.b + floor(random(step));
				} else if (this.b >= 256) {
					this.b = this.b - floor(random(step));
				}
				break;

			case 1:
				if (this.r > -1 && this.r < 256) {
					this.r = this.r - floor(random(step));
				} else if (this.r <= 0) {
					this.r = this.r + floor(random(step));
				} else if (this.r >= 256) {
					this.r = this.r - floor(random(step));
				}


				if (this.g > -1 && this.g < 256) {
					this.g = this.g - floor(random(step));
				} else if (this.g <= 0) {
					this.g = this.g + floor(random(step));
				} else if (this.g >= 256) {
					this.g = this.g - floor(random(step));
				}

				if (this.b > -1 && this.b < 256) {
					this.b = this.b - floor(random(step));
				} else if (this.b <= 0) {
					this.b = this.b + floor(random(step));
				} else if (this.b >= 256) {
					this.b = this.b - floor(random(step));
				}
				break;
		}
	}
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var painters = []; 

var r, g, b;
let step = 5;

function setup() {
  for (var i=0; i < 22; i++){
    painters.push(new Walker());
  }
	createCanvas(displayWidth, displayHeight);
	background(0);
	smooth();
}

function draw() {
	for (var i=0; i<painters.length; i++) {
    painters[i].display();
    painters[i].walk();
    //painters[i].randomColor();
  }
}

function mouseClicked(){
  painters.push(new Walker());
}
  
class Walker {
	constructor() {
		this.position1 = createVector(width/2, height/2);
    this.position2 = createVector(width/2, height/2);
		this.noff1 = createVector(random(1000), random(1000));
    this.noff2 = createVector(random(1000), random(1000));
		this.r = random(127);
		this.g = 0;
		this.b = random(127);
	}

	display() {
		strokeWeight(1);
		fill(this.r, this.g, this.b, 127);
		stroke(this.r, 0, this.b, 88);
    //point(this.position.x, this.position.y);
    line(this.position1.x, this.position1.y, this.position2.x, this.position2.y);
		//ellipse(this.position.x, this.position.y, 12, 12);
	}

	walk() {
		this.position1.x = map(noise(this.noff1.x), 0, 1, 0, width);
		this.position1.y = map(noise(this.noff1.y), 0, 1, 0, height);
    this.position2.x = map(noise(this.noff2.x), 0, 1, 0, width);
    this.position2.y = map(noise(this.noff2.y), 0, 1, 0, height);
		this.noff1.add(0.001, 0.001, 0);
    this.noff2.add(0.001, 0.001, 0);

	}

	randomColor() {

		var count = floor(random(2));
		switch (count) {
				

			case 0:
				
				if (this.r > -1 && this.r < 256) {
					this.r = this.r + floor(random(step));
				} else if (this.r <= 0) {
					this.r = this.r + floor(random(step));
				} else if (this.r >= 256) {
					this.r = this.r - floor(random(step));
				}


				if (this.g > -1 && this.g < 256) {
					this.g = this.g + floor(random(step));
				} else if (this.g <= 0) {
					this.g = this.g + floor(random(step));
				} else if (this.g >= 256) {
					this.g = this.g - floor(random(step));
				}

				if (this.b > -1 && this.b < 256) {
					this.b = this.b + floor(random(step));
				} else if (this.b <= 0) {
					this.b = this.b + floor(random(step));
				} else if (this.b >= 256) {
					this.b = this.b - floor(random(step));
				}

				break;

			case 1:
				if (this.r > -1 && this.r < 256) {
					this.r = this.r - floor(random(step));
				} else if (this.r <= 0) {
					this.r = this.r + floor(random(step));
				} else if (this.r >= 256) {
					this.r = this.r - floor(random(step));
				}


				if (this.g > -1 && this.g < 256) {
					this.g = this.g - floor(random(step));
				} else if (this.g <= 0) {
					this.g = this.g + floor(random(step));
				} else if (this.g >= 256) {
					this.g = this.g - floor(random(step));
				}

				if (this.b > -1 && this.b < 256) {
					this.b = this.b - floor(random(step));
				} else if (this.b <= 0) {
					this.b = this.b + floor(random(step));
				} else if (this.b >= 256) {
					this.b = this.b - floor(random(step));
				}
				break;
		}
	}
}var input, button, greeting, pixel;

function setup() { 
  createCanvas(displayWidth, displayHeight);
	colorMode(HSB, 360, 100, 100);
	frameRate(14);
  
  input = createInput();
  input.position(20, 65);

  
  button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(greet);

  greeting = createElement('h2', 'What pixel are you?');
  greeting.position(20, 5);

  textAlign(CENTER);
  textSize(50);

} 

function draw(){
  	background(0);
  	fill(counter(pixel)*12, 100, 100);
		rect(0, 0, width, height);
}

function greet(){
  pixel = int(input.value());  
  print(pixel);
}


function counter(x) {
	var count = (frameCount + x) % 30;
	return count;
}

  var video;
var x = 0;
var lastx = -1;
var dir;

function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(160, 120);
  background(51);
  //video.hide();
}

function draw() {
  translate(160, 120);
  rotate(x);
  image(video, 0, 0);
  
  push();
  translate(video.width,0);
  scale(-1,1); 
  copy(video, 0, 0, 160, 240, 0, 0, 160, 240);
  pop();

  push();
  translate(video.width,video.height);
  scale(-1,-1); 
  copy(video, 0, 120, 160, 240, 0, 120, 160, 240);
  pop();
  
  push();
  translate(0,video.height);
  scale(1,-1); 
  copy(video, 120, 120, 160, 240, 0, 120, 160, 240);
  pop();
  
  translate(video.width/2, video.height/2);
  rotate(x);
  
  if (x < 0){
  dir = 1;
  }
  
  if (x <= (PI*16) && lastx < x){
  dir = 1;
  }
  
  if (x > (PI*16)){
  dir = 2;
  }
  
  
  if (dir == 1){
  x = x + (PI/64);
  }
  
  if (dir == 2){
  x = x - (PI/64);
  }
  
  lastx = x;
}


var video;

function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(320, 240);
  background(51);
}

function draw() {
  video.loadPixels();
  image(video, 0, 0);
  push();
  translate(video.width,0);
  scale(-1,1); 
  copy(video, 0, 0, 160, 240, 0, 0, 160, 240);
  pop();

  push();
  translate(video.width,video.height);
  scale(-1,-1); 
  copy(video, 0, 120, 160, 240, 0, 120, 160, 240);
  pop();
  
  push();
  translate(0,video.height);
  scale(1,-1); 
  copy(video, 0, 120, 160, 240, 0, 120, 160, 240);
  pop();

  
  
}

var video;
var x = 0;

function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(320, 240);
  background(51);
  video.hide();
}

function draw() {
 
  image(video, 0, 0);
  
  push();
  translate(video.width,0);
  scale(-1,1); 
  copy(video, 0, 0, 160, 240, 0, 0, 160, 240);
  pop();

  push();
  translate(video.width,video.height);
  scale(-1,-1); 
  copy(video, 0, 120, 160, 240, 0, 120, 160, 240);
  pop();
  
  push();
  translate(0,video.height);
  scale(1,-1); 
  copy(video, 0, 120, 160, 240, 0, 120, 160, 240);
  pop();
  
  translate(video.width/2, video.height/2);
  rotate(x);
  x = (x + PI/64);
}


var start, end, time;
var gif;

function setup(){
}

function draw(){
	time = end-start;
  //if (time > 1000){
  //text("You Died", 20, 20);
  var mapped = map(mouseX, 0, 390, 0, 1);
  scary = createImg("https://media.giphy.com/media/3ohhwvp1b6zv3vNePC/giphy.gif");
	scary.style("opacity", mapped);
  scary.position(0,0);
  //}
 
}

function mousePressed(){
	start = millis();
  clear();
}
function mouseReleased() {
	end = millis();
}// Your Mapboxgl API Key
var key = 'AIzaSyDuOOomp8GhKBNEk3MPjspdYcWpN5iSOn4'

// Create a new Mappa instance using Mapboxgl.
var mappa = new Mappa('Google', key);

var myMap;
var canvas;
var table;
let x1, y1, x2, y2, n;
var img;


function preload() {
  table = loadTable("https://raw.githubusercontent.com/patchbae/patchbae.github.io/master/citibike_50.csv", "header");
}

function setup() {
  colorMode(HSB, 50);
  canvas = createCanvas(800, 700);
  myMap = mappa.tileMap(40.7294245,-73.993707, 15); // lat 0, lng 0, zoom 4
  myMap.overlay(canvas)
  /*
  input = createInput();
  input.position(20, 65);

  button = createButton('Submit');
  button.position(input.x + input.width, 65);


  greeting = createElement('h2', 'Which Trip?');
  greeting.position(20, 5);

  textAlign(CENTER);
  textSize(50);
  */
}

function draw() {
  clear();
    //var pos = myMap.latLngToPixel(40.7294245, -73.993707);
    //fill(255, 0, 0);
    //ellipse(pos.x, pos.y, 20, 20);

  //var pos = myMap.latLngToPixel(40.7294245,-73.993707);
  //ellipse(pos.x, pos.y, 20, 20);

  
  for (var i = 0; i < table.getRowCount(); i++) {
    var row = table.getRow(i);
    // You can access the fields via their column name (or index)
    x1 = row.get("start station latitude");
    y1 = row.get("start station longitude");
    x2 = row.get("end station latitude");
    y2 = row.get("end station longitude");
    var pos1 = myMap.latLngToPixel(x1, y1);
    var pos2 = myMap.latLngToPixel(x2, y2);
    fill(i, 100, 100);
    ellipse(pos1.x, pos1.y, 8, 8);
    //fill(0);
    //text(i, pos1.x-5, pos1.y+5);
    //fill(0, 255, 0);
    ellipse(pos2.x, pos2.y, 8, 8);
    //fill(0);
    //text(i, pos2.x-5, pos2.y+5);
  	line(pos1.x, pos1.y, pos2.x, pos2.y);
  }
}
/*
function loadData() {
  // Load CSV file into a Table object
  // "header" option indicates the file has a header row

  // The size of the array of Bubble objects is determined by the total number of rows in the CSV
 // bubbles = []; 

  // You can access iterate over all the rows in a table
  //for (var i = 0; i < table.getRowCount(); i++) {
    var row = table.getRow();
    // You can access the fields via their column name (or index)
    x1 = row.get("start station latitude");
    y1 = row.get("start station longitude");
    x2 = row.get("end station latitude");
    y2 = row.get("end station longitude");
  //}
}
*/
/*
function Bubble(x, y, diameter, s) {
  this.x = Number(x);
  this.y = Number(y);
  this.diameter = Number(diameter);
  this.name = s;
  this.over = false;

  // Checking if mouse is over the Bubble
  this.rollover = function(px, py) {
    var d = dist(px, py, this.x, this.y);
    if (d < diameter/2) {
      this.over = true; 
    } else {
      this.over = false;
    }
  }
  
  // Display the Bubble
  this.display = function() {
    stroke(0);
    strokeWeight(2);
    noFill();
    ellipse(this.x, this.y, this.diameter, this.diameter);
    if (this.over) {
      textAlign(CENTER);
      noStroke();
      fill(0);
      text(this.name, this.x, this.y + this.diameter/2 + 20);
    }
  }
}
*/

/*
function callPage(){
    var origin = str("&origin=" + x1 + "," + y1);
  	var destination = str("&destination=" + x2 + "," + y2);
    var URL = str("https://www.google.com/maps/dir/?api=1" + origin + destination + "&travelmode=bicycling");
    window.open(URL);
}
*/
// An Array of Bubble objects
//var bubbles;
// A Table object
var table;
let x1, y1, x2, y2, n;

function preload() {
  table = loadTable("https://raw.githubusercontent.com/patchbae/patchbae.github.io/master/citibike_50.csv", "header");
}

function setup() {
  createCanvas(480, 900);
  input = createInput();
  input.position(20, 65);

  button = createButton('Submit');
  button.position(input.x + input.width, 65);


  greeting = createElement('h2', 'Which Trip?');
  greeting.position(20, 5);

  textAlign(CENTER);
  textSize(50);
}

function draw() {
  background(255);
  n = input.value();
  print(n);
  
  if (n) {
  loadData(n-1);
  }
  
  button.mousePressed(callPage);
  
    for (var i = 0; i < table.getRowCount(); i++) {
    var row = table.getRow(i);
    // You can access the fields via their column name (or index)
    var x = row.get("start station name");
    var y = row.get("end station name");
    textSize(10);
    text(x + " to " + y, 150, i*14 + 100);
  }
}

function loadData(n) {
  // Load CSV file into a Table object
  // "header" option indicates the file has a header row

  // The size of the array of Bubble objects is determined by the total number of rows in the CSV
 // bubbles = []; 

  // You can access iterate over all the rows in a table
  //for (var i = 0; i < table.getRowCount(); i++) {
    var row = table.getRow(n);
    // You can access the fields via their column name (or index)
    x1 = row.get("start station latitude");
    y1 = row.get("start station longitude");
    x2 = row.get("end station latitude");
    y2 = row.get("end station longitude");
  //}
}

/*
function Bubble(x, y, diameter, s) {
  this.x = Number(x);
  this.y = Number(y);
  this.diameter = Number(diameter);
  this.name = s;
  this.over = false;

  // Checking if mouse is over the Bubble
  this.rollover = function(px, py) {
    var d = dist(px, py, this.x, this.y);
    if (d < diameter/2) {
      this.over = true; 
    } else {
      this.over = false;
    }
  }
  
  // Display the Bubble
  this.display = function() {
    stroke(0);
    strokeWeight(2);
    noFill();
    ellipse(this.x, this.y, this.diameter, this.diameter);
    if (this.over) {
      textAlign(CENTER);
      noStroke();
      fill(0);
      text(this.name, this.x, this.y + this.diameter/2 + 20);
    }
  }
}
*/


function callPage(){
    var origin = str("&origin=" + x1 + "," + y1);
  	var destination = str("&destination=" + x2 + "," + y2);
    var URL = str("https://www.google.com/maps/dir/?api=1" + origin + destination + "&travelmode=bicycling");
    window.open(URL);
}
// Given the following CSV file called "mammals.csv"
// located in the project's "assets" folder:
//
// id,species,name
// 0,Capra hircus,Goat
// 1,Panthera pardus,Leopard
// 2,Equus zebra,Zebra

var table;

function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  //table = loadTable("assets/mammals.csv", "csv", "header");
  //the file can be remote
  table = loadTable("https://raw.githubusercontent.com/patchbae/patchbae.github.io/master/citibike_50.csv",
                    "csv", "header");
}

function setup() {
  //count the columns
  //print(table.getRowCount() + " total rows in table");
  //print(table.getColumnCount() + " total columns in table");
	var startStationName = new Array(table.getColumn("start station name"));
  //print(table.getColumn("start station name"));
 	//print(table.getColumn("end station name"));
  print(startStationName[1]);
  
  //["Goat", "Leopard", "Zebra"]
  /*
  //cycle through the table
  for (var r = 0; r < table.getRowCount(); r++)
    for (var c = 0; c < table.getColumnCount(); c++) {
      print(table.getString(r, c));
    }
  */
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}//var serial;          // variable to hold an instance of the serialport library
//var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var r, g, b;
var x = 50;
var x1 = 250;
var x2 = 450;

function setup() { 
  createCanvas(600, 400);
  /*
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  */
  redslider = createSlider(0, 255, 0);
  greenslider = createSlider(0, 255, 0);
  blueslider = createSlider(0, 255, 0);
  redslider.position(30, 100);
  greenslider.position(230, 100);
  blueslider.position(430, 100);
 
  //noStroke();
} 

function draw() { 
	background(r, g, b);
  
  r = redslider.value();
  g = greenslider.value();
  b = blueslider.value();
  
  
  fill(0, g, b);
  rect(x, 150, 10, 88);
  
  fill(32, g, b);
  rect(x+10, 150, 10, 88);
  
  fill(64, g, b);
  rect(x+20, 150, 10, 88);
  
  fill(96, g, b);
  rect(x+30, 150, 10, 88);
  
  fill(128, g, b);
  rect(x+40, 150, 10, 88);
  
  fill(160, g, b);
  rect(x+50, 150, 10, 88);
  
  fill(192, g, b);
  rect(x+60, 150, 10, 88);
  
  fill(224, g, b);
  rect(x+70, 150, 10, 88);
  
  fill(255, g, b);
  rect(x+80, 150, 10, 88);
  
  //Green
  fill(r, 0, b);
  rect(x1, 150, 10, 88);
  
  fill(r, 32, b);
  rect(x1+10, 150, 10, 88);
  
  fill(r, 64, b);
  rect(x1+20, 150, 10, 88);
  
  fill(r, 96, b);
  rect(x1+30, 150, 10, 88);
  
  fill(r, 128, b);
  rect(x1+40, 150, 10, 88);
  
  fill(r, 160, b);
  rect(x1+50, 150, 10, 88);
  
  fill(r, 192, b);
  rect(x1+60, 150, 10, 88);
  
  fill(r, 224, b);
  rect(x1+70, 150, 10, 88);
  
  fill(r, 255, b);
  rect(x1+80, 150, 10, 88);
  
  //Blue
  fill(r, g, 0);
  rect(x2, 150, 10, 88);
  
  fill(r, g, 32);
  rect(x2+10, 150, 10, 88);
  
  fill(r, g, 64);
  rect(x2+20, 150, 10, 88);
  
  fill(r, g, 96);
  rect(x2+30, 150, 10, 88);
  
  fill(r, g, 128);
  rect(x2+40, 150, 10, 88);
  
  fill(r, g, 160);
  rect(x2+50, 150, 10, 88);
  
  fill(r, g, 192);
  rect(x2+60, 150, 10, 88);
  
  fill(r, g, 224);
  rect(x2+70, 150, 10, 88);
  
  fill(r, g, 255);
  rect(x2+80, 150, 10, 88);
  
  fill(0);
  rect(50, 285, 490, 20)
  fill(255);
  text("R: " + Math.round(r),80, 300); 
  fill(255);
  text("G: " + Math.round(g), 280, 300);
  fill(255);
  text("B: " + Math.round(b), 480, 300);
}

/*
function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {

var inString = serial.readStringUntil('\r\n');
 
  //check to see that there's actually a string there:
  if (inString.length > 0 ) {
    var sensors = split(inString, ',');            // split the string on the commas
    if (sensors.length > 2) {                      // if there are three elements
      r = map(sensors[0], 0, 1024, 0, 255);   // element 0 is the locH
      g = map(sensors[1], 0, 1024, 0, 255); // element 1 is the locV
      b = map(sensors[2], 0, 1024, 0, 255)  // element 2 is the button
    }
  }
 
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

*/

var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var r, g, b;
var x = 45;
var x1 = 240;
var x2 = 440;

function setup() { 
  createCanvas(600, 400);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  redslider = createSlider(0, 255, 0);
  greenslider = createSlider(0, 255, 0);
  blueslider = createSlider(0, 255, 0);
  redslider.position(30, 100);
  greenslider.position(220, 100);
  blueslider.position(430, 100);
 
  //noStroke();
} 

function draw() { 
	background(r, g, b);
  redslider.value(r);
  greenslider.value(g);
  blueslider.value(b);
  
  fill(0, g, b);
  rect(x, 150, 10, 88);
  
  fill(32, g, b);
  rect(x+10, 150, 10, 88);
  
  fill(64, g, b);
  rect(x+20, 150, 10, 88);
  
  fill(96, g, b);
  rect(x+30, 150, 10, 88);
  
  fill(128, g, b);
  rect(x+40, 150, 10, 88);
  
  fill(160, g, b);
  rect(x+50, 150, 10, 88);
  
  fill(192, g, b);
  rect(x+60, 150, 10, 88);
  
  fill(224, g, b);
  rect(x+70, 150, 10, 88);
  
  fill(255, g, b);
  rect(x+80, 150, 10, 88);
  
  //Green
  fill(r, 0, b);
  rect(x1, 150, 10, 88);
  
  fill(r, 32, b);
  rect(x1+10, 150, 10, 88);
  
  fill(r, 64, b);
  rect(x1+20, 150, 10, 88);
  
  fill(r, 96, b);
  rect(x1+30, 150, 10, 88);
  
  fill(r, 128, b);
  rect(x1+40, 150, 10, 88);
  
  fill(r, 160, b);
  rect(x1+50, 150, 10, 88);
  
  fill(r, 192, b);
  rect(x1+60, 150, 10, 88);
  
  fill(r, 224, b);
  rect(x1+70, 150, 10, 88);
  
  fill(r, 255, b);
  rect(x1+80, 150, 10, 88);
  
  //Blue
  fill(r, g, 0);
  rect(x2, 150, 10, 88);
  
  fill(r, g, 32);
  rect(x2+10, 150, 10, 88);
  
  fill(r, g, 64);
  rect(x2+20, 150, 10, 88);
  
  fill(r, g, 96);
  rect(x2+30, 150, 10, 88);
  
  fill(r, g, 128);
  rect(x2+40, 150, 10, 88);
  
  fill(r, g, 160);
  rect(x2+50, 150, 10, 88);
  
  fill(r, g, 192);
  rect(x2+60, 150, 10, 88);
  
  fill(r, g, 224);
  rect(x2+70, 150, 10, 88);
  
  fill(r, g, 255);
  rect(x2+80, 150, 10, 88);
  
  fill(0);
  rect(60, 285, 460, 20)
  fill(255);
  text("R: " + Math.round(r),80, 300); 
  fill(255);
  text("G: " + Math.round(g), 270, 300);
  fill(255);
  text("B: " + Math.round(b), 470, 300);
}


function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {

var inString = serial.readStringUntil('\r\n');
 
  //check to see that there's actually a string there:
  if (inString.length > 0 ) {
    var sensors = split(inString, ',');            // split the string on the commas
    if (sensors.length > 2) {                      // if there are three elements
      r = map(sensors[0], 0, 1024, 0, 255);   // element 0 is the locH
      g = map(sensors[1], 0, 1024, 0, 255); // element 1 is the locV
      b = map(sensors[2], 0, 1024, 0, 255)  // element 2 is the button
    }
  }
 
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}
var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here
var inData;                             // for incoming serial data
var speed = 0; 
var myButton;
var counter;
var state = 0;
var time = 100;

function setup() { 
  createCanvas(displayWidth, displayHeight-95);
  myButton = createButton("Strobe");
  myButton.position((width/2-20), height-24);
  myButton.mousePressed(strobeON);
  myButton.mouseReleased(strobeOFF);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
} 

function draw() { 
  if (state == 1){
  strobe();
  }
  else{
    background(0);
  }
  print(state);
}


function strobe(){
  if (counter() < (time/2 - 1)){
    background(0);
  }
    if (counter() > time/2){
    background(255);
  }
}

function counter(){
  return millis() % time;
}

function strobeON(){
  state = 1;
}

function strobeOFF(){
 state = 0;
}



function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
 time = Number(serial.read());
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}
var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var locH, locV;        // location of the circle
var circleColor = 255; // color of the circle 

function setup() {
 createCanvas(640, 480);          // make canvas
 smooth();                        // antialias drawing lines
 serial = new p5.SerialPort();    // make a new instance of the serialport library
 serial.on('list', printList);    // set a callback function for the serialport list event
 serial.on('connected', serverConnected); // callback for connecting to the server
 serial.on('open', portOpen);     // callback for the port opening
 serial.on('data', serialEvent);  // callback for when new data arrives
 serial.on('error', serialError); // callback for errors
 serial.on('close', portClose);   // callback for the port closing
 
 serial.list();                   // list the serial ports
 serial.open(portName);           // open a serial port
}

function draw() {
 background(0);               // black background
 fill(circleColor);           // fill depends on the button
 ellipse(locH, locV, 50, 50); // draw the circle
}

// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 println(i + " " + portList[i]);
 }
}
 
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 println(i + " " + portList[i]);
 }
}

function serverConnected() {
 println('connected to server.');
}
 
function portOpen() {
 println('the serial port opened.')
}
 
function serialError(err) {
 println('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
 println('The serial port closed.');
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here
var inData;                             // for incoming serial data
var xPos = 0; 
var yPos = 150;

function setup() {
   createCanvas(400, 300);
  background(0x08, 0x16, 0x40);


  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}

function draw() {
graphData(inData)
}
 
function serialEvent() {
 inData = Number(serial.read());
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

function graphData() {
  // map the range of the input to the window height:
 
  // draw the line in a pretty color:
  point(xPos, yPos);
  // at the edge of the screen, go back to the beginning:
}

var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here
var inData;                             // for incoming serial data
var speed = 0; 
var myButton;
var counter;
var state = 0;
var start, end, time;
var gif, scary, scary1;
var bright, mapped;


function setup() { 
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  
  scary = createImg("https://media.giphy.com/media/l1J9CLaIE5DeZ2jLi/giphy.gif");
  scary.style("opacity", 0);
  dead = createImg("https://media.giphy.com/media/l1J9MDIEL5qloBapi/giphy.gif");
	dead.style("opacity", 0);

} 

function draw() { 
  background(0, 0, 0, 255);
 	//time = end-start;
  //if (time > 1000){
  //text("You Died", 20, 20);
			
  if (mapped > 0.4){
    textSize(100);
    fill(255, 0, 0);
    text("STAY IN THE LIGHT!", 50, 100);
    dead.style("opacity", 0);
    scary.style("opacity", mapped);
    scary.position(windowWidth/2 - 200, windowHeight/2 - 200);

  } 
  
  if (mapped < 0.4) {
    scary.style("opacity", 0);
    dead.style("opacity", 1);
    dead.position(windowWidth/2 + 150, windowHeight/2 - 300);
    textSize(200);
    fill(255, 0, 0);
    text("You Died", 150, 450);
  }
  //}
 
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
 bright = Number(serial.read());
 mapped = map(bright, 60 , 220, 0, 1);

}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}
var myButton;
var counter;
var state = 0;
var time = 100;

function setup() { 
  createCanvas(displayWidth, displayHeight-95);
  myButton = createButton("Strobe");
  myButton.position((width/2-20), height-20);
  myButton.mousePressed(strobeON);
  myButton.mouseReleased(strobeOFF);
} 

function draw() { 
  if (state == 1){
  strobe();
  }
  else{
    background(0);
  }
  print(state);
}


function strobe(){
  if (counter() < (time/2 - 1)){
    background(0);
  }
    if (counter() > time/2){
    background(255);
  }
}

function counter(){
  return millis() % time;
}

function strobeON(){
  state = 1;
}

function strobeOFF(){
 state = 0;
}

  
var circles = [];
//var balls = [];

function setup() { 
  createCanvas(400, 400);
  smooth();
  frameRate(30);
  smooth();
  background(0);
} 

function draw() { 
  background(0);
  click();
  for (var i=0; i<circles.length;i++){
    circles[i].fall();
    circles[i].display();
    circles[i].bounce();
    }
 /*
  for (var j=0; j<balls.length;j++){
    balls[j].drawball();
    balls[j].bounce();
    }
    */
  lengthCheck();
  print(circles.length);
  }

class circle{
  
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.diameter = random(1,10);
    //this.speedx = random(-5,5);
    this.speedy = random(-5,5);
    this.color = color(random(255), random(255), random(255));
  }

    fall(){
      //this.x += this.speedx
      this.y += this.speedy;

    }
   display(){
      fill(this.color);
      stroke(this.color);
    	ellipse(this.x, this.y, this.diameter);
     }
  
  bounce(){
    if(this.y > height){
      this.speedy = this.speedy*(-1);
    }
    if(this.y < 0){
      this.speedy = this.speedy*(-1);
    }
    /*
      if(this.x > width){
      this.speedx = this.speedx*(-1);
    }
    if(this.x < 0){
      this.speedx = this.speedx*(-1);
    }
    */
    
    }
  
}

function click() {
  if (mouseIsPressed){
    	circles.push(new circle());
    	//balls.push(new ball());
  }
}

function lengthCheck() {
  if (circles.length > 200) {
  	circles.splice(0, 1) ;
  }
}
/*
class ball {
  constructor() {
    this.x = width/2;
    this.y = height;
    this.angle=map(mouseX,0,width,8,-8); //maps mouse location to angle
  }
  drawball () {
    noStroke();
    fill(0,0,0);
    rect(this.x,this.y,10,10);
    this.y = this.y - 2; //controls the speed of the balls being fired
    this.x = this.x - this.angle;
  }
}
*/var circles = [];
//var balls = [];

function setup() { 
  background(0);
  createCanvas(400, 400);
  smooth();
  frameRate(30);
  smooth();
  background(0);
} 

function draw() { 
   background(0);
  click();
  for (var i=0; i<circles.length;i++){
    circles[i].fall();
    circles[i].display();
    circles[i].bounce();
    }
 /*
  for (var j=0; j<balls.length;j++){
    balls[j].drawball();
    balls[j].bounce();
    }
    */
  lengthCheck();
  print(circles.length);
  }

class circle{
  
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.diameter = random(1,10);
    this.speedx = random(-5,5);
    this.speedy = random(-5,5);
    this.color = color(random(255), random(255), random(255));
  }

    fall(){
      this.x += this.speedx
      this.y += this.speedy;

    }
   display(){
      fill(this.color);
      stroke(this.color);
    	ellipse(this.x, this.y, this.diameter);
     }
  
  bounce(){
    if(this.y > height){
      this.speedy = this.speedy*(-1);
    }
    if(this.y < 0){
      this.speedy = this.speedy*(-1);
    }
      if(this.x > width){
      this.speedx = this.speedx*(-1);
    }
    if(this.x < 0){
      this.speedx = this.speedx*(-1);
    }
    
    }
  
}

function click() {
  if (mouseIsPressed){
    	circles.push(new circle());
    	//balls.push(new ball());
  }
}

function lengthCheck() {
  if (circles.length > 200) {
  	circles.splice(0, 1) ;
  }
}
/*
class ball {
  constructor() {
    this.x = width/2;
    this.y = height;
    this.angle=map(mouseX,0,width,8,-8); //maps mouse location to angle
  }
  drawball () {
    noStroke();
    fill(0,0,0);
    rect(this.x,this.y,10,10);
    this.y = this.y - 2; //controls the speed of the balls being fired
    this.x = this.x - this.angle;
  }
}
*/var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here
var inData;                             // for incoming serial data
var xPos = 0; 

function setup() {
   createCanvas(400, 300);
  background(0x08, 0x16, 0x40);


  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}

function draw() {
graphData(inData)
}
 
function serialEvent() {
 inData = Number(serial.read());
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

function graphData(newData) {
  // map the range of the input to the window height:
  var yPos = map(newData, 0, 255, 0, height);
  // draw the line in a pretty color:
  stroke(0xA8, 0xD9, 0xA7);
  line(xPos, height, xPos, height - yPos);
  // at the edge of the screen, go back to the beginning:
  if (xPos >= width) {
    xPos = 0;
    // clear the screen by resetting the background:
    background(0x08, 0x16, 0x40);
  } else {
    // increment the horizontal position for the next reading:
    xPos++;
  }
}

var circles = [];
var balls = [];

function setup() { 
  createCanvas(400, 400);
  smooth();
  frameRate(30);
  smooth();
  background(0);
} 

function draw() { 
  click();
  for (var i=0; i<circles.length;i++){
    circles[i].fall();
    circles[i].display();
    circles[i].bounce();
    }
  for (var j=0; j<balls.length;j++){
    balls[j].drawball();
    balls[j].bounce();
    }
  lengthCheck();
  print(circles.length);
  }

class circle{
  
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.diameter = random(1,10);
    this.speedx = random(-5,5);
    this.speedy = random(-5,5);
    this.color = color(random(255), random(255), random(255));
  }

    fall(){
      this.x += this.speedx
      this.y += this.speedy;

    }
   display(){
      fill(this.color);
      stroke(this.color);
    	ellipse(this.x, this.y, this.diameter);
     }
  
  bounce(){
    if(this.y > height){
      this.speedy = this.speedy*(-1);
    }
    if(this.y < 0){
      this.speedy = this.speedy*(-1);
    }
      if(this.x > width){
      this.speedx = this.speedx*(-1);
    }
    if(this.x < 0){
      this.speedx = this.speedx*(-1);
    }
    
    }
  
}

function click() {
  if (mouseIsPressed){
    	circles.push(new circle());
    	balls.push(new ball());
  }
}

function lengthCheck() {
  if (circles.length > 25) {
  	circles.splice(0, 1) ;
  }
}

class ball {
  constructor() {
    this.x = width/2;
    this.y = height;
    this.angle=map(mouseX,0,width,8,-8); //maps mouse location to angle
  }
  drawball () {
    noStroke();
    fill(0,0,0);
    rect(this.x,this.y,10,10);
    this.y = this.y - 2; //controls the speed of the balls being fired
    this.x = this.x - this.angle;
  }
    bounce(){
    if(this.y > height){
      this.speedy = this.speedy*(-1);
    }
    if(this.y < 0){
      this.speedy = this.speedy*(-1);
    }
      if(this.x > width){
      this.speedx = this.speedx*(-1);
    }
    if(this.x < 0){
      this.speedx = this.speedx*(-1);
    }
    
    }
}
  var count = 0;
var posY = [];
var faders = 3;



function setup() {
  createCanvas(400, 400);
  frameRate(30);
  generate(faders);
}

function draw() {
	background(posYMap(25), posYMap(75), posYMap(125));

  colorPicker(posYMap(25), posYMap(75), posYMap(125)); //Blair's addition
  for (i = 25; i < faders ; i += 50) {
    Fader(i, 50, 350);
  }

}

function colorPicker(r,g,b){
  rect(280,85,110,60);
  textAlign(CENTER);
  textStyle(BOLD);
  text("Color Picker",335,100);
  textStyle(NORMAL);
  text("R: " + Math.round(r),335,112); 
  text("G: " + Math.round(g),335,125);
  text("B: " + Math.round(b),335,138);
  print(r);
}

function Fader(x, y1, y2) {
  strokeWeight(4);
  line(x, y1, x, y2);
  var flagX, flagY;

  if (mouseX > x - 22 && mouseX < x + 22) {
    flagX = true;
  }

  if (mouseY > y1-1  && mouseY < y2+1) {
    flagY = true;
  }

  if (flagY && flagX && mouseIsPressed) {
    posY[i] = mouseY;
    count = i;
  }
  ellipse(x, posY[i], 40, 40);
  
}

function generate(x){
  	faders = x * 50;
    for (i = 25; i < faders; i += 50) {
    posY[i]=350;
  }
}

function posYMap(i){
  var pos_y = posY[i];
	return map(pos_y, 350, 50, 0, 255);

	}

// function mousePressed(){
// 	if (mouseX)
// }
/*
class slider{
  constructor(x,,,){
    this.x = x;
  }
  slide(){

  }
  
}
*///keeps track of where the chicken is on the screen
var chicken = {
  x: -30,
  y: (Math.random() * 200) + 70,
}

var tinyChicken = {
  x: chicken.x - 100,
  y: chicken.y + 60,
}

//keeps the egg in place & onscreen once it has been laid
var eggX;
var eggY;

var eggW;
var eggH;

// function egg(){
//   this.x = 0;
//   this.y = 0;
//   this.fall = {
//     this.y++
//   }

//}




var isEgg; //keeps track of whether or not an egg has been laid
var hatchedEgg; //keeps track of hatched or unhatched egg
var isChickHatched;

//counts how many eggs the chicken has laid that have hit the nest
var eggCounter;

//the speed of the chicken
var chickenSpeed;

//where nest appears is dictated by this var
var randomNestPos;

function preload() {
  plopSound = loadSound('plop.mp3');
  chickSound = loadSound('chicken.wav');
  chickSoundShort = loadSound('chickenshort.wav');
  grass = loadImage("grass.jpg");

}

function setup() {
  createCanvas(400, 400);

  chickSound.setVolume(0.2);
  chickSound.play();

  chicken.x = -30;
  chicken.y = (Math.random() * 200) + 70;
  isEgg = 0;
  hatchedEgg = 0;
  isChickHatched = 0;
  eggCounter = 0;
  chickenSpeed = 8;
  randomNestPos = (Math.random() * 200) + 70;

  eggW = 20;
  eggH = 30;

}

function draw() {
  frameRate(chickenSpeed);
  background(26, 148, 49);
  //background(grass);

  drawTinyChicken();




  laidEgg();
  nest();


  //below is another version of the game where you can simply run the mouse over the chicken 
  //layEgg(); 

  drawChicken();

  chickenWalking();

  checkIfEggHitNest();



}

function nest() {
  //nest
  fill(170, 107, 51);
  // ellipse(200,360,100,30);
  // point(150, 370);
  ellipseMode(CENTER);

  ellipse(randomNestPos, 385, 50, 30); //brown nest


  fill(255, 215, 0);
  ellipse(randomNestPos, 360, 40, 60); //egg in nest

  fill(0);
  strokeWeight(0);
  textSize(20);
  textAlign(CENTER);
  text(eggCounter, randomNestPos, 365);
}

function checkIfEggHitNest() {
  //egg count increases
  if ((eggX < randomNestPos + 25) && (eggX > randomNestPos - 25)) {
    if (eggY > 420) {
      eggCounter++;
      randomNestPos = (Math.random() * 200) + 70;
      chickenSpeed = chickenSpeed + 1;
    }
  }
  //chicken speeds up
}

//drops most recently laid egg down the screen
function laidEgg() {


  //so the egg won't fall infinitely
  if (eggY >= 430) {
    isEgg = 0;
    hatchedEgg = 0;
  }

  //is there an egg at all?
  if (isEgg == 1) {
    //the egg has not been hatched
    if (hatchedEgg == 0) {
      drawEgg();
      eggY = eggY + 8;
    }
    //the egg was hatched
    else if (hatchedEgg == 1) {
      drawEgg();
      eggY = eggY + 8;
    }


  }

}


function drawEgg() {
  if (hatchedEgg == 0) {
    fill(255, 215, 0);
    ellipse(eggX, eggY, eggW, eggH);
  } else if (hatchedEgg == 1) {
    strokeWeight(2);
    fill(255, 215, 0);
    arc(eggX, eggY, eggW, eggH, 6.3, 3.1, CLOSE);
    line(eggX - (eggW / 2), eggY, eggX - eggW / 5, eggY + (eggH / 6));
    line(eggX - eggW / 5, eggY + (eggH / 6), eggX, eggY);
    line(eggX, eggY, eggX + eggW / 5, eggY + (eggH / 6));
    line(eggX + eggW / 5, eggY + (eggH / 6), eggX + (eggW / 2) - 1, eggY);
    noStroke();
    fill(26, 148, 49);
    triangle(eggX - (eggW / 2) + 2, eggY, eggX - (eggW / 5), eggY + (eggH / 6), eggX - 2, eggY);
    triangle(eggX + 2, eggY, eggX + eggW / 5, eggY + (eggH / 6), eggX + (eggW / 2) - 2, eggY);
    stroke(0);
    //strokeWeight(2);
    //fill(0);

  }

}


function mousePressed() {

  if (mouseX <= chicken.x + 33 && mouseX >= chicken.x - 33 && mouseY <= chicken.y + 40 && mouseY >= chicken.y - 40) {

    //noise of egg being laid plays
    plopSound.setVolume(0.5);
    plopSound.play();
    
    hatchedEgg = 0;

    //the egg appears once
    drawEgg();

    //egg position is initialized
    eggX = chicken.x;
    eggY = chicken.y + 80;

    //there is now an egg on screen
    isEgg = 1;

    //this makes it looks like a tiny jump when you touch the chicken
    chicken.x += 15;

    //chicken makes a startled noise
    chickSoundShort.setVolume(0.5);
    chickSoundShort.play();
  } else if (mouseX <= eggX + 10 && mouseX >= eggX - 10 && mouseY <= eggY + 15 && mouseY >= eggY - 15) {
    hatchedEgg = 1;
    isChickHatched = 1;
    drawTinyChicken();
  }
}


//advances the cute chicken across the screen
function chickenWalking() {
  if (chicken.x == -30) {
    chicken.x = chicken.x + chickenSpeed;
    //chicken.y++;
  } else if (chicken.x > 450 || chicken.y > 300) {
    chicken.x = -30;
    chicken.y = (Math.random() * 200) + 70;
  } else if (chicken.x >= -29) {
    chicken.x = chicken.x + chickenSpeed;
    //chicken.y++;
  }
}


//the cute chicken drawing
function drawChicken() {
  ellipseMode(CENTER);
  strokeWeight(2);

  //chicken hat
  fill(255, 40, 0);
  ellipse(chicken.x + 20, chicken.y - 35, 10, 15);
  arc(chicken.x + 15, chicken.y - 40, 8, 25, 2, 6.5, OPEN);

  //beak
  fill(255, 255, 0);
  arc(chicken.x + 32, chicken.y - 12, 8, 15, 6.3, 2);
  line(chicken.x + 32, chicken.y - 12, chicken.x + 36, chicken.y - 12);

  //chicken body
  fill(255);
  ellipse(chicken.x, chicken.y, 66, 80);
  //arc(mouseX,mouseY,66,80,3.5,3,OPEN);

  //chicken wing
  line(chicken.x, chicken.y, chicken.x - 10, chicken.y - 10);
  line(chicken.x - 10, chicken.y - 10, chicken.x - 10, chicken.y);

  //chicken eye
  fill(0);
  ellipse(chicken.x + 10, chicken.y - 10, 5, 10);

  //middle foot
  line(chicken.x, chicken.y + 40, chicken.x, chicken.y + 45);
  line(chicken.x, chicken.y + 45, chicken.x + 3, chicken.y + 45);

  //right foot
  line(chicken.x, chicken.y + 40, chicken.x, chicken.y + 45);
  line(chicken.x, chicken.y + 45, chicken.x + 3, chicken.y + 45);
}

function drawTinyChicken() {

  if (isChickHatched == 1) {

    ellipseMode(CENTER);
    strokeWeight(2);

    //chicken hat
    fill(255, 40, 0);
    ellipse(tinyChicken.x + 3, tinyChicken.y - 8, 8, 15);

    //beak
    fill(255, 255, 0);
    arc(tinyChicken.x + 8, tinyChicken.y - 1, 6, 10, 6.3, 2);
    line(tinyChicken.x + 8, tinyChicken.y - 1, tinyChicken.x + 11, tinyChicken.y - 1);

    //chicken body
    fill(255);
    ellipse(tinyChicken.x, tinyChicken.y, 15, 20);
    //arc(mouseX,mouseY,66,80,3.5,3,OPEN);

    //chicken wing
    line(tinyChicken.x, tinyChicken.y, tinyChicken.x - 3, tinyChicken.y - 3);
    line(tinyChicken.x - 3, tinyChicken.y - 3, tinyChicken.x - 3, tinyChicken.y);

    //chicken eye
    fill(0);
    ellipse(tinyChicken.x + 3, tinyChicken.y - 3, 2, 4);

    //leg
    line(tinyChicken.x, tinyChicken.y + 10, tinyChicken.x, tinyChicken.y + 15);

    //foot
    line(tinyChicken.x, tinyChicken.y + 15, tinyChicken.x + 2, tinyChicken.y + 15)

    //advance chick
    tinyChicken.x = chicken.x - 40;
    tinyChicken.y = chicken.y + 30;
  }
}



//this is a different version of the game
// function layEgg() {

//   if (mouseX <= chicken.x + 33 && mouseX >= chicken.x - 33 && mouseY <= chickenY + 40 && mouseY >= chickenY - 40) {



//     fill(255);
//     ellipse(chicken.x, chickenY, 20, 30);
//     eggX = chicken.x;
//     eggY = chickenY;
//     isEgg = 1;
//     eggCounter++;

//   }
// }var posY = 380; // sets default position of the fader
var angle, rot;

function setup() {
  createCanvas(400, 400);
  frameRate(30);
  colorMode(HSB, 360, 100, 100, 1); // changes color mode to HSB with 300 values
  rectMode(CENTER);
  textAlign(CENTER);
}

function draw() {
  background(posY-20, 100, 100, 1); // color of the background set by posY
  Fader(200, 20, 380);
  angler();
}

function Fader(x, y1, y2) {
  strokeWeight(4);

  line(x, y1, x, y2);
  var flagX, flagY;
  
  if (mouseY > y1-1 && mouseY < y2+1 ) { // makes sure mouse is above or below fader
    flagY = true;
  }
  
  if (mouseX > x - 40 && mouseX < x + 40) { // makes sure mouse is within fader's width
    flagX = true;
  }

  if ((flagY && flagX) && mouseIsPressed) { // if a click is made within the fader
    posY = mouseY; //set posY to current mouse position
  }
  var inverse = (posY+100)%360; // gets inverse color 
  rot = map(posY, 20, 380, 0, TWO_PI);
  //spin mode
  translate(200, posY);
  rotate(rot);
  //  
  fill(inverse, 100, 100, 1); //sets fader color to inverse color
  rect(0, 0, 80, 40);
}

function angler() {
  rotate(0 - rot);
  angle = abs(round(180 - degrees(rot)));
  fill(posY-50, 100, 100, 1)
  text(angle, 0, 5);
}

  
  //keeps track of where the chicken is on the screen
var chicken = {
  x: -30,
  y: (Math.random() * 200) + 70,
}

//keeps the egg in place & onscreen once it has been laid
var eggX;
var eggY;
//DAN DID THIS:
// function egg(){
//   this.x = 0;
//   this.y = 0;
//   this.fall = {
//     this.y++
//   }

//}



// var chickenX;
// var chickenY;

var isEgg; //keeps track of whether or not an egg has been laid



//counts how many eggs the chicken has laid
var eggCounter;

//the speed of the chicken
var chickenSpeed;

var randomx;

function preload() {
  plopSound = loadSound('plop.mp3');
  chickSound = loadSound('chicken.wav');
  chickSoundShort = loadSound('chickenshort.wav');
  grass = loadImage("grass.jpg");

}

function setup() {
  createCanvas(400, 400);

  chickSound.setVolume(0.2);
  chickSound.play();

  chicken.x = -30;
  chicken.y = (Math.random() * 200) + 70;
  isEgg = 0;
  eggCounter = 0;
  chickenSpeed = 10;
	randomx = random(400);

}

function draw() {
  frameRate(chickenSpeed);
  background(26, 148, 49);
  //background(grass);


  nest();

  laidEgg();

  //below is another version of the game where you can simply run the mouse over the chicken 
  //layEgg(); 

  drawChicken();

  chickenWalking();
	
	check();



}

function nest() {
  //nest
  fill(170, 107, 51);
  // ellipse(200,360,100,30);
  // point(150, 370);
  ellipseMode(CENTER);

  ellipse(randomx, 385, 70, 30);


  fill(255, 215, 0);
  ellipse(randomx, 360, 40, 60);

  //arc(200, 360,40,20,6.2,3);



  fill(0);
  textSize(20);
  textAlign(CENTER);
  text(eggCounter, randomx, 365);
}

function check() {
	    //egg count increases
		if ((eggX < randomx + 15) && (eggX > randomx - 15)){
			print(eggY);
			if(eggY > 420){
   	 eggCounter++;
		 randomx = random(400)
		 chickenSpeed = chickenSpeed + 1;
			}
				}
	    //chicken speeds up
}

//drops most recently laid egg down the screen
function laidEgg() {
  if (isEgg == 1) {
    fill(255, 215, 0);
    ellipse(eggX, eggY, 20, 30);
    eggY = eggY + 8;
    //     for(eggY; eggY <=  430; eggY++){

    //     }
  }
  //DAN DID THIS:
  //eggs.add(new Egg());
}





function mousePressed() {

  if (mouseX <= chicken.x + 33 && mouseX >= chicken.x - 33 && mouseY <= chicken.y + 40 && mouseY >= chicken.y - 40) {

    //noise of egg being laid plays
    plopSound.setVolume(0.5);
    plopSound.play();

    //the egg appears once
    fill(255, 215, 0);
    ellipse(chicken.x, chicken.y + 35, 20, 30);

    //egg position is initialized
    eggX = chicken.x;
    eggY = chicken.y + 80;
		
    //there is now an egg on screen
    isEgg = 1;

    //this makes it looks like a tiny jump when you touch the chicken
    //chickenX+=15;
    chicken.x += 15;

    //chicken makes a startled noise
    chickSoundShort.setVolume(0.5);
    chickSoundShort.play();
  }

}


//advances the cute chicken across the screen
function chickenWalking() {
  if (chicken.x == -30) {
    chicken.x = chicken.x + chickenSpeed;
    //chicken.y++;
  } else if (chicken.x > 450 || chicken.y > 300) {
    chicken.x = -30;
    chicken.y = (Math.random() * 200) + 70;
  } else if (chicken.x >= -29) {
    chicken.x = chicken.x + chickenSpeed;
    //chicken.y++;
  }
	print(chicken.x);
}


//the cute chicken drawing
function drawChicken() {
  ellipseMode(CENTER);
  strokeWeight(2);

  //chicken hat
  fill(255, 40, 0);
  ellipse(chicken.x + 20, chicken.y - 35, 10, 15);
  arc(chicken.x + 15, chicken.y - 40, 8, 25, 2, 6.5, OPEN);

  //beak
  fill(255, 255, 0);
  arc(chicken.x + 32, chicken.y - 12, 8, 15, 6.3, 2);
  line(chicken.x + 32, chicken.y - 12, chicken.x + 36, chicken.y - 12);

  //chicken body
  fill(255);
  ellipse(chicken.x, chicken.y, 66, 80);
  //arc(mouseX,mouseY,66,80,3.5,3,OPEN);

  //chicken wing
  line(chicken.x, chicken.y, chicken.x - 10, chicken.y - 10);
  line(chicken.x - 10, chicken.y - 10, chicken.x - 10, chicken.y);

  //chicken eye
  fill(0);
  ellipse(chicken.x + 10, chicken.y - 10, 5, 10);

  //middle foot
  line(chicken.x, chicken.y + 40, chicken.x, chicken.y + 45);
  line(chicken.x, chicken.y + 45, chicken.x + 3, chicken.y + 45);

  //right foot
  line(chicken.x, chicken.y + 40, chicken.x, chicken.y + 45);
  line(chicken.x, chicken.y + 45, chicken.x + 3, chicken.y + 45);
}




//this is a different version of the game
// function layEgg() {

//   if (mouseX <= chicken.x + 33 && mouseX >= chicken.x - 33 && mouseY <= chickenY + 40 && mouseY >= chickenY - 40) {



//     fill(255);
//     ellipse(chicken.x, chickenY, 20, 30);
//     eggX = chicken.x;
//     eggY = chickenY;
//     isEgg = 1;
//     eggCounter++;

//   }
// }var count = 0;
var posY = [];
var faders = 3;
var Red, Green, Blue;
var colour = [];

function setup() {
  createCanvas(400, 400);
  frameRate(30);
  generate(faders);
}

function draw() {
	background(posYMap(25), posYMap(75), posYMap(125));
  for (i = 25; i < faders ; i += 50) {
    Fader(i, 50, 350);
    
  }
}

function Fader(x, y1, y2, colour) {
  strokeWeight(4);
  line(x, y1, x, y2);
  var flagX, flagY;

  if (mouseX > x - 22 && mouseX < x + 22) {
    flagX = true;
  }

  if (mouseY > y1  && mouseY < y2) {
    flagY = true;
  }

  if (flagY && flagX && mouseIsPressed) {
    posY[i] = mouseY;
    count = i;
  }

  ellipse(x, posY[i], 40, 40);
  
}

function generate(x){
  	faders = x * 50;
    for (i = 25; i < faders; i += 50) {
    posY[i]=350;
  }
}

function posYMap(i){
  var pos_y = posY[i];
	return map(pos_y, 350, 50, 0, 255);

	}
/*
class slider{
  constructor(x,,,){
    this.x = x;
  }
  slide(){

  }
  
}
*/
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Recursion

function setup() {
  createCanvas(720,640); 
  frameRate(30);
  smooth();
  rectMode(CENTER);
}

function draw() {
  background(0);
  var size = countsize(frameCount, 1800);
  drawCircle(width/2, height/2, size); 
  //noLoop();
}

// Recursive function
function drawCircle(x,y,r) {
  noFill();
  stroke(countsize2(r, 255));
  ellipse(x, y, r, r);
  ellipse(x, y+r/PI, r, r);
  ellipse(x, y-r/PI, r, r);
  ellipse(x+r/PI, y, r, r);
  ellipse(x-r/PI, y, r, r);
  
  var twor = PI*r;
  if(r > 2) {
    drawCircle(x, y, r - 8);
  }
  
}

function countsize(x, y){
	if (x%y < 0.5*y){
    return x%y;
  }
  else {
    return y-(x%y);
  }
}

function countsize2(x, y){
	if (x%y < y/2){
    return x%y;
  }
  else {
    return y-(x%y);
  }
}function setup() {
  createCanvas(400, 400);
  frameRate(18);
  noStroke();
  smooth();
}

function draw() {
  var eX = random(50, 350);
  var eY = random(50, 350);
  var eSize = random(25, 100);
  
  if (frameCount % 2) {
  	background(128);
    fill(0);
    rect(eX-50, eY, eSize, eSize);
  }
  else {
    background(0);
    fill(255);
    ellipse(eX, eY, eSize);
  }
}var posY = 350; // sets default position of the fader

function setup() {
  createCanvas(400, 400);
  frameRate(30);
  colorMode(HSB, 300, 100, 100, 1); // changes color mode to HSB with 300 values
  rectMode(CENTER);
}

function draw() {
  background(posY-50, 100, 100, 1); // color of the background set by posY
  Fader(200, 50, 350);
}

function Fader(x, y1, y2) {
  strokeWeight(4);

  line(x, y1, x, y2);
  var flagX, flagY;
  
  if (mouseY > y1-1 && mouseY < y2+1 ) { // makes sure mouse is above or below fader
    flagY = true;
  }
  
  if (mouseX > x - 40 && mouseX < x + 40) { // makes sure mouse is within fader's width
    flagX = true;
  }

  if ((flagY && flagX) && mouseIsPressed) { // if a click is made within the fader
    posY = mouseY; //set posY to current mouse position
  }
  var inverse = (posY+100)%300; // gets inverse color 
  var rot = map(posY, 50, 350, 0, TWO_PI);
  //spin mode
  translate(200, posY);
  rotate(rot);
  //  
  fill(inverse, 100, 100, 1); //sets fader color to inverse color
  rect(0, 0, 80, 40);
}

  
  var count = 0;
var posY = 350;
var posY1 = 350;

function setup() {
  createCanvas(400, 400);
  frameRate(30);
}

function draw() {
  background(128);
  for (i = 25; i < 100; i += 50) {
    Fader(i, 50, 350);
  }
}

function Fader(x, y1, y2) {
  strokeWeight(4);
  line(x, y1, x, y2);
  var flagX, flagY;

  if (mouseX > x - 20 && mouseX < x + 20) {
    flagX = true;
  }

  if (mouseY > y1 && mouseY < y2) {
    flagY = true;
  }

  if (flagY && flagX && mouseIsPressed) {
    posY = mouseY;
    count = i;
    print(count);
  }



  if (count == i) {
    ellipse(x, posY, 40, 40)
    print(posY1);
  }
  else {
    ellipse(x, posY1, 40, 40)
  }

}var count = -1; //set start count outside of loop range

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  for (var i = 0; i < 21; i++) {
    for (var j = 0; j < 21; j++) {
    var xForThisDot = i * 21; //use the i variable to space dots
    var yForThisDot = j * 21;
    //find distance between mouse and this dot
    var distance = dist(mouseX, mouseY, xForThisDot, yForThisDot);
    
    if (distance < 7.5) { // if the mouse is currently over the dot
      fill(255, 0, 0) // set the color to red
      countx = i; // remember which dot
      county = j;
    }
    else if (distance >= 7.5 && countx == i && county == j){ // if the mouse is not over a dot, remember which dot was last over
      fill(0, 0, 255); // set color to blue
    }
    else { 
      fill(0, 255, 0); // all other dots are green
    }
    ellipse(xForThisDot, yForThisDot, 15, 15); //draw dots

    }
  }
}var posY = 350;
var posY1, bg;

function setup() {
  createCanvas(400, 400);
  frameRate(30);
  colorMode(HSB, 300, 100, 100, 1);
}

function draw() {
  background(posY-50, 100, 100, 1);
  Fader(200, 50, 350);
}

function Fader(x, y1, y2) {
  strokeWeight(4);

  line(x, y1, x, y2);
  var flagX, flagY;
  
  if (mouseY > y1 - 20 && mouseY < y2 ) {
    flagY = true;
    print("Y");
  }
  
  if (mouseX > x - 30 && mouseX < x + 30) {
    flagX = true;
    print("X")
  }

  if ((flagY && flagX) && mouseIsPressed) {
    posY = mouseY;
    print("Boom");
  }
  var inverse = (posY+100)%300;
  print(background);
  print(inverse);
  fill(inverse, 100, 100, 1);
  rect(x - 30, posY, 60, 20);
}
  
  function setup() {
  createCanvas(400, 400);
  frameRate(30);
}

function draw() {
  var bgcolor = map(mouseX,0, 400, 0, 255);
  background(bgcolor);
  strokeWeight(4);
  color(255-bgcolor); //sets fader and line 
  noStroke();
 	rect(0, 347.5, 400, 5);
  if(mouseX > -1 && mouseX < 391) { // if mouse is within canvas
  	rect(mouseX, 330, 10, 40); //set crossfader to mouse x-position
  }
  else if(mouseX < 0) { // if mouse is to the left of canvas 
    rect(0, 330, 10, 40); // set fader to far left
  }
   else if(mouseX > 390) { // if mouse is to the right of the canvas
    rect(390, 330, 10, 40); // set fader to far right
  }
  
  var eX = random(50, 300);
  var eY = random(50, 300);
  var eSize = random(1, 100);
  fill(255-bgcolor);
  ellipse(eX, eY, eSize);
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  strokeWeight(4);
 	line(0, 350, 400, 350);
  if(mouseX > -1 && mouseX < 391) { // if mouse is within canvas
  	rect(mouseX, 330, 10, 40); //set crossfader to mouse x-position
  }
  else if(mouseX < 0) { // if mouse is to the left of canvas 
    rect(0, 330, 10, 40); // set fader to far left
  }
   else if(mouseX > 390) { // if mouse is to the right of the canvas
    rect(390, 330, 10, 40); // set fader to far right
  }
  print(mouseX);
}var speedx, speedx1;
var speedy, speedy1;
var r, g, b;
var dirx, diry;

function setup() {
  createCanvas(600, 400);
  x = width / 2;
  y = height / 2;
  background(0);
  smooth();
  speedx = random(-5, 5);
  speedy = random(-5, 5);
  frameRate(30);
  frames = 240;
  colorMode(HSB);
}

function draw() {
/*
  if (floor((frameCount % frames) / (frames/2)) % 2 == 0) {
    b = floor(((frameCount % frames) / frames) * 255);
  } else {
    b = floor(255 - ((frameCount % frames) / frames) * 255);
  }
  */
	if (floor((frameCount % frames) / (frames/2)) % 2 == 0) {
    h = floor(((frameCount % frames) / frames) * 720);
  } else {
    h = floor(720 - ((frameCount % frames) / frames) * 720);
  }
  print(h);
  stroke(h, 100, 100);
  //fill(r, g, b, a);
  //stroke(0, 0, 0, 0);
  fill(0, 0, 0, 0);


  sizex = map(x, 0, width, -50, 50);
  //sizey = map(y, 0, height, -50, 50);
  rectMode(CENTER);
	rect(x, y, sizex, sizex);
  speedx1 = random(1, 5);
  speedy1 = random(1, 5);

  if (x > width) {
    dirx = -1;
    speedx = dirx * speedx1;
  }

  if (x < 0) {
    dirx = 1;
    speedx = dirx * speedx1;
  }

  if (y > height) {
    diry = -1;
    speedy = diry * speedy1;
  }

  if (y < 0) {
    diry = 1;
    speedy = diry * speedy1;
  }

  x = x + speedx;
  y = y + speedy;
}var img;
function preload() {

  img = loadImage("puggo.JPG");
}


function setup() {
  createCanvas(1080, 1080);
}

function draw() {
   image(img, 0, 0);
}var speedx, speedx1;
var speedy, speedy1;
var r, g, b;
var dirx, diry;

function setup() {
  createCanvas(600, 400);
  x = width / 2;
  y = height / 2;
  background(0);
  smooth();
  speedx = random(-5, 5);
  speedy = random(-5, 5);
  frameRate(120);
  frames = 240;
}

function draw() {
  r = map(x, 0, width, 0, 255);
  g = map(y, 0, height, 0, 255);
  b = map(speedx + speedy, -5, 5, 0, 255);

  if (floor((frameCount % frames) / (frames/2)) % 2 == 0) {
    a = floor(((frameCount % frames) / frames) * 255);
  } else {
    a = floor(255 - ((frameCount % frames) / frames) * 255);
  }

  stroke(r, g, b, a);
  //fill(r, g, b, a);
  //stroke(0, 0, 0, 0);
  fill(0, 0, 0, 0);


  sizex = map(x, 0, width, -50, 50);
  //sizey = map(y, 0, height, -50, 50);
  rectMode(CENTER);
	rect(x, y, sizex, sizex);
  speedx1 = random(1, 5);
  speedy1 = random(1, 5);

  if (x > width) {
    dirx = -1;
    speedx = dirx * speedx1;
  }

  if (x < 0) {
    dirx = 1;
    speedx = dirx * speedx1;
  }

  if (y > height) {
    diry = -1;
    speedy = diry * speedy1;
  }

  if (y < 0) {
    diry = 1;
    speedy = diry * speedy1;
  }

  x = x + speedx;
  y = y + speedy;
}var speedx;
var speedy;
var r, g, b;

function setup() { 
  createCanvas(600, 400);
	x = width/2;
	y = height/2;
  background(0);
  smooth();
  speedx = random(-5, 5);
  speedy = random(-5, 5);
} 

function draw() { 
	
  r = map(x, 0, width, 0, 255);
	g = map(y, 0, height, 0, 255);
	b = map(speedx + speedy, -5, 5, 0, 255);
	a = 88
	sizex = map(x, 0, width, -50, 50);
  sizey =  map(y, 0, height, -50, 50);
	//fill(r, g, b, a);
  fill(0, 0, 0, 0);
	stroke(r, g, b, 188);
	ellipseMode(CENTER);
	ellipse(x, y, sizex, sizey);
	
	if (x > width) {
		speedx = random(-1, -5);
	}
	
	if (x < 1) {
		speedx = random(1, 5);
	}
	
	if (y > height) {
		speedy = random(-1, -5);
	}
	
	if (y < 1) {
		speedy = random(1, 5);
	}
	
	x = x + speedx;
	y = y + speedy;
}var speedx;
var r, g, b;
var startwidth = 300;
var startheight = 200;


function setup() { 
  createCanvas(600, 400);
	x = startwidth;
	y = startheight;
  background(0);
  smooth();
  speedx = random(-5, 5);
} 

function draw() { 
	
  r = map(x, 0, width, 0, 255);
	g = map(y, 0, height, 0, 255);
	b = map(speedx, -5, 5, 0, 255);
	a = 88
	size = map(x, 0, width, 0, 100);
	fill(r, g, b, a);
	stroke(r, g, b, 188);
	ellipseMode(CENTER);
	ellipse(x, y, size);
	
	if (x > width) {
		speedx = random(-1, -5);
	}
	
	if (x < 1) {
		speedx = random(1, 5);
	}
	
	x = x + speedx;
}var speedx;
var speedy;
var r, g, b;

function setup() { 
  createCanvas(600, 400);
	x = width/2;
	y = height/2;
  background(0);
  smooth();
  speedx = random(-5, 5);
  speedy = random(-5, 5);
} 

function draw() { 
	
  r = map(x, 0, width, 0, 255);
	g = map(y, 0, height, 0, 255);
	b = map(speedx + speedy, -5, 5, 0, 255);
	a = 88
	size = map(x, 0, width, -50, 50);
	fill(r, g, b, a);
	stroke(r, g, b, 188);
	ellipseMode(CENTER);
	ellipse(x, y, size);
	
	if (x > width) {
		speedx = random(-1, -5);
	}
	
	if (x < 1) {
		speedx = random(1, 5);
	}
	
	if (y > height) {
		speedy = random(-1, -5);
	}
	
	if (y < 1) {
		speedy = random(1, 5);
	}
	
	x = x + speedx;
	y = y + speedy;
}var speedx;
var speedy;
var r, g, b;

function setup() { 
  createCanvas(600, 400);
	x = width/2;
	y = height/2;
  background(0);
  smooth();
  speedx = random(-5, 5);
  speedy = random(-5, 5);
} 

function draw() { 
	
  r = map(x, 0, width, 0, 255);
	g = map(y, 0, height, 0, 255);
	b = map(speedx + speedy, -5, 5, 0, 255);
	a = 88
	size = map(x, 0, width, 0, 100);
	fill(r, g, b, a);
	stroke(r, g, b, 188);
	ellipseMode(CENTER);
	ellipse(x, y, size);
	
	if (x > width) {
		speedx = random(-1, -5);
	}
	
	if (x < 1) {
		speedx = random(1, 5);
	}
	
	if (y > height) {
		speedy = random(-1, -5);
	}
	
	if (y < 1) {
		speedy = random(1, 5);
	}
	
	x = x + speedx;
	y = y + speedy;
}var x = 15;
var colour = 6;

function setup() { 
  createCanvas(400, 400);
  colorMode(HSB, 12, 100, 100)
  background(220);
} 

function draw() { 
  fill(colour, 100, 100);
  if (mouseIsPressed)
  	ellipse(mouseX, mouseY, x, x)
   print(colour);
}

function keyPressed () {
  if (keyCode == BACKSPACE)
    background(220);
  if (keyCode == UP_ARROW)
    x = x + 5;
  if (keyCode == DOWN_ARROW)
    if (x > 5)
  		x = x - 5;
  if (keyCode == LEFT_ARROW)
    if (colour > -2)
    	colour = colour - 1;
  		if (colour == -1)
        colour = 12;
  if (keyCode == RIGHT_ARROW)
    if (colour < 12)	
    	colour = (colour + 1) % 12;
  return false
  }var dW = 600; //drawing width
var dH = 400; //drawing height

function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(0); //sets background to black
  var size = 50;
  var vert = 1.7;
	translate(0, -vert); //displaces entire drawing up
	drawCube(size); //draws center cube
	translate(2*size, 0); //displaces center cube to the right
  drawCube(size); //draws center right cube
  translate(-size, vert*size); //displaces center right cube left and down
  drawCube(size); //draws lower right cube
  translate(-2*size, 0); //displaces lower right cube to the left 
  drawCube(size); //draws lower left cube
  translate(-size, -vert*size); //displaces lower left cube to the left and up
  drawCube(size); //draws center left cube
  translate(size, -vert*size); //displaces center left cube right and up
  drawCube(size); //draws top left cube
  translate(2*size, 0); //displaces top left cube to the right
  drawCube(size); //draws top right cube
}

function drawCube(x) {
  var cW = dW/2; //x coordinate for center
	var cH = dH/2; //y coordinate for center
	var y = x/2; //half of side length
	fill(255,0,0); //sets fill color to red
	quad (cW, cH, cW+x, cH-y, cW, cH-x, cW-x, cH-y); //draws the top quad
	fill (255,0,255); //sets fill color to magenta
	quad (cW, cH, cW+x, cH-y, cW+x, cH+1.414*y, cW, cH+y+1.414*y); //draws the right quad
  fill(0,0,255); //sets fill color to blue
  quad (cW, cH, cW, cH+y+1.414*y, cW-x, cH+1.414*y, cW-x, cH-y); //draws the left quad
}
  function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(0); //sets background to black
  var size = 50; //sets cube side length 
	drawCube(size); 
}

function drawCube(xx) {
  var dW = 600; //drawing width
	var dH = 400; //drawing height
  var cW = dW/2; //x coordinate for center
	var cH = dH/2; //y coordinate for center
	var yy = xx/2; //half of side length
	fill(255,0,0); //sets fill color to red
	quad (cW, cH, cW + xx, cH - yy, cW, cH - xx, cW - xx, cH - yy); //draws the top quad of a cube
	fill (255,0,255); //sets fill color to magenta
	quad (cW, cH, cW + xx, cH - yy, cW + xx, cH + xx, cW, cH + PI*yy); //draws the right quad of a cube
  fill(0,0,255); //sets the fill color to blue 
  quad (cW, cH, cW, cH + PI*yy, cW - xx, cH + xx, cW - xx, cH - yy); //draws the left quad of a cube
}
  function setup() { 
  createCanvas(600, 400);
	colorMode(HSB, 360, 100, 100);
	frameRate(18);
} 

function draw() { 
  background(0);
  var size = 40;
	var count = frameCount;
  translate(0, -3*size);
	drawCube(size, counter(0), counter(1), counter(2));
	translate(-size, 1.7*size);
  drawCube(size, counter(3), counter(5), counter(4));
	translate(2*size, 0);
  drawCube(size, counter(7), counter(8), counter(6));
	translate(size, 1.7*size);
  drawCube(size, counter(9), counter(10), counter(11));
	translate(-2*size, 0);
  drawCube(size, counter(13), counter(12), counter(14));
	translate(-2*size, 0);
  drawCube(size, counter(16), counter(15), counter(17));
	translate(-size, 1.7*size);
  drawCube(size, counter(18), counter(20), counter(19));
	translate(2*size, 0);
  drawCube(size, counter(22), counter(23), counter(21));
	translate(2*size, 0);
  drawCube(size, counter(25), counter(26), counter(24));
	translate(2*size, 0);
  drawCube(size, counter(28), counter(29), counter(27));
}

function drawCube(xx, s1, s2, s3) {
  var dW = 600;
	var dH = 400;
  var cW = dW/2;
	var cH = dH/2;
	var yy = xx/2;
	fill(s1*12, 100, 100);
	quad (cW, cH, cW + xx, cH - yy, cW, cH - xx, cW - xx, cH - yy);
	fill(s2*12, 100, 100);
	quad (cW, cH, cW + xx, cH - yy, cW + xx, cH + 1.414*yy, cW, cH+yy+1.414*yy);
  fill(s3*12, 100, 100);
  quad (cW, cH, cW, cH+yy+1.414*yy, cW - xx, cH + 1.414*yy, cW - xx, cH - yy);
}

function counter(x) {
	var count = (frameCount + x) % 30;
	return count;
}

  function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(0); //sets background to black
  var size = 50;
	translate(0, -size/2); //displaces entire drawing up a half unit length
	drawCube(size); //draws center cube
	translate(2*size, 0); //displaces center cube 2 units
  drawCube(size); //draws center right cube
  translate(-size, 2*size); //displaces center right cube left by a unit and down by 2 
  drawCube(size); //draws lower right cube
  translate(-2*size, 0); //displaces lower right cube to the left by 2 units
  drawCube(size); //draws lower left cube
  translate(-size, -2*size); //displaces lower left cube to the left by a unit and up by 2
  drawCube(size); //draws center left cube
  translate(size, -2*size); //displaces center left cube right by a unit and up by 2
  drawCube(size); //draws top left cube
  translate(2*size, 0); //displaces top left cube to the right by 2 units
  drawCube(size); //draws top right cube
}

function drawCube(xx) {
  var dW = 600; //drawing width
	var dH = 400; //drawing height
  var cW = dW/2; //x coordinate for center
	var cH = dH/2; //y coordinate for center
	var yy = xx/2; //half of side length
	fill(255,0,0); //sets fill color to red
	quad (cW, cH, cW + xx, cH - yy, cW, cH - xx, cW - xx, cH - yy); //draws the top quad
	fill (255,0,255); //sets fill color to magenta
	quad (cW, cH, cW + xx, cH - yy, cW + xx, cH + xx, cW, cH + PI*yy); //draws the right quad
  fill(0,0,255); //sets fill color to blue
  quad (cW, cH, cW, cH + PI*yy, cW - xx, cH + xx, cW - xx, cH - yy); //draws the left quad
}
  