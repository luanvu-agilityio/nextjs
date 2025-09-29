'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

// Components
import {
  Breadcrumbs,
  Button,
  ErrorMessage,
  Heading,
  Typography,
} from '@/components';
import OrderCard from '@/components/OrderCard';

// Constants
import { ROUTES } from '@/constants/route';

// Hooks
import { useUserOrders } from '@/hooks/useOrder';

// Types
import { Order } from '@/types';
import OrderCardSkeleton from '@/components/OrderCard/OrderCardSkeleton';

function OrderHistory() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const { data: orders, isLoading, error } = useUserOrders(userId);

  if (error) {
    return <ErrorMessage customMessage='Failed to load orders.' />;
  }

  if (!isLoading && orders && orders.length === 0) {
    return (
      <div className='text-center py-8'>
        <Typography className='text-gray-500 mb-4'>
          You haven&apos;t placed any orders yet.
        </Typography>
        <Link href={ROUTES.SHOP}>
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <main>
      <section className='bg-gradient-primary px-30 py-10'>
        <div className='container  flex flex-col gap-9.5 items-start justify-start w-127'>
          <Breadcrumbs
            items={[
              { label: 'Home', href: ROUTES.HOME },
              { label: 'My Account' },
            ]}
            variant='dark'
          />
          <Heading
            level={2}
            className='text-4xl text-white font-secondary font-bold'
          >
            My Account
          </Heading>

          <Typography className='text-white text-lg leading-relaxed '>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget
            gravida leo, nec iaculis diam. Nam bibendum mi sed sem finibus
            ullamcorper.
          </Typography>
        </div>
      </section>

      <div className='container mx-auto px-30 py-12'>
        <Heading level={3} className='text-3xl mb-6 font-bold'>
          Order History
        </Heading>
        {isLoading || status === 'loading' ? (
          <div className='animate-pulse space-y-4'>
            {[...Array(3)].map((_, idx) => (
              <OrderCardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          orders?.map((order: Order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </main>
  );
}
export default OrderHistory;
