export const queryKeys = {
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.products.lists(), params] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
  },
  categories: {
    all: ['categories'] as const,
  },
  filters: {
    all: ['filters'] as const,
    options: () => [...queryKeys.filters.all, 'options'] as const,
  },
} as const;

export type QueryKeys = typeof queryKeys;
