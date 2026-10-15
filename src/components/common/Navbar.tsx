import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Heart, 
  Menu, 
  X, 
  Compass, 
  ShoppingBag, 
  Wand2, 
  Palette 
} from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useProfile } from '../../context/ProfileContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { wishlistCount } = useWishlist();
  const { hasCompletedQuiz, quizAnswers } = useProfile();
  const location = useLocation();

  const closeMenu = () => setMobileMenuOpen(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-xs uppercase tracking-widest transition-colors py-1 relative ${
      isActive
        ? 'text-[#7A263A] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#7A263A]'
        : 'text-[#292521]/75 hover:text-[#7A263A]'
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
      isActive
        ? 'bg-[#7A263A] text-white'
        : 'text-[#292521] hover:bg-black/5'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-[#F7F0E8]/95 backdrop-blur-md border-b border-[#D9B98C]/30 transition-all">
      {/* Top micro-bar for Quiz status if completed */}
      {hasCompletedQuiz && quizAnswers && (
        <div className="bg-[#292521] text-[#F7F0E8] text-[11px] py-1.5 px-4 text-center flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#D9B98C] animate-pulse" />
          <span>
            Active Profile: <strong className="capitalize text-[#D9B98C]">{quizAnswers.undertone} Undertone</strong> ({quizAnswers.skinTone} Tone{quizAnswers.genderPreference && quizAnswers.genderPreference !== 'all' ? ` • ${quizAnswers.genderPreference === 'men' ? "Men's" : "Women's"}` : ''})
          </span>
          <Link
            to="/results"
            className="underline hover:text-[#D9B98C] ml-2 font-medium"
          >
            View My Palette →
          </Link>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group"
            onClick={closeMenu}
          >
            <div className="w-10 h-10 rounded-full bg-[#7A263A] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-[#D9B98C]" />
            </div>
            <div>
              <span className="font-serif text-2xl font-semibold tracking-tight text-[#292521] block leading-none">
                ShadeMatch
              </span>
              <span className="text-[10px] tracking-widest text-[#7A263A] uppercase font-semibold">
                Fashion & Tone Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/discover" className={navLinkClass}>
              Discover Your Colors
            </NavLink>
            <NavLink to="/shop" className={navLinkClass}>
              Shop
            </NavLink>
            <NavLink to="/style-assistant" className={navLinkClass}>
              Style Assistant
            </NavLink>
            <NavLink to="/wishlist" className={navLinkClass}>
              <span className="flex items-center gap-1.5">
                Wishlist
                {wishlistCount > 0 && (
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#7A263A] text-white text-[10px] font-bold">
                    {wishlistCount}
                  </span>
                )}
              </span>
            </NavLink>
          </nav>

          {/* Right actions (Desktop CTA & Wishlist Icon) */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/wishlist"
              className="p-2.5 rounded-full hover:bg-black/5 text-[#292521] relative transition-colors"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-[#7A263A]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#7A263A] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/discover"
              id="nav-cta-find-colors"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7A263A] hover:bg-[#5E1D2D] text-white text-xs font-semibold tracking-wider uppercase shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <Compass className="w-3.5 h-3.5 text-[#D9B98C]" />
              Find My Colors
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              to="/wishlist"
              className="p-2 rounded-full hover:bg-black/5 text-[#292521] relative"
              aria-label="Wishlist"
              onClick={closeMenu}
            >
              <Heart className="w-5 h-5 text-[#7A263A]" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#7A263A] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#292521] hover:bg-black/5 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF6F0] border-b border-[#D9B98C]/40 px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-lg">
          <NavLink to="/" className={mobileNavLinkClass} onClick={closeMenu}>
            <Sparkles className="w-4 h-4" />
            Home
          </NavLink>
          <NavLink to="/discover" className={mobileNavLinkClass} onClick={closeMenu}>
            <Compass className="w-4 h-4" />
            Discover Your Colors
          </NavLink>
          {hasCompletedQuiz && (
            <NavLink to="/results" className={mobileNavLinkClass} onClick={closeMenu}>
              <Palette className="w-4 h-4" />
              My Color Palette
            </NavLink>
          )}
          <NavLink to="/shop" className={mobileNavLinkClass} onClick={closeMenu}>
            <ShoppingBag className="w-4 h-4" />
            Shop
          </NavLink>
          <NavLink to="/style-assistant" className={mobileNavLinkClass} onClick={closeMenu}>
            <Wand2 className="w-4 h-4" />
            Style Assistant
          </NavLink>
          <NavLink to="/wishlist" className={mobileNavLinkClass} onClick={closeMenu}>
            <Heart className="w-4 h-4" />
            Wishlist ({wishlistCount})
          </NavLink>

          <div className="pt-4 border-t border-black/10">
            <Link
              to="/discover"
              className="w-full py-3 rounded-full bg-[#7A263A] text-white text-xs font-semibold tracking-wider uppercase text-center block shadow-sm"
              onClick={closeMenu}
            >
              Find My Colors
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
