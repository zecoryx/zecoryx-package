# ⚡ Zecoryx CLI - Professional Project Generator

This CLI tool helps you create professional React and Next.js projects in seconds. Developed by Lazizbek Abdullayev (zecoryx).

## ✨ Features

- 🚀 **Frameworks:** Integration for React (Vite) and Next.js (App Router).
- 🔐 **Authentication:** Ready-to-use setup for Clerk, Supabase, and Firebase.
- 🎨 **UI Libraries:** Tailwind CSS v4 and Chakra UI v3 integration.
- 🧭 **Routing:** Automatic configuration for React Router Dom (for Vite projects).
- 📦 **State Management:** Optional Zustand integration.
- 🌐 **API:** Pre-configured Axios setup.
- 🔔 **Notifications:** Support for react-toastify or sonner.
- 📁 **Structure:** Choose between ZCS (Zecoryx Custom Structure) or Classic structure.
- ⚙️ **Configuration:** Automatic generation of `.env`, `.env.example`, and `git init`.
- 💎 **Visual:** Beautiful ASCII Art logo and colored interface.
- 🔄 **Update Checker:** Notifies you when new versions are available.

## 🚀 Quick Start

You don't even need to install it! Just run:

```bash
npx zecoryx-cli
```

### Or Installation & Usage

If you prefer to install it globally:

```bash
npm install -g zecoryx-cli
zecoryx
```

### Manual Installation (for development):

Clone the project and install dependencies:

## 📂 Project Structure (ZCS)

When ZCS structure is selected, your project will look like this:

```text
src/
├── assets/         # Images and fonts
├── components/     # UI components
│   └── common/     # Shared/Global components
├── hooks/          # Custom hooks
├── pages/          # Page components
├── services/       # API services (Axios)
├── store/          # Global state (Zustand)
├── utils/          # Utility functions
└── main.tsx        # Entry point
```

## 🛠 Technologies used

- [Node.js](https://nodejs.org/)
- [Chalk](https://www.npmjs.com/package/chalk) - For CLI colors.
- [Inquirer](https://www.npmjs.com/package/inquirer) - For interactive prompts.
- [Execa](https://www.npmjs.com/package/execa) - For executing commands.
- [Ora](https://www.npmjs.com/package/ora) - For spinners.
- [Figlet](https://www.npmjs.com/package/figlet) - For ASCII art.

## 👨‍💻 Author

**Lazizbek Abdullayev (Zecoryx)**
- Portfolio: [zecoryx.uz](https://zecoryx.uz)
- GitHub: [@zecoryx](https://github.com/zecoryx)
- Telegram: [@zecoryx](https://t.me/zecoryx)

---

"Programming is an art, and we are the artists." - **Zecoryx**
