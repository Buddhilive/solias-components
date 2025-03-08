import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],

  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
    "@storybook/addon-themes"
  ],

  "framework": {
    "name": "@storybook/angular",
    "options": {}
  },

  docs: {
    autodocs: true
  }
};
export default config;