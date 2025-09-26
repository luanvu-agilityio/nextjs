import Image from 'next/image';

// Components
import { Button, Typography } from '../common';

// Types
import { User } from '@/types';

interface ProfileCardProps {
  user: User;
  photoUrl: string | null;
  isUploading: boolean;
  handlePhotoClick: () => void;
  handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const ProfileCard = ({
  user,
  photoUrl,
  isUploading,
  handlePhotoClick,
  handlePhotoChange,
  handleUpload,
  fileInputRef,
}: ProfileCardProps) => (
  <div className='flex flex-col items-center w-[486px] h-auto py-10 gap-6 bg-white shadow-tertiary z-10'>
    <div
      className='relative w-[150px] h-[150px] rounded-full border-4 border-white bg-white cursor-pointer flex items-center justify-center overflow-hidden'
      onClick={handlePhotoClick}
    >
      <Image
        src={photoUrl || '/placeholder-profile.png'}
        alt='User profile'
        fill
        className='object-cover rounded-full'
        priority
      />
      <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
        <span className='bg-blue-background opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center '>
          +
        </span>
      </div>

      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        className='hidden'
        onChange={handlePhotoChange}
      />
    </div>
    <Typography className='text-primary font-bold text-2xl '>
      {user?.name}
    </Typography>
    <Typography className='text-gray-foreground text-sm'>
      {user?.email}
    </Typography>

    <Button
      type='button'
      onClick={handleUpload}
      className='bg-gradient-primary text-white py-3 px-6 rounded-md shadow-2xl'
    >
      {isUploading ? 'Uploading…' : 'Update'}
    </Button>
  </div>
);
export default ProfileCard;
