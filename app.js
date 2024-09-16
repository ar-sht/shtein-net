document.documentElement.style.setProperty('transition', 'all 0.5s ease');

function reloadCSS()
{
    var links = document.getElementsByTagName("link");
    for (var cl in links)
    {
        var link = links[cl];
        if (link.rel === "stylesheet")
            link.href += "";
    }
}

toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

function applyLightModeColors() {
    document.documentElement.style.setProperty('--primary-color', '#466365');
    document.documentElement.style.setProperty('--secondary-color', '#40555c');
    document.documentElement.style.setProperty('--bg-color', '#f4f4f4');
    document.documentElement.style.setProperty('--fg-color', '#343a40');
    // Add more properties as needed
}

function applyDarkModeColors() {
    document.documentElement.style.setProperty('--primary-color', '#a2dfe3');
    document.documentElement.style.setProperty('--secondary-color', '#83acba');
    document.documentElement.style.setProperty('--bg-color', '#343a40');
    document.documentElement.style.setProperty('--fg-color', '#f4f4f4');
    // Add more properties as needed
}

function applyThemeColors(theme) {
    if (theme === 'dark') {
        applyDarkModeColors();
    } else {
        applyLightModeColors();
    }
}

toggleSwitch.addEventListener('change', (e) => {
    const theme = e.target.checked ? 'light' : 'dark';
    applyThemeColors(theme);
    localStorage.setItem('theme', theme);
    // reloadCSS();
}, false);

const fonts = {
    'default': 'Departure Mono',
    'sans-serif': 'Lato',
    'serif': 'Georgia',
    'monospace': 'Trebuchet MS',
    'courier': 'Courier New'
}

fontSelector = document.getElementById('font-select');

fontSelector.addEventListener('change', (e) => {
    const fontSelection = e.target.value;
    const font = fonts[fontSelection];
    document.documentElement.style.setProperty('--font-family', font);
    localStorage.setItem('font', font);
})
