# Quick Start - Deploy to Vercel

## Fastest Way (5 minutes)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Sign in with GitHub
3. Click "Import" on your `shoulder-season-sightseers` repository
4. Click "Deploy" (Vercel auto-detects everything!)

### Step 3: Done! 🎉
Your site is live at `https://shoulder-season-sightseers.vercel.app`

## Automatic Updates
From now on, every time you push to GitHub:
```bash
git add .
git commit -m "Update content"
git push origin main
```
Vercel automatically rebuilds and deploys your site!

## Add Custom Domain (Optional)
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add `shoulderseasonsightseers.com`
3. Update DNS with your domain provider

## That's It!
- ✅ Automatic deployments on every push
- ✅ HTTPS enabled
- ✅ Global CDN
- ✅ Free hosting

For detailed instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
