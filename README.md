# ⚡ Zecoryx React Vite project generator

Ushbu CLI vositasi professional React loyihalarini bir necha soniya ichida yaratishga yordam beradi. Lazizbek Abdullayev (zecoryx) tomonidan ishlab chiqilgan.

## ✨ Xususiyatlari

- 🚀 **Frameworklar:** React (Vite) va Next.js (App Router) integratsiyasi.
- 🔐 **Authentication:** Clerk, Supabase va Firebase uchun tayyor setup.
- 🎨 **UI Kutubxonalar:** Tailwind CSS v4 va Chakra UI v3 integratsiyasi.
- 🧭 **Routing:** React Router Dom (Vite uchun) avtomatik sozlanishi.
- 📦 **State Management:** Zustand qo'shish imkoniyati.
- 🌐 **API:** Axios setupi.
- 🔔 **Notifications:** react-toastify yoki sonner.
- 📁 **Struktura:** ZCS (Zecoryx Custom Structure) yoki Classic strukturani tanlash.
- ⚙️ **Konfiguratsiya:** `.env`, `.env.example`, `git init` avtomatik yaratiladi.
- 💎 **Visual:** Chiroyli ASCII Art va rangli interfeys.
- 🔄 **Update Checker:** Yangi versiyalar haqida eslatma.

## 🚀 O'rnatish va Ishlatish

Loyihani klon qiling va dependency'larni o'rnating:

```bash
git clone https://github.com/zecoryx/zecoryx-tools.git
cd zecoryx-tools
npm install
```

### CLI ni ishga tushirish:

```bash
npm start
```

Yoki global o'rnatish uchun:

```bash
npm link
zecoryx
```

## 📂 Loyiha Strukturasi (ZCS)

ZCS strukturasi tanlanganda loyiha quyidagicha ko'rinishga ega bo'ladi:

```text
src/
├── assets/         # Rasmlar va shriftlar
├── components/     # UI komponentlar
│   └── common/     # Umumiy komponentlar
├── hooks/          # Custom hooks
├── pages/          # Sahifalar
├── services/       # API services (Axios)
├── store/          # Global state (Zustand)
├── utils/          # Yordamchi funksiyalar
└── main.tsx        # Kirish fayli
```

## 🛠 Texnologiyalar

- [Node.js](https://nodejs.org/)
- [Chalk](https://www.npmjs.com/package/chalk) - CLI ranglari uchun.
- [Inquirer](https://www.npmjs.com/package/inquirer) - Interaktiv savollar uchun.
- [Execa](https://www.npmjs.com/package/execa) - Komandalarni bajarish uchun.
- [Ora](https://www.npmjs.com/package/ora) - Spinnerlar uchun.

## 👨‍💻 Muallif

**Lazizbek Abdullayev (Zecoryx)**
- Portfolio: [zecoryx.uz](https://zecoryx.uz)
- GitHub: [@zecoryx](https://github.com/zecoryx)
- Telegram: [@zecoryx](https://t.me/zecoryx)

---

"Dasturlash - bu san'at, biz esa uning rassomimiz." - **Zecoryx**
