import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../components/ui/alert";

const meta: Meta = {
  title: "solias-doc/Alert",
  component: "solias-alert",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive"],
    },
  },
  render: (args) => html`
    <solias-alert .variant=${args.variant}>
      <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 16h.01" />
        <path d="M12 8v4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
      <solias-alert-title slot="title"
        >${args.title || "Heads up!"}</solias-alert-title
      >
      <solias-alert-description slot="description"
        >${args.description ||
        "You can add components to your app using the CLI."}</solias-alert-description
      >
    </solias-alert>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: "default",
    title: "Heads up!",
    description: "You can add components to your app using the CLI.",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    title: "Error",
    description: "Your session has expired. Please log in again.",
  },
};

export const WithoutDescription: Story = {
  args: {
    variant: "default",
    title: "This is an alert with only a title.",
  },
  render: (args) => html`
    <solias-alert .variant=${args.variant}>
      <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
      <solias-alert-title slot="title">${args.title}</solias-alert-title>
    </solias-alert>
  `,
};

export const WithoutIcon: Story = {
  args: {
    variant: "default",
    title: "Note",
    description: "This alert doesn't have an icon.",
  },
  render: (args) => html`
    <solias-alert .variant=${args.variant}>
      <solias-alert-title slot="title">${args.title}</solias-alert-title>
      <solias-alert-description slot="description"
        >${args.description}</solias-alert-description
      >
    </solias-alert>
  `,
};
