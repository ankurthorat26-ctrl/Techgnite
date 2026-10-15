import React from 'react';
import { GenderPreference } from '../../types';
import { Check, Sparkles, User, Users } from 'lucide-react';

interface GenderStepProps {
  selectedGender: GenderPreference;
  onSelectGender: (gender: GenderPreference) => void;
}

interface GenderOption {
  value: GenderPreference;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
}

const GENDER_OPTIONS: GenderOption[] = [
  {
    value: 'women',
    title: "Women's Fashion & Beauty",
    tagline: 'Dresses, Kurtas, Makeup & Jewelry',
    description: 'Curated styling encompassing Indian ethnic wear, western silhouettes, radiant makeup, and statement accessories.',
    icon: Sparkles,
  },
  {
    value: 'men',
    title: "Men's Fashion & Grooming",
    tagline: 'Bandhgalas, Shirts, Blazers & Accessories',
    description: 'Precision-tailored menswear, heritage kurtas, minimalist jewelry, clean grooming, and leather essentials.',
    icon: User,
  },
  {
    value: 'all',
    title: 'All / Gender-Neutral',
    tagline: 'Complete Spectrum & Fluid Styling',
    description: 'Explore the full catalog without gender restrictions. Ideal for gift shoppers or versatile wardrobe curation.',
    icon: Users,
  },
];

export const GenderStep: React.FC<GenderStepProps> = ({
  selectedGender,
  onSelectGender,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#7A263A] mb-1.5 block">
          Step 1 of 6
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#292521] font-medium mb-3">
          Who are you styling for?
        </h2>
        <p className="text-sm text-[#6E675F] leading-relaxed">
          Select your wardrobe preference so we can tailor silhouettes, sizing, and product recommendations to your exact focus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {GENDER_OPTIONS.map((opt) => {
          const isSelected = selectedGender === opt.value;
          const Icon = opt.icon;

          return (
            <div
              key={opt.value}
              onClick={() => onSelectGender(opt.value)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer text-left relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#7A263A] ring-2 ring-[#7A263A] shadow-md -translate-y-0.5'
                  : 'bg-white/70 border-[#D9B98C]/40 hover:bg-white hover:border-[#7A263A]/40'
              }`}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectGender(opt.value);
                }
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F7F0E8] text-[#7A263A] flex items-center justify-center border border-black/5">
                    <Icon className="w-6 h-6" />
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#7A263A] text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A263A] block mb-1">
                  {opt.tagline}
                </span>

                <h3 className="font-serif text-2xl font-medium text-[#292521] mb-2">
                  {opt.title}
                </h3>

                <p className="text-xs text-[#6E675F] leading-relaxed">
                  {opt.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-black/5 text-[11px] font-medium text-[#292521]/70">
                {isSelected ? '✓ Selected' : 'Click to select'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
