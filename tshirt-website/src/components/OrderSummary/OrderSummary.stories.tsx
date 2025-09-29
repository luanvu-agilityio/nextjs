import type { Meta, StoryObj } from '@storybook/nextjs';
import OrderSummary from './index';
import OrderSummarySkeleton from './OrderSummarySkeleton';

const meta: Meta<typeof OrderSummary> = {
  title: 'Order/OrderSummary',
  component: OrderSummary,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof OrderSummary>;

const mockItems = [
  {
    id: '1',
    product: {
      id: 'prod-1',
      name: 'Cool T-Shirt',
      image: 'https://via.placeholder.com/64',
      price: 25,
      rating: 4.5,
      reviewCount: '120',
      quality: 'High',
      description: 'A cool t-shirt for everyday wear.',
      category: 'T-Shirts',
      stock: 50,
      colors: ['Black', 'White'],
      sizes: ['S', 'M', 'L', 'XL'],
      thumbnails: [
        'https://via.placeholder.com/32',
        'https://via.placeholder.com/32?text=alt',
      ],
    },
    qty: 2,
    note: 'Gift wrap please',
    category: 'Hoodies',
    stock: 30,
  },
];

export const Default: Story = {
  args: {
    items: mockItems,
    subtotal: 90,
    tax: 5,
    shipping: 10,
    total: 105,
  },
};

export const Skeleton: Story = {
  render: () => <OrderSummarySkeleton />,
};
