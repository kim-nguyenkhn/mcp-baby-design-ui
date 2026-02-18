import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: {
    label: "Accept terms and conditions",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: "Accept terms and conditions",
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Select all",
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled checked",
    checked: true,
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Must accept terms",
    error: true,
  },
};
