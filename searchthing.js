   // Function to set a cookie
    function setCookie(name, value, days = 365) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        const expires = "; expires=" + date.toUTCString();
        document.cookie = `${name}=${value}${expires}; path=/`;
    }

    // Function to get a cookie value
    function getCookie(name) {
        const nameEQ = name + "=";
        const cookies = document.cookie.split(';');

        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length);
            }
        }
        return null;
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
            const lastEngine = getCookie("lastSearchEngine") || "Startpage";

            // Optional feature: override selection if feature10 is true
            if (getCookie("feature10") === "true") {
                lastEngine = "Startpage";
                setCookie("lastSearchEngine", lastEngine);
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

            // Save user selection to cookie when changed
            searchEngineSelect.addEventListener("change", function () {
                const selectedName = this.options[this.selectedIndex].text;
                setCookie("lastSearchEngine", selectedName);
            });

        })
        .catch(error => {
            console.error('Error loading search engines:', error);
        });