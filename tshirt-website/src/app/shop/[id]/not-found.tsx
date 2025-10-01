import { Typography, Button } from '@/components';
import Link from 'next/link';
import { ROUTES } from '@/constants';

function NotFound() {
  return (
    <main className='text-center py-20'>
      <Typography className='text-2xl mb-4 text-red-500'>
        Product not found.
      </Typography>
      <Link href={ROUTES.SHOP}>
        <Button variant='primary'>Back to Shop</Button>
      </Link>
    </main>
  );
}
export default NotFound;
