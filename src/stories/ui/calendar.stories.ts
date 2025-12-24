import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../components/ui/calendar";

const meta: Meta = {
  title: "solias-doc/Calendar",
  component: "solias-calendar",
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "date" },
      description: "Selected date value",
    },
    disabled: {
      control: "boolean",
      description: "Whether the calendar is disabled",
    },
    showOutsideDays: {
      control: "boolean",
      description: "Whether to show days from adjacent months",
    },
  },
  render: (args) => html`
    <solias-calendar
      .value=${args.value ? new Date(args.value) : undefined}
      ?disabled=${args.disabled}
      ?show-outside-days=${args.showOutsideDays}
      @date-select=${(e: CustomEvent) =>
        console.log("Date selected:", e.detail.date)}
    ></solias-calendar>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    showOutsideDays: true,
  },
};

export const WithSelectedDate: Story = {
  args: {
    value: new Date().getTime(),
    showOutsideDays: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Calendar with a pre-selected date (today).",
      },
    },
  },
};

export const HideOutsideDays: Story = {
  args: {
    showOutsideDays: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Calendar with outside days hidden for a cleaner look.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    showOutsideDays: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled calendar where no dates can be selected.",
      },
    },
  },
};

export const WithBorder: Story = {
  render: () => html`
    <solias-calendar
      class="rounded-md border shadow-sm"
      style="border: 1px solid var(--border); border-radius: 0.5rem;"
      ?show-outside-days=${true}
      @date-select=${(e: CustomEvent) =>
        console.log("Date selected:", e.detail.date)}
    ></solias-calendar>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "Calendar with a border and shadow, similar to Shadcn UI styling.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const handleDateSelect = (e: CustomEvent) => {
      const dateDisplay = document.getElementById("selected-date-display");
      if (dateDisplay) {
        dateDisplay.textContent = `Selected: ${e.detail.date.toLocaleDateString()}`;
      }
    };

    return html`
      <div class="flex flex-col gap-4 items-start">
        <solias-calendar
          class="rounded-md border"
          style="border: 1px solid var(--border); border-radius: 0.5rem;"
          ?show-outside-days=${true}
          @date-select=${handleDateSelect}
        ></solias-calendar>
        <p
          id="selected-date-display"
          class="text-sm text-muted-foreground px-3"
        >
          Click a date to select it
        </p>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example that displays the selected date below the calendar.",
      },
    },
  },
};
