import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: async config => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'next/navigation': path.resolve(__dirname, 'mocks/next-navigation.ts'),
        '@/components/common/ErrorMessage': path.resolve(
          __dirname,
          'mocks/ErrorMessage.tsx'
        ),
        '@/components/common/InputController': path.resolve(
          __dirname,
          'mocks/InputController.tsx'
        ),
      };
    }
    return config;
  },
};

export default config;
