import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

// Utils
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const iconButtonVariants = cva(
  [
    'inline-flex items-center justify-center rounded transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'cursor-pointer',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-primary text-white',
          'hover:opacity-90',
          'focus-visible:ring-purple-foreground',
        ],
        outline: [
          'border border-inactive-foreground text-inactive-foreground',
          'hover:bg-white hover:text-white',
          'focus-visible:ring-gray-foreground',
        ],
        solid: [
          'text-white bg-white/20',
          'hover:bg-white/30',
          'focus-visible:ring-white',
        ],
        destructive: [
          'bg-destructive-background text-white',
          'hover:bg-destructive/90',
          'focus-visible:ring-destructive',
        ],
        ghost: [
          'bg-transparent text-white',
          'hover:bg-white/10',
          'focus-visible:ring-white',
        ],
        disabled: [
          'border border-inactive-foreground text-inactive-foreground',
          'cursor-not-allowed',
          'pointer-events-none',
        ],
      },
      size: {
        xs: 'w-4 h-4 text-xs', // 16x16px
        sm: 'w-6 h-6 text-sm', // 24x24px
        md: 'w-8 h-8 text-base', // 32x32px
        lg: 'w-10 h-10 text-lg', // 40x40px
        xl: 'w-12 h-12 text-xl', // 48x48px
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  children: ReactNode;
  'aria-label': string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { className, variant, size, children, 'aria-label': ariaLabel, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(iconButtonVariants({ variant, size, className }))}
        aria-label={ariaLabel}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export { IconButton, iconButtonVariants, type IconButtonProps };
