'use client';
import { useState } from 'react';

// Components
import { Modal } from '@/components/common';

// Utils
import { cn } from '@/lib/utils';

interface SizeFilterProps {
  sizes: string[];
  selectedSize: string | null;
  onSizeChange: (size: string | null) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function SizeFilter({
  sizes,
  selectedSize,
  onSizeChange,
  isOpen,
  onToggle,
  onClose,
}: Readonly<SizeFilterProps>) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSizes = sizes.filter(size =>
    size.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSizeSelect = (size: string | null) => {
    onSizeChange(size);
    onClose();
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
        Size
      </button>

      <Modal
        open={isOpen}
        onOpenChange={open => !open && onClose()}
        className='absolute left-0 mt-2 w-72 bg-white border rounded shadow-lg z-50 p-0'
      >
        <div className='p-3'>
          <input
            placeholder='Search'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='w-full border rounded px-3 py-2 mb-3'
            aria-label='Search size'
          />
          <div className='max-h-48 overflow-auto'>
            {filteredSizes.map(size => (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                className={cn(
                  'w-full text-left px-2 py-2 rounded hover:bg-gray-50 cursor-pointer',
                  selectedSize === size
                    ? 'font-bold text-primary'
                    : 'text-gray-700'
                )}
              >
                {size}
              </button>
            ))}
            <button
              onClick={() => handleSizeSelect(null)}
              className='w-full text-left px-2 py-2 rounded text-sm text-gray-500 cursor-pointer'
            >
              Clear size
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default SizeFilter;
