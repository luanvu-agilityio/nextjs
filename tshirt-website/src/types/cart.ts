import { Product } from './product';

export interface CartEntry {
  id: string;
  product: Product;
  qty: number;
  color?: string;
  size?: string;
  note?: string;
}
