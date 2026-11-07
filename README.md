<div align="center">

<img src="https://img.shields.io/badge/2FA.tools-Online%20TOTP%20Generator-black?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSd3aGl0ZScgc3Ryb2tlLXdpZHRoPScyJyBzdHJva2UtbGluZWNhcD0ncm91bmQnPjxyZWN0IHg9JzInIHk9JzInIHdpZHRoPScyMCcgaGVpZ2h0PScyMCcgcng9JzUnLz48cGF0aCBkPSdNNyA4aDEwTTcgMTJoMTBNNyAxNmg2Jy8+PC9zdmc+" alt="2FA.tools"/>

# 2FA.tools | Online TOTP Code Generator

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

<br/>

[<img width="680" alt="2FA.tools screenshot" src="https://harindujayakody.github.io/2fa-tools/screenshots/splash.png"/>](https://harindujayakody.github.io/2fa-tools/screenshots/splash.png)

</div>

---

## ✨ Features

- 🔐 **Instant code generation** — paste your Base32 secret key and get your 6-digit code immediately
- 🔁 **Live countdown timer** — codes auto-refresh every 30 seconds with a visual ring timer
- 📋 **One-click copy** — click the copy button on any code row to copy to clipboard
- 📦 **Multi-key support** — enter multiple secret keys (one per line) to generate codes for all your accounts at once
- 🧹 **Memory & DOM sanitization**:
  - Visible **Clear all** button to immediately wipe secrets and generated codes
  - Automatic memory wipe after **5 minutes of user inactivity**
  - Auto-wipe when the tab is hidden for more than 2 minutes or upon navigation
- 🛡️ **Hardened Web Security**:
  - Strict **Content Security Policy (CSP)**
  - Subresource Integrity (SRI) on external stylesheets
- 🌗 **Dark & Light mode** — toggle between themes; preference is saved locally
- 🔒 **100% private** — everything runs in your browser using the Web Crypto API; nothing is ever sent to a server
- 📱 **Responsive design** — works on desktop, tablet, and mobile
- ⚡ **Zero dependencies** — no npm, no build step, no frameworks; a single HTML file

---

## 🚀 How It Works

### The TOTP Standard (RFC 6238)

2FA.tools implements **TOTP — Time-based One-Time Password** as defined in [RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238). This is the same algorithm used by Google Authenticator, Authy, and every major authenticator app.

---

## 🧪 Testing

Run the automated test suite with Node.js:

```bash
node test.js
```

The test suite validates RFC 6238 test vectors, Base32 decoding, padding handling, and error cases.

---

## 🤝 Compatible With

Any service that uses standard **TOTP (RFC 6238)** authentication, including:

`Google` · `GitHub` · `Facebook` · `Twitter / X` · `Discord` · `Fortnite` · `Epic Games` · `Microsoft` · `Amazon` · `Dropbox` · `Stripe` · `Cloudflare` · `Binance` · `Coinbase` · and thousands more.

---

## 📄 License

MIT License © 2026 [Harindu Jayakody](https://github.com/harindujayakody)

See [LICENSE](LICENSE) for full text.

---

## 🙏 Credits

<div align="center">

Made with ❤️ by **[Harindu Jayakody](https://github.com/harindujayakody)**

[![GitHub](https://img.shields.io/badge/GitHub-harindujayakody-181717?style=flat-square&logo=github)](https://github.com/harindujayakody)

*If this tool saved you time, consider giving it a ⭐ on GitHub!*

</div>
