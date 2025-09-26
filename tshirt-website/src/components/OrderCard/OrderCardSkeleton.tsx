const OrderCardSkeleton = () => (
  <div className='border rounded-lg p-4 bg-white shadow-sm animate-pulse'>
    <div className='flex justify-between items-start mb-2'>
      <div>
        <div className='h-5 bg-gray-200 rounded w-24 mb-2'></div>
        <div className='h-4 bg-gray-200 rounded w-16'></div>
      </div>
      <div className='h-6 bg-gray-200 rounded w-20'></div>
    </div>
    <div className='flex justify-between items-center mt-4'>
      <div className='h-6 bg-gray-200 rounded w-16'></div>
      <div className='h-8 bg-gray-200 rounded w-24'></div>
    </div>
  </div>
);

export default OrderCardSkeleton;
