interface Product {
  id: string;
  name: string;
  category?: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: string;
  quality: string;
  colors: string[];
  sizes: string[];
  thumbnails: string[];
  description: string;
  stock?: number;
}
export type { Product };
