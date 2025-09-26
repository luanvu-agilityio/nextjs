import type { Product, ProductsQueryParams } from '@/types';

export type FilterOptions = {
  query?: string;
  category?: string | null;
  size?: string | null;
  color?: string | null;
  minPrice?: number | '';
  maxPrice?: number | '';
  sort?: string;
  page?: number;
  limit?: number;
};

export function getCategories(products: Product[]) {
  return Array.from(new Set(products.map(p => p.category ?? 'Uncategorized')));
}

export function getSizes(products: Product[]) {
  return Array.from(new Set(products.flatMap(p => p.sizes ?? []))).filter(
    Boolean
  );
}

export function getColors(products: Product[]) {
  return Array.from(new Set(products.flatMap(p => p.colors ?? []))).filter(
    Boolean
  );
}

function parseReviewCount(rc?: string) {
  if (!rc) return 0;
  const lower = rc.toLowerCase().trim();
  if (lower.endsWith('k')) return parseFloat(lower.replace('k', '')) * 1000;
  if (lower.endsWith('m')) return parseFloat(lower.replace('m', '')) * 1000000;
  return Number(lower.replace(/[^0-9.]/g, '')) || 0;
}

function sortProducts(products: Product[], sortBy: string): Product[] {
  const list = [...products];

  switch (sortBy) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);

    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);

    case 'name-asc':
      return list.sort((a, b) => a.name.localeCompare(b.name));

    case 'name-desc':
      return list.sort((a, b) => b.name.localeCompare(a.name));

    case 'rating-desc':
      return list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

    case 'rating-asc':
      return list.sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0));

    case 'reviews-desc':
      return list.sort(
        (a, b) =>
          parseReviewCount(b.reviewCount) - parseReviewCount(a.reviewCount)
      );

    case 'newest':
      return list.sort((a, b) => {
        const na = Number(a.id);
        const nb = Number(b.id);
        if (!Number.isNaN(na) && !Number.isNaN(nb)) return nb - na;
        return 0;
      });

    case 'oldest':
      return list.sort((a, b) => {
        const na = Number(a.id);
        const nb = Number(b.id);
        if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
        return 0;
      });

    case 'relevancy':
    default:
      // Relevancy: rating desc, then review count desc
      return list.sort((a, b) => {
        const ra = a.rating ?? 0;
        const rb = b.rating ?? 0;
        if (ra !== rb) return rb - ra;
        return (
          parseReviewCount(b.reviewCount) - parseReviewCount(a.reviewCount)
        );
      });
  }
}

export function filterProducts(products: Product[], opts: FilterOptions) {
  let list = products.slice();

  // Apply filters
  if (opts.query && opts.query.trim() !== '') {
    const q = opts.query.toLowerCase();
    list = list.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        (p.quality ?? '').toLowerCase().includes(q) ||
        (p.category ?? '').toLowerCase().includes(q)
    );
  }

  if (opts.category) {
    list = list.filter(p => (p.category ?? '') === opts.category);
  }

  if (opts.size) {
    list = list.filter(p => (p.sizes ?? []).includes(opts.size as string));
  }

  if (opts.color) {
    list = list.filter(p => (p.colors ?? []).includes(opts.color as string));
  }

  if (opts.minPrice !== '' && typeof opts.minPrice === 'number') {
    list = list.filter(p => p.price >= Number(opts.minPrice));
  }

  if (opts.maxPrice !== '' && typeof opts.maxPrice === 'number') {
    list = list.filter(p => p.price <= Number(opts.maxPrice));
  }

  // Apply sorting
  if (opts.sort) {
    list = sortProducts(list, opts.sort);
  }

  return list;
}

export function convertFiltersToApiParams(
  filters: FilterOptions
): ProductsQueryParams {
  const params: ProductsQueryParams = {};

  if (filters.query) params.search = filters.query;
  if (filters.category) params.category = filters.category;
  if (filters.size) params.size = filters.size;
  if (filters.color) params.color = filters.color;
  if (typeof filters.minPrice === 'number') params.minPrice = filters.minPrice;
  if (typeof filters.maxPrice === 'number') params.maxPrice = filters.maxPrice;
  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;

  // Convert sort format
  if (filters.sort) {
    switch (filters.sort) {
      case 'price-asc':
        params.sortBy = 'price';
        params.order = 'asc';
        break;
      case 'price-desc':
        params.sortBy = 'price';
        params.order = 'desc';
        break;
      case 'name-asc':
        params.sortBy = 'name';
        params.order = 'asc';
        break;
      case 'name-desc':
        params.sortBy = 'name';
        params.order = 'desc';
        break;
      case 'rating-asc':
        params.sortBy = 'rating';
        params.order = 'asc';
        break;
      case 'rating-desc':
        params.sortBy = 'rating';
        params.order = 'desc';
        break;
      case 'newest':
        params.sortBy = 'newest';
        break;
      case 'oldest':
        params.sortBy = 'oldest';
        break;
      case 'reviews-desc':
        params.sortBy = 'reviewCount';
        params.order = 'desc';
        break;
      default:
        params.sortBy = 'relevancy';
    }
  }

  return params;
}
