import {
  BestSellerSection,
  BrandLogosSection,
  CategoriesStyleSection,
  LatestDressSection,
  LookForModelsSection,
  ProductShowcaseSection,
  TestimonialsSection,
} from '@/components';

export default function Home() {
  return (
    <main className=' flex flex-col  gap-20'>
      <LatestDressSection />
      <BrandLogosSection />
      <CategoriesStyleSection />
      <BestSellerSection />
      <ProductShowcaseSection />
      <TestimonialsSection />
      <LookForModelsSection />
    </main>
  );
}
