var x=30
var y=500
var speed=3

function setup() {
  createCanvas(600,600);
  r = random(360);
  g = random(360);
  b = random(360)	  
}

function draw() {
  background(r, g, b)
  fill(100, mouseY, 100);
  rect(200, 200, 200, 150);
  
  
  fill(random(0,200), random(100,200), 0);
  rect(250, 270, 100, 70);


  fill(0);
  rect(280, 0, 35, 200);
	
  fill(0, 0, 0);
  line (265, 330, 335, 330);


  fill(0);
  line(265, 330, 270, 375);
  line(335, 330, 330, 375);
  line(270, 375, 275, 390);
  line(330, 375, 325, 390);
  line(275, 390, 280, 375);
  line(280, 375, 285, 390);
  line(285, 390, 290, 375);
  line(290, 375, 295, 390);
  line(295, 390, 300, 375);
  line(300, 375, 305, 390);
  line(305, 390, 310, 375);
  line(310, 375, 315, 390);
  line(315, 390, 320, 375);
  line(320, 375, 325, 390);

  fill(200, 120, 0);
  stroke(0);
  ellipse(x, y, 56, 56);
  
  if (x >= width - 28 || x <= 28) {

    speed = speed * -1;
}
  x = x + speed; 

}//var input;
var api = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=dc6zaTOxFJmzC";
var keyword
var enter
var img

function setup() {
  noCanvas()
  enter = createInput('type here')
  button = createButton('click me');
  button.mousePressed(gotgiphy);

}

function gotgiphy() {
  let keyword = enter.value();
  let url = api + apiKey + '&q=' + keyword;

  loadJSON(url, gotData)
  console.log(url)
}


function gotData(giphy) {
  // console.log(giphy.data);
  for (var i = 0; i < giphy.data.length; i++) {
    
    img = createImg(giphy.data[i].images.original.url);
    img.size(50, 50);
  }
}var videoScale = 20
var cols
var rows
var img1
var video

function setup() {
  createCanvas(640, 480);

  // Initialize columns and rows
  cols = width / videoScale;
  rows = height / videoScale;

  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(cols, rows);
}

function preload() {
  img1 = video
}

function draw() {

  background(255);
  video.loadPixels()
  for (var x = 0; x < cols; x++) {
    for (var y = 0; y < rows; y++) {
      var index = ((cols - x - 1) + y * cols) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
    }

  }

  var sz = map((r + g + b) / 3, 0, 255, 0, videoScale);
  // rectMode(CENTER);
  // fill(255);
  // noStroke();

  var m = x * videoScale;
  var n = y * videoScale;
  image(video, m + videoScale / 2, n + videoScale / 2, sz, sz, 0, 0)
}let imgpool = []
var img1
var img2
var img3
var img4
var currentImage ;
var nextImage
var nextImage1
var nextImage2;
var buttonPress = false;
var sliderLock = 0;
var randomPic;

var slider
var button

var button2
//var scrollimg

function preload(){
 img1=loadImage ("gugong.jpg")
 img2=loadImage ("paris.jpg")
 img3=loadImage ("Mexico.jpg")
 img4=loadImage ("japan.jpg")
  currentImage = img1;
  nextImage = img2
  nextImage1=img3
  nextImage2=img4;
  
  imgpool[0]=img1
  imgpool[1]=img2
  imgpool[2]=img3
  imgpool[3]=img4
}  
  //figure out a way to let current image equals all of them
function setup() { 
 
 Canvas = createCanvas(400, 400);
 //Canvas.mousePressed(changeImage) 
 slider = createSlider(0, 1200, 0);
 button = createButton("Switch the City") 
 button2 = createButton("State");
 button.mousePressed (changeimg)
 button2.mousePressed (changeState)
}
 
 

function draw() { 
  background(220);
  
  if(sliderLock != slider.value()){
    buttonPress = false;
  }
//make sure slider works
  if (buttonPress == false){
  image(currentImage,slider.value(),0,400,400)
  image(nextImage,slider.value()-400,0,400,400);
	image(nextImage1,slider.value()-800,0,400,400);
  image(nextImage2,slider.value()-1200,0,400,400)
  }
  else{
    //image(nextImage,0,0, 400, 400);
    image (imgpool[randomPic],0,0,400,400)  
  }
  
  
}

function changeimg () {
	sliderLock = slider.value();
  buttonPress = true;
  randomPic = random(0,3);
  randomPic = floor(randomPic);
  console.log(randomPic);
  //image(nextImage, 0, 0, 400, 400);
  /*
   for (let i=0;i<3;i++) {
  
 image (imgpool[i],0,0,400,400); }
*/


  
 //  	for (var i=0; i<3;i++) {
 //  img[i].show }
 //  if (currentImage == img1) {
 // currentImage = img2;
 //    nextImage = img3;
 //   } else if (currentImage == img2) {
 //   	currentImage = img3; 
 //    nextImage = img4;
 //  } else if (currentImage == img3) {
 //    currentImage = img4
 //    nextImage =img5 
 // } }

}
 
function changeState(){
	buttonPress = false;
  //sliderLock == slider.value();
}

/*class imgs {
  
	show() {
  img1=image (img1,0,0,400,400) 
  img2=image (img2,0,0,400,400)
  img3=image (img3,0,0,400,400)
  img4=image (img4,0,0,400,400)
  } 
  
}

*/var discos

function setup() { 
  createCanvas(400, 400,WEBGL);
	img = loadImage("disco.jpg"); 
	//for (var i=0;i<4; i++) {
       
    discos = new disco();  
  //} 
}

function draw() { 
  background(0);
  //for (var i=0;i<4; i++) {
       
		discos.lighting()
    discos.show()
	//}
}
 
  
  
class disco {
  constructor() {
  //this.x1=10
  //this.x1=frameCount
  this.x2=10
 }
	
  lighting() {
	pointLight(200, 20, 255, 500, 0, 200);

	directionalLight(200, 102, 255, 0, 0,0);

	pointLight(150, 20, 255, 10, 200, 200);}  
  
 	show() {

  if (this.x2<=50||this.x2 >=0) {
  this.x2=this.x2+2}
  
  if (this.x2>=50)
  {this.x2=this.x2-7}
  
  
    
  
  rotateY(map(mouseX,0,width,0,PI));
	rotateX(map(mouseY,0,height,0,PI));  
  texture(img)
  sphere(this.x2,40,60)
}  }

//var drawRedCircle = false;
var x1=20
var x2=20
var x3=20


function setup() { 
  createCanvas(400, 400);
	
} 

function mousePressed() { 
	if (50<mouseX && mouseX<100 && 300<mouseY && mouseY<350) {
    //drawRedCircle = true;
    fill(200,0,0)
    ellipse(x1+random(0,400),random(0,400),50,50)
  }
  else if (150<mouseX && mouseX<200 && 300<mouseY && mouseY<350){
    fill(450, 600, 150);
    ellipse(x2+random(0,400),random(0,400),50,50) }
 	
  else if (250<mouseX && mouseX<300 && 300<mouseY && mouseY<350){
    fill(0,300,0);
    ellipse(x3+random(0,400),random(0,400),50,50);}

}



function draw() { 
	background (225)
  fill (200,0,0);
  rect (50,300, 50,50);
  fill (450,600,150);
  rect (150,300,50,50);
  fill (0,300,0);
  rect (250,300,50,50);

 	//if (drawRedCircle == true) {
     //fill(200,0,0);
    //ellipse(x3+10,20,random(50,300),random(50,300)); 
   
  //}
	//loop(mousePressed);
noLoop();
}



    

var x=30
var y=500
var speed=3

function setup() {
  createCanvas(600,600);
  r = random(360);
  g = random(360);
  b = random(360)	  
}

function draw() {
  background(r, g, b)
  baskethoop()
  ball();
}





function baskethoop () {
  fill(100, mouseY, 100);
  rect(200, 200, 200, 150);
  
  
  fill(random(0,200), random(100,200), 0);
  rect(250, 270, 100, 70);


  fill(0);
  rect(280, 0, 35, 200);
	
  fill(0, 0, 0);
  line (265, 330, 335, 330);


  fill(0);
  line(265, 330, 270, 375);
  line(335, 330, 330, 375);
  line(270, 375, 275, 390);
  line(330, 375, 325, 390);
  line(275, 390, 280, 375);
  line(280, 375, 285, 390);
  line(285, 390, 290, 375);
  line(290, 375, 295, 390);
  line(295, 390, 300, 375);
  line(300, 375, 305, 390);
  line(305, 390, 310, 375);
  line(310, 375, 315, 390);
  line(315, 390, 320, 375);
  line(320, 375, 325, 390);
}

function ball () {
  fill(200, 120, 0);
  stroke(0);
  ellipse(x, y, 56, 56);
  
  if (x >= width - 28 || x <= 28) {

    speed = speed * -1;
      }
  x = x + speed; 

}

function setup() {
  createCanvas(600,600);
	}

function draw() {

  background(100, 100, 100);
  fill(255, 255, 0);
  rect(200, 200, 200, 150);
  
  
  fill(204, 102, 0);
  rect(250, 270, 100, 70);


  fill(0);
  rect(280, 0, 35, 200);
	
  fill(0, 0, 0);
  line (265, 330, 335, 330);


  fill(0);
  line(265, 330, 270, 375);
  line(335, 330, 330, 375);
  line(270, 375, 275, 390);
  line(330, 375, 325, 390);
  line(275, 390, 280, 375);
  line(280, 375, 285, 390);
  line(285, 390, 290, 375);
  line(290, 375, 295, 390);
  line(295, 390, 300, 375);
  line(300, 375, 305, 390);
  line(305, 390, 310, 375);
  line(310, 375, 315, 390);
  line(315, 390, 320, 375);
  line(320, 375, 325, 390);


 

}
var weather
var img
var t
var img2
var x=0
var y=0
var xspeed=0
var blur

function preload () {
		weather = loadJSON ("sth.json");}
		

function setup() { 	
		createCanvas(400, 400);
    t= weather.main.temp
		img = loadImage ("Cold.jpg") 
    img2 = loadImage ("warm.jpg")      
		xspeed = weather.wind.speed }
		blur   = weather.visibility
function draw() { 
		background(100,100,100);
  
	if (t<50)
  { text ( "It is Freezing !",50,60);
  
		image(img,150,150,150,150)}
	else 
  { text ( "The Weather is Good !",50, 60);
  	image(img2,x,y,245,245)
  }
  	//image( }
	x=x+xspeed
  y=y+xspeed
} 

   
  
   
  	
	
	
	
 
  
  

