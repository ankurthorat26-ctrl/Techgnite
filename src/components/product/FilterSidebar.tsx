import React from 'react';
import { ProductCategory, PersonalStyle, Occasion, BudgetRange, Undertone, GenderPreference } from '../../types';
import { Filter, RotateCcw, Check, Users, User, Sparkles } from 'lucide-react';

export interface FilterState {
  category: ProductCategory | 'all';
  gender: GenderPreference;
  undertone: Undertone | 'all';
  budget: BudgetRange;
  styles: PersonalStyle[];
  occasions: Occasion[];
  searchQuery: string;
  sortBy: 'match' | 'price_asc' | 'price_desc' | 'name';
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResultsCount: number;
  className?: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  totalResultsCount,
  className = '',
}) => {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  const toggleStyle = (style: PersonalStyle) => {
    const nextStyles = filters.styles.includes(style)
      ? filters.styles.filter((s) => s !== style)
      : [...filters.styles, style];
    updateFilter('styles', nextStyles);
  };

  const toggleOccasion = (occasion: Occasion) => {
    const nextOccasions = filters.occasions.includes(occasion)
      ? filters.occasions.filter((o) => o !== occasion)
      : [...filters.occasions, occasion];
    updateFilter('occasions', nextOccasions);
  };

  const genderOptions: { label: string; value: GenderPreference; icon: React.ElementType }[] = [
    { label: 'All Fashion', value: 'all', icon: Users },
    { label: "Women's", value: 'women', icon: Sparkles },
    { label: "Men's", value: 'men', icon: User },
  ];

  const categories: { label: string; value: ProductCategory | 'all' }[] = [
    { label: 'All Categories', value: 'all' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Makeup & Grooming', value: 'makeup' },
    { label: 'Jewelry', value: 'jewelry' },
    { label: 'Accessories', value: 'accessories' },
  ];

  const budgets: { label: string; value: BudgetRange }[] = [
    { label: 'All Budgets', value: 'all' },
    { label: 'Under ₹500', value: 'under_500' },
    { label: '₹500 – ₹1,000', value: '500_1000' },
    { label: '₹1,000 – ₹2,500', value: '1000_2500' },
    { label: '₹2,500 & Above', value: '2500_above' },
  ];

  const undertones: { label: string; value: Undertone | 'all' }[] = [
    { label: 'All Undertones', value: 'all' },
    { label: 'Warm Hues', value: 'warm' },
    { label: 'Cool Tones', value: 'cool' },
    { label: 'Neutral Balance', value: 'neutral' },
  ];

  const stylesList: { label: string; value: PersonalStyle }[] = [
    { label: 'Minimalist', value: 'minimalist' },
    { label: 'Casual', value: 'casual' },
    { label: 'Trendy', value: 'trendy' },
    { label: 'Streetwear', value: 'streetwear' },
    { label: 'Elegant', value: 'elegant' },
    { label: 'Ethnic / Indo-Western', value: 'ethnic_indowestern' },
    { label: 'Romantic', value: 'romantic' },
    { label: 'Bold', value: 'bold' },
  ];

  const occasionsList: { label: string; value: Occasion }[] = [
    { label: 'Everyday', value: 'everyday' },
    { label: 'College', value: 'college' },
    { label: 'Party', value: 'party' },
    { label: 'Wedding / Festive', value: 'wedding_festive' },
    { label: 'Office', value: 'office' },
    { label: 'Special Occasion', value: 'special_occasion' },
  ];

  const activeFiltersCount =
    (filters.gender !== 'all' ? 1 : 0) +
    (filters.category !== 'all' ? 1 : 0) +
    (filters.undertone !== 'all' ? 1 : 0) +
    (filters.budget !== 'all' ? 1 : 0) +
    filters.styles.length +
    filters.occasions.length +
    (filters.searchQuery ? 1 : 0);

  return (
    <aside className={`bg-white rounded-2xl p-6 border border-[#D9B98C]/30 shadow-xs space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#292521]/10">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#7A263A]" />
          <h2 className="font-serif text-lg font-medium text-[#292521]">
            Refine Catalog
          </h2>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#7A263A] text-white text-[11px] font-bold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={onReset}
            className="text-xs text-[#7A263A] hover:underline flex items-center gap-1 font-medium cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      {/* Gender Selection */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#292521] mb-2.5">
          Gender / Wardrobe Focus
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {genderOptions.map((g) => {
            const Icon = g.icon;
            const isSelected = filters.gender === g.value;
            return (
              <button
                key={g.value}
                type="button"
                onClick={() => updateFilter('gender', g.value)}
                className={`py-2 px-1.5 rounded-xl text-xs font-medium border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  isSelected
                    ? 'bg-[#7A263A] text-white border-[#7A263A] shadow-xs'
                    : 'border-[#292521]/15 text-[#292521]/80 hover:bg-[#F7F0E8]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="text-[11px] leading-tight">{g.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category selection */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#292521] mb-2.5">
          Category
        </label>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => updateFilter('category', cat.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                filters.category === cat.value
                  ? 'bg-[#292521] text-white font-semibold'
                  : 'text-[#292521]/80 hover:bg-[#F7F0E8]'
              }`}
            >
              <span>{cat.label}</span>
              {filters.category === cat.value && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Budget range */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#292521] mb-2.5">
          Budget (INR ₹)
        </label>
        <div className="space-y-1">
          {budgets.map((b) => (
            <button
              key={b.value}
              onClick={() => updateFilter('budget', b.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                filters.budget === b.value
                  ? 'bg-[#292521] text-white font-semibold'
                  : 'text-[#292521]/80 hover:bg-[#F7F0E8]'
              }`}
            >
              <span>{b.label}</span>
              {filters.budget === b.value && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Undertone Compatibility */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#292521] mb-2.5">
          Undertone Harmony
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {undertones.map((u) => (
            <button
              key={u.value}
              onClick={() => updateFilter('undertone', u.value)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-center transition-colors ${
                filters.undertone === u.value
                  ? 'bg-[#D9B98C] text-[#292521] font-bold border-[#D9B98C]'
                  : 'border-[#292521]/15 text-[#292521]/75 hover:bg-[#F7F0E8]'
              }`}
            >
              {u.label}
            </button>
          ))}
        </div>
      </div>

      {/* Personal Style */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#292521] mb-2.5">
          Personal Style
        </label>
        <div className="flex flex-wrap gap-1.5">
          {stylesList.map((s) => {
            const isSelected = filters.styles.includes(s.value);
            return (
              <button
                key={s.value}
                onClick={() => toggleStyle(s.value)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                  isSelected
                    ? 'bg-[#7A263A] text-white border-[#7A263A]'
                    : 'border-[#292521]/20 text-[#292521]/80 hover:border-[#7A263A]'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Occasion */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#292521] mb-2.5">
          Occasion
        </label>
        <div className="flex flex-wrap gap-1.5">
          {occasionsList.map((o) => {
            const isSelected = filters.occasions.includes(o.value);
            return (
              <button
                key={o.value}
                onClick={() => toggleOccasion(o.value)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                  isSelected
                    ? 'bg-[#292521] text-white border-[#292521]'
                    : 'border-[#292521]/20 text-[#292521]/80 hover:border-[#292521]'
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2 text-center text-xs text-[#6E675F] border-t border-[#292521]/10">
        Showing <strong>{totalResultsCount}</strong> products
      </div>
    </aside>
  );
};
