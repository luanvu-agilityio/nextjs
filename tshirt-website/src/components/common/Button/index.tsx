import { forwardRef } from 'react';

// Utils
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-primary font-bold text-lg leading-none tracking-normal',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
    'px-8 py-2.5 h-12',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-primary text-white',
          'hover:opacity-90',
          'focus-visible:ring-purple-foreground',
        ],
        secondary: [
          'bg-white text-purple-background shadow-primary',
          'hover:bg-purple-background hover:text-white',
          'focus-visible:ring-purple-background',
        ],
        tertiary: [
          'bg-white text-primary font-normal text-lg',
          'hover:bg-purple-background hover:text-white',
          'focus-visible:ring-purple-background',
        ],
      },
      size: {
        small: 'w-44',
        large: 'w-[32rem]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'small',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants, type ButtonProps };
