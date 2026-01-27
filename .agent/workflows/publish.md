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
   Terminalda quyidagi buyruqni bering:
   ```bash
   npm publish
   ```
   *Sizdan 2FA (Two-Factor Authentication) kodi so'raladi. Authenticator ilovangizdagi yoki emailingizga kelgan 6 xonali kodni kiriting.*

   Agar avtomatik so'ramasa, mana bunday urinib ko'ring:
   ```bash
   npm publish --otp=XXXXXX
   ```
   *(Bu yerda XXXXXX - sizning 2FA kodingiz)*

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
