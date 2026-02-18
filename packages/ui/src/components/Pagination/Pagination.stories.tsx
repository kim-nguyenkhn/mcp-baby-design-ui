import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    totalPages: { control: "number" },
    currentPage: { control: "number" },
    siblingCount: { control: "number" },
    showPrevNext: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    totalPages: 10,
    currentPage: 1,
    siblingCount: 1,
    showPrevNext: true,
  },
};

export const MiddlePage: Story = {
  args: {
    totalPages: 20,
    currentPage: 10,
    siblingCount: 1,
    showPrevNext: true,
  },
};

export const FewPages: Story = {
  args: {
    totalPages: 3,
    currentPage: 2,
    showPrevNext: true,
  },
};

export const WithoutPrevNext: Story = {
  args: {
    totalPages: 10,
    currentPage: 5,
    showPrevNext: false,
  },
};

export const LastPage: Story = {
  args: {
    totalPages: 10,
    currentPage: 10,
    showPrevNext: true,
  },
};
