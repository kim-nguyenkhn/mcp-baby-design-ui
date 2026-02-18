import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    searchable: { control: "boolean" },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const SingleTemplate = () => {
  const [value, setValue] = useState<string>("");
  return (
    <Select
      options={options}
      value={value}
      onChange={(v) => setValue(v as string)}
      label="Framework"
      placeholder="Choose a framework"
    />
  );
};

export const Default: Story = {
  render: () => <SingleTemplate />,
};

export const Searchable: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <Select
        options={options}
        value={value}
        onChange={(v) => setValue(v as string)}
        label="Search Framework"
        placeholder="Type to search..."
        searchable
      />
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <Select
        options={options}
        value={value}
        onChange={(v) => setValue(v as string[])}
        label="Frameworks"
        placeholder="Select frameworks..."
        multiple
      />
    );
  },
};

export const WithError: Story = {
  args: {
    options,
    label: "Framework",
    placeholder: "Choose a framework",
    error: "Please select a framework",
  },
};

export const Disabled: Story = {
  args: {
    options,
    label: "Framework",
    placeholder: "Choose a framework",
    disabled: true,
  },
};
