import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Home, ShoppingBag } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-[#FAF6F0] text-[#7A263A] flex items-center justify-center mx-auto mb-6 border border-[#D9B98C]/40">
        <Sparkles className="w-8 h-8" />
      </div>

      <span className="text-xs uppercase tracking-widest text-[#7A263A] font-bold block mb-2">
        Error 404 • Page Not Found
      </span>

      <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#292521] mb-4">
        This shade seems out of range.
      </h1>

      <p className="text-xs sm:text-sm text-[#6E675F] max-w-md mx-auto mb-8 leading-relaxed">
        The link you followed may be broken or the page may have been moved. Let&apos;s get you back to discovering your colors or exploring our curated shop.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7A263A] hover:bg-[#5E1D2D] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
        >
          <Home className="w-3.5 h-3.5 text-[#D9B98C]" />
          Return Home
        </Link>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#292521]/20 hover:bg-[#FAF6F0] text-[#292521] text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#7A263A]" />
          Browse Shop
        </Link>
      </div>
    </div>
  );
};
