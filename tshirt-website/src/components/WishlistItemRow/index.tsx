'use client';

import Image from 'next/image';
import { Trash } from 'lucide-react';

// Components
import { Button, IconButton, Typography } from '../common';

// Utils
import { cn } from '@/lib/utils';

// Types
import type { Product } from '@/types';

interface WishlistItemRowProps {
  product: Product;
  onRemove?: (id: string) => void;
  onAddToCart?: (id: string, qty?: number) => void;
  className?: string;
}

function WishlistItemRow({
  product,
  onRemove,
  onAddToCart,
  className,
}: Readonly<WishlistItemRowProps>) {
  const handleRemove = () => onRemove?.(product.id);
  const handleAddToCart = () => onAddToCart?.(product.id, 1);

  return (
    <div className={cn('bg-secondary p-10 mb-6', className)}>
      <div className='w-full flex items-center justify-between gap-10'>
        <IconButton
          variant='outline'
          size='sm'
          onClick={handleRemove}
          aria-label='remove'
          className='border-none '
        >
          <Trash />
        </IconButton>
        <div className='w-20 h-20 flex-shrink-0 overflow-hidden bg-gray-50'>
          <Image
            src={product.image}
            alt={product.name}
            width={80}
            height={80}
            className='object-cover'
          />
        </div>

        <div className='flex-1'>
          <Typography className='font-bold font-secondary text-xl'>
            {product.name}
          </Typography>
          <Typography className='text-lg font-secondary  text-gray-foreground'>
            Color : {product.colors?.[0] ?? '—'}
          </Typography>
        </div>
        <div className='flex flex-row gap-32 justify-between'>
          <div className='text-right w-40'>
            <Typography className='font-bold font-secondary text-xl'>
              &#36; USD {product.price}
            </Typography>
            <Typography className='text-lg font-secondary  text-gray-foreground'>
              Price
            </Typography>
          </div>

          <div className='text-center w-32'>
            <Typography className='font-bold font-secondary text-xl'>
              {product.stock ?? '—'}
            </Typography>
            <Typography className='text-lg font-secondary  text-gray-foreground'>
              In Stock
            </Typography>
          </div>

          <Button variant='primary' onClick={handleAddToCart}>
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WishlistItemRow;
