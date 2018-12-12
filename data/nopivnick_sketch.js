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
let portName = '/dev/cu.usbmodem1411';
let rotaryEncoder;
let rotaryButton = false;
let div;
let paragraph;
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
let substringPlaylist = [];
let alphaValue = 0;
let reveal = false;
let autoPlay = false;
 * P5 sketch setup function
function setup() {
  noCanvas();
  stateTutorial();
}
 * P5 sketch draw loop
function draw() {
  poemInteract();
  let subPlaylistTotalChars = 0;
  for (i = 0; i < substringPlaylist.length; i++) {
    subPlaylistTotalChars += (substringPlaylist[i][1] - substringPlaylist[i][0]);
  }
}
    stateTutorial();
    state01();
    state02();
    state03();
    state04();
    state20();
      substringIndexIncrease();
      substringIndexDecrease();
    }
  }
}
function substringIndexIncrease() {
  substringIndex++;
}
function substringIndexDecrease() {
}
 * there's a state for every poem
function stateTutorial() {
  alphaValue = 0;
  removeElements();
  currentPoem = tutorial;
  substringPlaylist = [
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}
function stateDescribe() {
  alphaValue = 0;
  removeElements();
  currentPoem = describe;
  substringPlaylist = [
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}
function stateIreland() {
  alphaValue = 0;
  removeElements();
  currentPoem = ireland;
  substringPlaylist = [
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}
function stateTitle() {
  alphaValue = 0;
  removeElements();
  currentPoem = title;
  substringPlaylist = [
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}
function state01() {
  alphaValue = 0;
  reveal = false;
  removeElements();
  currentPoem = poem01;
  substringPlaylist = [
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}
function state02() {
  alphaValue = 0;
  removeElements();
  currentPoem = poem02;
  substringPlaylist = [
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}
function state03() {
  alphaValue = 0;
  removeElements();
  currentPoem = poem03;
  substringPlaylist = [
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}
function state04() {
  alphaValue = 0;
  removeElements();
  currentPoem = poem04;
  substringPlaylist = [
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}
function state20() {
  alphaValue = 0;
  removeElements();
  currentPoem = poem20;
  substringPlaylist = [
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}
 * every state / poem uses the same layout in p5.dom
function poemLayout() {
  paragraph = createP();
  paragraph.style('font-size', '35px');
  paragraph.style('margin-top', '200px');
  paragraph.style('margin-right', '200px');
  paragraph.style('margin-left', '200px');
  paragraph.style('color: rgba(0, 0, 0, 0)');
  for (let i = 0; i < currentPoem.length; i++) {
    let span = createSpan(currentPoem.charAt(i));
    span.style('position: relative');
    span.style('color: rgba(0, 0, 0, 0)');
    paragraph.child(span);
  }
}
 * every state / poem needs an array for its playlist and its in & out cues
function poemSetup() {
  substringInOut = substringPlaylist[playlistIndex];
}
 * this is the guts of the interaction, called from each state
function poemInteract() {
  let children = selectAll('span', paragraph);
  if (substringIndex === 0) {
    substringIndex = substringInOut[0];
  }
  if (substringIndex === substringInOut[1]) {
    if (playlistIndex < substringPlaylist.length - 1) {
      playlistIndex++;
      for (let i = 0; i < children.length; i++) {
        children[i].style('color: rgba(0, 0, 0, 0)');
      }
      substringInOut = substringPlaylist[playlistIndex];
      substringIndex = substringInOut[0];
    } else {
      reveal = true;
    }
  }
  if (substringIndex >= substringInOut[0] && substringIndex < substringInOut[1]) {
    children[substringIndex].style('color: black');
  }
  if (autoPlay == true) {
      substringIndex++;
    }
  }
  if (reveal == true) {
      if (alphaValue < 1) {
        alphaValue += 0.01;
      } else {
        playlistIndex = 0;
        substringIndex = 0;
      }
    }
    for (let i = 0; i < children.length; i++) {
      children[i].style('color: rgba(0, 0, 0, ' + alphaValue + ')');
    }
  }
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    substringIndex++;
  } else if (keyCode === DOWN_ARROW) {
    substringIndex--;
  } else if (keyCode === RIGHT_ARROW) {
    if (autoPlay == true) {
      autoPlay = false;
    } else {
      autoPlay = true;
    }
  } else if (keyCode === 65) {
    stateTutorial();
  } else if (keyCode === 83) {
    stateDescribe();
  } else if (keyCode === 68) {
    stateIreland();
  } else if (keyCode === 70) {
    stateTitle();
  } else if (keyCode === 49) {
    state01();
  } else if (keyCode === 50) {
    state02();
  } else if (keyCode === 51) {
    state03();
  } else if (keyCode === 52) {
    state04();
  } else if (keyCode === 80) {
    state20();
  } else if (keyCode === 90) {
    createPoemCharRef();
  }
}
 * generate a text file that references each character in the poem to its index value
function createPoemCharRef() {
  let currentPoemCharRef = [];
  for (i = 0; i < currentPoem.length; i++) {
    currentPoemCharRef.push(currentPoem[i] + " - [" + i + "]");
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
function portClose() {
}
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
let portName = '/dev/cu.usbmodem1411';
let rotaryEncoder;
let rotaryButton = false;
let div;
let paragraph;
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
let substringPlaylist = [];
let alphaValue = 0;
let reveal = false;
let autoPlay = false;
 * P5 sketch setup function
function setup() {
  noCanvas();
  stateTutorial();
}
 * P5 sketch draw loop
function draw() {
  poemInteract();
}
    stateTutorial();
    state01();
    state02();
    state03();
    state04();
    state20();
      substringIndexIncrease();
      substringIndexDecrease();
    }
  }
}
function substringIndexIncrease() {
  substringIndex++;
}
function substringIndexDecrease() {
}
 * there's a state for every poem
function stateTutorial() {
  removeElements();
  currentPoem = tutorial;
  substringPlaylist = [
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}
function stateDescribe() {
  removeElements();
  currentPoem = describe;
  substringPlaylist = [
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}
function stateIreland() {
  removeElements();
  currentPoem = ireland;
  substringPlaylist = [
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}
function stateTitle() {
  removeElements();
  currentPoem = title;
  substringPlaylist = [
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}
function state01() {
  removeElements();
  currentPoem = poem01;
  substringPlaylist = [
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}
function state02() {
  removeElements();
  currentPoem = poem02;
  substringPlaylist = [
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}
function state03() {
  removeElements();
  currentPoem = poem03;
  substringPlaylist = [
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}
function state04() {
  removeElements();
  currentPoem = poem04;
  substringPlaylist = [
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}
function state20() {
  removeElements();
  currentPoem = poem20;
  substringPlaylist = [
  ];
  poemSetup();
  poemLayout();
  poemInteract();
}
 * every state / poem uses the same layout in p5.dom
function poemLayout() {
  div = createDiv();
  paragraph = createP();
  paragraph.style('font-size', '35px');
  paragraph.style('margin-top', '200px');
  paragraph.style('margin-right', '200px');
  paragraph.style('margin-left', '200px');
  for (let i = 0; i < currentPoem.length; i++) {
    let span = createSpan(currentPoem.charAt(i));
    span.style('position: relative');
    span.style('color: rgba(0, 0, 0, 0)');
    paragraph.child(span);
  }
}
 * every state / poem needs an array for its playlist and its in & out cues
function poemSetup() {
  substringInOut = substringPlaylist[playlistIndex];
}
 * this is the guts of the interaction, called from each state
function poemInteract() {
  let children = selectAll('span', paragraph);
  if (substringIndex === 0) {
    substringIndex = substringInOut[0];
  }
  if (substringIndex === substringInOut[1]) {
    if (playlistIndex < substringPlaylist.length - 1) {
      playlistIndex++;
      for (let i = 0; i < children.length; i++) {
        children[i].style('color: rgba(0, 0, 0, 0)');
      }
      substringInOut = substringPlaylist[playlistIndex];
      console.log('playlist index: ', playlistIndex);
      console.log('substring in & out:', substringInOut);
      substringIndex = substringInOut[0];
    } else {
      reveal = true;
    }
  }
  if (substringIndex >= substringInOut[0] && substringIndex < substringInOut[1]) {
    children[substringIndex].style('color: black');
  }
  if (autoPlay == true) {
      substringIndex++;
    }
  }
  if (reveal == true) {
      if (alphaValue < 1) {
        alphaValue += 0.01;
      } else {
        playlistIndex = 0;
        substringIndex = 0;
      }
    }
    for (let i = 0; i < children.length; i++) {
      children[i].style('color: rgba(0, 0, 0, ' + alphaValue + ')');
    }
  }
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    substringIndex++;
  } else if (keyCode === DOWN_ARROW) {
    substringIndex--;
  } else if (keyCode === RIGHT_ARROW) {
    if (autoPlay == true) {
      autoPlay = false;
    } else {
      autoPlay = true;
    }
  } else if (keyCode === 65) {
    stateTutorial();
  } else if (keyCode === 83) {
    stateDescribe();
  } else if (keyCode === 68) {
    stateIreland();
  } else if (keyCode === 70) {
    stateTitle();
  } else if (keyCode === 49) {
    state01();
  } else if (keyCode === 50) {
    state02();
  } else if (keyCode === 51) {
    state03();
  } else if (keyCode === 52) {
    state04();
  } else if (keyCode === 80) {
    state20();
  } else if (keyCode === 90) {
    createPoemCharRef();
  }
}
 * generate a text file that references each character in the poem to its index value
function createPoemCharRef() {
  let currentPoemCharRef = [];
  for (i = 0; i < currentPoem.length; i++) {
    currentPoemCharRef.push(currentPoem[i] + " - [" + i + "]");
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
function portClose() {
}
   Noah Pivnick
   Final Project, 2018 Fall
   Intro to Computational Media 2233.004 (Mimi Yin)
   Intro to Physical Computing 2301.003 (Tom Igoe)
   
   Acknowledgements:
   - Michael Joyce, friend and mentor, writer and poet, for sharing with me his collection of unpublished poems.
   - Giwon Park for help with code and urging me to use p5.dom
   - Brent Baily for helping me sort out logic that correctly iterated through the substring playlist
   - Ashley for walking through state machines with me
let portName = '/dev/cu.usbmodem1411';
let rotaryEncoder;
let rotaryButton = false;
let state = 01;
let paragraph;
let tutorial;
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
let substringPlaylist = [
];
let substringInOut = substringPlaylist[playlistIndex];
let alphaValue = 0;
let reveal = false;
let autoPlay = false;
 * P5 sketch setup function
function setup() {
  noCanvas();
  poemLayout();
}
 * P5 sketch draw loop
function draw() {
  poemInteract();
  
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
}
      substringIndexIncrease();
      substringIndexDecrease();
    }
  }
}
function substringIndexIncrease() {
  substringIndex++;
}
function substringIndexDecrease() {
}
 * there's a state for every poem
function state01() {
  currentPoem = poem01;
  substringPlaylist = [
  ];
  poemInteract();
}
function state02() {
  currentPoem = poem02;
  substringPlaylist = [
  ];
  poemInteract();
}
function state03() {
  currentPoem = poem03;
  substringPlaylist = [
  ];
  poemInteract();
}
function state04() {
  currentPoem = poem04;
  substringPlaylist = [
  ];
  poemInteract();
}
function state20() {
  currentPoem = poem20;
  substringPlaylist = [
  ];
  poemInteract();
}
 * every state / poem uses the same layout in p5.dom
function poemLayout () {
  paragraph = createP();
  paragraph.style('font-size', '35px');
  paragraph.style('margin-top', '200px');
  paragraph.style('margin-right', '200px');
  paragraph.style('margin-left', '200px');
  for (let i = 0; i < currentPoem.length; i++) {
    let span = createSpan(currentPoem.charAt(i));
    span.style('position: relative');
    span.style('color: rgba(0, 0, 0, 0)');
    paragraph.child(span);
  }
}
 * every state / poem needs an array for its playlist and its in & out cues
 * this is the guts of the interaction, called from each state
function poemInteract() {
  let children = selectAll('span', paragraph);
  if (substringIndex === 0) {
    substringIndex = substringInOut[0];
  }
  if (substringIndex === substringInOut[1]) {
    if (playlistIndex < substringPlaylist.length - 1) {
      playlistIndex++;
      for (let i = 0; i < children.length; i++) {
        children[i].style('color: rgba(0, 0, 0, 0)');
      }
      substringInOut = substringPlaylist[playlistIndex];
      console.log('playlist index: ', playlistIndex);
      console.log('substring in & out:', substringInOut);
      substringIndex = substringInOut[0];
    } else {
      reveal = true;
    }
  }
  if (substringIndex >= substringInOut[0] && substringIndex < substringInOut[1]) {
    children[substringIndex].style('color: black');
  }
  if (autoPlay == true) {
      substringIndex++;
    }
  }
  if (reveal == true) {
      if (alphaValue < 1) {
        alphaValue += 0.01;
      } else {
        playlistIndex = 0;
        substringIndex = 0;
      }
      console.log("alphaValue", alphaValue);
    }
    for (let i = 0; i < children.length; i++) {
      children[i].style('color: rgba(0, 0, 0, ' + alphaValue + ')');
    }
  }
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    substringIndex++;
  } else if (keyCode === DOWN_ARROW) {
    substringIndex--;
  } else if (keyCode === RIGHT_ARROW) {
    if (autoPlay == true) {
      autoPlay = false;
    } else {
      autoPlay = true;
    }
  } else if (keyCode === 49) {
    state01();
  } else if (keyCode === 50) {
    state02();
  } else if (keyCode === 51) {
    state03();
  } else if (keyCode === 52) {
    state04();
  } else if (keyCode === 80) {
    state20();
  } else if (keyCode === 90) {
    createPoemCharRef();
  }
}
 * generate a text file that references each character in the poem to its index value
function createPoemCharRef() {
  let currentPoemCharRef = [];
  for (i = 0; i < currentPoem.length; i++) {
    currentPoemCharRef.push(currentPoem[i] + " - [" + i + "]");
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
function portClose() {
}
   Noah Pivnick
   Final Project, 2018 Fall
   Intro to Computational Media 2233.004 (Mimi Yin)
   Intro to Physical Computing 2301.003 (Tom Igoe)
   
   Acknowledgements:
   - Michael Joyce, friend and mentor, writer and poet, for sharing with me his collection of unpublished poems.
   - Giwon Park for help with code and urging me to use p5.dom
   - Brent Baily for helping me sort out logic that correctly iterated through the substring playlist
let portName = '/dev/cu.usbmodem1411';
let previousState = 0;
let poem20 = "But you see it does not end, the living, even when the story has been lived and told; do you want to know what has happened to the birds upon the sill or the vagrant cat? Of course not, they remain there where they were left as well as where they first appeared, the shadow of the thing an equal to the thing itself under certain circumstance. And who she is now they have wiped from the tiny bathroom mirror just beyond the bed where she greeted it each morning and bid it good night when the corridor lights dimmed. Or perhaps not, perhaps he goes on breathing Bach while she knits beside the bed although in truth she has never seen much sense in it, the knitting, liking nonetheless the code of it, K on RS, P on WS, P5, turn, sl 1, K1, psso, K1, K2tog, turn, and so on as if the world’s purpose (this the apple tree pattern for a baby’s blanket) were a song.";
let currentPoem = poem20
let substringPlaylist = [
];
let substringInOut = substringPlaylist[playlistIndex];
let paragraph;
let autoPlay = false;
function setup() {
  noCanvas();
  paragraph = createP();
  paragraph.style('font-size', '35px');
  paragraph.style('margin-top', '100px');
  paragraph.style('margin-bottom', '100px');
  paragraph.style('margin-right', '600px');
  paragraph.style('margin-left', '600px');
  for (let i = 0; i < currentPoem.length; i++) {
    let span = createSpan(currentPoem.charAt(i));
    span.style('position: relative');
    span.style('color: rgba(0, 0, 0, 0)');
    paragraph.child(span);
  }
}
let alphaValue = 0;
let reveal = false;
function draw() {
  let children = selectAll('span', paragraph);
  if (substringIndex === 0) {
    substringIndex = substringInOut[0];
  }
  if (substringIndex === substringInOut[1]) {
    if (playlistIndex < substringPlaylist.length - 1) {
      playlistIndex++;
      for (let i = 0; i < children.length; i++) {
        children[i].style('color: rgba(0, 0, 0, 0)');
      }
      substringInOut = substringPlaylist[playlistIndex];
      console.log('playlist index: ', playlistIndex);
      console.log('substring in & out:', substringInOut);
      substringIndex = substringInOut[0];
    } else {
      reveal = true;
    }
  }
  if (substringIndex >= substringInOut[0] && substringIndex < substringInOut[1]) {
    children[substringIndex].style('color: black');
  }
  if (autoPlay == true) {
      substringIndex++;
    }
  }
  if (reveal == true) {
      
      if(alphaValue < 1){
        	alphaValue += 0.01;
      }
      else{
        playlistIndex = 0;
        substringIndex = 0;
      }
      console.log("alphaValue", alphaValue);
    }
    for (let i = 0; i < children.length; i++) {
      children[i].style('color: rgba(0, 0, 0, ' + alphaValue + ')');
    }
  }
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    substringIndex++;
  } else if (keyCode === DOWN_ARROW) {
    substringIndex--;
  } else if (keyCode === RIGHT_ARROW) {
    if (autoPlay == true) {
      autoPlay = false;
    } else {
      autoPlay = true;
    }
  }
}
  for (var i = 0; i < portList.length; i++) {
  }
}
function serverConnected() {
}
function portOpen() {
}
      myFuncIncr();
      myFuncDecr();
    }
  }
}
function myFuncIncr() {
  substringIndex++;
}
function myFuncDecr() {}
}
function portClose() {
}
   Noah Pivnick
   Final Project, 2018 Fall
   Intro to Computational Media 2233.004 (Mimi Yin)
   Intro to Physical Computing 2301.003 (Tom Igoe)
   
   Acknowledgements:
   - Giwon Park helped me put together a first pass using text() and urged me to use p5.dom instead
   - Brent Baily helped me sort out logic that correctly itterated through the substring playlist
   - Mimi Yin patiently helped me wrap my head around the project's computational requirements
let portName = '/dev/cu.usbmodem1411';
let previousState = 0;
let poem20 = "But you see it does not end, the living, even when the story has been lived and told; do you want to know what has happened to the birds upon the sill or the vagrant cat? Of course not, they remain there where they were left as well as where they first appeared, the shadow of the thing an equal to the thing itself under certain circumstance. And who she is now they have wiped from the tiny bathroom mirror just beyond the bed where she greeted it each morning and bid it good night when the corridor lights dimmed. Or perhaps not, perhaps he goes on breathing Bach while she knits beside the bed although in truth she has never seen much sense in it, the knitting, liking nonetheless the code of it, K on RS, P on WS, P5, turn, sl 1, K1, psso, K1, K2tog, turn, and so on as if the world’s purpose (this the apple tree pattern for a baby’s blanket) were a song.";
let currentPoem = poem20
let substringPlaylist = [
];
let substringInOut = substringPlaylist[playlistIndex];
let paragraph;
let autoPlay = false;
function setup() {
  noCanvas();
  paragraph = createP();
  paragraph.style('font-size', '35px');
  paragraph.style('margin-top', '100px');
  paragraph.style('margin-bottom', '100px');
  paragraph.style('margin-right', '600px');
  paragraph.style('margin-left', '600px');
  for (let i = 0; i < currentPoem.length; i++) {
    let span = createSpan(currentPoem.charAt(i));
    span.style('position: relative');
    span.style('color: rgba(0, 0, 0, 0)');
    paragraph.child(span);
  }
}
function draw() {
  let children = selectAll('span', paragraph);
  if (substringIndex === 0) {
    substringIndex = substringInOut[0];
  }
  if (substringIndex === substringInOut[1]) {
    if (playlistIndex < substringPlaylist.length - 1) {
      playlistIndex++;
      for (let i = 0; i < children.length; i++) {
        children[i].style('color: rgba(0, 0, 0, 0)');
      }
      substringInOut = substringPlaylist[playlistIndex];
      console.log('playlist index: ', playlistIndex);
      console.log('substring in & out:', substringInOut);
      substringIndex = substringInOut[0];
    } else {
      for (let i = 0; i < children.length; i++) {
        children[i].style('color: black');
      }
    }
  }
  if (substringIndex >= substringInOut[0] && substringIndex < substringInOut[1]) {
    children[substringIndex].style('color: black');
  }
  if (autoPlay == true) {
    if (frameCount % 4 == 0) {
      substringIndex++;
    }
  }
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    substringIndex++;
  } else if (keyCode === DOWN_ARROW) {
    substringIndex--;
  } else if (keyCode === RIGHT_ARROW) {
    if (autoPlay == true) {
      autoPlay = false;
    } else {
      autoPlay = true;
    }
  }
}
  for (var i = 0; i < portList.length; i++) {
  }
}
function serverConnected() {
}
function portOpen() {
}
      myFuncIncr();
      myFuncDecr();
    }
  }
}
function myFuncIncr() {
  substringIndex++;
}
function myFuncDecr() {}
}
function portClose() {
}
let poem20 = "But you see it does not end, the living, even when the story has been lived and told; do you want to know what has happened to the birds upon the sill or the vagrant cat? Of course not, they remain there where they were left as well as where they first appeared, the shadow of the thing an equal to the thing itself under certain circumstance. And who she is now they have wiped from the tiny bathroom mirror just beyond the bed where she greeted it each morning and bid it good night when the corridor lights dimmed. Or perhaps not, perhaps he goes on breathing Bach while she knits beside the bed although in truth she has never seen much sense in it, the knitting, liking nonetheless the code of it, K on RS, P on WS, P5, turn, sl 1, K1, psso, K1, K2tog, turn, and so on as if the world’s purpose (this the apple tree pattern for a baby’s blanket) were a song.";
let paragraph;
let poemInOut = [
];
let subIndex = 0;
let inout = poemInOut[primaryIndex];
function setup() {
  noCanvas();
  currentPoem = poem20
  let currentPoemCharAndIndex = [];
  for (i = 0; i < currentPoem.length; i++) {
    currentPoemCharAndIndex.push(currentPoem[i] + " - [" + i + "]");
  }
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
  if (subIndex === inout[1]) {
    if (primaryIndex < poemInOut.length - 1) {
      primaryIndex++;
      for (let i = 0; i < children.length; i++) {
        children[i].style('color: rgba(0, 0, 0, 0.05)');
      }
      inout = poemInOut[primaryIndex];
      console.log('primary index: ', primaryIndex);
      console.log('inout:', inout);
      subIndex = inout[0];
    } else {
      for (let i = 0; i < children.length; i++) {
        children[i].style('color: black');
      }
    }
  }
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
let srcText = "But you see it does not end, the living, even when the story has been lived and told; do you want to know what has happened to the birds upon the sill or the vagrant cat? Of course not, they remain there where they were left as well as where they first appeared, the shadow of the thing an equal to the thing itself under certain circumstance. And who she is now they have wiped from the tiny bathroom mirror just beyond the bed where she greeted it each morning and bid it good night when the corridor lights dimmed. Or perhaps not, perhaps he goes on breathing Bach while she knits beside the bed although in truth she has never seen much sense in it, the knitting, liking nonetheless the code of it, K on RS, P on WS, P5, turn, sl 1, K1, psso, K1, K2tog, turn, and so on as if the world’s purpose (this the apple tree pattern for a baby’s blanket) were a song.";
let paragraph;
let poemInOut = [
];
function setup() {
  noCanvas();
  currentPoem = srcText
  let currentPoemCharAndIndex = [];
  for (i = 0; i < currentPoem.length; i++) {
    currentPoemCharAndIndex.push(currentPoem[i] + " - [" + i + "]");
  }
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
function setup() {
  createCanvas(800, 800);
  crankButtonBwrd = createButton('Backward');
  crankButtonBwrd.mousePressed(crankBwrd);
  crankButtonFwrd = createButton('Forward');
  crankButtonFwrd.mousePressed(crankFwrd);
}
function draw() {
  background(colorPage);
  fill(textColorHide);
  textSize(30);
  text(poem20, 50, 50, 700, 700);
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
    }
  }
}
function crankFwrd() {
  currentCrankCount += 1;
}
function crankBwrd() {
  currentCrankCount -= 1;
}
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
function setup() {
  createCanvas(800, 800);
  crankButtonBwrd = createButton('Backward');
  crankButtonBwrd.mousePressed(crankBwrd);
  crankButtonFwrd = createButton('Forward');
  crankButtonFwrd.mousePressed(crankFwrd);
}
function draw() {
  background(colorPage);
  fill(textColorHide);
  textSize(30);
  text(poem20, 50, 50, 700, 700);
  
  for (let i = 0; i < poem20.length; i++) {
    if (textOriginX >= 700) {
      textOriginX = 50;
      textOriginY2 += textLeadingSize;
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
    }
  }
}
function crankFwrd() {
  currentCrankCount += 1;
}
function crankBwrd() {
  currentCrankCount -= 1;
let portName = '/dev/cu.usbmodemXXXX';
let currentCrankCount = 0;
let currentPoemSubstringPlaylist = [];
let colorPage = 245;
let colorTextHide = 200;
let colorTextShow = 0;
let poem20 = "But you see it does not end, the living, even when the story has been lived and told; do you want to know what has happened to the birds upon the sill or the vagrant cat? Of course not, they remain there where they were left as well as where they first appeared, the shadow of the thing an equal to the thing itself under certain circumstance. And who she is now they have wiped from the tiny bathroom mirror just beyond the bed where she greeted it each morning and bid it good night when the corridor lights dimmed. Or perhaps not, perhaps he goes on breathing Bach while she knits beside the bed although in truth she has never seen much sense in it, the knitting, liking nonetheless the code of it, K on RS, P on WS, P5, turn, sl 1, K1, psso, K1, K2tog, turn, and so on as if the world’s purpose (this the apple tree pattern for a baby’s blanket) were a song.";
function preload() {
  currentPoem = loadStrings('text/20.txt');
}
function setup() {
  noCanvas();
}
function draw() {
  background(colorPage);
}
function crankFwd() {
  currentCrankCount += 1;
}
function crankBwd() {
  currentCrankCount -= 1;
}
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    crankFwd();
    
  } else if (keyCode === LEFT_ARROW) {
    crankBwd();
  
  }
let poem = "this is a poem. not really. maybe."
let paragraph;
let composedJson = [];
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
}
function draw() {
  currFrame = frames[currFrameCount];
  
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
  renderedHTML = poem.substring(0, currFrame.substrings[0].startIndex) +
    '<span id="show">' +
    poem.substring(startIndex, endIndex) +
    '</span>' +
    poem.substring(endIndex, poem.length - 1);
  paragraph.html(renderedHTML);
}
function keyReleased() {
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
    }
  }
}
function crankFwrd() {
  currentCrankCount += 1;
}
function crankBwrd() {
  currentCrankCount -= 1;
let feedback = true;
function setup() {
  createCanvas(640, 360);
  webCam = createCapture();
  webCam.size(640, 360);
  webCam.hide();
  pixelDensity(1);
  noStroke();
  fill(0);
  webMic = new p5.AudioIn();
  webMic.start();
  feedbackButton = createButton('Gimmie Some Feedback!');
  feedbackButton.mousePressed(toggleMicInput);
}
function draw() {
  background(200);
  webCam.loadPixels();
  let stepSize = round(map(webMic.getLevel(), 0, 0.5, 8, 256));
  for (let y = 0; y < webCam.height; y += stepSize) {
    for (let x = 0; x < webCam.width; x += stepSize) {
      let i = y * webCam.width + x;
      let darkness = (255 - webCam.pixels[i * 4]) / 255;
      let radius = stepSize * darkness;
      ellipse(x, y, radius);
    }
  }
}
function toggleMicInput() {
  if (feedback == false) {
    webMic.stop();
    feedbackButton.html('Gimmie Some Feedback!');
  } else {
    webMic.start();
    feedbackButton.html('Stop The Madness!');
  }
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
  let seriously = new Seriously();
  let src = seriously.source('#p5video');
  let target = seriously.target('#p5canvas');
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
        
Based on Cities example.
function preload() {
  data = loadTable("insurance.csv", "header");
}
function setup() {
  createCanvas(480, 120);
  fill(255, 150);
  noStroke();
  
  let rowCount = data.getRowCount();
  for (let i = 0; i < rowCount; i++) {
    premiums[i] = data.getNum(i, 1);
  }
}
function draw() {
  background(220);
  stroke(153);
  line(20, 100, 20, 20);
  line(20, 100, 460, 100);
  
  for (let i = 0; i < data.getRowCount(); i++) {
    let x = map(i, 0, data.length - 1, 20, 460);
    line(x, 20, x, 100);
    
  }
  noFill();
  stroke();
  beginShape();
  for (let j = 0; j < premiums.length; j++) {
    let x = map(j, 0, premiums.length - 1, 20, 460);
    let y = map(premiums[i], 0, 60, 100, 20);
    vertex(x, y);
    
  }
}
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
Based on Ortiz example.
let padding = 50;
function preload() {
  data = loadTable("insurance.csv", "header");
}
function setup() {
  createCanvas(700, 350);
  let rowCount = data.getRowCount();
  for (let i = 0; i < rowCount; i++) {
    premiums[i] = data.getNum(i, "total");
  }
}
function draw() {
  background(255);
  stroke(153);
  strokeWeight(1);
  line(padding, padding, padding, height - padding);
  line(padding, height - padding, width - padding, height - padding);
  for (let i = 0; i < premiums.length; i++) {
    let x = map(i, 0, premiums.length - 1, width - padding, padding);
    line(x, padding, x, height - padding);
  }
  fill(1);
  stroke(0);
  strokeWeight(3);
  
  beginShape();
  for (let j = 0; j < premiums.length; j++) {
    let graph_x = map(j, 0, premiums.length - 1, padding, width - padding);
    let graph_y = map(premiums[j], 0, max(premiums), height - padding, padding);
    vertex(graph_x, graph_y);
  }
  
  endShape();
  Anna Oh and Noah Pivnick
  PhysComp 2301.003
  Halloween Midterm
Instructions to run this sketch on a localhost using two browser 
windows one of which is fullcreen on an external monitor
- Save sketch in P5 web editor
- P5 web editor » File menu » Download sketch files to Desktop
- Change directory name to "halloween"
- Connect external monitor
- System Preferences » Displays » Arrangement » turn mirroring *off*
- Open Terminal
- $ cd ./halloween
- $ python -m SimpleHTTPServer
- Push one Chrome window to external display and make fullscreen (Cmd+Shift+F )
let portName = '/dev/cu.usbmodem1411';
let coffins = [];
let coffinsIndex = 0;
let coffinImage;
function preload() {
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
}
function draw() {
  background(0);
  coffinImage = coffins[coffinsIndex];
  image(coffinImage, 0, 0);
}
    coffinsIndex++;
    if (coffinsIndex > coffins.length - 1) {
      coffinsIndex = 0;
    }
    
  }
}
  The functions below are used as console diagnostics
  for (var i = 0; i < portList.length; i++) {
  }
}
function serverConnected() {
}
function portOpen() {
}
}
function portClose() {
}
  Anna Oh and Noah Pivnick
  PhysComp 2301.003
  Halloween Midterm
Instructions to run this sketch on a localhost on an external monitor
- If not, edit
- Save sketch in P5 web editor
- Save sketch files to Destop using File menu » Download
- Change sketch file directory name to "halloween"
- Open Terminal
- $ cd ./halloween
- $ python -m SimpleHTTPServer
- Push one Chrome window to external display and make fullscreen (Cmd+Shift+F )
let portName = '/dev/cu.usbmodem1411';
let coffins = [];
let coffinsIndex = 0;
let coffinImage;
function preload() {
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
}
function draw() {
  background(0);
  coffinImage = coffins[coffinsIndex];
  image(coffinImage, 0, 0);
}
    coffinsIndex++;
    if (coffinsIndex > coffins.length - 1) {
      coffinsIndex = 0;
    }
    
  }
}
  The functions below are used as console diagnostics
  for (var i = 0; i < portList.length; i++) {
  }
}
function serverConnected() {
}
function portOpen() {
}
}
function portClose() {
}
  Anna Oh and Noah Pivnick
  PhysComp 2301.003
  Halloween Midterm
  Arduino sketch: <url>
let portName = '/dev/cu.usbmodem1431';
let inData;
let buttonCount = 0;
let currentImage;
let imgOne, imgThree;
let imgTwo = [];
let imgTwoIndex = 0;
function preload() {
  imgOne = loadImage("images/GraveBlank.jpg");
  imgTwo[0] = loadImage("images/0.jpg");
  imgThree = loadImage("images/GraveLetmepeace.jpg");
}
function setup() {
  createCanvas(1080, 1920);
}
function draw() {
  background(0);
  if (buttonCount % 3 == 0) {
    currentImage = imgOne;
  } else if (buttonCount % 3 == 1) {
    currentImage = imgTwo[imgTwoIndex];
  } else {
    imgTwoIndex++;
    if (imgTwoIndex > imgTwo.length - 1) {
      imgTwoIndex = 0;
    }
    currentImage = imgThree;
  }
  image(currentImage, 0, 0);
}
  if (inData == 0) {
    buttonCount++;
  }
}
  The functions below are used as console diagnostics
  for (var i = 0; i < portList.length; i++) {
  }
}
function serverConnected() {
}
function portOpen() {
}
}
function portClose() {
let text;
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
  createCanvas(windowWidth, windowHeight);
  jonahsMug = createImg('./assets/IMG_0059.jpg');
}
function draw() {
  background(150);
  jonahsMug.position(mouseX, mouseY);
}
  createCanvas(400, 400);
}
function draw() {
  background(220);
Noah Pivnick
Intro to Computational Media: Week 5
4. CHALLENGE: Create 100 bouncing balls. Delete them if they collide with each other.
let balls = [];
let numBalls = 100;
function setup() {
  createCanvas(400, 400);
  let ballColor = color(random(255), random(255), random(255))
  for (let i = 0; i < numBalls; i++) {
    let ball = new Ball(random(width), random(height), random(10, 50), ballColor, random(-5, 5), random(-5, 5));
    balls.push(ball);
  }
}
function draw() {
  background(220);
  for (let i = 0; i < balls.length; i++) {
    balls[i].run();
    
    for (let j = i; j < balls.length; j++) {
      
      if (i != j && balls[i].touch(balls[j].ballPositionX, balls[j].ballPositionY, balls[j].ballRadius) == true) {
        if (balls[i].ballRadius > balls[j].ballRadius) {
          balls.splice(j, 1);
          
        } else {
          
          balls.splice(i, 1);
          
        }
      }
    }
  }
Noah Pivnick
Intro to Computational Media: Week 5
4. CHALLENGE: Create 100 bouncing balls. Delete them if they collide with each other.
let balls = [];
function setup() {
  createCanvas(400, 400);
  let ballColor = color(random(255), random(255), random(255))
  for (let i = 0; i < 5; i++) {
    let ball = new Ball(random(width), random(height), random(10, 50), ballColor, random(-5, 5), random(-5, 5));
    balls.push(ball);
  }
}
function draw() {
  background(220);
  
  for (let i = 0; i < balls.length; i++) {
    balls[i].run();
    if (balls[i].touch(mouseX, mouseY) == true) {
      balls.splice(i, 1);
    }
  }
Noah Pivnick
Intro to Computational Media: Week 5
3. Create 100 bouncing balls. Delete them by mousing over them.
let balls = [];
function setup() {
  createCanvas(400, 400);
  let ballColor = color(random(255), random(255), random(255))
  for (let i = 0; i < 100; i++) {
    let ball = new Ball(random(width), random(height), random(10, 50), ballColor, random(-5, 5), random(-5, 5));
    balls.push(ball);
  }
}
function draw() {
  background(220);
  
  for (let i = 0; i < balls.length; i++) {
    balls[i].run();
    if (balls[i].touch(mouseX, mouseY) == true) {
      balls.splice(i, 1);
    }
  }
Noah Pivnick
Intro to Computational Media: Week 5
2. Create bouncing balls by clicking the mouse.
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
Noah Pivnick
Intro to Computational Media: Week 5
1. Create and use an add() function that takes 2 numbers and adds them together.
function setup() {
  createCanvas(400, 400);
  let numOne = int(random(100));
  let numTwo = int(random(100));
  add(numOne, numTwo);
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
function setup() {
  createCanvas(600, 400);
  let numberBalloons = 10;
  for (let i = 0; i < numberBalloons; i++) {
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
}
function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, 250, 125);
  slider.position(width * 0.5, height * 0.90);
}
function draw() {
  background(220);
  let circleSize = slider.value();
  ellipse(width * 0.5, height * 0.5, circleSize)
  
function setup() {
  createCanvas(600, 400);
  let numberBalloons = 10;
  for (let i = 0; i < numberBalloons; i++) {
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
}
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
}
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
    noStroke();
    fill('white');
    ellipse(random(width), random(height), 5, 5);
}let shapeSpacing = 50;
let shapeSize = 25;
function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}
function draw() {
  background(220);
  ellipse(shapeSpacing, height * 0.5, shapeSize, shapeSize);
  rect(shapeSpacing * 2, height * 0.5, shapeSize, shapeSize);
  ellipse(shapeSpacing * 3, height * 0.5, shapeSize, shapeSize);
  rect(shapeSpacing * 4, height * 0.5, shapeSize, shapeSize);
  ellipse(shapeSpacing * 5, height * 0.5, shapeSize, shapeSize);
  rect(shapeSpacing * 6, height * 0.5, shapeSize, shapeSize);
  ellipse(shapeSpacing * 7, height * 0.5, shapeSize, shapeSize);
  ellipse(width * 0.5, shapeSpacing, shapeSize, shapeSize);
  rect(width * 0.5, shapeSpacing * 2, shapeSize, shapeSize);
  ellipse(width * 0.5, shapeSpacing * 3, shapeSize, shapeSize);
  rect(width * 0.5, shapeSpacing * 4, shapeSize, shapeSize);
  ellipse(width * 0.5, shapeSpacing * 5, shapeSize, shapeSize);
  rect(width * 0.5, shapeSpacing * 6, shapeSize, shapeSize);
  ellipse(width * 0.5, shapeSpacing * 7, shapeSize, shapeSize);
function setup() {
  createCanvas(720, 480);
  strokeWeight(2);
  ellipseMode(RADIUS);
}
function draw() {
  background(204);
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
  
  point(0 + 10, 0 + 10);
  point(width - 10, 0 + 10);
  point(0 + 10, height - 10);
  point(width - 10, height - 10);
  
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
  translate(positionX, positionY)
  stroke('white');
  line(0, 0 + balloonHeight * 0.5, 0, 0 + 150);
  noStroke();
  fill('red');
  ellipse(0, 0, balloonWidth, balloonHeight);
  triangle(0, 0 + balloonHeight * 0.5, 0 + 5, balloonHeight * 0.5 + 5, 0 - 5, balloonHeight * 0.5 + 5);
}
function balloonPop() {
  if (mouseIsPressed === true) {
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
  
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  if (mouseX > 0 && mouseX < width / 3) {
    noStroke();
    fill('red');
    rect(0, 0, width / 3, height);
  }
  if (mouseX > (width / 3) && mouseX < 2 * width / 3) {
    fill('red');
    noStroke();
    rect(width / 3, 0, width / 3, height);
  }
  if (mouseX > (2 * width / 3) && mouseX < width) {
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
  skyBlue = map(sunHeight, height, 0, 0, 255);
  for (starLatitude = 0; starLatitude < width; starLatitude += random(width)) {
    for (starLongitude = 0; starLongitude < height; starLongitude += random(height)) {
      noStroke();
      fill(255);
      ellipse(starLatitude, starLongitude, 5, 5);
    }
  }
  noStroke();
  fill(255, 255, 0);
  ellipseMode(CENTER);
  ellipse(50, sunHeight, 50, 50);
  sunHeight -= sunSpeed;
  if (sunHeight < 0 || sunHeight > height) sunSpeed *= -1;
  noStroke();
  fill(0, earthGreen, 0);
  rect(0, 320, height, 100)
  earthGreen = map(sunHeight, height, 0, 0, 255);
  noStroke();
  fill(0);
  triangle(150, 220, 200, 200, 250, 220);
  noStroke();
  fill(0);
  triangle(185, 250, 215, 250, 200, 225);
  noStroke();
  fill(0);
  triangle(175, 250, 200, 290, 225, 250);
  noStroke();
  fill(0);
  ellipse(170, 165, 10, 10);
  noStroke();
  fill(0);
  ellipse(225, 165, 10, 10);
  stroke(0);
  strokeWeight(3);
  fill(lensTint, 125);
  rect(140, 145, 45, 30, 5, 5, 20, 20);
  stroke(0);
  strokeWeight(3)
  fill(lensTint, 125);
  rect(210, 145, 45, 30, 5, 5, 20, 20);
  push();
  lensTint = map(sunHeight, 100, 0, 255, 0);
  lensTint = lensTint + 1;
  let fastButtonX = 335;
  let fastButtonY = 335;
  let fastButtonWidth = 50;
  let fastButtonHeight = 50;
  push();
  noStroke();
  fill('red');
  if ((mouseX > fastButtonX) && (mouseX < fastButtonX + fastButtonWidth) && (mouseY > fastButtonY) && (mouseY < fastButtonY + fastButtonHeight)) {
    fill(125);
    if (mouseIsPressed) {
      sunSpeed = sunSpeed * -1
    }
  }
  rect(fastButtonX, fastButtonY, fastButtonWidth, fastButtonHeight);
  pop();
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  
  
let xPosition;
let xSpeed = 10;
function setup() {
  createCanvas(400, 400);
  xPosition = 0;
}
function draw() {
  background(220);
  ellipse(xPosition, width/2, 50, 50);
  
  
}
  createCanvas(400, 400);
}
function draw() {
  background(220);
}
let speed_y = 0;
function setup() {
  createCanvas(400, 600);
  position = height;
}
function draw() {
  background(220);
  ellipse(width/2, position, 50, 50)
  position-=speed_y
  speed_y = (y-mouseY) / 100;
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
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  ellipseMode(CENTER);
  ellipse(circleToLeft.x, circleToLeft.y, circleToLeft.size, circleToLeft.size);
  circleToLeft.y = circleToLeft.y + circleToLeft.speed;
  
  ellipse(circleToRight.x, circleToRight.y, circleToRight.size, circleToRight.size);
  circleToRight.x = circleToRight.x + circleToRight.speed;
  ellipse(circleToTopLeft.x, circleToTopLeft.y, circleToTopLeft.size, circleToTopLeft.size);
  circleToTopLeft.x = circleToTopLeft.x + circleToTopLeft.speed;
  circleToTopLeft.y = circleToTopLeft.y + circleToTopLeft.speed;
  
  
  
  
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
  x = width/2;
  rectMode(CENTER);
} 
function draw() {
  
  rect(x, 300, 100, 100);
  console.log(width);
  
}let sunHeight = 400
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
  noStroke();
  fill(255, 255, 0);
  ellipseMode(CENTER);
  ellipse(50, sunHeight, 50, 50);
  
 
  sunHeight = sunHeight - 1;
  
  noStroke();
  fill(0, earthGreen, 0);
  rect(0, 350, height, 100)
  noStroke();
  fill(0);
  triangle(150, 250, 200, 230, 250, 250);
  noStroke();
  fill(0);
  triangle(185, 280, 215, 280, 200, 255);
  noStroke();
  fill(0);
  triangle(175, 280, 200, 320, 225, 280);
  noStroke();
  fill(0);
  ellipse(170, 195, 10, 10);
  noStroke();
  fill(0);
  ellipse(225, 195, 10, 10);
  stroke(0);
  strokeWeight(3);
  fill(lensTint, 125);
  rect(140, 175, 45, 30, 5, 5, 20, 20);
  stroke(0);
  strokeWeight(3)
  fill(lensTint, 125);
  rect(210, 175, 45, 30, 5, 5, 20, 20);
  lensTint = map(sunHeight, 100, 0, 255, 0);
  lensTint = lensTint + 1;
  skyBlue = map(sunHeight, height, 0, 0, 255);
  earthGreen = map(sunHeight, height, 0, 0, 255);
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      sunHeight = random(400, 0);
    }
  }
}let ratio;
function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}
function draw() {
  background(220);
  ratio = 0.5
  noStroke();
  fill(150);
  rect(width * ratio, height * ratio, width * ratio, height * ratio);
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
  background(0, 255, 255);
  stroke(255, 0, 0);
  strokeWeight(35);
  line(0, 0, 500, 400);
  noStroke();
  fill(0, 200, 0);
  ellipse(250, 200, 250, 180);
  noStroke();
  fill(0, 0, 200);
  rect(340, 160, 35, 35);
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  noStroke();
  fill(0, 255, 255);
  ellipse(200, 200, 100, 100);
}function setup() { 
} 
function draw() { 
  background(220);
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(205, 205, 255);
  
  noStroke();
  fill(0);
  triangle(150, 250, 200, 230, 250, 250);
  noStroke();
  fill(0);
  triangle(185, 280, 215, 280, 200, 255);
  noStroke();
  fill(0);
  triangle(175, 280, 200, 320, 225, 280);
  
  stroke(10);
  noFill();
  rect(140, 175, 45, 30);
  noFill();
  rect(210, 175, 45, 30);
  fill(0);
  ellipse(170, 195, 10, 10);
  fill(0);
  ellipse(225, 195, 10, 10);
ml5 Example
Image Classification using Feature Extraction with MobileNet. Built with p5.js
let featureExtractor;
let classifier;
let video;
let loss;
let dogImages = 0;
let catImages = 0;
function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.parent('videoContainer');
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  classifier = featureExtractor.classification(video);
  createButtons();
}
function modelReady() {
  select('#loading').html('Base Model (MobileNet) loaded!');
}
function addImage(label) {
  classifier.addImage(label);
}
function classify() {
  classifier.classify(gotResults);
}
function createButtons() {
  buttonA = select('#catButton');
  buttonA.mousePressed(function() {
    addImage('cat');
    select('#amountOfCatImages').html(catImages++);
  });
  buttonB = select('#dogButton');
  buttonB.mousePressed(function() {
    addImage('dog');
    select('#amountOfDogImages').html(dogImages++);
  });
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
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);
}
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
  strokeWeight(1);
  noFill(0);
  ellipse(125, height/2, 100, 100);
  ellipse(250, height/2, 100, 100);
  triangle(160, 130, 230, 130, 250, height/2);
  fill(0, 0, 0);
  strokeWeight(2);
}