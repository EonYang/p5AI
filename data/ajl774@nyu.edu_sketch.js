let song;
function preload() { 
song = loadSound('assets/Hold_On.mp3', loaded);
}
function setup() {
song.setVolume(0.3);
createCanvas(400, 300);
}
function loaded() {
console.log('loaded');
}
function draw() {
background(0);
fill(255);
text("button value: " + inData, 30, 30);
if (inData == 1){ 
togglePlaying();  
}
}
function togglePlaying() {
song.stop();
} else {
song.play();
}
}
for (var i = 0; i < portList.length; i++) {
}
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
function playSong() { 
song.play(); 
} 
let song;
function preload() { 
song = loadSound('assets/Hold_On.mp3', loaded);
}
function setup() {
song.setVolume(0.3);
createCanvas(400, 300);
}
function loaded() {
console.log('loaded');
}
function draw() {
background(0);
fill(255);
text("button value: " + inData, 30, 30);
if (inData == 1){ 
togglePlaying();  
}
}
function togglePlaying() {
song.stop();
} else {
song.play();
}
}
for (var i = 0; i < portList.length; i++) {
}
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
function playSong() { 
song.play(); 
} 
let button0;
let state = 0;
let titlepage, titleSound, beginButton, title;
let citySounds, cityImage, introText, nextButton1;
let usbImage, inputState2, buttonState2, messageState2, results;
let error, bell, audioClue, textClue, playAudioButton;
let glitchBkgd, textNoClue, nextButton;
let inspectorImage, introText4, nextButton4;
let frontdoor, fiveText, fivebutton; 
let text6, slider1, slider2, slider3, slider4, slider5, depotImage, sliderText1, sliderText2, sliderText3, sliderText4, sliderText5;
let col = 200;
let sevenClueMessage1, sevenClueMessage2, noteButton, nextButton7_1, noteVisible;
let noteInksplot, noteButton72, nextButton7_2, sevenClueMessage3, sevenClueMessage4, sevenClueMessage5;
let text8, nextButton8, staircase;
let enter, payphoneImg, dispatchText, checkbox1, checkbox2, checkbox3, checkbox4, checkbox5, checkbox6, checkbox7, checkbox8, checkbox9, checkbox0;
let alienSound, finaleImage, finalText1, finaleText2, finaleText3, nextText1;
let flopImage, flopText1, flopText2, flopText3, nextText2;
function preload() {
usbImage = loadImage('assets/usbImage.jpg');
glitchBkgd = createImg("assets/incorrect.gif");
glitchBkgd.hide();
bell = loadSound('assets/bell.mp3');
error = loadSound('assets/error.mp3');
audioClue = loadSound('assets/explosionSound.mp3');
titlepage = loadImage("titlepage.jpg");
titleSound = loadSound('assets/shortTitleSound.m4a');
cityImage = loadImage("cityImage.jpg");
citySounds = loadSound('assets/citySounds.m4a');
inspectorImage = loadImage('assets/inspectorImage.jpg');
finaleImage = loadImage('assets/finaleImage.jpg');
flopImage = loadImage('assets/flopImage.jpg');
staircase = loadImage('assets/staircase.jpg');
depotImage = loadImage('assets/depotImage.jpg');
noteVisible = loadImage('assets/briefcaseVisible.jpg');
noteInksplot = loadImage('assets/briefcaseInksplot.jpg');
payphoneImg = loadImage('assets/payphones.jpg');
frontdoor = loadImage('assets/frontdoor.jpg');
alienSound = loadSound('assets/alienSound.mp3');
}
function setup() {
createCanvas(640 ,  426);
background(220);
textAlign(CENTER);
background(titlepage, 255);
titleSound.loop();
titleSound.setVolume(0.2);
beginButton = createButton("B E G I N");
beginButton.mousePressed(state1);
beginButton.position(width / 2 - 29, 280);
fill(147, 143, 143);
noStroke();
rect(280, 170, 80, 30);
fill(147, 143, 143, 170);
noStroke();
rect(199, 145, 236, 117);
title = createElement('h1', 'A PORTAL <br>WAITS IN <br>BROOKLYN');
title.position(220, 130);
button0 = createButton("GO TO STATE 1");
button0.mousePressed(state1);
}
function draw() {
console.log(state);
}
function state1() {
state0
- determine problem that must be solved
- set the scene 
- describe the character 
ASSETS & PLOT 
- audio of street sounds and walking 
- image of the city in the early evening 
- recounting the story of what happened that morning 
titleSound.stop();
beginButton.hide();
title.hide();
background(cityImage, 255);
citySounds.loop();
citySounds.setVolume(0.2);
introText = createP("Begin by reading chapter one in the accompanying book. <br>When you are prompted, select the button below marked, 'NEXT CHAPTER'.");
introText.style("color", "#ccc9c5");
introText.show();
introText.position(60, 308);
nextButton1 = createButton("NEXT CHAPTER");
nextButton1.mousePressed(state2)
nextButton1.position(50, 375);
state1
** something happens that subtly reveals the password **  
- need to get a clue
- someone gives you an encrypted USB 
- returns to the scene of it 
state = 1;
fill(0);
button0.hide();
button1 = createButton("GO TO STATE 2");
button1.mousePressed(state2);
}
function state2() {
nextButton1.hide();
introText.hide();
state2 
- you have to enter the password into a text box 
state = 2;
background(usbImage, 255);
citySounds.stop();
button1.hide();
inputState2 = createInput('PROPERTY OF INSP HUDSON');
inputState2.position(80, 300);
inputState2.size(170, 15);
buttonState2 = createButton('unlock');
buttonState2.position(inputState2.x + inputState2.width + 5, 297);
buttonState2.mousePressed(checkResults);
messageState2 = createElement('h4', 'file encrypted');
messageState2.position(80, 258);
button2_1 = createButton("GO TO ALT 1");
button2_1.mousePressed(state3_1_clue);
button2_2 = createButton("GO TO ALT 2");
button2_2.mousePressed(state3_2_noClue);
}
function checkResults() {
results = inputState2.value();
if (results == 'donut') {
bell.play();
bell.setVolume(0.3);
state3_1_clue();
} else if (results != 'donut') {
error.play();
error.setVolume(0.3);
state3_2_noClue();
}
}
function state3_1_clue() {
buttonState2.hide();
inputState2.hide();
messageState2.html('USB UNLOCKED!');
messageState2.position(30, 245);
textClue = createP("You decrypted the USB! You find an audio file labeled '6 <br>digit dispatch code'. Whatever it is, it’s important enough for the <br>Inspector to encrypt. You play the 1st second and recognize the voice <br>as Inspector Jerry Stills,  Inspector Hudson’s detective partner who has <br>been missing since last week! Play the audio file.Take notes if you need to.");
textClue.show();
textClue.position(30, 270);
playAudioButton = createButton("PLAY AUDIO FILE");
playAudioButton.mousePressed(togglePlaying)
playAudioButton.position(30, 385);
nextButton = createButton("NEXT CHAPTER");
nextButton.mousePressed(state4)
nextButton.position(160, 385);
state3.1.clue
** CORRECT they got password right! **  
- unlocks an audio file 
- gives you valuable information ABOUT ABOUT ABOUT ABOUT ?????????
- maybe this gives you the first 3 digits of a 6 digit number 
state = 3.1;
background(usbImage, 255);
button2_1.hide();
button2_2.hide();
button3 = createButton("GO TO STATE 4");
button3.mousePressed(state4);
}
function togglePlaying() {
textClue.hide(); 
audioText = createP('You hear the sound of Inspector Jerry speaking nervously <br>on what seems to be a voice mail. He’s out of breath and speaking <br>rapidly about a payphone that he wants Hudson to use. “Dial 4 - 8 - 3” <br>- the message it cut off by a loud bang and screaming before the track <br>cuts out. '); 
audioText.position(30, 270);
if (!audioClue.isPlaying()) {
audioClue.play();
audioClue.setVolume(0.3);
playAudioButton.html("PAUSE AUDIO FILE");
} else {
audioClue.pause();
playAudioButton.html("PLAY AUDIO FILE");
}
}
function state3_2_noClue() {
state3.2.noClue
** INCORRECT they got password wrong **  
- USB unreadable or it self destructs 
- no valuable information or maybe just fragment information
inputState2.hide();
buttonState2.hide();
messageState2.position(30, 270);
messageState2.html('HACK DETECTED. USB WILL SELF DESTRUCT');
glitchBkgd.show();
glitchBkgd.position(0, 0);
textNoClue = createP('What have you done?! You entered in the wrong password and <br>lost access to this file! There goes that clue! Hopefully you can <br>get by without it... The USB is getting hot to the touch. You wrap <br>the end of your shirt around your fingers pull it out of the laptop.');
textNoClue.show();
textNoClue.position(30, 295);
nextButton = createButton("NEXT CHAPTER");
nextButton.mousePressed(state4)
nextButton.position(30, 390);
state = 3.2;
button2_1.hide();
button2_2.hide();
button3 = createButton("GO TO STATE 4");
button3.mousePressed(state4);
}
function state4() {
state4
** NOTE player either has a clue or doesn't **  
- more scene setting 
- something happens kind of obvious happens to give you 
the password to the door knocking cypher 
if (state == 3.2) {
messageState2.hide();
glitchBkgd.hide();
textNoClue.hide();
nextButton.hide();
} else if (state == 3.1) {
messageState2.hide();
textClue.hide();
audioText.hide(); 
playAudioButton.hide();
nextButton.hide();
}
state = 4;
background(inspectorImage, 255);
citySounds.loop();
citySounds.setVolume(0.2);
fill(120, 120);
noStroke();
rect(45, 323, 450, 40);
introText4 = createP("Continue by reading the following chapter in the book. <br>When you are prompted, return here and select the button below.");
introText4.style("color", "#FFFFFF");
introText4.show();
introText4.position(50, 308);
nextButton4 = createButton("NEXT CHAPTER");
nextButton4.mousePressed(state5)
nextButton4.position(40, 375);
button3.hide();
button4 = createButton("GO TO STATE 5");
button4.mousePressed(state5);
}
function state5() {
introText4.hide();
nextButton4.hide();
state5  
- need another clue 
- door knocking morse code
- listen and respond
** user must get this one correct ** 
- maybe hints? 
state = 5;
background(frontdoor, 255);
button4.hide();
fill(120, 250);
noStroke();
rect(45, 323, 450, 40);
fiveText = createP("Continue by reading the following chapter in the book. <br>When you are prompted, return here and select the button below.");
fiveText.style("color", "#FFFFFF");
fiveText.show();
fiveText.position(50, 308);
fivebutton = createButton("NEXT CHAPTER");
fivebutton.mousePressed(state6)
fivebutton.position(40, 375);
button5 = createButton("GO TO STATE 6");
button5.mousePressed(state6);
}
function state6() {
state6
- the person on the other side of the door gives you a locked box 
with sliders 
- have to unlock the numbers on the sliders using clues from 
observations 
- need a "unlock" or "submit" button to test their answer 
fiveText.hide(); 
fivebutton.hide(); 
background(depotImage, 255);
citySounds.stop();
titleSound.loop();
titleSound.setVolume(0.2);
fill(120, 120);
noStroke();
rect(45, 323, 285, 60);
text6 = createP("Continue by reading the following chapter <br>in the book. When you are instructed, <br>unlock the briefcase.");
text6.style("color", "#FFFFFF");
text6.show();
text6.position(50, 308);
slider1 = createSlider(0, 100, 50);
slider1.position(width / 2, height / 2 + 105);
slider1.style('width', '100px');
slider1.style('color', 0);
slider1.style('rotate', 90);
slider1.changed(mySelectEvent);
slider2 = createSlider(0, 100, 50);
slider2.position(width / 2 + 20, height / 2 + 105);
slider2.style('width', '100px');
slider2.style('rotate', 90);
slider2.changed(mySelectEvent);
slider3 = createSlider(0, 100, 50);
slider3.position(width / 2 + 40, height / 2 + 105);
slider3.style('width', '100px');
slider3.style('rotate', 90);
slider3.changed(mySelectEvent);
slider4 = createSlider(0, 100, 50);
slider4.position(width / 2 + 60, height / 2 + 105);
slider4.style('width', '100px');
slider4.style('rotate', 90);
slider4.changed(mySelectEvent);
slider5 = createSlider(0, 100, 50);
slider5.position(width / 2 + 80, height / 2 + 105);
slider5.style('width', '100px');
slider5.style('rotate', 90);
slider5.changed(mySelectEvent);
fill(col);
rect(width / 2 + 43, height / 2 + 35, 16, 16);
rect(width / 2 + 63, height / 2 + 35, 16, 16);
rect(width / 2 + 83, height / 2 + 35, 16, 16);
rect(width / 2 + 103, height / 2 + 35, 16, 16);
rect(width / 2 + 123, height / 2 + 35, 16, 16);
fill(0);
text((slider1.value()), width / 2 + 51, height / 2 + 47);
text((slider2.value()), width / 2 + 71, height / 2 + 47);
text((slider3.value()), width / 2 + 91, height / 2 + 47);
text((slider4.value()), width / 2 + 111, height / 2 + 47);
text((slider5.value()), width / 2 + 131, height / 2 + 47);
caseButton = createButton('unlock briefcase');
caseButton.position(width / 2 + 36, height / 2 + 175);
caseButton.mousePressed(checkCaseResults);
state = 6;
button5.hide();
button6_1 = createButton("GO TO ALT 1");
button6_1.mousePressed(state7_1_clue);
button6_2 = createButton("GO TO ALT 2");
button6_2.mousePressed(state7_2_noClue);
}
function checkCaseResults() {
let code1 = 20;
let code2 = 18;
let code3 = 63;
let code4 = 90;
let code5 = 3;
var cipher1 = slider1.value();
var cipher2 = slider2.value();
var cipher3 = slider3.value();
var cipher4 = slider4.value();
var cipher5 = slider5.value();
if (cipher1 == code1 && cipher2 == code2 && cipher3 == code3 && cipher4 == code4 && cipher5 == code5) {
bell.play();
bell.setVolume(0.3);
state7_1_clue();
} else {
error.play();
error.setVolume(0.3);
state7_2_noClue();
}
}
function mySelectEvent() {
fill(col);
rect(width / 2 + 43, height / 2 + 35, 16, 16);
rect(width / 2 + 63, height / 2 + 35, 16, 16);
rect(width / 2 + 83, height / 2 + 35, 16, 16);
rect(width / 2 + 103, height / 2 + 35, 16, 16);
rect(width / 2 + 123, height / 2 + 35, 16, 16);
fill(0);
text((slider1.value()), width / 2 + 51, height / 2 + 47);
text((slider2.value()), width / 2 + 71, height / 2 + 47);
text((slider3.value()), width / 2 + 91, height / 2 + 47);
text((slider4.value()), width / 2 + 111, height / 2 + 47);
text((slider5.value()), width / 2 + 131, height / 2 + 47);
}
function state7_1_clue() {
state7.1.clue
** CORRECT they got sliders right! **  
- unlocks a message that you read with a flashlight 
- gives you valuable information ABOUT ABOUT ABOUT ABOUT ?????????
- maybe this gives you the second 3 digits of a 6 digit number 
text6.hide();
caseButton.hide();
slider1.hide();
slider2.hide();
slider3.hide();
slider4.hide();
slider5.hide();
state = 7.1;
background(depotImage, 255);
fill(120, 120);
noStroke();
rect(30, 305, 510, 65);
sevenClueMessage1 = createP('UNLOCKED SUCCESSFULLY');
sevenClueMessage1.style("color", "#FFFFFF");
sevenClueMessage1.show();
sevenClueMessage1.position(30, 270);
sevenClueMessage2 = createP('You can hear the voices and dogs getting closer. Your heart races as you fling <br>open the lid of the briefcase. Inside you find a single piece of paper with a <br>message scrawled across it. You pull out your flashlight to read the note.');
sevenClueMessage2.style("color", "#FFFFFF");
sevenClueMessage2.show();
sevenClueMessage2.position(40, 295);
noteButton = createButton("READ NOTE");
noteButton.mousePressed(showNote)
noteButton.position(30, 380);
nextButton7_1 = createButton("NEXT CHAPTER");
nextButton7_1.mousePressed(state8)
nextButton7_1.position(130, 380);
button6_1.hide();
button6_2.hide();
button7 = createButton("GO TO STATE 8");
button7.mousePressed(state8);
}
function showNote() {
background(depotImage, 255);
image(noteVisible, 40, 40, noteVisible.width / 10, noteVisible.height / 10);
}
function state7_2_noClue() {
state7.2.noClue
** INCORRECT they got sliders wrong **  
- decide to smash it to get inside 
- an ink well bursts and covers the message
- you get a fragment of it, the location "platform 9, Lafayette" 
text6.hide();
caseButton.hide();
slider1.hide();
slider2.hide();
slider3.hide();
slider4.hide();
slider5.hide();
background(depotImage, 255);
fill(120, 120);
noStroke();
rect(30, 130, 560, 245);
sevenClueMessage3 = createP('HACK DETECTED!');
sevenClueMessage3.style("color", "#FFFFFF");
sevenClueMessage3.show();
sevenClueMessage3.position(30, 120);
sevenClueMessage4 = createP('The numbers glow read. You had one shot and you blew it! Now the lock mechanism <br>is frozen and you’ve been shut out. Then in the distance you see flashlights and <br>hear dogs barking. Have you been discovered? Is this a search team or a team of <br>people here to repair the discarded trains. Whichever the case, you’re not waiting <br>to find out. There’s only one option left - you’ve got to smash it open. You grab <br>a rock and start pounding the screens and dials, trying to break the lock. The <br>latch begins to give way. You put it on the ground and use the heel of your shoe <br>with all your might to pry it open with brute force. Finally the lock cracks and <br>fling open the case. In the dark you fumble for the contents of the case. You <br>grasp something flimsy and damp. In terror, you whip out your flashlight to <br>investigate the fluid. Read the note.');
sevenClueMessage4.style("color", "#FFFFFF");
sevenClueMessage4.show();
sevenClueMessage4.position(40, 140);
noteButton72 = createButton("READ NOTE");
noteButton72.mousePressed(showPartialNote)
noteButton72.position(30, 380);
nextButton7_2 = createButton("NEXT CHAPTER");
nextButton7_2.mousePressed(state8)
nextButton7_2.position(130, 380);
state = 7.2;
button6_1.hide();
button6_2.hide();
button7 = createButton("GO TO STATE 8");
button7.mousePressed(state8);
}
function showPartialNote() {
background(depotImage, 255);
fill(120, 120);
noStroke();
rect(30, 130, 560, 245);
sevenClueMessage3.hide();
sevenClueMessage4.hide();
sevenClueMessage5 = createP("Jet black ink covers your palm and fingers. What you’re holding is a handwritten <br>note. You scan the page with the light - the entire message is has been doused in ink, <br>must have been a safety feature of the case. All you can read is '- Brooklyn payphone <br>dial code, platform : Broadway'. Broadway station? The G line! The dispatch <br>payphone must be at Broadway station on the G line. Hurry there isn't much time");
sevenClueMessage5.show();
sevenClueMessage5.style("color", "#FFFFFF");
sevenClueMessage5.position(40, 240);
image(noteInksplot, 40, 40, noteInksplot.width / 8, noteInksplot.height / 8);
sevenClueMessage4 = createP('The numbers glow read. You had one shot and you blew it! Now the lock mechanism <br>is frozen and you’ve been shut out. Then in the distance you see flashlights and <br>hear dogs barking. Have you been discovered? Is this a search team or a team of <br>people here to repair the discarded trains. Whichever the case, you’re not waiting <br>to find out. There’s only one option left - you’ve got to smash it open. You grab <br>a rock and start pounding the screens and dials, trying to break the lock. The <br>latch begins to give way. You put it on the ground and use the heel of your shoe <br>with all your might to pry it open with brute force. Finally the lock cracks and <br>fling open the case. In the dark you fumble for the contents of the case. You <br>grasp something flimsy and damp. In terror, you whip out your flashlight to <br>investigate the fluid. Read the note.');
sevenClueMessage4.style("color", "#FFFFFF");
sevenClueMessage4.show();
}
function state8() {
state8 
- go to the subway platform 
- could go to the wrong platform if you have the wrong information
if (state == 7.2) {
noteButton72.hide();
nextButton7_2.hide();
sevenClueMessage3.hide();
sevenClueMessage4.hide();
} else if (state == 7.1) {
sevenClueMessage1.hide();
sevenClueMessage2.hide();
noteButton.hide();
nextButton7_1.hide();
}
background(staircase, 255);
fill(120, 120);
noStroke();
rect(45, 323, 400, 40);
text8 = createP("Continue by reading the following chapter in the book. <br>When you are instructed, select the button below.");
text8.style("color", "#FFFFFF");
text8.show();
text8.position(50, 308);
nextButton8 = createButton("NEXT CHAPTER");
nextButton8.mousePressed(state9)
nextButton8.position(40, 375);
state = 8;
button7.hide();
button8 = createButton("GO TO STATE 9");
button8.mousePressed(state9);
}
function state9() {
text8.hide();
nextButton8.hide();
state9
** WILL GET CORRECT IF THEY GUESS OR HAVE ALL THE COMPLETE CLUES **  
- enter the numbers into the payphone to the dispatcher 
and wait for the train
state = 9;
background(payphoneImg, 255);
button8.hide();
enter = createButton("ENTER");
enter.mousePressed(myCheckedEvent)
enter.position(250, 310);
fill(120, 120);
noStroke();
rect(45, 340, 435, 60);
fill(120, 255);
noStroke();
rect(198, 100, 180, 200);
checkbox1 = createCheckbox('1', false);
checkbox1.position(220, 120); 
checkbox2 = createCheckbox('2', false);
checkbox2.position(270, 120); 
checkbox3 = createCheckbox('3', false);
checkbox3.position(320, 120); 
checkbox4 = createCheckbox('4', false);
checkbox4.position(220, 170); 
checkbox5 = createCheckbox('5', false);
checkbox5.position(270, 170); 
checkbox6 = createCheckbox('6', false);
checkbox6.position(320, 170); 
checkbox7 = createCheckbox('7', false);
checkbox7.position(220, 220);
checkbox8 = createCheckbox('8', false);
checkbox8.position(270, 220);
checkbox9 = createCheckbox('9', false);
checkbox9.position(320, 220);
checkbox0 = createCheckbox('0', false);
checkbox0.position(270, 270);
dispatchText = createP("Continue by reading the following chapter in the book. <br>When you are instructed, type in the dispatch code");
dispatchText.show();
dispatchText.style("color", "#FFFFFF");
dispatchText.position(55, 340);
button10_1 = createButton("GO TO ENDING 1");
button10_1.mousePressed(state10_1_finale);
button10_2 = createButton("GO TO ENDING 2");
button10_2.mousePressed(state10_2_flop);
}
function myCheckedEvent() { 
if (checkbox4.checked() && checkbox8.checked() && checkbox3.checked() && checkbox2.checked() && checkbox9.checked() && checkbox0.checked()) {
console.log('CORRECT DISPATCH CODE!');
state10_1_finale(); 
} else {
console.log('INCORRECT DISPATCH CODE!');
state10_2_flop();
}
}
function state10_1_finale() {
enter.hide(); 
checkbox1.hide(); 
checkbox2.hide(); 
checkbox3.hide(); 
checkbox4.hide(); 
checkbox5.hide(); 
checkbox6.hide(); 
checkbox7.hide(); 
checkbox8.hide(); 
checkbox9.hide(); 
checkbox0.hide(); 
dispatchText.hide(); 
background(finaleImage, 255);
finalText1 = createP(" ");
finalText2 = createP(" ");
finaleImage, finalText1, finaleText2, finaleText3, nextText1; 
state10.1.finale
** CORRECT they put in the right code && will get the right train **  
- the train pulls up, they get on
- they pixelate into another dimension 
- mystery revealed! Perhaps they see the space aliens and all the things
they have taken and now you know what you have to do. This is just 
the beginning 
state = 10.1;
titleSound.stop();
alienSound.loop();
alienSound.setVolume(0.3);
fill(100, 120); 
rect(25, 25, 550, 450); 
fill(255);
textSize(10);
text('You punch in the numbers. You hear breathing on the other end. “If that’s who I think it is, don’t speak. I’m sending a train to the platform on your left. Get on it. I’m destroying this line.” You get on the train. It pulls out. Your head starts to spin and you black out. When you wakeup, you’re on the cold ground. Someone’s hand is covering your mouth. Your eyes widen in panic and you begin to struggle in the dark. The grip on your face tightens and a voice whispers in your ear. “It’s me. It’s Jerry. I was expecting the inspector but he must have sent you in his place. You nod, hand still restricting your mouth “Is she alive?” You nod again. “Okay then there is much work to do. You need to be completely silent when you see what I’m about to show you. I need you. We must do this together. There isn’t time”. You take a deep breathe through your nose. The air smells like flint and rotting flesh. Where are they? You nod and Jerry slowly releases his grip . Jerry, crouching, crawls over towards the light cast from the other side of a large object. What was this? As you crawl closer you realized that this is a toppled subway train. Are you still in the tunnel? Jerry gestures for you to follow him as he grasped the edge of the car, hoisting himself up just enough to look over the edge, into the light. You follow his lead, heart racing, beating in your ears as you anticipate the scene. You look over, squinting into the brightness. The lights of a car cast a strong light onto the tracks in the middle of a dark subway tunnel. Your jaw drops in horror as your eyes adjust to the light, bringing the movement on the tracks into focus. Dozens of neon red creatures feast in the centre of the tracks, ripping open the chest of subway construction workers, pulling out the organs within with excited abandon. Blood oozes from the bodies, pooling along the tracks, saturating the fur of piles dead rats that lay around them. Gelatinous pods hang above them, dripping liquid that hits the ground sizzling and smoking. Within, small creature wriggle and squirm. Your eyes well from the stench. One, swollen at the neck, stopped eating and let out an ear piercing screech. Spot on their skin coursed electrically. The headlight of the subway waning. From deep within her thoart emerged an slimy egg, ripping past the creature’s long teeth, falling onto the hard ground. A long appendage of the pedulas sacks dripped down, encasing it and slurping it up into their sack. When you can manage to pull your eyes away, you look over to Jerry. They landed three days ago. There were only a few of them, one or two. They tapped into the electrical system and developed this skin tone. They ambushed a train car that I was on, attacking the conductor and leaving three others wounded to die. Two days ago they emerged and killed the rats, ate them and spawned to be ten to twelves creatures. Today they captured an unsuspecting crew of subway workers. They’ve developed a taste for human flesh. There isn’t much time. We need a plan. ', 50, 50, 500, 400);
button10_1.hide();
button10_2.hide();
}
function state10_2_flop() {
enter.hide(); 
checkbox1.hide(); 
checkbox2.hide(); 
checkbox3.hide(); 
checkbox4.hide(); 
checkbox5.hide(); 
checkbox6.hide(); 
checkbox7.hide(); 
checkbox8.hide(); 
checkbox9.hide(); 
checkbox0.hide(); 
dispatchText.hide(); 
background(flopImage, 255);
flopText1 = createP(" ");
flopText2 = createP(" ");
flopText1.position(50, 100);
fill(100, 120); 
rect(25, 25, 550, 450); 
fill(255); 
text('You punch in the code and hear nothing. A dial tone emerges. You say “hello, Jerry is that you, into the phone”. A train pulls up, honking its horn as it pulls into the station. Is this it?? You drop the receiver and board the train nervously. There are many others on the train. You’re the only one drenched in a cold sweat. You try to steady your breathing and take a seat. You don’t want to panic anyone. You need to look normal. The woman next to you shifts over. You realize that the stench of the acidic fluid from the alley has clung to your clothes. You ride the train, stop after stop, each one, waiting for something to happen. At each stop, the doors open, people get off, a few get on and the doors close, just like any normal day. You ride the train all the way to the end of the line. The train pulls up at Church Avenue and everyone gets off. The train conductor comes over the microphone to say that this is the last and final stop. You wait. He repeats this information. You get off with some trepidation, standing on the station, looking left and right. Nothing happens. You cross over to the other side of the platform and ride the train again. Maybe you’re doing this wrong? You ride the entire line, ending up in Queens. You get off the station. A notification comes up on your phone. The inspector was found dead in his house about an hour ago. Unknown causes. Well, your source is gone. Tired and disappointed in yourself, you decided that you may as well visit your parents, who live out this way. If humanity is doomed, you may as well live out the last days with the ones you love. Your stomach tightens and tears well as you rationalize with the idea of death, walking slowly to your parent’s place. You decide you won’t tell them. No sense worrying them about the inevitable. ', 50, 50, 500, 400);
flopImage, flopText1, flopText2, flopText3, nextText2; 
state10.2.flop
** INCORRECT they put in the wrong code && will get the wrong train **  
- the train pulls up, they get on
- they ride the train as usual for three hours and nothing happens 
- the figure out that they must have gotten it wrong 
- end up in queens 
- figure they may as well visit their parents if they're all the way 
out there 
- will always wonder about the mystery and hope it is resolved 
- maybe sees something even more concerning 
- prepares for doom 
state = 10.2;
background(220);
button10_1.hide();
button10_2.hide();
}let img; 
let morsecode;
let button;
var inp;
function preload() {
}
function setup() {
createCanvas(400, 400);
morsecode = loadSound('assets/morsecode.wav', loaded);
button = createButton("play");
button.mousePressed(togglePlaying);
morsecode.setVolume(0.3);
inp = createInput('');
inp.input(myInputEvent);
}
function loaded() {
console.log('loaded');
}
function togglePlaying() {
if (!morsecode.isPlaying()) {
morsecode.play();
morsecode.setVolume(0.3);
button.html("pause");
} else {
morsecode.pause();
button.html("play");
}
}
function myInputEvent() {
}
function draw() {
background(205);
imageMode(CENTER); 
image(img, width/2, 95);
if (inp.value() == 'hidden under the rug') { 
background(0, 255, 0);  
textAlign(CENTER); 
text("you unlocked the cipher!", width/2, 150);
}
}let button0;
let state = 0;
let titlepage, titleSound, beginButton, title;
let citySounds, cityImage, introText, nextButton1;
let usbImage, inputState2, buttonState2, messageState2, results;
let error, bell, audioClue, textClue, playAudioButton;
let glitchBkgd, textNoClue, nextButton;
let inspectorImage, introText4, nextButton4;
let frontdoor, fiveText, fivebutton; 
let text6, slider1, slider2, slider3, slider4, slider5, depotImage, sliderText1, sliderText2, sliderText3, sliderText4, sliderText5;
let col = 200;
let sevenClueMessage1, sevenClueMessage2, noteButton, nextButton7_1, noteVisible;
let noteInksplot, noteButton72, nextButton7_2, sevenClueMessage3, sevenClueMessage4, sevenClueMessage5;
let text8, nextButton8, staircase;
let enter, payphoneImg, dispatchText, checkbox1, checkbox2, checkbox3, checkbox4, checkbox5, checkbox6, checkbox7, checkbox8, checkbox9, checkbox0;
let alienSound, finaleImage, finalText1, finaleText2, finaleText3, nextText1;
let flopImage, flopText1, flopText2, flopText3, nextText2;
function preload() {
usbImage = loadImage('assets/usbImage.jpg');
glitchBkgd = createImg("assets/incorrect.gif");
glitchBkgd.hide();
bell = loadSound('assets/bell.mp3');
error = loadSound('assets/error.mp3');
audioClue = loadSound('assets/explosionSound.mp3');
titlepage = loadImage("titlepage.jpg");
titleSound = loadSound('assets/shortTitleSound.m4a');
cityImage = loadImage("cityImage.jpg");
citySounds = loadSound('assets/citySounds.m4a');
inspectorImage = loadImage('assets/inspectorImage.jpg');
finaleImage = loadImage('assets/finaleImage.jpg');
flopImage = loadImage('assets/flopImage.jpg');
staircase = loadImage('assets/staircase.jpg');
depotImage = loadImage('assets/depotImage.jpg');
noteVisible = loadImage('assets/briefcaseVisible.jpg');
noteInksplot = loadImage('assets/briefcaseInksplot.jpg');
payphoneImg = loadImage('assets/payphones.jpg');
frontdoor = loadImage('assets/frontdoor.jpg');
alienSound = loadSound('assets/alienSound.mp3');
}
function setup() {
createCanvas(640 ,  426);
background(220);
textAlign(CENTER);
background(titlepage, 255);
titleSound.loop();
titleSound.setVolume(0.2);
beginButton = createButton("B E G I N");
beginButton.mousePressed(state1);
beginButton.position(width / 2 - 29, 280);
fill(147, 143, 143);
noStroke();
rect(280, 170, 80, 30);
fill(147, 143, 143, 170);
noStroke();
rect(199, 145, 236, 117);
title = createElement('h1', 'A PORTAL <br>WAITS IN <br>BROOKLYN');
title.position(220, 130);
}
function draw() {
console.log(state);
}
function state1() {
state0
- determine problem that must be solved
- set the scene 
- describe the character 
ASSETS & PLOT 
- audio of street sounds and walking 
- image of the city in the early evening 
- recounting the story of what happened that morning 
titleSound.stop();
beginButton.hide();
title.hide();
background(cityImage, 255);
citySounds.loop();
citySounds.setVolume(0.2);
introText = createP("Begin by reading chapter one in the accompanying book. <br>When you are prompted, select the button below marked, 'NEXT CHAPTER'.");
introText.style("color", "#ccc9c5");
introText.show();
introText.position(60, 308);
nextButton1 = createButton("NEXT CHAPTER");
nextButton1.mousePressed(state2)
nextButton1.position(50, 375);
state1
** something happens that subtly reveals the password **  
- need to get a clue
- someone gives you an encrypted USB 
- returns to the scene of it 
state = 1;
fill(0);
}
function state2() {
nextButton1.hide();
introText.hide();
state2 
- you have to enter the password into a text box 
state = 2;
background(usbImage, 255);
citySounds.stop();
inputState2 = createInput('PROPERTY OF INSP HUDSON');
inputState2.position(80, 300);
inputState2.size(170, 15);
buttonState2 = createButton('unlock');
buttonState2.position(inputState2.x + inputState2.width + 5, 297);
buttonState2.mousePressed(checkResults);
messageState2 = createElement('h4', 'file encrypted');
messageState2.position(80, 258);
}
function checkResults() {
results = inputState2.value();
if (results == 'donut') {
bell.play();
bell.setVolume(0.3);
state3_1_clue();
} else if (results != 'donut') {
error.play();
error.setVolume(0.3);
state3_2_noClue();
}
}
function state3_1_clue() {
buttonState2.hide();
inputState2.hide();
messageState2.html('USB UNLOCKED!');
messageState2.position(30, 245);
textClue = createP("You decrypted the USB! You find an audio file labeled '6 <br>digit dispatch code'. Whatever it is, it’s important enough for the <br>Inspector to encrypt. You play the 1st second and recognize the voice <br>as Inspector Jerry Stills,  Inspector Hudson’s detective partner who has <br>been missing since last week! Play the audio file.Take notes if you need to.");
textClue.show();
textClue.position(30, 270);
playAudioButton = createButton("PLAY AUDIO FILE");
playAudioButton.mousePressed(togglePlaying)
playAudioButton.position(30, 385);
nextButton = createButton("NEXT CHAPTER");
nextButton.mousePressed(state4)
nextButton.position(160, 385);
state3.1.clue
** CORRECT they got password right! **  
- unlocks an audio file 
- gives you valuable information ABOUT ABOUT ABOUT ABOUT ?????????
- maybe this gives you the first 3 digits of a 6 digit number 
state = 3.1;
background(usbImage, 255);
}
function togglePlaying() {
textClue.hide(); 
audioText = createP('You hear the sound of Inspector Jerry speaking nervously <br>on what seems to be a voice mail. He’s out of breath and speaking <br>rapidly about a payphone that he wants Hudson to use. “Dial 4 - 8 - 3” <br>- the message it cut off by a loud bang and screaming before the track <br>cuts out. '); 
audioText.position(30, 270);
if (!audioClue.isPlaying()) {
audioClue.play();
audioClue.setVolume(0.3);
playAudioButton.html("PAUSE AUDIO FILE");
} else {
audioClue.pause();
playAudioButton.html("PLAY AUDIO FILE");
}
}
function state3_2_noClue() {
state3.2.noClue
** INCORRECT they got password wrong **  
- USB unreadable or it self destructs 
- no valuable information or maybe just fragment information
inputState2.hide();
buttonState2.hide();
messageState2.position(30, 270);
messageState2.html('HACK DETECTED. USB WILL SELF DESTRUCT');
glitchBkgd.show();
glitchBkgd.position(0, 0);
textNoClue = createP('What have you done?! You entered in the wrong password and <br>lost access to this file! There goes that clue! Hopefully you can <br>get by without it... The USB is getting hot to the touch. You wrap <br>the end of your shirt around your fingers pull it out of the laptop.');
textNoClue.show();
textNoClue.position(30, 295);
nextButton = createButton("NEXT CHAPTER");
nextButton.mousePressed(state4)
nextButton.position(30, 390);
state = 3.2;
}
function state4() {
state4
** NOTE player either has a clue or doesn't **  
- more scene setting 
- something happens kind of obvious happens to give you 
the password to the door knocking cypher 
if (state == 3.2) {
messageState2.hide();
glitchBkgd.hide();
textNoClue.hide();
nextButton.hide();
} else if (state == 3.1) {
messageState2.hide();
textClue.hide();
audioText.hide(); 
playAudioButton.hide();
nextButton.hide();
}
state = 4;
background(inspectorImage, 255);
citySounds.loop();
citySounds.setVolume(0.2);
fill(120, 120);
noStroke();
rect(45, 323, 450, 40);
introText4 = createP("Continue by reading the following chapter in the book. <br>When you are prompted, return here and select the button below.");
introText4.style("color", "#FFFFFF");
introText4.show();
introText4.position(50, 308);
nextButton4 = createButton("NEXT CHAPTER");
nextButton4.mousePressed(state5)
nextButton4.position(40, 375);
}
function state5() {
introText4.hide();
nextButton4.hide();
state5  
- need another clue 
- door knocking morse code
- listen and respond
** user must get this one correct ** 
- maybe hints? 
state = 5;
background(frontdoor, 255);
fill(120, 250);
noStroke();
rect(45, 323, 450, 40);
fiveText = createP("Continue by reading the following chapter in the book. <br>When you are prompted, return here and select the button below.");
fiveText.style("color", "#FFFFFF");
fiveText.show();
fiveText.position(50, 308);
fivebutton = createButton("NEXT CHAPTER");
fivebutton.mousePressed(state6)
fivebutton.position(40, 375);
}
function state6() {
state6
- the person on the other side of the door gives you a locked box 
with sliders 
- have to unlock the numbers on the sliders using clues from 
observations 
- need a "unlock" or "submit" button to test their answer 
fiveText.hide(); 
fivebutton.hide(); 
background(depotImage, 255);
citySounds.stop();
titleSound.loop();
titleSound.setVolume(0.2);
fill(120, 120);
noStroke();
rect(45, 323, 285, 60);
text6 = createP("Continue by reading the following chapter <br>in the book. When you are instructed, <br>unlock the briefcase.");
text6.style("color", "#FFFFFF");
text6.show();
text6.position(50, 308);
slider1 = createSlider(0, 100, 50);
slider1.position(width / 2, height / 2 + 105);
slider1.style('width', '100px');
slider1.style('color', 0);
slider1.style('rotate', 90);
slider1.changed(mySelectEvent);
slider2 = createSlider(0, 100, 50);
slider2.position(width / 2 + 20, height / 2 + 105);
slider2.style('width', '100px');
slider2.style('rotate', 90);
slider2.changed(mySelectEvent);
slider3 = createSlider(0, 100, 50);
slider3.position(width / 2 + 40, height / 2 + 105);
slider3.style('width', '100px');
slider3.style('rotate', 90);
slider3.changed(mySelectEvent);
slider4 = createSlider(0, 100, 50);
slider4.position(width / 2 + 60, height / 2 + 105);
slider4.style('width', '100px');
slider4.style('rotate', 90);
slider4.changed(mySelectEvent);
slider5 = createSlider(0, 100, 50);
slider5.position(width / 2 + 80, height / 2 + 105);
slider5.style('width', '100px');
slider5.style('rotate', 90);
slider5.changed(mySelectEvent);
fill(col);
rect(width / 2 + 43, height / 2 + 35, 16, 16);
rect(width / 2 + 63, height / 2 + 35, 16, 16);
rect(width / 2 + 83, height / 2 + 35, 16, 16);
rect(width / 2 + 103, height / 2 + 35, 16, 16);
rect(width / 2 + 123, height / 2 + 35, 16, 16);
fill(0);
text((slider1.value()), width / 2 + 51, height / 2 + 47);
text((slider2.value()), width / 2 + 71, height / 2 + 47);
text((slider3.value()), width / 2 + 91, height / 2 + 47);
text((slider4.value()), width / 2 + 111, height / 2 + 47);
text((slider5.value()), width / 2 + 131, height / 2 + 47);
caseButton = createButton('unlock briefcase');
caseButton.position(width / 2 + 36, height / 2 + 175);
caseButton.mousePressed(checkCaseResults);
state = 6;
}
function checkCaseResults() {
let code1 = 20;
let code2 = 18;
let code3 = 63;
let code4 = 90;
let code5 = 3;
var cipher1 = slider1.value();
var cipher2 = slider2.value();
var cipher3 = slider3.value();
var cipher4 = slider4.value();
var cipher5 = slider5.value();
if (cipher1 == code1 && cipher2 == code2 && cipher3 == code3 && cipher4 == code4 && cipher5 == code5) {
bell.play();
bell.setVolume(0.3);
state7_1_clue();
} else {
error.play();
error.setVolume(0.3);
state7_2_noClue();
}
}
function mySelectEvent() {
fill(col);
rect(width / 2 + 43, height / 2 + 35, 16, 16);
rect(width / 2 + 63, height / 2 + 35, 16, 16);
rect(width / 2 + 83, height / 2 + 35, 16, 16);
rect(width / 2 + 103, height / 2 + 35, 16, 16);
rect(width / 2 + 123, height / 2 + 35, 16, 16);
fill(0);
text((slider1.value()), width / 2 + 51, height / 2 + 47);
text((slider2.value()), width / 2 + 71, height / 2 + 47);
text((slider3.value()), width / 2 + 91, height / 2 + 47);
text((slider4.value()), width / 2 + 111, height / 2 + 47);
text((slider5.value()), width / 2 + 131, height / 2 + 47);
}
function state7_1_clue() {
state7.1.clue
** CORRECT they got sliders right! **  
- unlocks a message that you read with a flashlight 
- gives you valuable information ABOUT ABOUT ABOUT ABOUT ?????????
- maybe this gives you the second 3 digits of a 6 digit number 
text6.hide();
caseButton.hide();
slider1.hide();
slider2.hide();
slider3.hide();
slider4.hide();
slider5.hide();
state = 7.1;
background(depotImage, 255);
fill(120, 120);
noStroke();
rect(30, 305, 510, 65);
sevenClueMessage1 = createP('UNLOCKED SUCCESSFULLY');
sevenClueMessage1.style("color", "#FFFFFF");
sevenClueMessage1.show();
sevenClueMessage1.position(30, 270);
sevenClueMessage2 = createP('You can hear the voices and dogs getting closer. Your heart races as you fling <br>open the lid of the briefcase. Inside you find a single piece of paper with a <br>message scrawled across it. You pull out your flashlight to read the note.');
sevenClueMessage2.style("color", "#FFFFFF");
sevenClueMessage2.show();
sevenClueMessage2.position(40, 295);
noteButton = createButton("READ NOTE");
noteButton.mousePressed(showNote)
noteButton.position(30, 380);
nextButton7_1 = createButton("NEXT CHAPTER");
nextButton7_1.mousePressed(state8)
nextButton7_1.position(130, 380);
}
function showNote() {
background(depotImage, 255);
image(noteVisible, 40, 40, noteVisible.width / 10, noteVisible.height / 10);
}
function state7_2_noClue() {
state7.2.noClue
** INCORRECT they got sliders wrong **  
- decide to smash it to get inside 
- an ink well bursts and covers the message
- you get a fragment of it, the location "platform 9, Lafayette" 
text6.hide();
caseButton.hide();
slider1.hide();
slider2.hide();
slider3.hide();
slider4.hide();
slider5.hide();
background(depotImage, 255);
fill(120, 120);
noStroke();
rect(30, 130, 560, 245);
sevenClueMessage3 = createP('HACK DETECTED!');
sevenClueMessage3.style("color", "#FFFFFF");
sevenClueMessage3.show();
sevenClueMessage3.position(30, 120);
sevenClueMessage4 = createP('The numbers glow read. You had one shot and you blew it! Now the lock mechanism <br>is frozen and you’ve been shut out. Then in the distance you see flashlights and <br>hear dogs barking. Have you been discovered? Is this a search team or a team of <br>people here to repair the discarded trains. Whichever the case, you’re not waiting <br>to find out. There’s only one option left - you’ve got to smash it open. You grab <br>a rock and start pounding the screens and dials, trying to break the lock. The <br>latch begins to give way. You put it on the ground and use the heel of your shoe <br>with all your might to pry it open with brute force. Finally the lock cracks and <br>fling open the case. In the dark you fumble for the contents of the case. You <br>grasp something flimsy and damp. In terror, you whip out your flashlight to <br>investigate the fluid. Read the note.');
sevenClueMessage4.style("color", "#FFFFFF");
sevenClueMessage4.show();
sevenClueMessage4.position(40, 140);
noteButton72 = createButton("READ NOTE");
noteButton72.mousePressed(showPartialNote)
noteButton72.position(30, 380);
nextButton7_2 = createButton("NEXT CHAPTER");
nextButton7_2.mousePressed(state8)
nextButton7_2.position(130, 380);
state = 7.2;
}
function showPartialNote() {
background(depotImage, 255);
fill(120, 120);
noStroke();
rect(30, 130, 560, 245);
sevenClueMessage3.hide();
sevenClueMessage4.hide();
sevenClueMessage5 = createP("Jet black ink covers your palm and fingers. What you’re holding is a handwritten <br>note. You scan the page with the light - the entire message is has been doused in ink, <br>must have been a safety feature of the case. All you can read is '- Brooklyn payphone <br>dial code, platform : Broadway'. Broadway station? The G line! The dispatch <br>payphone must be at Broadway station on the G line. Hurry there isn't much time");
sevenClueMessage5.show();
sevenClueMessage5.style("color", "#FFFFFF");
sevenClueMessage5.position(40, 240);
image(noteInksplot, 40, 40, noteInksplot.width / 8, noteInksplot.height / 8);
sevenClueMessage4 = createP('The numbers glow read. You had one shot and you blew it! Now the lock mechanism <br>is frozen and you’ve been shut out. Then in the distance you see flashlights and <br>hear dogs barking. Have you been discovered? Is this a search team or a team of <br>people here to repair the discarded trains. Whichever the case, you’re not waiting <br>to find out. There’s only one option left - you’ve got to smash it open. You grab <br>a rock and start pounding the screens and dials, trying to break the lock. The <br>latch begins to give way. You put it on the ground and use the heel of your shoe <br>with all your might to pry it open with brute force. Finally the lock cracks and <br>fling open the case. In the dark you fumble for the contents of the case. You <br>grasp something flimsy and damp. In terror, you whip out your flashlight to <br>investigate the fluid. Read the note.');
sevenClueMessage4.style("color", "#FFFFFF");
sevenClueMessage4.show();
}
function state8() {
state8 
- go to the subway platform 
- could go to the wrong platform if you have the wrong information
if (state == 7.2) {
noteButton72.hide();
nextButton7_2.hide();
sevenClueMessage3.hide();
sevenClueMessage4.hide();
} else if (state == 7.1) {
sevenClueMessage1.hide();
sevenClueMessage2.hide();
noteButton.hide();
nextButton7_1.hide();
}
background(staircase, 255);
fill(120, 120);
noStroke();
rect(45, 323, 400, 40);
text8 = createP("Continue by reading the following chapter in the book. <br>When you are instructed, select the button below.");
text8.style("color", "#FFFFFF");
text8.show();
text8.position(50, 308);
nextButton8 = createButton("NEXT CHAPTER");
nextButton8.mousePressed(state9)
nextButton8.position(40, 375);
state = 8;
}
function state9() {
text8.hide();
nextButton8.hide();
state9
** WILL GET CORRECT IF THEY GUESS OR HAVE ALL THE COMPLETE CLUES **  
- enter the numbers into the payphone to the dispatcher 
and wait for the train
state = 9;
background(payphoneImg, 255);
enter = createButton("ENTER");
enter.mousePressed(myCheckedEvent)
enter.position(250, 310);
fill(120, 120);
noStroke();
rect(45, 340, 435, 60);
fill(120, 255);
noStroke();
rect(198, 100, 180, 200);
checkbox1 = createCheckbox('1', false);
checkbox1.position(220, 120); 
checkbox2 = createCheckbox('2', false);
checkbox2.position(270, 120); 
checkbox3 = createCheckbox('3', false);
checkbox3.position(320, 120); 
checkbox4 = createCheckbox('4', false);
checkbox4.position(220, 170); 
checkbox5 = createCheckbox('5', false);
checkbox5.position(270, 170); 
checkbox6 = createCheckbox('6', false);
checkbox6.position(320, 170); 
checkbox7 = createCheckbox('7', false);
checkbox7.position(220, 220);
checkbox8 = createCheckbox('8', false);
checkbox8.position(270, 220);
checkbox9 = createCheckbox('9', false);
checkbox9.position(320, 220);
checkbox0 = createCheckbox('0', false);
checkbox0.position(270, 270);
dispatchText = createP("Continue by reading the following chapter in the book. <br>When you are instructed, type in the dispatch code");
dispatchText.show();
dispatchText.style("color", "#FFFFFF");
dispatchText.position(55, 340);
}
function myCheckedEvent() { 
if (checkbox4.checked() && checkbox8.checked() && checkbox3.checked() && checkbox2.checked() && checkbox9.checked() && checkbox0.checked()) {
console.log('CORRECT DISPATCH CODE!');
state10_1_finale(); 
} else {
console.log('INCORRECT DISPATCH CODE!');
state10_2_flop();
}
}
function state10_1_finale() {
enter.hide(); 
checkbox1.hide(); 
checkbox2.hide(); 
checkbox3.hide(); 
checkbox4.hide(); 
checkbox5.hide(); 
checkbox6.hide(); 
checkbox7.hide(); 
checkbox8.hide(); 
checkbox9.hide(); 
checkbox0.hide(); 
dispatchText.hide(); 
background(finaleImage, 255);
finalText1 = createP(" ");
finalText2 = createP(" ");
finaleImage, finalText1, finaleText2, finaleText3, nextText1; 
state10.1.finale
** CORRECT they put in the right code && will get the right train **  
- the train pulls up, they get on
- they pixelate into another dimension 
- mystery revealed! Perhaps they see the space aliens and all the things
they have taken and now you know what you have to do. This is just 
the beginning 
state = 10.1;
titleSound.stop();
alienSound.loop();
alienSound.setVolume(0.3);
fill(100, 120); 
rect(25, 25, 550, 450); 
fill(255);
textSize(10);
text('You punch in the numbers. You hear breathing on the other end. “If that’s who I think it is, don’t speak. I’m sending a train to the platform on your left. Get on it. I’m destroying this line.” You get on the train. It pulls out. Your head starts to spin and you black out. When you wakeup, you’re on the cold ground. Someone’s hand is covering your mouth. Your eyes widen in panic and you begin to struggle in the dark. The grip on your face tightens and a voice whispers in your ear. “It’s me. It’s Jerry. I was expecting the inspector but he must have sent you in his place. You nod, hand still restricting your mouth “Is she alive?” You nod again. “Okay then there is much work to do. You need to be completely silent when you see what I’m about to show you. I need you. We must do this together. There isn’t time”. You take a deep breathe through your nose. The air smells like flint and rotting flesh. Where are they? You nod and Jerry slowly releases his grip . Jerry, crouching, crawls over towards the light cast from the other side of a large object. What was this? As you crawl closer you realized that this is a toppled subway train. Are you still in the tunnel? Jerry gestures for you to follow him as he grasped the edge of the car, hoisting himself up just enough to look over the edge, into the light. You follow his lead, heart racing, beating in your ears as you anticipate the scene. You look over, squinting into the brightness. The lights of a car cast a strong light onto the tracks in the middle of a dark subway tunnel. Your jaw drops in horror as your eyes adjust to the light, bringing the movement on the tracks into focus. Dozens of neon red creatures feast in the centre of the tracks, ripping open the chest of subway construction workers, pulling out the organs within with excited abandon. Blood oozes from the bodies, pooling along the tracks, saturating the fur of piles dead rats that lay around them. Gelatinous pods hang above them, dripping liquid that hits the ground sizzling and smoking. Within, small creature wriggle and squirm. Your eyes well from the stench. One, swollen at the neck, stopped eating and let out an ear piercing screech. Spot on their skin coursed electrically. The headlight of the subway waning. From deep within her thoart emerged an slimy egg, ripping past the creature’s long teeth, falling onto the hard ground. A long appendage of the pedulas sacks dripped down, encasing it and slurping it up into their sack. When you can manage to pull your eyes away, you look over to Jerry. They landed three days ago. There were only a few of them, one or two. They tapped into the electrical system and developed this skin tone. They ambushed a train car that I was on, attacking the conductor and leaving three others wounded to die. Two days ago they emerged and killed the rats, ate them and spawned to be ten to twelves creatures. Today they captured an unsuspecting crew of subway workers. They’ve developed a taste for human flesh. There isn’t much time. We need a plan. ', 50, 50, 500, 400);
}
function state10_2_flop() {
enter.hide(); 
checkbox1.hide(); 
checkbox2.hide(); 
checkbox3.hide(); 
checkbox4.hide(); 
checkbox5.hide(); 
checkbox6.hide(); 
checkbox7.hide(); 
checkbox8.hide(); 
checkbox9.hide(); 
checkbox0.hide(); 
dispatchText.hide(); 
state = 10.2;
background(flopImage, 255);
fill(100, 120); 
rect(25, 25, 550, 450); 
fill(255); 
text('You punch in the code and hear nothing. A dial tone emerges. You say “hello, Jerry is that you, into the phone”. A train pulls up, honking its horn as it pulls into the station. Is this it?? You drop the receiver and board the train nervously. There are many others on the train. You’re the only one drenched in a cold sweat. You try to steady your breathing and take a seat. You don’t want to panic anyone. You need to look normal. The woman next to you shifts over. You realize that the stench of the acidic fluid from the alley has clung to your clothes. You ride the train, stop after stop, each one, waiting for something to happen. At each stop, the doors open, people get off, a few get on and the doors close, just like any normal day. You ride the train all the way to the end of the line. The train pulls up at Church Avenue and everyone gets off. The train conductor comes over the microphone to say that this is the last and final stop. You wait. He repeats this information. You get off with some trepidation, standing on the station, looking left and right. Nothing happens. You cross over to the other side of the platform and ride the train again. Maybe you’re doing this wrong? You ride the entire line, ending up in Queens. You get off the station. A notification comes up on your phone. The inspector was found dead in his house about an hour ago. Unknown causes. Well, your source is gone. Tired and disappointed in yourself, you decided that you may as well visit your parents, who live out this way. If humanity is doomed, you may as well live out the last days with the ones you love. Your stomach tightens and tears well as you rationalize with the idea of death, walking slowly to your parent’s place. You decide you won’t tell them. No sense worrying them about the inevitable. ', 50, 50, 500, 400);
flopImage, flopText1, flopText2, flopText3, nextText2; 
state10.2.flop
** INCORRECT they put in the wrong code && will get the wrong train **  
- the train pulls up, they get on
- they ride the train as usual for three hours and nothing happens 
- the figure out that they must have gotten it wrong 
- end up in queens 
- figure they may as well visit their parents if they're all the way 
out there 
- will always wonder about the mystery and hope it is resolved 
- maybe sees something even more concerning 
- prepares for doom 
}let img; 
let morsecode;
let button;
var inp;
function preload() {
}
function setup() {
createCanvas(400, 400);
morsecode = loadSound('assets/morsecode.wav', loaded);
button = createButton("play");
button.mousePressed(togglePlaying);
morsecode.setVolume(0.3);
inp = createInput('');
inp.input(myInputEvent);
}
function loaded() {
console.log('loaded');
}
function togglePlaying() {
if (!morsecode.isPlaying()) {
morsecode.play();
morsecode.setVolume(0.3);
button.html("pause");
} else {
morsecode.pause();
button.html("play");
}
}
function myInputEvent() {
console.log('you are typing: ', this.value());
}
function draw() {
background(205);
imageMode(CENTER); 
image(img, width/2, 95);
if (inp.value() == 'hidden under the rug') { 
background(0, 255, 0);  
textAlign(CENTER); 
text("you unlocked the cipher!", width/2, 150);
}
}let w1 = 40; 
let h1 = 20; 
let w2 = 80; 
let h2 = 40;
let w3 = 120; 
let h3 = 60;
let radio;
let val; 
let a1 = 0; 
let a2 = 0; 
let a3 = 0;  
function setup() {
createCanvas(400, 400);
radio = createRadio();
radio.option('small');
radio.option('medium');
radio.option('large');
radio.style('width', '400px');
next.hide();
}
function draw() {
background(204);
textAlign(CENTER); 
text("NORTH", width/2, 80);
text("SOUTH", width/2, height-80);
text("EAST", width-70, height/2);
text("WEST", 70, height/2);
val = radio.value();
console.log(val);
if(val == 'small' && mouseIsPressed){ 
a1 = atan2(mouseY - height / 2, mouseX - width / 2);
}  
else if(val == 'medium' && mouseIsPressed){ 
a2 = atan2(mouseY - height / 2, mouseX - width / 2);
}  
else if(val == 'large' && mouseIsPressed){ 
a3 = atan2(mouseY - height / 2, mouseX - width / 2);
}
translate(width / 2, height / 2);
text('large rect = ' + floor(a3), 125, 185);
text('medium rect = ' + floor(a2), 0, 185);
text('small rect = ' + floor(a1), -125, 185);
if(floor(a1) == 10 && floor(a2) == 20 && floor(a3) == 30) { 
background(0, 255, 0);
text("you unlocked the cipher!", 100, 150);
next.show(); 
} 
push();
rotate(a3);
console.log('large ' + a3); 
pop();
push();
rotate(a2);
console.log('medium ' + a2); 
pop();
push();
rotate(a1);
console.log('small ' + a1); 
pop();
}var slider1;
var slider2;
var slider3;
var slider4;
var slider5;
var code1 = 20;
var code2 = 10;
var code3 = 30; 
var code4 = 5;
var code5 = 60;
var next; 
function setup() {
createCanvas(200, 200);
background(200);
textAlign(CENTER);
slider1 = createSlider(0, 100, 50);
slider1.position(10, 10);
slider1.style('width', '80px');
slider2 = createSlider(0, 100, 50);
slider2.position(10, 30);
slider2.style('width', '80px');
slider3 = createSlider(0, 100, 50);
slider3.position(10, 50);
slider3.style('width', '80px');
slider4 = createSlider(0, 100, 50);
slider4.position(10, 70);
slider4.style('width', '80px');
slider5 = createSlider(0, 100, 50);
slider5.position(10, 90);
slider5.style('width', '80px');
text((slider1.value()), 125, 25);
slider1.changed(mySelectEvent);
text((slider2.value()), 125, 45);
slider2.changed(mySelectEvent);
text((slider3.value()), 125, 65);
slider3.changed(mySelectEvent);
text((slider4.value()), 125, 85);
slider4.changed(mySelectEvent);
text((slider5.value()), 125, 105);
slider5.changed(mySelectEvent);
next.hide(); 
}
function mySelectEvent() {
background(200);
text((slider1.value()), 125, 25);
text((slider2.value()), 125, 45);
text((slider3.value()), 125, 65);
text((slider4.value()), 125, 85);
text((slider5.value()), 125, 105);
}
function draw() {
var cipher1 = slider1.value();
var cipher2 = slider2.value();
var cipher3 = slider3.value();
var cipher4 = slider4.value();
var cipher5 = slider5.value();
if (cipher1 == code1 && cipher2 == code2 && cipher3 == code3 && cipher4 == code4 && cipher5 == code5) {
background(0, 255, 0);
text("you unlocked the cipher!", 100, 150);
next.show(); 
} else {
mySelectEvent();
text("unlock the cipher!", 100, 150);
next.hide(); 
}
}var playing = false;
var song;
var button;
function preload(){
song2 = loadSound('Survivor.mp3');
}
function setup() {
song = loadSound('YOU GOT THIS.mp3');
button = createButton('play');
song2.play();
createCanvas(720, 200);
background(255,0,0);
}
function mousePressed() {
song.stop();
background(255,0,0);
} else {
song.play();
background(0,255,0);
}
}
function song() {
if (playing) {
song.pause();
button.html('play');
} else {
song2.loop();
button.html('pause');
}
playing = !playing;
}
var playing = false;
var song;
var button;
let yayGif=false;
var apiKey = "&api_key=ZODW2ISwiqn3wnxRVs3SvVdJJf6Kmr18";
var query = "&q=you-got-this";
var gifs=[];
function preload(){
song2 = loadSound('assets/Survivor.mp3');
}
function setup() {
noCanvas();
song = loadSound('assets/YOU GOT THIS.mp3');
button = createButton('play');
song2.play();
background(255,0,0);
var url = api+apiKey+query;
loadJSON(url,gotGiphyData);
console.log(gotGiphyData);
}
function serverConnected() {
}
function gotList(thelist) {
for (var i = 0; i < thelist.length; i++) {
}
}
function gotOpen() {
}
function gotError(theerror) {
}
function gotData() {
}
function gotRawData(thedata) {
}
function mousePressed() {
song.stop();
background(255,0,0);
} else {
song.play();
background(0,255,0);
}
}
function gotGiphyData(giphy){
yayGif = giphy.data[floor(random(0, 5))].images.original.url;
}
function draw() {
background(255,255,255);
fill(0,0,0);
var avData = 0;
var totData = 0;
console.log("the button value is" + latestData); 
if(gotGiphyData) { 
if(latestData == 0 ) { 
fill(255, 0, 0); 
song.stop();
} else if(latestData == 1) { 
fill(0, 255, 0); 
push();
createImg(yayGif);
song.play();
pop();
}
ellipse(50, 50, 50, 50);
text('button = ' + latestData, 10, 10);
}
}
}
}let input;
let img;
let bkg; 
function setup() {
createCanvas(600, 400); 
input = createFileInput(handleFile);
input.position(0, height);
bkg = loadImage('assets/IMG_2511.JPG');
background(bkg, 0); 
}
function draw() {
background(bkg, 255); 
if (img) {
image(img, 0, 0, img.width, img.height);
}
}
function handleFile(file) {
if (file.type === 'image') {
img = createImg(file.data);
img.hide();
}
let video;
let song;
let vScale = 20;
let fft;
let sliderSpeed;
let radio;
function setup() {
createCanvas(640, 480);
fft = new p5.FFT();
pixelDensity(1);
video = createCapture(VIDEO);
video.size(width / vScale, height / vScale);
song = loadSound('assets/Happy.mp3', loaded);
sliderSpeed = createSlider(0.5, 2, 1, 0.01);
radio = createRadio();
radio.option('circles', 1);
radio.option('squares', 2);
textAlign(CENTER);
}
function loaded() {
song.loop();
}
function draw() {
background(255);
song.rate(sliderSpeed.value());
fft.analyze();
bassVal = (int)(fft.getEnergy("bass"));
midVal = (int)(fft.getEnergy("mid"));
trebVal = (int)(fft.getEnergy("treble"));
video.loadPixels();
loadPixels();
for (let y = 0; y < video.height; y++) {
for (let x = 0; x < video.width; x++) {
let index = (video.width - x + 1 + (y * video.width)) * 4;
let r = video.pixels[index + 0];
let g = video.pixels[index + 1];
let b = video.pixels[index + 2];
let a = video.pixels[index + 3];
var bright = (r + g + b) / 3;
var w = map(bright, 0, 255, 0, vScale);
noStroke();
rectMode(CENTER);
ellipseMode(CENTER);
let val = radio.value();
if (val == 1) {
if (w > 10) {
fill(r, trebVal, b, 100);
ellipse(x * vScale, y * vScale, trebVal / 2, trebVal / 2);
} else if (w > 5 && w < 10) {
fill(r, g, midVal, 100);
ellipse(x * vScale, y * vScale, midVal / 3, midVal / 3);
} else if (w > 0 && w < 5) {
fill(bassVal / 5, g, b, 100);
ellipse(x * vScale, y * vScale, bassVal / 5, bassVal / 5);
}
} else {
if (w > 10) {
fill(r, trebVal, b, 100);
rect(x * vScale, y * vScale, trebVal / 2, trebVal / 2);
} else if (w > 5 && w < 10) {
fill(r, g, midVal, 100);
rect(x * vScale, y * vScale, midVal / 3, midVal / 3);
} else if (w > 0 && w < 5) {
fill(bassVal / 5, g, b, 100);
rect(x * vScale, y * vScale, bassVal / 5, bassVal / 5);
}
}
}
}
}let song;
let button;
function setup() {
createCanvas(600, 400);
pixelDensity(1);
song = loadSound('assets/hold_on_alabama_shakes.mp3', loaded);
amp = new p5.Amplitude();
song.setVolume(0.2);
}
function loaded() {
console.log('loaded');
button = createButton("play");
button.mousePressed(togglePlaying);
}
function togglePlaying() {
if (!song.isPlaying()) {
song.play();
song.setVolume(0.3);
button.html("pause");
} else {
song.pause();
button.html("play");
}
}
function draw() {
background(51);
loadPixels();
for (let y = 0; y < height; y++) {
for (let x = 0; x < width; x++) {
let index = (x + y * width) * 4;
let vol = amp.getLevel();
let redMix = map(vol, 0, 0.3, 10, 255);
pixels[index + 0] = redMix;
pixels[index + 1] = (x+y)/4;
pixels[index + 2] = y;
pixels[index + 3] = 255;
}
}
updatePixels();
}let song;
let button;
let fft;
let volHistory = []; 
function toggleSong() {
if (song.isPlaying()) {
song.pause();
} else {
song.play();
}
}
function preload() {
song = loadSound('hold_on_alabama_shakes.mp3');
}
function setup() {
createCanvas(400, 400);
button = createButton('toggle');
button.mousePressed(toggleSong);
song.play();
fft = new p5.FFT(0, 512); 
w = width / 64; 
}
function draw() {
background(0);
let spectrum = fft.analyze();
console.log(spectrum.length); 
stroke(255); 
for(let i = 0; i < spectrum.length; i++) { 
let amp = spectrum[i]; 
let y = map(amp, 0, 255, height, 0); 
line(i * w, height, i * w, y); 
}
}let song;
let button;
let amp;
let volHistory = []; 
function toggleSong() {
if (song.isPlaying()) {
song.pause();
} else {
song.play();
}
}
function preload() {
song = loadSound('hold_on_alabama_shakes.mp3');
}
function setup() {
createCanvas(400, 400);
button = createButton('toggle');
button.mousePressed(toggleSong);
song.play();
amp = new p5.Amplitude(); 
}
function draw() {
background(220);
let vol = amp.getLevel();
console.log(vol);
volHistory.push(vol); 
noFill(); 
beginShape(); 
for(let i = 0; i < volHistory.length; i++) { 
let y = map(volHistory[i], 0, 1, height/2, 0); 
vertex(i, y); 
}
endShape(); 
if(volHistory.length > width) { 
volHistory.splice(0, 1); 
}
}let deck = new Deck(160, 10);
function setup() {
createCanvas(600, 400);
}
function draw() {
background(50);
deck.run();
}
let mic; 
function setup() {
createCanvas(400, 400);
mic = new p5.AudioIn(); 
mic.start(); 
}
function draw() {
background(220);
let vol = mic.getLevel(); 
ellipse(100, 100, vol*200, vol*200); 
console.log(vol); 
let wave;
let button;
let playing = false;
let slider; 
let env; 
function setup() {
createCanvas(100, 100);
env = new p5.Envelope(); 
env.setADSR(0.5, 0.1, 0.5, 1); 
env.setRange(1.2, 0); 
wave = new p5.Oscillator();
wave.setType('triangle');
wave.start();
wave.amp(env);
wave.freq(440);
button = createButton('play/pause');
button.mousePressed(toggle);
slider = createSlider(100, 1200, 440);
}
function draw() {
background(220);
wave.freq(slider.value()); 
if (playing) {
background(255, 0, 255);
} else {
background(51);
}
}
function toggle() {
env.play();
let wave;
let button;
let playing = false;
let slider; 
let env; 
function setup() {
createCanvas(100, 100);
env = new p5.Envelope(); 
env.setADSR(0.5, 0.1, 0.5, 1); 
env.setRange(1.2, 0); 
wave = new p5.Oscillator();
wave.setType('triangle');
wave.start();
wave.amp(env);
wave.freq(440);
button = createButton('play/pause');
button.mousePressed(toggle);
slider = createSlider(100, 1200, 440);
}
function draw() {
background(220);
wave.freq(slider.value()); 
if (playing) {
background(255, 0, 255);
} else {
background(51);
}
}
function toggle() {
env.play();
}let wave;
let button;
let playing = false;
let slider; 
function setup() {
createCanvas(100, 100);
wave = new p5.Oscillator();
wave.setType('sine');
wave.start();
wave.amp(0);
wave.freq(440);
button = createButton('play/pause');
button.mousePressed(toggle);
slider = createSlider(100, 1200, 440);
}
function draw() {
background(220);
wave.freq(slider.value()); 
if (playing) {
background(255, 0, 255);
} else {
background(51);
}
}
function toggle() {
if (!playing) {
wave.amp(0.1, 1);
wave.freq(440);
playing = true;
} else {
wave.amp(0);
playing = false;
}
}let wave;
let mouseWave; 
function setup() {
createCanvas(100, 100);
wave = new p5.Oscillator();
wave.setType('sine');
wave.start();
}
function draw() {
background(220);
mouseWave = map(mouseX, 0, width, 300, 440);  
wave.amp(0.5);
wave.freq(mouseWave);
}let song;
let button;
let jumpButton; 
let fft;
function setup() {
createCanvas(200, 200);
song = loadSound('assets/yes-we-can-speech.mp3', loaded);
amp = new p5.Amplitude(); 
fft = new p5.FFT();
song.setVolume(0.3);
background(51);
song.addCue(2, changeBackground, color(0, 0, 255));
song.addCue(4, changeBackground, color(0, 255, 255));
song.addCue(6, changeBackground, color(255, 255, 255));
}
function changeBackground(col) { 
background(col);
}
function loaded() {
console.log('loaded');
button = createButton("play");
button.mousePressed(togglePlaying);
}
function togglePlaying() {
if (!song.isPlaying()) {
song.play();
song.setVolume(0.3);
button.html("pause");
} else {
song.pause();
button.html("play");
}
}
function draw() {
background(255, 0, 255);
fft.analyze();
bassVal = (int)(fft.getEnergy("bass"));
lMidVal = (int)(fft.getEnergy("lowMid"));
midVal = (int)(fft.getEnergy("mid"));
hMidVal = (int)(fft.getEnergy("highMid"));
trebVal = (int)(fft.getEnergy("treble"));
console.log(lMidVal); 
let vol = amp.getLevel(); 
let diam = map(lMidVal, 0, 100, 0, 50);
rectMode(CENTER); 
fill(0); 
rect(width/2, height/2, 10, diam); 
}var video;
let song; 
let sliderRate;
var vScale = 16;
function preload() { 
song = loadSound('assets/choir.mp3', loaded);
}
function setup() {
createCanvas(640, 480);
sliderRate = createSlider(0, 3, 1, 0.01); 
pixelDensity(1);
video = createCapture(VIDEO);
video.size(width / vScale, height / vScale);
}
function loaded() { 
console.log('loaded') 
}
function draw() {
background(51);
song.loop();
video.loadPixels();
loadPixels();
for (var y = 0; y < video.height; y++) {
for (var x = 0; x < video.width; x++) {
var index = (video.width - x + 1 + (y * video.width)) * 4;
var r = video.pixels[index + 0];
var g = video.pixels[index + 1];
var b = video.pixels[index + 2];
var bright = (r + g + b) / 3;
var w = map(bright, 0, 255, 0, vScale);
noStroke();
fill(255);
rectMode(CENTER);
rect(x * vScale, y * vScale, w, w);
}
}
}
function glowit() { 
}
let song;
let button;
let jumpButton; 
function setup() {
createCanvas(200, 200);
song = loadSound('assets/hold_on_alabama_shakes.mp3', loaded);
amp = new p5.Amplitude(); 
song.setVolume(0.3);
background(51);
song.addCue(2, changeBackground, color(0, 0, 255));
song.addCue(4, changeBackground, color(0, 255, 255));
song.addCue(6, changeBackground, color(255, 255, 255));
}
function changeBackground(col) { 
background(col);
}
function loaded() {
console.log('loaded');
button = createButton("play");
button.mousePressed(togglePlaying);
}
function togglePlaying() {
if (!song.isPlaying()) {
song.play();
song.setVolume(0.3);
button.html("pause");
} else {
song.pause();
button.html("play");
}
}
function draw() {
let vol = amp.getLevel(); 
let diam = map(vol, 0, 0.3, 10, 200); 
ellipse(width/2, height/2, diam, diam); 
}let song;
let button;
let jumpButton; 
function setup() {
createCanvas(200, 200);
song = loadSound('assets/hold_on_alabama_shakes.mp3', loaded);
button = createButton("play");
button.mousePressed(togglePlaying);
jumpButton = createButton("jump"); 
jumpButton.mousePressed(jumpSong); 
song.setVolume(0.3);
background(51);
song.addCue(2, changeBackground, color(0, 0, 255));
song.addCue(4, changeBackground, color(0, 255, 255));
song.addCue(6, changeBackground, color(255, 255, 255));
}
function changeBackground(col) { 
background(col);
}
function jumpSong() { 
let len = song.duration(); 
song.jump(random(len)); 
} 
function loaded() {
console.log('loaded');
}
function togglePlaying() {
if (!song.isPlaying()) {
song.play();
song.setVolume(0.3);
button.html("pause");
} else {
song.pause();
button.html("play");
}
}
function draw() {
}let song;
let button;
function setup() {
createCanvas(200, 200);
song = loadSound('assets/hold_on_alabama_shakes.mp3', loaded);
button = createButton("play");
button.mousePressed(togglePlaying);
song.setVolume(0.3);
background(51);
}
function loaded() {
console.log('loaded');
}
function togglePlaying() {
if (!song.isPlaying()) {
song.play();
song.setVolume(0.3);
button.html("pause");
} else {
song.pause();
button.html("play");
}
}
function draw() {
background(0);
}let song; 
let sliderRate;
let sliderPan; 
function setup() { 
createCanvas(200, 200); 
song = loadSound('assets/hold_on_alabama_shakes.mp3', loaded);
sliderRate = createSlider(0, 3, 1, 0.01); 
sliderPan = createSlider(-1, 1, 0, 0.01) 
}
function loaded() { 
song.play(); 
}
function draw() { 
background(0); 
song.pan(sliderPan.value());
let balls = [];
function preload() {
soundFormats('mp3', 'ogg');
mySound = loadSound('assets/ping.mp3');
}
function setup() {
createCanvas(400, 400);
mySound.setVolume(0.1);
for (let i = 0; i < 10; i++) {
balls.push(new Ball(random(width), random(height), random(-1, 2), random(-1, 2), 50, random(100, 200)));
}
}
function draw() {
background(220);
for (let b in balls) {
balls[b].run();
if (balls[b].isNear(mouseX, mouseY)) {
balls.splice(b, 1);
}
}
function mousePressed(){ 
let b = new Ball(random(width), random(height), random(-5, 5), random(-5, 5));
balls.push(b);
} 
}
let img;
let c;
function preload() {
img = loadImage('assets/cat.jpeg');
}
function setup() {
createCanvas(180, 180);
pixelDensity(1);
}
function draw() {
background(img);
img.loadPixels();
for (let y = 0; y < height; y += 10) {
for (let x = 0; x < width; x += 10) {
noStroke();
c = img.get(x, y);
fill(c);
rect(x, y, 10, 10);
}
}
updatePixels();
}function setup() {
let img = createImage(100, 100);
img.loadPixels();
for (let f = 0; f < img.width; f++) {
for (let d = 0; d < img.height; d++) {
img.set(f, d, color(random(255), random(255), random(255)));
}
}
img.updatePixels();
image(img, 0, 0);
NOTES 
Use the snap button to take a photo. Then, drag
the mouse in the canvas to paint using that image.
Use createCapture() and copy() to use the mouse 
to “color-in” the canvas with the video feed 
from your laptop’s webcam.
let video;
let button;
let img;
let snapshots = [];
function setup() {
createCanvas(320, 240);
background(51);
video = createCapture(VIDEO);
video.size(320, 240);
button = createButton('snap');
button.mousePressed(takesnap);
}
function takesnap() {
snapshots.push(video.get());
}
function draw() {
let x = 0;
let y = 0;
let w = 80;
let h = 60;
for (let i = 0; i < snapshots.length; i++) {
image(snapshots[i], x, y, w, h);
if (mouseIsPressed) {
copy(snapshots[i], 80, 50, 100, 100, mouseX, mouseY, 100, 100);
}
}
}
api key TzVQtbVUVkL7r3EL71r7jP53dzsQIXVZ
let query = 'ryan+gosling';
let apiKey = '&api_key=TzVQtbVUVkL7r3EL71r7jP53dzsQIXVZ';
function setup() {
noCanvas();
let url = api + query + apiKey;
loadJSON(url, gotData);
}
function gotData(giphy) {
}
function draw() {
background(220);
}let lineX = 0;
function setup() {
createCanvas(600, 400);
loadJSON(url, gotData);
}
function gotData(data) {
}
function draw() {
background(51);
stroke(255);
line(lineX, 0, lineX, height);
lineX = lineX + 5;
if (lineX > width) {
lineX = 0;
}
let colourData;
let data; 
let x = 100;
let y = 100;
function preload() {
colourData = loadJSON("colour.json");
data = loadJSON("birds.json");
}
function setup() {
noCanvas(); 
let colour = colourData.colors;
for(let i = 0; i < colour.length; i++) { 
createElement('h1', colour[i].color); 
createElement('p', colour[i].hex); 
style="color:blue;"
}
}
function draw() {
let colourData;
let data; 
let x = 100;
let y = 100;
function preload() {
colourData = loadJSON("colour.json");
data = loadJSON("birds.json");
}
function setup() {
noCanvas(); 
let colour = colourData.colors;
for(let i = 0; i < colour.length; i++) { 
createElement('h1', colour[i].color); 
createElement('p', colour[i].hex); 
style="color:blue;"
}
}
function draw() {
}let menu; 
function setup() {
createCanvas(400, 400);
function 
}
function draw() {
background(220);
let y;
let x;
let y2;
let x2;
let y3;
let x3;
function preload() {
loadJSON("data.json", gotData);
}
function gotData(data) {
thoughts = data;
}
function setup() {
thts = thoughts.thoughts;
div = createDiv();
createCanvas(400, 400);
angleMode(DEGREES);
cx = width / 2;
cy = height / 2;
cr = width * 0.25;
x = random(width-120);
y = 300;
x2 = random(width-120);
y2 = 300;
x3 = random(width-120);
y3 = 300;
}
function draw() {
background(255);
noStroke();
fill(255, 230, 238);
ellipse(x + 55, y + 100, 150);
fill(150);
textSize(12);
text(thts[0].archive, x, y, 120, 200);
textAlign(CENTER, CENTER);
y -= thts[0].intensity / 100;
fill(255, 50, 238, 50);
ellipse(x2 + 55, y2 + 100, 150);
fill(150);
textSize(12);
text(thts[1].archive, x2, y2, 120, 200);
textAlign(CENTER, CENTER);
y2 -= thts[1].intensity / 100;
fill(255, 50, 20, 50);
ellipse(x3 + 55, y3 + 100, 150);
fill(150);
textSize(12);
text(thts[2].archive, x3, y3, 120, 200);
textAlign(CENTER, CENTER);
y3 -= thts[2].intensity / 100;
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
let allWords = [];
let ts = 16;
let i = 0;
function preload() {
let q = "trump";
let apikey = "9a27be6f923c4082966b356758af780c";
loadJSON(url, processSnippets);
}
function setup() {
createCanvas(800, 800);
fill(0);
}
function draw() {
background(255, 5);
ts++;
ts %= 48;
if (allWords.length > 0) {
i += 1;
i %= allWords.length;
textSize(ts);
let word = allWords[floor(i)];
text(allWords[floor(i)], random(width), random(height));
}
}
function processSnippets(data) {
let docs = data.response.docs;
console.log(data);
let putins = ["Putin", "Vladi", "Vlad", "Vova"];
let trumps = ["Trump", "president", "President"];
for (let doc of docs) {
let words = splitTokens(doc.snippet);
for (let w in words) {
let word = words[w];
for (let trump of trumps) {
if (match(word, trump)) {
words[w] = putins[floor(random(putins.length))];
break;
}
}
shuffle(words, true);
}
allWords = concat(allWords, words);
}
}
function preload() {
data = loadJSON("thoughts.json");
}
function setup() {
noCanvas(); 
}
function draw() {
background(220);
var thoughts = data.thought; 
for(var i = 0; i < 4; i++) { 
createElement('p', thoughts[i].archive);   
}
}
let tokens = [];
function preload() {
txt = loadStrings('joke.txt');
console.log(txt);
}
function setup() {
createCanvas(400, 400);
for (let l of txt) {
tokens = concat(tokens, splitTokens(l));
}
console.log(tokens);
}
function draw() {
background(220);
let x = 0;
let y = 50; 
for (let token of tokens) {
text(token, x, y);
x = x + textWidth(token) + textWidth('a'); 
if (x > width - 30) {
y += textAscent(token);
x = 0;
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
}let canvas;
let madlib1;
let madlib2;
let madlib3;
let madlib4;
let madlib5;
function setup() {
canvas = createCanvas(600, 350);
canvas.position(0, 0);
canvas.style("z-index", "-1");
madlib1 = select("#madlib1");
madlib2 = select("#madlib2");
madlib3 = select("#madlib3");
madlib4 = select("#madlib4");
madlib5 = select("#madlib5");
paragraph0 = createP('MAD LIB IT');
paragraph0.position(50, 350);
paragraph1 = createP('First, enter an adjective:');
paragraph1.position(50, 375);
inputML1 = createInput("a descriptive word");
inputML1.position(225, 390);
paragraph2 = createP('Great, add another adjective:');
paragraph2.position(50, 400);
inputML2 = createInput("a descriptive word");
inputML2.position(260, 415);
paragraph3 = createP('Now, enter a mythical beast, plural:');
paragraph3.position(50, 425);
inputML3 = createInput("they can be good or evil");
inputML3.position(304, 440);
paragraph4 = createP('Then, enter a passed tense verb:');
paragraph4.position(50, 450);
inputML4 = createInput("an action word");
inputML4.position(290, 465);
paragraph5 = createP('Lastly, enter a noun:');
paragraph5.position(50, 475);
inputML5 = createInput("a person, place or thing");
inputML5.position(195, 490);
button = createButton("GO");
button.position(50, 525);
button.mousePressed(go);
}
function draw() {
background(220);
}
function go() {
madlib1.html(inputML1.value());
madlib2.html(inputML2.value());
madlib3.html(inputML3.value());
madlib4.html(inputML4.value());
madlib5.html(inputML5.value());
}let lx, rx, ty, by; 
let cx, cy; 
let w, h; 
let hw, hh; 
let percent = 0.1; 
function setup() {
createP("look at another test");
createElement("h1", "my fav number");
createCanvas(400, 400);
rectMode(CENTER);
}
function draw() {
background(220);
lx = cx - w; 
rx = cx + w; 
ty = cy - h; 
by = cy + h; 
hw = width/2; 
hh = height/2; 
cx = hw; 
cy = hh; 
w = width/20; 
h = height/20; 
beginShape()
vertex(lx, ty); 
vertex(rx, ty); 
vertex(rx, ty); 
vertex(rx, by); 
vertex(rx, by); 
vertex(lx, by); 
vertex(lx, by)
vertex(lx, ty); 
endShape(); 
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
}let leftNumber = 50;
let rightNumber = 50;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
if (mouseIsPressed && mouseX < width / 2) {
fill('blue'); 
rect(0, 0, width/2, height); 
leftNumber += 10;
}
if (mouseIsPressed && mouseX > width / 2) {
fill('red'); 
rect(width/2, 0, width/2, height); 
rightNumber += 10;
}
fill(255); 
textSize(50);
text("#1", 50, 150);
text(leftNumber, 50, 200);
textSize(50);
text("#2", 275, 150);
text(rightNumber, 275, 200);
textSize(50);
text("sum", 160, 350);
text(add(leftNumber, rightNumber), 160, 300);
}
function add(num1, num2) {
let sum = num1 + num2;
return sum;
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
textSize(32);
text(add(22, 78), 175, 200);
}
function add(num1, num2) {
let sum = num1 + num2;
return sum;
}
let planets = [];
let angle = 0; 
function setup() {
createCanvas(400, 400);
for (let i = 0; i < 1; i++) {
planets.push(new Planet(0, 0, random(50, 200), random(0.02, 0.05), random(5, 50)));
}
}
function draw() {
background(220);
translate(width/2, height/2); 
ellipse(0, 0, 50, 50);
for(let i = 0; i < planets.length; i++){ 
planets[i].run();
if(mouseIsPressed){
planets.unshift(p, 1);
}
}
let viruses = [];
function setup() {
createCanvas(400, 400);
background(0); 
for (let i = 0; i < 200; i++) {
viruses.push(new Virus(random(width), 400, random(-2, 2), -1, -5, 1));
}
}
function draw() {
for (let v in viruses) {
viruses[v].run(); 
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
let balls = [];
function setup() {
createCanvas(400, 400);
for (let i = 0; i < 10; i++) {
balls.push(new Ball(random(width), random(height), random(-1, 2), random(-1, 2), 50, random(100, 200)));
}
}
function draw() {
background(220);
for (let b in balls) {
balls[b].run();
if (balls[b].isNear(mouseX, mouseY)) {
balls.splice(b, 1);
}
}
function mousePressed(){ 
let b = new Ball(random(width), random(height), random(-5, 5), random(-5, 5));
balls.push(b);
} 
}
This project is heavily inspired by the afrofuturistic artist 
Cyrus Kabiru
the piece of eyewear seen at the top of this article 
This is my first attempt at replicating and animating his artwork 
with code. 
Be sure to scroll over the appendages, scroll to the top and bottom
of the canvas. 
let img;
let glasses;
function setup() {
createCanvas(600, 400);
glasses = new Glasses(100, 500, 0, 6, 10, 5);
}
function draw() {
background(0);
strokeWeight(1.5);
glasses.animateLines();
glasses.addImage();
glasses.drawGlasses();
This project is heavily inspired by the afrofuturistic artist 
Cyrus Kabiru
the piece of eyewear seen at the top of this article 
This is my first attempt at replicating and animating his artwork 
with code. 
Be sure to scroll over the appendages, scroll to the top and bottom
of the canvas. 
let img;
let glasses;
function setup() {
createCanvas(600, 400);
glasses = new Glasses(100, 500, 0, 6, 10, 5);
}
function draw() {
background(0);
strokeWeight(1.5);
glasses.animateLines();
glasses.addImage();
glasses.drawGlasses();
- For best viewing, widen the 
preview side of the editor
- Scroll around the screen. The 
mouse position controls the shade
of the sunglasses and the number
of lines that appears on them. 
- If you hover over the sunglasses, 
they will turn black. 
- Three orbiting dots are created
each time the sketch is launched. 
Their diameters are different each
time the sketch is launched. 
- The triangles orbit on their own. 
let img;
let leftAngle1 = 0;
let leftAngle2 = 0;
let leftAngle3 = 0;
let rightAngle1 = 0;
let rightAngle2 = 0;
let rightAngle3 = 0;
let centerAngle1 = 0;
let centerAngle2 = 0;
let centerAngle3 = 0;
let triangleX = 0; 
let triangleY = 0; 
let dia1;
let dia2;
let dia3;
let diaMin = 10;
let diaMax = diaMin * 2;
let ellipseX = 300; 
let ellipseY = 0; 
let imgCenterX;
let imgCenterY;
function setup() {
createCanvas(945, 382.5);
dia1 = random(diaMin, diaMax);
dia2 = random(diaMin, diaMax);
dia3 = random(diaMin, diaMax);
imgCenterX = width / 2 + 17;
imgCenterY = height / 2;
}
function draw() {
let red = map(mouseY, 0, height, 140, 156);
let green = map(mouseX, 0, width / 2, 140, 123);
let blue = map(mouseX, width / 2, width, 140, 165);
background(red, green, blue);
will adorn lines. The closer to the right and
bottom, the more lines there will be. The 
closer to the left and top, the less lines 
stroke(200, 30);
let lineDistX = map(mouseX, 0, width, 40, 0);
let lineDistY = map(mouseY, 0, height, 0, 40);
for (let i = 0; i < width; i++) {
line(i * lineDistX, 0, i * lineDistX, height);
}
for (let i = 0; i < height; i++) {
line(0, i * lineDistY, width, i * lineDistY);
}
if (mouseX > 320 && mouseX < 660 && mouseY > 110 && mouseY < 255) {
background(0);
noStroke();
}
image(img, 0, 0, 945, 382.5);
noStroke();
push();
translate(150, 200);
rotate(leftAngle1);
leftAngle1 += 0.01;
fill(114, 75, 165, 30);
triangle(triangleX+50, triangleY+50, triangleX-100, triangleY-100, triangleX-100, triangleY+100);
pop();
push();
rotate(leftAngle2);
leftAngle2 -= 0.005;
fill(157, 87, 42, 40);
triangle(triangleX-50, triangleY-50, triangleX+100, triangleY+150, triangleX-100, triangleY+150);
pop();
push();
rotate(leftAngle3);
leftAngle3 += 0.02;
fill(176, 50, 78, 40);
triangle(triangleX-50, triangleY-50, triangleX+50, triangleY+50, triangleX-150, triangleY+20);
pop();
push();
translate(850, 50);
rotate(rightAngle1);
rightAngle1 += 0.009
fill(114, 75, 165, 50);
triangle(triangleX, triangleY, triangleX-50, triangleY+60, triangleX+50, triangleY+70);
pop();
push();
translate(850, 70);
rotate(rightAngle2);
rightAngle2 -= 0.005;
fill(157, 87, 42, 20);
triangle(triangleX, triangleY, triangleX-100, triangleY-10, triangleX-100, triangleY+80);
pop();
push();
translate(820, 70);
rotate(rightAngle3);
rightAngle3 -= 0.02;
fill(163, 35, 70, 30);
triangle(triangleX, triangleY, triangleX-60, triangleY-10, triangleX, triangleY+80);
pop();
push();
translate(imgCenterX, imgCenterY);
rotate(centerAngle1);
centerAngle1 += 0.01;
fill(197, 121, 61, 30);
ellipse(ellipseX, ellipseY, dia1, dia1);
rotate(centerAngle2);
centerAngle2 += 0.003;
fill(197, 121, 61, 40);
ellipse(ellipseX+50, ellipseY, dia2, dia2);
rotate(centerAngle3);
centerAngle3 += 0.007;
fill(197, 121, 61, 35);
ellipse(ellipseX, ellipseY, dia3, dia3);
pop();
}let ball1;
let ball2;
function setup() {
createCanvas(400, 400);
ball1 = new Ball(0, 0, 200, 50, 50, 4, 3);
ball2 = new Ball(100, 100, 100, 150, 150, 2, 2);
}
function draw() {
background(220);
ball1.displayBall();
ball1.bounceBall();
ball1.moveBall();
ball2.displayBall();
ball2.bounceBall();
ball2.moveBall();
}
let x = 200;
let xspeed = 5;
let y = 0;
let yspeed = 2;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(200);
xspeed = bounce(x, 0, width, xspeed);
yspeed = bounce(y, 0, height, yspeed);
x += xspeed;
y += yspeed;
ellipse(x, y, 50, 50);
}
function bounce(pos, low, high, speed) {
if (pos < low || pos > height) speed *= -1;
return speed;
}let numCols;
let numRows;
let colW;
let colH;
function setup() {
createCanvas(500, 500);
numCols = 10;
numRows = height/100;
colW = width/numCols;
rowH = height/5;
}
function draw() {
background(220);
for (let col = 0; col < numCols; col++) {
for (let row = 0; row < numRows; row++) {
let x = col * colW;
let y = row * rowH;
let d = dist(mouseX, mouseY, x, y); 
d = map(d, 0, dist(0, 0, width, height), 255 ,0); 
fill(d); 
noStroke(); 
rect(x, y, colW, rowH);
}
}
}let x = 0;
let y = 0;
let xspeed = 2;
let yspeed = 2;
let d1 = 50;
let d2 = 50;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
ball();
move();
speed();
}
function ball() {
ellipse(x, y, d1, d2);
}
function bounce(state, high, low, speed) {
if (state < high || state > low) speed *= -1;
return speed;
}
function speed() {
xspeed = bounce(x, 0, width, xspeed);
yspeed = bounce(y, 0, height, yspeed);
}
function move() {
x += xspeed;
y += yspeed;
}let numCols;
let numRows;
let colW;
let colH;
function setup() {
createCanvas(500, 500);
numCols = 50;
numRows = numCols;
colW = width/numCols;
rowH = colW;
}
function draw() {
background(220);
for (let col = 0; col < numCols; col++) {
for (let row = 0; row < numRows; row++) {
let x = col * colW;
let y = row * rowH;
let d = dist(mouseX, mouseY, x, y); 
d = map(d, 0, dist(0, 0, width, height), 255 ,0); 
fill(d); 
noStroke(); 
rect(x, y, colW, rowH);
}
}
}let numCols;
let numRows;
let colW;
let colH;
function setup() {
createCanvas(500, 500);
numCols = 50;
numRows = numCols;
colW = width/numCols;
rowH = colW;
}
function draw() {
background(220);
for (let col = 0; col < numCols; col++) {
for (let row = 0; row < numRows; row++) {
if ((col % 2 == 1 && row % 2 == 1) || (col % 2 == 0 && row % 2 == 0)) fill('black');
else fill('white');
let x = col * colW;
let y = row * rowH;
rect(x, y, colW, rowH);
}
}
}function setup() {
createCanvas(100, 100);
}
function draw() {
background(220);
for (let i = 0; i < width; i += 10) {
for (let m = 0; m < height; m += 10) {
rect(i, m, 10, 10);
}
}
}let leftIsOn = false;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
if (leftIsOn) {
fill('red');
rect(0, 0, width / 10, height);
}
if (mouseX < width / 10) {
} else if (mouseX < 2 * width / 10) {
fill('red');
rect(width / 10, 0, width / 10, height);
} else if (mouseX < 3 * width / 10) {
fill('blue');
rect(width / 10 * 2, 0, width / 10, height);
} else if (mouseX < 4 * width / 10) {
fill('red');
rect(width / 10 * 3, 0, width / 10, height);
} else if (mouseX < 5 * width / 10) {
fill('blue');
rect(width / 10 * 4, 0, width / 10, height);
} else if (mouseX < 6 * width / 10) {
fill('blue');
rect(width / 10 * 5, 0, width / 10, height);
} else if (mouseX < 7 * width / 10) {
fill('blue');
rect(width / 10 * 6, 0, width / 10, height);
} else if (mouseX < 8 * width / 10) {
fill('red');
rect(width / 10 * 7, 0, width / 10, height);
} else if (mouseX < 9 * width / 10) {
fill('blue');
rect(width / 10 * 8, 0, width / 10, height);
} else {
fill('red');
rect(9 * width / 10, 0, width / 10, height);
}
}
function mousePressed() {
if (mouseX < width / 10) {
leftIsOn = !leftIsOn;
console.log(leftIsOn);
}
}let leftIsOn = false;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
if (leftIsOn) {
fill('red');
rect(0, 0, width / 10, height);
}
if (mouseX < width / 10) {
} else if (mouseX < 2 * width / 10) {
fill('red');
rect(width / 10, 0, width / 10, height);
} else if (mouseX < 3 * width / 10) {
fill('red');
rect(width / 10 * 2, 0, width / 10, height);
} else if (mouseX < 4 * width / 10) {
fill('red');
rect(width / 10 * 3, 0, width / 10, height);
} else if (mouseX < 5 * width / 10) {
fill('red');
rect(width / 10 * 4, 0, width / 10, height);
} else if (mouseX < 6 * width / 10) {
fill('blue');
rect(width / 10 * 5, 0, width / 10, height);
} else if (mouseX < 7 * width / 10) {
fill('blue');
rect(width / 10 * 6, 0, width / 10, height);
} else if (mouseX < 8 * width / 10) {
fill('blue');
rect(width / 10 * 7, 0, width / 10, height);
} else if (mouseX < 9 * width / 10) {
fill('blue');
rect(width / 10 * 8, 0, width / 10, height);
} else {
fill('blue');
rect(9 * width / 10, 0, width / 10, height);
}
}
function mousePressed() {
if (mouseX < width / 10) {
leftIsOn = !leftIsOn;
console.log(leftIsOn);
}
}let leftIsOn = false;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
if (leftIsOn) {
fill('red');
rect(0, 0, width / 10, height);
}
if (mouseX < width / 10) {
} else if (mouseX < 2 * width / 10) {
fill('red');
rect(width / 10, 0, width / 10, height);
} else if (mouseX < 3 * width / 10) {
fill('red');
rect(width / 10 * 2, 0, width / 10, height);
} else if (mouseX < 4 * width / 10) {
fill('red');
rect(width / 10 * 3, 0, width / 10, height);
} else if (mouseX < 5 * width / 10) {
fill('red');
rect(width / 10 * 4, 0, width / 10, height);
} else if (mouseX < 6 * width / 10) {
fill('red');
rect(width / 10 * 5, 0, width / 10, height);
} else if (mouseX < 8 * width / 10) {
fill('red');
rect(width / 10 * 7, 0, width / 10, height);
} else if (mouseX < 9 * width / 10) {
fill('red');
rect(width / 10 * 8, 0, width / 10, height);
} else {
fill('red');
rect(9 * width / 10, 0, width / 10, height);
}
}
function mousePressed() {
if (mouseX < width / 10) {
leftIsOn = !leftIsOn;
console.log(leftIsOn);
}
}let leftIsOn = false;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
if (leftIsOn) {
fill('red');
rect(0, 0, width / 3, height);
}
if (mouseX < width / 3) {
}
else if (mouseX < 2 * width / 3) {
fill('red');
rect(width / 3, 0, width / 3, height);
}
else {
fill('red');
rect(2 * width / 3, 0, width / 3, height);
}
}
function mousePressed() {
if (mouseX < width / 3) {
leftIsOn = !leftIsOn;
console.log(leftIsOn); 
}
}let leftIsOn = false;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
if (leftIsOn) {
fill('red');
rect(0, 0, width / 10, height);
}
if (mouseX < width / 10) {
} else if (mouseX < 2 * width / 10) {
fill('red');
rect(width / 10, 0, width / 10, height);
} else if (mouseX < 3 * width / 10) {
fill('red');
rect(width / 10 * 2, 0, width / 10, height);
} else if (mouseX < 4 * width / 10) {
fill('red');
rect(width / 10 * 3, 0, width / 10, height);
} else if (mouseX < 5 * width / 10) {
fill('red');
rect(width / 10 * 4, 0, width / 10, height);
} else if (mouseX < 6 * width / 10) {
fill('red');
rect(width / 10 * 5, 0, width / 10, height);
} else if (mouseX < 7 * width / 10) {
fill('red');
rect(width / 10 * 6, 0, width / 10, height);
} else if (mouseX < 8 * width / 10) {
fill('red');
rect(width / 10 * 7, 0, width / 10, height);
} else if (mouseX < 9 * width / 10) {
fill('red');
rect(width / 10 * 8, 0, width / 10, height);
} else {
fill('red');
rect(9 * width / 10, 0, width / 10, height);
}
}
function mousePressed() {
if (mouseX < width / 10) {
leftIsOn = !leftIsOn;
console.log(leftIsOn);
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
- draw an ellipse 
- position the ellipse on the left of the canvas 
- make the ellipse move, one pixel at a time, towards the right side 
of the canvas 
- when the ellipse hits the right edge of the screen, make it 
change directions and move towards the left side of the screen 
- when the ellipse hits the left side of the screen, make it 
change directions and move towards the right side of the screen 
- repeat 
}let img;
let imgCenterX;
let imgCenterY;
function setup() {
createCanvas(600, 400);
imgCenterX = width / 2;
imgCenterY = height / 2;
}
function draw() {
image(img, 0, 0, 600,400);
This project is heavily inspired by the afrofuturistic artist 
Cyrus Kabiru
the piece of eyewear seen at the top of this article 
This is my first attempt at replicating and animating his artwork 
with code. 
Be sure to scroll over the appendages, scroll to the top and bottom
of the canvas. 
let img;
let leftEnd;
let rightEnd;
let thickness = 0;
let dia = 6;
let l = 10;
let grow = 5;
function setup() {
createCanvas(600, 400);
}
function draw() {
background(0);
strokeWeight(1.5);
animateLines();
addImage();
drawGlasses();
}
function drawGlasses() {
noFill(0);
stroke(200);
strokeWeight(1.5);
line(width / 2 - 10, height / 2, width / 2 + 10, height / 2);
if (mouseY > height / 2 - 50 && mouseY < height / 2 + 50) {
thickness = 25;
}
thickness = thickness - 2;
strokeWeight(thickness);
ellipse(width / 2 - 60, height / 2, 100, 100);
ellipse(width / 2 + 60, height / 2, 100, 100);
}
function addImage() {
image(img, 0, 0, 600, 400);
}
function animateLines() {
leftEnd = 100;
rightEnd = 500;
let hh = height / 2;
let hw = width / 2;
let lineSpace = map(mouseY, 0, height, 20, 60);
if (lineSpace <= 22) {
for (let bl = 0; bl < 600; bl += 10) {
stroke(40);
strokeWeight(1.5);
line(bl, 0, bl, l);
}
l += grow;
console.log(l);
} else {
l = 10;
}
for (let i = 75; i < 325; i += lineSpace) {
stroke(255);
line(hw - 30, hh, leftEnd, i);
line(hw + 30, hh, rightEnd, i);
ellipse(leftEnd, i, dia, dia);
ellipse(rightEnd, i, dia, dia);
if ((dist(mouseX, mouseY, leftEnd, i) < dia + 10) || (dist(mouseX, mouseY, rightEnd, i) < dia + 10)) {
fill('white');
dia = 12;
} else {
noFill();
dia = 6;
}
}
}
let colour = 0;
let State = 0;
function setup() {
createCanvas(600, 400);
background(colour);
textAlign(CENTER);
}
function draw() {
background(colour);
console.log("colour is " + colour);
if (colour >= 255) {
textSize(20);
fill(0);
text('you found the light', width / 2, height - 30);
}
if (State == 0 ) {
textSize(20);
fill(255);
text('you are in the dark', width / 2, height - 60);
text('you must find the light', width / 2, height - 40);
fill('green');
rect(width / 2, height / 2, 50, 50);
fill(255);
text("GO", width / 2 + 25, height / 2 + 33);
if (mouseIsPressed && mouseX > width / 2 && mouseX < width / 2 + 50 && mouseY > height / 2 && mouseY < height / 2 + 50) {
State = 1;
console.log("You Are In State " + State);
}
}
if (State == 1 && colour == 0) {
textSize(20);
fill(255);
text('can you get to level 2?', width / 2, height - 30);
noStroke();
fill('red');
rect(width / 2 - 100, height / 2 - 100, 100, 50);
fill('blue');
rect(width / 2, height / 2 - 100, 100, 50);
if (mouseIsPressed &&
mouseX >= width / 2 - 100 &&
mouseX <= width / 2 &&
mouseY >= height / 2 - 100 &&
mouseY <= height / 2 + 150) {
colour = colour + 25.5;
State = 2;
console.log("You Are In State " + State);
}
if (mouseIsPressed &&
mouseX >= width / 2 &&
mouseX <= width / 2 + 100 &&
mouseY >= height / 2 - 100 &&
mouseY <= height / 2 + 150) {
colour = colour - 25.5;
State = 1;
console.log("You Are In State " + State);
}
}
if (State == 2 && colour == 25.5) {
textSize(20);
fill(255);
text('can you get to level 3?', width / 2, height - 30);
noStroke();
fill('red');
rect(width / 2 - 100, height - 100, 100, 50);
fill('blue');
rect(width / 2, height - 100, 100, 50);
if (mouseIsPressed &&
mouseX >= width / 2 - 100 &&
mouseX <= width / 2 &&
mouseY >= height - 100 &&
mouseY <= height - 150) {
colour = colour + 25.5;
State = 3;
console.log("You Are In State " + State);
}
if (mouseIsPressed &&
mouseX >= width / 2 &&
mouseX <= width / 2 + 100 &&
mouseY >= height - 100 &&
mouseY <= height - 150) {
colour = colour - 25.5;
State = 2;
console.log("You Are In State " + State);
}
}
}let colour = 0;
function setup() {
createCanvas(600, 400);
background(colour);
textAlign(CENTER);
}
function draw() {
background(colour);
console.log("colour is " + colour);
if (colour <= 10) {
textSize(20);
fill(255);
text('you are in the dark', width / 2, height - 60);
text('you must find the light', width / 2, height - 40);
}
if (colour >= 255) {
textSize(20);
fill(0);
text('you found the light', width / 2, height - 30);
}
if (colour == 0) {
textSize(20);
fill(255);
text('should you go left or right?', width / 2, height - 300);
if (mouseIsPressed &&
mouseX >= width / 2 - 100 &&
mouseX <= width / 2 &&
mouseY >= height / 2 - 25 &&
mouseY <= height / 2 + 25) {
colour = colour + 25.5;
}
else if (mouseIsPressed &&
mouseX >= width / 2 &&
mouseX <= width / 2 + 100 &&
mouseY >= height / 2 - 25 &&
mouseY <= height / 2 + 25) {
colour = colour - 25.5;
}
}
else if (colour == 25.5) {
textSize(20);
fill(255);
text('should you go up or down?', width / 2, height - 300);
if (mouseIsPressed &&
mouseX >= width / 2 - 100 &&
mouseX <= width / 2 &&
mouseY >= height / 2 - 25 &&
mouseY <= height / 2 + 25) {
colour = colour - 25.5;
}
if (mouseIsPressed &&
mouseX >= width / 2 &&
mouseX <= width / 2 + 100 &&
mouseY >= height / 2 - 25 &&
mouseY <= height / 2 + 25) {
colour = colour - 25.5;
}
}
noStroke();
fill('red');
rect(width / 2 - 100, height / 2 - 25, 100, 50);
fill('blue');
rect(width / 2, height / 2 - 25, 100, 50);
}
createCanvas(400, 400);
}
function draw() {
background(220);
for (let i = 0; i < 10 ; i++) {
console.log(i); 
let x = i* 20; 
if( i ==7) fill('blue'); 
else fill('white'); 
ellipse(x, height/2, 50, 50);
}
for (let i = 0; i < 10 ; i++) {
console.log(i); 
let x = i* 20; 
if( i ==7) stroke('blue'); 
else stroke('white'); 
line(x, 0, x, height);
}
}function setup() {
createCanvas(600, 400);
}
function draw() {
background(220);
if (mouseX < 200) {
fill(255, 0, 0);
rect(0, 0, 200, height);
}
else if (mouseX < 400) {
fill('red');
rect(200, 0, 200, height);
}
else {
fill(255, 0, 0);
rect(400, 0, 200, height);
}
}let y;
let ySpeed = 0;
function setup() {
createCanvas(100, 200);
y = height;
}
function draw() {
background(220);
ellipse(width / 2, y, 50, 50);
y -= ySpeed;
ySpeed = height / 300;
}let x;
let y;
let speed = 10; 
function setup() {
createCanvas(400, 400);
x = width / 2;
y = height / 2;
}
function draw() {
background(220);
ellipse(x, height/2, 50, 50); 
x++; 
ellipse(x, height/2, 50, 50); 
x--; 
ellipse(x, y, 50, 50); 
x--;
y--; 
ellipse(x, y, 50, 50); 
x--;
y++; 
ellipse(x, y, 50, 50); 
x++;
y--; 
ellipse(x, y, 50, 50); 
x++;
y++; 
ellipse(x, y, 50, 50); 
x = x + speed;
y = y + speed;
- For best viewing, widen the 
preview side of the editor
- Scroll around the screen. The 
mouse position controls the shade
of the sunglasses and the number
of lines that appears on them. 
- If you hover over the sunglasses, 
they will turn black. 
- Three orbiting dots are created
each time the sketch is launched. 
Their diameters are different each
time the sketch is launched. 
- The triangles orbit on their own. 
let img;
let leftAngle1 = 0;
let leftAngle2 = 0;
let leftAngle3 = 0;
let rightAngle1 = 0;
let rightAngle2 = 0;
let rightAngle3 = 0;
let centerAngle1 = 0;
let centerAngle2 = 0;
let centerAngle3 = 0;
let triangleX = 0; 
let triangleY = 0; 
let dia1;
let dia2;
let dia3;
let diaMin = 10;
let diaMax = diaMin * 2;
let ellipseX = 300; 
let ellipseY = 0; 
let imgCenterX;
let imgCenterY;
function setup() {
createCanvas(945, 382.5);
dia1 = random(diaMin, diaMax);
dia2 = random(diaMin, diaMax);
dia3 = random(diaMin, diaMax);
imgCenterX = width / 2 + 17;
imgCenterY = height / 2;
}
function draw() {
let red = map(mouseY, 0, height, 140, 156);
let green = map(mouseX, 0, width / 2, 140, 123);
let blue = map(mouseX, width / 2, width, 140, 165);
background(red, green, blue);
will adorn lines. The closer to the right and
bottom, the more lines there will be. The 
closer to the left and top, the less lines 
stroke(200, 30);
let lineDistX = map(mouseX, 0, width, 40, 0);
let lineDistY = map(mouseY, 0, height, 0, 40);
for (let i = 0; i < width; i++) {
line(i * lineDistX, 0, i * lineDistX, height);
}
for (let i = 0; i < height; i++) {
line(0, i * lineDistY, width, i * lineDistY);
}
if (mouseX > 320 && mouseX < 660 && mouseY > 110 && mouseY < 255) {
background(0);
noStroke();
}
image(img, 0, 0, 945, 382.5);
noStroke();
push();
translate(150, 200);
rotate(leftAngle1);
leftAngle1 += 0.01;
fill(114, 75, 165, 30);
triangle(triangleX+50, triangleY+50, triangleX-100, triangleY-100, triangleX-100, triangleY+100);
pop();
push();
rotate(leftAngle2);
leftAngle2 -= 0.005;
fill(157, 87, 42, 40);
triangle(triangleX-50, triangleY-50, triangleX+100, triangleY+150, triangleX-100, triangleY+150);
pop();
push();
rotate(leftAngle3);
leftAngle3 += 0.02;
fill(176, 50, 78, 40);
triangle(triangleX-50, triangleY-50, triangleX+50, triangleY+50, triangleX-150, triangleY+20);
pop();
push();
translate(850, 50);
rotate(rightAngle1);
rightAngle1 += 0.009
fill(114, 75, 165, 50);
triangle(triangleX, triangleY, triangleX-50, triangleY+60, triangleX+50, triangleY+70);
pop();
push();
translate(850, 70);
rotate(rightAngle2);
rightAngle2 -= 0.005;
fill(157, 87, 42, 20);
triangle(triangleX, triangleY, triangleX-100, triangleY-10, triangleX-100, triangleY+80);
pop();
push();
translate(820, 70);
rotate(rightAngle3);
rightAngle3 -= 0.02;
fill(163, 35, 70, 30);
triangle(triangleX, triangleY, triangleX-60, triangleY-10, triangleX, triangleY+80);
pop();
push();
translate(imgCenterX, imgCenterY);
rotate(centerAngle1);
centerAngle1 += 0.01;
fill(197, 121, 61, 30);
ellipse(ellipseX, ellipseY, dia1, dia1);
rotate(centerAngle2);
centerAngle2 += 0.003;
fill(197, 121, 61, 40);
ellipse(ellipseX+50, ellipseY, dia2, dia2);
rotate(centerAngle3);
centerAngle3 += 0.007;
fill(197, 121, 61, 35);
ellipse(ellipseX, ellipseY, dia3, dia3);
pop();
}let lx, rx, ty, by; 
let cx, cy; 
let w, h; 
let hw, hh; 
let percent = 0.1; 
function setup() {
createCanvas(400, 400);
rectMode(CENTER);
}
function draw() {
background(220);
lx = cx - w; 
rx = cx + w; 
ty = cy - h; 
by = cy + h; 
hw = width/2; 
hh = height/2; 
cx = hw; 
cy = hh; 
w = width/20; 
h = height/20; 
beginShape()
vertex(lx, ty); 
vertex(rx, ty); 
vertex(rx, ty); 
vertex(rx, by); 
vertex(rx, by); 
vertex(lx, by); 
vertex(lx, by)
vertex(lx, ty); 
endShape(); 
}
function setup() {
createCanvas(600, 750);
ellipseMode(CENTER);
colorMode(RGB, 255);
background(240);
noStroke();
fill(146, 72, 37, 90);
beginShape();
vertex(445, 215);
vertex(460, 250);
vertex(467, 285);
vertex(467, 320);
vertex(458, 350);
vertex(461, 385);
vertex(461, 420);
vertex(449, 450);
vertex(437, 477);
vertex(428, 500);
vertex(415, 526);
vertex(382, 532);
vertex(345, 524);
vertex(310, 510);
vertex(280, 490);
vertex(255, 468);
vertex(240, 438);
vertex(236, 400);
vertex(228, 380);
vertex(210, 394);
vertex(180, 384);
vertex(165, 360);
vertex(157, 333);
vertex(168, 313);
vertex(168, 313);
vertex(193, 310);
vertex(212, 323);
vertex(240, 323);
vertex(265, 300);
vertex(295, 275);
vertex(322, 255);
vertex(350, 235);
vertex(380, 215);
vertex(420, 208);
endShape(CLOSE);
fill(0, 110);
ellipse(445, 215, 5, 5);
ellipse(460, 250, 5, 5);
ellipse(467, 285, 5, 5);
ellipse(467, 320, 5, 5);
ellipse(458, 350, 5, 5);
ellipse(461, 385, 5, 5);
ellipse(461, 420, 5, 5);
ellipse(449, 450, 5, 5);
ellipse(437, 477, 5, 5);
ellipse(428, 500, 5, 5);
ellipse(415, 526, 5, 5);
ellipse(382, 532, 5, 5);
ellipse(345, 524, 5, 5);
ellipse(310, 510, 5, 5);
ellipse(280, 490, 5, 5);
ellipse(255, 468, 5, 5);
ellipse(240, 438, 5, 5);
ellipse(236, 400, 5, 5);
ellipse(228, 380, 5, 5);
ellipse(210, 394, 5, 5);
ellipse(180, 384, 5, 5);
ellipse(165, 360, 5, 5);
ellipse(157, 333, 5, 5);
ellipse(168, 313, 5, 5);
ellipse(168, 313, 5, 5);
ellipse(193, 310, 5, 5);
ellipse(212, 323, 5, 5);
ellipse(240, 323, 5, 5);
ellipse(265, 300, 5, 5);
ellipse(295, 275, 5, 5);
ellipse(322, 255, 5, 5);
ellipse(350, 235, 5, 5);
ellipse(380, 215, 5, 5);
ellipse(420, 208, 5, 5);
fill(114, 75, 165, 90);
triangle(240, 323, 310, 390, 280, 470);
fill(114, 75, 165, 50);
triangle(265, 300, 310, 390, 280, 470);
fill(157, 87, 42, 40);
triangle(322, 255, 210, 344, 280, 470);
triangle(322, 520, 310, 390, 380, 532);
fill(146, 72, 37, 130);
beginShape();
vertex(200, 415);
vertex(200, 443);
vertex(198, 473);
vertex(190, 502);
vertex(173, 533);
vertex(146, 547);
vertex(198, 473);
vertex(132, 568);
vertex(140, 602);
vertex(155, 638);
vertex(180, 665);
vertex(217, 680);
vertex(255, 690);
vertex(287, 695);
vertex(320, 690);
vertex(360, 680);
vertex(390, 665);
vertex(415, 638);
vertex(427, 602);
vertex(430, 568);
vertex(415, 545);
vertex(400, 528);
vertex(382, 532);
vertex(345, 524);
vertex(310, 510);
vertex(280, 490);
vertex(255, 468);
vertex(240, 438);
vertex(236, 400);
vertex(228, 380);
vertex(210, 394);
endShape(CLOSE);
fill(0, 110);
ellipse(200, 415, 5, 5);
ellipse(200, 443, 5, 5);
ellipse(198, 473, 5, 5);
ellipse(190, 502, 5, 5);
ellipse(173, 533, 5, 5);
ellipse(146, 547, 5, 5);
ellipse(132, 568, 5, 5);
ellipse(140, 602, 5, 5);
ellipse(155, 638, 5, 5);
ellipse(180, 665, 5, 5);
ellipse(217, 680, 5, 5);
ellipse(255, 690, 5, 5);
ellipse(287, 695, 5, 5);
ellipse(320, 690, 5, 5);
ellipse(360, 680, 5, 5);
ellipse(390, 665, 5, 5);
ellipse(415, 638, 5, 5);
ellipse(427, 602, 5, 5);
ellipse(430, 568, 5, 5);
ellipse(415, 545, 5, 5);
fill(114, 75, 165, 90);
triangle(146, 547, 270, 650, 200, 415);
triangle(225, 380, 190, 415, 240, 600);
triangle(235, 440, 320, 515, 200, 500);
fill(157, 87, 42, 90);
triangle(225, 500, 320, 515, 270, 650);
triangle(110, 550, 200, 547, 308, 700);
fill(0, 130);
beginShape();
vertex(460, 200);
vertex(450, 170);
vertex(420, 155);
vertex(382, 150);
vertex(340, 150);
vertex(295, 155);
vertex(250, 170);
vertex(220, 195);
vertex(195, 220);
vertex(170, 250);
vertex(155, 275);
vertex(150, 300);
vertex(157, 333);
vertex(168, 313);
vertex(193, 310);
vertex(212, 323);
vertex(240, 323);
vertex(265, 300);
vertex(295, 275);
vertex(322, 255);
vertex(350, 235);
vertex(380, 215);
vertex(420, 208);
vertex(445, 215);
endShape(CLOSE);
fill(0, 130);
ellipse(460, 200, 5, 5);
ellipse(450, 170, 5, 5);
ellipse(420, 155, 5, 5);
ellipse(382, 150, 5, 5);
ellipse(340, 150, 5, 5);
ellipse(295, 155, 5, 5);
ellipse(250, 170, 5, 5);
ellipse(220, 195, 5, 5);
ellipse(195, 220, 5, 5);
ellipse(170, 250, 5, 5);
ellipse(155, 275, 5, 5);
ellipse(150, 300, 5, 5);
fill(0, 60);
triangle(362, 255, 220, 160, 192, 308);
triangle(322, 295, 297, 125, 192, 308);
triangle(322, 255, 395, 130, 192, 308);
function setup() {
}
function draw() {
background(95, 248, 251);
stroke(230, 46, 37);
strokeWeight(50);
line(0, 0, width, height);
noStroke(); 
fill(84, 195, 14); 
ellipse(width/2, height/2, 400, 300); 
fill(10, 18, 109); 
rect(536, 240, 50, 50); 
function setup() {
createCanvas(400, 400);  
}
function draw() {
background(220);
fill(66, 244, 232); 
ellipse(width/2, height/2, 100, 100); 
function setup() {
}
function draw() {
background(220);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
noStroke(100);
fill(100);
point(100, 100);
rectMode(CENTER, CENTER); 
rect(200, 200, 50, 70); 
}