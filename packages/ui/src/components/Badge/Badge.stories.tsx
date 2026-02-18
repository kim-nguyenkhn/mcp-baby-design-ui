import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Data Display/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "outline"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "error", "neutral"],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    dot: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "filled",
    color: "primary",
    size: "md",
  },
};

export const Filled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="filled" color="primary">Primary</Badge>
      <Badge variant="filled" color="secondary">Secondary</Badge>
      <Badge variant="filled" color="success">Success</Badge>
      <Badge variant="filled" color="warning">Warning</Badge>
      <Badge variant="filled" color="error">Error</Badge>
      <Badge variant="filled" color="neutral">Neutral</Badge>
    </div>
  ),
};

export const Outline: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" color="primary">Primary</Badge>
      <Badge variant="outline" color="secondary">Secondary</Badge>
      <Badge variant="outline" color="success">Success</Badge>
      <Badge variant="outline" color="warning">Warning</Badge>
      <Badge variant="outline" color="error">Error</Badge>
      <Badge variant="outline" color="neutral">Neutral</Badge>
    </div>
  ),
};

export const Small: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge size="sm" color="primary">Small</Badge>
      <Badge size="sm" color="success">Small</Badge>
      <Badge size="sm" color="error">Small</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge dot color="primary">Active</Badge>
      <Badge dot color="success">Online</Badge>
      <Badge dot color="warning">Busy</Badge>
      <Badge dot color="error">Offline</Badge>
      <Badge dot color="neutral">Away</Badge>
    </div>
  ),
};

export const WithDotOutline: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" dot color="primary">Active</Badge>
      <Badge variant="outline" dot color="success">Online</Badge>
      <Badge variant="outline" dot color="error">Offline</Badge>
    </div>
  ),
};

export const AllCombinations: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-neutral-600">Filled</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="filled" color="primary">Primary</Badge>
          <Badge variant="filled" color="secondary">Secondary</Badge>
          <Badge variant="filled" color="success">Success</Badge>
          <Badge variant="filled" color="warning">Warning</Badge>
          <Badge variant="filled" color="error">Error</Badge>
          <Badge variant="filled" color="neutral">Neutral</Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-neutral-600">Outline</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" color="primary">Primary</Badge>
          <Badge variant="outline" color="secondary">Secondary</Badge>
          <Badge variant="outline" color="success">Success</Badge>
          <Badge variant="outline" color="warning">Warning</Badge>
          <Badge variant="outline" color="error">Error</Badge>
          <Badge variant="outline" color="neutral">Neutral</Badge>
        </div>
      </div>
    </div>
  ),
};
