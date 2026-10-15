import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ExternalLink, Sparkles, Eye, Check } from 'lucide-react';
import { Product, QuizAnswers } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useWishlist } from '../../context/WishlistContext';
import { useProfile } from '../../context/ProfileContext';
import { evaluateProductMatch } from '../../recommendation/engine';

interface ProductCardProps {
  product: Product;
  customQuizAnswers?: QuizAnswers | null;
  priorityScore?: number;
  priorityReason?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  customQuizAnswers,
  priorityScore,
  priorityReason,
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { quizAnswers } = useProfile();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [retailerModalOpen, setRetailerModalOpen] = useState(false);

  const activeAnswers = customQuizAnswers !== undefined ? customQuizAnswers : quizAnswers;
  const isSaved = isInWishlist(product.id);

  // Evaluate match score if user has quiz answers
  let matchScore = priorityScore;
  let matchReason = priorityReason;

  if (matchScore === undefined && activeAnswers) {
    const evaluation = evaluateProductMatch(product, activeAnswers);
    matchScore = evaluation.score;
    matchReason = evaluation.reasons[0] || 'Matches your profile';
  }

  const currentColor = product.availableColors[selectedColorIndex] || product.availableColors[0];

  const handleRetailerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.retailerUrl) {
      window.open(product.retailerUrl, '_blank', 'noopener,noreferrer');
    } else {
      setRetailerModalOpen(true);
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#D9B98C]/30 hover:border-[#7A263A]/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full relative">
      {/* Top badges: Match score & Category */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 pointer-events-none">
        {matchScore !== undefined && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#292521]/90 backdrop-blur-xs text-[#D9B98C] text-[11px] font-semibold tracking-wide shadow-xs">
            <Sparkles className="w-3 h-3 text-[#D9B98C]" />
            {matchScore}% Match
          </span>
        )}
        <div className="flex items-center gap-1">
          <span className="inline-block px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[#292521] text-[10px] font-medium uppercase tracking-wider shadow-xs">
            {product.category}
          </span>
          {product.gender && product.gender !== 'unisex' && (
            <span className="inline-block px-1.5 py-0.5 rounded-md bg-[#FAF6F0]/95 backdrop-blur-xs text-[#7A263A] text-[9px] font-bold uppercase tracking-wider shadow-xs border border-[#D9B98C]/30">
              {product.gender}
            </span>
          )}
        </div>
      </div>

      {/* Wishlist Heart Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
          isSaved
            ? 'bg-[#7A263A] text-white scale-110'
            : 'bg-white/80 hover:bg-white text-[#292521]/70 hover:text-[#7A263A]'
        }`}
        title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
        aria-label={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
      </button>

      {/* Product Image Link */}
      <Link 
        to={`/product/${product.id}`}
        className="block relative aspect-4/5 overflow-hidden bg-[#F7F0E8]"
      >
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          fallbackColor={currentColor?.hex || '#D9B98C'}
          categoryLabel={product.category}
          className="w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Hover overlay quick action */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-white/95 text-[#292521] text-xs font-medium flex items-center gap-1.5 shadow-md">
            <Eye className="w-3.5 h-3.5" /> View Details
          </span>
        </div>
      </Link>

      {/* Product Meta Body */}
      <div className="p-4 flex flex-col grow justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-[#6E675F] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[#7A263A]">
              {product.brand}
            </span>
            <span className="text-[10px] text-amber-700 font-medium">★ {product.rating || '4.8'}</span>
          </div>

          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-serif text-lg text-[#292521] font-medium leading-snug line-clamp-1 group-hover:text-[#7A263A] transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Color swatches */}
          <div className="flex items-center gap-1.5 mt-2.5 mb-2">
            {product.availableColors.map((col, idx) => (
              <button
                key={col.hex + idx}
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColorIndex === idx 
                    ? 'ring-2 ring-[#7A263A] ring-offset-1 scale-110' 
                    : 'border-black/15 hover:scale-105'
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
                aria-label={`Select ${col.name}`}
              />
            ))}
            <span className="text-[11px] text-[#6E675F] ml-1 truncate">
              {currentColor?.name}
            </span>
          </div>

          {/* "Why it matches" snippet if available */}
          {matchReason && (
            <div className="mt-2 text-[11px] text-[#6E675F] bg-[#FAF6F0] p-2 rounded-lg border border-[#D9B98C]/30 flex items-start gap-1.5">
              <Sparkles className="w-3 h-3 text-[#7A263A] shrink-0 mt-0.5" />
              <span className="line-clamp-2">{matchReason}</span>
            </div>
          )}
        </div>

        {/* Footer row: Price & Retailer CTA */}
        <div className="pt-3 mt-3 border-t border-black/5 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#6E675F]">INR</span>
            <span className="text-base font-bold text-[#292521] ml-1">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={handleRetailerClick}
            className="text-xs font-semibold text-[#7A263A] hover:text-[#5E1D2D] hover:underline inline-flex items-center gap-1 cursor-pointer"
            title={`Shop at ${product.retailerName}`}
          >
            <span>{product.retailerName}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
