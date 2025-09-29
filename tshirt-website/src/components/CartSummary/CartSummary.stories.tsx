import type { Meta, StoryObj } from '@storybook/nextjs';
import CartSummary from './index';
import CartSummarySkeleton from './CartSummarySkeleton';

const meta: Meta<typeof CartSummary> = {
  title: 'Cart/CartSummary',
  component: CartSummary,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CartSummary>;

export const Default: Story = {
  args: {
    subtotal: 99.99,
    itemCount: 3,
    onCheckout: () => alert('Checkout clicked'),
  },
};

export const Skeleton: Story = {
  render: args => <CartSummarySkeleton />,
};
