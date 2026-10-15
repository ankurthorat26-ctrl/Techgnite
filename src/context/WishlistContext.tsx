import React, { createContext, useContext, useState, useEffect } from 'react';
import { SavedOutfit, OutfitRecommendation } from '../types';

interface WishlistContextType {
  wishlistIds: string[];
  savedOutfits: SavedOutfit[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  saveOutfit: (outfit: OutfitRecommendation) => void;
  removeOutfit: (outfitId: string) => void;
  isOutfitSaved: (outfitId: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WISHLIST_STORAGE_KEY = 'shadematch_wishlist_ids';
const OUTFITS_STORAGE_KEY = 'shadematch_saved_outfits';

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>(() => {
    try {
      const saved = localStorage.getItem(OUTFITS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem(OUTFITS_STORAGE_KEY, JSON.stringify(savedOutfits));
    } catch (e) {
      console.warn('Failed to save outfits to localStorage', e);
    }
  }, [savedOutfits]);

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlistIds.includes(productId);
  };

  const saveOutfit = (outfit: OutfitRecommendation) => {
    setSavedOutfits((prev) => {
      if (prev.some((o) => o.id === outfit.id)) {
        return prev;
      }
      const newSaved: SavedOutfit = {
        id: outfit.id,
        name: outfit.name,
        description: outfit.description,
        totalPrice: outfit.totalPrice,
        items: outfit.items,
        suggestedColors: outfit.suggestedColors,
        savedAt: new Date().toISOString(),
      };
      return [...prev, newSaved];
    });
  };

  const removeOutfit = (outfitId: string) => {
    setSavedOutfits((prev) => prev.filter((o) => o.id !== outfitId));
  };

  const isOutfitSaved = (outfitId: string) => {
    return savedOutfits.some((o) => o.id === outfitId);
  };

  const clearWishlist = () => {
    setWishlistIds([]);
    setSavedOutfits([]);
    try {
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
      localStorage.removeItem(OUTFITS_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear wishlist storage', e);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        savedOutfits,
        toggleWishlist,
        isInWishlist,
        saveOutfit,
        removeOutfit,
        isOutfitSaved,
        clearWishlist,
        wishlistCount: wishlistIds.length + savedOutfits.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export function useWishlist(): WishlistContextType {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
