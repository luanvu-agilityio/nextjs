'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// Components
import {
  Breadcrumbs,
  Button,
  Heading,
  showToast,
  Typography,
} from '@/components';
import CheckoutForm from '@/components/CheckoutForm';
import OrderSummary from '@/components/OrderSummary';

// Constants
import { ROUTES } from '@/constants/route';

// Hooks
import { useCart } from '@/store/cart';
import { useMe } from '@/hooks/useRegisterUser';
import { useCreateOrder } from '@/hooks';

// Types
import { CheckoutFormData } from '@/types/order';
import { TOAST_MESSAGES } from '@/constants';

function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: user } = useMe();
  const items = useCart(state => state.items);
  const clearCart = useCart(state => state.clear);
  const createOrder = useCreateOrder();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <main className='container mx-auto px-30 py-8'>
        <div className='text-center py-12'>
          <Typography className='text-gray-500 text-lg mb-4'>
            Your cart is empty
          </Typography>
          <Button onClick={() => router.push(ROUTES.SHOP)}>
            Continue Shopping
          </Button>
        </div>
      </main>
    );
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  const handleSubmit = async (formData: CheckoutFormData) => {
    setIsSubmitting(true);

    try {
      await createOrder.mutateAsync({
        userId: !formData.isGuest ? user?.id : undefined,
        items,
        formData,
      });

      // Clear cart after successful order
      clearCart();

      showToast(TOAST_MESSAGES.ORDER_PLACED);
    } catch {
      showToast(TOAST_MESSAGES.ORDER_FAILED);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      {/* Header Section */}
      <section className='bg-gradient-primary px-30 py-10'>
        <div className='container flex flex-col gap-9.5 items-start justify-start w-127'>
          <Breadcrumbs
            items={[
              { label: 'Home', href: ROUTES.HOME },
              { label: 'Cart', href: ROUTES.CART },
              { label: 'Checkout' },
            ]}
            variant='dark'
          />
          <Heading
            level={2}
            className='text-4xl text-white font-secondary  font-bold'
          >
            Checkout
          </Heading>
          <Typography className='text-white max-w-xl'>
            Review your order and complete your purchase.
          </Typography>
        </div>
      </section>

      {/* Content Section */}
      <div className='container mx-auto px-30 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Checkout Form */}
          <div className='lg:col-span-2'>
            <CheckoutForm
              user={user}
              isLoggedIn={!!session}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Order Summary */}
          <div>
            <OrderSummary
              items={items}
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              total={total}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
export default CheckoutPage;
