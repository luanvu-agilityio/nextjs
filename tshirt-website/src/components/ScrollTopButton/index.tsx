'use client';
import { useEffect, useState } from 'react';

// Icons
import { ArrowUp } from 'lucide-react';

// Utils
import { cn } from '@/lib/utils';

function ScrollTopButton({ className }: Readonly<{ className?: string }>) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      aria-label='Back to top'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed right-6 bottom-6 bg-gradient-primary text-white p-3 rounded-full shadow-lg z-50',
        className
      )}
    >
      <ArrowUp className='size-4' />
    </button>
  );
}
export default ScrollTopButton;
