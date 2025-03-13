import type { Preview } from '@storybook/web-components';
import { withThemeByClassName } from '@storybook/addon-themes';
import '../build/tailwind.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light', // No class applied for light theme
        dark: 'dark', // Apply 'dark' class for dark theme
      },
      defaultTheme: 'light', // Default theme
    }),
  ],
};

export default preview;