'use client';

// Utils
import { cn } from '@/lib/utils';

interface ProductPerPageProps {
  perPage: number;
  onPerPageChange: (perPage: number) => void;
  options?: number[];
}

function ProductPerPage({
  perPage,
  onPerPageChange,
  options = [8, 16, 24, 32],
}: Readonly<ProductPerPageProps>) {
  return (
    <div className='flex items-center gap-2'>
      <label htmlFor='product per page' className='text-sm mr-2'>
        Show:
      </label>
      {options.map(opt => (
        <button
          key={opt}
          name='product per page'
          onClick={() => onPerPageChange(opt)}
          className={cn(
            'px-3 py-1 rounded text-sm border cursor-pointer',
            perPage === opt
              ? 'bg-yellow-400 text-black font-bold'
              : 'bg-white text-gray-700'
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
export default ProductPerPage;
