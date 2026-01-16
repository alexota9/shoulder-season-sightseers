# Photo Guide for Triples Travel

This guide will help you add your actual travel photos to replace the placeholder images.

## 📸 Photo Requirements

### Recommended Specifications
- **Format**: JPG or WebP (for best performance)
- **Size**: 1920px wide (max) - Next.js will optimize automatically
- **File size**: Under 1MB per photo (compress if needed)
- **Naming**: Use descriptive names like `morocco-chefchaouen-blue-streets.jpg`

### Compression Tools
- [TinyPNG](https://tinypng.com/) - Free online compression
- [Squoosh](https://squoosh.app/) - Google's image optimizer
- [ImageOptim](https://imageoptim.com/) - Mac desktop app

## 📁 File Structure

Add your photos to the `public/images/` directory:

```
public/
└── images/
    ├── morocco-1.jpg
    ├── morocco-2.jpg
    ├── japan-1.jpg
    ├── japan-2.jpg
    └── ... (continue for all destinations)
```

## 🗺️ Step-by-Step: Adding Photos

### 1. Organize Your Photos

Sort your photos by country and pick your best 2-5 photos per destination:
- Iconic landmarks
- Street scenes
- Landscapes
- Local culture
- Your favorite moments

### 2. Rename & Compress

Rename files following this pattern:
- `[country-name]-[number].jpg`
- Example: `iceland-1.jpg`, `iceland-2.jpg`

Compress them to under 1MB each.

### 3. Copy to Project

Copy all renamed photos to: `c:\Users\alexo\shoulder-season-sightseers\public\images\`

### 4. Update Destination Data

Open `lib/data/destinations.ts` and update the image paths.

**Before:**
```typescript
images: [
  { src: '/images/morocco-1.jpg', alt: 'Chefchaouen blue streets' },
  { src: '/images/morocco-2.jpg', alt: 'Marrakech souk' },
],
```

**After (add captions):**
```typescript
images: [
  {
    src: '/images/morocco-1.jpg',
    alt: 'Chefchaouen blue streets',
    caption: 'The blue-washed medina of Chefchaouen at sunset'
  },
  {
    src: '/images/morocco-2.jpg',
    alt: 'Marrakech souk',
    caption: 'Colorful spices in the Marrakech spice market'
  },
],
```

### 5. Test Your Changes

Run the dev server:
```bash
npm run dev
```

Visit:
- Homepage: http://localhost:3000
- Gallery: http://localhost:3000/gallery
- Individual destinations: http://localhost:3000/destinations/morocco

## 🎨 Photo Tips for Best Results

### Variety
Mix different types of photos:
- Wide landscape shots
- Close-up details
- People and culture
- Architecture
- Nature

### Aspect Ratios
The masonry grid works best with varied aspect ratios:
- Vertical (portrait): 2:3 or 4:5
- Horizontal (landscape): 3:2 or 16:9
- Square: 1:1

### Quality Over Quantity
Better to have 2-3 stunning photos per country than 10 mediocre ones.

## 🖼️ Adding More Photos Later

You can always add more photos:

1. Add new image files to `public/images/`
2. Update the `images` array in `lib/data/destinations.ts`
3. The gallery and destination pages will automatically show the new photos

## 🎯 Next Steps After Adding Photos

1. **Optimize SEO**: Update alt text to be descriptive
2. **Add Captions**: Write engaging captions for your best photos
3. **Update Blog Posts**: Add relevant photos to blog articles
4. **Create Collections**: Group photos by theme (architecture, food, nature)

## 💡 Pro Tips

### Keep Originals
- Keep original high-res versions backed up
- Store compressed versions in the project

### Watermark (Optional)
Consider adding a subtle watermark with your website name for photos you share on social media.

### Social Media
Your photos will look great when shared! Next.js automatically optimizes images for different screen sizes.

## ❓ Need Help?

If you have questions about:
- Image optimization
- Choosing the best photos
- Adding special photo features

Feel free to experiment! The website is designed to showcase your fiance's incredible photography.

---

Happy photo organizing! 📸✨
