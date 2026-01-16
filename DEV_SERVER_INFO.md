# Development Server Information

## Current Status
Your dev server is currently running on port **3002**

## How to Access Your Site

Open your browser and go to:
- **Local**: http://localhost:3002
- **Network**: http://192.168.86.52:3002

## Troubleshooting

### Site Not Loading?

1. **Check if server is running:**
   ```bash
   netstat -ano | findstr :3002
   ```

2. **Restart the server:**
   - Press `Ctrl+C` in the terminal where dev server is running
   - Then run: `npm run dev`

3. **Try different browser:**
   - Chrome: http://localhost:3002
   - Edge: http://localhost:3002
   - Firefox: http://localhost:3002

4. **Clear browser cache:**
   - Press `Ctrl+Shift+Delete`
   - Clear cached files
   - Refresh page with `Ctrl+F5`

### Common Issues

**Issue**: "This site can't be reached"
- **Solution**: Make sure dev server is running (`npm run dev`)

**Issue**: "Port already in use"
- **Solution**: Kill existing process or use different port
  ```bash
  npm run dev -- -p 3001
  ```

**Issue**: Theme toggle not appearing
- **Solution**: Hard refresh the page (`Ctrl+F5`) to clear cache

**Issue**: Changes not showing
- **Solution**:
  1. Save all files
  2. Wait for "✓ Compiled" message in terminal
  3. Refresh browser

## Testing the Theme Toggle

Once the site loads:
1. Look for the theme toggle button in the navigation bar
2. It will show either:
   - 🌙 **Alex** (dark mode - current default)
   - ☀️ **Lissi** (light mode)
3. Click it to switch between themes
4. Your choice is saved automatically!

## Server Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Run linter
npm run lint
```

## Network Access

You can also access the site from other devices on your network:
- **From phone/tablet**: http://192.168.86.52:3002
- **From another computer**: http://192.168.86.52:3002

Perfect for testing mobile responsiveness!
