# Kira Art Design — Interactive Showcase

Mobile-first, 3-language showcase web app for Kira Art Design (Tajikistan software agency).
Three live industry demos (Language School, Supermarket POS, Booking & Digital Menu) linked to a printed QR code flyer.

- **Stack:** React 19 + Vite + Tailwind + Framer Motion + Recharts + i18next (EN / RU / TJ)
- **Zero external images** — all visuals use emoji / inline SVG / CSS for fast 3G loads.
- Routes: `/` (Home) · `/demos` (tabbed showcase).

## Local development

```bash
npm install
cp .env.example .env     # optional – defaults are baked in
npm run dev              # http://localhost:5173
```

## Build

```bash
npm run build            # outputs to ./dist
npm run preview          # local preview of production build
```

## Deployment

### A. GitHub Pages (free, recommended)

```bash
git init && git add . && git commit -m "init"
git remote add origin https://github.com/USERNAME/kira-showcase
git push -u origin main
```

Then in your GitHub repo → **Settings → Pages → Source: GitHub Actions**.
The workflow at `.github/workflows/deploy.yml` builds and publishes automatically on every push to `main`.

Live URL: `https://USERNAME.github.io/kira-showcase`

### B. Firebase Hosting (custom domain support)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting      # pick kira-showcase project
npm run deploy:firebase
```

Add a custom domain at firebase.google.com → Hosting → Custom domains.

### C. Render.com (zero config)

- Connect the GitHub repo on render.com.
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- Auto-deploys on every git push.

### D. QR code generation

1. Pick your live URL (GH Pages, Firebase, or custom domain).
2. Go to [qr.io](https://qr.io) or [qrcode-monkey.com](https://qrcode-monkey.com).
3. Paste the URL, download SVG/PNG at 1000×1000 px minimum.
4. Use it on printed flyers.

## Environment variables

Copy `.env.example` → `.env` and adjust:

| Var                       | Default            | Purpose                               |
|---------------------------|--------------------|---------------------------------------|
| `VITE_WHATSAPP_NUMBER`    | `992172594774`     | WhatsApp CTA + floating button        |
| `VITE_TELEGRAM_HANDLE`    | `kiraartdesign`    | Telegram link                         |
| `VITE_CONTACT_PHONE`      | `+992172594774`    | `tel:` link                           |

## Project structure

```
src/
├── i18n/             # i18next + en/ru/tj locales
├── components/
│   ├── layout/       # Navbar, Footer, TabBar
│   ├── ui/           # Button, Badge, Modal, StatCard, AnimatedCounter
│   └── shared/       # LangSwitcher, RoleToggle, WhatsAppCTA, ErrorBoundary
├── demos/
│   ├── school/       # StudentTable, Leaderboard, HomeworkTracker, PaymentUpload
│   ├── supermarket/  # BarcodeScanner, InventoryTable, RevenueChart
│   └── booking/      # AppointmentCalendar, MenuOrder, NotificationSim
├── pages/            # Home, Showcase
├── data/             # Mock data (students, inventory, appointments, menu)
└── hooks/            # useAnimatedCount
```

Each demo tab is lazy-loaded via `React.lazy` + `Suspense` to keep the initial bundle lean.

---

Built with ❤ in Tajikistan by Kira Art Design.
