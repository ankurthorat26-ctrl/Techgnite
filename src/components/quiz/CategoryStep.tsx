import React from 'react';
import { ProductCategory } from '../../types';
import { Check, Shirt, Sparkles, Gem, Glasses } from 'lucide-react';

interface CategoryStepProps {
  selectedCategories: ProductCategory[];
  onToggleCategory: (category: ProductCategory) => void;
}

interface CategoryCard {
  value: ProductCategory;
  label: string;
  description: string;
  icon: React.ElementType;
}

const CATEGORY_CARDS: CategoryCard[] = [
  {
    value: 'clothing',
    label: 'Clothes',
    description: 'Dresses, kurtas, jackets, tops, and tailored trousers matched to your undertone.',
    icon: Shirt,
  },
  {
    value: 'makeup',
    label: 'Makeup',
    description: 'Lipsticks, blushes, highlighters, and eyeshadow palettes with no ashy undertones.',
    icon: Sparkles,
  },
  {
    value: 'jewelry',
    label: 'Jewelry',
    description: 'Yellow gold, rose gold, oxidized silver, kundan, and pearl finishes.',
    icon: Gem,
  },
  {
    value: 'accessories',
    label: 'Accessories',
    description: 'Bags, scarves, stoles, belts, and sunglasses that elevate your complete look.',
    icon: Glasses,
  },
];

export const CategoryStep: React.FC<CategoryStepProps> = ({
  selectedCategories,
  onToggleCategory,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#7A263A] mb-1.5 block">
          Step 5 of 6
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#292521] font-medium mb-3">
          What do you want to shop for?
        </h2>
        <p className="text-sm text-[#6E675F] leading-relaxed">
          Select all categories you are currently looking to explore or revamp in your wardrobe.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
        {CATEGORY_CARDS.map((cat) => {
          const isSelected = selectedCategories.includes(cat.value);
          const Icon = cat.icon;

          return (
            <div
              key={cat.value}
              onClick={() => onToggleCategory(cat.value)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer text-left relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#7A263A] ring-2 ring-[#7A263A] shadow-md -translate-y-0.5'
                  : 'bg-white/70 border-[#D9B98C]/40 hover:bg-white hover:border-[#7A263A]/40'
              }`}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onToggleCategory(cat.value);
                }
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F7F0E8] text-[#7A263A] flex items-center justify-center border border-black/5">
                    <Icon className="w-6 h-6" />
                  </div>
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

                <h3 className="font-serif text-xl font-medium text-[#292521] mb-2">
                  {cat.label}
                </h3>
                <p className="text-xs text-[#6E675F] leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
