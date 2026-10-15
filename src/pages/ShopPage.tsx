import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { FilterSidebar, FilterState } from '../components/product/FilterSidebar';
import { useProfile } from '../context/ProfileContext';
import { evaluateProductMatch, checkBudgetCompatibility, checkGenderCompatibility } from '../recommendation/engine';
import { Search, SlidersHorizontal, ArrowUpDown, Sparkles, User, Users } from 'lucide-react';
import { ProductCategory, GenderPreference } from '../types';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { quizAnswers } = useProfile();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Initialize filters from URL query or default
  const categoryParam = searchParams.get('category') as ProductCategory | null;
  const genderParam = searchParams.get('gender') as GenderPreference | null;

  const [filters, setFilters] = useState<FilterState>({
    category: categoryParam || 'all',
    gender: genderParam || quizAnswers?.genderPreference || 'all',
    undertone: 'all',
    budget: quizAnswers?.budget || 'all',
    styles: [],
    occasions: [],
    searchQuery: '',
    sortBy: quizAnswers ? 'match' : 'price_asc',
  });

  // Keep category and gender in sync if URL query changes
  useEffect(() => {
    if (categoryParam && categoryParam !== filters.category) {
      setFilters((prev) => ({ ...prev, category: categoryParam }));
    }
  }, [categoryParam]);

  useEffect(() => {
    if (genderParam && genderParam !== filters.gender) {
      setFilters((prev) => ({ ...prev, gender: genderParam }));
    }
  }, [genderParam]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    const params: Record<string, string> = {};
    if (newFilters.category !== 'all') params.category = newFilters.category;
    if (newFilters.gender !== 'all') params.gender = newFilters.gender;
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      gender: 'all',
      undertone: 'all',
      budget: 'all',
      styles: [],
      occasions: [],
      searchQuery: '',
      sortBy: quizAnswers ? 'match' : 'price_asc',
    });
    setSearchParams({});
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query);
        const matchesTags = product.colorCompatibilityTags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // 2. Gender Focus Filter
      if (filters.gender !== 'all') {
        if (!checkGenderCompatibility(product.gender, filters.gender)) {
          return false;
        }
      }

      // 3. Category Filter
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }

      // 4. Strict Budget Filter (INR)
      if (filters.budget !== 'all' && !checkBudgetCompatibility(product.price, filters.budget)) {
        return false;
      }

      // 5. Undertone / Color Harmony Filter
      if (filters.undertone !== 'all') {
        const hasUndertone = product.compatibleUndertones?.includes(filters.undertone);
        const hasTag = product.colorCompatibilityTags.includes(filters.undertone);
        const hasNeutral = product.compatibleUndertones?.includes('neutral');
        if (!hasUndertone && !hasTag && !hasNeutral) {
          return false;
        }
      }

      // 6. Personal Style Filter (any match)
      if (filters.styles.length > 0) {
        const matchesStyle = product.suggestedStyle.some((s) => filters.styles.includes(s));
        if (!matchesStyle) return false;
      }

      // 7. Occasion Filter (any match)
      if (filters.occasions.length > 0) {
        const matchesOccasion = product.relevantOccasions.some((o) => filters.occasions.includes(o));
        if (!matchesOccasion) return false;
      }

      return true;
    }).sort((a, b) => {
      // Sorting
      if (filters.sortBy === 'match' && quizAnswers) {
        const scoreA = evaluateProductMatch(a, quizAnswers).score;
        const scoreB = evaluateProductMatch(b, quizAnswers).score;
        return scoreB - scoreA;
      }
      if (filters.sortBy === 'price_asc') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'price_desc') {
        return b.price - a.price;
      }
      if (filters.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [filters, quizAnswers]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Header & Search Bar */}
      <div className="mb-8 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7A263A] mb-1.5 block">
            Curated Fashion & Beauty Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#292521]">
            Curated Shop
          </h1>
          <p className="text-xs sm:text-sm text-[#6E675F] mt-2 max-w-2xl leading-relaxed">
            Discover verified demo products matched to your skin tone depth, undertone temperature, style aesthetic, gender focus, and budget in Indian Rupees (₹).
          </p>
        </div>

        {/* Quick Gender Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => handleFilterChange({ ...filters, gender: 'all' })}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              filters.gender === 'all'
                ? 'bg-[#292521] text-white shadow-xs'
                : 'bg-white border border-[#292521]/15 text-[#292521] hover:bg-[#FAF6F0]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            All Collections
          </button>

          <button
            onClick={() => handleFilterChange({ ...filters, gender: 'women' })}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              filters.gender === 'women'
                ? 'bg-[#7A263A] text-white shadow-xs'
                : 'bg-white border border-[#292521]/15 text-[#292521] hover:bg-[#FAF6F0]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Women&apos;s Fashion
          </button>

          <button
            onClick={() => handleFilterChange({ ...filters, gender: 'men' })}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              filters.gender === 'men'
                ? 'bg-[#7A263A] text-white shadow-xs'
                : 'bg-white border border-[#292521]/15 text-[#292521] hover:bg-[#FAF6F0]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Men&apos;s Fashion
          </button>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-[#D9B98C]/30 shadow-xs">
          {/* Search Input */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-[#6E675F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by product, brand, color..."
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange({ ...filters, searchQuery: e.target.value })}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#FAF6F0] border-none text-[#292521] placeholder-[#6E675F]/60 focus:ring-1 focus:ring-[#7A263A] outline-hidden"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#292521]/15 text-xs font-medium text-[#292521]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#7A263A]" />
              Filters
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#6E675F]" />
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    sortBy: e.target.value as FilterState['sortBy'],
                  })
                }
                className="text-xs font-medium bg-[#FAF6F0] py-2 px-3 rounded-xl border-none text-[#292521] focus:ring-1 focus:ring-[#7A263A]"
              >
                {quizAnswers && <option value="match">Sort by: Compatibility Score</option>}
                <option value="price_asc">Sort by: Price: Low to High</option>
                <option value="price_desc">Sort by: Price: High to Low</option>
                <option value="name">Sort by: Product Name</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: Filter Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <FilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
            totalResultsCount={filteredProducts.length}
          />
        </div>

        {/* Mobile Filter Modal / Drawer */}
        {mobileFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 p-4 flex items-center justify-center">
            <div className="bg-white rounded-3xl max-h-[85vh] overflow-y-auto w-full max-w-md p-6">
              <div className="flex items-center justify-between pb-4 mb-4 border-b">
                <h3 className="font-serif text-xl font-medium">Filter Catalog</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-xs uppercase font-bold text-[#7A263A]"
                >
                  Done
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                totalResultsCount={filteredProducts.length}
              />
            </div>
          </div>
        )}

        {/* Product Catalog Grid */}
        <div className="lg:col-span-3">
          <ProductGrid
            products={filteredProducts}
            customQuizAnswers={quizAnswers}
            emptyTitle="No items match your active filters"
            emptyDescription="Try broadening your gender or budget focus, resetting style tags, or clearing search keywords to view more items."
            onClearFilters={handleResetFilters}
          />
        </div>
      </div>
    </div>
  );
};
