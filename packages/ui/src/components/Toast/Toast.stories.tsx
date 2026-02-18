import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toast, ToastProvider, useToast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
    duration: {
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Info: Story = {
  args: {
    variant: "info",
    title: "Information",
    description: "This is an informational message.",
    duration: 0,
    onClose: () => {},
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success",
    description: "Your changes have been saved.",
    duration: 0,
    onClose: () => {},
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    description: "Please review your settings before continuing.",
    duration: 0,
    onClose: () => {},
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Error",
    description: "Something went wrong. Please try again.",
    duration: 0,
    onClose: () => {},
  },
};

export const TitleOnly: Story = {
  args: {
    variant: "info",
    title: "Title only toast",
    duration: 0,
    onClose: () => {},
  },
};

// ─── Interactive demo with ToastProvider ───

const ToastDemo: React.FC = () => {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <button
        className="px-4 py-2 rounded-md bg-primary-500 text-white text-sm"
        onClick={() =>
          toast({
            variant: "info",
            title: "Information",
            description: "This is an informational toast.",
          })
        }
      >
        Info Toast
      </button>
      <button
        className="px-4 py-2 rounded-md bg-success-500 text-white text-sm"
        onClick={() =>
          toast({
            variant: "success",
            title: "Success",
            description: "Operation completed successfully.",
          })
        }
      >
        Success Toast
      </button>
      <button
        className="px-4 py-2 rounded-md bg-warning-500 text-white text-sm"
        onClick={() =>
          toast({
            variant: "warning",
            title: "Warning",
            description: "Please check your input.",
          })
        }
      >
        Warning Toast
      </button>
      <button
        className="px-4 py-2 rounded-md bg-error-500 text-white text-sm"
        onClick={() =>
          toast({
            variant: "error",
            title: "Error",
            description: "Something went wrong.",
          })
        }
      >
        Error Toast
      </button>
    </div>
  );
};

export const Interactive: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};
