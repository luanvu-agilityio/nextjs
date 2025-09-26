import Image from 'next/image';

// Utils
import { cn } from '@/lib/utils';

interface BrandLogosSectionProps {
  className?: string;
}

const BRAND_LOGOS = [
  {
    name: 'Bassett',
    logo: '/images/brands/brand-1.svg',
  },
  {
    name: 'Furniture Brands',
    logo: '/images/brands/brand-2.svg',
  },
  {
    name: 'LA-Z-BOY',
    logo: '/images/brands/brand-3.svg',
  },
  {
    name: 'Blackhawk',
    logo: '/images/brands/brand-4.svg',
  },
  {
    name: 'LEVITZ',
    logo: '/images/brands/brand-5.svg',
  },
];

const BrandLogosSection = ({ className }: BrandLogosSectionProps) => {
  return (
    <section className={cn('-mt-20 px-47.5 bg-secondary ', className)}>
      <div className='container mx-auto flex items-center justify-center gap-8 lg:gap-10'>
        {BRAND_LOGOS.map(brand => (
          <div
            key={brand.name}
            className='flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300  hover:opacity-70 cursor-pointer'
          >
            <Image
              src={brand.logo}
              alt={`${brand.name} logo`}
              width={180}
              height={70}
              className='object-contain'
            />
          </div>
        ))}
      </div>
    </section>
  );
};

BrandLogosSection.displayName = 'BrandLogosSection';

export { BrandLogosSection, type BrandLogosSectionProps };
