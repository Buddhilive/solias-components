import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import { withThemeByClassName } from '@storybook/addon-themes';
import 'zone.js';
setCompodocJson(docJson);
import '!style-loader!css-loader!postcss-loader!../../previewer/src/styles.scss';

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
