function setStorage(name, value) {
    localStorage.setItem(name, value);
}

// Function to get a value from localStorage
function getStorage(name) {
    return localStorage.getItem(name);
}

    fetch('searchEngines.json')
        .then(response => response.json())
        .then(data => {
            const searchEngines = data.searchEngines;
            const searchEngineSelect = document.getElementById('searchEngineSelect');

            if (!searchEngineSelect) { 
                console.error('Search engine dropdown element not found');
                return;
            }


            // Get the last selected engine from cookie (default: "Startpage")
            var lastEngine = getStorage("lastSearchEngine") || "Startpage";

            // Optional feature: override selection if feature10 is true
            if (getStorage("feature10") === "true") {
                lastEngine = "Startpage";
                setStorage("lastSearchEngine", lastEngine);
            }

            // Populate the dropdown
            searchEngines.forEach(engine => {
                const option = document.createElement('option');
                option.value = engine.url;
                option.textContent = engine.name;
                option.disabled = engine.disabled || false;

                // Set selected option
                if (engine.name === lastEngine) {
                    option.selected = true;
                }

                searchEngineSelect.appendChild(option);
            });

            searchEngineSelect.addEventListener("change", function () {
                const selectedName = this.options[this.selectedIndex].text;
                setStorage("lastSearchEngine", selectedName);
            });

        })
        .catch(error => {
            console.error('Error loading search engines:', error);
        });