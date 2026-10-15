import React from 'react';
import { Product, QuizAnswers } from '../../types';
import { ProductCard } from './ProductCard';
import { EmptyState } from '../common/EmptyState';
import { ShoppingBag } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  customQuizAnswers?: QuizAnswers | null;
  emptyTitle?: string;
  emptyDescription?: string;
  onClearFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  customQuizAnswers,
  emptyTitle = 'No products match your criteria',
  emptyDescription = 'Try adjusting your filters, budget, or search terms to explore more of our collection.',
  onClearFilters,
}) => {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title={emptyTitle}
        description={emptyDescription}
        actionText={onClearFilters ? 'Reset All Filters' : 'Explore All Products'}
        onActionClick={onClearFilters}
        actionHref={!onClearFilters ? '/shop' : undefined}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          customQuizAnswers={customQuizAnswers}
        />
      ))}
    </div>
  );
};
