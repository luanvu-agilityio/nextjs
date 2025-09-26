'use client';
import { useState, useCallback, useEffect } from 'react';

// Types
import { Product } from '@/types';

interface UseProductPaginationProps {
  data?: { data: Product[] };
  currentPage: number;
}

function useProductPagination({
  data,
  currentPage,
}: UseProductPaginationProps) {
  const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);

  // Reset products when filters change (page 1)
  const resetProducts = useCallback(() => {
    setLoadedProducts([]);
  }, []);

  // Handle new data
  useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setLoadedProducts(data.data);
      } else {
        setLoadedProducts(prev => [...prev, ...data.data]);
      }
    }
  }, [data, currentPage]);

  return {
    loadedProducts,
    resetProducts,
  };
}
export default useProductPagination;
