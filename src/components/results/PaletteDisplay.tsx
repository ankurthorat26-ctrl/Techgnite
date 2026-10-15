import React, { useState } from 'react';
import { PaletteRecommendation, SkinTone, Undertone } from '../../types';
import { ColorSwatch } from '../common/ColorSwatch';
import { 
  Sparkles, 
  ShoppingBag, 
  Wand2, 
  RotateCcw, 
  Bookmark, 
  Check, 
  Gem, 
  Shirt, 
  Palette, 
  HeartHandshake 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface PaletteDisplayProps {
  palette: PaletteRecommendation;
  skinTone: SkinTone;
  undertone: Undertone;
  genderPreference?: string;
}

export const PaletteDisplay: React.FC<PaletteDisplayProps> = ({
  palette,
  skinTone,
  undertone,
  genderPreference,
}) => {
  const [paletteSaved, setPaletteSaved] = useState(false);

  const handleSavePalette = () => {
    setPaletteSaved(true);
    setTimeout(() => setPaletteSaved(false), 2500);
  };

  return (
    <div className="space-y-12">
      {/* Editorial Header Banner */}
      <div className="bg-gradient-to-r from-[#292521] via-[#3A322C] to-[#292521] text-[#F7F0E8] rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#D9B98C]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-60 h-60 rounded-full bg-[#7A263A]/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-[#D9B98C] font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Personalized Color Harmonizer
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight mb-4">
            Your Palette: {palette.name}
          </h1>

          <p className="text-sm sm:text-base text-[#F7F0E8]/85 leading-relaxed mb-6">
            {palette.description}
          </p>

          {/* User profile tags */}
          <div className="flex flex-wrap items-center gap-3 text-xs mb-8">
            {genderPreference && genderPreference !== 'all' && (
              <span className="px-3.5 py-1.5 rounded-full bg-[#7A263A]/80 border border-[#7A263A] text-white">
                Wardrobe: <strong>{genderPreference === 'men' ? "Men's Fashion" : "Women's Fashion"}</strong>
              </span>
            )}
            <span className="px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-[#F7F0E8] capitalize">
              Skin Tone: <strong>{skinTone}</strong>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-white capitalize">
              Undertone: <strong>{undertone}</strong>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#D9B98C]">
              {palette.subtitle}
            </span>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7A263A] hover:bg-[#5E1D2D] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-4 h-4 text-[#D9B98C]" />
              Shop My Colors
            </Link>

            <Link
              to="/style-assistant"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <Wand2 className="w-4 h-4 text-[#D9B98C]" />
              Explore Outfits
            </Link>

            <button
              onClick={handleSavePalette}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              {paletteSaved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  Palette Saved
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  Save My Palette
                </>
              )}
            </button>

            <Link
              to="/discover"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full text-xs text-[#F7F0E8]/70 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Edit My Answers
            </Link>
          </div>
        </div>
      </div>

      {/* Swatch Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Best Starting Colors */}
        <div className="bg-white rounded-3xl p-6 border border-[#D9B98C]/30 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-black/5">
            <div className="w-7 h-7 rounded-full bg-[#7A263A]/10 text-[#7A263A] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-[#292521]">
                Best Starting Colors
              </h3>
              <p className="text-[11px] text-[#6E675F]">Core confidence builders</p>
            </div>
          </div>

          <p className="text-xs text-[#292521]/75 leading-relaxed">
            These shades naturally highlight your undertone with radiant contrast. Perfect for shirts, dresses, and tops.
          </p>

          <div className="space-y-3 pt-2">
            {palette.bestStartingColors.map((col) => (
              <div key={col.hex} className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF6F0] transition-colors">
                <ColorSwatch
                  name={col.name}
                  hex={col.hex}
                  size="md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 2. Neutral Staples */}
        <div className="bg-white rounded-3xl p-6 border border-[#D9B98C]/30 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-black/5">
            <div className="w-7 h-7 rounded-full bg-[#292521]/10 text-[#292521] flex items-center justify-center">
              <Shirt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-[#292521]">
                Neutral Foundations
              </h3>
              <p className="text-[11px] text-[#6E675F]">Outerwear & base staples</p>
            </div>
          </div>

          <p className="text-xs text-[#292521]/75 leading-relaxed">
            Your best replacements for harsh fluorescent black and white. Ideal for blazers, coats, trousers, and knitwear.
          </p>

          <div className="space-y-3 pt-2">
            {palette.neutrals.map((col) => (
              <div key={col.hex} className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF6F0] transition-colors">
                <ColorSwatch
                  name={col.name}
                  hex={col.hex}
                  size="md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Dramatic Accents */}
        <div className="bg-white rounded-3xl p-6 border border-[#D9B98C]/30 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-black/5">
            <div className="w-7 h-7 rounded-full bg-[#D9B98C]/30 text-[#7A263A] flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-[#292521]">
                Signature Accents
              </h3>
              <p className="text-[11px] text-[#6E675F]">Statement and evening hues</p>
            </div>
          </div>

          <p className="text-xs text-[#292521]/75 leading-relaxed">
            Rich, evocative jewel tones and vivid accents to incorporate into festive wear, scarves, clutches, or party looks.
          </p>

          <div className="space-y-3 pt-2">
            {palette.accents.map((col) => (
              <div key={col.hex} className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF6F0] transition-colors">
                <ColorSwatch
                  name={col.name}
                  hex={col.hex}
                  size="md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advisory Breakdown: Clothing, Jewelry, Makeup */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clothing Suggestions */}
        <div className="bg-[#FAF6F0] rounded-3xl p-6 border border-[#D9B98C]/40 space-y-3">
          <div className="flex items-center gap-2 text-[#7A263A]">
            <Shirt className="w-5 h-5" />
            <h3 className="font-serif text-xl font-medium text-[#292521]">
              Clothing Styling Notes
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs text-[#292521]/80 leading-relaxed list-disc list-inside">
            {palette.clothingSuggestions.map((suggestion, idx) => (
              <li key={idx} className="pl-1">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>

        {/* Jewelry Metals & Gemstones */}
        <div className="bg-[#FAF6F0] rounded-3xl p-6 border border-[#D9B98C]/40 space-y-3">
          <div className="flex items-center gap-2 text-[#7A263A]">
            <Gem className="w-5 h-5" />
            <h3 className="font-serif text-xl font-medium text-[#292521]">
              Jewelry & Metals
            </h3>
          </div>
          <p className="text-xs text-[#6E675F] leading-relaxed">
            {palette.jewelrySuggestions.description}
          </p>
          <div className="pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#292521] block mb-1.5">
              Recommended Metals:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {palette.jewelrySuggestions.metals.map((m) => (
                <span
                  key={m}
                  className="px-2.5 py-1 rounded-full bg-white text-[11px] text-[#292521] border border-black/10 font-medium"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#292521] block mb-1.5">
              Gemstones:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {palette.jewelrySuggestions.gemstones.map((g) => (
                <span
                  key={g}
                  className="px-2.5 py-1 rounded-full bg-[#D9B98C]/20 text-[11px] text-[#292521] border border-[#D9B98C]/40"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Makeup Color-Family Suggestions */}
        <div className="bg-[#FAF6F0] rounded-3xl p-6 border border-[#D9B98C]/40 space-y-3">
          <div className="flex items-center gap-2 text-[#7A263A]">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-serif text-xl font-medium text-[#292521]">
              Makeup Color Families
            </h3>
          </div>
          <p className="text-xs text-[#6E675F] leading-relaxed">
            {palette.makeupSuggestions.tips}
          </p>
          <div className="space-y-2 pt-1 text-xs">
            <div>
              <strong className="text-[#292521] block text-[11px] uppercase tracking-wider">
                Lips:
              </strong>
              <span className="text-[#292521]/80">
                {palette.makeupSuggestions.lipColors.join(' • ')}
              </span>
            </div>
            <div>
              <strong className="text-[#292521] block text-[11px] uppercase tracking-wider">
                Blush:
              </strong>
              <span className="text-[#292521]/80">
                {palette.makeupSuggestions.blushTones.join(' • ')}
              </span>
            </div>
            <div>
              <strong className="text-[#292521] block text-[11px] uppercase tracking-wider">
                Eyeshadow:
              </strong>
              <span className="text-[#292521]/80">
                {palette.makeupSuggestions.eyeShades.join(' • ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Inclusive Note */}
      <div className="p-4 rounded-2xl bg-white/70 border border-[#D9B98C]/50 flex items-start gap-3">
        <HeartHandshake className="w-5 h-5 text-[#7A263A] shrink-0 mt-0.5" />
        <div className="text-xs text-[#292521]/75 leading-relaxed">
          <strong>Friendly Guidance, Never Rigid Rules:</strong> Color theory is an expansive creative toolkit to celebrate your natural glow, not a restriction on what you can wear. If you love a shade that isn&apos;t in your core palette, wear it with confidence or balance it with familiar jewelry and accessories!
        </div>
      </div>
    </div>
  );
};
