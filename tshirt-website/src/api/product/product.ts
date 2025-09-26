import { http } from '@/components/HttpClient';
import type { Product } from '@/types/product';
import type { ProductsQueryParams, ProductsApiResponse } from '@/types/api';

export class ProductsApi {
  private readonly baseUrl = '/products';

  async getProducts(
    params: ProductsQueryParams = {}
  ): Promise<ProductsApiResponse> {
    const searchParams = new URLSearchParams();

    // Add pagination
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());

    // Add search
    if (params.search) searchParams.append('search', params.search);

    // Add filters
    if (params.category) searchParams.append('category', params.category);
    if (params.size) searchParams.append('size', params.size);
    if (params.color) searchParams.append('color', params.color);
    if (params.minPrice !== undefined)
      searchParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined)
      searchParams.append('maxPrice', params.maxPrice.toString());

    // Add sorting
    if (params.sortBy) {
      searchParams.append('sortBy', params.sortBy);
      if (params.order) searchParams.append('order', params.order);
    }

    try {
      // For MockAPI, we'll need to handle filtering client-side initially
      // since MockAPI has limited filtering capabilities
      const response = await http.get<Product[]>(this.baseUrl);

      // Apply client-side filtering for now
      let filteredProducts = this.applyFilters(response, params);

      // Apply sorting
      if (params.sortBy) {
        filteredProducts = this.applySorting(
          filteredProducts,
          params.sortBy,
          params.order || 'asc'
        );
      }

      // Apply pagination
      const page = params.page || 1;
      const limit = params.limit || 8;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      // Get filter options
      const filters = this.getFilterOptions(response);

      return {
        data: paginatedProducts,
        total: filteredProducts.length,
        page,
        limit,
        totalPages: Math.ceil(filteredProducts.length / limit),
        filters,
      };
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await http.get<Product>(`${this.baseUrl}/${id}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch product ${id}:`, error);
      throw new Error('Failed to fetch product');
    }
  }

  private applyFilters(
    products: Product[],
    params: ProductsQueryParams
  ): Product[] {
    let filtered = [...products];

    // Search filter
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm) ||
          (product.category || '').toLowerCase().includes(searchTerm) ||
          (product.quality || '').toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (params.category) {
      filtered = filtered.filter(
        product => product.category === params.category
      );
    }

    // Size filter
    if (params.size) {
      filtered = filtered.filter(product =>
        product.sizes?.includes(params.size as string)
      );
    }

    // Color filter
    if (params.color) {
      filtered = filtered.filter(product =>
        product.colors?.includes(params.color as string)
      );
    }

    // Price filters
    if (params.minPrice !== undefined) {
      filtered = filtered.filter(product => product.price >= params.minPrice!);
    }

    if (params.maxPrice !== undefined) {
      filtered = filtered.filter(product => product.price <= params.maxPrice!);
    }

    return filtered;
  }

  private applySorting(
    products: Product[],
    sortBy: string,
    order: 'asc' | 'desc'
  ): Product[] {
    const sorted = [...products];

    const compareValues = (a: unknown, b: unknown): number => {
      if (typeof a === 'number' && typeof b === 'number') {
        return order === 'asc' ? a - b : b - a;
      }

      const aStr = (a == null ? '' : String(a)).toLowerCase();
      const bStr = (b == null ? '' : String(b)).toLowerCase();

      if (order === 'asc') {
        return aStr.localeCompare(bStr);
      } else {
        return bStr.localeCompare(aStr);
      }
    };

    return sorted.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return compareValues(a.price, b.price);
        case 'name':
          return compareValues(a.name, b.name);
        case 'rating':
          return compareValues(a.rating, b.rating);
        case 'reviewCount':
          return compareValues(
            this.parseReviewCount(a.reviewCount),
            this.parseReviewCount(b.reviewCount)
          );
        case 'newest':
          return compareValues(Number(b.id), Number(a.id)); // Higher ID = newer
        case 'oldest':
          return compareValues(Number(a.id), Number(b.id));
        default: {
          // Relevancy: rating desc, then review count desc
          const ratingDiff = (b.rating || 0) - (a.rating || 0);
          if (ratingDiff !== 0) return ratingDiff;
          return (
            this.parseReviewCount(b.reviewCount) -
            this.parseReviewCount(a.reviewCount)
          );
        }
      }
    });
  }

  private parseReviewCount(reviewCount?: string): number {
    if (!reviewCount) return 0;
    const lower = reviewCount.toLowerCase().trim();
    if (lower.endsWith('k')) return parseFloat(lower.replace('k', '')) * 1000;
    if (lower.endsWith('m'))
      return parseFloat(lower.replace('m', '')) * 1000000;
    return Number(lower.replace(/[^0-9.]/g, '')) || 0;
  }

  private getFilterOptions(products: Product[]) {
    const categories = Array.from(
      new Set(products.map(p => p.category).filter(Boolean))
    ) as string[];
    const sizes = Array.from(
      new Set(products.flatMap(p => p.sizes || []))
    ).filter(Boolean);
    const colors = Array.from(
      new Set(products.flatMap(p => p.colors || []))
    ).filter(Boolean);

    const prices = products
      .map(p => p.price)
      .filter(price => typeof price === 'number');
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 1000;

    return {
      categories,
      sizes,
      colors,
      priceRange: { min: minPrice, max: maxPrice },
    };
  }
}

export const productsApi = new ProductsApi();
