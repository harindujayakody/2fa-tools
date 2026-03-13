<div align="center">

<img src="https://img.shields.io/badge/2FA.tools-Online%20TOTP%20Generator-black?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSd3aGl0ZScgc3Ryb2tlLXdpZHRoPScyJyBzdHJva2UtbGluZWNhcD0ncm91bmQnPjxyZWN0IHg9JzInIHk9JzInIHdpZHRoPScyMCcgaGVpZ2h0PScyMCcgcng9JzUnLz48cGF0aCBkPSdNNyA4aDEwTTcgMTJoMTBNNyAxNmg2Jy8+PC9zdmc+" alt="2FA.tools"/>

# 2FA.tools — Online TOTP Code Generator

**Generate time-based 2FA codes instantly in your browser.**  
No app. No server. No tracking. Just paste your secret key and get your code.

<br/>

[![Live Demo](https://img.shields.io/badge/🔐_Live_Demo-Visit_Site-black?style=for-the-badge)](https://harindujayakody.github.io/2fa-tools/)
[![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-222?style=for-the-badge&logo=github)](https://harindujayakody.github.io/2fa-tools/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Web Crypto API](https://img.shields.io/badge/Web_Crypto_API-4CAF50?style=flat-square&logo=googlechrome&logoColor=white)
![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-blue?style=flat-square)
![Made with Claude](https://img.shields.io/badge/Made_with-Claude_Sonnet_4.6-D97706?style=flat-square&logo=anthropic&logoColor=white)

<br/>

[<img width="680" alt="2FA.tools screenshot" src="https://harindujayakody.github.io/2fa-tools/screenshots/splash.png"/>](https://harindujayakody.github.io/2fa-tools/screenshots/splash.png)

</div>

---

## ✨ Features

- 🔐 **Instant code generation** — paste your Base32 secret key and get your 6-digit code immediately
- 🔁 **Live countdown timer** — codes auto-refresh every 30 seconds with a visual ring timer
- 📋 **One-click copy** — click the copy button on any code row to copy to clipboard
- 📦 **Multi-key support** — enter multiple secret keys (one per line) to generate codes for all your accounts at once
- 🌗 **Dark & Light mode** — toggle between themes; preference is saved locally
- 🔒 **100% private** — everything runs in your browser using the Web Crypto API; nothing is ever sent to a server
- 📱 **Responsive design** — works on desktop, tablet, and mobile
- ⚡ **Zero dependencies** — no npm, no build step, no frameworks; a single HTML file

---

## 🚀 How It Works

### The TOTP Standard (RFC 6238)

2FA.tools implements **TOTP — Time-based One-Time Password** as defined in [RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238). This is the same algorithm used by Google Authenticator, Authy, and every major authenticator app.

Here's the step-by-step flow:

```
Secret Key (Base32)
       │
       ▼
  Decode to raw bytes
       │
       ▼
  HMAC-SHA1(key, counter)     ← counter = floor(unix_time / 30)
       │
       ▼
  Dynamic Truncation          ← extract 4 bytes at offset
       │
       ▼
  code = truncated_value % 1,000,000
       │
       ▼
  Zero-pad to 6 digits  →  🔐 Your Code
```

### Time Window

Each code is valid for **30 seconds**. The counter is computed as:

```
counter = Math.floor(Date.now() / 1000 / 30)
```

This means all devices with accurate clocks generate the same code at the same moment — no server coordination needed.

---

## 🛠 Technology

| Technology | Purpose |
|---|---|
| **HTML5** | Structure and markup |
| **CSS3** (Custom Properties) | Theming, dark/light mode, animations |
| **Vanilla JavaScript** | Application logic, DOM manipulation |
| **Web Crypto API** (`crypto.subtle`) | HMAC-SHA1 computation — native browser crypto, no library needed |
| **Base32 Decoding** | Pure JS implementation to decode secret keys per RFC 4648 |
| **LocalStorage** | Persisting the user's dark/light mode preference |
| **Google Fonts** | Inter (UI) + JetBrains Mono (codes) |

### Why no libraries or frameworks?

This tool intentionally uses **zero external dependencies** for three reasons:

1. **Security** — No third-party code means no supply chain risk. You can audit every line.
2. **Portability** — A single `.html` file works anywhere: GitHub Pages, local file system, a USB stick.
3. **Performance** — Instant load, no bundler, no hydration, no JavaScript framework overhead.

---

## 📐 Architecture

```
index.html
├── <head>
│   ├── SEO meta tags (Open Graph, Twitter Card, canonical)
│   ├── Favicon (inline SVG data URI — no external file)
│   ├── Google Fonts (Inter + JetBrains Mono)
│   └── <style>  ← all CSS in one block, CSS variables for theming
│
├── <body>
│   ├── <nav>       ← logo, GitHub link, theme toggle
│   ├── .header     ← title, subtitle, live badge
│   ├── .card       ← textarea input + generate button
│   ├── #results    ← dynamically rendered code rows
│   ├── .security-note
│   ├── .faq-section
│   └── <footer>    ← credits + GitHub link
│
└── <script>
    ├── Theme init & toggle (reads localStorage)
    ├── FAQ accordion
    ├── base32ToBytes()   ← RFC 4648 Base32 decoder
    ├── totp()            ← RFC 6238 TOTP via Web Crypto API
    ├── generateCodes()   ← reads textarea, starts interval
    └── renderAll()       ← efficient DOM update every second
```

---

## 🔒 Security & Privacy

| Concern | How it's handled |
|---|---|
| **Key transmission** | Keys never leave the browser — no network requests are made |
| **Crypto implementation** | Uses the browser's native `crypto.subtle` (HMAC-SHA1) — not a JavaScript reimplementation |
| **Storage** | Secret keys are **not** stored anywhere (not localStorage, not sessionStorage) |
| **Third-party code** | Only Google Fonts is loaded externally (for typography only, carries no keys) |
| **Open source** | Full source is a single readable HTML file — audit it yourself |

> ⚠️ **Tip:** For maximum security, you can download `index.html` and open it as a local file (`file://`) with no internet connection required.

---

## 📦 Getting Started

### Use online
Visit **[harindujayakody.github.io/2fa-tools](https://harindujayakody.github.io/2fa-tools/)** — no installation needed.

### Run locally

```bash
# Clone the repo
git clone https://github.com/harindujayakody/2fa-tools.git

# Open in browser — that's it. No build step needed.
open index.html
```

### Self-host on GitHub Pages

1. Fork this repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)`
4. Your site will be live at `https://yourusername.github.io/2fa-tools/`

---

## 🧪 How to Use

1. **Find your secret key** — when setting up 2FA on any service, look for the option to view the manual setup key. It's a Base32 string like `JBSWY3DPEHPK3PXP`.

2. **Paste it in** — enter one or more secret keys in the text area, one per line.

3. **Click "Get 2FA codes"** — your current 6-digit codes appear instantly.

4. **Copy and log in** — click the copy button next to any code, then paste it into the 2FA field on your service.

> The circular timer shows how many seconds remain before the code refreshes. A new code is ready automatically — no need to click again.

---

## 📷 Screenshots

[<img width="680" alt="2FA.tools screenshot" src="https://harindujayakody.github.io/2fa-tools/screenshots/app.png"/>](https://harindujayakody.github.io/2fa-tools/screenshots/app.png)
---

## 🤝 Compatible With

Any service that uses standard **TOTP (RFC 6238)** authentication, including:

`Google` · `GitHub` · `Facebook` · `Twitter / X` · `Discord` · `Fortnite` · `Epic Games` · `Microsoft` · `Amazon` · `Dropbox` · `Stripe` · `Cloudflare` · `Binance` · `Coinbase` · and thousands more.

---

## 📄 License

MIT License © 2025 [Harindu Jayakody](https://github.com/harindujayakody)

See [LICENSE](LICENSE) for full text.

---

## 🙏 Credits

<div align="center">

Made with ❤️ by **[Harindu Jayakody](https://github.com/harindujayakody)**

Built with **[Claude Sonnet 4.6](https://www.anthropic.com/claude)** by Anthropic

[![GitHub](https://img.shields.io/badge/GitHub-harindujayakody-181717?style=flat-square&logo=github)](https://github.com/harindujayakody)
[![Anthropic Claude](https://img.shields.io/badge/AI-Claude_Sonnet_4.6-D97706?style=flat-square&logo=anthropic&logoColor=white)](https://www.anthropic.com/claude)

*If this tool saved you time, consider giving it a ⭐ on GitHub!*

</div>
