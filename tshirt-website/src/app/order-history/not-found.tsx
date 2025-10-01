import { Typography, Button } from '@/components';
import Link from 'next/link';
import { ROUTES } from '@/constants/route';

function NotFound() {
  return (
    <div className='text-center py-20'>
      <Typography className='text-2xl mb-4 text-red-500'>
        Order history not found.
      </Typography>
      <Link href={ROUTES.SHOP}>
        <Button variant='primary'>Start Shopping</Button>
      </Link>
    </div>
  );
}
export default NotFound;
