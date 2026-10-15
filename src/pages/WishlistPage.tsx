import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { EmptyState } from '../components/common/EmptyState';
import { ColorSwatch } from '../components/common/ColorSwatch';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { 
  Heart, 
  Trash2, 
  ShoppingBag, 
  Sparkles, 
  Wand2, 
  Eye, 
  Check 
} from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlistIds, savedOutfits, clearWishlist, removeOutfit } = useWishlist();
  const [activeTab, setActiveTab] = useState<'products' | 'outfits'>('products');

  const savedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const totalItemCount = savedProducts.length + savedOutfits.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#292521]/10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7A263A] mb-1.5 block">
            Saved Wardrobe & Outfits
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#292521]">
            Your Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-[#6E675F] mt-1">
            Persisted in your browser via local storage. Synchronized across all pages.
          </p>
        </div>

        {totalItemCount > 0 && (
          <button
            onClick={clearWishlist}
            className="inline-flex items-center gap-1.5 text-xs text-rose-700 hover:text-rose-900 font-semibold hover:underline cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Wishlist ({totalItemCount})
          </button>
        )}
      </div>

      {/* Tabs if both or either exists */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'products'
              ? 'bg-[#7A263A] text-white shadow-xs'
              : 'bg-white border border-[#292521]/15 text-[#292521] hover:bg-[#FAF6F0]'
          }`}
        >
          Saved Products ({savedProducts.length})
        </button>

        <button
          onClick={() => setActiveTab('outfits')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'outfits'
              ? 'bg-[#7A263A] text-white shadow-xs'
              : 'bg-white border border-[#292521]/15 text-[#292521] hover:bg-[#FAF6F0]'
          }`}
        >
          Saved Outfits ({savedOutfits.length})
        </button>
      </div>

      {/* Tab 1: Products */}
      {activeTab === 'products' && (
        <div>
          {savedProducts.length === 0 ? (
            <EmptyState
              icon={Heart}
              title="Your Wishlist is Empty"
              description="You haven't saved any fashion or beauty pieces yet. Click the heart icon on any product to save it here for later."
              actionText="Explore the Shop"
              actionHref="/shop"
              secondaryActionText="Find My Colors"
              secondaryActionHref="/discover"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {savedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Outfits */}
      {activeTab === 'outfits' && (
        <div>
          {savedOutfits.length === 0 ? (
            <EmptyState
              icon={Wand2}
              title="No Saved Outfits Yet"
              description="Visit our Style Assistant to generate coordinated three-piece ensembles and save your favorites here."
              actionText="Open Style Assistant"
              actionHref="/style-assistant"
            />
          ) : (
            <div className="space-y-8">
              {savedOutfits.map((outfit) => (
                <div
                  key={outfit.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9B98C]/40 shadow-xs relative flex flex-col justify-between"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-black/5">
                    <div>
                      <h3 className="font-serif text-2xl font-medium text-[#292521]">
                        {outfit.name}
                      </h3>
                      <p className="text-xs text-[#6E675F] mt-1 max-w-xl">
                        {outfit.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-[#6E675F] block">
                          Total Ensemble
                        </span>
                        <span className="text-lg font-bold text-[#292521]">
                          ₹{outfit.totalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <button
                        onClick={() => removeOutfit(outfit.id)}
                        className="p-2.5 rounded-full text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                        title="Remove saved outfit"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Swatches */}
                  <div className="flex items-center gap-2 mb-6 flex-wrap">
                    <span className="text-[11px] font-bold uppercase text-[#292521] mr-1">
                      Ensemble Palette:
                    </span>
                    {outfit.suggestedColors?.map((c) => (
                      <ColorSwatch
                        key={c.hex}
                        name={c.name}
                        hex={c.hex}
                        size="sm"
                        showHex={false}
                      />
                    ))}
                  </div>

                  {/* Product items in outfit */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {outfit.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF6F0] border border-black/5"
                      >
                        <div className="w-14 h-16 rounded-xl overflow-hidden shrink-0 bg-[#F7F0E8]">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 grow">
                          <span className="text-[10px] uppercase font-bold text-[#7A263A] block truncate">
                            {item.brand}
                          </span>
                          <Link
                            to={`/product/${item.id}`}
                            className="font-serif text-xs font-medium text-[#292521] hover:text-[#7A263A] block truncate"
                          >
                            {item.name}
                          </Link>
                          <span className="text-xs font-bold text-[#292521]">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
