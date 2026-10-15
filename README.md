# ShadeMatch

> **"Shop your shade. Find your style."**

A personalized fashion and beauty shopping-advice platform that helps users discover clothing colors, makeup shades, accessories, and coordinated products based on their skin tone, undertone, personal style, occasion, and budget.

---

## 🌟 Key Features

1. **Skin Tone & Undertone Quiz (`/discover`)**
   - **6-Step Interactive Questionnaire**:
     - *Step 1*: Gender / Wardrobe Focus (**Women's Fashion**, **Men's Fashion**, or **All / Gender-Neutral**).
     - *Step 2*: Skin Tone (Fair, Light, Medium, Tan, Deep, Not sure) with accessible color swatches.
     - *Step 3*: Undertone (Warm, Cool, Neutral, Not sure) with educational context explaining that vein and jewelry tests are imperfect clues.
     - *Step 4*: Personal Style (Minimalist, Casual, Trendy, Streetwear, Elegant, Ethnic / Indo-Western, Romantic, Bold).
     - *Step 5*: Target Shopping Categories (Clothes, Makeup & Grooming, Jewelry, Accessories).
     - *Step 6*: Budget in Indian Rupees (Under ₹500, ₹500–₹1,000, ₹1,000–₹2,500, ₹2,500+) and Target Occasions (Everyday, College, Office, Party, Wedding & Festive, Special Occasion).
   - **Optional Photo-Assisted Analysis**:
     - Client-side HTML5 canvas pixel sampling.
     - Transparent science disclaimer: lighting, camera processing, and screen calibration affect estimates; users can adjust suggested values manually or skip entirely.
     - Zero remote server uploads or photo persistence.

2. **Personalized Results Engine (`/results`)**
   - Named color palettes (e.g. *Spiced Saffron & Amber Olive*, *Peach & Golden Almond*, *Midnight Plum & Regal Sapphire*, *Rose Quartz & Winter Berry*, *Cashmere Rose & Dusty Teal*, *Universal Flattering Spectrum*).
   - Color swatches with names and HEX codes (click-to-copy).
   - Core starting colors, neutral staples, and signature accents.
   - Tailored advice for clothing, jewelry metals (Yellow Gold, White Gold, Rose Gold, Oxidized Silver, Brass), and makeup color families (lips, blush, eyeshadow).
   - Dynamic product recommendations scored according to the user's profile.

3. **Deterministic Recommendation Engine (`src/recommendation/engine.ts`)**
   - Strict weighted scoring model:
     - **Color palette compatibility**: 40%
     - **Selected personal style**: 25%
     - **Category preference**: 20%
     - **Occasion compatibility**: 10%
     - **Budget compatibility**: 5%
   - Transparent explanations for every recommendation.
   - Enforced budget filter (products exceeding user's selected budget are excluded by default).
   - Ethical design: no assumptions regarding race, ethnicity, health, or beauty.

4. **Curated Product Catalog (`/shop`)**
   - Over 45 realistic demo products distributed across **Clothing, Makeup & Grooming, Jewelry, and Accessories** for Women, Men, and Unisex.
   - Quick one-click gender collection tabs (**All Collections**, **Women's Fashion**, **Men's Fashion**).
   - Prices formatted in Indian Rupees (₹349 to ₹3,499).
   - Multi-filter sidebar (Gender, Category, Undertone, Budget in INR, Personal Style, Occasion).
   - Live search (title, brand, tags, descriptions) and sorting (Match Score, Price Low-High, Price High-Low, Name).
   - Fallback image placeholders ensuring zero layout breakage if external assets fail to load.

5. **Detailed Product View (`/product/:id`)**
   - Large image view with fallback protection.
   - Selectable shade swatches, gender tags, and category labels.
   - Score breakdown card (Color, Style, Category, Occasion).
   - Wishlist toggle and link to external retailers.
   - Similar pieces carousel.

6. **Interactive Style Assistant (`/style-assistant`)**
   - Generates 3 coordinated, complete outfits (apparel + jewelry + grooming/accessory) tailored to chosen gender, occasion, aesthetic, and budget.
   - Calculates exact outfit price totals from selected sample pieces.
   - Explains the color theory and silhouette synergy behind each look.
   - Save complete outfits directly to Wishlist.

7. **Synchronized Wishlist (`/wishlist`)**
   - Centralized `WishlistContext` backed by `localStorage`.
   - Separate tabs for saved individual items and saved complete outfit ensembles.
   - Remove individual items or clear all data.

8. **Privacy by Design (`/privacy` & Privacy Modal)**
   - All quiz answers, palettes, and wishlist items stored strictly in the user's browser `localStorage`.
   - Easy 1-click **Reset Saved Data** button.

---

## 🛠️ Technology Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React
- **Typography**: Cormorant Garamond (Editorial Serif) & Plus Jakarta Sans (Clean Modern Sans)
- **Storage**: Browser `localStorage` (No external database or API key required)

---

## 📁 Project Architecture

```
techgiants/
├── public/                     # Static icons and assets
├── src/
│   ├── components/
│   │   ├── common/             # Navbar, Footer, ColorSwatch, EmptyState, ImageWithFallback, PrivacyModal
│   │   ├── outfits/            # OutfitCard component
│   │   ├── product/            # ProductCard, ProductGrid, FilterSidebar
│   │   ├── quiz/               # QuizProgress, ToneStep, UndertoneStep, StyleStep, CategoryStep, BudgetOccasionStep, PhotoUploadModal
│   │   └── results/            # PaletteDisplay and breakdown sections
│   ├── context/
│   │   ├── ProfileContext.tsx  # Quiz answers, generated palette & localStorage sync
│   │   └── WishlistContext.tsx # Saved products & outfits with localStorage sync
│   ├── data/
│   │   ├── palettes.ts         # Harmonious palettes, swatches, and styling rules
│   │   └── products.ts         # 30 realistic demo products in INR
│   ├── recommendation/
│   │   ├── engine.ts           # 40/25/20/10/5 weighted scoring algorithm
│   │   └── outfitEngine.ts     # Multi-piece outfit generation & price calculations
│   ├── pages/
│   │   ├── HomePage.tsx        # Editorial landing page
│   │   ├── DiscoverPage.tsx    # 5-step tone & style quiz
│   │   ├── ResultsPage.tsx     # Personalized palette & matched items
│   │   ├── ShopPage.tsx        # Filterable catalog with search & sorting
│   │   ├── ProductDetailPage.tsx # Deep-dive product review with match score breakdown
│   │   ├── StyleAssistantPage.tsx # Coordinated outfit generator
│   │   ├── WishlistPage.tsx    # Saved products and saved outfits
│   │   └── NotFoundPage.tsx    # 404 handler
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces and unions
│   ├── App.tsx                 # Route declarations and app providers
│   ├── index.css               # Tailwind CSS v4 styling & color tokens
│   └── main.tsx                # Application entry point
├── index.html                  # HTML template with Google Fonts & SEO meta tags
├── package.json                # Project dependencies and build scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite bundler configuration
```

---

## 🚀 How to Run Locally

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🔌 Future AI & API Integrations

The recommendation and outfit engines have been architecturally decoupled from the UI:
- **Product Catalog Database**: Replace `src/data/products.ts` with queries to PostgreSQL / MongoDB / Supabase.
- **Computer Vision Model**: Connect `PhotoUploadModal` to a specialized multi-spectral skin analysis API (e.g. Google Cloud Vision or custom PyTorch model).
- **AI Stylist LLM**: Connect `src/recommendation/outfitEngine.ts` to OpenAI GPT-4o or Gemini 1.5 Pro to generate dynamic personalized styling narratives based on seasonal fashion trends.
