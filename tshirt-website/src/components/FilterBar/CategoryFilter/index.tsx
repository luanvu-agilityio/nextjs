'use client';

import { useState } from 'react';

// Components
import { Modal } from '@/components/common/Modal';

// Utils
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  isOpen,
  onToggle,
  onClose,
}: Readonly<CategoryFilterProps>) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(cat =>
    cat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategorySelect = (category: string | null) => {
    onCategoryChange(category);
    onClose();
  };

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          'px-4 py-2 border rounded flex items-center gap-2 cursor-pointer',
          isOpen ? 'bg-yellow-400' : 'bg-white'
        )}
      >
        Category
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
            aria-label='Search category'
          />
          <div className='max-h-48 overflow-auto'>
            {filteredCategories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={cn(
                  'w-full text-left px-2 py-2 rounded hover:bg-gray-50 cursor-pointer',
                  selectedCategory === cat
                    ? 'font-bold text-primary'
                    : 'text-gray-700'
                )}
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => handleCategorySelect(null)}
              className='w-full text-left px-2 py-2 rounded text-sm text-gray-500 cursor-pointer'
            >
              Clear category
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default CategoryFilter;
