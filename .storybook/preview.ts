import type { Preview } from "@storybook/web-components-vite";
import "../src/styles/tailwind.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#09090b" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  decorators: [
    (story, context) => {
      const backgrounds = context.globals.backgrounds;
      const bgValue = backgrounds?.value || backgrounds;

      // Determine if dark mode should be active based on the background color
      const isDark = bgValue === "#09090b";

      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return story();
    },
  ],
};

export default preview;
