import React from 'react';
import { PersonalStyle } from '../../types';
import { Check } from 'lucide-react';

interface StyleStepProps {
  selectedStyles: PersonalStyle[];
  onToggleStyle: (style: PersonalStyle) => void;
}

interface StyleOption {
  value: PersonalStyle;
  label: string;
  tagline: string;
}

const STYLE_OPTIONS: StyleOption[] = [
  {
    value: 'minimalist',
    label: 'Minimalist',
    tagline: 'Clean lines, monochrome accents, and intentional tailoring.',
  },
  {
    value: 'casual',
    label: 'Casual',
    tagline: 'Effortless everyday comfort, soft knits, and relaxed denim.',
  },
  {
    value: 'trendy',
    label: 'Trendy',
    tagline: 'Current seasonal silhouettes, viral aesthetic pieces, and modern cuts.',
  },
  {
    value: 'streetwear',
    label: 'Streetwear',
    tagline: 'Oversized layers, statement sneakers, graphic details, and relaxed utility.',
  },
  {
    value: 'elegant',
    label: 'Elegant',
    tagline: 'Sophisticated draping, luxurious fabrics, silk, and quiet luxury poise.',
  },
  {
    value: 'ethnic_indowestern',
    label: 'Ethnic / Indo-Western',
    tagline: 'Rich handloom textiles, kurtas, anarkalis, fusion jackets, and jhumkas.',
  },
  {
    value: 'romantic',
    label: 'Romantic',
    tagline: 'Soft pastels, floral accents, ruffles, puff sleeves, and poetic textures.',
  },
  {
    value: 'bold',
    label: 'Bold',
    tagline: 'Dramatic jewel colors, eye-catching textures, and daring contrasts.',
  },
];

export const StyleStep: React.FC<StyleStepProps> = ({
  selectedStyles,
  onToggleStyle,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#7A263A] mb-1.5 block">
          Step 4 of 6
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#292521] font-medium mb-3">
          Choose your personal style
        </h2>
        <p className="text-sm text-[#6E675F] leading-relaxed">
          Select one or more styles that inspire your everyday aesthetic. We match products to your taste.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {STYLE_OPTIONS.map((option) => {
          const isSelected = selectedStyles.includes(option.value);

          return (
            <div
              key={option.value}
              onClick={() => onToggleStyle(option.value)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer text-left relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#7A263A] ring-2 ring-[#7A263A] shadow-md -translate-y-0.5'
                  : 'bg-white/70 border-[#D9B98C]/40 hover:bg-white hover:border-[#7A263A]/40'
              }`}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onToggleStyle(option.value);
                }
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-lg font-semibold text-[#292521]">
                    {option.label}
                  </h3>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#7A263A] text-white'
                        : 'border border-[#292521]/20 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <p className="text-xs text-[#6E675F] leading-relaxed">
                  {option.tagline}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
