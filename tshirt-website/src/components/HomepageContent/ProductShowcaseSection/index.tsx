'use client';

import { useState } from 'react';
import Image from 'next/image';

// Icons
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Components
import { Button, Typography } from '@/components/common';
import ColorPicker from '@/components/ColorPicker';
import SizePicker from '@/components/SizePicker';
import StarRating from '@/components/StarRating';

// Utils
import { cn } from '@/lib/utils';

// Constants
import { DEFAULT_COLOR_KEYS, SIZES } from '@/constants';

interface ProductShowcaseSectionProps {
  className?: string;
}

const PRODUCTS = [
  {
    id: 1,
    name: 'The Oblongers T-Shirt',
    price: 50,
    rating: 5,
    reviewCount: '90',
    colors: ['black', 'white', 'green'],
    sizes: ['S', 'M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis, purus eget porttitor varius, elit gravida rhoncus lorem, vel tempor dolor magna id lorem. Proin ut lacus suscipit mauris tempor placerat.',
  },
  {
    id: 2,
    name: 'Classic White Tee',
    price: 45,
    rating: 4,
    reviewCount: '75',
    colors: ['white', 'black', 'gray'],
    sizes: ['S', 'M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=600&fit=crop',
    description:
      'Premium cotton t-shirt with classic fit. Perfect for everyday wear with superior comfort and style.',
  },
  {
    id: 3,
    name: 'Vintage Style Shirt',
    price: 60,
    rating: 5,
    reviewCount: '120',
    colors: ['blue', 'green', 'black'],
    sizes: ['S', 'M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=600&fit=crop',
    description:
      'Retro-inspired design with modern comfort. Made from sustainable materials for the conscious consumer.',
  },
];

const ProductShowcaseSection = ({ className }: ProductShowcaseSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

  const nextProduct = () => {
    setCurrentIndex(prev => (prev + 1) % PRODUCTS.length);
    setSelectedColor(0);
    setSelectedSize(0);
  };

  const prevProduct = () => {
    setCurrentIndex(prev => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
    setSelectedColor(0);
    setSelectedSize(0);
  };

  const currentProduct = PRODUCTS[currentIndex];

  return (
    <section className={cn('px-30 pl-0 py-20 bg-gradient-primary', className)}>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          {/* Left Content - Product Carousel */}
          <div className='relative'>
            {/* Thumbnail Navigation - Left side */}
            <div className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 space-y-4 z-10'>
              {PRODUCTS.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'block w-16 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300',
                    currentIndex === index
                      ? 'border-white shadow-lg scale-110'
                      : 'border-white/30 opacity-60 hover:opacity-80'
                  )}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={64}
                    height={80}
                    className='object-cover w-full h-full'
                  />
                </button>
              ))}
            </div>

            {/* Main Product Display */}
            <div className='relative flex items-center justify-center'>
              {/* Navigation Arrows */}
              <button
                onClick={prevProduct}
                className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all duration-300 z-20'
              >
                <ChevronLeft className='size-6' />
              </button>

              <button
                onClick={nextProduct}
                className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all duration-300 z-20'
              >
                <ChevronRight className='size-6' />
              </button>

              {/* Product Image Container */}
              <div className='relative w-80 h-96'>
                {/* White circular platform */}
                <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-16 bg-white/20 rounded-full blur-sm' />

                {/* Product Image */}
                <div className='relative w-full h-full transition-all duration-500 ease-in-out transform hover:scale-105'>
                  <Image
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    fill
                    className='object-contain drop-shadow-2xl transition-all duration-500'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Details */}
          <div className='text-white space-y-6'>
            <h1 className='text-5xl font-secondary font-bold leading-tight'>
              {currentProduct.name}
            </h1>
            <div className='flex justify-between '>
              {/* Color Selection */}
              <div className='space-y-3'>
                <Typography className='text-white font-bold text-lg'>
                  Color
                </Typography>
                <ColorPicker
                  colors={DEFAULT_COLOR_KEYS.filter(k =>
                    currentProduct.colors.includes(k)
                  )}
                  selectedIndex={selectedColor}
                  onSelect={setSelectedColor}
                  variant='dark'
                />
              </div>

              {/* Rating */}
              <StarRating
                rating={currentProduct.rating}
                reviewCount={currentProduct.reviewCount}
              />
            </div>
            <div className='flex justify-between'>
              {/* Size Selection */}
              <div className='space-y-3'>
                <Typography className='text-white font-bold text-lg'>
                  Size
                </Typography>
                <SizePicker
                  sizes={SIZES.filter(s => currentProduct.sizes.includes(s))}
                  selectedIndex={selectedSize}
                  onSelect={setSelectedSize}
                  variant='dark'
                />
              </div>

              {/* Price */}
              <div className='text-4xl font-bold text-white'>
                {currentProduct.price}$
              </div>
            </div>

            {/* Description */}
            <Typography className='text-gray text-sm leading-relaxed '>
              {currentProduct.description}
            </Typography>

            {/* Order Button */}
            <Button variant='secondary'>Order Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

ProductShowcaseSection.displayName = 'ProductShowcaseSection';

export { ProductShowcaseSection, type ProductShowcaseSectionProps };
