'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Utils
import { cn } from '@/lib/utils';

interface NavigationItem {
  href: string;
  label: string;
}

interface NavigationProps {
  items: NavigationItem[];
  className?: string;
  isMobile?: boolean;
  onItemClick?: () => void;
}

const Navigation = ({
  items,
  className,
  isMobile = false,
  onItemClick,
}: NavigationProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav
      className={cn(
        'flex',
        isMobile ? 'flex-col space-y-4' : 'items-center gap-8',
        className
      )}
    >
      {items.map(item => (
        <div
          key={item.href}
          className='relative'
          onMouseEnter={() => setHoveredItem(item.href)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Link
            href={item.href}
            className={cn(
              'font-secondary text-lg text-primary transition-all duration-200',
              'hover:text-blue-background hover:font-bold',
              isMobile && 'text-base'
            )}
            onClick={onItemClick}
          >
            {item.label}
          </Link>

          {/* Only render hover indicator on client */}
          {!isMobile && hoveredItem === item.href && isClient && (
            <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2'>
              <div className='w-1 h-1 bg-blue-background rounded-full' />
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

Navigation.displayName = 'Navigation';

export { Navigation, type NavigationItem, type NavigationProps };
