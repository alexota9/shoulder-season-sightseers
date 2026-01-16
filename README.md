# Shoulder Season Sightseers - Triple S Travel

A beautiful Next.js travel website showcasing budget travel experiences across multiple countries. Built with TypeScript, Tailwind CSS, and featuring interactive maps, photo galleries, and travel guides.

## 🌍 Live Demo

Visit: [shoulderseasonsightseers.com](https://shoulderseasonsightseers.com) or [triples.travel](https://triples.travel)

## ✨ Features

- **Masonry Photo Gallery**: Beautiful responsive grid layout showcasing travel photography
- **Interactive Map**: Leaflet-powered map showing all visited destinations with clickable markers
- **Destination Guides**: Detailed pages for each of the multiple countries visited with highlights, budget tips, and photos
- **Travel Blog**: Articles covering budget travel, packing light, shoulder season benefits, and gear reviews
- **Search & Filter**: Gallery with country filters and search functionality
- **Fully Responsive**: Optimized for all device sizes
- **Custom Design System**: Brand colors and typography throughout

## 🎨 Brand Colors (Darker Palette)

- **Primary Teal**: `#4a8585` - Adventure & exploration
- **Primary Coral**: `#a85c5c` - Warmth & experiences
- **Accent Purple**: `#6b5ca3` - Creativity & wonder
- **Accent Gold**: `#a3865c` - Value & budget-conscious

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alexota9/shoulder-season-sightseers.git
cd shoulder-season-sightseers
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
shoulder-season-sightseers/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Homepage with hero & masonry grid
│   ├── layout.tsx           # Root layout with nav & footer
│   ├── globals.css          # Global styles & Tailwind
│   ├── destinations/        # Destination pages
│   ├── gallery/             # Photo gallery with filters
│   ├── blog/                # Travel tips & guides
│   └── about/               # About page
├── components/
│   ├── layout/              # Navigation & Footer
│   └── ui/                  # Reusable UI components
├── lib/
│   └── data/                # Data for destinations & blog posts
└── public/
    └── images/              # Travel photos (add yours here!)
```

## 🛠️ Built With

- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Leaflet](https://leafletjs.com/) - Interactive maps
- [React Leaflet](https://react-leaflet.js.org/) - React wrapper for Leaflet

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🖼️ Adding Your Own Photos

1. Add your photos to `public/images/`
2. Update the image references in `lib/data/destinations.ts`
3. The masonry grid will automatically display your photos

## 🗺️ Adding New Destinations

Edit `lib/data/destinations.ts` to add new countries with highlights, budget tips, and coordinates.

## 📰 Adding Blog Posts

Edit `lib/data/blog-posts.ts` to add new travel articles.

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repo in [Vercel](https://vercel.com)
3. Deploy! Vercel will auto-configure Next.js

## 📄 License

ISC

---

**Happy Travels!** 🎒✈️🌍