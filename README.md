# 🎮 Decimal Dash

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

An interactive bilingual educational web application designed to teach children decimal multiplication through 10 engaging mini-games. Built with vanilla JavaScript—no frameworks, no build tools, just pure web standards.

![Decimal Dash Screenshot](icons/icon-512.png)

## 🌟 Features

- **10 Interactive Mini-Games** covering different aspects of decimal multiplication
- **Bilingual Support** — Switch between English and French at any time
- **Progress Tracking** — Visual stars show completion progress for each game
- **Progressive Web App (PWA)** — Install on your device and use offline
- **No Installation Required** — Works in any modern browser
- **Child-Friendly Design** — Colorful, engaging interface with immediate feedback
- **Mobile Responsive** — Play on desktop, tablet, or phone

## 🎯 The 10 Learning Methods

| Game | Title | Method |
|------|-------|--------|
| 💰 | **Money Model** | Use dollars and cents to understand decimal multiplication |
| ➕ | **Repeated Addition** | See how multiplication is repeated addition |
| 🔢 | **Ignore the Decimal** | Multiply as whole numbers, then place the decimal |
| 🧱 | **Visual Blocks** | Use area models and visual representations |
| 📏 | **Number Line Jumps** | Jump along the number line to visualize scaling |
| 🌍 | **Everyday Examples** | Real-world problems you encounter daily |
| 🎯 | **Estimation Trick** | Quickly estimate before calculating exactly |
| 📐 | **Vertical Method** | Traditional column multiplication technique |
| 🤸 | **Friendly Numbers** | Use easy numbers to simplify calculations |
| ⏱️ | **Daily Drill** | Speed challenge to build fluency |

## 🚀 Getting Started

### Option 1: Open Directly
Simply open `index.html` in your web browser—no server required!

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

### Option 2: Local Development Server
```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .

# PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

### Option 3: Install as PWA
1. Open the app in Safari (iOS) or Chrome (Android/Desktop)
2. Tap the Share menu (iOS) or menu button (Android)
3. Select "Add to Home Screen" or "Install"
4. Launch as a standalone app!

## 📁 Project Structure

```
decimal-multiply/
├── index.html          # Entry point
├── app.js              # Core application logic
├── lang.js             # Bilingual translations (EN/FR)
├── style.css           # Complete design system
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker for offline support
├── icons/              # App icons (72px - 512px)
└── games/              # Mini-game modules
    ├── game1.js        # Money Model
    ├── game2.js        # Repeated Addition
    ├── game3.js        # Ignore the Decimal
    ├── game4.js        # Visual Blocks
    ├── game5.js        # Number Line Jumps
    ├── game6.js        # Everyday Examples
    ├── game7.js        # Estimation Trick
    ├── game8.js        # Vertical Method
    ├── game9.js        # Friendly Numbers
    └── game10.js       # Daily Drill
```

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Vanilla JavaScript (ES6+) |
| **Markup** | HTML5 |
| **Styling** | CSS3 with Custom Properties |
| **Dependencies** | None! |
| **Fonts** | Google Fonts (Nunito) |

## 🎨 Design System

- **Primary Colors**: Purple palette with gold accents
- **Typography**: Nunito — friendly, rounded typeface
- **Spacing**: Consistent 8px grid
- **Shadows**: Three levels for depth
- **Border Radius**: 8px (small) to 24px (large) to pill shapes

## 🌐 Browser Compatibility

- Chrome/Edge 45+
- Firefox 44+
- Safari 11.1+ (iOS 11.3+)
- Any modern browser with ES6 support

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **Design & Development**: Built with ❤️ for young learners everywhere
- **Icons**: Emoji icons for universal recognition
- **Font**: [Nunito](https://fonts.google.com/specimen/Nunito) by Vernon Adams

## 🤝 Contributing

Contributions are welcome! This project intentionally keeps things simple—no build steps, no dependencies. If you'd like to add a new game or improve existing ones:

1. Fork the repository
2. Create your feature branch
3. Follow the existing code style (2-space indentation, single quotes)
4. Test in both English and French
5. Submit a pull request

---

**Happy Learning!** 🌟

*Decimal Dash — Making decimal multiplication fun, one game at a time.*
