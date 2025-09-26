'use client';

// Constants
import { SIZES } from '@/constants';

// Utils
import { cn } from '@/lib/utils';

export interface SizePickerProps {
  sizes: string[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
  variant?: 'light' | 'dark';
}

function SizePicker({
  sizes,
  selectedIndex = 0,
  onSelect,
  className,
  variant = 'light',
}: Readonly<SizePickerProps>) {
  const ordered = SIZES.filter(s => sizes.includes(s));

  return (
    <div className={className}>
      <div className='flex gap-3'>
        {ordered.map((size, index) => {
          const isSelected = selectedIndex === index;

          const base =
            'w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200';
          const selectedClass =
            variant === 'dark'
              ? 'bg-white text-blue-background'
              : 'bg-blue-background text-white ';
          const unselectedClass =
            variant === 'dark'
              ? 'bg-white text-primary '
              : 'bg-secondary text-primary ';

          return (
            <button
              key={size + index}
              onClick={() => onSelect?.(index)}
              className={cn(base, isSelected ? selectedClass : unselectedClass)}
              aria-pressed={isSelected}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default SizePicker;
