import type { Meta, StoryObj } from '@storybook/nextjs';
import { Heading } from '.';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
    },
    children: {
      control: { type: 'text' },
    },
    className: {
      control: { type: 'text' },
    },
    'aria-label': {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    level: 1,
    children: 'Heading Level 1',
  },
};

export const Heading2: Story = {
  args: {
    level: 2,
    children: 'Heading Level 2',
  },
};

export const Heading3: Story = {
  args: {
    level: 3,
    children: 'Heading Level 3',
  },
};

export const Heading4: Story = {
  args: {
    level: 4,
    children: 'Heading Level 4',
  },
};

export const Heading5: Story = {
  args: {
    level: 5,
    children: 'Heading Level 5',
  },
};

export const Heading6: Story = {
  args: {
    level: 6,
    children: 'Heading Level 6',
  },
};

export const WithCustomStyling: Story = {
  args: {
    level: 2,
    children: 'Custom Styled Heading',
    className: 'text-purple-background',
  },
};

export const WithAriaLabel: Story = {
  args: {
    level: 1,
    children: 'Accessible Heading',
    'aria-label': 'Main page heading',
  },
};

export const AllLevels: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Heading level={1}>Heading 1 - Roboto Bold 4xl</Heading>
      <Heading level={2}>Heading 2 - Roboto Bold 3xl</Heading>
      <Heading level={3}>Heading 3 - Mada Semibold 2xl</Heading>
      <Heading level={4}>Heading 4 - Mada Semibold xl</Heading>
      <Heading level={5}>Heading 5 - Poppins Medium lg</Heading>
      <Heading level={6}>Heading 6 - Poppins Medium base</Heading>
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Heading level={2} className='text-primary'>
        Primary Color
      </Heading>
      <Heading level={2} className='text-purple-background'>
        Purple Background
      </Heading>
      <Heading level={2} className='text-purple-foreground'>
        Purple Foreground
      </Heading>
      <Heading level={2} className='text-success'>
        Success Color
      </Heading>
    </div>
  ),
};
