import { useQuery, UseQueryOptions } from '@tanstack/react-query';

// Constants
import { queryKeys } from '@/constants';

// Types
import type { ProductsQueryParams, ProductsApiResponse } from '@/types/api';
import type { Product } from '@/types/product';

// API
import { productsApi } from '@/api';

export function useProducts(
  params: ProductsQueryParams = {},
  options?: Omit<UseQueryOptions<ProductsApiResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.products.list(params as Record<string, unknown>),
    queryFn: () => productsApi.getProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
}

export function useProduct(
  id: string,
  options?: Omit<UseQueryOptions<Product>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productsApi.getProductById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000, // 20 minutes
    ...options,
  });
}

export function useProductFilters() {
  return useQuery({
    queryKey: queryKeys.filters.options(),
    queryFn: async () => {
      const response = await productsApi.getProducts({ limit: 1000 });
      return response.filters;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}
