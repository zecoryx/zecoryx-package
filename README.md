# ⚡ Zecoryx CLI - Professional Project Generator

**Zecoryx CLI** is a powerful, professional-grade scaffolding tool designed to jumpstart your modern web development workflow. Whether you're building a lightweight React app or an enterprise-scale Next.js application, Zecoryx has you covered.

Developed by **Lazizbek Abdullayev (zecoryx)**.

---

## ✨ Key Features

- 🏗️ **Framework Support:** Choose between **React (Vite)** and **Next.js (App Router)**.
- 🎨 **UI Libraries:** Support for **Tailwind CSS v4** and **Chakra UI v3**. Switch between them seamlessly.
- 🔐 **First-Class Auth:** Built-in support for **Clerk**, **Supabase**, and **Firebase**.
- 🛠️ **Developer Experience:**
  - **Icons:** Choose between `react-icons` and `lucide-react`.
  - **State Management:** Integrated `Zustand` setup.
  - **Networking:** Pre-configured `Axios` instance.
  - **Notifications:** Integrated `Sonner` or `React-Toastify`.
- 📂 **Flexible Structure:** Choose between **ZCS (Zecoryx Component System)** for organized architecture or **Classic** for simpler projects.
- 💎 **Visual Excellence:** A beautiful command-line interface with ASCII art and clear, colored logging.
- 🔄 **Update Checker:** Automatically stay up-to-date with the latest features.

---

## 🚀 Quick Start

No installation required! Simply run:

```bash
npx zecoryx-cli
```

### Alternatively, Install Globally

```bash
npm install -g zecoryx-cli
zecoryx
```

### For Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zecoryx/zecoryx-tools.git
   cd zecoryx-tools
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run in dev mode:**
   ```bash
   npm run dev
   ```

---

## 📂 Project Structures

### ZCS (Zecoryx Component System)

Designed for scalability and maintainability with organized feature-based architecture.

### Classic

Simple and straightforward structure for smaller projects.

---

## 🛠 Technologies Used

- [Node.js](https://nodejs.org/) - Runtime environment
- [Chalk](https://www.npmjs.com/package/chalk) - Terminal colors
- [Inquirer](https://www.npmjs.com/package/inquirer) - Interactive prompts
- [Execa](https://www.npmjs.com/package/execa) - Command execution
- [Ora](https://www.npmjs.com/package/ora) - Elegant spinners
- [Figlet](https://www.npmjs.com/package/figlet) - ASCII art

---

## 🔧 Troubleshooting

### Tailwind CSS v4 Not Working

Make sure the following files are created:

- `postcss.config.js` - Required for Tailwind v4
- `vite.config.js` - Should include `tailwindcss()` plugin
- `src/index.css` - Should have `@import "tailwindcss";`

### Project Already Exists Error

Remove the existing directory or choose a different project name:

```bash
rm -rf your-project-name
```

### Dependencies Installation Failed

If automatic installation fails, install manually:

```bash
cd your-project-name
npm install
```

---

## 👨‍💻 Author

**Lazizbek Abdullayev (Zecoryx)**

- Portfolio: [zecoryx.uz](https://zecoryx.uz)
- GitHub: [@zecoryx](https://github.com/zecoryx)
- Telegram: [@zecoryx](https://t.me/zecoryx)

---

## 📄 License

MIT © Lazizbek Abdullayev

---

_"Programming is an art, and we are the artists."_ - **Zecoryx**
