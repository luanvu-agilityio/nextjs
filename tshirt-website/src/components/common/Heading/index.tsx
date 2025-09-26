import type { JSX } from 'react';

// Utils
import { cn } from '@/lib/utils';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  level: HeadingLevel;
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const Heading = ({
  level,
  children,
  className,
  'aria-label': ariaLabel,
  ...props
}: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={cn(className)} aria-label={ariaLabel} {...props}>
      {children}
    </Tag>
  );
};

Heading.displayName = 'Heading';
export { Heading };
