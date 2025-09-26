interface ProductTabProps {
  tab: 'description' | 'reviews';
  setTab: (tab: 'description' | 'reviews') => void;
  reviewCount: string;
}

const ProductTab = ({ tab, setTab, reviewCount }: ProductTabProps) => (
  <div className='flex items-center justify-center gap-8 border-b border-gray-200 pb-4 mb-6'>
    <button
      className={`pb-2 ${tab === 'description' ? 'text-purple-600 border-b-2 border-purple-400 font-semibold' : 'text-gray-500'}`}
      onClick={() => setTab('description')}
    >
      Description
    </button>
    <button
      className={`pb-2 ${tab === 'reviews' ? 'text-purple-600 border-b-2 border-purple-400 font-semibold' : 'text-gray-500'}`}
      onClick={() => setTab('reviews')}
    >
      Reviews ({reviewCount})
    </button>
  </div>
);

export default ProductTab;
