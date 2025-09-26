import Link from 'next/link';

// Components
import { Badge, Button, Typography } from '@/components';

// Constants
import { ROUTES } from '@/constants/route';

// Types
import { Order } from '@/types';

interface OrderCardProps {
  order: Order;
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'success':
      return 'success';
    case 'pending':
      return 'warning';
    case 'delivered':
      return 'delivered';
    case 'shipped':
      return 'shipped';
    case 'processing':
      return 'processing';
  }
};

const OrderCard = ({ order }: OrderCardProps) => {
  const { id, createdAt, status, total } = order;
  return (
    <div className='border rounded-lg p-4 bg-white shadow-sm'>
      <div className='flex justify-between items-start mb-2'>
        <div>
          <Typography className='font-bold'>Order #{id}</Typography>
          <Typography className='text-sm text-gray-600'>
            {new Date(createdAt).toLocaleDateString()}
          </Typography>
        </div>
        <Badge
          variant={getStatusVariant(status)}
          className='px-2 py-1 text-xs font-semibold text-white'
        >
          {status}
        </Badge>
      </div>
      <div className='flex justify-between items-center'>
        <Typography className='text-lg font-bold'>
          ${total.toFixed(2)}
        </Typography>
        <Link href={`${ROUTES.ORDER_CONFIRMATION}/${id}`}>
          <Button variant='primary' className='w-full'>
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
