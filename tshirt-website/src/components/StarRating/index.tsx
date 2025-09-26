// Components
import { Typography } from '../common';

// Utils
import { cn } from '@/lib/utils';

const StarRating = ({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount?: string;
}) => {
  return (
    <div className='flex items-center gap-2'>
      {[...Array(5)].map((_, index) => (
        <span
          key={`star-rating-${index}-${rating}`}
          className={cn(
            'text-lg',
            index < rating ? 'text-yellow-400' : 'text-gray-300'
          )}
        >
          ★
        </span>
      ))}
      {reviewCount && (
        <Typography size='sm' className='text-gray-500'>
          ({reviewCount})
        </Typography>
      )}
    </div>
  );
};

export default StarRating;
