---
description: Loyihani npm da yangilash (publish)
---

# NPM ga yangi versiyani chiqarish

Loyihangizni npm da yangilash uchun quyidagi qadamlarni bajaring:

1. **Kirish (Agar kirilmagan bo'lsa):**
   ```bash
   npm login
   ```
   *Bu sizning brauzeringizda npm saytini ochadi va sizdan tizimga kirishingizni so'raydi.*

2. **Versiyani tekshirish:**
   Siz allaqachon `package.json` da versiyani `1.1.3` ga o'zgartirdingiz. Bu juda yaxshi.

3. **Nashr qilish (Publish):**
   Avval tizimga kirganingizni tekshiring:
   ```bash
   npm whoami
   ```
   *(Bu sizning username'ingizni chiqarishi kerak. Agar xato bersa, `npm login` qiling).*

   Keyin nashr qiling:
   ```bash
   npm publish --otp=123456
   ```
   *Eslatma: OTP kodi faqat 6 ta raqamdan iborat bo'lishi kerak. Uni Google Authenticator ilovasidan oling.*

### 403 Forbidden xatosi davom etsa:
1. **Kod muddati:** OTP kodlari juda tez (30 soniya) eskiradi. Yangi kod chiqqan zahoti tezda terminalga yozing.
2. **Clock Desync:** Telefoningiz va kompyuteringizdagi soat (`vakt`) bir xil va aniq ekanligini tekshiring. 1-2 soniya farq ham kodni rad etishiga sabab bo'ladi.
3. **Recovery Codes ishlamaydi:** Siz 8 xonali recovery kod emas, aynan 6 xonali OTP kodini ishlatishingiz kerak.

# GitHub ga push qilish

Agar kodlarni GitHub da saqlamoqchi bo'lsangiz, quyidagi komandalar ketma-ketligini terminalda ishlating:

1. **Git ni sozlash:**
   ```bash
   git init
   git add .
   git commit -m "v1.1.3: Next.js va Authentication qo'shildi"
   ```

2. **GitHub repoga bog'lash:**
   *(GitHub da yangi repo oching va uning linkini pastdagiga almashtiring)*
   ```bash
   git remote add origin https://github.com/zecoryx/zecoryx-tools.git
   git branch -M main
   git push -u origin main
   ```

4. **Agar bu scoped package bo'lsa (masalan @zecoryx/tools):**
   ```bash
   npm publish --access public
   ```

> [!TIP]
> **Push qilish (GitHub):** 
> Kodlarni GitHub ga ham push qilishni unutmang:
> ```bash
> git add .
> git commit -m "v1.1.3: Bug fixes and improvements"
> git push origin main
> ```
