import type { Meta, StoryObj } from '@storybook/nextjs';
import OrderCard from './index';
import OrderCardSkeleton from './OrderCardSkeleton';
import { OrderStatus } from '@/types';

const meta: Meta<typeof OrderCard> = {
  title: 'Order/OrderCard',
  component: OrderCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof OrderCard>;

const mockOrder = {
  id: '123456',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  status: 'pending' as OrderStatus,
  total: 59.99,
  items: [
    {
      id: 'item1',
      name: 'T-Shirt',
      quantity: 2,
      price: 29.99,
      productId: 'prod_001',
      productName: 'T-Shirt',
      productImage: 'https://example.com/tshirt.jpg',
    },
  ],
  shippingInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main St',
    city: 'Sample City',
    postalCode: '12345',
    country: 'Sample Country',
    state: 'Sample State',
    zipCode: '12345',
  },
  shipping: 0.0,
  paymentInfo: {
    method: 'Credit Card',
    transactionId: 'txn_7890',
    cardNumber: '4111 1111 1111 1111',
    expiryDate: '12/26',
    cvv: '123',
    cardholderName: 'John Doe',
  },
  subtotal: 59.98,
  tax: 0.01,
  shippingCost: 0.0,
};

export const Default: Story = {
  args: {
    order: mockOrder,
  },
};

export const Skeleton: Story = {
  render: () => <OrderCardSkeleton />,
};
