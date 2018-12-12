let txt = []; 
let allwords = [];
let counts = {};
let keys = [];
let inp;
let inpval;
let button;
let slider;

let mostUsedWords;
let mostUsedWords2;
let mostUsedWords3;

let littleCircle;
let littleCircle2;
let littleCircle3;

let angleOffset = 0;

let hasMouseBeenPressed = false;

let files = ['Geography.txt', 'Line of Beauty.txt',
             'Math.txt', 'Zodic.txt'];

function preload () {
  for (let i = 0; i< files.length; i++){
  txt [i] = loadStrings (files[i]);
  }
}

function setup() {
  createCanvas(600,400);
  slider = createSlider(1, 10, 1);
  slider.position(500, 400);
  slider.style('width', '100px');
  
  for (let i = 0; i< txt.length; i++){
    allwords[i]= txt[i].join("\n");
  }

  inp = createInput();
  button = createButton('submit');
  button.mousePressed(counting);

  function counting() {

    inpval = inp.value();
    //console.log(inpval);
    //let allwords = inpval.join("\n");
    //console.log(allwords);
    let tokens = inpval.split(/\W+/); //capital W

    //console.log(tokens);

    for (let i = 0; i < tokens.length; i++) {
      let word = tokens[i].toLowerCase();
      if (!/\d+/.test(word)) {

        if (counts[word] === undefined) {
          counts[word] = {
            tf:1,
            df:1
          };
          keys.push(word);
        } else {
          counts[word].tf = counts[word].tf + 1;
        }

      }

    }

    //console.log(counts);
    
    
    let othercounts = [];
    for (let j = 0; j < allwords.length; j++){
      let tempcounts = {};
      let tokens = allwords[j].split (/\W+/);
      for (let k = 0; k<tokens.length; k++){
        let tempword = tokens[k].toLowerCase();
        if (tempcounts[tempword] === undefined) {
          tempcounts[tempword] = true;
        }
      }
      othercounts.push(tempcounts);
    }

  for (let i = 0; i < keys.length; i++){
    let word = keys [i];
    for (let j = 0; j < othercounts.length; j++){
      let tempcounts = othercounts[j];
      if (tempcounts [word]) {
      counts[word].df++;
      }
     }
    }
	//?}
   for (let i = 0; i < keys.length; i++){
     let word = keys [i];
     let wordobj = counts[word];
     wordobj.tfidf = wordobj.tf * log (files.length / wordobj.df);
   }


    keys.sort(compare);

    function compare(a, b) {
      let countA = counts[a].tfidf;
      let countB = counts[b].tfidf;
      return countB - countA;
    }

    for (let i = 0; i < keys.length; i++) {

      let key = keys[i];

      //createDiv(key + " " + counts[key].tfidf);
    }

    mostUsedWords = keys.slice(0,10);
    mostUsedWords2 = keys.slice(10,30);
    mostUsedWords3 = keys.slice(30,70);
    console.log(mostUsedWords);

    littleCircle = new Circle(width/2, height/2, 100, 155, mostUsedWords);
    littleCircle2 = new Circle(width/2, height/2, 200, 255, mostUsedWords2);
    littleCircle3 = new Circle(width/2, height/2, 300, 355, mostUsedWords3);

    hasMouseBeenPressed = true;

}

}
  //print(counts);

function draw(){
  background(0);

  if(hasMouseBeenPressed){
    littleCircle.display(width/2, height/2, 100, 155, mostUsedWords);
    littleCircle2.display(width/2, height/2, 200, 255, mostUsedWords2);
    littleCircle3.display(width/2, height/2, 300, 355, mostUsedWords3);
  }

  angleOffset += 0.01;


}let txt;
let counts = {} ;
let keys = [];
let valueArr = [];

function preload () {
  txt = loadStrings ('frankfurtschool.txt');
  img = loadImage('cup.jpg');
 
}


function setup() { 
  createCanvas(600,400);
  let allwords = txt.join("\n");
  let tokens = allwords.split (/\W+/);//capital W
  
  //console.log(tokens);
  
  for (let i=0; i<tokens.length; i++) {
    let word = tokens[i].toLowerCase();
    if (!/\d+/.test(word)) {
    
    if (counts[word]===undefined) {
      counts[word] = 1;
      keys.push(word);
    } else {
    counts[word] = counts[word] + 1;
    }
    
  }
    
  }
  
  //console.log(counts);
  keys.sort (compare);
  
  function compare (a,b) {
    let countA = counts[a];
    let countB = counts[b];
    return countB - countA;
  }
  
  for (let i=0; i< keys.length; i++) {
    let key = keys[i];
    createDiv (key + " " + counts[key]);
    // console.log(counts[key]);
		valueArr.push(counts[key]);
  }
	console.log(valueArr);
     
 
} 


function draw(){
  
  background(255);
  image(img, 0, 0, 600, 400);
  fill(85, 0, 0);
  rect(200, 300, 200, 80, 0, 0, 20, 20);
  fill(128, 21, 21);
  rect(200, 240, 200, 60);
  fill(212, 106, 106);
  rect(200, 200, 200, 40);
  fill(255, 170, 170);
  rect(200, 170, 200, 30);
  fill(255, 204, 204);
  rect(200, 150, 200, 20);
  fill(255,0,0)
	for(let i = 0; i< valueArr.length; i++){
		ellipse(0+i*10,100,valueArr[i]);
	}
  // ellipse(100,100,100*counts[key],100*counts[key]);
  
  
}

// function mousePressed() {
//   if (mouseX>450 && mouseX<525 && mouseY>200 && mouseY<267) {
    
//   txt = loadStrings ('frankfurtschool.txt');
    
//   }
  
// }

let txt = [];
let counts = {};
let keys = [];
let allwords = [];
let w = []; 
let r= [];
let files = ['frankfurtschool.txt', 'Geography.txt', 'Line of Beauty.txt', 
             'Math.txt', 'Zodic.txt'];

function preload () {
  for (let i = 0; i< files.length; i++){
  txt [i] = loadStrings (files[i]);
  }
}


function setup() { 
   //noCanvas();
  
  for (let i = 0; i< txt.length; i++){
  allwords[i]= txt[i].join("\n");
  }
  let tokens = allwords[0].split (/\W+/);//capital W
  
 
  
  for (let i=0; i<tokens.length; i++) {
    let word = tokens[i].toLowerCase();
    if (!/\d+/.test(word)) {
    
    if (counts[word]===undefined) {
      counts[word] = {
      tf:1,
      df:1
      }
      keys.push(word);
    } else {
    counts[word].tf = counts[word].tf + 1;
    }
    
  }
    
    let othercounts = [];
    for (let j = 1; j < allwords.length; j++){
      let tempcounts = {};
      let tokens = allwords[j].split (/\W+/);
      for (let k = 0; k<tokens.length; k++){
        w = tokens[k].toLowerCase();
        if (tempcounts[w] === undefined) {
          tempcounts[w] = true; 
        }
      }
      othercounts.push(tempcounts);
  
    }
  
  for (let i = 0; i < keys.length; i++){
  
    let word = keys [i];
      for (let j = 0; j < othercounts.length; j++){
        let tempcounts = othercounts [j];
      if (tempcounts [w]) {
      counts[word].df++;
      }
     }
    }
	}
   for (let i = 0; i < keys.length; i++){
     let word = keys [i];
     
     let wordobj = counts[word];
     wordobj.tfidf = - wordobj.tf * log (files.length / wordobj.df);
   }
  keys.sort (compare);
  
  function compare (a,b) {
    let countA = counts[a].tfidf;
    let countB = counts[b].tfidf;
    return countB - countA;
  }
  
  for (let i=0; i< keys.length; i++) {
    let key = keys[i];
    createDiv (key + " " + counts[key].tfidf);
		console.log(createDiv);
  } 
  createCanvas(600,400);
  
	}   

function draw (){
  r [1] = counts[key[1]].tfidf.value;
  stroke(0);
  ellipse(0,0,r[1]);

}let counts = {};
let keys = [];
let inp;
let button;
let inpval;
let txt = [];
let files = ['Geography.txt', 'Math.txt',
             'Line of Beauty.txt', 'Zodic.txt'];

function preload(){
  for (let i = 0; i<files.length; i++){
  txt[i] = loadStrings(files[i]);
  }
}


function setup() {
  noCanvas();

  inp = createInput();
  button = createButton('submit');
  button.mousePressed(txtsubmit);

  function txtsubmit() {

    let allwords = [];
    for (let i = 0; i < txt.length; i++) {
      allwords [i] = txt [i].join("\n");
      //should I make allwords also include the inpval words?
    }

    inpval = inp.value();
    console.log(inpval);
    //let allwords = inpval.join("\n");
    //console.log(allwords);
    let tokens = inpval.split(/\W+/); //capital W

    console.log(tokens);

    let othercounts = [];
    for (let j = 1; j < allwords.length; j++){
     let othercounts = {};
     let tokens = allwords[j].split(/\W+/);
    }
    for (let k = 0; k < tokens.length; k++) {
     let w = tokens[k].toLowerCase();
     if (tempcounts[w] === undefined) {
       tempcounts[w] = true;
     }
    }
    othercounts.push (tempcounts);

    for (let i = 0; i < keys.length; i++){
     let word = keys[i];
    }
    for (let j = 0; j < othercounts.length; j++){
     let tempcounts = othercounts [j];
     if tempcounts[word] {
       counts[word].df++;
     }

    for (let i = 0; i < keys.length; i++){
       let word = keys[i];
       let wordobj = counts [word];
       wordobj.tfidf = wordobj.tf * log (files.length / wordobj.tf);
     }



    for (let i = 0; i < tokens.length; i++) {
      let word = tokens[i].toLowerCase();

      if (!/\d+/.test(word)) {

        if (counts[word] === undefined) {
          counts[word] = {
            tf: 1;
            df: 1;
          }
          keys.push(word);
        } else {
          counts[word].tf = counts[word].tf + 1;
        }

      }

    }

    console.log(counts);

    keys.sort(compare);

    function compare(a, b) {
      let countA = counts[a].tfidf;
      let countB = counts[b].tfidf;
      return countB - countA;
    }


    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      createDiv(key + " " + counts[key].tfidf);
    }

    }

  print(counts);




}
function setup() { 
  createCanvas(600, 400);
  textAlign(CENTER);
  background(200);
  sel = createSelect();
  sel.position(10, 10);
  sel.option('PodingtonBear');
  sel.option('ItsYourBirthday');
  sel.changed(mySelectEvent);
} 

function mySelectEvent() {
  let item = sel.value();
  if (item == 'PodingtonBear'){
}
  }else{
      
  }
  background(0);
  
}

let song;
let amp;

function preload(){
  song = loadSound("Monk_Turner__Fascinoma_-_01_-_Its_Your_Birthday.mp3");
}
function setup() { 
  createCanvas(600, 400);
  song.play();
  amp = new p5.Amplitude(); 
} 

function draw() { 
  background(0);
  let vol = amp.getLevel();
  let diachanger= map(vol, 0.1, 1, 0, 200); 
  
  
  //ellipses

  //middle-left
  fill(255, 255, 255);
  ellipse(300 - diachanger, 200, diachanger*2);
  //middle-right
  ellipse(300 + diachanger/2+diachanger/4, 200, diachanger+diachanger/2);
  //left1
  ellipse(300 - diachanger*3 - diachanger/2, 200, diachanger*3);
  //left2
  ellipse(300 - diachanger*6 - diachanger/2, 200, diachanger*3);
  //right1
  ellipse(300 + diachanger*2, 200, diachanger);
  //right2
  ellipse(300 + diachanger*3, 200, diachanger);
  
  
}

//why I cant directly use vol value and need to 
//set up another variable to use the vol value?
//why the bubbles change the direction of their position?let song;
let amp;


function preload(){
  song = loadSound("PodingtonBear.mp3");
}


function setup() { 
  createCanvas(600, 400);
  song.play();
  amp = new p5.Amplitude();
} 

function draw() { 
  background(0);
  let vol = amp.getLevel();
  let diachanger = map(vol, 0.1, 1, 0, 100)*50;
  stroke(255);
  noFill();
  drawCircle(300,200,diachanger);
   
}

function drawCircle(x,y,d){
  ellipse(x,y,d);
  if (d>1) {
  drawCircle(x+d*0.5,y,d*0.5);
  drawCircle(x-d*0.5,y,d*0.5);
  }
}let num = 50;
let bubbles = [];
let amp;
let song;

function preload(){
    song = loadSound("Monk_Turner__Fascinoma_-_01_-_Its_Your_Birthday.mp3");
}

function setup() { 
  createCanvas(400, 400);
  for(let i = 0; i < num; i++){
   	bubbles.push( new Bubble()); 
  }
  amp = new p5.Amplitude();
	song.play();
} 

function draw() {
  background(255);
  let vol = amp.getLevel();
  print(vol);
  // background(220);
  
  for(let i = 0; i < num; i++){
   	bubbles[i].display(vol); 
  }
  
}let video;
let button;
let snapshots = [];


function setup() { 
  createCanvas(320, 240);
  background(50);
  video = createCapture(VIDEO);
  video.size(320,240);
  //video.hide();
  button = createButton('snap');
  button.mousePressed(takesnap);
} 

function takesnap(){
  snapshots.push(video.get());
  //image(video, 0, 0, width, height);
}

function draw() { 
  
  let w = 50;
  let h = 30;
  let x = 0;
  let y = 0;
  
  for (let i=0;i<snapshots.length; i++){
  image(snapshots[i], x, y, w, h);
    x = x + w;
     if(x > width){
     x = 0;
     y = y + h;
     }
    
  }
  //image(video, 0, 0, width, height);
}let num = 20;
let bubbles = [];
let amp;
let song;

function preload(){
    song = loadSound("Monk_Turner__Fascinoma_-_01_-_Its_Your_Birthday.mp3");
}

function setup() { 
  createCanvas(400, 400);
  amp = new p5.Amplitude();
  song.play();
  for(let i = 0; i < num; i++){
   	bubbles.push( new Bubble()); 
  }
} 

function draw() {
  background(255);
  let vol = amp.getLevel();

  
  for(let i = 0; i < num; i++){
   	bubbles[i].display(vol); 
  }
  
}


//there's a limitation of the file size, any way to add a big-size file?
let song;
let slider;
let button;
let jumpButton;
let amp;

function setup() { 
  createCanvas(400, 400);
  
  
  song = loadSound("test.mp3", loaded);
  song.setVolume(0.5);
  sliderRate = createSlider(0.0001,10,5,0.1);
  sliderPan = createSlider(-1,1,0,0.1);
  amp = new p5.Amplitude();
  
  
} 

function loaded () {
  button = createButton("Play");
  button.mousePressed(togglePlaying);
  
  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);
}


function togglePlaying() {
  if (!song.isPlaying()) {
  song.play();
  button.html("Pause");
}
  else{
    song.pause();
    button.html("Play");
  }
}


function jumpSong(){
  let len = song.duration();
  let t = random(len);
  song.jump (t);
}

function draw() { 
  background(220);
  song.rate(sliderRate.value());
  song.pan(sliderPan.value());
  
  let vol = amp.getLevel();
  let diam = map(vol, 0, 0.3, 10, 1000);
  
  ellipse(200, 200, diam, diam);
}let x;
let y;
let a;

function setup() { 
  createCanvas(600, 400);
  
} 

function draw() { 
  background(220);
  
  
  //coffee bean 1
  strokeWeight(5);
  stroke(48, 29, 9, x);
  fill(84, 53, 19, x);
  ellipse(100,50,30,50);
  line(100, 25, 100, 75);
  
  
  //coffee bean 2
  strokeWeight(5);
  stroke(135, 73, 9, y);
  fill(209, 126, 39, y);
  ellipse(250,50,60,80);
  line(250, 10, 250, 90);
  
  //coffee bean 3
  strokeWeight(5);
  stroke(48, 29, 9, a);
  fill(35, 21, 7, a);
  ellipse(400,50,40,90);
  line(400, 5, 400, 95);
  
}

function mousePressed() {
  if (mouseX>85 && mouseX<115 && mouseY>25 && mouseY<75) {
  x=500;
  y=0;
  a=0;
  }
  
  if (mouseX>220 && mouseX<280 && mouseY>20 && mouseY<80) {
  x=0;
  y=500;
  a=0;
  }
  
  if (mouseX>380 && mouseX<420 && mouseY>5 && mouseY<95) {
  x=0;
  y=0;
  a=500;
  }
  
}let counts = {};
let keys = [];
let inp;
let button;
let inpval;



function setup() {
  noCanvas();


  inp = createInput();
  button = createButton('submit');
  button.mousePressed(aabb);

  function aabb() {

    inpval = inp.value();
    console.log(inpval);
    //let allwords = inpval.join("\n");
    //console.log(allwords);
    let tokens = inpval.split(/\W+/); //capital W

    console.log(tokens);

    for (let i = 0; i < tokens.length; i++) {
      let word = tokens[i].toLowerCase();

      if (!/\d+/.test(word)) {

        if (counts[word] === undefined) {
          counts[word] = 1;
          keys.push(word);
        } else {
          counts[word] = counts[word] + 1;
        }

      }

    }

    console.log(counts);

    keys.sort(compare);

    function compare(a, b) {
      let countA = counts[a];
      let countB = counts[b];
      return countB - countA;
    }

    for (let i = 0; i < keys.length; i++) {

      let key = keys[i];

      createDiv(key + " " + counts[key]);
    }

  }

  print(counts);




}let txt;
let counts = {} ;
let keys = [];

function preload () {
  txt = loadStrings ('frankfurtschool.txt');
}


function setup() { 
   noCanvas();
  let allwords = txt.join("\n");
  let tokens = allwords.split (/\W+/);//capital W
  
  console.log(tokens);
  
  for (let i=0; i<tokens.length; i++) {
    let word = tokens[i].toLowerCase();
    if (!/\d+/.test(word)) {
    
    if (counts[word]===undefined) {
      counts[word] = 1;
      keys.push(word);
    } else {
    counts[word] = counts[word] + 1;
    }
    
  }
    
  }
  
  console.log(counts);
  keys.sort (compare);
  
  function compare (a,b) {
    let countA = counts[a];
    let countB = counts[b];
    return countB - countA;
  }
  
  for (let i=0; i< keys.length; i++) {
    let key = keys[i];
    createDiv (key + " " + counts[key]);
  } 
     
 
} 
let data;

function preload(){
  data = loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/film-tv/tv_shows.json');
}

function setup() { 
  createCanvas(400, 400);
  
  console.log(data);
  background(0);
  fill(255);
  background(0);
  //textSize(64);
	//text(data.description,10,100);

  //createP(data.description);
  // createB(data[0].tv_shows)
  // fill(255);
  // text(data[0].description,100,100);
  //   text(data[0].tv_shows,100,100);
  // // createA(data.source,'source');
  for(let i = 0; i < data.tv_shows.length; i++){
    //console.log(i);
    fill(255);
    textSize(data.tv_shows[i].length*2);
    textAlign(CENTER);
    text(data.tv_shows[i],100,i*20);
  }
  //console.log(data);
  
  //why it doesnt work? in "inspect elements", it shows "Unexpected CSS token"
  //how to get the effect of using font size to represent the word fr
} function setup() { 
  createCanvas(400, 400);
  
  flower = {
    name:"sunflower",
    col:color(255,0,0)
  
  }
} 

function draw() { 
  background(220);
  fill(flower.col);
  text(flower.name,100,100);
}let data;

function preload(){
  data = loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/colors/dulux.json');
}

function setup() { 
  createCanvas(400, 400);
  //console.log(data);
  background(0);
  createP(data[0].name);
  fill(255);
    text(data[0].name,100,100);
  // createA(data.source,'source');
  for(let i = 0; i < 100; i++){
    console.log(i);
    fill(255);
    textAlign(CENTER);
    text(data[i].name,100,i*10);
  }
  //console.log(data);
} 

let rainfalls = [];
let slider;


function setup() {
  createCanvas(600, 400);
  
  angleMode(DEGREES);
  
  
  slider = createSlider(0,600,200);
  slider.style('width','600px');
  slider.changed(rainfalls2);

  for (let i = 0; i < 500; i++) {
    rainfalls[i] = new Rainfall(slider.value());
  }
  

}

function rainfalls2() {
    for (let i = 0; i < 500; i++) {
    rainfalls[i].update();  
	}  
  	 
}

function draw() {
  background(220);
  
    for (let i = 0; i < 500; i++) {
    rainfalls[i].render();
    rainfalls[i].move();   
  	 
}
    
}

function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(220);
  
  noStroke();
  
  ellipse(50,50,60,50);
  ellipse(80,40,60,50);
  ellipse(130,50,60,50);
  ellipse(70,70,60,50);
  ellipse(110,65,60,50);
  //x=x+1;
  //if (x> width) {
  //  x = 0;
  //}
}let x;
let y;

function setup() { 
  createCanvas(600, 400);
  angleMode(DEGREES);
} 

function draw() { 
  background(220);
  
  x=300;
  y=300;
  
  fill(102,102,102);
  
  //body
  beginShape();
curveVertex(x,y);
curveVertex(x,y+20);
curveVertex(x-40,y+20);
curveVertex(x-60,y+20);
curveVertex(x-65,y+10);
curveVertex(x-75,y-15);
curveVertex(x-80,y-30);  
curveVertex(x-85,y-40);
curveVertex(x-95,y-40);
curveVertex(x-90,y-70);
curveVertex(x-85,y-100);
curveVertex(x-70,y-125);
curveVertex(x-50,y-150);
curveVertex(x-40,y-190); 
curveVertex(x-28,y-155);   
curveVertex(x-24,y-155); 
curveVertex(x+24,y-155);
curveVertex(x+28,y-155);  
curveVertex(x+40,y-190);
curveVertex(x+50,y-150); 
curveVertex(x+70,y-125);
curveVertex(x+85,y-100);  
curveVertex(x+90,y-70); 
curveVertex(x+85,y-40); 
curveVertex(x+80,y-30);
curveVertex(x+75,y-15);
curveVertex(x+65,y+10);  
curveVertex(x+60,y+20);
curveVertex(x+40,y+20);
curveVertex(x,y+20);
curveVertex(x,y);
endShape();
  
  
  
  //eyes
  fill(255);
  ellipse(x-35,y-140,20);
  ellipse(x+35,y-140,20);
  fill(0);
  ellipse(x-35,y-140,10)
  ellipse(x+35,y-140,10)
  
  
  //nose
  fill(0);
  triangle(x-7,y-140,x+7,y-140,x,y-135);

  //mouth
  fill(225);
ellipse(x,y-125,90,10);  
line(x,y-130,x,y-120);
line(x-15,y-129,x-15,y-121);
line(x+15,y-129,x+15,y-121);
line(x-30,y-128,x-30,y-122);
line(x+30,y-128,x+30,y-122);
  
  line(x-50,y-130,x-90,y-145);
  line(x-50,y-128,x-100,y-135);
  line(x-50,y-125,x-85,y-120);
  
  line(x+50,y-130,x+90,y-145);
  line(x+50,y-128,x+100,y-135);
  line(x+50,y-125,x+85,y-120);
  
  //feet
  
  //stomach
  fill(219, 205, 155);
  ellipse(x,y-50,135,138);
  fill(102,102,102);
  
 beginShape();
curveVertex(x-40,y-90);
curveVertex(x-40,y-90);
curveVertex(x-35,y-95);
curveVertex(x-30,y-100);
curveVertex(x-25,y-95); 
curveVertex(x-20,y-90);
curveVertex(x-27,y-93);  
curveVertex(x-30,y-95); 
curveVertex(x-33,y-93);
curveVertex(x-40,y-90); 
curveVertex(x-40,y-90);
  endShape();
  
  beginShape();
curveVertex(x-10,y-90);
curveVertex(x-10,y-90);
curveVertex(x-5,y-95);
curveVertex(x,y-100);
curveVertex(x+5,y-95); 
curveVertex(x+10,y-90);
curveVertex(x+3,y-93);  
curveVertex(x,y-95); 
curveVertex(x-3,y-93);
curveVertex(x-10,y-90); 
curveVertex(x-10,y-90);
  endShape();
  
  beginShape();
curveVertex(x+40,y-90);
curveVertex(x+40,y-90);
curveVertex(x+35,y-95);
curveVertex(x+30,y-100);
curveVertex(x+25,y-95); 
curveVertex(x+20,y-90);
curveVertex(x+27,y-93);  
curveVertex(x+30,y-95); 
curveVertex(x+33,y-93);
curveVertex(x+40,y-90); 
curveVertex(x+40,y-90);
  endShape();
  
  beginShape();
curveVertex(x-60,y-60);
curveVertex(x-60,y-60);
curveVertex(x-55,y-65);
curveVertex(x-50,y-70);
curveVertex(x-45,y-65); 
curveVertex(x-40,y-60);
curveVertex(x-47,y-63);  
curveVertex(x-50,y-65); 
curveVertex(x-53,y-63);
curveVertex(x-60,y-60); 
curveVertex(x-60,y-60);
  endShape();
  
  beginShape();
curveVertex(x-30,y-60);
curveVertex(x-30,y-60);
curveVertex(x-25,y-65);
curveVertex(x-20,y-70);
curveVertex(x-15,y-65); 
curveVertex(x-10,y-60);
curveVertex(x-17,y-63);  
curveVertex(x-20,y-65); 
curveVertex(x-23,y-63);
curveVertex(x-30,y-60); 
curveVertex(x-30,y-60);
  endShape();
  
  beginShape();
curveVertex(x+30,y-60);
curveVertex(x+30,y-60);
curveVertex(x+25,y-65);
curveVertex(x+20,y-70);
curveVertex(x+15,y-65); 
curveVertex(x+10,y-60);
curveVertex(x+17,y-63);  
curveVertex(x+20,y-65); 
curveVertex(x+23,y-63);
curveVertex(x+30,y-60); 
curveVertex(x+30,y-60);
  endShape();
  
  beginShape();
curveVertex(x+60,y-60);
curveVertex(x+60,y-60);
curveVertex(x+55,y-65);
curveVertex(x+50,y-70);
curveVertex(x+45,y-65); 
curveVertex(x+40,y-60);
curveVertex(x+47,y-63);  
curveVertex(x+50,y-65); 
curveVertex(x+53,y-63);
curveVertex(x+60,y-60); 
curveVertex(x+60,y-60);
  endShape();
  
//arm
  beginShape();
curveVertex(x+85,y-40);
curveVertex(x+85,y-40);
curveVertex(x+80,y-41);
curveVertex(x+50,y-50);
curveVertex(x+20,y-65);
curveVertex(x+10,y-80);
curveVertex(x+8,y-90);
curveVertex(x+10,y-100); 
curveVertex(x+25,y-97); 
curveVertex(x+40,y-93);
curveVertex(x+55,y-90); 
curveVertex(x+70,y-86);
curveVertex(x+90,y-80);
curveVertex(x+90,y-80);
  endShape();
  
//umbrella
  push();
  translate(x+15,y-200);
  rotate(180);  
  fill(70, 96, 73);
  arc(0,0,100,50,0,180,CHORD);
  pop();
  
  fill(0);
  rect(x+13,y-200,4,100);
}let totoro1;
let totoro2;
let totoro3;
let cloud1;
let cloud2;
let rainfalls = [];
let rainfalls2 = [];

let isRaining = true;

function setup() {
  createCanvas(600, 400);
  angleMode(DEGREES);


  totoro1 = new Totoro(300, 350);
  totoro2 = new Totoro(70, 230);
  totoro3 = new Totoro(500, 300);
  cloud1 = new Cloud(50, 20);
  cloud2 = new Cloud(300, 40);

  for (let i = 0; i < 500; i++) {
    rainfalls[i] = new Rainfall(50,20);
    rainfalls2[i]= new Rainfall(300,40);
  }

}

function draw() {
  background(220);
  
  
  totoro1.display();
  totoro2.display();
  totoro3.display();
  

  if(isRaining == true){
    // if it does rain
    // the open Umbrella should sustain
    totoro1.displayOpenUmbrella();  
    totoro2.displayOpenUmbrella();
    totoro3.displayOpenUmbrella();
  }else if(isRaining == false){
    // if the sun is up
    // we can close the umbrellas
    totoro1.displayClosedUmbrella();  
    totoro2.displayClosedUmbrella();
    totoro3.displayClosedUmbrella();
  }

  // the clouds should always be up in the sky and 
  // be moving
  cloud1.render();
  cloud1.move();
  cloud2.render();
  cloud2.move();

  //here we loop over
  // every single rain drop 
  // and tell it what to do
  for (let i = 0; i < 500; i++) {
    // every rain drop should ALWAYS move
    // so that they stay in sync with the movin clouds
    rainfalls[i].move();
		rainfalls2[i].move();
    
    // BUT! we only want to display the rain drops if it is raining:
    if(isRaining == true){
      rainfalls[i].render();
      rainfalls2[i].render();
    }
    
    
  }

}


function mousePressed() {
  
  // Is it raining?
  if(isRaining == true){
    // if it was raining in the moment I cliicked the mouse
    //I want it to stop rain:
    isRaining = false;
    
  }else if(isRaining == false){
    // if it didnt rain when i clicked the mouse
    // the rain should start again:
    isRaining = true;
  }
  
  // ver short and for smart asses:
  // isRaining = !isRaining;
    
}let bouncer1;
let bouncer2;
let gravity = 0.1;

function setup() {
  createCanvas(400, 400);
  let col1 = color(200,0,0);
  let col2 = color(0,0,200);
  bouncer1 = new Ball(100,100,20,col1);
  bouncer2 = new Ball(125,125,50,col2);
}

function draw() {
  background(220);
  
  bouncer1.render();
  bouncer2.render();

  bouncer1.update();
  bouncer2.update();
}let img;

function preLoad

function setup() { 
  createCanvas(400, 400);
  background(0);
  let img=loadImage('a.jpg');
  
} 

function draw() { 
  background(220);
  image(img,0,0);
}var r;
var g;
var b;
var y;
var speed;


function setup() { 
  createCanvas(600, 400);
  
  r=random(255);
  g=random(255);
  b=random(255); 
  y=0;
  speed=0;

} 

function draw() { 
  
  background(0); 
  stroke(0);
  strokeWeight(5);
  owl();
  bubble();
  ball(25);
  ball(75);
  ball(455);
  ball(575);
  
}

//owl
function owl(){
  
  //ears
  fill("pink");
  triangle(260,50,240,110,280,110);
  triangle(340,50,320,110,360,110);
  
  //wings
  fill("pink");
  //left
  ellipse(210,155,30,30);
  ellipse(205,170,30,30);
  ellipse(210,185,30,30);
  //right
  ellipse(390,155,30,30);
  ellipse(395,170,30,30);
  ellipse(390,185,30,30);
  
  //body
  push();
  translate(300,270);
  rotate(PI/1.0);  
  fill("pink");
  arc(0,0,200,400,0,PI,PIE);
  pop();
  
  //feet
  rect(240,270,30,20);
  rect(320,270,30,20);
  
  //eyes
  //left
  ellipse(270,155,60,60);
  fill(0);
  ellipse(285,155,27,27);
  //right
  fill("pink");
  ellipse(330,155,60,60);
  fill(0);
  ellipse(315,155,27,27);
  
  //mouth
  triangle(290,190,310,190,300,220);
}

  function bubble(){
  //bubble gum
  fill(r,g,b);
  ellipse(300,200,mouseX,mouseY);
    
}

function ball(x){
  fill(r,g,b);
  ellipse(x,y,50);
  y=y+speed;
  speed=speed+0.1;
  if (y>height){
    y=height;
    speed=-0.9*speed;
    if (abs(speed)<1.5){
      speed=0
    }
  }
}var state= false;
var r;
var g;
var b;


function setup() { 

  createCanvas(600, 400);
   
} 

function draw() { 
    
  r=random(255);
  g=random(255);
  b=random(255);

  
  //button
 
  //button switch 
  if (state) {
    background(r,g,b);
    //clockhands
  noStroke();
  fill(198,237,99);
  
  push();
  translate(500,100);
  rotate(frameCount/3.0);
  rect(0,0,5,45);
  rect(0,-2.5,40,5);
  pop();
    
  } else {
    background(0);
    //clockhands
  noStroke();
  fill(198,237,99);
  
  push();
  translate(500,100);
  rotate(frameCount/20.0);
  rect(0,0,5,45);
  rect(0,-2.5,40,5);
  pop();
  }
  
  fill(198,237,99);
  ellipse(320,240,25,25);
  
  //string
  rect(317,150,5,78);  
  
  
  //lamp
  //bulb
  push();
  translate(250,150);

  rotate(PI/4.0);
  arc(0, 0, 80, 80, 0, PI, PIE);
  pop();
  
  //head
  push();
  translate(250,150);
  rotate(PI+PI/4.0);
  arc(0,0,150,150,0, PI, PIE);
  pop();
  
  //body
  //upper rack
  push();
  translate(325,150);
  rotate(PI+PI/1.25);
  rect(-15,0,20,110);
  pop();
  
  //second rack
  push();
  translate(380,220);
  rotate(PI/4.5);
  rect(-5,0,20,150);
  pop();
  
  //base
  rect(230, 330, 150, 30, 20, 20, 0, 0);
  
  //clock
  stroke(198,237,99);
  strokeWeight(8);
  noFill();
  ellipse(500,100,100,100);
  
}


function mousePressed() {
  if (dist(mouseX, mouseY,320,240) < 25/2) {
    state = !state;
  }
}var r;
var g;
var b;

var x=210;
var y=390;

var a;
var c;


function setup() { 
  createCanvas(600, 400);
  
  r=random(255);
  g=random(255);
  b=random(255);
  
  a=random(width);
  c=random(height);

  

} 

function draw() { 
  
  background(0);  
  
  //owl
  
  //ears
  fill("pink");
  stroke(0);
  strokeWeight(5);
  triangle(260,50,240,110,280,110);
  triangle(340,50,320,110,360,110);
  
  //wings
  fill("pink");
  //left
  ellipse(x,155,30,30);
  ellipse(205,170,30,30);
  ellipse(x,185,30,30);
  //right
  ellipse(y,155,30,30);
  ellipse(395,170,30,30);
  ellipse(y,185,30,30);
  
  x=x+random(-0.2,0.2);
  y=y+random(-0.2,0.2);
  
  
  //body
  push();
  translate(300,270);
  rotate(PI/1.0);  
  stroke(0);
  strokeWeight(5);
  fill("pink");
  arc(0,0,200,400,0,PI,PIE);
  pop();
  
  //feet
  rect(240,270,30,20);
  rect(320,270,30,20);
  
  //eyes
  //left
  ellipse(270,155,60,60);
  fill(0);
  ellipse(285,155,27,27);
  //right
  fill("pink");
  ellipse(330,155,60,60);
  fill(0);
  ellipse(315,155,27,27);
  
  //mouth
  triangle(290,190,310,190,300,220);
  
  //bubble gum
  fill(r,g,b);
  ellipse(300,200,mouseX,mouseY);
  
  
 
  
}

function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(220);
 
  //rotation
  push();
  translate(300,140);
  rotate(PI/6.0);

  
  stroke(0);
  strokeWeight(5);
  fill(137,190,242);
  arc(0,0,300,250,0,PI,PIE);
  
  pop();
  
  
  
  
  
}
function setup() { 
  createCanvas(600, 400);
  
} 


function draw() { 

 background(0);
  
  fill("pink");
  //bubble
  fill("pink");
  ellipse(300,200,mouseX,mouseY);
  
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  strokeWeight(4);
  
  //body
  fill(255,255,255);
  ellipse(200,275,180,180);
  
  //head
  fill(255,255,255);
  ellipse(200,150,150,150);
  
  //ears
  fill(0,0,0);
  ellipse(125,75,70,70);
  ellipse(275,75,70,70);
  
  //eyes
  angleMode(DEGREES);
  rotate(11);
  ellipse(185,120,40,60);
  
  resetMatrix();
  angleMode(DEGREES);
  rotate(-11);
  fill(0,0,0);
  ellipse(200,190,40,60);  

  resetMatrix();
  fill(255,255,255);
  ellipse(160,150,20,20);
  
  fill(255,255,255);
  ellipse(230,145,20,20);

  //nose
  ellipse(200,180,15,15);
  
  //mouth
  fill(0,0,0);
  ellipse(200,192.5,2,10);
  ellipse(197.5,207,5,15);
  ellipse(202.5,207,5,15);
  
  //feet
  fill(0,0,0);

  ellipse(125,250,80,80);
  
  ellipse(275,250,80,80);
  
  ellipse(115,350,80,80);
  
  ellipse(275,350,80,80);
  
}function setup() {
  createCanvas(200, 200);
}
function draw() {
  fill (255,255,255);
  rect(0,0,180,180);
  
  fill(0,0,0);
  rect(0,70,40,5);
  
  fill(0,0,0);
  rect(0,130,180,3);
  
  fill(0,0,0);
  rect(40,0,3,180);
  
  fill(0,0,0);
  rect(160,133,3,47);
  
  fill(0,0,0);
  rect(163,155,17,4);
  
  fill(255,0,0);
  rect(43,0,137,130);
  
  fill(0,0,255);
  rect(0,133,40,47);
  
  fill(255,255,0);
  rect(163,159,17,21);
  
}

var result=5+5
var name="Ruilin";

var x=0;
var y=0;

var xdir=1;
var ydir=3;


function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  //background(220);
  fill(255,0,0);
  stroke(255,0,0);
  
  if(mouseIsPressed){
  line(lastMouseX, lastMouseY, mouseX, mouseY);
  lastMouseX=mouseX;
  lastMouseY=mouseY;
  }
  
  //ellipse(x,y,50,50);
  x=x+xdir
  y=y+ydir
  

  if (y>height || y<0) {
  ydir=ydir*-1;
  }
  
  //if (y<0) {
  //ydir=ydir*-1;
  //}
  
  if(x>width || x<0){
  xdir=xdir*-1
  }
  
  //if(x<0){
  //xdir=xdir*-1
  //}
}function setup() { 
  createCanvas(400, 400);
  background(200);
  
  
} 

function draw(){
  background(200);
  var position=0;
 

//STICK FRIEND
	fill(255,0,0);
  stroke(0,0,255);
  rect(180,80,40,40);
  line(200,120,200,200);
  line(240,240,200,200);
  line(160,240,200,200);
  line(200,160,150,130);
  line(200,160,250,130);
  stroke(0,0,0);
}function setup() { 
  createCanvas(400, 400);
  background(200);
  fill(255,0,0);
  //hex color
  stroke(0,0,255);
  //noStroke();
  strokeWeight(1);
  ellipse(width/2,height/2,60,60);
  fill(0,255,0);
  strokeWeight(0);
  //rect(width/2-30,height/2-30,60,60);fully cover the ellipse
  rect(width/2,height/2,60,60);
  ellipse(width/2+100,height/2+100,100,60);
  fill(155,0,255);
  triangle(0,0,100,0,100,100);
  strokeWeight(2);
  line(0,0,100,350);
} 
 function draw() {
   
   
   // //write "background(200);" again, then the previous will disappear
   // write "background(200);" again, then the previous will disappear
   //strokeWeight(0);
   //fill(random(255),random(255),random(255));
   // //random=various colors
   //ellipse(random(width),random(height),20,20);
   // //use frameRate to change the rate of dots
   
   
   
   // //var myCoolVariable=5;
   //var ellipseYPosition=100;
   //ellipse(0,ellipseYPosition,50,50);
   //ellipse(50,ellipseYPosition,50,50);
   //ellipse(100,ellipseYPosition,50,50);
   
   
   strokeWeight(0);
   var redValue=map(mouseX,0,width,0,255);
   var blueValue=map(mouseY,0,height,0,255);
   fill(redValue, blueValue,255);
   ellipse(mouseX,mouseY,50,50);
 }



   var position=0
   var speed=2
   
   function setup() {
     createCanvas(400,400);
     //background(0); 
     //frameRate(15);
 }
   
   function draw(){
     background(200);
     								//What to define
     var redValue=map(position,
                      //What input range?
                      0,width,
                      //What output range?
                      0,255);
     fill(redValue, 0, 0)
     ellipse(position,height/2,50,50);
     //position=position+1;// //change 1 to 2, the rate will higher
     //if (position>width) {
     //position=0;}// //the ellipse will show up again
     position=position+speed
     if (position>width) {
     speed=-2;}
     else if (position<0){
     speed=2}
   
   
   
   
}
