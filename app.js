document.documentElement.style.setProperty('transition', 'all 0.5s ease');

toggleSwitches = document.querySelectorAll('.switch input[type="checkbox"]');

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

toggleSwitches.forEach(toggleSwitch => {
    toggleSwitch.addEventListener('change', (e) => {
        const theme = e.target.checked ? 'light' : 'dark';
        applyThemeColors(theme);
        localStorage.setItem('theme', theme);
    }, false);
});


const fonts = {
    'default': 'Departure Mono',
    'sans-serif': 'Lato',
    'serif': 'Georgia',
    'monospace': 'Trebuchet MS',
    'courier': 'Courier New'
}

fontSelectors = document.querySelectorAll('select.font-select');

fontSelectors.forEach(fontSelector => {
    fontSelector.addEventListener('change', (e) => {
        const fontSelection = e.target.value;
        const font = fonts[fontSelection];
        document.documentElement.style.setProperty('--font-family', font);
        localStorage.setItem('font', font);
    })
});


navToggle = document.querySelector('.navbar-toggle');

navToggle.addEventListener('click', (e) => {
    const menu = document.querySelector('.mobile-menu');
    menu.classList.toggle('show');
})
