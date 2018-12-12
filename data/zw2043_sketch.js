// let a
// let b
// let c
// let d
// let e
// let f
// let g
// let h
// let i
// let j
// let k
// let l
// let m

// two object arrays
let tags = [];
let foods = [];

// useless
let love;
let appleNum = 0;
let greenNum = 0;

// food images
let appleImg
let bananaImg
let greenOnionImg;
let hotpotImg;
let onionImg;
let chickenImg;
let potatoImg;
let hourImg
let sign1Img
let sign2Img
let biu;
let dong;

// useless
let y = 0;
let y1 = 0;
let yo = false;
let yay = false

// neon sign color
let colorSet = ['#4f7df6', '#374054', '#fdbde0', '#f9eb8a'];

// emotion tag name array
let tagArray = []

// food name array
let foodArray = []

// food image array
let imgArray = []

// food name array
let realFoodArray = [];

// to implement realFood into fakeFood
let fakeFoodArray = [];

// debug fakeFoodArray
let testArray = [];

// tag array
let tagX = []; 
let tagY = [];

function preload() {
  appleImg = loadImage("apple.png");
  bananaImg = loadImage("banana.png");
  greenOnionImg = loadImage("greenOnion.png");
  onionImg = loadImage("onion.png");
  hotpotImg = loadImage("hotpot.png");
  chickenImg = loadImage("raw chicken.png");
  potatoImg = loadImage("potato.png");
  hourImg = loadImage("24 hour.png");
  sign1Img = loadImage("sign1.png");
  sign2Img = loadImage("sign2.png");
  biu = loadSound("Biu.wav");
  dong = loadSound("Dong.wav");
}

function setup() {
  createCanvas(500, 800);
  //frameRate(5);
  // define all kinds of arrays

//   a = createButton("#anxious")
//   a.position(width/2-100,160)
  
//   b = createButton("#suck")
//   b.position(width/2-110,230)
  
//   c = createButton("#cute")
//   c.position(width/2+60,190)
  
//   d = createButton("#love")
//   d.position(width/2-90,250)
  
//   e = createButton("#hahahahaha")
//   e.position(width/2-20,300)
  
//   f = createButton("#dope")
//   f.position(width/2-50,220)
  
//   g = createButton("#yay")
//   g.position(width/2-40,190)
  
//   h = createButton("#sad")
//   h.position(width/2+20,220)
  
//   i = createButton("#dreamy")
//   i.position(width/2+60,270)
  
//   j = createButton("#meow")
//   j.position(width/2-120,280)
  
//   k = createButton("#sleepy")
//   k.position(width/2,160)
  
//   l = createButton("#tired")
//   l.position(width/2-10,275)
  
//   m = createButton("#chill")
//   m.position(width/2,250)
  
  tagX = [width/2-100,width/2-110,width/2+60,width/2-90,width/2-20,
         width/2-50,width/2-40,width/2+20,width/2+60,width/2-120,
         width/2,width/2-10,width/2]
 
  tagY = [170,240,200,260,320,230,200,230,280,290,170,285,260]
  
  imgArray = [onionImg, onionImg,
    					appleImg, appleImg, appleImg,
   						bananaImg, bananaImg,
   						greenOnionImg, greenOnionImg,
    					chickenImg,
    					potatoImg, potatoImg, potatoImg
 							]

  tagArray = ["#anxious", "#suck",
    					"#cute", "#love", "#hahahahaha",
    					"#dope", "#yay",
    					"#sad", "#dreamy",
    					"#meow",
    					"#sleepy", "#tired", "#chill"
 						 ]


  foodArray = ["onion", "onion",
    					 "apple", "apple", "apple",
   						 "banana", "banana",
  						 "green onion", "green onion",
   						 "chicken",
    					 "potato", "potato", "potato"
  						]

  realFoodArray = ["  👀panic onion",
    							 "👄sexy apple",
    							 "      💦f*cking banana",
   								 "      😎hippy green onion",
   								 "  💃dancing chicken",
   								 "🙊peeing potato",
  								]
  


  // test
  // define new counter object
  // counter1 = new Counter("apple");
  // define new tag object
  // tag1 = new Tag("test1", counter1, greenOnionImg,
  //   550, 200, // tag position
  //   50, 50); // text position
  // tag2 = new Tag("test2", counter1, greenOnionImg,
  //   550, 150, // tag position
  //   50, 50); // text position

  // create tag button
  // tag1.show()
  // tag2.show()

  // real thing, not test
  // create new neon object
  neon = new Neon();
  

  // create food list array
  for (let i = 0; i < 6; i++) {
    foods[i] = new Counter(realFoodArray[i],390, 470 + i * 30)
    //print(foods[i])
  }
  
    for (let f = 3; f < 6; f++) {
    foods[f] = new Counter(realFoodArray[f],100, 380 + f * 30)
    //print(foods[i])
  }
  
  // define an array to put into new tag object
  fakeFoodArray = [foods[0], foods[0],
    							 foods[1], foods[1], foods[1],
    							 foods[2], foods[2],
    							 foods[3], foods[3],
    							 foods[4],
   								 foods[5], foods[5], foods[5]
 									 ]
  
  //create tags array
  for (let i = 0; i < 13; i++) {
    tags[i] = new Tag(tagArray[i], fakeFoodArray[i], imgArray[i],
      tagX[i],tagY[i],tagY[i]);
  }
	
  //create tag buttons
  for (let i = 0; i < 13; i++) {
    tags[i].show()
  }
}


function draw() {
  background(0);
  
  // neon stuff
  neon.show();
  neon.flash();
  
  image(sign1Img,370,390,90,90)
  image(sign2Img,130,390,90,90)
  

  fill('#f32933');
  textFont("Phosphate");
  stroke(colorSet[floor(random(2, 4))]);
  strokeWeight(5);
  textSize(40);
  //text('HotPot . js ', 670, 95);
  textAlign(CENTER);
  text('HotPot . js ', width/2, height * (1/8));
  fill('#60bc50');
  
  textSize(20);
  stroke(colorSet[floor(random(3, 4))]);
  //noStroke();
  fill(colorSet[0]);
  textFont('Snell Roundhand');
  //text("How  are  you  feeling  today?",730,130);
  text("How  are  you  feeling  today?",width/2, height *(1/6));
  
  stroke(colorSet[floor(random(1, 3))]);
  strokeWeight(2);
  textSize(18);
  text('', 191, 300);
  fill(255)
  noStroke()
  
  

  // showing text of food counter
  for (let i = 0; i < 6; i++) {
    foods[i].showText();
  }
  
  //food image drops down and reset
  for (let i = 0; i < 13; i++) {
    // tags[i].showText();
    tags[i].imageDrop();
    tags[i].reset();
  }

  // test
  // tag1.imageDrop();
  // tag1.reset();
  // tag2.imageDrop();
  // tag2.reset();
  // counter1.showText();

  // show hotpot image
  //image(hourImg,100,320,180,180);
  imageMode(CENTER)
  image(hotpotImg, width / 2, height - 130, 350, 300)

}

function mousePressed() {
  
  //counting when button is pressed
  for (let i = 0; i < 13; i++) {
    tags[i].meow();
  }
  
  // test
  // tag1.meow();
  // tag2.meow();
}// two object arrays
let tags = [];
let foods = [];

// useless
let love;
let appleNum = 0;
let greenNum = 0;

// food images
let appleImg
let bananaImg
let greenOnionImg;
let hotpotImg;
let onionImg;
let chickenImg;
let potatoImg;

// useless
let y = 0;
let y1 = 0;
let yo = false;
let yay = false

// neon sign color
let colorSet = ['#4f7df6', '#374054', '#fdbde0', '#f9eb8a'];

// emotion tag name array
let tagArray = []

// food name array
let foodArray = []

// food image array
let imgArray = []

// food name array
let realFoodArray = [];

// to implement realFood into fakeFood
let fakeFoodArray = [];

// debug fakeFoodArray
let testArray = [];

function preload() {
  appleImg = loadImage("apple.png");
  bananaImg = loadImage("banana.png");
  greenOnionImg = loadImage("greenOnion.png");
  onionImg = loadImage("onion.png");
  hotpotImg = loadImage("hotpot.png");
  chickenImg = loadImage("raw chicken.png");
  potatoImg = loadImage("potato.png");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //frameRate(5);
  // define all kinds of arrays

  imgArray = [onionImg, onionImg,
    					appleImg, appleImg, appleImg,
   						bananaImg, bananaImg,
   						greenOnionImg, greenOnionImg,
    					chickenImg,
    					potatoImg, potatoImg, potatoImg
 							]

  tagArray = ["#anxious", "#suck",
    					"#cute", "#love", "#hahahahaha",
    					"#dope", "#yay",
    					"#sad", "#dreamy",
    					"#meow",
    					"#sleepy", "#tired", "#chill"
 						 ]


  foodArray = ["onion", "onion",
    					 "apple", "apple", "apple",
   						 "banana", "banana",
  						 "green onion", "green onion",
   						 "chicken",
    					 "potato", "potato", "potato"
  						]

  realFoodArray = ["onion",
    							 "apple",
    							 "banana",
   								 "green onion",
   								 "chicken",
   								 "potato",
  								]
  


  // test
  // define new counter object
  // counter1 = new Counter("apple");
  // define new tag object
  // tag1 = new Tag("test1", counter1, greenOnionImg,
  //   550, 200, // tag position
  //   50, 50); // text position
  // tag2 = new Tag("test2", counter1, greenOnionImg,
  //   550, 150, // tag position
  //   50, 50); // text position

  // create tag button
  // tag1.show()
  // tag2.show()

  // real thing, not test
  // create new neon object
  neon = new Neon();
  

  // create food list array
  for (let i = 0; i < 6; i++) {
    foods[i] = new Counter(realFoodArray[i], 50 + i * 50)
    //print(foods[i])
  }
  
  // define an array to put into new tag object
  fakeFoodArray = [foods[0], foods[0],
    							 foods[1], foods[1], foods[1],
    							 foods[2], foods[2],
    							 foods[3], foods[3],
    							 foods[4],
   								 foods[5], foods[5], foods[5]
 									 ]
  
  // create tags array
  for (let i = 0; i < 13; i++) {
    tags[i] = new Tag(tagArray[i], fakeFoodArray[i], imgArray[i],
      random(windowWidth/2 - 50,windowWidth/2+100),random(windowHeight-600,windowHeight-250) ,350, 60 + i * 50);
  }
	
  // create tag buttons
  for (let i = 0; i < 13; i++) {
    tags[i].show()
  }
}


function draw() {
  background(0);
  
  // neon stuff
  neon.show();
  neon.flash();

  fill('#f32933');
  textFont("Phosphate");
  stroke(colorSet[floor(random(2, 4))]);
  strokeWeight(5);
  textSize(58);
  text('HotPot . js ', 670, 95);
  fill('#60bc50');
  
  textSize(25);
  stroke(colorSet[floor(random(3, 4))]);
  //noStroke();
  fill(colorSet[0]);
  textFont('Snell Roundhand');
  text("How  are  you  feeling  today?",730,130)
  
  stroke(colorSet[floor(random(1, 3))]);
  strokeWeight(2);
  textSize(18);
  text('', 191, 300);
  fill(255)
  noStroke()

  // showing text of food counter
  for (let i = 0; i < 6; i++) {
    foods[i].showText();
  }
  
  // food image drops down and reset
  for (let i = 0; i < 13; i++) {
    // tags[i].showText();
    tags[i].imageDrop();
    tags[i].reset();
  }

  // test
  // tag1.imageDrop();
  // tag1.reset();
  // tag2.imageDrop();
  // tag2.reset();
  // counter1.showText();

  // show hotpot image
  imageMode(CENTER)
  image(hotpotImg, windowWidth / 2, windowHeight - 190, 310, 310)

}

function mousePressed() {
  
  // counting when button is pressed
  for (let i = 0; i < 13; i++) {
    tags[i].meow();
  }
  
  // test
  // tag1.meow();
  // tag2.meow();
}let tags = [];
let love;
let appleNum = 0;
let greenNum = 0;
let appleImg
let bananaImg
let greenOnionImg;
let hotpotImg;
let onionImg;
let chickenImg;
let potatoImg;
let backgroundImg;
let sadImg
let y = 0;
let y1 = 0;
let yo = false;
let yay = false

let colorSet = ['#4f7df6', '#374054', '#fdbde0', '#f9eb8a'];

let tagArray = []
//   "#anxious", "#suck",
//   "#cute", "#love", "#hahahahaha",
//   "#dope", "#yay",
//   "#sad", "#dreamy",
//   "#meow",
//   "#sleepy", "#tired", "#chill"
// ]

let foodArray = []
// "onion", "onion",
//   "apple", "apple", "apple",
//   "banana", "banana",
//   "green onion", "green onion",
//   "chicken",
//   "potato", "potato", "potato"
// ]

let imgArray = []
//onionImg, onionImg,
//   appleImg, appleImg, appleImg,
//   bananaImg, bananaImg,
//   greenOnionImg, greenOnionImg,
//   chickenImg,
//   potatoImg, potatoImg, potatoImg
// ]


function preload() {
  appleImg = loadImage("apple.png");
  bananaImg = loadImage("banana.png");
  greenOnionImg = loadImage("greenOnion.png");
  onionImg = loadImage("onion.png");
  hotpotImg = loadImage("hotpot.png");
  chickenImg = loadImage("raw chicken.png");
  potatoImg = loadImage("potato.png");
  backgroundImg = loadImage("background.png");
  sadImg = loadImage("sad.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  imgArray = [onionImg, onionImg,
    appleImg, appleImg, appleImg,
    bananaImg, bananaImg,
    greenOnionImg, greenOnionImg,
    chickenImg,
    potatoImg, potatoImg, potatoImg
  ]

  tagArray = ["#anxious", "#suck",
    "#cute", "#love", "#hahahahaha",
    "#dope", "#yay",
    "#sad", "#dreamy",
    "#meow",
    "#sleepy", "#tired", "#chill"
  ]


  foodArray = ["onion", "onion",
    "apple", "apple", "apple",
    "banana", "banana",
    "green onion", "green onion",
    "chicken",
    "potato", "potato", "potato"
  ]


  counter1 = new Counter("apple");
  tag1 = new Tag("test1", counter1, greenOnionImg,
    550, 200,
    50, 50);
  tag1.show()
  tag2 = new Tag("test2", counter1, greenOnionImg,
    550, 150,
    50, 50);
  tag2.show()


  //     tag2 = new Tag("sad", "apple", appleImg, 100, 100, 80, 80);
  //     tag2.show()

  //   tag3 = new Tag("onion", onionImg, 150, 150, 50, 50, 50);
  //   tag3.show()

  //   tag4 = new Tag("banana", bananaImg, 150, 150, 50, 50, 50);
  //   tag4.show()

  //   tag5 = new Tag("green onion", greenOnionImg, 150, 150, 50, 50, 50);
  //   tag5.show()

  //   tag6 = new Tag("green onion", greenOnionImg, 150, 150, 50, 50, 50);
  //   tag6.show()

  //   tag7 = new Tag("green onion", greenOnionImg, 150, 150, 50, 50, 50);
  //   tag7.show()

  for (let i = 0; i < 13; i++) {
    tags[i] = new Tag(tagArray[i], foodArray[i], imgArray[i],
      random(100, 400), random(100, 400), 350, 60 + i * 50);

    //print(tagArray[i], foodArray[i], imgArray[i])
  }

  for (let i = 0; i < 13; i++) {
    tags[i].show()
  }
}


function mousePressed() {
  for (let i = 0; i < 13; i++) {
    tags[i].meow();
  }
  tag1.meow();
  tag2.meow();
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

class Neon {
  constructor(neonX, neonY, neonW, neonH) {
    this.x = neonX;
    this.y = neonY;
    this.w = neonW;
    this.h = neonH;
  }

  show() {
    //neno frame
    rectMode(CENTER);
    stroke(colorSet[0]);
    strokeWeight(4);
    stroke(colorSet[floor(random(0, 4))]);
    noFill();
    rect(width / 2, height / 4.5, width - 1320, height - 630); //small frame
    rect(width / 2, height / 2, width - 100, height - 100); //big frame
  }

  //neon flash effect
  flash() {
    rectMode(CENTER);
    strokeWeight(2);
    stroke(colorSet[1]);
    translate();
    // for (var i = width/2-(width-1400/2))
    for (var i = width / 2 - (width - 1322) / 2; i < width / 2 + (width - 1322) / 2; i += 8) {
      var x = i;
      if (i == (width / 2 - (width - 1322) / 2) + 8 * 7 || i == (width / 2 - (width - 1322) / 2) + 8 * 8) {
        stroke(colorSet[floor(random(0, 3))]);
      } else {
        stroke(colorSet[1]);
      }
      if (i == (width / 2 - (width - 1322) / 2) + 8 * 1 || i == (width / 2 - (width - 1322) / 2) + 8 * 2 || i == (width / 2 - (width - 1322) / 2) + 8 * 20 || i == (width / 2 - (width - 1322) / 2) + 8 * 41 || i == (width / 2 - (width - 1322) / 2) + 8 * 32) {
        stroke(colorSet[2]);
      }
      if (i == (width / 2 - (width - 1322) / 2) + 8 * 50) {
        stroke(colorSet[floor(random(0, 3))]);
      }
      if (i == (width / 2 - (width - 1322) / 2) + 8 * 40 || i == (width / 2 - (width - 1320) / 2) + 8 * 42 || i == (width / 2 - (width - 1322) / 2) + 8 * 43 || i == (width / 2 - (width - 1322) / 2) + 8 * 44) {
        stroke(colorSet[0]);
      }
      line(x, height / 4.5 - (height - 635) / 2, x, height / 4.5 + (height - 635) / 2);
    }
  }
}

function draw() {
  background(0);
  textSize(20);
  fill('#4f7df6');
  text('How are you feeling today?', 1220, 180)
  
  //background(0);
  //print(counter1.count);
  neon = new Neon();
  neon.show();
  neon.flash();

  //neon text
  fill('#f32933');
  textFont("Phosphate");
  stroke(colorSet[floor(random(2, 4))]);
  strokeWeight(7);
  textSize(40);
  text(' HotPot  .  js ', 715, 180);
  fill('#60bc50');
  //textFont(NeonFont);
  stroke(colorSet[floor(random(1, 3))]);
  strokeWeight(2);
  textSize(18);
  text('', 191, 300);
  fill(255)
  noStroke()


  // image(hotpotImg, windowWidth / 2, windowHeight/2, 380, 380);
  //image(onionImg, windowWidth/2,windowHeight/2,40,40)

  for (let i = 0; i < 13; i++) {
    tags[i].showText();
    tags[i].imageDrop();
    tags[i].reset();
  }
  tag1.imageDrop();
  tag1.reset();
  tag2.imageDrop();
  tag2.reset();
  counter1.showText();

  imageMode(CENTER)
  image(hotpotImg, windowWidth / 2, windowHeight - 200, 380, 380)
 
  //button
  image(sadImg,1250,300,1181/15,827/15)
  
  // tag1.showText();
  // tag2.showText();
  // tag1.imageDrop();
  // tag2.imageDrop();
  // tag1.reset();
  // tag2.reset();






}let neon;
let colorSet = ['#4f7df6', '#374054', '#fdbde0','#f9eb8a'];
//light bule ; dark bule; 

function setup() {
  createCanvas(600, 500);
  frameRate(5);
  
}

function draw() {
  background(0);
  neon = new Neon();
  neon.show();
  neon.flash();
  
  fill('#f32933');
  textFont(NeonFont);
  stroke(colorSet[floor(random(2, 4))]);
  strokeWeight(3);
  textSize(40);
  text('The flavor of today ', 110, 265);
  fill('#60bc50');
  textFont(NeonFont);
  stroke(colorSet[floor(random(1, 3))]);
  strokeWeight(2);
  textSize(18);
  text('',191,300);

  }


function preload(){
 NeonFont = loadFont('TpldKhangXiDictTrial.otf');
}
class Neon {
  constructor(neonX, neonY, neonW, neonH) {
    this.x = neonX;
    this.y = neonY;
    this.w = neonW;
    this.h = neonH;
  }

  show() {
    rectMode(CENTER);
    stroke(colorSet[0]);
    strokeWeight(4);
    stroke(colorSet[floor(random(0, 2))]);
    noFill();
    rect(width / 2, height / 2, width - 170, height - 280);
  }

  flash() {
    rectMode(CENTER);
    strokeWeight(2);
    stroke(colorSet[1]);
    for (var i = width / 2 - (width - 180) / 2; i < width / 2 + (width - 170) / 2; i += 8) {
      var x = i;
      //var j =
      if (i == (width / 2 - (width - 180) / 2) + 8 * 7 || i == (width / 2 - (width - 180) / 2) + 8 * 8) {
        stroke(colorSet[floor(random(0, 3))]);
      } else {
        stroke(colorSet[1]);
      }
      if (i == (width / 2 - (width - 180) / 2) + 8 * 1 || i == (width / 2 - (width - 180) / 2) + 8 * 2 || i == (width / 2 - (width - 180) / 2) + 8 * 20 || i == (width / 2 - (width - 180) / 2) + 8 * 41 || i == (width / 2 - (width - 180) / 2) + 8 * 32) {
        stroke(colorSet[2]);
      }
      if (i == (width / 2 - (width - 180) / 2) + 8 * 50) {
        stroke(colorSet[floor(random(0, 3))]);
      }
      if (i == (width / 2 - (width - 180) / 2) + 8 * 40 || i == (width / 2 - (width - 180) / 2) + 8 * 42 || i == (width / 2 - (width - 180) / 2) + 8 * 43 || i == (width / 2 - (width - 180) / 2) + 8 * 44) {
        stroke(colorSet[0]);
      }
      line(x, height / 2 - (height - 286) / 2, x, height / 2 + (height - 284) / 2);
    }
  }

}let tags = [];
let love;
let appleNum = 0;
let greenNum = 0;
let appleImg
let bananaImg
let greenOnionImg;
let hotpotImg;
let onionImg;
let chickenImg;
let potatoImg;
let y = 0;
let y1 = 0;
let yo = false;
let yay = false

let tagArray = []
//   "#anxious", "#suck",
//   "#cute", "#love", "#hahahahaha",
//   "#dope", "#yay",
//   "#sad", "#dreamy",
//   "#meow",
//   "#sleepy", "#tired", "#chill"
// ]

let foodArray = []
// "onion", "onion",
//   "apple", "apple", "apple",
//   "banana", "banana",
//   "green onion", "green onion",
//   "chicken",
//   "potato", "potato", "potato"
// ]

let imgArray = []
//onionImg, onionImg,
//   appleImg, appleImg, appleImg,
//   bananaImg, bananaImg,
//   greenOnionImg, greenOnionImg,
//   chickenImg,
//   potatoImg, potatoImg, potatoImg
// ]


function preload() {
  appleImg = loadImage("apple.png");
  bananaImg = loadImage("banana.png");
  greenOnionImg = loadImage("greenOnion.png");
  onionImg = loadImage("onion.png");
  hotpotImg = loadImage("hotpot.png");
  chickenImg = loadImage("raw chicken.png");
  potatoImg = loadImage("potato.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  imgArray = [onionImg, onionImg,
  appleImg, appleImg, appleImg,
  bananaImg,bananaImg,
  greenOnionImg, greenOnionImg,
  chickenImg,
  potatoImg, potatoImg, potatoImg
]
  
  tagArray = ["#anxious", "#suck",
  "#cute", "#love", "#hahahahaha",
  "#dope", "#yay",
  "#sad", "#dreamy",
  "#meow",
  "#sleepy", "#tired", "#chill"
]
  
 
  
  foodArray = ["onion", "onion",
  "apple", "apple", "apple",
  "banana", "banana",
  "green onion", "green onion",
  "chicken",
  "potato", "potato","potato"
]
  
  print(foodArray[3])

    tag1 = new Tag("test", "test", greenOnionImg,
      150, 150,
      50, 50);
    tag1.show()

//     tag2 = new Tag("sad", "apple", appleImg, 100, 100, 80, 80);
//     tag2.show()

  //   tag3 = new Tag("onion", onionImg, 150, 150, 50, 50, 50);
  //   tag3.show()

  //   tag4 = new Tag("banana", bananaImg, 150, 150, 50, 50, 50);
  //   tag4.show()

  //   tag5 = new Tag("green onion", greenOnionImg, 150, 150, 50, 50, 50);
  //   tag5.show()

  //   tag6 = new Tag("green onion", greenOnionImg, 150, 150, 50, 50, 50);
  //   tag6.show()

  //   tag7 = new Tag("green onion", greenOnionImg, 150, 150, 50, 50, 50);
  //   tag7.show()

  for (let i = 0; i < 13; i++) {
    tags[i] = new Tag(tagArray[i],foodArray[i],imgArray[i],
      random(100, 400), random(100, 400),
      50, i * 50);
    
    //print(tagArray[i], foodArray[i], imgArray[i])
  }
  
  for (let i = 0; i < 13; i++) {
    tags[i].show()
  }
  
  
  
}


function mousePressed() {
  for (let i = 0; i < 13; i++) {
    tags[i].meow();
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function draw() {

  background(220);
  // image(hotpotImg, windowWidth / 2, windowHeight/2, 380, 380);
  //image(onionImg, windowWidth/2,windowHeight/2,40,40)

  for (let i = 0; i < 13; i++) {
    tags[i].showText();
    tags[i].imageDrop();
    tags[i].reset();

    imageMode(CENTER)
    image(hotpotImg, windowWidth / 2, windowHeight - 200, 380, 380)
    // tag1.showText();
    // tag2.showText();
    // tag1.imageDrop();
    // tag2.imageDrop();
    // tag1.reset();
    // tag2.reset();

   

  }


}let tags = [];
let love;
let appleNum = 0;
let greenNum = 0;
let appleImg
let bananaImg
let greenOnionImg;
let hotpotImg;
let onionImg;
let chickenImg;
let potatoImg;
let y = 0;
let y1 = 0;
let yo = false;
let yay = false

let tagArray = []
//   "#anxious", "#suck",
//   "#cute", "#love", "#hahahahaha",
//   "#dope", "#yay",
//   "#sad", "#dreamy",
//   "#meow",
//   "#sleepy", "#tired", "#chill"
// ]

let foodArray = []
// "onion", "onion",
//   "apple", "apple", "apple",
//   "banana", "banana",
//   "green onion", "green onion",
//   "chicken",
//   "potato", "potato", "potato"
// ]

let imgArray = []
//onionImg, onionImg,
//   appleImg, appleImg, appleImg,
//   bananaImg, bananaImg,
//   greenOnionImg, greenOnionImg,
//   chickenImg,
//   potatoImg, potatoImg, potatoImg
// ]


function preload() {
  appleImg = loadImage("apple.png");
  bananaImg = loadImage("banana.png");
  greenOnionImg = loadImage("greenOnion.png");
  onionImg = loadImage("onion.png");
  hotpotImg = loadImage("hotpot.png");
  chickenImg = loadImage("raw chicken.png");
  potatoImg = loadImage("potato.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  imgArray = [onionImg, onionImg,
  appleImg, appleImg, appleImg,
  bananaImg,bananaImg,
  greenOnionImg, greenOnionImg,
  chickenImg,
  potatoImg, potatoImg, potatoImg
]
  
  tagArray = ["#anxious", "#suck",
  "#cute", "#love", "#hahahahaha",
  "#dope", "#yay",
  "#sad", "#dreamy",
  "#meow",
  "#sleepy", "#tired", "#chill"
]
  
 
  
  foodArray = ["onion", "onion",
  "apple", "apple", "apple",
  "banana", "banana",
  "green onion", "green onion",
  "chicken",
  "potato", "potato","potato"
]
  
  print(foodArray[3])

    tag1 = new Tag("test", "test", greenOnionImg,
      150, 150,
      50, 50);
    tag1.show()

//     tag2 = new Tag("sad", "apple", appleImg, 100, 100, 80, 80);
//     tag2.show()

  //   tag3 = new Tag("onion", onionImg, 150, 150, 50, 50, 50);
  //   tag3.show()

  //   tag4 = new Tag("banana", bananaImg, 150, 150, 50, 50, 50);
  //   tag4.show()

  //   tag5 = new Tag("green onion", greenOnionImg, 150, 150, 50, 50, 50);
  //   tag5.show()

  //   tag6 = new Tag("green onion", greenOnionImg, 150, 150, 50, 50, 50);
  //   tag6.show()

  //   tag7 = new Tag("green onion", greenOnionImg, 150, 150, 50, 50, 50);
  //   tag7.show()

  for (let i = 0; i < 13; i++) {
    tags[i] = new Tag(tagArray[i],foodArray[i],imgArray[i],
      random(100, 400), random(100, 400),
      50, i * 50);
    
    //print(tagArray[i], foodArray[i], imgArray[i])
  }
  
  for (let i = 0; i < 13; i++) {
    tags[i].show()
  }
  
  
  
}


function mousePressed() {
  for (let i = 0; i < 13; i++) {
    tags[i].meow();
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function draw() {

  background("#361041");
  // image(hotpotImg, windowWidth / 2, windowHeight/2, 380, 380);
  //image(onionImg, windowWidth/2,windowHeight/2,40,40)

  for (let i = 0; i < 13; i++) {
    tags[i].showText();
    tags[i].imageDrop();
    tags[i].reset();

    imageMode(CENTER)
    image(hotpotImg, windowWidth / 2, windowHeight - 200, 380, 380)
    // tag1.showText();
    // tag2.showText();
    // tag1.imageDrop();
    // tag2.imageDrop();
    // tag1.reset();
    // tag2.reset();

   

  }


}let tags = [];
let love;
let appleNum = 0;
let greenNum = 0;
let appleImg
let bananaImg
let greenOnionImg;
let hotpotImg;
let onionImg;
let chickenImg;
let potatoImg;
let y = 0;
let y1 = 0;
let yo = false;
let yay = false
let tagArray = ["#anxious", "#suck",
  "#cute", "#love", "#hahahahaha",
  "#dope", "#yay",
  "#sad", "#dreamy",
  "#meow",
  "#sleepy", "#tired", "#chill"
]

let foodArray = ["onion", "onion",
  "apple", "apple", "apple",
  "banana", "banana",
  "green onion", "green onion",
  "chicken",
  "potato", "potato", "potato"
]

let imgArray = [onionImg, onionImg,
  appleImg, appleImg, appleImg,
  bananaImg, bananaImg,
  greenOnionImg, greenOnionImg,
  chickenImg,
  potatoImg, potatoImg, potatoImg
]


function preload() {
  appleImg = loadImage("apple.png");
  bannaImg = loadImage("banana.png");
  greenOnionImg = loadImage("greenOnion.png");
  onionImg = loadImage("onion.png");
  hotpotImg = loadImage("hotpot.png");
  chickenImg = loadImage("raw chicken.png");
  potatoImg = loadImage("potato.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  tag1 = new Tag("#anxious", greenOnionImg, 100, 480, 40, 50, 50);
  tag1.show()

  tag2 = new Tag("#suck", appleImg, 100, 480, 70, 80, 50);
  tag2.show()
  
  tag3 = new Tag("#cute", onionImg, 150, 480, 100, 50, 50);
  tag3.show()
  
  tag4 = new Tag("#love", bananaImg, 150, 480, 130, 50, 50);
  tag4.show()
  
  tag5 = new Tag("#hahahahaha", chickenImg, 150, 480, 160, 50, 50);
  tag5.show()
  
  tag6 = new Tag("#dope", potatoImg, 150, 480, 190, 50, 50);
  tag6.show()
  
  tag7 = new Tag("#yay", potatoImg, 150, 480, 220, 50, 50);
  tag7.show()

  tag8 = new Tag("#sad", potatoImg, 150, 480, 250, 50, 50);
  tag8.show()
  
  tag9 = new Tag("#dope", potatoImg, 150, 480, 280, 50, 50);
  tag9.show()
  
  tag10 = new Tag("#dope", potatoImg, 150, 480, 190, 50, 50);
  tag10.show()
  
  tag11 = new Tag("#dope", potatoImg, 150, 480, 190, 50, 50);
  tag11.show()
//   for (let i = 0; i < 13; i++) {
    
//     tags[i] = new Tag (tagArray[i], foodArray[i],imgArray[i],i*50,j,i*50,j);
    //print(tagArray[i], foodArray[i], imgArray[i])
    
 // }
}


function mousePressed() {
  tag1.meow();
  tag2.meow();

}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function draw() {

  background(0);
  
 // image(hotpotImg, windowWidth / 2, windowHeight/2, 380, 380);
  //image(onionImg, windowWidth/2,windowHeight/2,40,40)
  imageMode(CENTER)
  image(hotpotImg,windowWidth/2,windowHeight-200,380,380)
  tag1.showText();
  tag2.showText();
  tag1.imageDrop();
  tag2.imageDrop();
  tag1.reset();
  tag2.reset();


}let love;
let appleNum = 0;
let greenNum = 0;
let appleImg
let bananaImg
let greenOnionImg;
let hotpotImg;
let y = 0;
let y1 = 0;
let yo = false;
let yay = false


function preload() {
  hotpotImg = loadImage("hotpot.png");
  appleImg = loadImage("apple.png");
  bannaImg = loadImage("banana.png");
  greenOnionImg = loadImage("greenOnion.png");
  onionImg = loadImage("onion.png");
  //hotpotImg = loadImage("hotpot.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
 
  tag1 = new Tag("#sad", "green onion", greenOnionImg, 150, 150, 50, 50, 50);
  tag1.show()

  tag2 = new Tag("#love", "apple", appleImg, 100, 100, 80, 80, 50);
  tag2.show()
  
}


function mousePressed() {
  tag1.meow();
  tag2.meow();

}

function draw() {
  background(220);
  image(hotpotImg, windowWidth/2, windowHeight-400,380,380);
  tag1.showText();
  tag2.showText();
  tag1.imageDrop();
  tag2.imageDrop();
  tag1.reset();
  tag2.reset();

}let love;
let appleNum = 0;
let greenNum = 0;
let appleImg
let bananaImg
let greenOnionImg;
let y = 0;
let y1 = 0;
let yo = false;
let yay = false


function preload() {
  appleImg = loadImage("apple.png");
  bannaImg =  loadImage("banana.png");
  greenOnionImg = loadImage("greenOnion.png");
  yyy = loadImage("onion.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  
  //      love = createButton("#love")
  //      love.position(200, 200)
  //      love.mousePressed(apple) //whenever #love is pressed, apple got one more vote


  //      sad = love = createButton("#sad")
  //      sad.position(100, 200)
  //      sad.mousePressed(greenOnion)

  // sad = love = createButton("#sad")
  // love.position(100, 200)
  // love.mousePressed(greenOnion)

  tag1 = new Tag("#sad", "green onion", 150, 150, 50, 50,50);
  tag1.show()

  tag2 = new Tag("#love", "apple",yyy, 100, 100, 80, 80,50);
  tag2.show()
}

function apple() {
  appleNum = appleNum + 1; //apple plus 1
  yo = true
}

function greenOnion() {
  greenNum = greenNum + 1; //apple plus 1
  yay = true
}

function mousePressed() {
  tag1.meow();
  tag2.meow();
  //tag2.showFood();
  
  
}

function draw() {
  
	//image(yyy,200,200)
  // imageMode(LEFT)
  
  background(220);
  tag1.showText();
  tag2.showText();
  tag1.imageDrop();
  tag2.imageDrop();

  
  
  
  //image(yyy,200,200,40,40)
  // tag1.showFood();

//   if (yo) {
//     appleImg = image(appleImage, 50, y, 40, 40)
//     y = y + 4 //speed 
//   }

//   if (yay) {
//     greenOnionImg = image(greenOnionImage, 50, y1, 40, 40)
//     y1 = y1 + 4 //speed 
//   }

  if (y > windowHeight) {
    yo = false;
    y = 0; //reset apple position
  }

  if (y1 > windowHeight) {
    yay = false;
    y1 = 0; //reset greenOnion position
  }
}let love;
let appleNum = 0;
let greenNum = 0;
let appleImg
let bananaImg
let greenOnionImg;
let y = 0;
let y1 = 0;
let yo = false;
let yay = false


function preload() {
  appleImg = loadImage("apple.png");
  bannaImg = loadImage("banana.png");
  greenOnionImg = loadImage("greenOnion.png");
  yyy = loadImage("onion.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //      love = createButton("#love")
  //      love.position(200, 200)
  //      love.mousePressed(apple) //whenever #love is pressed, apple got one more vote


  //      sad = love = createButton("#sad")
  //      sad.position(100, 200)
  //      sad.mousePressed(greenOnion)

  // sad = love = createButton("#sad")
  // love.position(100, 200)
  // love.mousePressed(greenOnion)

  tag1 = new Tag("#sad", "green onion", 150, 150, 50, 50, 50);
  tag1.show()

  tag2 = new Tag("#love", "apple", yyy, 100, 100, 80, 80, 50);
  tag2.show()
}

function apple() {
  appleNum = appleNum + 1; //apple plus 1
  yo = true
}

function greenOnion() {
  greenNum = greenNum + 1; //apple plus 1
  yay = true
}

function mousePressed() {
  tag1.meow();
  tag2.meow();
  //tag2.showFood();
  tag1.imageDrop();
  tag2.imageDrop();

}

function draw() {

  //image(yyy,200,200)
  // imageMode(LEFT)

  background(220);
  tag1.showText();
  tag2.showText();



  //image(yyy,200,200,40,40)
  // tag1.showFood();

  //   if (yo) {
  //     appleImg = image(appleImage, 50, y, 40, 40)
  //     y = y + 4 //speed 
  //   }

  //   if (yay) {
  //     greenOnionImg = image(greenOnionImage, 50, y1, 40, 40)
  //     y1 = y1 + 4 //speed 
  //   }

  if (y > windowHeight) {
    yo = false;
    y = 0; //reset apple position
  }

  if (y1 > windowHeight) {
    yay = false;
    y1 = 0; //reset greenOnion position
  }
}let love;
let appleNum = 0;
let appleImg
let bananaImg
let y = 0;
let yo = false;

function preload() {
  appleImage = loadImage("apple.png");
  bannaImage = loadImage("banana.png");
}

function setup() {
  createCanvas(windowHeight, windowWidth);
  love = createButton("#love")
  love.position(200, 200)
  love.mousePressed(apple) //whenever #love is pressed, apple got one more vote
}

function apple() {
  appleNum = appleNum + 1; //apple plus 1
  yo = true
}

function draw() {
  background(220);
  text("apple " + appleNum, 100, 100)
  if (yo) {
    appleImg = image(appleImage, 50, y, 40, 40)
    y = y + 4 //speed 
    print(y) //console.log
  }
  if (y > windowHeight) {
    yo = false;
    y = 0; //reset apple position
  }
  print(yo)
  
}let love;
let appleNum = 0;
let appleImg;
let y = 0;
let yo = false;

function preload() {
  appleImage = loadImage("apple.png");
}

function setup() {
  createCanvas(400, 400);
  love = createButton("#love")
  love.position(200, 200)
  love.mousePressed(apple) //whenever #love is pressed, apple got one more vote
}

function apple() {
  appleNum = appleNum + 1; //apple plus 1
  yo = true
}

function draw() {
  background(220);
  text("apple " + appleNum, 100, 100)
  if (yo) {
    appleImg = image(appleImage, 50, y, 40, 40)
    y = y + 4 //speed 
    print(y) //console.log
  }
  if (y > 400) {
    yo = false;
    y = 0; //reset apple position
  }
  print(yo)
}let love;
let appleNum = 0;
let appleImg;
let y = 0;
let yo = false;


function preload() {
  appleImage = loadImage("apple.png");

}

function setup() {
  createCanvas(400, 400);
  love = createButton("#love")
  love.position(200, 200)
  love.mousePressed(apple) //whenever #love is pressed, apple got one more vote

}

function apple() {
  appleNum = appleNum + 1; //apple plus 1
  yo = true
}

// function appleDrop() {
//   y = y + 5


// }

function draw() {
  background(220);
  text("apple " + appleNum, 100, 100)
  if(yo){
  appleImg = image(appleImage, 50, y, 40, 40)
    y = y +5
    print(y)
  }
  print(yo)
}let love;
let appleNum = 0;
let appleImg;
let y = 0;


function preload() {
  appleImage = loadImage("apple.png");

}

function setup() {
  createCanvas(400, 400);
  love = createButton("#love")
  love.position(200, 200)
  love.mousePressed(apple) //whenever #love is pressed, apple got one more vote

}

function apple() {
  appleNum = appleNum + 1; //apple plus 1
}

// function appleDrop() {
//   y = y + 5


// }

function draw() {
  background(220);
  text("apple " + appleNum, 100, 100)
  if(love.mousePressed()){
  appleImg = image(appleImage, 50, y+5, 40, 40)
  }
}var video;
var button;
var snapshots = [];

function setup() {
  createCanvas(800, 400);
  background(51);
  video = createCapture(VIDEO);
  video.size(400, 400);
  //video.hide();
  button = createButton('snap');
  button.mousePressed(takesnap);
}

function takesnap() {
  snapshots.push(video.get());
  //image(video, 0, 0);
}


function draw() {
  var w = 80;
  var h = 60;
  var x = 0;
  var y = 0;

  for (var i = 0; i < snapshots.length; i++) {
    tint(255, 50);
    image(snapshots[i], x, y, w, h);
    x = x + w;
    if (x > width) {
      x = 0;
      y = y + h;
    }
  }
}var video;
var button;
var snapshots = [];

function setup() {
  createCanvas(400, 400);
  background(51);
  video = createCapture(VIDEO);
  video.size(400, 400);
  //video.hide();
  button = createButton('snap');
  button.mousePressed(takesnap);
}

function takesnap() {
  snapshots.push(video.get());
  //image(video, 0, 0);
}


function draw() {
  for (var i = 0; i < snapshots.length; i++);
  image(snapshots[i], 0, 0);

}//var amp;
var button;
var volhistory = [];
var mic;
let colorset = ['#586BA4','#324376', '#F5DD90', '#F68E5F',"F76C5E"];

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  mic = new p5.AudioIn()
  mic.start();
}

function draw() {
  background(0);
  //var vol = amp.getLevel();
  var micLevel = mic.getLevel();
  volhistory.push(micLevel);
  stroke(random(colorset));
  fill(random(colorset));

  translate(width / 2, height / 2);
  beginShape();
  for (var i = 0; i < 360; i++) {
    var r = map(volhistory[i], 0, 1, 50, 0);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();

}var song;
var button;
var amp;

function setup() {
  createCanvas(200, 200);
  song = loadSound("Renaissance.mp3", loaded);
  button = createButton("play");
  button.mousePressed(togglePlaying);
  amp = new p5
  background(255);
}

function loaded() {
}

function draw(){
ellipse(100,100,20,20);
}
function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.3);
    button.html("pause");
  } else {
    song.stop();
    button.html("play");
  }
}/**
 * @name Frequency Spectrum
 * @description <p>Visualize the frequency spectrum of live audio input.</p>
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
 */
var song;
var fft;
var analyzer;

function setup() {
   createCanvas(1280,1000);
   noFill();

   
   fft = new p5.FFT(0.8,256);
   analyzer = new p5.Amplitude();
   analyzer.setInput(song);
   fft.setInput(song);
}

function preload(){
    song =loadSound('deer1.wav');
}   
  
function mouseClicked() {
  song.play();
}

function keyPressed(k) {
    song.stop();
   
}

function draw() {
     background(176,123,18,200);
   var spectrum = fft.analyze();
   var waveform = fft.waveform();

  // beginShape();
   for (i = 0, it = 0;  i< spectrum.length && it < waveform.length; i++,it++) {
     
    // vertex(i, map(spectrum[i], 0, 255, height, 0) );
    var spectralCentroid = fft.getCentroid();
    // console.log(waveform.length);
  
    var rms = analyzer.getLevel();
    spectrum[i] = constrain(spectrum[i],128,256)
        var y = map(spectrum[i],140,250,height,0);
    var x = map( waveform[it], -1, 1, 0, width);
    noStroke();
    fill(255);
    ellipse(x*random(0.1,1.5),y,10+rms*100, 10+rms*random(20,100));
   

   }
   
 
  // endShape();
  
}

let meun;
function preload(){

}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}let txt;
let tokens = [];
let padding = 10;

function preload() {
  txt = loadStrings("joke.txt");
}

function setup() {
  createCanvas(400, 400);
  for (let l of txt) {
    tokens = concat(tokens, splitTokens(l));
  }
}

function draw() {
  background(220);
  let y = padding;
  let x = 0;
  for (let i = 0; i < tokens.length; i++) {
    text(tokens[i], x, y);
    x += textWidth(tokens[i]) + textWidth(' ');
    if (x > width - padding){
      y +=textAscent() + textDescent();
      x = 0;
    }
  }
}let weather;
let temp;
let humidity;
let windS;
let clouds;
let pressure;
let url;
var cityname;
let colorset =['#586BA4','#324376', '#F5DD90', '#F68E5F',"F76C5E"];
let api = "https://api.openweathermap.org/data/2.5/find?q=";
let city;
let apikey = "&units=metric&appid=b8969a3f7ee75ed3210ef407f52694f7";

function setup() {
  createCanvas(600, 600, WEBGL);
  var button = select("#submit");
  button.mousePressed(weatherask);
  button.position(140, 19);
  cityname = select("#city");
  frameRate(8);
}

function draw() {
  show();
}
var url = "http://api.open-notify.org/iss-now.json"

function setup() {
  createCanvas(400, 400);
  loadJSON(url, gotData,'jsonp');
}

function gotData(data) {
  println(data);
}

function draw() {
  background(220);
}var weather;

function setup() {
  createCanvas(400, 400);
  loadJSON('http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=553c914faf8170865bbd31a8023d5a2e&', gotData);
}

function gotData(data) {
  println(data);
  weather = data;
}

function draw() {
  background(0);
  if (weather) {
    //fill(255,0,0); 
    ellipse(50, 100, weather.main.temp, weather.main.temp);
    ellipse(50, 100, weather.main.humidity, weather.main.humidity);
  }
}var weather;

function setup() {
  createCanvas(400, 400);
  loadJSON('http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=553c914faf8170865bbd31a8023d5a2e&', gotData);
}

function gotData(data) {
  println(data);
  weather = data;
}

function draw() {
  background(0);
  if (weather) {
    //fill(255,0,0); 
    ellipse(50, 100, weather.main.temp, weather.main.temp);
    ellipse(50, 100, weather.main.humidity, weather.main.humidity);
  }
}let weather;
let temp;
let url;
var cityname;


let api ="https://api.openweathermap.org/data/2.5/find?q=";
let city;
let apikey ="&units=metric&appid=b8969a3f7ee75ed3210ef407f52694f7";

function setup() {
  createCanvas(400, 400);
  
  var button = select("#submit");
  button.mousePressed(weatherask);

  cityname = select("#city");
	
}

function gotData(data){
  
  temp = data.list[0].main.temp;
  console.log(data.list[0].main.temp);
}

function draw() {
  if(temp<10){
  background(20,20,100);
  }
  else if(temp<20){
  background(40,150,220);
  }
  else{
  background(290,180,180);
  }
  fill(255);
  textSize(30);
  text(temp ,185,200);
  textSize(16);
  text(city,178,220);
}

function weatherask(){
  city = cityname.value();
	url = api+city+apikey;
  loadJSON(url,gotData);
}let r = 0;
var b = 255;
let x = 0;
let y = 0;
// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem14321");
  serial.on('data', gotData);
}


function draw() {
  background(255, 237, 225);
  fill(169, 221, 214);
  stroke(245);
  strokeWeight(2);
  ellipse(width / 2, height / 2, 80, 80); // the middle one

  orbit();
  Planet();
  mouse();
  meteors();
  buttonPressed();

}

// function mousePressed() {
//   x = random(0, windowWidth);
//   y = random(0, windowHeight);


function buttonPressed() {
  //var b = map(latestData, 0, 1023, 0, 1023);
  if (latestData > 1000) {
    x = random(0, windowWidth);
    y = random(0, windowHeight);
  }

}let txt;
let tokens = [];

function preload() {
  txt = loadStrings('joke.txt');
  //console.log(txt);

}

function setup() {
  createCanvas(400, 400);
  // for (let l of txt) {
  //   tokens = concat(tokens, splitTokens(l));
  // }
}

function draw() {
  background(220);

  let x = 0;
  let y = 50;

  for (let token of tokens) {
    text(token, x, y);
    x = x + textWidth(token) + textWidth("a");
    if (x > width - 30) {
      y += textAscent(token);
      x = 0;
    }
  }
}
// \n 换行let neon;
let colorSet = ['#4f7df6', '#374054', '#fdbde0', '#f9eb8a'];
let header;
let intro1;
let intro2;
let input;
var button;
var canvas;
var j;


function setup() {
  intro1 = select("#intro1");
  intro1.position(windowWidth - 1550, 380);
  intro2 = select("#intro2");
  intro2.position(windowWidth - 1550, 420);

  canvas = createCanvas(600, 600);
  canvas.position(windowWidth / 2 - 300, windowHeight / 2 - 300);
  frameRate(5);

  textbox = createInput();
  textbox.position(windowWidth - 480, 400)
  button = createButton("Click me")
  button.position(windowWidth - 320, 400)
  button.mousePressed(content);
}

function draw() {
  background(0);
  neon = new Neon();
  neon.show();
  neon.flash();

  fill('#f32933');
  textFont(NeonFont);
  stroke(colorSet[floor(random(2, 4))]);
  strokeWeight(3);
  textSize(75);
  text(j, 130, 300);
  fill('#60bc50');
  textFont(NeonFont);
  stroke(colorSet[floor(random(1, 3))]);
  strokeWeight(2);
  textSize(18);
  text('金  麗  宮  夜  總  會  卡  拉  O  K', 160, 380);
}

function content() {
  j = textbox.value();
}

function preload() {
  NeonFont = loadFont('TpldKhangXiDictTrial.otf');
}
class Neon {
  constructor(neonX, neonY, neonW, neonH) {
    this.x = neonX;
    this.y = neonY;
    this.w = neonW;
    this.h = neonH;
  }

  show() {
    rectMode(CENTER);
    stroke(colorSet[0]);
    strokeWeight(4);
    stroke(colorSet[floor(random(0, 2))]);
    noFill();
    rect(width / 2, height / 2, width - 170, height - 280);
  }

  flash() {
    rectMode(CENTER);
    strokeWeight(2);
    stroke(colorSet[1]);
    for (var i = width / 2 - (width - 180) / 2; i < width / 2 + (width - 170) / 2; i += 8) {
      var x = i;
      //var j =
      if (i == (width / 2 - (width - 180) / 2) + 8 * 7 || i == (width / 2 - (width - 180) / 2) + 8 * 8) {
        stroke(colorSet[floor(random(0, 3))]);
      } else {
        stroke(colorSet[1]);
      }
      if (i == (width / 2 - (width - 180) / 2) + 8 * 1 || i == (width / 2 - (width - 180) / 2) + 8 * 2 || i == (width / 2 - (width - 180) / 2) + 8 * 20 || i == (width / 2 - (width - 180) / 2) + 8 * 41 || i == (width / 2 - (width - 180) / 2) + 8 * 32) {
        stroke(colorSet[2]);
      }
      if (i == (width / 2 - (width - 180) / 2) + 8 * 50) {
        stroke(colorSet[floor(random(0, 3))]);
      }
      if (i == (width / 2 - (width - 180) / 2) + 8 * 40 || i == (width / 2 - (width - 180) / 2) + 8 * 42 || i == (width / 2 - (width - 180) / 2) + 8 * 43 || i == (width / 2 - (width - 180) / 2) + 8 * 44) {
        stroke(colorSet[0]);
      }
      line(x, height / 2 - (height - 286) / 2, x, height / 2 + (height - 284) / 2);
    }
  }

}function setup() {
  //createCanvas(400, 400);
}

function draw() {
  //background(220);
}function setup() {
  //createCanvas(400, 400);
}

function draw() {
  //background(220);
}function setup() {
  //createCanvas(400, 400);
}

function draw() {
  //background(220);
}let serial;
let latestData = "waiting for data";

function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log("DATA: " + currentString); // println the string
  latestData = currentString; // save it for the draw method
}

function setup() { 
  createCanvas(windowWidth, windowHeight);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);
  setInterval(function() {
    console.log("HELLO");
    serial.write(1);
  }, 1000);
} 

function draw() { 
  background(127, 0, 127);
  
  var v = map(latestData,0,1023,0,width);

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

let serial;
let latestData = "waiting for data";

function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log("DATA: " + currentString); // println the string
  latestData = currentString; // save it for the draw method
}

function setup() { 
  createCanvas(windowWidth, windowHeight);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);
  setInterval(function() {
    console.log("HELLO");
    serial.write(1);
  }, 1000);
} 

function draw() { 
  background(127, 0, 127);
  
  var v = map(latestData,0,1023,0,width);

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

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  strokeWeight(20);
}
var data;

function preload() {

  data = loadJSON("brids.json");

}

function setup() {
  //createCanvas(400, 400);
  // var bird = data.birds[1].members[2];
  // createP(bird);
  var birds = data.birds;
  for (var i = 0; i < birds.length; i++) {
    createElement("h1", birds[i].family); // h for header
    var members = birds[i].members;
    for (var j = 0; j < members.length; j++) {
      createDiv(members[j]);
    }
  }
}var data;

function preload() {

  data = loadJSON("brids.json");

}

function setup() {
  //createCanvas(400, 400);
  // var bird = data.birds[1].members[2];
  // createP(bird);
  var birds = data.birds;
  for (var i = 0; i < birds.length; i++) {
    createElement("h1", birds[i].family); // h for header
    var members = birds[i].members;
    for (var j = 0; j < members.length; j++) {
      createDiv(members[j]);
    }
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  //background(220);
}var textbox;
var slider;
var paragraphy;

function setup() {
  noCanvas;
  textbox = createInput("enter text");
  slider = createSlider(10, 64, 16);
  paragraphy = createP("starting text");
  textbox.input(updateText); // changed need people enter themselves
  // input will update automatically
  slider.input(updateSize);
}

function updateSize() {
  paragraphy.style("font-size", slider.value() + "pt");
}


function updateText() {
  paragraphy.html(textbox.value());
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem14321");

  // Here are the callbacks that you can register

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);
}

// We are connected and ready to go
function serverConnected() {
  println("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  println("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    println(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  println("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  println(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log(currentString);             // println the string
  latestData = currentString;            // save it for the draw method
}

// We got raw from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device

function draw() {
  background(255,255,255);
  fill(0,0,0);
  text(latestData, 10, 10);
  // Polling method
  /*
  if (serial.available() > 0) {
  var data = serial.read();
  ellipse(50,50,data,data);
}
*/
}
var textbox;
var slider;
var paragraph;

function setup() {
  noCanvas();
  paragragh = createP('starting text');
  textbox = createInput('enter text');
  slider = createSlider(10, 64, 16);

  textbox.input(doSomething);
}

function doSomething() {
  paragraph.html(textbox.value());
   
}var serial;

function setup() {

  serial = new p5.SerialPort();
  serial.on("list", printList);
  serial.list();
}

function printList(portList) {
  for (var i = 0; i < portList.length; i++)
    console.log(i + "" + portList[i]);
}

function draw() {
  background(220);
} 	var systemVoice = new p5.Speech("Google UK English Female");
	let character = {
    name : "",
    health : 70,
    hunger : 0,
    energy : 90,
    oxygen : 100
  }

	function preload(){
    
    healthCheckYesNo = new yesNoQ(function(){
      speak("Great"); // This is for yes
      setTimeout(bodyCheck, 1500);},function(){
      speak("Answer Recorded");
      setTimeout(nextAction, 2000); // This is for no
    })
    
    nameInfo = new infoQ(function(){
      character.name = infoQ.that.info;
      setTimeout(speak, 500, character.name + ",Access granted");
      setTimeout(speak, 3000, "Would you like to run a full body check?");
      setTimeout(function(){healthCheckYesNo.start()}, 4500);
    });
    
    /* 
    DONT READ THAT UNLESS YOU WANT TO GO CRAZY
    var optionsToGoDict = {
      numOpt: 3,
      answers: [["left","go left", "turn left"], ["go straight","straight","move straight"],["turn right","go right", "right"]],
      results: [function(){speak("HOOOOOLA");},
                function(){speak("NOOPE");}, 
                function(){speak("YEAH YEAH");}],
      elseResult: function(){speak("Nope, gotta repeat again");
                             setTimeout(function(){multiQ.that.restart();},1000);}
    };
    
    optionToGo = new multiQ(optionsToGoDict);
    */
    
    soundFormats('mp3');
    startSound = loadSound('intro.mp3');
    launchSound = loadSound('launch_interface.mp3');
    scanningSound = loadSound('scanning_01.mp3');
    fixingSound = loadSound('fixing.mp3')
    wallPaper = loadImage('image.jpg');
  }
	
	function setup(){
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER);
  	rectMode(CENTER);
		background(255);
    image(wallPaper, 0, 0, width,height);
		fill(0);
    
    startSound.setVolume(0.6);
    startSound.setLoop(true);
    startSound.play();
    
    systemVoice.setRate(0.9);

    startButton = createButton("Start");
    startButton.position(width/2,height-50);
    startButton.mousePressed(startGame);
	}

	function startGame(){
    startButton.hide();
    launchSound.play();
    setTimeout(speak, 3000, "Cryosleep diactivated");
    setTimeout(speak, 6500, "Entering Low Energy Mode");
    setTimeout(speak, 8800, "Provide your credentials");
    setTimeout(function(){nameInfo.start()}, 10000);
  }
	
	function bodyCheck(){
    speak("Initiating Full Body Check");
    setTimeout(function(){scanningSound.play();}, 2800);
    setTimeout(speak, 11800, "Body Check");
    setTimeout(speak, 12800, "Complete");
    setTimeout(speak, 14300, "Minor damage to brain tissue detected");
    setTimeout(speak, 16300, "Minor atrophy of sartorius fiber detected");
    setTimeout(speak, 18600, "Blockage of pleural cavity detected");
    setTimeout(speak, 21500, "Initiating Magnetic restructuralization");
    setTimeout(function(){fixingSound.play()}, 27000);
    setTimeout(speak, 31000, "Body recovery");
    setTimeout(speak, 32000, "Complete");
    setTimeout(nextAction, 34000);
    character.health = 100;
  }
	
	function nextAction(){
    speak(character.name+","+"I am now updating your retina monitor software. Please wait");
    setTimeout(updateStats, 5000);
    // Next stuff gets here
  }
	
	function speak(message, speed = 0.9){
    systemVoice.setRate(speed);
    systemVoice.speak(message);
  } 

	function updateStats(){
    image(wallPaper, 0, 0, width,height);
    fill(255);
    textSize(19);
    textAlign(LEFT);
    text("Oxygen: " + character.oxygen,50,height-50);
    text("Energy: " + character.energy,50,height-100);
    text("Hunger: " + character.hunger,50,height-150);
  	text("Health: " + character.health,50,height-200);
  }
    var slider;

function setup() {
  createCanvas(400, 400);
    slider = createSlider(10,100,20);

}

function draw() {
  background(220);
  
 
}// by NIANQI ZHANG & ZHE WANG
// Please play it in fullscreen of PC

//load content. text. color.sound
let foodcontent = ['蛋 鱼', '粉 肠', '面 仔 公', '球 肉 牛', '仔 蛋 鸡'];
let colorcontent = ['#BBD239', '#39D2C9', '#F39C12', '#D25539', '#EFEF1F'];
let NEONTEXT = [];
let ball = [];


function preload() {
  NeonFont = loadFont('TpldKhangXiDictTrial.otf');
  foodsound[0] = loadSound('fish.mp3');
  foodsound[1] = loadSound('changfen.mp3');
  foodsound[2] = loadSound('gzm.mp3');
  foodsound[3] = loadSound('beef.mp3');
  foodsound[4] = loadSound('egg.mp3');
}


function setup() {

  createCanvas(1440, 686);
  rectMode(CENTER);

  //load background ball into array;
  for (let i = 0; i < 150; i++) {
    ball[i] = new Ball(random(width), random(height), random(5), random(5), random(5, 30));
  }
  
  //load neon text into array
  for (let food = 0; food < foodcontent.length; food++) {
    NEONTEXT[food] = new neontext(100, 150 + food * 100, foodcontent[food], colorcontent[food]);
  }

  //load neon frame into array
  neon = new Neon(defaultneon);

}


function draw() {
	fill(0);
  background(0);
  //show background balls
  for (let q = 0; q < 150; q++) {
    ball[q].bounce();
    ball[q].show();
  }
  
  //light up balls when they collide
   for(q=0;q<150;q++){
  	for(let p =0;p<150;p++){
    	if(ball[q].light(ball[p])&& q!=p){
        ball[q].colorful();
       	ball[q].show();
      }
    }
  }
  
  //parts without interaction 
  cover();
  instruction();
  
  //the button
	button();
  
  //the front neon 
  neon.show();
  neon.flash();

  // the text
  for (let t = 0; t < NEONTEXT.length; t++) {
    if (NEONTEXT[t].inrect()) {
      NEONTEXT[t].returncolor();
      soundnumber = t;
    }

    NEONTEXT[t].drag();
    NEONTEXT[t].show();
		
  }


}let Balls = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++) {
    Balls[i] = new ball(random(width), random(height));
  }
}


function draw() {
  background(220);
  for (let b = 0; b < Balls.length; b++) {
    Balls[b].run();
  }

  for (let i = 0; i < Balls.length; i++) {
    for (let j = i + 1; j < Balls.length; j++) {
      if (Balls[i].cover(Balls[j])) {
        Balls.splice(j, 1);
        Balls.splice(i, 1);
      };
    }
  }

}let Balls = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++) {
    Balls[i] = new ball(random(width), random(height));
  }
}


function draw() {
  background(220);
  for (let b = 0; b < Balls.length; b++) {
    Balls[b].run();

    if (Balls[b].cover(mouseX, mouseY)) {
      Balls.splice(b, 1);}
    }
  }let Balls = [];

function setup() {
  createCanvas(400, 400);
}

function mouseClicked() {
  let Ball = new ball(mouseX, mouseY);
  Balls.push(Ball);
}

function draw() {
  background(220);
  for (let b = 0; b < Balls.length; b++) {
    Balls[b].run();
  }
}let input1;
let input2;
let sum;


function setup() {
  createCanvas(400, 400);
  input1 = createInput();
  input1.position(130, 100);
  input1.changed(returnsum);
  input2 = createInput();
  input2.position(130, 200);
  input2.changed(returnsum);

  let plus = createP("+");
  plus.position(190, 140);

  let equal = createP("=");
  equal.position(190, 230);

  sum = createP('sum');
  sum.position(190, 280);


}

function draw() {
  background(220);

}

function add(num1, num2) {

 return float(num1) + float(num2);

}


function returnsum() {
  sum.html(add(input1.value(),input2.value()));
 // sum.html(add(input1.value(),input2.value()));

}var bgcolor;
var button;

function setup() {
  canvers = createCanvas(200, 200);
  bgcolor = color(200);
  button = createButton("fuxk");
  button.mousePressed(changeColor);

}

function changeColor() {
  bgcolor = color(random(255));
}
// function mousePressed() {
//   bgcolor = color(random(255,0));
// }

function draw() {
  background(bgcolor);
  fill(255, 0, 175);
  rect(100, 100, 15, 15);
}var canvers;
var h1;
var x=100;
var y=100;

function setup() {
  canvers=createCanvas(200, 200);
  canvers.position(400,500);
  h1=createElement("h1","look at it");
  //h1.position(400,600);
  
}

function mousePressed() {
  h1.html("im coming");
  createP("mine is yours"+ random(0,13));
}

function draw() {
  background(200);
  fill(255, 0, 0);
  h1.position(x,y);
  rect(x, y, 15, 15);
  x=x+random(-5,5);

}let ball = [];
let i;


function setup() {
  createCanvas(400, 400);
  //ball1 = new Ball(50, height / 2, 50, 10, 10);
  for (i = 0;i < 100;i++) {
    ball[i] = new Ball(random(width), random(height), random(-10, 10), random(10), random(2));
  }
}

function draw() {
  background(220);
  for (i = 0;i < 100; i++) {
    ball[i].run();
  }
}

class Ball {
  constructor(x, y, size, speedx, speedy) {
    this.x = x;
    this.y = y;
    this.r = size;
    this.xs = speedx;
    this.ys = speedy;
  }

  run() {
    ball[i].show();
    ball[i].move();
    ball[i].bounce();
  }

  show() {
    ellipse(this.x, this.y, this.r);
  }

  move() {
    this.x += this.xs;
    this.y += this.ys;
  }

  bounce() {
    if (this.x > width || this.x < 0) {
      this.xs = this.xs * -1;
    }
    if (this.y > height || this.y < 0) {
      this.ys = this.ys * -1;
    }

  }
}let x = 0;
let y = 0;
let w = 40;
let h = 80;
let shade = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  for (let col = 0; col <= 10; col++) {
    for (let row = 0; row <= 5; row++) {
      x = 0 + col * 40;
      y = 0 + row * 80;
      fill('white')
      rect(x, y, w, h);
      if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
        shade = map(mouseX, 0, width, 100, 255);
        fill(shade);
        rect(x, y, w, h);
      } else {
        noFill()
      }
    }
  }
}let NeonFont;
let neon;
let foodsound = [];
let playsound = false;
let soundnumber;
let BUTTON;
let defualtB = '#374054';

function preload() {
  NeonFont = loadFont('TpldKhangXiDictTrial.otf');
  foodsound[0] = loadSound('fish.mp3');
  foodsound[1] = loadSound('changfen.mp3');
  foodsound[2] = loadSound('gzm.mp3');
  foodsound[3] = loadSound('beef.mp3');
  foodsound[4] = loadSound('egg.mp3');
}

let foodcontent = ['蛋 鱼', '粉 肠', '面 仔 公', '球 肉 牛', '仔 蛋 鸡'];
let colorcontent = ['#BBD239', '#39D2C9', '#F39C12', '#D25539', '#EFEF1F'];
let NEONTEXT = [];
let colorblink = false;
let defaultneon = '#374054';


function setup() {

  createCanvas(1440, 686);
  for (let food = 0; food < foodcontent.length; food++) {
    NEONTEXT[food] = new neontext(100, 150 + food * 100, foodcontent[food], colorcontent[food]);
  }
  neon = new Neon(defaultneon);
  //frameRate(5);
}

function mouseClicked() {
  if (dist(mouseX, mouseY, width / 2, height / 2 + 150) < 40) {
    foodsound[soundnumber].setVolume(0.1);
    foodsound[soundnumber].play();
    defualtB = colorcontent[soundnumber];
    //print('yes');
  }
}


function draw() {

  background(0);
  rectMode(CENTER);

  button();

  neon.show();
  neon.flash();

  for (let t = 0; t < NEONTEXT.length; t++) {
    if (NEONTEXT[t].inrect()) {
      var cneon = [NEONTEXT[t].returncolor(), '#374054']
      defaultneon = random(cneon);
      soundnumber = t;
    }

    NEONTEXT[t].drag();
    NEONTEXT[t].show();
    instruction();
  }

  function button() {
    noFill();
    stroke(defualtB);
    rect(width / 2, height / 2 + 150, 80, 40);
    fill(defualtB);
    noStroke();
    textSize(12);
    text('PLAY', width / 2 - 18, height / 2 + 148);
    text('SOUND', width / 2 - 22, height / 2 + 159);
  }
}let NeonFont;
let neon;
let foodsound = [];
let playsound = false;

function preload() {
  NeonFont = loadFont('TpldKhangXiDictTrial.otf');
  foodsound[0] = loadSound('fish.mp3');
  foodsound[1] = loadSound('changfen.mp3');
  foodsound[2] = loadSound('gzm.mp3');
  foodsound[3] = loadSound('beef.mp3');
  foodsound[4] = loadSound('egg.mp3');
}



let foodcontent = ['鱼 蛋', '肠 粉', '公 仔 面', '牛 肉 球', '鸡 蛋 仔'];
let colorcontent = ['#BBD239', '#39D2C9', '#F39C12', '#D25539', '#EFEF1F'];
let NEONTEXT = [];
let colorblink = false;
let defaultneon = '#374054';



function setup() {
  
  createCanvas(windowWidth, windowHeight);
  for (let food = 0; food < foodcontent.length; food++) {
    NEONTEXT[food] = new neontext(100, 150+food*100, foodcontent[food], colorcontent[food]);
  }
	neon = new Neon(defaultneon);
  
  //frameRate(5);
}

function draw() {
  
  if(playsound){
  //foodsound[1].playMode('sustain');
  foodsound[1].setVolume(0.1);
  foodsound[1].play();
  }
    
  background(0);
  rectMode(CENTER);
 	neon.show();
  neon.flash();
  
  
  for (let t=0;t<NEONTEXT.length;t++) {
    if(NEONTEXT[t].inrect()){
      var cneon = [NEONTEXT[t].returncolor(),'#374054']
      defaultneon = random(cneon);
    	playsound = true;
    }
    else{
    	playsound =false;
    }
    //else defaultneon = '#4f7df6';
    
    NEONTEXT[t].drag();
    NEONTEXT[t].show();
    
    instruction();
  }
  
  //if(playsound){
    	//foodsound[soundnumber].playMode('sustain');
      //foodsound[1].setVolume(0.1);
  		//foodsound[1].play();
    //}
  
}let NeonFont;
let neon;
function preload() {
  NeonFont = loadFont('TpldKhangXiDictTrial.otf');
}

let foodcontent = ['鱼 蛋', '肠 粉', '公 仔 面', '牛 肉 球', '鸡 蛋 仔'];
let colorcontent = ['#BBD239', '#39D2C9', '#F39C12', '#D25539', '#EFEF1F'];
let NEONTEXT = [];
let colorblink = false;
let defaultneon = '#374054';



function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let food = 0; food < foodcontent.length; food++) {
    NEONTEXT[food] = new neontext(100, 150+food*100, foodcontent[food], colorcontent[food]);
  }
	neon = new Neon(defaultneon);
  
  //frameRate(5);
}

function draw() {
  background(0);
  rectMode(CENTER);
 	neon.show();
  neon.flash();
  
  
  for (let t=0;t<NEONTEXT.length;t++) {
    if(NEONTEXT[t].inrect()){
      var cneon = [NEONTEXT[t].returncolor(),'#374054']
     defaultneon = random(cneon);
    }
    //else defaultneon = '#4f7df6';
    
    NEONTEXT[t].drag();
    NEONTEXT[t].show();
    
    instruction();
  }
  
}let neon;
let colorSet = ['#4f7df6', '#374054', '#fdbde0','#f9eb8a'];
//light bule ; dark bule; 

function setup() {
  createCanvas(600, 500);
  frameRate(5);
  
}

function draw() {
  background(0);
  neon = new Neon();
  neon.show();
  neon.flash();
  
  fill('#f32933');
  textFont(NeonFont);
  stroke(colorSet[floor(random(2, 4))]);
  strokeWeight(3);
  textSize(40);
  text('The flavor of today ', 110, 265);
  fill('#60bc50');
  textFont(NeonFont);
  stroke(colorSet[floor(random(1, 3))]);
  strokeWeight(2);
  textSize(18);
  text('',191,300);

  }


function preload(){
 NeonFont = loadFont('TpldKhangXiDictTrial.otf');
}
class Neon {
  constructor(neonX, neonY, neonW, neonH) {
    this.x = neonX;
    this.y = neonY;
    this.w = neonW;
    this.h = neonH;
  }

  show() {
    rectMode(CENTER);
    stroke(colorSet[0]);
    strokeWeight(4);
    stroke(colorSet[floor(random(0, 2))]);
    noFill();
    rect(width / 2, height / 2, width - 170, height - 280);
  }

  flash() {
    rectMode(CENTER);
    strokeWeight(2);
    stroke(colorSet[1]);
    for (var i = width / 2 - (width - 180) / 2; i < width / 2 + (width - 170) / 2; i += 8) {
      var x = i;
      //var j =
      if (i == (width / 2 - (width - 180) / 2) + 8 * 7 || i == (width / 2 - (width - 180) / 2) + 8 * 8) {
        stroke(colorSet[floor(random(0, 3))]);
      } else {
        stroke(colorSet[1]);
      }
      if (i == (width / 2 - (width - 180) / 2) + 8 * 1 || i == (width / 2 - (width - 180) / 2) + 8 * 2 || i == (width / 2 - (width - 180) / 2) + 8 * 20 || i == (width / 2 - (width - 180) / 2) + 8 * 41 || i == (width / 2 - (width - 180) / 2) + 8 * 32) {
        stroke(colorSet[2]);
      }
      if (i == (width / 2 - (width - 180) / 2) + 8 * 50) {
        stroke(colorSet[floor(random(0, 3))]);
      }
      if (i == (width / 2 - (width - 180) / 2) + 8 * 40 || i == (width / 2 - (width - 180) / 2) + 8 * 42 || i == (width / 2 - (width - 180) / 2) + 8 * 43 || i == (width / 2 - (width - 180) / 2) + 8 * 44) {
        stroke(colorSet[0]);
      }
      line(x, height / 2 - (height - 286) / 2, x, height / 2 + (height - 284) / 2);
    }
  }

}var nums = [100, 25, 46, 72];
// var index = 0;


function setup() {
  createCanvas(500, 400);
}

function draw() {
  background(0);
  for (var i = 0; i < 4; i++) {
    ellipse(i * 100 + 100, 200, nums[i], nums[i]);


  }

  // ellipse(100, 200, nums[0], nums[0]);
  // ellipse(200, 200, nums[1], nums[1]);
  // ellipse(300, 200, nums[2], nums[2]);
  // ellipse(400, 200, nums[3], nums[3]);

}

// function mousePressed() {
//   index += 1;
//   if (index == words.length) {
//     index = 0;
//   }let bubble1;
let bubble2;

function setup() {
  createCanvas(600, 400);
  bubble1 = new Bubble(200, 200, 40);// it will equal to construstor
  bubble2 = new Bubble(200, 200, 20);
}

function draw() {
  background(220);
  bubble1.move();
  bubble1.show();
  bubble2.move();
  bubble2.show();
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  show() {
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
  }
}let ball1;
let ball2;


function setup() {
  createCanvas(600, 400);
  ball1 = new Ball();
  ball2 = new Ball();
}

function draw() {
  background(0);
  ball1.bounce();
  ball1.show();
  ball2.bounce();
  ball2.show();
}

class Ball {
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.x1 = 5;
    this.y1 = 5;
  }

  bounce() {
    this.x += this.x1// this.x = this.x + this.x1
    this.y += this.y1// this.y = this.y + this.y1
    if (this.x > width || this.x < 0) {
      this.x1 = -this.x1 
    }
    if (this.y > height || this.y < 0) {
      this.y1 = -this.y1
    }
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, 24, 24);
  }
}
let ball;

function setup() {
  createCanvas(600, 400);
  ball = new Ball();
}

function draw() {
  background(0);
  ball.bounce();
  ball.show();
}

class Ball {
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.x1 = 5;
    this.y1 = 5;
  }

  bounce() {
    this.x += this.x1// this.x = this.x + this.x1
    this.y += this.y1// this.y = this.y + this.y1
    if (this.x > width || this.x < 0) {
      this.x1 = -this.x1 
    }
    if (this.y > height || this.y < 0) {
      this.y1 = -this.y1
    }
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, 24, 24);
  }
}
var x = 0; 
var speed = 10;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(x,height/2,50,50);
  x+=speed;
  if(x>width || x<0){
    speed*=-1;
  }
}let numRows;
let numCols;
let colW;
let colH;

function setup() {
  createCanvas(400, 400);
  numCols = 50;
  numRows = numCols;
  colW = width / numCols;
  rowH = height / numRows;
}

function draw() {
  background(220);
  noStroke();
  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      // if ((col % 2 == 1 && row % 2 == 1) || (col % 2 == 0 && row % 2 == 0))
      //   fill("black");
      // else fill("white");
      let x = col * colW
      let y = row * rowH
      let d= dist(mouseX, mouseY,x,y);
      d = map(d,0,dist(0,0,width,height),255,0);
      fill(d);
      rect(x, y, colW, rowH);
    }
  }
}var x = 0;
var y = 0;
var r = 60; //radius
var s = 10; //framerate
var bright0 = 0;
var refresh = false;

function setup() {
  createCanvas(600, 700);
  noStroke();
  for (i = 0; i < 30; i++) {              //drawthebackgroud
    drawBG();
  }
}

function draw() {
  noStroke();
  frameRate(s);
  if (refresh) {
    drawcycle()
    x += r;
    if (x > windowWidth - r / 2) {
      y += r;
      x = 0;
    }
    if (y >= 600 - r / 2) {
      y = 0
    }
  }

  if (mouseIsPressed) {
    if (mouseX > 0 && mouseX < 300 && mouseY < 600) {
      for (y = 0; y < windowHeight; y += r) {
        for (x = 0; x < 300; x += r) {
          drawcycle()
        }
      }
    }
    if (mouseX > 300 && mouseX < 600 && mouseY < 600) {
      for (y = 0; y < windowHeight; y += r) {
        for (x = 300; x < 600; x += r) {
          drawcycle()
        }
      }
    }
  }


  if (mouseX > 225 && mouseX < 375 && mouseY > 625 && mouseY < 675) { //button
    bright0 = 180;
  } else {
    bright0 = 255;
  }

  //bright0 = bright0 + 10;
  noStroke();
  fill(237, 236, 218);
  rect(0, 600, 600, 100);
  fill(73, 73, 73, bright0);
  rect(225, 625, 150, 50);
  noFill();
  strokeWeight(2);
  stroke(73, 73, 73);
  rect(225, 625, 150, 50); // button
}

function mousePressed() {
  if (mouseX > 225 && mouseX < 375 && mouseY > 625 && mouseY < 675) {
    fill(73, 73, 73);
    rect(225, 625, 150, 50);
    refresh = !refresh;
  }
}

function chooseColor() {
  if (random(1) > 0.75) {
    fill(237, 236, 218);
  } else if (random(1) > 0.5 && random(1) < 0.75) {
    fill(129, 197, 174);
  } else if (random(1) > 0.25 && random(1) < 0.5) {
    fill(73, 73, 73);
  } else {
    fill(229, 106, 95);
  }
}

function drawcycle() {
  if (random(1) > 0.5) {
    chooseColor()
    arc(x + r / 2, y, r, r, 0, PI, CHORD);
    chooseColor()
    arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
  } else {
    chooseColor()
    arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
    chooseColor()
    arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
  }
}

function drawBG() {
  for (y = 0; y < 600; y += r) {
    for (x = 0; x < windowWidth; x += r) {
      drawcycle()
    }
  }
}var x = 0
var y = 0
var r = 60 //radius
var s = 10 //framerate

function setup() {
  createCanvas(600, 600);
  noStroke()
  for (i = 0; i < 30; i++) { //drawthebackgroud
    drawBG();
  }
}

function draw() {
  noStroke();
  frameRate(s);

  //top 
  if (mouseIsPressed) {
    if (mouseX > 0 && mouseX < 300) {
      for (y = 0; y < windowHeight ; y += r) {
        for (x = 0; x < 300; x += r) {
          if (random(1) > 0.5) {
            chooseColor()
            arc(x + r / 2, y, r, r, 0, PI, CHORD);
            chooseColor()
            arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
          } else {
            chooseColor()
            arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
            chooseColor()
            arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
          }
        }
      }
    }
    if (mouseX > 300 && mouseX < 600) {
      for (y = 0; y < windowHeight ; y += r) {
        for (x = 300; x < 600; x += r) {
          if (random(1) > 0.5) {
            chooseColor()
            arc(x + r / 2, y, r, r, 0, PI, CHORD);
            chooseColor()
            arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
          } else {
            chooseColor()
            arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
            chooseColor()
            arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
          }
        }
      }
    }
  
  }

  //  if (random(1) > 0.5) {
  //   chooseColor()
  //   arc(x + r / 2, y, r, r, 0, PI, CHORD);
  //   chooseColor()
  //   arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
  // } else {
  //   chooseColor()
  //   arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
  //   chooseColor()
  //   arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
  // }
  //   x = x + r;


  //   if (x > windowWidth - r / 2) {
  //     y = y + r;
  //     x = 0 ;
  //   }
  //   if (y > windowHeight - r / 2) {
  //     y = 0;
  //   }
}

function chooseColor() {
  if (random(1) > 0.75) {
    fill(237, 236, 218);
  } else if (random(1) > 0.5 && random(1) < 0.75) {
    fill(129, 197, 174);
  } else if (random(1) > 0.25 && random(1) < 0.5) {
    fill(73, 73, 73)
  } else {
    fill(229, 106, 95)
  }
}

function drawBG() {
  for (y = 0; y < windowHeight; y += r) {
    for (x = 0; x < windowWidth; x += r) {
      if (random(1) > 0.5) {
        chooseColor()
        arc(x + r / 2, y, r, r, 0, PI, CHORD);
        chooseColor()
        arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
      } else {
        chooseColor()
        arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
        chooseColor()
        arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
      }
    }
  }
}var x = 0;
var y = 0;
var r = 60; //radius
var s = 10; //framerate
var bright0 = 0;
var refresh = false;

function setup() {
  createCanvas(600, 700);
  noStroke();
  for (i = 0; i < 30; i++) { //drawthebackgroud
    //drawBG();
  }
}

function draw() {
  noStroke();
  frameRate(s);
  if (refresh) {
    if (random(1) > 0.5) {
      chooseColor();
      arc(x + r / 2, y, r, r, 0, PI, CHORD);
      chooseColor();
      arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
    } else {
      chooseColor();
      arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
      chooseColor();
      arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
    }
    x += r;
    if (x > windowWidth - r / 2) {
      y += r;
      x = 0;
    }
    if (y >= 600 - r / 2) {
      y = 0
    }
  }

  if (mouseX > 225 && mouseX < 375 && mouseY > 625 && mouseY < 675) { //button
    bright0 = 180;
  } else {
    bright0 = 255;
  }

  //bright0 = bright0 + 10;
  noStroke();
  fill(237, 236, 218);
  rect(0, 600, 600, 100);
  fill(73, 73, 73, bright0);
  rect(225, 625, 150, 50);
  noFill();
  strokeWeight(2);
  stroke(73, 73, 73);
  rect(225, 625, 150, 50); // button
}

function mousePressed() {
  if (mouseX > 225 && mouseX < 375 && mouseY > 625 && mouseY < 675) {
  fill(73, 73, 73);
  rect(225, 625, 150, 50);
    refresh = !refresh;
  }
}

function chooseColor() {
  if (random(1) > 0.75) {
    fill(237, 236, 218);
  } else if (random(1) > 0.5 && random(1) < 0.75) {
    fill(129, 197, 174);
  } else if (random(1) > 0.25 && random(1) < 0.5) {
    fill(73, 73, 73);
  } else {
    fill(229, 106, 95);
  }
}

function drawBG() {
  for (y = 0; y < 600; y += r) {
    for (x = 0; x < windowWidth; x += r) {
      if (random(1) > 0.5) {
        chooseColor();
        arc(x + r / 2, y, r, r, 0, PI, CHORD);
        chooseColor();
        arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
      } else {
        chooseColor();
        arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
        chooseColor();
        arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
      }
    }
  }
}var x = 0
var y = 0
var r = 60 //radius
var s = 15 //framerate

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke()
  for (i = 0; i < 30; i++) { //drawthebackgroud
    //drawBG();
  }
}

function draw() {
  noStroke();
  frameRate(s);

  // //left
  // if (mouseIsPressed) {
  //   if (mouseX > 0 && mouseX < windowWidth / 2 && mouseY > 0 && mouseY < windowHeight) {
  //     for (y = 0; y < windowHeight ; y += r) {
  //       for (x = 0; x < windowWidth / 2; x += r) {
  //         if (random(1) > 0.5) {
  //           chooseColor()
  //           arc(x + r / 2, y, r, r, 0, PI, CHORD);
  //           chooseColor()
  //           arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
  //         } else {
  //           chooseColor()
  //           arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
  //           chooseColor()
  //           arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
  //         }
  //       }
  //     }
  //   }
  //   //right
  //   if (mouseX > windowWidth / 2 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
  //     for (y = 0; y < windowHeight ; y += r) {
  //       for (x = windowWidth / 2; x < 2*(windowWidth/2); x += r) {
  //         if (random(1) > 0.5) {
  //           chooseColor()
  //           arc(x + r / 2, y, r, r, 0, PI, CHORD);
  //           chooseColor()
  //           arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
  //         } else {
  //           chooseColor()
  //           arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
  //           chooseColor()
  //           arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
  //         }
  //       }
  //     }
  //   }
  // }

   if (random(1) > 0.5) {
    chooseColor()
    arc(x + r / 2, y, r, r, 0, PI, CHORD);
    chooseColor()
    arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
  } else {
    chooseColor()
    arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
    chooseColor()
    arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
  }
    x = x + r;


    if (x > windowWidth - r / 2) {
      y = y + r;
      x = 0 ;
    }
    if (y > windowHeight - r / 2) {
      y = 0;
    }
}

function chooseColor() {
  if (random(1) > 0.75) {
    fill(237, 236, 218);
  } else if (random(1) > 0.5 && random(1) < 0.75) {
    fill(129, 197, 174);
  } else if (random(1) > 0.25 && random(1) < 0.5) {
    fill(73, 73, 73)
  } else {
    fill(229, 106, 95)
  }
}

function drawBG() {
  for (y = 0; y < windowHeight; y += r) {
    for (x = 0; x < windowWidth; x += r) {
      if (random(1) > 0.5) {
        chooseColor()
        arc(x + r / 2, y, r, r, 0, PI, CHORD);
        chooseColor()
        arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
      } else {
        chooseColor()
        arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
        chooseColor()
        arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
      }
    }
  }
}var x = 0
var y = 0
var r = 60 //radius
var s = 10 //framerate

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke()
  for (i = 0; i < 30; i++) { //drawthebackgroud
    drawBG();
  }
}

function draw() {
  noStroke();
  frameRate(s);

  //top 
  if (mouseIsPressed) {
    if (mouseX > 0 && mouseX < windowWidth / 2 && mouseY > 0 && mouseY < windowHeight) {
      for (y = 0; y < windowHeight ; y += r) {
        for (x = 0; x < windowWidth / 2; x += r) {
          if (random(1) > 0.5) {
            chooseColor()
            arc(x + r / 2, y, r, r, 0, PI, CHORD);
            chooseColor()
            arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
          } else {
            chooseColor()
            arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
            chooseColor()
            arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
          }
        }
      }
    }
    if (mouseX > windowWidth / 2 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
      for (y = 0; y < windowHeight ; y += r) {
        for (x = windowWidth / 2; x < windowWidth; x += r) {
          if (random(1) > 0.5) {
            chooseColor()
            arc(x + r / 2, y, r, r, 0, PI, CHORD);
            chooseColor()
            arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
          } else {
            chooseColor()
            arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
            chooseColor()
            arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
          }
        }
      }
    }
  
  }

  //  if (random(1) > 0.5) {
  //   chooseColor()
  //   arc(x + r / 2, y, r, r, 0, PI, CHORD);
  //   chooseColor()
  //   arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
  // } else {
  //   chooseColor()
  //   arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
  //   chooseColor()
  //   arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
  // }
  //   x = x + r;


  //   if (x > windowWidth - r / 2) {
  //     y = y + r;
  //     x = 0 ;
  //   }
  //   if (y > windowHeight - r / 2) {
  //     y = 0;
  //   }
}

function chooseColor() {
  if (random(1) > 0.75) {
    fill(237, 236, 218);
  } else if (random(1) > 0.5 && random(1) < 0.75) {
    fill(129, 197, 174);
  } else if (random(1) > 0.25 && random(1) < 0.5) {
    fill(73, 73, 73)
  } else {
    fill(229, 106, 95)
  }
}

function drawBG() {
  for (y = 0; y < windowHeight; y += r) {
    for (x = 0; x < windowWidth; x += r) {
      if (random(1) > 0.5) {
        chooseColor()
        arc(x + r / 2, y, r, r, 0, PI, CHORD);
        chooseColor()
        arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
      } else {
        chooseColor()
        arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
        chooseColor()
        arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
      }
    }
  }
}function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220);
  for(var i =0 ; i < 10; i++) {
    for(var c =0 ; c < 10; c++) {
  var x = i * 50;
  var y = c * 50;
    if((i+c) % 2 == 0) {
      fill("black");
      rect(x,y,50,50);
     } else{
      fill("white");
      rect(x,y,50,50);
      }
    }
  }
}function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220);
  for(var i =0 ; i < 10; i++) {
    for(var c =0 ; c < 10; c++) {
  var x = i * 50;
  var y = c * 50;
    if((i+c) % 2 == 0);{
      fill("black");
      rect(x,y,50,50);
     } else {
      fill("white");
      rect(x,y,50,50);
    }
    }
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  for (var i = 0; i < width; i++) {
    var x = i * width / 10;
    noFill();
    rect(x, 0, width / 10, height);

    if (mouseX > x && mouseX < x + width / 10) {
      fill(229,106,i*25);
      rect(x, 0, width / 10, height);
    }
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  for (var i = 0; i < width; i++) {
    var x = i * width / 10;
    noFill();
    rect(x, 0, width / 10, height);

    if (mouseX > x && mouseX < x + width / 10) {
      if (i%2 == 0) {
        fill('blue');
        rect(x, 0, width / 10, height);
      } else {
        fill('red');
        rect(x, 0, width / 10, height);
      }
    }
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  for (var i = 0; i < width; i++) {
    var x = i * width / 10;
    noFill();
    rect(x, 0, width / 10, height);

    if (mouseX > x && mouseX < x + width / 10) {
      fill('red');
      rect(x, 0, width / 10, height);
    }
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  for (var i = 0; i < width; i++) {
    var x = i * width / 10;
    noFill();
    rect(x, 0, width / 10, height);

    if (mouseX > x && mouseX < x + width / 10) {
      if (i == 6) {
        fill(220);
        rect(x, 0, width / 10, height)
      } else
        fill('red');
      rect(x, 0, width / 10, height);
    }
    }
  }function setup() {
  createCanvas(500, 500);
  frameRate(1);
}

function draw() {
  background(237,236,218);
  for (var i = 0; i < 11; i++) {
    for (var e = 0; e < 11; e++) {
      var x = i * 50;
      var y = e * 50
      rect(x, y, 50, 50);
    
      var color1 = [237,236,218]; 
      var color2 = [129,197,174];
      var color3 = [229,106,95];
      var color4 = [91,69,67];
      
      var colorSet = [color1, color2, color3, color4];
      
      //var chosenchild = colorSet[floor(random(0,4))];
      //console.log(floor(random(0,4)));
      //console.log(colorSet[0][1]);
      
      // var r=random(200,255);
      // var g=random(200,255);
      // var b=random(200,255);
    
    noStroke()
    fill (colorSet[floor(random(0,4))]);
    arc (x-25,y,50,50,0,PI,CHORD);
    fill (colorSet[floor(random(0,4))]);
    arc (x,y+25,50,50,PI + HALF_PI,HALF_PI,CHORD);
    fill (colorSet[floor(random(0,4))]);
    arc (x+50,y+25,50,50,HALF_PI,PI + HALF_PI,CHORD);
    fill (colorSet[floor(random(0,4))]);
    arc (x-25,y,50,50,PI,0,CHORD);
    }
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  for(var i=0; i<width; i++){
    var x = i * width/10;
    noFill();
    rect(x,0, width/10, height);
    
    if(mouseX>x && mouseX < (x + width/10)){
      if(i < 5){
      fill('blue');
      rect(x, 0, width/10, height);}
      else{
     fill('red');
    rect(x, 0, width/10, height);
    }  
  }
  }
}function setup() {
  createCanvas(600, 600);
}

// function draw() {
//   background(220);
  
//   if(mouseX>0 && mouseX< width/3){  
//     rect(0, 0 ,width/3, height);
//       }
  
//   if(mouseX>width/3 && mouseX<2*width/3){ 
//     fill("red");
//     rect(width/3, 0 ,width/3, height);
//      }
  
//   if(mouseX>2*width/3 && mouseX<width){
//     fill("red");
//     rect(2*width/3, 0 , width/3, height);
//   }
// }

function draw() {
  background(220);
 
  if(mouseX > (2*width)/3){
    fill("red")
    rect(2*width/3, 0 , width/3, height);
}
  else if(mouseX > width/3){
    fill("red")
    rect(width/3, 0 , width/3, height);
} else{
    fill("red");
    rect(0, 0 , width/3, height); 
}
}
let x = 0;
let y = 0;
let xSpeed = 5;
let ySpeed = 5;

function setup() {
  createCanvas(400, 400);
}

function drwa() {
  background(220);
  bounce();
  //move the ball
  x = x + xSpeed; //x+=xSpeed
  y += ySpeed;
  //drwa the ball
  ellipse(x, 200, 50, 50);
}

function bounce() {
  if (x > width || x < 0) xSpeed = xSpeed * -1; //xSpeed*=-1
  if (y > height || y < 0) ySpeed = ySpeed * -1;
}let x
let xspeed = 10;

function setup() {
  createCanvas(400, 400);
  x = 0;
}

function draw() {
  background(220);
  ellipse(x,height/2,50,50);
  x+=xspeed;
  
  if(x>width||x<0)xspeed *=-1;
  
}let leftLsOn= red

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  if (mouseX > 0 && mouseX < width / 3) {
    fill(255, 0, 0)
    rect(0, 0, width / 3, height);
  }

 else if (mouseX > width / 3 && mouseX < 2 * width / 3) {
    fill(255, 0, 0)
    rect(width / 3, 0, width / 3, height);
  }

 else  {
    fill(255, 0, 0)
    rect(2 * width / 3, 0, width / 3, height);
  }

function mousePressed(){
//toggle the state if the left panel
LeftIsON = !LeftIsON
}
}



//for (x=0,x<=width;x += )let x = 200;
let y = 200;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  ellipse(x,y,30,30);
  
  //from the middle to right
    x = x + 2;
 
  //form the middle to left
  //x = x - 2
 
  //Towards each of the 4 corners
  //top left
  // x = x - 1
  // y = y - 1
  
  //top right
  // x = x + 1
  // y = y - 1
  
  //bottom left
  //x = x - 1
  //y = y + 1
  
  //bottom right
  // x = x + 1
  // y = y + 1
  
  //10 times faster
  //x = x + 10
  
  
}

let x,y;
let x1,x2,y1,y2;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER)
  x =  width/2;
  y =  height/2;
  
  x1 = width/4
  y1 = height/4
  x2 = width/4 + width/2
  y2 = height/4 + height/2
}

function draw() {
  
  background(220);
  rect(x,y,x,y);
  
  strokeWeight(2)
  beginShape();
  vertex(x1,y1);
  vertex(x2,y1);
  vertex(x2,y2);
  vertex(x1,y2);
  endShape(CLOSE);
  
  
}
var r = 0;
var b = 255; 
let x = 0;
let y = 0;


function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255,237,225);
 
  //planet center
  //ellipse(width/2,height/2,300,100);
  fill(169,221,214);
  stroke(169,221,214);
  // r = map(sin(frameCount/100),-1,1,0,255);
  // b = map(sin(frameCount/100),-1,1,255,0);
  strokeWeight(2);
  ellipse(width/2,height/2,80,80);
   
  //orbit
  noFill();
  stroke(193,184,200);
  r = map(sin(frameCount/100),-1,1,0,255);
  b = map(sin(frameCount/100),-1,1,255,0);

  //planets
  push();
  stroke(169,221,214);
  ellipse(width/2,height/2,120,120);
  translate(width/2,height/2);
  translate(p5.Vector.fromAngle(millis() / 800, 60));
  fill(169,221,214);
  stroke(220);
  ellipse(0,0,10,10);
 	pop();
  
  push();
  stroke(122,139,153);
  ellipse(width/2,height/2,160,160);
  translate(width/2,height/2);
  translate(p5.Vector.fromAngle(millis() / 800, 80));
  fill(122,139,153);
  stroke(220);
  ellipse(0,0,18,18);
 	pop();

  push();
  stroke(145,173,194);
  ellipse(width/2,height/2,250,250)
  translate(width/2,height/2);
  translate(p5.Vector.fromAngle(millis() / 1200, 125));
  fill(145,173,194);
  ellipse(0,0,12,12);
  pop();
  
  push();
  stroke(155,160,168);
  ellipse(width/2,height/2,300,300);
  translate(width/2,height/2);
  translate(p5.Vector.fromAngle(millis() / 500, 150));
  fill(155,160,168);
  stroke(220);
  ellipse(0,0,20,20);
  pop();
  
  push();
  stroke(155,160,168);
  ellipse(width/2,height/2,450,450)
  translate(width/2,height/2);
  translate(p5.Vector.fromAngle(millis() / 700, 225));
  fill(155,160,168);
  stroke(230);
  ellipse(0,0,10,10);
  pop();
 	
  push();
  stroke(193,184,200);
  ellipse(width/2,height/2,465,465)
  translate(width/2,height/2);
  translate(p5.Vector.fromAngle(millis() / 600, 233));
  fill(193,184,200);
  stroke(230);
  ellipse(0,0,12,12);
  pop();
  
  //mouse
  fill(252,119,83);
  noStroke();
  textSize(9);
  text('Click & Make a Wish : P',mouseX,mouseY);

  //meteors
  push();
  fill(252,119,83);
  stroke(252,119,83);
  ellipse(x, y, 7,7);
  x = x+15;
  y = y+15;
  pop();
}

function mousePressed(){
  
	x = random(0,600);
  y = random(0,600);
}
   
function setup() {
  createCanvas(600, 400);
  background(250,250,100);
}

function draw() {
  noStroke();
  fill(250,200,200,50);
  ellipse(mouseX,mouseY,25,25);
}

function mousePressed() { 
  background(250,250,100);
  // once click the mouse, the bcakgound change
}let x = 0;
let y = 0;
function setup() {
  createCanvas(400, 400);
	x= width/2
  y= height/2 //define center
}

function draw() {
  background(220);
  x= x +1;
  y= y -1;
	ellipse(x,y,50,50);
	
}function setup() {
  createCanvas(400, 300); 
}

function draw() {
  background(0,255,255);
  
  stroke(255,0,0);
  strokeWeight(25)
  line(0,0,400,300);
  
  fill(0,200,0);
  noStroke();
  ellipse(200,150,200,150);
  
  fill(0,0,255);
  noStroke();
  rect(270,120,30,30);
  
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(225);
 
  //eyes
  stroke(1);
  arc(229,158,15,15,QUARTER_PI,0);
  curve(200,170,202,160,230,150,250,170);
  curve(200,180,200,160,220,165,250,160);
  curve(255,182,255,158,220,165,180,135);
  
  //eyebrow
  quad(200,130,255,120,260,127,198,134);
  
  //nose
  noFill();
  stroke(25);
  curve(195,230,180,232,190,233,200,228);
  curve(160,180,165,160,168,170,160,170);
  arc(190, 220, 20, 20, 0 , QUARTER_PI);
  arc(180, 225, 20, 30, PI, PI+PI/6);
  beginShape();
  curveVertex(221,100);
  curveVertex(220,150);
  curveVertex(210,160); 
  curveVertex(200,170);
  curveVertex(195,210);
  curveVertex(195,215); 
  curveVertex(200,220);
  endShape();

  //mouth
  noFill();
  stroke(25);
  line(177,255,184,258);
  line(184,258,193,255);
  
  beginShape();
  curveVertex(150,260);
  curveVertex(160,266);
  curveVertex(181,270);
  curveVertex(184,282);
  endShape();
  
  beginShape();
  curveVertex(184,282);
  curveVertex(190,270);
  curveVertex(200,266);
  curveVertex(220,260);
  curveVertex(230,260);
  endShape();

  line(159,266,167,263);
  line(159,266,165,270);
  line(218,260,213,258);
  line(218,260,210,268);
  
  
  arc(187,277,30,10,0,PI);
  arc(187,290,8,3,PI,0);
  fill(190)
  noStroke();
  arc(230,255,14,28,11,QUARTER_PI);
  stroke(1);
  arc(229,255,9,20,11,QUARTER_PI);
  
   //face
  stroke(1);
  noFill();
  beginShape();
  // curveVertex(88,55);
  // curveVertex(88,60);
  curveVertex(88,80);
  curveVertex(90,125);
  curveVertex(99,230);
  curveVertex(118,280);
  curveVertex(130,300);
  curveVertex(140,320);
  curveVertex(150,330);
  curveVertex(160,335);
  curveVertex(172,338);
  curveVertex(173,340);
  endShape();
  
  beginShape();
  curveVertex(272,225);
  curveVertex(272,225);
  curveVertex(270,245);
  curveVertex(269,255);
  curveVertex(267,265);
  curveVertex(264,270);
  curveVertex(269,280); 
  endShape();
  
  //curve(88,80,88,80,180,88,220,80);
  //curve(180,88,180,88,280,80,230,70);
  //curve(275,70,279,50,280,80,270,80);
  //curve(88,50,88,55,280,50,275,80);
  //curve(276,70,275,25,279,50,270,80);
  //line(279,80,278,100);
  
  // stroke(110);
  // quad(88,80,98,81,95,130,92,140);
  
}
  