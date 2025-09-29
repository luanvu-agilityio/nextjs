import type { Meta, StoryObj } from '@storybook/nextjs';
import { Breadcrumbs } from './index';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Common/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['dark', 'light'],
    },
    showHome: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Shop', href: '/shop' },
      { label: 'T-Shirts', href: '/shop/t-shirts' },
      { label: 'Cool Tee' },
    ],
    variant: 'dark',
    showHome: true,
  },
};

export const LightVariant: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Account', href: '/account' },
      { label: 'Orders', href: '/account/orders' },
    ],
    variant: 'light',
    showHome: true,
  },
};

export const WithoutHome: Story = {
  args: {
    items: [
      { label: 'Shop', href: '/shop' },
      { label: 'Accessories', href: '/shop/accessories' },
    ],
    variant: 'dark',
    showHome: false,
  },
};
