'use client';

import Link from 'next/link';

// Icons
import { ChevronRight } from 'lucide-react';

// Hooks
import useBreadcrumbs, { BreadcrumbItem } from '@/hooks/useBreadcrumb';

// Utils
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  labels?: Record<string, string>;
  resolveDynamicLabel?: (segment: string, href: string) => string | undefined;
  showHome?: boolean;
  className?: string;
  variant?: 'dark' | 'light';
}

function Breadcrumbs({
  items,
  labels,
  resolveDynamicLabel,
  showHome = true,
  className,
  variant = 'dark',
}: Readonly<BreadcrumbsProps>) {
  const crumbs = useBreadcrumbs({
    items,
    labels,
    resolveDynamicLabel,
    showHome,
  });

  // class tokens based on variant
  const linkBase =
    variant === 'dark'
      ? 'text-white/80 hover:text-white'
      : 'text-primary/80 hover:text-primary';
  const currentBase =
    variant === 'dark' ? 'text-white font-bold' : 'text-primary font-bold';

  return (
    <nav
      className={cn('flex items-center gap-2 text-sm', className ?? '')}
      aria-label='Breadcrumb'
    >
      {crumbs.map((item, idx) => {
        const isLast = idx === crumbs.length - 1;

        const renderBreadcrumbItem = () => {
          if (isLast) {
            return (
              <span className={cn(currentBase)} aria-current='page'>
                {item.label}
              </span>
            );
          }

          if (item.href) {
            return (
              <Link
                href={item.href}
                className={cn(linkBase, 'transition-colors')}
              >
                {item.label}
              </Link>
            );
          }

          return <span className={cn(linkBase)}>{item.label}</span>;
        };

        return (
          <span
            key={item.href ?? item.label}
            className='flex items-center gap-2'
          >
            {renderBreadcrumbItem()}
            {!isLast && (
              <ChevronRight
                className={cn(
                  'size-4',
                  variant === 'dark' ? 'text-white/60' : 'text-gray-400'
                )}
              />
            )}
          </span>
        );
      })}
    </nav>
  );
}
export { Breadcrumbs };
