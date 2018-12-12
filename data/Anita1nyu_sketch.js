let dropdown;
let video;
let button;
let shot;
let img;
let dropdownCountry;
let dropdownGender;
let images = {};

var dragging = false;
var rollover = false;
var x, y, w, h;
var offsetX, offsetY;

function preload() {
	images = {
		"ChileMale": loadImage('Chile.Male.png'),
		"ChileFemale": loadImage('Chile.Female.png'),

		"CubaFemale": loadImage('Cuba.Female.png'),
		"CubaMale": loadImage('Cuba.Male.png'),


		"PeruFemale": loadImage('Peru.Female.png'),
		"PeruMale": loadImage('Peru.Male.png'),


		"MexicoFemale": loadImage('Mexico.Female.png'),
		"MexicoMale": loadImage('Mexico.Male.png'),


		"BoliviaFemale": loadImage('Bolivia.Female.png'),
		"BoliviaMale": loadImage('Bolivia.Male.png'),


		"ArgentinaFemale": loadImage('Argentina.Female.png'),
		"ArgentinaMale": loadImage('Argentina.Male.png'),


		"BrazilFemale": loadImage('Brazil.Female.png'),
		"BrazilMale": loadImage('Brazil.Male.png'),


		"EcuadorFemale": loadImage('Ecuador.Female.png'),
		"EcuadorMale": loadImage('Ecuador.Male.png'),


		"ColombiaFemale": loadImage('Colombia.Female.png'),
		"ColombiaMale": loadImage('Colombia.Male.png'),


		"AlgeriaFemale": loadImage('Algeria.Female.png'),
		"AlgeriaMale": loadImage('Algeria.Male.png'),


		"SouthAfricaFemale": loadImage('SouthAfrica.Female.png'),
		"SouthAfricaMale": loadImage('SouthAfrica.Male.png'),


		"TunisiaFemale": loadImage('Tunisia.Female.png'),
		"TunisiaMale": loadImage('Tunisia.Male.png'),


		"UgandaFemale": loadImage('Uganda.Female.png'),
		"UgandaMale": loadImage('Uganda.Male.png'),


		"KenyaFemale": loadImage('Kenya.Female.png'),
		"KenyaMale": loadImage('Kenya.Male.png'),


		"TanzaniaFemale": loadImage('Tanzania.Female.png'),
		"TanzaniaMale": loadImage('Tanzania.Male.png'),


		"IsraelFemale": loadImage('Israel.Female.png'),
		"IsraelMale": loadImage('Israel.Male.png'),


		"YemenFemale": loadImage('Yemen.Female.png'),
		"YemenMale": loadImage('Yemen.Male.png'),


		"MoroccoFemale": loadImage('Morocco.Female.png'),
		"MoroccoMale": loadImage('Morocco.Male.png'),

		"CanadaFemale": loadImage('Canada.Female.png'),
		"CanadaMale": loadImage('Canada.Male.png'),

		"FranceFemale": loadImage('France.Female.png'),
		"FranceMale": loadImage('France.Male.png'),

		"HangaryFemale": loadImage('Hangary.Female.png'),
		"HangaryMale": loadImage('Hangary.Male.png'),

		"PortugalFemale": loadImage('Portugal.Female.png'),


		"SpainFemale": loadImage('Spain.Female.png'),
		"SpainMale": loadImage('Spain.Male.png'),

		"SwitzerlandFemale": loadImage('Switzerland.Female.png'),
		"SwitzerlandMale": loadImage('Switzerland.Male.png'),

		"U.S.A20SFemale": loadImage('U.S.A20S.Female.png'),
		"U.S.A20SMale": loadImage('U.S.A20S.Male.png'),

		"UKVictorianFemale": loadImage('UKVictorian.Female.png'),
		"UKVictorianMale": loadImage('UKVictorian.Male.png'),

		"WalesFemale": loadImage('Wales.Female.png'),
		"WalesMale": loadImage('Wales.Male.png'),


	}
}

function setup() {
	createCanvas(600, 600);
	background(0);

	video = createCapture(VIDEO);
	video.size(700, 700);
	video.hide();
	createP("");

	button = createButton('snap');
	button.mousePressed(takesnap);
	createP("");

	button = createButton('Select Country');
	dropdownCountry = createSelect();
	dropdownCountry.option('Chile');
	dropdownCountry.option('Cuba');
	dropdownCountry.option('Peru');
	dropdownCountry.option('Mexico');
	dropdownCountry.option('Bolivia');
	dropdownCountry.option('Argentina');
	dropdownCountry.option('Brazil');
	dropdownCountry.option('Ecuador');
	dropdownCountry.option('Colombia');
	dropdownCountry.option('Algeria');
	dropdownCountry.option('SouthAfrica');
	dropdownCountry.option('Tunisia');
	dropdownCountry.option('Uganda');
	dropdownCountry.option('Kenya');
	dropdownCountry.option('Tanzania');
	dropdownCountry.option('Israel');
	dropdownCountry.option('Yemen');
	dropdownCountry.option('Morocco');
	dropdownCountry.option('Canada');
	dropdownCountry.option('France');
	dropdownCountry.option('Hangary');
	dropdownCountry.option('Italy');
	dropdownCountry.option('Portugal');
	dropdownCountry.option('Spain');
	dropdownCountry.option('Switzerland');
	dropdownCountry.option('U.S.A20S');
	dropdownCountry.option('UKVictorian');
	dropdownCountry.option('Wales');

	createP("");

	button = createButton('Select Gender');
	dropdownGender = createSelect();
	dropdownGender.option('Male');
	dropdownGender.option('Female');
	createP("");

	button = createButton('Apply Outfit');
	button.mousePressed(addImage);
} {
	// Starting location
	x = 150;
	y = 30;
	// Dimensions150, 30, 2600, 2600);
	w = 2600;
	h = 2600;
}

function addImage() {
	let country = dropdownCountry.value();
	let gender = dropdownGender.value();

	let imageKey = country + gender;
	console.log("imageKey: ", imageKey);

	// ChileMale
	img = images[imageKey];
}

function takesnap() {
	shot = video.get();
}

function draw() {
	if (shot) {
		image(shot, 0, 0);
	}
	if (img) {
		image(img, x, y, w, h);
	}

	if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
		rollover = true;
	} else {
		rollover = false;
	}


	if (dragging) {
		x = mouseX + offsetX;
		y = mouseY + offsetY;

	}
}

function mousePressed() {

	if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
		dragging = true;
		offsetX = x - mouseX;
		offsetY = y - mouseY;
		console.log(dragging);
	}
}

function mouseReleased() {
	// Quit dragging
	dragging = false;

}let dropdown;
let video;
let button;
let shot;
let img;
let dropdownCountry;
let dropdownGender;
let images = {};





var dragging = false; 
var rollover = false; 
var x, y, w, h;          
var offsetX, offsetY;   











function preload() {
  images = {
    "ChileMale": loadImage('Chile.Male.png'),
    "ChileFemale": loadImage('Chile.Female.png'),

    "CubaFemale": loadImage('Cuba.Female.png'),
    "CubaMale": loadImage('Cuba.Male.png'),


    "PeruFemale": loadImage('Peru.Female.png'),
    "PeruMale": loadImage('Peru.Male.png'),


    "MexicoFemale": loadImage('Mexico.Female.png'),
    "MexicoMale": loadImage('Mexico.Male.png'),


    "BoliviaFemale": loadImage('Bolivia.Female.png'),
    "BoliviaMale": loadImage('Bolivia.Male.png'),


    "ArgentinaFemale": loadImage('Argentina.Female.png'),
    "ArgentinaMale": loadImage('Argentina.Male.png'),


    "BrazilFemale": loadImage('Brazil.Female.png'),
    "BrazilMale": loadImage('Brazil.Male.png'),


    "EcuadorFemale": loadImage('Ecuador.Female.png'),
    "EcuadorMale": loadImage('Ecuador.Male.png'),


    "ColombiaFemale": loadImage('Colombia.Female.png'),
    "ColombiaMale": loadImage('Colombia.Male.png'),


    "AlgeriaFemale": loadImage('Algeria.Female.png'),
    "AlgeriaMale": loadImage('Algeria.Male.png'),


    "SouthAfricaFemale": loadImage('SouthAfrica.Female.png'),
    "SouthAfricaMale": loadImage('SouthAfrica.Male.png'),


    "TunisiaFemale": loadImage('Tunisia.Female.png'),
    "TunisiaMale": loadImage('Tunisia.Male.png'),


    "UgandaFemale": loadImage('Uganda.Female.png'),
    "UgandaMale": loadImage('Uganda.Male.png'),


    "KenyaFemale": loadImage('Kenya.Female.png'),
    "KenyaMale": loadImage('Kenya.Male.png'),


    "TanzaniaFemale": loadImage('Tanzania.Female.png'),
    "TanzaniaMale": loadImage('Tanzania.Male.png'),


    "IsraelFemale": loadImage('Israel.Female.png'),
    "IsraelMale": loadImage('Israel.Male.png'),


    "YemenFemale": loadImage('Yemen.Female.png'),
    "YemenMale": loadImage('Yemen.Male.png'),


    "MoroccoFemale": loadImage('Morocco.Female.png'),
    "MoroccoMale": loadImage('Morocco.Male.png'),
  
    "CanadaFemale": loadImage('Canada.Female.png'),
    "CanadaMale": loadImage('Canada.Male.png'),
    
    "FranceFemale": loadImage('France.Female.png'),
    "FranceMale": loadImage('France.Male.png'),
    
    "HangaryFemale": loadImage('Hangary.Female.png'),
    "HangaryMale": loadImage('Hangary.Male.png'),
    
    "PortugalFemale": loadImage('Portugal.Female.png'),
    
    
    "SpainFemale": loadImage('Spain.Female.png'),
    "SpainMale": loadImage('Spain.Male.png'),
    
    "SwitzerlandFemale": loadImage('Switzerland.Female.png'),
    "SwitzerlandMale": loadImage('Switzerland.Male.png'),
    
    "U.S.A20SFemale": loadImage('U.S.A20S.Female.png'),
    "U.S.A20SMale": loadImage('U.S.A20S.Male.png'),
    
    "UKVictorianFemale": loadImage('UKVictorian.Female.png'),
    "UKVictorianMale": loadImage('UKVictorian.Male.png'),
    
    "WalesFemale": loadImage('Wales.Female.png'),
    "WalesMale": loadImage('Wales.Male.png'),
   

  }
}

function setup() {
  createCanvas(600, 600);
  background(0);

  video = createCapture(VIDEO);
  video.size(700, 700);
  video.hide();
  createP("");

  button = createButton('snap');
  button.mousePressed(takesnap);
  createP("");

  button = createButton('Select Country');
  dropdownCountry = createSelect();
  dropdownCountry.option('Chile');
  dropdownCountry.option('Cuba');
  dropdownCountry.option('Peru');
  dropdownCountry.option('Mexico');
  dropdownCountry.option('Bolivia');
  dropdownCountry.option('Argentina');
  dropdownCountry.option('Brazil');
  dropdownCountry.option('Ecuador');
  dropdownCountry.option('Colombia');
  dropdownCountry.option('Algeria');
  dropdownCountry.option('SouthAfrica');
  dropdownCountry.option('Tunisia');
  dropdownCountry.option('Uganda');
  dropdownCountry.option('Kenya');
  dropdownCountry.option('Tanzania');
  dropdownCountry.option('Israel');
  dropdownCountry.option('Yemen');
  dropdownCountry.option('Morocco');
dropdownCountry.option('Canada');
dropdownCountry.option('France');
dropdownCountry.option('Hangary');
dropdownCountry.option('Italy');
dropdownCountry.option('Portugal');
dropdownCountry.option('Spain');
dropdownCountry.option('Switzerland');
dropdownCountry.option('U.S.A20S');
dropdownCountry.option('UKVictorian');
dropdownCountry.option('Wales');
  
  createP("");

  button = createButton('Select Gender');
  dropdownGender = createSelect();
  dropdownGender.option('Male');
  dropdownGender.option('Female');
  createP("");

  button = createButton('Apply Outfit');
  button.mousePressed(addImage);
}
{
 // Starting location
  x = 150;
  y = 30;
  // Dimensions150, 30, 2600, 2600);
  w = 2600;
  h = 2600;
}
function addImage() {
  let country = dropdownCountry.value();
  let gender = dropdownGender.value();

  let imageKey = country + gender;
  console.log("imageKey: ", imageKey);

  // ChileMale
  img = images[imageKey];
}

function takesnap() {
  shot = video.get();
}

function draw() {
  if (shot) {
    image(shot, 0, 0);
  }
  if (img) {
    image(img, 150, 30, 2600, 2600);
  }
}


{
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
   rollover = true;
  } 
  else {
   rollover = false;}
  
 
  if (dragging) {
    x = mouseX + offsetX;
    y = mouseY + offsetY;

  img(x, y, w, h);
}
}

function mousePressed() {
  
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    offsetX = x-mouseX;
    offsetY = y-mouseY;
  }
}

function mouseReleased() {
  // Quit dragging
  dragging = false;

}




let dropdown;
let video;
let button;
let shot;
let img;
let dropdownCountry;
let dropdownGender;
let images = {};



function preload() {
  images = {
    "ChileMale": loadImage('Chile.Male.png'),
    "ChileFemale": loadImage('Chile.Female.png'),

    "CubaFemale": loadImage('Cuba.Female.png'),
    "CubaMale": loadImage('Cuba.Male.png'),


    "PeruFemale": loadImage('Peru.Female.png'),
    "PeruMale": loadImage('Peru.Male.png'),


    "MexicoFemale": loadImage('Mexico.Female.png'),
    "MexicoMale": loadImage('Mexico.Male.png'),


    "BoliviaFemale": loadImage('Bolivia.Female.png'),
    "BoliviaMale": loadImage('Bolivia.Male.png'),


    "ArgentinaFemale": loadImage('Argentina.Female.png'),
    "ArgentinaMale": loadImage('Argentina.Male.png'),


    "BrazilFemale": loadImage('Brazil.Female.png'),
    "BrazilMale": loadImage('Brazil.Male.png'),


    "EcuadorFemale": loadImage('Ecuador.Female.png'),
    "EcuadorMale": loadImage('Ecuador.Male.png'),


    "ColombiaFemale": loadImage('Colombia.Female.png'),
    "ColombiaMale": loadImage('Colombia.Male.png'),


    "AlgeriaFemale": loadImage('Algeria.Female.png'),
    "AlgeriaMale": loadImage('Algeria.Male.png'),


    "SouthAfricaFemale": loadImage('SouthAfrica.Female.png'),
    "SouthAfricaMale": loadImage('SouthAfrica.Male.png'),


    "TunisiaFemale": loadImage('Tunisia.Female.png'),
    "TunisiaMale": loadImage('Tunisia.Male.png'),


    "UgandaFemale": loadImage('Uganda.Female.png'),
    "UgandaMale": loadImage('Uganda.Male.png'),


    "KenyaFemale": loadImage('Kenya.Female.png'),
    "KenyaMale": loadImage('Kenya.Male.png'),


    "TanzaniaFemale": loadImage('Tanzania.Female.png'),
    "TanzaniaMale": loadImage('Tanzania.Male.png'),


    "IsraelFemale": loadImage('Israel.Female.png'),
    "IsraelMale": loadImage('Israel.Male.png'),


    "YemenFemale": loadImage('Yemen.Female.png'),
    "YemenMale": loadImage('Yemen.Male.png'),


    "MoroccoFemale": loadImage('Morocco.Female.png'),
    "MoroccoMale": loadImage('Morocco.Male.png'),
  
    "CanadaFemale": loadImage('Canada.Female.png'),
    "CanadaMale": loadImage('Canada.Male.png'),
    
    "FranceFemale": loadImage('France.Female.png'),
    "FranceMale": loadImage('France.Male.png'),
    
    "HangaryFemale": loadImage('Hangary.Female.png'),
    "HangaryMale": loadImage('Hangary.Male.png'),
    
    "PortugalFemale": loadImage('Portugal.Female.png'),
    
    
    "SpainFemale": loadImage('Spain.Female.png'),
    "SpainMale": loadImage('Spain.Male.png'),
    
    "SwitzerlandFemale": loadImage('Switzerland.Female.png'),
    "SwitzerlandMale": loadImage('Switzerland.Male.png'),
    
    "U.S.A20SFemale": loadImage('U.S.A20S.Female.png'),
    "U.S.A20SMale": loadImage('U.S.A20S.Male.png'),
    
    "UKVictorianFemale": loadImage('UKVictorian.Female.png'),
    "UKVictorianMale": loadImage('UKVictorian.Male.png'),
    
    "WalesFemale": loadImage('Wales.Female.png'),
    "WalesMale": loadImage('Wales.Male.png'),
   

  }
}

function setup() {
  createCanvas(600, 600);
  background(0);

  video = createCapture(VIDEO);
  video.size(700, 700);
  video.hide();
  createP("");

  button = createButton('snap');
  button.mousePressed(takesnap);
  createP("");

  button = createButton('Select Country');
  dropdownCountry = createSelect();
  dropdownCountry.option('Chile');
  dropdownCountry.option('Cuba');
  dropdownCountry.option('Peru');
  dropdownCountry.option('Mexico');
  dropdownCountry.option('Bolivia');
  dropdownCountry.option('Argentina');
  dropdownCountry.option('Brazil');
  dropdownCountry.option('Ecuador');
  dropdownCountry.option('Colombia');
  dropdownCountry.option('Algeria');
  dropdownCountry.option('SouthAfrica');
  dropdownCountry.option('Tunisia');
  dropdownCountry.option('Uganda');
  dropdownCountry.option('Kenya');
  dropdownCountry.option('Tanzania');
  dropdownCountry.option('Israel');
  dropdownCountry.option('Yemen');
  dropdownCountry.option('Morocco');
dropdownCountry.option('Canada');
dropdownCountry.option('France');
dropdownCountry.option('Hangary');
dropdownCountry.option('Italy');
dropdownCountry.option('Portugal');
dropdownCountry.option('Spain');
dropdownCountry.option('Switzerland');
dropdownCountry.option('U.S.A20S');
dropdownCountry.option('UKVictorian');
dropdownCountry.option('Wales');
  
  createP("");

  button = createButton('Select Gender');
  dropdownGender = createSelect();
  dropdownGender.option('Male');
  dropdownGender.option('Female');
  createP("");

  button = createButton('Apply Outfit');
  button.mousePressed(addImage);
}

function addImage() {
  let country = dropdownCountry.value();
  let gender = dropdownGender.value();

  let imageKey = country + gender;
  console.log("imageKey: ", imageKey);

  // ChileMale
  img = images[imageKey];
}

function takesnap() {
  shot = video.get();
}

function draw() {
  if (shot) {
    image(shot, 0, 0);
  }
  if (img) {
    image(img, 150, 30, 2600, 2600);
  }
}var mapimg;

function getTime(offset) {
  var d = new Date();
  localTime = d.getTime();
  localOffset = d.getTimezoneOffset() * 60000;
  var nd = new Date(utc + (3600000 * offset));
  utc = new Date(utc);
  //$("#local").html(nd.toLocaleString());
  //$("#utc").html(utc.toLocaleString());
}

function preload() {
  mapimg = loadImage("maxresdefault.jpg")
}

function setup() {
  createCanvas(800, 520);

  angleMode(DEGREES);
  createP("");
  button = createButton("Country Name");
  nameInput = createInput('');
  //button.mousePressed = (search)
  createP("");
  button = createButton("Country Time");
  nameInput = createInput('');
  
  //function search() {
  //let term = input.value();

  // URL for querying the times
  //let url = 'https://www.amdoren.com/api/timezone.php + term;


}

function draw() {
  background(0);
  image(mapimg, 0, 0)

  ellipseMode(CENTER);
  stroke(2)
  fill(220, 0, random(0, 200))
  ellipse(300, 300, 180)
  translate(300, 300);
  rotate(-90);

  let hr = hour();
  let mn = minute();
  let sc = second();

  strokeWeight(8);
  stroke(255, 100, 150);
  noFill();
  let secondAngle = map(sc, 0, 60, 0, 360);
  //arc(0, 0, 300, 300, 0, secondAngle);

  stroke(150, 100, 255);
  let minuteAngle = map(mn, 0, 60, 0, 360);
  //arc(0, 0, 280, 280, 0, minuteAngle);

  stroke(150, 255, 100);
  let hourAngle = map(hr % 12, 0, 12, 0, 360);
  //arc(0, 0, 260, 260, 0, hourAngle);

  push();
  rotate(secondAngle);
  stroke(5, 0, 150);
  line(60, 0, 60, 0);
  pop();

  push();
  rotate(minuteAngle);
  stroke(150, 100, 255);
  line(60, 0, 75, 0);
  pop();

  push();
  rotate(hourAngle);
  stroke(50, 255, 90);
  line(60, 0, 50, 0);
  pop();

  stroke(255);
  point(0, 0);


  //fill(255);
  //noStroke();
  //text(hr + ':' + mn + ':' + sc, 10, 200);


}let data;
function preload() {
  data = loadJSON('greek_gods.json');
}

function setup() { 
  createCanvas(400, 400);
 background(220);
  print(data.description);
  for (let i= 0; i<data.greek_gods.length; i++){
  fill(random(0,255), 0, (0,200));
    textAlign(CENTER);
    text(data.greek_gods[i], random(width), random(height));
  createP(data.greek_gods[i]);
   
} 

}var sqs = [];
var sliders = [];

function setup() {
  createCanvas(450, 500);
  for (var i = 0; i < 1; i++) {
    var slider = createSlider(0, 60, 150);
    sliders.push(slider);
  }
}
for (var i = 0; i < 50; i++) {
  sqs[i] = new Sqs();
}
function draw() {
  background(120);
  if (mouseIsPressed)
    background(10, 190, 90)
  for (var i = 0; i < 50; i++) {
    sqs[i].shine();
    sqs[i].bounce();
  }
}
for (var i = 0; i < sliders.length; i++) {
  var angle = offset + i / 8;
  var n = map(sin(angle), -1, 1, 10, 80);
  sliders[i].value(n);
}

function Sqs() {
  this.x = 200
  this.y = 100
  this.shine = function() {
    fill(random(0, 220),80, random(0, 255));
    translate(random(0, 450), random(0, 350));
  stroke(255, 255, 120);
    beginShape();
    vertex(-40, -40);
    vertex(40, -40);
    vertex(40, 40);
    vertex(-40, 40);
    beginContour();
    vertex(-20, -20);
    vertex(-20, 20);
    vertex(20, 20);
    vertex(20, -20);
    endContour();
    endShape(CLOSE);

  }

  this.bounce = function() {
    this.x = this.x + random(-1, 1)
    this.y = this.y + random(-1, 1)
  }

}var vinny = [];

function setup() {
  createCanvas(700, 600);
  for (var i = 0; i < 50; i++) {
    vinny[i] = new Vinny();
  }
}

function draw() {
  r = map(mouseX, 0, 600, 200, 0);
  g = map(mouseX, 0, 600, 0, 150);
  background(r, g, 0);
  if (mouseIsPressed)
    background(0, 50, 250)
  for (var i = 0; i < vinny.length; i++) {
    vinny[i].shine();
    vinny[i].jiggle();
  }
}

function Vinny() {
  this.x = random(0, width);
  this.y = random(0, height);

  this.shine = function() {
    fill(random(0, 220), 0, random(0, 255));
    arc(this.x, this.y, 80, 80, 0, PI + QUARTER_PI, PIE);
    strokeWeight(9);
    strokeJoin(BEVEL);
    beginShape();
    vertex(this.x, this.y);
    vertex(this.x, 0);
    vertex(this.x, this.y);
    endShape();

  }

  this.jiggle = function() {
    this.x = this.x + random(-3, 3)
    this.y = this.y + random(-3, 3)
  }

}var vinny = [];

function setup() {
  createCanvas(700, 600);
  for (var i = 0; i < 50; i++) {
    vinny[i] = new Vinny();
  }
}

function draw() {
  r = map(mouseX, 0, 600, 200, 0);
  g = map(mouseX, 0, 600, 0, 150);
  background(r, g, 0);
  if (mouseIsPressed)
    background(0, 50, 250)
  for (var i = 0; i < vinny.length; i++) {
    vinny[i].shine();
    vinny[i].jiggle();
  }
}

function Vinny() {
  this.x = random(0, width);
  this.y = random(0, height);

  this.shine = function() {
    fill(random(0, 220), 0, random(0, 255));
    arc(this.x, this.y, 80, 80, 0, PI + QUARTER_PI, PIE);
    strokeWeight(9);
    strokeJoin(BEVEL);
    beginShape();
    vertex(this.x, this.y);
    vertex(this.x, 0);
    vertex(this.x, this.y);
    endShape();

  }

  this.jiggle = function() {
    this.x = this.x + random(-3, 3)
    this.y = this.y + random(-3, 3)
  }

}let rectos = [];
let circles = [];



function setup() {
  createCanvas(500, 500);
  for (let i = 0; i < 60; i++) {
    rectos[i] = new Recto(250, 250, i * 5 + i);
  }
  for (let i = 0; i < 50; i++) {
    circles[i] = new Circle(250, 250, i * 5 + i);
  }

}
  
 
function mousePressed(){
  
  let index1 = new Circle(250, 250, 5);
   circles.push (index1);
  
  let index2 = new Recto(250, 250, 25);
   rectos.push (index2);
}








function draw() {

  background(0);
  for (let i = 0; i < rectos.length; i++) {
    rectos[i].show();
    rectos[i].expand();
  }

  for (let i = 0; i < circles.length; i++) {
    circles[i].show();
    circles[i].expand();
    // circles[i].rollover(mouseX,mouseY);
  }
}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Exercise 9-8: Write a Button class (see Example 5-5 
// for a non-object-oriented button). The button 
// class should register when a mouse is pressed over 
// the button and change color.  Create button objects 
// of different sizes and locations using an array. 
// Before writing the main program, sketch out the 
// Button class. Assume the button is off  when it 
// first appears.  

// An array of buttons
var buttons = new Array(6);

function setup() {
  createCanvas(600, 200);
  // A loop to evenly space out the buttons along the window
  for (var i = 0; i < buttons.length; i++) {
    buttons[i] = new Button(i*100+25, height/2-25, 50, 50);
  }
}

function draw() {
  background(175);
  // Show all the buttons
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].display();
  }
}

function mousePressed() {
  // When the mouse is pressed, we must check every single button
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].click(mouseX, mouseY);
  }
}
let bouncers = []; 
let gravity = 0.1;

function setup() {
  createCanvas(700, 600);
  for (let i = 0; i < 1; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(20,40);
    bouncers.push(new Ball(x,y,r));
  }
}

function draw() {
  background(151);
  

  for (var i = 0; i < bouncers.length; i++) { 
    bouncers[i].update();
    bouncers[i].display();
  }
}

function mousePressed() {
  /
  var b = new Ball(mouseX,mouseY,32); // Make a new object at the mouse location.
  bouncers.push(b);
}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 9-11: Resizing an array using append()

let bouncers = []; // We start with an array with just one element.
let gravity = 0.1;

function setup() {
  createCanvas(480, 480);
  for (let i = 0; i < 2; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(12,32);
    bouncers.push(new Ball(x,y,r));
  }
}

function draw() {
  background(51);
  
  // Update and display all balls
  for (var i = 0; i < bouncers.length; i++) { // Whatever the length of that array, update and display all of the objects.
    bouncers[i].update();
    bouncers[i].display();
  }
}

function mousePressed() {
  // A new ball object
  var b = new Ball(mouseX,mouseY,32); // Make a new object at the mouse location.
  bouncers.push(b);
}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 9-11: Resizing an array using append()

let bouncers = []; // We start with an array with just one element.
let gravity = 0.1;

function setup() {
  createCanvas(480, 480);
  for (let i = 0; i < 2; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(12,32);
    bouncers.push(new Ball(x,y,r));
  }
}

function draw() {
  background(51);
  
  // Update and display all balls
  for (var i = 0; i < bouncers.length; i++) { // Whatever the length of that array, update and display all of the objects.
    bouncers[i].update();
    bouncers[i].display();
  }
}

function mousePressed() {
  // A new ball object
  var b = new Ball(mouseX,mouseY,32); // Make a new object at the mouse location.
  bouncers.push(b);
}var circles = 0;

let thebox1;
var speed = 1;



function setup() { 
  createCanvas(500, 600);
  thebox1 = new Thebox1(200, 300, 300, 400);
  
} 

function draw() { 
  background(250, 0, 160);
  thebox1.move();
  thebox1.show();
  

  
  
}
   class Thebox1 { 
     constructor(x, y, width, height) {
       this.x = x;
       this.y = y;
       this.width = 80;
       this.height = 100;
       
     } 
     
     move () {
       stroke(120);
       fill(0,190,70)
       rect(this.x,this.y, this.width, this.height)
     }
   show() {
     if (this.x > width || this.x < 0) {
       speed = speed * -1}
       this.x= this.x + speed
   
   
     
   }
     for (var circles= 0; circles < 400 ; circles ++){
     rect(circles * 100 + 50, 150, 200, 250);
     var circles = 0;

let thebox1;
var speed = 1;



function setup() { 
  createCanvas(500, 600);
  thebox1 = new Thebox1(200, 300, 300, 400);
  
} 

function draw() { 
  background(250, 0, 160);
  thebox1.move();
  thebox1.show();
  

  
  
}
   class Thebox1 { 
     constructor(x, y, width, height) {
       this.x = x;
       this.y = y;
       this.width = 80;
       this.height = 100;
       
     } 
     
     move () {
       stroke(120);
       fill(0,190,70)
       rect(this.x,this.y, this.width, this.height)
     }
   show() {
     if (this.x > width || this.x < 0) {
       speed = speed * -1}
       this.x= this.x + speed
   
   
     
   }
     for (var circles= 0; circles < 400 ; circles ++){
     rect(circles * 100 + 50, 150, 200, 250);
     var circles = 0;

let thebox1;
var speed = 1;



function setup() { 
  createCanvas(500, 600);
  thebox1 = new Thebox1(200, 300, 300, 400);
  
} 

function draw() { 
  background(250, 0, 160);
  thebox1.move();
  thebox1.show();
  

  
  
}
   class Thebox1 { 
     constructor(x, y, width, height) {
       this.x = x;
       this.y = y;
       this.width = 80;
       this.height = 100;
       
     } 
     
     move () {
       stroke(120);
       fill(0,190,70)
       rect(this.x,this.y, this.width, this.height)
     }
   show() {
     if (this.x > width || this.x < 0) {
       speed = speed * -1}
       this.x= this.x + speed
   
   
     
   }
     for (var circles= 0; circles < 400 ; circles ++){
     rect(circles * 100 + 50, 150, 200, 250);
     var circles = 0;

let thebox1;
var speed = 1;



function setup() { 
  createCanvas(500, 600);
  thebox1 = new Thebox1(200, 300, 300, 400);
  
} 

function draw() { 
  background(250, 0, 160);
  thebox1.move();
  thebox1.show();
  

  
  
}
   class Thebox1 { 
     constructor(x, y, width, height) {
       this.x = x;
       this.y = y;
       this.width = 80;
       this.height = 100;
       
     } 
     
     move () {
       stroke(120);
       fill(0,190,70)
       rect(this.x,this.y, this.width, this.height)
     }
   show() {
     if (this.x > width || this.x < 0) {
       speed = speed * -1}
       this.x= this.x + speed
   
   
     
   }
     for (var circles= 0; circles < 400 ; circles ++){
     rect(circles * 100 + 50, 150, 200, 250);
     var circles = 0;

let thebox1;
var speed = 1;



function setup() { 
  createCanvas(500, 600);
  thebox1 = new Thebox1(200, 300, 300, 400);
  
} 

function draw() { 
  background(250, 0, 160);
  thebox1.move();
  thebox1.show();
  

  
  
}
   class Thebox1 { 
     constructor(x, y, width, height) {
       this.x = x;
       this.y = y;
       this.width = 80;
       this.height = 100;
       
     } 
     
     move () {
       stroke(120);
       fill(0,190,70)
       rect(this.x,this.y, this.width, this.height)
     }
   show() {
     if (this.x > width || this.x < 0) {
       speed = speed * -1}
       this.x= this.x + speed
   
   
     
   }
     for (var circles= 0; circles < 400 ; circles ++){
     rect(circles * 100 + 50, 150, 200, 250);
     var circles = 0;

let thebox1;
var speed = 1;



function setup() { 
  createCanvas(500, 600);
  thebox1 = new Thebox1(200, 300, 300, 400);
  
} 

function draw() { 
  background(250, 0, 160);
  thebox1.move();
  thebox1.show();
  

  
  
}
   class Thebox1 { 
     constructor(x, y, width, height) {
       this.x = x;
       this.y = y;
       this.width = 80;
       this.height = 100;
       
     } 
     
     move () {
       stroke(120);
       fill(0,190,70)
       rect(this.x,this.y, this.width, this.height)
     }
   show() {
     if (this.x > width || this.x < 0) {
       speed = speed * -1}
       this.x= this.x + speed
   
   
     
   }
     for (var circles= 0; circles < 400 ; circles ++){
     rect(circles * 100 + 50, 150, 200, 250);
     var circles = 0;

let thebox1;
var speed = 1;



function setup() { 
  createCanvas(500, 600);
  thebox1 = new Thebox1(200, 300, 300, 400);
  
} 

function draw() { 
  background(250, 0, 160);
  thebox1.move();
  thebox1.show();
  

  
  
}
   class Thebox1 { 
     constructor(x, y, width, height) {
       this.x = x;
       this.y = y;
       this.width = 80;
       this.height = 100;
       
     } 
     
     move () {
       stroke(120);
       fill(0,190,70)
       rect(this.x,this.y, this.width, this.height)
     }
   show() {
     if (this.x > width || this.x < 0) {
       speed = speed * -1}
       this.x= this.x + speed
   
   
     
   }
     for (var circles= 0; circles < 400 ; circles ++){
     rect(circles * 100 + 50, 150, 200, 250);
     var circles = 0;

let thebox1;
var speed = 1;



function setup() { 
  createCanvas(500, 600);
  thebox1 = new Thebox1(200, 300, 300, 400);
  
} 

function draw() { 
  background(250, 0, 160);
  thebox1.move();
  thebox1.show();
  

  
  
}
   class Thebox1 { 
     constructor(x, y, width, height) {
       this.x = x;
       this.y = y;
       this.width = 80;
       this.height = 100;
       
     } 
     
     move () {
       stroke(120);
       fill(0,190,70)
       rect(this.x,this.y, this.width, this.height)
     }
   show() {
     if (this.x > width || this.x < 0) {
       speed = speed * -1}
       this.x= this.x + speed
   
   
     
   }
     for (var circles= 0; circles < 400 ; circles ++){
     rect(circles * 100 + 50, 150, 200, 250);
     var circles = 0;

let thebox1;
var speed = 1;



function setup() { 
  createCanvas(500, 600);
  thebox1 = new Thebox1(200, 300, 300, 400);
  
} 

function draw() { 
  background(250, 0, 160);
  thebox1.move();
  thebox1.show();
  

  
  
}
   class Thebox1 { 
     constructor(x, y, width, height) {
       this.x = x;
       this.y = y;
       this.width = 80;
       this.height = 100;
       
     } 
     
     move () {
       stroke(120);
       fill(0,190,70)
       rect(this.x,this.y, this.width, this.height)
     }
   show() {
     if (this.x > width || this.x < 0) {
       speed = speed * -1}
       this.x= this.x + speed
   
   
     
   }
     for (var circles= 0; circles < 400 ; circles ++){
     rect(circles * 100 + 50, 150, 200, 250);
     var circles = 0;

let thebox1;
var speed = 1;



function setup() { 
  createCanvas(500, 600);
  thebox1 = new Thebox1(200, 300, 300, 400);
  
} 

function draw() { 
  background(250, 0, 160);
  thebox1.move();
  thebox1.show();
  

  
  
}
   class Thebox1 { 
     constructor(x, y, width, height) {
       this.x = x;
       this.y = y;
       this.width = 80;
       this.height = 100;
       
     } 
     
     move () {
       stroke(120);
       fill(0,190,70)
       rect(this.x,this.y, this.width, this.height)
     }
   show() {
     if (this.x > width || this.x < 0) {
       speed = speed * -1}
       this.x= this.x + speed
   
   
     
   }
     for (var circles= 0; circles < 400 ; circles ++){
     rect(circles * 100 + 50, 150, 200, 250);
     var circles = 0;

let thebox1;
var speed = 1;



function setup() { 
  createCanvas(500, 600);
  thebox1 = new Thebox1(200, 300, 300, 400);
  
} 

function draw() { 
  background(250, 0, 160);
  thebox1.move();
  thebox1.show();
  

  
  
}
   class Thebox1 { 
     constructor(x, y, width, height) {
       this.x = x;
       this.y = y;
       this.width = 80;
       this.height = 100;
       
     } 
     
     move () {
       stroke(120);
       fill(0,190,70)
       rect(this.x,this.y, this.width, this.height)
     }
   show() {
     if (this.x > width || this.x < 0) {
       speed = speed * -1}
       this.x= this.x + speed
   
   
     
   }
     for (var circles= 0; circles < 400 ; circles ++){
     rect(circles * 100 + 50, 150, 200, 250);
     var circles = 0;

let thebox1;
var speed = 1;



function setup() { 
  createCanvas(500, 600);
  thebox1 = new Thebox1(200, 300, 300, 400);
  
} 

function draw() { 
  background(250, 0, 160);
  thebox1.move();
  thebox1.show();
  

  
  
}
   class Thebox1 { 
     constructor(x, y, width, height) {
       this.x = x;
       this.y = y;
       this.width = 80;
       this.height = 100;
       
     } 
     
     move () {
       stroke(120);
       fill(0,190,70)
       rect(this.x,this.y, this.width, this.height)
     }
   show() {
     if (this.x > width || this.x < 0) {
       speed = speed * -1}
       this.x= this.x + speed
   
   
     
   }
     for (var circles= 0; circles < 400 ; circles ++){
     rect(circles * 100 + 50, 150, 200, 250);
     function draw() {
  background(0, 210, 120)
  rotate(PI / 4, [1, 1, 0]);

  fill(211, 84, 0);

  ellipsoid(mouseX, mouseY);


  rotate(PI / 2, [1, 1, 0]);
  fill(random(255), 75, random(220));
  ellipsoid(mouseX, mouseY);

  rotate(PI, [1, 1, 0]);
  fill(random(0), 198, random(220));
  ellipsoid(mouseX, mouseY);

  rotate(120, [1, 1, 0]);
  fill(random(0), 155, random(220));
  ellipsoid(mouseX, mouseY);

  rotate(220, [8, 1, 0]);
  fill(random(0), 100, random(120));
  ellipsoid(mouseX, mouseY);

  rotate(500, [1, 1, 0]);
  fill(random(0), 198, random(250));
  ellipsoid(mouseX, mouseY);


  rotate(700, [71, 11, 10]);
  fill(random(0), 220, random(220));
  ellipsoid(mouseX, mouseY);


  rotate(900, [1, 90, 0]);
  fill(random(0), 170, random(270));
  ellipsoid(mouseX, mouseY);


  rotate(1000, [1, 1, 0]);
  fill(random(180), 40, random(80));
  ellipsoid(mouseX, mouseY);


  rotate(800, [1, 1, 0]);
  fill(random(220), 198, random(20));
  ellipsoid(mouseX, mouseY);








}function setup() {
  createCanvas(640, 480, WEBGL);
}


function draw() {
  background(204);
  ellipsoid(mouseX, mouseY);
  drawEllipsoid(mouseX, mouseY);

  function drawEllipsoid(mouseX, mouseY, rotate, fill) {
    let rotate = random(0, 2000);
    fill = random(0, 255);
  }
}

function draw() {
  background(0, 210, 120)
  rotate(PI / 4, [1, 1, 0]);

  fill(211, 84, 0);

  ellipsoid(mouseX, mouseY);


  rotate(PI / 2, [1, 1, 0]);
  fill(random(255), 75, random(220));
  ellipsoid(mouseX, mouseY);

  rotate(PI, [1, 1, 0]);
  fill(random(0), 198, random(220));
  ellipsoid(mouseX, mouseY);

  rotate(120, [1, 1, 0]);
  fill(random(0), 155, random(220));
  ellipsoid(mouseX, mouseY);

  rotate(220, [8, 1, 0]);
  fill(random(0), 100, random(120));
  ellipsoid(mouseX, mouseY);

  rotate(500, [1, 1, 0]);
  fill(random(0), 198, random(250));
  ellipsoid(mouseX, mouseY);


  rotate(700, [71, 11, 10]);
  fill(random(0), 220, random(220));
  ellipsoid(mouseX, mouseY);


  rotate(900, [1, 90, 0]);
  fill(random(0), 170, random(270));
  ellipsoid(mouseX, mouseY);


  rotate(1000, [1, 1, 0]);
  fill(random(180), 40, random(80));
  ellipsoid(mouseX, mouseY);


  rotate(800, [1, 1, 0]);
  fill(random(220), 198, random(20));
  ellipsoid(mouseX, mouseY);








}var ball = {
  x: 200,
  y: 30,
  speed: 0
}

var gravity = 0.1;

function setup() {
  createCanvas(400, 300);
}

function displayBall() {
  fill(255);
  ellipse(ball.x, ball.y, 24, 24);
}

function moveBall() {
  ball.y = ball.y + ball.speed;
  ball.speed = ball.speed + gravity;
}

function bounceBall() {
  if (ball.y > height) {
    ball.speed = ball.speed * -0.95;
  }
}

function draw() {
  background(0);
  displayBall();
  moveBall();
  bounceBall();
}



var circleX=50
var r = 0
var b = 250;

function setup() { 
  createCanvas(700, 600);
} 

function draw() {
  background(220,220,270);
	
	circleX = (circleX + 1);
	
	r = map(circleX, 0, 500,0,240)
	b =map(circleX, 0, 60, 0, 225)
	background(r, 80, b);
	
	fill(0, 2, 92)
	ellipse(circleX,500,14,14)
	
	fill(120,0,0)
	ellipse(circleX,550,20,20)
	fill(0,150,0)
	ellipse(circleX,450,20,20)
	
	
	//girl 1
	stroke(0,255,0)
	line(264,192,309,198)
	line(309,198,365,227)
	line(365,227,396,267)
	line(396,267,410,313)
	line(410,313,404,344)
	line(404,344,389,386)
	line(389,386,404,434)
	line(404,434,402,440)
	line(402,440,368,438)
	line(368,438,368,455)
	line(368,455,320,437)
	
	line(359,456,346,466)
	line(346,466,350,481)
	line(350,481,339,505)
	line(339,505,329,524)
	line(329,524,311,521)
	line(311,521,235,477)
	line(235,477,212,437)
	
	//brow
	line(299,372,321,345)
	line(321,345,390,329)
	line(390,329,397,314)
	
	//neck
	line(240,484,220,496)
	line(220,496,194,551)
	
	//back of head
	line(264,192,210,207)
	line(210,207,171,233)
	line(171,233,137,281)
	line(137,281,132,344)
	line(132,344,148,401)
	line(148,401,128,444)
	line(128,444,105,482)
	line(105,482,71,528)
	
	//eye
	line(321,386,403,373)
	line(321,386,375,389)
	line(377,379,373,353)
	
	//ear
	line(211,343,163,341)
	line(163,341,177,382)
	line(177,382,203,407)
	line(184,356,207,360)
	line(207,360,201,384)
	
	//earring
	stroke(0,0,255)
	fill(110,0,250)

	triangle(159,453,214,468,194,388)
	stroke(0,0,2550)
	fill(240,190,0)
	triangle(156,498,211,513,191,433)
	
	
	//secondguy
	line(172,233,156,181)
	line(156,181,168,139)
	line(168,139,196,86)
	line(196,86,242,60)
	line(242,60,296,52)
	line(296,52,367,58)
	line(367,58,419,82)
	line(419,82,452,120)
	line(452,120,468,151)
	line(468,151,470,170)
	line(470,170,460,229)
	line(460,229,484,273)
	line(484,273,482,279)
	line(482,279,440,282)
	line(440,282,449,309)
	
	//lips
	line(449,309,433,315)
	line(433,315,410,311)
	
	//then
	line(434,317,442,334)
	line(442,334,428,348)
	line(428,348,429,384)
	line(429,384,420,403)
	line(420,403,387,391)
	
	//haircircles
	 if (mouseIsPressed) {
    fill(0,0,200);
  } else {
    fill(0,255,0);
  
  ellipse(circleX, mouseY);
}

ellipse(163,95,66,66)
	if (mouseIsPressed) {
    fill(0,150,20);
  } else {
    fill(200,25,50);
  
  ellipse(circleX, mouseY);
}

	
	
	ellipse(305,26,66,66)
	
	if (mouseIsPressed) {
    fill(0,18,20);
  } else {
    fill(0,90,250);
  
  ellipse(circleX, mouseY);
}

	ellipse(447,66,66,66)
	
	
	
	
	
	//eye
	line(383,222,460,196)
	line(382,222,443,232)
	//pupil
	line(425,210,425,228)
	line(436,207,436,229)
	
	//brow
	line(326,168,362,156)
	line(362,156,434,182)
	line(434,182,451,173)
	
	//third
	stroke(0,0,0)
line(465,150,510,158)
	line(510,158,541,185)
	line(541,185,559,221)
	line(559,221,556,271)
	line(556,271,549,307)
	line(549,307,573,344)
	line(573,344,571,352)
	line(571,352,544,355)
	line(544,355,532,365)
	line(532,365,536,379)
	line(536,379,527,390)
	line(527,390,510,390)

	//mouth
	line(510,390,491,398)
	
	//cont..
	line(528,392,531,407)
	line(531,407,521,418)
	line(521,418,527,446)
	line(527,446,513,464)
	line(513,464,488,471)
	line(488,471,438,451)
	line(438,451,419,457)
	line(419,457,387,525)
	
	//nose
	line(519,346,544,345)
	
	//hair
		if (mouseIsPressed) {
    fill(190,20,50);
  } else {
    fill(0,200,256);

}
	triangle(472,149,507,161,532,59)
		if (mouseIsPressed) {
    fill(0,210,50);
  } else {
    fill(0,110,0);

}
	triangle(515,163,544,189,614,112)
	
	//brow
	line(537,259,485,254)
	
	//eye
	line(471,323,544,268)
	line(500,305,530,305)
	
	//pupil
	line(522,289,523,305)
	line(523,301,526,286) 
}// From: http://10print.org/

var x = 0;
var y = 0;

function setup() {
  createCanvas(500, 500);
  background(250, 120, 0);
}

function draw() {

  if (random(1.581) > 0.483) {
    line(x, y, x+28, y+28);
  } 
  else {
    line(x, y+20, x+20, y);
  }

  x += 30;
  if (x > width) {
    x = 0;
    y += 30;
    
  }

  if (y > height) {
    noLoop();
    // background(255);
    x = 0;
    y = 0;
  }
  
}let dots = [];
//q is the amount the dots.
let q = 200;
// d is the distance between the dots.
let d = 120;
// w is the width of the canvas
let w = 700;
// h is the height of the canvas
let h = 600;
// thick is the initial distance between two dots
let thick = 100;
// the distance the dots move in a frame.
let jitter = 10;

function setup() {
  createCanvas(w, h);
  frameRate(10);
  background(220, 0, 100);
  ellipseMode(CENTER);
  rectMode(CENTER);
  sliderJ = new slider(350, 500, 200, jitter, 1, 100);


  for (var i = 0; i < q; i++) {
    // draw the heart
    x = 50 * (2 * cos(i) - cos(2 * i)) + random(-thick, thick);
    y = 50 * (2 * sin(i) - sin(2 * i)) + random(-thick, thick);
    dot1 = new dot(x, y);
    dots.push(dot1);
  }

}

function draw() {
  // use mouse to control the lines.
  // d = mouseY/30;

  jitter = sliderJ.dragging();

  background(100, 0, 220, 50);
  translate(350, 250);
  rotate(-1.57);

  for (var i = 0; i < dots.length; i++) {
    dots[i].x += random(-jitter, jitter);
    dots[i].y += random(-jitter, jitter);
  }

  for (var a = 0; a < dots.length; a++) {
    dota = dots[a];
    for (var b = 0; b < dots.length; b++) {
      dotb = dots[b];
      if (dist(dota.x, dota.y, dotb.x, dotb.y) < d) {
        c = random(9160);
        stroke(22, 200, 120, 100);
        line(dota.x, dota.y, dotb.x, dotb.y);
      }
    }
  }

  // print(dots.length);
}

function dot(x, y) {

  this.x = x;
  this.y = y;

}

function slider(x, y, size, thing, valueFrom, valueTo) {
  dragging = false;
  currentValue = thing;
  // new instance of rail an button
  this.rail = new rail(x, y, size);
  this.sliderButton = new sliderButton(x - size / 2 + size * (currentValue / valueTo), y, size)
  //draw everything
  this.display = function() {
    this.rail.display();
    this.sliderButton.display();
  }
  //main function
  this.dragging = function() {
    this.display();
    if (mouseIsPressed) {
      dragging = true;
    } else {
      dragging = false;

      offset = 0;
    }

    if (dragging) {
      previousPosX = this.sliderButton.x;
      this.sliderButton.x = constrain(mouseX, x - size / 2, x + size / 2);
      offset = (this.sliderButton.x - previousPosX) / size * (valueTo - valueFrom);
      currentValue = currentValue + offset;
      print(offset);
    }
    return (currentValue);
  }
  //define rail
  function rail(x, y, size) {
    railLength = size;
    railHeight = 4;
    this.x = x;
    this.y = y;
    this.display = function() {
      fill(255);
      rect(this.x, this.y, railLength, railHeight);
    }
  }

  //define button
  function sliderButton(x, y, size) {
    this.x = x;
    this.y = y;

    this.display = function() {
      stroke(1);
      fill(100, 0, 100);
      ellipse(this.x, this.y, size / 10, size / 10);
    }
  }
}

function setup() {
  createCanvas(700, 600);
}


function draw() {
  background(220, 220, 270);


  r = map(mouseX, 0, 700, 20, 255)
  b = map(mouseX, 0, 700, 250, 5)
  background(r, 0, b);

  if (mouseIsPressed) {
    background(0)
  }


  //girl 1
  stroke(0, 255, 0)
  line(264, 192, 309, 198)
  line(309, 198, 365, 227)
  line(365, 227, 396, 267)
  line(396, 267, 410, 313)
  line(410, 313, 404, 344)
  line(404, 344, 389, 386)
  line(389, 386, 404, 434)
  line(404, 434, 402, 440)
  line(402, 440, 368, 438)
  line(368, 438, 368, 455)
  line(368, 455, 320, 437)

  line(359, 456, 346, 466)
  line(346, 466, 350, 481)
  line(350, 481, 339, 505)
  line(339, 505, 329, 524)
  line(329, 524, 311, 521)
  line(311, 521, 235, 477)
  line(235, 477, 212, 437)

  //brow
  line(299, 372, 321, 345)
  line(321, 345, 390, 329)
  line(390, 329, 397, 314)

  //neck
  line(240, 484, 220, 496)
  line(220, 496, 194, 551)

  //back of head
  line(264, 192, 210, 207)
  line(210, 207, 171, 233)
  line(171, 233, 137, 281)
  line(137, 281, 132, 344)
  line(132, 344, 148, 401)
  line(148, 401, 128, 444)
  line(128, 444, 105, 482)
  line(105, 482, 71, 528)

  //eye
  line(321, 386, 403, 373)
  line(321, 386, 375, 389)
  line(377, 379, 373, 353)

  //ear
  line(211, 343, 163, 341)
  line(163, 341, 177, 382)
  line(177, 382, 203, 407)
  line(184, 356, 207, 360)
  line(207, 360, 201, 384)

  //earring
  stroke(0, 0, 255)
  fill(110, 0, 250)

  triangle(159, 453, 214, 468, 194, 388)
  stroke(0, 0, 2550)
  fill(240, 190, 0)
  triangle(156, 498, 211, 513, 191, 433)


  //secondguy
  line(172, 233, 156, 181)
  line(156, 181, 168, 139)
  line(168, 139, 196, 86)
  line(196, 86, 242, 60)
  line(242, 60, 296, 52)
  line(296, 52, 367, 58)
  line(367, 58, 419, 82)
  line(419, 82, 452, 120)
  line(452, 120, 468, 151)
  line(468, 151, 470, 170)
  line(470, 170, 460, 229)
  line(460, 229, 484, 273)
  line(484, 273, 482, 279)
  line(482, 279, 440, 282)
  line(440, 282, 449, 309)

  //lips
  line(449, 309, 433, 315)
  line(433, 315, 410, 311)

  //then
  line(434, 317, 442, 334)
  line(442, 334, 428, 348)
  line(428, 348, 429, 384)
  line(429, 384, 420, 403)
  line(420, 403, 387, 391)

  //haircircles
  if (mouseIsPressed) {
    fill(0, 0, 200);
  } else {
    fill(0, 255, 0);

    ellipse(mouseX, mouseY);
  }

  ellipse(163, 95, 66, 66)
  if (mouseIsPressed) {
    fill(0, 150, 20);
  } else {
    fill(200, 25, 50);

    ellipse(mouseX, mouseY);
  }



  ellipse(305, 26, 66, 66)

  if (mouseIsPressed) {
    fill(0, 18, 20);
  } else {
    fill(0, 90, 250);

    ellipse(mouseX, mouseY);
  }

  ellipse(447, 66, 66, 66)





  //eye
  line(383, 222, 460, 196)
  line(382, 222, 443, 232)
  //pupil
  line(425, 210, 425, 228)
  line(436, 207, 436, 229)

  //brow
  line(326, 168, 362, 156)
  line(362, 156, 434, 182)
  line(434, 182, 451, 173)

  //third
  stroke(200)
  line(465, 150, 510, 158)
  line(510, 158, 541, 185)
  line(541, 185, 559, 221)
  line(559, 221, 556, 271)
  line(556, 271, 549, 307)
  line(549, 307, 573, 344)
  line(573, 344, 571, 352)
  line(571, 352, 544, 355)
  line(544, 355, 532, 365)
  line(532, 365, 536, 379)
  line(536, 379, 527, 390)
  line(527, 390, 510, 390)

  //mouth
  line(510, 390, 491, 398)

  //cont..
  line(528, 392, 531, 407)
  line(531, 407, 521, 418)
  line(521, 418, 527, 446)
  line(527, 446, 513, 464)
  line(513, 464, 488, 471)
  line(488, 471, 438, 451)
  line(438, 451, 419, 457)
  line(419, 457, 387, 525)

  //nose
  line(519, 346, 544, 345)

  //hair
  if (mouseIsPressed) {
    fill(190, 20, 50);
  } else {
    fill(0, 200, 256);

  }
  triangle(472, 149, 507, 161, 532, 59)
  if (mouseIsPressed) {
    fill(0, 210, 50);
  } else {
    fill(0, 110, 0);

  }
  triangle(515, 163, 544, 189, 614, 112)

  //brow
  line(537, 259, 485, 254)

  //eye
  line(471, 323, 544, 268)
  line(500, 305, 530, 305)

  //pupil
  line(522, 289, 523, 305)
  line(523, 301, 526, 286)
}function setup() { 
  createCanvas(700, 600);
} 

function draw() { 
  background(220,190,100);
  line(47,248,40,195)
  line(40,195,69,140)
  line(69,140,101,111)
  line(101,111,137,94)
  line(137,94,183,82)
  line(183,82,241,90)
  line(241,90,283,118)
  line(283,118,310,152)
  line(310,152,326,190)
  line(326,190,326,227)
  line(326,227,312,268)
  line(312,268,306,284)
  line(306,284,329,322)
  line(329,322,327,329)
  line(327,329,295,336)
  line(295,336,293,352)
  line(293,352,280,363)
  
  line(250,346,280,364)
  line(280,364,283,381)
  line(283,381,258,384)
  line(258,384,259,397)
  line(259,397,254,410)
  line(254,410,250,439)
  line(250,439,209,416)
  
  //eye
  line(243,271,305,275)
  line(282,250,291,271)
  
  //eyebrow
  line(235,214,260,207)
  line(260,207,294,225)
  line(294,225,309,246)
  
  //otherlash
  line(313,266,341,257)
  
  //capline
  line(47,248,307,155)
  
  //hairlines
  line(85,130,94,229)
line(132,101,155,207)
  line(177,85,210,184)
  line(227,91,269,164)
  
  //bubbles
  ellipse(389,346,6,15)
  ellipse(421,291,6,15)
  
  //hair
  ellipse(204,233,44,80)
  ellipse(204,326,44,80)
  ellipse(199,404,44,80)
  ellipse(205,480,44,77)
  ellipse(147,259,44,77)
  ellipse(144,339,44,77)
  ellipse(145,493,44,77)
  ellipse(144,417,44,77)
  ellipse(94,283,44,77)
  ellipse(92,369,44,77)
  ellipse(85,447,44,77)
}function setup() { 
  createCanvas(700, 600);
} 

function draw() { 
  background(250,140160,195);
  
  //head outline omg omg omg
  line(308,0,238,55)
  line(238,55,193,115)
  line(193,115,171,179)
  line(171,179,188,241)
  line(188,241,176,328)
  line(176,328,219,409)
  line(219,409,254,480)
  line(254,480,307,515)
line(307,515,391,466)
  line(391,466,479,363)
  line(479,363,482,323)
  line(482,323,519,311)
  line(519,311,539,222)
  line(539,222,484,237)
  
  //ear
  line(511,253,481,272)
  line(481,272,495,294)
  line(495,294,476,307)
  
  //eyebrow
  line(305,200,357,176)
  line(357,176,413,208)
  
  //left eye
  noFill()
  triangle(307,276,432,281,374,236)
  
  //pupil
  noFill()
  ellipse(366,261,49,35)
  fill(0,170,89)
  ellipse(366,261,19,8)
  
  //lashline
  line(307,272,430,205)
  line(388,244,441,214)
  line(403,257,471,230)
  line(423,277,484,260)
  
  //right brow
  line(224,206,180,154)
  
  //righteye
  noFill()
  ellipse(211,256,49,26)
  fill(0,170,89)
  ellipse(211,256,19,8)
  
  //lash to nose
  line(145,201,237,255)
  line(237,255,217,363)
  line(217,363,258,357)
  
  //lips
  fill(245,78,19)
  ellipse(262,422,53,24)
  triangle(263,385,224,412,310,413)
  
  //hairrrrr
  line(263,75,372,0)
  line(317,99,513,0)
  line(485,67,670,30)
  line(402,100,670,250)
  line(484,173,690,400)
  line(526,280,641,483)
  line(487,362,584,531)
  
  //neck
  line(390,460,440,570)
  
  
  
}function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(40,200,40);
  line(217,39,168,120)
  line(168,120,168,186)
  line(168,186,138,231)
  line(138,231,184,250)
  line(184,250,197,283)
  line(197,283,242,294)
  line(242,294,227,322)
  line(227,322,262,335)
  line(262,335,259,385)
  line(259,385,307,390)
  line(307,390,396,361)
  line(396,361,516,452)
  
  fill(1@)
  ellipse(230,180,70,20)

  
}function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(40,200,40);
  line(217,39,168,120)
  line(168,120,168,186)
  line(168,186,138,231)
  line(138,231,184,250)
  line(184,250,197,283)
  line(197,283,242,294)
  line(242,294,227,322)
  line(227,322,262,335)
  line(262,335,259,385)
  line(259,385,307,390)
  line(307,390,396,361)
  line(396,361,516,452)
  
  fill(1@)
  ellipse(230,180,70,20)

  
}function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(40,200,40);
  line(217,39,168,120)
  line(168,120,168,186)
  line(168,186,138,231)
  line(138,231,184,250)
  line(184,250,197,283)
  line(197,283,242,294)
  line(242,294,227,322)
  line(227,322,262,335)
  line(262,335,259,385)
  line(259,385,307,390)
  line(307,390,396,361)
  line(396,361,516,452)
  
  fill(1@)
  ellipse(230,180,70,20)

  
}function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(40,200,40);
  line(217,39,168,120)
  line(168,120,168,186)
  line(168,186,138,231)
  line(138,231,184,250)
  line(184,250,197,283)
  line(197,283,242,294)
  line(242,294,227,322)
  line(227,322,262,335)
  line(262,335,259,385)
  line(259,385,307,390)
  line(307,390,396,361)
  line(396,361,516,452)
  
  fill(1@)
  ellipse(230,180,70,20)

  
}function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(40,200,40);
  line(217,39,168,120)
  line(168,120,168,186)
  line(168,186,138,231)
  line(138,231,184,250)
  line(184,250,197,283)
  line(197,283,242,294)
  line(242,294,227,322)
  line(227,322,262,335)
  line(262,335,259,385)
  line(259,385,307,390)
  line(307,390,396,361)
  line(396,361,516,452)
  
  fill(1@)
  ellipse(230,180,70,20)

  
}function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(40,200,40);
  line(217,39,168,120)
  line(168,120,168,186)
  line(168,186,138,231)
  line(138,231,184,250)
  line(184,250,197,283)
  line(197,283,242,294)
  line(242,294,227,322)
  line(227,322,262,335)
  line(262,335,259,385)
  line(259,385,307,390)
  line(307,390,396,361)
  line(396,361,516,452)
  
  fill(1@)
  ellipse(230,180,70,20)

  
}function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(40,200,40);
  line(217,39,168,120)
  line(168,120,168,186)
  line(168,186,138,231)
  line(138,231,184,250)
  line(184,250,197,283)
  line(197,283,242,294)
  line(242,294,227,322)
  line(227,322,262,335)
  line(262,335,259,385)
  line(259,385,307,390)
  line(307,390,396,361)
  line(396,361,516,452)
  
  fill(1@)
  ellipse(230,180,70,20)

  
}function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(220);
  line(200,25,160,140)
  line(160,140,170,220)
  line(170,210,170,270)
  line(170,270,170,200)
  line(170,200,180,340)
  line(180,340,220,360)
  line(220,360,240,400)
  line(240,400,240,450)
  line(240,450,265,470)
  line(265,470,300,450)
  line(300,450,350,400)
  line(350,400,460,460)
  line(460,460,460,600)

triangle(180,340,200,360,250,335)
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(130);
}function setup() { 

  createCanvas(600, 400);
} 

function draw() { 




background(230,0,0)   
  //head
  fill(4,4,4,255)
  ellipse(120,90,100,100);
  
  //body
  fill(0,210,35);
rect(80,142,80,90);
  
  //right eye
ellipse(80,80,55,35);
  
  //right eye pupils
  fill(8,8,8)
  ellipse(80,80,21,8);
  
  
  //left eye
  fill(0,210,35)
  ellipse(155,80,55,35);
  //lefteye pupils lol
  fill(4,4,4)
  ellipse(155,80,21,8)
  
  //mouth
  fill(0,210,35)
  ellipse(120,110,66,12);
   

}
