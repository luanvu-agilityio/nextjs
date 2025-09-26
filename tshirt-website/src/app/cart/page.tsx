'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

// Components
import CartItemRow from '@/components/CartItemRow';
import CartSummary from '@/components/CartSummary';
import { Breadcrumbs, Heading, showToast, Typography } from '@/components';
import CartItemRowSkeleton from '@/components/CartItemRow/CartItemRowSkeleton';
import CartSummarySkeleton from '@/components/CartSummary/CartSummarySkeleton';

// Constants
import { ROUTES } from '@/constants/route';
import {
  createToastMessage,
  TOAST_DESCRIPTIONS,
  TOAST_MESSAGES,
  TOAST_TITLES,
  TOAST_VARIANTS,
} from '@/constants';

// Store
import { useCart } from '@/store';

function CartPage() {
  const [isLoading] = useState(false);
  const router = useRouter();
  const items = useCart(s => s.items);
  const saveNote = useCart(s => s.saveNote);

  const removeItem = useCart(state => state.removeItem);
  const updateQty = useCart(state => state.updateQty);

  const mapped = items.map(e => ({ product: e.product, qty: e.qty }));

  const subtotal = useMemo(
    () => mapped.reduce((s, it) => s + it.product.price * it.qty, 0),
    [mapped]
  );
  const handleCheckout = () => {
    try {
      if (items.length === 0) {
        showToast(TOAST_MESSAGES.CART_EMPTY);
        return;
      }

      showToast(TOAST_MESSAGES.CHECKOUT_SUCCESS);
      router.push(ROUTES.CHECKOUT);
    } catch {
      showToast(TOAST_MESSAGES.CHECKOUT_FAILED);
    }
  };

  const handleSaveNote = (id: string, note: string) => {
    try {
      saveNote(id, note);
      showToast(TOAST_MESSAGES.NOTE_SAVED);
    } catch {
      showToast({
        title: TOAST_TITLES.UPDATE_FAILED,
        description: TOAST_DESCRIPTIONS.UNABLE_TO_SAVE_NOTE,
        variant: TOAST_VARIANTS.ERROR,
      });
    }
  };

  const handleRemoveItem = (id: string) => {
    try {
      const item = items.find(i => i.id === id);
      removeItem(id);

      showToast(
        createToastMessage.removedFromCart(item?.product.name || 'Product')
      );
    } catch {
      showToast({
        title: TOAST_TITLES.UPDATE_FAILED,
        description: TOAST_DESCRIPTIONS.UNABLE_TO_REMOVE_FROM_CART,
        variant: TOAST_VARIANTS.ERROR,
      });
    }
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    try {
      const item = items.find(i => i.id === id);

      if (item?.product.stock && item.product.stock < qty) {
        showToast(createToastMessage.insufficientStock(item.product.stock));
        return;
      }

      updateQty(id, qty);
    } catch {
      showToast({
        title: TOAST_TITLES.UPDATE_FAILED,
        description: TOAST_DESCRIPTIONS.UNABLE_TO_UPDATE_QUANTITY,
        variant: TOAST_VARIANTS.ERROR,
      });
    }
  };

  const itemCount = mapped.reduce((s, it) => s + it.qty, 0);

  return (
    <main>
      {/* Hero */}
      <section className='bg-gradient-primary px-30 py-10'>
        <div className='container flex flex-col gap-9.5 items-start justify-start w-127'>
          <Breadcrumbs
            items={[{ label: 'Home', href: ROUTES.HOME }, { label: 'Cart' }]}
            variant='dark'
          />
          <Heading
            level={2}
            className='text-4xl text-white font-secondary font-bold'
          >
            Cart
          </Heading>
          <Typography className='text-white max-w-xl'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget
            gravida leo, nec iaculis diam.
          </Typography>
        </div>
      </section>

      {/* Content */}
      <div className='container mx-auto px-30 py-12'>
        <Heading level={2} className='text-3xl mb-6 font-bold'>
          Cart Product
        </Heading>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-6'>
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <CartItemRowSkeleton key={`cart-skeleton-${i}`} />
                ))
              : items.map(item => (
                  <CartItemRow
                    key={item.product.id}
                    product={item.product}
                    initialQuantity={item.qty}
                    initialNote={item.note ?? ''}
                    onSaveNote={handleSaveNote}
                    onRemove={handleRemoveItem}
                    onAddToCart={handleUpdateQuantity}
                  />
                ))}
          </div>

          {isLoading ? (
            <CartSummarySkeleton />
          ) : (
            <CartSummary
              subtotal={subtotal}
              itemCount={itemCount}
              onCheckout={handleCheckout}
            />
          )}
        </div>
      </div>
    </main>
  );
}
export default CartPage;
