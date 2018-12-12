var bg_default;
var newspaper_1;
var newspaper_2;

var ourfont;

var currentstatus = 0; //1= camera, 2 = glass, 3 = time

//tool
var toolshow = 20;
var bar_bg_p = 860;

var fade = 255;

var scene = 1; // 0 = big scene

var canvas;

var bgmusic;


function preload() {
  ourfont = loadFont('TpldKhangXiDictTrial.otf');

  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper_1 = loadImage('asset/background/newspaer_1.jpg ');
  newspaper_2 = loadImage('asset/background/newspaer_2.jpg ');

  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');

  alert_camera = loadImage('asset/alert_camera.png');
  alert_glass = loadImage('asset/alert_glass.png');

  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');

  s1_resident = loadImage('asset/scene/01residents.jpg');
  s1_construction = loadImage('asset/scene/02construction.jpg');
  s1_gov = loadImage('asset/scene/03gov.jpg');
  s1_house = loadImage('asset/scene/04house.jpg');

  people = loadImage('asset/scene2/people.png ');
  house = loadImage('asset/scene2/house.jpg ');
  court = loadImage('asset/scene2/court.jpg ');
  construction = loadImage('asset/scene2/construction.png ');

  s2_house = loadImage('asset/06house.jpg ');
  s3_court = loadImage('asset/05court.jpg ');

  bgmusic = loadSound('asset/chongqing2.m4a');

}

function setup() {
  bgmusic.setVolume(0.1);
  bgmusic.play();
  createCanvas(1440, 860);
  
  textFont(ourfont);
  image(newspaper_2, 1055, 170, 383, 690);

  // set the dots of first scene
  dots[0] = new Dots(267, 290, 255);
  dots[1] = new Dots(848, 677, 255);
  dots[2] = new Dots(922, 150, 255);
  dots[3] = new Dots(519, 156, 255);
  dots[4] = new Dots(345, 345, 255);
  dots[5] = new Dots(626, 270, 255);

  //photos of scene one
  s1_photos = [s1_resident, s1_construction, s1_gov, s1_house,s3_court,s2_house]

  //words of scene one
  for (let i of s1_txt0) {
    s1_txt0s = concat(s1_txt0, splitTokens(i));
  }
  for (let i of s1_txt1) {
    s1_txt1s = concat(s1_txt1, splitTokens(i));
  }
  for (let i of s1_txt2) {
    s1_txt2s = concat(s1_txt2, splitTokens(i));
  }
  for (let i of s1_txt3) {
    s1_txt3s = concat(s1_txt3, splitTokens(i));
  }

  for (let i of s3_txt) {
    s3_txts = concat(s3_txt, splitTokens(i));
  }

  for (let i of s2_txt) {
    s2_txts = concat(s2_txt, splitTokens(i));
  }
}



function draw() {

  if (scene == 1) { // if in the scene 0
    image(bg_default, 0, 0, 1057, 860); //place scene
    if (!alert_camera_status && currentstatus == 1 ) {
      for (let i = 0; i < 4; i++) {

        if (dots[i].near()) { //if click sth
          photoshow(s1_photos[i]); // show that photos
          dots[i].disappear();
          txtout =i;// show that words
        }
        dots[i].show(); //show the dots in s1
      }
    }
    if(currentstatus ==2){
      glass_circle();
      glass_zoom();
    }
  }
  if(scene ==2){
    image(house, 0, 0, 1057, 860);
    if(currentstatus ==2 && mouseIsPressed && mouseY<800){
      scene =1;
    }
    if (!alert_camera_status && currentstatus == 1 ){
      if (dots[5].near()) { //if click sth
        photoshow(s1_photos[5]); // show that photos
        dots[5].disappear();
        txtout =5;// show that words
      }
    }
    dots[5].show();
  }
  if(scene ==3){
    image(court, 0, 0, 1057, 860);
    if(currentstatus ==2 && mouseIsPressed && mouseY<800){
      scene =1;
    }
    if (!alert_camera_status && currentstatus == 1 ){
      if (dots[4].near()) { //if click sth
        photoshow(s1_photos[4]); // show that photos
        dots[4].disappear();
        txtout =4;// show that words
      }

    }
    dots[4].show();
  }

  image(newspaper_1, 1055, 0, 383, 170);

  if(alltxt.length <7){
  titleshow(titles[0]);
  timeshow(timeinfos[0]);
}

  if(alltxt.length == 7){
    titleshow(titles[1]);
    timeshow(timeinfos[1]);
  }

  alert_camera_show();
  alert_camera_happen();

  alert_glass_show(); // when four dots are unlocked, unlock the glass function
  alert_glass_happen(); // the alert get out

  switchstatus(); // the bar and status

	txtcomeout();

  //use for locating mouse
  //fill(0);
//  text('X' + mouseX, mouseX, mouseY);
  //text('Y' + mouseY, mouseX, mouseY + 20);
}
var bg_default;
var newspaper;

var people;
var showPeople = false;

var house;
var showHouse = false;

var construction;
var showConstruction = false;

var court;
var showCourt = false;

//status
var camera_active;
var camera_down;
var glass_active;
var glass_down;
var time_active;
var time_down;

var currentstatus = 0; //1= camera, 2 = glass, 3 = time

//tool 
var toolshow = 20;
var bar_bg_p = 860;

var fade = 255;


//alert
var blockbg = 40;

var count1 = 0;
var alert_camera;

var ok_active;
var ok_down;
var alert_camera_status = 0;

// let main;
// let zoom;
// var ctx;
// var zoomCtx;

function preload() {
  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper = loadImage('asset/background/newspaer.jpg ');

  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');

  alert_camera = loadImage('asset/alert_camera.png ');

  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');
  people = loadImage('people.png ');
  house = loadImage('house.jpg ');
  court = loadImage('court.jpg ');
  construction = loadImage('construction.png ');

}

function setup() {
  createCanvas(1440, 860);
  //   main = createCanvas(1440, 860);
  //   console.log(main);
  //   zoom = document.getElementById("zoom");
  //   ctx = main.elt.getContext("2d")
  //   zoomCtx = zoom.getContext("2d");

  //   main.elt.addEventListener("mousemove", function(e) {
  //     console.log(e);
  //     zoomCtx.fillStyle = "white";
  //     //zoomCtx.clearRect(0,0, zoom.width, zoom.height);
  //     //zoomCtx.fillStyle = "transparent";
  //     zoomCtx.fillRect(0, 0, zoom.width, zoom.height);
  //     zoomCtx.drawImage(main.elt, e.x, e.y, 500, 500, 0, 0, 400, 200);
  //     console.log(zoom.style);
  //     zoom.style.top = e.pageY + 10 + "px"
  //     zoom.style.left = e.pageX + 10 + "px"
  //     zoom.style.display = "block";
  //   });

  //   main.elt.addEventListener("mouseout", function() {
  //     zoom.style.display = "none";
  //   });
}

// function mousePressed() {
//   if (mouseX > 235 && mouseX < 295 && mouseY > 300 && mouseY < 380) {
//     showPeople = !showPeople;
//     print(showPeople);
//   }
// }

// function mousePressed() {
//   if (mouseX > 420 && mouseX < 550 && mouseY > 280 && mouseY < 360) {
//     showHouse = !showHouse;
//     print(showHouse);
//   }
// }


//   if(mouseX>780 && mouseX<1056 && mouseY>180 && mouseY<320) {
//     showCourt = !showCourt;
//     print(showCourt);
//   }
// }

function mousePressed() {
  //people
  var d1 = dist(mouseX, mouseY, 265, 335);
  //house
  var d2 = dist(mouseX, mouseY, 480, 330);
  //court 
  var d3 = dist(mouseX, mouseY, 910, 250);
  //construction
  var d4 = dist(mouseX, mouseY, 880, 730);


  if (showPeople || showHouse || showCourt || showConstruction) {
    showPeople = false
    showHouse = false
    showCourt = false
    showConstruction = false
  } else if (d1 < 45) {
    if (showHouse == false && showCourt == false && showConstruction == false) {
      showPeople = true
    }
  } else if (d2 < 60) {
    if (showPeople == false && showCourt == false && showConstruction == false) {
      showHouse = true
    }
  } else if (d3 < 145) {
    // print(showHouse)
    if (showPeople == false && showHouse == false && showConstruction == false) {
      showCourt = true
    }
  } else if (d4 < 150) {
    if (showPeople == false && showHouse == false && showCourt == false) {
      showConstruction = true
    }
  }


}



// 
function draw() {

  // image(people, 0, 0,1057, 860);
  // image(house,0,0,1057, 860);
  // image(construction,0,0,1057, 860);
  // image(court,0,0,1057, 860);
  image(bg_default, 0, 0, 1057, 860);
  image(newspaper, 1057, 0, 383, 860);

  //button 1 people
  stroke(179, 130, 62);
  strokeWeight(2);
  // fill(30, 30, 30, 50);
  ellipse(265, 335, 90, 90);


  //button 2 house

  fill(30, 30, 30, 50);
  ellipse(485, 330, 120, 120);


  //button 3 court

  fill(30, 30, 30, 50);
  ellipse(910, 250, 290, 290);

  //button 4 construction

  fill(30, 30, 30, 50);
  ellipse(880, 730, 300, 300);

  // }



  //tool bar

  //   noStroke();
  //   fill(30, 30, 30, 50);
  //   rect(0, bar_bg_p, 1057, 60);



  //   //status2: glass status
  //   if (currentstatus == 2) {
  //     image(camera_down, 30, bar_bg_p - 40, 145, 110);
  //     image(glass_active, 175, bar_bg_p - 40, 163, 110);
  //     image(time_down, 338, bar_bg_p - 40, 117, 110);

  //     //zoom in ellipse
  //     noFill();
  //     stroke(255);
  //     ellipse(mouseX - 30, mouseY - 30, 140);
  //     line(mouseX - 50, mouseY - 30, mouseX - 10, mouseY - 30);
  //     line(mouseX - 30, mouseY - 50, mouseX - 30, mouseY - 10);
  //   }



  //   //switch status

  //   // if (mouseX > 0 && mouseX < 175 && mouseY > 750) {
  //   //   image(camera_active, 30, bar_bg_p - 40, 145, 110);
  //   //   image(glass_down, 175, bar_bg_p - 40, 163, 110);
  //   //   image(time_down, 338, bar_bg_p - 40, 117, 110);
  //   //   if (mouseIsPressed) {
  //   //     currentstatus = 1;
  //   //   }
  //   // }


  //   if (mouseX > 175 && mouseX < 338 && mouseY > 750) {
  //     image(camera_down, 30, bar_bg_p - 40, 145, 110);
  //     image(glass_active, 175, bar_bg_p - 40, 163, 110);
  //     image(time_down, 338, bar_bg_p - 40, 117, 110);
  //     if (mouseIsPressed) {
  //       currentstatus = 2;
  //     }
  //   }

  //   if (mouseX > 338 && mouseX < 1057 && mouseY > 750) {
  //     image(camera_down, 30, bar_bg_p - 40, 145, 110);
  //     image(glass_down, 175, bar_bg_p - 40, 163, 110);
  //     image(time_active, 338, bar_bg_p - 40, 117, 110);
  //     if (mouseIsPressed) {
  //       currentstatus = 3;
  //       console.log(currentstatus);
  //     }
  //   }

  //   //get out
  //   if (mouseY > 800) {
  //     bar_bg_p -= toolshow;
  //     if (bar_bg_p <= 800) {
  //       bar_bg_p = 800;
  //     }
  //   } else if (mouseY > 0 && mouseY < 800) {
  //     bar_bg_p += toolshow;
  //     if (bar_bg_p > 880) {
  //       bar_bg_p = 880;
  //     }


  if (showPeople) {
    image(people, 0, 0, 1057, 860);
    fadeIn(people, 50);
    fadeOut(bg_default, -50);
  } else {
    fadeIn(bg_default, 50);
    fadeOut(people, -50);
  }

  if (showHouse) {
    image(house, 0, 0, 1057, 860);
    fadeIn(house, 50);
    fadeOut(bg_default, -50);
  } else {
    fadeIn(bg_default, 50);
    fadeOut(house, -50);
  }

  if (showConstruction) {
    image(construction, 0, 0, 1057, 860);
    fadeIn(construction, 50);
    fadeOut(bg_default, -50);
  } else {
    fadeIn(bg_default, 50);
    fadeOut(construction, -50);
  }


  if (showCourt) {
    image(court, 0, 0, 1057, 860);
    fadeIn(court, 50);
    fadeOut(bg_default, -50);
  } else {
    fadeIn(bg_default, 50);
    fadeOut(court, -50);
  }


  // function makeImages() {  
  //   noStroke();
  //   translate(width/2, height/2);
  //   alvos();
  //   normal=bg_default; 
  //   scale(1.5);
  //   alvos();
  //   magnified=bg_default;
  // }

  // function alvos() {
  //   background(255);
  //   for (let i=5; i>0; i--) {
  //     fill(200, 0, 0);
  //     ellipse(0, 0, i*40, i*40);
  //     fill(255);
  //     ellipse(0, 0, i*40-20, i*40-20);
  //   }
}


var bg_default;
var newspaper;

var people;
var showPeople = false;

var house;
var showHouse = false;

var construction;
var showConstruction = false;

var court;
var showCourt = false;

//status
var camera_active;
var camera_down;
var glass_active;
var glass_down;
var time_active;
var time_down;

var currentstatus = 0; //1= camera, 2 = glass, 3 = time

//tool 
var toolshow = 20;
var bar_bg_p = 860;

var fade = 255;


//alert
var blockbg = 40;

var count1 = 0;
var alert_camera;

var ok_active;
var ok_down;
var alert_camera_status = 0;

// let main;
// let zoom;
// var ctx;
// var zoomCtx;

function preload() {
  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper = loadImage('asset/background/newspaer.jpg ');

  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');

  alert_camera = loadImage('asset/alert_camera.png ');

  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');
  people = loadImage('people.png ');
  house = loadImage('house.jpg ');
  court = loadImage('court.jpg ');
  construction = loadImage('construction.png ');

}

function setup() {
  createCanvas(1440, 860);
  //   main = createCanvas(1440, 860);
  //   console.log(main);
  //   zoom = document.getElementById("zoom");
  //   ctx = main.elt.getContext("2d")
  //   zoomCtx = zoom.getContext("2d");

  //   main.elt.addEventListener("mousemove", function(e) {
  //     console.log(e);
  //     zoomCtx.fillStyle = "white";
  //     //zoomCtx.clearRect(0,0, zoom.width, zoom.height);
  //     //zoomCtx.fillStyle = "transparent";
  //     zoomCtx.fillRect(0, 0, zoom.width, zoom.height);
  //     zoomCtx.drawImage(main.elt, e.x, e.y, 500, 500, 0, 0, 400, 200);
  //     console.log(zoom.style);
  //     zoom.style.top = e.pageY + 10 + "px"
  //     zoom.style.left = e.pageX + 10 + "px"
  //     zoom.style.display = "block";
  //   });

  //   main.elt.addEventListener("mouseout", function() {
  //     zoom.style.display = "none";
  //   });
}

// function mousePressed() {
//   if (mouseX > 235 && mouseX < 295 && mouseY > 300 && mouseY < 380) {
//     showPeople = !showPeople;
//     print(showPeople);
//   }
// }

// function mousePressed() {
//   if (mouseX > 420 && mouseX < 550 && mouseY > 280 && mouseY < 360) {
//     showHouse = !showHouse;
//     print(showHouse);
//   }
// }


//   if(mouseX>780 && mouseX<1056 && mouseY>180 && mouseY<320) {
//     showCourt = !showCourt;
//     print(showCourt);
//   }
// }

function mousePressed() {

  //people
  var d1 = dist(mouseX, mouseY, 265, 335);
  if (d1 < 45) {
    if (showHouse == false && showCourt == false && showConstruction == false){
    showPeople = !showPeople;
    }
  } else {
    showPeople = false
  }
  
  

  //house
  var d2 = dist(mouseX, mouseY, 480, 330);
  if (d2 < 60) {
 if (showPeople == false && showCourt == false && showConstruction == false){
    showHouse = !showHouse;
    }
  }  else {
    showHouse = false
  }


  //court 
  var d3 = dist(mouseX, mouseY, 910, 250);
  if (d3 < 145) {
    print(showHouse)
 if (showPeople == false && showHouse == false && showConstruction == false){
    showCourt = !showCourt;
    }
  } else {
    showCourt = false
  }


  //construction
  var d4 = dist(mouseX, mouseY, 880, 730);
  if (d4 < 150) {
 if (showPeople == false && showHouse == false && showCourt == false){
    showConstruction = !showConstruction;
    }
  } else {
    showConstruction = false
  }


}




// 
function draw() {

  // image(people, 0, 0,1057, 860);
  // image(house,0,0,1057, 860);
  // image(construction,0,0,1057, 860);
  // image(court,0,0,1057, 860);
  image(bg_default, 0, 0, 1057, 860);
  image(newspaper, 1057, 0, 383, 860);

  //button 1 people
  stroke(179, 130, 62);
  strokeWeight(2);
  // fill(30, 30, 30, 50);
  ellipse(265, 335, 90, 90);


  //  function mousePressed(){
  // if(mouseX>235&&mouseX<295&&mouseY>300&&<mouseY<380){

  // }


  //button 2 house

  fill(30, 30, 30, 50);
  ellipse(485, 330, 120, 120);

  // if(mouseX>420 && mouseX<550 && mouseY>280 && <mouseY<360){
  //}

  //button 3 court

  fill(30, 30, 30, 50);
  ellipse(910, 250, 290, 290);
  // if(mouseX>780 && mouseX<1056 && mouseY>180 && mouseY<320){
  //}

  //button 4 construction

  fill(30, 30, 30, 50);
  ellipse(880, 730, 300, 300);
  // var d = dist(mouseX, mouseY, 870, 660);
  //   if (d < 190) {
  //   showHouse = !showHouse;
  //     print(showHouse);
  //   }
  // }


  //   }
  // }



  //tool bar

  //   noStroke();
  //   fill(30, 30, 30, 50);
  //   rect(0, bar_bg_p, 1057, 60);



  //   //status2: glass status
  //   if (currentstatus == 2) {
  //     image(camera_down, 30, bar_bg_p - 40, 145, 110);
  //     image(glass_active, 175, bar_bg_p - 40, 163, 110);
  //     image(time_down, 338, bar_bg_p - 40, 117, 110);

  //     //zoom in ellipse
  //     noFill();
  //     stroke(255);
  //     ellipse(mouseX - 30, mouseY - 30, 140);
  //     line(mouseX - 50, mouseY - 30, mouseX - 10, mouseY - 30);
  //     line(mouseX - 30, mouseY - 50, mouseX - 30, mouseY - 10);
  //   }



  //   //switch status

  //   // if (mouseX > 0 && mouseX < 175 && mouseY > 750) {
  //   //   image(camera_active, 30, bar_bg_p - 40, 145, 110);
  //   //   image(glass_down, 175, bar_bg_p - 40, 163, 110);
  //   //   image(time_down, 338, bar_bg_p - 40, 117, 110);
  //   //   if (mouseIsPressed) {
  //   //     currentstatus = 1;
  //   //   }
  //   // }


  //   if (mouseX > 175 && mouseX < 338 && mouseY > 750) {
  //     image(camera_down, 30, bar_bg_p - 40, 145, 110);
  //     image(glass_active, 175, bar_bg_p - 40, 163, 110);
  //     image(time_down, 338, bar_bg_p - 40, 117, 110);
  //     if (mouseIsPressed) {
  //       currentstatus = 2;
  //     }
  //   }

  //   if (mouseX > 338 && mouseX < 1057 && mouseY > 750) {
  //     image(camera_down, 30, bar_bg_p - 40, 145, 110);
  //     image(glass_down, 175, bar_bg_p - 40, 163, 110);
  //     image(time_active, 338, bar_bg_p - 40, 117, 110);
  //     if (mouseIsPressed) {
  //       currentstatus = 3;
  //       console.log(currentstatus);
  //     }
  //   }

  //   //get out
  //   if (mouseY > 800) {
  //     bar_bg_p -= toolshow;
  //     if (bar_bg_p <= 800) {
  //       bar_bg_p = 800;
  //     }
  //   } else if (mouseY > 0 && mouseY < 800) {
  //     bar_bg_p += toolshow;
  //     if (bar_bg_p > 880) {
  //       bar_bg_p = 880;
  //     }


  if (showPeople) {
    image(people, 0, 0, 1057, 860);
    fadeIn(people, 50);
    fadeOut(bg_default, -50);
  } else {
    fadeIn(bg_default, 50);
    fadeOut(people, -50);
  }

  if (showHouse) {
    image(house, 0, 0, 1057, 860);
    fadeIn(house, 50);
    fadeOut(bg_default, -50);
  } else {
    fadeIn(bg_default, 50);
    fadeOut(house, -50);
  }

  if (showConstruction) {
    image(construction, 0, 0, 1057, 860);
    fadeIn(construction, 50);
    fadeOut(bg_default, -50);
  } else {
    fadeIn(bg_default, 50);
    fadeOut(construction, -50);
  }


  if (showCourt) {
    image(court, 0, 0, 1057, 860);
    fadeIn(court, 50);
    fadeOut(bg_default, -50);
  } else {
    fadeIn(bg_default, 50);
    fadeOut(court, -50);
  }




  // function makeImages() {  
  //   noStroke();
  //   translate(width/2, height/2);
  //   alvos();
  //   normal=bg_default; 
  //   scale(1.5);
  //   alvos();
  //   magnified=bg_default;
  // }

  // function alvos() {
  //   background(255);
  //   for (let i=5; i>0; i--) {
  //     fill(200, 0, 0);
  //     ellipse(0, 0, i*40, i*40);
  //     fill(255);
  //     ellipse(0, 0, i*40-20, i*40-20);
  //   }
}


function fadeOut(a, speed) {
  a.loadPixels();

  for (let j = 0; j < a.height; j++) {
    for (let i = 0; i < a.width; i++) {
      let index = (i + j * a.width) * 4;
      if (speed < 0 && a.pixels[index + 3] > 0) {
        a.pixels[index + 3] = a.pixels[index + 3] + speed;
      }
    }
  }
  a.updatePixels();
}

function fadeIn(a, speed) {
  a.loadPixels();

  for (let j = 0; j < a.height; j++) {
    for (let i = 0; i < a.width; i++) {
      let index = (i + j * a.width) * 4;

      if (speed > 0 && a.pixels[index + 3] < 255) {
        a.pixels[index + 3] = a.pixels[index + 3] + speed;
      }
    }
  }
  a.updatePixels();
}let img;
let originalImg;
let gp;
function preload(){
  img = loadImage("ccc.png");
  originalImg = loadImage("aaa.png");
}
function setup() {
  createCanvas(800, 600);
  gp = createGraphics(width,height);
  gp.image(originalImg, 0, 0);
  //noCursor();
}

function draw() {
  background(255, 0, 0);
  
  
//   image(originalImg, -mouseX, -mouseY);

//   img.loadPixels(); 
  
//   for (let j=0; j<img.height; j++){
//     for (let i=0; i<img.width; i++){
//       let index = (i + j*img.width) * 4;

//         img.pixels[index+3] = 255;
//     }
//   }
//   img.updatePixels();
  
//   img.loadPixels();
  
//   for (let j=0; j<img.height; j++){
//     for (let i=0; i<img.width; i++){
//       let index = (i + j*img.width) * 4;
      
//       if (getDistance(i, j, mouseX, mouseY) < 25){

//         img.pixels[index+3] = 0;
//       }
//     }
//   }

//   img.updatePixels();

  
  image(originalImg, 0, 0);
  image(img, 0, 0);
	fadeOut(img, -2);
  fadeIn(originalImg, 1);
  
}

function getDistance(x1, y1, x2, y2){
	let dis = sqrt((x1-x2) * (x1-x2) + (y1-y2)*(y1-y2));
  return dis;
}

function mousePressed(){
  
}
function fadeOut(a, speed){
  a.loadPixels();
  
  for (let j=0; j<a.height; j++){
    for (let i=0; i<a.width; i++){
      let index = (i + j*a.width) * 4;
      if (speed < 0 && a.pixels[index+3] > 0){
        a.pixels[index+3] = a.pixels[index+3] + speed;
      }
    }
  }
  a.updatePixels();
}

function fadeIn(img, speed){
    img.loadPixels();
  
  for (let j=0; j<img.height; j++){
    for (let i=0; i<img.width; i++){
      let index = (i + j*img.width) * 4;

      if (speed > 0 && img.pixels[index+3] < 255){
        img.pixels[index+3] = img.pixels[index+3] + speed;
      }
    }
  }
  img.updatePixels();
}


let img;
let originalImg;
let gp;
function preload(){
  img = loadImage("ccc.png");
  originalImg = loadImage("aaa.png");
}
function setup() {
  createCanvas(800, 600);
  gp = createGraphics(width,height);
  gp.image(originalImg, 0, 0);
  //noCursor();
}

function draw() {
  background(255, 0, 0);
  
  
//   image(originalImg, -mouseX, -mouseY);

//   img.loadPixels(); 
  
//   for (let j=0; j<img.height; j++){
//     for (let i=0; i<img.width; i++){
//       let index = (i + j*img.width) * 4;

//         img.pixels[index+3] = 255;
//     }
//   }
//   img.updatePixels();
  
//   img.loadPixels();
  
//   for (let j=0; j<img.height; j++){
//     for (let i=0; i<img.width; i++){
//       let index = (i + j*img.width) * 4;
      
//       if (getDistance(i, j, mouseX, mouseY) < 25){

//         img.pixels[index+3] = 0;
//       }
//     }
//   }

//   img.updatePixels();

  
  image(originalImg, 0, 0);
  image(img, 0, 0);
	fadeOut(img, -1);
  fadeIn(originalImg, 1);
  
}

function getDistance(x1, y1, x2, y2){
	let dis = sqrt((x1-x2) * (x1-x2) + (y1-y2)*(y1-y2));
  return dis;
}

function mousePressed(){
  
}
function fadeOut(a, speed){
  a.loadPixels();
  
  for (let j=0; j<a.height; j++){
    for (let i=0; i<a.width; i++){
      let index = (i + j*a.width) * 4;
      if (speed < 0 && a.pixels[index+3] > 0){
        a.pixels[index+3] = a.pixels[index+3] + speed;
      }
    }
  }
  a.updatePixels();
}

function fadeIn(img, speed){
    img.loadPixels();
  
  for (let j=0; j<img.height; j++){
    for (let i=0; i<img.width; i++){
      let index = (i + j*img.width) * 4;

      if (speed > 0 && img.pixels[index+3] < 255){
        img.pixels[index+3] = img.pixels[index+3] + speed;
      }
    }
  }
  img.updatePixels();
}


var bg_default;
var newspaper;

//status
var camera_active;
var camera_down;
var glass_active;
var glass_down;
var time_active;
var time_down;

var currentstatus = 0; 

//tool 
var toolshow = 20;
var bar_bg_p = 860;

var fade = 255;


//alert
var blockbg = 40;

var count1 = 0;
var alert_camera;

var ok_active;
var ok_down;
var alert_camera_status = 0;


function preload() {
  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper = loadImage('asset/background/newspaer.jpg ');

  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');

  alert_camera = loadImage('asset/alert_camera.png ');

  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');


}

function setup() {
  createCanvas(1440, 860);

}



function draw() {
  image(bg_default, 0, 0, 1057, 860);
  image(newspaper, 1057, 0, 383, 860);

  //tool bar

  noStroke();
  fill(30, 30, 30, 50);
  rect(0, bar_bg_p, 1057, 60);


  //   //status1: camera status
  //   if(currentstatus == 1){
  //   image(camera_active,30,bar_bg_p-40,145,110);
  //   image(glass_down,175,bar_bg_p-40,163,110);
  //   image(time_down,338,bar_bg_p-40,117,110);

  //   //focus square following the mouse
  //   noFill();
  //   stroke(255);
  //   rect(mouseX-120,mouseY-70,140,90);
  //   }

  //status2: glass status
  if (currentstatus == 2) {
    image(camera_down, 30, bar_bg_p - 40, 145, 110);
    image(glass_active, 175, bar_bg_p - 40, 163, 110);
    image(time_down, 338, bar_bg_p - 40, 117, 110);

    //zoom in ellipse
    noFill();
    stroke(255);
    ellipse(mouseX - 30, mouseY - 30, 140);
    line(mouseX - 50, mouseY - 30, mouseX - 10, mouseY - 30);
    line(mouseX - 30, mouseY - 50, mouseX - 30, mouseY - 10);
  }

  // if (mouseX>300){

  // }



  //   //status3: time status
  //  	else if(currentstatus ==3){
  //   image(camera_down,30,bar_bg_p-40,145,110);
  //   image(glass_down,175,bar_bg_p-40,163,110);
  //   image(time_active,338,bar_bg_p-40,117,110);
  //   }


  //switch status

  if (mouseX > 0 && mouseX < 175 && mouseY > 750) {
    image(camera_active, 30, bar_bg_p - 40, 145, 110);
    image(glass_down, 175, bar_bg_p - 40, 163, 110);
    image(time_down, 338, bar_bg_p - 40, 117, 110);
    if (mouseIsPressed) {
      currentstatus = 1;
    }
  }


  if (mouseX > 175 && mouseX < 338 && mouseY > 750) {
    image(camera_down, 30, bar_bg_p - 40, 145, 110);
    image(glass_active, 175, bar_bg_p - 40, 163, 110);
    image(time_down, 338, bar_bg_p - 40, 117, 110);
    if (mouseIsPressed) {
      currentstatus = 2;
    }
  }

  if (mouseX > 338 && mouseX < 1057 && mouseY > 750) {
    image(camera_down, 30, bar_bg_p - 40, 145, 110);
    image(glass_down, 175, bar_bg_p - 40, 163, 110);
    image(time_active, 338, bar_bg_p - 40, 117, 110);
    if (mouseIsPressed) {
      currentstatus = 3;
      console.log(currentstatus);
    }
  }

  //get out 工具条
  if (mouseY > 800) {
    bar_bg_p -= toolshow;
    if (bar_bg_p <= 800) {
      bar_bg_p = 800;
    }
  } else if (mouseY > 0 && mouseY < 800) {
    bar_bg_p += toolshow;
    if (bar_bg_p > 880) {
      bar_bg_p = 880;
    }

  }

}

function makeImages() {  //drawa and store the twwo images that will be used
  noStroke();
  translate(width/2, height/2);
  alvos();
  normal=bg_default; 
  scale(1.5);
  alvos();
  magnified=bg_default;
}

function alvos() {
  background(255);
  for (let i=5; i>0; i--) {
    fill(200, 0, 0);
    ellipse(0, 0, i*40, i*40);
    fill(255);
    ellipse(0, 0, i*40-20, i*40-20);
  }
}

var bg_default;
var newspaper;

var ourfont;

var currentstatus = 0; //1= camera, 2 = glass, 3 = time

//tool 
var toolshow = 20;
var bar_bg_p = 860;

var fade = 255;


function preload() {
  ourfont = loadFont('TpldKhangXiDictTrial.otf');

  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper = loadImage('asset/background/newspaer.jpg ');

  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');

  alert_camera = loadImage('asset/alert_camera.png');

  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');


}

function setup() {
  createCanvas(1440, 860);
  textFont(ourfont);
}



function draw() {
  image(bg_default, 0, 0, 1057, 860);
  image(newspaper, 1057, 0, 383, 860);

  alert_camera_show();
  alert_camera_disappear();


  switchstatus();

}var bg_default;
var newspaper;

//status
var camera_active;
var camera_down;
var glass_active;
var glass_down;
var time_active;
var time_down;

var currentstatus = 0; //1= camera, 2 = glass, 3 = time

//tool 
var toolshow = 20;
var bar_bg_p = 860;

var fade = 255;


//alert
var blockbg = 40;

var count1 = 0;
var alert_camera;

var ok_active;
var ok_down;
var alert_camera_status = 0;

// let main;
// let zoom;
// var ctx;
// var zoomCtx;

let mascara;  
let magnified, normal, large;

function preload() {
  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper = loadImage('asset/background/newspaer.jpg ');
  normal=loadImage('asset/background/bg_default.jpg');
  large=loadImage('111.png');

  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');

  alert_camera = loadImage('asset/alert_camera.png ');

  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');


}

function setup() {
  createCanvas(1440, 860);
    makeImages();
  //background(255);
  noCursor();
//   main = createCanvas(1440, 860);
//   console.log(main);
//   zoom = document.getElementById("zoom");
//   ctx = main.elt.getContext("2d")
//   zoomCtx = zoom.getContext("2d");

//   main.elt.addEventListener("mousemove", function(e) {
//     console.log(e);
//     zoomCtx.fillStyle = "white";
//     //zoomCtx.clearRect(0,0, zoom.width, zoom.height);
//     //zoomCtx.fillStyle = "transparent";
//     zoomCtx.fillRect(0, 0, zoom.width, zoom.height);
//     zoomCtx.drawImage(main.elt, e.x, e.y, 500, 500, 0, 0, 400, 200);
//     console.log(zoom.style);
//     zoom.style.top = e.pageY + 10 + "px"
//     zoom.style.left = e.pageX + 10 + "px"
//     zoom.style.display = "block";
//   });

//   main.elt.addEventListener("mouseout", function() {
//     zoom.style.display = "none";
//   });
}



function draw() {
  // image(bg_default, 0, 0, 1057, 860);
  // image(newspaper, 1057, 0, 383, 860);

  
  
  
  //background(255);
fill(0);
ellipse(mouseX, mouseY, 80, 80);
mascara=get();
  //mascara.endDraw();
  normal.mask(mascara);  //aplies the mask to the image, the image now has a hole on it

  //background(255);
  image(magnified, -(mouseX-width/2)/1.9, -(mouseY-height/2)/1.9);   //draws the magnified image underneath the normal image and adjusts its position 
  image(normal, 0, 0, 1057, 860);   //draws the normal image

  strokeWeight(5);
  noFill();
  stroke(150, 0, 0);
  ellipse(mouseX, mouseY, 80, 80); // draws the "lens circle"
  
  
  ////////////////////////////
  //tool bar

  noStroke();
  fill(30, 30, 30, 50);
  rect(0, bar_bg_p, 1057, 60);


  //   //status1: camera status
  //   if(currentstatus == 1){
  //   image(camera_active,30,bar_bg_p-40,145,110);
  //   image(glass_down,175,bar_bg_p-40,163,110);
  //   image(time_down,338,bar_bg_p-40,117,110);

  //   //focus square following the mouse
  //   noFill();
  //   stroke(255);
  //   rect(mouseX-120,mouseY-70,140,90);
  //   }

  //status2: glass status
  if (currentstatus == 2) {
    image(camera_down, 30, bar_bg_p - 40, 145, 110);
    image(glass_active, 175, bar_bg_p - 40, 163, 110);
    image(time_down, 338, bar_bg_p - 40, 117, 110);

    //zoom in ellipse
    noFill();
    stroke(255);
    ellipse(mouseX - 30, mouseY - 30, 140);
    line(mouseX - 50, mouseY - 30, mouseX - 10, mouseY - 30);
    line(mouseX - 30, mouseY - 50, mouseX - 30, mouseY - 10);
  }

  // if (mouseX>300){

  // }



  //   //status3: time status
  //  	else if(currentstatus ==3){
  //   image(camera_down,30,bar_bg_p-40,145,110);
  //   image(glass_down,175,bar_bg_p-40,163,110);
  //   image(time_active,338,bar_bg_p-40,117,110);
  //   }


  //switch status

  if (mouseX > 0 && mouseX < 175 && mouseY > 750) {
    image(camera_active, 30, bar_bg_p - 40, 145, 110);
    image(glass_down, 175, bar_bg_p - 40, 163, 110);
    image(time_down, 338, bar_bg_p - 40, 117, 110);
    if (mouseIsPressed) {
      currentstatus = 1;
    }
  }


  if (mouseX > 175 && mouseX < 338 && mouseY > 750) {
    image(camera_down, 30, bar_bg_p - 40, 145, 110);
    image(glass_active, 175, bar_bg_p - 40, 163, 110);
    image(time_down, 338, bar_bg_p - 40, 117, 110);
    if (mouseIsPressed) {
      currentstatus = 2;
    }
  }

  if (mouseX > 338 && mouseX < 1057 && mouseY > 750) {
    image(camera_down, 30, bar_bg_p - 40, 145, 110);
    image(glass_down, 175, bar_bg_p - 40, 163, 110);
    image(time_active, 338, bar_bg_p - 40, 117, 110);
    if (mouseIsPressed) {
      currentstatus = 3;
      console.log(currentstatus);
    }
  }

  //get out 工具条
  if (mouseY > 800) {
    bar_bg_p -= toolshow;
    if (bar_bg_p <= 800) {
      bar_bg_p = 800;
    }
  } else if (mouseY > 0 && mouseY < 800) {
    bar_bg_p += toolshow;
    if (bar_bg_p > 880) {
      bar_bg_p = 880;
    }

  }
  
  
  

}

function makeImages() {  //drawa and store the twwo images that will be used
  noStroke();
  //push();
  //translate(width/2, height/2);
  //alvos();
  
  image(normal, 0, 0, 1057, 860);
  //scale(5);
  //alvos();
  image(large, 0, 0);
  magnified=get();
  //pop();
  //console.log(normal);
  console.log(magnified);
}

function alvos() {
  background(255);
  for (let i=5; i>0; i--) {
    fill(200, 0, 0);
    ellipse(0, 0, i*40, i*40);
    fill(255);
    ellipse(0, 0, i*40-20, i*40-20);
  }
}

var bg_default;
var newspaper;

//status
var camera_active;
var camera_down;
var glass_active;
var glass_down;
var time_active;
var time_down;

var currentstatus = 0; //1= camera, 2 = glass, 3 = time

//tool 
var toolshow = 20;
var bar_bg_p = 860;

var fade = 255;


//alert
var blockbg = 40;

var count1 = 0;
var alert_camera;

var ok_active;
var ok_down;
var alert_camera_status = 0;

// let main;
// let zoom;
// var ctx;
// var zoomCtx;

let mascara;  
let magnified, normal, large;

function preload() {
  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper = loadImage('asset/background/newspaer.jpg ');
  normal=loadImage('asset/background/bg_default.jpg');
  large=loadImage('111.png');

  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');

  alert_camera = loadImage('asset/alert_camera.png ');

  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');


}

function setup() {
  createCanvas(1440, 860);
    makeImages();
  //background(255);
  noCursor();
//   main = createCanvas(1440, 860);
//   console.log(main);
//   zoom = document.getElementById("zoom");
//   ctx = main.elt.getContext("2d")
//   zoomCtx = zoom.getContext("2d");

//   main.elt.addEventListener("mousemove", function(e) {
//     console.log(e);
//     zoomCtx.fillStyle = "white";
//     //zoomCtx.clearRect(0,0, zoom.width, zoom.height);
//     //zoomCtx.fillStyle = "transparent";
//     zoomCtx.fillRect(0, 0, zoom.width, zoom.height);
//     zoomCtx.drawImage(main.elt, e.x, e.y, 500, 500, 0, 0, 400, 200);
//     console.log(zoom.style);
//     zoom.style.top = e.pageY + 10 + "px"
//     zoom.style.left = e.pageX + 10 + "px"
//     zoom.style.display = "block";
//   });

//   main.elt.addEventListener("mouseout", function() {
//     zoom.style.display = "none";
//   });
}



function draw() {
  // image(bg_default, 0, 0, 1057, 860);
  // image(newspaper, 1057, 0, 383, 860);

  
  
  //background(255);
fill(0);
ellipse(mouseX, mouseY, 80, 80);
mascara=get();
  //mascara.endDraw();
  normal.mask(mascara);  //aplies the mask to the image, the image now has a hole on it

  //background(255);
  image(magnified, -(mouseX-width/2)/1.9, -(mouseY-height/2)/1.9);   //draws the magnified image underneath the normal image and adjusts its position 
  image(normal, 0, 0, 1057, 860);   //draws the normal image

  strokeWeight(5);
  noFill();
  stroke(150, 0, 0);
  ellipse(mouseX, mouseY, 80, 80); // draws the "lens circle"
  
  
  ////////////////////////////
  //tool bar

  noStroke();
  fill(30, 30, 30, 50);
  rect(0, bar_bg_p, 1057, 60);


  //   //status1: camera status
  //   if(currentstatus == 1){
  //   image(camera_active,30,bar_bg_p-40,145,110);
  //   image(glass_down,175,bar_bg_p-40,163,110);
  //   image(time_down,338,bar_bg_p-40,117,110);

  //   //focus square following the mouse
  //   noFill();
  //   stroke(255);
  //   rect(mouseX-120,mouseY-70,140,90);
  //   }

  //status2: glass status
  if (currentstatus == 2) {
    image(camera_down, 30, bar_bg_p - 40, 145, 110);
    image(glass_active, 175, bar_bg_p - 40, 163, 110);
    image(time_down, 338, bar_bg_p - 40, 117, 110);

    //zoom in ellipse
    noFill();
    stroke(255);
    ellipse(mouseX - 30, mouseY - 30, 140);
    line(mouseX - 50, mouseY - 30, mouseX - 10, mouseY - 30);
    line(mouseX - 30, mouseY - 50, mouseX - 30, mouseY - 10);
  }

  // if (mouseX>300){

  // }



  //   //status3: time status
  //  	else if(currentstatus ==3){
  //   image(camera_down,30,bar_bg_p-40,145,110);
  //   image(glass_down,175,bar_bg_p-40,163,110);
  //   image(time_active,338,bar_bg_p-40,117,110);
  //   }


  //switch status

  if (mouseX > 0 && mouseX < 175 && mouseY > 750) {
    image(camera_active, 30, bar_bg_p - 40, 145, 110);
    image(glass_down, 175, bar_bg_p - 40, 163, 110);
    image(time_down, 338, bar_bg_p - 40, 117, 110);
    if (mouseIsPressed) {
      currentstatus = 1;
    }
  }


  if (mouseX > 175 && mouseX < 338 && mouseY > 750) {
    image(camera_down, 30, bar_bg_p - 40, 145, 110);
    image(glass_active, 175, bar_bg_p - 40, 163, 110);
    image(time_down, 338, bar_bg_p - 40, 117, 110);
    if (mouseIsPressed) {
      currentstatus = 2;
    }
  }

  if (mouseX > 338 && mouseX < 1057 && mouseY > 750) {
    image(camera_down, 30, bar_bg_p - 40, 145, 110);
    image(glass_down, 175, bar_bg_p - 40, 163, 110);
    image(time_active, 338, bar_bg_p - 40, 117, 110);
    if (mouseIsPressed) {
      currentstatus = 3;
      console.log(currentstatus);
    }
  }

  //get out 工具条
  if (mouseY > 800) {
    bar_bg_p -= toolshow;
    if (bar_bg_p <= 800) {
      bar_bg_p = 800;
    }
  } else if (mouseY > 0 && mouseY < 800) {
    bar_bg_p += toolshow;
    if (bar_bg_p > 880) {
      bar_bg_p = 880;
    }

  }
  
  
  

}

function makeImages() {  //drawa and store the twwo images that will be used
  noStroke();
  //push();
  //translate(width/2, height/2);
  //alvos();
  
  image(normal, 0, 0, 1057, 860);
  //scale(5);
  //alvos();
  image(large, 0, 0);
  magnified=get();
  //pop();
  //console.log(normal);
  console.log(magnified);
}

function alvos() {
  background(255);
  for (let i=5; i>0; i--) {
    fill(200, 0, 0);
    ellipse(0, 0, i*40, i*40);
    fill(255);
    ellipse(0, 0, i*40-20, i*40-20);
  }
}

var bg_default;
var newspaper;

var people;
var showPeople = false;

var house;
var showHouse = false;

var construction;
var showConstruction = false;

var court;
var showCourt = false;

//status
var camera_active;
var camera_down;
var glass_active;
var glass_down;
var time_active;
var time_down;

var currentstatus = 0; //1= camera, 2 = glass, 3 = time

//tool 
var toolshow = 20;
var bar_bg_p = 860;

var fade = 255;


//alert
var blockbg = 40;

var count1 = 0;
var alert_camera;

var ok_active;
var ok_down;
var alert_camera_status = 0;

// let main;
// let zoom;
// var ctx;
// var zoomCtx;

function preload() {
  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper = loadImage('asset/background/newspaer.jpg ');

  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');

  alert_camera = loadImage('asset/alert_camera.png ');

  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');
  people = loadImage('people.png ');
  house = loadImage('house.jpg ');
  court = loadImage('court.jpg ');
  construction = loadImage('construction.png ');

}

function setup() {
  createCanvas(1440, 860);
  //   main = createCanvas(1440, 860);
  //   console.log(main);
  //   zoom = document.getElementById("zoom");
  //   ctx = main.elt.getContext("2d")
  //   zoomCtx = zoom.getContext("2d");

  //   main.elt.addEventListener("mousemove", function(e) {
  //     console.log(e);
  //     zoomCtx.fillStyle = "white";
  //     //zoomCtx.clearRect(0,0, zoom.width, zoom.height);
  //     //zoomCtx.fillStyle = "transparent";
  //     zoomCtx.fillRect(0, 0, zoom.width, zoom.height);
  //     zoomCtx.drawImage(main.elt, e.x, e.y, 500, 500, 0, 0, 400, 200);
  //     console.log(zoom.style);
  //     zoom.style.top = e.pageY + 10 + "px"
  //     zoom.style.left = e.pageX + 10 + "px"
  //     zoom.style.display = "block";
  //   });

  //   main.elt.addEventListener("mouseout", function() {
  //     zoom.style.display = "none";
  //   });
}

// function mousePressed() {
//   if (mouseX > 235 && mouseX < 295 && mouseY > 300 && mouseY < 380) {
//     showPeople = !showPeople;
//     print(showPeople);
//   }
// }

// function mousePressed() {
//   if (mouseX > 420 && mouseX < 550 && mouseY > 280 && mouseY < 360) {
//     showHouse = !showHouse;
//     print(showHouse);
//   }
// }


// function mousePressed() {
//   if(mouseX>780 && mouseX<1056 && mouseY>180 && mouseY<320) {
//     showCourt = !showCourt;
//     print(showCourt);
//   }
// }

function mousePressed() {
var d = dist(mouseX, mouseY, 870, 660);
  if (d < 190) {
    showConstruction = !showConstruction;
    print(showConstruction);
  }
}




// 
function draw() {
  image(people, 0, 0,1057, 860);
  image(house,0,0,1057, 860);
  image(construction,0,0,1057, 860);
  image(bg_default, 0, 0, 1057, 860);
  image(newspaper, 1057, 0, 383, 860);

  //button 1 people
  stroke(250, 255, 3);
  fill(30, 30, 30, 50);
  rect(235, 300, 60, 80);


  //  function mousePressed(){
  // if(mouseX>235&&mouseX<295&&mouseY>300&&<mouseY<380){

  // }


  //button 2 house
  stroke(250, 255, 3);
  fill(30, 30, 30, 50);
  rect(420, 280, 130, 80);

  // if(mouseX>420 && mouseX<550 && mouseY>280 && <mouseY<360){
  //}


  // //button 3 kongfu
  // stroke(250, 255, 3);
  // fill(30, 30, 30, 50);
  // rect(520, 520, 40, 50);
  // // if(mouseX>520 & mouseX<560 && mouseY>520 && mouseY<570){
  // //}

  //button 4 court
  stroke(250, 255, 3);
  fill(30, 30, 30, 50);
  rect(780, 180, 276, 140);
  // if(mouseX>780 && mouseX<1056 && mouseY>180 && mouseY<320){
  //}

  //button 5 construction
  stroke(250, 255, 3);
  fill(30, 30, 30, 50);
  ellipse(870, 660, 380, 380);
// var d = dist(mouseX, mouseY, 870, 660);
  //   if (d < 190) {
//   showHouse = !showHouse;
//     print(showHouse);
//   }
// }


  // function mousePressed() {

  //   



  //   }
  // }



  //tool bar

  //   noStroke();
  //   fill(30, 30, 30, 50);
  //   rect(0, bar_bg_p, 1057, 60);



  //   //status2: glass status
  //   if (currentstatus == 2) {
  //     image(camera_down, 30, bar_bg_p - 40, 145, 110);
  //     image(glass_active, 175, bar_bg_p - 40, 163, 110);
  //     image(time_down, 338, bar_bg_p - 40, 117, 110);

  //     //zoom in ellipse
  //     noFill();
  //     stroke(255);
  //     ellipse(mouseX - 30, mouseY - 30, 140);
  //     line(mouseX - 50, mouseY - 30, mouseX - 10, mouseY - 30);
  //     line(mouseX - 30, mouseY - 50, mouseX - 30, mouseY - 10);
  //   }



  //   //switch status

  //   // if (mouseX > 0 && mouseX < 175 && mouseY > 750) {
  //   //   image(camera_active, 30, bar_bg_p - 40, 145, 110);
  //   //   image(glass_down, 175, bar_bg_p - 40, 163, 110);
  //   //   image(time_down, 338, bar_bg_p - 40, 117, 110);
  //   //   if (mouseIsPressed) {
  //   //     currentstatus = 1;
  //   //   }
  //   // }


  //   if (mouseX > 175 && mouseX < 338 && mouseY > 750) {
  //     image(camera_down, 30, bar_bg_p - 40, 145, 110);
  //     image(glass_active, 175, bar_bg_p - 40, 163, 110);
  //     image(time_down, 338, bar_bg_p - 40, 117, 110);
  //     if (mouseIsPressed) {
  //       currentstatus = 2;
  //     }
  //   }

  //   if (mouseX > 338 && mouseX < 1057 && mouseY > 750) {
  //     image(camera_down, 30, bar_bg_p - 40, 145, 110);
  //     image(glass_down, 175, bar_bg_p - 40, 163, 110);
  //     image(time_active, 338, bar_bg_p - 40, 117, 110);
  //     if (mouseIsPressed) {
  //       currentstatus = 3;
  //       console.log(currentstatus);
  //     }
  //   }

  //   //get out
  //   if (mouseY > 800) {
  //     bar_bg_p -= toolshow;
  //     if (bar_bg_p <= 800) {
  //       bar_bg_p = 800;
  //     }
  //   } else if (mouseY > 0 && mouseY < 800) {
  //     bar_bg_p += toolshow;
  //     if (bar_bg_p > 880) {
  //       bar_bg_p = 880;
  //     }


  // if (showPeople) {
  //   fadeIn(people, 3);
  //   fadeOut(bg_default, -3);
  // } else {
  //   fadeIn(bg_default, 3);
  //   fadeOut(people, -3);
  // }
  
  // if (showHouse) {
  //   fadeIn(house, 5);
  //   fadeOut(bg_default, -5);
  // } else {
  //   fadeIn(bg_default, 5);
  //   fadeOut(house, -5);
  // }
  
    if (showConstruction) {
    fadeIn(construction, 5);
    fadeOut(bg_default, -5);
  } else {
    fadeIn(bg_default, 5);
    fadeOut(construction, -5);
  }
  




  // function makeImages() {  
  //   noStroke();
  //   translate(width/2, height/2);
  //   alvos();
  //   normal=bg_default; 
  //   scale(1.5);
  //   alvos();
  //   magnified=bg_default;
  // }

  // function alvos() {
  //   background(255);
  //   for (let i=5; i>0; i--) {
  //     fill(200, 0, 0);
  //     ellipse(0, 0, i*40, i*40);
  //     fill(255);
  //     ellipse(0, 0, i*40-20, i*40-20);
  //   }
}


function fadeOut(a, speed) {
  a.loadPixels();

  for (let j = 0; j < a.height; j++) {
    for (let i = 0; i < a.width; i++) {
      let index = (i + j * a.width) * 4;
      if (speed < 0 && a.pixels[index + 3] > 0) {
        a.pixels[index + 3] = a.pixels[index + 3] + speed;
      }
    }
  }
  a.updatePixels();
}

function fadeIn(a, speed) {
  a.loadPixels();

  for (let j = 0; j < a.height; j++) {
    for (let i = 0; i < a.width; i++) {
      let index = (i + j * a.width) * 4;

      if (speed > 0 && a.pixels[index + 3] < 255) {
        a.pixels[index + 3] = a.pixels[index + 3] + speed;
      }
    }
  }
  a.updatePixels();
}var bg_default;
var newspaper;

//status
var camera_active;
var camera_down;
var glass_active;
var glass_down;
var time_active;
var time_down;

var currentstatus = 0; //1= camera, 2 = glass, 3 = time

//tool 
var toolshow = 20;
var bar_bg_p = 860;

var fade =255; 


//alert
var blockbg = 40;

var count1 = 0;
var alert_camera;

var ok_active;
var ok_down;
var alert_camera_status = 0;



function preload(){
  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper = loadImage('asset/background/newspaer.jpg ');
  
  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');
  
  alert_camera = loadImage('asset/alert_camera.png ');
  
  ok_active = loadImage('asset/ok_active.png ');
  ok_down = loadImage('asset/ok_down.png ');
  
  
}

function setup() {
  createCanvas(1440, 860);
}



function draw() {
  image(bg_default,0,0,1057,860);
  image(newspaper,1057,0,383,860);
  
  //tool bar
  
  noStroke();
  fill(30,30,30,50);
  rect(0,bar_bg_p,1057,60);
  
 
  //status1: camera status
  if(currentstatus == 1){
  image(camera_active,30,bar_bg_p-40,145,110);
  image(glass_down,175,bar_bg_p-40,163,110);
  image(time_down,338,bar_bg_p-40,117,110);
  
  //focus square following the mouse
  noFill();
  stroke(255);
  rect(mouseX-120,mouseY-70,140,90);
  }
  
  //status2: glass status
  else if(currentstatus ==2){
  image(camera_down,30,bar_bg_p-40,145,110);
  image(glass_active,175,bar_bg_p-40,163,110);
  image(time_down,338,bar_bg_p-40,117,110);
  
  //zoom in ellipse
  noFill();
  stroke(255);
  ellipse(mouseX-30,mouseY-30,140);
  line(mouseX-50,mouseY-30,mouseX-10,mouseY-30);
  line(mouseX-30,mouseY-50,mouseX-30,mouseY-10);
  }
  
  //status3: time status
 	else if(currentstatus ==3){
  image(camera_down,30,bar_bg_p-40,145,110);
  image(glass_down,175,bar_bg_p-40,163,110);
  image(time_active,338,bar_bg_p-40,117,110);
  }
  
   //switch status
  
  if(mouseX>0 && mouseX<175 && mouseY>750){
  	image(camera_active,30,bar_bg_p-40,145,110);
  	image(glass_down,175,bar_bg_p-40,163,110);
  	image(time_down,338,bar_bg_p-40,117,110);
    if(mouseIsPressed){
    	currentstatus = 1;
    }
  }
  
  
  if(mouseX>175 && mouseX<338 && mouseY>750){
  	image(camera_down,30,bar_bg_p-40,145,110);
  	image(glass_active,175,bar_bg_p-40,163,110);
  	image(time_down,338,bar_bg_p-40,117,110);
    if(mouseIsPressed){
    	currentstatus = 2;
    }
  }
  
   if(mouseX>338 && mouseX<1057 && mouseY>750){
  	image(camera_down,30,bar_bg_p-40,145,110);
  	image(glass_down,175,bar_bg_p-40,163,110);
  	image(time_active,338,bar_bg_p-40,117,110);	
    if(mouseIsPressed){
    	currentstatus = 3;
      console.log(currentstatus);
    }
  }
  
  //get out 
  if(mouseY>800){
    bar_bg_p -= toolshow;
    if(bar_bg_p <= 800)
    {
     bar_bg_p = 800;
    }
  }
  else if(mouseY>0 && mouseY<800){
    bar_bg_p += toolshow;
    if(bar_bg_p>880){
    	bar_bg_p = 880;
    }
   
  }
  
  /*
  background(30,30,30,fade);
  fill(255,255,255,fade);
  textSize(13);
  fill(255,255,255,fade)
  text('Something was happening... something we call news... ',500,500);
  
  count1 ++;
  if(count1>100){
  fade -=1;
  }
 */
  
  count1 ++;
  if(count1>80){
  alert_camera_status =1;
  }
  
  if(alert_camera_status ==1){
  background(0,0,0,blockbg);
  image(alert_camera,500,300,420,295);
  image(ok_down,650,500,105,40);
  }
  
  
}var bg_default;
var newspaper;

//status
var camera_active;
var camera_down;
var glass_active;
var glass_down;
var time_active;
var time_down;

var currentstatus = 0; //1= camera, 2 = glass, 3 = time

//tool 
var toolshow = 20;
var bar_bg_p = 860;

var fade =255; 
var count1 = 0;

//alert
var blockbg = 40;
var alert_camera;

var ok_active;
var ok_down;

var alert_camera_status = 0;



function preload(){
  bg_default = loadImage('asset/background/bg_default.jpg');
  newspaper = loadImage('asset/background/newspaer.jpg ');
  
  camera_active = loadImage('asset/camera.png ');
  camera_down = loadImage('asset/camera_down.png ');
  glass_active = loadImage('asset/glass.png ');
  glass_down = loadImage('asset/glass_down.png ');
  time_active = loadImage('asset/time.png ');
  time_down = loadImage('asset/time_down.png ');
  
  alert_camera = loadImage('asset/alert_camera.png ');
  
  
}

function setup() {
  createCanvas(1440, 860);
}



function draw() {
  image(bg_default,0,0,1057,860);
  image(newspaper,1057,0,383,860);
  
  //tool bar
  
  noStroke();
  fill(30,30,30,50);
  rect(0,bar_bg_p,1057,60);
  
 
  //status1: camera status
  if(currentstatus == 1){
  image(camera_active,30,bar_bg_p-40,145,110);
  image(glass_down,175,bar_bg_p-40,163,110);
  image(time_down,338,bar_bg_p-40,117,110);
  
  //focus square following the mouse
  noFill();
  stroke(255);
  rect(mouseX-120,mouseY-70,140,90);
  }
  
  //status2: glass status
  else if(currentstatus ==2){
  image(camera_down,30,bar_bg_p-40,145,110);
  image(glass_active,175,bar_bg_p-40,163,110);
  image(time_down,338,bar_bg_p-40,117,110);
  
  //zoom in ellipse
  noFill();
  stroke(255);
  ellipse(mouseX-30,mouseY-30,140);
  line(mouseX-50,mouseY-30,mouseX-10,mouseY-30);
  line(mouseX-30,mouseY-50,mouseX-30,mouseY-10);
  }
  
  //status3: time status
 	else if(currentstatus ==3){
  image(camera_down,30,bar_bg_p-40,145,110);
  image(glass_down,175,bar_bg_p-40,163,110);
  image(time_active,338,bar_bg_p-40,117,110);
  }
  
   //switch status
  
  if(mouseX>0 && mouseX<175 && mouseY>750){
  	image(camera_active,30,bar_bg_p-40,145,110);
  	image(glass_down,175,bar_bg_p-40,163,110);
  	image(time_down,338,bar_bg_p-40,117,110);
    if(mouseIsPressed){
    	currentstatus = 1;
    }
  }
  
  
  if(mouseX>175 && mouseX<338 && mouseY>750){
  	image(camera_down,30,bar_bg_p-40,145,110);
  	image(glass_active,175,bar_bg_p-40,163,110);
  	image(time_down,338,bar_bg_p-40,117,110);
    if(mouseIsPressed){
    	currentstatus = 2;
    }
  }
  
   if(mouseX>338 && mouseX<1057 && mouseY>750){
  	image(camera_down,30,bar_bg_p-40,145,110);
  	image(glass_down,175,bar_bg_p-40,163,110);
  	image(time_active,338,bar_bg_p-40,117,110);	
    if(mouseIsPressed){
    	currentstatus = 3;
      console.log(currentstatus);
    }
  }
  
  //get out 
  if(mouseY>800){
    bar_bg_p -= toolshow;
    if(bar_bg_p <= 800)
    {
     bar_bg_p = 800;
    }
  }
  else if(mouseY>0 && mouseY<800){
    bar_bg_p += toolshow;
    if(bar_bg_p>880){
    	bar_bg_p = 880;
    }
   
  }
  
  /*
  background(30,30,30,fade);
  fill(255,255,255,fade);
  textSize(13);
  fill(255,255,255,fade)
  text('Something was happening... something we call news... ',500,500);
  
  count1 ++;
  if(count1>100){
  fade -=1;
  }
 */
  
  count1 ++;
  if(count1>100){
  alert_camera_status =1;
  }
  
  if(alert_camera_status =1){
  background(0,0,0,blockbg);
  image(alert_camera,500,300,420,295);
  }
  
  
}var mapimg;

var clat = 0;
var clon = 0;

var ww = 1024;
var hh = 512;

var zoom = 1;
var earthquakes;
var earthquakes1;
var userInput;
function preload() {
    // The clon and clat in this url are edited to be in the correct order.
    mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
        clon + ',' + clat + ',' + zoom + '/' +
        ww + 'x' + hh +
        '?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw');
    earthquakes1 = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
    earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

function mercX(lon) {
    lon = radians(lon);
    var a = (256 / PI) * pow(2, zoom);
    var b = lon + PI;
    return a * b;
}

function mercY(lat) {
    lat = radians(lat);
    var a = (256 / PI) * pow(2, zoom);
    var b = tan(PI / 4 + lat / 2);
    var c = PI - log(b);
    return a * c;
}


function setup() {
    createCanvas(ww, hh);
    translate(width / 2, height / 2);
    imageMode(CENTER);
    image(mapimg, 0, 0);

    var cx = mercX(clon);
    var cy = mercY(clat);

    for (var i = 1; i < earthquakes.length; i++) {
        var data = earthquakes[i].split(/,/);
        //console.log(data);
        var lat = data[1];
        var lon = data[2];
        var mag = data[4];
        var x = mercX(lon) - cx;
        var y = mercY(lat) - cy;
        // This addition fixes the case where the longitude is non-zero and
        // points can go off the screen.
        if (x < -width / 2) {
            x += width;
        } else if (x > width / 2) {
            x -= width;
        }
        mag = pow(10,mag);
        mag = sqrt(mag);
        var magmax = sqrt(pow(10, 10));
        var d = map(mag, 0, magmax, 0, 180);
        stroke(255, 255, 255);
        fill(255, 255, 255, 200);
        ellipse(x, y, d, d);
    }

 for (var i = 1; i < earthquakes1.length; i++) {
        var data = earthquakes1[i].split(/,/);
        //console.log(data);
        var lat = data[1];
        var lon = data[2];
        var mag = data[4];
        var x = mercX(lon) - cx;
        var y = mercY(lat) - cy;
        // This addition fixes the case where the longitude is non-zero and
        // points can go off the screen.
        if (x < -width / 2) {
            x += width;
        } else if (x > width / 2) {
            x -= width;
        }
        mag = pow(mag,10);
        mag = sqrt(mag);
        var magmax = sqrt(pow(10, 10));
        var d = map(mag, 0, magmax, 0, 180);
        stroke(255, 0, 255);
        fill(255, 0, 255, 200);
        ellipse(x, y, d, d);
    }

}var bg_default;
var newspaper;


var toolshow = 20;
var bar_bg_p = 860;

var focus;

function preload(){
  bg_default = loadImage('bg_default.jpg');
  newspaper = loadImage('newspaer.jpg ');
}

function setup() {
  createCanvas(1440, 860);
}



function draw() {
  image(bg_default,0,0,1057,860);
  image(newspaper,1057,0,383,860);
  
  //tool bar
  //background 
  noStroke();
  fill(30,30,30,50);
  
  rect(0,bar_bg_p,1057,60);
  
  if(mouseY>800){
    bar_bg_p -= toolshow;
    if(bar_bg_p <= 800)
    {
     bar_bg_p = 800;
    }
  }
  else if(mouseY>0 && mouseY<800){
    bar_bg_p += toolshow;
    if(bar_bg_p>860){
    	bar_bg_p = 860;
    }
   
  }
  
  
  
  
  
  
}var bg;

function preload(){
  bg = loadImage('asset/background/bg_origin.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}



function draw() {
	//background(220);
  image(bg,0,0,windowWidth, windowHeight);
  
  noFill();
  stroke(255);
  rect(mouseX-120,mouseY-70,140,90);
  
  
}var bubble={
  x:300,
  y:200,
  display:function(){
  stroke(255);
  strokeWeight(4);
  noFill();
    ellipse(this.x,this.y,20,20);
},
  move:function(){
   this.x=this.x+random(-1,1);
  this.y=this.y+random(-1,1);
}
}
function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  bubble.move();
  bubble.display();
}


// function move(){
//   bubble.x=bubble.x+random(-1,1);
//   bubble.y=bubble.y+random(-1,1);
// }

// function display(){
//   stroke(255);
//   strokeWeight(4);
//   noFill();
//   ellipse(bubble.x,bubble.y,24,24);
// }var trump, iceburg, hairDryer, pen;
var cannon_position
var col = {
  r: 200,
  g: 10,
  b: 100
};
var x = 200
var y = 150
var s = 80
var tail1 = 150
var tail2 = 150
var wing1 = 90
var wing2 = 110
var bo = {
  r1: 30,
  r2: 30
};
var speed = 3
var shot = {
  x: 200,
  y: 120,
  r1: 100,
  r2: 100
};



function setup() {
  createCanvas(800, 700);
  ellipseMode(CENTER);
  rectMode(CENTER);
  imageMode(CENTER);
  frameRate(40)
  trump = createImg('trumpClimateChangeNoBackground.png')
  trump.size(300, 200)
  hairDryer = createImg('electric-hair-dryer.png')
  hairDryer.size(100,100)
  pen = createImg('pen.gif')
  pen.size(120,120)
  
  
  iceburge = createImg('ice-1 2.png')
  iceburge.size(800,100)
  iceburge.position(0,0)
  poop = createImg('assets/dumb1.gif')
  poop.size(30, 30)
  explo = createImg('assets/yellowexplosion.gif') 
  explo1 = createImg('assets/peoppleexplosion.gif')
 
}

function draw() {
  noStroke()

   background(0,190,222);
  //Trump
  tPostion = trump.position(mouseX, height - 170)
  hairDryer.position(mouseX +30, height -135)

   
  //mousePress SHOOT
  if (mouseIsPressed) {
    // background(col.r = random(0, 100), col.g = random(100, 255), col.b = random(150, 250));
    // fill(col.r = random(200, 255), col.g = random(230, 255), 0);
    // ellipse(tPostion + 230, cannon_position, bo.r1 = random(25, 40), bo.r2 = random(25, 40));
    // arc(tPostion + 230, cannon_position + 35, 120, 50, 4.25, 4.9)
    // fill(col.r = random(120, 255), col.g = random(80, 180), 0)
    // ellipse(tPostion + 230, cannon_position, 25, 25);
    // cannon_position = cannon_position - 10
    // // canon_sound.play()
    // if (cannon_position <= 0){
    // 	cannon_position = height - 87;
    // }
    background(col.r = random(0, 100), col.g = random(100, 255), col.b = random(150, 250));
    fill(col.r = random(200, 255), col.g = random(230, 255), 0);
    ellipse(mouseX + 40, mouseY, bo.r1 = random(25, 40), bo.r2 = random(25, 40));
    arc(mouseX + 40, mouseY + 35, 120, 50, 4.25, 4.9)
    fill(col.r = random(120, 255), col.g = random(80, 180), 0)
    ellipse(mouseX + 40, mouseY, 25, 25);
    mouseY = mouseY - 10
  }
  //explosion shoot meet bird
  if(dist(mouseX+230,mouseY,x,y-100)<37.5){
  explo.position(x-100,y-270)
  explo.show()
  }else{
  explo.hide()
  } 
  //explosion poop meet shake
    if(dist(shot.x,shot.y,mouseX, height - 180) < 100){
  explo1.position(mouseX-30, height - 360)
  explo1.size(300,400)
  explo1.show()
  }else{
  explo1.hide()
  } 
  
  //bird1
  // noStroke()
  // fill(r = random(0, 255), g = random(40, 90), b = random(100, 255));
  // ellipse(x, y - 100, 40, 50);
  // ellipse(x, y - 130, 25, 25);
  // triangle(x, y - 120, x, y - 140, x + 20, y - 135)
  // triangle(x - 13, y - 120, x - 30, wing1 = random(100, 120), x - 30, wing2)
  // triangle(x + 13, y - 120, x + 30, wing2 = random(85, 110), x + 30, wing1)
  // triangle(x, y - 80, x - 15, tail1 = random(120, 140), x + 15, tail2 = random(120, 140))
  pen.position(x,y)
  if (x > width) {
    speed = -3
  }
  if (x < -100) {
    speed = 3
  }
  x += speed;


  //falling poop
  poop.position(shot.x, shot.y)
  if (shot.x > width) {
    speed = -3
  }
  if (shot.x < 0) {
    speed = 3
  }
  shot.x = shot.x + speed;

  //fall dump
  shot.y = shot.y + 2
  if (shot.y > 250) {
    shot.y = shot.y + 3
  }
  if (shot.y > height + 100) {
    shot.y = 120
  }
  

 
}var video;
var vScale = 20;
var r, g, b;
var i=0;
var j = 300;
var rectw = 40;
var recth = 40;

function setup() {
  createCanvas(400, 400);
  pixelDensity(10);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  video.hide();
}

function draw() {


  video.loadPixels();
  loadPixels();
  for (var y = 0; y < video.height/1.5; y++) {
    for (var x = 0; x < video.width/1.5; x++) {
      var index = (video.width - x + 1 + (y * video.width)) * 4
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      var bright = (r + g + b) / 0.9;

      var w = map(bright, 0, 255, 0, vScale);

      //noStroke();
      fill(r, g, b);
      rectMode(CENTER);
      rect(x * vScale, y * vScale, w, w);
    }
  }
  if(mouseIsPressed){
  	press = true;
  }
  else{
  	press = false;
  }
  
  if(press && !lastpress ){
  	rect(i,j,rectw,recth);
    i = i+rectw;
  	if(i>(width-rectw)){
    	i = 0;
      j = j+recth;
    }
    if(j>(height-recth)){
    	i = 0;
      j= 200;
    }
  }
  
  lastpress = press;
}var video;

var vScale = 20;

var r, g, b;

function setup() {
  createCanvas(400, 400);
  pixelDensity(10);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  video.hide();
}

function draw() {

  video.loadPixels();
  loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width)) * 4
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];

      var bright = (r + g + b) / 0.9;


      var w = map(bright, 0, 255, 0, vScale);

      noStroke();
      fill(r, g, b);
      rectMode(CENTER);
      rect(x * vScale, y * vScale, w, w);

    }
  }
}var video;
var vScale=16;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
}

function draw() {
  background(51);

  video.loadPixels();
  loadPixels();

  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      
      var index = (x + y * video.width) * 4;
      var r=video.pixels[index + 0];
      var g=video.pixels[index + 1];
      var b=video.pixels[index + 2];
      
      var bright=(r+g+b)/3
      var w=map(bright,0,255,0,vScale)
     // noStroke();
      fill(bright);
      rect(x*vScale,y*vScale,w,w)
      // pixels[index + 0] = r;
      // pixels[index + 1] = g;
      // pixels[index + 2] = b;
      // pixels[index + 3] = 255;
    }

  }

  // updatePixels();
}var video;
var vScale=16;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
}

function draw() {
  background(51);

  video.loadPixels();
  loadPixels();

  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      
      var index = (x + y * video.width) * 4;
      var r=video.pixels[index + 0];
      var g=video.pixels[index + 1];
      var b=video.pixels[index + 2];
      
      var bright=(r+g+b)/3
      var w=map(bright,0,255,0,vScale)
     // noStroke();
      fill(bright);
      rect(x*vScale,y*vScale,w,w)
      // pixels[index + 0] = r;
      // pixels[index + 1] = g;
      // pixels[index + 2] = b;
      // pixels[index + 3] = 255;
    }

  }

  // updatePixels();
}var video;
var button;
var snapshots = [];
var counter=0;
var total=63;

function setup() {
  createCanvas(800, 240);
  background(51);
  video = createCapture(VIDEO,ready);
  video.size(320, 240);
 // button = createButton('snap');
 // button.mousePressed(takesnap);
  //video.hide();
}
var go=false;

function ready(){
  go=true;
}

// function takesnap() {
  
//  // image(video, 0, 0);
// }

function draw() {
  if(go){
  snapshots[counter]=video.get();
    counter++;
  if(counter==total){
    counter=0;
  }
    }
  var w=80;
  var h=60;
  var x=0;
  var y=0;
  for ( var i=0;i<snapshots.length;i++){
//tint(255,50);
  
    var index=(i+frameCount)% snapshots.length;
    image(snapshots[index],x,y,w,h);
    x=x+w;
    if(x>width){
      x=0;
      y=y+h;
    }
  }
  // tint(255,10,150)
  //image(video,mouseX,0);
}
var video;
var targetColor = [255, 0, 0]

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height)
  video.hide();
}

function draw() {
  image(video, 0, 0);
  var winningX=0;
  var winningY=0;
  var worldRecord = 8888888888;
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      //for every row 
      //for every column
      //all the pixels
      var thisPixel = video.get(x, y);
      var diffBetweebColors=dist(thisPixel[0],thisPixel[1],thisPixel[2],targetColor[0],targetColor[1],targetColor[2] )
      if(diffBetweenColors<worldRecord){
       winningX=x;
        winningY=y;
        worldRecord=diffBetweenColors;
        
      }
// r=video.pixels[0]
      // g=video.pixels[1]
      // b=video.pixels[2]
      // r=video.pixels[1]
      // if (thisPixel close to target pixel)
    }
  }
}
ellipse(winningX,winningY,20,20)

var data;

function preload() {
  data = loadJSON("birds.json");
}

function setup() {
  noCanvas();
  // createCanvas(400, 400);
  //var bird = data.birds[1].members[2];
 // createP(bird);
  var birds=data.birds;
  for(var i=0;i<birds.length;i++){
    createElement('h1',birds[i].family);
    var members=birds[i].members;
    for(var j=0;j<members.length;j++){
      createDiv(members[j]);
    }
  }
 
  //flower = loadJSON("flower.json");
  //   {
  //   name: "sunflower",
  //   col: color(200, 220, 0)
  // }


  // function draw() {
  //   background(0);
  //   fill(flower.r,flower.g,flower.b);
  //   text(flower.name, 10, 50);
  //var bird=data.birds[1].members[2];

  //   var birds=data.birds;
  //   for (var i=0;i<birds.length;i++){
  //     createElement('h1',)
  //   createP(bird);

}var data;

function preload() {
  data = loadJSON("birds.json");
}

function setup() {
  noCanvas();
  // createCanvas(400, 400);
  var bird = data.birds[1].members[2];
  createP(bird);
  //flower = loadJSON("flower.json");
  //   {
  //   name: "sunflower",
  //   col: color(200, 220, 0)
  // }


  // function draw() {
  //   background(0);
  //   fill(flower.r,flower.g,flower.b);
  //   text(flower.name, 10, 50);
  //var bird=data.birds[1].members[2];

  //   var birds=data.birds;
  //   for (var i=0;i<birds.length;i++){
  //     createElement('h1',)
  //   createP(bird);

}// var data;
// function preload(){
//   date=loadJSON("birds.json");
// }
var flower;

function preload(){
  flower=loadJSON("flower.json");
}
function setup() {
  //noCanvas();
  createCanvas(400, 400);
  flower = loadJSON("flower.json");
  //   {
  //   name: "sunflower",
  //   col: color(200, 220, 0)
  // }
}

function draw() {
  background(0);
  fill(flower.r,flower.g,flower.b);
  text(flower.name, 10, 50);
  //var bird=data.birds[1].members[2];

  //   var birds=data.birds;
  //   for (var i=0;i<birds.length;i++){
  //     createElement('h1',)
  //   createP(bird);

}var bubble={
  x:300,
  y:200,
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);
  move();
  display();
}

function move(){
  bubble.x// Declare a "SerialPort" object
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
  
}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem14401'; // fill in your serial port name here
var inData; // for incoming serial data

var bird;
var pipes = [];

function serialEvent() {
  inData = Number(serial.read());
}
// var options = {
//   baudrate: 9600
// }; // change the data rate to whatever you wish
// serial.open(portName, options);

function serverConnected() {
  println('connected to server.');
}

function portOpen() {
  println('the serial port opened.')
}

function serialEvent() {

}

function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}

function portClose() {
  println('The serial port closed.');
}

function setup() {
  createCanvas(600, 600);
  bird = new bird();
  pipes.push(new Pipe());

serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);  
  
  function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
      // Display the list the console:
      println(i + " " + portList[i]);
    }
    
    // variable to hold an instance of the serialport library
    var portName = '/dev/cu.usbmodem14401'; // fill in your serial port name here
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing

    serial.list(); // list the serial ports
    serial.open(portName);
	}
}
  function draw() {
    background(220);
    bird.show();
    text("sensor value: " + inData, 30, 30);

    if (frameCount % 100 == 0) {
      pipes.push(new Pipe());
    }

    for (var i = 0; i < pipes.length; i++) {
      pipes[i].show();
      pipes[i].update();

    }
  }
  // function keyPressed() {
  //   if (key == ' ') {
  //     bird.show();
  //   }
  // }// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas


// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log("DATA: " + currentString); // println the string
  latestData = currentString; // save it for the draw method
}

function draw() {
 
}

var bird;
var pipes = [];

function setup() {
  createCanvas(400, 600);
  bird = new bird();
  pipes.push(new Pipe());

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);

}

function draw() {
  background(0);
  bird.update();
  bird.show();


  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    if (pipes[i].offscreen())
      pipes.splice(i,1);
    
    {
    }

  }
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
  }
}var serial; 
var portName = "/dev/cu.usbmodem14601";
var inData

var bird;
var pipes = [];

function serialEvent() {
	print(serial.read())
  inData = Number(serial.read());
}

function setup() {
  createCanvas(600, 600);
  bird = new bird();
  pipes.push(new Pipe());
  serial = new p5.SerialPort(); // make a new instance of the serialport library
 	serial.on('list', printList);
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.list();        
}

function printList(portList) {
 for (var i = 0; i < portList.length; i++) {
   println(i + " " + portList[i]);
 }
}

function draw() {
  // print(inData)
  background(220);
  bird.update();
  bird.show();
  text("sensor value: " + inData, 30, 30);

  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }

  for (var i = 0; i < pipes.length; i++) {
    pipes[i].show();
    pipes[i].update();

  }
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
  }
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
  
}var serial;
var portName='/dev/u.usbmodem14401';
var inData=0;

function setup() {
  serial=new p5.SerialPort();
  serial.on('list',printList);
  serial.on('date',serialEvent);
  serial.open(portName);
  createCanvas9(400,400);
  
}

function serialEvent() {
  inDate=Number(serial.read());
print("Got:"+inData);
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(500, 300);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem14601");
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
  
}var myButton;

function setup() {
  createCanvas(400, 400);
  myButton=createButton("Press");
  myButton.position(100,100);
  myButton.mousePressed(function(){
  ellipse(random(width),random(height),20,20);
}
);
  
}

function draw() {
  // background(220);
}

function preload() {
  img = loadImage("light.png");
}

class Circle {
  constructor(x, y, diam) {
    this.x = x;
    this.y = y;
    this.diam = diam;
  }

   show(){
        ellipse(this.x, this.y, this.diam, this.diam);
    }
}

let circles = [];

function setup() {
  createCanvas(1000, 600);

  for (let i = 0; i < 10; i++) {
    let newCirc = new Circle(random(0, width), random(0, height),300);
    circles.push(newCirc);
  }
}


function draw() {
  background(0);
  image(img, 0, 0);
  noStroke(255);
  fill(253, 255, 154, (10, 200));

  for (let i = 0; i < circles.length; i++) {
    ellipse(circles[i].x, circles[i].y,
      circles[i].diam, circles[i].diam);
    if (circles[i].diam > 0) {
      circles[i].diam -= 1;
    }
  }
}

function mousePressed() {
  let newCirc = new Circle(mouseX, mouseY,
    200);
  circles.push(newCirc);
}var Circle0;

function setup() {
  createCanvas(0, 600);
  Circle0 = new Circle();
}


  
}



var Circle0;

function setup() {
  createCanvas(0, 600);
  Circle0 = new Circle();
}

function draw() {
  background(1000, 600);
  Circle0.show();
  
}

var Circle0;

function setup() {
  createCanvas(0, 600);
  Circle0 = new Circle();
}

function draw() {
  background(1000, 600);
  
}

function preload() {
  img = loadImage("light.png");
}

class Circle {
  constructor(x, y, diam) {
    this.x = x;
    this.y = y;
    this.diam = diam;
  }

  show() {
    ellipse(this.x, this.y, this.diam, this.diam);
  }

  display() {
    if (this.diam > 0) {
      this.diam -= 1;

    }
  }
}

let circles = [];

function setup() {
  createCanvas(1000, 600);

  for (let i = 0; i < 10; i++) {
    let newCirc = new Circle(random(0, width), random(0, height), 300);
    circles.push(newCirc);
  }
}


function draw() {
  background(0);
  image(img, 0, 0);
  noStroke(255);
  fill(253, 255, 154, (10, 200));

  for (let i = 0; i < circles.length; i++) {
    circles[i].show();
    circles[i].display();

  }
}

function mousePressed() {
  let newCirc = new Circle(mouseX, mouseY,
    200);
  circles.push(newCirc);
}// ----------------------------
// Parent class (or superclass)
// ----------------------------
class Circle {
  constructor(x = 50, y = 50, r = 100, col = '#f00') {
    this.x = x;
    this.y = y;
    this.r = r;
    this.col = col;
    this.vx = random(-5,5);
    this.vy = random(-5,5);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    return this;
  }

  draw() {
    fill(this.col);
    ellipse(this.x,this.y,this.r);
    return this; // allows method chaining
  }
}

// ----------------------------
// Child class (or subclass)
// ----------------------------
class BouncingCircle extends Circle {
  constructor(x = 50, y = 50, r = 50, col = '#0f0') {
    super(x, y, r, col);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    // reverse direction ('bounce')
    if(!this.onScreen()) {
      this.vx *= -1;
      this.vy *= -1;
    }
    return this; // allows method chaining
  }

  onScreen() {
    if(this.x - (this.r / 2) < 0 || this.x + (this.r / 2) > width || this.y - (this.r / 2) < 0 || this.y + (this.r / 2) > height) { return false; }
    return true;
  };
}

// -------------------------------
// Code to use the above 'classes'
// -------------------------------
let circles = [];

function setup() {
  createCanvas(400,400);
  background(0);
}

function draw() {
  background(0);
  for(let i = 0; i < circles.length; i++) {
    circles[i].move().draw(); // method chaining
  }
}

function mousePressed() {
  // clicking on the left half of the screen creates bouncing circles
  if(mouseX > width / 2) {
    circles.push( new BouncingCircle(mouseX, mouseY) );
  }
  else {
    circles.push( new Circle(mouseX, mouseY) );
  }
}function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(48, 201, 243);
  photoframe();
  plant();
  tube();


  function photoframe() {
    rectMode(CENTER);
    var rx1 = 650;
    var rx2 = 450;
    var ex1 = 100;
    var ex2 = 50;
    noStroke();
    fill(50, 179, 228);
    rect(400, 250, rx1, rx2); //outer
    fill(31, 196, 198);
    rect(400, 250, rx1 - 100, rx2 - 100, 80); //inner

    fill(255, 255, 255);
    ellipse(ex1, ex2, 25, 25); //L decoration up

    // ellipse(400, 50, 25, 25); //M decoration up
    ellipse(ex1 + 600, ex2, 25, 25); //R decoration up
    ellipse(ex1, 450, ex2 / 2, 25); //L decoration down
    ellipse(ex1 + 300, ex2 * 9, 25, 25); //M decoration down 
    ellipse(ex1 + 600, ex2 * 9, 25, 25); //R decoration down
  }


  function plant() {
    stroke(107, 31, 1); //L&R Plant
    strokeWeight(3);
    //stem
    fill(254, 206, 156);
    rect(90, 400, 10, 100);

    //thorn
    fill(255);
    triangle(100, 305, 110, 330, 120, 315); //R
    triangle(80, 305, 70, 330, 60, 315); //L

    fill(21, 195, 0); //L plant
    arc(90, 340, 80, 80, -1 / 4 * PI, -3 / 4 * PI, PIE); //L plant
    fill(17, 125, 1);
    rect(718, 350, 30, 100, 100, 100, 0, 0); //R cactus3 M
    fill(21, 195, 0); //L plant
    rect(730, 380, 30, 80, 100, 100, 0, 0); //R cactus1 L
    rect(700, 380, 40, 120, 100, 100, 0, 0); //R cactus2 R
    //plant details
    stroke(17, 125, 2);
    point(730, 400);
    point(735, 380);
    point(710, 340);
    point(700, 360);
    point(710, 375);
    point(730, 400);
    point(695, 395);
    fill(255, 227, 143); //plant point
    noStroke();
    ellipse(62, 325, 5, 5); //point0 L
    ellipse(60, 340, 5, 5); //point1 L
    ellipse(62, 350, 5, 5); //point2 L
    ellipse(68, 360, 5, 5); //point3 L
    ellipse(76, 350, 5, 5); //point4 L
    ellipse(79, 365, 5, 5); //point4 L

    ellipse(115, 325, 5, 5); //point0 R
    ellipse(120, 340, 5, 5); //point1 R
    ellipse(118, 350, 5, 5); //point2 R
    ellipse(112, 360, 5, 5); //point3 R
    ellipse(105, 350, 5, 5); //point4 R
    ellipse(102, 365, 5, 5); //point6 R
  }

  function tube() {
  //tube
  stroke(107, 31, 1); //L&R Plant
  strokeWeight(3);
  fill(17, 186, 0); //Color
  rect(90, 470, 85, 50, 0, 0, 10, 10); //L, Tube down
  rect(90, 430, 120, 40, 10, 10, 10, 10); //L,Tube up

  rect(710, 470, 85, 50); //R,tube down
  rect(710, 430, 120, 40); //R,tube up
    //tube details
  noStroke();
  fill(170, 231, 19);
  rect(62, 480, 10, 27, 100, 100, 0, 0); //
  rect(85, 474, 16, 40, 100, 100, 0, 0); //
  rect(100, 480, 8, 27, 100, 100, 0, 0); //
  stroke(255);
  strokeWeight(5);
  line(37, 417, 37, 441);
  line(53, 455, 53, 485);
  line(757, 417, 757, 441);
  line(745, 455, 745, 485);
    
  }


  //function Body(){
  stroke(225);
  strokeWeight(3);
  fill(241, 202, 190); //arm
  triangle(290, 240, 330, 240, 200, 330); //L arm
  triangle(510, 240, 470, 240, 580, 150); //R arm

  noStroke(225);
  fill(59, 101, 167); //hat
  ellipse(400, 80, 94, 65); //hat 1
  rect(400, 101, 94, 50); //hat 2
  fill(241, 202, 190); //
  stroke(255);
  strokeWeight(2);
  arc(400, 145, 97, 100, -7 / 8 * PI, -1 / 8 * PI, CHORD); //forehead

  //Attempt to use bezier for curve line of hat, but failed :(
  //bezier(350, 90,360, 90, 355, 80, 355, 80, 0, 0, 100, 0);

  //Attempt to use bezier for curve line of hat, succeed!
  strokeWeight(2);
  noFill();
  beginShape();
  vertex(355, 98);
  bezierVertex(355, 70, 445, 70, 445, 98);
  endShape();

  //face
  fill(241, 202, 190);
  noStroke();
  beginShape();
  vertex(355, 125); //L up
  vertex(445, 125); //R up
  vertex(445, 180); //R M
  vertex(430, 200); //R down
  vertex(370, 200); //L down
  vertex(355, 180); //L M
  endShape(CLOSE);
  //rect(400,60,80,60,30,30,30,30);

  //Attempt to use bezierVertex for mouth, but failed :(
  //     strokeWeight(5);
  //     point(420, 175);//A
  //     point(420,210);//B
  //     point(380, 210);//C
  //     point(380, 175);//D

  //     stroke(244, 122, 158);
  //     point(50, 80);
  //     point(60, 25);
  //     point(30, 20);

  //     stroke(0);
  //     strokeWeight(1);
  //     beginShape();
  //     vertex(420, 175);
  //     bezierVertex(420, 210, 380, 210, 380, 175);//
  //     bezierVertex(0, 0, , 420, 175);//
  //     endShape();

  //switch to use arc for mouth, succeed!
  fill(237, 151, 153);
  stroke(237, 151, 153);
  arc(400, 160, 40, 80, 0, PI, CHORD);
  //tooth
  fill(255);
  noStroke();
  rect(400, 168, 38, 6);


  //Eye
  fill(255); //white part of the eye
  ellipse(380, 140, 20, 25); //L w eye
  ellipse(420, 140, 20, 25); //R w eye
  fill(0); //eyeball
  noStroke();
  ellipse(380, 140, 8, 10); //L b eye
  ellipse(420, 140, 8, 10); //L b eye

  //Eyebrow
  fill(126, 90, 74);
  beginShape(); //L eyebrow
  vertex(370, 110); //top
  vertex(395, 120); //R 
  vertex(370, 115); //M
  vertex(360, 120); //L
  endShape(CLOSE);

  beginShape(); //R eyebrow
  vertex(430, 110); //top
  vertex(440, 120); //R 
  vertex(430, 115); //M
  vertex(405, 120); //L
  endShape(CLOSE);

  //beard 1
  fill(126, 90, 74); //beard 
  beginShape(); //
  vertex(400, 155); //top
  vertex(355, 165); //R 
  //beard 2
  vertex(445, 165); //L
  endShape(CLOSE);
  beginShape(); //
  vertex(355, 165); //1
  vertex(365, 180); //2 
  vertex(375, 180); //3
  vertex(390, 200); //4 mouth down L
  vertex(410, 200); //5
  vertex(425, 180); //6
  vertex(435, 180); //7
  vertex(445, 165); //8 Top R
  vertex(445, 180); //9
  vertex(418, 215); //10
  vertex(382, 215); //11
  vertex(355, 180); //12

  endShape(CLOSE);

  //Clothes;
  fill(197, 206, 228); //shirt
  rect(400, 320, 140, 200);

  //Glasses
  noFill();
  stroke(111, 100, 93);
  strokeWeight(2);
  rect(376, 140, 40, 35, 10, 10, 20, 15);
  rect(426, 140, 40, 35, 10, 10, 15, 20);
  strokeWeight(4);
  line(397, 130, 405, 130);

  //overalls
  noStroke();
  fill(39, 85, 126);
  quad(320, 300, 480, 300, 500, 425, 300, 425); //overalls
  rect(350, 260, 20, 80); // belt L
  rect(450, 260, 20, 80); //belt R
  fill(255); //button
  ellipse(350, 305, 10, 10); //Up button L
  ellipse(450, 305, 10, 10); //Up button R

  //Pocket
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(400, 365, 130, 80, 0, 0, 50, 50);
  line(370, 330, 370, 403); //L
  line(430, 330, 430, 403); //R

  fill(180);
  ellipse(370, 330, 8, 8); // Down button L
  ellipse(430, 330, 8, 8); //Down button R

  //Neckerchief
  strokeWeight(3);
  fill(246, 101, 104);
  triangle(355, 200, 445, 210, 400, 320);

  //details yifu
  noFill();
  stroke(255);
  strokeWeight(1);
  ellipse(400, 300, 5, 5);
  ellipse(395, 290, 5, 5);
  ellipse(405, 288, 5, 5);
  ellipse(392, 280, 5, 5);
  ellipse(409, 278, 5, 5);
  ellipse(389, 270, 5, 5);
  ellipse(411, 268, 5, 5);
  ellipse(385, 260, 5, 5);
  ellipse(416, 260, 5, 5);
  ellipse(383, 250, 5, 5);
  ellipse(379, 240, 5, 5);
  ellipse(420, 247, 5, 5);
  ellipse(374, 230, 5, 5);
  ellipse(425, 235, 5, 5);
  ellipse(371, 220, 5, 5);
  ellipse(430, 225, 5, 5);
  ellipse(366, 210, 5, 5);
  ellipse(432, 215, 5, 5);

  








  //     curve exercise,still confused :( 

  //     noFill();
  //     stroke(55, 102, 0);
  //     curve(5, 26, 5, 26, 73, 24, 73, 61);
  //     stroke(0);
  //     curve(5, 26, 73, 24, 73, 61, 15, 65);
  //     stroke(255, 102, 0);
  //     curve(73, 24, 73, 61, 15, 65, 15, 65);

  //     strokeWeight(5);
  //   point(30, 20);
  //   point(80, 20);
  //   point(80, 75);
  //   point(30, 75);

  //   stroke(244, 122, 158);
  //   point(50, 80);
  //   point(60, 25);
  //   point(30, 20);

  //   stroke(0);
  //   strokeWeight(1);
  //   beginShape();
  //   vertex(30, 20);
  //   bezierVertex(80, 20, 80, 75, 30, 75);
  //   bezierVertex(50, 80, 60, 25, 30, 20);
  //   endShape();
}var myCircles = [];


function setup() {
  createCanvas(400, 400);
  for (var i = 0; i < 100; i++) {
    myCircles.push(new Circle(i * 5, i * 5));
  }
}


function draw() {
  background(220);
  for (var x = 0; x <= width; x=x+50) {
    myCircles[x].displayIt();
  }
}
//build a factory
function mousePressed() {
  for (var i = 0; i < 100; i++) {
    if (myCircles[i].amINear() < 10) {
      print("Clicked On One")
    }

  }
}
class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  displayIt() {
    ellipse(this.x, this.y, 20, 20);
    this.x += random(-2, 2);
    this.y += random(-2, 2);
  }
  amINear() {
    return dist(this.x, this.y, mouseX, mouseY);
  }
}var myCircles = [];

class circle {
  constructor(time) {
    this.t = time;
  }
  turn(x, y) {
    var xStart = map(mouseX, 0, width, -PI, PI);
    var yStart = map(mouseY, 0, height, -PI, PI);

    // angle
    var angle = xStart + yStart;
    var X0 = x + 40 * cos(PI * this.t + angle);
    var Y0 = y + 40 * sin(PI * this.t + angle);

    ellipse(1.5 * X0, 1.5 * Y0, 3);
  }

}


function setup() {
  createCanvas(600, 400);
  noStroke();
  fill(0);
  for (var i = 0; i <= 100; i++) {
    myCircles.push(new circle(random(7)));
  }
}

function draw() {
  background(250, 30);
  for (var i = 0; i <= 100; i++) {
    myCircles[i].turn(i * 10, i * 10);
  }
  //   for (var x = 0; x <= width; x = x + 50) {
  //     for (var y = 0; y <= height; y = y + 50) {


  //     }
}var myCircles = [];


function setup() {
  createCanvas(400, 400);
  for (var i = 0; i < 100; i++) {
    myCircles.push(new Circle(i * 5, i * 5));
  }
}


function draw() {
  background(220);
  for (var i = 0; i < 100; i++) {
    myCircles[i].displayIt();
  }
}
//build a factory
function mousePressed() {
  for (var i = 0; i < 100; i++) {
    if (myCircles[i].amINear() < 10) {
      print("Clicked On One")
    }

  }
}
class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  displayIt() {
    ellipse(this.x, this.y, 20, 20);
    this.x += random(-2, 2);
    this.y += random(-2, 2);
  }
  amINear() {
    return dist(this.x, this.y, mouseX, mouseY);
  }
}// var R=0;
function setup() {
  createCanvas(800, 600);
  fill(0);
  stroke(120);
}

function draw() {
  background(255,255,128);
  // strokeWeight(4);
  // stroke(255);
  

  for(var x=20;x<width-10;x+=80){
      for(var y=20;y<height-10;y+=80){

  // fill(255,random(100),random(200));
        // noStroke();
   ellipse(x*2,y*2,8,8);
        
  // strokeWeight(5),
    line(x*2, y*2, mouseX,mouseY);
  }
  }
}var R=0;
function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(250);
  strokeWeight(4);
  stroke(255);
  

  for(var x=0;x<=width;x+=50){
      for(var y=0;y<=height;y+=50){

  fill(255,random(00),random(200));
        noStroke();
   ellipse(x*1.5,y*1.5,70,70);
        
  strokeWeight(5),
    line(2 * R, 2 * R, R * 2 + x, R * 2 + y);
  }
  }
}var R = 50;

function setup() {
  createCanvas(650, 500);

}
// fill(237, 151, 153);
// stroke(237, 151, 153);
// arc(400, 160, 40, 80, 0, PI, CHORD);

// function setup() {

function draw() {

  background(250, 250, 100);
  for (var x = 0; x <= width; x = x + 50) {
    for (var y = 0; y <= height; y = y + 50) {

  fill(255, 200);
  ellipse(100, 100, 2 * R, 2 * R)
  var t = frameCount / 20
  var x = cos(t) * R / 1.3
  var y = sin(t) * R / 1.3


  strokeWeight(5),
    line(2 * R, 2 * R, R * 2 + x, R * 2 + y);
}
  }var t = 0;

function setup() {
  createCanvas(600, 400);
  noStroke();
  fill(0);
}

function draw() {
  background(250, 30);

  for (var x = 0; x <= width; x = x + 50) {
    for (var y = 0; y <= height; y = y + 50) {

      // start point 

      var xStart = map(mouseX, 0, width, -PI, PI);
      var yStart = map(mouseY, 0, height, -PI, PI);

      // angle
      var angle = xStart + yStart;
      var X0 = x + 40 * cos(PI * t + angle);
      var Y0 = y + 40 * sin(PI * t + angle);

      ellipse(1.5 * X0, 1.5 * Y0, 3);
    }
  }

  t = t + 0.009; // update time
}function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(48, 201, 243);
  rectMode(CENTER);

  //photo frame
  noStroke();
  fill(50, 179, 228);
  rect(400, 250, 650, 450); //outer
  fill(31, 196, 198);
  rect(400, 250, 550, 350, 80); //inner

  fill(255, 255, 255);
  ellipse(100, 50, 25, 25); //L decoration up
  // ellipse(400, 50, 25, 25); //M decoration up
  ellipse(700, 50, 25, 25); //R decoration up
  ellipse(100, 450, 25, 25); //L decoration down
  ellipse(400, 450, 25, 25); //M decoration down 
  ellipse(700, 450, 25, 25); //R decoration down

  //plant
  stroke(107, 31, 1); //L&R Plant
  strokeWeight(3);

  //stem
  fill(254, 206, 156);
  rect(90, 400, 10, 100);

  //thorn
  fill(255);
  triangle(100, 305, 110, 330, 120, 315); //R
  triangle(80, 305, 70, 330, 60, 315); //L

  fill(21, 195, 0); //L plant
  arc(90, 340, 80, 80, -1 / 4 * PI, -3 / 4 * PI, PIE); //L plant
  fill(17, 125, 1);
  rect(718, 350, 30, 100, 100, 100, 0, 0); //R cactus3 M
  fill(21, 195, 0); //L plant
  rect(730, 380, 30, 80, 100, 100, 0, 0); //R cactus1 L
  rect(700, 380, 40, 120, 100, 100, 0, 0); //R cactus2 R

  //tube
  fill(17, 186, 0); //Color
  rect(90, 470, 85, 50, 0, 0, 10, 10); //L, Tube down
  rect(90, 430, 120, 40, 10, 10, 10, 10); //L,Tube up

  rect(710, 470, 85, 50); //R,tube down
  rect(710, 430, 120, 40); //R,tube up

  fill(255, 227, 143); //plant point
  noStroke();
  ellipse(62, 325, 5, 5); //point0 L
  ellipse(60, 340, 5, 5); //point1 L
  ellipse(62, 350, 5, 5); //point2 L
  ellipse(68, 360, 5, 5); //point3 L
  ellipse(76, 350, 5, 5); //point4 L
  ellipse(79, 365, 5, 5); //point4 L

  ellipse(115, 325, 5, 5); //point0 R
  ellipse(120, 340, 5, 5); //point1 R
  ellipse(118, 350, 5, 5); //point2 R
  ellipse(112, 360, 5, 5); //point3 R
  ellipse(105, 350, 5, 5); //point4 R
  ellipse(102, 365, 5, 5); //point6 R

  //Body
  stroke(225);
  strokeWeight(3);
  fill(241, 202, 190); //arm
  triangle(290, 240, 330, 240, 200, 330); //L arm
  triangle(510, 240, 470, 240, 580, 150); //R arm

  noStroke(225);
  fill(59, 101, 167); //hat
  ellipse(400, 80, 94, 65); //hat 1
  rect(400, 101, 94, 50); //hat 2
  fill(241, 202, 190); //
  stroke(255);
  strokeWeight(2);
  arc(400, 145, 97, 100, -7 / 8 * PI, -1 / 8 * PI, CHORD); //forehead

  //Attempt to use bezier for curve line of hat, but failed :(
  //bezier(350, 90,360, 90, 355, 80, 355, 80, 0, 0, 100, 0);

  //Attempt to use bezier for curve line of hat, succeed!
  strokeWeight(2);
  noFill();
  beginShape();
  vertex(355, 98);
  bezierVertex(355, 70, 445, 70, 445, 98);
  endShape();

  //face
  fill(241, 202, 190);
  noStroke();
  beginShape();
  vertex(355, 125); //L up
  vertex(445, 125); //R up
  vertex(445, 180); //R M
  vertex(430, 200); //R down
  vertex(370, 200); //L down
  vertex(355, 180); //L M
  endShape(CLOSE);
  //rect(400,60,80,60,30,30,30,30);

  //Attempt to use bezierVertex for mouth, but failed :(
  //     strokeWeight(5);
  //     point(420, 175);//A
  //     point(420,210);//B
  //     point(380, 210);//C
  //     point(380, 175);//D

  //     stroke(244, 122, 158);
  //     point(50, 80);
  //     point(60, 25);
  //     point(30, 20);

  //     stroke(0);
  //     strokeWeight(1);
  //     beginShape();
  //     vertex(420, 175);
  //     bezierVertex(420, 210, 380, 210, 380, 175);//
  //     bezierVertex(0, 0, , 420, 175);//
  //     endShape();

  //switch to use arc for mouth, succeed!
  fill(237, 151, 153);
  stroke(237, 151, 153);
  arc(400, 160, 40, 80, 0, PI, CHORD);
  //tooth
  fill(255);
  noStroke();
  rect(400, 168, 38, 6);


  //Eye
  fill(255); //white part of the eye
  ellipse(380, 140, 20, 25); //L w eye
  ellipse(420, 140, 20, 25); //R w eye
  fill(0); //eyeball
  noStroke();
  ellipse(380, 140, 8, 10); //L b eye
  ellipse(420, 140, 8, 10); //L b eye

  //Eyebrow
  fill(126, 90, 74);
  beginShape(); //L eyebrow
  vertex(370, 110); //top
  vertex(395, 120); //R 
  vertex(370, 115); //M
  vertex(360, 120); //L
  endShape(CLOSE);

  beginShape(); //R eyebrow
  vertex(430, 110); //top
  vertex(440, 120); //R 
  vertex(430, 115); //M
  vertex(405, 120); //L
  endShape(CLOSE);

  //beard 1
  fill(126, 90, 74); //beard 
  beginShape(); //
  vertex(400, 155); //top
  vertex(355, 165); //R 
  //beard 2
  vertex(445, 165); //L
  endShape(CLOSE);
  beginShape(); //
  vertex(355, 165); //1
  vertex(365, 180); //2 
  vertex(375, 180); //3
  vertex(390, 200); //4 mouth down L
  vertex(410, 200); //5
  vertex(425, 180); //6
  vertex(435, 180); //7
  vertex(445, 165); //8 Top R
  vertex(445, 180); //9
  vertex(418, 215); //10
  vertex(382, 215); //11
  vertex(355, 180); //12

  endShape(CLOSE);

  //Clothes;
  fill(197, 206, 228); //shirt
  rect(400, 320, 140, 200);

  //Glasses
  noFill();
  stroke(111, 100, 93);
  strokeWeight(2);
  rect(376, 140, 40, 35, 10, 10, 20, 15);
  rect(426, 140, 40, 35, 10, 10, 15, 20);
  strokeWeight(4);
  line(397, 130, 405, 130);

  //overalls
  noStroke();
  fill(39, 85, 126);
  quad(320, 300, 480, 300, 500, 425, 300, 425); //overalls
  rect(350, 260, 20, 80); // belt L
  rect(450, 260, 20, 80); //belt R
  fill(255); //button
  ellipse(350, 305, 10, 10); //Up button L
  ellipse(450, 305, 10, 10); //Up button R

  //Pocket
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(400, 365, 130, 80, 0, 0, 50, 50);
  line(370, 330, 370, 403); //L
  line(430, 330, 430, 403); //R

  fill(180);
  ellipse(370, 330, 8, 8); // Down button L
  ellipse(430, 330, 8, 8); //Down button R

  //Neckerchief
  strokeWeight(3);
  fill(246, 101, 104);
  triangle(355, 200, 445, 210, 400, 320);

  //details
  noFill();
  stroke(255);
  strokeWeight(1);
  ellipse(400, 300, 5, 5);
  ellipse(395, 290, 5, 5);
  ellipse(405, 288, 5, 5);
  ellipse(392, 280, 5, 5);
  ellipse(409, 278, 5, 5);
  ellipse(389, 270, 5, 5);
  ellipse(411, 268, 5, 5);
  ellipse(385, 260, 5, 5);
  ellipse(416, 260, 5, 5);
  ellipse(383, 250, 5, 5);
  ellipse(379, 240, 5, 5);
  ellipse(420, 247, 5, 5);
  ellipse(374, 230, 5, 5);
  ellipse(425, 235, 5, 5);
  ellipse(371, 220, 5, 5);
  ellipse(430, 225, 5, 5);
  ellipse(366, 210, 5, 5);
  ellipse(432, 215, 5, 5);

  //tube details
  noStroke();
  fill(170, 231, 19);
  rect(62, 480, 10, 27, 100, 100, 0, 0); //
  rect(85, 474, 16, 40, 100, 100, 0, 0); //
  rect(100, 480, 8, 27, 100, 100, 0, 0); //
  stroke(255);
  strokeWeight(5);
  line(37, 417, 37, 441);
  line(53, 455, 53, 485);
  line(757, 417, 757, 441);
  line(745, 455, 745, 485);

  //plant details
  stroke(17, 125, 2);
  point(730, 400);
  point(735, 380);
  point(710, 340);
  point(700, 360);
  point(710, 375);
  point(730, 400);
  point(695, 395);






  //     curve exercise,still confused :( 

  //     noFill();
  //     stroke(55, 102, 0);
  //     curve(5, 26, 5, 26, 73, 24, 73, 61);
  //     stroke(0);
  //     curve(5, 26, 73, 24, 73, 61, 15, 65);
  //     stroke(255, 102, 0);
  //     curve(73, 24, 73, 61, 15, 65, 15, 65);

  //     strokeWeight(5);
  //   point(30, 20);
  //   point(80, 20);
  //   point(80, 75);
  //   point(30, 75);

  //   stroke(244, 122, 158);
  //   point(50, 80);
  //   point(60, 25);
  //   point(30, 20);

  //   stroke(0);
  //   strokeWeight(1);
  //   beginShape();
  //   vertex(30, 20);
  //   bezierVertex(80, 20, 80, 75, 30, 75);
  //   bezierVertex(50, 80, 60, 25, 30, 20);
  //   endShape();
}var ball = {
  x: 300,
  y: 200,
  xspeed: 4,
  yspeed: -3
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  move();
  bounce();
  display();

}

function move() {
  ball.x = ball.x + ball.xspeed;
  ball.y = ball.y + ball.yspeed;

}

function bounce() {
  if (ball.x > width || ball.x < 0) {
    ball.xspeed = ball.xspeed * -1;
  }

  if (ball.y > height || ball.y < 0) {
    ball.yspeed = ball.yspeed * -1;
  }
}

function display() {
  stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(ball.x, ball.y, 24, 24);
}
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  strokeWeight(4);
  stroke(255);
  
  // var x=0;
  // while(x<=width){
  //   fill(0,200,random(255));
  //   ellipse(x+offset,100,25,25);
  //   x=x+50;
  // }
  // offset=offset+1
  for(var x=0;x<=width;x+=50){
      for(var y=0;y<=mouseX;y+=50){

  fill(255,0,random(200));
   ellipse(x,y,25,25);
  }
  }
}var offset=0;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  strokeWeight(4);
  stroke(255);
  
  var x=0;
  while(x<=width){
    fill(0,200,random(255));
    ellipse(x+offset,100,25,25);
    x=x+50;
  }
  offset=offset+1
  for(var x=0;x<=width;x+=50){
  fill(255,0,random(200));
   ellipse(x,300,25,25);
  }
}var x=0;
var speed=3;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(x,200,100,100);
  
  if(x>width||x<0){
    speed=speed*-1;
}
  x=x+speed;
}function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  noFill();
  if(mouseX>300&&mouseX<400 && mouseY>200&&mouseY<300){
   fill(255,0,200);
    }
  rect(300,200,100,100)
  
}var slider;

function setup() {

  createCanvas(400, 400);

  slider = createSlider(0, 100, 50);
  slider.position(20, 20);
  slider.changed(YOU);
}

function draw() {

  background(220);

}

function YOU() {
  background(220);
  print("yes" + slider.value());

}var x = 100;
var y = 100;
var xLoc1=0;
var yLoc1=100;
var directionX = 2;
var directionY = 1;
var speed=5;
var speed1 = 10;
var speed2 = 5;


function preload() {
  img = loadImage("kitchen.png");
  img2 = loadImage("icecream.png");
  img3 = loadImage("egg.png");
  img4 = loadImage("bulb.png");
  img5 = loadImage("tiger.png");
  img6 = loadImage("David.png");
  img7 = loadImage("fish.png");
  img8 = loadImage("emoji1.png")
}

function setup() {
  createCanvas(1000, 561);
}

function draw() {
  background(255);
  noStroke();
  fill(0);

  image(img, 0, 0);//kitchen
  image(img6, 470, 170, 200, 200);//david
  image(img5, 610, 110, 400, 285);//tiger

  image(img2, x, 100, 150, 100);//icecream
  x = x + 2 * speed1;
  if (x > width || x < 0) {
    speed1 = speed1 * -1
  }
   image(img3, 10, y, 110, 100)//egg
  y = y + 2 * speed2;
  if (y > height || y < 0) {
    speed2 = speed2 * -1
  }

  xLoc1 = xLoc1 + directionX;
  if (xLoc1 < 0 || xLoc1 > width){
		directionX = -directionX
  }
  yLoc1 = yLoc1 + directionY;
  if (yLoc1 < 0 || yLoc1 > height){
		directionY = -directionY
  }
  image(img8,xLoc1,yLoc1,100,80);//emoji
  xLoc1 = xLoc1 + directionX * speed;
  yLoc1 = yLoc1 + directionY * speed;
  
 
 image(img7, random(width/2),random(height) , 180, 85);//fish
  

}function setup() {
  createCanvas(600, 600);
}

function draw() {
background(255);
  
  if(mouseX<width/3){
  fill('red'); 
	noStroke();
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
}