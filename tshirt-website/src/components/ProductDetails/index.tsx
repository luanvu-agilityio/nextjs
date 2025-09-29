import Image from 'next/image';

// Components
import { IconButton, Button, Typography, Heading } from '@/components';
import StarRating from '@/components/StarRating';
import ColorPicker from '@/components/ColorPicker';
import SizePicker from '@/components/SizePicker';

// Icons
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ShoppingCartIcon from '../icons/ShoppingCartIcon';
import WishlistIcon from '../icons/WishlistIcon';
import ShoppingBagIcon from '../icons/ShoppingBag';

// Types
import { Product } from '@/types';

interface ProductDetailsProps {
  product: Product;
  selectedImageIndex: number;
  setSelectedImageIndex: (fn: (idx: number) => number) => void;
  selectedColor: number;
  setSelectedColor: (idx: number) => void;
  selectedSize: number;
  setSelectedSize: (idx: number) => void;
  quantity: number;
  setQuantity: (fn: (q: number) => number) => void;
  onCheckout: () => void;
  onAddToWishlist: () => void;
  onAddToCart: () => void;
  isInWishlist: (id: string) => boolean;
}

const ProductDetails = ({
  product,
  selectedImageIndex,
  setSelectedImageIndex,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  onCheckout,
  onAddToWishlist,
  onAddToCart,
  isInWishlist,
}: ProductDetailsProps) => (
  <div className='flex flex-row gap-10 px-30'>
    {/* Left - images */}
    <div className='flex gap-6 flex-col mt-10'>
      <div className='relative max-w-[588px] max-h-[604px] bg-white/5 rounded-lg flex items-center justify-center'>
        <div className='absolute left-2 top-1/2 -translate-y-1/2 z-10'>
          <IconButton
            aria-label='prev'
            variant='ghost'
            size='md'
            onClick={() => setSelectedImageIndex(idx => Math.max(0, idx - 1))}
          >
            <ChevronLeft />
          </IconButton>
        </div>
        <div className='relative w-[588px] h-[400px]'>
          <Image
            src={product.thumbnails?.[selectedImageIndex] || product.image}
            alt={product.name}
            fill
            className='object-contain'
            priority
          />
        </div>
        <div className='absolute right-2 top-1/2 -translate-y-1/2 z-10'>
          <IconButton
            aria-label='next'
            variant='ghost'
            size='md'
            onClick={() =>
              setSelectedImageIndex(idx =>
                Math.min((product.thumbnails?.length || 1) - 1, idx + 1)
              )
            }
          >
            <ChevronRight />
          </IconButton>
        </div>
      </div>
      <div className='flex flex-row gap-4 items-center justify-center'>
        {product.thumbnails?.map((t, i) => (
          <button
            key={t + i}
            onClick={() => setSelectedImageIndex(() => i)}
            className={`w-20 h-20 rounded overflow-hidden border ${selectedImageIndex === i ? 'ring-2 ring-purple-400' : 'border-gray-200'}`}
          >
            <Image
              src={t}
              alt={product.name + i}
              width={80}
              height={80}
              className='object-cover w-full h-full'
            />
          </button>
        ))}
      </div>
    </div>
    {/* Right - details */}
    <div className='text-gray-900'>
      <Heading level={1} className='text-3xl font-bold font-secondary mb-2'>
        {product.name}
      </Heading>
      <Typography className='text-gray-foreground text-lg mb-6'>
        {product.description}
      </Typography>
      <div className='flex items-center gap-4 mb-4'>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
      </div>
      <div className='grid grid-cols-2 gap-6 items-center mb-6'>
        <div>
          <Typography className='font-semibold mb-2'>Color</Typography>
          <ColorPicker
            colors={product.colors || []}
            selectedIndex={selectedColor}
            onSelect={setSelectedColor}
            variant='light'
          />
        </div>
        <div className='flex flex-col items-end gap-2'>
          <Typography className='font-semibold'>Stock</Typography>
          <div className='flex items-center gap-3'>
            <div className='text-lg font-medium text-gray-900'>
              ({product.stock ?? 1234})
            </div>
            <div className='text-gray-500'>
              <ShoppingCartIcon />
            </div>
          </div>
        </div>
      </div>
      <div className='mb-6'>
        <Typography className='font-semibold mb-2'>Size</Typography>
        <SizePicker
          sizes={product.sizes || []}
          selectedIndex={selectedSize}
          onSelect={setSelectedSize}
          variant='light'
        />
      </div>
      <div>
        <Typography className='font-semibold mb-2'>Quantity</Typography>
        <div className='flex items-center gap-6 mb-6'>
          <div className='flex items-center gap-3 bg-white border rounded px-3 py-2'>
            <button
              aria-label='decrease'
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className='text-lg'
            >
              −
            </button>
            <div className='w-12 text-center font-medium'>{quantity}</div>
            <button
              aria-label='increase'
              onClick={() => setQuantity(q => q + 1)}
              className='text-lg'
            >
              +
            </button>
          </div>
          <div className='ml-auto text-3xl font-bold'>${product.price} USD</div>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Button variant='primary' onClick={onCheckout} className='w-full'>
          Checkout
        </Button>
        <IconButton
          variant='primary'
          size='xl'
          aria-label='add to wishlist'
          className={`${isInWishlist(product.id) ? 'text-red-500' : 'text-primary'} hover:text-blue-background  text-white`}
          onClick={onAddToWishlist}
        >
          <WishlistIcon
            className='w-8 h-8 border-none'
            fill={isInWishlist(product.id) ? 'currentColor' : 'white'}
          />
        </IconButton>
        <IconButton
          aria-label='add to cart'
          variant='primary'
          size='xl'
          onClick={onAddToCart}
        >
          <ShoppingBagIcon className='w-8 h-8 border-none' fill='white' />
        </IconButton>
      </div>
    </div>
  </div>
);

export default ProductDetails;
