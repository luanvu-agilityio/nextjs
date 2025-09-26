'use client';
import Image from 'next/image';

// Components
import { Button, Heading, Typography } from '@/components/common';

// Utils
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

// Constants
import { ROUTES } from '@/constants';

interface LookForModelsSectionProps {
  className?: string;
}

const LookForModelsSection = ({ className }: LookForModelsSectionProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.LOGIN);
  };
  return (
    <section className={cn(' px-30 bg-white pb-20', className)}>
      <div className='container mx-auto px-4'>
        <div className='flex flex-row gap-24 items-center'>
          {/* Left Content */}
          <div className='space-y-6'>
            <Heading
              level={2}
              className='text-4xl font-secondary font-bold text-gray-900 leading-tight'
            >
              Look For Models Now
            </Heading>

            <Typography className='text-gray-background text-lg leading-relaxed '>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget
              gravida leo, nec iaculis diam. Nam bibendum mi sed sem finibus
              ullamcorper.
            </Typography>

            <Button variant='primary' onClick={handleClick}>
              Login Now
            </Button>
          </div>

          {/* Right Content - Clothing Rack Image */}
          <div className='relative '>
            <div className='relative w-147 h-87'>
              <Image
                src='https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=500&fit=crop'
                alt='Clothing rack with colorful garments'
                fill
                className='object-cover '
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

LookForModelsSection.displayName = 'LookForModelsSection';

export { LookForModelsSection, type LookForModelsSectionProps };
