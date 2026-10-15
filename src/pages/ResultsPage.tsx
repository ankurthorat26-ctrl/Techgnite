import React from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { PaletteDisplay } from '../components/results/PaletteDisplay';
import { ProductCard } from '../components/product/ProductCard';
import { PRODUCTS } from '../data/products';
import { getRecommendedProducts } from '../recommendation/engine';
import { PALETTES } from '../data/palettes';
import { Sparkles, ArrowRight, Compass, ShoppingBag, Wand2 } from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const { quizAnswers, palette } = useProfile();

  // If no quiz has been taken yet, show a rich default preview (Warm Medium) with invitation to personalize
  const activePalette = palette || PALETTES['warm_medium_tan'];
  const activeSkinTone = quizAnswers?.skinTone || 'medium';
  const activeUndertone = quizAnswers?.undertone || 'warm';

  // Get matching products based on quiz answers
  const recommendedResults = quizAnswers
    ? getRecommendedProducts(PRODUCTS, quizAnswers, true)
    : PRODUCTS.slice(0, 4).map((p) => ({
        product: p,
        score: 92,
        breakdown: {
          colorScore: 95,
          styleScore: 90,
          categoryScore: 100,
          occasionScore: 90,
          budgetScore: 90,
        },
        reasons: ['Harmonizes with warm golden undertone spectrum.'],
      }));

  const topProducts = recommendedResults.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
      {/* Quiz Prompt Banner if user hasn't taken quiz yet */}
      {!quizAnswers && (
        <div className="bg-[#FAF6F0] border border-[#D9B98C] rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7A263A]/10 text-[#7A263A] flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#7A263A]">
                Sample Palette Preview
              </p>
              <p className="text-xs text-[#6E675F]">
                Showing our Warm Medium spectrum. Take the 2-minute quiz to generate your exact undertone match!
              </p>
            </div>
          </div>
          <Link
            to="/discover"
            className="px-5 py-2.5 rounded-full bg-[#7A263A] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#5E1D2D] transition-colors whitespace-nowrap shadow-xs"
          >
            Take the Quiz →
          </Link>
        </div>
      )}

      {/* Main Palette Display Component */}
      <PaletteDisplay
        palette={activePalette}
        skinTone={activeSkinTone}
        undertone={activeUndertone}
        genderPreference={quizAnswers?.genderPreference}
      />

      {/* Matched Products Section */}
      <section className="space-y-8 pt-8 border-t border-[#292521]/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7A263A] mb-1.5 block">
              Recommendation Engine
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#292521]">
              Products Matched to Your Colors
            </h2>
            <p className="text-xs sm:text-sm text-[#6E675F] mt-1">
              Deterministic scoring based on undertone compatibility (40%), style (25%), category (20%), occasion (10%), and budget (5%).
            </p>
          </div>

          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-wider text-[#7A263A] hover:underline flex items-center gap-1.5 whitespace-nowrap"
          >
            Explore Complete Shop <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topProducts.map(({ product, score, reasons }) => (
            <ProductCard
              key={product.id}
              product={product}
              customQuizAnswers={quizAnswers}
              priorityScore={score}
              priorityReason={reasons[0]}
            />
          ))}
        </div>

        {/* Style Assistant Callout Card */}
        <div className="p-8 rounded-3xl bg-white border border-[#D9B98C]/40 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7A263A] flex items-center justify-center md:justify-start gap-1.5">
              <Wand2 className="w-3.5 h-3.5" /> Coordinated Ensembles
            </span>
            <h3 className="font-serif text-2xl font-medium text-[#292521]">
              Want ready-to-wear outfit ideas using your palette?
            </h3>
            <p className="text-xs text-[#6E675F] leading-relaxed">
              Our Style Assistant will pair tops, bottoms, accessories, and makeup within your target budget in Indian rupees.
            </p>
          </div>

          <Link
            to="/style-assistant"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#292521] hover:bg-[#403B35] text-white text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#D9B98C]" />
            Generate Outfits Now
          </Link>
        </div>
      </section>
    </div>
  );
};
