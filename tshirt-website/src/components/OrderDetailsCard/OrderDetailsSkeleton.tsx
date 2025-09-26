const OrderDetailsSkeleton = () => (
  <div className='bg-white rounded-lg shadow-lg p-6 animate-pulse'>
    <div className='h-6 bg-gray-200 rounded w-32 mb-4'></div>
    <div className='space-y-3'>
      <div className='h-4 bg-gray-200 rounded w-24'></div>
      <div className='h-4 bg-gray-200 rounded w-20'></div>
      <div className='h-4 bg-gray-200 rounded w-16'></div>
    </div>
    <div className='mt-6'>
      <div className='h-6 bg-gray-200 rounded w-28 mb-4'></div>
      <div className='space-y-2'>
        <div className='h-4 bg-gray-200 rounded w-36'></div>
        <div className='h-4 bg-gray-200 rounded w-32'></div>
        <div className='h-4 bg-gray-200 rounded w-24'></div>
        <div className='h-4 bg-gray-200 rounded w-20'></div>
      </div>
    </div>
  </div>
);

export default OrderDetailsSkeleton;
