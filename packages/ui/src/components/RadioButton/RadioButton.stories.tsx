import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioButton } from "./RadioButton";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioButton",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const RadioGroupTemplate = (args: {
  orientation?: "horizontal" | "vertical";
}) => {
  const [value, setValue] = useState("option1");
  return (
    <RadioGroup value={value} onChange={setValue} orientation={args.orientation}>
      <RadioButton value="option1" label="Option 1" />
      <RadioButton value="option2" label="Option 2" />
      <RadioButton value="option3" label="Option 3" />
    </RadioGroup>
  );
};

export const Vertical: Story = {
  render: () => <RadioGroupTemplate orientation="vertical" />,
};

export const Horizontal: Story = {
  render: () => <RadioGroupTemplate orientation="horizontal" />,
};

export const WithDisabled: Story = {
  render: () => {
    const [value, setValue] = useState("a");
    return (
      <RadioGroup value={value} onChange={setValue}>
        <RadioButton value="a" label="Available" />
        <RadioButton value="b" label="Also available" />
        <RadioButton value="c" label="Disabled option" disabled />
      </RadioGroup>
    );
  },
};
