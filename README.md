# 🎨 Personal Portfolio Website — AI Agent Rules

## 1. Project Overview

This project is a **high-end personal portfolio website**.

The goal is to create a **visually impressive, animated, and modern portfolio** that showcases:

- Achievements
- Academic subjects
- Personal milestones
- Projects
- Games played
- Experiences
- Media and images
- Custom music player
- Interactive effects

The website should feel **modern, smooth, animated, and visually rich**.

Design style inspiration:

- Apple
- Stripe
- Framer
- Awwwards style portfolios

---

# 2. Core Design Philosophy

The website should include:

### Visual Elements

- Rounded cards
- Smooth animations
- Hover effects
- Animated transitions
- Parallax scrolling
- Blur / glassmorphism
- Gradient backgrounds
- Animated backgrounds
- Floating UI elements

### Components

Possible sections include:

- Hero section
- About me
- Achievements
- Skills
- Subjects studied
- Milestones / Timeline
- Games I played
- Projects / Portfolio
- Gallery
- Music player
- Contact

### UX Expectations

The website must feel:

- Premium
- Smooth
- Animated
- Interactive
- Modern
- Creative

Avoid boring static layouts.

---

# 3. Technology Freedom

The AI agent is allowed to choose any suitable modern stack.

Preferred technologies:

- Next.js
- React
- TailwindCSS
- Framer Motion
- Three.js (optional)
- GSAP (optional)

Other libraries are allowed if useful.

---

# 4. File Creation Permissions

The AI agent **is allowed to create any files needed**, including:

- components
- styles
- assets
- utilities
- config files

It may restructure folders if necessary.

---

# 5. Development Workflow

Development must follow this process:

1. Build and test **locally first**
2. Ensure everything runs correctly
3. Optimize animations and layout
4. Prepare for **future deployment**

Deployment will be handled later.

---

# 6. IMPORTANT: Protected Code Sections

The AI agent **MUST NOT modify anything marked as important.**

Examples include:

- Colors
- Fonts
- Layout styles
- Design decisions

When code is marked with comments like:

The AI agent must **never change these parts** unless explicitly instructed.

---

# 7. Design Lock Rules

If the user says something like:

- "This color is perfect"
- "This font looks good"
- "Do not change this style"

Then these elements become **design locked**.

AI must **never change them automatically**.

Only modify:

- structure
- layout logic
- code organization
- performance

---

# 8. Code Quality Requirements

The code must be:

- clean
- modular
- maintainable
- well structured

Follow best practices:

- reusable components
- logical folder structure
- consistent naming

---

# 9. Performance Requirements

Animations must remain:

- smooth
- optimized
- not laggy

Avoid:

- heavy unnecessary scripts
- blocking rendering

---

# 10. Creative Freedom

The AI agent is encouraged to:

- propose cool visual ideas
- add creative interactions
- improve UI/UX
- implement modern web effects

But must **respect the protected design rules**.

---

# 11. Quick Start — Local Development

## Installation

```bash
cd d:\code\forfolio
npm install
```

## Development Server

```bash
npm run dev
```

Opens **http://localhost:3001** with hot-module replacement (HMR).

## Validation Workflow

Before committing code, run this in order:

```bash
# 1. Type checking
npm run type-check
# Must pass with zero errors

# 2. Linting
npm run lint
# Must pass with no warnings

# 3. Development server
npm run dev
# Should compile without errors and serve on port 3001

# 4. Browser testing
# Open http://localhost:3001
# Verify all sections load and render correctly
# Check browser console (F12) for errors
```

**Code is ready only when ALL checks pass.** ✅

## Production Build

```bash
npm run build
npm start
```

Opens production version on **http://localhost:3000**.

## Common Commands

```bash
npm run dev           # Start development server
npm run type-check    # TypeScript validation
npm run lint          # ESLint validation
npm run lint --fix    # Auto-fix lint errors
npm run format        # Auto-format code
npm run build         # Build for production
npm start            # Run production server
```

---

# 12. Project Status

## Completed Sections ✅

- ✅ **Hero Section** — Full-screen with animated background, gradient headline, CTA buttons
- ✅ **About Section** — Content layout with highlight cards and achievement stats
- ✅ **Skills Section** — Skill categories with animated progress bars (0-100%)

## Architecture & Setup ✅

- ✅ Next.js 14+ with App Router
- ✅ TypeScript with strict type checking
- ✅ TailwindCSS for styling
- ✅ Framer Motion for animations
- ✅ Component structure (UI + Sections)
- ✅ Utility functions and helpers
- ✅ Global styles with design tokens

## Code Quality ✅

- ✅ 0 TypeScript errors
- ✅ 0 ESLint errors
- ✅ All code properly typed
- ✅ Code follows standards
- ✅ Production-ready quality

## Ready to Build ⏳

- **Projects Section** — Portfolio grid
- **Timeline Section** — Career milestones
- **Gallery Section** — Image showcase
- **Contact Section** — Contact form

---

# 13. Adding Travel Photos

The **Places Gallery** automatically detects and displays all images from folder-based locations. No code changes required!

## Quick Start

Simply add your images to the appropriate location:

```
public/places/vietnam/hcm/        → Ho Chi Minh City photos
public/places/vietnam/dalat/      → Da Lat photos
```

## Supported Formats

Place image files with any of these extensions:

- `.jpg`
- `.jpeg`
- `.png`
- `.gif`
- `.webp`

Example structure:

```
public/places/
├── vietnam/
│   ├── hcm/
│   │   ├── beach_sunset.jpg
│   │   ├── street_market.jpg
│   │   └── night_city.png
│   └── dalat/
│       ├── mountain_view.jpg
│       ├── waterfall.webp
│       └── local_market.png
```

## How It Works

1. **Gallery Detection**: The system automatically scans each folder
2. **Image Ordering**: Images are randomized each time you open the gallery
3. **Preview Images**: Place cards display a random image as a preview
4. **Auto-Update**: Add new images anytime — they appear instantly on the website
5. **No Build Required**: Changes are live immediately without code changes

## Adding New Places

To add a new location, edit [src/components/sections/tabs/PlacesTab.tsx](src/components/sections/tabs/PlacesTab.tsx):

```javascript
const places: Place[] = [
  { id: "1", name: "Ho Chi Minh City", folder: "hcm", description: "Bustling metropolis..." },
  { id: "2", name: "Da Lat", folder: "dalat", description: "Cool mountain retreat..." },
  // Add new place here:
  { id: "3", name: "Hanoi", folder: "hanoi", description: "Ancient capital city..." },
];
```

Then create the folder:

```
public/places/vietnam/hanoi/
```

And add your images to it!

## Gallery Features

- **Swipe Navigation**: Swipe left/right to view images (mobile-friendly)
- **Double Tap Like**: Double-tap any photo to like it
- **Photo Counter**: See which photo you're viewing (e.g., "3 / 12")
- **Progress Bar**: Visual indicator of your position in the gallery
- **Thumbnail Strip**: Quick access to all photos
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Navigation Bar** — Header with links
- **Footer** — Quick links and info

See [ARCHITECTURE.md](ARCHITECTURE.md) for full project structure details.

---

# 14. Audio System

The portfolio features a **centralized audio management system** that ensures clean, conflict-free audio playback.

## How It Works

### Background Music

- **Auto-start**: Background music starts automatically 5 seconds after page loads
- **Deferred Loading**: Audio is loaded only when the browser is idle (using `requestIdleCallback`)
- **Lower Volume**: Background music plays at 30% volume to avoid overwhelming users
- **Continuous Loop**: Music loops continuously when no other audio is playing

### Playlist Override

- **Priority**: Playlist songs have priority over background music
- **Automatic Stop**: Background music stops immediately when a playlist song is clicked
- **Volume Boost**: Playlist songs play at full volume (100%)
- **Resume on Pause**: Background music automatically resumes when a playlist song is paused or ends

### State Management

- **Singleton Instance**: The `AudioManager` is a singleton that ensures only one instance exists across the entire application
- **Event-Driven**: All audio state changes trigger listeners that update the UI
- **Error Handling**: Gracefully handles autoplay restrictions and playback errors
- **Browser Compatibility**: Works with all modern browsers, with fallbacks for older browsers

## Implementation Details

**File**: `src/lib/audioManager.ts`

The `AudioManager` class handles:

- Background audio initialization and playback
- Song playback and pause control
- Automatic music transitions
- State change notifications
- Browser autoplay policy management

## Audio Flow

```
1. Page loads
2. Audio system initializes (deferred with requestIdleCallback)
3. After 5 seconds → Background music starts
4. User clicks song → Background STOPS, song PLAYS
5. Song finishes → Background RESUMES
6. User pauses song → Background RESUMES
7. At no point: Two songs play simultaneously
```

---

# 15. Performance Optimizations

The portfolio includes several performance improvements to ensure fast load times and smooth interactions.

## Code Splitting & Lazy Loading

### Lazy-Loaded Components

Heavy components are loaded on-demand using dynamically imported modules:

- **Places Gallery** (`PlacesTab.tsx`): Lazy loaded when places tab is clicked
- **Music Player** (`MusicTab.tsx`): Lazy loaded when music tab is clicked
- **Lightweight Fallback**: Loading skeleton shown during component load

This reduces the initial JavaScript bundle from the main page.

### Implementation

```javascript
const PlacesTab = lazy(() => import("./tabs/PlacesTab"));
const MusicTab = lazy(() => import("./tabs/MusicTab"));

<Suspense fallback={<TabLoadingSkeleton />}>
  <PlacesTab />
</Suspense>;
```

## Image Optimization

### Places Gallery

- **Lazy Loading**: Gallery images load only when viewed
- **Next Image Component**: Uses Next.js `Image` component for automatic optimization
- **Responsive Sizing**: Images scale appropriately for different device sizes
- **Next Image Preloading**: The next image in the gallery is preloaded during viewing for smooth swipe transitions

### Implementation

```javascript
// Preload next image for smooth transitions
useEffect(() => {
  if (images.length > 0) {
    const nextIndex = (currentImageIndex + 1) % images.length;
    const nextImage = images[nextIndex];
    if (nextImage) {
      preloadImage(nextImage.path);
    }
  }
}, [currentImageIndex, images]);
```

## Audio Loading

### Deferred Loading

- **No Immediate Load**: Audio files are not loaded until browser is idle
- **requestIdleCallback**: Uses browser's idle time to load audio files
- **5-Second Delay**: Additional delay ensures page is fully interactive before audio starts
- **User Interaction Fallback**: Buttons provide manual playback if autoplay is blocked

### Benefits

- Reduces initial page load time
- Allows browser to prioritize interactive elements
- Better user experience on slow connections
- Respects browser autoplay policies

## Bundle Size

### Before Optimizations

- Main bundle: ~25 kB
- First Load JS: 145 kB

### After Optimizations

- Main bundle: ~20.6 kB
- First Load JS: 141 kB
- Heavy components lazy-loaded

### Code Splitting Results

- Reduced initial JavaScript by ~4 kB
- Heavy components loaded only when needed
- Faster page load time
- Better Time to Interactive (TTI)

## Performance Metrics

### Recommended Lighthouse Scores

- **Performance**: 85+
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 95+

---

# 16. Enhanced Photo Gallery System

The portfolio features an **advanced Instagram-style photo gallery** with full-screen viewers, interactive likes, and view tracking.

## Gallery Features

### Full-Size Image Viewer

- **Large Centered Display**: Images fill the entire screen (80vh max height)
- **GPU Acceleration**: Uses `transform: translate3d()` for smooth swipe animations
- **Passive Touch Listeners**: Optimized for mobile performance
- **Story-Style Progress Bar**: Visual indicator at top showing photo position
- **Smooth Transitions**: Minimal re-renders with React.memo optimization

### Interactive Like System

**Heart Animation:**

- Double-tap any photo to like it
- Animated floating heart popup (600ms animation)
- Heart count displayed at bottom of viewer
- Like button shows filled heart when already liked

**IP-Based Tracking:**

- Each visitor can like a photo only **once per IP address**
- Prevents duplicate likes from the same user
- Persistent tracking across sessions
- Graceful handling of IP changes

### View Counter System

**Automatic View Recording:**

- When a photo becomes visible, view count increments
- Only counts **one view per IP per photo**
- Tracks viewing history across sessions
- Views displayed alongside like count

**Metadata Storage:**

- Stored in `.data/photo-metadata.json` (created automatically)
- Includes both like and view data
- IP-based deduplication
- Automatic persistence with debounced writes

### Image Preloading Strategy

**Optimized Swipe Performance:**

- Preloads **next image (N+1)** while viewing current image
- Preloads **previous image (N-1)** for back navigation
- Eliminates loading delays during swipe transitions
- Works seamlessly with Fisher-Yates shuffle

### Image Caching

**Long-Term Browser Cache:**

- Images cached for **1 year** (31,536,000 seconds)
- Cache header: `public, max-age=31536000, immutable`
- Reduces server load and bandwidth usage
- Improves repeat visitor experience

## API Routes

### POST /api/photo-like

Records a like from a user's IP address.

**Request:**

```json
{
  "photoId": "places/dalat/photo.jpg"
}
```

**Response:**

```json
{
  "success": true,
  "isNewLike": true,
  "likes": 42
}
```

**Behavior:**

- Returns `isNewLike: true` only on first like from IP
- Returns current like count for display
- Ignores duplicate likes from same IP

### POST /api/photo-view

Records a view from a user's IP address.

**Request:**

```json
{
  "photoId": "places/dalat/photo.jpg"
}
```

**Response:**

```json
{
  "success": true,
  "isNewView": true,
  "views": 128
}
```

**Behavior:**

- Returns `isNewView: true` only on first view from IP
- Returns current view count for display
- Ignores duplicate views from same IP

### GET /api/photo-like?photoId=...

Fetches like statistics for a photo.

**Response:**

```json
{
  "photoId": "places/dalat/photo.jpg",
  "likes": 42,
  "hasLiked": false
}
```

### GET /api/photo-view?photoId=...

Fetches view statistics for a photo.

**Response:**

```json
{
  "photoId": "places/dalat/photo.jpg",
  "views": 128,
  "hasViewed": true
}
```

## Photo ID System

Photos are identified by their **file path** relative to the public folder:

```
Physical Location: public/places/dalat/sunset.jpg
Photo ID:          places/dalat/sunset.jpg
```

This approach:

- Ensures unique identification
- Works immediately after file upload
- Requires no additional configuration
- Automatically includes folder context

## Performance Optimizations

### React.memo Component

- `FullImageViewer` component wrapped with `React.memo()`
- Prevents unnecessary re-renders of image viewer
- Only re-renders when props actually change
- Significant performance boost on large galleries

### Dependency Optimization

- `stats` object wrapped in `useMemo()`
- Prevents dependency array instability
- Reduces effect hook triggers
- Improves overall component stability

### Bundle Size Impact

Adding photo tracking and likes system adds **~2 KB** to bundle:

- API route handlers: ~1 KB
- Photo metadata store: ~0.5 KB
- UI component updates: ~0.5 KB

**Total bundle: Still 20.6 kB** (negligible impact)

## User Experience

### Viewer Controls

**Bottom Controls:**

```
[❤️ 42]  [👁 128]  [← Prev]  [Next →]
  Likes    Views     Navigation
```

**Photo Counter:**

- Top-left: "3 / 24" (current / total)
- Story-style progress bars above
- Close button (✕) in top-right

### Swipe Behavior

- **Left swipe**: Next image
- **Right swipe**: Previous image
- **Double-tap**: Like image
- **Touch anywhere**: Can drag for friction feedback
- Min swipe distance: 50px
- Velocity threshold: 0.5

### Mobile Optimizations

- Large touch targets for buttons (44x44px minimum)
- Passive event listeners for better scroll performance
- Throttled gesture calculations
- Avoids unnecessary state updates during swipe
- 60 FPS swipe animations (GPU accelerated)

## Metadata Storage Structure

Data stored in `.data/photo-metadata.json`:

```json
{
  "places/dalat/photo1.jpg": {
    "photoId": "places/dalat/photo1.jpg",
    "likes": 42,
    "views": 128,
    "likedIPs": ["192.168.1.1", "10.0.0.5"],
    "viewedIPs": ["192.168.1.1", "10.0.0.5", "192.168.1.100"]
  }
}
```

**Important Notes:**

- **No PII stored**: Only IP addresses (extractable from request headers)
- **Auto-created**: Directory and file created automatically on first interaction
- **Thread-safe**: Debounced writes prevent concurrent access issues
- **Persistent**: Data survives server restarts
- **Caching**: Hot data kept in memory, written to disk periodically

---

Create a **portfolio website that looks impressive and unique**.

It should feel like a **professional personal brand website**, not a simple resume page.

---

# 12. Final Note

This project prioritizes:

1. Visual quality
2. Smooth animations
3. Creative presentation
4. Personal storytelling

---

# 13. Dynamic Portfolio System — Tuan Darcy Edition

## Project Owner Identity

This portfolio represents **Tuan Darcy**, a modern developer and tech enthusiast.

### Specializations

- **Languages:** C++, Python, Lua
- **Development:** Frontend, Backend, Full-Stack
- **Expertise:** Web Development, AI Tools Integration
- **Passions:** Technology, Creativity, Exploration

The website should introduce Tuan as a skilled developer with diverse capabilities across multiple programming paradigms and an innovative approach to modern web development.

---

## Portfolio Structure — Interactive Tab System

The portfolio features an interactive **dynamic tab-based system** where users can navigate through different sections of Tuan's profile:

### Core Sections

1. **Skills**
2. **Interests**
3. **Places I Have Been**
4. **Music**
5. **Books**
6. **Social Links**
7. **Contact**

---

## Section Specifications

### 1. Skills Section

**Purpose:** Display Tuan's programming expertise and technical proficiencies

**Features:**

- Animated progress bars or skill cards showing proficiency levels
- Display of primary languages: **C++, Python, Lua**
- Development specialties: **Frontend, Backend, AI Tools**
- Each skill appears as an interactive card with:
  - Skill name
  - Proficiency level (0-100%)
  - Visual progress indicator with smooth animations
  - Category badge (Language, Tool, Specialty)

**Design:**

- Grid layout responsive to all screen sizes
- Hover effects reveal additional information
- Progress bar animations trigger on scroll
- Color-coded by category using design system colors

---

### 2. Interests Section

**Purpose:** Showcase Tuan's personal interests and hobbies

**Features:**

- **Static Interests:** Pre-populated interests such as:
  - Games
  - Manga / Books
  - Technology
  - Movies
  - Coding
- **Dynamic Functionality:** Users can:
  - Add new custom interests
  - Delete existing interests
  - See interests persist (local storage or database)
- Each interest appears as an interactive card with:
  - Icon representation
  - Interest name
  - Smooth animations on hover
  - Delete button with confirmation
  - Add new interest form

**Design:**

- Card-based layout with glassmorphism effect
- Smooth entrance animations for new cards
- Color variation per interest category
- Add button styled as prominent CTA

---

### 3. Places I Have Been

**Purpose:** Visualize Tuan's travels and experiences

**Features:**

- **Map/List View:** Display places visited
- **Dynamic Functionality:** Users can:
  - Add new locations with:
    - Place name
    - Country/Region
    - Date visited
    - Optional description
  - Edit existing entries
  - Delete entries with confirmation
  - View location count statistics
- **Visual Display:**
  - Cards or map pins showing location details
  - Timeline view option
  - Organized by date or region
  - Travel statistics (total places, countries, etc.)

**Design:**

- Interactive map integration (optional)
- Card layout with location information
- Animated transitions between views
- Filter/sort functionality

---

### 4. Music Section

**Purpose:** Share Tuan's music taste with embedded playback capabilities

**Features:**

- **YouTube Integration:**
  - Users can paste YouTube URLs
  - Automatic video extraction and validation
  - Embedded player with controls
- **Music Management:**
  - Add new music tracks from YouTube links
  - Save music selections
  - Delete unwanted entries
  - Organize by playlist or category
- **Playback:**
  - Embedded YouTube player
  - Controls: play, pause, seek, volume
  - Display video title and thumbnail
  - Queue management

**Design:**

- Player styled to match portfolio theme
- Grid of music cards with thumbnails
- Play button overlay on hover
- Smooth playlist transitions
- Minimal controls that don't obstruct design

---

### 5. Books Section

**Purpose:** Showcase Tuan's reading collection and literary interests

**Features:**

- **Bookshelf Display:**
  - Grid-based bookshelf layout showing book spines
  - Polaroid-style card layout with covers
  - Organized categorization
- **Book Management:**
  - Users can add new books:
    - Book title
    - Author name
    - Book cover image (upload or paste URL)
    - Optional notes or rating
  - Edit existing book entries
  - Delete books with confirmation
  - Categorize by genre or status (reading, want-to-read, completed)
- **Display Options:**
  - Bookshelf grid view (most prominent)
  - List view with details
  - Filtered by category
  - Search functionality

**Design:**

- Bookshelf-style grid using CSS Grid
- 3D bookshelf effect (optional)
- Book covers displayed prominently
- Hover to reveal book details
- Smooth transitions between views
- Animated page-turn effects (optional)

---

### 6. Social Links Section

**Purpose:** Connect visitors directly to Tuan's social networks

**Features:**

- **Predefined Platforms:**
  - GitHub
  - Discord
  - Instagram
  - Twitter / X
  - Facebook
  - LinkedIn
  - YouTube
  - Custom links support
- **Dynamic Functionality:**
  - Users can add social links with:
    - Platform selection (dropdown)
    - Profile URL/username
    - Display name (optional)
  - Edit existing links
  - Delete links
  - Reorder links via drag-and-drop
- **Visual Display:**
  - Platform-specific icons and colors
  - Clickable icon buttons
  - Text links with platform names
  - Hover effects showing link preview
  - Optional QR code generation

**Design:**

- Icon-based layout (cleaner appearance)
- Platform colors matching official branding
- Hover reveals link text or tooltip
- Smooth color transitions
- Responsive icon grid

---

### 7. Contact Section

**Purpose:** Provide multiple ways for visitors to reach Tuan

**Features:**

- **Contact Methods:**
  - Email address (with mailto link)
  - Discord username/server invite link
  - Other social platform links
  - Direct contact form (optional)
- **Contact Form (if implemented):**
  - Name field
  - Email field
  - Subject field
  - Message textarea
  - Submit button with loading state
  - Success/error feedback
- **Alternative Contact Methods:**
  - Display email as clickable link
  - QR codes linking to social profiles
  - Direct messaging links

**Design:**

- Clean, professional layout
- Clear hierarchy of contact options
- Form styling with smooth validation
- Success message with confirmation
- Mobile-friendly touch interactions

---

## Design & User Experience Requirements

### Visual Design

- **Modern & Dynamic:** Interactive elements feel responsive and alive
- **Colorful but Professional:** Uses design system colors (Indigo, Violet, Purple) with restraint
- **Card-Based Layout:** Consistent use of cards throughout interface
- **Glassmorphism Effects:** Semi-transparent cards with blur effects
- **Smooth Animations:** All transitions animated using Framer Motion

### Animation Requirements

- **Tab Transitions:** Smooth fade/slide animations when switching sections
- **Card Animations:**
  - Entrance: Staggered fade-in on scroll
  - Hover: Scale and shadow effects
  - Exit: Fade-out when deleting
- **Form Inputs:** Smooth focus states and validation animations
- **Progress Bars:** Animated fill from 0% to target value
- **List Items:** Smooth add/remove with slide animations

### Interactive Features

- **Hover States:** All interactive elements have clear hover feedback
- **Click Feedback:** Visual response to clicks
- **Loading States:** Loading indicators for async operations
- **Form Validation:** Real-time validation with friendly error messages
- **Confirmation Dialogs:** Confirm before destructive actions
- **Drag & Drop:** Reorderable lists (for social links, music, etc.)

### Responsive Design

- **Mobile First:** Optimized for small screens
- **Tablet Layout:** Adjusted spacing and grid columns
- **Desktop:** Full-featured experience
- **Touch Interactions:** Large touch targets (min 44x44px)
- **Keyboard Navigation:** Full accessibility support

### Performance

- **Lazy Loading:** Load images and content on demand
- **Optimized Animations:** GPU-accelerated transforms
- **Code Splitting:** Dynamic imports for sections
- **Caching:** Local storage for user additions
- **Fast Interactions:** Instant feedback on user actions

---

## Technical Implementation

### State Management

- Use Zustand for managing tab state and user-added content
- Local storage for persisting user additions
- Optional: Backend database for cloud persistence

### Components to Build

```
src/components/sections/
├── SkillsTab.tsx
├── InterestsTab.tsx
├── PlacesTab.tsx
├── MusicTab.tsx
├── BooksTab.tsx
├── SocialLinksTab.tsx
├── ContactTab.tsx
└── TabNavigation.tsx (manages active tab)

src/components/ui/
├── TabButton.tsx          (tab navigation button)
├── InteractiveCard.tsx    (reusable card with add/delete)
├── ProgressBar.tsx        (animated skill progress)
├── YoutubePlayer.tsx      (embedded player)
├── BookGrid.tsx           (bookshelf display)
├── SocialIcon.tsx         (platform-specific icons)
└── ConfirmDialog.tsx      (delete confirmation)
```

### Data Structures

```typescript
// Skills
type Skill = {
  id: string;
  name: string;
  level: number; // 0-100
  category: "language" | "tool" | "specialty";
};

// Interests
type Interest = {
  id: string;
  name: string;
  icon?: string;
  color?: string;
};

// Places
type Place = {
  id: string;
  name: string;
  region: string;
  dateVisited: Date;
  description?: string;
  coordinates?: { lat: number; lng: number };
};

// Music
type Music = {
  id: string;
  youtubeUrl: string;
  title: string;
  thumbnail: string;
  addedDate: Date;
};

// Books
type Book = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  category: string;
  rating?: number;
  notes?: string;
};

// Social Links
type SocialLink = {
  id: string;
  platform: string; // github, discord, instagram, etc.
  url: string;
  displayName?: string;
  order: number;
};
```

---

## Page Footer

Add a footer to all pages with:

```
"Web built by Tuan Darcy"
```

**Footer Design:**

- Simple, elegant text at bottom of page
- Links to Tuan's main social profiles
- Copyright year (auto-updating)
- Subtle background styling
- Links to Privacy/Terms (if applicable)

---

## Development Roadmap

### Phase 1 (Current)

- ✅ Hero Section
- ✅ About Section
- ✅ Skills Section (static version)

### Phase 2 (Next)

- [ ] Tab Navigation System
- [ ] Interests Tab (with add/delete)
- [ ] Places Tab (with management)
- [ ] Music Tab (YouTube integration)

### Phase 3

- [ ] Books Tab (grid display)
- [ ] Social Links Tab (with drag-drop)
- [ ] Contact Tab
- [ ] Footer with credits

### Phase 4

- [ ] Backend Integration (if persisting to database)
- [ ] User Authentication (if needed)
- [ ] Admin Panel (if managing content)
- [ ] Performance Optimization

---

## Success Metrics

✅ **User Experience:**

- All sections load instantly
- Smooth animations at 60 FPS
- Responsive on all devices
- Accessible keyboard navigation

✅ **Visual Quality:**

- Premium, modern appearance
- Consistent design system
- Polished animations
- Professional presentation

✅ **Functionality:**

- Add/edit/delete features work seamlessly
- Data persists between sessions
- Forms validate correctly
- Links work properly

✅ **Code Quality:**

- TypeScript strict mode
- 0 ESLint errors
- Well-organized components
- Proper error handling

---

**This dynamic portfolio system transforms a static portfolio into an interactive, living profile of Tuan Darcy. It tells his story through multiple dimensions: skills, interests, travels, music, reading list, and connections.** 🚀
