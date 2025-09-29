'use client';
import React, { useState } from 'react';
import Image from 'next/image';

// Icons
import TrashIcon from '../icons/TrashIcon';

// Components
import { Button, IconButton, Typography } from '../common';

// Utils
import { cn } from '@/lib/utils';

// Types
import { Product } from '@/types';

interface CartItemRowProps {
  product: Product;
  initialQuantity?: number;
  onRemove?: (id: string) => void;
  onAddToCart?: (id: string, qty: number) => void;
  className?: string;
  initialNote?: string;
  onSaveNote?: (id: string, note: string) => void;
}

function CartItemRow({
  product,
  initialQuantity = 1,
  onRemove,
  initialNote = '',
  className,
  onSaveNote,
}: Readonly<CartItemRowProps>) {
  const [qty, setQty] = useState(initialQuantity);
  const [note, setNote] = useState(initialNote);
  const [notesOpen, setNotesOpen] = useState(false);

  const inc = () => setQty(q => q + 1);
  const dec = () => setQty(q => Math.max(1, q - 1));
  const handleRemove = () => onRemove?.(product.id);
  const handleSaveNote = () => onSaveNote?.(product.id, note);
  return (
    <div
      className={cn(
        'bg-secondary p-10 flex flex-col items-center gap-12.5 mb-6',
        className
      )}
    >
      <div className='w-full flex items-center justify-between gap-20'>
        <div className='flex items-center justify-between gap-10'>
          <div className='w-20 h-20 flex-shrink-0  overflow-hidden bg-gray-50'>
            <Image
              src={product.image}
              alt={product.name}
              width={80}
              height={80}
              className='object-cover'
            />
          </div>
          <div>
            <Typography className='font-bold'>{product.name}</Typography>
            <Typography className='text-sm text-gray-500'>
              Color : {product.colors?.[0] ?? '—'}
            </Typography>
          </div>
        </div>

        <div className='text-right'>
          <Typography className='font-bold'>{product.price}$ USD</Typography>
          <Typography className='text-sm text-gray-500'>Price</Typography>
        </div>

        <div className='text-center'>
          <Typography className='font-bold'>{product.stock ?? '—'}</Typography>
          <Typography className='text-sm text-gray-500'>In Stock</Typography>
        </div>
        <IconButton
          variant='outline'
          size='sm'
          onClick={handleRemove}
          aria-label='remove'
          className='border-none'
        >
          <TrashIcon />
        </IconButton>
      </div>

      <div className='w-full  flex items-center justify-between'>
        <div className='mt-4'>
          <details
            open={notesOpen}
            onToggle={e => setNotesOpen((e.target as HTMLDetailsElement).open)}
            className='group'
          >
            <summary className='cursor-pointer select-none inline-flex items-center gap-2 text-sm text-blue-background font-bold'>
              <span className='mr-2'>product notes</span>
              <svg
                className={cn(
                  'transition-transform',
                  notesOpen && 'rotate-180'
                )}
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='M6 9l6 6 6-6'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </summary>

            <div className='mt-3'>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder='Add a note for this product...'
                className='w-full border rounded px-3 py-2 min-h-[80px]'
              />
              <div className='mt-2 flex items-center gap-2'>
                <Button
                  variant='secondary'
                  onClick={() => {
                    setNote('');
                    onSaveNote?.(product.id, '');
                  }}
                >
                  Clear
                </Button>
                <Button variant='primary' onClick={handleSaveNote}>
                  Save note
                </Button>
              </div>
            </div>
          </details>
        </div>

        <div className='flex items-center gap-2 bg-white px-3 py-1'>
          <button onClick={dec} aria-label='decrease' className='text-lg'>
            −
          </button>
          <div className='w-10 text-center'>{qty}</div>
          <button onClick={inc} aria-label='increase' className='text-lg'>
            +
          </button>
        </div>
      </div>
    </div>
  );
}
export default CartItemRow;
