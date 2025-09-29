const AccountScreenSkeleton = () => (
  <section className='w-full px-30 animate-pulse'>
    <form className='grid grid-cols-1 md:grid-cols-2 gap-8 z-10'>
      <div className='space-y-6'>
        <div className='h-8 w-1/2 bg-gray-200 rounded mb-2'></div>
        <div className='h-8 w-1/2 bg-gray-200 rounded mb-2'></div>
        <div className='h-24 w-full bg-gray-100 rounded mb-2'></div>
        <div className='h-12 w-40 bg-gray-200 rounded mt-4'></div>
      </div>
      <div className='space-y-6'>
        <div className='h-8 w-1/2 bg-gray-200 rounded mb-2 mt-22'></div>
        <div className='h-8 w-1/2 bg-gray-200 rounded mb-2'></div>
        <div className='h-12 w-40 bg-gray-100 rounded'></div>
      </div>
    </form>
  </section>
);
export default AccountScreenSkeleton;
