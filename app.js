document.documentElement.style.setProperty('transition', 'all 0.5s ease');

const toggleSwitches = document.querySelectorAll('.switch input[type="checkbox"]');
const fontSelectors = document.querySelectorAll('select.font-select');
const navToggle = document.querySelector('.navbar-toggle');

const fonts = {
    'default': 'Departure Mono',
    'sans-serif': 'Lato',
    'serif': 'Georgia',
    'monospace': 'Source Code Pro',
    'courier': 'Courier New'
}

window.onload = () => {
    const theme = localStorage.getItem('theme') || 'dark';
    applyThemeColors(theme);
    if (theme === 'light') {
        toggleSwitches.forEach(toggleSwitch => {
            toggleSwitch.style.transition = "all 0";
            toggleSwitch.checked = true;
            toggleSwitch.style.transition = "all 0.4s";
        });
    }
    const fontSelection = localStorage.getItem('font-selection') || 'default';
    const font = fonts[fontSelection];
    document.documentElement.style.setProperty('--font-family', font);
    fontSelectors.forEach(fontSelector => {
        fontSelector.value = fontSelection;
    });
}

function applyLightModeColors() {
    document.documentElement.style.setProperty('--primary-color', '#466365');
    document.documentElement.style.setProperty('--secondary-color', '#40555c');
    document.documentElement.style.setProperty('--bg-color', '#f4f4f4');
    document.documentElement.style.setProperty('--fg-color', '#343a40');
    localStorage.setItem('theme', 'light');
    // Add more properties as needed
}

function applyDarkModeColors() {
    document.documentElement.style.setProperty('--primary-color', '#a2dfe3');
    document.documentElement.style.setProperty('--secondary-color', '#83acba');
    document.documentElement.style.setProperty('--bg-color', '#343a40');
    document.documentElement.style.setProperty('--fg-color', '#f4f4f4');
    localStorage.setItem('theme', 'dark');
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

fontSelectors.forEach(fontSelector => {
    fontSelector.addEventListener('change', (e) => {
        const fontSelection = e.target.value;
        const font = fonts[fontSelection];
        document.documentElement.style.setProperty('--font-family', font);
        localStorage.setItem('font-selection', fontSelection);
    })
});

navToggle.addEventListener('click', (e) => {
    const menu = document.querySelector('.mobile-menu');
    menu.classList.toggle('show');
    if (menu.classList.contains('show')) {
        menu.style.width = "100%";
        menu.style.height = "100%";
        menu.style.top = "1rem";
    } else {
        menu.style.width = "0";
        menu.style.height = "0";
        menu.style.top = "100%";
    }
    document.documentElement.style.setProperty('overflow', menu.classList.contains('show') ? 'hidden' : 'auto');
    console.log(menu.classList.contains('show') ? 'hidden' : 'auto')
})
