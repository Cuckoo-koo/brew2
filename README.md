# ☕ The Daily Brew — Artisanal Café & Kitchen

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> **"Your Everyday Coffee Destination."**  
> An agency-grade, mobile-first commercial web experience for The Daily Brew — an artisanal coffee shop located in Chennai, India.

---

## 🌟 Key Highlights

- **Cinematic Hero**: Staggered entrance animations powered by Framer Motion, responsive panoramic showcase, and ambient warm lighting.
- **Interactive Menu**: Tabular pricing with live filtering across hot brews, cold brews, artisanal sandwiches, and Belgian desserts.
- **Ambience & Visual Gallery**: Bento grid showcasing the café's interior atmosphere, roasting mastery, booth seating, and remote-friendly features.
- **Table Reservations & Quick Orders**: Full modal workflow with instant feedback toasts.
- **Mobile-First & Touch-Optimized**: Tested from 320px mobile viewports up to 4K displays with 44px+ touch targets and smooth momentum scrolling.
- **Vercel-Ready**: Native SPA routing rewrites configured via `vercel.json` with immutable static asset caching.
- **Code Concealment**: Built-in anti-debugging guard and disabled source maps in production for clean deployment.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (runs on http://localhost:3000)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 📦 How to Link with GitHub & Deploy to Vercel

### Step 1: Create a New Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g. `the-daily-brew`).
3. Leave it public or private, and do **not** initialize with a README (this repository already has everything).
4. Click **Create repository**.

### Step 2: Push Your Code to GitHub
Run the following commands in your terminal from the project folder:

```bash
# Initialize git and stage all files
git init
git add .
git commit -m "feat: complete The Daily Brew café web app"

# Set main branch and link your remote
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/the-daily-brew.git

# Push to GitHub
git push -u origin main
```

*(Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username).*

---

### Step 3: Connect to Vercel (Automatic 1-Click Deploy)
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** → **"Project"** (or visit [vercel.com/new](https://vercel.com/new)).
3. Under **"Import Git Repository"**, find `the-daily-brew` and click **"Import"**.
4. Vercel automatically detects the settings from `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**.

Your website will be live worldwide in ~45 seconds at `https://the-daily-brew.vercel.app` with free SSL and automatic deployments whenever you `git push`.

---

## 📂 Project Architecture

```
├── public/
│   └── assets/aistudio/       # High-resolution café photography & logo
├── src/
│   ├── components/
│   │   ├── Navbar.tsx         # Sticky 3-zone header with active underline
│   │   ├── Hero.tsx           # Full-screen cinematic hero banner
│   │   ├── CafeAmbienceSection.tsx # Split ambience & roasting pillars
│   │   ├── MenuSection.tsx    # Interactive menu cards & category tabs
│   │   ├── CafeGallery.tsx    # Responsive bento visual gallery
│   │   ├── AboutSection.tsx   # Brand philosophy & core pillars
│   │   ├── ContactSection.tsx # Location, hours, directions & inquiry form
│   │   ├── Footer.tsx         # Legal notices, brand mark & copyright
│   │   ├── QuickViewModal.tsx # Item detail popup & barista notes
│   │   ├── ReservationModal.tsx # Table booking modal
│   │   ├── CoffeeLoader.tsx   # 0.9s auto-dismiss brewing splash
│   │   └── CoffeeCursor.tsx   # Desktop amber glow cursor
│   ├── data/
│   │   └── cafeData.ts        # Menu items, pricing, and café metadata
│   ├── pages/
│   │   └── NotFoundPage.tsx   # Themed 404 recovery page
│   ├── utils/
│   │   └── antiDebug.ts       # Source code protection & anti-debugging
│   ├── App.tsx                # App orchestration & routing
│   ├── main.tsx               # Client React entrypoint
│   └── index.css              # Tailwind CSS styling & typography
├── vercel.json                # Vercel SPA rewrites & caching rules
├── vite.config.ts             # Vite build & plugin configuration
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript compilation rules
```

---

## 📄 License

© 2026 The Daily Brew. All Rights Reserved.
