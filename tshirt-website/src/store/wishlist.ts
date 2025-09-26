import { create } from 'zustand';
import type { Product } from '@/types';
import { persist } from 'zustand/middleware';

type WishlistItem = {
  product: Product;
};

type WishlistState = {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (id: string) => boolean;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: product =>
        set(state => {
          if (state.items.find(i => i.product.id === product.id)) return state;
          return { items: [...state.items, { product }] };
        }),
      removeItem: id =>
        set(state => ({ items: state.items.filter(i => i.product.id !== id) })),
      toggleItem: product =>
        set(state => {
          const exists = state.items.find(i => i.product.id === product.id);
          return exists
            ? { items: state.items.filter(i => i.product.id !== product.id) }
            : { items: [...state.items, { product }] };
        }),
      isInWishlist: id => get().items.some(i => i.product.id === id),
    }),
    { name: 'app-wishlist' }
  )
);
