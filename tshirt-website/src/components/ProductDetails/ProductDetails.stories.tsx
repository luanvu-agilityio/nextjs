import type { Meta, StoryObj } from '@storybook/nextjs';
import ProductDetails from './index';
import ProductDetailsSkeleton from './ProductDetailsSkeleton';

const meta: Meta<typeof ProductDetails> = {
  title: 'Product/ProductDetails',
  component: ProductDetails,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProductDetails>;

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
    selectedImageIndex: 0,
    setSelectedImageIndex: () => {},
    selectedColor: 0,
    setSelectedColor: () => {},
    selectedSize: 0,
    setSelectedSize: () => {},
    quantity: 1,
    setQuantity: () => {},
    onCheckout: () => alert('Checkout clicked'),
    onAddToWishlist: () => alert('Added to wishlist'),
    onAddToCart: () => alert('Added to cart'),
    isInWishlist: () => false,
  },
};

export const Skeleton: StoryObj = {
  render: () => <ProductDetailsSkeleton />,
};
