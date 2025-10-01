'use client';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Button } from '@/components';

function OrderHistoryError({
  error,
  reset,
}: {
  readonly error: Error;
  readonly reset: () => void;
}) {
  return (
    <div className='text-center py-20'>
      <ErrorMessage error={error} className='text-2xl mb-4' />
      <Button variant='primary' onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
export default OrderHistoryError;
