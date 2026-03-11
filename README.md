# Tuan Darcy's Portfolio

A high-end, fully-animated personal portfolio website built with modern web technologies. Features a responsive gallery system, interactive skills showcase, music player, and more.

## 🚀 Features

### Gallery System (Places)

- **Interactive Photo Gallery**: Browse beautiful collections from different locations
- **Client-Side Statistics**: Like and view counters using browser localStorage
- **Smooth Animations**: Swipe navigation, double-tap likes, floating heart animations
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **No Server Dependencies**: Gallery stats are tracked locally in the browser

### Portfolio Sections

- **Hero Section**: Eye-catching landing section with smooth scroll navigation
- **Skills & Interests**: Tab-based interface showcasing technical expertise
- **Photo Gallery**: Multi-location gallery (Ho Chi Minh City, Da Lat, Tokyo, San Francisco)
- **Music Showcase**: Interactive music player with track information
- **Books & Reading**: Personal reading list and recommendations
- **Social Links**: Direct connections to all major social platforms
- **Contact Information**: Email and phone contact details

### Interactive Features

- **Smooth Scroll Navigation**: Hero buttons scroll to specific sections
- **Framer Motion Animations**: Smooth, performant animations throughout
- **Responsive Images**: Optimized images with Next.js Image component
- **Lazy Loading**: Heavy components load on demand
- **Dark Theme**: Custom dark theme with gradient accents

## 🛠 Technologies Used

- **Framework**: [Next.js 14](https://nextjs.org/) - React-based framework
- **Frontend**: React 18 with TypeScript
- **UI Animations**: [Framer Motion](https://www.framer.com/motion/) - smooth animations
- **Styling**: Tailwind CSS with custom configuration
- **Image Optimization**: Next.js Image component
- **State Management**: Zustand (ready for scale)
- **Data Persistence**: Browser localStorage (client-side only)

## 📁 Folder Structure

```
forfolio/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API routes (deprecated - see note below)
│   │   │   ├── photo-like/           # Deprecated: now uses localStorage
│   │   │   ├── photo-view/           # Deprecated: now uses localStorage
│   │   │   └── places/               # Fetch available photo locations
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   └── globals.css               # Global styles
│   ├── components/                   # React components
│   │   ├── sections/                 # Page sections
│   │   │   ├── HeroSection.tsx       # Landing hero
│   │   │   ├── AboutSection.tsx      # About/intro
│   │   │   ├── PortfolioTabs.tsx     # Tab container for showcase
│   │   │   ├── FloatingMusicPlayer.tsx
│   │   │   └── tabs/                 # Individual tab components
│   │   │       ├── SkillsTab.tsx
│   │   │       ├── InterestsTab.tsx
│   │   │       ├── PlacesTab.tsx     # Gallery component
│   │   │       ├── MusicTab.tsx
│   │   │       ├── BooksTab.tsx
│   │   │       └── SocialTab.tsx
│   │   └── ui/                       # Reusable UI components
│   ├── lib/                          # Utilities and helpers
│   │   ├── galleryStorage.ts         # Client-side gallery stats (localStorage)
│   │   ├── galleryUtils.ts           # Image loading utilities
│   │   ├── scrollUtils.ts            # Smooth scroll navigation
│   │   ├── animations.ts             # Framer Motion variants
│   │   ├── utils.ts                  # Helper functions
│   │   └── database.ts               # DEPRECATED - kept for reference
│   └── types/                        # TypeScript type definitions
├── public/                           # Static assets
│   ├── icons/                        # Social media icons
│   ├── photos/                       # Gallery images by location
│   │   ├── hcm/
│   │   ├── dalat/
│   │   ├── tokyo/
│   │   └── sf/
│   └── audio/                        # Music files
├── .env.local                        # Local environment variables
├── .env.example                      # Environment variables template
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

## 🔄 Important Migration Notes

### ⚠️ Database System Changed

**Original**: SQLite database with Prisma ORM  
**Current**: Client-side localStorage only

**Why the change?**

- SQLite and file persistence don't work on Vercel serverless functions
- Gallery statistics are now stored in browser localStorage
- Each browser/device maintains its own like and view counts
- **Zero server dependencies** for gallery functionality

**Deprecated Files** (kept for reference only):

- `src/lib/database.ts` - Old Prisma database module
- `src/app/api/photo-like/route.ts` - Returns 410 Gone status
- `src/app/api/photo-view/route.ts` - Returns 410 Gone status
- `prisma/` directory - Database configuration (not used)

**New System**:

- `src/lib/galleryStorage.ts` - Client-side localStorage wrapper
- Works on all platforms including Vercel
- No external database required
- Automatic visitor tracking per browser

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm 9+

### Steps

1. Clone the repository:

```bash
git clone <repository-url>
cd forfolio
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (optional):

```bash
cp .env.example .env.local
```

4. Run development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🏃 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

### Creating New Gallery Locations

1. Add photos to `public/photos/[location-name]/`
2. Update `places` array in `src/components/sections/tabs/PlacesTab.tsx`
3. Images load automatically from the folder

## 🚀 Deployment on Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/forfolio)

### Manual Deployment

1. Push code to GitHub:

```bash
git push origin main
```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "New Project" → Select repository → Deploy

### Environment Variables on Vercel

No required environment variables! The project works out of the box.

Optional `.env.local`:

```env
# These are automatically read but have defaults
NEXT_PUBLIC_SITE_NAME=Tuan Darcy's Portfolio
```

## 💾 Data Persistence

**Gallery Statistics** (likes/views):

- Stored in browser localStorage
- Unique per browser/device
- Persists across sessions
- No server required
- No external database needed

**Contact Data**: None stored. Contact form would require backend setup.

## 🎨 Customization

### Update Personal Information

Edit these files to customize the portfolio:

- **Hero Section**: `src/components/sections/HeroSection.tsx`
- **Social Links**: `src/components/sections/tabs/SocialTab.tsx`
- **Skills**: `src/components/sections/tabs/SkillsTab.tsx`
- **Music**: `src/components/sections/tabs/MusicTab.tsx`
- **Books**: `src/components/sections/tabs/BooksTab.tsx`

### Add Gallery Photos

1. Create folder in `public/photos/[location]/`
2. Add JPEG/PNG/WebP images
3. Update places array in PlacesTab.tsx
4. Images auto-load with smooth animations

### Change Color Scheme

Edit `src/app/globals.css` to modify CSS variables:

```css
:root {
  --color-primary: 99 102 241; /* Indigo */
  --color-secondary: 139 92 246; /* Violet */
  --color-accent: 168 85 247; /* Purple */
}
```

## 🐛 Troubleshooting

### Gallery stats not persisting

- Check browser localStorage is enabled
- Stats are per-browser, not shared across devices
- Use browser DevTools → Application → localStorage to inspect

### Build fails with Prisma errors

- Prisma is deprecated and has been removed
- Delete `node_modules/` and run `npm install`
- Ensure `package.json` has Prisma removed

### Images not loading in gallery

- Verify images exist in `public/photos/[location]/`
- Check file extensions (jpg, png, webp supported)
- Ensure file names don't have special characters

### API routes returning 410

- That's expected! Database routes are deprecated
- Gallery now uses client-side localStorage only
- No API calls are made for gallery stats

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Tuan Darcy**

- 📧 Email: sharkblack2k7@gmail.com
- 📱 Phone: +84 385 696 303
- 🔗 Social: See footer section for all links

## 🔗 Links

- [GitHub](https://github.com/TuanDarcy)
- [Discord](https://discord.gg/n9AmftVzxT)
- [TikTok](https://www.tiktok.com/@tuandarcy)
- [Instagram](https://www.instagram.com/tuan.darcy/)

---

**Status**: ✅ Production Ready for Vercel Deployment
