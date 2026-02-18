import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "../Icons";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Full Name",
    placeholder: "Enter your full name",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "Enter email",
    error: "Please enter a valid email address",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Username",
    placeholder: "Choose a username",
    helperText: "Must be at least 3 characters",
  },
};

export const WithCharCount: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself",
    maxLength: 200,
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    leftIcon: <Search size={16} />,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    placeholder: "Cannot edit",
    disabled: true,
  },
};
