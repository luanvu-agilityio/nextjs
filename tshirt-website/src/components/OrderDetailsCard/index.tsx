// Components
import { Badge, Typography } from '@/components';

// Types
import { Order } from '@/types';

interface OrderDetailsCardProps {
  order: Order;
}

const OrderDetailsCard = ({ order }: OrderDetailsCardProps) => {
  const { id, createdAt, status, shippingInfo } = order;
  return (
    <div className='bg-white rounded-lg shadow-lg p-6'>
      <Typography size='lg' className='font-bold text-gray-800 mb-4'>
        Order Details
      </Typography>
      <div className='space-y-3'>
        <div>
          <Typography className='text-sm text-gray-600'>
            Order Number:
          </Typography>
          <Typography className='font-medium'>{id}</Typography>
        </div>
        <div>
          <Typography className='text-sm text-gray-600'>Order Date:</Typography>
          <Typography className='font-medium'>
            {new Date(createdAt).toLocaleDateString()}
          </Typography>
        </div>
        <div>
          <Typography className='text-sm text-gray-600'>Status:</Typography>
          <Badge
            variant='warning'
            className='inline-block px-2 py-1 text-xs font-semibold text-white rounded-full'
          >
            {status}
          </Badge>
        </div>
      </div>
      <div className='mt-6'>
        <Typography size='lg' className='font-bold text-gray-800 mb-4'>
          Shipping Address
        </Typography>
        <div className='text-sm text-gray-600'>
          <Typography>
            {shippingInfo.firstName} {shippingInfo.lastName}
          </Typography>
          <Typography>{shippingInfo.address}</Typography>
          <Typography>
            {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
          </Typography>
          <Typography>{shippingInfo.country}</Typography>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsCard;
