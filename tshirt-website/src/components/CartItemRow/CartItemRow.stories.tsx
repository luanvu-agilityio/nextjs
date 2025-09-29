import type { Meta, StoryObj } from '@storybook/nextjs';
import CartItemRow from './index';
import CartItemRowSkeleton from './CartItemRowSkeleton';

const meta: Meta<typeof CartItemRow> = {
  title: 'Cart/CartItemRow',
  component: CartItemRow,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CartItemRow>;

const mockProduct = {
  id: '1',
  name: 'Cool T-Shirt',
  image: 'https://via.placeholder.com/80',
  price: 25,
  stock: 10,
  colors: ['Blue', 'Red'],
  rating: 4.5,
  reviewCount: '120',
  quality: 'Premium',
  sizes: ['S', 'M', 'L', 'XL'],
  thumbnails: ['https://via.placeholder.com/80'],
  description: 'A cool t-shirt for everyday wear.',
  category: 'Apparel',
};

export const Default: Story = {
  args: {
    product: mockProduct,
    initialQuantity: 2,
    initialNote: 'Gift wrap please',
    onRemove: id => alert(`Remove product ${id}`),
    onSaveNote: (id, note) => alert(`Save note for ${id}: ${note}`),
  },
};

export const Skeleton: Story = {
  render: args => <CartItemRowSkeleton />,
};
