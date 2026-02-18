import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
    showValue: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

const SliderTemplate = (args: {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
}) => {
  const [value, setValue] = useState(50);
  return <Slider {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: () => <SliderTemplate label="Volume" showValue />,
};

export const WithStep: Story = {
  render: () => (
    <SliderTemplate label="Brightness" min={0} max={100} step={10} showValue />
  ),
};

export const CustomRange: Story = {
  render: () => (
    <SliderTemplate label="Temperature" min={-20} max={40} step={1} showValue />
  ),
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    value: 30,
    disabled: true,
    showValue: true,
  },
};

export const NoLabel: Story = {
  render: () => <SliderTemplate showValue />,
};
