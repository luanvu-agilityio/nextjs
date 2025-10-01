'use client';

import { Button, ErrorMessage } from '@/components';
import Link from 'next/link';
import { ROUTES } from '@/constants/route';

function AccountError({
  error,
  reset,
}: {
  readonly error: Error;
  readonly reset: () => void;
}) {
  return (
    <main className='text-center py-20'>
      <ErrorMessage error={error} className='text-2xl mb-4' />
      <Button variant='primary' onClick={reset}>
        Try Again
      </Button>
      <Link href={ROUTES.HOME}>
        <Button variant='secondary' className='ml-4'>
          Go Home
        </Button>
      </Link>
    </main>
  );
}
export default AccountError;
