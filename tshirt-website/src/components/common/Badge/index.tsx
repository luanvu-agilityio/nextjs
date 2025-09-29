import { cva, type VariantProps } from 'class-variance-authority';

// Utils
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full text-white',
  {
    variants: {
      variant: {
        success: 'bg-success',
        warning: 'bg-warning',
        destructive: 'bg-destructive-background',
        info: 'bg-blue-background',
        delivered: 'bg-green-100 text-green-800',
        shipped: 'bg-blue-100 text-blue-800',
        processing: 'bg-yellow-100 text-yellow-800',
      },
      size: {
        small: 'w-4 h-4 text-xs',
        medium: 'w-5 h-5 text-xs',
        large: 'w-6 h-6 text-sm',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  count?: number;
}

const Badge = ({
  className,
  variant,
  size,
  count,
  children,
  ...props
}: BadgeProps) => {
  const displayValue = count ?? children;

  if (typeof count === 'number' && count < 1) return null;
  if (!displayValue && displayValue !== 0) return null;

  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {displayValue}
    </span>
  );
};

Badge.displayName = 'Badge';

export { Badge, badgeVariants, type BadgeProps };
