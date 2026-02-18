import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";
import { Check, Info, AlertCircle } from "../Icons";

const meta: Meta<typeof Tag> = {
  title: "Data Display/Tag",
  component: Tag,
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
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: "Tag",
    variant: "filled",
    color: "primary",
  },
};

export const Filled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="filled" color="primary">Primary</Tag>
      <Tag variant="filled" color="secondary">Secondary</Tag>
      <Tag variant="filled" color="success">Success</Tag>
      <Tag variant="filled" color="warning">Warning</Tag>
      <Tag variant="filled" color="error">Error</Tag>
      <Tag variant="filled" color="neutral">Neutral</Tag>
    </div>
  ),
};

export const Outline: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="outline" color="primary">Primary</Tag>
      <Tag variant="outline" color="secondary">Secondary</Tag>
      <Tag variant="outline" color="success">Success</Tag>
      <Tag variant="outline" color="warning">Warning</Tag>
      <Tag variant="outline" color="error">Error</Tag>
      <Tag variant="outline" color="neutral">Neutral</Tag>
    </div>
  ),
};

export const WithRemoveButton: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag color="primary" onRemove={() => {}}>React</Tag>
      <Tag color="success" onRemove={() => {}}>TypeScript</Tag>
      <Tag color="warning" onRemove={() => {}}>JavaScript</Tag>
      <Tag color="error" onRemove={() => {}}>Python</Tag>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag icon={<Check />} color="success">Verified</Tag>
      <Tag icon={<Info />} color="primary">Info</Tag>
      <Tag icon={<AlertCircle />} color="error">Error</Tag>
    </div>
  ),
};

export const WithIconAndRemove: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag icon={<Check />} color="success" onRemove={() => {}}>
        Verified
      </Tag>
      <Tag icon={<Info />} color="primary" onRemove={() => {}}>
        Information
      </Tag>
      <Tag icon={<AlertCircle />} color="error" onRemove={() => {}}>
        Critical
      </Tag>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag disabled>Disabled</Tag>
      <Tag disabled onRemove={() => {}}>
        Disabled removable
      </Tag>
      <Tag disabled icon={<Check />} color="success" onRemove={() => {}}>
        Disabled full
      </Tag>
    </div>
  ),
};

export const OutlineWithRemove: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="outline" color="primary" onRemove={() => {}}>
        React
      </Tag>
      <Tag variant="outline" color="success" onRemove={() => {}}>
        TypeScript
      </Tag>
      <Tag variant="outline" color="neutral" onRemove={() => {}}>
        CSS
      </Tag>
    </div>
  ),
};

export const AllCombinations: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-neutral-600">
          Filled
        </h3>
        <div className="flex flex-wrap gap-2">
          <Tag variant="filled" color="primary">Primary</Tag>
          <Tag variant="filled" color="secondary">Secondary</Tag>
          <Tag variant="filled" color="success">Success</Tag>
          <Tag variant="filled" color="warning">Warning</Tag>
          <Tag variant="filled" color="error">Error</Tag>
          <Tag variant="filled" color="neutral">Neutral</Tag>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-neutral-600">
          Outline
        </h3>
        <div className="flex flex-wrap gap-2">
          <Tag variant="outline" color="primary">Primary</Tag>
          <Tag variant="outline" color="secondary">Secondary</Tag>
          <Tag variant="outline" color="success">Success</Tag>
          <Tag variant="outline" color="warning">Warning</Tag>
          <Tag variant="outline" color="error">Error</Tag>
          <Tag variant="outline" color="neutral">Neutral</Tag>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-neutral-600">
          With icons and remove
        </h3>
        <div className="flex flex-wrap gap-2">
          <Tag icon={<Check />} color="success" onRemove={() => {}}>
            Approved
          </Tag>
          <Tag icon={<AlertCircle />} color="error" onRemove={() => {}}>
            Rejected
          </Tag>
          <Tag icon={<Info />} color="primary" onRemove={() => {}}>
            Pending
          </Tag>
        </div>
      </div>
    </div>
  ),
};
