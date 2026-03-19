# Decimal Dash — Agent Documentation

## Project Overview

**Decimal Dash** is an interactive bilingual educational web application designed to teach children decimal multiplication through 10 engaging mini-games. The app uses visual, conceptual, and drill-based approaches to build understanding progressively.

- **Target Audience**: Children learning decimal multiplication
- **Languages**: English (EN) and French (FR), switchable at runtime
- **Platform**: Browser-based, pure client-side (no backend)
- **Deployment**: Static files - can be hosted on any web server or opened directly in a browser
- **PWA Support**: Progressive Web App with offline functionality and install capability

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Vanilla JavaScript (ES5/ES6) |
| **Markup** | HTML5 |
| **Styling** | CSS3 with CSS Custom Properties (variables) |
| **Dependencies** | None (pure vanilla) |
| **External Resources** | Google Fonts (Nunito), emoji for icons |

**Note**: This project intentionally uses no build tools, bundlers, frameworks, or package managers. It is designed to run directly in browsers without compilation.

## Project Structure

```
decimal-multiply/
├── index.html          # Entry point, loads all scripts and games
├── app.js              # Core application logic, routing, utilities
├── lang.js             # Bilingual content (EN/FR translations)
├── style.css           # Complete design system and component styles
├── manifest.json       # PWA manifest for install capability
├── sw.js               # Service Worker for offline functionality
├── AGENTS.md           # This file
├── icons/              # PWA app icons
│   ├── icon.svg        # Source SVG icon
│   ├── icon-72.png     # 72x72 icon
│   ├── icon-96.png     # 96x96 icon
│   ├── icon-128.png    # 128x128 icon
│   ├── icon-144.png    # 144x144 icon
│   ├── icon-152.png    # 152x152 icon (iOS)
│   ├── icon-192.png    # 192x192 icon
│   ├── icon-384.png    # 384x384 icon
│   └── icon-512.png    # 512x512 icon
└── games/              # Individual mini-game modules
    ├── game1.js        # Money Model 💰
    ├── game2.js        # Repeated Addition ➕
    ├── game3.js        # Ignore the Decimal 🔢
    ├── game4.js        # Visual Blocks 🧱
    ├── game5.js        # Number Line Jumps 📏
    ├── game6.js        # Everyday Examples 🌍
    ├── game7.js        # Estimation Trick 🎯
    ├── game8.js        # Vertical Method 📐
    ├── game9.js        # Friendly Numbers 🤸
    └── game10.js       # Daily Drill ⏱
```

## Architecture

### Module Organization

1. **index.html**: Bootstraps the application
   - Loads CSS and fonts
   - Loads scripts in order: `lang.js` → `app.js` → `games/game1.js`...`game10.js`
   - Calls `_boot()` after all scripts are parsed

2. **lang.js**: Internationalization
   - Single `LANG` object containing all UI text for both languages
   - Structure: `LANG.en` and `LANG.fr` with identical nested keys
   - Game-specific content under `g1`, `g2`, ... `g10`
   - Helper function `t()` returns current language's strings

3. **app.js**: Core Framework
   - **State**: `currentLang`, confetti animation ID
   - **Progress**: localStorage-based persistence (`decimalDash` key)
   - **Router**: `GAME_LOADERS` maps IDs to game loader functions
   - **UI Helpers**: `gameShell()`, `setFeedback()`, `awardStars()`
   - **Visual Effects**: Canvas-based confetti system
   - **Utilities**: `round2()`, `fmtNum()`, `pickProblems()`

4. **games/gameN.js**: Game Modules
   - Each exports a `loadGameN()` function
   - Self-contained: manages its own state, DOM, and event handlers
   - Exposes functions to `window` for inline event handlers
   - Pattern: `render()` → game UI, `check()` → validate answers

### State Management

```javascript
// Progress persistence (localStorage)
{
  "1": 3,  // gameId: stars earned (0-3)
  "2": 2,
  ...
}
```

### Game Loader Convention

Each game file follows this pattern:

```javascript
function loadGameN() {
  // Private state
  let qIdx = 0;
  let problems = [...];
  
  function currentProblem() { ... }
  function render() { /* Build and inject HTML */ }
  function check() { /* Validate, award stars, trigger confetti */ }
  function next() { /* Advance to next problem */ }
  
  // Expose to window for inline handlers
  window.checkGN = check;
  window.nextGN = next;
  
  render(); // Initial render
}
```

## Styling System

### CSS Architecture

- **Design Tokens**: CSS custom properties in `:root`
  - Colors: Purple palette (primary), Gold (accent), Teal, Coral, Green
  - Shadows: Three levels (`--shadow-sm`, `--shadow-md`, `--shadow-lg`)
  - Border radius: sm (8px), md (16px), lg (24px), pill (100px)
  - Typography: Nunito font family

- **Component Classes**:
  - `.game-card` — Home screen game tiles
  - `.instruction-card` — Game instructions
  - `.problem-display` — Question/equation display
  - `.btn`, `.btn-primary`, `.btn-gold`, `.btn-teal` — Button variants
  - `.feedback` — Success/error/info messages

- **Game-Specific**: Each game has dedicated CSS classes (e.g., `.money-workspace`, `.addition-column`)

### Responsive Design

- Mobile breakpoint at `600px`
- Grid becomes 2 columns on mobile
- Flexbox layouts adapt to smaller screens

## Development Conventions

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for strings
- **Functions**: Regular functions (not arrow) for exposed handlers
- **Comments**: Section headers with `/* ===== Title ===== */` style

### Naming Conventions

| Element | Pattern | Example |
|---------|---------|---------|
| Game loader | `loadGameN` | `loadGame1()` |
| Game functions | `gNAction` | `g1AddCoin()`, `checkG1()` |
| Element IDs | `gN-element` | `g1-input`, `g1-fb` |
| CSS classes | kebab-case | `.game-card`, `.problem-display` |

### Adding a New Game

1. Create `games/gameN.js` following the loader pattern
2. Add game metadata to `LANG.en.games` and `LANG.fr.games`
3. Add translations under `LANG.en.gN` and `LANG.fr.gN`
4. Add entry to `GAME_LOADERS` in `app.js`
5. Add `<script src="games/gameN.js"></script>` to `index.html`
6. Add gradient to `CARD_GRADIENTS` array in `app.js`

## Testing

**No automated test suite exists.** Manual testing checklist:

1. Open `index.html` in browser
2. Test language toggle (🇫🇷 FR / 🇬🇧 EN button)
3. Verify progress persistence (complete a game, refresh, stars remain)
4. Test all 10 games:
   - Correct answers award stars and trigger confetti
   - Wrong answers show appropriate feedback
   - "Next" button advances to next problem
5. Test responsive layout at mobile width

## Deployment

### Local Development

```bash
# Simply open in browser
open index.html

# Or serve with any static server
python -m http.server 8000
npx serve .
```

### Production Deployment

Deploy all files to any static hosting:
- GitHub Pages
- Netlify
- Vercel
- Any CDN or web server

**No build step required.**

## Internationalization Guidelines

When adding new text:

1. Add to both `LANG.en` and `LANG.fr`
2. Use functions for dynamic content: `wrong: (ans) => `Not quite. The answer is ${ans}.``
3. Handle number formatting: French uses comma as decimal separator
4. Use `fmtNum()` helper for number display

Example:
```javascript
// In lang.js
g1: {
  enterAns: "Enter total ($)",  // EN
  // ...
  enterAns: "Entrer le total (€)",  // FR
}

// In app.js
currentLang === 'fr' ? fmtNum(total)+' €' : '$'+fmtNum(total)
```

## Security Considerations

- No server-side components — XSS risk is minimal (no user input stored/shown to others)
- localStorage is used only for local progress tracking
- No sensitive data is handled
- External dependency: Google Fonts (consider self-hosting for privacy)

## Progressive Web App (PWA)

Decimal Dash is a fully functional PWA that can be installed on iOS/iPadOS, Android, and desktop devices.

### PWA Features

- **Offline Support**: All game assets are cached locally; works without internet after first load
- **Installable**: Add to Home Screen on mobile devices
- **Standalone Mode**: Runs in full-screen without browser UI when installed
- **Fast Loading**: Cached assets load instantly on subsequent visits

### Installing on iPad

1. Open Safari and navigate to the Decimal Dash URL
2. Tap the **Share** button (square with arrow)
3. Scroll down and tap **Add to Home Screen**
4. Tap **Add** to confirm
5. The app will appear on your home screen like any other app

### Installing on Android

1. Open Chrome and navigate to the Decimal Dash URL
2. Tap the menu (⋮) or look for an "Add to Home screen" prompt
3. Tap **Install** or **Add to Home screen**
4. The app will appear in your app drawer

### Service Worker

The service worker (`sw.js`) caches all necessary assets on first visit:
- HTML, CSS, JavaScript files
- All game modules
- Google Fonts (limited offline support)

When updates are deployed, the service worker will automatically update on the next visit.

## Browser Compatibility

- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES6 features used: `const`, `let`, template literals, arrow functions
- CSS Custom Properties (variables) used extensively
- **PWA Support**: Safari 11.1+ (iOS 11.3+), Chrome 45+, Edge 17+
- No polyfills provided — older browsers not supported
