import type { Meta, StoryObj } from '@storybook/nextjs';
import WishlistItemRow from './index';
import WishlistItemRowSkeleton from './WishlistItemRowSkeleton';

const meta: Meta<typeof WishlistItemRow> = {
  title: 'Wishlist/WishlistItemRow',
  component: WishlistItemRow,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof WishlistItemRow>;

const mockProduct = {
  id: '4',
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
    onRemove: id => alert(`Remove product ${id}`),
    onAddToCart: (id, qty) => alert(`Add product ${id} to cart (qty: ${qty})`),
  },
};

export const Skeleton: StoryObj = {
  render: () => <WishlistItemRowSkeleton />,
};
