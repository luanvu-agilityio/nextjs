'use client';

// Constants
import { COLOR_PALETTE, DEFAULT_COLOR_KEYS } from '@/constants';

// Utils
import { cn } from '@/lib/utils';

export interface ColorPickerProps {
  colors: string[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
  variant?: 'light' | 'dark';
}

export default function ColorPicker({
  colors,
  selectedIndex = 0,
  onSelect,
  className,
  variant = 'light',
}: Readonly<ColorPickerProps>) {
  const available = DEFAULT_COLOR_KEYS.filter(k => colors.includes(k));

  return (
    <div className={className}>
      <div className='flex gap-3'>
        {available.map((key, index) => {
          const meta = COLOR_PALETTE[key] ?? { label: key, hex: key };
          const isSelected = selectedIndex === index;

          const selectedClasses =
            variant === 'dark' ? 'ring-2 ring-white ' : 'ring-2 ring-blue';

          const unselectedClasses =
            variant === 'dark' ? 'border-white/60' : 'border-gray-200';

          const btnClass = cn(
            'rounded-full transition-all duration-200 inline-block w-4 h-4',

            isSelected ? selectedClasses : unselectedClasses
          );

          return (
            <button
              key={key + index}
              onClick={() => onSelect?.(index)}
              aria-label={`Select color ${meta.label}`}
              title={meta.label}
              className={btnClass}
              style={{
                backgroundColor: meta.hex,
                borderStyle: 'solid',
                borderWidth: 2,
                borderColor: (() => {
                  if (isSelected) {
                    return variant === 'dark' ? '#fff' : meta.hex;
                  }
                  return variant === 'dark'
                    ? 'rgba(255,255,255,0.6)'
                    : 'rgba(0,0,0,0.06)';
                })(),
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
