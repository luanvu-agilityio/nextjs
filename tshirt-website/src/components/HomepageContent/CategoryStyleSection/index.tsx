'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Components
import { Heading, Typography } from '@/components/common';

// Utils
import { cn } from '@/lib/utils';

// Mocks
import { CATEGORY_ITEMS } from '@/mock';

interface CategoriesStyleSectionProps {
  className?: string;
}

const CategoriesStyleSection = ({ className }: CategoriesStyleSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % CATEGORY_ITEMS.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      prev => (prev - 1 + CATEGORY_ITEMS.length) % CATEGORY_ITEMS.length
    );
  };

  return (
    <section className={cn('px-30 pr-0 bg-white', className)}>
      <div className=' mx-auto '>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-57.5 items-center'>
          {/* Left Content */}
          <div className='space-y-6'>
            <Typography
              size='lg'
              className='text-blue-600 font-medium uppercase tracking-wide'
            >
              CHOOSE YOUR CATEGORY
            </Typography>

            <Heading
              level={2}
              className='text-5xl font-bold text-gray-900 leading-tight'
            >
              Categories Style
            </Heading>

            <Typography className='text-gray-600 text-lg leading-relaxed max-w-lg'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget
              gravida leo, nec iaculis diam. Nam bibendum mi sed sem finibus
              ullamcorper.
            </Typography>
          </div>

          {/* Right Content */}
          <div className='relative'>
            {/* Main carousel container */}
            <div className='relative flex items-center'>
              {/* Previous Arrow */}
              <button
                onClick={prevSlide}
                className='absolute -left-5 top-1/2 -translate-y-1/2 bg-blue-background text-white p-2  transition-colors z-20 cursor-pointer'
              >
                <ChevronLeft className='size-5' />
              </button>

              {/* Next Arrow  */}
              <button
                onClick={nextSlide}
                className='absolute left-73 top-1/2 -translate-y-1/2 bg-blue-background  text-white p-2  transition-colors z-20 cursor-pointer'
              >
                <ChevronRight className='size-5' />
              </button>

              {/* Carousel content */}
              <div className='flex  gap-4 w-full justify-center items-center'>
                {/* Current large image */}
                <div className='relative w-90 h-57.5'>
                  <div className='aspect-[36/23] relative overflow-hidden '>
                    <Image
                      src={CATEGORY_ITEMS[currentSlide].image}
                      alt={CATEGORY_ITEMS[currentSlide].name}
                      fill
                      className='object-cover'
                    />

                    {/* Category Label */}
                    <div className='absolute top-4 right-4'>
                      <div className='px-4 py-2  bg-blue-background text-white font-semibold text-xs '>
                        {CATEGORY_ITEMS[currentSlide].name}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next smaller image */}
                <div className='relative w-60.5 h-40.5'>
                  <div className='aspect-[36/23] relative overflow-hidden  '>
                    <Image
                      src={
                        CATEGORY_ITEMS[
                          (currentSlide + 1) % CATEGORY_ITEMS.length
                        ].image
                      }
                      alt={
                        CATEGORY_ITEMS[
                          (currentSlide + 1) % CATEGORY_ITEMS.length
                        ].name
                      }
                      fill
                      className='object-cover'
                    />

                    {/* Category Label */}
                    <div className='absolute top-3 right-3'>
                      <div className='px-3 py-1.5 bg-blue-background text-white font-semibold text-xs '>
                        {
                          CATEGORY_ITEMS[
                            (currentSlide + 1) % CATEGORY_ITEMS.length
                          ].name
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

CategoriesStyleSection.displayName = 'CategoriesStyleSection';

export { CategoriesStyleSection, type CategoriesStyleSectionProps };
