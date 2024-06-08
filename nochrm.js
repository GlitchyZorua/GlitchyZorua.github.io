// Dexrn: Maybe this should be in a seperate file so that it isnt inline on a bunch of random pages, and if IE doesnt support seperate JS files for whatever reason, I don't think it'll matter here because IE ≠ Chromium
    // please note, 
// that IE11 now returns undefined again for window.chrome
// and new Opera 30 outputs true for window.chrome
// but needs to check if window.opr is not undefined
// and new IE Edge outputs to true now for window.chrome
// and if not iOS Chrome check
// so use the below updated condition
var isChromium = window.chrome;
var winNav = window.navigator;
var vendorName = winNav.vendor;
var isOpera = typeof window.opr !== "undefined";
var isIEedge = winNav.userAgent.indexOf("Edg") > -1;
var isIOSChrome = winNav.userAgent.match("CriOS");

if (isIOSChrome) {
 // get out of my website
     window.location.replace("/pages/chrome.html");
} else if(
  isChromium !== null &&
  typeof isChromium !== "undefined" &&
  vendorName === "Google Inc." &&
  isOpera === false &&
  isIEedge === false
) {
  window.location.replace("/pages/chrome.html"); // get out of my website
} else { 
   // not Google Chrome 
}

// Dexrn: add disallowed ones here.

var disallowedagents = [
  'Edg',
  'Chrome',
  'EdgA',
  'OPR'
];

// Dexrn: IDK if you will use this but you can also whitelist certain words in useragents and if the useragent string contains one in this exceptions list then the user will not be redirected

var allowedagents = [
]

var isDisallowed = disallowedagents.some(agent => window.navigator.userAgent.includes(agent));
var isAllowed = allowedagents.some(agent => window.navigator.userAgent.includes(agent));

if (isDisallowed && !isAllowed) {
  window.location.replace("pages/chrome.html");
}

// I'm leaving this (the above code for backwards compatiblity with older chromium based shit browsers that don't support navigator.userAgentData.brands
function isChromiumGoFuckYourselfMicrosoftEdge() {
    for (brand_version_pair of window.navigator.userAgentData.brands) {
        if (brand_version_pair.brand == "Chromium"){
           // get out of my website
            window.location.replace("/pages/chrome.html");
        }
    }
}

 // ok so apparently fucking microsoft edge was able to bypass this. 
 // this is a hack, but it should work.
isChromiumGoFuckYourselfMicrosoftEdge();

// This should all be cleaned up ASAP.