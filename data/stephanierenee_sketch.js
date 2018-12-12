var numSegments = 10,
  x = [],
  y = [],
  angle = [],
  segLength = 26,
  targetX, targetY;

for (var i = 0; i < numSegments; i++) {
  x[i] = 0;
  y[i] = 0;
  angle[i] = 0;
}

function setup() {
  createCanvas(710, 400);



//     x[x.length-1] = width/2; // Set base x-coordinate
//   y[x.length-1] = height;  // Set base y-coordinate
}

function draw() {
  background(0);
    strokeWeight(80);
  rectMode(CENTER);
  stroke(255, 100);
    x[x.length-1] = width/2; // Set base x-coordinate
  y[x.length-1] = height;  // Set base y-coordinate

  reachSegment(0, mouseX, mouseY);
  for(var i=1; i<numSegments; i++) {
    reachSegment(i, targetX, targetY);
  }
  for(var j=x.length-1; j>=1; j--) {
    positionSegment(j, j-1);
  }
  for(var k=0; k<x.length; k++) {
    segment(x[k], y[k], angle[k], (k+1)*2);
  }
}

function positionSegment(a, b) {
  x[b] = x[a] + cos(angle[a]) * segLength;
  y[b] = y[a] + sin(angle[a]) * segLength;
}

function reachSegment(i, xin, yin) {
  var dx = xin - x[i];
  var dy = yin - y[i];
  angle[i] = atan2(dy, dx);
  targetX = xin - cos(angle[i]) * segLength;
  targetY = yin - sin(angle[i]) * segLength;
}

function segment(x, y, a, sw) {
  strokeWeight(sw);
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}
let cnv, youPower;
let w, h;
let questionImg, logo, input;
let totalUsers = 2714;
let thisDay, thisMonth, whyhQ, howQ, whereQ;
let table;

// function preload() {
//   table = loadTable("daily.csv", "csv", "header");
// }



function drawCanvas() {
  let w = windowWidth;
  let h = windowHeight;
  //later use long height to force user to scroll down
  cnv = createCanvas(w, h);
  background(190);
  let cx = (w) / 2;
  
  //Page Settings
  //textFont(Verdana,14);
  rectMode(CENTER);

  //content style
  fill(0);

  //load in content
  logo = loadImage("human_doing_logo_small.png");
  questionImg = loadImage("question_mark.png");
  arrow = loadImage("Back_Arrow.png");
  //load in data
  //totalUsers will pull in the maximum value from the spreadsheet
  //totalUsers = 2471;
  // youPower = "you x " + totalUsers;
  push();
  textSize(14);
  textAlign(CENTER);
  let tagline = "daily acts of good with exponential impact";
  text(tagline, cx, 170);
  pop();
  //   textSize(24);
  //   youPower = "Join the movement of " + totalUsers + " humans doing!";
  //   text(youPower, cx - 225, 210);

  //   textSize(12);
  // text(youPower, cx - 30, 150);

  push();
  textAlign(CENTER);
  textSize(14);
  //stroke(100);
  //fill(124, 252, 0, 160);
  textStyle(BOLD);
  today = "TODAY'S GOOD:";
  text(today, cx, 280);
  pop();


  //get current date//
  let d = day();
  let m = month();
  let thisMonth;
  //loop that turns date into words
  if (m == 1) {
    thisMonth = "January";
  } else if (m == 2) {
    thisMonth = "February";
  } else if (m == 3) {
    thisMonth = "March";
  } else if (m == 4) {
    thisMonth = "April";
  } else if (m == 5) {
    thisMonth = "May";
  } else if (m == 6) {
    thisMonth = "June";
  } else if (m == 7) {
    thisMonth == "July";
  } else if (m == 8) {
    thisMonth = "August";
  } else if (m == 9) {
    thisMonth = "September";
  } else if (m == 10) {
    thisMonth = "October";
  } else if (m == 11) {
    thisMonth = "November";
  } else if (m == 12) {
    thisMonth = "December";
  } else {
    thisMonth = "";
  };


  //display date data
  
  push();
  textSize(14);
  textStyle(BOLD);
  text(thisMonth + " " + (d - 1), cx - 210, 330);
  pop();
  push();
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER);
  text(thisMonth + " " + d, cx, 335);
  pop();
    push();
  textSize(14);
  textStyle(BOLD);
  text(thisMonth + " " + (d + 1), cx + 125, 330);
  pop();
  textStyle(NORMAL);
  //Day of the week using Javascript "getDay()" function
  let dayOW = new Date();
  let n = dayOW.getDay();

  if (n == 0) {
    thisDay = "Sunday,";
  } else if (n == 1) {
    thisDay = "Monday,";
  } else if (n == 2) {
    thisDay = "Tuesday,";
  } else if (n == 3) {
    thisDay = "Wednesday,";
  } else if (n == 4) {
    thisDay = "Thursday,";
  } else if (n == 5) {
    thisDay = "Friday,";
  } else if (n == 6) {
    thisDay = "Saturday,";
  } else {
    thisDay = "";
  };
  push();
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER);
  text(thisDay, cx, 315);
  pop();



  noFill();
  stroke(124, 252, 0, 160);
  strokeWeight(5);
  //rect is x, y, w, h
  rect(cx, 370, 510, 160);
  //previous
  rect(cx-170, 400, 170, 100);
  //current
  rect(cx, 400, 170, 100);
  //next
  rect(cx+170, 400, 170, 100);
  //prevprev
  rect(cx-285, 400, 60, 100);

  //calendar text
  fill(0);
  noStroke();
  push();
  textSize(13);
  //previous day
  //lastDay will be string from array
  let lastDay = "18,520 people received a compliment yesterday! Bet they're feeling good.";
  text(lastDay, cx - 165, 410, 150, 100);
  //current day
  let currentDay = "Refuse any plastic bags you are offered today.";
  text(currentDay, cx+10, 410, 150, 100);
  //next day
	pop();


  

  
  
}

function setup() {
  drawCanvas();
  let h = windowHeight;
  let cx = (windowWidth) / 2;

//   Using the CSV file
//   Row count
//   let rowC = table.getRowCount();

// //Randomize challenge from list
//   let randomNum = random(rowC);


  // let todays = table.getString(1, 'Title');
  // text(todays, cx, 400);


  textAlign(CENTER);

  //Count me In Button
  button = createButton('Count me in');
  button.position(cx - 40, 460);
  button.mousePressed(countMe);


  // Submit ideas form and button
  push();
  textAlign(CENTER);
  textSize(14);
  let idea = "What should we do tomorrow?"
  text(idea, cx, h-75);
  pop();
  input = createInput();
  input.position(cx - 85, h - 65, 200, 50);
  button = createButton('Submit');
  button.position(input.x + input.width, h - 65);
  button.mousePressed(ideas);
  //button.mouseOver(countMe);

  push();
  textAlign(CENTER);
  let copyright = "© Copyright 2017 humandoing"
  text(copyright, cx, h - 25);
  pop();
}

function whyBox() {

}


function showPrev() {
  push();
  textSize(14);
  textStyle(BOLD);
  text(thisMonth + " " + (d - 2), cx-295, 350);
  pop();
}
  

function countMe() {
  let cx = (windowWidth) / 2;
  //super janky way of making a live counter :-/
  fill(190);
  rect(cx-95, 220, 70, 30);
  totalUsers = totalUsers + 1;
  fill(0);
}

function ideas() {
  //send submission to spreadsheet of ideas

}


function windowResized() {
  drawCanvas();
  //change this to simply page reload;
}



function draw() {
  let h = windowHeight;
  let cx = (windowWidth) / 2;
  ////QUESTION:  Can I put the image in setup?
  image(logo, cx - 130, 20, 260, 130);
  image(questionImg, cx + 130, 360, 80, 90);
  image(arrow, cx-310, 345, 50, 130);

  push();
  textSize(26);
  textAlign(CENTER);

  youPower = "Join " + totalUsers + " humans doing good!";
  let numPeople = text(youPower, cx, 230);
  pop();
  textSize(12);

  //fake the live counter for now ;)
  let fc = frameCount;
  if (fc % 100 == 0) {
  countMe();
  }
  
  
//More Info
  push();
  fill(150);
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER);
  //whyQ = text("why", cx - 56, h-70);
  //howQ = text("how", cx, h-70);
  //whereQ = text("where", cx + 56, h-70);
  pop();

  
  
  //MouseOver Info
  
  /////HOW TO MAKE POPUP INFO in P5? :(
  //whyQ.mouseOver(whyBox);
//   push();
//   stroke(4);
//   fill(190);
  //   whyQ.alert(

//   if ((mouseX < cx - 45 && mouseX > cx - 65) && (mouseY > 155 && mouseY < 170)) {
//     //rect(mouseX, mouseY, 100, 100)
//   } else {

//   }
  // pop();
}let cnv, youPower;
let w, h, d, m;
let questionImg, logo, input;
let totalUsers = 2714;
let thisDay, thisMonth, whyhQ, howQ, whereQ;
let table;
let yesterday, today1, tomrorow;


////Load in table
// function preload() {
//   table = loadTable("daily.csv", "csv", "header");
// }
//get why text, current count, yesterday, and today


//Logo Fun --later
var sourceText = "human doing";
var curIndex = 0;


function drawCanvas() {
  let w = windowWidth;
  let h = windowHeight;
  //later use long height to force user to scroll down
  cnv = createCanvas(w, h);
  background(190);
  let cx = (w) / 2;
  // fill(0);

  //Logo tagline
  push();
  textSize(14);
  textAlign(CENTER);
  let tagline = "daily acts of good with exponential impact";
  text(tagline, cx, 170);
  pop();

  //Title text for calendar
  push();
  textAlign(CENTER);
  textSize(18);
  //stroke(100);
  //fill(124, 252, 0, 160);
  textStyle(BOLD);
  today = "TODAY'S GOOD:";
  text(today, cx, 290);
  pop();


        //get current date//
    let d = day();
    let m = month();
    let thisMonth;
    //loop that turns date into words
    if (m == 1) {
      thisMonth = "January";
    } else if (m == 2) {
      thisMonth = "February";
    } else if (m == 3) {
      thisMonth = "March";
    } else if (m == 4) {
      thisMonth = "April";
    } else if (m == 5) {
      thisMonth = "May";
    } else if (m == 6) {
      thisMonth = "June";
    } else if (m == 7) {
      thisMonth == "July";
    } else if (m == 8) {
      thisMonth = "August";
    } else if (m == 9) {
      thisMonth = "September";
    } else if (m == 10) {
      thisMonth = "October";
    } else if (m == 11) {
      thisMonth = "November";
    } else if (m == 12) {
      thisMonth = "December";
    } else {
      thisMonth = "";
    };


    //display date data

    fill(255);
    push();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER);
    let yesterday = thisMonth + " " + (d - 1);
    text(yesterday, cx-170, 330);
    pop();
    push();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER);
    let today1 = thisMonth + " " + d;
    text(today1, cx, 335);
    pop();
    push();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER);
    let tomorrow = thisMonth + " " + (d + 1);
    text(tomorrow, cx + 160, 330);
    pop();
    textStyle(NORMAL);
     fill(0);
    //Day of the week using Javascript "getDay()" function

  let dayOW = new Date();
  let n = dayOW.getDay();

  if (n == 0) {
    thisDay = "Sunday,";
  } else if (n == 1) {
    thisDay = "Monday,";
  } else if (n == 2) {
    thisDay = "Tuesday,";
  } else if (n == 3) {
    thisDay = "Wednesday,";
  } else if (n == 4) {
    thisDay = "Thursday,";
  } else if (n == 5) {
    thisDay = "Friday,";
  } else if (n == 6) {
    thisDay = "Saturday,";
  } else {
    thisDay = "";
  };
  push();
  fill(255);
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER);
  text(thisDay, cx, 320);
  pop();


  // daily challenge
  push();
  textSize(14);
  textAlign(LEFT);
  textStyle(BOLD);
  // textLeading(1);
  // textLeading((mouseY / height) * 24);
  // text("It was the best of times. Such good times.",
  //   100, 100, 200, 200);
  let currentDay = "Refuse all plastic bags you are offered today.";
  currentText = text(currentDay, cx - 70, 360, 150, 100);
  pop();



  //previous day
  //lastDay will be string from array
  push();
  textSize(14);
  textAlign(LEFT);
  let lastDay = "18,520 people received a compliment yesterday! Bet they're feeling good.";
  text(lastDay, cx - 240, 360, 150, 100);
  pop();


  //bottom tag line  
  push();
  textAlign(CENTER);
  textSize(14);
  fill(0);
  let idea = "What good should we do tomorrow?"
  text(idea, cx, h - 75);
  pop();

}

function setup() {
  drawCanvas();
  rectMode(CENTER);

  //fill(0);
  //frameRate(3);
  let h = windowHeight;
  let cx = (windowWidth) / 2;

  //Load in images
  logo = loadImage("human_doing_logo_small.png");
  questionImg = loadImage("question_mark.png");
  arrow = loadImage("Back_Arrow.png");

  //   Using the CSV file
  //   Row count
  //   let rowC = table.getRowCount();

  // //Randomize challenge from list
  //   let randomNum = random(rowC);


  // let todays = table.getString(1, 'Title');
  // text(todays, cx, 400);


  textAlign(CENTER);

  //temp solution
  //Why Button
  whyButton = createButton('WHY?');
  whyButton.position(cx - 22, 460);
  //whyButton.mousePressed(whyBoxP);
  whyButton.mouseOver(whyBox);

  //Count me In Button
  button = createButton('COUNT ME IN');
  button.position(cx - 42, 538);
  button.mousePressed(countMe);


  // Submit ideas form and button
  // push();
  // textAlign(CENTER);
  // textSize(14);
  // fill(0);
  // let idea = "What should we do tomorrow?"
  // text(idea, cx, h - 75);
  // pop();
  input = createInput();
  input.position(cx - 85, h - 65, 200, 50);
  button = createButton('Submit');
  button.position(input.x + input.width, h - 65);
  button.mousePressed(ideas);
  //button.mouseOver(countMe);

  push();
  textAlign(CENTER);
  textSize(12);
  let copyright = "© Copyright 2017 humandoing"
  text(copyright, cx, h - 25);
  pop();




}

function whyBox() {
  let cx = (windowWidth) / 2;
  push();
  textSize(13.5);
  fill(255, 0, 0);
  textAlign(CENTER);
  let whySource = "Every day, the average US household takes home four plastic bags. Plastic bags can take up to 1,000 years to break down, which causes a multitude of enivronmental concerns as well as increases the rate of natural resource consumption.";
  text(whySource, cx, 530, 520, 100);
  pop();
}
//find way to include resources: https://www.nrdc.org/media/2008/080109


// function whyBoxP() {

// createA('http:///www.google.com',,html,[target])
// }


function showPrev() {
  push();
  textSize(14);
  textStyle(BOLD);
  text(thisMonth + " " + (d - 2), cx - 295, 350);
  pop();
}


function countMe() {
  let cx = (windowWidth) / 2;
  //super janky way of making a live counter :-/
  fill(190);
  noStroke();
  rect(cx - 140, 220, 70, 30);
  totalUsers = totalUsers + 1;
  fill(0);


}

function ideas() {
  //send submission to spreadsheet of ideas

}


function mousePressed() {
  //get current date//
  let d = day();
  let m = month();
  let thisMonth;
  //loop that turns date into words
  if (m == 1) {
    thisMonth = "January";
  } else if (m == 2) {
    thisMonth = "February";
  } else if (m == 3) {
    thisMonth = "March";
  } else if (m == 4) {
    thisMonth = "April";
  } else if (m == 5) {
    thisMonth = "May";
  } else if (m == 6) {
    thisMonth = "June";
  } else if (m == 7) {
    thisMonth == "July";
  } else if (m == 8) {
    thisMonth = "August";
  } else if (m == 9) {
    thisMonth = "September";
  } else if (m == 10) {
    thisMonth = "October";
  } else if (m == 11) {
    thisMonth = "November";
  } else if (m == 12) {
    thisMonth = "December";
  } else {
    thisMonth = "";
  };

  let cx = (windowWidth) / 2;
  rectMode();
  // Check if mouse is inside the circle
  var disst = dist(mouseX, mouseY, cx - 275, 400);
  if (disst < 50) {
    // let yesterday = thisMonth + " " + (d - 2);
    // let today1 = thisMonth + " " + (d - 1);
    // let tomorrow = thisMonth + " " + (d);
    //Janky way :-(
    fill(190);
    noStroke();
    rect(cx, 320, 520, 40);
    fill(255);
    push();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER);
    let yesterday = thisMonth + " " + (d - 2);

    text(yesterday, cx - 170, 330);
    pop();
    push();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER);
    let today1 = thisMonth + " " + (d - 1);

    text(today1, cx, 330);
    pop();
    push();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER);
    let tomorrow = thisMonth + " " + (d);

    text(tomorrow, cx + 160, 330);
    pop();
    textStyle(NORMAL);
    fill(0);


  }
}


function windowResized() {
  drawCanvas();
  //Eventually change this to simply page reload;
}



function draw() {
  let h = windowHeight;
  let cx = (windowWidth) / 2;
  //background(190);
  //Display images
  image(logo, cx - 130, 20, 260, 130);
  image(questionImg, cx + 130, 360, 80, 90);
  image(arrow, cx - 310, 345, 50, 130);


  //Human doing counter and text
  push();
  textSize(26);
  textAlign(CENTER);
  textStyle(NORMAL);
  youPower = "Join " + totalUsers + " humans doing good together";
  let numPeople = text(youPower, cx, 230);
  pop();


//   //get current date//
//   let d = day();
//   let m = month();
//   let thisMonth;
//   //loop that turns date into words
//   if (m == 1) {
//     thisMonth = "January";
//   } else if (m == 2) {
//     thisMonth = "February";
//   } else if (m == 3) {
//     thisMonth = "March";
//   } else if (m == 4) {
//     thisMonth = "April";
//   } else if (m == 5) {
//     thisMonth = "May";
//   } else if (m == 6) {
//     thisMonth = "June";
//   } else if (m == 7) {
//     thisMonth == "July";
//   } else if (m == 8) {
//     thisMonth = "August";
//   } else if (m == 9) {
//     thisMonth = "September";
//   } else if (m == 10) {
//     thisMonth = "October";
//   } else if (m == 11) {
//     thisMonth = "November";
//   } else if (m == 12) {
//     thisMonth = "December";
//   } else {
//     thisMonth = "";
//   };


//   //display date data

//   fill(255);
//   push();
//   textSize(14);
//   textStyle(BOLD);
//   textAlign(CENTER);
//   let yesterday = thisMonth + " " + (d - 1);
//   text(yesterday, cx - 170, 330);
//   pop();
//   push();
//   textSize(14);
//   textStyle(BOLD);
//   textAlign(CENTER);
//   let today1 = thisMonth + " " + d;
//   text(today1, cx, 335);
//   pop();
//   push();
//   textSize(14);
//   textStyle(BOLD);
//   textAlign(CENTER);
//   let tomorrow = thisMonth + " " + (d + 1);
//   text(tomorrow, cx + 160, 330);
//   pop();

  textStyle(NORMAL);
  fill(0);
  textSize(12);

  //fake the live counter for now ;)
  let fc = frameCount;
  if (fc % 180 == 0) {
    countMe();
  }



  push();
  noFill();
  stroke(124, 252, 0, 100);
  strokeWeight(5);
  //rect is x, y, w, h
  //rect(cx, 375, 510, 30);
  //previous
  rect(cx - 170, 400, 170, 100);
  //current
  rect(cx, 400, 170, 100);
  //next
  rect(cx + 170, 400, 170, 100);
  //prevprev
  //rect(cx - 285, 400, 60, 100);
  pop();


  // //animate daily challenge
  // push();
  // textSize(19);
  // textAlign(LEFT);
  // textLeading(1);
  // textLeading((mouseY / height) * 24);
  // // text("It was the best of times. Such good times.",
  // //   100, 100, 200, 200);
  // let currentDay = "Refuse all plastic bags you are offered today.";
  // currentText = text(currentDay, cx, 400, 150, 80);
  // pop();



  //LOGO fun

  //     push();
  //     textSize(140);
  //     textAlign(CENTER);
  //   fill(190);
  //   rect(cx, 85, 260,150);
  //       fill(0);

  //     text(
  //       sourceText.substring(curIndex, curIndex + 1),
  //       width / 2, 120);
  //     curIndex++;
  //     if (curIndex > sourceText.length) {
  //       curIndex = 0;
  //     }
  //     pop();



}let video;

function setup() {
  createCanvas(640, 480);
  background(0);
  video = createCapture(VIDEO);
  video.size(160, 120);
  video.hide();
  background(0);
}

function draw() {
  // Show video

  //tint(200, 90);
  //pixelDensity(1);
  push();
  fill(200, 0, 0, 10);
  rect(0, 0, 640, 480);
  pop();
  //optional larger video style?
  ////image(video, 0, 0, width / 2, height / 2);

  //row 1, column 1
  image(video, 0, 0, 0, 0);
  
  //row 1, column 2
  push();
  translate(320, 0);
  scale(-1.0, 1.0);
  image(video, 0, 0);
  pop();
  
  //row 1, column 3
  image(video, 320, 0, 0, 0);
  
  //row 1, column 4
  push();
  translate(640, 0);
  scale(-1.0, 1.0);
  image(video, 0, 0);
  pop();
  
  //row 2, column 1
  push();
  rotate(PI);
  translate(-160, -240);
  scale(-1.0, 1.0);
  image(video, -160, 0);
  pop();
  
  //row 2, column 2
  push();
  rotate(PI);
  translate(-320, -240);
  //scale(-1.0, 1.0);
  image(video, 0, 0);
  pop();
  
  //row 2, column 3
  push();
  rotate(PI);
  translate(-480, -240);
  scale(-1.0, 1.0);
  image(video, -160, 0);
  pop();
  
  //row 2, column 4
  push();
  rotate(PI);
  translate(-640, -240);
  //scale(-1.0, 1.0);
  image(video, 0, 0);
  pop();
    
  //row 3, column 1
  image(video, 0, 240, 0, 0);
  
  //row 3, column 2
  push();
  translate(320, 240);
  scale(-1.0, 1.0);
  image(video, 0, 0);
  pop();
  
  //row 3, column 3
  image(video, 320, 240, 0, 0);
  
  //row 3, column 4
  push();
  translate(640, 240);
  scale(-1.0, 1.0);
  image(video, 0, 0);
  pop();
  
  //row 4, column 1
  push();
  rotate(PI);
  translate(-160, -240);
  scale(-1.0, 1.0);
  image(video, -160, -240);
  pop();
  
  //row 4, column 2
  push();
  rotate(PI);
  translate(-320, -240);
  //scale(-1.0, 1.0);
  image(video, 0, -240);
  pop();
  
  //row 4, column 3
  push();
  rotate(PI);
  translate(-480, -240);
  scale(-1.0, 1.0);
  image(video, -160, -240);
  pop();
  
  //row 4, column 4
  push();
  rotate(PI);
  translate(-640, -240);
  //scale(-1.0, 1.0);
  image(video, 0, -240);
  pop();

}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}var n = 4; //change for number of pics
var imgMask = [n];
var img = [n];
var imgR1, imgR2, imgR3, imgR4, imgR5;
var angle = 0;
var r1, r2, r3, r4, r5;

function preload() {
  for (var i = 0; i <= n; i++) {
    img[i] = loadImage(i + ".png");
  }
  for (var j = 0; j <= n; j++) {
    imgMask[j] = loadImage("mask.png");
  }
}

function setup() {
  //createCanvas(1024, 648);
  createCanvas(windowWidth, windowHeight);

  imgR1 = int(random(n));
  imgR2 = int(random(n));
  imgR3 = int(random(n));
  imgR4 = int(random(n));
  imgR5 = int(random(n));

  img[imgR1].mask(imgMask[int(random(n))]);
  img[imgR2].mask(imgMask[int(random(n))]);
  img[imgR3].mask(imgMask[int(random(n))]);
  img[imgR4].mask(imgMask[int(random(n))]);
  img[imgR5].mask(imgMask[int(random(n))]);

  imageMode(CENTER);

  r1 = random(-1.2, 1.2);
  r2 = random(-1.2, 1.2);
  r3 = random(-1.2, 1.2);
  r4 = random(-1.2, 1.2);
  r5 = random(-1.2, 1.2);
}

function draw() {
  //background(100, 100);
  translate(width / 2, height / 2);

  var w = (width * 1.5);
  var h = (width * 1.5);

  rotate(radians(angle*r1));
  image(img[imgR1], 0, 0, w, h);

  rotate(radians(angle*r2));
  image(img[imgR2], 0, 0, w, h);

  rotate(radians(angle*r3));
  image(img[imgR3], 0, 0, w, h);

  rotate(radians(angle*r4));
  image(img[imgR4], 0, 0, w, h);

  //rotate(radians(angle*r5));
  //image(img[imgR5], 0, 0, w, h);

  angle++;
}

function mousePressed() {
  setup();
}var video;

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  // The above function actually makes a separate video
  // element on the page.  The line below hides it since we are
  // drawing the video to the canvas
  video.hide();
}

function draw() {
  background(0);
  // Step 5. Display the video image.
  image(video, 0, 0, width, height);
}





// let video;

// function setup() {
//   createCanvas(320,240);
//   background(0);
//   video = createCapture(VIDEO);
//   video.size(320, 240);
//   video.hide();
  
//   mouse = createGraphics(50, 50, RGB);
//   background(255);
// }

// function draw() {
//   // Show video
//   image(video, 0, 0);
  
//   // Dynamically change video size
//   image(video, 0, 0, mouseX, mouseY);
  
//   // Paint video
//   imageMode(CENTER);
//   mouse.copy(video, mouseX, mouseY, 50, 50, 0, 0, 50, 50);
//   tint(255, 10);
//   image(mouse, mouseX, mouseY);  
// }function setup() { 
  createCanvas(400, 400);
  background(255);
  textAlign(LEFT, TOP);
  textSize(24);
  text("Click for ~messages from another world~",
       20, 20, width-40, height-40);
} 

function draw() { 
}

function mousePressed() {
  var grammar = tracery.createGrammar(grammarSource);
  grammar.addModifiers(tracery.baseEngModifiers);
  var output = grammar.flatten("#origin#");
  background(255);
  text(output, 20, 20, width-40, height-40);
}

var grammarSource = {
  "origin": "#interjection.capitalize#, #name#! I'm #profession.a#, not #profession.a#!",
  "interjection": ["alas", "congratulations", "eureka", "fiddlesticks",
    "good grief", "hallelujah", "oops", "rats", "thanks", "whoa", "yes"],
  "name": ["Jim", "John", "Tom", "Steve", "Kevin", "Gary", "George", "Larry"],
  "profession": [
        "accountant",
        "actor",
        "archeologist",
        "astronomer",
        "audiologist",
        "bartender",
        "butcher",
        "carpenter",
        "composer",
        "crossing guard",
        "curator",
        "detective",
        "economist",
        "editor",
        "engineer",
        "epidemiologist",
        "farmer",
        "flight attendant",
        "forest fire prevention specialist",
        "graphic designer",
        "hydrologist",
        "librarian",
        "lifeguard",
        "locksmith",
        "mathematician",
        "middle school teacher",
        "nutritionist",
        "painter",
        "physical therapist",
        "priest",
        "proofreader",
        "rancher",
        "referee",
        "reporter",
        "sailor",
        "sculptor",
        "singer",
        "sociologist",
        "stonemason",
        "surgeon",
        "tailor",
        "taxi driver",
        "teacher assistant",
        "teacher",
        "teller",
        "therapist",
        "tour guide",
        "translator",
        "travel agent",
        "umpire",
        "undertaker",
        "urban planner",
        "veterinarian",
        "web developer",
        "weigher",
        "welder",
        "woodworker",
        "writer",
        "zoologist"
  ]
};let expansion;
var img;
var offset = 10;
var easing = 0.009;
let x, y;

function preload() {
  //iceberg = loadImage("Iceberg.jpg");
  wave = loadImage("wave5.png");

}


var story = {
  "start": ['In the year 2029\n#stanza2#\n#stanza3#\n#stanza4#'],
  "stanza2": ['The sky is crying', 'I am drowning in rising waters', 'It is colder than usual, I dont have a coat', 'Is my smoking breaking the ozone layer?', 'I cannot breathe'],
  "stanza3": ['How the waters covered our homes', 'While the trees cry their leaves', 'Remember when the skies were blue', 'Drowning in the scream of rising seas', 'Air is free for now', 'My lungs inhale dirty air'],
  "stanza4": ['The ice is stone, rock, and forever', 'Now it is melting, moving, breaking, gone', 'Is there hope? In massive corporate change', 'Is there loss? In breaking free of machines']
}
var grammar;

function setup() {
  createCanvas(640, 360);
  img = loadImage("iceberg2.jpg");
  grammar = tracery.createGrammar(story);
  expansion = grammar.flatten('#start#');
  x = width;
  y = height;
  print(expansion);

}

function draw() {
  background(0, 95, 161);

  var dx = (1 - img.width / 30) - offset;
  offset -= dx * easing;
  //let f = 0;
  //
  tint(255, 127); // Display at half opacity
  image(img, 0, offset);

  image(wave, 0, y);
  // Jiggling randomly on the horizontal axis
  x = x + random(-1, 1);
  // Moving up at a constant speed
  y = y - 0.5;

  noStroke();
  fill(0, 100);
  rect(0, 40, 490, 135);
  fill(255);
  textSize(24);
  text(expansion, 10, 70);
}var myMap;
var canvas;
var key = 'pk.eyJ1Ijoic3RlcGhhbmllcmVuZWUiLCJhIjoiY2o4emFtcWMzMmxmdzJybjVscm10d2JpNyJ9.Qd3BWTs0rABe2nH8tBC48A';
var mappa = new Mappa('Leaflet', key);
var travels;
var current = 0;

var options = {
  lat: 18,
  lng: -8,
  zoom: 2,
  style: 'https://api.mapbox.com/styles/v1/stephanierenee/cj8zanp710ihh2rpczfult4qc/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3RlcGhhbmllcmVuZWUiLCJhIjoiY2o4emFtcWMzMmxmdzJybjVscm10d2JpNyJ9.Qd3BWTs0rABe2nH8tBC48A'
}

function preload() {
  travels = loadTable('travels.csv', 'csv', 'header');
}


function setup() {
  canvas = createCanvas(640, 640);
  //background(200);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);


  fill(70, 203, 30);
  stroke(100);
  myMap.onChange(drawPoints);
}

  function mousePressed() {
    
      for (var i = 0; i < travels.getRowCount(); i++) {
    
    
    var latitude = Number(travels.getString(i, 'reclat'));
    var longitude = Number(travels.getString(i, 'reclong'));
    var pos = myMap.latLngToPixel(latitude, longitude);
    ellipse(pos.x, pos.y, 10, 10);
   // myMap.onChange(drawPoints);
   //return false;
}
  }
function draw() {}

function drawPoints() {
  clear();

//   for (var i = 0; i < travels.getRowCount(); i++) {
//     // Get the lat/lng of each meteorite 
    
    
//     var latitude = Number(travels.getString(i, 'reclat'));
//     var longitude = Number(travels.getString(i, 'reclong'));
//     var pos = myMap.latLngToPixel(latitude, longitude);
//     ellipse(pos.x, pos.y, 10, 10);
//     //if (travels[i] 

//   }
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
let fromSerial = 0;

function setup() {
  createCanvas(500,500);
  background(0); 

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
  fill (255, 10)
  noStroke();
  ellipse(fromSerial, mouseY, 10, 10);
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
 var stringFromSerial = serial.readLine();
  if (stringFromSerial.length > 0) {
    var trimmedString = trim(stringFromSerial);
    fromSerial = Number(trimmedString);
    print(fromSerial);
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
}var myMap;
var canvas;
var key = 'pk.eyJ1Ijoic3RlcGhhbmllcmVuZWUiLCJhIjoiY2o4emFtcWMzMmxmdzJybjVscm10d2JpNyJ9.Qd3BWTs0rABe2nH8tBC48A';
var mappa = new Mappa('Leaflet', key);
var travels;
var current = 0;

var options = {
  lat: 18,
  lng: -8,
  zoom: 2,
  style: 'https://api.mapbox.com/styles/v1/stephanierenee/cj8zanp710ihh2rpczfult4qc/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3RlcGhhbmllcmVuZWUiLCJhIjoiY2o4emFtcWMzMmxmdzJybjVscm10d2JpNyJ9.Qd3BWTs0rABe2nH8tBC48A'
}

function preload() {
  travels = loadTable('travels.csv', 'csv', 'header');
}


function setup() {
  canvas = createCanvas(640, 640);
  //background(200);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);


  fill(70, 203, 30);
  stroke(100);
  myMap.onChange(drawPoints);
}

//   function mousePressed() {
    
//       for (var i = 0; i < travels.getRowCount(); i++) {
    
    
//     var latitude = Number(travels.getString(i, 'reclat'));
//     var longitude = Number(travels.getString(i, 'reclong'));
//     var pos = myMap.latLngToPixel(latitude, longitude);
//     ellipse(pos.x, pos.y, 10, 10);
//    // myMap.onChange(drawPoints);
//    //return false;
// }

function draw() {}

function drawPoints() {
  clear();

  for (var i = 0; i < travels.getRowCount(); i++) {
    // Get the lat/lng of each meteorite 
    
    
    var latitude = Number(travels.getString(i, 'reclat'));
    var longitude = Number(travels.getString(i, 'reclong'));
    var pos = myMap.latLngToPixel(latitude, longitude);
    ellipse(pos.x, pos.y, 10, 10);
    //if (travels[i] 

  }
}let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas



function gotData() {
  let currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log(currentString); // println the string
  latestData = currentString; // save it for the draw method
}




function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
  angleMode(DEGREES);
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);
  //Draw sky and ground
  background(102, 204, 255, 70);
  fill(102, 153, 0, 180);
  noStroke();
  rect(0, height*.6, width, height*.6)
}

function draw() {

}

//Generate trees on mouse press
function mousePressed() {
  //ref = new Tree(x, y, numB, tall, leaf) 
  tree = new Tree(100, 100, random(3, 8), random(150,300), 10);
  tree.build();
}let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas


function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1421");
  serial.on('data', gotData);

} 

function gotData() {
  let currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log(currentString); // println the string
  latestData = currentString; // save it for the draw method
}




function draw() { 
  //background(127, 0, 127);
  
  let string = "Breath rate:";
  //var v = map(latestData, 0, 1023, 0, 20); 
	fill(255);
  text(string, 20, 20);
  text(latestData, 50,50);
  
  //text("Breathe in by expanding your stomach", 50,50);
  //text("Exhale, slowly let the breath go", 50,50);
    

        
    // <div id="steps">   
    // 	<p id="step1"> </p>
    // 	<p id="step2"> </p>
    //   <p id="step1"> Breathe in by releasing your shoulders down</p>
    //   <p id="step2"> Breathe out, relax</p>
    //   <p id="step1"> Breathe in by expanding your chest out </p>
    //   <p id="step2"> Let the breath go </p>
    //   <p id="step2"> Now turn to focus on the plant, allowing your gaze to stay and use the lights to guide your breath exchange with the plant</p>
    // </div>
    
  
  
  //var v = mouseX; 
  
  
  
//   //var origV = v;


//   // Left Eye
//   ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

//   // Right Eye
//   ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
//   // Nose
//   v+=random(-5, 5);
//   bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);

//   // Mouth

//   bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
// }
}let str = "A string walks into a bar and orders a drink. The baretender says we don't serve strings here and you're a string."
let segments = [];


function setup() { 
  createCanvas(800, 800);
  ////Will separate the string by WORD
  //segments = splitTokens(str);
  ////Will separate the string by SENTENCE
  segments = trim(str.split("s"));
  ////Will separate the stirng by LINE
  // segements = loadStrings("text.txt", function(){
  //   console.log(segments);
  // });
} 

function draw() { 
  background(220);
  let h = 0;
  let x = 0;
	for (let i = 0; i < segments.length; i++) {
    textSize (i*10 + 10);
    h += textAscent() + textDescent();
    text(segments[i], x, h);
    x += textWidth(segments[i]);

  }

}let a = 10;
let b = 20;


function setup() { 
  createCanvas(400, 400);
  
} 

function sum(a, b) {
  return a + b;
}


function draw() { 
  background(220);
  let c = sum(12,4);
  console.log(a + " " + "+" + " " + b + " " + "=" + " " + sum(a,b));

}let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas


function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);

} 

function gotData() {
  let currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log(currentString); // println the string
  latestData = currentString; // save it for the draw method
}




function draw() { 
  background(127, 0, 127);
  
  //var v = mouseX; 
  
  var v = map(latestData, 50, 1023, 0, width); 
  //var origV = v;


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
var intro;


function setup() {
  //canvas = createCanvas(200, 200);
  intro = createP("Begin the meditation by becoming fully aware of your breath");
  intro.style("background-color", "blue");
}

function draw() { 
  background(220);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
  angleMode(DEGREES);
  //Draw sky and ground
  background(102, 204, 255, 70);
  fill(102, 153, 0, 180);
  noStroke();
  rect(0, height*.6, width, height*.6)
}

function draw() {

}

//Generate trees on mouse press
function mousePressed() {
  //ref = new Tree(x, y, numB, tall, leaf) 
  tree = new Tree(100, 100, random(3, 8), random(150,300), 10);
  tree.build();
}let balls = [];

function setup() {
  createCanvas(600,600);
  for (let i=0; i < 30; i++) {
  balls.push(new Ball(random(width), random(height), random(-3,3), 2, random(10,30)));
   }
  }
             
function draw() {
  background(10);
	// background(0);
  for (let i=0; i < balls.length; i++) {
    balls[i].run();
    for (let j=0; j < balls.length; j++) {
      //Make sure i isn't j, otherwise, they would all be comparing themselves with themselves
      if (i != j && balls[i].isNear(balls[j]) ) {
        //remove ball from array
        balls.splice(i,1);
        //in case the array position deleted is filled by the 'other' ball
        if (i < j) j--;
        balls.splice(j,1);
        break;
      }
    }
  }
}


function bounce(loc, speed, bottom, top) {
    if (loc < bottom || loc > top) {
      speed *= -1;
    }
    return speed;
};let balls = [];

function setup() {
  createCanvas(600,600);
  frameRate(20);
  for (let i=0; i < 100; i++) {
  balls.push(new Ball(random(width), random(height), random(-3,3), 1, random(10,20)));
   }
  }
             
function draw() {
  background(255);
	// background(0);
  for (let i=0; i < balls.length; i++) {
    balls[i].run();
    for (let j=0; j < balls.length; j++) {
      if (i != j && balls[i].isNear(balls[j]) ) {
        balls[i].turnRed();
        balls[j].turnRed();
      }
    }
  }
}


function bounce(loc, speed, bottom, top) {
    if (loc < bottom || loc > top) {
      speed *= -1;
    }
    return speed;
};let balls = [];

function setup() {
  createCanvas(600,600);
  for (let i=0; i < 300; i++) {
  balls.push(new Ball(random(width), random(height), random(-3,3), 1, random(2,6)));
   }
  }
             
function draw() {
  background(0);
  for (let i=0; i < balls.length; i++) {
    balls[i].run();
    for (let j=0; j < balls.length; j++) {
      if (i != j) {
      if (balls[i].isNear(balls[j])) {
        balls[i].turnRed();
        balls[j].turnRed();
      } 
      }
    }
   }
}


function bounce(loc, speed, bottom, top) {
    if (loc < bottom || loc > top) {
      speed *= -1;
    }
    return speed;
};let balls = [];

function setup() {
  createCanvas(400,400);
  for (let i=0; i < 400; i++) {
    fill(255);
  balls.push(new Ball(random(width), random(height), random(-3,3), 1, random(1,10)));
  }
  // balls.push(new Ball(width/2, height/2, 1, 2, 50));
  // balls.push(new Ball(width, height, 1, -1, 50));

  }
  // ball3 = new Ball(width/2, height/2, 10, 1, 50);
             
function draw() {
  background(220);
  for (let i=1; i < balls.length; i++) {
     balls[i].run();
     balls[i].isNear(balls[i-1]);
   }
  balls[0].display();
  balls[1].display();
}
    

function bounce(loc, speed, bottom, top) {
    if (loc < bottom || loc > top) {
      speed *= -1;
    }
    return speed;
};let positions = [];

function setup() { 
  createCanvas(600, 600);
  colorMode(RGB);
  //rectMode(CENTER);
} 

function draw() { 
  background(229, 186, 48);
  noStroke();
  fill(121,41,133);
  rect(0,0,500, 500);
  fill(169,203, 140);
  triangle(0,height, 50, height-50, 100, height);
  fill(112,170,66);
  triangle(100,height, 150, height-50, 200, height);
  fill(169,203, 140);
  triangle(200,height, 250, height-50, 300, height);
  fill(112,170,66);
  triangle(300,height, 350, height-50, 400, height);
  fill(169,203, 140);
  triangle(400,height, 450, height-50, 500, height);
  fill(112,170,66);
  triangle(500,height, 550, height-50, 600, height);
  fill(169,203, 140);
  triangle(width,height, width-50, height-50, width, height-100);
  fill(112,170,66);
  triangle(width,height-100, width-50, height-150, width, height-200);
  fill(169,203, 140);
  triangle(width,height-200, width-50, height-250, width, height-300);
  fill(112,170,66);
  triangle(width,height-300, width-50, height-350, width, height-400);
  fill(169,203, 140);
  triangle(width,height-400, width-50, height-450, width, height-500);
  fill(112,170,66);
  triangle(width,height-500, width-50, height-550, width, height-600);
  fill(169,203, 140);
  triangle(width-100,0, width-50, 50, width, 0);
  fill(112,170,66);
  triangle(0,height-100, 50, height-50, 0, height);

  
  fill(169,203, 140);
  triangle(0,80, 0, 0, 80, 0);
  
  

  
  //push() is a function and you are entering an object with {}
  positions.push({x: mouseX, y: mouseY});
  
  //can use shift or splice....
  if(positions.length > 50) positions.shift();
  
  for (let i=0; i < positions.length; i++) {
    let x = positions[i].x;
    let y = positions[i].y;
    fill(242);
    noStroke();
    ellipse(x, y, i/4, i/4);
  }
}let a = 0;
let r = 3;

// Variables
let count = 0;
let angle = 0;

let col = {
  h: 0,
  s: 0,
  b: 0
}


function setup() { 
  createCanvas(windowWidth, windowHeight);
  //randomized background shade of grey
  let z = random(0, 255);
    colorMode(RGB);

  background(114, 170, 57);
	//frameRate(25);
  colorMode(RGB);
  //Toggling this ON will turn the spiral into a mandala
  angleMode(DEGREES);
  frameRate(120);
}

function draw() { 

  // Increment count and angle
  // Next five lines I got from Dan Shiffman's code
  //this changes the tightness of the spiral
  var increment = 16;
  //As I understand 360*/137.5 = 2.618 which is 1 + golden ratio
  var angleChange = 137.5;
  //These next two lines I don't understand
  var r = sqrt(count);
  count = count + increment;
  //angle used for cosine and sine is progressively growing as the circumfrence grows 
  angle += angleChange;
  // I learned about these next four lines from code by Jenil Gogari @jgog
  let x = r * -cos(angle);
  let y = r * sin(angle);

  a += 0.19;
  r += 1;
  
  //position in center
  translate(width/2, height/2);
  //parameters around strokweweight
  //let w = map(mouseY, 0, height, 1, 4);
  strokeWeight(2);
	//parameters for mouse movement = hue
  //interactive colors change with mouse movement
  purple = (116, 42, 124);
  green = (114, 170, 57);
  yellow = (189, 175, 63);
  col.h = map(mouseX, 0, width, 0, 255);
  stroke(189, 175, 63);
  fill(116, 42, 124);
  ellipse(x, y, 10, 10);
}

let positions = [];

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  
  //push() is a function and you are entering an object with {}
  positions.push({x: mouseX, y: mouseY});
  
  //can use shift or splice....
  if(positions.length > 50) positions.shift();
  
  for (let i=0; i < positions.length; i++) {
    let x = positions[i].x;
    let y = positions[i].y;
    ellipse(x, y, i/5, i/5);
  }
}var Slider = function(x, y, buttonX, maxValue) {

	this.x = x;
	this.y = y;
	this.l = 100;
	this.buttonX = this.x + buttonX;
	this.radius = 30;
	this.maxValue = maxValue;

	this.checkDragging = function() {
		if (mouseIsPressed && this.contains()) {
			this.buttonX = mouseX;
		}
	}

	this.contains = function() {
		var d = dist(mouseX, mouseY, this.buttonX, this.y);
		if (d < this.radius / 2) {
			return true;
		} else {
			return false;
		}
	}

	this.display = function() {
		this.buttonX = constrain(this.buttonX, this.x, this.x + this.l)
		push();
		strokeWeight(3);
		line(this.x, this.y, this.x + this.l, this.y);
		pop();
		ellipse(this.buttonX, this.y, this.radius, this.radius);
	}

	this.getValue = function() {
		var relX = this.buttonX - this.x;
		return int(map(relX, 0, this.l, 0, this.maxValue));
	}
}

var sliders;


function setup() {

	createCanvas(500, 500);
	colorMode(HSB, 255, 255, 255);

	sliders = [
		new Slider(width / 2 - (width / 4), height - 100, 50, 255),
		new Slider(width / 2 + (width / 5), height - 100, 50, 10),
	];

}


function draw() {
	background(160, 160, 200);

	for (var i = 0; i < sliders.length; i++) {
		sliders[i].checkDragging()
		sliders[i].display();
		sliders[i].getValue();

	}

	for (i = 0; i < sliders[1].getValue(); i++) {
		var margin = 400;
		var offset = ((width - margin * 2) / sliders[1].getValue()) / 2;
		xPos = margin + (((width - margin * 2) / sliders[1].getValue()) * i) + offset;
		push()
		fill(sliders[0].getValue(), 150, 255)
		ellipse(xPos, height / 3, 50, 50)
		pop();
	}
}let balls = [];

function setup() {
  createCanvas(400,400);
  for (let i=0; i < 400; i++) {
    fill(255);
  balls.push(new Ball(random(width), random(height), random(-5,5), 1, random(1,10)));
  }
  }
  // ball = new Ball(width/2, height/2, 3, 2, 100);
  // ball2 = new Ball(width/2, height/2, 4, -1, 20);
  // ball3 = new Ball(width/2, height/2, 10, 1, 50);
             
function draw() {
  background(220);
  for (let i=0; i < balls.length; i++) {
    balls[i].run();
    // balls[i].isNear(balls[i-1]);
  }
}
    

function bounce(loc, speed, bottom, top) {
    if (loc < bottom || loc > top) {
      speed *= -1;
    }
    return speed;
};//Setup universal variables using two objects

var ball = {
	x : 0,
	y : 0,
	xspeed : 1,
	yspeed : 10
}

var ball2 = {
	x : 0,
	y : 0,
	xspeed : 10,
	yspeed : 1
}
  

//setup canvas
function setup() { 
  createCanvas(600, 600);
  ball.x = width / 2;
  ball.y = height / 2;
  ball2.x = width / 2;
  ball2.y = height / 2;
} 
  

function bounce(ball) {
    if (loc < bottom || loc > top) {
      speed *= -1;
    }
    return speed;
}





  
  
  bounce: function(loc, this.speed, this.bottom, this.top) {
    if (this.loc < this.bottom || this.loc > this.top) {
      this.speed *= -1; 
    }
    return this.speed;
},
};


//draw background, ball, and call function
function draw() { 
  background(220); 
  // xspeed = ball.bounce(x, xspeed, 0, width); 
  // yspeed = ball.bounce(y, yspeed, 0, height);
  
  xspeed = ball.bounce(); 
  yspeed = ball.bounce();
  
  x += xspeed;
  y += yspeed;

  ellipse(x, y, 50, 50);
  
  //ball.bounce();

}





//   xspeed = bounce(x, xspeed, 0, width);
//   yspeed = bounce(y, yspeed, 0, height);
  
//   x += xspeed;
//   y += yspeed;
  
//   ellipse(x, y, 50, 50);


// function setup() { 
//   createCanvas(400, 400);
// } 

// function draw() { 
//   background(220);
// }


//Setup universal variables
let x1, y1, xspeed1, yspeed1;
let x2, y2, xspeed2, yspeed2;

//setup canvas
function setup() { 
  createCanvas(600, 600);
  x1 = width / 2;
  y1 = height / 2;
  xspeed1 = 2;
  yspeed1 = 8;
  x2 = width / 4;
  y2 = height / 4;
  xspeed2 = 2;
  yspeed2 = 6;
} 

//draw background, and call functions
function draw() { 
  background(220);
  let newValues = update(x1,y1,xspeed1,yspeed1);
  x1 = newValues.x;
  y1 = newValues.y;
  display(x1, y1);
  update(x2,y2,xspeed2,yspeed2);
  display(x2,y2);

}

/////update function
function update(x,y,xspeed,yspeed) {
  xspeed = bounce(x, xspeed, 0, width);
  x += xspeed;

  yspeed = bounce(y, yspeed, 0, height);
  y += yspeed;
  //return x, y; <---???
  return { x: x, y: y, xspeed:xspeed, yspeed: yspeed};
}


/////bounce function
function bounce(loc, speed, bottom, top) {
    if (loc < bottom || loc > top) {
      speed *= -1;
    }
    return speed;
}


/////display function
function display(x, y) {
  	noStroke();
    ellipse(x, y, 40, 40);
}

//Random universal variables - not necessary? 
// let x;
// let y;
let w;
let h;
// let x2;
// let y2;
let r;
let b;
let g;


function setup() {
  createCanvas(700, 500);
  rectMode(CENTER);
  colorMode(RGB);
  frameRate(30);
  background(220);
  w = width;
  h = height;
}


var weave = {
  x: 0,
  y: 0,

  roll: function() {
    this.x = random(w);
    this.y = random(h);
    this.x2 = random(w);
    this.y2 = random(h);
  },

  make: function() {
    weave.roll();
    line(0, this.y, this.x, 0);
    weave.roll();
    line(w, this.y, this.x, h);
    weave.roll();
    line(this.x, 0, this.x2, h);
    line(0, this.y, w, this.y2);
  }
}

// var memories = {
//   fill(255);
//   ellipse(mouseX, mouseY, d, d);
// }

function draw() {
  strokeWeight(.5);
  r = mouseX;
  //g = 
  b = mouseY;
  stroke(r, 0, b);
  for (i=0; i < 1; i++) {
    weave.make();
}
}

function mousePressed() {
  noStroke();
  d = random(10, 100);
//turn into function:
  fill(255);
  ellipse(mouseX, mouseY, d, d);
  // fill(240);
  // ellipse(mouseX, mouseY, d+5, d+5);
  // fill(230);
  // ellipse(mouseX, mouseY, d+10, d+10);
  // fill(220);
  // ellipse(mouseX, mouseY, d+15, d+15);
  
}

// 10print.org
// Animated version of 10 print.

var x = 0;
var y = 0;

function setup() {
  createCanvas(640, 360);
  background(255);
}

function draw() {
  if (random(1) > 0.5) {
    line(x, y, x+20, y+20);
  } 
  else {
    line(x, y+20, x+20, y);
  }

  x += 20;
  if (x > width) {
    x = 0;
    y += 20;
  }

  if (y > height) {
    background(255);
    x = 0;
    y = 0;
  }
}//Setup universal variables
let x;
let y;
let xspeed = 1;
let yspeed = 10;

//bounce function
function bounce(loc, speed, bottom, top) {
    if (loc < bottom || loc > top) {
      speed *= -1;
    }
    return speed;
}

//setup canvas
function setup() { 
  createCanvas(600, 600);
  x = width / 2;
  y = height / 2;
} 

//draw background, ball, and call function
function draw() { 
  background(220);
  
  xspeed = bounce(x, xspeed, 0, width);
  yspeed = bounce(y, yspeed, 0, height);
  
  x += xspeed;
  y += yspeed;
  
  ellipse(x, y, 50, 50);
}

let x;
let y;
let col;
let a = 0;
let state = false;
let w;
let h;
let d;
let speed = 0.3;
let p;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas(800, 600);
  w=width/2;
  h=height/2;
  rectMode(CENTER);
  //angleMode(DEGREES);
  background(116, 42, 124, 100);
  //frameRate(25);
  x = 0;
  y = 0;
  col = 0;
  p = height/2;
  
}



function draw() {
  //let deg = PI;
  //let rad = radians(deg);
  purple = (116, 42, 124);
  green = (114, 170, 57);
  yellow = (189, 175, 63);
  
  push();
  fill(189, 175, 63, 70);
  stroke(114, 170, 57, 150);
  strokeWeight(1);
  translate(w, h);
  rotate(a++);
  rect(x, y, 15, 15);
  x = x + speed
  y = x + speed
  
  if (x > 100 || x < 0) {
   speed = speed * -1; 
  }
  
  
  //stroke weight changes
  //NEEDS FIX -- getting stuck in loop and not reversing
  if (col == 255) {
    col -= 1;
  } else {
     col += 1;
  }
  pop();
  fill(220);
  strokeWeight(0.00005);
  //ellipse(w, h, 40, 40);


  //   if (state) {
  // 		background(220);
  //     rect(x, y, 50, 50);
  //   	x -= 1;
  //   	y -= 1;

  //   } else {
  //     //do this thing
  //   }

  if (mouseX > (w - 20) && mouseX < (w + 20)) {
    if (mouseY > (h - 20) && mouseY < (h + 20)) {
      stroke(220);
      strokeWeight(30); 
      push();
      //fill(300);
      ellipse(w, h, 40, 40);
      fill(0);
      pop();
    }
  }
      
}

//QUESTION - how to keep the drawing and only change background?
  function mousePressed() {
  d = dist(mouseX, mouseY, w, h);
  if (d < 20) {
    // Pick new random background
    background(random(0,255));
  }      
  }




  // int passedMillis = millis() - time; // calculates passed milliseconds
  // if(passedMillis >= 215){
  //     time = millis();
  //     fill(255,0,0);  // if more than 215 milliseconds passed set fill color to red
  // }
  
  //col=map (mouseX,0,400,150,255);
  //background(col,m/4,n);    
  
  
  
//   if (mouseX > 400) {
//     state = !state;
//   }




//   var h = 10;
//   if (state) {
//     background(0,0) && fill(h+random(110,250),h+random(150,250),h+random(180,250));
//   } else {
//     background(255,0) && fill(h+random(110,250),h+random(150,250),h+random(180,250));
//   }let numCol;
let numRow;
let cw;
let ch;
let rw;
let rh;


function setup() { 
  createCanvas(windowWidth, windowHeight);
  numCol = 10;
  numRow = 5;
  cw = width/numCol;
  ch = height;
  rw = width;
  rh = height/numRow;
} 

function draw() { 
  background(220);
  /////////My way
  // for (let cn = 0; cn < numCol; cn++) {
  //   noFill();
  //   let x = cn*cw;
  //   let y = 0;
  //   rect(x,y,cw,ch);}
  // for (let rn = 0; rn < numRow; rn++) {
  //   noFill();
  //   let x = 0;
  //   let y = rh*rn;
  //   rect(x,y,rw,rh);}
  /////////Mimi way
  for (let cn = 0; cn < numCol; cn++) {
    // if (cn%2 == 0) {
    //   fill(0,0,255);}
    // else {
    //   noFill();}
    let x = cn*cw;
    for (let rn = 0; rn <numRow; rn++) {
    let y = rn*rh;
    rect(x,y,cw,ch);
    }
  }
  
}

var x = 0;
var y = 0;
var a = 200;
var b = 200;
var d = 90;
var state = false;
var mic;
//var s = second();
var A = 20;


function setup() {
  createCanvas(400, 400);
  background(255);
  mic = new p5.AudioIn();
  mic.start();
    
}

function draw() {

  var vol = mic.getLevel();
  micLevel = mic.getLevel();
  var h = map(vol*20, 1, 10, 6, 50);
  
  
  ellipse(a,b,d+(h+=1),d+(h+=1));
  ellipse(a,b-130,d/2+(h+=2),d/2+(h+=2));
  ellipse(a,b+130,d/2+(h+=2),d/2+(h+=2));
  ///////
if (state) {
    background(0,0) && fill(h+random(110,250),h+random(150,250),h+random(180,250));
  } else {
    background(255,0) && fill(h+random(110,250),h+random(150,250),h+random(180,250));
  }
    
  ////
  
  /*function (mouseIPressed) 
  if(dist(mouseX, mouseY, a, b) < d/2) {
    state = !state && stroke(250,200,40)}
  */
  
  ///////
  if(mouseX > 400 && mouseX < 200 && mouseY >400 && mouseY > 200) {fill(h+200)}
  //fill(h+20,h+200,h+100);
  
  
  //LOCATION OF MOUSE ON SCREEN CHANGING COLORS
  
  if(mouseX > 250) { background(random(200,255), random(100,255), random(50,255),100)}
  else {background(120, 248, 250,10);} 
  
  if(mouseX > 100 && mouseX <250 ) {background(random(200,255), 20) && stroke (255);}
  else {background(200, 180, 220,1) && stroke(0);}
  
  
  if (random(-10) > -3) {
    line(x, y, x+20, y+20) && strokeWeight(4);
  } 
  else {
    line(x, y+20, x+20, y);
  }
  
///BUTTON CLICK
  
  if((mouseIsPressed) && dist(mouseX, mouseY, a, b) < (d/2) ) {background(0,10) && strokeWeight(h+=10);}
  
  if((mouseIsPressed) && dist(mouseX, mouseY, a, b+130) < (d/2) ) {background(0,10);}
  
  if((mouseIsPressed) && dist(mouseX, mouseY, a, b-130) < (d/2) ) {background(0,10) && strokeWeight(s+=10);}

  
  //////////
  x += 20;
  if (x > width) {
    x = 0;
    y += 20;
  }

  if (y > height) {
    background(255);
    x = 0;
    y = 0;
  }
}let w;
let h;

var Slider = function(x, y, buttonX, maxValue) {

  this.x = x;
  this.y = y;
  this.l = 100;
  this.buttonX = this.x + buttonX;
  this.radius = 30;
  this.maxValue = maxValue;

  this.checkDragging = function() {
    if (mouseIsPressed && this.contains()) {
      this.buttonX = mouseX;
    }
  }

  this.contains = function() {
    var d = dist(mouseX, mouseY, this.buttonX, this.y);
    if (d < this.radius / 2) {
      return true;
    } else {
      return false;
    }
  }

  this.display = function() {
    this.buttonX = constrain(this.buttonX, this.x, this.x + this.l)
    push();
    strokeWeight(3);
    line(this.x, this.y, this.x + this.l, this.y);
    pop();
    ellipse(this.buttonX, this.y, this.radius, this.radius);
  }

  this.getValue = function() {
    var relX = this.buttonX - this.x;
    return int(map(relX, 0, this.l, 0, this.maxValue));
  }




}

var sliders;


function setup() {

  createCanvas(500, 500);
  colorMode(HSB, 255, 255, 255);
  w = width / 2;
  h = height / 2;

  sliders = [
    new Slider(width / 2 - (width / 4), height - 100, 50, 255),
    new Slider(width / 2 + (width / 12), height - 100, 50, 10),
  ];

}


function draw() {
  background(160, 160, 200);

  for (var i = 0; i < sliders.length; i++) {
    sliders[i].checkDragging()
    sliders[i].display();
    sliders[i].getValue();

  }

  for (i = 0; i < sliders[1].getValue(); i++) {
    var margin = 400;
    var offset = ((width - margin * 2) / sliders[1].getValue()) / 2;
    xPos = margin + (((width - margin * 2) / sliders[1].getValue()) * i) + offset;
////////////STEPH/////////////////////////

    if ((mouseIsPressed) && dist(mouseX, mouseY, width / 4 + 60, height - 100) < (50)) {
      strokeWeight(3);
      stroke(255);
      fill(random(110, 250), random(150, 250), random(180, 250));
    } else {
      stroke(0);
      strokeWeight(1);
      fill(255);
    }

    if ((mouseIsPressed) && dist(mouseX, mouseY, width / 12*7 + 70, height - 100) < (70)) {
      strokeWeight(random(3, 10));
    }
/////////////////////////////////////


    push()

    fill(sliders[0].getValue(), 150, 255)
    ellipse(xPos, height / 3, 50, 50)
    pop();

  }
}let x;
let y;
let col;
let a = 0;
let state = false;
let w;
let h;
let d;
let speed = 0.3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas(800, 600);
  w=width/2;
  h=height/2;
  rectMode(CENTER);
  //angleMode(DEGREES);
  background(220);
  //frameRate(25);
  x = 0;
  y = 0;
  col = 0;
}



function draw() {
  //let deg = PI;
  //let rad = radians(deg);

  push();
  noFill();
  stroke(col);
  strokeWeight(1);
  translate(w, h);
  rotate(a++);
  rect(x, y, 20, 20);
  x = x + speed;
  y = y + speed;
  
  if (x > 200 || x < 0) {
   speed = speed * -1; 
  }
  
  //stroke weight changes
  //NEEDS FIX -- getting stuck in loop and not reversing
  if (col < 255 || col > 0) {
    col = col * -1;
  } else {
    col = col += 1;
  }
  pop();
  fill(220);
  strokeWeight(0.00005);
  ellipse(w, h, 40, 40);


  //   if (state) {
  // 		background(220);
  //     rect(x, y, 50, 50);
  //   	x -= 1;
  //   	y -= 1;

  //   } else {
  //     //do this thing
  //   }

  if (mouseX > (w - 20) && mouseX < (w + 20)) {
    if (mouseY > (h - 20) && mouseY < (h + 20)) {
      stroke(220);
      strokeWeight(30); 
      push();
      //fill(300);
      ellipse(w, h, 40, 40);
      fill(0);
      pop();
    }
  }
      
}

//QUESTION - how to keep the drawing and only change background?
  function mousePressed() {
  d = dist(mouseX, mouseY, w, h);
  if (d < 20) {
    // Pick new random background
    background(random(0,255));
  }      
  }




  // int passedMillis = millis() - time; // calculates passed milliseconds
  // if(passedMillis >= 215){
  //     time = millis();
  //     fill(255,0,0);  // if more than 215 milliseconds passed set fill color to red
  // }
  
  //col=map (mouseX,0,400,150,255);
  //background(col,m/4,n);    
  
  
  
//   if (mouseX > 400) {
//     state = !state;
//   }




//   var h = 10;
//   if (state) {
//     background(0,0) && fill(h+random(110,250),h+random(150,250),h+random(180,250));
//   } else {
//     background(255,0) && fill(h+random(110,250),h+random(150,250),h+random(180,250));
//   }
function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(220);
  fill(255,0,0);
  noStroke();
  
  //
  
  let z = 10;
  let x = 0;
  
  
  for (i = 0; i < 10; i++) {
    
    if (mouseX < width/i) {
      rect(i*10, 0, width/i, height);

    
  
  if (mouseX < width/z) {
    z--; 
    x += 10;
  }

  if
         
     
} 
  
  
//   if (mouseX < width/10) {
//     rect(0, 0, width/10, height);
//   }
  
//   //use else if so that the code stops when the first condition is met
//   // actual code: (mouseX >= width/3 && mouseX <= width*2/3)
//   //but when first if is met, only need:
//   else if (mouseX <= width*2/3) {
//     rect(width/3, 0, width/3, height);
//   }
  
//   //last if statement doesn't need to be there, only the "else"
//   // actual code: if (mouseX > width*2/3)
//   //but now you only need the final condition:
//   else {
//     rect(width*2/3, 0, width/3, height);
//   }

// }let box1 = false;
let box2 = false;
let box3 = false;


function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(220);
  fill(255, 0, 0);
  noStroke();

  //When mouse enter the first rectangle, turn rectangle to red
  //When it re-enters, we turn it off

  //Draw rectangles

  if (box1) {
    rect(0, 0, width / 3, height);
  } 
  if (box2) {
    rect(width/3, 0, width / 3, height);
  }
  if (box3) {
    rect(width*2/3, 0, width/3, height);
  }
  
  //Check mouse location
  
  if (mouseX < width/3) {
    if (pmouseX > width/3) {
      //! is a toggle for boolean
    box1 = !box1;
  }
  }
  
  if (mouseX > width/3 && mouseX < width*2/3) {
    if (pmouseX < width/3 || pmouseX > width*2/3) {
      box2 = !box2;
    }
  }
  
  if (mouseX > width*2/3) {
    if (pmouseX < width*2/3) {
      box3 = !box3;
    }
  }
}
  
// 10print.org
// Ported from the book

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
}let x;
let y;
let col;
let a = 0;
let state = false;
let w;
let h;
let d;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas(800, 600);
  w=width/2;
  h=height/2;
  rectMode(CENTER);
  //angleMode(DEGREES);
  background(220);
  //frameRate(25);
  x = 0;
  y = 0;
  col = 0;
}



function draw() {
  //let deg = PI;
  //let rad = radians(deg);

  push();
  noFill();
  stroke(col);
  strokeWeight(1);
  translate(w, h);
  rotate(a++);
  rect(x, y, 50, 50);
  x += .9;
  y += .9;
  
  //stroke weight changes
  //NEEDS FIX -- getting stuck in loop and not reversing
  if (col == 255) {
    col -= 1;
  } else {
     col += 1;
  }
  pop();
  fill(220);
  strokeWeight(0.00005);
  ellipse(w, h, 40, 40);


  //   if (state) {
  // 		background(220);
  //     rect(x, y, 50, 50);
  //   	x -= 1;
  //   	y -= 1;

  //   } else {
  //     //do this thing
  //   }

  if (mouseX > (w - 20) && mouseX < (w + 20)) {
    if (mouseY > (h - 20) && mouseY < (h + 20)) {
      stroke(220);
      strokeWeight(30); 
      push();
      //fill(300);
      ellipse(w, h, 40, 40);
      fill(0);
      pop();
    }
  }
      
}

//QUESTION - how to keep the drawing and only change background?
  function mousePressed() {
  d = dist(mouseX, mouseY, w, h);
  if (d < 20) {
    // Pick new random background
    background(random(0,255));
  }      
  }




  // int passedMillis = millis() - time; // calculates passed milliseconds
  // if(passedMillis >= 215){
  //     time = millis();
  //     fill(255,0,0);  // if more than 215 milliseconds passed set fill color to red
  // }
  
  //col=map (mouseX,0,400,150,255);
  //background(col,m/4,n);    
  
  
  
//   if (mouseX > 400) {
//     state = !state;
//   }




//   var h = 10;
//   if (state) {
//     background(0,0) && fill(h+random(110,250),h+random(150,250),h+random(180,250));
//   } else {
//     background(255,0) && fill(h+random(110,250),h+random(150,250),h+random(180,250));
//   }
let x;
let y;
let col;

function setup() { 
  createCanvas(400, 400);
  rectMode(CENTER);
  angleMode(DEGREES);
  background(220);
  x = width/2;
  y = height/2;
  col = 0;

} 

function draw() { 
  noFill();
  stroke(col);
  rotate(PI);

  rect(x,y,50,50);
  x += 1;
  y += 1;
  col += 1l
  
}let x;
let y;
let col;

function setup() { 
  createCanvas(400, 400);
  rectMode(CENTER);
  angleMode(DEGREES);
  background(220);
  x = width/2;
  y = height/2;
  col = 0;

} 

function draw() { 
  noFill();
  stroke(col);
  rotate(PI);

  rect(x,y,50,50);
  x += 1;
  y += 1;
  col += 1l
  
}let x;
let y;
let col;

function setup() { 
  createCanvas(400, 400);
  rectMode(CENTER);
  angleMode(DEGREES);
  background(220);
  x = width/2;
  y = height/2;
  col = 0;

} 

function draw() { 
  noFill();
  stroke(col);
  rotate(PI);

  rect(x,y,50,50);
  x += 1;
  y += 1;
  col += 1l
  
}let a = 0;

function setup() { 
  createCanvas(400, 400);
  angleMode(DEGREES);
} 

function draw() { 
  background(220);
  noStroke();
  push();
  translate(width/2, height/2);
  //scales everything beneath scale by the input number (ex: 2)
  scale(2);
  //rotates drawing by number - default radians, can set to DEGREES
  rotate(a++);
  rect(0, 0, 200, 200);
  pop();
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  noStroke();
  
  for (let i = 0; i < 20; i++) {
    rect(20*i, 20*i, 20, 20)
  }
  
  
}let isOn1 = false;
let hasLeft1 = false;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);
  fill(255, 0, 0);
  noStroke();

  //When mouse enter the first rectangle, turn rectangle to red
  //When it re-enters, we turn it off

  if (mouseX < width / 3) {
    if(hasLeft1) {
      isOn1 = !isOn1;
      hasLeft1 = false;
    }
  }
  else if (mouseX < width / 3) {
    hasLeft1 = false;
    rect(0, 0, width / 3, height);
  }
    
  //   if (isOn1) {
  //   rect(0, 0, width / 3, height);
  // }

    
  //   isOn1 = !isOn1;
  //   isEntered1 = !isEntered1;
  // }




  //   if (mouseX < width / 3 && isEntered = false) {
  //     isOn = false;
  //   }





  //use else if so that the code stops when the first condition is met
  // actual code: (mouseX >= width/3 && mouseX <= width*2/3)
  //but when first if is met, only need:
  else if (mouseX <= width * 2 / 3) {
    rect(width / 3, 0, width / 3, height);
  }

  //last if statement doesn't need to be there, only the "else"
  // actual code: if (mouseX > width*2/3)
  //but now you only need the final condition:
  else {
    rect(width * 2 / 3, 0, width / 3, height);
  }

  }function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(220);
  fill(255,0,0);
  noStroke();
  
  //
  if (mouseX < width/3) {
    rect(0, 0, width/3, height);
  }
  
  //use else if so that the code stops when the first condition is met
  // actual code: (mouseX >= width/3 && mouseX <= width*2/3)
  //but when first if is met, only need:
  else if (mouseX <= width*2/3) {
    rect(width/3, 0, width/3, height);
  }
  
  //last if statement doesn't need to be there, only the "else"
  // actual code: if (mouseX > width*2/3)
  //but now you only need the final condition:
  else {
    rect(width*2/3, 0, width/3, height);
  }

}let x;
let justHitRightWall;
let xspeed = 3;

function setup() { 
  createCanvas(400, 400);
  x = width / 2;
} 

function draw() { 
  background(220);
  
  //Semantically clear way:
  // if (x > width - 25) justHitRightWall = true;
  // else if (x < 0) justHitRightWall = false;
  // //come back when x is > width
  // if (justHitRightWall) {
  //   //move to the left
  //   x--;
  // }
  // else {
  //   x++;
  // }
  
  //Code is more concise, and speed can be controlled as variable:
  if (x > width - 25 || x < 0 + 25) {
    xspeed *= -1;
  }
  
  //Move
  x += xspeed;
  
  //Draw Ellipse, bouncing ball
  ellipse(x, height/2, 50, 50);
}let a = 0;
let r = 3;

// Variables
let count = 0;
let angle = 0;

let col = {
  h: 0,
  s: 0,
  b: 0
}


function setup() { 
  createCanvas(windowWidth, windowHeight);
  //randomized background shade of grey
  let z = random(0, 255);
  background(z);
	//frameRate(25);
  colorMode(HSB);
  //Toggling this ON will turn the spiral into a mandala
  //angleMode(DEGREES);
}

function draw() { 

  // Increment count and angle
  // Next five lines I got from Dan Shiffman's code
  //this changes the tightness of the spiral
  var increment = 16;
  //As I understand 360*/137.5 = 2.618 which is 1 + golden ratio
  var angleChange = 137.5;
  //These next two lines I don't understand
  var r = sqrt(count);
  count = count + increment;
  //angle used for cosine and sine is progressively growing as the circumfrence grows 
  angle += angleChange;
  // I learned about these next four lines from code by Jenil Gogari @jgog
  let x = r * -cos(angle);
  let y = r * sin(angle);

  a += 0.19;
  r += 1;
  
  //position in center
  translate(width/2, height/2);
  //parameters around strokweweight
  //let w = map(mouseY, 0, height, 1, 4);
  strokeWeight(1.5);
	//parameters for mouse movement = hue
  //interactive colors change with mouse movement
  col.h = map(mouseX, 0, width, 0, 255);
  stroke(col.h, 80, 100);
  noFill();
  ellipse(x, y, 5, 5);
}

let a = 0;
let r = 30;

let col = {
  h: 0,
  s: 0,
  b: 0
}


function setup() { 
  createCanvas(windowWidth, windowHeight);
  let z = random(0, 255);
  background(z);
	frameRate(15);
  colorMode(HSB);
}

function draw() { 

  let x = r * -cos(a);
  let y = r * sin(a);

  a += 0.19;
  r += 1;
  
  translate(width/2, height/2);
  let w = map(mouseY, 0, height, 1, 5);
  strokeWeight(w);
  col.h = map(mouseX, 0, width, 0, 255);
  stroke(col.h, 50, 100);
  noFill();
  ellipse(x, y, 30, 30);
}



var td;
var count = 0;
var t;
var v;
var border = 10;

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    var n = 5;
    t_size = Math.pow(2, n);
    t_len = (height - 2 * border);
    t_height = Math.sqrt(Math.pow(t_len, 2) - Math.pow(t_len/2, 2));
    curve_width = Math.pow(3, n);
    v = t_len / t_size;

    td = sierpinski(n);
    console.log(td);
    t = new Turtle(width/2 - t_height/2, height - border, 3*PI/2);
}

function draw() {
    var next = false;
    while (!next && count < td.length) {
        switch(td[count]) {
            case 'F':
                t.draw(v);
                next = true;
                break;
            case 'G':
                t.draw(v);
                next = true;
                break;
            case '+':
                t.turn(-2 * PI/3);
                break;
            case '-':
                t.turn(2 * PI/3);
                break;
        }
        count += 1;
    }
}

function Turtle (x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

    this.stack = [];

    this.draw = function(n) {
        new_x = this.x + cos(this.r) * n;
        new_y = this.y + sin(this.r) * n;
        line(this.x, this.y, new_x, new_y);
        this.x = new_x;
        this.y = new_y;
    }

    this.turn = function(p) {
        this.r = this.r + p;
    }

    this.save = function() {
        state = [this.x, this.y, this.r].join();
        this.stack.push(state);
    }
    
    this.restore = function() {
        state_string = this.stack.pop()
        newstate = state_string.split(',');
        console.log(newstate);
        this.x = float(newstate[0]);
        this.y = float(newstate[1]);
        this.r = float(newstate[2]);
    } 
}

function stprocessor(s) {
    var p;
    switch(s) {
        case 'F':
            p = 'F-G+F+G-F';
            break;
        case 'G':
            p = 'GG';
            break;
        default:
            p = s;
    }
    return p
}

function lsystem(state, rule, n) {
    var newstate = "";

    if (n == 0) {
        return state;
    }
    else {
        for (var i = 0; i < state.length; i++) {
            newstate += rule(state[i]);
        };
        return lsystem(newstate, rule, n - 1)
    }
}

function sierpinski(n) {
    return lsystem('F-G-G', stprocessor, n);
}

window.onresize = function() {
    var w = window.innerWidth;
    var h = window.innerHeight;  
    canvas.size(w,h);
    width = w;
    height = h;
};let spot = {
  x: 100,
  y: 50
}

let col = {
  r: 255,
  g: 0,
  b: 0
}


function setup() { 
  createCanvas(800, 400);
  //if background was instead in draw, the layering effect would not happen
  background(0);

} 

function draw() { 
  spot.x = random(0, width);
  spot.y = random(0, height);
  col.r = random(100, 255);
  col.g = 0;
  col.b = random(100, 190);
  //last figure of fill is the alpha which affects opacity
  fill(col.r, col.g, col.b, 100);
  noStroke();
  ellipse(spot.x, spot.y, 24, 24);
}var r = 0;
var b = 255;

function setup() { 
  createCanvas(600, 400);
  rectMode(CENTER);
} 

function draw() { 
  r = map(mouseX, 0, width, 0, 255);
  b = map(mouseY, 0, height, 255, 0);
  background(r, 0, b);
  
  
  //ellipse pointer
  fill (250, 118, 222);
  noStroke();
  ellipse(mouseX, mouseY, 64, 64);
}let circlex;
let circley;
let color1;
let color2;
let color3;


function setup() { 
  createCanvas(800, 600);
  circlex = width/10;
  circley = height/10;
  color1 = 255;
  color2 = 255;
  color3 = 0;
} 


function draw() { 
  background(220);
  noStroke();
  fill(color1, color2, color3);
  ellipse(circlex, circley, 50, 50);
  circlex = circlex + PI/10;
  circley = circley + PI/10;
  color1 = color1 - 1/10;
  color2 = color2 - 1/10;
  color3 = color3 -1/10;
  fill(0,245, 150);
  rect(0, height*5/6, width, height);
}function setup() { 
  createCanvas(windowWidth, windowHeight);
    frameRate(400);
} 

function draw() { 
  //background(220);
  //dist = how much move in x, how much move in y - change
  let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
  //map(input, bottom range, top range, bottom output, top output)
  // input could be many things/actions, speed, etc
  let sw = map(speed, 0, 50, 30, 0);
  //These four map values set the ratio and offset,
  // not actually capping the numbers
	//Set stroke weight with variable you made:
  strokeWeight(sw);
  stroke(70, sw);
  line(mouseX, mouseY, pmouseX, pmouseY);
}

function mousePressed() {
  background(255);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  fill(100);
  line(width/4,height/4,width*3/4, height/4);
  line(width/4,height/4,width/4, height*3/4);
  line(width/4,height*3/4,width*3/4, height*3/4);
  line(width*3/4,height/4,width*3/4, height*3/4);
}/// let assigns a new position in memory
// if you enter "var" + variable name again - it will create
//a second iteration of the variable, a new variable,
//as opposed to just udpating the value, using = sign.

let leftx;
let topy;
let rightx;
let boty;

function setup() { 
  createCanvas(600, 400);
  leftx = width/4;
  topy = height/4;
  rightx = width*3/4;
  boty = height*3/4;
} 

function draw() { 
  background(220);
  line(leftx, topy, rightx, topy);
  line(leftx, boty, rightx, boty);
  line(rightx,topy, rightx, boty);
  line(leftx, topy, leftx, boty); 
}



//object literal

tl = { x: leftx, y: topy };
      
// so we know tl.x = leftx  var x;
  var y;

function setup() { 
  createCanvas(800, 200);
  // can also use 
  createCanvas(windowWidth, windowHeight);
  background(120);
  //if rectMode is set during setup, only have to set it once
  x = width/2;
  y = height/2;
  console.log(width, " ", height);
} 

function draw() {
  //if rectMode is set before each rect, you can change for each draw
  rectMode(CENTER);
  noStroke();
  rect(x, y, x, y);
  // OR  rect(width/x, width/y, width/x, width/y);  
}function setup() { 
  createCanvas(600, 400);
  
  background(150);
  
  //foreground
  noStroke();
  fill(100);
  rect(0, 275, 600, 125);
  
  //leaf1
  stroke(64, 128, 0);
  fill(64, 128, 0);
  curve(30, 250, 300, 50, 100, 320, 50, 2000);
  curve(-50, -150, 300, 50, 100, 320, -1000, 1000);
  //stem1
  fill(50, 50, 50);
  noStroke();
  quad(345, -20, 355, -20, 150, 250, 150, 250);
  //leaf2
  stroke(0,150,0);
  fill(64, 128, 0);
  //curve(30, 250, 300, 50, 100, 320, 50, 2000);
  //curve(-50, -150, 300, 50, 100, 320, -1000, 1000);
  //stem2
  fill(50, 50, 50);
  noStroke();
  //quad(345, -20, 355, -20, 150, 250, 150, 250);
  
  //wolfiebody
  noStroke();
  fill(180, 101, 38);
  ellipse(300, 270, 90, 75);
  fill(186, 106, 43);
  ellipse(300, 280, 60, 55);
  fill(180, 101, 38);
  stroke(175, 95, 35);
  ellipse(270, 300, 30, 20);
  ellipse(330, 300, 30, 20);
  //wolfieface
  fill(51, 26, 0);
  ellipse(285, 275, 16, 8);
  ellipse(315, 275, 16, 8);
  //rect(
  ellipse(300, 295, 18, 18);
  //wolfieears
  fill(186, 106, 43);
  stroke(175, 95, 35);
  curve(50, 200, 330, 250, 330, 260, 400, -200);
  curve(0, 100, 265, 250, 260, 260, 500, -200);
} 

function draw() { 

  
}

function setup() { 
  createCanvas(650, 500);
} 

function draw() { 
  background(0,255,255);
  drawLines();
  drawEllip();
  drawSquare();
}

function drawLines() {
  fill(255, 0, 0);
  quad(-20, 10, 15, -15, 650, 475, 650, 525);
}

function drawEllip() {
  fill(0, 205, 0);
	ellipse(325, 250, 320, 240);
  noStroke();
}

function drawSquare() {
  fill(0, 0, 150);
  rect(445, 210, 40, 40);
}function setup() { 
  createCanvas(600, 450);
} 

function draw() { 
  background(220);
  ellipse(300, 200, 100, 100);
  noFill();
  stroke(0, 255, 255);
  strokeWeight(5);
}
function setup() { 
} 

function draw() { 
  createCanvas(600, 600);
  background(220);
}