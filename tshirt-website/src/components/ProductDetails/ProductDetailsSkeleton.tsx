const ProductDetailsSkeleton = () => (
  <main className='container mx-auto py-10'>
    <div className='px-30'>
      {/* Breadcrumb skeleton */}
      <div className='h-5 bg-gray-200 rounded mb-4 w-64 animate-pulse'></div>
    </div>

    <div className='flex flex-row gap-10 px-30'>
      {/* Left - Images skeleton */}
      <div className='flex gap-6 flex-col mt-10'>
        {/* Main image skeleton */}
        <div className='relative max-w-[588px] max-h-[604px] bg-gray-200 rounded-lg animate-pulse'>
          <div className='w-[588px] h-[400px] bg-gray-300 rounded-lg'></div>
        </div>

        {/* Thumbnail images skeleton */}
        <div className='flex flex-row gap-4 items-center justify-center'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className='w-20 h-20 bg-gray-200 rounded animate-pulse'
            ></div>
          ))}
        </div>
      </div>

      {/* Right - Details skeleton */}
      <div className='text-gray-900 flex-1'>
        {/* Product name */}
        <div className='h-9 bg-gray-200 rounded mb-2 w-3/4 animate-pulse'></div>

        {/* Description */}
        <div className='space-y-2 mb-6'>
          <div className='h-5 bg-gray-200 rounded w-full animate-pulse'></div>
          <div className='h-5 bg-gray-200 rounded w-4/5 animate-pulse'></div>
        </div>

        {/* Star rating */}
        <div className='flex items-center gap-4 mb-4'>
          <div className='h-5 bg-gray-200 rounded w-32 animate-pulse'></div>
        </div>

        {/* Color and Stock grid */}
        <div className='grid grid-cols-2 gap-6 items-center mb-6'>
          <div>
            <div className='h-5 bg-gray-200 rounded mb-2 w-16 animate-pulse'></div>
            <div className='flex gap-2'>
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className='w-8 h-8 bg-gray-200 rounded-full animate-pulse'
                ></div>
              ))}
            </div>
          </div>
          <div className='flex flex-col items-end gap-2'>
            <div className='h-5 bg-gray-200 rounded w-12 animate-pulse'></div>
            <div className='flex items-center gap-3'>
              <div className='h-6 bg-gray-200 rounded w-16 animate-pulse'></div>
              <div className='w-5 h-5 bg-gray-200 rounded animate-pulse'></div>
            </div>
          </div>
        </div>

        {/* Size picker */}
        <div className='mb-6'>
          <div className='h-5 bg-gray-200 rounded mb-2 w-10 animate-pulse'></div>
          <div className='flex gap-2'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className='w-12 h-10 bg-gray-200 rounded animate-pulse'
              ></div>
            ))}
          </div>
        </div>

        {/* Quantity section */}
        <div>
          <div className='h-5 bg-gray-200 rounded mb-2 w-16 animate-pulse'></div>
          <div className='flex items-center gap-6 mb-6'>
            {/* Quantity selector */}
            <div className='w-32 h-10 bg-gray-200 rounded animate-pulse'></div>

            {/* Price */}
            <div className='ml-auto h-9 bg-gray-200 rounded w-32 animate-pulse'></div>
          </div>
        </div>

        {/* Action buttons */}
        <div className='flex items-center gap-4'>
          <div className='h-12 bg-gray-200 rounded w-full animate-pulse'></div>
          <div className='w-12 h-12 bg-gray-200 rounded animate-pulse'></div>
          <div className='w-12 h-12 bg-gray-200 rounded animate-pulse'></div>
        </div>
      </div>
    </div>
  </main>
);
export default ProductDetailsSkeleton;
