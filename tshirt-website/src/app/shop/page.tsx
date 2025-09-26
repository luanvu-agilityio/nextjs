'use client';

import ShopPageContent from '@/components/ShopPageContent';
import { Suspense } from 'react';

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopPageContent />
    </Suspense>
  );
}
