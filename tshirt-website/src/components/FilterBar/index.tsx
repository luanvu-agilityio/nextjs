'use client';
import { useRef, useState } from 'react';

// Components
import CategoryFilter from './CategoryFilter';
import SizeFilter from './SizeFilter';
import ColorFilter from './ColorFilter';
import PriceFilter from './PriceFilter';
import ProductPerPage from './ProductPerPage';
import ProductSorting, { SortOption } from './ProductSorting';

// Utils
import { cn } from '@/lib/utils';

// Hooks
import useClickAway from '@/hooks/useClickAway';
import { useProductFilters } from '@/hooks/useProducts';

type Filters = {
  query?: string;
  category?: string | null;
  brand?: string | null;
  size?: string | null;
  color?: string | null;
  minPrice?: number | '';
  maxPrice?: number | '';
  limit?: number;
  sort?: string;
};

type FilterBarProps = {
  sortOptions?: SortOption[];
  value: Filters;
  onChange: (next: Partial<Filters>) => void;
  className?: string;
  isLoading?: boolean;
};

export default function FilterBar({
  value,
  onChange,
  className,
  sortOptions,
  isLoading = false,
}: Readonly<FilterBarProps>) {
  const update = (patch: Partial<Filters>) => onChange(patch);

  const [open, setOpen] = useState<
    'category' | 'size' | 'color' | 'price' | null
  >(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickAway(wrapperRef, () => setOpen(null));

  // Fetch filter options from API
  const { data: filterOptions, isLoading: isFilterOptionsLoading } =
    useProductFilters();

  const closeAll = () => setOpen(null);

  const resetFilters = () => {
    onChange({
      query: '',
      category: null,
      brand: null,
      size: null,
      color: null,
      minPrice: '',
      maxPrice: '',
      limit: 8,
      sort: 'relevancy',
    });
  };

  const categories = filterOptions?.categories || [];
  const sizes = filterOptions?.sizes || [];
  const colors = filterOptions?.colors || [];
  const isFiltersLoading = isLoading || isFilterOptionsLoading;

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'sticky top-[80px] z-40 bg-white border-b border-gray-100 py-3',
        className
      )}
    >
      <div className='container mx-auto px-30'>
        <div className='flex items-center gap-3 flex-wrap'>
          {/* Filter Buttons */}
          {isFilterOptionsLoading ? (
            <div className='flex items-center gap-3'>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className='h-10 w-20 bg-gray-200 rounded animate-pulse'
                />
              ))}
            </div>
          ) : (
            <>
              <CategoryFilter
                categories={categories}
                selectedCategory={value.category ?? null}
                onCategoryChange={category => update({ category })}
                isOpen={open === 'category'}
                onToggle={() =>
                  setOpen(open === 'category' ? null : 'category')
                }
                onClose={closeAll}
              />

              <SizeFilter
                sizes={sizes}
                selectedSize={value.size ?? null}
                onSizeChange={size => update({ size })}
                isOpen={open === 'size'}
                onToggle={() => setOpen(open === 'size' ? null : 'size')}
                onClose={closeAll}
              />

              <ColorFilter
                colors={colors}
                selectedColor={value.color ?? null}
                onColorChange={color => update({ color })}
                isOpen={open === 'color'}
                onToggle={() => setOpen(open === 'color' ? null : 'color')}
                onClose={closeAll}
              />

              <PriceFilter
                minPrice={value.minPrice ?? ''}
                maxPrice={value.maxPrice ?? ''}
                onPriceChange={(minPrice, maxPrice) =>
                  update({ minPrice, maxPrice })
                }
                isOpen={open === 'price'}
                onToggle={() => setOpen(open === 'price' ? null : 'price')}
                onClose={closeAll}
              />
            </>
          )}

          {/* Right Side Controls */}
          <div className='ml-auto flex items-center gap-3'>
            <ProductPerPage
              perPage={value.limit ?? 8}
              onPerPageChange={limit => update({ limit })}
            />

            <ProductSorting
              sortBy={value.sort ?? 'relevancy'}
              onSortChange={sort => update({ sort })}
              options={sortOptions}
              disabled={isFiltersLoading}
            />

            <button
              onClick={resetFilters}
              disabled={isFiltersLoading}
              className={cn(
                'ml-3 px-4 py-2  border rounded shadow-sm text-sm transition-colors cursor-pointer',
                'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500',
                isFiltersLoading &&
                  'opacity-50 cursor-not-allowed hover:bg-white'
              )}
            >
              {isFiltersLoading ? 'Loading...' : 'Reset'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
