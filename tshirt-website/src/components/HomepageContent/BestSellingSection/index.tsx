'use client';

import { useState, useMemo } from 'react';

// Components
import { ProductCard } from '@/components/ProductCard';
import { Typography, Heading } from '@/components/common';
import ProductCardSkeleton from '@/components/ProductCard/ProductCardSkeleton';

// Utils
import { cn } from '@/lib/utils';

// Constants
import { CATEGORIES } from '@/constants';

// Hooks
import { useProducts, useProductFilters } from '@/hooks/useProducts';

interface BestSellerSectionProps {
  className?: string;
}

const BestSellerSection = ({ className }: BestSellerSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('T-Shirt');

  // Fetch products for the active category
  const {
    data: productsResponse,
    isLoading: isProductsLoading,
    error: productsError,
  } = useProducts({
    category: activeCategory,
    limit: 8,
    sortBy: 'rating',
    order: 'desc',
  });

  const { data: filterOptions, isLoading: isFiltersLoading } =
    useProductFilters();

  const availableCategories = useMemo(() => {
    if (filterOptions?.categories && filterOptions.categories.length > 0) {
      return filterOptions.categories;
    }
    return CATEGORIES;
  }, [filterOptions]);

  useMemo(() => {
    if (
      availableCategories.length > 0 &&
      !availableCategories.includes(activeCategory)
    ) {
      setActiveCategory(availableCategories[0]);
    }
  }, [availableCategories, activeCategory]);

  const products = productsResponse?.data || [];
  const isLoading = isProductsLoading || isFiltersLoading;

  // Error state
  if (productsError) {
    return (
      <section className={cn('px-30', className)}>
        <div className='container mx-auto'>
          <div className='text-center py-12'>
            <Typography className='text-red-500 text-lg'>
              Failed to load best seller products.
            </Typography>
            <button
              onClick={() => window.location.reload()}
              className='mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn('px-30', className)}>
      <div className='container mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-12 space-y-6'>
          <Typography
            size='lg'
            className='text-blue-600 font-medium uppercase tracking-wide'
          >
            CHOOSE FROM THE BEST PRODUCTS
          </Typography>

          <Heading level={2} className='text-5xl font-bold text-gray-900'>
            Our Best Seller Product
          </Heading>

          {/* Category Tabs */}
          <div className='flex items-center justify-center gap-8 pt-4'>
            {isFiltersLoading ? (
              // Loading skeleton for categories
              <div className='flex gap-8'>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className='h-6 w-20 bg-gray-200 rounded animate-pulse'
                  />
                ))}
              </div>
            ) : (
              availableCategories.map((category: string) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  disabled={isProductsLoading}
                  className={cn(
                    'font-secondary px-6 py-3 text-lg font-medium transition-all duration-200 relative',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    activeCategory === category
                      ? 'text-blue-background font-bold'
                      : 'text-gray-600 hover:text-blue-600'
                  )}
                >
                  {category}
                  {activeCategory === category && (
                    <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-background rounded-full' />
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center'>
          {(() => {
            if (isLoading) {
              return Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={`skeleton-${activeCategory}-${i}`} />
              ));
            }

            if (products.length > 0) {
              return products.map(product => (
                <ProductCard key={product.id} product={product} />
              ));
            }

            return (
              <div className='col-span-full text-center py-12'>
                <Typography className='text-gray-500 text-lg'>
                  No products found in {activeCategory} category.
                </Typography>
              </div>
            );
          })()}
        </div>

        {/* Loading indicator for category switch */}
        {isProductsLoading && !isFiltersLoading && (
          <div className='text-center mt-6'>
            <Typography className='text-blue-600 animate-pulse'>
              Loading {activeCategory} products...
            </Typography>
          </div>
        )}
      </div>
    </section>
  );
};

BestSellerSection.displayName = 'BestSellerSection';

export { BestSellerSection, type BestSellerSectionProps };
