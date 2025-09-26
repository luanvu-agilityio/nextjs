// Utils
import { cn } from '@/lib/utils';

interface CartItemRowSkeletonProps {
  className?: string;
}

function CartItemRowSkeleton({
  className,
}: Readonly<CartItemRowSkeletonProps>) {
  return (
    <div
      className={cn(
        'bg-secondary p-10 flex flex-col items-center gap-12.5 mb-6',
        className
      )}
    >
      <div className='w-full flex items-center justify-between gap-20'>
        <div className='flex items-center justify-between gap-10'>
          <div className='w-20 h-20 flex-shrink-0 bg-gray-200 rounded animate-pulse'></div>
          <div className='space-y-2'>
            <div className='h-5 bg-gray-200 rounded w-32 animate-pulse'></div>
            <div className='h-4 bg-gray-200 rounded w-24 animate-pulse'></div>
          </div>
        </div>

        <div className='text-right space-y-2'>
          <div className='h-5 bg-gray-200 rounded w-20 animate-pulse'></div>
          <div className='h-4 bg-gray-200 rounded w-12 animate-pulse'></div>
        </div>

        <div className='text-center space-y-2'>
          <div className='h-5 bg-gray-200 rounded w-8 animate-pulse'></div>
          <div className='h-4 bg-gray-200 rounded w-16 animate-pulse'></div>
        </div>

        <div className='w-8 h-8 bg-gray-200 rounded animate-pulse'></div>
      </div>

      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='h-4 bg-gray-200 rounded w-24 animate-pulse'></div>
          <div className='w-4 h-4 bg-gray-200 rounded animate-pulse'></div>
        </div>

        <div className='flex items-center gap-2 bg-white px-3 py-1 rounded'>
          <div className='w-4 h-4 bg-gray-200 rounded animate-pulse'></div>
          <div className='w-8 h-4 bg-gray-200 rounded animate-pulse'></div>
          <div className='w-4 h-4 bg-gray-200 rounded animate-pulse'></div>
        </div>
      </div>
    </div>
  );
}

export default CartItemRowSkeleton;
