'use client';

import { useState } from 'react';
import Image from 'next/image';

// Icons
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Components
import { Button, Heading, Typography } from '@/components/common';

// Utils
import { cn } from '@/lib/utils';

// Mocks
import { DRESS_CATEGORIES, FEATURED_IMAGES } from '@/mock';

interface LatestDressSectionProps {
  className?: string;
}

const LatestDressSection = ({ className }: LatestDressSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % FEATURED_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      prev => (prev - 1 + FEATURED_IMAGES.length) % FEATURED_IMAGES.length
    );
  };

  return (
    <section className={cn('px-30 py-20 bg-gradient-primary', className)}>
      <div className='container mx-auto '>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          {/* Left Content */}
          <div className='text-white space-y-8'>
            <Heading
              level={2}
              className='text-5xl font-secondary font-bold leading-tight'
            >
              Get the Latest Dress
              <br />
              Models From Us
            </Heading>

            <Typography className='text-gray text-lg leading-relaxed max-w-lg'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget
              gravida leo, nec iaculis diam. Nam bibendum mi sed sem finibus
              ullamcorper.
            </Typography>

            <Button variant='secondary'>Shop Now</Button>
          </div>

          {/* Right Content */}
          <div className='relative flex justify-center lg:justify-end'>
            <div className='relative'>
              {/* More List Button */}
              <button className='absolute top-2 -left-45 z-20 w-20   text-white text-lg font-bold '>
                More list
              </button>
              {/* Category Cards - Left side */}
              <div className='absolute right-100 top-12  z-10 -translate-x-16'>
                {DRESS_CATEGORIES.map(category => (
                  <div key={category.id} className='w-43 h-67  relative'>
                    <div className='aspect-[3/4] relative  overflow-hidden'>
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <Typography className='absolute bottom-10 left-2 text-white font-bold text-sm'>
                      {category.name}
                    </Typography>
                  </div>
                ))}
              </div>

              {/* Main Featured Image Container */}
              <div className='relative'>
                {/* Main Image Frame - rounded rectangle like iPhone */}
                <div
                  className='relative w-100 h-[522px] bg-white p-2.5 rounded-[6rem] shadow-2xl'
                  style={{ borderBottomLeftRadius: '0' }}
                >
                  <div
                    className='w-full h-full relative rounded-[6rem] overflow-hidden'
                    style={{ borderBottomLeftRadius: '0' }}
                  >
                    <Image
                      src={FEATURED_IMAGES[currentImageIndex]}
                      alt='Featured model'
                      fill
                      className='object-cover'
                    />
                  </div>

                  {/* Thumbnail Navigation  */}
                  <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-10 items-center bg-black/50 backdrop-blur-[4px] '>
                    {/* Navigation Arrows */}
                    <button
                      onClick={prevImage}
                      className='absolute -left-2.5 top-1/2 z-30 -translate-y-1/2 bg-blue-background  text-white  transition-colors cursor-pointer '
                    >
                      <ChevronLeft className='size-5' />
                    </button>

                    <button
                      onClick={nextImage}
                      className='absolute -right-2.5 top-1/2 z-30 -translate-y-1/2 bg-blue-background  text-white  transition-colors cursor-pointer '
                    >
                      <ChevronRight className='size-5' />
                    </button>
                    {FEATURED_IMAGES.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                          ' overflow-hidden transition-all',
                          currentImageIndex === index
                            ? 'border-white w-20 h-20 '
                            : 'border-white/50 opacity-70 w-15 h-15 '
                        )}
                      >
                        <Image
                          src={FEATURED_IMAGES[index]}
                          alt={`Thumbnail ${index + 1}`}
                          width={currentImageIndex === index ? 64 : 56}
                          height={currentImageIndex === index ? 48 : 40}
                          className='object-cover w-full h-full'
                        />
                      </button>
                    ))}
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

LatestDressSection.displayName = 'LatestDressSection';

export { LatestDressSection, type LatestDressSectionProps };
