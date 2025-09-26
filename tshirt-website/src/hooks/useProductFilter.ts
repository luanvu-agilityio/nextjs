'use client';
import { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

// Helpers
import { FilterOptions } from '@/helpers';

const DEFAULT_FILTERS: FilterOptions = {
  query: '',
  category: null,
  size: null,
  color: null,
  minPrice: '',
  maxPrice: '',
  sort: 'relevancy',
  page: 1,
  limit: 8,
};

function useShopFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterOptions>(() => {
    return {
      query: searchParams.get('q') || '',
      category: searchParams.get('category'),
      size: searchParams.get('size'),
      color: searchParams.get('color'),
      minPrice: searchParams.get('minPrice')
        ? Number(searchParams.get('minPrice'))
        : '',
      maxPrice: searchParams.get('maxPrice')
        ? Number(searchParams.get('maxPrice'))
        : '',
      sort: searchParams.get('sort') || 'relevancy',
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 8,
    };
  });

  const updateUrl = useCallback(
    (newFilters: FilterOptions) => {
      const params = new URLSearchParams();

      if (newFilters.query) params.set('q', newFilters.query);
      if (newFilters.category) params.set('category', newFilters.category);
      if (newFilters.size) params.set('size', newFilters.size);
      if (newFilters.color) params.set('color', newFilters.color);
      if (typeof newFilters.minPrice === 'number')
        params.set('minPrice', newFilters.minPrice.toString());
      if (typeof newFilters.maxPrice === 'number')
        params.set('maxPrice', newFilters.maxPrice.toString());
      if (newFilters.sort && newFilters.sort !== 'relevancy')
        params.set('sort', newFilters.sort);
      if (newFilters.limit && newFilters.limit !== 8)
        params.set('limit', newFilters.limit.toString());

      const queryString = params.toString() ? `?${params.toString()}` : '';
      const url = `${pathname}${queryString}`;
      router.push(url, { scroll: false });
    },
    [pathname, router]
  );

  const handleFilterChange = useCallback(
    (changes: Partial<FilterOptions>) => {
      const newFilters = { ...filters, ...changes };
      setFilters(newFilters);
      updateUrl(newFilters);
    },
    [filters, updateUrl]
  );

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    updateUrl(DEFAULT_FILTERS);
  }, [updateUrl]);

  // Sync with URL changes (browser back/forward)
  useEffect(() => {
    const urlFilters: FilterOptions = {
      query: searchParams.get('q') || '',
      category: searchParams.get('category'),
      size: searchParams.get('size'),
      color: searchParams.get('color'),
      minPrice: searchParams.get('minPrice')
        ? Number(searchParams.get('minPrice'))
        : '',
      maxPrice: searchParams.get('maxPrice')
        ? Number(searchParams.get('maxPrice'))
        : '',
      sort: searchParams.get('sort') || 'relevancy',
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 8,
    };

    setFilters(urlFilters);
  }, [searchParams]);

  return {
    filters,
    handleFilterChange,
    resetFilters,
  };
}
export default useShopFilters;
