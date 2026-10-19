# Eslam — VIP Invitation Card Designs

**Live:** https://eslam-invitation-card-vip-designs.vercel.app

## بالعربي
- اختار التصميم من السلايدر، وبعدها اختار اللقب من القائمة أو اكتبه يدويًا، واكتب اسم المدعو.
- **مشاركة**: بتفتح قائمة فيها:
  - **كل التطبيقات**: قائمة المشاركة بتاعة الجهاز (واتساب، تليجرام، إنستجرام، ماسنجر، جيميل… أي تطبيق متسطب).
  - **واتساب صورة**: بتبعت الكارت كصورة عادية من غير نص. على الكمبيوتر بتنسخ الصورة وتفتح واتساب ويب، وتلصقها بـ Ctrl+V.
  - **نسخ الصورة** و**تنزيل**.
  - **نص الدعوة ولينك اللوكيشن** على واتساب، تليجرام، فيسبوك، X، إيميل، SMS، أو نسخ النص.
- **تنزيل**: بتحفظ الكارت على جهازك. **الكل ZIP**: بتنزّل الـ16 تصميم في ملف واحد.
- المقاسات الجاهزة: واتساب/إنستجرام 4:5، حالة/ستوري 9:16، مربع، شاشة 16:9، طباعة A5، وكمان مقاس مخصص.

### تعديل نصوص الكارت
في آخر الصفحة فيه صندوق **«نصوص الكارت»** فيه كل النصوص ولينك اللوكيشن:
- عدّل أي حاجة واضغط **«حفظ وتطبيق»**، والنصوص هتتغير في كل الكروت وهتفضل محفوظة على الجهاز.
- **«رجوع للنصوص الأصلية»** بترجّع النصوص اللي في `content.json`.
- تقدر كمان تستورد أو تصدّر ملف `content.json`.
- `mapUrl` هو لينك الموقع، والباركود بيتعمل منه تلقائيًا.

## English
- Pick a design, choose or type the title, then type the guest name.
- **Share** opens a sheet: the device share sheet (every installed app), a WhatsApp option that sends the image alone as a normal message, copy image, download, and the invitation text with the location link for WhatsApp, Telegram, Facebook, X, Email and SMS.
- **Card texts** (bottom of the page): edit every text and the location link, then **Save & apply**. **Reset** restores `content.json`.

## Development
```bash
node build.mjs         # builds dist/ (inlined CSS, fingerprinted JS)
npx serve dist         # or any static server
```
No dependencies. Vercel runs `node build.mjs` and serves `dist/` (see `vercel.json`).

## Structure
```
index.html              ← page + SEO meta, Open Graph, JSON-LD
content.json            ← original card texts (Arabic)
assets/css/             ← page design + local fonts
assets/js/designs.js    ← 16 card designs + canvas renderer
assets/js/app.js        ← page logic, sizes, share sheet, texts editor, i18n
assets/js/vendor/       ← qrcode-generator, JSZip (loaded only for ZIP)
assets/logos/           ← brand logos (favicon, header, footer)
assets/img/             ← OG image and app icons
build.mjs, vercel.json  ← build and hosting config
```

---
Designed & developed by **Eslam Afify Barakat**.
