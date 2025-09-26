'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Components
import WishlistItemRow from '@/components/WishlistItemRow';
import { Breadcrumbs, Heading, showToast, Typography } from '@/components';

// Constants
import { ROUTES } from '@/constants/route';
import {
  createToastMessage,
  TOAST_DESCRIPTIONS,
  TOAST_MESSAGES,
  TOAST_TITLES,
  TOAST_VARIANTS,
} from '@/constants';

// Stores
import { useCart } from '@/store';
import { useWishlist } from '@/store/wishlist';
import WishlistItemRowSkeleton from '@/components/WishlistItemRow/WishlistItemRowSkeleton';

function WishlistPage() {
  const [isLoading] = useState(false);
  const router = useRouter();
  const items = useWishlist(s => s.items);
  const removeWishlistItem = useWishlist(s => s.removeItem);
  const addItemToCart = useCart(state => state.addItem);

  const handleAddToCart = (id: string, qty = 1) => {
    try {
      const entry = items.find(item => item.product.id === id);
      if (!entry) {
        showToast(TOAST_MESSAGES.PRODUCT_NOT_FOUND_CART);
        return;
      }

      // Check stock if available
      if (entry.product.stock && entry.product.stock < qty) {
        showToast(createToastMessage.insufficientStock(entry.product.stock));
        return;
      }

      addItemToCart(entry.product, { qty });
      showToast(createToastMessage.movedToCart(entry.product.name));
      router.push(ROUTES.CART);
    } catch {
      showToast({
        title: TOAST_TITLES.UPDATE_FAILED,
        description: TOAST_DESCRIPTIONS.UNABLE_TO_ADD_TO_CART,
        variant: TOAST_VARIANTS.ERROR,
      });
    }
  };

  const handleRemove = (id: string) => {
    try {
      const entry = items.find(item => item.product.id === id);
      removeWishlistItem(id);

      showToast(
        createToastMessage.removedFromWishlist(entry?.product.name || 'Product')
      );
    } catch {
      showToast({
        title: TOAST_TITLES.UPDATE_FAILED,
        description: TOAST_DESCRIPTIONS.UNABLE_TO_REMOVE_FROM_WISHLIST,
        variant: TOAST_VARIANTS.ERROR,
      });
    }
  };

  return (
    <main>
      <section className='bg-gradient-primary px-30 py-10'>
        <div className='container flex flex-col gap-9.5 items-start justify-start w-127'>
          <Breadcrumbs
            items={[
              { label: 'Home', href: ROUTES.HOME },
              { label: 'Wishlist' },
            ]}
            variant='dark'
          />
          <Heading
            level={2}
            className='text-4xl text-white font-secondary font-bold'
          >
            Wishlist
          </Heading>
          <Typography className='text-white/90 max-w-xl'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget
            gravida leo, nec iaculis diam.
          </Typography>
        </div>
      </section>

      <div className='container mx-auto px-30 py-12'>
        <Heading level={2} className='text-3xl mb-6 font-bold'>
          Wishlist
        </Heading>

        {(() => {
          if (isLoading) {
            return Array.from({ length: 3 }).map((_, i) => (
              <WishlistItemRowSkeleton key={`wishlist-skeleton-${i}`} />
            ));
          }

          if (items.length === 0) {
            return (
              <Typography className='text-gray-500'>
                No items in wishlist.
              </Typography>
            );
          }

          return items.map(item => (
            <WishlistItemRow
              key={item.product.id}
              product={item.product}
              onRemove={handleRemove}
              onAddToCart={handleAddToCart}
            />
          ));
        })()}
      </div>
    </main>
  );
}

export default WishlistPage;
