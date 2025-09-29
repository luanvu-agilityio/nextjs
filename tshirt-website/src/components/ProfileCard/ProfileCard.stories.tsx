import type { Meta, StoryObj } from '@storybook/nextjs';
import ProfileCard from './index';
import ProfileCardSkeleton from './ProfileCardSkeleton';

const meta: Meta<typeof ProfileCard> = {
  title: 'Profile/ProfileCard',
  component: ProfileCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProfileCard>;

const mockUser = {
  id: '2',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
};

export const Default: Story = {
  args: {
    user: mockUser,
    photoUrl: null,
    isUploading: false,
    handlePhotoClick: () => alert('Photo clicked'),
    handlePhotoChange: () => {},
    handleUpload: () => alert('Upload clicked'),
    fileInputRef: {
      current: null,
    } as unknown as React.RefObject<HTMLInputElement>,
  },
};

export const Skeleton: StoryObj = {
  render: () => <ProfileCardSkeleton />,
};
