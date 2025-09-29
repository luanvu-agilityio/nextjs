import type { Meta, StoryObj } from '@storybook/nextjs';
import ColorPicker from './index';

const meta: Meta<typeof ColorPicker> = {
  title: 'Common/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  argTypes: {
    colors: { control: 'object' },
    selectedIndex: { control: 'number' },
    variant: { control: 'select', options: ['light', 'dark'] },
    className: { control: 'text' },
    onSelect: { action: 'select' },
  },
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    colors: ['red', 'blue', 'green', 'yellow'],
    selectedIndex: 1,
    variant: 'light',
  },
};

export const DarkVariant: Story = {
  args: {
    colors: ['red', 'blue', 'green', 'yellow'],
    selectedIndex: 2,
    variant: 'dark',
  },
};
