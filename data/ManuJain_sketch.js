 
 let leftTest;
 let rightTest;
 
 function preload() {
  leftTest = loadImage('left.jpeg');
  rightTest = loadImage('right.jpeg');
 }
 
 function setup() {
 
     image(leftTest, 0, 0);
    //rightTest.loadPixels();
    //image(rightTest, width/2, 0);
 }




function setup() {
  createCanvas(400, 400);
  loadJSON("classexample.json", getData);

}

function getData(data) {
  for (let i = 0; i < data.length; i++) {
    ellipse(random(width), random(height), data[i].age);
    console.log(data[i].name);
  }
}

function draw() {
 // background(220);
}class BigCircle {
 constructor(expand) {
   this.expand = expand;
   this.circlesize = 0;
 }
 
 size() {
   this.circlesize = this.circlesize + 23; 
 }
  
 circle() {  
   
   if (this.circlesize > 470) {
    this.circlesize = 0
    }
   strokeWeight(2);
   fill(random(255), random(255), random(120,255), 145);
   ellipse(300, 200, this.circlesize + this.expand, this.circlesize + this.expand);
 }  
    
}


class MouseCircle {
 constructor() {
   this.x = 0;
   this.y = 0;
 }
  
 circle() {
   this.x = mouseX;
   this.y = mouseY;
   fill(random(255), random(255), 255, 175);
   noStroke();
   ellipse(this.x, this.y, 55, 55);  
 }
  
}


let big1;
let big2;
big1 = new BigCircle(460);
big2 = new BigCircle(0);
let mouse1;
mouse1 = new MouseCircle();


function setup() {
  createCanvas(600, 400);
}


function draw() {
  background(0);
  mouse1.circle();
  big1.circle();
  big1.size();
  mouse1.circle();
  big2.circle();
  big2.size();
}
  

function setup() {
  createCanvas(800, 600);
}

 let ac;
  //ac = map (dist(mx, my, cx, cy),0,100,0,100);
  let ac1=30;
  let ac2=60;
  let ac3=90;
  let ac4=120;
  let ac5=150;
  let ac6=180;

function draw() {
  background(0);

  // variables
  
  let cx;
  let cy;
  let x = 12;
  let mx = mouseX;
  let my = mouseY;
  let bg=(0);
  let c=(230);
  let a=30;
   
  //background circles
  
  fill(200);
  for (let cx = 7.5; cx < width; cx += 13) {
    for (let cy = 7.5; cy < height; cy += 13) {
  
  //mouse position circles
      
    if (dist(mx, my, cx, cy) < 20) {
    fill(c, ac1);
    ellipse(cx, cy, 6);
        
    } else if (dist(mx, my, cx, cy) < 35) {
    fill(c, ac2);
    ellipse(cx, cy, 7);
        
    } else if (dist(mx, my, cx, cy) < 50) {
    fill(c, ac3);
    ellipse(cx, cy, 8);
       
    } else if (dist(mx, my, cx, cy) < 65) {
    fill(c, ac4);
    ellipse(cx, cy, 9);
    
    } else if (dist(mx, my, cx, cy) < 80) {
    fill(c, ac5);
    ellipse(cx, cy, 10);
        
    } else if (dist(mx, my, cx, cy) < 100) {
    fill(c, ac6);
    ellipse(cx, cy, 11);
    
    } else{ fill(220,ac);      
      ellipse(cx, cy, x);}
    }
  }      
}

	//click inverting colors

function mousePressed() {

  if (ac === 255) {
    ac = 0;
    ac1 = 180;
    ac2 = 150;
    ac3 = 120;
    ac4 = 90;
    ac5 = 60;
    ac6 = 30;
    ac7 = 10;
  } else {
    ac = 255;
    ac1 = 30;
    ac2 = 60;
    ac3 = 90;
    ac4 = 120;
    ac5 = 150;
    ac6 = 180;
    ac7 = 210;
              
  }  
}    
let circlesize;
circlesize = 0;

function setup() {
  createCanvas(600, 400); 
}

function draw() {
  background(0);
  MouseCircle();
  BigCircle(460);
  MouseCircle();
  BigCircle(0);
}
  
function MouseCircle(color) {
	fill(random(255), random(255), 255, 175);
  noStroke();
  ellipse(mouseX, mouseY, 55, 55);  
}
  
function BigCircle(expand) {  
  circlesize = circlesize + 11;
  if (circlesize > 470) {
    circlesize = 0
    }
  strokeWeight(2);
  fill(random(255), random(255), random(120,255), 145);
  ellipse(300, 200, circlesize + expand, circlesize + expand);
}  
function setup() {
  createCanvas(400, 400);
  background(44, 251, 249);
  
  push();
  translate(-11, 0);
	rotate(-PI/4.1);
  noStroke();
	fill(255, 0, 0);
  rect(0, 0, 40, 600);
  pop();
  
  push();
  noStroke();
  fill(30, 198, 34);
	ellipse(200, 200, 250, 200);
  pop();
  
  push();
  noStroke();
	fill(2, 12, 146);
  rect(286, 160, 40, 40);
  pop();
  
}



function draw() {

}function setup() {
  createCanvas(400, 400);
  background(220);
  
  fill(44, 251, 249);
	ellipse(200, 200, 300, 300);
  
}

function draw() {
 
}function setup() {
  createCanvas(400, 400);
}

function draw() {
}
function setup() {
  createCanvas(520, 280);
	background(86, 20, 138);
	
  push();
	translate(200, 204);
	rotate(-PI/5.0);
	fill(255, 255, 255);
  rect(0, 0, 23, 35, 10);
  pop();
  
  push();
	translate(185, 190);
	rotate(PI/5.0);
  fill(255, 255, 255);
	rect(0, 0, 23, 35, 10);
  pop();
  
	fill(251, 91, 45);
	rect(172, 123, 58, 75, 20);
	
	fill(239, 217, 203);
	ellipse(200, 90, 80, 90);
	
  fill(255, 255, 255);
  ellipse(187, 84, 13, 9);
  fill(2, 2, 2);
  ellipse(187, 84, 6, 6);
  
  fill(255, 255, 255);
  ellipse(211, 84, 13, 9);
  fill(2, 2, 2);
  ellipse(211, 84, 6, 6);
  
  strokeWeight(2);
  line(190, 114, 208, 114);
  line(189, 113, 190, 114);
  line(208, 114, 209, 113);
  
  strokeWeight(1);
  line(202, 97, 198, 102);
  
  
  push(); 
  //fill(255, 255, 255);
  fill(2, 2, 2);
  arc(200, 70, 74, 67, PI, 0, PIE);
  pop();
  
  push();
  //fill(255, 255, 255);
	fill(2, 2, 2);
	rect(236, 68, 33, 2);
  pop();
  
  stroke(239, 217, 203);
  strokeWeight(6);
  line(232, 148, 261, 161);
  line(171, 148, 142, 161);
	

  

}

let x = 1
let y = 1

function draw() {
 
  fill(247, 211, 56);
	rect(x+1, , 27, 39, 7);
  fill(230, 234, 239);
  rect(mouseX, mouseY, 27, 12, 3);
  
}function setup() {
  createCanvas(520, 280);
	background(86, 20, 138);
	
	fill(255, 255, 255);
	rect(172, 123, 58, 75, 20);
	
	fill(239, 217, 203);
	ellipse(200, 90, 80, 90);
	
  line(183, 80, 194, 80);
  stroke(2, 2, 2);
  curve(194, 80, 195, 86, 194, 90);
  line(183, 88, 194, 88);
  
  line(204, 80, 215, 80);
  stroke(2, 2, 2);
  curve(194, 80, 196, 84, 194, 88);
  line(204, 88, 215, 88);
  
  strokeWeight(2);
  line(190, 114, 208, 114);
  line(189, 113, 190, 114);
  line(208, 114, 209, 113);
  
  strokeWeight(1);
  line(202, 97, 198, 102);
  
  fill(247, 211, 56);
	rect(261, 139, 27, 39, 7);
  fill(230, 234, 239);
  rect(261, 131, 27, 12, 3);
  
  push();
	translate(203, 206);
	rotate(-PI/4.3);
	fill(255, 255, 255);
	// rect(203, 196, 23, 35, 10);
  rect(0, 0, 23, 35, 10);
  pop();
  
  push();
	translate(184, 190);
	rotate(PI/4.3);
  fill(255, 255, 255);
	rect(0, 0, 23, 35, 10);
  pop();
  
  push();
  
  arc(200, 63, 80, 50, PI, 0, PIE);
  
  stroke(239, 217, 203);
  strokeWeight(6);
  line(232, 148, 261, 161);
  line(171, 148, 142, 161);
	

  

}

function draw() {
  console.log(mouseX, mouseY);
 
}