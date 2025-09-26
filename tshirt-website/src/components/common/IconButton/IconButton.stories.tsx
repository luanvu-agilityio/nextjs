import type { Meta, StoryObj } from '@storybook/nextjs';
import { IconButton } from '.';
import {
  Heart,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Search,
  Star,
} from 'lucide-react';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'outline',
        'solid',
        'destructive',
        'ghost',
        'disabled',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    'aria-label': {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    'aria-label': 'Like button',
    children: <Heart />,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
    'aria-label': 'Bookmark button',
    children: <Bookmark />,
  },
};

export const Solid: Story = {
  args: {
    variant: 'solid',
    size: 'md',
    'aria-label': 'Search button',
    children: <Search />,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    'aria-label': 'Star button',
    children: <Star />,
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'md',
    'aria-label': 'Delete button',
    children: <Heart />,
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <IconButton variant='primary' size='xs' aria-label='Extra small'>
        <Heart />
      </IconButton>
      <IconButton variant='primary' size='sm' aria-label='Small'>
        <Heart />
      </IconButton>
      <IconButton variant='primary' size='md' aria-label='Medium'>
        <Heart />
      </IconButton>
      <IconButton variant='primary' size='lg' aria-label='Large'>
        <Heart />
      </IconButton>
      <IconButton variant='primary' size='xl' aria-label='Extra large'>
        <Heart />
      </IconButton>
    </div>
  ),
};

export const SocialMediaIcons: Story = {
  render: () => (
    <div className='flex gap-4'>
      <IconButton variant='outline' size='lg' aria-label='Facebook'>
        <Facebook />
      </IconButton>
      <IconButton variant='outline' size='lg' aria-label='Twitter'>
        <Twitter />
      </IconButton>
      <IconButton variant='outline' size='lg' aria-label='LinkedIn'>
        <Linkedin />
      </IconButton>
      <IconButton variant='outline' size='lg' aria-label='Instagram'>
        <Instagram />
      </IconButton>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <IconButton variant='primary' size='md' aria-label='Primary'>
          <Heart />
        </IconButton>
        <IconButton variant='outline' size='md' aria-label='Outline'>
          <Bookmark />
        </IconButton>
        <IconButton variant='solid' size='md' aria-label='Solid'>
          <Search />
        </IconButton>
        <IconButton variant='ghost' size='md' aria-label='Ghost'>
          <Star />
        </IconButton>
        <IconButton variant='destructive' size='md' aria-label='Destructive'>
          <Heart />
        </IconButton>
        <IconButton variant='disabled' size='md' aria-label='Disabled'>
          <Heart />
        </IconButton>
      </div>
    </div>
  ),
};
