import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  ShoppingBag, 
  Wand2, 
  CheckCircle2, 
  Palette, 
  ShieldCheck, 
  Shirt, 
  Gem, 
  Glasses 
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { ColorSwatch } from '../components/common/ColorSwatch';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const HomePage: React.FC = () => {
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  const inspirationPalettes = [
    {
      title: 'Spiced Terracotta & Warm Olive',
      vibe: 'Ideal for Warm Undertones & Golden Complexions',
      swatches: [
        { name: 'Warm Terracotta', hex: '#C25E43' },
        { name: 'Warm Olive', hex: '#708238' },
        { name: 'Golden Amber', hex: '#D99B26' },
        { name: 'Warm Ivory', hex: '#F7F0E8' },
      ],
    },
    {
      title: 'Midnight Berry & Cool Slate',
      vibe: 'Ideal for Cool Undertones & Rosy Complexions',
      swatches: [
        { name: 'Cool Berry', hex: '#7A263A' },
        { name: 'Deep Sapphire', hex: '#1E3A8A' },
        { name: 'Slate Gray', hex: '#64748B' },
        { name: 'Chalk White', hex: '#F8FAFC' },
      ],
    },
    {
      title: 'Cashmere Rose & Dusty Teal',
      vibe: 'Ideal for Balanced Neutral Undertones',
      swatches: [
        { name: 'Dusty Teal', hex: '#3B7A87' },
        { name: 'Cashmere Rose', hex: '#B57C89' },
        { name: 'Champagne Sand', hex: '#D9B98C' },
        { name: 'Espresso', hex: '#292521' },
      ],
    },
  ];

  return (
    <div className="space-y-24">
      {/* ================= SECTION A: HERO ================= */}
      <section className="relative overflow-hidden pt-6 pb-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Editorial Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A263A]/10 border border-[#7A263A]/20 text-[#7A263A] text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#7A263A]" />
                Personalized Fashion & Color Advisory
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#292521] leading-[1.08] tracking-tight">
                Your colors. <br />
                <span className="italic font-light text-[#7A263A]">Your style.</span> <br />
                Your perfect find.
              </h1>

              <p className="text-base sm:text-lg text-[#6E675F] max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Discover the colors that complement your personal style and find fashion and beauty products you&apos;ll love.
              </p>

              {/* Tagline Highlight */}
              <div className="p-3.5 rounded-2xl bg-white/70 border border-[#D9B98C]/40 inline-block shadow-2xs">
                <p className="text-xs uppercase tracking-widest text-[#292521] font-semibold">
                  &ldquo;Shop your shade. Find your style.&rdquo;
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/discover"
                  id="hero-cta-discover"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#7A263A] hover:bg-[#5E1D2D] text-white text-xs font-bold uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <Compass className="w-4 h-4 text-[#D9B98C]" />
                  Discover My Colors
                </Link>

                <Link
                  to="/shop"
                  id="hero-cta-shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-[#FAF6F0] text-[#292521] border border-[#292521]/15 text-xs font-bold uppercase tracking-widest transition-all shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4 text-[#7A263A]" />
                  Explore the Shop
                </Link>
              </div>

              {/* Quick Gender Collections */}
              <div className="flex items-center justify-center lg:justify-start gap-2.5 pt-1">
                <span className="text-xs text-[#6E675F]">Browse by wardrobe:</span>
                <Link
                  to="/shop?gender=women"
                  className="px-3.5 py-1 rounded-full bg-white/80 hover:bg-white text-[11px] font-semibold text-[#7A263A] border border-[#7A263A]/20 transition-all shadow-2xs hover:shadow-xs"
                >
                  Women&apos;s Collection
                </Link>
                <Link
                  to="/shop?gender=men"
                  className="px-3.5 py-1 rounded-full bg-white/80 hover:bg-white text-[11px] font-semibold text-[#292521] border border-[#292521]/15 transition-all shadow-2xs hover:shadow-xs"
                >
                  Men&apos;s Collection
                </Link>
              </div>

              {/* Trust Micro-Badges */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-[#6E675F]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7A263A]" /> 100% Free & No Login
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7A263A]" /> Indian Rupee (₹) Pricing
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7A263A]" /> Private Local Processing
                </span>
              </div>
            </div>

            {/* Right Column: Fashion Collage Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative border backdrop */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#D9B98C]/40 via-transparent to-[#7A263A]/20 blur-xl" />

                <div className="relative rounded-3xl overflow-hidden border-2 border-white shadow-2xl aspect-4/5 bg-[#FAF6F0]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80"
                    alt="Fashion model showcasing rich warm color palette"
                    categoryLabel="ShadeMatch Editorial"
                    className="w-full h-full object-cover"
                  />

                  {/* Floating floating swatch badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#D9B98C]/40 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#7A263A]">
                        Curated Harmony
                      </span>
                      <span className="text-[10px] text-[#6E675F] font-mono">Warm Autumn</span>
                    </div>
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#C25E43] shadow-inner" title="Terracotta" />
                        <span className="w-5 h-5 rounded-full bg-[#D9B98C] shadow-inner" title="Champagne" />
                        <span className="w-5 h-5 rounded-full bg-[#7A263A] shadow-inner" title="Burgundy" />
                        <span className="w-5 h-5 rounded-full bg-[#292521] shadow-inner" title="Espresso" />
                      </div>
                      <span className="text-xs font-serif italic text-[#292521]">
                        Shop this tone →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION B: HOW IT WORKS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7A263A] mb-2 block">
            Streamlined Styling Flow
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#292521]">
            How ShadeMatch Works
          </h2>
          <p className="text-sm text-[#6E675F] mt-3 leading-relaxed">
            Three simple steps to unlock the colors that elevate your natural presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 border border-[#D9B98C]/30 shadow-xs relative flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="w-12 h-12 rounded-2xl bg-[#7A263A]/10 text-[#7A263A] font-serif text-xl font-bold flex items-center justify-center mb-6">
                01
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#292521] mb-3">
                Discover your coloring
              </h3>
              <p className="text-xs sm:text-sm text-[#6E675F] leading-relaxed">
                Take our quick, respectful questionnaire to identify your skin tone depth and warm, cool, or neutral undertone.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-black/5 text-xs font-semibold text-[#7A263A]">
              Interactive 5-step quiz →
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 border border-[#D9B98C]/30 shadow-xs relative flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="w-12 h-12 rounded-2xl bg-[#D9B98C]/30 text-[#292521] font-serif text-xl font-bold flex items-center justify-center mb-6">
                02
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#292521] mb-3">
                Explore your palette
              </h3>
              <p className="text-xs sm:text-sm text-[#6E675F] leading-relaxed">
                Review your personalized color spectrum: best starting colors, luxury neutrals, statement accents, and jewelry metals.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-black/5 text-xs font-semibold text-[#7A263A]">
              Named HEX swatches & notes →
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-8 border border-[#D9B98C]/30 shadow-xs relative flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="w-12 h-12 rounded-2xl bg-[#292521]/10 text-[#292521] font-serif text-xl font-bold flex items-center justify-center mb-6">
                03
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#292521] mb-3">
                Find products you love
              </h3>
              <p className="text-xs sm:text-sm text-[#6E675F] leading-relaxed">
                Shop curated clothing, makeup, and jewelry precisely scored by our recommendation engine within your target INR budget.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-black/5 text-xs font-semibold text-[#7A263A]">
              Weighted match scoring →
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION C: EXPLORE CATEGORIES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7A263A] mb-1.5 block">
              Curated Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#292521]">
              Explore Categories
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-wider text-[#7A263A] hover:underline flex items-center gap-1.5"
          >
            View Complete Catalog ({PRODUCTS.length} Items) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Clothing */}
          <Link
            to="/shop?category=clothing"
            className="group relative rounded-3xl overflow-hidden aspect-3/4 border border-[#D9B98C]/40 shadow-xs block"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
              alt="Clothing collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <Shirt className="w-6 h-6 text-[#D9B98C] mb-2" />
              <h3 className="font-serif text-2xl font-medium">Clothing</h3>
              <p className="text-xs text-white/80">Dresses, kurtas, blazers & trousers</p>
            </div>
          </Link>

          {/* Makeup */}
          <Link
            to="/shop?category=makeup"
            className="group relative rounded-3xl overflow-hidden aspect-3/4 border border-[#D9B98C]/40 shadow-xs block"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
              alt="Makeup collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <Sparkles className="w-6 h-6 text-[#D9B98C] mb-2" />
              <h3 className="font-serif text-2xl font-medium">Makeup</h3>
              <p className="text-xs text-white/80">Lipsticks, blushes & shadows</p>
            </div>
          </Link>

          {/* Jewelry */}
          <Link
            to="/shop?category=jewelry"
            className="group relative rounded-3xl overflow-hidden aspect-3/4 border border-[#D9B98C]/40 shadow-xs block"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
              alt="Jewelry collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <Gem className="w-6 h-6 text-[#D9B98C] mb-2" />
              <h3 className="font-serif text-2xl font-medium">Jewelry</h3>
              <p className="text-xs text-white/80">Gold, silver, kundan & pearls</p>
            </div>
          </Link>

          {/* Accessories */}
          <Link
            to="/shop?category=accessories"
            className="group relative rounded-3xl overflow-hidden aspect-3/4 border border-[#D9B98C]/40 shadow-xs block"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
              alt="Accessories collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <Glasses className="w-6 h-6 text-[#D9B98C] mb-2" />
              <h3 className="font-serif text-2xl font-medium">Accessories</h3>
              <p className="text-xs text-white/80">Bags, scarves, belts & sunglasses</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ================= SECTION D: COLOR INSPIRATION ================= */}
      <section className="bg-white/60 py-16 border-y border-[#D9B98C]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7A263A] mb-2 block">
              Color Harmonization
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#292521]">
              Color Inspiration
            </h2>
            <p className="text-sm text-[#6E675F] mt-3">
              Explore curated palettes designed to bring balance and vitality to diverse skin tones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {inspirationPalettes.map((p, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-[#D9B98C]/40 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#292521] mb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#6E675F] mb-6">{p.vibe}</p>

                  <div className="space-y-2.5">
                    {p.swatches.map((swatch) => (
                      <div
                        key={swatch.hex}
                        className="flex items-center justify-between p-2 rounded-xl bg-[#FAF6F0]"
                      >
                        <ColorSwatch
                          name={swatch.name}
                          hex={swatch.hex}
                          size="sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-black/5">
                  <Link
                    to="/discover"
                    className="text-xs font-semibold text-[#7A263A] hover:underline flex items-center justify-between"
                  >
                    <span>Test Your Undertone</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION E: FEATURED PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7A263A] mb-1.5 block">
              Hand-Picked Selections
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#292521]">
              Featured Products
            </h2>
            <p className="text-sm text-[#6E675F] mt-1">
              Top trending pieces across clothing, makeup, jewelry, and accessories.
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-wider text-[#7A263A] hover:underline flex items-center gap-1.5"
          >
            Explore All Products <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ================= SECTION F: STYLE ASSISTANT PROMO ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#7A263A] to-[#4A1522] text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D9B98C]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-[#D9B98C] font-semibold uppercase tracking-wider">
              <Wand2 className="w-3.5 h-3.5 text-[#D9B98C]" />
              Smart Outfit Coordination
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-white">
              Meet Your Personal Style Assistant.
            </h2>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
              Need a complete outfit for college, festive weddings, or a special evening? Tell us your budget and occasion, and we&apos;ll automatically coordinate clothes, jewelry, and beauty items that work in total color harmony.
            </p>

            <div className="pt-2">
              <Link
                to="/style-assistant"
                id="home-cta-style-assistant"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#D9B98C] hover:bg-[#E5C9A3] text-[#292521] text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:-translate-y-0.5"
              >
                <Wand2 className="w-4 h-4 text-[#7A263A]" />
                Build My Outfit Ideas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
