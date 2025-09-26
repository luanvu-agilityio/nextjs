'use client';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

// Mock data
import { PRODUCTS } from '@/mock';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface UseBreadcrumbsOptions {
  items?: BreadcrumbItem[];
  labels?: Record<string, string>;
  resolveDynamicLabel?: (segment: string, href: string) => string | undefined;
  showHome?: boolean;
}

function formatSegment(segment: string) {
  try {
    const decoded = decodeURIComponent(segment.replace(/[-_]/g, ' '));
    return decoded
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  } catch {
    return segment;
  }
}

/**
 * Generate breadcrumb items for a pathname.
 * Resolves dynamic product id -> product.name using PRODUCTS mock.
 */
export async function generateBreadcrumbsForPath(
  pathname: string,
  params?: Record<string, string | undefined>
): Promise<BreadcrumbItem[]> {
  const segments = pathname.split('/').filter(Boolean);
  const crumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

  let acc = '';
  const map: Record<string, string> = {
    product: 'Shop',
    products: 'Shop',
    'account-details': 'My Account',
    shop: 'Shop',
  };

  for (const seg of segments) {
    acc += `/${seg}`;
    let label = map[seg] ?? formatSegment(seg);

    // resolve dynamic product id -> product name
    if (pathname.startsWith('/product/') && params?.id && seg === params.id) {
      const p = PRODUCTS.find(x => x.id === seg);
      if (p) label = p.name;
    }

    crumbs.push({ label, href: acc });
  }

  return crumbs;
}

export default function useBreadcrumbs({
  items,
  labels = {},
  resolveDynamicLabel,
  showHome = true,
}: UseBreadcrumbsOptions = {}) {
  const pathname = usePathname() ?? '/';

  return useMemo<BreadcrumbItem[]>(() => {
    if (items && items.length > 0) return items;

    const segments = pathname.split('/').filter(Boolean);
    const crumbs: BreadcrumbItem[] = [];

    if (showHome) crumbs.push({ label: 'Home', href: '/' });

    let acc = '';
    for (const seg of segments) {
      acc += `/${seg}`;
      const explicit = labels[seg];
      const dynamicLabel = resolveDynamicLabel
        ? resolveDynamicLabel(seg, acc)
        : undefined;
      const label = explicit ?? dynamicLabel ?? formatSegment(seg);
      crumbs.push({ label, href: acc });
    }

    return crumbs;
  }, [items, pathname, showHome, labels, resolveDynamicLabel]);
}
