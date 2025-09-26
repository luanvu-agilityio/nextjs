'use client';
import { useState, useEffect } from 'react';

// Components
import { Button, Modal } from '@/components/common';

// Utils
import { cn } from '@/lib/utils';

interface PriceFilterProps {
  minPrice: number | '';
  maxPrice: number | '';
  onPriceChange: (minPrice: number | '', maxPrice: number | '') => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function PriceFilter({
  minPrice,
  maxPrice,
  onPriceChange,
  isOpen,
  onToggle,
  onClose,
}: Readonly<PriceFilterProps>) {
  const [localMin, setLocalMin] = useState<number | ''>(minPrice);
  const [localMax, setLocalMax] = useState<number | ''>(maxPrice);

  useEffect(() => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
  }, [minPrice, maxPrice]);

  const handleApply = () => {
    onPriceChange(localMin, localMax);
    onClose();
  };

  const handleClear = () => {
    setLocalMin('');
    setLocalMax('');
  };

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          'px-4 py-2 border rounded cursor-pointer',
          isOpen ? 'bg-yellow-400' : 'bg-white'
        )}
      >
        Price
      </button>

      <Modal
        open={isOpen}
        onOpenChange={open => !open && onClose()}
        className='absolute left-0 mt-2 w-80 bg-white border rounded shadow-lg z-50 p-0'
      >
        <div className='p-4'>
          <div className='text-sm text-gray-500 mb-3'>Price range</div>
          <div className='flex gap-3 items-center mb-3'>
            <input
              type='number'
              value={localMin ?? ''}
              onChange={e =>
                setLocalMin(e.target.value === '' ? '' : Number(e.target.value))
              }
              placeholder='Min'
              className='w-1/2 border rounded px-3 py-2'
              aria-label='Minimum price'
            />
            <input
              type='number'
              value={localMax ?? ''}
              onChange={e =>
                setLocalMax(e.target.value === '' ? '' : Number(e.target.value))
              }
              placeholder='Max'
              className='w-1/2 border rounded px-3 py-2'
              aria-label='Maximum price'
            />
          </div>

          <div className='flex justify-between items-center gap-3'>
            <Button
              onClick={handleClear}
              className='px-4 py-2 border rounded text-sm cursor-pointer'
            >
              Clear
            </Button>

            <Button
              onClick={handleApply}
              className='px-4 py-2 bg-black text-white rounded text-sm cursor-pointer'
            >
              Show results
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default PriceFilter;
