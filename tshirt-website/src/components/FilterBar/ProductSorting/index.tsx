'use client';
import { useState, useRef } from 'react';

// Icons
import { ChevronDown } from 'lucide-react';

// Utils
import { cn } from '@/lib/utils';

// Hooks
import useClickAway from '@/hooks/useClickAway';

export interface SortOption {
  value: string;
  label: string;
}

interface ProductSortingProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  options?: SortOption[];
  className?: string;
  disabled?: boolean;
}

const DEFAULT_SORT_OPTIONS: SortOption[] = [
  {
    value: 'relevancy',
    label: 'Relevancy',
  },
  {
    value: 'price-asc',
    label: 'Price: Low to High',
  },
  {
    value: 'price-desc',
    label: 'Price: High to Low',
  },
  {
    value: 'name-asc',
    label: 'Name: A to Z',
  },
  {
    value: 'name-desc',
    label: 'Name: Z to A',
  },
  {
    value: 'rating-desc',
    label: 'Highest Rated',
  },
  {
    value: 'rating-asc',
    label: 'Lowest Rated',
  },
  {
    value: 'newest',
    label: 'Newest First',
  },
  {
    value: 'oldest',
    label: 'Oldest First',
  },
  {
    value: 'reviews-desc',
    label: 'Most Reviewed',
  },
];

function ProductSorting({
  sortBy,
  onSortChange,
  options = DEFAULT_SORT_OPTIONS,
  className,
  disabled = false,
}: Readonly<ProductSortingProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickAway(wrapperRef, () => setIsOpen(false));

  const currentOption = options.find(opt => opt.value === sortBy) || options[0];

  const handleOptionSelect = (value: string) => {
    onSortChange(value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div ref={wrapperRef} className={cn('relative', className)}>
      <div className='flex items-center gap-2'>
        <label className='text-sm text-gray-600 whitespace-nowrap'>
          Sort by:
        </label>

        <button
          type='button'
          onClick={toggleDropdown}
          disabled={disabled}
          className={cn(
            'flex items-center justify-between gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium transition-colors cursor-pointer',
            'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
            disabled && 'opacity-50 cursor-not-allowed hover:bg-white',
            isOpen && 'ring-2 ring-blue-500 ring-offset-1'
          )}
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          aria-label={`Sort by ${currentOption.label}`}
        >
          <span className='truncate min-w-0'>{currentOption.label}</span>
          <ChevronDown
            className={cn(
              'size-4 text-gray-400 transition-transform flex-shrink-0',
              isOpen && 'rotate-180'
            )}
          />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className='absolute right-0 top-full mt-1 w-45 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1'>
          <div className='max-h-64 overflow-y-auto'>
            {options.map(option => (
              <option
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={cn(
                  'w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors cursor-pointer',
                  'flex flex-col gap-1',
                  sortBy === option.value &&
                    'bg-blue-50 text-blue-600 font-medium'
                )}
                aria-selected={sortBy === option.value}
              >
                <span className='font-medium'>{option.label}</span>
              </option>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { DEFAULT_SORT_OPTIONS };
export default ProductSorting;
