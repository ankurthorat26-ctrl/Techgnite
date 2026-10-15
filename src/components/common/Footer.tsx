import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Heart, RotateCcw } from 'lucide-react';
import { PrivacyModal } from './PrivacyModal';

export const Footer: React.FC = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#292521] text-[#F7F0E8] border-t border-[#D9B98C]/20 pt-16 pb-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Brand column */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#7A263A] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#D9B98C]" />
                </div>
                <span className="font-serif text-2xl font-semibold tracking-tight text-white">
                  ShadeMatch
                </span>
              </div>
              <p className="text-xs text-[#F7F0E8]/70 leading-relaxed">
                Shop your shade. Find your style. The modern color-first fashion advisory platform celebrating every skin tone with intelligent harmony algorithms.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-[#D9B98C]">
                  <Sparkles className="w-3 h-3" /> MVP Product Release
                </span>
              </div>
            </div>

            {/* Platform links */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#D9B98C] font-semibold mb-4">
                Explore Studio
              </h4>
              <ul className="space-y-2.5 text-xs text-[#F7F0E8]/75">
                <li>
                  <Link to="/discover" className="hover:text-white transition-colors">
                    Discover Your Colors
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="hover:text-white transition-colors">
                    Curated Shop
                  </Link>
                </li>
                <li>
                  <Link to="/style-assistant" className="hover:text-white transition-colors">
                    Style Assistant & Outfits
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="hover:text-white transition-colors">
                    Saved Items & Wishlist
                  </Link>
                </li>
              </ul>
            </div>

            {/* Methodology & Ethics */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#D9B98C] font-semibold mb-4">
                Color Philosophy
              </h4>
              <ul className="space-y-2.5 text-xs text-[#F7F0E8]/75">
                <li>
                  <span className="hover:text-white transition-colors cursor-default">
                    Undertone Temperature Science
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-default">
                    Indian Skin Tone Nuances
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-default">
                    Contrast & Lighting Clarity
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-default">
                    Celebration of Inclusivity
                  </span>
                </li>
              </ul>
            </div>

            {/* Privacy & Trust */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#D9B98C] font-semibold mb-4">
                Privacy & Control
              </h4>
              <p className="text-xs text-[#F7F0E8]/70 mb-4 leading-relaxed">
                Zero server tracking. Your style preferences and photos remain completely private to your local browser.
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => setPrivacyOpen(true)}
                  className="w-full text-left inline-flex items-center gap-2 text-xs text-[#D9B98C] hover:underline cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Privacy Notice & Local Data
                </button>
                <button
                  onClick={() => setPrivacyOpen(true)}
                  className="w-full text-left inline-flex items-center gap-2 text-xs text-rose-300 hover:text-rose-200 hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Saved Quiz & Wishlist
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F7F0E8]/50 gap-4">
            <p>
              © {new Date().getFullYear()} ShadeMatch Inc. Crafted for fashion enthusiasts with thoughtful color theory.
            </p>
            <div className="flex items-center gap-4">
              <span>Prices in Indian Rupees (INR ₹)</span>
              <span>•</span>
              <button
                onClick={() => setPrivacyOpen(true)}
                className="hover:text-white transition-colors underline cursor-pointer"
              >
                Privacy Details
              </button>
            </div>
          </div>
        </div>
      </footer>

      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  );
};
