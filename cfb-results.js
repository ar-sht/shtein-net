(() => {
    const TEAMS = [
        "Air Force", "Akron", "Alabama", "Appalachian State", "Arizona", "Arizona State", "Arkansas",
        "Arkansas State", "Army", "Auburn",
        "Ball State", "Baylor", "Boise State", "Boston College", "Bowling Green", "Buffalo", "BYU",
        "California", "Central Michigan", "Charlotte", "Cincinnati", "Clemson", "Coastal Carolina",
        "Colorado", "Colorado State",
        "Duke",
        "East Carolina", "Eastern Michigan",
        "FIU", "Florida", "Florida Atlantic", "Florida State", "Fresno State",
        "Georgia", "Georgia Southern", "Georgia State", "Georgia Tech",
        "Hawai'i", "Houston",
        "Illinois", "Indiana", "Iowa", "Iowa State",
        "Jacksonville State", "James Madison",
        "Kansas", "Kansas State", "Kennesaw State", "Kent State", "Kentucky",
        "Liberty", "Louisiana", "Louisiana Tech", "Louisville", "LSU",
        "Marshall", "Maryland", "Memphis", "Miami (FL)", "Miami (OH)", "Michigan", "Michigan State",
        "Middle Tennessee", "Minnesota", "Mississippi State", "Missouri",
        "Navy", "Nebraska", "Nevada", "New Mexico", "New Mexico State", "North Carolina",
        "North Carolina State", "North Texas", "Northern Illinois", "Northwestern", "Notre Dame",
        "Ohio", "Ohio State", "Oklahoma", "Oklahoma State", "Old Dominion", "Ole Miss", "Oregon",
        "Oregon State",
        "Penn State", "Pittsburgh", "Purdue",
        "Rice", "Rutgers",
        "Sam Houston", "San Diego State", "San Jose State", "SMU", "South Alabama", "South Carolina",
        "South Florida", "Southern Miss", "Stanford", "Syracuse",
        "TCU", "Temple", "Tennessee", "Texas", "Texas A&M", "Texas State", "Texas Tech", "Toledo", "Troy",
        "Tulane", "Tulsa",
        "UAB", "UCF", "UCLA", "UConn", "UL Monroe", "UMass", "UNLV", "USC", "Utah", "Utah State", "UTEP", "UTSA",
        "Vanderbilt", "Virginia", "Virginia Tech",
        "Wake Forest", "Washington", "Washington State", "West Virginia", "Western Kentucky",
        "Western Michigan", "Wisconsin", "Wyoming"
    ];
        const TEAM_DATA = TEAMS.map(name => {
            const normalized = name.replace(/\([^)]*\)/g, '').replace(/[^A-Za-z\s]/g, ' ').trim();
            const words = normalized.split(/\s+/).filter(Boolean);
            const acronym = words.map(word => word[0]).join('').toLowerCase();
            return {
            name,
            lower: name.toLowerCase(),
            acronym
        };
    });

    const TEAM_COLOR_OVERRIDES = {
        "Air Force": "#00308F",
        "Akron": "#041E42",
        "Alabama": "#9E1B32",
        "Appalachian State": "#222021",
        "Arizona": "#CC0033",
        "Arizona State": "#8C1D40",
        "Arkansas": "#9D2235",
        "Arkansas State": "#CC092F",
        "Army": "#C5B358",
        "Auburn": "#0C2340",
        "Baylor": "#004834",
        "Boise State": "#0033A0",
        "Boston College": "#8A2432",
        "Clemson": "#F56600",
        "Coastal Carolina": "#007C92",
        "Colorado": "#CFB87C",
        "Duke": "#0736A4",
        "East Carolina": "#592A8A",
        "Florida": "#0021A5",
        "Florida State": "#782F40",
        "Georgia": "#BA0C2F",
        "Georgia Tech": "#B3A369",
        "Hawai'i": "#024731",
        "Houston": "#C8102E",
        "Illinois": "#E84A27",
        "Indiana": "#990000",
        "Iowa": "#000000",
        "Iowa State": "#C8102E",
        "Kansas": "#0051BA",
        "Kansas State": "#512888",
        "Kent State": "#003976",
        "Kentucky": "#0033A0",
        "Liberty": "#0D2240",
        "Louisiana": "#C00000",
        "Louisville": "#AD0000",
        "LSU": "#461D7C",
        "Marshall": "#006C5B",
        "Maryland": "#E03A3E",
        "Memphis": "#0D47A1",
        "Miami (FL)": "#F47321",
        "Miami (OH)": "#B61E39",
        "Michigan": "#00274C",
        "Michigan State": "#18453B",
        "Minnesota": "#7A0019",
        "Mississippi State": "#5D1725",
        "Missouri": "#F1B82D",
        "Nebraska": "#E41C38",
        "North Carolina": "#99BFE6",
        "North Carolina State": "#CC0000",
        "Notre Dame": "#0C2340",
        "Ohio State": "#BB0000",
        "Oklahoma": "#841617",
        "Oklahoma State": "#FF7300",
        "Ole Miss": "#CE1126",
        "Oregon": "#154733",
        "Oregon State": "#DC4405",
        "Penn State": "#002D62",
        "Pittsburgh": "#003594",
        "Purdue": "#CEB888",
        "Rutgers": "#CC0033",
        "SMU": "#C50F3C",
        "South Carolina": "#73000A",
        "Stanford": "#8C1515",
        "Syracuse": "#D44500",
        "TCU": "#4D1979",
        "Tennessee": "#FF8200",
        "Texas": "#BF5700",
        "Texas A&M": "#500000",
        "Texas Tech": "#C00",
        "UCF": "#BA9B37",
        "UCLA": "#0073CF",
        "USC": "#990000",
        "Utah": "#CC0000",
        "Virginia": "#232D4B",
        "Virginia Tech": "#630031",
        "Washington": "#4B2E83",
        "Washington State": "#981E32",
        "West Virginia": "#002855",
        "Wisconsin": "#C5050C",
        "Wyoming": "#492F24"
    };

    const hashToColor = (value) => {
        let hash = 0;
        for (let i = 0; i < value.length; i += 1) {
            hash = value.charCodeAt(i) + ((hash << 5) - hash);
            hash |= 0;
        }
        const normalize = (component) => ((component % 256) + 256) % 256;
        const r = normalize((hash >> 16) & 0xff);
        const g = normalize((hash >> 8) & 0xff);
        const b = normalize(hash & 0xff);
        return rgbToHex(r, g, b);
    };

    function rgbToHex(r, g, b) {
        const toHex = (component) => component.toString(16).padStart(2, "0");
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    function hexToRgb(hex) {
        if (!hex) return null;
        let normalized = hex.replace("#", "");
        if (normalized.length === 3) {
            normalized = normalized.split("").map((c) => c + c).join("");
        }
        if (normalized.length !== 6) return null;
        const r = parseInt(normalized.slice(0, 2), 16);
        const g = parseInt(normalized.slice(2, 4), 16);
        const b = parseInt(normalized.slice(4, 6), 16);
        return { r, g, b };
    }

    function blendWithWhite(hex, amount = 0.3) {
        const rgb = hexToRgb(hex);
        if (!rgb) return hex;
        const mix = (component) => Math.round(component + (255 - component) * amount);
        return rgbToHex(mix(rgb.r), mix(rgb.g), mix(rgb.b));
    }

    function getTeamChipColors(team) {
        const override = TEAM_COLOR_OVERRIDES[team];
        const softenAmount = override ? 0.15 : 0.3;
        const base = blendWithWhite(override || hashToColor(team), softenAmount);
        const rgb = hexToRgb(base) || { r: 200, g: 210, b: 230 };
        const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
        const text = luminance > 0.65 ? "#121826" : "#f8fafc";
        return { background: base, text };
    }

    document.addEventListener('DOMContentLoaded', () => {
        const XLSX_CDN = 'https://cdn.jsdelivr.net/npm/xlsx@0.19.3/dist/xlsx.full.min.js';
        const EXCEL_HEADERS = [
            "Name",
            "Year",
            "Record",
            "Result",
            "SP",
            "Date",
            "Opponent",
            "OpponentURL",
            "ScoreA",
            "ScoreB",
            "Location",
            "Notes"
        ];

        const COLUMN_WIDTHS = [18, 12, 16, 8, 6, 14, 24, 30, 10, 12, 16, 24];
        let xlsxLoader = null;
        const TEAM_COOKIE_NAME = 'winsipedia-team-selection';
        const TEAM_COOKIE_MAX_AGE = 60 * 60 * 24 * 90;

        const combobox = document.querySelector('[data-combobox]');
        if (!combobox) return;

        const teamSearchInput = /** @type {HTMLInputElement} */ (document.getElementById('team-search'));
        const chipContainer = document.getElementById('chip-container');
        const teamOptions = document.getElementById('team-options');
        const teamToggle = document.getElementById('team-toggle');
        const fetchBtn = document.getElementById('fetch-btn');
        const statusEl = document.getElementById('status');
        const downloadList = document.getElementById('download-list');
        const downloadAllBtn = document.getElementById('download-all-btn');

        if (!teamOptions || !teamToggle || !fetchBtn || !statusEl || !downloadList || !chipContainer || !teamSearchInput || !downloadAllBtn) {
            return;
        }

        const activeDownloadUrls = [];

        const comboboxState = {
            filtered: [...TEAMS],
            highlighted: -1,
            open: false,
            selectedTeams: [],
            downloadEntries: []
        };

        function getCookie(name) {
            const cookieString = document.cookie || '';
            const entries = cookieString.split(';');
            const target = `${name}=`;
            for (const entry of entries) {
                const trimmed = entry.trim();
                if (trimmed.startsWith(target)) {
                    return trimmed.slice(target.length);
                }
            }
            return null;
        }

        function readTeamsFromCookie() {
            try {
                const encoded = getCookie(TEAM_COOKIE_NAME);
                if (!encoded) return [];
                const parsed = JSON.parse(decodeURIComponent(encoded));
                if (!Array.isArray(parsed)) return [];
                const seen = new Set();
                const valid = [];
                parsed.forEach(raw => {
                    if (typeof raw !== 'string') return;
                    const match = TEAMS.find(team => team.toLowerCase() === raw.toLowerCase());
                    if (match && !seen.has(match)) {
                        seen.add(match);
                        valid.push(match);
                    }
                });
                return valid;
            } catch (error) {
                console.warn('Unable to read saved team selections from cookie.', error);
                return [];
            }
        }

        function persistSelectedTeams() {
            try {
                const payload = encodeURIComponent(JSON.stringify(comboboxState.selectedTeams));
                document.cookie = `${TEAM_COOKIE_NAME}=${payload}; path=/; max-age=${TEAM_COOKIE_MAX_AGE}; SameSite=Lax`;
            } catch (error) {
                console.warn('Unable to persist team selections to cookie.', error);
            }
        }

        function hydrateTeamsFromCookie() {
            const saved = readTeamsFromCookie();
            if (saved.length) {
                comboboxState.selectedTeams = saved;
                persistSelectedTeams();
            }
        }

        const getOptions = () =>
            Array.from(teamOptions.querySelectorAll('.cfb-combobox__option[data-value]'));

        function normalizeTeamToSlug(name) {
            let slug = name.trim().toLowerCase();
            slug = slug.replace(/&/g, "");
            slug = slug.replace(/'/g, "");
            slug = slug.replace(/\./g, "");
            slug = slug.replace(/\(/g, "").replace(/\)/g, "");
            slug = slug.replace(/\s+/g, " ");
            slug = slug.replace(/\s/g, "-");
            return slug;
        }

        function setStatus(message, isError = false) {
            statusEl.textContent = message;
            statusEl.classList.toggle('error', isError);
        }

        function renderOptions() {
            teamOptions.innerHTML = '';
            if (!comboboxState.filtered.length) {
                const empty = document.createElement('li');
                empty.className = 'cfb-combobox__option cfb-combobox__option--empty';
                empty.textContent = 'No matches';
                empty.setAttribute('aria-disabled', 'true');
                teamOptions.appendChild(empty);
                comboboxState.highlighted = -1;
                return;
            }

            comboboxState.filtered.forEach((team, index) => {
                const option = document.createElement('li');
                option.textContent = team;
                option.className = 'cfb-combobox__option';
                option.dataset.value = team;
                option.setAttribute('role', 'option');
                option.setAttribute('aria-selected', index === comboboxState.highlighted ? 'true' : 'false');

                option.addEventListener('mousedown', (event) => {
                    event.preventDefault();
                });
                option.addEventListener('click', () => handleTeamSelection(team));
                teamOptions.appendChild(option);
            });
        }

        function openList() {
            if (comboboxState.open) return;
            teamOptions.hidden = false;
            comboboxState.open = true;
            teamSearchInput.setAttribute('aria-expanded', 'true');
            teamToggle.setAttribute('aria-expanded', 'true');
        }

        function closeList() {
            if (!comboboxState.open) return;
            teamOptions.hidden = true;
            comboboxState.open = false;
            comboboxState.highlighted = -1;
            teamSearchInput.setAttribute('aria-expanded', 'false');
            teamToggle.setAttribute('aria-expanded', 'false');
            getOptions().forEach((option) => option.setAttribute('aria-selected', 'false'));
        }

        function highlightIndex(index) {
            const options = getOptions();
            if (!options.length) return;

            const bounded = ((index % options.length) + options.length) % options.length;
            comboboxState.highlighted = bounded;

            options.forEach((option, idx) => {
                const selected = idx === bounded;
                option.setAttribute('aria-selected', selected ? 'true' : 'false');
                if (selected) {
                    option.scrollIntoView({ block: 'nearest' });
                }
            });
        }

        function levenshtein(a, b) {
            if (a === b) return 0;
            const m = a.length;
            const n = b.length;
            if (m === 0) return n;
            if (n === 0) return m;
            const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
            for (let i = 0; i <= m; i += 1) dp[i][0] = i;
            for (let j = 0; j <= n; j += 1) dp[0][j] = j;
            for (let i = 1; i <= m; i += 1) {
                for (let j = 1; j <= n; j += 1) {
                    const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                    dp[i][j] = Math.min(
                        dp[i - 1][j] + 1,
                        dp[i][j - 1] + 1,
                        dp[i - 1][j - 1] + cost
                    );
                }
            }
            return dp[m][n];
        }

        function scoreTeam(queryLower, acronymQuery, team) {
            let bestScore = -Infinity;
            const index = team.lower.indexOf(queryLower);
            if (index === 0) {
                bestScore = Math.max(bestScore, 120 - queryLower.length);
            } else if (index > 0) {
                bestScore = Math.max(bestScore, 90 - index);
            }
            if (team.acronym && acronymQuery && team.acronym.startsWith(acronymQuery)) {
                bestScore = Math.max(bestScore, 110 - (team.acronym.length - acronymQuery.length));
            }
            if (team.acronym && acronymQuery) {
                const acronymDistance = levenshtein(acronymQuery, team.acronym);
                const maxAllowed = Math.max(1, Math.floor(team.acronym.length / 2));
                if (acronymDistance <= maxAllowed) {
                    bestScore = Math.max(bestScore, 95 - acronymDistance * 8);
                }
            }
            const distance = levenshtein(queryLower, team.lower);
            if (distance <= 2) {
                bestScore = Math.max(bestScore, 80 - distance * 10);
            }
            return bestScore;
        }

        function filterTeams(query) {
            const normalized = query.trim().toLowerCase();
            if (!normalized) {
                comboboxState.filtered = [...TEAMS];
            } else {
                const acronymQuery = normalized.replace(/[^a-z]/g, '');
                const scored = TEAM_DATA
                    .map(team => ({
                        name: team.name,
                        score: scoreTeam(normalized, acronymQuery, team)
                    }))
                    .filter(entry => entry.score > -Infinity)
                    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
                comboboxState.filtered = scored.map(entry => entry.name);
            }
            comboboxState.highlighted = comboboxState.filtered.length ? 0 : -1;
            renderOptions();
        }

        function updateChipPlaceholder() {
            const hasSelection = comboboxState.selectedTeams.length > 0;
            const hasText = teamSearchInput.value.trim().length > 0;
            chipContainer.classList.toggle('cfb-chip-container--filled', hasSelection || hasText);
        }

        function renderChipPills() {
            const hadFocus = document.activeElement === teamSearchInput;
            chipContainer.innerHTML = '';
            comboboxState.selectedTeams.forEach(team => {
                const { background, text } = getTeamChipColors(team);
                const chip = document.createElement('span');
                chip.className = 'cfb-chip';
                chip.style.setProperty('--chip-bg', background);
                chip.style.setProperty('--chip-text', text);

                const label = document.createElement('span');
                label.className = 'cfb-chip__label';
                label.textContent = team;

                const removeBtn = document.createElement('button');
                removeBtn.type = 'button';
                removeBtn.className = 'cfb-chip__remove';
                removeBtn.setAttribute('aria-label', `Remove ${team}`);
                removeBtn.textContent = '×';
                removeBtn.addEventListener('click', (event) => {
                    event.stopPropagation();
                    removeTeam(team);
                });

                chip.append(label, removeBtn);
                chipContainer.appendChild(chip);
            });
            chipContainer.appendChild(teamSearchInput);
            if (hadFocus) {
                teamSearchInput.focus();
                const value = teamSearchInput.value;
                teamSearchInput.setSelectionRange(value.length, value.length);
            }
            updateChipPlaceholder();
        }

        function addTeam(teamName) {
            if (comboboxState.selectedTeams.includes(teamName)) {
                return;
            }
            comboboxState.selectedTeams.push(teamName);
            renderChipPills();
            persistSelectedTeams();
        }

        function removeTeam(teamName) {
            comboboxState.selectedTeams = comboboxState.selectedTeams.filter(t => t !== teamName);
            renderChipPills();
            persistSelectedTeams();
        }

        function handleTeamSelection(teamName) {
            addTeam(teamName);
            teamSearchInput.value = '';
            filterTeams('');
            updateChipPlaceholder();
            openList();
            highlightIndex(0);
        }

        function commitInputValue() {
            const typed = teamSearchInput.value.trim();
            if (!typed) {
                return null;
            }
            const match = TEAMS.find(team => team.toLowerCase() === typed.toLowerCase());
            if (match) {
                addTeam(match);
                teamSearchInput.value = '';
                filterTeams('');
                updateChipPlaceholder();
                return match;
            }
            return null;
        }

        function handleInput(event) {
            const value = event.target.value;
            filterTeams(value);
            openList();
            updateChipPlaceholder();
        }

        function handleKeydown(event) {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                if (!comboboxState.open) {
                    openList();
                }
                highlightIndex(
                    comboboxState.highlighted === -1 ? 0 : comboboxState.highlighted + 1
                );
                return;
            }
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                if (!comboboxState.open) {
                    openList();
                }
                highlightIndex(
                    comboboxState.highlighted === -1
                        ? comboboxState.filtered.length - 1
                        : comboboxState.highlighted - 1
                );
                return;
            }
            if (event.key === 'Enter') {
                event.preventDefault();
                if (comboboxState.open && comboboxState.highlighted >= 0) {
                    const team = comboboxState.filtered[comboboxState.highlighted];
                    if (team) {
                        handleTeamSelection(team);
                        return;
                    }
                }
                commitInputValue();
                return;
            }
            if (event.key === 'Escape') {
                closeList();
                return;
            }
        }

        function resetDownloadUrls() {
            while (activeDownloadUrls.length) {
                const url = activeDownloadUrls.pop();
                URL.revokeObjectURL(url);
            }
        }

        function createDownloadIcon() {
            const svgNS = 'http://www.w3.org/2000/svg';
            const icon = document.createElementNS(svgNS, 'svg');
            icon.setAttribute('viewBox', '0 0 384 512');
            icon.classList.add('cfb-download-icon');
            const path = document.createElementNS(svgNS, 'path');
            path.setAttribute('d', 'M216 8c0-4.4-3.6-8-8-8s-8 3.6-8 8l0 280-79-79c-3.1-3.1-8.2-3.1-11.3 0s-3.1 8.2 0 11.3l96 96c3.1 3.1 8.2 3.1 11.3 0l96-96c3.1-3.1 3.1-8.2 0-11.3s-8.2-3.1-11.3 0l-79 79 0-280zM360 352H24c-13.3 0-24 10.7-24 24l0 64c0 39.8 32.2 72 72 72H312c39.8 0 72-32.2 72-72V376c0-13.3-10.7-24-24-24zm8 88c0 30.9-25.1 56-56 56H72c-30.9 0-56-25.1-56-56V376c0-4.4 3.6-8 8-8H352c4.4 0 8 3.6 8 8v64z');
            icon.appendChild(path);
            return icon;
        }

        async function fetchText(url, options) {
            const resp = await fetch(url, options);
            if (!resp.ok) {
                throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
            }
            return resp.text();
        }

        function resolveCustomProxy(slug) {
            const template = localStorage.getItem('winsipedia-proxy');
            if (!template) {
                return null;
            }
            const trimmed = template.trim();
            if (!trimmed) return null;
            if (trimmed.includes('{slug}')) {
                return trimmed.replaceAll('{slug}', slug);
            }
            return `${trimmed.replace(/\/$/, '')}/${slug}`;
        }

        async function fetchWinsipediaHtml(slug) {
            const canonicalUrl = `https://www.winsipedia.com/games/${slug}`;

            const attempts = [
                { label: 'direct', url: canonicalUrl, options: { mode: 'cors' } },
                {
                    label: 'corsproxy.io',
                    url: `https://corsproxy.io/?https://www.winsipedia.com/games/${slug}`
                },
                {
                    label: 'thingproxy',
                    url: `https://thingproxy.freeboard.io/fetch/https://www.winsipedia.com/games/${slug}`
                },
                { label: 'proxy (http mirror)', url: `https://r.jina.ai/http://www.winsipedia.com/games/${slug}` },
                { label: 'proxy (https mirror)', url: `https://r.jina.ai/https://www.winsipedia.com/games/${slug}` },
                {
                    label: 'proxy (allorigins)',
                    url: `https://api.allorigins.win/raw?url=${encodeURIComponent(canonicalUrl)}`
                }
            ];

            const customProxy = resolveCustomProxy(slug);
            if (customProxy) {
                attempts.unshift({ label: 'custom proxy', url: customProxy });
            }

            let lastError;
            for (const attempt of attempts) {
                try {
                    setStatus(`Fetching ${canonicalUrl} … via ${attempt.label}`);
                    const html = await fetchText(attempt.url, attempt.options);
                    return html;
                } catch (err) {
                    lastError = err;
                }
            }
            throw lastError || new Error('Unable to fetch Winsipedia data via any proxy.');
        }

        function loadXlsxLibrary() {
            if (typeof XLSX !== 'undefined') {
                return Promise.resolve();
            }
            if (!xlsxLoader) {
                xlsxLoader = new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = XLSX_CDN;
                    script.async = true;
                    script.onload = () => resolve();
                    script.onerror = () => reject(new Error("Failed to load Excel library."));
                    document.head.appendChild(script);
                });
            }
            return xlsxLoader;
        }

        async function createWorkbookBuffer(rows) {
            await loadXlsxLibrary();
            if (typeof XLSX === 'undefined') {
                throw new Error("Excel library not available.");
            }
            const sheetData = [
                EXCEL_HEADERS,
                ...rows.map(row => EXCEL_HEADERS.map(key => row[key] ?? ""))
            ];
            const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
            worksheet['!cols'] = COLUMN_WIDTHS.map(wch => ({ wch }));
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Games');
            return XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        }

        function rowsToCsv(rows) {
            const headers = EXCEL_HEADERS;
            const lines = [headers.join(",")];
            rows.forEach(row => {
                const line = headers.map(header => {
                    const raw = row[header] ?? "";
                    const str = String(raw).replace(/"/g, '""');
                    return /[",\n]/.test(str) ? `"${str}"` : str;
                }).join(",");
                lines.push(line);
            });
            return lines.join("\n");
        }

        async function fetchGamesAndBuildCsv(teamName) {
            const slug = normalizeTeamToSlug(teamName);
            const html = await fetchWinsipediaHtml(slug);

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            const rows = [];
            const seasonDivs = doc.querySelectorAll('div[id^="season-"]');

            seasonDivs.forEach(div => {
                const h2 = div.querySelector("h2");
                const h3 = div.querySelector("h3");
                if (!h2 || !h3) return;

                const headerText = (h2.textContent || "").trim();
                const yearMatch = headerText.match(/\d{4}/);
                const seasonYear = yearMatch ? Number(yearMatch[0]) : headerText;
                const seasonRecord = (h3.textContent || "").trim();

                const table = div.querySelector("table");
                if (!table) return;

                const tbody = table.tBodies[0] || table;
                Array.from(tbody.querySelectorAll("tr")).forEach(tr => {
                    const tds = tr.querySelectorAll("td");
                    if (tds.length < 6) return;

                    const rawResult = tds[0].textContent.trim();
                    let sp = "";
                    if (rawResult.includes("†")) {
                        sp = "V";
                    } else if (rawResult.includes("*")) {
                        sp = "F";
                    }
                    const resultMatch = rawResult.match(/[WLT]/i);
                    const result = resultMatch ? resultMatch[0].toUpperCase() : "";
                    const date = tds[1].textContent.trim();

                    const oppCell = tds[2];
                    const oppLink = oppCell.querySelector("a");
                    const primaryOppSpan = oppCell.querySelector("span");
                    const opponentName = primaryOppSpan
                        ? primaryOppSpan.textContent.trim()
                        : oppLink
                            ? oppLink.textContent.trim()
                            : oppCell.textContent.trim();
                    const opponentUrl = oppLink ? oppLink.href : "";

                    const scoreText = tds[3].textContent.trim();
                    const scoreParts = scoreText
                        .split(/\s*[-–]\s*/)
                        .map(part => Number.parseInt(part, 10))
                        .filter(num => !Number.isNaN(num));
                    let scoreA = scoreText;
                    let scoreB = "";
                    if (scoreParts.length === 2) {
                        scoreA = scoreParts[0];
                        scoreB = scoreParts[1];
                    }
                    const location = tds[4].textContent.trim();
                    const notes = tds[5].textContent.trim();

                    rows.push({
                        Name: teamName,
                        Year: seasonYear,
                        Record: seasonRecord,
                        Result: result,
                        SP: sp,
                        Date: date,
                        Opponent: opponentName,
                        OpponentURL: opponentUrl,
                        ScoreA: scoreA,
                        ScoreB: scoreB,
                        Location: location,
                        Notes: notes
                    });
                });
            });

            if (!rows.length) {
                throw new Error("No game rows found — slug might be wrong or layout changed.");
            }

            try {
                const workbookArray = await createWorkbookBuffer(rows);
                return { workbookArray, slug, format: 'excel' };
            } catch (error) {
                console.warn("Excel generation failed, falling back to CSV:", error);
                const csv = rowsToCsv(rows);
                return { csv, slug, format: 'csv' };
            }
        }

        function updateDownloadAllButton(entries = comboboxState.downloadEntries) {
            if (!downloadAllBtn) return;
            const hasDownloads = Array.isArray(entries) && entries.length > 0;
            downloadAllBtn.disabled = !hasDownloads;
            downloadAllBtn.setAttribute('aria-disabled', hasDownloads ? 'false' : 'true');
        }

        function triggerSingleDownload(url, filename) {
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = filename;
            anchor.style.display = 'none';
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
        }

        function handleDownloadAll() {
            if (!comboboxState.downloadEntries.length) return;
            comboboxState.downloadEntries.forEach((entry, index) => {
                const extension = entry.format === 'excel' ? 'xlsx' : 'csv';
                const filename = `${entry.slug}_games.${extension}`;
                setTimeout(() => {
                    triggerSingleDownload(entry.url, filename);
                }, index * 250);
            });
        }

        function renderDownloadList(entries) {
            downloadList.innerHTML = '';
            entries.forEach(({ team, slug, url, format }) => {
                const li = document.createElement('li');
                li.className = 'cfb-download-list__item';

                const meta = document.createElement('div');
                meta.className = 'cfb-download-list__meta';
                const name = document.createElement('strong');
                name.textContent = team;
                const file = document.createElement('span');
                file.className = 'cfb-download-file';
                const extension = format === 'excel' ? 'xlsx' : 'csv';
                file.textContent = `${slug}_games.${extension}`;
                meta.append(name, file);

                const anchor = document.createElement('a');
                anchor.className = 'cfb-download-link';
                anchor.href = url;
                anchor.download = `${slug}_games.${extension}`;
                anchor.append(createDownloadIcon(), document.createTextNode('Download'));

                li.append(meta, anchor);
                downloadList.appendChild(li);
            });
            updateDownloadAllButton(entries);
        }

        async function handleFetch() {
            if (!comboboxState.selectedTeams.length) {
                setStatus("Pick at least one team first.", true);
                return;
            }

            fetchBtn.disabled = true;
            setStatus("Fetching selections...");

            try {
                comboboxState.downloadEntries = [];
                renderDownloadList([]);
                resetDownloadUrls();
                const downloads = [];
                const workbookMime = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                for (let i = 0; i < comboboxState.selectedTeams.length; i += 1) {
                    const team = comboboxState.selectedTeams[i];
                    setStatus(`Fetching ${team} (${i + 1}/${comboboxState.selectedTeams.length})...`);
                    const result = await fetchGamesAndBuildCsv(team);
                    const blob = new Blob(
                        [result.format === 'excel' ? result.workbookArray : result.csv],
                        { type: result.format === 'excel' ? workbookMime : 'text/csv' }
                    );
                    const url = URL.createObjectURL(blob);
                    activeDownloadUrls.push(url);
                    downloads.push({ team, slug: result.slug, url, format: result.format });
                }
                comboboxState.downloadEntries = downloads;
                renderDownloadList(downloads);
                setStatus(`Fetched ${downloads.length} file${downloads.length === 1 ? "" : "s"}.`);
            } catch (err) {
                console.error(err);
                let msg = String(err && err.message ? err.message : err);
                if (msg.toLowerCase().includes("failed to fetch")) {
                    msg += " (likely CORS/network issue from Winsipedia)";
                }
                setStatus(msg, true);
            } finally {
                fetchBtn.disabled = false;
            }
        }

        teamSearchInput.addEventListener('focus', () => {
            filterTeams(teamSearchInput.value);
            openList();
            updateChipPlaceholder();
        });
        teamSearchInput.addEventListener('input', handleInput);
        teamSearchInput.addEventListener('keydown', handleKeydown);
        teamSearchInput.addEventListener('blur', updateChipPlaceholder);

        chipContainer.addEventListener('click', () => teamSearchInput.focus());

        teamToggle.addEventListener('click', () => {
            if (comboboxState.open) {
                closeList();
            } else {
                filterTeams(teamSearchInput.value);
                openList();
            }
            teamSearchInput.focus();
        });

        document.addEventListener('click', (event) => {
            if (!combobox.contains(event.target) && !teamOptions.contains(event.target)) {
                closeList();
            }
        });

        fetchBtn.addEventListener('click', () => {
            commitInputValue();
            handleFetch();
        });

        downloadAllBtn.addEventListener('click', handleDownloadAll);

        hydrateTeamsFromCookie();
        filterTeams('');
        renderChipPills();
        renderDownloadList([]);
        updateChipPlaceholder();
    });
})();
