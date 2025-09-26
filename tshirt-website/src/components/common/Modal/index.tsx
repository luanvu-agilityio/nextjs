'use client';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@radix-ui/react-dialog';

// Utils
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  open,
  onOpenChange,
  title,
  children,
  className,
}: Readonly<ModalProps>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'absolute right- mt-2 bg-white rounded-lg shadow-primary p-8 z-50',
          className
        )}
        style={{ minWidth: 220 }}
      >
        <DialogTitle
          className={cn(title ? 'text-xl font-bold mb-4' : 'sr-only')}
        >
          {title ?? 'Dialog'}
        </DialogTitle>

        {children}
        <DialogClose asChild>
          <button className='absolute top-4 right-4 text-gray-foreground'>
            ✕
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
