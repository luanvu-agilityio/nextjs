import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProductCard } from './index';
import ProductCardSkeleton from './ProductCardSkeleton';

const meta: Meta<typeof ProductCard> = {
  title: 'Product/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

const mockProduct = {
  id: '7',
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
  },
};

export const Skeleton: StoryObj = {
  render: () => <ProductCardSkeleton />,
};
