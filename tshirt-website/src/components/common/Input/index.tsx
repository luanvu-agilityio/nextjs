'use client';
import { forwardRef, useEffect, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Components
import { Typography } from '../Typography';

// Icons
import { Eye, EyeOff, Search } from 'lucide-react';

// Utils
import { cn } from '@/lib/utils';

const inputVariants = cva(
  [
    'w-full transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-purple-foreground',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'placeholder:text-gray-foreground',
  ],
  {
    variants: {
      variant: {
        default: [
          'border border-gray bg-white text-primary',
          'focus:border-purple-foreground',
        ],
        filled: [
          'bg-secondary border border-transparent text-primary',
          'focus:bg-white focus:border-purple-foreground',
        ],
        gradient: [
          'bg-gradient-to-r from-purple-foreground/10 to-purple-background/10',
          'border border-transparent text-white placeholder:text-white/70',
          'focus:bg-white focus:text-primary focus:placeholder:text-gray-foreground',
        ],
      },
      size: {
        small: 'rounded-[10px] px-4 py-3 text-sm',
        regular: 'rounded-none px-6 py-[9px] text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'regular',
    },
  }
);

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  showIcon?: boolean;
  iconType?: 'password' | 'search';
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      label,
      showIcon = false,
      iconType = 'search',
      error,
      type,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Ensure hydration consistency
    useEffect(() => {
      setIsClient(true);
    }, []);

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    const getInputType = () => {
      if (iconType === 'password') {
        return showPassword ? 'text' : 'password';
      }
      return type;
    };

    // Use explicit placeholder or default to empty string for consistency
    const inputPlaceholder = placeholder || '';

    // Replace dynamic function with static class computation
    const labelClasses = cn(
      'block font-bold mb-2 text-white',
      size === 'small' ? 'text-sm ' : 'text-base '
    );

    const renderIcon = () => {
      if (!showIcon || !isClient) return null;

      if (iconType === 'password') {
        return (
          <button
            type='button'
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-foreground hover:text-primary'
            onClick={handleTogglePassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className='size-5' />
            ) : (
              <Eye className='size-5' />
            )}
          </button>
        );
      }

      if (iconType === 'search') {
        return (
          <div className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-foreground'>
            <Search className='size-5' />
          </div>
        );
      }

      return null;
    };

    return (
      <div className={cn('w-full', className)}>
        {label && (
          <label className={cn(labelClasses, className)}>{label}</label>
        )}
        <div className='relative'>
          <input
            type={getInputType()}
            className={cn(
              inputVariants({ variant, size }),
              showIcon && 'pr-12',
              error &&
                'border-destructive-background focus:ring-destructive-background',
              className
            )}
            placeholder={inputPlaceholder}
            ref={ref}
            {...props}
          />
          {renderIcon()}
        </div>
        {error && (
          <Typography className='mt-1 text-sm text-destructive-background'>
            {error}
          </Typography>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants, type InputProps };
