import { Typography } from '@/components';

const ProductTabInfo = ({ tab }: { tab: 'description' | 'reviews' }) => (
  <>
    {tab === 'description' ? (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <Typography className='font-semibold mb-3'>Detail Product</Typography>
          <ul className='list-disc list-inside text-gray-600'>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>
              Suspendisse vehicula, sapien a lacinia fermentum, arcu velit
              pulvinar nisl.
            </li>
            <li>High-quality cotton, sustainable manufacturing.</li>
          </ul>
        </div>
        <div>
          <Typography className='font-semibold mb-3'>
            Shipping & Returns
          </Typography>
          <Typography className='text-gray-600'>
            Free shipping on orders over $50. 30-day returns policy.
          </Typography>
        </div>
      </div>
    ) : (
      <div>
        <Typography className='text-gray-600'>
          No reviews yet — be the first to review.
        </Typography>
      </div>
    )}
  </>
);

export default ProductTabInfo;
