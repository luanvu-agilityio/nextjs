import type { Meta, StoryObj } from '@storybook/nextjs';
import { Badge } from './index';

const meta: Meta<typeof Badge> = {
  title: 'Common/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'success',
        'warning',
        'destructive',
        'info',
        'delivered',
        'shipped',
        'processing',
      ],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    count: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    count: 5,
    variant: 'success',
    size: 'medium',
  },
};

export const HiddenWhenZero: Story = {
  args: {
    count: 0,
    variant: 'warning',
    size: 'medium',
  },
};

export const InfoLarge: Story = {
  args: {
    count: 99,
    variant: 'info',
    size: 'large',
  },
};
