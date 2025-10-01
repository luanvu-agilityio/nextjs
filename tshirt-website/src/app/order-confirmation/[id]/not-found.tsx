import { Typography, Button } from '@/components';
import Link from 'next/link';
import { ROUTES } from '@/constants/route';

function NotFound() {
  return (
    <main className='container mx-auto px-30 py-8 text-center'>
      <Typography className='text-2xl mb-4 text-red-500'>
        Order not found.
      </Typography>
      <Link href={ROUTES.ACCOUNT}>
        <Button variant='secondary'>View My Orders</Button>
      </Link>
      <Link href={ROUTES.HOME}>
        <Button variant='primary' className='ml-4'>
          Return Home
        </Button>
      </Link>
    </main>
  );
}

export default NotFound;
