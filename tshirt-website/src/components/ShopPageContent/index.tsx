'use client';

import { useMemo, useState, useCallback, useEffect, useRef } from 'react';

// Components
import { Breadcrumbs, Button, Heading, Typography } from '@/components';
import { ProductCard } from '@/components/ProductCard';
import FilterBar from '@/components/FilterBar';
import ProductCardSkeleton from '@/components/ProductCard/ProductCardSkeleton';
import ScrollTopButton from '@/components/ScrollTopButton';

// Constants
import { ROUTES } from '@/constants/route';

// Helpers
import { convertFiltersToApiParams } from '@/helpers';

// Hooks
import { useProducts } from '@/hooks/useProducts';
import useShopFilters from '@/hooks/useProductFilter';
import useProductPagination from '@/hooks/useProductPagination';

function ShopPageContent() {
  const { filters, handleFilterChange, resetFilters } = useShopFilters();
  const [currentPage, setCurrentPage] = useState(1);

  const apiParams = useMemo(() => {
    return convertFiltersToApiParams({
      ...filters,
      page: currentPage,
    });
  }, [filters, currentPage]);

  const { data: productsResponse, isLoading, error } = useProducts(apiParams);
  const { loadedProducts } = useProductPagination({
    data: productsResponse,
    currentPage,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [
    filters.query,
    filters.category,
    filters.size,
    filters.color,
    filters.minPrice,
    filters.maxPrice,
    filters.sort,
  ]);

  const prevFiltersRef = useRef(filters);

  useEffect(() => {
    const filtersChanged =
      filters.query !== prevFiltersRef.current.query ||
      filters.category !== prevFiltersRef.current.category ||
      filters.size !== prevFiltersRef.current.size ||
      filters.color !== prevFiltersRef.current.color ||
      filters.minPrice !== prevFiltersRef.current.minPrice ||
      filters.maxPrice !== prevFiltersRef.current.maxPrice ||
      filters.sort !== prevFiltersRef.current.sort;

    if (filtersChanged) {
      setCurrentPage(1);
      prevFiltersRef.current = filters;
    }
  }, [filters]);

  const handleLoadMore = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  if (error) {
    return (
      <main className='container mx-auto px-30 py-8'>
        <div className='text-center py-12'>
          <Typography className='text-red-500 text-lg'>
            Failed to load products. Please try again.
          </Typography>
          <Button
            onClick={() => window.location.reload()}
            className='mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            Retry
          </Button>
        </div>
      </main>
    );
  }

  const totalProducts = productsResponse?.total || 0;
  const totalPages = productsResponse?.totalPages || 0;
  const hasMore = currentPage < totalPages;

  const showLoadMoreLoading = currentPage > 1 && isLoading;

  return (
    <main>
      <section className='bg-gradient-primary px-30 py-10'>
        <div className='container flex flex-col gap-9.5 items-start justify-start w-127'>
          <Breadcrumbs
            items={[{ label: 'Home', href: ROUTES.HOME }, { label: 'Shop' }]}
            variant='dark'
          />
          <Heading
            level={2}
            className='text-4xl text-white font-secondary  font-bold'
          >
            Shop
          </Heading>
          <Typography className='text-white text-lg leading-relaxed'>
            Explore our collection. Use filters to narrow down products and find
            the best items for you.
          </Typography>
        </div>
      </section>

      <FilterBar
        value={filters}
        onChange={handleFilterChange}
        isLoading={isLoading}
      />

      <div className='container mx-auto px-30 py-8'>
        <div className='mb-6 flex items-center justify-between'>
          <Heading level={3} className='text-2xl font-bold'>
            Our Best Seller Product
          </Heading>
          <div className='text-sm text-gray-600 flex items-center gap-4'>
            <span>{totalProducts} Products</span>
            <span>
              Showing {loadedProducts.length} of {totalProducts}
            </span>
            {isLoading && (
              <span className='text-blue-600 animate-pulse'>Loading...</span>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {isLoading
            ? Array.from({ length: filters.limit || 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : loadedProducts.map(product => (
                <ProductCard
                  key={`${product.id}-${currentPage}`}
                  product={product}
                />
              ))}
        </div>

        {!isLoading && hasMore && loadedProducts.length > 0 && (
          <div className='mt-8 text-center'>
            <button
              onClick={handleLoadMore}
              className='inline-block mt-4 bg-gradient-primary text-white px-6 py-2 rounded shadow-md hover:shadow-lg transition-shadow'
            >
              Load More ({totalProducts - loadedProducts.length} remaining)
            </button>
          </div>
        )}

        {showLoadMoreLoading && (
          <div className='text-center mt-6'>
            <span className='text-blue-600 animate-pulse'>
              Loading more products...
            </span>
          </div>
        )}

        {!isLoading && loadedProducts.length === 0 && productsResponse && (
          <div className='text-center py-12'>
            <Typography className='text-gray-500 text-lg'>
              No products found matching your criteria.
            </Typography>
            <Button
              onClick={resetFilters}
              className='mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      <ScrollTopButton />
    </main>
  );
}
export default ShopPageContent;
