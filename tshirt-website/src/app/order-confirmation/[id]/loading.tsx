import OrderDetailsSkeleton from '@/components/OrderDetailsCard/OrderDetailsSkeleton';
import OrderSummarySkeleton from '@/components/OrderSummary/OrderSummarySkeleton';

function Loading() {
  return (
    <main className='container mx-auto px-30 py-8'>
      <div className='w-full mx-auto'>
        <div className='text-center mb-8'>
          <div className='w-full flex items-center justify-center mx-auto mb-4'>
            <div className='w-20 h-20 bg-green-100 rounded-full animate-pulse'></div>
          </div>
          <div className='h-8 bg-gray-200 rounded mx-auto mb-2 w-1/2 animate-pulse'></div>
          <div className='h-6 bg-gray-100 rounded mx-auto w-2/3 animate-pulse'></div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <OrderDetailsSkeleton />
          <OrderSummarySkeleton />
        </div>
        <div className='flex gap-4 justify-center mt-8'>
          <div className='w-40 h-12 bg-gray-200 rounded animate-pulse'></div>
          <div className='w-40 h-12 bg-gray-200 rounded animate-pulse'></div>
        </div>
      </div>
    </main>
  );
}

export default Loading;
