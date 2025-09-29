import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Modal } from './index';

const meta: Meta<typeof Modal> = {
  title: 'Common/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: args => {
    const [open, setOpen] = useState(true);
    return (
      <Modal {...args} open={open} onOpenChange={setOpen}>
        <div>
          <p>This is a simple modal content.</p>
        </div>
      </Modal>
    );
  },
  args: {
    title: 'Simple Modal',
  },
};
