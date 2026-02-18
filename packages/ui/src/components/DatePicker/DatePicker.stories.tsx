import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

const DatePickerTemplate = (args: { label?: string; placeholder?: string; minDate?: Date; maxDate?: Date }) => {
  const [value, setValue] = useState<Date | null>(null);
  return <DatePicker {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: () => (
    <DatePickerTemplate label="Date of Birth" placeholder="Select your birthday" />
  ),
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date(2024, 5, 15));
    return <DatePicker label="Selected Date" value={value} onChange={setValue} />;
  },
};

export const WithMinMax: Story = {
  render: () => {
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return (
      <DatePickerTemplate
        label="This Month Only"
        placeholder="Select date in current month"
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    placeholder: "Cannot select",
    disabled: true,
  },
};
