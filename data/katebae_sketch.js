function setup() {
createCanvas(400, 400);
}
function draw() {
background(182,252,112);
noStroke();
fill(229,211,0);
ellipse(252,100,170,140);
fill(229,211,0);
rect(167,102,170,130);
fill(44,33,113);
rect(167,220,170,70);
fill(44,33,113);
rect(167,235,170,100,60);
noStroke();
fill(150,150,156);
ellipse(217,110,70,70);
ellipse(287,110,70,70);
fill(229,211,0);
ellipse(217,110,55,55);
ellipse(287,110,55,55);
fill(255);
ellipse(217,110,55,55-6*mouseX/100);
ellipse(287,110,55,55-6*mouseX/100);
}let text1 = 0 ;
let text2 = 150 ;
let dir = 1 ;
let r, g, b;
function setup() {
createCanvas(400, 400);
r = random(255);
g = random(255);
b = random(255);
}
function draw() {
background(r,g,b);
noStroke();
fill(229,211,0);
ellipse(252,100,170,140);
fill(229,211,0);
rect(167,102,170,130);
fill(44,33,113);
rect(167,220,170,70);
fill(44,33,113);
rect(167,235,170,100,60);
noStroke();
fill(150,150,156);
ellipse(217,110,70,70);
ellipse(287,110,70,70);
fill(229,211,0);
ellipse(217,110,55,55);
ellipse(287,110,55,55);
fill(255);
ellipse(217,110,55,55-6*mouseX/100);
ellipse(287,110,55,55-6*mouseX/100);
fill(120,84,40);
ellipse(217-2*mouseX/50,110,23,23);
ellipse(287-2*mouseX/50,110,23,23);
fill(0);
ellipse(217-2*mouseX/50,110,10,10);
ellipse(287-2*mouseX/50,110,10,10);
fill(255);
ellipse(213-2*mouseX/50,106,4,4);
ellipse(283-2*mouseX/50,106,4,4);
stroke(0);
strokeWeight(2);
noFill();
arc(260, 160, 60, 60, 0.2, 2);
stroke(0);
strokeWeight(4);
noFill();
arc(263, 11, 60, 60, 2.2,3.5);
arc(270, 16, 60, 60, 2.5,3.5);
arc(277, 16, 60, 150, 2.9,3.3);
noStroke();
fill(229,211,0);
triangle(167,190,137,240,167,250);
fill(r,g,b);
triangle(167,210,153,233,167,240);
noStroke();
fill(229,211,0);
triangle(337,190,367,240,337,250);
fill(r,g,b);
triangle(337,210,351,233,337,240);
noStroke();
fill(44,33,113);
rect(210,330,40,25);
rect(260,330,40,25);
noStroke();
fill(0);
ellipse(220,354,60,12);
ellipse(290,354,60,12);
let s = 'Bana nana~';
textSize(22+mouseX/26);
fill(mouseX, 102, 153);
text(s, text1, text2, 500,100);
text1 = text1 + (1*dir) ;
if (text1 >= 100) {
dir = dir * -1;
} else if (text1 <= 0) {
dir = dir * -1;
}
}
function mousePressed() {
r = random(255);
g = random(255);
b = random(255);
}
var spot ={
x: 100,
y: 50
}
var col = {
r: 255,
g : 0,
b:0
};
function setup(){
createCanvas(600,400);
background(0);
}
function draw(){
col.r= random(100,255);
col.g= 0;
col.b= random(100,190);
spot.x = random(0, width);
spot.y= random(0, height);
noStroke();
fill(col.r, col.g, col.b, 100);
ellipse(spot.x, spot.y, 24, 24);
}function setup() {
createCanvas(580, 430);
}
function draw() {
background(0, 255, 255);
stroke(255, 0, 0);
strokeWeight(40);
line(0, 0, 580, 430);
noStroke();
fill(0, 200, 0);
ellipse(280, 212, 312, 232);
fill(0, 0, 128);
rect(395, 175, 40, 40);
}function setup() {
createCanvas(400, 400);
background (255);
}
function draw() {
ellipseMode(CENTER);
noStroke();
fill(10, 250, 180);
ellipse (200,200, 200,200);
}function setup() { 
createCanvas(400,400);
} 
function draw() { 
background(220);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(182,252,112);
noStroke();
fill(229,211,0);
ellipse(252,100,170,140);
fill(229,211,0);
rect(167,102,170,130);
fill(44,33,113);
rect(167,220,170,70);
fill(44,33,113);
rect(167,235,170,100,60);
noStroke();
fill(150,150,156);
ellipse(217,110,70,70);
ellipse(287,110,70,70);
fill(229,211,0);
ellipse(217,110,55,55);
ellipse(287,110,55,55);
fill(255);
ellipse(217,110,55,55-6*mouseX/100);
ellipse(287,110,55,55-6*mouseX/100);
fill(120,84,40);
ellipse(217-2*mouseX/50,110,23,23);
ellipse(287-2*mouseX/50,110,23,23);
fill(0);
ellipse(217-2*mouseX/50,110,10,10);
ellipse(287-2*mouseX/50,110,10,10);
fill(255);
ellipse(213-2*mouseX/50,106,4,4);
ellipse(283-2*mouseX/50,106,4,4);
stroke(0);
strokeWeight(2);
noFill();
arc(260, 160, 60, 60, 0.2, 2);
stroke(0);
strokeWeight(4);
noFill();
arc(263, 11, 60, 60, 2.2,3.5);
arc(270, 16, 60, 60, 2.5,3.5);
arc(277, 16, 60, 150, 2.9,3.3);
noStroke();
fill(229,211,0);
triangle(167,190,137,240,167,250);
fill(182,252,112);
triangle(167,210,153,233,167,240);
noStroke();
fill(229,211,0);
triangle(337,190,367,240,337,250);
fill(182,252,112);
triangle(337,210,351,233,337,240);
noStroke();
fill(44,33,113);
rect(210,330,40,25);
rect(260,330,40,25);
noStroke();
fill(0);
ellipse(220,354,60,12);
ellipse(290,354,60,12);
textSize(42+mouseX/26);
fill(mouseX, 102, 153);
text("Bana ", 30, 150); 
textSize(32+mouseX/26);
fill(198,240+mouseX);
text("nana~ ", 60, 190); 
}function setup() {
createCanvas(400, 400);
background(220);
fill(0,0,255);
ellipse(300,200,90,90);
fill(0,255,255);
ellipse(50,200,90,90);
stroke(0);
strokeWeight(10);
createP("MY Name is Bae");
}
function draw() {
jslkjd
}