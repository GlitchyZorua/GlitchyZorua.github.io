const placeholders = [  
  "Search...", 
  "RetroJCity", 
  "Windows 93", 
  "Is the internet working?",
  "based.cooking",
  "Crabby patty secret formula.",
  "Is today tommorrow New Zealand?",
  "Song that goes meow meow meow meow meow meow meow meow meow meow meow meow",
  "Heg hog cute",
  "Why farts smell?",
  "Where to buy pet russian dolpin?",
  "Why do MY farts smell?",
  "Recipe only using crackers",
  "Is it your or you're?",
  "Do islands have anchors?",
  "Can I use my toilet as a toaster?",
  "2 + 2 = 5",
  "Year 2000 problem",
  "Year 2038 problem",
  "Neocities",
  "Melonland Forums",
  "before:2007",
  "Look up trending topics",
  "Search tutorials...",
  "Find restaurants near me",
  "Search for cats...",
  "Look up recipes...",
  "Find coding tutorials...",
  "Explore space facts...",
  "Discover music...",
  "Chuck E Cheese Public Freakout",
  "DO NOT REDEEM!!!!",
  "dead internet theory",
  "Windows XP Gangster Edition",
  "Wake up Neo...The Matrix has you...",
  "Tourettes Guy Funniest Moments",
  "Nathan's toasty tech",
  "Funny vines",
  "Can you use a Neo Geo cartridge in a Super Famicom Box",
  "Is DOOM playable on the Phillips CD-i",
  "Me at the zoo",
  "google",
  "Google",
  "HEYYEYAAEYAAAEYAEYAA",
  "where is google.com",
  "what da dog doin?",
  "What to name Sourdough starter?",
  "Can you train a plane?",
  "help i accidently summoned a lemon",
  "future gen. consels wii2 ps4 xbox720?",
  "Are aliens real?",
  "Is the tooth fairy real?",
  "Why do men have nipples?",
  "Why are we here?",
  "is my bird gay?",
  "why do my eyes wrinkle?",
  "who wrote the bible?",
  "Does farting burn calories?",
  "Where is the ANY key on my keyboard?",
  "How to open a door?",
  "How to breath?",
  "how to get rid of 7,000 pigeons fast",
  "cat videos",
  "Twink Elon Musk",
  "How to get robucks big free working 2026",
  "Bing",
  "xkcd comics",
  "How to summon a lemon?",
  "How to summon a line?",
  "How to summon a orange?",
  "Does farting burn calories?",
  "Mozilla Firefox",
  "Ablaze Floorp",
  "how to get crispy edges on uranium-172",
  "Adopt a pet rock",
  "Why is my PC melting?",
  "How do I eat air?",
  "How do I drink air?",
  "Game Genie",
  "Skype Sounds Song Remix",
  "WebTV Redialed",
  "Never gonna give you up by Rick Astley",
  "Wikipedia",
  "Yahoo!",
  "google.com",
  "googol",
  "Why is the sky blue?",
  "how 2 remove a virus",
  "bonzi buddy download free",
  "what happens if you delete system32",
  "half life 3 release date",
  "skrillex scay onster an nice sprites midi",
  "john cena midi legit not converted",
  "Why do we exist?",
  "Myspace",
  "Digg",
  "List of english words containing Q not followed by U",
  "List of animals displaying homosexual behavior",
  "List of organisms named after famous people",
  "List of U.S. state dinosaurs",
  "List of pigs",
  "List of inventors killed by their own inventions",
  "List of people who died on the toilet",
  "List of school pranks",
  "List of fictional colors",
  //"List of films that frequently use the word \"fuck\"",
  "List of silent musical compositions",
  "List of Kim Jong-il's titles",
  "List of people who have lived in airports",
  "List of UFO religions",
  "List of people claimed to be Jesus",
  "List of cats",
  "List of lists of lists",
  "Bill Gates' flower fly",
  "Neopalpa donaldtrumpi",
  "Pikachurin",
  "Sonic hedgehog (protein)",
  "Spongiforma squarepantsii",
  "Prostitution among animals",
  "Chicken gun",
  "Chicken hypnotism",
  "Chicken Powered Nuclear Bomb",
  "Mike the Headless Chicken",
  "Dord",
  "Abcde",
  "James while John had had had had had had had had had had had a better effect on the teacher",
  "Buffalo buffalo Buffalo buffalo buffalo",
  "Extravagant number",
  "Happy number",
  "Narcissistic number",
  "Nothing up my sleeve number",
  "Vampire numbe",
  "The Flintstones & WWE: Stone Age SmackDown!",
  "Paint drying the movie",
  "Paint drying the game",
  "Paint drying",
  "The Longest Most Meaningless Movie in the World",
  "Pink Floyd pigs",
  "Thai Elephant Orchestra",
  "Squirrel fishing",
  "Hubert Blaine Wolfeschlegelsteinhausenbergerdorff, Sr.",
  "Public Universal Friend",
  "Karen's Diner",
]; 

const input = document.getElementById('url');

let currentIndex = 0;

function typePlaceholder(text, callback) {
  let i = 0;
  const interval = setInterval(() => {
    input.placeholder = text.substring(0, i + 1);
    i++;
    if (i === text.length) {
      clearInterval(interval);
      setTimeout(() => callback(), 1000); // pause for 1 second before backspacing
    }
  }, 100);
}

function backspacePlaceholder(callback) {
  let text = input.placeholder;
  let i = text.length;
  const interval = setInterval(() => {
    i--;
    input.placeholder = text.substring(0, i);
    if (i === 0) {
      clearInterval(interval);
      setTimeout(() => callback(), 500); // pause briefly before next typing
    }
  }, 50);
}

function loopPlaceholders() {
  const text = placeholders[Math.floor(Math.random() * placeholders.length)];
  typePlaceholder(text, () => {
    backspacePlaceholder(loopPlaceholders);
  });
}
// Function to get a value from localStorage
function getStorage(name) {
    return localStorage.getItem(name);
}
if (getStorage('feature11') === "false") {
// start the loop
loopPlaceholders();
} else {
input.placeholder = "Search..."
}
