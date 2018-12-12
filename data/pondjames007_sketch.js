let img;


function preload(){
 	 img = loadImage("https://static01.nyt.com/images/2018/05/01/arts/01kubrick/01kubrick-largeHorizontal375.jpg")
}


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}  let a = createVector(3, 3);
  let b = createVector(5, 5);

function setup() {
  createCanvas(400, 400);
  

  
//  console.log(a);
//   console.log(b);
  
//   console.log(c);
  
  
}
let track = [];
let trackImg;

function preload(){
  trackImg = loadImage("track.jpg"); 
}

function setup() {
  createCanvas(400, 400);
  
	trackImg.resize(width, height)
  trackImg.loadPixels();
  console.log(trackImg)
  for(let i = 0 ; i < trackImg.pixels.length; i+=4){
   	if(trackImg.pixels[i] != 255)
    	track.push(createVector(i%width, floor(i/width))) 
  }
}

function draw() {
  background(220);
  
  for(let pixel of track){
   point(pixel.x, pixel.y) 
  }
}let rocket;
let population;
let bullets = [];
let lifeTime = 500;
let elapseTime = 0;
let mutationRate = 0.02;

function setup() {
    createCanvas(windowWidth, windowHeight);
    pos = createVector(width/2, height-100);
    


    for(let i = 0; i < 200; i++){
        bullets.push(new Particle(random(100, width-100), random(100, height-100)));
    }

    population = new Population(mutationRate, 50);


}

function draw() {
    background(200);
    
    for(let i in bullets){
        bullets[i].update();
        if(bullets[i].pos.x <= -10 || bullets[i].pos.x >= width+10 || bullets[i].pos.y <= -10 || bullets[i].pos.y >= height+10){
            bullets.splice(i, 1);
            bullets.push(new Particle(random(100, width-100), random(100, height-100)));
        }
        else{
            bullets[i].show();
        }
    }

    if(population.isFinished() == true){
        population.calcFitness(elapseTime);
        population.selection();
        population.reproduction();
        elapseTime = 0;
    }
    else{
        population.live(bullets);
        elapseTime++;
    }
    
    // Display some info
  fill(0);
  noStroke();
  text("Generation #: " + population.getGenerations(), 10, 18);
  text("Record time: " + elapseTime, 10, 54);
}


let img, orig;
let flowField;
let imgRow = [];
let imgPixels = [];
let particles = [];
let showEdge = false;
let resolution = 16;

function preload() {
    img = loadImage('lena_bin.bmp');
    orig = loadImage('lena.bmp');
}

function setup() {
    let text1 = createP("Keep moving your mouse to add particles!");
    let text2 = createP("Spacebar: show edges");
    let text3 = createP("Enter/Return: refresh canvas");
    text1.position(10, 520);
    text2.position(10, 560);
    text3.position(10, 580);

    createCanvas(512, 512);

    img.loadPixels();
    console.log(img.pixels);

    for (let i = 0; i < img.pixels.length; i += 4) {
        let edge = {
            "grayScale": round(0.2989 * img.pixels[i] + 0.5870 * img.pixels[i + 1] + 0.1140 * img.pixels[i + 2]),
            "isOccupied": false
        }
        if (i % resolution != 0) edge.grayScale = 0;
        imgRow.push(edge);
        if (i != 0 && (i / 4) % 512 == 511) {
            imgPixels.push(imgRow);
            imgRow = [];
        }
    }



    console.log(imgPixels);


}

function draw() {

    if (particles.length < 3000) {
        background(220);
        for (particle of particles) {
            //console.log(particle.target);
            particle.seek();
            particle.update();
            particle.show();
        }

        let cnt = 0;
        if (showEdge == true) {
            for (let i = 0; i < imgPixels.length; i += 1) {
                for (let j = 0; j < imgPixels[i].length; j += 1) {
                    if (imgPixels[i][j].grayScale != 0) {
                        strokeWeight(2)
                        stroke(255, 0, 0);
                        point(j, i);
                        cnt++;
                    }

                }
            }
            console.log("total tagets: " + cnt);
        }
    }

    if (particles.length > 2500) {
        let alpha = map(particles.length, 2500, 3000, 0, 255);
        tint(255, alpha);
        image(orig, 0, 0);

    }
}

function mouseMoved() {
    mouseX = constrain(mouseX, 0, width);
    mouseY = constrain(mouseY, 0, height);
    if (particles.length < 3000) {
        //console.log(mouseX + "  " + mouseY);
        let newParticle = new Particle(mouseX, mouseY, pmouseX, pmouseY, imgPixels);
        if (!newParticle.target.equals(0, 0)) particles.push(newParticle);
        console.log(particles.length);
    }
}

function keyPressed() {
    if (key == ' ') {
        showEdge = !showEdge;
    }
    if (keyCode == RETURN || keyCode == ENTER) {

        particles = [];
        clear();
        if (showEdge == true) showEdge = false;
    }

}let test, value;
let pickers;
let colorSlider,strokeSlider,opacitySlider;

function setup() {
  createCanvas(400, 400);
	pickers = document.createElement("div");
  pickers.setAttribute('width', '500px')
  pickers.setAttribute('height', '500px')
  document.body.appendChild(pickers);
  //colorMode(HSB, 360, 100, 100, 100);  
  opacityPicker();
  colorPicker();
  strokePicker();
  
  
  
}

function draw() {
  //background(220);
  //test = document.getElementById('test');
  //value= test.getAttribute('value');
  //console.log(value);
  //console.log(strokeSlider.value);
  let col = color('hsba('+colorSlider.value+',100%, 100%,'+ opacitySlider.value+')');
  stroke(col);
  strokeWeight(strokeSlider.value);
  console.log(strokeSlider.value);
  line(mouseX, mouseY, pmouseX, pmouseY)
  
  textSize(30)
  text("1234", 100, 100)
}



function colorPicker(){
  colorSlider = document.createElement("input");
  colorSlider.setAttribute('type','range');
  colorSlider.setAttribute('min','0');
  colorSlider.setAttribute('max','360');
  colorSlider.setAttribute('value','5');
  //colorSlider.setAttribute('step','1');    
  pickers.appendChild(colorSlider);
  //console.log(opacitySlider.value);
  //stroke(colorSlider.value, 100, 100, 100);

}

function strokePicker(){
	strokeSlider = document.createElement("input");
  strokeSlider.setAttribute('type','range');
  strokeSlider.setAttribute('min','0');
  strokeSlider.setAttribute('max','10');
  strokeSlider.setAttribute('value','5');
  //strokeSlider.setAttribute('step','1');    
  pickers.appendChild(strokeSlider);
  //strokeWeight(strokeSlider.value)
 
}


function opacityPicker(){
	opacitySlider = document.createElement("input");
  opacitySlider.setAttribute('type','range');
  opacitySlider.setAttribute('min','0');
  opacitySlider.setAttribute('max','1');
  opacitySlider.setAttribute('value','1');
  opacitySlider.setAttribute('step','.01');
  opacitySlider.setAttribute('height', '500%')
  pickers.appendChild(opacitySlider);
  //alpha(opacitySlider.value);
}



let groups = [];
let flag = false;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  let ring = [
      {
          pos: createVector(-1100,0,0),
          color: color(62, 118, 236)
      },
      {
          pos: createVector(0,0,0),
          color: color(0, 0, 0)
      },
      {
          pos: createVector(1100,0,0),
          color: color(255, 0, 0)
      },
      {
          pos: createVector(-550,550,0),
          color: color(255, 206, 1)
      },
      {
          pos: createVector(550,550,0),
          color: color(23, 154, 19)
      }
  ]

  for(let j = 0; j < 5; j ++){
      for(let i = 0; i < 12; i++){
        groups.push(new EleGroup(ring[j].pos.x + 500*sin(TWO_PI*i/12), ring[j].pos.y + 500*cos(TWO_PI*i/12), 0, 10, ring[j].color));

      }
  }

}

function draw() {
    background(100);
    translate(0, 0, -2000);
    for(let group of groups){
        group.show();
        group.update();
    }
}

function keyPressed(){
    if(key == " "){
        flag = !flag;
        for(let group of groups){
            if(flag == true){
                group.shatter();
            }
            else{
                group.resume();
                //group.sphereTrans();
            }
        }
    }
}

let cannonAngle;
let projectile;
let projectiles = [];
let gravity;
let origin;
let theta = 0;
let obstacles = [];

function setup(){
    createCanvas(windowWidth, windowHeight);

    cannonAngle = -PI/4;
    gravity = createVector(0, 0.2);
    origin = createVector(width*0.2-62, height*0.3 - 15);

}

function draw(){
    background(220);

    if(frameCount%60 == 0){
        obstacles.push(new Obstacles());
    }
    //draw cliff
    stroke(110);
    fill(110);
    push()
    beginShape()
        fill(110);
        let y = height*0.3;
        while(y < height){
            vertex(width*0.2 + 2*sin(y/5), y);
            y++;
        }
        vertex(0, height);
        vertex(0, height*0.3);
        vertex(width*0.2, height*0.3);

    endShape()
    pop()
    //draw Projectiles
    for(let idx in projectiles){
        let dist = p5.Vector.sub(origin, projectiles[idx].pos);

        if(dist.magSq() > 50*50){
            projectiles[idx].fire = true;
            projectiles[idx].applyGravity();
        }
        projectiles[idx].update();
        projectiles[idx].show();

        if(projectiles[idx].pos.y > height+200){
            projectiles.splice(idx, 1);
        }
    }

    //draw Cannon
    stroke(0);
    fill(0);
    rect(width*0.2-25, height*0.3, -55, -10);
    triangle(width*0.2-70, height*0.3-10, width*0.2-50, height*0.3-10, width*0.2-60, height*0.3-25);
    push()
    translate(width*0.2-62, height*0.3 - 10);
    rotate(cannonAngle);
    rect(0, 5, 50, -20);
    pop()

    if(keyIsDown(UP_ARROW)){
        cannonAngle -= 0.1;
    }
    else if(keyIsDown(DOWN_ARROW)){
        cannonAngle += 0.1;
    }
    cannonAngle = constrain(cannonAngle, -PI, 0);

    //draw obstacles
    push()
    stroke(0);
    for(let idx in obstacles){
        obstacles[idx].update();
        obstacles[idx].show();

        if(obstacles[idx].pos.x <= width*0.2){
            obstacles.splice(idx, 1);
        }
    }
    pop()

    //draw wave
    push()
    fill(51, 51, 153);
    beginShape()
        let x = width*0.2;
        let inc = theta;
        while(x < width){
            vertex(x, height-50+5*sin(TWO_PI/30 + inc));
            x++;
            inc += TWO_PI/300;
        }


        vertex(width, height);
        vertex(width*0.2, height);
    endShape()
    pop()

    theta += 0.1;
}

function keyPressed(){
    if(key == ' '){
        let fire = p5.Vector.fromAngle(cannonAngle);
        fire.setMag(12);
        projectile = random(1)>0.5?new Projectile(width*0.2-60, height*0.3 - 15):new SpringBob(width*0.2-60, height*0.3 - 15);
        projectile.applyForce(fire);
        projectiles.push(projectile);
    }
}
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  console.log(random(-1))
}
let particles = [];
let planets = [];

function setup() {
    createCanvas(400, 400);
    for(let i = 0; i < 10; i++){
      particles.push(new Particle());
    }

    planets.push(new Planet(100,100));
    planets.push(new Planet(100,300));
    planets.push(new Planet(300,100));
    planets.push(new Planet(300,300));

    //background(0);
}

function draw() {
    background(0);
    for(let i = 0; i < planets.length; i++){
        planets[i].show();
    }
    // for(planet of planets){
    //     planet.show();
    // }
    for(let i = 0; i < particles.length; i++){
        for(let j = 0; j < planets.length; j++){
            particles[i].attracted(planets[j]);
        }
        particles[i].update();
        particles[i].checkEdge();
        particles[i].show();
    }
}

function mousePressed(){
    planets.push(new Planet(mouseX, mouseY));
}
//var chess = [[]];
var grid = [];
var a, b;
var posX, posY;
var newA, newB;
var fin = 0;
function setup() { 
  createCanvas(400, 400);
  background(220);
  for(var i = 0; i < 40; i++){
    grid.push(new Array());
    for(var j = 0; j < 40; j++){
        grid[i].push(new Grid(width/40*i,height/40*j, false));
    }
  }
  a = floor(random(0, 40));
  b = floor(random(0, 40));
  console.log(a + "  " + b);
} 

function draw() { 

  for(var i = 0; i < 40; i++){
    for(var j = 0; j < 40; j++){
        grid[i][j].render();
    }
  }
  
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let walker = [];
let grid = [];

function setup() {
  createCanvas(400, 400);
  //walker = new Walker();
  background(127);
  for(var i = 0; i < width/10; i++){
    grid.push(new Array());
    for(var j = 0; j < height/10; j++){
        grid[i].push(false);
    }
  }
  console.log(grid[0].length);
  console.log(grid.length);
}

function draw() {
  //background(127);
  for(let j = 0; j < walker.length; j++){
    //for (let i = 0; i < 500; i++) {
      grid = walker[j].render(grid);
    	//console.log(walker[j].x+" .  "+walker[j].y);
      walker[j].step(grid);
    //}
  }
}

function mouseClicked(){
 	 walker.push(new Walker());
}var img;

function preload(){
  img = loadImage("0.png");
  
}


function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  image(img, 100,100, 10, 10);
  console.log(mouseX+" : "+ mouseY);
}var a = [];
var b;
function setup() { 
  createCanvas(400, 400);
  b = [3,10];
  a.push(b);
  b = [2,20];
  a.push(b);
  b = [5,30];
  a.push(b);
  console.log(a);
  a.sort(function(a, b){
    return a[0] - b[0];
  });
  console.log(a);
  
  beginShape()
  vertex(50,50);
  //vertex(100,100);
  endShape()
} 

function draw() { 
  //background(220);
}// Your Mapboxgl API Key
let key = 'pk.eyJ1IjoicG9uZGphbWVzMDA3IiwiYSI6ImNqOW9wbDJ1NTFlaWcyd240b3IzbzBzMGcifQ.5kemTIDRSd4D7kIp5Oofww';

 // <your access token here>;

// Create a new Mappa instance using Mapboxgl.
let mappa = new Mappa('Mapboxgl', key);
let myMap;
let canvas;

let flyNow = false;

// Map options
let options = {
  lat: 40.782,
  lng: -73.967,
  zoom: 4,
  style: 'mapbox://styles/mapbox/dark-v9'
}

function setup(){
  canvas = createCanvas(800, 700);
  console.log('creating canvas');
  // Create a tile map centered in New York with an initial zoom level of 4.
  myMap = mappa.tileMap(options);
  // Overlay the tile map to the p5 canvas. This will display the map.
  myMap.overlay(canvas);

  myMap.onChange( function() {
    console.log("Map Changed"); // watch the console for how often this event is triggered
  });
}

function draw(){
  if (flyNow) {
    //console.log(myMap);
    myMap.map.flyTo({
      center: [
          -74.50 + (Math.random() - 0.5) * 10,
          40 + (Math.random() - 0.5) * 10
        ],
      zoom: 9
    });
   // flyNow = !flyNow; // try commenting this out and see what happens
  }
}

function keyReleased() {
  flyNow = !flyNow;
}var kinectron = null;
var x = 0;
var y = 0;

var bx = 0;
var by = 0;
var bxdir = 1;
var bydir = 1;

function setup() { 
  createCanvas(400, 400);
  
  kinectron = new Kinectron("172.16.231.35");
  kinectron.makeConnection();
  
	kinectron.startTrackedJoint(kinectron.HANDRIGHT, gotRightHand);

} 

function gotRightHand(hand) {
 console.log(hand);
  x = hand.depthX * width;
  y = hand.depthY * height;
}

function draw() { 
  background(220);
  ellipse(x, y, 50, 50);
  
  
  rectMode(CENTER);
  push()
  translate(bx,by);
  rotate(radians(25+frameCount));
  rect(0, 0, 50, 50);
  pop();
  
  bx = bx + bxdir;
  by = by + bydir;
  if (bx > width || bx < 0) {
   bxdir = bxdir * -1; 
  }
  
  if (by > height || by < 0) {
   bydir = bydir * -1; 
  }
  
  if (dist(bx, by, x, y) < 50) {
        fill(random(255),random(255),random(255));
		bx = x;
    by = y;
  }
  

  
}

//Kinectron only works in HTTP and open in the browser

var kinectron = null;
var x = 0;
var y = 0;

var bx = 0;
var by = 0;
var bxdir = 1;
var bydir = 1;


function setup() { 
  createCanvas(400, 400);
  kinectron = new Kinectron("172.16.231.35");
  kinectron.makeConnection();
  kinectron.startTrackedJoint(kinectron.HANDRIGHT, gotRightHand);
} 

function draw() { 
  background(220);
  fill(255,0,0);
  ellipse(x, y, 50, 50);
  rect(bx, by, 50, 50);
  bx += bxdir;
  by += bydir;
  if(bx > width-50 || bx < 0)
    bxdir = -bxdir;
  if(by > height-50 || by < 0)
    bydir = -bydir;
  
  if(dist(bx, by, x, y) < 50){
    fill(random(255), 0, 0);
    bxdir = 0;
    bydir = 0;
  }
  
}

function gotRightHand(hand){
  console.log(hand);
  x = hand.depthX*width;//range: 0~1
  y = hand.depthY*height;//range: 0~1
}var video;
var bg;

function setup(){
	createCanvas(600, 600, WEBGL);
  background(0);
  video = createCapture(VIDEO);
  video.size(200,200);
  video.hide();
	bg = createVideo("beats.mp4");
	bg.loop();
	bg.hide();
}

function draw (){
	// video(0,0);
	background(0);

	normalMaterial();

	ambientLight(0,20);
	pointLight(300, 300, 300, 300, 300, 1);
	// image(bg,0,0,width,height);

	translate(0,0,-600);
	push();
	translate(0,0,-2700);
	texture(bg);
	box(3300,2800);
	pop();

	var radius = width * 1.5;

	orbitControl();



// translate(0, 0, -600);
	for (let i = 0; i <=12; i++){
		for(var e = 0; e<=12; e++){
			push();
			var a = i/12 * PI;
			var b = e/12 * PI;
			translate(sin(2 * a) * radius * sin(b), cos(b) * radius / 2 , cos(2 * a) * radius * sin(b));
			if(e%2 === 0){
					push();
					fill(80,150,100,64);
        	rotateZ(frameCount * -0.03);
					rotateX(frameCount * -0.03);
					rotateY(frameCount * -0.03);
					torus(60,20, 20,20);
					pop();
				}else{
					fill(150,50,50,30);
					texture(video);
					rotateZ(frameCount * 0.05);
					rotateX(frameCount * 0.05);
					rotateY(frameCount * 0.05);
					box(100,100,100);
				}
			pop();
		}
	}
}let video;
var cnt = 0;
var posX = 0;
var posY = 0;
var step = 5;

function setup() { 
  createCanvas(400, 400);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.hide();
} 

function draw() { 
  background(220);
  image(video, 0,0,width,height);
  
  loadPixels();
  if(cnt%4 == 0){
    for(var h = 0; h < height; h++){ 	
    	for(var w = 0; w < posX; w++){
          var r = pixels[4*((h*width) + w)];
   				var g = pixels[4*((h*width) + w) + 1];
   				var b = pixels[4*((h*width) + w) + 2];
          var avg = (r+g+b)/3;
          pixels[4*((h*width) + w)] = avg;
          pixels[4*((h*width) + w)+1] = avg;
          pixels[4*((h*width) + w)+2] = avg;
       }
     }
  }
  else if(cnt%4 == 1){
    for(var h = 0; h < height; h++){
    	for(var w = 0; w < posX; w++){
          var r = pixels[4*((h*width) + w)];
   				var g = pixels[4*((h*width) + w) + 1];
   				var b = pixels[4*((h*width) + w) + 2];
          var avg = (r+g+b)/3;
          pixels[4*((h*width) + w)] = avg;
          pixels[4*((h*width) + w)+1] = avg;
          pixels[4*((h*width) + w)+2] = avg;
      }
      for(var w2 = width; w2 > posX; w2--){
         var r = pixels[4*((h*width) + w2)];
   				var g = pixels[4*((h*width) + w2) + 1];
   				var b = pixels[4*((h*width) + w2) + 2];
         pixels[4*((h*width) + w2)] = b;
         pixels[4*((h*width) + w2)+1] = r;
         pixels[4*((h*width) + w2)+2] = g; 
      }
    }
  }
  else if(cnt%4 == 2){
    for(var h = 0; h < posY; h++){
    	for(var w = 0; w < posX; w++){
          var r = pixels[4*((h*width) + w)];
   				var g = pixels[4*((h*width) + w) + 1];
   				var b = pixels[4*((h*width) + w) + 2];
          //fill(r,g,b);
          //rect(w,h, 10, 10);

          var avg = 255 - (r+g+b)/3;
          pixels[4*((h*width) + w)] = avg;
          pixels[4*((h*width) + w)+1] = avg;
          pixels[4*((h*width) + w)+2] = avg;
      }
      for(var w2 = width; w2 > posX; w2--){
         var r = pixels[4*((h*width) + w2)];
   				var g = pixels[4*((h*width) + w2) + 1];
   				var b = pixels[4*((h*width) + w2) + 2];
         pixels[4*((h*width) + w2)] = b;
         pixels[4*((h*width) + w2)+1] = r;
         pixels[4*((h*width) + w2)+2] = g; 
      }
    }
  }
  else if(cnt%4 == 3){
    for(var h = 0; h < posY; h++){
    	for(var w = 0; w < posX; w++){
          var r = pixels[4*((h*width) + w)];
   				var g = pixels[4*((h*width) + w) + 1];
   				var b = pixels[4*((h*width) + w) + 2];
          //fill(r,g,b);
          //rect(w,h, 10, 10);

          var avg = 255 - (r+g+b)/3;
          pixels[4*((h*width) + w)] = avg;
          pixels[4*((h*width) + w)+1] = avg;
          pixels[4*((h*width) + w)+2] = avg;
      }
    }
  }

  updatePixels();
}

function mouseMoved(){
  
  if(posX >= width){
    step = -step;
    cnt++;
  }
  if(posX < 0){
    step = -step;
    cnt++;
  }
  posX += step;
  posY += step;
  //print(posX+"  "+step);
}let video;
let colInfo;
let word = [];


function setup() { 
  createCanvas(800, 600);
  video = createCapture(VIDEO);
  video.hide();
} 

function draw() { 
  background(220);
  image(video, 0,0,width,height);
  
  //image(video,mouseY+mouseY,0,width);
  //text(word, 10, 10);
  var col = get(mouseX, mouseY);
  noStroke();
  fill(col[0], col[1], col[2]);
  rectMode(CENTER);
  rect(mouseX, mouseY, 100, 100);
  
  if(word.length > 0){
    for(var i = 0 ; i < word.length; i++){
    word[i].size = (word[i].color[0] +word[i].color[1]+word[i].color[2])/6;
    //print(word[0].size);
    textSize(word[i].size);
    //fill(word[i].color[2], word[i].color[0], word[i].color[1]);
    fill(word[i].color[0], word[i].color[1], word[i].color[2]);
      text(word[i].ascii, word[i].posX, word[i].posY);
    //word[0].show();
    }
  }
}

function mouseMoved(){
  colInfo = get(mouseX, mouseY);
  //print(colInfo[0]);
  var ascii = round(map(colInfo[0], 0, 255, 33, 122));
  var letter = String.fromCharCode(ascii);
  //print(letter);
  //word = word + letter;
  word.push(new Alphabets(colInfo, letter));
  word[0].sizeCal();
}var fake, trampoline, play;
var convR, convL;
var ceiling, nails, wall, normal;
var heart, speedUp, speedDown;
var newHeart, newSpeed;
var isOnFloor = true; var keepCheck = true;
var platform = [];
var player;
var nearest;
var distance = 400;
var restart = false;
var flag = true; touch = true;
var velocity = 1;
var score = 0;
var finalScore = 0;
var jumpFlag = false;

var totalX = 0;
var totalY = 0;
var avgX = 0;
var avgY = 0;
var count = 0;

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data

function preload(){

  play = loadImage("images/player.png");
  convR = loadImage("images/conveyor_right.png");
  convL = loadImage("images/conveyor_left.png");
  fake = loadImage("images/fake.png");
  trampoline = loadImage("images/trampoline.png");

  nails = loadImage("images/nails.png");
  normal = loadImage("images/normal.png");

  ceiling = loadImage("images/ceiling.png");
  wall = loadImage("images/wall.png");

  heart = loadImage("images/heart.png");
  speedUp = loadImage("images/accelerate.png");
  speedDown = loadImage("images/slowdown.png");
//player = loadImage("images/player.png");
}


function setup() {
  createCanvas(400, 400);
  player = new Player(play, 32, 32);

	// serial = new p5.SerialPort(); // make a new instance of  serialport librar
	// serial.on('list', printList); // callback function for serialport list event
	// serial.on('data', serialEvent); // callback for new data coming in
	// serial.list(); // list the serial ports
	// serial.open("/dev/cu.usbmodem14321"); // open a port

}

function draw() {
  background(0);
  createBound();
  playerMove();
  if(frameCount%30 == 0)
    makePlatform();

  if(frameCount%311 == 0)
    makeHeart();

  if(frameCount%191 == 0)
    makeSpeed();

  movePlatform();
  moveSpeed();
  moveHeart();


  if(player.posY > 420 || player.life <= 0){
    push()
    fill(255,0,0);
    textSize(30);
    text("GAME OVER", 100, 200);
    pop()
    player.posY = 500;
    player.life = 0;
    score = finalScore;
    //restart = false;
    if(keyIsDown(ENTER)|| fromSerial[0] < -0.2){
       player = new Player(play, 32, 32);
       platform = [];
       velocity = 1;
       score = 0;
       newHeart = null;
       newSpeed = null;
    }
  }
  else{
    if(frameCount%10 == 0)
    	score++;
    //score = floor(frameCount/10);
    finalScore = score;
  }
  pop()
  fill(255, 0, 0);
  textSize(20);
  text("Life: "+player.life, 20, 30);
  text("Score: " + score, 280, 30);
  push()
  for(var i = 0; i < player.life; i++){
      image(heart, 20+22*i,30, 20,20);
  }

}

function createBound(){
  image(wall, 0, 0);
  image(wall, 383, 0);
  image(ceiling, 0, 0);
}

function playerMove(){

    if(keyIsDown(UP_ARROW) || fromSerial[0] >= 0.2){
     if(isOnFloor == true){
       //if(jumpFlag == false){
         //jumpFlag = true;
         player.jump();
         isOnFloor = false;
       //}
     }
    }

   if(keyIsDown(LEFT_ARROW)|| fromSerial[1] < -0.1){
     if(player.posX <= 17)
       player.velX = 0;
     else
       player.velX = 5;
     if(isOnFloor == true){
       player.moveLeft();
     }
     else{
       player.moveFlyLeft();
     }
   }
   else if(keyIsDown(RIGHT_ARROW) || fromSerial[1] > 0.1){
     //player.velocity = 10;
     if(player.posX >= 350)
       player.velX = 0;
     else
       player.velX = 5;
     if(isOnFloor == true){
       player.moveRight();
     }
     else{
       player.moveFlyRight();
     }
   }
   else{
     //player.velocity = 0;
     if(isOnFloor == true){
       player.stop();
     }
     else{
       player.moveFly();
     }
   }
}


function makeHeart(){
  var posX = random(17, 285);
  var posY = height;
  newHeart = new Sprite(heart, 102, 96, 0, "heart");
  newHeart.init(posX, posY, true);
}

function moveHeart(){
  if(newHeart != null){
    if(newHeart.posY > -20){
      newHeart.accelerate(velocity);
      newHeart.heartShow();
    }

    getHeart(player, newHeart);
  }

}

function getHeart(player, heart){
  if(player.posX + player.width >= heart.posX+3 && player.posX <= heart.posX + 17 && player.posY + player.height >= heart.posY+3 && player.posY <= heart.posY + 17){
    heart.posY = -50;
    if(player.life != 10)
      player.life++;
  }
}

function makeSpeed(){
  var posX = random(17, 285);
  var posY = height;
  var randSpeed = random(100);
  if(randSpeed < 50){
    newSpeed = new Sprite(speedUp, 25, 25, 0, "up");
  }
  else{
    newSpeed = new Sprite(speedDown, 25, 25, 0, "down");
  }
  newSpeed.init(posX, posY, true);
}

function moveSpeed(){
  if(newSpeed != null){
    if(newSpeed.posY > -20){
      newSpeed.accelerate(velocity);
      newSpeed.heartShow();
    }

    getSpeed(player, newSpeed);
  }

}

function getSpeed(player, speed){
  if(player.posX + player.width >= speed.posX+3 && player.posX <= speed.posX + 22 && player.posY + player.height >= speed.posY+3 && player.posY <= speed.posY + 22){
    speed.posY = -50;
    if(speed.label == "up"){
      velocity += 0.5;
    }
    else{
      if(velocity > 2)
        velocity -= 0.5;
    }
  }
}

function makePlatform(){
   var posX = random(17, 285);
   var posY = height;
   var randPlat = random(100);
   if(randPlat < 40){
     var newNormal = new Sprite(normal, 98, 16, 0, "normal");
     newNormal.init(posX, posY, true);
     platform.push(newNormal);
   }
   else if(randPlat < 60){
     var newNails = new Sprite(nails, 98, 31, 0, "nails");
     newNails.init(posX, posY, true);
     newNails.boundY = 15;
     platform.push(newNails);
   }
   else if(randPlat < 80){
     var newConvL = new Sprite(convL, 98, 16, 4, "convL");
     newConvL.init(posX, posY, false);
     platform.push(newConvL);
   }
   else if(randPlat < 100){
     var newConvR = new Sprite(convR, 98, 16, 4, "convR");
     newConvR.init(posX, posY, false);
     platform.push(newConvR);
   }
   // else if(randPlat < 80){
   //   var newTrampoline = new Sprite(trampoline, 98, 22, 6, "trampoline");
   //   newTrampoline.init(posX, posY, false);
   //   platform.push(newTrampoline);
   // }
   // else{
   //   var newFake = new Sprite(fake, 98, 36, 6, "fake");
   //   newFake.init(posX, posY, false);
   //   platform.push(newFake);
   // }

}

function movePlatform(){
  nearest = -1;
  distance = 400;
  if(frameCount%1000 == 0){
     velocity += 0.5;
   }
  for(var i = 0; i < platform.length; i++){
    if(platform[i].posY > -20){
      platform[i].accelerate(velocity);
      if(platform[i].isStable == false)
        platform[i].show();
      else
        platform[i].stableShow();

      if(platform[i].posY + platform[i].height - player.posY - player.height >= 0 && platform[i].posY + platform[i].height - player.posY - player.height < distance){
      	distance = platform[i].posY - player.posY;
      	nearest = i;
    	}
    }
    else{
      platform.splice(i, 1);
    }


  }

  if(platform.length > 0 && nearest != -1){
  	 //print(distance+" "+nearest+":  " +platform[nearest].posY+"     "+player.posY);
    checkCollision(player, platform[nearest]);
  }
}

function checkCollision(player, plate){
  //print(flag);
		if(player.posY >= 16){
      if((player.posY+player.height) >= plate.posY+plate.boundY && (player.posY+player.height) <= (plate.posY+plate.height) && player.posX >= (plate.posX-16) && player.posX <= (plate.posX+plate.width-16)){
         isOnFloor = true;
         player.posY = plate.posY + plate.boundY - player.height;

         if(plate.label == "normal"){
           if(flag == true)
            stepOnNormal();
         }
         else if(plate.label == "nails"){
           if(flag == true)
            stepOnNail();
         }
         else if(plate.label == "convL"){
           stepOnConvL();
         }
         else if(plate.label == "convR"){
           stepOnConvR();
         }
         //keepCheck = false;
      }
      else{
         isOnFloor = false;
         flag = true;
        touch = true;
        //keepCheck = true;
      }
    }
  else{
    player.posY = 16;
    isOnFloor = false;
    if(touch == true){

    	touchCeiling();

    }
  }


}

function stepOnNail(){
  player.life -= 3;
  flag = false;
}

function stepOnNormal(){
  // if(player.life < 10)
  // 	player.life += 1;
  flag = false;
}

function stepOnConvL(){
  player.posX -= 2
}

function stepOnConvR(){
  player.posX += 2
}

function touchCeiling(){
  player.life -= 5;
  touch = false;
}

function printList(portList) {
	for (var i = 0; i < portList.length; i++) {
		// Display the list the console:
		print(i + " " + portList[i]);
	}
}

function serialEvent() {
	// this is called when data is recieved, data will then live in fromSerial
	var stringFromSerial = serial.readLine();
  if (stringFromSerial.length>0){
    var trimmedString = trim(stringFromSerial);
    fromSerial = split(trimmedString, ',');
    //print(fromSerial[0], " ",fromSerial[1]);
    count++;
    //console.log(count+ "    "+frameCount);
    totalX += fromSerial[0];
    totalY += fromSerial[1];

    avgX = totalX/count;
    avgY = totalY/count;
    console.log(avgX+ "  " + avgY);
  }
}
var texts;

//initialize the settings of WordCrowd
var options = {
		container:"#wordCrowdContainer",
		data : texts,
		stopwordsRemove:true,
		width:400,
		height:400,
		background :"white",
		fontsize_range : {
			min : 12,
			max : 36
		},
		hover_color :"black",
		sortDescending : true,
		colors:"random",
		collision:{
			min:500,
			max:1000
		},
	    angles : [0,90], // angles should be between 0 and 360
	    font_families:[ "Verdana", "Arial"],
	    readFromFile:{
	    	type:"text",
	    	fileLocation:false
	    }
	};

var canvas;
var nytUrl;
var dataNyt;
var categories;
var timePer;
var enter;
var result;
var facets = [];
var keywords = [];
var cnt = 0;
var groups = [];
var titles = [];
var change = true;
var firPage;
var secPage;

function setup() {
  secPage = createCanvas(400,400);
  //make a selectbox for category
  categories = createSelect();
  categories.position(0,0);
  categories.option('Arts');
  categories.option('Movies');
  categories.option('World');
  categories.option('Technology');
  categories.option('all-sections');
  //make a selectbox for time period
  timePer = createSelect();
  timePer.position(100,0);
  timePer.option('1');
  timePer.option('7');
  timePer.option('30');
  //make a button to generate WordCrowd
  enter = createButton('Generate');
  enter.position(150, 0);
  enter.mouseClicked(clickEvent);
  
  //firPage = select("#wordCrowdContainer");
  //firPage.mouseClicked(changeGraph);
  
  //secPage = select("#secondCrowdContainer");
  //secPage.mouseClicked(changeGraph);
  
} 

// function draw() {
//   background(220);
//   if(groups.length > 0){
//      //print(groups.length);
//      for(var i = 0; i < groups.length; i++){
//           text(groups[i].words, i*20, 200+i*20);
//      }
//   }
// }

function clickEvent(){
  //call the data from NYTimes API
  var cat = categories.value();
  var tim = timePer.value();
  
  print(cat);
  print(tim);
  loadJSON("https://api.nytimes.com/svc/mostpopular/v2/mostviewed/"+ cat + "/" + tim + ".json?api-key=7e529d60aacd46f0a50f06fdb1e75899", jsonLoaded);
    
}

function jsonLoaded(newdata) {
	//reset the variables when generates a new WordCrowd
  result = newdata.results;
  document.getElementById("wordCrowdContainer").innerHTML = "";
  groups = [];
  facets = [];
  titles = [];
  keywords = [];
  //console.log(result.length);
   
	//get the facet data (and title)
  for(var i = 0; i < result.length; i++){
    facets.push(result[i].des_facet);
    titles.push(result[i].title);

    //console.log(titles[i]);

    for(var j = 0; j < facets[i].length; j++){
       keywords.push(facets[i][j]);
       cnt++;
    }
  }
  
  keywordCount();
  
  for(var i = 0; i < groups.length; i++){
   print(groups[i].words + " " + groups[i].count);
  }
  
  //put all the keywords into one string for WordCrowd to read
  options.data = keywords.join();
  //options.data = titles.join();
  
  //make a WordCrowd
  wc = new WordCrowd(options);
  //options.container = "#secondCrowdContainer";
  //wc = new WordCrowd(options);
  secPage.hide();
}


// function changeGraph(){
//   change = !change;

//   if(change == true){
//     firPage.show(); 
//     secPage.hide();
//   }
//   else{
//     firPage.hide();
//     secPage.show();
//   }
// }


function keywordCount(){
   keywords.sort();

  cnt = 1;
  //for(var i in keywords){
  for(var i = 1; i < keywords.length; i++){
    //console.log(keywords[i]);
    //text(keywords[i], 0, i*20+20);
    if(keywords[i] == keywords[i-1]){
      cnt++;

    }
    else{
      groups.push(new KeyWords(keywords[i-1], cnt));
      cnt = 1;
    }
    
    if(i == keywords.length - 1){
      groups.push(new KeyWords(keywords[i], cnt)); 
    }
    
  }
    
}var serial;          // variable to hold an instance of the serialport library
var portName = 'COM4';  // fill in your serial port name here
var fromSerial = []; 
var walls = [];
var newWall;
var ball;
var flag = false;
var finalPos;
var pos = 0;
function setup() {
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port

	createCanvas(400,400);
  
}

function draw(){
  background(220);
  if(flag == false){
    pos = map(fromSerial[0], 0, 1023, 0, 400);
    print(pos);
    ball = new Ball(pos, 350);
    ball.show();

    if(frameCount%60 == 0){
      newWall = new Wall();
      newWall.init();
      walls.push(newWall);

    }

    for(var i = 0; i < walls.length; i++){
      walls[i].show();
      if(walls[i].y > 400)
        walls.splice(i,1);
    }
    if(walls.length>0)
      [flag, finalPos] = isCollide(ball, walls[0]);

  }
  else{
    for(var i = 0; i < walls.length; i++)
      walls[i].stop();
    ellipse(finalPos, 350, 30);
    textAlign(CENTER);
    text("GAME OVER", 200,200);
    
    if(fromSerial[1] == true){
      clear();
      walls = [];
      flag = false;
    }
  }
}


function isCollide(ball, wall){
  var flag = false;
  if((ball.y - wall.y-wall.height <= ball.diameter/2 && (ball.x <= wall.width || ball.x >= this.x+this.width+this.space)) ||
    ((ball.x - ball.diameter/2 <= wall.width || ball.x + ball.diameter/2 >= wall.width+wall.space) && ball.y <= wall.y + wall.height))
      flag = true;
  else
    	flag = false;
  
  return [flag, pos];
}

 
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
  //only called when something arrived to the serial port
  var stringFromSerial = serial.readLine();
  if(stringFromSerial.length > 0){
    var trimmedString = trim(stringFromSerial);
    //fromSerial = Number(trimmedString);
    fromSerial = split(trimmedString, ',');
   // print(fromSerial[0], " ",fromSerial[1]);
  }
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}var planet = [];
var startPoint;
var player;

function setup() { 
  createCanvas(400, 400);
  for(var i = 0; i < 3; i++)
    planet.push(new Planet(i)); 
  
  startPoint = floor(random(planet.length));
  player = new Player(planet[startPoint]);
} 

function draw() { 
  background(220);
  for(var i = 0; i < 3; i++)
    planet[i].put();
  player.put();
}

function keyPressed(){
  if(keyCode == UP_ARROW){
    player.jump(planet[player.onPlanet]);
    while(dist(player.x, player.y, planet[player.onPlanet].x, planet[player.onPlanet].y) > planet[player.onPlanet].size){
      player.put();
      player.jump(planet[player.onPlanet]);
    	print(player.vel);
    }
  }
}var serial;          // variable to hold an instance of the serialport library
var portName = 'COM4';  // fill in your serial port name here
var fromSerial = []; 
var walls = [];
var newWall;
var ball;
var flag = false;
var finalPos;
var pos = 0;
var wallImg, mushImg, bMushImg;
var pnt = 0;

function preload(){
  wallImg = loadImage('walls.jpg');
  mushImg = loadImage('mushroom.jpg');
  bMushImg = loadImage('blackMushroom.jpg');
}

function setup() {
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port

	createCanvas(400,400);
  
}

function draw(){
  background(255);
  if(flag == false){
    pos = map(fromSerial[0], 0, 1023, 0, 400);
    ball = new Ball(pos, 350, mushImg);
    ball.show();

    if(frameCount%60 == 0){
      newWall = new Wall(wallImg);
      newWall.init();
      walls.push(newWall);

    }

    for(var i = 0; i < walls.length; i++){
      walls[i].show();
      if(walls[i].y > 400)
        walls.splice(i,1);
    }
    if(walls.length>0)
      [flag, finalPos] = isCollide(ball, walls[0]);
		
    pnt++;
  }
  else{
    for(var i = 0; i < walls.length; i++)
      walls[i].stop();
    image(bMushImg, finalPos, 350, 25, 25);
    textAlign(CENTER);
    textSize(65);
    text("GAME OVER", 200,200);
    
    if(fromSerial[1] == true){
      //clear();
      walls = [];
      flag = false;
      pnt = 0;
    }
  }
  
  textAlign(RIGHT);
  textSize(20);
  text("Point: ", 360, 25);
  text(pnt, 400, 25);
}


function isCollide(ball, wall){
  var flag = false;
  if((ball.y - wall.y-wall.height <= ball.diameter/2 && (ball.x <= wall.width || ball.x >= this.x+this.width+this.space)) ||
    ((ball.x - ball.diameter/2 <= wall.width || ball.x + ball.diameter/2 >= wall.width+wall.space) && ball.y <= wall.y + wall.height))
      flag = true;
  else
    	flag = false;
  
  return [flag, pos];
}

 
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
  //only called when something arrived to the serial port
  var stringFromSerial = serial.readLine();
  if(stringFromSerial.length > 0){
    var trimmedString = trim(stringFromSerial);
    //fromSerial = Number(trimmedString);
    fromSerial = split(trimmedString, ',');
    print(fromSerial[0], " ",fromSerial[1]);
  }
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}var canvas;
var coolDiv, otherDiv;
var button;
var x = 0;
function setup() { 
  canvas = createCanvas(400, 400);
  canvas.position(0,0);
  
 
  
  button = createButton('CLICKKKKK');
  button.position(0,0);
  button.mousePressed(buttonClicked); //need callback
} 

function draw() { 
  background(220);
  fill(50);
  rect(x,0,100,100);
}

function buttonClicked(){
   coolDiv = select('#first');
  //use js to give property instead of CSS
  coolDiv.style('background-color', 'green');
  coolDiv.position(0,200);
  
  otherDiv = select('a');
  otherDiv.hide();
  
  x += 10;
}var posX, posY, startX, startY;
var nowFire;
var fireworks = [];
var scatter = [];
var img;
var hidWord = [];
var cnt = 0;

function preload(){
  img = loadImage('brooklynbridge.jpg');
}

function setup() { 
  canvas = createCanvas(800, 640);
  canvas.position(0,0);

} 

function draw() { 
  image(img, 0,0);

  words();

  //draw when you drag
  if(mouseIsPressed){
      nowFire.show(); 
    }
  //draw fireworks and move them
  if(fireworks.length > 0){    
    for(var i = 0; i < fireworks.length; i++){
      fireworks[i].show();
      if(fireworks[i].cnt < 100){
        if(fireworks[i].go == true)
          fireworks[i].fire();
      }
      else{
        if(fireworks[i].go == true)
        	fireworks[i].bang();
        else{
          scatter.push(new Array());
          for(var j = 0; j < 30; j++){
            scatter[scatter.length -1].push(new Scatter(fireworks[i].startX, fireworks[i].startY, TWO_PI*j/30));
          } 
          fireworks.splice(i,1);
          
        }
      }
    }
  }
  
  if(scatter.length > 0){
    for(var i = 0; i < scatter.length; i++){
      for(var j = 0; j < scatter[i].length; j++){ 
      	scatter[i][j].show();
        if(scatter[i][j].cnt < 100){
          scatter[i][j].calDist();
          scatter[i][j].stretch();
          scatter[i][j].fire();
        }
        else{
          if(scatter[i][j].go == true)
        		scatter[i][j].bang();
        	else{
          	scatter[i].splice(j, 1);
          }
        }
      }
    }
  }
  
}

function words(){
  hidWord.push(createDiv("OH YEAH"));
  hidWord.push(createDiv("BANG"));
  hidWord.push(createDiv("HAHAHA"));
  
  for(var i = 0; i < hidWord.length; i++){
    hidWord[i].style('color', "#ae32bc");
    hidWord[i].style('fontSize',"40px");
    hidWord[i].position(300+i*100,200+i*100);
    hidWord[i].hide();
  }
  
  if(cnt%5 == 3 || cnt%5 == 4)
    hidWord[0].show();
  
  if(cnt%8 == 6 || cnt%8 == 7)
    hidWord[1].show();
  
  if(cnt%11 == 9 || cnt%11 == 10)
    hidWord[2].show();
  
  
}

function mousePressed(){
	nowFire = new Firework(mouseX, mouseY, mouseX, mouseY);
  //nowFire.show();
}
function mouseDragged(){
  nowFire.endX = mouseX;
  nowFire.endY = mouseY;
  //nowFire.show();
}
function mouseReleased(){
  nowFire.calDist();
  nowFire.go = true;
  fireworks.push(nowFire);
  cnt++;
}var chess = [];
var surChess = [];
var cntBlack, cntWhite;
var posX, posY;
var newA, newB;
var fin = 0;
var turn = false;
var returnPara = [];

function setup() { 
  createCanvas(500, 400);
  background(220);
  for(var i = 0; i < 9; i++){
    stroke(0);
    line(0, 50*i, 400, 50*i);
    line(50*i, 0, 50*i, height);
  }
  
  for(var i = 0; i < 8; i++){
    chess.push(new Array());
    for(var j = 0; j < 8; j++){
       chess[i].push(new Chess(400/8*i,height/8*j,i,j, true));
    }
  }
  //print(chess.length);
  chess[3][4].filled = false;
  chess[4][3].filled = false;
  noStroke();
  for(var i = 3; i < 5; i++){
    for(var j = 3; j < 5; j++)
      chess[i][j].makeChess();
  }
  cntBlack = 2;
  cntWhite = 2;
} 

function draw() { 
  textAlign(LEFT);
  noStroke(0);
  fill(220);
  rect(410, 130, 70, 20);
  fill(0);
  textSize(15);
  text("Black: ", 410, 150);
  text(cntBlack, 460, 150);
  fill(220);
  rect(410, 230, 70, 20);
  fill(255);
  text("White: ", 410, 250);
  text(cntWhite, 460, 250);
  
  if(turn == true){
    fill(220);
    rect(410, 30, 90, 20);
    fill(0);
    text("Now: WHITE", 410, 50); 
  }
  else{
    fill(220);
    rect(410, 30, 90, 20);
    fill(0);
    text("Now: BLACK", 410, 50); 
  }
  
  if(cntWhite + cntBlack == 64){
      if(cntWhite > cntBlack){
        textAlign(CENTER);
        textSize(70);
        fill(random(255),random(255),random(255));
        text("White WIN!!!!", 200,200); 
      }
      else{
        textAlign(CENTER);
        textSize(70);
        fill(random(255),random(255),random(255));
        text("Black WIN!!!!", 200,200); 
      }
  }

}

function mouseClicked(){
  posX = mouseX;
  posY = mouseY;

  if(posX < 400 && posY < height){
    newA = floor(posX/50);
    newB = floor(posY/50);
		
    if(chess[newA][newB].put == false){
			surChess = checkSur(chess, newA, newB, turn);

      if(surChess.length > 0){
         returnPara = changeColor(chess, chess[newA][newB], surChess, turn);
         if(turn == true && returnPara[1] != 0){
           cntWhite += returnPara[1]+1;
           cntBlack -= returnPara[1];
         }
         else if(turn == false && returnPara[1] != 0){
           cntWhite -= returnPara[1];
           cntBlack += returnPara[1]+1; 
         }
        
         turn = returnPara[0];
      }
    }
    


  }
}

function checkSur(chess, x, y, turn){
  var surChess = [];
  
  for(var i = -1; i < 2; i++){
    for(var j = -1; j < 2; j++){
       if(i == 0 && j == 0)
         continue;
       else{
         try{
           if(chess[x+i][y+j].put == true){
             if(turn == false){
               if(chess[x+i][y+j].filled == true)
                 surChess.push(chess[x+i][y+j]);
             }
             else{
               if(chess[x+i][y+j].filled == false)
                 surChess.push(chess[x+i][y+j]); 
             }
           }
         }
         catch(err){
           continue; 
         }
       }
    }
  }
  //print(surChess[0]);
  return surChess;

}

function changeColor(chess, nowChess, surChess, turn){
  var posX, posY;
  var relPosX, relPosY;
  var colChangeStack = [];
  var changed = false;
  var cnt = 0;  
  nowChess.filled = turn;
  for(var i = 0; i < surChess.length; i++){
    posX = nowChess.idxX;
    posY = nowChess.idxY;
    relPosX = surChess[i].idxX - nowChess.idxX;
    relPosY = surChess[i].idxY - nowChess.idxY;
    print(posX, " ", posY, " ", relPosX, " ", relPosY);
    //posX += relPosX;
    //posY += relPosY;
    while(0 <= posX && posX < 8 && 0 <= posY && posY < 8){
       if(chess[posX][posY].put == true){
         if(chess[posX][posY].filled != nowChess.filled){
           colChangeStack.push(chess[posX][posY]); 
         }
         else{
           for(var j = 0; j < colChangeStack.length; j++){
             colChangeStack[j].filled = !colChangeStack[j].filled;
             colChangeStack[j].makeChess(); 
           }
					 changed = true;
           cnt += colChangeStack.length;
           break;
         }
       }
       if(chess[posX][posY].put == false && colChangeStack.length !=0)
         break;
       posX += relPosX;
       posY += relPosY;
      print(colChangeStack.length);
    }
    colChangeStack = [];
  }
  
  if(changed == true){
    nowChess.makeChess();
    turn = !turn;

  }
  return [turn, cnt];
}

function checkFin(){
  var flag = false;
  if(cntWhite + cntBlack == 64){
    flag = true;
  }
  else{
    for(var i = 0; i < 8; i++){
      for(var j = 0; j < 8; j++){
        if(chess[i][j].put == true)
          continue;
        else{
          
        }
      }
    }
  }
  if(flag == true){
      if(cntWhite > cntBlack){
        textAlign(CENTER);
        textSize(70);
        fill(random(255),random(255),random(255));
        text("White WIN!!!!", 200,200); 
      }
      else{
        textAlign(CENTER);
        textSize(70);
        fill(random(255),random(255),random(255));
        text("Black WIN!!!!", 200,200); 
      }
  }
}//var chess = [[]];
var chess = [];
var a, b;
var posX, posY;
var newA, newB;
var fin = 0;
function setup() { 
  createCanvas(400, 400);
  a = floor(random(0,5));
  b = floor(random(0,4));
  print(a, b);
  for(var i = 0; i < 5; i++){
    chess.push(new Array());
    for(var j = 0; j < 4; j++){
      if(i == a && j == b)
        chess[i].push(new Chess(width/5*i,height/4*j, false));
      else
        chess[i].push(new Chess(width/5*i,height/4*j, true));
    }
  }
} 

function draw() { 
  background(220);
  

  print(fin);
  if(fin == 20){
    clear();
    textSize(70);
		textAlign(CENTER);
    fill(random(255), random(255), random(255));
    text("YOU WIN!!!", 200, 200);
  }
  else{
    fin = 0;
    for(var i = 0; i < 5; i++){
    for(var j = 0; j < 4; j++){
        chess[i][j].makeChess();
    }
  }
  
  for(var i = 0; i < 5; i++){
    for(var j = 0; j < 4; j++){
      if(chess[i][j].filled == false)
         fin++;
   	}
 	}
  
  } 
  
}

function mouseClicked(){
  posX = mouseX;
  posY = mouseY;

  if(posX < width && posY < height){
    newA = floor(posX/80);
    newB = floor(posY/100);

    chess[newA][newB].filled = !chess[newA][newB].filled;
    
    if(newA < 4){
      chess[newA+1][newB].filled = !chess[newA+1][newB].filled;
    }
    if(newA > 0){
      chess[newA-1][newB].filled = !chess[newA-1][newB].filled;
    }
    if(newB < 3){
      chess[newA][newB+1].filled = !chess[newA][newB+1].filled;
    }
    if(newB > 0){
      chess[newA][newB-1].filled = !chess[newA][newB-1].filled;
    }
    

  }
}
function setup() { 
  createCanvas(400, 400);
  var scene = new THREE.Scene();
} 

function draw() { 
  background(220);
}
var num = 10;  
var freq = 20;
var green1, green2, green3, green4, red1;

function preload(){
  green1 = loadImage("green1.jpg");
  green2 = loadImage("green2.jpg");
  green3 = loadImage("green3.jpg");
  green4 = loadImage("green4.jpg");
  red1 = loadImage("red.jpg");
}


function setup() { 
  createCanvas(400, 400);
  frameRate(60);
} 

function draw() { 
  background(220);

  if(frameCount%60 == 0 && num != 0)
    num--;
  
  countDown(num);
  
  if(num > 0 && num <= 5 && frameCount%20 > 0 && frameCount%20 < 10){
    fill(220);
    noStroke();
    rect(150, 50, 100, 100);
    
  }
  
  runningMan(num);
  
  if(num == 0)
    stopMan();
}


function runningMan(num){ 
  if(num > 5)
    freq = 20;
  else
    freq = 10;

  if(0 < frameCount%freq && frameCount%freq <= freq/4)
    image(green1, 125, 200);
  else if(freq/4 < frameCount%freq && frameCount%freq <= freq/2)
    image(green2, 125, 200);     
  else if(freq/2 < frameCount%freq && frameCount%freq <= freq*3/4)
    image(green3, 125, 200);
	else
    image(green4, 125, 200); 

}

function stopMan(){
  image(red1, 125, 200); 
}

function countDown(num){
  textSize(80);
  textAlign(CENTER);
  fill("#EA7500")
  text(num, 200, 130); 
}

var ballVec = [];
var lineVec = [];

var ballNum = 5;
var lineCol;
var cnt = 0;
var button1 = {
  x1: 200-55,
  y1: 320,
  w1: 50,
  h1: 50,
}
var button2 = {
  x2: 200+5,
  y2: 320,
  w2: 50,
  h2: 50 
}

function setup() { 
  createCanvas(400, 400);
  
  
 //Initiate Balls
  for(var i = 0; i < ballNum; i++){
    ballVec.push(new Ball());
  }
} 

function draw() { 
  background('#ececec');
  
  if(frameCount%30 == 1){
    //change the color of each line every 60 frames
    lineVec = [];
    for(var i = 0; i < ballNum; i++){
      if(i == 1){
        lineCol = color(random(0,255), random(0,255), random(0,255), random(20,100));
        lineVec.push(lineCol);
      }
      else if(i > 1){
        lineCol = color(random(0,255), random(0,255), random(0,255), random(20,100));
        lineVec.push(lineCol);
        lineCol = color(random(0,255), random(0,255), random(0,255), random(20,100));
        lineVec.push(lineCol);
      }
    }
    //Delete first ball and add another one every 60 frames
    ballVec.shift();
    ballVec.push(new Ball());
  }
  
  //draw lines
  cnt = 0;
  for(var i = 0; i < ballNum; i++){
     if(i == 1){
       stroke(lineVec[cnt]);
       cnt++;
       line(ballVec[i-1].posX, ballVec[i-1].posY, ballVec[i].posX, ballVec[i].posY); 
     }
     else if(i > 1){
       stroke(lineVec[cnt]);
       cnt++;
       line(ballVec[i-1].posX, ballVec[i-1].posY, ballVec[i].posX, ballVec[i].posY);
       stroke(lineVec[cnt]);
       cnt++
       line(ballVec[i-2].posX, ballVec[i-2].posY, ballVec[i].posX, ballVec[i].posY);
     }
  }
  
  //draw balls
  ellipseMode(CENTER);
  for(var i = 0; i < ballNum; i++){  
    stroke(ballVec[i].col);
    ballVec[i].draw();
  }
  
  
  
  
   //mouse over

  ellipseMode(CORNER);
/*  if ((((mouseX > button1.x1) && (mouseX < button1.x1 + button1.w1) && (mouseY > button1.y1) && (mouseY < button1.y1 + button1.h1)) ||
      ((mouseX > button2.x2) && (mouseX < button2.x2 + button2.w2) && (mouseY > button2.y2) && (mouseY < button2.y2 + button2.h2))) &&
      !mouseIsPressed) {
    fill('#90c8f7');
  } 
  else if ((((mouseX > button1.x1) && (mouseX < button1.x1 + button1.w1) && (mouseY > button1.y1) && (mouseY < button1.y1 + button1.h1)) ||
      ((mouseX > button2.x2) && (mouseX < button2.x2 + button2.w2) && (mouseY > button2.y2) && (mouseY < button2.y2 + button2.h2))) &&
      mouseIsPressed) {
    fill('#cecece');
  } else {
    fill('#ffffff');
  }*/
  
  //Make buttons
  if (((mouseX > button1.x1) && (mouseX < button1.x1 + button1.w1) && (mouseY > button1.y1) && (mouseY < button1.y1 + button1.h1)) &&
     !mouseIsPressed){
    noStroke();
    fill('#00a2ff');
    ellipse(button1.x1, button1.y1, button1.w1, button1.h1);
    fill('#ffffff');
    rect(button1.x1+23, button1.y1+10, 4, 30);
    rect(button1.x1+10, button1.y1+23, 30, 4);
  }
  else if(((mouseX > button1.x1) && (mouseX < button1.x1 + button1.w1) && (mouseY > button1.y1) && (mouseY < button1.y1 + button1.h1)) &&
     mouseIsPressed){
    noStroke();
    fill('#cecece');
    ellipse(button1.x1, button1.y1, button1.w1, button1.h1);
    fill('#ffffff');
    rect(button1.x1+23, button1.y1+10, 4, 30);
    rect(button1.x1+10, button1.y1+23, 30, 4);
  }
  else{
    noStroke();
    fill('#ffffff');
    ellipse(button1.x1, button1.y1, button1.w1, button1.h1);
    fill('#333333');
    rect(button1.x1+23, button1.y1+10, 4, 30);
    rect(button1.x1+10, button1.y1+23, 30, 4);
  }
  
  if(((mouseX > button2.x2) && (mouseX < button2.x2 + button2.w2) && (mouseY > button2.y2) && (mouseY < button2.y2 + button2.h2)) &&
    !mouseIsPressed){
    noStroke();
    fill('#ffb400');
    ellipse(button2.x2, button2.y2, button2.w2, button2.h2);
    fill('#ffffff');
    rect(button2.x2+10, button2.y2+23, 30, 4);
  }
  else if(((mouseX > button2.x2) && (mouseX < button2.x2 + button2.w2) && (mouseY > button2.y2) && (mouseY < button2.y2 + button2.h2)) &&
    mouseIsPressed){
    noStroke();
    fill('#cecece');
    ellipse(button2.x2, button2.y2, button2.w2, button2.h2);
    fill('#ffffff');
    rect(button2.x2+10, button2.y2+23, 30, 4);
  }
  else{
    noStroke();
    fill('#ffffff');
    ellipse(button2.x2, button2.y2, button2.w2, button2.h2);
    fill('#333333');
    rect(button2.x2+10, button2.y2+23, 30, 4);    
  }
}

//class of Ball
function Ball(){
  this.posX = random(0,width);
  this.posY = random(0,height);
  this.dia = random(10,30);
  this.col = color(random(0,255), random(0,255), random(0,255));
  
  
  this.draw = function(){
    fill(this.col);
    ellipse(this.posX, this.posY, this.dia, this.dia);
  }
}


function mousePressed(){

  if ((mouseX > button1.x1) && (mouseX < button1.x1 + button1.w1) && (mouseY > button1.y1) && (mouseY < button1.y1 + button1.h1)){
    ballNum++;
    ballVec.push(new Ball());
    lineCol = color(random(0,255), random(0,255), random(0,255), random(20,100));
    lineVec.push(lineCol);
    lineCol = color(random(0,255), random(0,255), random(0,255), random(20,100));
    lineVec.push(lineCol);
  }
  
  if((mouseX > button2.x2) && (mouseX < button2.x2 + button2.w2) && (mouseY > button2.y2) && (mouseY < button2.y2 + button2.h2)){
    ballNum--;
    ballVec.pop();
    lineVec.pop();
    lineVec.pop();
  }
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  var x = [];
  var y = [];
  
  if(mouseIsPressed){
    x.push(mouseX);
    y.push(mouseY);
  }
  
  for(var i = 0; i < x.length; i++){
   for(var j = 0; j < y.length; j++) {
			ellipse(x[i],y[j], 20);
   }
  }
 
}var ball = {
  x : 0,
  y : 0,
  d : 0,
  xspeed : 5,
  yspeed : 5
};

var button = {
  x : 0,
  y : 0,
  d : 100
};


function setup() { 
  createCanvas(400, 400);
  
  ball.x = random(0,width);
  ball.y = random(0,height);
  ball.d = random(10,30);
  
  button.x = width - button.d;
  button.y = height - button.d;
} 

function draw() { 
  background(220);
  

  rect(button.x, button.y, button.d, button.d);
  
/*
  if(mouseIsPressed && 
     button.x < mouseX && mouseX < button.x + button.d  && 
     button.y < mouseY && mouseY < button.y + button.d){
    fill(0); 
  }
  */
  if(mouseIsPressed && 
     dist(mouseX, mouseY, button.x+button.d/2, button.y+button.d/2) < button.d/2){
    fill(0);
  }
  else{
    fill(255); 
  }
  
  ellipse(ball.x, ball.y, ball.d);
  ball.x += ball.xspeed;

  if(ball.x > width || ball.x < 0){
   ball.xspeed *= -1; 
  }

  ball.y += ball.yspeed;

  if(ball.y > height || ball.y < 0){
   ball.yspeed *= -1; 
  }
  if(ball.xspeed > 50 && ball.yspeed > 50){
		ball.xspeed += random(-10,-2);
    ball.xspeed += random(-10,-2);
  }
  else{
    ball.xspeed += random(-2,2);
    ball.yspeed += random(-2,2);
  }
}

function mousePressed(){

   
}function setup() { 
  createCanvas(400, 400);
    
  background(220);


  
  //
  //Make lines
  var x = random(-100,100);
  line(225, 200, 300+x, 175+x);
  line(300+x, 175+x, 325+x, 150+x);
  line(175, 200, 100+x, 175+x);
  line(100+x, 175+x, 75+x, 150+x);
  //
  
  //Make a triangle
  var col = color(random(0,255), random(0,255), random(0,255));
  fill(col);
  triangle(200,250, 150,150, 250, 150);
  
  
  //Make circles
  col = color(100, 200,0);
  fill(col);


  ellipse(200,112.5,75+random(0,50),75+random(0,50));
  ellipse(200,275,50,50);
  //
  //Make round squares
  col = color(random(0,255), random(0,255), random(0,255));
  fill(col);
  rect(50+x, 100+x, 50, 50, 10);
  col = color(random(0,255), random(0,255), random(0,255));
  fill(col);
  rect(300+x, 100+x, 50, 50, 10);
  //
} 

function draw() { 

  
}var tmp = 0;

function setup() { 
  createCanvas(400, 400);
    

} 

function draw() { 
  background(220);

  if(tmp < 200){
    //Make lines
    line(225, 150, 300, 125);
    line(300, 125, 325, 100);
    line(175, 150, 100, 125);
    line(100, 125, 75, 100);
    //
  }
  else{
    line(225+(tmp-200), 150-(tmp-200), 300+(tmp-200), 125-(tmp-200));
    line(300+(tmp-200), 125-(tmp-200), 325+(tmp-200), 100-(tmp-200));
    line(175-(tmp-200), 150-(tmp-200), 100-(tmp-200), 125-(tmp-200));
    line(100-(tmp-200), 125-(tmp-200), 75-(tmp-200), 100-(tmp-200));
  }
  
  if(tmp < 400){
  //Make a triangle
    var col = color(135,0,0);
    fill(col);
    triangle(200,200, 150,100, 250, 100);
    //
    //Make circles
    col = color(100, 200,0);
    fill(col);
    ellipse(200,62.5,75,75);
  }
  else{
    fill(color(135,0,0));
    triangle(200,200+tmp-400, 150,100+tmp-400, 250, 100+tmp-400);
    fill(color(100,200,0));
    ellipse(200,62.5+tmp-400,75,75);
    strokeWeight(3);
    stroke(200,0,0);
    line(150, 40+tmp-400, 150, 10+tmp-400);
    line(175, 30+tmp-400, 175, -5+tmp-400);
    line(200, 20+tmp-400, 200, -20+tmp-400);
    line(225, 30+tmp-400, 225, -5+tmp-400);
    line(250, 40+tmp-400, 250, 10+tmp-400);
    strokeWeight(0);
    noStroke();
  }
  
  ellipse(200,225+tmp,50,50);
  //
  //Make round squares
  col = color(100, 30, 130);
  fill(col);
  rect(50-tmp, 50-tmp, 50, 50, 10);
  col = color(200, 30, 100);
  fill(col);
  rect(300+tmp, 50-tmp, 50, 50, 10);
  //
  
  tmp++;
}var m;


function setup() { 
  createCanvas(400, 400);
  //frameRate(30);  

} 

function draw() { 
  background(220);
  //Make Legs
  stroke(0);
  strokeWeight(25);
  if(mouseX < 200){
    //left
    line(175, 225, 175-mouseX/5, 225+mouseX/5);
    //right
    line(225, 225, 225+mouseX/5, 225+mouseX/5);
  }
  else if(mouseX <= 400){
    //left
    line(175, 225, 135, 265);
    line(135, 265, 135, 265+mouseX/5);
    //right
    line(225, 225, 265, 265);
    line(265, 265, 265, 265+mouseX/5);   
  }
  else{
    //left
    line(175, 225, 135, 265);
    line(135, 265, 135, 345);
    //right
    line(225, 225, 265, 265);
    line(265, 265, 345, 345);
  }
  
  
  strokeWeight(20);

  //Make hands
  if(mouseX <=400){
    //left
    line(175, 150, 100, 125+mouseX/10);
    line(100, 125+mouseX/10, 75, 100+mouseX/5);
    //right
    line(225, 150, 300-mouseX/10, 125+mouseX/10);
    line(300-mouseX/10, 125+mouseX/10, 325-mouseX/10, 100+mouseX/10);

   //Make body  
    noStroke();
    strokeWeight(0);
    m = map(mouseX,0,width, 0, 360);
    push();
    translate(200,150);
    rotate(radians(m));
    //print(mouseX);
    fill(color(135,0,0));
    triangle(0,50, -50,-50, 50, -50);
    pop();
    
    //Make butt
    fill(color(100,200,0));
    ellipse(200,225,50+mouseX/10,50+mouseX/10);
    
    //Make spear
    fill(color(100,0,mouseX));
    rect(50, 50+mouseX/20, 50-mouseX/11, 50+mouseX/2, 10);
        
    //Make shield
    fill(color(mouseX, 0, 50));
    rect(300-mouseX/10, 50, 50+mouseX/5, 50+mouseX/5, 10+mouseX/10);
  }
  else{
    //left
    line(175, 150, 100, 165);
    line(100, 165, 75, 180);
    //right
    line(225, 150, 260, 165);
    line(260, 165, 285, 140);
    

    
    //Make body
    noStroke();
    strokeWeight(0);
    push();
    translate(200,150);
    rotate(0);
    //print(mouseX);
    fill(color(135,0,0));
    triangle(0,50, -50,-50, 50, -50);
    pop();
    
    //Make butt
    fill(color(100,200,0));
    ellipse(200,225,90,90);
    
    //Make spear
    fill(color(100,0,mouseX));
    rect(50, 70, 15, 250, 10);
    fill(color(200, 100, 50));
    triangle(50,320, 65, 320, 57.5, 340);
    
    //Make shield
    fill(color(mouseX, 0, 50));
    rect(260, 50, 130, 130, 50)
    
    
    //additional Lines
    stroke(0);
    strokeWeight(3);
    line(50, 320, 45, 310);
    line(65, 320, 70, 310);
    line(57.5, 320, 57.5, 305);
    line(53.75, 320, 50, 308);
    line(61.25, 320, 63, 308);
    line(260, 115, 310, 115);
    line(390, 115, 340, 115);
    line(325, 50, 325, 100);
    line(325, 180, 325, 130);
    noFill();
    ellipse(325, 115, 25, 25);
  }
  
  noStroke();
  strokeWeight(0);
  //Make head
  fill(color(100,200,0));
  ellipse(200,62.5,75,75);
  

  

  
}


function setup() { 
  createCanvas(400, 400);
  //frameRate(10);
  
  
} 

function draw() { 
  background(220);
  var x = mouseX; var y = mouseY;
  rect(x, y, 50, 50);

  
}

function setup() { 
  createCanvas(400, 400);
    
  background(220);


  //Make a triangle
  var col = color(135,0,0);
  fill(col);
  triangle(200,200, 150,100, 250, 100);
  //
  //Make lines
  line(225, 150, 300, 125);
  line(300, 125, 325, 100);
  line(175, 150, 100, 125);
  line(100, 125, 75, 100);
  //
  //Make circles
  col = color(100, 200,0);
  fill(col);
  ellipse(200,62.5,75,75);
  ellipse(200,225,50,50);
  //
  //Make round squares
  col = color(100, 30, 130);
  fill(col);
  rect(50, 50, 50, 50, 10);
  col = color(200, 30, 100);
  fill(col);
  rect(300, 50, 50, 50, 10);
  //
} 

function draw() { 

  
}