import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Feedback/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    delay: {
      control: "number",
    },
    content: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    position: "top",
    delay: 200,
  },
  render: (args) => (
    <Tooltip {...args}>
      <button className="px-4 py-2 rounded-md bg-primary-500 text-white">
        Hover me
      </button>
    </Tooltip>
  ),
};

export const Top: Story = {
  args: {
    content: "Tooltip on top",
    position: "top",
    delay: 0,
  },
  render: (args) => (
    <Tooltip {...args}>
      <button className="px-4 py-2 rounded-md bg-primary-500 text-white">
        Top
      </button>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  args: {
    content: "Tooltip on bottom",
    position: "bottom",
    delay: 0,
  },
  render: (args) => (
    <Tooltip {...args}>
      <button className="px-4 py-2 rounded-md bg-primary-500 text-white">
        Bottom
      </button>
    </Tooltip>
  ),
};

export const Left: Story = {
  args: {
    content: "Tooltip on left",
    position: "left",
    delay: 0,
  },
  render: (args) => (
    <Tooltip {...args}>
      <button className="px-4 py-2 rounded-md bg-primary-500 text-white">
        Left
      </button>
    </Tooltip>
  ),
};

export const Right: Story = {
  args: {
    content: "Tooltip on right",
    position: "right",
    delay: 0,
  },
  render: (args) => (
    <Tooltip {...args}>
      <button className="px-4 py-2 rounded-md bg-primary-500 text-white">
        Right
      </button>
    </Tooltip>
  ),
};

export const WithDelay: Story = {
  args: {
    content: "Appears after 500ms",
    position: "top",
    delay: 500,
  },
  render: (args) => (
    <Tooltip {...args}>
      <button className="px-4 py-2 rounded-md bg-primary-500 text-white">
        Hover and wait
      </button>
    </Tooltip>
  ),
};

export const RichContent: Story = {
  args: {
    content: (
      <span>
        <strong>Bold</strong> and <em>italic</em> content
      </span>
    ),
    position: "top",
    delay: 0,
  },
  render: (args) => (
    <Tooltip {...args}>
      <button className="px-4 py-2 rounded-md bg-primary-500 text-white">
        Rich tooltip
      </button>
    </Tooltip>
  ),
};

export const AllPositions: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-16">
      <Tooltip content="Top tooltip" position="top" delay={0}>
        <button className="px-4 py-2 rounded-md bg-primary-500 text-white">
          Top
        </button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom" delay={0}>
        <button className="px-4 py-2 rounded-md bg-primary-500 text-white">
          Bottom
        </button>
      </Tooltip>
      <Tooltip content="Left tooltip" position="left" delay={0}>
        <button className="px-4 py-2 rounded-md bg-primary-500 text-white">
          Left
        </button>
      </Tooltip>
      <Tooltip content="Right tooltip" position="right" delay={0}>
        <button className="px-4 py-2 rounded-md bg-primary-500 text-white">
          Right
        </button>
      </Tooltip>
    </div>
  ),
};
