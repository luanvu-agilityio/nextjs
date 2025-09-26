function ProductCardSkeleton() {
  return (
    <div className='bg-white shadow-tertiary border border-gray-100 overflow-hidden w-[265px] h-auto animate-pulse'>
      <div className='relative aspect-square bg-gray-100' />
      <div className='p-4'>
        <div className='h-4 bg-gray-200 rounded w-full mb-2' />
        <div className='h-4 bg-gray-200 rounded w-1/4 mb-3' />
        <div className='h-4 bg-gray-200 rounded w-2/3' />
      </div>
    </div>
  );
}
export default ProductCardSkeleton;
