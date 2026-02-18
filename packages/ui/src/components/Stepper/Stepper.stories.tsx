import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./Stepper";

const steps = [
  { label: "Account", description: "Create your account" },
  { label: "Profile", description: "Set up your profile" },
  { label: "Review", description: "Review and confirm" },
  { label: "Complete", description: "All done" },
];

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  argTypes: {
    activeStep: { control: "number" },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    variant: { control: "select", options: ["numbered", "bar"] },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: {
    steps,
    activeStep: 1,
    orientation: "horizontal",
    variant: "numbered",
  },
};

export const FirstStep: Story = {
  args: {
    steps,
    activeStep: 0,
  },
};

export const LastStep: Story = {
  args: {
    steps,
    activeStep: 3,
  },
};

export const Vertical: Story = {
  args: {
    steps,
    activeStep: 2,
    orientation: "vertical",
  },
};

export const BarVariant: Story = {
  args: {
    steps,
    activeStep: 2,
    variant: "bar",
  },
};
