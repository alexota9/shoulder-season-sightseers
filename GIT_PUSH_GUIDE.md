# How to Push to GitHub

## Quick Commands (Copy and Paste)

### Step 1: Add all your changes
```bash
git add .
```

### Step 2: Commit with a message
```bash
git commit -m "Complete site optimization and Vercel deployment setup"
```

### Step 3: Push to GitHub
```bash
git push origin main
```

## That's it! Your code is now on GitHub 🎉

---

## Detailed Explanation

### What Each Command Does:

1. **`git add .`**
   - Stages ALL your changes (new files, modified files)
   - The `.` means "everything in the current directory"

2. **`git commit -m "your message"`**
   - Saves your changes with a description
   - The message should describe what you changed
   - Example messages:
     - "Add new photos to gallery"
     - "Fix navigation menu"
     - "Update blog post"

3. **`git push origin main`**
   - Uploads your commits to GitHub
   - `origin` = your GitHub repository
   - `main` = your main branch

---

## Troubleshooting

### If you get "Authentication failed":
You need to set up authentication:

**Option 1: Using GitHub CLI (Recommended)**
```bash
gh auth login
```

**Option 2: Using Personal Access Token**
1. Go to GitHub.com → Settings → Developer Settings → Personal Access Tokens
2. Generate new token with "repo" permissions
3. Use token as password when pushing

**Option 3: Using SSH**
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy the public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: Settings → SSH Keys → New SSH Key
```

### If you get "failed to push some refs":
Someone else made changes. Pull first:
```bash
git pull origin main
git push origin main
```

---

## Common Git Commands

### Check status:
```bash
git status
```

### See what changed:
```bash
git diff
```

### View commit history:
```bash
git log --oneline
```

### Undo last commit (keep changes):
```bash
git reset --soft HEAD~1
```

### Discard all local changes:
```bash
git reset --hard HEAD
```

---

## Daily Workflow

```bash
# 1. Make your changes to files

# 2. Check what changed
git status

# 3. Add changes
git add .

# 4. Commit with message
git commit -m "Describe your changes"

# 5. Push to GitHub
git push origin main
```

---

## After Pushing to GitHub

Once you push, if you've connected to Vercel:
1. Vercel automatically detects the push
2. Builds your site (takes ~2 minutes)
3. Deploys to production
4. Your site is live!

Check deployment status at: [vercel.com/dashboard](https://vercel.com/dashboard)

---

## First Time Setup Only

If this is your first time pushing to this repository:

```bash
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check remote URL
git remote -v

# If you need to add remote
git remote add origin https://github.com/yourusername/shoulder-season-sightseers.git
```
