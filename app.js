document.documentElement.style.setProperty('transition', 'all 0.5s ease');

const toggleSwitches = document.querySelectorAll('.switch input[type="checkbox"]');
const fontSelectors = document.querySelectorAll('select.font-select');
const navToggle = document.querySelector('.navbar-toggle');
const MAX_PREVIEW_LINES = 10;

const fonts = {
    'default': 'Lora',
    'sans-serif': 'Lato',
    'serif': 'Georgia',
    'monospace': 'Source Code Pro',
    'courier': 'Courier New'
}

function debounce(fn, delay = 150) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(null, args), delay);
    }
}

function getLineHeight(element, computedStyles) {
    const lineHeight = computedStyles.lineHeight;
    if (lineHeight && lineHeight !== 'normal') {
        return parseFloat(lineHeight);
    }
    const fontSize = parseFloat(computedStyles.fontSize) || 16;
    return fontSize * 1.4;
}

function getNumericValue(value) {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? 0 : parsed;
}

const getPortfolioCards = () => Array.from(document.querySelectorAll('.portfolio-item'));

const getPreviewElements = () => getPortfolioCards()
    .map(card => card.querySelector('.item-preview'))
    .filter(Boolean);

function tiltHeroPortraits() {
    const portraits = document.querySelectorAll('.hero-portrait');
    if (!portraits.length) {
        return;
    }

    const getRandomTilt = () => {
        const min = 5;
        const max = 16;
        const magnitude = min + Math.random() * (max - min);
        const direction = Math.random() > 0.5 ? 1 : -1;
        return (magnitude * direction).toFixed(2);
    };

    portraits.forEach(portrait => {
        const angle = getRandomTilt();
        portrait.style.setProperty('--hero-tilt', `${angle}deg`);
    });
}

function shufflePortfolioCards() {
    const container = document.querySelector('main.portfolio');
    if (!container) {
        return;
    }

    const cards = Array.from(container.children);
    for (let i = cards.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    cards.forEach(card => container.appendChild(card));
}

function measureAvailablePreviewHeight(element) {
    const card = element.closest('.portfolio-item');
    if (!card) {
        return Infinity;
    }

    const cardStyles = window.getComputedStyle(card);
    const paddingTop = getNumericValue(cardStyles.paddingTop);
    const paddingBottom = getNumericValue(cardStyles.paddingBottom);
    const rowGap = getNumericValue(cardStyles.rowGap);
    const children = Array.from(card.children);
    const gapCount = Math.max(children.length - 1, 0);

    const otherHeight = children
        .filter(child => child !== element)
        .reduce((total, node) => total + node.offsetHeight, 0);

    const heightProp = getNumericValue(cardStyles.height);
    const measuredHeight = heightProp || Math.max(card.offsetHeight, card.scrollHeight);

    const available = measuredHeight - otherHeight - paddingTop - paddingBottom - (rowGap * gapCount);

    return Math.max(0, available);
}

function clampPreview(element, options = {}) {
    const {
        lines = MAX_PREVIEW_LINES,
        dynamicHeight = true
    } = options;

    const clampToFixedHeight = dynamicHeight && !window.matchMedia('(max-width: 768px)').matches;

    if (!element.dataset.fullText) {
        element.dataset.fullText = element.textContent.trim();
    }

    const fullText = element.dataset.fullText;
    element.textContent = fullText;

    const computed = window.getComputedStyle(element);
    const lineHeight = getLineHeight(element, computed);
    const dynamicLimit = clampToFixedHeight
        ? measureAvailablePreviewHeight(element)
        : lineHeight * lines;
    const fallbackLimit = lineHeight * lines;
    const maxHeight = Number.isFinite(dynamicLimit)
        ? Math.max(lineHeight, dynamicLimit)
        : fallbackLimit;
    const tolerance = 1;

    if (element.scrollHeight <= maxHeight + tolerance) {
        return;
    }

    let start = 0;
    let end = fullText.length;
    let truncatedText = '';

    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        const candidate = fullText.slice(0, mid).trimEnd() + '…';
        element.textContent = candidate;

        if (element.scrollHeight <= maxHeight) {
            truncatedText = candidate;
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }

    element.textContent = truncatedText || fullText;

    const overflowed = element.scrollHeight > element.clientHeight + tolerance;
    if (overflowed && clampToFixedHeight) {
        element.classList.add('preview-overflow');
    } else {
        element.classList.remove('preview-overflow');
    }
}

const clampAllPreviews = () => {
    getPreviewElements().forEach(preview => clampPreview(preview));
};

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

    shufflePortfolioCards();
    tiltHeroPortraits();
    clampAllPreviews();
}

function applyLightModeColors() {
    document.documentElement.style.setProperty('--primary-color', '#769395');
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
        clampAllPreviews();
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

window.addEventListener('resize', debounce(clampAllPreviews, 200));
