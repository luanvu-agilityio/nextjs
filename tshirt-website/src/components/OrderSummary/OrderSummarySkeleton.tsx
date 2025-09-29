const OrderSummarySkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
    <div className="space-y-4 mb-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
          <div className="flex-1 min-w-0 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>
      ))}
    </div>
    <div className="border-t pt-4 space-y-2">
      <div className="flex justify-between">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-12"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-10"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-12"></div>
      </div>
      <div className="border-t pt-2 mt-4">
        <div className="flex justify-between">
          <div className="h-5 bg-gray-200 rounded w-20"></div>
          <div className="h-5 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
      <div className="h-4 bg-blue-200 rounded w-36"></div>
    </div>
  </div>
);

export default OrderSummarySkeleton;
