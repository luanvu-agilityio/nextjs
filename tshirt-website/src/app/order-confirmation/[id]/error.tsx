'use client';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Button } from '@/components';

function OrderConfirmationError({
  error,
  reset,
}: {
  readonly error: Error;
  readonly reset: () => void;
}) {
  return (
    <main className='container mx-auto px-30 py-8 text-center'>
      <ErrorMessage error={error} className='text-2xl mb-4' />
      <Button variant='primary' onClick={reset}>
        Try Again
      </Button>
    </main>
  );
}
export default OrderConfirmationError;
