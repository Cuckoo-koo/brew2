# Deploying The Daily Brew to Vercel

This project is fully configured and ready for 1-click deployment on [Vercel](https://vercel.com).

---

## Method 1: Git Integration (Recommended)

1. **Push this repository to GitHub, GitLab, or Bitbucket**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete The Daily Brew café application"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/the-daily-brew.git
   git push -u origin main
   ```

2. **Import into Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your Git provider and import `the-daily-brew`.
   - Vercel automatically detects the preset from `vercel.json`:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   - Click **Deploy**.

Your website will be live at `https://the-daily-brew-xxx.vercel.app` in under 60 seconds.

---

## Method 2: Vercel CLI (Instant Terminal Deploy)

If you have the Vercel CLI installed:

```bash
# 1. Install Vercel CLI globally (if not already installed)
npm install -g vercel

# 2. Login to your Vercel account
vercel login

# 3. Deploy to preview
vercel

# 4. Deploy to production
vercel --prod
```

---

## Key Configurations Included

- **`vercel.json`**:
  - Configures Single Page Application (SPA) routing with rewrite rule `/(.*) -> /index.html`, ensuring that direct navigation (e.g. refreshing on sub-paths or accessing 404 pages) works cleanly without edge server 404s.
  - Implements immutable HTTP caching headers for production assets under `/assets/*`.
- **`vite.config.ts`**:
  - Full native ESM path resolution without deprecated `__dirname` warnings.
- **`.gitignore`**:
  - Excludes `.vercel`, `dist`, `node_modules`, and local env files.
