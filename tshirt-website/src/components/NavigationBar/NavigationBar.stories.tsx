import type { Meta, StoryObj } from '@storybook/nextjs';
import { Navigation } from './index';

const meta: Meta<typeof Navigation> = {
  title: 'Common/NavigationBar',
  component: Navigation,
  tags: ['autodocs'],
  argTypes: {
    isMobile: { control: 'boolean' },
    className: { control: 'text' },
    onItemClick: { action: 'itemClick' },
  },
};

export default meta;

type Story = StoryObj<typeof Navigation>;

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export const Default: Story = {
  args: {
    items: navItems,
    isMobile: false,
  },
};

export const Mobile: Story = {
  args: {
    items: navItems,
    isMobile: true,
  },
};
