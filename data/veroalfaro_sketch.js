/* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3*/
let serial; // variable to hold an instance of the serialport library
let fromSerial = 0; //variable to hold the data


let data;
let story1;
let story2;
let story3;
let story4;
let story5;
let story6;
let story7;
let story8;
let story9;
let story10;
let story11;
let story12;
let story13;
let story14;
let story15;
let story16;
let story17;
let story18;
let story19;
let story20;
let story21;
let story22;
let story23;
let story24;
let story25;
let story26;
let story27;
let story28;
let story29;
let story30;
let story31;
let story32;
let story33;
let story34;
let story35;
let story36;


let soundFX;


 function preload(){
  data = loadSound('36_out_of_100.mp3');
  story1 = loadSound('story_1.mp3');
  story2 = loadSound('story_2.mp3');
  story3 = loadSound('story_3.mp3');
  story4 = loadSound('story_4.mp3');
  story5 = loadSound('story_5.mp3');
  story6 = loadSound('story_6.mp3');
  story7 = loadSound('story_7.mp3');
  story8 = loadSound('story_8.mp3');
  story9 = loadSound('story_9.mp3');
  story10 = loadSound('story_10.mp3');
  story11 = loadSound('story_11.mp3');
  story12 = loadSound('story_12.mp3');
  story13 = loadSound('story_13.mp3');
  story14 = loadSound('story_14.mp3');
  story15 = loadSound('story_15.mp3');
  story16 = loadSound('story_16.mp3');
  story17 = loadSound('story_17.mp3');
  story18 = loadSound('story_18.mp3');
  story19 = loadSound('story_19.mp3');
  story20 = loadSound('story_20.mp3');
  story21 = loadSound('story_21.mp3');
  story22 = loadSound('story_22.mp3');
  story23 = loadSound('story_23.mp3');
  story24 = loadSound('story_24.mp3');
  story25 = loadSound('story_25.mp3');
  story26 = loadSound('story_26.mp3');
  story27 = loadSound('story_27.mp3');
  story28 = loadSound('story_28.mp3');
  story29 = loadSound('story_29.mp3');
  story30 = loadSound('story_30.mp3');
  story31 = loadSound('story_31.mp3');
  story32 = loadSound('story_32.mp3');
  story33 = loadSound('story_33.mp3');
  story34 = loadSound('story_34.mp3');
  story35 = loadSound('story_35.mp3');
  story36 = loadSound('story_36.mp3');
 }

function setup() {
  createCanvas(1024, 768);
  soundFX = [data, story1, story2, story3, story4, story5, story6, story7, story8, story9, story10,story11, story12, story13, story14, story15, story16, story17, story18, story19, story20, story21, story22, story23, story24, story25, story26, story27, story28, story29, story30, story31, story32, story33, story34, story35, story36];
  //soundFX[0].loop();
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1411"); // open a port
}

function draw() {
  background(0,0,0);

}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
  
  fromSerial = serial.read();
  console.log(fromSerial);

  
  if (fromSerial == 50) {
    for (let i = 1; i < soundFX.length; i++) {
    soundFX[i].stop();
  }
  }
  
    if (fromSerial == 0) {
    soundFX[0].stop();
  }
  
    if (fromSerial == 52) {
    soundFX[0].loop();
  }
  
  if (fromSerial == 1) {
    soundFX[1].play();
  }
  
    if (fromSerial == 2) {
    soundFX[2].play();
  }
  
    if (fromSerial == 3) {
    soundFX[3].play();
  }
  
    if (fromSerial == 4) {
    soundFX[4].play();
  }
  
    if (fromSerial == 5) {
    soundFX[5].play();
  }
  
    if (fromSerial == 6) {
    soundFX[6].play();
  }
  
    if (fromSerial == 7) {
    soundFX[7].play();
  }
  
    if (fromSerial == 8) {
    soundFX[8].play();
  }
  
    if (fromSerial == 9) {
    soundFX[9].play();
  }
  
    if (fromSerial == 10) {
    soundFX[10].play();
  }
  
    if (fromSerial == 11) {
    soundFX[11].play();
  }
  
    if (fromSerial == 12) {
    soundFX[12].play();
  }
  
    if (fromSerial == 13) {
    soundFX[13].play();
  }
  
    if (fromSerial == 14) {
    soundFX[14].play();
  }
  
    if (fromSerial == 15) {
    soundFX[15].play();
  }
  
    if (fromSerial == 16) {
    soundFX[16].play();
  }
  
    if (fromSerial == 17) {
    soundFX[17].play();
  }
  
    if (fromSerial == 18) {
    soundFX[18].play();
  }
  
    if (fromSerial == 19) {
    soundFX[19].play();
  }
  
    if (fromSerial == 20) {
    soundFX[20].play();
  }
  
    if (fromSerial == 21) {
    soundFX[21].play();
  }
  
    if (fromSerial == 22) {
    soundFX[22].play();
  }
  
    if (fromSerial == 23) {
    soundFX[23].play();
  }
  
    if (fromSerial == 24) {
    soundFX[24].play();
  }
  
    if (fromSerial == 25) {
    soundFX[25].play();
  }
  
    if (fromSerial == 26) {
    soundFX[26].play();
  }
  
    if (fromSerial == 27) {
    soundFX[27].play();
  }
  
    if (fromSerial == 28) {
    soundFX[28].play();
  }
  
    if (fromSerial == 29) {
    soundFX[29].play();
  }
  
    if (fromSerial == 30) {
    soundFX[30].play();
  }
  
    if (fromSerial == 31) {
    soundFX[31].play();
  }
  
    if (fromSerial == 32) {
    soundFX[32].play();
  }
  
    if (fromSerial == 33) {
    soundFX[33].play();
  }
  
    if (fromSerial == 34) {
    soundFX[34].play();
  }
  
    if (fromSerial == 35) {
    soundFX[35].play();
  }
  
    if (fromSerial == 36) {
    soundFX[36].play();
  }
  
  
  
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available()){
  byte byteFromSerial = Serial.read();
  analogWrite(3,byteFromSerial);
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3*/
let serial; // variable to hold an instance of the serialport library
let fromSerial = 0; //variable to hold the data


let data;
let story1;
let story2;
let story3;
let story4;
let story5;
let story6;
let story7;
let story8;
let story9;
let story10;
let story11;
let story12;
let story13;
let story14;
let story15;
let story16;
let story17;
let story18;
let story19;
let story20;
let story21;
let story22;
let story23;
let story24;
let story25;
let story26;
let story27;
let story28;
let story29;
let story30;
let story31;
let story32;
let story33;
let story34;
let story35;
let story36;


let soundFX;


 function preload(){
  data = loadSound('36_out_of_100.mp3');
  story1 = loadSound('story_1.mp3');
  story2 = loadSound('story_2.mp3');
  story3 = loadSound('story_3.mp3');
  story4 = loadSound('story_4.mp3');
  story5 = loadSound('story_5.mp3');
  story6 = loadSound('story_6.mp3');
  story7 = loadSound('story_7.mp3');
  story8 = loadSound('story_8.mp3');
  story9 = loadSound('story_9.mp3');
  story10 = loadSound('story_10.mp3');
  story11 = loadSound('story_11.mp3');
  story12 = loadSound('story_12.mp3');
  story13 = loadSound('story_13.mp3');
  story14 = loadSound('story_14.mp3');
  story15 = loadSound('story_15.mp3');
  story16 = loadSound('story_16.mp3');
  story17 = loadSound('story_17.mp3');
  story18 = loadSound('story_18.mp3');
  story19 = loadSound('story_19.mp3');
  story20 = loadSound('story_20.mp3');
  story21 = loadSound('story_21.mp3');
  story22 = loadSound('story_22.mp3');
  story23 = loadSound('story_23.mp3');
  story24 = loadSound('story_24.mp3');
  story25 = loadSound('story_25.mp3');
  story26 = loadSound('story_26.mp3');
  story27 = loadSound('story_27.mp3');
  story28 = loadSound('story_28.mp3');
  story29 = loadSound('story_29.mp3');
  story30 = loadSound('story_30.mp3');
  story31 = loadSound('story_31.mp3');
  story32 = loadSound('story_32.mp3');
  story33 = loadSound('story_33.mp3');
  story34 = loadSound('story_34.mp3');
  story35 = loadSound('story_35.mp3');
  story36 = loadSound('story_36.mp3');
 }

function setup() {
  createCanvas(1024, 768);
  soundFX = [data, story1, story2, story3, story4, story5, story6, story7, story8, story9, story10,story11, story12, story13, story14, story15, story16, story17, story18, story19, story20, story21, story22, story23, story24, story25, story26, story27, story28, story29, story30, story31, story32, story33, story34, story35, story36];
  //soundFX[0].loop();
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1411"); // open a port
}

function draw() {
  background(0,0,0);

}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
  
  fromSerial = serial.read();
  console.log(fromSerial);

  
  if (fromSerial == 50) {
    for (let i = 1; i < soundFX.length; i++) {
    soundFX[i].stop();
  }
  }
  
    if (fromSerial == 0) {
    soundFX[0].stop();
  }
  
    if (fromSerial == 52) {
    soundFX[0].loop();
  }
  
  if (fromSerial == 1) {
    soundFX[1].play();
  }
  
    if (fromSerial == 2) {
    soundFX[2].play();
  }
  
    if (fromSerial == 3) {
    soundFX[3].play();
  }
  
    if (fromSerial == 4) {
    soundFX[4].play();
  }
  
    if (fromSerial == 5) {
    soundFX[5].play();
  }
  
    if (fromSerial == 6) {
    soundFX[6].play();
  }
  
    if (fromSerial == 7) {
    soundFX[7].play();
  }
  
    if (fromSerial == 8) {
    soundFX[8].play();
  }
  
    if (fromSerial == 9) {
    soundFX[9].play();
  }
  
    if (fromSerial == 10) {
    soundFX[10].play();
  }
  
    if (fromSerial == 11) {
    soundFX[11].play();
  }
  
    if (fromSerial == 12) {
    soundFX[12].play();
  }
  
    if (fromSerial == 13) {
    soundFX[13].play();
  }
  
    if (fromSerial == 14) {
    soundFX[14].play();
  }
  
    if (fromSerial == 15) {
    soundFX[15].play();
  }
  
    if (fromSerial == 16) {
    soundFX[16].play();
  }
  
    if (fromSerial == 17) {
    soundFX[17].play();
  }
  
    if (fromSerial == 18) {
    soundFX[18].play();
  }
  
    if (fromSerial == 19) {
    soundFX[19].play();
  }
  
    if (fromSerial == 20) {
    soundFX[20].play();
  }
  
    if (fromSerial == 21) {
    soundFX[21].play();
  }
  
    if (fromSerial == 22) {
    soundFX[22].play();
  }
  
    if (fromSerial == 23) {
    soundFX[23].play();
  }
  
    if (fromSerial == 24) {
    soundFX[24].play();
  }
  
    if (fromSerial == 25) {
    soundFX[25].play();
  }
  
    if (fromSerial == 26) {
    soundFX[26].play();
  }
  
    if (fromSerial == 27) {
    soundFX[27].play();
  }
  
    if (fromSerial == 28) {
    soundFX[28].play();
  }
  
    if (fromSerial == 29) {
    soundFX[29].play();
  }
  
    if (fromSerial == 30) {
    soundFX[30].play();
  }
  
    if (fromSerial == 31) {
    soundFX[31].play();
  }
  
    if (fromSerial == 32) {
    soundFX[32].play();
  }
  
    if (fromSerial == 33) {
    soundFX[33].play();
  }
  
    if (fromSerial == 34) {
    soundFX[34].play();
  }
  
    if (fromSerial == 35) {
    soundFX[35].play();
  }
  
    if (fromSerial == 36) {
    soundFX[36].play();
  }
  
  
  
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available()){
  byte byteFromSerial = Serial.read();
  analogWrite(3,byteFromSerial);
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3*/
let serial; // variable to hold an instance of the serialport library
let fromSerial = 0; //variable to hold the data


let data;
let story1;
let story2;
let story3;
let story4;
let story5;
let story6;
let story7;
let story8;
let story9;
let story10;
let story11;
let story12;
let story13;
let story14;
let story15;
let story16;
let story17;
let story18;
let story19;
let story20;
let story21;
let story22;
let story23;
let story24;
let story25;
let story26;
let story27;
let story28;
let story29;
let story30;
let story31;
let story32;
let story33;
let story34;
let story35;
let story36;


let soundFX;


 function preload(){
  data = loadSound('36_out_of_100.mp3');
  story1 = loadSound('story_1.mp3');
  story2 = loadSound('story_2.mp3');
  story3 = loadSound('story_3.mp3');
  story4 = loadSound('story_4.mp3');
  story5 = loadSound('story_5.mp3');
  story6 = loadSound('story_6.mp3');
  story7 = loadSound('story_7.mp3');
  story8 = loadSound('story_8.mp3');
  story9 = loadSound('story_9.mp3');
  story10 = loadSound('story_10.mp3');
  story11 = loadSound('story_11.mp3');
  story12 = loadSound('story_12.mp3');
  story13 = loadSound('story_13.mp3');
  story14 = loadSound('story_14.mp3');
  story15 = loadSound('story_15.mp3');
  story16 = loadSound('story_16.mp3');
  story17 = loadSound('story_17.mp3');
  story18 = loadSound('story_18.mp3');
  story19 = loadSound('story_19.mp3');
  story20 = loadSound('story_20.mp3');
  story21 = loadSound('story_21.mp3');
  story22 = loadSound('story_22.mp3');
  story23 = loadSound('story_23.mp3');
  story24 = loadSound('story_24.mp3');
  story25 = loadSound('story_25.mp3');
  story26 = loadSound('story_26.mp3');
  story27 = loadSound('story_27.mp3');
  story28 = loadSound('story_28.mp3');
  story29 = loadSound('story_29.mp3');
  story30 = loadSound('story_30.mp3');
  story31 = loadSound('story_31.mp3');
  story32 = loadSound('story_32.mp3');
  story33 = loadSound('story_33.mp3');
  story34 = loadSound('story_34.mp3');
  story35 = loadSound('story_35.mp3');
  story36 = loadSound('story_36.mp3');
 }

function setup() {
  createCanvas(1024, 768);
  soundFX = [data, story1, story2, story3, story4, story5, story6, story7, story8, story9, story10,story11, story12, story13, story14, story15, story16, story17, story18, story19, story20, story21, story22, story23, story24, story25, story26, story27, story28, story29, story30, story31, story32, story33, story34, story35, story36];
  soundFX[0].loop();
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1411"); // open a port
}

function draw() {
  background(0,0,0);

}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
  
  fromSerial = serial.read();
  console.log(fromSerial);

  
  if (fromSerial == 50) {
    for (let i = 0; i < soundFX.length; i++) {
    soundFX[i].stop();
  }
  }
  
  if (fromSerial == 1) {
    soundFX[1].play();
  }
  
    if (fromSerial == 2) {
    soundFX[2].play();
  }
  
    if (fromSerial == 3) {
    soundFX[3].play();
  }
  
    if (fromSerial == 4) {
    soundFX[4].play();
  }
  
    if (fromSerial == 5) {
    soundFX[5].play();
  }
  
    if (fromSerial == 6) {
    soundFX[6].play();
  }
  
    if (fromSerial == 7) {
    soundFX[7].play();
  }
  
    if (fromSerial == 8) {
    soundFX[8].play();
  }
  
    if (fromSerial == 9) {
    soundFX[9].play();
  }
  
    if (fromSerial == 10) {
    soundFX[10].play();
  }
  
    if (fromSerial == 11) {
    soundFX[11].play();
  }
  
    if (fromSerial == 12) {
    soundFX[12].play();
  }
  
    if (fromSerial == 13) {
    soundFX[13].play();
  }
  
    if (fromSerial == 14) {
    soundFX[14].play();
  }
  
    if (fromSerial == 15) {
    soundFX[15].play();
  }
  
    if (fromSerial == 16) {
    soundFX[16].play();
  }
  
    if (fromSerial == 17) {
    soundFX[17].play();
  }
  
    if (fromSerial == 18) {
    soundFX[18].play();
  }
  
    if (fromSerial == 19) {
    soundFX[19].play();
  }
  
    if (fromSerial == 20) {
    soundFX[20].play();
  }
  
    if (fromSerial == 21) {
    soundFX[21].play();
  }
  
    if (fromSerial == 22) {
    soundFX[22].play();
  }
  
    if (fromSerial == 23) {
    soundFX[23].play();
  }
  
    if (fromSerial == 24) {
    soundFX[24].play();
  }
  
    if (fromSerial == 25) {
    soundFX[25].play();
  }
  
    if (fromSerial == 26) {
    soundFX[26].play();
  }
  
    if (fromSerial == 27) {
    soundFX[27].play();
  }
  
    if (fromSerial == 28) {
    soundFX[28].play();
  }
  
    if (fromSerial == 29) {
    soundFX[29].play();
  }
  
    if (fromSerial == 30) {
    soundFX[30].play();
  }
  
    if (fromSerial == 31) {
    soundFX[31].play();
  }
  
    if (fromSerial == 32) {
    soundFX[32].play();
  }
  
    if (fromSerial == 33) {
    soundFX[33].play();
  }
  
    if (fromSerial == 34) {
    soundFX[34].play();
  }
  
    if (fromSerial == 35) {
    soundFX[35].play();
  }
  
    if (fromSerial == 36) {
    soundFX[36].play();
  }
  
  
  
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available()){
  byte byteFromSerial = Serial.read();
  analogWrite(3,byteFromSerial);
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3*/
let serial; // variable to hold an instance of the serialport library
let fromSerial = 0; //variable to hold the data


let data;
let story1;
let story2;
let story3;
let story4;
let story5;
let story6;
let story7;
let story8;
let story9;
let story10;
let story11;
let story12;
let story13;
let story14;
let story15;
let story16;
let story17;
let story18;
let story19;
let story20;
let story21;
let story22;
let story23;
let story24;
let story25;
let story26;
let story27;
let story28;
let story29;
let story30;
let story31;
let story32;
let story33;
let story34;
let story35;
let story36;


let soundFX;


 function preload(){
  data = loadSound('36_out_of_100.mp3');
  story1 = loadSound('story_1.mp3');
  story2 = loadSound('story_2.mp3');
  story3 = loadSound('story_3.mp3');
  story4 = loadSound('story_4.mp3');
  story5 = loadSound('story_5.mp3');
  story6 = loadSound('story_6.mp3');
  story7 = loadSound('story_7.mp3');
  story8 = loadSound('story_8.mp3');
  story9 = loadSound('story_9.mp3');
  story10 = loadSound('story_10.mp3');
  story11 = loadSound('story_11.mp3');
  story12 = loadSound('story_12.mp3');
  story13 = loadSound('story_13.mp3');
  story14 = loadSound('story_14.mp3');
  story15 = loadSound('story_15.mp3');
  story16 = loadSound('story_16.mp3');
  story17 = loadSound('story_17.mp3');
  story18 = loadSound('story_18.mp3');
  story19 = loadSound('story_19.mp3');
  story20 = loadSound('story_20.mp3');
  story21 = loadSound('story_21.mp3');
  story22 = loadSound('story_22.mp3');
  story23 = loadSound('story_23.mp3');
  story24 = loadSound('story_24.mp3');
  story25 = loadSound('story_25.mp3');
  story26 = loadSound('story_26.mp3');
  story27 = loadSound('story_27.mp3');
  story28 = loadSound('story_28.mp3');
  story29 = loadSound('story_29.mp3');
  story30 = loadSound('story_30.mp3');
  story31 = loadSound('story_31.mp3');
  story32 = loadSound('story_32.mp3');
  story33 = loadSound('story_33.mp3');
  story34 = loadSound('story_34.mp3');
  story35 = loadSound('story_35.mp3');
  story36 = loadSound('story_36.mp3');
 }

function setup() {
  createCanvas(1024, 768);
  soundFX = [data, story1, story2, story3, story4, story5, story6, story7, story8, story9, story10,story11, story12, story13, story14, story15, story16, story17, story18, story19, story20, story21, story22, story23, story24, story25, story26, story27, story28, story29, story30, story31, story32, story33, story34, story35, story36];
  soundFX[0].loop();
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1411"); // open a port
}

function draw() {
  background(0,0,0);

}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
  
  fromSerial = serial.read();
  console.log(fromSerial);

  
  if (fromSerial == 50) {
    for (let i = 0; i < soundFX.length; i++) {
    soundFX[i].stop();
  }
  }
  
  if (fromSerial == 1) {
    soundFX[1].play();
  }
  
    if (fromSerial == 2) {
    soundFX[2].play();
  }
  
    if (fromSerial == 3) {
    soundFX[3].play();
  }
  
    if (fromSerial == 4) {
    soundFX[4].play();
  }
  
    if (fromSerial == 5) {
    soundFX[5].play();
  }
  
    if (fromSerial == 6) {
    soundFX[6].play();
  }
  
    if (fromSerial == 7) {
    soundFX[7].play();
  }
  
    if (fromSerial == 8) {
    soundFX[8].play();
  }
  
    if (fromSerial == 9) {
    soundFX[9].play();
  }
  
    if (fromSerial == 10) {
    soundFX[10].play();
  }
  
    if (fromSerial == 11) {
    soundFX[11].play();
  }
  
    if (fromSerial == 12) {
    soundFX[12].play();
  }
  
    if (fromSerial == 13) {
    soundFX[13].play();
  }
  
    if (fromSerial == 14) {
    soundFX[14].play();
  }
  
    if (fromSerial == 15) {
    soundFX[15].play();
  }
  
    if (fromSerial == 16) {
    soundFX[16].play();
  }
  
    if (fromSerial == 17) {
    soundFX[17].play();
  }
  
    if (fromSerial == 18) {
    soundFX[18].play();
  }
  
    if (fromSerial == 19) {
    soundFX[19].play();
  }
  
    if (fromSerial == 20) {
    soundFX[20].play();
  }
  
    if (fromSerial == 21) {
    soundFX[21].play();
  }
  
    if (fromSerial == 22) {
    soundFX[22].play();
  }
  
    if (fromSerial == 23) {
    soundFX[23].play();
  }
  
    if (fromSerial == 24) {
    soundFX[24].play();
  }
  
    if (fromSerial == 25) {
    soundFX[25].play();
  }
  
    if (fromSerial == 26) {
    soundFX[26].play();
  }
  
    if (fromSerial == 27) {
    soundFX[27].play();
  }
  
    if (fromSerial == 28) {
    soundFX[28].play();
  }
  
    if (fromSerial == 29) {
    soundFX[29].play();
  }
  
    if (fromSerial == 30) {
    soundFX[30].play();
  }
  
    if (fromSerial == 31) {
    soundFX[31].play();
  }
  
    if (fromSerial == 32) {
    soundFX[32].play();
  }
  
    if (fromSerial == 33) {
    soundFX[33].play();
  }
  
    if (fromSerial == 34) {
    soundFX[34].play();
  }
  
    if (fromSerial == 35) {
    soundFX[35].play();
  }
  
    if (fromSerial == 36) {
    soundFX[36].play();
  }
  
  
  
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available()){
  byte byteFromSerial = Serial.read();
  analogWrite(3,byteFromSerial);
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3*/
let serial; // variable to hold an instance of the serialport library
let fromSerial = 0; //variable to hold the data


let data;
let story1;
let story2;
let story3;
let story4;
let story5;
let story6;
let story7;
let story8;
let story9;
let story10;
// let story11;
// let story12;
// let story13;
// let story14;
// let story15;
// let story16;
// let story17;
// let story18;
// let story19;
// let story20;
// let story21;
// let story22;
// let story23;
// let story24;
// let story25;
// let story26;
// let story27;
// let story28;
// let story29;
// let story30;
// let story31;
// let story32;
// let story33;
// let story34;
// let story35;
// let story36;


let soundFX;


 function preload(){
  data = loadSound('36_out_of_100.mp3');
  story1 = loadSound('story_1.mp3');
  story2 = loadSound('story_2.mp3');
  story3 = loadSound('story_3.mp3');
  story4 = loadSound('story_4.mp3');
  story5 = loadSound('story_5.mp3');
  story6 = loadSound('story_6.mp3');
  story7 = loadSound('story_7.mp3');
  story8 = loadSound('story_8.mp3');
  story9 = loadSound('story_9.mp3');
  story10 = loadSound('story_10.mp3');
  // story11 = loadSound('story_11.mp3');
  // story12 = loadSound('story_12.mp3');
  // story13 = loadSound('story_13.mp3');
  // story14 = loadSound('story_14.mp3');
  // story15 = loadSound('story_15.mp3');
  // story16 = loadSound('story_16.mp3');
  // story17 = loadSound('story_17.mp3');
  // story18 = loadSound('story_18.mp3');
  // story19 = loadSound('story_19.mp3');
  // story20 = loadSound('story_20.mp3');
  // story21 = loadSound('story_21.mp3');
  // story22 = loadSound('story_22.mp3');
  // story23 = loadSound('story_23.mp3');
  // story24 = loadSound('story_24.mp3');
  // story25 = loadSound('story_25.mp3');
  // story26 = loadSound('story_26.mp3');
  // story27 = loadSound('story_27.mp3');
  // story28 = loadSound('story_28.mp3');
  // story29 = loadSound('story_29.mp3');
  // story30 = loadSound('story_30.mp3');
  // story31 = loadSound('story_31.mp3');
  // story32 = loadSound('story_32.mp3');
  // story33 = loadSound('story_33.mp3');
  // story34 = loadSound('story_34.mp3');
  // story35 = loadSound('story_35.mp3');
  // story36 = loadSound('story_36.mp3');
 }

function setup() {
  createCanvas(1024, 768);
  soundFX = [data, story1, story2, story3, story4, story5, story6, story7, story8, story9, story10];
  soundFX[0].loop();
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1411"); // open a port
}

function draw() {
  background(0,0,0);

}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
  
  fromSerial = serial.read();
  console.log(fromSerial);

  
  if (fromSerial == 50) {
    for (let i = 0; i < soundFX.length; i++) {
    soundFX[i].stop();
  }
  }
  
  if (fromSerial == 1) {
    soundFX[1].play();
  }
  
    if (fromSerial == 2) {
    soundFX[2].play();
  }
  
    if (fromSerial == 3) {
    soundFX[3].play();
  }
  
    if (fromSerial == 4) {
    soundFX[4].play();
  }
  
    if (fromSerial == 5) {
    soundFX[5].play();
  }
  
    if (fromSerial == 6) {
    soundFX[6].play();
  }
  
    if (fromSerial == 7) {
    soundFX[7].play();
  }
  
    if (fromSerial == 8) {
    soundFX[8].play();
  }
  
    if (fromSerial == 9) {
    soundFX[9].play();
  }
  
    if (fromSerial == 10) {
    soundFX[10].play();
  }
  
//     if (fromSerial == 11) {
//     soundFX[11].play();
//   }
  
//     if (fromSerial == 12) {
//     soundFX[12].play();
//   }
  
//     if (fromSerial == 13) {
//     soundFX[13].play();
//   }
  
//     if (fromSerial == 14) {
//     soundFX[14].play();
//   }
  
//     if (fromSerial == 15) {
//     soundFX[15].play();
//   }
  
//     if (fromSerial == 16) {
//     soundFX[16].play();
//   }
  
//     if (fromSerial == 17) {
//     soundFX[17].play();
//   }
  
//     if (fromSerial == 18) {
//     soundFX[18].play();
//   }
  
//     if (fromSerial == 19) {
//     soundFX[19].play();
//   }
  
//     if (fromSerial == 20) {
//     soundFX[20].play();
//   }
  
//     if (fromSerial == 21) {
//     soundFX[21].play();
//   }
  
//     if (fromSerial == 22) {
//     soundFX[22].play();
//   }
  
//     if (fromSerial == 23) {
//     soundFX[23].play();
//   }
  
//     if (fromSerial == 24) {
//     soundFX[24].play();
//   }
  
//     if (fromSerial == 25) {
//     soundFX[25].play();
//   }
  
//     if (fromSerial == 26) {
//     soundFX[26].play();
//   }
  
//     if (fromSerial == 27) {
//     soundFX[27].play();
//   }
  
//     if (fromSerial == 28) {
//     soundFX[28].play();
//   }
  
//     if (fromSerial == 29) {
//     soundFX[29].play();
//   }
  
//     if (fromSerial == 30) {
//     soundFX[30].play();
//   }
  
//     if (fromSerial == 31) {
//     soundFX[31].play();
//   }
  
//     if (fromSerial == 32) {
//     soundFX[32].play();
//   }
  
//     if (fromSerial == 33) {
//     soundFX[33].play();
//   }
  
//     if (fromSerial == 34) {
//     soundFX[34].play();
//   }
  
//     if (fromSerial == 35) {
//     soundFX[35].play();
//   }
  
//     if (fromSerial == 36) {
//     soundFX[36].play();
//   }
  
  
  
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available()){
  byte byteFromSerial = Serial.read();
  analogWrite(3,byteFromSerial);
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3*/
let serial; // variable to hold an instance of the serialport library
let fromSerial = 0; //variable to hold the data


let data;
let story1;
let story2;
let story3;
let story4;
let story5;
let story6;
let story7;
let story8;
let story9;
let story10;
// let story11;
// let story12;
// let story13;
// let story14;
// let story15;
// let story16;
// let story17;
// let story18;
// let story19;
// let story20;
// let story21;
// let story22;
// let story23;
// let story24;
// let story25;
// let story26;
// let story27;
// let story28;
// let story29;
// let story30;
// let story31;
// let story32;
// let story33;
// let story34;
// let story35;
// let story36;


let soundFX;


 function preload(){
  data = loadSound('36_out_of_100.mp3');
  story1 = loadSound('story_1.mp3');
  story2 = loadSound('story_2.mp3');
  story3 = loadSound('story_3.mp3');
  story4 = loadSound('story_4.mp3');
  story5 = loadSound('story_5.mp3');
  story6 = loadSound('story_6.mp3');
  story7 = loadSound('story_7.mp3');
  story8 = loadSound('story_8.mp3');
  story9 = loadSound('story_9.mp3');
  story10 = loadSound('story_10.mp3');
  // story11 = loadSound('story_11.mp3');
  // story12 = loadSound('story_12.mp3');
  // story13 = loadSound('story_13.mp3');
  // story14 = loadSound('story_14.mp3');
  // story15 = loadSound('story_15.mp3');
  // story16 = loadSound('story_16.mp3');
  // story17 = loadSound('story_17.mp3');
  // story18 = loadSound('story_18.mp3');
  // story19 = loadSound('story_19.mp3');
  // story20 = loadSound('story_20.mp3');
  // story21 = loadSound('story_21.mp3');
  // story22 = loadSound('story_22.mp3');
  // story23 = loadSound('story_23.mp3');
  // story24 = loadSound('story_24.mp3');
  // story25 = loadSound('story_25.mp3');
  // story26 = loadSound('story_26.mp3');
  // story27 = loadSound('story_27.mp3');
  // story28 = loadSound('story_28.mp3');
  // story29 = loadSound('story_29.mp3');
  // story30 = loadSound('story_30.mp3');
  // story31 = loadSound('story_31.mp3');
  // story32 = loadSound('story_32.mp3');
  // story33 = loadSound('story_33.mp3');
  // story34 = loadSound('story_34.mp3');
  // story35 = loadSound('story_35.mp3');
  // story36 = loadSound('story_36.mp3');
 }

function setup() {
  createCanvas(1024, 768);
  soundFX = [data, story1, story2, story3, story4, story5, story6, story7, story8, story9, story10];
  soundFX[0].loop();
  // for (let i = 0; i < soundFX.length; i++) {
  //   console.log(i, soundFX[i]);
  //   soundFX[i].play();
  // }
  // console.log(soundFX);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1411"); // open a port
}

function draw() {
  background(0,0,0);

}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
  
  fromSerial = serial.read();
  console.log(fromSerial);
  
  if (fromSerial == 0) {
    soundFX[0].stop();
  }
  
  if (fromSerial == 50) {
    soundFX[1].stop();
    soundFX[2].stop();
    soundFX[3].stop();
    soundFX[4].stop();
    soundFX[5].stop();
    soundFX[6].stop();
    soundFX[7].stop();
    soundFX[8].stop();
    soundFX[9].stop();
    soundFX[10].stop();
  }
  
  if (fromSerial == 1) {
    soundFX[1].play();
  }
  
    if (fromSerial == 2) {
    soundFX[2].play();
  }
  
    if (fromSerial == 3) {
    soundFX[3].play();
  }
  
    if (fromSerial == 4) {
    soundFX[4].play();
  }
  
    if (fromSerial == 5) {
    soundFX[5].play();
  }
  
    if (fromSerial == 6) {
    soundFX[6].play();
  }
  
    if (fromSerial == 7) {
    soundFX[7].play();
  }
  
    if (fromSerial == 8) {
    soundFX[8].play();
  }
  
    if (fromSerial == 9) {
    soundFX[9].play();
  }
  
    if (fromSerial == 10) {
    soundFX[10].play();
  }
  
//     if (fromSerial == 11) {
//     soundFX[11].play();
//   }
  
//     if (fromSerial == 12) {
//     soundFX[12].play();
//   }
  
//     if (fromSerial == 13) {
//     soundFX[13].play();
//   }
  
//     if (fromSerial == 14) {
//     soundFX[14].play();
//   }
  
//     if (fromSerial == 15) {
//     soundFX[15].play();
//   }
  
//     if (fromSerial == 16) {
//     soundFX[16].play();
//   }
  
//     if (fromSerial == 17) {
//     soundFX[17].play();
//   }
  
//     if (fromSerial == 18) {
//     soundFX[18].play();
//   }
  
//     if (fromSerial == 19) {
//     soundFX[19].play();
//   }
  
//     if (fromSerial == 20) {
//     soundFX[20].play();
//   }
  
//     if (fromSerial == 21) {
//     soundFX[21].play();
//   }
  
//     if (fromSerial == 22) {
//     soundFX[22].play();
//   }
  
//     if (fromSerial == 23) {
//     soundFX[23].play();
//   }
  
//     if (fromSerial == 24) {
//     soundFX[24].play();
//   }
  
//     if (fromSerial == 25) {
//     soundFX[25].play();
//   }
  
//     if (fromSerial == 26) {
//     soundFX[26].play();
//   }
  
//     if (fromSerial == 27) {
//     soundFX[27].play();
//   }
  
//     if (fromSerial == 28) {
//     soundFX[28].play();
//   }
  
//     if (fromSerial == 29) {
//     soundFX[29].play();
//   }
  
//     if (fromSerial == 30) {
//     soundFX[30].play();
//   }
  
//     if (fromSerial == 31) {
//     soundFX[31].play();
//   }
  
//     if (fromSerial == 32) {
//     soundFX[32].play();
//   }
  
//     if (fromSerial == 33) {
//     soundFX[33].play();
//   }
  
//     if (fromSerial == 34) {
//     soundFX[34].play();
//   }
  
//     if (fromSerial == 35) {
//     soundFX[35].play();
//   }
  
//     if (fromSerial == 36) {
//     soundFX[36].play();
//   }
  
  
  
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available()){
  byte byteFromSerial = Serial.read();
  analogWrite(3,byteFromSerial);
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3

move mouseX to dim LED*/
let serial; // variable to hold an instance of the serialport library
let fromSerial = 0; //variable to hold the data
let side = 600;
let buttonValue=0;


let mySound;
let mySound1;


let soundFX;


 function preload(){
  mySound = loadSound('36_out_of_100.mp3');
  mySound1 = loadSound('story_1.mp3');
  // mySound2 = loadSound('diabetes.mp3');
  // mySound3 = loadSound('laugh1.mp3');
  // mySound4 = loadSound('laugh2.mp3');
  // mySound5 = loadSound('noNoNo.mp3');
 }

function setup() {
  createCanvas(1024, 768);
  soundFX = [mySound, mySound1];
  // for (let i = 0; i < soundFX.length; i++) {
  //   console.log(i, soundFX[i]);
  //   soundFX[i].play();
  // }
  // console.log(soundFX);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1411"); // open a port
}

function draw() {
  background(0,0,0);

}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
  
  fromSerial = serial.read();
  console.log(fromSerial);
  if (fromSerial == 1) {
    soundFX[0].play();
  }
  
//   if (fromSerial == 1) {
//     soundFX[1].play();
//   }
  
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available()){
  byte byteFromSerial = Serial.read();
  analogWrite(3,byteFromSerial);
  }
}
*/let data;
let img1;
let img2;
let img3;
let img4;
let img5;
let img6;
let img7;
let img8;
let img9;
let img10;
let img11;
let img12;
let img13;

let images;
let randomImages;


function preload(){
  data=loadJSON("tweets.json");
  img1=loadImage("1");
  img2=loadImage("2");
  img3=loadImage("3");
  img4=loadImage("4");
  img5=loadImage("5");
  img6=loadImage("6");
  img7=loadImage("7");
  img8=loadImage("8");
  img9=loadImage("9");
  img10=loadImage("10");
  img11=loadImage("11");
  img12=loadImage("12");
  img13=loadImage("13");
}

function setup() {
  createCanvas(400, 400);
  images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13];
  mousePressed();
}

function gotData(data) {
 	for (let i = 0; i < data.length; i++) {
    text(data[i].tweet,20,20);
  }
}

function mousePressed() {
  if (mouseX < width && mouseY < height);
  let randomImages = Math.floor(random(0, images.length));
    console.log("NUM: "+randomImages, images);
    image(images[randomImages], 0, 0);
   }

function draw() {
  background(220);
}let data;
let img1;
let img2;
let img3;
let img4;
let img5;
let img6;
let img7;
let img8;
let img9;
let img10;
let img11;
let img12;
let img13;
let img14;

function preload(){
  data=loadJSON("kk_tweets.json");
  // img1=loadImage(
}

function setup() {
  createCanvas(400, 400);
  
  
  console.log(JSON.stringify(data,null,null));
  
     let txt = data.text;
     let id = data.id;
  
 	  for (let i = 0; i < text.length; i++) {
      text(txt[i].text,20,20);
    }
      
  	  // rectMode(CENTER);
  	  // noStroke();
  	  // fill (255,57,95);
  	  // rect(60+50*i, 200, 20, fact[i].Value*3);
}

function draw() {
  background(220);
}let video;

function setup() {
  createCanvas(400, 400);
  
  video = createCapture(VIDEO);
  video.hide();
}

function draw() {
  background(220);
  image(video, 0,0,width, height);
  loadPixels();
  let mostRedX = 0;
  let mostRedY = 0;
  let mostRed= 0;
  
  for(let y = 0; y < height; y++){
    for( let x = 0; x < width; x++){
      var currentRed = pixels[4*(y*width + x)];
      var currentGreen = pixels[4*(y*width + x)+1];
      var currentBlue = pixels[4*(y*width + x)+2];
      
      if (currentRed > mostRed){
        mostRedX=x;
        mostRedY = y;
        mostRed = currentRed;
      }
      
      //set(x,y, [currentBlue, currentGreen, currentRed, 255]);
      
      
      
    }
                          
}
  updatePixels();
    ellipse( mostRedX, mostRedY, 50);
}let mySound;
let button;
let amp;

function preload(){
  mySound = loadSound('What_It_Is.mp3');
  
}

function setup() {
  createCanvas(600, 580);
  button= createButton ("play");
  button.mousePressed(togglePlaying);
  colorMode(HSB, 360, 100, 100, 100);
  amp = new p5.Amplitude();

}

function togglePlaying(){
  if (!mySound.isPlaying()){
     mySound.play();
     mySound.setVolume(0.3);
    button.html("pause");
  } else {
    mySound.pause();
    button.html("play");
  }
}

function draw() {
  var vol = amp.getLevel ();
  console.log(vol);
  background(225, 0, 0, 40);
  
  let sinVal=sin(radians(frameCount));

  let freq = 4;
  let speed = 1;
  let ampl = 40;
  
  for(let i = 0; i < width; i += 5){
    
    let y = sin(radians(i + frameCount * speed)*freq) * vol *400;
    
    // let absY = abs(y);
    
    let dia = map(y,-vol *100, vol *400, 10, 3);
    noStroke();
    fill((sin(radians(frameCount))*122 + 123),100,100, 50);
    ellipse(i, height / 2 + y, dia*2 , dia*2);
    ellipse(i, height / 3 + y, dia/2 , dia/2);
    ellipse(i, height - height /3 + y, dia/2 , dia/2);
    
    let x = sin(radians(i + frameCount * speed)*freq) * vol *400;
    
    ellipse(i, height / 6 + x, dia , dia);
    ellipse(i, height - height/6 + x, dia , dia);
    //ellipse(i, height - height /6 + x, dia , dia);
    
    
  }
}let mySound;
let button;
let amp;

function preload(){
  mySound = loadSound('What_It_Is.mp3');
  
}

function setup() {
  createCanvas(600, 580);
  button= createButton ("play");
  button.mousePressed(togglePlaying);
  colorMode(HSB, 360, 100, 100, 100);
  amp = new p5.Amplitude();

}

function togglePlaying(){
  if (!mySound.isPlaying()){
     mySound.play();
     mySound.setVolume(0.3);
    button.html("pause");
  } else {
    mySound.pause();
    button.html("play");
  }
}

function draw() {
  var vol = amp.getLevel ();
  console.log(vol);
  background(0, 50);
  
  let sinVal=sin(radians(frameCount));

  let freq = 3;
  let speed = 0.4;
  let ampl = 40;
  
  for(let i = 0; i < width; i += 5){
    
    let y = sin(radians(i + frameCount * speed)*freq) * ampl;
    
    // let absY = abs(y);
    
    let dia = map(y,-ampl, ampl, 10, 3);
    noStroke();
    fill((sin(radians(frameCount))*122 + 123),100,100, 50);
    ellipse(i, height / 2 + y, dia*3 , dia*3);
    ellipse(i, height / 4 + y, dia , dia);
    ellipse(i, height - height /4 + y, dia , dia);
    
    let x = sin(radians(i + frameCount * speed)*freq) * ampl;
    
    ellipse(i, height / 8 + x, dia*2 , dia*2);
    ellipse(i, height - height/8 + x, dia*2 , dia*2);
    //ellipse(i, height - height /6 + x, dia , dia);
    
  }
}function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100, 100);

}

function draw() {
  background(220);
  
  let sinVal=sin(radians(frameCount));
  
  //ellipse(width /2, height /2, sinVal *50 + 50,sinVal*50 +50);
  
  //print(sinVal);
  
//   for(let i = 0; i < width; i += 5){
    
//     let y = sin(radians(i + frameCount)) * 50;
//     ellipse(i, height / 2 + y, 5 , 5);
//   }
  
//     for(let i = 0; i < width; i += 5){
    
//     let y = sin(radians(i + frameCount)) * 150;
//     ellipse(i, height / 2 + y, 5 , 5);
//   }
  
  // let freq = cos(radians(frameCount))*10;
//   let freq = 3;
//   let speed = 0.5;
//   let amp = sin (radians(frameCount))*20;
  
  
//   for(let i = 0; i < width; i += 5){
    
//     let y = sin(radians(i + frameCount * speed)*freq) * amp;
    
//     let absY = abs(y);
    
//     let dia = map(y,-amp, amp, 10, 3);
    
//     ellipse(i, height / 2 + absY, dia , dia);
//     ellipse(i, height / 4 + y, 5 , 5);
  
  
  fill((sin(radians(frameCount))*122 + 123),100,100);
  ellipse(width/2, height/2, 100, 100);
  
//   line (0, height/2, width, height/2);
//   line (0, height /4, width, height/4);
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  let sinVal=sin(radians(frameCount));
  
  //ellipse(width /2, height /2, sinVal *50 + 50,sinVal*50 +50);
  
  //print(sinVal);
  
//   for(let i = 0; i < width; i += 5){
    
//     let y = sin(radians(i + frameCount)) * 50;
//     ellipse(i, height / 2 + y, 5 , 5);
//   }
  
//     for(let i = 0; i < width; i += 5){
    
//     let y = sin(radians(i + frameCount)) * 150;
//     ellipse(i, height / 2 + y, 5 , 5);
//   }
  
  // let freq = cos(radians(frameCount))*10;
  let freq = 3;
  let speed = 0.5;
  let amp = sin (radians(frameCount))*20;
  
  
  for(let i = 0; i < width; i += 5){
    
    let y = sin(radians(i + frameCount * speed)*freq) * amp;
    
    let absY = abs(y);
    
    let dia = map(y,-amp, amp, 10, 3);
    
    ellipse(i, height / 2 + absY, dia , dia);
    ellipse(i, height / 4 + y, 5 , 5);
  }
  
//   line (0, height/2, width, height/2);
//   line (0, height /4, width, height/4);
}let data;

function preload(){
  data=   loadJSON("birth.json");
  data2= loadJSON("coverage.json");
}
  
  function setup() {

  createCanvas(600, 600);
    
  ellipseMode(CENTER);
  fill(255,57,95);
  noStroke();
  ellipse(80,395,15,15);
  noStroke();
  fill(55,255,250);
  ellipse(280,395,15,15);

  console.log(JSON.stringify(data,null,null));
      
    let fact = data.fact;
 	  for (let i = 0; i < fact.length; i++) {
      rectMode(CENTER);
      noStroke();
      fill (255,57,95);
  	  rect(60+50*i, 200, 20, fact[i].Value*3);
      //console.log(fact[i].Value);
    
      let dims = fact[i].dims;
    
      for (let j = 0; j < dims.length; j++) {
      //createElement ("h1", dims[j].REGION);
        text(dims[j].REGION,20,20);
    }
    }
      
    let fact2 = data2.fact2;
 	  for (let i = 0; i < fact2.length; i++) {
      rectMode(CENTER);
      noStroke();
      fill (55,255,250);
  	  //rect(random(width), random(height), 20, fact2[i].Value);
      rect(80+50*i, 200, 20, fact2[i].Value*3);
      console.log(fact2[i].Value);
    
      let dims = fact2[i].dims;
    
      for (let j = 0; j < dims.length; j++) {
      //createElement ("h1", dims[j].REGION);
        fill(255);
        text(dims[j].REGION,50 ,300);
        textSize(12);
        //text('word', 10, 30);
 
    }
   }

  }

// function gotData(birth) {
//   //let birth = data.birth;
//  	for (let i = 0; i < birth.length; i++) {
//   	ellipse(random(width), random(height), fact[i].Value);
//     console.log(birth[i].Value);
    
//     let dims = fact[i].dims;
    
//     for (let j = 0; j < dims.length; j++) {
//     createElement ("h1", dims[j].REGION);
//     }
//   }


function draw() {
  //background(255);
  fill (255);
  textSize(18);
  text("Adolescent birth rate vs Access to Health by Region",10,30);
  textSize(12);
  text("Adolescent birth rate",100,400);
  text("Access to Health",300,400);

  
}/* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3

move mouseX to dim LED*/
let serial; // variable to hold an instance of the serialport library
let fromSerial = 0; //variable to hold the data
let side = 600;
let buttonValue=0;


let mySound;
let mySound1;
let mySound2;
let mySound3;
let mySound4;
let mySound5;

let soundFX;
let randomSFX;

let bg;

 function preload(){
  mySound = loadSound('stopEating.mp3');
  mySound1 = loadSound('cavityTime.mp3');
  mySound2 = loadSound('diabetes.mp3');
  mySound3 = loadSound('laugh1.mp3');
  mySound4 = loadSound('laugh2.mp3');
  mySound5 = loadSound('noNoNo.mp3');
 }

function setup() {
  bg = loadImage("candyv5.png");
  createCanvas(1024, 768);
  //soundFormats('mp3');
  // x. y -> x.y 
  soundFX = [mySound, mySound1, mySound2, mySound3, mySound4, mySound5];
  // for (let i = 0; i < soundFX.length; i++) {
  //   console.log(i, soundFX[i]);
  //   soundFX[i].play();
  // }
  // console.log(soundFX);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1421"); // open a port
  
	 mousePressed();
}

function draw() {
  background(bg);
  rectMode(CENTER);
  fill(255,0,0,0);
  noStroke();
  rect(1020/2, 1188/2,1400/2,725/2);
}

function mousePressed() {
   if (mouseY > 820/2 && mouseX > 320/2 && mouseX < 1730/2){
    buttonValue = 120
    }else {
    buttonValue = 10
    }
    serial.write(buttonValue);
  console.log(buttonValue);
}


// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
  
  fromSerial = serial.read();
console.log(fromSerial);
  if (fromSerial == 0) {
    let randomSFX = Math.floor(random(0, soundFX.length));
    console.log("NUM: "+randomSFX, soundFX);
    soundFX[randomSFX].play();
    // mySound.play();

  }
  
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available()){
  byte byteFromSerial = Serial.read();
  analogWrite(3,byteFromSerial);
  }
}
*/let data;

function preload(){
  data=   loadJSON("birth.json");
  data2= loadJSON("coverage.json");
}
  
  function setup() {

  createCanvas(600, 600);

  console.log(JSON.stringify(data,null,null));
      
    let fact = data.fact;
 	  for (let i = 0; i < fact.length; i++) {
      rectMode(CENTER);
      noStroke();
      fill (0,0,255,90);
  	  rect(50+50*i, 100, 20, fact[i].Value);
      //console.log(fact[i].Value);
    
      let dims = fact[i].dims;
    
      for (let j = 0; j < dims.length; j++) {
      //createElement ("h1", dims[j].REGION);
        text(dims[j].REGION,20,20);
    }
    }
      
    let fact2 = data2.fact2;
 	  for (let i = 0; i < fact2.length; i++) {
      rectMode(CENTER);
      noStroke();
      fill (255,0,0,90);
  	  //rect(random(width), random(height), 20, fact2[i].Value);
      rect(50+50*i, 100, 20, fact2[i].Value);
      console.log(fact2[i].Value);
    
      let dims = fact2[i].dims;
    
      for (let j = 0; j < dims.length; j++) {
      //createElement ("h1", dims[j].REGION);
        fill(255);
        text(dims[j].REGION,20,20);
        textSize(32);
        //text('word', 10, 30);
 
    }
   }

  }

// function gotData(birth) {
//   //let birth = data.birth;
//  	for (let i = 0; i < birth.length; i++) {
//   	ellipse(random(width), random(height), fact[i].Value);
//     console.log(birth[i].Value);
    
//     let dims = fact[i].dims;
    
//     for (let j = 0; j < dims.length; j++) {
//     createElement ("h1", dims[j].REGION);
//     }
//   }


function draw() {
  //background(255);
  fill (255);
  textSize(15);
  text("Adolescent birth rate vs Access to Health by Region",20,20);
}// API Key c061a490098848d3b6e1ddc8efe48f10
// http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=d21e79452f4461671f1ccf2a209d48c3&units=imperial
// http://developer.nytimes.com/article_search_v2.json#/Documentation/GET/articlesearch.json

let baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
let apiKey = "c061a490098848d3b6e1ddc8efe48f10";
let urls = [];
let snnipets = [];
let input;

function setup() {
  createCanvas(800,500);
  // input = createInput();
  // input.value("NYU");
  // input.position(20,20);
  // let button = createButton("search");
  // button.position(180,20);
  // button.mousePressed(search);
  //let url = baseUrl + "?api-key=" + apiKey + "&q" + query; 
  let query = "sexual harassment";
  let startDate= `20171001`;
  let endDate= `20181001`;
  let url = `${baseUrl}?api-key=${apiKey}&q=${query}&begin_date=${startDate}&end_date=${endDate}`;
  // console.log(url);
  loadJSON(url, gotData);
  
}

function gotData(data){

  let res = data.response.docs;
  for (let i=0; i<res.length; i++){
    const url = res[i].web_url;
    const title = res[i].snippet;
    urls.push(url);
    snnipets.push(title);
}
    console.log(urls);
    console.log(snnipets);
    showArticles();

}

function showArticles(){
  background(0);
  const fontsize=0;
  background (0);
  
  textSize(fontsize);
  for( let i = 0; i<titles.length; i++){
    const dispText= titles[i] + "/n" + urls[i]
    fill(255);
    text(dispText,10, i*40 + 80);
  }
}

function draw(){
  background (0);
}let data;

function preload(){
  data=   loadJSON("birth.json");
}
  
  function setup() {
  //noCanvas();
  createCanvas(400, 400);
  //loadJSON("birth.json", gotData);

  console.log(JSON.stringify(data,null,null));
      
    let fact = data.fact;
 	  for (let i = 0; i < fact.length; i++) {
      rectMode(CENTER);
  	  rect(random(width), random(height), fact[i].Value, fact[i].Value);
      console.log(fact[i].Value);
    
      let dims = fact[i].dims;
    
      for (let j = 0; j < dims.length; j++) {
      //createElement ("h1", dims[j].REGION);
        text(dims[j].REGION,20,20);
    }
   }
}

// function gotData(birth) {
//   //let birth = data.birth;
//  	for (let i = 0; i < birth.length; i++) {
//   	ellipse(random(width), random(height), fact[i].Value);
//     console.log(birth[i].Value);
    
//     let dims = fact[i].dims;
    
//     for (let j = 0; j < dims.length; j++) {
//     createElement ("h1", dims[j].REGION);
//     }
//   }


function draw() {
  //background(220);
}// API Key c061a490098848d3b6e1ddc8efe48f10
// http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=d21e79452f4461671f1ccf2a209d48c3&units=imperial
// http://developer.nytimes.com/article_search_v2.json#/Documentation/GET/articlesearch.json

let txt;
let button;

function setup() {
  createCanvas(400, 400);
  
  txt = select("#text");
  
  button = select("#button");
  button.mousePressed(loadIt);
  
}

function loadIt() {
  console.log(txt.value());
  loadJSON("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=sexual%20harassment&begin_date=20171001&end_date=20181001&api-key=c061a490098848d3b6e1ddc8efe48f10", drawWeather);
}

function drawWeather(data) {
 	//console.log(data); 
  console.log(data.main.temp);
  setTimeout(loadIt, 5000);
}

function draw() {
  background(220);
}/* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3

move mouseX to dim LED*/
let serial; // variable to hold an instance of the serialport library
let fromSerial = 0; //variable to hold the data
let side = 600;
let buttonValue=0;


let mySound;
let mySound1;
let mySound2;
let mySound3;
let mySound4;
let mySound5;

let soundFX;
let randomSFX;

 function preload(){
  mySound = loadSound('stopEating.mp3');
  mySound1 = loadSound('cavityTime.mp3');
  mySound2 = loadSound('diabetes.mp3');
  mySound3 = loadSound('laugh1.mp3');
  mySound4 = loadSound('laugh2.mp3');
  mySound5 = loadSound('noNoNo.mp3');
 }

function setup() {
  createCanvas(side, side);
  //soundFormats('mp3');
  soundFX = [mySound, mySound1, mySound2, mySound3, mySound4, mySound5];
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1421"); // open a port
  
  mousePressed();
  

}


function draw() {
  background(0,0,0);
  rectMode(CENTER);
  fill(255,0,0);
  rect(side/2, side/2,300,300);
  

  
}

function mousePressed() {
   if (mouseY > 150 && mouseY < 450 && mouseX > 150 && mouseX < 450){
          // mySound.play();
          buttonValue = 180
    }else {
    buttonValue = 0
    }
    serial.write(buttonValue);

}


// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
  
  fromSerial = serial.read();

  if (fromSerial == 0) {
    randomSFX = Math.floor(random(0, soundFX.length));
    console.log("NUM: "+randomSFX);
    soundFX[randomSFX].play();
    // mySound.play();

  }
  
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available()){
  byte byteFromSerial = Serial.read();
  analogWrite(3,byteFromSerial);
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3

move mouseX to dim LED*/
let serial; // variable to hold an instance of the serialport library
let fromSerial = 0; //variable to hold the data
let side = 600;
let buttonValue=0;

let mySound;
// let mySound1;
// let mySound2;
// let mySound3;
// let mySound4;
// let mySound5;

// let soundFX;

// let randomSFX;
 function preload(){
   mySound = loadSound('stopEating.mp3');
//   mySound1 = loadSound('cavityTime.mp3');
//   mySound2 = loadSound('diabetes.mp3');
//   mySound3 = loadSound('laugh1.mp3');
//   mySound4 = loadSound('laugh2.mp3');
//   mySound5 = loadSound('noNoNo.mp3');
 }

function setup() {
  createCanvas(side, side);
  // soundFormats('mp3');
  // soundFX = [mySound, mySound1, mySound2, mySound3. mySound4, mySound5];
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1421"); // open a port
  
  mousePressed();
  

}


function draw() {
  background(0,0,0);
  rectMode(CENTER);
  fill(255,0,0);
  rect(side/2, side/2,300,300);
  

  
}

function mousePressed() {
   if (mouseY > 150 && mouseY < 450 && mouseX > 150 && mouseX < 450){
          mySound.play();
          buttonValue = 179
    }else {
    buttonValue = 0
    }
    serial.write(buttonValue);

}


// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
  fromSerial = serial.read();
  
  // if (fromSerial == 0) {
  // randomSFX = random(0, soundFX.length);
  // soundFX[randomSFX].play();
  // }
  
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available()){
  byte byteFromSerial = Serial.read();
  analogWrite(3,byteFromSerial);
  }
}
*/let data;

function preload(){
  data=   loadJSON("birth.json");
}
  
  function setup() {
  //noCanvas();
  createCanvas(400, 400);
  //loadJSON("birth.json", gotData);

  console.log(JSON.stringify(data,null,null));
      
    let fact = data.fact;
 	  for (let i = 0; i < fact.length; i++) {
      rectMode(CENTER);
  	  rect(random(width), random(height), fact[i].Value, fact[i].Value);
      console.log(fact[i].Value);
    
      let dims = fact[i].dims;
    
      for (let j = 0; j < dims.length; j++) {
      createElement ("h1", dims[j].REGION);
    }
   }
}

// function gotData(birth) {
//   //let birth = data.birth;
//  	for (let i = 0; i < birth.length; i++) {
//   	ellipse(random(width), random(height), fact[i].Value);
//     console.log(birth[i].Value);
    
//     let dims = fact[i].dims;
    
//     for (let j = 0; j < dims.length; j++) {
//     createElement ("h1", dims[j].REGION);
//     }
//   }


function draw() {
  //background(220);
}/* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3

move mouseX to dim LED*/
var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data
let side = 600;
var buttonValue = 0;

function setup() {
  createCanvas(side, side);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1421"); // open a port
  mouseDragged();

}

function draw() {
  background(0,0,0);
  rectMode(CENTER);
  fill(255,0,0);
  rect(side/2, side/2,300,300);
  // serial.write(buttonValue);   // sends as byte unles iyts a string
  
    // if (mouseY > 150 && mouseY < 450 && mouseX > 150 && mouseX < 450){
    // if (mouseIsPressed) {
    //   //background(255);
    // buttonValue = 179
    // console.log(buttonValue); 
    // }else {
    //     buttonValue = 0
    // }
}

function mouseDragged(){
  if (mouseY > 150 && mouseY < 450 && mouseX > 150 && mouseX < 450) {
      //background(255);
    buttonValue = 179
    }else {
        buttonValue = 0 
    }
    console.log(buttonValue);
    serial.write(buttonValue); 

}
 

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
    // serial.write(buttonValue); 
  // this is called when data is recieved	
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available()){
  byte byteFromSerial = Serial.read();
  analogWrite(3,byteFromSerial);
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3

move mouseX to dim LED*/
let serial; // variable to hold an instance of the serialport library
let fromSerial = 0; //variable to hold the data
let side = 600;
let buttonValue=0;

function setup() {
  createCanvas(side, side);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1421"); // open a port
}

function draw() {
  background(0,0,0);
  rectMode(CENTER);
  fill(255,0,0);
  rect(side/2, side/2,300,300);
  //mousePressed();
  serial.write(buttonValue);   // sends as byte unles iyts a string
  
    if (mouseY > 150 && mouseY < 450 && mouseX > 150 && mouseX < 450){
    if (mouseIsPressed) {
      //background(255);
    buttonValue = 179
    console.log(buttonValue); 
    }else {
        buttonValue = 0
    }
  
 }
}
 

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available()){
  byte byteFromSerial = Serial.read();
  analogWrite(3,byteFromSerial);
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3

move mouseX to dim LED*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data
let slider;
let side = 600;
let padding = 50 // Consistent number for padding
let white = 255; //Potentially change to HSB color
let black = 0;


function setup() {
  createCanvas(side, side);
  slider = padding  
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1421"); // open a port
}

function draw() {
  sliderC = map( slider, padding, width-padding, black, white); // change colors
  sliderS = map( slider, padding, width-padding, 0, 20); //map position in x
  background(sliderC);
  rectMode(CENTER);
  fill(255,0,0);
  rect(width/2, height/2,300,300);
  mappedMouse= map(sliderC, black,white,0,179);
  serial.write(mappedMouse);   // sends as byte unles iyts a string
  background(0,0,0);
  
  stroke (map(sliderC, black, white, white, black)); //map the color backwards  
  line( padding, height-padding, width-padding, height-padding) //draw slider line
  fill (255);
  ellipseMode (CENTER);
  ellipse (slider, height-padding, 20,20);
 
  // Define conditions for slider
  
  if (mouseIsPressed && mouseY >= height-padding-10 && mouseY <= height-padding + 10) {
    if (mouseX >= padding && mouseX <= width-padding ) {
    slider = mouseX
    }
  }
}

// function mousePressed(){
//   if (mouseX>250 && mouseX



// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available()){
  byte byteFromSerial = Serial.read();
  analogWrite(3,byteFromSerial);
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3

move mouseX to dim LED*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data



function setup() {
  createCanvas(600, 600);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1421"); // open a port
}

function draw() {
  background(0,0,0);
  rectMode(CENTER);
  fill(255,0,0);
  rect(width/2, height/2,300,300);
  mappedMouse= map(mouseX, 0,600,0,179);
  serial.write(mappedMouse);   // sends as byte unles iyts a string
}

function mousePressed(){
  if (mouseX>250 && mouseX



// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available()){
  byte byteFromSerial = Serial.read();
  analogWrite(3,byteFromSerial);
  }
}
*/let lines = [];
let i =0;

function setup() {
  createCanvas(400, 400);
  
  loadStrings("lines.txt", doText);
}

function doText(data) {
  lines = data;

}
  
function draw() {
    background(220);
  
    // for (let i=0 ; i<lines.length; i++) {
    text(lines[i],5,20*i+20);
  // }
}

function mousePressed() {
  i++;
  console.log(lines[i]);

}function setup() {
  createCanvas(400, 400);
  setTimeout(drawSomething,500);
}
 
function draw() {
  //background(220);
}

function drawSomething(){
  ellipse(width/2,height/2,50,50);
  
}
 /* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send 2 values as ascii from P5 to arduino
See arduino code in bottom, have LED connected to pin 3 and 5

move mouseX to dim LED*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data

function setup() {
  createCanvas(255, 255);
}

function draw() {
	background(0,0,255);
								// this adds a linefeed in end (ascii 10)
}

function MousePressed(){
  serial.write("\n");
}
               
// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
  serial.read(); //Read the 0
  var firstValueToSend = mouseX;
  var secondValueToSend = mouseY;
  serial.write(firstValueToSend + ","); // this makes it a string and adds a comma
  serial.write(secondValueToSend +","); // this makes it a string and adds a comma
  serial.write("\n" ); 
}

/*  
// Arduino Code 

void setup() {
  Serial.begin(9600);
}
void loop() {
  if (Serial.available()) {
    String fromSerial = Serial.readStringUntil('\n');               // read until you see a \n 
    int firstValueEnd = fromSerial.indexOf(',');                    // find the first comma and tell me how deep into the string it is
    String firstValueString = fromSerial.substring(0,firstValueEnd);// give me a new string that includes everything till the first comma
    int firstValue= firstValueString.toInt();                       // give me the int interpretation of that string 
    analogWrite(3, firstValue);

    int secondValueEnd = fromSerial.indexOf(',',firstValueEnd+1);                     // search for the second comma, start searching after the first one
    String secondValueString = fromSerial.substring(firstValueEnd+1,secondValueEnd);   //give me a new string with everything beween first and second comma
    int secondValue= secondValueString.toInt();                                       // give me the int interpretation of that string 
    analogWrite(5, secondValue);   
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send 2 values as ascii from P5 to arduino
See arduino code in bottom, have LED connected to pin 3 and 5

move mouseX to dim LED*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data

function setup() {
  createCanvas(255, 255);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1421"); // open a port
}

function draw() {
	background(0,0,255);
  var firstValueToSend = mouseX;
  var secondValueToSend = mouseY;
  serial.write(firstValueToSend + ","); // this makes it a string and adds a comma
  serial.write(secondValueToSend +","); // this makes it a string and adds a comma
  serial.write("\n" ); 								// this adds a linefeed in end (ascii 10)
}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
}

/*  
// Arduino Code 

void setup() {
  Serial.begin(9600);
}
void loop() {
  if (Serial.available()) {
    String fromSerial = Serial.readStringUntil('\n');               // read until you see a \n 
    int firstValueEnd = fromSerial.indexOf(',');                    // find the first comma and tell me how deep into the string it is
    String firstValueString = fromSerial.substring(0,firstValueEnd);// give me a new string that includes everything till the first comma
    int firstValue= firstValueString.toInt();                       // give me the int interpretation of that string 
    analogWrite(3, firstValue);

    int secondValueEnd = fromSerial.indexOf(',',firstValueEnd+1);                     // search for the second comma, start searching after the first one
    String secondValueString = fromSerial.substring(firstValueEnd+1,secondValueEnd);   //give me a new string with everything beween first and second comma
    int secondValue= secondValueString.toInt();                                       // give me the int interpretation of that string 
    analogWrite(5, secondValue);   
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send 2 values in ascii from arduino to P5
See arduino code in bottom, have pots connected to A0 and A1*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0,fromSerial2 = 0; //variable to hold the data

function setup() {
  createCanvas(320, 240);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem14111"); // open a port
}

function draw() {
  // do your drawing stuff here
  ellipse(fromSerial, fromSerial2, 5, 5);
}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved, data will then live in fromSerial	
  var stringFromSerial = serial.readLine();    // reads everything till the new line charecter
  if (stringFromSerial.length > 0) {             // is the something there ?
    var trimmedString = trim(stringFromSerial);  // get rid of all white space
    var myArray = split(trimmedString, ",")      // splits the string into an array on commas
    fromSerial = Number(myArray[0]);             // get the first item in the array and turn into integer
    fromSerial2 = Number(myArray[1]); 					 // get the second item in the array and turn into integer
  }
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  int valueToSend = analogRead(A0)/4;
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = analogRead(A1)/4;
  Serial.println(valueToSend);
  delay (10);
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from arduino to P5
See arduino code in bottom, have pot connected to A0*/

let serial; // variable to hold an instance of the serialport library
let fromSerial = 0; //variable to hold the data
let cylinders = [];
let thediv;
let theotherdiv;
let h1;
let myButton;

function setup() {
  myButton=createButton("Generate new cylinder");
  myButton.mousePressed(myButtonCallback);
  createDiv('');
  // div.center();
  createCanvas(600, 600, WEBGL);
	serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	serial.on('list', printList); // callback function for serialport list event
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbmodem1421"); // open a port
  
}

function myButtonCallback(){
  myButton.style("color","purple");
  // myButton.alert("This is annoying button");
  alert("Congratulations: You added a cylinder to the array!");
}

function draw() {
  camX=map(fromSerial,0,255,600,-600);
  camera( 700,0,((height/2)/tan(PI/6)),camX,0,0,0,1,0);
  background(0);
  
  for ( let i = 0; i< cylinders.length; i++){
    cylinders[i].display ();
  }
}

function mousePressed () {
  let p = new Cylinder (10 ,random(50,1000));
  cylinders.push(p);
}

class Cylinder{
  constructor(xx, yy, rr){
    this.x=xx;
    this.y=yy;
    this.r=rr
  }
  
  display(){
    directionalLight(0,219,255,1,1,0);
    directionalLight(0,19,255,-1,-1,0);
    directionalLight(0,255,103,-1,1,0);
    directionalLight(192,0,255,1,-1,0);
    specularMaterial(255);
    translate(fromSerial,fromSerial);
    rotateX(fromSerial/200);
    cylinder(this.x + (fromSerial/2), this.y + (fromSerial/2));
  }

}
  

// get the list of ports:
function printList(portList) {
	for (var i = 0; i < portList.length; i++) {
		// Display the list the console:
		println(i + " " + portList[i]);
	}
}

function serialEvent() {
	// this is called when data is recieved, data will then live in fromSerial	
	fromSerial = serial.read();
}


/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  int analogValue = analogRead(A0);
  byte byteToSend = map (analogValue, 0, 1023, 0, 255);
  Serial.write(byteToSend);
  delay(50);
}
*/let thediv;
let theotherdiv;
let h1;

function setup() {
  createCanvas(400, 400);
  theotherdiv=createDiv("Here is the initial text");
  
  thediv = select("#thediv");
  thediv.html("Here is new text");
  
  h1= createElement("h1", "Here is a headline");
  h1.mousePressed(h1Callback);
  
  two = select("#two");
}

function h1Callback(){
  h1.style("color","green");
  alert("Hey stop");
}

function draw() {
  background(220);
}

function mousePressed(){
  thediv.html("Here is some new text");
  two.html("New Stuff");
}/* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from arduino to P5
See arduino code in bottom, have pot connected to A0*/

let serial; // variable to hold an instance of the serialport library
let fromSerial = 0; //variable to hold the data
let cylinders = [];

function setup() {
	createCanvas(600, 600, WEBGL);
	serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	serial.on('list', printList); // callback function for serialport list event
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbmodem1421"); // open a port
}

function draw() {
  camX=map(fromSerial,0,255,600,-600);
  camera( 700,0,((height/2)/tan(PI/6)),camX,0,0,0,1,0);
  background(0);
  
  for ( let i = 0; i< cylinders.length; i++){
    cylinders[i].display ();
    //planes[i].move ();
    //planes[i].mousePressed ();
  }
  // colorMode(HSB,360,100,100,100);
  //myColor = map(fromSerial,0,255,0,360);
  // fill(fromSerial,100,100);
}

function mousePressed () {
  let p = new Cylinder (10 ,random(50,1000));
  cylinders.push(p);
    // push(); 
    // translate(fromSerial*2,fromSerial*2);
    // rotateX(frameCount/100);
    // rotateY(frameCount/100);
    // rotateZ(frameCount/100);
    // pop();
  
}

class Cylinder{
  constructor(xx, yy, rr){
    this.x=xx;
    this.y=yy;
    this.r=rr
  }
  
  display(){
    directionalLight(0,219,255,1,1,0);
    directionalLight(0,19,255,-1,-1,0);
    directionalLight(0,255,103,-1,1,0);
    directionalLight(192,0,255,1,-1,0);
    specularMaterial(255);
    translate(fromSerial,fromSerial);
    rotateX(fromSerial/200);
    cylinder(this.x + (fromSerial/2), this.y + (fromSerial/2));
  }
  
  // move(){
  //   push(); 
  //   //translate(fromSerial,fromSerial);
  //   rotateX(frameCount/200);
  //   rotateY(frameCount/200);
  //   rotateZ(frameCount/200);
  //   pop();
  // }
  
  // mousePressed(){
  //   let p = new Plane (this.x, this.y,this.r);
  //   push(); 
  //   translate(fromSerial,fromSerial);
  //   rotateX(frameCount/100);
  //   rotateY(frameCount/100);
  //   rotateZ(frameCount/100);
  //   //plane(this.x,this.y);
  //   pop(); 
  //   circles.push(c);
  // }
}
  

// get the list of ports:
function printList(portList) {
	for (var i = 0; i < portList.length; i++) {
		// Display the list the console:
		println(i + " " + portList[i]);
	}
}

function serialEvent() {
	// this is called when data is recieved, data will then live in fromSerial	
	fromSerial = serial.read();
}


/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  int analogValue = analogRead(A0);
  byte byteToSend = map (analogValue, 0, 1023, 0, 255);
  Serial.write(byteToSend);
  delay(50);
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from arduino to P5
See arduino code in bottom, have pot connected to A0*/

let serial; // variable to hold an instance of the serialport library
let fromSerial = 0; //variable to hold the data
let cylinders = [];

function setup() {
	createCanvas(600, 600, WEBGL);
	serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	serial.on('list', printList); // callback function for serialport list event
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbmodem1421"); // open a port
}

function draw() {
  camX=map(fromSerial,0,255,600,-600);
  camera( 700,0,((height/2)/tan(PI/6)),camX,0,0,0,1,0);
  background(0);
  
  for ( let i = 0; i< cylinders.length; i++){
    cylinders[i].display ();
    //planes[i].move ();
    //planes[i].mousePressed ();
  }
  // colorMode(HSB,360,100,100,100);
  //myColor = map(fromSerial,0,255,0,360);
  // fill(fromSerial,100,100);
}

function mousePressed () {
  let p = new Cylinder (10 ,random(50,1000));
  cylinders.push(p);
    // push(); 
    // translate(fromSerial*2,fromSerial*2);
    // rotateX(frameCount/100);
    // rotateY(frameCount/100);
    // rotateZ(frameCount/100);
    // pop();
  
}

class Cylinder{
  constructor(xx, yy, rr){
    this.x=xx;
    this.y=yy;
    this.r=rr
  }
  
  display(){
    directionalLight(0,219,255,1,1,0);
    directionalLight(0,19,255,-1,-1,0);
    directionalLight(0,255,103,-1,1,0);
    directionalLight(192,0,255,1,-1,0);
    specularMaterial(255);
    translate(fromSerial,fromSerial);
    rotateX(fromSerial/100);
    cylinder(this.x + (fromSerial/2), this.y + (fromSerial/2));
  }
  
  // move(){
  //   push(); 
  //   //translate(fromSerial,fromSerial);
  //   rotateX(frameCount/200);
  //   rotateY(frameCount/200);
  //   rotateZ(frameCount/200);
  //   pop();
  // }
  
  // mousePressed(){
  //   let p = new Plane (this.x, this.y,this.r);
  //   push(); 
  //   translate(fromSerial,fromSerial);
  //   rotateX(frameCount/100);
  //   rotateY(frameCount/100);
  //   rotateZ(frameCount/100);
  //   //plane(this.x,this.y);
  //   pop(); 
  //   circles.push(c);
  // }
}
  

// get the list of ports:
function printList(portList) {
	for (var i = 0; i < portList.length; i++) {
		// Display the list the console:
		println(i + " " + portList[i]);
	}
}

function serialEvent() {
	// this is called when data is recieved, data will then live in fromSerial	
	fromSerial = serial.read();
}


/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  int analogValue = analogRead(A0);
  byte byteToSend = map (analogValue, 0, 1023, 0, 255);
  Serial.write(byteToSend);
  delay(50);
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from arduino to P5
See arduino code in bottom, have pot connected to A0*/

let serial; // variable to hold an instance of the serialport library
let fromSerial = 0; //variable to hold the data
let cylinders = [];

function setup() {
	createCanvas(600, 600, WEBGL);
	serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	serial.on('list', printList); // callback function for serialport list event
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbmodem1421"); // open a port
}

function draw() {
  camX=map(fromSerial,0,255,600,-600);
  camera( 500,0,((height/2)/tan(PI/6)),camX,0,0,0,1,0);
  background(0);
  noFill();
  strokeWeight(1);
  stroke(255,255,255,100);
  
  for ( let i = 0; i< cylinders.length; i++){
    cylinders[i].display ();
    //planes[i].move ();
    //planes[i].mousePressed ();
  }
  // colorMode(HSB,360,100,100,100);
  //myColor = map(fromSerial,0,255,0,360);
  // fill(fromSerial,100,100);
}

function mousePressed () {
  let p = new Cylinder (20,20);
  cylinders.push(p);
    // push(); 
    // translate(fromSerial*2,fromSerial*2);
    // rotateX(frameCount/100);
    // rotateY(frameCount/100);
    // rotateZ(frameCount/100);
    // pop();
  
}

class Cylinder{
  constructor(xx, yy, rr){
    this.x=xx;
    this.y=yy;
    this.r=rr
  }
  
  display(){
    noFill();
    stroke(255);
    normalMaterial();
    // push();
    translate(fromSerial,fromSerial);
    rotateX(fromSerial/100);
    // scale(fromSerial/100,fromSerial/100,fromSerial/100)
    //rotateZ(fromSerial);
    cylinder(this.x + (fromSerial/2), this.y + (fromSerial/2));
    // cylinder(this.x, this.y)
    // pop();
  }
  
  move(){
    push(); 
    //translate(fromSerial,fromSerial);
    rotateX(frameCount/200);
    rotateY(frameCount/200);
    rotateZ(frameCount/200);
    pop();
  }
  
  // mousePressed(){
  //   let p = new Plane (this.x, this.y,this.r);
  //   push(); 
  //   translate(fromSerial,fromSerial);
  //   rotateX(frameCount/100);
  //   rotateY(frameCount/100);
  //   rotateZ(frameCount/100);
  //   //plane(this.x,this.y);
  //   pop(); 
  //   circles.push(c);
  // }
}
  

// get the list of ports:
function printList(portList) {
	for (var i = 0; i < portList.length; i++) {
		// Display the list the console:
		println(i + " " + portList[i]);
	}
}

function serialEvent() {
	// this is called when data is recieved, data will then live in fromSerial	
	fromSerial = serial.read();
}


/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  int analogValue = analogRead(A0);
  byte byteToSend = map (analogValue, 0, 1023, 0, 255);
  Serial.write(byteToSend);
  delay(50);
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from arduino to P5
See arduino code in bottom, have pot connected to A0*/

let serial; // variable to hold an instance of the serialport library
let fromSerial = 0; //variable to hold the data

function setup() {
	createCanvas(600, 600, WEBGL);
	serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	serial.on('list', printList); // callback function for serialport list event
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbmodem1421"); // open a port
}

function draw() {
  
  noFill();
  strokeWeight(1);
  stroke(255,255,255,100);
  background(0);

  
  push(); 
  translate(-100+fromSerial,-100);
  rotateX(frameCount/100);
  rotateY(frameCount/100);
  rotateZ(frameCount/100);
  sphere(fromSerial,24,16);
  //normalMaterial();
  pop();
  
  push(); 
  translate(-100+fromSerial,300);
  rotateX(frameCount/100);
  rotateY(frameCount/100);
  rotateZ(frameCount/100);
  sphere(fromSerial/2,24,16);
  //normalMaterial();
  pop();
  
  // colorMode(HSB,360,100,100,100);
  //myColor = map(fromSerial,0,255,0,360);
  // fill(fromSerial,100,100);
}

// get the list of ports:
function printList(portList) {
	for (var i = 0; i < portList.length; i++) {
		// Display the list the console:
		println(i + " " + portList[i]);
	}
}

function serialEvent() {
	// this is called when data is recieved, data will then live in fromSerial	
	fromSerial = serial.read();
}


/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  int analogValue = analogRead(A0);
  byte byteToSend = map (analogValue, 0, 1023, 0, 255);
  Serial.write(byteToSend);
  delay(50);
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from arduino to P5
See arduino code in bottom, have pot connected to A0*/

let serial; // variable to hold an instance of the serialport library
let fromSerial = 0; //variable to hold the data
// let posX=0,posY=0, step = 10;
let circles = [];
let fr=60;

function setup() {
	createCanvas(600, 600);
  frameRate(fr);
	serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	serial.on('list', printList); // callback function for serialport list event
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbmodem1421"); // open a port

}

function draw() {
    for ( let i = 0; i< circles.length; i++){
    circles[i].display ();
    circles[i].mirror ();
    }
  background(0,0,0,2);
  // colorMode(HSB,360,100,100,100);
  //myColor = map(fromSerial,0,255,0,360);
  // fill(fromSerial,100,100);
}

//Draw circles when mouse is dragged
function mouseDragged () {
  let r = random (0.1,5);
  let c = new Circle (mouseX,mouseY,r);
  circles.push(c);
  
}

// get the list of ports:
function printList(portList) {
	for (var i = 0; i < portList.length; i++) {
		// Display the list the console:
		println(i + " " + portList[i]);
	}
}

function serialEvent() {
	// this is called when data is recieved, data will then live in fromSerial	
	fromSerial = serial.read();
}

class Circle {
  constructor(xx, yy, dd){
    this.x=xx;
    this.y=yy;
    this.d=dd
  }
  
  display(){
    let col=0
    let bri=0
    colorMode(HSB,360,100,100,100);
    col = map(fromSerial,0,255,0,360);
    //bri = map(mouseY, 0, height, 100,20);
    //let col = [190,125,288,320];
    fill(col,100,100,80);
    noStroke();
    ellipseMode(CENTER);
    ellipse( (this.x)-this.d, (this.y)-this.d,this.d);
 
  }
  
  mirror(){
    
    ellipse( width - ((this.x)-this.d), (this.y)-this.d, this.d);
    ellipse( (this.x)-this.d, height-((this.y)-this.d),this.d);
    ellipse( width-((this.x)-this.d), height-((this.y)-this.d),this.d);    
  }
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  int analogValue = analogRead(A0);
  byte byteToSend = map (analogValue, 0, 1023, 0, 255);
  Serial.write(byteToSend);
  delay(50);
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one value in ascii from arduino to P5
See arduino code in bottom, have pot connected to A0*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data

function setup() {
	createCanvas(320, 240);
	serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	serial.on('list', printList); // callback function for serialport list event
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbmodem1421"); // open a port
}

function draw() {
	// do your drawing stuff here
	background(255);
	textSize(fromSerial/9);
	text(fromSerial, 0, height / 2);
}

// get the list of ports:
function printList(portList) {
	for (var i = 0; i < portList.length; i++) {
		// Display the list the console:
		println(i + " " + portList[i]);
	}
}

function serialEvent() {
	// this is called when data is recieved, data will then live in fromSerial	
	var stringFromSerial = serial.readLine();
  if (stringFromSerial.length>0){
    var trimmedString = trim(stringFromSerial);
    fromSerial= Number(trimmedString);
  }
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  int analogValue = analogRead(A0);
  Serial.println(analogValue);
  delay(50);
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one value as ascii from P5 to arduino
See arduino code in bottom, have LED connected to pin 3

move mouseX to dim LED*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data

function setup() {
  createCanvas(255, 255);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem14111"); // open a port
}

function draw() {
	background(0,0,255);
  var valueToSend = mouseX;
  serial.write(valueToSend + ","); // this adds a comma and turns it into a string
}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if (Serial.available()) {
    int intFromSerial = Serial.parseInt();
    analogWrite(3, intFromSerial);
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from arduino to P5
See arduino code in bottom, have pot connected to A0*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data
var posX=0,posY=0, step = 10;


function setup() {
	createCanvas(320, 240);
	serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	serial.on('list', printList); // callback function for serialport list event
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbmodem1421"); // open a port

}

function draw() {
  background(255);
  rectMode(CENTER);
  rect(width/2,height/2, fromSerial, fromSerial);
// posX+=step;
//   if (posX> width){
//     posX= 0;
//     posY+=step;
//     if (posY> height)posY=0;
  
  colorMode(HSB,360,100,100,100);
  fill(fromSerial,100,100);
  //rect(posX,posY, step, step);
}

// get the list of ports:
function printList(portList) {
	for (var i = 0; i < portList.length; i++) {
		// Display the list the console:
		println(i + " " + portList[i]);
	}
}

function serialEvent() {
	// this is called when data is recieved, data will then live in fromSerial	
	fromSerial = serial.read();
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  int analogValue = analogRead(A0);
  byte byteToSend = map (analogValue, 0, 1023, 0, 255);
  Serial.write(byteToSend);
  delay(50);
}
*/let circles = [];
let fr=60;

function setup() {
  frameRate(fr);
  createCanvas(600, 600);
}

function draw() {

    for ( let i = 0; i< circles.length; i++){
    circles[i].display ();
    circles[i].mirror ();
  }

  background(0,0,0,2);   
  //drawSomething(width/2,height/2,mouseX);
}

function mouseDragged () {
  let r = random (0.1,5);
  let c = new Circle (mouseX,mouseY,r);
  circles.push(c);
  
}

class Circle {
  constructor(xx, yy, dd){
    this.x=xx;
    this.y=yy;
    this.d=dd
  }
  
  display(){
    let col=0
    let bri=0
    colorMode(HSB,360,100,100,100);
    col = map(mouseX,0,width,190,125);
    bri = map(mouseY, 0, height, 100,20);
    //let col = [190,125,288,320];
    fill(col,100,bri,80);
    noStroke();
    ellipseMode(CENTER);
    ellipse( (this.x)-this.d, (this.y)-this.d,this.d);
 
  }
  
  mirror(){
    
    ellipse( width - ((this.x)-this.d), (this.y)-this.d, this.d);
    ellipse( (this.x)-this.d, height-((this.y)-this.d),this.d);
    ellipse( width-((this.x)-this.d), height-((this.y)-this.d),this.d);

    //background(0,0,0,2);
    
  }
}let long;
let lat;
let total = 20;
let dots = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  dots = make2Darray (long, lat);
  for ( let i = 0; i< long; i++){
    for (let j= 0; j <lat; j++){
      dots [i][j] = new Dot(i,j,0)
     // dots [i][j] = random(255);
    }
  }    
}

function draw() {
    strokeWeight(5);
    stroke(255,255,255);
    background(0);
 
  for ( let i = 0; i< dots.length; i++){
      for (let j= 0; j <lat; j++){
  dots[i][j].display();
      }
  }
}

function make2Darray (long, lat){
  let arr= new Array (long);
  for (let i = 0; i< arr.length; i++){
    arr[i]= new Array(lat);
}
  return arr;
}

class Dot {
  constructor(xx, yy, zz){
    this.x=xx;
    this.y=yy;
    this.z=zz
  }
  
  display(){
    let r = 200;
    for (let i = 0; i <total; i++);{
      long = map(i,0,total,-PI, PI);
      for (let j = 0; j<total; j++){
        lat = map (j,0,total,-HALF_PI,HALF_PI);
        this.x = r*sin(long)*cos(lat);
        this.y = r*sin(long)*sin(lat);
        this.z = r*cos(long);
      }
    
    }
    point(this.x, this.y, this.z);
}
}function setup() {
  createCanvas(600, 600, WEBGL);
}

function draw() {
  noFill();
  strokeWeight(1);
  stroke(255,255,255,10);
  background(0);
  // let dirX = (mouseX / width - 0.5) * 2;
  // let dirY = (mouseY / height - 0.5) * 2;
  // directionalLight(250, 250, 250, -dirX, -dirY, 0.25);
  //ambientMaterial(250);
  //noStroke();
  
  push(); 
  rotateX(frameCount/100);
  rotateY(frameCount/100);
  rotateZ(frameCount/100);
  sphere(200,24,16);
  //normalMaterial();
  pop();
  
  //background(0,0,0,5);

}let circles = [];
let fr=60;

function setup() {
  frameRate(fr);
  createCanvas(600, 600);
  // for ( let i = 0; i < 10; i++){
  //   let x = 10*i;
  //   let y = 10*i;
  //   let diameter = 10+ 30*i;
  //   circles[i]= new Circle (x,y,diameter);
  // }
}

function draw() {
  
    for ( let i = 0; i< circles.length; i++){
    circles[i].display ();
    circles[i].mirror ();
  }
    
  drawSomething(width/2,height/2,mouseX);
  background(0,0,0,12);

}

function mouseDragged () {
  let r = random (1,10);
  let c = new Circle (mouseX,mouseY,r);
  circles.push(c);
  
}

class Circle {
  constructor(xx, yy, dd){
    this.x=xx;
    this.y=yy;
    this.d=dd
  }
  
  display(){
    let col=0
    col = map(mouseX,0,width,0,255);
    stroke(col,col-100,col+100);
    strokeWeight(1);
    ellipseMode(CENTER);
    ellipse( (mouseX+this.x)-this.d, (mouseY+this.y)-this.d,this.d);
  }
  
  mirror(){
    ellipse( width - ((mouseX+this.x)-this.d), (mouseY+this.y)-this.d, this.d);
    ellipse( (mouseX+this.x)-this.d, height-((mouseY+this.y)-this.d),this.d);
    ellipse( width-((mouseX+this.x)-this.d), height-((mouseY+this.y)-this.d),this.d);
    
  }
  
}

function drawSomething (x,y,s) {
  ellipseMode(CENTER);
  fill(0,0,0,1);
  strokeWeight(0.2);
  stroke(15,15,15);
  ellipse(x,y,s,s);
  if(s>10){
    drawSomething(x,y,s-30);
  }
}let circles = [];
let fr=60;

function setup() {
  frameRate(fr);
  createCanvas(600, 600);
  // for ( let i = 0; i < 10; i++){
  //   let x = 10*i;
  //   let y = 10*i;
  //   let diameter = 10+ 30*i;
  //   circles[i]= new Circle (x,y,diameter);
  // }
}

function draw() {
  
    for ( let i = 0; i< circles.length; i++){
    circles[i].display ();
    circles[i].mirror ();
  }
    
  drawSomething(width/2,height/2,mouseX);
  background(0,0,0,12);

}

function mouseDragged () {
  let r = random (1,10);
  let c = new Circle (mouseX,mouseY,r);
  circles.push(c);
  
}

class Circle {
  constructor(xx, yy, dd){
    this.x=xx;
    this.y=yy;
    this.d=dd
  }
  
  display(){
    let col=0
    col = map(mouseX,0,width,0,255);
    stroke(col,col-100,col+100);
    strokeWeight(1);
    ellipseMode(CENTER);
    ellipse( (mouseX+this.x)-this.d, (mouseY+this.y)-this.d,this.d);
  }
  
  mirror(){
    ellipse( width - ((mouseX+this.x)-this.d), (mouseY+this.y)-this.d, this.d);
    ellipse( (mouseX+this.x)-this.d, height-((mouseY+this.y)-this.d),this.d);
    ellipse( width-((mouseX+this.x)-this.d), height-((mouseY+this.y)-this.d),this.d);
    
  }
  
}

function drawSomething (x,y,s) {
  ellipseMode(CENTER);
  fill(0,0,0,1);
  strokeWeight(0.2);
  stroke(15,15,15);
  ellipse(x,y,s,s);
  if(s>10){
    drawSomething(x,y,s-30);
  }
}let lines = [];
let fr=60;

function setup() {
  frameRate(fr);
  createCanvas(600, 600);
  for ( let i = 0; i < 10; i++){
    let x = 10*i;
    let y = 30*i;
    let long = 10+ 30*i;
    lines[i]= new Line (x,y,long);
  }
}

function draw() {
  
  for ( let i = 0; i< lines.length; i++){
    lines[i].display ();
    lines[i].mirror ();
  }
    
  drawSomething(width/2,height/2,mouseX);
  background(0,0,0,12);

}

class Line{
  constructor(xx, yy, dd){
    this.x=xx;
    this.y=yy;
    this.d=dd
  }
  
  display(){
    let col=0
    col = map(mouseX,0,width,0,255);
    stroke(col,col-100,col+100);
    strokeWeight(1);
    line( (mouseX+this.x)-this.d, (mouseY+this.y)-this.d,mouseX+this.x,mouseY+this.y);
    //background(0,0,0,5);
   //line(mouseX,mouseY,mouseX+this.d,mouseY+this.d);
   //   if(this.d>10){
   //      display(mouseX,mouseY,this.d-10);
   // }
  }
  
  mirror(){
    line( width - ((mouseX+this.x)-this.d), (mouseY+this.y)-this.d, width-(mouseX+this.x), mouseY+this.y);
    line( (mouseX+this.x)-this.d, height-((mouseY+this.y)-this.d),mouseX+this.x, height-(mouseY+this.y));
    line( width-((mouseX+this.x)-this.d), height-((mouseY+this.y)-this.d),width-(mouseX+this.x), height-(mouseY+this.y));
  }
  
}

function drawSomething (x,y,s) {
  ellipseMode(CENTER);
  fill(0,0,0,1);
  strokeWeight(0.2);
  stroke(15,15,15);
  ellipse(x,y,s,s);
  if(s>10){
    drawSomething(x,y,s-30);
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

class Vector{
  constructor(xx, yy){
    this.x = xx;
    this.y = yy;
  }
  
  create(){
    this.current = createVector(this.x,this.y);
    this.previous = createVector(this.x,this.y);
    //this.paths = [];
    //this.painting = false;
    //this.next = 0;
  }
}let l1,l2,l3,l4;
let fr=60;

function setup() {
  frameRate(fr);
  createCanvas(600, 600);
  l1 = new Line(0,0,50);
  l2 = new Line(10,30,100);
  l3 = new Line(20,60,200);
  l4 = new Line(30,90,300);
}

function draw() {
  //background(220);

  //ellipseMode(CENTER);
  l1.display();
  l1.mirror();
  
  l2.display();
  l2.mirror();
  
  l3.display();
  l3.mirror();
  
  l4.display();
  l4.mirror();
  drawSomething(width/2,height/2,mouseX);
  background(0,0,0,12);

  

}

class Line{
  constructor(xx, yy, dd){
    this.x=xx;
    this.y=yy;
    this.d=dd
  }
  
  display(){
    let col=0
    col = map(mouseX,0,width,0,255);
    stroke(col,col-100,col+100);
    strokeWeight(1);
    line( (mouseX+this.x)-this.d, (mouseY+this.y)-this.d,mouseX+this.x,mouseY+this.y);
    //background(0,0,0,5);
   //line(mouseX,mouseY,mouseX+this.d,mouseY+this.d);
   //   if(this.d>10){
   //      display(mouseX,mouseY,this.d-10);
   // }
  }
  
  mirror(){
    line( width - ((mouseX+this.x)-this.d), (mouseY+this.y)-this.d, width-(mouseX+this.x), mouseY+this.y);
    line( (mouseX+this.x)-this.d, height-((mouseY+this.y)-this.d),mouseX+this.x, height-(mouseY+this.y));
    line( width-((mouseX+this.x)-this.d), height-((mouseY+this.y)-this.d),width-(mouseX+this.x), height-(mouseY+this.y));
  }
  
}

function drawSomething (x,y,s) {
  ellipseMode(CENTER);
  fill(0,0,0,1);
  strokeWeight(0.2);
  stroke(15,15,15);
  ellipse(x,y,s,s);
  if(s>10){
    drawSomething(x,y,s-30);
  }
}let l1,l2,l3,l4;
let fr=120;

function setup() {
  frameRate(fr);
  createCanvas(400, 400);
  l1 = new Line(0,0,25);
  l2 = new Line(10,30,50);
  l3 = new Line(20,60,100);
  l4 = new Line(30,90,200);
}

function draw() {
  //background(220);

  //ellipseMode(CENTER);
  l1.display();
  l1.mirror();
  
  l2.display();
  l2.mirror();
  
  l3.display();
  l3.mirror();
  
  l4.display();
  l4.mirror();
  //b1.recursion();
  
  drawSomething(width/2,height/2,mouseX);
  background(0,0,0,5);
  

}

class Line{
  constructor(xx, yy, dd){
    this.x=xx;
    this.y=yy;
    this.d=dd
  }
  
  display(){
    let col=0
    col = map(mouseX,0,width,0,255);
    stroke(col,col-100,col+100);
    strokeWeight(1);
    line( (mouseX+this.x)-this.d, (mouseY+this.y)-this.d,mouseX+this.x,mouseY+this.y);
  //line(mouseX,mouseY,mouseX+this.d,mouseY+this.d);
   //   if(this.d>10){
   //      display(mouseX,mouseY,this.d-10);
   // }
  }
  
  mirror(){
    line( width - ((mouseX+this.x)-this.d), (mouseY+this.y)-this.d, width-(mouseX+this.x), mouseY+this.y);
    line( (mouseX+this.x)-this.d, height-((mouseY+this.y)-this.d),mouseX+this.x, height-(mouseY+this.y));
    line( width-((mouseX+this.x)-this.d), height-((mouseY+this.y)-this.d),width-(mouseX+this.x), height-(mouseY+this.y));
  }
  
}

function drawSomething (x,y,s) {
  ellipseMode(CENTER);
  noFill();
  strokeWeight(0.2);
  stroke(0,0,0);
  ellipse(x,y,s,s);
  if(s>10){
    drawSomething(x,y,s-30);
  }
}let l1,l2,l3,l4;
let fr=120;

function setup() {
  frameRate(fr);
  createCanvas(400, 400);
  l1 = new Line(0,0,25);
  l2 = new Line(10,30,50);
  l3 = new Line(20,60,100);
  l4 = new Line(30,90,200);
}

function draw() {
  //background(220);

  //ellipseMode(CENTER);
  l1.display();
  l1.mirror();
  
  l2.display();
  l2.mirror();
  
  l3.display();
  l3.mirror();
  
  l4.display();
  l4.mirror();
  //b1.recursion();
  
  background(0,0,0,5);
  

}

class Line{
  constructor(xx, yy, dd){
    this.x=xx;
    this.y=yy;
    this.d=dd
  }
  
  display(){
    stroke(72,255,250);
    line( (mouseX+this.x)-this.d, (mouseY+this.y)-this.d,mouseX+this.x,mouseY+this.y);
  //line(mouseX,mouseY,mouseX+this.d,mouseY+this.d);
   //   if(this.d>10){
   //      display(mouseX,mouseY,this.d-10);
   // }
  }
  
  mirror(){
    line( width - ((mouseX+this.x)-this.d), (mouseY+this.y)-this.d, width-(mouseX+this.x), mouseY+this.y);
    line( (mouseX+this.x)-this.d, height-((mouseY+this.y)-this.d),mouseX+this.x, height-(mouseY+this.y));
    line( width-((mouseX+this.x)-this.d), height-((mouseY+this.y)-this.d),width-(mouseX+this.x), height-(mouseY+this.y));
  }
  
  
  
  
  
  
  
  
  // recursion(x,y,d){
  //       if(this.d>10){
  //      recursion(this.x,this.y,this.d-10,this.d-10);
  // }
  // }
  
//   drawSomething(){
//   ellipse(this.x,this.y,this.d);
//   if(this.d>10){
//     drawSomething(this.x,this.y,this.d-10);
//   }
// }
}let l1,l2,l3,l4;

function setup() {
  createCanvas(400, 400);
  l1 = new Line(200,200,50);
  l2 = new Line(200,200,100);
  l3 = new Line(200,200,200);
  l4 = new Line(200,200,25);
}

function draw() {
  //background(220);

  //ellipseMode(CENTER);
  l1.display();
  l1.mirror();
  
  l2.display();
  l2.mirror();
  
  l3.display();
  l3.mirror();
  
  l4.display();
  l4.mirror();
  //b1.recursion();
  
  background(220,220,220,10);
  

}

class Line{
  constructor(xx, yy, dd){
    this.x=xx;
    this.y=yy;
    this.d=dd
  }
  
  display(){
    line( mouseX-this.d, mouseY-this.d,mouseX,mouseY);
  //line(mouseX,mouseY,mouseX+this.d,mouseY+this.d);
   //   if(this.d>10){
   //      display(mouseX,mouseY,this.d-10);
   // }
  }
  
  mirror(){
    line( width - (mouseX-this.d), mouseY-this.d, width-mouseX, mouseY);
    line( mouseX-this.d, height-(mouseY-this.d),mouseX, height-mouseY);
    line( width-(mouseX-this.d), height-(mouseY-this.d),width-mouseX, height-mouseY);
  }
  
  
  
  
  
  
  
  
  // recursion(x,y,d){
  //       if(this.d>10){
  //      recursion(this.x,this.y,this.d-10,this.d-10);
  // }
  // }
  
//   drawSomething(){
//   ellipse(this.x,this.y,this.d);
//   if(this.d>10){
//     drawSomething(this.x,this.y,this.d-10);
//   }
// }
}let b1;

function setup() {
  createCanvas(400, 400);
  b1 = new Bubble(200,200,20);
}

function draw() {
  background(220);

  ellipseMode(CENTER);
  b1.display();
  b1.mirror();
  //b1.recursion();

}

class Bubble{
  constructor(xx, yy, dd){
    this.x=xx;
    this.y=yy;
    this.d=dd
  }
  
  display(){
    ellipse(mouseX,mouseY,this.d);
   //   if(this.d>10){
   //      display(mouseX,mouseY,this.d-10);
   // }
  }
  
  mirror(){
    ellipse( width - mouseX, mouseY, width - mouseX, mouseY, );
  }
  
  
  
  
  
  
  
  
  // recursion(x,y,d){
  //       if(this.d>10){
  //      recursion(this.x,this.y,this.d-10,this.d-10);
  // }
  // }
  
//   drawSomething(){
//   ellipse(this.x,this.y,this.d);
//   if(this.d>10){
//     drawSomething(this.x,this.y,this.d-10);
//   }
// }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  rectMode(CENTER);
  drawSomething(mouseX,mouseY,50);
}

function drawSomething (x,y,s) {
  rect(x,y,s,s);
  if(s>10){
    drawSomething(x,y,s-10);
  }
}
  let b, b1;

  function setup() {
  createCanvas(400, 400);
    
    b = new Ball(50,50,1,2,50);
    b1 = new Ball(90,80,2,1,40);
}

function draw() {
  background(220);
  
  b.display();
  b1.display();
  
  b.move();
  b1.move();
  
  b.hover();
  b1.hover();
  
  
  
  //ellipse (b.x, b.y, b.r, b.r);
  //ellipse (b1.x, b1.y, b1.r, b1.r);
}let ball = {
  x:100,
  y: 100,
  d: 50,
  xspeed:1,
  yspeed:1
}
 
let beachBall = {
  x: 50,
  y: 50,
  d: 100,
  xspeed:1,
  yspeed:1
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  displayBall(ball);
  displayBall(beachBall);
  
  moveBall(ball);
  moveBall(beachBall);
  
  bounceBall(ball);
  bounceBall(beachBall);
}

function displayBall(whichBall){
  ellipse(whichBall.x, whichBall.y, whichBall.d, whichBall.d);
}

function moveBall(whichBall){
  whichBall.x = whichBall.x + whichBall.xspeed;
  whichBall.y = whichBall.y + whichBall.yspeed;
}

function bounceBall(whichBall){
  if (whichBall.x <= 0 || whichBall.x >= width){
    whichBall.xspeed= whichBall.xspeed * -1;
}
  
  if (whichBall.y <= 0 || whichBall.y >= height){
    whichBall.yspeed = whichBall.yspeed * -1;
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  // background(220);
  
  for (let i=0; i<100; i++){
    drawCircle (random(-i,i),random(-i,i));
  }
 
  drawCircle(0,50);
  drawCircle(70,60);
  drawCircle(150,70);
  
  let d = myDist (width/2 , height/2, mouseX, mouseY);
  print(d);
}

function drawCircle(offset,diameter){
  fill(random(0,100),random(0,255),random(0,255));
  ellipse(mouseX+offset, mouseY+offset,diameter,diameter);
  
}

function myDist (x1,y1,x2,y2) {
  return sqrt(pow((x2 - x1),2)+pow((y2 -y1),2));
}let padding = 50 // Consistent number for padding
let slider;
let sliderC = 0;
let side = 600;
let white = 255; //Potentially change to HSB color
let black = 0;

function setup() {
  createCanvas(side, side);
  slider = padding  
}

function draw() {
  sliderC = map( slider, padding, width-padding, black, white); // change colors
  sliderS = map( slider, padding, width-padding, 0, 20); //map position in x
  background(sliderC);//change background color according to slider position

  // Build Grid
  
  for (let x = 0; x <= width; x += 25) {
    for (let y = 0; y <= height; y += 25) { //create a grid 
      rectMode(CENTER); 
      fill (map(sliderC, black, white, white, black)); //change color according to slider
      rect(x, y, sliderS,sliderS); //create rectangle in the grid points
    
      if(sliderS < 10) { 
      line(x, y, x+25, y+25); //draw lines from left to right
      ellipse(x+12.5,y+12.5,sliderS,sliderS); //make ellipses grow (same as slider) 
      } else {
      line(x+25, y, x, y+25); //draw lines from right to left
      ellipse(x-12.5,y-12.5,sliderS/2,sliderS/2); // make ellipse smaller after half slider
      }
    }
  }
  
  // Build Slider
  
  stroke (map(sliderC, black, white, white, black)); //map the color backwards  
  line( padding, height-padding, width-padding, height-padding) //draw slider line
  fill (255);
  ellipseMode (CENTER);
  ellipse (slider, height-padding, 20,20);
 
  // Define conditions for slider
  
  if (mouseIsPressed && mouseY >= height-padding-10 && mouseY <= height-padding + 10) {
    if (mouseX >= padding && mouseX <= width-padding ) {
    slider = mouseX
    }
  }
}let padding = 50
let slider;
let sliderC = 0;
let side = 600;
let white = 255;
let black = 0;

function setup() {
  frameRate(60);
  createCanvas(side, side);
  slider = padding
  
  
}

function draw() {
  angleMode(DEGREES);
  sliderC = map( slider, padding, width-padding, black, white);
  sliderS = map( slider, padding, width-padding, 0, 20);
  background(sliderC);
  //fill( 255,255,255,50);
  //rect (side/2,side/2,side,side);
  
/*       rectMode(CENTER)
      translate(width / 2, height / 2);
      push();
      rotate(180);
      rect(x, y, sliderS,sliderS); // Rectangles are rotating in degrees
      pop();
*/
  
  noFill();
  for (let x = 0; x <= width; x += 20) {
    for (let y = 0; y <= height; y += 20) {
      rectMode(CENTER); 
      fill (map(sliderC, black, white, white, black));
      rect(x, y, sliderS,sliderS);
    

      if(sliderS < 10) {
      line(x, y, x+20, y+20);
      } else {
      line(x+20, y, x, y+20);
      }
      
      //translate(x, y);
      //rotate(90);
      
  /*for (let x = 10; x <= width; x += 20) {
    for (let y = 10; y <= height; y += 20) {
      ellipseMode(CENTER); 
      fill (map(sliderC, 0, 255, 255, 0));
      ellipse(x, y, sliderS,sliderS);
    }
  } */
      
      /*if(sliderS < 10) {
      translate(width / 2, height / 2);
      push();
      rotate(180);
      rect(x, y, sliderS,sliderS); // Rectangles are rotating in degrees
      pop();
      } else {
      translate(width / 2, height / 2);
      push();
      rotate(-180);
      rect(x, y, sliderS,sliderS); // Rectangles are rotating in degrees
      pop();
      } */
    }
  }
  
  stroke (map(sliderC, black, white, white, black));
  fill(255);
  line( padding, height-padding, width-padding, height-padding)
  ellipseMode (CENTER);
  //strokeWeight (0);
  ellipse ( slider, height-padding, 20,20);

  if (mouseIsPressed && mouseY >= height-padding-10 && mouseY <= height-padding + 10) {
    if (mouseX >= padding && mouseX <= width-padding ) {
    slider = mouseX
    }
  }
}let padding = 50
let slider;
let sliderC = 0;
let side = 600;

function setup() {
  frameRate(60);
  createCanvas(side, side);
  slider = padding
  
  
}

function draw() {
  angleMode(DEGREES);
  sliderC = map( slider, padding, width-padding, 0, 255);
  sliderS = map( slider, padding, width-padding, 0, 20);
  background(sliderC);
  //fill( 255,255,255,50);
  //rect (side/2,side/2,side,side);
  
/*       rectMode(CENTER)
      translate(width / 2, height / 2);
      push();
      rotate(180);
      rect(x, y, sliderS,sliderS); // Rectangles are rotating in degrees
      pop();
*/
  
  noFill();
  for (let x = 0; x <= width; x += 20) {
    for (let y = 0; y <= height; y += 20) {
      rectMode(CENTER); 
      fill (map(sliderC, 0, 255, 255, 0));
      rect(x, y, sliderS,sliderS);

      if(sliderS < 10) {
      line(x, y, x+20, y+20);
      } else {
      line(x+20, y, x, y+20);
      }
      
  for (let x = 10; x <= width; x += 20) {
    for (let y = 10; y <= height; y += 20) {
      ellipseMode(CENTER); 
      fill (map(sliderC, 0, 255, 255, 0));
      ellipse(x, y, sliderS,sliderS);
    }
  }
      
      /*if(sliderS < 10) {
      translate(width / 2, height / 2);
      push();
      rotate(180);
      rect(x, y, sliderS,sliderS); // Rectangles are rotating in degrees
      pop();
      } else {
      translate(width / 2, height / 2);
      push();
      rotate(-180);
      rect(x, y, sliderS,sliderS); // Rectangles are rotating in degrees
      pop();
      } */
    }
  }
  
  stroke (map(sliderC, 0, 255, 255, 0));
  fill(255);
  line( padding, height-padding, width-padding, height-padding)
  ellipseMode (CENTER);
  //strokeWeight (0);
  ellipse ( slider, height-padding, 20,20);

  if (mouseIsPressed && mouseY >= height-padding-10 && mouseY <= height-padding + 10) {
    if (mouseX >= padding && mouseX <= width-padding ) {
    slider = mouseX
    }
  }
}let padding = 50
let slider;
let sliderC = 0;

function setup() {
  frameRate(60);
  createCanvas(400, 400);
  slider = padding
  
  
}

function draw() {
  sliderC = map( slider, padding, width-padding, 0, 255);
  sliderS = map( slider, padding, width-padding, 0, 20);
  background(sliderC);
  
  
  
  noFill();
  for (let x = 0; x <= width; x += 20) {
    for (let y = 0; y <= height; y += 20) {
      ellipse(x,y,sliderS,sliderS);

      if(sliderS < 10) {
      line(x, y, x+20, y+20);
      } else {
      line(x+20, y, x, y+20);
      }
    }
  }
  
  stroke (map(sliderC, 0, 255, 255, 0));
  fill(255);
  line( padding, height-padding, width-padding, height-padding)
  ellipseMode (CENTER);
  //noStroke ();
  ellipse ( slider, height-padding, 20,20);

  if (mouseIsPressed && mouseY >= height-padding-10 && mouseY <= height-padding + 10) {
    if (mouseX >= padding && mouseX <= width-padding ) {
    slider = mouseX
    }
  }
}let padding = 50
let slider;
let sliderC = 0;

function setup() {
  frameRate(60);
  createCanvas(400, 400);
  slider = padding
  
  
}

function draw() {
  sliderC = map( slider, padding, width-padding, 0, 255);
  sliderS = map( slider, padding, width-padding, 0, 50);
  background(sliderC);
  
  
  
  noFill();
  for (let x = 0; x <= width; x += 20) {
    for (let y = 0; y <= height; y += 20) {
      ellipse(x,y,sliderS,sliderS);

      if(sliderS < 25) {
      line(x, y, x+20, y+20);
      } else {
      line(x+random(20), y+random(20), x+random(20), y+random(20));
      }
    }
  }
  
  stroke (map(sliderC, 0, 255, 255, 0));
  fill(255);
  line( padding, height-padding, width-padding, height-padding)
  ellipseMode (CENTER);
  //noStroke ();
  ellipse ( slider, height-padding, 20,20);

  if (mouseIsPressed && mouseY >= height-padding-10 && mouseY <= height-padding + 10) {
    if (mouseX >= padding && mouseX <= width-padding ) {
    slider = mouseX
    }
  }
}let padding = 50
let slider;
let sliderC = 0;

function setup() {
  createCanvas(400, 400);
  slider = padding
}

function draw() {
  sliderC = map( slider, padding, width-padding, 0, 255); 
  background(sliderC);
  stroke (map(sliderC, 0, 255, 255, 0));
  line( padding, height-padding, width-padding, height-padding)
  ellipseMode (CENTER);
  //noStroke ();
  ellipse ( slider, height-padding, 20,20);
  
  if (mouseIsPressed && mouseY >= height-padding-10 && mouseY <= height-padding + 10) {
    if (mouseX >= padding && mouseX <= width-padding ) {
    slider = mouseX
    }
  }
  
  for (let x = 0, x < width, x+= 10)
}let padding = 50
let slider;
let sliderC = 0;

function setup() {
  createCanvas(400, 400);
  slider = padding
}

function draw() {
  sliderC = map( slider, padding, width-padding, 0, 255); 
  background(sliderC);
  stroke (map(sliderC, 0, 255, 255, 0));
  line( padding, height-padding, width-padding, height-padding)
  ellipseMode (CENTER);
  //noStroke ();
  ellipse ( slider, height-padding, 20,20);
  
  if (mouseIsPressed && mouseY >= height-padding-10 && mouseY <= height-padding + 10) {
    if (mouseX >= padding && mouseX <= width-padding ) {
    slider = mouseX
    }
  }
  
  
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  let x = 0;
  let y = 0;
  
  /* let c = 0;
  while (c < 100){
    ellipse (x,y,20,20);
    x += 20;
    y += 20;
    c ++;
  } */
  
  for (let c = 0; c < 200; c++){
    ellipse (x,y,5,5);
    x += 20;
    y += 20;
    c ++;
  }
}let x, y;
let xdir = 4;
let ydir = 3;
let pxdir = 4;
let pydir = 3;

function setup() {
  createCanvas(400, 400);
  x= 10;
  y= 10;
}

function draw() {
  
  background(220);
  
  
  rect (200,200,100,100);
  if (mouseIsPressed){
    if (mouseX > 200 && mouseX < 300 && mouseY > 200 && mouseY < 300){
    xdir = x;
    ydir = y;
    } else {
      xdir = pxdir;
      ydir = pydir;
    }
  }
  
  ellipse (x,y,20,20);
  x = x + xdir;
  y = y + ydir;
  
  if (y>=height || y<= 0){
    ydir = ydir * -1;
  }
  
  if (x>=width || x<= 0){
    xdir = xdir * -1;
  }
  
  
}let s = "";
let paragraph;
let charCount;

function setup() {
  createCanvas(1, 1);
  
  paragraph = createP("");
  
  frameRate(10);
  
}

function draw() {
  //background(220);
  
  let x = random(width);
  let y = random(height);
  
  let c = random(96,123);
  c = floor(c);
  if (c==96 || charCount >= random (1,10)){
    c=32
    charCount=0;
  }
    
  c = char(c);
  s = s + c;
  charCount ++;
  print (charCount);
	paragraph.html(s);
}let x, y;
let xdir = 4;
let ydir = 3;

function setup() {
  createCanvas(400, 400);
  x= 10;
  y= 10;
}

function draw() {
  background(220);
  ellipse (x,y,20,20);
  x = x + xdir;
  y = y + ydir;
  
  if (y>=height || y<= 0){
    ydir = ydir * -1;
  }
  
  if (x>=width || x<= 0){
    xdir = xdir * -1;
  }
  
  
}let x,y;

function setup() {
  createCanvas(400, 400);
  
  let x =1;
  if (x == true){
    print ("it's equal")
}
}

function draw() {
  //ellipseMode (CENTER);
  background(220);
  //ellipse (x,y,50,50);
  
  //if (true){
   // var x = 10;
}var side = 600; //Dynamic canvas size
var star;

function setup() {
  createCanvas(side, side);
    
  star = { //star element to define behavior of shooting star
  starX : mouseX,
  starY : mouseY,
  size : random(2,12)
}
  
}

function draw() {
  fr = map (mouseY,0,side,48,6); //map the height of the canvas
  frameRate(fr) //decrease frame rate (stop motion) according to mouse
  //print (fr);
	ellipseMode(CENTER); //Draw stars in the canvas
  fill(72,255,250);
	strokeWeight(0);
  
  var sky = { //Sky element to define the behavior of the stars 
  locationX : random(width),
  locationY : random(height),
  size : random(1,8)
}
  //Draw blinking blue stars
  ellipse(sky.locationX, sky.locationY, sky.size, sky.size); //draw random sized stars
  background(0,0,0,20); //draw a semi-transparent background to fade stars
  
  //Draw shooting star
  ellipseMode(CENTER); 
  fill(74,156,255);
	strokeWeight(0);
  ellipse(star.starX, star.starY, star.size, star.size);
  star.starX = star.starX+1; //Move shoouting star
  star.starY = star.starY-1;
  star.size = star.size - 0.02 //Decreases the size of shooting star
  
}
  
function mousePressed() {
  //frameRate(fr) //decrease frame rate (stop motion)
  background(255,255,255,30); //shut the star

    
  star = {
  starX : mouseX,
  starY : mouseY,
  size : random(1,10)
}
  
  
}
//var x = 1 
  //var x;
  //var y;
  var side = 600;
  var star;
  var fr=12

function setup() {
  star = createCanvas(side, side);
  star.mousePressed(daylight)
  
}

function draw() {
	ellipseMode(CENTER); 
  fill(72,255,250);
	strokeWeight(0);
  var x = random(width); 
  var y = random(height);
  var size = random(1,8)
  ellipse(x, y, size, size);
  // x = x+1
  // y = y+1
  background(0,0,0,20);
}
  
function daylight() {
  frameRate(fr) //decrease frame rate (stop motion)
  background(255,255,255,30); //shut the star
  
  //function draw() {
  ellipseMode(CENTER); 
  fill(255);
	strokeWeight(0);
  var starX = mouseX;
  var starY = mouseY;
  var size = random(4,12); 
  ellipse(starX, starY, size, size);
  //starX = starX+1; 
  //starY = starY-1; 
  //}
}

/*function mousePressed (){
  var starX = mouseX;
  var starY = mouseY;
  starX = starX+1; 
  starY = starY-1;
}*/let s = "";
let p;

function setup() {
  createCanvas(400, 400);
  
  p= createP("");
  
  frameRate(1);
  
}

function draw() {
  background(220);
  print(key);
  
  let x = random(width); 
  let y = random(height);
  
  ellipse(x,y,50,50);
  
  let c = random(96,127);
  c = round(c);
  c = char(c);
  //print(c);
  s = s + c;
  print(s);
}let x =1;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(x,0,50,50)
  x=x+1;
  print(x);
  
}function setup() {
  createCanvas(626, 467);
  background(43,255,254);
  
  strokeWeight(40);
  stroke(252,15,27);
  line(0,0,626,467);
  
  ellipseMode(CENTER);
  fill(30,198,34);
  strokeWeight(0);
  ellipse(313,234,312,232);
  
  rectMode(CENTER);
  fill(2,13,126);
  strokeWeight(0);
  rect(449,214,40,40);
}

function draw() {
  //background(220);
}function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}  var x =1;
  //var x=ellipse(248,204,50,50);
  
  function setup() {
  createCanvas(600, 700);
  background(234);
  //angleMode(DEGREES);
  
  //Hair
  ellipseMode(CENTER);
  fill(104,72,54);
  strokeWeight(0);
  ellipse(300,175,138,222);
  
  ellipseMode(CENTER);
  fill(114,89,65);
  strokeWeight(0);
  ellipse(300,175,118,202);
  
  ellipseMode(CENTER);
  fill(104,72,54);
  strokeWeight(0);
  ellipse(300,175,110,190);
  
  ellipseMode(CENTER);
  fill(114,89,65);
  strokeWeight(0);
  ellipse(300,175,100,180);
  
  //Hair cover
  rectMode(CENTER);
  fill(234);
  strokeWeight(0);
  rect(300,258,130,57);
  
  //Face
  ellipseMode(CENTER);
  fill(234,206,173);
  strokeWeight(0);
  ellipse(300,175,96,154);
  
  //Hairline
  strokeWeight(1);
  stroke(234,206,173);
  line(300,64,300,97);
  
  //LeftEaring
  ellipseMode(CENTER);
  strokeWeight(3);
  stroke(249,224,38);
  noFill(); 
  ellipse(248,204,10,70);
  
  //LeftEaring
  ellipseMode(CENTER);
  strokeWeight(3);
  stroke(249,224,38);
  noFill(); 
  ellipse(352,204,10,70);
  
  //RightGlass
  rectMode(CENTER);
  strokeWeight(2);
  stroke(112,112,112);
  noFill(); 
  rect(322,146,32,24,3);
  
  //RightEye
  strokeWeight(0);
  //stroke(112,112,112);
  fill(255); 
  arc(322, 150, 24, 22, PI, TWO_PI); 
  fill(104,72,54);
  ellipse(322, 145, 6, 6);
  
  //LeftGlass
  rectMode(CENTER);
  strokeWeight(2);
  stroke(112,112,112);
  noFill(); 
  rect(278,146,32,24,3);
  
  //LeftEye
  strokeWeight(0);
  //stroke(112,112,112);
  fill(255); 
  arc(278, 150, 24, 22, PI, TWO_PI); 
  fill(104,72,54);
  ellipse(278, 145, 6, 6);
  
  //UnionGlass
  strokeWeight(1);
  stroke(112,112,112);
  noFill(); 
  arc(300, 150, 16, 12, PI+QUARTER_PI, TWO_PI-QUARTER_PI);
  
  //LeftCheek
  ellipseMode(CENTER);
  strokeWeight(0);
  fill(244,206,201); 
  ellipse(278,198,24,32);
  
  //RightCheek
  ellipseMode(CENTER);
  strokeWeight(0);
  fill(244,206,201); 
  ellipse(322,198,24,32);
  
  //Nose
  strokeWeight(2);
  stroke(221,170,166);
  noFill(); 
  arc(300, 175, 10, 22, PI-HALF_PI, TWO_PI-HALF_PI);
  
  //Mouth
  //Back
  strokeWeight(2);
  stroke(221,170,166);
  fill(255); 
  arc(300, 200, 48, 45, 0, PI);
  
  //Details
  strokeWeight(1);
  stroke(232,232,232);
  fill(255); 
  arc(300, 200, 46, 22, 0, PI);
  
  //Divission
  strokeWeight(1);
  stroke(232,232,232);
  line(300,200,300,220);
  
  //Start of Body ||||||
  //Neck
  rectMode(CENTER);
  fill(234,206,173);
  strokeWeight(0);
  rect(300,256,26,30);
  
  //Chest
  fill(234,206,173);
  strokeWeight(0);
  triangle(242,273,300,250,358,273);
  
  //LeftArm
  strokeWeight(15);
  stroke(234,206,173);
  line(188,358,253,276);
  
  //RighttArm
  strokeWeight(15);
  stroke(234,206,173);
  line(347,276,412,358);
  
  //top Dress
  fill(0);
  strokeWeight(0);
  triangle(242,273,300,426,358,273);
  
  fill(0);
  strokeWeight(0);
  ellipse(271,273,58,16);
  ellipse(329,273,58,16);
  
  //Legs
  rectMode(CENTER);
  fill(234,206,173);
  strokeWeight(0);
  rect(270,550,30,100);
  rect(332,550,30,100);
  
  //bottom Dress
  fill(0);
  strokeWeight(0);
  triangle(187,506,300,309,413,506);
  
  fill(0);
  strokeWeight(0);
  ellipse(215,505,56,16);
  ellipse(272,505,56,16);
  ellipse(329,505,56,16);
  ellipse(386,505,56,16);
  
  fill(0);
  strokeWeight(0);
  bezier(188, 505, 187, 475, 257, 358, 273, 358);
  bezier(413, 506, 413, 475, 343, 358, 327, 358);
  
  //Waist
  rectMode(CENTER);
  fill(234,206,173);
  strokeWeight(0);
  rect(300,354,58,8);
  
  //LeftShoe
  strokeWeight(0);
  fill(255); 
  arc(270, 600, 52, 55, PI, TWO_PI);
  fill(249); 
  rect(270,606,58,12,3);
  
  //RightShoe
  strokeWeight(0);
  fill(255); 
  arc(332, 600, 52, 55, PI, TWO_PI);
  fill(249); 
  rect(332,606,58,12,3);
  
  
}
  //RotatingLeftEaring
function draw() {
  //push();
  //translate(248,204);

  ellipseMode(CENTER);
  strokeWeight(3);
  stroke(249,224,38);
  noFill(); 
  //ellipse(248,204,10,70);
  ellipse(x,204,50,50)
  //rotate(x);
  x=x+20;
  //pop(); 
}function setup() {
  createCanvas(400, 400);
  background(220);
  fill(200,0,0);
  ellipse(200,200,40,90);
  
  stroke(0);
  strokeWeight(3);
  fill(0,0,200);
  rect(180,50,50,50);
  createP("My name is Vero");
}

function draw() {
  //background(220,0,0);
}