import type { Meta, StoryObj } from '@storybook/nextjs';
import { Input } from '.';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'gradient'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'regular'],
    },
    iconType: {
      control: { type: 'select' },
      options: ['password', 'search'],
    },
    showIcon: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    error: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'regular',
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const WithLabel: Story = {
  args: {
    variant: 'default',
    size: 'regular',
    label: 'Email Address',
    placeholder: 'john@example.com',
  },
};

export const WithoutLabel: Story = {
  args: {
    variant: 'default',
    size: 'regular',
    placeholder: 'Search...',
  },
};

export const SmallWithSearch: Story = {
  args: {
    variant: 'default',
    size: 'small',
    showIcon: true,
    iconType: 'search',
    placeholder: 'Search',
  },
};

export const PasswordInput: Story = {
  args: {
    variant: 'default',
    size: 'regular',
    type: 'password',
    label: 'Password',
    showIcon: true,
    iconType: 'password',
    placeholder: 'Enter your password',
  },
};

export const GradientVariant: Story = {
  args: {
    variant: 'gradient',
    size: 'small',
    showIcon: true,
    iconType: 'password',
    type: 'password',
    placeholder: 'Enter keyword again',
  },
};

export const FilledVariant: Story = {
  args: {
    variant: 'filled',
    size: 'regular',
    placeholder: 'Alexanderdrostact12',
  },
};

export const WithError: Story = {
  args: {
    variant: 'default',
    size: 'regular',
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'default',
    size: 'regular',
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-6 w-96'>
      <Input
        variant='default'
        label='Default Input'
        placeholder='Default variant'
      />
      <Input
        variant='filled'
        label='Filled Input'
        placeholder='Filled variant'
      />
      <Input variant='gradient' placeholder='Gradient variant' />
      <Input
        variant='default'
        size='small'
        showIcon
        iconType='search'
        placeholder='Small with search'
      />
      <Input
        variant='default'
        type='password'
        label='Password'
        showIcon
        iconType='password'
        placeholder='Password input'
      />
      <Input
        variant='default'
        label='With Error'
        placeholder='Input with error'
        error='This field is required'
      />
    </div>
  ),
};

export const FormLayout: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-4 w-[600px]'>
      <Input variant='gradient' placeholder='First Name' />
      <Input variant='gradient' placeholder='Last Name' />
    </div>
  ),
};
