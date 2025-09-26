import { Product } from '@/types';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Smart T-Shirt',
    category: 'T-Shirt',
    price: 40,
    rating: 4.9,
    reviewCount: '1k',
    quality: 'Premium',
    colors: ['white', 'black', 'green'],
    sizes: ['S', 'M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520975915469-c14d7efb0c79?w=400&q=80&auto=format&fit=crop',
    ],
    description:
      'Premium cotton t-shirt with classic fit. Perfect for everyday wear with superior comfort and style.',
  },
  {
    id: '2',
    name: 'Classic White Tee',
    category: 'T-Shirt',
    price: 35,
    rating: 4.7,
    reviewCount: '850',
    quality: 'Best quality',
    colors: ['white', 'gray', 'black'],
    sizes: ['S', 'M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=1200&q=80&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520975915469-c14d7efb0c79?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520975915469-c14d7efb0c79?w=400&q=80&auto=format&fit=crop',
    ],
    description:
      'A clean, minimalist white tee made from ring-spun cotton — breathable and durable for everyday use.',
  },
  {
    id: '3',
    name: 'Vintage Style Shirt',
    category: 'T-Shirt',
    price: 60,
    rating: 4.8,
    reviewCount: '1.2k',
    quality: 'Premium',
    colors: ['blue', 'black', 'green'],
    sizes: ['M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1520975915469-c14d7efb0c79?w=1200&q=80&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1520975915469-c14d7efb0c79?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80&auto=format&fit=crop',
    ],
    description:
      'Retro-inspired design with modern comfort. Soft hand-feel and a relaxed fit for a timeless look.',
  },
  {
    id: '4',
    name: 'Athletic Performance Tee',
    category: 'T-Shirt',
    price: 48,
    rating: 4.6,
    reviewCount: '420',
    quality: 'Performance',
    colors: ['black', 'blue'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image:
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&q=80&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&q=80&auto=format&fit=crop',
    ],
    description:
      'Moisture-wicking performance tee designed for training and active days. Lightweight and quick-dry.',
  },
  {
    id: '5',
    name: 'Eco Cotton Tee',
    category: 'T-Shirt',
    price: 52,
    rating: 4.9,
    reviewCount: '2k',
    quality: 'Organic',
    colors: ['white', 'green', 'purple'],
    sizes: ['S', 'M', 'L'],
    image:
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=1200&q=80&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&q=80&auto=format&fit=crop',
    ],
    description:
      'Made from certified organic cotton. Soft, eco-friendly and elevated for everyday comfort.',
  },
  {
    id: '6',
    name: 'Streetwear Oversized Tee',
    category: 'T-Shirt',
    price: 55,
    rating: 4.5,
    reviewCount: '610',
    quality: 'Casual',
    colors: ['black', 'red'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    image:
      'https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?w=1200&q=80&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&q=80&auto=format&fit=crop',
    ],
    description:
      'Oversized street-style tee with bold fit. Pairs well with layered looks and relaxed bottoms.',
  },
  {
    id: '7',
    name: 'Lightweight Summer Tee',
    category: 'T-Shirt',
    price: 30,
    rating: 4.4,
    reviewCount: '300',
    quality: 'Lightweight',
    colors: ['white', 'blue'],
    sizes: ['S', 'M', 'L'],
    image:
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&q=80&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520975915469-c14d7efb0c79?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80&auto=format&fit=crop',
    ],
    description:
      'Thin, breathable tee designed for warm weather. Keeps you cool with a soft hand-feel.',
  },
  {
    id: '8',
    name: 'Premium Long Sleeve Tee',
    category: 'T-Shirt',
    price: 65,
    rating: 4.8,
    reviewCount: '980',
    quality: 'Premium',
    colors: ['black', 'gray'],
    sizes: ['M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=1200&q=80&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&q=80&auto=format&fit=crop',
    ],
    description:
      'Long sleeve tee with refined finish. Ideal for layering or wearing as a standalone piece.',
  },
  // Jackets
  {
    id: '9',
    name: 'Classic Denim Jacket',
    category: 'Jacket',
    price: 85,
    rating: 4.7,
    reviewCount: '650',
    quality: 'Premium',
    colors: ['blue', 'black', 'white'],
    sizes: ['S', 'M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&q=80&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&q=80&auto=format&fit=crop',
    ],
    description:
      'Timeless denim jacket with classic cut. Perfect for layering and adds style to any outfit.',
  },
  {
    id: '10',
    name: 'Windbreaker Jacket',
    category: 'Jacket',
    price: 120,
    rating: 4.6,
    reviewCount: '450',
    quality: 'Performance',
    colors: ['black', 'navy', 'gray'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    image:
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&q=80&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80&auto=format&fit=crop',
    ],
    description:
      'Lightweight windbreaker for active days. Water-resistant and packable for outdoor adventures.',
  },
  {
    id: '11',
    name: 'Bomber Jacket',
    category: 'Jacket',
    price: 95,
    rating: 4.8,
    reviewCount: '890',
    quality: 'Premium',
    colors: ['black', 'olive', 'burgundy'],
    sizes: ['S', 'M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=1200&q=80&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&q=80&auto=format&fit=crop',
    ],
    description:
      'Classic bomber jacket with ribbed cuffs and collar. Modern streetwear essential with vintage appeal.',
  },
  // Shirts
  {
    id: '12',
    name: 'Oxford Button-Down Shirt',
    category: 'Shirt',
    price: 75,
    rating: 4.5,
    reviewCount: '720',
    quality: 'Premium',
    colors: ['white', 'blue', 'pink'],
    sizes: ['S', 'M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=1200&q=80&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80&auto=format&fit=crop',
    ],
    description:
      'Classic Oxford shirt with button-down collar. Perfect for business casual and everyday wear.',
  },
  {
    id: '13',
    name: 'Flannel Check Shirt',
    category: 'Shirt',
    price: 68,
    rating: 4.7,
    reviewCount: '540',
    quality: 'Casual',
    colors: ['red', 'blue', 'green'],
    sizes: ['M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&q=80&auto=format&fit=crop',
    ],
    description:
      'Cozy flannel shirt with classic check pattern. Soft cotton blend perfect for cooler weather.',
  },
  {
    id: '14',
    name: 'Dress Shirt',
    category: 'Shirt',
    price: 88,
    rating: 4.9,
    reviewCount: '1.1k',
    quality: 'Premium',
    colors: ['white', 'light blue', 'gray'],
    sizes: ['S', 'M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&q=80&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80&auto=format&fit=crop',
    ],
    description:
      'Formal dress shirt with tailored fit. Premium cotton with wrinkle-resistant finish for professional wear.',
  },
  // Jeans
  {
    id: '15',
    name: 'Slim Fit Dark Jeans',
    category: 'Jeans',
    price: 90,
    rating: 4.6,
    reviewCount: '980',
    quality: 'Premium',
    colors: ['dark blue', 'black'],
    sizes: ['M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80&auto=format&fit=crop',
    ],
    description:
      'Modern slim fit jeans in dark wash. Premium denim with stretch for comfort and contemporary style.',
  },
  {
    id: '16',
    name: 'Classic Straight Jeans',
    category: 'Jeans',
    price: 78,
    rating: 4.8,
    reviewCount: '1.5k',
    quality: 'Best quality',
    colors: ['blue', 'light blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=1200&q=80&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80&auto=format&fit=crop',
    ],
    description:
      'Timeless straight leg jeans with classic fit. Durable denim construction for everyday wear.',
  },
  {
    id: '17',
    name: 'Distressed Skinny Jeans',
    category: 'Jeans',
    price: 95,
    rating: 4.4,
    reviewCount: '670',
    quality: 'Trendy',
    colors: ['light blue', 'black'],
    sizes: ['M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=1200&q=80&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400&q=80&auto=format&fit=crop',
    ],
    description:
      'Trendy skinny jeans with distressed details. Contemporary styling with comfortable stretch fabric.',
  },
];

export { PRODUCTS };
