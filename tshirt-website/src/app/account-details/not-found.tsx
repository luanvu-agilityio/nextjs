import { Typography, Button } from '@/components';
import Link from 'next/link';
import { ROUTES } from '@/constants/route';

function NotFound() {
  return (
    <main className='text-center py-20'>
      <Typography className='text-2xl mb-4 text-red-500'>
        Account not found.
      </Typography>
      <Link href={ROUTES.HOME}>
        <Button variant='primary'>Go Home</Button>
      </Link>
    </main>
  );
}
export default NotFound;
