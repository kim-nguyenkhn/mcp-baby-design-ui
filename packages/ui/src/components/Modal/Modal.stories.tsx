import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Overlay/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    open: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalTemplate: React.FC<{
  size?: "sm" | "md" | "lg" | "xl";
}> = ({ size = "md" }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="px-4 py-2 rounded-md bg-primary-500 text-white text-sm"
        onClick={() => setOpen(true)}
      >
        Open Modal
      </button>
      <Modal open={open} onClose={() => setOpen(false)} size={size}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>
          <p>
            This is the modal body. You can put any content here, including
            forms, text, images, and other components.
          </p>
        </ModalBody>
        <ModalFooter>
          <button
            className="px-4 py-2 rounded-md border border-neutral-300 text-neutral-700 text-sm hover:bg-neutral-50"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-primary-500 text-white text-sm hover:bg-primary-600"
            onClick={() => setOpen(false)}
          >
            Confirm
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalTemplate />,
};

export const Small: Story = {
  render: () => <ModalTemplate size="sm" />,
};

export const Large: Story = {
  render: () => <ModalTemplate size="lg" />,
};

export const ExtraLarge: Story = {
  render: () => <ModalTemplate size="xl" />,
};

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button
          className="px-4 py-2 rounded-md bg-primary-500 text-white text-sm"
          onClick={() => setOpen(true)}
        >
          Open Form Modal
        </button>
        <Modal open={open} onClose={() => setOpen(false)} size="md">
          <ModalHeader>Create Account</ModalHeader>
          <ModalBody>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <button
              className="px-4 py-2 rounded-md border border-neutral-300 text-neutral-700 text-sm"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-md bg-primary-500 text-white text-sm"
              onClick={() => setOpen(false)}
            >
              Create
            </button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button
          className="px-4 py-2 rounded-md bg-primary-500 text-white text-sm"
          onClick={() => setOpen(true)}
        >
          Open Scrollable Modal
        </button>
        <Modal open={open} onClose={() => setOpen(false)} size="md">
          <ModalHeader>Terms of Service</ModalHeader>
          <ModalBody>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="mb-4 text-sm text-neutral-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            ))}
          </ModalBody>
          <ModalFooter>
            <button
              className="px-4 py-2 rounded-md border border-neutral-300 text-neutral-700 text-sm"
              onClick={() => setOpen(false)}
            >
              Decline
            </button>
            <button
              className="px-4 py-2 rounded-md bg-primary-500 text-white text-sm"
              onClick={() => setOpen(false)}
            >
              Accept
            </button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};
