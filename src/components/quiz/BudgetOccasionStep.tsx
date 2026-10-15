import React from 'react';
import { BudgetRange, Occasion } from '../../types';
import { Check, IndianRupee } from 'lucide-react';

interface BudgetOccasionStepProps {
  budget: BudgetRange;
  onSelectBudget: (budget: BudgetRange) => void;
  occasions: Occasion[];
  onToggleOccasion: (occasion: Occasion) => void;
}

interface BudgetOption {
  value: BudgetRange;
  label: string;
  subtext: string;
}

const BUDGET_OPTIONS: BudgetOption[] = [
  {
    value: 'under_500',
    label: 'Under ₹500',
    subtext: 'Pocket-friendly student finds, tints, & accessories.',
  },
  {
    value: '500_1000',
    label: '₹500 – ₹1,000',
    subtext: 'Great daily wear kurtas, t-shirts, lipsticks, & hoops.',
  },
  {
    value: '1000_2500',
    label: '₹1,000 – ₹2,500',
    subtext: 'Elevated handlooms, jackets, blazers, & silver jewelry.',
  },
  {
    value: '2500_above',
    label: '₹2,500 & Above',
    subtext: 'Festive velvet, designer sets, pure silk, & luxury.',
  },
  {
    value: 'all',
    label: 'Flexible / All Budgets',
    subtext: 'Explore entire price spectrum across all brands.',
  },
];

const OCCASION_OPTIONS: { value: Occasion; label: string }[] = [
  { value: 'everyday', label: 'Everyday Casual' },
  { value: 'college', label: 'College & Campus' },
  { value: 'office', label: 'Work & Professional' },
  { value: 'party', label: 'Party & Night Out' },
  { value: 'wedding_festive', label: 'Wedding & Festive' },
  { value: 'special_occasion', label: 'Special Dinners & Dates' },
];

export const BudgetOccasionStep: React.FC<BudgetOccasionStepProps> = ({
  budget,
  onSelectBudget,
  occasions,
  onToggleOccasion,
}) => {
  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#7A263A] mb-1.5 block">
          Step 6 of 6
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#292521] font-medium mb-3">
          Budget & Occasions
        </h2>
        <p className="text-sm text-[#6E675F] leading-relaxed">
          Set your shopping budget in INR and optionally pick what occasions you are dressing for.
        </p>
      </div>

      {/* Part 1: Budget in INR */}
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-[#7A263A]/10 text-[#7A263A] flex items-center justify-center">
            <IndianRupee className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-serif text-xl font-medium text-[#292521]">
            Preferred Budget Range (INR)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {BUDGET_OPTIONS.map((opt) => {
            const isSelected = budget === opt.value;
            return (
              <div
                key={opt.value}
                onClick={() => onSelectBudget(opt.value)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#7A263A] ring-2 ring-[#7A263A] shadow-md -translate-y-0.5'
                    : 'bg-white/70 border-[#D9B98C]/40 hover:bg-white hover:border-[#7A263A]/40'
                }`}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectBudget(opt.value);
                  }
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-[#292521]">
                    {opt.label}
                  </span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#7A263A] text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-[#6E675F] leading-relaxed">
                  {opt.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Optional Occasions */}
      <div className="max-w-3xl mx-auto pt-4 border-t border-[#292521]/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-xl font-medium text-[#292521]">
            Target Occasions <span className="text-xs font-sans text-[#6E675F] font-normal">(Optional)</span>
          </h3>
          <span className="text-[11px] text-[#6E675F]">Multi-select</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {OCCASION_OPTIONS.map((occ) => {
            const isSelected = occasions.includes(occ.value);
            return (
              <button
                key={occ.value}
                type="button"
                onClick={() => onToggleOccasion(occ.value)}
                className={`p-3 rounded-xl border text-xs font-medium text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#292521] text-white border-[#292521] shadow-xs'
                    : 'bg-white/70 border-[#292521]/15 text-[#292521]/80 hover:bg-white'
                }`}
              >
                <span>{occ.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#D9B98C]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
