import Image from 'next/image';

// Components
import { Typography } from '../common';

// Types
import { CartEntry } from '@/types';

// Utils
import { cn } from '@/lib/utils';

interface OrderSummaryProps {
  items: CartEntry[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  className?: string;
}

function OrderSummary({
  items,
  subtotal,
  tax,
  shipping,
  total,
  className,
}: Readonly<OrderSummaryProps>) {
  return (
    <div className={cn('bg-white rounded-lg shadow-lg p-6', className)}>
      <Typography size='lg' className='font-bold text-gray-800 mb-6'>
        Order Summary
      </Typography>

      {/* Items List */}
      <div className='space-y-4 mb-6'>
        {items.map(item => (
          <div
            key={item.id}
            className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'
          >
            <div className='w-16 h-16 flex-shrink-0 overflow-hidden rounded-md'>
              <Image
                src={item.product.image}
                alt={item.product.name}
                width={64}
                height={64}
                className='object-cover w-full h-full'
              />
            </div>
            <div className='flex-1 min-w-0'>
              <Typography className='font-medium text-sm truncate'>
                {item.product.name}
              </Typography>
              <Typography className='text-xs text-gray-500'>
                Qty: {item.qty}
              </Typography>
              {item.note && (
                <Typography className='text-xs text-blue-600 italic'>
                  Note: {item.note}
                </Typography>
              )}
            </div>
            <Typography className='font-medium text-sm'>
              ${(item.product.price * item.qty).toFixed(2)}
            </Typography>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className='border-t pt-4 space-y-2'>
        <div className='flex justify-between'>
          <Typography className='text-gray-600'>Subtotal:</Typography>
          <Typography className='font-medium'>
            ${subtotal.toFixed(2)}
          </Typography>
        </div>
        <div className='flex justify-between'>
          <Typography className='text-gray-600'>Tax:</Typography>
          <Typography className='font-medium'>${tax.toFixed(2)}</Typography>
        </div>
        <div className='flex justify-between'>
          <Typography className='text-gray-600'>Shipping:</Typography>
          <Typography className='font-medium'>
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </Typography>
        </div>
        <div className='border-t pt-2 mt-4'>
          <div className='flex justify-between'>
            <Typography className='text-lg font-bold'>Total:</Typography>
            <Typography className='text-lg font-bold text-purple-600'>
              ${total.toFixed(2)}
            </Typography>
          </div>
        </div>
      </div>

      {/* Free Shipping Notice */}
      {shipping > 0 && subtotal < 100 && (
        <div className='mt-4 p-3 bg-blue-50 rounded-lg'>
          <Typography className='text-sm text-blue-600'>
            Add ${(100 - subtotal).toFixed(2)} more for free shipping!
          </Typography>
        </div>
      )}
    </div>
  );
}

export default OrderSummary;
