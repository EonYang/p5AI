let sliderX
let sliderY
let sliderXf
let sliderYf
let sliderW
let sliderH

let x
let y
let a = 0

function setup() {
  sliderX = createSlider(1, 267, 1)
  sliderY = createSlider(1, 267, 1)
  sliderXf = createSlider(1, 267, 1)
  sliderYf = createSlider(1, 267, 1)
  sliderW = createSlider(1, 267, 1)
  sliderH = createSlider(1, 267, 1)
  createCanvas(400, 400);
  background(220);

}

function draw() {
  x = sliderX.value() + sin(a) * sliderXf.value()
  y = sliderY.value() + cos(a) * sliderYf.value()
  translate(x,y)
  rotate(a)
  fill(cos(a)*200)
  stroke(sin(a)*200)
  rect(0, 0, sliderW.value(), sliderH.value())
  a += 0.1
}let sliderTXout
let sliderTYout
let sliderYXin
let sliderTYin
let sliderW
let sliderH
let sliderAC
rectos = []

function setup() {
  sliderTXin = createSlider(0, 500, 0)
  sliderTYin = createSlider(0, 500, 0)
  sliderTXout = createSlider(0, 500, 0)
  sliderTYout = createSlider(0, 500, 0)
  sliderW = createSlider(0, 300, 0)
  sliderH = createSlider(0, 300, 0)
  sliderAC = createSlider(-100, 100, 0)
  // angleMode(DEGREES)
  // rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(220);
  for (let i = 0; i < 13; i++) {
    let tx = 600
    let ty = 450
    // let x = random(-30,30)
    // let y = random(-30,30)
    let x = 0
    let y = 0
    let w = 22
    let h = 99
    // let a = random(110)
    let a = 0
    let ac = 0.005
    let n = 0
    let nc = 0.01

    rectos[i] = new recto(tx, ty, x, y, w, h, a, ac, n, nc)



  }

}

function draw() {
  translate(sliderTXout.value(), sliderTYout.value())
  for (let i = 0; i < rectos.length; i++) {
    rectos[i].show()
  }
  //   x = width/2
  //   y = height/2
  //   translate(x,y)
  //   rotate(a)
  //   fill(noise(n)*124)
  //   stroke(noise(n)*220)
  //   rect(20,20,11+noise(n)*24,222+noise(n)*24,3)
  //   rect(0,40,111+noise(n)*124,22+noise(n)*24,3)
  // 	a += 0.1e
}let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  textAlign(CENTER)
  createCanvas(1600, 900);
  background(0);
  for (let i = 0; i < 93; i++) {
  

    let x = 800
    let y = 450
    let tx = 0
    let ty =0
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5,2.5,3.5,1.5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    
    
    
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
   
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
      // translate(400,300)

    rectoz[i].show()
    
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }var serial;
let serialValue1 = 0
let serialValue2 = 0
let serialValue3 = 0
let serialValue4 = 0
let serialValue5 = 0
let serialValue6 = 0
let serialValue7 = 0
let serialValue8 = 0
let serialValue9 = 0
let serialValue10 = 0
let serialValue11 = 0
let serialValue12 = 0
let serialValue13 = 0
let serialValue14 = 0
let serialValue15 = 0
let serialValue16 = 0
let serialValue17 = 0
let serialValue18 = 0
let serialValue19 = 0
let serialValue20 = 0
let serialValue21 = 0
let serialValue22 = 0
let serialValue23 = 0
let serialValue24 = 0
let branches = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(120)

  for (let i = 0; i < 33; i++) {
    let startX = windowWidth / 2
    let startY = windowHeight
    let bWidth = 184
    let bHeight = bWidth * 1.3
    let speedX
    let speedY
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.4)
    let breakPoint = random(100, windowHeight - 100)
    let shrinkRate
    let shrinkRate2
    // let newShrinkRate = random(0.04, 0.06)
    // let newShrinkRate2 = newShrinkRate * 1.3
    let newShrinkRate
    let newShrinkRate2
    let noi = random(-12, 12)
    let noiChange
    let angle = 0
    let aChange = random(-0.005, 0.005)
    let roX
    let roY
    let roChangeX = 0
    let roChangeY = 0
    let R
    let G
    let B
    branches[i] = new Branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)
  }

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1431");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  let splitString = split(currentString, ',')

  // var currentString = serial.read()
  if (currentString) {
    serialValue1 = int(splitString[0]);
    serialValue2 = int(splitString[1]);
    serialValue3 = int(splitString[2]);
    serialValue4 = int(splitString[3]);
    serialValue5 = int(splitString[4]);
    serialValue6 = int(splitString[5]);
    serialValue7 = int(splitString[6]);
    serialValue8 = int(splitString[7]);
    serialValue9 = int(splitString[8]);
    serialValue10 = int(splitString[9]);
    serialValue11 = int(splitString[10]);
    serialValue12 = int(splitString[11]);
    serialValue13 = int(splitString[12]);
    serialValue14 = int(splitString[13]);
    serialValue15 = int(splitString[14]);
    serialValue16 = int(splitString[15]);
    serialValue17 = int(splitString[16]);
    serialValue18 = int(splitString[17]);
    serialValue19 = int(splitString[18]);
    serialValue20 = int(splitString[19]);
    serialValue21 = int(splitString[20]);
    serialValue22 = int(splitString[21]);
    serialValue23 = int(splitString[22]);
    serialValue24 = int(splitString[23]);

    console.log(splitString[0] + "    " +
      splitString[1] + "    " +
      splitString[2] + "    " +
      splitString[3] + "    " +
      splitString[4] + "    " +
      splitString[5] + "    " +
      splitString[6] + "    " +
      splitString[7] + "    " +
      splitString[8] + "    " +
      splitString[9] + "    " +
      splitString[10] + "    " +
      splitString[11] + "    " +
      splitString[12] + "    " +
      splitString[13] + "    " +
      splitString[14] + "    " +
      splitString[15] + "    " +
      splitString[16] + "    " +
      splitString[17] + "    " +
      splitString[18] + "    " +
      splitString[19] + "    " +
      splitString[20] + "    " +
      splitString[21] + "    " +
      splitString[22] + "    " +
      splitString[23]);

  }
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer

function reset() {
  if (serialValue20 > 0) {
    background(120)
  }
  for (let i = 0; i < map(serialValue13,0,1023,33,133); i++) {
    // let startX
    if(serialValue22>0) {startX = random(windowWidth) 
        } else { startX = windowWidth/2 }
    let startY = windowHeight
    let bWidth = 184
    let bHeight = bWidth * 1.3
    let speedX
    let speedY
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.4)
    let breakPoint = random(100, windowHeight - 100)
    let shrinkRate
    let shrinkRate2
    // let newShrinkRate = random(0.04, 0.06)
    // let newShrinkRate2 = newShrinkRate * 1.3
    let newShrinkRate
    let newShrinkRate2
    let noi = random(-12, 12)
    let noiChange
    let angle = 0
    let aChange = random(-0.005, 0.005)
    let roX
    let roY
    let roChangeX = 0
    let roChangeY = 0
    let R
    let G
    let B
    branches[i] = new Branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)
  }

}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].grow()
  }
  if (serialValue24 > 0) {
    reset()
  }
  // ellipse(200, 200, serialValue1, serialValue2);


}var serial;
let serialValue1
let serialValue2
let serialValue3
let serialValue4
let serialValue5
let serialValue6
let serialValue7
let serialValue8
let serialValue9
let serialValue10
let serialValue11
let serialValue12
let serialValue13
let serialValue14
let serialValue15
let serialValue16
let serialValue17
let serialValue18
let serialValue19
let serialValue20
let serialValue21
let serialValue22
let branches = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(120)

  for (let i = 0; i < 33; i++) {
    let startX = windowWidth / 2
    let startY = windowHeight
    let bWidth = 184
    let bHeight = bWidth * 1.3
    let speedX
    let speedY
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.4)
    let breakPoint = random(100, windowHeight - 100)
    let shrinkRate
    let shrinkRate2
    // let newShrinkRate = random(0.04, 0.06)
    // let newShrinkRate2 = newShrinkRate * 1.3
    let newShrinkRate
    let newShrinkRate2
    let noi = random(-12, 12)
    let noiChange
    let angle = 0
    let aChange = random(-0.005, 0.005)
    let roX
    let roY
    let roChangeX = 0
    let roChangeY = 0
    let R
    let G
    let B
    branches[i] = new Branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)
  }
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1431");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  let splitString = split(currentString, ',')

  // var currentString = serial.read()
  if (currentString) {
    serialValue1 = int(splitString[0]);
    serialValue2 = int(splitString[1]);
    serialValue3 = int(splitString[2]);
    serialValue4 = int(splitString[3]);
    serialValue5 = int(splitString[4]);
    serialValue6 = int(splitString[5]);
    serialValue7 = int(splitString[6]);
    serialValue8 = int(splitString[7]);
    serialValue9 = int(splitString[8]);
    serialValue10 = int(splitString[9]);
    serialValue11 = int(splitString[10]);
    serialValue12 = int(splitString[11]);
    serialValue13 = int(splitString[12]);
    serialValue14 = int(splitString[13]);
    serialValue15 = int(splitString[14]);
    serialValue16 = int(splitString[15]);
    serialValue17 = int(splitString[16]);
    serialValue18 = int(splitString[17]);
    serialValue19 = int(splitString[18]);
    serialValue20 = int(splitString[19]);
    serialValue21 = int(splitString[20]);
    serialValue22 = int(splitString[21]);

    console.log(splitString[0] + "    " +
      splitString[1] + "    " +
      splitString[2] + "    " +
      splitString[3] + "    " +
      splitString[4] + "    " +
      splitString[5] + "    " +
      splitString[6] + "    " +
      splitString[7] + "    " +
      splitString[8] + "    " +
      splitString[9] + "    " +
      splitString[10] + "    " +
      splitString[11] + "    " +
      splitString[12] + "    " +
      splitString[13] + "    " +
      splitString[14] + "    " +
      splitString[15] + "    " +
      splitString[16] + "    " +
      splitString[17] + "    " +
      splitString[18] + "    " +
      splitString[19] + "    " +
      splitString[20] + "    " +
      splitString[21]);

  }
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].grow()
  }
  // ellipse(200, 200, serialValue1, serialValue2);


}let xx = 100
let yy = 100
var serial;
let serialValue1
let serialValue2
let serialValue3
let serialValue4
let serialValue5
let serialValue6
let serialValue7
let serialValue8
let serialValue9
let serialValue10
let serialValue11
let serialValue12
let serialValue13
let serialValue14
let serialValue15
let serialValue16
let serialValue17
let serialValue18
let serialValue19
let serialValue20
let serialValue21
let serialValue22
let serialValue23
let serialValue24

function setup() {
  createCanvas(400, 400)
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1431");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  let splitString = split(currentString, ',')

  // var currentString = serial.read()
  if (currentString) {
    serialValue1 = int(splitString[0]);
    serialValue2 = int(splitString[1]);
    serialValue3 = int(splitString[2]);
    serialValue4 = int(splitString[3]);
    serialValue5 = int(splitString[4]);
    serialValue6 = int(splitString[5]);
    serialValue7 = int(splitString[6]);
    serialValue8 = int(splitString[7]);
    serialValue9 = int(splitString[8]);
    serialValue10 = int(splitString[9]);
    serialValue11 = int(splitString[10]);
    serialValue12 = int(splitString[11]);
    serialValue13 = int(splitString[12]);
    serialValue14 = int(splitString[13]);
    serialValue15 = int(splitString[14]);
    serialValue16 = int(splitString[15]);
    serialValue17 = int(splitString[16]);
    serialValue18 = int(splitString[17]);
    serialValue19 = int(splitString[18]);
    serialValue20 = int(splitString[19]);
    serialValue21 = int(splitString[20]);
    serialValue22 = int(splitString[21]);
    serialValue23 = int(splitString[22]);
    serialValue24 = int(splitString[23]);

    console.log(splitString[0] + "    " + 
                splitString[1] + "    " + 
                splitString[2] + "    " + 
                splitString[3] + "    " + 
                splitString[4] + "    " + 
                splitString[5] + "    " + 
                splitString[6] + "    " + 
                splitString[7] + "    " + 
                splitString[8] + "    " + 
                splitString[9] + "    " + 
                splitString[10] + "    " + 
                splitString[11] + "    " + 
                splitString[12] + "    " + 
                splitString[13] + "    " + 
                splitString[14] + "    " + 
                splitString[15] + "    " + 
                splitString[16] + "    " + 
                splitString[17] + "    " + 
                splitString[18] + "    " + 
                splitString[19] + "    " + 
                splitString[20] + "    " + 
                splitString[21] + "    " + 
                splitString[22] + "    " + 
                splitString[23]);

  }
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer

function draw() {
  background(120)
  // Polling method
  // if (serial.available() > 0) {
  // var data = serial.read();
  ellipse(xx, yy, serialValue1, serialValue2);
  
  // }

}// --Growth Simulator--

let panel
let branches = []
let sliderWindX
let sliderWindY
let sliderRoX
let sliderRoY
let sliderNoise
let sliderShrinkNeg
let sliderShrink
let button
let button2
let chBoxShape
let chBox1
let chBox2
let chBoxAch
let chBoxClrAuto
let sliderStroke
let sliderR
let sliderG
let sliderB
let sliderAch
let sliderNumber
let fg


function setup() {
  // angleMode(DEGREES)
  // rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(220);
  panel = createP("left-right")
  panel.position(5, 20)
  panel.style("background-color", "beige")
  panel = createP("up-down")
  panel.position(5, 40)
  panel.style("background-color", "beige")
  panel = createP("roto offset1")
  panel.position(5, 60)
  panel.style("background-color", "beige")
  panel = createP("roto offset2")
  panel.position(5, 80)
  panel.style("background-color", "beige")
  panel = createP("noise")
  panel.position(5, 100)
  panel.style("background-color", "beige")
  panel = createP("grow")
  panel.position(5, 120)
  panel.style("background-color", "beige")
  panel = createP("shrink")
  panel.position(5, 140)
  panel.style("background-color", "beige")
  panel = createP("stroke")
  panel.position(5, 181)
  panel.style("background-color", "beige")
  panel = createP("red")
  panel.position(5, 201)
  panel.style("background-color", "beige")
  panel = createP("green")
  panel.position(5, 221)
  panel.style("background-color", "beige")
  panel = createP("blue")
  panel.position(5, 241)
  panel.style("background-color", "beige")

  chBox1 = createCheckbox('fresh background', false)
  chBox2 = createCheckbox('wide base', false)
  chBoxAch = createCheckbox('uniform', false)
  chBoxClrAuto = createCheckbox('auto color', true)
  chBoxShape = createCheckbox('rectangle branch', false)
  button = createButton("Reset")
  button.mousePressed(reset)
  chBox1.position(5, 364)
  chBox1.style("background-color", "pink")
  chBox2.position(5, 318)
  chBox2.style("background-color", "pink")
  chBoxAch.position(5, 277)
  chBoxAch.style("background-color", "pink")
  panel = createP("angle")
  panel.position(5, 282)
  panel.style("background-color", "beige")
  chBoxClrAuto.position(5, 176)
  chBoxClrAuto.style("background-color", "beige")
  // chBoxClrAuto.style("font-size", 20 + "pt")
  chBoxShape.position(5, 8)
  chBoxShape.style("background-color", "green")
  panel = createP("#of branches")
  panel.position(5, 323)
  panel.style("background-color", "pink")
  button.position(8, 390)
  button.style("background-color", "pink")
  button.style("font-size", 22 + "pt")
  sliderWindX = createSlider(-30, 30, 0)
  sliderWindY = createSlider(-30, 30, 0)
  sliderRoX = createSlider(-100, 100, 0)
  sliderRoY = createSlider(-100, 100, 0)
  sliderNoise = createSlider(0, 100, 30)
  sliderShrinkNeg = createSlider(0, 100, 0)
  sliderShrink = createSlider(0, 100, 0)
  sliderStroke = createSlider(0, 255, 22)
  sliderR = createSlider(0, 255, 50)
  sliderG = createSlider(0, 255, 160)
  sliderB = createSlider(0, 255, 30)
  sliderAch = createSlider(-100, 100, 0)
  sliderNumber = createSlider(1, 178, 80)
  sliderWindX.position(86, 40)
  sliderWindY.position(86, 60)
  sliderRoX.position(86, 80)
  sliderRoY.position(86, 100)
  sliderNoise.position(86, 120)
  sliderShrinkNeg.position(86, 140)
  sliderShrink.position(86, 160)
  sliderStroke.position(86, 201)
  sliderR.position(86, 221)
  sliderG.position(86, 241)
  sliderB.position(86, 261)
  sliderAch.position(86, 302)
  sliderNumber.position(86, 343)

  for (let i = 0; i < sliderNumber.value(); i++) {
    // let startX = windowWidth / 2
    let startX = windowWidth / 2
    let startY = height
    let bWidth = 84
    let bHeight = bWidth * 1.3
    let speedX
    let speedY
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.4)
    let breakPoint = random(100, windowHeight - 100)
    let shrinkRate
    let shrinkRate2
    // let newShrinkRate = random(0.04, 0.06)
    // let newShrinkRate2 = newShrinkRate * 1.3
    let newShrinkRate
    let newShrinkRate2
    let noi = random(-12, 12)
    let noiChange = 0.01
    let angle = 0
    let aChange = random(-0.005, 0.005)
    let roX
    let roY
    let roChangeX = 0
    let roChangeY = 0
    let R
    let G
    let B
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)

  }


}

function reset() {
  if (chBox1.checked()) {
    background(220)
  }
  for (let i = 0; i < sliderNumber.value(); i++) {
    // let startX = windowWidth
    let startX
    if (chBox2.checked()) {
      startX = random(windowWidth)
    } else {
      startX = windowWidth / 2
    }
    let aChange = random(-0.005, 0.005)
    // if (chBoxAch.checked()) {
    // aChange = fg
    // } else {
    // aChange = random(-0.005, 0.005)}
    let startY = height
    let bWidth = 84
    let bHeight = bWidth * 1.3
    let speedX
    let speedY
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.4)
    let breakPoint = random(100, windowHeight - 100)
    let shrinkRate
    let shrinkRate2
    // let newShrinkRate = random(0.04, 0.06)
    // let newShrinkRate2 = newShrinkRate * 1.3
    let newShrinkRate
    let newShrinkRate2
    let noi = random(-12, 12)
    let noiChange = 0.01
    let angle = 0
    // let aChange = random(-0.005, 0.005)
    let roX
    let roY
    let roChangeX = 0
    let roChangeY = 0
    let R
    let G
    let B
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)

  }
}

function draw() {

  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }
}var serial;
let serialValue1
let serialValue2
let serialValue3
let serialValue4
let serialValue5
let branches = [];

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(400, 400)
  background(120)
  for (let i = 0; i < 77; i++) {
    // let branchX = 450
    // let branchY = 700
    let branchX = random(windowWidth)
    let branchY = 500
    let branchWidth = 90
    let branchHeight = branchWidth*1.3
    let shrinkRate = random(0.1, 0.2)
    let shrinkRate2 = shrinkRate*1.3
    // let branchXspd = random(-0.3, 0.3)
    let branchXspd
    // let branchYspd = random(0.3, 0.9)
    let branchYspd
    let n = random(0.5, 12)
    let a = random(-11, 11)
    let aChange = random(-0.5,0.5)
    branches[i] = new Branch(branchX, branchY, branchWidth,
      branchHeight, shrinkRate, shrinkRate2, branchXspd,
      branchYspd, n, a, aChange)

  }

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1431");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  let splitString = split(currentString, ',')

  // var currentString = serial.read()
  if (currentString) {
    serialValue1 = int(splitString[0]);
    serialValue2 = int(splitString[1]);
    serialValue3 = int(splitString[2]);
    serialValue4 = int(splitString[3]);
    serialValue5 = int(splitString[4]);

    console.log(splitString[0] + "    " + splitString[1] + "    " + splitString[2] + "    " + splitString[3] + "    " + splitString[4]);

  }
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer

function draw() {
   
   //   let joy1 =1
   // let joy2 = 1
    for (let i = 0; i < branches.length; i++) {
      let joy1 = map(serialValue4,0,1000, -1,1)
   let joy2 = map(serialValue5,0,1000, -1,1)
    branches[i].show()
      branches[i].grow(joy1,joy2)
      
  }

}var serial;
let serialValue1
let serialValue2
let serialValue3
let serialValue4
let serialValue5
let circles = []

function setup() {
  createCanvas(400, 400)
  background(120)
  for (let i = 0; i < 11; i++) {
    let elx = random(width)
    let ely = random(height)
    let elw
    let elh
    let elfi
    circles[i] = new Circle(elx, ely, elw, elh, elfi)
  }
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1431");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  let splitString = split(currentString, ',')

  // var currentString = serial.read()
  if (currentString) {
    serialValue1 = int(splitString[0]);
    serialValue2 = int(splitString[1]);
    serialValue3 = int(splitString[2]);
    serialValue4 = int(splitString[3]);
    serialValue5 = int(splitString[4]);

    console.log(splitString[0] + "    " + splitString[1] + "    " + splitString[2] + "    " + splitString[3] + "    " + splitString[4]);

  }
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer

function draw() {
  
  for (let i = 0; i < circles.length; i++) {
   // tempelw = 3
   // tempelh = 52
   // tempelfi = 33
   circles[i].grow(serialValue4,serialValue5,serialValue3/3) 
  }

  // Polling method
  // if (serial.available() > 0) {
  // var data = serial.read();
  // fill(serialValue1/3,3)
  // ellipse(serialValue2, serialValue3, serialValue4, serialValue5);
  // }

}// -add uniform turn slider
// -add array number slider(actual slider?)
// -interface ciz: unifrom toggle inin alt
// kismi uniform olsa onun altinda turn
// pot olsa rox ve roy da iki actual slider
// olarak altta mi dursalar butun boardin
// en saginda (3 distinc part var 
// 1.)joystick noise shrink 
// 2.) color tog and rgb str 
// 3.) unifrom tog turn angCh slider rox and yoy sliders)
// -html element koyarak yazilarin silinmesinni
// engelle ve bu arayuzu ekranin altinda simule et.
let panel
let branches = []
let sliderWindX
let sliderWindY
let sliderRoX
let sliderRoY
let sliderNoise
let sliderShrinkNeg
let sliderShrink
let button
let button2
let chBox1
let chBox2
let chBoxAch
let chBoxClrAuto
let sliderStroke
let sliderR
let sliderG
let sliderB
let sliderAch
let sliderNumber
let fg


function setup() {
  // angleMode(DEGREES)
  // rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(220);
panel = createP("Control Panel")
  panel.style("background-color", "pink")
  textAlign(RIGHT)
  // text('windX', 37, 33)
  // text('windY', 37, 53)
  // text('roX', 37, 73)
  // text('roY', 37, 93)
  // text('turn', 37, 113)
  // text('noise', 37, 133)
  // text('shrink', 37, 153) 
  chBox1 = createCheckbox('fresh background', false)
  chBox2 = createCheckbox('wide base', false)
  chBoxAch = createCheckbox('uniform', false)
  chBoxClrAuto = createCheckbox('auto color', true)
  button = createButton("Reset")
  // button2 = createButton("Save&Email")
  button.mousePressed(reset)
  chBox1.position(12, 240)
  chBox2.position(12, 255)
  chBoxAch.position(12, 270)
  chBoxClrAuto.position(12,285)
  button.position(32, 310)
  // button2.position(32, 295)
  sliderWindX = createSlider(-30, 30, 0)
  sliderWindY = createSlider(-30, 30, 0)
  sliderRoX = createSlider(-100, 100, 0)
  sliderRoY = createSlider(-100, 100, 0)
  sliderNoise = createSlider(0, 100, 30)
  sliderShrinkNeg = createSlider(-100, 0, 0)
  sliderShrink = createSlider(0, 100, 0)
  sliderStroke = createSlider(0, 255, 22)
  sliderR = createSlider(0, 255, 200)
  sliderG = createSlider(0, 255, 190)
  sliderB = createSlider(0, 255, 30)
  sliderAch = createSlider(-100, 100, 0)
  sliderNumber = createSlider(0, 178, 20)
  sliderWindX.position(82, 20)
  sliderWindY.position(82, 40)
  sliderRoX.position(82, 60)
  sliderRoY.position(82, 80)
  sliderNoise.position(82, 100)
  sliderShrinkNeg.position(82, 120)
  sliderShrink.position(82, 140)
  sliderStroke.position(82, 160)
  sliderR.position(82, 180)
  sliderG.position(82, 200)
	sliderB.position(82, 220)
  
  for (let i = 0; i < 20; i++) {
    // let startX = windowWidth / 2
    let startX = windowWidth / 2
    let startY = height
    let bWidth = 84
    let bHeight = bWidth * 1.3
    let speedX
    let speedY
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.4)
    let breakPoint = random(100, windowHeight - 100)
    let shrinkRate
    let shrinkRate2
    // let newShrinkRate = random(0.04, 0.06)
    // let newShrinkRate2 = newShrinkRate * 1.3
    let newShrinkRate
    let newShrinkRate2
    let noi = random(-12, 12)
    let noiChange = 0.01
    let angle = 0
    let aChange = random(-0.005, 0.005)
    let roX
    let roY
    let roChangeX = 0
    let roChangeY = 0
    let R 
    let G 
    let B 
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)

  }


}

function reset() {
  if (chBox1.checked()) {
    background(220)
  }
  for (let i = 0; i < sliderNumber.value(); i++) {
    // let startX = windowWidth
    let startX
    if (chBox2.checked()) {
      startX = random(windowWidth)
    } else {
      startX = windowWidth / 2
    }
    let aChange = random(-0.005, 0.005)
    // if (chBoxAch.checked()) {
    // aChange = fg
    // } else {
    // aChange = random(-0.005, 0.005)}
    let startY = height
    let bWidth = 84
    let bHeight = bWidth * 1.3
    let speedX
    let speedY
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.4)
    let breakPoint = random(100, windowHeight - 100)
    let shrinkRate
    let shrinkRate2
    // let newShrinkRate = random(0.04, 0.06)
    // let newShrinkRate2 = newShrinkRate * 1.3
    let newShrinkRate
    let newShrinkRate2
    let noi = random(-12, 12)
    let noiChange = 0.01
    let angle = 0
    // let aChange = random(-0.005, 0.005)
    let roX
    let roY
    let roChangeX = 0
    let roChangeY = 0
    let R 
    let G 
    let B 
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)

  }
}

function draw() {
  
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }
  // noStroke()
  fill(0, 3)
  stroke(0, 1)
  textSize(26)
  text('windX', 80, 33)
  text('windY', 80, 53)
  text('roX', 80, 73)
  text('roY', 80, 93)
  text('noise', 80, 113)
  text('shrink-', 80, 133)
  text('shrink', 80, 153)
  text('stroke', 80, 173)
  text('R', 80, 193)
  text('G', 80, 213)
  text('B', 80, 233)
 
}let branches = []
let sliderWindX
let sliderWindY
let sliderRoX
let sliderRoY
let sliderNoise
let sliderShrinkNeg
let sliderShrink
let sliderFill
let button
let button2
let chBox1
let chBox2
let chBoxBnw
let sliderStroke
let sliderR
let sliderG
let sliderB


function setup() {
  // angleMode(DEGREES)
  // rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(220);

  textAlign(RIGHT)
  // text('windX', 37, 33)
  // text('windY', 37, 53)
  // text('roX', 37, 73)
  // text('roY', 37, 93)
  // text('turn', 37, 113)
  // text('noise', 37, 133)
  // text('shrink', 37, 153) 
  chBox1 = createCheckbox('fresh background', false)
  chBox2 = createCheckbox('wide base', false)
  chBoxBnw = createCheckbox('b&w', false)
  button = createButton("Reset")
  // button2 = createButton("Save&Email")
  button.mousePressed(reset)
  chBox1.position(12, 160)
  chBox2.position(12, 175)
  chBoxBnw.position(12, 237)
  button.position(32, 195)
  // button2.position(32, 295)
  sliderWindX = createSlider(-30, 30, 0)
  sliderWindY = createSlider(-30, 30, 0)
  sliderRoX = createSlider(-100, 100, 0)
  sliderRoY = createSlider(-100, 100, 0)
  sliderNoise = createSlider(0, 100, 30)
  sliderShrinkNeg = createSlider(-100, 0, 0)
  sliderShrink = createSlider(0, 100, 0)
  sliderStroke = createSlider(0, 255, 22)
  sliderFill = createSlider(0, 255, 22)
  sliderR = createSlider(0, 255, 200)
  sliderG = createSlider(0, 255, 190)
  sliderB = createSlider(0, 255, 30)
  sliderWindX.position(82, 20)
  sliderWindY.position(82, 40)
  sliderRoX.position(82, 60)
  sliderRoY.position(82, 80)
  sliderNoise.position(82, 100)
  sliderShrinkNeg.position(82, 120)
  sliderShrink.position(82, 140)
  sliderStroke.position(82, 220)
  sliderFill.position(82, 265)
  sliderR.position(82, 285)
  sliderG.position(82, 305)
	sliderB.position(82, 325)
  
  for (let i = 0; i < 280; i++) {
    // let startX = windowWidth / 2
    let startX = windowWidth / 2
    let startY = height
    let bWidth = 84
    let bHeight = bWidth * 1.3
    let speedX
    let speedY
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.4)
    let breakPoint = random(100, windowHeight - 100)
    let shrinkRate
    let shrinkRate2
    // let newShrinkRate = random(0.04, 0.06)
    // let newShrinkRate2 = newShrinkRate * 1.3
    let newShrinkRate
    let newShrinkRate2
    let noi = random(-12, 12)
    let noiChange = 0.01
    let angle = 0
    let aChange = random(-0.005, 0.005)
    let roX
    let roY
    let roChangeX = 0
    let roChangeY = 0
    let R 
    let G 
    let B 
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)

  }


}

function reset() {
  if (chBox1.checked()) {
    background(220)
  }
  for (let i = 0; i < 180; i++) {
    // let startX = windowWidth
    let startX
    if (chBox2.checked()) {
      startX = random(windowWidth)
    } else {
      startX = windowWidth / 2
    }
    let startY = height
    let bWidth = 84
    let bHeight = bWidth * 1.3
    let speedX
    let speedY
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.4)
    let breakPoint = random(100, windowHeight - 100)
    let shrinkRate
    let shrinkRate2
    // let newShrinkRate = random(0.04, 0.06)
    // let newShrinkRate2 = newShrinkRate * 1.3
    let newShrinkRate
    let newShrinkRate2
    let noi = random(-12, 12)
    let noiChange = 0.01
    let angle = 0
    let aChange = random(-0.005, 0.005)
    let roX
    let roY
    let roChangeX = 0
    let roChangeY = 0
    let R = 33
    let G = 195
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)

  }
}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }
  // noStroke()
  fill(0, 3)
  stroke(0, 1)
  textSize(26)
  text('windX', 80, 33)
  text('windY', 80, 53)
  text('roX', 80, 73)
  text('roY', 80, 93)
  text('noise', 80, 113)
  text('shrink-', 80, 133)
  text('shrink', 80, 153)
  text('stroke', 80, 233)
  text('fill', 80, 278)
}let branches = []
let sliderWindX
let sliderWindY
let sliderRoX
let sliderRoY
let sliderNoise
let sliderShrinkNeg
let sliderShrink
let button
let chBox1
let chBox2
let sliderStroke

function setup() {
  // angleMode(DEGREES)
  // rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(220);
  textAlign(RIGHT)
  // text('windX', 37, 33)
  // text('windY', 37, 53)
  // text('roX', 37, 73)
  // text('roY', 37, 93)
  // text('turn', 37, 113)
  // text('noise', 37, 133)
  // text('shrink', 37, 153)
  chBox1 = createCheckbox('fresh background', false)
  chBox2 = createCheckbox('wide base', false)
  button = createButton("Reset")
  button.mousePressed(reset)
  chBox1.position(12, 160)
  chBox2.position(12, 175)
  button.position(32, 195)
  sliderWindX = createSlider(-30, 30, 0)
  sliderWindY = createSlider(-30, 30, 0)
  sliderRoX = createSlider(-100, 100, 0)
  sliderRoY = createSlider(-100, 100, 0)
  sliderNoise = createSlider(0, 100, 30)
  sliderShrinkNeg = createSlider(-100, 0, 0)
  sliderShrink = createSlider(0, 100, 0)
  sliderStroke = createSlider(0,255,22)
  sliderWindX.position(82, 20)
  sliderWindY.position(82, 40)
  sliderRoX.position(82, 60)
  sliderRoY.position(82, 80)
  sliderNoise.position(82, 100)
  sliderShrinkNeg.position(82, 120)
  sliderShrink.position(82, 140)
	sliderStroke.position(82,215)

  for (let i = 0; i < 280; i++) {
    // let startX = windowWidth / 2
    let startX = windowWidth / 2
    let startY = height
    let bWidth = 84
    let bHeight = bWidth * 1.3
    let speedX
    let speedY
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.4)
    let breakPoint = random(100, windowHeight - 100)
    let shrinkRate
    let shrinkRate2
    // let newShrinkRate = random(0.04, 0.06)
    // let newShrinkRate2 = newShrinkRate * 1.3
    let newShrinkRate
    let newShrinkRate2
    let noi = random(-12, 12)
    let noiChange = 0.01
    let angle = 0
    let aChange = random(-0.005, 0.005)
    let roX
    let roY
    let roChangeX = 0
    let roChangeY = 0
    let R = 33
    let G = 195
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)

  }


}

function reset() {
  if (chBox1.checked()) {
    background(220)
  }
  for (let i = 0; i < 180; i++) {
    // let startX = windowWidth
    let startX
    if (chBox2.checked()) {
      startX = random(windowWidth)
    } else {
      startX = windowWidth / 2
    }
    let startY = height
    let bWidth = 84
    let bHeight = bWidth * 1.3
    let speedX
    let speedY
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.4)
    let breakPoint = random(100, windowHeight - 100)
    let shrinkRate
    let shrinkRate2
    // let newShrinkRate = random(0.04, 0.06)
    // let newShrinkRate2 = newShrinkRate * 1.3
    let newShrinkRate
    let newShrinkRate2
    let noi = random(-12, 12)
    let noiChange = 0.01
    let angle = 0
    let aChange = random(-0.005, 0.005)
    let roX
    let roY
    let roChangeX = 0
    let roChangeY = 0
    let R = 33
    let G = 195
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)

  }
}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }
  // noStroke()
  fill(0, 3)
  stroke(0, 1)
  textSize(26)
  text('windX', 80, 33)
  text('windY', 80, 53)
  text('roX', 80, 73)
  text('roY', 80, 93)
  text('noise', 80, 113)
  text('shrink-', 80, 133)
  text('shrink', 80, 153)
}var serial;
let serialValue1
let serialValue2
let serialValue3
let serialValue4

let angle=0

let x = 550
let y = 300
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0


function setup() {
  // angleMode(DEGREES);
  // rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(70)
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1411");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  let splitString = split(currentString, ',')

  // var currentString = serial.read()
  if (currentString) {
    serialValue1 = int(splitString[0]);
    serialValue2 = int(splitString[1]);
    serialValue3 = int(splitString[2]);
    serialValue4 = int(splitString[3]);
      
    console.log(splitString[0] + "    " + splitString[1] + "    " + splitString[2] + "    " + splitString[3]);
  
  }
  }

  // Methods available
  // serial.read() returns a single byte of data (first in the buffer)
  // serial.readChar() returns a single char 'A', 'a'
  // serial.readBytes() returns all of the data available as an array of bytes
  // serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
  // serial.readString() retunrs all of the data available as a string
  // serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
  // serial.last() returns the last byte of data from the buffer
  // serial.lastChar() returns the last byte of data from the buffer as a char
  // serial.clear() clears the underlying serial buffer
  // serial.available() returns the number of bytes available in the buffer

  function draw() {
    
    // Polling method
    // if (serial.available() > 0) {
    // var data = serial.read();
    
  translate(x,y)
  rotate(angle)
  let h = map(sin(angle),-0.02,0.02,22,133);
  let w = map(tan(angle),-0.1,0.1,12,120);
  fill(w/2,1)
	// noFill()
  // stroke(220,15,89,179)
	stroke(h/3,72)
  strokeWeight(1.5)
  drawEllipse(0,0,w,h)
  drawEllipse(120,40,w,h)
  angle += 0.002

  x+=(xspeed[xsp])
  y+=(yspeed[ysp])
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}

    // }

  }
function drawEllipse(x,y,d,d){
ellipse(serialValue4,serialValue3,serialValue2,serialValue2)
  rect(serialValue3,serialValue4,d,d)
  
  if(d > 4){
    //  drawEllipse(x-d ,y,d)
    // drawEllipse(x-d,y-d,d)
    // drawEllipse(x, y-d,d)
  	drawEllipse(x+d*0.5,y,d*0.5)
    drawEllipse(x-d*0.5,y,d*0.5)
    drawEllipse(x, y-d*0.5,d*0.5)
  }
}let serial;
let serialValue1
let serialValue2
let serialValue3
let serialValue4
let serialValue5
// let t1
// let t2
// let t3
// let t4


let branches = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  for (let i = 0; i < 180; i++) {
    let t1
    let t2
    let t3
    let t4
    let startX = windowWidth / 2
    let startY = windowHeight
    let bWidth = 884
    let bHeight = bWidth * 1.3
    let speedX
    let speedY
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.4)
    let breakPoint = random(100, windowHeight - 100)
    let shrinkRate
    let shrinkRate2
    // let newShrinkRate = random(0.04, 0.06)
    // let newShrinkRate2 = newShrinkRate * 1.3
    let newShrinkRate
    let newShrinkRate2
    let noi = random(-12, 12)
    let noiChange
    let angle = 0
    let aChange = random(-0.005, 0.005)
    let roX
    let roY
    let roChangeX = 0
    let roChangeY = 0
    let R = 33
    let G = 195
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)

  }

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1431");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);

}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  let splitString = split(currentString, ',')

  // var currentString = serial.read()
  if (currentString) {
    serialValue1 = int(splitString[0]);
    serialValue2 = int(splitString[1]);
    serialValue3 = int(splitString[2]);
    serialValue4 = int(splitString[3]);
    serialValue5 = int(splitString[4]);



    console.log(splitString[0] + "    " + splitString[1] + "    " + splitString[2] + "    " + splitString[3] + "    " + splitString[4]);

  }


}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer

function draw() {

  for (let i = 0; i < branches.length; i++) {
    // branches[i].run()
    // t1 = serialValue1 / 10
    // t2 = serialValue2 / 10
    // t3 = serialValue3 / 10
    // t4 = serialValue4 / 10
    t1 = 10
    t2 = 10
    t3 =  10
    t4 =  10
    
    branches[i].growth(t1, t2, t3, t4)
    branches[i].show()


    // branches[i].growth(serialValue1, serialValue2, serialValue3, serialValue4)

  }
  // Polling method
  // if (serial.available() > 0) {
  // var data = serial.read();
  // ellipse(200, 200, serialValue1, serialValue2);
  // }

}let branches = [];
let sliderWind
let sliderWind2
let sliderTurn
let sliderWater
let sliderNoise

function setup() {
  // createCanvas(900, 700)
  createCanvas(windowWidth, windowHeight)
  background(220)
  textAlign(RIGHT)
  text('wind', 37, 33)
  text('wind2', 37, 53)
  text('turn', 37, 73)
  text('shrink', 37, 93)
  text('noise', 37, 113)

  sliderWind = createSlider(-30, 30, 0)
  sliderWind2 = createSlider(-30, 30, 0)
  sliderTurn = createSlider(-200, 200, 0)
  sliderWater = createSlider(-100, 100, 0)
  sliderNoise = createSlider(0, 100, 40)
  sliderWind.position(42, 20)
  sliderWind2.position(42, 40)
  sliderTurn.position(42, 60)
  sliderWater.position(42, 80)
  sliderNoise.position(42, 100)
  // let sun =map(sliderSun.value(),-30,30,-0.3,0.3)
  angleMode(DEGREES)
  rectMode(CENTER)
  for (let i = 0; i < 250; i++) {
    // let branchX = 450
    // let branchY = 700
    let branchX = windowWidth/2
    // let branchX = random(windowWidth)
    let branchY = windowHeight
    let branchWidth = 90
    let branchHeight = branchWidth * 1.3
    // let shrinkRate = random(0.1, 0.2)
    let shrinkRate
    let shrinkRate2
    // let branchXspd = random(-0.3, 0.3)
    let branchXspd
    let branchYspd
    let n = random(0.5, 12)
    let nChange
    let a = random(-41, 41)
    // let aChange = random(-0.5,0.5)
    let aChange
    branches[i] = new Branch(branchX, branchY, branchWidth,
      branchHeight, shrinkRate, shrinkRate2, branchXspd,
      branchYspd, n, nChange, a, aChange)
  }

}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run();
  }

  // if (branchY < 600) {
  //   let branch = new Branch(barnchX, branchY - 100, branchWidth - 33,
  //     shrinkRate - 0.1, brachXspd + 0.4, branchYspd - 0.3);
  //   branches.push(branch);
  // }

}

// function mousePressed() {


//   print(branches);


// }

// let n = 1
// let inc = 0.2
// let gxspdraw = 0
// let gyspdraw = 0.9
// let gydraw 
// let gddraw = 135
// let gxdraw

// function setup() {
//   // createCanvas(400, 760);
//     createCanvas(windowWidth, windowHeight);

//   background(220);
//   gxdraw = windowWidth/2
//   gydraw = windowHeight
//   }

// function draw() {
//   growth(windowWidth/2, windowHeight, 135, 0, 0.9)
// 	// gydraw -= gyspdraw
// 	// gddraw -= inc

//   if (gydraw<600) {growth(gxdraw, gydraw/10*9,gddraw/2,gxspdraw,gyspdraw)
//                   gxspdraw=0.5}


// }

// function growth(gx, gy, gd, gxsp, gysp) {
//   ellipse(gx + noise(n) * 52, gy, gd)
//   n += 0.01
//  	gy -= gysp
//   gx -= gx
// 	gddrawå -= inc

//   if (gd < 0) {
//     noStroke(); noFill()
//   } else {
//     fill(gy / 3, 202, gy / 5)
//     strokeWeight(0.6)
//   }


// }let branches = []
let sliderWindX
let sliderWindY
let sliderRoX
let sliderRoY
let sliderNoise
let sliderShrinkNeg
let sliderShrink


function setup() {
  // angleMode(DEGREES)
  // rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(220);
  textAlign(RIGHT)
  // text('windX', 37, 33)
  // text('windY', 37, 53)
  // text('roX', 37, 73)
  // text('roY', 37, 93)
  // text('turn', 37, 113)
  // text('noise', 37, 133)
  // text('shrink', 37, 153)

  sliderWindX = createSlider(-30, 30, 0)
  sliderWindY = createSlider(-30, 30, 0)
  sliderRoX = createSlider(-100, 100, 0)
  sliderRoY = createSlider(-100, 100, 0)
  sliderNoise = createSlider(0, 100, 30)
  sliderShrinkNeg = createSlider(-100, 0, 0)
  sliderShrink = createSlider(0, 100, 0)
  sliderWindX.position(82, 20)
  sliderWindY.position(82, 40)
  sliderRoX.position(82, 60)
  sliderRoY.position(82, 80)
  sliderNoise.position(82, 100)
  sliderShrinkNeg.position(82, 120)
  sliderShrink.position(82, 140)


  for (let i = 0; i < 180; i++) {
    // let startX = windowWidth / 2
    let startX = random(windowWidth)
    let startY = height
    let bWidth = 84
    let bHeight = bWidth * 1.3
    let speedX
    let speedY
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.4)
    let breakPoint = random(100, windowHeight - 100)
    let shrinkRate
    let shrinkRate2
    // let newShrinkRate = random(0.04, 0.06)
    // let newShrinkRate2 = newShrinkRate * 1.3
    let newShrinkRate
    let newShrinkRate2
    let noi = random(-12, 12)
    let noiChange = 0.01
    let angle = 0
    let aChange = random(-0.005,0.005)
    let roX
    let roY
    let roChangeX = 0
    let roChangeY = 0
    let R = 33
    let G = 195
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)

  }


}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }
  // noStroke()
  fill(0,3)
  stroke(0,1)
  textSize(26)
  text('windX', 80, 33)
  text('windY', 80, 53)
  text('roX', 80, 73)
  text('roY', 80, 93)
  text('noise', 80, 113)
  text('shrink-', 80, 133)
  text('shrink', 80, 153)
}let branches = []
let sliderWindX
let sliderWindY
let sliderRoX
let sliderRoY
let sliderNoise

function setup() {
  // angleMode(DEGREES)
  // rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(220);
  textAlign(RIGHT)
  text('windX', 37, 33)
  text('windY', 37, 53)
  text('roX', 37, 73)
  text('roY', 37, 93)
  text('noise', 37, 113)

  sliderWindX = createSlider(-30, 30, 0)
  sliderWindY = createSlider(-30, 30, 0)
  sliderRoX = createSlider(-100, 100, 0)
  sliderRoY = createSlider(-100, 100, 0)
  sliderNoise = createSlider(0, 100, 40)
  sliderWindX.position(42, 20)
  sliderWindY.position(42,40)
  sliderRoX.position(42, 60)
  sliderRoY.position(42, 80)
  sliderNoise.position(42, 100)

  for (let i = 0; i < 180; i++) {
    let startX = windowWidth / 2
    let startY = height
    let bWidth = 154 
    let bHeight = bWidth * 1.3
    let speedX
    let speedY 
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.4)
    let breakPoint = random(windowHeight-100)
    let shrinkRate = 0.01
    let shrinkRate2 = shrinkRate * 1.3
    // let newShrinkRate = random(0.04, 0.06)
    // let newShrinkRate2 = newShrinkRate * 1.3
    let newShrinkRate
    let newShrinkRate2
    let noi = random(-12, 12)
    let noiChange = 0.01
    let angle = 0
    let aChange = random(-0.01, 0.01)
    let roX 
    let roY 
    let roChangeX = 0
    let roChangeY = 0
    let R = 33
    let G = 195
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)

  }


}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }

}let branches = []
let sliderWindX
let sliderWindY
let sliderTurn
let sliderWater
let sliderNoise

function setup() {
  // angleMode(DEGREES)
  // rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(220);
  textAlign(RIGHT)
  text('windX', 37, 33)
  text('windY', 37, 53)
  text('turn', 37, 73)
  text('shrink', 37, 93)
  text('noise', 37, 113)

  sliderWindX = createSlider(-30, 30, 0)
  sliderWindY = createSlider(-30, 30, 0)
  sliderTurn = createSlider(-100, 100, 0)
  sliderWater = createSlider(10, 100, 21)
  sliderNoise = createSlider(0, 100, 40)
  sliderWindX.position(42, 20)
  sliderWindY.position(42,40)
  sliderTurn.position(42, 60)
  sliderWater.position(42, 80)
  sliderNoise.position(42, 100)

  for (let i = 0; i < 180; i++) {
    let startX = windowWidth / 2
    let startY = height
    let bWidth = 154
    let bHeight = bWidth * 1.3
    let speedX
    let speedY 
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.4)
    let breakPoint = random(windowHeight-100)
    let shrinkRate = 0.01
    let shrinkRate2 = shrinkRate * 1.3
    // let newShrinkRate = random(0.04, 0.06)
    // let newShrinkRate2 = newShrinkRate * 1.3
    let newShrinkRate
    let newShrinkRate2
    let noi = random(-12, 12)
    let noiChange = 0.01
    let angle = 0
    let aChange = random(-0.01, 0.01)
    let roX = 0
    let roY = 0
    let roChangeX = 0
    let roChangeY = 0
    let R = 33
    let G = 195
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)

  }


}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }

}let branches = []


function setup() {
  // angleMode(DEGREES)
  // rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(220);
  for (let i = 0; i < 180; i++) {
    let startX = windowWidth/2
    let startY = height
    let bWidth = 154
    let bHeight = bWidth * 1.3
    let speedX = random(-0.05,0.05)
    let speedY = 0.5
    let speedX2 = random(-0.5,0.5)
    let speedY2 = random(0.4)
    let breakPoint = random(0, 750)
    let shrinkRate = 0.1
    let shrinkRate2 = shrinkRate * 1.3
    // let newShrinkRate = random(0.04, 0.06)
    // let newShrinkRate2 = newShrinkRate * 1.3
    let newShrinkRate 
    let newShrinkRate2 
    let noi = random(-12, 12)
    let noiChange = 0.01
    let angle = 0
    let aChange = random(-0.01, 0.01)
    let roX = 0
    let roY = 0
    let roChangeX = 0
    let roChangeY = 0
    let R = 33
    let G = 195
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)

  }


}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }

}let branches = []


function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(220);
  for (let i = 0; i < 180; i++) {
    let startX = windowWidth/2
    let startY = height
    let bWidth = 54
    let bHeight = bWidth * 1.3
    let speedX = random(-0.05,0.05)
    let speedY = 0.8
    let speedX2 = random(-1, 1)
    let speedY2 = random(0.7)
    let breakPoint = random(220, 350)
    let shrinkRate = 0.03
    let shrinkRate2 = shrinkRate * 1.3
    // let newShrinkRate = random(0.04, 0.06)
    // let newShrinkRate2 = newShrinkRate * 1.3
    let newShrinkRate 
    let newShrinkRate2 
    let noi = random(0.5, 12)
    let noiChange = 0.01
    let angle = 0
    let aChange = random(-0.3, 0.3)
    let roX = 0
    let roY = 0
    let roChangeX = 0
    let roChangeY = 0
    let R = 33
    let G = 195
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)

  }


}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }

}let branches = []


function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(220);
  for (let i = 0; i < 180; i++) {
    let startX = windowWidth/2
    let startY = height
    let bWidth = 44
    let bHeight = bWidth * 1.3
    let speedX = random(-0.05,0.05)
    let speedY = 0.8
    let speedX2 = random(-0.6, 0.6)
    let speedY2 = random(0.4)
    let breakPoint = random(-20, (height - 160))
    let shrinkRate = 0.02
    let shrinkRate2 = shrinkRate * 1.3
    // let newShrinkRate = random(0.04, 0.06)
    // let newShrinkRate2 = newShrinkRate * 1.3
    let newShrinkRate 
    let newShrinkRate2 
    let noi = random(0.5, 12)
    let noiChange = 0.01
    let angle = 0
    let aChange = random(-0.3, 0.3)
    let roX = 0
    let roY = 0
    let roChangeX = 0
    let roChangeY = 0
    let R = 33
    let G = 195
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)

  }


}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }

}let branches = []


function setup() {
  angleMode(DEGREES)
  createCanvas(windowWidth, windowHeight);
  background(220);
  for (let i = 0; i < 180; i++) {
    let startX = windowWidth/2
    let startY = height
    let bWidth = 44
    let bHeight = bWidth * 1.3
    let speedX = 0
    let speedY = 0.8
    let speedX2 = random(-0.7, 0.7)
    let speedY2 = random(0.4)
    let breakPoint = random(-20, (height - 160))
    let shrinkRate = 0.02
    let shrinkRate2 = shrinkRate * 1.3
    let newShrinkRate = random(0.04, 0.06)
    let newShrinkRate2 = newShrinkRate * 1.3
    let noi = random(0.5, 12)
    let noiChange = 0.01
    let angle = 0
    let aChange = random(-0.3, 0.3)
    let roX = random(-10,10)
    let roY = 0
    let roChangeX = 0
    let roChangeY = 0
    let R = 33
    let G = 195
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)

  }


}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }

}let branches = []


function setup() {
  angleMode(DEGREES)
  createCanvas(windowWidth, windowHeight);
  background(220);
  for (let i = 0; i < 180; i++) {
    let startX = windowWidth/2
    let startY = height
    let bWidth = 44
    let bHeight = bWidth * 1.3
    let speedX = 0
    let speedY = 0.8
    let speedX2 = random(-0.7, 0.7)
    let speedY2 = random(0.1, 0.4)
    let breakPoint = random(-20, (height - 160))
    let shrinkRate = 0.01
    let shrinkRate2 = shrinkRate * 1.3
    let newShrinkRate = random(0.04, 0.06)
    let newShrinkRate2 = newShrinkRate * 1.3
    let noi = random(0.5, 12)
    let noiChange = 0.01
    let angle = 0
    let aChange = random(-0.3, 0.3)
    let roX = random(-10,10)
    let roY = 0
    let roChangeX = 0
    let roChangeY = 0
    let R = 33
    let G = 195
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)

  }


}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }

}let branches = []


function setup() {
  angleMode(DEGREES)
  createCanvas(windowWidth, windowHeight);
  background(220);
  for (let i = 0; i < 180; i++) {
    let startX = random(windowWidth)
    let startY = height
    let bWidth = 110
    let bHeight = bWidth * 1.3
    let speedX = 0
    let speedY = 0.8
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.1, 0.8)
    let breakPoint = random(-20, (height - 60))
    let shrinkRate = 0.07
    let shrinkRate2 = shrinkRate * 1.3
    let newShrinkRate = random(0.2, 0.3)
    let newShrinkRate2 = newShrinkRate * 1.3
    let noi = random(0.5, 12)
    let noiChange = 0.01
    let angle = 0
    let aChange = random(-0.3, 0.3)
    let roX = 100
    let roY = 100
    let roChangeX = random(0.1,1)
    let roChangeY = random(0.1,1)
    let R = 33
    let G = 195
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2,
      breakPoint, shrinkRate, shrinkRate2, newShrinkRate,
      newShrinkRate2, noi, noiChange, angle, aChange,
      roX, roY, roChangeX, roChangeY, R, G, B)

  }


}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }

}let branches = []


function setup() {
  angleMode(DEGREES)
  createCanvas(windowWidth, windowHeight);
  background(220);
  for (let i = 0; i < 180; i++) {
    let startX = windowWidth/2
    let startY = height
    let bWidth = 110
    let bHeight = bWidth * 1.3
    let speedX = 0
    let speedY = 0.8
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.1,0.8)
    let breakPoint = random(-20,(height-60))
    let shrinkRate = 0.07
    let shrinkRate2 = shrinkRate * 1.3
    let newShrinkRate = random(0.2, 0.3)
    let newShrinkRate2 = newShrinkRate * 1.3
    let noi = random(0.5, 12)
    let noiChange = 0.01
    let angle = 0
    let aChange = random(-0.7,0.7)
    let R = 33
    let G = 195
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2, breakPoint,
      shrinkRate, shrinkRate2, newShrinkRate, newShrinkRate2,
      noi, noiChange, angle, aChange, R, G, B)

  }

 
}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }

}let branches = []


function setup() {
  angleMode(DEGREES)
  createCanvas(windowWidth, windowHeight);
  background(220);
  for (let i = 0; i < 180; i++) {
    let startX = windowWidth/2
    let startY = height
    let bWidth = 110
    let bHeight = bWidth * 1.3
    let speedX = 0
    let speedY = 0.8
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.1,0.8)
    let breakPoint = random(-20,(height-60))
    let shrinkRate = 0.07
    let shrinkRate2 = shrinkRate * 1.3
    let newShrinkRate = random(0.2, 0.3)
    let newShrinkRate2 = newShrinkRate * 1.3
    let noi = random(0.5, 12)
    let noiChange = 0.01
    let angle = 0
    let aChange = random(-0.7,0.7)
    let R = 33
    let G = 195
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2, breakPoint,
      shrinkRate, shrinkRate2, newShrinkRate, newShrinkRate2,
      noi, noiChange, angle, aChange, R, G, B)

  }

 
}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }

}let branches = []
let branches2 = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  for (let i = 0; i < 100; i++) {
    let startX = random(windowWidth)
    let startY = height
    let bWidth = 110
    let bHeight = bWidth * 1.3
    let speedX = 0
    let speedY = random(0.3,0.8)
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.1,0.8)
    let breakPoint = random(-20,(height-60))
    let shrinkRate = 0.07
    let shrinkRate2 = shrinkRate * 1.3
    let newShrinkRate = random(0.1, 0.3)
    let newShrinkRate2 = newShrinkRate * 1.3
    let noi = random(0.5, 12)
    let noiChange = 0.01
    let angle = 0
    // let aChange
    let R = 33
    let G = 195
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2, breakPoint,
      shrinkRate, shrinkRate2, newShrinkRate, newShrinkRate2,
      noi, noiChange, angle, R, G, B)

  }

  for (let r = 0; r < 100; r++) {
    let startX = random(windowWidth)
    let startY = 0
    let bWidth = 110
    let bHeight = bWidth * 1.3
    let speedX = 0
    let speedY = random(0.3,0.8)
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.1,0.8)
    let breakPoint = random(120,(height-60))
    let shrinkRate = 0.07
    let shrinkRate2 = shrinkRate * 1.3
    let newShrinkRate = random(0.1, 0.3)
    let newShrinkRate2 = newShrinkRate * 1.3
    let noi = random(0.5, 12)
    let noiChange = 0.01
    let angle = 0
    // let aChange
    let R = 33
    let G = 195
    let B = 99
    branches2[r] = new branch2(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2, breakPoint,
      shrinkRate, shrinkRate2, newShrinkRate, newShrinkRate2,
      noi, noiChange, angle, R, G, B)

  }
}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }
   for (let r = 0; r < branches2.length; r++) {
    branches2[r].run()
  }
}let branches = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  for (let i = 0; i < 185; i++) {
    let startX = random(windowWidth)
    let startY = height
    let bWidth = 110
    let bHeight = bWidth * 1.3
    let speedX = 0
    let speedY = 0.7
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(0.1,0.8)
    let breakPoint = random(-20,(height-60))
    let shrinkRate = 0.07
    let shrinkRate2 = shrinkRate * 1.3
    let newShrinkRate = random(0.1, 0.3)
    let newShrinkRate2 = newShrinkRate * 1.3
    let noi = random(0.5, 12)
    let noiChange = 0.01
    let angle
    let R = 33
    let G = 195
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2, breakPoint,
      shrinkRate, shrinkRate2, newShrinkRate, newShrinkRate2,
      noi, noiChange, angle, R, G, B)

  }
}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }
}let branches = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  for (let i = 0; i < 95; i++) {
    let startX = windowWidth / 2
    let startY = height
    let bWidth = 110
    let bHeight = bWidth * 1.3
    let speedX = 0
    let speedY = 0.7
    let speedX2 = random(-0.5, 0.5)
    let speedY2 = random(-2.8,0.8)
    let breakPoint = random(0,(height-60))
    let shrinkRate = 0.07
    let shrinkRate2 = shrinkRate * 1.3
    let newShrinkRate = random(0.1, 0.3)
    let newShrinkRate2 = newShrinkRate * 1.3
    let noi = random(0.5, 12)
    let noiChange = 0.01
    let angle
    let R = 33
    let G = 195
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2, breakPoint,
      shrinkRate, shrinkRate2, newShrinkRate, newShrinkRate2,
      noi, noiChange, angle, R, G, B)

  }
}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }
}let branches = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  for (let i = 0; i < 120; i++) {
    let startX = windowWidth / 2
    let startY = height
    let bWidth = 110
    let bHeight = bWidth * 1.3
    let speedX = 0
    let speedY = 0.8
    let speedX2 = random(-0.3, 0.3)
    let speedY2 = random(0.16)
    let breakPoint = random(height)
    let shrinkRate = 0.1
    let shrinkRate2 = shrinkRate * 1.3
    let newShrinkRate = random(0.1, 0.3)
    let newShrinkRate2 = newShrinkRate * 1.3
    let noi = random(1, 22)
    let noiChange = 0.1
    let angle
    let R = 33
    let G = 166
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, speedX2, speedY2, breakPoint,
      shrinkRate, shrinkRate2, newShrinkRate, newShrinkRate2,
      noi, noiChange, angle, R, G, B)

  }
}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }
}let branches = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  for (let i = 0; i < 120; i++) {
    let startX = random(700,800)
    let startY = height
    let bWidth = 110
    let bHeight = bWidth * 1.3
    let speedX = random(-1,1)
    let speedY = 0.5
    let breakPoint = random(height)
    let shrinkRate = 0.1
    let shrinkRate2 = shrinkRate * 1.3
    let noi = random(1, 22)
    let noiChange = 0.1
    let angle
    let R = 33
    let G = 166
    let B = 99
    branches[i] = new branch(startX, startY, bWidth,
      bHeight, speedX, speedY, breakPoint, shrinkRate,
      shrinkRate2, noi, noiChange, angle, R, G, B)

  }
}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run()
  }
}let flowers = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(20);
  for (let i = 0; i < 62; i++) {
    let indX = width/2
    let indY = height/2
    let flx
    let fly
    let nChange = random(0.00001, 0.1)
    let flw = random(381, 400)
    let flh = flw 
    let a
    let r
    let n = 0
    let c = 22
    let cChange = 0
    let angle = random(360)
    let angleChange = random(0.8, 0.9)
    let flwShrink = 0.4
    let flhShrink = 0.4
    // let flwShrink = random(0.07,0.5)
    // let flhShrink = flwShrink 
    let R = random(100,190)
    let G = random(80,140)
    let B = random(55,140)
    // let flwShrink
    // let flhShrink
    let magicN = 137.5
    flowers[i] = new Flower(indX, indY, flx, fly, flw, flh,
      a, r, n, nChange, c, cChange, angle, angleChange,
      flwShrink, flhShrink, magicN, R, G, B)
  }
  

}

function draw() {
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].run()
    // flowers[i].bloom()
    // flowers[i].show()
    
    
  }
  
}let flowers = []

function setup() {
  // angleMode(DEGREES)
  // rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(20);
  for (let i = 0; i < 62; i++) {
    let indX = width/2
    let indY = height/2
    let flx
    let fly
    let nChange = random(0.00001, 0.0001)
    let flw = random(100, 200)
    let flh = flw 
    let a
    let r
    let n = 0
    let c = 0.05
    let cChange = 0
    let angle = random(360)
    let angleChange = random(0.8, 0.9)
    let flwShrink = 0.6
    let flhShrink = 0.6
    // let flwShrink = random(0.07,0.5)
    // let flhShrink = flwShrink 
    let R = random(100,250)
    let G = random(80,120)
    let B = random(55,130)
    // let flwShrink
    // let flhShrink
    let magicN = 137.5
    flowers[i] = new Flower(indX, indY, flx, fly, flw, flh,
      a, r, n, nChange, c, cChange, angle, angleChange,
      flwShrink, flhShrink, magicN, R, G, B)
  }
  

}

function draw() {
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].run()
    // flowers[i].bloom()
    // flowers[i].show()
    
    
  }
  
}let flowers = []

function setup() {
  // angleMode(DEGREES)
  // rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(20);
  for (let i = 0; i < 62; i++) {
    let indX = width/2
    let indY = height/2
    let flx
    let fly
    let nChange = random(0.001, 0.05)
    let flw = random(100, 200)
    let flh = flw 
    let a
    let r
    let n = 0
    let c = 6
    let cChange = 0
    let angle = random(360)
    let angleChange = random(0.8, 0.9)
    let flwShrink = 0.3
    let flhShrink = 0.3
    // let flwShrink = random(0.07,0.5)
    // let flhShrink = flwShrink 
    let R = random(100,150)
    let G = random(80,100)
    let B = random(55,85)
    // let flwShrink
    // let flhShrink
    let magicN = 137.3
    flowers[i] = new Flower(indX, indY, flx, fly, flw, flh,
      a, r, n, nChange, c, cChange, angle, angleChange,
      flwShrink, flhShrink, magicN, R, G, B)
  }
  

}

function draw() {
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].run()
    // flowers[i].bloom()
    // flowers[i].show()
    
    
  }
  
}let flowers = []

function setup() {
  // angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(20);
  for (let i = 0; i < 32; i++) {
    let indX = width/2
    let indY = height/2
    let flx
    let fly
    let nChange = random(0.001, 0.08)
    let flw = random(300, 400)
    let flh = flw 
    let a
    let r
    let n = 0
    let c = 18
    let cChange = 0
    let angle = random(360)
    let angleChange = random(0.8, 0.9)
    let flwShrink = 0.2
    let flhShrink = 0.2
    // let flwShrink = random(0.07,0.5)
    // let flhShrink = flwShrink 
    let R = random(100,150)
    let G = random(80,100)
    let B = random(55,85)
    // let flwShrink
    // let flhShrink
    let magicN = 137.3
    flowers[i] = new Flower(indX, indY, flx, fly, flw, flh,
      a, r, n, nChange, c, cChange, angle, angleChange,
      flwShrink, flhShrink, magicN, R, G, B)
  }
  

}

function draw() {
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].run()
    // flowers[i].bloom()
    // flowers[i].show()
    
    
  }
  
}let flowers = []

function setup() {
  // angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(20);
  for (let i = 0; i < 32; i++) {
    let indX = width/2
    let indY = height/2
    let flx
    let fly
    let nChange = random(0.001, 0.08)
    let flw = random(300, 400)
    let flh = flw 
    let a
    let r
    let n = 0
    let c = 18
    let cChange = 0
    let angle = random(360)
    let angleChange = random(0.8, 0.9)
    let flwShrink = 0.05
    let flhShrink = 0.05
    // let flwShrink = random(0.07,0.5)
    // let flhShrink = flwShrink 
    let R = random(100,150)
    let G = random(80,100)
    let B = random(55,85)
    // let flwShrink
    // let flhShrink
    let magicN = 137.3
    flowers[i] = new Flower(indX, indY, flx, fly, flw, flh,
      a, r, n, nChange, c, cChange, angle, angleChange,
      flwShrink, flhShrink, magicN, R, G, B)
  }
  

}

function draw() {
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].run()
    // flowers[i].bloom()
    // flowers[i].show()
    
    
  }
  
}let flowers = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(20);
  for (let i = 0; i < 32; i++) {
    let indX = width/2
    let indY = height/2
    let flx
    let fly
    let nChange = random(0.001, 0.1)
    let flw = random(400, 500)
    let flh = flw 
    let a
    let r
    let n = 0
    let c = 21
    let cChange = 0
    let angle = random(360)
    let angleChange = random(0.8, 0.9)
    let flwShrink = 0.05
    let flhShrink = 0.05
    // let flwShrink = random(0.07,0.5)
    // let flhShrink = flwShrink 
    let R = random(100,150)
    let G = random(80,100)
    let B = random(55,85)
    // let flwShrink
    // let flhShrink
    let magicN = 137.5
    flowers[i] = new Flower(indX, indY, flx, fly, flw, flh,
      a, r, n, nChange, c, cChange, angle, angleChange,
      flwShrink, flhShrink, magicN, R, G, B)
  }
  

}

function draw() {
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].run()
    // flowers[i].bloom()
    // flowers[i].show()
    
    
  }
  
}let flowers = []

function setup() {
  // angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(20);
  for (let i = 0; i < 32; i++) {
    let indX = width/2
    let indY = height/2
    let flx
    let fly
    let nChange = random(0.0005, 0.01)
    let flw = random(200, 500)
    let flh = flw 
    let a
    let r
    let n = 0
    let c = 21
    let cChange = 0
    let angle = random(360)
    let angleChange = random(0.8, 0.9)
    let flwShrink = 0.1
    let flhShrink = 0.1
    // let flwShrink = random(0.07,0.5)
    // let flhShrink = flwShrink 
    let R = random(100,150)
    let G = random(80,100)
    let B = random(55,85)
    // let flwShrink
    // let flhShrink
    let magicN = 137.5
    flowers[i] = new Flower(indX, indY, flx, fly, flw, flh,
      a, r, n, nChange, c, cChange, angle, angleChange,
      flwShrink, flhShrink, magicN, R, G, B)
  }
  

}

function draw() {
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].run()
    // flowers[i].bloom()
    // flowers[i].show()
    
    
  }
  
}let branches = [];
let sliderWind
let sliderWind2
let sliderTurn
let sliderWater
let sliderNoise

function setup() {
  // createCanvas(900, 700)
  createCanvas(windowWidth, windowHeight)
  background(220)
  textAlign(RIGHT)
  text('wind',37,33)
  text('wind2',37,53)
  text('turn',37,73)
  text('shrink',37,93)
  text('noise',37,113)

  sliderWind = createSlider(-30, 30, 0)
  sliderWind2 = createSlider(-30, 30, 0)
  sliderTurn = createSlider(-100, 100, 0)
  sliderWater = createSlider(0, 100, 21)
  sliderNoise = createSlider(0, 100, 40)
  sliderWind.position(42, 20)
  sliderWind2.position(42,40)
  sliderTurn.position(42, 60)
  sliderWater.position(42, 80)
  sliderNoise.position(42, 100)
  // let sun =map(sliderSun.value(),-30,30,-0.3,0.3)
  angleMode(DEGREES)
  rectMode(CENTER)
  for (let i = 0; i < 250; i++) {
    // let branchX = 450
    // let branchY = 700
    let branchX = random(windowWidth)
    let branchY = windowHeight
    let branchWidth = 90
    let branchHeight = branchWidth * 1.3
    // let shrinkRate = random(0.1, 0.2)
    let shrinkRate
    let shrinkRate2
    // let branchXspd = random(-0.3, 0.3)
    let branchXspd
    let branchYspd
    let n = random(0.5, 12)
    let nChange
    let a = random(-41, 41)
    // let aChange = random(-0.5,0.5)
    let aChange
    branches[i] = new Branch(branchX, branchY, branchWidth,
      branchHeight, shrinkRate, shrinkRate2, branchXspd,
      branchYspd, n, nChange, a, aChange)
  }
	
}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run();
  }

  // if (branchY < 600) {
  //   let branch = new Branch(barnchX, branchY - 100, branchWidth - 33,
  //     shrinkRate - 0.1, brachXspd + 0.4, branchYspd - 0.3);
  //   branches.push(branch);
  // }

}

// function mousePressed() {


//   print(branches);


// }

// let n = 1
// let inc = 0.2
// let gxspdraw = 0
// let gyspdraw = 0.9
// let gydraw 
// let gddraw = 135
// let gxdraw

// function setup() {
//   // createCanvas(400, 760);
//     createCanvas(windowWidth, windowHeight);

//   background(220);
//   gxdraw = windowWidth/2
//   gydraw = windowHeight
//   }

// function draw() {
//   growth(windowWidth/2, windowHeight, 135, 0, 0.9)
// 	// gydraw -= gyspdraw
// 	// gddraw -= inc

//   if (gydraw<600) {growth(gxdraw, gydraw/10*9,gddraw/2,gxspdraw,gyspdraw)
//                   gxspdraw=0.5}


// }

// function growth(gx, gy, gd, gxsp, gysp) {
//   ellipse(gx + noise(n) * 52, gy, gd)
//   n += 0.01
//  	gy -= gysp
//   gx -= gx
// 	gddrawå -= inc

//   if (gd < 0) {
//     noStroke(); noFill()
//   } else {
//     fill(gy / 3, 202, gy / 5)
//     strokeWeight(0.6)
//   }


// }let branches = [];
let flowers = []
let sliderSun

function setup() {
  // createCanvas(900, 700)
  createCanvas(windowWidth, windowHeight)
  background(220)

  sliderSun = createSlider(-30, 30, 0)
  sliderSun.position(20, 20)
  // let sun =map(sliderSun.value(),-30,30,-0.3,0.3)
  angleMode(DEGREES)
  rectMode(CENTER)
  for (let i = 0; i < 21; i++) {
    // let branchX = 450
    // let branchY = 700
    let branchX = random(windowWidth)
    let branchY = windowHeight
    let branchWidth = 90
    let branchHeight = branchWidth * 1.3
    let shrinkRate = random(0.1, 0.2)
    let shrinkRate2 = shrinkRate * 1.3
    // let branchXspd = random(-0.3, 0.3)
    let branchXspd
    let branchYspd = random(0.5, 0.7)
    let n = random(0.5, 12)
    let a = random(-11, 11)
    let aChange = random(-0.9, 0.9)
    branches[i] = new Branch(branchX, branchY, branchWidth,
      branchHeight, shrinkRate, shrinkRate2, branchXspd,
      branchYspd, n, a, aChange)
      
  }

for (let i2 = 0; i2 < 6; i2++) {
      let indX = branchX
      let indY = branchY
      let flx
      let fly
      let nChange = random(0.05, 0.1)
      let flw = random(78, 116)
      let flh = flw
      let a
      let r
      let n = 0
      let c = random(1, 6)
      let cChange = 0
      let angle = random(360)
      let angleChange = random(0.8, 0.9)
      let flwShrink = random(0.07, 0.5)
      let flhShrink = flwShrink
      let R = random(100, 150)
      let G = random(80, 100)
      let B = random(55, 85)
      // let flwShrink
      // let flhShrink
      let magicN = 137.6
      flowers[i2] = new Flower(indX, indY, flx, fly, flw, flh,
        a, r, n, nChange, c, cChange, angle, angleChange,
        flwShrink, flhShrink, magicN, R, G, B)
    }

}

function draw() {
  push()
  for (let i2 = 0; i2 < flowers.length; i2++) {
      flowers[i2].run()
    } 
  pop()
  for (let i = 0; i < branches.length; i++) {
    branches[i].run();
    }
}let branches = [];
let flowers = []
let sliderSun

function setup() {
  // createCanvas(900, 700)
  createCanvas(windowWidth, windowHeight)
  background(220)

  sliderSun = createSlider(-30, 30, 0)
  sliderSun.position(20, 20)
  // let sun =map(sliderSun.value(),-30,30,-0.3,0.3)
  angleMode(DEGREES)
  rectMode(CENTER)
  for (let i = 0; i < 51; i++) {
    // let branchX = 450
    // let branchY = 700
    let branchX = random(windowWidth)
    let branchY = windowHeight
    let branchWidth = 90
    let branchHeight = branchWidth * 1.3
    let shrinkRate = random(0.1, 0.2)
    let shrinkRate2 = shrinkRate * 1.3
    // let branchXspd = random(-0.3, 0.3)
    let branchXspd
    let branchYspd = random(0.5, 0.7)
    let n = random(0.5, 12)
    let a = random(-11, 11)
    let aChange = random(-0.9, 0.9)
    branches[i] = new Branch(branchX, branchY, branchWidth,
      branchHeight, shrinkRate, shrinkRate2, branchXspd,
      branchYspd, n, a, aChange)
      
  }

for (let i2 = 0; i2 < 76; i2++) {
      let indX = random(windowWidth)
      let indY = random(windowHeight/1.5, windowHeight)
      let flx
      let fly
      let nChange = random(0.05, 0.08)
      let flw = random(78, 116)
      let flh = flw
      let a
      let r
      let n = 0
      let c = random(1, 5)
      let cChange = 0
      let angle = random(360)
      let angleChange = random(0.8, 0.9)
      let flwShrink = random(0.15, 0.5)
      let flhShrink = flwShrink
      let R = random(100, 150)
      let G = random(80, 100)
      let B = random(55, 85)
      // let flwShrink
      // let flhShrink
      let magicN = 137.6
      flowers[i2] = new Flower(indX, indY, flx, fly, flw, flh,
        a, r, n, nChange, c, cChange, angle, angleChange,
        flwShrink, flhShrink, magicN, R, G, B)
    }

}

function draw() {
  push()
  for (let i2 = 0; i2 < flowers.length; i2++) {
      flowers[i2].run()
    } 
  pop()
  for (let i = 0; i < branches.length; i++) {
    branches[i].run();
    }
}let branches = [];
let sliderSun

function setup() {
  // createCanvas(900, 700)
  createCanvas(windowWidth, windowHeight)
  background(220)
  
  sliderSun = createSlider(-30,30,0)
  sliderSun.position(20,20)
  // let sun =map(sliderSun.value(),-30,30,-0.3,0.3)
  angleMode(DEGREES)
  rectMode(CENTER)
  for (let i = 0; i < 77; i++) {
    // let branchX = 450
    // let branchY = 700
    let branchX = random(windowWidth)
    let branchY = windowHeight
    let branchWidth = 90
    let branchHeight = branchWidth*1.3
    let shrinkRate = random(0.1, 0.2)
    let shrinkRate2 = shrinkRate*1.3
    // let branchXspd = random(-0.3, 0.3)
    let branchXspd
    let branchYspd = random(0.3, 0.9)
    let n = random(0.5, 12)
    let a = random(-11, 11)
    let aChange = random(-0.5,0.5)
    branches[i] = new Branch(branchX, branchY, branchWidth,
      branchHeight, shrinkRate, shrinkRate2, branchXspd,
      branchYspd, n, a, aChange)

  }

}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run();
  }

  // if (branchY < 600) {
  //   let branch = new Branch(barnchX, branchY - 100, branchWidth - 33,
  //     shrinkRate - 0.1, brachXspd + 0.4, branchYspd - 0.3);
  //   branches.push(branch);
  // }

}

// function mousePressed() {


//   print(branches);


// }

// let n = 1
// let inc = 0.2
// let gxspdraw = 0
// let gyspdraw = 0.9
// let gydraw 
// let gddraw = 135
// let gxdraw

// function setup() {
//   // createCanvas(400, 760);
//     createCanvas(windowWidth, windowHeight);

//   background(220);
//   gxdraw = windowWidth/2
//   gydraw = windowHeight
//   }

// function draw() {
//   growth(windowWidth/2, windowHeight, 135, 0, 0.9)
// 	// gydraw -= gyspdraw
// 	// gddraw -= inc

//   if (gydraw<600) {growth(gxdraw, gydraw/10*9,gddraw/2,gxspdraw,gyspdraw)
//                   gxspdraw=0.5}


// }

// function growth(gx, gy, gd, gxsp, gysp) {
//   ellipse(gx + noise(n) * 52, gy, gd)
//   n += 0.01
//  	gy -= gysp
//   gx -= gx
// 	gddrawå -= inc

//   if (gd < 0) {
//     noStroke(); noFill()
//   } else {
//     fill(gy / 3, 202, gy / 5)
//     strokeWeight(0.6)
//   }


// }let branches = [];

function setup() {
  // createCanvas(900, 700)
  createCanvas(windowWidth, windowHeight)
  background(220)
  angleMode(DEGREES)
  rectMode(CENTER)
  for (let i = 0; i < 7; i++) {
    // let branchX = 450
    // let branchY = 700
    let branchX = windowWidth/2
    let branchY = windowHeight
    let branchWidth = 90
    let branchHeight = branchWidth*1.3
    let shrinkRate = random(0.1, 0.2)
    let shrinkRate2 = shrinkRate*1.3
    let branchXspd = random(-0.3, 0.3)
    let branchYspd = random(0.3, 0.9)
    let n = random(0.5, 12)
    let a = random(-11, 11)
    let aChange = random(-0.9,0.9)
    branches[i] = new Branch(branchX, branchY, branchWidth,
      branchHeight, shrinkRate, shrinkRate2, branchXspd,
      branchYspd, n, a, aChange)

  }

}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run();
  }

  // if (branchY < 600) {
  //   let branch = new Branch(barnchX, branchY - 100, branchWidth - 33,
  //     shrinkRate - 0.1, brachXspd + 0.4, branchYspd - 0.3);
  //   branches.push(branch);
  // }

}

// function mousePressed() {


//   print(branches);


// }

// let n = 1
// let inc = 0.2
// let gxspdraw = 0
// let gyspdraw = 0.9
// let gydraw 
// let gddraw = 135
// let gxdraw

// function setup() {
//   // createCanvas(400, 760);
//     createCanvas(windowWidth, windowHeight);

//   background(220);
//   gxdraw = windowWidth/2
//   gydraw = windowHeight
//   }

// function draw() {
//   growth(windowWidth/2, windowHeight, 135, 0, 0.9)
// 	// gydraw -= gyspdraw
// 	// gddraw -= inc

//   if (gydraw<600) {growth(gxdraw, gydraw/10*9,gddraw/2,gxspdraw,gyspdraw)
//                   gxspdraw=0.5}


// }

// function growth(gx, gy, gd, gxsp, gysp) {
//   ellipse(gx + noise(n) * 52, gy, gd)
//   n += 0.01
//  	gy -= gysp
//   gx -= gx
// 	gddrawå -= inc

//   if (gd < 0) {
//     noStroke(); noFill()
//   } else {
//     fill(gy / 3, 202, gy / 5)
//     strokeWeight(0.6)
//   }


// }let flowers = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(20);
  for (let i = 0; i < 1; i++) {
    let indX = width/2
    let indY = height/2
    let flx
    let fly
    let nChange = random(0.05, 0.1)
    let flw = random(78, 116)
    let flh = flw 
    let a
    let r
    let n = 0
    let c = random(1, 6)
    let cChange = 0
    let angle = random(360)
    let angleChange = random(0.8, 0.9)
    let flwShrink = random(0.07,0.5)
    let flhShrink = flwShrink 
    let R = random(100,150)
    let G = random(80,100)
    let B = random(55,85)
    // let flwShrink
    // let flhShrink
    let magicN = 137.6
    flowers[i] = new Flower(indX, indY, flx, fly, flw, flh,
      a, r, n, nChange, c, cChange, angle, angleChange,
      flwShrink, flhShrink, magicN, R, G, B)
  }
  

}

function draw() {
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].run()
    // flowers[i].bloom()
    // flowers[i].show()
    
    
  }
  
}let flowers = []

function setup() {
  angleMode(DEGREES)
  // rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(20);
  for (let i = 0; i < 125; i++) {
    let indX = random(width)
    let indY = random(height)
    let flx
    let fly
    let nChange = random(0.05, 0.2)
    let flw = random(133, 166)
    let flh = flw * 1.2
    let a
    let r
    let n = 0
    
    let c = random(1, 6)
    let cChange = 0
    let angle = 0
    let angleChange = random(0.2, 0.9)
    let flwShrink = random(0.09,1)
    let flhShrink = flwShrink * 1.2
    let R = random(70,190)
    let G = random(70,100)
    let B = random(45,65)
    // let flwShrink
    // let flhShrink
    let magicN = 137.5
    flowers[i] = new Flower(indX, indY, flx, fly, flw, flh,
      a, r, n, nChange, c, cChange, angle, angleChange,
      flwShrink, flhShrink, magicN, R, G, B)
  }
}

function draw() {
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].run()
    // flowers[i].bloom()
    // flowers[i].show()
  }
}let flowers = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(220);
  for (let i = 0; i < 70; i++) {
    let indX = random(width)
    let indY = random(height)
    let flx
    let fly
    let flw = random(199, 279)
    let flh = flw * 1.2
    let a
    let r
    let n = 0
    let nChange = random(0.01, 0.2)
    let c = random(1, 6)
    let cChange = 0
    let angle = 0
    let angleChange = random(0.001, 5)
    let flwShrink = random(0.09,1)
    let flhShrink = flwShrink * 1.2
    let R = 0
    let G = 70
    let B = 0
    // let flwShrink
    // let flhShrink
    let magicN = 137.3
    flowers[i] = new Flower(indX, indY, flx, fly, flw, flh,
      a, r, n, nChange, c, cChange, angle, angleChange,
      flwShrink, flhShrink, magicN, R, G, B)
  }
}

function draw() {
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].run()
    // flowers[i].bloom()
    // flowers[i].show()
  }
}let flowers = []

function setup() {
  angleMode(DEGREES)
  // rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(220);
  for (let i = 0; i < 155; i++) {
    let indX = random(width)
    let indY = random(height)
    let flx
    let fly
    let flw = random(111,255)
    let flh = flw * 1.4
    let a
    let r
    let n = 0
    let nChange = random(0.001,0.01)
    let c = random(1,3)
    let cChange = 0
    let angle = 60
    let angleChange = random(0.01,0.1)
    let flwShrink = random(0.09,0.7)
    let flhShrink = flwShrink * 1.4
    flowers[i] = new Flower(indX, indY, flx, fly, flw, flh,
      a, r, n, nChange, c, cChange, angle, angleChange, flwShrink, flhShrink)
  }
}

function draw() {
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].run()
    // flowers[i].bloom()
    // flowers[i].show()
  }
}let flowers = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  background(220);
  for (let i = 0; i < 155; i++) {
    let indX = random(width)
    let indY = random(height)
    let flx
    let fly
    let flw = random(111,255)
    let flh = flw * 1.4
    let a
    let r
    let n = 0
    let nChange = random(0.001,0.05)
    let c = random(1,3)
    let cChange = 0
    let angle = 60
    let angleChange =0.01
    let flwShrink = random(0.01,0.1)
    let flhShrink = flwShrink * 1.4
    flowers[i] = new Flower(indX, indY, flx, fly, flw, flh,
      a, r, n, nChange, c, cChange, angle, angleChange, flwShrink, flhShrink)
  }
}

function draw() {
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].run()
    // flowers[i].bloom()
    // flowers[i].show()
  }
}let ns = 0
let n = 0
let c = 6
let wx = 260
let hx = 520
let angle = 0
let opcty = 61

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  angleMode(DEGREES)

}

function draw() {

  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;

  let r = c * sqrt(n);

  let x = r * cos(a) + width / 2
  let y = r * sin(a) + height / 2

  let h = map(sin(angle), -1, 1, 0, 50);
  let w = map(cos(angle), -1, 1, 0, 50);

  let nc = noise(ns) * 22
  translate(x, y)
  // rotate(a+22)
  rotate(angle)
  fill(90, x / 3, y / 4, 31.6)
  // fill(x / 3, y / 2, 90, 11.6)
  // stroke(y/2, x/6, 22,82)
  stroke(0, 71)
  strokeWeight(0.4)
  // rect(0,0,wx,hx)
  rect(0, 0, hx, wx)
  push()
  translate(0, 0)
  rotate(angle * 0.45)
  rect(0, 0, wx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(-(angle * 0.9))
  rect(0, 0, hx, wx)
  angle += 0.05
  pop()
  push()
  translate(0, 0)
  rotate(angle * 1.35)
  rect(0, 0, wx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(-(angle * 1.8))
  rect(0, 0, hx, wx)
  pop()
  
  push()
  translate(0, 0)
  rotate(angle * -0.45)
  rect(0, 0, wx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(-(angle * -0.9))
  rect(0, 0, wx, hx)
  angle += 0.05
  pop()
  push()
  translate(0, 0)
  rotate(angle * -1.35)
  rect(0, 0, wx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(-(angle * -1.8))
  rect(0, 0, hx, wx)
  pop()
  // push()
  // translate(x / 3, y / 3)
  // rotate(angle * 2.7)
  // fill( x / 2, y / 3,90, 31.6)
  // rect(0, 0, wx, wx)
  // pop()
  // push()
  // translate(x / 3, y / 3)
  // rotate(-(angle * 2.7))
  // fill(x / 3, y / 4, 90, 31.6)
  // rect(0, 0, wx, wx)
  // pop()
  // rect(0,0,w,h)
  // rect(0,0,wx,hx)
  angle += 0.1
  n += 0.001
  wx -= 0.2
  hx -= 0.4
  opcty -= 0.036
  ns += 0.1


  console.log(x, y)
}let branches = [];

function setup() {
  // createCanvas(900, 700)
  createCanvas(windowWidth, windowHeight)
  background(220)
  angleMode(DEGREES)
  rectMode(CENTER)
  for (let i = 0; i < 250; i++) {
    // let branchX = 450
    // let branchY = 700
    let branchX = windowWidth/2
    let branchY = windowHeight/2
    let branchWidth = 55
    let branchHeight = branchWidth*1.3
    let shrinkRate = random(0.1, 0.2)
    let shrinkRate2 = shrinkRate*1.3
    let branchXspd = random(-0.7, 0.7)
    let branchYspd = random(-0.7, 0.7)
    let n = random(0.5, 12)
    let a = random(-11, 11)
    let aChange = random(-0.9,0.9)
    branches[i] = new Branch(branchX, branchY, branchWidth,
      branchHeight, shrinkRate, shrinkRate2, branchXspd,
      branchYspd, n, a, aChange)

  }

}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run();
  }

  // if (branchY < 600) {
  //   let branch = new Branch(barnchX, branchY - 100, branchWidth - 33,
  //     shrinkRate - 0.1, brachXspd + 0.4, branchYspd - 0.3);
  //   branches.push(branch);
  // }

}

// function mousePressed() {


//   print(branches);


// }

// let n = 1
// let inc = 0.2
// let gxspdraw = 0
// let gyspdraw = 0.9
// let gydraw 
// let gddraw = 135
// let gxdraw

// function setup() {
//   // createCanvas(400, 760);
//     createCanvas(windowWidth, windowHeight);

//   background(220);
//   gxdraw = windowWidth/2
//   gydraw = windowHeight
//   }

// function draw() {
//   growth(windowWidth/2, windowHeight, 135, 0, 0.9)
// 	// gydraw -= gyspdraw
// 	// gddraw -= inc

//   if (gydraw<600) {growth(gxdraw, gydraw/10*9,gddraw/2,gxspdraw,gyspdraw)
//                   gxspdraw=0.5}


// }

// function growth(gx, gy, gd, gxsp, gysp) {
//   ellipse(gx + noise(n) * 52, gy, gd)
//   n += 0.01
//  	gy -= gysp
//   gx -= gx
// 	gddrawå -= inc

//   if (gd < 0) {
//     noStroke(); noFill()
//   } else {
//     fill(gy / 3, 202, gy / 5)
//     strokeWeight(0.6)
//   }


// }let branches = [];

function setup() {
  // createCanvas(900, 700)
  createCanvas(windowWidth, windowHeight)
  background(220)
  angleMode(DEGREES)
  rectMode(CENTER)
  for (let i = 0; i < 250; i++) {
    // let branchX = 450
    // let branchY = 700
    let branchX = windowWidth/2
    let branchY = windowHeight/2
    let branchWidth = 55
    let branchHeight = branchWidth*1.3
    let shrinkRate = random(0.1, 0.2)
    let shrinkRate2 = shrinkRate*1.3
    let branchXspd = random(-0.7, 0.7)
    let branchYspd = random(-0.7, 0.7)
    let n = random(0.5, 12)
    let a = random(-11, 11)
    let aChange = random(-0.9,0.9)
    branches[i] = new Branch(branchX, branchY, branchWidth,
      branchHeight, shrinkRate, shrinkRate2, branchXspd,
      branchYspd, n, a, aChange)

  }

}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run();
  }

  // if (branchY < 600) {
  //   let branch = new Branch(barnchX, branchY - 100, branchWidth - 33,
  //     shrinkRate - 0.1, brachXspd + 0.4, branchYspd - 0.3);
  //   branches.push(branch);
  // }

}

// function mousePressed() {


//   print(branches);


// }

// let n = 1
// let inc = 0.2
// let gxspdraw = 0
// let gyspdraw = 0.9
// let gydraw 
// let gddraw = 135
// let gxdraw

// function setup() {
//   // createCanvas(400, 760);
//     createCanvas(windowWidth, windowHeight);

//   background(220);
//   gxdraw = windowWidth/2
//   gydraw = windowHeight
//   }

// function draw() {
//   growth(windowWidth/2, windowHeight, 135, 0, 0.9)
// 	// gydraw -= gyspdraw
// 	// gddraw -= inc

//   if (gydraw<600) {growth(gxdraw, gydraw/10*9,gddraw/2,gxspdraw,gyspdraw)
//                   gxspdraw=0.5}


// }

// function growth(gx, gy, gd, gxsp, gysp) {
//   ellipse(gx + noise(n) * 52, gy, gd)
//   n += 0.01
//  	gy -= gysp
//   gx -= gx
// 	gddrawå -= inc

//   if (gd < 0) {
//     noStroke(); noFill()
//   } else {
//     fill(gy / 3, 202, gy / 5)
//     strokeWeight(0.6)
//   }


// }let branches = [];

function setup() {
  // createCanvas(900, 700)
  createCanvas(windowWidth, windowHeight)
  background(220)
  angleMode(DEGREES)
  rectMode(CENTER)
  for (let i = 0; i < 199; i++) {
    // let branchX = 450
    // let branchY = 700
    let branchX = random(windowWidth)
    let branchY = windowHeight
    let branchWidth = 155
    let branchHeight = branchWidth*1.2
    let shrinkRate = random(0.1, 0.7)
    let shrinkRate2 = shrinkRate*1.2
    let branchXspd = random(-0.7, 0.7)
    let branchYspd = random(0.1, 0.7)
    let n = random(0.5, 12)
    let a = random(-11, 11)
    let aChange = random(-0.9,0.9)
    branches[i] = new Branch(branchX, branchY, branchWidth,
      branchHeight, shrinkRate, shrinkRate2, branchXspd,
      branchYspd, n, a, aChange)

  }

}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run();
  }

  // if (branchY < 600) {
  //   let branch = new Branch(barnchX, branchY - 100, branchWidth - 33,
  //     shrinkRate - 0.1, brachXspd + 0.4, branchYspd - 0.3);
  //   branches.push(branch);
  // }

}

// function mousePressed() {


//   print(branches);


// }

// let n = 1
// let inc = 0.2
// let gxspdraw = 0
// let gyspdraw = 0.9
// let gydraw 
// let gddraw = 135
// let gxdraw

// function setup() {
//   // createCanvas(400, 760);
//     createCanvas(windowWidth, windowHeight);

//   background(220);
//   gxdraw = windowWidth/2
//   gydraw = windowHeight
//   }

// function draw() {
//   growth(windowWidth/2, windowHeight, 135, 0, 0.9)
// 	// gydraw -= gyspdraw
// 	// gddraw -= inc

//   if (gydraw<600) {growth(gxdraw, gydraw/10*9,gddraw/2,gxspdraw,gyspdraw)
//                   gxspdraw=0.5}


// }

// function growth(gx, gy, gd, gxsp, gysp) {
//   ellipse(gx + noise(n) * 52, gy, gd)
//   n += 0.01
//  	gy -= gysp
//   gx -= gx
// 	gddrawå -= inc

//   if (gd < 0) {
//     noStroke(); noFill()
//   } else {
//     fill(gy / 3, 202, gy / 5)
//     strokeWeight(0.6)
//   }


// }let branches = [];

function setup() {
  createCanvas(900, 700)
  background(220)
  angleMode(DEGREES)
  rectMode(CENTER)
  for (let i = 0; i < 200; i++) {
    let branchX = 450
    let branchY = 700
    let branchWidth = 155
    let branchHeight = branchWidth*1.2
    let shrinkRate = random(0.1, 0.7)
    let shrinkRate2 = shrinkRate*1.2
    let branchXspd = random(-0.7, 0.7)
    let branchYspd = random(0.1, 0.7)
    let n = random(0.5, 2)
    let a = random(-11, 11)
    let aChange = random(-0.9,0.9)
    branches[i] = new Branch(branchX, branchY, branchWidth,
      branchHeight, shrinkRate, shrinkRate2, branchXspd,
      branchYspd, n, a, aChange)

  }

}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run();
  }

  // if (branchY < 600) {
  //   let branch = new Branch(barnchX, branchY - 100, branchWidth - 33,
  //     shrinkRate - 0.1, brachXspd + 0.4, branchYspd - 0.3);
  //   branches.push(branch);
  // }

}

// function mousePressed() {


//   print(branches);


// }

// let n = 1
// let inc = 0.2
// let gxspdraw = 0
// let gyspdraw = 0.9
// let gydraw 
// let gddraw = 135
// let gxdraw

// function setup() {
//   // createCanvas(400, 760);
//     createCanvas(windowWidth, windowHeight);

//   background(220);
//   gxdraw = windowWidth/2
//   gydraw = windowHeight
//   }

// function draw() {
//   growth(windowWidth/2, windowHeight, 135, 0, 0.9)
// 	// gydraw -= gyspdraw
// 	// gddraw -= inc

//   if (gydraw<600) {growth(gxdraw, gydraw/10*9,gddraw/2,gxspdraw,gyspdraw)
//                   gxspdraw=0.5}


// }

// function growth(gx, gy, gd, gxsp, gysp) {
//   ellipse(gx + noise(n) * 52, gy, gd)
//   n += 0.01
//  	gy -= gysp
//   gx -= gx
// 	gddrawå -= inc

//   if (gd < 0) {
//     noStroke(); noFill()
//   } else {
//     fill(gy / 3, 202, gy / 5)
//     strokeWeight(0.6)
//   }


// }let branches = [];

function setup() {
  createCanvas(900, 700)
  background(220)
  angleMode(DEGREES)
  rectMode(CENTER)
  for (let i = 0; i < 105; i++) {
    let branchX = 450
    let branchY = 700
    let branchWidth = 155
    let branchHeight = branchWidth*1.2
    let shrinkRate = random(0.1, 0.7)
    let shrinkRate2 = shrinkRate*1.2
    let branchXspd = random(-0.7, 0.7)
    let branchYspd = random(0.1, 0.7)
    let n = random(0.5, 2)
    let a = random(-5, 11)
    let aChange = random(-0.9,0.9)
    branches[i] = new Branch(branchX, branchY, branchWidth,
      branchHeight, shrinkRate, shrinkRate2, branchXspd,
      branchYspd, n, a, aChange)

  }

}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run();
  }

  // if (branchY < 600) {
  //   let branch = new Branch(barnchX, branchY - 100, branchWidth - 33,
  //     shrinkRate - 0.1, brachXspd + 0.4, branchYspd - 0.3);
  //   branches.push(branch);
  // }

}

// function mousePressed() {


//   print(branches);


// }

// let n = 1
// let inc = 0.2
// let gxspdraw = 0
// let gyspdraw = 0.9
// let gydraw 
// let gddraw = 135
// let gxdraw

// function setup() {
//   // createCanvas(400, 760);
//     createCanvas(windowWidth, windowHeight);

//   background(220);
//   gxdraw = windowWidth/2
//   gydraw = windowHeight
//   }

// function draw() {
//   growth(windowWidth/2, windowHeight, 135, 0, 0.9)
// 	// gydraw -= gyspdraw
// 	// gddraw -= inc

//   if (gydraw<600) {growth(gxdraw, gydraw/10*9,gddraw/2,gxspdraw,gyspdraw)
//                   gxspdraw=0.5}


// }

// function growth(gx, gy, gd, gxsp, gysp) {
//   ellipse(gx + noise(n) * 52, gy, gd)
//   n += 0.01
//  	gy -= gysp
//   gx -= gx
// 	gddrawå -= inc

//   if (gd < 0) {
//     noStroke(); noFill()
//   } else {
//     fill(gy / 3, 202, gy / 5)
//     strokeWeight(0.6)
//   }


// }let branches = [];

function setup() {
  createCanvas(900, 700)
  background(220)
  angleMode(DEGREES)
  rectMode(CENTER)
  for (let i = 0; i < 105; i++) {
    let branchX = 450
    let branchY = 700
    let branchWidth = 155
    let branchHeight = branchWidth*1.2
    let shrinkRate = random(0.1, 0.7)
    let shrinkRate2 = shrinkRate*1.2
    let branchXspd = random(-0.7, 0.7)
    let branchYspd = random(0.1, 0.7)
    let n = random(0.5, 2)
    let a = random(-5, 11)
    branches[i] = new Branch(branchX, branchY, branchWidth,
      branchHeight, shrinkRate, shrinkRate2, branchXspd,
      branchYspd, n, a)

  }

}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run();
  }

  // if (branchY < 600) {
  //   let branch = new Branch(barnchX, branchY - 100, branchWidth - 33,
  //     shrinkRate - 0.1, brachXspd + 0.4, branchYspd - 0.3);
  //   branches.push(branch);
  // }

}

// function mousePressed() {


//   print(branches);


// }

// let n = 1
// let inc = 0.2
// let gxspdraw = 0
// let gyspdraw = 0.9
// let gydraw 
// let gddraw = 135
// let gxdraw

// function setup() {
//   // createCanvas(400, 760);
//     createCanvas(windowWidth, windowHeight);

//   background(220);
//   gxdraw = windowWidth/2
//   gydraw = windowHeight
//   }

// function draw() {
//   growth(windowWidth/2, windowHeight, 135, 0, 0.9)
// 	// gydraw -= gyspdraw
// 	// gddraw -= inc

//   if (gydraw<600) {growth(gxdraw, gydraw/10*9,gddraw/2,gxspdraw,gyspdraw)
//                   gxspdraw=0.5}


// }

// function growth(gx, gy, gd, gxsp, gysp) {
//   ellipse(gx + noise(n) * 52, gy, gd)
//   n += 0.01
//  	gy -= gysp
//   gx -= gx
// 	gddrawå -= inc

//   if (gd < 0) {
//     noStroke(); noFill()
//   } else {
//     fill(gy / 3, 202, gy / 5)
//     strokeWeight(0.6)
//   }


// }let branches = [];

function setup() {
  createCanvas(1100, 700)
  background(220)
  angleMode(DEGREES)
  rectMode(CENTER)
  for (let i = 0; i < 105; i++) {
    let branchX = 550
    let branchY = 350
    let branchWidth = 155
    let branchHeight = branchWidth*1.5
    let shrinkRate = random(0.25, 0.55)
    let shrinkRate2 = shrinkRate*1.5
    let branchXspd = random(-0.5, 0.5)
    let branchYspd = random(-0.5, 0.5)
    let n = random(0.5, 2)
    let a = random(-5, 11)
    branches[i] = new Branch(branchX, branchY, branchWidth,
      branchHeight, shrinkRate, shrinkRate2, branchXspd,
      branchYspd, n, a)

  }

}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run();
  }

  // if (branchY < 600) {
  //   let branch = new Branch(barnchX, branchY - 100, branchWidth - 33,
  //     shrinkRate - 0.1, brachXspd + 0.4, branchYspd - 0.3);
  //   branches.push(branch);
  // }

}

// function mousePressed() {


//   print(branches);


// }

// let n = 1
// let inc = 0.2
// let gxspdraw = 0
// let gyspdraw = 0.9
// let gydraw 
// let gddraw = 135
// let gxdraw

// function setup() {
//   // createCanvas(400, 760);
//     createCanvas(windowWidth, windowHeight);

//   background(220);
//   gxdraw = windowWidth/2
//   gydraw = windowHeight
//   }

// function draw() {
//   growth(windowWidth/2, windowHeight, 135, 0, 0.9)
// 	// gydraw -= gyspdraw
// 	// gddraw -= inc

//   if (gydraw<600) {growth(gxdraw, gydraw/10*9,gddraw/2,gxspdraw,gyspdraw)
//                   gxspdraw=0.5}


// }

// function growth(gx, gy, gd, gxsp, gysp) {
//   ellipse(gx + noise(n) * 52, gy, gd)
//   n += 0.01
//  	gy -= gysp
//   gx -= gx
// 	gddrawå -= inc

//   if (gd < 0) {
//     noStroke(); noFill()
//   } else {
//     fill(gy / 3, 202, gy / 5)
//     strokeWeight(0.6)
//   }


// }let branches = [];
let n = 1

function setup() {
  createCanvas(1100, 700)
  background(220)
  for (let i = 0; i < 45; i++) {
    let branchX =350
    let branchY = 700
    let branchWidth = 155
    let shrinkRate = random(0.25, 0.55)
    let branchXspd = random(-0.4, 0.3)
    let branchYspd = random(0.2, 1.2)
    branches[i] = new Branch(branchX, branchY, branchWidth,
      shrinkRate, branchXspd, branchYspd)

  }

}

function draw() {
  for (let i = 0; i < branches.length; i++) {
    branches[i].run();
  }
n+=0.01
  // if (branchY < 600) {
  //   let branch = new Branch(barnchX, branchY - 100, branchWidth - 33,
  //     shrinkRate - 0.1, brachXspd + 0.4, branchYspd - 0.3);
  //   branches.push(branch);
  // }

}

// function mousePressed() {


//   print(branches);


// }

// let n = 1
// let inc = 0.2
// let gxspdraw = 0
// let gyspdraw = 0.9
// let gydraw 
// let gddraw = 135
// let gxdraw

// function setup() {
//   // createCanvas(400, 760);
//     createCanvas(windowWidth, windowHeight);

//   background(220);
//   gxdraw = windowWidth/2
//   gydraw = windowHeight
//   }

// function draw() {
//   growth(windowWidth/2, windowHeight, 135, 0, 0.9)
// 	// gydraw -= gyspdraw
// 	// gddraw -= inc

//   if (gydraw<600) {growth(gxdraw, gydraw/10*9,gddraw/2,gxspdraw,gyspdraw)
//                   gxspdraw=0.5}


// }

// function growth(gx, gy, gd, gxsp, gysp) {
//   ellipse(gx + noise(n) * 52, gy, gd)
//   n += 0.01
//  	gy -= gysp
//   gx -= gx
// 	gddrawå -= inc

//   if (gd < 0) {
//     noStroke(); noFill()
//   } else {
//     fill(gy / 3, 202, gy / 5)
//     strokeWeight(0.6)
//   }


// }let n = 1
let inc = 0.2
let gysp = 0.9
let gxsp = 0.22
let gydraw 
let gddraw = 135
let gxdraw

function setup() {
  // createCanvas(400, 760);
    createCanvas(windowWidth, windowHeight);

  background(220);
  gxdraw = windowWidth/2
  gydraw = windowHeight
  }

function draw() {
  growth(gxdraw, gydraw, gddraw)
	gydraw -= gysp
  gddraw -= inc
 
  
  // gysp=0.4
  // gxdraw -= gxsp
  // gydraw -= gysp
  

}

function growth(gx, gy, gd) {
  ellipse(gx + noise(n) * 52, gy, gd)
  n += 0.01
  gd -= 0.1
  gy -= gysp

  if (gd < 0) {
    noStroke(); noFill()
  } else {
    fill(gy / 3, 202, gy / 5)
    strokeWeight(0.6)
  }
}let xp
let yp
let plw
let plh
let n
let inc = 0.1

function setup() {
  createCanvas(400, 760);
  background(220);
  xp = width / 2
  yp = height
  n = 1
  plw = 95
  plh = 32


}

function draw() {
  // noFill()

  ellipse(xp + noise(n) * 52, yp, plw, plw)
  n += 0.01

  plw -= inc
  yp -= 0.6

  if (plw < 0) {
    noStroke(), noFill()
  }
  else {
    fill(yp / 1.5, 222, yp /4)
    strokeWeight(0.6)

  }
}let xp
let yp 
let plw  
let plh 
let n

function setup() {
  createCanvas(400, 760);
    background(220);
  strokeWeight(0.6)
  xp = width/2
  yp = height
  n=1
  plw = random(130,255)
  plh = random (30,55) 
  
  
}

function draw() {
  // noFill()
  ellipse(xp+noise(n)*52,yp,plw,plw)
  n+=0.01
  
  plw-=0.1
  yp-=0.6
}let xp
let yp 
let plw  
let plh 
let n

function setup() {
  createCanvas(400, 760);
    background(220);
  strokeWeight(0.6)
  xp = width/3
  yp = height
  n=1
  plw = random(130,155)
  plh = random (30,55) 
  
  
}

function draw() {
  ellipse(xp+noise(n)*112,yp,plw,plh)
  n+=1
 
  plw-=0.1
  yp-=0.3
}function setup(){
	createCanvas(710,400);
	stroke(50,150);
	strokeWeight(1);
  frameRate(1);
}

function draw(){
	background(250);
	makeTree(width/2, height, 90,12);
}

function makeTree(x0, y0, angle, depth){
  
	var branchLength = map(random(depth),1,12,5,50);
	var x1 = x0 + branchLength*cos(radians(angle));
	var y1 = y0 - branchLength*sin(radians(angle));

	if(depth > 1){
		line(x0, y0, x1, y1);
    
		makeTree(x1, y1, angle+random(-10,30), depth-1);
		makeTree(x1, y1, angle+random(-30,10), depth-1);
	}

}
let n = 0
let c = 1
let angle = 0


function setup() {
  createCanvas(400, 400);
  background(220);
angleMode(DEGREES)
  rectMode(CENTER)
}

function draw() {
  
  // let a = n * 137.3;
  // let a = n * 137.5;
  let a = n * 137.6;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  translate(x,y)
  rotate(angle)
  fill(255)
  rect(x/4,y/4,14,14,3)
  n+=2
  angle+=0.1
}let n = 0
let c = 6



function setup() {
  createCanvas(400, 400);
  background(220);
angleMode(DEGREES)
  rectMode(CENTER)
}

function draw() {
  
  // let a = n * 137.3;
  // let a = n * 137.5;
  let a = n * 137.6;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  fill(255)
  rect(x,y,8,8,3)
  n+=1
}let ns = 0
let n = 0
let c = 6
let wx = 100
let hx = 220
let angle = 0
let opcty = 61

function setup() {
  createCanvas(1250, 750);
  background(220);
  // rectMode(CENTER)
  // angleMode(DEGREES)

}

function draw() {

  // let a = n * 137.6;
  let a = n * 137.3;
  // let a = n * 137.5;

  let r = c * sqrt(n);

  let x = r * cos(a) + width / 2
  let y = r * sin(a) + height / 2

  let h = map(sin(angle), -1, 1, 0, 50);
  let w = map(cos(angle), -1, 1, 0, 50);

  let nc = noise(ns) * 22
  translate(x, y)
  // rotate(a+22)
  rotate(angle)
  fill(90, x / 3, y / 4, 31.6)
  // fill(x / 3, y / 2, 90, 11.6)
  // stroke(y/2, x/6, 22,82)
  stroke(0, 71)
  strokeWeight(0.4)
  // rect(0,0,wx,hx)
  rect(0, 0, hx, hx)
  push()
  translate(0, 0)
  rotate(angle * 1.8)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(-(angle * 1.8))
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(angle * 0.9)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(-(angle * 0.9))
  rect(0, 0, hx, hx)
  pop()
  push()
  rectMode(CENTER)
  translate(x / 3, y / 3)
  rotate(angle * 2.7)
  fill( x / 2, y / 3,90, 31.6)
  rect(0, 0, hx, hx)
  pop()
  push()
  rectMode(CENTER)
  translate(x / 3, y / 3)
  rotate(-(angle * 2.7))
  fill(x / 3, y / 4, 90, 31.6)
  rect(0, 0, hx, hx)
  pop()
  angle += 0.007
  n += 0.001
  wx -= 0.005
  hx -= 0.1
  opcty -= 0.036
  ns += 0.01


  console.log(x, y)
}let ns = 0
let n = 0
let c = 6
let wx = 100
let hx = 220
let angle = 0
let opcty = 61

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  angleMode(DEGREES)

}

function draw() {

  // let a = n * 137.6;
  let a = n * 137.3;
  // let a = n * 137.5;

  let r = c * sqrt(n);

  let x = r * cos(a) + width / 2
  let y = r * sin(a) + height / 2

  let h = map(sin(angle), -1, 1, 0, 50);
  let w = map(cos(angle), -1, 1, 0, 50);

  let nc = noise(ns) * 22
  translate(x, y)
  // rotate(a+22)
  rotate(angle)
  fill(90, x / 3, y / 4, 31.6)
  // fill(x / 3, y / 2, 90, 11.6)
  // stroke(y/2, x/6, 22,82)
  stroke(0, 71)
  strokeWeight(0.4)
  // rect(0,0,wx,hx)
  rect(0, 0, hx, hx)
  push()
  translate(0, 0)
  rotate(angle * 1.8)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(-(angle * 1.8))
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(angle * 0.9)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(-(angle * 0.9))
  rect(0, 0, hx, hx)
  pop()
  // push()
  // translate(x / 3, y / 3)
  // rotate(angle * 22.7)
  // fill( x / 2, y / 3,90, 31.6)
  // rect(0, 0, hx, hx)
  // pop()
  // push()
  // translate(x / 3, y / 3)
  // rotate(-(angle * 22.7))
  // fill(x / 3, y / 4, 90, 31.6)
  // rect(0, 0, hx, hx)
  // pop()
  angle += 0.05
  n += 0.01
  wx -= 0.005
  hx -= 0.1
  opcty -= 0.036
  ns += 0.01


  console.log(x, y)
}let ns = 0
let n = 0
let c = 6
let wx = 100
let hx = 220
let angle = 0
let opcty = 61

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  angleMode(DEGREES)

}

function draw() {

  // let a = n * 137.6;
  let a = n * 137.3;
  // let a = n * 137.5;

  let r = c * sqrt(n);

  let x = r * cos(a) + width / 2
  let y = r * sin(a) + height / 2

  let h = map(sin(angle), -1, 1, 0, 50);
  let w = map(cos(angle), -1, 1, 0, 50);

  let nc = noise(ns) * 22
  translate(x, y)
  // rotate(a+22)
  rotate(angle)
  fill(90, x / 3, y / 4, 31.6)
  // fill(x / 3, y / 2, 90, 11.6)
  // stroke(y/2, x/6, 22,82)
  stroke(0, 71)
  strokeWeight(0.4)
  // rect(0,0,wx,hx)
  rect(0, 0, hx, hx)
  push()
  translate(0, 0)
  rotate(angle * 1.8)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(-(angle * 1.8))
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(angle * 0.9)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(-(angle * 0.9))
  rect(0, 0, hx, hx)
  pop()
  // push()
  // translate(x / 3, y / 3)
  // rotate(angle * 2.7)
  // fill( x / 2, y / 3,90, 31.6)
  // rect(0, 0, wx, wx)
  // pop()
  // push()
  // translate(x / 3, y / 3)
  // rotate(-(angle * 2.7))
  // fill(x / 3, y / 4, 90, 31.6)
  // rect(0, 0, wx, wx)
  // pop()
  // rect(0,0,w,h)
  // rect(0,0,wx,hx)
  angle += 0.1
  n += 0.005
  wx -= 0.005
  hx -= 0.1
  opcty -= 0.036
  ns += 0.01


  console.log(x, y)
}let ns = 0
let n = 0
let c = 6
let wx = 100
let hx = 220
let angle = 0
let opcty = 61

function setup() {
  createCanvas(1250, 750);
  background(220);
  // rectMode(CENTER)
  angleMode(DEGREES)

}

function draw() {

  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;

  let r = c * sqrt(n);

  let x = r * cos(a) + width / 2
  let y = r * sin(a) + height / 2

  let h = map(sin(angle), -1, 1, 0, 50);
  let w = map(cos(angle), -1, 1, 0, 50);

  let nc = noise(ns) * 22
  translate(x, y)
  // rotate(a+22)
  rotate(angle)
  fill(90, x / 3, y / 4, 31.6)
  // fill(x / 3, y / 2, 90, 11.6)
  // stroke(y/2, x/6, 22,82)
  stroke(0, 71)
  strokeWeight(0.4)
  // rect(0,0,wx,hx)
  rect(0, 0, hx, hx)
  push()
  translate(0, 0)
  rotate(angle * 1.8)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(-(angle * 1.8))
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(angle * 0.9)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(-(angle * 0.9))
  rect(0, 0, hx, hx)
  pop()
  // push()
  // translate(x / 3, y / 3)
  // rotate(angle * 2.7)
  // fill( x / 2, y / 3,90, 31.6)
  // rect(0, 0, wx, wx)
  // pop()
  // push()
  // translate(x / 3, y / 3)
  // rotate(-(angle * 2.7))
  // fill(x / 3, y / 4, 90, 31.6)
  // rect(0, 0, wx, wx)
  // pop()
  // rect(0,0,w,h)
  // rect(0,0,wx,hx)
  angle += 0.1
  n += 0.0005
  wx -= 0.005
  hx -= 0.1
  opcty -= 0.036
  ns += 0.01


  console.log(x, y)
}let ns = 0
let n = 0
let c = 16
let wx = 300
let hx = 220
let angle = 0
let opcty = 61

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  // angleMode(DEGREES)

}

function draw() {

  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;

  let r = c * sqrt(n);

  let x = r * cos(a) + width / 2
  let y = r * sin(a) + height / 2

  let h = map(sin(angle), -1, 1, 0, 50);
  let w = map(cos(angle), -1, 1, 0, 50);

  let nc = noise(ns) * 22
  translate(x, y)
  // rotate(a+22)
  rotate(angle)
  fill(90, x / 3, y / 4, 31.6)
  // fill(x / 3, y / 2, 90, 11.6)
  // stroke(y/2, x/6, 22,82)
  stroke(0, 71)
  strokeWeight(0.4)
  // rect(0,0,wx,hx)
  rect(0, 0, hx, hx)
  push()
  translate(0, 0)
  rotate(angle * 1.8)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(-(angle * 1.8))
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(angle * 0.9)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0, 0)
  rotate(-(angle * 0.9))
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(x / 3, y / 3)
  rotate(angle * 2.7)
  fill( x / 3, y / 4,90, 31.6)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(x / 3, y / 3)
  rotate(-(angle * 2.7))
  fill(x / 3, y / 4, 90, 31.6)
  rect(0, 0, hx, hx)
  pop()
  // rect(0,0,w,h)
  // rect(0,0,wx,hx)
  angle += 0.007
  n += 0.0005
  wx -= 0.3
  hx -= 0.1
  opcty -= 0.036
  ns += 0.01


  console.log(x, y)
}let ns = 0
let n = 0
let c = 16
let wx = 300
let hx = 220
let angle = 0
let opcty = 61

function setup() {
  createCanvas(1250, 750);
  background(220);
  // rectMode(CENTER)
  // angleMode(DEGREES)

}

function draw() {

  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;

  let r = c * sqrt(n);

  let x = r * cos(a) + width / 2
  let y = r * sin(a) + height / 2

  let h = map(sin(angle), -1, 1, 0, 50);
  let w = map(cos(angle), -1, 1, 0, 50);

  let nc = noise(ns) * 22
  translate(x, y)
  // rotate(a+22)
  rotate(angle)
	fill(90 ,x / 3, y / 4, 31.6)
  // fill(x / 3, y / 2, 90, 11.6)
  // stroke(y/2, x/6, 22,82)
  stroke(0,71)
  strokeWeight(0.4)
  // rect(0,0,wx,hx)
  rect(0, 0, hx, hx)
	push()
  translate(0,0)
  rotate(angle*1.8)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0,0)
  rotate(-(angle*1.8))
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0,0)
  rotate(angle*0.9)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0,0)
  rotate(-(angle*0.9))
  rect(0, 0, hx, hx)
  pop()
  // rect(0,0,w,h)
  // rect(0,0,wx,hx)
  angle += 0.007
  n += 0.0005
  wx -= 0.3
  hx -= 0.1
  opcty -= 0.036
  ns += 0.01


  console.log(x, y)
}let ns = 0
let n = 0
let c = 1
let wx = 300
let hx = 220
let angle = 0
let opcty = 61

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  // angleMode(DEGREES)

}

function draw() {

  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;

  let r = c * sqrt(n);

  let x = r * cos(a) + width / 2
  let y = r * sin(a) + height / 2

  let h = map(sin(angle), -1, 1, 0, 50);
  let w = map(cos(angle), -1, 1, 0, 50);

  let nc = noise(ns) * 22
  translate(x, y)
  // rotate(a+22)
  rotate(angle)
	fill(90 ,x / 3, y / 4, 31.6)
  // fill(x / 3, y / 2, 90, 11.6)
  // stroke(y/2, x/6, 22,82)
  stroke(0,71)
  strokeWeight(0.4)
  // rect(0,0,wx,hx)
  rect(0, 0, hx, hx)
	push()
  translate(0,0)
  rotate(angle*1.8)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0,0)
  rotate(-(angle*1.8))
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0,0)
  rotate(angle*0.9)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0,0)
  rotate(-(angle*0.9))
  rect(0, 0, hx, hx)
  pop()
  // rect(0,0,w,h)
  // rect(0,0,wx,hx)
  angle += 0.007
  n += 0.001
  wx -= 0.3
  hx -= 0.1
  opcty -= 0.036
  ns += 0.01


  console.log(x, y)
}let ns = 0
let n = 0
let c = 1
let wx = 300
let hx = 220
let angle = 0
let opcty = 61

function setup() {
  createCanvas(1250, 750);
  background(220);
  // rectMode(CENTER)
  // angleMode(DEGREES)

}

function draw() {

  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;

  let r = c * sqrt(n);

  let x = r * cos(a) + width / 2
  let y = r * sin(a) + height / 2

  let h = map(sin(angle), -1, 1, 0, 50);
  let w = map(cos(angle), -1, 1, 0, 50);

  let nc = noise(ns) * 22
  translate(x, y)
  // rotate(a+22)
  rotate(angle)
	fill(90 ,x / 3, y / 4, 31.6)
  // fill(x / 3, y / 2, 90, 11.6)
  // stroke(y/2, x/6, 22,82)
  stroke(0,71)
  strokeWeight(0.4)
  // rect(0,0,wx,hx)
  rect(0, 0, hx, hx)
	push()
  translate(0,0)
  rotate(angle*1.8)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0,0)
  rotate(-(angle*1.8))
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0,0)
  rotate(angle*0.9)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0,0)
  rotate(-(angle*0.9))
  rect(0, 0, hx, hx)
  pop()
  // rect(0,0,w,h)
  // rect(0,0,wx,hx)
  angle += 0.007
  n += 0.001
  wx -= 0.3
  hx -= 0.1
  opcty -= 0.036
  ns += 0.01


  console.log(x, y)
}let ns = 0
let n = 0
let c = 1
let wx = 300
let hx = 220
let angle = 0
let opcty = 61

function setup() {
  createCanvas(1250, 750);
  background(220);
  // rectMode(CENTER)
  angleMode(DEGREES)

}

function draw() {

  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;

  let r = c * sqrt(n);

  let x = r * cos(a) + width / 2
  let y = r * sin(a) + height / 2

  let h = map(sin(angle), -1, 1, 0, 50);
  let w = map(cos(angle), -1, 1, 0, 50);

  let nc = noise(ns) * 22
  translate(x, y)
  // rotate(a+22)
  rotate(angle)
	fill(90 ,x / 3, y / 4, 31.6)
  // fill(x / 3, y / 2, 90, 11.6)
  // stroke(y/2, x/6, 22,82)
  stroke(0,71)
  strokeWeight(0.4)
  // rect(0,0,wx,hx)
  rect(0, 0, hx, hx)
	push()
  translate(0,0)
  rotate(angle*1.8)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0,0)
  rotate(-(angle*1.8))
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0,0)
  rotate(angle*0.9)
  rect(0, 0, hx, hx)
  pop()
  push()
  translate(0,0)
  rotate(-(angle*0.9))
  rect(0, 0, hx, hx)
  pop()
  // rect(0,0,w,h)
  // rect(0,0,wx,hx)
  angle += 0.07
  n += 0.005
  wx -= 0.3
  hx -= 0.1
  opcty -= 0.036
  ns += 0.01


  console.log(x, y)
}let ns = 0
let n = 0
let c = 6
let wx = 300
let hx = 370
let angle = 0
let opcty = 61

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  // angleMode(DEGREES)

}

function draw() {

  // let a = n * 137.6;
  // let a = n * 137.3;
  let a = n * 137.5;

  let r = c * sqrt(n);

  let x = r * cos(a) + width / 2
  let y = r * sin(a) + height / 2

  let h = map(sin(angle), -1, 1, 0, 50);
  let w = map(cos(angle), -1, 1, 0, 50);

  let nc = noise(ns) * 22
  translate(x, y)
  // rotate(a+22)
  rotate(angle)
	fill(90 ,x / 3, y / 4, 31.6)
  // fill(x / 3, y / 2, 90, 11.6)
  // stroke(y/2, x/6, 22,82)
  stroke(0,121)
  strokeWeight(0.4)
  // rect(0,0,wx,hx)
  rect(0, 0, 52, 8)
	push()
  translate(0,0)
  rotate(angle*1.8)
  rect(0, 0, 52, hx)
  pop()
  push()
  translate(0,0)
  rotate(-(angle*1.8))
  rect(0, 0, 8, hx)
  pop()
  push()
  translate(0,0)
  rotate(angle*0.9)
  rect(0, 0, 52, hx)
  pop()
  push()
  translate(0,0)
  rotate(-(angle*0.9))
  rect(0, 0, 8, hx)
  pop()
  // rect(0,0,w,h)
  // rect(0,0,wx,hx)
  angle += 0.007
  n += 0.001
  wx -= 0.3
  hx -= 0.1
  opcty -= 0.036
  ns += 0.01


  console.log(x, y)
}let angle = 0
let x
let y 

// using perlin noise() to move a particle in 2d

var time = 0; // this can be any number
							  // doesn't really matter where
								// we start sampling noise()

function setup() { 
  createCanvas(600, 600);
	background(0,10);
	// angleMode(DEGREES)
  rectMode(CENTER)
  stroke(34,54);
} 

function draw() { 
  fill(x/4,190,y/4,41); 
  // this is a neat little trick
  // instead of wiping the canvas clean with background(0)
  // we can use a translucent wipe, i.e. one that has an alpha value
  // try changing 10 to something else between 0 & 255
  
  
  // x value is derived from perlin noise
   x = width*tan(noise(time));
  
  // y value is derived from perlin noise
  // at a much later position
  // since perlin noise is unrelated over large
  // timesteps, this essentially acts like an
  // independent perlin noise function
	 y = height*sin(noise(time + 100));
  
  translate(x,y)
  rotate(angle+(-(x/500)))
  ellipse(0, 0, x/7, y/8);
  ellipse(0,0, x/2, 34);
  ellipse(0,0, 41, y/2)
  push()
  translate(0,0)
  rotate(angle*2+(-(x/500)))
  ellipse(0,0,x/4,141)
  pop()
  // update time i.e. sample noise() from a different position
  // try changing 0.01 to something smaller or larger
  // to see how it effects the bumblebee behavior
  time = time + 0.005;
  angle+=0.005
  
}let snowflakes = [];
let t=0;
let ns
let n = 0
function setup() {
  createCanvas(800, 600);
	background('brown');
  fill(240,51);
  stroke(23);
  strokeWeight(0.2)
  angleMode(DEGREES)
}

function draw() {
  ns = noise(n) *20
  t = frameCount/60;
  
  // poisson snowflakes
  while(random()<0.5){new snowflake();}
  
  for (let flake of snowflakes) {
		flake.update();
    flake.display();
	}
  // n+=0.005
  //console.log(snowflakes.length);
}

function snowflake(){
  this.posX = random(width);
  this.posY = random(height);
  this.phase = random(0,233);
  this.size = random(2,5);
  
  // pick a random radius using 
  // quadratic (not linear) sampling
  this.radius = sqrt(random(pow(width,2)));
  
  snowflakes.push(this);

  this.update = function(){
    
    let freq = 0.01;
    let phase = 242*(freq*t + this.phase);
    
		this.posX = width/2 + -this.radius*cos(phase*10)+this.radius*tan(phase);
    // different sizes fall at slightly different speeds
    // this.posY += pow(this.size,0.5);
    this.posY = height/2 + -this.radius*sin(phase)+ns;
    // delete if reach end of screen
    if(this.posY > height){
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index,1);
    }
  };

  this.display = function(){
    rect(this.posX,this.posY,this.size,this.size);
  };
}let snowflakes = [];
let t=0;

function setup() {
  createCanvas(400, 600);
	background('brown');
  fill(240,51);
  stroke(23);
  angleMode(DEGREES)
}

function draw() {
  
  t = frameCount/60;
  
  // poisson snowflakes
  while(random()<0.5){new snowflake();}
  
  for (let flake of snowflakes) {
		flake.update();
    flake.display();
	}
  
  //console.log(snowflakes.length);
}

function snowflake(){
  this.posX = random(width);
  this.posY = height+100;
  this.phase = random(0,33);
  this.size = random(2,5);
  
  // pick a random radius using 
  // quadratic (not linear) sampling
  this.radius = sqrt(random(pow(width,2)));
  
  snowflakes.push(this);

  this.update = function(){
    
    let freq = -0.1;
    let phase = 137.6*(freq*t + this.phase);
    
		this.posX = width/2 + this.radius*cos(phase);
    // different sizes fall at slightly different speeds
    // this.posY += pow(this.size,0.5);
    this.posY = height/2 + this.radius*tan(phase);
    // delete if reach end of screen
    if(this.posY > height){
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index,1);
    }
  };

  this.display = function(){
    rect(this.posX,this.posY,this.size,this.size);
  };
}function setup(){
	createCanvas(710,400);
	stroke(50,150);
	strokeWeight(1);
  frameRate(1);
}

function draw(){
	background(250);
	makeTree(width/2, height, 90,12);
}

function makeTree(x0, y0, angle, depth){
  
	var branchLength = map(random(depth),1,12,5,50);
	var x1 = x0 + branchLength*cos(radians(angle));
	var y1 = y0 - branchLength*sin(radians(angle));

	if(depth > 1){
		line(x0, y0, x1, y1);
    
		makeTree(x1, y1, angle+random(-10,30), depth-1);
		makeTree(x1, y1, angle+random(-30,10), depth-1);
	}

}
let ns = 0
let n = 0
let c = 6
let wx = 300
let hx = 300
let angle = 0
let opcty = 61

function setup() {
  createCanvas(1250, 750);
  background(220);
  // rectMode(CENTER)
  angleMode(DEGREES)

}

function draw() {

  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;

  let r = c * sqrt(n);

  let x = r * cos(a) + width / 2
  let y = r * sin(a) + height / 2

  // let h = map(sin(angle), -1, 1, 0, 50);
  // let w = map(cos(angle), -1, 1, 0, 50);

  let nc = noise(ns)
  translate(x, y)
  // rotate(a+22)
  rotate(angle)

  fill(x / 3, y / 2, 90, 0.6)
  // stroke(y/2, x/6, 22,82)
  stroke(0)
  strokeWeight(0.2)
  // rect(0,0,wx,hx)
rect(0, 0, 20, 200)
  
  // rect(0,0,w,h)
  // rect(0,0,wx,hx)
  angle += 0.05
  n += 0.1
  wx -= 0.3
  hx -= 0.3
  opcty -= 0.036
  ns += 0.0001


  console.log(x, y)
}let ns = 0
let n = 0
let c = 6
let wx = 300
let hx = 370
let angle = 0
let opcty = 61

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  // angleMode(DEGREES)

}

function draw() {

  // let a = n * 137.6;
  // let a = n * 137.3;
  let a = n * 137.5;

  let r = c * sqrt(n);

  let x = r * cos(a) + width / 2
  let y = r * sin(a) + height / 2

  let h = map(sin(angle), -1, 1, 0, 50);
  let w = map(cos(angle), -1, 1, 0, 50);

  let nc = noise(ns) * 22
  translate(x, y)
  // rotate(a+22)
  rotate(angle)
	fill(90 ,x / 3, y / 4, 31.6)
  // fill(x / 3, y / 2, 90, 11.6)
  // stroke(y/2, x/6, 22,82)
  stroke(0,121)
  strokeWeight(0.4)
  // rect(0,0,wx,hx)
  rect(0, 0, 52, 8)
	push()
  translate(0,0)
  rotate(angle*1.8)
  rect(0, 0, 52, hx)
  pop()
  push()
  translate(0,0)
  rotate(-(angle*1.8))
  rect(0, 0, 8, hx)
  pop()
  push()
  translate(0,0)
  rotate(angle*0.9)
  rect(0, 0, 52, hx)
  pop()
  push()
  translate(0,0)
  rotate(-(angle*0.9))
  rect(0, 0, 8, hx)
  pop()
  // rect(0,0,w,h)
  // rect(0,0,wx,hx)
  angle += 0.7
  n += 0.1
  wx -= 0.3
  hx -= 0.1
  opcty -= 0.036
  ns += 0.01


  console.log(x, y)
}let angle = 93
let lenx=0
let slider
let ns = 0
let n

function setup() {
  createCanvas(600, 1600);
    background(165);

  rectMode(CENTER)
  angleMode(DEGREES)
  slider = createSlider(0, 300, 0)
}

function draw() {
	// angle = slider.value()
  stroke(198,n*2,99,0.6,21)
  fill(n*2,198,99,0.6)
  translate(300, height)
  branch(lenx)
  angle += 0.5
  lenx += 1
  ns+=0.1
    
}


function branch(len) {
   n = noise(ns) * width
  rect(n/100, n/100, -len/4, -len/2)
  translate(0, -len)
  if (len > 38) {
    push()
    rotate(angle)
    branch(len * 0.5)
    pop()
    push()
    rotate(-angle)
    branch(len * 0.5)
    pop()
    scale(angle)
  }
console.log(lenx)
}let angle = 93
let lenx=0
let slider
let ns = 0
let n

function setup() {
  createCanvas(600, 1600);
    background(165);

  rectMode(CENTER)
  angleMode(DEGREES)
  slider = createSlider(0, 300, 0)
}

function draw() {
	// angle = slider.value()
  stroke(198,n*2,99,0.6,21)
  fill(n*2,198,99,0.6)
  translate(300, height)
  branch(lenx)
  angle += 0.5
  lenx += 1
  ns+=0.1
    
}


function branch(len) {
   n = noise(ns) * width
  rect(n/100, n/100, -len/4, -len/2)
  translate(0, -len)
  if (len > 38) {
    push()
    rotate(angle)
    branch(len * 0.5)
    pop()
    push()
    rotate(-angle)
    branch(len * 0.5)
    pop()
    scale(angle)
  }
console.log(lenx)
}let angle = 93
let lenx=0
let slider
let ns = 0
let n

function setup() {
  createCanvas(600, 1600);
    background(165);

  rectMode(CENTER)
  angleMode(DEGREES)
  slider = createSlider(0, 300, 0)
}

function draw() {
	// angle = slider.value()
  stroke(0,21)
  fill(n,198,99,0.6)
  translate(300, height)
  branch(lenx)
  angle += 0.8
  lenx += 1
  ns+=0.01
    
}


function branch(len) {
   n = noise(ns) * width
  rect(0, 0, n, -len/2)
  translate(0, -len)
  if (len > 38) {
    push()
    rotate(angle)
    branch(len * 0.5)
    pop()
    push()
    rotate(-angle)
    branch(len * 0.5)
    pop()
    scale(angle)
  }
console.log(lenx)
}let axiom = "F"
let sentence = axiom;
let len = 100
let rules = []

rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
}


function generate() {
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence
  createP(sentence)
  turtle()
}

function turtle() {
  background(51)
  resetMatrix()
  translate(width/2,height/2)
  stroke(255)
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);

    if (current == "F") {
      line(0, 0, 0, -len);
      translate(0, -len)
    } else if (current == "+") {
      rotate(33)
    } else if (current == "-") {
      rotate(-33)
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop()
    }
  }
}

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES)
  createP(axiom)
  turtle()
  let button = createButton("generate");
  button.mousePressed(generate)

}let axiom = "A"
let sentence = axiom;

let rules = []

rules[0] = {
  a: "A",
  b: "AB"
}
rules[1] = {
  a: "B",
  b: "A"
}

function generate() {
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
    nextSentence += current;
  }
  }
  sentence = nextSentence
  createP(sentence)
}

function setup() {
  noCanvas();
  createP(axiom)
  let button = createButton("generate");
  button.mousePressed(generate)

}let tree = []
let leaves = []
let count = 0

function setup() {
  createCanvas(600, 600);

  // rectMode(CENTER)
  angleMode(DEGREES)
  let a = createVector(width / 2, height)
  let b = createVector(width / 2, height - 100)
  let root = new Branch(a, b)
  tree[0] = root

  // slider = createSlider(0, 300, 0)
}

function mousePressed() {
  for (let i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchA())
      tree.push(tree[i].branchB())
    }
    tree[i].finished = true
  }
  count++

  if (count === 5) {
    for (let i = 0; i < tree.length; i++) {
      if (!tree[i].finished) {
        let leaf = tree[i].end.copy()
        leaves.push(leaf)
      }
    }
  }
}

function draw() {
  background(0);
  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
    // tree[i].jitter()
  }
  for (var i = 0; i < leaves.length; i++) {
    fill(120,74,31)
    noStroke()
   rect(leaves[i].x,leaves[i].y,8,8)
    // tree[i].jitter()
  }
  // angle += 0.5
}let angle = 93
let lenx=0
let slider

function setup() {
  createCanvas(600, 1600);
    background(165);

  rectMode(CENTER)
  angleMode(DEGREES)
  slider = createSlider(0, 300, 0)
}

function draw() {
	// angle = slider.value()
  stroke(0,21)
  fill(lenx/2,198,99,0.6)
  translate(300, height)
  branch(lenx)
  angle += 0.1
  lenx += 0.1
  
    
}


function branch(len) {
  rect(0, 0, -len/4, -len/2)
  translate(0, -len)
  if (len > 38) {
    push()
    rotate(angle)
    branch(len * 0.5)
    pop()
    push()
    rotate(-angle)
    branch(len * 0.5)
    pop()
    scale(angle)
  }
console.log(lenx)
}let angle = 0

let slider

function setup() {
  createCanvas(400, 400);
    background(65);

  angleMode(DEGREES)
  slider = createSlider(0, 360, 0)
}

function draw() {
	// angle = slider.value()
  stroke(0)
  fill(255)
  translate(200, height)
  branch(100)
  angle+=0.1
}


function branch(len) {
  rect(0, 0, 4, -len)
  translate(0, -len)
  if(len>4){
    push()
  rotate(angle)
  branch(len*0.67)
    pop()
    push()
    rotate(-angle)
    branch(len*0.67)
    pop()
    scale(angle)
  }

}let angle = 0

let slider

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES)
  slider = createSlider(0, 360, 0)
}

function draw() {
  background(65);
	angle = slider.value()
  stroke(255)
  translate(200, height)
  branch(100)
}


function branch(len) {
  line(0, 0, 0, -len)
  translate(0, -len)
  if(len>4){
  rotate(angle)
  branch(len*0.67)
    rotate(-angle)
    branch(len*0.67)
  }

}let n = 0
let c = 6
  let wx = 100
	let hx = 192
  let angle = 0

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  // angleMode(DEGREES)

}

function draw() {
	
  // let a = n * 137.6;
  // let a = n * 137.3;
  let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill( x,y, wx, 151)
  stroke(y, x, 22,72)
  stroke(40)
  strokeWeight(1.3)
  // rect(0,0,wx,hx)
  textSize(hx)
  text ('!!!!!!!',0,0)
  angle+=0.4
  n+=0.9
  wx-=0.1
  hx-=0.5
  
 
  
  console.log(hx)
}let n = 0
let c = 6
  let wx = 100
	let hx = 102
  let angle = 0

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  // angleMode(DEGREES)

}

function draw() {
	
  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill( x,y, wx, 151)
  stroke(y, x, 22,72)
  stroke(40)
  strokeWeight(1.3)
  // rect(0,0,wx,hx)
  textSize(hx)
  text ('#X#',0,0)
  angle+=0.4
  n+=1
  wx-=0.1
  hx-=0.5
  
 
  
  console.log(hx)
}let n = 0
let c = 6
  let wx = 100
	let hx = 102
  let angle = 0

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  // angleMode(DEGREES)

}

function draw() {
	
  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill( x,y, wx, 151)
  stroke(y, x, 22,72)
  stroke(40)
  strokeWeight(1.3)
  rect(0,0,wx,hx)
  
  angle+=0.4
  n+=4
  wx-=0.1
  hx-=0.05
  
 
  
  console.log(hx)
}let n = 0
let c = 6
  let wx = 100
	let hx = 102
  let angle = 0

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  // angleMode(DEGREES)

}

function draw() {
	
  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill( x,y, wx, 151)
  stroke(y, x, 22,72)
  stroke(40)
  strokeWeight(1.3)
  ellipse(0,0,wx,hx)
  
  angle+=0.4
  n+=9
  wx-=0.5
  hx-=0.05
  
 
  
  console.log(hx)
}let n = 0
let c = 6
  let wx = 300
	let hx = 300
  let angle = 0
let opcty = 61
function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  angleMode(DEGREES)

}

function draw() {
	
  // let a = n * 137.6;
  // let a = n * 137.3;
  let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,0,50);
  let w = map(cos(angle),-1,1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill(x/3, y/2, 90,0.6)
  // stroke(y/2, x/6, 22,82)
  stroke(0)
  strokeWeight(0.2)
   // rect(0,0,wx,hx)
   rect(0,0,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=0.33
  n+=0.5
  wx-=0.3
  hx-=0.3
  opcty-=0.036

 
  
  console.log(x,y)
}
let n = 0
let c = 6
  let wx = 300
	let hx = 300
  let angle = 0
let opcty = 61
function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CORNER)
  angleMode(DEGREES)

}

function draw() {
	
  // let a = n * 137.6;
  // let a = n * 137.3;
  let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,0,50);
  let w = map(cos(angle),-1,1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill(x/3, y/2, 90,0.6)
  // stroke(y/2, x/6, 22,82)
  stroke(0)
  strokeWeight(0.2)
   // rect(0,0,wx,hx)
   rect(0,0,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=0.33
  n+=0.5
  wx-=0.3
  hx-=0.3
  opcty-=0.036

 
  
  console.log(x,y)
}
let n = 0
let c = 6
  let wx = 300
	let hx = 300
  let angle = 0
let opcty = 61
function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CORNER)
  angleMode(DEGREES)

}

function draw() {
	
  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,0,50);
  let w = map(cos(angle),-1,1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill(x/3, y/2, 150,3)
  // stroke(y/2, x/6, 22,82)
  stroke(0)
  strokeWeight(0.2)
   // rect(0,0,wx,hx)
   rect(0,0,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=1
  n+=0.1
  wx-=0.3
  hx-=0.3
  opcty-=0.036

 
  
  console.log(x,y)
}
let n = 0
let c = 6
  let wx = 300
	let hx = 300
  let angle = 0
let opcty = 61
function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CORNER)
  // angleMode(DEGREES)

}

function draw() {
	
  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,0,50);
  let w = map(cos(angle),-1,1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill(x/3, y/2, 150,opcty)
  // stroke(y/2, x/6, 22,82)
  stroke(40,40)
  strokeWeight(1.1)
   // rect(0,0,wx,hx)
   rect(0,0,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=33
  n+=0.01
  wx-=0.3
  hx-=0.3
  opcty-=0.046

 
  
  console.log(x,y)
}
let n = 0
let c = 6
  let wx = 300
	let hx = 300
  let angle = 0
let opcty = 61
function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CORNER)
  // angleMode(DEGREES)

}

function draw() {
	
  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,0,50);
  let w = map(cos(angle),-1,1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill(x/3, y/2, 150,opcty)
  // stroke(y/2, x/6, 22,82)
  stroke(40,40)
  strokeWeight(1.1)
   // rect(0,0,wx,hx)
   rect(0,0,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=1
  n+=0.01
  wx-=0.3
  hx-=0.3
  opcty-=0.046

 
  
  console.log(x,y)
}
let n = 0
let c = 6
  let wx = 300
	let hx = 300
  let angle = 0
let opcty = 61
function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CORNER)
  // angleMode(DEGREES)

}

function draw() {
	
  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,0,50);
  let w = map(cos(angle),-1,1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill(x/3, y/2, 150,opcty)
  // stroke(y/2, x/6, 22,82)
  stroke(40,40)
  strokeWeight(1.1)
   // rect(0,0,wx,hx)
   rect(0,0,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=0.5
  n+=0.01
  wx-=0.1
  hx-=0.1
  opcty-=0.046

 
  
  console.log(x,y)
}
let n = 0
let c = 6
  let wx = 300
	let hx = 300
  let angle = 0
let opcty = 61
function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CORNER)
  angleMode(DEGREES)

}

function draw() {
	
  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,0,50);
  let w = map(cos(angle),-1,1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill(x/3, y/2, 150,opcty)
  stroke(y/2, x/6, 22,82)
  // stroke(40,40)
  strokeWeight(1.1)
   // rect(0,0,wx,hx)
   rect(0,0,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=0.5
  n+=2
  wx-=0.1
  hx-=0.1
  opcty-=0.046

 
  
  console.log(x,y)
}
let n = 0
let c = 6
  let wx = 300
	let hx = 300
  let angle = 0
let opcty = 61
function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CORNER)
  angleMode(DEGREES)

}

function draw() {
	
  // let a = n * 137.6;
  let a = n * 137.3;
  // let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,0,50);
  let w = map(cos(angle),-1,1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill(x/3, y/2, 150,opcty)
  stroke(y/2, x/6, 22,82)
  // stroke(40,40)
  strokeWeight(1.1)
   // rect(0,0,wx,hx)
   rect(wx,0,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=12
  n+=0.001
  wx-=0.1
  hx-=0.1
  opcty-=0.046

 
  
  console.log(x,y)
}
let n = 0
let c = 6
  let wx = 300
	let hx = 300
  let angle = 0
let opcty = 61
function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  angleMode(DEGREES)

}

function draw() {
	
  // let a = n * 137.6;
  // let a = n * 137.3;
  let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,0,50);
  let w = map(cos(angle),-1,1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill(x/3, y/2, 150,opcty)
  stroke(y/2, x/6, 22,82)
  // stroke(40,40)
  strokeWeight(1.1)
   // rect(0,0,wx,hx)
   rect(wx,hx,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=0.1
  n+=0.01
  wx-=0.3
  hx-=0.3
  opcty-=0.046

 
  
  console.log(x,y)
}
let n = 0
let c = 6
  let wx = 300
	let hx = 300
  let angle = 0
let opcty = 61
function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  // angleMode(DEGREES)

}

function draw() {
	
  // let a = n * 137.6;
  // let a = n * 137.3;
  let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,0,50);
  let w = map(cos(angle),-1,1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill(x/3, y/2, 150,opcty)
  stroke(y/2, x/6, 22,82)
  // stroke(40,40)
  strokeWeight(1.1)
   // rect(0,0,wx,hx)
   rect(wx,hx,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=12
  n+=0.0001
  wx-=0.3
  hx-=0.3
  opcty-=0.046

 
  
  console.log(x,y)
}
let n = 0
let c = 6
  let wx = 300
	let hx = 300
  let angle = 0
let opcty = 61
function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CORNER)
  angleMode(DEGREES)

}

function draw() {
	
  // let a = n * 137.6;
  // let a = n * 137.3;
  let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,0,50);
  let w = map(cos(angle),-1,1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill(x/3, y/2, 150,opcty)
  stroke(y/2, x/6, 22,82)
  // stroke(40,40)
  strokeWeight(1.3)
   rect(0,0,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=11
  n+=0.001
  wx-=0.3
  hx-=0.3
  opcty-=0.046

 
  
  console.log(x,y)
}
let n = 0
let c = 6
  let wx = 300
	let hx = 300
  let angle = 0
let opcty = 61
function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  // angleMode(DEGREES)

}

function draw() {
	
  // let a = n * 137.6;
  // let a = n * 137.3;
  let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,0,50);
  let w = map(cos(angle),-1,1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill(x/3, y/2, 150,24)
  stroke(y/3, x/6, 22,82)
  // stroke(40,40)
  strokeWeight(1.3)
   rect(0,0,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=11
  n+=0.001
  wx-=0.3
  hx-=0.3
  opcty-=0.046

 
  
  console.log(x,y)
}
let n = 0
let c = 6
  let wx = 300
	let hx = 300
  let angle = 0
let opcty = 61
function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  angleMode(DEGREES)

}

function draw() {
	
  // let a = n * 137.6;
  // let a = n * 137.3;
  let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,0,50);
  let w = map(cos(angle),-1,1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill(x/3, y/2, 150,opcty)
  stroke(y/3, x/6, 22,82)
  // stroke(40,40)
  strokeWeight(1.3)
   rect(0,0,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=11
  n+=0.01
  wx-=0.3
  hx-=0.3
  opcty-=0.046

 
  
  console.log(x,y)
}
let n = 0
let c = 6
  let wx = 300
	let hx = 300
  let angle = 0
let opcty = 61
function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  angleMode(DEGREES)

}

function draw() {
	
  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,0,50);
  let w = map(cos(angle),-1,1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill( 150,opcty)
  stroke(y, x, 22,72)
  stroke(40,40)
  strokeWeight(1.3)
   rect(0,0,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=11
  n+=0.001
  wx-=0.3
  hx-=0.3
  opcty-=0.046

 
  
  console.log(hx,opcty)
}
let n = 0
let c = 6
  let wx = 200
	let hx = 200
  let angle = 0

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CORNER)
  angleMode(DEGREES)

}

function draw() {
	
//   let a = n * 137.6;
  // let a = n * 137.3;
  let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,0,50);
  let w = map(cos(angle),-1,1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill( 150,61)
  stroke(y, x, 22,72)
  stroke(40)
  strokeWeight(1.3)
   rect(0,0,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=1.5
  n+=0.05
  wx-=0.05
  hx-=0.05
  
 
  
  console.log(hx)
}let n = 0
let c = 6
  let wx = 200
	let hx = 200
  let angle = 0

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CORNER)
  angleMode(DEGREES)

}

function draw() {
	
//   let a = n * 137.6;
  // let a = n * 137.3;
  let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,0,50);
  let w = map(cos(angle),-1,1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill( 150,61)
  stroke(y, x, 22,72)
  stroke(40)
  strokeWeight(1.3)
   rect(0,0,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=0.5
  n+=0.05
  wx-=0.05
  hx-=0.05
  
 
  
  console.log(hx)
}let n = 0
let c = 6
  let wx = 200
	let hx = 200
  let angle = 0

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CORNER)
  angleMode(DEGREES)

}

function draw() {
	
//   let a = n * 137.6;
  // let a = n * 137.3;
  let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,0,50);
  let w = map(cos(angle),-1,1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill( 150,61)
  stroke(y, x, 22,72)
  stroke(40)
  strokeWeight(1.3)
   rect(0,0,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=0.3
  n+=0.1
  wx-=0.05
  hx-=0.05
  
 
  
  console.log(hx)
}let n = 0
let c = 6
  let wx = 200
	let hx = 200
  let angle = 0

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CORNER)
  angleMode(DEGREES)

}

function draw() {
	
//   let a = n * 137.6;
  // let a = n * 137.3;
  let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,0,50);
  let w = map(cos(angle),-1,1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill( 150,61)
  stroke(y, x, 22,72)
  stroke(40)
  strokeWeight(1.3)
   rect(0,0,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=0.03
  n+=0.1
  wx-=0.05
  hx-=0.05
  
 
  
  console.log(hx)
}let n = 0
let c = 6
  let wx = 200
	let hx = 200
  let angle = 0

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  // angleMode(DEGREES)

}

function draw() {
	
//   let a = n * 137.6;
  // let a = n * 137.3;
  let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-1,1,30,50);
  let w = map(cos(angle),-1,1,40,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill( x,11)
  stroke(y, x, 22,72)
  stroke(40)
  strokeWeight(1.3)
   rect(w,h,wx,hx)

  // rect(0,0,w,h)
   // rect(0,0,wx,hx)
  angle+=0.03
  n+=0.1
  wx-=0.05
  hx-=0.05
  
 
  
  console.log(hx)
}let n = 0
let c = 6
  let wx = 200
	let hx = 200
  let angle = 0

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  angleMode(DEGREES)

}

function draw() {
	
//   let a = n * 137.6;
  // let a = n * 137.3;
  let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  
   let h = map(sin(angle),-0.1,0.1,0,50);
  let w = map(cos(angle),-0.1,0.1,0,50);

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill( x,51)
  stroke(y, x, 22,72)
  stroke(40)
  strokeWeight(1.3)
 
  // rect(0,0,w,h)
   rect(0,0,wx,hx)
  angle+=0.03
  n+=0.1
  wx-=0.05
  hx-=0.05
  
 
  
  console.log(hx)
}let n = 0
let c = 6
  let wx = 200
	let hx = 200
  let angle = 0

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  angleMode(DEGREES)

}

function draw() {
	
//   let a = n * 137.6;
  let a = n * 137.3;
  // let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill( x,y, wx, 151)
  stroke(y, x, 22,72)
  stroke(40)
  strokeWeight(1.3)
  rect(0,0,wx,hx)
  
  angle+=0.1
  n+=1
  wx-=0.05
  hx-=0.05
  
 
  
  console.log(hx)
}let n = 0
let c = 6
  let wx = 100
	let hx = 102
  let angle = 0

function setup() {
  createCanvas(1250, 750);
  background(220);
  rectMode(CENTER)
  // angleMode(DEGREES)

}

function draw() {
	
//   let a = n * 137.6;
  let a = n * 137.3;
  // let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  

  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill( x,y, wx, 151)
  stroke(y, x, 22,72)
  stroke(40)
  strokeWeight(1.3)
  rect(0,0,wx,hx)
  
  angle+=0.4
  n+=0.2
  wx-=0.05
  hx-=0.05
  
 
  
  console.log(hx)
}let n = 0
let c = 6


function setup() {
  createCanvas(550, 550);
  background(220);
  rectMode(CENTER)
  angleMode(DEGREES)

}

function draw() {
	
//   let a = n * 137.6;
  // let a = n * 137.3;
  let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  let angle = 0
  translate(x,y)
  // rotate(a+22)
  rotate(angle)

  fill( x/3,215, y/3, 51)
  stroke(y, x, 22,22)
  stroke(70,190)
  strokeWeight(1.3)
  rect(111,54,x,y)
  angle+=1
  n+=3
}let n = 0
let c = 6


function setup() {
  createCanvas(550, 550);
  background(220);
  rectMode(CENTER)
  // angleMode(DEGREES)

}

function draw() {
	
  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  let angle = 0
  translate(x,y)
  rotate(a+22)
  fill(215, x/3, y/3, 11)
  stroke(y/3, 100, x/3,180)
  stroke(70,130)
  strokeWeight(1)
  rect(0,0,x,y)
  angle+=1
  n+=2
}let inc = 0.01
let scl = 20
let cols, rows
let zoff = 0
let fr;

let particles = [];

let flowfield = [];

function setup() {
  createCanvas(700, 550);
  background(100)
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
  
  flowfield = new Array(cols * rows)
  for (let i = 0; i < 100; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  // background(100)

  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = (x + y * cols);
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(21)
      fill(angle*70,angle*87)
      flowfield[index] = v;
      xoff += inc;
      // stroke(0, 41)
      // push()
      // fill(angle*100,angle*120,angle*50, 141)
      // translate(x * scl, y * scl)
      // rotate(v.heading())
      // line(0, 0, scl, 0)
      // rect(x,scl,scl/1.5,scl/1.5,4)
      // pop()
    }
    yoff += inc;
    zoff += 0.0002;

  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update()
    particles[i].show()
    particles[i].edges()
  }
  fr.html(floor(frameRate()));

}let inc = 0.02
let scl = 20
let cols, rows
let zoff = 0
let fr;

let particles = [];

let flowfield = [];

function setup() {
  createCanvas(500, 500);
  background(100)
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
  
  flowfield = new Array(cols * rows)
  for (let i = 0; i < 200; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  // background(100)

  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = (x + y * cols);
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1)
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 41)
      // push()
      // fill(angle*100,angle*120,angle*50, 141)
      // translate(x * scl, y * scl)
      // rotate(v.heading())
      // line(0, 0, scl, 0)
      // rect(x,scl,scl/1.5,scl/1.5,4)
      // pop()
    }
    yoff += inc;
    zoff += 0.0002;

  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update()
    particles[i].show()
    particles[i].edges()
  }
  fr.html(floor(frameRate()));

}let inc = 0.02
let scl = 20
let cols, rows
let zoff = 0
let fr;

function setup() {
  createCanvas(500, 500);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
    background(100)

}

function draw() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = (x + y * width) * 4;
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      xoff += inc;
      stroke(0,41)
      push()
      fill(angle*100,angle*120,angle*50, 141)
      translate(x * scl, y * scl)
      rotate(v.heading())
      // line(0, 0, scl, 0)
      ellipse(x,scl,scl/1.5,scl/1.5,4)
      pop()
    }
    yoff += inc;
		zoff +=0.0002;
  }
  fr.html(floor(frameRate()));

}let inc = 0.01

function setup() {
  createCanvas(400, 400);
  pixelDensity(1)

}

function draw() {
  let yoff = 0

  loadPixels();

  for (let y = 0; y < height; y++) {
    let xoff = 0
    for (let x = 0; x < width; x++) {

      let index = (x + y * width) * 4
      let r = noise(xoff, yoff) * 255
      pixels[index] = r
      pixels[index + 1] = r
      pixels[index + 2] = r
      pixels[index + 3] = r
      xoff += inc
    }
    yoff += inc
  }

  updatePixels()
}let start = 0
let inc = 0.01
function setup() {
  createCanvas(400, 400);


}

function draw() {
    background(150);

  stroke(255)
  noFill()
	beginShape()
  let xoff = start
  for (let x = 0; x < width; x++) {
    stroke(255)
    let n = map(noise(xoff), 0,1,0,height)
    let s = map(sin(xoff), 0,1,-50,50)
    let y = s+n
    // let y = noise(xoff) * height
    vertex(x, y)
     // noLoop()
    xoff+=inc
  }
  endShape()
start+=inc
}let xoffset = 0
let xoffset2 = 1

function setup() {
  createCanvas(400, 400);
    background(220);

}

function draw() {
  
  // let x = random(width)
  let x = map(noise(xoffset), 0,1,0,width)
  let y = map(noise(xoffset2), 0,1,0,width)
  xoffset+=0.01
  xoffset2+=0.01
  fill(255,41)
  ellipse(x,y,24,24)
  
}let rectosphere = []

function setup() {
  rectMode(CENTER)
  createCanvas(540, 540);
  background(220);
  for(let r=0;r<125;r++){
  // let x = random(width)
  // let y = random(height)
  let x = width/2
  let y = height/2
  let w = random(11,21)
  let h = random(21,41)
  let a = 0
  let achange = random(-0.05,0.05)
  let xspeed = random(-0.3,0.3)
  let yspeed = random(-0.4,0.4)
  let angle = 0
  let s 
  let c 
  let s1 = random(0,1)
  let c1 = random(0,0.5)
   
  rectosphere[r] = new recto(x, y, w, h, xspeed, yspeed, a, achange,angle,s,c,s1,c1)
  }
}

function draw() {
  
  for(let i=0;i<rectosphere.length;i++){
  rectosphere[i].move()
  rectosphere[i].bounce()
  rectosphere[i].breathe()
  push()
  rectosphere[i].roto()
  rectosphere[i].show()
  pop()
  }
}let rectosphere = []

function setup() {
  rectMode(CENTER)
  createCanvas(540, 540);
  background(220);
  for(let r=0;r<125;r++){
  // let x = random(width)
  // let y = random(height)
  let x = width/2
  let y = height/2
  let w = random(11,21)
  let h = random(21,41)
  let a = 0
  let achange = random(-0.05,0.05)
  let xspeed = random(-0.3,0.3)
  let yspeed = random(-0.4,0.4)
  let angle = 0
  let s 
  let c 
   
  rectosphere[r] = new recto(x, y, w, h, xspeed, yspeed, a, achange,angle,s,c)
  }
}

function draw() {
  
  for(let i=0;i<rectosphere.length;i++){
  rectosphere[i].move()
  rectosphere[i].bounce()
  rectosphere[i].breathe()
  push()
  rectosphere[i].roto()
  rectosphere[i].show()
  pop()
  }
}let angle=0

let x = 550
let y = 300
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0

function setup() {
  createCanvas(1100, 600);
  background(70)
  rectMode(CENTER);
  
}

function draw() {

  
	translate(x,y)
  rotate(angle)
  let h = map(cos(angle),-0.01,0.01,22,133);
  let w = map(sin(angle),-0.1,0.1,12,150);
  fill(w/2,1)
	// noFill()
  // stroke(220,15,89,179)
	stroke(h/3,123)
  strokeWeight(1.5)
  // drawEllipse(0,0,w,h,)
  drawEllipse(0,0,w,h)
  angle += 0.002


  // x+=(xspeed[xsp])
  // y+=(yspeed[ysp])
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
}
function drawEllipse(x,y,d){
 ellipse(x,y,d,d)
//   rect(x,y,d,d)
  quad(x,x-d,y,y+d,x,y+d,y,x+d)
  // let ch = 0.3
  if(d > 15){
     drawEllipse((x*0.5),y,d*0.5)
    drawEllipse((x*0.5),y,d*0.5)
    // drawEllipse(x, y-d,d*0.8)
  	// drawEllipse(x+d*0.5,y,d*0.5)
  	// drawEllipse(x-d*0.5,y,d*0.5)
  	// drawEllipse(x, y-d*0.5,d*0.5)
  	// drawEllipse(x, y+d*0.5,d*0.5)
  }
}let angle=0

let x = 550
let y = 300
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0

function setup() {
  createCanvas(1100, 600);
  background(70)
  rectMode(CENTER);
  
}

function draw() {

  
	translate(x,y)
  rotate(angle)
  let h = map(cos(angle),-0.01,0.01,22,133);
  let w = map(sin(angle),-0.1,0.1,12,150);
  fill(w/2,1)
	// noFill()
  // stroke(220,15,89,179)
	stroke(h/11,123)
  strokeWeight(1.5)
  // drawEllipse(0,0,w,h,)
  drawEllipse(0,0,w,h)
  angle += 0.002


  // x+=(xspeed[xsp])
  // y+=(yspeed[ysp])
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
}
function drawEllipse(x,y,d){
 ellipse(x,y,d,d)
//   rect(x,y,d,d)
  quad(x,x-d,y,y+d,x,y+d,y,x+d)
  // let ch = 0.3
  if(d > 15){
     drawEllipse((x*0.5),y,d*0.5)
    drawEllipse((x*0.5),y,d*0.5)
    // drawEllipse(x, y-d,d*0.8)
  	// drawEllipse(x+d*0.5,y,d*0.5)
  	// drawEllipse(x-d*0.5,y,d*0.5)
  	// drawEllipse(x, y-d*0.5,d*0.5)
  	// drawEllipse(x, y+d*0.5,d*0.5)
  }
}let angle=0

let x = 550
let y = 300
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0

function setup() {
  createCanvas(1100, 600);
  background(70)
  rectMode(CENTER);
  
}

function draw() {

  
	translate(x,y)
  rotate(angle)
  let h = map(cos(angle),-0.1,0.1,22,133);
  let w = map(sin(angle),-0.1,0.1,12,150);
  fill(w/2,1)
	// noFill()
  // stroke(220,15,89,179)
	stroke(h/3,123)
  strokeWeight(1.5)
  // drawEllipse(0,0,w,h,)
  drawEllipse(0,0,w,h)
  angle += 0.002


  // x+=(xspeed[xsp])
  // y+=(yspeed[ysp])
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
}
function drawEllipse(x,y,d){
ellipse(x,y,d,d)
  rect(x,y,d,d)
  // let ch = 0.3
  if(d > 15){
     drawEllipse((x*0.5),y,d*0.5)
    drawEllipse((x*0.5),y,d*0.5)
    // drawEllipse(x, y-d,d*0.8)
  	// drawEllipse(x+d*0.5,y,d*0.5)
  	// drawEllipse(x-d*0.5,y,d*0.5)
  	// drawEllipse(x, y-d*0.5,d*0.5)
  	// drawEllipse(x, y+d*0.5,d*0.5)
  }
}let angle=0

let x = 550
let y = 300
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0

function setup() {
  createCanvas(1100, 600);
  background(70)
  rectMode(CENTER);
  
}

function draw() {

  
	translate(x,y)
  rotate(angle)
  let h = map(tan(angle),-0.1,0.1,22,133);
  let w = map(sin(angle),-0.1,0.1,12,150);
  fill(w/2,1)
	// noFill()
  // stroke(220,15,89,179)
	stroke(h/3,123)
  strokeWeight(1.5)
  // drawEllipse(0,0,w,h,)
  drawEllipse(0,0,w,h)
  angle += 0.002


  // x+=(xspeed[xsp])
  // y+=(yspeed[ysp])
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
}
function drawEllipse(x,y,d){
ellipse(x,y,d,d)
  rect(x,y,d,d)
  // let ch = 0.3
  if(d > 15){
     drawEllipse((x*0.5),y,d*0.5)
    drawEllipse((x*0.5),y,d*0.5)
    // drawEllipse(x, y-d,d*0.8)
  	// drawEllipse(x+d*0.5,y,d*0.5)
  	// drawEllipse(x-d*0.5,y,d*0.5)
  	// drawEllipse(x, y-d*0.5,d*0.5)
  	// drawEllipse(x, y+d*0.5,d*0.5)
  }
}let angle=0

let x = 550
let y = 300
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0

function setup() {
  createCanvas(1100, 600);
  background(70)
  rectMode(CENTER);
  
}

function draw() {

  
	translate(x,y)
  rotate(angle)
  let h = map(cos(angle),-0.1,0.1,22,133);
  let w = map(cos(angle),-0.01,0.01,12,50);
  fill(w/2,1)
	// noFill()
  // stroke(220,15,89,179)
	stroke(h/3,123)
  strokeWeight(1.5)
  // drawEllipse(0,0,w,h,)
  drawEllipse(0,0,w,h)
  angle += 0.002


  // x+=(xspeed[xsp])
  // y+=(yspeed[ysp])
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
}
function drawEllipse(x,y,d){
ellipse(x,y,d,d)
  rect(x,y,d,d)
  // let ch = 0.3
  if(d > 15){
     drawEllipse((x*0.5),y,d*0.5)
    drawEllipse((x*0.5),y,d*0.5)
    // drawEllipse(x, y-d,d*0.8)
  	// drawEllipse(x+d*0.5,y,d*0.5)
  	// drawEllipse(x-d*0.5,y,d*0.5)
  	// drawEllipse(x, y-d*0.5,d*0.5)
  	// drawEllipse(x, y+d*0.5,d*0.5)
  }
}let angle=0

let x = 550
let y = 300
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0

function setup() {
  createCanvas(1100, 600);
  background(70)
  rectMode(CENTER);
  
}

function draw() {

  
	translate(x,y)
  rotate(angle)
  let h = map(sin(angle),-0.1,0.1,22,133);
  let w = map(cos(angle),-0.1,0.1,12,120);
  fill(w/2,1)
	// noFill()
  // stroke(220,15,89,179)
	stroke(h/3,123)
  strokeWeight(1.5)
  // drawEllipse(0,0,w,h,)
  drawEllipse(0,0,w,h)
  angle += 0.002


//   x+=(xspeed[xsp])
//   y+=(yspeed[ysp])
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
}
function drawEllipse(x,y,d){
ellipse(x,y,d,d)
  rect(x,y,d,d)
  
  if(d > 38){
    //  drawEllipse(x-d ,y,d)
    // drawEllipse(x-d,y-d,d)
    // drawEllipse(x, y-d,d)
  	drawEllipse(x+d*0.5,y,d*0.5)
    drawEllipse(x-d*0.5,y,d*0.5)
    drawEllipse(x, y-d*0.5,d*0.5)
    drawEllipse(x, y+d*0.5,d*0.5)
  }
}let angle=0

let x = 550
let y = 300
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(70)
  // rectMode(CENTER);
  
}

function draw() {

  
	translate(x,y)
  rotate(angle)
  let h = map(sin(angle),-0.02,0.02,22,133);
  let w = map(tan(angle),-0.1,0.1,12,120);
  fill(w/2,1)
	// noFill()
  // stroke(220,15,89,179)
	stroke(h/3,72)
  strokeWeight(1.5)
  drawEllipse(0,0,w,h)
  drawEllipse(120,40,w,h)
  angle += 0.002

  x+=(xspeed[xsp])
  y+=(yspeed[ysp])
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
}
function drawEllipse(x,y,d,d){
ellipse(x,y,d,d)
  rect(x,y,d,d)
  
  if(d > 4){
    //  drawEllipse(x-d ,y,d)
    // drawEllipse(x-d,y-d,d)
    // drawEllipse(x, y-d,d)
  	drawEllipse(x+d*0.5,y,d*0.5)
    drawEllipse(x-d*0.5,y,d*0.5)
    drawEllipse(x, y-d*0.5,d*0.5)
  }
}let angle=0

let x = 550
let y = 300
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0

function setup() {
  createCanvas(1100, 550);
  background(170)
  rectMode(CENTER);
  
}

function draw() {

  
	translate(x,y)
  rotate(angle)
  let h = map(sin(angle),-0.1,0.1,22,83);
  let w = map(cos(angle),-0.1,0.1,12,70);
  fill(h/3,1)
	// noFill()
  // stroke(220,15,89,179)
	stroke(h/3,123)
  strokeWeight(1.5)
  drawEllipse(0,0,w,h,)
  angle += 0.002

  // x+=(xspeed[xsp])
  // y+=(yspeed[ysp])
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
}
function drawEllipse(x,y,d){
ellipse(x,y,d,d)
  rect(x,y,d,d)
  
  if(d > 4){
    //  drawEllipse(x-d ,y,d)
    // drawEllipse(x-d,y-d,d)
    // drawEllipse(x, y-d,d)
  	drawEllipse(x+d*0.5,y,d*0.5)
    drawEllipse(x-d*0.5,y,d*0.5)
    // drawEllipse(x, y-d*0.5,d*0.5)
  }
}let angle=0

let x = 199
let y = 199
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0

function setup() {
  createCanvas(1100, 600);
  background(70)
  rectMode(CENTER);
  
}

function draw() {

  
	translate(x,y)
  rotate(angle)
  let h = map(sin(angle),-0.1,0.1,22,133);
  let w = map(cos(angle),-0.1,0.1,12,120);
  fill(w/2,1)
	// noFill()
  // stroke(220,15,89,179)
	stroke(h/3,123)
  strokeWeight(1.5)
  drawEllipse(0,0,w,h,)
  angle += 0.1

  x+=(xspeed[xsp])
  y+=(yspeed[ysp])
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
}
function drawEllipse(x,y,d,d){
ellipse(x,y,d,d)
  rect(x,y,d,d)
  
  if(d > 3){
    //  drawEllipse(x-d ,y,d)
    // drawEllipse(x-d,y-d,d)
    // drawEllipse(x, y-d,d)
  	drawEllipse(x+d*0.5,y,d*0.5)
    drawEllipse(x-d*0.5,y,d*0.5)
    drawEllipse(x, y-d*0.5,d*0.5)
  }
}let angle=0

let x = 199
let y = 199
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0

function setup() {
  createCanvas(1100, 600);
  background(70)
  rectMode(CENTER);
  
}

function draw() {

  
	translate(x,y)
  rotate(angle)
  let h = map(sin(angle),-0.1,0.1,22,133);
  let w = map(cos(angle),-0.01,0.01,12,23);
  fill(h/2,w/2,h+w/2,1)
	// noFill()
  // stroke(220,15,89,179)
	stroke(h/2,w/2,h+w/2,123)
  strokeWeight(1.5)
  drawEllipse(0,0,w,h,)
  angle += 0.01

  x+=xspeed[xsp]
  y+=yspeed[ysp]
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
}
function drawEllipse(x,y,d,f){
ellipse(x,y,y,f)
  if(d > 5){
     drawEllipse(x ,y,d*0.5)
    drawEllipse(x,y,d*0.5)
    drawEllipse(x, y,d*0.5)
  // drawEllipse(x+ d*0.5,y,d*0.5)
  //   drawEllipse(x- d*0.5,y,d*0.5)
  //   drawEllipse(x, y- d*0.5,d*0.5)
  }
}let angle=0

let x = 199
let y = 199
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0

function setup() {
  createCanvas(1100, 600);
  background(70)
  rectMode(CENTER);
  
}

function draw() {

  
	translate(x,y)
  rotate(angle)
  let h = map(sin(angle),-0.1,0.1,22,133);
  let w = map(cos(angle),-0.01,0.01,12,23);
  fill(h/2,w/2,h+w/2,1)
	// noFill()
  stroke(220,15,89,179)
  strokeWeight(1.5)
  drawEllipse(0,0,w,h,)
  angle += 0.01

  x+=xspeed[xsp]
  y+=yspeed[ysp]
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
}
function drawEllipse(x,y,d){
ellipse(x,y,d)
  if(d > 11){
     drawEllipse(x ,y,d*0.5)
    drawEllipse(x,y,d*0.5)
    drawEllipse(x, y,d*0.5)
  // drawEllipse(x+ d*0.5,y,d*0.5)
  //   drawEllipse(x- d*0.5,y,d*0.5)
  //   drawEllipse(x, y- d*0.5,d*0.5)
  }
}let cx = 400
let cy = 400
let xSlider
let xSlider2
let xSlider3
let xSlider4

function setup() {
  createCanvas(800, 800);
      background(0);


  xSlider = createSlider(0,800,200)
	xSlider2 = createSlider(0,800,200)
  xSlider3 = createSlider(0,800,200)
  xSlider4 = createSlider(0,800,200)
}

function draw() {

  stroke(xSlider.value()/2,xSlider2.value()/2,xSlider3.value()/2)
  strokeWeight(0.5)
  noFill()
  drawCircle(xSlider.value(), xSlider2.value(), xSlider3.value(), xSlider4.value())
  // cx+= 0.5
  // cy+= 0.5
}

function drawCircle(x, y, d, d2) {
  // ellipse(x, y, d, d2)
  // line(x,x,y,d)
    rect(x,y,d,d)


  if (d > 19) {
    drawCircle(x + d * 0.5, y, d * 0.5)
    drawCircle(x - d * 0.5, y, d * 0.5)
    drawCircle(x, y + d * 0.5, d * 0.5)

  }

}let cx = 400
let cy = 400
let xSlider
let xSlider2
let xSlider3
let xSlider4

function setup() {
  createCanvas(800, 800);
      background(0);


  xSlider = createSlider(0,800,200)
	xSlider2 = createSlider(0,800,200)
  xSlider3 = createSlider(0,800,200)
  xSlider4 = createSlider(0,800,200)
}

function draw() {

  stroke(xSlider.value()/2,xSlider2.value()/2,xSlider3.value()/2)
  strokeWeight(0.5)
  noFill()
  drawCircle(xSlider.value(), xSlider2.value(), xSlider3.value(), xSlider4.value())
  // cx+= 0.5
  // cy+= 0.5
}

function drawCircle(x, y, d, d2) {
  // ellipse(x, y, d, d2)
  // line(x,x,y,d)
    ellipse(x,y,d,d)


  if (d > 19) {
    drawCircle(x + d * 0.5, y, d * 0.5)
    drawCircle(x - d * 0.5, y, d * 0.5)
    drawCircle(x, y + d * 0.5, d * 0.5)

  }

}let cx = 400
let cy = 400
let xSlider
let xSlider2
let xSlider3
let xSlider4

function setup() {
  createCanvas(800, 800);
    background(0);

  xSlider = createSlider(0,800,200)
	xSlider2 = createSlider(0,800,200)
  xSlider3 = createSlider(0,800,200)
  xSlider4 = createSlider(0,800,200)
}

function draw() {

  stroke(255)
  noFill()
  drawCircle(xSlider.value(), xSlider2.value(), xSlider3.value(), xSlider4.value())
  // cx+= 0.5
  // cy+= 0.5
}

function drawCircle(x, y, d, d2) {
  line(x, y, d, d2)

  if (d > 11) {
    drawCircle(x + d * 0.5, y, d * 0.5)
    drawCircle(x - d * 0.5, y, d * 0.5)
    drawCircle(x, y + d * 0.5, d * 0.5)

  }

}
let cx = 400
let cy =400

function setup() {
  createCanvas(800, 800);
background(0);
 
}

function draw() {
	  
  stroke(255)
  noFill()
  drawCircle(cx,cy,400)
 		// cx+= 0.5
 		// cy+= 0.5
}

function drawCircle(x,y,d){
line(x/33,x*5,y,x)
  
  if(d > 35){
  drawCircle(x+ d*0.5,y,d*0.5)
    drawCircle(x- d*0.5,y,d*0.5)
    drawCircle(x, y + d*0.5,d*0.5)
   
  }
  
}

let cx = 100
let cy =100

function setup() {
  createCanvas(800, 800);
background(0);
 
}

function draw() {
	  
  stroke(255)
  noFill()
  drawCircle(cx,cy,300)
 		cx+= 0.5
  	cy+= 0.5
}

function drawCircle(x,y,d){
rect(x,y,d,d)
  let min = map(mouseX,0,width,60,8)
  if(d > min){
  drawCircle(x+ d*0.5,y,d*0.5)
    drawCircle(x- d*0.5,y,d*0.5)
    drawCircle(x, y + d*0.5,d*0.5)
   
  }
  
}



function setup() {
  createCanvas(800, 800);

 
}

function draw() {
	  background(0);
  stroke(255)
  noFill()
  drawCircle(width/2,height/2,300)
  
}

function drawCircle(x,y,d){
rect(x,y,d,d)
  let min = map(mouseX,0,width,60,8)
  if(d > min){
  drawCircle(x+ d*0.5,y,d*0.5)
    drawCircle(x- d*0.5,y,d*0.5)
    drawCircle(x, y + d*0.5,d*0.5)
    drawCircle(x,y- d*0.5,d*0.5)
  }
}


function setup() {
  createCanvas(800, 800);

 
}

function draw() {
	  background(0);
  stroke(255)
  noFill()
  drawCircle(300,200,300)
  
}

function drawCircle(x,y,d){
ellipse(x,y,d)
  if(d > 2){
  drawCircle(x+ d*0.5,y,d*0.5)
    drawCircle(x- d*0.5,y,d*0.5)
  }
}let n = 0
let c = 7


function setup() {
  createCanvas(800, 800);
  background(220);
  rectMode(CENTER)
  angleMode(DEGREES)
  colorMode(HSB)
}

function draw() {

  let a = n * 137.5;
  let r = c * sqrt(n);

  let x = r * cos(a) + width / 2
  let y = r * sin(a) + height / 2
  fill(n/22 % 256, 255,255)
  // fill(a % 256, 255,255)
  // fill((a-r) % 256, 255,255)
	strokeWeight(0.5)
  rect(x, y, 111, 111, 4)

  n++
}let n = 0
let c = 3
let ts = 12


function setup() {
  createCanvas(800, 800);
  background(220);
  rectMode(CENTER)
  textAlign(CENTER)

}

function draw() {
  let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;
  let r = c * sqrt(n);
  let x = r * cos(a) + width / 2
  let y = r * sin(a) + height / 2
  fill(255)
  strokeWeight(2)
  // rect(x,y,194,194)
  textSize(ts)
  stroke(0)
  text("neyirello", x, y)
  n++
  ts += 0.1
  if (ts > 100) {
    ts *= -1
  }
  console.log(ts)
}let n = 0
let c = 6
  let ts= 12


function setup() {
  createCanvas(800, 800);
  background(220);
  rectMode(CENTER)
  textAlign(CENTER)

}

function draw() {
	let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;
  let r = c * sqrt(n);
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  fill(255)
  strokeWeight(2)
  // rect(x,y,194,194)
  textSize(ts)
  stroke(0)
	text("[]",x,y)  
  n++
  ts+=0.1
}let n = 0
let c = 6


function setup() {
  createCanvas(800, 800);
  background(220);
  rectMode(CENTER)

}

function draw() {
	let a = n * 137.6;
  // let a = n * 137.3;
  // let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  fill(255)
  strokeWeight(1)
  rect(x,y,194,194)
  
  n++
}let n = 0
let c = 2


function setup() {
  createCanvas(400, 400);
  background(220);
angleMode(DEGREES)
}

function draw() {

  let a = n * 137.3;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width/2
  let y = r * sin(a) + height/2
  fill(255)
  rect(x,y,18,8)
  
  n++
}// The midi notes of a scale
var notes = [60, 62, 64, 65, 67, 69, 71];
// For automatically playing the song
var index = 0;
var trigger = 0;
var osc;
let images = []
let pics =[];
let imgH1;
let key;
let notePlay = false


function preload(){
  
  for(let i = 0; i < 6; i++) {
  pics.push(loadImage('assets/' + i + '.jpg'));
  }
  
	imgH1 = loadImage('assets/1818.png');
  imgH2 = loadImage("assets/1860.png");
  imgH3 = loadImage("assets/1869.png");
  imgH4 = loadImage("assets/1870.png");
  imgH5 = loadImage("assets/1890.png");
  imgH6 = loadImage("assets/1960.png");
  imgH7 = loadImage("assets/1970.png");
  
  mySound = loadSound("hello.mp3") 
}


function setup() {
  createCanvas(800, 550);
  images = [imgH1,imgH2,imgH3,imgH4,imgH5,imgH6,imgH7];
  
  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
  
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(2, 0.2);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0, 0.2);
    }, duration - 50);
  }
}

function draw() {
  // Draw a keyboard
  // The width for each key
  var w = width / notes.length;
  for (var i = 0; i < notes.length; i++) {
    var x = i * w;
    // If the mouse is over the key
    if (mouseX > x && mouseX < x + w && mouseY > (height-1)/5*4) {
      // If we're clicking
      if (mouseIsPressed) {
        fill(255, 100, 100);
        // Or just rolling over
      } else {
        fill(127);
      }
    } else {
      fill(200);
    }
    // Draw the key
    rect(x, height-(w-1), w - 1, (height - 1)/3);
  }

    // image(imgH1,15,450,80,80);
  
  for ( let i=0; i<images.length; i++){
    let picx = i * w+w/10;
    let picy = height-(w-1);
   image(images[i],picx,picy,width/9,width/9);
  }
  let px = 0;
  let py = 0;
  
  // if (playNote(notes[key])) {notePlay = true}
  // if (notePlay = true) {image(pics[key],px,py,50,50)}
  
  // image(pics[key],px,py,50,50);

  
}

// When we click
function mousePressed() {
  // Map mouse to the key index
  key = floor(map(mouseX, 0, width, 0, notes.length));
  playNote(notes[key]);
  image(pics[key],0,0);
  mySound.play()
  
}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0, 0.5);
}let angle=0

let x = 199
let y = 199
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0

function setup() {
  createCanvas(1000, 400);
  background(70)
  rectMode(CENTER);
  
}

function draw() {

  
	translate(x,y)
  rotate(angle)
  let h = map(sin(angle),-0.1,0.1,22,133);
  let w = map(cos(angle),-1,1,12,23);
  fill(170,x/3,y/3,120)
  stroke(x/2,15,89,179)
  strokeWeight(1.5)
  line(0,0,w,h)
  rect(w,h,w,h)
  fill(x/3,y/3,170,20)
	ellipse(w,h,55,49)
  angle += 0.01

  x+=xspeed[xsp]
  y+=yspeed[ysp]
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
   
  
  
}let angle=0

let x = 199
let y = 199
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0

function setup() {
  createCanvas(1100, 600);
  background(70)
  rectMode(CENTER);
  
}

function draw() {

  
	translate(x,y)
  rotate(angle)
  let h = map(sin(angle),-0.1,0.1,22,133);
  let w = map(cos(angle),-0.01,0.01,12,23);
  // fill(h/2,w/2,h+w/2,10)
	// noFill()
	fill(y/3,123,x/5)
  // stroke(220,15,89,179)
  stroke(x/5,123,y/3)
  strokeWeight(1.5)
  ellipse(0,0,w,h)
  angle += 0.01

  x+=xspeed[xsp]
  y+=yspeed[ysp]
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
   
  
  
}let angle=0

let x = 199
let y = 199
let x2 = 50
let y2 = 200
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [0.5,1.4,0.7,1.1,0.3]
let x2speed = [0.5,1.4,0.7,1.1,0.3]
let y2speed = [0.3,2.9,4.1,3.2,1.4,2.2]
let xsp = 0
let ysp = 0
let x2sp = 0
let y2sp = 0

function setup() {
  createCanvas(1100, 600);
  background(70)
  rectMode(CENTER);
  
}

function draw() {

  push()
	translate(x,y)
  rotate(angle)
  let h = map(sin(angle),-1,1,22,55);
  let w = map(cos(angle),-0.01,0.01,8,15);
  let rx = map(sin(angle),-0.1,0.1,0,5);
  let ry = map(cos(angle),-0.1,0.1,0,20);
  fill(x/5,0,0,33)
  stroke(y/3,0,0,100)
  strokeWeight(1.5)
  rect(0,w,x,h)
  angle += 0.01

  x+=xspeed[xsp]
  y+=yspeed[ysp]
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
   pop()
 
  push()
	translate(x2,y2)
  rotate(angle)
  fill(x2/5,0,0,100)
  stroke(y2/3,0,0,100)
  strokeWeight(1.5)
  rect(h,0,w,y)
  angle += 0.01

  x2+=x2speed[x2sp]
  y2+=y2speed[y2sp]
  if(x2<0 || x2>width) {
    
    x2speed[x2sp] *= (-1);
    x2sp+=1
  	
  }
  if(y2<0 || y2>height) {
    
    y2speed[y2sp] *= (-1);
  	y2sp+=1
  }

  if (x2sp==5) {x2sp=0}
  if (y2sp==6) {y2sp=0}
   pop() 
  
}let angle=0

let x = 199
let y = 199
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0

function setup() {
  createCanvas(1100, 600);
  background(70)
  rectMode(CENTER);
  
}

function draw() {

  
	translate(x,y)
  rotate(angle)
  let h = map(sin(angle),-0.1,0.1,22,103);
  let w = map(cos(angle),-0.01,0.01,8,15);
  fill(w)
  stroke(111,h)
  strokeWeight(1.5)
  rect(0,0,w,h,)
  angle += 0.01

  x+=xspeed[xsp]
  y+=yspeed[ysp]
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
   
  
  
}let angle=0

let x = 199
let y = 199
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0

function setup() {
  createCanvas(1100, 600);
  background(70)
  rectMode(CENTER);
  
}

function draw() {

  
	translate(x,y)
  rotate(angle)
  let h = map(sin(angle),-0.1,0.1,22,133);
  let w = map(cos(angle),-0.01,0.01,12,23);
  fill(h/2,w/2,h+w/2,10)
  stroke(220,15,89,179)
  strokeWeight(1.5)
  ellipse(0,0,w,h,)
  angle += 0.01

  x+=xspeed[xsp]
  y+=yspeed[ysp]
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
   
  
  
}let angle=0

let x = 199
let y = 199
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0

function setup() {
  createCanvas(400, 400);
  background(70)
  rectMode(CENTER);
  
}

function draw() {

  
	translate(x,y)
  rotate(angle)
  let h = map(sin(angle),-10,10,22,133);
  let w = map(cos(angle),-0.1,0.1,12,23);
  fill(255,70)
  stroke(220,15,89,179)
  strokeWeight(1.5)
  rect(0,0,w,h,)
  angle += 0.01

  x+=xspeed[xsp]
  y+=yspeed[ysp]
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
   
  
  
}let angle=0

let x = 199
let y = 199
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0

function setup() {
  createCanvas(400, 400);
  background(70)
  rectMode(CENTER);
  
}

function draw() {

  
	translate(x,y)
  rotate(angle)
  let h = map(sin(angle),-0.1,0.1,22,133);
  let w = map(cos(angle),-1,1,12,23);
  fill(255,100)
  stroke(220,15,89,179)
  strokeWeight(1.5)
  ellipse(0,0,w,h)
  angle += 0.01

  x+=xspeed[xsp]
  y+=yspeed[ysp]
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
   
  
  
}let angle=0

let x = 199
let y = 199
let rx
let ry
let xspeed = [0.3,2.9,4.1,3.2,1.4,2.2]
let yspeed = [2.1,1.4,0.7,3.1,0.3]
let xsp = 0
let ysp = 0

function setup() {
  createCanvas(400, 400);
  background(70)
  rectMode(CENTER);
  
}

function draw() {

  
	translate(x,y)
  rotate(angle)
  let h = map(sin(angle),-1,1,22,133);
  let w = map(cos(angle),-0.1,0.1,12,23);
  fill(255)
  stroke(220,15,89,179)
  strokeWeight(1.5)
  ellipse(0,0,w,h)
  angle += 0.1

  x+=xspeed[xsp]
  y+=yspeed[ysp]
  if(x<0 || x>width) {
    
    xspeed[xsp] *= (-1);
    xsp+=1
  	
  }
  if(y<0 || y>height) {
    
    yspeed[ysp] *= (-1);
  	ysp+=1
  }

  if (xsp==6) {xsp=0}
  if (ysp==5) {ysp=0}
   
  
  
}
let rectoz = []
let video

function setup() {
  video = createCapture(VIDEO)
  
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(1300, 900);
  background(220);
  for (let i = 0; i < 33; i++) {
    let x = 0
    let y = 600
    let tx = 900
    let ty =600
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
  }
}


function draw() {
  video.hide()
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
    
  }
  
  
}
let sliderDensity
let sliderIndex
let sliderR
let sliderG
let sliderB
let sliderA

function setup() {
  createCanvas(800, 600);
  sliderIndex = createSlider(1, 99, 4)
  sliderDensity = createSlider(1, 100, 100)
  sliderR = createSlider(0,255,120)
  
  sliderB = createSlider(0,255,140)
  sliderG = createSlider(0,255,160)
  sliderA = createSlider(0,255,180)

}

function draw() {
  pixelDensity(sliderDensity.value() * 0.01);
  background(0);


  loadPixels();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * sliderIndex.value();
      pixels[index] = sliderR.value();
      pixels[index + 1] = sliderG.value();
      pixels[index + 2] = sliderB.value();
      pixels[index + 3] = sliderA.value();
    }
  }

  updatePixels();


}let rects = [];

function setup() {
  createCanvas(1280, 720);
  background(220);

  for (let i = 0; i < 55 ; i++) {

    let x 
    let y 
    let d = 8
    let d2 = random(2,5)
    let angle = 180
    let offsetX = 640
    let offsetY = 360
    let scalar = random(5)
    let speed = random(-0.5, 0.5)

    rects[i] = new rectTemplate(x, y, d, d2, angle, offsetX, offsetY, 
                                scalar, speed)
  }
}

function draw() {

  for (let indvRect of rects) {
    indvRect.drawrect()
    indvRect.movebounce()
    
  }
  // for (let i = 0; i < rects.length; i++) {
  //   rects[i].movebounce()
  //   rects[i].drawrect()
  // }
}


class rectTemplate {
  constructor(x, y, d, d2, angle, offsetX, offsetY, scalar, speed) {
    this.x = x;
    this.y = y;
  	this.d = d;
    this.d2 = d2;
    this.angle = angle;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.scalar = scalar;
    this.speed = speed;
    
    // this.x = this.offsetX + cos(this.angle) * this.scalar
    // this.y = this.offsetY + sin(this.angle) * this.scalar
  }
  movebounce() {
    if (random(0.5) < 0.2) {
    
    this.x = this.offsetX + sin(this.angle) * this.scalar
    this.y = this.offsetY + sin(this.angle/2) * this.scalar
    this.angle += this.speed
    this.scalar += this.speed
    } else {
    this.x = this.offsetX + cos(this.angle/2) * this.scalar
    this.y = this.offsetY + cos(this.angle) * this.scalar
    this.angle += this.speed
    this.scalar += this.speed
    
    }
    
    

    // if (this.x > width || this.x < 0) {
    //   this.speed *= -1
    // }
    // if (this.y > height || this.y < 0) {
    //   this.speed *= -1
    // }
  }
  drawrect() {
    // fill(random(50,100),random(50,100),random(50,100))
    // stroke(120,255,120)
    // fill(this.x/4,this.y/2,(this.x+this.y)/4,130)
    // fill(this.x/4,(this.x+this.y)/4,130, this.y/1.5)
    fill((this.x+this.y)/3, this.x/4, this.y/21)
    stroke(22,80)
    strokeWeight(1)
    rect(this.x, this.y, this.d, this.d2)

  }
}let cap;
let rectoz = []
let vScale = 5;
let r,g,b
let bright


function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  textAlign(CENTER)
  createCanvas(1600, 900);
  background(0);
  for (let i = 0; i < 210; i++) {
  

    let x = 800
    let y = 450
    let tx = 0
    let ty =0
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5,2.5,3.5,1.5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    
    
    
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
   
  }
}


function draw() {
  
 
  for (let i = 0; i < rectoz.length; i++) {
      translate(400,300)
   
    rectoz[i].show()
    
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let cap;
let vScale = 16;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  cap = createCapture(VIDEO);
  cap.size(width/vScale, height/vScale);
}

function draw() {
  background(151);

  cap.loadPixels();
  loadPixels();
	for (let y = 0; y < cap.height; y++) {
    for (let x = 0; x < cap.width; x++) {
      let index = (x + y * cap.width) * 4;
      let r = cap.pixels[index+0];
      let g = cap.pixels[index+1];
      let b = cap.pixels[index+2];

     let bright = (r+g+b)/3;
      fill(bright);
      rect(x*vScale, y*vScale, vScale, vScale);

    }
  }

  }
let rectoz = []
let b = 0
let video

function setup() {
  video = createCapture(VIDEO)
  
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(1300, 900);
  background(220);
  for (let i = 0; i < 33; i++) {
    let x = 0
    let y = 600
    let tx = 900
    let ty =600
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
  }
}


function draw() {
  video.hide()
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
    
  }
  
  
}
let rectoz = []
let sliderDensity
let sliderIndex

function setup() {
  
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(1300, 900);
  background(220);
  sliderIndex = createSlider(1,99,4)
  sliderDensity = createSlider(1,100,100)

  
  for (let i = 0; i < 33; i++) {
    let x = 0
    let y = 600
    let tx = 900
    let ty =600
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
  }
}


function draw() {
   

   for (let i = 0; i < rectoz.length; i++) {
    // rectoz[i].fillNoise()
    rectoz[i].show()
    
  }
 
 
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let actualSliders = []
let header
let objectz = []


function setup() {

  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(600, 600);
  background(220);
  for (let i = 0; i < 10; i++) {
    let slx = 5
    let sly = 10 + i * 30
    let slw = 150
    let slh = 30
    // sliders[i] = new sliderBox(slx,sly,slw,slh)
    actualSliders[i] = createSlider(0, 255, 170)
    actualSliders[i].position(slx, sly)

  }
  for (let r = 0; r < 22; r++) {
    ox = random(width)
    oy = random(height)
    ow = 11
    oh = 34
    oxspeed = 2
    oyspeed = 3
    or = 200
    og = 33
    ob = 67
    ot = 188
    ostrW = 2
    ostr = 180
    dgree = 0.05
    angle = 0
    objectz[r] = new myObjectz(ox, oy, ow, oh, oxspeed,
    oyspeed, or, og, ob, ot, ostrW, ostr, dgree, angle)
  }

}



function draw() {

   for (let i = 0; i < objectz.length; i++) {

    objectz[i].move()
    objectz[i].movez()
    // objectz[i].bounce()
    // objectz[i].rotatez()
    objectz[i].comeBack()
     
    
     // push()
     objectz[i].roto()
       objectz[i].showRecto()
            // pop()




  }

  console.log(actualSliders[1].value())
  console.log(actualSliders[9].value())

}let video
let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  textAlign(CENTER)
  createCanvas(1600, 900);
  background(0);
  pixelDensity(1)
  video = createCapture(VIDEO)
  video.size(width/16, height/16)
  
  for (let i = 0; i < 50; i++) {
  

    let x = 800
    let y = 450
    let tx = 0
    let ty =0
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5,2.5,3.5,1.5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    
    
    
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
   
  }
}


function draw() {
  video.hide()
  for (let i = 0; i < rectoz.length; i++) {
      translate(400,300)

    rectoz[i].show()
    
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let video;
let vScale = 8

let particles = []

function setup() {
  createCanvas(640, 480);
  pixelDensity(1)
  video = createCapture(VIDEO)
  video.size(width/vScale, height/vScale)
  for(let i = 0; i<100;i++){
  particles[i] = new particle(320,240)
  }
  background(180)
}

function draw() {
  
  for(let i = 0;i<particles.length;i++){
  particles[i].update()
  particles[i].show()
  }
  video.loadPixels()
}let sliderDensity
let sliderIndex

function setup() {
  createCanvas(800, 600);
  sliderIndex = createSlider(1, 99, 4)
  sliderDensity = createSlider(1, 100, 100)

}

function draw() {
  pixelDensity(sliderDensity.value() * 0.01);
  background(0);


  loadPixels();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * sliderIndex.value();
      pixels[index] = random(0, 255)
      pixels[index + 1] = x
      pixels[index + 2] = y
      pixels[index + 3] = 120
    }
  }

  updatePixels();
  //  fill(129)
  // rect(100,100,100,100)

}let cap;
let vScale = 16;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  cap = createCapture(VIDEO);
  cap.size(width/vScale, height/vScale);
}

function draw() {
  background(151);

  cap.loadPixels();
  loadPixels();
	for (let y = 0; y < cap.height; y++) {
    for (let x = 0; x < cap.width; x++) {
      let index = (x + y * cap.width) * 4;
      let r = cap.pixels[index+0];
      let g = cap.pixels[index+1];
      let b = cap.pixels[index+2];

     let bright = (r+g+b)/3;
      fill(bright);
      rect(x*vScale, y*vScale, vScale, vScale);

    }
  }

  }function setup() {
  createCanvas(800, 600);
  pixelDensity(1);
}

function draw() {
  background(0);


  loadPixels();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      pixels[index] = x
      pixels[index+1] = y
      pixels[index+2] = random(0, 255)
      pixels[index+3] = 255
    }
  }
  updatePixels();
  //  fill(129)
  // rect(100,100,100,100)

}let wave;
let playing = false;
let button;
let slider;
let slider2

function setup() {
  createCanvas(100, 100);

  wave = new p5.Oscillator();
  slider = createSlider(100, 1200, 300)
  slider2 = createSlider(1, 100, 0)
  
  wave.setType('sine');
  wave.start();
  wave.freq(300);
  wave.amp(0);
  
	button = createButton('play/pause');
  button.mousePressed(toggle);

}

function draw() {
  wave.freq(slider.value())
  background(151);
}

function toggle() {
  if (!playing) {
    
    wave.amp(slider2.value(), 1);
    playing = true;
  } else {
    // wave.stop();
    wave.amp(0, 1);
    playing = false
  }

}let wave;
let playing = false;
let button;
let slider;

function setup() {
  createCanvas(100, 100);

  wave = new p5.Oscillator();
  slider = createSlider(100, 1200, 300)
  
  wave.setType('sine');
  wave.start();
  wave.freq(300);
  wave.amp(0);
  
	button = createButton('play/pause');
  button.mousePressed(toggle);

}

function draw() {
  wave.freq(slider.value())
  background(151);
}

function toggle() {
  if (!playing) {
    
    wave.amp(1, 1);
    playing = true;
  } else {
    // wave.stop();
    wave.amp(0, 1);
    playing = false
  }

}let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  textAlign(CENTER)
  createCanvas(1600, 900);
  background(0);
  for (let i = 0; i < 93; i++) {
  

    let x = 800
    let y = 450
    let tx = 0
    let ty =0
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5,2.5,3.5,1.5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    
    
    
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
   
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
      translate(400,300)

    rectoz[i].show()
    
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let capture;

function setup() {
  createCanvas(320, 240);
  capture = createCapture(VIDEO)
  capture.size(320,240)
  capture.hide();
  pixelDensity(1)
}

function draw() {
  background(220);
  image(capture,0,0)
  for(let x = 0; x < width; x++){
  for(let y = 0; y < height; y++){
   let c = capture.get(x,y);
    if(x > mouseX-10 && x < mouseX+10){
    // console.log(brightness(c))
    //   console.log(red(c))
      capture.set(x,y,[255,0,0,255])
    
    }
		}
    }
  capture.updatePixels()
}function preload() {
loadJSON("menu.json");

}

function setup() {
  createCanvas(400, 400);
  console.log(menu);
  let apps =  menu["appetizer s"]
  for(let a = 0;a<apps.length; a++)
  {console.log()}
}

function draw() {
  background(220);
}var song, fft;

function preload() {
  song = loadSound("icon.mp3");
}


function setup() {
  createCanvas(800, 800);
	background(0, 0, 0);
  fft = new p5.FFT();
  song.play();
}

function draw() {
  
  fft.analyze();
  bassVal = (int)(fft.getEnergy("bass"));
  lMidVal = (int)(fft.getEnergy("lowMid"));
  midVal = (int)(fft.getEnergy("mid"));
  hMidVal = (int)(fft.getEnergy("highMid"));
  trebVal = (int)(fft.getEnergy("treble"));

  stroke(0);
  fill(255, 186, 73,133);
  ellipse(width / 2, height / 2, bassVal * 4, bassVal * 4);

  noStroke();
  fill(32, 163, 158,133);
  ellipse(width / 2, height / 2, lMidVal * 2, lMidVal * 2);

  noStroke();
  fill(135, 195, 143,133);
  ellipse(width / 2, height / 2, midVal * 2, midVal * 2);

  noStroke();
  fill(239, 91, 91,133);
  ellipse(width / 2, height / 2, hMidVal * 2, hMidVal * 2);

  noStroke();
  fill(79, 0, 75,133);
  ellipse(width / 2, height / 2, trebVal * 2, trebVal * 2);


}let video
let x = 0
let y = 0

function setup() {
  createCanvas(800, 240);

  pixelDensity(1)
  video = createCapture(VIDEO)
  video.size(320, 240)
  background(151)
}

function draw() {

  video.loadPixels()
  let w = video.width;
  let h = video.height;
  // copy(video,w/2,0,1,h,x,y,550,h)
  copy(video,w/2,0,1,h,x,0,1,h)
  x = x + 1


}let video
let x = 0
let y = 0
function setup() {
  createCanvas(320, 240);
  
  pixelDensity(1)
  video = createCapture(VIDEO)
  video.size(320,240)
  background(151)
}

function draw() {
  
  video.loadPixels()
  let w = video.width;
  let h = video.height;
  copy(video,random(width),0,1,h,x,y,550,h)
   x= x+1
  
  
}let video
let x = 0
function setup() {
  createCanvas(800, 240);
  
  pixelDensity(1)
  video = createCapture(VIDEO)
  video.size(320,240)
  background(151)
}

function draw() {
  
  video.loadPixels()
  let w = video.width;
  let h = video.height;
  copy(video,w/2,0,50,h,x,0,50,h)
   x++
  
  
}let url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=71d972d52b144791a794557397b89700&q=human touch'
   
function setup() {
noCanvas()
loadJSON(url,gotData)

}

function gotData(data) {
  let articles = data.response.docs;
  for(let i = 0;i<articles.length;i++) {
  createElement('h1', articles[i].headline.main)
  createP(articles[i].snippet)
  }
    // console.log(data.response.docs[i].headline.main)
}let x = 0 
let issloc

function setup() {
  createCanvas(400, 400)
  loadJSON("https://api.wheretheiss.at/v1/satellites/25544", gotData)
}

function gotData(data) {
  issloc = data;
  console.log(data);
  

}

function draw() {
background(0);
stroke(255);
line(x,0,x,height);
x = x+1;
 if(x>width){
 x= 0 
    }
  if(issloc){
text(issloc.latitude,200,200)
  }
}let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  textAlign(CENTER)
  createCanvas(1600, 900);
  background(0);
  for (let i = 0; i < 93; i++) {
  

    let x = 800
    let y = 450
    let tx = 0
    let ty =0
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5,2.5,3.5,1.5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    
    
    
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
   
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
      translate(400,300)

    rectoz[i].show()
    
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  textAlign(CENTER)
  createCanvas(1600, 900);
  background(0);
  for (let i = 0; i < 153; i++) {
  

    let x = 0
    let y = 0
    let tx = 0
    let ty =0
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5,2.5,3.5,1.5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    
    
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
   
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
    
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  textAlign(CENTER)
  createCanvas(1600, 900);
  background(0);
  for (let i = 0; i < 153; i++) {
  

    let x = 450
    let y = 800
    let tx = 100
    let ty =100
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5,2.5,3.5,1.5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    
    
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
   
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
    
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  textAlign(CENTER)
  createCanvas(1600, 900);
  background(0);
  for (let i = 0; i < 153; i++) {
  

    let x = 450
    let y = 800
    let tx = 801
    let ty =451
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5,2.5,3.5,1.5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    
    
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
   
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
    
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let data

function preload() {
data = loadJSON("birds.json");
}

function setup() {
  noCanvas()
  // createCanvas(400, 400);
  let birds = data.birds;
  
  for (let i = 0; i < birds.length; i++){
  createElement('h1', birds[i].family)
  let members = birds[i].members
  for(let c = 0; c < members.length; c++){
  createDiv(members[c])
  }
  }
  // createP

}

let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  textAlign(CENTER)
  createCanvas(1600, 900);
  background(0);
  for (let i = 0; i < 153; i++) {
  

    let x = 0
    let y = 0
    let tx = 0
    let ty =0
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5,2.5,3.5,1.5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    
    
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
   
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
    
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  textAlign(CENTER)
  createCanvas(1600, 900);
  background(0);
  for (let i = 0; i < 163; i++) {
  

    let x = 0
    let y = 0
    let tx = 0
    let ty =0
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5,2.5,3.5,1.5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    
    
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
   
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
    
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(1300, 900);
  background(220);
  for (let i = 0; i < 263; i++) {
  

    let x = 650
    let y = 450
    let tx = 650
    let ty =450
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5,2.5,3.5,1.5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    
    
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
   
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
    
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(1300, 900);
  background(220);
  for (let i = 0; i < 263; i++) {
  

    let x = 0
    let y = 0
    let tx = 0
    let ty =0
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5,2.5,3.5,1.5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    
    
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
   
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
    
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(1300, 900);
  background(220);
  for (let i = 0; i < 133; i++) {
    let x = width/2
    let y = height/2
    let tx = 0
    let ty =0
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
    
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(1300, 900);
  background(220);
  for (let i = 0; i < 133; i++) {
    let x = width/2
    let y = height/2
    let tx = 0
    let ty =0
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
    
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(1300, 900);
  background(220);
  for (let i = 0; i < 33; i++) {
    let x = 0
    let y = 600
    let tx = 900
    let ty =600
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
    
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(1300, 900);
  background(220);
  for (let i = 0; i < 33; i++) {
    let x = 0
    let y = 600
    let tx = 900
    let ty =600
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
    
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(1300, 900);
  background(220);
  for (let i = 0; i < 33; i++) {
    let x = 900
    let y = 600
    let tx = 0
    let ty =0
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
    
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(1300, 900);
  background(220);
  for (let i = 0; i < 333; i++) {
    let x = 0
    let y = 0
    let tx = 0
    let ty =0
    let a = 0
    // let ac = 0.01
    let ac = 0.02
    let txsp = [1, 2, 3, 4, 5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(1300, 900);
  background(220);
  for (let i = 0; i < 33; i++) {
    let x = 0
    let y = 0
    let tx = 600
    let ty =100
    let a = 0
    // let ac = 0.01
    let ac = 0.05
    let txsp = [1, 2, 3, 4, 5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(1300, 900);
  background(220);
  for (let i = 0; i < 133; i++) {
    let x = 0
    let y = 0
    let tx = 500
    let ty =400
    let a = 0
    // let ac = 0.01
    let ac = 0.5
    let txsp = [1, 2, 3, 4, 5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(1300, 900);
  background(220);
  for (let i = 0; i < 33; i++) {
    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    let a = 0
    let ac = 0.01
    let txsp = [1, 2, 3, 4, 5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let rectoz = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(1300, 900);
  background(220);
  for (let i = 0; i < 33; i++) {
    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    let a = 0
    let ac = 0.1
    let txsp = [1, 2, 3, 4, 5]
    let tysp = [4, 1, 5, 3, 2]
    let ixsp = 0
    let iysp = 0
    rectoz[i] = new recto(x, y, tx, ty, a, ac, txsp, tysp, ixsp, iysp)
  }
}


function draw() {
  for (let i = 0; i < rectoz.length; i++) {
    rectoz[i].show()
  }
}






// function draw() {

//   translate(tx, ty)
//   rotate(a)
//   rect(x, y, 40, 70)
//   a += 1.5
//   tx+=txsp[ixsp]
//   ty+=tysp[iysp]
//   if(tx<0 || tx>width){
//     txsp[ixsp]*=-1
//     ixsp+=1
//     }
//   if(ty<0 || ty>height){
//     tysp[iysp]*=-1
//     iysp+=1
//     }
//   if(ixsp == 5){ixsp=0}
//   if(iysp == 5){iysp=0}
// }let rectosphere = []

function setup() {
  createCanvas(400, 400);
  background(220);
  for(let r=0;r<21;r++){
  let x = random(width)
  let y = random(height)
  let w = random(11,21)
  let h = random(21,41)
  let a = 0
  let achange = 0.01
  let xspeed = random(1,3)
  let yspeed = random(0.5,4)
  rectosphere[r] = new recto(x, y, w, h, xspeed, yspeed, a, achange)
  }
}

function draw() {
  
  for(let i=0;i<rectosphere.length;i++){
  rectosphere[i].move()
  rectosphere[i].bounce()
  push()
  rectosphere[i].roto()
  rectosphere[i].show()
  pop()
  }
}let serial;
let output;
let serialValue1
let serialValue2

function setup() {
  createCanvas(400, 400)
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem14111");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  
  let incomingData = readSrtingUntil('\r\n');
  console.log(incomingData);
  
  
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer

function draw() {
  background(120)
 

}

function mouseDragged() {
}let serial;
let output;
let serialValue1
let serialValue2

function setup() {
  createCanvas(400, 400)
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem14111");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  let splitString = split(currentString, ',')

  // var currentString = serial.read()
  if (currentString) {
    serialValue1 = int(splitString[0]);
    serialValue2 = int(splitString[1]);

    console.log(splitString[0] + "    " + splitString[1]);

  }
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer

function draw() {
  background(120)
  output = int(map(mouseX, 0, width, 0, 179))
  output = constrain(output, 0, 179)
  textSize(40)
  text("my Output is: " + output, 10, 80)
  ellipse(mouseX, height / 2, 50, 50)

}

function mouseDragged() {
  serial.write(output + "\n")
  console.log(outout);
}let rectosphere = []

function setup() {
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(900, 700);
  background(220);
  for(let r=0;r<21;r++){
  let x = 0
  let y = 0
  let w = random(22)
  let h = random(17)
  let a = 0
  let achange = 0.01
  let xspeed = random(2,4)
  let yspeed = random(1,5)
  rectosphere[r] = new recto(x, y, w, h, xspeed, yspeed, a, achange)
  }
}

function draw() {
  
  for(let i=0;i<rectosphere.length;i++){
  
  rectosphere[i].move()
  rectosphere[i].bounce()
  
  // rectosphere[i].roto()
  rectosphere[i].show()
  
  }
}//JSON = Javascript Object Notation - returns either arrays [] 
// or objetcs {k:v} (key:value pairs)

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}// text(), splitTokens(), split(','), loadStrings(path to file url)
// textAlign() rectMode'un text versiyonu.
// concat iki arrayi birlestiriyor
// splitTokens, metni kelimlere4 boluyor.

let txt;
let tokens = []

function preload() {
  txt = loadStrings("joke.txt")
  console.log(txt)


}

function setup() {
  createCanvas(400, 400);
  for (let l of txt) {
    tokens = concat(tokens, splitTokens(l))
    // tokens = splitTokens(txt[0]);

  }
  console.log(tokens)
}

function draw() {
  background(220);
  let x = 0
	let y = 50

  for (let token of tokens) {
    text(token, x, y)
    x = x + textWidth(token)+textWidth('a'); 
    //'a' koyuyoruz ki bosluk olarak bir harf biraksin, 
    //pixel degeri verseydik, texti buyuttugumuzde 
    //sorun olurdu.
    if(x > width - 30) {
    y+= textAscent(token);
    x = 0
    }
  }
  



  // text("A string walks into a bar and orders a drink. The bartender says we don't \n serve strings in here and you're a string. Nope, I'm a frayed knot.", 0,20)

}let serial
let data

function setup() {
  createCanvas(400, 400);
  serial = new p5.serialPort()
  serial.open("/dev/cu.usbmodem1411")
  serial.on("data", processData)
}



function processData() {
let inString = serial.readLine();
console.log(inString)
  if(!inString) return;
  data = inString
  
}

function draw() {
  background(220);
  data = map(data, 700, 900, 0, width)
}let par
let par2
let button
let degrees = 0
let degChange = 0
let tx = 0
let ty = 0
let slider
let input
let initials = "HELLO"


function setup() {
  par = createP("I'm learning about rotation")
  par.mousePressed(changeTextPar)
  par2 = createP("I have to change the angleMode to degrees, if I want to avoid having to work with radians. When working with radians, the value of 360 degrees is represented by 2PI")
  par2.mousePressed(changeTextPar2)
  angleMode(DEGREES)
  createCanvas(600, 600);
  createP("")
  input = createInput("enter your text")
  button = createButton("reset")
  button.mousePressed(reset)
  slider = createSlider(0, 100, 0)
  createP("")
  button = createButton("START/STOP")
  button.mousePressed(startStop)
  button = createButton("faster")
  button.mousePressed(faster)
  button = createButton("slower")
  button.mousePressed(slower)
  button = createButton("1 step up")
  button.mousePressed(stepUp)
  button = createButton("1 step down")
  button.mousePressed(stepDown)

  background(220);

}


function mousePressed() {
  createP("rotation is neat-o")

}

function reset() {
initials = input.value()
degrees = 0
background(220)

}

function startStop() {
  if (degChange == 0) {
    degChange = 1
  } else {
    degChange = 0
  }
}

function faster() {
  degChange += 1
}

function slower() {
  degChange -= 1
}

function stepUp() {
  degrees += 2.5
}

function stepDown() {
  degrees -= 2.5
}

function changeTextPar() {
  par.html("I'm trying to make a logo for my Visual Language assignment")
}

function changeTextPar2() {
  par2.html("Is it strange to have an artist's logo?")
}

function draw() {
  
  translate()
  fill(255)
  strokeWeight(2.5)
  stroke(200, 70, 70, 180)
  textSize(51)
  textFont("FUTURA")
  translate(250, 320)
  rotate(degrees)
  text(initials, tx, ty)
  // text("I", tx+25, ty)
  degrees += degChange
  tx = slider.value()
 console.log(slider.value())
}var serial;
let serialValue1
let serialValue2

function setup() {
  createCanvas(400, 400)
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1431");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  let splitString = split(currentString, ',')

  // var currentString = serial.read()
  if (currentString) {
    serialValue1 = int(splitString[0]);
    serialValue2 = int(splitString[1]);

    console.log(splitString[0] + "    " + splitString[1]);

  }
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer


function draw() {
  background(127, 0, 127);

  var v = serialValue1;

  // Left Eye
  ellipse(width * 0.4, height * 0.4, v * 0.25 + 10, v * 0.25 + 10);

  // Right Eye
  ellipse(width * 0.6, height * 0.4, (2500 / v) + 10, (2500 / v) + 10);

  // Mouth
  bezier(width * 0.3, v * 0.6 + height / 2, width * 0.4, height * 0.8, width * 0.6, height * 0.8, width * 0.7, v * 0.55 + height / 2);

  v += random(-5, 5);
  // Nose
  bezier(width * 0.5, height * 0.5, v * 0.6, height * 0.6, v * 0.6, height * 0.8, width * 0.45, height * 0.67);



}let actualSliders = []
let header
let objectz = []


function setup() {

  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(600, 600);
  background(220);
  for (let i = 0; i < 10; i++) {
    let slx = 5
    let sly = 10 + i * 30
    let slw = 150
    let slh = 30
    // sliders[i] = new sliderBox(slx,sly,slw,slh)
    actualSliders[i] = createSlider(0, 255, 170)
    actualSliders[i].position(slx, sly)

  }
  for (let r = 0; r < 22; r++) {
    ox = random(width)
    oy = random(height)
    ow = 11
    oh = 34
    oxspeed = 2
    oyspeed = 3
    or = 200
    og = 33
    ob = 67
    ot = 188
    ostrW = 2
    ostr = 180
    dgree = 0.05
    angle = 0
    objectz[r] = new myObjectz(ox, oy, ow, oh, oxspeed,
    oyspeed, or, og, ob, ot, ostrW, ostr, dgree, angle)
  }

}



function draw() {

   for (let i = 0; i < objectz.length; i++) {

    objectz[i].move()
    objectz[i].movez()
    // objectz[i].bounce()
    // objectz[i].rotatez()
    objectz[i].comeBack()
     
    
     // push()
     objectz[i].roto()
       objectz[i].showRecto()
            // pop()




  }

  console.log(actualSliders[1].value())
  console.log(actualSliders[9].value())

}///////////


/////////////
let sliders = []
let actualSliders = []
let sliderNr = [1, 2, 3, 4, 5, 6]
let x = 3
let y = 25
let header
let objectz = []


function setup() {
 
  angleMode(DEGREES)
	rectMode(CENTER)
  createCanvas(600, 600);
  background(220);
  for (let i = 0; i < 10; i++) {
    let slx = 5
    let sly = 10 + i * 30
    let slw = 150
    let slh = 30
    // sliders[i] = new sliderBox(slx,sly,slw,slh)
    actualSliders[i] = createSlider(0, 255, 170)
    actualSliders[i].position(slx, sly)

  }
  for (let r = 0; r < 1; r++) {
    ox = random(width)
    oy = random(height)
    ow = 11
    oh = 34
    oxspeed = 2
    oyspeed = 3
    or = 200
    og = 33
    ob = 67
    ot = 188
    ostrW = 2
    ostr = 180
    angle = 2
    offset = 220
    scalar = 20
    speed = 0.05
    dgree = 0
   

    // let ox = random(width)
    // let oy = random(height)
    // let ow
    // let oh
    // let oxspeed
    // let oyspeed
    // let or
    // let og
    // let ob
    // let ot
    // let ostrW
    // let ostr

    // let ox = random(width)
    // let oy = random(height)
    // let ow = actualSliders[0].value()
    // let oh = actualSliders[1].value()
    // let oxspeed = actualSliders[2].value() / 80
    // let oyspeed = actualSliders[3].value() / 80
    // let or = actualSliders[4].value()
    // let og = actualSliders[5].value()
    // let ob = actualSliders[6].value()
    // let ot = actualSliders[7].value()
    // let ostrW = actualSliders[8].value()/200
    // let ostr = actualSliders[9].value()
    objectz[r] = new myObjectz(ox, oy, ow, oh, oxspeed,
                  oyspeed, or, og, ob, ot, ostrW, ostr,
                    angle,offset,scalar,speed)
  }

}



function draw() {

  rect(0, 0, 160, 210, 6)


  for (let i = 0; i < objectz.length; i++) {
   
    objectz[i].move()
    objectz[i].movez()
    // objectz[i].bounce()
     // objectz[i].rotatez()
    objectz[i].comeBack()
    objectz[i].showRecto()
    
   
  }
  
  // ow = actualSliders[0].value()
  // oh = actualSliders[1].value()
  // oxspeed = actualSliders[2].value() / 80
  // oyspeed = actualSliders[3].value() / 80
  // or = actualSliders[4].value()
  // og = actualSliders[5].value()
  // ob = actualSliders[6].value()
  // ot = actualSliders[7].value()
  // ostrW = actualSliders[8].value()
  // ostr = actualSliders[9].value()



  console.log(actualSliders[1].value())
  console.log(actualSliders[9].value())

}///////////


/////////////
let sliders = []
let actualSliders = []
let sliderNr = [1, 2, 3, 4, 5, 6]
let x = 3
let y = 25
let header
let objectz = []


function setup() {
 
  angleMode(DEGREES)
	rectMode(CENTER)
  createCanvas(600, 600);
  background(220);
  for (let i = 0; i < 10; i++) {
    let slx = 5
    let sly = 10 + i * 30
    let slw = 150
    let slh = 30
    // sliders[i] = new sliderBox(slx,sly,slw,slh)
    actualSliders[i] = createSlider(0, 255, 170)
    actualSliders[i].position(slx, sly)

  }
  for (let r = 0; r < 1; r++) {
    ox = random(width)
    oy = random(height)
    ow = 11
    oh = 34
    oxspeed = 2
    oyspeed = 3
    or = 200
    og = 33
    ob = 67
    ot = 188
    ostrW = 2
    ostr = 180
    angle = 2
    offset = 220
    scalar = 20
    speed = 0.05
    dgree = 0
   

    // let ox = random(width)
    // let oy = random(height)
    // let ow
    // let oh
    // let oxspeed
    // let oyspeed
    // let or
    // let og
    // let ob
    // let ot
    // let ostrW
    // let ostr

    // let ox = random(width)
    // let oy = random(height)
    // let ow = actualSliders[0].value()
    // let oh = actualSliders[1].value()
    // let oxspeed = actualSliders[2].value() / 80
    // let oyspeed = actualSliders[3].value() / 80
    // let or = actualSliders[4].value()
    // let og = actualSliders[5].value()
    // let ob = actualSliders[6].value()
    // let ot = actualSliders[7].value()
    // let ostrW = actualSliders[8].value()/200
    // let ostr = actualSliders[9].value()
    objectz[r] = new myObjectz(ox, oy, ow, oh, oxspeed,
                  oyspeed, or, og, ob, ot, ostrW, ostr,
                    angle,offset,scalar,speed)
  }

}



function draw() {

  rect(0, 0, 160, 210, 6)


  for (let i = 0; i < objectz.length; i++) {
   
    objectz[i].move()
    objectz[i].movez()
    // objectz[i].bounce()
     // objectz[i].rotatez()
    objectz[i].comeBack()
    objectz[i].showRecto()
    
   
  }
  
  // ow = actualSliders[0].value()
  // oh = actualSliders[1].value()
  // oxspeed = actualSliders[2].value() / 80
  // oyspeed = actualSliders[3].value() / 80
  // or = actualSliders[4].value()
  // og = actualSliders[5].value()
  // ob = actualSliders[6].value()
  // ot = actualSliders[7].value()
  // ostrW = actualSliders[8].value()
  // ostr = actualSliders[9].value()



  console.log(actualSliders[1].value())
  console.log(actualSliders[9].value())

}function setup() {
}

function draw() {

}let slider
let paragraph
let textBox

function setup() {
  noCanvas()

  slider = createSlider(10, 64, 14)
  textBox = createInput("Tell me abot Cemil")
  paragraph = createP("Cemil Calculator")

  textBox.input(updateText);
  // textBox.changed(updateText);
  slider.input(updateSize)

}

function updateSize() {
  paragraph.style("font-size", slider.value() + "pt")
}

function updateText() {
  paragraph.html(textBox.value())
}

function draw() {
  background(220);
  paragraph.style("background-color", "pink")

}let bgcolor
let button
let txt

function setup() {
  createCanvas(200, 200);
  bgcolor = 120
  txt = createP("this might turn weird")
  txt.mouseOver(changeStyle)
  txt.mouseOut(revertStyle)
  button = createButton("go")
  button.mousePressed(changeStyle)
  

}
function changeStyle() {
txt.style("background-color", "pink")
txt.style("padding","17px")
txt.style("font-family","futura")
}
function revertStyle() {
txt.style("background-color", "brown")
txt.style("padding","10px")

}
function draw() {
  background(bgcolor);
  fill(200,100,100);
  ellipse(100,100,50,50)

}let par
let par2
let button
let degrees = 0
let degChange = 0
let tx = 0
let ty = 0
let slider
let input
let initials = "HELLO"


function setup() {
  par = createP("I'm learning about rotation")
  par.mousePressed(changeTextPar)
  par2 = createP("I have to change the angleMode to degrees, if I want to avoid having to work with radians. When working with radians, the value of 360 degrees is represented by 2PI")
  par2.mousePressed(changeTextPar2)
  angleMode(DEGREES)
  createCanvas(600, 600);
  createP("")
  input = createInput("enter your text")
  button = createButton("reset")
  button.mousePressed(reset)
  slider = createSlider(0, 100, 0)
  createP("")
  button = createButton("START/STOP")
  button.mousePressed(startStop)
  button = createButton("faster")
  button.mousePressed(faster)
  button = createButton("slower")
  button.mousePressed(slower)
  button = createButton("1 step up")
  button.mousePressed(stepUp)
  button = createButton("1 step down")
  button.mousePressed(stepDown)

  background(220);

}


function mousePressed() {
  createP("rotation is neat-o")

}

function reset() {
initials = input.value()
degrees = 0
background(220)

}

function startStop() {
  if (degChange == 0) {
    degChange = 1
  } else {
    degChange = 0
  }
}

function faster() {
  degChange += 1
}

function slower() {
  degChange -= 1
}

function stepUp() {
  degrees += 2
}

function stepDown() {
  degrees -= 2
}

function changeTextPar() {
  par.html("I'm trying to make a logo for my Visual Language assignment")
}

function changeTextPar2() {
  par2.html("Is it narcissistic to have an artist's logo?")
}

function draw() {
  
  translate()
  fill(255)
  strokeWeight(3)
  stroke(200, 70, 70, 180)
  textSize(151)
  textFont("FUTURA")
  translate(250, 320)
  rotate(degrees)
  text(initials, tx, ty)
  // text("I", tx+25, ty)
  degrees += degChange
  tx = slider.value()
 console.log(slider.value())
}var serial;
let serialValue1
let serialValue2
let serialValue3
let serialValue4
let degree = 0


function setup() {
  angleMode(DEGREES);
  rectMode(CENTER)
  createCanvas(1000, 600)
  background(120)
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1431");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  let splitString = split(currentString, ',')

  // var currentString = serial.read()
  if (currentString) {
    serialValue1 = int(splitString[0]);
    serialValue2 = int(splitString[1]);
    serialValue3 = int(splitString[2]);
    serialValue4 = int(splitString[3]);
      
    console.log(splitString[0] + "    " + splitString[1] + "    " + splitString[2] + "    " + splitString[3]);
  
  }
  }

  // Methods available
  // serial.read() returns a single byte of data (first in the buffer)
  // serial.readChar() returns a single char 'A', 'a'
  // serial.readBytes() returns all of the data available as an array of bytes
  // serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
  // serial.readString() retunrs all of the data available as a string
  // serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
  // serial.last() returns the last byte of data from the buffer
  // serial.lastChar() returns the last byte of data from the buffer as a char
  // serial.clear() clears the underlying serial buffer
  // serial.available() returns the number of bytes available in the buffer

  function draw() {
    
    // Polling method
    // if (serial.available() > 0) {
    // var data = serial.read();
    
    fill(serialValue4/6+70,serialValue3/6+70, 180)
    stroke(255,100)
    strokeWeight(1.5)
    textFont("Brush Stroke Of Genius")
	  textSize(serialValue1)
    translate(serialValue4,serialValue3)
    rotate(degree)
    // rect(0,0,serialValue2,serialValue1)
    // stroke(0,100)
    text("C", 0, 0);
		degree+=1

    // }

  }var serial;
let serialValue1
let serialValue2
let serialValue3
let serialValue4
let degree = 0


function setup() {
  angleMode(DEGREES);
  rectMode(CENTER)
  createCanvas(1000, 600)
  background(120)
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem14111");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  let splitString = split(currentString, ',')

  // var currentString = serial.read()
  if (currentString) {
    serialValue1 = int(splitString[0]);
    serialValue2 = int(splitString[1]);
    serialValue3 = int(splitString[2]);
    serialValue4 = int(splitString[3]);
      
    console.log(splitString[0] + "    " + splitString[1] + "    " + splitString[2] + "    " + splitString[3]);
  
  }
  }

  // Methods available
  // serial.read() returns a single byte of data (first in the buffer)
  // serial.readChar() returns a single char 'A', 'a'
  // serial.readBytes() returns all of the data available as an array of bytes
  // serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
  // serial.readString() retunrs all of the data available as a string
  // serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
  // serial.last() returns the last byte of data from the buffer
  // serial.lastChar() returns the last byte of data from the buffer as a char
  // serial.clear() clears the underlying serial buffer
  // serial.available() returns the number of bytes available in the buffer

  function draw() {
    
    // Polling method
    // if (serial.available() > 0) {
    // var data = serial.read();
    
    fill(serialValue4/6+70,serialValue3/6+70, 180)
    stroke(255,100)
    strokeWeight(1.5)
    textFont("Brush Stroke Of Genius")
	  textSize(serialValue4)
    translate(serialValue4,serialValue3)
    rotate(degree)
    rect(0,0,serialValue2,serialValue1)
    // stroke(0,100)
    // text("C", serialValue1+serialValue3, serialValue2);
		degree+=1

    // }

  }var serial;
let serialValue1
let serialValue2
let serialValue3
let serialValue4
let degree = 0


function setup() {
  angleMode(DEGREES);
  rectMode(CENTER)
  createCanvas(1000, 600)
  background(120)
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem14111");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  let splitString = split(currentString, ',')

  // var currentString = serial.read()
  if (currentString) {
    serialValue1 = int(splitString[0]);
    serialValue2 = int(splitString[1]);
    serialValue3 = int(splitString[2]);
    serialValue4 = int(splitString[3]);
      
    console.log(splitString[0] + "    " + splitString[1] + "    " + splitString[2] + "    " + splitString[3]);
  
  }
  }

  // Methods available
  // serial.read() returns a single byte of data (first in the buffer)
  // serial.readChar() returns a single char 'A', 'a'
  // serial.readBytes() returns all of the data available as an array of bytes
  // serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
  // serial.readString() retunrs all of the data available as a string
  // serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
  // serial.last() returns the last byte of data from the buffer
  // serial.lastChar() returns the last byte of data from the buffer as a char
  // serial.clear() clears the underlying serial buffer
  // serial.available() returns the number of bytes available in the buffer

  function draw() {
    
    // Polling method
    // if (serial.available() > 0) {
    // var data = serial.read();
    
    fill(100,0)
    stroke(255,100)
    strokeWeight(1.5)
    textFont("Brush Stroke Of Genius")
	  textSize(serialValue4)
    translate(serialValue4,serialValue3)
    rotate(degree)
    rect(0,0,serialValue2,serialValue1)
    // stroke(0,100)
    // text("C", serialValue1+serialValue3, serialValue2);
		degree+=1

    // }

  }var serial;
let serialValue1
let serialValue2
let serialValue3
let serialValue4

function setup() {
  createCanvas(1000, 600)
  background(120)
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem14111");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  let splitString = split(currentString, ',')

  // var currentString = serial.read()
  if (currentString) {
    serialValue1 = int(splitString[0]);
    serialValue2 = int(splitString[1]);
    serialValue3 = int(splitString[2]);
    serialValue4 = int(splitString[3]);
      
    console.log(splitString[0] + "    " + splitString[1] + "    " + splitString[2] + "    " + splitString[3]);
  
  }
  }

  // Methods available
  // serial.read() returns a single byte of data (first in the buffer)
  // serial.readChar() returns a single char 'A', 'a'
  // serial.readBytes() returns all of the data available as an array of bytes
  // serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
  // serial.readString() retunrs all of the data available as a string
  // serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
  // serial.last() returns the last byte of data from the buffer
  // serial.lastChar() returns the last byte of data from the buffer as a char
  // serial.clear() clears the underlying serial buffer
  // serial.available() returns the number of bytes available in the buffer

  function draw() {
    
    // Polling method
    // if (serial.available() > 0) {
    // var data = serial.read();
    rectMode(CENTER)
    fill(serialValue3/4,serialValue4/5,100)
    stroke(serialValue2/2,serialValue1/5,150)
    strokeWeight(1.5)
    textFont("Brush Stroke Of Genius")
	  textSize(serialValue4)
    text("A" ,serialValue1, serialValue2);
    fill(150, serialValue3/4,serialValue4/5)
	  text("S" ,serialValue1+20, serialValue2+20);
		

    // }

  }var serial;
let serialValue1
let serialValue2
let serialValue3
let serialValue4

function setup() {
  createCanvas(1000, 600)
  background(120)
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem14111");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  let splitString = split(currentString, ',')

  // var currentString = serial.read()
  if (currentString) {
    serialValue1 = int(splitString[0]);
    serialValue2 = int(splitString[1]);
    serialValue3 = int(splitString[2]);
    serialValue4 = int(splitString[3]);
      
    console.log(splitString[0] + "    " + splitString[1] + "    " + splitString[2] + "    " + splitString[3]);
  
  }
  }

  // Methods available
  // serial.read() returns a single byte of data (first in the buffer)
  // serial.readChar() returns a single char 'A', 'a'
  // serial.readBytes() returns all of the data available as an array of bytes
  // serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
  // serial.readString() retunrs all of the data available as a string
  // serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
  // serial.last() returns the last byte of data from the buffer
  // serial.lastChar() returns the last byte of data from the buffer as a char
  // serial.clear() clears the underlying serial buffer
  // serial.available() returns the number of bytes available in the buffer

  function draw() {
    
    // Polling method
    // if (serial.available() > 0) {
    // var data = serial.read();
    rectMode(CENTER)
    fill(serialValue3/4,serialValue4/5,100)
    stroke(serialValue2/2,serialValue1/5,150)
    strokeWeight(1.5)
    rect(serialValue4, serialValue3, serialValue1, serialValue2);
    fill(150, serialValue3/4,serialValue4/5)
	  ellipse(serialValue4+20, serialValue3+20, serialValue1, serialValue2);
    fill(serialValue3/4,150, serialValue4/5)
 	  ellipse(serialValue4-20, serialValue3-20, serialValue1, serialValue2);


    // }

  }var serial;
let serialValue1
let serialValue2
let serialValue3
let serialValue4

function setup() {
  createCanvas(1000, 600)
  background(120)
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem14111");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  let splitString = split(currentString, ',')

  // var currentString = serial.read()
  if (currentString) {
    serialValue1 = int(splitString[0]);
    serialValue2 = int(splitString[1]);
    serialValue3 = int(splitString[2]);
    serialValue4 = int(splitString[3]);
      
    console.log(splitString[0] + "    " + splitString[1] + "    " + splitString[2] + "    " + splitString[3]);
  
  }
  }

  // Methods available
  // serial.read() returns a single byte of data (first in the buffer)
  // serial.readChar() returns a single char 'A', 'a'
  // serial.readBytes() returns all of the data available as an array of bytes
  // serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
  // serial.readString() retunrs all of the data available as a string
  // serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
  // serial.last() returns the last byte of data from the buffer
  // serial.lastChar() returns the last byte of data from the buffer as a char
  // serial.clear() clears the underlying serial buffer
  // serial.available() returns the number of bytes available in the buffer

  function draw() {
    
    // Polling method
    // if (serial.available() > 0) {
    // var data = serial.read();
    fill(serialValue1/4,serialValue2/4,120)
    ellipse(serialValue4, serialValue3, serialValue1, serialValue2);
    // }

  }var serial;
let serialValue1
let serialValue2
let serialValue3
let serialValue4

function setup() {
  createCanvas(1000, 600)
  background(120)
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem14111");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  let splitString = split(currentString, ',')

  // var currentString = serial.read()
  if (currentString) {
    serialValue1 = int(splitString[0]);
    serialValue2 = int(splitString[1]);
    serialValue3 = int(splitString[2]);
    serialValue4 = int(splitString[3]);
      
    console.log(splitString[0] + "    " + splitString[1] + "    " + splitString[2] + "    " + splitString[3]);
  
  }
  }

  // Methods available
  // serial.read() returns a single byte of data (first in the buffer)
  // serial.readChar() returns a single char 'A', 'a'
  // serial.readBytes() returns all of the data available as an array of bytes
  // serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
  // serial.readString() retunrs all of the data available as a string
  // serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
  // serial.last() returns the last byte of data from the buffer
  // serial.lastChar() returns the last byte of data from the buffer as a char
  // serial.clear() clears the underlying serial buffer
  // serial.available() returns the number of bytes available in the buffer

  function draw() {
    
    // Polling method
    // if (serial.available() > 0) {
    // var data = serial.read();
    ellipse(serialValue4, serialValue3, serialValue1, serialValue2);
    // }

  }let x = 100
let y = 200
let xspeed = 3
let yspeed = 5
let r
let g
let b
let letters = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"] 
let lx = 0

function setup() {
  createCanvas(800, 800);
	background(220);
}

function draw() {
  r = (y/11+100)
	g = (x/9+77)
	b = (x+y/16+77)
  
	
	fill(r,g,b)
	textFont("Brush Stroke Of Genius")
	textSize(72)
	strokeWeight(1)
	stroke(g*2,b/2,r/2)
	text(letters[lx], x, y)
	x+=xspeed
  y+=yspeed
	
	if(x<0 || x>width) {
 	xspeed*= -1	
  lx+=1}
	if(y<0 || y>height) {
	yspeed*= -1
  lx+=1}
  
  if(lx == 27){lx=0}

}let x = 100
let y = 200
let xspeed = 3
let yspeed = 2
let r
let g
let b

function setup() {
  createCanvas(700, 700);
	background(220);
}

function draw() {
  r = (y/5+77)
	g = (x/5+77)
	b = (x+y/10+77)
	
	fill(r,g,b)
	textFont("Brush Stroke Of Genius")
	textSize(142)
	strokeWeight(0)
	stroke(255)
	text("S", x,y)
	x+=xspeed
  y+=yspeed
	
	if(x<0 || x>width) {
	xspeed *= -1	}
	if(y<0 || y>height) {
	yspeed *= -1}
		
}var serial;
let serialValue1
let serialValue2

function setup() {
  createCanvas(400, 400)
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem14111");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  let splitString = split(currentString, ',')

  // var currentString = serial.read()
  if (currentString) {
    serialValue1 = int(splitString[0]);
      serialValue2 = int(splitString[1]);
      
    console.log(splitString[0] + "    " + splitString[1]);
  
  }
  }

  // Methods available
  // serial.read() returns a single byte of data (first in the buffer)
  // serial.readChar() returns a single char 'A', 'a'
  // serial.readBytes() returns all of the data available as an array of bytes
  // serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
  // serial.readString() retunrs all of the data available as a string
  // serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
  // serial.last() returns the last byte of data from the buffer
  // serial.lastChar() returns the last byte of data from the buffer as a char
  // serial.clear() clears the underlying serial buffer
  // serial.available() returns the number of bytes available in the buffer

  function draw() {
    background(120)
    // Polling method
    // if (serial.available() > 0) {
    // var data = serial.read();
    ellipse(200, 200, serialValue1, serialValue2);
    // }

  }let w1 = 'ITP'
let w2 = 'Winter'
let w2b = 'Show'
let w3 = '2018'
let w4 = 'Sun, December 16, 2-6pm'
let w5 = 'Mon, December 17, 4-8pm'
let speedsX = [2.7, 3, 1.4, 1, 2]
let speedsY = [2, 1, 0.8, 1.2, 3]
let words = [w1, w1, w1, w1, w1, w1, w1]
let x = 0
let x2 = 0
let y2 = 0
let wx = -60
let wy = -100
let wxSpeed
let wySpeed



function setup() {
  createCanvas(1200, 850);
  background(255, 100, 100);


}

function draw() {


  //fill(mouseX/5, mouseY/3, 150)
  //noStroke()
  //textSize(104)
  textFont('futura')
  //textFont('arial')
  fill(wx / 4 + 50, wy / 3 + 50, 150)
  stroke(0)
  strokeWeight(1.5)
  textSize(104)
	text(words[x], wx, wy)
  text(w2, wx, wy + 110)
  text(w2b, wx, wy + 220)
  text(w3, wx, wy + 330)
  textSize(32)
  fill(wy / 3 + 50, wx / 4 + 50, 160)
  strokeWeight(3)
  text(w4, wx, wy + 375)
  text(w5, wx, wy + 410)


  wx += speedsX[x2]
  wy += speedsY[y2]


  if (wx > width || wx < -50) {
    speedsX[x2] *= (-1);
    x += 1
    x2 += 1
  }
  if (wy > height || wy < -100) {
    speedsY[y2] *= (-1)
    x += 1
    y2 += 1

  }

  if (x > 6) {
    x = 0
  }
  if (x2 > 4) {
    x2 = 0
  }
  if (y2 > 4) {
    y2 = 0
  }


}

// function mousePressed() {

//   x += 1;
//   if (x > 6) {
//     x = 0
//   }
// }//let w1 = ':-:-:-:-:-:-:-:-:-:'
//let w1 = '>-:0:^:v=:^:0:-<'
//let w1 = '===::::---::::==::==::::---::::==='
let w1 = 'ITP'
let w2 = 'Winter'
let w2b = 'Show'
let w3 = '2018'
let w4 = 'Sun, December 16, 2-6pm'
let w5 = 'Mon, December 17, 4-8pm'
let speedsX = [2.7,3,1.4,1,2]
let speedsY = [2,1,0.8,1.2,3]
//let words = ["^+^", "/|/", "<T>", "{Z}", "[H]", "(V)", "X*X"]
//let words = [":", "Ö", "Ç", "Ğ", ";", "Ü", "İ"]
//let words = [":", "i", "İ", ":", "i", "İ", "İ"]
let words = [w1, w1, w1, w1, w1, w1, w1]
let x = 0
let x2 = 0
let y2 = 0
let wx = -60
let wy = -100
let wxSpeed
let wySpeed 



function setup() {
  createCanvas(1200, 850);
  background(255, 100, 100);

}

function draw() {
  
  
  //fill(mouseX/5, mouseY/3, 150)
  //noStroke()
  //textSize(104)
  textFont('futura')
  //textFont('arial')
  fill(wx/4+50, wy/3+50, 150)
  stroke(0)
  strokeWeight(1.5)
  textSize(104)
  
  text(words[x], wx, wy)
  text(w2, wx, wy+110)
  text(w2b, wx, wy+220)
  text(w3, wx, wy+330)
  textSize(32)
  //fill(255,200)
  //stroke(wx/4, wy/22, 150)
  fill(wy/3+50,wx/4+50,160)
  strokeWeight(3)
  text(w4, wx, wy+375)
  text(w5, wx, wy+410)
  // wxSpeed = speedsX[x2]
  // wySpeed = speedsY[y2]
  // wx += wxSpeed 
  // wy += wySpeed 
 

  wx += speedsX[x2]
  wy +=  speedsY[y2]


  if (wx > width || wx < -50) 
  {speedsX[x2] *= (-1);
   x +=1
   x2 +=1
  }
  if (wy > height || wy < -100) 
  {speedsY[y2] *= (-1)
   x +=1
   y2 +=1
   
   }
  
  if(x > 6)  {x=0}
  if(x2 > 4) {x2=0}  
  if(y2 > 4) {y2=0}


}

// function mousePressed() {

//   x += 1;
//   if (x > 6) {
//     x = 0
//   }
// }//let w1 = ':-:-:-:-:-:-:-:-:-:'
//let w1 = '>-:0:^:v=:^:0:-<'
//let w1 = '===::::---::::==::==::::---::::==='
let w1 = 'ITP'
let w2 = 'Winter Show'
let w3 = '2018'
let w4 = 'Sun, December 16, 2-6pm'
let w5 = 'Mon, December 17, 4-8pm'
let speedsX = [2.7,3,1.4,1,2]
let speedsY = [2,1,0.8,1.2,3]
//let words = ["^+^", "/|/", "<T>", "{Z}", "[H]", "(V)", "X*X"]
//let words = [":", "Ö", "Ç", "Ğ", ";", "Ü", "İ"]
//let words = [":", "i", "İ", ":", "i", "İ", "İ"]
let words = [w1, w1, w1, w1, w1, w1, w1]
let x = 0
let x2 = 0
let y2 = 0
let wx = -60
let wy = -100
let wxSpeed
let wySpeed 



function setup() {
  createCanvas(1200, 850);
  background(255, 100, 100);

}

function draw() {
  
  
  //fill(mouseX/5, mouseY/3, 150)
  //noStroke()
  //textSize(104)
  textFont('futura')
  //textFont('arial')
  fill(wx/4+50, wy/3+50, 150)
  stroke(0)
  strokeWeight(1.5)
  textSize(104)
  
  text(words[x], wx, wy)
  text(w2, wx, wy+110)
  text(w3, wx, wy+220)
  textSize(32)
  //fill(255,200)
  //stroke(wx/4, wy/22, 150)
  fill(wy/3+50,wx/4+50,160)
  strokeWeight(3)
  text(w4, wx, wy+275)
  text(w5, wx, wy+310)
  // wxSpeed = speedsX[x2]
  // wySpeed = speedsY[y2]
  // wx += wxSpeed 
  // wy += wySpeed 
 

  wx += speedsX[x2]
  wy +=  speedsY[y2]


  if (wx > width || wx < -50) 
  {speedsX[x2] *= (-1);
   x +=1
   x2 +=1
  }
  if (wy > height || wy < -100) 
  {speedsY[y2] *= (-1)
   x +=1
   y2 +=1
   
   }
  
  if(x > 6)  {x=0}
  if(x2 > 4) {x2=0}
  if(y2 > 4) {y2=0}


}

// function mousePressed() {

//   x += 1;
//   if (x > 6) {
//     x = 0
//   }
// }let word = 'Ş O K O P O P'
let angle = 0.0
let scalar = 2
let startx = 200
let starty = 240
let turnspeed = 0.05
let xspeed
let yspeed


function setup(){
 createCanvas(640,480)
  background(200,70,73)
}

function draw() {
//rectMode(CENTER)
let r = random(190,200)
let g = random(110,200)
let b = random(70,200)
let a = 255
textSize(67)
stroke(0)
strokeWeight(1.5)
fill(r,g,b,a)

  
  let wordx = startx + cos(angle) * scalar
  let wordy = starty + sin(angle) * scalar
  text(word, wordx, wordy) 
  angle += turnspeed
  scalar += turnspeed
  


}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}// When mouse hovers over a certain ball, 
// the ball changes its direction to the opposite. 
// Also when the balls bounce from the edges 
// of the canvas they change color.


let rects = []

function setup() {
  createCanvas(600, 400)
  background(5, 55, 54)
  for (let i = 0; i < 111; i++) {
    let x = random(width)
    let y = random(height)
    let Rwh = random(12, 20)
    let Rxsp = random(-1, 3)
    let Rysp = random(-0.7, 2.4)
    rects[i] = new Recto(x, y, Rwh, Rxsp, Rysp)
  }
}

function draw() {
  for (let r = 0; r < rects.length; r++) {
    rects[r].run()
    if (rects[r].mouseOver(mouseX, mouseY)) {}

  }
}rects = []

function setup() {
  createCanvas(600, 400)
  background(5, 55, 54)
  for (let i = 0; i < 110; i++)) {
    let x = random(width)
    let y = random(height)
    let Rw = 
    let Rh = 

class Rect{
  
  constructor(x,y,Rw, Rh, Rxsp, Rysp){
  this.x = x
  this.y = y
  this.Rw = Rw
  this.Rh = Rh
  this.Rxsp = Rxsp
  this.Rysp = Rysp
  }
  move() {
  this.x += this.Rxsp
  this.y += this.Rysp
  } 
  
  bounce() {
  if(this.x<0||this.x>width){
  this.Rxsp *= (-1)
  }
	if(this.y<0||this.y>height){
  this.Rysp *= (-1)
  }
  }
  mouseOver(moX, moY) {
    let d = dist(moX, moY, this.x, this.y)
    return (d < this.r) 
  }
  show() {
  stroke(120)
  strokeWeight(1.5)
  fill(200,150)
  rect(this.x,this.y,this.Rw,this.Rh)
  }    
}
let x = 7
let y = 2
let r

function setup() {
  createCanvas(400, 400);
  background(220);

}

function add(x, y) {
  r = x + y
}

function draw() {
  add(x, y)
  console.log(r)
  strokeWeight(2)
  stroke(120)
  fill(255)
  textSize(64)
  text(r, mouseX, mouseY)


}let balls = []

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 20; i++) {
    let x = random(width)
    let y = random(height)
    let r = random(12, 20)
    let xspeed = random(-1, 1)
    let yspeed = random(-1, 1)
    balls[i] = new Ball(x, y, r, xspeed, yspeed)
  }

}

function draw() {
  background(220);
  for (let b of balls) {
    b.move()
    b.bounce()
    b.show()
    // b.collides()
    
    let collision = false;
    for (let other of balls) {
      if (b !== other && b.collides(other)) {
        collision = true
        console.log("eho")
      }
    }
  
  if (collision) {
     // for(let b = balls.length - 1; b >= 0; b--) {
     balls.splice(b, 1)
  // }
  }
  }}let balls = []

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++) {
    let x = random(width)
    let y = random(height)
    let r = random(25, 39)
    let xspeed = random(-2, 3)
    let yspeed = random(-1, 2)
    balls[i] = new Ball(x, y, r, xspeed, yspeed)
  }

}

function draw() {
  background(220);
  for (let i = 0; i < balls.length; i++) {
    // this worked but gave an error when I tried to remove
    // something I shouldn't, not clear on what it is yet.
    // if(balls[i].mouseOver(mouseX,mouseY)){
    // balls.splice(i,1)}
    balls[i].move()
    balls[i].bounce()
    balls[i].show()
    // this wasn't necessary as mouseOver() is called within
    // erase()
    // balls[i].mouseOver(mouseX, mouseY)
    erase()
  }

  // I took the code from one of my self excersizes I made while
  // watching the coding train, and created its own function, it
  // took me a while to figure out that I should call this
  //function in draw()

  function erase() {
    for (let i = balls.length - 1; i >= 0; i--) {
      if (balls[i].mouseOver(mouseX, mouseY)) {
        balls.splice(i, 1)
      }
    }
  }
}let balls = []

function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  let x
  let y
  let r = random(25, 39)
  let xspeed = random(-2, 3)
  let yspeed = random(-1, 2)
  let b = new Ball(mouseX, mouseY, r, xspeed, yspeed)
  balls[0] = b
  balls.push(b)
}

function draw() {
  background(220);
  for (let i = 0; i < balls.length; i++) {
    balls[i].move()
    balls[i].bounce()
    balls[i].show()
  }

}let sivi

function preload() 
{sivi = loadImage('r1.jpg')

}

function setup() {
  createCanvas(600,600);
  
}

function draw() {
	background(220);
  image(sivi,0,0, 200,100)
}

let sivi

function preload() 
{sivi = loadImage('vis lan color 2.jpg')

}

function setup() {
  createCanvas(600,600);
  
}

function draw() {
	background(220);
  image(sivi,0,0, 200,100)
}

let bubbles = []

function setup() {
  createCanvas(400, 400)
  for (let i = 0; i < 10; i++) {
    let x = random(width)
    let y = random(height)
    let r = random(25, 54)
    bubbles[i] = new Bubble(x, y, r)
  }
}

function draw() {
  background(0)
  // for (let i = 0; i < bubbles.length; i++) {
  //   bubbles[i].move()
  //   bubbles[i].bounce()
  //   bubbles[i].show()
  // }
  for (let b of bubbles) {
    b.move()
    b.bounce()
    b.show()
    let overlapping = false;
    for (let other of bubbles) {
      if (b !== other && b.intersects(other)) {
        console.log("eho");
        overlapping = true
      }
    }
    if (overlapping) {
      b.changeColor(255)
    } else {
      b.changeColor(120)
    }
  }
	// if (bubble1.intersects(bubble2)) {
  //   background(255, 20, 130)
  // }
}
let bubble1
let bubble2

function setup() {
  createCanvas(400,400)
  bubble1 = new Bubble(200,200,50)
  bubble2 = new Bubble(300,300,50)
}

function draw(){
  background(120)

  
  if (bubble1.intersects(bubble2)) {
    background(255,20,130)
  }
  
	bubble1.move()
  bubble1.bounce()
  bubble1.show()
  // bubble2.move()
  bubble2.x = mouseX
  bubble2.y = mouseY
  bubble2.bounce()
  bubble2.show()
} let bubbles = []


function setup() {
  createCanvas(400, 400);
  for(let i = 0; i<340; i++) {
  let x = random(0, 400)
  let y = random(0, 400)
  let r = random(15, 35)
  bubbles[i] = new Bubble(x,y,r)
  // bubble = new Bubble(x, y, r)
  // bubbles.push(b)
  

  }
}
	
// function mouseDragged() {
// let r = random(11,54)
// let b = new Bubble(mouseX,mouseY, r)
// bubbles[0]=b
// bubbles.push(b)
// }

function mousePressed(){
	for (let i = bubbles.length-1; i >=0; i--) {
	 if (bubbles[i].contains(mouseX,mouseY)){
    bubbles.splice(i,1)
	}
	}
}

function draw() {
  background(220);
  for (let i = 0; i < bubbles.length; i++) {
    if (bubbles[i].contains(mouseX,mouseY)){
    bubbles[i].changeColor(255)  
    } else {  bubbles[i].changeColor(125)  
    
    }
    bubbles[i].move()
    bubbles[i].show()
    
  }
} let bubbles = []


function setup() {
  createCanvas(400, 400);
  for(let i = 0; i<40; i++) {
  let x = random(100, 300)
  let y = random(100, 300)
  let r = random(45, 65)
  bubbles[i] = new Bubble(x,y,r)
  // bubble = new Bubble(x, y, r)
  // bubbles.push(b)
  

  }
}
	// function mousePressed(){
	// for (let i = 0; i < bubbles.length; i++) {
	// bubbles[i].clicked(mouseX,mouseY)
	// }
	// }
// function mouseDragged() {
// let r = random(11,54)
// let b = new Bubble(mouseX,mouseY, r)
// bubbles[0]=b
// bubbles.push(b)
// }

function draw() {
  background(220);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move()
    bubbles[i].show()
    bubbles[i].rollover(mouseX,mouseY)
  }
} let bubbles = []


function setup() {
  createCanvas(400, 400);
  for(let i = 0; i<120; i++) {
  let x = random(100, 300)
  let y = random(100, 300)
  let r = random(22, 49)
  bubbles[i] = new Bubble(x,y,r)
  // bubble = new Bubble(x, y, r)
  // bubbles.push(b)
  

  }
}
	function mousePressed(){
   for (let i = 0; i < bubbles.length; i++) {
  bubbles[i].clicked(mouseX,mouseY)
  }
  }
// function mouseDragged() {
// let r = random(11,54)
// let b = new Bubble(mouseX,mouseY, r)
// bubbles[0]=b
// bubbles.push(b)
// }

function draw() {
  background(220);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move()
    bubbles[i].show()
  }
}let bubbles = []


function setup() {
  createCanvas(400, 400);
//   for(let i = 0; i<20; i++) {
//   let x = random(100,300)
//   let y = random(100,300)
//   let r = random(22,49)
//   bubbles[i] = new Bubble(x,y,r)
  
//   }
}

function mouseDragged() {
let r = random(11,54)
let b = new Bubble(mouseX,mouseY, r)
bubbles[0]=b
bubbles.push(b)
}

function draw() {
  background(220);
  for(let i = 0; i<bubbles.length; i++) {
  bubbles[i].move()
  bubbles[i].show()
  }
}

let w1 = ':-:-:-:-:-:-:-:-:-:'
//let w1 = '>-:0:^:v=:^:0:-<'
//let w1 = '===::::---::::==::==::::---::::==='
//let w1 = 'ITP 2017 Winter Show'
let speedsX = [2.7,3,1.4,1,2]
let speedsY = [2,1,0.8,1.2,3]
//let words = ["^+^", "/|/", "<T>", "{Z}", "[H]", "(V)", "X*X"]
//let words = [":", "Ö", "Ç", "Ğ", ";", "Ü", "İ"]
//let words = [":", "i", "İ", ":", "i", "İ", "İ"]
let words = [w1, w1, w1, w1, w1, w1, w1]
let x = 0
let x2 = 0
let y2 = 0
let wx = 100
let wy = 100
let wxSpeed
let wySpeed 



function setup() {
  createCanvas(1280, 720);
  background(255, 100, 100);

}

function draw() {
  
  
  fill(mouseX/5, mouseY/3, 150)
  //noStroke()
  stroke(1)
  textSize(104)
  text(words[x], wx, wy)
  // wxSpeed = speedsX[x2]
  // wySpeed = speedsY[y2]
  // wx += wxSpeed 
  // wy += wySpeed 
 

  wx += speedsX[x2]
  wy +=  speedsY[y2]


  if (wx > width || wx < 0) 
  {speedsX[x2] *= (-1);
   x +=1
   x2 +=1
  }
  if (wy > height || wy < 0) 
  {speedsY[y2] *= (-1)
   x +=1
   y2 +=1
   
   }
  
  if(x > 6)  {x=0}
  if(x2 > 4) {x2=0}
  if(y2 > 4) {y2=0}


}

// function mousePressed() {

//   x += 1;
//   if (x > 6) {
//     x = 0
//   }
// }let words = ["lutfen tikla :D","Neyirello", "dunyalar", "iyi kalplisi",
  "tatlisi", "guzelligi",""]
let x = 0

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255, 100, 100);
  fill(255,145)
  textSize(44)
  text(words[x], 25, 200)
}
function mousePressed() {
  
  x+=1;
  if(x>6)
  {x=0}
}


// let nums = [100,225,12,72]

// function setup() {
//   createCanvas(400, 400);
// }

// function draw() {
//   background(220);
//   ellipse(nums[1],nums[1],nums[3])
//   ellipse(nums[0],nums[1],nums[0])
// }

let bubble1
let bubble2

function setup() {
  createCanvas(400, 400);
  background(220);
  bubble1 = new Bubble(random(200,300), random(200,300), random(35,105))
  bubble2 = new Bubble(random(100,200), random(400,100), random(35,55))
  
}

function draw() {
  
  bubble1.move()
  bubble1.show()
  bubble1.refresh()
	bubble2.move()
	bubble2.show()
	bubble2.refresh()  
}

let bubble1
let bubble2

function setup() {
  createCanvas(400, 400);
  background(220);
  bubble1 = new Bubble()
  bubble2 = new Bubble()
  
}

function draw() {
  bubble1.move()
  bubble1.show()
  bubble1.refresh()
	bubble2.move()
	bubble2.show()
	bubble2.refresh()  
}

class Bubble {
  
  constructor(){
  this.x = random(width) 
  this.y = random(height)

  }

   refresh() {
  if (this.x>width) {
  this.x = 0 
  }
    else if (this.y>height) {
  this.y = 0
    }
    else if (this.x<0 && mouseIsPressed) {
  this.x = 400 
  }
    else if (this.y<0 && mouseIsPressed) {
  this.y = 400
    }
     else{}
  }
 
  move() {
    if(mouseIsPressed) {
  this.x -= (random(-3,10))
  this.y -= (random(-3,10))
    
    }
    else {
  this.x += (random(-6,17))
  this.y += (random(-6,17))
    }
  }
  
 
  
    
  show() {
  if(mouseIsPressed) {
  strokeWeight(2)
  stroke(0,133)
  fill(random(155),random(255),220,100)
  rect(this.x,this.y, 30,30, 7)
  }
    else {
  strokeWeight(random(1))
  stroke(120)
  fill(120,random(155),220,100)
  rect(this.x,this.y, 20,20)
    }
  }
  
}let balls = [];

function setup() {
  
  let x = random(0,10)
  let y = random(90,111)
  let xpseed = random(-5,5)
  let yspeed = random(-3,7)
  let d = 33
  
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++) {
    //create a new ball
    //store it in an array
    balls[i] = new Ball(x,y,xspeed,yspeed,d)
    // balls.push(new Ball(x,y,xspeed,yspeed,d))
  }
}

function draw() {
  background(220);
  // for (let i = 0; i < balls.length; i++) {
  //   balls[i].run();
  // }
  for (let b in balls) {
  balls[b].run();
  //If mouse is in the ball the delete it.
  //remove ball thats been moused over
  // if(dist(mouseX, mouseY, balls[b].x,balls[b].y<25)
  //  if(balls[b].isNear(width/2, height/2)) {
  // balls.splice(b, 1);
  // }
  }
  
}let x;
let xspeed = 10;

function setup() {
  createCanvas(400, 400);
  // Initialize the ball at the left edge and middle height
  x = 0;
}

function draw() {
  background(220);
  
  //Draw the ball
  ellipse(x, height/2, 50, 50);
  
  // Move the ball
  x+=xspeed;
  
  // Turn around when you cross a border
  if(x > width || x < 0) xspeed *=-1;
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}// There is a an array of rectangles that are drawn in the
// center of the canvas. Each rect has a random speed. Speed
// can be positive or negative, determining the direction of
// the individual rect. The rects move along a circular path.
// The fill color is dependant on mouseX and mouseY

let rects = [];

function setup() {
  createCanvas(500, 500);
  background(220);

  for (let i = 0; i < 175; i++) {

    let x
    let y
    let d = 3
    let d2 = random(3, 8)
    let angle = 180
    let offsetX = 250
    let offsetY = 250
    let scalar = random(5)
    let speed = random(-0.15, 0.15)

    rects[i] = new rectTemplate(x, y, d, d2, angle, offsetX, offsetY,
      scalar, speed)
  }
}

function draw() {

  for (let indvRect of rects) {
    indvRect.drawrect()
    indvRect.movebounce()

  }
  // for (let i = 0; i < rects.length; i++) {
  //   rects[i].movebounce()
  //   rects[i].drawrect()
  // }
}

class rectTemplate {
  constructor(x, y, d, d2, angle, offsetX, offsetY, scalar, speed) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.d2 = d2;
    this.angle = angle;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.scalar = scalar;
    this.speed = speed;
  }
  movebounce() {
    if (random(0.5) < 0.2) {
      this.x = this.offsetX + sin(this.angle) * this.scalar
      this.y = this.offsetY + sin(this.angle / 2) * this.scalar
      this.angle = (this.angle + this.speed)
      this.scalar = (this.scalar + this.speed)
    } else {
      this.x = this.offsetX + cos(this.angle / 2) * this.scalar
      this.y = this.offsetY + cos(this.angle) * this.scalar
      this.angle += this.speed
      this.scalar += this.speed
    }
  }
  drawrect() {
    // fill(random(50,100),random(50,100),random(50,100))
    // stroke(120,255,120)
    // fill(this.x/4,this.y/2,(this.x+this.y)/4,130)
    // fill(this.x/4,(this.x+this.y)/4,130, this.y/1.5)

    let R = map(mouseX, 0, 500, 0, 255)
    let B = map(mouseY, 0, 500, 0, 255)
    let G = map(mouseY, 0, 500, 0, 255)

    fill(R, B, 100, 200)
    stroke(22,100)
    strokeWeight(1)
    rect(this.x, this.y, this.d, this.d2)

  }
}let rects = [];

function setup() {
  createCanvas(1280, 720);
  background(220);

  for (let i = 0; i < 155 ; i++) {

    let x 
    let y 
    let d = 3
    let d2 = random(2,5)
    let angle = 180
    let offsetX = 640
    let offsetY = 360
    let scalar = random(5)
    let speed = random(-0.1, 0.1)

    rects[i] = new rectTemplate(x, y, d, d2, angle, offsetX, offsetY, 
                                scalar, speed)
  }
}

function draw() {

  for (let indvRect of rects) {
    indvRect.drawrect()
    indvRect.movebounce()
    
  }
  // for (let i = 0; i < rects.length; i++) {
  //   rects[i].movebounce()
  //   rects[i].drawrect()
  // }
}


class rectTemplate {
  constructor(x, y, d, d2, angle, offsetX, offsetY, scalar, speed) {
    this.x = x;
    this.y = y;
  	this.d = d;
    this.d2 = d2;
    this.angle = angle;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.scalar = scalar;
    this.speed = speed;
    
    // this.x = this.offsetX + cos(this.angle) * this.scalar
    // this.y = this.offsetY + sin(this.angle) * this.scalar
  }
  movebounce() {
    if (random(0.5) < 0.2) {
    
    this.x = this.offsetX + sin(this.angle) * this.scalar
    this.y = this.offsetY + sin(this.angle/2) * this.scalar
    this.angle += this.speed
    this.scalar += this.speed
    } else {
    this.x = this.offsetX + cos(this.angle/2) * this.scalar
    this.y = this.offsetY + cos(this.angle) * this.scalar
    this.angle += this.speed
    this.scalar += this.speed
    
    }
    
    

    // if (this.x > width || this.x < 0) {
    //   this.speed *= -1
    // }
    // if (this.y > height || this.y < 0) {
    //   this.speed *= -1
    // }
  }
  drawrect() {
    // fill(random(50,100),random(50,100),random(50,100))
    // stroke(120,255,120)
    // fill(this.x/4,this.y/2,(this.x+this.y)/4,130)
    fill(this.x/4,(this.x+this.y)/4,130, this.y/1.5)
    stroke(22,80)
    strokeWeight(1)
    rect(this.x, this.y, this.d, this.d2)

  }
}let rects = [];

function setup() {
  createCanvas(1280, 720);
  background(200);

  for (let i = 0; i < 155 ; i++) {

    let x 
    let y 
    let d = random(1,4)
    let d2 = random(3)
    let angle = random(90)
    let offsetX = 640
    let offsetY = 360
    let scalar = random(5)
    let speed = random(-0.1, 0.1)
    let randomizer

    rects[i] = new rectTemplate(x, y, d, d2, angle, offsetX, offsetY, 
                                scalar, speed, randomizer)
  }
}

function draw() {

  for (let indvRect of rects) {
    indvRect.drawrect()
    indvRect.movebounce()
    
  }
  // for (let i = 0; i < rects.length; i++) {
  //   rects[i].movebounce()
  //   rects[i].drawrect()
  // }
}


class rectTemplate {
  constructor(x, y, d, d2, angle, offsetX, offsetY, scalar, speed, randomizer) {
    this.x = x;
    this.y = y;
  	this.d = d;
    this.d2 = d2;
    this.angle = angle;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.scalar = scalar;
    this.speed = speed;
    this.randomizer = randomizer;
    
    // this.x = this.offsetX + cos(this.angle) * this.scalar
    // this.y = this.offsetY + sin(this.angle) * this.scalar
  }
  movebounce() {
    
    this.randomizer = (random(0.8))
    
    if (this.randomizer < 0.4) {
    
    this.x = this.offsetX + cos(this.angle) * this.scalar
    this.y = this.offsetY + sin(this.angle/2) * this.scalar
    this.angle += this.speed
    this.scalar += this.speed
    } else if (this.randomizer < 0.5) {
    this.x = this.offsetX + cos(this.angle/2) * this.scalar
    this.y = this.offsetY + sin(this.angle) * this.scalar
    this.angle += this.speed
    this.scalar += this.speed
    } else if (this.randomizer < 0.7) {
    this.x = this.offsetX + (this.angle) * this.scalar
    this.y = this.offsetY + sin(this.angle/2) * this.scalar
    this.angle += this.speed
    this.scalar += this.speed} else {
    this.x = this.offsetX + cos(this.angle/2) * this.scalar
    this.y = this.offsetY + (this.angle) * this.scalar
    this.angle += this.speed
    this.scalar += this.speed
    }
    
    

    // if (this.x > width || this.x < 0) {
    //   this.speed *= -1
    // }
    // if (this.y > height || this.y < 0) {
    //   this.speed *= -1
    // }
  }
  drawrect() {
    // fill(random(50,100),random(50,100),random(50,100))
    // stroke(120,255,120)
    // fill(this.x/4,this.y/2,(this.x+this.y)/4,130)
    fill((this.x+this.y)/3, this.x/4, this.y/21)
    stroke(22,80)
    strokeWeight(1)
    rect(this.x, this.y, this.d, this.d2)

  }
}let rects = [];

function setup() {
  createCanvas(1280, 720);
  background(220);

  for (let i = 0; i < 155 ; i++) {

    let x 
    let y 
    let d = 4
    let d2 = random(2,5)
    let angle = random(90)
    let offsetX = 640
    let offsetY = 360
    let scalar = random(5)
    let speed = random(-0.1, 0.1)

    rects[i] = new rectTemplate(x, y, d, d2, angle, offsetX, offsetY, 
                                scalar, speed)
  }
}

function draw() {

  for (let indvRect of rects) {
    indvRect.drawrect()
    indvRect.movebounce()
    
  }
  // for (let i = 0; i < rects.length; i++) {
  //   rects[i].movebounce()
  //   rects[i].drawrect()
  // }
}


class rectTemplate {
  constructor(x, y, d, d2, angle, offsetX, offsetY, scalar, speed) {
    this.x = x;
    this.y = y;
  	this.d = d;
    this.d2 = d2;
    this.angle = angle;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.scalar = scalar;
    this.speed = speed;
    
    // this.x = this.offsetX + cos(this.angle) * this.scalar
    // this.y = this.offsetY + sin(this.angle) * this.scalar
  }
  movebounce() {
    if (random(0.5) < 0.2) {
    
    this.x = this.offsetX + cos(this.angle) * this.scalar
    this.y = this.offsetY + sin(this.angle/2) * this.scalar
    this.angle += this.speed
    this.scalar += this.speed
    } else {
    this.x = this.offsetX + cos(this.angle/2) * this.scalar
    this.y = this.offsetY + sin(this.angle) * this.scalar
    this.angle += this.speed
    this.scalar += this.speed
    
    }
    
    

    // if (this.x > width || this.x < 0) {
    //   this.speed *= -1
    // }
    // if (this.y > height || this.y < 0) {
    //   this.speed *= -1
    // }
  }
  drawrect() {
    // fill(random(50,100),random(50,100),random(50,100))
    // stroke(120,255,120)
    // fill(this.x/4,this.y/2,(this.x+this.y)/4,130)
    fill(this.x/4,(this.x+this.y)/4,130, this.y/2)
    stroke(122,100)
    strokeWeight(1)
    rect(this.x, this.y, this.d, this.d2)

  }
}let rects = [];

function setup() {
  createCanvas(1280, 720);
  background(220);

  for (let i = 0; i < 55 ; i++) {

    let x 
    let y 
    let d = 7
    let d2 = random(5,9)
    let angle = random(90)
    let offsetX = 640
    let offsetY = 360
    let scalar = random(5)
    let speed = random(-0.1, 0.1)

    rects[i] = new rectTemplate(x, y, d, d2, angle, offsetX, offsetY, 
                                scalar, speed)
  }
}

function draw() {

  for (let indvRect of rects) {
    indvRect.drawrect()
    indvRect.movebounce()
    
  }
  // for (let i = 0; i < rects.length; i++) {
  //   rects[i].movebounce()
  //   rects[i].drawrect()
  // }
}


class rectTemplate {
  constructor(x, y, d, d2, angle, offsetX, offsetY, scalar, speed) {
    this.x = x;
    this.y = y;
  	this.d = d;
    this.d2 = d2;
    this.angle = angle;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.scalar = scalar;
    this.speed = speed;
    
    // this.x = this.offsetX + cos(this.angle) * this.scalar
    // this.y = this.offsetY + sin(this.angle) * this.scalar
  }
  movebounce() {
    
    this.x = this.offsetX + cos(this.angle/2) * this.scalar
    this.y = this.offsetY + sin(this.angle) * this.scalar
    this.angle += this.speed
    this.scalar += this.speed
    
    

    // if (this.x > width || this.x < 0) {
    //   this.speed *= -1
    // }
    // if (this.y > height || this.y < 0) {
    //   this.speed *= -1
    // }
  }
  drawrect() {
    // fill(random(50,100),random(50,100),random(50,100))
    // stroke(120,255,120)
    fill(this.x/4,this.y/2,(this.x+this.y)/4,100)
    stroke(22,180)
    strokeWeight(1)
    rect(this.x, this.y, this.d, this.d2)

  }
}let rects = [];

function setup() {
  createCanvas(1280, 720);
  background(220);

  for (let i = 0; i < 55 ; i++) {

    let x 
    let y 
    let d = 13
    let d2 = random(21)
    let angle = random(90)
    let offsetX = 640
    let offsetY = 360
    let scalar = random(5)
    let speed = random(-0.1, 0.1)

    rects[i] = new rectTemplate(x, y, d, d2, angle, offsetX, offsetY, 
                                scalar, speed)
  }
}

function draw() {

  for (let indvRect of rects) {
    indvRect.drawrect()
    indvRect.movebounce()
    
  }
  // for (let i = 0; i < rects.length; i++) {
  //   rects[i].movebounce()
  //   rects[i].drawrect()
  // }
}


class rectTemplate {
  constructor(x, y, d, d2, angle, offsetX, offsetY, scalar, speed) {
    this.x = x;
    this.y = y;
  	this.d = d;
    this.d2 = d2;
    this.angle = angle;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.scalar = scalar;
    this.speed = speed;
    
    // this.x = this.offsetX + cos(this.angle) * this.scalar
    // this.y = this.offsetY + sin(this.angle) * this.scalar
  }
  movebounce() {
    
    this.x = this.offsetX + cos(this.angle) * this.scalar
    this.y = this.offsetY + sin(this.angle) * this.scalar
    this.angle += this.speed
    this.scalar += this.speed
    
    

    // if (this.x > width || this.x < 0) {
    //   this.xspeed *= -1
    // }
    // if (this.y > height || this.y < 0) {
    //   this.yspeed *= -1
    // }
  }
  drawrect() {
    // fill(random(50,100),random(50,100),random(50,100))
    // stroke(120,255,120)
    fill(this.x/4,this.y/2,(this.x+this.y)/4,100)
    stroke(22,120)
    strokeWeight(1)
    rect(this.x, this.y, this.d, this.d2)

  }
}let rects = [];

function setup() {
  createCanvas(1280, 720);
  background(220);

  for (let i = 0; i < 55 ; i++) {

    let x 
    let y 
    let d = 3
    let d2 = random(19)
    let angle = 11
    let offsetX = 640
    let offsetY = 360
    let scalar = random(5)
    let speed = random(-0.1, 0.1)

    rects[i] = new rectTemplate(x, y, d, d2, angle, offsetX, offsetY, 
                                scalar, speed)
  }
}

function draw() {

  for (let indvRect of rects) {
    indvRect.drawrect()
    indvRect.movebounce()
    
  }
  // for (let i = 0; i < rects.length; i++) {
  //   rects[i].movebounce()
  //   rects[i].drawrect()
  // }
}


class rectTemplate {
  constructor(x, y, d, d2, angle, offsetX, offsetY, scalar, speed) {
    this.x = x;
    this.y = y;
  	this.d = d;
    this.d2 = d2;
    this.angle = angle;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.scalar = scalar;
    this.speed = speed;
    
    // this.x = this.offsetX + cos(this.angle) * this.scalar
    // this.y = this.offsetY + sin(this.angle) * this.scalar
  }
  movebounce() {
    
    this.x = this.offsetX + cos(this.angle) * this.scalar
    this.y = this.offsetY + sin(this.angle) * this.scalar
    this.angle += this.speed
    this.scalar += this.speed
    
    

    // if (this.x > width || this.x < 0) {
    //   this.xspeed *= -1
    // }
    // if (this.y > height || this.y < 0) {
    //   this.yspeed *= -1
    // }
  }
  drawrect() {
    // fill(random(50,100),random(50,100),random(50,100))
    // stroke(120,255,120)
    fill(255)
    stroke(22,100)
    strokeWeight(1)
    rect(this.x, this.y, this.d, this.d2, 2)

  }
}let rects = [];

function setup() {
  createCanvas(1280, 720);
  background(220);

  for (let i = 0; i < 100 ; i++) {

    let x 
    let y 
    let d = random(27)
    let d2 = 7
    let angle = random(-90,90)
    let offsetX = 640
    let offsetY = 360
    let scalar = random(5)
    let speed = random(0.1)

    rects[i] = new rectTemplate(x, y, d, d2, angle, offsetX, offsetY, 
                                scalar, speed)
  }
}

function draw() {

  for (let indvRect of rects) {
    indvRect.drawrect()
    indvRect.movebounce()
    
  }
  // for (let i = 0; i < rects.length; i++) {
  //   rects[i].movebounce()
  //   rects[i].drawrect()
  // }
}


class rectTemplate {
  constructor(x, y, d, d2, angle, offsetX, offsetY, scalar, speed) {
    this.x = x;
    this.y = y;
  	this.d = d;
    this.d2 = d2;
    this.angle = angle;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.scalar = scalar;
    this.speed = speed;
    
    // this.x = this.offsetX + cos(this.angle) * this.scalar
    // this.y = this.offsetY + sin(this.angle) * this.scalar
  }
  movebounce() {
    
    this.x = this.offsetX + cos(this.angle) * this.scalar
    this.y = this.offsetY + sin(this.angle) * this.scalar
    this.angle += this.speed
    this.scalar += this.speed
    
    

    // if (this.x > width || this.x < 0) {
    //   this.xspeed *= -1
    // }
    // if (this.y > height || this.y < 0) {
    //   this.yspeed *= -1
    // }
  }
  drawrect() {
    // fill(random(50,100),random(50,100),random(50,100))
    // stroke(120,255,120)
    fill(255, 100)
    stroke(22,100)
    strokeWeight(1)
    rect(this.x, this.y, this.d, this.d2, 2)

  }
}let rects = [];

function setup() {
  createCanvas(600, 600);
  background(220);

  for (let i = 0; i < 300; i++) {

    let x = random(0, 100)
    let y = 0
    let d = random(0, 8)
    let d2 = random(0, 8)
    let xspeed = 2.5 + y / 91
    let yspeed = 2.2 + x / 91

    rects[i] = new rectTemplate(x, y, d, d2, xspeed, yspeed)
  }
}

function draw() {

  for (let indvRect of rects) {
    indvRect.movebounce()
    indvRect.drawrect()
  }
  // for (let i = 0; i < rects.length; i++) {
  //   rects[i].movebounce()
  //   rects[i].drawrect()
  // }
}


class rectTemplate {
  constructor(x, y, d, d2, xspeed, yspeed) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.d2 = d2;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  movebounce() {

    this.x += this.xspeed
    this.y += this.yspeed

    if (this.x > width || this.x < 0) {
      this.xspeed *= -1
    }
    if (this.y > height || this.y < 0) {
      this.yspeed *= -1
    }
  }
  drawrect() {
    // fill(random(50,100),random(50,100),random(50,100))
    // stroke(120,255,120)
    fill((this.y+this.x)/3, this.x/3+this.y/8, this.y/5+this.x/7)
    stroke(20,120)
    strokeWeight(0.5)
    rect(this.x, this.y, this.d, this.d2, 2)

  }
}let rects = [];

function setup() {
  createCanvas(600, 600);
  background(220);

  for (let i = 0; i < 400; i++) {

    let x = random(0, 600)
    let y = random(260, 270)
    let d = random(0, 71)
    let d2 = random(0, 8)
    let xspeed = random(-2.3, 2.5)
    let yspeed = random(-1.9, 2.2)

    rects[i] = new rectTemplate(x, y, d, d2, xspeed, yspeed)
  }
}

function draw() {


  for (let i = 0; i < rects.length; i++) {
    rects[i].movebounce()
    rects[i].drawrect()
  }
}


class rectTemplate {
  constructor(x, y, d, d2, xspeed, yspeed) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.d2 = d2;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  movebounce() {

    this.x += this.xspeed
    this.y += this.yspeed

    if (this.x > width || this.x < 0) {
      this.xspeed *= -1
    }
    if (this.y > height || this.y < 0) {
      this.yspeed *= -1
    }
  }
  drawrect() {
    // fill(random(50,100),random(50,100),random(50,100))
    // stroke(120,255,120)
    fill(120,120)
    stroke(200, 120)
    strokeWeight(2)
    rect(this.x, this.y, this.d, this.d2, 2)

  }
}let rects = [];

function setup() {
  createCanvas(600, 600);
  background(220);

  for (let i = 0; i < 400; i++) {

    let x = random(0, 600)
    let y = random(260, 270)
    let d = random(0, 7)
    let xspeed = random(2.3, 2.5)
    let yspeed = random(1.9, 2.2)

    rects[i] = new rectTemplate(x, y, d, xspeed, yspeed)
  }
}

function draw() {


  for (let i = 0; i < rects.length; i++) {
    rects[i].movebounce()
    rects[i].drawrect()
  }
}


class rectTemplate {
  constructor(x, y, d, xspeed, yspeed) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  movebounce() {

    this.x += this.xspeed
    this.y += this.yspeed

    if (this.x > width || this.x < 0) {
      this.xspeed *= -1
    }
    if (this.y > height || this.y < 0) {
      this.yspeed *= -1
    }
  }
  drawrect() {
    // fill(random(50,100),random(50,100),random(50,100))
    // stroke(120,255,120)
    fill(0, 100)
    stroke(random(255), random(255), random(255), 180)
    strokeWeight(3)
    ellipse(this.x, this.y, this.d)

  }
}let rects = [];

function setup() {
  createCanvas(600, 600);
  background(220);
   
  for (let i = 0; i < 99; i++) {
    
    let x = random(200,274)
    let y = random(120,270)
    let d = random(0,17)
    let xspeed = random(1.6,1.5)
    let yspeed = random(2.0,2.2)
        
  rects[i] = new rectTemplate(x, y, d, xspeed, yspeed)
  }
}

function draw() {
  
  
  for( let i = 0; i < rects.length; i++){
  rects[i].movebounce()
  rects[i].drawrect()
  }
}


class rectTemplate{
  constructor(x, y, d, xspeed, yspeed) {
  this.x = x;
  this.y = y;
  this.d = d;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
  }
  movebounce() {

    this.x += this.xspeed
    this.y += this.yspeed

    if (this.x > width || this.x < 0) {
      this.xspeed *= -1
    }
    if (this.y > height || this.y < 0) {
      this.yspeed *= -1
    }
  }
    drawrect() {
    // fill(random(50,100),random(50,100),random(50,100))
    // stroke(120,255,120)
    fill(random(175,255),random(175,255),random(175,255))
    stroke(0,180)
    ellipse(this.x,this.y,this.d)
    
    } 
  }
  let rects = [];

function setup() {
  createCanvas(600, 600);
  background(220);
   
  for (let i = 0; i < 555; i++) {
    
    let x = random(200,274)
    let y = random(120,270)
    let rw = random(0,7)
    let rh = random(0,3)
    let xspeed = random(1.5)
    let yspeed = random(2.2)
        
  rects[i] = new rectTemplate(x, y, rw, rh, xspeed, yspeed)
  }
}

function draw() {
  
  
  for( let i = 0; i < rects.length; i++){
  rects[i].movebounce()
  rects[i].drawrect()
  }
}


class rectTemplate{
  constructor(x, y, rw, rh, xspeed, yspeed) {
  this.x = x;
  this.y = y;
  this.rw = rw;
  this.rh = rh;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
  }
  movebounce() {

    this.x += this.xspeed
    this.y += this.yspeed

    if (this.x > width || this.x < 0) {
      this.xspeed *= -1
    }
    if (this.y > height || this.y < 0) {
      this.yspeed *= -1
    }
  }
    drawrect() {
    // fill(random(50,100),random(50,100),random(50,100))
    // stroke(120,255,120)
    fill(random(175,255),random(175,255),random(175,255))
    stroke(0,120)
    rect(this.x,this.y,this.rw, this.rh, 6)
    
    } 
  }
  let rects = [];

function setup() {
  createCanvas(600, 600);
  background(220);
   
  for (let i = 0; i < 555; i++) {
    
    let x = random(200,274)
    let y = random(120,270)
    let rw = random(0,70)
    let rh = random(0,3)
    let xspeed = random(1.5)
    let yspeed = random(2.2)
        
  rects[i] = new rectTemplate(x, y, rw, rh, xspeed, yspeed)
  }
}

function draw() {
  
  
  for( let i = 0; i < rects.length; i++){
  rects[i].movebounce()
  rects[i].drawrect()
  }
}


class rectTemplate{
  constructor(x, y, rw, rh, xspeed, yspeed) {
  this.x = x;
  this.y = y;
  this.rw = rw;
  this.rh = rh;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
  }
  movebounce() {

    this.x += this.xspeed
    this.y += this.yspeed

    if (this.x > width || this.x < 0) {
      this.xspeed *= -1
    }
    if (this.y > height || this.y < 0) {
      this.yspeed *= -1
    }
  }
    drawrect() {
    // fill(random(50,100),random(50,100),random(50,100))
    // stroke(120,255,120)
    fill(random(175,255),random(175,255),random(175,255))
    stroke(0,120)
    rect(this.x,this.y,this.rw, this.rh, 6)
    
    } 
  }
  // basic loop in array

let coords = [100, 150, 180, 210, 270, 300]

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  for (let i = 0; i < 5; i++)
    rect(coords[i], coords[i + 1], 100, 120);
}let coords = [100, 150, 180, 210, 270, 300]
let adder = 0

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  rect(coords[adder], coords[adder], coords[adder], coords[adder]);
}

function mousePressed() {
  adder++
  if (adder == coords.length) {
    adder = 0
  }
}// icm week4 quiz 3.)

let ball1
let ball2


function setup() {
  createCanvas(400, 400);
  ball1 = new ball(100, 200, 33, 1, 3)
  ball2 = new ball(350, 280, 33, 3, 4)

}

function draw() {

  background(100);
  ball1.movebounce()
  ball1.drawball()
  ball2.movebounce()
  ball2.drawball()


}

class ball {
  constructor(x, y, d, xspeed, yspeed) {
    this.x = x
    this.y = y
    this.d = d
    this.xspeed = xspeed
    this.yspeed = yspeed
  }

  movebounce() {

    this.x += this.xspeed
    this.y += this.yspeed

    if (this.x > width || this.x < 0) {
      this.xspeed *= -1
    }
    if (this.y > height || this.y < 0) {
      this.yspeed *= -1
    }
  }
  drawball() {
    stroke(0, 0, 0, 80)
    fill(255, 255, 255, 100)
    ellipse(this.x, this.y, this.d)

  }
}let ball = {
  d1: 25,
  d2: 25,
  x: 0,
  y: 0,
  xspeed: 10,
  yspeed: 7,
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(ball.x / 3, ball.y / 3, 100);
  move()
  bounce()
  drawball()

}


function drawball() {
  fill(0, ball.y, ball.x)
  ellipse(ball.x, ball.y, ball.d1, ball.d2)

}

function move() {
  ball.x += ball.xspeed
  ball.y += ball.yspeed

}

function bounce() {
  if (ball.x > width || ball.x < 0) {
    ball.xspeed *= -1
  }
  if (ball.y > height || ball.y < 0) {
    ball.yspeed *= -1
  }


}// icm week 4 quiz 1.)


let cellw
let cellh
let cols = 10
let rows = 5
let d
let dmax
let hovering = false

function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(220);
  // fill(mouseX,mouseY,0)

  cellw = width / cols
  cellh = height / rows





  for (let x = 0; x < width; x += cellw) {
    for (let y = 0; y < height; y += cellh) {
      d = dist(d = x, y, mouseX, mouseY)
      dmax = dist(0, 0, width, height)
      d = map(d, 0, dmax, 0, 255)



      if (mouseX > x && mouseX < x + cellw && mouseY > y && mouseY < y + cellh) {
        hovering = true
      } else {
        hovering = false
      }

      if (hovering) {
        fill((mouseX / 10 + mouseY / 5))

      } else {
        fill(d, d * 1.5, d / 2)
      }
      rect(x, y, cellw, cellh)

    }
  }

  // push()
  // rectMode(CENTER)
  // fill(d / 2, d, d * 1.5, 120)
  // rect(mouseX, mouseY, cellw, cellh)
  // pop()
}let x;
let xspeed = 2;
let yspeed = 17;
let d1 = 8
let d2 = 3
let y

function setup() {
  createCanvas(500, 700);
  background(220);
  // Initialize the ball at the left edge and middle height
  x = 0;
  y = height / 4
}

function draw() {
  
  move()
  bounce()
  ball()
}


function ball() {
  //Draw the ball
  stroke(0,0,0,random(255))
  fill(255,random(255),random(120),random(255))
  rect(x, y, d1, d2);
   if (x > width || x < 0) d1 *= 1.4;
  if (y > height || y < 0) d2 *= 1.4;
  
  if (d1 >88) d1 = 3;
  if (d2>63) d2 = 3;
  
  
}

function move() {
  x += xspeed;
  y += yspeed;
}

function bounce() {
  if (xspeed > 5) xspeed = 2
  if (yspeed > 21) yspeed = 17
  
  
  if (x > width || x < 0) xspeed *= -1.01;
  if (y > height || y < 0) yspeed *= -1.01;
  
  
  
 
}
function setup() {
  createCanvas(500, 500);
  background(220);
}

function draw() {

  //owl(mouseX, mouseY)

  // for(var x = 35; x< width +70; x+=70) {
  // owl(x,110) }

  randomSeed(0);
  for (let i = 35; i < width + 40; i += 40) {
    let gray = int(random(0, 102));
    let scalar = random(0.25, 1.0)
    owl(i, 110, gray, scalar)
  }

}

function owl(x, y, g, s) {
  push()
  translate(x, y);
  scale(s);
  stroke(g);
  strokeWeight(70)
  line(0, -35, 0, -65)
  noStroke()
  fill(255-g)
 ellipse(-17.5, -65, 35, 35)
    ellipse(17.5, -65, 35, 35)
    arc(0, -65, 70, 70, 0, PI)
  fill(g)
  ellipse(-14, -65, 8, 8)
    ellipse(14, -65, 8, 8)
    quad(0, -58, 4, -51, 0, -44, -4, -51)
    pop()

  }

  // function owl(x, y) {
  //   push()
  //   translate(x, y)
  //   stroke(0)
  //   strokeWeight(70)
  //   line(0, -35, 0, -65)
  //   noStroke()
  //   fill(255)
  //   ellipse(-17.5, -65, 35, 35)
  //   ellipse(17.5, -65, 35, 35)
  //   arc(0, -65, 70, 70, 0, PI)
  //   fill(0)
  //   ellipse(-14, -65, 8, 8)
  //   ellipse(14, -65, 8, 8)
  //   quad(0, -58, 4, -51, 0, -44, -4, -51)
  //   pop()
  // }let x;
let xspeed = 2;
let yspeed = 17;
let d1 = 50
let d2 = 30
let y

function setup() {
  createCanvas(500, 700);
  background(220);
  // Initialize the ball at the left edge and middle height
  x = 0;
  y = height / 4
}

function draw() {
  
  move()
  bounce()
  ball()
}


function ball() {
  //Draw the ball
  // noStroke()
  fill(255,120,120,random(255))
  ellipse(x, y, d1, d2);
}

function move() {
  x += xspeed;
  y += yspeed;
}

function bounce() {
  if (xspeed > 5) xspeed = 2
  if (yspeed > 21) yspeed = 17
  
  
  if (x > width || x < 0) xspeed *= -1.01;
  if (y > height || y < 0) yspeed *= -1.01;
  
 
}



// let x = 0
// let xspeed = 10;
// let yspeed = 10;
// let d1 = 50
// let d2 = 50
// let y = 0
// let bg
// let bgSpeed

// function setup() {
//   createCanvas(400, 400);
 
// }

// function draw() {
//    background(bg);
//   bgSpeed = bounce(bg, 128, 255, bgSpeed)
//   xspeed = bounce(x,0, width, xspeed)
//   yspeed = bounce(y,0, height, yspeed)
  
//   bg += bgSpeed
//    x += xspeed;
//   y += yspeed;
  

//   ellipse(x, y, d1, d2);
// }


// function bounce(state, low, high, speed) {
//   if (x > width || x < 0) xspeed *= -1;
//   if (y > height || y < 0) yspeed *= -1;
// }let numCols
let numRows
let colW
let colH

function setup() {
  createCanvas(600, 600)
  // noStroke()
  numCols = 50
  numRows = 50
  colW = width / numCols
  colH = height / numRows
}

function draw() {
  background(255)
  // 1 loop to draw cloumn lines
  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      if ((col % 2 == 1 && row % 2 == 1) || (col % 2 == 0 && row % 2 == 0))
        fill('black')
      else fill('white')
      let x = col * colW
      let y = row * colH
      // let d = (dist(mouseX, mouseY, x, y)) * 2
      // d = map(d, 0, dist(0, 0, width / 3, height / 3), 255, 0)

      let d = (dist(mouseX, mouseY, x, y)) * 2
      d = map(d, 0, dist(0, 0, width/2, height/2), 255, 0)
      fill(d)
      rect(x, y, colW, colH)
    }
  }

}// Week3 Assignment - Bora Aydintug
// I created two buttons
// The lower button starts and stops the animation.
// if you hover over it with your cursor, the fill 
// and stroke of both the button and the animation
// are inverted.
// The upper button starts and stops the code that
// changes the fill color of the animation depending 
// on the mouseX and mouseY.


let on = false
let onC = false
let hovering = false
let hovering2 = false
let buttonX = 250
let buttonY = 450
let buttonW = 80
let buttonH = 80
let bx1 = 210
let bx2 = 290
let by1 = 410
let by2 = 490

let button2X = 250
let button2Y = 50
let button2W = 80
let button2H = 80
let b2x1 = 210
let b2x2 = 290
let b2y1 = 10
let b2y2 = 90

let g1x = 0
let g1y = 250
let g2x = 450
let g2y = 250
let sw = 33
let sh = 33
let alt = false
let r, g, b



function setup() {
  createCanvas(500, 500);
  background(220);
  rectMode(CENTER)


}


function draw() {

  if (random(1) > 0.5) {
    alt = true
  } else {
    alt = false
  }

  if (mouseX > b2x1 && mouseX < b2x2 && mouseY > b2y1 && mouseY < b2y2) {
    hovering2 = true;
  } else {
    hovering2 = false;
  }
  if (hovering2) {
    fill(mouseX, mouseY/2, 25)
    stroke(0)

  } else {
    fill(255)
    stroke(0)
  }


  rect(button2X, button2Y, button2W, button2H, 4)


  if (mouseX > bx1 && mouseX < bx2 && mouseY > by1 && mouseY < by2) {
    hovering = true;
  } else {
    hovering = false;
  }
  if (hovering) {
    fill(0, 0, 0, 170)
    stroke(255)

  } else {
    fill(255)
    stroke(0)
  }

  rect(buttonX, buttonY, buttonW, buttonH, 4)

  if (onC) {
    fill(r, 14, 40, 200)
    stroke(255)
    r = map(mouseX, 0, 500, 0, 255)
    g = map(mouseY, 0, 500, 0, 255)
    b = map(mouseY, 0, 500, 0, 255)
  } else {}


  if (on) {
    if (alt) {
      rect(g1x, g1y, sw, sh, 4)
      g1x += 11
      g1y += 18,5

    } else {
      rect(g2x, g2y, sw, sh, 4)

      g2x -= 3
      g2y += 8
    }

    if (g1y > height) {
      g1y = 0
    }
    if (g1x > width) {
      g1x = 0
    }
    if (g2y > height) {
      g2y = 0
    }
    if (g2x < 0) {
      g2x = 450
    }

  }

}

function mousePressed() {
  if (hovering) {
    on = !on
  }
  if (hovering2) {
    onC = !onC
  }
}let g1x = 0
let g1y = 250
let g2x = 450
let g2y = 250
let sw = 50
let sh = 50
let alt = false


function setup() {
  createCanvas(500, 500);
  background(220);
  rectMode(CENTER)
}

function draw() {



  if (random(1) > 0.5) {
    alt = true
  } else {
    alt = false
  }

  if (alt) {
    rect(g1x, g1y, sw, sh, 4)
    g1x += 11
    g1y += 8
    
  } else {
    rect(g2x, g2y, sw, sh, 4)

    g2x -= 11
    g2y += 8
 }

  if (g1y > height) {
    g1y = 0
  }
  if (g1x > width) {
    g1x = 0
  }
  if (g2y > height) {
    g2y = 0
  }
  if (g2x < 0) {
    g2x = 450
  }
  
  
}let on = false
let hovering = false
// let hoverClicking = false
let buttonX = 250
let buttonY = 450
let buttonW = 80
let buttonH = 80
let bx1 = 210
let bx2 = 290
let by1 = 410
let by2 = 490

let g1x = 0
let g1y = 250
let g2x = 450
let g2y = 250
let sw = 33
let sh = 33
let alt = false




function setup() {
  createCanvas(500, 500);
  background(220);
  rectMode(CENTER)


}


function draw() {
  //reference rect
  //rect coordinates: 
  //TLx210y340 TRx290y340 BLx210y420 BRx290y420

  if (random(1) > 0.5) {
    alt = true
  } else {
    alt = false
  }
  rect(buttonX, buttonY, buttonW, buttonH, 4)



  if (mouseX > bx1 && mouseX < bx2 && mouseY > by1 && mouseY < by2) {
    hovering = true;
  } else {
    hovering = false;
  }
 if (hovering) {
    fill(0,0,0,170)
   stroke(255)

  } else {
    fill(255)
    stroke(0)
  }

  // if (mouseIsPressed && hovering) {
  //   hoverClicking = true
  // } else {
  //   hoverClicking = false
  // }




  if (on) {
     if (alt) {
      rect(g1x, g1y, sw, sh, 4)
      g1x += 11
      g1y += 18,5

    } else {
      rect(g2x, g2y, sw, sh, 4)

      g2x -= 3
      g2y += 8
    }

    if (g1y > height) {
      g1y = 0
    }
    if (g1x > width) {
      g1x = 0
    }
    if (g2y > height) {
      g2y = 0
    }
    if (g2x < 0) {
      g2x = 450
    }

}
 
}
 function mousePressed() {
  if (mouseX > bx1 && mouseX < bx2 && mouseY > by1 && mouseY < by2) {
    on = !on
  }}// Mouse your cursor and keep mouse pressed

let x = 0
let y = 0
let r 
let g 
let b

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {

  if (mouseIsPressed) {
    r = map(mouseX, 0, 399, 0, 255)
    g = map(mouseY, 0, 399, 0, 255)
    fill(r, g, random(255), 80)
  } else {
    fill(255, 255, 255, 100)
  }

  if (random(1) > 0.5) {

    rect(x, y, 40, 40, 8)
   
    
  } else {
   
     rect(x-40, y+13/2, 50, 20, 4) 
  }
  y += (mouseX^3)*0.1
  if (y > height) {
    y = 0;
    x += (mouseY^3)*0.1
  }

 if(x > width) {
 x=0}


}// Icm quiz for week3 q 5.d)
// c is my counter, totalC is the variable for how many rects I want.
// rectTop is the width of my rects

let y = 0
let totalC = 10



function setup() {
  createCanvas(400, 400);
  strokeWeight(1)

}

function draw() {

  background(220);

  let c = 0
  let rectTop = width / totalC

  for (c; c < totalC; c++) {

    let x = width / totalC * c

    if (mouseX > x && mouseX < x + 40) {
      fill(c * 24, c * 15, 255 - c * 10, c * 25)
      //fill(mouseX/2, mouseX*2, mouseX)
    } else {
      fill(255, 255, 255)
    }
    rect(x, y, rectTop, height)


  }

}// Icm quiz for week3 q 5.c)
// c is my counter, totalC is the variable for how many rects I want.
// rectTop is the width of my rects

let y = 0
let totalC = 10



function setup() {
  createCanvas(400, 400);
  strokeWeight(1)

}

function draw() {

  background(220);

  let c = 0
  let rectTop = width / totalC

  for (c; c < totalC; c++) {


    let x = width / totalC * c

    if (mouseX > x && mouseX < x + 40 && c % 2 == 0) {
      fill(22, 33, 255)
    } else if (mouseX > x && mouseX < x + 40) {
      fill(255, 33, 22)
    } else {
      fill(255, 255, 255)
    }
    rect(x, y, rectTop, height)


  }

}// Icm quiz for week3 q 5.b)
// c is my counter, totalC is the variable for how many rects I want.
// rectTop is the width of my rects

let y = 0
let totalC = 10



function setup() {
  createCanvas(400, 400);
  strokeWeight(1)

}

function draw() {

  background(220);

  let c = 0
  let rectTop = width / totalC

  for (c; c < totalC; c++) {


    let x = width / totalC * c

    if (mouseX > x && mouseX < x + 40 && c < 5) {
      fill(22, 33, 255)
    } else if (mouseX > x && mouseX < x + 40 && c > 4) {
      fill(255, 33, 22)
    } else {
      fill(255, 255, 255)
    }
    rect(x, y, rectTop, height)


  }

}// Icm quiz for week3 q 5.a)
// c is my counter, totalC is the variable for how many rects I want.
// rectTop is the width of my rects

let y = 0
let totalC = 10


function setup() {
  createCanvas(400, 400);
  strokeWeight(1)

}

function draw() {

  background(220);

  let c = 0
  let rectTop = width / totalC

  for (c; c < totalC; c++) {

    let x = width / totalC * c

    if (mouseX > x && mouseX < x + 40 && c != 6) {
      fill(255, 33, 22)
    } else {
      fill(255, 255, 255)
    }
    rect(x, y, rectTop, height)

  }

}

// here I tried c!=7 however by doing so I effected the 8th rect
// instead of the 7th. This became a good reminder of counting 
// starting from zero in p5.js// Icm quiz for week3 q 4.)
// c is my counter, totalC is the variable for how many rects I want.
// rectTop is the width of my rects

let y = 0
let totalC = 10


function setup() {
  createCanvas(400, 400);
  strokeWeight(1)

}

function draw() {

  background(220);

  let c = 0
  let rectTop = width / totalC

  for (c; c < totalC; c++) {

    let x = width / totalC * c
    if (mouseX > x && mouseX < x + 40) {
      fill(255, 33, 22)
    } else {
      fill(255, 255, 255)

    }
    rect(x, y, rectTop, height)

  }

}

// This took me a while to figure out. I had the if-else fill
// condition written after the rect() and the rectangle immidiately
// right to the rectangle I was howering over was highlighted. When I
// put fill above the rect(), the sketch worked. I think I mostly get 
// it now, but not completely :) I believe I still didn't quite grasp 
// something fundamental about p5.js but I'm optimistic.  // icm quiz for week3 q 7.)

  function setup() {
    createCanvas(400, 400);
    strokeWeight(1)
  }

  function draw() {
    background(255);
    for (let x = 0; x < 400; x += 40) {
      for (let y = 0; y < 400; y += 40) {
        if (x / 40 % 2 == 0 && y / 40 % 2 == 0 ||
          x / 40 % 2 == 1 && y / 40 % 2 == 1) {
          fill(0)
        } else {
          fill(255)
        }

        rect(x, y, 40, 40)


      }
    }

  }

  // if (x / 40 % 2 == 0 && y / 40 % 2 == 0) once I had this
  // figured out, I started playing with it, and once I 
  // figured out that if (x / 40 % 2 == 1 && y / 40 % 2 == 1)
  // worked on the remaining squares I wanted to fill with
  // black, I added it inside the if() with || (or).// icm quiz for week3 q 6.)

function setup() {
  createCanvas(400, 400);
  strokeWeight(1)

}

function draw() {
  background(120);
  for (let x = 0; x < 400; x += 40) {
    for (let y = 0; y < 400; y += 40) {
      stroke(233, 123, 70)
      rect(x, y, 40, 40)

    }
  }
}//Icm quiz for week3 q 3.)

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);


  if (mouseX < width / 3) {
    fill(255, 0, 0)
    rect(0, 0, width / 3, height)
  } else if (mouseX < width * (2 / 3)) {
    fill(255, 0, 0)
    rect(width / 3, 0, width / 3, height)
  // } else {
  //   fill(255, 0, 0)
  //   rect(width * (2 / 3), 0, width / 3, height)
  }
       if(mouseX>width*2/3 && mouseIsPressed)
   {fill(255, 0, 0)
    rect(width * (2 / 3), 0, width / 3, height)}


}//Icm quiz for week3 q 2.)

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);



  if (mouseX < width / 3) {
    fill(255, 0, 0)
    rect(0, 0, width / 3, height)
  } else if (mouseX < width * (2 / 3)) {
    fill(255, 0, 0)
    rect(width / 3, 0, width / 3, height)
  } else {
    fill(255, 0, 0)
    rect(width * (2 / 3), 0, width / 3, height)
  }


}// Icm quiz for week3 q 1.)
// this is the slightly longer version

// let x=0 
// let bspeed=1

// function setup() {
//   createCanvas(400, 400);
// }

// function draw() {
//   background(220);
//   ellipse(x,height/2,50,50)
//   x+=bspeed

//   if(x>width)
//   {bspeed=-1}

//   if(x<0)
//   {bspeed=1}
// }

let x = 0
let bspeed = 1

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(x, height / 2, 50, 50)
  x += bspeed

  if (x > width || x < 0) {
    bspeed *= -1
  }

}// function setup() {
//   createCanvas(480, 400);
// }

// function draw() {
  
//   background(220);
//   if (mouseX > 0 && mouseX < width / 3) {
//   fill(255,0,0);
//   rect(0,0,width/3, height)
//   }
//   if (mouseX >  width / 3 && mouseX < width* 2/3) { 
//     fill(255,0,0)
//     rect(width/3,0, width/3, height)
//   }
//    if (mouseX >  width* 2/3 && mouseX < width) { 
//     fill(255,0,0)
//      rect(width* 2/3, 0, width/3, height)
//   }
  
// }

let leftIsOn = false

function setup() {
  createCanvas(480, 400);
}

function draw() {
  
  background(220);
  if (leftIsOn) {
  fill(255,0,0);
  rect(0,0,width/3, height)
  }
  else if ( mouseX < width* 2/3) { 
    fill(255,0,0)
    rect(width/3,0, width/3, height)
  }
   else  { 
    fill(255,0,0)
     rect(width* 2/3, 0, width/3, height)
  }
  
function mousePressed() {
  // toggle the state of the left panel
  if ( mouseX < width / 3){
  leftIsOn = !leftIsOn;
  }
  
  
  
}
}

let ex = 200;
let ey = 600;
let ed = 50;
let ch = 600;
let d
let espeed

function setup() {
  createCanvas(400, ch);
}

function draw() {
  background(220);
  ellipse(ex, ey, ed)
 // ey -= (ey - mouseY) /777
 
  

ey-= espeed;
 espeed = (ey-mouseY)/100;
}let ex = 200;
let ey = 600;
let ed = 50;
let ch = 600;

function setup() {
  createCanvas(400, ch);
}

function draw() {
  background(220);
  ellipse(ex, ey, ed)
  ey -= ch/300
 
  
}

// so the frame rate is 60 5seconds*60=300frames// my first attempt

//let x = 0
//let y = 0
//let xspeed = 0.8

//function setup(){

//createCanvas(400,400)


//}

//function draw() {
//  background(220)

//let d = dist(mouseX,mouseY, x, y)
//  if (d > 30) {
//    translate(mouseX,mouseY)
//  } else {translate(x,y)

//  }
//  rect(x,y,30,30)
//}

// my second attempt

let x = 0
let y = 0

function setup() {

  createCanvas(400, 400)
  x = width/2
  y = height/2
  rectMode(CENTER)

}

function draw() {
  background(220)
  rect(x, y, width/2, height/2)


  let d = dist(mouseX, mouseY, x, y);
  if (d > 11) {
    x = x + (mouseX - x) / 100
    y = y + (mouseY - y) / 100
  } else {
    x = x
    y = y
  }

}// Answers to 2.a 2.b and 2.c arein the comments

let cx 
let cy 
let cspeed = 0.3

//if we were to use 3 for cspeed, the ball moves 10x faster.
// let cspeed = 3

function setup() {
  createCanvas(400, 400);
  cx = width/2
  cy = height/2
}

function draw() {
  background(220);
  ellipse(cx , cy , width / 8, height / 8)

  // Moving to the right

  // cx = cx + cspeed 

  // Moving to the left

  // cx = cx - cspeed

  // Moving to bottom rigth corner

  // cx = cx + cspeed 
  // cy = cy + cspeed

  // Moving to bottom left corner

  // cx = cx - cspeed 
  // cy = cy + cspeed

  // Moving to top right corner

  // cx = cx + cspeed 
  // cy = cy - cspeed

  // Moving to top left corner

  cx = cx - cspeed
  cy = cy - cspeed


}//both 1.a and 1.b are here, I commented 1.a

function setup() {
  createCanvas(400, 400);
}

function draw() {
  rectMode(CENTER)
  background(220);
  // rect(width/2, height/2, width*0.5, height/2)


  strokeWeight(2)
  beginShape();
  vertex(width / 4, height / 4)
  vertex(width * 0.75, height * 0.25)
  vertex(width * 0.75, height * 0.75)
  vertex(width * 0.25, height * 0.75)
  endShape(CLOSE)





}// There are two ellipeses in the middle.
// Two sets of rectangles are being drawn over time from the top right 
// and bottom right corners. Three squares follow mouseX and mouseY
// the color of the inner circle is random, it's different everytime 
// the code is run. Every other color is mapped for mouseX and mouseY,
// when mouse is pressed and for mouseX and mouseY, when mouse isn't 
// pressed.



let r = 0
let g = 0
let b = 0
let cx = 0
let cy = 0
let xspeed = 0.9
let c2x = 0
let c2y = 399
let c3x = 399
let c3y = 0
let c4x = 399
let c4y = 399

let ex
let ey
let randomColor


function setup() {
  createCanvas(400, 400);
  ex = width / 2
  ey = height / 2

  background(127)

  randomColor = color(random(255), random(255), random(255))

}



function draw() {
  rectMode(CENTER)


  strokeWeight();
  //if (mouseIsPressed) {
  //fill(b, r, g, 120)
  //r = map(mouseY, 0, 400, 0, 255)
  //g = map(mouseX, 0, 400, 0, 255)
  //b = 255
  //} else {
  //fill(b, r, g, 120)
  //r = map(mouseX, 0, 400, 0, 255)
  //g = map(mouseY, 0, 400, 0, 255)
  //b = 0;

  // }
  // ellipse(ex, ey , 200, 200)


  if (mouseIsPressed) {
    fill(r, g, b)
    r = map(mouseX, 0, 400, 0, 255)
    g = map(mouseY, 0, 400, 0, 255)
    b = 255
  } else {
    fill(r, g, b)
    r = map(mouseY, 0, 400, 0, 255)
    g = map(mouseX, 0, 400, 0, 255)
    b = 0;

  }


  fill(r, g, b, 90)


  rect(c3x, c3y, 400, 1)
  c3x = c3x - xspeed
  c3y = c3y + xspeed

  rect(c4x, c4y, 400, 2)
  c4x = c4x - xspeed
  c4y = c4y - xspeed
  fill(r, g, b)

  // rect(cx,cy, 400,2)
  cx = cx + xspeed
  cy = cy + xspeed

  // rect(c2x,c2y, 400,2 )
  c2x = c2x + xspeed
  c2y = c2y - xspeed

  ellipse(ex, ey, 150, 150)


  push()

  strokeWeight(2)
  translate(mouseX, mouseY);
  scale(mouseY * mouseX / 100000)
  //scale(mouseY / mouseX)
  //scale(mouseY / mouseX)*10000
  rect(0, 0, 50, 50)
  translate(35, 10)
  rect(-70, 0, 15, 15)
  rect(0, 0, 15, 15)

  pop()

  fill(randomColor)
  ellipse(ex, ey, 75, 75)



}let r = 0
let g = 0
let b = 0
let cx = 0
let cy = 0 

function setup() {
  createCanvas(400, 400);

}

function draw() {
rectMode(CENTER) 


//background 
  
  if (mouseIsPressed) {
    background(r, g, b)
    r = map(mouseX, 0, 400, 0, 255)
    g = map(mouseY, 0, 400, 0, 255)
    b = 255
  } else {
    background(r, g, b);
    r = map(mouseY, 0, 400, 0, 255)
    g = map(mouseX, 0, 400, 0, 255)
    b = 0
  }
  
  
ellipse(width / 2, height / 2, 300, 300);
strokeWeight(2);
fill(0,222,55);

//square 
  
  strokeWeight(2);
  rect(width / 2, height / 2, 200, 200);
  if (mouseIsPressed) {
    fill(r, g, b)
    r = map(mouseY, 0, 400, 0, 255)
    g = map(mouseX, 0, 400, 0, 255)
    b = 0
  } else {
    fill(r, g, b);
    r = map(mouseX, 0, 400, 0, 255)
    g = map(mouseY, 0, 400, 0, 255)
    b = 255
  }

//ellipse

  strokeWeight();
  ellipse(width / 2, height / 2, 150, 150)


  if (mouseIsPressed) {
    fill(r, g, b)
    r = map(mouseY, 0, 400, 0, 255)
    g = map(mouseX, 0, 400, 0, 255)
    b = 0
  } else {
    fill(r, g, b)
    r = map(mouseX, 0, 400, 0, 255)
    g = map(mouseY, 0, 400, 0, 255)
    b = 255;

  }





}let r = 0
let g = 0
let b = 0


function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (mouseIsPressed) {
    background(r, g, b)
    r = map (mouseX, 0, 400, 0, 255)
    g = map (mouseY, 0, 400, 0, 255)
    b = 255
  } else {
    background(r, g, b);
    r = map (mouseY, 0, 400, 0, 255)
    g = map (mouseX, 0, 400, 0, 255)
    b = 0 
  }
}
function setup() {
  createCanvas(400, 400);
}

function draw() {
 //map (mouseX, 0, 400, 0, 255)
  if (mouseIsPressed) {
    background(mouseY, mouseX, 255)
  } else {
    background(mouseX, mouseY, 0);
  }
}function setup() {
  createCanvas(400, 400);
  rectMode(CENTER, CENTER);
}

function draw() {
  background(220);
  push()
  translate(100, 100)
  rotate()
  rect(0, 0, 50, 50)
  pop()

  push()
  translate(200, 200)
  rotate()
  rect(0, 0, 50, 50)
  pop()

  // push and pop immunity parantezi
}function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(0,255,255);
  strokeWeight(28)
  stroke(255,0,0)
  line(0,0,400,300)
  strokeWeight()
  fill(0,205,0)
  ellipse(199,149,200,150)
  
  rectMode(CORNERS)
  fill(0,0,205)
  rect(274, 125, 299, 150)
  
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  fill(0,250,250)
  ellipse(199,199,100)
}//ICM quiz for class 2
//question 1.) Where should you put createCanvas()?

function setup() {
  createCanvas(400, 400); //we put it at the beggining, right
  //after setup() {
}

function draw() {
  background(220);
}// Self portrait assignment for ICM
// by bora aydintug
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0, 150, 220);

  //body&head
  strokeWeight(1)
  rectMode(CENTER)
  fill(255, 229, 204)
  rect(199, 360, 90, 150, 13)
  rect(199, 250, 43, 78, 10)
  line(174, 399, 174, 315)
  line(239, 399, 239, 315)
  // I think since the 400x400 coordinate system
  // starts with 0 and ends with 399, 199 might 
  // be the center of the given axis rather than 200

  //face
  ellipse(195, 240, 13)
  ellipse(218, 240, 13)
  strokeWeight(5)
  point(220, 238)
  point(197, 238)
  strokeWeight(1)
  arc(205, 267, 10, 10, 0, PI + QUARTER_PI, CHORD);

  //cloud 1
  fill(255)
  strokeWeight()
  rect(-10, 65, 184, 63, 18)
  rect(-10, 67, 200, 33, 18)
  rect(-10, 82, 144, 43, 18)
  rect(10, 48, 43, 43, 18)
  rect(10, 93, 53, 43, 18)
  rect(10, 48, 43, 43, 18)

  //sun
  fill(255, 215, 0)
  ellipse(280, 80, 77)


  //sunbeam
  fill(255, 215, 0, 122)
  triangle(280, 80, 30, 400, 300, 410)

  //cloud2
  fill(255)
  rect(343, 108, 78, 40, 18)
  rect(380, 78, 188, 52, 18)
  rect(370, 58, 118, 32, 18)
  rect(390, 115, 58, 52, 18)
  rect(380, 82, 238, 18, 18)

  //cloud3 
  fill(255)
  strokeWeight()
  rect(148, 125, 134, 53, 18)
  rect(150, 105, 103, 43, 18)
  rect(155, 90, 43, 23, 18)
  rect(151, 130, 150, 19, 18)
  rect(147, 140, 105, 43, 18)

}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
   strokeWeight(4)
  ellipse(165, 170, 33, 33)
  ellipse(240, 170, 33, 33)
  ellipse(200, 200, 105, 105)
  ellipse(160, 180, 33, 33)
  ellipse(240, 180, 33, 33)
  textSize(32);
  text('D', 225, 230)
  text('O', 150, 230);
	}
