'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Icons
import { Bookmark, Heart } from 'lucide-react';

// Components
import { Heading, IconButton, Typography } from '../common';

// Utils
import { cn } from '@/lib/utils';

// Types
import { Product } from '@/types';

// Store
import { useWishlist } from '@/store/wishlist';

interface ProductCardProps {
  product: Product;
}

import dynamic from 'next/dynamic';
import { ROUTES } from '@/constants';
const StarRating = dynamic(() => import('@/components/StarRating'), {
  ssr: false,
});

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  const [isBookmarked, setIsBookmarked] = useState(false);

  const isWishlisted = useWishlist(s =>
    s.items.some(i => i.product.id === product.id)
  );
  const toggleWishlist = useWishlist(s => s.toggleItem);
  const handleAddBookmark = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };
  const handleAddWishlist = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    toggleWishlist(product);
  };

  const goToProduct = () => {
    router.push(ROUTES.PRODUCT_DETAIL(product.id));
  };

  return (
    <div
      onClick={goToProduct}
      className='bg-white  shadow-tertiary border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow duration-300 max-w-[265px] h-auto cursor-pointer'
    >
      {/* Product Image */}
      <div className='relative aspect-square bg-gray-50'>
        <Image
          src={product.image}
          alt={product.name}
          width={265}
          height={248}
          className='object-cover group-hover:scale-105 transition-transform duration-300 h-[248px] '
        />

        {/* Action Buttons */}
        <div className='absolute w-full bottom-2 pr-4 py-3 flex gap-2 justify-end opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-black backdrop-blur-[4px]'>
          <IconButton
            variant='outline'
            size='sm'
            className={cn(
              'bg-transparent text-white border-gray-200 shadow-sm',
              isBookmarked && 'bg-gray-900 text-white'
            )}
            onClick={handleAddBookmark}
            aria-label='Bookmark product'
          >
            <Bookmark className='size-4' />
          </IconButton>

          <IconButton
            variant='outline'
            size='sm'
            className={cn(
              'bg-transparent text-white border-gray-200 shadow-sm',
              isWishlisted && 'bg-red-500 text-white'
            )}
            onClick={handleAddWishlist}
            aria-label='Add to wishlist'
          >
            <Heart className='size-4' />
          </IconButton>
        </div>
      </div>

      {/* Product Info */}
      <div className='p-4'>
        <div className='flex items-start justify-between '>
          <Heading level={3} className=' text-sm font-bold text-gray-900'>
            {product.name}
          </Heading>
          <Typography className='font-bold text-sm text-gray-900'>
            {product.price}$
          </Typography>
        </div>

        <Typography size='sm' className='text-gray-500 '>
          {product.quality}
        </Typography>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
      </div>
    </div>
  );
};
export { ProductCard };
