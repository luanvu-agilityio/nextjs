import { cn } from '@/lib/utils';

interface WishlistItemRowSkeletonProps {
  className?: string;
}

function WishlistItemRowSkeleton({
  className,
}: Readonly<WishlistItemRowSkeletonProps>) {
  return (
    <div className={cn('bg-secondary p-10 mb-6', className)}>
      <div className='w-full flex items-center justify-between gap-10'>
        <div className='w-8 h-8 bg-gray-200 rounded animate-pulse'></div>

        <div className='w-20 h-20 flex-shrink-0 bg-gray-200 rounded animate-pulse'></div>

        <div className='flex-1 space-y-2'>
          <div className='h-6 bg-gray-200 rounded w-3/4 animate-pulse'></div>
          <div className='h-5 bg-gray-200 rounded w-1/2 animate-pulse'></div>
        </div>

        <div className='flex flex-row gap-32 justify-between'>
          <div className='text-right w-40 space-y-2'>
            <div className='h-6 bg-gray-200 rounded w-20 animate-pulse'></div>
            <div className='h-5 bg-gray-200 rounded w-12 animate-pulse'></div>
          </div>

          <div className='text-center w-32 space-y-2'>
            <div className='h-6 bg-gray-200 rounded w-8 animate-pulse'></div>
            <div className='h-5 bg-gray-200 rounded w-16 animate-pulse'></div>
          </div>

          <div className='h-10 bg-gray-200 rounded w-24 animate-pulse'></div>
        </div>
      </div>
    </div>
  );
}

export default WishlistItemRowSkeleton;
