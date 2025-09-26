'use client';
import { useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';

// Components
import { ProductCard } from '@/components/ProductCard';
import {
  Breadcrumbs,
  Button,
  Heading,
  showToast,
  Typography,
} from '@/components';
import ProductCardSkeleton from '@/components/ProductCard/ProductCardSkeleton';
import ProductDetailsSkeleton from '@/components/ProductDetails/ProductDetailsSkeleton';

// Constants
import {
  createToastMessage,
  ROUTES,
  TOAST_DESCRIPTIONS,
  TOAST_MESSAGES,
  TOAST_TITLES,
  TOAST_VARIANTS,
} from '@/constants';

// Hooks
import { useProduct, useProducts } from '@/hooks/useProducts';
import { useCart, useWishlist } from '@/store';
import ProductDetails from '@/components/ProductDetails';
import ProductTab from '@/components/ProductTab/Tab';
import ProductTabInfo from '@/components/ProductTab/TabInfo';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const addItemToCart = useCart(state => state.addItem);
  const addItemToWishlist = useWishlist(state => state.addItem);
  const isInWishlist = useWishlist(state => state.isInWishlist);

  // Fetch product
  const { data: product, isLoading, error } = useProduct(id);

  // Fetch related products
  const { data: relatedResponse, isLoading: isRelatedLoading } = useProducts({
    category: product?.category,
    limit: 8,
  });

  const related = relatedResponse?.data.filter(p => p.id !== id) || [];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<'description' | 'reviews'>('description');

  const resolveDynamicLabel = (seg: string, href: string) => {
    if (href.startsWith('/shop/')) {
      return product?.name;
    }
    return undefined;
  };

  const onCheckout = () => {
    try {
      if (!product) {
        showToast(TOAST_MESSAGES.PRODUCT_NOT_FOUND_CHECKOUT);
        return;
      }

      const color = product.colors?.[selectedColor];
      const size = product.sizes?.[selectedSize];

      addItemToCart(product, { qty: quantity, color, size });

      showToast({
        title: TOAST_TITLES.ADDED_TO_CART,
        description: TOAST_DESCRIPTIONS.CHECKOUT_PROCEEDING,
        variant: TOAST_VARIANTS.SUCCESS,
      });

      router.push(ROUTES.CHECKOUT);
    } catch {
      showToast(TOAST_MESSAGES.CHECKOUT_FAILED);
    }
  };

  const onAddToCart = () => {
    try {
      if (!product) {
        showToast(TOAST_MESSAGES.PRODUCT_NOT_FOUND_CART);
        return;
      }

      if (product.stock && product.stock < quantity) {
        showToast(createToastMessage.insufficientStockGeneric(product.stock));
        return;
      }

      const color = product.colors?.[selectedColor];
      const size = product.sizes?.[selectedSize];

      addItemToCart(product, { qty: quantity, color, size });
      showToast(createToastMessage.addedToCart(product.name));
      router.push(ROUTES.CART);
    } catch {
      showToast({
        title: TOAST_TITLES.UPDATE_FAILED,
        description: TOAST_DESCRIPTIONS.UNABLE_TO_ADD_TO_CART,
        variant: TOAST_VARIANTS.ERROR,
      });
    }
  };

  const onAddToWishlist = () => {
    try {
      if (!product) {
        showToast(TOAST_MESSAGES.PRODUCT_NOT_FOUND_WISHLIST);
        return;
      }

      if (isInWishlist(product.id)) {
        showToast(TOAST_MESSAGES.ALREADY_IN_WISHLIST);
        return;
      }

      addItemToWishlist(product);
      showToast(createToastMessage.addedToWishlist(product.name));
    } catch {
      showToast({
        title: TOAST_TITLES.UPDATE_FAILED,
        description: TOAST_DESCRIPTIONS.UNABLE_TO_ADD_TO_WISHLIST,
        variant: TOAST_VARIANTS.ERROR,
      });
    }
  };

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (error || !product) return notFound();

  return (
    <main className='container mx-auto py-10'>
      <div className='px-30'>
        <Breadcrumbs
          resolveDynamicLabel={resolveDynamicLabel}
          className='mb-4'
          variant='light'
        />
      </div>
      <ProductDetails
        product={product}
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        quantity={quantity}
        setQuantity={setQuantity}
        onCheckout={onCheckout}
        onAddToWishlist={onAddToWishlist}
        onAddToCart={onAddToCart}
        isInWishlist={isInWishlist}
      />

      {/* Tabs */}
      <div className='mt-16 bg-gray-50 rounded-lg px-30 py-8'>
        <ProductTab
          tab={tab}
          setTab={setTab}
          reviewCount={product.reviewCount}
        />

        <ProductTabInfo tab={tab} />
      </div>

      {/* Related Products */}
      <section className='px-30 mt-16'>
        <Heading level={2} className='text-2xl text-center mb-8'>
          Related Products
        </Heading>

        {(() => {
          if (isRelatedLoading) {
            return (
              <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={`skeleton-${i}`} />
                ))}
              </div>
            );
          }

          if (related.length > 0) {
            return (
              <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                {related.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            );
          } else {
            return (
              <div className='col-span-full text-center py-12'>
                <Typography className='text-gray-foreground text-lg'>
                  No related product found.
                </Typography>
              </div>
            );
          }
        })()}

        <div className='mt-8 text-center'>
          <Button variant='primary' onClick={() => router.push(ROUTES.SHOP)}>
            See More
          </Button>
        </div>
      </section>
    </main>
  );
}
