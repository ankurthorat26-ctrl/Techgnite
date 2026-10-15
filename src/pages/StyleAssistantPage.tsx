import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { generateOutfits, StyleAssistantQuery } from '../recommendation/outfitEngine';
import { OutfitCard } from '../components/outfits/OutfitCard';
import { PersonalStyle, Occasion, BudgetRange, GenderPreference } from '../types';
import { Wand2, Sparkles, RefreshCw, CheckCircle2, Users, User } from 'lucide-react';

export const StyleAssistantPage: React.FC = () => {
  const { quizAnswers } = useProfile();

  const [gender, setGender] = useState<GenderPreference>(
    quizAnswers?.genderPreference || 'women'
  );
  const [occasion, setOccasion] = useState<Occasion>(
    quizAnswers?.occasions?.[0] || 'college'
  );
  const [style, setStyle] = useState<PersonalStyle>(
    quizAnswers?.personalStyles?.[0] || 'casual'
  );
  const [budget, setBudget] = useState<BudgetRange>(quizAnswers?.budget || 'all');
  const [favoriteColorTone, setFavoriteColorTone] = useState<string>('Warm Earth & Terracotta');

  const [query, setQuery] = useState<StyleAssistantQuery>({
    gender,
    occasion,
    style,
    budget,
    favoriteColorTone,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [outfits, setOutfits] = useState(() => generateOutfits(query));

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    const updatedQuery: StyleAssistantQuery = {
      gender,
      occasion,
      style,
      budget,
      favoriteColorTone,
    };
    setQuery(updatedQuery);

    setTimeout(() => {
      setOutfits(generateOutfits(updatedQuery));
      setIsGenerating(false);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }, 400);
  };

  const occasionsList: { label: string; value: Occasion }[] = [
    { label: 'College & Campus', value: 'college' },
    { label: 'Everyday Casual', value: 'everyday' },
    { label: 'Office & Professional', value: 'office' },
    { label: 'Party & Night Out', value: 'party' },
    { label: 'Wedding & Festive', value: 'wedding_festive' },
    { label: 'Special Occasion', value: 'special_occasion' },
  ];

  const stylesList: { label: string; value: PersonalStyle }[] = [
    { label: 'Casual', value: 'casual' },
    { label: 'Minimalist', value: 'minimalist' },
    { label: 'Trendy', value: 'trendy' },
    { label: 'Streetwear', value: 'streetwear' },
    { label: 'Elegant', value: 'elegant' },
    { label: 'Ethnic / Indo-Western', value: 'ethnic_indowestern' },
    { label: 'Romantic', value: 'romantic' },
    { label: 'Bold', value: 'bold' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A263A]/10 border border-[#7A263A]/20 text-[#7A263A] text-xs font-semibold tracking-wider uppercase">
          <Wand2 className="w-3.5 h-3.5 text-[#7A263A]" />
          Intelligent Styling Studio
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#292521]">
          Style Assistant
        </h1>

        <p className="text-xs sm:text-base text-[#6E675F] leading-relaxed">
          Select your wardrobe gender focus, occasion, aesthetic style, and budget limit. Our engine coordinates full ensembles—pairing matching apparel, complementary jewelry, and harmonious makeup or accessories with transparent price calculations.
        </p>
      </div>

      {/* Interactive Criteria Form */}
      <form
        onSubmit={handleGenerate}
        className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D9B98C]/40 shadow-xs max-w-4xl mx-auto space-y-8"
      >
        {/* Gender Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#292521] mb-2.5">
            Gender / Styling Archetype
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Women's Fashion", value: 'women' as const, icon: Sparkles },
              { label: "Men's Fashion", value: 'men' as const, icon: User },
              { label: 'All / Gender-Neutral', value: 'all' as const, icon: Users },
            ].map((g) => {
              const Icon = g.icon;
              const isSelected = gender === g.value;
              return (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGender(g.value)}
                  className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#7A263A] text-white border-[#7A263A] shadow-xs'
                      : 'bg-[#FAF6F0] border-[#292521]/15 text-[#292521] hover:bg-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{g.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Occasion */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#292521] mb-2">
              Occasion
            </label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value as Occasion)}
              className="w-full p-3 rounded-xl bg-[#FAF6F0] border border-[#292521]/15 text-xs font-medium text-[#292521] focus:ring-1 focus:ring-[#7A263A]"
            >
              {occasionsList.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* Aesthetic Style */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#292521] mb-2">
              Preferred Style
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as PersonalStyle)}
              className="w-full p-3 rounded-xl bg-[#FAF6F0] border border-[#292521]/15 text-xs font-medium text-[#292521] focus:ring-1 focus:ring-[#7A263A]"
            >
              {stylesList.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Range */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#292521] mb-2">
              Ensemble Budget (INR)
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value as BudgetRange)}
              className="w-full p-3 rounded-xl bg-[#FAF6F0] border border-[#292521]/15 text-xs font-medium text-[#292521] focus:ring-1 focus:ring-[#7A263A]"
            >
              <option value="all">Flexible / All Budgets</option>
              <option value="under_500">Under ₹500 (Budget-friendly)</option>
              <option value="500_1000">₹500 – ₹1,000</option>
              <option value="1000_2500">₹1,000 – ₹2,500</option>
              <option value="2500_above">₹2,500 & Above (Festive & Luxury)</option>
            </select>
          </div>
        </div>

        {/* Favorite Tone / Mood */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#292521] mb-2">
            Palette Mood & Contrast Focus
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              'Warm Earth & Terracotta',
              'Cool Berry & Royal Navy',
              'Subtle Cashmere Neutral',
              'Regal Saffron & Emerald',
            ].map((tone) => (
              <button
                type="button"
                key={tone}
                onClick={() => setFavoriteColorTone(tone)}
                className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                  favoriteColorTone === tone
                    ? 'bg-[#292521] text-white border-[#292521] shadow-xs'
                    : 'bg-[#FAF6F0] border-[#292521]/10 text-[#292521]/75 hover:bg-white'
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Submit Button */}
        <div className="pt-2 text-center">
          <button
            type="submit"
            id="style-assistant-submit-btn"
            disabled={isGenerating}
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-[#7A263A] hover:bg-[#5E1D2D] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-lg cursor-pointer hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#D9B98C]" />
                Harmonizing Outfits...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#D9B98C]" />
                Generate 3 Coordinated Outfits
              </>
            )}
          </button>
        </div>
      </form>

      {/* Generated Outfits Section */}
      <div className="space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#292521]/10">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#292521]">
              Recommended Outfit Combinations ({outfits.length})
            </h2>
            <p className="text-xs text-[#6E675F] mt-1">
              Every outfit is constructed with real catalog pieces, accurate price sums, and color theory rationale.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#7A263A] font-semibold">
            <CheckCircle2 className="w-4 h-4" /> Ready to Save to Wishlist
          </div>
        </div>

        <div className="space-y-10">
          {outfits.map((outfit) => (
            <OutfitCard key={outfit.id} outfit={outfit} />
          ))}
        </div>
      </div>
    </div>
  );
};
