import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
import type { Product } from '@/types';
import { CartEntry } from '@/types/cart';

type CartState = {
  items: CartEntry[];
  addItem: (
    product: Product,
    opts?: { qty?: number; color?: string; size?: string }
  ) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: () => number;
  itemCount: () => number;
  saveNote: (id: string, note: string) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, opts = {}) => {
        const { qty = 1, color, size } = opts;
        set(state => {
          // consider same product + same options as same line
          const existingIndex = state.items.findIndex(
            i => i.id === product.id && i.color === color && i.size === size
          );
          if (existingIndex > -1) {
            const items = [...state.items];
            items[existingIndex] = {
              ...items[existingIndex],
              qty: items[existingIndex].qty + qty,
            };
            return { items };
          }
          const entry: CartEntry = {
            id: product.id,
            product,
            qty,
            color,
            size,
          };
          return { items: [...state.items, entry] };
        });
      },
      removeItem: id =>
        set(state => ({ items: state.items.filter(i => i.id !== id) })),
      updateQty: (id, qty) =>
        set(state => ({
          items: state.items.map(i =>
            i.id === id ? { ...i, qty: Math.max(1, qty) } : i
          ),
        })),
      clear: () => set({ items: [] }),
      subtotal: () =>
        get().items.reduce((s, it) => s + it.product.price * it.qty, 0),
      itemCount: () => get().items.reduce((s, it) => s + it.qty, 0),
      saveNote: (id, note) =>
        set(state => ({
          items: state.items.map(i => (i.id === id ? { ...i, note } : i)),
        })),
    }),
    { name: 'app-cart' }
  )
);
