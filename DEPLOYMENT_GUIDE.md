# Vercel Deployment Guide

## Automatic Deployment Pipeline Setup

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your `shoulder-season-sightseers` repository
   - Vercel will auto-detect Next.js settings

3. **Configure Project Settings:**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install` (auto-detected)

4. **Deploy:**
   - Click "Deploy"
   - Your site will be live in 2-3 minutes!

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

## Automatic Updates

Once connected, Vercel automatically deploys:

### Main Branch (Production)
- **Trigger**: Any push to `main` branch
- **Action**: Automatic production deployment
- **URL**: Your custom domain (e.g., shoulderseasonsightseers.com)

### Feature Branches (Preview)
- **Trigger**: Any push to other branches
- **Action**: Automatic preview deployment
- **URL**: Unique preview URL for testing

### Pull Requests
- **Trigger**: Opening a PR
- **Action**: Preview deployment with unique URL
- **Benefit**: Test changes before merging

## Workflow

```
Local Changes → Git Commit → Git Push → Vercel Auto-Deploy → Live Site
```

### Example Workflow:
```bash
# 1. Make changes locally
# 2. Test with npm run dev

# 3. Commit changes
git add .
git commit -m "Update photo gallery"

# 4. Push to GitHub
git push origin main

# 5. Vercel automatically deploys (no action needed!)
# 6. Check deployment status at vercel.com/dashboard
```

## Environment Variables (if needed)

If you need environment variables:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables like:
   - `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
   - `NEXT_PUBLIC_SITE_URL`
   - etc.

## Custom Domain Setup

1. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., shoulderseasonsightseers.com)

2. **Update DNS (with your domain provider):**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or add A record pointing to Vercel's IP

3. **SSL Certificate:**
   - Automatically provisioned by Vercel (free)
   - HTTPS enabled automatically

## Deployment Status

### Check Deployment:
- **Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Git Integration**: GitHub shows deployment status on commits
- **Notifications**: Enable Vercel notifications in Settings

### Deployment URLs:
- **Production**: `https://shoulderseasonsightseers.vercel.app` (or your custom domain)
- **Preview**: `https://shoulder-season-sightseers-[hash].vercel.app`

## Build Configuration

Your `vercel.json` is already configured with optimal settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

## Rollback Deployments

If you need to rollback:

1. Go to Vercel Dashboard → Deployments
2. Find the working deployment
3. Click "Promote to Production"

Or via CLI:
```bash
vercel rollback
```

## Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Edge caching
- ✅ Image optimization
- ✅ Automatic HTTPS
- ✅ Serverless functions
- ✅ DDoS protection

## Monitoring

### Analytics (Free):
- Go to Project → Analytics
- Track: Page views, top pages, unique visitors

### Web Vitals:
- Automatically tracked
- View Core Web Vitals in dashboard

## Troubleshooting

### Build Fails:
1. Check build logs in Vercel Dashboard
2. Test build locally: `npm run build`
3. Ensure all dependencies are in `package.json`

### Images Not Loading:
- Check image paths are correct
- Ensure images are committed to Git
- Check `next.config.ts` for image domains

### Environment Variables:
- Add in Vercel Dashboard → Settings → Environment Variables
- Redeploy after adding variables

## Quick Reference Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel list

# View logs
vercel logs [deployment-url]

# Open project in dashboard
vercel open

# Link local project to Vercel project
vercel link
```

## GitHub Actions (Optional Advanced Setup)

If you want more control, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Benefits of Vercel Deployment

1. **Zero Configuration**: Works out of the box with Next.js
2. **Instant Deployments**: Live in ~2 minutes
3. **Automatic HTTPS**: Free SSL certificates
4. **Global CDN**: Fast worldwide
5. **Preview Deployments**: Test before production
6. **Rollbacks**: Easy to revert changes
7. **Analytics**: Built-in performance tracking
8. **Free Tier**: Great for personal projects

## Cost

- **Hobby Plan**: FREE
  - Unlimited deployments
  - 100 GB bandwidth/month
  - Automatic HTTPS
  - Web analytics

- **Pro Plan**: $20/month
  - Everything in Hobby
  - Commercial usage
  - More bandwidth
  - Priority support

Your site should work perfectly on the free Hobby plan!

## Next Steps

1. ✅ Code is ready (optimized and tested)
2. ✅ `vercel.json` is configured
3. 🔲 Push to GitHub
4. 🔲 Connect to Vercel
5. 🔲 Add custom domain (optional)
6. 🔲 Enable analytics

Your site is **production-ready** and optimized for Vercel deployment! 🚀
