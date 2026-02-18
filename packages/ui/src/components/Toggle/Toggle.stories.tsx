import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

const ToggleTemplate = (args: { size?: "sm" | "md" | "lg"; disabled?: boolean; label?: string }) => {
  const [checked, setChecked] = useState(false);
  return <Toggle {...args} checked={checked} onChange={setChecked} />;
};

export const Default: Story = {
  render: () => <ToggleTemplate label="Enable notifications" />,
};

export const Small: Story = {
  render: () => <ToggleTemplate size="sm" label="Small toggle" />,
};

export const Large: Story = {
  render: () => <ToggleTemplate size="lg" label="Large toggle" />,
};

export const Disabled: Story = {
  args: {
    label: "Disabled toggle",
    disabled: true,
    checked: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled checked",
    disabled: true,
    checked: true,
  },
};
