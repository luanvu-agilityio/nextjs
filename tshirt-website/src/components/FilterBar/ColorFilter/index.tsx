'use client';

// Components
import { Modal } from '@/components/common';

// Utils
import { cn } from '@/lib/utils';

interface ColorFilterProps {
  colors: string[];
  selectedColor: string | null;
  onColorChange: (color: string | null) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function ColorFilter({
  colors,
  selectedColor,
  onColorChange,
  isOpen,
  onToggle,
  onClose,
}: Readonly<ColorFilterProps>) {
  const handleColorSelect = (color: string | null) => {
    onColorChange(color);
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
        Colour
      </button>

      <Modal
        open={isOpen}
        onOpenChange={open => !open && onClose()}
        className='absolute left-0 mt-2 w-72 bg-white border rounded shadow-lg z-50 p-0'
      >
        <div className='p-3'>
          <div className='max-h-48 overflow-auto'>
            {colors.map(color => (
              <button
                key={color}
                onClick={() => handleColorSelect(color)}
                className={cn(
                  'w-full text-left px-2 py-2 rounded hover:bg-gray-50 cursor-pointer',
                  selectedColor === color
                    ? 'font-bold text-primary'
                    : 'text-gray-700'
                )}
              >
                {color}
              </button>
            ))}
            <button
              onClick={() => handleColorSelect(null)}
              className='w-full text-left px-2 py-2 rounded text-sm text-gray-500 cursor-pointer'
            >
              Clear colour
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default ColorFilter;
