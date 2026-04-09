// Function to set a value in localStorage
function setStorage(name, value) {
    localStorage.setItem(name, value);
}

// Function to get a value from localStorage
function getStorage(name) {
    return localStorage.getItem(name);
}

// Function to apply features based on stored values
function applyFeatures() {
    // Retrieve feature states from localStorage
    const eSheepDisabled = getStorage('feature1') === "false";
    const onekoDisabled = getStorage('feature2') === "false";
    const leakyDisabled = getStorage('feature3') === "false";
    //const partykitDisabled = getStorage('feature4') === "false";
    const ponyMode = getStorage('feature5') === "false";
    const hideWebamp = getStorage('feature6') === "false";
    const ponyModewithSFX = getStorage('feature7') === "false";
    const disableQuote = getStorage('feature8') === "false";
    //const disablePartykit = getStorage('feature9') === "false";
    const dontrememberSearch = getStorage('feature10') === "false";
    const funnySearch = getStorage('feature11') === "false";

    if (eSheepDisabled === true) { 
        console.log('eSheep is disabled');
    } else {
        console.log('eSheep is enabled');
    }

    if (disableQuote === true) {
        console.log('Quotes is disabled');
    } else {
        console.log('Quotes is enabled');
    }

    if (onekoDisabled === true) {
        console.log('Oneko is disabled');
    } else {
        console.log('Oneko is enabled');
    }

    if (leakyDisabled === true) {
        console.log('leaky is disabled');
    } else {
        console.log('leaky is enabled');
    }
    if (ponyMode === true) {
        console.log('pony mode is enabled');
    } else {
        console.log('pony mode is disabled');
    }

    if (ponyModewithSFX === true) {
        console.log('pony mode w/ sfx is enabled');
    } else {
        console.log('pony mode w/ sfx is disabled');
    }

    if (hideWebamp === true) {
        console.log('hide webamp is enabled');
    } else {
        console.log('hide webamp is disabled');
    }

    if (dontrememberSearch === true) {
        console.log("Don't Remember search is enabled");
    } else {
        console.log("Don't Remember search is disabled");
    }
    if (funnySearch === true) {
        console.log("funnySearch is enabled");
    } else {
        console.log("funnySearch is disabled");
    }

}

// Function to initialize checkbox states from localStorage
function checkCheckboxState() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        const storedValue = getStorage(`feature${checkbox.dataset.featureNumber}`);
        checkbox.checked = storedValue === "true";
    });

    applyFeatures();
}

// Function to update localStorage when checkbox state changes
function updateCheckbox(event) {
    const checkbox = event.target;

    setStorage(
        `feature${checkbox.dataset.featureNumber}`,
        checkbox.checked ? "true" : "false"
    );

    applyFeatures();
}

// Initialize the script
window.onload = () => {
    checkCheckboxState();

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateCheckbox);
    });
};