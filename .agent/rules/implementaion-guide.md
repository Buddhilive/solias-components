---
trigger: always_on
---

- When creating new components, try to use native HTML elements and native APIs as much as possible. For example, for a Modal or a Dialog component, use the native <dialog> element.
- When styling components, always make the styles compatible for dark mode and light mode.
- When implementing functionality for components, handle edge cases and errors gracefully, with proper meaningful error messages and error codes logged in to browser console.
- Everytime a component is created, updated or deleted, storybook documentation should be changed accordingly.
