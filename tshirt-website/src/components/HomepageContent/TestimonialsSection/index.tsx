'use client';

import { useState } from 'react';
import Image from 'next/image';

// Components
import { Heading, Typography } from '@/components/common';
import StarRating from '@/components/StarRating';

// Utils
import { cn } from '@/lib/utils';

// Mock
import { TESTIMONIALS } from '@/mock';

interface TestimonialsSectionProps {
  className?: string;
}

const TestimonialsSection = ({ className }: TestimonialsSectionProps) => {
  const [currentIndex] = useState(0);

  const visibleTestimonials = [
    TESTIMONIALS[currentIndex],
    TESTIMONIALS[(currentIndex + 1) % TESTIMONIALS.length],
  ];

  return (
    <section className={cn('px-30 bg-white', className)}>
      <div className='container mx-auto '>
        {/* Section Title */}
        <div className='text-center mb-12'>
          <Heading level={2} className='text-4xl font-bold text-gray-900 mb-4'>
            Testimonials
          </Heading>
        </div>

        {/* Testimonials Grid */}
        <div className='relative max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {visibleTestimonials.map((testimonial, _index) => (
              <div
                key={testimonial.id}
                className='bg-gray-50 p-8 shadow-tertiary hover:shadow-md transition-shadow duration-300'
              >
                {/* User Info */}
                <div className='flex items-center gap-4 mb-6'>
                  <div className='relative w-12 h-12 rounded-full overflow-hidden'>
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div>
                    <Typography className='font-semibold text-primary'>
                      {testimonial.name}
                    </Typography>
                    <Typography size='sm' className='text-gray-foreground'>
                      {testimonial.role}
                    </Typography>
                  </div>
                </div>

                {/* Star Rating */}
                <div className='mb-4'>
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Review Text */}
                <Typography className='text-gray-background leading-relaxed '>
                  {testimonial.review}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

TestimonialsSection.displayName = 'TestimonialsSection';

export { TestimonialsSection, type TestimonialsSectionProps };
