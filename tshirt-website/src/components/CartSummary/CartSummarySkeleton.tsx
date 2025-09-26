import { cn } from '@/lib/utils';

interface CartSummarySkeletonProps {
  className?: string;
}

function CartSummarySkeleton({
  className,
}: Readonly<CartSummarySkeletonProps>) {
  return (
    <aside className={cn('bg-secondary p-6', className)}>
      <div className='flex flex-col mb-4'>
        <div className='h-5 bg-gray-200 rounded w-24 mb-2 animate-pulse'></div>
        <div className='w-full h-10 bg-gray-200 rounded animate-pulse'></div>
        <div className='mt-3 mb-9 flex justify-end'>
          <div className='h-10 bg-gray-200 rounded w-16 animate-pulse'></div>
        </div>

        <div className='flex justify-between mb-2'>
          <div className='h-5 bg-gray-200 rounded w-16 animate-pulse'></div>
          <div className='h-5 bg-gray-200 rounded w-20 animate-pulse'></div>
        </div>
        <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div>
      </div>

      <div className='border-t pt-4 mt-4'>
        <div className='mt-6'>
          <div className='flex justify-between mb-4'>
            <div className='h-5 bg-gray-200 rounded w-12 animate-pulse'></div>
            <div className='h-5 bg-gray-200 rounded w-20 animate-pulse'></div>
          </div>
          <div className='mt-6 flex justify-end'>
            <div className='h-10 bg-gray-200 rounded w-20 animate-pulse'></div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default CartSummarySkeleton;
