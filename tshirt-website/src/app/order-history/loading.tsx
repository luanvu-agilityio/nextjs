import OrderCardSkeleton from '@/components/OrderCard/OrderCardSkeleton';
import { Heading } from '@/components';

function Loading() {
  return (
    <div className='container mx-auto px-30 py-12'>
      <Heading level={3} className='text-3xl mb-6 font-bold'>
        Order History
      </Heading>
      <div className='animate-pulse space-y-4'>
        {[...Array(3)].map((_, idx) => (
          <OrderCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}
export default Loading;
