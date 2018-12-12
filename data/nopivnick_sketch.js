/*
   Noah Pivnick
   Final Project, 2018 Fall
   Intro to Computational Media 2233.004 (Mimi Yin)
   Intro to Physical Computing 2301.003 (Tom Igoe)
   
   Acknowledgements:
   - Michael Joyce, friend and mentor, writer and poet, for sharing with me his unpublished poems
   - Giwon Park for help with code and urging me to use p5.dom
   - Allison Parish for sharing with me a crucial example of creating arrays of spans by character
   - Brent Baily for helping me sort out logic that correctly iterated through the substring playlist
   - Ashley Lewis for walking me through state machines
   - Mimi Yin, Tom Igoe, and Mithru Vigneshwara for their instruction, critique, and patience
*/

// p5.serialcontrol stuff
let serial; // declare a global variable for serial class
let portName = '/dev/cu.usbmodem1411';
let serialCrankCurrent;
let serialCrankPrior = 0;
let rotaryEncoder;
let rotaryButton = false;
let countCrankDelayStart; // variable to set how many crank rotations over serial before starting text effect

// state machine stuff
// let state;

// p5.dom stuff
let div;
let header; // to hold the name / number) of the poem / state
let paragraph;

// poem content stuff
let tutorial = "Turn the crank on the yarn ball winder to begin ...";
let describe = "Creaturely Life takes it's name from a collection of poems by Michael Joyce, written in stream of consciousness from the perspective of a woman keeping vigil over her dying husband. The final poem in the series recounts having found solace in knitting beside her husband’s deathbed.";
let ireland = "In Ireland, there is a traditional Halloween practice in which young girls make their way to a limekiln with a ball of yarn. Holding the loose end, they throw the ball of yarn into the dark. If the string goes taught as they rewind the length of yarn, they then call out ‘who howlds my bottom of yarn?’ and expect to hear the name of the man they are to marry.";
let title = "Creaturely life: twenty pre-elegies by Michael Joyce";
let poem01 = "It is how he lives that she watches she insists, for the dying will take care of itself, it has already become a thing for them, the dying, a disconsolate creature perched sometimes on the wide sill outside the window where yesterday a window washer swung from the canvas harness swiping interlaced crescents across the clouded glass as if a drab angel. But death, death takes the form of a monkey, the Mandrillus sphinx, the blue ridges of its muzzle fierce as a Maori tattoo below amber eyes, sitting propped on its magnificently multi-colored rump, the colors of cotton candy, sucking the flesh from a peach that someone has left on a tray, such a bounty gone to waste hereabouts, the dying having no appetite for such a damp, sweet lusciousness as a random peach. Watching him she longs for dampness once again, just one more what? One more anything, the feeling as he descends over her smooth belly to the place between her thighs, or the simple kiss of early lovers, before the mouth becomes perfunctory, dry, its crater swabbed with foam tipped swabs, which the bright young thing, the one who brings a smile to him, said “you can suck on like a lollipop.” It was hard not to hate her for her youth or begrudge an innocence that cannot suspect a graying (for she is still more raven than owl) woman of bawdy, let alone lasciviousness, that fucking monkey, death, let’s call it by its name, eating the conventional banana like a bewildered frau on an amateur porn site, wondering how has our marriage come to this? three minute segments of fellatio, pushing the hair back from your eyes awaiting the crowning moment, the fucking mandrill, sphinx, laughing in raucous cheeps his dreadful yellow teeth exposed between the nostrils and lips red as if it had just fed upon a plum or the still bloody corpse of a young antelope. And now she wants to know would you like to eat anything, this girl, “I can bring you a tray if you want to stay.” Yes, I want to eat you up, to suck the life from you until you moan not knowing whether you are coming or going, so to speak, feeding the sweet mush back to him, forcing my tongue between the dry lips like a swab, filling him like a mother bird her fledgling.";
let poem02 = "Wrens flit upon the sill as well, land and peck and set off again as if feeding upon miniscule seeds, invisible pollen, or perhaps dander, the world being a swirl of dander according to the science pages, dust to dust and such, they come and go these tiny things five floors up above the forlorn park, so clearly just an annex to the vast parking lots row on row of SUVs that stretch out like gravestones along the LIE. We have grown into acronymic times and trucks disguised as passenger cars, great dark things you cannot see around or through, and so process along the expressway as if mourners en route to a stranger’s funeral or to Orient Beach along the North Fork on a summer weekend. With some things it is better at the end, in winter, cocooned in a hooded, black parka, making your way among the terns at the dull edge of the dirty tidal froth, or closer in at Southhold along the saltwater wetlands of Arshamomque Pond. Is it wrong to want to be off somewhere, to come and go as freely as these drab birds? She whispers this question, these questions, into his ear as he sleeps the sleep of the morphine drip, dire sister of the oxycontin dreams. Won’t you get up for just a little while and come with me, to the sea, the sea of love. I want to hold you, I want to tell you. Do you remember? Once you were my pet and now, I suppose, you are again. I watch you and think how lovely you are living just now, struggling against these hallucinatory dreams, waking a little disappointed not to have died, not to be free of all you have to do just now, all this business of sleeping and waking, landing and pecking and setting off.";
let poem03 = "What evidences of living she could say if asked (but by whom?) having made such observance her new science: the faint sway, for instance, of the feathery hairs within his nostril like a Japanese landscape in miniature, thin reeds upon a cavern pool raked by a breeze perfumed with apple blossoms. It is the scent of opiates she supposes, still he works at this, his is the engine of these breezes, although mostly when awake his eyes are indistinct, not so much dull as deep, the blue of beach glass, rocked and polished in the underlying tides, the rip beneath that swells the crests farther out where the boys await on their boards, slick as seals, paddling listlessly. These eyes not the terrifying countenance of the cows (nor the angels) at Duino, “who do not, if one touches them, fall apart into a heap of words,” but who persist, this Rilke does not write exactly to the Princess Marie von Thurn und Taxis, they persist in mystery, they are themselves mystery, this is their being, the terror before which one sits and stares, looking for him there like a bauble lost in a tidal pool, a pretty ring or a holy medal (are there any longer such things?) pinned to the dress of a boy at baptism or to the bib of a hospital gown (surely it is a misprision to call them so, what ceremony or ball masque calls for this rude covering “fastened behind”?)– I’ve lost my place, she thinks, in this inventory of living (not living things, mind you, but living!); when– there!– as if on cue by way of further evidence he kicks free the bottom of a leg from the sheet where they persist in tucking him in, kicking free a life-long habit she can attest to who’s slept a hundred times a hundred nights next to him more or less, but to say now less, no more, seems to her maudlin, sleeping here in the chair counts she insists (to whom, she realizes now, is herself) and twice this week has crawled in and curled with him there, like twin commas interposed, yin and yang. Kicks free the other just then (it’s him, really, who is the measure of her insistence), wishing all his life to be born from whatever enclosures, do you see? She does, she sees the irregular black ankle bracelet now into which the dog bite has healed after years, in the form of a black crown, the beast gripping the ankle in its powerful jaw, teeth sunk to the bone, not fate or destiny but a dumb instance of chance, an indifferent hound, not attacking him exactly, but rather the figure in black moving along the sidewalk beyond the chainlink fence the hound had smashed against a hundred times before this one time the gate gave in where the mad woman had failed to latch it.";
let poem04 = "She feels no affinity for the stray cat that patrols the postage stamp park below, its scraggly tail (her language is reduced to this: stray and scraggly, some discomfort, breathing comfortably, and the like) like a wire– or not that, a bottle washer, do they still make those?; its color soot, at least from this high up, although she would like to think it the color of rich velvet, she who has no sympathy for cats, their solitariness and sinuosity not hers, not hers to wind among the furniture, back curled up like a cartoon feline, she all her life moving erect, a word reserved she supposes for matrons or sexual organs, his having almost turned blue, hooded and shrunken as if preparing to greet its maker, its modest retreat surely not intended for the aide who treats it like meat when she baths him, the bright silver bowl of suds propped against his hip, her sponge unexpectedly the fairest shade of lavender and worn like a courtesan’s glove, her smile likewise, asking her “Would you rather do this for him or take this moment to step out?” What choices else, she does not ask this fair haired child, freckles on her cheek and upper breast when she bends over him. There was a time when he would not have missed this, taking advantage of every gap and vista upon the rich plenitude of women’s bodies. It is he who is like a cat, of course, prowling crevice and remove even in this sleep.";
let poem05 = "(5)";
let poem06 = "(6)";
let poem07 = "(7)";
let poem08 = "(8)";
let poem09 = "(9)";
let poem10 = "(10)";
let poem11 = "(11)";
let poem12 = "(12)";
let poem13 = "(13)";
let poem14 = "(14)";
let poem15 = "(15)";
let poem16 = "(16)";
let poem17 = "(17)";
let poem18 = "(18)";
let poem19 = "(19)";
let poem20 = "But you see it does not end, the living, even when the story has been lived and told; do you want to know what has happened to the birds upon the sill or the vagrant cat? Of course not, they remain there where they were left as well as where they first appeared, the shadow of the thing an equal to the thing itself under certain circumstance. And who she is now they have wiped from the tiny bathroom mirror just beyond the bed where she greeted it each morning and bid it good night when the corridor lights dimmed. Or perhaps not, perhaps he goes on breathing Bach while she knits beside the bed although in truth she has never seen much sense in it, the knitting, liking nonetheless the code of it, K on RS, P on WS, P5, turn, sl 1, K1, psso, K1, K2tog, turn, and so on as if the world’s purpose (this the apple tree pattern for a baby’s blanket) were a song.";

let currentPoem;

// playlist stuff
let substringPlaylist = [];
let playlistIndex = []; // an array used to store the current poem's playlist indexes
let substringIndex = []; // an array used to store the current poem's current substring's indexes
let substringInOut = []; // an array to store the current poem's current substring's start and stop indexes

// poem reveal stuff
let alphaValue = 0;
let reveal = false;

// keyboard control stuff
let autoPlay = false;


/***************************
 * P5 sketch setup function
 ***************************/

function setup() {
  noCanvas();

  // p5.serialcontrol stuff
  serial = new p5.SerialPort(); // instantiate a new serial object
  serial.on('list', printList); // Serial.list();
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose);
  serial.open(portName);

  // p5.dom stuff
  stateTutorial();
}


/**********************
 * P5 sketch draw loop
 **********************/

function draw() {
  poemInteract();

  // NOTE: below is temporary code to generate a total count of characters in a given 
  // poem's playlist so I can use a standardized length of yarn during ITP Winter Show
  let subPlaylistTotalChars = 0;
  for (i = 0; i < substringPlaylist.length; i++) {
    subPlaylistTotalChars += (substringPlaylist[i][1] - substringPlaylist[i][0]);
  }
  print(subPlaylistTotalChars);
  print(substringPlaylist);
}


/**************************************
 * serial data coming from the Arduino
 **************************************/

function serialEvent() {
  // the Arduino should be sending ASCII over serial
  let serialStringIn = serial.readLine(); // declare a variable to store incoming serial as string

  // listen for a new rotary button press
  if (serialStringIn == "rotary button: pressed") {
    print("rotary button: pressed");
    stateTutorial();

    // listen for a new rotary dial position
  } else if (serialStringIn == "rotary position: 1") {
    state01();
    print("rotary position: 1");
  } else if (serialStringIn == "rotary position: 2") {
    state02();
    print("rotary position: 2");
  } else if (serialStringIn == "rotary position: 3") {
    state03();
    print("rotary position: 3");
  } else if (serialStringIn == "rotary position: 4") {
    state04();
    print("rotary position: 4");

    // TODO: listen for rotary positions 5 - 19

  } else if (serialStringIn == "rotary position: 5") {
    state20();
    print("rotary position: 5");

    // listen for a new hall effect sensor tick
  } else if (serialStringIn.length > 0 && serialStringIn.length < 5) { // if the incoming serial string is between 1 - 4 characters
    serialCrankCurrent = Number(serialStringIn); // translate incoming serial string to a number

    if (serialCrankCurrent > serialCrankPrior) {
      serialCrankPrior = serialCrankCurrent;
      substringIndexIncrease();
    } else if (serialCrankCurrent < serialCrankPrior) {
      serialCrankPrior = serialCrankCurrent;
      substringIndexDecrease();
    }

    // print("tick");
  }
  // print(serialCrankCurrent);
}

function substringIndexIncrease() {
  substringIndex++;
  //print("substringIndex *in*creased")
}

function substringIndexDecrease() {
  // just a placeholder for the time being
  //print("substringIndex *de*creased")
}


/*********************************
 * there's a state for every poem
 *********************************/

function stateTutorial() {
  alphaValue = 0;
  removeElements();
  currentPoem = tutorial;
  print("current poem: tutorial");
  substringPlaylist = [
    [0, 51], // entire poem
  ];

  print(substringPlaylist);
  poemSetup();
  poemLayout();
  poemInteract();
}

function stateDescribe() {
  alphaValue = 0;
  removeElements();
  currentPoem = describe;
  print("current poem: describe");
  substringPlaylist = [
    [0, 2204], // entire poem
  ];

  print(substringPlaylist);
  poemSetup();
  poemLayout();
  poemInteract();
}

function stateIreland() {
  alphaValue = 0;
  removeElements();
  currentPoem = ireland;
  print("current poem: ireland");
  substringPlaylist = [
    [0, 2204], // entire poem
  ];

  print(substringPlaylist);
  poemSetup();
  poemLayout();
  poemInteract();
}

function stateTitle() {
  alphaValue = 0;
  removeElements();
  currentPoem = title;
  print("current poem: title");
  substringPlaylist = [
    [0, 2204], // entire poem
  ];

  print(substringPlaylist);
  poemSetup();
  poemLayout();
  poemInteract();
}

function state01() {
  alphaValue = 0;
  reveal = false;
  removeElements();
  currentPoem = poem01;
  print("current poem: 01");
  substringPlaylist = [
    [0, 2204], // entire poem
  ];

  print(substringPlaylist);
  poemSetup();
  poemLayout();
  poemInteract();
}

function state02() {
  alphaValue = 0;
  removeElements();
  currentPoem = poem02;
  print("current poem: 02");
  substringPlaylist = [
    [0, 1636], // entire poem
  ];

  print(substringPlaylist);
  poemSetup();
  poemLayout();
  poemInteract();
}

function state03() {
  alphaValue = 0;
  removeElements();
  currentPoem = poem03;
  print("current poem: 03");
  substringPlaylist = [
    [0, 2642], // entire poem
  ];

  print(substringPlaylist);
  poemSetup();
  poemLayout();
  poemInteract();
}

function state04() {
  alphaValue = 0;
  removeElements();
  currentPoem = poem04;
  print("current poem: 04");
  substringPlaylist = [
    [0, 1401], // entire poem
  ];

  print(substringPlaylist);
  poemSetup();
  poemLayout();
  poemInteract();
}

// TODO: add states 05 thru 19

function state20() {
  alphaValue = 0;
  removeElements();
  currentPoem = poem20;
  print("current poem: 20");

  /*  
  // sanity check to confirm substring ins & outs in console
  print(currentPoem.substring(86, 124));
  print(currentPoem.substring(171, 184));
  print(currentPoem.substring(186, 224));
  print(currentPoem.substring(534, 567));
  print(currentPoem.substring(553, 598));
*/

  substringPlaylist = [
    [0, 27], // "But you see it does not end"
    [703, 729], // "K on RS, P on WS, P5, turn"
    [51, 84], // "the story has been lived and told
    [731, 756], // "sl 1, K1, psso, K1, K2tog"
    [534, 567], // "perhaps he goes on breathing Bach"
    [703, 729], // "K on RS, P on WS, P5, turn"
    [553, 583], // "breathing Bach while she knits"
    [731, 756], // "sl 1, K1, psso, K1, K2tog"
    [106, 136], // "what has happened to the birds"
    [154, 170], // "the vagrant cat?"
    [703, 729], // "K on RS, P on WS, P5, turn"
    [186, 203], // "they remain there"
    [236, 261], // "where they first appeared"
    [731, 756], // "sl 1, K1, psso, K1, K2tog"
    [263, 286], // "the shadow of the thing"
    [344, 358], // "And who she is"
    [703, 729], // "K on RS, P on WS, P5, turn"
    [731, 756], // "sl 1, K1, psso, K1, K2tog"
    [534, 567], // "perhaps he goes on breathing Bach"
    [553, 583], // "breathing Bach while she knits"
    [703, 729], // "K on RS, P on WS, P5, turn"
    [731, 756], // "sl 1, K1, psso, K1, K2tog"
    // [625, 652], // "never seen much sense in it"
    [668, 701], // "liking nonetheless the code of it"
    [703, 729], // "K on RS, P on WS, P5, turn"
    [731, 756], // "sl 1, K1, psso, K1, K2tog"
    [774, 789], // "as if the world"
    [856, 863] // "a song."
    // [0, 863], // entire poem
    // [ 86, 124], // "do you want to know what has happened"
    // [171, 184], // "Of course not"
    // [568, 598], // "while she knits beside the bed"
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}


/****************************************************
 * every state / poem uses the same layout in p5.dom
 ****************************************************/

function poemLayout() {

  // add a first <p> to hold the title pf the poem
  paragraph = createP();
  paragraph.style('font-size', '35px');
  // paragraph.style('margin', '150px');
  paragraph.style('margin-top', '200px');
  // paragraph.style('margin-bottom', '200px');
  paragraph.style('margin-right', '200px');
  paragraph.style('margin-left', '200px');
  paragraph.style('color: rgba(0, 0, 0, 0)');
  // paragraph.style('padding' '150px');

  // create an array filled with each character of the current poem wrapped in <span> tags
  for (let i = 0; i < currentPoem.length; i++) {
    let span = createSpan(currentPoem.charAt(i));
    span.style('position: relative');
    span.style('color: rgba(0, 0, 0, 0)');
    paragraph.child(span);
  }
}


/***************************************************************************
 * every state / poem needs an array for its playlist and its in & out cues
 ***************************************************************************/

function poemSetup() {
  playlistIndex = 0; // begin with the first substring in the playlist
  substringIndex = 0; // begin with the first character in the substring
  substringInOut = substringPlaylist[playlistIndex];
}


/**************************************************************
 * this is the guts of the interaction, called from each state
 **************************************************************/

function poemInteract() {
  let children = selectAll('span', paragraph);
  if (substringIndex === 0) {
    substringIndex = substringInOut[0];
  }
  // if the current substring reaches it's last character
  if (substringIndex === substringInOut[1]) {
    if (playlistIndex < substringPlaylist.length - 1) {
      // increment the index value for the ins & outs array
      playlistIndex++;
      // monkey patch code to re-purpose the one playlist for poem20
      for (let i = 0; i < children.length; i++) {
        // color wipe the current substring
        children[i].style('color: rgba(0, 0, 0, 0)');
      }
      // move to next substring in array of substrings
      substringInOut = substringPlaylist[playlistIndex];
      print('playlist index: ', playlistIndex);
      print('substring in & out:', substringInOut);
      // reset substringIndex to the first index of the next substring
      substringIndex = substringInOut[0];
    } else {

      // when you reach the end of the ins and outs array, reset
      // playlistIndex = 0;
      // substringInOut = substringPlaylist[playlistIndex];


      //       if(frameCount % 2 == 0 && alphaValue < 1){
      //         alphaValue += 0.01;

      //         console.log("alphaValue", alphaValue);
      //       }

      //         for (let i = 0; i < children.length; i++) {
      //           // color wipe the entire poem
      //           children[i].style('color: rgba(0, 0, 0, ' + alphaValue + ')');
      //         }

      reveal = true;
    }
  }
  // 
  if (substringIndex >= substringInOut[0] && substringIndex < substringInOut[1]) {
    //print('here');
    children[substringIndex].style('color: black');
  }

  if (autoPlay == true) {
    if (frameCount % 2 == 0) { // to slow down the auto play, increase the modulus
      //console.log(frameCount, "MOVE");

      // TODO make this stop when the entire substring is revealed
      substringIndex++;
    }
  }

  if (reveal == true) {
    if (frameCount % 8 == 0) { // to slow down the reveal, increase the modulus
      if (alphaValue < 1) {
        alphaValue += 0.01;
      } else {
        /*
        //use below to reset the reveal animation
        // reveal = false;
        // alphaValue = 0;

        // use below to reset the entire interaction (inverted for some reason)
        playlistIndex = 0;
        substringIndex = 0;
        */
      }
      // print("alphaValue", alphaValue);
    }
    print(children.length);
    for (let i = 0; i < children.length; i++) {
      // color wipe the entire poem
      children[i].style('color: rgba(0, 0, 0, ' + alphaValue + ')');
    }
  }
}


/************************************************************************************
 * keyboard settings for interacting w/ the sketch w/o serial input from the Arduino
 ************************************************************************************/

function keyPressed() {
  if (keyCode === UP_ARROW) {
    substringIndex++;

    // TODO: reverse step-thru-playlist currently not working

  } else if (keyCode === DOWN_ARROW) {
    substringIndex--;
  } else if (keyCode === RIGHT_ARROW) {
    if (autoPlay == true) {
      autoPlay = false;
    } else {
      autoPlay = true;
    }

  } else if (keyCode === 65) {
    print("key pressed: a");
    stateTutorial();
  } else if (keyCode === 83) {
    print("key pressed: s");
    stateDescribe();
  } else if (keyCode === 68) {
    print("key pressed: d");
    stateIreland();
  } else if (keyCode === 70) {
    print("key pressed: f");
    stateTitle();
  } else if (keyCode === 49) {
    print("key pressed: 1");
    state01();
  } else if (keyCode === 50) {
    print("key pressed: 2");
    state02();
  } else if (keyCode === 51) {
    print("key pressed: 3");
    state03();
  } else if (keyCode === 52) {
    print("key pressed: 4");
    state04();

    // TODO: add states 05 thru 19

  } else if (keyCode === 80) {
    print("key pressed: p");
    state20();
  } else if (keyCode === 90) {
    print("key pressed: z");
    createPoemCharRef();
  }
  return false; // turns off any browser-specific default key
}


/*************************************************************************************
 * generate a text file that references each character in the poem to its index value
 *************************************************************************************/

function createPoemCharRef() {
  let currentPoemCharRef = [];
  for (i = 0; i < currentPoem.length; i++) {
    // print(currentPoem[i] + " is at index [" + i + "]");
    currentPoemCharRef.push(currentPoem[i] + " - [" + i + "]");
  }
  print("generating char-index_" + currentPoem + ".txt");
  saveStrings(currentPoemCharRef, 'char-index_poem0.txt'); // print to .txt file
}


/********************************************************************
 * The functions below are used in conjunction with p5.serialcontrol
 ********************************************************************/

// get a list of serial port names and put them in an array called portList
function printList(portList) {
  // loop through the array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // and print the list to console
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}


// // TODO: reset the current poem using the keyboard
// function resetCurrentPoem() {
// }

// // TODO: reset the entire piece, called by a specific key
// function resetEntireSketch() {
// }

// // TODO: calculate the In & Out indeces using search by substring
// function findSubstringInOut() {
//   let substring = "Visit sl 1, K1, psso, K1, K2tog, turn, and so on Rashida";
//   let search_term = "sl 1, K1, psso, K1, K2tog, turn, and so on";
//   let poemSubstringIn = substring.search(search_term);
//   var poemSubstringInOut = substring.slice(poemSubstringIn, poemSubstringIn + search_term.length);
//   print(substring.slice(poemSubstringIn, poemSubstringIn + search_term.length));
// }/*
   Noah Pivnick
   Final Project, 2018 Fall
   Intro to Computational Media 2233.004 (Mimi Yin)
   Intro to Physical Computing 2301.003 (Tom Igoe)
   
   Acknowledgements:
   - Michael Joyce, friend and mentor, writer and poet, for sharing with me his unpublished poems
   - Giwon Park for help with code and urging me to use p5.dom
   - Allison Parish for sharing with me a crucial example of creating arrays of spans by character
   - Brent Baily for helping me sort out logic that correctly iterated through the substring playlist
   - Ashley for walking me through state machines
   - Mimi Yin, Tom Igoe, and Mithru Vigneshwara for their instruction, critique, and patience
*/

// p5.serialcontrol stuff
let serial; // declare a global variable for serial class
let portName = '/dev/cu.usbmodem1411';
let serialCrankCurrent;
let serialCrankPrior = 0;
let rotaryEncoder;
let rotaryButton = false;
let countCrankDelayStart; // variable to set how many crank rotations over serial before starting text effect

// state machine stuff
// let state;

// p5.dom stuff
let div;
let header; // to hold the name / number) of the poem / state
let paragraph;

// poem content stuff
let tutorial = "Turn the crank on the yarn ball winder to begin ...";
let describe = "Creaturely Life takes it's name from a collection of poems by Michael Joyce, written in stream of consciousness from the perspective of a woman keeping vigil over her dying husband. The final poem in the series recounts having found solace in knitting beside her husband’s deathbed.";
let ireland = "In Ireland, there is a traditional Halloween practice in which young girls make their way to a limekiln with a ball of yarn. Holding the loose end, they throw the ball of yarn into the dark. If the string goes taught as they rewind the length of yarn, they then call out ‘who howlds my bottom of yarn?’ and expect to hear the name of the man they are to marry.";
let title = "Creaturely life: twenty pre-elegies by Michael Joyce";
let poem01 = "It is how he lives that she watches she insists, for the dying will take care of itself, it has already become a thing for them, the dying, a disconsolate creature perched sometimes on the wide sill outside the window where yesterday a window washer swung from the canvas harness swiping interlaced crescents across the clouded glass as if a drab angel. But death, death takes the form of a monkey, the Mandrillus sphinx, the blue ridges of its muzzle fierce as a Maori tattoo below amber eyes, sitting propped on its magnificently multi-colored rump, the colors of cotton candy, sucking the flesh from a peach that someone has left on a tray, such a bounty gone to waste hereabouts, the dying having no appetite for such a damp, sweet lusciousness as a random peach. Watching him she longs for dampness once again, just one more what? One more anything, the feeling as he descends over her smooth belly to the place between her thighs, or the simple kiss of early lovers, before the mouth becomes perfunctory, dry, its crater swabbed with foam tipped swabs, which the bright young thing, the one who brings a smile to him, said “you can suck on like a lollipop.” It was hard not to hate her for her youth or begrudge an innocence that cannot suspect a graying (for she is still more raven than owl) woman of bawdy, let alone lasciviousness, that fucking monkey, death, let’s call it by its name, eating the conventional banana like a bewildered frau on an amateur porn site, wondering how has our marriage come to this? three minute segments of fellatio, pushing the hair back from your eyes awaiting the crowning moment, the fucking mandrill, sphinx, laughing in raucous cheeps his dreadful yellow teeth exposed between the nostrils and lips red as if it had just fed upon a plum or the still bloody corpse of a young antelope. And now she wants to know would you like to eat anything, this girl, “I can bring you a tray if you want to stay.” Yes, I want to eat you up, to suck the life from you until you moan not knowing whether you are coming or going, so to speak, feeding the sweet mush back to him, forcing my tongue between the dry lips like a swab, filling him like a mother bird her fledgling.";
let poem02 = "Wrens flit upon the sill as well, land and peck and set off again as if feeding upon miniscule seeds, invisible pollen, or perhaps dander, the world being a swirl of dander according to the science pages, dust to dust and such, they come and go these tiny things five floors up above the forlorn park, so clearly just an annex to the vast parking lots row on row of SUVs that stretch out like gravestones along the LIE. We have grown into acronymic times and trucks disguised as passenger cars, great dark things you cannot see around or through, and so process along the expressway as if mourners en route to a stranger’s funeral or to Orient Beach along the North Fork on a summer weekend. With some things it is better at the end, in winter, cocooned in a hooded, black parka, making your way among the terns at the dull edge of the dirty tidal froth, or closer in at Southhold along the saltwater wetlands of Arshamomque Pond. Is it wrong to want to be off somewhere, to come and go as freely as these drab birds? She whispers this question, these questions, into his ear as he sleeps the sleep of the morphine drip, dire sister of the oxycontin dreams. Won’t you get up for just a little while and come with me, to the sea, the sea of love. I want to hold you, I want to tell you. Do you remember? Once you were my pet and now, I suppose, you are again. I watch you and think how lovely you are living just now, struggling against these hallucinatory dreams, waking a little disappointed not to have died, not to be free of all you have to do just now, all this business of sleeping and waking, landing and pecking and setting off.";
let poem03 = "What evidences of living she could say if asked (but by whom?) having made such observance her new science: the faint sway, for instance, of the feathery hairs within his nostril like a Japanese landscape in miniature, thin reeds upon a cavern pool raked by a breeze perfumed with apple blossoms. It is the scent of opiates she supposes, still he works at this, his is the engine of these breezes, although mostly when awake his eyes are indistinct, not so much dull as deep, the blue of beach glass, rocked and polished in the underlying tides, the rip beneath that swells the crests farther out where the boys await on their boards, slick as seals, paddling listlessly. These eyes not the terrifying countenance of the cows (nor the angels) at Duino, “who do not, if one touches them, fall apart into a heap of words,” but who persist, this Rilke does not write exactly to the Princess Marie von Thurn und Taxis, they persist in mystery, they are themselves mystery, this is their being, the terror before which one sits and stares, looking for him there like a bauble lost in a tidal pool, a pretty ring or a holy medal (are there any longer such things?) pinned to the dress of a boy at baptism or to the bib of a hospital gown (surely it is a misprision to call them so, what ceremony or ball masque calls for this rude covering “fastened behind”?)– I’ve lost my place, she thinks, in this inventory of living (not living things, mind you, but living!); when– there!– as if on cue by way of further evidence he kicks free the bottom of a leg from the sheet where they persist in tucking him in, kicking free a life-long habit she can attest to who’s slept a hundred times a hundred nights next to him more or less, but to say now less, no more, seems to her maudlin, sleeping here in the chair counts she insists (to whom, she realizes now, is herself) and twice this week has crawled in and curled with him there, like twin commas interposed, yin and yang. Kicks free the other just then (it’s him, really, who is the measure of her insistence), wishing all his life to be born from whatever enclosures, do you see? She does, she sees the irregular black ankle bracelet now into which the dog bite has healed after years, in the form of a black crown, the beast gripping the ankle in its powerful jaw, teeth sunk to the bone, not fate or destiny but a dumb instance of chance, an indifferent hound, not attacking him exactly, but rather the figure in black moving along the sidewalk beyond the chainlink fence the hound had smashed against a hundred times before this one time the gate gave in where the mad woman had failed to latch it.";
let poem04 = "She feels no affinity for the stray cat that patrols the postage stamp park below, its scraggly tail (her language is reduced to this: stray and scraggly, some discomfort, breathing comfortably, and the like) like a wire– or not that, a bottle washer, do they still make those?; its color soot, at least from this high up, although she would like to think it the color of rich velvet, she who has no sympathy for cats, their solitariness and sinuosity not hers, not hers to wind among the furniture, back curled up like a cartoon feline, she all her life moving erect, a word reserved she supposes for matrons or sexual organs, his having almost turned blue, hooded and shrunken as if preparing to greet its maker, its modest retreat surely not intended for the aide who treats it like meat when she baths him, the bright silver bowl of suds propped against his hip, her sponge unexpectedly the fairest shade of lavender and worn like a courtesan’s glove, her smile likewise, asking her “Would you rather do this for him or take this moment to step out?” What choices else, she does not ask this fair haired child, freckles on her cheek and upper breast when she bends over him. There was a time when he would not have missed this, taking advantage of every gap and vista upon the rich plenitude of women’s bodies. It is he who is like a cat, of course, prowling crevice and remove even in this sleep.";
let poem05 = "(5)";
let poem06 = "(6)";
let poem07 = "(7)";
let poem08 = "(8)";
let poem09 = "(9)";
let poem10 = "(10)";
let poem11 = "(11)";
let poem12 = "(12)";
let poem13 = "(13)";
let poem14 = "(14)";
let poem15 = "(15)";
let poem16 = "(16)";
let poem17 = "(17)";
let poem18 = "(18)";
let poem19 = "(19)";
let poem20 = "But you see it does not end, the living, even when the story has been lived and told; do you want to know what has happened to the birds upon the sill or the vagrant cat? Of course not, they remain there where they were left as well as where they first appeared, the shadow of the thing an equal to the thing itself under certain circumstance. And who she is now they have wiped from the tiny bathroom mirror just beyond the bed where she greeted it each morning and bid it good night when the corridor lights dimmed. Or perhaps not, perhaps he goes on breathing Bach while she knits beside the bed although in truth she has never seen much sense in it, the knitting, liking nonetheless the code of it, K on RS, P on WS, P5, turn, sl 1, K1, psso, K1, K2tog, turn, and so on as if the world’s purpose (this the apple tree pattern for a baby’s blanket) were a song.";

let currentPoem;

// playlist stuff
let substringPlaylist = [];
let playlistIndex = []; // an array used to store the current poem's playlist indexes
let substringIndex = []; // an array used to store the current poem's current substring's indexes
let substringInOut = []; // an array to store the current poem's current substring's start and stop indexes

// poem reveal stuff
let alphaValue = 0;
let reveal = false;

// keyboard control stuff
let autoPlay = false;


/***************************
 * P5 sketch setup function
 ***************************/

function setup() {
  noCanvas();

  // p5.serialcontrol stuff
  serial = new p5.SerialPort(); // instantiate a new serial object
  serial.on('list', printList); // Serial.list();
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose);
  serial.open(portName);

  // p5.dom stuff
  stateTutorial();
}


/**********************
 * P5 sketch draw loop
 **********************/

function draw() {
  poemInteract();
}


/**************************************
 * serial data coming from the Arduino
 **************************************/

function serialEvent() {
  // the Arduino should be sending ASCII over serial
  let serialStringIn = serial.readLine(); // declare a variable to store incoming serial as string

  // listen for a new rotary button press
  if (serialStringIn == "rotary button: pressed") {
    print("rotary button: pressed");
    stateTutorial();

    // listen for a new rotary dial position
  } else if (serialStringIn == "rotary position: 1") {
    state01();
    print("rotary position: 1");
  } else if (serialStringIn == "rotary position: 2") {
    state02();
    print("rotary position: 2");
  } else if (serialStringIn == "rotary position: 3") {
    state03();
    print("rotary position: 3");
  } else if (serialStringIn == "rotary position: 4") {
    state04();
    print("rotary position: 4");

    // TODO: listen for rotary positions 5 - 19

  } else if (serialStringIn == "rotary position: 20") {
    state20();
    print("rotary position: 20");

    // listen for a new hall effect sensor tick
  } else if (serialStringIn.length > 0 && serialStringIn.length < 5) { // if the incoming serial string is between 1 - 4 characters
    serialCrankCurrent = Number(serialStringIn); // translate incoming serial string to a number

    if (serialCrankCurrent > serialCrankPrior) {
      serialCrankPrior = serialCrankCurrent;
      substringIndexIncrease();
    } else if (serialCrankCurrent < serialCrankPrior) {
      serialCrankPrior = serialCrankCurrent;
      substringIndexDecrease();
    }

    // print("tick");
  }
  // print(serialCrankCurrent);
}

function substringIndexIncrease() {
  substringIndex++;
  //print("substringIndex *in*creased")
}

function substringIndexDecrease() {
  // just a placeholder for the time being
  //print("substringIndex *de*creased")
}


/*********************************
 * there's a state for every poem
 *********************************/

function stateTutorial() {
  removeElements();
  currentPoem = tutorial;
  print("current poem: tutorial");
  substringPlaylist = [
    [0, 51], // entire poem
  ];

  print(substringPlaylist);
  poemSetup();
  poemLayout();
  poemInteract();
}

function stateDescribe() {
  removeElements();
  currentPoem = describe;
  print("current poem: describe");
  substringPlaylist = [
    [0, 2204], // entire poem
  ];

  print(substringPlaylist);
  poemSetup();
  poemLayout();
  poemInteract();
}

function stateIreland() {
  removeElements();
  currentPoem = ireland;
  print("current poem: ireland");
  substringPlaylist = [
    [0, 2204], // entire poem
  ];

  print(substringPlaylist);
  poemSetup();
  poemLayout();
  poemInteract();
}

function stateTitle() {
  removeElements();
  currentPoem = title;
  print("current poem: title");
  substringPlaylist = [
    [0, 2204], // entire poem
  ];

  print(substringPlaylist);
  poemSetup();
  poemLayout();
  poemInteract();
}

function state01() {
  removeElements();
  currentPoem = poem01;
  print("current poem: 01");
  substringPlaylist = [
    [0, 2204], // entire poem
  ];

  print(substringPlaylist);
  poemSetup();
  poemLayout();
  poemInteract();
}

function state02() {
  removeElements();
  currentPoem = poem02;
  print("current poem: 02");
  substringPlaylist = [
    [0, 1636], // entire poem
  ];

  print(substringPlaylist);
  poemSetup();
  poemLayout();
  poemInteract();
}

function state03() {
  removeElements();
  currentPoem = poem03;
  print("current poem: 03");
  substringPlaylist = [
    [0, 2642], // entire poem
  ];

  print(substringPlaylist);
  poemSetup();
  poemLayout();
  poemInteract();
}

function state04() {
  removeElements();
  currentPoem = poem04;
  print("current poem: 04");
  substringPlaylist = [
    [0, 1401], // entire poem
  ];

  print(substringPlaylist);
  poemSetup();
  poemLayout();
  poemInteract();
}

// TODO: add states 05 thru 19

function state20() {
  removeElements();
  currentPoem = poem20;
  print("current poem: 20");

  /*  
  // sanity check to confirm substring ins & outs in console
  print(currentPoem.substring(86, 124));
  print(currentPoem.substring(171, 184));
  print(currentPoem.substring(186, 224));
  print(currentPoem.substring(534, 567));
  print(currentPoem.substring(553, 598));
*/

  substringPlaylist = [
    [0, 27], // "But you see it does not end"
    [703, 729], // "K on RS, P on WS, P5, turn"
    [51, 84], // "the story has been lived and told
    [731, 756], // "sl 1, K1, psso, K1, K2tog"
    [534, 567], // "perhaps he goes on breathing Bach"
    [703, 729], // "K on RS, P on WS, P5, turn"
    [553, 583], // "breathing Bach while she knits"
    [731, 756], // "sl 1, K1, psso, K1, K2tog"
    [106, 136], // "what has happened to the birds"
    [154, 170], // "the vagrant cat?"
    [703, 729], // "K on RS, P on WS, P5, turn"
    [186, 203], // "they remain there"
    [236, 261], // "where they first appeared"
    [731, 756], // "sl 1, K1, psso, K1, K2tog"
    [263, 286], // "the shadow of the thing"
    [344, 358], // "And who she is"
    [703, 729], // "K on RS, P on WS, P5, turn"
    [731, 756], // "sl 1, K1, psso, K1, K2tog"
    [534, 567], // "perhaps he goes on breathing Bach"
    [553, 583], // "breathing Bach while she knits"
    [703, 729], // "K on RS, P on WS, P5, turn"
    [731, 756], // "sl 1, K1, psso, K1, K2tog"
    // [625, 652], // "never seen much sense in it"
    [668, 701], // "liking nonetheless the code of it"
    [703, 729], // "K on RS, P on WS, P5, turn"
    [731, 756], // "sl 1, K1, psso, K1, K2tog"
    [774, 789], // "as if the world"
    [856, 863] // "a song."
    // [0, 863], // entire poem
    // [ 86, 124], // "do you want to know what has happened"
    // [171, 184], // "Of course not"
    // [568, 598], // "while she knits beside the bed"
  ];
  print(substringPlaylist);
  poemSetup();
  poemLayout();
  poemInteract();
}


/****************************************************
 * every state / poem uses the same layout in p5.dom
 ****************************************************/

function poemLayout() {
  div = createDiv();
  // div.style('margin-top', '200px');
  // div.style('margin-left', '200px');
  // div.style('margin-right', '200px');
  // div.style('margin-bottom', '200px');
  // div.child(header);
  // div.child(paragraph);
  // header = createElement('h2', '(Poem)');
  paragraph = createP();
  paragraph.style('font-size', '35px');
  // paragraph.style('margin', '150px');
  paragraph.style('margin-top', '200px');
  // paragraph.style('margin-bottom', '200px');
  paragraph.style('margin-right', '200px');
  paragraph.style('margin-left', '200px');
  // paragraph.style('padding' '150px');

  // create an array filled with each character of the current poem wrapped in <span> tags
  for (let i = 0; i < currentPoem.length; i++) {
    let span = createSpan(currentPoem.charAt(i));
    span.style('position: relative');
    span.style('color: rgba(0, 0, 0, 0)');
    paragraph.child(span);
  }
}


/***************************************************************************
 * every state / poem needs an array for its playlist and its in & out cues
 ***************************************************************************/

function poemSetup() {
  playlistIndex = 0; // begin with the first substring in the playlist
  substringIndex = 0; // begin with the first character in the substring
  substringInOut = substringPlaylist[playlistIndex];
}


/**************************************************************
 * this is the guts of the interaction, called from each state
 **************************************************************/

function poemInteract() {
  let children = selectAll('span', paragraph);
  if (substringIndex === 0) {
    substringIndex = substringInOut[0];
  }
  // if the current substring reaches it's last character
  if (substringIndex === substringInOut[1]) {
    if (playlistIndex < substringPlaylist.length - 1) {
      // increment the index value for the ins & outs array
      playlistIndex++;
      for (let i = 0; i < children.length; i++) {
        // color wipe the current substring
        children[i].style('color: rgba(0, 0, 0, 0)');
      }
      // move to next substring in array of substrings
      substringInOut = substringPlaylist[playlistIndex];
      console.log('playlist index: ', playlistIndex);
      console.log('substring in & out:', substringInOut);
      // reset substringIndex to the first index of the next substring
      substringIndex = substringInOut[0];
    } else {

      // when you reach the end of the ins and outs array, reset
      // playlistIndex = 0;
      // substringInOut = substringPlaylist[playlistIndex];


      //       if(frameCount % 2 == 0 && alphaValue < 1){
      //         alphaValue += 0.01;

      //         console.log("alphaValue", alphaValue);
      //       }

      //         for (let i = 0; i < children.length; i++) {
      //           // color wipe the entire poem
      //           children[i].style('color: rgba(0, 0, 0, ' + alphaValue + ')');
      //         }

      reveal = true;
    }
  }
  // 
  if (substringIndex >= substringInOut[0] && substringIndex < substringInOut[1]) {
    //print('here');
    children[substringIndex].style('color: black');
  }

  if (autoPlay == true) {
    if (frameCount % 2 == 0) { // to slow down the auto play, increase the modulus
      //console.log(frameCount, "MOVE");
      substringIndex++;
    }
  }

  if (reveal == true) {
    if (frameCount % 8 == 0) { // to slow down the reveal, increase the modulus
      if (alphaValue < 1) {
        alphaValue += 0.01;
      } else {
        /*
        //use below to reset the reveal animation
        // reveal = false;
        // alphaValue = 0;

        // use below to reset the entire interaction (inverted for some reason)
        playlistIndex = 0;
        substringIndex = 0;
        */
      }
      print("alphaValue", alphaValue);
    }
    for (let i = 0; i < children.length; i++) {
      // color wipe the entire poem
      children[i].style('color: rgba(0, 0, 0, ' + alphaValue + ')');
    }
  }
}


/************************************************************************************
 * keyboard settings for interacting w/ the sketch w/o serial input from the Arduino
 ************************************************************************************/

function keyPressed() {
  if (keyCode === UP_ARROW) {
    substringIndex++;

    // TODO: reverse step-thru-playlist currently not working

  } else if (keyCode === DOWN_ARROW) {
    substringIndex--;
  } else if (keyCode === RIGHT_ARROW) {
    if (autoPlay == true) {
      autoPlay = false;
    } else {
      autoPlay = true;
    }

  } else if (keyCode === 65) {
    print("key pressed: a");
    stateTutorial();
  } else if (keyCode === 83) {
    print("key pressed: s");
    stateDescribe();
  } else if (keyCode === 68) {
    print("key pressed: d");
    stateIreland();
  } else if (keyCode === 70) {
    print("key pressed: f");
    stateTitle();
  } else if (keyCode === 49) {
    print("key pressed: 1");
    state01();
  } else if (keyCode === 50) {
    print("key pressed: 2");
    state02();
  } else if (keyCode === 51) {
    print("key pressed: 3");
    state03();
  } else if (keyCode === 52) {
    print("key pressed: 4");
    state04();

    // TODO: add states 05 thru 19

  } else if (keyCode === 80) {
    print("key pressed: p");
    state20();
  } else if (keyCode === 90) {
    print("key pressed: z");
    createPoemCharRef();
  }
  return false; // turns off any browser-specific default key
}


/*************************************************************************************
 * generate a text file that references each character in the poem to its index value
 *************************************************************************************/

function createPoemCharRef() {
  let currentPoemCharRef = [];
  for (i = 0; i < currentPoem.length; i++) {
    // print(currentPoem[i] + " is at index [" + i + "]");
    currentPoemCharRef.push(currentPoem[i] + " - [" + i + "]");
  }
  print("generating char-index_" + currentPoem + ".txt");
  saveStrings(currentPoemCharRef, 'char-index_poem0.txt'); // print to .txt file
}


/********************************************************************
 * The functions below are used in conjunction with p5.serialcontrol
 ********************************************************************/

// get a list of serial port names and put them in an array called portList
function printList(portList) {
  // loop through the array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // and print the list to console
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}


// // TODO: reset the current poem using the keyboard
// function resetCurrentPoem() {
// }

// // TODO: reset the entire piece, called by a specific key
// function resetEntireSketch() {
// }

// // TODO: calculate the In & Out indeces using search by substring
// function findSubstringInOut() {
//   let substring = "Visit sl 1, K1, psso, K1, K2tog, turn, and so on Rashida";
//   let search_term = "sl 1, K1, psso, K1, K2tog, turn, and so on";
//   let poemSubstringIn = substring.search(search_term);
//   var poemSubstringInOut = substring.slice(poemSubstringIn, poemSubstringIn + search_term.length);
//   print(substring.slice(poemSubstringIn, poemSubstringIn + search_term.length));
// }/*
   Noah Pivnick
   Final Project, 2018 Fall
   Intro to Computational Media 2233.004 (Mimi Yin)
   Intro to Physical Computing 2301.003 (Tom Igoe)
   
   Acknowledgements:
   - Michael Joyce, friend and mentor, writer and poet, for sharing with me his collection of unpublished poems.
   - Giwon Park for help with code and urging me to use p5.dom
   - Allison Parish for sharing an illuminating example of creating arrays of spans by character: https://editor.p5js.org/allison.parrish/sketches/rkphkGJJN
   - Brent Baily for helping me sort out logic that correctly iterated through the substring playlist
   - Ashley for walking through state machines with me
   - Mimi Yin for patiently helping me wrap my head around the project's computational requirements*/


// p5.serialcontrol stuff
let serial; // declare a global variable for serial class
let portName = '/dev/cu.usbmodem1411';
let serialCrankCurrent;
let serialCrankPrior = 0;
let rotaryEncoder;
let rotaryButton = false;
let countCrankDelayStart; // variable to set how many crank rotations over serial before starting text effect

// state machine stuff
let state = 01;

// p5.dom stuff
let paragraph;

// poem content stuff
let tutorial;
let title; // title, author
let poem00; // define Irish term "bottom"
let poem01 = "It is how he lives that she watches she insists, for the dying will take care of itself, it has already become a thing for them, the dying, a disconsolate creature perched sometimes on the wide sill outside the window where yesterday a window washer swung from the canvas harness swiping interlaced crescents across the clouded glass as if a drab angel. But death, death takes the form of a monkey, the Mandrillus sphinx, the blue ridges of its muzzle fierce as a Maori tattoo below amber eyes, sitting propped on its magnificently multi-colored rump, the colors of cotton candy, sucking the flesh from a peach that someone has left on a tray, such a bounty gone to waste hereabouts, the dying having no appetite for such a damp, sweet lusciousness as a random peach. Watching him she longs for dampness once again, just one more what? One more anything, the feeling as he descends over her smooth belly to the place between her thighs, or the simple kiss of early lovers, before the mouth becomes perfunctory, dry, its crater swabbed with foam tipped swabs, which the bright young thing, the one who brings a smile to him, said “you can suck on like a lollipop.” It was hard not to hate her for her youth or begrudge an innocence that cannot suspect a graying (for she is still more raven than owl) woman of bawdy, let alone lasciviousness, that fucking monkey, death, let’s call it by its name, eating the conventional banana like a bewildered frau on an amateur porn site, wondering how has our marriage come to this? three minute segments of fellatio, pushing the hair back from your eyes awaiting the crowning moment, the fucking mandrill, sphinx, laughing in raucous cheeps his dreadful yellow teeth exposed between the nostrils and lips red as if it had just fed upon a plum or the still bloody corpse of a young antelope. And now she wants to know would you like to eat anything, this girl, “I can bring you a tray if you want to stay.” Yes, I want to eat you up, to suck the life from you until you moan not knowing whether you are coming or going, so to speak, feeding the sweet mush back to him, forcing my tongue between the dry lips like a swab, filling him like a mother bird her fledgling.";
let poem02 = "Wrens flit upon the sill as well, land and peck and set off again as if feeding upon miniscule seeds, invisible pollen, or perhaps dander, the world being a swirl of dander according to the science pages, dust to dust and such, they come and go these tiny things five floors up above the forlorn park, so clearly just an annex to the vast parking lots row on row of SUVs that stretch out like gravestones along the LIE. We have grown into acronymic times and trucks disguised as passenger cars, great dark things you cannot see around or through, and so process along the expressway as if mourners en route to a stranger’s funeral or to Orient Beach along the North Fork on a summer weekend. With some things it is better at the end, in winter, cocooned in a hooded, black parka, making your way among the terns at the dull edge of the dirty tidal froth, or closer in at Southhold along the saltwater wetlands of Arshamomque Pond. Is it wrong to want to be off somewhere, to come and go as freely as these drab birds? She whispers this question, these questions, into his ear as he sleeps the sleep of the morphine drip, dire sister of the oxycontin dreams. Won’t you get up for just a little while and come with me, to the sea, the sea of love. I want to hold you, I want to tell you. Do you remember? Once you were my pet and now, I suppose, you are again. I watch you and think how lovely you are living just now, struggling against these hallucinatory dreams, waking a little disappointed not to have died, not to be free of all you have to do just now, all this business of sleeping and waking, landing and pecking and setting off.";
let poem03 = "What evidences of living she could say if asked (but by whom?) having made such observance her new science: the faint sway, for instance, of the feathery hairs within his nostril like a Japanese landscape in miniature, thin reeds upon a cavern pool raked by a breeze perfumed with apple blossoms. It is the scent of opiates she supposes, still he works at this, his is the engine of these breezes, although mostly when awake his eyes are indistinct, not so much dull as deep, the blue of beach glass, rocked and polished in the underlying tides, the rip beneath that swells the crests farther out where the boys await on their boards, slick as seals, paddling listlessly. These eyes not the terrifying countenance of the cows (nor the angels) at Duino, “who do not, if one touches them, fall apart into a heap of words,” but who persist, this Rilke does not write exactly to the Princess Marie von Thurn und Taxis, they persist in mystery, they are themselves mystery, this is their being, the terror before which one sits and stares, looking for him there like a bauble lost in a tidal pool, a pretty ring or a holy medal (are there any longer such things?) pinned to the dress of a boy at baptism or to the bib of a hospital gown (surely it is a misprision to call them so, what ceremony or ball masque calls for this rude covering “fastened behind”?)– I’ve lost my place, she thinks, in this inventory of living (not living things, mind you, but living!); when– there!– as if on cue by way of further evidence he kicks free the bottom of a leg from the sheet where they persist in tucking him in, kicking free a life-long habit she can attest to who’s slept a hundred times a hundred nights next to him more or less, but to say now less, no more, seems to her maudlin, sleeping here in the chair counts she insists (to whom, she realizes now, is herself) and twice this week has crawled in and curled with him there, like twin commas interposed, yin and yang. Kicks free the other just then (it’s him, really, who is the measure of her insistence), wishing all his life to be born from whatever enclosures, do you see? She does, she sees the irregular black ankle bracelet now into which the dog bite has healed after years, in the form of a black crown, the beast gripping the ankle in its powerful jaw, teeth sunk to the bone, not fate or destiny but a dumb instance of chance, an indifferent hound, not attacking him exactly, but rather the figure in black moving along the sidewalk beyond the chainlink fence the hound had smashed against a hundred times before this one time the gate gave in where the mad woman had failed to latch it.";
let poem04 = "She feels no affinity for the stray cat that patrols the postage stamp park below, its scraggly tail (her language is reduced to this: stray and scraggly, some discomfort, breathing comfortably, and the like) like a wire– or not that, a bottle washer, do they still make those?; its color soot, at least from this high up, although she would like to think it the color of rich velvet, she who has no sympathy for cats, their solitariness and sinuosity not hers, not hers to wind among the furniture, back curled up like a cartoon feline, she all her life moving erect, a word reserved she supposes for matrons or sexual organs, his having almost turned blue, hooded and shrunken as if preparing to greet its maker, its modest retreat surely not intended for the aide who treats it like meat when she baths him, the bright silver bowl of suds propped against his hip, her sponge unexpectedly the fairest shade of lavender and worn like a courtesan’s glove, her smile likewise, asking her “Would you rather do this for him or take this moment to step out?” What choices else, she does not ask this fair haired child, freckles on her cheek and upper breast when she bends over him. There was a time when he would not have missed this, taking advantage of every gap and vista upon the rich plenitude of women’s bodies. It is he who is like a cat, of course, prowling crevice and remove even in this sleep.";
let poem05;
let poem06;
let poem07;
let poem08;
let poem09;
let poem10;
let poem11;
let poem12;
let poem13;
let poem14;
let poem15;
let poem16;
let poem17;
let poem18;
let poem19;
let poem20 = "But you see it does not end, the living, even when the story has been lived and told; do you want to know what has happened to the birds upon the sill or the vagrant cat? Of course not, they remain there where they were left as well as where they first appeared, the shadow of the thing an equal to the thing itself under certain circumstance. And who she is now they have wiped from the tiny bathroom mirror just beyond the bed where she greeted it each morning and bid it good night when the corridor lights dimmed. Or perhaps not, perhaps he goes on breathing Bach while she knits beside the bed although in truth she has never seen much sense in it, the knitting, liking nonetheless the code of it, K on RS, P on WS, P5, turn, sl 1, K1, psso, K1, K2tog, turn, and so on as if the world’s purpose (this the apple tree pattern for a baby’s blanket) were a song.";

let currentPoem = poem20

// playlist stuff
let substringPlaylist = [
  [0, 27], // "But you see it does not end"
  [703, 729], // "K on RS, P on WS, P5, turn"
  [51, 84], // "the story has been lived and told
  [731, 756], // "sl 1, K1, psso, K1, K2tog"
  [534, 567], // "perhaps he goes on breathing Bach"
  [703, 729], // "K on RS, P on WS, P5, turn"
  [553, 583], // "breathing Bach while she knits"
  [731, 756], // "sl 1, K1, psso, K1, K2tog"
  [106, 136], // "what has happened to the birds"
  [154, 170], // "the vagrant cat?"
  [703, 729], // "K on RS, P on WS, P5, turn"
  [186, 203], // "they remain there"
  [236, 261], // "where they first appeared"
  [731, 756], // "sl 1, K1, psso, K1, K2tog"
  [263, 286], // "the shadow of the thing"
  [344, 358], // "And who she is"
  [703, 729], // "K on RS, P on WS, P5, turn"
  [731, 756], // "sl 1, K1, psso, K1, K2tog"
  [534, 567], // "perhaps he goes on breathing Bach"
  [553, 583], // "breathing Bach while she knits"
  [703, 729], // "K on RS, P on WS, P5, turn"
  [731, 756], // "sl 1, K1, psso, K1, K2tog"
  // [625, 652], // "never seen much sense in it"
  [668, 701], // "liking nonetheless the code of it"
  [703, 729], // "K on RS, P on WS, P5, turn"
  [731, 756], // "sl 1, K1, psso, K1, K2tog"
  [774, 789], // "as if the world"
  [856, 863] // "a song."
  // [0, 863], // entire poem
  // [ 86, 124], // "do you want to know what has happened"
  // [171, 184], // "Of course not"
  // [568, 598], // "while she knits beside the bed"
];

let playlistIndex = 0; // set which substring the playlist begins with
let substringIndex = 0; // set the substring to begin with its first character
let substringInOut = substringPlaylist[playlistIndex];

// poem reveal stuff
let alphaValue = 0;
let reveal = false;

// keyboard control stuff
let autoPlay = false;


/***************************
 * P5 sketch setup function
 ***************************/

function setup() {
  noCanvas();

  // p5.serialcontrol stuff
  serial = new p5.SerialPort(); // instantiate a new serial object
  serial.on('list', printList); // Serial.list();
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose);
  serial.open(portName);

  // p5.dom stuff
  poemLayout();

}


/**********************
 * P5 sketch draw loop
 **********************/

function draw() {
  poemInteract();
  
  /* 
  // state-selection via Arduino

  if (rotaryEncoder == 1 && rotaryButton == true) {
    state01();
  } else if (rotaryEncorder == 2 && rotarryButton == true) {
    state02();
  } else if (rotaryEncorder == 3 && rotarryButton == true) {
    state03();
  } else if (rotaryEncoder == 4 && rotaryButton == true) {
    state04();
  } else if (rotaryEncorder == 20 && rotarryButton == true) {
    state20();
  }

  */

}


/**************************************
 * serial data coming from the Arduino
 **************************************/

function serialEvent() {
  // The hall effect sensor on the Arduino sends ASCII over serial
  let serialStringIn = serial.readLine(); // declare a variable to store incoming serial as string
  if (serialStringIn.length > 0) { // if the incoming serial string is anything other than empty
    serialCrankCurrent = Number(serialStringIn); // translate incoming serial string to a number
    print(serialCrankCurrent);

    // When the Arduino sends a new hall effect sensor reading ...
    if (serialCrankCurrent > serialCrankPrior) {
      serialCrankPrior = serialCrankCurrent;
      substringIndexIncrease();
    } else if (serialCrankCurrent < serialCrankPrior) {
      serialCrankPrior = serialCrankCurrent;
      substringIndexDecrease();
    }
  }
  // print("tick");
}

function substringIndexIncrease() {
  substringIndex++;
  //print("substringIndex *in*creased")
}

function substringIndexDecrease() {
  // just a placeholder for the time being
    //print("substringIndex *de*creased")
}


/*********************************
 * there's a state for every poem
 *********************************/

function state01() {
  currentPoem = poem01;
  print("current poem: 01");
  substringPlaylist = [
    [0, 2204], // entire poem
  ];
  poemInteract();
}

function state02() {
  currentPoem = poem02;
  print("current poem: 02");
  substringPlaylist = [
    [0, 1636], // entire poem
  ];
  poemInteract();
}

function state03() {
  currentPoem = poem03;
  print("current poem: 03");
  substringPlaylist = [
    [0, 2642], // entire poem
  ];
  poemInteract();
}

function state04() {
  currentPoem = poem04;
  print("current poem: 04");
  substringPlaylist = [
    [0, 1401], // entire poem
  ];
  poemInteract();
}

// TODO: add states 05 thru 19

function state20() {
  currentPoem = poem20;
  print("current poem: 20");
  // sanity check to confirm substring ins & outs in console
  print(currentPoem.substring(86, 124));
  print(currentPoem.substring(171, 184));
  print(currentPoem.substring(186, 224));
  print(currentPoem.substring(534, 567));
  print(currentPoem.substring(553, 598));
  substringPlaylist = [
    // [0, 863], // entire poem
  ];
  poemInteract();
}


/****************************************************
 * every state / poem uses the same layout in p5.dom
 ****************************************************/

function poemLayout () {
  paragraph = createP();
  paragraph.style('font-size', '35px');
  // paragraph.style('margin', '150px');
  paragraph.style('margin-top', '200px');
  // paragraph.style('margin-bottom', '100px');
  paragraph.style('margin-right', '200px');
  paragraph.style('margin-left', '200px');
  // paragraph.style('padding' '150px');

  // create an array filled with each character of the current poem wrapped in <span> tags
  for (let i = 0; i < currentPoem.length; i++) {
    let span = createSpan(currentPoem.charAt(i));
    span.style('position: relative');
    span.style('color: rgba(0, 0, 0, 0)');
    paragraph.child(span);
  }
}


/***************************************************************************
 * every state / poem needs an array for its playlist and its in & out cues
 ***************************************************************************/



/**************************************************************
 * this is the guts of the interaction, called from each state
 **************************************************************/

function poemInteract() {
  let children = selectAll('span', paragraph);
  if (substringIndex === 0) {
    substringIndex = substringInOut[0];
  }
  // once the last index of the substring
  if (substringIndex === substringInOut[1]) {
    if (playlistIndex < substringPlaylist.length - 1) {
      //increase index for array of ins and outs
      playlistIndex++;
      for (let i = 0; i < children.length; i++) {
        // color wipe the entire poem
        children[i].style('color: rgba(0, 0, 0, 0)');
      }
      // move to next substring in array of substrings
      substringInOut = substringPlaylist[playlistIndex];
      console.log('playlist index: ', playlistIndex);
      console.log('substring in & out:', substringInOut);
      // reset substringIndex to the first index of the next substring
      substringIndex = substringInOut[0];
    } else {
      // when you reach the end of the ins and outs array, reset
      // playlistIndex = 0;
      // substringInOut = substringPlaylist[playlistIndex];


      //       if(frameCount % 2 == 0 && alphaValue < 1){
      //         alphaValue += 0.01;

      //         console.log("alphaValue", alphaValue);
      //       }

      //         for (let i = 0; i < children.length; i++) {
      //           // color wipe the entire poem
      //           children[i].style('color: rgba(0, 0, 0, ' + alphaValue + ')');
      //         }
      reveal = true;
    }
  }
  // 
  if (substringIndex >= substringInOut[0] && substringIndex < substringInOut[1]) {
    //print('here');ß
    children[substringIndex].style('color: black');
  }

  if (autoPlay == true) {
    if (frameCount % 2 == 0) { // to slow down the auto play, increase the modulus
      //console.log(frameCount, "MOVE");
      substringIndex++;
    }
  }

  if (reveal == true) {
    if (frameCount % 8 == 0) { // to slow down the reveal, increase the modulus
      if (alphaValue < 1) {
        alphaValue += 0.01;
      } else {
        /*
        //use below to reset the reveal animation
        // reveal = false;
        // alphaValue = 0;

        // use below to reset the entire interaction (inverted for some reason)
        playlistIndex = 0;
        substringIndex = 0;
        */
      }
      console.log("alphaValue", alphaValue);
    }
    for (let i = 0; i < children.length; i++) {
      // color wipe the entire poem
      children[i].style('color: rgba(0, 0, 0, ' + alphaValue + ')');
    }
  }
}


/************************************************************************************
 * keyboard settings for interacting w/ the sketch w/o serial input from the Arduino
 ************************************************************************************/

function keyPressed() {
  if (keyCode === UP_ARROW) {
    substringIndex++;

    // TODO: reverse step-thru-playlist currently not working
  } else if (keyCode === DOWN_ARROW) {
    substringIndex--;
  } else if (keyCode === RIGHT_ARROW) {
    if (autoPlay == true) {
      autoPlay = false;
    } else {
      autoPlay = true;
    }
  } else if (keyCode === 49) {
    print("key pressed: 1");
    state01();
  } else if (keyCode === 50) {
    print("key pressed: 2");
    state02();
  } else if (keyCode === 51) {
    print("key pressed: 3");
    state03();
  } else if (keyCode === 52) {
    print("key pressed: 4");
    state04();
    // TODO: add states 05 thru 19
  } else if (keyCode === 80) {
    print("key pressed: p");
    state20();
  } else if (keyCode === 90) {
    print("key pressed: z");
    createPoemCharRef();
  }
  return false; // turns off any browser-specific default key
}


/*************************************************************************************
 * generate a text file that references each character in the poem to its index value
 *************************************************************************************/

function createPoemCharRef() {
  let currentPoemCharRef = [];
  for (i = 0; i < currentPoem.length; i++) {
    // print(currentPoem[i] + " is at index [" + i + "]");
    currentPoemCharRef.push(currentPoem[i] + " - [" + i + "]");
  }
  print("generating char-index_" + currentPoem + ".txt");
  saveStrings(currentPoemCharRef, 'char-index_poem0.txt'); // print to .txt file
}


/********************************************************************
 * The functions below are used in conjunction with p5.serialcontrol
 ********************************************************************/

// get a list of serial port names and put them in an array called portList
function printList(portList) {
  // loop through the array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // and print the list to console
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}


// // TODO: reset the current poem using the keyboard
// function resetCurrentPoem() {
// }

// // TODO: reset the entire piece, called by a specific key
// function resetEntireSketch() {
// }

// // TODO: calculate the In & Out indeces using search by substring
// function findSubstringInOut() {
//   let substring = "Visit sl 1, K1, psso, K1, K2tog, turn, and so on Rashida";
//   let search_term = "sl 1, K1, psso, K1, K2tog, turn, and so on";
//   let poemSubstringIn = substring.search(search_term);
//   var poemSubstringInOut = substring.slice(poemSubstringIn, poemSubstringIn + search_term.length);
//   print(substring.slice(poemSubstringIn, poemSubstringIn + search_term.length));
// }/*
   Noah Pivnick
   Final Project, 2018 Fall
   Intro to Computational Media 2233.004 (Mimi Yin)
   Intro to Physical Computing 2301.003 (Tom Igoe)
   
   Acknowledgements:
   - Michael Joyce, friend and mentor, writer and poet, for sharing with me his collection of unpublished poems.
   - Giwon Park for help with code and urging me to use p5.dom
   - Allison Parish for sharing an illuminating example of creating arrays of spans by character: https://editor.p5js.org/allison.parrish/sketches/rkphkGJJN
   - Brent Baily for helping me sort out logic that correctly iterated through the substring playlist
   - Mimi Yin for patiently helping me wrap my head around the project's computational requirements*/

// TODO: Barak suggested looking into .srt (subtitle) files

// p5.serialcontrol stuff
let serial; // declare a global variable for serial class
let portName = '/dev/cu.usbmodem1411';
let serialDataIn;
let previousState = 0;

// poem stuff
let poem20 = "But you see it does not end, the living, even when the story has been lived and told; do you want to know what has happened to the birds upon the sill or the vagrant cat? Of course not, they remain there where they were left as well as where they first appeared, the shadow of the thing an equal to the thing itself under certain circumstance. And who she is now they have wiped from the tiny bathroom mirror just beyond the bed where she greeted it each morning and bid it good night when the corridor lights dimmed. Or perhaps not, perhaps he goes on breathing Bach while she knits beside the bed although in truth she has never seen much sense in it, the knitting, liking nonetheless the code of it, K on RS, P on WS, P5, turn, sl 1, K1, psso, K1, K2tog, turn, and so on as if the world’s purpose (this the apple tree pattern for a baby’s blanket) were a song.";
let currentPoem = poem20

let substringPlaylist = [
  [0, 27], // "But you see it does not end"
  [703, 729], // "K on RS, P on WS, P5, turn"
  [ 51,  84], // "the story has been lived and told
  [731, 756], // "sl 1, K1, psso, K1, K2tog"
  [534, 567], // "perhaps he goes on breathing Bach"
  [703, 729], // "K on RS, P on WS, P5, turn"
  [553, 583], // "breathing Bach while she knits"
  [731, 756], // "sl 1, K1, psso, K1, K2tog"
  [106, 136], // "what has happened to the birds"
  [154, 170], // "the vagrant cat?"
  [703, 729], // "K on RS, P on WS, P5, turn"
  [186, 203], // "they remain there"
  [236, 261], // "where they first appeared"
  [731, 756], // "sl 1, K1, psso, K1, K2tog"
  [263, 286], // "the shadow of the thing"
  [344, 358], // "And who she is"
  [703, 729], // "K on RS, P on WS, P5, turn"
  [731, 756], // "sl 1, K1, psso, K1, K2tog"
  [534, 567], // "perhaps he goes on breathing Bach"
  [553, 583], // "breathing Bach while she knits"
  [703, 729], // "K on RS, P on WS, P5, turn"
  [731, 756], // "sl 1, K1, psso, K1, K2tog"
  // [625, 652], // "never seen much sense in it"
  [668, 701], // "liking nonetheless the code of it"
  [703, 729], // "K on RS, P on WS, P5, turn"
  [731, 756], // "sl 1, K1, psso, K1, K2tog"
  [774, 789], // "as if the world"
  [856, 863] // "a song."
  // [0, 863], // the complete poem
  // [ 86, 124], // "do you want to know what has happened"
  // [171, 184], // "Of course not"
  // [568, 598], // "while she knits beside the bed"
];

let playlistIndex = 0; // set which substring the playlist begins with
let substringIndex = 0; // set the substring to begin with its first character
let substringInOut = substringPlaylist[playlistIndex];

let countCrankDelayStart; // variable to set how many crank rotations over serial before starting text effect

// p5.dom stuff
let paragraph;

// keyboard control stuff
let autoPlay = false;


function setup() {
  noCanvas();

  //     // generate a text file that references each character in the poem to its index value
  //     // TODO: move this out of setup and create a function assigned to a keyPressed()
  //     let currentPoemCharRef = [];
  //     for (i = 0; i < currentPoem.length; i++) {
  //       // print(currentPoem[i] + " is at index [" + i + "]");
  //       currentPoemCharRef.push(currentPoem[i] + " - [" + i + "]");

  //     }
  //     saveStrings(currentPoemCharRef, 'currentPoemCharRef.txt'); // print to .txt file

  // sanity check to confirm substring ins & outs
  print(currentPoem.substring(86, 124));
  print(currentPoem.substring(171, 184));
  print(currentPoem.substring(186, 224));
  print(currentPoem.substring(534, 567));
  print(currentPoem.substring(553, 598));

  paragraph = createP();
  paragraph.style('font-size', '35px');
  // paragraph.style('margin', '150px');
  paragraph.style('margin-top', '100px');
  paragraph.style('margin-bottom', '100px');
  paragraph.style('margin-right', '600px');
  paragraph.style('margin-left', '600px');
  // paragraph.style('padding' '150px');

  // create an array filled with each character of the current poem wrapped in <span> tags
  for (let i = 0; i < currentPoem.length; i++) {
    let span = createSpan(currentPoem.charAt(i));
    span.style('position: relative');
    span.style('color: rgba(0, 0, 0, 0)');
    paragraph.child(span);

  }

  // p5.serialcontrol stuff
  serial = new p5.SerialPort(); // instantiate a new serial object
  serial.on('list', printList); // Serial.list();
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose);
  serial.open(portName);

}

let alphaValue = 0;
let reveal = false;

function draw() {
  let children = selectAll('span', paragraph);
  if (substringIndex === 0) {
    substringIndex = substringInOut[0];
  }
  // once the last index of the substring
  if (substringIndex === substringInOut[1]) {

    if (playlistIndex < substringPlaylist.length - 1) {
      //increase index for array of ins and outs
      playlistIndex++;
      for (let i = 0; i < children.length; i++) {
        // color wipe the entire poem
        children[i].style('color: rgba(0, 0, 0, 0)');
      }
      // move to next substring in array of substrings
      substringInOut = substringPlaylist[playlistIndex];
      console.log('playlist index: ', playlistIndex);
      console.log('substring in & out:', substringInOut);
      // reset substringIndex to the first index of the next substring
      substringIndex = substringInOut[0];
    } else {
      // when you reach the end of the ins and outs array, reset
      // playlistIndex = 0;
      // substringInOut = substringPlaylist[playlistIndex];


      //       if(frameCount % 2 == 0 && alphaValue < 1){
      //         alphaValue += 0.01;

      //         console.log("alphaValue", alphaValue);
      //       }

      //         for (let i = 0; i < children.length; i++) {
      //           // color wipe the entire poem
      //           children[i].style('color: rgba(0, 0, 0, ' + alphaValue + ')');
      //         }

      reveal = true;

    }
  }
  // 
  if (substringIndex >= substringInOut[0] && substringIndex < substringInOut[1]) {
    //print('here');ß
    children[substringIndex].style('color: black');
  }

  if (autoPlay == true) {
    if (frameCount % 2 == 0) { // increase the modulus to slow down the auto play
      //console.log(frameCount, "MOVE");
      substringIndex++;

    }
  }

  if (reveal == true) {

    if (frameCount % 8 == 0) { // increase the modulus to slow down the reveal
      
      if(alphaValue < 1){
        	alphaValue += 0.01;
      }
      else{
                /*
        //use below to reset the reveal animation
        // reveal = false;
        // alphaValue = 0;

        // use below to reset the entire interaction (inverted for some reason)
        playlistIndex = 0;
        substringIndex = 0;
        */
      }

      console.log("alphaValue", alphaValue);
    }

    for (let i = 0; i < children.length; i++) {
      // color wipe the entire poem
      children[i].style('color: rgba(0, 0, 0, ' + alphaValue + ')');
    }

  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    substringIndex++;

    // TODO: reverse step not working
  } else if (keyCode === DOWN_ARROW) {
    substringIndex--;

  } else if (keyCode === RIGHT_ARROW) {
    if (autoPlay == true) {
      autoPlay = false;
    } else {
      autoPlay = true;
    }

  }
  return false; // turns off any browser-specific default key

}


/*
  The functions below are used in conjunction with p5.serialcontrol
*/

// get a list of serial port names and put them in an array called portList
function printList(portList) {
  // loop through the array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // and print the list to console
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
  // The hall effect sensor on the Arduino sends ASCII over serial
  let serialStringIn = serial.readLine(); // declares a variable to store incoming serial as string
  if (serialStringIn.length > 0) { // if the incoming serial string is anything other than empty
    serialDataIn = Number(serialStringIn); // translate incoming serial string to a number
    print(serialDataIn);

    // When the hall effect sensor on the Arduino changes, increment substringIndexx
    if (serialDataIn > previousState) {
      previousState = serialDataIn;
      myFuncIncr();
    } else if (serialDataIn < previousState) {
      previousState = serialDataIn;
      myFuncDecr();
    }

  }
  // print("tick");

}

function myFuncIncr() {
  substringIndex++;
  //print("sdd")
}

function myFuncDecr() {}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);

}

function portClose() {
  print('The serial port closed.');

}


// // TODO: reset the current poem using the keyboard
// function resetCurrentPoem() {

// }

// // TODO: reset the entire piece, called by a specific key
// function resetEntireSketch() {

// }

// // TODO: calculate the In & Out indeces using search by substring
// function findSubstringInOut() {
//   let substring = "Visit sl 1, K1, psso, K1, K2tog, turn, and so on Rashida";
//   let search_term = "sl 1, K1, psso, K1, K2tog, turn, and so on";
//   let poemSubstringIn = substring.search(search_term);
//   var poemSubstringInOut = substring.slice(poemSubstringIn, poemSubstringIn + search_term.length);
//   print(substring.slice(poemSubstringIn, poemSubstringIn + search_term.length));

// }/*
   Noah Pivnick
   Final Project, 2018 Fall
   Intro to Computational Media 2233.004 (Mimi Yin)
   Intro to Physical Computing 2301.003 (Tom Igoe)
   
   Acknowledgements:
   - Giwon Park helped me put together a first pass using text() and urged me to use p5.dom instead
   - Allison Parish helped me immeasurably by sharing this example of creating an array of spans by chaacter: https://editor.p5js.org/allison.parrish/sketches/rkphkGJJN
   - Brent Baily helped me sort out logic that correctly itterated through the substring playlist
   - Mimi Yin patiently helped me wrap my head around the project's computational requirements
*/

// TODO: Barak suggested looking into .srt (subtitle) files

// p5.serialcontrol stuff
let serial; // declare a global variable for serial class
let portName = '/dev/cu.usbmodem1411';
let serialDataIn;
let previousState = 0;

// poem stuff
let poem20 = "But you see it does not end, the living, even when the story has been lived and told; do you want to know what has happened to the birds upon the sill or the vagrant cat? Of course not, they remain there where they were left as well as where they first appeared, the shadow of the thing an equal to the thing itself under certain circumstance. And who she is now they have wiped from the tiny bathroom mirror just beyond the bed where she greeted it each morning and bid it good night when the corridor lights dimmed. Or perhaps not, perhaps he goes on breathing Bach while she knits beside the bed although in truth she has never seen much sense in it, the knitting, liking nonetheless the code of it, K on RS, P on WS, P5, turn, sl 1, K1, psso, K1, K2tog, turn, and so on as if the world’s purpose (this the apple tree pattern for a baby’s blanket) were a song.";
let currentPoem = poem20

let substringPlaylist = [
  [0, 27], // "But you see it does not end"
  [703, 729], // "K on RS, P on WS, P5, turn"
  [51, 84], // "the story has been lived and told
  [731, 756], // "sl 1, K1, psso, K1, K2tog"
  [534, 567], // "perhaps he goes on breathing Bach"
  [703, 729], // "K on RS, P on WS, P5, turn"
  [553, 583], // "breathing Bach while she knits"
  [731, 756], // "sl 1, K1, psso, K1, K2tog"
  [106, 136], // "what has happened to the birds"
  [154, 170], // "the vagrant cat?"
  [703, 729], // "K on RS, P on WS, P5, turn"
  [186, 203], // "they remain there"
  [236, 261], // "where they first appeared"
  [731, 756], // "sl 1, K1, psso, K1, K2tog"
  [263, 286], // "the shadow of the thing"
  [344, 358], // "And who she is"
  [703, 729], // "K on RS, P on WS, P5, turn"
  [731, 756], // "sl 1, K1, psso, K1, K2tog"
  [534, 567], // "perhaps he goes on breathing Bach"
  [553, 583], // "breathing Bach while she knits"
  [703, 729], // "K on RS, P on WS, P5, turn"
  [731, 756], // "sl 1, K1, psso, K1, K2tog"
  [625, 652], // "never seen much sense in it"
  [668, 701], // "liking nonetheless the code of it"
  [703, 729], // "K on RS, P on WS, P5, turn"
  [731, 756], // "sl 1, K1, psso, K1, K2tog"
  [774, 789], // "as if the world"
  [856, 863], // "a song."
  [0, 863], // the complete poem
  // [ 86, 124], // "do you want to know what has happened"
  // [171, 184], // "Of course not"
  // [568, 598], // "while she knits beside the bed"
];

let playlistIndex = 0; // set which substring the playlist begins with
let substringIndex = 0; // set the substring to begin with its first character
let substringInOut = substringPlaylist[playlistIndex];

let countCrankDelayStart; // variable to set how many crank rotations over serial before starting text effect

// p5.dom stuff
let paragraph;

// keyboard control stuff
let autoPlay = false;


function setup() {
  noCanvas();

  //     // generate a text file that references each character in the poem to its index value
  //     // TODO: move this out of setup and create a function assigned to a keyPressed()
  //     let currentPoemCharRef = [];
  //     for (i = 0; i < currentPoem.length; i++) {
  //       // print(currentPoem[i] + " is at index [" + i + "]");
  //       currentPoemCharRef.push(currentPoem[i] + " - [" + i + "]");

  //     }
  //     saveStrings(currentPoemCharRef, 'currentPoemCharRef.txt'); // print to .txt file

  // sanity check to confirm substring ins & outs
  print(currentPoem.substring(86, 124));
  print(currentPoem.substring(171, 184));
  print(currentPoem.substring(186, 224));
  print(currentPoem.substring(534, 567));
  print(currentPoem.substring(553, 598));

  paragraph = createP();
  paragraph.style('font-size', '35px');
  // paragraph.style('margin', '150px');
  paragraph.style('margin-top', '100px');
  paragraph.style('margin-bottom', '100px');
  paragraph.style('margin-right', '600px');
  paragraph.style('margin-left', '600px');
  // paragraph.style('padding' '150px');

  // create an array filled with each character of the current poem wrapped in <span> tags
  for (let i = 0; i < currentPoem.length; i++) {
    let span = createSpan(currentPoem.charAt(i));
    span.style('position: relative');
    span.style('color: rgba(0, 0, 0, 0)');
    paragraph.child(span);

  }

  // p5.serialcontrol stuff
  serial = new p5.SerialPort(); // instantiate a new serial object
  serial.on('list', printList); // Serial.list();
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose);
  serial.open(portName);

}

function draw() {
  let children = selectAll('span', paragraph);
  if (substringIndex === 0) {
    substringIndex = substringInOut[0];
  }
  // once the last index of the substring
  if (substringIndex === substringInOut[1]) {

    if (playlistIndex < substringPlaylist.length - 1) {
      //increase index for array of ins and outs
      playlistIndex++;
      for (let i = 0; i < children.length; i++) {
        // color wipe the entire poem
        children[i].style('color: rgba(0, 0, 0, 0)');
      }
      // move to next substring in array of substrings
      substringInOut = substringPlaylist[playlistIndex];
      console.log('playlist index: ', playlistIndex);
      console.log('substring in & out:', substringInOut);
      // reset substringIndex to the first index of the next substring
      substringIndex = substringInOut[0];
    } else {
      // when you reach the end of the ins and outs array, reset
      // playlistIndex = 0;
      // substringInOut = substringPlaylist[playlistIndex];
      for (let i = 0; i < children.length; i++) {
        // color wipe the entire poem
        children[i].style('color: black');
      }
    }
  }
  // 
  if (substringIndex >= substringInOut[0] && substringIndex < substringInOut[1]) {
    children[substringIndex].style('color: black');
  }

  if (autoPlay == true) {
    if (frameCount % 4 == 0) {
      //console.log(frameCount, "MOVE");
      substringIndex++;

    }
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    substringIndex++;

    // TODO: reverse step not working
  } else if (keyCode === DOWN_ARROW) {
    substringIndex--;

  } else if (keyCode === RIGHT_ARROW) {
    if (autoPlay == true) {
      autoPlay = false;
    } else {
      autoPlay = true;
    }

  }
  return false; // turns off any browser-specific default key

}


/*
  The functions below are used in conjunction with p5.serialcontrol
*/

// get a list of serial port names and put them in an array called portList
function printList(portList) {
  // loop through the array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // and print the list to console
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
  // The hall effect sensor on the Arduino sends ASCII over serial
  var serialStringIn = serial.readLine(); // d4clares a variable to store incoming serial as string
  if (serialStringIn.length > 0) { // if the incoming serial string is anything other than empty
    serialDataIn = Number(serialStringIn); // translate incoming serial string to a number
    print(serialDataIn);

    // When the hall effect sensor on the Arduino changes, increment substringIndexx
    if (serialDataIn > previousState) {
      previousState = serialDataIn;
      myFuncIncr();
    } else if (serialDataIn < previousState) {
      previousState = serialDataIn;
      myFuncDecr();
    }

  }
  // print("tick");

}

function myFuncIncr() {
  substringIndex++;
  //print("sdd")
}

function myFuncDecr() {}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);

}

function portClose() {
  print('The serial port closed.');

}


// // TODO: reset the current poem using the keyboard
// function resetCurrentPoem() {

// }

// // TODO: reset the entire piece, called by a specific key
// function resetEntireSketch() {

// }

// // TODO: calculate the In & Out indeces using search by substring
// function findSubstringInOut() {
//   let substring = "Visit sl 1, K1, psso, K1, K2tog, turn, and so on Rashida";
//   let search_term = "sl 1, K1, psso, K1, K2tog, turn, and so on";
//   let poemSubstringIn = substring.search(search_term);
//   var poemSubstringInOut = substring.slice(poemSubstringIn, poemSubstringIn + search_term.length);
//   print(substring.slice(poemSubstringIn, poemSubstringIn + search_term.length));

// }// orignical sketch here: https://editor.p5js.org/allison.parrish/sketches/rkphkGJJN
// Allison says: "I made it loop just so it doesn't throw an error a few seconds in, 
// but again the point would be to use the value from your input instead of frameCount

let poem20 = "But you see it does not end, the living, even when the story has been lived and told; do you want to know what has happened to the birds upon the sill or the vagrant cat? Of course not, they remain there where they were left as well as where they first appeared, the shadow of the thing an equal to the thing itself under certain circumstance. And who she is now they have wiped from the tiny bathroom mirror just beyond the bed where she greeted it each morning and bid it good night when the corridor lights dimmed. Or perhaps not, perhaps he goes on breathing Bach while she knits beside the bed although in truth she has never seen much sense in it, the knitting, liking nonetheless the code of it, K on RS, P on WS, P5, turn, sl 1, K1, psso, K1, K2tog, turn, and so on as if the world’s purpose (this the apple tree pattern for a baby’s blanket) were a song.";
let paragraph;

let poemInOut = [
  [86, 124], // "do you want to know what has happened"
  [171, 184], // "Of course not"
  [186, 224], // "they remain there where they were left"
  [534, 567], // "perhaps he goes on breathing Bach"
  [553, 598] // "breathing Bach while she knits beside the bed"
];

let primaryIndex = 0; // to get to the last substring quickly, set this to the last index of poemInOut
let subIndex = 0;
let inout = poemInOut[primaryIndex];

let countCrankDelayStart; // variable to set how many crank rotations over serial before starting text effect

function setup() {
  noCanvas();

  currentPoem = poem20

  // dump each character and its index number of the current poem into an array
  let currentPoemCharAndIndex = [];
  for (i = 0; i < currentPoem.length; i++) {
    // print(currentPoem[i] + " is at index [" + i + "]");
    currentPoemCharAndIndex.push(currentPoem[i] + " - [" + i + "]");

  }
  // // print the array of index numbers for each character of the current poem to a text file
  // saveStrings(currentPoemCharAndIndex, 'currentPoemCharAndIndex.txt');

  print(currentPoem.substring(86, 124));
  print(currentPoem.substring(171, 184));
  print(currentPoem.substring(186, 224));
  print(currentPoem.substring(534, 567));
  print(currentPoem.substring(553, 598));

  paragraph = createP();
  paragraph.style('font-size', '35px');
  paragraph.style('margin', 0);
  paragraph.style('padding', '150px');

  for (let i = 0; i < currentPoem.length; i++) {
    let span = createSpan(currentPoem.charAt(i));
    span.style('position: relative');
    span.style('color: rgba(0, 0, 0, 0.05)');
    paragraph.child(span);

  }

}

function draw() {
  let children = selectAll('span', paragraph);
  if (subIndex === 0) {
    subIndex = inout[0];
  }
  // once the last index of the substring
  if (subIndex === inout[1]) {

    if (primaryIndex < poemInOut.length - 1) {
      //increase index for array of ins and outs
      primaryIndex++;
      for (let i = 0; i < children.length; i++) {
        // color wipe the entire poem
        children[i].style('color: rgba(0, 0, 0, 0.05)');
      }
      // move to next substring in array of substrings
      inout = poemInOut[primaryIndex];
      console.log('primary index: ', primaryIndex);
      console.log('inout:', inout);
      // reset subIndex to the first index of the next substring
      subIndex = inout[0];
    } else {
      //when you reach the end of the ins and outs array, reset
      // primaryIndex = 0;
      // inout = poemInOut[primaryIndex];
      for (let i = 0; i < children.length; i++) {
        // color wipe the entire poem
        children[i].style('color: black');
      }
    }
  }
  // 
  if (subIndex >= inout[0] && subIndex < inout[1]) {
    children[subIndex].style('color: black');
  }

}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    subIndex++;
  }
  return false;
}


// function findPoemSubstringInOut() {
//   let substring = "Visit sl 1, K1, psso, K1, K2tog, turn, and so on Rashida";
//   let search_term = "sl 1, K1, psso, K1, K2tog, turn, and so on";
//   let poemSubstringIn = substring.search(search_term);
//   var poemSubstringInOut = substring.slice(poemSubstringIn, poemSubstringIn + search_term.length);
//   print(substring.slice(poemSubstringIn, poemSubstringIn + search_term.length));

// }// orignical sketch here: https://editor.p5js.org/allison.parrish/sketches/rkphkGJJN
// Allison says: "I made it loop just so it doesn't throw an error a few seconds in, 
// but again the point would be to use the value from your input instead of frameCount

let srcText = "But you see it does not end, the living, even when the story has been lived and told; do you want to know what has happened to the birds upon the sill or the vagrant cat? Of course not, they remain there where they were left as well as where they first appeared, the shadow of the thing an equal to the thing itself under certain circumstance. And who she is now they have wiped from the tiny bathroom mirror just beyond the bed where she greeted it each morning and bid it good night when the corridor lights dimmed. Or perhaps not, perhaps he goes on breathing Bach while she knits beside the bed although in truth she has never seen much sense in it, the knitting, liking nonetheless the code of it, K on RS, P on WS, P5, turn, sl 1, K1, psso, K1, K2tog, turn, and so on as if the world’s purpose (this the apple tree pattern for a baby’s blanket) were a song.";
let paragraph;

let poemInOut = [
  [86, 124], // do you want to know what has happened
  [171, 184], // Of course not
  [186, 224], // they remain there where they were left
  [534, 567], // perhaps he goes on breathing Bach
  [553, 598] // breathing Bach while she knits beside the bed
];


function setup() {
  noCanvas();

  currentPoem = srcText

  // dump each character and its index number of the current poem into an array
  let currentPoemCharAndIndex = [];
  for (i = 0; i < currentPoem.length; i++) {
    // print(currentPoem[i] + " is at index [" + i + "]");
    currentPoemCharAndIndex.push(currentPoem[i] + " - [" + i + "]");

  }
  // // print the array of index numbers for each character of the current poem to a text file
  // saveStrings(currentPoemCharAndIndex, 'currentPoemCharAndIndex.txt');

  print(currentPoem.substring(86, 124));
  print(currentPoem.substring(171, 184));
  print(currentPoem.substring(186, 224));
  print(currentPoem.substring(534, 567));
  print(currentPoem.substring(553, 598));

  paragraph = createP();
  paragraph.style('font-size', '35px');
  paragraph.style('margin', 0);
  paragraph.style('padding', '35px');

  for (let i = 0; i < currentPoem.length; i++) {
    let span = createSpan(currentPoem.charAt(i));
    span.style('position: relative');
    paragraph.child(span);

  }

  frameRate(0.5);

}

function draw() {
  let children = selectAll('span', paragraph);
  let inout = poemInOut[frameCount % poemInOut.length];
  for (let i = 0; i < children.length; i++) {
    if (i >= inout[0] && i < inout[1]) {
      children[i].style('color: black');
    } else {
      children[i].style('color: rgba(0, 0, 0, 0.05)');
    }
  }
}


// function findPoemSubstringInOut() {
//   let substring = "Visit sl 1, K1, psso, K1, K2tog, turn, and so on Rashida";
//   let search_term = "sl 1, K1, psso, K1, K2tog, turn, and so on";
//   let poemSubstringIn = substring.search(search_term);
//   var poemSubstringInOut = substring.slice(poemSubstringIn, poemSubstringIn + search_term.length);
//   print(substring.slice(poemSubstringIn, poemSubstringIn + search_term.length));

// }// Noah Pivnick
// ICM + PhysComp Final


let poem20 = "But you see it does not end, the living, even when the story has been lived and told; do you want to know what has happened to the birds upon the sill or the vagrant cat? Of course not, they remain there where they were left as well as where they first appeared, the shadow of the thing an equal to the thing itself under certain circumstance. And who she is now they have wiped from the tiny bathroom mirror just beyond the bed where she greeted it each morning and bid it good night when the corridor lights dimmed. Or perhaps not, perhaps he goes on breathing Bach while she knits beside the bed although in truth she has never seen much sense in it, the knitting, liking nonetheless the code of it, K on RS, P on WS, P5, turn, sl 1, K1, psso, K1, K2tog, turn, and so on as if the world’s purpose (this the apple tree pattern for a baby’s blanket) were a song.";
let currentPoem = 20
let currentIndex = 0;
let crankButtonFwrd;
let crankButtonBwrd;
let currentCrankCount = 0;
let colorPage = 245;
let textColorHide = 200;
let textColorShow = 0;
let textOriginX = 50;
let textOriginY = 50;
let textLeadingSize = 37.5;

// ? should I put my hand-picked substrings in an array?
// let substrings = [];

// ? if yes to above, substringCurrentIndex is really just currentCrankCount - 1
// let substringCurrentIndex;

// ? should I declare 'firstIndex' and 'lastIndex' variables for each substring?
// ? or 'startIndex' + the number of trailing characters in the substring

function setup() {
  createCanvas(800, 800);
  print(poem20.length);
  print(poem20.substring(86, 124));
  print(poem20.substring(171, 184));
  print(poem20.substring(186, 224));
  print(poem20.substring(534, 567));
  print(poem20.substring(553, 598));

  crankButtonBwrd = createButton('Backward');
  crankButtonBwrd.mousePressed(crankBwrd);

  crankButtonFwrd = createButton('Forward');
  crankButtonFwrd.mousePressed(crankFwrd);

}

function draw() {
  background(colorPage);

  // render the whole poem using text() as a faint layer to gauge allignment
  fill(textColorHide);
  textSize(30);
  text(poem20, 50, 50, 700, 700);

  // increment through the entire poem one character at a time
  for (let i = 0; i < poem20.length; i++) {

    // check whether the index is part of the substring to be revealed
    if (i >= 553 && i <= 598) {
      // if part of the substring, color character visible
      fill(textColorShow);
      text(poem20[i], textOriginX, textOriginY, 700, 700);

      // otherwise color character hidden
    } else {
      fill(textColorHide);

    }

    // add the width of every preceeding character to the new textOriginX
    textOriginX += textWidth(poem20[i]);

    if (textOriginX >= 700) {
      textOriginX = 50;
      textOriginY += textLeadingSize;

      // print(textOriginY);  // prints the Y coordinate of each new wrapped line

    }

  }

  noLoop(print("currentCrankCount is " + currentCrankCount));

}

function crankFwrd() {
  currentCrankCount += 1;
  print("currentCrankCount is " + currentCrankCount);
}

function crankBwrd() {
  currentCrankCount -= 1;
  print("currentCrankCount is " + currentCrankCount);
}
// Noah Pivnick
// ICM + PhysComp Final

// ? if a string is an array by default, do I gain anything by explicitly declaring an array of characters?

// ? what's the most efficient way to change the sequence of substrings?

// ? if text() is an object, how do I render different portions (substrings) in different colors?

// ? wrt allignment, one solution might be the following:
// ? 1.) hardcode line breaks (a little lame since this poem is written as stream of conciousness)
// ? 2.) declare an array with each line of the poem as an element
// ? 3.) determine the widest textWidth() + padding to calculate canvas width
// ? 4.) multiply textLeadingSize x number of line breaks + padding to calculate canvas height

let poem20 = "But you see it does not end, the living, even when the story has been lived and told; do you want to know what has happened to the birds upon the sill or the vagrant cat? Of course not, they remain there where they were left as well as where they first appeared, the shadow of the thing an equal to the thing itself under certain circumstance. And who she is now they have wiped from the tiny bathroom mirror just beyond the bed where she greeted it each morning and bid it good night when the corridor lights dimmed. Or perhaps not, perhaps he goes on breathing Bach while she knits beside the bed although in truth she has never seen much sense in it, the knitting, liking nonetheless the code of it, K on RS, P on WS, P5, turn, sl 1, K1, psso, K1, K2tog, turn, and so on as if the world’s purpose (this the apple tree pattern for a baby’s blanket) were a song.";
let currentPoem = 20
let currentIndex = 0;
let crankButtonFwrd;
let crankButtonBwrd;
let currentCrankCount = 0;
let colorPage = 245;
let textColorHide = 200;
let textColorShow = 0;
let textOriginX = 50;
let textOriginY = 50;

let textOriginX2 = 50;
let textOriginY2 = 50;
let textLeadingSize = 37.5;

// ? should I put my hand-picked substrings in an array?
// let substrings = [];

// ? if yes to above, substringCurrentIndex is really just currentCrankCount - 1
// let substringCurrentIndex;

// ? should I declare 'firstIndex' and 'lastIndex' variables for each substring?
// ? or 'startIndex' + the number of trailing characters in the substring 

function setup() {
  createCanvas(800, 800);
  print(poem20.length);
  print(poem20.substring(86, 124));
  print(poem20.substring(171, 184));
  print(poem20.substring(186, 224));
  print(poem20.substring(534, 567));
  print(poem20.substring(553, 598));

  crankButtonBwrd = createButton('Backward');
  crankButtonBwrd.mousePressed(crankBwrd);

  crankButtonFwrd = createButton('Forward');
  crankButtonFwrd.mousePressed(crankFwrd);

}

function draw() {
  background(colorPage);

  // render the whole poem using text() as a faint layer to gauge allignment
  fill(textColorHide);
  textSize(30);
  text(poem20, 50, 50, 700, 700);
  
  // increment through the entire poem one character at a time
  for (let i = 0; i < poem20.length; i++) {

    // // if (i >= 0 && i <= 598) {
    // fill(255, 0, 0);
    // text(poem20[i], textOriginX, textOriginY2, 700, 700);

    //   } else {
    //     fill(textColorHide);

    //   }

    // textOriginX += textWidth(poem20[i]);

    if (textOriginX >= 700) {
      textOriginX = 50;
      textOriginY2 += textLeadingSize;

      // print(textOriginY);  // prints the Y coordinate of each new wrapped line

    }

  }

  for (let i = 0; i < poem20.length; i++) {

    if (i >= 553 && i <= 598) {
      fill(textColorShow);
      text(poem20[i], textOriginX, textOriginY, 700, 700);

    } else {
      fill(textColorHide);

    }

    textOriginX += textWidth(poem20[i]);

    if (textOriginX >= 700) {
      textOriginX = 50;
      textOriginY += textLeadingSize;

      // print(textOriginY);  // prints the Y coordinate of each new wrapped line

    }

  }

  noLoop(print("currentCrankCount is " + currentCrankCount));

}

function crankFwrd() {
  currentCrankCount += 1;
  print("currentCrankCount is " + currentCrankCount);
}

function crankBwrd() {
  currentCrankCount -= 1;
  print("currentCrankCount is " + currentCrankCount);
}// Noah Pivnick
// ICM + PhysComp Final
// with help from Allison Parrish, Giwon, Brent


// variables for Serial stuff
let serial; // declare a global variable for serial class
let portName = '/dev/cu.usbmodemXXXX';
let serialIn;
let currentCrankCount = 0;

// // variables for GUI PhysComp simulation stuff
// let crankButtonFwd;
// let crankButtonPause;
// let crankButtonPlay;
// let crankButtonBwd;

// arrays for Poem-related stuff
let collectionOfPoems = []; // an array containing an array (poems) of an array (of words) of an array (of characters)
let currentPoemSubstrings = []; // array to store start & stop index pairs for any given substring
let currentPoemSubstringPlaylist = [];

// variables for Poem-related stuff
let currentPoem; // variable to store the current poem
let currentPoemSubstring; // variable to store the current substring for a given poem
let currentPoemSubstringStart; // variable to store the current substring's first <span> element
let currentPoemSubstringEnd; // variable to store the current substrings's last <span> element
let currentPoemSubstringPair; // variable to store the current substring's first + last pair
let currentPoemSubstringIndex; // variable to store the index of the current substring (to hide and reveal characters)

// Display stuff
let colorPage = 245;
let colorTextHide = 200;
let colorTextShow = 0;

let poem20 = "But you see it does not end, the living, even when the story has been lived and told; do you want to know what has happened to the birds upon the sill or the vagrant cat? Of course not, they remain there where they were left as well as where they first appeared, the shadow of the thing an equal to the thing itself under certain circumstance. And who she is now they have wiped from the tiny bathroom mirror just beyond the bed where she greeted it each morning and bid it good night when the corridor lights dimmed. Or perhaps not, perhaps he goes on breathing Bach while she knits beside the bed although in truth she has never seen much sense in it, the knitting, liking nonetheless the code of it, K on RS, P on WS, P5, turn, sl 1, K1, psso, K1, K2tog, turn, and so on as if the world’s purpose (this the apple tree pattern for a baby’s blanket) were a song.";



function preload() {
  currentPoem = loadStrings('text/20.txt');
  print(currentPoem);

}


function setup() {
  noCanvas();
  print(poem20.length);
  print(poem20.substring(86, 124));
  print(poem20.substring(171, 184));
  print(poem20.substring(186, 224));
  print(poem20.substring(534, 567));
  print(poem20.substring(553, 598));


//   // GUI functions for PhysComp simulation
//   crankButtonBwd = createButton('< Step');
//   crankButtonBwd.mousePressed(crankBwd);

//   crankButtonPause = createButton('Pause');
//   crankButtonPause.mousePressed(crankPause);

//   crankButtonPlay = createButton('Play');
//   crankButtonPlay.mousePressed(crankPlay);

//   crankButtonFwd = createButton('Step >');
//   crankButtonFwd.mousePressed(crankFwd);

}



function draw() {
  background(colorPage);

  // create <p> element

  // render the current poem in its entirety in <p> using a faint color to see allignment

  // 


  noLoop(print("currentCrankCount is " + currentCrankCount));

}



function crankFwd() {
  currentCrankCount += 1;
  print("currentCrankCount is " + currentCrankCount);

}

function crankBwd() {
  currentCrankCount -= 1;
  print("currentCrankCount is " + currentCrankCount);
}

// keyboard function for PhysComp simulation
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    crankFwd();
    
  } else if (keyCode === LEFT_ARROW) {
    crankBwd();
  
  }

}// Mithru says there are word wrap CSS attributes 
// that can be used within the <p> element
// look into CSS3. alternatively, an array 
// with the indeces of spaces wil help wrap without 
// hyphens but the CSS approach is preferable

// consider adding another array within the poem 
// that records the indeces of spaces
// but why, Mithru? why?! to facilitate word wrap? (yes)

let poem = "this is a poem. not really. maybe."

let paragraph;

let composedJson = [];

// do I need unique startIndex and endIndex variables 
// for each substring (i.e., <span id="mask string">)? no,
// better to create an array

let currFrame, currIndices, currFrameCount;

let frames = [{
    substrings: [{
      startIndex: 0,
      endIndex: 100
    }]
  },
  {
    frame: [{
        startIndex: 0,
        endIndex: 1
      },
      {
        startIndex: 0,
        endIndex: 1
      }
    ]
  }
]

function setup() {

  currFrameCount = 0;
  createCanvas(400, 400);
  paragraph = select('#allText');

  // add '<span id="show">' to the start index and '</span>' to the end index

}

function draw() {

  currFrame = frames[currFrameCount];
  
  // The substring() method returns the part of the string between 
  // the start and end indexes, or to the end of the string.
  // MDM Web Docs reference: http://bit.ly/2r7D5GV
  // .substrings[0].startIndex;

  renderedHTML = "";
  currPoemPosition = 0;
  for (let i = 0; i < frames[currFrameCount].length; i++) {
    renderedHTML = renderedHTML +
      poem.substring(currPoemPosition, currFrame.substrings[i].startIndex) +
      '<span id="show">' +
      poem.substring(currFrame.substrings[i].startIndex, currFrame.substrings[i].endIndex) +
      '</span>';
    currPoemPosition = currFrame.substrings[i].endIndex;
  }

  paragraph.html(renderedHTML);

  /*
  renderedHTML = poem.substring(0, currFrame.substrings[0].startIndex) +
    '<span id="show">' +
    poem.substring(startIndex, endIndex) +
    '</span>' +
    poem.substring(endIndex, poem.length - 1);

  paragraph.html(renderedHTML);
  */
}

function keyReleased() {
//   currFrameCount++;

//   console.log(frames);
//   composedJson.push(currFrame);
//   console.log(composedJson);
}// Mimi? is a string an array by default or do I need to make an array ?
let poem20 = "But you see it does not end, the living, even when the story has been lived and told; do you want to know what has happened to the birds upon the sill or the vagrant cat? Of course not, they remain there where they were left as well as where they first appeared, the shadow of the thing an equal to the thing itself under certain circumstance. And who she is now they have wiped from the tiny bathroom mirror just beyond the bed where she greeted it each morning and bid it good night when the corridor lights dimmed. Or perhaps not, perhaps he goes on breathing Bach while she knits beside the bed although in truth she has never seen much sense in it, the knitting, liking nonetheless the code of it, K on RS, P on WS, P5, turn, sl 1, K1, psso, K1, K2tog, turn, and so on as if the world’s purpose (this the apple tree pattern for a baby’s blanket) were a song.";
let currentPoem = 20
let currentIndex = 0;
let crankButtonFwrd;
let crankButtonBwrd;
let currentCrankCount = 0;
let colorPage = 245;
let hiddenTextColor = 200;
let shownTextColor = 0

function setup() {
  createCanvas(800, 800);
  print(poem20.length);
  print(poem20.substring(86, 124));
  print(poem20.substring(171, 184));
  print(poem20.substring(186, 224));
  print(poem20.substring(534, 567));
  print(poem20.substring(553, 598));

  crankButtonBwrd = createButton('Backward');
  crankButtonBwrd.mousePressed(crankBwrd);

  crankButtonFwrd = createButton('Forward');
  crankButtonFwrd.mousePressed(crankFwrd);

}

function draw() {
  background(colorPage);
  fill(hiddenTextColor);
  textSize(30);
  text(poem20, 50, 50, 700, 700);

  for (let i = 0; i < poem20.length; i++) {
    if (i >= 86 && i <= 124) {
      fill(shownTextColor);
      text(poem20[i], 50, 50, 700, 700);
    } else {
      fill(hiddenTextColor);
      // print(poem20[i]);
      // print(poem20.charAt(i));
      // print(i);

    }

  }

  noLoop(print("currentCrankCount is " + currentCrankCount));

}

function crankFwrd() {
  currentCrankCount += 1;
  print("currentCrankCount is now " + currentCrankCount);
}

function crankBwrd() {
  currentCrankCount -= 1;
  print("currentCrankCount is now " + currentCrankCount);
}let webCam; // Declare variable to hold laptop camera capture
let webMic; // Declare variable to hold laptop audio capture
let feedbackButton; // Declare variable to hold last toggleMic button state
let feedback = true;

function setup() {
  createCanvas(640, 360);
  //
  webCam = createCapture();
  webCam.size(640, 360);
  webCam.hide();
  pixelDensity(1);
  noStroke();
  fill(0);

  // Assign a new P5.AudioIn() object to variable webMic
  webMic = new p5.AudioIn();

  // Start with the mic off
  webMic.start();

  // Create a button to toggle the laptop mic off and on
  feedbackButton = createButton('Gimmie Some Feedback!');
  // button.position(20, 20);
  feedbackButton.mousePressed(toggleMicInput);

}

function draw() {
  background(200);

  print(feedback);

  webCam.loadPixels();

  let stepSize = round(map(webMic.getLevel(), 0, 0.5, 8, 256));
  for (let y = 0; y < webCam.height; y += stepSize) {
    for (let x = 0; x < webCam.width; x += stepSize) {
      let i = y * webCam.width + x;
      let darkness = (255 - webCam.pixels[i * 4]) / 255;
      let radius = stepSize * darkness;
      // print(darkness);
      ellipse(x, y, radius);

    }

  }

}

// A function to start and stop sound input from the mic
function toggleMicInput() {
  if (feedback == false) {
    webMic.stop();
    feedbackButton.html('Gimmie Some Feedback!');

  } else {
    webMic.start();
    feedbackButton.html('Stop The Madness!');

  }
  // feedback = !feedback;

}var video;
var vScale = 16;

function setup() {
  createCanvas(640, 360);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
}

function draw() {
  background(51);

  video.loadPixels();
  loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      var bright = (r+g+b)/3;

      var w = map(bright, 0, 255, 0, vScale);

      noStroke();
      fill(255);
      ellipseMode(CENTER);
      ellipse(x*vScale, y*vScale, w, w);

    }
    
  }
 
}

let video;
let slider;

function setup() {
  canvas = createCanvas(1280, 720, WEBGL);
  canvas.id('p5canvas');
  video = createCapture(VIDEO);
  video.size(1280, 720);
  video.id('p5video');
  //video.hide();
  //slider = createSlider(0, 1, 0.5, 0.01);
  //slider.id('blur-slider');

  let seriously = new Seriously();

  let src = seriously.source('#p5video');
  let target = seriously.target('#p5canvas');

  // var blur = seriously.effect('blur');
  // blur.amount = '#blur-slider';
  // blur.source = src;
  // target.source = blur;

  let chroma = seriously.effect('chroma');
  chroma.source = src;
  target.source = chroma;
  let r = 98 / 255;
  let g = 175 / 255;
  let b = 116 / 255;
  chroma.screen = [r,g,b,1];

  seriously.go();

}

function draw() {
  background(220);
}let img;

function preload() {
  img = loadImage('images/network.svg');
  // img = loadImage('images/clouds.png');

}

function setup() {
  createCanvas(480, 120);

}

function draw() {
  background(0);

  image(img, 0, 0);
  image(img, 0, mouseX);

}let img;

function preload() {
  img = loadImage('images/clouds.png');

}

function setup() {
  createCanvas(480, 120);

}

function draw() {
  background(204);

  image(img, 0, 0);
  image(img, 0, mouseY * -1);

}let img;

function preload() {
  img = loadImage('images/clouds.gif');

}

function setup() {
  createCanvas(480, 120);

}

function draw() {
  background(204);

  image(img, 0, 0);
  image(img, 0, mouseY * -1);

}let img;

function preload() {
  img = loadImage("images/lunar.jpg");

}

function setup() {
  createCanvas(480, 120);
}

function draw() {
  background(220);
  
  image(img, 0, 0, mouseX * 2, mouseY * 2);
  
}let img1;
let img2;

function preload() {
  img1 = loadImage('images/lunar.jpg');
  img2 = loadImage('images/capsule.jpg');

}

function setup() {
  createCanvas(480, 120);
  
}

function draw() {
  background(220);
  
  image(img1, -120, 0);
  image(img1, 130, 0, 240, 120);
  image(img2, 300, 0, 240, 120);
        
}let img;

function preload() {
  img = loadImage("images/lunar.jpg");

}

function setup() {
  createCanvas(480, 120);
  
}

function draw() {
  background(220);
  
  image(img, 0, 0);
        
}/*

Based on Cities example.

*/

var data;                 // Declare a variable to hold data
let premiums = [];        // Declare a variable to hold an array

function preload() {
  // Assign a .csv file to the variable holding our data
  data = loadTable("insurance.csv", "header");

}

function setup() {
  createCanvas(480, 120);
  fill(255, 150);
  noStroke();
  
    // Declare a variable and assign it the number of rows in the .csv file
  let rowCount = data.getRowCount();
  // Fill the array by incrementing through
  for (let i = 0; i < rowCount; i++) {
    premiums[i] = data.getNum(i, 1);
  }
}

function draw() {
  background(220);
  stroke(153);
  line(20, 100, 20, 20);
  line(20, 100, 460, 100);
  
  // Draw vertical lines at regular intervals for each row of data in the .csv
  for (let i = 0; i < data.getRowCount(); i++) {
    // let date = data.getNum(i, "date");
    // let total = data.getNum(i, "total");
    let x = map(i, 0, data.length - 1, 20, 460);
    line(x, 20, x, 100);
    
  }

  // Draw a line graph based on insurance premiums by month
  noFill();
  stroke();
  beginShape();
  for (let j = 0; j < premiums.length; j++) {
    let x = map(j, 0, premiums.length - 1, 20, 460);
    let y = map(premiums[i], 0, 60, 100, 20);
    vertex(x, y);
    
  }

}










/*	---------------- Cities stuff -----------------------

function draw() {
  background(0);
  let xoffset = map(mouseX, 0, width, -width * 3, -width);
  translate(xoffset, -600);
  scale(10);
  for (let i = 0; i < cities.getRowCount(); i++) {
    let latitude = cities.getNum(i, "lat");
    let longitude = cities.getNum(i, "lng");
    setXY(latitude, longitude);
    
  }

}

function setXY(lat, lng) {
  let x = map(lng, -180, 180, 0, width);
  let y = map(lat, 90, -90, 0, height);
  ellipse(x, y, 0.25, 0.25);

}

*//*

Based on Ortiz example.

*/

let data; // Declare a variable to hold data
// let date = []; // Declare a variable to hold an array
let premiums = []; // Declare a variable to hold an array
let padding = 50;

function preload() {
  // Assign a .csv file to the variable holding our data
  data = loadTable("insurance.csv", "header");

}

function setup() {
  createCanvas(700, 350);

  // Declare a variable and assign it the number of rows in the .csv file
  let rowCount = data.getRowCount();
  // Fill the array by incrementing through
  for (let i = 0; i < rowCount; i++) {
    premiums[i] = data.getNum(i, "total");
    print(premiums[i]);

  }

}

function draw() {
  background(255);

  // Draw vertical lines at regular intervals for each row of data in the .csv
  stroke(153);
  strokeWeight(1);
  line(padding, padding, padding, height - padding);
  line(padding, height - padding, width - padding, height - padding);
  for (let i = 0; i < premiums.length; i++) {
    let x = map(i, 0, premiums.length - 1, width - padding, padding);
    line(x, padding, x, height - padding);

  }

  // Draw a line graph based on insurance premiums by month
  fill(1);
  stroke(0);
  strokeWeight(3);
  
  beginShape();
  for (let j = 0; j < premiums.length; j++) {
    let graph_x = map(j, 0, premiums.length - 1, padding, width - padding);
    // print(graph_x);
    let graph_y = map(premiums[j], 0, max(premiums), height - padding, padding);
    print(graph_y);
    vertex(graph_x, graph_y);
  }
  
  endShape();

}/*
  Anna Oh and Noah Pivnick
  PhysComp 2301.003
  Halloween Midterm
  Arduino sketch: https://gist.github.com/nopivnick/fe10c16ba179776e34c9ca56f7361dda
*/

/*

Instructions to run this sketch on a localhost using two browser 
windows one of which is fullcreen on an external monitor

- If running Arduino IDE, make sure serial monitor is closed
- Run P5.serialcontrol.app
- Select serial port w/ Arduino from dropdown menu
- Open serial port
- Enable serial port
- Check P5.serialcontrol.app for the IP address assigned to the laptop
- Confirm `serial = new p5.SerialPort("<arduino-serial-port-IP>")` in function setup() is set correctly
- Save sketch in P5 web editor
- P5 web editor » File menu » Download sketch files to Desktop
- Change directory name to "halloween"
- Connect external monitor
- System Preferences » Displays » Arrangement » turn mirroring *off*
- Open Terminal
- $ cd ./halloween
- $ python -m SimpleHTTPServer
- Open two Chrome windows and enter http://<arduino-serial-port-IP>:8000 in each
- Push one Chrome window to external display and make fullscreen (Cmd+Shift+F )
*/


let serial; // declare a global variable for serial class
let portName = '/dev/cu.usbmodem1411';
let serialIn;
let coffins = [];
let coffinsIndex = 0;
let coffinImage;


function preload() {

  // TODO: ideally we'd use a for loop to preload all coffin images
  // for (let i = 0; i < 10; i++) {
  //   coffins[i] = loadImage("images/" + i + ".jpg");

  coffins[0] = loadImage('images/0.jpg');
  coffins[1] = loadImage('images/1.jpg');
  coffins[2] = loadImage('images/2.jpg');
  coffins[3] = loadImage('images/3.jpg');
  coffins[4] = loadImage('images/4.jpg');
  coffins[5] = loadImage('images/5.jpg');
  coffins[6] = loadImage('images/6.jpg');
  coffins[7] = loadImage('images/7.jpg');
  coffins[8] = loadImage('images/8.jpg');
  coffins[9] = loadImage('images/9.jpg');

}

function setup() {
  createCanvas(1920, 1080);
  serial = new p5.SerialPort(); // instantiate a new serial object
  serial.on('list', printList); // Serial.list();
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose);
  serial.open(portName);

}

function draw() {
  background(0);

  // Test whether we can manually load an image from project-folder/images
  // coffinImage = loadImage('images/0.jpg', 0, 0);

  coffinImage = coffins[coffinsIndex];
  image(coffinImage, 0, 0);

}

function serialEvent() {
  // The pushbutton on the Arduino sends high (1) or low (0) over serial
  serialIn = Number(serial.read());

  // Uncomment below to test whether buttonState is reading correctly
  // print(serialIn); // <- 

  // When the pushbutton on the Arduino is low, increment to the next coffin image
  if (serialIn == 0) {
    coffinsIndex++;

    if (coffinsIndex > coffins.length - 1) {
      coffinsIndex = 0;
    }
    
    print(coffinsIndex);

  }

}

/*
  The functions below are used as console diagnostics
*/

// get a list of serial port names and put them in an array called portList
function printList(portList) {
  // loop through the array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // and print the list to console
    print(i + " " + portList[i]);

  }

}

function serverConnected() {
  print('connected to server.');

}

function portOpen() {
  print('the serial port opened.')

}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);

}

function portClose() {
  print('The serial port closed.');

}

// // code to test serial communication with colored ellipses
// fill(255);
// text("Sensor Value: " + serialIn, 30, 30);

// // code to test serial communication with colored ellipses
// fill(255, 0, 0);
// ellipse(width / 2, height / 2, 100, 100);

// // code to test serial communication with colored ellipses
// fill(0, 255, 0);
// ellipse(width / 2, height / 2, 100, 100);/*
  Anna Oh and Noah Pivnick
  PhysComp 2301.003
  Halloween Midterm
  Arduino sketch: https://gist.github.com/nopivnick/fe10c16ba179776e34c9ca56f7361dda
*/

/*

Instructions to run this sketch on a localhost on an external monitor

- If running Arduino IDE, make sure serial monitor is closed
- Run P5.serialcontrol.app
- Select serial port w/ Arduino from dropdown menu
- Open serial port
- Enable serial port
- Check P5.serialcontrol.app for the IP address assigned to the serial port w/ Arduino
- Confirm code serial = new p5.SerialPort("<arduino-serial-port-IP>") in function setup() is set correctly
- If not, edit
- Save sketch in P5 web editor
- Save sketch files to Destop using File menu » Download
- Change sketch file directory name to "halloween"
- Open Terminal
- $ cd ./halloween
- $ python -m SimpleHTTPServer
- Open two sepatate Chrome windows with http://<arduino-serial-port-IP>:8000 in each
- Push one Chrome window to external display and make fullscreen (Cmd+Shift+F )
*/


let serial; // declare a global variable for serial class
let portName = '/dev/cu.usbmodem1411';
let serialIn;
let coffins = [];
let coffinsIndex = 0;
let coffinImage;


function preload() {

  // TODO: ideally we'd use a for loop to preload all coffin images
  // for (let i = 0; i < 10; i++) {
  //   coffins[i] = loadImage("images/" + i + ".jpg");

  coffins[0] = loadImage('images/0.jpg');
  coffins[1] = loadImage('images/1.jpg');
  coffins[2] = loadImage('images/2.jpg');
  coffins[3] = loadImage('images/3.jpg');
  coffins[4] = loadImage('images/4.jpg');
  coffins[5] = loadImage('images/5.jpg');
  coffins[6] = loadImage('images/6.jpg');
  coffins[7] = loadImage('images/7.jpg');
  coffins[8] = loadImage('images/8.jpg');
  coffins[9] = loadImage('images/9.jpg');

}

function setup() {
  // instantiate a new serial object
  createCanvas(1920, 1080);
  serial = new p5.SerialPort();
  serial.on('list', printList); //Serial.list();
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose);
  serial.open(portName);

}

function draw() {
  background(0);

  // Test whether we can manually load an image from project-folder/images
  // coffinImage = loadImage('images/0.jpg', 0, 0);

  coffinImage = coffins[coffinsIndex];
  image(coffinImage, 0, 0);

}

function serialEvent() {
  // The pushbutton on the Arduino sends high (1) or low (0) over serial
  serialIn = Number(serial.read());

  // Uncomment below to test whether buttonState is reading correctly
  // print(serialIn); // <- 

  // When the pushbutton on the Arduino is low, increment to the next coffin image
  if (serialIn == 0) {
    coffinsIndex++;

    if (coffinsIndex > coffins.length - 1) {
      coffinsIndex = 0;
    }
    
    print(coffinsIndex);

  }

}

/*
  The functions below are used as console diagnostics
*/

// get a list of serial port names and put them in an array called portList
function printList(portList) {
  // loop through the array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // and print the list to console
    print(i + " " + portList[i]);

  }

}

function serverConnected() {
  print('connected to server.');

}

function portOpen() {
  print('the serial port opened.')

}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);

}

function portClose() {
  print('The serial port closed.');

}

// // code to test serial communication with colored ellipses
// fill(255);
// text("Sensor Value: " + serialIn, 30, 30);

// // code to test serial communication with colored ellipses
// fill(255, 0, 0);
// ellipse(width / 2, height / 2, 100, 100);

// // code to test serial communication with colored ellipses
// fill(0, 255, 0);
// ellipse(width / 2, height / 2, 100, 100);/*
  Anna Oh and Noah Pivnick
  PhysComp 2301.003
  Halloween Midterm
  Arduino sketch: <url>
*/

let serial; // declare a global variable for serial
let portName = '/dev/cu.usbmodem1431';
let inData;
let buttonCount = 0;
let currentImage;
let imgOne, imgThree;
let imgTwo = [];
let imgTwoIndex = 0;

function preload() {
  imgOne = loadImage("images/GraveBlank.jpg");
  //imgTwo = loadImage("images/GraveName.jpg");

  // load the first 'inscribed`' image 
  // imgTwo[0] = loadImage("images/0.jpg");

  // load the next 'incribed' image in the array
  // imgTwo[1] = loadImage("images/1.jpg"); 

  // let i = "images/" + 0 + ".jpg";
  // imgTwo[0] = loadImage(i); 

  // optimally, use a for loop to load all 'inscribed' images
  // for (let i = 0; i < 1; i++){
  //    imgTwo[i] = loadImage("images/" + string(i) + ".jpg");
  // }

  imgTwo[0] = loadImage("images/0.jpg");

  imgThree = loadImage("images/GraveLetmepeace.jpg");

}

function setup() {
  // instantiate a new serial
  serial = new p5.SerialPort();

  serial.on('list', printList); //Serial.list();

  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose);
  createCanvas(1080, 1920);

  // Mithru stuff here
  // noLoop();
  // image(imgTwo[1], 0, 0);

  serial.open(portName);
}

function draw() {
  background(0);

  // // code to test serial communication without using images
  // fill(255);
  // text("Sensor Value: " + inData, 30, 30);

  // the modulus divisor = the number of images we want to cycle through
  // for every additional image, we add another else if statement
  if (buttonCount % 3 == 0) {
    currentImage = imgOne;

    // // code to test serial communication without using images
    //fill(255, 0, 0);

  } else if (buttonCount % 3 == 1) {
    currentImage = imgTwo[imgTwoIndex];

    // // code to test serial communication without using images
    //fill(0, 255, 0);

  } else {
    imgTwoIndex++;

    //check if imgTwoIndex value is greater than the length of imgTwo array
    //if greater, reset imgTwoIndex to 0
    if (imgTwoIndex > imgTwo.length - 1) {
      imgTwoIndex = 0;

    }

    currentImage = imgThree;

    // // code to test serial communication without using images
    //fill(0, 0, 255);

  }

  // // code to test serial communication without using images
  //ellipse(width / 2, height / 2, 100, 100);

  image(currentImage, 0, 0);
  // print(buttonCount);

}

function serialEvent() {
  // when the pushbutton is pressed on the Arduino,
  // it sends ithe on/off cycle (1 *and* 0) over serial
  inData = Number(serial.read());

  // print(inData);

  // if we we want to increase button count every release, use
  // if (inData == 0)

  // if we want to increase button count upon press, use
  // if (inData == 1)

  if (inData == 0) {
    buttonCount++;

  }

}

/*
  The functions below are used as console diagnostics
*/

// get a list of serial port names and put them in an array called portList
function printList(portList) {
  // loop through the array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // and print the list to console
    print(i + " " + portList[i]);

  }

}

function serverConnected() {
  print('connected to server.');

}

function portOpen() {
  print('the serial port opened.')

}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);

}

function portClose() {
  print('The serial port closed.');

}// declare a global variable for the text
let text;
// declare a global value for 
let tokens;

function preload() {
  text = loadstrings('joke.text');
  console.log(text);

  function setup() {
    createCanvas(400, 400);
    splitTokens(text);
  }

  function draw() {
    background(220);

  }
}let jonahsMug;

function setup() {
  // create the canvas so it encompasses the entire page
  createCanvas(windowWidth, windowHeight);
  jonahsMug = createImg('./assets/IMG_0059.jpg');

}

function draw() {
  background(150);

  // have an embarassing photo of Jonah under the cursor at all times
  jonahsMug.position(mouseX, mouseY);
}

// keep canvas size equal to window size at all times
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}/*

Noah Pivnick
Intro to Computational Media: Week 5

4. CHALLENGE: Create 100 bouncing balls. Delete them if they collide with each other.

*/

let balls = [];
let numBalls = 100;

// TODO: let allObjects = []; 

function setup() {
  createCanvas(400, 400);
  let ballColor = color(random(255), random(255), random(255))
  for (let i = 0; i < numBalls; i++) {
    let ball = new Ball(random(width), random(height), random(10, 50), ballColor, random(-5, 5), random(-5, 5));
    balls.push(ball);

  }
  // print(balls);

}

function draw() {
  background(220);

  // have every ball in the array start its methods
  for (let i = 0; i < balls.length; i++) {
    balls[i].run();

    // // delete a ball if you touch it with the mouse
    // // *before* entering the second (nested) for loop
    // if (balls[i].touch(mouseX, mouseY) == true) {
    //   balls.splice(i, 1);
    //
    // }
    
    // have every ball in the array check if it's touching another ball
    for (let j = i; j < balls.length; j++) {
      
      // if i and j are not the same *and* touch is true
      if (i != j && balls[i].touch(balls[j].ballPositionX, balls[j].ballPositionY, balls[j].ballRadius) == true) {
        // determine which is the larger radius
        // and delete the ball with the smaller ballRadius

        if (balls[i].ballRadius > balls[j].ballRadius) {
          // absorb needs to happen here before the splice
          // balls[i].absorb(balls[i].ballRadius, balls[j].ballRadius);
          // in addition to any other method that relies on 
          // other properties of the about-to-be deleted object
          balls.splice(j, 1);
          
        } else {
          // absorb happens here before the splice
          
          // in addition to any other method that relies on 
          // other properties of the about-to-be deleted object
          balls.splice(i, 1);
          
        }
      }
    }
  }
}/*

Noah Pivnick
Intro to Computational Media: Week 5

4. CHALLENGE: Create 100 bouncing balls. Delete them if they collide with each other.

*/

let balls = [];

// TODO: let allObjects = []; 

function setup() {
  createCanvas(400, 400);
  let ballColor = color(random(255), random(255), random(255))
  for (let i = 0; i < 5; i++) {
    let ball = new Ball(random(width), random(height), random(10, 50), ballColor, random(-5, 5), random(-5, 5));
    balls.push(ball);

  }
  // print(balls);

}

function draw() {
  background(220);
  
  for (let i = 0; i < balls.length; i++) {
    balls[i].run();

    if (balls[i].touch(mouseX, mouseY) == true) {
      balls.splice(i, 1);

    }
  }
}/*

Noah Pivnick
Intro to Computational Media: Week 5

3. Create 100 bouncing balls. Delete them by mousing over them.

*/

let balls = [];

function setup() {
  createCanvas(400, 400);
  let ballColor = color(random(255), random(255), random(255))
  for (let i = 0; i < 100; i++) {
    let ball = new Ball(random(width), random(height), random(10, 50), ballColor, random(-5, 5), random(-5, 5));
    balls.push(ball);

  }
  // print(balls);

}

function draw() {
  background(220);
  
  for (let i = 0; i < balls.length; i++) {
    balls[i].run();

    if (balls[i].touch(mouseX, mouseY) == true) {
      balls.splice(i, 1);

    }
  }
}/*

Noah Pivnick
Intro to Computational Media: Week 5

2. Create bouncing balls by clicking the mouse.

*/

let balls = [];

function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(220);
  for (let i = 0; i < balls.length; i++) {
    balls[i].run();

  }
}

function mousePressed() {
  let ballColor = color(random(255), random(255), random(255))
  let ball = new Ball(mouseX, mouseY, random(10,50), ballColor, random(-5,5), random(-5,5));
  balls.push(ball);
  print(balls);

}/*

Noah Pivnick
Intro to Computational Media: Week 5

1. Create and use an add() function that takes 2 numbers and adds them together.

*/

function setup() {
  createCanvas(400, 400);
  let numOne = int(random(100));
  let numTwo = int(random(100));
  add(numOne, numTwo);
  print("what's the sum of " + numOne + " + " + numTwo + "?");
}

function draw() {
  background(220);
  textSize(width * 0.25);
  textAlign(CENTER, CENTER);
  text(sum, width * 0.5, height * 0.5);
}

function add(numOne, numTwo) {
  sum = numOne + numTwo;
  return sum;

}// Noah Pivnick
// Intro to Computational Media - Week 5

// TODO: pop only when mouse is over balloon

let balloon // instantiate new balloon object
// let balloonPopped = false; // set initial balloon state
let balloons = []; // declare balloon objects array

function setup() {
  createCanvas(600, 400);
  let numberBalloons = 10;
  // fill balloons array
  for (let i = 0; i < numberBalloons; i++) {
    print("adding balloon " + i + " to array!"); // print index value of each balloon
    // TODO: move ballonStart stuff to Balloon class?
    let balloonStartX = random(0, width);
    let balloonStartY = 150;
    let balloonStartRadius = 60;
    let balloonStartSpeed = 1;
    balloons[i] = new Balloon(balloonStartX, balloonStartY, balloonStartRadius, balloonStartSpeed);
  }
}


function draw() {
  background(51, 195, 255);

  for (let balloon of balloons) {
    balloon.run();
  }
  //  // QUESTION: why doesn't this loop work?
  //  for (let i = 0; i < balloons.length; i++); {
  //   print("starting balloons loop!");
  //   balloons[i].run();

  //     for (let i = 0; i < balloons.length; i++) {
  //       if (balloons[i].touchBalloon(mouseX, mouseY)) {
  //         // remove the that balloon from the balloons array
  //         bubbles.splice(i, 1);
  //       }

  //     }

}

// function mousePressed() {
//   print('POP!'); // confirm mousePressed in console
//   balloonPopped = true // change balloon state
// }


// Ideas:
//
// * balloon inflates / expands before popping
//     * incremental expansion each time mousePressed (?)
//     * linear expansion while mouseIsPressed (?)
// * random distribution of balloons at startup
//     * requires an array in setup (maybe next week)

// TODO: game
//
// * functions as methods:
//     * bouyancy
//     * animated pop
//     * cursor chaselet slider;  // declare a variable called 'slider'

function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, 250, 125);
  slider.position(width * 0.5, height * 0.90);
}

function draw() {
  background(220);
  let circleSize = slider.value();
  ellipse(width * 0.5, height * 0.5, circleSize)
  
}// NOTE: this version uses *separate* variables for ballon width and height
// Noah Pivnick
// Intro to Computational Media - Week 5

// TODO: pop only when mouse is over balloon

let balloon // instantiate new balloon object
// let balloonPopped = false; // set initial balloon state
let balloons = []; // declare balloon objects array

function setup() {
  createCanvas(600, 400);
  let numberBalloons = 10;
  // fill balloons array
  for (let i = 0; i < numberBalloons; i++) {
    print("adding balloon " + i + " to array!"); // print index value of each balloon
    // TODO: move ballonStart stuff to Balloon class?
    let balloonStartX = random(0, width);
    let balloonStartY = 150;
    let balloonStartWidth = 50;
    let balloonStartHeight = balloonStartWidth * 1.2;
    let balloonStartSpeed = 1;
    balloons[i] = new Balloon(balloonStartX, balloonStartY, balloonStartWidth, balloonStartHeight, balloonStartSpeed);
  }
}


function draw() {
  background(51, 195, 255);

  for (let balloon of balloons) {
    balloon.run();
  }
  //  // QUESTION: why doesn't this loop work?
  //  for (let i = 0; i < balloons.length; i++); {
  //   print("starting balloons loop!");
  //   balloons[i].run();

  //     for (let i = 0; i < balloons.length; i++) {
  //       if (balloons[i].touchBalloon(mouseX, mouseY)) {
  //         // remove the that balloon from the balloons array
  //         bubbles.splice(i, 1);
  //       }

  //     }

}

// function mousePressed() {
//   print('POP!'); // confirm mousePressed in console
//   balloonPopped = true // change balloon state
// }


// Ideas:
//
// * balloon inflates / expands before popping
//     * incremental expansion each time mousePressed (?)
//     * linear expansion while mouseIsPressed (?)
// * random distribution of balloons at startup
//     * requires an array in setup (maybe next week)

// TODO: game
//
// * functions as methods:
//     * bouyancy
//     * animated pop
//     * cursor chase// Noah Pivnick
// ITP Intro to Computational Media - Week 4

// TODO: pop only when mouse is over balloon

let balloon = new Balloon(300, 150, 50, 65);  // instantiate new balloon
let balloonPopped = false;                    // set initial balloon state


function setup() {
  createCanvas(600, 400);
}


function draw() {
  background(51, 195, 255);
  if (balloonPopped == false) {
    balloon.run();
  }
}


function mousePressed() {
  print('POP!');                              // confirm mousePressed in console
  balloonPopped = true                        // change balloon state
}


// Ideas:
//
// * balloon inflates / expands before popping
//     * incremental expansion each time mousePressed (?)
//     * linear expansion while mouseIsPressed (?)
// * random distribution of balloons at startup
//     * requires an array in setup (maybe next week)

// TODO: game
//
// * functions as methods:
//     * bouyancy
//     * animated pop
//     * cursor chaselet arcDiameter = 50

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  for (let arcStartX = arcDiameter; arcStartX <= width - arcDiameter; arcStartX += 10) {
    for (let arcStartY = arcDiameter; arcStartY <= height - arcDiameter; arcStartY += arcDiameter) {
      for (let startArc = PI; startArc < PI; startArc += PI + 10) {
        for (let endArc = HALF_PI; endArc < HALF_PI; endArc += HALF_PI + 10) {
          arc(arcStartX, arcStartY, arcDiameter, arcDiameter, PI, HALF_PI, PIE);
        }
      }
    }
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  let lineStartX
  let lineEndX
  let lineStartY
  let lineEndY
  for (let lineStartX = 10; lineStartX <= width + 10; lineStartX += 10) {
    for (let lineStartY = 10; lineStartY <= width + 10; lineStartY += 10) {
      for (let lineEndX = 10; lineEndX <= height + 10; lineEndX += 10) {
        for (let lineEndY = 10; lineEndY <= height + 10; lineEndY += 10) {
          line(lineStartX, lineStartY, lineEndX, lineEndY);
        }
      }
    }
  }
}function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);
  let checkerSize = 100
  for (let i = 0; i <= width; i += checkerSize) {
    for (let j = 0; j <= height; j += checkerSize)
      if (
        noStroke();
        rect(i, j, checkerSize, checkerSize)
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('navy');
  // // let numStars = 1
  // for (let numStars = 1; numStars == 100; numStars++) {
  //   // draw starfield
    noStroke();
    fill('white');
    ellipse(random(width), random(height), 5, 5);
  // }
}let shapeSpacing = 50;
let shapeSize = 25;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(220);

  // horizontal
  ellipse(shapeSpacing, height * 0.5, shapeSize, shapeSize);
  rect(shapeSpacing * 2, height * 0.5, shapeSize, shapeSize);
  ellipse(shapeSpacing * 3, height * 0.5, shapeSize, shapeSize);
  rect(shapeSpacing * 4, height * 0.5, shapeSize, shapeSize);
  ellipse(shapeSpacing * 5, height * 0.5, shapeSize, shapeSize);
  rect(shapeSpacing * 6, height * 0.5, shapeSize, shapeSize);
  ellipse(shapeSpacing * 7, height * 0.5, shapeSize, shapeSize);

  // vertical
  ellipse(width * 0.5, shapeSpacing, shapeSize, shapeSize);
  rect(width * 0.5, shapeSpacing * 2, shapeSize, shapeSize);
  ellipse(width * 0.5, shapeSpacing * 3, shapeSize, shapeSize);
  rect(width * 0.5, shapeSpacing * 4, shapeSize, shapeSize);
  ellipse(width * 0.5, shapeSpacing * 5, shapeSize, shapeSize);
  rect(width * 0.5, shapeSpacing * 6, shapeSize, shapeSize);
  ellipse(width * 0.5, shapeSpacing * 7, shapeSize, shapeSize);
}// P5 Robot code attributed to McCarthy, Lauren from the book
// Getting Started with p5.js: Making Interactive Graphics
// in JavaScript and Processing (Make) (Kindle Locations 716-756).
// Maker Media, Inc. Kindle Edition. 


function setup() {
  createCanvas(720, 480);
  strokeWeight(2);
  ellipseMode(RADIUS);
}

function draw() {
  background(204);

  // Neck
  stroke(102);                // Set stroke to gray
  line(266, 257, 266, 162);   // Left
  line(276, 257, 276, 162);   // Middle
  line(286, 257, 286, 162);   // Right

  // Antennae
  line(276, 155, 246, 112);   // Small
  line(276, 155, 306, 56);    // Tall
  line(276, 155, 342, 170);   // Medium

  // Body
  noStroke();                 // Disable stroke
  fill(102);                  // Set fill to gray
  ellipse(264, 377, 20, 20);  // Antigravity orb
  ellipse(326, 377, 20, 20);  // Antigravity orb
  fill(0);                    // Set fill to black
  rect(219, 257, 150, 120);   // Main body
  fill(102);                  // Set fill to gray
  rect(219, 274, 90, 6);      // Gray stripe

  // Head
  fill(0);                    // Set fill to black
  ellipse(276, 155, 35, 35);  // Head
  fill(255);                  // Set fill to white
  ellipse(288, 150, 14, 14);  // Large eye
  fill(0);                    // Set fill to black
  ellipse(288, 150, 3, 3);    // Pupil
  fill(153);                  // Set fill to light gray
  ellipse(263, 148, 5, 5);    // Small eye 1
  ellipse(296, 130, 4, 4);    // Small eye 2
  ellipse(305, 162, 3, 3);    // Small eye 3
}function setup() {
  createCanvas(400, 400);
  strokeWeight(35);
}

function draw() {
  background('purple');
  beginShape();
  fill('gold');
  vertex(100, 100);
  vertex(300, 100);
  vertex(width * 0.5 + 20, height * 0.5);
  vertex(300, 300);
  vertex(100, 300);
  vertex(width * 0.5 - 20, height * 0.5);
  endShape(CLOSE);
}function setup() {
  createCanvas(400, 400);
  strokeWeight(5);
  ellipseMode(CENTER);
}

function draw() {
  background('pink');
  fill(255, 0, 0, 100);
  ellipse(width * 0.33, height * 0.33, 200, 200)
  fill(0, 255, 0, 100);
  ellipse(width * 0.66, height * 0.33, 200, 200)
  fill(0, 0, 255, 100);
  ellipse(width * 0.5, height * 0.66, 200, 200)
}function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  stroke('black');
  strokeWeight(10);
  strokeJoin(ROUND);
}

function draw() {
  background(220);
  pop();
  fill('red')
  arc(width * 0.5, height * 0.5, 250, 250, 0, 45, PIE)
  push();
  pop();
  fill('blue')
  arc(width * 0.5, height * 0.5, 250, 250, 45, 215, PIE)
  push();
  pop();
  fill('yellow')
  arc(width * 0.5, height * 0.5, 250, 250, 215, 245, PIE)
  push();
  pop();
  fill('purple')
  arc(width * 0.5, height * 0.5, 250, 250, 245, 305, PIE)
  push();
  pop();
  fill('white')
  arc(width * 0.5, height * 0.5, 250, 250, 305, 0, PIE)
  push();
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  arc(100, 100, 100, 100, HALF_PI, TWO_PI)
  arc(300, 100, 100, 100, PI, HALF_PI)
  arc(100, 300, 100, 100, TWO_PI, PI + HALF_PI)
  arc(300, 300, 100, 100, PI + HALF_PI, PI)
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  line(100, 100, 300, 300);
  line(100, 300, 300, 100);
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // draw points +/- 10 for visibility
  point(0 + 10, 0 + 10);
  point(width - 10, 0 + 10);
  point(0 + 10, height - 10);
  point(width - 10, height - 10);
  
  // horizontal line using points
  point(width * 0.5 - 5, height * 0.5);
  point(width * 0.5 - 4, height * 0.5);
  point(width * 0.5 - 3, height * 0.5);
  point(width * 0.5 - 2, height * 0.5);
  point(width * 0.5 - 1, height * 0.5);
  point(width * 0.5 + 0, height * 0.5);
  point(width * 0.5 + 1, height * 0.5);
  point(width * 0.5 + 2, height * 0.5);
  point(width * 0.5 + 3, height * 0.5);
  point(width * 0.5 + 4, height * 0.5);
  point(width * 0.5 + 5, height * 0.5);
  
  // vertical line using points
  point(width * 0.5, height * 0.5 - 5);
  point(width * 0.5, height * 0.5 - 4);
  point(width * 0.5, height * 0.5 - 3);
  point(width * 0.5, height * 0.5 - 2);
  point(width * 0.5, height * 0.5 - 1);
  point(width * 0.5, height * 0.5 + 0);
  point(width * 0.5, height * 0.5 + 1);
  point(width * 0.5, height * 0.5 + 2);
  point(width * 0.5, height * 0.5 + 3);
  point(width * 0.5, height * 0.5 + 4);
  point(width * 0.5, height * 0.5 + 5);

  // diagonal line using points
  point(width * 0.5 - 5, height * 0.5 - 5);
  point(width * 0.5 - 4, height * 0.5 - 4);
  point(width * 0.5 - 3, height * 0.5 - 3);
  point(width * 0.5 - 2, height * 0.5 - 2);
  point(width * 0.5 - 1, height * 0.5 - 1);
  point(width * 0.5 + 0, height * 0.5 - 0);
  point(width * 0.5 + 1, height * 0.5 + 1);
  point(width * 0.5 + 2, height * 0.5 + 2);
  point(width * 0.5 + 3, height * 0.5 + 3);
  point(width * 0.5 + 4, height * 0.5 + 4);
  point(width * 0.5 + 5, height * 0.5 + 5);
}let balloonPopped = false;
let balloonWidth = 50;
let balloonHeight = 65;

function setup() {
  createCanvas(600, 400);
}


function draw() {
  background(220);
  if (balloonPopped == false) {
    balloon(width * 0.5, height * 0.33)
  }
}


function balloon(positionX, positionY) {
  //draw a balloon
  push(); // start balloon position translation
  translate(positionX, positionY)
  // draw a string
  stroke('white');
  line(0, 0 + balloonHeight * 0.5, 0, 0 + 150);
  // draw a balloon
  noStroke();
  fill('red');
  ellipse(0, 0, balloonWidth, balloonHeight);
  // draw a knot
  triangle(0, 0 + balloonHeight * 0.5, 0 + 5, balloonHeight * 0.5 + 5, 0 - 5, balloonHeight * 0.5 + 5);
  pop(); // conclude balloon position translation
}


// TODO: figure out balloon pop function
function balloonPop() {
  // if balloon is present
  if (mouseIsPressed === true) {
    // then 'pop' the balloon
    balloonPopped = true
  } else {
    balloonPopped = false
  }
  return balloonPopped;
}balloon = new Balloon( 200, 200, 40, 40);

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  

    balloon.run();
  
}

function balloonPop(){
	
  if(mouseIsPressed){
  
    balloon.sizeX = 0;
    balloon.sizeY = 0;
  
  }
  
  // for(let i = balloon.sizeX; i>=0; i--){
  // balloon.sizeX = i;
  // balloon.sizeY = i;  
  //}
}// Task: Divide the canvas into 3 vertical areas.
// Hovering over each area changes that area to red.

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  // if the mouse is within the first third of the width
  if (mouseX > 0 && mouseX < width / 3) {
    // draw left most vertical panel
    // and make it red
    noStroke();
    fill('red');
    rect(0, 0, width / 3, height);
  }
  if (mouseX > (width / 3) && mouseX < 2 * width / 3) {
    // draw left most vertical panel
    // and make it red
    fill('red');
    noStroke();
    rect(width / 3, 0, width / 3, height);
  }
  if (mouseX > (2 * width / 3) && mouseX < width) {
    // draw left most vertical panel
    // and make it red
    noStroke();
    fill('red');
    rect(2 * width / 3, 0, width / 3, height);
  }
}let sunHeight = 400
let sunSpeed = 1

let skyRed = 0
let skyGreen = 0
let skyBlue = 0

let skyBrite = 0

let earthRed = 0
let earthGreen = 0
let earthBlue = 0

let lensTint = 0

let sunButton = false

let starLatitude
let starLongitude = 0
let starRed = 0
let starGreen = 0
let starBlue = 0


function setup() {
  createCanvas(400, 400);
}


function draw() {
  background(skyRed, skyGreen, skyBlue);
  // map sky brightness to height of sun
  skyBlue = map(sunHeight, height, 0, 0, 255);

  // draw star field
  for (starLatitude = 0; starLatitude < width; starLatitude += random(width)) {
    for (starLongitude = 0; starLongitude < height; starLongitude += random(height)) {
      noStroke();
      fill(255);
      ellipse(starLatitude, starLongitude, 5, 5);
    }
  }

  // draw sun
  noStroke();
  fill(255, 255, 0);
  ellipseMode(CENTER);
  ellipse(50, sunHeight, 50, 50);

  // move sun
  sunHeight -= sunSpeed;
  // reverse sun at edge of canvas
  if (sunHeight < 0 || sunHeight > height) sunSpeed *= -1;
  // TODO: slow sun speed in proportion to distance from canvas edge
  // sunSpeed = sunHeight / 100

  // draw earth
  noStroke();
  fill(0, earthGreen, 0);
  rect(0, 320, height, 100)
  // map earth brightness to height of sun
  earthGreen = map(sunHeight, height, 0, 0, 255);

  // draw mustache
  noStroke();
  fill(0);
  triangle(150, 220, 200, 200, 250, 220);
  // mustacheTip = map(mouseY, 400, 0, 250, 240)

  // draw goatee
  noStroke();
  fill(0);
  triangle(185, 250, 215, 250, 200, 225);
  noStroke();
  fill(0);
  triangle(175, 250, 200, 290, 225, 250);

  // draw left pupil
  noStroke();
  fill(0);
  ellipse(170, 165, 10, 10);
  // draw right pupil
  noStroke();
  fill(0);
  ellipse(225, 165, 10, 10);

  // draw glasses lens left eye
  stroke(0);
  strokeWeight(3);
  fill(lensTint, 125);
  rect(140, 145, 45, 30, 5, 5, 20, 20);
  // draw glasses lens right eye
  stroke(0);
  strokeWeight(3)
  fill(lensTint, 125);
  rect(210, 145, 45, 30, 5, 5, 20, 20);

  // transition lenses
  push();
  lensTint = map(sunHeight, 100, 0, 255, 0);
  lensTint = lensTint + 1;

  // button to reverse sunSpeed
  // declare and assign button variables
  let fastButtonX = 335;
  let fastButtonY = 335;
  let fastButtonWidth = 50;
  let fastButtonHeight = 50;
  push();
  noStroke();
  fill('red');
  // make fast-forward button a rollover
  if ((mouseX > fastButtonX) && (mouseX < fastButtonX + fastButtonWidth) && (mouseY > fastButtonY) && (mouseY < fastButtonY + fastButtonHeight)) {
    fill(125);
    if (mouseIsPressed) {
      sunSpeed = sunSpeed * -1
    }
  }
  // draw fast-forward button
  rect(fastButtonX, fastButtonY, fastButtonWidth, fastButtonHeight);
  pop();
}

// TODO: make sunButton have on/off state
// function mousePressed() {
//   if ((mouseX > fastButtonX) && (mouseX < fastButtonX + fastButtonWidth) && (mouseY > fastButtonY) && (mouseY < fastButtonY + fastButtonHeight)) {
//     sunButton = !sunButton
//   }
// }


// TODO: incorporate a better random event
// if (mouseIsPressed) {
//   if (mouseButton === LEFT) {
//     sunHeight = random(400, 0);
//   }
// }// declare a variable for ball position
// declare a variable for ball speed

function setup() {
  createCanvas(400, 400);
  // initialize ball position and assign it value 0 (left edge of canvas)
}

function draw() {
  background(220);
  // draw an ellipse at the left edge of canvas 
  // and halfway along the height
  // with equal width and height
  
  // move the ball incrementing its position by its speed every frame
  
  // reverse ball speed when ball position is 
  // equal to or greater than canvas width
}// unfinished

let xPosition;
let xSpeed = 10;

function setup() {
  createCanvas(400, 400);
  // initialize the ball at the middle left edge of the canvas
  xPosition = 0;
}

function draw() {
  background(220);

  // draw the ball
  ellipse(xPosition, width/2, 50, 50);
  
  // move the ball
  

}
// draw the ball at the zero of width and one half of the height. 
// increment the ball as long as the x is less than width. When x is at or greater 
// than width decrament function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

// draw three rect()'s each one-third width of canvas and full height

// if the mouse is inside any given panel, fill the panel with the color red

// mouseX is >= width of any given rect();, fill rect with redlet position;
let speed_y = 0;

function setup() {
  createCanvas(400, 600);
  position = height;
}

function draw() {
  background(220);
  // ellipse(CENTER);
  ellipse(width/2, position, 50, 50)
  position-=speed_y
  speed_y = (y-mouseY) / 100;
}// taking a crack at objects if for no other reason than to 
// demonstrate the different varients asked for in the quiz 
// simultaneously without relying on commenting out code

let circleToLeft = {
  x: 200,
  y: 200,
  size: 50,
  speed: 1,

};

let circleToRight = {
  x: 200,
  y: 200,
  size: 50,
  speed: 1,

};

let circleToTopLeft = {
  x: 200,
  y: 200,
  size: 50,
  speed: -10,

};

// let circleToTopRight = {
//   x: 200,
//   y: 200,
//   size: 50,
//   speed: 1,

// };

// let circleToBottomLeft = {
//   x: 200,
//   y: 200,
//   size: 50,
//   speed: 1,

// };

// let circleToBottomRight = {
//   x: 200,
//   y: 200,
//   size: 50,
//   speed: 1,

// };

function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(220);
  ellipseMode(CENTER);

  // circle moving to the left
  ellipse(circleToLeft.x, circleToLeft.y, circleToLeft.size, circleToLeft.size);
  circleToLeft.y = circleToLeft.y + circleToLeft.speed;
  
  // circle moving to the right
  ellipse(circleToRight.x, circleToRight.y, circleToRight.size, circleToRight.size);
  circleToRight.x = circleToRight.x + circleToRight.speed;

  // circle moving to the top left
  ellipse(circleToTopLeft.x, circleToTopLeft.y, circleToTopLeft.size, circleToTopLeft.size);
  circleToTopLeft.x = circleToTopLeft.x + circleToTopLeft.speed;
  circleToTopLeft.y = circleToTopLeft.y + circleToTopLeft.speed;
  
//   // circle moving to the top right
//   ellipse(circleToTopRight.x, circleToTopRight.y, circleToTopRight.size, circleToTopRight.size);
//   circleToTopRight.x = circleToTopRight.x + circleToTopRight.speed;
//   circleToTopRight.y = circleToTopRight.y + circleToTopRight.speed;
  
//   // circle moving to the bottom left
//   ellipse(circleToLeft.x, circleToLeft.y, circleToLeft.size, circleToLeft.size);
//   circleToLeft.y = circleToLeft.y + circleToLeft.speed;
  
//   // circle moving to the bottom right
//   ellipse(circleToBottomRight.x, circleToBottomRight.y, circleToBottomRight.size, circleToBottomRight.size);
//   circleToBottomRight.x = circleToBottomRight.x + circleToBottomRight.speed;

  
}let circleToTheLeft = 

ball_x;
let ball_y;
let ballSpeed;

function setup() {
  createCanvas(400, 400);
  ball_x = width  * 0.5
  ball_y = height * 0.5

}

function draw() {
  background(220);
  ellipseMode(CENTER);
  ellipse(ball_x, ball_y, 50, 50);
  ball_x = ball_x + 1
  ball_y = ball_y + 1
}  var x;

function setup() { 
  createCanvas(800, 600);
  background(220);
  // 1st argument:
  // 2nd argument:
  // 3rd argument:
  // 4th argument: 
  x = width/2;
  rectMode(CENTER);
} 

function draw() {
  
  rect(x, 300, 100, 100);
  console.log(width);
  
}let sunHeight = 400
// let sunSpeed = 1

let skyRed = 0
let skyGreen = 0
let skyBlue = 0

let skyBrite = 0

let earthRed = 0
let earthGreen = 0
let earthBlue = 0

let lensTint = 0

let mustacheTip = 250

function setup() {
  createCanvas(400, 400);

}


function draw() {
  background(skyRed, skyGreen, skyBlue);

  // sun
  noStroke();
  fill(255, 255, 0);
  ellipseMode(CENTER);
  ellipse(50, sunHeight, 50, 50);

//   // TODO: work on conditional to bring sun back to earth at apex
//   if (sunHeight < 0) {
//     sunHeight = + 1
  
//   }
 
  sunHeight = sunHeight - 1;

  
  // earth
  noStroke();
  fill(0, earthGreen, 0);
  rect(0, 350, height, 100)

  // mustache
  noStroke();
  fill(0);
  triangle(150, 250, 200, 230, 250, 250);
  // mustacheTip = map(mouseY, 400, 0, 250, 240)

  // soul patch
  noStroke();
  fill(0);
  triangle(185, 280, 215, 280, 200, 255);

  // goatee
  noStroke();
  fill(0);
  triangle(175, 280, 200, 320, 225, 280);

  // left pupil
  noStroke();
  fill(0);
  ellipse(170, 195, 10, 10);
  // right pupil
  noStroke();
  fill(0);
  ellipse(225, 195, 10, 10);

  // glasses lens left eye
  stroke(0);
  strokeWeight(3);
  fill(lensTint, 125);
  rect(140, 175, 45, 30, 5, 5, 20, 20);
  // glasses lens right eye
  stroke(0);
  strokeWeight(3)
  fill(lensTint, 125);
  rect(210, 175, 45, 30, 5, 5, 20, 20);

  // transition lenses
  lensTint = map(sunHeight, 100, 0, 255, 0);
  lensTint = lensTint + 1;

  // sky color
  skyBlue = map(sunHeight, height, 0, 0, 255);

  // earth color
  earthGreen = map(sunHeight, height, 0, 0, 255);

  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      sunHeight = random(400, 0);
    }
  }

}let ratio;
// let topLeft;
// let topRight;
// let bottomLeft;
// let bottomRight;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(220);

  // rect() one-half width & height of canvas
  ratio = 0.5
  noStroke();
  fill(150);
  rect(width * ratio, height * ratio, width * ratio, height * ratio);

  // rectangle one-half width & height of canvas using vectors
  stroke(0);
  strokeWeight(5);
  noFill();
  beginShape();
  vertex(width * 0.25, height * 0.25);
  vertex(width * 0.75, height * 0.25);
  vertex(width * 0.75, height * 0.75);
  vertex(width * 0.25, height * 0.75);
  endShape(CLOSE);

}function setup() {
  createCanvas(500, 400);
}

function draw() {
  // same as my earlier stab at turqoise
  background(0, 255, 255);

  // red think slash from corner to corner
  stroke(255, 0, 0);
  strokeWeight(35);
  line(0, 0, 500, 400);

  // ellipse, centered, no outline
  noStroke();
  fill(0, 200, 0);
  ellipse(250, 200, 250, 180);

  // little blue rectangle, off to one side
  noStroke();
  fill(0, 0, 200);
  rect(340, 160, 35, 35);

}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  //
  // "Turquoise color is difficult to define, most commonly 
  // it is said to be a color between blue and green."
  //
  // I totally lifted that from here: https://goo.gl/msogh6
  //
  // decided to ditch the stroke
  noStroke();
  // and erred on the side of cyan
  //
  fill(0, 255, 255);
  ellipse(200, 200, 100, 100);
}function setup() { 
	createCanvas(400, 400); // <- one blah canvas, coming right up.
} 

function draw() { 
  background(220);
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(205, 205, 255);

  // // head
  // noFill();
  // ellipse(200, 200, 150, 200);
  
  // mustache
  noStroke();
  fill(0);
  triangle(150, 250, 200, 230, 250, 250);

  // soul patch
  noStroke();
  fill(0);
  triangle(185, 280, 215, 280, 200, 255);

  // goatee
  noStroke();
  fill(0);
  triangle(175, 280, 200, 320, 225, 280);
  
  // glasses left lens
  stroke(10);
  noFill();
  rect(140, 175, 45, 30);
  // right lens
  noFill();
  rect(210, 175, 45, 30);

  // left eye
  // noStroke();
  fill(0);
  ellipse(170, 195, 10, 10);

	// right eye
  fill(0);
  ellipse(225, 195, 10, 10);

}// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image Classification using Feature Extraction with MobileNet. Built with p5.js
=== */

let featureExtractor;
let classifier;
let video;
let loss;
let dogImages = 0;
let catImages = 0;

function setup() {
  noCanvas();
  // Create a video element
  video = createCapture(VIDEO);
  // Append it to the videoContainer DOM element
  video.parent('videoContainer');
  // Extract the already learned features from MobileNet
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  // Create a new classifier using those features and give the video we want to use
  classifier = featureExtractor.classification(video);
  // Create the UI buttons
  createButtons();
}

// A function to be called when the model has been loaded
function modelReady() {
  select('#loading').html('Base Model (MobileNet) loaded!');
}

// Add the current frame from the video to the classifier
function addImage(label) {
  classifier.addImage(label);
}

// Classify the current frame.
function classify() {
  classifier.classify(gotResults);
}

// A util function to create UI buttons
function createButtons() {
  // When the Cat button is pressed, add the current frame
  // from the video with a label of "cat" to the classifier
  buttonA = select('#catButton');
  buttonA.mousePressed(function() {
    addImage('cat');
    select('#amountOfCatImages').html(catImages++);
  });

  // When the Dog button is pressed, add the current frame
  // from the video with a label of "dog" to the classifier
  buttonB = select('#dogButton');
  buttonB.mousePressed(function() {
    addImage('dog');
    select('#amountOfDogImages').html(dogImages++);
  });

  // Train Button
  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Done Training! Final Loss: ' + loss);
      }
    });
  });

  // Predict Button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);
}

// Show the results
function gotResults(result) {
  select('#result').html(result);
  classify();
}
var position = 0;
var speed = 2

function setup() { 
  createCanvas(400, 400);
  background(200)
} 

function draw() { 
  background(200);
  var redValue = map(position, 0, width, 0, 255)
  fill (redValue, 100, 100);
  ellipse(position, height/2, 50, 50);
  position = position + speed;
  if (position > width) { 
      speed = -2;
  } else if (position < 0) {
    speed = 2;
  }
}function setup() { 
  createCanvas(400, 400);
  background(200);
  fill(0, 0, 0)
  stroke(0, 0, 255)
  // noStroke();
  strokeWeight(1);
  noFill(0);
  // back wheel
  ellipse(125, height/2, 100, 100);
  // front wheel
  ellipse(250, height/2, 100, 100);
  // ellipse(width/2+100, height/2+100, 100, 60);
  // fill(255, 0, 255);
  // triangle(0, 0, 100, 0, 50, 100);
  // fork
  triangle(160, 130, 230, 130, 250, height/2);
  fill(0, 0, 0);
  strokeWeight(2);
}