// Components
import { Button, Typography } from '../common';

// Utils
import { cn } from '@/lib/utils';

interface CartSummaryProps {
  subtotal: number;
  itemCount: number;
  className?: string;
  onCheckout?: () => void;
}

function CartSummary({
  subtotal,
  itemCount,
  className,
  onCheckout,
}: Readonly<CartSummaryProps>) {
  return (
    <aside className={cn('bg-secondary p-6 ', className)}>
      <div className='flex flex-col mb-4'>
        <Typography className='font-bold text-lg'>Coupon Code</Typography>
        <input
          className='w-full bg-white px-3 py-2 mt-2'
          placeholder='Enter code'
        />
        <div className='mt-3 mb-9 flex justify-end'>
          <Button variant='primary'>Check</Button>
        </div>
        <div className='flex justify-between'>
          <Typography className='text-lg text-primary font-bold'>
            Subtotal
          </Typography>
          <Typography className='text-lg text-primary'>
            ${subtotal.toFixed(2)} USD
          </Typography>
        </div>
        <Typography className='text-lg text-gray-foreground'>
          {itemCount} Product
        </Typography>
      </div>

      <div className='border-t pt-4 mt-4'>
        <div className='mt-6'>
          <div className='flex justify-between'>
            <Typography className='text-lg text-primary font-bold'>
              Total
            </Typography>
            <Typography className='text-lg text-primary'>
              ${subtotal.toFixed(2)} USD
            </Typography>
          </div>
          <div className='mt-6 flex justify-end'>
            <Button variant='primary' onClick={onCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
export default CartSummary;
