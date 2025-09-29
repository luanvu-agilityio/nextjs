'use client';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

// Components
import { Button, ErrorMessage, Heading, Typography } from '@/components';
import OrderSummary from '@/components/OrderSummary';

// Constants
import { ROUTES } from '@/constants/route';

// Hooks
import { useOrder } from '@/hooks';

// Types
import { OrderItem } from '@/types';
import OrderDetailsCard from '@/components/OrderDetailsCard';
import OrderDetailsSkeleton from '@/components/OrderDetailsCard/OrderDetailsSkeleton';
import OrderSummarySkeleton from '@/components/OrderSummary/OrderSummarySkeleton';

function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const orderId = params.id as string;

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push(
        `${ROUTES.LOGIN}?callbackUrl=${encodeURIComponent(window.location.pathname)}`
      );
    }
  }, [session, status, router]);

  const { data: order, isLoading, error } = useOrder(orderId);

  if (status === 'loading' || !session) {
    return (
      <main className='container mx-auto px-30 py-8'>
        <div className='text-center py-12'>
          <Typography>Retrieving order information...</Typography>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className='container mx-auto px-30 py-8'>
        <div className='w-full mx-auto'>
          {/* Success Header Skeleton */}
          <div className='text-center mb-8'>
            <div className='w-full flex items-center justify-center mx-auto mb-4'>
              <div className='w-20 h-20 bg-green-100 rounded-full animate-pulse'></div>
            </div>
            <div className='h-8 bg-gray-200 rounded mx-auto mb-2 w-1/2 animate-pulse'></div>
            <div className='h-6 bg-gray-100 rounded mx-auto w-2/3 animate-pulse'></div>
          </div>

          {/* Order Details & Summary Skeletons */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <OrderDetailsSkeleton />
            <OrderSummarySkeleton />
          </div>

          {/* Action Buttons Skeleton */}
          <div className='flex gap-4 justify-center mt-8'>
            <div className='w-40 h-12 bg-gray-200 rounded animate-pulse'></div>
            <div className='w-40 h-12 bg-gray-200 rounded animate-pulse'></div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    const errorMessage = error.message;
    const isUnauthorized = errorMessage.includes('Unauthorized');

    return (
      <main className='container mx-auto px-30 py-8'>
        <ErrorMessage
          customMessage={
            isUnauthorized
              ? 'You are not authorized to view this order.'
              : 'Order not found or failed to load.'
          }
        />
        <div className='flex gap-4 justify-center'>
          <Link href={ROUTES.ACCOUNT}>
            <Button variant='secondary'>View My Orders</Button>
          </Link>
          <Link href={ROUTES.HOME}>
            <Button className='bg-gradient-primary text-white'>
              Return Home
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className='container mx-auto px-30 py-8'>
        <div className='text-center py-12'>
          <ErrorMessage customMessage='Order not found or failed to load.' />
          <Link href={ROUTES.HOME}>
            <Button className='mt-4'>Return Home</Button>
          </Link>
        </div>
      </main>
    );
  }

  const cartItems = order.items.map(
    ({
      productId,
      productName,
      productImage,
      price,
      quantity,
      note,
    }: OrderItem) => ({
      id: productId,
      product: {
        id: productId,
        name: productName,
        image: productImage,
        price,
        rating: 0,
        reviewCount: '0',
        quality: '',
        colors: [],
        sizes: [],
        thumbnails: [],
        description: '',
        category: '',
      },
      qty: quantity,
      note,
    })
  );

  const { subtotal, tax, shipping, total } = order;
  return (
    <main className='container mx-auto px-30 py-8'>
      <div className='w-full mx-auto'>
        {/* Success Header */}
        <div className='text-center mb-8'>
          <div className='w-full flex items-center justify-center mx-auto mb-4'>
            <svg
              className='w-20 h-20 text-green-600 bg-green-100 rounded-full'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>
          <Heading level={2} className='text-3xl font-bold text-gray-800 mb-2'>
            Order Confirmed!
          </Heading>
          <Typography className='text-gray-600 text-lg'>
            Thank you for your purchase. Your order has been successfully
            placed.
          </Typography>
        </div>

        {/* Order Details */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <OrderDetailsCard order={order} />

          <OrderSummary
            items={cartItems}
            subtotal={subtotal}
            tax={tax}
            shipping={shipping}
            total={total}
          />
        </div>

        {/* Action Buttons */}
        <div className='flex gap-4 justify-center mt-8'>
          <Link href={ROUTES.SHOP}>
            <Button
              variant='secondary'
              className='w-full border-2 border-blue-background'
            >
              Continue Shopping
            </Button>
          </Link>
          <Link href={ROUTES.HOME}>
            <Button className='w-full bg-gradient-primary text-white'>
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
export default OrderConfirmationPage;
