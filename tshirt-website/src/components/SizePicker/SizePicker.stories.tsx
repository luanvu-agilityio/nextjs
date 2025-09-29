import type { Meta, StoryObj } from '@storybook/nextjs';
import SizePicker from './index';

const meta: Meta<typeof SizePicker> = {
  title: 'Common/SizePicker',
  component: SizePicker,
  tags: ['autodocs'],
  argTypes: {
    sizes: { control: 'object' },
    selectedIndex: { control: 'number' },
    variant: { control: 'select', options: ['light', 'dark'] },
    className: { control: 'text' },
    onSelect: { action: 'select' },
  },
};

export default meta;

type Story = StoryObj<typeof SizePicker>;

export const Default: Story = {
  args: {
    sizes: ['S', 'M', 'L', 'XL'],
    selectedIndex: 1,
    variant: 'light',
  },
};

export const DarkVariant: Story = {
  args: {
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    selectedIndex: 2,
    variant: 'dark',
  },
};
