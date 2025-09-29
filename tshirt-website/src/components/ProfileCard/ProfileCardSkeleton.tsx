const ProfileCardSkeleton = () => (
  <div className='flex flex-col items-center w-[486px] h-auto py-10 gap-6 bg-white shadow-tertiary z-10 animate-pulse'>
    <div className='w-[150px] h-[150px] rounded-full bg-gray-200 mb-4'></div>
    <div className='h-8 w-32 bg-gray-200 rounded mb-2'></div>
    <div className='h-6 w-48 bg-gray-100 rounded mb-4'></div>
    <div className='h-12 w-40 bg-gray-200 rounded'></div>
  </div>
);
export default ProfileCardSkeleton;
