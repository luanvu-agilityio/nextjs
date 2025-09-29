'use client';
import { useRef, useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

// Components
import {
  AccountScreen,
  Breadcrumbs,
  getFriendlyMessage,
  Heading,
  showToast,
  Typography,
} from '@/components';

// Hooks
import { useMe, useUpdateUser } from '@/hooks/useRegisterUser';

// Constants
import { ROUTES } from '@/constants/route';
import { TOAST_MESSAGES, TOAST_TITLES, TOAST_VARIANTS } from '@/constants';

// Api
import { uploadToCloudinary } from '@/api';
import ProfileCard from '@/components/ProfileCard';
import ProfileCardSkeleton from '@/components/ProfileCard/ProfileCardSkeleton';
import AccountScreenSkeleton from '@/components/AccountDetails/AccountScreenSkeleton';
import { useSession } from 'next-auth/react';

export default function AccountDetails() {
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const { data: user } = useMe();
  const updateUser = useUpdateUser();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'loading') return; // Wait for session to load
    if (status === 'unauthenticated') {
      router.replace(
        `${ROUTES.LOGIN}?from=${encodeURIComponent(ROUTES.ACCOUNT)}`
      );
    }
  }, [status, router]);

  useEffect(() => {
    if (user?.photo) setPhotoUrl(user.photo);
  }, [user]);

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoUrl(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!user?.id || !selectedFile) return;

    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(selectedFile);

      updateUser.mutate(
        { id: user.id, patch: { photo: url } },
        {
          onSuccess: () => {
            setPhotoUrl(url);
            setSelectedFile(null);
            showToast(TOAST_MESSAGES.PHOTO_UPDATED);
          },
          onError: err => {
            showToast({
              title: TOAST_TITLES.UPDATE_FAILED,
              description: getFriendlyMessage(err),
              variant: TOAST_VARIANTS.ERROR,
            });
          },
        }
      );
    } catch (err) {
      showToast({
        title: TOAST_TITLES.UPDATE_FAILED,
        description: getFriendlyMessage(err),
        variant: TOAST_VARIANTS.ERROR,
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (status === 'loading') {
    return (
      <main>
        <section
          className='relative bg-gradient-primary px-30 py-10 h-86 flex gap-52 items-start justify-between'
          style={{
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
          }}
        >
          <div className='container mx-auto flex flex-col gap-9.5 items-start justify-start w-127'>
            <Breadcrumbs
              items={[
                { label: 'Home', href: ROUTES.HOME },
                { label: 'My Account' },
              ]}
              variant='dark'
            />
            <Heading
              level={2}
              className='text-4xl text-white font-secondary font-bold'
            >
              My Account
            </Heading>
            <Typography className='text-white text-lg leading-relaxed '>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget
              gravida leo, nec iaculis diam. Nam bibendum mi sed sem finibus
              ullamcorper.
            </Typography>
          </div>
          <ProfileCardSkeleton />
          <div className='absolute bottom-0 left-0 w-full overflow-hidden leading-[0]'>
            <svg
              className='relative block w-full h-[145px]'
              data-name='Layer 1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 1200 120'
              preserveAspectRatio='none'
            >
              <path d='M0,120L1200,0L1200,120Z' className='fill-white' />
            </svg>
          </div>
        </section>
        <div className='col-span-2 mt-20'>
          <AccountScreenSkeleton />
        </div>
      </main>
    );
  }

  return (
    <main>
      <section
        className='relative bg-gradient-primary px-30 py-10 h-86 flex gap-52 items-start justify-between'
        style={{
          borderBottomLeftRadius: '5px',
          borderBottomRightRadius: '5px',
        }}
      >
        <div className='container mx-auto flex flex-col gap-9.5 items-start justify-start w-127'>
          <Breadcrumbs
            items={[
              { label: 'Home', href: ROUTES.HOME },
              { label: 'My Account' },
            ]}
            variant='dark'
          />
          <Heading
            level={2}
            className='text-4xl text-white font-secondary font-bold'
          >
            My Account
          </Heading>

          <Typography className='text-white text-lg leading-relaxed '>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget
            gravida leo, nec iaculis diam. Nam bibendum mi sed sem finibus
            ullamcorper.
          </Typography>
        </div>

        {user && (
          <ProfileCard
            user={user}
            photoUrl={photoUrl}
            isUploading={isUploading}
            handlePhotoClick={handlePhotoClick}
            handlePhotoChange={handlePhotoChange}
            handleUpload={handleUpload}
            fileInputRef={fileInputRef}
          />
        )}

        <div className='absolute bottom-0 left-0 w-full overflow-hidden leading-[0]'>
          <svg
            className='relative block w-full h-[145px]'
            data-name='Layer 1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1200 120'
            preserveAspectRatio='none'
          >
            <path d='M0,120L1200,0L1200,120Z' className='fill-white' />
          </svg>
        </div>
      </section>

      <div className='col-span-2 mt-20'>
        <AccountScreen />
      </div>
    </main>
  );
}
