import React, { useState } from 'react';
import { OutfitRecommendation } from '../../types';
import { Heart, Sparkles, Check, IndianRupee, Eye } from 'lucide-react';
import { ColorSwatch } from '../common/ColorSwatch';
import { useWishlist } from '../../context/WishlistContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Link } from 'react-router-dom';

interface OutfitCardProps {
  outfit: OutfitRecommendation;
}

export const OutfitCard: React.FC<OutfitCardProps> = ({ outfit }) => {
  const { isOutfitSaved, saveOutfit, removeOutfit } = useWishlist();
  const saved = isOutfitSaved(outfit.id);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggleSave = () => {
    if (saved) {
      removeOutfit(outfit.id);
      setToastMessage('Removed from Saved Outfits');
    } else {
      saveOutfit(outfit);
      setToastMessage('Outfit saved to Wishlist!');
    }
    setTimeout(() => setToastMessage(null), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#D9B98C]/40 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Header */}
      <div className="p-6 md:p-8 bg-gradient-to-b from-[#F7F0E8]/60 to-transparent border-b border-[#292521]/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {outfit.gender && (
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  outfit.gender === 'men'
                    ? 'bg-[#292521] text-[#D9B98C] border border-[#D9B98C]/30'
                    : outfit.gender === 'women'
                    ? 'bg-[#7A263A] text-white'
                    : 'bg-[#D9B98C]/30 text-[#292521] border border-[#D9B98C]/50'
                }`}>
                  {outfit.gender === 'men' ? "Men's Edit" : outfit.gender === 'women' ? "Women's Edit" : "Unisex"}
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full bg-[#7A263A]/10 text-[#7A263A] text-[10px] font-bold uppercase tracking-wider">
                {outfit.occasion.replace('_', ' ')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#292521]/10 text-[#292521] text-[10px] font-bold uppercase tracking-wider">
                {outfit.style.replace('_', ' ')}
              </span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-medium text-[#292521]">
              {outfit.name}
            </h3>
          </div>

          {/* Save button & Price */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#6E675F] block">
                Total Outfit Price
              </span>
              <span className="text-xl font-bold text-[#292521]">
                ₹{outfit.totalPrice.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={handleToggleSave}
              className={`p-3 rounded-full transition-all cursor-pointer ${
                saved
                  ? 'bg-[#7A263A] text-white shadow-md scale-105'
                  : 'bg-white border border-[#292521]/15 text-[#292521]/70 hover:text-[#7A263A] hover:bg-[#F7F0E8]'
              }`}
              title={saved ? 'Remove Outfit' : 'Save Outfit to Wishlist'}
              aria-label={saved ? 'Remove Outfit' : 'Save Outfit to Wishlist'}
            >
              <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#6E675F] leading-relaxed max-w-2xl mb-4">
          {outfit.description}
        </p>

        {/* Suggested Color Palette Swatches */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#292521] mr-1">
            Palette:
          </span>
          {outfit.suggestedColors.map((col) => (
            <ColorSwatch
              key={col.hex}
              name={col.name}
              hex={col.hex}
              size="sm"
              showHex={false}
              showName={true}
            />
          ))}
        </div>
      </div>

      {/* Outfit Product Items Grid */}
      <div className="p-6 md:p-8 space-y-6">
        <h4 className="text-xs uppercase tracking-widest text-[#292521] font-bold">
          Coordinated Pieces ({outfit.items.length})
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {outfit.items.map((item) => (
            <div
              key={item.id}
              className="group/item flex items-center gap-3.5 p-3 rounded-2xl bg-[#FAF6F0] border border-[#D9B98C]/30 hover:bg-white hover:border-[#7A263A]/30 transition-all shadow-2xs"
            >
              <div className="w-16 h-20 rounded-xl overflow-hidden shrink-0 bg-[#F7F0E8] relative">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  fallbackColor={item.availableColors[0]?.hex}
                  categoryLabel={item.category}
                  className="w-full h-full object-cover group-hover/item:scale-105 transition-transform"
                />
              </div>

              <div className="min-w-0 grow">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A263A] block truncate">
                  {item.brand} • {item.category} {item.gender && item.gender !== 'unisex' ? `• ${item.gender === 'men' ? "Men's" : "Women's"}` : ''}
                </span>
                <Link
                  to={`/product/${item.id}`}
                  className="font-serif text-sm font-medium text-[#292521] hover:text-[#7A263A] block truncate transition-colors"
                >
                  {item.name}
                </Link>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold text-[#292521]">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                  <Link
                    to={`/product/${item.id}`}
                    className="text-[11px] text-[#7A263A] hover:underline flex items-center gap-0.5"
                  >
                    View <Eye className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why it works Explanation */}
        <div className="p-4 rounded-2xl bg-[#F7F0E8] border border-[#D9B98C]/40 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-[#7A263A] shrink-0 mt-0.5" />
          <div className="text-xs text-[#292521]/80 leading-relaxed">
            <strong className="text-[#292521] block mb-0.5">Why this coordination works:</strong>
            {outfit.explanation}
          </div>
        </div>
      </div>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#292521] text-white text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-[#D9B98C]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
