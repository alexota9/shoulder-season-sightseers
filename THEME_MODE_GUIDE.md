# Theme Mode Guide

## Alex Mode vs Lissi Mode

Your website now has two theme modes that users can toggle between!

### 🌙 Alex Mode (Dark Theme)
- **Background**: Dark gray (#111827)
- **Text**: Light gray/white (#f3f4f6)
- **Accent Colors**:
  - Teal: #4a8585
  - Coral: #a85c5c
  - Purple: #6b5ca3
  - Gold: #a3865c
- **Style**: Dark, moody, perfect for nighttime browsing

### ☀️ Lissi Mode (Light Theme)
- **Background**: White (#ffffff)
- **Text**: Dark gray (#1f2937)
- **Accent Colors**:
  - Light Green: #5cb85c
  - Light Coral/Pink: #ff9999
  - Light Purple: #9b9bcc
  - Gold: #d4af37
- **Style**: Bright, clean, easy on the eyes during daytime

## How It Works

### Theme Toggle Button
Located in the navigation bar (both mobile and desktop), users can click the button to switch between modes:
- 🌙 Alex - Dark mode
- ☀️ Lissi - Light mode

The theme preference is saved to localStorage, so it persists across page visits!

## Technical Implementation

### Files Created:
1. **`contexts/ThemeContext.tsx`** - React Context for theme state management
2. **`components/ui/ThemeToggle.tsx`** - Toggle button component
3. **`app/globals.css`** - Updated with CSS variables for both themes

### CSS Variables:
```css
/* Alex Mode */
--background: #111827
--foreground: #f3f4f6
--card-bg: #1f2937
--card-border: #374151
--teal: #4a8585
--coral: #a85c5c

/* Lissi Mode */
--background: #ffffff
--foreground: #1f2937
--card-bg: #f9fafb
--card-border: #e5e7eb
--teal: #5cb85c
--coral: #ff9999
```

### Usage in Components:
The theme automatically applies to the entire site through CSS variables. Components inherit the theme colors automatically.

For theme-specific styling, use:
```css
[data-theme="alex"] .alex-only { display: block; }
[data-theme="lissi"] .alex-only { display: none; }
```

## User Experience

1. **First Visit**: Site loads in Alex mode (dark) by default
2. **Toggle Theme**: Click the theme button in nav bar
3. **Persistence**: Theme choice is saved and remembered on return visits
4. **Smooth Transition**: Colors transition smoothly (0.3s ease)

## Future Enhancements

Potential additions:
- System preference detection (prefers-color-scheme)
- More granular color customization
- Additional theme options
- Per-page theme overrides
- Animated theme transitions

## Testing

The theme system has been tested and works across:
- ✅ All pages (home, destinations, gallery, blog, about)
- ✅ Mobile and desktop layouts
- ✅ Static generation and SSR
- ✅ localStorage persistence
- ✅ Smooth color transitions

Enjoy your personalized viewing experience! 🎨
