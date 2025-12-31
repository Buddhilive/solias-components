import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../components/ui/breadcrumb";

const meta: Meta = {
  title: "solias-doc/Breadcrumb",
  component: "solias-breadcrumb",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <solias-breadcrumb>
      <solias-breadcrumb-list>
        <solias-breadcrumb-item>
          <solias-breadcrumb-link href="/">Home</solias-breadcrumb-link>
        </solias-breadcrumb-item>
        <solias-breadcrumb-separator></solias-breadcrumb-separator>
        <solias-breadcrumb-item>
          <solias-breadcrumb-link href="/components"
            >Components</solias-breadcrumb-link
          >
        </solias-breadcrumb-item>
        <solias-breadcrumb-separator></solias-breadcrumb-separator>
        <solias-breadcrumb-item>
          <solias-breadcrumb-page>Breadcrumb</solias-breadcrumb-page>
        </solias-breadcrumb-item>
      </solias-breadcrumb-list>
    </solias-breadcrumb>
  `,
};

export const CustomSeparator: Story = {
  render: () => html`
    <solias-breadcrumb>
      <solias-breadcrumb-list>
        <solias-breadcrumb-item>
          <solias-breadcrumb-link href="/">Home</solias-breadcrumb-link>
        </solias-breadcrumb-item>
        <solias-breadcrumb-separator>
          <svg
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
            <path d="M22 2 2 22" />
          </svg>
        </solias-breadcrumb-separator>
        <solias-breadcrumb-item>
          <solias-breadcrumb-link href="/components"
            >Components</solias-breadcrumb-link
          >
        </solias-breadcrumb-item>
        <solias-breadcrumb-separator>
          <svg
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
            <path d="M22 2 2 22" />
          </svg>
        </solias-breadcrumb-separator>
        <solias-breadcrumb-item>
          <solias-breadcrumb-page>Breadcrumb</solias-breadcrumb-page>
        </solias-breadcrumb-item>
      </solias-breadcrumb-list>
    </solias-breadcrumb>
  `,
};

export const WithEllipsis: Story = {
  render: () => html`
    <solias-breadcrumb>
      <solias-breadcrumb-list>
        <solias-breadcrumb-item>
          <solias-breadcrumb-link href="/">Home</solias-breadcrumb-link>
        </solias-breadcrumb-item>
        <solias-breadcrumb-separator></solias-breadcrumb-separator>
        <solias-breadcrumb-item>
          <solias-breadcrumb-ellipsis></solias-breadcrumb-ellipsis>
        </solias-breadcrumb-item>
        <solias-breadcrumb-separator></solias-breadcrumb-separator>
        <solias-breadcrumb-item>
          <solias-breadcrumb-link href="/components"
            >Components</solias-breadcrumb-link
          >
        </solias-breadcrumb-item>
        <solias-breadcrumb-separator></solias-breadcrumb-separator>
        <solias-breadcrumb-item>
          <solias-breadcrumb-page>Breadcrumb</solias-breadcrumb-page>
        </solias-breadcrumb-item>
      </solias-breadcrumb-list>
    </solias-breadcrumb>
  `,
};

export const LinkOnly: Story = {
  render: () => html`
    <solias-breadcrumb>
      <solias-breadcrumb-list>
        <solias-breadcrumb-item>
          <solias-breadcrumb-link href="/">Home</solias-breadcrumb-link>
        </solias-breadcrumb-item>
      </solias-breadcrumb-list>
    </solias-breadcrumb>
  `,
};

export const LongPath: Story = {
  render: () => html`
    <solias-breadcrumb>
      <solias-breadcrumb-list>
        <solias-breadcrumb-item>
          <solias-breadcrumb-link href="/">Home</solias-breadcrumb-link>
        </solias-breadcrumb-item>
        <solias-breadcrumb-separator></solias-breadcrumb-separator>
        <solias-breadcrumb-item>
          <solias-breadcrumb-link href="/docs">Docs</solias-breadcrumb-link>
        </solias-breadcrumb-item>
        <solias-breadcrumb-separator></solias-breadcrumb-separator>
        <solias-breadcrumb-item>
          <solias-breadcrumb-link href="/docs/components"
            >Components</solias-breadcrumb-link
          >
        </solias-breadcrumb-item>
        <solias-breadcrumb-separator></solias-breadcrumb-separator>
        <solias-breadcrumb-item>
          <solias-breadcrumb-link href="/docs/components/ui"
            >UI</solias-breadcrumb-link
          >
        </solias-breadcrumb-item>
        <solias-breadcrumb-separator></solias-breadcrumb-separator>
        <solias-breadcrumb-item>
          <solias-breadcrumb-page>Breadcrumb</solias-breadcrumb-page>
        </solias-breadcrumb-item>
      </solias-breadcrumb-list>
    </solias-breadcrumb>
  `,
};
