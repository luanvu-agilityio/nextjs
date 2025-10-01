import { Heading, Typography } from '@/components';
import ProductCardSkeleton from '@/components/ProductCard/ProductCardSkeleton';

function Loading() {
  return (
    <main>
      <section className='bg-gradient-primary px-30 py-10'>
        <div className='container flex flex-col gap-9.5 items-start justify-start w-127'>
          <Heading
            level={2}
            className='text-4xl text-white font-secondary font-bold'
          >
            Shop
          </Heading>
          <Typography className='text-white text-lg leading-relaxed'>
            Loading products...
          </Typography>
        </div>
      </section>
      <div className='container mx-auto px-30 py-8'>
        <div className='mb-6 flex items-center justify-between'>
          <Heading level={3} className='text-2xl font-bold'>
            Our Best Seller Product
          </Heading>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
export default Loading;
