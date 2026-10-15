import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { useProfile } from '../context/ProfileContext';
import { evaluateProductMatch } from '../recommendation/engine';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { ProductCard } from '../components/product/ProductCard';
import { 
  Heart, 
  ExternalLink, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  ShoppingBag, 
  Info 
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { quizAnswers } = useProfile();
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-[#FAF6F0] text-[#7A263A] flex items-center justify-center mx-auto mb-4 border border-[#D9B98C]/30">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-medium text-[#292521] mb-2">
          Product Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#6E675F] mb-6">
          The requested product ID does not exist in our catalog or may have been updated.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7A263A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#5E1D2D] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Shop
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);
  const currentColor = product.availableColors[selectedColorIdx] || product.availableColors[0];

  // Match score evaluation
  const matchResult = quizAnswers ? evaluateProductMatch(product, quizAnswers) : null;

  // Similar products in the same category
  const similarProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
      {/* Back to shop navigation */}
      <div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#6E675F] hover:text-[#7A263A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Product Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl overflow-hidden aspect-4/5 bg-[#FAF6F0] border border-[#D9B98C]/40 shadow-sm relative">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              fallbackColor={currentColor?.hex}
              categoryLabel={product.category}
              className="w-full h-full object-cover"
            />

            {matchResult && (
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-[#292521]/90 backdrop-blur-xs text-[#D9B98C] text-xs font-bold flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#D9B98C]" />
                {matchResult.score}% Compatibility
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Product Meta & Purchase Actions */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <div className="flex items-center justify-between text-xs text-[#6E675F] mb-2">
              <span className="font-bold uppercase tracking-widest text-[#7A263A]">
                {product.brand}
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#FAF6F0] border border-[#D9B98C]/40 font-medium capitalize">
                  {product.category}
                </span>
                {product.gender && (
                  <span className="px-2.5 py-0.5 rounded-md bg-[#7A263A]/10 text-[#7A263A] border border-[#7A263A]/20 font-bold uppercase tracking-wider text-[10px]">
                    {product.gender === 'men' ? "Men's" : product.gender === 'women' ? "Women's" : "Unisex"}
                  </span>
                )}
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#292521] font-medium leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-[#292521]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#6E675F]">Inclusive of all taxes</span>
            </div>

            <p className="text-sm text-[#6E675F] leading-relaxed mb-6">
              {product.shortDescription}
            </p>
          </div>

          {/* Color Palette Swatches */}
          <div className="space-y-3 pt-4 border-t border-black/5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#292521] block">
              Available Shade: <strong className="text-[#7A263A]">{currentColor.name}</strong>
            </span>
            <div className="flex items-center gap-3">
              {product.availableColors.map((col, idx) => (
                <button
                  key={col.hex + idx}
                  onClick={() => setSelectedColorIdx(idx)}
                  className={`flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all cursor-pointer ${
                    selectedColorIdx === idx
                      ? 'border-[#7A263A] bg-white ring-2 ring-[#7A263A] shadow-xs'
                      : 'border-black/10 bg-white/70 hover:bg-white'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-black/10 inline-block shadow-inner"
                    style={{ backgroundColor: col.hex }}
                  />
                  <span className="text-xs font-medium text-[#292521]">{col.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Actions: Add to Wishlist & Shop Retailer */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`w-full sm:w-auto grow flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md ${
                isSaved
                  ? 'bg-[#7A263A] text-white hover:bg-[#5E1D2D]'
                  : 'bg-white border border-[#292521]/20 text-[#292521] hover:bg-[#FAF6F0]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              {isSaved ? 'Saved in Wishlist' : 'Add to Wishlist'}
            </button>

            {product.retailerUrl && (
              <a
                href={product.retailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#292521] hover:bg-[#403B35] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                <span>Shop at {product.retailerName}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#D9B98C]" />
              </a>
            )}
          </div>

          {/* Sample Product Notice */}
          <div className="p-3.5 bg-white/60 border border-black/5 rounded-2xl flex items-center gap-2.5 text-xs text-[#6E675F]">
            <Info className="w-4 h-4 text-[#7A263A] shrink-0" />
            <span>
              Sample catalog item curated for ShadeMatch portfolio demo. Verified prices and external retailer links are illustrative.
            </span>
          </div>

          {/* "Why it Matches" Breakdown Component */}
          {matchResult ? (
            <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D9B98C]/50 space-y-4">
              <div className="flex items-center gap-2 text-[#7A263A]">
                <Sparkles className="w-4 h-4" />
                <h3 className="font-serif text-lg font-medium text-[#292521]">
                  Why this piece matches your profile
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-black/5">
                  <span className="text-[10px] uppercase font-bold text-[#6E675F] block mb-0.5">
                    Color Compatibility (40%)
                  </span>
                  <span className="font-bold text-[#7A263A] text-sm">
                    {matchResult.breakdown.colorScore}%
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-black/5">
                  <span className="text-[10px] uppercase font-bold text-[#6E675F] block mb-0.5">
                    Style Fit (25%)
                  </span>
                  <span className="font-bold text-[#7A263A] text-sm">
                    {matchResult.breakdown.styleScore}%
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-black/5">
                  <span className="text-[10px] uppercase font-bold text-[#6E675F] block mb-0.5">
                    Category Need (20%)
                  </span>
                  <span className="font-bold text-[#7A263A] text-sm">
                    {matchResult.breakdown.categoryScore}%
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-black/5">
                  <span className="text-[10px] uppercase font-bold text-[#6E675F] block mb-0.5">
                    Occasion Alignment (10%)
                  </span>
                  <span className="font-bold text-[#7A263A] text-sm">
                    {matchResult.breakdown.occasionScore}%
                  </span>
                </div>
              </div>

              <div className="text-xs text-[#292521]/80 leading-relaxed space-y-1 pt-1">
                {matchResult.reasons.map((reason, idx) => (
                  <p key={idx} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#D9B98C]/40 flex items-center justify-between gap-4">
              <div className="text-xs text-[#6E675F]">
                Take our quick quiz to see your exact undertone compatibility breakdown for this piece.
              </div>
              <Link
                to="/discover"
                className="px-4 py-2 rounded-full bg-[#7A263A] text-white text-xs font-semibold uppercase tracking-wider shrink-0 hover:bg-[#5E1D2D]"
              >
                Take Quiz
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Similar Products in Category */}
      {similarProducts.length > 0 && (
        <div className="pt-12 border-t border-[#292521]/10 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#292521]">
              Similar Pieces You Might Love
            </h2>
            <Link
              to={`/shop?category=${product.category}`}
              className="text-xs font-bold uppercase tracking-wider text-[#7A263A] hover:underline"
            >
              View More in {product.category} →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProducts.map((sim) => (
              <ProductCard key={sim.id} product={sim} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
