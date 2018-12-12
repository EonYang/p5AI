// change this to calibrate the camera's range for detecting black blobs.  
// lower numbers exclude more blobs, higher numbers include more.
let rangeVal = 95;

//background image
let img, startImg;
//boolean to turn walker movement on and off
let isMoving = false;
//change the speed to make the game faster - default 5
let speed = 7.5;
//walker variable for movement and size
let walkX, walkY, wlakR, stepX, stepY;
//boolean for turning diceCount text on
let textFlag = false;

//camera variables
let capture;
let tracker;

//turn counter
let playerCount = -1;
let player = [];
let playerColor = [];
let playerPhoto = [];
let turnOver = false;

//dice and weights
let diceCount;
let currentDiceCount;
//change to make dice worth more or less, 1 is max
let weightVal = 0.3;

//toggle value for aligning and showing camera
let showGrid = false;

let rhi, ghi, bhi;
let rlo, glo, blo;

function preload() {
  img = loadImage("assets/players.jpg");
  startImg = loadImage("assets/cover.png");
  imgSheree = loadImage("assets/Sheree.png");
  imgNoble = loadImage("assets/Noble.png");
  imgClarence = loadImage("assets/Clarence.png");
  imgWalker = loadImage("assets/Walker.png");
}

//camera function to set target color
function setTarget(r, g, b, range) {
  range = range || 32;
  rhi = r + range;
  rlo = r - range;
  ghi = g + range;
  glo = g - range;
  bhi = b + range;
  blo = b - range;
}


function setup() {
  //camera calibration stuff
  // lightRangeSlider = createSlider(10, 150, 80);
  // lightRangeSlider.position(width / 5, height / 5);
  // lightRangeSlider.hide();
  // rangeVal = lightRangeSlider.value();

  //camera stuff
  var w = 640,
    h = 480;
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.parent('camera');
  cnv = createCanvas(w, h);
  cnv.parent('container');
  // capture.hide(); // tracking.js can't track the video when it's hidden
  setTarget(0, 0, 0, rangeVal);
  tracking.ColorTracker.registerColor('match', function(r, g, b) {
    if (r <= rhi && r >= rlo &&
      g <= ghi && g >= glo &&
      b <= bhi && b >= blo) {
      return true;
    }
    return false;
  });
  tracker = new tracking.ColorTracker(['match']);
  tracker.minDimension = 0.10; // make this smaller to track smaller objects
  capture.elt.id = 'p5video'; //element
  tracking.track('#p5video', tracker, {
    camera: true
  });

  tracker.on('track', function(event) {

    camCal = event.data;
    diceCount = event.data.length;
    // print(diceCount);
    diceCount = event.data.filter(d => {
      if (d.width < 1 || d.height < 1 || d.width > 10 || d.height > 10) return false
      else return true
    }).length;
    camCal = event.data.filter(c => {
      if (c.width < 1 || c.height < 1 || c.width > 10 || c.height > 10) return false
      else return true
    });

    //to trouble shoot the camera settings

    // strokeWeight(2);
    // stroke(255, 0, 0);
    // noFill();
    // console.log(diceCount);

    // camCal.forEach(function(r) {
    // rect(r.x, r.y, r.width, r.height);
    // console.log('r.width: ', r.width); 
    // console.log('r.height: ', r.height);
    // }); 

  });

  //game stuff
  var gameCanvas = createCanvas(700, 700);
  gameCanvas.parent('game');


  //Walker variables
  walkX = -20;
  walkY = -20;
  walkR = width / 40;

  //player stuff
  player[0] = "Sheree";
  player[1] = "Noble";
  player[2] = "Clarence";
  player[3] = "Walker";
  player[4] = "Sheree";
  playerColor[0] = color(255, 0, 0);
  playerColor[1] = color(0, 255, 0);
  playerColor[2] = color(0, 0, 255);
  playerColor[3] = color(255, 255, 0);
  playerColor[4] = color(255, 0, 0);
  playerPhoto[0] = imgSheree;
  playerPhoto[1] = imgNoble;
  playerPhoto[2] = imgClarence;
  playerPhoto[3] = imgWalker;
  playerPhoto[4] = imgSheree;

  //start screen
  push();
  imageMode(CENTER);
  image(startImg, width / 2, height / 2, 640, 480);
  // textAlign(CENTER);
  // fill(255);
  // strokeWeight(3);
  // stroke(0);
  // textSize(32);
  // text("This is...", width * 0.2, height * 0.45);
  // textSize(50);
  // strokeWeight(3);
  // stroke(0);
  // text("Walker, Texas Gamer!!!", width / 2, height * 0.60);
  // textSize(24);
  // text("Ladies roll first..", width * 0.6, height * 0.73);
  // textSize(16);
  // textAlign(LEFT);
  // text("And if you haven't already done so, press 'a' to calibrate your camera.", width * 0.15, height * 0.83);
  pop();

}

function draw() {
  // if the 'a' key is pressed we enter calibration mode 
  if (showGrid == true) {
    push();
    imageMode(CORNER);
    image(capture, 0, 0);
    pop();
    // lightRangeSlider.show();
    push();
    noStroke();
    stroke(255, 0, 0);
    noFill();
    // camCal = event.data.filter(d => {
    // if (d.width < 1 || d.height < 1 || d.width > 10 || d.height > 10) return false
    // else return true
    // }).length;
    camCal.forEach(function(r) {
      rect(r.x, r.y, r.width, r.height);
      // print(r.width, r.height);
    });
    pop();
    push();
    noStroke();
    fill(255, 0, 0);
    textSize(16);
    text("Place the dice in the center of the board.", cnv.width * 0.05, cnv.height * 0.50);
    text("Make sure the board is clear and well lit with few shadows.", cnv.width * 0.05, cnv.height * 0.53);
    text("You should see one red rectangle for each blob only.", cnv.width * 0.05, cnv.height * 0.56);
    text("If not, you can change the rangeVal at the top of the code.", cnv.width * 0.05, cnv.height * 0.59);
    text("Higher numbers pick up more blobs; lower numbers exclude any errant blobs.", cnv.width * 0.05, cnv.height * 0.62);
    text("Once finished, save the sketch and re-enter calibration to see the results.", cnv.width * 0.05, cnv.height * 0.65);
    pop();
  } else if (showGrid == false) {
    step();
    display();
    checkWinner();
    // capture.hide();
    // print(playerCount);
    // print(textFlag);
    if (isMoving) {
      push();
      textSize(18);
      stroke(255);
      strokeWeight(1);
      fill(255);
      text("You rolled:",
        width * 0.12, height * 0.7);
      textSize(64);
      text(currentDiceCount, width * 0.15, height * 0.78);
      textSize(18);
      // text("...right????", width * 0.20, height * 0.81);
      // text("(if not, press spacebar again and/or move the dice)",
      // width * 0.12, height * 0.86);
      pop();
    }
  }
}

function keyPressed() {

  if (keyCode == 32) {
    if (!isMoving) {
      playerCount++;
      if (playerCount > 3) {
        playerCount = 0;
      }
    }
    isMoving = true;
    fill(0);
    image(img, 0, height / 20, width, height);
    borders();
    walkX = width / 2;
    walkY = height / 2;
    // textFlag = !textFlag;
    currentDiceCount = diceCount;
    // console.log('space is pressed')
    // console.log('Dice Count: ', diceCount)
  }

  if (keyCode === 65) {
    showGrid = !showGrid;
  }
}


//display the walker
function display() {
  strokeWeight(1);
  // stroke(255);
  fill(150, 0, 255);
  ellipse(walkX, walkY, walkR, walkR);
}

//move the walker by these values
function step() {

  let ran = random(1 + (diceCount / 12) * weightVal);
  // let ran = random(1) + (diceCount / 12) * weightVal;   

  //if isMoving is true then move the walker like so
  if (isMoving == true) {
    if (playerCount === 0 || playerCount === 5) {
      if (ran < 0.25) {
        walkY -= speed;
      } else if (ran < 0.5) {
        walkX += speed;
      } else if (ran < 0.75) {
        walkY += speed;
      } else if (ran > 0.75) {
        walkX -= speed;
      }
    } else if (playerCount == 1) {
      if (ran < 0.25) {
        walkX += speed;
      } else if (ran < 0.5) {
        walkY += speed;
      } else if (ran < 0.75) {
        walkX -= speed;
      } else if (ran > 0.75) {
        walkY -= speed;
      }
    } else if (playerCount == 2) {
      if (ran < 0.25) {
        walkY += speed;
      } else if (ran < 0.5) {
        walkX -= speed;
      } else if (ran < 0.75) {
        walkY -= speed;
      } else if (ran > 0.75) {
        walkX += speed;
      }
    } else if (playerCount == 3) {
      if (ran < 0.25) {
        walkX -= speed;
      } else if (ran < 0.5) {
        walkY -= speed;
      } else if (ran < 0.75) {
        walkX += speed;
      } else if (ran > 0.75) {
        walkY += speed;
      }
      // stepX = int(random(3)) - 1;
      // stepY = int(random(3)) - 1;
      // walkX += stepX * speed;
      // walkY += stepY * speed;
    } else if (isMoving == false) {
      // otherwise, stop the walker where it is;
      stepX = 1;
      stepY = 1;
      walkX += 0;
      walkY += 0;
    }
  }
}


function checkWinner() {

  let textX = width * 0.2;
  let offset1 = 125;
  let offset2 = 330;


  //Sheree player 1 red - left
  if (walkX <= width / 10 && walkX > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(255, 0, 0);
    push();
    imageMode(CENTER);
    image(imgSheree, width * 0.5, height * 0.2, imgSheree.width * 0.25, imgSheree.height * 0.25);
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Sheree Wins!!!", width * 0.5, height * 0.4);
    pop();
    showNextPlayer();
  }

  //Noble player 2 green - top
  if (walkY <= height / 10 && walkY > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(0, 255, 0);
    push();
   imageMode(CENTER);
    image(imgNoble, width * 0.5, height * 0.2, imgNoble.width * 0.25, imgNoble.height * 0.25);
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Noble Wins!!!", width * 0.5, height * 0.4);
    pop();
    showNextPlayer();
  }

  //Clarence player 3 blue - right
  if (walkX >= (width - (width / 10)) && walkX > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(0, 0, 255);
    push();
    imageMode(CENTER);
    image(imgClarence, width * 0.5, height * 0.2, imgClarence.width * 0.25, imgClarence.height * 0.25);
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Clarence Wins!!!", width * 0.5, height * 0.4);
    pop();
    showNextPlayer();
  }

  //Walker player 4 yellow - bottom
  if (walkY >= (height - (height / 10)) && walkY > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(255, 255, 0);
    push();
    imageMode(CENTER);
    image(imgWalker, width * 0.5, height * 0.2, imgWalker.width * 0.25, imgWalker.height * 0.25);
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("WALKER Wins!!!", width * 0.5, height * 0.4);
    pop();
    showNextPlayer();
  }

  function showNextPlayer() {
    push();
    imageMode(CENTER);
    image(playerPhoto[playerCount + 1], textX + offset1, height * 0.63,
      playerPhoto[playerCount + 1].width * 0.25, playerPhoto[playerCount + 1].height * 0.25);
    textAlign(CENTER);
    stroke(0);
    strokeWeight(2);
    textSize(32);
    text("And it's  ", textX, 3 * height / 4);
    push();
    fill(playerColor[playerCount + 1]);
    text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
    pop();
    text(" turn to roll now...", textX + offset2, 3 * height / 4);
    text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
    pop();
  }

}

//draw all the borders
function borders() {

  // Sheree , left
  if (playerCount == 0) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(255, 0, 0);
    quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
    pop();
  } else {
    fill(255, 0, 0);
    quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
  }

  // Noble , top
  if (playerCount == 1) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(0, 255, 0);
    quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
    pop();
  } else {
    fill(0, 255, 0);
    quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
  }

  // Clarence , right
  if (playerCount == 2) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(0, 0, 255);
    quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
    pop();
  } else {
    fill(0, 0, 255);
    quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
  }

  // Walker , bottom
  if (playerCount == 3) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(255, 255, 0);
    quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
    pop();
  } else {
    fill(255, 255, 0);
    quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
  }
}

/* 
want to build a timer with visible counter to auto restart after x seconds 
scoreboard
percentages of likelihood walker
alignment and camera procedures
*/

// still needs tweaking, goes x--, y--, y++, but not x++ evenly...
//  cheat = function () {
//  let mouselocX = x >= mouseX;
//  let mouselocY = y >= mouseY;
//  let mouselocXX = x < mouseX;
//  let mouselocYY = y < mouseX;

//  let fifty;
//  fifty = (random(1));
//  let chance = 0.8;
//  if (mouselocX & fifty <= chance ) {
//    x--;
//  } else if (mouselocY & fifty <= chance) {
//    y--;
//  } else if (mouselocYY & fifty <= chance) {
//    y++;
//  } else if (mouselocXX & fifty <= chance) {
//    x++;
//  }
// }

// function for cheating the walker equally
// this.step = function() {
//  let choice = int(random(4));
// if (choice == 0) {
//  this.x+=this.speed;
// } else if (choice == 1) {
//  this.y+=this.speed;
// } else if (choice == 2) {
//   this.y-=this.speed;
// } else {
//   this.x-=this.speed;
// }
// }

/*

let r = random(1);

//to player 1

if (playerCount = 1) {

r * diceCount/12

if (r < 0.25) {
x--;

// to player 2

} else if (r < 0.5) {
y--;

//to player 3

} else if (r < 0.75) {
x++;

//to player 4

}else if (r < 1) {
y++;
}












*/// change this to calibrate the camera's range for detecting black blobs.  
// lower numbers exclude more blobs, higher numbers include more.
let rangeVal = 95;

//background image
let img, startImg;
//boolean to turn walker movement on and off
let isMoving = false;
//change the speed to make the game faster - default 5
let speed = 7.5;
//walker variable for movement and size
let walkX, walkY, wlakR, stepX, stepY;
//boolean for turning diceCount text on
let textFlag = false;

//camera variables
let capture;
let tracker;

//turn counter
let playerCount = -1;
let player = [];
let playerColor = [];
let playerPhoto = [];
let turnOver = false;

//dice and weights
let diceCount;
let currentDiceCount;
//change to make dice worth more or less, 1 is max
let weightVal = 0.3;

//toggle value for aligning and showing camera
let showGrid = false;

let rhi, ghi, bhi;
let rlo, glo, blo;

function preload() {
  img = loadImage("assets/players.jpg");
  startImg = loadImage("assets/cover.png");
  imgSheree = loadImage("assets/Sheree.png");
  imgNoble = loadImage("assets/Noble.png");
  imgClarence = loadImage("assets/Clarence.png");
  imgWalker = loadImage("assets/Walker.png");
}

//camera function to set target color
function setTarget(r, g, b, range) {
  range = range || 32;
  rhi = r + range;
  rlo = r - range;
  ghi = g + range;
  glo = g - range;
  bhi = b + range;
  blo = b - range;
}


function setup() {
  //camera calibration stuff
  // lightRangeSlider = createSlider(10, 150, 80);
  // lightRangeSlider.position(width / 5, height / 5);
  // lightRangeSlider.hide();
  // rangeVal = lightRangeSlider.value();

  //camera stuff
  var w = 640,
    h = 480;
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.parent('camera');
  cnv = createCanvas(w, h);
  cnv.parent('container');
  // capture.hide(); // tracking.js can't track the video when it's hidden
  setTarget(0, 0, 0, rangeVal);
  tracking.ColorTracker.registerColor('match', function(r, g, b) {
    if (r <= rhi && r >= rlo &&
      g <= ghi && g >= glo &&
      b <= bhi && b >= blo) {
      return true;
    }
    return false;
  });
  tracker = new tracking.ColorTracker(['match']);
  tracker.minDimension = 0.10; // make this smaller to track smaller objects
  capture.elt.id = 'p5video'; //element
  tracking.track('#p5video', tracker, {
    camera: true
  });

  tracker.on('track', function(event) {

    camCal = event.data;
    diceCount = event.data.length;
    // print(diceCount);
    diceCount = event.data.filter(d => {
    if (d.width < 1 || d.height < 1 || d.width > 10 || d.height > 10) return false
    else return true
    }).length;
    camCal = event.data.filter(c => {
    if (c.width < 1 || c.height < 1 || c.width > 10 || c.height > 10) return false
    else return true
    });

    //to trouble shoot the camera settings
    
		// strokeWeight(2);
		// stroke(255, 0, 0);
		// noFill();
    // console.log(diceCount);
    
    camCal.forEach(function(r) {
      // rect(r.x, r.y, r.width, r.height);
      console.log('r.width: ', r.width); 
      console.log('r.height: ', r.height);
    }); 
  
  });

  //game stuff
  var gameCanvas = createCanvas(700, 700);
  gameCanvas.parent('game');


  //Walker variables
  walkX = -20;
  walkY = -20;
  walkR = width / 40;

  //player stuff
  player[0] = "Sheree";
  player[1] = "Noble";
  player[2] = "Clarence";
  player[3] = "Walker";
  player[4] = "Sheree";
  playerColor[0] = color(255, 0, 0);
  playerColor[1] = color(0, 255, 0);
  playerColor[2] = color(0, 0, 255);
  playerColor[3] = color(255, 255, 0);
  playerColor[4] = color(255, 0, 0);

  //start screen
  push();
  imageMode(CENTER);
  image(startImg, width / 2, height / 2, 640, 480);
  // textAlign(CENTER);
  // fill(255);
  // strokeWeight(3);
  // stroke(0);
  // textSize(32);
  // text("This is...", width * 0.2, height * 0.45);
  // textSize(50);
  // strokeWeight(3);
  // stroke(0);
  // text("Walker, Texas Gamer!!!", width / 2, height * 0.60);
  // textSize(24);
  // text("Ladies roll first..", width * 0.6, height * 0.73);
  // textSize(16);
  // textAlign(LEFT);
  // text("And if you haven't already done so, press 'a' to calibrate your camera.", width * 0.15, height * 0.83);
	pop();

}

function draw() {
  // if the 'a' key is pressed we enter calibration mode 
  if (showGrid == true) {
    push();
    imageMode(CORNER);
    image(capture, 0, 0);
    pop();
    // lightRangeSlider.show();
		push();
    noStroke();
    stroke(255,0,0);
    noFill();
    // camCal = event.data.filter(d => {
    // if (d.width < 1 || d.height < 1 || d.width > 10 || d.height > 10) return false
    // else return true
    // }).length;
    camCal.forEach(function(r) {
      rect(r.x, r.y, r.width, r.height);
      // print(r.width, r.height);
    });
    pop();
    push();
    noStroke();
    fill(255, 0, 0);
    textSize(16);
    text("Place the dice in the center of the board.", cnv.width * 0.05, cnv.height * 0.50);
    text("Make sure the board is clear and well lit with few shadows.", cnv.width * 0.05, cnv.height * 0.53);
    text("You should see one red rectangle for each blob only.", cnv.width * 0.05, cnv.height * 0.56);
    text("If not, you can change the rangeVal at the top of the code.", cnv.width * 0.05, cnv.height * 0.59);
   	text("Higher numbers pick up more blobs; lower numbers exclude any errant blobs.", cnv.width * 0.05, cnv.height * 0.62);
    text("Once finished, save the sketch and re-enter calibration to see the results.", cnv.width * 0.05, cnv.height * 0.65);
    pop();
  } else if (showGrid == false) {
    step();
    display();
    checkWinner();
    // capture.hide();
    // print(playerCount);
    // print(textFlag);
    if (isMoving) {
      push();
      textSize(18);
      stroke(255);
      strokeWeight(1);
      fill(255);
      text("You rolled:",
        width * 0.12, height * 0.7);
      textSize(64);
      text(currentDiceCount, width * 0.15, height * 0.78);
      textSize(18);
      text("...right????", width * 0.20, height * 0.81);
      text("(if not, press spacebar again and/or move the dice)",
        width * 0.12, height * 0.86);
      pop();
    }
  }
}

function keyPressed() {

  if (keyCode == 32) {
    if (!isMoving) {
      playerCount++;
      if (playerCount > 3) {
        playerCount = 0;
      }
    }
    isMoving = true;
    fill(0);
    image(img, 0, height / 20, width, height);
    borders();
    walkX = width / 2;
    walkY = height / 2;
    // textFlag = !textFlag;
    currentDiceCount = diceCount;
    // console.log('space is pressed')
    // console.log('Dice Count: ', diceCount)
  }

  if (keyCode === 65) {
    showGrid = !showGrid;
  }
}


//display the walker
function display() {
  strokeWeight(1);
  // stroke(255);
  fill(150, 0, 255);
  ellipse(walkX, walkY, walkR, walkR);
}

//move the walker by these values
function step() {

  let ran = random(1 + (diceCount / 12) * weightVal);
  // let ran = random(1) + (diceCount / 12) * weightVal;   

  //if isMoving is true then move the walker like so
  if (isMoving == true) {
    if (playerCount === 0 || playerCount === 5) {
      if (ran < 0.25) {
        walkY -= speed;
      } else if (ran < 0.5) {
        walkX += speed;
      } else if (ran < 0.75) {
        walkY += speed;
      } else if (ran > 0.75) {
        walkX -= speed;
      }
    } else if (playerCount == 1) {
      if (ran < 0.25) {
        walkX += speed;
      } else if (ran < 0.5) {
        walkY += speed;
      } else if (ran < 0.75) {
        walkX -= speed;
      } else if (ran > 0.75) {
        walkY -= speed;
      }
    } else if (playerCount == 2) {
      if (ran < 0.25) {
        walkY += speed;
      } else if (ran < 0.5) {
        walkX -= speed;
      } else if (ran < 0.75) {
        walkY -= speed;
      } else if (ran > 0.75) {
        walkX += speed;
      }
    } else if (playerCount == 3) {
      if (ran < 0.25) {
        walkX -= speed;
      } else if (ran < 0.5) {
        walkY -= speed;
      } else if (ran < 0.75) {
        walkX += speed;
      } else if (ran > 0.75) {
        walkY += speed;
      }
      // stepX = int(random(3)) - 1;
      // stepY = int(random(3)) - 1;
      // walkX += stepX * speed;
      // walkY += stepY * speed;
    } else if (isMoving == false) {
      // otherwise, stop the walker where it is;
      stepX = 1;
      stepY = 1;
      walkX += 0;
      walkY += 0;
    }
  }
}


function checkWinner() {

  let textX = width * 0.2;
  let offset1 = 125;
  let offset2 = 330;


  //Sheree player 1 red - left
  if (walkX <= width / 10 && walkX > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(255, 0, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Sheree Wins!!!", width / 2, height / 2);
    textSize(32);
    text("And it's  ", textX, 3 * height / 4);
    push();
    stroke(0);
    strokeWeight(2);
    fill(playerColor[playerCount + 1])
    text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
    pop();
    text(" turn to roll now...", textX + offset2, 3 * height / 4);
    text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
    pop();
    //p1Score++;
    //updateScoreBoard();
  }

  //Noble player 2 green - top
  if (walkY <= height / 10 && walkY > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(0, 255, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Noble Wins!!!", width / 2, height / 2);
    textSize(32);
    text("And it's  ", textX, 3 * height / 4);
    push();
    stroke(0);
    strokeWeight(2);
    fill(playerColor[playerCount + 1]);
    text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
    pop();
    text("turn to roll now...", textX + offset2, 3 * height / 4);
    text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
    pop();
    //p2Score++;
    //updateScoreBoard();
  }

  //Clarence player 3 blue - right
  if (walkX >= (width - (width / 10)) && walkX > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(0, 0, 255);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Clarence Wins!!!", width / 2, height / 2);
    textSize(32);
    text("And it's  ", textX, 3 * height / 4);
    push();
    stroke(0);
    strokeWeight(2);
    fill(playerColor[playerCount + 1]);
    text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
    pop();
    text(" turn to roll now...", textX + offset2, 3 * height / 4);
    text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
    pop();
    //p3Score++;
    //updateScoreBoard();
  }

  //Walker player 4 yellow - bottom
  if (walkY >= (height - (height / 10)) && walkY > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(255, 255, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("WALKER Wins!!!", width / 2, height / 2);
    textSize(32);
    text("And it's  ", textX, 3 * height / 4);
    push();
    stroke(0);
    strokeWeight(2);
    fill(playerColor[playerCount + 1]);
    text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
    pop();
    text(" turn to roll now...", textX + offset2, 3 * height / 4);
    text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
    pop();
    //p4Score++;
    //updateScoreBoard();
  }


}

//draw all the borders
function borders() {

  // Sheree , left
  if (playerCount == 0) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(255, 0, 0);
    quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
    pop();
  } else {
    fill(255, 0, 0);
    quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
  }

  // Noble , top
  if (playerCount == 1) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(0, 255, 0);
    quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
    pop();
  } else {
    fill(0, 255, 0);
    quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
  }

  // Clarence , right
  if (playerCount == 2) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(0, 0, 255);
    quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
    pop();
  } else {
    fill(0, 0, 255);
    quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
  }

  // Walker , bottom
  if (playerCount == 3) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(255, 255, 0);
    quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
    pop();
  } else {
    fill(255, 255, 0);
    quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
  }
}

/* 
want to build a timer with visible counter to auto restart after x seconds 
scoreboard
percentages of likelihood walker
alignment and camera procedures
*/

// still needs tweaking, goes x--, y--, y++, but not x++ evenly...
//  cheat = function () {
//  let mouselocX = x >= mouseX;
//  let mouselocY = y >= mouseY;
//  let mouselocXX = x < mouseX;
//  let mouselocYY = y < mouseX;

//  let fifty;
//  fifty = (random(1));
//  let chance = 0.8;
//  if (mouselocX & fifty <= chance ) {
//    x--;
//  } else if (mouselocY & fifty <= chance) {
//    y--;
//  } else if (mouselocYY & fifty <= chance) {
//    y++;
//  } else if (mouselocXX & fifty <= chance) {
//    x++;
//  }
// }

// function for cheating the walker equally
// this.step = function() {
//  let choice = int(random(4));
// if (choice == 0) {
//  this.x+=this.speed;
// } else if (choice == 1) {
//  this.y+=this.speed;
// } else if (choice == 2) {
//   this.y-=this.speed;
// } else {
//   this.x-=this.speed;
// }
// }

/*

let r = random(1);

//to player 1

if (playerCount = 1) {

r * diceCount/12

if (r < 0.25) {
x--;

// to player 2

} else if (r < 0.5) {
y--;

//to player 3

} else if (r < 0.75) {
x++;

//to player 4

}else if (r < 1) {
y++;
}












*/// change this to calibrate the camera's range for detecting black blobs.  
// lower numbers exclude more blobs, higher numbers include more.
let rangeVal = 90;

//background image
let img, startImg;
//boolean to turn walker movement on and off
let isMoving = false;
//change the speed to make the game faster - default 5
let speed = 5;
//walker variable for movement and size
let walkX, walkY, wlakR, stepX, stepY;
//boolean for turning diceCount text on
let textFlag = false;

//camera variables
let capture;
let tracker;

//turn counter
let playerCount = -1;
let player = [];
let playerColor = [];
let turnOver = false;

//dice and weights
let diceCount;
let currentDiceCount;
//change to make dice worth more or less, 1 is max
let weightVal = 0.3;

//toggle value for aligning and showing camera
let showGrid = false;

let rhi, ghi, bhi;
let rlo, glo, blo;

function preload() {
  img = loadImage("assets/players.jpg");
  startImg = loadImage("assets/cover.png");
}

//camera function to set target color
function setTarget(r, g, b, range) {
  range = range || 32;
  rhi = r + range;
  rlo = r - range;
  ghi = g + range;
  glo = g - range;
  bhi = b + range;
  blo = b - range;
}


function setup() {
  //camera calibration stuff
  // lightRangeSlider = createSlider(10, 150, 80);
  // lightRangeSlider.position(width / 5, height / 5);
  // lightRangeSlider.hide();
  // rangeVal = lightRangeSlider.value();

  //camera stuff
  var w = 640,
    h = 480;
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.parent('camera');
  cnv = createCanvas(w, h);
  cnv.parent('container');
  // capture.hide(); // tracking.js can't track the video when it's hidden
  setTarget(0, 0, 0, rangeVal);
  tracking.ColorTracker.registerColor('match', function(r, g, b) {
    if (r <= rhi && r >= rlo &&
      g <= ghi && g >= glo &&
      b <= bhi && b >= blo) {
      return true;
    }
    return false;
  });
  tracker = new tracking.ColorTracker(['match']);
  tracker.minDimension = 0.10; // make this smaller to track smaller objects
  capture.elt.id = 'p5video'; //element
  tracking.track('#p5video', tracker, {
    camera: true
  });

  tracker.on('track', function(event) {

    camCal = event.data;
    diceCount = event.data.length;
    // print(diceCount);
    // diceCount = event.data.filter(d => {
    // if (d.width < 1 || d.height < 1) return false
    // else return true
    // }).length;

    //to trouble shoot the camera settings
    /*
		strokeWeight(2);
    stroke(255, 0, 0);
    noFill();
    // console.log(diceCount);
    
    event.data.forEach(function(r) {
      rect(r.x, r.y, r.width, r.height);
      // console.log('r.width: ', r.width); 
      // console.log('r.height: ', r.height);
    // }); 
  */
  });

  //game stuff
  var gameCanvas = createCanvas(700, 700);
  gameCanvas.parent('game');


  //Walker variables
  walkX = -20;
  walkY = -20;
  walkR = width / 40;

  //player stuff
  player[0] = "Sheree";
  player[1] = "Noble";
  player[2] = "Clarence";
  player[3] = "Walker";
  player[4] = "Sheree";
  playerColor[0] = color(255, 0, 0);
  playerColor[1] = color(0, 255, 0);
  playerColor[2] = color(0, 0, 255);
  playerColor[3] = color(255, 255, 0);
  playerColor[4] = color(255, 0, 0);

  //start screen
  push();
  imageMode(CENTER);
  image(startImg, width / 2, height / 2, 640, 480);
  // textAlign(CENTER);
  // fill(255);
  // strokeWeight(3);
  // stroke(0);
  // textSize(32);
  // text("This is...", width * 0.2, height * 0.45);
  // textSize(50);
  // strokeWeight(3);
  // stroke(0);
  // text("Walker, Texas Gamer!!!", width / 2, height * 0.60);
  // textSize(24);
  // text("Ladies roll first..", width * 0.6, height * 0.73);
  // textSize(16);
  // textAlign(LEFT);
  // text("And if you haven't already done so, press 'a' to calibrate your camera.", width * 0.15, height * 0.83);
	pop();

}

function draw() {
  // if the 'a' key is pressed we enter calibration mode 
  if (showGrid == true) {
    push();
    imageMode(CORNER);
    image(capture, 0, 0);
    pop();
    // lightRangeSlider.show();
		push();
    noStroke();
    stroke(255,0,0);
    noFill();
    camCal.forEach(function(r) {
      rect(r.x, r.y, r.width, r.height);
    });
    pop();
    push();
    noStroke();
    fill(255, 0, 0);
    textSize(16);
    text("Place the dice in the center of the board.", cnv.width * 0.05, cnv.height * 0.50);
    text("Make sure the board is clear and well lit with few shadows.", cnv.width * 0.05, cnv.height * 0.53);
    text("You should see one red rectangle for each blob only.", cnv.width * 0.05, cnv.height * 0.56);
    text("If not, you can change the rangeVal at the top of the code.", cnv.width * 0.05, cnv.height * 0.59);
   	text("Higher numbers pick up more blobs; lower numbers exclude any errant blobs.", cnv.width * 0.05, cnv.height * 0.62);
    text("Once finished, save the sketch and re-enter calibration to see the results.", cnv.width * 0.05, cnv.height * 0.65);
    pop();
  } else if (showGrid == false) {
    step();
    display();
    checkWinner();
    // capture.hide();
    // print(playerCount);
    // print(textFlag);
    if (isMoving) {
      push();
      textSize(18);
      stroke(255);
      strokeWeight(1);
      fill(255);
      text("You rolled:",
        width * 0.12, height * 0.7);
      textSize(64);
      text(currentDiceCount, width * 0.15, height * 0.78);
      textSize(18);
      text("...right????", width * 0.20, height * 0.81);
      text("(if not, press spacebar again and/or move the dice)",
        width * 0.12, height * 0.86);
      pop();
    }
  }
}

function keyPressed() {

  if (keyCode == 32) {
    if (!isMoving) {
      playerCount++;
      if (playerCount > 3) {
        playerCount = 0;
      }
    }
    isMoving = true;
    fill(0);
    image(img, 0, height / 20, width, height);
    borders();
    walkX = width / 2;
    walkY = height / 2;
    // textFlag = !textFlag;
    currentDiceCount = diceCount;
    // console.log('space is pressed')
    // console.log('Dice Count: ', diceCount)
  }

  if (keyCode === 65) {
    showGrid = !showGrid;
  }
}


//display the walker
function display() {
  strokeWeight(1);
  // stroke(255);
  fill(150, 0, 255);
  ellipse(walkX, walkY, walkR, walkR);
}

//move the walker by these values
function step() {

  let ran = random(1) + (diceCount / 12) * weightVal;
  // print(ran, player[playerCount]);

  //if isMoving is true then move the walker like so
  if (isMoving == true) {
    if (playerCount === 0 || playerCount === 5) {
      if (ran < 0.25) {
        walkY -= speed;
      } else if (ran < 0.5) {
        walkX += speed;
      } else if (ran < 0.75) {
        walkY += speed;
      } else if (ran > 0.75) {
        walkX -= speed;
      }
    } else if (playerCount == 1) {
      if (ran < 0.25) {
        walkX += speed;
      } else if (ran < 0.5) {
        walkY += speed;
      } else if (ran < 0.75) {
        walkX -= speed;
      } else if (ran > 0.75) {
        walkY -= speed;
      }
    } else if (playerCount == 2) {
      if (ran < 0.25) {
        walkY += speed;
      } else if (ran < 0.5) {
        walkX -= speed;
      } else if (ran < 0.75) {
        walkY -= speed;
      } else if (ran > 0.75) {
        walkX += speed;
      }
    } else if (playerCount == 3) {
      if (ran < 0.25) {
        walkX -= speed;
      } else if (ran < 0.5) {
        walkY -= speed;
      } else if (ran < 0.75) {
        walkX += speed;
      } else if (ran > 0.75) {
        walkY += speed;
      }
      // stepX = int(random(3)) - 1;
      // stepY = int(random(3)) - 1;
      // walkX += stepX * speed;
      // walkY += stepY * speed;
    } else if (isMoving == false) {
      // otherwise, stop the walker where it is;
      stepX = 1;
      stepY = 1;
      walkX += 0;
      walkY += 0;
    }
  }
}


function checkWinner() {

  let textX = width * 0.2;
  let offset1 = 125;
  let offset2 = 330;


  //Sheree player 1 red - left
  if (walkX <= width / 10 && walkX > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(255, 0, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Sheree Wins!!!", width / 2, height / 2);
    textSize(32);
    text("And it's  ", textX, 3 * height / 4);
    push();
    stroke(0);
    strokeWeight(2);
    fill(playerColor[playerCount + 1])
    text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
    pop();
    text(" turn to roll now...", textX + offset2, 3 * height / 4);
    text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
    pop();
    //p1Score++;
    //updateScoreBoard();
  }

  //Noble player 2 green - top
  if (walkY <= height / 10 && walkY > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(0, 255, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Noble Wins!!!", width / 2, height / 2);
    textSize(32);
    text("And it's  ", textX, 3 * height / 4);
    push();
    stroke(0);
    strokeWeight(2);
    fill(playerColor[playerCount + 1]);
    text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
    pop();
    text("turn to roll now...", textX + offset2, 3 * height / 4);
    text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
    pop();
    //p2Score++;
    //updateScoreBoard();
  }

  //Clarence player 3 blue - right
  if (walkX >= (width - (width / 10)) && walkX > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(0, 0, 255);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Clarence Wins!!!", width / 2, height / 2);
    textSize(32);
    text("And it's  ", textX, 3 * height / 4);
    push();
    stroke(0);
    strokeWeight(2);
    fill(playerColor[playerCount + 1]);
    text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
    pop();
    text(" turn to roll now...", textX + offset2, 3 * height / 4);
    text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
    pop();
    //p3Score++;
    //updateScoreBoard();
  }

  //Walker player 4 yellow - bottom
  if (walkY >= (height - (height / 10)) && walkY > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(255, 255, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("WALKER Wins!!!", width / 2, height / 2);
    textSize(32);
    text("And it's  ", textX, 3 * height / 4);
    push();
    stroke(0);
    strokeWeight(2);
    fill(playerColor[playerCount + 1]);
    text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
    pop();
    text(" turn to roll now...", textX + offset2, 3 * height / 4);
    text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
    pop();
    //p4Score++;
    //updateScoreBoard();
  }


}

//draw all the borders
function borders() {

  // Sheree , left
  if (playerCount == 0) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(255, 0, 0);
    quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
    pop();
  } else {
    fill(255, 0, 0);
    quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
  }

  // Noble , top
  if (playerCount == 1) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(0, 255, 0);
    quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
    pop();
  } else {
    fill(0, 255, 0);
    quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
  }

  // Clarence , right
  if (playerCount == 2) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(0, 0, 255);
    quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
    pop();
  } else {
    fill(0, 0, 255);
    quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
  }

  // Walker , bottom
  if (playerCount == 3) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(255, 255, 0);
    quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
    pop();
  } else {
    fill(255, 255, 0);
    quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
  }
}

/* 
want to build a timer with visible counter to auto restart after x seconds 
scoreboard
percentages of likelihood walker
alignment and camera procedures
*/

// still needs tweaking, goes x--, y--, y++, but not x++ evenly...
//  cheat = function () {
//  let mouselocX = x >= mouseX;
//  let mouselocY = y >= mouseY;
//  let mouselocXX = x < mouseX;
//  let mouselocYY = y < mouseX;

//  let fifty;
//  fifty = (random(1));
//  let chance = 0.8;
//  if (mouselocX & fifty <= chance ) {
//    x--;
//  } else if (mouselocY & fifty <= chance) {
//    y--;
//  } else if (mouselocYY & fifty <= chance) {
//    y++;
//  } else if (mouselocXX & fifty <= chance) {
//    x++;
//  }
// }

// function for cheating the walker equally
// this.step = function() {
//  let choice = int(random(4));
// if (choice == 0) {
//  this.x+=this.speed;
// } else if (choice == 1) {
//  this.y+=this.speed;
// } else if (choice == 2) {
//   this.y-=this.speed;
// } else {
//   this.x-=this.speed;
// }
// }

/*

let r = random(1);

//to player 1

if (playerCount = 1) {

r * diceCount/12

if (r < 0.25) {
x--;

// to player 2

} else if (r < 0.5) {
y--;

//to player 3

} else if (r < 0.75) {
x++;

//to player 4

}else if (r < 1) {
y++;
}












*///background image
let img, startImg;
//boolean to turn walker movement on and off
let isMoving = false;
//change the speed to make the game faster - default 5
let speed = 5;
//walker variable for movement and size
let walkX, walkY, wlakR, stepX, stepY;
//boolean for turning diceCount text on
let textFlag = false;
 
//camera variables
let capture;
let tracker;

//turn counter
let playerCount = -1;
let player = [];
let playerColor = [];
let turnOver = false;

//dice and weights
let diceCount;
let currentDiceCount;
//change to make dice worth more or less, 1 is max
let weightVal = 0.3;

//grid for camera or aligning
let showGrid = false;

let rhi, ghi, bhi;
let rlo, glo, blo;

function preload() {
  img = loadImage("assets/players.jpg");
  startImg = loadImage("assets/cover.jpg");
}

//camera function to set target color
function setTarget(r, g, b, range) {
  range = range || 32;
  rhi = r + range;
  rlo = r - range;
  ghi = g + range;
  glo = g - range;
  bhi = b + range;
  blo = b - range;
}


function setup() {
  //camera stuff
  var w = 640, h = 480;
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.parent('camera');
  cnv = createCanvas(w, h);
  cnv.parent('container');
  // capture.hide(); // tracking.js can't track the video when it's hidden

  setTarget(0, 0, 0, 70);
  tracking.ColorTracker.registerColor('match', function(r, g, b) {
    if (r <= rhi && r >= rlo &&
      g <= ghi && g >= glo &&
      b <= bhi && b >= blo) {
      return true;
    }
    return false;
  });
  tracker = new tracking.ColorTracker(['match']);
  tracker.minDimension = 0.10; // make this smaller to track smaller objects
  capture.elt.id = 'p5video'; //element
  tracking.track('#p5video', tracker, {
    camera: true
  });

  tracker.on('track', function(event) {
    
    diceCount = event.data.length;
    // diceCount = event.data.filter(d => {
    // if (d.width < 1 || d.height < 1) return false
    // else return true
    // }).length;
   
    //to trouble shoot the camera settings
	/*	strokeWeight(2);
    stroke(255, 0, 0);
    noFill();
    // console.log(diceCount);
    
    event.data.forEach(function(r) {
      rect(r.x, r.y, r.width, r.height);
      // console.log('r.width: ', r.width); 
      // console.log('r.height: ', r.height);
    }); 
    */
  });

  //game stuff
  var gameCanvas = createCanvas(700, 700);
  gameCanvas.parent('game');


  //Walker variables
  walkX = -20;
  walkY = -20;
  walkR = width / 40;

  //player stuff
  player[0] = "Sheree";
  player[1] = "Noble";
  player[2] = "Clarence";
  player[3] = "Walker";
  player[4] = "Sheree";
  playerColor[0] = color(255, 0, 0);
  playerColor[1] = color(0, 255, 0);
  playerColor[2] = color(0, 0, 255);
  playerColor[3] = color(255, 255, 0);
  playerColor[4] = color(255, 0, 0);

  //start screen
  push();
  imageMode(CENTER);
  image(startImg, width / 2, height / 2, 640, 480);
  textAlign(CENTER);
  fill(255);
  strokeWeight(3);
  stroke(0);
  textSize(32);
  text("This is...", width * 0.2, height * 0.45);
  textSize(50);
  strokeWeight(3);
  stroke(0);
  text("Walker, Texas Gamer!!!", width / 2, height * 0.60);
  textSize(24);
  text("Ladies roll first..", width * 0.6, height * 0.73);
  pop();

}

function draw() {
  step();
  display();
  checkWinner();
  // print(playerCount);
  // print(textFlag);
  if (isMoving) {
    push();
    textSize(18);
    stroke(255);
    strokeWeight(1);
    fill(255);
    text("You rolled:",
      width * 0.12, height * 0.7);
    textSize(64);
    text(currentDiceCount, width * 0.15, height * 0.78);
    textSize(18);
    text("...right????", width * 0.20, height * 0.81);
    text("(if not, press spacebar again and/or move the dice)",
      width * 0.12, height * 0.86);
    pop();
  }
  
  //to see camera
  // image(capture,0,0);
  
  // restartGame();
}

// function mousePressed() {
//   isMoving = !isMoving;
//   print(isMoving + ' :mousePressed');
//   fill(0);
//   image(img, 0, height / 20, width, height);
//   borders();
//   x = width / 2;
//   y = height / 2;
// }


//spacebar functions
function keyPressed() {

  if (keyCode == 32) {
    if (!isMoving) {
      playerCount++;  
      if (playerCount > 3) {
        playerCount = 0;
   		 }
    }
    isMoving = true;
    fill(0);
    image(img, 0, height / 20, width, height);
    borders();
    walkX = width / 2;
    walkY = height / 2;
    // textFlag = !textFlag;
    currentDiceCount = diceCount;
    // console.log('space is pressed')
    // console.log('Dice Count: ', diceCount)
  }
  
  
}


//display the walker
function display() {
  strokeWeight(1);
  // stroke(255);
  fill(150, 0, 255);
  ellipse(walkX, walkY, walkR, walkR);
}

//move the walker by these values
function step() {

  let ran = random(1) + (diceCount/12) * weightVal;
  // print(ran, player[playerCount]);

  //if isMoving is true then move the walker like so
  if (isMoving == true) {
    if (playerCount === 0 || playerCount === 5) {
      if (ran < 0.25) {
        walkY-= speed;
      } else if (ran < 0.5) {
        walkX+= speed;
      } else if (ran < 0.75) {
        walkY+= speed;
      } else if (ran > 0.75) {
        walkX-= speed; 
      }
    } else if (playerCount == 1) {
      if (ran < 0.25) {
        walkX+= speed;
      } else if (ran < 0.5) {
        walkY+= speed;
      } else if (ran < 0.75) {
        walkX-= speed;
      } else if (ran > 0.75) {
        walkY-= speed;
      }
    } else if (playerCount == 2) {
      if (ran < 0.25) {
        walkY+= speed;
      } else if (ran < 0.5) {
        walkX-= speed;
      } else if (ran < 0.75) {
        walkY-= speed;
      } else if (ran > 0.75) {
        walkX+= speed;
      }
    } else if (playerCount == 3) {
      if (ran < 0.25) {
        walkX-= speed;
      } else if (ran < 0.5) {
        walkY-= speed;
      } else if (ran < 0.75) {
        walkX+= speed;
      } else if (ran > 0.75) {
        walkY+= speed;
      }
      // stepX = int(random(3)) - 1;
      // stepY = int(random(3)) - 1;
      // walkX += stepX * speed;
      // walkY += stepY * speed;
    } else if (isMoving == false) {
      // otherwise, stop the walker where it is;
      stepX = 1;
      stepY = 1;
      walkX += 0;
      walkY += 0;
    }
  }
}


function checkWinner() {

  let textX = width * 0.2;
  let offset1 = 125;
  let offset2 = 330;


  //Sheree player 1 red - left
  if (walkX <= width / 10 && walkX > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(255, 0, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Sheree Wins!!!", width / 2, height / 2);
    textSize(32);
    text("And it's  ", textX, 3 * height / 4);
    push();
    stroke(0);
    strokeWeight(2);
    fill(playerColor[playerCount + 1])
    text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
    pop();
    text(" turn to roll now...", textX + offset2, 3 * height / 4);
    text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
    pop();
    //p1Score++;
    //updateScoreBoard();
  }

  //Noble player 2 green - top
  if (walkY <= height / 10 && walkY > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(0, 255, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Noble Wins!!!", width / 2, height / 2);
    textSize(32);
    text("And it's  ", textX, 3 * height / 4);
    push();
    stroke(0);
    strokeWeight(2);
    fill(playerColor[playerCount + 1]);
    text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
    pop();
    text("turn to roll now...", textX + offset2, 3 * height / 4);
    text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
    pop();
    //p2Score++;
    //updateScoreBoard();
  }

  //Clarence player 3 blue - right
  if (walkX >= (width - (width / 10)) && walkX > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(0, 0, 255);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Clarence Wins!!!", width / 2, height / 2);
    textSize(32);
    text("And it's  ", textX, 3 * height / 4);
    push();
    stroke(0);
    strokeWeight(2);
    fill(playerColor[playerCount + 1]);
    text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
    pop();
    text(" turn to roll now...", textX + offset2, 3 * height / 4);
    text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
    pop();
    //p3Score++;
    //updateScoreBoard();
  }

  //Walker player 4 yellow - bottom
  if (walkY >= (height - (height / 10)) && walkY > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(255, 255, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("WALKER Wins!!!", width / 2, height / 2);
    textSize(32);
    text("And it's  ", textX, 3 * height / 4);
    push();
    stroke(0);
    strokeWeight(2);
    fill(playerColor[playerCount + 1]);
    text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
    pop();
    text(" turn to roll now...", textX + offset2, 3 * height / 4);
    text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
    pop();
    //p4Score++;
    //updateScoreBoard();
  }


}

//draw all the borders
function borders() {

  // Sheree , left
  if (playerCount == 0) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(255, 0, 0);
    quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
    pop();
  } else {
    fill(255, 0, 0);
    quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
  }

  // Noble , top
  if (playerCount == 1) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(0, 255, 0);
    quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
    pop();
  } else {
    fill(0, 255, 0);
    quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
  }

  // Clarence , right
  if (playerCount == 2) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(0, 0, 255);
    quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
    pop();
  } else {
    fill(0, 0, 255);
    quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
  }

  // Walker , bottom
  if (playerCount == 3) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(255, 255, 0);
    quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
    pop();
  } else {
    fill(255, 255, 0);
    quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
  }
}

/* 
want to build a timer with visible counter to auto restart after x seconds 
scoreboard
percentages of likelihood walker
alignment and camera procedures
*/

// still needs tweaking, goes x--, y--, y++, but not x++ evenly...
//  cheat = function () {
//  let mouselocX = x >= mouseX;
//  let mouselocY = y >= mouseY;
//  let mouselocXX = x < mouseX;
//  let mouselocYY = y < mouseX;

//  let fifty;
//  fifty = (random(1));
//  let chance = 0.8;
//  if (mouselocX & fifty <= chance ) {
//    x--;
//  } else if (mouselocY & fifty <= chance) {
//    y--;
//  } else if (mouselocYY & fifty <= chance) {
//    y++;
//  } else if (mouselocXX & fifty <= chance) {
//    x++;
//  }
// }

// function for cheating the walker equally
// this.step = function() {
//  let choice = int(random(4));
// if (choice == 0) {
//  this.x+=this.speed;
// } else if (choice == 1) {
//  this.y+=this.speed;
// } else if (choice == 2) {
//   this.y-=this.speed;
// } else {
//   this.x-=this.speed;
// }
// }

/*

let r = random(1);

//to player 1

if (playerCount = 1) {

r * diceCount/12

if (r < 0.25) {
x--;

// to player 2

} else if (r < 0.5) {
y--;

//to player 3

} else if (r < 0.75) {
x++;

//to player 4

}else if (r < 1) {
y++;
}












*///background image
let img, startImg;
//boolean to turn walker movement on and off
let isMoving = false;
//change the speed to make the game faster - default 5
let speed = 5;
//walker variable for movement and size
let walkX, walkY, wlakR, stepX, stepY;
//boolean for turning diceCount text on
let textFlag = false;
 
//camera variables
let capture;
let tracker;

//turn counter
let playerCount = -1;
let player = [];
let playerColor = [];
let turnOver = false;

//dice and weights
let diceCount;
let currentDiceCount;
//change to make dice worth more or less, 1 is max
let weightVal = 0.3;

//grid for camera or aligning
let showGrid = false;

let rhi, ghi, bhi;
let rlo, glo, blo;

function preload() {
  img = loadImage("assets/players.jpg");
  startImg = loadImage("assets/cover.jpg");
}

//camera function to set target color
function setTarget(r, g, b, range) {
  range = range || 32;
  rhi = r + range;
  rlo = r - range;
  ghi = g + range;
  glo = g - range;
  bhi = b + range;
  blo = b - range;
}


function setup() {
  //camera stuff
  var w = 640, h = 480;
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.parent('camera');
  cnv = createCanvas(w, h);
  cnv.parent('container');
  // capture.hide(); // tracking.js can't track the video when it's hidden

  setTarget(0, 0, 0, 70);
  tracking.ColorTracker.registerColor('match', function(r, g, b) {
    if (r <= rhi && r >= rlo &&
      g <= ghi && g >= glo &&
      b <= bhi && b >= blo) {
      return true;
    }
    return false;
  });
  tracker = new tracking.ColorTracker(['match']);
  tracker.minDimension = 0.10; // make this smaller to track smaller objects
  capture.elt.id = 'p5video'; //element
  tracking.track('#p5video', tracker, {
    camera: true
  });

  tracker.on('track', function(event) {
    
    diceCount = event.data.length;
    // diceCount = event.data.filter(d => {
    // if (d.width < 1 || d.height < 1) return false
    // else return true
    // }).length;
   
    //to trouble shoot the camera settings
	/*	strokeWeight(2);
    stroke(255, 0, 0);
    noFill();
    // console.log(diceCount);
    
    event.data.forEach(function(r) {
      rect(r.x, r.y, r.width, r.height);
      // console.log('r.width: ', r.width); 
      // console.log('r.height: ', r.height);
    }); 
    */
  });

  //game stuff
  var gameCanvas = createCanvas(700, 700);
  gameCanvas.parent('game');


  //Walker variables
  walkX = -20;
  walkY = -20;
  walkR = width / 40;

  //player stuff
  player[0] = "Sheree";
  player[1] = "Noble";
  player[2] = "Clarence";
  player[3] = "Walker";
  player[4] = "Sheree";
  playerColor[0] = color(255, 0, 0);
  playerColor[1] = color(0, 255, 0);
  playerColor[2] = color(0, 0, 255);
  playerColor[3] = color(255, 255, 0);
  playerColor[4] = color(255, 0, 0);

  //start screen
  push();
  imageMode(CENTER);
  image(startImg, width / 2, height / 2, 640, 480);
  textAlign(CENTER);
  fill(255);
  strokeWeight(3);
  stroke(0);
  textSize(32);
  text("This is...", width * 0.2, height * 0.45);
  textSize(50);
  strokeWeight(3);
  stroke(0);
  text("Walker, Texas Gamer!!!", width / 2, height * 0.60);
  textSize(24);
  text("Ladies roll first..", width * 0.6, height * 0.73);
  pop();

}

function draw() {
  step();
  display();
  checkWinner();
  // print(playerCount);
  // print(textFlag);
  if (isMoving) {
    push();
    textSize(18);
    stroke(255);
    strokeWeight(1);
    fill(255);
    text("You rolled:",
      width * 0.12, height * 0.7);
    textSize(64);
    text(currentDiceCount, width * 0.15, height * 0.78);
    textSize(18);
    text("...right????", width * 0.20, height * 0.81);
    text("(if not, press spacebar again and/or move the dice)",
      width * 0.12, height * 0.86);
    pop();
  }
  
  //to see camera
  // image(capture,0,0);
  
  // restartGame();
}

// function mousePressed() {
//   isMoving = !isMoving;
//   print(isMoving + ' :mousePressed');
//   fill(0);
//   image(img, 0, height / 20, width, height);
//   borders();
//   x = width / 2;
//   y = height / 2;
// }


//spacebar functions
function keyPressed() {

  if (keyCode == 32) {
    if (!isMoving) {
      playerCount++;  
      if (playerCount > 3) {
        playerCount = 0;
   		 }
    }
    isMoving = true;
    fill(0);
    image(img, 0, height / 20, width, height);
    borders();
    walkX = width / 2;
    walkY = height / 2;
    // textFlag = !textFlag;
    currentDiceCount = diceCount;
    // console.log('space is pressed')
    // console.log('Dice Count: ', diceCount)
  }
}


//display the walker
function display() {
  strokeWeight(1);
  // stroke(255);
  fill(150, 0, 255);
  ellipse(walkX, walkY, walkR, walkR);
}

//move the walker by these values
function step() {

  let ran = random(1) + (diceCount/12) * weightVal;
  // print(ran, player[playerCount]);

  //if isMoving is true then move the walker like so
  if (isMoving == true) {
    if (playerCount === 0 || playerCount === 5) {
      if (ran < 0.25) {
        walkY-= speed;
      } else if (ran < 0.5) {
        walkX+= speed;
      } else if (ran < 0.75) {
        walkY+= speed;
      } else if (ran > 0.75) {
        walkX-= speed; 
      }
    } else if (playerCount == 1) {
      if (ran < 0.25) {
        walkX+= speed;
      } else if (ran < 0.5) {
        walkY+= speed;
      } else if (ran < 0.75) {
        walkX-= speed;
      } else if (ran > 0.75) {
        walkY-= speed;
      }
    } else if (playerCount == 2) {
      if (ran < 0.25) {
        walkY+= speed;
      } else if (ran < 0.5) {
        walkX-= speed;
      } else if (ran < 0.75) {
        walkY-= speed;
      } else if (ran > 0.75) {
        walkX+= speed;
      }
    } else if (playerCount == 3) {
      if (ran < 0.25) {
        walkX-= speed;
      } else if (ran < 0.5) {
        walkY-= speed;
      } else if (ran < 0.75) {
        walkX+= speed;
      } else if (ran > 0.75) {
        walkY+= speed;
      }
      // stepX = int(random(3)) - 1;
      // stepY = int(random(3)) - 1;
      // walkX += stepX * speed;
      // walkY += stepY * speed;
    } else if (isMoving == false) {
      // otherwise, stop the walker where it is;
      stepX = 1;
      stepY = 1;
      walkX += 0;
      walkY += 0;
    }
  }
}


function checkWinner() {

  let textX = width * 0.2;
  let offset1 = 125;
  let offset2 = 330;


  //Sheree player 1 red - left
  if (walkX <= width / 10 && walkX > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(255, 0, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Sheree Wins!!!", width / 2, height / 2);
    textSize(32);
    text("And it's  ", textX, 3 * height / 4);
    push();
    stroke(0);
    strokeWeight(2);
    fill(playerColor[playerCount + 1])
    text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
    pop();
    text(" turn to roll now...", textX + offset2, 3 * height / 4);
    text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
    pop();
    //p1Score++;
    //updateScoreBoard();
  }

  //Noble player 2 green - top
  if (walkY <= height / 10 && walkY > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(0, 255, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Noble Wins!!!", width / 2, height / 2);
    textSize(32);
    text("And it's  ", textX, 3 * height / 4);
    push();
    stroke(0);
    strokeWeight(2);
    fill(playerColor[playerCount + 1]);
    text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
    pop();
    text("turn to roll now...", textX + offset2, 3 * height / 4);
    text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
    pop();
    //p2Score++;
    //updateScoreBoard();
  }

  //Clarence player 3 blue - right
  if (walkX >= (width - (width / 10)) && walkX > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(0, 0, 255);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Clarence Wins!!!", width / 2, height / 2);
    textSize(32);
    text("And it's  ", textX, 3 * height / 4);
    push();
    stroke(0);
    strokeWeight(2);
    fill(playerColor[playerCount + 1]);
    text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
    pop();
    text(" turn to roll now...", textX + offset2, 3 * height / 4);
    text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
    pop();
    //p3Score++;
    //updateScoreBoard();
  }

  //Walker player 4 yellow - bottom
  if (walkY >= (height - (height / 10)) && walkY > 0) {
    turnOver = true;
    isMoving = false;
    textFlag = false;
    background(255, 255, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("WALKER Wins!!!", width / 2, height / 2);
    textSize(32);
    text("And it's  ", textX, 3 * height / 4);
    push();
    stroke(0);
    strokeWeight(2);
    fill(playerColor[playerCount + 1]);
    text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
    pop();
    text(" turn to roll now...", textX + offset2, 3 * height / 4);
    text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
    pop();
    //p4Score++;
    //updateScoreBoard();
  }


}

//draw all the borders
function borders() {

  // Sheree , left
  if (playerCount == 0) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(255, 0, 0);
    quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
    pop();
  } else {
    fill(255, 0, 0);
    quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
  }

  // Noble , top
  if (playerCount == 1) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(0, 255, 0);
    quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
    pop();
  } else {
    fill(0, 255, 0);
    quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
  }

  // Clarence , right
  if (playerCount == 2) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(0, 0, 255);
    quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
    pop();
  } else {
    fill(0, 0, 255);
    quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
  }

  // Walker , bottom
  if (playerCount == 3) {
    push();
    stroke(255);
    strokeWeight(4);
    fill(255, 255, 0);
    quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
    pop();
  } else {
    fill(255, 255, 0);
    quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
  }
}

/* 
want to build a timer with visible counter to auto restart after x seconds 
scoreboard
percentages of likelihood walker
alignment and camera procedures
*/

// still needs tweaking, goes x--, y--, y++, but not x++ evenly...
//  cheat = function () {
//  let mouselocX = x >= mouseX;
//  let mouselocY = y >= mouseY;
//  let mouselocXX = x < mouseX;
//  let mouselocYY = y < mouseX;

//  let fifty;
//  fifty = (random(1));
//  let chance = 0.8;
//  if (mouselocX & fifty <= chance ) {
//    x--;
//  } else if (mouselocY & fifty <= chance) {
//    y--;
//  } else if (mouselocYY & fifty <= chance) {
//    y++;
//  } else if (mouselocXX & fifty <= chance) {
//    x++;
//  }
// }

// function for cheating the walker equally
// this.step = function() {
//  let choice = int(random(4));
// if (choice == 0) {
//  this.x+=this.speed;
// } else if (choice == 1) {
//  this.y+=this.speed;
// } else if (choice == 2) {
//   this.y-=this.speed;
// } else {
//   this.x-=this.speed;
// }
// }

/*

let r = random(1);

//to player 1

if (playerCount = 1) {

r * diceCount/12

if (r < 0.25) {
x--;

// to player 2

} else if (r < 0.5) {
y--;

//to player 3

} else if (r < 0.75) {
x++;

//to player 4

}else if (r < 1) {
y++;
}












*/let vid;

function setup () {
vid = createCapture(VIDEO);
  createCanvas(640,480);
}

function draw () {
image(vid, 0, 0);
}//background image
let img, startImg;
//boolean to turn walker movement on and off
let isMoving = false;
//change the speed to make the game faster - default 10
let speed = 10;
//walker variable for movement and size
let x, y, r, stepX, stepY;
//boolean for turning diceCount text on
let textFlag = false;

//camera variables
let capture;
let tracker;

let diceCount;
let currentDiceCount;
let showGrid = false;

let rhi, ghi, bhi;
let rlo, glo, blo;

function preload() {
  img = loadImage("assets/players.jpg");
  startImg = loadImage("assets/cover.jpg");
}

//camera function to set target color
function setTarget(r, g, b, range) {
  range = range || 32;
  rhi = r + range; rlo = r - range;
  ghi = g + range; glo = g - range;
  bhi = b + range; blo = b - range;
} 


function setup() {
//camera stuff
  var w = 640, h = 480;
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.parent('camera');
  // cnv = createCanvas(w, h);
  // cnv.parent('container');
  // capture.hide(); // tracking.js can't track the video when it's hidden
  
  setTarget(0 , 0, 0, 20);
  tracking.ColorTracker.registerColor('match', function(r, g, b) {
    if(r <= rhi && r >= rlo &&
       g <= ghi && g >= glo &&
       b <= bhi && b >= blo) {
      return true;
    }
    return false;
  });
  tracker = new tracking.ColorTracker(['match']);
  tracker.minDimension = 0.10; // make this smaller to track smaller objects
  capture.elt.id = 'p5video'; //element
  tracking.track('#p5video', tracker, { camera: true });
  
  tracker.on('track', function(event) {
    // clear();
    // strokeWeight(2);
    // stroke(255, 0, 0);
    // noFill();
    console.log(event.data.length);
    // event.data.forEach(function(r) {
    //   rect(r.x, r.y, r.width, r.height);
    //   // console.log('r.width: ', r.width); 
    //   // console.log('r.height: ', r.height);
    // }); 
    diceCount = event.data.filter(d => {
			if (d.width < 1 || d.height < 1) return false
      else return true
    }).length;
    // console.log(myRes);
  });
  
//game stuff
  var gameCanvas = createCanvas(700, 700);
  gameCanvas.parent('container');

  x = -20;
  y = -20;
  r = width / 40;
  push();
  imageMode(CENTER);
  image(startImg, width/2, height/2, 640, 480);
  textAlign(CENTER);
  fill(255);
  strokeWeight(3);
  stroke(0);
  textSize(32);
  text("This is...", width*0.2, height*0.45);
  textSize(50);
  strokeWeight(3);
  stroke(0);
  text("Walker, Texas Gamer!!!", width / 2, height* 0.60);
  textSize(24);
  text("Ladies roll first..", width*0.6, height*0.73);
  pop();

}

function draw() {
  step();
  display();
  checkWinner();
  if (textFlag) {
  text(currentDiceCount,50,50);
  }
  // restartGame();
}

// function mousePressed() {
//   isMoving = !isMoving;
//   print(isMoving + ' :mousePressed');
//   fill(0);
//   image(img, 0, height / 20, width, height);
//   borders();
//   x = width / 2;
//   y = height / 2;
// }

function keyPressed() {

 /* 
 if (keyCode == 32) {
    isMoving = true;
    // print('restart');
    fill(0);
    image(img, 0, height / 20, width, height);
    borders();
    x = width / 2;
    y = height / 2;
  }
  */
  
   if (keyCode == 32) {
    isMoving = true;
    // print('restart');
    fill(0);
    image(img, 0, height / 20, width, height);
    borders();
    x = width / 2;
    y = height / 2;
     textFlag = !textFlag;
		currentDiceCount = diceCount;
   // console.log('space is pressed')
   // console.log('Dice Count: ', diceCount)
  }
}


//display the walker
function display() {
  strokeWeight(1);
  // stroke(255);
  fill(150, 0, 255);
  ellipse(x, y, r, r);
}

//move the walker by these values
function step() {
  //if isMoving is true then move the walker like so
  if (isMoving == true) {
    // print('stepping');
    stepX = int(random(3)) - 1;
    stepY = int(random(3)) - 1;
    x += stepX * speed;
    y += stepY * speed;
  } else if (isMoving == false) {
    // otherwise, stop the walker where it is;
    stepX = 1;
    stepY = 1;
    x += 0;
    y += 0;
  }
}

function restartGame() {

  // walker.x = -1;
  // if (keyIsPressed) {
  //   if (key == 32) {
  // fill(0); 
  // image(charactersBkgd, 0, 0, width, height);
  // borders();
}

function checkWinner() {

  //red - left
  if (x <= width / 10 && x > 0) {
    isMoving = false;
    background(255, 0, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Sheree Wins!!!", width / 2, height / 2);
    textSize(32);
    text("Press Space Bar to play again...", width / 2, 3 * height / 4);
    pop();
    //p1Score++;
    //updateScoreBoard();
  }

  //green - top
  if (y <= height / 10 && x > 0) {
    isMoving = false;
    background(0, 255, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Noble Wins!!!", width / 2, height / 2);
    textSize(32);
    text("Press Space Bar to play again...", width / 2, 3 * height / 4);
    pop();
    //p2Score++;
    //updateScoreBoard();
  }

  //blue - right
  if (x >= (width - (width / 10)) && x > 0) {
    isMoving = false;
    background(0, 0, 255);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Clarence Wins!!!", width / 2, height / 2);
    textSize(32);
    text("Press Space Bar to play again...", width / 2, 3 * height / 4);
    pop();
    //p3Score++;
    //updateScoreBoard();
  }

  //yellow - bottom
  if (y >= (height - (height / 10)) && x > 0) {
    isMoving = false;
    background(255, 255, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("WALKER Wins!!!", width / 2, height / 2);
    textSize(32);
    text("Press Space Bar to play again...", width / 2, 3 * height / 4);
    pop();
    //p4Score++;
    //updateScoreBoard();
  }


}

//draw all the borders
function borders() {

  // function top () {
  fill(0, 255, 0);
  quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);

  // function right () {
  fill(0, 0, 255);
  quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));

  // function left () {
  fill(255, 0, 0);
  quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);

  // function bottom () {
  fill(255, 255, 0);
  quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));

}
/*
function keyPressed() {
  //press return to restart the game
  if (key == 13) {
    print('rturn');
    // fill(0);
    image(img, 0, 0, width, height);
    borders();
    x = width / 2;
    y = height / 2;
  }
}

*/
/* 
want to build a timer with visible counter to auto restart after x seconds 
scoreboard
percentages of likelihood walker
alignment and camera procedures
*/

// still needs tweaking, goes x--, y--, y++, but not x++ evenly...
//  cheat = function () {
//  let mouselocX = x >= mouseX;
//  let mouselocY = y >= mouseY;
//  let mouselocXX = x < mouseX;
//  let mouselocYY = y < mouseX;

//  let fifty;
//  fifty = (random(1));
//  let chance = 0.8;
//  if (mouselocX & fifty <= chance ) {
//    x--;
//  } else if (mouselocY & fifty <= chance) {
//    y--;
//  } else if (mouselocYY & fifty <= chance) {
//    y++;
//  } else if (mouselocXX & fifty <= chance) {
//    x++;
//  }
// }

// function for cheating the walker equally
// this.step = function() {
//  let choice = int(random(4));
// if (choice == 0) {
//  this.x+=this.speed;
// } else if (choice == 1) {
//  this.y+=this.speed;
// } else if (choice == 2) {
//   this.y-=this.speed;
// } else {
//   this.x-=this.speed;
// }
// }var capture;
var tracker;

var diceCount;
var showGrid = false;

var rhi, ghi, bhi;
var rlo, glo, blo;
function setTarget(r, g, b, range) {
  range = range || 32;
  rhi = r + range; rlo = r - range;
  ghi = g + range; glo = g - range;
  bhi = b + range; blo = b - range;
} 

function setup() {
  var w = 640, h = 480;
  capture = createCanvas(VIDEO);
  capture.size(w, h);
  capture.parent('container');
  cnv = createCanvas(w, h);
  cnv.parent('container');
  ellipseMode(CORNER);
  // capture.hide(); // tracking.js can't track the video when it's hidden
  
  setTarget(0 , 0, 0, 50); // by default track white
  tracking.ColorTracker.registerColor('match', function(r, g, b) {
    if(r <= rhi && r >= rlo &&
       g <= ghi && g >= glo &&
       b <= bhi && b >= blo) {
      return true;
    }
    return false;
  });
  tracker = new tracking.ColorTracker(['match']);
  tracker.minDimension = 0.10; // make this smaller to track smaller objects
  capture.elt.id = 'p5video'; //element
  tracking.track('#p5video', tracker, { camera: true });
  
  tracker.on('track', function(event) {
    clear();
    strokeWeight(2);
    stroke(255, 0, 0);
    noFill();
    event.data.forEach(function(r) {
      ellipse(r.x, r.y, r.width, r.height);
      // console.log('r.width: ', r.width); 
      // console.log('r.height: ', r.height);
    }); 
			diceCount = event.data.filter(d => {
			if (d.width < 1 || d.height < 1) return false
			else return true
			}).length;
    // console.log(myRes);
  });
}



//toggle grid for aligning camera by pressing 'g' key
function keyPressed() {
  if (keyCode === 71) {
    showGrid = !showGrid;
  }
  if (key == ' ') {
   text(diceCount,10,10);
   console.log('space is pressed')
   console.log('Dice Count: ', diceCount)
 } 
}

function draw() {
 // print(mouseY);
  //drawing the grid for aligning the camera
  if (showGrid == true) {
    noStroke();
    fill(255,0,0,90);
    rect(width / 2 - 1, 0, 2 , height);
    rect(0, height/2 - 1, width, 2);
  }
  textSize(32);
  text("Dice Count: " + diceCount, 50, 50);
  image(capture, 0, 0);

  }
//   if(mouseIsPressed &&
//     mouseX > 0 && mouseX < width &&
//     mouseY > 0 && mouseY < height) {
//     capture.loadPixels();
//     target = capture.get(mouseX, mouseY);
//     setTarget(target[0], target[1], target[2]);
  // }
  // print(event);                //background image
let img, startImg;
//boolean to turn walker movement on and off
let isMoving = false;
//change the speed to make the game faster - default 10
let speed = 10;
//walker variable for movement and size
let x, y, r, stepX, stepY;

function preload() {
  img = loadImage("assets/players.jpg");
  startImg = loadImage("assets/cover.jpg");
}


function setup() {
  createCanvas(700, 700);
  x = -20;
  y = -20;
  r = width / 40;
  push();
  imageMode(CENTER);
  image(startImg, width/2, height/2, 640, 480);
  textAlign(CENTER);
  fill(255);
  strokeWeight(3);
  stroke(0);
  textSize(32);
  text("This is...", width*0.2, height*0.45);
  textSize(50);
  strokeWeight(3);
  stroke(0);
  text("Walker, Texas Gamer!!!", width / 2, height* 0.60);
  textSize(24);
  text("Ladies roll first..", width*0.6, height*0.73);
  pop();

}

function draw() {
  step();
  display();
  checkWinner();
  // restartGame();
}

// function mousePressed() {
//   isMoving = !isMoving;
//   print(isMoving + ' :mousePressed');
//   fill(0);
//   image(img, 0, height / 20, width, height);
//   borders();
//   x = width / 2;
//   y = height / 2;
// }

function keyPressed() {

  if (keyCode == 32) {
    isMoving = true;
    // print('restart');
    fill(0);
    image(img, 0, height / 20, width, height);
    borders();
    x = width / 2;
    y = height / 2;
  }
}


//display the walker
function display() {
  strokeWeight(1);
  // stroke(255);
  fill(150, 0, 255);
  ellipse(x, y, r, r);
}

//move the walker by these values
function step() {
  //if isMoving is true then move the walker like so
  if (isMoving == true) {
    // print('stepping');
    stepX = int(random(3)) - 1;
    stepY = int(random(3)) - 1;
    x += stepX * speed;
    y += stepY * speed;
  } else if (isMoving == false) {
    // otherwise, stop the walker where it is;
    stepX = 1;
    stepY = 1;
    x += 0;
    y += 0;
  }
}

function restartGame() {

  // walker.x = -1;
  // if (keyIsPressed) {
  //   if (key == 32) {
  // fill(0); 
  // image(charactersBkgd, 0, 0, width, height);
  // borders();
}

function checkWinner() {

  //red - left
  if (x <= width / 10 && x > 0) {
    isMoving = false;
    background(255, 0, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Sheree Wins!!!", width / 2, height / 2);
    textSize(32);
    text("Press Space Bar to play again...", width / 2, 3 * height / 4);
    pop();
    //p1Score++;
    //updateScoreBoard();
  }

  //green - top
  if (y <= height / 10 && x > 0) {
    isMoving = false;
    background(0, 255, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Noble Wins!!!", width / 2, height / 2);
    textSize(32);
    text("Press Space Bar to play again...", width / 2, 3 * height / 4);
    pop();
    //p2Score++;
    //updateScoreBoard();
  }

  //blue - right
  if (x >= (width - (width / 10)) && x > 0) {
    isMoving = false;
    background(0, 0, 255);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Clarence Wins!!!", width / 2, height / 2);
    textSize(32);
    text("Press Space Bar to play again...", width / 2, 3 * height / 4);
    pop();
    //p3Score++;
    //updateScoreBoard();
  }

  //yellow - bottom
  if (y >= (height - (height / 10)) && x > 0) {
    isMoving = false;
    background(255, 255, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("WALKER Wins!!!", width / 2, height / 2);
    textSize(32);
    text("Press Space Bar to play again...", width / 2, 3 * height / 4);
    pop();
    //p4Score++;
    //updateScoreBoard();
  }


}

//draw all the borders
function borders() {

  // function top () {
  fill(0, 255, 0);
  quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);

  // function right () {
  fill(0, 0, 255);
  quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));

  // function left () {
  fill(255, 0, 0);
  quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);

  // function bottom () {
  fill(255, 255, 0);
  quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));

}
/*
function keyPressed() {
  //press return to restart the game
  if (key == 13) {
    print('rturn');
    // fill(0);
    image(img, 0, 0, width, height);
    borders();
    x = width / 2;
    y = height / 2;
  }
}

*/
/* 
want to build a timer with visible counter to auto restart after x seconds 
scoreboard
percentages of likelihood walker
alignment and camera procedures
*/

// still needs tweaking, goes x--, y--, y++, but not x++ evenly...
//  cheat = function () {
//  let mouselocX = x >= mouseX;
//  let mouselocY = y >= mouseY;
//  let mouselocXX = x < mouseX;
//  let mouselocYY = y < mouseX;

//  let fifty;
//  fifty = (random(1));
//  let chance = 0.8;
//  if (mouselocX & fifty <= chance ) {
//    x--;
//  } else if (mouselocY & fifty <= chance) {
//    y--;
//  } else if (mouselocYY & fifty <= chance) {
//    y++;
//  } else if (mouselocXX & fifty <= chance) {
//    x++;
//  }
// }

// function for cheating the walker equally
// this.step = function() {
//  let choice = int(random(4));
// if (choice == 0) {
//  this.x+=this.speed;
// } else if (choice == 1) {
//  this.y+=this.speed;
// } else if (choice == 2) {
//   this.y-=this.speed;
// } else {
//   this.x-=this.speed;
// }
// }//background image
let img, startImg;
//boolean to turn walker movement on and off
let isMoving = false;
//change the speed to make the game faster - default 10
let speed = 10;
//walker variable for movement and size
let x, y, r, stepX, stepY;

function preload() {
  img = loadImage("assets/players.jpg");
  startImg = loadImage("assets/cover.jpg");
}


function setup() {
  createCanvas(700, 700);
  x = -20;
  y = -20;
  r = width / 40;
  push();
  imageMode(CENTER);
  image(startImg, width/2, height/2, 640, 480);
  textAlign(CENTER);
  fill(255);
  strokeWeight(3);
  stroke(0);
  textSize(32);
  text("This is...", width*0.2, height*0.45);
  textSize(50);
  strokeWeight(3);
  stroke(0);
  text("Walker, Texas Gamer!!!", width / 2, height* 0.60);
  textSize(24);
  text("Press Space Bar to begin..", width*0.6, height*0.73);
  pop();

}

function draw() {
  step();
  display();
  checkWinner();
  // restartGame();
}

// function mousePressed() {
//   isMoving = !isMoving;
//   print(isMoving + ' :mousePressed');
//   fill(0);
//   image(img, 0, height / 20, width, height);
//   borders();
//   x = width / 2;
//   y = height / 2;
// }

function keyPressed() {

  if (keyCode == 32) {
    isMoving = true;
    // print('restart');
    fill(0);
    image(img, 0, height / 20, width, height);
    borders();
    x = width / 2;
    y = height / 2;
  }
}


//display the walker
function display() {
  strokeWeight(1);
  // stroke(255);
  fill(150, 0, 255);
  ellipse(x, y, r, r);
}

//move the walker by these values
function step() {
  //if isMoving is true then move the walker like so
  if (isMoving == true) {
    // print('stepping');
    stepX = int(random(3)) - 1;
    stepY = int(random(3)) - 1;
    x += stepX * speed;
    y += stepY * speed;
  } else if (isMoving == false) {
    // otherwise, stop the walker where it is;
    stepX = 1;
    stepY = 1;
    x += 0;
    y += 0;
  }
}

function restartGame() {

  // walker.x = -1;
  // if (keyIsPressed) {
  //   if (key == 32) {
  // fill(0); 
  // image(charactersBkgd, 0, 0, width, height);
  // borders();
}

function checkWinner() {

  //red - left
  if (x <= width / 10 && x > 0) {
    isMoving = false;
    background(255, 0, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Sheree Wins!!!", width / 2, height / 2);
    textSize(32);
    text("Press Space Bar to play again...", width / 2, 3 * height / 4);
    pop();
    //p1Score++;
    //updateScoreBoard();
  }

  //green - top
  if (y <= height / 10 && x > 0) {
    isMoving = false;
    background(0, 255, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Noble Wins!!!", width / 2, height / 2);
    textSize(32);
    text("Press Space Bar to play again...", width / 2, 3 * height / 4);
    pop();
    //p2Score++;
    //updateScoreBoard();
  }

  //blue - right
  if (x >= (width - (width / 10)) && x > 0) {
    isMoving = false;
    background(0, 0, 255);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Clarence Wins!!!", width / 2, height / 2);
    textSize(32);
    text("Press Space Bar to play again...", width / 2, 3 * height / 4);
    pop();
    //p3Score++;
    //updateScoreBoard();
  }

  //yellow - bottom
  if (y >= (height - (height / 10)) && x > 0) {
    isMoving = false;
    background(255, 255, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("WALKER Wins!!!", width / 2, height / 2);
    textSize(32);
    text("Press Space Bar to play again...", width / 2, 3 * height / 4);
    pop();
    //p4Score++;
    //updateScoreBoard();
  }


}

//draw all the borders
function borders() {

  // function top () {
  fill(0, 255, 0);
  quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);

  // function right () {
  fill(0, 0, 255);
  quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));

  // function left () {
  fill(255, 0, 0);
  quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);

  // function bottom () {
  fill(255, 255, 0);
  quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));

}
/*
function keyPressed() {
  //press return to restart the game
  if (key == 13) {
    print('rturn');
    // fill(0);
    image(img, 0, 0, width, height);
    borders();
    x = width / 2;
    y = height / 2;
  }
}

*/
/* 
want to build a timer with visible counter to auto restart after x seconds 
scoreboard
percentages of likelihood walker
alignment and camera procedures
*/

// still needs tweaking, goes x--, y--, y++, but not x++ evenly...
//  cheat = function () {
//  let mouselocX = x >= mouseX;
//  let mouselocY = y >= mouseY;
//  let mouselocXX = x < mouseX;
//  let mouselocYY = y < mouseX;

//  let fifty;
//  fifty = (random(1));
//  let chance = 0.8;
//  if (mouselocX & fifty <= chance ) {
//    x--;
//  } else if (mouselocY & fifty <= chance) {
//    y--;
//  } else if (mouselocYY & fifty <= chance) {
//    y++;
//  } else if (mouselocXX & fifty <= chance) {
//    x++;
//  }
// }

// function for cheating the walker equally
// this.step = function() {
//  let choice = int(random(4));
// if (choice == 0) {
//  this.x+=this.speed;
// } else if (choice == 1) {
//  this.y+=this.speed;
// } else if (choice == 2) {
//   this.y-=this.speed;
// } else {
//   this.x-=this.speed;
// }
// }let walker;
let restartTime = 5;
// let restartGame;
let charactersBkgd;
let moving = false;

// let p1Score = 0;
// let p2Score = 0;
// let p3Score = 0; 
// let p4Score = 0;



// /* WALKER CLASS

function Walker() {
  //change the speed to make the game faster - default 7.5
  this.speed = 30;
  this.x = width / 2;
  this.y = height / 2;
  this.r = width / 40;
  // this.moving = false;

  this.display = function() {
    // if (this.x == -1) {
    //   startScreen();
    // }
    stroke(5);
    fill(150, 0, 255);
    ellipse(this.x, this.y, this.r, this.r);
  }


  this.step = function() {
    this.stepx = int(random(3)) - 1;
    this.stepy = int(random(3)) - 1;
    this.x += this.stepx * this.speed;
    this.y += this.stepy * this.speed;
  }

  // this.step = function() {
  //  let choice = int(random(4));
  // if (choice == 0) {
  //  this.x+=this.speed;
  // } else if (choice == 1) {
  //  this.y+=this.speed;
  // } else if (choice == 2) {
  //   this.y-=this.speed;
  // } else {
  //   this.x-=this.speed;
  // }
  // }

  this.move = function() {

    if (this.x > 0) {
      if (this.x >= width - (width / 10) || this.x <= (width / 10)) {
        moving = !moving;
      }
    }
    if (this.y >= height - (height / 10) || this.y <= (height / 10)) {
      moving = !moving;
    }

    if (!moving) {
      this.display();
      this.step();
      // print('run');
      //this.cheat();
    } else if (moving) {
      checkWinner();
      restartGame();

    }
  }
}


function restartGame() {

  walker.x = -1;
  // if (keyIsPressed) {
  //   if (key == 32) {
  // fill(0); 
  // image(charactersBkgd, 0, 0, width, height);
  // borders();
}

function checkWinner() {

  //red - left
  if (walker.x <= width / 10 && walker.x > 0) {
    background(255, 0, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Sheree Wins!!!", width / 2, height / 2);
    textSize(32);
    text("Press Space Bar to play again...", width / 2, 3 * height / 4);
    pop();
    //p1Score++;
    //updateScoreBoard();
  }

  //green - top
  if (walker.y <= height / 10 && walker.x > 0) {
    background(0, 255, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Noble Wins!!!", width / 2, height / 2);
    textSize(32);
    text("Press Space Bar to play again...", width / 2, 3 * height / 4);
    pop();
    //p2Score++;
    //updateScoreBoard();
  }

  //blue - right
  if (walker.x >= (width - (width / 10)) && walker.x > 0) {
    background(0, 0, 255);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("Clarence Wins!!!", width / 2, height / 2);
    textSize(32);
    text("Press Space Bar to play again...", width / 2, 3 * height / 4);
    pop();
    //p3Score++;
    //updateScoreBoard();
  }

  //yellow - bottom
  if (walker.y >= (height - (height / 10)) && walker.x > 0) {
    background(255, 255, 0);
    push();
    textAlign(CENTER);
    textSize(64);
    fill(150, 0, 255);
    text("WALKER Wins!!!", width / 2, height / 2);
    textSize(32);
    text("Press Space Bar to play again...", width / 2, 3 * height / 4);
    pop();
    //p4Score++;
    //updateScoreBoard();
  }


  // still needs tweaking, goes x--, y--, y++, but not x++ evenly...
  //  cheat = function () {
  //  let mouselocX = x >= mouseX;
  //  let mouselocY = y >= mouseY;
  //  let mouselocXX = x < mouseX;
  //  let mouselocYY = y < mouseX;

  //  let fifty;
  //  fifty = (random(1));
  //  let chance = 0.8;
  //  if (mouselocX & fifty <= chance ) {
  //    x--;
  //  } else if (mouselocY & fifty <= chance) {
  //    y--;
  //  } else if (mouselocYY & fifty <= chance) {
  //    y++;
  //  } else if (mouselocXX & fifty <= chance) {
  //    x++;
  //  }
  // }


}



function setup() {
  createCanvas(700, 700);
  charactersBkgd = loadImage("assets/players.jpg", gotResults);
  walker = new Walker();
  borders();
  // image(charactersBkgd, 0, height / 15, width, height);
  // walker.x = -1;
  //show the score board for the first time
  // initScoreBoard();
  // textAlign(CENTER);


}

function gotResults() {
  print('loaded pic');
}

function draw() {
  // startScreen();
  // walker.display();
  // walker.step();
  walker.move();
  if (walker.x = -1 && keyIsPressed) {
      if (key == 32) {
        walker.x = width / 2;
        walker.y = height / 2;
        moving = !moving;
        print('restart called');
      }
  //   }
  }
  // checkWinner();

  // image(charactersBkgd, 0, height/15, width, height);

// FUNCTIONS

/* 

//start screen

void startScreen () {
  if (w.x == 100000) {
    fill(150, 100, 200);
  textSize(50);
  text("Hi, y'all!", width/3, height/3);
  textSize(40);
  text("Let's git riddy to gayumble!", width/2, 2*height/2);
  text("Just press SPACEBAR to begin the game...", width/2, 3*height/4);
  }
  if (keyPressed) {
    if (key == 32) {
      fill(0);
      image(charactersBkgd, 0, 0, width, height);
      borders();
      w.x = width/2;
      w.y = height/2;
    }
  }
}

*/

// UNUSED
/* 

// draw the player's scores

void initScoreBoard () {
  pushMatrix();
  noStroke();
  fill(255, 98);
  rect(width/10 + 10, height*(0.75), width/6, height*(0.135));
  fill(255);
  textAlign(LEFT);
  textSize(18);
  text("Sheree:", width/10 + 20, height*(0.75) + 20);
  text("Noble:", width/10 + 20, height*(0.75) + 40);
  text("Clarence:", width/10 + 20, height*(0.75) + 60);
  text("Walker:", width/10 + 20, height*(0.75) + 80);
  textAlign(RIGHT);
  text(p1Score, width/10 + width/6, height*(0.75) + 20);
  text(p2Score, width/10 + width/6, height*(0.75) + 40);
  text(p3Score, width/10 + width/6, height*(0.75) + 60);
  text(p4Score, width/10 + width/6, height*(0.75) + 80);
  popMatrix();
  
} 

void updateScoreBoard() {
  pushMatrix();
  fill(255);
  textAlign(LEFT);
  textSize(18);
  text("Sheree:", width/10 + 20, height*(0.75) + 20);
  text("Noble:", width/10 + 20, height*(0.75) + 40);
  text("Clarence:", width/10 + 20, height*(0.75) + 60);
  text("Walker:", width/10 + 20, height*(0.75) + 80);
  textAlign(RIGHT);
  text(p1Score, width/10 + width/6, height*(0.75) + 20);
  text(p2Score, width/10 + width/6, height*(0.75) + 40);
  text(p3Score, width/10 + width/6, height*(0.75) + 60);
  text(p4Score, width/10 + width/6, height*(0.75) + 80);
  popMatrix();
}

*/

//draw all the borders
function borders() {

  // function top () {
  fill(0, 255, 0);
  quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);

  // function right () {
  fill(0, 0, 255);
  quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));

  // function left () {
  fill(255, 0, 0);
  quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);

  // function bottom () {
  fill(255, 255, 0);
  quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));

}

function keyIsPressed() {
  //press return to restart the game
  if (key == 13) {
    print('rturn');
    fill(0);
    image(charactersBkgd, 0, 0, width, height);
    borders();
    walker.x = width / 2;
    walker.y = height / 2;
  }
}


/* 
want to build a timer with visible counter to auto restart after x seconds 
scoreboard
percentages of likelihood walker
alignment and camera procedures
*/var capture;
var tracker;

var diceCount;
var showGrid = false;

var rhi, ghi, bhi;
var rlo, glo, blo;
function setTarget(r, g, b, range) {
  range = range || 32;
  rhi = r + range; rlo = r - range;
  ghi = g + range; glo = g - range;
  bhi = b + range; blo = b - range;
} 

function setup() {
  var w = 640, h = 480;
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.parent('container');
  cnv = createCanvas(w, h);
  cnv.parent('container');
  // capture.hide(); // tracking.js can't track the video when it's hidden
  
  setTarget(0 , 0, 0, 70); // track black
  tracking.ColorTracker.registerColor('match', function(r, g, b) {
    if(r <= rhi && r >= rlo &&
       g <= ghi && g >= glo &&
       b <= bhi && b >= blo) {
      return true;
    }
    return false;
  });
  tracker = new tracking.ColorTracker(['match']);
  tracker.minDimension = 0.10; // make this smaller to track smaller objects
  capture.elt.id = 'p5video'; //element
  tracking.track('#p5video', tracker, { camera: true });
  
  tracker.on('track', function(event) {
    clear();
    strokeWeight(2);
    stroke(255, 0, 0);
    noFill();
    event.data.forEach(function(r) {
      rect(r.x, r.y, r.width, r.height);
      console.log('r.width: ', r.width); 
      console.log('r.height: ', r.height);
    }); 
    diceCount = event.data.filter(d => {
			if (d.width < 1 || d.height < 1 || d.width > 10 || d.height > 10) return false
      else return true
    }).length;
    // console.log(myRes);
  });
}



//toggle grid for aligning camera by pressing 'g' key
function keyPressed() {
  if (keyCode === 71) {
    showGrid = !showGrid;
  }
 //  if (key == ' ') {
 //   text(diceCount,10,10);
 //   console.log('space is pressed')
 //   console.log('Dice Count: ', diceCount)
 // } 
}

function draw() {
 // print(mouseY);
  //drawing the grid for aligning the camera
  if (showGrid == true) {
    noStroke();
    fill(255,0,0,90);
    rect(width / 2 - 1, 0, 2 , height);
    rect(0, height/2 - 1, width, 2);
  }
  textSize(32);
  text("Dice Count: " + diceCount, 50, 50);

  }
//   if(mouseIsPressed &&
//     mouseX > 0 && mouseX < width &&
//     mouseY > 0 && mouseY < height) {
//     capture.loadPixels();
//     target = capture.get(mouseX, mouseY);
//     setTarget(target[0], target[1], target[2]);
  // }
  // print(event);                let move, x;

function setup() {
  createCanvas(710, 400, WEBGL);
  move = createSlider(1, 400, 10);
  move.position(10, 10);
  x = 10;
}

function draw() {
  background(100);

  noStroke();
  fill(50);
  push();
  translate(-275, 175);
  rotateY(1.25);
  rotateX(-0.9);
  box(move.value());
  pop();

  noFill();
  stroke(255);
  push();
  moveIt =move.value();
  translate(200, height * 0.35, x++ );
  sphere(move.value());
  pop();
}let square = {

  constructor(x, y, l, w, opac) {
    this.x: x,
      this.y: y,
      this.l: l,
      this.w: w,
      this.opac: opac
  }
  rect(this.x, this.y, this.l, this.w, this.opac);
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}//had to change manip to start the circles at a larger place 
//because the music comes in slow

//listen to bandpass at 3k and make the dots move independently
//try to LERP the amplitude to move less

//make a reset button
//and a "Make another donut!!  button"
//donut class, object


let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let b;

// magic value that makes the circles the right size
let manip;
//song to play
let timtimsong;
// make a new amplitude module
let amplitude;
let currentAmplitude;
let previousAmplitude;
//get the level of that module
let level;
//map the level of that module
let levelMap = 0;

let bkgdSliderVal = 0.01;

//use buttons to make set favorite spots
// for instance b = 0.19746478873239437;


function preload() {
  //load my background music
  timtimsong = loadSound("timtim.mp3");
  
	// //load eyePic
	// eyePic = loadImage("assets/eye.jpg");

 }



function setup() {
  // play my background music
  timtimsong.loop();
  // get the amplitude of the song
  amplitude = new p5.Amplitude();
  
  // frameRate(10);

  createCanvas(windowWidth, windowHeight);

  imageMode(CENTER);

  //way better than radians!!
  angleMode(DEGREES);

  //tyring HSB out
  colorMode(HSB);

  domObjects();

  // change this number to move the circles farther apart
  manip = 400 / 72;
  //for instance...
  // manip = 2;

  textSize(24);
  textAlign(LEFT);
  smooth();

}

function draw() {
  b = bValSlider.value();
  manip = manipSlider.value();

  // clears the screen if 'c' is pressed
  // keyTyped();

  // slider for FRAMERATE
  let f = frameRateSlider.value();
  frameRate(f);
  // print(f);


  bkgdColor();
  donut(0, 0, 0);
  instructions();
  
}

function donut(strokeH, strokeS, strokeB) {
  
  push();

  //moving the color value
  col += moveC;
  fill(col * 2, 30, 75);

  //if color gets greater than or equal to 100 OR color gets less than 0, 
  //change the value at which we move color to negative.  
  //this allows an oscillation.  You can use print(col); to test your values

  if (col >= 100 || col < 0) {
    moveC = moveC * -1;
  }
  ang += 5;

  //sets up the drawing to oscillate up and down around the center
  // let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 10;
  let transX = windowWidth / 2 + sin(ang * 2);
  let transY = windowHeight / 2 + cos(ang / 3) * 20;
  translate(transX, (transY - 40));


  //increments the rotation so it moves - remember x = x++ down below
  // let rotateMap = map(level, 0, 1, 2, 4);
  // rotate(x / ((b * sqrt(3) / rotateMap)));
  rotate(x / ((b * sqrt(3) / levelMap)));
  // print(x / (b * sqrt(3)) / levelMap);

  // comment this out to stop the rotation
  x += 5;

  //this FOR loop draws set of ellipses in the shape of a circle. 
  //And 360 / 13 determines is how many I will get, 
  //final numbers found by trial and error
  for (i = 0; i < 360; i += 13) {
    //these ellipse values were found by trial and error.  the fact that cos and sin 
    //work opposite in the x / y planes is what makes the circles be drawn 
    //around the center
    // I used mouseX / mouseY to manipulate the shape of the ellipse
    //try different numbers for manip
    // let manip = PI;

    let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
    let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
    let ellipseSize = windowWidth / 20;
    level = amplitude.getLevel();
    // levelMap = (map(level, 0, 1, 2, 20)) * frameCount % 2; - fun one this
    levelMap = map(level, 0, 1, 2, 10)
    let SWSliderVal = map(strokeWeightSlider.value(), 0, 1, 0, 10);
    stroke(strokeH, strokeS, strokeB);
    strokeWeight(SWSliderVal);
    ellipse(ellipseX, ellipseY, ellipseSize * b * levelMap);
    
    // print("slider value ", b);
    // print("amplitude ", levelMap);
  }

  pop();

}

function instructions() {
  fill(255, 127);
  // text("frame rate value", frameRateSlider.width + 20, frameRateSlider.height);
  // text('  start here  > > >  to find a fun sweet spot!', windowWidth / 20, (18 / 20) * windowHeight);
}


function bkgdColor() {
  push();
  colorMode(RGB);
  background(random(50, 75), random(50,100), random(10,50), sqrt(3));
  pop();
}

// cclears the screen if 'c' is pressed
function keyTyped() {
  if (key === 'c') {
    redraw();
  }
}


// function resetSliders() {
//   strokeWeightSliderVal = 0.0;
//   manipSliderVal = manip;
//   frameRateSliderVal = 24;
//   bValSlider = 0.01
// }

function domObjects() {
 //DOM Objects
  // resetButton = createButton('reset');
  // resetButton.position(windowWidth / 20, 12 * windowHeight / 20);
  // resetButton.mousePressed(resetSliders);
  // rotateSlider = createSlider(1, 3, 1, 0.01);
  // rotateSlider.position(windowWidth / 20, 3 * windowHeight / 5);
  bValSlider = createSlider(0.01, 0.2, 0.01, 0.0001);
  bValSlider.position(windowWidth / 20, 16 * windowHeight / 20);
  let manipRep = (400 / 72);
  manipSlider = createSlider(2, 20, 8, 0.001);
  manipSlider.position(windowWidth / 20, 17 * windowHeight / 20);
  manip = manipSlider.value();
  frameRateSlider = createSlider(12, 60, 30, 1);
  frameRateSlider.position(windowWidth / 20, 18 * windowHeight / 20);
  strokeWeightSlider = createSlider(0.01, 0.1, 0.03, 0.01);
  strokeWeightSlider.position(windowWidth/20, 19*windowHeight/20);
  
}


//FUNCTIONS TO MAKE

// a button to toggle ellipseModes
// function ellipseModes () {
// ellipseMode(CORNERS);
// ellipseMode(CENTER);
// }

//have button for freak out mode

// change this number to move the circles farther apart
// for instance...
// manip = 2;

//make slider for FRAMERATE
// frameRate(sin(f)*20);
//Yellow dots across screen

let strokeX;

//Where does the drawing begin?
let startVal = 10;
let movingLoc;
let movingY;
let movingX;
let movingR;
let movingG;
let movingB;

function setup() {
  
  //Set the size of the window
  createCanvas(400, 400);
  background(50);
}



function draw() {
  
  //Define Variables
  strokeX = strokeX + random(-1,1);
  startVal = startVal + 1;
  
  //Moving Locations
  movingLoc = random(500);
  movingY = random(720);
  movingX = movingX+0.25;
  
  //Moving Colors
  movingR = random(200, 250);
  movingG = random(100);
  movingB = random(200, 255);
  
  //What color is the line and how does it change?
  stroke(movingR, movingB, 100);
  
  //How thick is the line?
  strokeWeight(((movingY+360)/10+movingX/50)+5);
  
  //Where are we drawing the line from and to?
  line(movingX, movingY, movingX, movingY);
}


// Clears the screen
function mousePressed() {
  background(50);
}

  //Yellow dots across screen

let strokeX;

//Where does the drawing begin?
let startVal = 10;
let movingLoc;
let movingY;
let movingX;
let movingR;
let movingG;
let movingB;

function setup() {

  //Set the size of the window
  createCanvas(displayWidth, displayHeight);
  background(0,50,10);
}



function draw() {

  //Where does the drawing start and how does it move?
  strokeX = strokeX + random(-1, 1);
  startVal = startVal + 1;

  //Moving Locations
  movingLoc = random(500);
  movingY = random(720);
  //The number after addition effects the speed it draws across
  movingX = random(1080);

  

  //Moving Colors - define ranges
  movingR = random(10);
  movingG = random(25,80);
  movingB = random(200, 255);
  stroke(movingR, movingG, 50);

  //Color ranges - What is the color and how does it change?
  
  //Easter Monday
  //movingR = random(255);
  //movingG = random(122, 250);
  //movingB = random(200, 255)*random(0.2,2);
  //stroke(movingR, movingG, movingB);

  //Jelly Bean Autumn
  //movingR = random(255);
  //movingG = random(122, 200);
  //movingB = random(200);
  //stroke(movingR, movingG, movingB);


  //Ice Candy
  //movingR = random(255);
  //movingG = random(122,250);
  //movingB = random(200,255);
  //stroke(movingR, movingG, movingB);

  //Sunset Shire Fire
  //movingR = random(255);
  //movingG = random(255);
  //movingB = random(1);
  //stroke(movingR, movingG, movingB);

  //Army Greens
  //movingR = random(50);
  //movingG = random(25,100);
  //movingB = random(200, 255);
  //stroke(movingR, movingG, 25);

  //Blue Valentine
  //movingR = random(255);
  //movingG = random(1);
  //movingB = random(255);
  //stroke(movingR, movingG, movingB);
  
  //Skyway Man
  //movingR = random(50,200);
  //movingG = random(50,200);
  //movingB = random(1);
  //stroke(movingR, movingG, 50);

  //Purple Jungle
  //movingR = random(100);
  //movingG = random(200);
  //movingB = random(200, 255);
  //stroke(movingR, movingG, 100);

  //Cyans, Turquoise - pretty Dark - 
  //movingR = random(200);
  //movingG = random(100);
  //movingB = random(200, 255);
  //stroke(movingR, movingG, 100)

  //Yellows
  //movingR = random(200);
  //movingG = random(100);
  //movingB = random(200, 255);
  //stroke(movingR, movingB, 100);

  //Ice Cream Rainbow
  //movingR = random(255);
  //movingG = random(255);
  //movingB = random(255);
  //stroke(movingR, movingG, movingB);

  //Neon Jungle Blue
  //movingR = random(1);
  //movingG = random(255);
  //movingB = random(255);
  //stroke(movingR, movingG, movingB);

  //How thick is the line?
  strokeWeight(((movingY+360)/10+movingX/50)+5);
  
  //Moving Locations - Where are we drawing the line from and to?
  line(movingX, movingY, movingX, movingY);
  
  //If you reorder the previous two lines, the dots are larger (??)
  
  //println("MovingX: " + movingX);
  //println("MovingY: " + movingY);
}


// Clears the screen
function mousePressed() {
  background(0,50,10);
}let numEllipses = 5;

let palette = [];
let x,y;

function setup() {
  createCanvas(400, 400);
  palette = [
    color(240, 240, 203),
    color(123, 196, 118),
    color(61, 113, 83),
    color(40, 68, 61),
    color(26, 52, 64)
  ]
}

function draw() {
  
  for (let i = 1; i <= numEllipses; i++) {
    fill(palette[i-1]);
    rect((width / 6) * i, (0.5 * height), 0.1 * width, );
  }
}Walker w;
let p1Score = 0;
let p2Score = 0;
let p3Score = 0; 
let p4Score = 0;
let restartTime = 5;
PImage charactersBkgd;


function setup () {
  createCanvas (700, 700);
  charactersBkgd = loadImage("players.jpg");
  image(charactersBkgd, 0, height/15, width, height);
  borders();
  w = new Walker();
  //w.x = -1;
  //show the score board for the first time
   //initScoreBoard();
  textAlign(CENTER);
  
  
}

void draw () {
  //startScreen();
  w.move();
  
  }var capture;
var tracker;

var diceCount;
var showGrid = false;
var showCount = false;

var rhi, ghi, bhi;
var rlo, glo, blo;
function setTarget(r, g, b, range) {
  range = range || 32;
  rhi = r + range; rlo = r - range;
  ghi = g + range; glo = g - range;
  bhi = b + range; blo = b - range;
} 

function setup() {
  var w = 640, h = 480;
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.parent('container');
  cnv = createCanvas(w, h);
  cnv.parent('container');
  // capture.hide(); // tracking.js can't track the video when it's hidden
  
  setTarget(0 , 0, 0, 35); // by default track white
  tracking.ColorTracker.registerColor('match', function(r, g, b) {
    if(r <= rhi && r >= rlo &&
       g <= ghi && g >= glo &&
       b <= bhi && b >= blo) {
      return true;
    }
    return false;
  });
  tracker = new tracking.ColorTracker(['match']);
  tracker.minDimension = 0.10; // make this smaller to track smaller objects
  capture.elt.id = 'p5video'; //element
  tracking.track('#p5video', tracker, { camera: true });
  
  tracker.on('track', function(event) {
    clear();
    strokeWeight(2);
    stroke(255, 0, 0);
    noFill();
    event.data.forEach(function(r) {
      rect(r.x, r.y, r.width, r.height);
      // console.log('r.width: ', r.width); 
      // console.log('r.height: ', r.height);
    }); 
    diceCount = event.data.filter(d => {
			if (d.width < 1 || d.height < 1) return false
      else return true
    }).length;
    // console.log(myRes);
  });
}



//toggle grid for aligning camera by pressing 'g' key
function keyPressed() {
  if (keyCode === 71) {
    showGrid = !showGrid;
  }
  if (keyIsPressed == ' ') {
    showCount = !showCount
  } else {showCount = false;}
}

function draw() {
 // print(mouseY);
  //drawing the grid for aligning the camera
  if (showGrid == true) {
    noStroke();
    fill(255,0,0,90);
    rect(width / 2 - 1, 0, 2 , height);
    rect(0, height/2 - 1, width, 2);
  }
  
  if (keyIsDown(32)) {
  textSize(32);
  text("Dice Count: " + diceCount, 50, 50);
  }

  }
let mobeilenet;
let classifier;
let video;
let puffin;
var label = 'test';
let twoButton;
let threeButton;
let fourButton;
let show = false;

function modelReady() {
  console.log('Model is ready!');
  // mobilenet.predict(puffin);
}

function videoReady() {
  print('Video is ready!!');
}

function whileTraining(loss) {
  if (loss == null) {
    print('training complete');
    classifier.classify(gotResults);
  } else {
    print(loss);
  }
}

function gotResults(error, result) {
  if (error) {
    print(error);
  } else {
    // print(results);
    label = result;
    classifier.classify(gotResults);
  }
}

function setup() {
  createCanvas(320, 270);
  video = createCapture(VIDEO);
  video.hide();
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  twoButton = createButton('two');
  twoButton.mousePressed(function() {
    classifier.addImage('two');
  });

  threeButton = createButton('three');
  threeButton.mousePressed(function() {
    classifier.addImage('three');
  });

  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });
  
  saveButton = createButton('save');
  saveButton.mousePressed(function() {
    classifier.save();
  });

}


function draw() {
  background(255);
  image(video, 0, 0, width, height);
  if (show == true) {
    noStroke();
    fill(0);
    rect(width / 2 - 1, 0, 2 , height);
    rect(0, height/2 - 1, width, 2);
  }
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
  if (label == 'two') {
    fill(255, 0, 0);
    text("export dice number works", 10, height / 2);
  }
}

//toggle grid
function keyPressed() {
  if (keyCode === 71) {
    show = !show;
    //print(show);
  }
}let mobeilenet;
let puffin;

function modelReady() {
  console.log('Model is ready!');
  mobilenet.predict(puffin, gotResults);
}

function gotResults(error, results) {
  if (error) {
    print(error);
  } else {
    print(results);
    let label = results[0].className;
    let prob = results[0].probability;
    fill(0);
    textSize(64);
    text(label, 10, height - 100);
    createP(label);
    createP(prob);
  }
}

function imageReady() {
  image(puffin, 0, 0, width, height);
}

function setup() {
  createCanvas(640, 480);
  puffin = createImg('assets/puffin.jpg', imageReady);
  puffin.hide();
  background(0);
  mobilenet = ml5.imageClassifier('MobileNet', modelReady);
}let vid;
// let playing = false;

function setup() {
  createCanvas(320, 240);
	// vid = createVideo('/assets/iwaswrong.mp4');
  vid = createCapture();
  vid.size(400,400);
  // vid.loop();
  // vid.hide();
  noStroke();
}

function draw() { 
  background(0);
  vid.loadPixels();
  for (let y = 0; y < height; y+=8) {
    for (let x = 0; x < width; x+=8) {
			var offset = ((y*width)+x)*4;
      fill(vid.pixels[offset], 
        vid.pixels[offset+ 1],
        vid.pixels[offset+ 2]);
      ellipse(x, y, 8, 8);
    }      
  }
}
// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

let classifier;
let video;

function setup() {
  noCanvas();
  // Create a camera input
  video = createCapture(VIDEO);
  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);  
}

function modelReady() {
  // Change the status of the model once its ready
  select('#status').html('Model Loaded');
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.predict(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by probability.
  select('#result').html(results[0].className);
  select('#probability').html(nf(results[0].probability, 0, 2));
  classifyVideo();
}let bubble = [];
let fillColors;

function setup() {
  createCanvas(400, 400);
  background(220);
  fillColors = [(255, 230, 238), (255, 50, 238, 50), (255, 50, 20, 50)];
}

function draw() {
  for (let i = 0; i < bubble.length; i++) {
  bubble[i].display();
    // bubble[i].move();
  }
  

}

function mousePressed() {
  bubble.push(new Bubble(random(width), 100));
  if (bubble.length > 6) {
    bubble.splice
}

class Bubble {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    // txt = ???

  }

  display() {
    fill(fillColors[int(random(2))]);
    ellipse(this.x + 55, this.y + 100, 150);
    fill(150);
    textSize(12);
    // text(thts[0].archive, x, y, 120, 200);
    textAlign(CENTER, CENTER);

  }

  move() {
    this.y -= thts[0].intensity / 100;
  }

}var poemData;

function preload() {
  poemData = loadTable('assets/museum.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  background(255);
  text(poemData.getString(int(random(poemData.getRowCount())), "intros"), 10, 10);
  text(poemData.getString(int(random(poemData.getRowCount())), "name") + ",", 30, 30);
  text(poemData.getString(int(random(poemData.getRowCount())), "middles"), 50, 50);
  text(poemData.getString(int(random(poemData.getRowCount())), "specials")+ ".", 70, 70);
  text(poemData.getString(int(random(poemData.getRowCount())), "ends"), 90, 90);
  text(poemData.getString(int(random(poemData.getRowCount())), "closing")+ "...", 110, 110);
}

function draw() {


}var classifier;
var canvas;
var img;

function setup() {
  canvas = createCanvas(400, 400);
  canvas.drop(gotFile);
  classifier = ml5.imageClassifier('MobileNet', gotModel);
}

function gotModel() {
  print("got Model!");
}

function gotFile(daFile) {
  // console.log(daFile);
  
  img = createImg(daFile.data, imageReady).hide();
}

function imageReady() {
  classifier.predict(img, gotResult);
  background(0);
  image(img, 0, 0, width, height);
}

function gotResult(error, data) {
  console.log(data);
	textSize(20);
  fill(255,0,0);
  text(data[0].className, 20,20);
}

function draw() {

}var c, w, h, x;

var song, webCam, lastMillis;


function setup() {

  createCanvas(windowWidth, windowHeight);
 
  //webCam setup
  img = createCapture(VIDEO);
  img.size(windowWidth, windowHeight);
  img.position(0, 0);
  loadPixels();
  img.hide();
  imageMode(CORNERS);


}

function draw() {
  image(img,0,0);
  if(lastMillis - millis() > 200) {
  image(img,x++,100);
  }
  // background(0);
  
lastMillis = millis();
  
}var c, w, h, mic, length, plevelMap;

var song, webCam;



function preload () {
song = loadSound('/assets/song.mp3');
}

function setup() {
  // var pixels = loadPixels();
  song.loop();
  createCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;
  c = color(random(255), random(255), random(255));
  //webCam setup
  img = createCapture(VIDEO);
  img.size(windowWidth, windowHeight);
  img.position(windowWidth/4, windowHeight/4);
  loadPixels();
  img.hide();
  //mic stuff
  mic = new p5.AudioIn();
  mic.start();
  amplitude = new p5.Amplitude();
  amplitude.setInput(song);
  length = 3000;
  angleMode(DEGREES);


}

function draw() {
  background(c, 10);
  translate(w / 2, h / 2);
  level = amplitude.getLevel();
  levelMap = map(level, 0, 1, -5, w - w / 10);
  levelLerp = lerp(levelMap,plevelMap, 0.2);
  for (var i = 0; i < levelMap; i++) { 
    rotate(level);
    ellipse(w / 4 * cos(i * 15.1 * level), h / 4 * sin(i * 15), w / 10);
  }
  
  // for (var x = 0; x < w; x++) {
  //   for (var y = 0; y < h; y++) {
  // 		var loc = x+y*w;
  //     float r = red(img.pixels[loc]);
  //     float g = green(img.pixels[loc]);
  //     float b = blue(img.pixels[loc]);
  //     pixels[loc] = color(r,g,b);
  //   }
  // }
  // updatePixels();
  
  plevelMap = levelMap;
}let classifier;
let video;

function setup() {
  noCanvas();
  // Create a camera input
  video = createCapture(VIDEO);
  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);  
}

function modelReady() {
  // Change the status of the model once its ready
  select('#status').html('Model Loaded');
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.predict(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by probability.
  select('#result').html(results[0].className);
  select('#probability').html(nf(results[0].probability, 0, 2));
  classifyVideo();
}
// a color variable
var c, d;

var x;
//for width and height
var w;
var h;

var mic;

//to make a for loop with varialbe 
var length;

// for lerping the length;
var plength;

//to map the level of the mic to a useable level
var levelMap;

//for lerping the level
var plevelMap;



function setup() {
  createCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;

  //mic stuff
  mic = new p5.AudioIn();
  //starts the mic
  mic.start();
  //connects the mic to the computer output
  // mic.connect();
  //starts p5 amplitude...
  amplitude = new p5.Amplitude();
  // so we can take the level of the mic...
  amplitude.setInput(mic);
  //to start out for loop length
  length = 300;
  //hate radians always
  angleMode(DEGREES);

  //starting an oscillator to tie to amplitude level
  osc = new p5.Oscillator();
  osc.setType('sin');
  //this will be set to a variable of level later
  osc.freq(240);
  // sets volume from 0.0 to 1.0
  osc.amp(0.3);
  osc.start();


}

function draw() {

  // takes the length of the for loop and changes it based on 
  // the level of the mic as mapped by levelMap
  //constrained to not go negative
  length = 4 * constrain(levelMap, 30, 300);
  //lerping to smooth things
  lengthLerp = lerp(plength, length, 0.1);
  //moving things around
  translate(w / 2, h/10);

  push();
  colorMode(HSB);
  // background(109, 147, 115, 80);
  background(200, 50, 20, 10);

  // print(c);
  pop();
  // fill(255);
  textSize(18);
  text("make noise & mouseX around", w/10, h/10);

  //gets the level of the mic into a variable
  level = amplitude.getLevel();
  //mapping mic level from amplitude to a usable value
  mouseXMap = map(mouseX, 0, w, 0, 100);
  levelMap = map(level, 0, 1, -1, mouseXMap);

  //lerping above
  levelLerp = lerp(plevelMap, levelMap, 0.5);
  //for mapping mic level to the oscillator freuency
  freqMap = map(level, 0, 1, 100, 500);

  //run a for loop to make the circles 
  // of a length that varies depending on how loud the mic is
  for (var i = 0; i < length; i++) {
    //have the circles be at random-ish colors
    c = color(random(100), 100, random(150));
    // d = color(random(10), 100, random(200));
    fill(c);

    // stroke(d);
    // strokeWeight(levelLerp*10);
    //have the circles make a circular shape and twist up
    //depending on the level of the mic
    // also spread apart depending on the length
    ellipse((w / 2 * sin(i * 10 * levelMap) + (10 / i))*0.5,
      ((h / 10 * sin(i * 11 * levelLerp) + (i * 10)))*0.5, w / 20);
    //control the oscillator frequency 
    //via the mic and i or the length value
    osc.freq(freqMap + mouseXMap);
    //for lerping
    plevelMap = levelMap;
    plength = length;

  }
  // print(levelMap);

}var c, w, h, mic, length, plevelMap;

var song;

function preload () {
song = loadSound('/assets/song.mp3');
}

function setup() {
  song.loop();
  createCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;
  c = color(random(255), random(255), random(255));
  //mic stuff
  mic = new p5.AudioIn();
  mic.start();
  amplitude = new p5.Amplitude();
  amplitude.setInput(song);
  length = 3000;
  angleMode(DEGREES);


}

function draw() {
  translate(w / 2, h / 2);
  
  background(c, 10);
  level = amplitude.getLevel();
  levelMap = map(level, 0, 1, -5, w - w / 10);
  levelLerp = lerp(levelMap,plevelMap, 0.2);
  for (var i = 0; i < levelMap; i++) { 
    rotate(level);
    ellipse(w / 4 * cos(i * 15.1 * level), h / 4 * sin(i * 15), w / 10);
  }
  plevelMap = levelMap;
}var img;
function preload() {
  img = loadImage('assets/schiffman.png');
}
function setup() {
  createCanvas(400,400);
  image(img, 0, 0);
  var c = get(30,350);
  fill(c);
  noStroke();
  rect(25,25,50,50);
}var video;

var targetColor = [255,0,0];

function preload () {

}

function setup() {
  createCanvas(640,480);
  video = createCapture(VIDEO);
	video.size(width,height);
  video.hide();
}

function draw() {
  image(video,0,0);
  var worldRecord = 88888888888;
  var winningX = 0;
  var winningY = 0;
  for (var y = 0; y < video.height; y++) {
  	for (var x = 0; x < video.width; x++) {
   			var thisPixel = video.get(x,y);
      	var diffBetweenColors = dist(thisPixel[0], thisPixel[1], thisPixel[2], 
                                     targetColor[0], targetColor[1], targetColor[2]);
      if (diffBetweenColors < worldRecord) { 
      	winningX = x;
        winningY = y;
        worldRecord = diffBetweenColors;
      }
    }
  }
  ellipse(winningX, winningY, 20, 20);
  
}

function mousePressed() {
targetColor = get(mouseX, mouseY);
}// Blood paint stuff


let bloods = [];
var offset = 2;
var minBloodSize = 1;
var maxBloodSize = 4;
var bloodLength = 60;
var bloodEasing = 0.02; // how fast the bloods run

// var scream;

var WindSpeed_MPH;

function preload () {
scream = loadSound("/assets/scream.mp3");
}


function setup() {
  // amplitude = new p5.Amplitude();
  // delay = new p5.Delay();
  // reverb = new p5.Reverb();
  //  delay.process(scream, .12, .7, 2300);
  // reverb.process(scream, 3, 2);
	var bloodLength = 20;
  createCanvas(400, 400);
	  background(220);
	
}

function draw() {
  if (mouseX > width/2) {
  scream.loop();
  } else {
    scream.stop();
  }
 
  
  
    
	WindSpeed_MPH = abs(dist(mouseX,mouseY,width/2,height/2))/20;

	push();
  // Accelerometer
  translate(height / 2, width / 2);

 createBlood(random(0,width), random(0,height));
    // Keep size of array in check, delete the first 40, every 5 seconds
    if (millis() % 5000 < 100) {
      print(bloods.length);
      bloods.splice(0, 40); //index, amount
    }

    // Draw the blood based on Accelerometer
    // noStroke();
    // ellipse(random(10,100), random(100,10), 10, 10);
    pop();

  // Update blood paint movement
  for (let i = 0; i < bloods.length; i++) {
    bloods[i].move();
    bloods[i].display();
  }
}
	
	
function createBlood(x, y) {
  let b = new blood(x, y);
  bloods.push(b);
}



class blood {
  constructor(xIn, yIn) {
    // make local variables
    this.x = xIn;
    this.y = yIn;
    // length of slide effect
    this.maxLength = random(10, bloodLength);
    this.maxFall = this.maxLength + yIn;
    // speed
    this.speed = random(5, 15);
    // size of this drop
    this.diameter = random(minBloodSize * WindSpeed_MPH, maxBloodSize * WindSpeed_MPH);
  	this.darken = 40;
	}

  move() {
    var rand = random(-0.5, 0.5)

    //only update this.y if it is below the lenght a drop can slide
    if (this.y > this.maxFall) {
      //print("larger");
      this.y = this.y;
    } else {
      this.y += this.speed * bloodEasing;
      this.x += rand;
    }
  }

  display() {
		push();		
		colorMode(HSB);
		this.darken -= 0.08;
		noStroke();
  	//drawing drops color
    fill(360, 100, this.darken, 1);
    ellipse(this.x, this.y + 1, this.diameter, this.diameter);
    //drawing color
    fill(360, 100, this.darken, 1);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
	
}/* ---------------------------------------
 *  GLOBAL VARIABLES
 */

// serial stuff
var serial;
var x;
var z;
var xMap;
var zMap;
var constrainDegree = 40;

// Blood paint stuff
let drops = [];
var offset = 2;
var minDropSize = 5;
var maxDropSize = 15;
var dropLength = 60;
var easing = 0.08; // how fast the drops run

// Wind, button, picked up
var WindSpeed_MPH = 0;
var touching = -1;
var buttonOn = 0;

var img;

/* ---------------------------------------
 *  SETUP
 */
//  function preload() {
//   bkgdImg = new loadImage("http://localhost:7800/bkgd-img.jpg");
// }
function setup() {
	createCanvas(windowWidth, windowHeight);
	imageMode(CORNER);
	img = new loadImage("/assets/bkgd-img.jpg");
  background(img);
	// image(bkgdImg,0,0, 100, 100);
  // Serial
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  // serial.on('connected', serverConnected); // callback for connecting to the server
  // serial.on('open', portOpen); // callback for the port opening
  serial.on('list', printList); // set a callback function for the serialport list event
  // serial.on('error', serialError); // callback for errors
  // serial.on('close', portClose); // callback for the port closing
  // serial.list(); // list the serial ports

  // Blood drops settings
  // createCanvas(400, 400);
  noStroke();
  frameRate(30);
  angleMode(DEGREES);
  ellipseMode(CENTER);
}


/* ---------------------------------------
 *  DRAW
 */

function draw() {
	//clear the screen on button press by redrawing background image
	if (buttonOn[1] > -1) background(img);
	
	//Blow blood spatters
	 if (WindSpeed_MPH[1] > 10) {
      fill(255, 0, 0);
      // noStroke();
		 for (var i = 0; i < 10; i++) {
      ellipse(random(0, windowWidth), random(0 , windowHeight), WindSpeed_MPH[1] * random(0.1, 2));
    }
	 }	 

	
	push();
  // Accelerometer
  translate(height / 2, width / 2);
  translateInput();

  // Update blood paint movement
  for (let i = 0; i < drops.length; i++) {
    drops[i].move();
    drops[i].display();
  }
	

  //touch to turn on DRAWING
  if (touching[1] == 0) {
    // fill(0, 100, 255);
    // textSize(24);
    // stroke(1);
    // text("drawing", width / 2, height / 2);
    
    // Do blood paint
    
    createDrop(xMap, zMap);
    // Keep size of array in check, delete the first 40, every 5 seconds
    if (millis() % 5000 < 100) {
      print(drops.length);
      drops.splice(0, 40); //index, amount
    }

    // Draw the blood based on Accelerometer
    noStroke();
    ellipse(xMap, zMap, 10, 10);
    pop();

  }
  
  

  //guiText();
}

//Reset the sketch functionality
function resetButton () {
background(img);
}


/* ---------------------------------------
 * Drawing Drops functionality
 */

function createDrop(x, y) {
  let d = new drop(x, y);
  drops.push(d);
}

class drop {
  constructor(xIn, yIn) {
    // make local variables
    this.x = xIn;
    this.y = yIn;
    // length of slide effect
    this.maxLength = random(10, dropLength);
    this.maxFall = this.maxLength + yIn;
    // speed
    this.speed = random(5, 15);
    // size of this drop
    this.diameter = random(minDropSize, maxDropSize);
  }

  move() {
    var rand = random(-0.5, 0.5)

    //only update this.y if it is below the lenght a drop can slide
    if (this.y > this.maxFall) {
      //print("larger");
      this.y = this.y;
    } else {
      this.y += this.speed * easing;
      this.x += rand;
    }
  }

  display() {
  	//drawing drops color
    fill(200,255);
    ellipse(this.x, this.y + 1, this.diameter, this.diameter);
    //drawing color
    fill(255, 255);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}


/* ---------------------------------------
 *  Handle serial input
 */

// Translation of input from Accelerometer
function translateInput() {
  // fix X mapping
  if (x > (360 - constrainDegree)) {
    xMap = map((-1 * (360 - x)), 0, constrainDegree, 0, width / 2);
    print(xMap);
  } else {
    xMap = map(x, 0, constrainDegree, 0, width / 2);
  }

  // fix Z mapping
  zMap = map(z, 0, constrainDegree, 0, height / 2);
}
/*
function guiText() {
  //background(0);
  fill(255);
  text("sensor value: " + inData, 30, 30);
}
*/

// port list
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    var p = portList[i];
    if (p.indexOf('Adafruit') > -1) { // returns neg 1 if not there
      print("found Adafruit: " + p);

      // open port
      serial.clear();
      serial.open(p, {
        baudrate: 9600
      });
    }
  }
}

// Standard serial setup

function serialEvent() {

  // For serial.println:
  // read a string from the serial port:
  var inString = serial.readLine();
  // print(inString);
  if (!inString) return;
 		 // check to see that there's actually a string there:
  if (inString.length > 0) {
    // split it
    var parts = inString.split(',');
    // print(parts);

    if (parts.length > 4) { // check that the array has at least three
      WindSpeed_MPH = split(parts[0], ':');
      touching = split(parts[1], ':');
      buttonOn = split(parts[2], ':');
      // convert it to a number:
      x = Number(parts[3]);
      z = Number(parts[4]);
      // debug
      print(WindSpeed_MPH[1], touching[1], buttonOn[1], x, z);
    }
  }
  //handshake
  serial.write('x');
}

// function serverConnected() {
//   print('connected to server.');
// }

// function portOpen() {
//   print('the serial port opened.')
// }

// function serialError(err) {
//   print('Something went wrong with the serial port. ' + err);
// }

// function portClose() {
//   print('The serial port closed.');
// }/* ---------------------------------------
 *  GLOBAL VARIABLES
 */

// serial stuff
var serial;
var x;
var z;
var xMap;
var zMap;
var constrainDegree = 40;

// Blood paint stuff
let drops = [];
var offset = 2;
var minDropSize = 5;
var maxDropSize = 15;
var dropLength = 60;
var easing = 0.08; // how fast the drops run

// Wind, button, picked up
var WindSpeed_MPH = 0;
var touching = -1;
var buttonOn = 0;

var bkgdImg;

/* ---------------------------------------
 *  SETUP
 */
//  function preload() {
//   bkgdImg = new loadImage("http://localhost:7800/bkgd-img.jpg");
// }
function setup() {
	createCanvas(windowWidth, windowHeight);
  	background(0);
	imageMode(CORNER);
	bkgdImg = new loadImage("http://localhost:7800/bkgd-img2.jpg");
	image(bkgdImg,0,0, 100, 100);
  // Serial
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  // serial.on('connected', serverConnected); // callback for connecting to the server
  // serial.on('open', portOpen); // callback for the port opening
  serial.on('list', printList); // set a callback function for the serialport list event
  // serial.on('error', serialError); // callback for errors
  // serial.on('close', portClose); // callback for the port closing
  // serial.list(); // list the serial ports

  // Blood drops settings
  // createCanvas(400, 400);
  noStroke();
  frameRate(30);
  angleMode(DEGREES);
  ellipseMode(CENTER);
}


/* ---------------------------------------
 *  DRAW
 */

function draw() {
	push();
  // Accelerometer
  translate(height / 2, width / 2);
  translateInput();

  // clear screen
  if (buttonOn[1] == 0) {
    fill(0, 255, 0);
    textSize(24);
    text("button to clear", width / 2, 3 * height / 4);
  }

  // Update blood paint movement
  for (let i = 0; i < drops.length; i++) {
    drops[i].move();
    drops[i].display();
  }

  //touch to turn on DRAWING
  if (touching[1] == 0) {
    // fill(0, 100, 255);
    // textSize(24);
    // stroke(1);
    // text("drawing", width / 2, height / 2);
    
    // Do blood paint
    
    createDrop(xMap, zMap);
    // Keep size of array in check, delete the first 40, every 5 seconds
    if (millis() % 5000 < 100) {
      print(drops.length);
      drops.splice(0, 40); //index, amount
    }

    // Draw the blood based on Accelerometer
    noStroke();
    ellipse(xMap, zMap, 10, 10);
    pop();

    //blow blood function
    if (WindSpeed_MPH[1] > 7) {
      fill(255, 0, 0);
      noStroke();
      textSize(24);
      text('blood', width / 4, height / 4);
      fill(255, 0, 0);
      // noStroke();
      ellipse(random(0, windowWidth), random(0 , windowHeight), WindSpeed_MPH[1] * random(0.1, 3));
    }
  }

  //guiText();
}


/* ---------------------------------------
 * Drawing Drops functionality
 */

function createDrop(x, y) {
  let d = new drop(x, y);
  drops.push(d);
}

class drop {
  constructor(xIn, yIn) {
    // make local variables
    this.x = xIn;
    this.y = yIn;
    // length of slide effect
    this.maxLength = random(10, dropLength);
    this.maxFall = this.maxLength + yIn;
    // speed
    this.speed = random(5, 15);
    // size of this drop
    this.diameter = random(minDropSize, maxDropSize);
  }

  move() {
    var rand = random(-0.5, 0.5)

    //only update this.y if it is below the lenght a drop can slide
    if (this.y > this.maxFall) {
      //print("larger");
      this.y = this.y;
    } else {
      this.y += this.speed * easing;
      this.x += rand;
    }
  }

  display() {
  	//drawing drops color
    fill(200,255);
    ellipse(this.x, this.y + 1, this.diameter, this.diameter);
    //drawing color
    fill(255, 255);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}


/* ---------------------------------------
 *  Handle serial input
 */

// Translation of input from Accelerometer
function translateInput() {
  // fix X mapping
  if (x > (360 - constrainDegree)) {
    xMap = map((-1 * (360 - x)), 0, constrainDegree, 0, width / 2);
    print(xMap);
  } else {
    xMap = map(x, 0, constrainDegree, 0, width / 2);
  }

  // fix Z mapping
  zMap = map(z, 0, constrainDegree, 0, height / 2);
}

function guiText() {
  background(0);
  fill(255);
  text("sensor value: " + inData, 30, 30);
}


// port list
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    var p = portList[i];
    if (p.indexOf('usbmodem') > -1) { // returns neg 1 if not there
      print("found usbmodem: " + p);

      // open port
      serial.clear();
      serial.open(p, {
        baudrate: 9600
      });
    }
  }
}

// Standard serial setup

function serialEvent() {

  // For serial.println:
  // read a string from the serial port:
  var inString = serial.readLine();
  // print(inString);
  if (!inString) return;
 		 // check to see that there's actually a string there:
  if (inString.length > 0) {
    // split it
    var parts = inString.split(',');
    // print(parts);

    if (parts.length > 4) { // check that the array has at least three
      WindSpeed_MPH = split(parts[0], ':');
      touching = split(parts[1], ':');
      buttonOn = split(parts[2], ':');
      // convert it to a number:
      x = Number(parts[3]);
      z = Number(parts[4]);
      // debug
      print(WindSpeed_MPH[1], touching[1], buttonOn[1], x, z);
    }
  }
  //handshake
  serial.write('x');
}

// function serverConnected() {
//   print('connected to server.');
// }

// function portOpen() {
//   print('the serial port opened.')
// }

// function serialError(err) {
//   print('Something went wrong with the serial port. ' + err);
// }

// function portClose() {
//   print('The serial port closed.');
// }var serial;

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort();
  serial.on('data', serialEvent);
  serial.on('list', printList);
  serial.clear();
  // serial.on('error', serialError);
  // serial.open(portName); 
  // serial.on('close', portClose); 
}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    var p = portList[i];
    // print(p);
    if (p.indexOf('Adafruit') > -1) {
      print(p + "looks like the Arduino serial port");
      serial.clear();
      serial.open(p, {
        baudrate: 9600
      });
    }
  }



}

function serialEvent() {
  //handshake return
  serial.write('x');
  //buffering
  var input = serial.readStringUntil('\n');
  if (!input) return;
  // print(input);
  var sensors = split(input, ',');
  // print(sensors);
   if (sensors.length > 2) {       // check that the array has at least three elements
    WindSpeed_MPH = split(sensors[0], ':');  // copy the first element into xPosition
    touching = split(sensors[1], ':');  // copy the second element  into yPosition
    buttonOn = split(sensors[2], ':');  // copy the third element into zPosition
  print(WindSpeed_MPH[1],touching[1],buttonOn[1]);
   }
  
  
  //  var input = serial.readLine();
  // if (input.length > 0) {
  //   print(input);
  //   windMPH = input;
  // }
}

function draw() {
  background(0, 10);
  
  // if (buttonOn[1] == 0) {
  //   fill(0,255,0);
  //   textSize(24);
  //   text("button to clear", width / 2, 3 * height / 4);
  // }
  //touch to turn on DRAWING
  // if (touching[1] == 0) {
    fill(0,100,255);
    textSize(24);
    stroke(1);
    text("drawing", width / 2, height / 2);
    //blow blood function
    // if (WindSpeed_MPH[1] > 3) {
      fill(255,0,0);
      noStroke();
      textSize(24);
      text('blood', width/4, height/4);
    	fill(255, 0, 0);
      noStroke();
    	ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
    	ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
    	ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
    	ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
    // }
  }
  
// }/* ---------------------------------------
 *  GLOBAL VARIABLES
 */

// serial stuff
var serial;
var x;
var z;
var xMap;
var zMap;
var constrainDegree = 40;

// Blood paint stuff
let drops = [];
var offset = 2;
var minDropSize = 5;
var maxDropSize = 15;
var dropLength = 60;
var easing = 0.08; // how fast the drops run

// Wind, button, picked up
var WindSpeed_MPH = 0;
var touching = -1;
var buttonOn = 0;

/* ---------------------------------------
 *  SETUP
 */

function setup() {
  // Serial
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  // serial.on('connected', serverConnected); // callback for connecting to the server
  // serial.on('open', portOpen); // callback for the port opening
  serial.on('list', printList); // set a callback function for the serialport list event
  // serial.on('error', serialError); // callback for errors
  // serial.on('close', portClose); // callback for the port closing
  // serial.list(); // list the serial ports

  // Blood drops settings
  createCanvas(400, 400);
  //createCanvas(windowWidth, windowHeight);
  noStroke();
  frameRate(30);
  angleMode(DEGREES);
  ellipseMode(CENTER);
}


/* ---------------------------------------
 *  DRAW
 */

function draw() {
  // Accelerometer
  translate(height / 2, width / 2);
  translateInput();

  // clear screen
  if (buttonOn[1] == 0) {
    fill(0, 255, 0);
    textSize(24);
    text("button to clear", width / 2, 3 * height / 4);
  }

  // Update blood paint movement
  for (let i = 0; i < drops.length; i++) {
    drops[i].move();
    drops[i].display();
  }

  //touch to turn on DRAWING
  if (touching[1] == 0) {
    fill(0, 100, 255);
    textSize(24);
    stroke(1);
    text("drawing", width / 2, height / 2);
    
    // Do blood paint
    createDrop(xMap, zMap);
    // Keep size of array in check, delete the first 40, every 5 seconds
    if (millis() % 5000 < 100) {
      print(drops.length);
      drops.splice(0, 40); //index, amount
    }

    // Draw the blood based on Accelerometer
    noStroke();
    ellipse(xMap, zMap, 10, 10);

    //blow blood function
    if (WindSpeed_MPH[1] > 3) {
      fill(255, 0, 0);
      noStroke();
      textSize(24);
      text('blood', width / 4, height / 4);
      fill(255, 0, 0);
      // noStroke();
      ellipse(random(windowWidth / 4, 3 * windowWidth / 4), random(windowHeight / 4, 3 * windowHeight / 4), WindSpeed_MPH[1] * random(0.1, 10));
      ellipse(random(windowWidth / 4, 3 * windowWidth / 4), random(windowHeight / 4, 3 * windowHeight / 4), WindSpeed_MPH[1] * random(0.1, 10));
      ellipse(random(windowWidth / 4, 3 * windowWidth / 4), random(windowHeight / 4, 3 * windowHeight / 4), WindSpeed_MPH[1] * random(0.1, 10));
      ellipse(random(windowWidth / 4, 3 * windowWidth / 4), random(windowHeight / 4, 3 * windowHeight / 4), WindSpeed_MPH[1] * random(0.1, 10));
    }
  }

  //guiText();
}


/* ---------------------------------------
 * Drawing Drops functionality
 */

function createDrop(x, y) {
  let d = new drop(x, y);
  drops.push(d);
}

class drop {
  constructor(xIn, yIn) {
    // make local variables
    this.x = xIn;
    this.y = yIn;
    // length of slide effect
    this.maxLength = random(10, dropLength);
    this.maxFall = this.maxLength + yIn;
    // speed
    this.speed = random(5, 15);
    // size of this drop
    this.diameter = random(minDropSize, maxDropSize);
  }

  move() {
    var rand = random(-0.5, 0.5)

    //only update this.y if it is below the lenght a drop can slide
    if (this.y > this.maxFall) {
      //print("larger");
      this.y = this.y;
    } else {
      this.y += this.speed * easing;
      this.x += rand;
    }
  }

  display() {
    fill(200, 0, 0, 255);
    ellipse(this.x, this.y + 1, this.diameter, this.diameter);
    fill(255, 0, 0, 255);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}


/* ---------------------------------------
 *  Handle serial input
 */

// Translation of input from Accelerometer
function translateInput() {
  // fix X mapping
  if (x > (360 - constrainDegree)) {
    xMap = map((-1 * (360 - x)), 0, constrainDegree, 0, width / 2);
    print(xMap);
  } else {
    xMap = map(x, 0, constrainDegree, 0, width / 2);
  }

  // fix Z mapping
  zMap = map(z, 0, constrainDegree, 0, height / 2);
}

function guiText() {
  background(0);
  fill(255);
  text("sensor value: " + inData, 30, 30);
}


// port list
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    var p = portList[i];
    if (p.indexOf('usbmodem') > -1) { // returns neg 1 if not there
      print("found usbmodem: " + p);

      // open port
      serial.clear();
      serial.open(p, {
        baudrate: 9600
      });
    }
  }
}

// Standard serial setup

function serialEvent() {

  // For serial.println:
  // read a string from the serial port:
  var inString = serial.readLine();
  // print(inString);
  if (!inString) return;
 		 // check to see that there's actually a string there:
  if (inString.length > 0) {
    // split it
    var parts = inString.split(',');
    // print(parts);

    if (parts.length > 4) { // check that the array has at least three
      WindSpeed_MPH = split(parts[0], ':');
      touching = split(parts[1], ':');
      buttonOn = split(parts[2], ':');
      // convert it to a number:
      x = Number(parts[3]);
      z = Number(parts[4]);
      // debug
      print(WindSpeed_MPH[1], touching[1], buttonOn[1], x, z);
    }
  }
  //handshake
  serial.write('x');
}

// function serverConnected() {
//   print('connected to server.');
// }

// function portOpen() {
//   print('the serial port opened.')
// }

// function serialError(err) {
//   print('Something went wrong with the serial port. ' + err);
// }

// function portClose() {
//   print('The serial port closed.');
// }/* ---------------------------------------
 *  GLOBAL VARIABLES
 */

// serial stuff
var serial;
var x;
var z;
var xMap;
var zMap;
var constrainDegree = 40;

// Blood paint stuff
let drops = [];
var offset = 2;
var minDropSize = 5;
var maxDropSize = 15;
var dropLength = 60;
var easing = 0.08; // how fast the drops run

// Wind, button, picked up
var WindSpeed_MPH = 0;
var touching = -1;
var buttonOn = 0;

/* ---------------------------------------
 *  SETUP
 */

function setup() {
  // Serial
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing
  serial.list(); // list the serial ports

  // Blood drops settings
  createCanvas(400, 400);
  //createCanvas(windowWidth, windowHeight);
  noStroke();
  frameRate(30);
  angleMode(DEGREES);
  ellipseMode(CENTER);
}


/* ---------------------------------------
 *  DRAW
 */

function draw() {
  // Accelerometer
  translate(height / 2, width / 2);
  translateInput();

  // clear screen
  if (buttonOn[1] == 0) {
    fill(0, 255, 0);
    textSize(24);
    text("button to clear", width / 2, 3 * height / 4);
  }

  // Update blood paint movement
  for (let i = 0; i < drops.length; i++) {
    drops[i].move();
    drops[i].display();
  }

  //touch to turn on DRAWING
  if (touching[1] == 0) {
    //fill(0, 100, 255);
    //textSize(24);
    //stroke(1);
    //text("drawing", width / 2, height / 2);
    
    // Do blood paint
    createDrop(xMap, zMap);
    // Keep size of array in check, delete the first 40, every 5 seconds
    if (millis() % 5000 < 100) {
      print(drops.length);
      drops.splice(0, 40); //index, amount
    }

    // Draw the blood based on Accelerometer
    noStroke();
    ellipse(xMap, zMap, 10, 10);

    //blow blood function
    if (WindSpeed_MPH[1] > 3) {
      fill(255, 0, 0);
      noStroke();
      textSize(24);
      text('blood', width / 4, height / 4);
      fill(255, 0, 0);
      noStroke();
      ellipse(random(windowWidth / 4, 3 * windowWidth / 4), random(windowHeight / 4, 3 * windowHeight / 4), WindSpeed_MPH[1] * random(0.1, 10));
      ellipse(random(windowWidth / 4, 3 * windowWidth / 4), random(windowHeight / 4, 3 * windowHeight / 4), WindSpeed_MPH[1] * random(0.1, 10));
      ellipse(random(windowWidth / 4, 3 * windowWidth / 4), random(windowHeight / 4, 3 * windowHeight / 4), WindSpeed_MPH[1] * random(0.1, 10));
      ellipse(random(windowWidth / 4, 3 * windowWidth / 4), random(windowHeight / 4, 3 * windowHeight / 4), WindSpeed_MPH[1] * random(0.1, 10));
    }
  }

  //guiText();
}


/* ---------------------------------------
 * Drawing Drops functionality
 */

function createDrop(x, y) {
  let d = new drop(x, y);
  drops.push(d);
}

class drop {
  constructor(xIn, yIn) {
    // make local variables
    this.x = xIn;
    this.y = yIn;
    // length of slide effect
    this.maxLength = random(10, dropLength);
    this.maxFall = this.maxLength + yIn;
    // speed
    this.speed = random(5, 15);
    // size of this drop
    this.diameter = random(minDropSize, maxDropSize);
  }

  move() {
    var rand = random(-0.5, 0.5)

    //only update this.y if it is below the lenght a drop can slide
    if (this.y > this.maxFall) {
      //print("larger");
      this.y = this.y;
    } else {
      this.y += this.speed * easing;
      this.x += rand;
    }
  }

  display() {
    fill(200, 0, 0, 255);
    ellipse(this.x, this.y + 1, this.diameter, this.diameter);
    fill(255, 0, 0, 255);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}


/* ---------------------------------------
 *  Handle serial input
 */

// Translation of input from Accelerometer
function translateInput() {
  // fix X mapping
  if (x > (360 - constrainDegree)) {
    xMap = map((-1 * (360 - x)), 0, constrainDegree, 0, width / 2);
    print(xMap);
  } else {
    xMap = map(x, 0, constrainDegree, 0, width / 2);
  }

  // fix Z mapping
  zMap = map(z, 0, constrainDegree, 0, height / 2);
}

function guiText() {
  background(0);
  fill(255);
  text("sensor value: " + inData, 30, 30);
}


// port list
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    var p = portList[i];
    if (p.indexOf('Adafruit') > -1) { // returns neg 1 if not there
      print("found Adafruit: " + p);

      // open port
      serial.clear();
      serial.open(p, {
        baudrate: 9600
      });
    }
  }
}

// Standard serial setup

function serialEvent() {
//   //handshake return
//   serial.write('x');

//   // For serial.println:
//   // read a string from the serial port:
//   var inString = serial.readLine();
//   if (!inString) return;
//   // check to see that there's actually a string there:
//   if (inString.length > 0) {
//     // split it
//     var parts = inString.split(',');
//     print(parts);

//     if (parts.length > 5) { // check that the array has at least three
//       WindSpeed_MPH = split(parts[0], ':');
//       touching = split(parts[1], ':');
//       buttonOn = split(parts[2], ':');
//       // convert it to a number:
//       x = Number(parts[3]);
//       z = Number(parts[4]);
//       // debug
//       print(WindSpeed_MPH[1], touching[1], buttonOn[1], x, z);
//     }
//   }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}var serial;
var WindSpeed_MPH = 0;
var touching = -1;
var buttonOn = 0;

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort();
  serial.on('data', serialEvent);
  serial.on('list', printList);
  serial.clear();
  ellipseMode(CENTER);
  // serial.on('error', serialError);
  // serial.open(portName); 
  // serial.on('close', portClose); 
}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    var p = portList[i];
    print(p);
    if (p.indexOf('Adafruit') > -1) {
      print(p + "looks like the Arduino serial port");
      serial.open(p, {
        baudrate: 9600
      });
    }
  }



}

function serialEvent() {
  //handshake return
  serial.write('x');
  //buffering
  var input = serial.readStringUntil('\n');
  if (!input) return;
  // print(input);
  var sensors = split(input, ',');
  // print(sensors);
   if (sensors.length > 2) {       // check that the array has at least three elements
    WindSpeed_MPH = split(sensors[0], ':');  // copy the first element into xPosition
    touching = split(sensors[1], ':');  // copy the second element  into yPosition
    buttonOn = split(sensors[2], ':');  // copy the third element into zPosition
  print(WindSpeed_MPH[1],touching[1],buttonOn[1]);
   }
  
  
  //  var input = serial.readLine();
  // if (input.length > 0) {
  //   print(input);
  //   windMPH = input;
  // }
}

function draw() {
  background(0, 10);
  
  if (buttonOn[1] == 0) {
    fill(0,255,0);
    textSize(24);
    text("button to clear", width / 2, 3 * height / 4);
  }
  //touch to turn on DRAWING
  if (touching[1] == 0) {
    fill(0,100,255);
    textSize(24);
    stroke(1);
    text("drawing", width / 2, height / 2);
    //blow blood function
    if (WindSpeed_MPH[1] > 3) {
      fill(255,0,0);
      noStroke();
      textSize(24);
      text('blood', width/4, height/4);
    	fill(255, 0, 0);
      noStroke();
    	ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
    	ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
    	ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
    	ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
    }
  }
  
}var serial;
var portName = '/dev/cu.usbmodem1421';
var inData = 0;
let inDataMap;
let currentgrowEllipse = 0.0;
let lastgrowEllipse = 0.0;

function setup() {
  createCanvas(300,300);
  serial = new p5.SerialPort();
  // serial.readLine();
  //split
  //var currentString = serial.readLine();
  // var arrayOfValue = split(currentString, ", ");
  // "103","105","200" = [103,105,200]
  serial.on('data', serialEvent);
  serial.open(portName); 
  var options = { baudrate: 57600}; // change the data rate to whatever you wish
	serial.open(portName, options);
  smooth();
}


function serialEvent() {
  inData = Number(serial.read());
  print("MPH: " + inData);
  rectMode(CENTER);
}

function draw() {
  background(0,10);
  fill(255);
  text("MPH: " + inData, 30,30);
  let currentgrowEllipse = map(inData, 0, 255, 20, windowWidth);
  let lerpEllipse = lerp(currentgrowEllipse, lastgrowEllipse, 0.2);
      ellipse(width/2, height/2, lerpEllipse*0.8 + 50);

  lastgrowEllipse = currentgrowEllipse;
}

var flower;

function setup() {
  createCanvas(400, 400);
    flower = {
      name: "sunflower",
      col: color(200, 220, 0)
 		 }
}

function draw() {
  background(0);
  fill(flower.col);
  text(flower.name, 10, 50);

}function setup() {
// createCanvas(400,200);
  loadJSON('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=2f60ed4cfa911d3aaea5e3418a10bf742f60ed4cfa911d3aaea5e3418a10bf74', gotData);
}

function gotData(data) {
// weather = data;
  print(data);
}

// function draw () {
// print("data?");
// }//had to change manip to start the circles at a larger place 
//because the music comes in slow

//listen to bandpass at 3k and make the dots move independently
//try to LERP the amplitude to move less

//make a reset button
//and a "Make another donut!!  button"
//donut class, object


let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let b;

// magic value that makes the circles the right size
let manip;
//song to play
let timtimsong;
// make a new amplitude module
let amplitude;
let currentAmplitude;
let previousAmplitude;
//get the level of that module
let level;
//map the level of that module
let levelMap = 0;

let bkgdSliderVal = 0.01;

//use buttons to make set favorite spots
// for instance b = 0.19746478873239437;


function preload() {
  //load my background music
  timtimsong = loadSound("timtim.mp3");
  
	// //load eyePic
	// eyePic = loadImage("assets/eye.jpg");

 }



function setup() {
  // play my background music
  timtimsong.loop();
  // get the amplitude of the song
  amplitude = new p5.Amplitude();
  
  // frameRate(10);

  createCanvas(windowWidth, windowHeight);

  imageMode(CENTER);

  //way better than radians!!
  angleMode(DEGREES);

  //tyring HSB out
  colorMode(HSB);

  domObjects();

  // change this number to move the circles farther apart
  manip = 400 / 72;
  //for instance...
  // manip = 2;

  textSize(24);
  textAlign(LEFT);
  smooth();

}

function draw() {
  b = bValSlider.value();
  manip = manipSlider.value();

  // clears the screen if 'c' is pressed
  // keyTyped();

  // slider for FRAMERATE
  let f = frameRateSlider.value();
  frameRate(f);
  // print(f);


  bkgdColor();
  donut(0, 0, 0);
  instructions();
  
}

function donut(strokeH, strokeS, strokeB) {
  
  push();

  //moving the color value
  col += moveC;
  fill(col * 2, 75, 100);

  //if color gets greater than or equal to 100 OR color gets less than 0, 
  //change the value at which we move color to negative.  
  //this allows an oscillation.  You can use print(col); to test your values

  if (col >= 100 || col < 0) {
    moveC = moveC * -1;
  }
  ang += 5;

  //sets up the drawing to oscillate up and down around the center
  // let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 10;
  let transX = windowWidth / 2 + sin(ang * 2);
  let transY = windowHeight / 2 + cos(ang / 3) * 20;
  translate(transX, (transY - 40));


  //increments the rotation so it moves - remember x = x++ down below
  // let rotateMap = map(level, 0, 1, 2, 4);
  // rotate(x / ((b * sqrt(3) / rotateMap)));
  rotate(x / ((b * sqrt(3) / levelMap)));
  // print(x / (b * sqrt(3)) / levelMap);

  // comment this out to stop the rotation
  x += 5;

  //this FOR loop draws set of ellipses in the shape of a circle. 
  //And 360 / 13 determines is how many I will get, 
  //final numbers found by trial and error
  for (i = 0; i < 360; i += 13) {
    //these ellipse values were found by trial and error.  the fact that cos and sin 
    //work opposite in the x / y planes is what makes the circles be drawn 
    //around the center
    // I used mouseX / mouseY to manipulate the shape of the ellipse
    //try different numbers for manip
    // let manip = PI;

    let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
    let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
    let ellipseSize = windowWidth / 20;
    level = amplitude.getLevel();
    // levelMap = (map(level, 0, 1, 2, 20)) * frameCount % 2; - fun one this
    levelMap = map(level, 0, 1, 2, 10)
    let SWSliderVal = map(strokeWeightSlider.value(), 0, 1, 0, 10);
    stroke(strokeH, strokeS, strokeB);
    strokeWeight(SWSliderVal);
    ellipse(ellipseX, ellipseY, ellipseSize * b * levelMap);
    
    // print("slider value ", b);
    // print("amplitude ", levelMap);
  }

  pop();

}

function instructions() {
  fill(255, 127);
  // text("frame rate value", frameRateSlider.width + 20, frameRateSlider.height);
  // text('  start here  > > >  to find a fun sweet spot!', windowWidth / 20, (18 / 20) * windowHeight);
}


function bkgdColor() {
  push();
  colorMode(RGB);
  background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
  pop();
}

// cclears the screen if 'c' is pressed
function keyTyped() {
  if (key === 'c') {
    redraw();
  }
}


// function resetSliders() {
//   strokeWeightSliderVal = 0.0;
//   manipSliderVal = manip;
//   frameRateSliderVal = 24;
//   bValSlider = 0.01
// }

function domObjects() {
 //DOM Objects
  // resetButton = createButton('reset');
  // resetButton.position(windowWidth / 20, 12 * windowHeight / 20);
  // resetButton.mousePressed(resetSliders);
  // rotateSlider = createSlider(1, 3, 1, 0.01);
  // rotateSlider.position(windowWidth / 20, 3 * windowHeight / 5);
  bValSlider = createSlider(0.01, 0.2, 0.01, 0.0001);
  bValSlider.position(windowWidth / 20, 3 * windowHeight / 5);
  let manipRep = (400 / 72);
  manipSlider = createSlider(2, 20, 8, 0.001);
  manipSlider.position(windowWidth / 20, 13 * windowHeight / 20);
  manip = manipSlider.value();
  frameRateSlider = createSlider(12, 60, 30, 1);
  frameRateSlider.position(windowWidth / 20, 14 * windowHeight / 20);
  strokeWeightSlider = createSlider(0.01, 0.1, 0.03, 0.01);
  strokeWeightSlider.position(windowWidth/20, 15*windowHeight/20);
  
}


//FUNCTIONS TO MAKE

// a button to toggle ellipseModes
// function ellipseModes () {
// ellipseMode(CORNERS);
// ellipseMode(CENTER);
// }

//have button for freak out mode

// change this number to move the circles farther apart
// for instance...
// manip = 2;

//make slider for FRAMERATE
// frameRate(sin(f)*20);
var uno;
var unoPort = '/dev/cu.usbmodem1421';
var unoData;
var windMPH;

function setup() {
  uno = new p5.SerialPort();
  uno.on('data', serialEvent);
  uno.open(unoPort);
  createCanvas(400, 400);
}

function printList(portList) {
for (var i = 0; i < portList.length; i++) {
print(portList[i]);
}
}

// function serialEvent() {
//   // read a string from the serial port:
//   var inString = serial.readLine();
//   // check to see that there's actually a string there:
//   if (inString.length > 0 ) {
//   // convert it to a number:
//   inData = Number(inString);
//   }
// }

function serialEvent() {
  // read a byte from the serial port, convert it to a number:
var unoString = uno.readLine();
  if (unoString.length > 0 ) {
  print("WindSpeed_MPH: " + unoData);
    unoData = Number(unoString);
    windMPH = unoData;
  }
}

function draw () {
  background(255,10);
 if (windMPH > 10) {
   fill(0,255,0, 10);
 ellipse(random(0,width),random(0,height),windMPH*random(2,10));
 } 
  if (windMPH == 999) {
  background(0);
  fill(255);
  textSize(64);
  text("clear", width/2, height/2);
  }
}
var uno;

function setup() {
  uno = new p5.SerialPort();
  uno.on("list", printList);
  // uno.list();
}

function printList(portList) {
for (var i = 0; i < portList.length; i++) {
  var p = portList[i]
   if (p.indexOf('usbmodem') > -1) {
      print("port "+ i + " - " + p + " looks like the Arduino serial port");
		  portClose();
   }			
	}
}

function portClose() {
  println('The serial port closed.');
}
var serial;
var WindSpeed_MPH = 0;
var touching = -1;
var buttonOn = 0;

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort();
  serial.on('data', serialEvent);
  serial.on('list', printList);
  serial.clear();
  ellipseMode(CENTER);
  // serial.on('error', serialError);
  // serial.open(portName); 
  // serial.on('close', portClose); 
}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    var p = portList[i];
    print(p);
    if (p.indexOf('usbmodem') > -1) {
      print(p + "looks like the Arduino serial port");
      serial.open(p, {
        baudrate: 9600
      });
    }
  }



}

function serialEvent() {
  //handshake return
  serial.write('x');
  //buffering
  var input = serial.readStringUntil('\n');
  if (!input) return;
  // print(input);
  var sensors = split(input, ',');
  // print(sensors);
   if (sensors.length > 2) {       // check that the array has at least three elements
    WindSpeed_MPH = split(sensors[0], ':');  // copy the first element into xPosition
    touching = split(sensors[1], ':');  // copy the second element  into yPosition
    buttonOn = split(sensors[2], ':');  // copy the third element into zPosition
  print(WindSpeed_MPH[1],touching[1],buttonOn[1]);
   }
  
  
  //  var input = serial.readLine();
  // if (input.length > 0) {
  //   print(input);
  //   windMPH = input;
  // }
}

function draw() {
  background(0, 10);
  
  if (buttonOn[1] == 0) {
    fill(0,255,0);
    textSize(24);
    text("button to clear", width / 2, 3 * height / 4);
  }
  //touch to turn on DRAWING
  if (touching[1] == 0) {
    fill(0,100,255);
    textSize(24);
    stroke(1);
    text("drawing", width / 2, height / 2);
    //blow blood function
    if (WindSpeed_MPH[1] > 3) {
      fill(255,0,0);
      noStroke();
      textSize(24);
      text('blood', width/4, height/4);
    	fill(255, 0, 0);
      noStroke();
    	ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
    	ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
    	ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
    	ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
    }
  }
  
}function setup() {
  var myQuery = "cat";
  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + myQuery + "&api-key=22c3c344bea94a01b17ca0e8841114e2";
  createCanvas(400, 400);
  loadJSON(url, gotData);
}

function draw() {
  background(220);
  
}

function gotData(data) {
		for (var i = 0; i < 10; i++) 
    {
    console.log(data.response.docs[i].snippet);
      delay(500);
      loadJSON(url, gotData);
		}
}//had to change manip to start the circles at a larger place 
//because the music comes in slow


let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let b;

// magic value that makes the circles the right size
let manip;
//song to play
let timtimsong;
// make a new amplitude module
let amplitude;
//get the level of that module
let level;
//map the level of that module
let levelMap = 0;

let bkgdSliderVal = 0.01;

//use buttons to make set favorite spots
// for instance b = 0.19746478873239437;


function preload() {
  //load my background music
  timtimsong = loadSound("timtim.mp3");
  
	// //load eyePic
	// eyePic = loadImage("assets/eye.jpg");

 }



function setup() {
  // play my background music
  timtimsong.loop();
  // get the amplitude of the song
  amplitude = new p5.Amplitude();
  
  // frameRate(10);

  createCanvas(windowWidth, windowHeight);

  imageMode(CENTER);

  //way better than radians!!
  angleMode(DEGREES);

  //tyring HSB out
  colorMode(HSB);

  domObjects();

  // change this number to move the circles farther apart
  manip = 400 / 72;
  //for instance...
  // manip = 2;

  textSize(24);
  textAlign(LEFT);

}

function draw() {
  b = bValSlider.value();
  manip = manipSlider.value();

  // clears the screen if 'c' is pressed
  // keyTyped();

  // slider for FRAMERATE
  // let f = frameRateSlider.value();
  // frameRate(f);
  // print(f);


  bkgdColor();
  // Sliders();
  donut(0, 0, 0);
  instructions();
  
}

function donut(strokeH, strokeS, strokeB) {
  
  //set manip value to space circles out, controleed by slider below
  // manip = manipSlider.value();

  //assign variable 'b' to the rotate function in my sketch
  // var b = bValSlider.value();


  push();

  //moving the color value
  col += moveC;
  fill(col * 2, 75, 100);

  //if color gets greater than or equal to 100 OR color gets less than 0, 
  //change the value at which we move color to negative.  
  //this allows an oscillation.  You can use print(col); to test your values

  if (col >= 100 || col < 0) {
    moveC = moveC * -1;
  }
  ang += 5;

  //sets up the drawing to oscillate up and down around the center
  // let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 10;
  let transX = windowWidth / 2 + sin(ang * 2);
  let transY = windowHeight / 2 + cos(ang / 3) * 20;
  translate(transX, (transY - 50));


  //increments the rotation so it moves - remember x = x++ down below
  rotate(x / ((b * sqrt(3) / levelMap)));
  // print(x / (b * sqrt(3)) / levelMap);

  // comment this out to stop the rotation
  x += 5;

  //this FOR loop draws set of ellipses in the shape of a circle. 
  //And 360 / 13 determines is how many I will get, 
  //final numbers found by trial and error
  for (i = 0; i < 360; i += 13) {
    //these ellipse values were found by trial and error.  the fact that cos and sin 
    //work opposite in the x / y planes is what makes the circles be drawn 
    //around the center
    // I used mouseX / mouseY to manipulate the shape of the ellipse
    //try different numbers for manip
    // let manip = PI;

    let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
    let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
    let ellipseSize = windowWidth / 20;
    level = amplitude.getLevel();
    levelMap = map(level, 0, 1, 2, 20);
    let SWSliderVal = map(strokeWeightSlider.value(), 0, 1, 0, 10);
    stroke(strokeH, strokeS, strokeB);
    strokeWeight(SWSliderVal);
    ellipse(ellipseX, ellipseY, ellipseSize * b * levelMap);
    
    // print("slider value ", b);
    // print("amplitude ", levelMap);
  }

  pop();
}

function instructions() {
  fill(255, 127);
  // text("frame rate value", frameRateSlider.width + 20, frameRateSlider.height);
  // text('  start here  > > >  to find a fun sweet spot!', windowWidth / 20, (18 / 20) * windowHeight);
}


function bkgdColor() {
  push();
  colorMode(RGB);
  background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
  pop();
}

// cclears the screen if 'c' is pressed
function keyTyped() {
  if (key === 'c') {
    redraw();
  }
}


// function resetSliders() {
//   strokeWeightSliderVal = 0.0;
//   manipSliderVal = manip;
//   frameRateSliderVal = 24;
//   bValSlider = 0.01
// }

function domObjects() {
 //DOM Objects
  // resetButton = createButton('reset');
  // resetButton.position(windowWidth / 20, 12 * windowHeight / 20);
  // resetButton.mousePressed(resetSliders);
  strokeWeightSlider = createSlider(0, 0.5, 0.1, 0.01);
  strokeWeightSlider.position(windowWidth / 20, 13 * windowHeight / 20);
  let manipRep = (400 / 72);
  manipSlider = createSlider(1.5, 7, manipRep, 0.001);
  manipSlider.position(windowWidth / 20, 14 * windowHeight / 20);
  manip = manipSlider.value();
  frameRateSlider = createSlider(10, 30, 24, 1);
  frameRateSlider.position(windowWidth / 20, 15 * windowHeight / 20);
  bValSlider = createSlider(0.01, 1, 0.01, 0.01);
  bValSlider.position(windowWidth / 20, 16 * windowHeight / 20);
}


//FUNCTIONS TO MAKE

// a button to toggle ellipseModes
// function ellipseModes () {
// ellipseMode(CORNERS);
// ellipseMode(CENTER);
// }

//have button for freak out mode

// change this number to move the circles farther apart
// for instance...
// manip = 2;

//make slider for FRAMERATE
// frameRate(sin(f)*20);
var serial;
var portName = '/dev/cu.usbmodem1421';
var inData = 0;
let inDataMap;
let currentgrowEllipse = 0.0;
let lastgrowEllipse = 0.0;

function setup() {
  createCanvas(300,300);
  serial = new p5.SerialPort();
  // serial.readLine();
  //split
  //var currentString = serial.readLine();
  // var arrayOfValue = split(currentString, ", ");
  // "103","105","200" = [103,105,200]
  serial.on('data', serialEvent);
  serial.open(portName); 
  var options = { baudrate: 57600}; // change the data rate to whatever you wish
	serial.open(portName, options);
  smooth();
}


function serialEvent() {
  inData = Number(serial.read());
  print("MPH: " + inData);
  rectMode(CENTER);
}

function draw() {
  background(0,10);
  fill(255);
  text("MPH: " + inData, 30,30);
  let currentgrowEllipse = map(inData, 0, 255, 20, windowWidth);
  let lerpEllipse = lerp(currentgrowEllipse, lastgrowEllipse, 0.2);
      ellipse(width/2, height/2, lerpEllipse*0.8 + 50);

  lastgrowEllipse = currentgrowEllipse;
}

//had to change manip to start the circles at a larger place 
//because the music comes in slow


let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;

// magic value that makes the circles the right size
let manip;
//song to play
let timtimsong;
// make a new amplitude module
let amplitude;
//get the level of that module
let level;
//map the level of that module
let levelMap = 0;

let bkgdSliderVal = 0.01;

//use buttons to make set favorite spots
// for instance b = 0.19746478873239437;


function preload() {
  //load my background music
  timtimsong = loadSound("timtim.mp3");
  
	// //load eyePic
	// eyePic = loadImage("assets/eye.jpg");

 }



function setup() {
  // play my background music
  timtimsong.loop();
  // get the amplitude of the song
  amplitude = new p5.Amplitude();

  createCanvas(windowWidth, windowHeight);

  imageMode(CENTER);

  //way better than radians!!
  angleMode(DEGREES);

  //tyring HSB out
  colorMode(HSB);

  domObjects();

  // change this number to move the circles farther apart
  manip = 400 / 72;
  //for instance...
  // manip = 2;

  textSize(24);
  textAlign(LEFT);

}

function draw() {

  // clears the screen if 'c' is pressed
  // keyTyped();

  // slider for FRAMERATE
  // let f = frameRateSlider.value();
  // frameRate(f);
  // print(f);


  bkgdColor();
  // Sliders();
  donut(0, 0, 0);
  instructions();
  
}

function donut(strokeH, strokeS, strokeB) {
  
  //set manip value to space circles out, controleed by slider below
  manip = manipSlider.value();

  //assign variable 'b' to the rotate function in my sketch
  var b = bValSlider.value();


  push();

  //moving the color value
  col += moveC;
  fill(col * 2, 75, 100);

  //if color gets greater than or equal to 100 OR color gets less than 0, 
  //change the value at which we move color to negative.  
  //this allows an oscillation.  You can use print(col); to test your values

  if (col >= 100 || col < 0) {
    moveC = moveC * -1;
  }
  ang += 5;

  //sets up the drawing to oscillate up and down around the center
  let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 10;
  let transX = windowWidth / 2 + sin(ang * 2);
  let transY = windowHeight / 2 + cos(ang / 3) * 20;
  translate(transX, (transY - 50));


  //increments the rotation so it moves - remember x = x++ down below
  rotate(x / ((b * sqrt(3) / levelMap)));
  // print(x / (b * sqrt(3)) / levelMap);

  // comment this out to stop the rotation
  x += 5;

  //this FOR loop draws set of ellipses in the shape of a circle. 
  //And 360 / 13 determines is how many I will get, 
  //final numbers found by trial and error
  for (i = 0; i < 360; i += 13) {
    //these ellipse values were found by trial and error.  the fact that cos and sin 
    //work opposite in the x / y planes is what makes the circles be drawn 
    //around the center
    // I used mouseX / mouseY to manipulate the shape of the ellipse
    //try different numbers for manip
    // let manip = PI;

    let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
    let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
    let ellipseSize = windowWidth / 20;
    level = amplitude.getLevel();
    levelMap = map(level, 0, 1, 2, 20);
    let SWSliderVal = map(strokeWeightSlider.value(), 0, 1, 0, 10);
    stroke(strokeH, strokeS, strokeB);
    strokeWeight(SWSliderVal);
    ellipse(ellipseX, ellipseY, ellipseSize * b * levelMap);
    
    // print("slider value ", b);
    // print("amplitude ", levelMap);
  }

  pop();
}

function instructions() {
  fill(255, 127);
  // text("frame rate value", frameRateSlider.width + 20, frameRateSlider.height);
  text('  start here  > > >  to find a fun sweet spot!', windowWidth / 20, (18 / 20) * windowHeight);
}


function bkgdColor() {
  push();
  colorMode(RGB);
  background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
  pop();
}

// cclears the screen if 'c' is pressed
function keyTyped() {
  if (key === 'c') {
    redraw();
  }
}


// function resetSliders() {
//   strokeWeightSliderVal = 0.0;
//   manipSliderVal = manip;
//   frameRateSliderVal = 24;
//   bValSlider = 0.01
// }

function domObjects() {
 //DOM Objects
  // resetButton = createButton('reset');
  // resetButton.position(windowWidth / 20, 12 * windowHeight / 20);
  // resetButton.mousePressed(resetSliders);
  strokeWeightSlider = createSlider(0, 0.5, 0.1, 0.01);
  strokeWeightSlider.position(windowWidth / 20, 13 * windowHeight / 20);
  let manipRep = (400 / 72);
  manipSlider = createSlider(1.5, 7, manipRep, 0.001);
  manipSlider.position(windowWidth / 20, 14 * windowHeight / 20);
  manip = manipSlider.value();
  frameRateSlider = createSlider(10, 30, 24, 1);
  frameRateSlider.position(windowWidth / 20, 15 * windowHeight / 20);
  bValSlider = createSlider(0.01, 1, 0.01, 0.01);
  bValSlider.position(windowWidth / 20, 16 * windowHeight / 20);
}


//FUNCTIONS TO MAKE

// a button to toggle ellipseModes
// function ellipseModes () {
// ellipseMode(CORNERS);
// ellipseMode(CENTER);
// }

//have button for freak out mode

// change this number to move the circles farther apart
// for instance...
// manip = 2;

//make slider for FRAMERATE
// frameRate(sin(f)*20);
function setup() {
  loadJSON("http://api.open-notify.org/astros.json", gotData, 'jsonp');
}
  
function gotData(data) {
  println(data);
}
var data;

function preload() {
  data = loadJSON("archetypes.json");

}

function setup() {
  noCanvas();

  createElement('h2', "//pull out a single piece of data");
  var archetypes = data.artifacts;
  createElement('h1', archetypes[5].qualities[3]);

  createElement('h2', "// pull a list of data per one nested data piece");
  for (var i = 0; i < archetypes.length; i++) {
    createP(archetypes[i].name);
  }

  createElement('h2', "//to pull a list data per each element");
  for (var i = 0; i < archetypes.length; i++) {
    createElement('h2', archetypes[i].name);
    var syn = archetypes[i].synonyms;
    for (var j = 0; j < syn.length; j++) {
      createDiv(syn[j]);
    }
  }
}var data;

function preload() {
  data = loadJSON("birds.json");
  
}

function setup() {
  noCanvas();
  
  
  var jacks = data.birds;
  
  for (var i = 0; i < jacks.length; i++) {
  createElement('h2', jacks[i].family);
    var members = jacks[i].members;
    for (var j = 0; j < members.length; j++) {
    createDiv(members[j]);
    }
  }
  
}
var serial;
var portName = '/dev/cu.usbmodem1421'
var inData = 0;
let inDataMap;

function setup() {
  angleMode(DEGREES);
  createCanvas(400,400);
  serial = new p5.SerialPort();
  serial.on('data', serialEvent);
  serial.open(portName); 
}


function serialEvent() {
  inData = Number(serial.read());
  print("Got: " + inData);
  rectMode(CENTER);
}

function draw() {
  background(0);
  // inDataMap = map(inData,0,255,-90,0);
  // rotate(inDataMap);
rect(width/2,height/2,inData, inData);
  
}

var serial;

function setup() {
  // createCanvas(400, 400);
  serial = new p5.SerialPort();
  serial.on('list', printList);
}

function draw() {
  background(220);
  ellipse(width/2, height/2, 
}

function printList(portList) {
for (var i = 0; i < portList.length; i++) {
console.log(i + " " + portList[i]);
}
  
}var serial;

function setup() {
  serial = new 
  createCanvas(400, 400);
}

function draw() {
  background(220);
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(500, 300);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);
}


// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  //same as readStringUntil(‘\r\n’)
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  latestData = int(currentString);            // save it for the draw method
  console.log(latestData);             // println the string
  var output = map(mouseX,0,width,0,255);
  serial.write(output);
}

function draw() {
  background(255,255,255);
  fill(0,0,0);
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(mouseX, data, 50, 50);
  text(data, 10, 10);
  
}let myCircles = [];
let myColors = [];


function setup() {
  createCanvas(400, 400, P2D);
  for (let i = 0; i < 2; i++) {
    myCircles.push(new Circle(random(width),
      random(height), 60, random(10), random(5)));
  }
}

function draw() {
  background(220);
  for (let i = 0; i < myCircles.length; i++) {
    myCircles[i].displayIt();
    myCircles[i].moveIt();
    for (let j = 0; j < myCircles.length; j++) {
      if (i != j && myCircles[i].intersects(myCircles[j])) {
        myCircles[i].turn();
        print("turn");
        

      }
    }

  }

}

class Circle {

  constructor(x, y, radius, moveX, moveY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.moveX = moveX;
    this.moveY = moveY;
  }

  displayIt() {
    ellipse(this.x, this.y, this.radius);
  }

  moveIt() {
    this.x = this.x + this.moveX;
    this.y = this.y + this.moveY;
    if (this.x > width || this.x < 0) {
      this.moveX *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.moveY *= -1;
    }
  }

  intersects(other) {
    var d = dist(this.x, this.y, other.x, other.y);
    if (d < this.radius/2 + other.radius/2) {
      return true;
      print("intersects");
    } else {
      return false;
    }

  }

  turn() {
    this.moveX = -1 * this.moveX;
    this.moveY = -1 * this.moveY;
  }
}//had to change manip to start the circles at a larger place 
//because the music comes in slow

//background image
// let eyePic;

let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;

// magic value that makes the circles the right size
let manip;

var slider;
//song to play
let timtimsong;
// make a new amplitude module
let amplitude;
//get the level of that module
let level;
//map the level of that module
let levelMap = 0;

let bkgdSliderVal = 0.01;

//use buttons to make set favorite spots
// for instance b = 0.19746478873239437;

//make slider effect rotate speed - check!

var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?

// Offset for dragging slider
var offsetX = 0;

function preload() {
  //load my background music
  timtimsong = loadSound("timtim.mp3");
	// //load eyePic
	// eyePic = loadImage("assets/eye.jpg");

}



function setup() {
	// play my background music
  timtimsong.loop();
  // get the amplitude of the song
  amplitude = new p5.Amplitude();

  createCanvas(windowWidth, windowHeight);
  
  imageMode(CENTER);

  //way better than radians!!
  angleMode(DEGREES);

  //tyring HSB out
  colorMode(HSB);

  //slider object
  slider = {

    x: windowWidth / 20,
    y: windowHeight * (16 / 20),
    w: windowWidth / 20,
    h: windowHeight / 22,
    start: windowWidth / 20,
    end: (2 / 11) * windowWidth
  }
  
  //DOM Objects
  strokeWeightSlider = createSlider(0, 0.5, 0.0, 0.01);
  strokeWeightSlider.position(windowWidth/20, 13 *windowHeight/20);
  let manipRep = (400/72);
  manipSlider = createSlider(1.5, 7, manipRep, 0.1);
  manipSlider.position(windowWidth/20, 14 *windowHeight/20);
  frameRateSlider = createSlider(10, 30, 24, 1);
  frameRateSlider.position(windowWidth/20, 15 *windowHeight/20);
  resetButton = createButton('reset');
  resetButton.position(windowWidth/20, 12*windowHeight/20);
  resetButton.mousePressed(resetSliders);
  // bSlider = createSlider(0.01, 1, 0.01, 0.01);
  // bSlider.position(windowWidth / 20, 16 * windowHeight/20);
  
  

  // change this number to move the circles farther apart
  manip = 400 / 72;
  //for instance...
  // manip = 2;

  textSize(24);
  textAlign(LEFT);
  
  


}

function draw() {

  // clears the screen if 'c' is pressed
  // keyTyped();

  // slider for FRAMERATE
  let f = frameRateSlider.value();
  frameRate(f);
  // print(f);


  bkgdColor();
  Sliders();
  donut(0,0,0);
  instructions();
  // sliderReset();
}

function donut(strokeH, strokeS, strokeB) {
  //set manip value to space circles out, controleed by slider below
  manip = manipSlider.value();

  //assign variable 'b' to the rotate function in my sketch
  var b = map(slider.x, slider.start, slider.end - slider.w, 0.01, 1);
  // print(b);
  // fill(b);
  // rect(sliderStart, 100, sliderEnd-sliderStart, 150);


  push();

  //diff stroke values are fun with this one
  // stroke(100, 100, 40);

  //moving the color value
  col += moveC;
  fill(col * 2, 75, 100);

  //if color gets greater than or equal to 100 OR color gets less than 0, 
  //change the value at which we move color to negative.  
  //this allows an oscillation.  You can use print(col); to test your values

  if (col >= 100 || col < 0) {
    moveC = moveC * -1;
  }
  ang += 5;

  //sets up the drawing to oscillate up and down around the center
  let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 10;
  let transX = windowWidth / 2 + sin(ang * 2);
  let transY = windowHeight / 2 + cos(ang / 3) * 20;
  translate(transX, (transY - 50));


  //increments the rotation so it moves - remember x = x++ down below
  rotate(x / ((b * sqrt(3) / levelMap)));
  // print(x / (b * sqrt(3)) / levelMap);

  // comment this out to stop the rotation
  x += 5;

  //this FOR loop draws set of ellipses in the shape of a circle. 
  //And 360 / 13 determines is how many I will get, 
  //final numbers found by trial and error
  for (i = 0; i < 360; i += 13) {
    //these ellipse values were found by trial and error.  the fact that cos and sin 
    //work opposite in the x / y planes is what makes the circles be drawn 
    //around the center
    // I used mouseX / mouseY to manipulate the shape of the ellipse
    //try different numbers for manip
    // let manip = PI;
    
    let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
    let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
    let ellipseSize = windowWidth / 20;
    level = amplitude.getLevel();
    levelMap = map(level, 0, 1, 2, 20)
    let SWSliderVal = map(strokeWeightSlider.value(),0,1,0,10);
    stroke(strokeH,strokeS,strokeB);
    strokeWeight(SWSliderVal);
    ellipse(ellipseX, ellipseY, ellipseSize * b * levelMap);
    // print("slider value ", b);
    // print("amplitude ", levelMap);
  }

  pop();
}

function instructions() {
  fill(255, 127);
  text('  ^ slide me  > > >  to find a fun sweet spot!', windowWidth / 20, (18 / 20) * windowHeight);
}


function bkgdColor() {
  push();
  colorMode(RGB);
  background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
  pop();
}

function Sliders() {
  
  
//   text("stroke", windowwidth/20 + 100, 13* windowHeight/20);
//   text("green", gSlider.x * 2 + gSlider.width, 65);
//   text("blue", bSlider.x * 2 + bSlider.width, 95);
  

  for (i = 0; i < 1; i++) {
    // Is slider being dragged?
    if (dragging) {
      slider.x = mouseX + offsetX;
    }
    // Keep rectangle within limits of slider
    slider.x = constrain(slider.x, slider.start, slider.end - slider.w);

    // Draw a background rect for slider
    push();
    colorMode(RGB);
    fill(255, 10);
    rect(slider.x, slider.y + (i * windowWidth / 10), slider.w, slider.h, 10);
    pop();


    // Fill according to state
    if (dragging) {
      fill(50);
    } else {
      fill(50, 50);
    }
    // Draw rectangle for slider
    noStroke();
    rect(slider.x, slider.y, slider.w, slider.h, 10, 10);
  }
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = slider.x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}

function resetSliders () {
  strokeWeightSliderVal = 0.0;
  manipSliderVal = manip;
  frameRateSliderVal = 24;
}


//FUNCTIONS TO MAKE

// a button to toggle ellipseModes
// function ellipseModes () {
// ellipseMode(CORNERS);
// ellipseMode(CENTER);
// }

//have button for freak out mode

// change this number to move the circles farther apart
// for instance...
// manip = 2;

//make slider for FRAMERATE
// frameRate(sin(f)*20);


// cclears the screen if 'c' is pressed
function keyTyped() {
if (key === 'c') {
redraw();
} 
}//song to play
var song;

function preLoad() {
  //load my background music
  song = loadSound('timtimshort.mp3');
}

function setup() {
  createCanvas(400, 400);
  background(0);
}

function mousePressed() {
  if (song.isPlaying()) {
    // song.play();
  
  	print("play");
  }
}

function draw() {
}let ball;

function setup() {
  createCanvas(400, 400);
  ball = new Ball(random(0,width), random(0,height), 50, 2);
}

function draw() {
  background(220);
  ball.check();
  ball.display();
  ball.move();
  
}

class Ball {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.xSpeed = speed;
    this.ySpeed = speed;
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  display() {
    ellipse(this.x, this.y, this.size);
  }
  
  check() {
  if (this.x > width - this.size/2 || this.x < this.size/2) {
    this.xSpeed *= -1;
  } 
    if (this.y > height - (this.size/2) || this.y < (this.size/2)) {
    this.ySpeed *= -1;
  } 
  }
}let cluster = [];
let clusterSizeOffset = 20;
let checkMouseXYdist;
let lerpVal;

class Dot {
  constructor(x, y) {
    this.xOffset = x;
    this.yOffset = y;

  }

  display(x, y) {
    let xVal = x + this.xOffset;
    let yVal = y + this.yOffset;
    let xBound = constrain(xVal,-150, width/2 + 150);
    let yBound = constrain(yVal, -150, height/2 + 150);
    ellipse(xBound, yBound, 10, 10);
    if (dist(this.x, this.y, width/2, height/2) < 150) {
      this.x = lerp(this.x, mouseX, lerpVal) //this.x + (mouseX - this.x) / 500;
    this.y = lerp(this.y, mouseY, lerpVal) //this.y + (mouseY - this.y) / 500;
      }
  }

}

class Cluster {


  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dots = [];
    for (let i = 0; i < 5; i++) {

      let myDot = new Dot(random(-clusterSizeOffset, clusterSizeOffset),
        random(-clusterSizeOffset, clusterSizeOffset));
      ///add the new dot object to your array of dots in the cluster
      this.dots.push(myDot);
    }

  }

  move() {

    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].display(this.x, this.y);
    }
    // if (dist(this.x, this.y, width / 2, height / 2) < 150) {
    //   this.x = lerp(this.x, mouseX, lerpVal) //this.x + (mouseX - this.x) / 500;
    //   this.y = lerp(this.y, mouseY, lerpVal) //this.y + (mouseY - this.y) / 500;
    // }
  }


}

function setup() {
  createCanvas(400, 400);
  // set lerpVal
  lerpVal = sqrt(3) / 100;

  for (let i = 0; i < 4; i++) {
    cluster[i] = new Cluster((random(width / 3, 2 * width / 3)), (random(height / 3, 2 * height / 3)));
  }
}

function draw() {
  
 

  background(220);
  //boundary
  push();
  stroke(1);
  fill(255);
  ellipse(width / 2, height / 2, 300);
  pop();
  for (let i = 0; i < 4; i++) {
    cluster[i].move();

  }

}let angle = 0.0;
// var Xoffset = 70;
// var Yoffset = 70;
// var scalar = 34;
var speed = 0.000005;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  translate(width/2, height/2);
  background(0,5);
  
  
  noStroke();
  angle += speed;
  rotate(angle);
  
  for (i = 70; i <= height; i += 120) {
    for (j = 65; j <= width; j += 120) {
      fill(i/random(2,6)+50,j,(i+j)/random(2,10), random(i*2,10));
      circle(i, j, 34, 0.00005);
      angle += speed*sin(i*j)/50;
      // push();
      rotate(i,j);
      // pop();
      // print(angle);
    }
  }
}

function circle(xOffset, yOffset, scalar, speed) {
  // fill(255);
  let x = xOffset + cos(angle) * scalar;
  let y = yOffset + sin(angle) * scalar;
  ellipse(x, y, 50, angle++);
  
}
// }
// }var angle = 0.0;
var Xoffset = 70;
var Yoffset = 70;
var scalar = 34;
var speed = 0.005;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  circle(); 
}

function circle() {
  fill(255);
  for(Yoffset=70; Yoffset<=height; Yoffset+=120){
    for (Xoffset = 65; Xoffset <=width; Xoffset +=120){
      var x = Xoffset + cos(angle) * scalar;
      var y = Yoffset + sin(angle) * scalar;
      ellipse( x, y, 50, 50);
      angle += speed;
   	} 
  }
}
 //  function circleColor() {
 //    circleColor = 255;
 //    for (circleColor = 255; circleColor <= 0; circleColor--) {
 // }//background image
let eyePic;
let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let manip;
var slider;
//song to play
var song;

//use buttons to make set favorite spots
// for instance b = 0.19746478873239437;

//make slider effect rotate speed - check!

var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?

// Offset for dragging slider
var offsetX = 0;

// function preLoad() {
//   //load my background music
//   timtim = loadSound("assets/timtim.mp3");
// 	//load eyePic
// 	eyePic = loadImage("assets/eye.jpg");
//   // play my background music
//   timtim.play();
// }



function setup() {


  createCanvas(windowWidth, windowHeight);
  
  imageMode(CENTER);

  //way better than radians!!
  angleMode(DEGREES);

  //tyring HSB out
  colorMode(HSB);

  //slider object
  slider = {

    x: windowWidth / 20,
    y: windowHeight * (16 / 20),
    w: windowWidth / 20,
    h: windowHeight / 22,
    start: windowWidth / 20,
    end: (2 / 11) * windowWidth
  }

  // change this number to move the circles farther apart
  manip = 400 / 72;
  //for instance...
  // manip = 2;

  textSize(24);
  textAlign(LEFT);


}

function draw() {

  // clears the screen if 'c' is pressed
  // keyTyped();

  // slider for FRAMERATE
  // f += 10;
  // print(sin(f) * 20);

  randomBackground();
  Sliders();
  donut();
  instructions();
}

function donut() {

  //assign variable 'b' to the rotate function in my sketch
  var b = map(slider.x, slider.start, slider.end - slider.w, 0.01, 1);
  // fill(b);
  // rect(sliderStart, 100, sliderEnd-sliderStart, 150);


  push();

  //diff stroke values are fun with this one
  stroke(100, 100, 40);

  //moving the color value
  col += moveC;
  fill(col * 2, 75, 100);

  //if color gets greater than or equal to 100 OR color gets less than 0, 
  //change the value at which we move color to negative.  
  //this allows an oscillation.  You can use print(col); to test your values

  if (col >= 100 || col < 0) {
    moveC = moveC * -1;
  }
  ang += 5;

  //sets up the drawing to oscillate up and down around the center
  let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 10;
  let transX = windowWidth / 2 + sin(ang * 2);
  let transY = windowHeight / 2 + cos(ang / 3) * 20;
  translate(transX, (transY - 50));


  //increments the rotation so it moves - remember x = x++ down below
  rotate(x / (b * sqrt(3) / 100));

  // comment this out to stop the rotation
  x += 5;

  //this FOR loop draws set of ellipses in the shape of a circle. 
  //And 360 / 13 determines is how many I will get, 
  //final numbers found by trial and error
  for (i = 0; i < 360; i += 13) {
    //these ellipse values were found by trial and error.  the fact that cos and sin 
    //work opposite in the x / y planes is what makes the circles be drawn 
    //around the center
    // I used mouseX / mouseY to manipulate the shape of the ellipse
    //try different numbers for manip
    // let manip = PI;
    let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
    let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
    let ellipseSize = windowWidth / 20;
    ellipse(ellipseX, ellipseY, ellipseSize * b);
    print("slider value ", b);
  }

  pop();
}

function instructions() {
  fill(255, 127);
  text('  ^ slide me  > > >  to find a fun sweet spot!', windowWidth / 20, (18 / 20) * windowHeight);
}

function randomBackground() {
  push();
  colorMode(RGB);
  background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
  pop();
}

function Sliders() {

  for (i = 0; i < 1; i++) {
    // Is slider being dragged?
    if (dragging) {
      slider.x = mouseX + offsetX;
    }
    // Keep rectangle within limits of slider
    slider.x = constrain(slider.x, slider.start, slider.end - slider.w);

    // Draw a background rect for slider
    push();
    colorMode(RGB);
    noStroke();
    fill(255, 10);
    rect(slider.x, slider.y + (i * windowWidth / 10), slider.w, slider.h, 10);
    pop();


    // Fill according to state
    if (dragging) {
      fill(50);
    } else {
      fill(50, 50);
    }
    // Draw rectangle for slider
    noStroke();
    rect(slider.x, slider.y, slider.w, slider.h, 10, 10);
  }
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = slider.x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}


//FUNCTIONS TO MAKE

// a button to toggle ellipseModes
// function ellipseModes () {
// ellipseMode(CORNERS);
// ellipseMode(CENTER);
// }

//have button for freak out mode

// change this number to move the circles farther apart
// for instance...
// manip = 2;

//make slider for FRAMERATE
// frameRate(sin(f)*20);


// clears the screen if 'c' is pressed
// function keyTyped() {
// if (key === 'c') {
// redraw();
// } 
// }// make button for random size vals
// make button for more instances of drawRGB;
// make button to change ellipseModes

let xLoc = 0;
let yLoc = 0;
let size;
let colors = [];
let sizeSlider;
let bkgdAlphaSlider;
let sizeVal;

function setup() {
  createCanvas(windowWidth, windowHeight);
  size = width / 20;
  xLoc = size;
  yLoc = size;

  //an array of colors to pick from when making dots
  colors[0] = [153, 40, 40];
  colors[1] = [37, 145, 77];
  colors[2] = [51, 102, 204];

  sizeSlider = createSlider(1, 150, 20, 10);
  sizeSlider.position(width / size, height / size);
  bkgdAlphaSlider = createSlider(2, 255, 40, 10);
  bkgdAlphaSlider.position(width / size, 3 * (height / size));

  // ellipseMode(CENTER);
  ellipseMode(CORNER);
  //ellipseMode(CORNERS); - also do translate with this
}

function draw() {
  sizeVal = sizeSlider.value();
  size = windowWidth / sizeVal;

  let bkgdAlpha = bkgdAlphaSlider.value();

  background(0, bkgdAlpha);
  drawRGB();
  print(sizeVal);
}

function drawRGB() {

  for (j = 0; j < 50; j++) {
    for (i = 0; i < 3; i++) {
      fill(random(colors));
      altDots();
    }
  }
}

function altDots() {
    ellipse(xLoc, yLoc, size);
    xLoc = xLoc + size;
    if (xLoc > width) {
      xLoc = 0;
      yLoc = yLoc + size
    }
    if (yLoc > height) {
      yLoc = 0;
    }
  }
// want a triangle banded, no fill in center, only outside of the triangle

function setup() {
  createCanvas(600, 600);
  background(54, 127, 74);
  bkgdDots();
  fill(201, 102, 137);
  beginShape(TRIANGLES);
  vertex(width / 9, (7 / 9) * height);
  vertex((8 / 9) * width, (7 / 9) * height);
  vertex(width / 2, height / 9);
  vertex((2 / 9) * width, (6.5 / 9) * height);
  vertex((7 / 9) * width, (6.5 / 9) * height);
  vertex((1 / 2) * width, (2 / 9) * height);
  endShape(CLOSE);
}

// for all the pixels on the screen, if they are
// greater than 

//http://blackpawn.com/texts/pointinpoly/default.html

// function SameSide(p1,p2, a,b)
//     cp1 = CrossProduct(b-a, p1-a)
//     cp2 = CrossProduct(b-a, p2-a)
//     if DotProduct(cp1, cp2) >= 0 then return true
//     else return false

// function PointInTriangle(p, a,b,c)
//     if SameSide(p,a, b,c) and SameSide(p,b, a,c)
//         and SameSide(p,c, a,b) then return true
//     else return false

function bkgdDots() {

  for (i = 0; i < 10; i++) {
    for (j = 0; j < 10; j++) {
      elli(i * width / 9, j * height / 9);
    }
  }
}

function elli(x, y) {
  push();
  noStroke();
  pop();
  ellipse(x, y, width / 10, height / 10);
}


// slider changes the shape from triangle to square and back?
// triangle(width/9, (7/9)*height, (8/9)*width, (7/9)*height, width/2, height/9);let myButton;
let mySlider;
let val;
let x = 255;

function setup() {
  createCanvas(400, 400);
  mySlider = createSlider(0, 100, 0, 10);
  mySlider.position(width / 4, height / 2);
  mySlider.changed(believe);
  

}

function draw() {
  background(x);
  
}

function believe() {
  print("slider value " + mySlider.value());
  x = 0;
}let cluster = [];
let clusterSizeOffset = 20;
let checkMouseXYdist;
let lerpVal;

class Dot {
  constructor(x, y) {
    this.xOffset = x;
    this.yOffset = y;
  }

  display(x, y) {
    ellipse(x + this.xOffset, y + this.yOffset, 10, 10);
  }

}

class Cluster {


  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dots = [];
    for (let i = 0; i < 3; i++) {

      let myDot = new Dot(random(-clusterSizeOffset, clusterSizeOffset),
        random(-clusterSizeOffset, clusterSizeOffset));
      ///add the new dot object to your array of dots in the cluster
      this.dots.push(myDot);
      
    }

  }

  move() {

    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].display(this.x, this.y);
      }

      this.x = lerp(this.x, mouseX, lerpVal) //this.x + (mouseX - this.x) / 500;
    this.y = lerp(this.y, mouseY, lerpVal) //this.y + (mouseY - this.y) / 500;

  }


}

function setup() {
  createCanvas(400, 400);
  // set lerpVal
  lerpVal = sqrt(3)/100;
  
  for (let i = 0; i < 4; i++) {
    cluster[i] = new Cluster((random(0, width)), (random(height)));
  }
}

function draw() {
  
  background(220);
  push();
  stroke(1);
  fill(255);
  ellipse(width / 2, height / 2, 300);
  pop();
  for (let i = 0; i < 4; i++) {
    cluster[i].move();
    
  }
  
}//I need to know how to first make a Dots class to get randomized dot locations for each instance
//And then put that into a Cluster class to govern their behavior as a group.


let offsetX = [3, -5, 8, -13, 21, -10]
let offsetY = [34, -21, 13, -8, 5, 3]

let rand;
let cluster1;
let cluster2;
let cluster3;
let cluster4;

let dot = {

  x: 100,
  y: 100,
  dia: 5,
  spacing: 10,
  rand: 0

}

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  cluster1 = new Cluster(random(20,40),random(20,40));
  cluster2 = new Cluster(random(-20,-40),random(-20,-40));
  cluster3 = new Cluster(random(-20,-40),random(20,40));
  cluster4 = new Cluster(random(20,40),random(-20,-40));
}

function draw() {
  background(220);
  dot.rand = random(-0.5, 0.5);
  dot.x = mouseX - 50;
  dot.y = mouseY - 50;
  cluster1.make();
  cluster2.make();
  cluster3.make();
  cluster4.make();
}

class Cluster {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  make() {
    for (let i = 0; i < 6; i++) {
      fill(0);
      let locX = mouseX - this.x;
      let locY = mouseY - this.y;
      ellipse((locX + (offsetX[i] / 2) + dot.rand), (locY - (offsetY[i]) / 2) + dot.rand, dot.dia);
    }
  }

}//How do I convert Cluster into a class to make multiple clusters?
//I would also need to make a Dot class to govern the dots inside the cluster.

let offsetX = [3, -5, 8, -13, 21, -10]
let offsetY = [34, -21, 13, -8, 5, 3]

let rand;
let cluster1, cluster2, cluster3;

let dot = {

  x: 100,
  y: 100,
  dia: 5,
  spacing: 10,
  rand: 0

}

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  cluster1 = new Cluster();
  cluster2 = new Cluster();
  cluster3 = new Cluster();

}

function draw() {

  background(220);
  dot.x = mouseX - 50;
  dot.y = mouseY - 50;
  dot.rand = random(-0.5, 0.5);

  cluster1.make();
  cluster2.make();
  cluster3.make();

}

class Cluster {
  
  constructor() {
    
  }

  make() {
    for (let i = 0; i < 6; i++) {
      fill(0);
      ellipse((dot.x + (offsetX[i] / 2) + dot.rand), (dot.y - (offsetY[i]) / 2) + dot.rand, dot.dia);
    }
  }

}let offsetX = [3, -5, 8, -13, 21, -10]
let offsetY = [34, -21, 13, -8, 5, 3]
let dot = {

  x: 100,
  y: 100,
  dia: 5,
  spacing: 10,
  rand: 0

}

let rand;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  Cluster();
}

function Cluster() {
  
  
  fill(0);
  dot.x = mouseX - 50;
  dot.y = mouseY - 50;
  dot.rand = random(-0.5, 0.5);
  for (let i = 0; i < 6; i++) {
    ellipse((dot.x + (offsetX[i] / 2) + dot.rand), (dot.y - (offsetY[i]) / 2) + dot.rand, dot.dia);
  }
}var slider;

var mixer = [];
var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?
var offsetX = 0; // Offset for dragging slider


function setup() {
  createCanvas(windowWidth, windowHeight);
	// for (let i = 0, i < 6; i++) {
  // mixer[i] = new Slider();
  // }
}  

function draw() {
  background(255,100,100);
  for (let i = 0; i < 6; i++){
  Slider();
  }
}

function Slider() {
  
  // slider object
  slider  = {

    x: windowWidth / 20,
    y: windowHeight / 20,
    w: windowWidth / 20,
    h: windowHeight / 22,
    start: windowWidth / 20,
    end: (2 / 11) * windowWidth
    
  }


    // Is slider being dragged?
    if (dragging) {
      slider.x = mouseX + offsetX;
    }
    // Keep rectangle within limits of slider
    slider.x = constrain(slider.x, slider.start, slider.end - slider.w);

    // Draw a background rect for slider
    push();
    colorMode(RGB);
    noStroke();
    fill(255);
    rect(slider.x, slider.y, slider.w, slider.h, 10);
    pop();


    // Fill according to state
    if (dragging) {
      fill(50);
    } else {
      fill(50, 50);
    }
    // Draw rectangle for slider
    noStroke();
    rect(slider.x, slider.y, slider.w, slider.h, 10, 10);
}



function mousePressed() {
  // Did I click on slider?
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = slider.x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}
//background image
let eyePic;
let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let manip;
var slider;
var song;

//make slider effect rotate speed - check!

var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?

// Offset for dragging slider
var offsetX = 0;

function preLoad() {
  //load my background music
  timtim = loadSound("assets/timtim.mp3");
	//load eyePic
	eyePic = loadImage("assets/eye.jpg");
  // play my background music
  timtim.play();
}



function setup() {


  createCanvas(windowWidth, windowHeight);
  
  imageMode(CENTER);

  //way better than radians!!
  angleMode(DEGREES);

  //tyring HSB out
  colorMode(HSB);

  //slider object
  slider = {

    x: windowWidth / 20,
    y: windowHeight * (16 / 20),
    w: windowWidth / 20,
    h: windowHeight / 22,
    start: windowWidth / 20,
    end: (2 / 11) * windowWidth
  }

  // change this number to move the circles farther apart
  manip = 400 / 72;
  //for instance...
  // manip = 2;

  textSize(24);
  textAlign(LEFT);


}

function draw() {

  // clears the screen if 'c' is pressed
  // keyTyped();

  // slider for FRAMERATE
  // f += 10;
  // print(sin(f) * 20);

  randomBackground();
  image(eyePic, 10, 10);
  Sliders();
  donut();
  instructions();
}

function donut() {

  //assign variable 'b' to the rotate function in my sketch
  var b = map(slider.x, slider.start, slider.end - slider.w, 0.01, 1);
  // fill(b);
  // rect(sliderStart, 100, sliderEnd-sliderStart, 150);


  push();

  //diff stroke values are fun with this one
  stroke(100, 100, 40);

  //moving the color value
  col += moveC;
  fill(col * 2, 75, 100);

  //if color gets greater than or equal to 100 OR color gets less than 0, 
  //change the value at which we move color to negative.  
  //this allows an oscillation.  You can use print(col); to test your values

  if (col >= 100 || col < 0) {
    moveC = moveC * -1;
  }
  ang += 5;

  //sets up the drawing to oscillate up and down around the center
  let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 10;
  let transX = windowWidth / 2 + sin(ang * 2);
  let transY = windowHeight / 2 + cos(ang / 3) * 20;
  translate(transX, (transY - 50));


  //increments the rotation so it moves - remember x = x++ down below
  rotate(x / (b * sqrt(3) / 100));

  // comment this out to stop the rotation
  x += 5;

  //this FOR loop draws set of ellipses in the shape of a circle. 
  //And 360 / 13 determines is how many I will get, 
  //final numbers found by trial and error
  for (i = 0; i < 360; i += 13) {
    //these ellipse values were found by trial and error.  the fact that cos and sin 
    //work opposite in the x / y planes is what makes the circles be drawn 
    //around the center
    // I used mouseX / mouseY to manipulate the shape of the ellipse
    //try different numbers for manip
    // let manip = PI;
    let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
    let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
    let ellipseSize = windowWidth / 20;
    ellipse(ellipseX, ellipseY, ellipseSize * b);
  }

  pop();
}

function instructions() {
  fill(255, 127);
  text('  ^ slide me  > > >  to find a fun sweet spot!', windowWidth / 20, (18 / 20) * windowHeight);
}

function randomBackground() {
  push();
  colorMode(RGB);
  background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
  pop();
}

function Sliders() {

  for (i = 0; i < 1; i++) {
    // Is slider being dragged?
    if (dragging) {
      slider.x = mouseX + offsetX;
    }
    // Keep rectangle within limits of slider
    slider.x = constrain(slider.x, slider.start, slider.end - slider.w);

    // Draw a background rect for slider
    push();
    colorMode(RGB);
    noStroke();
    fill(255, 10);
    rect(slider.x, slider.y + (i * windowWidth / 10), slider.w, slider.h, 10);
    pop();


    // Fill according to state
    if (dragging) {
      fill(50);
    } else {
      fill(50, 50);
    }
    // Draw rectangle for slider
    noStroke();
    rect(slider.x, slider.y, slider.w, slider.h, 10, 10);
  }
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = slider.x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}


//FUNCTIONS TO MAKE

// a button to toggle ellipseModes
// function ellipseModes () {
// ellipseMode(CORNERS);
// ellipseMode(CENTER);
// }

//have button for freak out mode

// change this number to move the circles farther apart
// for instance...
// manip = 2;

//make slider for FRAMERATE
// frameRate(sin(f)*20);


// clears the screen if 'c' is pressed
// function keyTyped() {
// if (key === 'c') {
// redraw();
// } 
// }let mic;
let micLevel;
let levelMultiplier = 1000;
let pixelWhiteCount=0;
let c;

function setup() {
  mic = new p5.AudioIn()
  mic.start();
  createCanvas(800, 800);
  background(0);
  textAlign(CENTER);
}

function draw() {
  drawText();
  drawFear();
  checkWhite();
}

function checkWhite() {
  //for (let i = 0; i <= width; i++) {
  //  for (let j = 0; i <= height; j++) {
  //    c = get(i, j);
  //  }
  //}
}


function drawText() {

  micLevel = (mic.getLevel() * levelMultiplier);
  //print(micLevel);

  fill(0, 102, 153);

  if (micLevel < 35 && micLevel > 20) {
    //print("Success 1!");
    fill(255, 255, 255, 40);
    textSize(random((height * 0.03), (height * 0.06)));
    noStroke();
    text("soft words", random(0, width), random(0, height));
    pixelWhiteCount++;
  }

  if (micLevel < 65 && micLevel > 35) {
    //print("Success 2!");
    fill(255, 255, 255, 80);
    textSize(random((height * 0.06), (height * 0.09)));
    noStroke();
    text("medium words", random(0, width), random(0, height));
    pixelWhiteCount++;
  }

  if (micLevel > 65) {
    //print("Success 3!");
    fill(255, 255, 255, 120);
    textSize((height * 0.09), (height * 0.12));
    noStroke();
    text("Loud words", random(0, width), random(0, height));
    pixelWhiteCount++;
  }
  
  print(pixelWhiteCount);

}

function drawFear() {
  textSize(pixelWhiteCount/10);
  fill(0, 0, 0,pixelWhiteCount,pixelWhiteCount/10);
  stroke(255,pixelWhiteCount/10);
  text("WORD", width / 2, height / 2);
}

let mic;
let micLevel;

// allows us to control the sensitivity of the mic

let levelMultiplier = 500;

let pixelWhiteCount = 0;
let c;

// gathers an aggregate mic level over the course of the sketch 
// to trigger an event at the end

let endThresh = 0;

// a variable to constrain the final size of the text

let textEndSize;

function setup() {
  mic = new p5.AudioIn()
  mic.start();
  createCanvas(800, 800);
  background(0);
  textAlign(CENTER);
}

function draw() {
  drawText();
  drawUnity();
  checkWhite();
}

function checkWhite() {
  //for (let i = 0; i <= width; i++) {
  //  for (let j = 0; i <= height; j++) {
  //    c = get(i, j);
  //  }
  //}
}


// draws the text

function drawText() {

  micLevel = (mic.getLevel() * levelMultiplier);
  //print(micLevel);

  fill(0, 102, 153);

  if (micLevel < 35 && micLevel > 20) {
    //print("Success 1!");
    fill(255, 255, 255, 20);
    textSize(random((height * 0.03), (height * 0.06)));
    text("soft words", random(0, width), random(0, height));
    pixelWhiteCount++;
  }

  if (micLevel < 65 && micLevel > 35) {
    //print("Success 2!");
    fill(255, 255, 255, 50);
    textSize(random((height * 0.06), (height * 0.09)));
    text("medium words", random(0, width), random(0, height));
    pixelWhiteCount++;
  }

  if (micLevel > 65) {
    //print("Success 3!");
    fill(255, 255, 255, 90);
    textSize((height * 0.09), (height * 0.12));
    text("Loud words", random(0, width), random(0, height));
    pixelWhiteCount++;
  }

  print(pixelWhiteCount);
  
  //BILLY'S ADDITIONS
  
  // adds the aggregate mic level over the course of the sketch 

  endThresh += micLevel;
  
  // checks the aggregate level of the mic, 
  // and triggers the end program once a threshold is reached
	// the addition of the level multiplier keeps the sketch from triggering
  // before the WORD has time to grow, while still getting us there faster
  
  if (endThresh > 34000 + levelMultiplier * 2) {
    endTakeOver();
  }
  
  
  // watch as these numbers increase.  The first is the threshold value
  // the second is the mic level sensitivity multiplier which will + or -
  // by a factor of 10 each time you press the UP or DOWN arrows
  
  print(endThresh, levelMultiplier);

}


function drawUnity() {
  textSize(pixelWhiteCount/0.9);
  fill(255, 255, 255, pixelWhiteCount / 3);
  text("UNITY", width / 2, height / 2);
}


//BILLY'S ADDITIONS

function endTakeOver() {
  
  // a background of 0 keeps the focus on the WORD at the end
  background(255);
  //keeo the ending size of the font from getting larger than the screen
  textEndSize = constrain(pixelWhiteCount, 0, (9/10)*width);
  textSize(textEndSize);
  fill(0);
  text("UNITY", width/2, height/2);
}

// function for controlling mic sensitivity via "levelMultiplier"

function keyPressed() {
  if (keyCode === UP_ARROW) {
    levelMultiplier += 10;
  } else if (keyCode === DOWN_ARROW) {
    levelMultiplier -= 10;
  }
  return false; // prevent default
}


let mic;
let micLevel;

// allows us to control the sensitivity of the mic

let levelMultiplier = 500;

let pixelWhiteCount = 0;
let c;

// gathers an aggregate mic level over the course of the sketch 
// to trigger an event at the end

let endThresh = 0;

function setup() {
  mic = new p5.AudioIn()
  mic.start();
  createCanvas(800, 800);
  background(0);
  textAlign(CENTER);
}

function draw() {
  drawText();
  drawFear();
  checkWhite();
}

function checkWhite() {
  //for (let i = 0; i <= width; i++) {
  //  for (let j = 0; i <= height; j++) {
  //    c = get(i, j);
  //  }
  //}
}


// draws the text

function drawText() {

  micLevel = (mic.getLevel() * levelMultiplier);
  //print(micLevel);

  fill(0, 102, 153);

  if (micLevel < 35 && micLevel > 20) {
    //print("Success 1!");
    fill(255, 255, 255, 20);
    textSize(random((height * 0.03), (height * 0.06)));
    text("soft words", random(0, width), random(0, height));
    pixelWhiteCount++;
  }

  if (micLevel < 65 && micLevel > 35) {
    //print("Success 2!");
    fill(255, 255, 255, 50);
    textSize(random((height * 0.06), (height * 0.09)));
    text("medium words", random(0, width), random(0, height));
    pixelWhiteCount++;
  }

  if (micLevel > 65) {
    //print("Success 3!");
    fill(255, 255, 255, 90);
    textSize((height * 0.09), (height * 0.12));
    text("Loud words", random(0, width), random(0, height));
    pixelWhiteCount++;
  }

  print(pixelWhiteCount);
  
  //BILLY'S ADDITIONS
  
  // adds the aggregate mic level over the course of the sketch 

  endThresh += micLevel;
  
  // checks the aggregate level of the mic, 
  // and triggers the end program once a threshold is reached
	// the addition of the level multiplier keeps the sketch from triggering
  // before the WORD has time to grow, while still getting us there faster
  
  if (endThresh > 34000 + levelMultiplier * 2) {
    endTakeOver();
  }
  
  
  // watch as these numbers increase.  The first is the threshold value
  // the second is the mic level sensitivity multiplier which will + or -
  // by a factor of 10 each time you press the UP or DOWN arrows
  
  print(endThresh, levelMultiplier);

}


function drawFear() {
  textSize(pixelWhiteCount);
  fill(255, 255, 255, pixelWhiteCount / 3);
  text("FEAR!", width / 2, height / 2);
}


//BILLY'S ADDITIONS

function endTakeOver() {
  
  // a background of 0 keeps the focus on the WORD at the end
  background(0);
  textSize(pixelWhiteCount);
  fill(255, 255, 255, pixelWhiteCount);
  text("FEAR!", width / 2, height / 2);
}

// function for controlling mic sensitivity via "levelMultiplier"

function keyPressed() {
  if (keyCode === UP_ARROW) {
    levelMultiplier += 10;
  } else if (keyCode === DOWN_ARROW) {
    levelMultiplier -= 10;
  }
  return false; // prevent default
}
let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let manip;
var slider = [];

// var song;


//MAKE SLIDER FOR FRAMERATE
// let f = 12;

//make slider effect rotate speed
//have button for freak out mode

var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?


// Rectangle variables for slider

// Offset for dragging slider
var offsetX = 0;

// function preLoad() {
//   //load my background music
//   song = loadSound("timtim.mp3")
// }


function setup() {

  //i like the drawings to be dynamic so I used these values
  createCanvas(windowWidth, windowHeight);

  //play my background music
  // song.play();

  // //make a button for this
  // //ellipse mode - gotta try this
  // ellipseMode(CORNERS);
  
  //way better than radians!!
  angleMode(DEGREES);

  //tyring HSB out
  colorMode(HSB);

  //slider object

  slider = {

    x: windowWidth / 20,
    y: windowHeight/20,
    w: windowWidth / 20,
    h: windowHeight / 22,
    start: windowWidth / 20,
    end: (2 / 11) * windowWidth
  }

  // slider.start = width / 11;
  // slider.end = (9 / 11) / width;

  // height for slider window




  // change this number to move the circles farther apart
  manip = 400 / 72;
  //for instance...
  // manip = 2;

  //make slider for FRAMERATE
  // frameRate(sin(f)*20);
}

function draw() {
  
  // clears the screen if 'c' is pressed
  // keyTyped();

  // slider for FRAMERATE
  // f += 10;
  // print(sin(f) * 20);

  randomBackground();
  Sliders();
  
  
  

  //assign variable 'b' to the rotate function in my sketch
  var b = map(slider.x, slider.start, slider.end - slider.w, 0.01, 1);
  // fill(b);
  // rect(sliderStart, 100, sliderEnd-sliderStart, 150);


  push();

  //diff stroke values are fun with this one
  stroke(100, 100, 40);

  //moving the color value
  col += moveC;
  fill(col * 2, 75, 100);

  //if color gets greater than or equal to 100 OR color gets less than 0, 
  //change the value at which we move color to negative.  
  //this allows an oscillation.  You can use print(col); to test your values

  if (col >= 100 || col < 0) {
    moveC = moveC * -1;
  }
  ang += 5;

  //sets up the drawing to oscillate up and down around the center
  let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 10;
  let transX = windowWidth / 2 + sin(ang * 2);
  let transY = windowHeight / 2 + cos(ang / 3) * 20;
  translate(transX, (transY - 50));


  //increments the rotation so it moves - remember x = x++ down below
  rotate(x / (b * sqrt(3) / 100));

  // comment this out to stop the rotation
  x += 5;

  //this FOR loop draws set of ellipses in the shape of a circle. 
  //And 360 / 13 determines is how many I will get, 
  //final numbers found by trial and error
  for (i = 0; i < 360; i += 13) {
    //these ellipse values were found by trial and error.  the fact that cos and sin 
    //work opposite in the x / y planes is what makes the circles be drawn 
    //around the center
    // I used mouseX / mouseY to manipulate the shape of the ellipse
    //try different numbers for manip
    // let manip = PI;
    let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
    let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
    let ellipseSize = windowWidth / 20;
    ellipse(ellipseX, ellipseY, ellipseSize * b);
  }

  pop();



}

function randomBackground() {
  push();
  colorMode(RGB);
  background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
  pop();
}

//make a button to toggle ellipseModes
//function ellipseModes () {
// ellipseMode(CORNERS);
// ellipseMode(CENTER);
// }

function Sliders() {

  for (i = 0; i < 6; i++) {
  // Is slider being dragged?
  if (dragging) {
    slider.x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  slider.x = constrain(slider.x, slider.start, slider.end - slider.w);

  // Draw a background rect for slider
  push();
  colorMode(RGB);
  noStroke();
  fill(255, 10);
  rect(slider.x, slider.y + (i*windowWidth/10), slider.w, slider.h, 10);
  pop();


  // Fill according to state
  if (dragging) {
    fill(50);
  } else {
    fill(50, 50);
  }
  // Draw rectangle for slider
  noStroke();
  rect(slider.x, slider.y, slider.w, slider.h, 10, 10);
  }
}


function mousePressed() {
  // Did I click on slider?
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = slider.x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}


// clears the screen if 'c' is pressed

// function keyTyped() {
// if (key === 'c') {
// redraw();
// } 
// }let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let manip;
var slider;

// var song;


//MAKE SLIDER FOR FRAMERATE
// let f = 12;

//make slider effect rotate speed
//have button for freak out mode

var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?


// Rectangle variables for slider

// Offset for dragging slider
var offsetX = 0;

// function preLoad() {
//   //load my background music
//   song = loadSound("timtim.mp3")
// }


function setup() {

  //i like the drawings to be dynamic so I used these values
  createCanvas(windowWidth, windowHeight);

  //play my background music
  // song.play();

  //way better than radians!!
  angleMode(DEGREES);

  //tyring HSB out
  colorMode(HSB);

  //slider object

  slider = {

    x: windowWidth / 11,
    y: (9 / 11) * windowHeight,
    w: windowWidth / 10,
    h: windowHeight / 11,
    start: windowWidth / 11,
    end: (9 / 11) * windowWidth
  }

  // slider.start = width / 11;
  // slider.end = (9 / 11) / width;

  // height for slider window




  // change this number to move the circles farther apart
  manip = 400 / 72;
  //for instance...
  // manip = 2;

  //make slider for FRAMERATE
  // frameRate(sin(f)*20);
}

function draw() {

  // slider for FRAMERATE
  // f += 10;
  // print(sin(f) * 20);

  randomBackground();
  Sliders();

  //assign variable 'b' to the rotate function in my sketch
  var b = map(slider.x, slider.start, slider.end - slider.w, 0.01, 1);
  // fill(b);
  // rect(sliderStart, 100, sliderEnd-sliderStart, 150);


  push();

  //diff stroke values are fun with this one
  stroke(100, 100, 40);

  //moving the color value
  col += moveC;
  fill(col * 2, 75, 100);

  //if color gets greater than or equal to 100 OR color gets less than 0, 
  //change the value at which we move color to negative.  
  //this allows an oscillation.  You can use print(col); to test your values

  if (col >= 100 || col < 0) {
    moveC = moveC * -1;
  }
  ang += 5;

  //sets up the drawing to oscillate up and down around the center
  let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 10;
  let transX = windowWidth / 2 + sin(ang * 2);
  let transY = windowHeight / 2 + cos(ang / 3) * 20;
  translate(transX, (transY - 50));


  //increments the rotation so it moves - remember x = x++ down below
  rotate(x / (b * sqrt(3) / 100));

  // comment this out to stop the rotation
  x += 5;

  //this FOR loop draws set of ellipses in the shape of a circle. 
  //And 360 / 13 determines is how many I will get, 
  //final numbers found by trial and error
  for (i = 0; i < 360; i += 13) {
    //these ellipse values were found by trial and error.  the fact that cos and sin 
    //work opposite in the x / y planes is what makes the circles be drawn 
    //around the center
    // I used mouseX / mouseY to manipulate the shape of the ellipse
    //try different numbers for manip
    // let manip = PI;
    let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
    let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
    let ellipseSize = windowWidth / 20;
    ellipse(ellipseX, ellipseY, ellipseSize * b);
  }

  pop();



}

function randomBackground() {
  push();
  colorMode(RGB);
  background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
  pop();
}

//make a button to toggle ellipseModes
//function ellipseModes () {
// ellipseMode(CORNERS);
// ellipseMode(CENTER);
// }

function Sliders() {

  // Is slider being dragged?
  if (dragging) {
    slider.x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  slider.x = constrain(slider.x, slider.start, slider.end - slider.w);

  // Draw a background rect for slider
  push();
  colorMode(RGB);
  noStroke();
  fill(255, 10);
  rect(slider.x, slider.y, slider.w, slider.h, 10);
  pop();


  // Fill according to state
  if (dragging) {
    fill(50);
  } else {
    fill(50, 50);
  }
  // Draw rectangle for slider
  noStroke();
  rect(slider.x, slider.y, slider.w, slider.h, 10, 10);

}


function mousePressed() {
  // Did I click on slider?
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = slider.x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}let mic;
let endThresh;
let bkgdFadeIn;

function setup() {
  mic = new p5.AudioIn()
  mic.start();
  createCanvas(400, 400);
  background(0);
  //textSize(32);
  endThresh = 0;
}

function draw() {
  micLevel = (mic.getLevel() * 500);
  print(micLevel);
  //ellipse(width / 2, constrain(height - micLevel * height * 5, 0, height), 10, 10);
  fill(0, 102, 153);
  //text("Word 1", 12, 45); // Specify a z-axis value

  if (micLevel < 35 && micLevel > 20) {
    print("Success 1!");
    fill(255, 255, 255, 20);
    textSize(random(0, 12));
    text("soft words", random(-20, 420), random(-20, 420));
  }

  if (micLevel < 65 && micLevel > 35) {
    print("Success 2!");
    fill(255, 255, 255, 50);
    textSize(random(12, 24));
    text("medium words", random(-20, 420), random(-20, 420));
  }

  if (micLevel > 65) {
    print("Success 3!");
    fill(255, 255, 255, 90);
    textSize(random(24, 36));
    text("Loud words", random(-20, 420), random(-20, 420));
  }

  endThresh += micLevel;

  if (endThresh > 10000) {
    endTakeOver();
  }


}

function endTakeOver() {
  background(0);
  textSize(36);
  text("FEAR", width / 2, height / 2);
}
let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let manip;
var slider;
// var song;


//MAKE SLIDER FOR FRAMERATE
// let f = 12;

//make slider effect rotate speed
//have button for freak out mode

var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?


// Rectangle variables for slider

// Offset for dragging slider
var offsetX = 0;

// function preLoad() {
//   //load my background music
//   song = loadSound("timtim.mp3")
// }


function setup() {

  //i like the drawings to be dynamic so I used these values
  createCanvas(windowWidth, windowHeight);

  //play my background music
  // song.play();

  //way better than radians!!
  angleMode(DEGREES);

  //tyring HSB out
  colorMode(HSB);

  //slider object

  slider = {

    x: windowWidth / 11,
    y: (9 / 11) * windowHeight,
    w: windowWidth / 11,
    h: windowHeight / 11,
    start: windowWidth / 11,
    end: (9 / 11) * windowWidth
  }

  // slider.start = width / 11;
  // slider.end = (9 / 11) / width;

  // height for slider window




  // change this number to move the circles farther apart
  manip = 400 / 72;
  //for instance...
  // manip = 2;

  //make slider for FRAMERATE
  // frameRate(sin(f)*20);
}

function draw() {

  // slider for FRAMERATE
  // f += 10;
  // print(sin(f) * 20);

  randomBackground();
  // smooth();

  //make ellipseModes toggle to go bw CENTER and CORNERS
  // ellipseModes();

  //BEGIN slider FUNCTIONS

  // Is slider being dragged?
  if (dragging) {
    slider.x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  slider.x = constrain(slider.x, slider.start, slider.end - slider.w);

  // Draw a background rect for slider
  push();
  colorMode(RGB);
  noStroke();
  fill(255, 10);
  rect(slider.x, slider.y, slider.w, slider.h, 10);
  pop();


  // Fill according to state
  if (dragging) {
    fill(50);
  } else {
    fill(50, 50);
  }
  // Draw rectangle for slider
  noStroke();
  rect(slider.x, slider.y, slider.w, slider.h, 10, 10);

  //assign variable 'b' to the rotate function in my sketch
  var b = map(slider.x, slider.start, slider.end - slider.w, 0, 1);
  // fill(b);
  // rect(sliderStart, 100, sliderEnd-sliderStart, 150);


  push();

  //diff stroke values are fun with this one
  stroke(100, 100, 40);

  //moving the color value
  col += moveC;
  fill(col*2, 75, 100);

  //if color gets greater than or equal to 100 OR color gets less than 0, 
  //change the value at which we move color to negative.  
  //this allows an oscillation.  You can use print(col); to test your values

  if (col >= 100 || col < 0) {
    moveC = moveC * -1;
  }
  ang += 5;

  //sets up the drawing to oscillate up and down around the center
  let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 10;
  let transX = windowWidth / 2 + sin(ang * 2);
  let transY = windowHeight / 2 + cos(ang / 3) * 20;
  translate(transX, (transY - 50));


  //increments the rotation so it moves - remember x = x++ down below
  rotate(x / (b * sqrt(3) / 100));

  // comment this out to stop the rotation
  x += 5;

  //this FOR loop draws set of ellipses in the shape of a circle. 
  //And 360 / 13 determines is how many I will get, 
  //final numbers found by trial and error
  for (i = 0; i < 360; i += 13) {
    //these ellipse values were found by trial and error.  the fact that cos and sin 
    //work opposite in the x / y planes is what makes the circles be drawn 
    //around the center
    // I used mouseX / mouseY to manipulate the shape of the ellipse
    //try different numbers for manip
    // let manip = PI;
    let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
    let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
    let ellipseSize =  windowWidth / 20;
    ellipse(ellipseX, ellipseY, ellipseSize);
  }

  pop();



}

function randomBackground() {
  push();
  colorMode(RGB);
  background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
  pop();
}

//make a button to toggle ellipseModes
//function ellipseModes () {
// ellipseMode(CORNERS);
// ellipseMode(CENTER);
// }

function mousePressed() {
  // Did I click on slider?
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = slider.x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}let dims;
let x = 0;
let y = 0;

function setup() {
  createCanvas(400, 400);
  background(0);
  dims = width / 10;
}

function draw() {

  for (let x = 0; x < 10; x += 1) {
    for (let y = 0; y < 10; y += 1) {
      if ((x + y) % 2 == 0) {
        fill(255);
        rect(x * dims, y * dims, dims, dims);
      } else {
        fill(0);
        rect(x * dims, y * dims, dims, dims);
      }
    }
  }


}let dims;

function setup() {
  createCanvas(400, 400);
  background(0);
  dims = width / 10;
}

function draw() {
  fill(255);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (i % 2 > 0 && j % 2 > 0) {
        fill(0);
      } else {
        fill(255);
      }
      rect(i * dims, j * dims, dims, dims);
    }
  }
}let dims;

function setup() {
  createCanvas(400, 400);
  background(0);
  dims = width / 10;
}

function draw() {
  fill(255);
  for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
      if (i % 2 > 0 && j % 2 > 0) {
        fill(0);
      } else {
        fill(255);
      }
      rect(i * dims, j * dims, dims, dims);
    }
  }
}let dims;

function setup() {
  createCanvas(400, 400);
  background(0);
  dims = width / 10;
}

function draw() {
  fill(255);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (i % 2 > 0 && j % 2 > 0) {
        fill(0);
      } else {
        fill(255);
      }
      rect(i * dims, j * dims, dims, dims);
    }
  }
}let dims;

function setup() {
  createCanvas(400, 400);
  background(0);
  dims = width / 10;
}

function draw() {
  fill(255);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      rect(i * dims, j * dims, dims, dims);
    }
  }
}function setup() {
  createCanvas(400, 400);

}


function draw() {

  stroke(1);

  for (let i = 0; i < 10; i++) {
    let rectCheck = (mouseX > i * width / 10 && mouseX <= i * width / 10 + width / 10);
    if (rectCheck == true) {
      //use an array with values for each color
      let color = ['red', 'green', 'blue', 'yellow', 'brown', 'black', 'purple', 'orange', 'gray', 'pink']
      fill(color[i]);
      rect(i * width / 10, 0, width / 10, height);
    } else {
      fill('white');
      rect(i * width / 10, 0, width / 10, height);

    }
  }
}function setup() {
  createCanvas(400, 400);

}


function draw() {

  stroke(1);
  for (let i = 0; i < 10; i++) {
    let rectCheck = (mouseX > i * width / 10 && mouseX <= i * width / 10 + width / 10);
    if (rectCheck == true) {
      //JUST ADD ADDITIONAL IF/ELSE IF STMTS USING MODULUS (i % 2 > or == 0);
      //if i is even number, then i % 2 has no remainder and is == 0.  
      //if i is odd number, then i % 2 has a remainder and is > 0.
      if (i % 2 > 0) {
        fill('red');
        rect(i * width / 10, 0, width / 10, height);
      } else if (i % 2 == 0) {
        fill('blue');
        rect(i * width / 10, 0, width / 10, height);
      }
    } else {
      fill('white');
      rect(i * width / 10, 0, width / 10, height);

    }
  }
}function setup() {
  createCanvas(400, 400);
  
}


function draw() {
  
  stroke(1);
  for (let i = 0; i < 10; i++) {
    let rectCheck = (mouseX > i * width / 10 && mouseX <= i * width / 10 + width / 10);
    if (rectCheck == true) {
      //JUST ADD ADDITIONAL IF/ELSE IF STMTS WITHIN FOR i <= 4 AND i > 4
      if (i == redHalf) {
        fill('red');
        rect(i * width / 10, 0, width / 10, height);
      } else if (i > 4) {
        fill('blue');
        rect(i * width / 10, 0, width / 10, height);
      }
    } else {
      fill('white');
      rect(i * width / 10, 0, width / 10, height);

    }
  }
}function setup() {
  createCanvas(400, 400);
}


function draw() {
  stroke(1);
  for (let i = 0; i < 10; i++) {
    let rectCheck = (mouseX > i * width / 10 && mouseX <= i * width / 10 + width / 10);
    if (rectCheck == true) {
      // JUST ADD THIS IF STMT INSIDE
      if (i != 6) {
        fill('red');
        rect(i * width / 10, 0, width / 10, height);
      }
    } else {
      fill('white');
      rect(i * width / 10, 0, width / 10, height);

    }
  }
}function setup() {
  createCanvas(400, 400);
}

//I keep getting column 1 staying red after I come off of it...

function draw() {
  stroke(1);
  for (let i = 0; i < 10; i++) {
    let rectCheck = (mouseX > i * width / 10 && mouseX <= i * width / 10 + width / 10);
    if (rectCheck == true) {
      fill('red');
      rect(i * width / 10, 0, width / 10, height);
    } else {
      fill('white');
      rect(i * width / 10, 0, width / 10, height);
    }
  }
}//Rect will switch between color#a and color#b if mouse hovers over

let white = 255;
let green = [0, 255, 0];
let gray = 127;
let yellow = [255, 255, 0];
let black = 0;
let blue = [0, 0, 255];
let red = [255, 0, 0];

let rect1Color = white;
let rect1ColorHover = green;
let rect2Color = gray;
let rect2ColorHover = yellow;
let rect3Color = black;
let rect3ColorHover = blue;

let redToggle;

function setup() {
  createCanvas(400, 400);
  redToggle = false;
  

}

//code a boolean switch state to toggle red on and off 
//each time the mouse is clicked

// function mousePressed() {
//   redToggle = !redToggle;
// }

function mouseClicked() {
  rect3ColorHover = red;
  rect3Color = red;
}

function draw() {
  
  let rect1Check = (mouseX > 0 && mouseX < width / 3);
  let rect2Check = (mouseX > width / 3 && mouseX < 2 / 3 * width);
  let rect3Check = (mouseX > 2 / 3 * width && mouseX < width);

  noStroke();

  //rect1
  fill(rect1Color);
  rect(0, 0, width / 3, height);

  //rect2
  fill(rect2Color);
  rect(width / 3, 0, width / 3, height);

  //rect 3
  fill(rect3Color);
  rect(2 * width / 3, 0, width / 3, height);

  // rect 1 white / green

  if (rect1Check == true) {
    rect1Color = rect1ColorHover;
  } else {
    rect1Color = white;
  }

  //rect 2 gray / yellow

  if (rect2Check == true) {
    rect2Color = rect2ColorHover;
  } else {
    rect2Color = gray;
  }
  

  //rect 3 black / blue

  if (rect3Check == true && rect3ColorHover == red) {
    rect3Color = red; } 
  else if (rect3Check == true) {
    rect3Color = rect3ColorHover;
  } else {
    rect3Color = black;
  }

  //   //if you click the mouse when you’re inside the far right area, 
  //   //it changes the background of that area to red and 
  //   //keeps it red until you click again.

      //   if (redToggle == true) {
      //   rect3ColorHover = red;
      // } else if (redToggle == false) {
      //   rect3ColorHover = blue;
      // }

  //   // if you click the mouse, the rect turns red.  
  //   // if it's already red, then it turns back to the origirnal color

//   if (rect1Check == true && redToggle == true) {
//     rect1ColorHover = red;
//   } else {
//     rect1ColorHover = green;
//   }
  
//   if (rect2Check == true && redToggle == true) {
//     rect2ColorHover = red;
//   } else {
//     rect2ColorHover = yellow;
//   }
  
//   if (rect3Check == true && redToggle == true) {
//     rect3ColorHover = red;
//   } else {
//     rect3ColorHover = blue;
//   }


}

//Rect will switch between color#a and color#b if mouse hovers over

let white = 255;
let green = [0, 255, 0];
let gray = 127;
let yellow = [255, 255, 0];
let black = 0;
let blue = [0, 0, 255];
let red = [255, 0, 0];

let rect1Color = white;
let rect1ColorHover = green;
let rect2Color = gray;
let rect2ColorHover = yellow;
let rect3Color = black;
let rect3ColorHover = blue;

let turnRed;
let redToggle;

function setup() {
  createCanvas(400, 400);
  
}


function mouseClicked() {
  redToggle = !redToggle;
}

function draw() {

  let rect1Check = (mouseX > 0 && mouseX < width / 3);
  let rect2Check = (mouseX > width / 3 && mouseX < 2 / 3 * width);
  let rect3Check = (mouseX > 2 / 3 * width && mouseX < width);

  noStroke();

  //rect1
  fill(rect1Color);
  rect(0, 0, width / 3, height);

  //rect2
  fill(rect2Color);
  rect(width / 3, 0, width / 3, height);

  //rect 3
  fill(rect3Color);
  rect(2 * width / 3, 0, width / 3, height);



  // rect 1 white / green

  if (rect1Check == true) {
    rect1Color = rect1ColorHover;
  } else {
    rect1Color = white;
  }

  //rect 2 gray / yellow

  if (rect2Check == true) {
    rect2Color = rect2ColorHover;
  } else {
    rect2Color = gray;
  }

  //rect 3 black / blue
  
  if (rect3Check == true) {
    rect3Color = rect3ColorHover;
  } else {
    rect3Color = black;
  }

}let x = 20;
let xSpeed = 10;


function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(220);

  x += xSpeed;
  ellipse(x, height / 2, 50, 50);
  if (x > width - 20 || x < 20) {
    xSpeed = -xSpeed;
  } else {
    xSpeed = xSpeed;
  }


}let x, y;
let i = 0;
var colors = {
  a: [48, 111, 191],
  b: [88, 210, 204],
  c: [216, 60, 141]
}


function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  colorMode(HSB);
  // a rectangle that goes across the bottom third of the screen
  // and is rotated 15º as well as another across the top
  // both making the background

  colorMode(RGB);
  push();
  
  translate(0, 50);
  rotate(10);
  fill(colors.a);
  rect(-100, -200, width + 200, height);
  pop();
  push();
  translate(0, 50);
  rotate(10);
  fill(colors.b);
  rect(-100, 200, width + 200, height);
  pop();


}

function draw() {

  push();
  colorMode(HSB);
  noStroke();
  fill(lerpColor(color.a,color.b,inter));
  ellipse(100, 100, 100);
  pop();
}let x, y;
let i = 0;
var colors = {
  a: [48, 111, 191],
  b: [88, 210, 204],
  c: [216, 60, 141]
}


function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  
  // a rectangle that goes across the bottom third of the screen
  // and is rotated 15º as well as another across the top
  // both making the background

  push();
  translate(0, 50);
  rotate(10);
  fill(colors.a);
  rect(-100, -200, width + 200, height);
  pop();
  push();
  translate(0, 50);
  rotate(10);
  fill(colors.b);
  rect(-100, 200, width + 200, height);
  pop();

}

function draw() {

  noStroke();
  fill(colors.c);
  ellipse(100, 100, 100);
}var mic;
var vol;
let opac, opacRand, opacMap;
let x, y;
let moveCircle;
let volMap;

function setup() {
  createCanvas(710, 200);
  opacRand = random(0, -1);
  
  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  opac = opac + opacMap;
  moveCircle = map(vol, 0, 1, 0, 20);

}

function draw() {
  background(200);

  // Get the overall volume (between 0 and 1.0)
  var vol = mic.getLevel();
  // Map the values you need from vol

  volMap = map(vol, 0, 1, 0, 255);
  opacMap = map(vol, 0, 1, 0, 255);

//   let threshold = 0.2;
//   if (vol > threshold) {
    
//   }


    //Move the circle each time and leave it there

    //Use opac to change the alpha channel of the circle

    
    fill(127, opac + opacRand);
    stroke(0);

    //Make opac get larger and larger as the volume increases over time

    ellipse(-50 + moveCircle, height / 2, 50, 50);
  }var mic;
let opac;
var micVol;
let micCheck;
let opacRate = 0.1;
let alphaVal;
let opacReduction;
let size = 0;

function setup() {
  createCanvas(710, 200);
  background(0);


  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  
  //define 
  opacReduction = random(-50, 0);


}

function draw() {
  // Make background here please! 
  // background(200);
  // Get the overall volume (between 0 and 1.0)
  var micVol = mic.getLevel();

  //Map vol to opac
  opac = map(micVol, 0, 1, 0, 255);

  //use alphaVal to change the alpha of the ellipse's fill
  //opacReduction will take down the alpha value to give it some play
  alphaVal = opac * opacRate + opacReduction;
  fill(255, alphaVal);
  
  size = alphaVal*5;
  
  if (alphaVal > 30) {
    print(alphaVal);
  }
	noStroke();
  ellipse(width / 2, height / 2, 10 + size, 10 + size);
  
  //turn off opacReduction once full alpha (full picture) is reached
  // if (alphaVal > 95 ) {
  //   micCheck = 0;
  // }
  
}function setup() {
  //createCanvas(650, 650,WEBGL);
  //background(255, 255, 255);

  // translucent stroke using alpha value
  //stroke(255, 255, 255, 15);

  //}

  //function draw() {
  // draw two random chords each frame
  //randomChord();
  //randomChord();

  //}

  //function randomChord() {
  // find a random point on a circle
  //var angle1 = random(0, 2 * PI);
  //var xpos1 = 400 + 200 * cos(angle1);
  //  var ypos1 = 400 + 200 * sin(angle1);

  // find another random point on the circle
  //var angle2 = random(0, 2 * PI);
  //var xpos2 = random(0, 800) + 200 * cos(angle2);
  // var ypos2 = random(0, 800) + 200 * sin(angle2);

  // draw a line between them
  // line(xpos1, ypos1, xpos2, ypos2);

  //adding in more forms
  // var r1 = map(mouseX, 0,width, 0, height);
  //var r2 = height - r1;

  //fill(0, 0, 0, r1);
  //  rect(width / 2 + r1 / 2, height/2 , r1, r1);

  //  fill(0,0,0, r2);
  // rect(width / 2 - r2 / 2, height/2 , r2, r2);

}

var mx = 1;
var my = 1;
var easing = 0.05;
var radius = 10;
var edge = 100;
var inner = edge + radius;

function setup() {
  createCanvas(700, 700);
  noStroke();
  ellipseMode(RADIUS);
  rectMode(CORNERS);
}

function draw() {
  background(0);

  
  fill(255);

  if (mouseIsPressed) {
    fill(random(0, 255), random(0, 255), random(0, 255));
    radius = random(2, 15)
  }

  for (let z = 0; z < 6; z++) {
    for (let i = 0; i < 6; i++) {
      mx = constrain(mouseX, 50 + z * 100, 100);
      my = constrain(mouseY, 50 + i * 100, 100);
      ellipse(mx, my, radius, radius);
    }
  }


  //   mx = constrain(mouseX, 50, 100);
  //   my = constrain(mouseY, 150, 200);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 50, 100);
  //   my = constrain(mouseY, 250, 300);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 50, 100);
  //   my = constrain(mouseY, 350, 400);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 50, 100);
  //   my = constrain(mouseY, 450, 500);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 50, 100);
  //   my = constrain(mouseY, 550, 600);
  //   ellipse(mx, my, radius, radius);

  //
  //   mx = constrain(mouseX, 150, 200);
  //   my = constrain(mouseY, 50, 100);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 150, 200);
  //   my = constrain(mouseY, 150, 200);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 150, 200);
  //   my = constrain(mouseY, 250, 300);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 150, 200);
  //   my = constrain(mouseY, 350, 400);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 150, 200);
  //   my = constrain(mouseY, 450, 500);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 150, 200);
  //   my = constrain(mouseY, 550, 600);
  //   ellipse(mx, my, radius, radius);

  // //
  //   mx = constrain(mouseX, 250, 300);
  //   my = constrain(mouseY, 50, 100);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 250, 300);
  //   my = constrain(mouseY, 150, 200);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 250, 300);
  //   my = constrain(mouseY, 250, 300);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 250, 300);
  //   my = constrain(mouseY, 350, 400);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 250, 300);
  //   my = constrain(mouseY, 450, 500);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 250, 300);
  //   my = constrain(mouseY, 550, 600);
  //   ellipse(mx, my, radius, radius);

  // //  
  //   mx = constrain(mouseX, 350, 400);
  //   my = constrain(mouseY, 50, 100);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 350, 400);
  //   my = constrain(mouseY, 150, 200);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 350, 400);
  //   my = constrain(mouseY, 250, 300);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 350, 400);
  //   my = constrain(mouseY, 350, 400);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 350, 400);
  //   my = constrain(mouseY, 450, 500);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 350, 400);
  //   my = constrain(mouseY, 450, 500);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 350, 400);
  //   my = constrain(mouseY, 550, 600);
  //   ellipse(mx, my, radius, radius);

  // //  
  //   mx = constrain(mouseX, 450, 500);
  //   my = constrain(mouseY, 50, 100);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 450, 500);
  //   my = constrain(mouseY, 150, 200);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 450, 500);
  //   my = constrain(mouseY, 250, 300);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 450, 500);
  //   my = constrain(mouseY, 350, 400);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 450, 500);
  //   my = constrain(mouseY, 450, 500);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 450, 500);
  //   my = constrain(mouseY, 550, 600);
  //   ellipse(mx, my, radius, radius);

  // //
  //   mx = constrain(mouseX, 550, 600);
  //   my = constrain(mouseY, 50, 100);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 550, 600);
  //   my = constrain(mouseY, 150, 200);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 550, 600);
  //   my = constrain(mouseY, 250, 300);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 550, 600);
  //   my = constrain(mouseY, 350, 400);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 550, 600);
  //   my = constrain(mouseY, 450, 500);
  //   ellipse(mx, my, radius, radius);

  //   mx = constrain(mouseX, 550, 600);
  //   my = constrain(mouseY, 550, 600);
  //   ellipse(mx, my, radius, radius);



  //rect(edge, edge, width - edge, height - edge);
  //fill(255);




  //ellipse(mx, my, radius, radius);
  //ellipse(height - mx, height - my, radius, radius);

  // making changes when the mous is pressed
  // if (mouseIsPressed) {
  //    fill(random(0,255),random(0,255),random(0,255));
  //   ellipse(mx, my, radius, radius);
  // ellipse(height - mx, height - my, radius, radius);
  // radius = random(0, 100);  
  // }
}let img;
let RabbitBody1;
let RabbitBody2;
let RabbitHead1;
let RabbitHead2;
let Tree=1;
let Tree2=1;
let Tree3=1;
//let Cloudx;
//let Cloudy=1;

function preload(){
  img=loadImage("carrot.png");
  img2=loadImage("cloud.png");
  head=loadImage("RHead.png");
  body=loadImage("RBody.png");
}
  
  function setup() {
  	createCanvas(600, 400);
  
  
}

function draw() {
 //background visual
  RabbitHead1=288+random(-3,3);
  RabbitBody1=300-random(-5,5);
  RabbitHead2=307+random(-3,3);
  RabbitBody2=330-random(-5,5);
  Tree=Tree+1;
  Tree2=Tree2+1;
  Tree3=Tree3+1;
  //Cloudx=Cloudx+1;
  //Cloudy=60+sin(-10,10);
  
  
	background(204,236,170);
  noStroke();
  fill(205,233,247);
  rect(0,0,600,300);
  strokeWeight(3);
  stroke(102,165,33)
  image(img2,320,180);
  image(img2,450,110);
  image(img2,40,60);
  
  //moving trees
  	//wood 1
  	fill(151,118,101);
    stroke(110,97,78);
  	rect(595-Tree,210,10,90);
  	if(595-Tree<-5){Tree=1}
  	//treebody 1
  	fill(102,165,33);
  	stroke(12,124,66);
  	ellipse(600-Tree,200,60,100);
  	if(600-Tree<0){Tree=1};
  
  	//wood 2
  	fill(151,118,101);
    stroke(110,97,78);
  	rect(832-Tree2,210,6,90);
  	if(832-Tree2<-3){Tree2=1};
  	//treebody
  	fill(102,165,33);
  	stroke(12,124,66);
  	ellipse(835-Tree2,232,55,73);
  	if(835-Tree2<0){Tree2=1};
  
  	//wood 3
  	fill(151,118,101);
    stroke(110,97,78);
  	rect(1000-Tree3,210,12,90);
  	if(1000-Tree3<0){Tree3=1};
  	
  	//treebody
  	fill(102,165,33);
  	stroke(12,124,66);
  	ellipse(1006-Tree3,200,90,120);
  	if(1006-Tree3<0){Tree3=1};
    
  line(0,300,600,300);//ground line

	//rabbits
  //leader rabbit
  	image(body,134,RabbitBody2);
		image(head,120,RabbitHead2);
  //second rabbit
  	image(body,70,RabbitBody1);
  	image(head,60,RabbitHead1);
  
  //carrot
   	image(img,mouseX, mouseY);

   
  	

}let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let manip;


function setup() {

  //i like the drawings to be dynamic so I used these values
  createCanvas(windowWidth, windowHeight);

  //way better than radians!!
  angleMode(DEGREES);

  //tyring HSB out
  colorMode(HSB);
  
  // change this number to move the circles farther apart
  manip = 400/72;
  //for instance...
  // manip = 2;
}

function draw() {
  
  //and already abandoning HSB color by using push/pop 
  //cause I don't know alpha in HSB
  push();
  colorMode(RGB);
  background(random(100, 120), random(200, 50), random(100, 255), 5);
  pop();

  //diff stroke values are fun with this one
  stroke(100, 100, 40);

  //moving the color value
  col += moveC;
  fill(col + 50, 75, 100);

  //if color gets greater than or equal to 100 OR color gets less than 0, 
  //change the value at which we move color to negative.  
  //this allows an oscillation.  You can use print(col); to test your values

  if (col >= 100 || col < 0) {
    moveC = moveC * -1;
  }
  ang+=5;

  //sets up the drawing to oscillate up and down around the center
  let weight = dist(mouseX,mouseY,pmouseX,pmouseY)*10;
  translate(width/2 + sin(ang*2)*2, height/2 + cos(ang)*20);
  

  //increments the rotation so it moves - remember x = x++ down below
  rotate(x);
  
  // comment this out to stop the rotation
  x+=1;

  //this FOR loop draws set of ellipses in the shape of a circle. 
  //And 360 / 13 determines is how many I will get, 
  //final numbers found by trial and error
  for (i = 0; i < 360; i += 13) {
    //these ellipse values were found by trial and error.  the fact that cos and sin 
    //work opposite in the x / y planes is what makes the circles be drawn 
    //around the center
    // I used mouseX / mouseY to manipulate the shape of the ellipse
    //try different numbers for manip
    // let manip = PI;
    ellipse(width / 20 + cos(i++) * width / manip, width / 20 + sin(i++) * width / manip, width / 20, width / 20);
  }





}let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;

function setup() {

  //i like the drawings to be dynamic so I used these values
  createCanvas(windowWidth, windowHeight);

  //way better than radians!!
  angleMode(DEGREES);

  //tyring HSB out
  colorMode(HSB);
}

function draw() {
  
  //and already abandoning HSB color by using push/pop 
  //cause I don't know alpha in HSB
  push();
  colorMode(RGB);
  background(random(100, 120), random(200, 50), random(100, 255), 5);
  pop();

  //diff stroke values are fun with this one
  stroke(100, 100, 40);

  //moving the color value
  col += moveC;
  fill(col + 50, 75, 100);

  //if color gets greater than or equal to 100 OR color gets less than 0, 
  //change the value at which we move color to negative.  
  //this allows an oscillation.  You can use print(col); to test your values

  if (col >= 100 || col < 0) {
    moveC = moveC * -1;
  }

  //sets up the drawing to rotate around the center
  translate(width/2, height/2);

  //increments the rotation so it moves - remember x = x++ down below
  rotate(x);
  // comment this out to stop the rotation or increase the inc value to rotate faster
  x+=1;

  //this FOR loop draws set of ellipses in the shape of a circle. 
  //And 360 / 13 determines is how many I will get, 
  //final numbers found by trial and error
  for (i = 0; i < 360; i += 13) {
    //these ellipse values were found by trial and error.  the fact that cos and sin 
    //work opposite in the x / y planes is what makes the circles be drawn 
    //around the center
    // I used mouseX / mouseY to manipulate the shape of the ellipse
    ellipse(width / 20 + cos(i++) * width / (400 / 72), width / 20 + sin(i++) * width / (400 / 72), width / 20 + mouseX, width / 20 -mouseY);
  }





}let x = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(x,height/2,50,50);
  x+=10;
}let x;
let y;
let ease = 0.1;
let move = 0;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  x = width / 2;
  y = width / 2;
  let ease = random(0.5,6);

}

function draw() {
  background(220);
  strokeWeight(3);
  fill(255);
  var targetX = mouseX;
  var targetY = mouseY;
  x += (targetX - x) * ease;
  y += (targetY - y) * ease;
  rect(x + random(-5,5), y + random(-5,5), width / 4, height / 4);
  // x = x - move;
  // y = y - move;
  // beginShape();
  // vertex(width / 4, height / 4);
  // vertex(width / 1.25, height / 4);
  // vertex(width / 1.25, height / 1.25);
  // vertex(width / 4, height / 1.25);
  // vertex(width / 4, height / 4);
  // endShape();

}let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;

function setup() {

  //i like the drawings to be dynamic so I used these values
  createCanvas(windowWidth, windowHeight);

  //way better than radians!!
  angleMode(DEGREES);

  //tyring HSB out
  colorMode(HSB);
}

function draw() {
  
  //and already abandoning HSB color by using push/pop 
  //cause I don't know alpha in HSB
  push();
  colorMode(RGB);
  background(random(100, 120), random(200, 50), random(100, 255), 5);
  pop();

  //diff stroke values are fun with this one
  stroke(100, 100, 40);

  //moving the color value
  col += moveC;
  fill(col + 50, 75, 100);

  //if color gets greater than or equal to 100 OR color gets less than 0, 
  //change the value at which we move color to negative.  
  //this allows an oscillation.  You can use print(col); to test your values

  if (col >= 100 || col < 0) {
    moveC = moveC * -1;
  }

  //sets up the drawing to rotate around the center
  translate(width/2, height/2);

  //increments the rotation so it moves - remember x = x++ down below
  rotate(x);
  // comment this out to stop the rotation
  x++;

  //this FOR loop draws set of ellipses in the shape of a circle. 
  //And 360 / 13 determines is how many I will get, 
  //final numbers found by trial and error
  for (i = 0; i < 360; i += 13) {
    //these ellipse values were found by trial and error.  the fact that cos and sin 
    //work opposite in the x / y planes is what makes the circles be drawn 
    //around the center
    ellipse(width / 20 + cos(i++) * width / (400 / 72), width / 20 + sin(i++) * width / (400 / 72), width / 20, width / 20);
  }





}let x = 0;
let y = 0;
let ang = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // background(220, 200, 200);
  angleMode(DEGREES);
  ellipseMode(CENTER);
}

function draw() {
  //if you draw the background, but make it transparent, you can get trails
  background(220, 200, 200, 8 + random(2, -2));
  translate(width / 2, height / 2);
  rotate(ang);
  ang = ang + 1;
  noStroke();
  fill(255);
  for (i = 0; i < 360; i += 13) {
    ellipse(width / 20 + cos(i++) * width/(400/72), width / 20 + sin(i++) * width/(400/72), width / 20, width / 20);
  }
}let x = 0;
let y = 0;
let ang = 0;

function setup() {
  createCanvas(400, 400);
  // background(220, 200, 200);
  angleMode(DEGREES);
  ellipseMode(CENTER);
}

function draw() {
  background(220, 200, 200, 8 + random(2,-2));
  // cos(x) < 0.5 ? x-- : x++;
  // print(cos(x));
  stroke(0);
  noFill();
  ellipse(width / 2 + random(-5, 5), height / 2 + random(-1, 1), width / 20, width / 20);
  //if you draw the background, but make it transparent, you can get trails

  noStroke();
  fill(0, 100, 200, 100);
  // for (i = 0; i < 360; i++) {
  ellipse(width / 2 + cos(x++) * 100, height / 2 - sin(x++) * 100, width / 20, width / 20);
  fill(100, 200, 0, 100);
  ellipse(width / 2 - cos(x++) * 100, height / 2 + sin(x++) * 100, width / 20, width / 20);




  // }
}let x = 0;
let y = 0;
let ang = 90;
let col = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  colorMode(HSB);
}

function draw() {
  push();
  colorMode(RGB);
  background(random(100, 120), random(200, 50), random(100, 255), 10);
  pop();
  noStroke();
  col < 100 ? col++ : col--;
  noFill();
  fill(col + 100, 200, 100);
  translate(width / 2, height / 2);
  rotate(x);
  ellipse(10, 10 - y / 2, 50 - y / 2, 50);
  x > width ? x-- : x++;
  y--;

}let x = 10;
let y = 10;
let angle;

function setup() {
  createCanvas(400, 400);



}

function draw() {
  background(220);
  angle = x + PI;
  x++;
  fill(100);
  noStroke();
  ellipse(100 + x + abs(sin(angle) * 40), 100, 10, 10);

}var cam;
var w;
var angle;
var inc;

function setup() {
  createCanvas(400, 400);
  colorMode(RGB);

  cam = createCapture(VIDEO);
  inc = TWO_PI / 10.0;

  //640 480


  // print(cam.width);
  // print(cam.height);

}


function draw() {

  background(0, 206, 209);

  cam.loadPixels();

  //print(cam.pixels.length);

  //pixels
  var totalB = 0;

  for (var i = 0; i < cam.width * cam.height * 4; i += 4) {
    var r = cam.pixels[i];
    var g = cam.pixels[i + 1];
    var b = cam.pixels[i + 2];

    var c = color(r, g, b);

    var bright = brightness(c);

    totalB = totalB + bright;
    //totalB += bright;


  }

  var averageB = totalB / (cam.width * cam.height * 4);

  //print(averageB);
  //print(mouseX, mouseY);
  var moveB = 0;

  if (averageB >= 10) {
    moveB = 10;
    print('move!!!!!');
  }

  w = averageB / 10;
  print(averageB);

  //Skin Color
  fill(255, 224, 189);

  //Ears
  noStroke();
  //Left
  arc(104, 170, 40, 60, PI / 3, 3 * PI / 2);
  //Right
  arc(296, 170, 40, 60, 3 * PI / 2, PI / 3);

  //Face
  strokeWeight(0);
  ellipse(width / 2, height / 2, 220, 300);

  // Eyes
  fill(255);
  noStroke();
  let pupilWidth = constrain(15 * (1 / w), 10, 20);
  ellipse(width / 2.75, 150, 60, 1.6 * pupilWidth);
  ellipse(width / 1.6, 150, 60, 1.6 * pupilWidth);
  // Iris
  fill(46, 180, 25);
  stroke(46, 180, 25);

  ellipse(width / 2.75, 150, 30, 1.5 * pupilWidth);
  ellipse(width / 1.6, 150, 30, 1.5 * pupilWidth);
  // Pupils
  fill(0);

  ellipse(width / 2.75, 150, pupilWidth, pupilWidth);
  ellipse(width / 1.6, 150, pupilWidth, pupilWidth);

  // print("b: " + averageB);



  //Eye Brows
  noFill();
  strokeWeight(8);
  stroke(90, 43, 11, 127);
  //Left
  bezier(180, 130 - pupilWidth / 2, 170, 120, 115, 130, 115, 126, );
  //Right
  bezier(220, 130 - pupilWidth / 2, 230, 120, 285, 135, 282, 129, );

  //Glasses

  //Reflections
  strokeWeight(1);
  stroke(255);
  line(274, 160, 254, 185);
  line(264, 160, 245, 185);
  //Rims
  strokeWeight(4);
  fill(255, 100);
  stroke(127, 127);
  ellipse(width / 2.75, 160, 80);
  ellipse(width / 1.6, 160, 80);
  //Bridge
  curve(186, 190, 185, 160, 210, 160, 210, 180);
  //Handles
  //Left
  curve(150, 157, 102, 157, 95, 140, 100, 140);
  //Right
  curve(350, 157, 290, 157, 303, 143, 300, 100);


  //Nose
  fill(0, 0);
  curve(250, 50, 195, 144, 211, 240, 450, 15);

  //Mouth
  //Lips Color
  stroke(255, 192, 203);
  //Lips Width
  strokeWeight(5);
  //Inner Mouth Color and Shape
  fill(255);
  arc(width / 2, height / 1.55, 100, 100, 0, HALF_PI + HALF_PI, PIE);

  //Teeth
  strokeWeight(0.5);
  stroke(0);
  line(156, 280, 245, 279);

//Teeth using FOR loop and Sin 
  angle = 0.0;
  for (var i = 0; i < 6; i++) {
    line(i * 12 + 170, height / 1.55 + 2, i * 12 + 170 , 292 + sin(angle)*11);
    angle = angle + inc;
  }


  //decided to use a var for y for ease
  //   var y = ;
  // line(168, y, 168, 292);
  // line(180, y, 180, 300);
  // line(192, y, 192, 306);
  // line(204, y, 204, 306);
  // line(216, y, 216, 303);
  // line(228, y, 228, 296);

  //Hair
  //Main
  rectMode(CENTER);
  fill(90, 43, 11);
  noStroke();
  rect(width / 2, 80, 150, 40, 40);
  //TOP
  rectMode(CORNER);
  arc(width / 2, 85, 200, 80, PI, 0);
  //BANGS
  triangle(173, 96, 185, 99, 175, 120);
  triangle(190, 96, 200, 99, 195, 115);
  triangle(220, 96, 240, 98, 216, 112);
  //SIDEBURNS
  arc(120, 110, 60, 90, 2 * PI / 2.75, 5 * PI / 3);
  arc(280, 110, 50, 95, -2 * PI / 2.5, -5 * PI / 3);




}class Orb {

    constructor() {
      let x, y;
      let moveX, moveY;
      let angle;

      angle = 3;
      x = 500;
      y = 600;
      moveX = sin(angle) * 40;
      moveY = sin(angle) * 30;
    }

    function display() {
      x = x + moveX;
      y = y + moveY;
      translate(100, 100);
      noStroke();
      fill(map(x, 0, 800, 100, 255) + 50, map(x, 0, 800, 100, 255), x + y / 4, 40);
      ellipse(x, y, 100 - x, 100 - y);

      if (x < -100 || x > width) {
        moveX = -1 * moveX;
      }

      if (y < -100 || y > height) {
        moveY = -1 * moveY;
      }
    }
  
  let o;

function setup() {
  createCanvas(800, 800);
  background(255);
  // let x, y;
  // let moveX, moveY;
  // let angle;
  }





}

function draw() {
  o = new Orb();
  o.display();

  // print(x, y);

}var cam;

function setup() {
  createCanvas(400, 400);
  colorMode(RGB);
  background(0, 206, 209);
  
  cam = createCapture(VIDEO);
  
  //640 480
  
  
  // print(cam.width);
  // print(cam.height);

  //Activate the three lines below
  //to put all in a draw fn 
  //to get updated X, Y values 
  //for navigation
  
 }

  
function draw() {
  
    cam.loadPixels();
  
  //print(cam.pixels.length);
  
  //pixels
  var totalB = 0;
  
  for(var i = 0; i < cam.width * cam.height * 4; i += 4){
    var r = cam.pixels[i];
    var g = cam.pixels[i + 1];
    var b = cam.pixels[i + 2];
    
    var c = color(r, g, b);
    
    var bright = brightness(c);
    
    totalB = totalB + bright;
    //totalB += bright;
     
  
  }
  
  var averageB = totalB / (cam.width * cam.height * 4);
 
  //print(averageB);
  //print(mouseX, mouseY);
  var moveB = 0;
  
  // if(averageB >= 10){
  //   moveB = 10;
  //   print('move!!!!!');
  // }
  
  map(averageB,0,20,0,1);
  let w;
  w = averageB;
  // print(averageB);

  //Skin Color
  fill(255, 224, 189);

  //Ears
  noStroke();
  //Left
  arc(104, 170, 40, 60, PI / 3, 3 * PI / 2);
  //Right
  arc(296, 170, 40, 60, 3 * PI / 2, PI / 3);

  //Face
  strokeWeight(0);
  ellipse(width / 2, height / 2, 220, 300);

  // Eyes
  fill(255);
  noStroke();
  ellipse(width / 2.75, 150, 60, 25 * w);
  ellipse(width / 1.6, 150, 60, 25 * w);
  // Iris
  fill(46, 180, 25);
  stroke(46, 180, 25);
  ellipse(width / 2.75, 150, 30, 28 * w);
  ellipse(width / 1.6, 150, 30, 28 * w);
  // Pupils
  fill(0)
  ellipse(width / 2.75, 150, 15 * w , 15 * w);
  ellipse(width / 1.6, 150, 15 * w, 15 * w);
  
  // print("b: " + averageB);
  
  
  
  //Eye Brows
  noFill();
  strokeWeight(8);
  stroke(90, 43, 11,127);
  //Left
  bezier(180, 123 - moveB, 170, 120, 115, 130, 115, 126, );
  //Right
  bezier(220, 125 - moveB, 230, 120, 285, 135, 282, 129, );

  //Glasses

  //Reflections
  strokeWeight(1);
  stroke(255);
  line(274, 160, 254, 185);
  line(264, 160, 245, 185);
  //Rims
  strokeWeight(4);
  fill(255, 100);
  stroke(127, 127);
  ellipse(width / 2.75, 160, 80);
  ellipse(width / 1.6, 160, 80);
  //Bridge
  curve(186, 190, 185, 160, 210, 160, 210, 180);
  //Handles
  //Left
  curve(150, 157, 102, 157, 95, 140, 100, 140);
  //Right
  curve(350, 157, 290, 157, 303, 143, 300, 100);


  //Nose
  fill(0, 0);
  curve(250, 50, 195, 144, 211, 240, 450, 15);

  //Mouth
  //Lips Color
  stroke(255, 192, 203);
  //Lips Width
  strokeWeight(5);
  //Inner Mouth Color and Shape
  fill(255);
  arc(width / 2, height / 1.55, 100, 100, 0, HALF_PI + HALF_PI, PIE);

  //Teeth
  strokeWeight(0.5);
  stroke(0);
  line(156, 280, 245, 279);
  //decided to use a var for y for ease
  var y = height / 1.55 + 2;
  line(168, y, 168, 292);
  line(180, y, 180, 300);
  line(192, y, 192, 306);
  line(204, y, 204, 306);
  line(216, y, 216, 303);
  line(228, y, 228, 296);

  //Hair
  //Main
  rectMode(CENTER);
  fill(90, 43, 11);
  noStroke();
  rect(width / 2, 80, 150, 40, 40);
  //TOP
  rectMode(CORNER);
  arc(width / 2, 85, 200, 80, PI, 0);
  //BANGS
  triangle(173, 96, 185, 99, 175, 120);
  triangle(190, 96, 200, 99, 195, 115);
  triangle(220, 96, 240, 98, 216, 112);
  //SIDEBURNS
  arc(120, 110, 60, 90, 2 * PI / 2.75, 5 * PI / 3);
  arc(280, 110, 50, 95, -2 * PI / 2.5, -5 * PI / 3);
  



}
let x, y;
let moveX, moveY;


function setup() {
  createCanvas(800, 800);
  background(255);
}

x = 0;
y = 0;
moveX = 24;
moveY = 18;

function draw() {

  
  x = x + moveX;
  y = y + moveY;
  translate(100,100);
  noStroke();
  fill(map(x,0,800,0,255),map(y,0,800,0,255), x + y / 4, 40);
  ellipse(x, y, 100 - x, 100 - y);

  if (x < -100 || x > width) {
    moveX = -1 * moveX;
  }

  if (y < -100 || y > height) {
    moveY = -1 * moveY;
  }
print(x,y);

}var circle = {
  
  //Would like to introduce revealing wipes of a photo
  //underneath?
  //Where does the circle start?
  x: 120,
  y: 10,
  //How fast does it move?
  moveX: 3.14159265359 * 3,
  moveY: 3.14159265358 * 2,
}


function setup() {

  createCanvas(3.14159265359 * 300, 3.14159265359 * 250);

}

function circle1() {

  fill(random(50, 100), 1, random(100, 250), random(50, 100));
  noStroke();
  //This line will put breaks and freeze the path.
  // ellipseMode(CORNERS);
  circle.x = circle.x + circle.moveX;
  circle.y = circle.y + circle.moveY;
  ellipse(circle.x, circle.y, 100 + circle.x / 2, 100 + circle.y / 2);

  if (circle.x >= width || circle.x <= 0) {
    circle.moveX = -1 * circle.moveX;
  }
  if (circle.y >= height || circle.y <= 0) {
    circle.moveY = -1 * circle.moveY;
  }
}

function circle2() {

  fill(random(50, 100), 201, random(100, 250));
  noStroke();
  //This line will put breaks and freeze the path.
  // ellipseMode(CORNERS);
  circle.x = circle.x + circle.moveX;
  circle.y = circle.y + circle.moveY;
  ellipse(circle.x, circle.y, circle.x / 2, circle.y / 2);

  if (circle.x >= width || circle.x <= 0) {
    circle.moveX = -1 * circle.moveX;
  }
  if (circle.y >= height || circle.y <= 0) {
    circle.moveY = -1 * circle.moveY;
  }
}

function draw() {
  //darker outer circle
  circle1();
  // lighter inner circle
  circle2();


}var circle = {
  x : 12,
  y : 1,
  moveX : 3.14159265359*3,
  moveY : 3.14159265358*2,
}


function setup() {
  
  createCanvas(3.14159265359*300,3.14159265359*250);
  
}

function circle1() {
  
  fill(random(50,100),1,random(100,250));
  noStroke();
  //This line will put breaks and freeze the path.
  // ellipseMode(CORNERS);
  circle.x = circle.x + circle.moveX;
  circle.y = circle.y + circle.moveY;
  ellipse(circle.x, circle.y, 50+circle.x/2, 50+circle.y/2);

  if (circle.x >= width || circle.x <= 0) {
    circle.moveX = -1 * circle.moveX;
  }
  if (circle.y >= height || circle.y <= 0) {
    circle.moveY = -1 * circle.moveY;
  }
}

function circle2() {
  
  fill(random(50,100),201,random(100,250));
  noStroke();
  //This line will put breaks and freeze the path.
  // ellipseMode(CORNERS);
  circle.x = circle.x + circle.moveX;
  circle.y = circle.y + circle.moveY;
  ellipse(circle.x, circle.y, circle.x/2, circle.y/2);

  if (circle.x >= width || circle.x <= 0) {
    circle.moveX = -1 * circle.moveX;
  }
  if (circle.y >= height || circle.y <= 0) {
    circle.moveY = -1 * circle.moveY;
  }
}

function draw() {
circle1();
  circle2();


}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  var a = 0;
  var inc = TWO_PI / 25.0;
  for (var i = 0; i < 10; i++) {
  line(100,200,300,100+sin(a) * 200);
    a = a + inc;
    if (a > 200 || a < 0) {
      inc = inc*-1;
    }
  }
  
  //I want the right hand end of the line to move 
  //smoothly between points at a certain rate
  // as if controlled by an oscillator
}function setup() {
  createCanvas(400, 400);
  colorMode(RGB);
  background(0, 206, 209);

  //Activate the three lines below
  //to put all in a draw fn 
  //to get updated X, Y values 
  //for navigation
  
// }
// function draw() {
//   print(mouseX, mouseY);

  //Skin Color
  fill(255, 224, 189);

  //Ears
  noStroke();
  //Left
  arc(104, 170, 40, 60, PI / 3, 3 * PI / 2);
  //Right
  arc(296, 170, 40, 60, 3 * PI / 2, PI / 3);

  //Face
  strokeWeight(0);
  ellipse(width / 2, height / 2, 220, 300);

  // Eyes
  fill(255);
  noStroke();
  ellipse(width / 2.75, 150, 60, 25);
  ellipse(width / 1.6, 150, 60, 25);
  // Iris
  fill(46, 180, 25);
  stroke(46, 180, 25);
  ellipse(width / 2.75, 150, 30, 28);
  ellipse(width / 1.6, 150, 30, 28);
  // Pupils
  fill(0)
  ellipse(width / 2.75, 150, 15, 15);
  ellipse(width / 1.6, 150, 15, 15);
  
  //Crows Feet
  //Left out, didn't like
  // stroke(150);
  // strokeWeight(2);
  // //Left
  // line(118,150,107,140);
  // line(118,150,105,148);
  // line(118,150,107,155);
  // //Right
  // line(283,150,294,140);
  // line(283,150,296,148);
  // line(283,150,294,155);
  
  //Eye Brows
  noFill();
  strokeWeight(8);
  stroke(90, 43, 11,127);
  //Left
  bezier(180, 123, 170, 120, 115, 130, 115, 126, );
  //Right
  bezier(220, 125, 230, 120, 285, 135, 282, 129, );

  //Glasses

  //Reflections
  strokeWeight(1);
  stroke(255);
  line(274, 160, 254, 185);
  line(264, 160, 245, 185);
  //Rims
  strokeWeight(4);
  fill(255, 100);
  stroke(127, 127);
  ellipse(width / 2.75, 160, 80);
  ellipse(width / 1.6, 160, 80);
  //Bridge
  curve(186, 190, 185, 160, 210, 160, 210, 180);
  //Handles
  //Left
  curve(150, 157, 102, 157, 95, 140, 100, 140);
  //Right
  curve(350, 157, 290, 157, 303, 143, 300, 100);


  //Nose
  fill(0, 0);
  curve(250, 50, 195, 144, 211, 240, 450, 15);

  //Mouth
  //Lips Color
  stroke(255, 192, 203);
  //Lips Width
  strokeWeight(5);
  //Inner Mouth Color and Shape
  fill(255);
  arc(width / 2, height / 1.55, 100, 100, 0, HALF_PI + HALF_PI, PIE);

  //Teeth
  strokeWeight(0.5);
  stroke(0);
  line(156, 280, 245, 279);
  //decided to use a var for y for ease
  var y = height / 1.55 + 2;
  line(168, y, 168, 292);
  line(180, y, 180, 300);
  line(192, y, 192, 306);
  line(204, y, 204, 306);
  line(216, y, 216, 303);
  line(228, y, 228, 296);

  //Hair
  //Main
  rectMode(CENTER);
  fill(90, 43, 11);
  noStroke();
  rect(width / 2, 80, 150, 40, 40);
  //TOP
  rectMode(CORNER);
  arc(width / 2, 85, 200, 80, PI, 0);
  //BANGS
  triangle(173, 96, 185, 99, 175, 120);
  triangle(190, 96, 200, 99, 195, 115);
  triangle(220, 96, 240, 98, 216, 112);
  //SIDEBURNS
  arc(120, 110, 60, 90, 2 * PI / 2.75, 5 * PI / 3);
  arc(280, 110, 50, 95, -2 * PI / 2.5, -5 * PI / 3);


}function setup() {
  createCanvas(500, 450);
}

function draw() {
  background(255,100,100);

//Eye Brows
stroke(250,255,100);
line(150,100,100,125);

line(350,100,400,125);

// Eyes
fill(150,255,200);
ellipse(150,150,50,50);
ellipse(350,150,50,50);

// Iris
fill(100);
noStroke();
ellipse(150,150,25,25);
ellipse(350,150,25,25);

// Inner Iris
fill(255);
noStroke();
ellipse(150,150,8,8);
ellipse(350,150,8,8);

// Mouth
stroke(250,255,100);
fill(150,255,200);
arc(250,250,250,200, 0, HALF_PI+HALF_PI, PIE);

// Inner Mouth
fill(255);
noStroke();
arc(250,260,200,160, 0, HALF_PI+HALF_PI, PIE);
}