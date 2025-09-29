import type { Meta, StoryObj } from '@storybook/nextjs';
import StarRating from './index';

const meta: Meta<typeof StarRating> = {
  title: 'Common/StarRating',
  component: StarRating,
  tags: ['autodocs'],
  argTypes: {
    rating: { control: 'number', min: 0, max: 5 },
    reviewCount: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof StarRating>;

export const Default: Story = {
  args: {
    rating: 4,
    reviewCount: '123',
  },
};

export const NoReviews: Story = {
  args: {
    rating: 5,
  },
};

export const LowRating: Story = {
  args: {
    rating: 2,
    reviewCount: '8',
  },
};
